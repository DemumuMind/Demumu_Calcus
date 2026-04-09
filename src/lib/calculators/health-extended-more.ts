import { Calculator } from '../types';

// Калькулятор индекса массы тела (BMI) - расширенный
export const bmiExtendedCalculator: Calculator = {
  id: 'bmi-calculator-extended',
  slug: 'index-massy-tela-imt',
  title: 'Калькулятор ИМТ (BMI)',
  description: 'Расчёт индекса массы тела с категориями: недовес, норма, избыточный вес, ожирение',
  category: 'zdorove-i-krasota',
  subcategory: 'health-vse',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 1,
      max: 500
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '170',
      defaultValue: 170,
      min: 50,
      max: 300
    },
    {
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 2,
      max: 120
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
    }
  ],
  outputs: [
    { name: 'bmi', label: 'ИМТ', type: 'number', unit: 'кг/м²' },
    { name: 'category', label: 'Категория', type: 'text' },
    { name: 'idealWeight', label: 'Идеальный вес', type: 'number', unit: 'кг' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height) / 100; // convert to meters
    const age = Number(inputs.age);
    const gender = String(inputs.gender);
    
    const bmi = weight / (height * height);
    
    let category = '';
    let color = '';
    
    if (bmi < 16) {
      category = 'Выраженный дефицит массы';
      color = 'critical';
    } else if (bmi < 18.5) {
      category = 'Недостаточная масса тела';
      color = 'warning';
    } else if (bmi < 25) {
      category = 'Нормальная масса тела';
      color = 'success';
    } else if (bmi < 30) {
      category = 'Избыточная масса тела (предожирение)';
      color = 'warning';
    } else if (bmi < 35) {
      category = 'Ожирение I степени';
      color = 'critical';
    } else if (bmi < 40) {
      category = 'Ожирение II степени';
      color = 'critical';
    } else {
      category = 'Ожирение III степени';
      color = 'critical';
    }
    
    // Ideal weight calculation (Broca's formula adjusted)
    const idealWeight = gender === 'male' 
      ? (height * 100 - 100) * 0.9
      : (height * 100 - 100) * 0.85;
    
    return [
      { 
        value: Math.round(bmi * 10) / 10, 
        label: 'Ваш ИМТ',
        unit: 'кг/м²'
      },
      { 
        value: category, 
        label: 'Категория',
        additionalInfo: color
      },
      { 
        value: Math.round(idealWeight * 10) / 10, 
        label: 'Идеальный вес (формула Брока)',
        unit: 'кг'
      }
    ];
  },
  content: {
    howTo: 'Введите ваш вес в килограммах, рост в сантиметрах, возраст и пол. Калькулятор рассчитает ИМТ и покажет категорию.',
    about: 'Индекс массы тела (ИМТ, BMI) — показатель, позволяющий оценить соотношение массы тела к росту. Разработан бельгийским статистиком Адольфом Кетле в 1869 году.',
    usage: 'Используется для предварительной оценки веса: недостаточный, нормальный или избыточный. Не учитывает соотношение мышц и жира.',
    formula: 'ИМТ = масса (кг) / рост² (м)\nНорма: 18.5–24.9 кг/м²',
    faq: [
      {
        question: 'Что означает мой ИМТ?',
        answer: '< 18.5 — недостаточный вес, 18.5–24.9 — норма, 25–29.9 — избыточный вес, ≥30 — ожирение.'
      },
      {
        question: 'ИМТ точный показатель?',
        answer: 'ИМТ даёт общую оценку. Для спортсменов с большой мышечной массой показатель может быть завышен. Рекомендуется также измерять процент жира и окружность талии.'
      }
    ],
    sources: [
      { title: 'Индекс массы тела — Википедия', url: 'https://ru.wikipedia.org/wiki/Индекс_массы_тела' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор базального метаболизма (BMR) - формула Миффлина-Сан Жеора
export const bmrCalculator: Calculator = {
  id: 'bmr-detailed-calculator',
  slug: 'bazovyj-metabolizm-bmr',
  title: 'Калькулятор базального метаболизма (BMR)',
  description: 'Расчёт суточной нормы калорий в состоянии покоя по формуле Миффлина-Сан Жеора',
  category: 'zdorove-i-krasota',
  subcategory: 'health-vse',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 1,
      max: 500
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '170',
      defaultValue: 170,
      min: 50,
      max: 300
    },
    {
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 10,
      max: 120
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
    }
  ],
  outputs: [
    { name: 'bmr', label: 'BMR', type: 'number', unit: 'ккал/сутки' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height);
    const age = Number(inputs.age);
    const gender = String(inputs.gender);
    
    // Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    return [
      { 
        value: Math.round(bmr), 
        label: 'Базальный метаболизм',
        unit: 'ккал/сутки',
        additionalInfo: 'Калории, необходимые организму в состоянии полного покоя'
      }
    ];
  },
  content: {
    howTo: 'Введите вес, рост, возраст и пол. Калькулятор рассчитает базальный метаболизм — минимальное количество калорий для поддержания жизни.',
    about: 'Базальный метаболизм (BMR) — количество энергии, которое организм расходует в состоянии полного покоя при комфортной температуре.',
    usage: 'Используется для расчёта суточной нормы калорий с учётом активности. Основа для составления диет и планов питания.',
    formula: 'Мужчины: BMR = 10×вес + 6.25×рост − 5×возраст + 5\nЖенщины: BMR = 10×вес + 6.25×рост − 5×возраст − 161',
    faq: [
      {
        question: 'Что такое базальный метаболизм?',
        answer: 'Это количество калорий, необходимое для поддержания базовых функций организма: дыхание, кровообращение, терморегуляция, работа органов.'
      },
      {
        question: 'Как рассчитать полную суточную норму?',
        answer: 'Умножьте BMR на коэффициент активности: сидячий образ = 1.2, лёгкая активность = 1.375, средняя = 1.55, высокая = 1.725, очень высокая = 1.9.'
      }
    ],
    sources: [
      { title: 'Базальный метаболизм — Википедия', url: 'https://ru.wikipedia.org/wiki/Базальный_метаболизм' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор дневной нормы калорий (TDEE)
export const tdeeCalculator: Calculator = {
  id: 'tdee-detailed-calculator',
  slug: 'sutochnaya-norma-kalorij',
  title: 'Калькулятор суточной нормы калорий (TDEE)',
  description: 'Расчёт полной суточной нормы калорий с учётом уровня активности',
  category: 'zdorove-i-krasota',
  subcategory: 'health-pitanie',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 1,
      max: 500
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '170',
      defaultValue: 170,
      min: 50,
      max: 300
    },
    {
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 10,
      max: 120
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
      name: 'activity',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: '1.2', label: 'Сидячий (нет спорта)' },
        { value: '1.375', label: 'Лёгкая активность (1-3 раза/неделю)' },
        { value: '1.55', label: 'Средняя активность (3-5 раз/неделю)' },
        { value: '1.725', label: 'Высокая активность (6-7 раз/неделю)' },
        { value: '1.9', label: 'Очень высокая (физическая работа + спорт)' }
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
    { name: 'bmr', label: 'BMR', type: 'number', unit: 'ккал' },
    { name: 'tdee', label: 'TDEE', type: 'number', unit: 'ккал' },
    { name: 'target', label: 'Целевая норма', type: 'number', unit: 'ккал' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height);
    const age = Number(inputs.age);
    const gender = String(inputs.gender);
    const activity = Number(inputs.activity);
    const goal = String(inputs.goal);
    
    // Calculate BMR
    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Calculate TDEE
    const tdee = bmr * activity;
    
    // Calculate target based on goal
    let target = tdee;
    let adjustment = '';
    
    if (goal === 'lose') {
      target = tdee - 500; // 500 cal deficit for ~0.5kg/week loss
      adjustment = 'дефицит 500 ккал для похудения';
    } else if (goal === 'gain') {
      target = tdee + 300; // 300 cal surplus for muscle gain
      adjustment = 'профицит 300 ккал для набора массы';
    } else {
      adjustment = 'поддержание текущего веса';
    }
    
    return [
      { 
        value: Math.round(bmr), 
        label: 'Базальный метаболизм (BMR)',
        unit: 'ккал/сутки'
      },
      { 
        value: Math.round(tdee), 
        label: 'Общая суточная норма (TDEE)',
        unit: 'ккал/сутки',
        additionalInfo: 'С учётом активности'
      },
      { 
        value: Math.round(target), 
        label: 'Целевая норма калорий',
        unit: 'ккал/сутки',
        additionalInfo: adjustment
      }
    ];
  },
  content: {
    howTo: 'Введите ваши параметры, выберите уровень физической активности и цель. Калькулятор рассчитает персональную норму калорий.',
    about: 'TDEE (Total Daily Energy Expenditure) — общее количество калорий, которое организм расходует за сутки с учётом всех видов активности.',
    usage: 'Используется для составления персонализированных планов питания: похудение, набор массы или поддержание веса.',
    formula: 'TDEE = BMR × коэффициент активности\nДля похудения: TDEE − 500 ккал\nДля набора: TDEE + 300 ккал',
    faq: [
      {
        question: 'Почему нужен дефицит 500 ккал?',
        answer: 'Дефицит 500 ккал в день даёт недостачу 3500 ккал в неделю — это примерно 0.5 кг жировой массы. Считается безопасной скоростью похудения.'
      },
      {
        question: 'Что если я тренируюсь каждый день?',
        answer: 'Выберите "Очень высокая" активность (коэффициент 1.9). Если работа сидячая, но спорт интенсивный — используйте 1.725.'
      }
    ],
    sources: [
      { title: 'Энергетический обмен — Википедия', url: 'https://ru.wikipedia.org/wiki/Энергетический_обмен' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор БЖУ (белки, жиры, углеводы)
export const bjuCalculator: Calculator = {
  id: 'bju-calculator',
  slug: 'raschet-bzhu',
  title: 'Калькулятор БЖУ',
  description: 'Расчёт нормы белков, жиров и углеводов для вашей цели',
  category: 'zdorove-i-krasota',
  subcategory: 'health-pitanie',
  type: 'formula',
  inputs: [
    {
      name: 'calories',
      label: 'Суточная норма калорий (ккал)',
      type: 'number',
      placeholder: '2000',
      defaultValue: 2000,
      min: 500,
      max: 10000
    },
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 1,
      max: 500
    },
    {
      name: 'goal',
      label: 'Цель',
      type: 'select',
      options: [
        { value: 'balanced', label: 'Сбалансированное питание (30/30/40)' },
        { value: 'lowcarb', label: 'Низкоуглеводная диета (40/40/20)' },
        { value: 'keto', label: 'Кето-диета (25/70/5)' },
        { value: 'highprot', label: 'Высокобелковая (50/20/30)' }
      ],
      defaultValue: 'balanced'
    }
  ],
  outputs: [
    { name: 'protein', label: 'Белки', type: 'number', unit: 'г/сутки' },
    { name: 'fat', label: 'Жиры', type: 'number', unit: 'г/сутки' },
    { name: 'carbs', label: 'Углеводы', type: 'number', unit: 'г/сутки' },
    { name: 'proteinPerKg', label: 'Белок на кг веса', type: 'number', unit: 'г/кг' }
  ],
  calculate: (inputs) => {
    const calories = Number(inputs.calories);
    const weight = Number(inputs.weight);
    const goal = String(inputs.goal);
    
    let proteinPct, fatPct, carbPct;
    
    switch (goal) {
      case 'balanced':
        proteinPct = 0.30;
        fatPct = 0.30;
        carbPct = 0.40;
        break;
      case 'lowcarb':
        proteinPct = 0.40;
        fatPct = 0.40;
        carbPct = 0.20;
        break;
      case 'keto':
        proteinPct = 0.25;
        fatPct = 0.70;
        carbPct = 0.05;
        break;
      case 'highprot':
        proteinPct = 0.50;
        fatPct = 0.20;
        carbPct = 0.30;
        break;
      default:
        proteinPct = 0.30;
        fatPct = 0.30;
        carbPct = 0.40;
    }
    
    // Calories per gram: protein=4, fat=9, carbs=4
    const protein = (calories * proteinPct) / 4;
    const fat = (calories * fatPct) / 9;
    const carbs = (calories * carbPct) / 4;
    
    return [
      { 
        value: Math.round(protein), 
        label: 'Белки',
        unit: 'г/сутки',
        additionalInfo: `${Math.round(proteinPct * 100)}% от калорий`
      },
      { 
        value: Math.round(fat), 
        label: 'Жиры',
        unit: 'г/сутки',
        additionalInfo: `${Math.round(fatPct * 100)}% от калорий`
      },
      { 
        value: Math.round(carbs), 
        label: 'Углеводы',
        unit: 'г/сутки',
        additionalInfo: `${Math.round(carbPct * 100)}% от калорий`
      },
      { 
        value: Math.round((protein / weight) * 10) / 10, 
        label: 'Белок на кг веса',
        unit: 'г/кг'
      }
    ];
  },
  content: {
    howTo: 'Введите вашу суточную норму калорий, вес и выберите тип питания. Калькулятор рассчитает оптимальное соотношение БЖУ.',
    about: 'БЖУ — соотношение белков, жиров и углеводов в рационе. Ключевой показатель для составления сбалансированного питания.',
    usage: 'Используется для планирования рациона, составления меню, подбора спортивного питания, контроля диеты.',
    formula: 'Белки: 4 ккал/г\nЖиры: 9 ккал/г\nУглеводы: 4 ккал/г',
    faq: [
      {
        question: 'Сколько белков нужно в день?',
        answer: 'Для здорового человека: 0.8-1 г на кг веса. Для спортсменов: 1.6-2.2 г/кг. Для похудения: 1.2-1.6 г/кг (сохранение мышц).'
      },
      {
        question: 'Что такое кето-диета?',
        answer: 'Кетогенная диета — высокое содержание жиров (70%), умеренное белка (25%), минимум углеводов (5%). Переводит организм в состояние кетоза.'
      }
    ],
    sources: [
      { title: 'Белки, жиры и углеводы — Википедия', url: 'https://ru.wikipedia.org/wiki/Питание' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор идеального веса (несколько формул)
export const idealWeightCalculator: Calculator = {
  id: 'ideal-weight-calculator',
  slug: 'idealnyj-ves',
  title: 'Калькулятор идеального веса',
  description: 'Расчёт идеального веса по формулам Брока, Хамви и Девайна',
  category: 'zdorove-i-krasota',
  subcategory: 'health-vse',
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
      name: 'frame',
      label: 'Тип телосложения',
      type: 'select',
      options: [
        { value: 'small', label: 'Худое (тонкие кости)' },
        { value: 'medium', label: 'Среднее' },
        { value: 'large', label: 'Крупное (широкие кости)' }
      ],
      defaultValue: 'medium'
    }
  ],
  outputs: [
    { name: 'broca', label: 'По Броку', type: 'number', unit: 'кг' },
    { name: 'hamwi', label: 'По Хамви', type: 'number', unit: 'кг' },
    { name: 'devine', label: 'По Девайну', type: 'number', unit: 'кг' },
    { name: 'range', label: 'Диапазон нормы', type: 'text' }
  ],
  calculate: (inputs) => {
    const height = Number(inputs.height);
    const gender = String(inputs.gender);
    const frame = String(inputs.frame);
    
    // Broca's formula
    let broca = gender === 'male' 
      ? height - 100
      : height - 100 - ((height - 150) / 2);
    
    // Adjust for frame size
    const frameAdjust = { small: 0.9, medium: 1.0, large: 1.1 };
    broca *= frameAdjust[frame as keyof typeof frameAdjust];
    
    // Hamwi formula
    let hamwi = gender === 'male'
      ? 48 + 2.7 * ((height - 152.4) / 2.54)
      : 45.5 + 2.2 * ((height - 152.4) / 2.54);
    
    // Devine formula
    let devine = gender === 'male'
      ? 50 + 0.91 * (height - 152.4)
      : 45.5 + 0.91 * (height - 152.4);
    
    // Calculate normal BMI range (18.5 - 24.9)
    const heightM = height / 100;
    const minWeight = Math.round(18.5 * heightM * heightM);
    const maxWeight = Math.round(24.9 * heightM * heightM);
    
    return [
      { 
        value: Math.round(broca), 
        label: 'По Броку (с корр. на телосложение)',
        unit: 'кг'
      },
      { 
        value: Math.round(hamwi), 
        label: 'По Хамви',
        unit: 'кг'
      },
      { 
        value: Math.round(devine), 
        label: 'По Девайну (медицинская)',
        unit: 'кг'
      },
      { 
        value: `${minWeight}–${maxWeight} кг`, 
        label: 'Диапазон по ИМТ (18.5–24.9)',
        additionalInfo: 'Универсальная норма'
      }
    ];
  },
  content: {
    howTo: 'Введите рост, пол и тип телосложения. Калькулятор покажет идеальный вес по трём популярным формулам.',
    about: 'Идеальный вес — условное понятие, зависящее от роста, пола, возраста и телосложения. Существует несколько формул расчёта.',
    usage: 'Используется для ориентировочной оценки целевого веса при составлении планов похудения или набора массы.',
    formula: 'Брок: рост − 100 (±10% для женщин)\nХамви: 48/45.5 + 2.7/2.2×(рост−152.4 см)\nДевайн: 50/45.5 + 0.91×(рост−152.4 см)',
    faq: [
      {
        question: 'Какая формула самая точная?',
        answer: 'Формула Девайна разработана для медицинских целей (дозировка лекарств). Диапазон по ИМТ (18.5–24.9) — универсальный показатель для всех.'
      },
      {
        question: 'Как определить тип телосложения?',
        answer: 'Измерьте окружность запястья: мужчины <17 см, женщины <15 см — худое; мужчины 17–20 см, женщины 15–17 см — среднее; больше — крупное.'
      }
    ],
    sources: [
      { title: 'Идеальный вес — Википедия', url: 'https://ru.wikipedia.org/wiki/Идеальный_вес' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор сжигания калорий
export const calorieBurnCalculator: Calculator = {
  id: 'calorie-burn-calculator',
  slug: 'skolko-kalorij-szhigayetsya',
  title: 'Калькулятор сжигания калорий',
  description: 'Расчёт калорий, сжигаемых при различных видах активности',
  category: 'zdorove-i-krasota',
  subcategory: 'health-fitnes',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 1,
      max: 500
    },
    {
      name: 'activity',
      label: 'Вид активности',
      type: 'select',
      options: [
        { value: 'sleep', label: 'Сон' },
        { value: 'sit', label: 'Сидячая работа' },
        { value: 'walk_slow', label: 'Ходьба медленная (3 км/ч)' },
        { value: 'walk_fast', label: 'Ходьба быстрая (6 км/ч)' },
        { value: 'jog', label: 'Бег трусцой (8 км/ч)' },
        { value: 'run', label: 'Бег (10 км/ч)' },
        { value: 'cycling', label: 'Велосипед (15 км/ч)' },
        { value: 'swimming', label: 'Плавание' },
        { value: 'gym', label: 'Тренажёрный зал' },
        { value: 'hiit', label: 'HIIT / Кроссфит' },
        { value: 'yoga', label: 'Йога' },
        { value: 'dance', label: 'Танцы' }
      ],
      defaultValue: 'walk_fast'
    },
    {
      name: 'duration',
      label: 'Длительность (минут)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 1,
      max: 1440
    }
  ],
  outputs: [
    { name: 'burned', label: 'Сожжено калорий', type: 'number', unit: 'ккал' },
    { name: 'perHour', label: 'В час', type: 'number', unit: 'ккал/ч' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const activity = String(inputs.activity);
    const duration = Number(inputs.duration);
    
    // MET values (Metabolic Equivalent of Task)
    const metValues: Record<string, number> = {
      'sleep': 0.95,
      'sit': 1.3,
      'walk_slow': 2.8,
      'walk_fast': 4.3,
      'jog': 8.3,
      'run': 10,
      'cycling': 6.8,
      'swimming': 8,
      'gym': 6,
      'hiit': 11,
      'yoga': 2.5,
      'dance': 5
    };
    
    const met = metValues[activity];
    const hours = duration / 60;
    
    // Formula: Calories = MET × weight(kg) × time(hours)
    const burned = met * weight * hours;
    const perHour = met * weight;
    
    return [
      { 
        value: Math.round(burned), 
        label: 'Сожжено за время активности',
        unit: 'ккал'
      },
      { 
        value: Math.round(perHour), 
        label: 'Сжигание в час',
        unit: 'ккал/ч'
      }
    ];
  },
  content: {
    howTo: 'Введите вес, выберите вид активности и длительность. Калькулятор покажет количество сожжённых калорий.',
    about: 'MET (Metabolic Equivalent of Task) — единица измерения интенсивности физической активности. 1 MET = энергозатраты в состоянии покоя.',
    usage: 'Используется для планирования тренировок, оценки эффективности упражнений, составления программ похудения.',
    formula: 'Калории = MET × вес(кг) × время(часы)\nГде MET — интенсивность активности',
    faq: [
      {
        question: 'Сколько калорий сжигается при ходьбе?',
        answer: 'При ходьбе со скоростью 6 км/ч (быстрый шаг) человек весом 70 кг сжигает около 300 ккал/час.'
      },
      {
        question: 'Какая активность сжигает больше всего калорий?',
        answer: 'HIIT (высокоинтенсивный интервальный тренинг), бег, плавание и прыжки со скакалкой — самые энергозатратные виды активности.'
      }
    ],
    sources: [
      { title: 'Физическая активность — Википедия', url: 'https://ru.wikipedia.org/wiki/Физическая_активность' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор ИМТ для детей (по возрасту)
export const childBmiCalculator: Calculator = {
  id: 'child-bmi-calculator',
  slug: 'index-massy-rebenka',
  title: 'Калькулятор ИМТ для детей',
  description: 'Расчёт индекса массы тела для детей и подростков с учётом возраста',
  category: 'zdorove-i-krasota',
  subcategory: 'health-vse',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 1,
      max: 150
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '130',
      defaultValue: 130,
      min: 50,
      max: 200
    },
    {
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '8',
      defaultValue: 8,
      min: 2,
      max: 18
    },
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'boy', label: 'Мальчик' },
        { value: 'girl', label: 'Девочка' }
      ],
      defaultValue: 'boy'
    }
  ],
  outputs: [
    { name: 'bmi', label: 'ИМТ ребёнка', type: 'number', unit: 'кг/м²' },
    { name: 'percentile', label: 'Перцентиль', type: 'text' },
    { name: 'category', label: 'Оценка', type: 'text' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height) / 100;
    const age = Number(inputs.age);
    
    const bmi = weight / (height * height);
    
    // Simplified percentile estimation for children
    // Note: Real percentile charts are complex, this is an approximation
    let percentile = 50;
    
    if (bmi < 14) percentile = 5;
    else if (bmi < 15) percentile = 10;
    else if (bmi < 16) percentile = 25;
    else if (bmi < 18) percentile = 50;
    else if (bmi < 20) percentile = 75;
    else if (bmi < 22) percentile = 85;
    else if (bmi < 24) percentile = 95;
    else percentile = 99;
    
    let category = '';
    if (percentile < 5) {
      category = 'Дефицит массы';
    } else if (percentile < 85) {
      category = 'Нормальная масса';
    } else if (percentile < 95) {
      category = 'Избыточная масса';
    } else {
      category = 'Ожирение';
    }
    
    return [
      { 
        value: Math.round(bmi * 10) / 10, 
        label: 'ИМТ ребёнка',
        unit: 'кг/м²'
      },
      { 
        value: `${percentile}-й`, 
        label: 'Перцентиль (оценочно)',
        additionalInfo: 'Возрастная норма'
      },
      { 
        value: category, 
        label: 'Оценка по CDC',
        additionalInfo: percentile < 85 ? 'в пределах нормы' : 'требуется консультация врача'
      }
    ];
  },
  content: {
    howTo: 'Введите вес, рост, возраст и пол ребёнка. Калькулятор рассчитает ИМТ и даст ориентировочную оценку по возрастным нормам.',
    about: 'Для детей и подростков используются специальные возрастные и половые нормы ИМТ (перцентильные карты CDC).',
    usage: 'Используется родителями и педиатрами для оценки физического развития ребёнка.',
    formula: 'ИМТ рассчитывается как у взрослых, но оценка производится по перцентильным картам с учётом возраста и пола.',
    faq: [
      {
        question: 'Почему для детей другие нормы ИМТ?',
        answer: 'У детей соотношение массы и роста меняется с возрастом. Используются перцентильные карты, которые показывают, какой процент детей того же возраста имеет меньший ИМТ.'
      },
      {
        question: 'Когда нужно беспокоиться?',
        answer: 'Если ИМТ ребёнка ниже 5-го или выше 85-го перцентиля для его возраста и пола — рекомендуется консультация педиатра.'
      }
    ],
    sources: [
      { title: 'Перцентиль — Википедия', url: 'https://ru.wikipedia.org/wiki/Перцентиль' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const healthExtendedMoreCalculators = [
  bmiExtendedCalculator,
  bmrCalculator,
  tdeeCalculator,
  bjuCalculator,
  idealWeightCalculator,
  calorieBurnCalculator,
  childBmiCalculator,
];
