import { Calculator } from '../types';

// ── Валютные курсы (единиц на 1 USD) ──
const currencyRates: Record<string, number> = {
  usd: 1,
  eur: 0.92,
  rub: 92.5,
  gbp: 0.79,
  cny: 7.23,
  jpy: 151.5,
  kzt: 500.5,
  byn: 3.27,
  uah: 41.2,
};

const currencyLabels: Record<string, string> = {
  usd: 'USD',
  eur: 'EUR',
  rub: 'RUB',
  gbp: 'GBP',
  cny: 'CNY',
  jpy: 'JPY',
  kzt: 'KZT',
  byn: 'BYN',
  uah: 'UAH',
};

function createCurrencyConverter(from: string, to: string): Calculator {
  const rate = currencyRates[to] / currencyRates[from];
  return {
    id: `${from}-to-${to}`,
    slug: `${from}-v-${to}`,
    title: `${currencyLabels[from]} в ${currencyLabels[to]}`,
    description: `Конвертер ${currencyLabels[from]} в ${currencyLabels[to]}`,
    category: 'konvertery',
    subcategory: 'finansovye',
    type: 'converter',
    inputs: [
      { name: 'value', label: 'Значение', type: 'number', placeholder: '1', defaultValue: 1 },
      { name: 'from', label: 'Из', type: 'select', options: [{ value: from, label: currencyLabels[from] }], defaultValue: from },
      { name: 'to', label: 'В', type: 'select', options: [{ value: to, label: currencyLabels[to] }], defaultValue: to },
    ],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const result = val * rate;
      return [{
        value: `${val} ${currencyLabels[from]} = ${result.toFixed(2)} ${currencyLabels[to]} (курс ≈ ${rate.toFixed(4)})`,
        label: 'Конвертация',
      }];
    },
    content: {
      howTo: `Введите сумму в ${currencyLabels[from]}. Результат покажет эквивалент в ${currencyLabels[to]}.`,
      about: `Конвертер валют для перевода ${currencyLabels[from]} в ${currencyLabels[to]}. Курс примерный, для точных расчётов используйте актуальный курс.`,
      formula: `Сумма в ${currencyLabels[to]} = Сумма в ${currencyLabels[from]} × Курс`,
      faq: [
        { question: 'Откуда берётся курс?', answer: 'Курс примерный, обновляется периодически. Для точных расчётов уточняйте текущий курс ЦБ РФ или коммерческих банков.' },
        { question: 'Можно ли конвертировать обратно?', answer: `Да, используйте калькулятор ${currencyLabels[to]} в ${currencyLabels[from]} или разделите на курс.` },
      ],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-27',
    },
    popularCalculations: [
      { value: `10 ${currencyLabels[from]} в ${currencyLabels[to]}`, url: `/${from}-v-${to}?value=10&from=${from}&to=${to}` },
      { value: `100 ${currencyLabels[from]} в ${currencyLabels[to]}`, url: `/${from}-v-${to}?value=100&from=${from}&to=${to}` },
      { value: `1000 ${currencyLabels[from]} в ${currencyLabels[to]}`, url: `/${from}-v-${to}?value=1000&from=${from}&to=${to}` },
    ],
  };
}

// ── Частота ──
const freqFactors: Record<string, { factor: number; label: string }> = {
  hz: { factor: 1, label: 'Гц' },
  khz: { factor: 1e3, label: 'кГц' },
  mhz: { factor: 1e6, label: 'МГц' },
  ghz: { factor: 1e9, label: 'ГГц' },
  rpm: { factor: 1 / 60, label: 'об/мин' },
};

function createFrequencyConverter(from: string, to: string): Calculator {
  const fromInfo = freqFactors[from];
  const toInfo = freqFactors[to];
  const rate = fromInfo.factor / toInfo.factor;
  return {
    id: `freq-${from}-to-${to}`,
    slug: `${from}-v-${to}`,
    title: `${fromInfo.label} в ${toInfo.label}`,
    description: `Перевод частоты из ${fromInfo.label} в ${toInfo.label}`,
    category: 'konvertery',
    subcategory: 'conv-chastota',
    type: 'converter',
    inputs: [
      { name: 'value', label: 'Значение', type: 'number', placeholder: '1', defaultValue: 1 },
      { name: 'from', label: 'Из', type: 'select', options: [{ value: from, label: fromInfo.label }], defaultValue: from },
      { name: 'to', label: 'В', type: 'select', options: [{ value: to, label: toInfo.label }], defaultValue: to },
    ],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const result = val * rate;
      return [{
        value: `${val} ${fromInfo.label} = ${result.toFixed(6)} ${toInfo.label}`,
        label: 'Результат',
      }];
    },
    content: {
      howTo: `Введите значение в ${fromInfo.label}. Результат покажет эквивалент в ${toInfo.label}.`,
      about: `Конвертер частоты: перевод ${fromInfo.label} в ${toInfo.label}. Используется в радиотехнике, физике и инженерии.`,
      formula: `${toInfo.label} = ${fromInfo.label} × ${rate.toExponential(4)}`,
      faq: [
        { question: 'Что такое герц?', answer: 'Герц (Гц) — единица измерения частоты периодических процессов, равная одному циклу в секунду.' },
        { question: 'Где применяется конвертация частоты?', answer: 'В радиотехнике, акустике, механике и физике для перевода между различными порядками частот.' },
      ],
      sources: [{ title: 'Герц — Википедия', url: 'https://ru.wikipedia.org/wiki/Герц' }],
      updatedAt: '2026-04-27',
    },
    popularCalculations: [
      { value: `10 ${fromInfo.label} в ${toInfo.label}`, url: `/${from}-v-${to}?value=10&from=${from}&to=${to}` },
      { value: `100 ${fromInfo.label} в ${toInfo.label}`, url: `/${from}-v-${to}?value=100&from=${from}&to=${to}` },
      { value: `1000 ${fromInfo.label} в ${toInfo.label}`, url: `/${from}-v-${to}?value=1000&from=${from}&to=${to}` },
    ],
  };
}

// ── Сила ──
const forceFactors: Record<string, { factor: number; label: string }> = {
  n: { factor: 1, label: 'Н' },
  kn: { factor: 1e3, label: 'кН' },
  kgf: { factor: 9.80665, label: 'кгс' },
  dyn: { factor: 1e-5, label: 'дин' },
};

function createForceConverter(from: string, to: string): Calculator {
  const fromInfo = forceFactors[from];
  const toInfo = forceFactors[to];
  const rate = fromInfo.factor / toInfo.factor;
  return {
    id: `force-${from}-to-${to}`,
    slug: `${from}-v-${to}`,
    title: `${fromInfo.label} в ${toInfo.label}`,
    description: `Перевод силы из ${fromInfo.label} в ${toInfo.label}`,
    category: 'konvertery',
    subcategory: 'conv-sila',
    type: 'converter',
    inputs: [
      { name: 'value', label: 'Значение', type: 'number', placeholder: '1', defaultValue: 1 },
      { name: 'from', label: 'Из', type: 'select', options: [{ value: from, label: fromInfo.label }], defaultValue: from },
      { name: 'to', label: 'В', type: 'select', options: [{ value: to, label: toInfo.label }], defaultValue: to },
    ],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const result = val * rate;
      return [{
        value: `${val} ${fromInfo.label} = ${result.toFixed(6)} ${toInfo.label}`,
        label: 'Результат',
      }];
    },
    content: {
      howTo: `Введите значение в ${fromInfo.label}. Результат покажет эквивалент в ${toInfo.label}.`,
      about: `Конвертер силы: перевод ${fromInfo.label} в ${toInfo.label}. Применяется в механике, инженерии и физике.`,
      formula: `${toInfo.label} = ${fromInfo.label} × ${rate.toExponential(4)}`,
      faq: [
        { question: 'Что такое ньютон?', answer: 'Ньютон (Н) — единица силы в Международной системе единиц (СИ), равная силе, которая сообщает массе 1 кг ускорение 1 м/с².' },
        { question: 'Чем отличается кгс от ньютона?', answer: '1 кгс (килограмм-сила) — сила, с которой Земля притягивает тело массой 1 кг. 1 кгс ≈ 9,80665 Н.' },
      ],
      sources: [{ title: 'Ньютон (единица) — Википедия', url: 'https://ru.wikipedia.org/wiki/Ньютон_(единица)' }],
      updatedAt: '2026-04-27',
    },
    popularCalculations: [
      { value: `10 ${fromInfo.label} в ${toInfo.label}`, url: `/${from}-v-${to}?value=10&from=${from}&to=${to}` },
      { value: `100 ${fromInfo.label} в ${toInfo.label}`, url: `/${from}-v-${to}?value=100&from=${from}&to=${to}` },
      { value: `1000 ${fromInfo.label} в ${toInfo.label}`, url: `/${from}-v-${to}?value=1000&from=${from}&to=${to}` },
    ],
  };
}

// ── Экспорт всех конвертеров ──
export const currencyFrequencyForceConverters: Calculator[] = [
  // Валюты
  createCurrencyConverter('usd', 'rub'),
  createCurrencyConverter('rub', 'usd'),
  createCurrencyConverter('eur', 'rub'),
  createCurrencyConverter('rub', 'eur'),
  createCurrencyConverter('eur', 'usd'),
  createCurrencyConverter('usd', 'eur'),
  createCurrencyConverter('gbp', 'rub'),
  createCurrencyConverter('rub', 'gbp'),
  createCurrencyConverter('cny', 'rub'),
  createCurrencyConverter('rub', 'cny'),
  createCurrencyConverter('jpy', 'rub'),
  createCurrencyConverter('rub', 'jpy'),
  createCurrencyConverter('kzt', 'rub'),
  createCurrencyConverter('rub', 'kzt'),
  createCurrencyConverter('byn', 'rub'),
  createCurrencyConverter('rub', 'byn'),
  createCurrencyConverter('uah', 'rub'),
  createCurrencyConverter('rub', 'uah'),

  // Частота
  createFrequencyConverter('hz', 'khz'),
  createFrequencyConverter('khz', 'hz'),
  createFrequencyConverter('hz', 'mhz'),
  createFrequencyConverter('mhz', 'hz'),
  createFrequencyConverter('rpm', 'hz'),
  createFrequencyConverter('hz', 'rpm'),
  createFrequencyConverter('ghz', 'mhz'),
  createFrequencyConverter('mhz', 'ghz'),

  // Сила
  createForceConverter('n', 'kn'),
  createForceConverter('kn', 'n'),
  createForceConverter('n', 'kgf'),
  createForceConverter('kgf', 'n'),
  createForceConverter('dyn', 'n'),
  createForceConverter('n', 'dyn'),
];
