import { Calculator } from '../types';

// Конвертер времени
export const timeConverter: Calculator = {
  id: 'time-converter',
  slug: 'konverter-vremeni',
  title: 'Конвертер времени',
  description: 'Перевод секунд, минут, часов, дней, недель, месяцев, лет',
  category: 'konvertery',
  subcategory: 'conv-vremya',
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
        { value: 'ms', label: 'мс — миллисекунды' },
        { value: 's', label: 'с — секунды' },
        { value: 'min', label: 'мин — минуты' },
        { value: 'h', label: 'ч — часы' },
        { value: 'd', label: 'д — дни' },
        { value: 'w', label: 'нед — недели' },
        { value: 'mo', label: 'мес — месяцы (30 дн)' },
        { value: 'y', label: 'г — годы' }
      ],
      defaultValue: 'h'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'ms', label: 'мс — миллисекунды' },
        { value: 's', label: 'с — секунды' },
        { value: 'min', label: 'мин — минуты' },
        { value: 'h', label: 'ч — часы' },
        { value: 'd', label: 'д — дни' },
        { value: 'w', label: 'нед — недели' },
        { value: 'mo', label: 'мес — месяцы (30 дн)' },
        { value: 'y', label: 'г — годы' }
      ],
      defaultValue: 'min'
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
    
    // Convert to seconds first
    const toSeconds: Record<string, number> = {
      'ms': 0.001,
      's': 1,
      'min': 60,
      'h': 3600,
      'd': 86400,
      'w': 604800,
      'mo': 2592000, // 30 days
      'y': 31536000 // 365 days
    };
    
    const inSeconds = value * toSeconds[from];
    const result = inSeconds / toSeconds[to];
    
    const labels: Record<string, string> = {
      'ms': 'мс', 's': 'с', 'min': 'мин', 'h': 'ч',
      'd': 'д', 'w': 'нед', 'mo': 'мес', 'y': 'г'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Время — физическая величина, одна из семи основных единиц СИ. Секунда — базовая единица.',
    usage: 'Используется повсеместно: в физике, жизни, работе, науке, спорте.',
    formula: '1 мин = 60 с\n1 ч = 60 мин = 3600 с\n1 день = 24 ч = 86400 с\n1 год = 365 дней',
    faq: [
      {
        question: 'Сколько секунд в часе?',
        answer: '1 час = 3600 секунд (60 минут × 60 секунд).'
      },
      {
        question: 'Сколько недель в году?',
        answer: '52 недели и 1 день (или 2 в високосный год).'
      }
    ],
    sources: [
      { title: 'Время — Википедия', url: 'https://ru.wikipedia.org/wiki/Время' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор возраста
export const ageCalculator: Calculator = {
  id: 'age-detailed-calculator',
  slug: 'kalkulyator-vozrasta',
  title: 'Калькулятор возраста',
  description: 'Точный расчёт возраста в годах, месяцах и днях',
  category: 'povsednevnoe',
  subcategory: 'data-i-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'birthDate',
      label: 'Дата рождения',
      type: 'text',
      placeholder: '1990-05-15',
      defaultValue: '1990-05-15'
    },
    {
      name: 'calculateDate',
      label: 'Дата расчёта (по умолчанию сегодня)',
      type: 'text',
      placeholder: '2026-04-07',
      defaultValue: '2026-04-07'
    }
  ],
  outputs: [
    { name: 'years', label: 'Полных лет', type: 'number', unit: 'лет' },
    { name: 'months', label: 'Месяцев', type: 'number', unit: 'мес' },
    { name: 'days', label: 'Дней', type: 'number', unit: 'дн' }
  ],
  calculate: (inputs) => {
    const birthDateStr = String(inputs.birthDate);
    const calculateDateStr = String(inputs.calculateDate) || new Date().toISOString().split('T')[0];
    
    const birthDate = new Date(birthDateStr);
    const calcDate = new Date(calculateDateStr);
    
    if (isNaN(birthDate.getTime()) || isNaN(calcDate.getTime())) {
      return [{ value: 'Неверный формат даты', label: 'Ошибка' }];
    }
    
    let years = calcDate.getFullYear() - birthDate.getFullYear();
    let months = calcDate.getMonth() - birthDate.getMonth();
    let days = calcDate.getDate() - birthDate.getDate();
    
    if (days < 0) {
      months--;
      days += new Date(calcDate.getFullYear(), calcDate.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((calcDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return [
      { value: years.toString(), label: 'Полных лет', unit: 'лет' },
      { value: (years * 12 + months).toString(), label: 'Всего месяцев', unit: 'мес' },
      { value: totalDays.toString(), label: 'Всего дней', unit: 'дн' }
    ];
  },
  content: {
    howTo: 'Введите дату рождения и дату расчёта (или оставьте пустым для сегодня). Калькулятор покажет точный возраст.',
    about: 'Калькулятор возраста вычисляет точный возраст в годах, месяцах и днях между двумя датами.',
    usage: 'Используется для определения возраста, стажа, времени с момента события.',
    formula: 'Возраст = текущая дата − дата рождения',
    faq: [
      {
        question: 'Какой формат даты?',
        answer: 'YYYY-MM-DD, например: 1990-05-15 для 15 мая 1990 года.'
      },
      {
        question: 'Учитывает ли високосные годы?',
        answer: 'Да, калькулятор точно учитывает все високосные годы при расчёте.'
      }
    ],
    sources: [
      { title: 'Возраст — Википедия', url: 'https://ru.wikipedia.org/wiki/Возраст' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор разницы между датами
export const dateDiffCalculator: Calculator = {
  id: 'date-diff-advanced',
  slug: 'raznica-mezhdu-datami',
  title: 'Разница между датами',
  description: 'Сколько дней, часов, минут между двумя датами',
  category: 'povsednevnoe',
  subcategory: 'data-i-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'startDate',
      label: 'Начальная дата',
      type: 'text',
      placeholder: '2026-01-01',
      defaultValue: '2026-01-01'
    },
    {
      name: 'endDate',
      label: 'Конечная дата',
      type: 'text',
      placeholder: '2026-04-07',
      defaultValue: '2026-04-07'
    }
  ],
  outputs: [
    { name: 'days', label: 'Дней', type: 'number', unit: 'дн' },
    { name: 'hours', label: 'Часов', type: 'number', unit: 'ч' },
    { name: 'minutes', label: 'Минут', type: 'number', unit: 'мин' }
  ],
  calculate: (inputs) => {
    const startStr = String(inputs.startDate);
    const endStr = String(inputs.endDate);
    
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return [{ value: 'Неверный формат даты', label: 'Ошибка' }];
    }
    
    const diffMs = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor(diffMs / (1000 * 60));
    
    return [
      { value: days.toString(), label: 'Дней', unit: 'дн' },
      { value: hours.toString(), label: 'Часов', unit: 'ч' },
      { value: minutes.toString(), label: 'Минут', unit: 'мин' }
    ];
  },
  content: {
    howTo: 'Введите начальную и конечную даты. Калькулятор покажет разницу в днях, часах и минутах.',
    about: 'Калькулятор разницы между датами вычисляет точное время между двумя моментами.',
    usage: 'Используется для расчёта сроков, стажа, времени до события, продолжительности.',
    formula: 'Разница = конечная дата − начальная дата',
    faq: [
      {
        question: 'Учитывается ли время суток?',
        answer: 'Да, если в дате указано время (например, 2026-01-01T12:00). Иначе считается с 00:00.'
      },
      {
        question: 'Можно ли считать в прошлое?',
        answer: 'Да, если начальная дата позже конечной, результат будет отрицательным.'
      }
    ],
    sources: [
      { title: 'Интервал времени — Википедия', url: 'https://ru.wikipedia.org/wiki/Интервал_времени' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор рабочих дней
export const workDaysCalculator: Calculator = {
  id: 'work-days-calculator',
  slug: 'kalkulyator-rabochih-dnej',
  title: 'Калькулятор рабочих дней',
  description: 'Сколько рабочих дней между датами (без выходных)',
  category: 'povsednevnoe',
  subcategory: 'data-i-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'startDate',
      label: 'Начальная дата',
      type: 'text',
      placeholder: '2026-01-01',
      defaultValue: '2026-01-01'
    },
    {
      name: 'endDate',
      label: 'Конечная дата',
      type: 'text',
      placeholder: '2026-01-31',
      defaultValue: '2026-01-31'
    }
  ],
  outputs: [
    { name: 'workDays', label: 'Рабочих дней', type: 'number', unit: 'дн' },
    { name: 'weekends', label: 'Выходных', type: 'number', unit: 'дн' },
    { name: 'totalDays', label: 'Всего дней', type: 'number', unit: 'дн' }
  ],
  calculate: (inputs) => {
    const startStr = String(inputs.startDate);
    const endStr = String(inputs.endDate);
    
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return [{ value: 'Неверный формат даты', label: 'Ошибка' }];
    }
    
    let workDays = 0;
    let weekends = 0;
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else {
        workDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return [
      { value: workDays.toString(), label: 'Рабочих дней', unit: 'дн' },
      { value: weekends.toString(), label: 'Выходных', unit: 'дн' },
      { value: totalDays.toString(), label: 'Всего дней', unit: 'дн' }
    ];
  },
  content: {
    howTo: 'Введите начальную и конечную даты. Калькулятор посчитает рабочие дни (пн-пт) и выходные (сб-вс).',
    about: 'Калькулятор рабочих дней определяет количество рабочих дней между двумя датами, исключая субботы и воскресенья.',
    usage: 'Используется для расчёта сроков выполнения работ, отпусков, дедлайнов.',
    formula: 'Подсчёт дней с понедельника по пятницу между двумя датами.',
    faq: [
      {
        question: 'Учитываются ли праздники?',
        answer: 'Нет, базовый калькулятор считает только субботы и воскресенья. Праздники считаются рабочими днями.'
      },
      {
        question: 'Как считаются граничные даты?',
        answer: 'Обе даты включаются в расчёт. Например, с пн по пт = 5 рабочих дней.'
      }
    ],
    sources: [
      { title: 'Рабочий день — Википедия', url: 'https://ru.wikipedia.org/wiki/Рабочий_день' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const timeDateCalculators = [
  timeConverter,
  ageCalculator,
  dateDiffCalculator,
  workDaysCalculator,
];
