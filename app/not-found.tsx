import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — ТОО Deevs",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

/** Русская 404 для адресов вне локализованного маршрута. */
export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body className="m-0 min-h-screen bg-graphite font-sans text-white antialiased">
        <main data-not-found className="grid min-h-[100svh] place-items-center bg-graphite px-[var(--gutter)] py-16 text-white">
          <div className="flex max-w-[680px] flex-col items-center text-center">
            <p aria-hidden className="font-brand text-[clamp(80px,14vw,144px)] leading-none font-semibold tracking-[-0.07em] text-white/90">404</p>
            <h1 className="mt-5 text-[clamp(32px,5vw,64px)] leading-tight font-medium tracking-[-0.04em]">
              Здесь бетон ещё не залит
            </h1>
            <p className="mt-5 max-w-[34em] text-[16px] leading-relaxed text-white/60 sm:text-[18px]">
              Похоже, такой страницы пока нет. Вернитесь на главную или посмотрите реализованные объекты Deevs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-medium text-ink transition-colors hover:bg-surface">
                На главную
              </Link>
              <Link href="/projects" className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-[15px] font-medium text-white transition-colors hover:border-white/60">
                Все объекты
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
