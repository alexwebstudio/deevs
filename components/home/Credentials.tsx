import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Panel, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/effects/Reveal";
import { Arrow } from "@/components/ui/PillButton";

const docs = [
  { code: "ГСЛ №01489", key: "license", dark: true },
  { code: "ISO 9001:2015", key: "quality" },
  { code: "ISO 14001:2015", key: "environment" },
  { code: "ISO 45001:2018", key: "safety" },
];

export function Credentials() {
  const t=useTranslations("home.credentials");
  const locale = useLocale();
  return <Panel tone="plain" className="px-2 py-12 md:px-8 md:py-16" aria-label={t("title")}>
    <SectionHead label={t("label")} title={t("title")} lead={t("lead")} className="md:items-end" />
    <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {docs.map((d,i)=>{const href=d.key==="license"?"/documents/deevs-license.pdf":`/documents/deevs-iso-${d.key === "quality" ? "9001" : d.key === "environment" ? "14001" : "45001"}-${locale === "kz" ? "kz" : "ru"}.pdf`;const preview=d.key==="license"?"/documents/license-overview.png":"/documents/iso-certificates.png";return <li key={d.code}><a href={href} target="_blank" rel="noreferrer" className={`credential-card group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[var(--radius-card)] p-4 ${d.dark?"bg-[linear-gradient(160deg,#2b2b2b_0%,#111_70%)] text-white":"border border-white bg-[linear-gradient(160deg,#FFFFFF_0%,#F2F2F2_100%)] shadow-[0_20px_50px_-30px_rgba(17,17,17,.2)]"}`}>
        <span className={`font-brand px-2 pt-1 text-[11px] tracking-[0.14em] ${d.dark?"text-white/45":"text-muted"}`}>0{i+1} · {t("documentLabel")}</span><span className="relative mt-3 block h-24 overflow-hidden rounded-xl bg-white"><Image src={preview} alt={d.key==="license"?t("docs.license.label"):t(`docs.${d.key}.label`)} fill sizes="(max-width:640px) 90vw, 25vw" className="object-contain p-2" /></span><h3 className="mt-4 px-2 text-[23px] leading-tight font-medium">{d.code}</h3><p className={`mt-2 px-2 text-[15px] font-medium ${d.dark?"text-white/90":"text-ink"}`}>{t(`docs.${d.key}.label`)}</p><p className={`mt-3 px-2 text-[13px] leading-relaxed ${d.dark?"text-white/60":"text-muted"}`}>{t(`docs.${d.key}.note`)}</p><span className={`mt-auto mr-2 ml-auto grid size-11 place-items-center rounded-full transition-[transform,background-color] duration-500 group-hover:-rotate-45 ${d.dark?"bg-white text-ink group-hover:bg-wood-light":"bg-dark text-white group-hover:bg-wood"}`}><Arrow className="size-4" /></span>
      </a></li>})}
    </Reveal>
    <p className="mt-5 text-[12px] text-muted">{t("letters")} <a className="underline underline-offset-4" href="/documents/customer-letters.png" target="_blank" rel="noreferrer">{t("lettersLink")} ↗</a></p>
  </Panel>;
}
