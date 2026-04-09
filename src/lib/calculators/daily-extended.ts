import { Calculator } from '../types';

// Калькулятор чаевых
export const tipCalculator: Calculator = {
  id: 'tip-split-calculator',
  slug: 'calculyator-chaevyh',
  title: 'Калькулятор чаевых',
  description: 'Расчёт чаевых в ресторане, кафе, такси — процент от суммы чека',
  category: 'povsednevnoe',
  subcategory: 'everyday-dengi',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма чека (₽)',
      type: 'number',
      placeholder: '1500',
      defaultValue: 1500,
      min: 0,
      step: 0.01
    },
    {
      name: 'tipPercent',
      label: 'Процент чаевых',
      type: 'select',
      options: [
        { value: '5', label: '5% — минимум' },
        { value: '10', label: '10% — стандарт' },
        { value: '15', label: '15% — хорошее обслуживание' },
        { value: '20', label: '20% — отличное обслуживание' },
        { value: '25', label: '25% — выше среднего' }
      ],
      defaultValue: '10'
    },
    {
      name: 'people',
      label: 'Количество человек',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 1,
      max: 50
    }
  ],
  outputs: [
    { name: 'tip', label: 'Сумма чаевых', type: 'number', unit: '₽' },
    { name: 'total', label: 'Итого с чаевыми', type: 'number', unit: '₽' },
    { name: 'perPerson', label: 'С каждого', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const tipPercent = Number(inputs.tipPercent);
    const people = Number(inputs.people);
    
    const tip = amount * (tipPercent / 100);
    const total = amount + tip;
    const perPerson = total / people;
    
    return [
      { 
        value: Math.round(tip * 100) / 100, 
        label: 'Сумма чаевых',
        unit: '₽'
      },
      { 
        value: Math.round(total * 100) / 100, 
        label: 'Итого к оплате',
        unit: '₽'
      },
      { 
        value: Math.round(perPerson * 100) / 100, 
        label: 'С каждого человека',
        unit: '₽'
      }
    ];
  },
  content: {
    howTo: 'Введите сумму чека, выберите процент чаевых и количество человек. Калькулятор покажет сумму чаевых и итоговую сумму.',
    about: 'Чаевые — сумма, voluntarily given to service workers as a reward for good service. В России обычно 5-10%, в США 15-20%.',
    usage: 'Используется в ресторанах, кафе, такси, отелях, при доставке.',
    formula: 'Чаевые = Сумма чека × (Процент / 100)\nИтого = Сумма чека + Чаевые',
    faq: [
      {
        question: 'Сколько чаевых оставлять в России?',
        answer: 'В России стандарт — 5-10% при хорошем обслуживании. В некоторых заведениях чаевые уже включены в счёт (сервисный сбор 10-15%).'
      },
      {
        question: 'А в других странах?',
        answer: 'США: 15-20% обязательно. Европа: округление или 5-10%. Япония: чаевые не принято оставлять.'
      }
    ],
    sources: [
      { title: 'Чаевые — Википедия', url: 'https://ru.wikipedia.org/wiki/Чаевые' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор разделения счёта
export const splitBillCalculator: Calculator = {
  id: 'split-bill-calculator',
  slug: 'razdelenie-cheka',
  title: 'Калькулятор разделения счёта',
  description: 'Разделите счёт между друзьями поровну или по позициям',
  category: 'povsednevnoe',
  subcategory: 'everyday-dengi',
  type: 'formula',
  inputs: [
    {
      name: 'total',
      label: 'Общая сумма (₽)',
      type: 'number',
      placeholder: '3000',
      defaultValue: 3000,
      min: 0
    },
    {
      name: 'people',
      label: 'Количество человек',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      min: 1,
      max: 100
    },
    {
      name: 'tipPercent',
      label: 'Чаевые (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 100
    },
    {
      name: 'roundUp',
      label: 'Округлить до удобной суммы',
      type: 'select',
      options: [
        { value: 'none', label: 'Не округлять' },
        { value: '10', label: 'До 10 ₽' },
        { value: '50', label: 'До 50 ₽' },
        { value: '100', label: 'До 100 ₽' }
      ],
      defaultValue: 'none'
    }
  ],
  outputs: [
    { name: 'perPerson', label: 'С каждого', type: 'number', unit: '₽' },
    { name: 'tipAmount', label: 'Чаевые', type: 'number', unit: '₽' },
    { name: 'totalWithTip', label: 'Итого с чаевыми', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const total = Number(inputs.total);
    const people = Number(inputs.people);
    const tipPercent = Number(inputs.tipPercent);
    const roundUp = String(inputs.roundUp);
    
    const tipAmount = total * (tipPercent / 100);
    const totalWithTip = total + tipAmount;
    let perPerson = totalWithTip / people;
    
    // Round up if requested
    if (roundUp !== 'none') {
      const roundValue = Number(roundUp);
      perPerson = Math.ceil(perPerson / roundValue) * roundValue;
    }
    
    return [
      { 
        value: Math.round(perPerson * 100) / 100, 
        label: 'С каждого человека',
        unit: '₽'
      },
      { 
        value: Math.round(tipAmount * 100) / 100, 
        label: 'Сумма чаевых',
        unit: '₽'
      },
      { 
        value: Math.round(totalWithTip * 100) / 100, 
        label: 'Общая сумма с чаевыми',
        unit: '₽'
      }
    ];
  },
  content: {
    howTo: 'Введите общую сумму, количество человек, процент чаевых. Калькулятор рассчитает сколько должен заплатить каждый.',
    about: 'Удобный инструмент для разделения счёта в компании друзей, коллег или семьи.',
    usage: 'Используется после ужина в ресторане, совместных покупок, поездок.',
    formula: 'С каждого = (Сумма + Чаевые) / Количество человек',
    faq: [
      {
        question: 'Как округлить сумму?',
        answer: 'Выберите "До 50 ₽" или "До 100 ₽", и сумма будет округлена вверх до ближайшего удобного числа.'
      },
      {
        question: 'А если кто-то заказал дороже?',
        answer: 'Этот калькулятор делит поровну. Для разделения по позициям используйте расширенный калькулятор или считайте вручную.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор комплектации посуды
export const dishSetCalculator: Calculator = {
  id: 'dish-set-calculator',
  slug: 'komplektaciya-posudy',
  title: 'Калькулятор комплектации посуды',
  description: 'Сколько тарелок, стаканов, приборов нужно для застолья',
  category: 'povsednevnoe',
  subcategory: 'everyday-eda',
  type: 'formula',
  inputs: [
    {
      name: 'guests',
      label: 'Количество гостей',
      type: 'number',
      placeholder: '8',
      defaultValue: 8,
      min: 1,
      max: 100
    },
    {
      name: 'courses',
      label: 'Количество блюд (подач)',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 1,
      max: 10
    },
    {
      name: 'beverages',
      label: 'Видов напитков',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 1,
      max: 5
    },
    {
      name: 'extraPercent',
      label: 'Запас (%)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 0,
      max: 50
    }
  ],
  outputs: [
    { name: 'plates', label: 'Тарелок', type: 'number', unit: 'шт.' },
    { name: 'glasses', label: 'Стаканов/бокалов', type: 'number', unit: 'шт.' },
    { name: 'cutlery', label: 'Наборов приборов', type: 'number', unit: 'шт.' },
    { name: 'napkins', label: 'Салфеток', type: 'number', unit: 'шт.' }
  ],
  calculate: (inputs) => {
    const guests = Number(inputs.guests);
    const courses = Number(inputs.courses);
    const beverages = Number(inputs.beverages);
    const extraPercent = Number(inputs.extraPercent);
    
    const multiplier = 1 + (extraPercent / 100);
    
    const plates = Math.ceil(guests * courses * multiplier);
    const glasses = Math.ceil(guests * beverages * multiplier);
    const cutlery = Math.ceil(guests * multiplier);
    const napkins = Math.ceil(guests * courses * 2 * multiplier);
    
    return [
      { value: plates, label: 'Всего тарелок', unit: 'шт.' },
      { value: glasses, label: 'Всего стаканов/бокалов', unit: 'шт.' },
      { value: cutlery, label: 'Наборов столовых приборов', unit: 'шт.' },
      { value: napkins, label: 'Салфеток (с запасом)', unit: 'шт.' }
    ];
  },
  content: {
    howTo: 'Введите количество гостей, количество подач блюд, видов напитков и процент запаса. Калькулятор рассчитает необходимое количество посуды.',
    about: 'Помогает рассчитать, хватит ли посуды для приёма гостей или нужно докупить/взять в аренду.',
    usage: 'Используется при подготовке к праздникам, банкетам, свадьбам, корпоративам.',
    formula: 'Тарелки = Гости × Блюда × (1 + Запас)\nСтаканы = Гости × Напитки × (1 + Запас)',
    faq: [
      {
        question: 'Сколько салфеток нужно на человека?',
        answer: 'Рекомендуется 2 салфетки на каждую подачу: одна на колени, одна в руках. Калькулятор добавляет запас.'
      },
      {
        question: 'Что если у меня не хватает?',
        answer: 'Докупите одноразовую посуду или возьмите в аренду. Для неформальных вечеринок одноразовая посуда — норма.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор времени варки яиц
export const eggBoilCalculator: Calculator = {
  id: 'egg-boil-calculator',
  slug: 'varka-yaic',
  title: 'Калькулятор варки яиц',
  description: 'Расчёт точного времени варки яиц для разной степени готовности',
  category: 'povsednevnoe',
  subcategory: 'everyday-eda',
  type: 'formula',
  inputs: [
    {
      name: 'size',
      label: 'Размер яйца',
      type: 'select',
      options: [
        { value: 'S', label: 'S — маленькое (45-53 г)' },
        { value: 'M', label: 'M — среднее (53-63 г)' },
        { value: 'L', label: 'L — крупное (63-73 г)' },
        { value: 'XL', label: 'XL — очень крупное (73+ г)' }
      ],
      defaultValue: 'M'
    },
    {
      name: 'temp',
      label: 'Начальная температура',
      type: 'select',
      options: [
        { value: 'fridge', label: 'Из холодильника (4°C)' },
        { value: 'room', label: 'Комнатная (20°C)' }
      ],
      defaultValue: 'fridge'
    },
    {
      name: 'doneness',
      label: 'Степень готовности',
      type: 'select',
      options: [
        { value: '3', label: 'Всмятку (жидкий желток)' },
        { value: '4.5', label: 'В мешочек (полужидкий желток)' },
        { value: '6', label: 'Вкрутую (твёрдый желток)' }
      ],
      defaultValue: '4.5'
    },
    {
      name: 'altitude',
      label: 'Высота над уровнем моря',
      type: 'select',
      options: [
        { value: '0', label: '0-500 м' },
        { value: '1000', label: '1000 м' },
        { value: '2000', label: '2000 м' },
        { value: '3000', label: '3000 м' }
      ],
      defaultValue: '0'
    }
  ],
  outputs: [
    { name: 'time', label: 'Время варки', type: 'text' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs) => {
    const size = String(inputs.size);
    const temp = String(inputs.temp);
    const doneness = Number(inputs.doneness);
    const altitude = Number(inputs.altitude);
    
    // Base time in minutes for medium egg at room temp
    let baseTime = doneness;
    
    // Adjust for size
    const sizeAdjust = { 'S': 0.8, 'M': 1.0, 'L': 1.2, 'XL': 1.4 };
    baseTime *= sizeAdjust[size as keyof typeof sizeAdjust];
    
    // Adjust for temperature
    if (temp === 'fridge') {
      baseTime += 1;
    }
    
    // Adjust for altitude (boiling point decreases ~1°C per 300m)
    if (altitude > 0) {
      baseTime *= (1 + altitude / 3000);
    }
    
    const minutes = Math.floor(baseTime);
    const seconds = Math.round((baseTime - minutes) * 60);
    
    const donenessNames: Record<string, string> = {
      '3': 'всмятку',
      '4.5': 'в мешочек',
      '6': 'вкрутую'
    };
    
    return [
      { 
        value: `${minutes} мин ${seconds} сек`, 
        label: `Время для яиц ${donenessNames[String(doneness)]}`,
        additionalInfo: 'После закипания воды'
      },
      { 
        value: 'Охладите в ледяной воде 1-2 минуты для лёгкой чистки', 
        label: 'Полезные советы'
      }
    ];
  },
  content: {
    howTo: 'Выберите размер яйца, начальную температуру и желаемую степень готовности. Калькулятор даст точное время варки.',
    about: 'Время варки яиц зависит от размера, начальной температуры и высоты над уровнем моря (температуры кипения воды).',
    usage: 'Используется для приготовления яиц точно по вашему вкусу: всмятку, в мешочек или вкрутую.',
    formula: 'S (45г): -20% времени\nM (58г): базовое время\nL (68г): +20% времени\nXL (73г+): +40% времени',
    faq: [
      {
        question: 'Как варить яйца всмятку?',
        answer: 'Маленькие: 3 мин, Средние: 4 мин, Крупные: 5 мин после закипания воды. Охладите в ледяной воде.'
      },
      {
        question: 'Почему желток становится серым?',
        answer: 'Это происходит при перепекании. Желток начинает темнеть при температуре выше 70°C и длительном нагревании.'
      }
    ],
    sources: [
      { title: 'Яйцо (пищевой продукт) — Википедия', url: 'https://ru.wikipedia.org/wiki/Яйцо_(пищевой_продукт)' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор времени сна
export const sleepCalculator: Calculator = {
  id: 'sleep-calculator',
  slug: 'vremya-sna',
  title: 'Калькулятор времени сна',
  description: 'Расчёт оптимального времени отхода ко сну или пробуждения по циклам сна',
  category: 'povsednevnoe',
  subcategory: 'everyday-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'mode',
      label: 'Режим расчёта',
      type: 'select',
      options: [
        { value: 'wake', label: 'Хочу проснуться в...' },
        { value: 'sleep', label: 'Ложусь спать в...' }
      ],
      defaultValue: 'wake'
    },
    {
      name: 'time',
      label: 'Время',
      type: 'text',
      placeholder: '07:00',
      defaultValue: '07:00'
    },
    {
      name: 'fallAsleep',
      label: 'Время засыпания (мин)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15,
      min: 0,
      max: 60
    },
    {
      name: 'cycles',
      label: 'Количество циклов',
      type: 'select',
      options: [
        { value: '4', label: '4 цикла (6 ч) — минимум' },
        { value: '5', label: '5 циклов (7.5 ч) — норма' },
        { value: '6', label: '6 циклов (9 ч) — оптимум' }
      ],
      defaultValue: '5'
    }
  ],
  outputs: [
    { name: 'result1', label: 'Вариант 1', type: 'text' },
    { name: 'result2', label: 'Вариант 2', type: 'text' },
    { name: 'result3', label: 'Вариант 3', type: 'text' }
  ],
  calculate: (inputs) => {
    const mode = String(inputs.mode);
    const timeStr = String(inputs.time);
    const fallAsleep = Number(inputs.fallAsleep);
    const cycles = Number(inputs.cycles);
    
    // Parse input time
    const [hours, minutes] = timeStr.split(':').map(Number);
    const baseTime = hours * 60 + minutes;
    
    // One sleep cycle = 90 minutes
    const cycleLength = 90;
    const totalSleep = cycles * cycleLength;
    
    const results = [];
    
    if (mode === 'wake') {
      // Calculate when to go to sleep
      for (let i = 3; i <= 6; i++) {
        const sleepMinutes = i * cycleLength;
        const sleepTime = baseTime - sleepMinutes - fallAsleep;
        
        let h = Math.floor((sleepTime / 60) % 24);
        if (h < 0) h += 24;
        const m = Math.abs(Math.floor(sleepTime % 60));
        
        results.push(`${i} циклов (${sleepMinutes/60} ч): ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      }
    } else {
      // Calculate when to wake up
      for (let i = 4; i <= 6; i++) {
        const wakeTime = baseTime + fallAsleep + (i * cycleLength);
        
        const h = Math.floor((wakeTime / 60) % 24);
        const m = Math.floor(wakeTime % 60);
        
        results.push(`${i} циклов (${i*1.5} ч): ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      }
    }
    
    return [
      { value: results[0], label: mode === 'wake' ? 'Лечь спать' : 'Проснуться' },
      { value: results[1], label: mode === 'wake' ? 'Лечь спать' : 'Проснуться' },
      { value: results[2], label: mode === 'wake' ? 'Лечь спать' : 'Проснуться' }
    ];
  },
  content: {
    howTo: 'Выберите режим ("Хочу проснуться" или "Ложусь спать"), введите время. Калькулятор покажет оптимальные варианты по циклам сна.',
    about: 'Человек спит циклами по ~90 минут. Проснуться в конце цикла = бодрость. Проснуться в середине = сонливость.',
    usage: 'Используйте, чтобы выбрать лучшее время для будильника или отхода ко сну.',
    formula: '1 цикл сна = 90 минут (1.5 часа)\n4 цикла = 6 ч (минимум)\n5 циклов = 7.5 ч (норма)\n6 циклов = 9 ч (оптимум)',
    faq: [
      {
        question: 'Почему важны циклы сна?',
        answer: 'Если вы просыпаетесь в фазе глубокого сна, будете чувствовать себя разбитым. Просыпайтесь в фазе быстрого сна или лёгкого сна — конец цикла.'
      },
      {
        question: 'Сколько циклов нужно?',
        answer: 'Взрослому нужно 5-6 циклов (7.5-9 часов). Можно обойтись 4 циклами, но не рекомендуется делать это постоянно.'
      }
    ],
    sources: [
      { title: 'Сон — Википедия', url: 'https://ru.wikipedia.org/wiki/Сон' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор комнатных растений (полив)
export const plantWateringCalculator: Calculator = {
  id: 'plant-watering-calculator',
  slug: 'poliv-rastenij',
  title: 'Калькулятор полива растений',
  description: 'Расчёт частоты полива комнатных растений по сезону и условиям',
  category: 'povsednevnoe',
  subcategory: 'everyday-dom',
  type: 'formula',
  inputs: [
    {
      name: 'plantType',
      label: 'Тип растения',
      type: 'select',
      options: [
        { value: 'succulent', label: 'Суккуленты (кактусы, алоэ)' },
        { value: 'leafy', label: 'Лиственные (фикус, монстера)' },
        { value: 'flowering', label: 'Цветущие (фиалки, орхидеи)' },
        { value: 'palm', label: 'Пальмы и драцены' },
        { value: 'fern', label: 'Папоротники' },
        { value: 'herb', label: 'Пряности (базилик, мята)' }
      ],
      defaultValue: 'leafy'
    },
    {
      name: 'potSize',
      label: 'Размер горшка',
      type: 'select',
      options: [
        { value: 'small', label: 'Малый (до 12 см)' },
        { value: 'medium', label: 'Средний (12-20 см)' },
        { value: 'large', label: 'Крупный (20+ см)' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'season',
      label: 'Сезон',
      type: 'select',
      options: [
        { value: 'summer', label: 'Лето (активный рост)' },
        { value: 'winter', label: 'Зима (покой)' },
        { value: 'transition', label: 'Весна/Осень' }
      ],
      defaultValue: 'summer'
    },
    {
      name: 'conditions',
      label: 'Условия',
      type: 'select',
      options: [
        { value: 'bright', label: 'Яркий свет, тепло' },
        { value: 'moderate', label: 'Умеренный свет' },
        { value: 'shady', label: 'Тень, прохладно' }
      ],
      defaultValue: 'moderate'
    }
  ],
  outputs: [
    { name: 'frequency', label: 'Частота полива', type: 'text' },
    { name: 'amount', label: 'Количество воды', type: 'text' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs) => {
    const plantType = String(inputs.plantType);
    const potSize = String(inputs.potSize);
    const season = String(inputs.season);
    const conditions = String(inputs.conditions);
    
    // Base frequency in days by plant type
    const baseFreq: Record<string, number> = {
      'succulent': 14,
      'leafy': 7,
      'flowering': 5,
      'palm': 10,
      'fern': 4,
      'herb': 3
    };
    
    let frequency = baseFreq[plantType];
    
    // Adjust for season
    const seasonMult: Record<string, number> = {
      'summer': 0.8,
      'winter': 1.5,
      'transition': 1.0
    };
    frequency *= seasonMult[season];
    
    // Adjust for conditions
    const condMult: Record<string, number> = {
      'bright': 0.9,
      'moderate': 1.0,
      'shady': 1.2
    };
    frequency *= condMult[conditions];
    
    // Adjust for pot size
    const potMult: Record<string, number> = {
      'small': 0.9,
      'medium': 1.0,
      'large': 1.2
    };
    frequency *= potMult[potSize];
    
    // Water amount
    const waterAmount: Record<string, string> = {
      'small': '50-100 мл',
      'medium': '200-300 мл',
      'large': '400-600 мл'
    };
    
    // Tips
    const tips: Record<string, string> = {
      'succulent': 'Поливайте только когда земля полностью высохнет',
      'leafy': 'Поддерживайте умеренную влажность почвы',
      'flowering': 'Избегайте попадания воды на листья и цветы',
      'palm': 'Опрыскивайте листья для повышения влажности',
      'fern': 'Не допускайте пересыхания, любят высокую влажность',
      'herb': 'Поливайте обильно, почва должна быть влажной'
    };
    
    return [
      { 
        value: `Каждые ${Math.round(frequency)} дней`, 
        label: 'Рекомендуемая частота полива'
      },
      { 
        value: waterAmount[potSize], 
        label: 'Количество воды'
      },
      { 
        value: tips[plantType], 
        label: 'Специфические советы'
      }
    ];
  },
  content: {
    howTo: 'Выберите тип растения, размер горшка, сезон и условия. Калькулятор даст рекомендации по поливу.',
    about: 'Частота полива зависит от вида растения, размера горшка, сезона, температуры и влажности.',
    usage: 'Используется для составления графика полива домашних растений.',
    formula: 'Суккуленты: 1 раз в 2 недели\nЛиственные: 1 раз в неделю\nЦветущие: 2 раза в неделю',
    faq: [
      {
        question: 'Как понять, что растение нуждается в поливе?',
        answer: 'Проверьте землю на глубине 2-3 см: если сухая — поливайте. Или поднимите горшок: лёгкий = нужен полив.'
      },
      {
        question: 'Почему растение желтеет?',
        answer: 'Причины: переувлажнение (чаще), недостаток света, нехватка питательных веществ, вредители.'
      }
    ],
    sources: [
      { title: 'Комнатные растения — Википедия', url: 'https://ru.wikipedia.org/wiki/Комнатные_растения' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор налогового вычета
export const taxDeductionCalculator: Calculator = {
  id: 'tax-deduction-calculator',
  slug: 'nalogovyj-vychet',
  title: 'Калькулятор налогового вычета',
  description: 'Расчёт суммы возврата налога на имущество, лечение, обучение',
  category: 'povsednevnoe',
  subcategory: 'everyday-dengi',
  type: 'formula',
  inputs: [
    {
      name: 'income',
      label: 'Годовой доход (₽)',
      type: 'number',
      placeholder: '600000',
      defaultValue: 600000,
      min: 0
    },
    {
      name: 'deductionType',
      label: 'Тип вычета',
      type: 'select',
      options: [
        { value: 'property', label: 'Имущественный (квартира, дом)' },
        { value: 'medical', label: 'Лечение' },
        { value: 'education', label: 'Обучение' },
        { value: 'investment', label: 'ИИС (инвестиции)' },
        { value: 'charity', label: 'Благотворительность' }
      ],
      defaultValue: 'property'
    },
    {
      name: 'expenses',
      label: 'Расходы (₽)',
      type: 'number',
      placeholder: '2000000',
      defaultValue: 2000000,
      min: 0
    }
  ],
  outputs: [
    { name: 'maxDeduction', label: 'Максимальный вычет', type: 'number', unit: '₽' },
    { name: 'taxReturn', label: 'Возврат налога', type: 'number', unit: '₽' },
    { name: 'paidTax', label: 'Уплаченный налог', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const income = Number(inputs.income);
    const deductionType = String(inputs.deductionType);
    const expenses = Number(inputs.expenses);
    
    // Tax rate in Russia = 13%
    const taxRate = 0.13;
    const paidTax = income * taxRate;
    
    // Max deductions by type
    const maxDeductions: Record<string, number> = {
      'property': 2000000,
      'medical': 120000,
      'education': 120000,
      'investment': 400000,
      'charity': Math.min(income * 0.25, 1000000)
    };
    
    const maxDeduction = maxDeductions[deductionType];
    const actualDeduction = Math.min(expenses, maxDeduction);
    const taxReturn = Math.min(actualDeduction * taxRate, paidTax);
    
    return [
      { 
        value: maxDeduction, 
        label: 'Максимальная сумма вычета',
        unit: '₽'
      },
      { 
        value: Math.round(taxReturn), 
        label: 'Возврат налога (13%)',
        unit: '₽',
        additionalInfo: 'Максимально возможный'
      },
      { 
        value: Math.round(paidTax), 
        label: 'Уплаченный НДФЛ за год',
        unit: '₽'
      }
    ];
  },
  content: {
    howTo: 'Введите годовой доход, выберите тип вычета и укажите расходы. Калькулятор покажет сумму возврата налога.',
    about: 'Налоговый вычет — сумма, на которую уменьшается налогооблагаемая база. Возвращается 13% от фактических расходов.',
    usage: 'Используется для планирования налоговых вычетов: имущественные, социальные, инвестиционные.',
    formula: 'Возврат = Минимум(Расходы, Лимит) × 13%\nНе более уплаченного НДФЛ',
    faq: [
      {
        question: 'Сколько можно вернуть за квартиру?',
        answer: 'Максимум 260 000 ₽ (13% от 2 млн ₽). Если квартира дороже 2 млн — всё равно 260 000 ₽ максимум.'
      },
      {
        question: 'Можно ли получить вычет за обучение?',
        answer: 'Да, до 15 600 ₽ в год (13% от 120 000 ₽). Распространяется на своё обучение и детей.'
      }
    ],
    sources: [
      { title: 'Налоговый вычет — Википедия', url: 'https://ru.wikipedia.org/wiki/Налоговый_вычет' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const dailyExtendedCalculators = [
  tipCalculator,
  splitBillCalculator,
  dishSetCalculator,
  eggBoilCalculator,
  sleepCalculator,
  plantWateringCalculator,
  taxDeductionCalculator,
];
