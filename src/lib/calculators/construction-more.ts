import { Calculator } from '../types';

// Калькулятор расхода краски
export const paintCalculator: Calculator = {
  id: 'paint-room-calculator',
  slug: 'rashod-kraski',
  title: 'Калькулятор краски',
  description: 'Расчёт количества краски для стен и потолка',
  category: 'stroitelstvo',
  subcategory: 'build-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь поверхности (м²)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 0.1
    },
    {
      name: 'consumption',
      label: 'Расход краски (л/м²)',
      type: 'number',
      placeholder: '0.15',
      defaultValue: 0.15,
      min: 0.01,
      step: 0.01
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
      name: 'canSize',
      label: 'Объём банки (л)',
      type: 'select',
      options: [
        { value: '0.9', label: '0.9 л' },
        { value: '2.5', label: '2.5 л' },
        { value: '5', label: '5 л' },
        { value: '10', label: '10 л' },
        { value: '15', label: '15 л' }
      ],
      defaultValue: '5'
    }
  ],
  outputs: [
    { name: 'total', label: 'Необходимо краски', type: 'number', unit: 'л' },
    { name: 'cans', label: 'Количество банок', type: 'number', unit: 'шт.' },
    { name: 'cost', label: 'Примерная стоимость', type: 'text' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const consumption = Number(inputs.consumption);
    const coats = Number(inputs.coats);
    const canSize = Number(inputs.canSize);
    
    const totalLiters = area * consumption * coats;
    const cans = Math.ceil(totalLiters / canSize);
    const cost = cans * canSize * 500; // rough estimate: 500 rub/liter
    
    return [
      { value: Math.round(totalLiters * 100) / 100, label: 'Объём краски', unit: 'л' },
      { value: cans, label: 'Банок по ' + canSize + ' л', unit: 'шт.' },
      { value: '~' + Math.round(cost) + ' ₽ (при ~500 ₽/л)', label: 'Примерная стоимость' }
    ];
  },
  content: {
    howTo: 'Введите площадь, расход краски с этикетки, количество слоёв и объём банки. Калькулятор рассчитает количество.',
    about: 'Расход краски зависит от типа поверхности, впитываемости, нанесения. В среднем: 0.1-0.2 л/м² на слой.',
    usage: 'Используется при ремонте, составлении смет, закупке материалов.',
    formula: 'Объём = Площадь × Расход × Количество слоёв\nБанки = Объём / Объём банки (округление вверх)',
    faq: [
      {
        question: 'Сколько краски нужно на комнату 20 м²?',
        answer: 'При расходе 0.15 л/м² и 2 слоях: 20 × 0.15 × 2 = 6 литров. Значит, нужна банка 5 л + 1 л, или две по 2.5 л.'
      },
      {
        question: 'Влияет ли тип поверхности?',
        answer: 'Да! Бетон и гипсокартон впитывают больше, чем окрашенные стены. Новые поверхности могут требовать на 20-50% больше краски.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор штукатурки
export const plasterCalculator: Calculator = {
  id: 'plaster-ceiling-calculator',
  slug: 'shtukaturka',
  title: 'Калькулятор штукатурки',
  description: 'Расчёт количества штукатурки для стен',
  category: 'stroitelstvo',
  subcategory: 'build-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь стен (м²)',
      type: 'number',
      placeholder: '60',
      defaultValue: 60
    },
    {
      name: 'thickness',
      label: 'Толщина слоя (мм)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 1,
      max: 50
    },
    {
      name: 'consumption',
      label: 'Расход (кг/м² на 10 мм)',
      type: 'number',
      placeholder: '8.5',
      defaultValue: 8.5
    }
  ],
  outputs: [
    { name: 'weight', label: 'Вес штукатурки', type: 'number', unit: 'кг' },
    { name: 'bags', label: 'Мешков (30 кг)', type: 'number', unit: 'шт.' },
    { name: 'volume', label: 'Объём раствора', type: 'number', unit: 'м³' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness);
    const consumption = Number(inputs.consumption);
    
    const weight = area * (consumption / 10) * thickness;
    const bags = Math.ceil(weight / 30);
    const volume = (area * thickness) / 1000; // convert mm to m
    
    return [
      { value: Math.round(weight), label: 'Необходимый вес', unit: 'кг' },
      { value: bags, label: 'Мешков по 30 кг', unit: 'шт.' },
      { value: Math.round(volume * 1000) / 1000, label: 'Объём', unit: 'м³' }
    ];
  },
  content: {
    howTo: 'Введите площадь стен, толщину штукатурки и расход с упаковки. Калькулятор рассчитает количество материала.',
    about: 'Штукатурка наносится слоем 5-30 мм. Расход зависит от типа штукатурки и толщины слоя.',
    usage: 'Используется при подготовке стен, ремонте, составлении смет.',
    formula: 'Вес = Площадь × Расход × (Толщина / 10)\nгде Расход — на 10 мм слоя',
    faq: [
      {
        question: 'Какая толщина штукатурки нужна?',
        answer: 'Выравнивающая: 5-15 мм. Декоративная: 2-5 мм. Утепляющая: до 50 мм.'
      },
      {
        question: 'Сколько мешков штукатурки нужно?',
        answer: 'Стандартный мешок 25-30 кг. Делите общий вес на 30 и округляете вверх.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор плитки
export const tileCalculator: Calculator = {
  id: 'tile-wall-calculator',
  slug: 'plitka-na-pol-steny',
  title: 'Калькулятор плитки',
  description: 'Расчёт количества плитки для пола или стен',
  category: 'stroitelstvo',
  subcategory: 'build-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь (м²)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15
    },
    {
      name: 'tileWidth',
      label: 'Ширина плитки (см)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30
    },
    {
      name: 'tileHeight',
      label: 'Высота плитки (см)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30
    },
    {
      name: 'extra',
      label: 'Запас (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 30
    }
  ],
  outputs: [
    { name: 'tiles', label: 'Количество плиток', type: 'number', unit: 'шт.' },
    { name: 'tilesPerM2', label: 'Плиток на м²', type: 'number', unit: 'шт./м²' },
    { name: 'boxes', label: 'Упаковок (по 10 шт)', type: 'number', unit: 'шт.' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const tileW = Number(inputs.tileWidth) / 100; // convert to meters
    const tileH = Number(inputs.tileHeight) / 100;
    const extra = Number(inputs.extra);
    
    const tileArea = tileW * tileH;
    const tilesPerM2 = 1 / tileArea;
    const tiles = Math.ceil(area * tilesPerM2 * (1 + extra / 100));
    const boxes = Math.ceil(tiles / 10);
    
    return [
      { value: tiles, label: 'Плиток с запасом', unit: 'шт.' },
      { value: Math.ceil(tilesPerM2), label: 'Плиток на м²', unit: 'шт.' },
      { value: boxes, label: 'Упаковок (по 10 шт)', unit: 'упак.' }
    ];
  },
  content: {
    howTo: 'Введите площадь, размер плитки и процент запаса. Калькулятор рассчитает количество.',
    about: 'Плитка продаётся квадратными метрами или штуками. Всегда закладывайте запас 10-15% на резку и брак.',
    usage: 'Используется при ремонте ванных комнат, кухонь, закупке материалов.',
    formula: 'Плиток = Площадь / Площадь плитки × (1 + Запас)\nПлощадь плитки = Ширина × Высота',
    faq: [
      {
        question: 'Почему нужен запас плитки?',
        answer: 'На резку углов, подрезку у стен, возможный брак, запас на будущий ремонт. Диагональная укладка требует больше запаса.'
      },
      {
        question: 'Как рассчитать плитку для диагональной укладки?',
        answer: 'Диагональная укладка требует больше обрезки — закладывайте запас 15-20% вместо стандартных 10%.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор ламината
export const laminateCalculator: Calculator = {
  id: 'laminate-calculator',
  slug: 'laminat',
  title: 'Калькулятор ламината',
  description: 'Расчёт количества досок ламината для пола',
  category: 'stroitelstvo',
  subcategory: 'build-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь помещения (м²)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20
    },
    {
      name: 'boardWidth',
      label: 'Ширина доски (мм)',
      type: 'number',
      placeholder: '195',
      defaultValue: 195
    },
    {
      name: 'boardLength',
      label: 'Длина доски (мм)',
      type: 'number',
      placeholder: '1380',
      defaultValue: 1380
    },
    {
      name: 'inPack',
      label: 'Досок в упаковке',
      type: 'number',
      placeholder: '8',
      defaultValue: 8
    },
    {
      name: 'extra',
      label: 'Запас (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10
    }
  ],
  outputs: [
    { name: 'boards', label: 'Количество досок', type: 'number', unit: 'шт.' },
    { name: 'packs', label: 'Упаковок', type: 'number', unit: 'шт.' },
    { name: 'packArea', label: 'Площадь в упаковке', type: 'number', unit: 'м²' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const width = Number(inputs.boardWidth) / 1000;
    const length = Number(inputs.boardLength) / 1000;
    const inPack = Number(inputs.inPack);
    const extra = Number(inputs.extra);
    
    const boardArea = width * length;
    const packArea = boardArea * inPack;
    const totalArea = area * (1 + extra / 100);
    const boards = Math.ceil(totalArea / boardArea);
    const packs = Math.ceil(boards / inPack);
    
    return [
      { value: boards, label: 'Досок с запасом', unit: 'шт.' },
      { value: packs, label: 'Упаковок', unit: 'шт.' },
      { value: Math.round(packArea * 100) / 100, label: 'Площадь в упаковке', unit: 'м²' }
    ];
  },
  content: {
    howTo: 'Введите площадь помещения, размер доски ламината, количество в упаковке и запас.',
    about: 'Ламинат укладывается с зазором от стен 8-10 мм. Запас нужен на подрезку и запас на случай повреждений.',
    usage: 'Используется при ремонте полов, закупке материалов, составлении смет.',
    formula: 'Досок = (Площадь × (1 + Запас)) / Площадь доски\nУпаковок = Досок / Досок в упаковке (округление вверх)',
    faq: [
      {
        question: 'Какой запас ламината нужен?',
        answer: 'Для простых комнат — 5-7%. Для сложных форм, диагональной укладки, много углов — 10-15%.'
      },
      {
        question: 'Сколько ламината в упаковке?',
        answer: 'Обычно 7-10 досок на ~2-3 м². Точное количество указано на упаковке.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор кирпича
export const brickCalculator: Calculator = {
  id: 'brick-calculator',
  slug: 'kirpich',
  title: 'Калькулятор кирпича',
  description: 'Расчёт количества кирпича для стен с учётом толщины шва',
  category: 'stroitelstvo',
  subcategory: 'build-steny',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь стен (м²)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'thickness',
      label: 'Толщина стены',
      type: 'select',
      options: [
        { value: '0.5', label: '0.5 кирпича (120 мм)' },
        { value: '1', label: '1 кирпич (250 мм)' },
        { value: '1.5', label: '1.5 кирпича (380 мм)' },
        { value: '2', label: '2 кирпича (510 мм)' }
      ],
      defaultValue: '1'
    },
    {
      name: 'brickType',
      label: 'Тип кирпича',
      type: 'select',
      options: [
        { value: 'single', label: 'Одинарный (250×120×65)' },
        { value: 'oneandhalf', label: 'Полуторный (250×120×88)' },
        { value: 'double', label: 'Двойной (250×120×138)' }
      ],
      defaultValue: 'single'
    }
  ],
  outputs: [
    { name: 'bricks', label: 'Количество кирпича', type: 'number', unit: 'шт.' },
    { name: 'perM2', label: 'На 1 м²', type: 'number', unit: 'шт./м²' },
    { name: 'pallets', label: 'Поддонов (по 400 шт)', type: 'number', unit: 'шт.' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness);
    const brickType = String(inputs.brickType);
    
    // Bricks per m² for different thickness (with mortar joints)
    const bricksPerM2: Record<string, Record<string, number>> = {
      'single': {
        '0.5': 51,
        '1': 102,
        '1.5': 153,
        '2': 204
      },
      'oneandhalf': {
        '0.5': 39,
        '1': 78,
        '1.5': 117,
        '2': 156
      },
      'double': {
        '0.5': 26,
        '1': 52,
        '1.5': 78,
        '2': 104
      }
    };
    
    const perM2 = bricksPerM2[brickType][String(thickness)];
    const bricks = Math.ceil(area * perM2);
    const pallets = Math.ceil(bricks / 400);
    
    return [
      { value: bricks, label: 'Всего кирпича', unit: 'шт.' },
      { value: perM2, label: 'На 1 м² стены', unit: 'шт.' },
      { value: pallets, label: 'Поддонов (по 400 шт)', unit: 'шт.' }
    ];
  },
  content: {
    howTo: 'Введите площадь стен, толщину стены и тип кирпича. Калькулятор учитывает швы и даст точный расчёт.',
    about: 'Расход кирпича зависит от размера, толщины стены, ширины шва. В среднем 50-250 шт/м².',
    usage: 'Используется при строительстве домов, кладке стен, закупке материалов.',
    formula: 'Количество = Площадь × Расход на м²\nРасход зависит от толщины стены и размера кирпича',
    faq: [
      {
        question: 'Сколько кирпича в поддоне?',
        answer: 'В стандартном поддоне ~200-400 штук в зависимости от размера кирпича. Точное количество уточняйте у поставщика.'
      },
      {
        question: 'Что такое кладка в 1 кирпич?',
        answer: 'Толщина стены равна длине кирпича (250 мм). Используется для несущих стен внутри зданий.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор фундамента
export const foundationCalculator: Calculator = {
  id: 'foundation-calculator',
  slug: 'fundament',
  title: 'Калькулятор ленточного фундамента',
  description: 'Расчёт объёма бетона и арматуры для фундамента',
  category: 'stroitelstvo',
  subcategory: 'build-fundament',
  type: 'formula',
  inputs: [
    {
      name: 'perimeter',
      label: 'Периметр (м)',
      type: 'number',
      placeholder: '40',
      defaultValue: 40
    },
    {
      name: 'width',
      label: 'Ширина ленты (м)',
      type: 'number',
      placeholder: '0.4',
      defaultValue: 0.4
    },
    {
      name: 'height',
      label: 'Высота ленты (м)',
      type: 'number',
      placeholder: '0.5',
      defaultValue: 0.5
    },
    {
      name: 'reinforcement',
      label: 'Арматура (продольная)',
      type: 'select',
      options: [
        { value: '4x12', label: '4 стержня Ø12 мм' },
        { value: '4x14', label: '4 стержня Ø14 мм' },
        { value: '6x12', label: '6 стержней Ø12 мм' },
        { value: '6x14', label: '6 стержней Ø14 мм' }
      ],
      defaultValue: '4x12'
    }
  ],
  outputs: [
    { name: 'concrete', label: 'Объём бетона', type: 'number', unit: 'м³' },
    { name: 'rebarLength', label: 'Арматуры (длина)', type: 'number', unit: 'п.м.' },
    { name: 'rebarWeight', label: 'Арматуры (вес)', type: 'number', unit: 'кг' }
  ],
  calculate: (inputs) => {
    const perimeter = Number(inputs.perimeter);
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const reinforcement = String(inputs.reinforcement);
    
    // Concrete volume
    const concrete = perimeter * width * height;
    
    // Reinforcement calculation
    const bars = parseInt(reinforcement.split('x')[0]);
    const diameter = parseInt(reinforcement.split('x')[1]);
    
    const rebarLength = perimeter * bars;
    
    // Weight per meter (kg/m) for round steel: 0.00617 × d²
    const weightPerMeter = 0.00617 * diameter * diameter;
    const rebarWeight = rebarLength * weightPerMeter;
    
    return [
      { value: Math.round(concrete * 100) / 100, label: 'Бетона М200-М400', unit: 'м³' },
      { value: Math.round(rebarLength), label: 'Продольной арматуры', unit: 'п.м.' },
      { value: Math.round(rebarWeight), label: 'Вес арматуры', unit: 'кг' }
    ];
  },
  content: {
    howTo: 'Введите периметр фундамента, ширину и высоту ленты, тип арматуры.',
    about: 'Ленточный фундамент — непрерывная бетонная лента под несущими стенами. Самый популярный тип для частных домов.',
    usage: 'Используется при строительстве фундаментов, закупке бетона и арматуры.',
    formula: 'Объём бетона = Периметр × Ширина × Высота\nАрматура: 4-6 стержней Ø12-14 мм продольно',
    faq: [
      {
        question: 'Какая марка бетона нужна?',
        answer: 'Для фундамента используют М200-М400. Для домов до 2 этажей достаточно М200-М250.'
      },
      {
        question: 'Какую арматуру использовать?',
        answer: 'Продольная: 4-6 стержней Ø12-16 мм класса А400. Поперечная (хомуты): Ø6-8 мм с шагом 300-500 мм.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

export const constructionMoreCalculators = [
  paintCalculator,
  plasterCalculator,
  tileCalculator,
  laminateCalculator,
  brickCalculator,
  foundationCalculator,
];
