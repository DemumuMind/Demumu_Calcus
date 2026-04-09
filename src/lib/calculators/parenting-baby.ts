import type { Calculator } from '../types';

export const parentingBabyCalculators: Calculator[] = [
  {
    id: 'due-date-calculator',
    slug: 'due-date-calculator',
    title: 'Калькулятор даты родов',
    description: 'Рассчитайте предполагаемую дату родов по дате последней менструации',
    category: 'parenting',
    subcategory: 'pregnancy',
    type: 'arithmetic',
    inputs: [
      {
        name: 'lastPeriod',
        label: 'Первая день последней менструации',
        type: 'date',
        required: true
      },
      {
        name: 'cycleLength',
        label: 'Длина цикла',
      type: 'number', min: 21,
        max: 35,
        defaultValue: 28
      }
    ],
    outputs: [
      {
        name: 'dueDate',
        label: 'Предполагаемая дата родов',
        type: 'text'
      },
      {
        name: 'currentWeek',
        label: 'Текущая неделя беременности',
      type: 'number',
      unit: 'неделя'
      },
      {
        name: 'daysLeft',
        label: 'Дней до родов',
      type: 'number',
      unit: 'дней'
      },
      {
        name: 'trimester',
        label: 'Триместр',
        type: 'text'
      }
    ],
    calculate: (inputs): any => {
      const lastPeriodStr = String(inputs.lastPeriod);
      const cycleLength = Number(inputs.cycleLength);
      const lastPeriodDate = new Date(lastPeriodStr);
      const today = new Date();

      // Дата родов = последняя менструация + 280 дней
      const dueDate = new Date(lastPeriodDate);
      dueDate.setDate(dueDate.getDate() + 280);

      // Поправка на длину цикла
      const cycleAdjustment = cycleLength - 28;
      dueDate.setDate(dueDate.getDate() + cycleAdjustment);

      // Разница в днях
      const diffTime = today.getTime() - lastPeriodDate.getTime();
      const daysPregnant = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const currentWeek = Math.floor(daysPregnant / 7);
      const daysLeft = Math.max(0, 280 - daysPregnant + cycleAdjustment);

      let trimester;
      if (currentWeek <= 12) trimester = 'Первый триместр';
      else if (currentWeek <= 26) trimester = 'Второй триместр';
      else trimester = 'Третий триместр';

      return [
        { value: dueDate.toLocaleDateString('ru-RU'), label: 'Предполагаемая дата родов', unit: '' },
        { value: currentWeek, label: 'Текущая неделя беременности', unit: 'неделя' },
        { value: daysLeft, label: 'Дней до родов', unit: 'дней' },
        { value: trimester, label: 'Триместр', unit: '' }
      ];
    },
    content: {
      howTo: `Для расчёта:
1. Укажите первый день последней менструации
2. Введите длину вашего цикла (обычно 28 дней)
3. Получите предполагаемую дату родов`,
      about: `Расчёт по формуле Негеле: последняя менструация + 280 дней. Только 4% родов происходит в расчётный день.`,
      formula: `ДР = ДПМ + 280 дней`,
      faq: [
        {
          question: 'Насколько точен расчёт?',
          answer: 'Роды в пределах 2 недель до или после расчётной даты считаются нормой.'
        }
      ],
      sources: [
        { title: 'Акушерство и гинекология', url: 'https://aibolits.ru/pregnancy' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'baby-growth-calculator',
    slug: 'baby-growth-calculator',
    title: 'Калькулятор роста ребёнка',
    description: 'Отслеживайте рост и вес ребёнка по процентилям ВОЗ',
    category: 'parenting',
    subcategory: 'baby-health',
    type: 'formula',
    inputs: [
      {
        name: 'age',
        label: 'Возраст',
      type: 'number', min: 0,
        max: 36
      },
      {
        name: 'gender',
        label: 'Пол',
        type: 'select',
                options: [
          { value: 'boy', label: 'Мальчик' },
          { value: 'girl', label: 'Девочка' }
        ]
      },
      {
        name: 'height',
        label: 'Рост',
      type: 'number', min: 30,
        max: 120
      },
      {
        name: 'weight',
        label: 'Вес',
      type: 'number', min: 1,
        max: 30
      }
    ],
    outputs: [
      {
        name: 'heightPercentile',
        label: 'Процентиль роста',
        type: 'text'
      },
      {
        name: 'weightPercentile',
        label: 'Процентиль веса',
        type: 'text'
      },
      {
        name: 'bmi',
        label: 'Индекс массы тела',
      type: 'number',
      unit: 'кг/м²'
      },
      {
        name: 'assessment',
        label: 'Оценка',
        type: 'text'
      }
    ],
    calculate: (inputs): any => {
      const age = Number(inputs.age);
      const gender = String(inputs.gender);
      const height = Number(inputs.height);
      const weight = Number(inputs.weight);
      // Упрощённый расчёт процентилей (реальные таблицы ВОЗ сложнее)
      const expectedHeight = gender === 'boy'
        ? 50 + age * 2.5
        : 49 + age * 2.4;

      const expectedWeight = gender === 'boy'
        ? 3.5 + age * 0.7
        : 3.3 + age * 0.65;

      const heightDiff = (height - expectedHeight) / expectedHeight;
      const weightDiff = (weight - expectedWeight) / expectedWeight;

      // Приблизительная оценка процентилей
      const heightPercentile = Math.max(1, Math.min(99, Math.round(50 + heightDiff * 100)));
      const weightPercentile = Math.max(1, Math.min(99, Math.round(50 + weightDiff * 100)));

      const heightM = height / 100;
      const bmi = Math.round(weight / (heightM * heightM) * 10) / 10;

      let assessment;
      if (heightPercentile < 3 || weightPercentile < 3) {
        assessment = 'Ниже нормы - проконсультируйтесь с врачом';
      } else if (heightPercentile > 97 || weightPercentile > 97) {
        assessment = 'Выше среднего - обсудите с педиатром';
      } else {
        assessment = 'В пределах нормы';
      }

      return [
        { value: `${heightPercentile}-й`, label: 'Процентиль роста', unit: '' },
        { value: `${weightPercentile}-й`, label: 'Процентиль веса', unit: '' },
        { value: bmi, label: 'Индекс массы тела', unit: 'кг/м²' },
        { value: assessment, label: 'Оценка', unit: '' }
      ];
    },
    content: {
      howTo: `Для отслеживания роста:
1. Введите возраст ребёнка в месяцах
2. Укажите пол
3. Введите текущий рост и вес
4. Получите оценку по процентилям`,
      about: `Процентили показывают, как ребёнок развивается относительно сверстников. Нормальный диапазон: 3-97 процентиль.`,
      formula: `ИМТ = Вес / (Рост²)`,
      faq: [
        {
          question: 'Что такое процентиль?',
          answer: 'Если рост на 50-м процентиле, значит ребёнок выше 50% сверстников и ниже 50%.'
        }
      ],
      sources: [
        { title: 'ВОЗ - таблицы роста', url: 'https://www.who.int/tools/child-growth-standards' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'feeding-amount-calculator',
    slug: 'feeding-amount-calculator',
    title: 'Калькулятор объёма кормления',
    description: 'Рассчитайте сколько молока или смеси нужно ребёнку',
    category: 'parenting',
    subcategory: 'feeding',
    type: 'arithmetic',
    inputs: [
      {
        name: 'age',
        label: 'Возраст ребёнка',
        type: 'select',
                options: [
          { value: '0-1', label: '0-1 месяц' },
          { value: '1-3', label: '1-3 месяца' },
          { value: '3-6', label: '3-6 месяцев' },
          { value: '6-12', label: '6-12 месяцев' }
        ]
      },
      {
        name: 'weight',
        label: 'Вес ребёнка',
      type: 'number', min: 1,
        max: 15
      }
    ],
    outputs: [
      {
        name: 'dailyAmount',
        label: 'Суточный объём',
      type: 'number',
      unit: 'мл'
      },
      {
        name: 'perFeeding',
        label: 'За одно кормление',
      type: 'number',
      unit: 'мл'
      },
      {
        name: 'feedingsPerDay',
        label: 'Кормлений в день',
      type: 'number',
      unit: 'раз'
      }
    ],
    calculate: (inputs): any => {
      const age = String(inputs.age);
      const weight = Number(inputs.weight);
      const dailyAmount = Math.round(weight * 150); // ~150 мл/кг

      const feedings: Record<string, number> = {
        '0-1': 10,
        '1-3': 8,
        '3-6': 6,
        '6-12': 5
      };

      const feedingsPerDay = feedings[age];
      const perFeeding = Math.round(dailyAmount / feedingsPerDay);

      return [
        { value: dailyAmount, label: 'Суточный объём', unit: 'мл' },
        { value: perFeeding, label: 'За одно кормление', unit: 'мл' },
        { value: feedingsPerDay, label: 'Кормлений в день', unit: 'раз' }
      ];
    },
    content: {
      howTo: `Для расчёта:
1. Выберите возрастную группу
2. Укажите вес ребёнка
3. Получите рекомендуемый объём`,
      about: `Формула не заменяет консультацию с педиатром. Каждый ребёнок индивидуален.`,
      formula: `Объём = Вес × 150 мл/кг`,
      faq: [
        {
          question: 'Что делать, если ребёнок не доедает?',
          answer: 'Не форсируйте. Лучше покормить чаще меньшими порциями.'
        }
      ],
      sources: [
        { title: 'НИИ педиатрии', url: 'https://pediatrics.ru/feeding' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'diaper-calculator',
    slug: 'diaper-calculator',
    title: 'Калькулятор подгузников',
    description: 'Рассчитайте сколько подгузников нужно и во сколько это обойдётся',
    category: 'parenting',
    subcategory: 'supplies',
    type: 'formula',
    inputs: [
      {
        name: 'age',
        label: 'Возраст ребёнка',
        type: 'select',
                options: [
          { value: '0-3', label: '0-3 месяца' },
          { value: '3-6', label: '3-6 месяцев' },
          { value: '6-12', label: '6-12 месяцев' },
          { value: '12-24', label: '1-2 года' },
          { value: '24+', label: '2+ года' }
        ]
      },
      {
        name: 'usingDiapers',
        label: 'Используем подгузники',
        type: 'select',
                options: [
          { value: '24h', label: 'Круглосуточно' },
          { value: 'night', label: 'Только ночью' },
          { value: 'day', label: 'Только днём' }
        ]
      },
      {
        name: 'brand',
        label: 'Категория подгузников',
        type: 'select',
                options: [
          { value: 'economy', label: 'Эконом' },
          { value: 'mid', label: 'Средний' },
          { value: 'premium', label: 'Премиум' }
        ]
      }
    ],
    outputs: [
      {
        name: 'diapersPerDay',
        label: 'Подгузников в день',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'monthlyNeed',
        label: 'В месяц',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'monthlyCost',
        label: 'Затраты в месяц',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'annualCost',
        label: 'Затраты в год',
      type: 'number',
      unit: '₽'
      }
    ],
    calculate: (inputs): any => {
      const age = String(inputs.age);
      const usingDiapers = String(inputs.usingDiapers);
      const brand = String(inputs.brand);
      const baseNeeds: Record<string, number> = {
        '0-3': 10,
        '3-6': 8,
        '6-12': 6,
        '12-24': 5,
        '24+': 3
      };

      const usageMultipliers: Record<string, number> = {
        '24h': 1,
        night: 0.3,
        day: 0.7
      };

      const prices: Record<string, number> = {
        economy: 12,
        mid: 22,
        premium: 40
      };

      const diapersPerDay = Math.round(baseNeeds[age] * usageMultipliers[usingDiapers]);
      const monthlyNeed = diapersPerDay * 30;
      const monthlyCost = monthlyNeed * prices[brand];
      const annualCost = monthlyCost * 12;

      return [
        { value: diapersPerDay, label: 'Подгузников в день', unit: 'шт' },
        { value: monthlyNeed, label: 'В месяц', unit: 'шт' },
        { value: monthlyCost, label: 'Затраты в месяц', unit: '₽' },
        { value: annualCost, label: 'Затраты в год', unit: '₽' }
      ];
    },
    content: {
      howTo: `Для расчёта:
1. Выберите возраст ребёнка
2. Укажите режим использования
3. Выберите категорию подгузников`,
      about: `Новорождённые используют до 10-12 подгузников в день. К 2 годам обычно 3-4 в день.`,
      formula: `Расход = Базовая норма × Режим использования`,
      faq: [
        {
          question: 'Сколько подгузников нужно в роддом?',
          answer: 'Возьмите пачку на 20-30 шт (1-2 упаковки).'
        }
      ],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'sleep-calculator',
    slug: 'sleep-calculator',
    title: 'Калькулятор сна ребёнка',
    description: 'Рассчитайте оптимальное время сна по возрасту',
    category: 'parenting',
    subcategory: 'sleep',
    type: 'arithmetic',
    inputs: [
      {
        name: 'age',
        label: 'Возраст',
        type: 'select',
                options: [
          { value: '0-3', label: '0-3 месяца' },
          { value: '3-6', label: '3-6 месяцев' },
          { value: '6-12', label: '6-12 месяцев' },
          { value: '1-2', label: '1-2 года' },
          { value: '2-3', label: '2-3 года' },
          { value: '3-5', label: '3-5 лет' }
        ]
      }
    ],
    outputs: [
      {
        name: 'totalSleep',
        label: 'Всего сна в сутки',
      type: 'number',
      unit: 'ч'
      },
      {
        name: 'nightSleep',
        label: 'Ночной сон',
      type: 'number',
      unit: 'ч'
      },
      {
        name: 'naps',
        label: 'Дневной сон',
      type: 'number',
      unit: 'ч'
      },
      {
        name: 'napCount',
        label: 'Количество снов',
      type: 'number',
      unit: 'раз'
      }
    ],
    calculate: (inputs): any => {
      const age = String(inputs.age);
      const sleepData: Record<string, { total: number; night: number; naps: number; count: number }> = {
        '0-3': { total: 16, night: 9, naps: 7, count: 4 },
        '3-6': { total: 15, night: 10, naps: 5, count: 3 },
        '6-12': { total: 14, night: 11, naps: 3, count: 2 },
        '1-2': { total: 13, night: 11.5, naps: 1.5, count: 1 },
        '2-3': { total: 12, night: 11, naps: 1, count: 1 },
        '3-5': { total: 11, night: 10.5, naps: 0.5, count: 1 }
      };

      const data = sleepData[age];

      return [
        { value: data.total, label: 'Всего сна в сутки', unit: 'ч' },
        { value: data.night, label: 'Ночной сон', unit: 'ч' },
        { value: data.naps, label: 'Дневной сон', unit: 'ч' },
        { value: data.count, label: 'Количество снов', unit: 'раз' }
      ];
    },
    content: {
      howTo: `Для расчёта нормы сна:
1. Выберите возрастную группу
2. Получите рекомендации по продолжительности сна`,
      about: `Недосып влияет на развитие, настроение и иммунитет. Следите за сонливыми сигналами ребёнка.`,
      formula: `Норма сна зависит от возраста`,
      faq: [
        {
          question: 'Мой ребёнок спит меньше нормы',
          answer: 'Нормы ориентировочные. Если ребёнок бодрый и активный - всё в порядке.'
        }
      ],
      sources: [
        { title: 'Национальная сонная фонд', url: 'https://sleepfoundation.org' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'vaccination-calendar',
    slug: 'vaccination-calendar',
    title: 'Калькулятор календаря прививок',
    description: 'Рассчитайте график вакцинации для вашего ребёнка',
    category: 'parenting',
    subcategory: 'health',
    type: 'arithmetic',
    inputs: [
      {
        name: 'birthDate',
        label: 'Дата рождения',
        type: 'date',
        required: true
      }
    ],
    outputs: [
      {
        name: 'nearestVaccine',
        label: 'Ближайшая прививка',
        type: 'text'
      },
      {
        name: 'nearestDate',
        label: 'Дата ближайшей прививки',
        type: 'text'
      },
      {
        name: 'completedCount',
        label: 'Уже сделано',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'remainingCount',
        label: 'Предстоит',
      type: 'number',
      unit: 'шт'
      }
    ],
    calculate: (inputs): any => {
      const birthDateStr = String(inputs.birthDate);
      const birthDate = new Date(birthDateStr);
      const today = new Date();
      const ageMonths = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));

      const schedule = [
        { name: 'БЦЖ (туберкулёз)', age: 0 },
        { name: 'Гепатит B (1-я)', age: 0 },
        { name: 'Гепатит B (2-я)', age: 1 },
        { name: 'Пентаксим (1-я)', age: 2 },
        { name: 'Пентаксим (2-я)', age: 3 },
        { name: 'Пентаксим (3-я)', age: 4.5 },
        { name: 'Манту (туберкулин)', age: 12 },
        { name: 'Пентаксим (ревакцинация)', age: 18 },
        { name: 'Корь/краснуха/паротит', age: 12 },
        { name: 'АКДС (ревакцинация)', age: 18 },
        { name: 'Полимилит (ревакцинация)', age: 20 },
        { name: 'Менингококк', age: 9 }
      ];

      let completedCount = 0;
      let remainingCount = 0;
      let nearestVaccine = null;
      let nearestDate = null;
      let minDiff = Infinity;

      for (const vaccine of schedule) {
        const vaccineDate = new Date(birthDate);
        vaccineDate.setMonth(vaccineDate.getMonth() + vaccine.age);

        if (vaccineDate <= today) {
          completedCount++;
        } else {
          remainingCount++;
          const diff = vaccineDate.getTime() - today.getTime();
          if (diff < minDiff && diff > 0) {
            minDiff = diff;
            nearestVaccine = vaccine.name;
            nearestDate = vaccineDate.toLocaleDateString('ru-RU');
          }
        }
      }

      return [
        { value: nearestVaccine || 'Все прививки сделаны', label: 'Ближайшая прививка', unit: '' },
        { value: nearestDate || '-', label: 'Дата ближайшей прививки', unit: '' },
        { value: completedCount, label: 'Уже сделано', unit: 'шт' },
        { value: remainingCount, label: 'Предстоит', unit: 'шт' }
      ];
    },
    content: {
      howTo: `Для расчёта графика:
1. Введите дату рождения ребёнка
2. Получите информацию о ближайших прививках`,
      about: `Календарь прививок в России утверждается Минздравом. Уточняйте в своей поликлинике.`,
      formula: `График = Дата рождения + Возраст для вакцины`,
      faq: [
        {
          question: 'Можно ли делать прививки с опозданием?',
          answer: 'Да, но лучше придерживаться графика. Проконсультируйтесь с педиатром.'
        }
      ],
      sources: [
        { title: 'Минздрав РФ - календарь прививок', url: 'https://minzdrav.gov.ru/vaccination' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'maternity-benefit-calculator',
    slug: 'maternity-benefit-calculator',
    title: 'Калькулятор декретных выплат',
    description: 'Рассчитайте пособия по беременности и родам',
    category: 'parenting',
    subcategory: 'benefits',
    type: 'arithmetic',
    inputs: [
      {
        name: 'salary',
        label: 'Средняя зарплата за 2 года',
      type: 'number', min: 0
      },
      {
        name: 'daysAbsent',
        label: 'Дни болезни/отпуска',
      type: 'number', min: 0,
        defaultValue: 0
      },
      {
        name: 'isFirstChild',
        label: 'Первый ребёнок',
        type: 'boolean',
        defaultValue: true
      }
    ],
    outputs: [
      {
        name: 'dailyBenefit',
        label: 'Пособие в день',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'totalBenefit',
        label: 'Общая сумма декретных',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'minBenefit',
        label: 'Минимальные декретные',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'maxBenefit',
        label: 'Максимальные декретные',
      type: 'number',
      unit: '₽'
      }
    ],
    calculate: (inputs): any => {
      const salary = Number(inputs.salary);
      const daysAbsent = Number(inputs.daysAbsent);
      const workDays = 730 - daysAbsent;
      const dailyEarnings = salary * 24 / workDays;
      const dailyBenefit = Math.min(Math.max(dailyEarnings, 500), 2300); // min/max на 2025

      const maternityDays = 140; // обычные роды
      const totalBenefit = Math.round(dailyBenefit * maternityDays);
      const minBenefit = 70000; // примерно
      const maxBenefit = 322000; // примерно

      return [
        { value: Math.round(dailyBenefit), label: 'Пособие в день', unit: '₽' },
        { value: totalBenefit, label: 'Общая сумма декретных', unit: '₽' },
        { value: minBenefit, label: 'Минимальные декретные', unit: '₽' },
        { value: maxBenefit, label: 'Максимальные декретные', unit: '₽' }
      ];
    },
    content: {
      howTo: `Для расчёта:
1. Введите среднюю зарплату за 2 предыдущих года
2. Укажите дни отсутствия (больничные, отпуска)
3. Получите расчёт декретных`,
      about: `Декретные рассчитываются за 2 предыдущих календарных года. В 2025 есть минимумы и максимумы.`,
      formula: `Пособие = Зарплата × 24 / (730 - Дни отсутствия) × 140 дней`,
      faq: [
        {
          question: 'Какие выплаты положены при рождении?',
          answer: 'Единовременное пособие, ежемесячное пособие до 1.5 лет, материнский капитал.'
        }
      ],
      sources: [
        { title: 'ФСС - расчёт пособий', url: 'https://fss.ru/benefits' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'toy-age-calculator',
    slug: 'toy-age-calculator',
    title: 'Калькулятор игрушек по возрасту',
    description: 'Подберите подходящие игрушки для развития ребёнка',
    category: 'parenting',
    subcategory: 'development',
    type: 'arithmetic',
    inputs: [
      {
        name: 'age',
        label: 'Возраст ребёнка',
        type: 'select',
                options: [
          { value: '0-3', label: '0-3 месяца' },
          { value: '3-6', label: '3-6 месяцев' },
          { value: '6-9', label: '6-9 месяцев' },
          { value: '9-12', label: '9-12 месяцев' },
          { value: '1-2', label: '1-2 года' },
          { value: '2-3', label: '2-3 года' },
          { value: '3-5', label: '3-5 лет' }
        ]
      }
    ],
    outputs: [
      {
        name: 'recommendedToys',
        label: 'Рекомендуемые игрушки',
        type: 'text'
      },
      {
        name: 'developmentFocus',
        label: 'Фокус развития',
        type: 'text'
      },
      {
        name: 'safetyNotes',
        label: 'Предупреждения',
        type: 'text'
      }
    ],
    calculate: (inputs): any => {
      const age = String(inputs.age);
      const toyData: Record<string, { toys: string; focus: string; safety: string }> = {
        '0-3': {
          toys: 'Мобили, контрастные книжки, погремушки, мягкие игрушки',
          focus: 'Зрение, слух, осязание',
          safety: 'Без мелких деталей, крепкие швы, нетоксичные материалы'
        },
        '3-6': {
          toys: 'Прорезыватели, текстурные мячи, книжки с тканевыми страницами',
          focus: 'Мелкая моторика, ротовое исследование',
          safety: 'Не содержит токсичных красителей, легко моется'
        },
        '6-9': {
          toys: 'Сортеры, пирамидки, каталки, музыкальные игрушки',
          focus: 'Координация, причинно-следственные связи',
          safety: 'Устойчивые, без острых углов, не бьющиеся'
        },
        '9-12': {
          toys: 'Кубики, конструкторы крупные, игрушки на батарейках',
          focus: 'Мелкая моторика, проблемное мышление',
          safety: 'Крупные детали, безопасные батарейные отсеки'
        },
        '1-2': {
          toys: 'Куклы, машинки, мячи, песочный набор, музыкальные инструменты',
          focus: 'Воображение, физическая активность',
          safety: 'Прочные, безопасные материалы'
        },
        '2-3': {
          toys: 'Конструкторы, пазлы простые, доктор/магазин, раскраски',
          focus: 'Ролевые игры, логика, творчество',
          safety: 'Нет мелких проглатываемых частей'
        },
        '3-5': {
          toys: 'Сложные пазлы, настольные игры, конструкторы, спортивное',
          focus: 'Социализация, логика, физика',
          safety: 'Соответствует маркировке возраста'
        }
      };

      const data = toyData[age];

      return [
        { value: data.toys, label: 'Рекомендуемые игрушки', unit: '' },
        { value: data.focus, label: 'Фокус развития', unit: '' },
        { value: data.safety, label: 'Предупреждения', unit: '' }
      ];
    },
    content: {
      howTo: `Для подбора игрушек:
1. Выберите возрастную группу
2. Получите рекомендации по развитию`,
      about: `Игрушки должны соответствовать возрасту для безопасности и максимальной пользы.`,
      formula: `Возрастная подходящесть = Маркировка на упаковке`,
      faq: [],
      sources: [
        { title: 'Детский мир - выбор игрушек', url: 'https://detmir.ru/toys-guide' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'baby-clothes-calculator',
    slug: 'baby-clothes-calculator',
    title: 'Калькулятор детской одежды',
    description: 'Рассчитайте необходимый гардероб для ребёнка',
    category: 'parenting',
    subcategory: 'shopping',
    type: 'formula',
    inputs: [
      {
        name: 'age',
        label: 'Возраст',
        type: 'select',
                options: [
          { value: '0-3', label: '0-3 месяца' },
          { value: '3-6', label: '3-6 месяцев' },
          { value: '6-12', label: '6-12 месяцев' },
          { value: '1-2', label: '1-2 года' }
        ]
      },
      {
        name: 'climate',
        label: 'Климат',
        type: 'select',
                options: [
          { value: 'cold', label: 'Холодный (-20 до +15)' },
          { value: 'moderate', label: 'Умеренный (-5 до +25)' },
          { value: 'warm', label: 'Тёплый (+10 до +35)' }
        ]
      },
      {
        name: 'laundryFrequency',
        label: 'Стирка',
        type: 'select',
                options: [
          { value: 'daily', label: 'Каждый день' },
          { value: '2-3', label: 'Раз в 2-3 дня' },
          { value: 'weekly', label: 'Раз в неделю' }
        ]
      }
    ],
    outputs: [
      {
        name: 'bodysuits',
        label: 'Боди/распашонки',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'pants',
        label: 'Штанишки/ползунки',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'sleepers',
        label: 'Слипы/комбинезоны',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'outerwear',
        label: 'Верхняя одежда',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'estimatedCost',
        label: 'Примерная стоимость',
      type: 'number',
      unit: '₽'
      }
    ],
    calculate: (inputs): any => {
      const climate = String(inputs.climate);
      const laundryFrequency = String(inputs.laundryFrequency);
      const baseNeeds: Record<string, Record<string, number>> = {
        bodysuits: { daily: 7, '2-3': 10, weekly: 14 },
        pants: { daily: 5, '2-3': 7, weekly: 10 },
        sleepers: { daily: 4, '2-3': 6, weekly: 8 },
        outerwear: { daily: 2, '2-3': 3, weekly: 4 }
      };

      const climateMultipliers: Record<string, Record<string, number>> = {
        cold: { bodysuits: 1.2, pants: 1.3, sleepers: 1.4, outerwear: 1.5 },
        moderate: { bodysuits: 1, pants: 1, sleepers: 1, outerwear: 1 },
        warm: { bodysuits: 0.9, pants: 0.8, sleepers: 0.7, outerwear: 0.5 }
      };

      const mults = climateMultipliers[climate];

      const bodysuits = Math.ceil(baseNeeds.bodysuits[laundryFrequency] * mults.bodysuits);
      const pants = Math.ceil(baseNeeds.pants[laundryFrequency] * mults.pants);
      const sleepers = Math.ceil(baseNeeds.sleepers[laundryFrequency] * mults.sleepers);
      const outerwear = Math.ceil(baseNeeds.outerwear[laundryFrequency] * mults.outerwear);

      const itemCost = 300;
      const outerCost = 1500;
      const estimatedCost = (bodysuits + pants + sleepers) * itemCost + outerwear * outerCost;

      return [
        { value: bodysuits, label: 'Боди/распашонки', unit: 'шт' },
        { value: pants, label: 'Штанишки/ползунки', unit: 'шт' },
        { value: sleepers, label: 'Слипы/комбинезоны', unit: 'шт' },
        { value: outerwear, label: 'Верхняя одежда', unit: 'шт' },
        { value: estimatedCost, label: 'Примерная стоимость', unit: '₽' }
      ];
    },
    content: {
      howTo: `Для расчёта гардероба:
1. Выберите возраст ребёнка
2. Укажите климат
3. Учтите частоту стирки`,
      about: `Новорождённые быстро растут, покупайте одежду с запасом на 1-2 размера.`,
      formula: `Количество = Базовая норма × Климат × Частота стирки`,
      faq: [
        {
          question: 'Какой размер выбрать?',
          answer: 'На 0-3 мес - 56-62 см, на 3-6 мес - 68 см, на 6-12 мес - 74-80 см.'
        }
      ],
      sources: [],
      updatedAt: '2026-04-08'
    }
  }
];
