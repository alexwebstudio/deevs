import { NextResponse } from "next/server";

const clean = (value: FormDataEntryValue | null, max: number) => String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);

async function telegram(method: "sendMessage" | "sendDocument", form: FormData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    body: form,
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) return false;
  const result = await response.json() as { ok?: boolean };
  return result.ok === true;
}

export async function POST(req: Request) {
  let data: FormData;
  try { data = await req.formData(); }
  catch { return NextResponse.json({ ok: false, error: "bad_form" }, { status: 400 }); }

  const name = clean(data.get("name"), 80);
  const company = clean(data.get("company"), 160);
  const phone = clean(data.get("phone"), 32).replace(/\D/g, "");
  const workType = clean(data.get("workType"), 120);
  const description = clean(data.get("description"), 3000);
  const file = data.get("file");
  const consent = data.get("consent") === "on";
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (name.length < 2 || company.length < 2 || !/^7\d{10}$/.test(phone) || !workType || !consent) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }
  if (file instanceof File && file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "file_too_large" }, { status: 413 });
  }
  if (!process.env.TELEGRAM_BOT_TOKEN || !chatId) {
    return NextResponse.json({ ok: false, error: "telegram_not_configured" }, { status: 503 });
  }

  const message = [
    "Новая заявка с сайта DEEVS",
    `Имя: ${name}`,
    `Компания: ${company}`,
    `Телефон: +${phone}`,
    `Направление: ${workType}`,
    description ? `Объект и задача: ${description}` : "",
    file instanceof File && file.size ? `Файл: ${file.name}` : "",
  ].filter(Boolean).join("\n");

  try {
    const textForm = new FormData();
    textForm.set("chat_id", chatId);
    textForm.set("text", message);
    if (!await telegram("sendMessage", textForm)) {
      return NextResponse.json({ ok: false, error: "telegram_send_failed" }, { status: 502 });
    }

    if (file instanceof File && file.size > 0) {
      const documentForm = new FormData();
      documentForm.set("chat_id", chatId);
      documentForm.set("document", file, file.name || "technical-brief");
      if (!await telegram("sendDocument", documentForm)) {
        return NextResponse.json({ ok: true, fileForwarded: false });
      }
    }
    return NextResponse.json({ ok: true, fileForwarded: true });
  } catch {
    return NextResponse.json({ ok: false, error: "telegram_unavailable" }, { status: 502 });
  }
}
