/**
 * Визуалы главной. Тексты — в messages/*.json → home.
 * Фото объектов взяты из предоставленной презентации Deevs.
 */
import type { Visual } from "./types";

export const offerVisual: Visual = { kind: "photo", src: "/images/editorial/complex-construction.jpg", altKey: "home.offer.photoAlt", position: "50% 50%" };

export const stepVisuals: Visual[] = [
  { kind: "photo", src: "/images/editorial/workflow-structure.jpg", altKey: "home.steps.items.0.alt", position: "50% 50%" },
  { kind: "photo", src: "/images/editorial/workflow-paving.jpg", altKey: "home.steps.items.1.alt", position: "50% 50%" },
  { kind: "photo", src: "/images/editorial/workflow-site.jpg", altKey: "home.steps.items.2.alt", position: "50% 50%" },
];

export const statsRating = "5.0";
