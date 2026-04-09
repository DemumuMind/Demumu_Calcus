import { Calculator } from '../types';

// Конвертер цветов RGB ↔ HEX
export const colorConverter: Calculator = {
  id: 'color-converter',
  slug: 'konverter-cvetov',
  title: 'Конвертер цветов',
  description: 'RGB в HEX, HEX в RGB, RGB в HSL',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'r',
      label: 'R (красный)',
      type: 'number',
      placeholder: '255',
      defaultValue: 255,
      min: 0,
      max: 255
    },
    {
      name: 'g',
      label: 'G (зелёный)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0,
      max: 255
    },
    {
      name: 'b',
      label: 'B (синий)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 0,
      max: 255
    }
  ],
  outputs: [
    { name: 'hex', label: 'HEX', type: 'text' },
    { name: 'hsl', label: 'HSL', type: 'text' },
    { name: 'rgb', label: 'CSS RGB', type: 'text' }
  ],
  calculate: (inputs) => {
    const r = Math.round(Number(inputs.r));
    const g = Math.round(Number(inputs.g));
    const b = Math.round(Number(inputs.b));
    
    if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      return [{ value: 'Неверное значение RGB', label: 'Ошибка' }];
    }
    
    // RGB to HEX
    const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    
    // RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const diff = max - min;
    
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
      
      switch (max) {
        case rNorm: h = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) / 6; break;
        case gNorm: h = ((bNorm - rNorm) / diff + 2) / 6; break;
        case bNorm: h = ((rNorm - gNorm) / diff + 4) / 6; break;
      }
    }
    
    const hDeg = Math.round(h * 360);
    const sPct = Math.round(s * 100);
    const lPct = Math.round(l * 100);
    
    return [
      { value: hex, label: 'HEX', unit: '' },
      { value: `hsl(${hDeg}, ${sPct}%, ${lPct}%)`, label: 'HSL', unit: '' },
      { value: `rgb(${r}, ${g}, ${b})`, label: 'CSS RGB', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите значения RGB (0-255). Калькулятор переведёт цвет в HEX и HSL форматы.',
    about: 'Конвертер цветов переводит между RGB, HEX и HSL — основными форматами представления цветов в веб и дизайне.',
    usage: 'Используется в веб-разработке, дизайне, графических редакторах для согласования цветов.',
    formula: 'HEX: #RRGGBB\nHSL: Hue (0-360°), Saturation (0-100%), Lightness (0-100%)',
    faq: [
      {
        question: 'Что такое HEX цвет?',
        answer: 'HEX — шестнадцатеричное представление RGB. #RRGGBB, где каждая пара символов — значение от 00 до FF.'
      },
      {
        question: 'Чем HSL лучше RGB?',
        answer: 'HSL интуитивнее: H — оттенок (цвет), S — насыщенность, L — светлота. Удобнее для создания палитр.'
      }
    ],
    sources: [
      { title: 'RGB — Википедия', url: 'https://ru.wikipedia.org/wiki/RGB' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Контрастность цвета (WCAG)
export const contrastCalculator: Calculator = {
  id: 'contrast-calculator',
  slug: 'kontrastnost-cveta',
  title: 'Контрастность цвета',
  description: 'Проверка соотношения контраста по стандарту WCAG',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'bgR',
      label: 'Фон R',
      type: 'number',
      placeholder: '255',
      defaultValue: 255,
      min: 0,
      max: 255
    },
    {
      name: 'bgG',
      label: 'Фон G',
      type: 'number',
      placeholder: '255',
      defaultValue: 255,
      min: 0,
      max: 255
    },
    {
      name: 'bgB',
      label: 'Фон B',
      type: 'number',
      placeholder: '255',
      defaultValue: 255,
      min: 0,
      max: 255
    },
    {
      name: 'textR',
      label: 'Текст R',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 255
    },
    {
      name: 'textG',
      label: 'Текст G',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 255
    },
    {
      name: 'textB',
      label: 'Текст B',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 255
    }
  ],
  outputs: [
    { name: 'contrastRatio', label: 'Соотношение контраста', type: 'number' },
    { name: 'aaNormal', label: 'WCAG AA (обычный текст)', type: 'text' },
    { name: 'aaaNormal', label: 'WCAG AAA (обычный текст)', type: 'text' }
  ],
  calculate: (inputs) => {
    const bgR = Number(inputs.bgR);
    const bgG = Number(inputs.bgG);
    const bgB = Number(inputs.bgB);
    const textR = Number(inputs.textR);
    const textG = Number(inputs.textG);
    const textB = Number(inputs.textB);
    
    // Calculate relative luminance
    const getLuminance = (r: number, g: number, b: number) => {
      const toLinear = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };
    
    const bgLum = getLuminance(bgR, bgG, bgB);
    const textLum = getLuminance(textR, textG, textB);
    
    const contrastRatio = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);
    
    const aaNormal = contrastRatio >= 4.5 ? '✓ Пройден' : '✗ Не пройден (нужно 4.5:1)';
    const aaaNormal = contrastRatio >= 7 ? '✓ Пройден' : '✗ Не пройден (нужно 7:1)';
    
    return [
      { value: contrastRatio.toFixed(2), label: 'Контраст', unit: ':1' },
      { value: aaNormal, label: 'WCAG AA', unit: '' },
      { value: aaaNormal, label: 'WCAG AAA', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите RGB значения фона и текста. Калькулятор проверит контрастность по стандарту WCAG для доступности.',
    about: 'Контрастность цвета важна для читаемости текста. Стандарт WCAG требует минимум 4.5:1 для обычного текста.',
    usage: 'Используется при разработке сайтов для обеспечения доступности (accessibility) для людей с плохим зрением.',
    formula: 'L = 0.2126×R + 0.7152×G + 0.0722×B (относительная яркость)\nКонтраст = (L1 + 0.05) / (L2 + 0.05)',
    faq: [
      {
        question: 'Что такое WCAG?',
        answer: 'Web Content Accessibility Guidelines — рекомендации по доступности веб-контента. Требования к контрасту: AA — 4.5:1, AAA — 7:1.'
      },
      {
        question: 'Как улучшить контрастность?',
        answer: 'Увеличьте разницу в яркости между цветами. Тёмный текст на светлом фоне или наоборот.'
      }
    ],
    sources: [
      { title: 'WCAG — Википедия', url: 'https://ru.wikipedia.org/wiki/Web_Content_Accessibility_Guidelines' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const colorCalculators = [
  colorConverter,
  contrastCalculator,
];
