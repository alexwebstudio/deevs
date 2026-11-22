import Image from "next/image";

export type WordmarkVariant = "a" | "b" | "c" | "white";
export const DEFAULT_WORDMARK: WordmarkVariant = "a";

export function Wordmark({ className = "", variant = DEFAULT_WORDMARK, priority = false }: { variant?: WordmarkVariant; className?: string; priority?: boolean }) {
  const src = variant === "white" ? "/images/deevs-logo-white-arch.png" : "/images/deevs-logo-client.png";
  return (
    <span className={`inline-flex max-w-full shrink-0 overflow-hidden ${className}`}>
      {/* sizes: логотип ~70–104 px — без него браузер качал файл шириной 3840 px */}
      <Image src={src} alt="DEEVS" width={1280} height={685} sizes="110px" className="block h-auto w-[96px] sm:w-[104px]" priority={priority} />
    </span>
  );
}

