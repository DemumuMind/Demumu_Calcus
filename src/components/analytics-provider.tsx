"use client";

import Script from "next/script";

/**
 * Аналитика: Yandex.Metrika и Google Analytics 4
 * 
 * Инструкция по подключению:
 * 
 * === YANDEX.METRIKA ===
 * 1. Зарегистрируйтесь на https://metrika.yandex.ru
 * 2. Создайте новый счётчик
 * 3. Скопируйте ID счётчика (число, например: 12345678)
 * 4. Замените YANDEX_METRIKA_ID ниже на ваш ID
 * 5. Включите в настройках счётчика:
 *    - Вебвизор (запись поведения)
 *    - Карта кликов
 *    - Точный показатель отказов
 * 
 * === GOOGLE ANALYTICS 4 ===
 * 1. Зарегистрируйтесь на https://analytics.google.com
 * 2. Создайте новый поток данных (Web)
 * 3. Скопируйте Measurement ID (формат: G-XXXXXXXXXX)
 * 4. Замените GA_MEASUREMENT_ID ниже на ваш ID
 * 
 * === ДОПОЛНИТЕЛЬНО ===
 * Для отслеживания конверсий (целей):
 * - В Метрике: Настройки → Цели → Добавить цель
 *   Рекомендуемые цели: расчёт на калькуляторе, копирование результата,
 *   переход к связанному калькулятору, подписка на историю
 * - В GA4: Настройки → События → Создать событие
 *   Автоматически отслеживаются: page_view, scroll, click
 */

const YANDEX_METRIKA_ID = "99999999"; // ЗАМЕНИТЕ на реальный ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // ЗАМЕНИТЕ на реальный ID

export function AnalyticsProvider() {
  return (
    <>
      {/* Yandex.Metrika */}
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
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
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>

      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
