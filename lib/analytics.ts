/**
 * Цели для аналитики. Счётчики подключаются переменными окружения (см. .env.example):
 * NEXT_PUBLIC_YANDEX_METRIKA_ID — Яндекс Метрика, NEXT_PUBLIC_GA_ID — Google Analytics 4.
 * Без них функции ничего не делают. Цели в Метрике нужно создать с такими же идентификаторами
 * (тип «JavaScript-событие»): lead_form_open, lead_form_submit, phone_click, whatsapp_click,
 * email_click, presentation_open, document_open.
 */
export type Goal =
  | "lead_form_open"
  | "lead_form_submit"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "presentation_open"
  | "document_open";

type AnalyticsWindow = Window & {
  ym?: (id: number, method: string, ...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

export const METRIKA_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || 0;
const rawGa = process.env.NEXT_PUBLIC_GA_ID || "";
export const GA_ID = /^G-[A-Z0-9]+$/i.test(rawGa) ? rawGa : "";

export function trackGoal(goal: Goal, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  try {
    if (METRIKA_ID && w.ym) w.ym(METRIKA_ID, "reachGoal", goal, params);
    if (GA_ID && w.gtag) w.gtag("event", goal, params ?? {});
    // для Google Tag Manager, если его подключат позже
    if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: goal, ...params });
  } catch {
    // аналитика никогда не должна ломать сайт
  }
}

/** Цель по ссылке, на которую кликнули (делегирование кликов в <Analytics />). */
export function goalForHref(href: string): Goal | null {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (/wa\.me|whatsapp\.com/i.test(href)) return "whatsapp_click";
  if (/deevs-presentation\.pdf/i.test(href)) return "presentation_open";
  if (/\.pdf($|\?)/i.test(href)) return "document_open";
  return null;
}
