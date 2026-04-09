import { Calculator } from '../types';

// Калькулятор даты родов
export const dueDateCalculator: Calculator = {
  id: 'due-date',
  slug: 'data-rodov',
  title: 'Калькулятор даты родов',
  description: 'Расчёт предполагаемой даты родов по дате последней менструации',
  category: 'zdorove-i-krasota',
  subcategory: 'beremennost-i-deti',
  type: 'formula',
  inputs: [
    {
      name: 'lastPeriod',
      label: 'Первый день последней менструации',
      type: 'date',
      placeholder: '',
      defaultValue: ''
    },
    {
      name: 'cycleLength',
      label: 'Длина цикла (дней)',
      type: 'number',
      placeholder: '28',
      defaultValue: 28,
      min: 21,
      max: 35
    }
  ],
  outputs: [
    { name: 'dueDate', label: 'Дата родов', type: 'text' },
    { name: 'conceptionDate', label: 'Примерная дата зачатия', type: 'text' },
    { name: 'currentWeek', label: 'Текущая неделя', type: 'number', unit: 'неделя' },
    { name: 'daysLeft', label: 'Осталось дней', type: 'number', unit: 'дней' }
  ],
  calculate: (inputs) => {
    const lastPeriod = new Date(String(inputs.lastPeriod));
    const cycleLength = Number(inputs.cycleLength) || 28;
    
    if (!lastPeriod || isNaN(lastPeriod.getTime())) {
      return [{ value: 'Введите дату', label: 'Результат' }];
    }
    
    // Дата родов = ДПМ + 280 дней (40 недель)
    const dueDate = new Date(lastPeriod);
    dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));
    
    // Дата зачатия (примерно через 14 дней от ДПМ)
    const conceptionDate = new Date(lastPeriod);
    conceptionDate.setDate(conceptionDate.getDate() + 14);
    
    // Текущая неделя беременности
    const today = new Date();
    const diffTime = today.getTime() - lastPeriod.getTime();
    const currentWeek = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    
    // Осталось дней
    const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };
    
    return [
      { value: formatDate(dueDate), label: 'Дата родов' },
      { value: formatDate(conceptionDate), label: 'Примерная дата зачатия' },
      { value: currentWeek.toString(), label: 'Текущая неделя', unit: 'неделя' },
      { value: daysLeft.toString(), label: 'Осталось дней', unit: 'дней' }
    ];
  },
  content: {
    howTo: 'Введите дату первого дня последней менструации и длину вашего цикла (обычно 28 дней).',
    about: 'Нормальная беременность длится около 40 недель (280 дней) от первого дня последней менструации.',
    usage: 'Используйте для планирования, отслеживания срока беременности, определения триместров.',
    formula: 'Дата родов = ДПМ + 280 дней (+ коррекция по длине цикла)',
    faq: [
      {
        question: 'Насколько точен расчёт?',
        answer: 'Только 4% родов происходят в расчётную дату. 70% родов происходят в пределах 10 дней от срока.'
      },
      {
        question: 'Что такое триместры?',
        answer: '1 триместр: 1-12 недель, 2 триместр: 13-27 недель, 3 триместр: 28-40 недель.'
      }
    ],
    sources: [
      { title: 'Беременность — Википедия', url: 'https://ru.wikipedia.org/wiki/Беременность' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор овуляции
export const ovulationCalculator: Calculator = {
  id: 'ovulation',
  slug: 'ovulyaciya',
  title: 'Калькулятор овуляции',
  description: 'Расчёт фертильного окна и даты овуляции',
  category: 'zdorove-i-krasota',
  subcategory: 'beremennost-i-deti',
  type: 'formula',
  inputs: [
    {
      name: 'lastPeriod',
      label: 'Первый день последней менструации',
      type: 'date',
      placeholder: '',
      defaultValue: ''
    },
    {
      name: 'cycleLength',
      label: 'Средняя длина цикла (дней)',
      type: 'number',
      placeholder: '28',
      defaultValue: 28,
      min: 21,
      max: 35
    }
  ],
  outputs: [
    { name: 'ovulationDate', label: 'Овуляция', type: 'text' },
    { name: 'fertileStart', label: 'Начало фертильного окна', type: 'text' },
    { name: 'fertileEnd', label: 'Конец фертильного окна', type: 'text' },
    { name: 'nextPeriod', label: 'Следующая менструация', type: 'text' }
  ],
  calculate: (inputs) => {
    const lastPeriod = new Date(String(inputs.lastPeriod));
    const cycleLength = Number(inputs.cycleLength) || 28;
    
    if (!lastPeriod || isNaN(lastPeriod.getTime())) {
      return [{ value: 'Введите дату', label: 'Результат' }];
    }
    
    // Овуляция обычно за 14 дней до следующей менструации
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);
    
    // Фертильное окно: 5 дней до овуляции + 1 день после
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);
    
    // Следующая менструация
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    };
    
    return [
      { value: formatDate(ovulationDate), label: 'Овуляция' },
      { value: formatDate(fertileStart), label: 'Начало фертильного окна' },
      { value: formatDate(fertileEnd), label: 'Конец фертильного окна' },
      { value: formatDate(nextPeriod), label: 'Следующая менструация' }
    ];
  },
  content: {
    howTo: 'Введите дату начала последней менструации и среднюю длину цикла.',
    about: 'Овуляция — выход яйцеклетки из яичника. Фертильное окно — 6 дней, когда возможно зачатие.',
    usage: 'Планирование беременности или контрацепции.',
    formula: 'Овуляция = ДПМ + (длина цикла − 14 дней)',
    faq: [
      {
        question: 'Какие дни самые фертильные?',
        answer: 'Два дня до овуляции и день овуляции — пик фертильности. Вероятность зачатия 20-30%.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор идеального веса
export const idealWeightCalculator: Calculator = {
  id: 'ideal-weight',
  slug: 'idealnyj-ves',
  title: 'Калькулятор идеального веса',
  description: 'Расчёт идеального веса по росту, полу и возрасту',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '170',
      defaultValue: 170,
      min: 100,
      max: 250
    },
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' }
      ],
      defaultValue: 'male'
    },
    {
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 18,
      max: 100
    }
  ],
  outputs: [
    { name: 'broca', label: 'Формула Брока', type: 'number', unit: 'кг' },
    { name: 'devine', label: 'Формула Девайна', type: 'number', unit: 'кг' },
    { name: 'robinson', label: 'Формула Робинсона', type: 'number', unit: 'кг' },
    { name: 'range', label: 'Нормальный диапазон', type: 'text' }
  ],
  calculate: (inputs) => {
    const height = Number(inputs.height);
    const gender = String(inputs.gender);
    const age = Number(inputs.age);
    
    if (!height || !age) return [{ value: '—', label: 'Результат' }];
    
    const baseHeight = height - 100;
    
    // Формула Брока
    const broca = gender === 'male' ? baseHeight * 0.9 : baseHeight * 0.85;
    
    // Формула Девайна
    const devine = gender === 'male' 
      ? 50 + 0.91 * (height - 152.4)
      : 45.5 + 0.91 * (height - 152.4);
    
    // Формула Робинсона
    const robinson = gender === 'male'
      ? 52 + 1.9 * ((height - 152.4) / 2.54)
      : 49 + 1.7 * ((height - 152.4) / 2.54);
    
    // Диапазон ±10%
    const avgWeight = (broca + devine + robinson) / 3;
    const minWeight = (avgWeight * 0.9).toFixed(1);
    const maxWeight = (avgWeight * 1.1).toFixed(1);
    
    return [
      { value: broca.toFixed(1), label: 'Формула Брока', unit: 'кг' },
      { value: devine.toFixed(1), label: 'Формула Девайна', unit: 'кг' },
      { value: robinson.toFixed(1), label: 'Формула Робинсона', unit: 'кг' },
      { value: `${minWeight} — ${maxWeight} кг`, label: 'Нормальный диапазон' }
    ];
  },
  content: {
    howTo: 'Введите рост, пол и возраст.',
    about: 'Идеальный вес рассчитывается по разным формулам. Результаты приблизительные и индивидуальны.',
    usage: 'Ориентир для оценки веса. Консультируйтесь с врачом.',
    formula: 'Брока: мужчины − 100 × 0.9, женщины − 100 × 0.85',
    faq: [],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор процента жира в организме
export const bodyFatCalculator: Calculator = {
  id: 'body-fat',
  slug: 'procent-zhira',
  title: 'Калькулятор % жира в организме',
  description: 'Расчёт процента жира по измерениям (US Navy method)',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' }
      ],
      defaultValue: 'male'
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '175',
      defaultValue: 175,
      min: 100,
      max: 250
    },
    {
      name: 'neck',
      label: 'Обхват шеи (см)',
      type: 'number',
      placeholder: '40',
      defaultValue: 40,
      min: 20,
      max: 80
    },
    {
      name: 'waist',
      label: 'Обхват талии (см)',
      type: 'number',
      placeholder: '85',
      defaultValue: 85,
      min: 40,
      max: 200
    },
    {
      name: 'hip',
      label: 'Обхват бёдер (только для женщин, см)',
      type: 'number',
      placeholder: '95',
      defaultValue: 95,
      min: 40,
      max: 200
    }
  ],
  outputs: [
    { name: 'bodyFat', label: 'Процент жира', type: 'number', unit: '%' },
    { name: 'fatMass', label: 'Масса жира', type: 'number', unit: 'кг' },
    { name: 'leanMass', label: 'Мышечная масса', type: 'number', unit: 'кг' },
    { name: 'category', label: 'Категория', type: 'text' }
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender);
    const height = Number(inputs.height);
    const neck = Number(inputs.neck);
    const waist = Number(inputs.waist);
    const hip = Number(inputs.hip);
    
    if (!height || !neck || !waist) return [{ value: '—', label: 'Результат' }];
    
    // Формула US Navy
    let bodyFat = 0;
    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      if (!hip) return [{ value: 'Введите обхват бёдер', label: 'Результат' }];
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
    }
    
    bodyFat = Math.max(2, Math.min(60, bodyFat)); // Ограничение
    
    // Примерный вес (базовый)
    const weight = gender === 'male' ? 75 : 60;
    const fatMass = (weight * bodyFat / 100).toFixed(1);
    const leanMass = (weight - Number(fatMass)).toFixed(1);
    
    // Категория
    let category = '';
    if (gender === 'male') {
      if (bodyFat < 6) category = 'Спортивная форма';
      else if (bodyFat < 14) category = 'Хорошая форма';
      else if (bodyFat < 18) category = 'Средний уровень';
      else if (bodyFat < 25) category = 'Выше среднего';
      else category = 'Ожирение';
    } else {
      if (bodyFat < 14) category = 'Спортивная форма';
      else if (bodyFat < 21) category = 'Хорошая форма';
      else if (bodyFat < 25) category = 'Средний уровень';
      else if (bodyFat < 32) category = 'Выше среднего';
      else category = 'Ожирение';
    }
    
    return [
      { value: bodyFat.toFixed(1), label: 'Процент жира', unit: '%' },
      { value: fatMass, label: 'Масса жира', unit: 'кг' },
      { value: leanMass, label: 'Мышечная масса', unit: 'кг' },
      { value: category, label: 'Категория' }
    ];
  },
  content: {
    howTo: 'Измерьте обхват шеи (на уровне Адамова яблока), талии (на уровне пупка) и бёдер (для женщин).',
    about: 'Процент жира — важный показатель здоровья. Норма для мужчин: 10-20%, для женщин: 18-28%.',
    usage: 'Отслеживание физической формы, контроль диеты и тренировок.',
    formula: 'US Navy method: использует логарифмические соотношения окружностей',
    faq: [
      {
        question: 'Как точно измерить?',
        answer: 'Используйте сантиметровую ленту. Измеряйте утром на пустой желудок, не втягивайте живот.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор нормы воды
export const waterIntakeCalculator: Calculator = {
  id: 'water-intake',
  slug: 'norma-vody',
  title: 'Калькулятор нормы воды',
  description: 'Расчёт суточной нормы потребления воды',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 20,
      max: 300
    },
    {
      name: 'activity',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: '1', label: 'Минимальная (сидячий образ)' },
        { value: '1.2', label: 'Низкая (лёгкие прогулки)' },
        { value: '1.5', label: 'Средняя (тренировки 3 раза/неделю)' },
        { value: '2', label: 'Высокая (ежедневные тренировки)' }
      ],
      defaultValue: '1.2'
    },
    {
      name: 'climate',
      label: 'Климат',
      type: 'select',
      options: [
        { value: '1', label: 'Умеренный' },
        { value: '1.3', label: 'Жаркий/влажный' },
        { value: '1.2', label: 'Холодный' }
      ],
      defaultValue: '1'
    }
  ],
  outputs: [
    { name: 'baseWater', label: 'Базовая норма', type: 'number', unit: 'мл' },
    { name: 'adjustedWater', label: 'С учётом активности', type: 'number', unit: 'мл' },
    { name: 'glasses', label: 'Стаканов (250 мл)', type: 'number', unit: 'шт' },
    { name: 'reminder', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const activity = Number(inputs.activity);
    const climate = Number(inputs.climate);
    
    if (!weight) return [{ value: '—', label: 'Результат' }];
    
    // Базовая формула: 30-35 мл на кг веса
    const baseWater = weight * 35;
    const adjustedWater = Math.round(baseWater * activity * climate);
    const glasses = Math.ceil(adjustedWater / 250);
    
    return [
      { value: baseWater.toString(), label: 'Базовая норма', unit: 'мл' },
      { value: adjustedWater.toString(), label: 'С учётом активности', unit: 'мл' },
      { value: glasses.toString(), label: 'Стаканов (250 мл)', unit: 'шт' },
      { value: `Пейте равномерно в течение дня`, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Введите вес и уровень активности.',
    about: 'Взрослому человеку нужно около 30-35 мл воды на каждый кг веса.',
    usage: 'Контроль гидратации, профилактика обезвоживания.',
    formula: 'Норма = Вес × 35 мл × Активность × Климат',
    faq: [
      {
        question: 'Входит ли чай и кофе?',
        answer: 'Частично. Кофе и чай имеют мочегонный эффект. Лучше пить чистую воду.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор пульсовых зон
export const heartRateZonesCalculator: Calculator = {
  id: 'heart-rate-zones',
  slug: 'pulsovye-zony',
  title: 'Калькулятор пульсовых зон',
  description: 'Расчёт пульсовых зон для тренировок по возрасту и пульсу',
  category: 'zdorove-i-krasota',
  subcategory: 'sport-i-aktivnost',
  type: 'formula',
  inputs: [
    {
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 10,
      max: 100
    },
    {
      name: 'restingHR',
      label: 'Пульс в покое (уд/мин)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 30,
      max: 120
    }
  ],
  outputs: [
    { name: 'maxHR', label: 'Максимальный пульс', type: 'number', unit: 'уд/мин' },
    { name: 'zone1', label: 'Зона восстановления (50-60%)', type: 'text' },
    { name: 'zone2', label: 'Зона жиросжигания (60-70%)', type: 'text' },
    { name: 'zone3', label: 'Аэробная зона (70-80%)', type: 'text' },
    { name: 'zone4', label: 'Анаэробная зона (80-90%)', type: 'text' }
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age);
    const restingHR = Number(inputs.restingHR);
    
    if (!age) return [{ value: '—', label: 'Результат' }];
    
    // Формула Tanaka: 208 − 0.7 × возраст
    const maxHR = Math.round(208 - 0.7 * age);
    const reserve = maxHR - restingHR;
    
    const calculateZone = (min: number, max: number) => {
      const minHR = Math.round(restingHR + reserve * min);
      const maxHR = Math.round(restingHR + reserve * max);
      return `${minHR} — ${maxHR}`;
    };
    
    return [
      { value: maxHR.toString(), label: 'Максимальный пульс', unit: 'уд/мин' },
      { value: calculateZone(0.5, 0.6), label: 'Зона восстановления (50-60%)' },
      { value: calculateZone(0.6, 0.7), label: 'Зона жиросжигания (60-70%)' },
      { value: calculateZone(0.7, 0.8), label: 'Аэробная зона (70-80%)' },
      { value: calculateZone(0.8, 0.9), label: 'Анаэробная зона (80-90%)' }
    ];
  },
  content: {
    howTo: 'Введите возраст и утренний пульс в покое (измерьте до подъёма с кровати).',
    about: 'Пульсовые зоны помогают тренироваться эффективно и безопасно.',
    usage: 'Планирование кардиотренировок, бег, велосипед, плавание.',
    formula: 'Макс. пульс = 208 − 0.7 × возраст\nЗоны рассчитываются от резерва (HRR)',
    faq: [
      {
        question: 'Как измерить пульс в покое?',
        answer: 'Утром до подъёма. Положите два пальца на запястье, считайте удары за 30 секунд × 2.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор алкоголя (промилле)
export const alcoholCalculator: Calculator = {
  id: 'alcohol',
  slug: 'promille-alkogolya',
  title: 'Калькулятор промилле алкоголя',
  description: 'Расчёт концентрации алкоголя в крови и времени выведения',
  category: 'zdorove-i-krasota',
  subcategory: 'zdorove-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' }
      ],
      defaultValue: 'male'
    },
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 30,
      max: 200
    },
    {
      name: 'drinkType',
      label: 'Напиток',
      type: 'select',
      options: [
        { value: 'beer', label: 'Пиво 5%' },
        { value: 'wine', label: 'Вино 12%' },
        { value: 'vodka', label: 'Водка 40%' },
        { value: 'whiskey', label: 'Виски 40%' }
      ],
      defaultValue: 'beer'
    },
    {
      name: 'amount',
      label: 'Количество (мл)',
      type: 'number',
      placeholder: '500',
      defaultValue: 500,
      min: 0
    },
    {
      name: 'time',
      label: 'Время с момента употребления (часов)',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    }
  ],
  outputs: [
    { name: 'promille', label: 'Промилле в крови', type: 'number', unit: '‰' },
    { name: 'timeToSober', label: 'Время до полного выведения', type: 'text' },
    { name: 'canDrive', label: 'Можно ли садиться за руль', type: 'text' }
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender);
    const weight = Number(inputs.weight);
    const drinkType = String(inputs.drinkType);
    const amount = Number(inputs.amount);
    const time = Number(inputs.time);
    
    if (!weight || !amount) return [{ value: '—', label: 'Результат' }];
    
    // Содержание алкоголя (%)
    const alcoholContent: Record<string, number> = {
      'beer': 0.05,
      'wine': 0.12,
      'vodka': 0.40,
      'whiskey': 0.40
    };
    
    // Коэффициент распределения (Видмарк)
    const r = gender === 'male' ? 0.68 : 0.55;
    
    // Чистый алкоголь (г)
    const alcoholGrams = amount * alcoholContent[drinkType] * 0.79;
    
    // Концентрация (промилле)
    const promille = (alcoholGrams / (weight * r)) - (time * 0.15); // 0.15 ‰/час - скорость выведения
    const actualPromille = Math.max(0, promille);
    
    // Время до трезвости
    const timeToSober = Math.ceil(actualPromille / 0.15);
    
    // Можно ли за руль (0.16 ‰ - допустимая норма в России для водителей)
    const canDrive = actualPromille < 0.16 ? '✓ Можно садиться за руль' : '✗ Нельзя садиться за руль';
    
    return [
      { value: actualPromille.toFixed(2), label: 'Промилле в крови', unit: '‰' },
      { value: timeToSober > 0 ? `~${timeToSober} часов` : 'Уже трезвый', label: 'Время до полного выведения' },
      { value: canDrive, label: 'Можно ли садиться за руль' }
    ];
  },
  content: {
    howTo: 'Введите пол, вес, тип напитка, количество и время с момента употребления.',
    about: 'Расчёт приблизительный. Зависит от многих факторов: метаболизм, еда, сон, состояние печени.',
    usage: 'Оценка степени опьянения, принятие решения о вождении.',
    formula: 'Видмарк: C = A/(W×r) − β×t\nβ ≈ 0.15‰/час для мужчин',
    faq: [
      {
        question: 'Как быстро выводится алкоголь?',
        answer: 'В среднем 0.1-0.15‰ в час. Пиво 0.5л выводится ~3-4 часа, водка 100г ~8-10 часов.'
      },
      {
        question: 'Можно ли ускорить выведение?',
        answer: 'Нет. Контрастный душ, кофе, физические упражнения не ускоряют метаболизм алкоголя.'
      }
    ],
    sources: [
      { title: 'Алкоголь в крови — Википедия', url: 'https://ru.wikipedia.org/wiki/Алкоголь' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор возраста собаки
export const dogAgeCalculator: Calculator = {
  id: 'dog-age',
  slug: 'vozrast-sobaki',
  title: 'Калькулятор возраста собаки',
  description: 'Перевод возраста собаки в человеческие годы',
  category: 'povsednevnoe',
  subcategory: 'pitomcy',
  type: 'formula',
  inputs: [
    {
      name: 'dogAge',
      label: 'Возраст собаки (лет)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0,
      max: 30
    },
    {
      name: 'dogSize',
      label: 'Размер собаки',
      type: 'select',
      options: [
        { value: 'small', label: 'Мелкая (до 10 кг)' },
        { value: 'medium', label: 'Средняя (10-25 кг)' },
        { value: 'large', label: 'Крупная (25-45 кг)' },
        { value: 'giant', label: 'Огромная (45+ кг)' }
      ],
      defaultValue: 'medium'
    }
  ],
  outputs: [
    { name: 'humanAge', label: 'Человеческие годы', type: 'number', unit: 'лет' },
    { name: 'lifeStage', label: 'Этап жизни', type: 'text' }
  ],
  calculate: (inputs) => {
    const dogAge = Number(inputs.dogAge);
    const dogSize = String(inputs.dogSize);
    
    if (!dogAge) return [{ value: '—', label: 'Результат' }];
    
    // Новая формула: нелинейная
    let humanAge = 0;
    if (dogAge <= 1) {
      humanAge = dogAge * 15;
    } else if (dogAge <= 2) {
      humanAge = 15 + (dogAge - 1) * 9;
    } else {
      // Коэффициенты по размеру
      const multipliers: Record<string, number> = {
        'small': 4,
        'medium': 5,
        'large': 6,
        'giant': 7
      };
      humanAge = 24 + (dogAge - 2) * multipliers[dogSize];
    }
    
    // Этап жизни
    let lifeStage = '';
    if (dogAge < 1) lifeStage = 'Щенок';
    else if (dogAge < 3) lifeStage = 'Молодая собака';
    else if (dogAge < 7) lifeStage = 'Взрослая собака';
    else if (dogAge < 10) lifeStage = 'Зрелая собака';
    else lifeStage = 'Пожилая собака';
    
    return [
      { value: Math.round(humanAge).toString(), label: 'Человеческие годы', unit: 'лет' },
      { value: lifeStage, label: 'Этап жизни' }
    ];
  },
  content: {
    howTo: 'Введите возраст собаки и её размер.',
    about: 'Старый метод (×7) неточный. Новая формула учитывает нелинейное старение и размер породы.',
    usage: 'Понимание физиологического возраста питомца, планирование ухода.',
    formula: 'Первый год = 15 лет, второй = +9, далее 4-7 лет/год в зависимости от размера',
    faq: [],
    sources: [
      { title: 'Возраст собаки — Википедия', url: 'https://ru.wikipedia.org/wiki/Собака' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const healthExtendedCalculators = [
  dueDateCalculator,
  ovulationCalculator,
  idealWeightCalculator,
  bodyFatCalculator,
  waterIntakeCalculator,
  heartRateZonesCalculator,
  alcoholCalculator,
  dogAgeCalculator
];
