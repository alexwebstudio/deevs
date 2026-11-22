import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { works } from "./data/works";

const intlMiddleware = createMiddleware(routing);

/** Все существующие страницы (путь без локали). Остальное — 404. */
const knownPaths = new Set([
  "",
  "/services",
  "/projects",
  "/about",
  "/contacts",
  "/privacy",
  ...works.map((work) => `/projects/${work.slug}`),
  // сгенерированные картинки для соцсетей
  "/opengraph-image",
  "/about/opengraph-image",
  "/contacts/opengraph-image",
  "/projects/opengraph-image",
]);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Русская версия — без префикса: /ru и /ru/... → постоянный редирект
  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/ru(?=\/|$)/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const [, first = "", ...rest] = pathname.split("/");
  const lower = first.toLowerCase();
  const isLocale = (routing.locales as readonly string[]).includes(lower);

  // /KZ, /Kz/about → /kz, /kz/about (один постоянный редирект вместо дубля страницы)
  if (isLocale && first !== lower) {
    const url = request.nextUrl.clone();
    url.pathname = lower === routing.defaultLocale ? `/${rest.join("/")}` : `/${[lower, ...rest].join("/")}`;
    return NextResponse.redirect(url, 308);
  }

  const locale = isLocale ? lower : routing.defaultLocale;
  const path = isLocale ? (rest.length ? `/${rest.join("/")}` : "") : pathname === "/" ? "" : pathname;

  // Неизвестный адрес → статическая 404-страница нужного языка с HTTP-статусом 404
  if (!knownPaths.has(path)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/page-404`;
    return NextResponse.rewrite(url, { status: 404 });
  }

  return intlMiddleware(request);
}

export const config = {
  // всё, кроме API, служебных файлов Next и статики (файлов с расширением);
  // "\\." — экранированная точка (в строке "\." превращается в «любой символ»)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
