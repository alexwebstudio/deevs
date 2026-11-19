import { useTranslations } from "next-intl";
import { Panel, SectionHead } from "@/components/ui/Section";
import { LeadModalButton } from "@/components/providers/LeadModalProvider";

export function FinalCta() {
  const t = useTranslations("home.finalCta");
  return <Panel tone="dark" className="grid gap-6 overflow-hidden p-3 md:p-4 lg:grid-cols-[.9fr_1.1fr]">
    <div className="flex flex-col justify-between gap-10 px-4 py-8 md:px-8 md:py-12">
      <SectionHead dark label={t("label")} title={t("title")} lead={t("lead")} />
      <p className="text-[14px] text-white/55">{t("note")}</p>
    </div>
    <div className="flex flex-col justify-center rounded-[var(--radius-card)] bg-white p-7 text-ink md:p-10">
      <h3 className="text-[clamp(24px,3vw,38px)] leading-tight font-medium">{t("cardTitle")}</h3>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">{t("cardLead")}</p>
      <LeadModalButton className="mt-7 inline-flex h-12 w-fit items-center justify-center whitespace-nowrap rounded-full bg-dark px-6 text-[13px] font-semibold text-white transition-colors hover:bg-wood">{t("cta")} <span className="ml-3" aria-hidden>↗</span></LeadModalButton>
    </div>
  </Panel>;
}
