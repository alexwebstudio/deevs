import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Visual as V } from "@/data/types";

/** Оптимизированное фото. Родитель задаёт размер и position: relative. */
export function Visual({
  visual,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
  priority,
}: {
  visual: V;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Kept for compatibility with compact gallery thumbnails. */
  compact?: boolean;
}) {
  const t = useTranslations();
  return <Image src={visual.src} alt={t(visual.altKey)} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} style={{ objectPosition: visual.position ?? "50% 50%" }} />;
}
