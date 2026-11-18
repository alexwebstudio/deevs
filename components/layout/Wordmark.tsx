import Image from "next/image";

export type WordmarkVariant = "a" | "b" | "c";
export const DEFAULT_WORDMARK: WordmarkVariant = "a";

export function Wordmark({ className = "" }: { variant?: WordmarkVariant; className?: string }) {
  return (
    <span className={`inline-flex max-w-full overflow-hidden rounded-sm bg-white p-1 ${className}`} aria-label="ТОО Deevs, construction company">
      <Image src="/images/deevs-logo-client.png" alt="DEEVS construction company" width={1280} height={685} className="block h-auto w-[152px] sm:w-[176px]" priority />
    </span>
  );
}

