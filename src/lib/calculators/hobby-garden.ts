import { Calculator } from '../types';

// Калькулятор семян для посадки
export const seedCalculator: Calculator = {
  id: 'seed-calculator',
  slug: 'raskhod-semyan',
  title: 'Калькулятор семян',
  description: 'Расчёт количества семян для посадки с учётом площади, густоты и всхожести',
  category: 'dlya-doma',
  subcategory: 'gardening',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь посадки (м²)',
      type: 'number',
      placeholder: '10',
      min: 0.1,
      defaultValue: 10
    },
    {
      name: 'spacing',
      label: 'Расстояние между растениями (см)',
      type: 'number',
      placeholder: '30',
      min: 1,
      defaultValue: 30
    },
    {
      name: 'germinationRate',
      label: 'Всхожесть семян (%)',
      type: 'number',
      placeholder: '80',
      min: 1,
      max: 100,
      defaultValue: 80
    },
    {
      name: 'plantType',
      label: 'Тип растения',
      type: 'select',
      options: [
        { value: 'tomato', label: 'Помидоры' },
        { value: 'cucumber', label: 'Огурцы' },
        { value: 'carrot', label: 'Морковь' },
        { value: 'beet', label: 'Свёкла' },
        { value: 'pepper', label: 'Перец' },
        { value: 'lettuce', label: 'Салат' }
      ],
      defaultValue: 'tomato'
    }
  ],
  outputs: [
    { name: 'plantsNeeded', label: 'Растений нужно', type: 'number', unit: 'шт' },
    { name: 'seedsNeeded', label: 'Семян с запасом', type: 'number', unit: 'шт' },
    { name: 'rows', label: 'Количество рядов', type: 'number', unit: 'шт' },
    { name: 'perRow', label: 'Растений в ряду', type: 'number', unit: 'шт' },
    { name: 'packets', label: 'Пакетиков семян', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const spacing = Number(inputs.spacing);
    const germinationRate = Number(inputs.germinationRate);
    
    if (!area || !spacing || !germinationRate) {
      return [
        { value: '—', label: 'Растений нужно', unit: 'шт' },
        { value: '—', label: 'Семян с запасом', unit: 'шт' },
        { value: '—', label: 'Количество рядов', unit: 'шт' },
        { value: '—', label: 'Растений в ряду', unit: 'шт' },
        { value: '—', label: 'Пакетиков семян', unit: 'шт' }
      ];
    }
    
    // Assume square area, calculate rows and plants per row
    const side = Math.sqrt(area);
    const spacingM = spacing / 100;
    
    const rows = Math.floor(side / spacingM);
    const perRow = Math.floor(side / spacingM);
    const plantsNeeded = rows * perRow;
    
    // Add 20% reserve and account for germination rate
    const reserve = 1.2;
    const seedsNeeded = Math.ceil((plantsNeeded * reserve) / (germinationRate / 100));
    
    // Assume standard packet has 30-50 seeds depending on type
    const seedsPerPacket = 40;
    const packets = Math.ceil(seedsNeeded / seedsPerPacket);
    
    return [
      { value: plantsNeeded, label: 'Растений нужно', unit: 'шт' },
      { value: seedsNeeded, label: 'Семян с запасом', unit: 'шт' },
      { value: rows, label: 'Количество рядов', unit: 'шт' },
      { value: perRow, label: 'Растений в ряду', unit: 'шт' },
      { value: packets, label: 'Пакетиков семян', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите площадь для посадки, расстояние между растениями, всхожесть семян и тип растения. Калькулятор рассчитает нужное количество семян.',
    about: 'Всхожесть семян — процент семян, которые прорастут. Обычно 70-90% для свежих семян. Запас 20% компенсирует неудачные всходы.',
    formula: 'Растений = Площадь / (Расстояние²)\nСемян = Растений × 1.2 / (Всхожесть / 100)',
    faq: [
      { question: 'Как долго хранятся семена?', answer: 'Томаты и огурцы — 5-8 лет. Морковь и лук — 1-2 года. Храните в сухом прохладном месте.' },
      { question: 'Зачем запас семян?', answer: 'Не все семена прорастают, некоторые растения могут погибнуть. Запас позволяет подсадить недостающие.' }
    ],
    sources: [
      { title: 'Gardening Know How - Seed Starting', url: 'https://www.gardeningknowhow.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор удобрений
export const fertilizerCalculator: Calculator = {
  id: 'fertilizer-calculator',
  slug: 'udobreniya-dlya-sada',
  title: 'Калькулятор удобрений',
  description: 'Расчёт количества удобрений для огорода с учётом площади и типа растений',
  category: 'dlya-doma',
  subcategory: 'gardening',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь (м²)',
      type: 'number',
      placeholder: '50',
      min: 1,
      defaultValue: 50
    },
    {
      name: 'fertilizerType',
      label: 'Тип удобрения',
      type: 'select',
      options: [
        { value: 'nitrogen', label: 'Азотное (куриный помёт)' },
        { value: 'phosphorus', label: 'Фосфорное (костная мука)' },
        { value: 'potassium', label: 'Калийное (зола)' },
        { value: 'complex', label: 'Комплексное (NPK)' },
        { value: 'organic', label: 'Органическое (перегной)' }
      ],
      defaultValue: 'complex'
    },
    {
      name: 'plantGroup',
      label: 'Группа растений',
      type: 'select',
      options: [
        { value: 'vegetables', label: 'Овощи' },
        { value: 'fruits', label: 'Плодовые' },
        { value: 'root', label: 'Корнеплоды' },
        { value: 'leafy', label: 'Листовые' },
        { value: 'flowers', label: 'Цветы' }
      ],
      defaultValue: 'vegetables'
    }
  ],
  outputs: [
    { name: 'fertilizerAmount', label: 'Удобрений нужно', type: 'number', unit: 'кг' },
    { name: 'perSquareMeter', label: 'На квадратный метр', type: 'number', unit: 'г/м²' },
    { name: 'application', label: 'Способ внесения', type: 'text' },
    { name: 'timing', label: 'Сроки внесения', type: 'text' },
    { name: 'warning', label: 'Предупреждение', type: 'text' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const fertilizerType = String(inputs.fertilizerType);
    const plantGroup = String(inputs.plantGroup);
    
    if (!area) {
      return [
        { value: '—', label: 'Удобрений нужно', unit: 'кг' },
        { value: '—', label: 'На квадратный метр', unit: 'г/м²' },
        { value: '—', label: 'Способ внесения' },
        { value: '—', label: 'Сроки внесения' },
        { value: '—', label: 'Предупреждение' }
      ];
    }
    
    // Rates in g/m²
    const rates: Record<string, Record<string, number>> = {
      'nitrogen': { 'vegetables': 20, 'fruits': 15, 'root': 15, 'leafy': 25, 'flowers': 20 },
      'phosphorus': { 'vegetables': 30, 'fruits': 40, 'root': 35, 'leafy': 20, 'flowers': 25 },
      'potassium': { 'vegetables': 20, 'fruits': 25, 'root': 20, 'leafy': 15, 'flowers': 20 },
      'complex': { 'vegetables': 50, 'fruits': 60, 'root': 55, 'leafy': 45, 'flowers': 50 },
      'organic': { 'vegetables': 3000, 'fruits': 4000, 'root': 3500, 'leafy': 2500, 'flowers': 2000 }
    };
    
    const rate = rates[fertilizerType][plantGroup];
    const totalGrams = area * rate;
    const totalKg = totalGrams / 1000;
    
    const methods: Record<string, string> = {
      'nitrogen': 'Внесение в рядки перед посадкой или подкормка в фазу роста',
      'phosphorus': 'Внесение в лунки при посадке для лучшего усвоения',
      'potassium': 'Внесение под перекопку осенью или весной',
      'complex': 'Внесение равномерно по площади перед перекопкой',
      'organic': 'Перекапывание в осеннюю перекопку или весной под посадку'
    };
    
    const timings: Record<string, string> = {
      'nitrogen': 'Весна, начало лета. Не вносите поздно — отрастёт ботва вместо плодов.',
      'phosphorus': 'При посадке. Действует медленно, вносить заранее.',
      'potassium': 'Осень или ранняя весна. Улучшает зимостойкость и урожай.',
      'complex': 'За 2 недели до посадки. Содержит все элементы.',
      'organic': 'Осень под перекопку или весной за 2 недели до посадки.'
    };
    
    const warnings: Record<string, string> = {
      'nitrogen': 'Осторожно! Избыток азота отравляет растения и накапливается в плодах как нитраты.',
      'phosphorus': 'Не переборщите — фосфор связывается с почвой и не вымывается.',
      'potassium': 'Зола щелочная, не подходит для кислых почв.',
      'complex': 'Соблюдайте нормы — избыток удобрений вредит.',
      'organic': 'Перегной должен быть хорошо перепревшим — свежий навоз жжёт корни!'
    };
    
    return [
      { value: Number(totalKg.toFixed(2)), label: 'Удобрений нужно', unit: 'кг' },
      { value: rate, label: 'На квадратный метр', unit: 'г/м²' },
      { value: methods[fertilizerType], label: 'Способ внесения' },
      { value: timings[fertilizerType], label: 'Сроки внесения' },
      { value: warnings[fertilizerType], label: 'Предупреждение' }
    ];
  },
  content: {
    howTo: 'Введите площадь огорода, тип удобрения и группу растений. Калькулятор рассчитает нужное количество и даст рекомендации.',
    about: 'Основные макроэлементы: Азот (N) — для роста листвы, Фосфор (P) — для корней и плодов, Калий (K) — для иммунитета и зрелости.',
    formula: 'Удобрения (кг) = Площадь (м²) × Норма (г/м²) / 1000',
    faq: [
      { question: 'Можно ли смешивать удобрения?', answer: 'Нельзя смешивать известь с аммиачной селитрой, золу с навозом. Лучше вносить раздельно.' },
      { question: 'Как часто подкармливать?', answer: 'Овощи — каждые 2-3 недели в период роста. Плодовые — 3-4 раза за сезон.' }
    ],
    sources: [
      { title: 'Gardening Know How - Fertilizers', url: 'https://www.gardeningknowhow.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор полива
export const wateringCalculator: Calculator = {
  id: 'watering-calculator',
  slug: 'poliv-rasteniy',
  title: 'Калькулятор полива',
  description: 'Расчёт количества воды для полива растений с учётом площади и типа почвы',
  category: 'dlya-doma',
  subcategory: 'gardening',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь (м²)',
      type: 'number',
      placeholder: '20',
      min: 0.1,
      defaultValue: 20
    },
    {
      name: 'waterDepth',
      label: 'Норма полива (см/м²)',
      type: 'number',
      placeholder: '5',
      min: 0.1,
      max: 20,
      step: 0.5,
      defaultValue: 5
    },
    {
      name: 'soilType',
      label: 'Тип почвы',
      type: 'select',
      options: [
        { value: 'sandy', label: 'Песчаная' },
        { value: 'loamy', label: 'Супесь' },
        { value: 'clay', label: 'Глинистая' },
        { value: 'peat', label: 'Торфяная' }
      ],
      defaultValue: 'loamy'
    },
    {
      name: 'method',
      label: 'Способ полива',
      type: 'select',
      options: [
        { value: 'manual', label: 'Лейка/шланг' },
        { value: 'sprinkler', label: 'Дождевание' },
        { value: 'drip', label: 'Капельный' }
      ],
      defaultValue: 'manual'
    }
  ],
  outputs: [
    { name: 'waterVolume', label: 'Объём воды', type: 'number', unit: 'л' },
    { name: 'wateringTime', label: 'Время полива', type: 'text' },
    { name: 'frequency', label: 'Частота полива', type: 'text' },
    { name: 'efficiency', label: 'Эффективность', type: 'text' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const waterDepth = Number(inputs.waterDepth);
    const soilType = String(inputs.soilType);
    const method = String(inputs.method);
    
    if (!area || !waterDepth) {
      return [
        { value: '—', label: 'Объём воды', unit: 'л' },
        { value: '—', label: 'Время полива' },
        { value: '—', label: 'Частота полива' },
        { value: '—', label: 'Эффективность' },
        { value: '—', label: 'Советы' }
      ];
    }
    
    // Soil adjustment
    const soilMultipliers: Record<string, number> = {
      'sandy': 1.3,    // Drains fast, needs more
      'loamy': 1.0,    // Balanced
      'clay': 0.9,     // Retains water
      'peat': 1.4      // Very absorbent
    };
    
    // Method efficiency
    const efficiencies: Record<string, { factor: number; text: string; time: string }> = {
      'manual': { factor: 0.8, text: '60-70% (потери на испарение)', time: '15-20 мин' },
      'sprinkler': { factor: 0.7, text: '50-60% (ветер, испарение)', time: '30-40 мин' },
      'drip': { factor: 0.95, text: '90-95% (точно к корням)', time: '60-90 мин' }
    };
    
    const soilMult = soilMultipliers[soilType];
    const efficiency = efficiencies[method];
    
    // Calculate: area (m²) * depth (cm) = liters, adjusted for soil and method
    const baseLiters = area * waterDepth * 10; // 10 because 1 m² * 0.01 m = 0.01 m³ = 10 liters
    const adjustedLiters = baseLiters * soilMult / efficiency.factor;
    
    const frequencies: Record<string, string> = {
      'sandy': 'Каждые 1-2 дня (быстро высыхает)',
      'loamy': 'Каждые 2-3 дня',
      'clay': 'Каждые 3-4 дня (долго сохраняет)',
      'peat': 'Каждые 2-3 дня (хорошо держит)'
    };
    
    const tips: Record<string, string> = {
      'sandy': 'Поливайте чаще, но меньшими порциями. Мульчируйте чтобы удержать влагу.',
      'loamy': 'Идеальная почва. Поливайте по утрам или вечерам.',
      'clay': 'Не поливайте слишком часто — риск загнивания корней.',
      'peat': 'Требует много воды, но хорошо её удерживает. Контролируйте pH.'
    };
    
    return [
      { value: Math.round(adjustedLiters), label: 'Объём воды', unit: 'л' },
      { value: efficiency.time, label: 'Время полива' },
      { value: frequencies[soilType], label: 'Частота полива' },
      { value: efficiency.text, label: 'Эффективность' },
      { value: tips[soilType], label: 'Советы' }
    ];
  },
  content: {
    howTo: 'Введите площадь для полива, норму воды, тип почвы и способ полива. Калькулятор рассчитает нужный объём воды.',
    about: 'Норма полива — 5-10 литров на м² для овощей. Капельный полив самый эффективный (до 95%), но требует времени. Песчаная почва высыхает быстрее.',
    formula: 'Вода (л) = Площадь (м²) × Норма (см) × 10 × Коэффициент почвы / Эффективность',
    faq: [
      { question: 'В какое время поливать?', answer: 'Утром (6-9) или вечером (18-20). Днём вода испаряется, ночью может вызвать грибок.' },
      { question: 'Как проверить влажность почвы?', answer: 'Воткните палец на 5 см. Если сухо — поливайте. Можно использовать влагомер.' }
    ],
    sources: [
      { title: 'Gardening Know How - Watering', url: 'https://www.gardeningknowhow.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор урожайности
export const yieldCalculator: Calculator = {
  id: 'yield-calculator',
  slug: 'urozhaynost',
  title: 'Калькулятор урожайности',
  description: 'Прогноз урожая с грядки или огорода на основе площади и типа культуры',
  category: 'dlya-doma',
  subcategory: 'gardening',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь (м²)',
      type: 'number',
      placeholder: '50',
      min: 1,
      defaultValue: 50
    },
    {
      name: 'crop',
      label: 'Культура',
      type: 'select',
      options: [
        { value: 'tomato', label: 'Помидоры' },
        { value: 'cucumber', label: 'Огурцы' },
        { value: 'potato', label: 'Картофель' },
        { value: 'carrot', label: 'Морковь' },
        { value: 'beet', label: 'Свёкла' },
        { value: 'cabbage', label: 'Капуста' },
        { value: 'onion', label: 'Лук' },
        { value: 'garlic', label: 'Чеснок' },
        { value: 'pumpkin', label: 'Тыква' },
        { value: 'zucchini', label: 'Кабачки' }
      ],
      defaultValue: 'tomato'
    },
    {
      name: 'skill',
      label: 'Уровень огородника',
      type: 'select',
      options: [
        { value: 'beginner', label: 'Начинающий' },
        { value: 'intermediate', label: 'Средний' },
        { value: 'expert', label: 'Опытный' }
      ],
      defaultValue: 'intermediate'
    }
  ],
  outputs: [
    { name: 'expectedYield', label: 'Ожидаемый урожай', type: 'number', unit: 'кг' },
    { name: 'yieldPerMeter', label: 'Урожайность', type: 'number', unit: 'кг/м²' },
    { name: 'marketValue', label: 'Рыночная стоимость', type: 'number', unit: '₽' },
    { name: 'range', label: 'Диапазон', type: 'text' },
    { name: 'tips', label: 'Советы по увеличению', type: 'text' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const crop = String(inputs.crop);
    const skill = String(inputs.skill);
    
    if (!area) {
      return [
        { value: '—', label: 'Ожидаемый урожай', unit: 'кг' },
        { value: '—', label: 'Урожайность', unit: 'кг/м²' },
        { value: '—', label: 'Рыночная стоимость', unit: '₽' },
        { value: '—', label: 'Диапазон' },
        { value: '—', label: 'Советы по увеличению' }
      ];
    }
    
    // Yield per m² in kg
    const baseYields: Record<string, number> = {
      'tomato': 8,
      'cucumber': 6,
      'potato': 4,
      'carrot': 5,
      'beet': 6,
      'cabbage': 7,
      'onion': 4,
      'garlic': 3,
      'pumpkin': 10,
      'zucchini': 8
    };
    
    // Skill multipliers
    const skillMults: Record<string, number> = {
      'beginner': 0.6,
      'intermediate': 1.0,
      'expert': 1.4
    };
    
    // Prices per kg (approximate)
    const prices: Record<string, number> = {
      'tomato': 150,
      'cucumber': 100,
      'potato': 50,
      'carrot': 60,
      'beet': 50,
      'cabbage': 40,
      'onion': 60,
      'garlic': 300,
      'pumpkin': 40,
      'zucchini': 80
    };
    
    const baseYield = baseYields[crop];
    const mult = skillMults[skill];
    const yieldPerMeter = baseYield * mult;
    const totalYield = yieldPerMeter * area;
    const value = totalYield * prices[crop];
    
    const minYield = baseYield * 0.5 * area; // Poor conditions
    const maxYield = baseYield * 1.8 * area; // Excellent conditions
    
    const tips: Record<string, string> = {
      'tomato': 'Формируйте в 1-2 стебля, удаляйте пасынки, подвязывайте.',
      'cucumber': 'Установите шпалеру, регулярно поливайте, собирайте молодыми.',
      'potato': 'Окучивайте 2-3 раза, соблюдайте севооборот.',
      'carrot': 'Прореживайте, мульчируйте чтобы предотвратить зеленение.',
      'beet': 'Не переборщите с азотом — будут пустоты в корне.',
      'cabbage': 'Поливайте равномерно, иначе растрескаются кочаны.',
      'onion': 'После перо начнёт падать — прекращайте полив.',
      'garlic': 'Сажайте осенью, убирайте когда листья пожелтеют.',
      'pumpkin': 'Оставьте 2-3 плода на растение, удалите остальные.',
      'zucchini': 'Собирайте молодые (20-25 см) — они самые вкусные.'
    };
    
    return [
      { value: Math.round(totalYield), label: 'Ожидаемый урожай', unit: 'кг' },
      { value: Number(yieldPerMeter.toFixed(1)), label: 'Урожайность', unit: 'кг/м²' },
      { value: Math.round(value), label: 'Рыночная стоимость', unit: '₽' },
      { value: `${Math.round(minYield)} - ${Math.round(maxYield)} кг`, label: 'Диапазон' },
      { value: tips[crop], label: 'Советы по увеличению' }
    ];
  },
  content: {
    howTo: 'Введите площадь, выберите культуру и уровень опыта. Калькулятор даст прогноз урожая и рекомендации.',
    about: 'Урожайность зависит от климата, почвы, ухода и сорта. Начинающие получают 40-60% от потенциала, опытные — до 140%.',
    formula: 'Урожай (кг) = Площадь (м²) × Базовая урожайность × Коэффициент мастерства',
    faq: [
      { question: 'Как увеличить урожай?', answer: 'Правильная подготовка почвы, своевременный полив и подкормка, защита от вредителей, сорта с высокой урожайностью.' },
      { question: 'Что самое выгодное выращивать?', answer: 'Зелень и пряности дают быстрый возврат. Томаты и огурцы — хороший баланс урожая и цены.' }
    ],
    sources: [
      { title: 'Gardening Know How - Crop Yields', url: 'https://www.gardeningknowhow.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор компоста
export const compostCalculator: Calculator = {
  id: 'compost-garden-calculator',
  slug: 'kompostirovanie',
  title: 'Калькулятор компоста',
  description: 'Расчёт соотношения "зелёного" и "коричневого" материала для компоста',
  category: 'dlya-doma',
  subcategory: 'gardening',
  type: 'formula',
  inputs: [
    {
      name: 'greenMaterial',
      label: 'Зелёный материал (кг)',
      type: 'number',
      placeholder: '10',
      min: 0,
      defaultValue: 10
    },
    {
      name: 'brownMaterial',
      label: 'Коричневый материал (кг)',
      type: 'number',
      placeholder: '20',
      min: 0,
      defaultValue: 20
    },
    {
      name: 'pileSize',
      label: 'Размер кучи (м³)',
      type: 'number',
      placeholder: '1',
      min: 0.1,
      max: 10,
      defaultValue: 1
    }
  ],
  outputs: [
    { name: 'carbonNitrogen', label: 'Соотношение C:N', type: 'number' },
    { name: 'ratioStatus', label: 'Статус соотношения', type: 'text' },
    { name: 'compostReady', label: 'Компост готов через', type: 'text' },
    { name: 'yield', label: 'Выход готового компоста', type: 'number', unit: 'кг' },
    { name: 'recommendation', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
    const greenMaterial = Number(inputs.greenMaterial);
    const brownMaterial = Number(inputs.brownMaterial);
    const pileSize = Number(inputs.pileSize);
    
    if (!greenMaterial && !brownMaterial) {
      return [
        { value: '—', label: 'Соотношение C:N' },
        { value: '—', label: 'Статус соотношения' },
        { value: '—', label: 'Компост готов через' },
        { value: '—', label: 'Выход готового компоста', unit: 'кг' },
        { value: '—', label: 'Рекомендации' }
      ];
    }
    
    // Approximate C:N ratios
    // Green material: 15:1 (fresh grass, vegetable scraps)
    // Brown material: 40:1 (leaves, straw, paper)
    
    const greenC = greenMaterial * 15;
    const greenN = greenMaterial;
    const brownC = brownMaterial * 40;
    const brownN = brownMaterial;
    
    const totalC = greenC + brownC;
    const totalN = greenN + brownN;
    const cnRatio = totalN > 0 ? totalC / totalN : 0;
    
    let status: string;
    let recommendation: string;
    
    if (cnRatio < 20) {
      status = 'Слишком богат азотом';
      recommendation = 'Добавьте больше сухого материала (солома, опавшие листья, картон)';
    } else if (cnRatio > 35) {
      status = 'Слишком много углерода';
      recommendation = 'Добавьте больше свежего материала (трава, овощные очистки, кофейная гуща)';
    } else {
      status = '✓ Оптимальное соотношение';
      recommendation = 'Соотношение идеально! Перемешайте и поддерживайте влажность.';
    }
    
    // Composting time depends on size and ratio
    let readyTime: string;
    if (pileSize < 0.5) {
      readyTime = '3-4 месяца (маленькая куча греется плохо)';
    } else if (cnRatio >= 20 && cnRatio <= 35) {
      readyTime = '2-3 месяца (оптимальные условия)';
    } else {
      readyTime = '4-6 месяцев (неоптимальное соотношение)';
    }
    
    // Yield is about 40% of input volume
    const totalInput = greenMaterial + brownMaterial;
    const yield_ = totalInput * 0.4;
    
    return [
      { value: Math.round(cnRatio), label: 'Соотношение C:N' },
      { value: status, label: 'Статус соотношения' },
      { value: readyTime, label: 'Компост готов через' },
      { value: Math.round(yield_), label: 'Выход готового компоста', unit: 'кг' },
      { value: recommendation, label: 'Рекомендации' }
    ];
  },
  content: {
    howTo: 'Введите количество "зелёного" (свежие остатки) и "коричневого" (сухие) материала, размер кучи. Калькулятор проверит соотношение углерода и азота.',
    about: 'Для компостирования нужно соотношение углерод:азот 25-30:1. Зелёный материал богат азотом (15:1), коричневый — углеродом (40:1).',
    formula: 'C:N = (Зелёный×15 + Коричневый×40) / (Зелёный + Коричневый)\nОптимум: 25-30:1',
    faq: [
      { question: 'Что относится к зелёному материалу?', answer: 'Свежескошенная трава, овощные очистки, кофейная гуща, чайные листья, свежий навоз.' },
      { question: 'Что относится к коричневому?', answer: 'Опавшие листья, солома, картон, опилки, высохшая трава, ветки.' }
    ],
    sources: [
      { title: 'Gardening Know How - Composting', url: 'https://www.gardeningknowhow.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор сроков посадки
export const plantingCalendarCalculator: Calculator = {
  id: 'planting-calendar',
  slug: 'sroki-posadki',
  title: 'Календарь посадки',
  description: 'Расчёт сроков посадки семян и высаживания рассады с учётом региона',
  category: 'dlya-doma',
  subcategory: 'gardening',
  type: 'formula',
  inputs: [
    {
      name: 'crop',
      label: 'Культура',
      type: 'select',
      options: [
        { value: 'tomato', label: 'Помидоры (рассада)' },
        { value: 'pepper', label: 'Перец (рассада)' },
        { value: 'cucumber', label: 'Огурцы (семена/рассада)' },
        { value: 'cabbage', label: 'Капуста (рассада)' },
        { value: 'carrot', label: 'Морковь (семена в грунт)' },
        { value: 'beet', label: 'Свёкла (семена в грунт)' },
        { value: 'potato', label: 'Картофель (клубни)' },
        { value: 'onion', label: 'Лук (севок)' }
      ],
      defaultValue: 'tomato'
    },
    {
      name: 'frostDate',
      label: 'Последние заморозки (дата)',
      type: 'select',
      options: [
        { value: 'early-april', label: 'Начало апреля' },
        { value: 'mid-april', label: 'Середина апреля' },
        { value: 'late-april', label: 'Конец апреля' },
        { value: 'early-may', label: 'Начало мая' },
        { value: 'mid-may', label: 'Середина мая' },
        { value: 'late-may', label: 'Конец мая' }
      ],
      defaultValue: 'mid-may'
    }
  ],
  outputs: [
    { name: 'seedlingStart', label: 'Начать рассаду', type: 'text' },
    { name: 'transplantDate', label: 'Высадка в грунт', type: 'text' },
    { name: 'directSow', label: 'Посев в грунт', type: 'text' },
    { name: 'harvest', label: 'Ожидаемый урожай', type: 'text' },
    { name: 'daysToHarvest', label: 'Дней до урожая', type: 'number', unit: 'дн' }
  ],
  calculate: (inputs) => {
    const crop = String(inputs.crop);
    const frostDate = String(inputs.frostDate);
    
    // Define base dates (approximate for Moscow region)
    const frostDates: Record<string, Date> = {
      'early-april': new Date(2026, 3, 5),    // April 5
      'mid-april': new Date(2026, 3, 15),     // April 15
      'late-april': new Date(2026, 3, 25),    // April 25
      'early-may': new Date(2026, 4, 5),      // May 5
      'mid-may': new Date(2026, 4, 15),       // May 15
      'late-may': new Date(2026, 4, 25)       // May 25
    };
    
    const lastFrost = frostDates[frostDate];
    
    // Planting data: [weeks before last frost to start seedlings, weeks after last frost to transplant, days to harvest]
    const cropData: Record<string, { seedling: number; transplant: number; direct: number; harvest: number }> = {
      'tomato': { seedling: 8, transplant: 1, direct: -1, harvest: 75 },
      'pepper': { seedling: 10, transplant: 2, direct: -1, harvest: 85 },
      'cucumber': { seedling: 4, transplant: 1, direct: 1, harvest: 55 },
      'cabbage': { seedling: 6, transplant: 2, direct: 4, harvest: 80 },
      'carrot': { seedling: -1, transplant: -1, direct: 3, harvest: 70 },
      'beet': { seedling: -1, transplant: -1, direct: 2, harvest: 65 },
      'potato': { seedling: -1, transplant: -1, direct: 0, harvest: 90 },
      'onion': { seedling: -1, transplant: -1, direct: 4, harvest: 75 }
    };
    
    const data = cropData[crop];
    
    // Calculate dates
    let seedlingStart = '';
    if (data.seedling > 0) {
      const seedlingDate = new Date(lastFrost);
      seedlingDate.setDate(seedlingDate.getDate() - (data.seedling * 7));
      seedlingStart = `${seedlingDate.getDate()} ${getMonthName(seedlingDate.getMonth())}`;
    } else {
      seedlingStart = 'Не требуется (прямой посев)';
    }
    
    let transplantDate = '';
    if (data.transplant >= 0) {
      const transplant = new Date(lastFrost);
      transplant.setDate(transplant.getDate() + (data.transplant * 7));
      transplantDate = `${transplant.getDate()} ${getMonthName(transplant.getMonth())}`;
    } else {
      transplantDate = 'Не требуется';
    }
    
    let directSow = '';
    if (data.direct >= 0) {
      const direct = new Date(lastFrost);
      direct.setDate(direct.getDate() + (data.direct * 7));
      directSow = `${direct.getDate()} ${getMonthName(direct.getMonth())}`;
    } else {
      directSow = 'Через рассаду';
    }
    
    const harvestDate = new Date(lastFrost);
    harvestDate.setDate(harvestDate.getDate() + data.harvest);
    const harvest = `${harvestDate.getDate()} ${getMonthName(harvestDate.getMonth())}`;
    
    function getMonthName(month: number): string {
      const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
      return months[month];
    }
    
    return [
      { value: seedlingStart, label: 'Начать рассаду' },
      { value: transplantDate, label: 'Высадка в грунт' },
      { value: directSow, label: 'Посев в грунт' },
      { value: harvest, label: 'Ожидаемый урожай' },
      { value: data.harvest, label: 'Дней до урожая', unit: 'дн' }
    ];
  },
  content: {
    howTo: 'Выберите культуру и примерную дату последних заморозков в вашем регионе. Калькулятор подскажет когда сеять и когда ждать урожай.',
    about: 'Сроки посадки зависят от климата региона. Рассаду теплолюбивых культур (томаты, перцы) начинают за 2-2.5 месяца до высадки.',
    formula: 'Дата рассады = Дата последних заморозков - Вегетация рассады\nДата высадки = Дата последних заморозков + 1-2 недели',
    faq: [
      { question: 'Когда сеять томаты на рассаду?', answer: 'В средней полосе России — начало марта (за 60-65 дней до высадки).' },
      { question: 'Можно ли посеять огурцы сразу в грунт?', answer: 'Да, когда почва прогреется до +12-15°C и минует угроза заморозков.' }
    ],
    sources: [
      { title: 'Gardening Know How - Planting Calendar', url: 'https://www.gardeningknowhow.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор площади посадки
export const plantingAreaCalculator: Calculator = {
  id: 'planting-area',
  slug: 'ploshad-posadki',
  title: 'Калькулятор площади посадки',
  description: 'Расчёт площади под огород на основе потребностей семьи',
  category: 'dlya-doma',
  subcategory: 'gardening',
  type: 'formula',
  inputs: [
    {
      name: 'people',
      label: 'Количество человек',
      type: 'number',
      placeholder: '4',
      min: 1,
      max: 20,
      defaultValue: 4
    },
    {
      name: 'potato',
      label: 'Картофель (кг/год на человека)',
      type: 'number',
      placeholder: '100',
      min: 0,
      defaultValue: 100
    },
    {
      name: 'vegetables',
      label: 'Овощи (кг/год на человека)',
      type: 'number',
      placeholder: '80',
      min: 0,
      defaultValue: 80
    },
    {
      name: 'preservation',
      label: 'Доля на консервацию (%)',
      type: 'number',
      placeholder: '30',
      min: 0,
      max: 100,
      defaultValue: 30
    }
  ],
  outputs: [
    { name: 'totalPotato', label: 'Картофеля всего', type: 'number', unit: 'кг' },
    { name: 'potatoArea', label: 'Площадь под картофель', type: 'number', unit: 'м²' },
    { name: 'vegArea', label: 'Площадь под овощи', type: 'number', unit: 'м²' },
    { name: 'totalArea', label: 'Общая площадь', type: 'number', unit: 'м²' },
    { name: 'inSotki', label: 'В сотках', type: 'number', unit: 'соток' }
  ],
  calculate: (inputs) => {
    const people = Number(inputs.people);
    const potato = Number(inputs.potato);
    const vegetables = Number(inputs.vegetables);
    
    if (!people) {
      return [
        { value: '—', label: 'Картофеля всего', unit: 'кг' },
        { value: '—', label: 'Площадь под картофель', unit: 'м²' },
        { value: '—', label: 'Площадь под овощи', unit: 'м²' },
        { value: '—', label: 'Общая площадь', unit: 'м²' },
        { value: '—', label: 'В сотках', unit: 'соток' }
      ];
    }
    
    // Yields per m²
    const potatoYield = 4; // kg/m²
    const vegYield = 6; // kg/m² average
    
    const totalPotato = potato * people;
    const totalVeg = vegetables * people;
    
    const potatoArea = totalPotato / potatoYield;
    const vegArea = totalVeg / vegYield;
    const totalArea = potatoArea + vegArea;
    const inSotki = totalArea / 100;
    
    return [
      { value: totalPotato, label: 'Картофеля всего', unit: 'кг' },
      { value: Math.round(potatoArea), label: 'Площадь под картофель', unit: 'м²' },
      { value: Math.round(vegArea), label: 'Площадь под овощи', unit: 'м²' },
      { value: Math.round(totalArea), label: 'Общая площадь', unit: 'м²' },
      { value: Number(inSotki.toFixed(1)), label: 'В сотках', unit: 'соток' }
    ];
  },
  content: {
    howTo: 'Введите количество членов семьи, годовую потребность в картофеле и овощах на человека. Калькулятор рассчитает нужную площадь огорода.',
    about: 'Среднестатистическая семья из 4 человек потребляет ~400 кг картофеля и ~300 кг овощей в год. Учитывайте запас на консервацию и возможные потери.',
    formula: 'Площадь = Потребность / Урожайность\nУрожайность: картофель ~4 кг/м², овощи ~6 кг/м²',
    faq: [
      { question: 'Сколько нужно огорода на семью из 4 человек?', answer: 'Минимум 2-3 сотки для базового набора. Для полного самообеспечения — 5-6 соток.' },
      { question: 'Можно ли всё вырастить на маленьком участке?', answer: 'Да, с помощью интенсивных технологий: высокие грядки, многоуровневые посадки, теплицы.' }
    ],
    sources: [
      { title: 'Garden Planning Guide', url: 'https://www.gardeningknowhow.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор температуры почвы
export const soilTemperatureCalculator: Calculator = {
  id: 'soil-temp',
  slug: 'temperatura-pochvy',
  title: 'Калькулятор температуры почвы',
  description: 'Оценка прогрева почвы для посева семян разных культур',
  category: 'dlya-doma',
  subcategory: 'gardening',
  type: 'formula',
  inputs: [
    {
      name: 'airTemp',
      label: 'Температура воздуха (°C)',
      type: 'number',
      placeholder: '15',
      min: -10,
      max: 40,
      defaultValue: 15
    },
    {
      name: 'sunny',
      label: 'Солнечно?',
      type: 'select',
      options: [
        { value: 'yes', label: 'Да, солнечно' },
        { value: 'no', label: 'Нет, пасмурно' }
      ],
      defaultValue: 'yes'
    },
    {
      name: 'mulch',
      label: 'Мульча на грядке',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет' },
        { value: 'light', label: 'Лёгкая (солома)' },
        { value: 'heavy', label: 'Толстый слой' }
      ],
      defaultValue: 'none'
    },
    {
      name: 'depth',
      label: 'Глубина (см)',
      type: 'number',
      placeholder: '5',
      min: 1,
      max: 30,
      defaultValue: 5
    }
  ],
  outputs: [
    { name: 'soilTemp', label: 'Температура почвы', type: 'number', unit: '°C' },
    { name: 'readyFor', label: 'Готово для посева', type: 'text' },
    { name: 'depthNote', label: 'Примечание по глубине', type: 'text' }
  ],
  calculate: (inputs) => {
    const airTemp = Number(inputs.airTemp);
    const sunny = String(inputs.sunny);
    const mulch = String(inputs.mulch);
    const depth = Number(inputs.depth);
    
    if (!airTemp) {
      return [
        { value: '—', label: 'Температура почвы', unit: '°C' },
        { value: '—', label: 'Готово для посева' },
        { value: '—', label: 'Примечание по глубине' }
      ];
    }
    
    // Soil temp is usually 2-5 degrees lower than air temp
    let soilTemp = airTemp - 3;
    
    // Adjust for sun
    if (sunny === 'yes') {
      soilTemp += 2;
    } else {
      soilTemp -= 1;
    }
    
    // Adjust for mulch (delays warming)
    const mulchAdjust: Record<string, number> = {
      'none': 0,
      'light': -1,
      'heavy': -3
    };
    soilTemp += mulchAdjust[mulch];
    
    // Adjust for depth (deeper = cooler)
    soilTemp -= (depth - 5) * 0.3;
    
    let readyFor = '';
    if (soilTemp >= 10) {
      readyFor = 'Огурцы, тыквы, кукуруза, фасоль';
    } else if (soilTemp >= 8) {
      readyFor = 'Свёкла, морковь, редис, шпинат';
    } else if (soilTemp >= 5) {
      readyFor = 'Картофель, лук, горох, укроп';
    } else if (soilTemp >= 2) {
      readyFor = 'Ранняя редька, зелень, горох';
    } else {
      readyFor = 'Ещё рано для посева';
    }
    
    let depthNote = '';
    if (depth > 10) {
      depthNote = 'На глубине >10 см почва прогревается медленнее. Для раннего посева делайте мелкие борозды.';
    } else {
      depthNote = 'Мелкая посадка быстрее прогревается, но быстрее высыхает.';
    }
    
    return [
      { value: Math.round(soilTemp), label: 'Температура почвы', unit: '°C' },
      { value: readyFor, label: 'Готово для посева' },
      { value: depthNote, label: 'Примечание по глубине' }
    ];
  },
  content: {
    howTo: 'Введите температуру воздуха, выберите погодные условия, наличие мульчи и глубину посева. Калькулятор оценит температуру почвы.',
    about: 'Семена разных культур прорастают при разной температуре почвы. Холодостойкие (горох, редис) при +2-5°C, теплолюбивые (огурцы, тыквы) ждут +10-12°C.',
    formula: 'Температура почвы ≈ Температура воздуха - 3°C\nПоправки: солнце +2°C, мульча -1...-3°C',
    faq: [
      { question: 'При какой температуре сажать картофель?', answer: 'Когда почва прогреется до +5-8°C на глубине посадки (10 см). Обычно это середина-конец апреля в средней полосе.' },
      { question: 'Почему семена не всходят?', answer: 'Возможно, почва ещё холодная. Проверьте температуру на глубине посева. Такая причина — слишком глубокая посадка или пересыхание.' }
    ],
    sources: [
      { title: 'Gardening Know How - Soil Temperature', url: 'https://www.gardeningknowhow.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор ухода за растениями
export const plantCareCalculator: Calculator = {
  id: 'plant-care-calculator',
  slug: 'uhod-za-rasteniyami',
  title: 'Калькулятор ухода за растениями',
  description: 'Расчёт расписания полива, подкормки и обработки с учётом вида растения и сезона',
  category: 'dlya-doma',
  subcategory: 'gardening',
  type: 'formula',
  inputs: [
    {
      name: 'plantType',
      label: 'Тип растения',
      type: 'select',
      options: [
        { value: 'cucumber', label: 'Огурцы' },
        { value: 'tomato', label: 'Помидоры' },
        { value: 'pepper', label: 'Перец' },
        { value: 'potato', label: 'Картофель' },
        { value: 'carrot', label: 'Морковь' },
        { value: 'onion', label: 'Лук' },
        { value: 'berry', label: 'Ягодные кусты' }
      ],
      defaultValue: 'cucumber'
    },
    {
      name: 'plantCount',
      label: 'Количество растений',
      type: 'number',
      placeholder: '10',
      min: 1,
      defaultValue: 10
    },
    {
      name: 'season',
      label: 'Сезон',
      type: 'select',
      options: [
        { value: 'spring', label: 'Весна' },
        { value: 'summer', label: 'Лето' },
        { value: 'autumn', label: 'Осень' }
      ],
      defaultValue: 'summer'
    },
    {
      name: 'soilType',
      label: 'Тип почвы',
      type: 'select',
      options: [
        { value: 'sand', label: 'Песчаная' },
        { value: 'loam', label: 'Суглинистая' },
        { value: 'clay', label: 'Глинистая' },
        { value: 'peat', label: 'Торфяная' }
      ],
      defaultValue: 'loam'
    }
  ],
  outputs: [
    { name: 'wateringFreq', label: 'Частота полива', type: 'text' },
    { name: 'fertilizerFreq', label: 'Частота подкормки', type: 'text' },
    { name: 'fertilizerAmount', label: 'Удобрений за сезон', type: 'number', unit: 'г' },
    { name: 'waterPerDay', label: 'Воды в день', type: 'number', unit: 'л' },
    { name: 'careNotes', label: 'Рекомендации по уходу', type: 'text' }
  ],
  calculate: (inputs) => {
    const plantType = String(inputs.plantType || 'cucumber');
    const plantCount = Number(inputs.plantCount || 10);
    const season = String(inputs.season || 'summer');
    const soilType = String(inputs.soilType || 'loam');
    
    // Water requirements per plant per day (liters)
    const waterNeeds: Record<string, number> = {
      cucumber: 1.5, tomato: 1.0, pepper: 0.8, potato: 1.2,
      carrot: 0.5, onion: 0.4, berry: 1.0
    };
    
    // Season multipliers
    const seasonMult: Record<string, number> = {
      spring: 0.6, summer: 1.0, autumn: 0.7
    };
    
    // Soil multiplier
    const soilMult: Record<string, number> = {
      sand: 1.5, loam: 1.0, clay: 0.8, peat: 0.9
    };
    
    const baseWater = waterNeeds[plantType] || 1.0;
    const waterPerDay = plantCount * baseWater * seasonMult[season] * soilMult[soilType];
    
    // Watering frequency based on season and soil
    let wateringFreq = '';
    if (season === 'summer') {
      wateringFreq = soilType === 'sand' ? 'Каждый день' : '1-2 раза в неделю';
    } else {
      wateringFreq = soilType === 'sand' ? '2-3 раза в неделю' : '1 раз в неделю';
    }
    
    // Fertilizer schedule
    let fertilizerFreq = '';
    let fertilizerPerSeason = 0;
    if (plantType === 'tomato' || plantType === 'pepper' || plantType === 'cucumber') {
      fertilizerFreq = 'Каждые 2 недели';
      fertilizerPerSeason = plantCount * 50 * (season === 'summer' ? 1 : 0.5);
    } else if (plantType === 'potato') {
      fertilizerFreq = '2 раза за сезон';
      fertilizerPerSeason = plantCount * 30;
    } else {
      fertilizerFreq = '1 раз в месяц';
      fertilizerPerSeason = plantCount * 20;
    }
    
    // Care notes
    let careNotes = '';
    if (plantType === 'cucumber') {
      careNotes = 'Огурцы любят влагу — поливать утром или вечером. Подвязывайте к шпалере.';
    } else if (plantType === 'tomato') {
      careNotes = 'Пасынкуйте помидоры. Полив у корня, не на листья. Для детерминантных подвязывайте.';
    } else if (plantType === 'berry') {
      careNotes = 'Обрезайте старые ветви. Мульчируйте почву для сохранения влаги.';
    } else {
      careNotes = 'Следите за влажностью почвы. Убирайте сорняки вовремя.';
    }
    
    return [
      { value: wateringFreq, label: 'Частота полива' },
      { value: fertilizerFreq, label: 'Частота подкормки' },
      { value: Math.round(fertilizerPerSeason), label: 'Удобрений за сезон', unit: 'г' },
      { value: Math.round(waterPerDay * 10) / 10, label: 'Воды в день', unit: 'л' },
      { value: careNotes, label: 'Рекомендации по уходу' }
    ];
  },
  content: {
    howTo: 'Выберите тип и количество растений, сезон и тип почвы. Калькулятор составит график ухода с рекомендациями.',
    about: 'Регулярный уход — залог хорошего урожая. Каждая культура имеет свои особенности: огурцы любят влагу, помидоры нуждаются в пасынковании, корнеплоды не переносят застоя воды.',
    formula: 'Потребность в воде = Базовая норма × Количество растений × Коэффициент сезона × Коэффициент почвы',
    faq: [
      { question: 'Как часто поливать огурцы?', answer: 'Огурцы — влаголюбивые культуры. Летом поливайте каждый день или через день, особенно в жару. Норма — 1-2 литра под куст.' },
      { question: 'Когда подкармливать помидоры?', answer: 'Начинайте подкормку через 2 недели после высадки рассады. Используйте комплексные удобрения с калием и фосфором.' }
    ],
    sources: [
      { title: 'Огороднику на заметку — График ухода', url: 'https://ogorod.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор урожайности теплицы
export const greenhouseCalculator: Calculator = {
  id: 'greenhouse-calculator',
  slug: 'urozhaynost-teplitsy',
  title: 'Калькулятор урожайности теплицы',
  description: 'Расчёт ожидаемого урожая в теплице с учётом площади, культур и технологии выращивания',
  category: 'dlya-doma',
  subcategory: 'gardening',
  type: 'formula',
  inputs: [
    {
      name: 'greenhouseLength',
      label: 'Длина теплицы (м)',
      type: 'number',
      placeholder: '6',
      min: 1,
      defaultValue: 6
    },
    {
      name: 'greenhouseWidth',
      label: 'Ширина теплицы (м)',
      type: 'number',
      placeholder: '3',
      min: 1,
      defaultValue: 3
    },
    {
      name: 'cropType',
      label: 'Основная культура',
      type: 'select',
      options: [
        { value: 'tomatoes', label: 'Помидоры (высокорослые)' },
        { value: 'cucumbers', label: 'Огурцы' },
        { value: 'peppers', label: 'Перец сладкий' },
        { value: 'eggplants', label: 'Баклажаны' },
        { value: 'mixed', label: 'Смешанные посадки' }
      ],
      defaultValue: 'tomatoes'
    },
    {
      name: 'growingMethod',
      label: 'Способ выращивания',
      type: 'select',
      options: [
        { value: 'ground', label: 'В грунт' },
        { value: 'hydro', label: 'Гидропоника' },
        { value: 'dutch', label: 'Голландский метод' }
      ],
      defaultValue: 'ground'
    },
    {
      name: 'heating',
      label: 'Отопление',
      type: 'select',
      options: [
        { value: 'none', label: 'Без отопления (лето)' },
        { value: 'yes', label: 'С отоплением (круглый год)' }
      ],
      defaultValue: 'none'
    }
  ],
  outputs: [
    { name: 'area', label: 'Площадь теплицы', type: 'number', unit: 'м²' },
    { name: 'plants', label: 'Растений поместится', type: 'number', unit: 'шт' },
    { name: 'yieldKg', label: 'Ожидаемый урожай', type: 'number', unit: 'кг' },
    { name: 'revenue', label: 'Примерная стоимость', type: 'number', unit: '₽' },
    { name: 'seasons', label: 'Сезонов выращивания', type: 'number', unit: '' }
  ],
  calculate: (inputs) => {
    const length = Number(inputs.greenhouseLength || 6);
    const width = Number(inputs.greenhouseWidth || 3);
    const cropType = String(inputs.cropType || 'tomatoes');
    const method = String(inputs.growingMethod || 'ground');
    const heating = String(inputs.heating || 'none');
    
    const area = length * width;
    
    // Plant density per square meter
    const density: Record<string, Record<string, number>> = {
      tomatoes: { ground: 3, hydro: 4, dutch: 5 },
      cucumbers: { ground: 2, hydro: 3, dutch: 4 },
      peppers: { ground: 4, hydro: 5, dutch: 6 },
      eggplants: { ground: 2.5, hydro: 3, dutch: 4 },
      mixed: { ground: 3, hydro: 4, dutch: 4.5 }
    };
    
    const plantsPerM2 = density[cropType]?.[method] || 3;
    const totalPlants = Math.floor(area * plantsPerM2);
    
    // Yield per plant (kg)
    const yields: Record<string, Record<string, number>> = {
      tomatoes: { ground: 4, hydro: 6, dutch: 8 },
      cucumbers: { ground: 3, hydro: 5, dutch: 7 },
      peppers: { ground: 1.5, hydro: 2.5, dutch: 3 },
      eggplants: { ground: 2, hydro: 3, dutch: 4 },
      mixed: { ground: 3, hydro: 4.5, dutch: 5.5 }
    };
    
    const yieldPerPlant = yields[cropType]?.[method] || 3;
    let totalYield = totalPlants * yieldPerPlant;
    
    // Heating bonus (year-round growing)
    const seasons = heating === 'yes' ? 3 : 1;
    totalYield = totalYield * seasons;
    
    // Price per kg (approximate retail)
    const prices: Record<string, number> = {
      tomatoes: 150, cucumbers: 120, peppers: 200, eggplants: 150, mixed: 150
    };
    const pricePerKg = prices[cropType] || 150;
    const revenue = totalYield * pricePerKg;
    
    return [
      { value: Math.round(area * 10) / 10, label: 'Площадь теплицы', unit: 'м²' },
      { value: totalPlants, label: 'Растений поместится', unit: 'шт' },
      { value: Math.round(totalYield * 10) / 10, label: 'Ожидаемый урожай', unit: 'кг' },
      { value: Math.round(revenue), label: 'Примерная стоимость', unit: '₽' },
      { value: seasons, label: 'Сезонов выращивания', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите размеры теплицы, выберите культуру и способ выращивания. Калькулятор рассчитает урожайность и количество растений.',
    about: 'Теплица позволяет получить урожай раньше и в большем объёме. На 1 м² теплицы можно вырастить 3-6 кустов помидоров или огурцов. Гидропоника и профессиональные методы увеличивают урожайность в 2-3 раза.',
    formula: 'Урожай = Количество растений × Удельная урожайность × Количество сезонов\nРастений = Площадь × Плотность посадки',
    faq: [
      { question: 'Сколько помидоров в теплице 3×6?', answer: 'В теплице 3×6 м (18 м²) поместится 54-90 кустов помидоров в зависимости от метода: в грунт — около 54, гидропоника — до 72, голландский метод — до 90.' },
      { question: 'Сколько можно заработать на теплице?', answer: 'С теплицы 3×6 м можно получить 200-700 кг помидоров за сезон. По цене 100-150 руб/кг — 20-100 тыс рублей. При годовом выращивании с отоплением доход увеличивается в 3 раза, но и затраты выше.' }
    ],
    sources: [
      { title: 'Теплица.ру — Урожайность в теплице', url: 'https://teplitsa.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const gardeningCalculators: Calculator[] = [
  seedCalculator,
  fertilizerCalculator,
  wateringCalculator,
  yieldCalculator,
  compostCalculator,
  plantingCalendarCalculator,
  plantingAreaCalculator,
  soilTemperatureCalculator,
  plantCareCalculator,
  greenhouseCalculator
];
