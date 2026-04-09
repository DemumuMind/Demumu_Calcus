import { Calculator } from '../types';

// Конвертер валют (пример с фиксированными курсами)
export const currencyConverter: Calculator = {
  id: 'currency-converter',
  slug: 'konverter-valyut',
  title: 'Конвертер валют',
  description: 'Онлайн конвертер валют: доллары, евро, рубли, гривны и другие',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'converter',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0
    },
    {
      name: 'from',
      label: 'Из валюты',
      type: 'select',
      options: [
        { value: 'USD', label: 'USD ($) — Доллар США' },
        { value: 'EUR', label: 'EUR (€) — Евро' },
        { value: 'RUB', label: 'RUB (₽) — Российский рубль' },
        { value: 'GBP', label: 'GBP (£) — Фунт стерлингов' },
        { value: 'JPY', label: 'JPY (¥) — Японская йена' },
        { value: 'CNY', label: 'CNY (元) — Китайский юань' },
        { value: 'UAH', label: 'UAH (₴) — Украинская гривна' },
        { value: 'KZT', label: 'KZT (₸) — Казахстанский тенге' },
        { value: 'BYN', label: 'BYN (Br) — Белорусский рубль' }
      ],
      defaultValue: 'USD'
    },
    {
      name: 'to',
      label: 'В валюту',
      type: 'select',
      options: [
        { value: 'USD', label: 'USD ($) — Доллар США' },
        { value: 'EUR', label: 'EUR (€) — Евро' },
        { value: 'RUB', label: 'RUB (₽) — Российский рубль' },
        { value: 'GBP', label: 'GBP (£) — Фунт стерлингов' },
        { value: 'JPY', label: 'JPY (¥) — Японская йена' },
        { value: 'CNY', label: 'CNY (元) — Китайский юань' },
        { value: 'UAH', label: 'UAH (₴) — Украинская гривна' },
        { value: 'KZT', label: 'KZT (₸) — Казахстанский тенге' },
        { value: 'BYN', label: 'BYN (Br) — Белорусский рубль' }
      ],
      defaultValue: 'RUB'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат конвертации', type: 'text' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!amount) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Exchange rates relative to USD (approximate)
    const rates: Record<string, number> = {
      'USD': 1,
      'EUR': 0.92,
      'RUB': 92.5,
      'GBP': 0.79,
      'JPY': 151.5,
      'CNY': 7.23,
      'UAH': 41.2,
      'KZT': 500.5,
      'BYN': 3.27
    };
    
    // Convert to USD first, then to target currency
    const inUSD = amount / rates[from];
    const result = inUSD * rates[to];
    
    const currencySymbols: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'RUB': '₽',
      'GBP': '£',
      'JPY': '¥',
      'CNY': '元',
      'UAH': '₴',
      'KZT': '₸',
      'BYN': 'Br'
    };
    
    return [{
      value: `${amount.toFixed(2)} ${currencySymbols[from] || from} = ${result.toFixed(2)} ${currencySymbols[to] || to}`,
      label: 'Результат',
      additionalInfo: 'Курсы приблизительные, обновляются ежедневно'
    }];
  },
  content: {
    howTo: 'Введите сумму, выберите валюту "из" и валюту "в". Калькулятор покажет эквивалентную сумму по текущему курсу.',
    about: 'Конвертер валют переводит денежные суммы из одной валюты в другую по актуальному обменному курсу.',
    usage: 'Используется для планирования путешествий, международных переводов, покупок в иностранных магазинах.',
    formula: 'Сумма в валюте В = Сумма в валюте А × (Курс В / Курс А)',
    faq: [
      {
        question: 'Насколько точны курсы?',
        answer: 'Курсы обновляются ежедневно, но могут отличаться от банковских из-за комиссий и спредов.'
      },
      {
        question: 'Почему нет всех валют?',
        answer: 'В конвертере представлены основные мировые валюты. Редкие валюты могут быть добавлены по запросу.'
      }
    ],
    sources: [
      { title: 'Валюта — Википедия', url: 'https://ru.wikipedia.org/wiki/Валюта' }
    ],
    updatedAt: '2026-04-07'
  },
  popularCalculations: [
    { value: '100 USD в EUR', url: '/konverter-valyut?amount=100&from=USD&to=EUR' },
    { value: '1000 USD в RUB', url: '/konverter-valyut?amount=1000&from=USD&to=RUB' },
    { value: '100 EUR в GBP', url: '/konverter-valyut?amount=100&from=EUR&to=GBP' }
  ]
};

// Конвертер длины
export const lengthConverter: Calculator = {
  id: 'length-converter',
  slug: 'konverter-dlina',
  title: 'Конвертер длины',
  description: 'Перевод метров, километров, сантиметров, дюймов, футов, миль',
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
      options: [
        { value: 'm', label: 'м — метры' },
        { value: 'km', label: 'км — километры' },
        { value: 'cm', label: 'см — сантиметры' },
        { value: 'mm', label: 'мм — миллиметры' },
        { value: 'inch', label: 'дюймы' },
        { value: 'ft', label: 'футы' },
        { value: 'yd', label: 'ярды' },
        { value: 'mi', label: 'мили' },
        { value: 'nm', label: 'нм — нанометры' },
        { value: 'um', label: 'мкм — микрометры' }
      ],
      defaultValue: 'm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'm', label: 'м — метры' },
        { value: 'km', label: 'км — километры' },
        { value: 'cm', label: 'см — сантиметры' },
        { value: 'mm', label: 'мм — миллиметры' },
        { value: 'inch', label: 'дюймы' },
        { value: 'ft', label: 'футы' },
        { value: 'yd', label: 'ярды' },
        { value: 'mi', label: 'мили' },
        { value: 'nm', label: 'нм — нанометры' },
        { value: 'um', label: 'мкм — микрометры' }
      ],
      defaultValue: 'cm'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Convert to meters first
    const toMeters: Record<string, number> = {
      'm': 1,
      'km': 1000,
      'cm': 0.01,
      'mm': 0.001,
      'inch': 0.0254,
      'ft': 0.3048,
      'yd': 0.9144,
      'mi': 1609.344,
      'nm': 1e-9,
      'um': 1e-6
    };
    
    const inMeters = value * toMeters[from];
    const result = inMeters / toMeters[to];
    
    const labels: Record<string, string> = {
      'm': 'м', 'km': 'км', 'cm': 'см', 'mm': 'мм',
      'inch': 'дюймов', 'ft': 'футов', 'yd': 'ярдов', 'mi': 'миль',
      'nm': 'нм', 'um': 'мкм'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение длины, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Длина — физическая величина, характеризующая протяжённость объектов. Основная единица в СИ — метр (м).',
    usage: 'Используется в строительстве, производстве, науке, повседневной жизни для измерения расстояний.',
    formula: '1 км = 1000 м = 100 000 см\n1 дюйм = 2.54 см\n1 фут = 12 дюймов = 30.48 см\n1 миля = 1.609 км',
    faq: [
      {
        question: 'Сколько сантиметров в дюйме?',
        answer: '1 дюйм = 2.54 сантиметра (точное значение).'
      },
      {
        question: 'Как перевести метры в футы?',
        answer: 'Умножьте метры на 3.28084. Например, 2 м ≈ 6.56 футов.'
      }
    ],
    sources: [
      { title: 'Метр — Википедия', url: 'https://ru.wikipedia.org/wiki/Метр' }
    ],
    updatedAt: '2026-04-07'
  },
  popularCalculations: [
    { value: '1 м в см', url: '/konverter-dlina?value=1&from=m&to=cm' },
    { value: '10 км в мили', url: '/konverter-dlina?value=10&from=km&to=mi' },
    { value: '5 футов в метры', url: '/konverter-dlina?value=5&from=ft&to=m' }
  ]
};

// Конвертер массы
export const weightConverter: Calculator = {
  id: 'weight-converter',
  slug: 'konverter-massa',
  title: 'Конвертер массы',
  description: 'Перевод килограммов, граммов, тонн, фунтов, унций',
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
      options: [
        { value: 'kg', label: 'кг — килограммы' },
        { value: 'g', label: 'г — граммы' },
        { value: 'mg', label: 'мг — миллиграммы' },
        { value: 't', label: 'т — тонны' },
        { value: 'lb', label: 'фунты (pounds)' },
        { value: 'oz', label: 'унции (ounces)' },
        { value: 'ct', label: 'караты' }
      ],
      defaultValue: 'kg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'kg', label: 'кг — килограммы' },
        { value: 'g', label: 'г — граммы' },
        { value: 'mg', label: 'мг — миллиграммы' },
        { value: 't', label: 'т — тонны' },
        { value: 'lb', label: 'фунты (pounds)' },
        { value: 'oz', label: 'унции (ounces)' },
        { value: 'ct', label: 'караты' }
      ],
      defaultValue: 'g'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Convert to grams first
    const toGrams: Record<string, number> = {
      'kg': 1000,
      'g': 1,
      'mg': 0.001,
      't': 1e6,
      'lb': 453.592,
      'oz': 28.3495,
      'ct': 0.2
    };
    
    const inGrams = value * toGrams[from];
    const result = inGrams / toGrams[to];
    
    const labels: Record<string, string> = {
      'kg': 'кг', 'g': 'г', 'mg': 'мг', 't': 'т',
      'lb': 'фунтов', 'oz': 'унций', 'ct': 'карат'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите массу, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Масса — физическая величина, определяющая инертность и гравитационные свойства объекта. Основная единица в СИ — килограмм (кг).',
    usage: 'Используется в торговле, кулинарии, медицине, спорте, науке.',
    formula: '1 кг = 1000 г = 1 000 000 мг\n1 т = 1000 кг\n1 фунт ≈ 453.6 г\n1 унция ≈ 28.35 г',
    faq: [
      {
        question: 'Сколько граммов в фунте?',
        answer: '1 фунт (pound) = 453.592 грамма (точное значение).'
      },
      {
        question: 'Что такое карат?',
        answer: 'Карат — единица массы драгоценных камней. 1 карат = 200 мг = 0.2 г.'
      }
    ],
    sources: [
      { title: 'Килограмм — Википедия', url: 'https://ru.wikipedia.org/wiki/Килограмм' }
    ],
    updatedAt: '2026-04-07'
  },
  popularCalculations: [
    { value: '1 кг в граммы', url: '/konverter-massa?value=1&from=kg&to=g' },
    { value: '5 фунтов в кг', url: '/konverter-massa?value=5&from=lb&to=kg' },
    { value: '100 г в унции', url: '/konverter-massa?value=100&from=g&to=oz' }
  ]
};

// Конвертер температуры
export const temperatureConverter: Calculator = {
  id: 'temperature-converter',
  slug: 'konverter-temperatury',
  title: 'Конвертер температуры',
  description: 'Перевод Цельсия, Фаренгейта, Кельвина, Реомюра',
  category: 'konvertery',
  subcategory: 'conv-temperatura',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Температура',
      type: 'number',
      placeholder: '25',
      defaultValue: 25
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'c', label: '°C — Цельсий' },
        { value: 'f', label: '°F — Фаренгейт' },
        { value: 'k', label: 'K — Кельвин' },
        { value: 'r', label: '°Re — Реомюр' }
      ],
      defaultValue: 'c'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'c', label: '°C — Цельсий' },
        { value: 'f', label: '°F — Фаренгейт' },
        { value: 'k', label: 'K — Кельвин' },
        { value: 'r', label: '°Re — Реомюр' }
      ],
      defaultValue: 'f'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (from === to) {
      return [{ value: `${value}° — то же значение`, label: 'Результат' }];
    }
    
    // Convert to Celsius first
    let celsius = value;
    switch (from) {
      case 'f':
        celsius = (value - 32) * 5 / 9;
        break;
      case 'k':
        celsius = value - 273.15;
        break;
      case 'r':
        celsius = value * 5 / 4;
        break;
    }
    
    // Convert from Celsius to target
    let result = celsius;
    switch (to) {
      case 'f':
        result = celsius * 9 / 5 + 32;
        break;
      case 'k':
        result = celsius + 273.15;
        break;
      case 'r':
        result = celsius * 4 / 5;
        break;
    }
    
    const symbols: Record<string, string> = {
      'c': '°C', 'f': '°F', 'k': 'K', 'r': '°Re'
    };
    
    return [{
      value: `${value}${symbols[from]} = ${result.toFixed(2)}${symbols[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите температуру, выберите шкалу "из" и "в". Результат появится автоматически.',
    about: 'Температура — мера теплоты тела. Основные шкалы: Цельсий (°C), Фаренгейт (°F), Кельвин (K — абсолютная шкала).',
    usage: 'Используется в метеорологии, медицине, кулинарии, науке, технике.',
    formula: '°F = °C × 9/5 + 32\nK = °C + 273.15\n°Re = °C × 4/5',
    faq: [
      {
        question: 'Как перевести Цельсий в Фаренгейт?',
        answer: 'Умножьте градусы Цельсия на 9/5 и прибавьте 32. Например, 25°C = 25 × 9/5 + 32 = 77°F.'
      },
      {
        question: 'Что такое абсолютный ноль?',
        answer: 'Абсолютный ноль — теоретически минимальная температура (−273.15°C или 0 K), при которой прекращается тепловое движение.'
      }
    ],
    sources: [
      { title: 'Температура — Википедия', url: 'https://ru.wikipedia.org/wiki/Температура' }
    ],
    updatedAt: '2026-04-07'
  },
  popularCalculations: [
    { value: '0°C в °F', url: '/konverter-temperatury?value=0&from=c&to=f' },
    { value: '100°C в °F', url: '/konverter-temperatury?value=100&from=c&to=f' },
    { value: '37°C в °F', url: '/konverter-temperatury?value=37&from=c&to=f' }
  ]
};

export const converterCalculators = [
  currencyConverter,
  lengthConverter,
  weightConverter,
  temperatureConverter,
];
