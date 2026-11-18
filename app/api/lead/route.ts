import { NextResponse } from "next/server";

/** Проверка данных формы. Внешний приём заявок пока не подключён. */
export async function POST(req: Request) {
  let data: FormData;
  try { data = await req.formData(); }
  catch { return NextResponse.json({ ok: false, error: "bad_form" }, { status: 400 }); }

  const name = String(data.get("name") ?? "").trim().slice(0, 80);
  const company = String(data.get("company") ?? "").trim().slice(0, 160);
  const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
  const workType = String(data.get("workType") ?? "").trim().slice(0, 120);
  String(data.get("description") ?? "").trim().slice(0, 3000);
  const file = data.get("file");

  if (name.length < 2 || company.length < 2 || !/^7\d{10}$/.test(phone) || !workType) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }
  if (file instanceof File && file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "file_too_large" }, { status: 413 });
  }

  return NextResponse.json({ ok: false, error: "delivery_not_configured" }, { status: 503 });
}
