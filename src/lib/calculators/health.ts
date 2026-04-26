import { Calculator } from '../types';

// Калькулятор ИМТ (Индекс массы тела)
export const bmiCalculator: Calculator = {
  id: 'bmi-simple-calculator',
  slug: 'kalkulyator-imt',
  title: 'Калькулятор ИМТ',
  description: 'Расчёт индекса массы тела (ИМТ) по росту и весу',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '175',
      min: 50,
      max: 300,
      defaultValue: 175
    },
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      min: 2,
      max: 500,
      defaultValue: 70
    }
  ],
  outputs: [
    { name: 'bmi', label: 'Индекс массы тела', type: 'number', unit: 'кг/м²' },
    { name: 'category', label: 'Категория', type: 'text' }
  ],
  calculate: (inputs) => {
    const height = Number(inputs.height) / 100;
    const weight = Number(inputs.weight);
    
    if (!height || !weight) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const bmi = weight / (height * height);
    const roundedBMI = Math.round(bmi * 10) / 10;
    
    let category = '';
    if (bmi < 16) category = 'Выраженный дефицит массы';
    else if (bmi < 18.5) category = 'Недостаточная масса';
    else if (bmi < 25) category = 'Нормальная масса';
    else if (bmi < 30) category = 'Избыточная масса';
    else if (bmi < 35) category = 'Ожирение I степени';
    else if (bmi < 40) category = 'Ожирение II степени';
    else category = 'Ожирение III степени';
    
    return [
      { value: roundedBMI, label: 'Индекс массы тела (ИМТ)', unit: 'кг/м²' },
      { value: category, label: 'Категория' }
    ];
  },
  content: {
    howTo: 'Введите свой рост в сантиметрах и вес в килограммах. Калькулятор рассчитает ваш ИМТ.',
    about: 'Индекс массы тела (ИМТ) — показатель позволяющий оценить соответствие массы человека и его роста.',
    usage: 'Используется для предварительной оценки массы тела и рисков для здоровья.',
    formula: 'ИМТ = вес (кг) / (рост (м))²',
    faq: [
      {
        question: 'Что такое ИМТ?',
        answer: 'ИМТ — числовой показатель, позволяющий оценить соответствие веса человека его росту.'
      },
      {
        question: 'Какая норма ИМТ?',
        answer: 'Нормальный ИМТ для взрослых: 18.5 — 24.9 кг/м².'
      }
    ],
    sources: [
      { title: 'Индекс массы тела — Википедия', url: 'https://ru.wikipedia.org/wiki/Индекс_массы_тела' }
    ],
    updatedAt: '2026-04-07'
  },
  popularCalculations: [
    { value: '175 см, 70 кг', url: '/kalkulyator-imt?height=175&weight=70' },
    { value: '160 см, 55 кг', url: '/kalkulyator-imt?height=160&weight=55' }
  ]
};

// Калькулятор BMR (Базальный метаболизм)
export const bmrCalculator: Calculator = {
  id: 'bmr-calculator',
  slug: 'kalkulyator-bmr',
  title: 'Калькулятор BMR',
  description: 'Расчёт базального метаболизма (формула Миффлина-Сан Жеора)',
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
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '30',
      min: 10,
      max: 120,
      defaultValue: 30
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '175',
      min: 50,
      max: 300,
      defaultValue: 175
    },
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      min: 2,
      max: 500,
      defaultValue: 70
    }
  ],
  outputs: [
    { name: 'bmr', label: 'BMR', type: 'number', unit: 'ккал/день' }
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender);
    const age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    
    if (!age || !height || !weight) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    return [
      { value: Math.round(bmr), label: 'Базальный метаболизм (BMR)', unit: 'ккал/день' }
    ];
  },
  content: {
    howTo: 'Введите пол, возраст, рост и вес. Калькулятор рассчитает базальный метаболизм по формуле Миффлина-Сан Жеора.',
    about: 'BMR (Basal Metabolic Rate) — количество калорий, которое организм расходует в состоянии покоя для поддержания жизненных функций.',
    usage: 'Используется для планирования диеты и определения суточной нормы калорий.',
    formula: 'Мужчины: BMR = 10×вес + 6.25×рост − 5×возраст + 5\nЖенщины: BMR = 10×вес + 6.25×рост − 5×возраст − 161',
    faq: [
      {
        question: 'Что такое BMR?',
        answer: 'BMR (базальный метаболизм) — минимальное количество энергии, необходимое организму для поддержания жизни в состоянии покоя.'
      },
      {
        question: 'Как использовать BMR для похудения?',
        answer: 'Для похудения создайте дефицит калорий: потребляйте на 300-500 ккал меньше вашего TDEE (BMR × коэффициент активности).'
      }
    ],
    sources: [
      { title: 'Базальный метаболизм — Википедия', url: 'https://ru.wikipedia.org/wiki/Базальный_метаболизм' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор TDEE (Общая энергетическая потребность)
export const tdeeCalculator: Calculator = {
  id: 'tdee-calculator',
  slug: 'kalkulyator-tdee',
  title: 'Калькулятор TDEE',
  description: 'Расчёт суточной нормы калорий с учётом активности',
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
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '30',
      min: 10,
      max: 120,
      defaultValue: 30
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '175',
      min: 50,
      max: 300,
      defaultValue: 175
    },
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      min: 2,
      max: 500,
      defaultValue: 70
    },
    {
      name: 'activity',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: 'sedentary', label: 'Сидячий (мало или нет упражнений)' },
        { value: 'light', label: 'Лёгкая активность (1-3 раза в неделю)' },
        { value: 'moderate', label: 'Умеренная активность (3-5 раз в неделю)' },
        { value: 'active', label: 'Высокая активность (6-7 раз в неделю)' },
        { value: 'very-active', label: 'Очень высокая (физическая работа)' }
      ],
      defaultValue: 'moderate'
    }
  ],
  outputs: [
    { name: 'tdee', label: 'TDEE', type: 'number', unit: 'ккал/день' },
    { name: 'bmr', label: 'BMR', type: 'number', unit: 'ккал/день' }
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender);
    const age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    const activity = String(inputs.activity);
    
    if (!age || !height || !weight) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Calculate BMR first (Mifflin-St Jeor)
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Activity multipliers
    const multipliers: Record<string, number> = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };
    
    const tdee = bmr * multipliers[activity];
    
    return [
      { value: Math.round(tdee), label: 'Суточная норма (TDEE)', unit: 'ккал/день' },
      { value: Math.round(bmr), label: 'Базальный метаболизм (BMR)', unit: 'ккал/день' }
    ];
  },
  content: {
    howTo: 'Введите пол, возраст, рост, вес и уровень физической активности. Калькулятор рассчитает суточную норму калорий.',
    about: 'TDEE (Total Daily Energy Expenditure) — общее количество калорий, которое организм расходует за день с учётом физической активности.',
    usage: 'Используется для планирования рациона: для похудения — дефицит 300-500 ккал, для набора — профицит 300-500 ккал.',
    formula: 'TDEE = BMR × коэффициент активности\nСидячий: ×1.2\nЛёгкая активность: ×1.375\nУмеренная: ×1.55\nВысокая: ×1.725\nОчень высокая: ×1.9',
    faq: [
      {
        question: 'Что такое TDEE?',
        answer: 'TDEE — общая энергетическая потребность организма за сутки, включая базальный метаболизм и активность.'
      },
      {
        question: 'Какой дефицит калорий выбрать для похудения?',
        answer: 'Рекомендуется дефицит 300-500 ккал от TDEE. Это позволяет терять 0.3-0.5 кг в неделю без вреда для здоровья.'
      }
    ],
    sources: [
      { title: 'Обмен веществ — Википедия', url: 'https://ru.wikipedia.org/wiki/Обмен_веществ' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор калорий (КБЖУ)
export const caloriesCalculator: Calculator = {
  id: 'calories-calculator',
  slug: 'kalkulyator-kalorij-kbzhu',
  title: 'Калькулятор калорий (КБЖУ)',
  description: 'Расчёт суточной нормы калорий, белков, жиров и углеводов',
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
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 10,
      max: 100
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '175',
      defaultValue: 175,
      min: 50,
      max: 250
    },
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
        { value: '1.2', label: 'Минимальная (сидячая работа)' },
        { value: '1.375', label: 'Лёгкая (1-3 раза в неделю)' },
        { value: '1.55', label: 'Умеренная (3-5 раз в неделю)' },
        { value: '1.725', label: 'Высокая (6-7 раз в неделю)' },
        { value: '1.9', label: 'Очень высокая (физическая работа)' }
      ],
      defaultValue: '1.375'
    },
    {
      name: 'goal',
      label: 'Цель',
      type: 'select',
      options: [
        { value: 'maintain', label: 'Поддержание веса' },
        { value: 'lose', label: 'Похудение' },
        { value: 'gain', label: 'Набор массы' }
      ],
      defaultValue: 'maintain'
    }
  ],
  outputs: [
    { name: 'calories', label: 'Калории (ккал)', type: 'number' },
    { name: 'protein', label: 'Белки', type: 'number', unit: 'г' },
    { name: 'fat', label: 'Жиры', type: 'number', unit: 'г' },
    { name: 'carbs', label: 'Углеводы', type: 'number', unit: 'г' }
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender);
    const age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    const activity = Number(inputs.activity);
    const goal = String(inputs.goal);

    if (!age || !height || !weight) {
      return [{ value: '—', label: 'Результат' }];
    }

    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let calories = Math.round(bmr * activity);

    // Adjust for goal
    if (goal === 'lose') calories -= 500;
    if (goal === 'gain') calories += 500;

    // Macros: 30% protein, 25% fat, 45% carbs
    const protein = Math.round((calories * 0.30) / 4);
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories * 0.45) / 4);

    return [
      { value: calories, label: 'Калории', unit: 'ккал' },
      { value: protein, label: 'Белки', unit: 'г' },
      { value: fat, label: 'Жиры', unit: 'г' },
      { value: carbs, label: 'Углеводы', unit: 'г' }
    ];
  },
  content: {
    howTo: 'Укажите ваши параметры, уровень физической активности и цель. Калькулятор рассчитает суточную норму калорий и соотношение БЖУ.',
    about: 'КБЖУ (калории, белки, жиры, углеводы) — основа правильного питания. Расчёт основан на формуле Mifflin-St Jeor с учётом активности и целей.',
    usage: 'Используйте для планирования рациона, похудения, набора мышечной массы или поддержания текущего веса.',
    formula: 'BMR = 10×вес + 6.25×рост - 5×возраст + 5 (муж) / -161 (жен)\nTDEE = BMR × активность\nБелки = 30% калорий / 4\nЖиры = 25% калорий / 9\nУглеводы = 45% калорий / 4',
    faq: [
      {
        question: 'Какое соотношение БЖУ оптимально?',
        answer: 'Стандартное соотношение: белки 30%, жиры 25%, углеводы 45%. Для похудения можно увеличить белки до 35-40%.'
      },
      {
        question: 'Нужно ли точно соблюдать норму калорий?',
        answer: 'Допустимое отклонение ±100 ккал. Главное — соблюдать дефицит/профицит для достижения цели.'
      }
    ],
    sources: [
      { title: 'Суточная норма калорий — Википедия', url: 'https://ru.wikipedia.org/wiki/Суточная_норма_калорий' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор алкоголя (упрощённый)
export const alcoholSimpleCalculator: Calculator = {
  id: 'alcohol-simple',
  slug: 'kalkulyator-alkogolya',
  title: 'Калькулятор алкоголя',
  description: 'Расчёт примерного содержания алкоголя в крови и времени выведения',
  category: 'zdorove-i-krasota',
  subcategory: 'zdorove-raznoe',
  type: 'formula',
  inputs: [
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
      name: 'drinkType',
      label: 'Тип напитка',
      type: 'select',
      options: [
        { value: 'beer', label: 'Пиво (5%)' },
        { value: 'wine', label: 'Вино (12%)' },
        { value: 'vodka', label: 'Водка/крепкий (40%)' },
        { value: 'cocktail', label: 'Коктейль (20%)' }
      ],
      defaultValue: 'beer'
    },
    {
      name: 'amount',
      label: 'Количество (мл)',
      type: 'number',
      placeholder: '500',
      defaultValue: 500,
      min: 50,
      max: 5000
    },
    {
      name: 'alcoholPercent',
      label: 'Крепость (%)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0.5,
      max: 96
    },
    {
      name: 'hours',
      label: 'Часов с момента употребления',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 72
    }
  ],
  outputs: [
    { name: 'promille', label: 'Промилле (‰)', type: 'number' },
    { name: 'soberTime', label: 'Время до полного выведения', type: 'text' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const gender = String(inputs.gender);
    const drinkType = String(inputs.drinkType);
    const amount = Number(inputs.amount);
    const alcoholPercent = Number(inputs.alcoholPercent) || ({
      beer: 5, wine: 12, vodka: 40, cocktail: 20
    } as Record<string, number>)[drinkType] || 5;
    const hours = Number(inputs.hours);

    if (!weight || !amount) {
      return [{ value: '—', label: 'Результат' }];
    }

    // Widmark simplified
    const r = gender === 'male' ? 0.68 : 0.55;
    const alcoholGrams = amount * (alcoholPercent / 100) * 0.79;
    let promille = (alcoholGrams / (weight * r)) - (hours * 0.15);
    promille = Math.max(0, promille);

    const soberHours = promille > 0 ? Math.ceil(promille / 0.15) : 0;

    return [
      { value: promille.toFixed(2), label: 'Алкоголь в крови', unit: '‰' },
      { value: soberHours > 0 ? `~${soberHours} ч` : 'Выведено', label: 'До трезвости', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите вес, пол, тип напитка, объём и время с момента употребления. Калькулятор покажет примерное содержание алкоголя и время выведения.',
    about: 'Упрощённый расчёт концентрации алкоголя в крови по формуле Видмарка. Результат ориентировочный и не является юридическим доказательством.',
    usage: 'Используется для примерной оценки степени опьянения и времени до трезвого состояния.',
    formula: 'Промилле = (мл × % × 0.79) / (кг × r) − 0.15 × ч\nr = 0.68 (муж), 0.55 (жен)',
    faq: [
      {
        question: 'Насколько точен результат?',
        answer: 'Результат ориентировочный. Фактическая концентрация зависит от множества факторов: метаболизма, еды, сна, состояния здоровья.'
      },
      {
        question: 'Можно ли садиться за руль?',
        answer: 'Нет, если промилле > 0. В России допустимая норма — 0‰ для водителей.'
      }
    ],
    sources: [
      { title: 'Алкоголь и здоровье — Википедия', url: 'https://ru.wikipedia.org/wiki/Алкоголь' }
    ],
    updatedAt: '2026-04-26'
  }
};

// Калькулятор размера бюстгальтера
export const braSizeCalculator: Calculator = {
  id: 'bra-size-calculator-ru',
  slug: 'razmer-byustgaltera',
  title: 'Калькулятор размера бюстгальтера',
  description: 'Определение размера бюстгальтера по обхвату под грудью и обхвату груди',
  category: 'zdorove-i-krasota',
  subcategory: 'krasota',
  type: 'formula',
  inputs: [
    {
      name: 'underbust',
      label: 'Обхват под грудью (см)',
      type: 'number',
      placeholder: '75',
      min: 50,
      max: 150,
      defaultValue: 75
    },
    {
      name: 'bust',
      label: 'Обхват груди (см)',
      type: 'number',
      placeholder: '90',
      min: 60,
      max: 170,
      defaultValue: 90
    },
    {
      name: 'country',
      label: 'Система размеров',
      type: 'select',
      options: [
        { value: 'RU', label: 'Россия / СНГ' },
        { value: 'EU', label: 'Европа' },
        { value: 'US', label: 'США' },
        { value: 'UK', label: 'Великобритания' }
      ],
      defaultValue: 'RU'
    }
  ],
  outputs: [
    { name: 'band', label: 'Обхват (размер ленты)', type: 'text' },
    { name: 'cup', label: 'Чашка', type: 'text' },
    { name: 'fullSize', label: 'Полный размер', type: 'text' }
  ],
  calculate: (inputs) => {
    const underbust = Number(inputs.underbust);
    const bust = Number(inputs.bust);
    const country = String(inputs.country);

    if (!underbust || !bust || underbust <= 0 || bust <= underbust) {
      return [{ value: 'Введите корректные замеры', label: 'Результат' }];
    }

    const diff = bust - underbust;
    const diffInches = diff / 2.54;

    let band = '';
    let cup = '';
    let fullSize = '';

    const ruCupMap = [
      { max: 10, label: 'AA' },
      { max: 13, label: 'A' },
      { max: 16, label: 'B' },
      { max: 19, label: 'C' },
      { max: 22, label: 'D' },
      { max: 25, label: 'E' },
      { max: 28, label: 'F' },
      { max: 31, label: 'G' },
      { max: 34, label: 'H' }
    ];

    const usCupMap = [
      { max: 1, label: 'AA' },
      { max: 2, label: 'A' },
      { max: 3, label: 'B' },
      { max: 4, label: 'C' },
      { max: 5, label: 'D' },
      { max: 6, label: 'DD/E' },
      { max: 7, label: 'DDD/F' },
      { max: 8, label: 'G' },
      { max: 9, label: 'H' }
    ];

    const ukCupMap = [
      { max: 1, label: 'AA' },
      { max: 2, label: 'A' },
      { max: 3, label: 'B' },
      { max: 4, label: 'C' },
      { max: 5, label: 'D' },
      { max: 6, label: 'DD' },
      { max: 7, label: 'E' },
      { max: 8, label: 'F' },
      { max: 9, label: 'FF' }
    ];

    if (country === 'RU' || country === 'EU') {
      band = String(Math.round(underbust / 5) * 5);
      const found = ruCupMap.find(c => diff < c.max);
      cup = found ? found.label : 'H+';
      fullSize = `${band}${cup}`;
    } else if (country === 'US') {
      const bandInches = underbust / 2.54;
      const bandRounded = Math.max(28, Math.round(bandInches / 2) * 2);
      band = String(bandRounded);
      const found = usCupMap.find(c => diffInches < c.max);
      cup = found ? found.label : 'H+';
      fullSize = `${band}${cup}`;
    } else if (country === 'UK') {
      const bandInches = underbust / 2.54;
      const bandRounded = Math.max(28, Math.round(bandInches / 2) * 2);
      band = String(bandRounded);
      const found = ukCupMap.find(c => diffInches < c.max);
      cup = found ? found.label : 'FF+';
      fullSize = `${band}${cup}`;
    }

    return [
      { value: band, label: 'Обхват (размер ленты)' },
      { value: cup, label: 'Чашка' },
      { value: fullSize, label: 'Полный размер' }
    ];
  },
  content: {
    howTo: 'Измерьте обхват под грудью (плотно, на выдохе) и обхват груди по самым выступающим точкам. Выберите систему размеров.',
    about: 'Калькулятор определяет размер бюстгальтера по двум замерам: обхват под грудью и обхват груди. Поддерживает российскую, европейскую, американскую и британскую системы размеров.',
    usage: 'Используется для подбора правильного размера бюстгальтера при покупке онлайн или в магазине.',
    formula: 'Размер = Обхват ленты + Чашка. Чашка определяется разницей между обхватом груди и обхватом под грудью.',
    faq: [
      {
        question: 'Как правильно измерить обхват под грудью?',
        answer: 'Используйте сантиметровую ленту. Обхват под грудью измеряется плотно, прямо под основанием груди, на выдохе. Лента должна быть горизонтальной и плотно прилегать к телу.'
      },
      {
        question: 'Как правильно измерить обхват груди?',
        answer: 'Измерьте по самым выступающим точкам груди. Лента не должна быть слишком тугой или слишком свободной. Держите ленту горизонтально на уровне сосков.'
      },
      {
        question: 'Почему размеры в разных странах отличаются?',
        answer: 'Разные страны используют разные системы измерения обхвата ленты (см vs дюймы) и разные шкалы чашек. Например, в США и Великобритании обхват ленты измеряется в дюймах и округляется до чётного числа.'
      },
      {
        question: 'Какой результат, если грудь меньше обхвата под грудью?',
        answer: 'Это физически невозможно для здоровой груди. Убедитесь, что вы правильно измерили оба параметры. Обхват груди всегда должен быть больше обхвата под грудью.'
      }
    ],
    sources: [
      { title: 'Размеры бюстгальтера — Википедия', url: 'https://ru.wikipedia.org/wiki/Размеры_бюстгальтера' }
    ],
    updatedAt: '2026-04-26'
  }
};

// Калькулятор роста волос
export const hairGrowthCalculator: Calculator = {
  id: 'hair-growth-calculator',
  slug: 'rost-volos',
  title: 'Калькулятор роста волос',
  description: 'Расчёт времени, за которое волосы вырастут от текущей длины до желаемой',
  category: 'zdorove-i-krasota',
  subcategory: 'krasota',
  type: 'formula',
  inputs: [
    {
      name: 'currentLength',
      label: 'Текущая длина (см)',
      type: 'number',
      placeholder: '10',
      min: 0,
      max: 200,
      defaultValue: 10
    },
    {
      name: 'desiredLength',
      label: 'Желаемая длина (см)',
      type: 'number',
      placeholder: '30',
      min: 0,
      max: 200,
      defaultValue: 30
    },
    {
      name: 'growthRate',
      label: 'Скорость роста (мм/мес)',
      type: 'number',
      placeholder: '12',
      min: 1,
      max: 50,
      defaultValue: 12
    }
  ],
  outputs: [
    { name: 'days', label: 'Дней', type: 'number', unit: 'дн' },
    { name: 'months', label: 'Месяцев', type: 'number', unit: 'мес' },
    { name: 'years', label: 'Лет', type: 'number', unit: 'лет' }
  ],
  calculate: (inputs) => {
    const currentLength = Number(inputs.currentLength);
    const desiredLength = Number(inputs.desiredLength);
    const growthRate = Number(inputs.growthRate);

    if (!currentLength || !desiredLength || !growthRate || desiredLength <= currentLength) {
      return [{ value: 'Желаемая длина должна быть больше текущей', label: 'Результат' }];
    }

    const diffCm = desiredLength - currentLength;
    const diffMm = diffCm * 10;
    const months = diffMm / growthRate;
    const days = Math.round(months * 30.44);
    const years = months / 12;

    return [
      { value: days, label: 'Дней', unit: 'дн' },
      { value: Math.round(months * 10) / 10, label: 'Месяцев', unit: 'мес' },
      { value: Math.round(years * 100) / 100, label: 'Лет', unit: 'лет' }
    ];
  },
  content: {
    howTo: 'Введите текущую длину волос, желаемую длину и скорость роста (по умолчанию 12 мм/мес — средний показатель). Калькулятор рассчитает, сколько времени потребуется.',
    about: 'Волосы человека в среднем растут на 10-15 мм в месяц (около 1-1.5 см). Скорость роста зависит от генетики, возраста, питания, состояния здоровья и ухода.',
    usage: 'Используется для планирования стрижки, оценки времени до достижения желаемой длины, планирования причёски к важному событию.',
    formula: 'Время (мес) = (Желаемая длина − Текущая длина) × 10 / Скорость роста (мм/мес)',
    faq: [
      {
        question: 'Какова средняя скорость роста волос?',
        answer: 'В среднем волосы растут на 1-1.5 см (10-15 мм) в месяц, или около 12-18 см в год. Это примерно 0.3-0.5 мм в сутки.'
      },
      {
        question: 'Можно ли ускорить рост волос?',
        answer: 'Полностью ускорить рост невозможно из-за генетических ограничений, но можно оптимизировать: сбалансированное питание (белки, железо, цинк, витамины группы B), достаточный сон, уменьшение стресса, бережный уход (меньше горячих инструментов, щадящие средства).'
      },
      {
        question: 'Почему волосы растут медленнее зимой?',
        answer: 'В холодное время года рост волос может замедляться из-за снижения кровообращения кожи головы, недостатка витамина D и общего замедления обмена веществ.'
      },
      {
        question: 'Влияет ли стрижка кончиков на рост волос?',
        answer: 'Стрижка кончиков не ускоряет рост волос из корней, но предотвращает сечение и ломкость, благодаря чему волосы сохраняют длину и выглядят длиннее и здоровее.'
      }
    ],
    sources: [
      { title: 'Рост волос — Википедия', url: 'https://ru.wikipedia.org/wiki/Волосы' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: '10 см → 30 см', url: '/rost-volos?currentLength=10&desiredLength=30' },
    { value: '5 см → 50 см', url: '/rost-volos?currentLength=5&desiredLength=50' }
  ]
};

export const healthCalculators = [
  bmiCalculator,
  caloriesCalculator,
  bmrCalculator,
  tdeeCalculator,
  alcoholSimpleCalculator,
  braSizeCalculator,
  hairGrowthCalculator,
];
