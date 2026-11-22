import type { Metadata } from "next";
import { localizedPath, routing } from "@/i18n/routing";
import { site } from "@/config/site";

const hreflang: Record<string, string> = { ru: "ru-KZ", kz: "kk-KZ" };

/** Абсолютный публичный URL страницы (русский без префикса, казахский с /kz, без завершающего слэша). */
export const absoluteUrl = (locale: string, path = "") => new URL(localizedPath(locale, path), site.url).toString().replace(/\/$/, "") || site.url;

/** hreflang-альтернативы (+ x-default на русскую версию) для страницы. */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[hreflang[l]] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return languages;
}

/** Сгенерированная OG-картинка раздела: /opengraph-image, /about/opengraph-image … (для kz — с префиксом). */
export const ogImagePath = (locale: string, section = "") => localizedPath(locale, `${section}/opengraph-image`);

type PageMetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  /** путь или URL картинки для соцсетей; по умолчанию — OG-картинка главной */
  image?: string;
  /** размеры картинки, если она не стандартная 1200×630 */
  imageSize?: { width: number; height: number };
  type?: "website" | "article";
  /** false — страница закрыта от индексации (noindex, без hreflang) */
  index?: boolean;
};

/** Полный набор поисковых метаданных и социальных превью для страницы. */
export function pageMetadata({ locale, path, title, description, keywords = [], image, imageSize = { width: 1200, height: 630 }, type = "website", index = true }: PageMetadataInput): Metadata {
  const normalizedPath = path === "/" ? "" : path;
  const canonical = absoluteUrl(locale, normalizedPath);
  const socialImage = new URL(image || ogImagePath(locale), site.url).toString();
  const baseKeywords = locale === "kz"
    ? ["ТОО Deevs", "Қазақстандағы өнеркәсіптік құрылыс", "Қазақстандағы құрылыс компаниясы", "Астанадағы құрылыс компаниясы", "кәсіпорындарға арналған құрылыс", "өнеркәсіптік құрылыс компаниясы", "Астанада ангар салу", "өндірістік ғимарат салу", "өндірістік ангарлар", "блокты-модульді ғимараттар", "инженерлік желілерді монтаждау", "инженерлік коммуникациялар", "жылу желілерін салу", "жылу желілерін жөндеу", "Астана"]
    : ["ТОО Deevs", "промышленное строительство Казахстан", "строительство для предприятий", "строительство ангаров", "производственные здания", "блочно-модульные здания", "инженерные сети", "тепловые сети", "Астана"];
  const pageKeywords = [...new Set([...baseKeywords, ...keywords])];

  return {
    title,
    description,
    keywords: pageKeywords,
    alternates: index ? { canonical, languages: languageAlternates(normalizedPath) } : { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.brand,
      type,
      locale: locale === "kz" ? "kk_KZ" : "ru_KZ",
      alternateLocale: locale === "kz" ? ["ru_KZ"] : ["kk_KZ"],
      images: [{ url: socialImage, ...imageSize, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

/** Метаданные служебных страниц (404): без canonical, hreflang и превью, закрыто от индексации. */
export function noindexMetadata(title: string): Metadata {
  return {
    title,
    description: null,
    keywords: null,
    alternates: null,
    openGraph: null,
    twitter: null,
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

/** Аккуратно укорачивает текст по границе слова (для description). */
export function clampText(text: string, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 20)).replace(/[\s,.:;·—-]+$/, "")}…`;
}
