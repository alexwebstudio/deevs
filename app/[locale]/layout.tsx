import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, htmlLang } from "@/i18n/routing";
import { BRAND, site } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { LeadModalProvider } from "@/components/providers/LeadModalProvider";
import { Analytics } from "@/components/providers/Analytics";

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

/**
 * Общие метаданные. Title/description/canonical/hreflang/OG каждая страница задаёт сама (lib/seo.ts),
 * поэтому здесь нет canonical главной — иначе он «наследуется» служебными страницами.
 * Бренд в заголовки страниц уже включён в messages → meta, шаблон «%s — DEEVS» не используется.
 */
export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
  return {
    metadataBase: new URL(site.url),
    title: t("siteTitle"),
    description: t("siteDescription"),
    applicationName: BRAND,
    creator: "ТОО Deevs",
    publisher: "ТОО Deevs",
    formatDetection: { telephone: false },
    ...(google || yandex ? { verification: { ...(google ? { google } : {}), ...(yandex ? { yandex } : {}) } } : {}),
  };
}

export const viewport: Viewport = { themeColor: "#111111" };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("meta");
  const description = t("siteDescription");

  /** Данные компании из предоставленной презентации. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GeneralContractor",
        "@id": `${site.url}/#organization`,
        name: BRAND,
        alternateName: ["ТОО Deevs", "Deevs"],
        legalName: "Товарищество с ограниченной ответственностью Deevs",
        description,
        url: site.url,
        logo: { "@type": "ImageObject", url: `${site.url}/images/deevs-logo-client.png`, width: 1280, height: 685 },
        image: `${site.url}/images/deevs-cover.jpg`,
        telephone: "+77779933999",
        email: site.email,
        taxID: "031240013006",
        foundingDate: "2006",
        areaServed: { "@type": "Country", name: "Kazakhstan" },
        knowsLanguage: ["ru", "kk"],
        sameAs: ["https://www.instagram.com/too_deevs/", "https://2gis.kz/astana/inside/70030076513910385/firm/70000001112483051"],
        contactPoint: [
          { "@type": "ContactPoint", telephone: "+77779933999", email: site.email, contactType: "sales", areaServed: "KZ", availableLanguage: ["Kazakh", "Russian"] },
          { "@type": "ContactPoint", url: site.whatsapp, contactType: "customer service", availableLanguage: ["Kazakh", "Russian"] },
        ],
        address: { "@type": "PostalAddress", streetAddress: "ул. Керей, Жанибек хандар, 44/1, кв. 37", addressLocality: "Астана", addressCountry: "KZ" },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: BRAND,
        alternateName: "ТОО Deevs",
        inLanguage: ["ru-KZ", "kk-KZ"],
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <html lang={htmlLang(locale)} className={fontVariables} data-loading="">
      <body>
        <noscript>
          {/* без JS: показываем сайт сразу и с веб-шрифтами */}
          <style>{`html[data-loading]{overflow:auto}[data-preloader]{display:none!important}html:not([data-fonts]){--font-brand:var(--font-unb-lat),var(--font-unb-cyr),var(--font-unb-ext),"Arial Black",sans-serif;--font-sans:var(--font-onest-lat),var(--font-onest-cyr),var(--font-onest-kk),var(--font-onest-ext),system-ui,sans-serif}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders>
            <LeadModalProvider>
              <Preloader />
              <Header />
              {children}
              <Footer />
            </LeadModalProvider>
          </AppProviders>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
