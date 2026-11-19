import type { Metadata } from "next";
import { localizedPath, routing } from "@/i18n/routing";
import { site } from "@/config/site";

const hreflang: Record<string, string> = { ru: "ru-KZ", kz: "kk-KZ" };

type PageMetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
};

/** Полный набор поисковых метаданных и социальных превью для каждой индексируемой страницы. */
export function pageMetadata({ locale, path, title, description, keywords = [], image, type = "website" }: PageMetadataInput): Metadata {
  const normalizedPath = path === "/" ? "" : path;
  const canonical = new URL(localizedPath(locale, normalizedPath), site.url);
  const languages: Record<string, string> = { "x-default": new URL(localizedPath(routing.defaultLocale, normalizedPath), site.url).toString() };
  for (const activeLocale of routing.locales) {
    languages[hreflang[activeLocale]] = new URL(localizedPath(activeLocale, normalizedPath), site.url).toString();
  }
  const socialImage = image ? new URL(image, site.url).toString() : new URL(localizedPath(locale, "/opengraph-image"), site.url).toString();
  const baseKeywords = locale === "kz"
    ? ["ТОО Deevs", "Қазақстандағы өнеркәсіптік құрылыс", "Қазақстандағы құрылыс компаниясы", "Астанадағы құрылыс компаниясы", "кәсіпорындарға арналған құрылыс", "өнеркәсіптік құрылыс компаниясы", "Астанада ангар салу", "өндірістік ғимарат салу", "өндірістік ангарлар", "блокты-модульді ғимараттар", "инженерлік желілерді монтаждау", "инженерлік коммуникациялар", "жылу желілерін салу", "жылу желілерін жөндеу", "Астана"]
    : ["ТОО Deevs", "промышленное строительство Казахстан", "строительство для предприятий", "строительство ангаров", "производственные здания", "блочно-модульные здания", "инженерные сети", "тепловые сети", "Астана"];
  const pageKeywords = [...new Set([...baseKeywords, ...keywords])];

  return {
    title,
    description,
    keywords: pageKeywords,
    alternates: { canonical: canonical.toString(), languages },
    openGraph: {
      title,
      description,
      url: canonical.toString(),
      siteName: site.brand,
      type,
      locale: locale === "kz" ? "kk_KZ" : "ru_KZ",
      images: [{ url: socialImage, alt: `${title} — ${site.brand}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

/** canonical + hreflang для страницы (путь без локали, например "/catalog"). */
export function alternates(locale: string, path: string): Metadata["alternates"] {
  const p = path === "/" ? "" : path;
  const languages: Record<string, string> = { "x-default": localizedPath(routing.defaultLocale, p) };
  for (const l of routing.locales) languages[hreflang[l]] = localizedPath(l, p);
  return { canonical: localizedPath(locale, p), languages };
}
