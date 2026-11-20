import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Keep the default Russian locale out of public URLs, including manually entered /ru paths.
  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/ru(?=\/|$)/, "") || "/";
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  // всё, кроме API, служебных файлов Next и статики
  matcher: ["/((?!api|_next|_vercel|.*\..*).*)"],
};
