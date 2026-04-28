// @ts-nocheck
import { Calculator } from '../types';

// ========== ЦВЕТОВЫЕ МОДЕЛИ (conv-cvet) ==========

export const rgbVHex: Calculator = {
  id: 'rgb-v-hex',
  slug: 'rgb-v-hex',
  title: 'RGB в HEX',
  description: 'Перевод цвета из модели RGB (красный, зелёный, синий) в шестнадцатеричный HEX-код.',
  category: 'konvertery',
  subcategory: 'conv-cvet',
  type: 'converter',
  inputs: [
    {
      name: 'r',
      label: 'Красный (R)',
      type: 'number',
      min: 0,
      max: 255,
      defaultValue: 255,
      required: true,
    },
    {
      name: 'g',
      label: 'Зелёный (G)',
      type: 'number',
      min: 0,
      max: 255,
      defaultValue: 0,
      required: true,
    },
    {
      name: 'b',
      label: 'Синий (B)',
      type: 'number',
      min: 0,
      max: 255,
      defaultValue: 0,
      required: true,
    },
  ],
  outputs: [{ name: 'result', label: 'HEX', type: 'text' }],
  calculate: ({ r, g, b }) => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    return [{ value: hex, label: 'HEX-код', unit: '' }];
  },
  content: {
    howTo: 'Введите значения красного, зелёного и синего каналов (от 0 до 255). Результат — шестнадцатеричный HEX-код цвета.',
    about: 'RGB — аддитивная цветовая модель, где цвет образуется смешиванием трёх основных цветов: красного, зелёного и синего. HEX — шестнадцатеричная запись того же цвета, широко используемая в веб-разработке.',
    formula: 'HEX = #RRGGBB, где RR, GG и BB — шестнадцатеричные представления каналов R, G, B.',
    faq: [
      {
        question: 'Для чего нужен HEX-код?',
        answer: 'HEX-коды используются в CSS, HTML и дизайне для точного указания цвета в веб-разработке.',
      },
      {
        question: 'Может ли HEX содержать прозрачность?',
        answer: 'Стандартный HEX — 6 символов (RRGGBB). Для прозрачности используется 8-символьный HEX с альфа-каналом (RRGGBBAA).',
      },
    ],
    sources: [{ title: 'W3C — CSS Colors', url: 'https://www.w3.org/TR/css-color-3/' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: 'RGB(255, 0, 0) → #FF0000', url: '/calculator/rgb-v-hex?r=255&g=0&b=0' },
    { value: 'RGB(0, 128, 0) → #008000', url: '/calculator/rgb-v-hex?r=0&g=128&b=0' },
    { value: 'RGB(128, 128, 128) → #808080', url: '/calculator/rgb-v-hex?r=128&g=128&b=128' },
  ],
};

export const hexVRgb: Calculator = {
  id: 'hex-v-rgb',
  slug: 'hex-v-rgb',
  title: 'HEX в RGB',
  description: 'Перевод шестнадцатеричного HEX-кода цвета в модель RGB.',
  category: 'konvertery',
  subcategory: 'conv-cvet',
  type: 'converter',
  inputs: [
    {
      name: 'hex',
      label: 'HEX-код',
      type: 'text',
      placeholder: '#FF0000',
      defaultValue: '#FF0000',
      required: true,
    },
  ],
  outputs: [{ name: 'result', label: 'RGB', type: 'text' }],
  calculate: ({ hex }) => {
    let h = hex.replace('#', '');
    if (h.length === 3) {
      h = h
        .split('')
        .map((c: string) => c + c)
        .join('');
    }
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return [{ value: 'Неверный HEX', label: 'Ошибка' }];
    }
    return [{ value: `RGB(${r}, ${g}, ${b})`, label: 'RGB', unit: '' }];
  },
  content: {
    howTo: 'Введите HEX-код цвета (например, #FF0000 или #F00). Результат — значения RGB каналов.',
    about: 'HEX-код — компактная шестнадцатеричная запись цвета. Конвертер извлекает из неё красный, зелёный и синий каналы в десятичном виде.',
    formula: 'R = hex(1..2)₁₆, G = hex(3..4)₁₆, B = hex(5..6)₁₆.',
    faq: [
      {
        question: 'Поддерживаются ли короткие HEX-коды?',
        answer: 'Да, трёхсимвольные HEX-коды (например, #F00) автоматически расширяются до шестисимвольных (#FF0000).',
      },
      {
        question: 'Регистр символов важен?',
        answer: 'Нет, HEX-коды нечувствительны к регистру: #ff0000 и #FF0000 — одинаковые цвета.',
      },
    ],
    sources: [{ title: 'MDN — Hex colors', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '#FF0000 → RGB(255, 0, 0)', url: '/calculator/hex-v-rgb?hex=%23FF0000' },
    { value: '#00FF00 → RGB(0, 255, 0)', url: '/calculator/hex-v-rgb?hex=%2300FF00' },
    { value: '#0000FF → RGB(0, 0, 255)', url: '/calculator/hex-v-rgb?hex=%230000FF' },
  ],
};

export const cmykVRgb: Calculator = {
  id: 'cmyk-v-rgb',
  slug: 'cmyk-v-rgb',
  title: 'CMYK в RGB',
  description: 'Перевод цвета из модели CMYK (голубой, пурпурный, жёлтый, чёрный) в RGB.',
  category: 'konvertery',
  subcategory: 'conv-cvet',
  type: 'converter',
  inputs: [
    {
      name: 'c',
      label: 'Голубой (C)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      required: true,
    },
    {
      name: 'm',
      label: 'Пурпурный (M)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 100,
      required: true,
    },
    {
      name: 'y',
      label: 'Жёлтый (Y)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 100,
      required: true,
    },
    {
      name: 'k',
      label: 'Чёрный (K)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      required: true,
    },
  ],
  outputs: [{ name: 'result', label: 'RGB', type: 'text' }],
  calculate: ({ c, m, y, k }) => {
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return [
      {
        value: `RGB(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
        label: 'RGB',
        unit: '',
      },
    ];
  },
  content: {
    howTo: 'Введите значения C, M, Y, K в процентах (0–100). Результат — значения RGB (0–255).',
    about: 'CMYK — субтрактивная цветовая модель, используемая в полиграфии. RGB — аддитивная модель для экранов. Перевод между ними необходим при подготовке макетов к печати.',
    formula: 'R = 255 × (1 − C/100) × (1 − K/100), G = 255 × (1 − M/100) × (1 − K/100), B = 255 × (1 − Y/100) × (1 − K/100).',
    faq: [
      {
        question: 'Почему результат может отличаться от ожидаемого?',
        answer: 'CMYK и RGB имеют разные цветовые охваты. Некоторые цвета CMYK невозможно точно воспроизвести в RGB и наоборот.',
      },
      {
        question: 'Что означает K (чёрный)?',
        answer: 'K — ключевой (чёрный) цвет. Он добавлен для экономии краски и получения глубокого чёрного.',
      },
    ],
    sources: [{ title: 'Adobe — Color spaces', url: 'https://helpx.adobe.com/photoshop/using/color-modes.html' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: 'CMYK(0,100,100,0) → RGB(255,0,0)', url: '/calculator/cmyk-v-rgb?c=0&m=100&y=100&k=0' },
    { value: 'CMYK(100,0,100,0) → RGB(0,255,0)', url: '/calculator/cmyk-v-rgb?c=100&m=0&y=100&k=0' },
    { value: 'CMYK(0,0,0,100) → RGB(0,0,0)', url: '/calculator/cmyk-v-rgb?c=0&m=0&y=0&k=100' },
  ],
};

export const rgbVCmyk: Calculator = {
  id: 'rgb-v-cmyk',
  slug: 'rgb-v-cmyk',
  title: 'RGB в CMYK',
  description: 'Перевод цвета из модели RGB в CMYK для полиграфии.',
  category: 'konvertery',
  subcategory: 'conv-cvet',
  type: 'converter',
  inputs: [
    {
      name: 'r',
      label: 'Красный (R)',
      type: 'number',
      min: 0,
      max: 255,
      defaultValue: 255,
      required: true,
    },
    {
      name: 'g',
      label: 'Зелёный (G)',
      type: 'number',
      min: 0,
      max: 255,
      defaultValue: 0,
      required: true,
    },
    {
      name: 'b',
      label: 'Синий (B)',
      type: 'number',
      min: 0,
      max: 255,
      defaultValue: 0,
      required: true,
    },
  ],
  outputs: [{ name: 'result', label: 'CMYK', type: 'text' }],
  calculate: ({ r, g, b }) => {
    const rr = r / 255;
    const gg = g / 255;
    const bb = b / 255;
    const k = 1 - Math.max(rr, gg, bb);
    const c = k === 1 ? 0 : (1 - rr - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - gg - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - bb - k) / (1 - k);
    return [
      {
        value: `CMYK(${Math.round(c * 100)}, ${Math.round(m * 100)}, ${Math.round(y * 100)}, ${Math.round(k * 100)})`,
        label: 'CMYK',
        unit: '%',
      },
    ];
  },
  content: {
    howTo: 'Введите значения R, G, B (0–255). Результат — значения C, M, Y, K в процентах.',
    about: 'Конвертер переводит экранный цвет RGB в печатную модель CMYK. Используется дизайнерами и верстальщиками при подготовке макетов к типографии.',
    formula: 'K = 1 − max(R,G,B)/255; C = (1 − R/255 − K) / (1 − K); M = (1 − G/255 − K) / (1 − K); Y = (1 − B/255 − K) / (1 − K).',
    faq: [
      {
        question: 'Зачем переводить в CMYK?',
        answer: 'Принтеры и типографии работают в CMYK. Подготовка макета в RGB может привести к непредсказуемым цветам при печати.',
      },
      {
        question: 'Всегда ли конверсия точная?',
        answer: 'Нет, из-за различий в цветовых охватах некоторые яркие RGB-цвета невозможно воспроизвести в CMYK.',
      },
    ],
    sources: [{ title: 'Adobe — RGB vs CMYK', url: 'https://helpx.adobe.com/photoshop/using/color-modes.html' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: 'RGB(255,0,0) → CMYK(0,100,100,0)', url: '/calculator/rgb-v-cmyk?r=255&g=0&b=0' },
    { value: 'RGB(0,255,0) → CMYK(100,0,100,0)', url: '/calculator/rgb-v-cmyk?r=0&g=255&b=0' },
    { value: 'RGB(128,128,128) → CMYK(0,0,0,50)', url: '/calculator/rgb-v-cmyk?r=128&g=128&b=128' },
  ],
};

export const hslVHex: Calculator = {
  id: 'hsl-v-hex',
  slug: 'hsl-v-hex',
  title: 'HSL в HEX',
  description: 'Перевод цвета из модели HSL (тон, насыщенность, светлота) в HEX-код.',
  category: 'konvertery',
  subcategory: 'conv-cvet',
  type: 'converter',
  inputs: [
    {
      name: 'h',
      label: 'Тон (H)',
      type: 'number',
      min: 0,
      max: 360,
      defaultValue: 0,
      required: true,
    },
    {
      name: 's',
      label: 'Насыщенность (S)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 100,
      required: true,
    },
    {
      name: 'l',
      label: 'Светлота (L)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 50,
      required: true,
    },
  ],
  outputs: [{ name: 'result', label: 'HEX', type: 'text' }],
  calculate: ({ h, s, l }) => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    const ss = s / 100;
    const ll = l / 100;
    const c = (1 - Math.abs(2 * ll - 1)) * ss;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = ll - c / 2;
    let r1 = 0, g1 = 0, b1 = 0;
    if (h < 60) { r1 = c; g1 = x; }
    else if (h < 120) { r1 = x; g1 = c; }
    else if (h < 180) { g1 = c; b1 = x; }
    else if (h < 240) { g1 = x; b1 = c; }
    else if (h < 300) { r1 = x; b1 = c; }
    else { r1 = c; b1 = x; }
    const r = (r1 + m) * 255;
    const g = (g1 + m) * 255;
    const b = (b1 + m) * 255;
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    return [{ value: hex, label: 'HEX', unit: '' }];
  },
  content: {
    howTo: 'Введите тон (0–360°), насыщенность и светлоту (0–100%). Результат — HEX-код цвета.',
    about: 'HSL — модель, удобная для человеческого восприятия: тон задаёт цвет, насыщенность — его интенсивность, светлота — яркость.',
    formula: 'HEX вычисляется через промежуточные RGB-значения, полученные из HSL с помощью стандартного алгоритма конверсии.',
    faq: [
      {
        question: 'Что такое тон в HSL?',
        answer: 'Тон (Hue) — цветовой оттенок на цветовом круге, от 0° (красный) до 360° (снова красный).',
      },
      {
        question: 'Почему L=0% всегда чёрный, а L=100% — белый?',
        answer: 'Светлота в HSL контролирует добавление чёрного или белого: 0% — полностью чёрный, 100% — полностью белый, 50% — чистый цвет.',
      },
    ],
    sources: [{ title: 'W3C — HSL colors', url: 'https://www.w3.org/TR/css-color-3/#hsl-color' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: 'HSL(0,100%,50%) → #FF0000', url: '/calculator/hsl-v-hex?h=0&s=100&l=50' },
    { value: 'HSL(120,100%,50%) → #00FF00', url: '/calculator/hsl-v-hex?h=120&s=100&l=50' },
    { value: 'HSL(240,100%,50%) → #0000FF', url: '/calculator/hsl-v-hex?h=240&s=100&l=50' },
  ],
};

export const hexVHsl: Calculator = {
  id: 'hex-v-hsl',
  slug: 'hex-v-hsl',
  title: 'HEX в HSL',
  description: 'Перевод HEX-кода цвета в модель HSL (тон, насыщенность, светлота).',
  category: 'konvertery',
  subcategory: 'conv-cvet',
  type: 'converter',
  inputs: [
    {
      name: 'hex',
      label: 'HEX-код',
      type: 'text',
      placeholder: '#FF0000',
      defaultValue: '#FF0000',
      required: true,
    },
  ],
  outputs: [{ name: 'result', label: 'HSL', type: 'text' }],
  calculate: ({ hex }) => {
    let h = hex.replace('#', '');
    if (h.length === 3) {
      h = h
        .split('')
        .map((c: string) => c + c)
        .join('');
    }
    const r = parseInt(h.substring(0, 2), 16) / 255;
    const g = parseInt(h.substring(2, 4), 16) / 255;
    const b = parseInt(h.substring(4, 6), 16) / 255;
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return [{ value: 'Неверный HEX', label: 'Ошибка' }];
    }
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let s = 0;
    if (max !== min) {
      s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    }
    let hh = 0;
    if (max !== min) {
      if (max === r) hh = ((g - b) / (max - min) + 6) % 6;
      else if (max === g) hh = (b - r) / (max - min) + 2;
      else hh = (r - g) / (max - min) + 4;
      hh *= 60;
    }
    return [
      {
        value: `HSL(${Math.round(hh)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
        label: 'HSL',
        unit: '',
      },
    ];
  },
  content: {
    howTo: 'Введите HEX-код цвета. Результат — значения H (0–360°), S и L (0–100%).',
    about: 'HSL более интуитивна для подбора цвета, чем HEX или RGB. HEX→HSL помогает дизайнерам понять характеристики цвета.',
    formula: 'H, S, L вычисляются через минимальные и максимальные RGB-компоненты по стандартному алгоритму.',
    faq: [
      {
        question: 'Как HSL помогает в дизайне?',
        answer: 'HSL позволяет легко создавать гармоничные палитры, изменяя только тон, насыщенность или светлоту.',
      },
      {
        question: 'Поддерживаются ли прозрачные цвета?',
        answer: 'HEX без альфа-канала не содержит прозрачности. Для прозрачности используйте RGBA или HSLA.',
      },
    ],
    sources: [{ title: 'MDN — HSL', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '#FF0000 → HSL(0,100%,50%)', url: '/calculator/hex-v-hsl?hex=%23FF0000' },
    { value: '#00FF00 → HSL(120,100%,50%)', url: '/calculator/hex-v-hsl?hex=%2300FF00' },
    { value: '#808080 → HSL(0,0%,50%)', url: '/calculator/hex-v-hsl?hex=%23808080' },
  ],
};

export const hsvVRgb: Calculator = {
  id: 'hsv-v-rgb',
  slug: 'hsv-v-rgb',
  title: 'HSV в RGB',
  description: 'Перевод цвета из модели HSV (тон, насыщенность, значение) в RGB.',
  category: 'konvertery',
  subcategory: 'conv-cvet',
  type: 'converter',
  inputs: [
    {
      name: 'h',
      label: 'Тон (H)',
      type: 'number',
      min: 0,
      max: 360,
      defaultValue: 0,
      required: true,
    },
    {
      name: 's',
      label: 'Насыщенность (S)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 100,
      required: true,
    },
    {
      name: 'v',
      label: 'Значение (V)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 100,
      required: true,
    },
  ],
  outputs: [{ name: 'result', label: 'RGB', type: 'text' }],
  calculate: ({ h, s, v }) => {
    const ss = s / 100;
    const vv = v / 100;
    const c = vv * ss;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = vv - c;
    let r1 = 0, g1 = 0, b1 = 0;
    if (h < 60) { r1 = c; g1 = x; }
    else if (h < 120) { r1 = x; g1 = c; }
    else if (h < 180) { g1 = c; b1 = x; }
    else if (h < 240) { g1 = x; b1 = c; }
    else if (h < 300) { r1 = x; b1 = c; }
    else { r1 = c; b1 = x; }
    const r = (r1 + m) * 255;
    const g = (g1 + m) * 255;
    const b = (b1 + m) * 255;
    return [
      {
        value: `RGB(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
        label: 'RGB',
        unit: '',
      },
    ];
  },
  content: {
    howTo: 'Введите тон (0–360°), насыщенность и значение (0–100%). Результат — RGB (0–255).',
    about: 'HSV — цилиндрическая модель, популярная в графических редакторах. «Значение» (Value) определяет яркость цвета при сохранении оттенка.',
    formula: 'RGB вычисляется через промежуточные компоненты C, X, M по сектору тона H.',
    faq: [
      {
        question: 'В чём разница между HSV и HSL?',
        answer: 'В HSV V=100% даёт чистый цвет, а в HSL L=50% даёт чистый цвет. HSV чаще используется в графических редакторах.',
      },
      {
        question: 'Где используется HSV?',
        answer: 'HSV применяется в Photoshop, GIMP, Illustrator и других программах для выбора цвета из цветового круга.',
      },
    ],
    sources: [{ title: 'Wikipedia — HSV color model', url: 'https://en.wikipedia.org/wiki/HSL_and_HSV' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: 'HSV(0,100%,100%) → RGB(255,0,0)', url: '/calculator/hsv-v-rgb?h=0&s=100&v=100' },
    { value: 'HSV(120,100%,100%) → RGB(0,255,0)', url: '/calculator/hsv-v-rgb?h=120&s=100&v=100' },
    { value: 'HSV(0,0%,50%) → RGB(128,128,128)', url: '/calculator/hsv-v-rgb?h=0&s=0&v=50' },
  ],
};

export const rgbVHsv: Calculator = {
  id: 'rgb-v-hsv',
  slug: 'rgb-v-hsv',
  title: 'RGB в HSV',
  description: 'Перевод цвета из модели RGB в HSV (тон, насыщенность, значение).',
  category: 'konvertery',
  subcategory: 'conv-cvet',
  type: 'converter',
  inputs: [
    {
      name: 'r',
      label: 'Красный (R)',
      type: 'number',
      min: 0,
      max: 255,
      defaultValue: 255,
      required: true,
    },
    {
      name: 'g',
      label: 'Зелёный (G)',
      type: 'number',
      min: 0,
      max: 255,
      defaultValue: 0,
      required: true,
    },
    {
      name: 'b',
      label: 'Синий (B)',
      type: 'number',
      min: 0,
      max: 255,
      defaultValue: 0,
      required: true,
    },
  ],
  outputs: [{ name: 'result', label: 'HSV', type: 'text' }],
  calculate: ({ r, g, b }) => {
    const rr = r / 255;
    const gg = g / 255;
    const bb = b / 255;
    const max = Math.max(rr, gg, bb);
    const min = Math.min(rr, gg, bb);
    const v = max;
    const s = max === 0 ? 0 : (max - min) / max;
    let h = 0;
    if (max !== min) {
      if (max === rr) h = ((gg - bb) / (max - min) + 6) % 6;
      else if (max === gg) h = (bb - rr) / (max - min) + 2;
      else h = (rr - gg) / (max - min) + 4;
      h *= 60;
    }
    return [
      {
        value: `HSV(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`,
        label: 'HSV',
        unit: '',
      },
    ];
  },
  content: {
    howTo: 'Введите значения R, G, B (0–255). Результат — H (0–360°), S и V (0–100%).',
    about: 'RGB→HSV полезен при анализе цветов изображений и переносе их в графические редакторы, работающие в HSV.',
    formula: 'V = max(R,G,B)/255; S = (max − min) / max (если max ≠ 0); H вычисляется по доминирующему каналу.',
    faq: [
      {
        question: 'Почему чистый белый даёт HSV(0,0%,100%)?',
        answer: 'При отсутствии разницы между каналами (max = min) насыщенность равна 0, а тон не определён — принимается 0°.',
      },
      {
        question: 'HSV лучше HSL?',
        answer: 'HSV интуитивнее для выбора цвета из палитры, HSL — для создания цветовых схем и градиентов.',
      },
    ],
    sources: [{ title: 'Wikipedia — HSV', url: 'https://en.wikipedia.org/wiki/HSL_and_HSV' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: 'RGB(255,0,0) → HSV(0,100%,100%)', url: '/calculator/rgb-v-hsv?r=255&g=0&b=0' },
    { value: 'RGB(0,255,0) → HSV(120,100%,100%)', url: '/calculator/rgb-v-hsv?r=0&g=255&b=0' },
    { value: 'RGB(128,128,128) → HSV(0,0%,50%)', url: '/calculator/rgb-v-hsv?r=128&g=128&b=128' },
  ],
};

// ========== КУЛИНАРНЫЕ МЕРЫ (kulinarnye) ==========

export const chaynayaLozhkaVMl: Calculator = {
  id: 'chaynaya-lozhka-v-ml',
  slug: 'chaynaya-lozhka-v-ml',
  title: 'Чайная ложка в мл',
  description: 'Перевод объёма чайных ложек в миллилитры.',
  category: 'konvertery',
  subcategory: 'kulinarnye',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      min: 0,
      defaultValue: 1,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'chaynaya-lozhka', label: 'Чайная ложка' }],
      defaultValue: 'chaynaya-lozhka',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'ml', label: 'мл' }],
      defaultValue: 'ml',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) * 5;
    return [{ value: `${result} мл`, label: 'Объём', unit: 'мл' }];
  },
  content: {
    howTo: 'Введите количество чайных ложек. Одна чайная ложка ≈ 5 мл.',
    about: 'Чайная ложка — распространённая кухонная мера объёма, равная примерно 5 миллилитрам.',
    formula: 'мл = чайные ложки × 5',
    faq: [
      {
        question: 'Всегда ли чайная ложка равна 5 мл?',
        answer: 'Это среднее значение. В разных странах стандарт может отличаться: в США ≈ 4.9 мл, в Великобритании ≈ 5.9 мл.',
      },
      {
        question: 'Сколько чайных ложек в столовой?',
        answer: 'Одна столовая ложка примерно равна трём чайным ложкам (15 мл).',
      },
    ],
    sources: [{ title: 'Wikipedia — Teaspoon', url: 'https://en.wikipedia.org/wiki/Teaspoon' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '2 ч.л. → 10 мл', url: '/calculator/chaynaya-lozhka-v-ml?value=2' },
    { value: '5 ч.л. → 25 мл', url: '/calculator/chaynaya-lozhka-v-ml?value=5' },
    { value: '10 ч.л. → 50 мл', url: '/calculator/chaynaya-lozhka-v-ml?value=10' },
  ],
};

export const mlVChaynayaLozhka: Calculator = {
  id: 'ml-v-chaynaya-lozhka',
  slug: 'ml-v-chaynaya-lozhka',
  title: 'мл в чайные ложки',
  description: 'Перевод миллилитров в чайные ложки.',
  category: 'konvertery',
  subcategory: 'kulinarnye',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      min: 0,
      defaultValue: 5,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'ml', label: 'мл' }],
      defaultValue: 'ml',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'chaynaya-lozhka', label: 'Чайная ложка' }],
      defaultValue: 'chaynaya-lozhka',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) / 5;
    return [{ value: `${result.toFixed(1)} ч.л.`, label: 'Чайные ложки', unit: 'ч.л.' }];
  },
  content: {
    howTo: 'Введите объём в миллилитрах. 1 чайная ложка ≈ 5 мл.',
    about: 'Помогает приготовить блюдо по рецепту, если под рукой нет мерного стакана, но есть обычная чайная ложка.',
    formula: 'ч.л. = мл / 5',
    faq: [
      {
        question: 'Как точно отмерить без мерной ложки?',
        answer: 'Используйте обычную столовую ложку: 1 ч.л. ≈ 1/3 ст.л.',
      },
      {
        question: 'Сколько мл в десертной ложке?',
        answer: 'Десертная ложка примерно 10 мл — это 2 чайные ложки.',
      },
    ],
    sources: [{ title: 'Wikipedia — Teaspoon', url: 'https://en.wikipedia.org/wiki/Teaspoon' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '15 мл → 3 ч.л.', url: '/calculator/ml-v-chaynaya-lozhka?value=15' },
    { value: '25 мл → 5 ч.л.', url: '/calculator/ml-v-chaynaya-lozhka?value=25' },
    { value: '50 мл → 10 ч.л.', url: '/calculator/ml-v-chaynaya-lozhka?value=50' },
  ],
};

export const stolovayaLozhkaVMl: Calculator = {
  id: 'stolovaya-lozhka-v-ml',
  slug: 'stolovaya-lozhka-v-ml',
  title: 'Столовая ложка в мл',
  description: 'Перевод объёма столовых ложек в миллилитры.',
  category: 'konvertery',
  subcategory: 'kulinarnye',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      min: 0,
      defaultValue: 1,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'stolovaya-lozhka', label: 'Столовая ложка' }],
      defaultValue: 'stolovaya-lozhka',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'ml', label: 'мл' }],
      defaultValue: 'ml',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) * 15;
    return [{ value: `${result} мл`, label: 'Объём', unit: 'мл' }];
  },
  content: {
    howTo: 'Введите количество столовых ложек. Одна столовая ложка ≈ 15 мл.',
    about: 'Столовая ложка — стандартная кухонная мера, равная примерно 15 миллилитрам жидкости.',
    formula: 'мл = столовые ложки × 15',
    faq: [
      {
        question: 'Всегда ли столовая ложка — 15 мл?',
        answer: 'В России и Европе да. В США 1 столовая ложка ≈ 14.8 мл. Для сыпучих продуктов объём зависит от плотности.',
      },
      {
        question: 'Сколько столовых ложек в стакане?',
        answer: 'В стандартном стакане (250 мл) примерно 16–17 столовых ложек.',
      },
    ],
    sources: [{ title: 'Wikipedia — Tablespoon', url: 'https://en.wikipedia.org/wiki/Tablespoon' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '2 ст.л. → 30 мл', url: '/calculator/stolovaya-lozhka-v-ml?value=2' },
    { value: '5 ст.л. → 75 мл', url: '/calculator/stolovaya-lozhka-v-ml?value=5' },
    { value: '10 ст.л. → 150 мл', url: '/calculator/stolovaya-lozhka-v-ml?value=10' },
  ],
};

export const mlVStolovayaLozhka: Calculator = {
  id: 'ml-v-stolovaya-lozhka',
  slug: 'ml-v-stolovaya-lozhka',
  title: 'мл в столовые ложки',
  description: 'Перевод миллилитров в столовые ложки.',
  category: 'konvertery',
  subcategory: 'kulinarnye',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      min: 0,
      defaultValue: 15,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'ml', label: 'мл' }],
      defaultValue: 'ml',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'stolovaya-lozhka', label: 'Столовая ложка' }],
      defaultValue: 'stolovaya-lozhka',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) / 15;
    return [{ value: `${result.toFixed(1)} ст.л.`, label: 'Столовые ложки', unit: 'ст.л.' }];
  },
  content: {
    howTo: 'Введите объём в миллилитрах. 1 столовая ложка ≈ 15 мл.',
    about: 'Удобный перевод для кулинарных рецептов, когда нужно измерить жидкость столовой ложкой.',
    formula: 'ст.л. = мл / 15',
    faq: [
      {
        question: 'Сколько мл в столовой ложке с горкой?',
        answer: 'С горкой столовая ложка сыпучего продукта (мука, сахар) может вмещать до 25–30 мл.',
      },
      {
        question: 'Как отмерить 100 мл ложками?',
        answer: '100 мл ≈ 6.7 столовых ложек (или 6 полных + 2/3 ложки).',
      },
    ],
    sources: [{ title: 'Wikipedia — Tablespoon', url: 'https://en.wikipedia.org/wiki/Tablespoon' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '30 мл → 2 ст.л.', url: '/calculator/ml-v-stolovaya-lozhka?value=30' },
    { value: '45 мл → 3 ст.л.', url: '/calculator/ml-v-stolovaya-lozhka?value=45' },
    { value: '100 мл → 6.7 ст.л.', url: '/calculator/ml-v-stolovaya-lozhka?value=100' },
  ],
};

export const stakanVMl: Calculator = {
  id: 'stakan-v-ml',
  slug: 'stakan-v-ml',
  title: 'Стакан в мл',
  description: 'Перевод объёма стаканов в миллилитры.',
  category: 'konvertery',
  subcategory: 'kulinarnye',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      min: 0,
      defaultValue: 1,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'stakan', label: 'Стакан' }],
      defaultValue: 'stakan',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'ml', label: 'мл' }],
      defaultValue: 'ml',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) * 250;
    return [{ value: `${result} мл`, label: 'Объём', unit: 'мл' }];
  },
  content: {
    howTo: 'Введите количество стаканов. Один стандартный стакан ≈ 250 мл.',
    about: 'Стакан — привычная кухонная мера. В СССР стандартный стакан был 250 мл, сейчас встречаются 200 мл и 300 мл.',
    formula: 'мл = стаканы × 250',
    faq: [
      {
        question: 'Какой стакан считается стандартным?',
        answer: 'В России стандартный гранёный стакан — 250 мл. Стакан для сока или чая может быть 200 мл.',
      },
      {
        question: 'Сколько граммов муки в стакане?',
        answer: 'В 250 мл стакане помещается примерно 160 г муки (при плотности ~0.64 г/мл).',
      },
    ],
    sources: [{ title: 'Wikipedia — Measuring cup', url: 'https://en.wikipedia.org/wiki/Measuring_cup' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '2 стакана → 500 мл', url: '/calculator/stakan-v-ml?value=2' },
    { value: '0.5 стакана → 125 мл', url: '/calculator/stakan-v-ml?value=0.5' },
    { value: '4 стакана → 1000 мл', url: '/calculator/stakan-v-ml?value=4' },
  ],
};

export const mlVStakan: Calculator = {
  id: 'ml-v-stakan',
  slug: 'ml-v-stakan',
  title: 'мл в стаканы',
  description: 'Перевод миллилитров в стаканы.',
  category: 'konvertery',
  subcategory: 'kulinarnye',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      min: 0,
      defaultValue: 250,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'ml', label: 'мл' }],
      defaultValue: 'ml',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'stakan', label: 'Стакан' }],
      defaultValue: 'stakan',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) / 250;
    return [{ value: `${result.toFixed(2)} стакана`, label: 'Стаканы', unit: 'стакана' }];
  },
  content: {
    howTo: 'Введите объём в миллилитрах. 1 стакан ≈ 250 мл.',
    about: 'Перевод мл в стаканы помогает быстро ориентироваться в кулинарных рецептах.',
    formula: 'стаканы = мл / 250',
    faq: [
      {
        question: 'Сколько стаканов в литре?',
        answer: 'В 1 литре (1000 мл) ровно 4 стандартных стакана по 250 мл.',
      },
      {
        question: 'А сколько в 200-мл стакане?',
        answer: 'В литре 5 стаканов по 200 мл. Всегда уточняйте размер стакана в рецепте.',
      },
    ],
    sources: [{ title: 'Wikipedia — Measuring cup', url: 'https://en.wikipedia.org/wiki/Measuring_cup' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '500 мл → 2 стакана', url: '/calculator/ml-v-stakan?value=500' },
    { value: '1000 мл → 4 стакана', url: '/calculator/ml-v-stakan?value=1000' },
    { value: '125 мл → 0.5 стакана', url: '/calculator/ml-v-stakan?value=125' },
  ],
};

export const ryumkaVMl: Calculator = {
  id: 'ryumka-v-ml',
  slug: 'ryumka-v-ml',
  title: 'Рюмка в мл',
  description: 'Перевод объёма рюмок в миллилитры.',
  category: 'konvertery',
  subcategory: 'kulinarnye',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      min: 0,
      defaultValue: 1,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'ryumka', label: 'Рюмка' }],
      defaultValue: 'ryumka',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'ml', label: 'мл' }],
      defaultValue: 'ml',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) * 50;
    return [{ value: `${result} мл`, label: 'Объём', unit: 'мл' }];
  },
  content: {
    howTo: 'Введите количество рюмок. Одна стандартная рюмка ≈ 50 мл.',
    about: 'Рюмка — маленькая стопка для крепких напитков. Стандартный объём в России — 50 мл.',
    formula: 'мл = рюмки × 50',
    faq: [
      {
        question: 'Сколько рюмок в бутылке водки (0.5 л)?',
        answer: 'В полулитровой бутылке 10 рюмок по 50 мл.',
      },
      {
        question: 'Чем рюмка отличается от стопки?',
        answer: 'Рюмка обычно 30–50 мл, стопка может быть до 100 мл. В быту термины часто смешивают.',
      },
    ],
    sources: [{ title: 'Wikipedia — Shot glass', url: 'https://en.wikipedia.org/wiki/Shot_glass' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '2 рюмки → 100 мл', url: '/calculator/ryumka-v-ml?value=2' },
    { value: '5 рюмок → 250 мл', url: '/calculator/ryumka-v-ml?value=5' },
    { value: '10 рюмок → 500 мл', url: '/calculator/ryumka-v-ml?value=10' },
  ],
};

export const mlVRyumka: Calculator = {
  id: 'ml-v-ryumka',
  slug: 'ml-v-ryumka',
  title: 'мл в рюмки',
  description: 'Перевод миллилитров в рюмки.',
  category: 'konvertery',
  subcategory: 'kulinarnye',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      min: 0,
      defaultValue: 50,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'ml', label: 'мл' }],
      defaultValue: 'ml',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'ryumka', label: 'Рюмка' }],
      defaultValue: 'ryumka',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) / 50;
    return [{ value: `${result.toFixed(1)} рюмки`, label: 'Рюмки', unit: 'рюмки' }];
  },
  content: {
    howTo: 'Введите объём в миллилитрах. 1 рюмка ≈ 50 мл.',
    about: 'Перевод мл в рюмки удобен при разливе напитков и ориентировании в рецептах коктейлей.',
    formula: 'рюмки = мл / 50',
    faq: [
      {
        question: 'Сколько мл в одной рюмке коньяка?',
        answer: 'Классическая рюмка коньяка — 50 мл. В ресторанах порции могут быть 30–40 мл.',
      },
      {
        question: '100 грамм — это сколько рюмок?',
        answer: '100 г водки ≈ 2 рюмки (плотность водки ~0.94 г/мл, поэтому 100 г ≈ 106 мл ≈ 2.1 рюмки).',
      },
    ],
    sources: [{ title: 'Wikipedia — Shot glass', url: 'https://en.wikipedia.org/wiki/Shot_glass' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '100 мл → 2 рюмки', url: '/calculator/ml-v-ryumka?value=100' },
    { value: '250 мл → 5 рюмок', url: '/calculator/ml-v-ryumka?value=250' },
    { value: '500 мл → 10 рюмок', url: '/calculator/ml-v-ryumka?value=500' },
  ],
};

export const grammVStolovayaLozhkaSahara: Calculator = {
  id: 'gramm-v-stolovaya-lozhka-sahara',
  slug: 'gramm-v-stolovaya-lozhka-sahara',
  title: 'Грамм сахара в столовые ложки',
  description: 'Перевод массы сахара в столовые ложки.',
  category: 'konvertery',
  subcategory: 'kulinarnye',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      min: 0,
      defaultValue: 25,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'gramm', label: 'Грамм сахара' }],
      defaultValue: 'gramm',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'stolovaya-lozhka-sahara', label: 'Столовая ложка сахара' }],
      defaultValue: 'stolovaya-lozhka-sahara',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) / 25;
    return [{ value: `${result.toFixed(1)} ст.л.`, label: 'Столовые ложки сахара', unit: 'ст.л.' }];
  },
  content: {
    howTo: 'Введите массу сахара в граммах. Одна столовая ложка сахара ≈ 25 г.',
    about: 'Сахар — сыпучий продукт, его масса в ложке зависит от плотности. Стандарт: 1 ст.л. сахара без горки ≈ 25 г.',
    formula: 'ст.л. = граммы / 25',
    faq: [
      {
        question: 'Сколько граммов сахара в ложке с горкой?',
        answer: 'С горкой столовая ложка сахара может вмещать 30–35 г. Чайная ложка сахара ≈ 7 г без горки.',
      },
      {
        question: 'Сколько ложек сахара в стакане?',
        answer: 'В 250-мл стакане примерно 200 г сахара, что равно 8 столовым ложкам.',
      },
    ],
    sources: [{ title: 'Кулинарная таблица мер', url: 'https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '50 г → 2 ст.л.', url: '/calculator/gramm-v-stolovaya-lozhka-sahara?value=50' },
    { value: '100 г → 4 ст.л.', url: '/calculator/gramm-v-stolovaya-lozhka-sahara?value=100' },
    { value: '200 г → 8 ст.л.', url: '/calculator/gramm-v-stolovaya-lozhka-sahara?value=200' },
  ],
};

export const stolovayaLozhkaSaharaVGramm: Calculator = {
  id: 'stolovaya-lozhka-sahara-v-gramm',
  slug: 'stolovaya-lozhka-sahara-v-gramm',
  title: 'Столовые ложки сахара в граммы',
  description: 'Перевод столовых ложек сахара в граммы.',
  category: 'konvertery',
  subcategory: 'kulinarnye',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      min: 0,
      defaultValue: 1,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'stolovaya-lozhka-sahara', label: 'Столовая ложка сахара' }],
      defaultValue: 'stolovaya-lozhka-sahara',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'gramm', label: 'Грамм' }],
      defaultValue: 'gramm',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) * 25;
    return [{ value: `${result} г`, label: 'Масса сахара', unit: 'г' }];
  },
  content: {
    howTo: 'Введите количество столовых ложек сахара. 1 ст.л. ≈ 25 г.',
    about: 'Помогает точно отмерить сахар для выпечки и десертов, когда под рукой нет весов.',
    formula: 'г = ст.л. × 25',
    faq: [
      {
        question: 'Отличается ли масса сахара от массы муки в ложке?',
        answer: 'Да. 1 ст.л. муки ≈ 15–18 г, а 1 ст.л. сахара ≈ 25 г из-за большей плотности.',
      },
      {
        question: 'Сколько калорий в ложке сахара?',
        answer: 'В 25 г сахара примерно 100 ккал.',
      },
    ],
    sources: [{ title: 'Кулинарная таблица мер', url: 'https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '2 ст.л. → 50 г', url: '/calculator/stolovaya-lozhka-sahara-v-gramm?value=2' },
    { value: '4 ст.л. → 100 г', url: '/calculator/stolovaya-lozhka-sahara-v-gramm?value=4' },
    { value: '8 ст.л. → 200 г', url: '/calculator/stolovaya-lozhka-sahara-v-gramm?value=8' },
  ],
};

// ========== РАЗМЕРЫ ЭКРАНА (conv-ekran) ==========

export const dyujmyVSmDiagonal: Calculator = {
  id: 'dyujmy-v-sm-diagonal',
  slug: 'dyujmy-v-sm-diagonal',
  title: 'Дюймы в см (диагональ)',
  description: 'Перевод диагонали экрана из дюймов в сантиметры.',
  category: 'konvertery',
  subcategory: 'conv-ekran',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Диагональ',
      type: 'number',
      min: 0,
      defaultValue: 24,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'dyujmy', label: 'Дюймы' }],
      defaultValue: 'dyujmy',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'sm', label: 'Сантиметры' }],
      defaultValue: 'sm',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) * 2.54;
    return [{ value: `${result.toFixed(2)} см`, label: 'Диагональ', unit: 'см' }];
  },
  content: {
    howTo: 'Введите диагональ в дюймах. 1 дюйм = 2.54 см.',
    about: 'Диагональ экрана измеряется в дюймах (″). Перевод в сантиметры помогает оценить реальные размеры устройства.',
    formula: 'см = дюймы × 2.54',
    faq: [
      {
        question: 'Почему экраны меряют в дюймах?',
        answer: 'Это устоявшаяся мировая традиция. Дюймы используются для обозначения размеров телевизоров, мониторов и смартфонов.',
      },
      {
        question: '27 дюймов — это сколько см?',
        answer: '27″ = 68.58 см по диагонали.',
      },
    ],
    sources: [{ title: 'Wikipedia — Inch', url: 'https://en.wikipedia.org/wiki/Inch' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '32″ → 81.28 см', url: '/calculator/dyujmy-v-sm-diagonal?value=32' },
    { value: '55″ → 139.7 см', url: '/calculator/dyujmy-v-sm-diagonal?value=55' },
    { value: '65″ → 165.1 см', url: '/calculator/dyujmy-v-sm-diagonal?value=65' },
  ],
};

export const smVDyujmyDiagonal: Calculator = {
  id: 'sm-v-dyujmy-diagonal',
  slug: 'sm-v-dyujmy-diagonal',
  title: 'см в дюймы (диагональ)',
  description: 'Перевод диагонали экрана из сантиметров в дюймы.',
  category: 'konvertery',
  subcategory: 'conv-ekran',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Диагональ',
      type: 'number',
      min: 0,
      defaultValue: 50,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'sm', label: 'Сантиметры' }],
      defaultValue: 'sm',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'dyujmy', label: 'Дюймы' }],
      defaultValue: 'dyujmy',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value) / 2.54;
    return [{ value: `${result.toFixed(2)}″`, label: 'Диагональ', unit: '″' }];
  },
  content: {
    howTo: 'Введите диагональ в сантиметрах. Результат — в дюймах.',
    about: 'Если вы знаете сантиметровый размер экрана, но хотите понять его в привычных дюймах — используйте этот конвертер.',
    formula: 'дюймы = см / 2.54',
    faq: [
      {
        question: '100 см — это сколько дюймов?',
        answer: '100 см ≈ 39.37″, то есть примерно 40-дюймовый экран.',
      },
      {
        question: 'Можно ли узнать ширину и высоту экрана по диагонали?',
        answer: 'Да, если известно соотношение сторон (например, 16:9). Используйте теорему Пифагора.',
      },
    ],
    sources: [{ title: 'Wikipedia — Inch', url: 'https://en.wikipedia.org/wiki/Inch' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '81 см → 31.89″', url: '/calculator/sm-v-dyujmy-diagonal?value=81' },
    { value: '140 см → 55.12″', url: '/calculator/sm-v-dyujmy-diagonal?value=140' },
    { value: '165 см → 64.96″', url: '/calculator/sm-v-dyujmy-diagonal?value=165' },
  ],
};

export const dpiVPpi: Calculator = {
  id: 'dpi-v-ppi',
  slug: 'dpi-v-ppi',
  title: 'DPI в PPI',
  description: 'Перевод плотности печатных точек (DPI) в пиксели на дюйм (PPI).',
  category: 'konvertery',
  subcategory: 'conv-ekran',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      min: 0,
      defaultValue: 300,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'dpi', label: 'DPI' }],
      defaultValue: 'dpi',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'ppi', label: 'PPI' }],
      defaultValue: 'ppi',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value);
    return [{ value: `${result} PPI`, label: 'PPI', unit: 'PPI' }];
  },
  content: {
    howTo: 'Введите значение DPI. Для цифровых экранов DPI и PPI численно равны, хотя обозначают разные вещи.',
    about: 'DPI — точки на дюйм (печать), PPI — пиксели на дюйм (экран). В цифровом контексте часто используются как синонимы.',
    formula: 'PPI = DPI (численно равны для цифровых изображений)',
    faq: [
      {
        question: 'В чём разница между DPI и PPI?',
        answer: 'DPI — физические капли чернил на бумаге. PPI — логические пиксели на экране. Для изображений они равны численно.',
      },
      {
        question: 'Какое PPI нужно для Retina-экранов?',
        answer: 'Apple считает Retina от 300 PPI при расстоянии 25 см. Телефоны сейчас имеют 400–500 PPI.',
      },
    ],
    sources: [{ title: 'Wikipedia — Pixel density', url: 'https://en.wikipedia.org/wiki/Pixel_density' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '72 DPI → 72 PPI', url: '/calculator/dpi-v-ppi?value=72' },
    { value: '300 DPI → 300 PPI', url: '/calculator/dpi-v-ppi?value=300' },
    { value: '96 DPI → 96 PPI', url: '/calculator/dpi-v-ppi?value=96' },
  ],
};

export const ppiVDpi: Calculator = {
  id: 'ppi-v-dpi',
  slug: 'ppi-v-dpi',
  title: 'PPI в DPI',
  description: 'Перевод пикселей на дюйм (PPI) в плотность печатных точек (DPI).',
  category: 'konvertery',
  subcategory: 'conv-ekran',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      min: 0,
      defaultValue: 300,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'ppi', label: 'PPI' }],
      defaultValue: 'ppi',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'dpi', label: 'DPI' }],
      defaultValue: 'dpi',
    },
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: ({ value }) => {
    const result = Number(value);
    return [{ value: `${result} DPI`, label: 'DPI', unit: 'DPI' }];
  },
  content: {
    howTo: 'Введите значение PPI. Численно PPI равен DPI, но термины применяются в разных контекстах.',
    about: 'PPI описывает разрешение экрана, DPI — качество печати. В цифровых изображениях они численно совпадают.',
    formula: 'DPI = PPI (численно равны)',
    faq: [
      {
        question: 'Нужно ли увеличивать PPI при печати?',
        answer: 'Да, для качественной печати рекомендуется 300 PPI. Для веба достаточно 72–96 PPI.',
      },
      {
        question: 'Как рассчитать PPI экрана?',
        answer: 'PPI = √(ширина² + высота²) / диагональ(дюймы). Используйте пиксели разрешения и дюймы диагонали.',
      },
    ],
    sources: [{ title: 'Wikipedia — Pixel density', url: 'https://en.wikipedia.org/wiki/Pixel_density' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '72 PPI → 72 DPI', url: '/calculator/ppi-v-dpi?value=72' },
    { value: '300 PPI → 300 DPI', url: '/calculator/ppi-v-dpi?value=300' },
    { value: '460 PPI → 460 DPI', url: '/calculator/ppi-v-dpi?value=460' },
  ],
};

// ========== ПРОПОРЦИИ (conv-proporcii) ==========

export const sootnoshenieStoronVDegrees: Calculator = {
  id: 'sootnoshenie-storon-v-degrees',
  slug: 'sootnoshenie-storon-v-degrees',
  title: 'Соотношение сторон в градусы',
  description: 'Перевод соотношения сторон экрана (например, 16:9) в угол наклона диагонали.',
  category: 'konvertery',
  subcategory: 'conv-proporcii',
  type: 'converter',
  inputs: [
    {
      name: 'width',
      label: 'Ширина',
      type: 'number',
      min: 1,
      defaultValue: 16,
      required: true,
    },
    {
      name: 'height',
      label: 'Высота',
      type: 'number',
      min: 1,
      defaultValue: 9,
      required: true,
    },
  ],
  outputs: [{ name: 'result', label: 'Угол', type: 'text' }],
  calculate: ({ width, height }) => {
    const angle = Math.atan(Number(height) / Number(width)) * (180 / Math.PI);
    return [
      {
        value: `${angle.toFixed(2)}°`,
        label: 'Угол диагонали',
        unit: '°',
        additionalInfo: `Соотношение ${width}:${height}`,
      },
    ];
  },
  content: {
    howTo: 'Введите ширину и высоту соотношения (например, 16 и 9). Результат — угол наклона диагонали в градусах.',
    about: 'Угол наклона диагонали помогает понять форму прямоугольника. Чем больше угол, тем «выше» экран относительно ширины.',
    formula: 'α = arctan(высота / ширина) × (180 / π)',
    faq: [
      {
        question: 'Какой угол у соотношения 16:9?',
        answer: 'α = arctan(9/16) ≈ 29.36°. Это самое распространённое соотношение для видео и мониторов.',
      },
      {
        question: 'А у 4:3?',
        answer: 'α = arctan(3/4) ≈ 36.87°. Экраны 4:3 были стандартом для старых мониторов и телевизоров.',
      },
    ],
    sources: [{ title: 'Wikipedia — Aspect ratio', url: 'https://en.wikipedia.org/wiki/Aspect_ratio_(image)' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '16:9 → 29.36°', url: '/calculator/sootnoshenie-storon-v-degrees?width=16&height=9' },
    { value: '21:9 → 23.20°', url: '/calculator/sootnoshenie-storon-v-degrees?width=21&height=9' },
    { value: '4:3 → 36.87°', url: '/calculator/sootnoshenie-storon-v-degrees?width=4&height=3' },
  ],
};

// ========== pH (conv-ph) ==========

export const phVKoncentraciyu: Calculator = {
  id: 'ph-v-koncentraciyu',
  slug: 'ph-v-koncentraciyu',
  title: 'pH в концентрацию H+',
  description: 'Перевод значения pH в концентрацию ионов водорода [H⁺].',
  category: 'konvertery',
  subcategory: 'conv-ph',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'pH',
      type: 'number',
      min: 0,
      max: 14,
      step: 0.1,
      defaultValue: 7,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'ph', label: 'pH' }],
      defaultValue: 'ph',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'koncentraciya', label: 'Концентрация H⁺' }],
      defaultValue: 'koncentraciya',
    },
  ],
  outputs: [{ name: 'result', label: 'Концентрация', type: 'text' }],
  calculate: ({ value }) => {
    const ph = Number(value);
    const conc = Math.pow(10, -ph);
    return [
      {
        value: `${conc.toExponential(2)} моль/л`,
        label: '[H⁺]',
        unit: 'моль/л',
      },
    ];
  },
  content: {
    howTo: 'Введите значение pH (0–14). Результат — концентрация ионов водорода [H⁺] в моль/л.',
    about: 'pH — логарифмическая шкала кислотности. Чем ниже pH, тем выше концентрация H⁺ и кислотнее среда.',
    formula: '[H⁺] = 10^(−pH) моль/л',
    faq: [
      {
        question: 'Что означает pH 7?',
        answer: 'pH 7 — нейтральная среда. [H⁺] = 10⁻⁷ моль/л. Это чистая вода при 25°C.',
      },
      {
        question: 'Может ли pH быть отрицательным?',
        answer: 'Теоретически да, при очень высоких концентрациях кислоты (например, концентрированная HCl).',
      },
    ],
    sources: [{ title: 'Wikipedia — pH', url: 'https://en.wikipedia.org/wiki/PH' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: 'pH 1 → 0.1 моль/л', url: '/calculator/ph-v-koncentraciyu?value=1' },
    { value: 'pH 7 → 1×10⁻⁷ моль/л', url: '/calculator/ph-v-koncentraciyu?value=7' },
    { value: 'pH 14 → 1×10⁻¹⁴ моль/л', url: '/calculator/ph-v-koncentraciyu?value=14' },
  ],
};

export const koncentraciyaVPh: Calculator = {
  id: 'koncentraciya-v-ph',
  slug: 'koncentraciya-v-ph',
  title: 'Концентрация H⁺ в pH',
  description: 'Перевод концентрации ионов водорода [H⁺] в значение pH.',
  category: 'konvertery',
  subcategory: 'conv-ph',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Концентрация',
      type: 'number',
      min: 0,
      step: 0.0000001,
      defaultValue: 0.0000001,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'koncentraciya', label: 'Концентрация H⁺ (моль/л)' }],
      defaultValue: 'koncentraciya',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'ph', label: 'pH' }],
      defaultValue: 'ph',
    },
  ],
  outputs: [{ name: 'result', label: 'pH', type: 'text' }],
  calculate: ({ value }) => {
    const ph = -Math.log10(Number(value));
    return [
      {
        value: ph.toFixed(2),
        label: 'pH',
        unit: '',
      },
    ];
  },
  content: {
    howTo: 'Введите концентрацию [H⁺] в моль/л. Результат — значение pH.',
    about: 'Обратный перевод из концентрации в pH. Используется в химии, биологии, медицине и анализе воды.',
    formula: 'pH = −log₁₀([H⁺])',
    faq: [
      {
        question: 'Какая концентрация у лимонного сока?',
        answer: 'Лимонный сок имеет pH ≈ 2, что соответствует [H⁺] ≈ 10⁻² = 0.01 моль/л.',
      },
      {
        question: 'Что такое pOH?',
        answer: 'pOH = 14 − pH (при 25°C). Он измеряет концентрацию гидроксид-ионов [OH⁻].',
      },
    ],
    sources: [{ title: 'Wikipedia — pH', url: 'https://en.wikipedia.org/wiki/PH' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '0.1 моль/л → pH 1', url: '/calculator/koncentraciya-v-ph?value=0.1' },
    { value: '1×10⁻⁷ → pH 7', url: '/calculator/koncentraciya-v-ph?value=0.0000001' },
    { value: '1×10⁻¹⁴ → pH 14', url: '/calculator/koncentraciya-v-ph?value=0.00000000000001' },
  ],
};

// ========== КРЕПОСТЬ (conv-krepost) ==========

export const gradusyBomeVProcenty: Calculator = {
  id: 'gradusy-bome-v-procenty',
  slug: 'gradusy-bome-v-procenty',
  title: 'Градусы Боме в проценты',
  description: 'Перевод градусов Боме в процентное содержание сахара (плотность сусла).',
  category: 'konvertery',
  subcategory: 'conv-krepost',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Градусы Боме',
      type: 'number',
      min: 0,
      max: 30,
      step: 0.1,
      defaultValue: 10,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'bome', label: 'Градусы Боме' }],
      defaultValue: 'bome',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'procenty', label: 'Проценты сахара' }],
      defaultValue: 'procenty',
    },
  ],
  outputs: [{ name: 'result', label: 'Проценты', type: 'text' }],
  calculate: ({ value }) => {
    const b = Number(value);
    // Approximate conversion: °Bé ≈ %sugar / 1.8 for low values
    // More accurate: °Bé = 145 - 145 / (specific gravity)
    // Simplified linear approximation for sugar content:
    const percent = b * 1.8;
    return [
      {
        value: `${percent.toFixed(1)}%`,
        label: 'Содержание сахара',
        unit: '%',
      },
    ];
  },
  content: {
    howTo: 'Введите градусы Боме. Для приближённой оценки: 1°Bé ≈ 1.8% сахара.',
    about: 'Градусы Боме — шкала плотности жидкостей. В виноделии используется для измерения содержания сахара в сусле.',
    formula: 'Примерно: %сахара ≈ °Bé × 1.8 (для плотностей до 1.2).',
    faq: [
      {
        question: 'Что такое градусы Боме?',
        answer: 'Это шкала плотности, где 0°Bé соответствует плотности воды, а каждый градус — определённому приросту плотности.',
      },
      {
        question: 'Где используются градусы Боме?',
        answer: 'В виноделии, пивоварении и консервировании для контроля концентрации сахара и соли.',
      },
    ],
    sources: [{ title: 'Wikipedia — Baumé scale', url: 'https://en.wikipedia.org/wiki/Baum%C3%A9_scale' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '10°Bé → 18.0%', url: '/calculator/gradusy-bome-v-procenty?value=10' },
    { value: '15°Bé → 27.0%', url: '/calculator/gradusy-bome-v-procenty?value=15' },
    { value: '5°Bé → 9.0%', url: '/calculator/gradusy-bome-v-procenty?value=5' },
  ],
};

export const procentyVGradusyBome: Calculator = {
  id: 'procenty-v-gradusy-bome',
  slug: 'procenty-v-gradusy-bome',
  title: 'Проценты сахара в градусы Боме',
  description: 'Перевод процентного содержания сахара в градусы Боме.',
  category: 'konvertery',
  subcategory: 'conv-krepost',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Процент сахара',
      type: 'number',
      min: 0,
      max: 50,
      step: 0.1,
      defaultValue: 18,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'procenty', label: 'Проценты сахара' }],
      defaultValue: 'procenty',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'bome', label: 'Градусы Боме' }],
      defaultValue: 'bome',
    },
  ],
  outputs: [{ name: 'result', label: 'Градусы Боме', type: 'text' }],
  calculate: ({ value }) => {
    const percent = Number(value);
    const bome = percent / 1.8;
    return [
      {
        value: `${bome.toFixed(1)}°Bé`,
        label: 'Градусы Боме',
        unit: '°Bé',
      },
    ];
  },
  content: {
    howTo: 'Введите процент содержания сахара. Приближённо: °Bé ≈ %сахара / 1.8.',
    about: 'Обратный перевод из процентов сахара в градусы Боме для виноделов и пивоваров.',
    formula: '°Bé ≈ %сахара / 1.8',
    faq: [
      {
        question: 'Какое содержание сахара у виноградного сусла?',
        answer: 'Зрелый виноград обычно имеет 18–24% сахара, что соответствует 10–13°Bé.',
      },
      {
        question: 'Можно ли измерить градусы Боме дома?',
        answer: 'Да, с помощью ареометра (сахаромера), который показывает плотность в °Bé или %сахара.',
      },
    ],
    sources: [{ title: 'Wikipedia — Baumé scale', url: 'https://en.wikipedia.org/wiki/Baum%C3%A9_scale' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '18% → 10.0°Bé', url: '/calculator/procenty-v-gradusy-bome?value=18' },
    { value: '27% → 15.0°Bé', url: '/calculator/procenty-v-gradusy-bome?value=27' },
    { value: '9% → 5.0°Bé', url: '/calculator/procenty-v-gradusy-bome?value=9' },
  ],
};

// ========== ТВЁРДОСТЬ (conv-tverdost) ==========

export const brinellVRokvell: Calculator = {
  id: 'brinell-v-rokvell',
  slug: 'brinell-v-rokvell',
  title: 'Твёрдость Бринелля в Роквелла',
  description: 'Приближённый перевод твёрдости по Бринеллю (HB) в твёрдость по Роквеллу (HRC/HRB).',
  category: 'konvertery',
  subcategory: 'conv-tverdost',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'HB (Бринелль)',
      type: 'number',
      min: 0,
      max: 700,
      defaultValue: 200,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'brinell', label: 'HB (Бринелль)' }],
      defaultValue: 'brinell',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'rokvell', label: 'HRC (Роквелл)' }],
      defaultValue: 'rokvell',
    },
  ],
  outputs: [{ name: 'result', label: 'HRC', type: 'text' }],
  calculate: ({ value }) => {
    const hb = Number(value);
    // Approximate conversion for steels: HRC ≈ (HB / 10) - 2.5 for HB > 200
    // For lower hardness, HRB scale is more appropriate
    let hrc: number;
    if (hb >= 200) {
      hrc = hb / 10 - 2.5;
    } else {
      // HRB approximation for softer materials
      hrc = (hb / 2.22) - 46.7;
    }
    const scale = hb >= 200 ? 'HRC' : 'HRB (приближённо)';
    return [
      {
        value: `${hrc.toFixed(1)} ${scale}`,
        label: 'Твёрдость по Роквеллу',
        unit: scale,
      },
    ];
  },
  content: {
    howTo: 'Введите твёрдость по Бринеллю (HB). Для HB ≥ 200 вычисляется HRC, для меньших — приближение HRB.',
    about: 'Разные методы измерения твёрдости материалов дают несопоставимые результаты. Этот конвертер даёт приближённое соответствие для сталей.',
    formula: 'Приближённо: HRC ≈ HB/10 − 2.5 (для HB > 200).',
    faq: [
      {
        question: 'Почему перевод приближённый?',
        answer: 'Разные методы измеряют разные свойства материала. Точное соответствие существует только в определённом диапазоне.',
      },
      {
        question: 'Какой метод точнее?',
        answer: 'Роквелл (HRC) точнее для твёрдых материалов, Бринелль — для более мягких и крупнозернистых.',
      },
    ],
    sources: [{ title: 'Wikipedia — Hardness conversion', url: 'https://en.wikipedia.org/wiki/Hardness' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '200 HB → 17.5 HRC', url: '/calculator/brinell-v-rokvell?value=200' },
    { value: '400 HB → 37.5 HRC', url: '/calculator/brinell-v-rokvell?value=400' },
    { value: '600 HB → 57.5 HRC', url: '/calculator/brinell-v-rokvell?value=600' },
  ],
};

export const rokvellVBrinell: Calculator = {
  id: 'rokvell-v-brinell',
  slug: 'rokvell-v-brinell',
  title: 'Твёрдость Роквелла в Бринелля',
  description: 'Приближённый перевод твёрдости по Роквеллу (HRC) в твёрдость по Бринеллю (HB).',
  category: 'konvertery',
  subcategory: 'conv-tverdost',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'HRC (Роквелл)',
      type: 'number',
      min: 0,
      max: 70,
      defaultValue: 20,
      required: true,
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'rokvell', label: 'HRC (Роквелл)' }],
      defaultValue: 'rokvell',
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'brinell', label: 'HB (Бринелль)' }],
      defaultValue: 'brinell',
    },
  ],
  outputs: [{ name: 'result', label: 'HB', type: 'text' }],
  calculate: ({ value }) => {
    const hrc = Number(value);
    // Inverse of the approximate formula: HB ≈ (HRC + 2.5) * 10
    const hb = (hrc + 2.5) * 10;
    return [
      {
        value: `${hb.toFixed(0)} HB`,
        label: 'Твёрдость по Бринеллю',
        unit: 'HB',
      },
    ];
  },
  content: {
    howTo: 'Введите твёрдость по Роквеллу (HRC). Результат — приближённая твёрдость по Бринеллю (HB).',
    about: 'Обратный перевод из шкалы Роквелла в Бринелля. Используйте как ориентировочное значение для сравнения материалов.',
    formula: 'Приближённо: HB ≈ (HRC + 2.5) × 10.',
    faq: [
      {
        question: 'Какая твёрдость у закаленной стали?',
        answer: 'Закаленная инструментальная сталь может иметь HRC 60–65, что соответствует ~625–675 HB.',
      },
      {
        question: 'Можно ли перевести HRB в HB?',
        answer: 'Да, но формула другая: HB ≈ (HRB + 46.7) × 2.22. Этот конвертер ориентирован на HRC.',
      },
    ],
    sources: [{ title: 'Wikipedia — Hardness', url: 'https://en.wikipedia.org/wiki/Hardness' }],
    updatedAt: '2026-04-28',
  },
  popularCalculations: [
    { value: '20 HRC → 225 HB', url: '/calculator/rokvell-v-brinell?value=20' },
    { value: '40 HRC → 425 HB', url: '/calculator/rokvell-v-brinell?value=40' },
    { value: '60 HRC → 625 HB', url: '/calculator/rokvell-v-brinell?value=60' },
  ],
};

// ========== ЭКСПОРТ ВСЕХ КОНВЕРТЕРОВ ==========

export const specialPairConverters: Calculator[] = [
  // Цветовые модели
  rgbVHex,
  hexVRgb,
  cmykVRgb,
  rgbVCmyk,
  hslVHex,
  hexVHsl,
  hsvVRgb,
  rgbVHsv,
  // Кулинарные меры
  chaynayaLozhkaVMl,
  mlVChaynayaLozhka,
  stolovayaLozhkaVMl,
  mlVStolovayaLozhka,
  stakanVMl,
  mlVStakan,
  ryumkaVMl,
  mlVRyumka,
  grammVStolovayaLozhkaSahara,
  stolovayaLozhkaSaharaVGramm,
  // Размеры экрана
  dyujmyVSmDiagonal,
  smVDyujmyDiagonal,
  dpiVPpi,
  ppiVDpi,
  // Пропорции
  sootnoshenieStoronVDegrees,
  // pH
  phVKoncentraciyu,
  koncentraciyaVPh,
  // Крепость
  gradusyBomeVProcenty,
  procentyVGradusyBome,
  // Твёрдость
  brinellVRokvell,
  rokvellVBrinell,
];
