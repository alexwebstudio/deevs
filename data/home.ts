/**
 * Визуалы главной. Тексты — в messages/*.json → home.
 * Фото объектов взяты из предоставленной презентации Deevs.
 */
import type { Visual } from "./types";

export const offerVisual: Visual = { kind: "photo", src: "/images/projects/work-pump-station.jpg", altKey: "home.offer.photoAlt", position: "50% 50%" };

export const stepVisuals: Visual[] = [
  { kind: "photo", src: "/images/projects/work-destructor-hangar.jpg", altKey: "home.steps.items.0.alt", position: "50% 50%" },
  { kind: "photo", src: "/images/projects/work-mezzanine.jpg", altKey: "home.steps.items.1.alt", position: "50% 50%" },
  { kind: "photo", src: "/images/projects/work-dormitory.jpg", altKey: "home.steps.items.2.alt", position: "50% 50%" },
];

export const realizedVisuals: Visual[] = [
  { kind: "photo", src: "/images/projects/work-dormitory.jpg", altKey: "home.realized.items.0.name", position: "50% 50%" },
  { kind: "photo", src: "/images/projects/work-pump-station.jpg", altKey: "home.realized.items.1.name", position: "50% 50%" },
  { kind: "photo", src: "/images/projects/work-destructor-hangar.jpg", altKey: "home.realized.items.2.name", position: "50% 50%" },
];

/** реализованные объекты на главной: срок (дней) для бейджа — остальное в messages */
export const realizedYears = ["2024–2025", "2025", "2023"];

export const finalCtaVisual: Visual = { kind: "photo", src: "/images/projects/work-hangar.jpg", altKey: "home.finalCta.photoAlt", position: "50% 50%" };

/** фон под стеклянными отзывами */
export const reviewsBackground = "/images/projects/work-pump-station.jpg";

export const statsRating = "5.0";
