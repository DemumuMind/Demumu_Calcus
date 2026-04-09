import { Calculator } from '../types';

// Калькулятор корма для собак
export const dogFoodCalculator: Calculator = {
  id: 'dog-food',
  slug: 'korm-sobaki',
  title: 'Норма корма для собак',
  description: 'Расчёт дневной нормы корма для собак на основе веса, возраста и активности',
  category: 'dlya-zhivotnyh',
  subcategory: 'pets-dogs',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес собаки (кг)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20
    },
    {
      name: 'age',
      label: 'Возраст',
      type: 'select',
      options: [
        { value: 'puppy', label: 'Щенок (до 1 года)' },
        { value: 'adult', label: 'Взрослая (1-7 лет)' },
        { value: 'senior', label: 'Пожилая (7+ лет)' }
      ],
      defaultValue: 'adult'
    },
    {
      name: 'activity',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкая (дома)' },
        { value: 'moderate', label: 'Средняя (прогулки)' },
        { value: 'high', label: 'Высокая (активные)' },
        { value: 'veryhigh', label: 'Очень высокая (рабочие)' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'foodType',
      label: 'Тип корма',
      type: 'select',
      options: [
        { value: 'dry', label: 'Сухой корм' },
        { value: 'wet', label: 'Влажный корм' },
        { value: 'raw', label: 'Натуральный (сырое мясо)' },
        { value: 'homemade', label: 'Домашняя еда' }
      ],
      defaultValue: 'dry'
    }
  ],
  outputs: [
    { name: 'calories', label: 'Калории (ккал/день)', type: 'number' },
    { name: 'foodAmount', label: 'Количество корма (г/день)', type: 'number' },
    { name: 'meals', label: 'Количество приёмов пищи', type: 'number' },
    { name: 'water', label: 'Воды (мл/день)', type: 'number' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const age = String(inputs.age);
    const activity = String(inputs.activity);
    const foodType = String(inputs.foodType);
    
    if (!weight) {
      return [
        { value: '—', label: 'Калории (ккал/день)' },
        { value: '—', label: 'Количество корма (г/день)' },
        { value: '—', label: 'Количество приёмов пищи' },
        { value: '—', label: 'Воды (мл/день)' }
      ];
    }
    
    // Base metabolic rate (RER) = 70 × weight^0.75
    const rer = 70 * Math.pow(weight, 0.75);
    
    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      low: 1.2,
      moderate: 1.6,
      high: 2.0,
      veryhigh: 3.0
    };
    
    // Age adjustments
    const ageMultipliers: Record<string, number> = {
      puppy: 2.0,
      adult: 1.0,
      senior: 0.8
    };
    
    const totalCalories = rer * (activityMultipliers[activity] || 1.6) * (ageMultipliers[age] || 1);
    
    // Food amounts based on type (calories per gram)
    const caloriesPerGram: Record<string, number> = {
      dry: 3.5,
      wet: 1.2,
      raw: 1.5,
      homemade: 1.3
    };
    
    const foodAmount = totalCalories / (caloriesPerGram[foodType] || 3.5);
    
    // Number of meals
    let meals = 2;
    if (age === 'puppy') {
      meals = weight < 5 ? 4 : 3;
    } else if (age === 'senior') {
      meals = 2;
    }
    
    // Water: ~60 ml per kg
    const water = weight * 60;
    
    return [
      { value: Math.round(totalCalories), label: 'Калории (ккал/день)' },
      { value: Math.round(foodAmount), label: 'Количество корма (г/день)' },
      { value: meals, label: 'Количество приёмов пищи' },
      { value: Math.round(water), label: 'Воды (мл/день)' }
    ];
  },
  content: {
    howTo: 'Введите вес собаки, выберите возраст, уровень активности и тип корма.',
    about: 'Норма корма рассчитывается на основе метаболического веса (RER), уровня активности и возраста. Щенкам нужно больше калорий для роста.',
    formula: 'Калории = 70 × вес^0.75 × активность × возрастной коэффициент',
    usage: 'Используется для планирования питания, контроля веса, выбора упаковки корма.',
    faq: [
      {
        question: 'Почему моя собака набирает вес?',
        answer: 'Возможно, вы кормите больше нормы или используете высококалорийный корм. Также учитывайте лакомства - они должны быть не более 10% от рациона.'
      }
    ],
    sources: [
      { title: 'Питание собак', url: 'https://ru.wikipedia.org/wiki/Собака#Питание' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор корма для кошек
export const catFoodCalculator: Calculator = {
  id: 'cat-food',
  slug: 'korm-koshki',
  title: 'Норма корма для кошек',
  description: 'Расчёт дневной нормы корма для кошек на основе веса, возраста и состояния',
  category: 'dlya-zhivotnyh',
  subcategory: 'pets-cats',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес кошки (кг)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4
    },
    {
      name: 'age',
      label: 'Возраст',
      type: 'select',
      options: [
        { value: 'kitten', label: 'Котёнок (до 1 года)' },
        { value: 'adult', label: 'Взрослая (1-7 лет)' },
        { value: 'senior', label: 'Пожилая (7+ лет)' }
      ],
      defaultValue: 'adult'
    },
    {
      name: 'condition',
      label: 'Состояние',
      type: 'select',
      options: [
        { value: 'neutered', label: 'Стерилизованная/кастрированная' },
        { value: 'active', label: 'Активная' },
        { value: 'inactive', label: 'Малоактивная' },
        { value: 'pregnant', label: 'Беременная/кормящая' }
      ],
      defaultValue: 'neutered'
    },
    {
      name: 'foodType',
      label: 'Тип корма',
      type: 'select',
      options: [
        { value: 'dry', label: 'Сухой корм' },
        { value: 'wet', label: 'Влажный корм' },
        { value: 'mixed', label: 'Смешанное питание' }
      ],
      defaultValue: 'dry'
    }
  ],
  outputs: [
    { name: 'calories', label: 'Калории (ккал/день)', type: 'number' },
    { name: 'foodAmount', label: 'Количество (г/день)', type: 'number' },
    { name: 'cansWet', label: 'Банок влажного (85г)', type: 'number' },
    { name: 'water', label: 'Воды (мл/день)', type: 'number' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const age = String(inputs.age);
    const condition = String(inputs.condition);
    const foodType = String(inputs.foodType);
    
    if (!weight) {
      return [
        { value: '—', label: 'Калории (ккал/день)' },
        { value: '—', label: 'Количество (г/день)' },
        { value: '—', label: 'Банок влажного (85г)' },
        { value: '—', label: 'Воды (мл/день)' }
      ];
    }
    
    // RER for cats
    const rer = 70 * Math.pow(weight, 0.75);
    
    // Condition multipliers
    const conditionMultipliers: Record<string, number> = {
      neutered: 1.2,
      active: 1.4,
      inactive: 1.0,
      pregnant: 2.5
    };
    
    // Age adjustments
    const ageMultipliers: Record<string, number> = {
      kitten: 2.5,
      adult: 1.0,
      senior: 0.9
    };
    
    const totalCalories = rer * (conditionMultipliers[condition] || 1.2) * (ageMultipliers[age] || 1);
    
    // Food amounts
    let foodAmount = 0;
    let cansWet = 0;
    
    if (foodType === 'dry') {
      foodAmount = totalCalories / 3.8; // ~3.8 kcal/g
      cansWet = 0;
    } else if (foodType === 'wet') {
      foodAmount = totalCalories / 0.9; // ~0.9 kcal/g
      cansWet = Math.round(foodAmount / 85);
    } else if (foodType === 'mixed') {
      // 50/50 split
      const dryCalories = totalCalories * 0.5;
      const wetCalories = totalCalories * 0.5;
      foodAmount = (dryCalories / 3.8) + (wetCalories / 0.9);
      cansWet = Math.round((wetCalories / 0.9) / 85);
    }
    
    // Water: ~50-60 ml per kg
    const water = weight * 55;
    
    return [
      { value: Math.round(totalCalories), label: 'Калории (ккал/день)' },
      { value: Math.round(foodAmount), label: 'Количество (г/день)' },
      { value: cansWet, label: 'Банок влажного (85г)' },
      { value: Math.round(water), label: 'Воды (мл/день)' }
    ];
  },
  content: {
    howTo: 'Введите вес кошки, выберите возраст, состояние и тип корма.',
    about: 'Кошки - хищники с высокой потребностью в белке. Стерилизованным кошкам нужно меньше калорий, чем активным.',
    formula: 'Калории = 70 × вес^0.75 × коэффициент состояния × возрастной коэффициент',
    usage: 'Используется для предотвращения ожирения (особенно у стерилизованных кошек) и планирования рациона.',
    faq: [
      {
        question: 'Сухой или влажный корм?',
        answer: 'Влажный корм лучше для почек и обеспечивает дополнительное увлажнение. Сухой удобнее для свободного доступа. Смешанное питание - оптимально.'
      }
    ],
    sources: [
      { title: 'Питание кошек', url: 'https://ru.wikipedia.org/wiki/Кошка#Питание' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор возраста питомца
export const petAgeCalculator: Calculator = {
  id: 'pet-age',
  slug: 'vozrast-pitomca',
  title: 'Возраст питомца в "человеческих" годах',
  description: 'Перевод возраста собак и кошек в эквивалент человеческого возраста',
  category: 'dlya-zhivotnyh',
  subcategory: 'pets-general',
  type: 'formula',
  inputs: [
    {
      name: 'petType',
      label: 'Тип питомца',
      type: 'select',
      options: [
        { value: 'dog_small', label: 'Собака мелкая (до 10 кг)' },
        { value: 'dog_medium', label: 'Собака средняя (10-25 кг)' },
        { value: 'dog_large', label: 'Собака крупная (25+ кг)' },
        { value: 'cat', label: 'Кошка' }
      ],
      defaultValue: 'dog_medium'
    },
    {
      name: 'years',
      label: 'Лет',
      type: 'number',
      placeholder: '5',
      defaultValue: 5
    },
    {
      name: 'months',
      label: 'Месяцев',
      type: 'number',
      placeholder: '0',
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'humanAge', label: 'Человеческий возраст (лет)', type: 'number' },
    { name: 'lifeStage', label: 'Жизненная стадия', type: 'text' },
    { name: 'careTips', label: 'Рекомендации по уходу', type: 'text' }
  ],
  calculate: (inputs) => {
    const petType = String(inputs.petType);
    const years = Number(inputs.years);
    const months = Number(inputs.months);
    
    if (!years && !months) {
      return [
        { value: '—', label: 'Человеческий возраст (лет)' },
        { value: '—', label: 'Жизненная стадия' },
        { value: '', label: 'Рекомендации по уходу' }
      ];
    }
    
    const totalYears = years + months / 12;
    let humanAge = 0;
    
    if (petType === 'cat') {
      // Cat aging formula
      if (totalYears <= 1) {
        humanAge = totalYears * 15;
      } else if (totalYears <= 2) {
        humanAge = 15 + (totalYears - 1) * 9;
      } else {
        humanAge = 24 + (totalYears - 2) * 4;
      }
    } else {
      // Dog aging - varies by size
      const sizeMultipliers: Record<string, number> = {
        dog_small: 4,
        dog_medium: 5,
        dog_large: 7
      };
      
      const multiplier = sizeMultipliers[petType] || 5;
      
      if (totalYears <= 1) {
        humanAge = totalYears * 15;
      } else if (totalYears <= 2) {
        humanAge = 15 + (totalYears - 1) * (multiplier + 4);
      } else {
        humanAge = 15 + multiplier + 4 + (totalYears - 2) * multiplier;
      }
    }
    
    // Life stage
    let lifeStage = '';
    let careTips = '';
    
    if (petType.includes('dog')) {
      if (humanAge < 12) {
        lifeStage = 'Щенок/молодая собака';
        careTips = 'Активные игры, социализация, базовое обучение';
      } else if (humanAge < 45) {
        lifeStage = 'Взрослая собака';
        careTips = 'Регулярные прогулки, поддержание веса, ежегодный осмотр';
      } else if (humanAge < 70) {
        lifeStage = 'Зрелая собака';
        careTips = 'Контроль веса, профилактика заболеваний';
      } else {
        lifeStage = 'Пожилая собака';
        careTips = 'Мягкий корм, тёплое место, регулярные осмотры врача';
      }
    } else {
      if (humanAge < 12) {
        lifeStage = 'Котёнок';
        careTips = 'Игры, приучение к лотку, первая вакцинация';
      } else if (humanAge < 45) {
        lifeStage = 'Взрослая кошка';
        careTips = 'Игры, когтеточка, контроль веса';
      } else if (humanAge < 70) {
        lifeStage = 'Зрелая кошка';
        careTips = 'Диета, регулярный осмотр, игры для мозга';
      } else {
        lifeStage = 'Пожилая кошка';
        careTips = 'Мягкий корм, тёплое место, тихая обстановка';
      }
    }
    
    return [
      { value: Math.round(humanAge), label: 'Человеческий возраст (лет)' },
      { value: lifeStage, label: 'Жизненная стадия' },
      { value: careTips, label: 'Рекомендации по уходу' }
    ];
  },
  content: {
    howTo: 'Выберите тип питомца и укажите его возраст в годах и месяцах.',
    about: 'Питомцы стареют быстрее людей, особенно в первые годы. Первый год жизни собаки ≈ 15 человеческих лет.',
    usage: 'Помогает понять, в какой жизненной стадии находится питомец и какой уход ему нужен.',
    faq: [
      {
        question: 'Почему крупные собаки стареют быстрее?',
        answer: 'Это парадокс: крупные породы созревают медленнее, но стареют быстрее. Маленькие собаки живут дольше.'
      }
    ],
    sources: [
      { title: 'Возраст собак', url: 'https://ru.wikipedia.org/wiki/Собака#Возраст' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор дозировки лекарств
export const petMedicationCalculator: Calculator = {
  id: 'pet-medication-dosage',
  slug: 'doza-lekarstv',
  title: 'Дозировка лекарств для питомцев',
  description: 'Расчёт дозировки лекарств на основе веса питомца (только для ориентира, консультируйтесь с ветеринаром)',
  category: 'dlya-zhivotnyh',
  subcategory: 'pets-health',
  type: 'formula',
  inputs: [
    {
      name: 'petType',
      label: 'Питомец',
      type: 'select',
      options: [
        { value: 'dog', label: 'Собака' },
        { value: 'cat', label: 'Кошка' }
      ],
      defaultValue: 'dog'
    },
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10
    },
    {
      name: 'medication',
      label: 'Тип лекарства',
      type: 'select',
      options: [
        { value: 'general', label: 'Общий расчёт' },
        { value: 'flea', label: 'Против блох/клещей' },
        { value: 'worm', label: 'От глистов' },
        { value: 'pain', label: 'Обезболивающее' },
        { value: 'antibiotic', label: 'Антибиотик' }
      ],
      defaultValue: 'general'
    }
  ],
  outputs: [
    { name: 'dosageMg', label: 'Дозировка (мг)', type: 'number' },
    { name: 'frequency', label: 'Частота приёма', type: 'text' },
    { name: 'warning', label: 'Важно!', type: 'text' }
  ],
  calculate: (inputs) => {
    const petType = String(inputs.petType);
    const weight = Number(inputs.weight);
    const medication = String(inputs.medication);
    
    if (!weight) {
      return [
        { value: '—', label: 'Дозировка (мг)' },
        { value: '—', label: 'Частота приёма' },
        { value: '❗ Обязательно проконсультируйтесь с ветеринаром!', label: 'Важно!' }
      ];
    }
    
    // Typical dosage ranges (mg per kg)
    const dosageRanges: Record<string, { min: number; max: number; freq: string }> = {
      general: { min: 5, max: 20, freq: '1-2 раза в день' },
      flea: { min: 0, max: 0, freq: 'Согласно инструкции на упаковке' },
      worm: { min: 0, max: 0, freq: 'Раз в 3-6 месяцев' },
      pain: { min: 2, max: 5, freq: '1-2 раза в день' },
      antibiotic: { min: 5, max: 15, freq: '2-3 раза в день, курс 7-14 дней' }
    };
    
    const range = dosageRanges[medication];
    
    let dosageMg = 0;
    if (range.min > 0) {
      const avgDosage = (range.min + range.max) / 2;
      dosageMg = weight * avgDosage;
    }
    
    const warning = '⚠️ ЭТО ТОЛЬКО ОРИЕНТИР! Обязательно проконсультируйтесь с ветеринаром перед применением любых лекарств!';
    
    return [
      { value: Math.round(dosageMg), label: 'Дозировка (мг)' },
      { value: range.freq, label: 'Частота приёма' },
      { value: warning, label: 'Важно!' }
    ];
  },
  content: {
    howTo: 'Введите тип питомца, вес и тип лекарства. Это даёт ОРИЕНТИРОВОЧНЫЙ расчёт.',
    about: 'Дозировка лекарств для животных зависит от веса, возраста, состояния здоровья и многих других факторов.',
    formula: 'Доза (мг) = Вес (кг) × Дозировка на кг (мг/кг)',
    usage: 'Только для предварительной оценки! Всегда консультируйтесь с ветеринаром перед применением лекарств.',
    faq: [
      {
        question: 'Можно ли давать человеческие лекарства?',
        answer: 'Некоторые лекарства опасны для животных (парацетамол для кошек!). Никогда не давайте без консультации ветеринара.'
      }
    ],
    sources: [
      { title: 'Ветеринария', url: 'https://ru.wikipedia.org/wiki/Ветеринария' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор стоимости содержания
export const petCostCalculator: Calculator = {
  id: 'pet-cost',
  slug: 'stoimost-pitomca',
  title: 'Стоимость содержания питомца',
  description: 'Расчёт месячных и годовых расходов на содержание собаки или кошки',
  category: 'dlya-zhivotnyh',
  subcategory: 'pets-finance',
  type: 'formula',
  inputs: [
    {
      name: 'petType',
      label: 'Питомец',
      type: 'select',
      options: [
        { value: 'dog_small', label: 'Собака мелкая (до 10 кг)' },
        { value: 'dog_medium', label: 'Собака средняя (10-25 кг)' },
        { value: 'dog_large', label: 'Собака крупная (25+ кг)' },
        { value: 'cat', label: 'Кошка' }
      ],
      defaultValue: 'dog_medium'
    },
    {
      name: 'foodQuality',
      label: 'Качество корма',
      type: 'select',
      options: [
        { value: 'economy', label: 'Эконом (500₽/мес)' },
        { value: 'standard', label: 'Стандарт (1500₽/мес)' },
        { value: 'premium', label: 'Премиум (3000₽/мес)' },
        { value: 'super_premium', label: 'Супер-премиум (5000₽/мес)' }
      ],
      defaultValue: 'standard'
    },
    {
      name: 'vetCare',
      label: 'Уровень ветеринарной помощи',
      type: 'select',
      options: [
        { value: 'basic', label: 'Базовая (плановые осмотры)' },
        { value: 'extended', label: 'Расширенная (+ страховка)' },
        { value: 'full', label: 'Полная (любые проблемы)' }
      ],
      defaultValue: 'basic'
    },
    {
      name: 'grooming',
      label: 'Груминг/уход',
      type: 'select',
      options: [
        { value: 'none', label: 'Самостоятельно' },
        { value: 'occasional', label: 'Иногда в салоне' },
        { value: 'regular', label: 'Регулярно в салоне' }
      ],
      defaultValue: 'none'
    }
  ],
  outputs: [
    { name: 'monthlyCost', label: 'В месяц (₽)', type: 'number' },
    { name: 'yearlyCost', label: 'В год (₽)', type: 'number' },
    { name: 'breakdown', label: 'Распределение расходов', type: 'text' }
  ],
  calculate: (inputs) => {
    const petType = String(inputs.petType);
    const foodQuality = String(inputs.foodQuality);
    const vetCare = String(inputs.vetCare);
    const grooming = String(inputs.grooming);
    
    // Food costs per month
    const foodCosts: Record<string, number> = {
      economy: 500,
      standard: 1500,
      premium: 3000,
      super_premium: 5000
    };
    
    // Adjust for pet size (dogs eat more)
    const sizeMultipliers: Record<string, number> = {
      dog_small: 0.5,
      dog_medium: 1,
      dog_large: 1.8,
      cat: 0.3
    };
    
    const foodCost = (foodCosts[foodQuality] || 1500) * (sizeMultipliers[petType] || 1);
    
    // Vet care per year
    const vetCosts: Record<string, number> = {
      basic: 5000,
      extended: 15000,
      full: 30000
    };
    
    const vetPerMonth = (vetCosts[vetCare] || 5000) / 12;
    
    // Grooming per month
    const groomingCosts: Record<string, number> = {
      none: 0,
      occasional: 1000,
      regular: 3000
    };
    
    // Additional costs (toys, treats, accessories, litter for cats)
    let extras = 500;
    if (petType === 'cat') {
      extras += 300; // litter
    }
    
    const monthlyCost = foodCost + vetPerMonth + (groomingCosts[grooming] || 0) + extras;
    const yearlyCost = monthlyCost * 12;
    
    const foodPercent = Math.round((foodCost / monthlyCost) * 100);
    const vetPercent = Math.round((vetPerMonth / monthlyCost) * 100);
    const otherPercent = 100 - foodPercent - vetPercent;
    
    return [
      { value: Math.round(monthlyCost), label: 'В месяц (₽)' },
      { value: Math.round(yearlyCost), label: 'В год (₽)' },
      { value: `Корм ${foodPercent}%, Ветеринар ${vetPercent}%, Прочее ${otherPercent}%`, label: 'Распределение расходов' }
    ];
  },
  content: {
    howTo: 'Выберите тип питомца, качество корма, уровень ветеринарной помощи и груминга.',
    about: 'Содержание питомца - это не только корм, но и ветеринарная помощь, груминг, игрушки, аксессуары.',
    usage: 'Используется для планирования бюджета перед заведением питомца или анализа текущих расходов.',
    faq: [
      {
        question: 'Сколько стоит собака в год?',
        answer: 'В среднем 30 000 - 100 000 ₽ в год в зависимости от размера, породы (некоторые требуют профессионального груминга) и здоровья.'
      }
    ],
    sources: [
      { title: 'Содержание домашних животных', url: 'https://ru.wikipedia.org/wiki/Домашнее_животное' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор идеального веса питомца
export const petIdealWeightCalculator: Calculator = {
  id: 'pet-ideal-weight',
  slug: 'idealnyj-ves-pitomca',
  title: 'Оценка веса питомца',
  description: 'Определение, находится ли питомец в идеальном весе (по системе BCS)',
  category: 'dlya-zhivotnyh',
  subcategory: 'pets-health',
  type: 'formula',
  inputs: [
    {
      name: 'petType',
      label: 'Питомец',
      type: 'select',
      options: [
        { value: 'dog', label: 'Собака' },
        { value: 'cat', label: 'Кошка' }
      ],
      defaultValue: 'dog'
    },
    {
      name: 'currentWeight',
      label: 'Текущий вес (кг)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15
    },
    {
      name: 'idealWeight',
      label: 'Идеальный вес (кг)',
      type: 'number',
      placeholder: '12',
      defaultValue: 12
    }
  ],
  outputs: [
    { name: 'weightDiff', label: 'Отклонение (кг)', type: 'number' },
    { name: 'weightPercent', label: 'Отклонение (%)', type: 'number' },
    { name: 'bcs', label: 'Оценка по BCS', type: 'text' },
    { name: 'recommendation', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
    const petType = String(inputs.petType);
    const currentWeight = Number(inputs.currentWeight);
    const idealWeight = Number(inputs.idealWeight);
    
    if (!currentWeight || !idealWeight) {
      return [
        { value: '—', label: 'Отклонение (кг)' },
        { value: '—', label: 'Отклонение (%)' },
        { value: '—', label: 'Оценка по BCS' },
        { value: '', label: 'Рекомендации' }
      ];
    }
    
    const weightDiff = currentWeight - idealWeight;
    const weightPercent = (weightDiff / idealWeight) * 100;
    
    // BCS (Body Condition Score) equivalent
    let bcs = '';
    let recommendation = '';
    
    if (weightPercent < -15) {
      bcs = '1-3/9 - Недостаточный вес';
      recommendation = 'Увеличьте порции, проверьте здоровье у ветеринара';
    } else if (weightPercent < -5) {
      bcs = '4/9 - Ниже нормы';
      recommendation = 'Небольшое увеличение порций';
    } else if (weightPercent <= 5) {
      bcs = '5/9 - Идеальный вес ✓';
      recommendation = 'Отлично! Поддерживайте текущий рацион';
    } else if (weightPercent <= 15) {
      bcs = '6-7/9 - Избыточный вес';
      recommendation = 'Уменьшите порции, увеличьте активность';
    } else {
      bcs = '8-9/9 - Ожирение';
      recommendation = 'Нужна диета под наблюдением ветеринара';
    }
    
    return [
      { value: Math.round(weightDiff * 10) / 10, label: 'Отклонение (кг)' },
      { value: Math.round(weightPercent), label: 'Отклонение (%)' },
      { value: bcs, label: 'Оценка по BCS' },
      { value: recommendation, label: 'Рекомендации' }
    ];
  },
  content: {
    howTo: 'Введите текущий вес питомца и его идеальный вес (можно узнать у ветеринара или по стандартам породы).',
    about: 'BCS (Body Condition Score) - система оценки состояния тела питомца по 9-балльной шкале. Идеал - 5/9.',
    usage: 'Помогает контролировать вес питомца и предотвратить ожирение или недостаточный вес.',
    faq: [
      {
        question: 'Как определить идеальный вес?',
        answer: 'У собак и кошек должны быть видны талия (сверху) и чувствоваться рёбра (легким надавливанием). Окружность живота < окружности грудной клетки.'
      }
    ],
    sources: [
      { title: 'Ожирение у животных', url: 'https://en.wikipedia.org/wiki/Obesity_in_pets' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор времени прогулок
export const petWalkCalculator: Calculator = {
  id: 'pet-walk',
  slug: 'vremya-progulok',
  title: 'Норма прогулок для собак',
  description: 'Расчёт необходимого времени прогулок на основе породы, возраста и энергии',
  category: 'dlya-zhivotnyh',
  subcategory: 'pets-dogs',
  type: 'formula',
  inputs: [
    {
      name: 'breedType',
      label: 'Тип породы',
      type: 'select',
      options: [
        { value: 'toy', label: 'Той/миниатюрная (до 5 кг)' },
        { value: 'companion', label: 'Компаньон (спаниель, пудель)' },
        { value: 'working', label: 'Рабочая (овчарка, ретривер)' },
        { value: 'sighthound', label: 'Борзая (хортая, грейхаунд)' },
        { value: 'giant', label: 'Гигант (мастиф, дог)' }
      ],
      defaultValue: 'companion'
    },
    {
      name: 'age',
      label: 'Возраст',
      type: 'select',
      options: [
        { value: 'puppy', label: 'Щенок (до 1 года)' },
        { value: 'adult', label: 'Взрослая (1-7 лет)' },
        { value: 'senior', label: 'Пожилая (7+ лет)' }
      ],
      defaultValue: 'adult'
    },
    {
      name: 'energy',
      label: 'Уровень энергии',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкий (флегматик)' },
        { value: 'medium', label: 'Средний' },
        { value: 'high', label: 'Высокий (энерджайзер)' }
      ],
      defaultValue: 'medium'
    }
  ],
  outputs: [
    { name: 'walksPerDay', label: 'Прогулок в день', type: 'number' },
    { name: 'walkDuration', label: 'Длительность (мин)', type: 'number' },
    { name: 'totalTime', label: 'Всего в день (мин)', type: 'number' },
    { name: 'intensity', label: 'Интенсивность', type: 'text' }
  ],
  calculate: (inputs) => {
    const breedType = String(inputs.breedType);
    const age = String(inputs.age);
    const energy = String(inputs.energy);
    
    // Base requirements by breed
    const baseRequirements: Record<string, { walks: number; duration: number }> = {
      toy: { walks: 2, duration: 15 },
      companion: { walks: 3, duration: 30 },
      working: { walks: 3, duration: 45 },
      sighthound: { walks: 2, duration: 30 },
      giant: { walks: 2, duration: 30 }
    };
    
    const base = baseRequirements[breedType] || { walks: 3, duration: 30 };
    
    // Age adjustments
    const ageMultipliers: Record<string, number> = {
      puppy: 0.5,
      adult: 1,
      senior: 0.7
    };
    
    // Energy adjustments
    const energyMultipliers: Record<string, number> = {
      low: 0.7,
      medium: 1,
      high: 1.3
    };
    
    const walks = base.walks;
    const duration = Math.round(base.duration * (ageMultipliers[age] || 1) * (energyMultipliers[energy] || 1));
    const totalTime = walks * duration;
    
    let intensity = '';
    if (breedType === 'working' && energy === 'high') {
      intensity = 'Высокая: бег, игры, тренировки';
    } else if (breedType === 'toy' || breedType === 'sighthound') {
      intensity = 'Умеренная: прогулки, лёгкие игры';
    } else {
      intensity = 'Средняя: прогулки, игры, социализация';
    }
    
    return [
      { value: walks, label: 'Прогулок в день' },
      { value: duration, label: 'Длительность (мин)' },
      { value: totalTime, label: 'Всего в день (мин)' },
      { value: intensity, label: 'Интенсивность' }
    ];
  },
  content: {
    howTo: 'Выберите тип породы, возраст и уровень энергии собаки.',
    about: 'Разные породы имеют разные потребности в активности. Рабочие породы требуют больше физической и умственной нагрузки.',
    usage: 'Используется для планирования распорядка дня с собакой, выбора породы по образу жизни.',
    faq: [
      {
        question: 'Можно ли выгуливать щенка долго?',
        answer: 'Нет! Правило: 5 минут прогулки на каждый месяц жизни (2 раза в день). Перегрузка опасна для развивающихся суставов.'
      }
    ],
    sources: [
      { title: 'Выгул собак', url: 'https://ru.wikipedia.org/wiki/Собака#Уход' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор площади для питомца
export const petSpaceCalculator: Calculator = {
  id: 'pet-space',
  slug: 'ploshchad-dlya-pitomca',
  title: 'Пространство для питомца',
  description: 'Оценка достаточности жилого пространства для разных типов питомцев',
  category: 'dlya-zhivotnyh',
  subcategory: 'pets-general',
  type: 'formula',
  inputs: [
    {
      name: 'petType',
      label: 'Питомец',
      type: 'select',
      options: [
        { value: 'cat', label: 'Кошка' },
        { value: 'dog_small', label: 'Собака мелкая' },
        { value: 'dog_medium', label: 'Собака средняя' },
        { value: 'dog_large', label: 'Собака крупная' },
        { value: 'bird', label: 'Птица' },
        { value: 'rodent', label: 'Грызун' }
      ],
      defaultValue: 'cat'
    },
    {
      name: 'livingSpace',
      label: 'Жилая площадь (м²)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50
    },
    {
      name: 'outdoorAccess',
      label: 'Доступ на улицу/балкон',
      type: 'select',
      options: [
        { value: 'yes', label: 'Да' },
        { value: 'no', label: 'Нет' }
      ],
      defaultValue: 'no'
    }
  ],
  outputs: [
    { name: 'spaceRating', label: 'Оценка пространства', type: 'text' },
    { name: 'recommendations', label: 'Рекомендации', type: 'text' },
    { name: 'minSpace', label: 'Минимум (м²)', type: 'number' }
  ],
  calculate: (inputs) => {
    const petType = String(inputs.petType);
    const livingSpace = Number(inputs.livingSpace);
    const outdoorAccess = String(inputs.outdoorAccess);
    
    if (!livingSpace) {
      return [
        { value: '—', label: 'Оценка пространства' },
        { value: '', label: 'Рекомендации' },
        { value: '—', label: 'Минимум (м²)' }
      ];
    }
    
    // Minimum space requirements
    const minSpaceReq: Record<string, number> = {
      cat: 15,
      dog_small: 20,
      dog_medium: 40,
      dog_large: 60,
      bird: 5,
      rodent: 2
    };
    
    const minSpace = minSpaceReq[petType] || 20;
    
    let spaceRating = '';
    let recommendations = '';
    
    if (livingSpace < minSpace * 0.8) {
      spaceRating = '❌ Недостаточно';
      recommendations = 'Критически мало места. Рассмотрите другой вариант питомца или увеличение пространства.';
    } else if (livingSpace < minSpace) {
      spaceRating = '⚠️ Тесновато';
      recommendations = 'Минимум для выживания. Нужны частые прогулки и активное использование вертикального пространства.';
    } else if (livingSpace < minSpace * 1.5) {
      spaceRating = '✅ Приемлемо';
      recommendations = 'Достаточно места при регулярной активности вне дома.';
    } else {
      spaceRating = '🌟 Отлично';
      recommendations = 'Просторное жильё позволяет питомцу чувствовать себя комфортно.';
    }
    
    // Add outdoor bonus
    if (outdoorAccess === 'yes' && (petType.includes('dog') || petType === 'cat')) {
      recommendations += ' Доступ на балкон/улицу компенсирует ограниченное пространство.';
    }
    
    return [
      { value: spaceRating, label: 'Оценка пространства' },
      { value: recommendations, label: 'Рекомендации' },
      { value: minSpace, label: 'Минимум (м²)' }
    ];
  },
  content: {
    howTo: 'Выберите тип питомца, введите жилую площадь и укажите наличие доступа на улицу/балкон.',
    about: 'Разные питомцы требуют разного пространства. Крупным собакам нужно больше места для комфортной жизни.',
    usage: 'Используется перед заведением питомца для оценки готовности жилья.',
    faq: [
      {
        question: 'Можно ли держать крупную собаку в квартире?',
        answer: 'Можно, но нужна регулярная активность на улице (2-3 часа в день). В квартире собака в основном спит.'
      }
    ],
    sources: [
      { title: 'Содержание животных', url: 'https://ru.wikipedia.org/wiki/Домашнее_животное' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const petCareCalculators: Calculator[] = [
  dogFoodCalculator,
  catFoodCalculator,
  petAgeCalculator,
  petMedicationCalculator,
  petCostCalculator,
  petIdealWeightCalculator,
  petWalkCalculator,
  petSpaceCalculator,
];
