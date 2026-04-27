import { Calculator } from '../types';

// Процент от числа
export const percentOfNumberCalculator: Calculator = {
  id: 'percent-of-number',
  slug: 'procentov-ot-chisla',
  title: 'Сколько процентов от числа',
  description: 'Найдите, сколько составляет X% от числа Y',
  category: 'procenty',
  subcategory: 'procenty-osnovnye',
  type: 'formula',
  inputs: [
    {
      name: 'percent',
      label: 'Процент',
      type: 'number',
      placeholder: '25',
      defaultValue: 25,
      unit: '%',
    },
    {
      name: 'number',
      label: 'Число',
      type: 'number',
      placeholder: '200',
      defaultValue: 200,
    },
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'number' },
    { name: 'formula', label: 'Формула', type: 'text' },
  ],
  calculate: (inputs) => {
    const percent = Number(inputs.percent) || 0;
    const number = Number(inputs.number) || 0;
    const result = (percent * number) / 100;
    return [
      { value: result, label: 'Результат' },
      { value: `${percent}% от ${number} = ${result}`, label: 'Формула' },
    ];
  },
  content: {
    howTo: 'Введите процент и число. Результат покажет, сколько составляет данный процент от числа.',
    about: 'Калькулятор для нахождения процента от числа. Используется в финансах, математике, повседневной жизни.',
    usage: 'Пример: 25% от 200 = 50',
    formula: 'Результат = (Процент × Число) ÷ 100',
    faq: [
      { question: 'Как найти 10% от числа?', answer: 'Разделите число на 10.' },
      { question: 'Как найти 50% от числа?', answer: 'Разделите число на 2.' },
      { question: 'Как найти 1% от числа?', answer: 'Разделите число на 100.' },
    ],
    sources: [{ title: 'Проценты — Википедия', url: 'https://ru.wikipedia.org/wiki/Процент' }],
    updatedAt: '2026-04-27',
  },
};

// Число составляет сколько процентов
export const numberIsPercentCalculator: Calculator = {
  id: 'number-is-percent',
  slug: 'chislo-sostavlyaet-procent',
  title: 'Число составляет сколько процентов',
  description: 'Найдите, какой процент составляет число X от числа Y',
  category: 'procenty',
  subcategory: 'procenty-osnovnye',
  type: 'formula',
  inputs: [
    {
      name: 'value',
      label: 'Число (часть)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
    },
    {
      name: 'total',
      label: 'Общее число',
      type: 'number',
      placeholder: '200',
      defaultValue: 200,
    },
  ],
  outputs: [
    { name: 'result', label: 'Процент', type: 'number', unit: '%' },
    { name: 'formula', label: 'Формула', type: 'text' },
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value) || 0;
    const total = Number(inputs.total) || 0;
    if (total === 0) return [{ value: '—', label: 'Процент' }];
    const result = (value * 100) / total;
    return [
      { value: result.toFixed(2), label: 'Процент' },
      { value: `${value} от ${total} = ${result.toFixed(2)}%`, label: 'Формула' },
    ];
  },
  content: {
    howTo: 'Введите часть и общее число. Результат покажет, какой процент составляет часть от целого.',
    about: 'Калькулятор для определения, какой процент составляет одно число от другого.',
    usage: 'Пример: 50 от 200 = 25%',
    formula: 'Результат = (Число × 100) ÷ Общее',
    faq: [
      { question: 'Как узнать, сколько процентов составляет число?', answer: 'Разделите число на общее значение и умножьте на 100.' },
    ],
    sources: [{ title: 'Проценты — Википедия', url: 'https://ru.wikipedia.org/wiki/Процент' }],
    updatedAt: '2026-04-27',
  },
};

// Изменение в процентах
export const percentChangeCalculator: Calculator = {
  id: 'percent-change',
  slug: 'izmenenie-v-procentah',
  title: 'Изменение в процентах',
  description: 'Найдите изменение в процентах между двумя числами',
  category: 'procenty',
  subcategory: 'procenty-izmenenie',
  type: 'formula',
  inputs: [
    {
      name: 'oldValue',
      label: 'Старое значение',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
    },
    {
      name: 'newValue',
      label: 'Новое значение',
      type: 'number',
      placeholder: '150',
      defaultValue: 150,
    },
  ],
  outputs: [
    { name: 'result', label: 'Изменение', type: 'number', unit: '%' },
    { name: 'formula', label: 'Формула', type: 'text' },
  ],
  calculate: (inputs) => {
    const oldValue = Number(inputs.oldValue) || 0;
    const newValue = Number(inputs.newValue) || 0;
    if (oldValue === 0) return [{ value: '—', label: 'Изменение' }];
    const result = ((newValue - oldValue) * 100) / oldValue;
    const sign = result > 0 ? '+' : '';
    return [
      { value: `${sign}${result.toFixed(2)}`, label: 'Изменение' },
      { value: `Изменение: ${oldValue} → ${newValue} = ${sign}${result.toFixed(2)}%`, label: 'Формула' },
    ];
  },
  content: {
    howTo: 'Введите старое и новое значение. Результат покажет процент изменения.',
    about: 'Калькулятор для расчёта изменения в процентах между двумя значениями.',
    usage: 'Пример: изменение с 100 на 150 = +50%',
    formula: 'Результат = ((Новое − Старое) × 100) ÷ Старое',
    faq: [
      { question: 'Как рассчитать рост в процентах?', answer: 'Введите старое значение и новое (большее). Положительный результат — рост.' },
      { question: 'Как рассчитать снижение в процентах?', answer: 'Введите старое значение и новое (меньшее). Отрицательный результат — снижение.' },
    ],
    sources: [{ title: 'Проценты — Википедия', url: 'https://ru.wikipedia.org/wiki/Процент' }],
    updatedAt: '2026-04-27',
  },
};

// Прибавить процент
export const addPercentCalculator: Calculator = {
  id: 'add-percent',
  slug: 'dobavit-procent',
  title: 'Прибавить процент к числу',
  description: 'Прибавьте X% к числу Y',
  category: 'procenty',
  subcategory: 'procenty-izmenenie',
  type: 'formula',
  inputs: [
    {
      name: 'number',
      label: 'Число',
      type: 'number',
      placeholder: '200',
      defaultValue: 200,
    },
    {
      name: 'percent',
      label: 'Процент',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      unit: '%',
    },
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'number' },
    { name: 'formula', label: 'Формула', type: 'text' },
  ],
  calculate: (inputs) => {
    const number = Number(inputs.number) || 0;
    const percent = Number(inputs.percent) || 0;
    const result = number + (number * percent) / 100;
    return [
      { value: result, label: 'Результат' },
      { value: `${number} + ${percent}% = ${result}`, label: 'Формула' },
    ];
  },
  content: {
    howTo: 'Введите число и процент. Результат — число, увеличенное на заданный процент.',
    about: 'Калькулятор для прибавления процента к числу.',
    usage: 'Пример: 200 + 10% = 220',
    formula: 'Результат = Число + (Число × Процент ÷ 100)',
    faq: [
      { question: 'Как прибавить НДС к цене?', answer: 'Введите цену и ставку НДС (20%). Результат — цена с НДС.' },
    ],
    sources: [{ title: 'Проценты — Википедия', url: 'https://ru.wikipedia.org/wiki/Процент' }],
    updatedAt: '2026-04-27',
  },
};

// Вычесть процент
export const subtractPercentCalculator: Calculator = {
  id: 'subtract-percent',
  slug: 'vyčest-procent',
  title: 'Вычесть процент из числа',
  description: 'Вычтите X% из числа Y',
  category: 'procenty',
  subcategory: 'procenty-izmenenie',
  type: 'formula',
  inputs: [
    {
      name: 'number',
      label: 'Число',
      type: 'number',
      placeholder: '200',
      defaultValue: 200,
    },
    {
      name: 'percent',
      label: 'Процент',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      unit: '%',
    },
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'number' },
    { name: 'formula', label: 'Формула', type: 'text' },
  ],
  calculate: (inputs) => {
    const number = Number(inputs.number) || 0;
    const percent = Number(inputs.percent) || 0;
    const result = number - (number * percent) / 100;
    return [
      { value: result, label: 'Результат' },
      { value: `${number} − ${percent}% = ${result}`, label: 'Формула' },
    ];
  },
  content: {
    howTo: 'Введите число и процент. Результат — число, уменьшенное на заданный процент.',
    about: 'Калькулятор для вычитания процента из числа.',
    usage: 'Пример: 200 − 10% = 180',
    formula: 'Результат = Число − (Число × Процент ÷ 100)',
    faq: [
      { question: 'Как вычесть скидку из цены?', answer: 'Введите цену и процент скидки. Результат — цена со скидкой.' },
    ],
    sources: [{ title: 'Проценты — Википедия', url: 'https://ru.wikipedia.org/wiki/Процент' }],
    updatedAt: '2026-04-27',
  },
};

// Сложные проценты
export const compoundPercentCalculator: Calculator = {
  id: 'compound-percent',
  slug: 'složnye-procenty',
  title: 'Сложные проценты',
  description: 'Расчёт сложных процентов (капитализация)',
  category: 'procenty',
  subcategory: 'procenty-slozhnye',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Начальная сумма',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
    },
    {
      name: 'rate',
      label: 'Ставка',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      unit: '%',
    },
    {
      name: 'periods',
      label: 'Количество периодов',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
    },
  ],
  outputs: [
    { name: 'result', label: 'Итоговая сумма', type: 'number' },
    { name: 'profit', label: 'Прибыль', type: 'number' },
    { name: 'formula', label: 'Формула', type: 'text' },
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount) || 0;
    const rate = Number(inputs.rate) || 0;
    const periods = Number(inputs.periods) || 0;
    const result = amount * Math.pow(1 + rate / 100, periods);
    const profit = result - amount;
    return [
      { value: result.toFixed(2), label: 'Итоговая сумма' },
      { value: profit.toFixed(2), label: 'Прибыль' },
      { value: `${amount} × (1 + ${rate}/100)^${periods} = ${result.toFixed(2)}`, label: 'Формула' },
    ];
  },
  content: {
    howTo: 'Введите начальную сумму, ставку и количество периодов. Результат — итоговая сумма с учётом сложных процентов.',
    about: 'Калькулятор сложных процентов для инвестиций и банковских вкладов.',
    usage: 'Пример: 1000 под 10% на 2 года = 1210',
    formula: 'Результат = Сумма × (1 + Ставка)^Период',
    faq: [
      { question: 'Что такое сложные проценты?', answer: 'Проценты, начисляемые не только на начальную сумму, но и на накопленные проценты.' },
    ],
    sources: [{ title: 'Сложные проценты — Википедия', url: 'https://ru.wikipedia.org/wiki/Сложные_проценты' }],
    updatedAt: '2026-04-27',
  },
};

// Разница в процентах
export const percentDifferenceCalculator: Calculator = {
  id: 'percent-difference',
  slug: 'raznica-v-procentah',
  title: 'Разница в процентах',
  description: 'Найдите разницу между двумя числами в процентах',
  category: 'procenty',
  subcategory: 'procenty-osnovnye',
  type: 'formula',
  inputs: [
    {
      name: 'value1',
      label: 'Первое число',
      type: 'number',
      placeholder: '80',
      defaultValue: 80,
    },
    {
      name: 'value2',
      label: 'Второе число',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
    },
  ],
  outputs: [
    { name: 'result', label: 'Разница', type: 'number', unit: '%' },
    { name: 'formula', label: 'Формула', type: 'text' },
  ],
  calculate: (inputs) => {
    const value1 = Number(inputs.value1) || 0;
    const value2 = Number(inputs.value2) || 0;
    if (value1 === 0) return [{ value: '—', label: 'Разница' }];
    const result = (Math.abs(value2 - value1) * 100) / value1;
    return [
      { value: result.toFixed(2), label: 'Разница' },
      { value: `Разница: |${value2} − ${value1}| / ${value1} = ${result.toFixed(2)}%`, label: 'Формула' },
    ];
  },
  content: {
    howTo: 'Введите два числа. Результат покажет разницу между ними в процентах.',
    about: 'Калькулятор для нахождения разницы в процентах.',
    usage: 'Пример: разница между 80 и 100 = 25%',
    formula: 'Результат = (|Число1 − Число2| × 100) ÷ Число1',
    faq: [],
    sources: [{ title: 'Проценты — Википедия', url: 'https://ru.wikipedia.org/wiki/Процент' }],
    updatedAt: '2026-04-27',
  },
};

export const percentageCalculators: Calculator[] = [
  percentOfNumberCalculator,
  numberIsPercentCalculator,
  percentChangeCalculator,
  addPercentCalculator,
  subtractPercentCalculator,
  compoundPercentCalculator,
  percentDifferenceCalculator,
];
