import { useTranslations } from "next-intl";
import { Panel, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/effects/Reveal";
import { Link } from "@/i18n/navigation";
import { Arrow } from "@/components/ui/PillButton";

export function Services() {
  const t = useTranslations("home.services");
  const items = t.raw("items") as { title: string; text: string }[];
  return (
    <Panel eager tone="plain" as="div" className="py-10 md:py-16">
      <section className="px-2 md:px-8" aria-label={t("title")}>
        <SectionHead label={t("label")} title={t("title")} lead={t("lead")} />
        <Reveal className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => <li key={it.title} className={`relative flex min-h-[250px] flex-col overflow-hidden rounded-[var(--radius-card)] p-6 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-ui)] hover:-translate-y-1 hover:shadow-lg md:p-7 ${i % 2 === 0 ? "bg-dark text-white" : "border border-ink/10 bg-white"}`}>
            <span className={`font-brand text-[11px] tracking-[0.14em] ${i % 2 === 0 ? "text-white/45" : "text-muted"}`}>0{i + 1}</span>
            <h3 className="mt-4 text-[21px] font-medium tracking-[-0.01em]">{it.title}</h3>
            <p className={`mt-3 text-[15px] leading-relaxed ${i % 2 === 0 ? "text-white/65" : "text-muted"}`}>{it.text}</p>
          </li>)}
        </Reveal>
        <div className="mt-3 flex flex-col gap-4 rounded-[var(--radius-card)] border border-ink/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] leading-snug text-ink">{t("extra")}</p>
          <Link href="/services" className="group inline-flex shrink-0 items-center gap-2 text-[14px] font-medium text-ink">{t("link")}<span className="grid size-8 place-items-center rounded-full bg-dark text-white transition-transform duration-500 group-hover:-rotate-45"><Arrow className="size-3.5" /></span></Link>
        </div>
      </section>
    </Panel>
  );
}
