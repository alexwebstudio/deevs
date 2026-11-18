import Image from "next/image";

export type WordmarkVariant = "a" | "b" | "c" | "white";
export const DEFAULT_WORDMARK: WordmarkVariant = "a";

export function Wordmark({ className = "", variant = DEFAULT_WORDMARK }: { variant?: WordmarkVariant; className?: string }) {
  const src = variant === "white" ? "/images/deevs-logo-white.png" : "/images/deevs-logo-client.png";
  return (
    <span className={`inline-flex max-w-full shrink-0 overflow-hidden ${className}`} aria-label="ТОО Deevs, construction company">
      <Image src={src} alt="DEEVS construction company" width={1280} height={685} className="block h-auto w-[96px] sm:w-[104px]" priority />
    </span>
  );
}

