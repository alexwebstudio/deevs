"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useApp, wasIntroPlayed } from "@/components/providers/AppProviders";
import { prefersReducedMotion } from "@/lib/gsap";
import { FRAME } from "@/components/ui/houseFrame";

/** power2.inOut / expo.inOut / ease-out-quint как cubic-bezier для Web Animations API */
const POWER2_IN_OUT = "cubic-bezier(0.45, 0, 0.55, 1)";
const EXPO_IN_OUT = "cubic-bezier(0.87, 0, 0.13, 1)";
const QUINT_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Прелоадер длится около 3 секунд и одинаково проигрывается при каждой полной перезагрузке.
 * При переходах между страницами и смене языка не показывается.
 * Работает на Web Animations API — стартует сразу, без ожидания библиотек.
 */
export function Preloader() {
  const t = useTranslations("preloader");
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(wasIntroPlayed);
  const { finishIntro } = useApp();

  useEffect(() => {
    if (gone) return;
    const el = root.current!;
    const lines = Array.from(el.querySelectorAll<SVGPathElement>("[data-line]"));
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-letter]"));
    const stage = el.querySelector<HTMLElement>("[data-stage]")!;

    const anims: Animation[] = [];
    const timers: number[] = [];
    let cancelled = false;
    const A = (node: Element, kf: Keyframe[], opt: KeyframeAnimationOptions) => {
      const an = node.animate(kf, { fill: "both", ...opt });
      anims.push(an);
      return an;
    };
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));
    const done = () => setGone(true);

    if (prefersReducedMotion()) {
      lines.forEach((l) => (l.style.strokeDashoffset = "0"));
      letters.forEach((l) => (l.style.opacity = "1"));
      timers.push(window.setTimeout(finishIntro, 300));
      A(el, [{ opacity: 1 }, { opacity: 0 }], { duration: 400, delay: 300 }).onfinish = done;
      return () => timers.forEach(clearTimeout);
    }

    const exit = (dur: number) => {
      if (cancelled) return;
      finishIntro();
      A(stage, [{ transform: "none" }, { transform: "translateY(-56px)" }], { duration: dur, easing: EXPO_IN_OUT });
      A(el, [{ clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)" }], { duration: dur, easing: EXPO_IN_OUT }).onfinish = done;
    };

    const letterIn = (i: number, delay: number, dur: number) =>
      A(
        letters[i],
        [
          { opacity: 0, transform: "translateY(0.45em)", filter: "blur(10px)" },
          { opacity: 1, transform: "none", filter: "blur(0px)" },
        ],
        { duration: dur, delay, easing: QUINT_OUT },
      );

    // One timing sequence prevents reloads from switching to a shorter animation.
    for (let g = 0; g <= 5; g++) {
      lines
        .filter((l) => l.dataset.group === String(g))
        .forEach((l, i) => A(l, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 760, delay: 100 + g * 170 + i * 24, easing: POWER2_IN_OUT }));
    }
    letters.forEach((_, i) => letterIn(i, 900 + i * 45, 700));
    wait(2200)
      .then(() => exit(800));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      anims.forEach((an) => an.cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  const word = "DEEVS";
  return (
    <div
      ref={root}
      data-preloader
      role="status"
      aria-live="polite"
      aria-label={t("aria")}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-graphite text-white [clip-path:inset(0%_0%_0%_0%)]"
    >
      <div data-stage className="flex flex-col items-center">
        {/* Буквы DEEVS поднимаются из размытия по исходной анимации */}
        <p className="font-brand mb-8 text-[clamp(28px,4.4vw,56px)] leading-none tracking-[0.06em] uppercase" aria-hidden>
          {Array.from(word).map((ch, i) => (
            <span key={i} data-letter className="inline-block font-bold opacity-0">
              {ch}
            </span>
          ))}
        </p>
        <svg viewBox="0 30 480 260" className="w-[min(72vw,460px)]" fill="none" aria-hidden>
          {FRAME.map((p, i) => (
            <path
              key={i}
              data-line
              data-group={p.group}
              d={p.d}
              pathLength={1}
              stroke="rgba(255,255,255,0.82)"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1 1"
              strokeDashoffset={1}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
