"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LeadForm } from "@/components/home/LeadForm";

const LeadModalContext = createContext<() => void>(() => undefined);

export const useOpenLeadModal = () => useContext(LeadModalContext);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
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
          className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-black/65 p-3 backdrop-blur-sm animate-[leadFade_.35s_ease-out_both]"
          onMouseDown={(event) => event.target === event.currentTarget && close()}
        >
          <section role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" className="relative my-auto w-full max-w-[900px] rounded-[var(--radius-section)] bg-graphite p-3 shadow-2xl animate-[leadPop_.55s_cubic-bezier(.16,1,.3,1)_both] md:p-4">
            <button type="button" onClick={close} aria-label="Закрыть окно" className="absolute top-5 right-5 z-10 grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10">×</button>
            <div className="grid gap-5 px-4 pt-6 pb-3 md:grid-cols-[.7fr_1.3fr] md:px-7 md:pt-8">
              <div className="pr-10 text-white md:pt-8">
                <p className="text-[11px] font-medium tracking-[.14em] text-white/50 uppercase">ТОО Deevs</p>
                <h2 id="lead-modal-title" className="mt-4 text-[clamp(28px,4vw,48px)] leading-[1.02] font-medium tracking-[-.03em]">Оставить заявку</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">Кратко опишите объект и нужные работы. Мы свяжемся с вами.</p>
              </div>
              <LeadForm onSuccess={close} />
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
