import { Calculator } from '../types';

// Конвертер площади
export const areaConverter: Calculator = {
  id: 'area-converter',
  slug: 'konverter-ploshchadi',
  title: 'Конвертер площади',
  description: 'Перевод квадратных метров, гектаров, акров, квадратных футов',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'm2', label: 'м² — квадратные метры' },
        { value: 'km2', label: 'км² — квадратные километры' },
        { value: 'ha', label: 'га — гектары' },
        { value: 'acre', label: 'акры' },
        { value: 'ft2', label: 'фут² — квадратные футы' },
        { value: 'yd2', label: 'ярд² — квадратные ярды' },
        { value: 'in2', label: 'дюйм² — квадратные дюймы' },
        { value: 'cm2', label: 'см² — квадратные сантиметры' },
        { value: 'mm2', label: 'мм² — квадратные миллиметры' }
      ],
      defaultValue: 'm2'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'm2', label: 'м² — квадратные метры' },
        { value: 'km2', label: 'км² — квадратные километры' },
        { value: 'ha', label: 'га — гектары' },
        { value: 'acre', label: 'акры' },
        { value: 'ft2', label: 'фут² — квадратные футы' },
        { value: 'yd2', label: 'ярд² — квадратные ярды' },
        { value: 'in2', label: 'дюйм² — квадратные дюймы' },
        { value: 'cm2', label: 'см² — квадратные сантиметры' },
        { value: 'mm2', label: 'мм² — квадратные миллиметры' }
      ],
      defaultValue: 'ha'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Convert to square meters first
    const toSquareMeters: Record<string, number> = {
      'm2': 1,
      'km2': 1e6,
      'ha': 10000,
      'acre': 4046.86,
      'ft2': 0.092903,
      'yd2': 0.836127,
      'in2': 0.00064516,
      'cm2': 0.0001,
      'mm2': 0.000001
    };
    
    const inSquareMeters = value * toSquareMeters[from];
    const result = inSquareMeters / toSquareMeters[to];
    
    const labels: Record<string, string> = {
      'm2': 'м²', 'km2': 'км²', 'ha': 'га', 'acre': 'акров',
      'ft2': 'фут²', 'yd2': 'ярд²', 'in2': 'дюйм²', 'cm2': 'см²', 'mm2': 'мм²'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение площади, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Площадь — мера размера поверхности. Основная единица в СИ — квадратный метр (м²).',
    usage: 'Используется в строительстве, недвижимости, земледелии, географии.',
    formula: '1 га = 10000 м² = 2.47 акра\n1 акр = 4046.86 м²\n1 фут² = 0.0929 м²',
    faq: [
      {
        question: 'Сколько гектаров в квадратном километре?',
        answer: '1 км² = 100 га. Квадратный километр — это квадрат со стороной 1 км.'
      },
      {
        question: 'Как перевести акры в гектары?',
        answer: 'Умножьте акры на 0.4047. Например, 10 акров = 4.047 га.'
      }
    ],
    sources: [
      { title: 'Площадь — Википедия', url: 'https://ru.wikipedia.org/wiki/Площадь' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер объёма
export const volumeConverter: Calculator = {
  id: 'volume-converter',
  slug: 'konverter-obyoma',
  title: 'Конвертер объёма',
  description: 'Перевод литров, галлонов, кубических метров, баррелей',
  category: 'konvertery',
  subcategory: 'conv-obem',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'l', label: 'л — литры' },
        { value: 'ml', label: 'мл — миллилитры' },
        { value: 'm3', label: 'м³ — кубические метры' },
        { value: 'cm3', label: 'см³ — кубические сантиметры' },
        { value: 'gal', label: 'gal — галлоны (US)' },
        { value: 'qt', label: 'qt — кварты (US)' },
        { value: 'pt', label: 'pt — пинты (US)' },
        { value: 'cup', label: 'cup — чашки' },
        { value: 'fl_oz', label: 'fl oz — жидкие унции' },
        { value: 'bbl', label: 'bbl — баррели' }
      ],
      defaultValue: 'l'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'l', label: 'л — литры' },
        { value: 'ml', label: 'мл — миллилитры' },
        { value: 'm3', label: 'м³ — кубические метры' },
        { value: 'cm3', label: 'см³ — кубические сантиметры' },
        { value: 'gal', label: 'gal — галлоны (US)' },
        { value: 'qt', label: 'qt — кварты (US)' },
        { value: 'pt', label: 'pt — пинты (US)' },
        { value: 'cup', label: 'cup — чашки' },
        { value: 'fl_oz', label: 'fl oz — жидкие унции' },
        { value: 'bbl', label: 'bbl — баррели' }
      ],
      defaultValue: 'gal'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Convert to liters first
    const toLiters: Record<string, number> = {
      'l': 1,
      'ml': 0.001,
      'm3': 1000,
      'cm3': 0.001,
      'gal': 3.78541,
      'qt': 0.946353,
      'pt': 0.473176,
      'cup': 0.24,
      'fl_oz': 0.0295735,
      'bbl': 158.987
    };
    
    const inLiters = value * toLiters[from];
    const result = inLiters / toLiters[to];
    
    const labels: Record<string, string> = {
      'l': 'л', 'ml': 'мл', 'm3': 'м³', 'cm3': 'см³',
      'gal': 'галлонов', 'qt': 'кварт', 'pt': 'пинт',
      'cup': 'чашек', 'fl_oz': 'жидких унций', 'bbl': 'баррелей'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите объём, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Объём — мера пространства, занимаемого телом. Основная единица в СИ — кубический метр (м³).',
    usage: 'Используется в кулинарии, химии, топливе, строительстве, медицине.',
    formula: '1 м³ = 1000 л = 264.17 галлонов (US)\n1 баррель нефти = 158.99 л = 42 галлона',
    faq: [
      {
        question: 'Сколько литров в кубическом метре?',
        answer: '1 м³ = 1000 л. Это куб со стороной 1 метр.'
      },
      {
        question: 'Сколько литров в галлоне?',
        answer: '1 галлон (US) = 3.785 л, 1 галлон (UK) = 4.546 л.'
      }
    ],
    sources: [
      { title: 'Объём — Википедия', url: 'https://ru.wikipedia.org/wiki/Объём' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор кубатуры бревен/бруса
export const logVolumeCalculator: Calculator = {
  id: 'log-volume-calculator',
  slug: 'kalkulyator-kubatury-brevna',
  title: 'Калькулятор кубатуры бревна',
  description: 'Расчёт объёма круглого леса по диаметру и длине',
  category: 'stroitelstvo-i-remont',
  subcategory: 'stroitelnye-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'diameter',
      label: 'Диаметр верхнего обреза (см)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 5,
      max: 100
    },
    {
      name: 'length',
      label: 'Длина бревна (м)',
      type: 'number',
      placeholder: '6',
      defaultValue: 6,
      min: 1,
      max: 12
    },
    {
      name: 'quantity',
      label: 'Количество брёвен',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 1
    }
  ],
  outputs: [
    { name: 'singleVolume', label: 'Объём одного бревна', type: 'number', unit: 'м³' },
    { name: 'totalVolume', label: 'Общий объём', type: 'number', unit: 'м³' }
  ],
  calculate: (inputs) => {
    const diameter = Number(inputs.diameter) / 100; // convert to meters
    const length = Number(inputs.length);
    const quantity = Number(inputs.quantity);
    
    if (!diameter || !length || !quantity) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Volume of a cylinder: π × r² × h
    const radius = diameter / 2;
    const singleVolume = Math.PI * radius * radius * length;
    const totalVolume = singleVolume * quantity;
    
    return [
      { value: singleVolume.toFixed(3), label: 'Объём одного бревна', unit: 'м³' },
      { value: totalVolume.toFixed(3), label: 'Общий объём', unit: 'м³' }
    ];
  },
  content: {
    howTo: 'Введите диаметр верхнего обреза, длину и количество брёвен. Калькулятор рассчитает объём.',
    about: 'Кубатура бревна — объём круглого лесоматериала, вычисляемый по формуле объёма цилиндра.',
    usage: 'Используется при закупке и продаже круглого леса, строительстве домов из бревна.',
    formula: 'V = π × (d/2)² × L\nГде d — диаметр в метрах, L — длина в метрах',
    faq: [
      {
        question: 'Как правильно измерить диаметр бревна?',
        answer: 'Измеряется диаметр верхнего обреза (тонкого конца) без коры, через центр.'
      },
      {
        question: 'Почему используется диаметр верхнего обреза?',
        answer: 'По ГОСТ диаметр отсчитывается у верхнего обреза, так как бревно коническое.'
      }
    ],
    sources: [
      { title: 'Лесоматериалы круглые — Википедия', url: 'https://ru.wikipedia.org/wiki/Лесоматериалы_круглые' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор кубатуры доски
export const boardVolumeCalculator: Calculator = {
  id: 'board-volume-calculator',
  slug: 'kalkulyator-kubatury-doski',
  title: 'Калькулятор кубатуры доски',
  description: 'Сколько досок в кубе и куб в досках',
  category: 'stroitelstvo-i-remont',
  subcategory: 'stroitelnye-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'thickness',
      label: 'Толщина (мм)',
      type: 'number',
      placeholder: '25',
      defaultValue: 25,
      min: 5,
      max: 100
    },
    {
      name: 'width',
      label: 'Ширина (мм)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 10,
      max: 300
    },
    {
      name: 'length',
      label: 'Длина (м)',
      type: 'number',
      placeholder: '6',
      defaultValue: 6,
      min: 0.5,
      max: 12
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём одной доски', type: 'number', unit: 'м³' },
    { name: 'boardsInCube', label: 'Досок в кубе', type: 'number', unit: 'шт' },
    { name: 'cubePrice', label: 'Цена за доску', type: 'text' }
  ],
  calculate: (inputs) => {
    const thickness = Number(inputs.thickness) / 1000;
    const width = Number(inputs.width) / 1000;
    const length = Number(inputs.length);
    
    if (!thickness || !width || !length) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const volume = thickness * width * length;
    const boardsInCube = Math.floor(1 / volume);
    const pricePerBoard = 10000 / boardsInCube; // Assuming 10000 per cubic meter
    
    return [
      { value: volume.toFixed(5), label: 'Объём одной доски', unit: 'м³' },
      { value: boardsInCube.toString(), label: 'Досок в кубе', unit: 'шт' },
      { value: `При цене 10000₽/м³: ~${Math.round(pricePerBoard)}₽ за доску`, label: 'Цена за доску', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите толщину, ширину и длину доски. Калькулятор покажет объём и количество в кубе.',
    about: 'Кубатура доски помогает рассчитать сколько досок в кубическом метре и объём одной доски.',
    usage: 'Используется при закупке пиломатериалов для расчёта количества и стоимости.',
    formula: 'Объём = толщина × ширина × длина (в метрах)\nДосок в кубе = ⌊1 / объём⌋',
    faq: [
      {
        question: 'Сколько досок 50×150×6000 мм в кубе?',
        answer: 'Объём = 0.05 × 0.15 × 6 = 0.045 м³. Досок в кубе = 1 / 0.045 ≈ 22 штуки.'
      },
      {
        question: 'Как рассчитать стоимость досок?',
        answer: 'Умножьте объём одной доски на цену за куб. Или разделите цену куба на количество досок в кубе.'
      }
    ],
    sources: [
      { title: 'Пиломатериалы — Википедия', url: 'https://ru.wikipedia.org/wiki/Пиломатериалы' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const areaVolumeCalculators = [
  areaConverter,
  volumeConverter,
  logVolumeCalculator,
  boardVolumeCalculator,
];
