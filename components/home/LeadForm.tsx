"use client";

import { Link } from "@/i18n/navigation";

import { useState } from "react";
import { formatPhone, nextPhone } from "@/lib/phone";

export function LeadForm() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/lead", { method: "POST", body: new FormData(form) });
      if (!response.ok) throw new Error("request failed");
      setStatus("sent");
      form.reset();
      setPhone("");
    } catch { setStatus("error"); }
  }
  if (status === "sent") return <div className="flex min-h-48 items-center rounded-[var(--radius-card)] bg-white p-8 text-ink" role="status">Заявка принята. Спасибо за обращение.</div>;
  const field="mt-1 h-12 w-full rounded-[14px] border border-ink/10 bg-bg px-4 text-[16px] text-ink outline-none transition-[border-color,box-shadow] focus:border-wood focus:ring-2 focus:ring-wood/15";
  return <form className="grid gap-4 rounded-[var(--radius-card)] bg-white p-5 text-ink shadow-[0_20px_50px_-30px_rgba(17,17,17,.25)] md:grid-cols-2 md:p-7" onSubmit={submit}>
    <label className="text-[13px] text-muted">Имя<input className={field} name="name" required autoComplete="name" /></label>
    <label className="text-[13px] text-muted">Компания<input className={field} name="company" required autoComplete="organization" /></label>
    <label className="text-[13px] text-muted">Телефон<input className={field} name="phone" type="tel" inputMode="tel" required placeholder="+7 (___) ___-__-__" value={formatPhone(phone)} onFocus={() => !phone && setPhone("7")} onBlur={() => phone === "7" && setPhone("")} onChange={(e) => setPhone(nextPhone(phone,e.target.value))} /></label>
    <label className="text-[13px] text-muted">Тип работ<select className={field} name="workType" required defaultValue=""><option value="" disabled>Выберите направление</option><option>Строительство и реконструкция</option><option>Текущий и капитальный ремонт</option><option>Отделочные работы</option><option>Благоустройство</option><option>Инженерные сети</option><option>Поставки оборудования и материалов</option></select></label>
    <label className="md:col-span-2 text-[13px] text-muted">Объект и описание задачи<textarea className={`${field} h-auto min-h-24 resize-y py-3`} name="description" rows={3} /></label>
    <label className="md:col-span-2 text-[13px] text-muted">Файл технического задания<input className={`${field} h-auto min-h-12 py-2`} name="file" type="file" /></label>
    <div className="md:col-span-2"><button className="inline-flex h-12 items-center gap-4 rounded-full bg-wood px-6 text-[13px] font-semibold text-white transition-colors hover:bg-dark disabled:opacity-70" type="submit" disabled={status === "sending"}>{status === "sending" ? "Проверка…" : "Подготовить обращение"}<span aria-hidden>↗</span></button><p className="mt-3 text-[11px] leading-relaxed text-muted">Форма пока не подключена к приёму заявок. Для связи используйте телефон или WhatsApp. <Link className="underline underline-offset-4" href="/privacy">Политика конфиденциальности</Link>.</p>{status === "error" && <p role="alert" className="mt-2 text-[13px] text-red-700">Обращение не отправлено. Позвоните или напишите в WhatsApp: +7 777 993 3999.</p>}</div>
  </form>;
}
