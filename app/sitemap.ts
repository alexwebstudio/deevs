import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { routing, htmlLang, localizedPath } from "@/i18n/routing";
import { works } from "@/data/works";

/** Все страницы в обеих локалях с hreflang-альтернативами. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/projects", ...works.map((w) => `/projects/${w.slug}`), "/about", "/contacts"];
  return paths.flatMap((path) =>
    routing.locales.map((locale) => {
      const work = works.find((item) => `/projects/${item.slug}` === path);
      return {
        url: new URL(localizedPath(locale, path), site.url).toString(),
        changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
        priority: path === "" ? 1 : path === "/services" || path === "/projects" ? 0.9 : path.startsWith("/projects/") ? 0.8 : 0.7,
        ...(work?.image ? { images: [`${site.url}${work.image}`] } : {}),
        alternates: { languages: Object.fromEntries(routing.locales.map((l) => [`${htmlLang(l)}-KZ`, new URL(localizedPath(l, path), site.url).toString()])) },
      };
    }),
  );
}
