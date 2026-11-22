"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GA_ID, METRIKA_ID, goalForHref, trackGoal } from "@/lib/analytics";

/**
 * Счётчики (только если заданы ID в переменных окружения) + цели по кликам на телефон,
 * WhatsApp, почту и PDF. Визуально ничего не выводит.
 */
export function Analytics() {
  const pathname = usePathname();
  const first = useRef(true);

  // переходы внутри SPA — отдельный хит в Метрику (GA4 считает их сам через history)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const w = window as Window & { ym?: (id: number, method: string, url: string) => void };
    if (METRIKA_ID && w.ym) w.ym(METRIKA_ID, "hit", window.location.href);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const goal = link ? goalForHref(link.getAttribute("href") || "") : null;
      if (goal) trackGoal(goal);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      {METRIKA_ID > 0 && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${METRIKA_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
        </Script>
      )}
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag("js",new Date());gtag("config","${GA_ID}");`}
          </Script>
        </>
      )}
    </>
  );
}
