import { Calculator } from '../types';

// ============================================
// УТИЛИТЫ РАБОТЫ С ЦВЕТОМ
// ============================================

// Вспомогательные функции для работы с цветом
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(Math.round(r))}${toHex(Math.round(g))}${toHex(Math.round(b))}`;
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
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
  
  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  const sNorm = s / 100;
  const lNorm = l / 100;
  
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = lNorm - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
};

// ============================================
// 1. ГЕНЕРАТОР ПАЛИТР ЦВЕТОВ
// ============================================

export const paletteGenerator: Calculator = {
  id: 'palette-generator',
  slug: 'generator-palitry',
  title: 'Генератор цветовых палитр',
  description: 'Создание гармоничных цветовых сочетаний: случайные, из базового цвета, по настроению',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'mode',
      label: 'Режим генерации',
      type: 'select',
      options: [
        { value: 'random', label: 'Случайная палитра' },
        { value: 'base', label: 'Из базового цвета' },
        { value: 'warm', label: 'Тёплые тона' },
        { value: 'cool', label: 'Холодные тона' },
        { value: 'pastel', label: 'Пастельные тона' }
      ],
      defaultValue: 'random'
    },
    {
      name: 'baseColor',
      label: 'Базовый цвет (HEX)',
      type: 'text',
      placeholder: '#FF6B6B',
      defaultValue: '#FF6B6B'
    },
    {
      name: 'count',
      label: 'Количество цветов',
      type: 'number',
      min: 3,
      max: 8,
      defaultValue: 5
    }
  ],
  outputs: [
    { name: 'palette', label: 'Палитра цветов', type: 'text' }
  ],
  calculate: (inputs) => {
    const mode = String(inputs.mode);
    const baseColor = String(inputs.baseColor || '#FF6B6B');
    const count = Math.min(Math.max(Number(inputs.count) || 5, 3), 8);
    
    let palette: string[] = [];
    
    if (mode === 'random') {
      // Случайная палитра
      for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        palette.push(rgbToHex(r, g, b));
      }
    } else if (mode === 'base') {
      // Из базового цвета (гармоничные сочетания)
      const rgb = hexToRgb(baseColor);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        // Комплементарные, триадические, аналоговые цвета
        const hueShifts = [0, 30, 60, 180, 210, 330];
        for (let i = 0; i < count; i++) {
          const newHue = (hsl.h + hueShifts[i % hueShifts.length]) % 360;
          const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
          palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        }
      }
    } else if (mode === 'warm') {
      // Тёплые тона (красный, оранжевый, жёлтый)
      const warmHues = [0, 15, 30, 45, 60, 15, 30, 45];
      for (let i = 0; i < count; i++) {
        const h = warmHues[i % warmHues.length] + (Math.random() * 20 - 10);
        const s = 70 + Math.random() * 30;
        const l = 50 + Math.random() * 20;
        const rgb = hslToRgb(h, s, l);
        palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
      }
    } else if (mode === 'cool') {
      // Холодные тона (синий, зелёный, фиолетовый)
      const coolHues = [180, 210, 240, 270, 300, 210, 240, 270];
      for (let i = 0; i < count; i++) {
        const h = coolHues[i % coolHues.length] + (Math.random() * 20 - 10);
        const s = 70 + Math.random() * 30;
        const l = 50 + Math.random() * 20;
        const rgb = hslToRgb(h, s, l);
        palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
      }
    } else if (mode === 'pastel') {
      // Пастельные тона
      const pastelHues = [0, 45, 90, 180, 270, 315, 30, 150];
      for (let i = 0; i < count; i++) {
        const h = pastelHues[i % pastelHues.length];
        const s = 30 + Math.random() * 30;
        const l = 80 + Math.random() * 15;
        const rgb = hslToRgb(h, s, l);
        palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
      }
    }
    
    const paletteStr = palette.join(', ');
    
    return [
      { value: paletteStr, label: 'Палитра (HEX)', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите режим генерации: случайную палитру, палитру из базового цвета (гармоничные сочетания), тёплые или холодные тона, пастельные цвета.',
    about: 'Теория цвета изучает гармоничные сочетания. Основные схемы: комплементарные (противоположные), аналоговые (соседние), триадические (равностоящие) цвета.',
    usage: 'Используется в веб-дизайне, брендинге, интерьере для создания гармоничных цветовых схем.',
    formula: 'Аналоговая схема: H ± 30°\nКомплементарная: H + 180°\nТриадическая: H ± 120°',
    faq: [
      {
        question: 'Что такое цветовой круг?',
        answer: 'Цветовой круг — диаграмма, на которой цвета расположены по порядку: красный, оранжевый, жёлтый, зелёный, голубой, синий, фиолетовый.'
      },
      {
        question: 'Какие бывают цветовые схемы?',
        answer: 'Монохроматическая (оттенки одного цвета), аналоговая (соседние цвета), комплементарная (противоположные), триадическая (три равноудалённых цвета).'
      },
      {
        question: 'Что такое пастельные цвета?',
        answer: 'Пастельные цвета — это приглушённые, мягкие тона с высокой светлотой (70-95%) и низкой насыщенностью (20-50%).'
      }
    ],
    sources: [
      { title: 'Теория цвета — Википедия', url: 'https://ru.wikipedia.org/wiki/Теория_цвета' },
      { title: 'Цветовой круг Иттена', url: 'https://ru.wikipedia.org/wiki/Цветовой_круг' }
    ],
    updatedAt: '2026-04-07'
  }
};

// ============================================
// 2. ПРОВЕРКА КОНТРАСТНОСТИ WCAG
// ============================================

export const wcagContrastChecker: Calculator = {
  id: 'wcag-contrast-checker',
  slug: 'proverka-kontrasta-wcag',
  title: 'Проверка контрастности WCAG',
  description: 'Проверка соответствия стандартам доступности AA/AAA для текста на фоне',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'bgColor',
      label: 'Цвет фона (HEX)',
      type: 'text',
      placeholder: '#FFFFFF',
      defaultValue: '#FFFFFF'
    },
    {
      name: 'textColor',
      label: 'Цвет текста (HEX)',
      type: 'text',
      placeholder: '#000000',
      defaultValue: '#000000'
    },
    {
      name: 'textSize',
      label: 'Размер текста',
      type: 'select',
      options: [
        { value: 'normal', label: 'Обычный (< 18pt или < 14pt жирный)' },
        { value: 'large', label: 'Крупный (≥ 18pt или ≥ 14pt жирный)' }
      ],
      defaultValue: 'normal'
    }
  ],
  outputs: [
    { name: 'ratio', label: 'Соотношение контраста', type: 'number' },
    { name: 'aa', label: 'WCAG AA', type: 'text' },
    { name: 'aaa', label: 'WCAG AAA', type: 'text' }
  ],
  calculate: (inputs) => {
    const bgColor = String(inputs.bgColor || '#FFFFFF');
    const textColor = String(inputs.textColor || '#000000');
    const textSize = String(inputs.textSize || 'normal');
    
    const bgRgb = hexToRgb(bgColor);
    const textRgb = hexToRgb(textColor);
    
    if (!bgRgb || !textRgb) {
      return [
        { value: 'Ошибка', label: 'Контраст', unit: '' },
        { value: 'Неверный HEX', label: 'WCAG AA', unit: '' },
        { value: 'Неверный HEX', label: 'WCAG AAA', unit: '' }
      ];
    }
    
    // Расчёт относительной яркости
    const getLuminance = (r: number, g: number, b: number) => {
      const toLinear = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };
    
    const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const textLum = getLuminance(textRgb.r, textRgb.g, textRgb.b);
    
    const ratio = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);
    
    // Требования WCAG
    const aaThreshold = textSize === 'large' ? 3 : 4.5;
    const aaaThreshold = textSize === 'large' ? 4.5 : 7;
    
    const aaResult = ratio >= aaThreshold ? '✓ Соответствует AA' : `✗ Не соответствует (нужно ${aaThreshold}:1)`;
    const aaaResult = ratio >= aaaThreshold ? '✓ Соответствует AAA' : `✗ Не соответствует (нужно ${aaaThreshold}:1)`;
    
    return [
      { value: ratio.toFixed(2), label: 'Контраст', unit: ':1' },
      { value: aaResult, label: 'WCAG AA', unit: '' },
      { value: aaaResult, label: 'WCAG AAA', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите цвета фона и текста в формате HEX. Калькулятор определит соотношение контраста и соответствие стандартам WCAG AA и AAA.',
    about: 'WCAG (Web Content Accessibility Guidelines) определяет минимальные требования к контрастности для обеспечения доступности контента для людей с нарушениями зрения.',
    usage: 'Обязательно при разработке сайтов и приложений для соответствия стандартам доступности. Особенно важно для текстового контента.',
    formula: 'L = 0.2126×R + 0.7152×G + 0.0722×B (относительная яркость)\nКонтраст = (L1 + 0.05) / (L2 + 0.05)\nAA: 4.5:1 (обычный), 3:1 (крупный)\nAAA: 7:1 (обычный), 4.5:1 (крупный)',
    faq: [
      {
        question: 'Что такое WCAG AA и AAA?',
        answer: 'Уровни соответствия стандартам доступности. AA — минимально приемлемый уровень, AAA — высший уровень доступности.'
      },
      {
        question: 'Какой контраст нужен для крупного текста?',
        answer: 'Для крупного текста (18pt+ или 14pt+ жирный): WCAG AA требует 3:1, WCAG AAA — 4.5:1.'
      },
      {
        question: 'Как улучшить контрастность?',
        answer: 'Увеличьте разницу в яркости между цветами. Используйте тёмный текст на светлом фоне или наоборот.'
      }
    ],
    sources: [
      { title: 'WCAG 2.1 — Руководство', url: 'https://www.w3.org/WAI/WCAG21/quickref/' },
      { title: 'Доступность веб-контента', url: 'https://ru.wikipedia.org/wiki/Web_Content_Accessibility_Guidelines' }
    ],
    updatedAt: '2026-04-07'
  }
};

// ============================================
// 3. СИМУЛЯТОР ДАЛЬТОНИЗМА
// ============================================

export const colorBlindnessSimulator: Calculator = {
  id: 'color-blindness-simulator',
  slug: 'simulyator-daltonizma',
  title: 'Симулятор цветовой слепоты',
  description: 'Проверка, как цвета воспринимаются при различных видах дальтонизма',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'color',
      label: 'Цвет (HEX)',
      type: 'text',
      placeholder: '#FF6B6B',
      defaultValue: '#FF6B6B'
    },
    {
      name: 'type',
      label: 'Тип дальтонизма',
      type: 'select',
      options: [
        { value: 'protanopia', label: 'Протанопия (нет красного)' },
        { value: 'deuteranopia', label: 'Дейтеранопия (нет зелёного)' },
        { value: 'tritanopia', label: 'Тританопия (нет синего)' },
        { value: 'achromatopsia', label: 'Ахроматопсия (ч/б)' }
      ],
      defaultValue: 'protanopia'
    }
  ],
  outputs: [
    { name: 'original', label: 'Исходный цвет', type: 'text' },
    { name: 'simulated', label: 'Воспринимаемый цвет', type: 'text' }
  ],
  calculate: (inputs) => {
    const color = String(inputs.color || '#FF6B6B');
    const type = String(inputs.type || 'protanopia');
    
    const rgb = hexToRgb(color);
    if (!rgb) {
      return [
        { value: color, label: 'Исходный', unit: '' },
        { value: 'Ошибка HEX', label: 'Результат', unit: '' }
      ];
    }
    
    // Матрицы трансформации для разных типов дальтонизма
    const matrices: Record<string, number[][]> = {
      protanopia: [ // Нет восприятия красного
        [0.567, 0.433, 0],
        [0.558, 0.442, 0],
        [0, 0.242, 0.758]
      ],
      deuteranopia: [ // Нет восприятия зелёного
        [0.625, 0.375, 0],
        [0.7, 0.3, 0],
        [0, 0.3, 0.7]
      ],
      tritanopia: [ // Нет восприятия синего
        [0.95, 0.05, 0],
        [0, 0.433, 0.567],
        [0, 0.475, 0.525]
      ],
      achromatopsia: [ // Полная цветовая слепота
        [0.299, 0.587, 0.114],
        [0.299, 0.587, 0.114],
        [0.299, 0.587, 0.114]
      ]
    };
    
    const matrix = matrices[type] || matrices.protanopia;
    
    const r = rgb.r;
    const g = rgb.g;
    const b = rgb.b;
    
    const newR = matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b;
    const newG = matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b;
    const newB = matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b;
    
    const simulated = rgbToHex(
      Math.max(0, Math.min(255, newR)),
      Math.max(0, Math.min(255, newG)),
      Math.max(0, Math.min(255, newB))
    );
    
    const typeNames: Record<string, string> = {
      protanopia: 'Протанопия',
      deuteranopia: 'Дейтеранопия',
      tritanopia: 'Тританопия',
      achromatopsia: 'Ахроматопсия'
    };
    
    return [
      { value: color.toUpperCase(), label: 'Исходный', unit: '' },
      { value: simulated, label: typeNames[type] || type, unit: '' }
    ];
  },
  content: {
    howTo: 'Введите цвет в формате HEX и выберите тип дальтонизма. Калькулятор покажет, как этот цвет будет восприниматься человеком с данным нарушением зрения.',
    about: 'Дальтонизм — нарушение цветового зрения. Протанопия (нет красного) — 1% мужчин, дейтеранопия (нет зелёного) — 1% мужчин, тританопия (нет синего) — редкая.',
    usage: 'Важно для дизайнеров, чтобы проверить, что важная информация не передаётся только цветом. Особенно для диаграмм, карт, индикаторов.',
    formula: 'Используются матрицы трансформации RGB для симуляции каждого типа дальтонизма на основе исследований цветового зрения.',
    faq: [
      {
        question: 'Что такое протанопия?',
        answer: 'Отсутствие или снижение восприятия красного цвета. Красный воспринимается как тёмный, красно-зелёные пары плохо различимы.'
      },
      {
        question: 'Что такое дейтеранопия?',
        answer: 'Отсутствие или снижение восприятия зелёного цвета. Самый распространённый тип дальтонизма (около 1% мужчин).'
      },
      {
        question: 'Как делать дизайн доступным?',
        answer: 'Не полагайтесь только на цвет. Используйте текст, иконки, формы, текстуры. Проверяйте контрастность (минимум 4.5:1).'
      }
    ],
    sources: [
      { title: 'Дальтонизм — Википедия', url: 'https://ru.wikipedia.org/wiki/Дальтонизм' },
      { title: 'WCAG: Использование цвета', url: 'https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html' }
    ],
    updatedAt: '2026-04-07'
  }
};

// ============================================
// 4. ЦВЕТОВАЯ ТЕМПЕРАТУРА
// ============================================

export const colorTemperatureCalculator: Calculator = {
  id: 'color-temperature',
  slug: 'tsvetovaya-temperatura',
  title: 'Цветовая температура',
  description: 'Преобразование температуры в Кельвинах (1000K-10000K) в RGB цвет',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'kelvin',
      label: 'Температура (К)',
      type: 'number',
      min: 1000,
      max: 10000,
      step: 100,
      defaultValue: 6500,
      placeholder: '6500'
    }
  ],
  outputs: [
    { name: 'hex', label: 'HEX', type: 'text' },
    { name: 'rgb', label: 'RGB', type: 'text' },
    { name: 'description', label: 'Описание', type: 'text' }
  ],
  calculate: (inputs) => {
    const kelvin = Math.max(1000, Math.min(10000, Number(inputs.kelvin) || 6500));
    
    // Алгоритм аппроксимации цветовой температуры
    let r: number, g: number, b: number;
    
    // Нормализованная температура
    const temp = kelvin / 100;
    
    // Красный канал
    if (temp <= 66) {
      r = 255;
    } else {
      r = temp - 60;
      r = 329.698727446 * Math.pow(r, -0.1332047592);
      r = Math.max(0, Math.min(255, r));
    }
    
    // Зелёный канал
    if (temp <= 66) {
      g = temp;
      g = 99.4708025861 * Math.log(g) - 161.1195681661;
    } else {
      g = temp - 60;
      g = 288.1221695283 * Math.pow(g, -0.0755148492);
    }
    g = Math.max(0, Math.min(255, g));
    
    // Синий канал
    if (temp >= 66) {
      b = 255;
    } else {
      if (temp <= 19) {
        b = 0;
      } else {
        b = temp - 10;
        b = 138.5177312231 * Math.log(b) - 305.0447927307;
        b = Math.max(0, Math.min(255, b));
      }
    }
    
    // Описание температуры
    let description = '';
    if (kelvin < 2000) description = 'Свеча, закат (очень тёплый)';
    else if (kelvin < 3000) description = 'Лампа накаливания, рассвет (тёплый)';
    else if (kelvin < 4000) description = 'Флуоресцентная лампа, утро (нейтрально-тёплый)';
    else if (kelvin < 5000) description = 'Солнечный свет в полдень (нейтральный)';
    else if (kelvin < 6500) description = 'Дневной свет (нейтрально-холодный)';
    else if (kelvin < 8000) description = 'Пасмурное небо, тень (холодный)';
    else description = 'Синее небо, экран монитора (очень холодный)';
    
    return [
      { value: rgbToHex(r, g, b), label: 'HEX', unit: '' },
      { value: `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`, label: 'RGB', unit: '' },
      { value: description, label: 'Описание', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите цветовую температуру в Кельвинах от 1000K (тепло-красный) до 10000K (холодно-синий). Калькулятор покажет соответствующий RGB цвет.',
    about: 'Цветовая температура — характеристика цвета свечения, измеряемая в Кельвинах. Низкая температура = тёплый (красно-оранжевый), высокая = холодный (сине-белый).',
    usage: 'Используется в фотографии для баланса белого, в освещении для создания атмосферы, в дизайне для подбора цветов.',
    formula: 'Аппроксимация по алгоритму Кристина Макклауд:\nДля T < 6600K: красный доминирует\nДля T > 6600K: синий доминирует\nЗелёный пик на ~6600K',
    faq: [
      {
        question: 'Какая температура считается тёплой?',
        answer: '2700K-3000K — тёплый белый (лампа накаливания). 4000K — нейтральный. 5500K-6500K — холодный (дневной свет).'
      },
      {
        question: 'Что такое баланс белого?',
        answer: 'Настройка камеры или изображения для корректного отображения белого цвета при разном освещении.'
      },
      {
        question: 'Как температура влияет на восприятие?',
        answer: 'Тёплый свет (2700K) расслабляет и создаёт уют, холодный (6500K) повышает концентрацию и бодрость.'
      }
    ],
    sources: [
      { title: 'Цветовая температура — Википедия', url: 'https://ru.wikipedia.org/wiki/Цветовая_температура' },
      { title: 'Баланс белого в фотографии', url: 'https://ru.wikipedia.org/wiki/Баланс_белого' }
    ],
    updatedAt: '2026-04-07'
  }
};

// ============================================
// 5. ПОИСК PANTONE
// ============================================

export const pantoneFinder: Calculator = {
  id: 'pantone-finder',
  slug: 'pantone-poisk',
  title: 'Поиск Pantone',
  description: 'Поиск цветов Pantone Coated и конвертация в RGB/CMYK/HEX',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'reference',
  inputs: [
    {
      name: 'pantoneCode',
      label: 'Код Pantone',
      type: 'text',
      placeholder: '185 C',
      defaultValue: '185 C'
    }
  ],
  outputs: [
    { name: 'rgb', label: 'RGB', type: 'text' },
    { name: 'cmyk', label: 'CMYK', type: 'text' },
    { name: 'hex', label: 'HEX', type: 'text' }
  ],
  calculate: (inputs) => {
    const code = String(inputs.pantoneCode || '').toUpperCase().trim();
    
    // База данных популярных Pantone цветов
    const pantoneDb: Record<string, { rgb: [number, number, number]; cmyk: [number, number, number, number] }> = {
      '185 C': { rgb: [228, 0, 43], cmyk: [0, 100, 79, 0] },
      '185 U': { rgb: [228, 0, 43], cmyk: [0, 100, 79, 0] },
      ' reflex blue c': { rgb: [0, 20, 137], cmyk: [100, 98, 0, 10] },
      ' reflex blue u': { rgb: [0, 20, 137], cmyk: [100, 98, 0, 10] },
      ' process blue c': { rgb: [0, 133, 202], cmyk: [100, 10, 0, 0] },
      ' process blue u': { rgb: [0, 133, 202], cmyk: [100, 10, 0, 0] },
      ' 485 c': { rgb: [213, 0, 0], cmyk: [0, 100, 100, 0] },
      ' 485 u': { rgb: [213, 0, 0], cmyk: [0, 100, 100, 0] },
      ' 349 c': { rgb: [0, 122, 83], cmyk: [100, 0, 57, 30] },
      ' 349 u': { rgb: [0, 122, 83], cmyk: [100, 0, 57, 30] },
      ' 130 c': { rgb: [255, 199, 44], cmyk: [0, 20, 80, 0] },
      ' 130 u': { rgb: [255, 199, 44], cmyk: [0, 20, 80, 0] },
      ' black c': { rgb: [45, 41, 38], cmyk: [60, 50, 50, 100] },
      ' black u': { rgb: [45, 41, 38], cmyk: [60, 50, 50, 100] },
      ' cool gray 1 c': { rgb: [217, 217, 214], cmyk: [5, 3, 5, 0] },
      ' cool gray 10 c': { rgb: [99, 102, 106], cmyk: [20, 15, 10, 40] },
      ' warm gray 1 c': { rgb: [215, 210, 203], cmyk: [5, 5, 10, 5] },
      ' warm gray 10 c': { rgb: [106, 100, 91], cmyk: [15, 20, 25, 45] },
      ' 202 c': { rgb: [134, 38, 51], cmyk: [15, 95, 60, 45] },
      ' 202 u': { rgb: [134, 38, 51], cmyk: [15, 95, 60, 45] },
      ' 286 c': { rgb: [0, 51, 160], cmyk: [100, 90, 0, 0] },
      ' 286 u': { rgb: [0, 51, 160], cmyk: [100, 90, 0, 0] },
      ' 354 c': { rgb: [0, 150, 57], cmyk: [100, 0, 100, 0] },
      ' 354 u': { rgb: [0, 150, 57], cmyk: [100, 0, 100, 0] },
      ' 116 c': { rgb: [255, 205, 0], cmyk: [0, 10, 100, 0] },
      ' 116 u': { rgb: [255, 205, 0], cmyk: [0, 10, 100, 0] },
      ' 300 c': { rgb: [0, 94, 184], cmyk: [100, 60, 0, 0] },
      ' 300 u': { rgb: [0, 94, 184], cmyk: [100, 60, 0, 0] },
      ' 032 c': { rgb: [239, 51, 64], cmyk: [0, 90, 70, 0] },
      ' 032 u': { rgb: [239, 51, 64], cmyk: [0, 90, 70, 0] }
    };
    
    const color = pantoneDb[code];
    
    if (!color) {
      return [
        { value: 'Цвет не найден', label: 'RGB', unit: '' },
        { value: 'Цвет не найден', label: 'CMYK', unit: '' },
        { value: 'Цвет не найден', label: 'HEX', unit: '' }
      ];
    }
    
    const [r, g, b] = color.rgb;
    const [c, m, y, k] = color.cmyk;
    
    return [
      { value: `${r}, ${g}, ${b}`, label: 'RGB', unit: '' },
      { value: `${c}%, ${m}%, ${y}%, ${k}%`, label: 'CMYK', unit: '' },
      { value: rgbToHex(r, g, b), label: 'HEX', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите код Pantone (например, "185 C" или "485 C"). Калькулятор покажет соответствующие значения в RGB, CMYK и HEX.',
    about: 'Pantone — международная система сопоставления цветов. Каждому цвету присвоен уникальный код для точной передачи при печати.',
    usage: 'Используется в графическом дизайне, полиграфии, моде для обеспечения точного соответствия цветов при печати.',
    formula: 'Pantone Matching System (PMS) — проприетарная система. Каждый цвет имеет формулу смешивания базовых красок.',
    faq: [
      {
        question: 'Что значат буквы C и U?',
        answer: 'C (Coated) — мелованная бумага, U (Uncoated) — немелованная. Одинаковые номера дают немного разные цвета на разной бумаге.'
      },
      {
        question: 'В чём разница Pantone и CMYK?',
        answer: 'Pantone использует готовые смеси красок для точного цвета. CMYK — смешивание 4 базовых красок, что даёт меньшую точность.'
      },
      {
        question: 'Можно ли точно конвертировать Pantone в RGB?',
        answer: 'Нет, Pantone охватывает больше цветов, чем RGB. Конвертация приблизительна, некоторые цвета теряются.'
      }
    ],
    sources: [
      { title: 'Pantone — Википедия', url: 'https://ru.wikipedia.org/wiki/Pantone' },
      { title: 'Система Pantone', url: 'https://www.pantone.com/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// ============================================
// 6. КОНВЕРТЕР RAL
// ============================================

export const ralConverter: Calculator = {
  id: 'ral-converter',
  slug: 'ral-konverter',
  title: 'Конвертер RAL',
  description: 'Конвертация цветов RAL Classic и RAL Design в RGB/HEX',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'reference',
  inputs: [
    {
      name: 'ralCode',
      label: 'Код RAL',
      type: 'text',
      placeholder: '1003',
      defaultValue: '1003'
    }
  ],
  outputs: [
    { name: 'name', label: 'Название', type: 'text' },
    { name: 'rgb', label: 'RGB', type: 'text' },
    { name: 'hex', label: 'HEX', type: 'text' }
  ],
  calculate: (inputs) => {
    const code = String(inputs.ralCode || '').trim();
    
    // База данных популярных RAL цветов
    const ralDb: Record<string, { name: string; rgb: [number, number, number] }> = {
      '1000': { name: 'Зелёно-бежевый', rgb: [205, 186, 136] },
      '1001': { name: 'Бежевый', rgb: [208, 176, 132] },
      '1002': { name: 'Песочно-жёлтый', rgb: [218, 172, 86] },
      '1003': { name: 'Сигнальный жёлтый', rgb: [255, 176, 0] },
      '1004': { name: 'Жёлто-золотой', rgb: [228, 158, 0] },
      '1005': { name: 'Медово-жёлтый', rgb: [201, 135, 0] },
      '2000': { name: 'Жёлто-оранжевый', rgb: [237, 120, 0] },
      '2001': { name: 'Красно-оранжевый', rgb: [201, 60, 0] },
      '2002': { name: 'Алый', rgb: [187, 32, 19] },
      '2003': { name: 'Пастельно-оранжевый', rgb: [255, 105, 71] },
      '3000': { name: 'Огненно-красный', rgb: [175, 43, 43] },
      '3001': { name: 'Сигнальный красный', rgb: [163, 30, 30] },
      '3002': { name: 'Карминно-красный', rgb: [155, 36, 46] },
      '3003': { name: 'Рубиновый', rgb: [146, 16, 28] },
      '3011': { name: 'Коричнево-красный', rgb: [121, 36, 35] },
      '4001': { name: 'Красно-лиловый', rgb: [129, 97, 130] },
      '4002': { name: 'Красно-фиолетовый', rgb: [141, 50, 88] },
      '4003': { name: 'Пурпурный', rgb: [196, 97, 140] },
      '4004': { name: 'Бордовый', rgb: [101, 30, 56] },
      '5000': { name: 'Фиолетово-синий', rgb: [48, 58, 93] },
      '5001': { name: 'Зелёно-синий', rgb: [31, 56, 85] },
      '5002': { name: 'Ультрамарин', rgb: [32, 56, 119] },
      '5003': { name: 'Сапфировый', rgb: [29, 51, 74] },
      '5005': { name: 'Сигнальный синий', rgb: [30, 56, 133] },
      '5010': { name: 'Генцианово-синий', rgb: [32, 72, 108] },
      '6000': { name: 'Патиново-зелёный', rgb: [60, 116, 96] },
      '6001': { name: 'Изумрудно-зелёный', rgb: [54, 103, 53] },
      '6002': { name: 'Лиственно-зелёный', rgb: [50, 89, 40] },
      '6003': { name: 'Оливково-зелёный', rgb: [80, 83, 60] },
      '6004': { name: 'Сине-зелёный', rgb: [24, 63, 59] },
      '6010': { name: 'Травяной зелёный', rgb: [69, 107, 56] },
      '7000': { name: 'Серая белка', rgb: [123, 132, 130] },
      '7001': { name: 'Серебристо-серый', rgb: [140, 150, 153] },
      '7004': { name: 'Сигнальный серый', rgb: [177, 179, 179] },
      '7011': { name: 'Серо-бежевый', rgb: [95, 106, 114] },
      '7021': { name: 'Тёмно-серый', rgb: [62, 69, 70] },
      '7035': { name: 'Светло-серый', rgb: [197, 199, 196] },
      '7037': { name: 'Пыльно-серый', rgb: [125, 132, 133] },
      '7040': { name: 'Оконно-серый', rgb: [155, 161, 166] },
      '8001': { name: 'Охра коричневая', rgb: [157, 89, 53] },
      '8002': { name: 'Сигнальный коричневый', rgb: [121, 73, 59] },
      '8004': { name: 'Медно-коричневый', rgb: [138, 72, 48] },
      '8011': { name: 'Орехово-коричневый', rgb: [91, 61, 49] },
      '8017': { name: 'Шоколадно-коричневый', rgb: [69, 50, 46] },
      '9001': { name: 'Кремово-белый', rgb: [241, 236, 225] },
      '9002': { name: 'Серо-белый', rgb: [215, 213, 210] },
      '9003': { name: 'Сигнальный белый', rgb: [244, 244, 244] },
      '9004': { name: 'Сигнальный чёрный', rgb: [40, 40, 40] },
      '9005': { name: 'Глубокий чёрный', rgb: [14, 14, 14] },
      '9010': { name: 'Белый', rgb: [250, 250, 250] },
      '9011': { name: 'Графитово-чёрный', rgb: [39, 41, 43] }
    };
    
    const color = ralDb[code];
    
    if (!color) {
      return [
        { value: 'Цвет не найден', label: 'Название', unit: '' },
        { value: '—', label: 'RGB', unit: '' },
        { value: '—', label: 'HEX', unit: '' }
      ];
    }
    
    const [r, g, b] = color.rgb;
    
    return [
      { value: color.name, label: 'Название', unit: '' },
      { value: `${r}, ${g}, ${b}`, label: 'RGB', unit: '' },
      { value: rgbToHex(r, g, b), label: 'HEX', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите код RAL (например, "1003" или "5010"). Калькулятор покажет название цвета и его значения RGB и HEX.',
    about: 'RAL — немецкая цветовая система, используемая в Европе для стандартизации цветов в промышленности, особенно для красок и лаков.',
    usage: 'Широко используется в строительстве, промышленности, автомобилестроении для точного указания цветов покрытий.',
    formula: 'RAL Classic — 213 цветов с 4-значными номерами. RAL Design — 1625 цветов с HLC-кодировкой (Hue, Lightness, Chroma).',
    faq: [
      {
        question: 'Что такое RAL Classic?',
        answer: 'Основная система RAL с 213 цветами. Цвета сгруппированы: 1xxx — жёлтые, 2xxx — оранжевые, 3xxx — красные, 4xxx — фиолетовые, 5xxx — синие, 6xxx — зелёные, 7xxx — серые, 8xxx — коричневые, 9xxx — белые/чёрные.'
      },
      {
        question: 'В чём отличие RAL от Pantone?',
        answer: 'RAL ориентирована на промышленные покрытия и материалы. Pantone — на печать и графический дизайн. RAL популярнее в Европе.'
      },
      {
        question: 'Что такое RAL Design?',
        answer: 'Расширенная система с 1625 цветами, организованными по цветовому пространству HLC (тон, светлота, насыщенность).'
      }
    ],
    sources: [
      { title: 'RAL — Википедия', url: 'https://ru.wikipedia.org/wiki/RAL' },
      { title: 'Официальный сайт RAL', url: 'https://www.ral-farben.de/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// ============================================
// 7. ГЕНЕРАТОР ГРАДИЕНТОВ
// ============================================

export const gradientGenerator: Calculator = {
  id: 'gradient-generator',
  slug: 'generator-gradientov',
  title: 'Генератор градиентов',
  description: 'Создание CSS градиентов: линейных, радиальных, конических',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'type',
      label: 'Тип градиента',
      type: 'select',
      options: [
        { value: 'linear', label: 'Линейный' },
        { value: 'radial', label: 'Радиальный' },
        { value: 'conic', label: 'Конический' }
      ],
      defaultValue: 'linear'
    },
    {
      name: 'color1',
      label: 'Цвет 1 (HEX)',
      type: 'text',
      placeholder: '#FF6B6B',
      defaultValue: '#FF6B6B'
    },
    {
      name: 'color2',
      label: 'Цвет 2 (HEX)',
      type: 'text',
      placeholder: '#4ECDC4',
      defaultValue: '#4ECDC4'
    },
    {
      name: 'color3',
      label: 'Цвет 3 (HEX, опционально)',
      type: 'text',
      placeholder: '#45B7D1',
      defaultValue: '#45B7D1'
    },
    {
      name: 'angle',
      label: 'Угол (для линейного, градусов)',
      type: 'number',
      min: 0,
      max: 360,
      defaultValue: 135
    }
  ],
  outputs: [
    { name: 'css', label: 'CSS код', type: 'text' },
    { name: 'type', label: 'Тип', type: 'text' }
  ],
  calculate: (inputs) => {
    const type = String(inputs.type || 'linear');
    const color1 = String(inputs.color1 || '#FF6B6B');
    const color2 = String(inputs.color2 || '#4ECDC4');
    const color3 = String(inputs.color3 || '');
    const angle = Number(inputs.angle) || 135;
    
    let cssCode = '';
    const typeNames: Record<string, string> = {
      linear: 'Линейный градиент',
      radial: 'Радиальный градиент',
      conic: 'Конический градиент'
    };
    
    if (type === 'linear') {
      if (color3 && color3.startsWith('#')) {
        cssCode = `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
      } else {
        cssCode = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
      }
    } else if (type === 'radial') {
      if (color3 && color3.startsWith('#')) {
        cssCode = `radial-gradient(circle, ${color1}, ${color2}, ${color3})`;
      } else {
        cssCode = `radial-gradient(circle, ${color1}, ${color2})`;
      }
    } else if (type === 'conic') {
      if (color3 && color3.startsWith('#')) {
        cssCode = `conic-gradient(from ${angle}deg, ${color1}, ${color2}, ${color3})`;
      } else {
        cssCode = `conic-gradient(from ${angle}deg, ${color1}, ${color2})`;
      }
    }
    
    return [
      { value: cssCode, label: 'CSS', unit: '' },
      { value: typeNames[type], label: 'Тип градиента', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите тип градиента, введите цвета в формате HEX и угол (для линейного). Калькулятор сгенерирует CSS код.',
    about: 'Градиент — плавный переход между цветами. Линейный — по прямой, радиальный — из центра, конический — по кругу от центра.',
    usage: 'Используется в CSS для создания фонов, кнопок, карточек. Градиенты добавляют глубину и современный вид интерфейсу.',
    formula: 'Линейный: linear-gradient(угол, цвет1, цвет2)\nРадиальный: radial-gradient(форма, цвет1, цвет2)\nКонический: conic-gradient(from угол, цвет1, цвет2)',
    faq: [
      {
        question: 'Как работает линейный градиент?',
        answer: 'Цвета распределяются вдоль прямой линии под заданным углом. 0deg — снизу вверх, 90deg — слева направо, 180deg — сверху вниз.'
      },
      {
        question: 'Что такое радиальный градиент?',
        answer: 'Цвета распределяются от центральной точки наружу. Может быть круглым (circle) или эллиптическим (ellipse).'
      },
      {
        question: 'Что такое конический градиент?',
        answer: 'Относительно новый тип градиента, где цвета распределяются вокруг центральной точки по кругу (как цветовой круг).'
      }
    ],
    sources: [
      { title: 'CSS Gradients — MDN', url: 'https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Images/Using_CSS_gradients' },
      { title: 'CSS Gradient', url: 'https://cssgradient.io/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// ============================================
// 8. СМЕСИТЕЛЬ ЦВЕТОВ
// ============================================

export const colorMixer: Calculator = {
  id: 'color-mixer',
  slug: 'smesitel-cvetov',
  title: 'Смеситель цветов',
  description: 'Смешивание двух цветов с регулируемым соотношением',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'color1',
      label: 'Цвет 1 (HEX)',
      type: 'text',
      placeholder: '#FF0000',
      defaultValue: '#FF0000'
    },
    {
      name: 'color2',
      label: 'Цвет 2 (HEX)',
      type: 'text',
      placeholder: '#0000FF',
      defaultValue: '#0000FF'
    },
    {
      name: 'ratio',
      label: 'Соотношение (%) — цвет 1',
      type: 'number',
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' },
    { name: 'hex', label: 'HEX', type: 'text' },
    { name: 'rgb', label: 'RGB', type: 'text' }
  ],
  calculate: (inputs) => {
    const color1 = String(inputs.color1 || '#FF0000');
    const color2 = String(inputs.color2 || '#0000FF');
    const ratio = Math.max(0, Math.min(100, Number(inputs.ratio) || 50));
    
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) {
      return [
        { value: 'Ошибка', label: 'Результат', unit: '' },
        { value: '—', label: 'HEX', unit: '' },
        { value: '—', label: 'RGB', unit: '' }
      ];
    }
    
    // Линейная интерполяция в RGB
    const r = Math.round(rgb1.r * (ratio / 100) + rgb2.r * (1 - ratio / 100));
    const g = Math.round(rgb1.g * (ratio / 100) + rgb2.g * (1 - ratio / 100));
    const b = Math.round(rgb1.b * (ratio / 100) + rgb2.b * (1 - ratio / 100));
    
    const resultHex = rgbToHex(r, g, b);
    const ratioText = `${ratio}% ${color1} + ${100 - ratio}% ${color2}`;
    
    return [
      { value: ratioText, label: 'Смесь', unit: '' },
      { value: resultHex, label: 'HEX', unit: '' },
      { value: `${r}, ${g}, ${b}`, label: 'RGB', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите два цвета в формате HEX и процентное соотношение первого цвета (0-100%). Калькулятор покажет результат смешивания.',
    about: 'Смешивание цветов — фундаментальная операция в теории цвета. При смешивании красок работает субтрактивная модель, при смешивании света — аддитивная.',
    usage: 'Используется для создания промежуточных оттенков, плавных переходов, подбора цвета между двумя заданными.',
    formula: 'Линейная интерполяция:\nR = R1 × ratio + R2 × (1 - ratio)\nG = G1 × ratio + G2 × (1 - ratio)\nB = B1 × ratio + B2 × (1 - ratio)',
    faq: [
      {
        question: 'Почему красный + синий = пурпурный?',
        answer: 'В аддитивной модели (RGB) красный и синий свет дают пурпурный. В субтрактивной (краски) красный + синий = тёмно-фиолетовый.'
      },
      {
        question: 'Что такое интерполяция?',
        answer: 'Нахождение промежуточных значений между двумя точками. При 50% получается цвет ровно посередине.'
      },
      {
        question: 'Как смешивать краски физически?',
        answer: 'Физическое смешивание красок следует субтрактивной модели CMYK. Жёлтый + голубой = зелёный, голубой + пурпурный = синий.'
      }
    ],
    sources: [
      { title: 'Смешивание цветов — Википедия', url: 'https://ru.wikipedia.org/wiki/Смешивание_цветов' },
      { title: 'Цветовые модели', url: 'https://ru.wikipedia.org/wiki/Цветовая_модель' }
    ],
    updatedAt: '2026-04-07'
  }
};

// ============================================
// 9. ГЕНЕРАТОР ОТТЕНКОВ И ТЕНЕЙ
// ============================================

export const tintShadeGenerator: Calculator = {
  id: 'tint-shade-generator',
  slug: 'ottenki-i-teni',
  title: 'Генератор оттенков и теней',
  description: 'Создание 10 светлее и темнее вариаций базового цвета',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'baseColor',
      label: 'Базовый цвет (HEX)',
      type: 'text',
      placeholder: '#3B82F6',
      defaultValue: '#3B82F6'
    }
  ],
  outputs: [
    { name: 'tints', label: 'Оттенки (светлее)', type: 'text' },
    { name: 'shades', label: 'Тени (темнее)', type: 'text' }
  ],
  calculate: (inputs) => {
    const baseColor = String(inputs.baseColor || '#3B82F6');
    
    const rgb = hexToRgb(baseColor);
    if (!rgb) {
      return [
        { value: 'Ошибка HEX', label: 'Оттенки', unit: '' },
        { value: 'Ошибка HEX', label: 'Тени', unit: '' }
      ];
    }
    
    // Генерация оттенков (светлее) — смешивание с белым
    const tints: string[] = [];
    for (let i = 1; i <= 10; i++) {
      const ratio = i / 10;
      const r = Math.round(rgb.r + (255 - rgb.r) * ratio);
      const g = Math.round(rgb.g + (255 - rgb.g) * ratio);
      const b = Math.round(rgb.b + (255 - rgb.b) * ratio);
      tints.push(rgbToHex(r, g, b));
    }
    
    // Генерация теней (темнее) — смешивание с чёрным
    const shades: string[] = [];
    for (let i = 1; i <= 10; i++) {
      const ratio = i / 10;
      const r = Math.round(rgb.r * (1 - ratio));
      const g = Math.round(rgb.g * (1 - ratio));
      const b = Math.round(rgb.b * (1 - ratio));
      shades.push(rgbToHex(r, g, b));
    }
    
    return [
      { value: tints.join(', '), label: 'Оттенки', unit: '' },
      { value: shades.join(', '), label: 'Тени', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите базовый цвет в формате HEX. Калькулятор создаст 10 более светлых вариаций (оттенков) и 10 более тёмных (теней).',
    about: 'Оттенок (tint) — цвет + белый, создаёт пастельные варианты. Тень (shade) — цвет + чёрный, создаёт более тёмные варианты. Тон (tone) — цвет + серый.',
    usage: 'Используется для создания палитр с разной интенсивностью: фоны, hover-состояния кнопок, градации в дизайне.',
    formula: 'Оттенок: смешивание с белым (255,255,255)\nТень: смешивание с чёрным (0,0,0)\nФормула: Color + White/Black × ratio',
    faq: [
      {
        question: 'В чём разница оттенка и тона?',
        answer: 'Оттенок (tint) — цвет + белый, светлее и менее насыщенный. Тень (shade) — цвет + чёрный, темнее. Тон (tone) — цвет + серый, приглушённый.'
      },
      {
        question: 'Зачем нужны оттенки в дизайне?',
        answer: 'Для создания визуальной иерархии, разделения зон, hover-эффектов кнопок, фонов разной интенсивности.'
      },
      {
        question: 'Что такое монохроматическая схема?',
        answer: 'Цветовая схема на основе одного цвета с разными оттенками (tints) и тенями (shades). Создаёт гармоничный, спокойный дизайн.'
      }
    ],
    sources: [
      { title: 'Теория цвета: оттенки и тени', url: 'https://ru.wikipedia.org/wiki/Теория_цвета' },
      { title: 'Monochromatic color schemes', url: 'https://www.tigercolor.com/color-lab/color-theory/color-harmonies.htm' }
    ],
    updatedAt: '2026-04-07'
  }
};

// ============================================
// 10. КОНВЕРТЕР ПРОЗРАЧНОСТИ
// ============================================

export const opacityConverter: Calculator = {
  id: 'opacity-converter',
  slug: 'konverter-prozrachnosti',
  title: 'Конвертер прозрачности',
  description: 'Преобразование процентов прозрачности в HEX-альфа и RGBA форматы',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'baseColor',
      label: 'Базовый цвет (HEX)',
      type: 'text',
      placeholder: '#FF0000',
      defaultValue: '#FF0000'
    },
    {
      name: 'opacity',
      label: 'Прозрачность (%)',
      type: 'number',
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50
    }
  ],
  outputs: [
    { name: 'hexAlpha', label: 'HEX с альфа', type: 'text' },
    { name: 'rgba', label: 'RGBA', type: 'text' },
    { name: 'alphaValue', label: 'Альфа (HEX)', type: 'text' }
  ],
  calculate: (inputs) => {
    const baseColor = String(inputs.baseColor || '#FF0000');
    const opacity = Math.max(0, Math.min(100, Number(inputs.opacity) || 50));
    
    const rgb = hexToRgb(baseColor);
    if (!rgb) {
      return [
        { value: 'Ошибка', label: 'HEX Alpha', unit: '' },
        { value: 'Ошибка', label: 'RGBA', unit: '' },
        { value: '—', label: 'Альфа', unit: '' }
      ];
    }
    
    // Конвертация процента в HEX альфа
    const alphaDecimal = opacity / 100;
    const alphaHex = Math.round(alphaDecimal * 255).toString(16).padStart(2, '0').toUpperCase();
    const hexAlpha = `${baseColor}${alphaHex}`;
    
    // RGBA формат
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alphaDecimal.toFixed(2)})`;
    
    return [
      { value: hexAlpha, label: 'HEX с альфа', unit: '' },
      { value: rgba, label: 'RGBA', unit: '' },
      { value: alphaHex, label: 'Альфа канал', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите базовый цвет в формате HEX и процент прозрачности (0-100%). Калькулятор покажет HEX с альфа-каналом и RGBA формат.',
    about: 'Альфа-канал определяет прозрачность цвета. В HEX формате добавляются 2 символа (00-FF), в RGBA — десятичное значение от 0 до 1.',
    usage: 'Используется в CSS для полупрозрачных фонов, наложений, теней. Форматы: #RRGGBBAA (HEX8) или rgba(R,G,B,A).',
    formula: 'HEX Alpha: #RRGGBBAA\n00 = полностью прозрачный\nFF = полностью непрозрачный\nRGBA: rgba(R, G, B, 0.0-1.0)',
    faq: [
      {
        question: 'Что такое альфа-канал?',
        answer: 'Дополнительный канал в цветовой модели, определяющий прозрачность. 0 или 00 = полностью прозрачный, 1 или FF = полностью непрозрачный.'
      },
      {
        question: 'Какой формат лучше: HEX8 или RGBA?',
        answer: 'HEX8 (#RRGGBBAA) — компактнее. RGBA — лучше читается человеком, особенно с десятичной альфой. Современные браузеры поддерживают оба.'
      },
      {
        question: 'Зачем нужна прозрачность?',
        answer: 'Для создания эффектов наложения, полупрозрачных фонов (glassmorphism), hover-эффектов, теней, глубины в интерфейсе.'
      }
    ],
    sources: [
      { title: 'RGBA — CSS Tricks', url: 'https://css-tricks.com/rgba-browser-support/' },
      { title: 'HEX с альфа-каналом', url: 'https://caniuse.com/css-rrggbbaa' }
    ],
    updatedAt: '2026-04-07'
  }
};

// ============================================
// ЭКСПОРТ ВСЕХ КАЛЬКУЛЯТОРОВ
// ============================================

export const colorToolsCalculators = [
  paletteGenerator,
  wcagContrastChecker,
  colorBlindnessSimulator,
  colorTemperatureCalculator,
  pantoneFinder,
  ralConverter,
  gradientGenerator,
  colorMixer,
  tintShadeGenerator,
  opacityConverter
];
