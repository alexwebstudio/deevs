import { defineRouting } from "next-intl/routing";

/**
 * Русская версия — основная и работает без префикса. Казахская доступна по /kz.
 */
export const routing = defineRouting({
  locales: ["ru", "kz"],
  defaultLocale: "ru",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** BCP-47 для html[lang] и hreflang: «kz» в URL — это казахский язык (kk). */
export const htmlLang = (l: string) => (l === "kz" ? "kk" : "ru");

/** Публичный URL: русский язык без /ru, остальные языки с префиксом. */
export const localizedPath = (locale: string, path = "") => {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return locale === routing.defaultLocale ? (normalizedPath || "/") : `/${locale}${normalizedPath}`;
};
