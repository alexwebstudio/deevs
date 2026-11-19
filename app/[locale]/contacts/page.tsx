import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Panel } from "@/components/ui/Section";
import { ContactLocationMap } from "@/components/contacts/ContactLocationMap";
import { LeadModalButton } from "@/components/providers/LeadModalProvider";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contacts" });
  const keywords = locale === "kz" ? ["Астанадағы құрылыс компаниясының байланыс деректері", "Қазақстан кәсіпорындарына арналған құрылыс", "ТОО Deevs телефоны"] : ["контакты строительной компании Астана", "строительная компания для предприятий Казахстан", "телефон ТОО Deevs"];
  return pageMetadata({ locale, path: "/contacts", title: t("title"), description: t("description"), keywords });
}

export default async function ContactsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactsPage" });
  return (
    <PageShell crumbs={[{ label: t("title") }]} label={t("label")} title={t("title")} lead={t("lead")}>
      <Panel className="grid gap-4 p-3 md:p-4 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-[var(--radius-card)] bg-dark p-6 text-white md:p-8">
          <p className="text-[11px] font-medium tracking-[.14em] text-white/50 uppercase">{t("cardLabel")}</p>
          <h2 className="mt-4 text-[clamp(28px,4vw,42px)] leading-tight font-medium">{t("company")}</h2>
          <div className="mt-7 space-y-5 text-[14px] leading-relaxed">
            <p><span className="block text-white/50">{t("phone")}</span><a className="mt-1 inline-block text-[20px]" href={site.phoneHref}>{site.phone}</a></p>
            <p><span className="block text-white/50">{t("email")}</span><a className="mt-1 inline-block underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></p>
            <p><span className="block text-white/50">{t("whatsapp")}</span><a className="mt-1 inline-flex items-center gap-2" href={site.whatsapp} target="_blank" rel="noreferrer">{t("writeWhatsApp")}</a></p>
            <p><span className="block text-white/50">{t("instagram")}</span><a className="mt-1 inline-flex items-center gap-2" href="https://www.instagram.com/too_deevs/" target="_blank" rel="noreferrer">@too_deevs ↗</a></p>
            <p><span className="block text-white/50">{t("legalAddress")}</span><span className="mt-1 inline-block">{t("addressText")}</span><br/><a className="mt-1 inline-block text-white/70 underline underline-offset-4" href="https://2gis.kz/astana/inside/70030076513910385/firm/70000001112483051" target="_blank" rel="noreferrer">{t("mapLink")}</a></p>
            <p><span className="block text-white/50">{t("bin")}</span><span className="mt-1 inline-block">031240013006</span></p>
          </div>
          <LeadModalButton className="mt-7 inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-6 text-[13px] font-semibold text-ink transition-colors hover:bg-wood-light sm:w-fit">{t("application")} <span aria-hidden>↗</span></LeadModalButton>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/15 pt-5 text-[13px]">
            <a href="/deevs-presentation.pdf" target="_blank" rel="noreferrer" className="underline underline-offset-4">{t("presentation")}</a>
            <a href="/documents/deevs-license.pdf" target="_blank" rel="noreferrer" className="underline underline-offset-4">{t("license")}</a>
            <a href={`/documents/deevs-iso-9001-${locale === "kz" ? "kz" : "ru"}.pdf`} target="_blank" rel="noreferrer" className="underline underline-offset-4">ISO 9001</a>
            <a href={`/documents/deevs-iso-14001-${locale === "kz" ? "kz" : "ru"}.pdf`} target="_blank" rel="noreferrer" className="underline underline-offset-4">ISO 14001</a>
            <a href={`/documents/deevs-iso-45001-${locale === "kz" ? "kz" : "ru"}.pdf`} target="_blank" rel="noreferrer" className="underline underline-offset-4">ISO 45001</a>
          </div>
        </div>
        <div className="min-w-0 p-1 md:p-3"><ContactLocationMap /></div>
      </Panel>
    </PageShell>
  );
}
