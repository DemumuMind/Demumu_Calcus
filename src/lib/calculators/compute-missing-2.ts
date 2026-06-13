import type { ComputeFn } from './compute-helpers';

type RGB = [number, number, number];

type HSL = [number, number, number];

type HSV = [number, number, number];

type CMYK = [number, number, number, number];

const DASH = '\u2014';

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

const fmtNum = (n: number, digits: number = 4): string => {
  let s = n.toFixed(digits);
  if (s.includes('.')) {
    s = s.replace(/\.?0+$/, '');
  }
  return s;
};

const parseHex = (hex: any): RGB | null => {
  const s = String(hex ?? '').trim().replace(/^#/, '');
  if (!s) return null;
  const full = s.length === 3 ? s.split('').map((c) => c + c).join('') : s;
  if (full.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b]
    .map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
};

const rgbToHsl = (r: number, g: number, b: number): HSL => {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r1) {
      h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
    } else if (max === g1) {
      h = (b1 - r1) / d + 2;
    } else {
      h = (r1 - g1) / d + 4;
    }
    h /= 6;
  }
  return [
    Math.round(h * 360),
    Math.round(s * 1000) / 10,
    Math.round(l * 1000) / 10,
  ];
};

const hslToRgb = (h: number, s: number, l: number): RGB => {
  const s1 = clamp(s, 0, 100) / 100;
  const l1 = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * l1 - 1)) * s1;
  const h1 = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs(h1 % 2 - 1));
  const m = l1 - c / 2;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (h1 < 1) {
    r1 = c; g1 = x; b1 = 0;
  } else if (h1 < 2) {
    r1 = x; g1 = c; b1 = 0;
  } else if (h1 < 3) {
    r1 = 0; g1 = c; b1 = x;
  } else if (h1 < 4) {
    r1 = 0; g1 = x; b1 = c;
  } else if (h1 < 5) {
    r1 = x; g1 = 0; b1 = c;
  } else {
    r1 = c; g1 = 0; b1 = x;
  }
  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255),
  ];
};

const hsvToRgb = (h: number, s: number, v: number): RGB => {
  const s1 = clamp(s, 0, 100) / 100;
  const v1 = clamp(v, 0, 100) / 100;
  const c = v1 * s1;
  const h1 = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs(h1 % 2 - 1));
  const m = v1 - c;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (h1 < 1) {
    r1 = c; g1 = x; b1 = 0;
  } else if (h1 < 2) {
    r1 = x; g1 = c; b1 = 0;
  } else if (h1 < 3) {
    r1 = 0; g1 = c; b1 = x;
  } else if (h1 < 4) {
    r1 = 0; g1 = x; b1 = c;
  } else if (h1 < 5) {
    r1 = x; g1 = 0; b1 = c;
  } else {
    r1 = c; g1 = 0; b1 = x;
  }
  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255),
  ];
};

const rgbToCmyk = (r: number, g: number, b: number): CMYK => {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const k = 1 - Math.max(r1, g1, b1);
  let c = 0;
  let m = 0;
  let y = 0;
  if (k !== 1) {
    c = (1 - r1 - k) / (1 - k);
    m = (1 - g1 - k) / (1 - k);
    y = (1 - b1 - k) / (1 - k);
  }
  return [
    Math.round(c * 1000) / 10,
    Math.round(m * 1000) / 10,
    Math.round(y * 1000) / 10,
    Math.round(k * 1000) / 10,
  ];
};

const cmykToRgb = (c: number, m: number, y: number, k: number): RGB => {
  const c1 = clamp(c, 0, 100) / 100;
  const m1 = clamp(m, 0, 100) / 100;
  const y1 = clamp(y, 0, 100) / 100;
  const k1 = clamp(k, 0, 100) / 100;
  return [
    Math.round(255 * (1 - c1) * (1 - k1)),
    Math.round(255 * (1 - m1) * (1 - k1)),
    Math.round(255 * (1 - y1) * (1 - k1)),
  ];
};

const pxFromUnit = (value: number, from: string, base: number): number | null => {
  switch (from) {
    case 'px':
      return value;
    case 'pt':
      return value * 4 / 3;
    case 'em':
      return value * base;
    case 'rem':
      return value * base;
    case 'percent':
      return value * base / 100;
    case 'mm':
      return value * 96 / 25.4;
    case 'cm':
      return value * 96 / 2.54;
    case 'inch':
    case 'in':
      return value * 96;
    default:
      return null;
  }
};

const isValidNumber = (n: any): n is number => typeof n === 'number' && isFinite(n);

export const computeMap_missing_2: Record<string, ComputeFn> = {
  'hex-v-rgb': (inputs) => {
    const rgb = parseHex(inputs.hex);
    if (!rgb) return [{ value: DASH, label: 'RGB' }];
    return [{ value: `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`, label: 'RGB' }];
  },

  'hex-v-hsl': (inputs) => {
    const rgb = parseHex(inputs.hex);
    if (!rgb) return [{ value: DASH, label: 'HSL' }];
    const [h, s, l] = rgbToHsl(...rgb);
    return [{ value: `HSL(${h}, ${fmtNum(s, 1)}%, ${fmtNum(l, 1)}%)`, label: 'HSL' }];
  },

  'hsl-v-hex': (inputs) => {
    const h = Number(inputs.h) || 0;
    const s = Number(inputs.s) || 0;
    const l = Number(inputs.l) || 0;
    if (!isValidNumber(h) || !isValidNumber(s) || !isValidNumber(l)) {
      return [{ value: DASH, label: 'HEX' }];
    }
    const rgb = hslToRgb(h, s, l);
    return [{ value: rgbToHex(...rgb), label: 'HEX' }];
  },

  'hsv-v-rgb': (inputs) => {
    const h = Number(inputs.h) || 0;
    const s = Number(inputs.s) || 0;
    const v = Number(inputs.v) || 0;
    if (!isValidNumber(h) || !isValidNumber(s) || !isValidNumber(v)) {
      return [{ value: DASH, label: 'RGB' }];
    }
    const rgb = hsvToRgb(h, s, v);
    return [{ value: `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`, label: 'RGB' }];
  },

  'konverter-cvetovyh-modelej': (inputs) => {
    const format = String(inputs.inputFormat || 'rgb');
    let rgb: RGB | null = null;

    if (format === 'rgb') {
      const r = Number(inputs.r) || 0;
      const g = Number(inputs.g) || 0;
      const b = Number(inputs.b) || 0;
      if (isValidNumber(r) && isValidNumber(g) && isValidNumber(b)) {
        rgb = [clamp(r, 0, 255), clamp(g, 0, 255), clamp(b, 0, 255)];
      }
    } else if (format === 'hex') {
      rgb = parseHex(inputs.hexInput);
    } else if (format === 'hsl') {
      const h = Number(inputs.hslH) || 0;
      const s = Number(inputs.hslS) || 0;
      const l = Number(inputs.hslL) || 0;
      if (isValidNumber(h) && isValidNumber(s) && isValidNumber(l)) {
        rgb = hslToRgb(h, s, l);
      }
    } else if (format === 'cmyk') {
      const c = Number(inputs.c) || 0;
      const m = Number(inputs.m) || 0;
      const y = Number(inputs.y) || 0;
      const k = Number(inputs.k) || 0;
      if (isValidNumber(c) && isValidNumber(m) && isValidNumber(y) && isValidNumber(k)) {
        rgb = cmykToRgb(c, m, y, k);
      }
    }

    if (!rgb) {
      return [
        { value: DASH, label: 'HEX' },
        { value: DASH, label: 'RGB' },
        { value: DASH, label: 'HSL' },
        { value: DASH, label: 'CMYK' },
      ];
    }

    const hex = rgbToHex(...rgb);
    const hsl = rgbToHsl(...rgb);
    const cmyk = rgbToCmyk(...rgb);

    return [
      { value: hex, label: 'HEX' },
      { value: `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`, label: 'RGB' },
      { value: `HSL(${hsl[0]}, ${fmtNum(hsl[1], 1)}%, ${fmtNum(hsl[2], 1)}%)`, label: 'HSL' },
      { value: `CMYK(${fmtNum(cmyk[0], 1)}%, ${fmtNum(cmyk[1], 1)}%, ${fmtNum(cmyk[2], 1)}%, ${fmtNum(cmyk[3], 1)}%)`, label: 'CMYK' },
    ];
  },

  'konverter-shriftov': (inputs) => {
    const value = Number(inputs.value) || 0;
    const base = Number(inputs.baseSize) || 16;
    const from = String(inputs.from || 'px');
    if (!isValidNumber(value) || !isValidNumber(base) || base <= 0) {
      return [
        { value: DASH, label: 'Пиксели (px)' },
        { value: DASH, label: 'Пункты (pt)' },
        { value: DASH, label: 'EM' },
        { value: DASH, label: 'REM' },
        { value: DASH, label: 'Проценты' },
      ];
    }
    const px = pxFromUnit(value, from, base);
    if (px === null) {
      return [
        { value: DASH, label: 'Пиксели (px)' },
        { value: DASH, label: 'Пункты (pt)' },
        { value: DASH, label: 'EM' },
        { value: DASH, label: 'REM' },
        { value: DASH, label: 'Проценты' },
      ];
    }
    const pt = px * 3 / 4;
    const em = px / base;
    const rem = em;
    const percent = em * 100;
    return [
      { value: fmtNum(px, 4), label: 'Пиксели (px)', unit: 'px' },
      { value: fmtNum(pt, 4), label: 'Пункты (pt)', unit: 'pt' },
      { value: fmtNum(em, 4), label: 'EM', unit: 'em' },
      { value: fmtNum(rem, 4), label: 'REM', unit: 'rem' },
      { value: fmtNum(percent, 4), label: 'Проценты', unit: '%' },
    ];
  },

  'perevod-sistem-schisleniya': (inputs) => {
    const base = Number(inputs.from) || 0;
    const numStr = String(inputs.number ?? '');
    if (![2, 8, 10, 16].includes(base)) {
      return [
        { value: DASH, label: 'Двоичная' },
        { value: DASH, label: 'Восьмеричная' },
        { value: DASH, label: 'Десятичная' },
        { value: DASH, label: 'Шестнадцатеричная' },
      ];
    }
    const decimal = parseInt(numStr, base);
    if (!isValidNumber(decimal)) {
      return [
        { value: DASH, label: 'Двоичная' },
        { value: DASH, label: 'Восьмеричная' },
        { value: DASH, label: 'Десятичная' },
        { value: DASH, label: 'Шестнадцатеричная' },
      ];
    }
    return [
      { value: decimal.toString(2), label: 'Двоичная' },
      { value: decimal.toString(8), label: 'Восьмеричная' },
      { value: decimal.toString(10), label: 'Десятичная' },
      { value: decimal.toString(16).toUpperCase(), label: 'Шестнадцатеричная' },
    ];
  },
};
