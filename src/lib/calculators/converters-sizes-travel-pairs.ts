import { Calculator } from '../types';

// =============================================================================
// 1. РАЗМЕРЫ ОДЕЖДЫ (subcategory: 'conv-odezhda')
// =============================================================================

const clothesUS2EU: Record<string, string> = {
  'XS': 'XS (34)', 'S': 'S (36)', 'M': 'M (38-40)', 'L': 'L (42)', 'XL': 'XL (44)', 'XXL': 'XXL (46)', '3XL': '3XL (48-50)', '4XL': '4XL (52)'
};
const clothesEU2US: Record<string, string> = {
  '34': 'XS', '36': 'S', '38': 'M', '40': 'M', '42': 'L', '44': 'XL', '46': 'XXL', '48': '3XL', '50': '3XL', '52': '4XL'
};
const clothesEU2RU: Record<string, string> = {
  '34': '40', '36': '42', '38': '44', '40': '46', '42': '48', '44': '50', '46': '52', '48': '54', '50': '56', '52': '58'
};
const clothesRU2EU: Record<string, string> = {
  '40': '34', '42': '36', '44': '38', '46': '40', '48': '42', '50': '44', '52': '46', '54': '48', '56': '50', '58': '52'
};
const clothesUS2RU: Record<string, string> = {
  'XS': '40-42', 'S': '44', 'M': '46-48', 'L': '50', 'XL': '52', 'XXL': '54', '3XL': '56', '4XL': '58'
};
const clothesRU2US: Record<string, string> = {
  '40': 'XS', '42': 'XS-S', '44': 'S', '46': 'M', '48': 'M-L', '50': 'L', '52': 'XL', '54': 'XXL', '56': '3XL', '58': '4XL'
};

export const razmerOdezhdyUSvEU: Calculator = {
  id: 'razmer-odezhdy-us-v-eu',
  slug: 'razmer-odezhdy-us-v-eu',
  title: 'Размер одежды US в EU',
  description: 'Перевод размеров одежды из американской системы (US) в европейскую (EU)',
  category: 'konvertery',
  subcategory: 'conv-odezhda',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер US', type: 'select', options: [
      { value: 'XS', label: 'XS' }, { value: 'S', label: 'S' }, { value: 'M', label: 'M' },
      { value: 'L', label: 'L' }, { value: 'XL', label: 'XL' }, { value: 'XXL', label: 'XXL' },
      { value: '3XL', label: '3XL' }, { value: '4XL', label: '4XL' }
    ], defaultValue: 'M' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' }
  ],
  outputs: [{ name: 'result', label: 'Размер EU', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesUS2EU[v] || 'Неизвестный размер', label: 'Размер EU' }];
  },
  content: {
    howTo: 'Выберите размер в американской системе. Калькулятор покажет соответствующий европейский размер.',
    about: 'Американские размеры одежды часто отличаются от европейских. Конвертер помогает подобрать правильный размер при покупке за рубежом.',
    formula: 'Табличное соответствие: XS→34, S→36, M→38-40, L→42, XL→44, XXL→46.',
    faq: [
      { question: 'Отличаются ли мужские и женские размеры?', answer: 'Да, женские размеры в EU обычно на 2-4 единицы меньше для того же обозначения. Этот конвертер даёт ориентировочное соответствие.' },
      { question: 'Почему размеры различаются у разных брендов?', answer: 'Каждый бренд использует свои лекала. Конвертер даёт среднее соответствие, перед покупкой смотрите размерную сетку производителя.' }
    ],
    sources: [{ title: 'Международные размеры одежды', url: 'https://ru.wikipedia.org/wiki/Размеры_одежды' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'S в EU', url: '/razmer-odezhdy-us-v-eu?value=S' },
    { value: 'XL в EU', url: '/razmer-odezhdy-us-v-eu?value=XL' },
    { value: 'M в EU', url: '/razmer-odezhdy-us-v-eu?value=M' }
  ]
};

export const razmerOdezhdyEUvUS: Calculator = {
  id: 'razmer-odezhdy-eu-v-us',
  slug: 'razmer-odezhdy-eu-v-us',
  title: 'Размер одежды EU в US',
  description: 'Перевод размеров одежды из европейской системы (EU) в американскую (US)',
  category: 'konvertery',
  subcategory: 'conv-odezhda',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер EU', type: 'select', options: [
      { value: '34', label: '34' }, { value: '36', label: '36' }, { value: '38', label: '38' },
      { value: '40', label: '40' }, { value: '42', label: '42' }, { value: '44', label: '44' },
      { value: '46', label: '46' }, { value: '48', label: '48' }, { value: '50', label: '50' }, { value: '52', label: '52' }
    ], defaultValue: '42' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' }
  ],
  outputs: [{ name: 'result', label: 'Размер US', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesEU2US[v] || 'Неизвестный размер', label: 'Размер US' }];
  },
  content: {
    howTo: 'Выберите размер в европейской системе. Калькулятор покажет соответствующий американский размер.',
    about: 'Европейские размеры одежды числовые (34-52), тогда как американские используют буквенные обозначения.',
    formula: 'Табличное соответствие: 34→XS, 36→S, 38-40→M, 42→L, 44→XL, 46→XXL.',
    faq: [
      { question: 'Как узнать свой европейский размер?', answer: 'Измерьте обхват груди, талии и бёдер. Сравните с размерной сеткой европейских брендов.' },
      { question: 'Что делать, если между размерами?', answer: 'Выбирайте больший размер, если предпочитаете свободную посадку, или меньший для облегающего кроя.' }
    ],
    sources: [{ title: 'Международные размеры одежды', url: 'https://ru.wikipedia.org/wiki/Размеры_одежды' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '38 в US', url: '/razmer-odezhdy-eu-v-us?value=38' },
    { value: '42 в US', url: '/razmer-odezhdy-eu-v-us?value=42' },
    { value: '46 в US', url: '/razmer-odezhdy-eu-v-us?value=46' }
  ]
};

export const razmerOdezhdyEUvRU: Calculator = {
  id: 'razmer-odezhdy-eu-v-ru',
  slug: 'razmer-odezhdy-eu-v-ru',
  title: 'Размер одежды EU в RU',
  description: 'Перевод размеров одежды из европейской системы (EU) в российскую (RU)',
  category: 'konvertery',
  subcategory: 'conv-odezhda',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер EU', type: 'select', options: [
      { value: '34', label: '34' }, { value: '36', label: '36' }, { value: '38', label: '38' },
      { value: '40', label: '40' }, { value: '42', label: '42' }, { value: '44', label: '44' },
      { value: '46', label: '46' }, { value: '48', label: '48' }, { value: '50', label: '50' }, { value: '52', label: '52' }
    ], defaultValue: '42' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'ru', label: 'RU (Россия)' }], defaultValue: 'ru' }
  ],
  outputs: [{ name: 'result', label: 'Размер RU', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesEU2RU[v] || 'Неизвестный размер', label: 'Размер RU' }];
  },
  content: {
    howTo: 'Выберите европейский размер. Калькулятор покажет соответствующий российский размер.',
    about: 'Российские размеры одежды основаны на обхвате груди в сантиметрах (приблизительно +6-8 см к европейскому размеру).',
    formula: 'Табличное соответствие: EU 34→RU 40, 36→42, 38→44, 40→46, 42→48, 44→50, 46→52.',
    faq: [
      { question: 'Как точно определить свой российский размер?', answer: 'Измерьте обхват груди, талии и бёдер. Российский размер брюк = обхват талии в см (например, 48 = 48 см).' },
      { question: 'Совпадают ли мужские и женские размеры?', answer: 'Нет, они различаются. Женские размеры обычно меньше мужских при одинаковом числовом значении.' }
    ],
    sources: [{ title: 'Размеры одежды в России', url: 'https://ru.wikipedia.org/wiki/Размеры_одежды' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '36 в RU', url: '/razmer-odezhdy-eu-v-ru?value=36' },
    { value: '44 в RU', url: '/razmer-odezhdy-eu-v-ru?value=44' },
    { value: '50 в RU', url: '/razmer-odezhdy-eu-v-ru?value=50' }
  ]
};

export const razmerOdezhdyRUvEU: Calculator = {
  id: 'razmer-odezhdy-ru-v-eu',
  slug: 'razmer-odezhdy-ru-v-eu',
  title: 'Размер одежды RU в EU',
  description: 'Перевод размеров одежды из российской системы (RU) в европейскую (EU)',
  category: 'konvertery',
  subcategory: 'conv-odezhda',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер RU', type: 'select', options: [
      { value: '40', label: '40' }, { value: '42', label: '42' }, { value: '44', label: '44' },
      { value: '46', label: '46' }, { value: '48', label: '48' }, { value: '50', label: '50' },
      { value: '52', label: '52' }, { value: '54', label: '54' }, { value: '56', label: '56' }, { value: '58', label: '58' }
    ], defaultValue: '48' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'ru', label: 'RU (Россия)' }], defaultValue: 'ru' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' }
  ],
  outputs: [{ name: 'result', label: 'Размер EU', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesRU2EU[v] || 'Неизвестный размер', label: 'Размер EU' }];
  },
  content: {
    howTo: 'Выберите российский размер. Калькулятор покажет соответствующий европейский размер.',
    about: 'Российские размеры одежды примерно на 6-8 единиц больше европейских при том же физическом объёме.',
    formula: 'Табличное соответствие: RU 40→EU 34, 42→36, 44→38, 46→40, 48→42, 50→44, 52→46.',
    faq: [
      { question: 'Какой размер соответствует RU 48?', answer: 'RU 48 примерно соответствует EU 42 или US L.' },
      { question: 'Почему российские размеры больше европейских?', answer: 'Российская система основана на полуобхвате груди в сантиметрах с прибавкой, поэтому числа больше.' }
    ],
    sources: [{ title: 'Размеры одежды в России', url: 'https://ru.wikipedia.org/wiki/Размеры_одежды' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '44 в EU', url: '/razmer-odezhdy-ru-v-eu?value=44' },
    { value: '50 в EU', url: '/razmer-odezhdy-ru-v-eu?value=50' },
    { value: '52 в EU', url: '/razmer-odezhdy-ru-v-eu?value=52' }
  ]
};

export const razmerOdezhdyUSvRU: Calculator = {
  id: 'razmer-odezhdy-us-v-ru',
  slug: 'razmer-odezhdy-us-v-ru',
  title: 'Размер одежды US в RU',
  description: 'Перевод размеров одежды из американской системы (US) в российскую (RU)',
  category: 'konvertery',
  subcategory: 'conv-odezhda',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер US', type: 'select', options: [
      { value: 'XS', label: 'XS' }, { value: 'S', label: 'S' }, { value: 'M', label: 'M' },
      { value: 'L', label: 'L' }, { value: 'XL', label: 'XL' }, { value: 'XXL', label: 'XXL' },
      { value: '3XL', label: '3XL' }, { value: '4XL', label: '4XL' }
    ], defaultValue: 'M' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'ru', label: 'RU (Россия)' }], defaultValue: 'ru' }
  ],
  outputs: [{ name: 'result', label: 'Размер RU', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesUS2RU[v] || 'Неизвестный размер', label: 'Размер RU' }];
  },
  content: {
    howTo: 'Выберите американский размер. Калькулятор покажет соответствующий российский размер.',
    about: 'Американские буквенные размеры соответствуют российским числовым размерам с учётом обхвата груди.',
    formula: 'Табличное соответствие: XS→40-42, S→44, M→46-48, L→50, XL→52, XXL→54.',
    faq: [
      { question: 'Какой американский размер подходит для RU 50?', answer: 'RU 50 примерно соответствует американскому L.' },
      { question: 'Есть ли разница для мужчин и женщин?', answer: 'Да, женские американские размеры числовые (0-16), мужские — буквенные. Этот конвертер ориентирован на мужские/унисекс размеры.' }
    ],
    sources: [{ title: 'Размеры одежды', url: 'https://ru.wikipedia.org/wiki/Размеры_одежды' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'S в RU', url: '/razmer-odezhdy-us-v-ru?value=S' },
    { value: 'L в RU', url: '/razmer-odezhdy-us-v-ru?value=L' },
    { value: 'XL в RU', url: '/razmer-odezhdy-us-v-ru?value=XL' }
  ]
};

export const razmerOdezhdyRUvUS: Calculator = {
  id: 'razmer-odezhdy-ru-v-us',
  slug: 'razmer-odezhdy-ru-v-us',
  title: 'Размер одежды RU в US',
  description: 'Перевод размеров одежды из российской системы (RU) в американскую (US)',
  category: 'konvertery',
  subcategory: 'conv-odezhda',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер RU', type: 'select', options: [
      { value: '40', label: '40' }, { value: '42', label: '42' }, { value: '44', label: '44' },
      { value: '46', label: '46' }, { value: '48', label: '48' }, { value: '50', label: '50' },
      { value: '52', label: '52' }, { value: '54', label: '54' }, { value: '56', label: '56' }, { value: '58', label: '58' }
    ], defaultValue: '48' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'ru', label: 'RU (Россия)' }], defaultValue: 'ru' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' }
  ],
  outputs: [{ name: 'result', label: 'Размер US', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesRU2US[v] || 'Неизвестный размер', label: 'Размер US' }];
  },
  content: {
    howTo: 'Выберите российский размер. Калькулятор покажет соответствующий американский размер.',
    about: 'Российские размеры переводятся в американские буквенные обозначения. Женские размеры могут отличаться.',
    formula: 'Табличное соответствие: RU 40→XS, 44→S, 46→M, 50→L, 52→XL, 54→XXL.',
    faq: [
      { question: 'Какой US размер для RU 52?', answer: 'RU 52 примерно соответствует американскому XL.' },
      { question: 'Как быть с промежуточными размерами?', answer: 'Если ваш размер между значениями, выбирайте больший для свободной посадки или меньший для облегающей.' }
    ],
    sources: [{ title: 'Размеры одежды', url: 'https://ru.wikipedia.org/wiki/Размеры_одежды' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '44 в US', url: '/razmer-odezhdy-ru-v-us?value=44' },
    { value: '48 в US', url: '/razmer-odezhdy-ru-v-us?value=48' },
    { value: '52 в US', url: '/razmer-odezhdy-ru-v-us?value=52' }
  ]
};

// =============================================================================
// 2. РАЗМЕР ОБУВИ (subcategory: 'conv-obuv')
// =============================================================================

const shoesUS2EU: Record<string, string> = {
  '5': '35.5', '5.5': '36', '6': '36.5', '6.5': '37', '7': '37.5', '7.5': '38',
  '8': '38.5', '8.5': '39', '9': '40', '9.5': '40.5', '10': '41', '10.5': '42',
  '11': '42.5', '11.5': '43', '12': '44', '12.5': '44.5', '13': '45', '13.5': '46', '14': '46.5'
};
const shoesEU2US: Record<string, string> = {
  '35': '4.5', '35.5': '5', '36': '5.5', '36.5': '6', '37': '6.5', '37.5': '7', '38': '7.5',
  '38.5': '8', '39': '8.5', '40': '9', '40.5': '9.5', '41': '10', '42': '10.5',
  '42.5': '11', '43': '11.5', '44': '12', '44.5': '12.5', '45': '13', '46': '13.5', '46.5': '14'
};
const shoesUK2EU: Record<string, string> = {
  '2': '34.5', '2.5': '35', '3': '35.5', '3.5': '36', '4': '37', '4.5': '37.5',
  '5': '38', '5.5': '38.5', '6': '39', '6.5': '40', '7': '40.5', '7.5': '41',
  '8': '42', '8.5': '42.5', '9': '43', '9.5': '44', '10': '44.5', '10.5': '45',
  '11': '46', '11.5': '46.5', '12': '47', '13': '48'
};
const shoesEU2UK: Record<string, string> = {
  '34.5': '2', '35': '2.5', '35.5': '3', '36': '3.5', '37': '4', '37.5': '4.5', '38': '5',
  '38.5': '5.5', '39': '6', '40': '6.5', '40.5': '7', '41': '7.5', '42': '8',
  '42.5': '8.5', '43': '9', '44': '9.5', '44.5': '10', '45': '10.5', '46': '11', '46.5': '11.5', '47': '12', '48': '13'
};
const shoesUS2UK: Record<string, string> = {
  '5': '2.5', '5.5': '3', '6': '3.5', '6.5': '4', '7': '4.5', '7.5': '5',
  '8': '5.5', '8.5': '6', '9': '6.5', '9.5': '7', '10': '7.5', '10.5': '8',
  '11': '8.5', '11.5': '9', '12': '9.5', '12.5': '10', '13': '10.5', '13.5': '11', '14': '11.5'
};
const shoesUK2US: Record<string, string> = {
  '2': '4.5', '2.5': '5', '3': '5.5', '3.5': '6', '4': '6.5', '4.5': '7', '5': '7.5',
  '5.5': '8', '6': '8.5', '6.5': '9', '7': '9.5', '7.5': '10', '8': '10.5',
  '8.5': '11', '9': '11.5', '9.5': '12', '10': '12.5', '10.5': '13', '11': '13.5', '11.5': '14', '12': '14.5', '13': '15.5'
};

export const razmerObuviUSvEU: Calculator = {
  id: 'razmer-obuvi-us-v-eu',
  slug: 'razmer-obuvi-us-v-eu',
  title: 'Размер обуви US в EU',
  description: 'Перевод размера обуви из американской системы (US) в европейскую (EU)',
  category: 'konvertery',
  subcategory: 'conv-obuv',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер US (жен)', type: 'select', options: [
      { value: '5', label: '5' }, { value: '5.5', label: '5.5' }, { value: '6', label: '6' },
      { value: '6.5', label: '6.5' }, { value: '7', label: '7' }, { value: '7.5', label: '7.5' },
      { value: '8', label: '8' }, { value: '8.5', label: '8.5' }, { value: '9', label: '9' },
      { value: '9.5', label: '9.5' }, { value: '10', label: '10' }, { value: '10.5', label: '10.5' },
      { value: '11', label: '11' }, { value: '11.5', label: '11.5' }, { value: '12', label: '12' },
      { value: '12.5', label: '12.5' }, { value: '13', label: '13' }
    ], defaultValue: '8' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' }
  ],
  outputs: [{ name: 'result', label: 'Размер EU', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesUS2EU[v] || 'Неизвестный размер', label: 'Размер EU' }];
  },
  content: {
    howTo: 'Выберите американский размер обуви (женский). Калькулятор покажет европейский размер.',
    about: 'Американские размеры обуви для женщин отличаются от европейских на 30-33 единицы в зависимости от размера.',
    formula: 'Табличное соответствие: US 5→EU 35.5, 6→36.5, 7→37.5, 8→38.5, 9→40, 10→41, 11→42.5.',
    faq: [
      { question: 'Мужские и женские размеры отличаются?', answer: 'Да, мужские US размеры примерно на 1.5-2 больше женских при том же физическом размере. Этот конвертер использует женские размеры.' },
      { question: 'Как правильно измерить размер обуви?', answer: 'Измерьте длину стопы в сантиметрах (от пятки до большого пальца). EU размер примерно равен длине стопы в см × 1.5.' }
    ],
    sources: [{ title: 'Размеры обуви', url: 'https://ru.wikipedia.org/wiki/Размеры_обуви' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'US 7 в EU', url: '/razmer-obuvi-us-v-eu?value=7' },
    { value: 'US 9 в EU', url: '/razmer-obuvi-us-v-eu?value=9' },
    { value: 'US 10 в EU', url: '/razmer-obuvi-us-v-eu?value=10' }
  ]
};

export const razmerObuviEUvUS: Calculator = {
  id: 'razmer-obuvi-eu-v-us',
  slug: 'razmer-obuvi-eu-v-us',
  title: 'Размер обуви EU в US',
  description: 'Перевод размера обуви из европейской системы (EU) в американскую (US)',
  category: 'konvertery',
  subcategory: 'conv-obuv',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер EU', type: 'select', options: [
      { value: '35', label: '35' }, { value: '35.5', label: '35.5' }, { value: '36', label: '36' },
      { value: '36.5', label: '36.5' }, { value: '37', label: '37' }, { value: '37.5', label: '37.5' },
      { value: '38', label: '38' }, { value: '38.5', label: '38.5' }, { value: '39', label: '39' },
      { value: '40', label: '40' }, { value: '40.5', label: '40.5' }, { value: '41', label: '41' },
      { value: '42', label: '42' }, { value: '42.5', label: '42.5' }, { value: '43', label: '43' },
      { value: '44', label: '44' }, { value: '44.5', label: '44.5' }, { value: '45', label: '45' },
      { value: '46', label: '46' }
    ], defaultValue: '39' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' }
  ],
  outputs: [{ name: 'result', label: 'Размер US', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesEU2US[v] || 'Неизвестный размер', label: 'Размер US' }];
  },
  content: {
    howTo: 'Выберите европейский размер обуви. Калькулятор покажет американский размер.',
    about: 'Европейские размеры обуви (стихийная система) основаны на длине стопы в сантиметрах.',
    formula: 'Табличное соответствие: EU 36→US 5.5, 37→6.5, 38→7.5, 39→8.5, 40→9, 41→10, 42→10.5.',
    faq: [
      { question: 'Какой US размер для EU 42?', answer: 'EU 42 примерно соответствует женскому US 10.5 или мужскому US 9.' },
      { question: 'Что означают дробные размеры?', answer: 'Половинные размеры (например, 37.5) примерно на 4-5 мм длиннее целых размеров.' }
    ],
    sources: [{ title: 'Размеры обуви', url: 'https://ru.wikipedia.org/wiki/Размеры_обуви' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'EU 37 в US', url: '/razmer-obuvi-eu-v-us?value=37' },
    { value: 'EU 40 в US', url: '/razmer-obuvi-eu-v-us?value=40' },
    { value: 'EU 42 в US', url: '/razmer-obuvi-eu-v-us?value=42' }
  ]
};

export const razmerObuviUKvEU: Calculator = {
  id: 'razmer-obuvi-uk-v-eu',
  slug: 'razmer-obuvi-uk-v-eu',
  title: 'Размер обуви UK в EU',
  description: 'Перевод размера обуви из британской системы (UK) в европейскую (EU)',
  category: 'konvertery',
  subcategory: 'conv-obuv',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер UK', type: 'select', options: [
      { value: '3', label: '3' }, { value: '3.5', label: '3.5' }, { value: '4', label: '4' },
      { value: '4.5', label: '4.5' }, { value: '5', label: '5' }, { value: '5.5', label: '5.5' },
      { value: '6', label: '6' }, { value: '6.5', label: '6.5' }, { value: '7', label: '7' },
      { value: '7.5', label: '7.5' }, { value: '8', label: '8' }, { value: '8.5', label: '8.5' },
      { value: '9', label: '9' }, { value: '9.5', label: '9.5' }, { value: '10', label: '10' },
      { value: '10.5', label: '10.5' }, { value: '11', label: '11' }, { value: '12', label: '12' }, { value: '13', label: '13' }
    ], defaultValue: '6' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'uk', label: 'UK (Британия)' }], defaultValue: 'uk' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' }
  ],
  outputs: [{ name: 'result', label: 'Размер EU', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesUK2EU[v] || 'Неизвестный размер', label: 'Размер EU' }];
  },
  content: {
    howTo: 'Выберите британский размер обуви. Калькулятор покажет европейский размер.',
    about: 'Британские размеры обуви отличаются от европейских. Мужские и женские британские размеры также различаются.',
    formula: 'Табличное соответствие: UK 3→EU 35.5, 4→37, 5→38, 6→39, 7→40.5, 8→42, 9→43, 10→44.5, 11→46.',
    faq: [
      { question: 'UK размеры для мужчин и женщин разные?', answer: 'Да, при одинаковом номере женский UK размер примерно на 1.5 меньше мужского по длине стопы.' },
      { question: 'Какой EU размер для UK 7?', answer: 'UK 7 (женский) примерно соответствует EU 40.5.' }
    ],
    sources: [{ title: 'Размеры обуви', url: 'https://ru.wikipedia.org/wiki/Размеры_обуви' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'UK 5 в EU', url: '/razmer-obuvi-uk-v-eu?value=5' },
    { value: 'UK 7 в EU', url: '/razmer-obuvi-uk-v-eu?value=7' },
    { value: 'UK 9 в EU', url: '/razmer-obuvi-uk-v-eu?value=9' }
  ]
};

export const razmerObuviEUvUK: Calculator = {
  id: 'razmer-obuvi-eu-v-uk',
  slug: 'razmer-obuvi-eu-v-uk',
  title: 'Размер обуви EU в UK',
  description: 'Перевод размера обуви из европейской системы (EU) в британскую (UK)',
  category: 'konvertery',
  subcategory: 'conv-obuv',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер EU', type: 'select', options: [
      { value: '35', label: '35' }, { value: '35.5', label: '35.5' }, { value: '36', label: '36' },
      { value: '36.5', label: '36.5' }, { value: '37', label: '37' }, { value: '37.5', label: '37.5' },
      { value: '38', label: '38' }, { value: '38.5', label: '38.5' }, { value: '39', label: '39' },
      { value: '40', label: '40' }, { value: '40.5', label: '40.5' }, { value: '41', label: '41' },
      { value: '42', label: '42' }, { value: '42.5', label: '42.5' }, { value: '43', label: '43' },
      { value: '44', label: '44' }, { value: '44.5', label: '44.5' }, { value: '45', label: '45' },
      { value: '46', label: '46' }
    ], defaultValue: '39' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'uk', label: 'UK (Британия)' }], defaultValue: 'uk' }
  ],
  outputs: [{ name: 'result', label: 'Размер UK', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesEU2UK[v] || 'Неизвестный размер', label: 'Размер UK' }];
  },
  content: {
    howTo: 'Выберите европейский размер обуви. Калькулятор покажет британский размер.',
    about: 'Перевод европейских размеров в британскую систему. Учтите различия между мужской и женской шкалами.',
    formula: 'Табличное соответствие: EU 36→UK 3.5, 37→4, 38→5, 39→6, 40→6.5, 41→7.5, 42→8, 43→9, 44→9.5.',
    faq: [
      { question: 'Какой UK размер для EU 38?', answer: 'EU 38 примерно соответствует женскому UK 5 или мужскому UK 5.5.' },
      { question: 'Почему размеры не совпадают точно?', answer: 'Разные производители могут использовать разные лекала. Таблица даёт среднее соответствие.' }
    ],
    sources: [{ title: 'Размеры обуви', url: 'https://ru.wikipedia.org/wiki/Размеры_обуви' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'EU 38 в UK', url: '/razmer-obuvi-eu-v-uk?value=38' },
    { value: 'EU 40 в UK', url: '/razmer-obuvi-eu-v-uk?value=40' },
    { value: 'EU 42 в UK', url: '/razmer-obuvi-eu-v-uk?value=42' }
  ]
};

export const razmerObuviUSvUK: Calculator = {
  id: 'razmer-obuvi-us-v-uk',
  slug: 'razmer-obuvi-us-v-uk',
  title: 'Размер обуви US в UK',
  description: 'Перевод размера обуви из американской системы (US) в британскую (UK)',
  category: 'konvertery',
  subcategory: 'conv-obuv',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер US (жен)', type: 'select', options: [
      { value: '5', label: '5' }, { value: '5.5', label: '5.5' }, { value: '6', label: '6' },
      { value: '6.5', label: '6.5' }, { value: '7', label: '7' }, { value: '7.5', label: '7.5' },
      { value: '8', label: '8' }, { value: '8.5', label: '8.5' }, { value: '9', label: '9' },
      { value: '9.5', label: '9.5' }, { value: '10', label: '10' }, { value: '10.5', label: '10.5' },
      { value: '11', label: '11' }, { value: '11.5', label: '11.5' }, { value: '12', label: '12' },
      { value: '12.5', label: '12.5' }, { value: '13', label: '13' }
    ], defaultValue: '8' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'uk', label: 'UK (Британия)' }], defaultValue: 'uk' }
  ],
  outputs: [{ name: 'result', label: 'Размер UK', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesUS2UK[v] || 'Неизвестный размер', label: 'Размер UK' }];
  },
  content: {
    howTo: 'Выберите американский размер обуви (женский). Калькулятор покажет британский размер.',
    about: 'Американские и британские размеры обуви близки, но различаются на 0.5-2 размера в зависимости от системы.',
    formula: 'Табличное соответствие: US 5→UK 2.5, 6→3.5, 7→4.5, 8→5.5, 9→6.5, 10→7.5, 11→8.5, 12→9.5.',
    faq: [
      { question: 'Сколько разница между US и UK?', answer: 'Для женской обуви: UK ≈ US − 2.5. Для мужской: UK ≈ US − 1.' },
      { question: 'Какой UK размер для US 9?', answer: 'Женский US 9 примерно соответствует UK 6.5.' }
    ],
    sources: [{ title: 'Размеры обуви', url: 'https://ru.wikipedia.org/wiki/Размеры_обуви' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'US 7 в UK', url: '/razmer-obuvi-us-v-uk?value=7' },
    { value: 'US 9 в UK', url: '/razmer-obuvi-us-v-uk?value=9' },
    { value: 'US 10 в UK', url: '/razmer-obuvi-us-v-uk?value=10' }
  ]
};

export const razmerObuviUKvUS: Calculator = {
  id: 'razmer-obuvi-uk-v-us',
  slug: 'razmer-obuvi-uk-v-us',
  title: 'Размер обуви UK в US',
  description: 'Перевод размера обуви из британской системы (UK) в американскую (US)',
  category: 'konvertery',
  subcategory: 'conv-obuv',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер UK', type: 'select', options: [
      { value: '2', label: '2' }, { value: '2.5', label: '2.5' }, { value: '3', label: '3' },
      { value: '3.5', label: '3.5' }, { value: '4', label: '4' }, { value: '4.5', label: '4.5' },
      { value: '5', label: '5' }, { value: '5.5', label: '5.5' }, { value: '6', label: '6' },
      { value: '6.5', label: '6.5' }, { value: '7', label: '7' }, { value: '7.5', label: '7.5' },
      { value: '8', label: '8' }, { value: '8.5', label: '8.5' }, { value: '9', label: '9' },
      { value: '9.5', label: '9.5' }, { value: '10', label: '10' }, { value: '10.5', label: '10.5' },
      { value: '11', label: '11' }, { value: '11.5', label: '11.5' }, { value: '12', label: '12' }, { value: '13', label: '13' }
    ], defaultValue: '6' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'uk', label: 'UK (Британия)' }], defaultValue: 'uk' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' }
  ],
  outputs: [{ name: 'result', label: 'Размер US', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesUK2US[v] || 'Неизвестный размер', label: 'Размер US' }];
  },
  content: {
    howTo: 'Выберите британский размер обуви. Калькулятор покажет американский размер.',
    about: 'Перевод британских размеров в американские. Учтите, что женские и мужские размеры имеют разные соотношения.',
    formula: 'Табличное соответствие: UK 3→US 5.5, 4→US 6.5, 5→US 7.5, 6→US 8.5, 7→US 9.5, 8→US 10.5, 9→US 11.5.',
    faq: [
      { question: 'Какой US размер для UK 7?', answer: 'Женский UK 7 примерно соответствует US 9.5.' },
      { question: 'Детские размеры отличаются?', answer: 'Да, детские размеры имеют свои собственные шкалы, отличные от взрослых.' }
    ],
    sources: [{ title: 'Размеры обуви', url: 'https://ru.wikipedia.org/wiki/Размеры_обуви' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'UK 5 в US', url: '/razmer-obuvi-uk-v-us?value=5' },
    { value: 'UK 7 в US', url: '/razmer-obuvi-uk-v-us?value=7' },
    { value: 'UK 9 в US', url: '/razmer-obuvi-uk-v-us?value=9' }
  ]
};

// =============================================================================
// 3. ДЕТСКАЯ ОБУВЬ (subcategory: 'conv-detskaya-obuv')
// =============================================================================

const kidsShoesUS2EU: Record<string, string> = {
  '1': '16', '2': '17', '3': '18', '4': '19', '5': '20', '6': '22', '7': '23',
  '8': '24', '9': '25', '10': '27', '11': '28', '12': '30', '13': '31',
  '1Y': '32', '2Y': '33', '3Y': '34', '4Y': '35', '5Y': '36', '6Y': '37'
};
const kidsShoesEU2US: Record<string, string> = {
  '16': '1', '17': '2', '18': '3', '19': '4', '20': '5', '21': '5.5', '22': '6',
  '23': '7', '24': '8', '25': '9', '26': '9.5', '27': '10', '28': '11', '29': '11.5',
  '30': '12', '31': '13', '32': '1Y', '33': '2Y', '34': '3Y', '35': '4Y', '36': '5Y', '37': '6Y'
};

export const detskiyRazmerObuviUSvEU: Calculator = {
  id: 'detskiy-razmer-obuvi-us-v-eu',
  slug: 'detskiy-razmer-obuvi-us-v-eu',
  title: 'Детский размер обуви US в EU',
  description: 'Перевод детских размеров обуви из американской системы (US) в европейскую (EU)',
  category: 'konvertery',
  subcategory: 'conv-detskaya-obuv',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер US детский', type: 'select', options: [
      { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' },
      { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' },
      { value: '7', label: '7' }, { value: '8', label: '8' }, { value: '9', label: '9' },
      { value: '10', label: '10' }, { value: '11', label: '11' }, { value: '12', label: '12' },
      { value: '13', label: '13' }, { value: '1Y', label: '1Y (Youth)' }, { value: '2Y', label: '2Y' },
      { value: '3Y', label: '3Y' }, { value: '4Y', label: '4Y' }, { value: '5Y', label: '5Y' }, { value: '6Y', label: '6Y' }
    ], defaultValue: '8' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' }
  ],
  outputs: [{ name: 'result', label: 'Размер EU', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: kidsShoesUS2EU[v] || 'Неизвестный размер', label: 'Размер EU' }];
  },
  content: {
    howTo: 'Выберите американский детский размер обуви. Калькулятор покажет европейский размер.',
    about: 'Детские размеры обуви отличаются от взрослых и имеют свои собственные шкалы для младенцев, малышей и подростков.',
    formula: 'Табличное соответствие: US 1→EU 16, 4→19, 8→24, 10→27, 12→30, 1Y→32, 3Y→34, 5Y→36.',
    faq: [
      { question: 'Как измерить размер детской обуви?', answer: 'Поставьте ребёнка на лист бумаги, обведите стопу и измерьте длину. EU размер примерно равен длине стопы в мм, делённой на 6.6.' },
      { question: 'Сколько запаса оставлять в детской обуви?', answer: 'Рекомендуется запас 0.5-1 см для малышей и 0.5 см для детей постарше.' }
    ],
    sources: [{ title: 'Детские размеры обуви', url: 'https://ru.wikipedia.org/wiki/Размеры_обуви' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'US 8 в EU', url: '/detskiy-razmer-obuvi-us-v-eu?value=8' },
    { value: 'US 10 в EU', url: '/detskiy-razmer-obuvi-us-v-eu?value=10' },
    { value: 'US 3Y в EU', url: '/detskiy-razmer-obuvi-us-v-eu?value=3Y' }
  ]
};

export const detskiyRazmerObuviEUvUS: Calculator = {
  id: 'detskiy-razmer-obuvi-eu-v-us',
  slug: 'detskiy-razmer-obuvi-eu-v-us',
  title: 'Детский размер обуви EU в US',
  description: 'Перевод детских размеров обуви из европейской системы (EU) в американскую (US)',
  category: 'konvertery',
  subcategory: 'conv-detskaya-obuv',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер EU детский', type: 'select', options: [
      { value: '16', label: '16' }, { value: '17', label: '17' }, { value: '18', label: '18' },
      { value: '19', label: '19' }, { value: '20', label: '20' }, { value: '21', label: '21' },
      { value: '22', label: '22' }, { value: '23', label: '23' }, { value: '24', label: '24' },
      { value: '25', label: '25' }, { value: '26', label: '26' }, { value: '27', label: '27' },
      { value: '28', label: '28' }, { value: '29', label: '29' }, { value: '30', label: '30' },
      { value: '31', label: '31' }, { value: '32', label: '32' }, { value: '33', label: '33' },
      { value: '34', label: '34' }, { value: '35', label: '35' }, { value: '36', label: '36' }, { value: '37', label: '37' }
    ], defaultValue: '24' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' }
  ],
  outputs: [{ name: 'result', label: 'Размер US', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: kidsShoesEU2US[v] || 'Неизвестный размер', label: 'Размер US' }];
  },
  content: {
    howTo: 'Выберите европейский детский размер обуви. Калькулятор покажет американский размер.',
    about: 'Европейские детские размеры обуви основаны на длине стопы в сантиметрах. Американские используют свою шкалу.',
    formula: 'Табличное соответствие: EU 16→US 1, 19→US 4, 22→US 6, 24→US 8, 27→US 10, 30→US 12, 32→US 1Y, 34→US 3Y, 36→US 5Y.',
    faq: [
      { question: 'Какой US размер для EU 26?', answer: 'EU 26 примерно соответствует US 9.5 (малыш).' },
      { question: 'Когда детский размер переходит в подростковый?', answer: 'После US 13 (примерно EU 31) идут размеры Youth: 1Y, 2Y и т.д.' }
    ],
    sources: [{ title: 'Детские размеры обуви', url: 'https://ru.wikipedia.org/wiki/Размеры_обуви' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'EU 22 в US', url: '/detskiy-razmer-obuvi-eu-v-us?value=22' },
    { value: 'EU 27 в US', url: '/detskiy-razmer-obuvi-eu-v-us?value=27' },
    { value: 'EU 32 в US', url: '/detskiy-razmer-obuvi-eu-v-us?value=32' }
  ]
};

// =============================================================================
// 4. КОЛЬЦА (subcategory: 'conv-koltsa')
// =============================================================================

const ringUS2RU: Record<string, string> = {
  '4': '15.0', '4.5': '15.3', '5': '15.7', '5.5': '16.1', '6': '16.5',
  '6.5': '16.9', '7': '17.3', '7.5': '17.7', '8': '18.1', '8.5': '18.5',
  '9': '18.9', '9.5': '19.3', '10': '19.7', '10.5': '20.1', '11': '20.5',
  '11.5': '20.9', '12': '21.3', '12.5': '21.7', '13': '22.1'
};
const ringRU2US: Record<string, string> = {
  '15.0': '4', '15.3': '4.5', '15.7': '5', '16.1': '5.5', '16.5': '6',
  '16.9': '6.5', '17.3': '7', '17.7': '7.5', '18.1': '8', '18.5': '8.5',
  '18.9': '9', '19.3': '9.5', '19.7': '10', '20.1': '10.5', '20.5': '11',
  '20.9': '11.5', '21.3': '12', '21.7': '12.5', '22.1': '13'
};

export const razmerKoltsaUSvRU: Calculator = {
  id: 'razmer-koltsa-us-v-ru',
  slug: 'razmer-koltsa-us-v-ru',
  title: 'Размер кольца US в RU',
  description: 'Перевод размера кольца из американской системы (US) в российскую (RU) в миллиметрах',
  category: 'konvertery',
  subcategory: 'conv-koltsa',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер US', type: 'select', options: [
      { value: '4', label: '4' }, { value: '4.5', label: '4.5' }, { value: '5', label: '5' },
      { value: '5.5', label: '5.5' }, { value: '6', label: '6' }, { value: '6.5', label: '6.5' },
      { value: '7', label: '7' }, { value: '7.5', label: '7.5' }, { value: '8', label: '8' },
      { value: '8.5', label: '8.5' }, { value: '9', label: '9' }, { value: '9.5', label: '9.5' },
      { value: '10', label: '10' }, { value: '10.5', label: '10.5' }, { value: '11', label: '11' },
      { value: '11.5', label: '11.5' }, { value: '12', label: '12' }, { value: '12.5', label: '12.5' }, { value: '13', label: '13' }
    ], defaultValue: '7' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'ru', label: 'RU (Россия, мм)' }], defaultValue: 'ru' }
  ],
  outputs: [{ name: 'result', label: 'Размер RU (мм)', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: ringUS2RU[v] ? `${ringUS2RU[v]} мм` : 'Неизвестный размер', label: 'Размер RU' }];
  },
  content: {
    howTo: 'Выберите американский размер кольца. Калькулятор покажет российский размер в миллиметрах (диаметр).',
    about: 'Российский размер кольца — это внутренний диаметр кольца в миллиметрах. Американский размер — числовая шкала от 4 до 13+.',
    formula: 'Табличное соответствие: US 4→15.0 мм, 5→15.7 мм, 6→16.5 мм, 7→17.3 мм, 8→18.1 мм, 9→18.9 мм, 10→19.7 мм.',
    faq: [
      { question: 'Как измерить размер кольца в домашних условиях?', answer: 'Намотайте тонкую нить на палец, измерьте длину нити линейкой. Диаметр = длина / π. Или используйте существующее кольцо и линейку.' },
      { question: 'Что делать, если размер между значениями?', answer: 'Если палец тонкий, выбирайте меньший размер. Для широких костяшек — больший. Учтите, что пальцы немного увеличиваются к вечеру.' }
    ],
    sources: [{ title: 'Размеры колец', url: 'https://ru.wikipedia.org/wiki/Кольцо_(украшение)' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'US 6 в RU', url: '/razmer-koltsa-us-v-ru?value=6' },
    { value: 'US 8 в RU', url: '/razmer-koltsa-us-v-ru?value=8' },
    { value: 'US 10 в RU', url: '/razmer-koltsa-us-v-ru?value=10' }
  ]
};

export const razmerKoltsaRUvUS: Calculator = {
  id: 'razmer-koltsa-ru-v-us',
  slug: 'razmer-koltsa-ru-v-us',
  title: 'Размер кольца RU в US',
  description: 'Перевод размера кольца из российской системы (RU, мм) в американскую (US)',
  category: 'konvertery',
  subcategory: 'conv-koltsa',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Размер RU (мм)', type: 'select', options: [
      { value: '15.0', label: '15.0' }, { value: '15.3', label: '15.3' }, { value: '15.7', label: '15.7' },
      { value: '16.1', label: '16.1' }, { value: '16.5', label: '16.5' }, { value: '16.9', label: '16.9' },
      { value: '17.3', label: '17.3' }, { value: '17.7', label: '17.7' }, { value: '18.1', label: '18.1' },
      { value: '18.5', label: '18.5' }, { value: '18.9', label: '18.9' }, { value: '19.3', label: '19.3' },
      { value: '19.7', label: '19.7' }, { value: '20.1', label: '20.1' }, { value: '20.5', label: '20.5' },
      { value: '20.9', label: '20.9' }, { value: '21.3', label: '21.3' }, { value: '21.7', label: '21.7' }, { value: '22.1', label: '22.1' }
    ], defaultValue: '17.3' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'ru', label: 'RU (Россия, мм)' }], defaultValue: 'ru' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' }
  ],
  outputs: [{ name: 'result', label: 'Размер US', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: ringRU2US[v] || 'Неизвестный размер', label: 'Размер US' }];
  },
  content: {
    howTo: 'Выберите российский размер кольца (в мм). Калькулятор покажет американский размер.',
    about: 'Российский размер — это внутренний диаметр кольца в миллиметрах. Перевод в американский размер помогает при покупке за рубежом.',
    formula: 'Табличное соответствие: 15.0 мм→US 4, 15.7 мм→5, 16.5 мм→6, 17.3 мм→7, 18.1 мм→8, 18.9 мм→9, 19.7 мм→10.',
    faq: [
      { question: 'Какой американский размер для 17.3 мм?', answer: '17.3 мм примерно соответствует американскому размеру 7.' },
      { question: 'Можно ли уменьшить или увеличить кольцо?', answer: 'Большинство колец из золота и серебра можно уменьшить/увеличить на 1-2 размера у ювелира.' }
    ],
    sources: [{ title: 'Размеры колец', url: 'https://ru.wikipedia.org/wiki/Кольцо_(украшение)' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '17.3 мм в US', url: '/razmer-koltsa-ru-v-us?value=17.3' },
    { value: '18.1 мм в US', url: '/razmer-koltsa-ru-v-us?value=18.1' },
    { value: '19.7 мм в US', url: '/razmer-koltsa-ru-v-us?value=19.7' }
  ]
};

// =============================================================================
// 5. БЮСТГАЛЬТЕР (subcategory: 'conv-byustgalter')
// =============================================================================

const braEU2USBand: Record<string, string> = {
  '65': '30', '70': '32', '75': '34', '80': '36', '85': '38', '90': '40', '95': '42', '100': '44', '105': '46'
};
const braUS2EUBand: Record<string, string> = {
  '30': '65', '32': '70', '34': '75', '36': '80', '38': '85', '40': '90', '42': '95', '44': '100', '46': '105'
};
const braRU2USBand: Record<string, string> = {
  '65': '30', '70': '32', '75': '34', '80': '36', '85': '38', '90': '40', '95': '42', '100': '44', '105': '46'
};
const braUS2RUBand: Record<string, string> = {
  '30': '65', '32': '70', '34': '75', '36': '80', '38': '85', '40': '90', '42': '95', '44': '100', '46': '105'
};

export const razmerByustgalteraEUvUS: Calculator = {
  id: 'razmer-byustgaltera-eu-v-us',
  slug: 'razmer-byustgaltera-eu-v-us',
  title: 'Размер бюстгальтера EU в US',
  description: 'Перевод обхвата под грудью из европейской системы (EU) в американскую (US)',
  category: 'konvertery',
  subcategory: 'conv-byustgalter',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Обхват под грудью EU (см)', type: 'select', options: [
      { value: '65', label: '65 см' }, { value: '70', label: '70 см' }, { value: '75', label: '75 см' },
      { value: '80', label: '80 см' }, { value: '85', label: '85 см' }, { value: '90', label: '90 см' },
      { value: '95', label: '95 см' }, { value: '100', label: '100 см' }, { value: '105', label: '105 см' }
    ], defaultValue: '75' },
    { name: 'cup', label: 'Чашка', type: 'select', options: [
      { value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'C', label: 'C' },
      { value: 'D', label: 'D' }, { value: 'E', label: 'E (DD)' }, { value: 'F', label: 'F (DDD)' }
    ], defaultValue: 'B' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' }
  ],
  outputs: [{ name: 'result', label: 'Размер US', type: 'text' }],
  calculate: (inputs) => {
    const band = String(inputs.value);
    const cup = String(inputs.cup);
    const usBand = braEU2USBand[band];
    return [{ value: usBand ? `${usBand}${cup}` : 'Неизвестный размер', label: 'Размер US' }];
  },
  content: {
    howTo: 'Выберите обхват под грудью (EU) и чашку. Калькулятор покажет американский размер бюстгальтера.',
    about: 'Размер бюстгальтера состоит из обхвата под грудью (число) и объёма чашки (буква). Разные страны используют разные шкалы обхвата.',
    formula: 'EU 65→US 30, 70→32, 75→34, 80→36, 85→38, 90→40, 95→42. Чашка (A-F) остаётся той же.',
    faq: [
      { question: 'Как правильно измерить обхват под грудью?', answer: 'Измерьте обхват тела под грудью ленточкой. Лента должна быть плотно прилегающей, но не сдавливать. Запишите значение в сантиметрах.' },
      { question: 'Совпадают ли чашки в разных системах?', answer: 'В EU и US чашки примерно совпадают (A, B, C, D). В UK используется DD вместо E.' }
    ],
    sources: [{ title: 'Размеры бюстгальтеров', url: 'https://ru.wikipedia.org/wiki/Бюстгальтер' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '75B в US', url: '/razmer-byustgaltera-eu-v-us?value=75&cup=B' },
    { value: '85C в US', url: '/razmer-byustgaltera-eu-v-us?value=85&cup=C' },
    { value: '80D в US', url: '/razmer-byustgaltera-eu-v-us?value=80&cup=D' }
  ]
};

export const razmerByustgalteraUSvEU: Calculator = {
  id: 'razmer-byustgaltera-us-v-eu',
  slug: 'razmer-byustgaltera-us-v-eu',
  title: 'Размер бюстгальтера US в EU',
  description: 'Перевод обхвата под грудью из американской системы (US) в европейскую (EU)',
  category: 'konvertery',
  subcategory: 'conv-byustgalter',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Обхват под грудью US', type: 'select', options: [
      { value: '30', label: '30' }, { value: '32', label: '32' }, { value: '34', label: '34' },
      { value: '36', label: '36' }, { value: '38', label: '38' }, { value: '40', label: '40' },
      { value: '42', label: '42' }, { value: '44', label: '44' }, { value: '46', label: '46' }
    ], defaultValue: '34' },
    { name: 'cup', label: 'Чашка', type: 'select', options: [
      { value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'C', label: 'C' },
      { value: 'D', label: 'D' }, { value: 'DD', label: 'DD (E)' }, { value: 'DDD', label: 'DDD (F)' }
    ], defaultValue: 'B' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'eu', label: 'EU (Европа)' }], defaultValue: 'eu' }
  ],
  outputs: [{ name: 'result', label: 'Размер EU', type: 'text' }],
  calculate: (inputs) => {
    const band = String(inputs.value);
    const cup = String(inputs.cup);
    const euBand = braUS2EUBand[band];
    const cupMap: Record<string, string> = { 'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'DD': 'E', 'DDD': 'F' };
    return [{ value: euBand ? `${euBand}${cupMap[cup] || cup}` : 'Неизвестный размер', label: 'Размер EU' }];
  },
  content: {
    howTo: 'Выберите американский обхват под грудью и чашку. Калькулятор покажет европейский размер.',
    about: 'Американские размеры бюстгальтеров используют шкалу 30-46 для обхвата. Европейские — обхват в сантиметрах (65-105).',
    formula: 'US 30→EU 65, 32→70, 34→75, 36→80, 38→85, 40→90, 42→95. Чашки DD→E, DDD→F.',
    faq: [
      { question: 'Как определить правильную чашку?', answer: 'Измерьте обхват по наиболее выступающим точкам груди. Разность с обхватом под грудью: 10-12 см = A, 12-14 см = B, 14-16 см = C, 16-18 см = D.' },
      { question: 'Почему размеры разных брендов отличаются?', answer: 'Каждый бренд использует свои лекала. Таблица даёт ориентировочное соответствие. Перед покупкой смотрите размерную сетку.' }
    ],
    sources: [{ title: 'Размеры бюстгальтеров', url: 'https://ru.wikipedia.org/wiki/Бюстгальтер' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '34B в EU', url: '/razmer-byustgaltera-us-v-eu?value=34&cup=B' },
    { value: '36C в EU', url: '/razmer-byustgaltera-us-v-eu?value=36&cup=C' },
    { value: '38D в EU', url: '/razmer-byustgaltera-us-v-eu?value=38&cup=D' }
  ]
};

export const razmerByustgalteraRUvUS: Calculator = {
  id: 'razmer-byustgaltera-ru-v-us',
  slug: 'razmer-byustgaltera-ru-v-us',
  title: 'Размер бюстгальтера RU в US',
  description: 'Перевод обхвата под грудью из российской системы (RU) в американскую (US)',
  category: 'konvertery',
  subcategory: 'conv-byustgalter',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Обхват под грудью RU (см)', type: 'select', options: [
      { value: '65', label: '65 см' }, { value: '70', label: '70 см' }, { value: '75', label: '75 см' },
      { value: '80', label: '80 см' }, { value: '85', label: '85 см' }, { value: '90', label: '90 см' },
      { value: '95', label: '95 см' }, { value: '100', label: '100 см' }, { value: '105', label: '105 см' }
    ], defaultValue: '75' },
    { name: 'cup', label: 'Чашка', type: 'select', options: [
      { value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'C', label: 'C' },
      { value: 'D', label: 'D' }, { value: 'E', label: 'E' }, { value: 'F', label: 'F' }
    ], defaultValue: 'B' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'ru', label: 'RU (Россия)' }], defaultValue: 'ru' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' }
  ],
  outputs: [{ name: 'result', label: 'Размер US', type: 'text' }],
  calculate: (inputs) => {
    const band = String(inputs.value);
    const cup = String(inputs.cup);
    const usBand = braRU2USBand[band];
    const cupMap: Record<string, string> = { 'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'DD', 'F': 'DDD' };
    return [{ value: usBand ? `${usBand}${cupMap[cup] || cup}` : 'Неизвестный размер', label: 'Размер US' }];
  },
  content: {
    howTo: 'Выберите российский обхват под грудью и чашку. Калькулятор покажет американский размер.',
    about: 'Российские размеры бюстгальтеров используют обхват в сантиметрах (65-105). Американские — шкалу 30-46.',
    formula: 'RU 65→US 30, 70→32, 75→34, 80→36, 85→38, 90→40. Чашки E→DD, F→DDD.',
    faq: [
      { question: 'Какой US размер для RU 80C?', answer: 'RU 80C примерно соответствует US 36C.' },
      { question: 'В чём разница между RU и EU размерами?', answer: 'Для бюстгальтеров российские и европейские размеры совпадают (оба в сантиметрах).' }
    ],
    sources: [{ title: 'Размеры бюстгальтеров', url: 'https://ru.wikipedia.org/wiki/Бюстгальтер' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '75B в US', url: '/razmer-byustgaltera-ru-v-us?value=75&cup=B' },
    { value: '85C в US', url: '/razmer-byustgaltera-ru-v-us?value=85&cup=C' },
    { value: '90D в US', url: '/razmer-byustgaltera-ru-v-us?value=90&cup=D' }
  ]
};

export const razmerByustgalteraUSvRU: Calculator = {
  id: 'razmer-byustgaltera-us-v-ru',
  slug: 'razmer-byustgaltera-us-v-ru',
  title: 'Размер бюстгальтера US в RU',
  description: 'Перевод обхвата под грудью из американской системы (US) в российскую (RU)',
  category: 'konvertery',
  subcategory: 'conv-byustgalter',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Обхват под грудью US', type: 'select', options: [
      { value: '30', label: '30' }, { value: '32', label: '32' }, { value: '34', label: '34' },
      { value: '36', label: '36' }, { value: '38', label: '38' }, { value: '40', label: '40' },
      { value: '42', label: '42' }, { value: '44', label: '44' }, { value: '46', label: '46' }
    ], defaultValue: '34' },
    { name: 'cup', label: 'Чашка', type: 'select', options: [
      { value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'C', label: 'C' },
      { value: 'D', label: 'D' }, { value: 'DD', label: 'DD (E)' }, { value: 'DDD', label: 'DDD (F)' }
    ], defaultValue: 'B' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'us', label: 'US (США)' }], defaultValue: 'us' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'ru', label: 'RU (Россия)' }], defaultValue: 'ru' }
  ],
  outputs: [{ name: 'result', label: 'Размер RU', type: 'text' }],
  calculate: (inputs) => {
    const band = String(inputs.value);
    const cup = String(inputs.cup);
    const ruBand = braUS2RUBand[band];
    const cupMap: Record<string, string> = { 'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'DD': 'E', 'DDD': 'F' };
    return [{ value: ruBand ? `${ruBand}${cupMap[cup] || cup}` : 'Неизвестный размер', label: 'Размер RU' }];
  },
  content: {
    howTo: 'Выберите американский обхват под грудью и чашку. Калькулятор покажет российский размер.',
    about: 'Американские размеры переводятся в российские (в сантиметрах). Чашки DD→E, DDD→F.',
    formula: 'US 30→RU 65, 32→70, 34→75, 36→80, 38→85, 40→90. Чашки DD→E, DDD→F.',
    faq: [
      { question: 'Какой RU размер для US 34DD?', answer: 'US 34DD примерно соответствует RU 75E.' },
      { question: 'Сколько см в дюйме для обхвата?', answer: '1 дюйм = 2.54 см. Американские размеры бюстгальтера основаны на обхвате в дюймах с шагом 2 дюйма (≈5 см).' }
    ],
    sources: [{ title: 'Размеры бюстгальтеров', url: 'https://ru.wikipedia.org/wiki/Бюстгальтер' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '34B в RU', url: '/razmer-byustgaltera-us-v-ru?value=34&cup=B' },
    { value: '36C в RU', url: '/razmer-byustgaltera-us-v-ru?value=36&cup=C' },
    { value: '38DD в RU', url: '/razmer-byustgaltera-us-v-ru?value=38&cup=DD' }
  ]
};

// =============================================================================
// 6. ШИНЫ (subcategory: 'conv-shiny')
// =============================================================================

export const shirinaShinyVProfil: Calculator = {
  id: 'shirina-shiny-v-profil',
  slug: 'shirina-shiny-v-profil',
  title: 'Ширина шины в профиль',
  description: 'Расчёт высоты профиля шины в миллиметрах по ширине и проценту профиля',
  category: 'konvertery',
  subcategory: 'conv-shiny',
  type: 'converter',
  inputs: [
    { name: 'width', label: 'Ширина шины (мм)', type: 'select', options: [
      { value: '145', label: '145' }, { value: '155', label: '155' }, { value: '165', label: '165' },
      { value: '175', label: '175' }, { value: '185', label: '185' }, { value: '195', label: '195' },
      { value: '205', label: '205' }, { value: '215', label: '215' }, { value: '225', label: '225' },
      { value: '235', label: '235' }, { value: '245', label: '245' }, { value: '255', label: '255' },
      { value: '265', label: '265' }, { value: '275', label: '275' }, { value: '285', label: '285' },
      { value: '295', label: '295' }, { value: '305', label: '305' }, { value: '315', label: '315' },
      { value: '325', label: '325' }, { value: '335', label: '335' }
    ], defaultValue: '205' },
    { name: 'profile', label: 'Профиль (%)', type: 'select', options: [
      { value: '25', label: '25%' }, { value: '30', label: '30%' }, { value: '35', label: '35%' },
      { value: '40', label: '40%' }, { value: '45', label: '45%' }, { value: '50', label: '50%' },
      { value: '55', label: '55%' }, { value: '60', label: '60%' }, { value: '65', label: '65%' },
      { value: '70', label: '70%' }, { value: '75', label: '75%' }, { value: '80', label: '80%' },
      { value: '85', label: '85%' }
    ], defaultValue: '55' },
    { name: 'rim', label: 'Диаметр диска (дюймов)', type: 'select', options: [
      { value: '13', label: 'R13' }, { value: '14', label: 'R14' }, { value: '15', label: 'R15' },
      { value: '16', label: 'R16' }, { value: '17', label: 'R17' }, { value: '18', label: 'R18' },
      { value: '19', label: 'R19' }, { value: '20', label: 'R20' }, { value: '21', label: 'R21' }, { value: '22', label: 'R22' }
    ], defaultValue: '16' }
  ],
  outputs: [
    { name: 'height', label: 'Высота профиля (мм)', type: 'text' },
    { name: 'fullDiameter', label: 'Полный диаметр (мм)', type: 'text' }
  ],
  calculate: (inputs) => {
    const width = Number(inputs.width);
    const profile = Number(inputs.profile);
    const rim = Number(inputs.rim || 16);
    const height = Math.round(width * profile / 100);
    const fullDiameter = Math.round(height * 2 + rim * 25.4);
    return [
      { value: `${height} мм`, label: 'Высота профиля' },
      { value: `${fullDiameter} мм`, label: `Полный диаметр (R${rim})` }
    ];
  },
  content: {
    howTo: 'Выберите ширину шины (мм), процент профиля и диаметр диска. Калькулятор рассчитает высоту боковины в миллиметрах.',
    about: 'Маркировка шины, например 205/55 R16: 205 — ширина в мм, 55 — процент профиля от ширины, R16 — радиус диска в дюймах.',
    formula: 'Высота профиля = Ширина × (Профиль / 100). Полный диаметр = Высота × 2 + Диаметр диска × 25.4 мм.',
    faq: [
      { question: 'Что означает 205/55 R16?', answer: '205 мм — ширина, 55% — высота боковины от ширины, R16 — диск 16 дюймов.' },
      { question: 'Можно ли ставить шины с другим профилем?', answer: 'Да, но рекомендуется отклонение не более 3% в диаметре от штатного размера, иначе изменятся показания спидометра.' }
    ],
    sources: [{ title: 'Маркировка шин', url: 'https://ru.wikipedia.org/wiki/Автомобильная_шина' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '205/55 R16', url: '/shirina-shiny-v-profil?width=205&profile=55&rim=16' },
    { value: '225/45 R17', url: '/shirina-shiny-v-profil?width=225&profile=45&rim=17' },
    { value: '195/65 R15', url: '/shirina-shiny-v-profil?width=195&profile=65&rim=15' }
  ]
};

// =============================================================================
// 7. КАЛИБР ПРОВОДА (subcategory: 'conv-kalibr')
// =============================================================================

const awg2mm: Record<string, string> = {
  '0': '8.25', '1': '7.35', '2': '6.54', '3': '5.83', '4': '5.19',
  '5': '4.62', '6': '4.11', '7': '3.67', '8': '3.26', '9': '2.91',
  '10': '2.59', '11': '2.30', '12': '2.05', '13': '1.83', '14': '1.63',
  '15': '1.45', '16': '1.29', '17': '1.15', '18': '1.02', '19': '0.91',
  '20': '0.81', '21': '0.72', '22': '0.64', '23': '0.57', '24': '0.51',
  '25': '0.45', '26': '0.40', '27': '0.36', '28': '0.32', '29': '0.29',
  '30': '0.25', '31': '0.23', '32': '0.20', '33': '0.18', '34': '0.16',
  '35': '0.14', '36': '0.13', '37': '0.11', '38': '0.10', '39': '0.09', '40': '0.08'
};
const mm2awg: Record<string, string> = {
  '8.25': '0', '7.35': '1', '6.54': '2', '5.83': '3', '5.19': '4',
  '4.62': '5', '4.11': '6', '3.67': '7', '3.26': '8', '2.91': '9',
  '2.59': '10', '2.30': '11', '2.05': '12', '1.83': '13', '1.63': '14',
  '1.45': '15', '1.29': '16', '1.15': '17', '1.02': '18', '0.91': '19',
  '0.81': '20', '0.72': '21', '0.64': '22', '0.57': '23', '0.51': '24',
  '0.45': '25', '0.40': '26', '0.36': '27', '0.32': '28', '0.29': '29',
  '0.25': '30', '0.23': '31', '0.20': '32', '0.18': '33', '0.16': '34',
  '0.14': '35', '0.13': '36', '0.11': '37', '0.10': '38', '0.09': '39', '0.08': '40'
};

export const awgVmm: Calculator = {
  id: 'awg-v-mm',
  slug: 'awg-v-mm',
  title: 'AWG в мм',
  description: 'Перевод калибра провода AWG в диаметр в миллиметрах',
  category: 'konvertery',
  subcategory: 'conv-kalibr',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Калибр AWG', type: 'select', options: [
      { value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' },
      { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' },
      { value: '6', label: '6' }, { value: '7', label: '7' }, { value: '8', label: '8' },
      { value: '9', label: '9' }, { value: '10', label: '10' }, { value: '11', label: '11' },
      { value: '12', label: '12' }, { value: '13', label: '13' }, { value: '14', label: '14' },
      { value: '15', label: '15' }, { value: '16', label: '16' }, { value: '17', label: '17' },
      { value: '18', label: '18' }, { value: '19', label: '19' }, { value: '20', label: '20' },
      { value: '21', label: '21' }, { value: '22', label: '22' }, { value: '23', label: '23' },
      { value: '24', label: '24' }, { value: '25', label: '25' }, { value: '26', label: '26' },
      { value: '27', label: '27' }, { value: '28', label: '28' }, { value: '29', label: '29' },
      { value: '30', label: '30' }, { value: '31', label: '31' }, { value: '32', label: '32' },
      { value: '33', label: '33' }, { value: '34', label: '34' }, { value: '35', label: '35' },
      { value: '36', label: '36' }, { value: '37', label: '37' }, { value: '38', label: '38' },
      { value: '39', label: '39' }, { value: '40', label: '40' }
    ], defaultValue: '14' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'awg', label: 'AWG (American Wire Gauge)' }], defaultValue: 'awg' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'mm', label: 'мм (диаметр)' }], defaultValue: 'mm' }
  ],
  outputs: [{ name: 'result', label: 'Диаметр (мм)', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: awg2mm[v] ? `${awg2mm[v]} мм` : '—', label: 'Диаметр' }];
  },
  content: {
    howTo: 'Выберите калибр провода AWG. Калькулятор покажет диаметр в миллиметрах.',
    about: 'AWG (American Wire Gauge) — американская система обозначения диаметра проводов. Чем больше номер AWG, тем тоньше провод.',
    formula: 'd = 0.127 × 92^((36−n)/39) мм, где n — номер AWG.',
    faq: [
      { question: 'Что означает AWG 14?', answer: 'AWG 14 — провод диаметром около 1.63 мм. Часто используется для домашней проводки (15 Ампер).' },
      { question: 'Какой AWG для автомобильной проводки?', answer: 'AWG 16-18 для слаботочных цепей, AWG 10-12 для мощных потребителей.' }
    ],
    sources: [{ title: 'American Wire Gauge', url: 'https://ru.wikipedia.org/wiki/AWG' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: 'AWG 14 в мм', url: '/awg-v-mm?value=14' },
    { value: 'AWG 18 в мм', url: '/awg-v-mm?value=18' },
    { value: 'AWG 22 в мм', url: '/awg-v-mm?value=22' }
  ]
};

export const mmVawg: Calculator = {
  id: 'mm-v-awg',
  slug: 'mm-v-awg',
  title: 'мм в AWG',
  description: 'Перевод диаметра провода в миллиметрах в калибр AWG',
  category: 'konvertery',
  subcategory: 'conv-kalibr',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Диаметр (мм)', type: 'select', options: [
      { value: '8.25', label: '8.25' }, { value: '7.35', label: '7.35' }, { value: '6.54', label: '6.54' },
      { value: '5.83', label: '5.83' }, { value: '5.19', label: '5.19' }, { value: '4.62', label: '4.62' },
      { value: '4.11', label: '4.11' }, { value: '3.67', label: '3.67' }, { value: '3.26', label: '3.26' },
      { value: '2.91', label: '2.91' }, { value: '2.59', label: '2.59' }, { value: '2.30', label: '2.30' },
      { value: '2.05', label: '2.05' }, { value: '1.83', label: '1.83' }, { value: '1.63', label: '1.63' },
      { value: '1.45', label: '1.45' }, { value: '1.29', label: '1.29' }, { value: '1.15', label: '1.15' },
      { value: '1.02', label: '1.02' }, { value: '0.91', label: '0.91' }, { value: '0.81', label: '0.81' },
      { value: '0.72', label: '0.72' }, { value: '0.64', label: '0.64' }, { value: '0.57', label: '0.57' },
      { value: '0.51', label: '0.51' }, { value: '0.45', label: '0.45' }, { value: '0.40', label: '0.40' },
      { value: '0.36', label: '0.36' }, { value: '0.32', label: '0.32' }, { value: '0.29', label: '0.29' },
      { value: '0.25', label: '0.25' }, { value: '0.23', label: '0.23' }, { value: '0.20', label: '0.20' },
      { value: '0.18', label: '0.18' }, { value: '0.16', label: '0.16' }, { value: '0.14', label: '0.14' },
      { value: '0.13', label: '0.13' }, { value: '0.11', label: '0.11' }, { value: '0.10', label: '0.10' },
      { value: '0.09', label: '0.09' }, { value: '0.08', label: '0.08' }
    ], defaultValue: '1.63' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'mm', label: 'мм (диаметр)' }], defaultValue: 'mm' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'awg', label: 'AWG (American Wire Gauge)' }], defaultValue: 'awg' }
  ],
  outputs: [{ name: 'result', label: 'Калибр AWG', type: 'text' }],
  calculate: (inputs) => {
    const v = String(inputs.value);
    return [{ value: mm2awg[v] || 'Нет точного соответствия', label: 'AWG' }];
  },
  content: {
    howTo: 'Выберите диаметр провода в миллиметрах. Калькулятор покажет ближайший калибр AWG.',
    about: 'Перевод метрического диаметра провода в американский калибр AWG. Используется в электронике и электротехнике.',
    formula: 'n = 36 − 39 × log(d / 0.127) / log(92), где d — диаметр в мм.',
    faq: [
      { question: 'Какой AWG для провода 1 мм?', answer: 'Провод 1 мм примерно соответствует AWG 18 (1.02 мм).' },
      { question: 'Чем отличается AWG от mm²?', answer: 'AWG — диаметр, mm² — площадь сечения. Для круглого провода: S = π × d² / 4.' }
    ],
    sources: [{ title: 'American Wire Gauge', url: 'https://ru.wikipedia.org/wiki/AWG' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '1.63 мм в AWG', url: '/mm-v-awg?value=1.63' },
    { value: '1.02 мм в AWG', url: '/mm-v-awg?value=1.02' },
    { value: '0.51 мм в AWG', url: '/mm-v-awg?value=0.51' }
  ]
};

// =============================================================================
// 8. ЧАСОВЫЕ ПОЯСА (subcategory: 'conv-chasovoy-poyas')
// =============================================================================

const timezoneOffsets: Record<string, number> = {
  'UTC': 0, 'MSK': 3, 'CET': 1, 'EST': -5, 'PST': -8, 'JST': 9, 'AEST': 10, 'IST': 5.5, 'CST': 8
};

function parseTime(time: string, offsetFrom: number, offsetTo: number): { result: string; diffText: string } {
  const parts = time.split(':');
  if (parts.length !== 2) return { result: 'Некорректный формат', diffText: '' };
  let h = parseInt(parts[0], 10) - offsetFrom + offsetTo;
  const m = parseInt(parts[1], 10);
  if (isNaN(h) || isNaN(m) || m < 0 || m > 59) return { result: 'Некорректное время', diffText: '' };
  let dayShift = '';
  if (h >= 24) { h -= 24; dayShift = ' (след. день)'; }
  if (h < 0) { h += 24; dayShift = ' (пред. день)'; }
  const diff = offsetTo - offsetFrom;
  const diffText = diff > 0 ? `+${diff} ч` : diff < 0 ? `${diff} ч` : '0 ч';
  return { result: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}${dayShift}`, diffText };
}

export const utcVMoscow: Calculator = {
  id: 'utc-v-moscow',
  slug: 'utc-v-moscow',
  title: 'UTC в Москву',
  description: 'Перевод времени из UTC в московское время (MSK, UTC+3)',
  category: 'konvertery',
  subcategory: 'conv-chasovoy-poyas',
  type: 'converter',
  inputs: [
    { name: 'time', label: 'Время UTC', type: 'text', placeholder: '14:30', defaultValue: '12:00' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'utc', label: 'UTC' }], defaultValue: 'utc' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'msk', label: 'Москва (MSK, UTC+3)' }], defaultValue: 'msk' }
  ],
  outputs: [{ name: 'result', label: 'Время в Москве', type: 'text' }],
  calculate: (inputs) => {
    const { result } = parseTime(String(inputs.time), 0, 3);
    return [{ value: result, label: 'Время в Москве' }];
  },
  content: {
    howTo: 'Введите время в формате HH:MM по UTC. Калькулятор прибавит 3 часа для московского времени.',
    about: 'Москва находится в часовом поясе MSK (UTC+3). Время в Москве всегда на 3 часа больше UTC.',
    formula: 'MSK = UTC + 3 часа.',
    faq: [
      { question: 'Переходит ли Москва на летнее время?', answer: 'Нет, с 2014 года в России действует постоянное зимнее время (UTC+3) без перехода.' },
      { question: 'Как быстро перевести UTC в московское время?', answer: 'Просто прибавьте 3 часа. Например, 10:00 UTC = 13:00 в Москве.' }
    ],
    sources: [{ title: 'Часовые пояса России', url: 'https://ru.wikipedia.org/wiki/Московское_время' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '10:00 UTC', url: '/utc-v-moscow?time=10:00' },
    { value: '18:00 UTC', url: '/utc-v-moscow?time=18:00' },
    { value: '00:00 UTC', url: '/utc-v-moscow?time=00:00' }
  ]
};

export const moscowVUtc: Calculator = {
  id: 'moscow-v-utc',
  slug: 'moscow-v-utc',
  title: 'Москва в UTC',
  description: 'Перевод московского времени (MSK) в UTC',
  category: 'konvertery',
  subcategory: 'conv-chasovoy-poyas',
  type: 'converter',
  inputs: [
    { name: 'time', label: 'Время в Москве', type: 'text', placeholder: '14:30', defaultValue: '12:00' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'msk', label: 'Москва (MSK, UTC+3)' }], defaultValue: 'msk' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'utc', label: 'UTC' }], defaultValue: 'utc' }
  ],
  outputs: [{ name: 'result', label: 'Время UTC', type: 'text' }],
  calculate: (inputs) => {
    const { result } = parseTime(String(inputs.time), 3, 0);
    return [{ value: result, label: 'Время UTC' }];
  },
  content: {
    howTo: 'Введите московское время в формате HH:MM. Калькулятор вычтет 3 часа для получения UTC.',
    about: 'UTC (Coordinated Universal Time) — всемирное координированное время. Москва опережает UTC на 3 часа.',
    formula: 'UTC = MSK − 3 часа.',
    faq: [
      { question: 'Зачем переводить в UTC?', answer: 'UTC используется в авиации, IT, научных измерениях и международных переговорах как единый стандарт.' },
      { question: 'Сколько сейчас UTC?', answer: 'В любой момент UTC = московское время − 3 часа.' }
    ],
    sources: [{ title: 'UTC', url: 'https://ru.wikipedia.org/wiki/UTC' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '12:00 МСК', url: '/moscow-v-utc?time=12:00' },
    { value: '00:00 МСК', url: '/moscow-v-utc?time=00:00' },
    { value: '21:00 МСК', url: '/moscow-v-utc?time=21:00' }
  ]
};

export const utcVLocal: Calculator = {
  id: 'utc-v-local',
  slug: 'utc-v-local',
  title: 'UTC в местное время',
  description: 'Перевод UTC в местное время выбранного часового пояса',
  category: 'konvertery',
  subcategory: 'conv-chasovoy-poyas',
  type: 'converter',
  inputs: [
    { name: 'time', label: 'Время UTC', type: 'text', placeholder: '14:30', defaultValue: '12:00' },
    { name: 'timezone', label: 'Часовой пояс', type: 'select', options: [
      { value: 'UTC', label: 'UTC (0)' },
      { value: 'MSK', label: 'Москва MSK (+3)' },
      { value: 'CET', label: 'Центральная Европа CET (+1)' },
      { value: 'EST', label: 'Нью-Йорк EST (−5)' },
      { value: 'PST', label: 'Лос-Анджелес PST (−8)' },
      { value: 'JST', label: 'Токио JST (+9)' },
      { value: 'AEST', label: 'Сидней AEST (+10)' },
      { value: 'IST', label: 'Индия IST (+5.5)' },
      { value: 'CST', label: 'Китай CST (+8)' }
    ], defaultValue: 'MSK' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'utc', label: 'UTC' }], defaultValue: 'utc' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'local', label: 'Местное время' }], defaultValue: 'local' }
  ],
  outputs: [
    { name: 'result', label: 'Местное время', type: 'text' },
    { name: 'diff', label: 'Разница с UTC', type: 'text' }
  ],
  calculate: (inputs) => {
    const time = String(inputs.time);
    const tz = String(inputs.timezone);
    const offset = timezoneOffsets[tz] ?? 0;
    const { result, diffText } = parseTime(time, 0, offset);
    return [
      { value: result, label: 'Местное время' },
      { value: diffText, label: 'Разница с UTC' }
    ];
  },
  content: {
    howTo: 'Введите время UTC и выберите часовой пояс назначения. Калькулятор переведёт время и покажет разницу.',
    about: 'Мир разделён на 24 часовых пояса. UTC — единый эталон, от которого отсчитываются местные времена с учётом смещения.',
    formula: 'Местное время = UTC + смещение пояса.',
    faq: [
      { question: 'Сколько часовых поясов в России?', answer: '11 часовых поясов: от UTC+2 (Калининград) до UTC+12 (Камчатка, Чукотка).' },
      { question: 'Что такое летнее время?', answer: 'Перевод часов на час вперёд летом для экономии электроэнергии. Не все страны используют.' }
    ],
    sources: [{ title: 'Time Zone Map', url: 'https://www.timeanddate.com/time/map/' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '12:00 UTC → Москва', url: '/utc-v-local?time=12:00&timezone=MSK' },
    { value: '12:00 UTC → Токио', url: '/utc-v-local?time=12:00&timezone=JST' },
    { value: '12:00 UTC → Нью-Йорк', url: '/utc-v-local?time=12:00&timezone=EST' }
  ]
};

export const localVUtc: Calculator = {
  id: 'local-v-utc',
  slug: 'local-v-utc',
  title: 'Местное время в UTC',
  description: 'Перевод местного времени в UTC',
  category: 'konvertery',
  subcategory: 'conv-chasovoy-poyas',
  type: 'converter',
  inputs: [
    { name: 'time', label: 'Местное время', type: 'text', placeholder: '14:30', defaultValue: '12:00' },
    { name: 'timezone', label: 'Часовой пояс', type: 'select', options: [
      { value: 'UTC', label: 'UTC (0)' },
      { value: 'MSK', label: 'Москва MSK (+3)' },
      { value: 'CET', label: 'Центральная Европа CET (+1)' },
      { value: 'EST', label: 'Нью-Йорк EST (−5)' },
      { value: 'PST', label: 'Лос-Анджелес PST (−8)' },
      { value: 'JST', label: 'Токио JST (+9)' },
      { value: 'AEST', label: 'Сидней AEST (+10)' },
      { value: 'IST', label: 'Индия IST (+5.5)' },
      { value: 'CST', label: 'Китай CST (+8)' }
    ], defaultValue: 'MSK' },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'local', label: 'Местное время' }], defaultValue: 'local' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'utc', label: 'UTC' }], defaultValue: 'utc' }
  ],
  outputs: [
    { name: 'result', label: 'Время UTC', type: 'text' },
    { name: 'diff', label: 'Разница с UTC', type: 'text' }
  ],
  calculate: (inputs) => {
    const time = String(inputs.time);
    const tz = String(inputs.timezone);
    const offset = timezoneOffsets[tz] ?? 0;
    const { result, diffText } = parseTime(time, offset, 0);
    return [
      { value: result, label: 'Время UTC' },
      { value: diffText, label: 'Разница с UTC' }
    ];
  },
  content: {
    howTo: 'Введите местное время и выберите свой часовой пояс. Калькулятор переведёт в UTC.',
    about: 'Перевод местного времени обратно в UTC. Полезно для планирования международных звонков и рейсов.',
    formula: 'UTC = Местное время − смещение пояса.',
    faq: [
      { question: 'Как перевести время в другой пояс?', answer: 'Зная смещение своего пояса от UTC, вычтите его из местного времени, затем прибавьте смещение целевого пояса.' },
      { question: 'Почему UTC, а не GMT?', answer: 'UTC — современный стандарт, основанный на атомных часах. GMT — исторический эталон, практически совпадает с UTC.' }
    ],
    sources: [{ title: 'Time Zone Map', url: 'https://www.timeanddate.com/time/map/' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '12:00 МСК → UTC', url: '/local-v-utc?time=12:00&timezone=MSK' },
    { value: '18:00 Токио → UTC', url: '/local-v-utc?time=18:00&timezone=JST' },
    { value: '09:00 Нью-Йорк → UTC', url: '/local-v-utc?time=09:00&timezone=EST' }
  ]
};

// =============================================================================
// 9. БАГАЖ (subcategory: 'conv-bagazh')
// =============================================================================

export const kgBagazhaVFunty: Calculator = {
  id: 'kg-bagazha-v-funty',
  slug: 'kg-bagazha-v-funty',
  title: 'Кг багажа в фунты',
  description: 'Перевод веса багажа из килограммов в фунты (pounds)',
  category: 'konvertery',
  subcategory: 'conv-bagazh',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Вес (кг)', type: 'number', placeholder: '23', defaultValue: 23, min: 0, step: 0.1 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'kg', label: 'кг (килограммы)' }], defaultValue: 'kg' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'lb', label: 'lb (фунты)' }], defaultValue: 'lb' }
  ],
  outputs: [
    { name: 'result', label: 'Фунты', type: 'text' },
    { name: 'airlineInfo', label: 'Информация авиакомпаний', type: 'text' }
  ],
  calculate: (inputs) => {
    const kg = Number(inputs.value);
    if (!kg && kg !== 0) return [{ value: '—', label: 'Фунты' }, { value: '—', label: 'Информация' }];
    const lb = kg * 2.20462;
    let info = '';
    if (kg <= 5) info = 'Можно взять как ручную кладь в большинстве авиакомпаний.';
    else if (kg <= 10) info = 'Подходит для ручной клади в бюджетных авиакомпаниях.';
    else if (kg <= 23) info = 'Стандартный багаж в большинстве авиакомпаний (23 кг).';
    else if (kg <= 32) info = 'Тяжёлый багаж. Некоторые авиакомпании берут доплату за вес 24-32 кг.';
    else info = 'Сверхтяжёлый багаж. Почти всегда требуется доплата.';
    return [
      { value: `${lb.toFixed(2)} lb`, label: 'Фунты' },
      { value: info, label: 'Информация' }
    ];
  },
  content: {
    howTo: 'Введите вес багажа в килограммах. Калькулятор переведёт в фунты и подскажет, подходит ли это под стандартные нормы авиакомпаний.',
    about: 'Большинство авиакомпаний используют килограммы, но в США и Великобритании распространены фунты. 1 кг ≈ 2.205 lb.',
    formula: 'Фунты = Килограммы × 2.20462.',
    faq: [
      { question: 'Сколько фунтов в 23 кг?', answer: '23 кг ≈ 50.71 lb. Это стандартный лимит багажа во многих авиакомпаниях.' },
      { question: 'Какой лимит ручной клади в lb?', answer: 'Обычно 7-10 кг ≈ 15-22 lb, в зависимости от авиакомпании.' }
    ],
    sources: [{ title: 'Килограмм', url: 'https://ru.wikipedia.org/wiki/Килограмм' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '23 кг', url: '/kg-bagazha-v-funty?value=23' },
    { value: '10 кг', url: '/kg-bagazha-v-funty?value=10' },
    { value: '32 кг', url: '/kg-bagazha-v-funty?value=32' }
  ]
};

export const funtyBagazhaVKG: Calculator = {
  id: 'funty-bagazha-v-kg',
  slug: 'funty-bagazha-v-kg',
  title: 'Фунты багажа в кг',
  description: 'Перевод веса багажа из фунтов в килограммы',
  category: 'konvertery',
  subcategory: 'conv-bagazh',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Вес (lb)', type: 'number', placeholder: '50', defaultValue: 50, min: 0, step: 0.1 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'lb', label: 'lb (фунты)' }], defaultValue: 'lb' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'kg', label: 'кг (килограммы)' }], defaultValue: 'kg' }
  ],
  outputs: [
    { name: 'result', label: 'Килограммы', type: 'text' },
    { name: 'airlineInfo', label: 'Информация авиакомпаний', type: 'text' }
  ],
  calculate: (inputs) => {
    const lb = Number(inputs.value);
    if (!lb && lb !== 0) return [{ value: '—', label: 'Килограммы' }, { value: '—', label: 'Информация' }];
    const kg = lb / 2.20462;
    let info = '';
    if (kg <= 5) info = 'Можно взять как ручную кладь в большинстве авиакомпаний.';
    else if (kg <= 10) info = 'Подходит для ручной клади в бюджетных авиакомпаниях.';
    else if (kg <= 23) info = 'Стандартный багаж в большинстве авиакомпаний (23 кг).';
    else if (kg <= 32) info = 'Тяжёлый багаж. Некоторые авиакомпании берут доплату за вес 24-32 кг.';
    else info = 'Сверхтяжёлый багаж. Почти всегда требуется доплата.';
    return [
      { value: `${kg.toFixed(2)} кг`, label: 'Килограммы' },
      { value: info, label: 'Информация' }
    ];
  },
  content: {
    howTo: 'Введите вес багажа в фунтах. Калькулятор переведёт в килограммы и подскажет нормы авиакомпаний.',
    about: 'В США и Великобритании вес багажа часто указывается в фунтах. Для международных рейсов полезно знать эквивалент в килограммах.',
    formula: 'Килограммы = Фунты / 2.20462.',
    faq: [
      { question: 'Сколько кг в 50 lb?', answer: '50 lb ≈ 22.68 кг. Это близко к стандартному лимиту в 23 кг.' },
      { question: 'Какой лимит багажа в фунтах?', answer: 'Стандартный лимит 23 кг ≈ 50.7 lb. Тяжёлый багаж до 32 кг ≈ 70.5 lb.' }
    ],
    sources: [{ title: 'Фунт (единица измерения)', url: 'https://ru.wikipedia.org/wiki/Фунт_(единица_измерения)' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '50 lb', url: '/funty-bagazha-v-kg?value=50' },
    { value: '44 lb', url: '/funty-bagazha-v-kg?value=44' },
    { value: '70 lb', url: '/funty-bagazha-v-kg?value=70' }
  ]
};

// =============================================================================
// 10. ДАВЛЕНИЕ В ГОРАХ (subcategory: 'conv-vysota')
// =============================================================================

export const vysotaVDavlenie: Calculator = {
  id: 'vysota-v-davlenie',
  slug: 'vysota-v-davlenie',
  title: 'Высота в давление',
  description: 'Расчёт атмосферного давления на заданной высоте над уровнем моря',
  category: 'konvertery',
  subcategory: 'conv-vysota',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Высота (м)', type: 'number', placeholder: '3000', defaultValue: 3000, min: 0, max: 10000 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'm', label: 'м (высота)' }], defaultValue: 'm' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'kpa', label: 'кПа (давление)' }], defaultValue: 'kpa' }
  ],
  outputs: [
    { name: 'result', label: 'Давление (кПа)', type: 'text' },
    { name: 'mmHg', label: 'Давление (мм рт.ст.)', type: 'text' },
    { name: 'percent', label: '% от уровня моря', type: 'text' }
  ],
  calculate: (inputs) => {
    const h = Number(inputs.value);
    if (isNaN(h) || h < 0) return [
      { value: '—', label: 'Давление (кПа)' },
      { value: '—', label: 'Давление (мм рт.ст.)' },
      { value: '—', label: '% от уровня моря' }
    ];
    const p = 101.325 * Math.pow(1 - 0.0000225577 * h, 5.2551);
    const mmHg = p * 7.50062;
    const percent = (p / 101.325) * 100;
    return [
      { value: `${p.toFixed(1)} кПа`, label: 'Давление' },
      { value: `${mmHg.toFixed(0)} мм рт.ст.`, label: 'мм рт.ст.' },
      { value: `${percent.toFixed(1)}%`, label: '% от уровня моря' }
    ];
  },
  content: {
    howTo: 'Введите высоту в метрах. Калькулятор рассчитает атмосферное давление на этой высоте.',
    about: 'С увеличением высоты атмосферное давление падает из-за уменьшения плотности воздуха. Это важно для альпинизма, авиации и медицины.',
    formula: 'P = P₀ × (1 − 0.0000225577 × h)^5.2551, где P₀ = 101.325 кПа, h — высота в метрах.',
    faq: [
      { question: 'Какое давление на высоте 3000 м?', answer: 'Примерно 70 кПа (≈ 525 мм рт.ст.), что составляет около 70% от давления уровня моря.' },
      { question: 'Почему на высоте сложнее дышать?', answer: 'Меньшее давление означает меньшую концентрацию кислорода в каждом вдохе. Организму приходится адаптироваться (акклиматизация).' }
    ],
    sources: [{ title: 'Атмосферное давление', url: 'https://ru.wikipedia.org/wiki/Атмосферное_давление' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '3000 м', url: '/vysota-v-davlenie?value=3000' },
    { value: '5000 м', url: '/vysota-v-davlenie?value=5000' },
    { value: '8848 м (Эверест)', url: '/vysota-v-davlenie?value=8848' }
  ]
};

export const davlenieVVysotu: Calculator = {
  id: 'davlenie-v-vysotu',
  slug: 'davlenie-v-vysotu',
  title: 'Давление в высоту',
  description: 'Расчёт высоты по атмосферному давлению',
  category: 'konvertery',
  subcategory: 'conv-vysota',
  type: 'converter',
  inputs: [
    { name: 'value', label: 'Давление (кПа)', type: 'number', placeholder: '70', defaultValue: 70, min: 10, max: 110 },
    { name: 'from', label: 'Из', type: 'select', options: [{ value: 'kpa', label: 'кПа (давление)' }], defaultValue: 'kpa' },
    { name: 'to', label: 'В', type: 'select', options: [{ value: 'm', label: 'м (высота)' }], defaultValue: 'm' }
  ],
  outputs: [
    { name: 'result', label: 'Высота (м)', type: 'text' },
    { name: 'percent', label: '% от уровня моря', type: 'text' }
  ],
  calculate: (inputs) => {
    const p = Number(inputs.value);
    if (isNaN(p) || p <= 0 || p > 110) return [
      { value: '—', label: 'Высота' },
      { value: '—', label: '% от уровня моря' }
    ];
    const h = (1 - Math.pow(p / 101.325, 1 / 5.2551)) / 0.0000225577;
    const percent = (p / 101.325) * 100;
    return [
      { value: `${Math.round(h)} м`, label: 'Высота' },
      { value: `${percent.toFixed(1)}%`, label: '% от уровня моря' }
    ];
  },
  content: {
    howTo: 'Введите атмосферное давление в кПа. Калькулятор рассчитает высоту, на которой оно наблюдается.',
    about: 'Барометрическая высота определяется по атмосферному давлению. Чем ниже давление, тем выше точка измерения.',
    formula: 'h = (1 − (P / P₀)^(1/5.2551)) / 0.0000225577, где P₀ = 101.325 кПа.',
    faq: [
      { question: 'На какой высоте давление 70 кПа?', answer: 'Примерно 3000 метров над уровнем моря.' },
      { question: 'Можно ли использовать барометр как альтиметр?', answer: 'Да, барометрический высотомер использует именно эту зависимость. Нужно знать давление на уровне моря для калибровки.' }
    ],
    sources: [{ title: 'Атмосферное давление', url: 'https://ru.wikipedia.org/wiki/Атмосферное_давление' }],
    updatedAt: '2026-04-28'
  },
  popularCalculations: [
    { value: '70 кПа', url: '/davlenie-v-vysotu?value=70' },
    { value: '50 кПа', url: '/davlenie-v-vysotu?value=50' },
    { value: '33 кПа (Эверест)', url: '/davlenie-v-vysotu?value=33' }
  ]
};

export const sizeTravelPairConverters: Calculator[] = [
  razmerOdezhdyUSvEU, razmerOdezhdyEUvUS, razmerOdezhdyEUvRU, razmerOdezhdyRUvEU, razmerOdezhdyUSvRU, razmerOdezhdyRUvUS,
  razmerObuviUSvEU, razmerObuviEUvUS, razmerObuviUKvEU, razmerObuviEUvUK, razmerObuviUSvUK, razmerObuviUKvUS,
  detskiyRazmerObuviUSvEU, detskiyRazmerObuviEUvUS,
  razmerKoltsaUSvRU, razmerKoltsaRUvUS,
  razmerByustgalteraEUvUS, razmerByustgalteraUSvEU, razmerByustgalteraRUvUS, razmerByustgalteraUSvRU,
  shirinaShinyVProfil,
  awgVmm, mmVawg,
  utcVMoscow, moscowVUtc, utcVLocal, localVUtc,
  kgBagazhaVFunty, funtyBagazhaVKG,
  vysotaVDavlenie, davlenieVVysotu
];
