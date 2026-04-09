import { Calculator } from '../types';

// Калькулятор плитки
export const tileCalculator: Calculator = {
  id: 'tile-floor-calculator',
  slug: 'kalkulyator-plitki',
  title: 'Калькулятор плитки',
  description: 'Расчёт количества плитки для пола и стен с учётом запаса',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'length',
      label: 'Длина помещения (м)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0.1
    },
    {
      name: 'width',
      label: 'Ширина помещения (м)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      min: 0.1
    },
    {
      name: 'tileLength',
      label: 'Длина плитки (см)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 1
    },
    {
      name: 'tileWidth',
      label: 'Ширина плитки (см)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 1
    },
    {
      name: 'reserve',
      label: 'Запас (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 50
    }
  ],
  outputs: [
    { name: 'area', label: 'Площадь помещения', type: 'number', unit: 'м²' },
    { name: 'tileCount', label: 'Количество плитки', type: 'number', unit: 'шт' },
    { name: 'tileArea', label: 'Площадь плитки', type: 'number', unit: 'м²' }
  ],
  calculate: (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const tileLength = Number(inputs.tileLength) / 100;
    const tileWidth = Number(inputs.tileWidth) / 100;
    const reserve = Number(inputs.reserve) / 100;
    
    if (!length || !width || !tileLength || !tileWidth) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const area = length * width;
    const tileArea = tileLength * tileWidth;
    const tileCount = Math.ceil((area / tileArea) * (1 + reserve));
    const totalTileArea = tileCount * tileArea;
    
    return [
      { value: area.toFixed(2), label: 'Площадь помещения', unit: 'м²' },
      { value: tileCount.toString(), label: 'Количество плитки', unit: 'шт' },
      { value: totalTileArea.toFixed(2), label: 'Площадь плитки с запасом', unit: 'м²' }
    ];
  },
  content: {
    howTo: 'Введите размеры помещения и плитки, укажите процент запаса. Калькулятор рассчитает необходимое количество.',
    about: 'Калькулятор плитки помогает рассчитать точное количество плитки для отделки пола или стен с учётом запаса на обрезку и брак.',
    usage: 'Используется при планировании ремонта для точного расчёта материалов и бюджета.',
    formula: 'Площадь = длина × ширина\nПлиток = ⌈(площадь / площадь плитки) × (1 + запас/100)⌉',
    faq: [
      {
        question: 'Какой запас плитки нужен?',
        answer: 'Для прямой укладки — 5-7%, для диагональной — 10-15%, для сложных узоров — до 20%.'
      },
      {
        question: 'Учитывает ли калькулятор дверные проёмы?',
        answer: 'Нет, вычтите площадь проёмов вручную или увеличьте запас. Для точного расчёта используйте план помещения.'
      }
    ],
    sources: [
      { title: 'Керамическая плитка — Википедия', url: 'https://ru.wikipedia.org/wiki/Керамическая_плитка' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор краски
export const paintCalculator: Calculator = {
  id: 'paint-wall-calculator',
  slug: 'kalkulyator-kraski',
  title: 'Калькулятор краски',
  description: 'Расчёт количества краски для стен и потолка',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'wallArea',
      label: 'Площадь стен (м²)',
      type: 'number',
      placeholder: '40',
      defaultValue: 40,
      min: 0.1
    },
    {
      name: 'coats',
      label: 'Количество слоёв',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 1,
      max: 5
    },
    {
      name: 'consumption',
      label: 'Расход краски (л/м²)',
      type: 'number',
      placeholder: '0.15',
      defaultValue: 0.15,
      min: 0.01,
      max: 1,
      step: 0.01
    },
    {
      name: 'canVolume',
      label: 'Объём банки (л)',
      type: 'select',
      options: [
        { value: '0.9', label: '0.9 л' },
        { value: '2.5', label: '2.5 л' },
        { value: '5', label: '5 л' },
        { value: '10', label: '10 л' }
      ],
      defaultValue: '2.5'
    }
  ],
  outputs: [
    { name: 'totalPaint', label: 'Всего краски', type: 'number', unit: 'л' },
    { name: 'cansNeeded', label: 'Банок нужно', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const wallArea = Number(inputs.wallArea);
    const coats = Number(inputs.coats);
    const consumption = Number(inputs.consumption);
    const canVolume = Number(inputs.canVolume);
    
    if (!wallArea || !coats || !consumption || !canVolume) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const totalPaint = wallArea * consumption * coats;
    const cansNeeded = Math.ceil(totalPaint / canVolume);
    
    return [
      { value: totalPaint.toFixed(2), label: 'Всего краски', unit: 'л' },
      { value: cansNeeded.toString(), label: 'Банок нужно', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите площадь стен, количество слоёв, расход краски и объём банки. Калькулятор покажет нужное количество.',
    about: 'Калькулятор краски рассчитывает количество материала для окрашивания поверхностей с учётом слоёв и расхода.',
    usage: 'Используется при планировании покраски помещений для покупки правильного количества краски.',
    formula: 'Краска = площадь × расход × слои\nБанок = ⌈краска / объём банки⌉',
    faq: [
      {
        question: 'Какой расход у разных красок?',
        answer: 'Водоэмульсионные: 0.1-0.15 л/м², масляные: 0.15-0.2 л/м², фасадные: 0.2-0.3 л/м².'
      },
      {
        question: 'Сколько слоёв краски нужно?',
        answer: 'Обычно 2 слоя для хорошего покрытия. На тёмные цвета может понадобиться 3 слоя.'
      }
    ],
    sources: [
      { title: 'Краска — Википедия', url: 'https://ru.wikipedia.org/wiki/Краска' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор бетона
export const concreteCalculator: Calculator = {
  id: 'concrete-foundation-calculator',
  slug: 'kalkulyator-betona',
  title: 'Калькулятор бетона',
  description: 'Расчёт объёма бетона для фундамента и перекрытий',
  category: 'stroitelstvo-i-remont',
  subcategory: 'fundamenty',
  type: 'formula',
  inputs: [
    {
      name: 'length',
      label: 'Длина (м)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0.1
    },
    {
      name: 'width',
      label: 'Ширина (м)',
      type: 'number',
      placeholder: '8',
      defaultValue: 8,
      min: 0.1
    },
    {
      name: 'height',
      label: 'Высота/Толщина (м)',
      type: 'number',
      placeholder: '0.3',
      defaultValue: 0.3,
      min: 0.01,
      step: 0.01
    },
    {
      name: 'shrinkage',
      label: 'Усадка/запас (%)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0,
      max: 20
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём бетона', type: 'number', unit: 'м³' },
    { name: 'mixRatio', label: 'Состав на 1 м³', type: 'text' }
  ],
  calculate: (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const shrinkage = Number(inputs.shrinkage) / 100;
    
    if (!length || !width || !height) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const volume = length * width * height * (1 + shrinkage);
    
    // Typical M300 concrete mix per 1m³
    const cement = Math.round(volume * 350);
    const sand = Math.round(volume * 850);
    const gravel = Math.round(volume * 1050);
    const water = Math.round(volume * 180);
    
    return [
      { value: volume.toFixed(2), label: 'Объём бетона', unit: 'м³' },
      { value: `Цемент: ${cement} кг, Песок: ${sand} кг, Щебень: ${gravel} кг, Вода: ${water} л`, label: 'Состав М300', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите размеры конструкции и процент запаса. Калькулятор рассчитает объём и состав бетона.',
    about: 'Калькулятор бетона определяет объём бетона для фундаментов, плит, перекрытий и других конструкций.',
    usage: 'Используется при строительстве для заказа бетона или расчёта материалов для самостоятельного приготовления.',
    formula: 'Объём = длина × ширина × высота × (1 + запас/100)',
    faq: [
      {
        question: 'Какую марку бетона выбрать?',
        answer: 'Фундамент: М300-М400, перекрытия: М350-М450, дорожки: М200-М250.'
      },
      {
        question: 'Какой запас нужен?',
        answer: 'Для фундамента 5-7%, для сложных форм до 10%. Учитывает усадку и потери при транспортировке.'
      }
    ],
    sources: [
      { title: 'Бетон — Википедия', url: 'https://ru.wikipedia.org/wiki/Бетон' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор обоев
export const wallpaperCalculator: Calculator = {
  id: 'wallpaper-room-calculator',
  slug: 'kalkulyator-oboev',
  title: 'Калькулятор обоев',
  description: 'Расчёт количества рулонов обоев для комнаты',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'perimeter',
      label: 'Периметр комнаты (м)',
      type: 'number',
      placeholder: '18',
      defaultValue: 18,
      min: 1
    },
    {
      name: 'height',
      label: 'Высота потолка (м)',
      type: 'number',
      placeholder: '2.7',
      defaultValue: 2.7,
      min: 1,
      max: 6
    },
    {
      name: 'wallpaperWidth',
      label: 'Ширина рулона (м)',
      type: 'select',
      options: [
        { value: '0.53', label: '0.53 м (стандарт)' },
        { value: '1.06', label: '1.06 м (метровые)' }
      ],
      defaultValue: '0.53'
    },
    {
      name: 'wallpaperLength',
      label: 'Длина рулона (м)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 1
    },
    {
      name: 'patternRepeat',
      label: 'Раппорт узора (м)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0
    }
  ],
  outputs: [
    { name: 'stripsNeeded', label: 'Полос нужно', type: 'number', unit: 'шт' },
    { name: 'rollsNeeded', label: 'Рулонов нужно', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const perimeter = Number(inputs.perimeter);
    const height = Number(inputs.height);
    const wallpaperWidth = Number(inputs.wallpaperWidth);
    const wallpaperLength = Number(inputs.wallpaperLength);
    const patternRepeat = Number(inputs.patternRepeat);
    
    if (!perimeter || !height || !wallpaperWidth || !wallpaperLength) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const stripsNeeded = Math.ceil(perimeter / wallpaperWidth);
    
    // Calculate strip length with pattern matching
    let stripLength = height + 0.1; // +10cm for trimming
    if (patternRepeat > 0) {
      stripLength = Math.ceil((height + 0.1) / patternRepeat) * patternRepeat;
    }
    
    const stripsPerRoll = Math.floor(wallpaperLength / stripLength);
    const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
    
    return [
      { value: stripsNeeded.toString(), label: 'Полос нужно', unit: 'шт' },
      { value: rollsNeeded.toString(), label: 'Рулонов нужно', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите периметр, высоту потолка, параметры обоев и раппорт узора. Калькулятор покажет количество рулонов.',
    about: 'Калькулятор обоев учитывает периметр комнаты, высоту потолков, ширину и длину рулонов, а также раппорт узора.',
    usage: 'Используется при планировании ремонта для покупки правильного количества обоев.',
    formula: 'Полос = ⌈периметр / ширина рулона⌉\nРулонов = ⌈полос / (длина рулона / длина полосы)⌉',
    faq: [
      {
        question: 'Как рассчитать периметр?',
        answer: 'Сложите длины всех стен. Для прямоугольной комнаты: (длина + ширина) × 2.'
      },
      {
        question: 'Что такое раппорт?',
        answer: 'Раппорт — расстояние между повторяющимися элементами узора. Учитывается для подгонки рисунка на стыках.'
      }
    ],
    sources: [
      { title: 'Обои — Википедия', url: 'https://ru.wikipedia.org/wiki/Обои' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор ламината/напольного покрытия
export const flooringCalculator: Calculator = {
  id: 'flooring-basic-calculator',
  slug: 'kalkulyator-laminata',
  title: 'Калькулятор напольного покрытия',
  description: 'Расчёт ламината, паркета, линолеума для пола',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'length',
      label: 'Длина комнаты (м)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0.1
    },
    {
      name: 'width',
      label: 'Ширина комнаты (м)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      min: 0.1
    },
    {
      name: 'plankLength',
      label: 'Длина доски (м)',
      type: 'number',
      placeholder: '1.2',
      defaultValue: 1.2,
      min: 0.1
    },
    {
      name: 'plankWidth',
      label: 'Ширина доски (м)',
      type: 'number',
      placeholder: '0.2',
      defaultValue: 0.2,
      min: 0.01
    },
    {
      name: 'packSize',
      label: 'Досок в упаковке',
      type: 'number',
      placeholder: '8',
      defaultValue: 8,
      min: 1
    },
    {
      name: 'reserve',
      label: 'Запас (%)',
      type: 'number',
      placeholder: '7',
      defaultValue: 7,
      min: 0,
      max: 30
    }
  ],
  outputs: [
    { name: 'area', label: 'Площадь пола', type: 'number', unit: 'м²' },
    { name: 'planksNeeded', label: 'Досок нужно', type: 'number', unit: 'шт' },
    { name: 'packsNeeded', label: 'Упаковок нужно', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const plankLength = Number(inputs.plankLength);
    const plankWidth = Number(inputs.plankWidth);
    const packSize = Number(inputs.packSize);
    const reserve = Number(inputs.reserve) / 100;
    
    if (!length || !width || !plankLength || !plankWidth || !packSize) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const area = length * width;
    const plankArea = plankLength * plankWidth;
    const planksNeeded = Math.ceil((area / plankArea) * (1 + reserve));
    const packsNeeded = Math.ceil(planksNeeded / packSize);
    
    return [
      { value: area.toFixed(2), label: 'Площадь пола', unit: 'м²' },
      { value: planksNeeded.toString(), label: 'Досок нужно', unit: 'шт' },
      { value: packsNeeded.toString(), label: 'Упаковок нужно', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите размеры комнаты, параметры доски, количество в упаковке и запас. Калькулятор покажет нужное количество.',
    about: 'Калькулятор напольного покрытия рассчитывает количество ламината, паркета или других материалов для пола.',
    usage: 'Используется при планировании ремонта для покупки правильного количества материала.',
    formula: 'Досок = ⌈(площадь / площадь доски) × (1 + запас)⌉\nУпаковок = ⌈досок / досок в упаковке⌉',
    faq: [
      {
        question: 'Какой запас нужен для ламината?',
        answer: 'Для прямой укладки — 5-7%, для диагональной — 10-12%, для сложных комнат — до 15%.'
      },
      {
        question: 'Какие размеры стандартных досок?',
        answer: 'Ламинат: 1280×192 мм, паркетная доска: 2200×180 мм, инженерная доска: 1800×150 мм.'
      }
    ],
    sources: [
      { title: 'Ламинат — Википедия', url: 'https://ru.wikipedia.org/wiki/Ламинат' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор кирпича
export const brickCalculator: Calculator = {
  id: 'brick-wall-calculator',
  slug: 'kalkulyator-kirpicha',
  title: 'Калькулятор кирпича',
  description: 'Расчёт количества кирпича для стен и перегородок',
  category: 'stroitelstvo-i-remont',
  subcategory: 'stroitelnye-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'length',
      label: 'Длина стены (м)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0.1
    },
    {
      name: 'height',
      label: 'Высота стены (м)',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 0.1
    },
    {
      name: 'thickness',
      label: 'Толщина стены',
      type: 'select',
      options: [
        { value: '0.12', label: '0.5 кирпича (120 мм)' },
        { value: '0.25', label: '1 кирпич (250 мм)' },
        { value: '0.38', label: '1.5 кирпича (380 мм)' },
        { value: '0.51', label: '2 кирпича (510 мм)' }
      ],
      defaultValue: '0.25'
    },
    {
      name: 'brickType',
      label: 'Тип кирпича',
      type: 'select',
      options: [
        { value: '250x120x65', label: 'Одинарный (250×120×65)' },
        { value: '250x120x88', label: 'Полуторный (250×120×88)' },
        { value: '250x120x138', label: 'Двойной (250×120×138)' }
      ],
      defaultValue: '250x120x65'
    },
    {
      name: 'joint',
      label: 'Толщина шва (мм)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 5,
      max: 20
    }
  ],
  outputs: [
    { name: 'wallArea', label: 'Площадь стены', type: 'number', unit: 'м²' },
    { name: 'brickCount', label: 'Количество кирпича', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const length = Number(inputs.length);
    const height = Number(inputs.height);
    const thickness = Number(inputs.thickness);
    const joint = Number(inputs.joint) / 1000;
    const brickType = String(inputs.brickType);
    
    if (!length || !height) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const wallArea = length * height;
    const wallVolume = wallArea * thickness;
    
    // Parse brick dimensions
    const [bLength, bWidth, bHeight] = brickType.split('x').map(Number);
    const brickVolume = (bLength / 1000 + joint) * (bWidth / 1000 + joint) * (bHeight / 1000 + joint);
    
    const brickCount = Math.ceil(wallVolume / brickVolume);
    
    return [
      { value: wallArea.toFixed(2), label: 'Площадь стены', unit: 'м²' },
      { value: brickCount.toString(), label: 'Количество кирпича', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите размеры стены, толщину кладки, тип кирпича и толщину шва. Калькулятор рассчитает количество.',
    about: 'Калькулятор кирпича определяет количество материала для кладки стен с учётом толщины и типа кирпича.',
    usage: 'Используется при строительстве домов, перегородок и других кирпичных конструкций.',
    formula: 'Объём стены = длина × высота × толщина\nКирпичей = ⌈объём / (объём кирпича + шов)⌉',
    faq: [
      {
        question: 'Сколько кирпича в 1 м²?',
        answer: 'Для одинарного: 0.5 кирпича — 51 шт, 1 кирпич — 102 шт, 2 кирпича — 204 шт.'
      },
      {
        question: 'Какой кирпич выбрать?',
        answer: 'Одинарный — экономичный, полуторный — быстрее кладка, двойной — лучше теплоизоляция.'
      }
    ],
    sources: [
      { title: 'Кирпич — Википедия', url: 'https://ru.wikipedia.org/wiki/Кирпич' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор гипсокартона
export const drywallCalculator: Calculator = {
  id: 'drywall-basic-calculator',
  slug: 'kalkulyator-gipsokartona',
  title: 'Калькулятор гипсокартона',
  description: 'Расчёт листов ГКЛ для стен и потолков',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'wallLength',
      label: 'Длина стен (м)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 0.1
    },
    {
      name: 'wallHeight',
      label: 'Высота стен (м)',
      type: 'number',
      placeholder: '2.7',
      defaultValue: 2.7,
      min: 1
    },
    {
      name: 'ceilingArea',
      label: 'Площадь потолка (м²)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 0
    },
    {
      name: 'sheetSize',
      label: 'Размер листа',
      type: 'select',
      options: [
        { value: '3', label: '1200×2500 мм (3 м²)' },
        { value: '3.6', label: '1200×3000 мм (3.6 м²)' }
      ],
      defaultValue: '3'
    },
    {
      name: 'reserve',
      label: 'Запас (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 30
    }
  ],
  outputs: [
    { name: 'totalArea', label: 'Общая площадь', type: 'number', unit: 'м²' },
    { name: 'sheetsNeeded', label: 'Листов нужно', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const wallLength = Number(inputs.wallLength);
    const wallHeight = Number(inputs.wallHeight);
    const ceilingArea = Number(inputs.ceilingArea);
    const sheetSize = Number(inputs.sheetSize);
    const reserve = Number(inputs.reserve) / 100;
    
    const wallArea = wallLength * wallHeight;
    const totalArea = wallArea + ceilingArea;
    const sheetsNeeded = Math.ceil((totalArea / sheetSize) * (1 + reserve));
    
    return [
      { value: totalArea.toFixed(2), label: 'Общая площадь', unit: 'м²' },
      { value: sheetsNeeded.toString(), label: 'Листов нужно', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите длину стен, высоту, площадь потолка, размер листа и запас. Калькулятор покажет количество листов.',
    about: 'Калькулятор гипсокартона рассчитывает количество листов ГКЛ для обшивки стен и потолков.',
    usage: 'Используется при планировании ремонта для покупки правильного количества материала.',
    formula: 'Листов = ⌈(площадь стен + потолок) / площадь листа × (1 + запас)⌉',
    faq: [
      {
        question: 'Какой запас нужен для ГКЛ?',
        answer: 'Стандартный запас — 10-15% на обрезку. Для сложных помещений — до 20%.'
      },
      {
        question: 'Какой гипсокартон выбрать?',
        answer: 'Обычный — для сухих помещений, влагостойкий (ГКЛВ) — для ванных и кухонь, огнестойкий (ГКЛО) — для печей и каминов.'
      }
    ],
    sources: [
      { title: 'Гипсокартон — Википедия', url: 'https://ru.wikipedia.org/wiki/Гипсокартон' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор пиломатериалов
export const lumberCalculator: Calculator = {
  id: 'lumber-calculator',
  slug: 'kalkulyator-pilomaterialov',
  title: 'Калькулятор пиломатериалов',
  description: 'Расчёт объёма досок, бруса, бревен',
  category: 'stroitelstvo-i-remont',
  subcategory: 'pokrytiya',
  type: 'formula',
  inputs: [
    {
      name: 'thickness',
      label: 'Толщина (мм)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 10
    },
    {
      name: 'width',
      label: 'Ширина (мм)',
      type: 'number',
      placeholder: '150',
      defaultValue: 150,
      min: 10
    },
    {
      name: 'length',
      label: 'Длина (м)',
      type: 'number',
      placeholder: '6',
      defaultValue: 6,
      min: 0.5
    },
    {
      name: 'quantity',
      label: 'Количество штук',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 1
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём одной доски', type: 'number', unit: 'м³' },
    { name: 'totalVolume', label: 'Общий объём', type: 'number', unit: 'м³' },
    { name: 'area', label: 'Площадь покрытия', type: 'number', unit: 'м²' }
  ],
  calculate: (inputs) => {
    const thickness = Number(inputs.thickness) / 1000;
    const width = Number(inputs.width) / 1000;
    const length = Number(inputs.length);
    const quantity = Number(inputs.quantity);
    
    if (!thickness || !width || !length || !quantity) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const volume = thickness * width * length;
    const totalVolume = volume * quantity;
    const area = width * length * quantity;
    
    return [
      { value: volume.toFixed(4), label: 'Объём одной доски', unit: 'м³' },
      { value: totalVolume.toFixed(3), label: 'Общий объём', unit: 'м³' },
      { value: area.toFixed(2), label: 'Площадь покрытия', unit: 'м²' }
    ];
  },
  content: {
    howTo: 'Введите размеры доски (толщина, ширина, длина) и количество. Калькулятор рассчитает объём и площадь.',
    about: 'Калькулятор пиломатериалов определяет объём досок, бруса, бревен и площадь их покрытия.',
    usage: 'Используется при закупке пиломатериалов для строительства крыш, перекрытий, каркасов.',
    formula: 'Объём = толщина × ширина × длина (в метрах)\nОбщий = объём × количество',
    faq: [
      {
        question: 'Как перевести мм в м?',
        answer: 'Разделите миллиметры на 1000. Например, 50 мм = 0.05 м.'
      },
      {
        question: 'Сколько досок в кубе?',
        answer: 'Для доски 50×150×6000 мм: 1 / (0.05 × 0.15 × 6) ≈ 22 штуки.'
      }
    ],
    sources: [
      { title: 'Пиломатериалы — Википедия', url: 'https://ru.wikipedia.org/wiki/Пиломатериалы' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор утеплителя
export const insulationCalculator: Calculator = {
  id: 'insulation-basic-calculator',
  slug: 'kalkulyator-uteplitelya',
  title: 'Калькулятор утеплителя',
  description: 'Расчёт минваты, пеноплекса, эковаты для утепления',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь утепления (м²)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 1
    },
    {
      name: 'thickness',
      label: 'Толщина утепления (см)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15,
      min: 1,
      max: 50
    },
    {
      name: 'packVolume',
      label: 'Объём упаковки (м³)',
      type: 'select',
      options: [
        { value: '0.36', label: 'Минвата 1000×600×50 мм (0.36 м³)' },
        { value: '0.288', label: 'Минвата 1200×600×50 мм (0.288 м³)' },
        { value: '0.25', label: 'Пеноплекс 1200×600×50 мм (0.25 м³)' },
        { value: '0.3', label: 'Эковата мешок (0.3 м³)' }
      ],
      defaultValue: '0.36'
    },
    {
      name: 'reserve',
      label: 'Запас (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 30
    }
  ],
  outputs: [
    { name: 'totalVolume', label: 'Объём утеплителя', type: 'number', unit: 'м³' },
    { name: 'packsNeeded', label: 'Упаковок нужно', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness) / 100;
    const packVolume = Number(inputs.packVolume);
    const reserve = Number(inputs.reserve) / 100;
    
    if (!area || !thickness || !packVolume) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const totalVolume = area * thickness * (1 + reserve);
    const packsNeeded = Math.ceil(totalVolume / packVolume);
    
    return [
      { value: totalVolume.toFixed(2), label: 'Объём утеплителя', unit: 'м³' },
      { value: packsNeeded.toString(), label: 'Упаковок нужно', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите площадь утепления, толщину, объём упаковки и запас. Калькулятор покажет количество материала.',
    about: 'Калькулятор утеплителя рассчитывает количество минваты, пеноплекса, эковаты для утепления стен, крыш, полов.',
    usage: 'Используется при планировании утепления дома для покупки правильного количества материала.',
    formula: 'Объём = площадь × толщина (в метрах) × (1 + запас)\nУпаковок = ⌈объём / объём упаковки⌉',
    faq: [
      {
        question: 'Какая толщина утеплителя нужна?',
        answer: 'Стены: 150-200 мм, перекрытие: 200-300 мм, фундамент: 50-100 мм, трубы: 30-100 мм.'
      },
      {
        question: 'Какой утеплитель выбрать?',
        answer: 'Минвата — универсальная, пеноплекс — для фундамента и пола, эковата — для мансард и сложных форм.'
      }
    ],
    sources: [
      { title: 'Теплоизоляция — Википедия', url: 'https://ru.wikipedia.org/wiki/Теплоизоляция' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор кровли
export const roofingCalculator: Calculator = {
  id: 'roofing-calculator',
  slug: 'kalkulyator-krovli',
  title: 'Калькулятор кровли',
  description: 'Расчёт черепицы, металлочерепицы, профнастила для крыши',
  category: 'stroitelstvo-i-remont',
  subcategory: 'pokrytiya',
  type: 'formula',
  inputs: [
    {
      name: 'length',
      label: 'Длина ската (м)',
      type: 'number',
      placeholder: '8',
      defaultValue: 8,
      min: 1
    },
    {
      name: 'width',
      label: 'Ширина ската (м)',
      type: 'number',
      placeholder: '6',
      defaultValue: 6,
      min: 1
    },
    {
      name: 'slope',
      label: 'Уклон крыши (°)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 5,
      max: 60
    },
    {
      name: 'sheetWidth',
      label: 'Ширина листа (м)',
      type: 'select',
      options: [
        { value: '1.05', label: 'Металлочерепица (1.05 м)' },
        { value: '1.1', label: 'Профнастил (1.1 м)' },
        { value: '0.33', label: 'Гибкая черепица (0.33 м)' }
      ],
      defaultValue: '1.05'
    },
    {
      name: 'reserve',
      label: 'Запас (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 30
    }
  ],
  outputs: [
    { name: 'roofArea', label: 'Площадь крыши', type: 'number', unit: 'м²' },
    { name: 'sheetsNeeded', label: 'Листов нужно', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const slope = Number(inputs.slope);
    const sheetWidth = Number(inputs.sheetWidth);
    const reserve = Number(inputs.reserve) / 100;
    
    if (!length || !width || !slope || !sheetWidth) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Calculate actual roof area with slope
    const slopeRadians = (slope * Math.PI) / 180;
    const roofArea = (length * width) / Math.cos(slopeRadians) * (1 + reserve);
    const sheetsNeeded = Math.ceil(roofArea / (sheetWidth * length));
    
    return [
      { value: roofArea.toFixed(2), label: 'Площадь крыши', unit: 'м²' },
      { value: sheetsNeeded.toString(), label: 'Листов нужно', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите размеры ската, уклон крыши, ширину листа и запас. Калькулятор покажет количество материала.',
    about: 'Калькулятор кровли рассчитывает количество металлочерепицы, профнастила или другого кровельного материала.',
    usage: 'Используется при строительстве или ремонте крыши для закупки материалов.',
    formula: 'Площадь = (длина × ширина) / cos(угол) × (1 + запас)\nЛистов = ⌈площадь / площадь листа⌉',
    faq: [
      {
        question: 'Какой уклон крыши лучше?',
        answer: 'Плоская: 5-15°, скатная: 15-30°, мансардная: 30-60°. Чем больше снегопады — тем круче.'
      },
      {
        question: 'Какой запас нужен для кровли?',
        answer: 'Для прямых скатов — 5-7%, для сложных форм с ендовами — 10-15%.'
      }
    ],
    sources: [
      { title: 'Крыша — Википедия', url: 'https://ru.wikipedia.org/wiki/Крыша' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const constructionCalculators = [
  tileCalculator,
  paintCalculator,
  concreteCalculator,
  wallpaperCalculator,
  flooringCalculator,
  brickCalculator,
  drywallCalculator,
  lumberCalculator,
  insulationCalculator,
  roofingCalculator,
];
