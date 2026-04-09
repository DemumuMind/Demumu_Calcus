import { Calculator } from '../types';

// Калькулятор масштабирования рецептов
export const recipeScalerCalculator: Calculator = {
  id: 'recipe-scaler',
  slug: 'mashtabirovanie-recepta',
  title: 'Масштабирование рецепта',
  description: 'Пересчёт ингредиентов при изменении количества порций или формы для выпечки',
  category: 'dlya-doma',
  subcategory: 'cooking',
  type: 'formula',
  inputs: [
    {
      name: 'originalServings',
      label: 'Исходное количество порций',
      type: 'number',
      placeholder: '4',
      min: 1,
      defaultValue: 4
    },
    {
      name: 'targetServings',
      label: 'Желаемое количество порций',
      type: 'number',
      placeholder: '6',
      min: 1,
      defaultValue: 6
    },
    {
      name: 'originalAmount',
      label: 'Исходное количество ингредиента',
      type: 'number',
      placeholder: '200',
      defaultValue: 200
    },
    {
      name: 'unit',
      label: 'Единица измерения',
      type: 'select',
      options: [
        { value: 'g', label: 'граммы' },
        { value: 'kg', label: 'килограммы' },
        { value: 'ml', label: 'миллилитры' },
        { value: 'l', label: 'литры' },
        { value: 'pcs', label: 'штуки' },
        { value: 'cups', label: 'стаканы' },
        { value: 'tbsp', label: 'столовые ложки' },
        { value: 'tsp', label: 'чайные ложки' }
      ],
      defaultValue: 'g'
    }
  ],
  outputs: [
    { name: 'scalingFactor', label: 'Коэффициент масштабирования', type: 'number' },
    { name: 'newAmount', label: 'Новое количество', type: 'number' },
    { name: 'newAmountFormatted', label: 'Результат', type: 'text' },
    { name: 'tips', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
    const originalServings = Number(inputs.originalServings);
    const targetServings = Number(inputs.targetServings);
    const originalAmount = Number(inputs.originalAmount);
    const unit = String(inputs.unit);
    
    if (!originalServings || !targetServings || !originalAmount) {
      return [
        { value: '—', label: 'Коэффициент масштабирования' },
        { value: '—', label: 'Новое количество' },
        { value: '—', label: 'Результат' },
        { value: '—', label: 'Рекомендации' }
      ];
    }
    
    const scalingFactor = targetServings / originalServings;
    const newAmount = originalAmount * scalingFactor;
    
    // Format the result nicely
    let formattedAmount: string;
    if (unit === 'pcs') {
      formattedAmount = `${Math.ceil(newAmount)} ${unit}`;
    } else if (newAmount >= 1000 && (unit === 'g' || unit === 'ml')) {
      formattedAmount = `${(newAmount / 1000).toFixed(2)} ${unit === 'g' ? 'кг' : 'л'}`;
    } else {
      formattedAmount = `${Math.round(newAmount * 10) / 10} ${unit}`;
    }
    
    // Tips based on scaling
    let tips = '';
    if (scalingFactor > 2) {
      tips = 'При увеличении более чем в 2 раза: время выпечки может увеличиться, проверяйте готовность. Специи и соль увеличивайте осторожно (не в полной пропорции).';
    } else if (scalingFactor < 0.5) {
      tips = 'При уменьшении рецепта: время приготовления сократится, используйте меньшую посуду.';
    } else {
      tips = 'Стандартное масштабирование: все ингредиенты изменяются пропорционально.';
    }
    
    return [
      { value: Number(scalingFactor.toFixed(2)), label: 'Коэффициент масштабирования' },
      { value: Math.round(newAmount * 10) / 10, label: 'Новое количество' },
      { value: formattedAmount, label: 'Результат' },
      { value: tips, label: 'Рекомендации' }
    ];
  },
  content: {
    howTo: 'Введите исходное и желаемое количество порций, а также количество любого ингредиента. Калькулятор пересчитает все пропорции и даст рекомендации по приготовлению.',
    about: 'Масштабирование рецептов — важный навык при готовке для разного количества людей или адаптации рецептов под другие формы. Не все ингредиенты масштабируются линейно (особенно специи, разрыхлители).',
    formula: 'Новое количество = Исходное × (Желаемые порции / Исходные порции)',
    faq: [
      { question: 'Можно ли просто удвоить все ингредиенты?', answer: 'Да, для большинства. Но специи, соль и разрыхлители увеличивайте с осторожностью — их количество не всегда линейно зависит от объёма.' },
      { question: 'Как масштабировать время выпечки?', answer: 'Для больших объёмов время увеличивается (не линейно). Для разных форм — ориентируйтесь на толщину теста.' }
    ],
    sources: [
      { title: 'King Arthur Baking - Recipe Scaling', url: 'https://www.kingarthurbaking.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор замены ингредиентов
export const ingredientSubstitutionCalculator: Calculator = {
  id: 'ingredient-substitution',
  slug: 'zamena-ingredientov',
  title: 'Калькулятор замены ингредиентов',
  description: 'Расчёт количества альтернативных ингредиентов при замене в рецептах',
  category: 'dlya-doma',
  subcategory: 'cooking',
  type: 'converter',
  inputs: [
    {
      name: 'originalIngredient',
      label: 'Исходный ингредиент',
      type: 'select',
      options: [
        { value: 'butter', label: 'Сливочное масло' },
        { value: 'sugar', label: 'Сахар белый' },
        { value: 'flour', label: 'Пшеничная мука' },
        { value: 'milk', label: 'Молоко' },
        { value: 'egg', label: 'Яйцо' },
        { value: 'honey', label: 'Мёд' }
      ],
      defaultValue: 'butter'
    },
    {
      name: 'originalAmount',
      label: 'Исходное количество',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'substituteIngredient',
      label: 'Заменитель',
      type: 'select',
      options: [
        { value: 'oil', label: 'Растительное масло' },
        { value: 'applesauce', label: 'Яблочное пюре' },
        { value: 'banana', label: 'Банан' },
        { value: 'coconut_oil', label: 'Кокосовое масло' },
        { value: 'syrup', label: 'Сироп' }
      ],
      defaultValue: 'oil'
    }
  ],
  outputs: [
    { name: 'substituteAmount', label: 'Количество заменителя', type: 'number', unit: 'г/мл' },
    { name: 'adjustments', label: 'Необходимые корректировки', type: 'text' },
    { name: 'notes', label: 'Важные замечания', type: 'text' }
  ],
  calculate: (inputs) => {
    const originalIngredient = String(inputs.originalIngredient);
    const originalAmount = Number(inputs.originalAmount);
    const substituteIngredient = String(inputs.substituteIngredient);
    
    if (!originalAmount) {
      return [
        { value: '—', label: 'Количество заменителя', unit: 'г/мл' },
        { value: '—', label: 'Необходимые корректировки' },
        { value: '—', label: 'Важные замечания' }
      ];
    }
    
    // Substitution ratios (simplified)
    const ratios: Record<string, Record<string, { ratio: number; adjustments: string; notes: string }>> = {
      'butter': {
        'oil': { ratio: 0.75, adjustments: 'Уменьшите жидкость на 15%', notes: 'Используйте нейтральное масло. Вкус будет слегка отличаться.' },
        'applesauce': { ratio: 0.5, adjustments: 'Уменьшите сахар на 25%', notes: 'Лучше для выпечки. Текстура будет более влажной.' },
        'coconut_oil': { ratio: 0.75, adjustments: 'Нет изменений', notes: 'Придаст лёгкий кокосовый вкус. Сохраняет текстуру.' }
      },
      'sugar': {
        'honey': { ratio: 0.75, adjustments: 'Уменьшите жидкость на 20%', notes: 'Мёд слаще сахара. Нагревается быстрее.' },
        'syrup': { ratio: 0.75, adjustments: 'Уменьшите жидкость на 25%', notes: 'Текстура будет более влажной и плотной.' }
      },
      'egg': {
        'banana': { ratio: 1, adjustments: '1 банан = 1 яйцо', notes: 'Лучше для блинов и маффинов. Придаст банановый вкус.' },
        'applesauce': { ratio: 60, adjustments: '60 мл = 1 яйцо', notes: 'Универсальная замена. Текстура плотнее.' }
      },
      'milk': {
        'oil': { ratio: 1, adjustments: 'Для молока используйте воду + масло', notes: 'Для выпечки: замените объём.' }
      }
    };
    
    // Default fallback
    const defaultSub = { ratio: 1, adjustments: 'Замените 1:1', notes: 'Проверьте консистенцию теста.' };
    const substitution = ratios[originalIngredient]?.[substituteIngredient] || defaultSub;
    
    const substituteAmount = originalAmount * substitution.ratio;
    
    return [
      { value: Math.round(substituteAmount), label: 'Количество заменителя', unit: 'г/мл' },
      { value: substitution.adjustments, label: 'Необходимые корректировки' },
      { value: substitution.notes, label: 'Важные замечания' }
    ];
  },
  content: {
    howTo: 'Выберите ингредиент, который нужно заменить, его количество и желаемый заменитель. Калькулятор подскажет пропорции и необходимые корректировки рецепта.',
    about: 'Замена ингредиентов полезна при аллергиях, веганстве или отсутствии продуктов. Не все замены идеальны — некоторые меняют текстуру и вкус блюда.',
    faq: [
      { question: 'Можно ли заменить яйца в безе?', answer: 'Нет, безе без яиц невозможен. Аквафаба (жидкость из нута) работает для меренги.' },
      { question: 'Какую муку использовать для безглютеновой выпечки?', answer: 'Смесь рисовой, миндальной и кукурузной муки (1:1:1) + загуститель (ксантановая камедь).' }
    ],
    sources: [
      { title: 'The Spruce Eats - Ingredient Substitutions', url: 'https://www.thespruceeats.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор калорийности блюд
export const recipeCalorieCalculator: Calculator = {
  id: 'recipe-calorie',
  slug: 'kaloriynost-recepta',
  title: 'Калькулятор калорийности блюда',
  description: 'Расчёт калорий, белков, жиров и углеводов готового блюда на 100 г и на порцию',
  category: 'zdorove',
  subcategory: 'nutrition',
  type: 'formula',
  inputs: [
    {
      name: 'totalWeight',
      label: 'Общий вес готового блюда (г)',
      type: 'number',
      placeholder: '800',
      defaultValue: 800
    },
    {
      name: 'servings',
      label: 'Количество порций',
      type: 'number',
      placeholder: '4',
      defaultValue: 4
    },
    {
      name: 'calories',
      label: 'Общая калорийность ингредиентов (ккал)',
      type: 'number',
      placeholder: '1200',
      defaultValue: 1200
    },
    {
      name: 'protein',
      label: 'Общие белки (г)',
      type: 'number',
      placeholder: '60',
      defaultValue: 60
    },
    {
      name: 'fat',
      label: 'Общие жиры (г)',
      type: 'number',
      placeholder: '45',
      defaultValue: 45
    },
    {
      name: 'carbs',
      label: 'Общие углеводы (г)',
      type: 'number',
      placeholder: '120',
      defaultValue: 120
    }
  ],
  outputs: [
    { name: 'caloriesPer100g', label: 'Калории на 100 г', type: 'number', unit: 'ккал' },
    { name: 'caloriesPerServing', label: 'Калории на порцию', type: 'number', unit: 'ккал' },
    { name: 'pfcPer100g', label: 'Б/Ж/У на 100 г', type: 'text' },
    { name: 'pfcPerServing', label: 'Б/Ж/У на порцию', type: 'text' },
    { name: 'servingWeight', label: 'Вес порции', type: 'number', unit: 'г' }
  ],
  calculate: (inputs) => {
    const totalWeight = Number(inputs.totalWeight);
    const servings = Number(inputs.servings);
    const calories = Number(inputs.calories);
    const protein = Number(inputs.protein);
    const fat = Number(inputs.fat);
    const carbs = Number(inputs.carbs);
    
    if (!totalWeight || !servings) {
      return [
        { value: '—', label: 'Калории на 100 г', unit: 'ккал' },
        { value: '—', label: 'Калории на порцию', unit: 'ккал' },
        { value: '—', label: 'Б/Ж/У на 100 г' },
        { value: '—', label: 'Б/Ж/У на порцию' },
        { value: '—', label: 'Вес порции', unit: 'г' }
      ];
    }
    
    const caloriesPer100g = (calories / totalWeight) * 100;
    const servingWeight = totalWeight / servings;
    const caloriesPerServing = (calories / totalWeight) * servingWeight;
    
    const pPer100g = (protein / totalWeight) * 100;
    const fPer100g = (fat / totalWeight) * 100;
    const cPer100g = (carbs / totalWeight) * 100;
    
    const pPerServing = protein / servings;
    const fPerServing = fat / servings;
    const cPerServing = carbs / servings;
    
    return [
      { value: Math.round(caloriesPer100g), label: 'Калории на 100 г', unit: 'ккал' },
      { value: Math.round(caloriesPerServing), label: 'Калории на порцию', unit: 'ккал' },
      { value: `${pPer100g.toFixed(1)} / ${fPer100g.toFixed(1)} / ${cPer100g.toFixed(1)} г`, label: 'Б/Ж/У на 100 г' },
      { value: `${pPerServing.toFixed(1)} / ${fPerServing.toFixed(1)} / ${cPerServing.toFixed(1)} г`, label: 'Б/Ж/У на порцию' },
      { value: Math.round(servingWeight), label: 'Вес порции', unit: 'г' }
    ];
  },
  content: {
    howTo: 'Введите общий вес готового блюда, количество порций и суммарную калорийность всех ингредиентов (можно взять из приложений типа FatSecret). Калькулятор разобьёт на порции.',
    about: 'Расчёт КБЖУ помогает контролировать питание, следить за диетой и составлять сбалансированное меню. Вес готового блюда обычно меньше сырого из-за потери влаги при готовке.',
    formula: 'Калории на 100 г = Общие калории / Общий вес × 100\nКалории на порцию = Калории на 100 г × Вес порции / 100',
    faq: [
      { question: 'Учитывать ли вес жидкости в супе?', answer: 'Да, если это часть блюда. Но чистая вода без калорий не влияет на КБЖУ (кроме веса порции).' },
      { question: 'Как посчитать калории сложного блюда?', answer: 'Сложите калорийность всех ингредиентов (по сырому весу), разделите на количество порций.' }
    ],
    sources: [
      { title: 'FatSecret - Calorie Calculator', url: 'https://www.fatsecret.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор температуры духовки
export const ovenTemperatureCalculator: Calculator = {
  id: 'oven-temperature',
  slug: 'temperatura-duhovki',
  title: 'Конвертер температуры духовки',
  description: 'Перевод между градусами Цельсия, Фаренгейта, Газовой шкалой и уровнями мощности',
  category: 'dlya-doma',
  subcategory: 'cooking',
  type: 'converter',
  inputs: [
    {
      name: 'celsius',
      label: 'Температура (°C)',
      type: 'number',
      placeholder: '180',
      min: 50,
      max: 300,
      defaultValue: 180
    }
  ],
  outputs: [
    { name: 'fahrenheit', label: 'Фаренгейт', type: 'number', unit: '°F' },
    { name: 'gasMark', label: 'Газовая шкала', type: 'text' },
    { name: 'description', label: 'Описание режима', type: 'text' },
    { name: 'suitableFor', label: 'Подходит для', type: 'text' }
  ],
  calculate: (inputs) => {
    const celsius = Number(inputs.celsius);
    
    if (!celsius) {
      return [
        { value: '—', label: 'Фаренгейт', unit: '°F' },
        { value: '—', label: 'Газовая шкала' },
        { value: '—', label: 'Описание режима' },
        { value: '—', label: 'Подходит для' }
      ];
    }
    
    const fahrenheit = Math.round((celsius * 9/5) + 32);
    
    // Gas mark calculation
    let gasMark: string;
    if (celsius < 135) gasMark = '1/4';
    else if (celsius < 150) gasMark = '1/2';
    else if (celsius < 165) gasMark = '1';
    else if (celsius < 180) gasMark = '2';
    else if (celsius < 190) gasMark = '3';
    else if (celsius < 200) gasMark = '4';
    else if (celsius < 220) gasMark = '5';
    else if (celsius < 230) gasMark = '6';
    else if (celsius < 240) gasMark = '7';
    else if (celsius < 250) gasMark = '8';
    else gasMark = '9';
    
    // Description and suitable uses
    let description: string;
    let suitableFor: string;
    
    if (celsius < 120) {
      description = 'Очень низкая';
      suitableFor = 'Сушка, подогрев';
    } else if (celsius < 150) {
      description = 'Низкая';
      suitableFor = 'Меренги, сушка овощей';
    } else if (celsius < 170) {
      description = 'Средне-низкая';
      suitableFor = 'Тушение, запекание рыбы';
    } else if (celsius < 190) {
      description = 'Средняя';
      suitableFor = 'Печенье, кексы, запеканки';
    } else if (celsius < 210) {
      description = 'Средне-высокая';
      suitableFor = 'Торты, пироги, рулеты';
    } else if (celsius < 230) {
      description = 'Высокая';
      suitableFor = 'Хлеб, пицца, выпечка с дрожжами';
    } else {
      description = 'Очень высокая';
      suitableFor = 'Пицца на тонком тесте, обжарка';
    }
    
    return [
      { value: fahrenheit, label: 'Фаренгейт', unit: '°F' },
      { value: gasMark, label: 'Газовая шкала' },
      { value: description, label: 'Описание режима' },
      { value: suitableFor, label: 'Подходит для' }
    ];
  },
  content: {
    howTo: 'Введите температуру в градусах Цельсия. Калькулятор переведёт в другие системы и подскажет, для какой выпечки подходит данная температура.',
    about: 'Разные страны используют разные системы: Европа — Цельсий (°C), США — Фаренгейт (°F), Великобритания — Газовая шкала. Важно знать эквиваленты для точной выпечки.',
    formula: '°F = °C × 9/5 + 32',
    faq: [
      { question: 'Что такое газовая шкала?', answer: 'Традиционная британская система для газовых духовок. Mark 4 ≈ 180°C (средняя температура).' },
      { question: 'Можно ли выпекать при другой температуре?', answer: 'Да, с корректировкой времени. На каждые ±10°C меняйте время на ~10% (выше темп = меньше времени).' }
    ],
    sources: [
      { title: 'BBC Good Food - Oven Temperature Guide', url: 'https://www.bbcgoodfood.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор мер и весов для кухни
export const kitchenMeasurementCalculator: Calculator = {
  id: 'kitchen-measurements',
  slug: 'mernye-vesy-kuhnya',
  title: 'Калькулятор мер и весов',
  description: 'Перевод между кухонными мерами: стаканы, ложки, граммы, миллилитры для разных продуктов',
  category: 'konvertery',
  subcategory: 'cooking-units',
  type: 'converter',
  inputs: [
    {
      name: 'product',
      label: 'Продукт',
      type: 'select',
      options: [
        { value: 'water', label: 'Вода' },
        { value: 'flour', label: 'Пшеничная мука' },
        { value: 'sugar', label: 'Сахар' },
        { value: 'salt', label: 'Соль' },
        { value: 'butter', label: 'Сливочное масло' },
        { value: 'milk', label: 'Молоко' },
        { value: 'honey', label: 'Мёд' },
        { value: 'rice', label: 'Рис' },
        { value: 'oats', label: 'Овсянка' },
        { value: 'oil', label: 'Растительное масло' }
      ],
      defaultValue: 'flour'
    },
    {
      name: 'amount',
      label: 'Количество',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'unit',
      label: 'Мера',
      type: 'select',
      options: [
        { value: 'cup', label: 'Стакан (250 мл)' },
        { value: 'tbsp', label: 'Столовая ложка (15 мл)' },
        { value: 'tsp', label: 'Чайная ложка (5 мл)' },
        { value: 'g', label: 'Грамм' },
        { value: 'ml', label: 'Миллилитр' }
      ],
      defaultValue: 'cup'
    }
  ],
  outputs: [
    { name: 'grams', label: 'Граммы', type: 'number', unit: 'г' },
    { name: 'milliliters', label: 'Миллилитры', type: 'number', unit: 'мл' },
    { name: 'cups', label: 'Стаканы', type: 'number', unit: 'стак.' },
    { name: 'tablespoons', label: 'Столовые ложки', type: 'number', unit: 'ст.л.' },
    { name: 'teaspoons', label: 'Чайные ложки', type: 'number', unit: 'ч.л.' }
  ],
  calculate: (inputs) => {
    const product = String(inputs.product);
    const amount = Number(inputs.amount);
    const unit = String(inputs.unit);
    
    if (!amount) {
      return [
        { value: '—', label: 'Граммы', unit: 'г' },
        { value: '—', label: 'Миллилитры', unit: 'мл' },
        { value: '—', label: 'Стаканы', unit: 'стак.' },
        { value: '—', label: 'Столовые ложки', unit: 'ст.л.' },
        { value: '—', label: 'Чайные ложки', unit: 'ч.л.' }
      ];
    }
    
    // Density in g/ml for each product
    const densities: Record<string, number> = {
      'water': 1.0,
      'flour': 0.59,
      'sugar': 0.85,
      'salt': 1.2,
      'butter': 0.911,
      'milk': 1.03,
      'honey': 1.42,
      'rice': 0.85,
      'oats': 0.38,
      'oil': 0.92
    };
    
    const density = densities[product] || 1.0;
    
    // Convert to milliliters first
    let ml: number;
    switch (unit) {
      case 'cup': ml = amount * 250; break;
      case 'tbsp': ml = amount * 15; break;
      case 'tsp': ml = amount * 5; break;
      case 'g': ml = amount / density; break;
      case 'ml': ml = amount; break;
      default: ml = amount;
    }
    
    const grams = ml * density;
    const cups = ml / 250;
    const tablespoons = ml / 15;
    const teaspoons = ml / 5;
    
    return [
      { value: Math.round(grams), label: 'Граммы', unit: 'г' },
      { value: Math.round(ml), label: 'Миллилитры', unit: 'мл' },
      { value: Number(cups.toFixed(2)), label: 'Стаканы', unit: 'стак.' },
      { value: Number(tablespoons.toFixed(1)), label: 'Столовые ложки', unit: 'ст.л.' },
      { value: Math.round(teaspoons * 2) / 2, label: 'Чайные ложки', unit: 'ч.л.' }
    ];
  },
  content: {
    howTo: 'Выберите продукт, введите количество и выберите меру. Калькулятор переведёт в граммы, миллилитры и другие кухонные меры с учётом плотности продукта.',
    about: 'Разные продукты имеют разную плотность: мука плотнее воздуха, масло плотнее воды. Поэтому 1 стакан муки ≠ 1 стакану воды по весу. Калькулятор учитывает плотность продуктов.',
    formula: 'Граммы = Миллилитры × Плотность\nСтакан = 250 мл = 16 ст.л. = 48 ч.л.',
    faq: [
      { question: 'Сколько граммов муки в стакане?', answer: 'Примерно 150 г (мука плотностью ~0.6 г/мл). Но зависит от сорта и уплотнения.' },
      { question: 'Почему вес и объём различаются?', answer: 'Плотность продуктов разная. Мёд в 1.4 раза плотнее воды, мука на 40% легче воды того же объёма.' }
    ],
    sources: [
      { title: 'King Arthur Baking - Measuring', url: 'https://www.kingarthurbaking.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор времени готовки
export const cookingTimeCalculator: Calculator = {
  id: 'cooking-time',
  slug: 'vremya-gotovki',
  title: 'Калькулятор времени готовки',
  description: 'Расчёт времени приготовления мяса, овощей, выпечки в зависимости от веса и температуры',
  category: 'dlya-doma',
  subcategory: 'cooking',
  type: 'formula',
  inputs: [
    {
      name: 'foodType',
      label: 'Тип продукта',
      type: 'select',
      options: [
        { value: 'chicken', label: 'Курица' },
        { value: 'turkey', label: 'Индейка' },
        { value: 'beef', label: 'Говядина (жаркое)' },
        { value: 'pork', label: 'Свинина' },
        { value: 'lamb', label: 'Баранина' },
        { value: 'fish', label: 'Рыба' },
        { value: 'potatoes', label: 'Картофель' },
        { value: 'cake', label: 'Бисквит (15 см форма)' }
      ],
      defaultValue: 'chicken'
    },
    {
      name: 'weight',
      label: 'Вес (кг) или толщина (см)',
      type: 'number',
      placeholder: '1.5',
      min: 0.1,
      max: 20,
      step: 0.1,
      defaultValue: 1.5
    },
    {
      name: 'temperature',
      label: 'Температура духовки (°C)',
      type: 'number',
      placeholder: '180',
      min: 100,
      max: 250,
      defaultValue: 180
    }
  ],
  outputs: [
    { name: 'cookingTime', label: 'Время готовки', type: 'text' },
    { name: 'internalTemp', label: 'Целевая внутренняя температура', type: 'number', unit: '°C' },
    { name: 'restingTime', label: 'Время отдыха', type: 'number', unit: 'мин' },
    { name: 'totalTime', label: 'Общее время до подачи', type: 'text' },
    { name: 'tips', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
    const foodType = String(inputs.foodType);
    const weight = Number(inputs.weight);
    const temperature = Number(inputs.temperature);
    
    if (!weight || !temperature) {
      return [
        { value: '—', label: 'Время готовки' },
        { value: '—', label: 'Целевая внутренняя температура', unit: '°C' },
        { value: '—', label: 'Время отдыха', unit: 'мин' },
        { value: '—', label: 'Общее время до подачи' },
        { value: '—', label: 'Рекомендации' }
      ];
    }
    
    // Cooking times per kg at 180°C
    const cookingData: Record<string, { minPerKg: number; targetTemp: number; restingRatio: number; tips: string }> = {
      'chicken': { minPerKg: 45, targetTemp: 74, restingRatio: 0.15, tips: 'Желательно использовать термометр. Кожа должна быть золотистой.' },
      'turkey': { minPerKg: 40, targetTemp: 74, restingRatio: 0.25, tips: 'Запекайте грудкой вверх. Покрывайте фольгой, если темнеет.' },
      'beef': { minPerKg: 50, targetTemp: 63, restingRatio: 0.20, tips: 'Для medium-rare цель 57°C. Давайте отдохнуть перед нарезкой.' },
      'pork': { minPerKg: 55, targetTemp: 71, restingRatio: 0.15, tips: 'Современные стандарты допускают 63°C (розовый), но 71°C безопаснее.' },
      'lamb': { minPerKg: 45, targetTemp: 63, restingRatio: 0.20, tips: 'Как и говядина: 57°C для розового, 63°C для well-done.' },
      'fish': { minPerKg: 20, targetTemp: 63, restingRatio: 0.05, tips: 'Проверяйте прозрачность: должна стать белой и нежной.' },
      'potatoes': { minPerKg: 60, targetTemp: 95, restingRatio: 0, tips: 'Запекайте до мягкости ножа. Можно обернуть фольгой.' },
      'cake': { minPerKg: 35, targetTemp: 100, restingRatio: 0.10, tips: 'Проверяйте сухой шпажкой. Должна выходить чистой.' }
    };
    
    const data = cookingData[foodType];
    
    // Adjust time for temperature (rough approximation)
    const tempFactor = Math.pow(180 / temperature, 1.5);
    const baseMinutes = data.minPerKg * weight * tempFactor;
    
    // Format time
    const hours = Math.floor(baseMinutes / 60);
    const minutes = Math.round(baseMinutes % 60);
    const cookingTime = hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
    
    // Resting time
    const restingMinutes = Math.round(baseMinutes * data.restingRatio);
    
    // Total time
    const totalMinutes = Math.round(baseMinutes + restingMinutes);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMins = totalMinutes % 60;
    const totalTime = totalHours > 0 ? `${totalHours} ч ${totalMins} мин` : `${totalMins} мин`;
    
    return [
      { value: cookingTime, label: 'Время готовки' },
      { value: data.targetTemp, label: 'Целевая внутренняя температура', unit: '°C' },
      { value: restingMinutes, label: 'Время отдыха', unit: 'мин' },
      { value: totalTime, label: 'Общее время до подачи' },
      { value: data.tips, label: 'Рекомендации' }
    ];
  },
  content: {
    howTo: 'Выберите тип продукта, введите вес в кг (или толщину для рыбы/бифштексов в см) и температуру духовки. Калькулятор рассчитает время готовки и даст рекомендации.',
    about: 'Время готовки зависит от теплопроводности продукта, его толщины и температуры. Для безопасности мясо должно достичь определённой внутренней температуры. Время отдыха позволяет сокам распределиться.',
    formula: 'Время = Вес × Мин/кг × Коэффициент температуры\nТемпературный коэффициент ∝ (180/T)^1.5',
    faq: [
      { question: 'Почему нужно время отдыха?', answer: 'Соки перемещаются к центру при готовке. Отдых позволяет им равномерно распределиться, сохраняя сочность.' },
      { question: 'Сколько готовить говядину medium-rare?', answer: 'При 180°C ~45 мин/кг до 57°C внутри. Используйте термометр для точности.' }
    ],
    sources: [
      { title: 'Serious Eats - Meat Temperature Guide', url: 'https://www.seriouseats.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор брожения теста
export const doughFermentationCalculator: Calculator = {
  id: 'dough-fermentation',
  slug: 'brozhenie-testa',
  title: 'Калькулятор брожения теста',
  description: 'Расчёт времени брожения дрожжевого теста в зависимости от температуры и количества дрожжей',
  category: 'dlya-doma',
  subcategory: 'cooking',
  type: 'formula',
  inputs: [
    {
      name: 'yeastType',
      label: 'Тип дрожжей',
      type: 'select',
      options: [
        { value: 'fresh', label: 'Свежие (живые)' },
        { value: 'dry', label: 'Сухие активные' },
        { value: 'instant', label: 'Сухие мгновенные' }
      ],
      defaultValue: 'dry'
    },
    {
      name: 'yeastAmount',
      label: 'Количество дрожжей (г на 500 г муки)',
      type: 'number',
      placeholder: '7',
      min: 1,
      max: 50,
      defaultValue: 7
    },
    {
      name: 'temperature',
      label: 'Температура брожения (°C)',
      type: 'number',
      placeholder: '25',
      min: 5,
      max: 40,
      defaultValue: 25
    },
    {
      name: 'doughType',
      label: 'Тип теста',
      type: 'select',
      options: [
        { value: 'bread', label: 'Хлеб' },
        { value: 'pizza', label: 'Пицца (тонкая)' },
        { value: 'rich', label: 'Сдобное (с маслом/яйцами)' }
      ],
      defaultValue: 'bread'
    }
  ],
  outputs: [
    { name: 'firstRise', label: 'Первая расстойка', type: 'number', unit: 'мин' },
    { name: 'secondRise', label: 'Вторая расстойка', type: 'number', unit: 'мин' },
    { name: 'totalTime', label: 'Общее время', type: 'text' },
    { name: 'doublingTime', label: 'Время удвоения', type: 'number', unit: 'мин' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs) => {
    const yeastType = String(inputs.yeastType);
    const yeastAmount = Number(inputs.yeastAmount);
    const temperature = Number(inputs.temperature);
    const doughType = String(inputs.doughType);
    
    if (!yeastAmount || !temperature) {
      return [
        { value: '—', label: 'Первая расстойка', unit: 'мин' },
        { value: '—', label: 'Вторая расстойка', unit: 'мин' },
        { value: '—', label: 'Общее время' },
        { value: '—', label: 'Время удвоения', unit: 'мин' },
        { value: '—', label: 'Советы' }
      ];
    }
    
    // Base doubling time at 25°C with 2% yeast (10g per 500g)
    let baseDoublingTime = 60; // minutes
    
    // Adjust for yeast type
    const yeastMultipliers: Record<string, number> = {
      'fresh': 2.0,      // Need 2x more fresh yeast
      'dry': 1.0,        // Standard
      'instant': 0.9     // Slightly more active
    };
    
    // Adjust for yeast amount (inverse relationship)
    const standardAmount = 10; // 10g dry per 500g flour
    const yeastRatio = standardAmount / (yeastAmount * yeastMultipliers[yeastType]);
    
    // Temperature factor (roughly doubles every 10°C in optimal range)
    const tempFactor = Math.pow(2, (25 - temperature) / 10);
    
    // Dough type factor
    const doughMultipliers: Record<string, number> = {
      'bread': 1.0,
      'pizza': 0.8,      // Thinner, rises faster
      'rich': 1.5        // Fat slows fermentation
    };
    
    const doublingTime = baseDoublingTime * yeastRatio * tempFactor * doughMultipliers[doughType];
    
    const firstRise = Math.round(doublingTime * 1.5); // Until doubled + 50%
    const secondRise = Math.round(doublingTime * 0.8); // After shaping
    
    const totalMinutes = firstRise + 15 + secondRise; // +15 min for shaping
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const totalTime = hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
    
    let tips = '';
    if (temperature < 15) {
      tips = 'Холодное брожение развивает вкус, но требует больше времени. Можно оставить на ночь в холодильнике.';
    } else if (temperature > 30) {
      tips = 'Высокая температура ускоряет брожение, но может дать неприятный привкус. Следите, не перебродите.';
    } else {
      tips = 'Оптимальная температура для брожения. Тесто должно удвоиться в объёме.';
    }
    
    return [
      { value: firstRise, label: 'Первая расстойка', unit: 'мин' },
      { value: secondRise, label: 'Вторая расстойка', unit: 'мин' },
      { value: totalTime, label: 'Общее время' },
      { value: Math.round(doublingTime), label: 'Время удвоения', unit: 'мин' },
      { value: tips, label: 'Советы' }
    ];
  },
  content: {
    howTo: 'Выберите тип дрожжей, их количество (в пересчёте на 500 г муки), температуру брожения и тип теста. Калькулятор рассчитает время расстойки.',
    about: 'Скорость брожения зависит от активности дрожжей (свежие требуют в 2 раза больше), их количества (больше дрожжей = быстрее) и температуры (выше = быстрее, но есть предел).',
    formula: 'Время удвоения ∝ 1 / (Количество дрожжей × Активность × Коэффициент температуры)',
    faq: [
      { question: 'Почему тесто не поднимается?', answer: 'Проверьте срок годности дрожжей, температуру жидкости (не горячая!), наличие сахара как пищи.' },
      { question: 'Что такое холодное брожение?', answer: 'Брожение при 4-12°C в течение 8-24 часов. Даёт лучший вкус, структуру и хранение.' }
    ],
    sources: [
      { title: 'King Arthur Baking - Yeast Guide', url: 'https://www.kingarthurbaking.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор соотношения ингредиентов
export const bakingRatioCalculator: Calculator = {
  id: 'baking-ratio',
  slug: 'sootnoshenie-ingredientov',
  title: 'Калькулятор соотношений выпечки',
  description: 'Расчёт классических соотношений (рецептуры) для хлеба, пирогов, бисквитов и соусов',
  category: 'dlya-doma',
  subcategory: 'cooking',
  type: 'formula',
  inputs: [
    {
      name: 'ratioType',
      label: 'Тип соотношения',
      type: 'select',
      options: [
        { value: 'pate_brisee', label: 'Песочное тесто (3:2:1)' },
        { value: 'pate_a_choux', label: 'Заварное тесто (1:1:1:2)' },
        { value: 'genoise', label: 'Бисквит (1:1:1:1)' },
        { value: 'creme_patissiere', label: 'Заварной крем (10:10:2:1)' },
        { value: 'savory_tart', label: 'Солёный тарт (3:1:1)' },
        { value: 'shortbread', label: 'Печенье шортбред (3:2:1)' },
        { value: 'pancake', label: 'Блины (2:2:1:0.5)' },
        { value: 'pasta', label: 'Паста (3:2)' },
        { value: 'pie_crust', label: 'Пироговое тесто (3:1:1)' }
      ],
      defaultValue: 'pate_brisee'
    },
    {
      name: 'baseAmount',
      label: 'Базовое количество (основной ингредиент)',
      type: 'number',
      placeholder: '300',
      min: 50,
      defaultValue: 300
    }
  ],
  outputs: [
    { name: 'ingredients', label: 'Состав', type: 'text' },
    { name: 'recipe', label: 'Рецептура', type: 'text' },
    { name: 'yield', label: 'Выход', type: 'text' },
    { name: 'tips', label: 'Советы по приготовлению', type: 'text' }
  ],
  calculate: (inputs) => {
    const ratioType = String(inputs.ratioType);
    const baseAmount = Number(inputs.baseAmount);
    
    if (!baseAmount) {
      return [
        { value: '—', label: 'Состав' },
        { value: '—', label: 'Рецептура' },
        { value: '—', label: 'Выход' },
        { value: '—', label: 'Советы по приготовлению' }
      ];
    }
    
    // Recipe definitions
    const recipes: Record<string, { name: string; ingredients: string[]; ratios: number[]; yield: string; tips: string }> = {
      'pate_brisee': {
        name: 'Песочное тесто',
        ingredients: ['Мука', 'Масло сливочное', 'Вода/яйцо'],
        ratios: [3, 2, 1],
        yield: 'Тесто для пирога 24 см',
        tips: 'Масло должно быть холодным. Не месите долго — оставьте кусочки масла.'
      },
      'pate_a_choux': {
        name: 'Заварное тесто',
        ingredients: ['Молоко/вода', 'Масло', 'Мука', 'Яйца'],
        ratios: [1, 1, 1, 2],
        yield: '30-40 профитролей',
        tips: 'Заварите муку до образования комка. Добавляйте яйца по одному до нужной консистенции.'
      },
      'genoise': {
        name: 'Бисквит',
        ingredients: ['Мука', 'Сахар', 'Яйца', 'Масло'],
        ratios: [1, 1, 1, 0.25],
        yield: 'Бисквит 20-22 см',
        tips: 'Взбейте яйца с сахаром до пышности. Осторожно вмешайте муку сверху вниз.'
      },
      'creme_patissiere': {
        name: 'Заварной крем',
        ingredients: ['Молоко', 'Сахар', 'Желтки', 'Мука/крахмал'],
        ratios: [10, 2, 1, 1],
        yield: '500 мл крема',
        tips: 'Варите до загустения, постоянно мешая. Процедите и накройте плёнкой.'
      },
      'shortbread': {
        name: 'Шортбред',
        ingredients: ['Мука', 'Масло', 'Сахар'],
        ratios: [3, 2, 1],
        yield: '20-24 печенья',
        tips: 'Простое масляное печенье. Не взбивайте — просто смешайте до однородности.'
      },
      'pancake': {
        name: 'Блины',
        ingredients: ['Молоко', 'Мука', 'Яйца', 'Масло'],
        ratios: [2, 2, 1, 0.5],
        yield: '8-10 блинов',
        tips: 'Тесто должно быть как жидкая сметана. Дайте постоять 15 минут перед жаркой.'
      },
      'pasta': {
        name: 'Паста',
        ingredients: ['Мука', 'Яйца'],
        ratios: [3, 2],
        yield: '400 г свежей пасты',
        tips: 'Замешивайте до гладкости. Отдых 30 минут перед раскаткой.'
      },
      'pie_crust': {
        name: 'Пироговое тесто',
        ingredients: ['Мука', 'Жир (масло/сало)', 'Вода'],
        ratios: [3, 1, 1],
        yield: 'Дно пирога 24 см',
        tips: 'Используйте ледяную воду. Работайте быстро, чтобы масло не растаяло.'
      },
      'savory_tart': {
        name: 'Солёный тарт',
        ingredients: ['Мука', 'Масло', 'Жидкость (яйца/вода)'],
        ratios: [3, 1, 1],
        yield: 'Тарт 24-26 см',
        tips: 'Добавьте соль и перец. Можно добавить травы в тесто.'
      }
    };
    
    const recipe = recipes[ratioType];
    const multiplier = baseAmount / recipe.ratios[0];
    
    // Format ingredients with amounts
    const formattedIngredients = recipe.ingredients.map((ing, i) => {
      const amount = Math.round(recipe.ratios[i] * multiplier);
      return `${ing}: ${amount} г/мл`;
    }).join('; ');
    
    const recipeFormula = recipe.ingredients.map((ing, i) => 
      `${ing} (${recipe.ratios[i]})`
    ).join(' : ');
    
    return [
      { value: formattedIngredients, label: 'Состав' },
      { value: recipeFormula, label: 'Рецептура' },
      { value: recipe.yield, label: 'Выход' },
      { value: recipe.tips, label: 'Советы по приготовлению' }
    ];
  },
  content: {
    howTo: 'Выберите тип классического соотношения (рецептуры) и введите количество основного ингредиента. Калькулятор пересчитает все компоненты.',
    about: 'Профессиональные кондитеры часто работают по соотношениям (бакинг-рейшо), а не по фиксированным рецептам. Например, песочное тесто — классика 3:2:1 (мука:масло:вода).',
    faq: [
      { question: 'Что означает соотношение 3:2:1?', answer: 'На 3 части муки берётся 2 части масла и 1 часть жидкости. Части могут быть любыми единицами (граммы, стаканы).' },
      { question: 'Можно ли изменять соотношения?', answer: 'Можно в небольших пределах. Больше масла = рассыпчатее, больше жидкости = эластичнее.' }
    ],
    sources: [
      { title: 'Ratio by Michael Ruhlman', url: 'https://www.michaelruhlman.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор варки яиц
export const eggCookingCalculator: Calculator = {
  id: 'egg-cooking',
  slug: 'varka-yaic',
  title: 'Калькулятор варки яиц',
  description: 'Расчёт времени варки яиц для разной степени готовности желтка и белка',
  category: 'dlya-doma',
  subcategory: 'cooking',
  type: 'formula',
  inputs: [
    {
      name: 'eggSize',
      label: 'Размер яйца',
      type: 'select',
      options: [
        { value: 'small', label: 'S (53-63 г)' },
        { value: 'medium', label: 'M (63-73 г)' },
        { value: 'large', label: 'L (73-85 г)' },
        { value: 'xlarge', label: 'XL (85+ г)' }
      ],
      defaultValue: 'large'
    },
    {
      name: 'eggTemp',
      label: 'Начальная температура яйца',
      type: 'select',
      options: [
        { value: 'fridge', label: 'Холодильник (4°C)' },
        { value: 'room', label: 'Комнатная (20°C)' }
      ],
      defaultValue: 'fridge'
    },
    {
      name: 'doneness',
      label: 'Желаемая готовность',
      type: 'select',
      options: [
        { value: 'soft', label: 'Всмятку (жидкий желток)' },
        { value: 'medium', label: 'В мешочек (густой желток)' },
        { value: 'hard', label: 'Вкрутую (твёрдый желток)' }
      ],
      defaultValue: 'soft'
    },
    {
      name: 'altitude',
      label: 'Высота над уровнем моря (м)',
      type: 'number',
      placeholder: '0',
      min: 0,
      max: 4000,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'cookingTime', label: 'Время варки', type: 'number', unit: 'мин' },
    { name: 'prepNote', label: 'Подготовка', type: 'text' },
    { name: 'technique', label: 'Техника', type: 'text' },
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const eggSize = String(inputs.eggSize);
    const eggTemp = String(inputs.eggTemp);
    const doneness = String(inputs.doneness);
    const altitude = Number(inputs.altitude);
    
    // Base cooking times (minutes) for large eggs from fridge
    const baseTimes: Record<string, number> = {
      'soft': 6,
      'medium': 8,
      'hard': 10
    };
    
    let cookingTime = baseTimes[doneness];
    
    // Size adjustment
    const sizeMultipliers: Record<string, number> = {
      'small': 0.85,
      'medium': 0.92,
      'large': 1.0,
      'xlarge': 1.1
    };
    cookingTime *= sizeMultipliers[eggSize];
    
    // Temperature adjustment
    if (eggTemp === 'room') {
      cookingTime *= 0.85; // Room temp eggs cook faster
    }
    
    // Altitude adjustment (boiling point drops ~1°C per 300m)
    // Above 1000m, need more time
    if (altitude > 1000) {
      cookingTime *= (1 + altitude / 5000);
    }
    
    const prepNote = eggTemp === 'fridge' 
      ? 'Для точности выньте яйца за 5-10 минут до варки или увеличьте время на 1 минуту'
      : 'Яйца комнатной температуры — оптимально для контроля времени';
    
    const techniques: Record<string, string> = {
      'soft': 'Закипятите воду, осторожно опустите яйца, варите точное время, сразу охладите ледяной водой 1 мин',
      'medium': 'Закипятите воду, опустите яйца, варите, охладите ледяной водой 2 мин',
      'hard': 'Закипятите воду, опустите яйца, варите, охладите ледяной водой 3-5 мин'
    };
    
    const results: Record<string, string> = {
      'soft': 'Белок схватился, желток жидкий и яркий. Идеально для солдатиков.',
      'medium': 'Белок полностью схватился, желток густой кремообразный. Идеально для салатов.',
      'hard': 'Белок и желток полностью сварены. Идеально для паштета и нарезки.'
    };
    
    return [
      { value: Number(cookingTime.toFixed(1)), label: 'Время варки', unit: 'мин' },
      { value: prepNote, label: 'Подготовка' },
      { value: techniques[doneness], label: 'Техника' },
      { value: results[doneness], label: 'Результат' }
    ];
  },
  content: {
    howTo: 'Выберите размер яйца, его начальную температуру и желаемую степень готовности. Калькулятор точно рассчитает время варки с учётом всех факторов.',
    about: 'Время варки яиц зависит от их размера, начальной температуры и высоты над уровнем моря (температура кипения воды снижается с высотой). Точное время даёт воспроизводимый результат.',
    formula: 'Базовое время × Множитель размера × Множитель температуры × Множитель высоты',
    faq: [
      { question: 'Почему желток остаётся жидким?', answer: 'Желток свертывается при 65-70°C, белок при 62-65°C. Быстрое охлаждение останавливает приготовление желтка.' },
      { question: 'Почему время меняется на высоте?', answer: 'Вода кипит при более низкой температуре на высоте (90°C на 3000 м), поэтому теплопередача медленнее.' }
    ],
    sources: [
      { title: 'Serious Eats - Perfect Boiled Eggs', url: 'https://www.seriouseats.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор кофейного соотношения
export const coffeeRatioCalculator: Calculator = {
  id: 'coffee-ratio',
  slug: 'kofeynoe-sootnoshenie',
  title: 'Калькулятор кофейного соотношения',
  description: 'Расчёт пропорций кофе и воды для разных методов заваривания: эспрессо, пуровер, френч-пресс',
  category: 'dlya-doma',
  subcategory: 'cooking',
  type: 'formula',
  inputs: [
    {
      name: 'method',
      label: 'Метод заваривания',
      type: 'select',
      options: [
        { value: 'espresso', label: 'Эспрессо' },
        { value: 'pourover', label: 'Пуровер (V60/Chemex)' },
        { value: 'french', label: 'Френч-пресс' },
        { value: 'aeropress', label: 'Аэропресс' },
        { value: 'moka', label: 'Гейзерная кофеварка (Мока)' },
        { value: 'cold_brew', label: 'Холодный завар' },
        { value: 'turkish', label: 'Турецкий кофе' }
      ],
      defaultValue: 'pourover'
    },
    {
      name: 'coffeeAmount',
      label: 'Количество кофе (г)',
      type: 'number',
      placeholder: '15',
      min: 5,
      max: 100,
      defaultValue: 15
    },
    {
      name: 'strength',
      label: 'Крепость',
      type: 'select',
      options: [
        { value: 'light', label: 'Лёгкая' },
        { value: 'medium', label: 'Средняя' },
        { value: 'strong', label: 'Крепкая' }
      ],
      defaultValue: 'medium'
    }
  ],
  outputs: [
    { name: 'waterAmount', label: 'Количество воды', type: 'number', unit: 'мл' },
    { name: 'ratio', label: 'Соотношение', type: 'text' },
    { name: 'grindSize', label: 'Помол', type: 'text' },
    { name: 'brewTime', label: 'Время заваривания', type: 'text' },
    { name: 'temperature', label: 'Температура воды', type: 'number', unit: '°C' }
  ],
  calculate: (inputs) => {
    const method = String(inputs.method);
    const coffeeAmount = Number(inputs.coffeeAmount);
    const strength = String(inputs.strength);
    
    if (!coffeeAmount) {
      return [
        { value: '—', label: 'Количество воды', unit: 'мл' },
        { value: '—', label: 'Соотношение' },
        { value: '—', label: 'Помол' },
        { value: '—', label: 'Время заваривания' },
        { value: '—', label: 'Температура воды', unit: '°C' }
      ];
    }
    
    // Base ratios and parameters for each method
    const methodData: Record<string, { baseRatio: number; ratioRange: number[]; grind: string; time: string; temp: number }> = {
      'espresso': { baseRatio: 2, ratioRange: [1.5, 2.5], grind: 'Тонкий (как соль)', time: '25-30 сек', temp: 93 },
      'pourover': { baseRatio: 16, ratioRange: [15, 17], grind: 'Средний (как сахар)', time: '2.5-3.5 мин', temp: 96 },
      'french': { baseRatio: 15, ratioRange: [12, 17], grind: 'Крупный (как морская соль)', time: '4 мин', temp: 94 },
      'aeropress': { baseRatio: 15, ratioRange: [10, 20], grind: 'Средний-мелкий', time: '1.5-2 мин', temp: 85 },
      'moka': { baseRatio: 10, ratioRange: [7, 10], grind: 'Мелкий, но не пудра', time: '3-5 мин', temp: 100 },
      'cold_brew': { baseRatio: 8, ratioRange: [5, 10], grind: 'Очень крупный', time: '12-24 ч', temp: 5 },
      'turkish': { baseRatio: 10, ratioRange: [8, 12], grind: 'Пудра (мелчайший)', time: '2-3 мин', temp: 100 }
    };
    
    const data = methodData[method];
    
    // Adjust ratio for strength
    let ratio = data.baseRatio;
    if (strength === 'light') ratio -= 2;
    if (strength === 'strong') ratio += 2;
    
    const waterAmount = coffeeAmount * ratio;
    
    // Adjust temperature for dark roasts
    let temp = data.temp;
    if (method !== 'cold_brew') {
      temp = strength === 'strong' ? temp - 2 : temp; // Darker roasts = lower temp
    }
    
    return [
      { value: Math.round(waterAmount), label: 'Количество воды', unit: 'мл' },
      { value: `1:${ratio}`, label: 'Соотношение' },
      { value: data.grind, label: 'Помол' },
      { value: data.time, label: 'Время заваривания' },
      { value: temp, label: 'Температура воды', unit: '°C' }
    ];
  },
  content: {
    howTo: 'Выберите метод заваривания, введите количество кофе в граммах и желаемую крепость. Калькулятор рассчитает количество воды и подскажет параметры заваривания.',
    about: 'Соотношение кофе и воды (brew ratio) — ключевой параметр вкуса. Классика: 1:15 для френч-пресса, 1:2 для эспрессо, 1:16 для пуровера. Помол и температура также критичны.',
    formula: 'Вода (мл) = Кофе (г) × Соотношение\nЭспрессо: 1:2, Пуровер: 1:16, Френч-пресс: 1:15',
    faq: [
      { question: 'Почему эспрессо 1:2, а не 1:16?', answer: 'Эспрессо — концентрированный метод с давлением. 1:2 даёт 60-65% экстракции за 30 секунд.' },
      { question: 'Что важнее — точный вес или соотношение?', answer: 'Соотношение важнее для воспроизводимости. Весите кофе и воду для консистентности.' }
    ],
    sources: [
      { title: 'SCA - Coffee Brewing Handbook', url: 'https://sca.coffee/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const cookingFoodCalculators: Calculator[] = [
  recipeScalerCalculator,
  ingredientSubstitutionCalculator,
  recipeCalorieCalculator,
  ovenTemperatureCalculator,
  kitchenMeasurementCalculator,
  cookingTimeCalculator,
  doughFermentationCalculator,
  bakingRatioCalculator,
  eggCookingCalculator,
  coffeeRatioCalculator
];
