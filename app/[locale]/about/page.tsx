import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Panel, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/effects/Reveal";
import { ogImagePath, pageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await getTranslations({ locale, namespace: "meta.about" });
  const kw = locale === "kz" ? ["Deevs құрылыс компаниясы", "Қазақстандағы өнеркәсіптік құрылыс", "Астанадағы ангар құрылысы"] : ["строительная компания Deevs", "строительство объектов для бизнеса", "промышленная инфраструктура Казахстан"];
  return pageMetadata({ locale, path: "/about", title: meta("title"), description: meta("description"), keywords: kw, image: ogImagePath(locale, "/about") });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const documents = [
    { title: t("licenseName"), description: t("licenseDetails"), href: "/documents/deevs-license.pdf", preview: "/documents/license-overview.png" },
    { title: "ISO 9001:2015", description: t("quality"), href: `/documents/deevs-iso-9001-${locale === "kz" ? "kz" : "ru"}.pdf`, preview: "/documents/iso-certificates.png" },
    { title: "ISO 14001:2015", description: t("environment"), href: `/documents/deevs-iso-14001-${locale === "kz" ? "kz" : "ru"}.pdf`, preview: "/documents/iso-certificates.png" },
    { title: "ISO 45001:2018", description: t("safety"), href: `/documents/deevs-iso-45001-${locale === "kz" ? "kz" : "ru"}.pdf`, preview: "/documents/iso-certificates.png" },
  ];

  return (
    <PageShell crumbs={[{ label: nav("about") }]} label={t("label")} title={t("title")} lead={t("lead")}>
      <Panel className="grid gap-4 p-3 md:p-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-[calc(var(--radius-section)-10px)] md:min-h-[480px]">
          <Image src="/images/editorial/about-site.jpg" alt={t("imageAlt")} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover grayscale" />
        </div>
        <div className="flex flex-col justify-center px-4 py-8 md:px-9">
          <SectionHead label={t("experience")} title={t("range")} />
          <div className="mt-6 grid max-w-[58ch] gap-4 text-[15px] leading-relaxed text-muted sm:text-[16px]">
            {(t.raw("portfolioParagraphs") as string[]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <a href="/deevs-presentation.pdf" target="_blank" rel="noreferrer" className="mt-7 inline-flex text-sm font-medium underline underline-offset-4">{t("presentation")}</a>
        </div>
      </Panel>
      <Panel tone="plain" className="px-2 py-10 md:px-8 md:py-14">
        <SectionHead label={t("documents")} title={t("licenses")} />
        <Reveal className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {documents.map((document) => (
            <li key={document.title}>
              <a href={document.href} target="_blank" rel="noreferrer" className="credential-card flex h-full min-h-56 flex-col rounded-[var(--radius-card)] bg-white p-4">
                <span className="relative mb-4 block h-32 overflow-hidden rounded-xl bg-[#f3f3f3]"><Image src={document.preview} alt={document.title} fill sizes="(max-width:640px) 90vw, 25vw" className="object-contain p-2" /></span>
                <span className="px-2 font-brand text-xl">{document.title}</span>
                <span className="mt-4 text-sm leading-relaxed text-muted">{document.description}</span>
                <span className="mt-auto pt-5 text-sm underline">{t("openDocument")} ↗</span>
              </a>
            </li>
          ))}
        </Reveal>
      </Panel>
      <Panel className="flex flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12">
        <div><h2 className="text-2xl font-medium">{t("workWithCompanies")}</h2><p className="mt-2 text-muted">{t("workLead")}</p></div>
        <Link href="/projects" className="text-sm font-medium underline underline-offset-4">{t("projectsLink")}</Link>
      </Panel>
    </PageShell>
  );
}
