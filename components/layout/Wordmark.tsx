import Image from "next/image";

export type WordmarkVariant = "a" | "b" | "c";
export const DEFAULT_WORDMARK: WordmarkVariant = "a";

export function Wordmark({ className = "" }: { variant?: WordmarkVariant; className?: string }) {
  return (
    <span className={`inline-flex max-w-full shrink-0 overflow-hidden ${className}`} aria-label="ТОО Deevs, construction company">
      <Image src="/images/deevs-logo-client.png" alt="DEEVS construction company" width={1280} height={685} className="block h-auto w-[96px] sm:w-[104px]" priority />
    </span>
  );
}

