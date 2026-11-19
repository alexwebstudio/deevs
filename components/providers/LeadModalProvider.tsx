"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LeadForm } from "@/components/home/LeadForm";

const LeadModalContext = createContext<() => void>(() => undefined);

export const useOpenLeadModal = () => useContext(LeadModalContext);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations("leadModal");
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const show = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <LeadModalContext.Provider value={show}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-black/65 p-2 backdrop-blur-sm animate-[leadFade_.35s_ease-out_both] sm:p-3"
          onMouseDown={(event) => event.target === event.currentTarget && close()}
        >
          <section role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" className="relative my-auto max-h-[calc(100dvh-16px)] w-full max-w-[900px] overflow-y-auto overscroll-contain rounded-[var(--radius-section)] bg-graphite p-2 shadow-2xl animate-[leadPop_.55s_cubic-bezier(.16,1,.3,1)_both] sm:max-h-[calc(100dvh-24px)] sm:p-3 md:overflow-visible md:p-4">
            <button type="button" onClick={close} aria-label={t("close")} className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full border border-white/20 bg-graphite text-white transition-colors hover:bg-white/10 sm:top-5 sm:right-5">×</button>
            <div className="grid gap-3 px-3 pt-10 pb-2 sm:gap-5 sm:px-4 sm:pt-6 sm:pb-3 md:grid-cols-[.7fr_1.3fr] md:px-7 md:pt-8">
              <div className="pr-10 text-white md:pt-8">
                <p className="text-[11px] font-medium tracking-[.14em] text-white/50 uppercase">{t("eyebrow")}</p>
                <h2 id="lead-modal-title" className="mt-2 text-[clamp(28px,4vw,48px)] leading-[1.02] font-medium tracking-[-.03em] sm:mt-4">{t("title")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60 sm:mt-4">{t("lead")}</p>
              </div>
              <LeadForm onClose={close} />
            </div>
          </section>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}

export function LeadModalButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const open = useOpenLeadModal();
  return <button type="button" onClick={open} className={className}>{children}</button>;
}
