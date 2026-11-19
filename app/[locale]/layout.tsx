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
import { pageMetadata } from "@/lib/seo";

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("siteTitle");
  const description = t("siteDescription");
  return {
    ...pageMetadata({ locale, path: "/", title, description, keywords: locale === "kz" ? ["Астанадағы өнеркәсіптік құрылыс", "Қазақстандағы құрылыс компаниясы", "өндірістік ангарлар", "кәсіпорындардың инженерлік желілері"] : ["промышленное строительство Астана", "строительная компания Казахстан", "производственные ангары", "инженерные сети предприятий"] }),
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${BRAND}` },
    description,
    applicationName: BRAND,
    creator: "ТОО Deevs",
    publisher: BRAND,
    formatDetection: { telephone: false },
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
    "@type": "GeneralContractor",
    "@id": `${site.url}/#organization`,
    name: BRAND,
    legalName: "Товарищество с ограниченной ответственностью Deevs",
    description,
    url: site.url,
    logo: `${site.url}/images/deevs-logo-client.png`,
    image: `${site.url}/images/deevs-cover.jpg`,
    telephone: site.phone,
    taxID: "031240013006",
    foundingDate: "2006",
    areaServed: { "@type": "Country", name: "Казахстан" },
    sameAs: ["https://www.instagram.com/too_deevs/", "https://2gis.kz/astana/inside/70030076513910385/firm/70000001112483051"],
    email: site.email,
    contactPoint: { "@type": "ContactPoint", telephone: site.phone, email: site.email, contactType: "sales", availableLanguage: ["Kazakh", "Russian"] },
    address: { "@type": "PostalAddress", streetAddress: "ул. Керей, Жанибек хандар, 44/1, кв. 37", addressLocality: "Астана", addressCountry: "KZ" },
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
      </body>
    </html>
  );
}
