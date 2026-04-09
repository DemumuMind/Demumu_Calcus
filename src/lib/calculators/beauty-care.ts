import { Calculator } from '../types';

// Калькулятор красоты сна
export const sleepBeautyCalculator: Calculator = {
  id: 'sleep-beauty-calculator',
  slug: 'son-i-krasota',
  title: 'Калькулятор красоты сна',
  description: 'Расчёт оптимальной продолжительности сна для красоты и здоровья кожи',
  category: 'zdorove',
  subcategory: 'wellness',
  type: 'formula',
  inputs: [
    {
      name: 'age',
      label: 'Возраст',
      type: 'number',
      placeholder: '30',
      min: 18,
      max: 80,
      defaultValue: 30
    },
    {
      name: 'stressLevel',
      label: 'Уровень стресса',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкий' },
        { value: 'medium', label: 'Средний' },
        { value: 'high', label: 'Высокий' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'exerciseFrequency',
      label: 'Физическая активность',
      type: 'select',
      options: [
        { value: 'sedentary', label: 'Минимальная' },
        { value: 'light', label: 'Лёгкая (1-2 раза в неделю)' },
        { value: 'moderate', label: 'Умеренная (3-5 раз в неделю)' },
        { value: 'intense', label: 'Интенсивная (ежедневно)' }
      ],
      defaultValue: 'light'
    }
  ],
  outputs: [
    { name: 'optimalSleep', label: 'Оптимальное время сна', type: 'number', unit: 'ч' },
    { name: 'beautySleep', label: 'Красивый сон (22:00-02:00)', type: 'text' },
    { name: 'skinRecovery', label: 'Время восстановления кожи', type: 'text' },
    { name: 'darkCircles', label: 'Риск тёмных кругов', type: 'text' },
    { name: 'recommendations', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age || 30);
    const stressLevel = String(inputs.stressLevel || 'medium');
    const exercise = String(inputs.exerciseFrequency || 'light');
    
    // Base sleep needs by age
    let optimalSleep = 8;
    if (age < 25) {
      optimalSleep = 8.5;
    } else if (age > 50) {
      optimalSleep = 7.5;
    }
    
    // Stress adjustments
    const stressAdjust: Record<string, number> = {
      low: 0, medium: 0.5, high: 1
    };
    optimalSleep += stressAdjust[stressLevel];
    
    // Exercise adjustments
    const exerciseAdjust: Record<string, number> = {
      sedentary: 0, light: 0, moderate: 0.5, intense: 1
    };
    optimalSleep += exerciseAdjust[exercise];
    
    // Beauty sleep window (22:00-02:00 is when growth hormone peaks)
    const beautySleep = '22:00-02:00 — время пика гормона роста, кожа активно восстанавливается';
    
    // Skin recovery based on sleep quality
    let skinRecovery = '';
    if (optimalSleep >= 8) {
      skinRecovery = 'Полное восстановление кожи за ночь';
    } else if (optimalSleep >= 7) {
      skinRecovery = 'Хорошее восстановление, но без запаса';
    } else {
      skinRecovery = 'Недостаточно времени для полного восстановления';
    }
    
    // Dark circles risk
    let darkCircles = '';
    if (optimalSleep < 7 || stressLevel === 'high') {
      darkCircles = 'Высокий риск — используйте крем с кофеином';
    } else if (optimalSleep < 8) {
      darkCircles = 'Средний риск — следите за гигиеной сна';
    } else {
      darkCircles = 'Низкий риск при соблюдении режима';
    }
    
    let recommendations = '';
    if (exercise === 'intense') {
      recommendations = 'После интенсивных тренировок коже нужно больше времени на восстановление. Спите на шёлковой наволочке.';
    } else if (stressLevel === 'high') {
      recommendations = 'При стрессе страдает барьерная функция кожи. Используйте ночные восстанавливающие средства.';
    } else {
      recommendations = 'Ложитесь в 22:00-23:00 для максимального восстановления кожи.';
    }
    
    return [
      { value: Number(optimalSleep.toFixed(1)), label: 'Оптимальное время сна', unit: 'ч' },
      { value: beautySleep, label: 'Красивый сон (22:00-02:00)' },
      { value: skinRecovery, label: 'Время восстановления кожи' },
      { value: darkCircles, label: 'Риск тёмных кругов' },
      { value: recommendations, label: 'Рекомендации' }
    ];
  },
  content: {
    howTo: 'Введите ваш возраст, уровень стресса и физическую активность. Калькулятор определит оптимальную продолжительность сна для красоты.',
    about: 'Сон — это бесплатная косметика. В период с 22:00 до 02:00 вырабатывается до 70% суточного количества гормона роста, который отвечает за регенерацию кожи.',
    formula: 'Оптимальный сон = Базовая норма (7-8.5 ч) + Поправка на стресс (0-1 ч) + Поправка на нагрузки (0-1 ч)',
    faq: [
      { question: 'Почему тёмные круги под глазами?', answer: 'Недосыпание, стресс, плохая микроциркуляция. Во время сна усиливается кровоток, уменьшается застой. При недосыпании — отёки и тёмные круги.' },
      { question: 'Как улучшить качество сна для кожи?', answer: 'Ложитесь до 23:00, спите на спине или на шёлковой наволочке, используйте ночной крем, вентилируйте комнату.' }
    ],
    sources: [
      { title: 'Sleep Foundation - Beauty Sleep', url: 'https://www.sleepfoundation.org/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор потребления воды для кожи
export const waterIntakeBeautyCalculator: Calculator = {
  id: 'water-beauty-calculator',
  slug: 'voda-dlya-kozhi',
  title: 'Калькулятор воды для красоты',
  description: 'Расчёт необходимого количества воды для увлажнённой и здоровой кожи',
  category: 'zdorove',
  subcategory: 'wellness',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '65',
      min: 40,
      max: 150,
      defaultValue: 65
    },
    {
      name: 'activity',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: 'sedentary', label: 'Малоподвижный' },
        { value: 'light', label: 'Лёгкая активность' },
        { value: 'moderate', label: 'Умеренная активность' },
        { value: 'active', label: 'Высокая активность' }
      ],
      defaultValue: 'light'
    },
    {
      name: 'climate',
      label: 'Климат',
      type: 'select',
      options: [
        { value: 'cold', label: 'Холодный' },
        { value: 'moderate', label: 'Умеренный' },
        { value: 'hot', label: 'Жаркий/влажный' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'skinType',
      label: 'Тип кожи',
      type: 'select',
      options: [
        { value: 'dry', label: 'Сухая' },
        { value: 'normal', label: 'Нормальная' },
        { value: 'oily', label: 'Жирная' }
      ],
      defaultValue: 'normal'
    }
  ],
  outputs: [
    { name: 'dailyWater', label: 'Воды в день', type: 'number', unit: 'мл' },
    { name: 'glasses', label: 'Стаканов (250 мл)', type: 'number', unit: 'шт' },
    { name: 'skinHydration', label: 'Уровень увлажнения', type: 'text' },
    { name: 'schedule', label: 'График питья', type: 'text' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight || 65);
    const activity = String(inputs.activity || 'light');
    const climate = String(inputs.climate || 'moderate');
    const skinType = String(inputs.skinType || 'normal');
    
    // Base calculation: 30-35ml per kg
    let water = weight * 33;
    
    // Activity multiplier
    const activityMult: Record<string, number> = {
      sedentary: 1, light: 1.1, moderate: 1.2, active: 1.4
    };
    water *= activityMult[activity];
    
    // Climate adjustment
    const climateAdjust: Record<string, number> = {
      cold: -200, moderate: 0, hot: 500
    };
    water += climateAdjust[climate];
    
    // Skin type bonus for dry skin
    if (skinType === 'dry') {
      water += 300;
    }
    
    const glasses = Math.ceil(water / 250);
    
    // Skin hydration status
    let skinHydration = '';
    if (water >= 2500) {
      skinHydration = '✓ Отличное увлажнение для всех типов кожи';
    } else if (water >= 2000) {
      skinHydration = skinType === 'dry' ? '⚠ Минимум для сухой кожи' : '✓ Хорошее увлажнение';
    } else {
      skinHydration = '⚠ Недостаточно для здоровой кожи';
    }
    
    const schedule = `Утро: ${Math.ceil(glasses * 0.25)} стакана | День: ${Math.ceil(glasses * 0.45)} стакана | Вечер: ${Math.ceil(glasses * 0.25)} стакана (до 20:00)`;
    
    return [
      { value: Math.round(water), label: 'Воды в день', unit: 'мл' },
      { value: glasses, label: 'Стаканов (250 мл)', unit: 'шт' },
      { value: skinHydration, label: 'Уровень увлажнения' },
      { value: schedule, label: 'График питья' }
    ];
  },
  content: {
    howTo: 'Введите ваш вес, уровень активности, климат и тип кожи. Калькулятор рассчитает оптимальное количество воды для красоты и здоровья.',
    about: 'Кожа на 64% состоит из воды. Обезвоженная кожа выглядит тусклой, мелкие морщины становятся заметнее. Внутреннее увлажнение работает лучше любого крема.',
    formula: 'Норма воды = Вес × 33 мл × Коэффициент активности + Поправка на климат + Бонус для сухой кожи',
    faq: [
      { question: 'Сколько воды нужно для сухой кожи?', answer: 'Сухой коже нужно на 300-500 мл больше базовой нормы. Минимум 2.5 литра для поддержания влажности.' },
      { question: 'Чай и кофе считаются?', answer: 'Нет, кофе и чай имеют мочегонный эффект. Чистая вода, травяные чаи, свежие соки — да. Норму лучше покрывать чистой водой.' }
    ],
    sources: [
      { title: 'Healthline - Water and Skin Health', url: 'https://www.healthline.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор оценки факторов старения
export const agingRiskCalculator: Calculator = {
  id: 'aging-risk-calculator',
  slug: 'faktory-star',
  title: 'Калькулятор факторов старения',
  description: 'Оценка факторов, влияющих на преждевременное старение кожи',
  category: 'zdorove',
  subcategory: 'wellness',
  type: 'formula',
  inputs: [
    {
      name: 'sunExposure',
      label: 'Время на солнце (часов в день)',
      type: 'number',
      placeholder: '2',
      min: 0,
      max: 12,
      defaultValue: 2
    },
    {
      name: 'smoking',
      label: 'Курение',
      type: 'select',
      options: [
        { value: 'no', label: 'Не курю' },
        { value: 'former', label: 'Бросил(а)' },
        { value: 'light', label: 'До 5 сигарет в день' },
        { value: 'heavy', label: 'Больше пачки в день' }
      ],
      defaultValue: 'no'
    },
    {
      name: 'sleepHours',
      label: 'Сон (часов)',
      type: 'number',
      placeholder: '7',
      min: 4,
      max: 12,
      defaultValue: 7
    },
    {
      name: 'stressLevel',
      label: 'Уровень стресса',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкий' },
        { value: 'medium', label: 'Средний' },
        { value: 'high', label: 'Высокий' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'dietQuality',
      label: 'Качество питания',
      type: 'select',
      options: [
        { value: 'healthy', label: 'Сбалансированное' },
        { value: 'average', label: 'Среднее' },
        { value: 'poor', label: 'Неправильное (фастфуд, сахар)' }
      ],
      defaultValue: 'average'
    },
    {
      name: 'skincare',
      label: 'Уход за кожей',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Регулярный, качественный' },
        { value: 'basic', label: 'Базовый' },
        { value: 'minimal', label: 'Минимальный' },
        { value: 'none', label: 'Нет систематического ухода' }
      ],
      defaultValue: 'basic'
    }
  ],
  outputs: [
    { name: 'agingRisk', label: 'Индекс старения', type: 'number' },
    { name: 'skinAge', label: 'Биологический возраст кожи', type: 'number', unit: 'лет' },
    { name: 'mainRisk', label: 'Главный риск', type: 'text' },
    { name: 'priorityAction', label: 'Приоритетное действие', type: 'text' },
    { name: 'antioxidants', label: 'Рекомендуемые антиоксиданты', type: 'text' }
  ],
  calculate: (inputs) => {
    const sun = Number(inputs.sunExposure || 2);
    const smoking = String(inputs.smoking || 'no');
    const sleep = Number(inputs.sleepHours || 7);
    const stress = String(inputs.stressLevel || 'medium');
    const diet = String(inputs.dietQuality || 'average');
    const skincare = String(inputs.skincare || 'basic');
    
    // Calculate risk score (higher = more aging)
    let riskScore = 0;
    
    // Sun exposure (UV is #1 cause of premature aging)
    if (sun > 6) riskScore += 40;
    else if (sun > 3) riskScore += 20;
    else if (sun > 1) riskScore += 10;
    
    // Smoking
    const smokingRisk: Record<string, number> = {
      no: 0, former: 5, light: 25, heavy: 50
    };
    riskScore += smokingRisk[smoking];
    
    // Sleep
    if (sleep < 6) riskScore += 20;
    else if (sleep < 7) riskScore += 10;
    
    // Stress
    const stressRisk: Record<string, number> = {
      low: 0, medium: 10, high: 25
    };
    riskScore += stressRisk[stress];
    
    // Diet
    const dietRisk: Record<string, number> = {
      healthy: -10, average: 5, poor: 25
    };
    riskScore += dietRisk[diet];
    
    // Skincare (protective)
    const skincareProtect: Record<string, number> = {
      excellent: -15, basic: -5, minimal: 5, none: 15
    };
    riskScore += skincareProtect[skincare];
    
    // Normalize score (0-100)
    riskScore = Math.max(0, Math.min(100, riskScore));
    
    // Skin age estimate (+/- 5 years from chronological)
    const skinAgeOffset = riskScore > 50 ? 5 : (riskScore > 30 ? 2 : -2);
    
    // Find main risk factor
    let mainRisk = '';
    if (sun > 4) mainRisk = '☀️ УФ-излучение — главный фактор старения';
    else if (smoking !== 'no') mainRisk = '🚬 Курение разрушает коллаген';
    else if (sleep < 6) mainRisk = '😴 Недосыпание нарушает регенерацию';
    else if (stress === 'high') mainRisk = '🧠 Хронический стресс вызывает воспаление';
    else if (diet === 'poor') mainRisk = '🍔 Неправильное питание — недостаток антиоксидантов';
    else mainRisk = '⚠️ Комбинация факторов';
    
    // Priority action
    let priorityAction = '';
    if (sun > 4 && skincare !== 'excellent') {
      priorityAction = 'Используйте SPF 30+ ежедневно, носите шляпу на солнце';
    } else if (smoking !== 'no') {
      priorityAction = 'Бросьте курить — кожа начнёт восстанавливаться через 2-4 недели';
    } else if (sleep < 6) {
      priorityAction = 'Увеличьте сон до 7-8 часов, ложитесь до 23:00';
    } else if (stress === 'high') {
      priorityAction = 'Практикуйте медитацию, массаж — снизьте кортизол';
    } else if (diet === 'poor') {
      priorityAction = 'Добавьте в рацион ягоды, орехи, жирную рыбу, зелёный чай';
    } else {
      priorityAction = 'Усильте уход: ретинол (вечер), витамин C (утро), SPF (обязательно)';
    }
    
    // Recommended antioxidants
    let antioxidants = '';
    if (riskScore > 50) {
      antioxidants = 'Витамин C, E, коэнзим Q10, ресвератрол, альфа-липоевая кислота';
    } else if (riskScore > 30) {
      antioxidants = 'Витамин C, E, зелёный чай';
    } else {
      antioxidants = 'Витамин C (апельсины, киви), витамин E (миндаль, авокадо)';
    }
    
    return [
      { value: Math.round(riskScore), label: 'Индекс старения' },
      { value: 30 + skinAgeOffset, label: 'Биологический возраст кожи', unit: 'лет' },
      { value: mainRisk, label: 'Главный риск' },
      { value: priorityAction, label: 'Приоритетное действие' },
      { value: antioxidants, label: 'Рекомендуемые антиоксиданты' }
    ];
  },
  content: {
    howTo: 'Оцените свои факторы риска: время на солнце, курение, сон, стресс, питание и уход. Калькулятор даст рекомендации по замедлению старения.',
    about: '80% видимых признаков старения кожи — результат внешних факторов (фото- и хроностарение), а не генетики. УФ-излучение отвечает за 80% от фото старения.',
    formula: 'Индекс старения = Сумма факторов риска (солнце, курение, сон, стресс, питание) - Защитные факторы (уход)',
    faq: [
      { question: 'Можно ли замедлить старение кожи?', answer: 'Да! УФ-защита (SPF) — самое эффективное. Добавьте ретинол, витамин C, хороший сон и отказ от курения.' },
      { question: 'С какого возраста начинать антивозрастной уход?', answer: 'Профилактику можно начинать с 25 лет. С 30+ — активные ингредиенты (ретинол, пептиды).' }
    ],
    sources: [
      { title: 'American Academy of Dermatology - Skin Aging', url: 'https://www.aad.org/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор ухода за кожей по типу
export const skinTypeCareCalculator: Calculator = {
  id: 'skin-type-care',
  slug: 'uhod-po-tipu-kozhi',
  title: 'Калькулятор ухода по типу кожи',
  description: 'Подбор уходовых средств и рутины на основе типа кожи и возраста',
  category: 'dlya-doma',
  subcategory: 'beauty',
  type: 'formula',
  inputs: [
    {
      name: 'skinType',
      label: 'Тип кожи',
      type: 'select',
      options: [
        { value: 'dry', label: 'Сухая' },
        { value: 'oily', label: 'Жирная' },
        { value: 'combination', label: 'Комбинированная' },
        { value: 'normal', label: 'Нормальная' },
        { value: 'sensitive', label: 'Чувствительная' }
      ],
      defaultValue: 'combination'
    },
    {
      name: 'age',
      label: 'Возраст',
      type: 'number',
      placeholder: '30',
      min: 15,
      max: 80,
      defaultValue: 30
    },
    {
      name: 'concerns',
      label: 'Основные проблемы',
      type: 'select',
      options: [
        { value: 'acne', label: 'Акне/высыпания' },
        { value: 'wrinkles', label: 'Морщины' },
        { value: 'dullness', label: 'Тусклость' },
        { value: 'redness', label: 'Покраснения/купероз' },
        { value: 'pores', label: 'Расширенные поры' },
        { value: 'darkspots', label: 'Пигментация' }
      ],
      defaultValue: 'dullness'
    }
  ],
  outputs: [
    { name: 'cleanser', label: 'Очищение', type: 'text' },
    { name: 'toner', label: 'Тоник/эссенция', type: 'text' },
    { name: 'serum', label: 'Сыворотка', type: 'text' },
    { name: 'moisturizer', label: 'Увлажнение', type: 'text' },
    { name: 'sunscreen', label: 'Защита от солнца', type: 'text' },
    { name: 'weekly', label: 'Еженедельный уход', type: 'text' },
    { name: 'avoid', label: 'Избегать', type: 'text' }
  ],
  calculate: (inputs) => {
    const skinType = String(inputs.skinType || 'combination');
    const age = Number(inputs.age || 30);
    const concerns = String(inputs.concerns || 'dullness');
    
    // Care recommendations based on skin type
    const care: Record<string, { cleanser: string; toner: string; serum: string; moisturizer: string; sunscreen: string; weekly: string; avoid: string }> = {
      dry: {
        cleanser: 'Масло/бальзам для умывания, молочко. Избегайте пенок и гелей',
        toner: 'Увлажняющие тонеры без спирта с гиалуроновой кислотой',
        serum: 'Гиалуроновая кислота 2%, масло шиповника, пептиды',
        moisturizer: 'Плотный крем с керамидами, скваланом, маслами',
        sunscreen: 'Увлажняющий SPF 30+ с гиалуроновой кислотой',
        weekly: '1-2 раза: нежная энзимная пудра или увлажняющая маска',
        avoid: 'Алкоголь в составах, салициловая кислота высокой концентрации, матовые тональные средства'
      },
      oily: {
        cleanser: 'Гель для умывания с салициловой кислотой (BHA), пенка',
        toner: 'Отшелушивающие тонеры с AHA/BHA, матирующие',
        serum: 'Ниацинамид 10%, цинк, лёгкие увлажняющие сыворотки',
        moisturizer: 'Гелевая текстура, oil-free, с ниацинамидом',
        sunscreen: 'Матирующий SPF 30+, желательно chemical-free или гибридный',
        weekly: '2-3 раза: глиняная маска, отшелушивание (BHA/AHA)',
        avoid: 'Тяжёлые масла (кокосовое, минеральное), спиртовые тонеры, плотные кремы'
      },
      combination: {
        cleanser: 'Нежный гель или пенка без SLS, двойное очищение вечером',
        toner: 'Сбалансированные тонеры, можно разные для T-зоны и щёк',
        serum: 'Ниацинамид, гиалуроновая кислота, лёгкие антиоксиданты',
        moisturizer: 'Лёгкий крем или гель-крем, возможно разные для зон',
        sunscreen: 'Универсальный SPF 30+, не утяжеляющий',
        weekly: '1-2 раза: комбинированные маски (глиняная на T-зону, увлажняющая на щёки)',
        avoid: 'Слишком агрессивные средства для всего лица, тяжёлые масла на T-зону'
      },
      normal: {
        cleanser: 'Мягкие гели, муссы, пенки — любые приятные текстуры',
        toner: 'Увлажняющие или с лёгкими кислотами для поддержания',
        serum: 'Витамин C (утро), ретинол 0.3% (вечер), пептиды',
        moisturizer: 'Крем по сезону: лёгкий летом, плотнее зимой',
        sunscreen: 'SPF 30+ любой текстуры — это основа профилактики',
        weekly: '1 раз: маска по настроению — увлажняющая, питательная, очищающая',
        avoid: 'Ничего особенно — поддерживайте баланс и наслаждайтесь кожей'
      },
      sensitive: {
        cleanser: 'Мицеллярная вода, очищающее молочко без отдушек',
        toner: 'Термальная вода, тонеры с пантенолом, аллантоином',
        serum: 'Центелла азиатская, пантенол, лёгкая гиалуроновая кислота',
        moisturizer: 'Кремы с церамидами, без отдушек и спирта',
        sunscreen: 'Физический SPF 30+ с цинком или диоксидом титана',
        weekly: 'Максимум 1 раз: нежная увлажняющая маска. Избегайте активных кислот',
        avoid: 'Отдушки, спирт, эфирные масла, высокие концентрации кислот, ретинол'
      }
    };
    
    const rec = care[skinType];
    
    // Age adjustments to recommendations
    let ageAdjust = '';
    if (age >= 35) {
      if (concerns === 'wrinkles') {
        ageAdjust = ' (30+) Добавьте: ретинол 0.5% через месяц адаптации, пептидные кремы';
      } else if (concerns === 'darkspots') {
        ageAdjust = ' (30+) Добавьте: альфа-арбутин, транексамовая кислота, профессиональные пилинги';
      }
    }
    
    return [
      { value: rec.cleanser, label: 'Очищение' },
      { value: rec.toner, label: 'Тоник/эссенция' },
      { value: rec.serum + ageAdjust, label: 'Сыворотка' },
      { value: rec.moisturizer, label: 'Увлажнение' },
      { value: rec.sunscreen, label: 'Защита от солнца' },
      { value: rec.weekly, label: 'Еженедельный уход' },
      { value: rec.avoid, label: 'Избегать' }
    ];
  },
  content: {
    howTo: 'Выберите тип кожи, возраст и основные проблемы. Калькулятор составит базовую схему ухода с рекомендациями ингредиентов.',
    about: 'Уход должен соответствовать типу кожи: сухой — направлен на восстановление барьера и увлажнение, жирной — на баланс и очищение пор, чувствительной — на успокоение и минимум раздражителей.',
    formula: 'Уход = Очищение (соответствует типу) + Увлажнение (по потребностям) + Защита (SPF обязательно) + Специальный уход (по проблемам)',
    faq: [
      { question: 'Как определить тип кожи?', answer: 'Умойтесь, подождите 1 час без крема. Если стянуто — сухая, блестит вся — жирная, только T-зона — комбинированная, нормально — нормальная, реагирует на всё — чувствительная.' },
      { question: 'Можно ли менять тип кожи?', answer: 'Тип определяется генетически, но состояние можно улучшить. Сухую — восстанавливать барьер, жирную — регулировать салоотделение, чувствительную — укреплять.' }
    ],
    sources: [
      { title: 'Paula\'s Choice - Skin Care Basics', url: 'https://www.paulaschoice.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор дозировки коллагена
export const collagenCalculator: Calculator = {
  id: 'collagen-calculator',
  slug: 'doza-kollagena',
  title: 'Калькулятор коллагена',
  description: 'Расчёт оптимальной дозировки коллагена для кожи, волос и суставов',
  category: 'zdorove',
  subcategory: 'wellness',
  type: 'formula',
  inputs: [
    {
      name: 'age',
      label: 'Возраст',
      type: 'number',
      placeholder: '35',
      min: 18,
      max: 80,
      defaultValue: 35
    },
    {
      name: 'goal',
      label: 'Цель приёма',
      type: 'select',
      options: [
        { value: 'skin', label: 'Кожа (эластичность, морщины)' },
        { value: 'hair', label: 'Волосы и ногти' },
        { value: 'joints', label: 'Суставы' },
        { value: 'complex', label: 'Комплексный эффект' }
      ],
      defaultValue: 'skin'
    },
    {
      name: 'type',
      label: 'Тип коллагена',
      type: 'select',
      options: [
        { value: 'hydrolyzed', label: 'Гидролизованный (пептиды)' },
        { value: 'marine', label: 'Морской' },
        { value: 'bovine', label: 'Коллаген I и III типа (КРС)' }
      ],
      defaultValue: 'hydrolyzed'
    },
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '65',
      min: 40,
      max: 120,
      defaultValue: 65
    }
  ],
  outputs: [
    { name: 'dailyDose', label: 'Суточная доза', type: 'number', unit: 'г' },
    { name: 'course', label: 'Длительность курса', type: 'text' },
    { name: 'whenToTake', label: 'Когда принимать', type: 'text' },
    { name: 'withWhat', label: 'С чем принимать', type: 'text' },
    { name: 'expectedEffect', label: 'Ожидаемый эффект', type: 'text' },
    { name: 'costPerMonth', label: 'Стоимость курса', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age || 35);
    const goal = String(inputs.goal || 'skin');
    const type = String(inputs.type || 'hydrolyzed');
    const weight = Number(inputs.weight || 65);
    
    // Base dose depends on goal
    let baseDose = 5; // grams
    if (goal === 'skin') baseDose = 5;
    else if (goal === 'hair') baseDose = 5;
    else if (goal === 'joints') baseDose = 10;
    else if (goal === 'complex') baseDose = 7.5;
    
    // Age adjustment
    if (age > 50) baseDose *= 1.2;
    else if (age < 25) baseDose *= 0.8;
    
    // Weight adjustment
    if (weight > 80) baseDose *= 1.1;
    
    // Type efficiency adjustment
    const typeMult: Record<string, number> = {
      hydrolyzed: 1, marine: 1.1, bovine: 0.9
    };
    baseDose /= typeMult[type]; // Marine is more bioavailable, so need slightly less
    
    const dailyDose = Math.round(baseDose * 10) / 10;
    
    const course = '2-3 месяца приёма, затем перерыв 1-2 месяца. Минимум 4-8 недель для видимого эффекта на коже.';
    const whenToTake = 'Утром натощак или за 30 минут до еды. Можно вечером перед сном для восстановления.';
    const withWhat = 'Витамин C (200-500 мг) — обязательно для синтеза коллагена. Также хорошо с гиалуроновой кислотой.';
    
    let expectedEffect = '';
    if (goal === 'skin') {
      expectedEffect = 'Увеличение увлажнённости через 4-6 недель, сглаживание мелких морщин через 8-12 недель';
    } else if (goal === 'hair') {
      expectedEffect = 'Укрепление ногтей через 3-4 недели, блеск и рост волос через 2-3 месяца';
    } else if (goal === 'joints') {
      expectedEffect = 'Уменьшение скованности через 4-6 недель, снижение дискомфорта при движении';
    } else {
      expectedEffect = 'Комплексное улучшение: кожа, волосы, ногти, поддержка суставов';
    }
    
    // Cost estimate (rough)
    const costPerGram = type === 'marine' ? 8 : (type === 'hydrolyzed' ? 5 : 6);
    const costPerMonth = Math.round(dailyDose * 30 * costPerGram);
    
    return [
      { value: dailyDose, label: 'Суточная доза', unit: 'г' },
      { value: course, label: 'Длительность курса' },
      { value: whenToTake, label: 'Когда принимать' },
      { value: withWhat, label: 'С чем принимать' },
      { value: expectedEffect, label: 'Ожидаемый эффект' },
      { value: costPerMonth, label: 'Стоимость курса', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Укажите возраст, цель приёма коллагена, тип и ваш вес. Калькулятор рассчитает оптимальную дозировку и даст рекомендации.',
    about: 'После 25 лет синтез коллагена снижается на 1-1.5% в год. Приём коллагена пептидов стимулирует фибробласты производить собственный коллаген типа I и III.',
    formula: 'Доза = Базовая (5-10 г) × Коэффициент возраста × Коэффициент веса / Биодоступность типа',
    faq: [
      { question: 'Когда появляется эффект от коллагена?', answer: 'На коже — через 4-8 недель, на волосах и ногтях — 2-3 месяца, на суставах — 4-6 недель. Эффект накапливается постепенно.' },
      { question: 'Какой коллаген лучше — морской или КРС?', answer: 'Морской (рыбий) имеет лучшую биодоступность и ближе по структуре к человеческому. Но дороже. Коллаген КРС — хороший бюджетный вариант.' }
    ],
    sources: [
      { title: 'Healthline - Collagen Supplements', url: 'https://www.healthline.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор SPF и времени на солнце
export const spfCalculator: Calculator = {
  id: 'spf-calculator',
  slug: 'spc-zashita',
  title: 'Калькулятор солнцезащиты',
  description: 'Расчёт SPF и безопасного времени пребывания на солнце для вашего типа кожи',
  category: 'zdorove',
  subcategory: 'wellness',
  type: 'formula',
  inputs: [
    {
      name: 'skinType',
      label: 'Фототип кожи',
      type: 'select',
      options: [
        { value: '1', label: 'I — Очень светлая (всегда обгорает)' },
        { value: '2', label: 'II — Светлая (часто обгорает)' },
        { value: '3', label: 'III — Светло-загорающаяся' },
        { value: '4', label: 'IV — Загорающаяся (редко обгорает)' },
        { value: '5', label: 'V — Тёмная (практически не обгорает)' },
        { value: '6', label: 'VI — Чёрная (никогда не обгорает)' }
      ],
      defaultValue: '2'
    },
    {
      name: 'uvIndex',
      label: 'УФ-индекс',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкий (1-2)' },
        { value: 'moderate', label: 'Умеренный (3-5)' },
        { value: 'high', label: 'Высокий (6-7)' },
        { value: 'veryhigh', label: 'Очень высокий (8-10)' },
        { value: 'extreme', label: 'Экстремальный (11+)' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'spfUsed',
      label: 'Используемый SPF',
      type: 'number',
      placeholder: '30',
      min: 1,
      max: 100,
      defaultValue: 30
    },
    {
      name: 'activity',
      label: 'Активность',
      type: 'select',
      options: [
        { value: 'normal', label: 'Обычная (отдых)' },
        { value: 'swimming', label: 'Плавание/купание' },
        { value: 'sports', label: 'Спорт/пот' }
      ],
      defaultValue: 'normal'
    }
  ],
  outputs: [
    { name: 'burnTime', label: 'Время до ожога (без SPF)', type: 'number', unit: 'мин' },
    { name: 'protectedTime', label: 'Безопасное время (с SPF)', type: 'number', unit: 'мин' },
    { name: 'reapplyEvery', label: 'Обновлять SPF каждые', type: 'number', unit: 'мин' },
    { name: 'recommendedSPF', label: 'Рекомендуемый SPF', type: 'number' },
    { name: 'peakHours', label: 'Опасные часы', type: 'text' }
  ],
  calculate: (inputs) => {
    const skinType = Number(inputs.skinType || 2);
    const uvIndex = String(inputs.uvIndex || 'moderate');
    const spfUsed = Number(inputs.spfUsed || 30);
    const activity = String(inputs.activity || 'normal');
    
    // Base burn time in minutes without protection by skin type
    const baseBurnTimes: Record<number, number> = {
      1: 10, 2: 15, 3: 25, 4: 40, 5: 60, 6: 120
    };
    
    // UV index multipliers (higher UV = faster burn)
    const uvMultipliers: Record<string, number> = {
      low: 2, moderate: 1, high: 0.6, veryhigh: 0.4, extreme: 0.25
    };
    
    const baseBurn = baseBurnTimes[skinType];
    const burnTimeWithoutSPF = Math.round(baseBurn * uvMultipliers[uvIndex]);
    
    // Protected time (in theory, but practical limits apply)
    // SPF protection is not linear and has practical limits
    const practicalLimit = 120; // 2 hours max effective protection
    const protectedTime = Math.min(Math.round(burnTimeWithoutSPF * spfUsed), practicalLimit);
    
    // Reapplication frequency depends on activity
    let reapplyEvery = 120;
    if (activity === 'swimming') reapplyEvery = 40;
    else if (activity === 'sports') reapplyEvery = 80;
    else reapplyEvery = 120;
    
    // Recommended SPF based on skin type and UV
    let recommendedSPF = 30;
    if (skinType <= 2 && (uvIndex === 'high' || uvIndex === 'veryhigh' || uvIndex === 'extreme')) {
      recommendedSPF = 50;
    } else if (uvIndex === 'extreme') {
      recommendedSPF = 50;
    } else if (skinType === 1) {
      recommendedSPF = 50;
    }
    
    const peakHours = 'Избегайте солнца с 11:00 до 16:00 — максимальный УФ-индекс';
    
    return [
      { value: burnTimeWithoutSPF, label: 'Время до ожога (без SPF)', unit: 'мин' },
      { value: protectedTime, label: 'Безопасное время (с SPF)', unit: 'мин' },
      { value: reapplyEvery, label: 'Обновлять SPF каждые', unit: 'мин' },
      { value: recommendedSPF, label: 'Рекомендуемый SPF' },
      { value: peakHours, label: 'Опасные часы' }
    ];
  },
  content: {
    howTo: 'Выберите ваш фототип кожи, текущий УФ-индекс, используемый SPF и активность. Калькулятор рассчитает безопасное время на солнце.',
    about: 'УФ-излучение ответственно за 80% внешних признаков старения кожи. Фототип I-II (светлая кожа) обгорает за 10-15 минут на умеренном солнце. SPF 30 блокирует ~97% UVB, SPF 50 — ~98%.',
    formula: 'Время до ожога = Базовое время × Коэффициент УФ-индекса\nЗащищённое время = Время до ожога × SPF (максимум 2 часа практически)',
    faq: [
      { question: 'Нужен ли SPF зимой или в пасмурный день?', answer: 'Да! 80% УФ проходит через облака, снег отражает до 80% УФ. Используйте SPF 15-30 ежедневно на открытых участках.' },
      { question: 'Почему нужно обновлять SPF?', answer: 'SPF разрушается под воздействием света, пота, соприкосновения с одеждой. За 2 часа эффективность падает на 30-50%.' }
    ],
    sources: [
      { title: 'Skin Cancer Foundation - SPF', url: 'https://www.skincancer.org/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор ухода за волосами
export const hairCareCalculator: Calculator = {
  id: 'hair-care-calculator',
  slug: 'uhod-za-volosami',
  title: 'Калькулятор ухода за волосами',
  description: 'Подбор ухода для волос на основе типа, длины и проблем',
  category: 'dlya-doma',
  subcategory: 'beauty',
  type: 'formula',
  inputs: [
    {
      name: 'hairType',
      label: 'Тип волос',
      type: 'select',
      options: [
        { value: 'straight', label: 'Прямые' },
        { value: 'wavy', label: 'Волнистые' },
        { value: 'curly', label: 'Кудрявые' },
        { value: 'coily', label: 'Афро-кудри' }
      ],
      defaultValue: 'straight'
    },
    {
      name: 'hairTexture',
      label: 'Толщина волоса',
      type: 'select',
      options: [
        { value: 'fine', label: 'Тонкие' },
        { value: 'medium', label: 'Средние' },
        { value: 'thick', label: 'Толстые' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'scalpType',
      label: 'Состояние кожи головы',
      type: 'select',
      options: [
        { value: 'oily', label: 'Жирная' },
        { value: 'normal', label: 'Нормальная' },
        { value: 'dry', label: 'Сухая' },
        { value: 'sensitive', label: 'Чувствительная' }
      ],
      defaultValue: 'normal'
    },
    {
      name: 'hairLength',
      label: 'Длина волос',
      type: 'select',
      options: [
        { value: 'short', label: 'Короткие (до плеч)' },
        { value: 'medium', label: 'Средние (плечи-лопатки)' },
        { value: 'long', label: 'Длинные (ниже лопаток)' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'mainConcern',
      label: 'Основная проблема',
      type: 'select',
      options: [
        { value: 'volume', label: 'Недостаток объёма' },
        { value: 'frizz', label: 'Пушистость/пушение' },
        { value: 'dryness', label: 'Сухость/ломкость' },
        { value: 'damage', label: 'Повреждённые/окрашенные' },
        { value: 'dandruff', label: 'Перхоть' }
      ],
      defaultValue: 'dryness'
    }
  ],
  outputs: [
    { name: 'shampoo', label: 'Шампунь', type: 'text' },
    { name: 'conditioner', label: 'Кондиционер/бальзам', type: 'text' },
    { name: 'treatment', label: 'Уходовое средство', type: 'text' },
    { name: 'styling', label: 'Стайлинг', type: 'text' },
    { name: 'washFrequency', label: 'Частота мытья', type: 'text' },
    { name: 'tips', label: 'Советы по уходу', type: 'text' }
  ],
  calculate: (inputs) => {
    const hairType = String(inputs.hairType || 'straight');
    const hairTexture = String(inputs.hairTexture || 'medium');
    const scalpType = String(inputs.scalpType || 'normal');
    const hairLength = String(inputs.hairLength || 'medium');
    const concern = String(inputs.mainConcern || 'dryness');
    
    // Build recommendations based on all factors
    let shampoo = '';
    let conditioner = '';
    let treatment = '';
    let styling = '';
    let washFreq = '';
    let tips = '';
    
    // Shampoo based on scalp and concern
    if (scalpType === 'oily') {
      shampoo = 'Очищающий шампунь с мягкими ПАВ, без силиконов. Можно использовать шампунь-скраб 1 раз в неделю.';
      washFreq = 'Через день или каждый день при сильной жирности';
    } else if (scalpType === 'dry' || scalpType === 'sensitive') {
      shampoo = 'Ультра-мягкий шампунь без SLS/SLES, с пантенолом, аллантоином';
      washFreq = '1-2 раза в неделю, использовать тёплую (не горячую) воду';
    } else {
      shampoo = 'Увлажняющий или балансирующий шампунь по типу волос';
      washFreq = '2-3 раза в неделю или по мере загрязнения';
    }
    
    // Conditioner based on hair type, texture and length
    if (hairType === 'curly' || hairType === 'coily') {
      conditioner = 'Густой кондиционер/маска с маслами (ши, кокос, аргана), метод "сквиш-кондишн"';
      treatment = 'Несмываемый кондиционер (leave-in) + масло для кончиков';
      styling = 'Крем для кудрей (curl cream), гель сильной фиксации (для афро), диффузор';
      tips = 'Метод Curly Girl: без сульфатов и силиконов, плopping, не трите волосы полотенцем';
    } else if (hairType === 'wavy') {
      conditioner = 'Лёгкий кондиционер с несмываемым эффектом, можно только на кончики';
      treatment = 'Лёгкая несмываемая сыворотка или молочко';
      styling = 'Мусс для объёма у корней, текстурирующий спрей, диффузор или естественная сушка';
      tips = 'Сушите волосы, наклонив голову вниз, для объёма у корней';
    } else {
      // straight hair
      if (hairTexture === 'fine') {
        conditioner = 'Лёгкий кондиционер только на кончики, избегайте корней';
        styling = 'Сухой шампунь для объёма, текстурирующая пудра у корней';
        tips = 'Мойте волосы прохладной водой для блеска, не перегружайте корни уходом';
      } else {
        conditioner = 'Увлажняющий кондиционер по длине, избегая жирной кожи головы';
        styling = 'Термозащита при укладке, сыворотка для блеска на кончики';
        tips = 'Регулярная стрижка кончиков каждые 8-10 недель';
      }
    }
    
    // Adjust for concerns
    if (concern === 'dandruff') {
      shampoo = 'Шампунь против перхоти с кетоконазолом, цинком пиритионом или салициловой кислотой';
      treatment = 'Сыворотка для кожи головы с чайным деревом, пептидами';
      tips = tips + ' Не царапайте голову, при сильной перхоти — консультация трихолога.';
    } else if (concern === 'damage') {
      treatment = 'Кератиновое восстановление, маски с протеинами (не чаще 1 раза в неделю!), термозащита обязательна';
      tips = tips + ' Восстановление занимает 3-6 месяцев, регулярно подстригайте повреждённые концы.';
    } else if (concern === 'dryness') {
      treatment = 'Масляные маски (кокос, аргана) на ночь, несмываемые сыворотки с маслами';
    } else if (concern === 'volume') {
      styling = styling + ' + Объёмный мусс у корней, сушка головой вниз, прикорневой лифтинг';
    }
    
    // Length adjustments
    if (hairLength === 'long') {
      tips = tips + ' Длинные волосы старше 2-3 лет — используйте питательные маски на длину.';
    }
    
    return [
      { value: shampoo, label: 'Шампунь' },
      { value: conditioner, label: 'Кондиционер/бальзам' },
      { value: treatment, label: 'Уходовое средство' },
      { value: styling, label: 'Стайлинг' },
      { value: washFreq, label: 'Частота мытья' },
      { value: tips, label: 'Советы по уходу' }
    ];
  },
  content: {
    howTo: 'Укажите тип волос, их толщину, состояние кожи головы, длину и основную проблему. Калькулятор подберёт подходящий уход.',
    about: 'Уход за волосами начинается с кожи головы: здоровая кожа = здоровые волосы. Тип волос (прямые/кудрявые) определяет методы укладки и текстуры средств.',
    formula: 'Уход = Очищение (по типу кожи головы) + Увлажнение (по типу волос) + Специальный уход (по проблемам)',
    faq: [
      { question: 'Как часто мыть волосы?', answer: 'Зависит от типа кожи головы: жирная — каждый день/через день, нормальная — 2-3 раза в неделю, сухая — 1-2 раза в неделю.' },
      { question: 'Помогает ли частая стрижка расти быстрее?', answer: 'Нет, рост происходит из фолликула. Но стрижка предотвращает секущиеся концы и волосы выглядят здоровее.' }
    ],
    sources: [
      { title: 'Naturally Curly - Hair Care', url: 'https://www.naturallycurly.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор маникюра
export const manicureCalculator: Calculator = {
  id: 'manicure-calculator',
  slug: 'stoimost-manikyura',
  title: 'Калькулятор маникюра',
  description: 'Расчёт стоимости, времени и частоты маникюра в зависимости от типа',
  category: 'dlya-doma',
  subcategory: 'beauty',
  type: 'formula',
  inputs: [
    {
      name: 'serviceType',
      label: 'Тип маникюра',
      type: 'select',
      options: [
        { value: 'classic', label: 'Классический (обрезной)' },
        { value: 'hardware', label: 'Аппаратный' },
        { value: 'european', label: 'Европейский (необрезной)' },
        { value: 'spa', label: 'SPA-маникюр' }
      ],
      defaultValue: 'hardware'
    },
    {
      name: 'nailDesign',
      label: 'Покрытие/дизайн',
      type: 'select',
      options: [
        { value: 'none', label: 'Без покрытия' },
        { value: 'regular', label: 'Обычный лак' },
        { value: 'gel', label: 'Гель-лак' },
        { value: 'acrylic', label: 'Наращивание/акрил' },
        { value: 'design', label: 'Гель-лак + дизайн' }
      ],
      defaultValue: 'gel'
    },
    {
      name: 'cityTier',
      label: 'Город',
      type: 'select',
      options: [
        { value: 'small', label: 'Малый город' },
        { value: 'medium', label: 'Город 500к-1млн' },
        { value: 'large', label: 'Крупный город (Мск, СПб)' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'salonLevel',
      label: 'Уровень салона',
      type: 'select',
      options: [
        { value: 'economy', label: 'Эконом' },
        { value: 'standard', label: 'Средний' },
        { value: 'premium', label: 'Премиум' }
      ],
      defaultValue: 'standard'
    }
  ],
  outputs: [
    { name: 'cost', label: 'Стоимость', type: 'number', unit: '₽' },
    { name: 'duration', label: 'Длительность', type: 'text' },
    { name: 'frequency', label: 'Частота коррекции', type: 'text' },
    { name: 'monthlyCost', label: 'Затраты в месяц', type: 'number', unit: '₽' },
    { name: 'annualCost', label: 'Затраты в год', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const serviceType = String(inputs.serviceType || 'hardware');
    const nailDesign = String(inputs.nailDesign || 'gel');
    const cityTier = String(inputs.cityTier || 'medium');
    const salonLevel = String(inputs.salonLevel || 'standard');
    
    // Base prices by city tier
    const basePrices: Record<string, number> = {
      small: 500, medium: 800, large: 1200
    };
    
    // Service type multipliers
    const serviceMult: Record<string, number> = {
      classic: 1, hardware: 1.2, european: 0.9, spa: 1.5
    };
    
    // Design/coating multipliers
    const designMult: Record<string, number> = {
      none: 0, regular: 0.3, gel: 0.8, acrylic: 1.2, design: 1.5
    };
    
    // Salon level multipliers
    const salonMult: Record<string, number> = {
      economy: 0.7, standard: 1, premium: 1.8
    };
    
    // Calculate cost
    let cost = basePrices[cityTier];
    cost *= serviceMult[serviceType];
    cost += basePrices[cityTier] * designMult[nailDesign];
    cost *= salonMult[salonLevel];
    
    // Duration estimate
    let duration = '';
    if (nailDesign === 'none') {
      duration = '30-45 минут';
    } else if (nailDesign === 'regular') {
      duration = '45-60 минут';
    } else if (nailDesign === 'gel' || nailDesign === 'design') {
      duration = '60-90 минут';
    } else if (nailDesign === 'acrylic') {
      duration = '90-120 минут';
    }
    
    // Frequency
    let frequency = '';
    if (nailDesign === 'none' || nailDesign === 'regular') {
      frequency = 'Каждые 5-7 дней (лак обновляется)';
    } else if (nailDesign === 'gel' || nailDesign === 'design') {
      frequency = 'Каждые 2-3 недели (коррекция)';
    } else if (nailDesign === 'acrylic') {
      frequency = 'Каждые 2-3 недели (наращивание)';
    }
    
    // Monthly cost estimate
    let visitsPerMonth = 1;
    if (nailDesign === 'none' || nailDesign === 'regular') {
      visitsPerMonth = 4; // Weekly
    } else {
      visitsPerMonth = 1.5; // Every 2-3 weeks
    }
    
    const monthlyCost = Math.round(cost * visitsPerMonth);
    const annualCost = monthlyCost * 12;
    
    return [
      { value: Math.round(cost), label: 'Стоимость', unit: '₽' },
      { value: duration, label: 'Длительность' },
      { value: frequency, label: 'Частота коррекции' },
      { value: monthlyCost, label: 'Затраты в месяц', unit: '₽' },
      { value: annualCost, label: 'Затраты в год', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Выберите тип маникюра, покрытие, ваш город и уровень салона. Калькулятор оценит стоимость и затраты.',
    about: 'Стоимость маникюра сильно зависит от региона и уровня мастера. Гель-лак держится 2-3 недели, обычный лак — 5-7 дней. Аппаратный маникюр более долговечен и безопасен для кожи.',
    formula: 'Стоимость = Базовая цена города × Тип маникюра + Покрытие × Базовая цена × Уровень салона',
    faq: [
      { question: 'Как часто делать маникюр?', answer: 'С лаком — еженедельно, с гель-лаком — каждые 2-3 недели. Длинные ногти наращиванием требуют коррекции каждые 2-3 недели.' },
      { question: 'Что лучше — обрезной или аппаратный?', answer: 'Аппаратный безопаснее (меньше риска порезов), лучше для тонкой кожи, результат держится дольше. Обрезной быстрее и дешевле.' }
    ],
    sources: [
      { title: 'Professional Beauty - Nail Care', url: 'https://professionalbeauty.co.uk/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор витаминов для красоты
export const beautyVitaminsCalculator: Calculator = {
  id: 'beauty-vitamins-calculator',
  slug: 'vitaminy-krasoty',
  title: 'Калькулятор витаминов для красоты',
  description: 'Подбор витаминов и добавок для кожи, волос и ногтей на основе потребностей',
  category: 'zdorove',
  subcategory: 'wellness',
  type: 'formula',
  inputs: [
    {
      name: 'age',
      label: 'Возраст',
      type: 'number',
      placeholder: '30',
      min: 18,
      max: 80,
      defaultValue: 30
    },
    {
      name: 'mainGoal',
      label: 'Главная цель',
      type: 'select',
      options: [
        { value: 'skin', label: 'Здоровье кожи' },
        { value: 'hair', label: 'Волосы и ногти' },
        { value: 'antiage', label: 'Омоложение' },
        { value: 'complex', label: 'Комплексный эффект' }
      ],
      defaultValue: 'complex'
    },
    {
      name: 'specificConcern',
      label: 'Специфическая проблема',
      type: 'select',
      options: [
        { value: 'acne', label: 'Акне/воспаления' },
        { value: 'dullness', label: 'Тусклость кожи' },
        { value: 'wrinkles', label: 'Морщины' },
        { value: 'hairloss', label: 'Выпадение волос' },
        { value: 'brittle', label: 'Ломкие ногти' },
        { value: 'none', label: 'Нет конкретной' }
      ],
      defaultValue: 'dullness'
    },
    {
      name: 'diet',
      label: 'Особенности питания',
      type: 'select',
      options: [
        { value: 'balanced', label: 'Сбалансированное' },
        { value: 'vegetarian', label: 'Вегетарианское' },
        { value: 'vegan', label: 'Веганское' },
        { value: 'lowdairy', label: 'Мало молочных' }
      ],
      defaultValue: 'balanced'
    }
  ],
  outputs: [
    { name: 'vitaminA', label: 'Витамин A (ретинол)', type: 'text' },
    { name: 'vitaminC', label: 'Витамин C', type: 'text' },
    { name: 'vitaminE', label: 'Витамин E', type: 'text' },
    { name: 'biotin', label: 'Биотин (B7)', type: 'text' },
    { name: 'omega3', label: 'Омега-3', type: 'text' },
    { name: 'zinc', label: 'Цинк', type: 'text' },
    { name: 'collagen', label: 'Коллаген', type: 'text' },
    { name: 'complexRecommendation', label: 'Комплексная рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age || 30);
    const goal = String(inputs.mainGoal || 'complex');
    const concern = String(inputs.specificConcern || 'dullness');
    const diet = String(inputs.diet || 'balanced');
    
    // Base recommendations
    let vitaminA = '700-900 мкг (каротиноиды) — морковь, тыква, шпинат';
    let vitaminC = '75-90 мг — цитрусовые, киви, болгарский перец';
    let vitaminE = '15 мг — орехи, семена, авокадо, растительные масла';
    let biotin = '30-50 мкг — яйца, орехи, семена';
    let omega3 = '1-2 г EPA+DHA — жирная рыба 2 раза в неделю или добавки';
    let zinc = '8-11 мг — мясо, семечки, бобовые';
    let collagen = '5-10 г пептидов коллагена ежедневно';
    
    // Age adjustments
    if (age > 40) {
      vitaminC = '100-200 мг (повышенная доза для антиоксидантной защиты)';
      vitaminE = '15-20 мг — сильнее антиоксидантная поддержка';
      collagen = '10 г коллагена (с 40 лет синтез снижается)';
    }
    
    // Goal-specific adjustments
    if (goal === 'skin' || goal === 'antiage') {
      vitaminC = '200 мг + местно (сыворотка 10-15%)';
      vitaminE = '20 мг — в тандеме с витамином C';
      vitaminA = 'Ретинол в уходе (вечером), бета-каротин в питании';
    }
    
    if (goal === 'hair' || goal === 'complex') {
      biotin = '50-100 мкг — для волос и ногтей';
      zinc = '15-25 мг (при выпадении волос)';
      omega3 = '2-3 г — для блеска волос и здоровья кожи';
    }
    
    // Specific concern adjustments
    if (concern === 'acne') {
      zinc = '25-30 мг (цинк снижает воспаление и себум)';
      vitaminA = 'Ретиноиды — золотой стандарт лечения акне';
      omega3 = '2-3 г — противовоспалительный эффект';
    } else if (concern === 'wrinkles') {
      collagen = '10 г + гиалуроновая кислота 100-200 мг';
      vitaminC = '200 мг — обязательно для синтеза коллагена';
    } else if (concern === 'hairloss') {
      biotin = '100 мкг';
      zinc = '15-25 мг';
      omega3 = '2-3 г';
      collagen = '10 г — аминокислоты для волос';
    } else if (concern === 'brittle') {
      biotin = '100 мкг';
      zinc = '15 мг';
    }
    
    // Diet adjustments
    if (diet === 'vegan') {
      omega3 = '2-3 г от льняного/альгинового масла (растительная форма)';
      biotin = '50-100 мкг (яйца исключены)';
      zinc = '15-20 мг из бобовых, семечек, орехов';
    } else if (diet === 'vegetarian') {
      omega3 = '2 г или добавки (рыба исключена)';
    }
    
    let complexRec = '';
    if (goal === 'complex' && age < 35) {
      complexRec = 'Базовый комплекс: мультивитамин + Омега-3 + Коллаген 5г';
    } else if (goal === 'complex' && age >= 35) {
      complexRec = 'Антивозрастной комплекс: мультивитамин + Омега-3 + Коллаген 10г + Витамин C 200мг + Коэнзим Q10';
    } else if (goal === 'skin') {
      complexRec = 'Для кожи: Витамины A,C,E + Цинк + Омега-3 + Коллаген';
    } else if (goal === 'hair') {
      complexRec = 'Для волос: Биотин + Цинк + Железо + Омега-3 + Коллаген';
    } else if (goal === 'antiage') {
      complexRec = 'Антивозрастной: Витамин C,E + Ресвератрол + Коллаген + Гиалуроновая кислота + Коэнзим Q10';
    }
    
    return [
      { value: vitaminA, label: 'Витамин A (ретинол)' },
      { value: vitaminC, label: 'Витамин C' },
      { value: vitaminE, label: 'Витамин E' },
      { value: biotin, label: 'Биотин (B7)' },
      { value: omega3, label: 'Омега-3' },
      { value: zinc, label: 'Цинк' },
      { value: collagen, label: 'Коллаген' },
      { value: complexRec, label: 'Комплексная рекомендация' }
    ];
  },
  content: {
    howTo: 'Укажите возраст, цель приёма витаминов, специфическую проблему и особенности питания. Калькулятор подберёт рекомендуемые добавки.',
    about: 'Красота изнутри требует правильного питания. Ключевые нутриенты для кожи: витамин C (коллаген), витамин E (антиоксидант), цинк (заживление), Омега-3 (барьер).',
    formula: 'Подбор = Базовые потребности + Поправка на возраст + Целевые добавки (по проблемам) + Корректировки (по диете)',
    faq: [
      { question: 'Когда появляется эффект от витаминов?', answer: 'На коже — 4-8 недель, на волосах — 2-3 месяца (время роста), на ногтях — 3-4 месяца.' },
      { question: 'Можно ли передозировать витамины?', answer: 'Жирорастворимые (A, E) накапливаются — не превышайте дозы. Водорастворимые (C, B) выводятся, но большие дозы могут нагружать почки.' }
    ],
    sources: [
      { title: 'Office of Dietary Supplements - NIH', url: 'https://ods.od.nih.gov/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const beautyCareCalculators: Calculator[] = [
  sleepBeautyCalculator,
  waterIntakeBeautyCalculator,
  agingRiskCalculator,
  skinTypeCareCalculator,
  collagenCalculator,
  spfCalculator,
  hairCareCalculator,
  manicureCalculator,
  beautyVitaminsCalculator
];
