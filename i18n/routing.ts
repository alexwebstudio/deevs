import { defineRouting } from "next-intl/routing";

/**
 * Русская версия — основная и работает без префикса. Казахская доступна по /kz.
 */
export const routing = defineRouting({
  locales: ["ru", "kz"],
  defaultLocale: "ru",
  localePrefix: "as-needed",
  // Язык определяется только адресом: без редиректов по cookie/Accept-Language.
  // Иначе ссылка на русскую страницу могла открыться по-казахски, а роботы получали бы 307.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

/** BCP-47 для html[lang] и hreflang: «kz» в URL — это казахский язык (kk). */
export const htmlLang = (l: string) => (l === "kz" ? "kk" : "ru");

/** Публичный URL: русский язык без /ru, остальные языки с префиксом. */
export const localizedPath = (locale: string, path = "") => {
  // "" и "/" — главная: для казахской локали это "/kz", без завершающего слэша (иначе 308-редирект)
  const normalizedPath = !path || path === "/" ? "" : path.startsWith("/") ? path.replace(/\/+$/, "") : `/${path.replace(/\/+$/, "")}`;
  return locale === routing.defaultLocale ? (normalizedPath || "/") : `/${locale}${normalizedPath}`;
};
