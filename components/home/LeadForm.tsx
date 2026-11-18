"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { formatPhone, nextPhone } from "@/lib/phone";

export function LeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "partial" | "error" | "configError">("idle");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/lead", { method: "POST", body: new FormData(form) });
      const result = await response.json() as { ok?: boolean; fileForwarded?: boolean; error?: string };
      if (result.error === "telegram_not_configured") {
        setStatus("configError");
        return;
      }
      if (!response.ok || !result.ok) throw new Error("request failed");
      if (result.fileForwarded === false) {
        setStatus("partial");
        return;
      }
      setStatus("sent");
      form.reset();
      setPhone("");
      onSuccess?.();
    } catch { setStatus("error"); }
  }
  if (status === "sent") return <div className="flex min-h-48 items-center rounded-[var(--radius-card)] bg-white p-5 text-ink sm:p-8" role="status">Заявка отправлена. Спасибо за обращение.</div>;
  if (status === "partial") return <div className="flex min-h-48 items-center rounded-[var(--radius-card)] bg-white p-5 text-ink sm:p-8" role="status">Заявка передана, но файл не прикрепился. Отправьте техническое задание менеджеру отдельно.</div>;
  const field = "mt-1 h-12 min-w-0 w-full rounded-[14px] border border-ink/10 bg-bg px-3 text-[16px] text-ink outline-none transition-[border-color,box-shadow] focus:border-wood focus:ring-2 focus:ring-wood/15 sm:px-4";
  return <form className="grid min-w-0 gap-3 rounded-[var(--radius-card)] bg-white p-3 text-ink shadow-[0_20px_50px_-30px_rgba(17,17,17,.25)] sm:gap-4 sm:p-5 md:grid-cols-2 md:p-7" onSubmit={submit}>
    <label className="text-[13px] text-muted">Имя<input className={field} name="name" required autoComplete="name" /></label>
    <label className="text-[13px] text-muted">Компания<input className={field} name="company" required autoComplete="organization" /></label>
    <label className="text-[13px] text-muted">Телефон<input className={field} name="phone" type="tel" inputMode="tel" required placeholder="+7 (___) ___-__-__" value={formatPhone(phone)} onFocus={() => !phone && setPhone("7")} onBlur={() => phone === "7" && setPhone("")} onChange={(e) => setPhone(nextPhone(phone, e.target.value))} /></label>
    <label className="text-[13px] text-muted">Тип работ<select className={field} name="workType" required defaultValue=""><option value="" disabled>Выберите направление</option><option>Строительство и реконструкция</option><option>Текущий и капитальный ремонт</option><option>Отделочные работы</option><option>Благоустройство</option><option>Инженерные сети</option><option>Поставки оборудования и материалов</option></select></label>
    <label className="md:col-span-2 text-[13px] text-muted">Объект и описание задачи<textarea className={`${field} h-auto min-h-24 resize-y py-3`} name="description" rows={3} /></label>
    <label className="md:col-span-2 min-w-0 text-[13px] text-muted">Файл технического задания<input className={`${field} h-auto min-h-12 py-2 text-sm file:mr-2 file:max-w-[calc(100%-8px)] file:overflow-hidden file:text-ellipsis`} name="file" type="file" /></label>
    <div className="md:col-span-2">
      <label className="flex items-start gap-2 text-[11px] leading-relaxed text-muted"><input className="mt-0.5 accent-ink" type="checkbox" name="consent" required /><span>Согласен на передачу указанных данных менеджеру ТОО Deevs через Telegram для ответа на обращение. <Link className="underline underline-offset-4" href="/privacy">Политика обработки данных</Link>.</span></label>
      <button className="mt-4 inline-flex h-12 w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-wood px-4 text-[13px] font-semibold text-white transition-colors hover:bg-dark disabled:opacity-70 sm:w-fit sm:gap-4 sm:px-6" type="submit" disabled={status === "sending"}>{status === "sending" ? "Отправка…" : "Отправить заявку"}<span aria-hidden>↗</span></button>
      {status === "error" && <p role="alert" className="mt-2 text-[13px] text-red-700">Заявка не отправлена. Проверьте подключение или позвоните: +7 777 993 3999.</p>}
      {status === "configError" && <p role="alert" className="mt-2 text-[13px] text-red-700">Telegram-бот пока не настроен. Позвоните: +7 777 993 3999.</p>}
    </div>
  </form>;
}
