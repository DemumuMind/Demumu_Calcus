import { Calculator } from '../types';

// ==================== ДЛИНА ====================

// Дюймы → сантиметры
export const lengthInchesToCm: Calculator = {
  id: 'length-inches-cm',
  slug: 'dyujmy-v-santimetry',
  title: 'Дюймы в сантиметры',
  description: 'Конвертер длины: перевод дюймов в сантиметры',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'in', label: 'дюймы' }],
      defaultValue: 'in'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'cm', label: 'см' }],
      defaultValue: 'cm'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 2.54;
    return [{
      value: `${value} дюйм${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(2)} см`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в дюймах, результат в сантиметрах появится автоматически.',
    about: 'Дюйм — единица длины в англоязычных странах. 1 дюйм равен 2.54 сантиметра. Широко используется в технике, строительстве и повседневной жизни.',
    formula: '1 дюйм = 2.54 см',
    faq: [
      {
        question: 'Сколько сантиметров в дюйме?',
        answer: '1 дюйм = 2.54 сантиметра точно (международное соглашение 1959 года).'
      },
      {
        question: 'Где используются дюймы?',
        answer: 'В США, Великобритании, Канаде. Диагонали экранов, размеры шин, дюймовые гаечные ключи.'
      }
    ],
    sources: [
      { title: 'Дюйм — Википедия', url: 'https://ru.wikipedia.org/wiki/Дюйм' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '5 дюймов в см', url: '/dyujmy-v-santimetry?value=5&from=in&to=cm' },
    { value: '10 дюймов в см', url: '/dyujmy-v-santimetry?value=10&from=in&to=cm' },
    { value: '24 дюйма в см', url: '/dyujmy-v-santimetry?value=24&from=in&to=cm' }
  ]
};

// Сантиметры → дюймы
export const lengthCmToInches: Calculator = {
  id: 'length-cm-inches',
  slug: 'santimetry-v-dyujmy',
  title: 'Сантиметры в дюймы',
  description: 'Конвертер длины: перевод сантиметров в дюймы',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '2.54',
      defaultValue: 2.54,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'cm', label: 'см' }],
      defaultValue: 'cm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'in', label: 'дюймы' }],
      defaultValue: 'in'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 2.54;
    return [{
      value: `${value} см = ${result.toFixed(2)} дюйм${result === 1 ? '' : result < 5 ? 'а' : 'ов'}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в сантиметрах, результат в дюймах появится автоматически.',
    about: 'Сантиметр — метрическая единица длины, равная 0.01 метра. Дюйм — английская единица. Перевод часто нужен при работе с импортной техникой.',
    formula: '1 см = 0.3937 дюйма',
    faq: [
      {
        question: 'Сколько дюймов в сантиметре?',
        answer: '1 см ≈ 0.3937 дюйма (1/2.54).'
      }
    ],
    sources: [
      { title: 'Дюйм — Википедия', url: 'https://ru.wikipedia.org/wiki/Дюйм' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '10 см в дюймы', url: '/santimetry-v-dyujmy?value=10&from=cm&to=in' },
    { value: '30 см в дюймы', url: '/santimetry-v-dyujmy?value=30&from=cm&to=in' }
  ]
};

// Футы → метры
export const lengthFeetToMeters: Calculator = {
  id: 'length-feet-m',
  slug: 'futy-v-metry',
  title: 'Футы в метры',
  description: 'Конвертер длины: перевод футов в метры',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'ft', label: 'футы' }],
      defaultValue: 'ft'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'm', label: 'м' }],
      defaultValue: 'm'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.3048;
    return [{
      value: `${value} фут${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(2)} м`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в футах, результат в метрах появится автоматически.',
    about: 'Фут — английская единица длины, равная 12 дюймам или 0.3048 метра. Используется в авиации (высота полёта), морском деле и строительстве.',
    formula: '1 фут = 0.3048 м',
    faq: [
      {
        question: 'Сколько метров в футе?',
        answer: '1 фут = 0.3048 метра (12 дюймов).'
      },
      {
        question: 'Где используется фут?',
        answer: 'В авиации (высота в футах), морском деле (футы для глубины), строительстве в США и Великобритании.'
      }
    ],
    sources: [
      { title: 'Фут — Википедия', url: 'https://ru.wikipedia.org/wiki/Фут' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '10 футов в метры', url: '/futy-v-metry?value=10&from=ft&to=m' },
    { value: '100 футов в метры', url: '/futy-v-metry?value=100&from=ft&to=m' }
  ]
};

// Метры → футы
export const lengthMetersToFeet: Calculator = {
  id: 'length-m-feet',
  slug: 'metry-v-futy',
  title: 'Метры в футы',
  description: 'Конвертер длины: перевод метров в футы',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'm', label: 'м' }],
      defaultValue: 'm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'ft', label: 'футы' }],
      defaultValue: 'ft'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 0.3048;
    return [{
      value: `${value} м = ${result.toFixed(2)} фут${result === 1 ? '' : result < 5 ? 'а' : 'ов'}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в метрах, результат в футах появится автоматически.',
    about: 'Метр — основная единица длины в СИ. Фут — английская единица, распространённая в авиации и морском деле.',
    formula: '1 м = 3.28084 фута',
    faq: [
      {
        question: 'Сколько футов в метре?',
        answer: '1 метр ≈ 3.28084 фута.'
      }
    ],
    sources: [
      { title: 'Фут — Википедия', url: 'https://ru.wikipedia.org/wiki/Фут' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '5 м в футы', url: '/metry-v-futy?value=5&from=m&to=ft' },
    { value: '100 м в футы', url: '/metry-v-futy?value=100&from=m&to=ft' }
  ]
};

// Мили → километры
export const lengthMilesToKm: Calculator = {
  id: 'length-miles-km',
  slug: 'mili-v-kilometry',
  title: 'Мили в километры',
  description: 'Конвертер длины: перевод миль в километры',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'mi', label: 'мили' }],
      defaultValue: 'mi'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'km', label: 'км' }],
      defaultValue: 'km'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 1.609344;
    return [{
      value: `${value} мил${value === 1 ? 'я' : value < 5 ? 'и' : 'ь'} = ${result.toFixed(2)} км`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите расстояние в милях, результат в километрах появится автоматически.',
    about: 'Миля — единица расстояния в англоязычных странах. Существуют разные виды миль (статутная, морская), здесь используется статутная миля (1609.344 м).',
    formula: '1 миля = 1.609344 км',
    faq: [
      {
        question: 'Сколько километров в миле?',
        answer: '1 статутная миля = 1.609344 км.'
      },
      {
        question: 'В чём разница между статутной и морской милей?',
        answer: 'Статутная миля = 1609.344 м. Морская миля (морская) = 1852 м.'
      }
    ],
    sources: [
      { title: 'Миля — Википедия', url: 'https://ru.wikipedia.org/wiki/Миля' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '5 миль в км', url: '/mili-v-kilometry?value=5&from=mi&to=km' },
    { value: '10 миль в км', url: '/mili-v-kilometry?value=10&from=mi&to=km' },
    { value: '26.2 мили в км (марафон)', url: '/mili-v-kilometry?value=26.2&from=mi&to=km' }
  ]
};

// Километры → мили
export const lengthKmToMiles: Calculator = {
  id: 'length-km-miles',
  slug: 'kilometry-v-mili',
  title: 'Километры в мили',
  description: 'Конвертер длины: перевод километров в мили',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'km', label: 'км' }],
      defaultValue: 'km'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'mi', label: 'мили' }],
      defaultValue: 'mi'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 1.609344;
    return [{
      value: `${value} км = ${result.toFixed(2)} мил${result === 1 ? 'я' : result < 5 ? 'и' : 'ь'}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите расстояние в километрах, результат в милях появится автоматически.',
    about: 'Километр — единица длины в СИ, равная 1000 метров. Часто нужен перевод в мили при чтении зарубежных источников или путешествии.',
    formula: '1 км = 0.621371 мили',
    faq: [
      {
        question: 'Сколько миль в километре?',
        answer: '1 км ≈ 0.621371 мили.'
      }
    ],
    sources: [
      { title: 'Миля — Википедия', url: 'https://ru.wikipedia.org/wiki/Миля' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '5 км в мили', url: '/kilometry-v-mili?value=5&from=km&to=mi' },
    { value: '42.195 км в мили (марафон)', url: '/kilometry-v-mili?value=42.195&from=km&to=mi' }
  ]
};

// Метры → километры
export const lengthMetersToKm: Calculator = {
  id: 'length-m-km',
  slug: 'metry-v-kilometry',
  title: 'Метры в километры',
  description: 'Конвертер длины: перевод метров в километры',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'm', label: 'м' }],
      defaultValue: 'm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'km', label: 'км' }],
      defaultValue: 'km'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 1000;
    return [{
      value: `${value} м = ${result.toFixed(3)} км`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в метрах, результат в километрах появится автоматически.',
    about: 'Метр и километр — основные единицы длины в метрической системе. 1 километр = 1000 метров.',
    formula: '1 км = 1000 м',
    faq: [
      {
        question: 'Сколько метров в километре?',
        answer: '1 километр = 1000 метров.'
      }
    ],
    sources: [
      { title: 'Метр — Википедия', url: 'https://ru.wikipedia.org/wiki/Метр' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '500 м в км', url: '/metry-v-kilometry?value=500&from=m&to=km' },
    { value: '1500 м в км', url: '/metry-v-kilometry?value=1500&from=m&to=km' }
  ]
};

// Километры → метры
export const lengthKmToMeters: Calculator = {
  id: 'length-km-m',
  slug: 'kilometry-v-metry',
  title: 'Километры в метры',
  description: 'Конвертер длины: перевод километров в метры',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'km', label: 'км' }],
      defaultValue: 'km'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'm', label: 'м' }],
      defaultValue: 'm'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 1000;
    return [{
      value: `${value} км = ${result.toFixed(0)} м`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите расстояние в километрах, результат в метрах появится автоматически.',
    about: 'Перевод километров в метры — базовая операция в метрической системе. Полезен при планировании маршрутов и расчётах расстояний.',
    formula: '1 км = 1000 м',
    faq: [
      {
        question: 'Сколько метров в 5 километрах?',
        answer: '5 км = 5000 м.'
      }
    ],
    sources: [
      { title: 'Километр — Википедия', url: 'https://ru.wikipedia.org/wiki/Километр' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '2 км в м', url: '/kilometry-v-metry?value=2&from=km&to=m' },
    { value: '10 км в м', url: '/kilometry-v-metry?value=10&from=km&to=m' }
  ]
};

// Сантиметры → метры
export const lengthCmToMeters: Calculator = {
  id: 'length-cm-m',
  slug: 'santimetry-v-metry',
  title: 'Сантиметры в метры',
  description: 'Конвертер длины: перевод сантиметров в метры',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'cm', label: 'см' }],
      defaultValue: 'cm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'm', label: 'м' }],
      defaultValue: 'm'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 100;
    return [{
      value: `${value} см = ${result.toFixed(2)} м`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в сантиметрах, результат в метрах появится автоматически.',
    about: 'Сантиметр — единица длины, равная 0.01 метра. Широко используется в повседневной жизни, медицине, швейном деле.',
    formula: '1 м = 100 см',
    faq: [
      {
        question: 'Сколько сантиметров в метре?',
        answer: '1 метр = 100 сантиметров.'
      }
    ],
    sources: [
      { title: 'Сантиметр — Википедия', url: 'https://ru.wikipedia.org/wiki/Сантиметр' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '50 см в м', url: '/santimetry-v-metry?value=50&from=cm&to=m' },
    { value: '175 см в м', url: '/santimetry-v-metry?value=175&from=cm&to=m' }
  ]
};

// Метры → сантиметры
export const lengthMetersToCm: Calculator = {
  id: 'length-m-cm',
  slug: 'metry-v-santimetry',
  title: 'Метры в сантиметры',
  description: 'Конвертер длины: перевод метров в сантиметры',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'm', label: 'м' }],
      defaultValue: 'm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'cm', label: 'см' }],
      defaultValue: 'cm'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 100;
    return [{
      value: `${value} м = ${result.toFixed(0)} см`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в метрах, результат в сантиметрах появится автоматически.',
    about: 'Перевод метров в сантиметры — частая операция при измерении роста, длины ткани, размеров предметов.',
    formula: '1 м = 100 см',
    faq: [
      {
        question: 'Сколько сантиметров в 1.75 метрах?',
        answer: '1.75 м = 175 см.'
      }
    ],
    sources: [
      { title: 'Сантиметр — Википедия', url: 'https://ru.wikipedia.org/wiki/Сантиметр' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1.5 м в см', url: '/metry-v-santimetry?value=1.5&from=m&to=cm' },
    { value: '2 м в см', url: '/metry-v-santimetry?value=2&from=m&to=cm' }
  ]
};

// Миллиметры → сантиметры
export const lengthMmToCm: Calculator = {
  id: 'length-mm-cm',
  slug: 'millimetry-v-santimetry',
  title: 'Миллиметры в сантиметры',
  description: 'Конвертер длины: перевод миллиметров в сантиметры',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'mm', label: 'мм' }],
      defaultValue: 'mm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'cm', label: 'см' }],
      defaultValue: 'cm'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 10;
    return [{
      value: `${value} мм = ${result.toFixed(1)} см`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в миллиметрах, результат в сантиметрах появится автоматически.',
    about: 'Миллиметр — единица длины, равная 0.1 сантиметра. Используется в инженерии, медицине, точных измерениях.',
    formula: '1 см = 10 мм',
    faq: [
      {
        question: 'Сколько миллиметров в сантиметре?',
        answer: '1 сантиметр = 10 миллиметров.'
      }
    ],
    sources: [
      { title: 'Миллиметр — Википедия', url: 'https://ru.wikipedia.org/wiki/Миллиметр' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '5 мм в см', url: '/millimetry-v-santimetry?value=5&from=mm&to=cm' },
    { value: '25 мм в см', url: '/millimetry-v-santimetry?value=25&from=mm&to=cm' }
  ]
};

// Сантиметры → миллиметры
export const lengthCmToMm: Calculator = {
  id: 'length-cm-mm',
  slug: 'santimetry-v-millimetry',
  title: 'Сантиметры в миллиметры',
  description: 'Конвертер длины: перевод сантиметров в миллиметры',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'cm', label: 'см' }],
      defaultValue: 'cm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'mm', label: 'мм' }],
      defaultValue: 'mm'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 10;
    return [{
      value: `${value} см = ${result.toFixed(0)} мм`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в сантиметрах, результат в миллиметрах появится автоматически.',
    about: 'Перевод сантиметров в миллиметры часто нужен в технических чертежах, медицине и ювелирном деле.',
    formula: '1 см = 10 мм',
    faq: [
      {
        question: 'Сколько миллиметров в 2.5 см?',
        answer: '2.5 см = 25 мм.'
      }
    ],
    sources: [
      { title: 'Миллиметр — Википедия', url: 'https://ru.wikipedia.org/wiki/Миллиметр' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '0.5 см в мм', url: '/santimetry-v-millimetry?value=0.5&from=cm&to=mm' },
    { value: '3 см в мм', url: '/santimetry-v-millimetry?value=3&from=cm&to=mm' }
  ]
};

// Ярды → метры
export const lengthYardsToMeters: Calculator = {
  id: 'length-yards-m',
  slug: 'yardy-v-metry',
  title: 'Ярды в метры',
  description: 'Конвертер длины: перевод ярдов в метры',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'yd', label: 'ярды' }],
      defaultValue: 'yd'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'm', label: 'м' }],
      defaultValue: 'm'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.9144;
    return [{
      value: `${value} ярд${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(2)} м`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в ярдах, результат в метрах появится автоматически.',
    about: 'Ярд — английская единица длины, равная 3 футам или 0.9144 метра. Используется в текстильной промышленности, спорте (футбол, американский футбол).',
    formula: '1 ярд = 0.9144 м',
    faq: [
      {
        question: 'Сколько метров в ярде?',
        answer: '1 ярд = 0.9144 метра.'
      },
      {
        question: 'Где используется ярд?',
        answer: 'В текстильной промышленности (длина ткани), американском футболе (ярды на поле), гольфе (расстояние до лунки).'
      }
    ],
    sources: [
      { title: 'Ярд — Википедия', url: 'https://ru.wikipedia.org/wiki/Ярд' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '10 ярдов в м', url: '/yardy-v-metry?value=10&from=yd&to=m' },
    { value: '100 ярдов в м', url: '/yardy-v-metry?value=100&from=yd&to=m' }
  ]
};

// Метры → ярды
export const lengthMetersToYards: Calculator = {
  id: 'length-m-yards',
  slug: 'metry-v-yardy',
  title: 'Метры в ярды',
  description: 'Конвертер длины: перевод метров в ярды',
  category: 'konvertery',
  subcategory: 'conv-dlina',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'm', label: 'м' }],
      defaultValue: 'm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'yd', label: 'ярды' }],
      defaultValue: 'yd'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 0.9144;
    return [{
      value: `${value} м = ${result.toFixed(2)} ярд${result === 1 ? '' : result < 5 ? 'а' : 'ов'}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите длину в метрах, результат в ярдах появится автоматически.',
    about: 'Перевод метров в ярды полезен при работе с тканями, измерении спортивных полей и чтении англоязычных спецификаций.',
    formula: '1 м = 1.09361 ярда',
    faq: [
      {
        question: 'Сколько ярдов в метре?',
        answer: '1 метр ≈ 1.09361 ярда.'
      }
    ],
    sources: [
      { title: 'Ярд — Википедия', url: 'https://ru.wikipedia.org/wiki/Ярд' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '5 м в ярды', url: '/metry-v-yardy?value=5&from=m&to=yd' },
    { value: '100 м в ярды', url: '/metry-v-yardy?value=100&from=m&to=yd' }
  ]
};


// ==================== МАССА ====================

// Граммы → килограммы
export const massGramsToKg: Calculator = {
  id: 'mass-g-kg',
  slug: 'grammy-v-kilogrammy',
  title: 'Граммы в килограммы',
  description: 'Конвертер массы: перевод граммов в килограммы',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'g', label: 'г' }],
      defaultValue: 'g'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kg', label: 'кг' }],
      defaultValue: 'kg'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 1000;
    return [{
      value: `${value} г = ${result.toFixed(3)} кг`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в граммах, результат в килограммах появится автоматически.',
    about: 'Грамм — единица массы в метрической системе, равная 0.001 килограмма. Используется в кулинарии, медицине, торговле.',
    formula: '1 кг = 1000 г',
    faq: [
      {
        question: 'Сколько граммов в килограмме?',
        answer: '1 килограмм = 1000 граммов.'
      },
      {
        question: 'Сколько граммов в 500 г?',
        answer: '500 г = 0.5 кг.'
      }
    ],
    sources: [
      { title: 'Грамм — Википедия', url: 'https://ru.wikipedia.org/wiki/Грамм' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '500 г в кг', url: '/grammy-v-kilogrammy?value=500&from=g&to=kg' },
    { value: '250 г в кг', url: '/grammy-v-kilogrammy?value=250&from=g&to=kg' },
    { value: '2000 г в кг', url: '/grammy-v-kilogrammy?value=2000&from=g&to=kg' }
  ]
};

// Килограммы → граммы
export const massKgToGrams: Calculator = {
  id: 'mass-kg-g',
  slug: 'kilogrammy-v-grammy',
  title: 'Килограммы в граммы',
  description: 'Конвертер массы: перевод килограммов в граммы',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'kg', label: 'кг' }],
      defaultValue: 'kg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'g', label: 'г' }],
      defaultValue: 'g'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 1000;
    return [{
      value: `${value} кг = ${result.toFixed(0)} г`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в килограммах, результат в граммах появится автоматически.',
    about: 'Килограмм — основная единица массы в СИ. Перевод в граммы нужен при точных измерениях в кулинарии и медицине.',
    formula: '1 кг = 1000 г',
    faq: [
      {
        question: 'Сколько граммов в 2.5 кг?',
        answer: '2.5 кг = 2500 г.'
      }
    ],
    sources: [
      { title: 'Килограмм — Википедия', url: 'https://ru.wikipedia.org/wiki/Килограмм' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '0.5 кг в г', url: '/kilogrammy-v-grammy?value=0.5&from=kg&to=g' },
    { value: '5 кг в г', url: '/kilogrammy-v-grammy?value=5&from=kg&to=g' }
  ]
};

// Тонны → килограммы
export const massTonsToKg: Calculator = {
  id: 'mass-t-kg',
  slug: 'tonny-v-kilogrammy',
  title: 'Тонны в килограммы',
  description: 'Конвертер массы: перевод тонн в килограммы',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 't', label: 'т' }],
      defaultValue: 't'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kg', label: 'кг' }],
      defaultValue: 'kg'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 1000;
    return [{
      value: `${value} т = ${result.toFixed(0)} кг`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в тоннах, результат в килограммах появится автоматически.',
    about: 'Тонна — единица массы, равная 1000 килограммов. Используется в грузоперевозках, торговле, промышленности.',
    formula: '1 т = 1000 кг',
    faq: [
      {
        question: 'Сколько килограммов в тонне?',
        answer: '1 тонна = 1000 килограммов.'
      },
      {
        question: 'В чём разница между метрической и английской тонной?',
        answer: 'Метрическая тонна = 1000 кг. Английская (long) тонна = 1016 кг. Американская (short) тонна = 907 кг.'
      }
    ],
    sources: [
      { title: 'Тонна — Википедия', url: 'https://ru.wikipedia.org/wiki/Тонна' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '2 т в кг', url: '/tonny-v-kilogrammy?value=2&from=t&to=kg' },
    { value: '5 т в кг', url: '/tonny-v-kilogrammy?value=5&from=t&to=kg' }
  ]
};

// Килограммы → тонны
export const massKgToTons: Calculator = {
  id: 'mass-kg-t',
  slug: 'kilogrammy-v-tonny',
  title: 'Килограммы в тонны',
  description: 'Конвертер массы: перевод килограммов в тонны',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'kg', label: 'кг' }],
      defaultValue: 'kg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 't', label: 'т' }],
      defaultValue: 't'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 1000;
    return [{
      value: `${value} кг = ${result.toFixed(3)} т`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в килограммах, результат в тоннах появится автоматически.',
    about: 'Перевод килограммов в тонны используется для крупных масс — грузов, сыпучих материалов, транспортных средств.',
    formula: '1 т = 1000 кг',
    faq: [
      {
        question: 'Сколько тонн в 5000 кг?',
        answer: '5000 кг = 5 тонн.'
      }
    ],
    sources: [
      { title: 'Тонна — Википедия', url: 'https://ru.wikipedia.org/wiki/Тонна' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '500 кг в т', url: '/kilogrammy-v-tonny?value=500&from=kg&to=t' },
    { value: '2500 кг в т', url: '/kilogrammy-v-tonny?value=2500&from=kg&to=t' }
  ]
};

// Фунты → килограммы
export const massPoundsToKg: Calculator = {
  id: 'mass-lb-kg',
  slug: 'funti-v-kilogrammy',
  title: 'Фунты в килограммы',
  description: 'Конвертер массы: перевод фунтов в килограммы',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'lb', label: 'фунты' }],
      defaultValue: 'lb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kg', label: 'кг' }],
      defaultValue: 'kg'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.45359237;
    return [{
      value: `${value} фунт${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(2)} кг`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в фунтах, результат в килограммах появится автоматически.',
    about: 'Фунт — единица массы в англоязычных странах. Авиационный фунт (lb avdp) = 0.45359237 кг. Используется в США, Великобритании.',
    formula: '1 фунт = 0.45359237 кг',
    faq: [
      {
        question: 'Сколько килограммов в фунте?',
        answer: '1 фунт (международный авоирдюпуа) = 0.45359237 кг.'
      },
      {
        question: 'Сколько фунтов в килограмме?',
        answer: '1 кг ≈ 2.20462 фунта.'
      }
    ],
    sources: [
      { title: 'Фунт (единица массы) — Википедия', url: 'https://ru.wikipedia.org/wiki/Фунт_(единица_массы)' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '10 фунтов в кг', url: '/funti-v-kilogrammy?value=10&from=lb&to=kg' },
    { value: '150 фунтов в кг', url: '/funti-v-kilogrammy?value=150&from=lb&to=kg' },
    { value: '1 фунт в кг', url: '/funti-v-kilogrammy?value=1&from=lb&to=kg' }
  ]
};

// Килограммы → фунты
export const massKgToPounds: Calculator = {
  id: 'mass-kg-lb',
  slug: 'kilogrammy-v-funti',
  title: 'Килограммы в фунты',
  description: 'Конвертер массы: перевод килограммов в фунты',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'kg', label: 'кг' }],
      defaultValue: 'kg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'lb', label: 'фунты' }],
      defaultValue: 'lb'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 0.45359237;
    return [{
      value: `${value} кг = ${result.toFixed(2)} фунт${result === 1 ? '' : result < 5 ? 'а' : 'ов'}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в килограммах, результат в фунтах появится автоматически.',
    about: 'Перевод килограммов в фунты часто нужен при чтении американских рецептов, спортивных данных (вес боксёров), веса багажа.',
    formula: '1 кг = 2.20462 фунта',
    faq: [
      {
        question: 'Сколько фунтов в 70 кг?',
        answer: '70 кг ≈ 154.32 фунта.'
      }
    ],
    sources: [
      { title: 'Фунт (единица массы) — Википедия', url: 'https://ru.wikipedia.org/wiki/Фунт_(единица_массы)' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '70 кг в фунты', url: '/kilogrammy-v-funti?value=70&from=kg&to=lb' },
    { value: '100 кг в фунты', url: '/kilogrammy-v-funti?value=100&from=kg&to=lb' }
  ]
};

// Унции → граммы
export const massOzToGrams: Calculator = {
  id: 'mass-oz-g',
  slug: 'uncii-v-grammy',
  title: 'Унции в граммы',
  description: 'Конвертер массы: перевод унций в граммы',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'oz', label: 'унции' }],
      defaultValue: 'oz'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'g', label: 'г' }],
      defaultValue: 'g'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 28.3495;
    return [{
      value: `${value} унци${value === 1 ? 'я' : value < 5 ? 'и' : 'й'} = ${result.toFixed(2)} г`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в унциях, результат в граммах появится автоматически.',
    about: 'Унция (oz) — единица массы в англоязычных странах. 1 унция = 1/16 фунта = 28.3495 г. Используется в кулинарии, ювелирном деле, фармацевтике.',
    formula: '1 унция = 28.3495 г',
    faq: [
      {
        question: 'Сколько граммов в унции?',
        answer: '1 унция (международная) = 28.3495 граммов.'
      },
      {
        question: 'В чём разница между унцией и тройской унцией?',
        answer: 'Обычная (авоирдюпуа) унция = 28.3495 г. Тройская унция = 31.1035 г. Тройская используется для драгоценных металлов.'
      }
    ],
    sources: [
      { title: 'Унция — Википедия', url: 'https://ru.wikipedia.org/wiki/Унция' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '8 унций в г', url: '/uncii-v-grammy?value=8&from=oz&to=g' },
    { value: '16 унций в г', url: '/uncii-v-grammy?value=16&from=oz&to=g' }
  ]
};

// Граммы → унции
export const massGramsToOz: Calculator = {
  id: 'mass-g-oz',
  slug: 'grammy-v-uncii',
  title: 'Граммы в унции',
  description: 'Конвертер массы: перевод граммов в унции',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '28.35',
      defaultValue: 28.35,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'g', label: 'г' }],
      defaultValue: 'g'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'oz', label: 'унции' }],
      defaultValue: 'oz'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 28.3495;
    return [{
      value: `${value} г = ${result.toFixed(2)} унци${result === 1 ? 'я' : result < 5 ? 'и' : 'й'}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в граммах, результат в унциях появится автоматически.',
    about: 'Перевод граммов в унции нужен при работе с американскими рецептами, спортивным питанием и инструкциями на английском языке.',
    formula: '1 г = 0.035274 унции',
    faq: [
      {
        question: 'Сколько унций в 100 г?',
        answer: '100 г ≈ 3.527 унций.'
      }
    ],
    sources: [
      { title: 'Унция — Википедия', url: 'https://ru.wikipedia.org/wiki/Унция' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '100 г в унции', url: '/grammy-v-uncii?value=100&from=g&to=oz' },
    { value: '500 г в унции', url: '/grammy-v-uncii?value=500&from=g&to=oz' }
  ]
};

// Тройские унции → граммы
export const massTroyOzToGrams: Calculator = {
  id: 'mass-troyoz-g',
  slug: 'troyjskie-uncii-v-grammy',
  title: 'Тройские унции в граммы',
  description: 'Конвертер массы: перевод тройских унций в граммы',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'troyoz', label: 'тройские унции' }],
      defaultValue: 'troyoz'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'g', label: 'г' }],
      defaultValue: 'g'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 31.1035;
    return [{
      value: `${value} тройск${value === 1 ? 'ая' : value < 5 ? 'ие' : 'их'} унци${value === 1 ? 'я' : value < 5 ? 'и' : 'й'} = ${result.toFixed(2)} г`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в тройских унциях, результат в граммах появится автоматически.',
    about: 'Тройская унция — единица массы для драгоценных металлов и камней. 1 тройская унция = 31.1035 г. Отличается от обычной (авоирдюпуа) унции (28.3495 г).',
    formula: '1 тройская унция = 31.1035 г',
    faq: [
      {
        question: 'Сколько граммов в тройской унции?',
        answer: '1 тройская унция = 31.1035 граммов.'
      },
      {
        question: 'Зачем нужна тройская унция?',
        answer: 'Используется для взвешивания золота, серебра, платины и драгоценных камней. Курс золота традиционно указывается за тройскую унцию.'
      }
    ],
    sources: [
      { title: 'Тройская унция — Википедия', url: 'https://ru.wikipedia.org/wiki/Тройская_унция' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 тройская унция в г', url: '/troyjskie-uncii-v-grammy?value=1&from=troyoz&to=g' },
    { value: '10 тройских унций в г', url: '/troyjskie-uncii-v-grammy?value=10&from=troyoz&to=g' }
  ]
};

// Граммы → тройские унции
export const massGramsToTroyOz: Calculator = {
  id: 'mass-g-troyoz',
  slug: 'grammy-v-troyjskie-uncii',
  title: 'Граммы в тройские унции',
  description: 'Конвертер массы: перевод граммов в тройские унции',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '31.1035',
      defaultValue: 31.1035,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'g', label: 'г' }],
      defaultValue: 'g'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'troyoz', label: 'тройские унции' }],
      defaultValue: 'troyoz'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 31.1035;
    return [{
      value: `${value} г = ${result.toFixed(4)} тройск${result === 1 ? 'ой' : 'их'} унци${result === 1 ? 'и' : 'й'}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в граммах, результат в тройских унциях появится автоматически.',
    about: 'Перевод граммов в тройские унции важен для инвесторов в драгоценные металлы и ювелиров. Цена золота мировом рынке указывается за тройскую унцию.',
    formula: '1 г = 0.03215 тройской унции',
    faq: [
      {
        question: 'Сколько тройских унций в 100 г золота?',
        answer: '100 г ≈ 3.215 тройских унции.'
      }
    ],
    sources: [
      { title: 'Тройская унция — Википедия', url: 'https://ru.wikipedia.org/wiki/Тройская_унция' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '100 г в тройские унции', url: '/grammy-v-troyjskie-uncii?value=100&from=g&to=troyoz' },
    { value: '31.1 г в тройские унции', url: '/grammy-v-troyjskie-uncii?value=31.1&from=g&to=troyoz' }
  ]
};

// Пуды → килограммы
export const massPudsToKg: Calculator = {
  id: 'mass-pud-kg',
  slug: 'pudi-v-kilogrammy',
  title: 'Пуды в килограммы',
  description: 'Конвертер массы: перевод пудов в килограммы',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'pud', label: 'пуды' }],
      defaultValue: 'pud'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kg', label: 'кг' }],
      defaultValue: 'kg'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 16.3805;
    return [{
      value: `${value} пуд${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(2)} кг`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в пудах, результат в килограммах появится автоматически.',
    about: 'Пуд — русская единица массы, равная 40 фунтам ≈ 16.38 кг. Исторически использовалась в торговле, сельском хозяйстве, быту. Сейчас сохраняется в культурном контексте.',
    formula: '1 пуд = 16.3805 кг',
    faq: [
      {
        question: 'Сколько килограммов в пуде?',
        answer: '1 пуд = 16.3805 килограммов (40 фунтов).'
      },
      {
        question: 'Что такое «пуд соли»?',
        answer: '«Съесть пуд соли вместе» — русская пословица о длительном совместном опыте. Пуд соли ≈ 16.38 кг.'
      }
    ],
    sources: [
      { title: 'Пуд — Википедия', url: 'https://ru.wikipedia.org/wiki/Пуд' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 пуд в кг', url: '/pudi-v-kilogrammy?value=1&from=pud&to=kg' },
    { value: '5 пудов в кг', url: '/pudi-v-kilogrammy?value=5&from=pud&to=kg' }
  ]
};

// Килограммы → пуды
export const massKgToPuds: Calculator = {
  id: 'mass-kg-pud',
  slug: 'kilogrammy-v-pudi',
  title: 'Килограммы в пуды',
  description: 'Конвертер массы: перевод килограммов в пуды',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '16.38',
      defaultValue: 16.38,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'kg', label: 'кг' }],
      defaultValue: 'kg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'pud', label: 'пуды' }],
      defaultValue: 'pud'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 16.3805;
    return [{
      value: `${value} кг = ${result.toFixed(3)} пуд${result === 1 ? '' : result < 5 ? 'а' : 'ов'}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в килограммах, результат в пудах появится автоматически.',
    about: 'Перевод килограммов в пуды интересен с исторической и культурной точки зрения — пуд был основной единицей массы в дореволюционной России.',
    formula: '1 пуд = 16.3805 кг',
    faq: [
      {
        question: 'Сколько пудов в 100 кг?',
        answer: '100 кг ≈ 6.105 пудов.'
      }
    ],
    sources: [
      { title: 'Пуд — Википедия', url: 'https://ru.wikipedia.org/wiki/Пуд' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '50 кг в пуды', url: '/kilogrammy-v-pudi?value=50&from=kg&to=pud' },
    { value: '100 кг в пуды', url: '/kilogrammy-v-pudi?value=100&from=kg&to=pud' }
  ]
};

// Караты → граммы
export const massCaratsToGrams: Calculator = {
  id: 'mass-ct-g',
  slug: 'karati-v-grammy',
  title: 'Караты в граммы',
  description: 'Конвертер массы: перевод каратов в граммы',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'ct', label: 'караты' }],
      defaultValue: 'ct'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'g', label: 'г' }],
      defaultValue: 'g'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.2;
    return [{
      value: `${value} карат = ${result.toFixed(2)} г`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в каратах, результат в граммах появится автоматически.',
    about: 'Карат — единица массы для драгоценных камней и жемчуга. 1 карат = 0.2 грамма = 200 миллиграммов. Метрический карат стандартизирован в 1907 году.',
    formula: '1 карат = 0.2 г',
    faq: [
      {
        question: 'Сколько граммов в карате?',
        answer: '1 карат = 0.2 грамма (200 мг).'
      },
      {
        question: 'Сколько каратов в 1 грамме?',
        answer: '1 грамм = 5 каратов.'
      }
    ],
    sources: [
      { title: 'Карат (единица массы) — Википедия', url: 'https://ru.wikipedia.org/wiki/Карат_(единица_массы)' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '1 карат в г', url: '/karati-v-grammy?value=1&from=ct&to=g' },
    { value: '5 карат в г', url: '/karati-v-grammy?value=5&from=ct&to=g' },
    { value: '100 карат в г', url: '/karati-v-grammy?value=100&from=ct&to=g' }
  ]
};

// Граммы → караты
export const massGramsToCarats: Calculator = {
  id: 'mass-g-ct',
  slug: 'grammy-v-karati',
  title: 'Граммы в караты',
  description: 'Конвертер массы: перевод граммов в караты',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'g', label: 'г' }],
      defaultValue: 'g'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'ct', label: 'караты' }],
      defaultValue: 'ct'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 0.2;
    return [{
      value: `${value} г = ${result.toFixed(0)} карат`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в граммах, результат в каратах появится автоматически.',
    about: 'Перевод граммов в караты нужен ювелирам, геммологам и покупателям драгоценных камней. Масса бриллиантов и других камней всегда указывается в каратах.',
    formula: '1 г = 5 карат',
    faq: [
      {
        question: 'Сколько карат в 2 г бриллианта?',
        answer: '2 г = 10 карат.'
      }
    ],
    sources: [
      { title: 'Карат (единица массы) — Википедия', url: 'https://ru.wikipedia.org/wiki/Карат_(единица_массы)' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '0.5 г в караты', url: '/grammy-v-karati?value=0.5&from=g&to=ct' },
    { value: '2 г в караты', url: '/grammy-v-karati?value=2&from=g&to=ct' }
  ]
};

// Центнеры → килограммы
export const massQuintalsToKg: Calculator = {
  id: 'mass-q-kg',
  slug: 'tsentneri-v-kilogrammy',
  title: 'Центнеры в килограммы',
  description: 'Конвертер массы: перевод центнеров в килограммы',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'q', label: 'центнеры' }],
      defaultValue: 'q'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kg', label: 'кг' }],
      defaultValue: 'kg'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value * 100;
    return [{
      value: `${value} центнер${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(0)} кг`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в центнерах, результат в килограммах появится автоматически.',
    about: 'Центнер — метрическая единица массы, равная 100 килограммам. Используется в сельском хозяйстве для измерения урожайности, веса скота и грузов.',
    formula: '1 центнер = 100 кг',
    faq: [
      {
        question: 'Сколько килограммов в центнере?',
        answer: '1 центнер = 100 килограммов.'
      },
      {
        question: 'Сколько центнеров в тонне?',
        answer: '1 тонна = 10 центнеров.'
      }
    ],
    sources: [
      { title: 'Центнер — Википедия', url: 'https://ru.wikipedia.org/wiki/Центнер' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '2 центнера в кг', url: '/tsentneri-v-kilogrammy?value=2&from=q&to=kg' },
    { value: '5 центнеров в кг', url: '/tsentneri-v-kilogrammy?value=5&from=q&to=kg' }
  ]
};

// Килограммы → центнеры
export const massKgToQuintals: Calculator = {
  id: 'mass-kg-q',
  slug: 'kilogrammy-v-tsentneri',
  title: 'Килограммы в центнеры',
  description: 'Конвертер массы: перевод килограммов в центнеры',
  category: 'konvertery',
  subcategory: 'conv-massa',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [{ value: 'kg', label: 'кг' }],
      defaultValue: 'kg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'q', label: 'центнеры' }],
      defaultValue: 'q'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '—', label: 'Результат' }];
    const result = value / 100;
    return [{
      value: `${value} кг = ${result.toFixed(2)} центнер${result === 1 ? '' : result < 5 ? 'а' : 'ов'}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу в килограммах, результат в центнерах появится автоматически.',
    about: 'Перевод килограммов в центнеры используется в сельском хозяйстве для расчёта урожайности с гектара, веса животных и грузов.',
    formula: '1 центнер = 100 кг',
    faq: [
      {
        question: 'Сколько центнеров в 500 кг?',
        answer: '500 кг = 5 центнеров.'
      }
    ],
    sources: [
      { title: 'Центнер — Википедия', url: 'https://ru.wikipedia.org/wiki/Центнер' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '250 кг в центнеры', url: '/kilogrammy-v-tsentneri?value=250&from=kg&to=q' },
    { value: '1000 кг в центнеры', url: '/kilogrammy-v-tsentneri?value=1000&from=kg&to=q' }
  ]
};

// ==================== ЭКСПОРТ ====================

export const lengthMassConverters: Calculator[] = [
  // Длина
  lengthInchesToCm,
  lengthCmToInches,
  lengthFeetToMeters,
  lengthMetersToFeet,
  lengthMilesToKm,
  lengthKmToMiles,
  lengthMetersToKm,
  lengthKmToMeters,
  lengthCmToMeters,
  lengthMetersToCm,
  lengthMmToCm,
  lengthCmToMm,
  lengthYardsToMeters,
  lengthMetersToYards,
  // Масса
  massGramsToKg,
  massKgToGrams,
  massTonsToKg,
  massKgToTons,
  massPoundsToKg,
  massKgToPounds,
  massOzToGrams,
  massGramsToOz,
  massTroyOzToGrams,
  massGramsToTroyOz,
  massPudsToKg,
  massKgToPuds,
  massCaratsToGrams,
  massGramsToCarats,
  massQuintalsToKg,
  massKgToQuintals
];
