// Яндекс.Директ рекламные блоки
// Настройка через environment variables:
// NEXT_PUBLIC_YANDEX_PARTNER_ID — ID партнёра (цифры после R-A-)
// NEXT_PUBLIC_YANDEX_METRIKA_ID — ID счётчика Яндекс.Метрики
// NEXT_PUBLIC_GA_MEASUREMENT_ID — ID Google Analytics (G-XXXXXXXXXX)
//
// Без этих переменных реклама и аналитика отключены (заглушки).

const YANDEX_PARTNER_ID = process.env.NEXT_PUBLIC_YANDEX_PARTNER_ID || '99999999';

export const AD_BLOCK_IDS = {
  homeTop: `R-A-${YANDEX_PARTNER_ID}-1`,
  homeBottom: `R-A-${YANDEX_PARTNER_ID}-2`,
  calcTop: `R-A-${YANDEX_PARTNER_ID}-3`,
  calcBottom: `R-A-${YANDEX_PARTNER_ID}-4`,
  categoryTop: `R-A-${YANDEX_PARTNER_ID}-5`,
  categoryBottom: `R-A-${YANDEX_PARTNER_ID}-6`,
  converterTop: `R-A-${YANDEX_PARTNER_ID}-7`,
  converterBottom: `R-A-${YANDEX_PARTNER_ID}-8`,
};

export const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || '';
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export const ADS_ENABLED = YANDEX_PARTNER_ID !== '99999999';
export const METRIKA_ENABLED = YANDEX_METRIKA_ID !== '';
export const GA_ENABLED = GA_MEASUREMENT_ID !== '';

// Инструкция по подключению:
// 1. Зарегистрируйтесь на https://partner.yandex.ru
// 2. Создайте площадку типа "Сайт"
// 3. Добавьте блоки нужных размеров:
//    - Горизонтальный (728×90) для верхних позиций
//    - Вертикальный (300×600) или Ректангл (300×250) для нижних
//    - Мобильный (320×100) для мобильных устройств
// 4. Установите environment variables:
//    NEXT_PUBLIC_YANDEX_PARTNER_ID=XXXXXXXXXX
//    NEXT_PUBLIC_YANDEX_METRIKA_ID=XXXXXXX
//    NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
// 5. Код RTB в <head> уже добавлен в layout.tsx
// 6. Дождитесь модерации площадки (1–3 дня)
// 7. Реклама начнёт показываться автоматически
