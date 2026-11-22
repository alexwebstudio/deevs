import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // отдельная папка для локальной проверки сборки, чтобы не задевать dev-сервер
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // русская версия живёт без префикса /ru (дублирует правило в middleware.ts на уровне конфигурации)
    return [
      { source: "/ru", destination: "/", permanent: true },
      { source: "/ru/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        // PDF-документы не нужны в выдаче отдельными результатами — их ищут на страницах сайта
        source: "/deevs-presentation.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/documents/:file*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
