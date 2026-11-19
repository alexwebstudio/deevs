import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Panel, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/effects/Reveal";
import { LeadModalButton } from "@/components/providers/LeadModalProvider";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.catalog" });
  const keywords = locale === "kz" ? ["Қазақстанда ангар салу", "Астанадағы өнеркәсіптік құрылыс", "блокты-модульді ғимараттар", "жылу желілерін салу"] : ["строительство ангаров Казахстан", "промышленное строительство Астана", "блочно-модульные здания", "строительство тепловых сетей", "реконструкция промышленных зданий"];
  return pageMetadata({ locale, path: "/services", title: t("title"), description: t("description"), keywords });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const items = t.raw("items") as { title: string; text: string }[];
  const structuredServices = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("title"),
    itemListElement: items.map(({ title, text }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: title,
        description: text,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: { "@type": "Country", name: "Казахстан" },
      },
    })),
  };

  return (
    <PageShell crumbs={[{ label: nav("services") }]} label={t("label")} title={t("title")} lead={t("lead")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredServices) }} />
      <Panel className="px-5 py-12 md:px-12 md:py-16">
        <SectionHead label={t("sectionLabel")} title={t("sectionTitle")} lead={t("sectionLead")} />
        <Reveal className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, text }, i) => (
            <li key={title} className={`flex min-h-[250px] flex-col rounded-[var(--radius-card)] p-6 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-ui)] hover:-translate-y-1 hover:shadow-lg ${i % 2 === 0 ? "bg-dark text-white" : "bg-white"}`}>
              <span className="font-brand text-xs tracking-widest opacity-50">0{i + 1}</span>
              <h2 className="mt-8 text-xl font-medium">{title}</h2>
              <p className={`mt-3 text-sm leading-relaxed ${i % 2 === 0 ? "text-white/65" : "text-muted"}`}>{text}</p>
            </li>
          ))}
        </Reveal>
      </Panel>
      <Panel className="grid gap-6 px-6 py-10 md:grid-cols-[1fr_auto] md:items-center md:px-12">
        <div><h2 className="text-2xl font-medium">{t("endTitle")}</h2><p className="mt-2 text-muted">{t("endLead")}</p></div>
        <LeadModalButton className="inline-flex h-12 w-fit items-center gap-3 rounded-full bg-dark pl-6 pr-5 text-[14px] font-medium text-white transition-colors hover:bg-ink">{t("cta")} <span aria-hidden>↗</span></LeadModalButton>
      </Panel>
    </PageShell>
  );
}
