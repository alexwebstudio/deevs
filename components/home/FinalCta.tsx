import Image from "next/image";
import { useTranslations } from "next-intl";
import { finalCtaVisual } from "@/data/home";
import { Panel, SectionHead } from "@/components/ui/Section";
import { LeadForm } from "@/components/home/LeadForm";

export function FinalCta() {
  const t = useTranslations("home.finalCta");
  return <Panel tone="dark" className="grid gap-6 overflow-hidden p-3 md:p-4 lg:grid-cols-[.9fr_1.1fr]">
    <div className="flex flex-col justify-between gap-10 px-4 py-8 md:px-8 md:py-12">
      <SectionHead dark label={t("label")} title={t("title")} lead={t("lead")} />
      <p className="text-[14px] text-white/55">{t("note")}</p>
    </div>
    <div className="grid gap-3">
      <div className="relative min-h-[260px] overflow-hidden rounded-[calc(var(--radius-section)-10px)]">
        {finalCtaVisual.kind === "photo" && <Image src={finalCtaVisual.src} alt="" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover grayscale" />}
      </div>
      <LeadForm />
    </div>
  </Panel>;
}
