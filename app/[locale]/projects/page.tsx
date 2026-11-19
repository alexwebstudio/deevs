import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Panel } from "@/components/ui/Section";
import { Reveal } from "@/components/effects/Reveal";
import { LeadModalButton } from "@/components/providers/LeadModalProvider";
import { localizedWorkLocation, localizedWorkTitle, works } from "@/data/works";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { localizedPath } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.projects" });
  const keywords = locale === "kz" ? ["Қазақстандағы құрылыс портфолиосы", "Астанадағы өнеркәсіптік нысандар", "ангар құрылысы жобалары", "модульдік жатақханалар"] : ["портфолио строительства Казахстан", "промышленные объекты Астана", "строительство ангаров проекты", "модульные общежития портфолио"];
  return pageMetadata({ locale, path: "/projects", title: t("title"), description: t("description"), keywords });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const category = t.raw("categories") as Record<string, string>;
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("title"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: works.map((work, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: localizedWorkTitle(work, locale),
        url: new URL(localizedPath(locale, `/projects/${work.slug}`), site.url).toString(),
        ...(work.image ? { image: `${site.url}${work.image}` } : {}),
      })),
    },
  };

  return (
    <PageShell crumbs={[{ label: nav("projects") }]} label={t("label")} title={t("title")} lead={t("lead")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <Panel className="px-4 py-10 md:px-10 md:py-16">
        <Reveal className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {works.map((work) => (
            <li key={work.slug}>
              <Link href={`/projects/${work.slug}`} className="group block h-full overflow-hidden rounded-[var(--radius-card)] bg-white p-2 shadow-[0_20px_50px_-30px_rgba(20,21,24,.22)] transition-transform duration-500 hover:-translate-y-1">
                {work.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-photo)]">
                    <Image src={work.image} alt={localizedWorkTitle(work, locale)} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    {work.year && <span className="glass absolute top-3 left-3 rounded-full px-3 py-1 text-xs">{work.year}</span>}
                  </div>
                ) : (
                  <div className="grid aspect-[4/3] place-items-center rounded-[var(--radius-photo)] bg-dark px-8 text-center font-brand text-4xl text-white">DEEVS</div>
                )}
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wider text-muted">{category[work.category]}{work.year ? ` · ${work.year}` : ""}</p>
                  <h2 className="mt-3 text-xl font-medium">{localizedWorkTitle(work, locale)}</h2>
                  <p className="mt-2 text-sm text-muted">{work.client ? `${work.client} · ` : ""}{localizedWorkLocation(work, locale)}</p>
                  <span className="mt-5 inline-flex text-sm font-medium">{t("more")} ↗</span>
                </div>
              </Link>
            </li>
          ))}
        </Reveal>
      </Panel>
      <Panel className="flex flex-col items-start gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12">
        <p className="max-w-2xl text-lg">{t("ctaLead")}</p>
        <LeadModalButton className="inline-flex h-12 w-fit items-center gap-3 rounded-full bg-dark pl-6 pr-5 text-[14px] font-medium text-white transition-colors hover:bg-ink">{t("cta")} <span aria-hidden>↗</span></LeadModalButton>
      </Panel>
    </PageShell>
  );
}
