import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { featuredWorks, localizedWorkLocation, localizedWorkTitle } from "@/data/works";
import { Panel, SectionHead } from "@/components/ui/Section";
import { PillButton, Arrow } from "@/components/ui/PillButton";
import { Reveal } from "@/components/effects/Reveal";

export function Realized() {
  const t = useTranslations("home.realized");
  const locale = useLocale();
  const items = featuredWorks.slice(0, 3);
  return (
    <Panel className="px-5 py-14 md:px-12 md:py-20">
      <SectionHead
        label={t("label")}
        title={t("title")}
        aside={
          <PillButton href="/projects" variant="light" className="shrink-0 ring-1 ring-ink/10">
            {t("all")}
          </PillButton>
        }
      />
      <Reveal className="mt-12 grid gap-3 md:grid-cols-3">
        {items.map((it) => (
          <li key={it.slug}>
            <Link
              href={`/projects/${it.slug}`}
              className="group block h-full rounded-[var(--radius-card)] border border-white bg-white p-2 shadow-[0_20px_50px_-30px_rgba(20,21,24,.2)] transition-[transform,box-shadow] duration-500 hover:-translate-y-[5px] hover:shadow-[0_34px_70px_-34px_rgba(20,21,24,.32)]"
            >
              <div className="relative flex aspect-[4/3] items-end overflow-hidden rounded-[var(--radius-photo)] bg-[linear-gradient(145deg,#484848_0%,#222_56%,#111_100%)] p-5 text-white">
                <span aria-hidden className="absolute -right-3 -bottom-12 font-brand text-[clamp(100px,18vw,180px)] leading-none text-white/[.07]">DEEVS</span>
                <span className="relative rounded-full border border-white/30 px-3 py-1 text-[12px] font-medium">{it.year ?? t("dateUnknown")}</span>
              </div>
              <div className="px-4 pt-5 pb-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[20px] font-medium tracking-[-0.01em]">{localizedWorkTitle(it, locale)}</h3>
                  <span className="text-[13px] text-muted">{localizedWorkLocation(it, locale)}</span>
                </div>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[14px] text-muted">
                  <span>{it.client}</span>
                </p>
                <span className="mt-6 inline-flex items-center gap-3 text-[14px] font-medium">
                  {t("more")}
                  <span className="grid size-8 place-items-center rounded-full ring-1 ring-ink/15 transition-[transform,background-color,color] duration-500 group-hover:-rotate-45 group-hover:bg-dark group-hover:text-white">
                    <Arrow className="size-3.5" />
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </Reveal>
    </Panel>
  );
}
