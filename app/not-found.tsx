import Link from "next/link";
import { FRAME } from "@/components/ui/houseFrame";

/** Русская 404 для адресов вне локализованного маршрута. */
export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body className="m-0 min-h-screen bg-graphite font-sans text-white antialiased">
        <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-[var(--gutter)] pt-16 pb-12">
          <div className="relative flex max-w-[760px] flex-col items-center text-center">
            <svg viewBox="0 30 480 270" className="w-[min(86vw,460px)]" fill="none" aria-hidden="true">
              {FRAME.map((part, index) => (
                <path key={index} d={part.d} stroke="#fff" strokeOpacity=".1" strokeWidth="1.2" strokeDasharray="4 6" />
              ))}
              <path d="M40 280H440" stroke="#89939e" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <p className="mt-6 font-brand text-[clamp(72px,14vw,168px)] leading-none font-semibold tracking-[-0.06em]">
              4<span className="text-wood">0</span>4
            </p>
            <h1 className="mt-4 text-[clamp(26px,3.4vw,44px)] leading-tight font-medium tracking-[-0.03em]">
              Здесь цемент ещё не залит
            </h1>
            <p className="mt-4 max-w-[30em] text-[17px] text-white/60">
              Эта страница пока не готова. Вернитесь на главную или посмотрите наши направления работ.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-medium text-ink transition-colors hover:bg-surface">
                На главную
              </Link>
              <Link href="/services" className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-[15px] font-medium transition-colors hover:border-white/60">
                Наши услуги
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
