"use client";

import Script from "next/script";

const YANDEX_METRIKA_ID = "99999999";
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

const hasRealIds = YANDEX_METRIKA_ID !== "99999999" || !GA_MEASUREMENT_ID.includes("XXXX");

export function AnalyticsProvider() {
  if (!hasRealIds) return null;

  return (
    <>
      {YANDEX_METRIKA_ID !== "99999999" && (
        <Script
          id="yandex-metrika"
          strategy="lazyOnload"
        >
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YANDEX_METRIKA_ID}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
      )}

      {GA_MEASUREMENT_ID !== "G-XXXXXXXXXX" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
