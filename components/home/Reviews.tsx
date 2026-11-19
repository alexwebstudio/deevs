import { useTranslations } from "next-intl";
import Image from "next/image";
import { statsRating } from "@/data/home";
import { Panel, SectionHead } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/effects/Reveal";

type Review = { text: string };

export function Reviews() {
  const t = useTranslations("home.reviews");
  const items = t.raw("items") as Review[];
  return (
    <Panel tone="dark" className="relative isolate overflow-hidden px-5 py-14 md:px-12 md:py-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-graphite">
        <Image src="/images/editorial/reviews-background.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <span className="absolute inset-0 bg-[linear-gradient(145deg,rgba(17,17,17,.72),rgba(17,17,17,.9))]" />
      </div>

      <SectionHead
        dark
        label={t("label")}
        title={t("title")}
        aside={
          <div className="flex items-center gap-4 text-white">
            <span className="font-brand text-[44px] leading-none font-semibold tracking-[-0.04em]">{statsRating}</span>
            <span className="text-[13px] leading-snug text-white/60">
              <span className="flex gap-0.5 text-wood-light" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="size-3.5 fill-current" strokeWidth={0} />
                ))}
              </span>
              {t("rating")}
              <br />
              {t("source")}
            </span>
          </div>
        }
      />

      <Reveal className="mt-12 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map((r, i) => (
          <li
            key={`${i}-${r.text}`}
            className="flex flex-col rounded-[var(--radius-card)] border border-white/15 bg-white/[.07] p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_30px_60px_-30px_rgba(0,0,0,.6)] backdrop-blur-[20px] backdrop-saturate-150"
          >
            <Icon name="quote" className="size-6 text-wood-light" />
            <p className="mt-4 text-[15px] leading-relaxed text-white/80">{r.text}</p>
            <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-5">
              <span className="font-display grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-[13px] font-semibold">2ГИС</span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-medium">{t("author")}</span>
                <span className="block text-[13px] text-white/55">{t("ratingMeta")}</span>
              </span>
            </div>
          </li>
        ))}
      </Reveal>
      <p className="mt-6 border-t border-white/10 pt-4 text-[12px] text-white/55">{t("sourceNote")} <a href="https://2gis.kz/astana/inside/70030076513910385/firm/70000001112483051" target="_blank" rel="noreferrer" className="underline underline-offset-4">{t("source")} ↗</a></p>
    </Panel>
  );
}
