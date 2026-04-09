import { Calculator } from '../types';

// Калькулятор расчёта калорий для набора массы
export const bulkingCalculator: Calculator = {
  id: 'bulking-calculator',
  slug: 'kalkulyator-nabora-massy',
  title: 'Калькулятор набора массы',
  description: 'Расчёт калорий и БЖУ для чистого набора мышечной массы без жира',
  category: 'zdorove',
  subcategory: 'fitness',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      min: 40,
      max: 150,
      defaultValue: 70
    },
    {
      name: 'bodyfat',
      label: 'Процент жира (%)',
      type: 'number',
      placeholder: '15',
      min: 5,
      max: 40,
      defaultValue: 15
    },
    {
      name: 'activity',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: 'sedentary', label: 'Малоподвижный' },
        { value: 'light', label: 'Лёгкая активность' },
        { value: 'moderate', label: 'Умеренная (3 тренировки)' },
        { value: 'active', label: 'Активный (5 тренировок)' },
        { value: 'very_active', label: 'Очень активный (6+ тренировок)' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'surplus',
      label: 'Профицит калорий',
      type: 'select',
      options: [
        { value: 'conservative', label: 'Консервативный (+10%) — минимум жира' },
        { value: 'moderate', label: 'Умеренный (+15%) — оптимальный баланс' },
        { value: 'aggressive', label: 'Агрессивный (+20%) — быстрый набор' }
      ],
      defaultValue: 'moderate'
    }
  ],
  outputs: [
    { name: 'calories', label: 'Калорий в день', type: 'number', unit: 'ккал' },
    { name: 'protein', label: 'Белков', type: 'number', unit: 'г' },
    { name: 'fats', label: 'Жиров', type: 'number', unit: 'г' },
    { name: 'carbs', label: 'Углеводов', type: 'number', unit: 'г' },
    { name: 'leanMass', label: 'Сухая мышечная масса', type: 'number', unit: 'кг' },
    { name: 'expectedGain', label: 'Ожидаемый прирост', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const weight = Number(inputs.weight || 70);
    const bodyfat = Number(inputs.bodyfat || 15);
    const activity = String(inputs.activity || 'moderate');
    const surplus = String(inputs.surplus || 'moderate');
    
    // Calculate lean mass (muscle mass without fat)
    const leanMass = weight * (1 - bodyfat / 100);
    
    // BMR using Katch-McArdle (based on lean mass)
    const bmr = 370 + (21.6 * leanMass);
    
    // Activity multipliers
    const activityMult: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    const tdee = bmr * activityMult[activity];
    
    // Surplus
    const surplusMult: Record<string, number> = {
      conservative: 1.1,
      moderate: 1.15,
      aggressive: 1.2
    };
    
    const calories = Math.round(tdee * surplusMult[surplus]);
    
    // Macros for bulking
    const protein = Math.round(leanMass * 2.2); // 2.2g per kg of lean mass
    const fats = Math.round(calories * 0.25 / 9); // 25% of calories
    const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);
    
    let expectedGain = '';
    if (surplus === 'conservative') {
      expectedGain = '0.25-0.5 кг/неделю (в основном мышцы)';
    } else if (surplus === 'moderate') {
      expectedGain = '0.5-0.75 кг/неделю (баланс мышц и жира)';
    } else {
      expectedGain = '0.75-1 кг/неделю (может быть много жира)';
    }
    
    return [
      { value: calories, label: 'Калорий в день', unit: 'ккал' },
      { value: protein, label: 'Белков', unit: 'г' },
      { name: 'fats', value: fats, label: 'Жиров', unit: 'г' },
      { value: carbs, label: 'Углеводов', unit: 'г' },
      { value: Math.round(leanMass), label: 'Сухая мышечная масса', unit: 'кг' },
      { value: expectedGain, label: 'Ожидаемый прирост' }
    ];
  },
  content: {
    howTo: 'Введите ваш вес, процент жира, уровень активности и желаемый профицит. Калькулятор рассчитает калории и БЖУ для набора массы.',
    about: 'Для набора мышечной массы нужен профицит калорий 10-20% над расходом. Белок должен быть высоким (2-2.5г на кг сухой массы).',
    formula: 'Калории = BMR × Активность × (1 + Профицит)\nБелок = 2.2г × сухая масса\nЖиры = 25% калорий\nУглеводы = Остальное',
    faq: [
      { question: 'Как быстро набирать мышечную массу?', answer: 'Оптимум — 0.5-1% от веса тела в неделю. Быстрее = больше жира. Набор 2-4 кг чистых мышц в месяц — хороший результат для новичка.' },
      { question: 'Нужен ли профицит на тренировочный день?', answer: 'Можно сделать циклирование калорий: +300-500 ккал в тренировочные дни, поддержание в выходные.' }
    ],
    sources: [
      { title: 'Muscle & Strength - Bulking Guide', url: 'https://www.muscleandstrength.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор расчёта калорий для сушки
export const cuttingCalculator: Calculator = {
  id: 'cutting-calculator',
  slug: 'kalkulyator-sushki',
  title: 'Калькулятор сушки тела',
  description: 'Расчёт калорий и БЖУ для снижения жировой массы с сохранением мышц',
  category: 'zdorove',
  subcategory: 'fitness',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '80',
      min: 50,
      max: 150,
      defaultValue: 80
    },
    {
      name: 'bodyfat',
      label: 'Текущий % жира',
      type: 'number',
      placeholder: '20',
      min: 8,
      max: 40,
      defaultValue: 20
    },
    {
      name: 'targetBodyfat',
      label: 'Целевой % жира',
      type: 'number',
      placeholder: '12',
      min: 6,
      max: 25,
      defaultValue: 12
    },
    {
      name: 'activity',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: 'sedentary', label: 'Малоподвижный' },
        { value: 'light', label: 'Лёгкая активность' },
        { value: 'moderate', label: 'Умеренная' },
        { value: 'active', label: 'Активный' }
      ],
      defaultValue: 'moderate'
    }
  ],
  outputs: [
    { name: 'calories', label: 'Калорий для сушки', type: 'number', unit: 'ккал' },
    { name: 'protein', label: 'Белков', type: 'number', unit: 'г' },
    { name: 'fats', label: 'Жиров', type: 'number', unit: 'г' },
    { name: 'carbs', label: 'Углеводов', type: 'number', unit: 'г' },
    { name: 'deficit', label: 'Дефицит', type: 'number', unit: 'ккал' },
    { name: 'weeks', label: 'Время сушки', type: 'number', unit: 'нед' },
    { name: 'finalWeight', label: 'Итоговый вес', type: 'number', unit: 'кг' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const weight = Number(inputs.weight || 80);
    const bodyfat = Number(inputs.bodyfat || 20);
    const targetBodyfat = Number(inputs.targetBodyfat || 12);
    const activity = String(inputs.activity || 'moderate');
    
    // Calculate lean mass (maintain this during cut)
    const leanMass = weight * (1 - bodyfat / 100);
    
    // BMR using Katch-McArdle
    const bmr = 370 + (21.6 * leanMass);
    
    // Activity multipliers
    const activityMult: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };
    
    const tdee = bmr * activityMult[activity];
    
    // Deficit for cutting (20-25% deficit)
    const calories = Math.round(tdee * 0.75);
    const deficit = Math.round(tdee - calories);
    
    // High protein to preserve muscle
    const protein = Math.round(leanMass * 2.5); // 2.5g per kg lean mass
    const fats = Math.round(calories * 0.2 / 9); // 20% of calories
    const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);
    
    // Calculate time to reach target
    const fatToLose = weight * (bodyfat - targetBodyfat) / 100;
    // Safe fat loss: 0.5-1% of body weight per week, mostly fat
    const weeklyFatLoss = weight * 0.007; // 0.7% per week
    const weeks = Math.ceil(fatToLose / weeklyFatLoss);
    
    // Final weight (lean mass stays same, fat reduces)
    const finalFatMass = leanMass * targetBodyfat / (100 - targetBodyfat);
    const finalWeight = Math.round(leanMass + finalFatMass);
    
    return [
      { value: calories, label: 'Калорий для сушки', unit: 'ккал' },
      { value: protein, label: 'Белков', unit: 'г' },
      { value: fats, label: 'Жиров', unit: 'г' },
      { value: carbs, label: 'Углеводов', unit: 'г' },
      { value: deficit, label: 'Дефицит', unit: 'ккал' },
      { value: weeks, label: 'Время сушки', unit: 'нед' },
      { value: finalWeight, label: 'Итоговый вес', unit: 'кг' }
    ];
  },
  content: {
    howTo: 'Введите текущий вес, процент жира, целевой процент жира и активность. Калькулятор рассчитает план сушки.',
    about: 'Сушка (cutting) — процесс снижения жировой массы с сохранением мышц. Безопасная скорость потери — 0.5-1% веса в неделю. Высокий белок (2.5г/кг) сохраняет мышцы.',
    formula: 'Калории = TDEE × 0.75 (25% дефицит)\nБелок = 2.5г × сухая масса\nВремя = (Жир для сжигания) / (0.7% веса в неделю)',
    faq: [
      { question: 'Как сохранить мышцы при сушке?', answer: 'Высокий белок (2.5г/кг), силовые тренировки (не бег!), медленная сушка (не более 1% веса в неделю).' },
      { question: 'Можно ли убрать жир только с живота?', answer: 'Нет, локальное сжигание жира невозможно. Жир уходит равномерно со всего тела. Пресс виден при 10-12% жира у мужчин, 18-20% у женщин.' }
    ],
    sources: [
      { title: 'Bodybuilding.com - Cutting Guide', url: 'https://www.bodybuilding.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор одноповторного максимума (1RM)
export const oneRepMaxCalculator: Calculator = {
  id: 'one-rep-max-calculator',
  slug: 'odnopovtornyj-maksimum',
  title: 'Калькулятор 1RM',
  description: 'Расчёт одноповторного максимума (1RM) по формулам Бриzycki, Эпли и Ломбарди',
  category: 'zdorove',
  subcategory: 'fitness',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес штанги (кг)',
      type: 'number',
      placeholder: '80',
      min: 20,
      max: 500,
      defaultValue: 80
    },
    {
      name: 'reps',
      label: 'Количество повторов',
      type: 'number',
      placeholder: '8',
      min: 1,
      max: 20,
      defaultValue: 8
    },
    {
      name: 'exercise',
      label: 'Упражнение',
      type: 'select',
      options: [
        { value: 'bench', label: 'Жим лёжа' },
        { value: 'squat', label: 'Присед' },
        { value: 'deadlift', label: 'Становая тяга' },
        { value: 'press', label: 'Жим стоя' },
        { value: 'row', label: 'Тяга в наклоне' }
      ],
      defaultValue: 'bench'
    }
  ],
  outputs: [
    { name: 'brzycki', label: 'Бриzycki (самая точная)', type: 'number', unit: 'кг' },
    { name: 'epley', label: 'Эпли', type: 'number', unit: 'кг' },
    { name: 'lombardi', label: 'Ломбарди', type: 'number', unit: 'кг' },
    { name: 'average', label: 'Среднее значение', type: 'number', unit: 'кг' },
    { name: 'percentages', label: 'Проценты от 1RM', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const weight = Number(inputs.weight || 80);
    const reps = Number(inputs.reps || 8);
    const exercise = String(inputs.exercise || 'bench');
    
    if (reps === 1) {
      return [
        { value: weight, label: 'Бриzycki (самая точная)', unit: 'кг' },
        { value: weight, label: 'Эпли', unit: 'кг' },
        { value: weight, label: 'Ломбарди', unit: 'кг' },
        { value: weight, label: 'Среднее значение', unit: 'кг' },
        { value: '100% = твой максимум', label: 'Проценты от 1RM' }
      ];
    }
    
    // Brzycki formula: 1RM = weight / (1.0278 - 0.0278 × reps)
    const brzycki = weight / (1.0278 - 0.0278 * reps);
    
    // Epley formula: 1RM = weight × (1 + reps / 30)
    const epley = weight * (1 + reps / 30);
    
    // Lombardi formula: 1RM = weight × reps^0.10
    const lombardi = weight * Math.pow(reps, 0.10);
    
    const average = Math.round((brzycki + epley + lombardi) / 3);
    
    // Common percentages
    const percentages = '95%=' + Math.round(average * 0.95) + ' | 90%=' + Math.round(average * 0.90) + ' | 85%=' + Math.round(average * 0.85) + ' | 80%=' + Math.round(average * 0.80) + ' | 75%=' + Math.round(average * 0.75) + ' кг';
    
    return [
      { value: Math.round(brzycki), label: 'Бриzycki (самая точная)', unit: 'кг' },
      { value: Math.round(epley), label: 'Эпли', unit: 'кг' },
      { value: Math.round(lombardi), label: 'Ломбарди', unit: 'кг' },
      { value: average, label: 'Среднее значение', unit: 'кг' },
      { value: percentages, label: 'Проценты от 1RM' }
    ];
  },
  content: {
    howTo: 'Введите вес, с которым сделали повторы, количество повторов (1-20) и упражнение. Калькулятор оценит ваш 1RM.',
    about: '1RM (One Rep Max) — максимальный вес, который можно поднять один раз. Используется для планирования тренировочных программ. Формула Бриzycki считается самой точной для 1-10 повторов.',
    formula: 'Бриzycki: 1RM = вес / (1.0278 - 0.0278 × повторы)\nЭпли: 1RM = вес × (1 + повторы/30)\nЛомбарди: 1RM = вес × повторы^0.10',
    faq: [
      { question: 'Какая формула самая точная?', answer: 'Формула Бриzycki даёт лучшие результаты для 1-10 повторов. Для 10+ повторов все формулы менее точны.' },
      { question: 'Почему не тестировать 1RM напрямую?', answer: 'Тестирование реального 1RM рискованно для новичков и травмоопасно. Расчёт по формуле безопаснее.' }
    ],
    sources: [
      { title: 'NSCA - Strength Training', url: 'https://www.nsca.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор объёма тренировки
export const trainingVolumeCalculator: Calculator = {
  id: 'training-volume-calculator',
  slug: 'obyom-trenirovki',
  title: 'Калькулятор объёма тренировки',
  description: 'Расчёт общего объёма тренировки (вес × повторы × подходы) для отслеживания прогресса',
  category: 'zdorove',
  subcategory: 'fitness',
  type: 'formula',
  inputs: [
    {
      name: 'exercises',
      label: 'Количество упражнений',
      type: 'number',
      placeholder: '5',
      min: 1,
      max: 15,
      defaultValue: 5
    },
    {
      name: 'setsPerExercise',
      label: 'Подходов на упражнение',
      type: 'number',
      placeholder: '4',
      min: 1,
      max: 10,
      defaultValue: 4
    },
    {
      name: 'repsPerSet',
      label: 'Повторов в подходе',
      type: 'number',
      placeholder: '10',
      min: 1,
      max: 30,
      defaultValue: 10
    },
    {
      name: 'avgWeight',
      label: 'Средний вес (кг)',
      type: 'number',
      placeholder: '50',
      min: 5,
      max: 300,
      defaultValue: 50
    }
  ],
  outputs: [
    { name: 'totalSets', label: 'Всего подходов', type: 'number', unit: 'подх' },
    { name: 'totalReps', label: 'Всего повторов', type: 'number', unit: 'раз' },
    { name: 'volume', label: 'Объём тренировки', type: 'number', unit: 'кг' },
    { name: 'intensity', label: 'Интенсивность', type: 'text' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const exercises = Number(inputs.exercises || 5);
    const setsPerExercise = Number(inputs.setsPerExercise || 4);
    const repsPerSet = Number(inputs.repsPerSet || 10);
    const avgWeight = Number(inputs.avgWeight || 50);
    
    const totalSets = exercises * setsPerExercise;
    const totalReps = totalSets * repsPerSet;
    const volume = totalReps * avgWeight;
    
    let intensity = '';
    if (repsPerSet <= 5) {
      intensity = 'Высокая (силовая, низкое число повторов)';
    } else if (repsPerSet <= 12) {
      intensity = 'Средняя (гипертрофия, классический диапазон)';
    } else {
      intensity = 'Низкая (выносливость, высокое число повторов)';
    }
    
    let recommendation = '';
    if (totalSets > 30) {
      recommendation = '⚠️ Очень высокий объём! Риск перетренированности. Снизьте до 20-25 подходов.';
    } else if (totalSets < 12) {
      recommendation = 'Низкий объём. Добавьте упражнений или подходов для прогресса.';
    } else {
      recommendation = '✓ Оптимальный объём для роста (12-25 подходов на группу за тренировку).';
    }
    
    return [
      { value: totalSets, label: 'Всего подходов', unit: 'подх' },
      { value: totalReps, label: 'Всего повторов', unit: 'раз' },
      { value: volume, label: 'Объём тренировки', unit: 'кг' },
      { value: intensity, label: 'Интенсивность' },
      { value: recommendation, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Введите количество упражнений, подходов, повторов и средний вес. Калькулятор рассчитает общий объём.',
    about: 'Объём тренировки — ключевой показатель для гипертрофии. Meta-анализы показывают: 10-20 подходов на мышечную группу в неделю оптимальны для роста.',
    formula: 'Объём = Вес × Повторы × Подходы\nИли: Общий вес поднятый за тренировку',
    faq: [
      { question: 'Какой объём лучше для массы?', answer: 'Оптимум — 10-20 подходов на мышечную группу в неделю. Больше 20 — перетренированность, меньше 10 — недостаточный стимул.' },
      { question: 'Что важнее — объём или интенсивность?', answer: 'Для новичков — интенсивность (учим технику). Для опытных — объём (нужен больший стимул для роста).' }
    ],
    sources: [
      { title: 'Schoenfeld - Training Volume Meta-Analysis', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4836564/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор делoad (разгрузочной недели)
export const deloadCalculator: Calculator = {
  id: 'deload-calculator',
  slug: 'razgruzochnaya-nedelya',
  title: 'Калькулятор deload',
  description: 'Планирование разгрузочной недели для восстановления и предотвращения перетренированности',
  category: 'zdorove',
  subcategory: 'fitness',
  type: 'formula',
  inputs: [
    {
      name: 'currentVolume',
      label: 'Текущий объём (кг/неделю)',
      type: 'number',
      placeholder: '15000',
      min: 1000,
      max: 100000,
      defaultValue: 15000
    },
    {
      name: 'currentIntensity',
      label: 'Текущая интенсивность (% от 1RM)',
      type: 'number',
      placeholder: '80',
      min: 60,
      max: 95,
      defaultValue: 80
    },
    {
      name: 'deloadType',
      label: 'Тип deload',
      type: 'select',
      options: [
        { value: 'volume', label: 'Снижение объёма (-40%)' },
        { value: 'intensity', label: 'Снижение интенсивности (-20%)' },
        { value: 'full', label: 'Полный deload (-40% объёма, -15% интенсивности)' },
        { value: 'frequency', label: 'Снижение частоты (-50% тренировок)' }
      ],
      defaultValue: 'full'
    }
  ],
  outputs: [
    { name: 'newVolume', label: 'Объём на deload', type: 'number', unit: 'кг' },
    { name: 'newIntensity', label: 'Интенсивность на deload', type: 'number', unit: '%' },
    { name: 'sets', label: 'Подходов на упражнение', type: 'number', unit: 'подх' },
    { name: 'reps', label: 'Рекомендуемые повторы', type: 'text' },
    { name: 'rpe', label: 'Целевой RPE', type: 'text' },
    { name: 'duration', label: 'Длительность deload', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const currentVolume = Number(inputs.currentVolume || 15000);
    const currentIntensity = Number(inputs.currentIntensity || 80);
    const deloadType = String(inputs.deloadType || 'full');
    
    let newVolume = currentVolume;
    let newIntensity = currentIntensity;
    let sets = 3;
    let reps = '8-10 (лёгкие)';
    let rpe = 'RPE 6-7 (в запасе 3-4 повтора)';
    let duration = '1 неделя (3-4 тренировки)';
    
    switch (deloadType) {
      case 'volume':
        newVolume = Math.round(currentVolume * 0.6);
        newIntensity = currentIntensity;
        sets = 2;
        reps = '6-8 (умеренные)';
        break;
      case 'intensity':
        newVolume = currentVolume;
        newIntensity = Math.round(currentIntensity * 0.8);
        sets = 3;
        reps = '6-8 (не до отказа)';
        break;
      case 'full':
        newVolume = Math.round(currentVolume * 0.6);
        newIntensity = Math.round(currentIntensity * 0.85);
        sets = 2;
        reps = '5-8 (лёгкие, не до отказа)';
        rpe = 'RPE 5-6 (в запасе 4-5 повторов)';
        break;
      case 'frequency':
        newVolume = Math.round(currentVolume * 0.5);
        newIntensity = Math.round(currentIntensity * 0.85);
        sets = 3;
        duration = '1 неделя (2 тренировки вместо 4-5)';
        break;
    }
    
    return [
      { value: newVolume, label: 'Объём на deload', unit: 'кг' },
      { value: newIntensity, label: 'Интенсивность на deload', unit: '%' },
      { value: sets, label: 'Подходов на упражнение', unit: 'подх' },
      { value: reps, label: 'Рекомендуемые повторы' },
      { value: rpe, label: 'Целевой RPE' },
      { value: duration, label: 'Длительность deload' }
    ];
  },
  content: {
    howTo: 'Введите текущий объём и интенсивность, выберите тип deload. Калькулятор составит план разгрузки.',
    about: 'Deload (разгрузочная неделя) проводится каждые 4-8 недель для восстановления нервной системы и суставов. Снижение объёма/интенсивности позволяет организму адаптироваться.',
    formula: 'Deload = Текущий объём × 0.6 или Текущая интенсивность × 0.85\nНе тренироваться до отказа, оставлять запас в 3-5 повторов',
    faq: [
      { question: 'Когда нужен deload?', answer: 'Признаки: упадок сил, боли в суставах, нарушение сна, потеря аппетита, падение настроения. Обычно каждые 4-8 недель тяжёлого тренинга.' },
      { question: 'Можно ли пропустить deload?', answer: 'Новичкам (до 1 года) часто не нужен deload — прогресс быстрый. Опытным атлетам deload обязателен для профилактики перетренированности.' }
    ],
    sources: [
      { title: 'Renaissance Periodization - Fatigue Management', url: 'https://renaissanceperiodization.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор прогрессии нагрузки
export const progressiveOverloadCalculator: Calculator = {
  id: 'progressive-overload-calculator',
  slug: 'progressivnaya-nagruzka',
  title: 'Калькулятор прогрессии',
  description: 'Планирование увеличения весов для прогрессивной перегрузки по методам линейной и периодизации',
  category: 'zdorove',
  subcategory: 'fitness',
  type: 'formula',
  inputs: [
    {
      name: 'currentWeight',
      label: 'Текущий рабочий вес (кг)',
      type: 'number',
      placeholder: '80',
      min: 20,
      max: 300,
      defaultValue: 80
    },
    {
      name: 'weeks',
      label: 'На сколько недель план',
      type: 'number',
      placeholder: '4',
      min: 2,
      max: 12,
      defaultValue: 4
    },
    {
      name: 'progressionType',
      label: 'Тип прогрессии',
      type: 'select',
      options: [
        { value: 'linear', label: 'Линейная (+2.5 кг/неделю)' },
        { value: 'double', label: 'Двойная прогрессия (вес/повторы)' },
        { value: 'wave', label: 'Волновая (3 недели вверх, 1 вниз)' },
        { value: 'percentage', label: 'Процентная (от 1RM)' }
      ],
      defaultValue: 'linear'
    },
    {
      name: 'exerciseType',
      label: 'Тип упражнения',
      type: 'select',
      options: [
        { value: 'compound', label: 'Базовое (присед, жим, тяга)' },
        { value: 'isolation', label: 'Изолирующее (бицепс, трицепс)' }
      ],
      defaultValue: 'compound'
    }
  ],
  outputs: [
    { name: 'week1', label: 'Неделя 1', type: 'text' },
    { name: 'week2', label: 'Неделя 2', type: 'text' },
    { name: 'week3', label: 'Неделя 3', type: 'text' },
    { name: 'week4', label: 'Неделя 4', type: 'text' },
    { name: 'finalWeight', label: 'Итоговый вес', type: 'number', unit: 'кг' },
    { name: 'tips', label: 'Советы по прогрессии', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const currentWeight = Number(inputs.currentWeight || 80);
    const weeks = Number(inputs.weeks || 4);
    const progressionType = String(inputs.progressionType || 'linear');
    const exerciseType = String(inputs.exerciseType || 'compound');
    
    const progression = exerciseType === 'compound' ? 2.5 : 1.25;
    
    let week1 = '';
    let week2 = '';
    let week3 = '';
    let week4 = '';
    let finalWeight = currentWeight;
    let tips = '';
    
    switch (progressionType) {
      case 'linear':
        week1 = `${currentWeight} кг × 3 подхода × 8-10 повторов`;
        week2 = `${currentWeight + progression} кг × 3 × 8-10`;
        week3 = `${currentWeight + progression * 2} кг × 3 × 8-10`;
        week4 = `${currentWeight + progression * 3} кг × 3 × 8-10`;
        finalWeight = currentWeight + progression * weeks;
        tips = 'Увеличивайте вес каждую неделю пока позволяет техника. Когда не получится — добавляйте повторы.';
        break;
      case 'double':
        week1 = `${currentWeight} кг × 3 × 8 (след. неделя 9 повторов)`;
        week2 = `${currentWeight} кг × 3 × 9 (след. неделя 10)`;
        week3 = `${currentWeight} кг × 3 × 10 (след. неделя +2.5 кг)`;
        week4 = `${currentWeight + progression} кг × 3 × 8 (начало нового цикла)`;
        finalWeight = currentWeight + Math.floor(weeks / 4) * progression;
        tips = 'Двойная прогрессия: сначала добавляете повторы (до 10-12), потом вес и сбрасываете повторы.';
        break;
      case 'wave':
        week1 = `${currentWeight} кг × 4 подхода × 6 повторов (тяжёлая)`;
        week2 = `${currentWeight * 0.95} кг × 3 × 8 (средняя)`;
        week3 = `${currentWeight * 1.05} кг × 5 × 5 (суперкомпенсация)`;
        week4 = `${currentWeight * 0.8} кг × 2 × 12 (лёгкая/восстановление)`;
        finalWeight = currentWeight + progression;
        tips = 'Волновая периодизация: варируйте интенсивность для постоянной адаптации без перетренированности.';
        break;
      case 'percentage':
        week1 = `75% 1RM: ${Math.round(currentWeight * 0.75)} кг × 5 × 5`;
        week2 = `80% 1RM: ${Math.round(currentWeight * 0.80)} кг × 4 × 5`;
        week3 = `85% 1RM: ${Math.round(currentWeight * 0.85)} кг × 3 × 4`;
        week4 = `70% 1RM: ${Math.round(currentWeight * 0.70)} кг × 3 × 8 (deload)`;
        finalWeight = currentWeight + progression;
        tips = 'Процентная периодизация используется в силовых видах спорта. Требует знания своего 1RM.';
        break;
    }
    
    return [
      { value: week1, label: 'Неделя 1' },
      { value: week2, label: 'Неделя 2' },
      { value: week3, label: 'Неделя 3' },
      { value: week4, label: 'Неделя 4' },
      { value: Math.round(finalWeight), label: 'Итоговый вес', unit: 'кг' },
      { value: tips, label: 'Советы по прогрессии' }
    ];
  },
  content: {
    howTo: 'Введите текущий вес, количество недель и тип прогрессии. Калькулятор составит план увеличения нагрузки.',
    about: 'Прогрессивная перегрузка — главный принцип роста силы и мышц. Нужно постоянно увеличивать вес, повторы или объём, чтобы давать организму стимул к адаптации.',
    formula: 'Линейная: +2.5 кг базовые, +1.25 кг изолирующие\nДвойная: вес фиксированный → повторы ↑ → вес ↑ → повторы ↓',
    faq: [
      { question: 'Что делать когда прогресс остановился?', answer: 'Смените тип прогрессии (линейная → волновая), увеличьте калории, проверьте сон, сделайте deload.' },
      { question: 'Какой тип прогрессии лучше для новичка?', answer: 'Линейная прогрессия — самая простая и эффективная. Добавляете вес каждую тренировку пока позволяет техника.' }
    ],
    sources: [
      { title: 'Stronger by Science - Progression Methods', url: 'https://www.strongerbyscience.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор RPE (Rate of Perceived Exertion)
export const rpeCalculator: Calculator = {
  id: 'rpe-calculator',
  slug: 'shkala-rpe',
  title: 'Калькулятор RPE',
  description: 'Расчёт веса по шкале воспринимаемой нагрузки (RPE) и определение запаса повторов (RIR)',
  category: 'zdorove',
  subcategory: 'fitness',
  type: 'formula',
  inputs: [
    {
      name: 'oneRM',
      label: 'Ваш 1RM (кг)',
      type: 'number',
      placeholder: '100',
      min: 20,
      max: 500,
      defaultValue: 100
    },
    {
      name: 'targetRPE',
      label: 'Целевой RPE',
      type: 'select',
      options: [
        { value: '10', label: 'RPE 10 — максимум, до отказа' },
        { value: '9.5', label: 'RPE 9.5 — возможно 1 повтор' },
        { value: '9', label: 'RPE 9 — 1 повтор в запасе' },
        { value: '8.5', label: 'RPE 8.5 — 1-2 повтора в запасе' },
        { value: '8', label: 'RPE 8 — 2 повтора в запасе' },
        { value: '7', label: 'RPE 7 — 3 повтора в запасе (лёгко)' },
        { value: '6', label: 'RPE 6 — 4 повтора в запасе (очень легко)' }
      ],
      defaultValue: '8'
    },
    {
      name: 'targetReps',
      label: 'Целевое число повторов',
      type: 'number',
      placeholder: '5',
      min: 1,
      max: 15,
      defaultValue: 5
    }
  ],
  outputs: [
    { name: 'recommendedWeight', label: 'Рекомендуемый вес', type: 'number', unit: 'кг' },
    { name: 'rir', label: 'RIR (повторов в запасе)', type: 'number', unit: 'повт' },
    { name: 'percentage', label: '% от 1RM', type: 'number', unit: '%' },
    { name: 'description', label: 'Описание усилий', type: 'text' },
    { name: 'usage', label: 'Когда использовать', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const oneRM = Number(inputs.oneRM || 100);
    const targetRPE = Number(inputs.targetRPE || 8);
    const targetReps = Number(inputs.targetReps || 5);
    
    // RIR = Reps in Reserve (10 - RPE)
    const rir = 10 - targetRPE;
    
    // Weight calculation based on reps and RPE
    // Use Brzycki formula in reverse: Weight = 1RM × (1.0278 - 0.0278 × (reps + RIR))
    const weight = oneRM * (1.0278 - 0.0278 * (targetReps + rir));
    const percentage = Math.round(weight / oneRM * 100);
    
    let description = '';
    let usage = '';
    
    switch (targetRPE) {
      case 10:
        description = 'Максимальное усилие, мышечный отказ, невозможно сделать ещё один повтор';
        usage = 'Тестирование максимума, последний подход, соревнования';
        break;
      case 9.5:
        description = 'Очень тяжело, возможно ещё 1 повтор с большим риском';
        usage = 'Последние подходы в программе, пиковые нагрузки';
        break;
      case 9:
        description = 'Тяжело, но 1 повтор в запасе точно есть';
        usage = 'Рабочие подходы, оптимально для гипертрофии';
        break;
      case 8.5:
        description = 'Сложно, но контролируемо, 1-2 повтора в запасе';
        usage = 'Основные рабочие подходы';
        break;
      case 8:
        description = 'Умеренно сложно, 2 повтора в запасе';
        usage = 'Техничные работы, объёмные тренировки';
        break;
      case 7:
        description = 'Относительно легко, 3 повтора в запасе';
        usage = 'Разминочные подходы, deload, техника';
        break;
      case 6:
        description = 'Легко, 4+ повторов в запасе';
        usage = 'Разминка, новые упражнения, восстановление';
        break;
      default:
        description = 'Средняя интенсивность';
        usage = 'Тренировочные подходы';
    }
    
    return [
      { value: Math.round(weight), label: 'Рекомендуемый вес', unit: 'кг' },
      { value: rir, label: 'RIR (повторов в запасе)', unit: 'повт' },
      { value: percentage, label: '% от 1RM', unit: '%' },
      { value: description, label: 'Описание усилий' },
      { value: usage, label: 'Когда использовать' }
    ];
  },
  content: {
    howTo: 'Введите ваш 1RM, целевой RPE и число повторов. Калькулятор рассчитает вес для подхода.',
    about: 'RPE (Rate of Perceived Exertion) — шкала воспринимаемой нагрузки от 1 до 10. RIR (Reps in Reserve) — сколько повторов вы могли бы сделать ещё. Связь: RPE = 10 - RIR.',
    formula: 'RPE 10 = до отказа\nRPE 9 = 1 повтор в запасе\nRPE 8 = 2 повтора в запасе\nВес = 1RM × (1.0278 - 0.0278 × (повторы + RIR))',
    faq: [
      { question: 'Как научиться оценивать RPE?', answer: 'Практика! Сначала тренируйтесь до отказа (RPE 10) чтобы понять максимум. Потом останавливайтесь на 1-2 повтора раньше.' },
      { question: 'Какой RPE лучше для набора массы?', answer: 'RPE 8-9 (1-2 повтора в запасе). Достаточно тяжело для роста, но не вызывает перетренированности.' }
    ],
    sources: [
      { title: 'Mike Tuchscherer - RPE Manual', url: 'https://www.reactivestrength.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор восстановления между подходами
export const restTimeCalculator: Calculator = {
  id: 'rest-time-calculator',
  slug: 'vremya-otdyha',
  title: 'Время отдыха между подходами',
  description: 'Расчёт оптимального времени восстановления между подходами в зависимости от целей и интенсивности',
  category: 'zdorove',
  subcategory: 'fitness',
  type: 'formula',
  inputs: [
    {
      name: 'intensity',
      label: 'Интенсивность (% от 1RM)',
      type: 'number',
      placeholder: '80',
      min: 50,
      max: 100,
      defaultValue: 80
    },
    {
      name: 'reps',
      label: 'Повторов в подходе',
      type: 'number',
      placeholder: '8',
      min: 1,
      max: 30,
      defaultValue: 8
    },
    {
      name: 'goal',
      label: 'Цель тренировки',
      type: 'select',
      options: [
        { value: 'strength', label: 'Сила (1-5 повторов)' },
        { value: 'hypertrophy', label: 'Гипертрофия (6-12 повторов)' },
        { value: 'endurance', label: 'Выносливость (15+ повторов)' },
        { value: 'conditioning', label: 'Кондиционирование/сжигание жира' }
      ],
      defaultValue: 'hypertrophy'
    },
    {
      name: 'exerciseType',
      label: 'Тип упражнения',
      type: 'select',
      options: [
        { value: 'compound', label: 'Базовое (многосуставное)' },
        { value: 'isolation', label: 'Изолирующее' },
        { value: 'machine', label: 'В тренажёре' }
      ],
      defaultValue: 'compound'
    }
  ],
  outputs: [
    { name: 'restTime', label: 'Время отдыха', type: 'text' },
    { name: 'minTime', label: 'Минимум', type: 'number', unit: 'сек' },
    { name: 'maxTime', label: 'Максимум', type: 'number', unit: 'сек' },
    { name: 'heartRate', label: 'Целевой пульс', type: 'text' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const intensity = Number(inputs.intensity || 80);
    const reps = Number(inputs.reps || 8);
    const goal = String(inputs.goal || 'hypertrophy');
    const exerciseType = String(inputs.exerciseType || 'compound');
    
    let baseRest = 120; // seconds
    
    // Adjust for goal
    switch (goal) {
      case 'strength':
        baseRest = 180; // 3-5 minutes
        break;
      case 'hypertrophy':
        baseRest = 90; // 1.5-2 minutes
        break;
      case 'endurance':
        baseRest = 60; // 1 minute
        break;
      case 'conditioning':
        baseRest = 45; // 30-45 seconds
        break;
    }
    
    // Adjust for intensity
    if (intensity >= 90) {
      baseRest += 60;
    } else if (intensity <= 60) {
      baseRest -= 30;
    }
    
    // Adjust for exercise type
    if (exerciseType === 'isolation') {
      baseRest -= 30;
    } else if (exerciseType === 'machine') {
      baseRest -= 15;
    }
    
    const minTime = Math.max(30, baseRest - 30);
    const maxTime = baseRest + 60;
    
    let restTimeText = '';
    if (goal === 'strength') {
      restTimeText = '3-5 минут (полное восстановление АТФ)';
    } else if (goal === 'hypertrophy') {
      restTimeText = '1.5-2 минуты (баланс восстановления и метаболического стресса)';
    } else if (goal === 'endurance') {
      restTimeText = '45-60 секунд (неполное восстановление для выносливости)';
    } else {
      restTimeText = '30-45 секунд (поддержание высокого пульса)';
    }
    
    const heartRate = goal === 'conditioning' 
      ? 'Не дожидаться полного восстановления (пульс >100)' 
      : `Дождаться снижения пульса до 100-110 уд/мин или ${Math.round(minTime/60)} минут`;
    
    let tips = '';
    if (goal === 'strength') {
      tips = 'Отдыхайте полностью между тяжёлыми подходами. Мышечная усталость не должна мешать выполнению следующего подхода.';
    } else if (goal === 'hypertrophy') {
      tips = 'Слишком долгий отдых снижает метаболический стресс. Слишком короткий — не даёт восстановиться для следующего качественного подхода.';
    } else if (goal === 'conditioning') {
      tips = 'Циркулярные тренировки — минимум отдыха для поддержания высокого пульса и сжигания калорий.';
    }
    
    return [
      { value: restTimeText, label: 'Время отдыха' },
      { value: minTime, label: 'Минимум', unit: 'сек' },
      { value: maxTime, label: 'Максимум', unit: 'сек' },
      { value: heartRate, label: 'Целевой пульс' },
      { value: tips, label: 'Советы' }
    ];
  },
  content: {
    howTo: 'Выберите цель тренировки, интенсивность и тип упражнения. Калькулятор подскажет оптимальное время отдыха.',
    about: 'Время отдыха критично для результатов. Сила требует полного восстановления (3-5 мин), гипертрофия — баланс (1-2 мин), кондиционирование — минимум (30-45 сек).',
    formula: 'Сила: 3-5 мин (90-100% 1RM)\nГипертрофия: 1.5-2 мин (70-85% 1RM)\nВыносливость: 45-60 сек (60-70% 1RM)',
    faq: [
      { question: 'Почему нельзя отдыхать слишком долго?', answer: 'При гипертрофии долгий отдых снижает метаболический стресс и гормональный отклик. Мышцы "остывают".' },
      { question: 'Что если пульс не снижается?', answer: 'Если после 5 минут пульс всё ещё высокий — возможно вы переутомлены или dehydrated. Выпейте воды, сделайте передышку.' }
    ],
    sources: [
      { title: 'Journal of Strength and Conditioning Research - Rest Intervals', url: 'https://journals.lww.com/nsca-jscr/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const fitnessBodybuildingCalculators: Calculator[] = [
  bulkingCalculator,
  cuttingCalculator,
  oneRepMaxCalculator,
  trainingVolumeCalculator,
  deloadCalculator,
  progressiveOverloadCalculator,
  rpeCalculator,
  restTimeCalculator
];
