import { useTranslations } from "next-intl";
import { Panel, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/effects/Reveal";
import { Arrow } from "@/components/ui/PillButton";

const docs = [
  { code: "ГСЛ №01489", label: "Лицензия на строительно-монтажные работы", note: "II категория · переоформлена 17.12.2024 · первичная выдача 26.09.2006", href: "/documents/license-overview.png", dark: true },
  { code: "ISO 9001:2015", label: "Менеджмент качества", note: "Сертификат системы менеджмента качества", href: "/documents/iso-certificates.png" },
  { code: "ISO 14001:2015", label: "Экологический менеджмент", note: "Сертификат системы экологического менеджмента", href: "/documents/iso-certificates.png" },
  { code: "ISO 45001:2018", label: "Безопасность труда и охрана здоровья", note: "Сертификат системы менеджмента охраны труда", href: "/documents/iso-certificates.png" },
];

export function Credentials() {
  const t=useTranslations("home.credentials");
  return <Panel tone="plain" className="px-2 py-12 md:px-8 md:py-16" aria-label={t("title")}>
    <SectionHead label={t("label")} title={t("title")} lead={t("lead")} className="md:items-end" />
    <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {docs.map((d,i)=><li key={d.code}><a href={d.href} target="_blank" rel="noreferrer" className={`group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[var(--radius-card)] p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-[5px] ${d.dark?"bg-[linear-gradient(160deg,#2b2b2b_0%,#111_70%)] text-white hover:shadow-[0_34px_70px_-34px_rgba(0,0,0,.5)]":"border border-white bg-[linear-gradient(160deg,#FFFFFF_0%,#F2F2F2_100%)] shadow-[0_20px_50px_-30px_rgba(17,17,17,.2)] hover:shadow-[0_34px_70px_-34px_rgba(17,17,17,.3)]"}`}>
        <span className={`font-brand text-[11px] tracking-[0.14em] ${d.dark?"text-white/45":"text-muted"}`}>0{i+1} · ПОДТВЕРЖДАЮЩИЙ ДОКУМЕНТ</span><h3 className="mt-4 text-[23px] leading-tight font-medium">{d.code}</h3><p className={`mt-2 text-[15px] font-medium ${d.dark?"text-white/90":"text-ink"}`}>{d.label}</p><p className={`mt-3 text-[13px] leading-relaxed ${d.dark?"text-white/60":"text-muted"}`}>{d.note}</p><span className={`mt-auto ml-auto grid size-11 place-items-center rounded-full transition-[transform,background-color] duration-500 group-hover:-rotate-45 ${d.dark?"bg-white text-ink group-hover:bg-wood-light":"bg-dark text-white group-hover:bg-wood"}`}><Arrow className="size-4" /></span>
      </a></li>)}
    </Reveal>
    <p className="mt-5 text-[12px] text-muted">{t("letters")} <a className="underline underline-offset-4" href="/documents/customer-letters.png" target="_blank" rel="noreferrer">{t("lettersLink")} ↗</a></p>
  </Panel>;
}
