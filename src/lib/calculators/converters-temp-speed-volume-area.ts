
import { Calculator } from '../types';

// ============================================================
// ТЕМПЕРАТУРА (subcategory: conv-temperatura)
// ============================================================

export const celsiusToFahrenheit: Calculator = {
  id: 'temperature-celsius-fahrenheit',
  slug: 'c-v-f',
  title: 'Цельсий в Фаренгейт',
  description: 'Конвертер температуры: перевод градусов Цельсия в градусы Фаренгейта',
  category: 'konvertery',
  subcategory: 'conv-temperatura',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Температура', type: 'number', placeholder: '0', defaultValue: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'c', label: '°C — Цельсий' }], defaultValue: 'c' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'f', label: '°F — Фаренгейт' }], defaultValue: 'f' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v * 9 / 5 + 32;
    return [{ value: `${v}°C = ${r.toFixed(2)}°F`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите температуру в градусах Цельсия. Результат в Фаренгейтах появится автоматически.',
    about: 'Шкала Цельсия (°C) и Фаренгейта (°F) — две наиболее распространённые температурные шкалы, используемые в быту, медицине и технике.',
    formula: '°F = °C × 9/5 + 32',
    faq: [
      { question: 'При какой температуре вода замерзает?', answer: '0°C = 32°F.' },
      { question: 'При какой температуре вода кипит?', answer: '100°C = 212°F (при нормальном атмосферном давлении).' }
    ],
    sources: [{ title: 'Температура — Википедия', url: 'https://ru.wikipedia.org/wiki/Температура' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '0°C в °F', url: '/c-v-f?value=0&from=c&to=f' },
    { value: '25°C в °F', url: '/c-v-f?value=25&from=c&to=f' },
    { value: '100°C в °F', url: '/c-v-f?value=100&from=c&to=f' }
  ]
};

export const fahrenheitToCelsius: Calculator = {
  id: 'temperature-fahrenheit-celsius',
  slug: 'f-v-c',
  title: 'Фаренгейт в Цельсий',
  description: 'Конвертер температуры: перевод градусов Фаренгейта в градусы Цельсия',
  category: 'konvertery',
  subcategory: 'conv-temperatura',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Температура', type: 'number', placeholder: '32', defaultValue: 32 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'f', label: '°F — Фаренгейт' }], defaultValue: 'f' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'c', label: '°C — Цельсий' }], defaultValue: 'c' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = (v - 32) * 5 / 9;
    return [{ value: `${v}°F = ${r.toFixed(2)}°C`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите температуру в градусах Фаренгейта. Результат в Цельсиях появится автоматически.',
    about: 'Перевод температуры из шкалы Фаренгейта в шкалу Цельсия. Шкала Фаренгейта распространена в США и некоторых других странах.',
    formula: '°C = (°F − 32) × 5/9',
    faq: [
      { question: 'Сколько градусов Цельсия в 98.6°F?', answer: '98.6°F = 37°C — нормальная температура человеческого тела.' },
      { question: 'При какой температуре по Фаренгейту вода замерзает?', answer: '32°F = 0°C.' }
    ],
    sources: [{ title: 'Температура — Википедия', url: 'https://ru.wikipedia.org/wiki/Температура' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '32°F в °C', url: '/f-v-c?value=32&from=f&to=c' },
    { value: '77°F в °C', url: '/f-v-c?value=77&from=f&to=c' },
    { value: '212°F в °C', url: '/f-v-c?value=212&from=f&to=c' }
  ]
};

export const celsiusToKelvin: Calculator = {
  id: 'temperature-celsius-kelvin',
  slug: 'c-v-k',
  title: 'Цельсий в Кельвины',
  description: 'Конвертер температуры: перевод градусов Цельсия в Кельвины',
  category: 'konvertery',
  subcategory: 'conv-temperatura',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Температура', type: 'number', placeholder: '0', defaultValue: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'c', label: '°C — Цельсий' }], defaultValue: 'c' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'k', label: 'K — Кельвин' }], defaultValue: 'k' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v + 273.15;
    return [{ value: `${v}°C = ${r.toFixed(2)} K`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите температуру в градусах Цельсия. Результат в Кельвинах появится автоматически.',
    about: 'Кельвин (K) — единица термодинамической температуры в Международной системе единиц (СИ). Абсолютный ноль равен 0 K.',
    formula: 'K = °C + 273.15',
    faq: [
      { question: 'Что такое абсолютный ноль?', answer: 'Абсолютный ноль — минимально возможная температура, равная −273.15°C или 0 K.' },
      { question: 'Как перевести Цельсий в Кельвины?', answer: 'Прибавьте 273.15 к значению в градусах Цельсия.' }
    ],
    sources: [{ title: 'Кельвин — Википедия', url: 'https://ru.wikipedia.org/wiki/Кельвин' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '0°C в K', url: '/c-v-k?value=0&from=c&to=k' },
    { value: '100°C в K', url: '/c-v-k?value=100&from=c&to=k' },
    { value: '−273.15°C в K', url: '/c-v-k?value=-273.15&from=c&to=k' }
  ]
};

export const kelvinToCelsius: Calculator = {
  id: 'temperature-kelvin-celsius',
  slug: 'k-v-c',
  title: 'Кельвины в Цельсий',
  description: 'Конвертер температуры: перевод Кельвинов в градусы Цельсия',
  category: 'konvertery',
  subcategory: 'conv-temperatura',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Температура', type: 'number', placeholder: '273.15', defaultValue: 273.15 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'k', label: 'K — Кельвин' }], defaultValue: 'k' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'c', label: '°C — Цельсий' }], defaultValue: 'c' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v - 273.15;
    return [{ value: `${v} K = ${r.toFixed(2)}°C`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите температуру в Кельвинах. Результат в Цельсиях появится автоматически.',
    about: 'Перевод из абсолютной шкалы Кельвина в привычную шкалу Цельсия.',
    formula: '°C = K − 273.15',
    faq: [
      { question: 'Сколько градусов Цельсия в 300 K?', answer: '300 K = 26.85°C.' },
      { question: 'Какая температура комнатная в Кельвинах?', answer: 'Примерно 293–298 K (20–25°C).' }
    ],
    sources: [{ title: 'Кельвин — Википедия', url: 'https://ru.wikipedia.org/wiki/Кельвин' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '273.15 K в °C', url: '/k-v-c?value=273.15&from=k&to=c' },
    { value: '373.15 K в °C', url: '/k-v-c?value=373.15&from=k&to=c' },
    { value: '0 K в °C', url: '/k-v-c?value=0&from=k&to=c' }
  ]
};

export const fahrenheitToKelvin: Calculator = {
  id: 'temperature-fahrenheit-kelvin',
  slug: 'f-v-k',
  title: 'Фаренгейт в Кельвины',
  description: 'Конвертер температуры: перевод градусов Фаренгейта в Кельвины',
  category: 'konvertery',
  subcategory: 'conv-temperatura',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Температура', type: 'number', placeholder: '32', defaultValue: 32 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'f', label: '°F — Фаренгейт' }], defaultValue: 'f' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'k', label: 'K — Кельвин' }], defaultValue: 'k' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = (v - 32) * 5 / 9 + 273.15;
    return [{ value: `${v}°F = ${r.toFixed(2)} K`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите температуру в градусах Фаренгейта. Результат в Кельвинах появится автоматически.',
    about: 'Перевод из англоязычной шкалы Фаренгейта в абсолютную шкалу Кельвина.',
    formula: 'K = (°F − 32) × 5/9 + 273.15',
    faq: [
      { question: 'Сколько Кельвинов в 32°F?', answer: '32°F = 273.15 K.' },
      { question: 'Какая формула перевода Фаренгейта в Кельвины?', answer: 'Вычтите 32, умножьте на 5/9, затем прибавьте 273.15.' }
    ],
    sources: [{ title: 'Температура — Википедия', url: 'https://ru.wikipedia.org/wiki/Температура' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '32°F в K', url: '/f-v-k?value=32&from=f&to=k' },
    { value: '212°F в K', url: '/f-v-k?value=212&from=f&to=k' },
    { value: '0°F в K', url: '/f-v-k?value=0&from=f&to=k' }
  ]
};

export const kelvinToFahrenheit: Calculator = {
  id: 'temperature-kelvin-fahrenheit',
  slug: 'k-v-f',
  title: 'Кельвины в Фаренгейт',
  description: 'Конвертер температуры: перевод Кельвинов в градусы Фаренгейта',
  category: 'konvertery',
  subcategory: 'conv-temperatura',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Температура', type: 'number', placeholder: '273.15', defaultValue: 273.15 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'k', label: 'K — Кельвин' }], defaultValue: 'k' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'f', label: '°F — Фаренгейт' }], defaultValue: 'f' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = (v - 273.15) * 9 / 5 + 32;
    return [{ value: `${v} K = ${r.toFixed(2)}°F`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите температуру в Кельвинах. Результат в Фаренгейтах появится автоматически.',
    about: 'Перевод из абсолютной шкалы Кельвина в шкалу Фаренгейта.',
    formula: '°F = (K − 273.15) × 9/5 + 32',
    faq: [
      { question: 'Сколько Фаренгейтов в 300 K?', answer: '300 K ≈ 80.33°F.' },
      { question: 'При какой температуре по Кельвину вода замерзает?', answer: '273.15 K = 32°F = 0°C.' }
    ],
    sources: [{ title: 'Температура — Википедия', url: 'https://ru.wikipedia.org/wiki/Температура' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '273.15 K в °F', url: '/k-v-f?value=273.15&from=k&to=f' },
    { value: '373.15 K в °F', url: '/k-v-f?value=373.15&from=k&to=f' },
    { value: '0 K в °F', url: '/k-v-f?value=0&from=k&to=f' }
  ]
};

export const reaumurToCelsius: Calculator = {
  id: 'temperature-reaumur-celsius',
  slug: 're-v-c',
  title: 'Реомюр в Цельсий',
  description: 'Конвертер температуры: перевод градусов Реомюра в градусы Цельсия',
  category: 'konvertery',
  subcategory: 'conv-temperatura',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Температура', type: 'number', placeholder: '80', defaultValue: 80 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 're', label: '°Re — Реомюр' }], defaultValue: 're' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'c', label: '°C — Цельсий' }], defaultValue: 'c' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v * 5 / 4;
    return [{ value: `${v}°Re = ${r.toFixed(2)}°C`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите температуру в градусах Реомюра. Результат в Цельсиях появится автоматически.',
    about: 'Градус Реомюра (°Re) — устаревшая единица температуры, при которой 0° соответствует точке замерзания воды, а 80° — точке кипения.',
    formula: '°C = °Re × 5/4',
    faq: [
      { question: 'Сколько градусов Цельсия в 80°Re?', answer: '80°Re = 100°C.' },
      { question: 'Где использовалась шкала Реомюра?', answer: 'Шкала Реомюра применялась в Европе до XX века, преимущественно в пивоварении и быту.' }
    ],
    sources: [{ title: 'Реомюр — Википедия', url: 'https://ru.wikipedia.org/wiki/Реомюр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '80°Re в °C', url: '/re-v-c?value=80&from=re&to=c' },
    { value: '0°Re в °C', url: '/re-v-c?value=0&from=re&to=c' },
    { value: '40°Re в °C', url: '/re-v-c?value=40&from=re&to=c' }
  ]
};

export const celsiusToReaumur: Calculator = {
  id: 'temperature-celsius-reaumur',
  slug: 'c-v-re',
  title: 'Цельсий в Реомюр',
  description: 'Конвертер температуры: перевод градусов Цельсия в градусы Реомюра',
  category: 'konvertery',
  subcategory: 'conv-temperatura',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Температура', type: 'number', placeholder: '100', defaultValue: 100 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'c', label: '°C — Цельсий' }], defaultValue: 'c' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 're', label: '°Re — Реомюр' }], defaultValue: 're' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v * 4 / 5;
    return [{ value: `${v}°C = ${r.toFixed(2)}°Re`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите температуру в градусах Цельсия. Результат в Реомюрах появится автоматически.',
    about: 'Перевод из шкалы Цельсия в устаревшую шкалу Реомюра.',
    formula: '°Re = °C × 4/5',
    faq: [
      { question: 'Сколько градусов Реомюра в 100°C?', answer: '100°C = 80°Re.' },
      { question: 'Чем отличается шкала Реомюра от Цельсия?', answer: 'В шкале Реомюра интервал между точками замерзания и кипения воды разбит на 80 делений, а не на 100.' }
    ],
    sources: [{ title: 'Реомюр — Википедия', url: 'https://ru.wikipedia.org/wiki/Реомюр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '100°C в °Re', url: '/c-v-re?value=100&from=c&to=re' },
    { value: '0°C в °Re', url: '/c-v-re?value=0&from=c&to=re' },
    { value: '25°C в °Re', url: '/c-v-re?value=25&from=c&to=re' }
  ]
};

// ============================================================
// СКОРОСТЬ (subcategory: conv-skorost)
// ============================================================

export const kmhToMs: Calculator = {
  id: 'speed-kmh-ms',
  slug: 'km-ch-v-m-s',
  title: 'Км/ч в м/с',
  description: 'Конвертер скорости: перевод километров в час в метры в секунду',
  category: 'konvertery',
  subcategory: 'conv-skorost',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Скорость', type: 'number', placeholder: '1', defaultValue: 1 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'kmh', label: 'км/ч' }], defaultValue: 'kmh' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'ms', label: 'м/с' }], defaultValue: 'ms' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v / 3.6;
    return [{ value: `${v} км/ч = ${r.toFixed(4)} м/с`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите скорость в км/ч. Результат в м/с появится автоматически.',
    about: 'Километры в час (км/ч) — распространённая единица скорости на дорогах, а метры в секунду (м/с) — в физике и технике.',
    formula: 'м/с = км/ч ÷ 3.6',
    faq: [
      { question: 'Сколько м/с в 1 км/ч?', answer: '1 км/ч ≈ 0.2778 м/с.' },
      { question: 'Как быстро перевести км/ч в м/с?', answer: 'Разделите значение на 3.6 (или умножьте на 5/18).' }
    ],
    sources: [{ title: 'Единицы скорости — Википедия', url: 'https://ru.wikipedia.org/wiki/Скорость' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 км/ч в м/с', url: '/km-ch-v-m-s?value=1&from=kmh&to=ms' },
    { value: '60 км/ч в м/с', url: '/km-ch-v-m-s?value=60&from=kmh&to=ms' },
    { value: '100 км/ч в м/с', url: '/km-ch-v-m-s?value=100&from=kmh&to=ms' }
  ]
};

export const msToKmh: Calculator = {
  id: 'speed-ms-kmh',
  slug: 'm-s-v-km-ch',
  title: 'М/с в км/ч',
  description: 'Конвертер скорости: перевод метров в секунду в километры в час',
  category: 'konvertery',
  subcategory: 'conv-skorost',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Скорость', type: 'number', placeholder: '1', defaultValue: 1 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'ms', label: 'м/с' }], defaultValue: 'ms' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'kmh', label: 'км/ч' }], defaultValue: 'kmh' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v * 3.6;
    return [{ value: `${v} м/с = ${r.toFixed(4)} км/ч`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите скорость в м/с. Результат в км/ч появится автоматически.',
    about: 'Метры в секунду (м/с) — единица скорости в СИ, часто используется в физике, технике и спорте.',
    formula: 'км/ч = м/с × 3.6',
    faq: [
      { question: 'Сколько км/ч в 1 м/с?', answer: '1 м/с = 3.6 км/ч.' },
      { question: 'Как перевести м/с в км/ч?', answer: 'Умножьте значение на 3.6 (или на 18/5).' }
    ],
    sources: [{ title: 'Скорость — Википедия', url: 'https://ru.wikipedia.org/wiki/Скорость' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 м/с в км/ч', url: '/m-s-v-km-ch?value=1&from=ms&to=kmh' },
    { value: '10 м/с в км/ч', url: '/m-s-v-km-ch?value=10&from=ms&to=kmh' },
    { value: '20 м/с в км/ч', url: '/m-s-v-km-ch?value=20&from=ms&to=kmh' }
  ]
};

export const kmhToMph: Calculator = {
  id: 'speed-kmh-mph',
  slug: 'km-ch-v-mil-ch',
  title: 'Км/ч в миль/ч',
  description: 'Конвертер скорости: перевод километров в час в мили в час',
  category: 'konvertery',
  subcategory: 'conv-skorost',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Скорость', type: 'number', placeholder: '100', defaultValue: 100 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'kmh', label: 'км/ч' }], defaultValue: 'kmh' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'mph', label: 'миль/ч' }], defaultValue: 'mph' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v * 0.621371;
    return [{ value: `${v} км/ч = ${r.toFixed(4)} миль/ч`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите скорость в км/ч. Результат в милях/ч появится автоматически.',
    about: 'Мили в час (mph) — единица скорости, распространённая в англоязычных странах (США, Великобритания).',
    formula: 'миль/ч = км/ч × 0.621371',
    faq: [
      { question: 'Сколько миль/ч в 100 км/ч?', answer: '100 км/ч ≈ 62.14 миль/ч.' },
      { question: 'Какая скорость 60 миль/ч в км/ч?', answer: '60 миль/ч ≈ 96.56 км/ч.' }
    ],
    sources: [{ title: 'Миля в час — Википедия', url: 'https://ru.wikipedia.org/wiki/Миля_в_час' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '100 км/ч в миль/ч', url: '/km-ch-v-mil-ch?value=100&from=kmh&to=mph' },
    { value: '60 км/ч в миль/ч', url: '/km-ch-v-mil-ch?value=60&from=kmh&to=mph' },
    { value: '120 км/ч в миль/ч', url: '/km-ch-v-mil-ch?value=120&from=kmh&to=mph' }
  ]
};

export const mphToKmh: Calculator = {
  id: 'speed-mph-kmh',
  slug: 'mil-ch-v-km-ch',
  title: 'Миль/ч в км/ч',
  description: 'Конвертер скорости: перевод миль в час в километры в час',
  category: 'konvertery',
  subcategory: 'conv-skorost',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Скорость', type: 'number', placeholder: '60', defaultValue: 60 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'mph', label: 'миль/ч' }], defaultValue: 'mph' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'kmh', label: 'км/ч' }], defaultValue: 'kmh' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v * 1.60934;
    return [{ value: `${v} миль/ч = ${r.toFixed(4)} км/ч`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите скорость в милях/ч. Результат в км/ч появится автоматически.',
    about: 'Перевод скорости из англоязычной системы измерения в метрическую.',
    formula: 'км/ч = миль/ч × 1.60934',
    faq: [
      { question: 'Сколько км/ч в 60 миль/ч?', answer: '60 миль/ч ≈ 96.56 км/ч.' },
      { question: 'Сколько км/ч в 1 миле/ч?', answer: '1 миля/ч ≈ 1.609 км/ч.' }
    ],
    sources: [{ title: 'Миля в час — Википедия', url: 'https://ru.wikipedia.org/wiki/Миля_в_час' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '60 миль/ч в км/ч', url: '/mil-ch-v-km-ch?value=60&from=mph&to=kmh' },
    { value: '100 миль/ч в км/ч', url: '/mil-ch-v-km-ch?value=100&from=mph&to=kmh' },
    { value: '50 миль/ч в км/ч', url: '/mil-ch-v-km-ch?value=50&from=mph&to=kmh' }
  ]
};

export const knotToKmh: Calculator = {
  id: 'speed-knot-kmh',
  slug: 'uzel-v-km-ch',
  title: 'Узлы в км/ч',
  description: 'Конвертер скорости: перевод узлов в километры в час',
  category: 'konvertery',
  subcategory: 'conv-skorost',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Скорость', type: 'number', placeholder: '1', defaultValue: 1 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'knot', label: 'узлы' }], defaultValue: 'knot' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'kmh', label: 'км/ч' }], defaultValue: 'kmh' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v * 1.852;
    return [{ value: `${v} узлов = ${r.toFixed(4)} км/ч`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите скорость в узлах. Результат в км/ч появится автоматически.',
    about: 'Узел (kn) — единица скорости, используемая в мореплавании и авиации. 1 узел равен одной морской миле в час.',
    formula: 'км/ч = узлы × 1.852',
    faq: [
      { question: 'Сколько км/ч в 1 узле?', answer: '1 узел = 1.852 км/ч.' },
      { question: 'Что такое морская миля?', answer: 'Морская миля = 1852 метра. Используется в мореплавании и авиации.' }
    ],
    sources: [{ title: 'Узел (единица скорости) — Википедия', url: 'https://ru.wikipedia.org/wiki/Узел_(единица_скорости)' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 узел в км/ч', url: '/uzel-v-km-ch?value=1&from=knot&to=kmh' },
    { value: '10 узлов в км/ч', url: '/uzel-v-km-ch?value=10&from=knot&to=kmh' },
    { value: '20 узлов в км/ч', url: '/uzel-v-km-ch?value=20&from=knot&to=kmh' }
  ]
};

export const kmhToKnot: Calculator = {
  id: 'speed-kmh-knot',
  slug: 'km-ch-v-uzel',
  title: 'Км/ч в узлы',
  description: 'Конвертер скорости: перевод километров в час в узлы',
  category: 'konvertery',
  subcategory: 'conv-skorost',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Скорость', type: 'number', placeholder: '10', defaultValue: 10 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'kmh', label: 'км/ч' }], defaultValue: 'kmh' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'knot', label: 'узлы' }], defaultValue: 'knot' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v / 1.852;
    return [{ value: `${v} км/ч = ${r.toFixed(4)} узлов`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите скорость в км/ч. Результат в узлах появится автоматически.',
    about: 'Перевод сухопутной скорости в морскую, удобный для моряков и яхтсменов.',
    formula: 'узлы = км/ч ÷ 1.852',
    faq: [
      { question: 'Сколько узлов в 10 км/ч?', answer: '10 км/ч ≈ 5.40 узлов.' },
      { question: 'Какая скорость 50 км/ч в узлах?', answer: '50 км/ч ≈ 27.0 узлов.' }
    ],
    sources: [{ title: 'Узел (единица скорости) — Википедия', url: 'https://ru.wikipedia.org/wiki/Узел_(единица_скорости)' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '10 км/ч в узлы', url: '/km-ch-v-uzel?value=10&from=kmh&to=knot' },
    { value: '50 км/ч в узлы', url: '/km-ch-v-uzel?value=50&from=kmh&to=knot' },
    { value: '100 км/ч в узлы', url: '/km-ch-v-uzel?value=100&from=kmh&to=knot' }
  ]
};

export const machToKmh: Calculator = {
  id: 'speed-mach-kmh',
  slug: 'mah-v-km-ch',
  title: 'Махи в км/ч',
  description: 'Конвертер скорости: перевод чисел Маха в километры в час',
  category: 'konvertery',
  subcategory: 'conv-skorost',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Число Маха', type: 'number', placeholder: '1', defaultValue: 1 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'mach', label: 'Махи' }], defaultValue: 'mach' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'kmh', label: 'км/ч' }], defaultValue: 'kmh' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v * 1225;
    return [{ value: `${v} Маха = ${r.toFixed(2)} км/ч`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите число Маха. Результат в км/ч появится автоматически (при стандартных условиях).',
    about: 'Число Маха — отношение скорости объекта к скорости звука. При стандартных условиях (15°C, уровень моря) 1 Мах ≈ 1225 км/ч.',
    formula: 'км/ч = Маха × 1225 (при стандартных условиях)',
    faq: [
      { question: 'Сколько км/ч в 1 Махе?', answer: 'При стандартных условиях 1 Мах ≈ 1225 км/ч ≈ 340.3 м/с.' },
      { question: 'Меняется ли скорость звука?', answer: 'Да, скорость звука зависит от температуры, давления и плотности среды. На большей высоте она ниже.' }
    ],
    sources: [{ title: 'Число Маха — Википедия', url: 'https://ru.wikipedia.org/wiki/Число_Маха' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 Мах в км/ч', url: '/mah-v-km-ch?value=1&from=mach&to=kmh' },
    { value: '2 Маха в км/ч', url: '/mah-v-km-ch?value=2&from=mach&to=kmh' },
    { value: '0.8 Маха в км/ч', url: '/mah-v-km-ch?value=0.8&from=mach&to=kmh' }
  ]
};

export const kmhToMach: Calculator = {
  id: 'speed-kmh-mach',
  slug: 'km-ch-v-mah',
  title: 'Км/ч в махи',
  description: 'Конвертер скорости: перевод километров в час в числа Маха',
  category: 'konvertery',
  subcategory: 'conv-skorost',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Скорость', type: 'number', placeholder: '1225', defaultValue: 1225 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'kmh', label: 'км/ч' }], defaultValue: 'kmh' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'mach', label: 'Махи' }], defaultValue: 'mach' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v)) return [{ value: '—', label: 'Результат' }];
    const r = v / 1225;
    return [{ value: `${v} км/ч = ${r.toFixed(4)} Маха`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите скорость в км/ч. Результат в числах Маха появится автоматически (при стандартных условиях).',
    about: 'Перевод скорости в числа Маха, удобный для авиации и аэродинамики.',
    formula: 'Маха = км/ч ÷ 1225 (при стандартных условиях)',
    faq: [
      { question: 'Сколько Махов в 1225 км/ч?', answer: '1225 км/ч ≈ 1 Мах (при стандартных условиях).' },
      { question: 'Что означает сверхзвуковая скорость?', answer: 'Сверхзвуковая скорость — это скорость выше 1 Маха (быстрее скорости звука).' }
    ],
    sources: [{ title: 'Число Маха — Википедия', url: 'https://ru.wikipedia.org/wiki/Число_Маха' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1225 км/ч в Мах', url: '/km-ch-v-mah?value=1225&from=kmh&to=mach' },
    { value: '2450 км/ч в Мах', url: '/km-ch-v-mah?value=2450&from=kmh&to=mach' },
    { value: '980 км/ч в Мах', url: '/km-ch-v-mah?value=980&from=kmh&to=mach' }
  ]
};

// ============================================================
// ОБЪЕМ (subcategory: conv-obem)
// ============================================================

export const literToMl: Calculator = {
  id: 'volume-l-ml',
  slug: 'litr-v-ml',
  title: 'Литры в миллилитры',
  description: 'Конвертер объёма: перевод литров в миллилитры',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'ml', label: 'мл — миллилитры' }], defaultValue: 'ml' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 1000;
    return [{ value: `${v} л = ${r.toFixed(2)} мл`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в литрах. Результат в миллилитрах появится автоматически.',
    about: 'Литр и миллилитр — метрические единицы объёма, широко используемые в кулинарии, медицине и торговле.',
    formula: 'мл = л × 1000',
    faq: [
      { question: 'Сколько миллилитров в 1 литре?', answer: '1 литр = 1000 миллилитров.' },
      { question: 'Сколько мл в стакане?', answer: 'Стандартный гранёный стакан = 250 мл.' }
    ],
    sources: [{ title: 'Литр — Википедия', url: 'https://ru.wikipedia.org/wiki/Литр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 л в мл', url: '/litr-v-ml?value=1&from=l&to=ml' },
    { value: '0.5 л в мл', url: '/litr-v-ml?value=0.5&from=l&to=ml' },
    { value: '2.5 л в мл', url: '/litr-v-ml?value=2.5&from=l&to=ml' }
  ]
};

export const mlToLiter: Calculator = {
  id: 'volume-ml-l',
  slug: 'ml-v-litr',
  title: 'Миллилитры в литры',
  description: 'Конвертер объёма: перевод миллилитров в литры',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1000', defaultValue: 1000, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'ml', label: 'мл — миллилитры' }], defaultValue: 'ml' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 1000;
    return [{ value: `${v} мл = ${r.toFixed(4)} л`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в миллилитрах. Результат в литрах появится автоматически.',
    about: 'Перевод небольших объёмов (миллилитры) в более крупные (литры).',
    formula: 'л = мл ÷ 1000',
    faq: [
      { question: 'Сколько литров в 500 мл?', answer: '500 мл = 0.5 литра.' },
      { question: 'Сколько литров в 250 мл?', answer: '250 мл = 0.25 литра.' }
    ],
    sources: [{ title: 'Литр — Википедия', url: 'https://ru.wikipedia.org/wiki/Литр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1000 мл в л', url: '/ml-v-litr?value=1000&from=ml&to=l' },
    { value: '500 мл в л', url: '/ml-v-litr?value=500&from=ml&to=l' },
    { value: '250 мл в л', url: '/ml-v-litr?value=250&from=ml&to=l' }
  ]
};

export const literToGallonUs: Calculator = {
  id: 'volume-l-gal-us',
  slug: 'litr-v-gallon',
  title: 'Литры в галлоны (US)',
  description: 'Конвертер объёма: перевод литров в американские галлоны',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'gal_us', label: 'гал (US) — галлоны США' }], defaultValue: 'gal_us' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 3.78541;
    return [{ value: `${v} л = ${r.toFixed(4)} гал (US)`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в литрах. Результат в галлонах (US) появится автоматически.',
    about: 'Американский галлон (US gallon) — единица объёма в США. 1 US галлон ≈ 3.785 литра.',
    formula: 'гал (US) = л ÷ 3.78541',
    faq: [
      { question: 'Сколько литров в 1 галлоне (US)?', answer: '1 US галлон ≈ 3.785 литра.' },
      { question: 'Чем US галлон отличается от UK галлона?', answer: 'US галлон ≈ 3.785 л, а британский (UK) галлон ≈ 4.546 л.' }
    ],
    sources: [{ title: 'Галлон — Википедия', url: 'https://ru.wikipedia.org/wiki/Галлон' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 л в галлоны (US)', url: '/litr-v-gallon?value=1&from=l&to=gal_us' },
    { value: '5 л в галлоны (US)', url: '/litr-v-gallon?value=5&from=l&to=gal_us' },
    { value: '10 л в галлоны (US)', url: '/litr-v-gallon?value=10&from=l&to=gal_us' }
  ]
};

export const gallonUsToLiter: Calculator = {
  id: 'volume-gal-us-l',
  slug: 'gallon-v-litr',
  title: 'Галлоны (US) в литры',
  description: 'Конвертер объёма: перевод американских галлонов в литры',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'gal_us', label: 'гал (US) — галлоны США' }], defaultValue: 'gal_us' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 3.78541;
    return [{ value: `${v} гал (US) = ${r.toFixed(4)} л`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в галлонах (US). Результат в литрах появится автоматически.',
    about: 'Перевод американских галлонов в литры. Полезно при покупке товаров в США или импорте жидкостей.',
    formula: 'л = гал (US) × 3.78541',
    faq: [
      { question: 'Сколько литров в 5 галлонах (US)?', answer: '5 US галлонов ≈ 18.927 литров.' },
      { question: 'Сколько литров в 10 галлонах (US)?', answer: '10 US галлонов ≈ 37.854 литра.' }
    ],
    sources: [{ title: 'Галлон — Википедия', url: 'https://ru.wikipedia.org/wiki/Галлон' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 галлон (US) в л', url: '/gallon-v-litr?value=1&from=gal_us&to=l' },
    { value: '5 галлонов (US) в л', url: '/gallon-v-litr?value=5&from=gal_us&to=l' },
    { value: '10 галлонов (US) в л', url: '/gallon-v-litr?value=10&from=gal_us&to=l' }
  ]
};

export const cubicMeterToLiter: Calculator = {
  id: 'volume-m3-l',
  slug: 'kub-metr-v-litr',
  title: 'Куб. метры в литры',
  description: 'Конвертер объёма: перевод кубических метров в литры',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'm3', label: 'м³ — кубические метры' }], defaultValue: 'm3' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 1000;
    return [{ value: `${v} м³ = ${r.toFixed(2)} л`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в кубических метрах. Результат в литрах появится автоматически.',
    about: 'Кубический метр — единица объёма в СИ. 1 м³ = 1000 литров. Используется в строительстве, логистике и водоснабжении.',
    formula: 'л = м³ × 1000',
    faq: [
      { question: 'Сколько литров в 1 кубическом метре?', answer: '1 м³ = 1000 литров.' },
      { question: 'Сколько литров в 0.1 м³?', answer: '0.1 м³ = 100 литров.' }
    ],
    sources: [{ title: 'Кубический метр — Википедия', url: 'https://ru.wikipedia.org/wiki/Кубический_метр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 м³ в л', url: '/kub-metr-v-litr?value=1&from=m3&to=l' },
    { value: '0.1 м³ в л', url: '/kub-metr-v-litr?value=0.1&from=m3&to=l' },
    { value: '2 м³ в л', url: '/kub-metr-v-litr?value=2&from=m3&to=l' }
  ]
};

export const literToCubicMeter: Calculator = {
  id: 'volume-l-m3',
  slug: 'litr-v-kub-metr',
  title: 'Литры в куб. метры',
  description: 'Конвертер объёма: перевод литров в кубические метры',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1000', defaultValue: 1000, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'm3', label: 'м³ — кубические метры' }], defaultValue: 'm3' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 1000;
    return [{ value: `${v} л = ${r.toFixed(4)} м³`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в литрах. Результат в кубических метрах появится автоматически.',
    about: 'Перевод литров в кубические метры, удобный для расчёта объёмов бассейнов, цистерн и помещений.',
    formula: 'м³ = л ÷ 1000',
    faq: [
      { question: 'Сколько м³ в 1000 литрах?', answer: '1000 литров = 1 м³.' },
      { question: 'Сколько м³ в 500 литрах?', answer: '500 литров = 0.5 м³.' }
    ],
    sources: [{ title: 'Кубический метр — Википедия', url: 'https://ru.wikipedia.org/wiki/Кубический_метр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1000 л в м³', url: '/litr-v-kub-metr?value=1000&from=l&to=m3' },
    { value: '500 л в м³', url: '/litr-v-kub-metr?value=500&from=l&to=m3' },
    { value: '100 л в м³', url: '/litr-v-kub-metr?value=100&from=l&to=m3' }
  ]
};

export const barrelToLiter: Calculator = {
  id: 'volume-bbl-l',
  slug: 'barrel-v-litr',
  title: 'Баррели (нефть) в литры',
  description: 'Конвертер объёма: перевод нефтяных баррелей в литры',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'bbl', label: 'баррели (нефть)' }], defaultValue: 'bbl' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 158.987;
    return [{ value: `${v} баррелей = ${r.toFixed(2)} л`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в нефтяных баррелях. Результат в литрах появится автоматически.',
    about: 'Нефтяной баррель (bbl) — стандартная единица объёма в нефтегазовой промышленности. 1 баррель ≈ 158.987 литров.',
    formula: 'л = баррели × 158.987',
    faq: [
      { question: 'Сколько литров в 1 нефтяном барреле?', answer: '1 нефтяной баррель ≈ 158.987 литров (42 US галлона).' },
      { question: 'Сколько баррелей в 1 тонне нефти?', answer: 'Зависит от плотности нефти. Для плотности ~850 кг/м³ 1 тонна ≈ 7.3 барреля.' }
    ],
    sources: [{ title: 'Баррель (нефтяной) — Википедия', url: 'https://ru.wikipedia.org/wiki/Баррель_(нефтяной)' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 баррель в л', url: '/barrel-v-litr?value=1&from=bbl&to=l' },
    { value: '2 барреля в л', url: '/barrel-v-litr?value=2&from=bbl&to=l' },
    { value: '0.5 барреля в л', url: '/barrel-v-litr?value=0.5&from=bbl&to=l' }
  ]
};

export const literToBarrel: Calculator = {
  id: 'volume-l-bbl',
  slug: 'litr-v-barrel',
  title: 'Литры в баррели (нефть)',
  description: 'Конвертер объёма: перевод литров в нефтяные баррели',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '159', defaultValue: 159, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'bbl', label: 'баррели (нефть)' }], defaultValue: 'bbl' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 158.987;
    return [{ value: `${v} л = ${r.toFixed(4)} баррелей`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в литрах. Результат в нефтяных баррелях появится автоматически.',
    about: 'Перевод литров в нефтяные баррели. Используется в энергетике, логистике и финансовых расчётах.',
    formula: 'баррели = л ÷ 158.987',
    faq: [
      { question: 'Сколько баррелей в 159 литрах?', answer: '159 литров ≈ 1 баррель.' },
      { question: 'Сколько баррелей в 1000 литрах?', answer: '1000 литров ≈ 6.29 баррелей.' }
    ],
    sources: [{ title: 'Баррель (нефтяной) — Википедия', url: 'https://ru.wikipedia.org/wiki/Баррель_(нефтяной)' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '159 л в баррели', url: '/litr-v-barrel?value=159&from=l&to=bbl' },
    { value: '318 л в баррели', url: '/litr-v-barrel?value=318&from=l&to=bbl' },
    { value: '79.5 л в баррели', url: '/litr-v-barrel?value=79.5&from=l&to=bbl' }
  ]
};

export const pintToLiter: Calculator = {
  id: 'volume-pt-l',
  slug: 'pinta-v-litr',
  title: 'Пинты в литры',
  description: 'Конвертер объёма: перевод пинт в литры',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'pt', label: 'пт — пинты (US)' }], defaultValue: 'pt' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 0.473176;
    return [{ value: `${v} пинт = ${r.toFixed(4)} л`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в пинтах. Результат в литрах появится автоматически.',
    about: 'Пинта (pint) — единица объёма в англоязычных странах. 1 US пинта ≈ 0.473 литра. Используется в кулинарии и торговле.',
    formula: 'л = пинты × 0.473176',
    faq: [
      { question: 'Сколько литров в 1 пинте (US)?', answer: '1 US пинта ≈ 0.473 литра.' },
      { question: 'Сколько литров в 2 пинтах?', answer: '2 пинты ≈ 0.946 литра (примерно 1 литр).' }
    ],
    sources: [{ title: 'Пинта — Википедия', url: 'https://ru.wikipedia.org/wiki/Пинта' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 пинта в л', url: '/pinta-v-litr?value=1&from=pt&to=l' },
    { value: '2 пинты в л', url: '/pinta-v-litr?value=2&from=pt&to=l' },
    { value: '4 пинты в л', url: '/pinta-v-litr?value=4&from=pt&to=l' }
  ]
};

export const literToPint: Calculator = {
  id: 'volume-l-pt',
  slug: 'litr-v-pinta',
  title: 'Литры в пинты',
  description: 'Конвертер объёма: перевод литров в пинты',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'pt', label: 'пт — пинты (US)' }], defaultValue: 'pt' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 0.473176;
    return [{ value: `${v} л = ${r.toFixed(4)} пинт`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в литрах. Результат в пинтах появится автоматически.',
    about: 'Перевод литров в пинты (US). Удобен для работы с американскими рецептами из англоязычных стран.',
    formula: 'пинты = л ÷ 0.473176',
    faq: [
      { question: 'Сколько пинт в 1 литре?', answer: '1 литр ≈ 2.113 пинты.' },
      { question: 'Сколько пинт в 0.5 литра?', answer: '0.5 литра ≈ 1.057 пинты.' }
    ],
    sources: [{ title: 'Пинта — Википедия', url: 'https://ru.wikipedia.org/wiki/Пинта' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 л в пинты', url: '/litr-v-pinta?value=1&from=l&to=pt' },
    { value: '0.5 л в пинты', url: '/litr-v-pinta?value=0.5&from=l&to=pt' },
    { value: '2 л в пинты', url: '/litr-v-pinta?value=2&from=l&to=pt' }
  ]
};

export const quartToLiter: Calculator = {
  id: 'volume-qt-l',
  slug: 'kvart-v-litr',
  title: 'Кварты в литры',
  description: 'Конвертер объёма: перевод кварт в литры',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'qt', label: 'кварт — кварты (US)' }], defaultValue: 'qt' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 0.946353;
    return [{ value: `${v} кварт = ${r.toFixed(4)} л`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в квартах. Результат в литрах появится автоматически.',
    about: 'Кварта (quart) — единица объёма, равная 2 пинтам или 1/4 галлона. 1 US кварта ≈ 0.946 литра.',
    formula: 'л = кварты × 0.946353',
    faq: [
      { question: 'Сколько литров в 1 кварте (US)?', answer: '1 US кварта ≈ 0.946 литра.' },
      { question: 'Сколько литров в 4 квартах?', answer: '4 кварты ≈ 3.785 литра (1 US галлон).' }
    ],
    sources: [{ title: 'Кварта — Википедия', url: 'https://ru.wikipedia.org/wiki/Кварта' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 кварт в л', url: '/kvart-v-litr?value=1&from=qt&to=l' },
    { value: '2 кварта в л', url: '/kvart-v-litr?value=2&from=qt&to=l' },
    { value: '4 кварта в л', url: '/kvart-v-litr?value=4&from=qt&to=l' }
  ]
};

export const literToQuart: Calculator = {
  id: 'volume-l-qt',
  slug: 'litr-v-kvart',
  title: 'Литры в кварты',
  description: 'Конвертер объёма: перевод литров в кварты',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'l', label: 'л — литры' }], defaultValue: 'l' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'qt', label: 'кварт — кварты (US)' }], defaultValue: 'qt' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 0.946353;
    return [{ value: `${v} л = ${r.toFixed(4)} кварт`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в литрах. Результат в квартах появится автоматически.',
    about: 'Перевод литров в кварты (US). Удобен для работы с американскими рецептами и инструкциями.',
    formula: 'кварты = л ÷ 0.946353',
    faq: [
      { question: 'Сколько кварт в 1 литре?', answer: '1 литр ≈ 1.057 кварт.' },
      { question: 'Сколько кварт в 4 литрах?', answer: '4 литра ≈ 4.227 кварт.' }
    ],
    sources: [{ title: 'Кварта — Википедия', url: 'https://ru.wikipedia.org/wiki/Кварта' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 л в кварты', url: '/litr-v-kvart?value=1&from=l&to=qt' },
    { value: '2 л в кварты', url: '/litr-v-kvart?value=2&from=l&to=qt' },
    { value: '4 л в кварты', url: '/litr-v-kvart?value=4&from=l&to=qt' }
  ]
};

export const fluidOzToMl: Calculator = {
  id: 'volume-floz-ml',
  slug: 'zhidk-unciya-v-ml',
  title: 'Жидкие унции в миллилитры',
  description: 'Конвертер объёма: перевод жидких унций в миллилитры',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'floz', label: 'fl oz — жидкие унции (US)' }], defaultValue: 'floz' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'ml', label: 'мл — миллилитры' }], defaultValue: 'ml' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 29.5735;
    return [{ value: `${v} fl oz = ${r.toFixed(2)} мл`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в жидких унциях. Результат в миллилитрах появится автоматически.',
    about: 'Жидкая унция (fluid ounce) — единица объёма, используемая в США и Великобритании. 1 US fl oz ≈ 29.57 мл.',
    formula: 'мл = fl oz × 29.5735',
    faq: [
      { question: 'Сколько мл в 1 жидкой унции (US)?', answer: '1 US fl oz ≈ 29.57 мл.' },
      { question: 'Сколько мл в 8 жидких унциях?', answer: '8 US fl oz ≈ 236.59 мл.' }
    ],
    sources: [{ title: 'Жидкая унция — Википедия', url: 'https://ru.wikipedia.org/wiki/Жидкая_унция' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 fl oz в мл', url: '/zhidk-unciya-v-ml?value=1&from=floz&to=ml' },
    { value: '8 fl oz в мл', url: '/zhidk-unciya-v-ml?value=8&from=floz&to=ml' },
    { value: '16 fl oz в мл', url: '/zhidk-unciya-v-ml?value=16&from=floz&to=ml' }
  ]
};

export const mlToFluidOz: Calculator = {
  id: 'volume-ml-floz',
  slug: 'ml-v-zhidk-unciya',
  title: 'Миллилитры в жидкие унции',
  description: 'Конвертер объёма: перевод миллилитров в жидкие унции',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Объём', type: 'number', placeholder: '30', defaultValue: 30, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'ml', label: 'мл — миллилитры' }], defaultValue: 'ml' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'floz', label: 'fl oz — жидкие унции (US)' }], defaultValue: 'floz' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 29.5735;
    return [{ value: `${v} мл = ${r.toFixed(4)} fl oz`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите объём в миллилитрах. Результат в жидких унциях появится автоматически.',
    about: 'Перевод миллилитров в жидкие унции (US). Полезен для работы с американскими рецептами и косметикой.',
    formula: 'fl oz = мл ÷ 29.5735',
    faq: [
      { question: 'Сколько жидких унций в 30 мл?', answer: '30 мл ≈ 1.014 fl oz.' },
      { question: 'Сколько жидких унций в 250 мл?', answer: '250 мл ≈ 8.454 fl oz.' }
    ],
    sources: [{ title: 'Жидкая унция — Википедия', url: 'https://ru.wikipedia.org/wiki/Жидкая_унция' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '30 мл в fl oz', url: '/ml-v-zhidk-unciya?value=30&from=ml&to=floz' },
    { value: '250 мл в fl oz', url: '/ml-v-zhidk-unciya?value=250&from=ml&to=floz' },
    { value: '500 мл в fl oz', url: '/ml-v-zhidk-unciya?value=500&from=ml&to=floz' }
  ]
};

// ============================================================
// ПЛОЩАДЬ (subcategory: conv-ploshchad)
// ============================================================

export const sqmToAre: Calculator = {
  id: 'area-sqm-are',
  slug: 'kv-metr-v-sotka',
  title: 'М² в сотки',
  description: 'Конвертер площади: перевод квадратных метров в сотки (ары)',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '100', defaultValue: 100, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'sqm', label: 'м² — квадратные метры' }], defaultValue: 'sqm' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'are', label: 'сотки — ары' }], defaultValue: 'are' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 100;
    return [{ value: `${v} м² = ${r.toFixed(4)} соток`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в квадратных метрах. Результат в сотках появится автоматически.',
    about: 'Сотка (ар) — единица площади, равная 100 квадратным метрам (10×10 м). Широко используется при продаже земельных участков.',
    formula: 'сотки = м² ÷ 100',
    faq: [
      { question: 'Сколько соток в 100 м²?', answer: '100 м² = 1 сотка.' },
      { question: 'Сколько соток в 1000 м²?', answer: '1000 м² = 10 соток.' }
    ],
    sources: [{ title: 'Сотка — Википедия', url: 'https://ru.wikipedia.org/wiki/Ар_(единица_измерения)' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '100 м² в сотки', url: '/kv-metr-v-sotka?value=100&from=sqm&to=are' },
    { value: '500 м² в сотки', url: '/kv-metr-v-sотка?value=500&from=sqm&to=are' },
    { value: '1000 м² в сотки', url: '/kv-metr-v-сотка?value=1000&from=sqm&to=are' }
  ]
};

export const areToSqm: Calculator = {
  id: 'area-are-sqm',
  slug: 'sotka-v-kv-metr',
  title: 'Сотки в м²',
  description: 'Конвертер площади: перевод соток (аров) в квадратные метры',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'are', label: 'сотки — ары' }], defaultValue: 'are' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'sqm', label: 'м² — квадратные метры' }], defaultValue: 'sqm' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 100;
    return [{ value: `${v} соток = ${r.toFixed(2)} м²`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в сотках. Результат в квадратных метрах появится автоматически.',
    about: 'Сотка — популярная единица для измерения дачных и сельскохозяйственных участков в России и СНГ.',
    formula: 'м² = сотки × 100',
    faq: [
      { question: 'Сколько м² в 1 сотке?', answer: '1 сотка = 100 м² (квадрат 10×10 м).' },
      { question: 'Сколько м² в 6 сотках?', answer: '6 соток = 600 м².' }
    ],
    sources: [{ title: 'Сотка — Википедия', url: 'https://ru.wikipedia.org/wiki/Ар_(единица_измерения)' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 сотка в м²', url: '/sotka-v-kv-metr?value=1&from=are&to=sqm' },
    { value: '5 соток в м²', url: '/sotka-v-kv-metr?value=5&from=are&to=sqm' },
    { value: '10 соток в м²', url: '/sotka-v-kv-metr?value=10&from=are&to=sqm' }
  ]
};

export const haToAre: Calculator = {
  id: 'area-ha-are',
  slug: 'gektar-v-sotka',
  title: 'Гектары в сотки',
  description: 'Конвертер площади: перевод гектаров в сотки (ары)',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'ha', label: 'га — гектары' }], defaultValue: 'ha' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'are', label: 'сотки — ары' }], defaultValue: 'are' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 100;
    return [{ value: `${v} га = ${r.toFixed(2)} соток`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в гектарах. Результат в сотках появится автоматически.',
    about: 'Гектар — крупная единица площади, равная 100 соткам или 10 000 м². Используется в сельском хозяйстве и кадастре.',
    formula: 'сотки = га × 100',
    faq: [
      { question: 'Сколько соток в 1 гектаре?', answer: '1 га = 100 соток.' },
      { question: 'Сколько соток в 5 гектарах?', answer: '5 га = 500 соток.' }
    ],
    sources: [{ title: 'Гектар — Википедия', url: 'https://ru.wikipedia.org/wiki/Гектар' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 га в сотки', url: '/gektar-v-sотка?value=1&from=ha&to=are' },
    { value: '5 га в сотки', url: '/gektar-v-сотка?value=5&from=ha&to=are' },
    { value: '10 га в сотки', url: '/gektar-v-сотка?value=10&from=ha&to=are' }
  ]
};

export const areToHa: Calculator = {
  id: 'area-are-ha',
  slug: 'sotka-v-gektar',
  title: 'Сотки в гектары',
  description: 'Конвертер площади: перевод соток (аров) в гектары',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '100', defaultValue: 100, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'are', label: 'сотки — ары' }], defaultValue: 'are' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'ha', label: 'га — гектары' }], defaultValue: 'ha' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 100;
    return [{ value: `${v} соток = ${r.toFixed(4)} га`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в сотках. Результат в гектарах появится автоматически.',
    about: 'Перевод соток в гектары. Удобен для оформления земельных документов и сельскохозяйственных расчётов.',
    formula: 'га = сотки ÷ 100',
    faq: [
      { question: 'Сколько гектаров в 100 сотках?', answer: '100 соток = 1 га.' },
      { question: 'Сколько гектаров в 500 сотках?', answer: '500 соток = 5 га.' }
    ],
    sources: [{ title: 'Гектар — Википедия', url: 'https://ru.wikipedia.org/wiki/Гектар' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '100 соток в га', url: '/sotka-v-gektar?value=100&from=are&to=ha' },
    { value: '500 соток в га', url: '/sotka-v-gektar?value=500&from=are&to=ha' },
    { value: '1000 соток в га', url: '/sotka-v-gektar?value=1000&from=are&to=ha' }
  ]
};

export const haToSqkm: Calculator = {
  id: 'area-ha-sqkm',
  slug: 'gektar-v-kv-km',
  title: 'Гектары в кв. км',
  description: 'Конвертер площади: перевод гектаров в квадратные километры',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '100', defaultValue: 100, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'ha', label: 'га — гектары' }], defaultValue: 'ha' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'sqkm', label: 'км² — квадратные километры' }], defaultValue: 'sqkm' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 100;
    return [{ value: `${v} га = ${r.toFixed(4)} км²`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в гектарах. Результат в квадратных километрах появится автоматически.',
    about: 'Квадратный километр — крупная единица площади, используемая для измерения территорий городов, лесов и полей.',
    formula: 'км² = га ÷ 100',
    faq: [
      { question: 'Сколько км² в 100 гектарах?', answer: '100 га = 1 км².' },
      { question: 'Сколько км² в 1 гектаре?', answer: '1 га = 0.01 км².' }
    ],
    sources: [{ title: 'Квадратный километр — Википедия', url: 'https://ru.wikipedia.org/wiki/Квадратный_километр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '100 га в км²', url: '/gektar-v-kv-km?value=100&from=ha&to=sqkm' },
    { value: '50 га в км²', url: '/gektar-v-kv-km?value=50&from=ha&to=sqkm' },
    { value: '200 га в км²', url: '/gektar-v-kv-km?value=200&from=ha&to=sqkm' }
  ]
};

export const sqkmToHa: Calculator = {
  id: 'area-sqkm-ha',
  slug: 'kv-km-v-gektar',
  title: 'Кв. км в гектары',
  description: 'Конвертер площади: перевод квадратных километров в гектары',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'sqkm', label: 'км² — квадратные километры' }], defaultValue: 'sqkm' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'ha', label: 'га — гектары' }], defaultValue: 'ha' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 100;
    return [{ value: `${v} км² = ${r.toFixed(2)} га`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в квадратных километрах. Результат в гектарах появится автоматически.',
    about: 'Перевод крупных площадей (км²) в гектары. Удобен для агрономических и лесничих расчётов.',
    formula: 'га = км² × 100',
    faq: [
      { question: 'Сколько гектаров в 1 км²?', answer: '1 км² = 100 га = 10 000 соток.' },
      { question: 'Сколько гектаров в 2 км²?', answer: '2 км² = 200 га.' }
    ],
    sources: [{ title: 'Квадратный километр — Википедия', url: 'https://ru.wikipedia.org/wiki/Квадратный_километр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 км² в га', url: '/kv-km-v-gektar?value=1&from=sqkm&to=ha' },
    { value: '0.5 км² в га', url: '/kv-km-v-gektar?value=0.5&from=sqkm&to=ha' },
    { value: '2 км² в га', url: '/kv-km-v-gektar?value=2&from=sqkm&to=ha' }
  ]
};

export const sqmToAcre: Calculator = {
  id: 'area-sqm-acre',
  slug: 'kv-metr-v-akr',
  title: 'М² в акры',
  description: 'Конвертер площади: перевод квадратных метров в акры',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '4047', defaultValue: 4047, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'sqm', label: 'м² — квадратные метры' }], defaultValue: 'sqm' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'acre', label: 'акры' }], defaultValue: 'acre' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 4046.86;
    return [{ value: `${v} м² = ${r.toFixed(4)} акров`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в квадратных метрах. Результат в акрах появится автоматически.',
    about: 'Акр — единица площади в англоязычных странах. 1 акр ≈ 4046.86 м² ≈ 40.47 соток. Используется в сельском хозяйстве и недвижимости.',
    formula: 'акры = м² ÷ 4046.86',
    faq: [
      { question: 'Сколько м² в 1 акре?', answer: '1 акр ≈ 4046.86 м².' },
      { question: 'Сколько соток в 1 акре?', answer: '1 акр ≈ 40.47 соток.' }
    ],
    sources: [{ title: 'Акр — Википедия', url: 'https://ru.wikipedia.org/wiki/Акр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '4047 м² в акры', url: '/kv-metr-v-akr?value=4047&from=sqm&to=acre' },
    { value: '10000 м² в акры', url: '/kv-metr-v-akr?value=10000&from=sqm&to=acre' },
    { value: '20000 м² в акры', url: '/kv-metr-v-akr?value=20000&from=sqm&to=acre' }
  ]
};

export const acreToSqm: Calculator = {
  id: 'area-acre-sqm',
  slug: 'akr-v-kv-metr',
  title: 'Акры в м²',
  description: 'Конвертер площади: перевод акров в квадратные метры',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'acre', label: 'акры' }], defaultValue: 'acre' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'sqm', label: 'м² — квадратные метры' }], defaultValue: 'sqm' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 4046.86;
    return [{ value: `${v} акров = ${r.toFixed(2)} м²`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в акрах. Результат в квадратных метрах появится автоматически.',
    about: 'Перевод акров в квадратные метры. Полезен при работе с зарубежной недвижимостью и сельскохозяйственными данными.',
    formula: 'м² = акры × 4046.86',
    faq: [
      { question: 'Сколько м² в 2 акрах?', answer: '2 акра ≈ 8093.71 м².' },
      { question: 'Сколько м² в 5 акрах?', answer: '5 акров ≈ 20 234.28 м².' }
    ],
    sources: [{ title: 'Акр — Википедия', url: 'https://ru.wikipedia.org/wiki/Акр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 акр в м²', url: '/akr-v-kv-metr?value=1&from=acre&to=sqm' },
    { value: '2 акра в м²', url: '/akr-v-kv-metr?value=2&from=acre&to=sqm' },
    { value: '5 акров в м²', url: '/akr-v-kv-metr?value=5&from=acre&to=sqm' }
  ]
};

export const sqcmToSqm: Calculator = {
  id: 'area-sqcm-sqm',
  slug: 'kv-sm-v-kv-metr',
  title: 'Кв. см в м²',
  description: 'Конвертер площади: перевод квадратных сантиметров в квадратные метры',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '10000', defaultValue: 10000, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'sqcm', label: 'см² — квадратные сантиметры' }], defaultValue: 'sqcm' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'sqm', label: 'м² — квадратные метры' }], defaultValue: 'sqm' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 10000;
    return [{ value: `${v} см² = ${r.toFixed(4)} м²`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в квадратных сантиметрах. Результат в квадратных метрах появится автоматически.',
    about: 'Квадратный сантиметр — мелкая единица площади. 1 м² = 10 000 см². Используется для измерения небольших поверхностей.',
    formula: 'м² = см² ÷ 10 000',
    faq: [
      { question: 'Сколько м² в 10 000 см²?', answer: '10 000 см² = 1 м².' },
      { question: 'Сколько м² в 5000 см²?', answer: '5000 см² = 0.5 м².' }
    ],
    sources: [{ title: 'Квадратный метр — Википедия', url: 'https://ru.wikipedia.org/wiki/Квадратный_метр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '10 000 см² в м²', url: '/kv-sm-v-kv-metr?value=10000&from=sqcm&to=sqm' },
    { value: '5000 см² в м²', url: '/kv-sm-v-kv-metr?value=5000&from=sqcm&to=sqm' },
    { value: '20 000 см² в м²', url: '/kv-sm-v-kv-metr?value=20000&from=sqcm&to=sqm' }
  ]
};

export const sqmToSqcm: Calculator = {
  id: 'area-sqm-sqcm',
  slug: 'kv-metr-v-kv-sm',
  title: 'М² в кв. см',
  description: 'Конвертер площади: перевод квадратных метров в квадратные сантиметры',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'sqm', label: 'м² — квадратные метры' }], defaultValue: 'sqm' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'sqcm', label: 'см² — квадратные сантиметры' }], defaultValue: 'sqcm' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 10000;
    return [{ value: `${v} м² = ${r.toFixed(2)} см²`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в квадратных метрах. Результат в квадратных сантиметрах появится автоматически.',
    about: 'Перевод м² в см². Удобен для расчётов площади материалов, кожи, бумаги и мелких поверхностей.',
    formula: 'см² = м² × 10 000',
    faq: [
      { question: 'Сколько см² в 1 м²?', answer: '1 м² = 10 000 см².' },
      { question: 'Сколько см² в 0.5 м²?', answer: '0.5 м² = 5000 см².' }
    ],
    sources: [{ title: 'Квадратный метр — Википедия', url: 'https://ru.wikipedia.org/wiki/Квадратный_метр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 м² в см²', url: '/kv-metr-v-kv-sm?value=1&from=sqm&to=sqcm' },
    { value: '0.5 м² в см²', url: '/kv-metr-v-kv-sm?value=0.5&from=sqm&to=sqcm' },
    { value: '2 м² в см²', url: '/kv-metr-v-kv-sm?value=2&from=sqm&to=sqcm' }
  ]
};

export const sqmmToSqcm: Calculator = {
  id: 'area-sqmm-sqcm',
  slug: 'kv-mm-v-kv-sm',
  title: 'Кв. мм в кв. см',
  description: 'Конвертер площади: перевод квадратных миллиметров в квадратные сантиметры',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '100', defaultValue: 100, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'sqmm', label: 'мм² — квадратные миллиметры' }], defaultValue: 'sqmm' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'sqcm', label: 'см² — квадратные сантиметры' }], defaultValue: 'sqcm' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v / 100;
    return [{ value: `${v} мм² = ${r.toFixed(4)} см²`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в квадратных миллиметрах. Результат в квадратных сантиметрах появится автоматически.',
    about: 'Квадратный миллиметр — очень маленькая единица площади. 1 см² = 100 мм². Используется в инженерии, медицине и микроэлектронике.',
    formula: 'см² = мм² ÷ 100',
    faq: [
      { question: 'Сколько см² в 100 мм²?', answer: '100 мм² = 1 см².' },
      { question: 'Сколько см² в 50 мм²?', answer: '50 мм² = 0.5 см².' }
    ],
    sources: [{ title: 'Квадратный сантиметр — Википедия', url: 'https://ru.wikipedia.org/wiki/Квадратный_сантиметр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '100 мм² в см²', url: '/kv-mm-v-kv-sm?value=100&from=sqmm&to=sqcm' },
    { value: '50 мм² в см²', url: '/kv-mm-v-kv-sm?value=50&from=sqmm&to=sqcm' },
    { value: '200 мм² в см²', url: '/kv-mm-v-kv-sm?value=200&from=sqmm&to=sqcm' }
  ]
};

export const sqcmToSqmm: Calculator = {
  id: 'area-sqcm-sqmm',
  slug: 'kv-sm-v-kv-mm',
  title: 'Кв. см в кв. мм',
  description: 'Конвертер площади: перевод квадратных сантиметров в квадратные миллиметры',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Площадь', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'sqcm', label: 'см² — квадратные сантиметры' }], defaultValue: 'sqcm' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'sqmm', label: 'мм² — квадратные миллиметры' }], defaultValue: 'sqmm' }
  ],
  outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
  calculate: (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0) return [{ value: '—', label: 'Результат' }];
    const r = v * 100;
    return [{ value: `${v} см² = ${r.toFixed(2)} мм²`, label: 'Результат' }];
  },
  content: {
    howTo: 'Введите площадь в квадратных сантиметрах. Результат в квадратных миллиметрах появится автоматически.',
    about: 'Перевод см² в мм². Применяется в точных инженерных расчётах, печатных платах и медицинских измерениях.',
    formula: 'мм² = см² × 100',
    faq: [
      { question: 'Сколько мм² в 1 см²?', answer: '1 см² = 100 мм².' },
      { question: 'Сколько мм² в 0.5 см²?', answer: '0.5 см² = 50 мм².' }
    ],
    sources: [{ title: 'Квадратный сантиметр — Википедия', url: 'https://ru.wikipedia.org/wiki/Квадратный_сантиметр' }],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 см² в мм²', url: '/kv-sm-v-kv-mm?value=1&from=sqcm&to=sqmm' },
    { value: '0.5 см² в мм²', url: '/kv-sm-v-kv-mm?value=0.5&from=sqcm&to=sqmm' },
    { value: '2 см² в мм²', url: '/kv-sm-v-kv-mm?value=2&from=sqcm&to=sqmm' }
  ]
};

// ============================================================
// ЭКСПОРТ
// ============================================================

export const tempSpeedVolumeAreaConverters: Calculator[] = [
  // Температура
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  celsiusToKelvin,
  kelvinToCelsius,
  fahrenheitToKelvin,
  kelvinToFahrenheit,
  reaumurToCelsius,
  celsiusToReaumur,
  // Скорость
  kmhToMs,
  msToKmh,
  kmhToMph,
  mphToKmh,
  knotToKmh,
  kmhToKnot,
  machToKmh,
  kmhToMach,
  // Объём
  literToMl,
  mlToLiter,
  literToGallonUs,
  gallonUsToLiter,
  cubicMeterToLiter,
  literToCubicMeter,
  barrelToLiter,
  literToBarrel,
  pintToLiter,
  literToPint,
  quartToLiter,
  literToQuart,
  fluidOzToMl,
  mlToFluidOz,
  // Площадь
  sqmToAre,
  areToSqm,
  haToAre,
  areToHa,
  haToSqkm,
  sqkmToHa,
  sqmToAcre,
  acreToSqm,
  sqcmToSqm,
  sqmToSqcm,
  sqmmToSqcm,
  sqcmToSqmm
];
