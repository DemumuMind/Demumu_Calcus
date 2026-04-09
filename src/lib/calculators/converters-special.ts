import { Calculator } from '../types';

// 1. Конвертер систем счисления
export const numberSystemConverter: Calculator = {
  id: 'number-system-converter',
  slug: 'perevod-sistem-schisleniya',
  title: 'Перевод систем счисления',
  description: 'Конвертер между двоичной, восьмеричной, десятичной и шестнадцатеричной системами',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'number',
      label: 'Число',
      type: 'text',
      placeholder: '1010'
    },
    {
      name: 'from',
      label: 'Из системы',
      type: 'select',
      options: [
        { value: '2', label: 'Двоичная (2)' },
        { value: '8', label: 'Восьмеричная (8)' },
        { value: '10', label: 'Десятичная (10)' },
        { value: '16', label: 'Шестнадцатеричная (16)' }
      ],
      defaultValue: '10'
    }
  ],
  outputs: [
    { name: 'binary', label: 'Двоичная', type: 'text' },
    { name: 'octal', label: 'Восьмеричная', type: 'text' },
    { name: 'decimal', label: 'Десятичная', type: 'text' },
    { name: 'hex', label: 'Шестнадцатеричная', type: 'text' }
  ],
  calculate: (inputs) => {
    const num = String(inputs.number).trim();
    const fromBase = parseInt(String(inputs.from), 10);
    
    if (!num) return [
      { value: '—', label: 'Двоичная' },
      { value: '—', label: 'Восьмеричная' },
      { value: '—', label: 'Десятичная' },
      { value: '—', label: 'Шестнадцатеричная' }
    ];
    
    let decimal: number;
    try {
      decimal = parseInt(num, fromBase);
      if (isNaN(decimal)) throw new Error('Invalid number');
    } catch {
      return [
        { value: 'Ошибка', label: 'Двоичная' },
        { value: 'Ошибка', label: 'Восьмеричная' },
        { value: 'Ошибка', label: 'Десятичная' },
        { value: 'Ошибка', label: 'Шестнадцатеричная' }
      ];
    }
    
    return [
      { value: decimal.toString(2), label: 'Двоичная' },
      { value: decimal.toString(8), label: 'Восьмеричная' },
      { value: decimal.toString(10), label: 'Десятичная' },
      { value: decimal.toString(16).toUpperCase(), label: 'Шестнадцатеричная' }
    ];
  },
  content: {
    howTo: 'Введите число и выберите систему счисления. Все остальные системы будут рассчитаны автоматически.',
    about: 'Конвертер систем счисления позволяет переводить числа между двоичной, восьмеричной, десятичной и шестнадцатеричной системами. Используется в программировании, информатике и электронике.',
    formula: 'Используется стандартный алгоритм перевода между системами счисления через десятичную систему.',
    faq: [
      { question: 'Что такое система счисления?', answer: 'Способ записи чисел с помощью определённого набора символов (цифр).' },
      { question: 'Где используется двоичная система?', answer: 'В компьютерах и цифровой электронике.' },
      { question: 'Что такое HEX?', answer: 'Шестнадцатеричная система (base-16), используется для записи цветов и адресов памяти.' }
    ],
    sources: [{ title: 'Системы счисления', url: 'https://ru.wikipedia.org/wiki/Система_счисления' }],
    updatedAt: '2026-04-07'
  }
};

// 2. Конвертер цветовых моделей (RGB ↔ HEX ↔ CMYK) - упрощённая версия
export const colorModelConverter: Calculator = {
  id: 'color-model-converter',
  slug: 'konverter-cvetovyh-modelej',
  title: 'Конвертер цветовых моделей',
  description: 'Перевод между RGB, HEX, CMYK, HSL и HSV',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'r',
      label: 'R (0-255)',
      type: 'number',
      placeholder: '255',
      min: 0,
      max: 255,
      defaultValue: 255
    },
    {
      name: 'g',
      label: 'G (0-255)',
      type: 'number',
      placeholder: '0',
      min: 0,
      max: 255,
      defaultValue: 0
    },
    {
      name: 'b',
      label: 'B (0-255)',
      type: 'number',
      placeholder: '0',
      min: 0,
      max: 255,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'rgb', label: 'RGB', type: 'text' },
    { name: 'hex', label: 'HEX', type: 'text' },
    { name: 'cmyk', label: 'CMYK', type: 'text' },
    { name: 'hsl', label: 'HSL', type: 'text' },
    { name: 'hsv', label: 'HSV', type: 'text' }
  ],
  calculate: (inputs) => {
    const r = Math.min(255, Math.max(0, Number(inputs.r) || 0));
    const g = Math.min(255, Math.max(0, Number(inputs.g) || 0));
    const b = Math.min(255, Math.max(0, Number(inputs.b) || 0));
    
    // RGB to HEX
    const toHex = (n: number) => Math.min(255, Math.max(0, n)).toString(16).padStart(2, '0').toUpperCase();
    const hexResult = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    
    // RGB to CMYK
    const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
    const kVal = 1 - Math.max(rNorm, gNorm, bNorm);
    const cVal = kVal === 1 ? 0 : (1 - rNorm - kVal) / (1 - kVal);
    const mVal = kVal === 1 ? 0 : (1 - gNorm - kVal) / (1 - kVal);
    const yVal = kVal === 1 ? 0 : (1 - bNorm - kVal) / (1 - kVal);
    
    const cmykResult = `C:${Math.round(cVal * 100)}% M:${Math.round(mVal * 100)}% Y:${Math.round(yVal * 100)}% K:${Math.round(kVal * 100)}%`;
    
    // RGB to HSL
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const l = (max + min) / 2;
    let h = 0, s = 0;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6; break;
        case gNorm: h = ((bNorm - rNorm) / d + 2) / 6; break;
        case bNorm: h = ((rNorm - gNorm) / d + 4) / 6; break;
      }
    }
    
    const hslResult = `H:${Math.round(h * 360)}° S:${Math.round(s * 100)}% L:${Math.round(l * 100)}%`;
    
    // RGB to HSV
    const v = max;
    const sV = max === 0 ? 0 : (max - min) / max;
    const hsvResult = `H:${Math.round(h * 360)}° S:${Math.round(sV * 100)}% V:${Math.round(v * 100)}%`;
    
    return [
      { value: `rgb(${r}, ${g}, ${b})`, label: 'RGB' },
      { value: hexResult, label: 'HEX' },
      { value: cmykResult, label: 'CMYK' },
      { value: hslResult, label: 'HSL' },
      { value: hsvResult, label: 'HSV' }
    ];
  },
  content: {
    howTo: 'Введите значения RGB (0-255) для красного, зелёного и синего каналов. Все остальные форматы будут рассчитаны автоматически.',
    about: 'Конвертер цветовых моделей переводит цвета между RGB, HEX, CMYK, HSL и HSV. Используется в веб-дизайне, полиграфии и фотографии.',
    formula: 'Математические преобразования между цветовыми моделями с учётом особенностей каждой системы.',
    faq: [
      { question: 'Что такое RGB?', answer: 'Red-Green-Blue — аддитивная цветовая модель для экранов.' },
      { question: 'Что такое CMYK?', answer: 'Cyan-Magenta-Yellow-Key — субтрактивная модель для печати.' },
      { question: 'Что такое HEX?', answer: 'Шестнадцатеричное представление RGB для веб-дизайна.' }
    ],
    sources: [{ title: 'Цветовые модели', url: 'https://ru.wikipedia.org/wiki/Цветовая_модель' }],
    updatedAt: '2026-04-07'
  }
};

// 3. Конвертер угловых координат
export const angleConverter: Calculator = {
  id: 'angle-advanced-converter',
  slug: 'konverter-uglov',
  title: 'Конвертер углов',
  description: 'Перевод между градусами, радианами, градами и другими угловыми единицами',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '90',
      defaultValue: 90
    },
    {
      name: 'from',
      label: 'Из единицы',
      type: 'select',
      options: [
        { value: 'deg', label: 'Градусы (°)' },
        { value: 'rad', label: 'Радианы (rad)' },
        { value: 'grad', label: 'Грады (gon)' },
        { value: 'turn', label: 'Обороты' },
        { value: 'minute', label: 'Угловые минуты' },
        { value: 'second', label: 'Угловые секунды' }
      ],
      defaultValue: 'deg'
    }
  ],
  outputs: [
    { name: 'deg', label: 'Градусы', type: 'text' },
    { name: 'rad', label: 'Радианы', type: 'text' },
    { name: 'grad', label: 'Грады', type: 'text' },
    { name: 'turn', label: 'Обороты', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    
    if (!value && value !== 0) return [
      { value: '—', label: 'Градусы' },
      { value: '—', label: 'Радианы' },
      { value: '—', label: 'Грады' },
      { value: '—', label: 'Обороты' }
    ];
    
    // Convert to degrees first
    let degrees = 0;
    switch (from) {
      case 'deg': degrees = value; break;
      case 'rad': degrees = value * 180 / Math.PI; break;
      case 'grad': degrees = value * 0.9; break;
      case 'turn': degrees = value * 360; break;
      case 'minute': degrees = value / 60; break;
      case 'second': degrees = value / 3600; break;
    }
    
    return [
      { value: `${Math.round(degrees * 10000) / 10000}°`, label: 'Градусы' },
      { value: `${Math.round(degrees * Math.PI / 180 * 10000) / 10000} rad`, label: 'Радианы' },
      { value: `${Math.round(degrees / 0.9 * 10000) / 10000} gon`, label: 'Грады' },
      { value: `${Math.round(degrees / 360 * 10000) / 10000} turn`, label: 'Обороты' }
    ];
  },
  content: {
    howTo: 'Введите значение угла и выберите текущую единицу измерения. Все остальные единицы будут рассчитаны автоматически.',
    about: 'Конвертер углов позволяет переводить между различными единицами измерения углов. Используется в математике, физике, геодезии и навигации.',
    formula: '1 радиан = 180/π градусов ≈ 57.2958°, 1 град = 0.9°, 1 оборот = 360°',
    faq: [
      { question: 'Что такое радиан?', answer: 'Угол, соответствующий дуге, длина которой равна радиусу окружности.' },
      { question: 'Сколько градусов в радиане?', answer: '1 радиан ≈ 57.2958°' },
      { question: 'Где используются грады?', answer: 'В геодезии и военной топографии.' }
    ],
    sources: [{ title: 'Углы', url: 'https://ru.wikipedia.org/wiki/Угол' }],
    updatedAt: '2026-04-07'
  }
};

// 4. Конвертер типографики
export const typographyConverter: Calculator = {
  id: 'typography-converter',
  slug: 'konverter-shriftov',
  title: 'Конвертер типографики',
  description: 'Перевод между pt, px, em, rem, % и другими единицами шрифтов',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '16',
      defaultValue: 16
    },
    {
      name: 'from',
      label: 'Из единицы',
      type: 'select',
      options: [
        { value: 'px', label: 'Пиксели (px)' },
        { value: 'pt', label: 'Пункты (pt)' },
        { value: 'em', label: 'EM (em)' },
        { value: 'rem', label: 'REM (rem)' },
        { value: 'percent', label: 'Проценты (%)' },
        { value: 'mm', label: 'Миллиметры (mm)' },
        { value: 'cm', label: 'Сантиметры (cm)' },
        { value: 'inch', label: 'Дюймы (in)' }
      ],
      defaultValue: 'px'
    },
    {
      name: 'baseSize',
      label: 'Базовый размер шрифта (px)',
      type: 'number',
      placeholder: '16',
      defaultValue: 16,
      min: 1,
      max: 100
    }
  ],
  outputs: [
    { name: 'px', label: 'Пиксели (px)', type: 'text' },
    { name: 'pt', label: 'Пункты (pt)', type: 'text' },
    { name: 'em', label: 'EM', type: 'text' },
    { name: 'rem', label: 'REM', type: 'text' },
    { name: 'percent', label: 'Проценты', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const baseSize = Number(inputs.baseSize) || 16;
    
    if (!value) return [
      { value: '—', label: 'Пиксели (px)' },
      { value: '—', label: 'Пункты (pt)' },
      { value: '—', label: 'EM' },
      { value: '—', label: 'REM' },
      { value: '—', label: 'Проценты' }
    ];
    
    // Convert to pixels first
    let pixels = 0;
    switch (from) {
      case 'px': pixels = value; break;
      case 'pt': pixels = value * 1.333333; break;
      case 'em': pixels = value * baseSize; break;
      case 'rem': pixels = value * baseSize; break;
      case 'percent': pixels = value * baseSize / 100; break;
      case 'mm': pixels = value * 3.779528; break;
      case 'cm': pixels = value * 37.79528; break;
      case 'inch': pixels = value * 96; break;
    }
    
    return [
      { value: `${Math.round(pixels * 100) / 100}px`, label: 'Пиксели (px)' },
      { value: `${Math.round(pixels / 1.333333 * 100) / 100}pt`, label: 'Пункты (pt)' },
      { value: `${Math.round(pixels / baseSize * 1000) / 1000}em`, label: 'EM' },
      { value: `${Math.round(pixels / baseSize * 1000) / 1000}rem`, label: 'REM' },
      { value: `${Math.round(pixels / baseSize * 100)}%`, label: 'Проценты' }
    ];
  },
  content: {
    howTo: 'Введите значение, выберите единицу измерения и укажите базовый размер шрифта (обычно 16px).',
    about: 'Конвертер типографики позволяет переводить размеры шрифтов между различными единицами. Используется в веб-разработке и дизайне.',
    formula: '1pt = 1.333px (при 96 DPI), em/rem зависят от базового размера шрифта.',
    faq: [
      { question: 'Что такое px?', answer: 'Пиксель — базовая единица для экранов.' },
      { question: 'Что такое em?', answer: 'Относительная единица, зависит от размера шрифта родителя.' },
      { question: 'Что такое rem?', answer: 'Root em — относительная единица, зависит от размера шрифта корневого элемента.' }
    ],
    sources: [{ title: 'CSS единицы', url: 'https://developer.mozilla.org/ru/docs/Learn/CSS/Building_blocks/Values_and_units' }],
    updatedAt: '2026-04-07'
  }
};

// 5. Конвертер pH
export const phConverter: Calculator = {
  id: 'ph-converter',
  slug: 'konverter-ph',
  title: 'Конвертер pH',
  description: 'Перевод pH в концентрацию ионов водорода и определение характера среды',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'ph',
      label: 'pH значение',
      type: 'number',
      placeholder: '7.0',
      min: 0,
      max: 14,
      step: 0.1,
      defaultValue: 7.0
    }
  ],
  outputs: [
    { name: 'concentration', label: '[H+] моль/л', type: 'text' },
    { name: 'description', label: 'Характер среды', type: 'text' },
    { name: 'examples', label: 'Примеры', type: 'text' }
  ],
  calculate: (inputs) => {
    const ph = Number(inputs.ph);
    
    if (ph === undefined || ph === null || isNaN(ph)) return [
      { value: '—', label: '[H+] моль/л' },
      { value: '—', label: 'Характер среды' },
      { value: '—', label: 'Примеры' }
    ];
    
    const concentration = Math.pow(10, -ph);
    
    let description = '';
    let examples = '';
    
    if (ph < 3) {
      description = 'Сильнокислая среда';
      examples = 'Желудочный сок (pH 1-2), лимонная кислота';
    } else if (ph < 5) {
      description = 'Слабокислая среда';
      examples = 'Кофе (pH 5), чернослив';
    } else if (ph < 6.5) {
      description = 'Слабокислая среда';
      examples = 'Молоко (pH 6.5), моча';
    } else if (ph >= 6.5 && ph <= 7.5) {
      description = 'Нейтральная среда';
      examples = 'Чистая вода (pH 7), кровь (pH 7.35-7.45)';
    } else if (ph < 9) {
      description = 'Слабощелочная среда';
      examples = 'Морская вода (pH 8), пищевая сода';
    } else if (ph < 11) {
      description = 'Щелочная среда';
      examples = 'Моющие средства, аммиак';
    } else {
      description = 'Сильнощелочная среда';
      examples = 'Сода кальцинированная, щёлочь';
    }
    
    return [
      { value: concentration < 0.001 ? concentration.toExponential(2) : concentration.toFixed(6), label: '[H+] моль/л' },
      { value: description, label: 'Характер среды' },
      { value: examples, label: 'Примеры' }
    ];
  },
  content: {
    howTo: 'Введите значение pH от 0 до 14. pH 7 — нейтральная среда, ниже 7 — кислая, выше 7 — щелочная.',
    about: 'pH (водородный показатель) — мера кислотности или щёлочности водного раствора. Используется в химии, биологии, медицине и экологии.',
    formula: 'pH = -log[H+], где [H+] — концентрация ионов водорода в моль/л.',
    faq: [
      { question: 'Что такое pH?', answer: 'Водородный показатель — мера кислотности раствора.' },
      { question: 'Какой pH у крови?', answer: 'pH крови составляет 7.35-7.45 (слабощелочная среда).' },
      { question: 'Что такое нейтральная среда?', answer: 'Среда с pH = 7, где концентрация H+ и OH- равны.' }
    ],
    sources: [{ title: 'pH', url: 'https://ru.wikipedia.org/wiki/Водородный_показатель' }],
    updatedAt: '2026-04-07'
  }
};

// 6. Конвертер шкал крепости алкоголя
export const alcoholStrengthConverter: Calculator = {
  id: 'alcohol-strength-converter',
  slug: 'konverter-kreposti',
  title: 'Конвертер крепости алкоголя',
  description: 'Перевод между градусами (°), ABV, Proof и другими шкалами',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '40',
      defaultValue: 40
    },
    {
      name: 'from',
      label: 'Из шкалы',
      type: 'select',
      options: [
        { value: 'abv', label: 'ABV (об.%)' },
        { value: 'proof_us', label: 'Proof (US)' },
        { value: 'proof_uk', label: 'Proof (UK)' },
        { value: 'degrees', label: 'Градусы (°)' }
      ],
      defaultValue: 'abv'
    }
  ],
  outputs: [
    { name: 'abv', label: 'ABV (об.% по объёму)', type: 'text' },
    { name: 'proof_us', label: 'Proof (американский)', type: 'text' },
    { name: 'proof_uk', label: 'Proof (британский)', type: 'text' },
    { name: 'degrees', label: 'Градусы (°)', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    
    if (!value) return [
      { value: '—', label: 'ABV (об.% по объёму)' },
      { value: '—', label: 'Proof (американский)' },
      { value: '—', label: 'Proof (британский)' },
      { value: '—', label: 'Градусы (°)' }
    ];
    
    // Convert to ABV first
    let abv = 0;
    switch (from) {
      case 'abv': abv = value; break;
      case 'proof_us': abv = value / 2; break;
      case 'proof_uk': abv = value * 0.5706; break;
      case 'degrees': abv = value; break;
    }
    
    return [
      { value: `${Math.round(abv * 10) / 10}%`, label: 'ABV (об.% по объёму)' },
      { value: `${Math.round(abv * 2 * 10) / 10}`, label: 'Proof (американский)' },
      { value: `${Math.round(abv / 0.5706 * 10) / 10}`, label: 'Proof (британский)' },
      { value: `${Math.round(abv * 10) / 10}°`, label: 'Градусы (°)' }
    ];
  },
  content: {
    howTo: 'Введите значение крепости и выберите шкалу. ABV — стандартная международная шкала (объёмные проценты).',
    about: 'Конвертер крепости алкоголя переводит между различными шкалами измерения содержания алкоголя. Используется в производстве напитков и торговле.',
    formula: 'US Proof = ABV × 2, UK Proof = ABV × 1.75, 1° = 1% ABV',
    faq: [
      { question: 'Что такое ABV?', answer: 'Alcohol by Volume — объёмная доля алкоголя в процентах.' },
      { question: 'Что такое Proof?', answer: 'Историческая шкала, в США Proof = 2 × ABV, в UK Proof = 1.75 × ABV.' },
      { question: 'Сколько градусов у водки?', answer: 'Стандартная крепость водки — 40° (40% ABV).' }
    ],
    sources: [{ title: 'Алкогольные градусы', url: 'https://ru.wikipedia.org/wiki/Алкогольные_градусы' }],
    updatedAt: '2026-04-07'
  }
};

// 7. Конвертер твёрдости материалов
export const hardnessConverter: Calculator = {
  id: 'hardness-converter',
  slug: 'konverter-tverdosti',
  title: 'Конвертер твёрдости',
  description: 'Перевод между шкалами Мооса, Бриннеля, Роквелла, Виккерса',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение твёрдости',
      type: 'number',
      placeholder: '200',
      defaultValue: 200
    },
    {
      name: 'scale',
      label: 'Шкала',
      type: 'select',
      options: [
        { value: 'hb', label: 'HB (Бриннель)' },
        { value: 'hrc', label: 'HRC (Роквелл)' },
        { value: 'hv', label: 'HV (Виккерс)' },
        { value: 'hs', label: 'HS (Шор)' }
      ],
      defaultValue: 'hb'
    }
  ],
  outputs: [
    { name: 'hb', label: 'HB (Бриннель)', type: 'text' },
    { name: 'hrc', label: 'HRC (Роквелл)', type: 'text' },
    { name: 'hv', label: 'HV (Виккерс)', type: 'text' },
    { name: 'tensile', label: 'Примерная прочность (MPa)', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const scale = String(inputs.scale);
    
    if (!value) return [
      { value: '—', label: 'HB (Бриннель)' },
      { value: '—', label: 'HRC (Роквелл)' },
      { value: '—', label: 'HV (Виккерс)' },
      { value: '—', label: 'Примерная прочность (MPa)' }
    ];
    
    // Approximate conversion formulas
    let hb = 0, hrc = 0, hv = 0;
    
    switch (scale) {
      case 'hb':
        hb = value;
        hrc = Math.max(0, Math.min(70, -13.6 + 0.094 * hb - 0.0000077 * hb * hb));
        hv = Math.round(hb * 1.05);
        break;
      case 'hrc':
        hrc = value;
        hb = Math.round((hrc + 13.6) / 0.094);
        hv = Math.round(hb * 1.05);
        break;
      case 'hv':
        hv = value;
        hb = Math.round(hv / 1.05);
        hrc = Math.max(0, Math.min(70, -13.6 + 0.094 * hb - 0.0000077 * hb * hb));
        break;
      case 'hs':
        // Шор scale conversion (approximate for steel)
        const sh = value;
        hb = Math.round(0.56 * sh);
        hrc = Math.max(0, Math.min(70, -13.6 + 0.094 * hb - 0.0000077 * hb * hb));
        hv = Math.round(hb * 1.05);
        break;
    }
    
    // Approximate tensile strength
    const tensile = Math.round(hb * 3.45);
    
    return [
      { value: `${Math.round(hb)}`, label: 'HB (Бриннель)' },
      { value: `${Math.round(hrc * 10) / 10}`, label: 'HRC (Роквелл)' },
      { value: `${Math.round(hv)}`, label: 'HV (Виккерс)' },
      { value: `${tensile} MPa`, label: 'Примерная прочность (MPa)' }
    ];
  },
  content: {
    howTo: 'Введите значение твёрдости по одной из шкал. Конвертация приблизительная и зависит от материала.',
    about: 'Твёрдость материала — способность сопротивляться локальному пластическому деформированию. Используется в металлургии и материаловедении.',
    formula: 'HB ≈ HV × 0.95, HRC ≈ -13.6 + 0.094×HB (приближённые формулы)',
    faq: [
      { question: 'Что такое шкала Бриннеля?', answer: 'Метод измерения твёрдости с помощью стального шарика.' },
      { question: 'Что такое HRC?', answer: 'Rockwell C — шкала для твёрдых материалов (сталь, закалённые сплавы).' },
      { question: 'Что такое шкала Виккерса?', answer: 'Метод с алмазной пирамидой, универсальный для всех материалов.' }
    ],
    sources: [{ title: 'Твёрдость материалов', url: 'https://ru.wikipedia.org/wiki/Твёрдость' }],
    updatedAt: '2026-04-07'
  }
};

// 8. Конвертер концентрации растворов
export const solutionConcentrationConverter: Calculator = {
  id: 'solution-concentration',
  slug: 'konverter-koncentracii',
  title: 'Конвертер концентрации растворов',
  description: 'Перевод между массовой долей, мольной долей, моляльностью и молярностью',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'massSolute',
      label: 'Масса растворённого вещества (г)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10
    },
    {
      name: 'molarMass',
      label: 'Молярная масса (г/моль)',
      type: 'number',
      placeholder: '58.44',
      defaultValue: 58.44
    },
    {
      name: 'massSolution',
      label: 'Масса раствора (г)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'volumeSolution',
      label: 'Объём раствора (мл)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    }
  ],
  outputs: [
    { name: 'massPercent', label: 'Массовая доля (%)', type: 'text' },
    { name: 'molarity', label: 'Молярность (моль/л)', type: 'text' },
    { name: 'molality', label: 'Моляльность (моль/кг)', type: 'text' },
    { name: 'moleFraction', label: 'Мольная доля', type: 'text' }
  ],
  calculate: (inputs) => {
    const massSolute = Number(inputs.massSolute);
    const molarMass = Number(inputs.molarMass);
    const massSolution = Number(inputs.massSolution);
    const volumeSolution = Number(inputs.volumeSolution) / 1000; // Convert to liters
    
    if (!massSolute || !molarMass || !massSolution || !volumeSolution) return [
      { value: '—', label: 'Массовая доля (%)' },
      { value: '—', label: 'Молярность (моль/л)' },
      { value: '—', label: 'Моляльность (моль/кг)' },
      { value: '—', label: 'Мольная доля' }
    ];
    
    const moles = massSolute / molarMass;
    const massPercent = (massSolute / massSolution) * 100;
    const molarity = moles / volumeSolution;
    const massSolvent = massSolution - massSolute;
    const molality = massSolvent > 0 ? (moles / (massSolvent / 1000)) : 0;
    
    // Assuming water as solvent with molar mass ~18 g/mol
    const molesSolvent = massSolvent / 18.015;
    const moleFraction = moles / (moles + molesSolvent);
    
    return [
      { value: `${Math.round(massPercent * 100) / 100}%`, label: 'Массовая доля (%)' },
      { value: `${Math.round(molarity * 1000) / 1000} моль/л`, label: 'Молярность (моль/л)' },
      { value: `${Math.round(molality * 1000) / 1000} моль/кг`, label: 'Моляльность (моль/кг)' },
      { value: `${Math.round(moleFraction * 100000) / 100000}`, label: 'Мольная доля' }
    ];
  },
  content: {
    howTo: 'Введите массу вещества, его молярную массу (можно найти в таблице Менделеева), массу и объём раствора.',
    about: 'Конвертер концентрации растворов позволяет переводить между различными способами выражения концентрации. Используется в химии, фармакологии и пищевой промышленности.',
    formula: 'Молярность = моль/л, Моляльность = моль/кг растворителя, Массовая доля = масса вещества / масса раствора',
    faq: [
      { question: 'Что такое молярность?', answer: 'Количество молей вещества на литр раствора (моль/л).' },
      { question: 'Что такое моляльность?', answer: 'Количество молей вещества на килограмм растворителя.' },
      { question: 'Чем отличаются массовая и мольная доли?', answer: 'Массовая доля — отношение масс, мольная — отношение количества вещества.' }
    ],
    sources: [{ title: 'Концентрация растворов', url: 'https://ru.wikipedia.org/wiki/Концентрация' }],
    updatedAt: '2026-04-07'
  }
};

// Экспорт всех специальных конвертеров
export const specialConverters: Calculator[] = [
  numberSystemConverter,
  colorModelConverter,
  angleConverter,
  typographyConverter,
  phConverter,
  alcoholStrengthConverter,
  hardnessConverter,
  solutionConcentrationConverter
];
