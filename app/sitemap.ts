import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { routing } from "@/i18n/routing";
import { works } from "@/data/works";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

/** Дата сборки = дата последнего обновления контента (сайт статический, контент меняется только деплоем). */
const lastModified = new Date();

/** Все индексируемые страницы в обеих локалях с hreflang-альтернативами. Политика и 404 сюда не входят (noindex). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/projects", ...works.map((w) => `/projects/${w.slug}`), "/about", "/contacts"];
  return paths.flatMap((path) =>
    routing.locales.map((locale) => {
      const work = works.find((item) => `/projects/${item.slug}` === path);
      return {
        url: absoluteUrl(locale, path),
        lastModified,
        changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
        priority: path === "" ? 1 : path === "/services" || path === "/projects" ? 0.9 : path.startsWith("/projects/") ? 0.7 : 0.8,
        ...(work ? { images: work.gallery.map((photo) => `${site.url}${photo}`) } : {}),
        alternates: { languages: languageAlternates(path) },
      };
    }),
  );
}
