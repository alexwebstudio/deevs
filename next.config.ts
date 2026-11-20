import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // отдельная папка для локальной проверки сборки, чтобы не задевать dev-сервер
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/ru", destination: "/", permanent: true },
      { source: "/ru/:path*", destination: "/:path*", permanent: true },
      { source: "/:locale/catalog/:path*", destination: "/:locale/services", permanent: true },
      { source: "/:locale/catalog", destination: "/:locale/services", permanent: true },
      { source: "/:locale/technology", destination: "/:locale/about", permanent: true },
      { source: "/:locale/payment/:path*", destination: "/:locale/services", permanent: true },
      { source: "/:locale/payment", destination: "/:locale/services", permanent: true },
      { source: "/:locale/logo-preview", destination: "/:locale", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
