import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Политика конфиденциальности не закрыта здесь намеренно: робот должен её прочитать, чтобы увидеть noindex.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
