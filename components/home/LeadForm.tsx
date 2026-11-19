"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPhone, nextPhone } from "@/lib/phone";
import { site } from "@/config/site";

export function LeadForm({ onClose }: { onClose?: () => void }) {
  const t = useTranslations("leadForm");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "opening">("idle");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const attachment = data.get("file");
    const fileName = attachment instanceof File && attachment.size ? attachment.name : "";
    const message = [
      t("messageGreeting"),
      `${t("name")}: ${String(data.get("name") || "")}`,
      `${t("company")}: ${String(data.get("company") || "")}`,
      `${t("phone")}: ${String(data.get("phone") || "")}`,
      `${t("workType")}: ${String(data.get("workType") || "")}`,
      `${t("fieldObject")}: ${String(data.get("description") || t("notSpecified"))}`,
      ...(fileName ? [`${t("fieldFile")}: ${fileName}`, t("fileManual")] : []),
    ].join("\n");
    setStatus("opening");
    onClose?.();
    window.location.assign(`${site.whatsapp}?text=${encodeURIComponent(message)}`);
  }
  const field = "mt-1 h-12 min-w-0 w-full rounded-[14px] border border-ink/10 bg-bg px-3 text-[16px] text-ink outline-none transition-[border-color,box-shadow] focus:border-wood focus:ring-2 focus:ring-wood/15 sm:px-4";
  const workTypes = t.raw("workTypes") as string[];
  return <form className="grid min-w-0 gap-3 rounded-[var(--radius-card)] bg-white p-3 text-ink shadow-[0_20px_50px_-30px_rgba(17,17,17,.25)] sm:gap-4 sm:p-5 md:grid-cols-2 md:p-7" onSubmit={submit}>
    <label className="text-[13px] text-muted">{t("name")}<input className={field} name="name" required autoComplete="name" /></label>
    <label className="text-[13px] text-muted">{t("company")}<input className={field} name="company" required autoComplete="organization" /></label>
    <label className="text-[13px] text-muted">{t("phone")}<input className={field} name="phone" type="tel" inputMode="tel" required placeholder="+7 (___) ___-__-__" value={formatPhone(phone)} onFocus={() => !phone && setPhone("7")} onBlur={() => phone === "7" && setPhone("")} onChange={(e) => setPhone(nextPhone(phone, e.target.value))} /></label>
    <label className="text-[13px] text-muted">{t("workType")}<select className={field} name="workType" required defaultValue=""><option value="" disabled>{t("selectWorkType")}</option>{workTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
    <label className="md:col-span-2 text-[13px] text-muted">{t("description")}<textarea className={`${field} h-auto min-h-24 resize-y py-3`} name="description" rows={3} required /></label>
    <label className="md:col-span-2 min-w-0 text-[13px] text-muted">{t("file")}<input className={`${field} h-auto min-h-12 py-2 text-sm file:mr-2 file:max-w-[calc(100%-8px)] file:overflow-hidden file:text-ellipsis`} name="file" type="file" /><span className="mt-1 block text-[11px] leading-relaxed">{t("fileNote")}</span></label>
    <div className="md:col-span-2">
      <div className="flex items-start gap-2 text-[11px] leading-relaxed text-muted"><input id="lead-consent" className="mt-0.5 accent-ink" type="checkbox" name="consent" required /><div><label htmlFor="lead-consent">{t("consent")} </label><Link className="underline underline-offset-4" href="/privacy" onClick={() => onClose?.()}>{t("privacy")}</Link>.</div></div>
      <button className="mt-4 inline-flex h-12 w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-wood px-4 text-[13px] font-semibold text-white transition-colors hover:bg-dark disabled:opacity-70 sm:w-fit sm:gap-4 sm:px-6" type="submit" disabled={status === "opening"}>{status === "opening" ? t("opening") : t("send")}<span aria-hidden>↗</span></button>
    </div>
  </form>;
}
