import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Panel } from "@/components/ui/Section";
import { LeadModalButton } from "@/components/providers/LeadModalProvider";
import { localizedWorkLocation, localizedWorkTitle, works } from "@/data/works";
import { clampText, pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { localizedPath } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };
const categoryKey = { construction: "construction", repair: "repair", finishing: "finishing", landscaping: "landscaping", engineering: "engineering", supply: "supply" } as const;
export function generateStaticParams() { return works.map((w) => ({ slug: w.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const work = works.find((item) => item.slug === slug);
  if (!work) return {};
  const t = await getTranslations({ locale, namespace: "meta.project" });
  const title = localizedWorkTitle(work, locale);
  const location = localizedWorkLocation(work, locale);
  // Бренд добавляем, только если заголовок не выйдет за ~65 символов (иначе Google обрежет)
  const fullTitle = t("title", { name: title });
  const place = [location, work.year].filter(Boolean).join(", ");
  // Части добавляются по порядку, пока описание укладывается в 160 символов (без обрезки на полуслове)
  const description = clampText([`${title}.`, work.client ? `${t("client")}: ${work.client}.` : "", place ? `${place}.` : "", t("done")]
    .filter(Boolean)
    .reduce((acc, part) => (!acc ? part : `${acc} ${part}`.length <= 160 ? `${acc} ${part}` : acc), ""));
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: fullTitle.length <= 65 ? fullTitle : title,
    description,
    keywords: [title, location, work.client || (locale === "kz" ? "Қазақстандағы құрылыс" : "строительство Казахстан")].filter((keyword): keyword is string => Boolean(keyword)),
    // JPG 1200×630 (scripts/generate-og-images.mjs): WhatsApp/Telegram/VK не везде показывают WebP
    image: `/images/og/projects/${work.slug}.jpg`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const work = works.find((item) => item.slug === slug);
  if (!work) notFound();
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const categories = t.raw("categories") as Record<string, string>;
  const title = localizedWorkTitle(work, locale);
  const location = localizedWorkLocation(work, locale);
  const category = categories[categoryKey[work.category]];
  const lead = `${work.client ? `${work.client} · ` : ""}${t("projectLead")}`;
  const ld = { "@context": "https://schema.org", "@type": "CreativeWork", name: title, description: [work.client, location, work.year, category].filter(Boolean).join(" · "), url: new URL(localizedPath(locale, `/projects/${slug}`), site.url).toString(), image: `${site.url}${work.image}`, creator: { "@type": "Organization", name: site.brand, url: site.url }, about: category };
  return <PageShell crumbs={[{ href: "/projects", label: nav("projects") }, { label: title }]} label={[work.year, location].filter(Boolean).join(" · ")} title={title} lead={lead}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <Panel className="grid gap-6 p-3 md:p-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="grid grid-cols-2 content-start gap-2">
        {work.gallery.map((photo, index) => <div key={photo} className={`relative overflow-hidden rounded-[var(--radius-photo)] bg-dark ${index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}>
          <Image src={photo} alt={`${title} — ${tc("photo")} ${index + 1}`} fill sizes={index === 0 ? "(max-width:1024px) 100vw, 60vw" : "(max-width:1024px) 50vw, 30vw"} className="object-cover" />
        </div>)}
      </div>
      <div className="flex flex-col justify-center px-5 py-8 md:px-8">
        <p className="text-xs uppercase tracking-widest text-muted">{t("detailLabel")}{work.year ? ` · ${work.year}` : ""}</p>
        <h2 className="mt-4 text-3xl font-medium">{title}</h2>
        <dl className="mt-8 grid gap-4 border-t border-ink/10 pt-6 text-sm">
          {work.client && <div><dt className="text-muted">{t("client")}</dt><dd className="mt-1">{work.client}</dd></div>}
          <div><dt className="text-muted">{t("location")}</dt><dd className="mt-1">{location}</dd></div>
          <div><dt className="text-muted">{t("category")}</dt><dd className="mt-1">{category}</dd></div>
        </dl>
        <div className="mt-8"><LeadModalButton className="inline-flex h-12 items-center gap-3 rounded-full bg-dark pl-6 pr-5 text-[14px] font-medium text-white transition-colors hover:bg-ink">{t("discussSimilar")} <span aria-hidden>↗</span></LeadModalButton></div>
      </div>
    </Panel>
  </PageShell>;
}
