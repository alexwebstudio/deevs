"use client";

import { useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, htmlLang } from "@/i18n/routing";
import { nav } from "@/config/site";
import { Wordmark } from "./Wordmark";
import { useOpenLeadModal } from "@/components/providers/LeadModalProvider";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const openLeadModal = useOpenLeadModal();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // переключатель языка показываем, только когда локалей больше одной
  const multiLang = routing.locales.length > 1;
  const localeLabel = (l: string) => l === "ru" ? "RU" : "ҚАЗ";

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("/").slice(0, 2).join("/")));

  // смена языка: та же страница, другая локаль
  const switchTo = (l: string) => {
    if (l === locale) return;
    startTransition(() => router.replace(pathname, { locale: l, scroll: false }));
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[var(--gutter)] pt-[calc(var(--gutter)+env(safe-area-inset-top)+10px)]">
      <div
        className={`pointer-events-auto mx-auto flex h-14 min-w-0 items-center justify-between gap-1.5 rounded-full pr-1.5 pl-3 text-white transition-[max-width,background-color,border-color,box-shadow] duration-[var(--dur-expand)] min-[380px]:gap-2 min-[380px]:pr-2 min-[380px]:pl-4 sm:gap-4 sm:pl-5 ${
          scrolled ? "glass-dark max-w-[1180px]" : "max-w-full border border-transparent"
        }`}
      >
        <Link href="/" aria-label={t("header.homeAria")} className="text-[15px] transition-opacity hover:opacity-80">
          <Wordmark variant="white" className="[&_img]:w-[70px] min-[380px]:[&_img]:w-[84px] sm:[&_img]:w-[104px]" />
        </Link>

        <nav aria-label={t("header.mainMenu")} className="hidden xl:block">
          <ul className="flex items-center gap-0.5 text-[13px] font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-full border px-3.5 py-2 transition-colors ${
                    isActive(item.href) ? "border-white/45 text-white" : "border-transparent text-white/75 hover:text-white"
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className={`hidden items-center gap-1 rounded-full border border-white/25 bg-white/5 p-1 text-[11px] font-semibold ${multiLang ? "sm:flex" : ""}`} role="group" aria-label={t("header.language")}>
            {routing.locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => switchTo(l)}
                aria-pressed={locale === l}
                lang={htmlLang(l)}
                className={`h-7 min-w-9 rounded-full px-2.5 uppercase transition-colors ${
                  locale === l ? "bg-white text-graphite shadow-sm" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {localeLabel(l)}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={openLeadModal}
            className="inline-flex h-10 min-w-[108px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-white px-2 text-[9px] font-semibold tracking-[0.01em] text-graphite uppercase transition-[transform,background-color] hover:scale-[1.03] hover:bg-surface min-[380px]:min-w-[128px] min-[380px]:px-3 min-[380px]:text-[10px] sm:min-w-[164px] sm:px-5 sm:text-[12px] sm:tracking-[0.04em]"
          >
            {t("header.discuss")}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("header.menuClose") : t("header.menuOpen")}
            className="relative grid size-10 shrink-0 place-items-center rounded-full border border-white/30 transition-colors hover:border-white/60 xl:hidden"
          >
            <span className={`absolute h-px w-4 bg-white transition-transform ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute h-px w-4 bg-white transition-transform ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`glass-dark mx-auto mt-2 max-h-[calc(100dvh-96px)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--radius-card)] text-white transition-[clip-path,opacity] duration-[var(--dur-expand)] xl:hidden ${
          open ? "pointer-events-auto opacity-100 [clip-path:inset(0_0_0_0_round_24px)]" : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0_round_24px)]"
        }`}
        inert={!open}
      >
        <ul className="p-3 text-[22px] font-medium">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-white/5 ${isActive(item.href) ? "bg-white/10" : ""}`}
              >
                {t(`nav.${item.key}`)}
                <span aria-hidden className="text-sm text-wood-light">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={`gap-2 border-t border-white/10 p-4 sm:hidden ${multiLang ? "flex" : "hidden"}`} role="group" aria-label={t("header.language")}>
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              aria-pressed={locale === l}
              className={`h-10 flex-1 rounded-full border text-[13px] font-semibold uppercase transition-colors ${
                locale === l ? "border-white bg-white text-graphite" : "border-white/35 text-white/80"
              }`}
            >
              {localeLabel(l)}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
