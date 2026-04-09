import { Calculator } from '../types';

// Конвертер кулинарных мер (расширенный)
export const cookingMeasuresExtendedCalculator: Calculator = {
  id: 'cooking-measures-extended',
  slug: 'kulinarnye-mery-rasshirennye',
  title: 'Кулинарные меры (расширенный)',
  description: 'Перевод кулинарных мер: чашки, ложки, граммы, миллилитры, унции, фунты для разных ингредиентов',
  category: 'konvertery',
  subcategory: 'conv-obschie',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Количество',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'ingredient',
      label: 'Ингредиент',
      type: 'select',
      options: [
        { value: 'water', label: 'Вода' },
        { value: 'flour', label: 'Мука' },
        { value: 'sugar', label: 'Сахар' },
        { value: 'salt', label: 'Соль' },
        { value: 'butter', label: 'Масло сливочное' },
        { value: 'oil', label: 'Масло растительное' },
        { value: 'milk', label: 'Молоко' },
        { value: 'honey', label: 'Мёд' },
        { value: 'rice', label: 'Рис' },
        { value: 'oats', label: 'Овсянка' },
        { value: 'yeast', label: 'Дрожжи' },
        { value: 'cocoa', label: 'Какао-порошок' }
      ],
      defaultValue: 'water'
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'cup', label: 'Стакан (250 мл)' },
        { value: 'cup_us', label: 'Чашка US (240 мл)' },
        { value: 'tbsp', label: 'Столовая ложка (15 мл)' },
        { value: 'tsp', label: 'Чайная ложка (5 мл)' },
        { value: 'g', label: 'Граммы' },
        { value: 'ml', label: 'Миллилитры' },
        { value: 'oz', label: 'Унции (oz)' },
        { value: 'lb', label: 'Фунты (lb)' },
        { value: 'pinch', label: 'Щепотка' }
      ],
      defaultValue: 'cup'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'cup', label: 'Стакан (250 мл)' },
        { value: 'cup_us', label: 'Чашка US (240 мл)' },
        { value: 'tbsp', label: 'Столовая ложка (15 мл)' },
        { value: 'tsp', label: 'Чайная ложка (5 мл)' },
        { value: 'g', label: 'Граммы' },
        { value: 'ml', label: 'Миллилитры' },
        { value: 'oz', label: 'Унции (oz)' },
        { value: 'lb', label: 'Фунты (lb)' },
        { value: 'pinch', label: 'Щепотка' }
      ],
      defaultValue: 'g'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const ingredient = String(inputs.ingredient);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) return [{ value: '—', label: 'Результат' }];
    
    // Density factors (g/ml) for each ingredient
    const densities: Record<string, number> = {
      water: 1.0,
      flour: 0.59,
      sugar: 0.85,
      salt: 1.2,
      butter: 0.911,
      oil: 0.92,
      milk: 1.03,
      honey: 1.42,
      rice: 0.85,
      oats: 0.38,
      yeast: 0.95,
      cocoa: 0.52
    };
    
    const density = densities[ingredient] || 1.0;
    
    // Convert to ml first
    let ml = 0;
    switch (from) {
      case 'cup': ml = value * 250; break;
      case 'cup_us': ml = value * 240; break;
      case 'tbsp': ml = value * 15; break;
      case 'tsp': ml = value * 5; break;
      case 'g': ml = value / density; break;
      case 'ml': ml = value; break;
      case 'oz': ml = value * 28.35 / density; break;
      case 'lb': ml = value * 453.59 / density; break;
      case 'pinch': ml = value * 0.3; break;
    }
    
    // Convert from ml to target
    let result = 0;
    switch (to) {
      case 'cup': result = ml / 250; break;
      case 'cup_us': result = ml / 240; break;
      case 'tbsp': result = ml / 15; break;
      case 'tsp': result = ml / 5; break;
      case 'g': result = ml * density; break;
      case 'ml': result = ml; break;
      case 'oz': result = ml * density / 28.35; break;
      case 'lb': result = ml * density / 453.59; break;
      case 'pinch': result = ml / 0.3; break;
    }
    
    const ingredientNames: Record<string, string> = {
      water: 'воды',
      flour: 'муки',
      sugar: 'сахара',
      salt: 'соли',
      butter: 'масла сливочного',
      oil: 'растительного масла',
      milk: 'молока',
      honey: 'мёда',
      rice: 'риса',
      oats: 'овсянки',
      yeast: 'дрожжей',
      cocoa: 'какао-порошка'
    };
    
    const unitLabels: Record<string, string> = {
      cup: 'стаканов',
      cup_us: 'чашек',
      tbsp: 'столовых ложек',
      tsp: 'чайных ложек',
      g: 'г',
      ml: 'мл',
      oz: 'унций',
      lb: 'фунтов',
      pinch: 'щепоток'
    };
    
    return [{
      value: `${value} ${unitLabels[from]} ${ingredientNames[ingredient]} = ${Math.round(result * 100) / 100} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Выберите ингредиент, введите количество, выберите единицы измерения "из" и "в". Результат будет учитывать плотность выбранного продукта.',
    about: 'Калькулятор переводит кулинарные меры с учётом плотности различных ингредиентов. Вода, мука, сахар и другие продукты имеют разную плотность, поэтому объём в стакане будет иметь разный вес.',
    usage: 'Используйте для точного пересчёта рецептов при замене ингредиентов или изменении порций.',
    faq: [
      {
        question: 'Почему вес муки в стакане отличается от веса сахара?',
        answer: 'Разные продукты имеют разную плотность. Мука плотностью ~0.59 г/мл, сахар ~0.85 г/мл. Поэтому в одном стакане (250 мл) будет ~147 г муки и ~212 г сахара.'
      },
      {
        question: 'Что такое щепотка?',
        answer: 'Щепотка — примерно 0.3 мл или 0.3-0.5 г в зависимости от продукта. Обычно используется для специй.'
      }
    ],
    sources: [
      { title: 'Кулинарные меры — Википедия', url: 'https://ru.wikipedia.org/wiki/Кулинарные_меры' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор температуры для выпечки
export const bakingTemperatureCalculator: Calculator = {
  id: 'baking-temperature',
  slug: 'temperatura-vypechki',
  title: 'Температура для выпечки',
  description: 'Перевод температуры духовки между шкалами Цельсия, Фаренгейта и газовой маркировкой (Gas Mark)',
  category: 'konvertery',
  subcategory: 'conv-temperatura',
  type: 'converter',
  inputs: [
    {
      name: 'temperature',
      label: 'Температура',
      type: 'number',
      placeholder: '180',
      defaultValue: 180
    },
    {
      name: 'scale',
      label: 'Шкала',
      type: 'select',
      options: [
        { value: 'celsius', label: '°C (Цельсий)' },
        { value: 'fahrenheit', label: '°F (Фаренгейт)' },
        { value: 'gas', label: 'Gas Mark' }
      ],
      defaultValue: 'celsius'
    }
  ],
  outputs: [
    { name: 'celsius', label: '°C', type: 'number' },
    { name: 'fahrenheit', label: '°F', type: 'number' },
    { name: 'gas', label: 'Gas Mark', type: 'text' },
    { name: 'description', label: 'Описание', type: 'text' }
  ],
  calculate: (inputs) => {
    const temp = Number(inputs.temperature);
    const scale = String(inputs.scale);
    
    if (!temp) {
      return [
        { value: '—', label: '°C' },
        { value: '—', label: '°F' },
        { value: '—', label: 'Gas Mark' },
        { value: '', label: 'Описание' }
      ];
    }
    
    let celsius = temp;
    if (scale === 'fahrenheit') {
      celsius = (temp - 32) * 5 / 9;
    } else if (scale === 'gas') {
      // Gas Mark to Celsius approximation
      celsius = (temp * 14) + 121;
    }
    
    const fahrenheit = (celsius * 9 / 5) + 32;
    
    // Calculate Gas Mark
    let gasMarkNum = Math.round((celsius - 121) / 14);
    let gasMark: string;
    if (gasMarkNum < 1) gasMark = '< 1';
    else if (gasMarkNum > 9) gasMark = '> 9';
    else gasMark = String(gasMarkNum);
    
    // Description
    let description = '';
    if (celsius < 100) description = 'Очень низкая температура (сушка, томление)';
    else if (celsius < 150) description = 'Низкая температура (сушка фруктов)';
    else if (celsius < 180) description = 'Умеренная температура (выпечка кексов, печенья)';
    else if (celsius < 200) description = 'Средняя температура (пироги, торты, рыба)';
    else if (celsius < 230) description = 'Высокая температура (хлеб, пицца)';
    else description = 'Очень высокая температура (запекание мяса)';
    
    return [
      { value: Math.round(celsius), label: '°C' },
      { value: Math.round(fahrenheit), label: '°F' },
      { value: gasMark, label: 'Gas Mark' },
      { value: description, label: 'Описание' }
    ];
  },
  content: {
    howTo: 'Введите температуру и выберите шкалу измерения. Калькулятор автоматически переведёт её в другие единицы.',
    about: 'Три основные шкалы температуры для духовки: Цельсий (°C) — основная в России и Европе, Фаренгейт (°F) — используется в США, Gas Mark — британская газовая шкала.',
    usage: 'Используйте для перевода рецептов из американских или британских источников.',
    faq: [
      {
        question: 'Как перевести °F в °C?',
        answer: 'Формула: °C = (°F - 32) × 5/9. Например, 350°F = (350-32) × 5/9 = 177°C.'
      },
      {
        question: 'Что такое Gas Mark?',
        answer: 'Gas Mark — британская система обозначения температуры для газовых духовок. Gas Mark 4 соответствует примерно 180°C.'
      }
    ],
    sources: [
      { title: 'Gas Mark — Википедия', url: 'https://en.wikipedia.org/wiki/Gas_Mark' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер химических единиц
export const chemistryConverterCalculator: Calculator = {
  id: 'chemistry-converter',
  slug: 'khimicheskie-edinicy',
  title: 'Химические единицы',
  description: 'Перевод молярной массы, концентрации, молей, молярности и других химических единиц',
  category: 'konvertery',
  subcategory: 'conv-khimiya',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'mol', label: 'Моль (mol)' },
        { value: 'mmol', label: 'Миллимоль (mmol)' },
        { value: 'molecules', label: 'Молекулы' },
        { value: 'molarity', label: 'Молярность (M, моль/л)' },
        { value: 'molality', label: 'Моляльность (моль/кг)' },
        { value: 'percent', label: 'Процент (%)' },
        { value: 'ppm', label: 'ppm (мг/л)' },
        { value: 'ppb', label: 'ppb (мкг/л)' }
      ],
      defaultValue: 'mol'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'mol', label: 'Моль (mol)' },
        { value: 'mmol', label: 'Миллимоль (mmol)' },
        { value: 'molecules', label: 'Молекулы' },
        { value: 'molarity', label: 'Молярность (M, моль/л)' },
        { value: 'molality', label: 'Моляльность (моль/кг)' },
        { value: 'percent', label: 'Процент (%)' },
        { value: 'ppm', label: 'ppm (мг/л)' },
        { value: 'ppb', label: 'ppb (мкг/л)' }
      ],
      defaultValue: 'mmol'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) return [{ value: '—', label: 'Результат' }];
    
    // Avogadro constant
    const NA = 6.022e23;
    
    // Convert to moles first
    let mol = 0;
    switch (from) {
      case 'mol': mol = value; break;
      case 'mmol': mol = value / 1000; break;
      case 'molecules': mol = value / NA; break;
      case 'molarity': mol = value; break; // per liter
      case 'molality': mol = value; break; // per kg
      case 'percent': mol = value / 100; break; // approximation
      case 'ppm': mol = value / 1000000; break;
      case 'ppb': mol = value / 1000000000; break;
    }
    
    // Convert from moles to target
    let result = 0;
    switch (to) {
      case 'mol': result = mol; break;
      case 'mmol': result = mol * 1000; break;
      case 'molecules': result = mol * NA; break;
      case 'molarity': result = mol; break;
      case 'molality': result = mol; break;
      case 'percent': result = mol * 100; break;
      case 'ppm': result = mol * 1000000; break;
      case 'ppb': result = mol * 1000000000; break;
    }
    
    const unitLabels: Record<string, string> = {
      mol: 'моль',
      mmol: 'миллимоль',
      molecules: 'молекул',
      molarity: 'М (моль/л)',
      molality: 'моль/кг',
      percent: '%',
      ppm: 'ppm',
      ppb: 'ppb'
    };
    
    let formattedResult: string;
    if (result < 0.001 || result > 1000000) {
      formattedResult = result.toExponential(3);
    } else {
      formattedResult = String(Math.round(result * 1000) / 1000);
    }
    
    return [{
      value: `${value} ${unitLabels[from]} = ${formattedResult} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение, выберите единицы измерения "из" и "в". Калькулятор переведёт химические единицы.',
    about: 'Основные химические единицы: моль — количество вещества, молярность — концентрация в молях на литр, ppm — частей на миллион, ppb — частей на миллиард.',
    usage: 'Используется в химических расчётах, приготовлении растворов, анализе концентраций.',
    faq: [
      {
        question: 'Что такое моль?',
        answer: 'Моль — единица количества вещества, содержащая столько же структурных единиц (атомов, молекул), сколько атомов содержится в 12 г углерода-12 (число Авогадро ~6.022×10²³).'
      },
      {
        question: 'Что такое ppm?',
        answer: 'ppm (parts per million) — частей на миллион. Для водных растворов 1 ppm ≈ 1 мг/л. Используется для очень малых концентраций.'
      }
    ],
    sources: [
      { title: 'Моль — Википедия', url: 'https://ru.wikipedia.org/wiki/Моль' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер размеров экрана и разрешения
export const screenSizeCalculator: Calculator = {
  id: 'screen-size',
  slug: 'razmery-ekrana',
  title: 'Размеры экрана и PPI',
  description: 'Расчёт физических размеров экрана, плотности пикселей (PPI), соотношения сторон',
  category: 'konvertery',
  subcategory: 'conv-cifrovye',
  type: 'converter',
  inputs: [
    {
      name: 'width',
      label: 'Ширина (пиксели)',
      type: 'number',
      placeholder: '1920',
      defaultValue: 1920
    },
    {
      name: 'height',
      label: 'Высота (пиксели)',
      type: 'number',
      placeholder: '1080',
      defaultValue: 1080
    },
    {
      name: 'diagonal',
      label: 'Диагональ (дюймы)',
      type: 'number',
      placeholder: '24',
      defaultValue: 24
    }
  ],
  outputs: [
    { name: 'ppi', label: 'PPI (пикселей на дюйм)', type: 'number' },
    { name: 'aspectRatio', label: 'Соотношение сторон', type: 'text' },
    { name: 'widthInch', label: 'Ширина (дюймы)', type: 'number' },
    { name: 'heightInch', label: 'Высота (дюймы)', type: 'number' },
    { name: 'widthCm', label: 'Ширина (см)', type: 'number' },
    { name: 'heightCm', label: 'Высота (см)', type: 'number' },
    { name: 'totalPixels', label: 'Всего пикселей (MP)', type: 'number' }
  ],
  calculate: (inputs) => {
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const diagonal = Number(inputs.diagonal);
    
    if (!width || !height || !diagonal) {
      return [
        { value: '—', label: 'PPI (пикселей на дюйм)' },
        { value: '—', label: 'Соотношение сторон' },
        { value: '—', label: 'Ширина (дюймы)' },
        { value: '—', label: 'Высота (дюймы)' },
        { value: '—', label: 'Ширина (см)' },
        { value: '—', label: 'Высота (см)' },
        { value: '—', label: 'Всего пикселей (MP)' }
      ];
    }
    
    // Calculate diagonal in pixels
    const diagonalPixels = Math.sqrt(width ** 2 + height ** 2);
    
    // Calculate PPI
    const ppi = diagonalPixels / diagonal;
    
    // Calculate aspect ratio (simplified)
    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
    const divisor = gcd(width, height);
    const aspectW = width / divisor;
    const aspectH = height / divisor;
    
    // Simplify common ratios
    let aspectRatio = '';
    if (Math.abs(width / height - 16 / 9) < 0.01) aspectRatio = '16:9';
    else if (Math.abs(width / height - 4 / 3) < 0.01) aspectRatio = '4:3';
    else if (Math.abs(width / height - 21 / 9) < 0.01) aspectRatio = '21:9 (ультраширокий)';
    else if (Math.abs(width / height - 3 / 2) < 0.01) aspectRatio = '3:2';
    else if (Math.abs(width / height - 1) < 0.01) aspectRatio = '1:1 (квадрат)';
    else aspectRatio = `${Math.round(aspectW)}:${Math.round(aspectH)}`;
    
    // Calculate physical dimensions
    const widthInch = width / ppi;
    const heightInch = height / ppi;
    const widthCm = widthInch * 2.54;
    const heightCm = heightInch * 2.54;
    
    // Total megapixels
    const totalPixels = (width * height) / 1000000;
    
    return [
      { value: Math.round(ppi * 10) / 10, label: 'PPI (пикселей на дюйм)' },
      { value: aspectRatio, label: 'Соотношение сторон' },
      { value: Math.round(widthInch * 10) / 10, label: 'Ширина (дюймы)' },
      { value: Math.round(heightInch * 10) / 10, label: 'Высота (дюймы)' },
      { value: Math.round(widthCm * 10) / 10, label: 'Ширина (см)' },
      { value: Math.round(heightCm * 10) / 10, label: 'Высота (см)' },
      { value: Math.round(totalPixels * 10) / 10, label: 'Всего пикселей (MP)' }
    ];
  },
  content: {
    howTo: 'Введите разрешение экрана в пикселях (ширина и высота) и диагональ в дюймах. Калькулятор рассчитает плотность пикселей и физические размеры.',
    about: 'PPI (pixels per inch) — плотность пикселей на дюйм. Чем выше PPI, тем более чёткое и детализированное изображение. Смартфоны имеют PPI 300-500+, мониторы обычно 90-140 PPI.',
    usage: 'Используется для сравнения качества дисплеев, расчёта оптимального разрешения для печати, выбора монитора.',
    faq: [
      {
        question: 'Какой PPI считается хорошим?',
        answer: 'Для мониторов: 90-110 PPI — стандарт, 140+ PPI — Retina/HiDPI. Для смартфонов: 300+ PPI — отлично. Для печати: 300 PPI — фотокачество.'
      },
      {
        question: 'Что такое Retina дисплей?',
        answer: 'Retina — маркетинговый термин Apple для дисплеев с PPI настолько высоким, что глаз не различает отдельные пиксели при обычном расстоянии просмотра (обычно >300 PPI для смартфонов).'
      }
    ],
    sources: [
      { title: 'Pixel density — Википедия', url: 'https://en.wikipedia.org/wiki/Pixel_density' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор пропорций
export const proportionCalculator: Calculator = {
  id: 'proportion',
  slug: 'proporcii',
  title: 'Решение пропорций',
  description: 'Решение пропорций вида a:b = c:d. Нахождение неизвестного члена пропорции',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'a',
      label: 'a (первое значение)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2
    },
    {
      name: 'b',
      label: 'b (второе значение)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4
    },
    {
      name: 'c',
      label: 'c (третье значение)',
      type: 'number',
      placeholder: '6',
      defaultValue: 6
    },
    {
      name: 'find',
      label: 'Найти',
      type: 'select',
      options: [
        { value: 'd', label: 'd (четвёртое значение)' },
        { value: 'c', label: 'c (третье значение)' },
        { value: 'b', label: 'b (второе значение)' },
        { value: 'a', label: 'a (первое значение)' }
      ],
      defaultValue: 'd'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'number' },
    { name: 'formula', label: 'Формула', type: 'text' },
    { name: 'proportion', label: 'Пропорция', type: 'text' }
  ],
  calculate: (inputs) => {
    const a = Number(inputs.a);
    const b = Number(inputs.b);
    const c = Number(inputs.c);
    const find = String(inputs.find);
    
    let result = 0;
    let formula = '';
    let proportion = '';
    
    switch (find) {
      case 'd':
        if (!a || !b || !c) return [{ value: '—', label: 'Результат' }, { value: '', label: 'Формула' }, { value: '', label: 'Пропорция' }];
        result = (b * c) / a;
        formula = 'd = (b × c) / a';
        proportion = `${a}:${b} = ${c}:${Math.round(result * 100) / 100}`;
        break;
      case 'c':
        if (!a || !b) return [{ value: '—', label: 'Результат' }, { value: '', label: 'Формула' }, { value: '', label: 'Пропорция' }];
        result = (a * c) / b;
        formula = 'c = (a × d) / b';
        proportion = `${a}:${b} = ${Math.round(result * 100) / 100}:${c}`;
        break;
      case 'b':
        if (!a || !c) return [{ value: '—', label: 'Результат' }, { value: '', label: 'Формула' }, { value: '', label: 'Пропорция' }];
        result = (a * b) / c;
        formula = 'b = (a × d) / c';
        proportion = `${a}:${Math.round(result * 100) / 100} = ${c}:${b}`;
        break;
      case 'a':
        if (!b || !c) return [{ value: '—', label: 'Результат' }, { value: '', label: 'Формула' }, { value: '', label: 'Пропорция' }];
        result = (b * c) / a;
        formula = 'a = (b × c) / d';
        proportion = `${Math.round(result * 100) / 100}:${b} = ${c}:${a}`;
        break;
    }
    
    return [
      { value: Math.round(result * 1000) / 1000, label: 'Результат' },
      { value: formula, label: 'Формула' },
      { value: proportion, label: 'Пропорция' }
    ];
  },
  content: {
    howTo: 'Введите три известных значения пропорции a:b = c:d и выберите, какое значение нужно найти. Калькулятор решит пропорцию.',
    about: 'Пропорция — равенство двух отношений a:b = c:d. Основное свойство: произведение крайних членов равно произведению средних (a×d = b×c).',
    formula: 'Если a:b = c:d, то a×d = b×c. Отсюда любой неизвестный член можно найти через остальные.',
    usage: 'Используется для масштабирования, перевода единиц, расчёта концентраций, решения задач на проценты.',
    faq: [
      {
        question: 'Как найти неизвестный член пропорции?',
        answer: 'Используйте основное свойство: произведение крайних равно произведению средних. Если a:b = c:d и ищем d, то d = (b×c)/a.'
      }
    ],
    sources: [
      { title: 'Пропорция — Википедия', url: 'https://ru.wikipedia.org/wiki/Пропорция_(математика)' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер времени (расширенный)
export const timeExtendedConverter: Calculator = {
  id: 'time-extended',
  slug: 'vremya-rasshirennoe',
  title: 'Время (расширенный)',
  description: 'Перевод между секундами, минутами, часами, днями, неделями, месяцами, годами, декадами, веками',
  category: 'konvertery',
  subcategory: 'conv-vremya',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'second', label: 'Секунды' },
        { value: 'minute', label: 'Минуты' },
        { value: 'hour', label: 'Часы' },
        { value: 'day', label: 'Дни' },
        { value: 'week', label: 'Недели' },
        { value: 'month', label: 'Месяцы (30 дней)' },
        { value: 'year', label: 'Годы (365 дней)' },
        { value: 'decade', label: 'Декады (10 лет)' },
        { value: 'century', label: 'Века' },
        { value: 'millennium', label: 'Тысячелетия' }
      ],
      defaultValue: 'year'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'second', label: 'Секунды' },
        { value: 'minute', label: 'Минуты' },
        { value: 'hour', label: 'Часы' },
        { value: 'day', label: 'Дни' },
        { value: 'week', label: 'Недели' },
        { value: 'month', label: 'Месяцы (30 дней)' },
        { value: 'year', label: 'Годы (365 дней)' },
        { value: 'decade', label: 'Декады (10 лет)' },
        { value: 'century', label: 'Века' },
        { value: 'millennium', label: 'Тысячелетия' }
      ],
      defaultValue: 'day'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) return [{ value: '—', label: 'Результат' }];
    
    // Conversion factors to seconds
    const toSeconds: Record<string, number> = {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400,
      week: 604800,
      month: 2592000, // 30 days
      year: 31536000, // 365 days
      decade: 315360000,
      century: 3153600000,
      millennium: 31536000000
    };
    
    const seconds = value * toSeconds[from];
    const result = seconds / toSeconds[to];
    
    const unitLabels: Record<string, string> = {
      second: 'секунд',
      minute: 'минут',
      hour: 'часов',
      day: 'дней',
      week: 'недель',
      month: 'месяцев',
      year: 'лет',
      decade: 'декад',
      century: 'веков',
      millennium: 'тысячелетий'
    };
    
    // Format large numbers
    let formattedResult: string;
    if (result >= 1000000000) {
      formattedResult = result.toExponential(3);
    } else if (result >= 1) {
      formattedResult = String(Math.round(result * 100) / 100);
    } else {
      formattedResult = result.toExponential(3);
    }
    
    return [{
      value: `${value} ${unitLabels[from]} = ${formattedResult} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение, выберите единицы времени "из" и "в". Калькулятор переведёт время между любыми единицами.',
    about: 'Расширенный конвертер времени включает как малые единицы (секунды, минуты), так и большие периоды (годы, века, тысячелетия).',
    usage: 'Используйте для исторических расчётов, астрономии, масштабирования времени.',
    faq: [
      {
        question: 'Сколько секунд в году?',
        answer: 'В невисокосном году (365 дней): 31,536,000 секунд. В високосном году (366 дней): 31,622,400 секунд.'
      }
    ],
    sources: [
      { title: 'Единицы времени — Википедия', url: 'https://ru.wikipedia.org/wiki/Единицы_времени' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер мощности
export const powerConverterCalculator: Calculator = {
  id: 'power-advanced-converter',
  slug: 'moshchnost',
  title: 'Мощность',
  description: 'Перевод мощности между ваттами, киловаттами, лошадиными силами, BTU/ч и другими единицами',
  category: 'konvertery',
  subcategory: 'conv-moshchnost',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'w', label: 'Ватт (Вт)' },
        { value: 'kw', label: 'Киловатт (кВт)' },
        { value: 'mw', label: 'Мегаватт (МВт)' },
        { value: 'hp', label: 'Лошадиная сила (л.с.)' },
        { value: 'hp_uk', label: 'Horsepower (HP, UK)' },
        { value: 'btu_h', label: 'BTU/час' },
        { value: 'kj_h', label: 'кДж/час' },
        { value: 'cal_s', label: 'калорий/секунду' },
        { value: 'j_s', label: 'Джоуль/секунду' }
      ],
      defaultValue: 'kw'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'w', label: 'Ватт (Вт)' },
        { value: 'kw', label: 'Киловатт (кВт)' },
        { value: 'mw', label: 'Мегаватт (МВт)' },
        { value: 'hp', label: 'Лошадиная сила (л.с.)' },
        { value: 'hp_uk', label: 'Horsepower (HP, UK)' },
        { value: 'btu_h', label: 'BTU/час' },
        { value: 'kj_h', label: 'кДж/час' },
        { value: 'cal_s', label: 'калорий/секунду' },
        { value: 'j_s', label: 'Джоуль/секунду' }
      ],
      defaultValue: 'hp'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) return [{ value: '—', label: 'Результат' }];
    
    // Conversion factors to watts
    const toWatts: Record<string, number> = {
      w: 1,
      kw: 1000,
      mw: 1000000,
      hp: 735.49875, // Metric horsepower
      hp_uk: 745.7, // Imperial horsepower
      btu_h: 0.29307107,
      kj_h: 0.27777778,
      cal_s: 4.1868,
      j_s: 1 // Same as watt
    };
    
    const watts = value * toWatts[from];
    const result = watts / toWatts[to];
    
    const unitLabels: Record<string, string> = {
      w: 'Вт',
      kw: 'кВт',
      mw: 'МВт',
      hp: 'л.с.',
      hp_uk: 'HP',
      btu_h: 'BTU/ч',
      kj_h: 'кДж/ч',
      cal_s: 'кал/с',
      j_s: 'Дж/с'
    };
    
    return [{
      value: `${value} ${unitLabels[from]} = ${Math.round(result * 1000) / 1000} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите мощность, выберите единицы измерения "из" и "в". Калькулятор переведёт мощность.',
    about: 'Основные единицы мощности: Ватт (Вт) — базовая единица СИ, Киловатт (кВт) = 1000 Вт, Лошадиная сила (л.с.) ≈ 735.5 Вт, BTU/час — британская тепловая единица в час.',
    usage: 'Используется для сравнения мощности двигателей, расчёта энергопотребления, кондиционирования.',
    faq: [
      {
        question: 'Чем отличается метрическая л.с. от имперской?',
        answer: 'Метрическая лошадиная сила (PS/CV) = 735.49875 Вт, используется в Европе и России. Имперская (HP) = 745.7 Вт, используется в США и UK.'
      },
      {
        question: 'Что такое BTU/час?',
        answer: 'BTU (British Thermal Unit) — британская тепловая единица. 1 BTU/час ≈ 0.293 Вт. Используется в кондиционировании и отоплении.'
      }
    ],
    sources: [
      { title: 'Ватт — Википедия', url: 'https://ru.wikipedia.org/wiki/Ватт' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер напряжения и силы тока
export const electricalConverterCalculator: Calculator = {
  id: 'electrical-converter',
  slug: 'elektricheskie-velichiny',
  title: 'Электрические величины',
  description: 'Перевод между единицами напряжения (В, кВ, мВ), силы тока (А, мА), сопротивления и ёмкости',
  category: 'konvertery',
  subcategory: 'conv-elektrichestvo',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '220',
      defaultValue: 220
    },
    {
      name: 'type',
      label: 'Тип величины',
      type: 'select',
      options: [
        { value: 'voltage', label: 'Напряжение' },
        { value: 'current', label: 'Сила тока' },
        { value: 'resistance', label: 'Сопротивление' },
        { value: 'capacitance', label: 'Ёмкость' },
        { value: 'inductance', label: 'Индуктивность' }
      ],
      defaultValue: 'voltage'
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'v', label: 'Вольт (В)' },
        { value: 'mv', label: 'Милливольт (мВ)' },
        { value: 'kv', label: 'Киловольт (кВ)' },
        { value: 'a', label: 'Ампер (А)' },
        { value: 'ma', label: 'Миллиампер (мА)' },
        { value: 'ohm', label: 'Ом (Ω)' },
        { value: 'kohm', label: 'Килоом (кОм)' },
        { value: 'mohm', label: 'Мегаом (МОм)' },
        { value: 'f', label: 'Фарад (Ф)' },
        { value: 'mf', label: 'Микрофарад (мкФ)' },
        { value: 'pf', label: 'Пикофарад (пФ)' },
        { value: 'h', label: 'Генри (Гн)' },
        { value: 'mh', label: 'Миллигенри (мГн)' },
        { value: 'uh', label: 'Микрогенри (мкГн)' }
      ],
      defaultValue: 'v'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'v', label: 'Вольт (В)' },
        { value: 'mv', label: 'Милливольт (мВ)' },
        { value: 'kv', label: 'Киловольт (кВ)' },
        { value: 'a', label: 'Ампер (А)' },
        { value: 'ma', label: 'Миллиампер (мА)' },
        { value: 'ohm', label: 'Ом (Ω)' },
        { value: 'kohm', label: 'Килоом (кОм)' },
        { value: 'mohm', label: 'Мегаом (МОм)' },
        { value: 'f', label: 'Фарад (Ф)' },
        { value: 'mf', label: 'Микрофарад (мкФ)' },
        { value: 'pf', label: 'Пикофарад (пФ)' },
        { value: 'h', label: 'Генри (Гн)' },
        { value: 'mh', label: 'Миллигенри (мГн)' },
        { value: 'uh', label: 'Микрогенри (мкГн)' }
      ],
      defaultValue: 'kv'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) return [{ value: '—', label: 'Результат' }];
    
    // Conversion factors to base units
    const toBase: Record<string, number> = {
      // Voltage (V)
      v: 1,
      mv: 0.001,
      kv: 1000,
      // Current (A)
      a: 1,
      ma: 0.001,
      // Resistance (Ohm)
      ohm: 1,
      kohm: 1000,
      mohm: 1000000,
      // Capacitance (F)
      f: 1,
      mf: 0.000001,
      pf: 0.000000000001,
      // Inductance (H)
      h: 1,
      mh: 0.001,
      uh: 0.000001
    };
    
    const base = value * toBase[from];
    const result = base / toBase[to];
    
    const unitLabels: Record<string, string> = {
      v: 'В',
      mv: 'мВ',
      kv: 'кВ',
      a: 'А',
      ma: 'мА',
      ohm: 'Ом',
      kohm: 'кОм',
      mohm: 'МОм',
      f: 'Ф',
      mf: 'мкФ',
      pf: 'пФ',
      h: 'Гн',
      mh: 'мГн',
      uh: 'мкГн'
    };
    
    // Format result
    let formattedResult: string;
    if (result >= 1000000 || result < 0.001) {
      formattedResult = result.toExponential(3);
    } else {
      formattedResult = String(Math.round(result * 1000000) / 1000000);
    }
    
    return [{
      value: `${value} ${unitLabels[from]} = ${formattedResult} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение, выберите тип величины и единицы измерения "из" и "в". Калькулятор переведёт электрические величины.',
    about: 'Основные электрические величины: Напряжение (Вольт), Сила тока (Ампер), Сопротивление (Ом), Ёмкость (Фарад), Индуктивность (Генри).',
    usage: 'Используется в электротехнике, электронике, ремонте, расчёте схем.',
    faq: [
      {
        question: 'Какие префиксы используются для электрических величин?',
        answer: 'Микро (мк/μ) = 10⁻⁶, Милли (м) = 10⁻³, Кило (к) = 10³, Мега (М) = 10⁶, Гига (Г) = 10⁹.'
      }
    ],
    sources: [
      { title: 'Электрические единицы — Википедия', url: 'https://ru.wikipedia.org/wiki/Электрические_единицы' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер плотности
export const densityConverterCalculator: Calculator = {
  id: 'density-converter',
  slug: 'plotnost',
  title: 'Плотность',
  description: 'Перевод плотности между кг/м³, г/см³, кг/л, фунт/фут³ и другими единицами',
  category: 'konvertery',
  subcategory: 'conv-plotnost',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'kg_m3', label: 'кг/м³' },
        { value: 'g_cm3', label: 'г/см³' },
        { value: 'kg_l', label: 'кг/л' },
        { value: 'g_ml', label: 'г/мл' },
        { value: 'lb_ft3', label: 'фунт/фут³' },
        { value: 'lb_gal', label: 'фунт/галлон (US)' },
        { value: 'oz_gal', label: 'унция/галлон' }
      ],
      defaultValue: 'kg_m3'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'kg_m3', label: 'кг/м³' },
        { value: 'g_cm3', label: 'г/см³' },
        { value: 'kg_l', label: 'кг/л' },
        { value: 'g_ml', label: 'г/мл' },
        { value: 'lb_ft3', label: 'фунт/фут³' },
        { value: 'lb_gal', label: 'фунт/галлон (US)' },
        { value: 'oz_gal', label: 'унция/галлон' }
      ],
      defaultValue: 'g_cm3'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) return [{ value: '—', label: 'Результат' }];
    
    // Conversion factors to kg/m³
    const toKgM3: Record<string, number> = {
      kg_m3: 1,
      g_cm3: 1000,
      kg_l: 1000,
      g_ml: 1000,
      lb_ft3: 16.0185,
      lb_gal: 119.826,
      oz_gal: 7.48915
    };
    
    const kgM3 = value * toKgM3[from];
    const result = kgM3 / toKgM3[to];
    
    const unitLabels: Record<string, string> = {
      kg_m3: 'кг/м³',
      g_cm3: 'г/см³',
      kg_l: 'кг/л',
      g_ml: 'г/мл',
      lb_ft3: 'lb/ft³',
      lb_gal: 'lb/gal',
      oz_gal: 'oz/gal'
    };
    
    // Format result
    let formattedResult: string;
    if (result >= 1000000 || result < 0.0001) {
      formattedResult = result.toExponential(3);
    } else {
      formattedResult = String(Math.round(result * 10000) / 10000);
    }
    
    return [{
      value: `${value} ${unitLabels[from]} = ${formattedResult} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение плотности, выберите единицы измерения "из" и "в". Калькулятор переведёт плотность.',
    about: 'Плотность — масса единицы объёма вещества. Базовая единица: кг/м³. Вода имеет плотность ~1000 кг/м³ (или 1 г/см³).',
    usage: 'Используется в физике, химии, инженерии, для определения состава материалов.',
    faq: [
      {
        question: 'Какая плотность у воды?',
        answer: 'При 4°C плотность воды максимальна и равна 1000 кг/м³ (1 г/см³, 1 кг/л). При комнатной температуре (~20°C) ≈ 998 кг/м³.'
      },
      {
        question: 'Как определить плотность вещества?',
        answer: 'Плотность ρ = m/V, где m — масса, V — объём. Измерьте массу образца и его объём (например, погрузив в воду), затем разделите.'
      }
    ],
    sources: [
      { title: 'Плотность — Википедия', url: 'https://ru.wikipedia.org/wiki/Плотность' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const moreConvertersCalculators: Calculator[] = [
  cookingMeasuresExtendedCalculator,
  bakingTemperatureCalculator,
  chemistryConverterCalculator,
  screenSizeCalculator,
  proportionCalculator,
  timeExtendedConverter,
  powerConverterCalculator,
  electricalConverterCalculator,
  densityConverterCalculator,
];
