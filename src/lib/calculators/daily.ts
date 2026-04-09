import { Calculator } from '../types';

// Калькулятор чаевых
export const tipCalculator: Calculator = {
  id: 'tip-simple-calculator',
  slug: 'kalkulyator-chaevyh',
  title: 'Калькулятор чаевых',
  description: 'Расчёт чаевых и разделение счёта на несколько человек',
  category: 'povsednevnoe',
  subcategory: 'eda-i-napitki',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма счёта',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      min: 0
    },
    {
      name: 'tipPercent',
      label: 'Процент чаевых',
      type: 'select',
      options: [
        { value: '5', label: '5% — минимум' },
        { value: '10', label: '10% — стандарт' },
        { value: '15', label: '15% — хорошо' },
        { value: '20', label: '20% — отлично' }
      ],
      defaultValue: '10'
    },
    {
      name: 'people',
      label: 'Количество человек',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 1
    }
  ],
  outputs: [
    { name: 'tipAmount', label: 'Сумма чаевых', type: 'number', unit: '₽' },
    { name: 'totalAmount', label: 'Итого с чаевыми', type: 'number', unit: '₽' },
    { name: 'perPerson', label: 'С каждого', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const tipPercent = Number(inputs.tipPercent);
    const people = Number(inputs.people);
    
    if (!amount || !people) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const tipAmount = amount * (tipPercent / 100);
    const totalAmount = amount + tipAmount;
    const perPerson = totalAmount / people;
    
    return [
      { value: tipAmount.toFixed(2), label: 'Сумма чаевых', unit: '₽' },
      { value: totalAmount.toFixed(2), label: 'Итого с чаевыми', unit: '₽' },
      { value: perPerson.toFixed(2), label: 'С каждого', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите сумму счёта, процент чаевых и количество человек. Калькулятор рассчитает чаевые и долю каждого.',
    about: 'Калькулятор чаевых помогает рассчитать размер чаевых и разделить общий счёт между несколькими людьми.',
    usage: 'Используется в ресторанах, кафе, такси, отелях для расчёта чаевых.',
    formula: 'Чаевые = сумма × процент / 100\nИтого = сумма + чаевые\nС каждого = итого / количество человек',
    faq: [
      {
        question: 'Какой процент чаевых норма?',
        answer: 'В России: 10-15%, в США: 15-20%, в Европе: 5-10% или округление вверх. Иногда включены в счёт (service charge).'
      },
      {
        question: 'Нужно ли оставлять чаевые?',
        answer: 'В России — по желанию. В США — практически обязательно, так как это основная часть зарплаты персонала.'
      }
    ],
    sources: [
      { title: 'Чаевые — Википедия', url: 'https://ru.wikipedia.org/wiki/Чаевые' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор сна
export const sleepCalculator: Calculator = {
  id: 'sleep-simple-calculator',
  slug: 'kalkulyator-sna',
  title: 'Калькулятор сна',
  description: 'Оптимальное время пробуждения и засыпания по циклам',
  category: 'zdorove-i-krasota',
  subcategory: 'zdorove',
  type: 'formula',
  inputs: [
    {
      name: 'bedTime',
      label: 'Время отхода ко сну',
      type: 'text',
      placeholder: '23:00',
      defaultValue: '23:00'
    },
    {
      name: 'fallAsleepTime',
      label: 'Время засыпания (минут)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15,
      min: 0,
      max: 60
    }
  ],
  outputs: [
    { name: 'wakeTime1', label: 'После 4 циклов', type: 'text' },
    { name: 'wakeTime2', label: 'После 5 циклов', type: 'text' },
    { name: 'wakeTime3', label: 'После 6 циклов', type: 'text' }
  ],
  calculate: (inputs) => {
    const bedTimeStr = String(inputs.bedTime);
    const fallAsleepTime = Number(inputs.fallAsleepTime);
    
    const [hours, minutes] = bedTimeStr.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      return [{ value: 'Неверный формат времени', label: 'Ошибка' }];
    }
    
    // One sleep cycle is approximately 90 minutes
    const cycleLength = 90;
    const bedDate = new Date();
    bedDate.setHours(hours, minutes + fallAsleepTime, 0, 0);
    
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };
    
    const wake1 = new Date(bedDate.getTime() + 4 * cycleLength * 60000);
    const wake2 = new Date(bedDate.getTime() + 5 * cycleLength * 60000);
    const wake3 = new Date(bedDate.getTime() + 6 * cycleLength * 60000);
    
    return [
      { value: formatTime(wake1), label: 'После 4 циклов (6 ч)', unit: '' },
      { value: formatTime(wake2), label: 'После 5 циклов (7.5 ч)', unit: '' },
      { value: formatTime(wake3), label: 'После 6 циклов (9 ч)', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите время отхода ко сну и время, за которое вы обычно засыпаете. Калькулятор покажет оптимальное время пробуждения.',
    about: 'Калькулятор сна основан на циклах сна по 90 минут. Пробуждение в конце цикла помогает чувствовать себя отдохнувшим.',
    usage: 'Используется для планирования оптимального времени пробуждения и повышения качества сна.',
    formula: 'Время пробуждения = время засыпания + (N × 90 минут)\nРекомендуется 4-6 циклов (6-9 часов)',
    faq: [
      {
        question: 'Что такое цикл сна?',
        answer: 'Цикл сна длится около 90 минут и включает фазы: засыпание, лёгкий сон, глубокий сон, БДС (фаза быстрого движения глаз).'
      },
      {
        question: 'Почему важно просыпаться в конце цикла?',
        answer: 'Пробуждение из глубокого сна вызывает сонливость. Проснувшись в лёгкой фазе, вы чувствуете себя бодрее.'
      }
    ],
    sources: [
      { title: 'Сон — Википедия', url: 'https://ru.wikipedia.org/wiki/Сон' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор календаря (номер недели, день года)
export const calendarCalculator: Calculator = {
  id: 'calendar-calculator',
  slug: 'nomer-dnya-i-nedeli',
  title: 'Номер дня и недели',
  description: 'Какой сегодня номер дня в году, номер недели ISO',
  category: 'povsednevnoe',
  subcategory: 'data-i-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'date',
      label: 'Дата',
      type: 'text',
      placeholder: '2026-04-07',
      defaultValue: '2026-04-07'
    }
  ],
  outputs: [
    { name: 'dayOfYear', label: 'День года', type: 'number', unit: 'день' },
    { name: 'weekNumber', label: 'Номер недели ISO', type: 'number', unit: 'неделя' },
    { name: 'dayOfWeek', label: 'День недели', type: 'text' },
    { name: 'daysLeft', label: 'Дней до конца года', type: 'number', unit: 'дн' }
  ],
  calculate: (inputs) => {
    const dateStr = String(inputs.date);
    const date = new Date(dateStr);
    
    if (isNaN(date.getTime())) {
      return [{ value: 'Неверный формат даты', label: 'Ошибка' }];
    }
    
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // ISO week number
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    
    const endOfYear = new Date(date.getFullYear(), 11, 31);
    const daysLeft = Math.floor((endOfYear.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    return [
      { value: dayOfYear.toString(), label: 'День года', unit: 'день' },
      { value: weekNumber.toString(), label: 'Номер недели ISO', unit: 'неделя' },
      { value: dayOfWeek, label: 'День недели', unit: '' },
      { value: daysLeft.toString(), label: 'Дней до конца года', unit: 'дн' }
    ];
  },
  content: {
    howTo: 'Введите дату. Калькулятор покажет номер дня в году, номер недели по стандарту ISO, день недели.',
    about: 'Калькулятор определяет календарные значения: номер дня в году (1-365/366), номер недели ISO (1-52/53).',
    usage: 'Используется для планирования, отчётности, статистики, определения дат по номерам.',
    formula: 'ISO номер недели: первая неделя — та, что содержит первый четверг года.',
    faq: [
      {
        question: 'Что такое номер недели ISO?',
        answer: 'Международный стандарт (ISO 8601): неделя начинается с понедельника, первая неделя содержит первый четверг года.'
      },
      {
        question: 'Сколько дней в високосном году?',
        answer: '366 дней. Високосный год делится на 4, но столетия — только если делятся на 400 (2000 — високосный, 1900 — нет).'
      }
    ],
    sources: [
      { title: 'ISO 8601 — Википедия', url: 'https://ru.wikipedia.org/wiki/ISO_8601' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const dailyCalculators = [
  tipCalculator,
  sleepCalculator,
  calendarCalculator,
];
