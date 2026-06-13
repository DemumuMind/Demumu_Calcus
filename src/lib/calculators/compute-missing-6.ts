import type { ComputeFn } from './compute-helpers';
import { awg2mm, fmtResult } from './compute-helpers';
import { getCryptoRateInfo } from '@/lib/cryptoRates';

const cityOffsets: Record<string, number> = {
  moscow: 3, москва: 3, 'moscow-utc': 3,
  'new-york': -5, 'new_york': -5, 'newyork': -5, 'нью-йорк': -5, 'нью_йорк': -5,
  london: 0, лондон: 0,
  tokyo: 9, токио: 9,
  dubai: 4, дубай: 4,
  sydney: 11, сидней: 11,
  beijing: 8, peking: 8, пекин: 8,
  berlin: 1, берлин: 1,
  paris: 1, париж: 1,
  'los-angeles': -8, 'los_angeles': -8, losangeles: -8, 'лос-анджелес': -8, 'лос_анджелес': -8,
};

function getCityOffset(city: string): number | null {
  const c = String(city).toLowerCase().trim();
  const direct = cityOffsets[c];
  if (direct !== undefined) return direct;
  const num = Number(c);
  if (!isNaN(num) && c !== '') return num;
  return null;
}

function convertTime(time: string, offsetFrom: number, offsetTo: number): { convertedTime: string; timeDiff: string; dayOffset: string } {
  const parts = String(time).split(':');
  if (parts.length !== 2) {
    return { convertedTime: 'Некорректный формат', timeDiff: '', dayOffset: '' };
  }
  let h = parseInt(parts[0], 10) - offsetFrom + offsetTo;
  const m = parseInt(parts[1], 10);
  if (isNaN(h) || isNaN(m) || m < 0 || m > 59) {
    return { convertedTime: 'Некорректное время', timeDiff: '', dayOffset: '' };
  }
  let dayShift = 0;
  if (h >= 24) {
    h -= 24;
    dayShift = 1;
  }
  if (h < 0) {
    h += 24;
    dayShift = -1;
  }
  const diff = offsetTo - offsetFrom;
  const diffText = diff > 0 ? `+${diff} ч` : diff < 0 ? `${diff} ч` : '0 ч';
  const dayOffset = dayShift === 0 ? 'тот же день' : dayShift > 0 ? 'следующий день' : 'предыдущий день';
  return {
    convertedTime: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
    timeDiff: diffText,
    dayOffset,
  };
}

const ingredientDensity: Record<string, number> = {
  water: 1, вода: 1,
  milk: 1.03, молоко: 1.03,
  flour: 0.53, мука: 0.53,
  sugar: 0.85, сахар: 0.85,
  salt: 1.2, соль: 1.2,
  oil_vegetable: 0.92, 'растительное-масло': 0.92, 'масло-раст': 0.92, 'масло-растительное': 0.92,
  oil_butter: 0.91, 'сливочное-масло': 0.91, 'масло-слив': 0.91, 'масло-сливочное': 0.91,
  rice: 0.85, рис: 0.85,
  honey: 1.42, мед: 1.42, мёд: 1.42,
  sourcream: 1.0, сметана: 1.0,
  kefir: 1.03, кефир: 1.03,
  cocoa: 0.52, какао: 0.52,
};

function getDensity(key: string): number {
  const k = String(key).toLowerCase().trim();
  return ingredientDensity[k] ?? 1;
}

const massUnits: Record<string, number> = {
  g: 1, г: 1,
  kg: 1000, кг: 1000,
  mg: 0.001, мг: 0.001,
  oz: 28.3495, унция: 28.3495, 'oz-t': 31.1035,
};

const volumeUnits: Record<string, number> = {
  ml: 1, мл: 1,
  l: 1000, л: 1000,
  cup: 250, стакан: 250, 'cup-us': 237,
  tbsp: 15, 'ст-л': 15, 'ст.л.': 15, 'столовая-ложка': 15,
  tsp: 5, 'ч-л': 5, 'ч.л.': 5, 'чайная-ложка': 5,
  oz: 29.57, унция: 29.57,
};

function unitToGrams(value: number, unit: string, density: number): number {
  const u = String(unit).toLowerCase().trim();
  if (massUnits[u] !== undefined) return value * massUnits[u];
  if (volumeUnits[u] !== undefined) return value * volumeUnits[u] * density;
  return value;
}

function gramsToUnit(grams: number, unit: string, density: number): number {
  const u = String(unit).toLowerCase().trim();
  if (massUnits[u] !== undefined) return grams / massUnits[u];
  if (volumeUnits[u] !== undefined) return (grams / density) / volumeUnits[u];
  return grams;
}

const yarnCategory = (tex: number): string => {
  if (tex < 15) return 'lace (кружевная)';
  if (tex < 25) return 'fingering (тонкая)';
  if (tex < 35) return 'sport (спортивная)';
  if (tex < 45) return 'DK (лёгкая)';
  if (tex < 60) return 'worsted (средняя)';
  if (tex <= 100) return 'bulky (толстая)';
  return 'super bulky (супер толстая)';
};

const swgToMm: Record<string, string> = {
  '0': '8.23', '1': '7.62', '2': '7.01', '3': '6.40', '4': '5.89', '5': '5.38', '6': '4.88', '7': '4.47', '8': '4.06', '9': '3.66',
  '10': '3.25', '11': '2.95', '12': '2.64', '13': '2.34', '14': '2.03', '15': '1.83', '16': '1.63', '17': '1.42', '18': '1.22', '19': '1.02',
  '20': '0.91', '21': '0.81', '22': '0.71', '23': '0.61', '24': '0.56', '25': '0.51', '26': '0.46', '27': '0.42', '28': '0.38', '29': '0.35',
  '30': '0.32', '31': '0.29', '32': '0.27', '33': '0.25', '34': '0.23', '35': '0.21', '36': '0.19'
};

const bwgToMm: Record<string, string> = {
  '0': '8.49', '1': '7.62', '2': '7.21', '3': '6.58', '4': '6.05', '5': '5.59', '6': '5.18', '7': '4.78', '8': '4.37', '9': '3.99',
  '10': '3.58', '11': '3.05', '12': '2.77', '13': '2.41', '14': '2.11', '15': '1.83', '16': '1.65', '17': '1.47', '18': '1.24', '19': '1.07',
  '20': '0.91', '21': '0.81', '22': '0.71', '23': '0.64', '24': '0.56', '25': '0.51', '26': '0.46', '27': '0.43', '28': '0.38', '29': '0.35',
  '30': '0.33', '31': '0.30', '32': '0.27', '33': '0.25', '34': '0.23', '35': '0.20', '36': '0.18'
};

function gaugeToMm(gauge: number, system: string): number | null {
  const g = String(Math.round(gauge));
  const sys = String(system).toLowerCase().trim();
  let mmStr: string | undefined;
  if (sys === 'awg') mmStr = awg2mm[g];
  else if (sys === 'swg') mmStr = swgToMm[g];
  else if (sys === 'bwg') mmStr = bwgToMm[g];
  if (!mmStr) return null;
  return Number(mmStr);
}

function nearestAwg(mm: number): string {
  let best = '—';
  let bestDiff = Infinity;
  Object.entries(awg2mm).forEach(([gauge, mmStr]) => {
    const d = Math.abs(Number(mmStr) - mm);
    if (d < bestDiff) {
      bestDiff = d;
      best = gauge;
    }
  });
  return best;
}

const needleTable: Record<string, { mm: number; usage: string }> = {
  '18g': { mm: 1.27, usage: 'переливание крови' },
  '19g': { mm: 1.07, usage: 'инъекции / переливание' },
  '20g': { mm: 0.90, usage: 'инъекции' },
  '21g': { mm: 0.81, usage: 'инъекции' },
  '22g': { mm: 0.71, usage: 'инъекции' },
  '23g': { mm: 0.64, usage: 'венепункция / инъекции' },
  '25g': { mm: 0.51, usage: 'венепункция' },
  '27g': { mm: 0.41, usage: 'тонкая венепункция' },
};

const aspectRatios: Record<string, { w: number; h: number }> = {
  '16:9': { w: 16, h: 9 },
  '16:10': { w: 16, h: 10 },
  '4:3': { w: 4, h: 3 },
  '21:9': { w: 21, h: 9 },
  '32:9': { w: 32, h: 9 },
};

const goldPurityMap: Record<string, { percent: number; soviet: string }> = {
  '24k': { percent: 99.9, soviet: '999' },
  '22k': { percent: 91.6, soviet: '916' },
  '18k': { percent: 75.0, soviet: '750' },
  '14k': { percent: 58.3, soviet: '585' },
  '10k': { percent: 41.7, soviet: '417' },
};

function getGoldPurity(key: string): { percent: number; soviet: string } | null {
  const k = String(key).toLowerCase().trim();
  return goldPurityMap[k] ?? null;
}

function simplifyRatio(w: number, h: number): string {
  if (!h) return '—';
  const r = w / h;
  const ratios = [
    { name: '16:9', val: 16 / 9 },
    { name: '16:10', val: 16 / 10 },
    { name: '4:3', val: 4 / 3 },
    { name: '21:9', val: 21 / 9 },
    { name: '32:9', val: 32 / 9 },
    { name: '1:1', val: 1 },
  ];
  let best = '—';
  let bestDiff = Infinity;
  for (const item of ratios) {
    const d = Math.abs(r - item.val);
    if (d < bestDiff) {
      bestDiff = d;
      best = item.name;
    }
  }
  return best;
}

export const computeMap_missing_6: Record<string, ComputeFn> = {
  'btc-v-rub': (inputs) => {
    const value = Number(inputs.fromValue);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const { rate, fallback } = getCryptoRateInfo('bitcoin');
    const result = value * rate;
    const note = fallback ? ' (курс приблизительный, API недоступен)' : ' (курс приблизительный)';
    return [{ value: `${value} BTC ≈ ${fmtResult(result)} ₽${note}`, label: 'Результат' }];
  },
  'eth-v-rub': (inputs) => {
    const value = Number(inputs.fromValue);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const { rate, fallback } = getCryptoRateInfo('ethereum');
    const result = value * rate;
    const note = fallback ? ' (курс приблизительный, API недоступен)' : ' (курс приблизительный)';
    return [{ value: `${value} ETH ≈ ${fmtResult(result)} ₽${note}`, label: 'Результат' }];
  },
  'usdt-v-rub': (inputs) => {
    const value = Number(inputs.fromValue);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const { rate, fallback } = getCryptoRateInfo('tether');
    const result = value * rate;
    const note = fallback ? ' (курс приблизительный, API недоступен)' : ' (курс приблизительный)';
    return [{ value: `${value} USDT ≈ ${fmtResult(result)} ₽${note}`, label: 'Результат' }];
  },
  'zoloto-v-rub': (inputs) => {
    const value = Number(inputs.fromValue);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const rate = 6200000;
    const result = value * rate;
    return [{ value: `${value} тройских унций золота ≈ ${fmtResult(result)} ₽ (курс приблизительный)`, label: 'Результат' }];
  },

  'konverter-chasovyh-poyasov': (inputs) => {
    const localTime = String(inputs.localTime || '');
    const offsetFrom = getCityOffset(inputs.fromCity);
    const offsetTo = getCityOffset(inputs.toCity);
    if (offsetFrom === null || offsetTo === null) {
      return [
        { value: '—', label: 'Местное время' },
        { value: '—', label: 'Разница' },
        { value: '—', label: 'Сдвиг дня' },
      ];
    }
    const conv = convertTime(localTime, offsetFrom, offsetTo);
    return [
      { value: conv.convertedTime, label: 'Местное время' },
      { value: conv.timeDiff, label: 'Разница' },
      { value: conv.dayOffset, label: 'Сдвиг дня' },
    ];
  },
  'utc-v-moscow': (inputs) => {
    const time = String(inputs.time || '');
    const conv = convertTime(time, 0, 3);
    return [{ value: conv.convertedTime, label: 'Результат' }];
  },
  'moscow-v-utc': (inputs) => {
    const time = String(inputs.time || '');
    const conv = convertTime(time, 3, 0);
    return [{ value: conv.convertedTime, label: 'Результат' }];
  },
  'utc-v-local': (inputs) => {
    const time = String(inputs.time || '');
    const tz = String(inputs.timezone || '');
    let offset = Number(tz);
    if (isNaN(offset)) {
      const offsets: Record<string, number> = {
        utc: 0, msk: 3, cet: 1, est: -5, pst: -8, jst: 9, aest: 10, ist: 5.5, cst: 8,
      };
      offset = offsets[tz.toLowerCase().trim()] ?? 0;
    }
    const conv = convertTime(time, 0, offset);
    return [
      { value: conv.convertedTime, label: 'Результат' },
      { value: conv.timeDiff, label: 'Разница' },
    ];
  },
  'local-v-utc': (inputs) => {
    const time = String(inputs.time || '');
    const tz = String(inputs.timezone || '');
    let offset = Number(tz);
    if (isNaN(offset)) {
      const offsets: Record<string, number> = {
        utc: 0, msk: 3, cet: 1, est: -5, pst: -8, jst: 9, aest: 10, ist: 5.5, cst: 8,
      };
      offset = offsets[tz.toLowerCase().trim()] ?? 0;
    }
    const conv = convertTime(time, offset, 0);
    return [
      { value: conv.convertedTime, label: 'Результат' },
      { value: conv.timeDiff, label: 'Разница' },
    ];
  },

  'konverter-kulinarnyh-mer': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from || '').toLowerCase().trim();
    if ((!value && value !== 0) || !from) return [{ value: '—', label: 'Результат' }];
    const toMl: Record<string, number> = {
      cup: 237, 'cup-us': 237, стакан: 237,
      tbsp: 15, 'ст-л': 15, 'ст.л.': 15, 'столовая-ложка': 15,
      tsp: 5, 'ч-л': 5, 'ч.л.': 5, 'чайная-ложка': 5,
      oz: 29.57, унция: 29.57,
      lb: 453.6, pound: 453.6, фунт: 453.6,
    };
    const ml = value * (toMl[from] ?? 1);
    return [
      { value: fmtResult(ml), label: 'мл', unit: 'мл' },
      { value: fmtResult(ml / 1000), label: 'л', unit: 'л' },
      { value: fmtResult(ml / 237), label: 'cup_us', unit: 'стакан' },
      { value: fmtResult(ml / 15), label: 'tbsp', unit: 'ст. л.' },
      { value: fmtResult(ml / 5), label: 'tsp', unit: 'ч. л.' },
    ];
  },
  'kulinarnye-mery-rasshirennye': (inputs) => {
    const value = Number(inputs.value);
    const ingredient = String(inputs.ingredient || '');
    const from = String(inputs.from || '');
    const to = String(inputs.to || '');
    if ((!value && value !== 0) || !ingredient || !from || !to) return [{ value: '—', label: 'Результат' }];
    const density = getDensity(ingredient);
    const grams = unitToGrams(value, from, density);
    const result = gramsToUnit(grams, to, density);
    return [{ value: `${fmtResult(value)} ${from} = ${fmtResult(result)} ${to}`, label: 'Результат' }];
  },
  'mernye-vesy-kuhnya': (inputs) => {
    const product = String(inputs.product || '');
    const amount = Number(inputs.amount);
    const unit = String(inputs.unit || '');
    if ((!amount && amount !== 0) || !product || !unit) {
      return [
        { value: '—', label: 'grams (г)' },
        { value: '—', label: 'milliliters (мл)' },
        { value: '—', label: 'cups (стак.)' },
        { value: '—', label: 'tablespoons (ст.л.)' },
        { value: '—', label: 'teaspoons (ч.л.)' },
      ];
    }
    const density = getDensity(product);
    const grams = unitToGrams(amount, unit, density);
    const ml = grams / density;
    return [
      { value: fmtResult(grams), label: 'grams (г)', unit: 'г' },
      { value: fmtResult(ml), label: 'milliliters (мл)', unit: 'мл' },
      { value: fmtResult(ml / 250), label: 'cups (стак.)', unit: 'стак.' },
      { value: fmtResult(ml / 15), label: 'tablespoons (ст.л.)', unit: 'ст.л.' },
      { value: fmtResult(ml / 5), label: 'teaspoons (ч.л.)', unit: 'ч.л.' },
    ];
  },

  'konverter-tolshiny-pryazhi': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from || '').toLowerCase().trim();
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    let tex = value;
    if (from === 'denier' || from === 'den') tex = value / 9;
    else if (from === 'nm' || from === 'n') tex = 1000 / value;
    else if (from === 'wpi') tex = 6000 / (value * value);
    const denier = tex * 9;
    const nm = 1000 / tex;
    const wpi = Math.sqrt(6000 / tex);
    return [
      { value: fmtResult(tex), label: 'tex', unit: 'tex' },
      { value: fmtResult(denier), label: 'denier', unit: 'den' },
      { value: fmtResult(nm), label: 'nm', unit: 'Nm' },
      { value: fmtResult(wpi), label: 'wpi', unit: 'WPI' },
      { value: yarnCategory(tex), label: 'category', unit: 'категория' },
    ];
  },

  'konverter-plotnosti-bumagi': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from || '').toLowerCase().trim();
    const paperType = String(inputs.paperType || 'bond').toLowerCase().trim();
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const factor = paperType === 'cover' ? 1.47 : 3.75;
    let gsm = value;
    if (from === 'pt') gsm = value * factor;
    else if (from === 'mm' || from === 'caliper') gsm = value * 375;
    else if (from === 'lb_bond' || from === 'lb') gsm = value * 3.75;
    const pt = gsm / factor;
    const mm = gsm / 375;
    const lb_bond = gsm / 3.75;
    return [
      { value: fmtResult(gsm), label: 'gsm', unit: 'г/м²' },
      { value: fmtResult(pt), label: 'pt', unit: 'pt' },
      { value: fmtResult(mm), label: 'mm', unit: 'мм' },
      { value: fmtResult(lb_bond), label: 'lb_bond', unit: 'lb' },
      { value: fmtResult(mm), label: 'caliper', unit: 'мм' },
    ];
  },

  'konverter-razmerov-shin': (inputs) => {
    const width = Number(inputs.width);
    const aspect = Number(inputs.aspect);
    const rim = Number(inputs.rim);
    if ((!width && width !== 0) || (!aspect && aspect !== 0) || (!rim && rim !== 0)) return [{ value: '—', label: 'Результат' }];
    const sidewall = width * aspect / 100;
    const diameter = 2 * sidewall + rim * 25.4;
    const circumference = Math.PI * diameter;
    const diameterInch = diameter / 25.4;
    const metricSize = `${width}/${aspect}R${rim}`;
    return [
      { value: metricSize, label: 'metricSize', unit: 'метр. размер' },
      { value: fmtResult(diameter), label: 'diameter', unit: 'мм' },
      { value: fmtResult(diameterInch), label: 'diameterInch', unit: 'дюйм' },
      { value: fmtResult(sidewall), label: 'sidewall', unit: 'мм' },
      { value: fmtResult(circumference), label: 'circumference', unit: 'мм' },
    ];
  },
  'shirina-shiny-v-profil': (inputs) => {
    const width = Number(inputs.width);
    const profile = Number(inputs.profile);
    const rim = Number(inputs.rim);
    if ((!width && width !== 0) || (!profile && profile !== 0) || (!rim && rim !== 0)) {
      return [
        { value: '—', label: 'height' },
        { value: '—', label: 'fullDiameter' },
      ];
    }
    const height = width * profile / 100;
    const fullDiameter = 2 * height + rim * 25.4;
    return [
      { value: fmtResult(height), label: 'height', unit: 'мм' },
      { value: fmtResult(fullDiameter), label: 'fullDiameter', unit: 'мм' },
    ];
  },

  'konverter-kalibra-provoda': (inputs) => {
    const gauge = Number(inputs.gauge);
    const system = String(inputs.system || 'awg');
    if (!gauge && gauge !== 0) return [{ value: '—', label: 'Результат' }];
    const mm = gaugeToMm(gauge, system);
    if (mm === null) return [{ value: 'Неизвестный калибр', label: 'Результат' }];
    const inch = mm / 25.4;
    const areaMm2 = Math.PI * (mm / 2) ** 2;
    const areaCircularMil = areaMm2 * 1973.5;
    return [
      { value: String(Math.round(gauge)), label: 'awg', unit: 'G' },
      { value: fmtResult(mm), label: 'mm', unit: 'мм' },
      { value: fmtResult(inch), label: 'inch', unit: 'дюйм' },
      { value: fmtResult(areaMm2), label: 'areaMm2', unit: 'мм²' },
      { value: fmtResult(areaCircularMil), label: 'areaCircularMil', unit: 'CM' },
    ];
  },
  'konverter-kalibra-igl': (inputs) => {
    const gauge = String(inputs.gauge || '').toLowerCase().trim();
    const length = String(inputs.length || '');
    const info = needleTable[gauge];
    if (!info) return [{ value: 'Неизвестный калибр', label: 'Результат' }];
    const diameterInch = info.mm / 25.4;
    const flowRate = info.mm * info.mm * 50;
    return [
      { value: gauge.toUpperCase(), label: 'gauge', unit: 'G' },
      { value: fmtResult(info.mm), label: 'diameterMm', unit: 'мм' },
      { value: fmtResult(diameterInch), label: 'diameterInch', unit: 'дюйм' },
      { value: info.usage, label: 'usage', unit: 'применение' },
      { value: fmtResult(flowRate), label: 'flowRate', unit: 'мл/мин (прибл.)' },
    ];
  },
  'awg-v-mm': (inputs) => {
    const value = String(inputs.value || '');
    const mm = awg2mm[value];
    if (!mm) return [{ value: 'Неизвестный AWG', label: 'Результат' }];
    return [{ value: `${value} AWG = ${mm} мм`, label: 'Результат' }];
  },
  'mm-v-awg': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const awg = nearestAwg(value);
    if (awg === '—') return [{ value: 'Нет близкого AWG', label: 'Результат' }];
    return [{ value: `${value} мм ≈ ${awg} AWG`, label: 'Результат' }];
  },

  'konverter-diagonali-ekrana': (inputs) => {
    const diagonal = Number(inputs.diagonal);
    const ratio = aspectRatios[String(inputs.aspectRatio || '16:9')];
    if (!diagonal && diagonal !== 0) return [{ value: '—', label: 'Результат' }];
    const h = ratio?.h ?? 9;
    const w = ratio?.w ?? 16;
    const ratioVal = h / w;
    const widthInch = diagonal / Math.sqrt(1 + ratioVal * ratioVal);
    const heightInch = widthInch * ratioVal;
    const diagonalCm = diagonal * 2.54;
    const diagonalMm = diagonal * 25.4;
    const widthCm = widthInch * 2.54;
    const heightCm = heightInch * 2.54;
    const widthPixels = Math.round(widthInch * 96);
    const area = widthCm * heightCm;
    return [
      { value: fmtResult(diagonalCm), label: 'diagonalCm', unit: 'см' },
      { value: fmtResult(diagonalMm), label: 'diagonalMm', unit: 'мм' },
      { value: fmtResult(widthCm), label: 'widthCm', unit: 'см' },
      { value: fmtResult(heightCm), label: 'heightCm', unit: 'см' },
      { value: String(widthPixels), label: 'widthPixels', unit: 'px' },
      { value: fmtResult(area), label: 'area', unit: 'см²' },
    ];
  },
  'razmery-ekrana': (inputs) => {
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const diagonal = Number(inputs.diagonal);
    if ((!width && width !== 0) || (!height && height !== 0) || (!diagonal && diagonal !== 0)) return [{ value: '—', label: 'Результат' }];
    const ppi = diagonal / Math.sqrt(width * width + height * height);
    const widthInch = width / ppi;
    const heightInch = height / ppi;
    return [
      { value: fmtResult(ppi), label: 'ppi', unit: 'ppi' },
      { value: simplifyRatio(width, height), label: 'aspectRatio', unit: 'соотношение' },
      { value: fmtResult(widthInch), label: 'widthInch', unit: 'дюйм' },
      { value: fmtResult(heightInch), label: 'heightInch', unit: 'дюйм' },
      { value: fmtResult(widthInch * 2.54), label: 'widthCm', unit: 'см' },
      { value: fmtResult(heightInch * 2.54), label: 'heightCm', unit: 'см' },
      { value: fmtResult(width * height), label: 'totalPixels', unit: 'px' },
    ];
  },

  'konverter-tverdosti': (inputs) => {
    const value = Number(inputs.value);
    const scale = String(inputs.scale || 'hrc').toLowerCase().trim();
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    let hrc = value;
    if (scale === 'hb') hrc = (value - 100) / 10;
    else if (scale === 'hv') hrc = (value - 80) / 9;
    else if (scale === 'tensile' || scale === 'mp') hrc = (value - 400) / 30;
    const hb = hrc * 10 + 100;
    const hv = hrc * 9 + 80;
    const tensile = hrc * 30 + 400;
    return [
      { value: fmtResult(hb), label: 'hb', unit: 'HB' },
      { value: fmtResult(hrc), label: 'hrc', unit: 'HRC' },
      { value: fmtResult(hv), label: 'hv', unit: 'HV' },
      { value: fmtResult(tensile), label: 'tensile', unit: 'МПа' },
    ];
  },

  'konverter-karatov': (inputs) => {
    const metricCarats = Number(inputs.metricCarats);
    const purity = getGoldPurity(inputs.goldPurity);
    if ((!metricCarats && metricCarats !== 0) || !purity) return [{ value: '—', label: 'Результат' }];
    const mg = metricCarats * 200;
    const grams = metricCarats * 0.2;
    const troyOunce = grams / 31.1035;
    return [
      { value: fmtResult(mg), label: 'milligrams (мг)', unit: 'мг' },
      { value: fmtResult(grams), label: 'grams (г)', unit: 'г' },
      { value: fmtResult(troyOunce), label: 'troyOunce (oz t)', unit: 'oz t' },
      { value: `${purity.percent}%`, label: 'goldPercent (%)', unit: '%' },
      { value: purity.soviet, label: 'sovietPurity', unit: 'проба' },
    ];
  },

  'toy-age-calculator': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    let age = '12+';
    if (value < 500) age = '0–3 года';
    else if (value < 1500) age = '3–6 лет';
    else if (value < 3000) age = '6–9 лет';
    else if (value < 5000) age = '9–12 лет';
    return [{ value: age, label: 'Рекомендуемый возраст' }];
  },
  'wishlist-priority-calculator': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    let priority = 'Низкий';
    if (value >= 10) priority = 'Критический';
    else if (value >= 7) priority = 'Высокий';
    else if (value >= 4) priority = 'Средний';
    return [{ value: priority, label: 'Приоритет' }];
  },
};
