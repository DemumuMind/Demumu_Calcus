import { Calculator } from '../types';

// 1. Калькулятор одежды по погоде (Weather clothing calculator)
export const weatherClothingCalculator: Calculator = {
  id: 'weather-clothing-calculator',
  slug: 'odezhda-po-pogode',
  title: 'Подбор одежды по погоде',
  description: 'Рекомендации по слоям одежды в зависимости от температуры, ветра и активности',
  category: 'povsednevnoe',
  subcategory: 'everyday-odezhda',
  type: 'formula',
  inputs: [
    {
      name: 'temperature',
      label: 'Температура (°C)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15,
      min: -40,
      max: 50
    },
    {
      name: 'windSpeed',
      label: 'Скорость ветра (км/ч)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 100
    },
    {
      name: 'activityLevel',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкий (прогулка, ожидание)' },
        { value: 'medium', label: 'Средний (ходьба, лёгкая работа)' },
        { value: 'high', label: 'Высокий (спорт, бег, тяжёлая работа)' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'precipitation',
      label: 'Осадки',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет' },
        { value: 'rain', label: 'Дождь' },
        { value: 'snow', label: 'Снег' }
      ],
      defaultValue: 'none'
    }
  ],
  outputs: [
    { name: 'feelsLike', label: 'Ощущаемая температура', type: 'text' },
    { name: 'baseLayer', label: 'Базовый слой', type: 'text' },
    { name: 'midLayer', label: 'Средний слой', type: 'text' },
    { name: 'outerLayer', label: 'Верхний слой', type: 'text' },
    { name: 'accessories', label: 'Аксессуары', type: 'text' },
    { name: 'recommendations', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
    const temperature = Number(inputs.temperature);
    const windSpeed = Number(inputs.windSpeed);
    const activityLevel = String(inputs.activityLevel);
    const precipitation = String(inputs.precipitation);

    // Calculate wind chill (feels like temperature)
    // Simplified formula: feels like = temp - (wind * 0.7) for cold weather
    let feelsLike = temperature;
    if (temperature <= 10 && windSpeed > 5) {
      feelsLike = temperature - (windSpeed * 0.7);
    } else if (temperature > 25 && windSpeed > 10) {
      feelsLike = temperature - (windSpeed * 0.2); // Wind cools in heat too
    }

    // Adjust for activity (more activity = less clothing needed)
    const activityAdjustment: Record<string, number> = {
      'low': -2,
      'medium': 0,
      'high': 5
    };
    const adjustedTemp = feelsLike + activityAdjustment[activityLevel];

    // Determine clothing by temperature ranges
    let baseLayer = '';
    let midLayer = '';
    let outerLayer = '';
    let accessories = '';
    let recommendations = '';

    if (adjustedTemp >= 25) {
      baseLayer = 'Лёгкая дышащая футболка или майка из хлопка/синтетики';
      midLayer = 'Не требуется';
      outerLayer = 'Не требуется (возьмите лёгкую рубашку на всякий случай)';
      accessories = 'Кепка/панама от солнца, солнцезащитные очки';
      recommendations = 'Пейте больше воды. Носите светлую одежду — она отражает солнце.';
    } else if (adjustedTemp >= 15) {
      baseLayer = 'Футболка с коротким или длинным рукавом';
      midLayer = 'Лёгкий кардиган или толстовка на всякий случай';
      outerLayer = 'Лёгкая ветровка при ветре > 15 км/ч';
      accessories = 'При необходимости — лёгкий шарф';
      recommendations = 'Универсальная погода — слои можно снять при нагреве.';
    } else if (adjustedTemp >= 5) {
      baseLayer = 'Термобельё или длинный рукав';
      midLayer = 'Свитер, худи или флисовая кофта';
      outerLayer = 'Куртка или пальто средней плотности';
      accessories = 'Шапка или повязка, лёгкие перчатки';
      recommendations = 'Погода для слоёв. В помещении можно снять верхний слой.';
    } else if (adjustedTemp >= -10) {
      baseLayer = 'Термобельё (верх и низ) или тёплое бельё';
      midLayer = 'Тёплый свитер или флисовая кофта';
      outerLayer = 'Зимняя куртка с утеплителем';
      accessories = 'Шапка, шарф, перчатки, тёплые носки';
      recommendations = 'Не оставляйте открытыми участки кожи — потери тепла значительны.';
    } else {
      baseLayer = 'Термобельё (верх и низ), тёплая термофутболка';
      midLayer = 'Флисовая кофта + тёплый свитер или жилет';
      outerLayer = 'Пуховик или парка с мембраной';
      accessories = 'Утеплённая шапка, шарф-труба, варежки, тёплые носки';
      recommendations = 'Экстремальный холод. Минимизируйте время на улице, проверяйте пальцы и уши.';
    }

    // Add precipitation recommendations
    if (precipitation === 'rain') {
      outerLayer = 'Водонепроницаемая куртка или дождевик поверх одежды';
      accessories += ', зонт или капюшон';
      recommendations += ' Дождливая погода — возьмите сменную обувь или непромокаемые ботинки.';
    } else if (precipitation === 'snow') {
      outerLayer = 'Зимняя водонепроницаемая куртка';
      accessories += ', защита для обуви от слякоти';
      recommendations += ' Снежная погода — обувь на толстой подошве с протектором.';
    }

    return [
      { value: `${Math.round(feelsLike)}°C`, label: 'Ощущается как' },
      { value: baseLayer, label: 'Базовый слой (впритык к телу)' },
      { value: midLayer, label: 'Средний слой (утепление)' },
      { value: outerLayer, label: 'Верхний слой (защита)' },
      { value: accessories, label: 'Аксессуары' },
      { value: recommendations, label: 'Советы' }
    ];
  },
  content: {
    howTo: 'Введите температуру, скорость ветра, выберите уровень активности и наличие осадков. Калькулятор подберёт оптимальные слои одежды.',
    about: 'Принцип многослойности позволяет адаптироваться к меняющимся условиям. Ветер усиливает ощущение холода, активность согревает — это учитывается в расчёте.',
    formula: 'Ощущаемая температура = Температура - (Ветер × 0.7) при Т ≤ 10°C; Корректировка по активности: низкая -2°, высокая +5°',
    faq: [
      {
        question: 'Что такое принцип трёх слоёв?',
        answer: 'Базовый слой — отводит влагу (термобельё). Средний — удерживает тепло (флис, шерсть). Верхний — защищает от ветра и осадков (мембрана).'
      },
      {
        question: 'Почему нельзя просто надеть толстую куртку?',
        answer: 'Один толстый слой не позволяет регулировать температуру. При нагреве вы вспотеете, потом замёрзнете. Слои можно снимать и надевать по мере необходимости.'
      },
      {
        question: 'Какая одежда лучше для активности?',
        answer: 'Синтетика или шерсть — они отводят влагу и сохраняют тепло даже при поте. Избегайте хлопка — он намокает и быстро остывает.'
      }
    ],
    sources: [
      { title: 'Layering for cold weather — REI', url: 'https://www.rei.com/learn/expert-advice/layering-basics.html' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 2. Калькулятор корма для питомцев (Pet food calculator)
export const petFoodCalculator: Calculator = {
  id: 'pet-food-calculator',
  slug: 'korm-dlya-pitomca',
  title: 'Калькулятор корма для питомцев',
  description: 'Расчёт суточной нормы корма для собак и кошек по весу, возрасту и активности',
  category: 'povsednevnoe',
  subcategory: 'everyday-zhivotnye',
  type: 'formula',
  inputs: [
    {
      name: 'petType',
      label: 'Тип питомца',
      type: 'select',
      options: [
        { value: 'dog', label: 'Собака' },
        { value: 'cat', label: 'Кошка' }
      ],
      defaultValue: 'dog'
    },
    {
      name: 'weight',
      label: 'Вес питомца (кг)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0.5,
      max: 100,
      step: 0.1
    },
    {
      name: 'ageGroup',
      label: 'Возрастная группа',
      type: 'select',
      options: [
        { value: 'puppy', label: 'Щенок/Котёнок (до 1 года)' },
        { value: 'adult', label: 'Взрослый (1-7 лет)' },
        { value: 'senior', label: 'Пожилой (7+ лет)' }
      ],
      defaultValue: 'adult'
    },
    {
      name: 'activityLevel',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкий (домашний, мало гуляет)' },
        { value: 'moderate', label: 'Умеренный (прогулки 1-2 раза в день)' },
        { value: 'high', label: 'Высокий (активный, тренируется)' },
        { value: 'very_high', label: 'Очень высокий (рабочий, спортивный)' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'foodType',
      label: 'Тип корма',
      type: 'select',
      options: [
        { value: 'dry', label: 'Сухой корм' },
        { value: 'wet', label: 'Влажный корм (консервы)' },
        { value: 'natural', label: 'Натуральное питание' },
        { value: 'mixed', label: 'Смешанное (сухой + влажный)' }
      ],
      defaultValue: 'dry'
    }
  ],
  outputs: [
    { name: 'dailyCalories', label: 'Суточная норма калорий', type: 'number', unit: 'ккал' },
    { name: 'dryFoodAmount', label: 'Сухой корм', type: 'number', unit: 'г/день' },
    { name: 'wetFoodAmount', label: 'Влажный корм', type: 'number', unit: 'г/день' },
    { name: 'mealsPerDay', label: 'Приёмов пищи', type: 'text' },
    { name: 'monthlyCost', label: 'Примерный месячный расход', type: 'number', unit: '₽' },
    { name: 'notes', label: 'Примечания', type: 'text' }
  ],
  calculate: (inputs) => {
    const petType = String(inputs.petType);
    const weight = Number(inputs.weight);
    const ageGroup = String(inputs.ageGroup);
    const activityLevel = String(inputs.activityLevel);
    const foodType = String(inputs.foodType);

    // Base RER (Resting Energy Requirement) = 70 × (weight in kg)^0.75
    const rer = 70 * Math.pow(weight, 0.75);

    // Multipliers by age and activity
    const multipliers: Record<string, Record<string, number>> = {
      'dog': {
        'puppy_low': 2.0,
        'puppy_moderate': 2.5,
        'puppy_high': 3.0,
        'adult_low': 1.2,
        'adult_moderate': 1.6,
        'adult_high': 2.0,
        'adult_very_high': 3.0,
        'senior_low': 1.0,
        'senior_moderate': 1.3,
        'senior_high': 1.6
      },
      'cat': {
        'puppy_low': 2.0,
        'puppy_moderate': 2.5,
        'puppy_high': 3.0,
        'adult_low': 0.9,
        'adult_moderate': 1.2,
        'adult_high': 1.4,
        'adult_very_high': 1.6,
        'senior_low': 0.8,
        'senior_moderate': 1.0,
        'senior_high': 1.2
      }
    };

    const key = `${ageGroup}_${activityLevel}`;
    const multiplier = multipliers[petType]?.[key] || 1.4;
    const dailyCalories = Math.round(rer * multiplier);

    // Convert to food amounts
    // Dry food: ~350-400 kcal per 100g (high quality)
    // Wet food: ~80-120 kcal per 100g
    const dryFoodAmount = Math.round((dailyCalories / 3.8) * 10) / 10; // ~3.8 kcal/g average
    const wetFoodAmount = Math.round((dailyCalories / 1.0) * 10) / 10; // ~1 kcal/g average

    // Meals per day based on age
    const mealsPerDay: Record<string, string> = {
      'puppy': '3-4 раза в день (маленькими порциями)',
      'adult': '2 раза в день',
      'senior': '2 раза в день (можно 3 маленькими)'
    };

    // Monthly cost estimation (rough estimates in RUB)
    const costPerKg: Record<string, number> = {
      'dry': 400,    // ~400₽ per kg for decent quality
      'wet': 150,    // ~150₽ per can/pouch
      'natural': 500, // ~500₽ per kg of fresh meat/ingredients
      'mixed': 300
    };

    let monthlyCost = 0;
    if (foodType === 'dry') {
      monthlyCost = (dryFoodAmount / 1000) * costPerKg.dry * 30;
    } else if (foodType === 'wet') {
      // Assuming 400g cans or pouches
      const cansPerDay = wetFoodAmount / 400;
      monthlyCost = cansPerDay * costPerKg.wet * 30;
    } else if (foodType === 'natural') {
      // Natural diet: ~2-3% of body weight per day in fresh food
      const naturalAmount = weight * 0.025 * 1000; // grams per day
      monthlyCost = (naturalAmount / 1000) * costPerKg.natural * 30;
    } else {
      // Mixed: half dry, half wet
      monthlyCost = ((dryFoodAmount / 2 / 1000) * costPerKg.dry + (wetFoodAmount / 2 / 400) * costPerKg.wet) * 30;
    }

    // Notes
    let notes = '';
    if (ageGroup === 'puppy') {
      notes = 'Щенкам и котятам требуется больше калорий для роста. Корм должен быть специально для молодых животных — с другим соотношением кальция и фосфора.';
    } else if (ageGroup === 'senior') {
      notes = 'Пожилым животным часто требуется меньше калорий, но корм лучшего качества. Следите за весом — лишний вес усугубляет проблемы с суставами.';
    }
    if (activityLevel === 'low') {
      notes += ' При низкой активности высок риск ожирения — контролируйте вес и уменьшайте порцию при наборе.';
    }

    return [
      { value: dailyCalories, label: 'Калорий в день', unit: 'ккал' },
      { value: dryFoodAmount, label: 'Сухого корма в день', unit: 'г' },
      { value: wetFoodAmount, label: 'Влажного корма в день', unit: 'г' },
      { value: mealsPerDay[ageGroup], label: 'Режим питания' },
      { value: Math.round(monthlyCost), label: 'Примерно в месяц', unit: '₽' },
      { value: notes, label: 'Важно' }
    ];
  },
  content: {
    howTo: 'Выберите тип питомца, введите вес, выберите возрастную группу, уровень активности и тип корма. Калькулятор рассчитает суточную норму.',
    about: 'Потребности животных в питании зависят от многих факторов: веса, возраста, активности, состояния здоровья. Этот калькулятор даёт базовые ориентиры.',
    formula: 'RER = 70 × вес^0.75; MER (метаболизм) = RER × коэффициент активности и возраста; Корм = MER / калорийность корма',
    faq: [
      {
        question: 'Как понять, что питомец переедет или недоедает?',
        answer: 'Оценивайте по весу: рёбра должны прощупываться без усилий, но не быть видны. Талия должна быть заметна с боков. При сомнениях — проконсультируйтесь с ветеринаром.'
      },
      {
        question: 'Сухой или влажный корм — что лучше?',
        answer: 'Влажный корм ближе к натуральному питанию, содержит больше влаги (важно для почек). Сухой удобен и очищает зубы. Лучше всего — смешанный подход или корм премиум-класса.'
      },
      {
        question: 'Можно ли кормить питомца "со стола"?',
        answer: 'Не рекомендуется — человеческая еда слишком солёная, жирная, часто содержит вредные для животных ингредиенты (лук, чеснок, шоколад, виноград).'
      }
    ],
    sources: [
      { title: 'Nutrition for dogs — AKC', url: 'https://www.akc.org/expert-advice/nutrition/' },
      { title: 'Cat nutrition — Cornell Feline Health Center', url: 'https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 3. Калькулятор бюджета на подарки (Gift budget calculator)
export const giftBudgetCalculator: Calculator = {
  id: 'gift-budget-calculator',
  slug: 'byudzhet-na-podarki',
  title: 'Калькулятор бюджета на подарки',
  description: 'Расчёт оптимальной суммы на подарок в зависимости от случая, близости отношений и дохода',
  category: 'povsednevnoe',
  subcategory: 'everyday-dengi',
  type: 'formula',
  inputs: [
    {
      name: 'occasion',
      label: 'Случай',
      type: 'select',
      options: [
        { value: 'birthday', label: 'День рождения' },
        { value: 'wedding', label: 'Свадьба' },
        { value: 'newyear', label: 'Новый год' },
        { value: 'anniversary', label: 'Годовщина' },
        { value: 'housewarming', label: 'Новоселье' },
        { value: 'babyshower', label: 'Рождение ребёнка' },
        { value: 'graduation', label: 'Выпускной' },
        { value: 'valentine', label: 'День святого Валентина' }
      ],
      defaultValue: 'birthday'
    },
    {
      name: 'relationship',
      label: 'Близость отношений',
      type: 'select',
      options: [
        { value: 'close_family', label: 'Близкие родственники (родители, дети, супруг)' },
        { value: 'family', label: 'Родственники (братья, сёстры, дяди, тёти)' },
        { value: 'best_friend', label: 'Лучший друг/подруга' },
        { value: 'friend', label: 'Друг/знакомый' },
        { value: 'colleague', label: 'Коллега' },
        { value: 'acquaintance', label: 'Приятель/знакомый' }
      ],
      defaultValue: 'friend'
    },
    {
      name: 'monthlyIncome',
      label: 'Ваш месячный доход (₽)',
      type: 'number',
      placeholder: '80000',
      defaultValue: 80000,
      min: 10000,
      max: 1000000
    },
    {
      name: 'recipientAge',
      label: 'Возраст получателя',
      type: 'select',
      options: [
        { value: 'child', label: 'Ребёнок (до 14)' },
        { value: 'teen', label: 'Подросток (14-18)' },
        { value: 'adult', label: 'Взрослый (19-60)' },
        { value: 'senior', label: 'Пожилой (60+)' }
      ],
      defaultValue: 'adult'
    }
  ],
  outputs: [
    { name: 'minBudget', label: 'Минимальная сумма', type: 'number', unit: '₽' },
    { name: 'recommendedBudget', label: 'Рекомендуемая сумма', type: 'number', unit: '₽' },
    { name: 'maxBudget', label: 'Максимальная сумма', type: 'number', unit: '₽' },
    { name: 'percentOfIncome', label: 'Доля от дохода', type: 'number', unit: '%' },
    { name: 'giftIdeas', label: 'Идеи подарков', type: 'text' },
    { name: 'etiquette', label: 'Этикет', type: 'text' }
  ],
  calculate: (inputs) => {
    const occasion = String(inputs.occasion);
    const relationship = String(inputs.relationship);
    const monthlyIncome = Number(inputs.monthlyIncome);
    const recipientAge = String(inputs.recipientAge);

    // Base amounts by occasion (in RUB)
    const occasionBases: Record<string, { min: number; rec: number; max: number }> = {
      'birthday': { min: 500, rec: 2000, max: 10000 },
      'wedding': { min: 3000, rec: 10000, max: 50000 },
      'newyear': { min: 500, rec: 1500, max: 5000 },
      'anniversary': { min: 2000, rec: 5000, max: 20000 },
      'housewarming': { min: 1000, rec: 3000, max: 15000 },
      'babyshower': { min: 1000, rec: 3000, max: 10000 },
      'graduation': { min: 1000, rec: 3000, max: 8000 },
      'valentine': { min: 1000, rec: 3000, max: 10000 }
    };

    const base = occasionBases[occasion];

    // Relationship multipliers
    const relationshipMultipliers: Record<string, number> = {
      'close_family': 2.5,
      'family': 1.5,
      'best_friend': 1.8,
      'friend': 1.0,
      'colleague': 0.7,
      'acquaintance': 0.5
    };

    const multiplier = relationshipMultipliers[relationship] || 1.0;

    // Calculate budgets
    let minBudget = Math.round(base.min * multiplier);
    let recBudget = Math.round(base.rec * multiplier);
    let maxBudget = Math.round(base.max * multiplier);

    // Cap at 15% of monthly income for non-wedding occasions
    const maxPercentOfIncome = occasion === 'wedding' ? 0.25 : 0.15;
    const incomeCap = monthlyIncome * maxPercentOfIncome;

    if (maxBudget > incomeCap) {
      maxBudget = Math.round(incomeCap);
      recBudget = Math.round(maxBudget * 0.5);
      minBudget = Math.round(maxBudget * 0.2);
    }

    const percentOfIncome = ((recBudget / monthlyIncome) * 100).toFixed(1);

    // Gift ideas by occasion and age
    const giftIdeas: Record<string, Record<string, string>> = {
      'birthday': {
        'child': 'Игрушки, книги, наборы для творчества, конструкторы',
        'teen': 'Гаджеты, наушники, косметика, подарочные карты, книги',
        'adult': 'Подарочные сертификаты, алкоголь, книги, техника, впечатления',
        'senior': 'Тёплые вещи, чаи/кофе, фотоальбомы, удобные мелочи для дома'
      },
      'wedding': {
        'adult': 'Деньги в конверте (традиция), бытовая техника, подарки из реестра'
      },
      'newyear': {
        'child': 'Сладости, игрушки, новогодние наборы',
        'teen': 'Косметика, аксессуары, подарочные карты',
        'adult': 'Сладости, алкоголь, новогодние украшения, подарочные наборы',
        'senior': 'Продуктовые наборы, чаи, тёплые носки, мёд'
      },
      'housewarming': {
        'adult': 'Бытовая техника, текстиль, посуда, растения, алкоголь'
      },
      'babyshower': {
        'adult': 'Одежда, игрушки, подгузники, средства гигиены, деньги'
      }
    };

    const ideas = giftIdeas[occasion]?.[recipientAge] || 'Универсальный подарочный сертификат, цветы, книги, сладости';

    // Etiquette tips
    const etiquetteTips: Record<string, string> = {
      'wedding': 'На свадьбу принято дарить деньги в конверте — сумма должна покрыть стоимость вашего ужина (минимум) и поздравить пару.',
      'birthday': 'Не дарите слишком личные вещи (одежду, парфюм) без уверенности в предпочтениях. Подарочный сертификат — универсальный выход.',
      'newyear': 'Если обмениваетесь подарками с коллегами — заранее договоритесь о сумме.',
      'housewarming': 'Не дарите острые предметы (ножи) — по приметам это символ разрыва. Если дарите — попросите символическую монету взамен.',
      'babyshower': 'Уточните у родителей, что уже есть. Практичные подарки (подгузники, одежда на вырост) всегда ценятся.'
    };

    return [
      { value: minBudget, label: 'Минимум', unit: '₽' },
      { value: recBudget, label: 'Рекомендуемо', unit: '₽' },
      { value: maxBudget, label: 'Максимум', unit: '₽' },
      { value: percentOfIncome, label: 'От вашего дохода', unit: '%' },
      { value: ideas, label: 'Что подарить' },
      { value: etiquetteTips[occasion] || 'Главное — внимание, а не цена. Красиво упакуйте, добавьте открытку с тёплыми словами.', label: 'Этикет' }
    ];
  },
  content: {
    howTo: 'Выберите случай, близость отношений, укажите ваш доход и возраст получателя. Калькулятор предложит диапазон сумм и идеи подарков.',
    about: 'Сумма подарка зависит от культурных норм, ваших возможностей и близости отношений. Важно не переборщить (неловко) и не скупиться (обидно).',
    formula: 'Базовая сумма по случаю × Коэффициент отношений; Ограничение: не более 15-25% месячного дохода',
    faq: [
      {
        question: 'Сколько дарить на свадьбу?',
        answer: 'Традиция: сумма должна покрыть ваш ужин (в среднем 3000-5000₽ на персону в ресторане) + поздравление. Для близких — 10000-50000₽, для дальних знакомых — от 3000₽.'
      },
      {
        question: 'Можно ли дарить деньги?',
        answer: 'На свадьбу и новоселье — да, это норма. На день рождения — приемлемо для молодёжи и пожилых. Для коллег и друзей лучше подарок или сертификат.'
      },
      {
        question: 'Что если я не могу позволить дорогой подарок?',
        answer: 'Сделайте подарок своими руками, подарите время (помощь, прогулку), или объединитесь с другими гостями для коллективного подарка.'
      }
    ],
    sources: [
      { title: 'Gift giving etiquette', url: 'https://www.etiquettescholar.com/gift_giving_etiquette.html' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 4. Калькулятор бюджета отпуска (Vacation budget calculator)
export const vacationBudgetCalculator: Calculator = {
  id: 'vacation-budget-calculator',
  slug: 'byudzhet-otpiska',
  title: 'Калькулятор бюджета отпуска',
  description: 'Расчёт затрат на путешествие: транспорт, проживание, питание, активности по стране и городу',
  category: 'povsednevnoe',
  subcategory: 'everyday-puteshestviya',
  type: 'formula',
  inputs: [
    {
      name: 'destination',
      label: 'Направление',
      type: 'select',
      options: [
        { value: 'russia_moscow', label: 'Россия — Москва' },
        { value: 'russia_spb', label: 'Россия — Санкт-Петербург' },
        { value: 'russia_sochi', label: 'Россия — Сочи' },
        { value: 'turkey', label: 'Турция (Анталья, Стамбул)' },
        { value: 'egypt', label: 'Египет (Шарм, Хургада)' },
        { value: 'thailand', label: 'Таиланд (Пхукет, Бангкок)' },
        { value: 'uae', label: 'ОАЭ (Дубай, Абу-Даби)' },
        { value: 'europe_west', label: 'Западная Европа (Париж, Рим)' },
        { value: 'europe_east', label: 'Восточная Европа (Прага, Будапешт)' },
        { value: 'usa', label: 'США (Нью-Йорк, Лос-Анджелес)' },
        { value: 'asia', label: 'Азия (Япония, Китай, Корея)' },
        { value: 'custom', label: 'Другой (ввести вручную)' }
      ],
      defaultValue: 'turkey'
    },
    {
      name: 'duration',
      label: 'Длительность (дней)',
      type: 'number',
      placeholder: '7',
      defaultValue: 7,
      min: 1,
      max: 30
    },
    {
      name: 'travelers',
      label: 'Количество путешественников',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 1,
      max: 10
    },
    {
      name: 'comfortLevel',
      label: 'Уровень комфорта',
      type: 'select',
      options: [
        { value: 'budget', label: 'Эконом (хостелы, общий транспорт, уличная еда)' },
        { value: 'standard', label: 'Стандарт (3★ отели, такси, кафе)' },
        { value: 'comfort', label: 'Комфорт (4★ отели, аренда авто, рестораны)' },
        { value: 'luxury', label: 'Люкс (5★ отели, трансферы, люкс-рестораны)' }
      ],
      defaultValue: 'standard'
    },
    {
      name: 'transportType',
      label: 'Тип транспорта',
      type: 'select',
      options: [
        { value: 'flight', label: 'Авиаперелёт' },
        { value: 'train', label: 'Поезд' },
        { value: 'bus', label: 'Автобус' },
        { value: 'car', label: 'Свой автомобиль' }
      ],
      defaultValue: 'flight'
    }
  ],
  outputs: [
    { name: 'transportCost', label: 'Транспорт', type: 'number', unit: '₽' },
    { name: 'accommodationCost', label: 'Проживание', type: 'number', unit: '₽' },
    { name: 'foodCost', label: 'Питание', type: 'number', unit: '₽' },
    { name: 'activitiesCost', label: 'Активности', type: 'number', unit: '₽' },
    { name: 'miscCost', label: 'Прочее', type: 'number', unit: '₽' },
    { name: 'totalCost', label: 'ИТОГО', type: 'number', unit: '₽' },
    { name: 'perPerson', label: 'На человека', type: 'number', unit: '₽' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs) => {
    const destination = String(inputs.destination);
    const duration = Number(inputs.duration);
    const travelers = Number(inputs.travelers);
    const comfortLevel = String(inputs.comfortLevel);
    const transportType = String(inputs.transportType);

    // Cost multipliers by comfort level
    const comfortMultipliers: Record<string, number> = {
      'budget': 0.5,
      'standard': 1.0,
      'comfort': 1.8,
      'luxury': 3.5
    };
    const multiplier = comfortMultipliers[comfortLevel];

    // Base daily costs by destination (per person in RUB)
    const destinationCosts: Record<string, { transport: number; hotel: number; food: number; activities: number }> = {
      'russia_moscow': { transport: 5000, hotel: 4000, food: 2000, activities: 1500 },
      'russia_spb': { transport: 5000, hotel: 3500, food: 1800, activities: 1500 },
      'russia_sochi': { transport: 8000, hotel: 5000, food: 2000, activities: 2000 },
      'turkey': { transport: 40000, hotel: 3000, food: 1500, activities: 1000 },
      'egypt': { transport: 35000, hotel: 2500, food: 1200, activities: 800 },
      'thailand': { transport: 45000, hotel: 2000, food: 1000, activities: 1200 },
      'uae': { transport: 40000, hotel: 6000, food: 3000, activities: 2500 },
      'europe_west': { transport: 50000, hotel: 8000, food: 4000, activities: 3000 },
      'europe_east': { transport: 40000, hotel: 4000, food: 2000, activities: 1500 },
      'usa': { transport: 60000, hotel: 10000, food: 5000, activities: 4000 },
      'asia': { transport: 50000, hotel: 5000, food: 2500, activities: 2000 },
      'custom': { transport: 30000, hotel: 4000, food: 2000, activities: 1500 }
    };

    const costs = destinationCosts[destination];

    // Adjust transport for type (approximate adjustments)
    let transportMultiplier = 1.0;
    if (transportType === 'train') transportMultiplier = 0.7;
    if (transportType === 'bus') transportMultiplier = 0.4;
    if (transportType === 'car') transportMultiplier = 0.6; // fuel costs

    // Calculate costs
    const transportCost = Math.round(costs.transport * transportMultiplier * travelers * multiplier);
    const accommodationCost = Math.round(costs.hotel * duration * travelers * multiplier);
    const foodCost = Math.round(costs.food * duration * travelers * multiplier);
    const activitiesCost = Math.round(costs.activities * duration * travelers * multiplier);
    const miscCost = Math.round((transportCost + accommodationCost + foodCost + activitiesCost) * 0.15); // 15% for unexpected

    const totalCost = transportCost + accommodationCost + foodCost + activitiesCost + miscCost;
    const perPerson = Math.round(totalCost / travelers);

    // Tips by destination
    const tips: Record<string, string> = {
      'russia_moscow': 'Москва — дорогой город. Отели в центре дороже, рассмотрите варианты на окраинах с метро.',
      'russia_spb': 'Петербург: многие музеи бесплатные по определённым дням. Белые ночи — сезон подорожания.',
      'russia_sochi': 'Сочи: цены сильно зависят от сезона (лето/зима). Бронируйте заранее для экономии.',
      'turkey': 'Турция: all inclusive выгоден при комфортном отдыхе. Шопинг на базарах — торгуйтесь!',
      'egypt': 'Египет: берите all inclusive, питание и напитки включены. Доллары приветствуются.',
      'thailand': 'Таиланд: дёшево и вкусно уличная еда. Хостелы от 300₽/ночь, отели от 1000₽/ночь.',
      'uae': 'ОАЭ: дорогая страна, но качество высокое. Шоппинг — основная статья расходов.',
      'europe_west': 'Западная Европа: еда в супермаркетах дешевле ресторанов в 2-3 раза.',
      'europe_east': 'Восточная Европа: цены ниже, качество отличное. Прага, Будапешт — бюджетные жемчужины.',
      'usa': 'США: не забудьте про чаевые (15-20%) и налоги. Общественный транспорт развит плохо, авто необходимо.',
      'asia': 'Азия: разные страны — разные цены. Япония дорогая, Китай и Вьетнам — дешёвые.',
      'custom': 'Для любого направления: закладывайте запас 15-20% на непредвиденные расходы.'
    };

    return [
      { value: transportCost, label: 'Транспорт (туда-обратно)', unit: '₽' },
      { value: accommodationCost, label: 'Проживание', unit: '₽' },
      { value: foodCost, label: 'Питание', unit: '₽' },
      { value: activitiesCost, label: 'Экскурсии и активности', unit: '₽' },
      { value: miscCost, label: 'Прочее и запас (15%)', unit: '₽' },
      { value: totalCost, label: 'ОБЩАЯ СУММА', unit: '₽' },
      { value: perPerson, label: 'На одного человека', unit: '₽' },
      { value: tips[destination], label: 'Советы по направлению' }
    ];
  },
  content: {
    howTo: 'Выберите направление, укажите длительность и количество путешественников, выберите уровень комфорта и тип транспорта.',
    about: 'Бюджет путешествия состоит из: транспорт (туда-обратно), проживание (×ночей), питание (×дней), активности (×дней), плюс запас 15% на непредвиденное.',
    formula: 'Общий бюджет = (Транспорт + Отель×Ночи + Еда×Дни + Активности×Дни) × Коэффициент комфорта + 15% запас',
    faq: [
      {
        question: 'Как сэкономить на отпуске?',
        answer: 'Бронируйте заранее (за 2-3 месяца), ешьте в супермаркетах/кафе вдали от туристических мест, пользуйтесь общественным транспортом, выбирайте shoulder season (май, сентябрь).'
      },
      {
        question: 'Что такое shoulder season?',
        answer: 'Пограничные месяцы между высоким и низким сезоном: май и сентябрь в Европе. Погода хорошая, цены ниже, туристов меньше.'
      },
      {
        question: 'Стоит ли брать all inclusive?',
        answer: 'Выгодно при активном отдыхе (много едите и пьёте) или дорогом направлении (ОАЭ, Мальдивы). При экономном варианте — не всегда оправдано.'
      }
    ],
    sources: [
      { title: 'Travel budget planning — Nomadic Matt', url: 'https://www.nomadicmatt.com/travel-blogs/how-to-create-a-travel-budget/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 5. Калькулятор стоимости мойки машины (Car wash cost calculator)
export const carWashCalculator: Calculator = {
  id: 'car-wash-calculator',
  slug: 'stoimost-moyki',
  title: 'Калькулятор стоимости мойки авто',
  description: 'Сравнение стоимости разных типов мойки: самообслуживание, автоматическая, ручная',
  category: 'povsednevnoe',
  subcategory: 'everyday-avto',
  type: 'formula',
  inputs: [
    {
      name: 'washType',
      label: 'Тип мойки',
      type: 'select',
      options: [
        { value: 'self_service', label: 'Самообслуживание (самостоятельная)' },
        { value: 'automatic', label: 'Автоматическая (портальная)' },
        { value: 'touchless', label: 'Бесконтактная автоматическая' },
        { value: 'hand_wash', label: 'Ручная мойка' },
        { value: 'detailing', label: 'Детейлинг (глубокая очистка)' }
      ],
      defaultValue: 'self_service'
    },
    {
      name: 'carSize',
      label: 'Размер авто',
      type: 'select',
      options: [
        { value: 'small', label: 'Малолитражка (A, B класс)' },
        { value: 'medium', label: 'Средний (C класс, кроссовер)' },
        { value: 'large', label: 'Крупный (D, E класс, SUV)' },
        { value: 'van', label: 'Минивэн/внедорожник' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'washFrequency',
      label: 'Частота мойки',
      type: 'select',
      options: [
        { value: 'weekly', label: 'Раз в неделю' },
        { value: 'biweekly', label: 'Раз в 2 недели' },
        { value: 'monthly', label: 'Раз в месяц' },
        { value: 'as_needed', label: 'По необходимости (~раз в месяц)' }
      ],
      defaultValue: 'biweekly'
    },
    {
      name: 'addServices',
      label: 'Дополнительные услуги',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет' },
        { value: 'wax', label: 'Восковая обработка' },
        { value: 'interior', label: 'Уборка салона' },
        { value: 'full', label: 'Полный комплекс (воск + салон)' }
      ],
      defaultValue: 'none'
    }
  ],
  outputs: [
    { name: 'singleWashCost', label: 'Стоимость одной мойки', type: 'number', unit: '₽' },
    { name: 'monthlyCost', label: 'В месяц', type: 'number', unit: '₽' },
    { name: 'yearlyCost', label: 'В год', type: 'number', unit: '₽' },
    { name: 'timeSpent', label: 'Время на мойку', type: 'text' },
    { name: 'quality', label: 'Качество', type: 'text' },
    { name: 'recommendations', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
    const washType = String(inputs.washType);
    const carSize = String(inputs.carSize);
    const washFrequency = String(inputs.washFrequency);
    const addServices = String(inputs.addServices);

    // Base costs by wash type and car size (in RUB)
    const baseCosts: Record<string, Record<string, number>> = {
      'self_service': { small: 250, medium: 300, large: 350, van: 400 },
      'automatic': { small: 300, medium: 400, large: 500, van: 600 },
      'touchless': { small: 350, medium: 450, large: 550, van: 650 },
      'hand_wash': { small: 500, medium: 700, large: 900, van: 1100 },
      'detailing': { small: 2000, medium: 3000, large: 4000, van: 5000 }
    };

    let singleWashCost = baseCosts[washType][carSize] || 400;

    // Add services costs
    const addServiceCosts: Record<string, number> = {
      'none': 0,
      'wax': 300,
      'interior': 500,
      'full': 700
    };
    singleWashCost += addServiceCosts[addServices];

    // Calculate frequency
    const washesPerMonth: Record<string, number> = {
      'weekly': 4,
      'biweekly': 2,
      'monthly': 1,
      'as_needed': 1
    };
    const monthlyWashes = washesPerMonth[washFrequency];
    const monthlyCost = singleWashCost * monthlyWashes;
    const yearlyCost = monthlyCost * 12;

    // Time spent
    const timeSpent: Record<string, string> = {
      'self_service': '15-30 минут (ваше время)',
      'automatic': '5-10 минут',
      'touchless': '5-10 минут',
      'hand_wash': '30-60 минут',
      'detailing': '2-6 часов'
    };

    // Quality assessment
    const quality: Record<string, string> = {
      'self_service': 'Зависит от ваших усилий. Можно добиться отличного результата.',
      'automatic': 'Среднее. Щётки могут оставлять царапины на ЛКП.',
      'touchless': 'Среднее. Безопасно для ЛКП, но может плохо отмывать сильные загрязнения.',
      'hand_wash': 'Хорошее. Ручная работа, внимание к деталям.',
      'detailing': 'Отличное. Глубокая очистка, защитные покрытия, идеальный результат.'
    };

    // Recommendations
    let recommendations = '';
    if (washType === 'self_service') {
      recommendations = 'Самый экономичный вариант. Используйте два ведра (мойка и полоскание), микрофибру, специальный автошампунь.';
    } else if (washType === 'automatic') {
      recommendations = 'Удобно, но рискует царапать ЛКП щётками. Не рекомендуется для дорогих автомобилей с тонким лаком.';
    } else if (washType === 'touchless') {
      recommendations = 'Безопасный для лакокрасочного покрытия метод, но иногда требует доработки вручную.';
    } else if (washType === 'hand_wash') {
      recommendations = 'Оптимальное соотношение цена/качество. Мойщики обращают внимание на детали.';
    } else {
      recommendations = 'Делайте детейлинг 1-2 раза в год для поддержания состояния кузова и салона.';
    }

    return [
      { value: singleWashCost, label: 'За одну мойку', unit: '₽' },
      { value: monthlyCost, label: 'В месяц', unit: '₽' },
      { value: yearlyCost, label: 'В год', unit: '₽' },
      { value: timeSpent[washType], label: 'Время' },
      { value: quality[washType], label: 'Качество мойки' },
      { value: recommendations, label: 'Совет' }
    ];
  },
  content: {
    howTo: 'Выберите тип мойки, размер автомобиля, частоту и дополнительные услуги. Калькулятор сравнит затраты и даст рекомендации.',
    about: 'Стоимость мойки зависит от метода: самообслуживание дёшево но требует времени, автоматическая быстрая но может царапать, ручная качественная но дороже.',
    formula: 'Годовые затраты = Стоимость мойки × Частота × 12 месяцев + Дополнительные услуги',
    faq: [
      {
        question: 'Как часто нужно мыть машину?',
        answer: 'Летом — раз в 1-2 недели (убирать пыль, насекомых, птичий помёт). Зимой — чаще, после каждой грязевой поездки (соль разъедает кузов).'
      },
      {
        question: 'Чем опасны автоматические мойки?',
        answer: 'Щётки со временем накапливают песок и грязь, которая царапает лакокрасочное покрытие. Для дорогих авто лучше бесконтактная или ручная мойка.'
      },
      {
        question: 'Что такое двухведёрная мойка?',
        answer: 'Метод самообслуживания: одно ведро с мыльной водой, второе с чистой для полоскания губки. Предотвращает перенос грязи на кузов.'
      }
    ],
    sources: [
      { title: 'Car wash types explained — Car and Driver', url: 'https://www.caranddriver.com/features/a27169661/car-wash-types/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 6. Калькулятор химчистки (Dry cleaning calculator)
export const dryCleaningCalculator: Calculator = {
  id: 'dry-cleaning-calculator',
  slug: 'himchistka-rashody',
  title: 'Калькулятор расходов на химчистку',
  description: 'Расчёт затрат на химчистку одежды по видам вещей и частоте использования',
  category: 'povsednevnoe',
  subcategory: 'everyday-odezhda',
  type: 'formula',
  inputs: [
    {
      name: 'items',
      label: 'Вещи в стирке (введите количество каждого типа в формате JSON)',
      type: 'text',
      placeholder: '[{"type":"suit","count":2},{"type":"dress","count":1},{"type":"coat","count":1}]',
      defaultValue: '[{"type":"suit","count":1},{"type":"shirt","count":3},{"type":"dress","count":1}]'
    },
    {
      name: 'frequency',
      label: 'Как часто сдаёте',
      type: 'select',
      options: [
        { value: 'weekly', label: 'Каждую неделю' },
        { value: 'biweekly', label: 'Раз в 2 недели' },
        { value: 'monthly', label: 'Раз в месяц' },
        { value: 'seasonal', label: 'Сезонно (раз в 3 месяца)' }
      ],
      defaultValue: 'monthly'
    },
    {
      name: 'qualityLevel',
      label: 'Уровень химчистки',
      type: 'select',
      options: [
        { value: 'budget', label: 'Эконом (от 150₽)' },
        { value: 'standard', label: 'Стандарт (от 250₽)' },
        { value: 'premium', label: 'Премиум (от 400₽)' }
      ],
      defaultValue: 'standard'
    }
  ],
  outputs: [
    { name: 'singleVisitCost', label: 'Стоимость одного похода', type: 'number', unit: '₽' },
    { name: 'monthlyCost', label: 'В месяц', type: 'number', unit: '₽' },
    { name: 'yearlyCost', label: 'В год', type: 'number', unit: '₽' },
    { name: 'breakdown', label: 'Разбивка по вещам', type: 'text' },
    { name: 'alternatives', label: 'Альтернативы', type: 'text' }
  ],
  calculate: (inputs) => {
    const itemsStr = String(inputs.items);
    const frequency = String(inputs.frequency);
    const qualityLevel = String(inputs.qualityLevel);

    // Parse items
    let items: { type: string; count: number }[] = [];
    try {
      items = JSON.parse(itemsStr);
    } catch {
      return [
        { value: 0, label: 'Ошибка', unit: '₽' },
        { value: 0, label: 'Ошибка', unit: '₽' },
        { value: 0, label: 'Ошибка', unit: '₽' },
        { value: 'Некорректный JSON', label: 'Ошибка' },
        { value: '', label: 'Ошибка' }
      ];
    }

    // Base prices by item type (RUB)
    const basePrices: Record<string, number> = {
      'suit': 600,
      'jacket': 450,
      'coat': 800,
      'dress': 500,
      'shirt': 250,
      'blouse': 350,
      'pants': 350,
      'skirt': 350,
      'sweater': 400,
      'down_jacket': 700,
      'fur_coat': 2000,
      'wedding_dress': 3000,
      'curtains': 400,
      'bedding': 350
    };

    // Quality multipliers
    const qualityMultipliers: Record<string, number> = {
      'budget': 0.7,
      'standard': 1.0,
      'premium': 1.5
    };
    const multiplier = qualityMultipliers[qualityLevel];

    // Calculate single visit cost
    let singleVisitCost = 0;
    const breakdown: string[] = [];

    items.forEach(item => {
      const price = (basePrices[item.type] || 300) * multiplier;
      const itemTotal = Math.round(price * item.count);
      singleVisitCost += itemTotal;
      const itemName: Record<string, string> = {
        'suit': 'Костюм',
        'jacket': 'Пиджак',
        'coat': 'Пальто',
        'dress': 'Платье',
        'shirt': 'Рубашка',
        'blouse': 'Блузка',
        'pants': 'Брюки',
        'skirt': 'Юбка',
        'sweater': 'Свитер',
        'down_jacket': 'Пуховик',
        'fur_coat': 'Шуба',
        'wedding_dress': 'Свадебное платье',
        'curtains': 'Шторы',
        'bedding': 'Постельное бельё'
      };
      breakdown.push(`${itemName[item.type] || item.type}: ${item.count} шт × ${Math.round(price)}₽ = ${itemTotal}₽`);
    });

    // Calculate frequency
    const visitsPerMonth: Record<string, number> = {
      'weekly': 4,
      'biweekly': 2,
      'monthly': 1,
      'seasonal': 0.33
    };
    const monthlyVisits = visitsPerMonth[frequency];
    const monthlyCost = Math.round(singleVisitCost * monthlyVisits);
    const yearlyCost = monthlyCost * 12;

    // Alternatives
    const alternatives = 'Для экономии: пятновыводители для мелких загрязнений, стирайте некоторые вещи в деликатном режиме (рубашки, блузы), используйте пароочиститель для освежения.';

    return [
      { value: Math.round(singleVisitCost), label: 'За один приём', unit: '₽' },
      { value: monthlyCost, label: 'В месяц', unit: '₽' },
      { value: yearlyCost, label: 'В год', unit: '₽' },
      { value: breakdown.join('; '), label: 'Детализация' },
      { value: alternatives, label: 'Как сэкономить' }
    ];
  },
  content: {
    howTo: 'Введите список вещей в формате JSON (тип и количество), выберите частоту и уровень химчистки. Калькулятор рассчитает расходы.',
    about: 'Химчистка необходима для деликатных тканей (шерсть, шёлк, костюмные ткани) и крупных вещей (пальто, шубы). Стоимость зависит от материала и сложности обработки.',
    formula: 'Общая стоимость = Σ (Цена вещи × Количество) × Коэффициент качества; Годовые = × Частота × 12',
    faq: [
      {
        question: 'Что можно почистить в химчистке?',
        answer: 'Костюмы, платья, пальто, шубы, пуховики, шторы, постельное бельё. Некоторые вещи (рубашки, блузы) можно стирать дома в деликатном режиме.'
      },
      {
        question: 'Как часто нужно чистить пальто/шубу?',
        answer: 'Пальто — 1-2 раза в сезон. Шубу из меха — 1 раз в год (весной). Пуховик — по мере загрязнения, 2-4 раза за зиму.'
      },
      {
        question: 'Чем отличается премиум химчистка?',
        answer: 'Используются более дорогие и безопасные растворители, индивидуальный подход к каждой вещи, ручная работа, услуги по вывозу/доставке.'
      }
    ],
    sources: [
      { title: 'Dry cleaning guide — Consumer Reports', url: 'https://www.consumerreports.org/cro/dry-cleaning.htm' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 7. Калькулятор времени уборки (Home cleaning time calculator)
export const homeCleaningTimeCalculator: Calculator = {
  id: 'home-cleaning-time-calculator',
  slug: 'vremya-uborki',
  title: 'Калькулятор времени уборки',
  description: 'Оценка времени на уборку дома в зависимости от количества комнат, размера и задач',
  category: 'povsednevnoe',
  subcategory: 'everyday-dom',
  type: 'formula',
  inputs: [
    {
      name: 'rooms',
      label: 'Количество комнат',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 1,
      max: 20
    },
    {
      name: 'area',
      label: 'Площадь (м²)',
      type: 'number',
      placeholder: '60',
      defaultValue: 60,
      min: 10,
      max: 500
    },
    {
      name: 'cleaningType',
      label: 'Тип уборки',
      type: 'select',
      options: [
        { value: 'light', label: 'Лёгкая (поддерживающая)' },
        { value: 'regular', label: 'Обычная (еженедельная)' },
        { value: 'deep', label: 'Генеральная (комплексная)' },
        { value: 'moveout', label: 'После ремонта/переезда' }
      ],
      defaultValue: 'regular'
    },
    {
      name: 'tasks',
      label: 'Дополнительные задачи',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет' },
        { value: 'windows', label: 'Мытьё окон' },
        { value: 'fridge', label: 'Чистка холодильника' },
        { value: 'oven', label: 'Чистка духовки' },
        { value: 'all', label: 'Всё дополнительное' }
      ],
      defaultValue: 'none'
    },
    {
      name: 'cleaners',
      label: 'Количество убирающихся',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 1,
      max: 5
    }
  ],
  outputs: [
    { name: 'totalTime', label: 'Общее время', type: 'text' },
    { name: 'timePerPerson', label: 'Время на человека', type: 'text' },
    { name: 'roomBreakdown', label: 'Разбивка по комнатам', type: 'text' },
    { name: 'extraTasksTime', label: 'Дополнительные задачи', type: 'text' },
    { name: 'tips', label: 'Советы по ускорению', type: 'text' }
  ],
  calculate: (inputs) => {
    const rooms = Number(inputs.rooms);
    const area = Number(inputs.area);
    const cleaningType = String(inputs.cleaningType);
    const tasks = String(inputs.tasks);
    const cleaners = Number(inputs.cleaners);

    // Base time per square meter by cleaning type (in minutes)
    const timePerSqm: Record<string, number> = {
      'light': 0.5,
      'regular': 1.0,
      'deep': 2.5,
      'moveout': 3.5
    };

    let baseTime = area * timePerSqm[cleaningType];

    // Add time for rooms (kitchen and bathroom take more time)
    const roomTime = rooms * 10; // 10 min per room additional
    baseTime += roomTime;

    // Extra tasks time
    const extraTimes: Record<string, number> = {
      'none': 0,
      'windows': 30,
      'fridge': 20,
      'oven': 25,
      'all': 75
    };
    const extraTime = extraTimes[tasks];
    baseTime += extraTime;

    // Calculate times
    const timePerPerson = Math.round(baseTime / cleaners);

    // Format time
    const hours = Math.floor(baseTime / 60);
    const minutes = Math.round(baseTime % 60);
    const totalTimeStr = hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;

    const ppHours = Math.floor(timePerPerson / 60);
    const ppMinutes = Math.round(timePerPerson % 60);
    const ppTimeStr = ppHours > 0 ? `${ppHours} ч ${ppMinutes} мин` : `${ppMinutes} мин`;

    // Room breakdown
    const timePerRoom = Math.round(baseTime / rooms);
    const roomBreakdown = `В среднем ${timePerRoom} мин на комнату (кухня и ванная занимают больше времени)`;

    // Extra tasks breakdown
    const extraTasksStr: Record<string, string> = {
      'none': 'Нет дополнительных задач',
      'windows': 'Мытьё окон — ~30 мин',
      'fridge': 'Чистка холодильника — ~20 мин',
      'oven': 'Чистка духовки — ~25 мин',
      'all': 'Окна (30 мин) + Холодильник (20 мин) + Духовка (25 мин) = 75 мин'
    };

    // Tips
    const tips = 'Советы: убирайтесь сверху вниз, двигайтесь по часовой стрелке в комнате, используйте микрофибру, собирайте всё в корзину перед уборкой.';

    return [
      { value: totalTimeStr, label: 'Всего времени (всем вместе)' },
      { value: ppTimeStr, label: `На каждого (${cleaners} чел)` },
      { value: roomBreakdown, label: 'По комнатам' },
      { value: extraTasksStr[tasks], label: 'Дополнительно' },
      { value: tips, label: 'Ускорение' }
    ];
  },
  content: {
    howTo: 'Укажите количество комнат, площадь, тип уборки, дополнительные задачи и количество убирающихся. Калькулятор оценит время.',
    about: 'Время уборки зависит от площади, типа уборки и количества людей. Лёгкая уборка — 0.5 мин/м², генеральная — 2.5 мин/м², после ремонта — 3.5 мин/м².',
    formula: 'Время = Площадь × Норма времени + Комнаты × 10 мин + Дополнительные задачи; Итог = Время / Количество людей',
    faq: [
      {
        question: 'Сколько времени занимает уборка квартиры?',
        answer: '1-комнатная (30-40 м²) — 1-1.5 часа обычной уборки. 2-комнатная (50-60 м²) — 2-2.5 часа. 3-комнатная — 3-4 часа. Генеральная уборка в 2-3 раза дольше.'
      },
      {
        question: 'Как ускорить уборку?',
        answer: '1) Убирайтесь системно — сверху вниз, слева направо. 2) Используйте правильные инструменты (микрофибра, швабра с отжимом). 3) Убирайтесь вместе — делите зоны.'
      },
      {
        question: 'Что входит в лёгкую, обычную и генеральную уборку?',
        answer: 'Лёгкая — протирка пыли, влажная уборка полов. Обычная — +чистка санузла, кухни, вынос мусора. Генеральная — +мытьё окон, стен, дезинфекция, чистка труднодоступных мест.'
      }
    ],
    sources: [
      { title: 'Cleaning time estimates — Molly Maid', url: 'https://www.mollymaid.com/practical-tips/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 8. Калькулятор расходов на стирку (Laundry calculator)
export const laundryCalculator: Calculator = {
  id: 'laundry-calculator',
  slug: 'rashody-na-stirku',
  title: 'Калькулятор расходов на стирку',
  description: 'Расчёт месячных затрат на стирку: порошок, вода, электричество',
  category: 'povsednevnoe',
  subcategory: 'everyday-dom',
  type: 'formula',
  inputs: [
    {
      name: 'loadsPerWeek',
      label: 'Загрузок в неделю',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 1,
      max: 14
    },
    {
      name: 'loadSize',
      label: 'Размер загрузки',
      type: 'select',
      options: [
        { value: 'small', label: 'Маленькая (до 3 кг)' },
        { value: 'medium', label: 'Средняя (4-5 кг)' },
        { value: 'large', label: 'Большая (6-8 кг)' },
        { value: 'xlarge', label: 'Очень большая (9+ кг)' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'detergentCost',
      label: 'Цена порошка/геля (₽ за кг)',
      type: 'number',
      placeholder: '250',
      defaultValue: 250,
      min: 50,
      max: 1000
    },
    {
      name: 'machineType',
      label: 'Тип машины',
      type: 'select',
      options: [
        { value: 'modern', label: 'Современная (класс А+, инвертор)' },
        { value: 'standard', label: 'Обычная (класс А/В)' },
        { value: 'old', label: 'Старая (класс C и ниже)' }
      ],
      defaultValue: 'standard'
    },
    {
      name: 'waterCost',
      label: 'Стоимость воды (₽/м³)',
      type: 'number',
      placeholder: '45',
      defaultValue: 45,
      min: 10,
      max: 200
    },
    {
      name: 'electricityCost',
      label: 'Стоимость электроэнергии (₽/кВт⋅ч)',
      type: 'number',
      placeholder: '5.5',
      defaultValue: 5.5,
      min: 1,
      max: 20,
      step: 0.1
    }
  ],
  outputs: [
    { name: 'detergentCost', label: 'Затраты на порошок', type: 'number', unit: '₽/мес' },
    { name: 'waterCost', label: 'Затраты на воду', type: 'number', unit: '₽/мес' },
    { name: 'electricityCost', label: 'Затраты на электричество', type: 'number', unit: '₽/мес' },
    { name: 'totalMonthly', label: 'ИТОГО в месяц', type: 'number', unit: '₽' },
    { name: 'totalYearly', label: 'ИТОГО в год', type: 'number', unit: '₽' },
    { name: 'costPerLoad', label: 'Стоимость одной стирки', type: 'number', unit: '₽' },
    { name: 'savingsTips', label: 'Как сэкономить', type: 'text' }
  ],
  calculate: (inputs) => {
    const loadsPerWeek = Number(inputs.loadsPerWeek);
    const loadSize = String(inputs.loadSize);
    const detergentCostPerKg = Number(inputs.detergentCost);
    const machineType = String(inputs.machineType);
    const waterCostPerM3 = Number(inputs.waterCost);
    const electricityCostPerKwh = Number(inputs.electricityCost);

    // Water consumption per load (liters) based on load size and machine type
    const waterConsumption: Record<string, Record<string, number>> = {
      'small': { modern: 30, standard: 40, old: 50 },
      'medium': { modern: 40, standard: 55, old: 70 },
      'large': { modern: 50, standard: 70, old: 90 },
      'xlarge': { modern: 60, standard: 85, old: 110 }
    };
    const waterLiters = waterConsumption[loadSize][machineType];
    const waterM3 = waterLiters / 1000;

    // Electricity consumption per load (kWh)
    const electricityConsumption: Record<string, Record<string, number>> = {
      'small': { modern: 0.4, standard: 0.6, old: 0.9 },
      'medium': { modern: 0.6, standard: 0.9, old: 1.3 },
      'large': { modern: 0.8, standard: 1.2, old: 1.7 },
      'xlarge': { modern: 1.0, standard: 1.5, old: 2.1 }
    };
    const kwhPerLoad = electricityConsumption[loadSize][machineType];

    // Detergent consumption per load (grams)
    const detergentGrams: Record<string, number> = {
      'small': 50,
      'medium': 70,
      'large': 90,
      'xlarge': 120
    };
    const detergentPerLoad = detergentGrams[loadSize];
    const detergentCostPerLoad = (detergentPerLoad / 1000) * detergentCostPerKg;

    // Calculate costs per load
    const waterCostPerLoad = waterM3 * waterCostPerM3;
    const electricityCostPerLoad = kwhPerLoad * electricityCostPerKwh;
    const costPerLoad = detergentCostPerLoad + waterCostPerLoad + electricityCostPerLoad;

    // Monthly and yearly
    const monthlyLoads = loadsPerWeek * 4.33; // average weeks per month
    const detergentMonthly = detergentCostPerLoad * monthlyLoads;
    const waterMonthly = waterCostPerLoad * monthlyLoads;
    const electricityMonthly = electricityCostPerLoad * monthlyLoads;
    const totalMonthly = detergentMonthly + waterMonthly + electricityMonthly;
    const totalYearly = totalMonthly * 12;

    return [
      { value: Math.round(detergentMonthly), label: 'Порошок/гель', unit: '₽/мес' },
      { value: Math.round(waterMonthly), label: 'Вода', unit: '₽/мес' },
      { value: Math.round(electricityMonthly), label: 'Электричество', unit: '₽/мес' },
      { value: Math.round(totalMonthly), label: 'Всего в месяц', unit: '₽' },
      { value: Math.round(totalYearly), label: 'Всего в год', unit: '₽' },
      { value: Math.round(costPerLoad * 100) / 100, label: 'За одну стирку', unit: '₽' },
      { value: '1) Собирайте полную загрузку. 2) Используйте режим 30°C вместо 60°C. 3) Современная машина экономит 30-40% ресурсов.', label: 'Советы' }
    ];
  },
  content: {
    howTo: 'Укажите количество стирок в неделю, размер загрузки, цену порошка, тип машины и тарифы на воду/электричество.',
    about: 'Стоимость стирки складывается из: порошка (~30-40%), воды (~20%), электроэнергии (~40%). Современные машины экономят 30-40% ресурсов.',
    formula: 'Стоимость стирки = Порошок + (Вода × Тариф) + (Электроэнергия × Тариф); Месячные = × Загрузок в месяц',
    faq: [
      {
        question: 'Сколько стоит одна стирка?',
        answer: 'В среднем 15-30₽ за стирку при обычных тарифах. Современная машина, полная загрузка, экономичный режим — ~15₽. Старая машина, маленькая загрузка — ~35₽.'
      },
      {
        question: 'Как снизить расходы на стирку?',
        answer: '1) Копите бельё для полной загрузки. 2) Стирайте при 30-40°C вместо 60°C. 3) Используйте концентрированные гели (не переборщите!). 4) При покупке — выбирайте класс А+++'
      },
      {
        question: 'Гель или порошок — что выгоднее?',
        answer: 'Концентрированные гели обычно выгоднее: их нужно меньше, они лучше растворяются, не требуют дополнительных полосканий. Но сравнивайте цену за стирку, а не за кг.'
      }
    ],
    sources: [
      { title: 'Washing machine energy consumption — Energy Star', url: 'https://www.energystar.gov/products/washers' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 9. Калькулятор школьных принадлежностей (School supplies calculator)
export const schoolSuppliesCalculator: Calculator = {
  id: 'school-supplies-calculator',
  slug: 'shkolnye-prinadlezhnosti',
  title: 'Калькулятор школьных принадлежностей',
  description: 'Расчёт бюджета на школьные принадлежности по классу и количеству предметов',
  category: 'povsednevnoe',
  subcategory: 'everyday-obuchenie',
  type: 'formula',
  inputs: [
    {
      name: 'grade',
      label: 'Класс/курс',
      type: 'select',
      options: [
        { value: 'grade1', label: '1 класс' },
        { value: 'grade4', label: '4 класс (начальная школа)' },
        { value: 'grade5', label: '5 класс (средняя школа)' },
        { value: 'grade9', label: '9 класс' },
        { value: 'grade11', label: '11 класс' },
        { value: 'university1', label: '1 курс университета' },
        { value: 'university3', label: '3+ курс университета' }
      ],
      defaultValue: 'grade5'
    },
    {
      name: 'quality',
      label: 'Уровень качества',
      type: 'select',
      options: [
        { value: 'budget', label: 'Эконом (базовые товары)' },
        { value: 'standard', label: 'Стандарт (средний сегмент)' },
        { value: 'premium', label: 'Премиум (фирменные товары)' }
      ],
      defaultValue: 'standard'
    },
    {
      name: 'includeTech',
      label: 'Включить технику',
      type: 'select',
      options: [
        { value: 'no', label: 'Нет (только канцелярия)' },
        { value: 'yes', label: 'Да (калькулятор, планшет и др.)' }
      ],
      defaultValue: 'no'
    }
  ],
  outputs: [
    { name: 'totalCost', label: 'Общая стоимость', type: 'number', unit: '₽' },
    { name: 'backpack', label: 'Рюкзак/портфель', type: 'number', unit: '₽' },
    { name: 'stationery', label: 'Канцелярия', type: 'number', unit: '₽' },
    { name: 'notebooks', label: 'Тетради и учебники', type: 'number', unit: '₽' },
    { name: 'artSupplies', label: 'Рисование/труд', type: 'number', unit: '₽' },
    { name: 'tech', label: 'Техника', type: 'number', unit: '₽' },
    { name: 'list', label: 'Список покупок', type: 'text' }
  ],
  calculate: (inputs) => {
    const grade = String(inputs.grade);
    const quality = String(inputs.quality);
    const includeTech = String(inputs.includeTech) === 'yes';

    // Quality multipliers
    const qualityMultipliers: Record<string, number> = {
      'budget': 0.6,
      'standard': 1.0,
      'premium': 2.0
    };
    const multiplier = qualityMultipliers[quality];

    // Base costs by grade (in RUB)
    const gradeCosts: Record<string, { backpack: number; stationery: number; notebooks: number; art: number; tech: number }> = {
      'grade1': { backpack: 1500, stationery: 800, notebooks: 500, art: 600, tech: 0 },
      'grade4': { backpack: 1500, stationery: 1000, notebooks: 800, art: 700, tech: 0 },
      'grade5': { backpack: 2000, stationery: 1500, notebooks: 1200, art: 800, tech: 500 },
      'grade9': { backpack: 2000, stationery: 1800, notebooks: 1500, art: 500, tech: 1500 },
      'grade11': { backpack: 2500, stationery: 2000, notebooks: 2000, art: 300, tech: 3000 },
      'university1': { backpack: 3000, stationery: 1500, notebooks: 1000, art: 200, tech: 15000 },
      'university3': { backpack: 0, stationery: 1000, notebooks: 800, art: 0, tech: 5000 }
    };

    const costs = gradeCosts[grade];

    // Apply quality multiplier
    const backpack = Math.round(costs.backpack * multiplier);
    const stationery = Math.round(costs.stationery * multiplier);
    const notebooks = Math.round(costs.notebooks * multiplier);
    const artSupplies = Math.round(costs.art * multiplier);
    const tech = includeTech ? Math.round(costs.tech * (quality === 'premium' ? 1.5 : 1)) : 0;

    const totalCost = backpack + stationery + notebooks + artSupplies + tech;

    // Generate shopping list
    const lists: Record<string, string> = {
      'grade1': 'Рюкзак школьный, 10 тетрадей в клетку/линию, цветные карандаши 12 цв., фломастеры, пластилин, кисти, ножницы, клей, линейка, пенал',
      'grade4': 'Рюкзак, 15 тетрадей, ручки шариковые/гелевые, цветные карандаши, фломастеры, фломастеры для доски, пластилин, краски акварель, кисти, циркуль',
      'grade5': 'Рюкзак ортопедический, 20 тетрадей, ручки разных цветов, карандаши чернографитные, ластик, точилка, циркуль, линейка, транспортир, краски акварель/гуашь, кисти',
      'grade9': 'Портфель/рюкзак, 25 тетрадей, ручки гелевые, карандаши, циркуль, линейки, учебники, калькулятор, краски (при необходимости)',
      'grade11': 'Сумка/рюкзак, 30 тетрадей, ручки гелевые, маркеры, учебники, словарь (ин. язык), калькулятор инженерный, планшет/ноутбук (рекомендуется)',
      'university1': 'Рюкзак/сумка для ноутбука, блокноты, ручки, маркеры, папки-скоросшиватели, листы А4, степлер, ноутбук/планшет, наушники',
      'university3': 'Блокноты, ручки, папки, листы А4, принадлежности по специальности, возможно обновление техники'
    };

    return [
      { value: totalCost, label: 'Общая сумма', unit: '₽' },
      { value: backpack, label: 'Рюкзак/сумка', unit: '₽' },
      { value: stationery, label: 'Канцелярия', unit: '₽' },
      { value: notebooks, label: 'Тетради', unit: '₽' },
      { value: artSupplies, label: 'Для рисования/труда', unit: '₽' },
      { value: tech, label: 'Техника', unit: '₽' },
      { value: lists[grade], label: 'Что купить' }
    ];
  },
  content: {
    howTo: 'Выберите класс/курс, уровень качества и нужна ли техника. Калькулятор рассчитает бюджет и составит список покупок.',
    about: 'Стоимость школьных принадлежностей растёт с классом: 1 класс — базовый набор, старшие классы — специализированные предметы, университет — техника.',
    formula: 'Сумма = (Рюкзак + Канцелярия + Тетради + Рисование + Техника) × Коэффициент качества',
    faq: [
      {
        question: 'Сколько стоит собрать ребёнка в школу?',
        answer: '1 класс — от 2000₽ (эконом) до 8000₽ (премиум). 5-9 класс — от 4000₽ до 15000₽. 10-11 класс + университет — от 10000₽ до 50000₽ (с техникой).'
      },
      {
        question: 'Что входит в базовый набор первоклассника?',
        answer: 'Рюкзак (ортопедический!), 10 тетрадей, цветные карандаши, фломастеры, пластилин, кисти, ножницы безопасные, клей-карандаш, линейка 15 см, пенал, кошелёк для обедов.'
      },
      {
        question: 'Нужен ли первокласснику планшет/ноутбук?',
        answer: 'В 1 класс — нет. В средней школе — может пригодиться для домашних заданий. В старшей школе и университете — практически необходим.'
      }
    ],
    sources: [
      { title: 'Back-to-school shopping guide', url: 'https://www.parents.com/kids/education/back-to-school/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 10. Калькулятор новогоднего декора (Holiday decoration calculator)
export const holidayDecorationCalculator: Calculator = {
  id: 'holiday-decoration-calculator',
  slug: 'novogodniy-dekor',
  title: 'Калькулятор новогоднего декора',
  description: 'Расчёт бюджета на новогоднее украшение: ёлка, гирлянды, игрушки, декор',
  category: 'povsednevnoe',
  subcategory: 'everyday-prazdniki',
  type: 'formula',
  inputs: [
    {
      name: 'treeSize',
      label: 'Размер ёлки',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет ёлки (только декор)' },
        { value: 'small', label: 'Маленькая (до 1 м, настольная)' },
        { value: 'medium', label: 'Средняя (1.5-1.8 м)' },
        { value: 'large', label: 'Большая (2-2.5 м)' },
        { value: 'xlarge', label: 'Огромная (3+ м)' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'treeType',
      label: 'Тип ёлки',
      type: 'select',
      options: [
        { value: 'live', label: 'Живая (срезанная)' },
        { value: 'potted', label: 'Живая в горшке' },
        { value: 'artificial', label: 'Искусственная ПВХ' },
        { value: 'premium_artificial', label: 'Искусственная литая (премиум)' }
      ],
      defaultValue: 'artificial'
    },
    {
      name: 'lightLength',
      label: 'Длина гирлянд (метров)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 100
    },
    {
      name: 'ornamentCount',
      label: 'Количество игрушек/шаров',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 0,
      max: 200
    },
    {
      name: 'additionalDecor',
      label: 'Дополнительный декор',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет' },
        { value: 'basic', label: 'Базовый (мишура, дождик, верхушка)' },
        { value: 'full', label: 'Полный (всё + фигурки, свечи, венок на дверь)' },
        { value: 'extreme', label: 'Максимум (профессиональное освещение, лазерный проектор)' }
      ],
      defaultValue: 'basic'
    },
    {
      name: 'quality',
      label: 'Уровень качества',
      type: 'select',
      options: [
        { value: 'budget', label: 'Эконом (бюджетный магазин)' },
        { value: 'standard', label: 'Стандарт (средний сегмент)' },
        { value: 'premium', label: 'Премиум (фирменный магазин)' }
      ],
      defaultValue: 'standard'
    }
  ],
  outputs: [
    { name: 'treeCost', label: 'Ёлка', type: 'number', unit: '₽' },
    { name: 'lightsCost', label: 'Гирлянды', type: 'number', unit: '₽' },
    { name: 'ornamentsCost', label: 'Игрушки/шары', type: 'number', unit: '₽' },
    { name: 'additionalCost', label: 'Доп. декор', type: 'number', unit: '₽' },
    { name: 'totalCost', label: 'ИТОГО', type: 'number', unit: '₽' },
    { name: 'recommendations', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
    const treeSize = String(inputs.treeSize);
    const treeType = String(inputs.treeType);
    const lightLength = Number(inputs.lightLength);
    const ornamentCount = Number(inputs.ornamentCount);
    const additionalDecor = String(inputs.additionalDecor);
    const quality = String(inputs.quality);

    // Quality multipliers
    const qualityMultipliers: Record<string, number> = {
      'budget': 0.5,
      'standard': 1.0,
      'premium': 2.5
    };
    const multiplier = qualityMultipliers[quality];

    // Tree costs by size and type
    const treeCosts: Record<string, Record<string, number>> = {
      'none': { live: 0, potted: 0, artificial: 0, premium_artificial: 0 },
      'small': { live: 500, potted: 800, artificial: 1500, premium_artificial: 3000 },
      'medium': { live: 1500, potted: 2000, artificial: 3000, premium_artificial: 8000 },
      'large': { live: 3000, potted: 4000, artificial: 5000, premium_artificial: 15000 },
      'xlarge': { live: 6000, potted: 8000, artificial: 10000, premium_artificial: 25000 }
    };

    const treeCost = treeCosts[treeSize][treeType] ? Math.round(treeCosts[treeSize][treeType] * multiplier) : 0;

    // Lights cost (per meter)
    const lightCostPerMeter = quality === 'budget' ? 50 : quality === 'standard' ? 100 : 250;
    const lightsCost = lightLength * lightCostPerMeter;

    // Ornaments cost (per item)
    const ornamentCostPerItem = quality === 'budget' ? 20 : quality === 'standard' ? 50 : 150;
    const ornamentsCost = ornamentCount * ornamentCostPerItem;

    // Additional decor costs
    const additionalCosts: Record<string, number> = {
      'none': 0,
      'basic': quality === 'budget' ? 300 : quality === 'standard' ? 800 : 2000,
      'full': quality === 'budget' ? 800 : quality === 'standard' ? 2000 : 6000,
      'extreme': quality === 'budget' ? 1500 : quality === 'standard' ? 5000 : 15000
    };
    const additionalCost = additionalCosts[additionalDecor];

    const totalCost = treeCost + lightsCost + ornamentsCost + additionalCost;

    // Recommendations
    let recommendations = '';
    if (treeType === 'live') {
      recommendations = 'Живая ёлка требует ухода: вода в поддон, не ставьте near батареи, утилизируйте экологично после праздников (пункты сбора).';
    } else if (treeType === 'potted') {
      recommendations = 'Ёлка в горшке — можно посадить после праздников или оставить в горшке для следующего года. Поливайте умеренно.';
    } else {
      recommendations = 'Искусственная ёлка служит 5-10 лет. Храните в коробке away from солнца. Литые ветви выглядят реалистичнее.';
    }

    if (lightLength > 0) {
      recommendations += ` Для ёлки высотой ${treeSize === 'small' ? 'до 1м' : treeSize === 'medium' ? '1.5-1.8м' : '2м и выше'} рекомендуется ${treeSize === 'small' ? '3-5' : treeSize === 'medium' ? '8-12' : '15-20'} метров гирлянд.`;
    }

    return [
      { value: treeCost, label: 'Ёлка', unit: '₽' },
      { value: lightsCost, label: 'Гирлянды', unit: '₽' },
      { value: ornamentsCost, label: 'Игрушки', unit: '₽' },
      { value: additionalCost, label: 'Доп. декор', unit: '₽' },
      { value: totalCost, label: 'ВСЕГО', unit: '₽' },
      { value: recommendations, label: 'Советы' }
    ];
  },
  content: {
    howTo: 'Выберите размер и тип ёлки, укажите длину гирлянд и количество игрушек, выберите дополнительный декор и уровень качества.',
    about: 'Новогодний декор включает: ёлку (живую или искусственную), гирлянды (LED безопаснее и экономнее), шары/игрушки, мишуру, возможно венок и уличное освещение.',
    formula: 'Бюджет = Ёлка + (Гирлянды × Цена/м) + (Игрушки × Цена/шт) + Доп. декор; Всё × Коэффициент качества',
    faq: [
      {
        question: 'Живая или искусственная ёлка — что выгоднее?',
        answer: 'Живая: 1500-5000₽/год, экологична при правильной утилизации. Искусственная: 3000-15000₽ разово, служит 5-10 лет. При 5+ годах использования искусственная выгоднее.'
      },
      {
        question: 'Какие гирлянды лучше?',
        answer: 'LED-гирлянды: безопаснее (не греются), экономят электричество в 10 раз, служат дольше. Белый тёплый свет классический, RGB — для настроения.'
      },
      {
        question: 'Сколько игрушек нужно на ёлку?',
        answer: 'На 1.5 м ёлку — 30-50 шаров. На 2 м — 60-80 шаров. Правило: шаров должно быть в 10 раз больше, чем высота ёлки в метрах. Микс размеров выглядит лучше.'
      }
    ],
    sources: [
      { title: 'Christmas tree decoration guide', url: 'https://www.bhg.com/christmas/trees/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Export all calculators
export const dailyMore2Calculators = [
  weatherClothingCalculator,
  petFoodCalculator,
  giftBudgetCalculator,
  vacationBudgetCalculator,
  carWashCalculator,
  dryCleaningCalculator,
  homeCleaningTimeCalculator,
  laundryCalculator,
  schoolSuppliesCalculator,
  holidayDecorationCalculator,
];
