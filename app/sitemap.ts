import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { routing, htmlLang } from "@/i18n/routing";
import { works } from "@/data/works";

/** Все страницы в обеих локалях с hreflang-альтернативами. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", "/services", "/projects", ...works.map((w) => `/projects/${w.slug}`), "/about", "/contacts", "/privacy"];
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/catalog" ? 0.9 : 0.7,
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [`${htmlLang(l)}-KZ`, `${site.url}/${l}${path}`])) },
    })),
  );
}
