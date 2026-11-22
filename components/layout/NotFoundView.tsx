import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Содержимое 404 в графитовом стиле сайта (тексты — messages → notFound). */
export function NotFoundView() {
  const t = useTranslations("notFound");
  return (
    <main data-not-found className="grid min-h-[100svh] place-items-center bg-graphite px-[var(--gutter)] py-16 text-white">
      <div className="flex max-w-[680px] flex-col items-center text-center">
        <p aria-hidden className="font-brand text-[clamp(80px,14vw,144px)] leading-none font-semibold tracking-[-0.07em] text-white/90">404</p>
        <h1 className="mt-5 text-[clamp(32px,5vw,64px)] leading-tight font-medium tracking-[-0.04em]">{t("heading")}</h1>
        <p className="mt-5 max-w-[34em] text-[16px] leading-relaxed text-white/60 sm:text-[18px]">{t("text")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-medium text-ink transition-colors hover:bg-surface">
            {t("home")}
          </Link>
          <Link href="/projects" className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-[15px] font-medium transition-colors hover:border-white/60">
            {t("projects")}
          </Link>
        </div>
      </div>
    </main>
  );
}
