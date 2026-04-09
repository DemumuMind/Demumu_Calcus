import { Calculator } from '../types';

// База данных калорийности продуктов (на 100г)
const foodDatabase: Record<string, { name: string; calories: number; protein: number; fat: number; carbs: number }> = {
  'apple': { name: 'Яблоко', calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
  'banana': { name: 'Банан', calories: 89, protein: 1.1, fat: 0.3, carbs: 23 },
  'chicken': { name: 'Куриная грудка', calories: 165, protein: 31, fat: 3.6, carbs: 0 },
  'beef': { name: 'Говядина', calories: 250, protein: 26, fat: 15, carbs: 0 },
  'rice': { name: 'Рис белый', calories: 130, protein: 2.7, fat: 0.3, carbs: 28 },
  'pasta': { name: 'Макароны', calories: 131, protein: 5, fat: 1.1, carbs: 25 },
  'bread': { name: 'Хлеб белый', calories: 265, protein: 9, fat: 3.2, carbs: 49 },
  'milk': { name: 'Молоко 3.2%', calories: 62, protein: 3.2, fat: 3.2, carbs: 4.8 },
  'cheese': { name: 'Сыр твёрдый', calories: 350, protein: 25, fat: 27, carbs: 2 },
  'eggs': { name: 'Яйцо куриное', calories: 155, protein: 13, fat: 11, carbs: 1.1 },
  'potato': { name: 'Картофель', calories: 77, protein: 2, fat: 0.1, carbs: 17 },
  'cucumber': { name: 'Огурец', calories: 16, protein: 0.7, fat: 0.1, carbs: 3.6 },
  'tomato': { name: 'Помидор', calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9 },
  'buckwheat': { name: 'Гречка', calories: 132, protein: 4.5, fat: 1.6, carbs: 27 },
  'oatmeal': { name: 'Овсянка', calories: 68, protein: 2.4, fat: 1.4, carbs: 12 },
  'kefir': { name: 'Кефир 2.5%', calories: 52, protein: 2.9, fat: 2.5, carbs: 4 },
  'cottage': { name: 'Творог 5%', calories: 120, protein: 17, fat: 5, carbs: 3 },
  'salmon': { name: 'Лосось', calories: 208, protein: 20, fat: 13, carbs: 0 },
  'cod': { name: 'Треска', calories: 82, protein: 18, fat: 0.7, carbs: 0 },
  'carrot': { name: 'Морковь', calories: 41, protein: 0.9, fat: 0.2, carbs: 10 },
  'beet': { name: 'Свёкла', calories: 43, protein: 1.6, fat: 0.2, carbs: 10 },
  'onion': { name: 'Лук', calories: 40, protein: 1.1, fat: 0.1, carbs: 9 },
  'garlic': { name: 'Чеснок', calories: 149, protein: 6.4, fat: 0.5, carbs: 33 },
  'cabbage': { name: 'Капуста белокочанная', calories: 25, protein: 1.3, fat: 0.1, carbs: 6 },
  'pepper': { name: 'Перец болгарский', calories: 27, protein: 1, fat: 0.3, carbs: 6 },
  'zucchini': { name: 'Кабачок', calories: 17, protein: 1.2, fat: 0.3, carbs: 3.1 },
  'eggplant': { name: 'Баклажан', calories: 25, protein: 1, fat: 0.2, carbs: 6 },
  'mushrooms': { name: 'Шампиньоны', calories: 22, protein: 2, fat: 0.3, carbs: 3.3 },
  'nuts': { name: 'Грецкие орехи', calories: 654, protein: 15, fat: 65, carbs: 14 },
  'honey': { name: 'Мёд', calories: 304, protein: 0.3, fat: 0, carbs: 82 },
  'sugar': { name: 'Сахар', calories: 387, protein: 0, fat: 0, carbs: 100 },
  'butter': { name: 'Сливочное масло', calories: 717, protein: 0.9, fat: 81, carbs: 0.1 },
  'sourcream': { name: 'Сметана 15%', calories: 158, protein: 2.7, fat: 15, carbs: 3 },
  'yogurt': { name: 'Йогурт натуральный', calories: 63, protein: 5, fat: 1.5, carbs: 7 },
  'turkey': { name: 'Индейка', calories: 135, protein: 30, fat: 1, carbs: 0 },
  'pork': { name: 'Свинина постная', calories: 143, protein: 26, fat: 4, carbs: 0 },
  'lamb': { name: 'Баранина', calories: 294, protein: 25, fat: 21, carbs: 0 },
  'beans': { name: 'Фасоль красная', calories: 127, protein: 8.7, fat: 0.5, carbs: 22 },
  'lentils': { name: 'Чечевица', calories: 116, protein: 9, fat: 0.4, carbs: 20 },
  'peas': { name: 'Горох', calories: 81, protein: 5, fat: 0.4, carbs: 14 },
  'corn': { name: 'Кукуруза', calories: 86, protein: 3.2, fat: 1.2, carbs: 19 },
  'orange': { name: 'Апельсин', calories: 47, protein: 0.9, fat: 0.1, carbs: 12 },
  'grape': { name: 'Виноград', calories: 69, protein: 0.7, fat: 0.2, carbs: 18 },
  'pear': { name: 'Груша', calories: 57, protein: 0.4, fat: 0.1, carbs: 15 },
  'plum': { name: 'Слива', calories: 46, protein: 0.7, fat: 0.3, carbs: 11 },
  'peach': { name: 'Персик', calories: 39, protein: 0.9, fat: 0.3, carbs: 10 },
  'strawberry': { name: 'Клубника', calories: 32, protein: 0.7, fat: 0.3, carbs: 8 },
  'blueberry': { name: 'Черника', calories: 57, protein: 0.7, fat: 0.3, carbs: 14 },
  'watermelon': { name: 'Арбуз', calories: 30, protein: 0.6, fat: 0.2, carbs: 8 },
  'melon': { name: 'Дыня', calories: 34, protein: 0.8, fat: 0.2, carbs: 8 },
  'pumpkin': { name: 'Тыква', calories: 26, protein: 1, fat: 0.1, carbs: 7 }
};

// Калькулятор калорийности продуктов
export const foodCalorieCalculator: Calculator = {
  id: 'food-calories',
  slug: 'kaloriynost-produktov',
  title: 'Калькулятор калорийности продуктов',
  description: 'Расчёт калорийности и БЖУ для популярных продуктов',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'foodItem',
      label: 'Продукт',
      type: 'select',
      options: Object.entries(foodDatabase).map(([key, value]) => ({
        value: key,
        label: value.name
      })),
      defaultValue: 'chicken'
    },
    {
      name: 'weight',
      label: 'Вес (г)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 1,
      max: 2000
    }
  ],
  outputs: [
    { name: 'calories', label: 'Калорийность', type: 'number', unit: 'ккал' },
    { name: 'protein', label: 'Белки', type: 'number', unit: 'г' },
    { name: 'fat', label: 'Жиры', type: 'number', unit: 'г' },
    { name: 'carbs', label: 'Углеводы', type: 'number', unit: 'г' }
  ],
  calculate: (inputs) => {
    const foodItem = String(inputs.foodItem);
    const weight = Number(inputs.weight);
    
    if (!foodItem || !foodDatabase[foodItem]) {
      return [{ value: 'Выберите продукт', label: 'Результат' }];
    }
    
    const food = foodDatabase[foodItem];
    const ratio = weight / 100;
    
    return [
      { value: Math.round(food.calories * ratio), label: 'Калорийность', unit: 'ккал' },
      { value: (food.protein * ratio).toFixed(1), label: 'Белки', unit: 'г' },
      { value: (food.fat * ratio).toFixed(1), label: 'Жиры', unit: 'г' },
      { value: (food.carbs * ratio).toFixed(1), label: 'Углеводы', unit: 'г' }
    ];
  },
  content: {
    howTo: 'Выберите продукт из списка и укажите вес в граммах.',
    about: 'Калькулятор показывает калорийность и содержание белков, жиров и углеводов для популярных продуктов.',
    usage: 'Используйте для планирования рациона, подсчёта калорий, составления меню.',
    formula: 'Калории = Калории на 100г × (вес / 100)',
    faq: [
      {
        question: 'Откуда взяты данные?',
        answer: 'Данные о калорийности взяты из справочников USDA и российских таблиц состава продуктов.'
      },
      {
        question: 'Почему в списке нет некоторых продуктов?',
        answer: 'База содержит наиболее популярные продукты. Для других продуктов используйте информацию с упаковки.'
      },
      {
        question: 'Учитывается ли способ приготовления?',
        answer: 'Данные даны для сырых продуктов. При жарке калорийность увеличивается из-за добавления масла.'
      }
    ],
    sources: [
      { title: 'USDA FoodData Central', url: 'https://fdc.nal.usda.gov/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор дефицита/профицита калорий
export const calorieDeficitCalculator: Calculator = {
  id: 'calorie-deficit',
  slug: 'deficit-kaloriy',
  title: 'Калькулятор дефицита/профицита калорий',
  description: 'Расчёт целевого потребления калорий для похудения или набора веса',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'tdee',
      label: 'TDEE (суточный расход калорий)',
      type: 'number',
      placeholder: '2000',
      defaultValue: 2000,
      min: 800,
      max: 5000
    },
    {
      name: 'goal',
      label: 'Цель',
      type: 'select',
      options: [
        { value: 'lose', label: 'Похудение' },
        { value: 'maintain', label: 'Поддержание веса' },
        { value: 'gain', label: 'Набор веса' }
      ],
      defaultValue: 'lose'
    },
    {
      name: 'rate',
      label: 'Темп изменения веса',
      type: 'select',
      options: [
        { value: '0.25', label: '0.25 кг/неделю (медленно)' },
        { value: '0.5', label: '0.5 кг/неделю (оптимально)' },
        { value: '0.75', label: '0.75 кг/неделю (быстро)' },
        { value: '1', label: '1 кг/неделю (агрессивно)' }
      ],
      defaultValue: '0.5'
    },
    {
      name: 'currentWeight',
      label: 'Текущий вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 30,
      max: 300
    },
    {
      name: 'targetWeight',
      label: 'Целевой вес (кг)',
      type: 'number',
      placeholder: '65',
      defaultValue: 65,
      min: 30,
      max: 300
    }
  ],
  outputs: [
    { name: 'targetCalories', label: 'Целевое потребление калорий', type: 'number', unit: 'ккал/день' },
    { name: 'deficitSurplus', label: 'Дефицит/профицит', type: 'number', unit: 'ккал' },
    { name: 'weeklyChange', label: 'Еженедельное изменение', type: 'text' },
    { name: 'timeToGoal', label: 'Время до цели', type: 'text' }
  ],
  calculate: (inputs) => {
    const tdee = Number(inputs.tdee);
    const goal = String(inputs.goal);
    const rate = Number(inputs.rate);
    const currentWeight = Number(inputs.currentWeight);
    const targetWeight = Number(inputs.targetWeight);
    
    if (!tdee || !currentWeight || !targetWeight) {
      return [{ value: 'Заполните все поля', label: 'Результат' }];
    }
    
    // 1 кг жира = 7700 ккал
    const weeklyCalorieChange = rate * 7700;
    const dailyCalorieChange = weeklyCalorieChange / 7;
    
    let targetCalories = tdee;
    if (goal === 'lose') {
      targetCalories = Math.max(1000, tdee - dailyCalorieChange);
    } else if (goal === 'gain') {
      targetCalories = tdee + dailyCalorieChange;
    }
    
    const weightDifference = currentWeight - targetWeight;
    const weeksToGoal = Math.abs(weightDifference) / rate;
    const daysToGoal = Math.round(weeksToGoal * 7);
    
    return [
      { value: Math.round(targetCalories), label: 'Целевое потребление калорий', unit: 'ккал/день' },
      { value: Math.round(dailyCalorieChange), label: 'Дефицит/профицит', unit: 'ккал' },
      { value: `${goal === 'lose' ? '−' : goal === 'gain' ? '+' : ''}${rate} кг/неделю`, label: 'Еженедельное изменение' },
      { value: daysToGoal < 30 ? `${daysToGoal} дней` : `${Math.round(weeksToGoal)} недель`, label: 'Время до цели' }
    ];
  },
  content: {
    howTo: 'Введите ваш TDEE (общий энергетический расход), выберите цель и темп изменения веса.',
    about: 'Калькулятор определяет, сколько калорий нужно потреблять для достижения цели веса. 1 кг жира содержит примерно 7700 ккал.',
    usage: 'Используйте для планирования диеты, контроля потери или набора веса.',
    formula: 'Целевые калории = TDEE ± (7 700 ккал × кг в неделю / 7 дней)',
    faq: [
      {
        question: 'Что такое TDEE?',
        answer: 'TDEE (Total Daily Energy Expenditure) — общий суточный расход энергии. Складывается из базового обмена веществ (BMR) и активности.'
      },
      {
        question: 'Какой дефицит безопасен?',
        answer: 'Рекомендуется дефицит 300-500 ккал для потери 0.25-0.5 кг в неделю. Агрессивные диеты могут замедлить метаболизм.'
      },
      {
        question: 'Почему важен белок при похудении?',
        answer: 'При дефиците калорий белок помогает сохранить мышечную массу. Рекомендуется 1.6-2.2 г белка на кг веса.'
      }
    ],
    sources: [
      { title: 'Рекомендации WHO по ожирению', url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор дневной активности (PAL)
export const dailyActivityCalculator: Calculator = {
  id: 'daily-activity',
  slug: 'dnevnaya-aktivnost',
  title: 'Калькулятор дневной активности (PAL)',
  description: 'Расчёт коэффициента физической активности и суточного расхода энергии',
  category: 'zdorove-i-krasota',
  subcategory: 'sport-i-aktivnost',
  type: 'formula',
  inputs: [
    {
      name: 'bmr',
      label: 'BMR (базовый обмен веществ)',
      type: 'number',
      placeholder: '1500',
      defaultValue: 1500,
      min: 800,
      max: 3000
    },
    {
      name: 'activityLevel',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: '1.2', label: 'Сидячий (мало или нет упражнений)' },
        { value: '1.375', label: 'Низкий (лёгкие прогулки 1-3 дня/нед)' },
        { value: '1.55', label: 'Средний (умеренные тренировки 3-5 дней/нед)' },
        { value: '1.725', label: 'Высокий (интенсивные тренировки 6-7 дней/нед)' },
        { value: '1.9', label: 'Очень высокий (тяжёлая физическая работа)' }
      ],
      defaultValue: '1.375'
    },
    {
      name: 'exerciseHours',
      label: 'Часов тренировок в неделю',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 0,
      max: 30
    }
  ],
  outputs: [
    { name: 'tdee', label: 'TDEE (суточный расход)', type: 'number', unit: 'ккал' },
    { name: 'pal', label: 'Коэффициент PAL', type: 'number' },
    { name: 'caloriesFromActivity', label: 'Калории от активности', type: 'number', unit: 'ккал' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const bmr = Number(inputs.bmr);
    const activityLevel = Number(inputs.activityLevel);
    const exerciseHours = Number(inputs.exerciseHours);
    
    if (!bmr) return [{ value: 'Введите BMR', label: 'Результат' }];
    
    const tdee = Math.round(bmr * activityLevel);
    const caloriesFromActivity = Math.round(tdee - bmr);
    
    let recommendation = '';
    if (exerciseHours < 2) {
      recommendation = 'Рекомендуется увеличить активность до 150 минут в неделю (ВОЗ)';
    } else if (exerciseHours < 5) {
      recommendation = 'Хороший уровень активности. Для улучшения здоровья стремитесь к 300 минутам в неделю';
    } else {
      recommendation = 'Отличный уровень активности! Поддерживайте баланс тренировок и восстановления';
    }
    
    return [
      { value: tdee.toString(), label: 'TDEE (суточный расход)', unit: 'ккал' },
      { value: activityLevel.toString(), label: 'Коэффициент PAL' },
      { value: caloriesFromActivity.toString(), label: 'Калории от активности', unit: 'ккал' },
      { value: recommendation, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Введите ваш BMR (можно рассчитать в калькуляторе BMR), выберите уровень активности и укажите часы тренировок.',
    about: 'PAL (Physical Activity Level) — коэффициент физической активности, показывающий во сколько раз ваш расход энергии превышает базовый обмен.',
    usage: 'Используйте для определения TDEE, планирования диеты, оценки уровня активности.',
    formula: 'TDEE = BMR × PAL\nPAL варьируется от 1.2 (сидячий) до 1.9 (очень активный)',
    faq: [
      {
        question: 'Как рассчитать BMR?',
        answer: 'BMR (Basal Metabolic Rate) рассчитывается по формулам Миффлина-Сан Жеора или Харриса-Бенедикта. Можно использовать отдельный калькулятор BMR.'
      },
      {
        question: 'Какой PAL нормальный?',
        answer: 'Для здоровых взрослых нормальный PAL составляет 1.4-1.7. Сидячий образ жизни (PAL < 1.4) ассоциируется с повышенным риском заболеваний.'
      },
      {
        question: 'Влияет ли PAL на здоровье?',
        answer: 'Да, низкий PAL связан с повышенным риском ожирения, диабета 2 типа и сердечно-сосудистых заболеваний. ВОЗ рекомендует минимум 150 минут умеренной активности в неделю.'
      }
    ],
    sources: [
      { title: 'Physical Activity Level — FAO', url: 'http://www.fao.org/3/Y5686E/y5686e07.htm' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор идеального пульса (целевых пульсовых зон)
export const targetHeartRateCalculator: Calculator = {
  id: 'target-heart-rate',
  slug: 'idealnyj-puls',
  title: 'Калькулятор идеального пульса',
  description: 'Расчёт целевых пульсовых зон для тренировок',
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
    },
    {
      name: 'fitnessLevel',
      label: 'Уровень подготовки',
      type: 'select',
      options: [
        { value: 'beginner', label: 'Начинающий' },
        { value: 'intermediate', label: 'Средний' },
        { value: 'advanced', label: 'Продвинутый' }
      ],
      defaultValue: 'intermediate'
    }
  ],
  outputs: [
    { name: 'maxHR', label: 'Максимальный пульс', type: 'number', unit: 'уд/мин' },
    { name: 'restingHR', label: 'Пульс в покое', type: 'number', unit: 'уд/мин' },
    { name: 'warmUpZone', label: 'Разминка (50-60%)', type: 'text' },
    { name: 'fatBurnZone', label: 'Жиросжигание (60-70%)', type: 'text' },
    { name: 'cardioZone', label: 'Кардио (70-80%)', type: 'text' },
    { name: 'anaerobicZone', label: 'Анаэробная (80-90%)', type: 'text' }
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age);
    const restingHR = Number(inputs.restingHR);
    
    if (!age || !restingHR) return [{ value: '—', label: 'Результат' }];
    
    // Формула Танака: 208 − 0.7 × возраст (более точная, чем 220 − возраст)
    const maxHR = Math.round(208 - 0.7 * age);
    const hrr = maxHR - restingHR; // Heart Rate Reserve
    
    const calculateZone = (minPct: number, maxPct: number) => {
      const minHR = Math.round(restingHR + hrr * minPct);
      const maxHR = Math.round(restingHR + hrr * maxPct);
      return `${minHR} — ${maxHR}`;
    };
    
    return [
      { value: maxHR.toString(), label: 'Максимальный пульс', unit: 'уд/мин' },
      { value: restingHR.toString(), label: 'Пульс в покое', unit: 'уд/мин' },
      { value: calculateZone(0.5, 0.6), label: 'Разминка (50-60%)' },
      { value: calculateZone(0.6, 0.7), label: 'Жиросжигание (60-70%)' },
      { value: calculateZone(0.7, 0.8), label: 'Кардио (70-80%)' },
      { value: calculateZone(0.8, 0.9), label: 'Анаэробная (80-90%)' }
    ];
  },
  content: {
    howTo: 'Введите ваш возраст и пульс в покое. Пульс в покое измеряйте утром до подъёма с кровати.',
    about: 'Целевые пульсовые зоны помогают тренироваться эффективно и безопасно. Каждая зона имеет свои преимущества: разминка подготавливает организм, зона жиросжигания оптимальна для сжигания жира, кардиозона развивает выносливость, анаэробная зона развивает силу и скорость.',
    usage: 'Используйте пульсометр или фитнес-браслет для контроля пульса во время тренировок.',
    formula: 'Макс. пульс = 208 − 0.7 × возраст\nЦелевая зона = Пульс в покое + (Макс. пульс − Пульс в покое) × %',
    faq: [
      {
        question: 'Как правильно измерить пульс в покое?',
        answer: 'Измеряйте утром до подъёма с кровати. Приложите два пальца к запястью или шее, считайте пульс в течение 30 секунд и умножьте на 2.'
      },
      {
        question: 'В какой зоне лучше всего тренироваться для похудения?',
        answer: 'Зона жиросжигания (60-70% от максимума) считается оптимальной для сжигания жира. Однако общий расход калорий важнее выбора зоны.'
      },
      {
        question: 'Что такое Heart Rate Reserve (HRR)?',
        answer: 'HRR — запас сердечного ритма, разница между максимальным пульсом и пульсом в покое. Используется в методе Карвонена для точного расчёта зон.'
      }
    ],
    sources: [
      { title: 'Target Heart Rate and Estimated Maximum Heart Rate — CDC', url: 'https://www.cdc.gov/physicalactivity/basics/measuring/heartrate.htm' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор дозировки лекарств
export const medicationDosageCalculator: Calculator = {
  id: 'medication-dosage',
  slug: 'dozirovka-lekarstv',
  title: 'Калькулятор дозировки лекарств',
  description: 'Расчёт дозировки лекарств для детей по весу',
  category: 'zdorove-i-krasota',
  subcategory: 'beremennost-i-deti',
  type: 'formula',
  inputs: [
    {
      name: 'childWeight',
      label: 'Вес ребёнка (кг)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15,
      min: 1,
      max: 100
    },
    {
      name: 'medication',
      label: 'Лекарство',
      type: 'select',
      options: [
        { value: 'paracetamol', label: 'Парацетамол (жаропонижающее)' },
        { value: 'ibuprofen', label: 'Ибупрофен (жаропонижающее/противовоспалительное)' },
        { value: 'amoxicillin', label: 'Амоксициллин (антибиотик)' },
        { value: 'claritin', label: 'Лоратадин (антигистаминное)' }
      ],
      defaultValue: 'paracetamol'
    }
  ],
  outputs: [
    { name: 'singleDose', label: 'Разовая доза', type: 'text' },
    { name: 'dailyMax', label: 'Максимальная суточная доза', type: 'text' },
    { name: 'frequency', label: 'Частота приёма', type: 'text' },
    { name: 'warning', label: 'Важно', type: 'text' }
  ],
  calculate: (inputs) => {
    const childWeight = Number(inputs.childWeight);
    const medication = String(inputs.medication);
    
    if (!childWeight) return [{ value: 'Введите вес ребёнка', label: 'Результат' }];
    
    const dosages: Record<string, {
      singlePerKg: number;
      maxPerKg: number;
      frequency: string;
      unit: string;
      maxSingle: number;
      maxDaily: number;
    }> = {
      'paracetamol': {
        singlePerKg: 10, // 10-15 мг/кг
        maxPerKg: 60, // 60 мг/кг/сутки
        frequency: 'Каждые 4-6 часов, не более 4 раз в сутки',
        unit: 'мг',
        maxSingle: 1000,
        maxDaily: 4000
      },
      'ibuprofen': {
        singlePerKg: 5, // 5-10 мг/кг
        maxPerKg: 30, // 30 мг/кг/сутки
        frequency: 'Каждые 6-8 часов, 3 раза в сутки',
        unit: 'мг',
        maxSingle: 400,
        maxDaily: 1200
      },
      'amoxicillin': {
        singlePerKg: 20, // 20-40 мг/кг/приём
        maxPerKg: 80, // до 80 мг/кг/сутки
        frequency: '2-3 раза в сутки (каждые 8-12 часов)',
        unit: 'мг',
        maxSingle: 1000,
        maxDaily: 3000
      },
      'claritin': {
        singlePerKg: 0.2, // ~5 мг для ребёнка >30 кг
        maxPerKg: 0.2,
        frequency: '1 раз в сутки',
        unit: 'мг',
        maxSingle: 10,
        maxDaily: 10
      }
    };
    
    const dose = dosages[medication];
    const calculatedSingle = Math.min(childWeight * dose.singlePerKg, dose.maxSingle);
    const calculatedDaily = Math.min(childWeight * dose.maxPerKg, dose.maxDaily);
    
    return [
      { value: `${calculatedSingle.toFixed(0)} ${dose.unit}`, label: 'Разовая доза' },
      { value: `${calculatedDaily.toFixed(0)} ${dose.unit}`, label: 'Максимальная суточная доза' },
      { value: dose.frequency, label: 'Частота приёма' },
      { value: '⚠️ Консультируйтесь с врачом перед применением любых лекарств', label: 'Важно' }
    ];
  },
  content: {
    howTo: 'Введите вес ребёнка и выберите лекарство. Калькулятор покажет примерную дозировку.',
    about: 'Калькулятор рассчитывает дозировку лекарств для детей на основе веса. Важно: это только ориентировочные данные, всегда консультируйтесь с педиатром!',
    usage: 'Используйте для предварительной оценки дозировки. Не заменяет консультацию врача.',
    formula: 'Доза = Вес ребёнка × Стандартная доза на кг\nОграничена максимальной разовой и суточной дозой',
    faq: [
      {
        question: 'Можно ли давать парацетамол грудничкам?',
        answer: 'Да, с 3 месяцев. Дозировка 10 мг/кг. Для детей до 3 месяцев только по назначению врача.'
      },
      {
        question: 'Как часто можно давать жаропонижающее?',
        answer: 'Парацетамол каждые 4-6 часов, не более 4 раз в сутки. Ибупрофен каждые 6-8 часов. Не превышайте суточную дозу!'
      },
      {
        question: 'Что делать, если ребёнок больше весит, чем указано для возраста?',
        answer: 'Дозировка рассчитывается по фактическому весу, не по возрасту. Это особенно важно для детей с избыточным весом.'
      }
    ],
    sources: [
      { title: 'Парацетамол — Википедия', url: 'https://ru.wikipedia.org/wiki/Парацетамол' },
      { title: 'Ибупрофен — Википедия', url: 'https://ru.wikipedia.org/wiki/Ибупрофен' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор ИМТ для азиатских популяций
export const bmiAsianCalculator: Calculator = {
  id: 'bmi-asian',
  slug: 'imt-dlya-aziatov',
  title: 'Калькулятор ИМТ для азиатских популяций',
  description: 'Расчёт индекса массы тела с азиатскими пороговыми значениями',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '65',
      defaultValue: 65,
      min: 20,
      max: 300
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '165',
      defaultValue: 165,
      min: 100,
      max: 250
    }
  ],
  outputs: [
    { name: 'bmi', label: 'Индекс массы тела', type: 'number' },
    { name: 'whoCategory', label: 'Категория (WHO)', type: 'text' },
    { name: 'asianCategory', label: 'Категория (азиатские пороги)', type: 'text' },
    { name: 'healthRisk', label: 'Оценка риска', type: 'text' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height);
    
    if (!weight || !height) return [{ value: '—', label: 'Результат' }];
    
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    
    // Категории WHO
    let whoCategory = '';
    if (bmi < 18.5) whoCategory = 'Недостаточный вес';
    else if (bmi < 25) whoCategory = 'Норма';
    else if (bmi < 30) whoCategory = 'Избыточный вес';
    else whoCategory = 'Ожирение';
    
    // Азиатские пороги (WHO Western Pacific Region, 2000)
    let asianCategory = '';
    let healthRisk = '';
    
    if (bmi < 18.5) {
      asianCategory = 'Недостаточный вес';
      healthRisk = 'Низкий риск, но возможны другие проблемы со здоровьем';
    } else if (bmi < 23) {
      asianCategory = 'Норма';
      healthRisk = 'Низкий риск';
    } else if (bmi < 27.5) {
      asianCategory = 'Повышенный вес';
      healthRisk = 'Умеренный риск заболеваний';
    } else {
      asianCategory = 'Ожирение';
      healthRisk = 'Высокий риск диабета, сердечно-сосудистых заболеваний';
    }
    
    return [
      { value: bmi.toFixed(1), label: 'Индекс массы тела' },
      { value: whoCategory, label: 'Категория (WHO)' },
      { value: asianCategory, label: 'Категория (азиатские пороги)' },
      { value: healthRisk, label: 'Оценка риска' }
    ];
  },
  content: {
    howTo: 'Введите ваш вес в килограммах и рост в сантиметрах.',
    about: 'Для азиатских популяций (Китай, Япония, Корея, страны Южной и Юго-Восточной Азии) риски заболеваний начинаются при более низком ИМТ. ВОЗ рекомендует пороги: норма < 23, повышенный вес 23-27.5, ожирение > 27.5.',
    usage: 'Используйте для оценки веса, если у вас азиатское происхождение.',
    formula: 'ИМТ = Вес (кг) / Рост² (м²)\nАзиатские пороги: < 23 норма, 23-27.5 повышенный, > 27.5 ожирение',
    faq: [
      {
        question: 'Почему азиатские пороги отличаются?',
        answer: 'Исследования показывают, что представители азиатских популяций имеют повышенный риск диабета 2 типа и сердечно-сосудистых заболеваний при более низком ИМТ, чем европеоидные популяции.'
      },
      {
        question: 'Подходит ли это для всех азиатов?',
        answer: 'Да, эти пороги рекомендованы ВОЗ для китайцев, японцев, корейцев, филиппинцев, вьетнамцев, индийцев и других азиатских популяций.'
      },
      {
        question: 'Какой ИМТ считается оптимальным для азиатов?',
        answer: 'Согласно азиатским порогам ВОЗ, оптимальный ИМТ — от 18.5 до 23. При ИМТ 23-27.5 рекомендуется контроль веса.'
      }
    ],
    sources: [
      { title: 'WHO Expert Consultation on Asian BMI Cut-offs', url: 'https://www.who.int/publications/i/item/obesity-preventing-and-managing-the-global-epidemic' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор метаболического возраста
export const metabolicAgeCalculator: Calculator = {
  id: 'metabolic-age',
  slug: 'metabolicheskij-vozrast',
  title: 'Калькулятор метаболического возраста',
  description: 'Оценка метаболического возраста на основе базового обмена веществ',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'age',
      label: 'Хронологический возраст (лет)',
      type: 'number',
      placeholder: '35',
      defaultValue: 35,
      min: 10,
      max: 100
    },
    {
      name: 'bmr',
      label: 'BMR (базовый обмен, ккал/день)',
      type: 'number',
      placeholder: '1500',
      defaultValue: 1500,
      min: 500,
      max: 3000
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
    { name: 'metabolicAge', label: 'Метаболический возраст', type: 'number', unit: 'лет' },
    { name: 'difference', label: 'Разница с хронологическим', type: 'text' },
    { name: 'interpretation', label: 'Интерпретация', type: 'text' }
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age);
    const bmr = Number(inputs.bmr);
    const gender = String(inputs.gender);
    
    if (!age || !bmr) return [{ value: '—', label: 'Результат' }];
    
    // Средний BMR по возрасту и полу (примерные данные)
    const averageBMR: Record<string, Record<number, number>> = {
      'male': {
        20: 1800, 25: 1750, 30: 1700, 35: 1650, 40: 1600,
        45: 1550, 50: 1500, 55: 1450, 60: 1400, 65: 1350
      },
      'female': {
        20: 1400, 25: 1350, 30: 1300, 35: 1250, 40: 1200,
        45: 1150, 50: 1100, 55: 1050, 60: 1000, 65: 950
      }
    };
    
    // Находим ближайший возраст в таблице
    const ages = Object.keys(averageBMR[gender]).map(Number);
    const closestAge = ages.reduce((prev, curr) => 
      Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev
    );
    
    const avgBMR = averageBMR[gender][closestAge];
    
    // Метаболический возраст оцениваем на основе разницы BMR
    // Каждые ±100 ккал ≈ ±5 лет
    const bmrDifference = bmr - avgBMR;
    const ageAdjustment = Math.round(bmrDifference / 100 * 5);
    const metabolicAge = Math.max(10, age - ageAdjustment);
    
    const difference = metabolicAge - age;
    let differenceText = '';
    if (difference < 0) {
      differenceText = `На ${Math.abs(difference)} лет моложе`;
    } else if (difference > 0) {
      differenceText = `На ${difference} лет старше`;
    } else {
      differenceText = 'Совпадает';
    }
    
    let interpretation = '';
    if (difference <= -5) {
      interpretation = 'Отличный метаболизм! Высокий BMR указывает на хорошую мышечную массу и активный образ жизни.';
    } else if (difference < 0) {
      interpretation = 'Хороший метаболизм. Ваше тело функционирует эффективнее среднего показателя.';
    } else if (difference === 0) {
      interpretation = 'Метаболизм соответствует среднему для вашего возраста.';
    } else if (difference <= 5) {
      interpretation: 'Метаболизм ниже среднего. Рекомендуется увеличить физическую активность и силовые тренировки.';
    } else {
      interpretation = 'Метаболизм значительно ниже среднего. Рекомендуется консультация врача и разработка плана по улучшению метаболизма.';
    }
    
    return [
      { value: metabolicAge.toString(), label: 'Метаболический возраст', unit: 'лет' },
      { value: differenceText, label: 'Разница с хронологическим' },
      { value: interpretation, label: 'Интерпретация' }
    ];
  },
  content: {
    howTo: 'Введите ваш хронологический возраст и BMR (базовый обмен веществ). BMR можно получить из калькулятора BMR или биоимпедансного анализа.',
    about: 'Метаболический возраст — это оценка эффективности обмена веществ в организме. Если он ниже хронологического — это хороший знак. Если выше — может указывать на замедленный метаболизм.',
    usage: 'Используйте для оценки общего состояния метаболизма и мотивации к улучшению физической формы.',
    formula: 'Метаболический возраст оценивается сравнением вашего BMR со средними показателями для возрастной группы.',
    faq: [
      {
        question: 'Как улучшить метаболический возраст?',
        answer: 'Силовые тренировки для наращивания мышц, регулярный приём пищи, достаточный сон (7-9 часов), высокобелковая диета, HIIT-тренировки.'
      },
      {
        question: 'Насколько точна эта оценка?',
        answer: 'Это приблизительная оценка. Точный метаболический возраст требует специального тестирования (RMR-тест). Калькулятор даёт общее представление.'
      },
      {
        question: 'Что влияет на BMR больше всего?',
        answer: 'Мышечная масса — основной фактор. Также влияют: гормоны, температура тела, возраст, пол, генетика.'
      }
    ],
    sources: [
      { title: 'Metabolic Age — Healthline', url: 'https://www.healthline.com/health/metabolic-age' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор соотношения талии и бёдер (WHR)
export const whrCalculator: Calculator = {
  id: 'whr',
  slug: 'otnoshenie-talii-bedra',
  title: 'Калькулятор индекса талии/бёдер (WHR)',
  description: 'Расчёт соотношения обхвата талии к обхвату бёдер и оценка здоровья',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'waist',
      label: 'Обхват талии (см)',
      type: 'number',
      placeholder: '80',
      defaultValue: 80,
      min: 40,
      max: 150
    },
    {
      name: 'hip',
      label: 'Обхват бёдер (см)',
      type: 'number',
      placeholder: '95',
      defaultValue: 95,
      min: 50,
      max: 150
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
    { name: 'whr', label: 'Индекс WHR', type: 'number' },
    { name: 'riskCategory', label: 'Категория риска', type: 'text' },
    { name: 'healthRisk', label: 'Оценка риска заболеваний', type: 'text' },
    { name: 'idealWaist', label: 'Рекомендуемый обхват талии', type: 'text' }
  ],
  calculate: (inputs) => {
    const waist = Number(inputs.waist);
    const hip = Number(inputs.hip);
    const gender = String(inputs.gender);
    
    if (!waist || !hip) return [{ value: '—', label: 'Результат' }];
    
    const whr = waist / hip;
    
    // Категории риска по WHO
    let riskCategory = '';
    let healthRisk = '';
    
    if (gender === 'male') {
      if (whr < 0.9) {
        riskCategory = 'Низкий риск';
        healthRisk = 'Минимальный риск сердечно-сосудистых заболеваний и диабета 2 типа';
      } else if (whr < 1.0) {
        riskCategory = 'Умеренный риск';
        healthRisk = 'Повышенный риск метаболических заболеваний';
      } else {
        riskCategory = 'Высокий риск';
        healthRisk = 'Значительно повышенный риск инфаркта, инсульта, диабета 2 типа';
      }
    } else {
      if (whr < 0.8) {
        riskCategory = 'Низкий риск';
        healthRisk = 'Минимальный риск сердечно-сосудистых заболеваний и диабета 2 типа';
      } else if (whr < 0.85) {
        riskCategory = 'Умеренный риск';
        healthRisk = 'Повышенный риск метаболических заболеваний';
      } else {
        riskCategory = 'Высокий риск';
        healthRisk = 'Значительно повышенный риск инфаркта, инсульта, диабета 2 типа';
      }
    }
    
    // Рекомендуемый обхват талии
    const idealWaist = gender === 'male' 
      ? `Менее ${Math.round(hip * 0.9)} см`
      : `Менее ${Math.round(hip * 0.8)} см`;
    
    return [
      { value: whr.toFixed(2), label: 'Индекс WHR' },
      { value: riskCategory, label: 'Категория риска' },
      { value: healthRisk, label: 'Оценка риска заболеваний' },
      { value: idealWaist, label: 'Рекомендуемый обхват талии' }
    ];
  },
  content: {
    howTo: 'Измерьте обхват талии на уровне пупка и обхват бёдер в самом широком месте. Введите значения в сантиметрах.',
    about: 'Индекс WHR (Waist-to-Hip Ratio) — это отношение обхвата талии к обхвату бёдер. Показывает, где в организме откладывается жир. Жир в области живота («яблочное» ожирение) более опасен для здоровья, чем жир на бёдрах и ягодицах («грушевидное» ожирение).',
    usage: 'Используйте вместе с ИМТ для более полной оценки рисков, связанных с весом.',
    formula: 'WHR = Обхват талии / Обхват бёдер\nДля мужчин норма < 0.9, для женщин < 0.8',
    faq: [
      {
        question: 'Почему WHR важнее ИМТ?',
        answer: 'WHR лучше предсказывает риск сердечно-сосудистых заболеваний и диабета, так как учитывает распределение жира. Жир вокруг внутренних органов (висцеральный) наиболее опасен.'
      },
      {
        question: 'Как правильно измерить талию?',
        answer: 'Измеряйте на уровне пупка в конце выдоха, не втягивая живот. Лента должна плотно прилегать к коже, но не врезаться.'
      },
      {
        question: 'Можно ли улучшить WHR?',
        answer: 'Да! Силовые тренировки, кардио и здоровое питание помогают снизить висцеральный жир. Грушевидное тело сложнее изменить, но общая потеря веса улучшит показатели.'
      }
    ],
    sources: [
      { title: 'Waist-hip ratio — WHO', url: 'https://www.who.int/publications/i/item/obesity-preventing-and-managing-the-global-epidemic' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Экспорт всех калькуляторов
export const healthMore1Calculators = [
  foodCalorieCalculator,
  calorieDeficitCalculator,
  dailyActivityCalculator,
  targetHeartRateCalculator,
  medicationDosageCalculator,
  bmiAsianCalculator,
  metabolicAgeCalculator,
  whrCalculator
];
