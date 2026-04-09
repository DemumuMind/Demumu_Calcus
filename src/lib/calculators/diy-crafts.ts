import type { Calculator } from '../types';

export const diyCraftsCalculators: Calculator[] = [
  {
    id: 'paint-diy-calculator',
    slug: 'paint-calculator',
    title: 'Калькулятор краски',
    description: 'Рассчитайте количество краски для стен и потолка',
    category: 'diy',
    subcategory: 'home-repair',
    type: 'formula',
    inputs: [
      {
        name: 'wallArea',
        label: 'Площадь стен',
      type: 'number', min: 0.1
      },
      {
        name: 'coats',
        label: 'Количество слоёв',
      type: 'number',
                min: 1,
        max: 5,
        defaultValue: 2
      },
      {
        name: 'coverage',
        label: 'Расход краски',
        type: 'select',
                options: [
          { value: '8', label: '8 м²/л (стандартная)' },
          { value: '10', label: '10 м²/л (экономичная)' },
          { value: '12', label: '12 м²/л (премиум)' }
        ],
        defaultValue: '10'
      }
    ],
    outputs: [
      {
        name: 'paintVolume',
        label: 'Необходимый объём краски',
      type: 'number',
      unit: 'л'
      },
      {
        name: 'cansNeeded',
        label: 'Количество банок (2.5 л)',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'totalCost',
        label: 'Примерная стоимость',
      type: 'number',
      unit: '₽'
      }
    ],
    calculate: (inputs): any => {
      const wallArea = Number(inputs.wallArea);
      const coats = Number(inputs.coats);
      const coverage = String(inputs.coverage);
      const totalArea = wallArea * coats;
      const paintVolume = Math.ceil(totalArea / Number(coverage) * 10) / 10;
      const cansNeeded = Math.ceil(paintVolume / 2.5);
      const pricePerLiter = coverage === '12' ? 450 : coverage === '10' ? 320 : 250;
      const totalCost = Math.ceil(paintVolume * pricePerLiter);

      return [
        { value: paintVolume, label: 'Объём краски', unit: 'л' },
        { value: cansNeeded, label: 'Количество банок', unit: 'шт' },
        { value: totalCost, label: 'Примерная стоимость', unit: '₽' }
      ];
    },
    content: {
      howTo: `Для расчёта краски:
1. Измерьте площадь всех стен (периметр × высота)
2. Вычтите площадь окон и дверей
3. Укажите количество слоёв (обычно 2)
4. Учтите расход краски с этикетки`,
      about: `Расход краски зависит от типа поверхности, качества краски и цвета. На впитывающие поверхности (гипсокартон, бетон) уходит больше краски.`,
      formula: `Объём краски = (Площадь × Количество слоёв) / Расход краски`,
      faq: [
        {
          question: 'Сколько слоёв нужно нанести?',
          answer: 'Обычно 2 слоя. На тёмные цвета или пористые поверхности может понадобиться 3 слоя.'
        },
        {
          question: 'Включён ли потолок?',
          answer: 'Нет, добавьте площадь потолка к площади стен, если его тоже нужно красить.'
        }
      ],
      sources: [
        { title: 'Стройка.ру - расчёт краски', url: 'https://stroyka.ru/paint-calc' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'tile-diy-calculator',
    slug: 'tile-calculator',
    title: 'Калькулятор плитки',
    description: 'Рассчитайте количество плитки с учётом запаса',
    category: 'diy',
    subcategory: 'home-repair',
    type: 'formula',
    inputs: [
      {
        name: 'roomLength',
        label: 'Длина комнаты',
      type: 'number', min: 0.1
      },
      {
        name: 'roomWidth',
        label: 'Ширина комнаты',
      type: 'number', min: 0.1
      },
      {
        name: 'tileLength',
        label: 'Длина плитки',
      type: 'number', min: 1
      },
      {
        name: 'tileWidth',
        label: 'Ширина плитки',
      type: 'number', min: 1
      },
      {
        name: 'waste',
        label: 'Запас (резка/брак)',
        type: 'select',
                options: [
          { value: '5', label: '5% (прямая укладка)' },
          { value: '10', label: '10% (диагональная)' },
          { value: '15', label: '15% (сложная раскладка)' }
        ],
        defaultValue: '10'
      }
    ],
    outputs: [
      {
        name: 'roomArea',
        label: 'Площадь комнаты',
      type: 'number',
      unit: 'м²'
      },
      {
        name: 'tilesNeeded',
        label: 'Количество плитки',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'tileArea',
        label: 'Площадь плитки',
      type: 'number',
      unit: 'м²'
      }
    ],
    calculate: (inputs): any => {
      const roomLength = Number(inputs.roomLength);
      const roomWidth = Number(inputs.roomWidth);
      const tileLength = Number(inputs.tileLength);
      const tileWidth = Number(inputs.tileWidth);
      const waste = Number(inputs.waste);
      const roomArea = roomLength * roomWidth;
      const tileAreaM2 = (tileLength / 100) * (tileWidth / 100);
      const baseTiles = roomArea / tileAreaM2;
      const tilesWithWaste = baseTiles * (1 + waste / 100);
      const tilesNeeded = Math.ceil(tilesWithWaste);
      const totalTileArea = tilesNeeded * tileAreaM2;

      return [
        { value: Math.round(roomArea * 100) / 100, label: 'Площадь комнаты', unit: 'м²' },
        { value: tilesNeeded, label: 'Количество плитки', unit: 'шт' },
        { value: Math.round(totalTileArea * 100) / 100, label: 'Площадь плитки', unit: 'м²' }
      ];
    },
    content: {
      howTo: `Для расчёта плитки:
1. Измерьте длину и ширину комнаты
2. Укажите размеры плитки (с этикетки)
3. Выберите запас в зависимости от раскладки
4. Закажите плитку с запасом`,
      about: `Запас 5-15% нужен на обрезку плитки, возможный брак и запас на будущий ремонт. При диагональной укладке расход выше.`,
      formula: `Количество плитки = (Площадь комнаты / Площадь плитки) × (1 + Запас/100)`,
      faq: [
        {
          question: 'Какой запас нужен?',
          answer: '5% для прямой укладки, 10% для диагональной, 15% для сложных узоров.'
        }
      ],
      sources: [
        { title: 'Ремонт Ванной - калькулятор плитки', url: 'https://vannaja.ru/tile-calc' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'wallpaper-diy-calculator',
    slug: 'wallpaper-calculator',
    title: 'Калькулятор обоев',
    description: 'Рассчитайте количество рулонов обоев для комнаты',
    category: 'diy',
    subcategory: 'home-repair',
    type: 'formula',
    inputs: [
      {
        name: 'perimeter',
        label: 'Периметр комнаты',
      type: 'number', min: 1
      },
      {
        name: 'ceilingHeight',
        label: 'Высота потолка',
      type: 'number', min: 1,
        max: 6
      },
      {
        name: 'rollWidth',
        label: 'Ширина рулона',
        type: 'select',
                options: [
          { value: '0.53', label: '53 см (стандарт)' },
          { value: '1.06', label: '106 см (метровые)' }
        ],
        defaultValue: '0.53'
      },
      {
        name: 'patternRepeat',
        label: 'Раппорт (шаг рисунка)',
      type: 'number', min: 0,
        defaultValue: 0
      },
      {
        name: 'openings',
        label: 'Площадь проёмов',
      type: 'number', min: 0,
        defaultValue: 0
      }
    ],
    outputs: [
      {
        name: 'totalArea',
        label: 'Общая площадь',
      type: 'number',
      unit: 'м²'
      },
      {
        name: 'rollsNeeded',
        label: 'Количество рулонов',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'stripLength',
        label: 'Длина одной полосы',
      type: 'number',
      unit: 'м'
      }
    ],
    calculate: (inputs): any => {
      const perimeter = Number(inputs.perimeter);
      const ceilingHeight = Number(inputs.ceilingHeight);
      const rollWidth = Number(inputs.rollWidth);
      const patternRepeat = Number(inputs.patternRepeat);
      const openings = Number(inputs.openings) || 0;
      const totalArea = perimeter * ceilingHeight - openings;
      const stripsPerRoll = 10 / (ceilingHeight + patternRepeat / 100);
      const totalStrips = Math.ceil(perimeter / rollWidth);
      const rollsNeeded = Math.ceil(totalStrips / stripsPerRoll);
      const stripLength = ceilingHeight + (patternRepeat > 0 ? patternRepeat / 100 : 0.1);

      return [
        { value: Math.round(totalArea * 10) / 10, label: 'Общая площадь', unit: 'м²' },
        { value: rollsNeeded, label: 'Количество рулонов', unit: 'шт' },
        { value: Math.round(stripLength * 100) / 100, label: 'Длина одной полосы', unit: 'м' }
      ];
    },
    content: {
      howTo: `Для расчёта обоев:
1. Измерьте периметр комнаты
2. Укажите высоту потолков
3. Учтите ширину рулона
4. Добавьте раппорт (для рисунков)`,
      about: `Раппорт - это шаг повторения рисунка. При наличии раппорта к каждой полосе добавляется запас на подгонку рисунка.`,
      formula: `Рулоны = Периметр / Ширина рулона / (Длина рулона / (Высота + Раппорт))`,
      faq: [
        {
          question: 'Что такое раппорт?',
          answer: 'Это расстояние между повторяющимися элементами рисунка. Для однотонных обоев = 0.'
        }
      ],
      sources: [
        { title: 'Обои.ру - калькулятор', url: 'https://oboi.ru/calc' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'concrete-diy-calculator',
    slug: 'concrete-calculator',
    title: 'Калькулятор бетона',
    description: 'Рассчитайте объём бетона для фундамента и заливки',
    category: 'diy',
    subcategory: 'construction',
    type: 'formula',
    inputs: [
      {
        name: 'length',
        label: 'Длина',
      type: 'number', min: 0.1
      },
      {
        name: 'width',
        label: 'Ширина',
      type: 'number', min: 0.1
      },
      {
        name: 'depth',
        label: 'Толщина/глубина',
      type: 'number', min: 0.05
      }
    ],
    outputs: [
      {
        name: 'volume',
        label: 'Объём бетона',
      type: 'number',
      unit: 'м³'
      },
      {
        name: 'volumeLiters',
        label: 'Объём в литрах',
      type: 'number',
      unit: 'л'
      },
      {
        name: 'weight',
        label: 'Вес бетона',
      type: 'number',
      unit: 'кг'
      }
    ],
    calculate: (inputs): any => {
      const length = Number(inputs.length);
      const width = Number(inputs.width);
      const depth = Number(inputs.depth);
      const volume = length * width * depth;
      const weight = volume * 2400; // ~2400 кг/м³

      return [
        { value: Math.round(volume * 100) / 100, label: 'Объём бетона', unit: 'м³' },
        { value: Math.round(volume * 1000), label: 'Объём в литрах', unit: 'л' },
        { value: Math.round(weight), label: 'Вес бетона', unit: 'кг' }
      ];
    },
    content: {
      howTo: `Для расчёта бетона:
1. Измерьте длину, ширину и толщину заливаемой конструкции
2. Умножьте все размеры для получения объёма
3. Закажите бетон с запасом 5-10%`,
      about: `Плотность бетона в среднем 2400 кг/м³. Учитывайте осадку при заливке и заказывайте с запасом.`,
      formula: `Объём = Длина × Ширина × Толщина`,
      faq: [],
      sources: [
        { title: 'Бетон.ру - калькулятор', url: 'https://beton.ru/calc' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'wood-calculator',
    slug: 'wood-calculator',
    title: 'Калькулятор досок и бруса',
    description: 'Рассчитайте количество пиломатериалов для строительства',
    category: 'diy',
    subcategory: 'construction',
    type: 'formula',
    inputs: [
      {
        name: 'area',
        label: 'Площадь покрытия',
      type: 'number', min: 1
      },
      {
        name: 'boardWidth',
        label: 'Ширина доски',
      type: 'number', min: 50
      },
      {
        name: 'boardLength',
        label: 'Длина доски',
      type: 'number', min: 1,
        max: 6
      },
      {
        name: 'spacing',
        label: 'Зазор между досками',
      type: 'number', min: 0,
        defaultValue: 5
      }
    ],
    outputs: [
      {
        name: 'boardsNeeded',
        label: 'Количество досок',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'linearMeters',
        label: 'Погонных метров',
      type: 'number',
      unit: 'м.п.'
      },
      {
        name: 'volume',
        label: 'Объём древесины',
      type: 'number',
      unit: 'м³'
      }
    ],
    calculate: (inputs): any => {
      const area = Number(inputs.area);
      const boardWidth = Number(inputs.boardWidth);
      const boardLength = Number(inputs.boardLength);
      const spacing = Number(inputs.spacing);
      const effectiveWidth = (boardWidth + spacing) / 1000;
      const boardsNeeded = Math.ceil(area / (effectiveWidth * boardLength));
      const linearMeters = boardsNeeded * boardLength;
      const volume = (boardWidth / 1000) * 0.025 * linearMeters; // толщина 25мм

      return [
        { value: boardsNeeded, label: 'Количество досок', unit: 'шт' },
        { value: linearMeters, label: 'Погонных метров', unit: 'м.п.' },
        { value: Math.round(volume * 100) / 100, label: 'Объём древесины', unit: 'м³' }
      ];
    },
    content: {
      howTo: `Для расчёта пиломатериалов:
1. Определите площадь покрытия
2. Укажите размеры досок
3. Учтите зазор для террасной доски
4. Добавьте запас 5-10%`,
      about: `Учитывайте отходы при раскрое и брак. Для террасной доски обычно делают зазор 3-5 мм.`,
      formula: `Количество = Площадь / ((Ширина + Зазор) × Длина)`,
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'knitting-calculator',
    slug: 'knitting-calculator',
    title: 'Калькулятор вязания',
    description: 'Рассчитайте количество пряжи и петель для вязания',
    category: 'diy',
    subcategory: 'crafts',
    type: 'formula',
    inputs: [
      {
        name: 'itemType',
        label: 'Тип изделия',
        type: 'select',
                options: [
          { value: 'scarf', label: 'Шарф' },
          { value: 'hat', label: 'Шапка' },
          { value: 'sweater', label: 'Свитер' },
          { value: 'socks', label: 'Носки' },
          { value: 'blanket', label: 'Плед' }
        ]
      },
      {
        name: 'size',
        label: 'Размер',
        type: 'select',
                options: [
          { value: 'child', label: 'Детский' },
          { value: 'adult', label: 'Взрослый' },
          { value: 'large', label: 'Большой' }
        ]
      },
      {
        name: 'yarnWeight',
        label: 'Толщина пряжи',
        type: 'select',
                options: [
          { value: 'thin', label: 'Тонкая' },
          { value: 'medium', label: 'Средняя' },
          { value: 'thick', label: 'Толстая' }
        ]
      }
    ],
    outputs: [
      {
        name: 'yarnWeight',
        label: 'Необходимый вес пряжи',
      type: 'number',
      unit: 'г'
      },
      {
        name: 'skeinsNeeded',
        label: 'Количество мотков (100г)',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'knittingTime',
        label: 'Примерное время вязания',
      type: 'number',
      unit: 'ч'
      }
    ],
    calculate: (inputs): any => {
      const itemType = String(inputs.itemType);
      const size = String(inputs.size);
      const yarnWeight = String(inputs.yarnWeight);
      const baseWeights: Record<string, Record<string, number>> = {
        scarf: { child: 100, adult: 200, large: 300 },
        hat: { child: 50, adult: 100, large: 150 },
        sweater: { child: 300, adult: 500, large: 700 },
        socks: { child: 50, adult: 100, large: 150 },
        blanket: { child: 500, adult: 1000, large: 1500 }
      };

      const yarnMultiplier: Record<string, number> = { thin: 0.7, medium: 1, thick: 1.4 };

      const yarnWeightValue = Math.ceil(baseWeights[itemType][size] * yarnMultiplier[yarnWeight]);
      const skeinsNeeded = Math.ceil(yarnWeightValue / 100);
      const knittingTime = Math.ceil(yarnWeightValue / 50); // примерно 50г в час

      return [
        { value: yarnWeightValue, label: 'Необходимый вес пряжи', unit: 'г' },
        { value: skeinsNeeded, label: 'Количество мотков (100г)', unit: 'шт' },
        { value: knittingTime, label: 'Примерное время вязания', unit: 'ч' }
      ];
    },
    content: {
      howTo: `Для расчёта пряжи:
1. Выберите тип изделия
2. Укажите размер
3. Выберите толщину пряжи
4. Добавьте запас 10-15%`,
      about: `Расход пряжи сильно зависит от плотности вязания и индивидуальной техники. Всегда покупайте с запасом.`,
      formula: `Вес = Базовый вес × Коэффициент толщины пряжи`,
      faq: [
        {
          question: 'Сколько нужно на свитер?',
          answer: 'В среднем 400-600 граммов средней пряжи на взрослый свитер.'
        }
      ],
      sources: [
        { title: 'Вязание.ру - расчёт пряжи', url: 'https://vyazanie.ru/yarn-calc' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'fabric-calculator',
    slug: 'fabric-calculator',
    title: 'Калькулятор ткани',
    description: 'Рассчитайте расход ткани для пошива одежды',
    category: 'diy',
    subcategory: 'crafts',
    type: 'formula',
    inputs: [
      {
        name: 'clothingType',
        label: 'Тип одежды',
        type: 'select',
                options: [
          { value: 'skirt', label: 'Юбка' },
          { value: 'dress', label: 'Платье' },
          { value: 'pants', label: 'Брюки' },
          { value: 'shirt', label: 'Рубашка/блузка' },
          { value: 'jacket', label: 'Жакет' }
        ]
      },
      {
        name: 'size',
        label: 'Размер',
        type: 'select',
                options: [
          { value: 'XS-S', label: 'XS-S' },
          { value: 'M-L', label: 'M-L' },
          { value: 'XL-XXL', label: 'XL-XXL' }
        ]
      },
      {
        name: 'fabricWidth',
        label: 'Ширина ткани',
        type: 'select',
                options: [
          { value: '90', label: '90 см' },
          { value: '110', label: '110 см' },
          { value: '140', label: '140 см (стандарт)' },
          { value: '150', label: '150 см' }
        ],
        defaultValue: '140'
      }
    ],
    outputs: [
      {
        name: 'fabricLength',
        label: 'Длина ткани',
      type: 'number',
      unit: 'м'
      },
      {
        name: 'totalArea',
        label: 'Площадь ткани',
      type: 'number',
      unit: 'м²'
      }
    ],
    calculate: (inputs): any => {
      const clothingType = String(inputs.clothingType);
      const size = String(inputs.size);
      const fabricWidth = String(inputs.fabricWidth);
      const baseRequirements: Record<string, Record<string, number>> = {
        skirt: { 'XS-S': 1.5, 'M-L': 1.7, 'XL-XXL': 2 },
        dress: { 'XS-S': 2.5, 'M-L': 2.8, 'XL-XXL': 3.2 },
        pants: { 'XS-S': 1.8, 'M-L': 2, 'XL-XXL': 2.3 },
        shirt: { 'XS-S': 1.5, 'M-L': 1.8, 'XL-XXL': 2 },
        jacket: { 'XS-S': 2, 'M-L': 2.3, 'XL-XXL': 2.6 }
      };

      const widthMultiplier: Record<string, number> = { '90': 1.5, '110': 1.2, '140': 1, '150': 0.95 };

      const fabricLength = Math.ceil(baseRequirements[clothingType][size] * widthMultiplier[fabricWidth] * 10) / 10;
      const totalArea = Math.round(fabricLength * (Number(fabricWidth) / 100) * 10) / 10;

      return [
        { value: fabricLength, label: 'Длина ткани', unit: 'м' },
        { value: totalArea, label: 'Площадь ткани', unit: 'м²' }
      ];
    },
    content: {
      howTo: `Для расчёта ткани:
1. Выберите тип одежды
2. Укажите размер
3. Учтите ширину ткани
4. Добавьте запас 20-30 см`,
      about: `Расход зависит от сложности кроя, направления рисунка и индивидуальных особенностей фигуры.`,
      formula: `Длина = Базовая норма × Коэффициент ширины`,
      faq: [],
      sources: [
        { title: 'Шитьё.ру - расчёт ткани', url: 'https://shite.ru/fabric-calc' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'bead-calculator',
    slug: 'bead-calculator',
    title: 'Калькулятор бисера',
    description: 'Рассчитайте количество бисера для украшений',
    category: 'diy',
    subcategory: 'crafts',
    type: 'formula',
    inputs: [
      {
        name: 'itemType',
        label: 'Тип изделия',
        type: 'select',
                options: [
          { value: 'bracelet', label: 'Браслет' },
          { value: 'necklace', label: 'Ожерелье' },
          { value: 'earrings', label: 'Серьги' },
          { value: 'ring', label: 'Кольцо' },
          { value: 'brooch', label: 'Брошь' }
        ]
      },
      {
        name: 'length',
        label: 'Длина изделия',
      type: 'number', min: 5
      },
      {
        name: 'width',
        label: 'Ширина изделия',
      type: 'number', min: 0.5
      },
      {
        name: 'beadSize',
        label: 'Размер бисера',
        type: 'select',
                options: [
          { value: '15', label: '15/0 (1.5 мм)' },
          { value: '11', label: '11/0 (2.1 мм)' },
          { value: '8', label: '8/0 (3.0 мм)' },
          { value: '6', label: '6/0 (4.0 мм)' }
        ],
        defaultValue: '11'
      }
    ],
    outputs: [
      {
        name: 'beadsNeeded',
        label: 'Количество бисерин',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'gramsNeeded',
        label: 'Вес бисера',
      type: 'number',
      unit: 'г'
      },
      {
        name: 'packsNeeded',
        label: 'Пакетиков (5г)',
      type: 'number',
      unit: 'шт'
      }
    ],
    calculate: (inputs): any => {
      const length = Number(inputs.length);
      const width = Number(inputs.width);
      const beadSize = String(inputs.beadSize);
      const beadDiameters: Record<string, number> = { '15': 1.5, '11': 2.1, '8': 3.0, '6': 4.0 };
      const beadsPerGram: Record<string, number> = { '15': 350, '11': 180, '8': 65, '6': 30 };

      const beadDiameter = beadDiameters[beadSize];
      const beadsPerRow = Math.floor(width * 10 / beadDiameter);
      const rows = Math.floor(length * 10 / beadDiameter);
      const beadsNeeded = beadsPerRow * rows;

      const gramsNeeded = Math.ceil(beadsNeeded / beadsPerGram[beadSize]);
      const packsNeeded = Math.ceil(gramsNeeded / 5);

      return [
        { value: beadsNeeded, label: 'Количество бисерин', unit: 'шт' },
        { value: gramsNeeded, label: 'Вес бисера', unit: 'г' },
        { value: packsNeeded, label: 'Пакетиков (5г)', unit: 'шт' }
      ];
    },
    content: {
      howTo: `Для расчёта бисера:
1. Выберите тип украшения
2. Укажите размеры
3. Выберите размер бисера
4. Добавьте запас 10%`,
      about: `Расход бисера зависит от техники плетения. Расчёт приблизительный для ровного полотна.`,
      formula: `Количество = (Длина / Диаметр) × (Ширина / Диаметр)`,
      faq: [],
      sources: [
        { title: 'Бисер.ру - расчёт материалов', url: 'https://biser.ru/calc' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'crochet-calculator',
    slug: 'crochet-calculator',
    title: 'Калькулятор вязания крючком',
    description: 'Рассчитайте размеры и количество петель для вязания крючком',
    category: 'diy',
    subcategory: 'crafts',
    type: 'arithmetic',
    inputs: [
      {
        name: 'gaugeStitches',
        label: 'Петель в образце (10 см)',
      type: 'number',
                min: 5,
        max: 50
      },
      {
        name: 'gaugeRows',
        label: 'Рядов в образце (10 см)',
      type: 'number',
                min: 5,
        max: 50
      },
      {
        name: 'targetWidth',
        label: 'Нужная ширина',
      type: 'number', min: 1
      },
      {
        name: 'targetLength',
        label: 'Нужная длина',
      type: 'number', min: 1
      }
    ],
    outputs: [
      {
        name: 'stitchesNeeded',
        label: 'Набрать петель',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'rowsNeeded',
        label: 'Провязать рядов',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'turningChain',
        label: 'Петли подъёма',
      type: 'number',
      unit: 'шт'
      }
    ],
    calculate: (inputs): any => {
      const gaugeStitches = Number(inputs.gaugeStitches);
      const gaugeRows = Number(inputs.gaugeRows);
      const targetWidth = Number(inputs.targetWidth);
      const targetLength = Number(inputs.targetLength);
      const stitchesPerCm = gaugeStitches / 10;
      const rowsPerCm = gaugeRows / 10;

      const stitchesNeeded = Math.round(targetWidth * stitchesPerCm);
      const rowsNeeded = Math.round(targetLength * rowsPerCm);
      const turningChain = Math.ceil(stitchesPerCm) + 1;

      return [
        { value: stitchesNeeded, label: 'Набрать петель', unit: 'шт' },
        { value: rowsNeeded, label: 'Провязать рядов', unit: 'шт' },
        { value: turningChain, label: 'Петли подъёма', unit: 'шт' }
      ];
    },
    content: {
      howTo: `Для расчёта петель:
1. Свяжите образец 10×10 см
2. Посчитайте петли и ряды
3. Введите нужные размеры изделия
4. Получите точное количество петель`,
      about: `Плотность вязания индивидуальна. Всегда вяжите образец перед началом проекта.`,
      formula: `Петель = Ширина × (Петель в образце / 10)`,
      faq: [
        {
          question: 'Зачем вязать образец?',
          answer: 'Плотность вязания у каждого своя. Без образца изделие может получиться неправильного размера.'
        }
      ],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'embroidery-calculator',
    slug: 'embroidery-calculator',
    title: 'Калькулятор вышивки',
    description: 'Рассчитайте количество ниток и размер канвы для вышивки',
    category: 'diy',
    subcategory: 'crafts',
    type: 'formula',
    inputs: [
      {
        name: 'patternWidth',
        label: 'Ширина рисунка',
      type: 'number', min: 10
      },
      {
        name: 'patternHeight',
        label: 'Высота рисунка',
      type: 'number', min: 10
      },
      {
        name: 'canvasCount',
        label: 'Каунт канвы',
        type: 'select',
                options: [
          { value: '18', label: '18 каунт (мелкая)' },
          { value: '16', label: '16 каунт' },
          { value: '14', label: '14 каунт (стандарт)' },
          { value: '11', label: '11 каунт (крупная)' },
          { value: '6', label: '6 каунт (рушник)' }
        ],
        defaultValue: '14'
      },
      {
        name: 'colors',
        label: 'Количество цветов',
      type: 'number',
                min: 1,
        max: 100
      }
    ],
    outputs: [
      {
        name: 'canvasWidth',
        label: 'Ширина канвы',
      type: 'number',
      unit: 'см'
      },
      {
        name: 'canvasHeight',
        label: 'Высота канвы',
      type: 'number',
      unit: 'см'
      },
      {
        name: 'threadsNeeded',
        label: 'Мотков ниток',
      type: 'number',
      unit: 'шт'
      }
    ],
    calculate: (inputs): any => {
      const patternWidth = Number(inputs.patternWidth);
      const patternHeight = Number(inputs.patternHeight);
      const canvasCount = Number(inputs.canvasCount);
      const colors = Number(inputs.colors);
      const margin = 10; // отступ с каждой стороны
      const cellsPerCm = canvasCount / 2.54;

      const canvasWidthCm = Math.ceil((patternWidth / cellsPerCm) + margin * 2);
      const canvasHeightCm = Math.ceil((patternHeight / cellsPerCm) + margin * 2);
      const threadsNeeded = Math.ceil(colors * 0.8); // не все цвета используются одинаково

      return [
        { value: canvasWidthCm, label: 'Ширина канвы', unit: 'см' },
        { value: canvasHeightCm, label: 'Высота канвы', unit: 'см' },
        { value: threadsNeeded, label: 'Мотков ниток', unit: 'шт' }
      ];
    },
    content: {
      howTo: `Для расчёта вышивки:
1. Укажите размеры схемы в крестиках
2. Выберите каунт канвы
3. Укажите количество цветов
4. Добавьте запас канвы по 10 см с каждой стороны`,
      about: `Каунт канвы - это количество клеток на дюйм (2.54 см). Чем выше каунт, тем мельче вышивка.`,
      formula: `Размер канвы = (Крестики / Каунт × 2.54) + Отступы`,
      faq: [
        {
          question: 'Что такое каунт?',
          answer: 'Количество крестиков на дюйм. 14 каунт = 14 крестиков на 2.54 см.'
        }
      ],
      sources: [
        { title: 'Вышивка.ру - расчёт материалов', url: 'https://vyshivka.ru/calc' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'garden-soil-calculator',
      slug: 'garden-soil-calculator',
      title: 'Калькулятор грунта для грядок',
      description: 'Рассчитайте количество земли и компоста для грядок',
      category: 'diy',
      subcategory: 'garden',
      type: 'formula',
      inputs: [
        {
          name: 'length',
          label: 'Длина грядки',
      type: 'number', min: 0.5
        },
        {
          name: 'width',
          label: 'Ширина грядки',
      type: 'number', min: 0.5
        },
        {
          name: 'depth',
          label: 'Глубина слоя',
      type: 'number', min: 10,
          max: 50,
          defaultValue: 20
        },
        {
          name: 'bedCount',
          label: 'Количество грядок',
      type: 'number', min: 1,
          defaultValue: 1
        }
      ],
      outputs: [
        {
          name: 'soilVolume',
          label: 'Объём грунта',
      type: 'number',
      unit: 'м³'
        },
        {
          name: 'bagsNeeded',
          label: 'Мешков земли (50л)',
      type: 'number',
      unit: 'шт'
        },
        {
          name: 'compostVolume',
          label: 'Компоста (30% смеси)',
      type: 'number',
      unit: 'м³'
        }
      ],
      calculate: (inputs): any => {
        const length = Number(inputs.length);
        const width = Number(inputs.width);
        const depth = Number(inputs.depth);
        const bedCount = Number(inputs.bedCount);
        const volumeM3 = length * width * (depth / 100) * bedCount;
        const soilVolume = Math.round(volumeM3 * 100) / 100;
        const bagsNeeded = Math.ceil(soilVolume * 1000 / 50);
        const compostVolume = Math.round(volumeM3 * 0.3 * 100) / 100;

        return [
          { value: soilVolume, label: 'Объём грунта', unit: 'м³' },
          { value: bagsNeeded, label: 'Мешков земли (50л)', unit: 'шт' },
          { value: compostVolume, label: 'Компоста (30% смеси)', unit: 'м³' }
        ];
      },
      content: {
        howTo: `Для расчёта:
1. Измерьте длину и ширину грядки
2. Укажите желаемую глубину слоя (15-25 см)
3. Укажите количество грядок`,
        about: `Хорошая грядка - это смесь садовой земли, компоста и перегноя.`,
        formula: `Объём = Длина × Ширина × Глубина × Количество`,
        faq: [],
        sources: [],
        updatedAt: '2026-04-08'
      }
    },
    {
      id: 'wallpaper-pattern-match',
      slug: 'wallpaper-pattern-match-calculator',
      title: 'Калькулятор подбора рисунка обоев',
      description: 'Рассчитайте расход обоев с учётом подбора рисунка',
      category: 'diy',
      subcategory: 'home-repair',
      type: 'arithmetic',
      inputs: [
        {
          name: 'roomPerimeter',
          label: 'Периметр комнаты',
      type: 'number', min: 5
        },
        {
          name: 'ceilingHeight',
          label: 'Высота потолков',
      type: 'number', min: 2,
          max: 4
        },
        {
          name: 'rollWidth',
          label: 'Ширина рулона',
      type: 'number', min: 50,
          max: 150,
          defaultValue: 106
        },
        {
          name: 'patternRepeat',
          label: 'Раппорт (шаг рисунка)',
      type: 'number', min: 0,
          defaultValue: 32
        }
      ],
      outputs: [
        {
          name: 'stripsNeeded',
          label: 'Полос нужно',
      type: 'number',
      unit: 'шт'
        },
        {
          name: 'stripsPerRoll',
          label: 'Полос из рулона',
      type: 'number',
      unit: 'шт'
        },
        {
          name: 'rollsNeeded',
          label: 'Рулонов нужно',
      type: 'number',
      unit: 'шт'
        },
        {
          name: 'wastePercent',
          label: 'Отходов',
      type: 'number',
          unit: '%'
        }
      ],
      calculate: (inputs): any => {
        const roomPerimeter = Number(inputs.roomPerimeter);
        const ceilingHeight = Number(inputs.ceilingHeight);
        const rollWidth = Number(inputs.rollWidth);
        const patternRepeat = Number(inputs.patternRepeat);
        const stripsNeeded = Math.ceil(roomPerimeter / (rollWidth / 100));
        const effectiveHeight = ceilingHeight + (patternRepeat / 100);
        const stripsPerRoll = Math.floor(10 / effectiveHeight);
        const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
        const wastePercent = Math.round(((patternRepeat / 100) * stripsNeeded) / (ceilingHeight * stripsNeeded) * 100);

        return [
          { value: stripsNeeded, label: 'Полос нужно', unit: 'шт' },
          { value: stripsPerRoll, label: 'Полос из рулона', unit: 'шт' },
          { value: rollsNeeded, label: 'Рулонов нужно', unit: 'шт' },
          { value: wastePercent, label: 'Отходов', unit: '%' }
        ];
      },
      content: {
        howTo: `Для расчёта:
1. Измерьте периметр и высоту
2. Укажите ширину рулона
3. Введите раппорт (с этикетки)`,
        about: `Раппорт - это шаг повторения рисунка. При наличии рисунка расход увеличивается.`,
        formula: `Рулоны = Периметр / Ширина / Полос из рулона`,
        faq: [],
        sources: [],
        updatedAt: '2026-04-08'
      }
    },
    {
      id: 'quilt-calculator',
      slug: 'quilt-calculator',
      title: 'Калькулятор для пэчворка',
      description: 'Рассчитайте ткань и время для одеяла в технике пэчворк',
      category: 'diy',
      subcategory: 'crafts',
      type: 'formula',
      inputs: [
        {
          name: 'quiltWidth',
          label: 'Ширина одеяла',
      type: 'number', min: 100,
          max: 300
        },
        {
          name: 'quiltLength',
          label: 'Длина одеяла',
      type: 'number', min: 100,
          max: 300
        },
        {
          name: 'patchSize',
          label: 'Размер лоскута',
      type: 'number', min: 5,
          max: 20,
          defaultValue: 10
        }
      ],
      outputs: [
        {
          name: 'patchCount',
          label: 'Количество лоскутов',
      type: 'number',
      unit: 'шт'
        },
        {
          name: 'fabricNeeded',
          label: 'Ткани нужно',
      type: 'number',
      unit: 'м²'
        },
        {
          name: 'estimatedTime',
          label: 'Примерное время',
      type: 'number',
      unit: 'ч'
        }
      ],
      calculate: (inputs): any => {
        const quiltWidth = Number(inputs.quiltWidth);
        const quiltLength = Number(inputs.quiltLength);
        const patchSize = Number(inputs.patchSize);
        const patchesPerRow = Math.ceil(quiltWidth / patchSize);
        const rows = Math.ceil(quiltLength / patchSize);
        const patchCount = patchesPerRow * rows;
        const fabricNeeded = Math.round(patchCount * (patchSize / 100) * (patchSize / 100) * 1.2 * 100) / 100;
        const estimatedTime = Math.round(patchCount * 0.15); // ~10 минут на лоскут

        return [
          { value: patchCount, label: 'Количество лоскутов', unit: 'шт' },
          { value: fabricNeeded, label: 'Ткани нужно', unit: 'м²' },
          { value: estimatedTime, label: 'Примерное время', unit: 'ч' }
        ];
      },
      content: {
        howTo: `Для расчёта:
1. Задайте размеры одеяла
2. Выберите размер лоскутов
3. Учтите запас ткани на швы`,
        about: `Пэчворк (лоскутное шитьё) - это техника создания текстильных изделий из кусочков ткани.`,
        formula: `Лоскутов = (Ширина/Размер) × (Длина/Размер)`,
        faq: [],
        sources: [],
        updatedAt: '2026-04-08'
      }
    },
    {
      id: 'diy-cost-calculator',
      slug: 'diy-cost-calculator',
      title: 'Калькулятор стоимости DIY',
      description: 'Сравните стоимость самоделки с покупкой готового',
      category: 'diy',
      subcategory: 'budget',
      type: 'arithmetic',
      inputs: [
        {
          name: 'materialsCost',
          label: 'Стоимость материалов',
      type: 'number', min: 0
        },
        {
          name: 'toolsCost',
          label: 'Стоимость инструментов',
      type: 'number', min: 0,
          defaultValue: 0
        },
        {
          name: 'hoursSpent',
          label: 'Время работы',
      type: 'number', min: 0
        },
        {
          name: 'hourlyValue',
          label: 'Ценность вашего времени',
      type: 'number', min: 0,
          defaultValue: 500
        },
        {
          name: 'storePrice',
          label: 'Цена готового изделия',
      type: 'number', min: 0
        }
      ],
      outputs: [
        {
          name: 'totalDIYCost',
          label: 'Итоговая стоимость DIY',
      type: 'number',
      unit: '₽'
        },
        {
          name: 'savings',
          label: 'Экономия',
      type: 'number',
      unit: '₽'
        },
        {
          name: 'worthIt',
          label: 'Выгодно ли?',
          type: 'text'
        }
      ],
      calculate: (inputs): any => {
        const materialsCost = Number(inputs.materialsCost);
        const toolsCost = Number(inputs.toolsCost);
        const hoursSpent = Number(inputs.hoursSpent);
        const hourlyValue = Number(inputs.hourlyValue);
        const storePrice = Number(inputs.storePrice);
        const totalDIYCost = materialsCost + toolsCost + (hoursSpent * hourlyValue);
        const savings = storePrice - totalDIYCost;
        const worthIt = savings > 0 ? 'Да! DIY выгоднее на ' + Math.round(savings) + '₽' : 'Нет, дешевле купить готовое';

        return [
          { value: Math.round(totalDIYCost), label: 'Итоговая стоимость DIY', unit: '₽' },
          { value: Math.round(savings), label: 'Экономия', unit: '₽' },
          { value: worthIt, label: 'Выгодно ли?', unit: '' }
        ];
      },
      content: {
        howTo: `Для расчёта:
1. Посчитайте стоимость материалов
2. Учтите инструменты
3. Оцените время и ценность времени
4. Сравните с ценой готового`,
        about: `DIY не всегда дешевле покупки. Иногда удовольствие от процесса важнее экономии.`,
        formula: `Стоимость DIY = Материалы + Инструменты + (Время × Ценность времени)`,
        faq: [],
        sources: [],
        updatedAt: '2026-04-08'
      }
    }
  ];
