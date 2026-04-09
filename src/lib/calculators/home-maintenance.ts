import { Calculator } from '../types';

// Калькулятор краски для стен
export const paintCalculator: Calculator = {
  id: 'paint-renovation-calculator',
  slug: 'raskhod-kraski',
  title: 'Калькулятор краски',
  description: 'Расчёт количества краски для стен и потолка с учётом площади, пористости и количества слоёв',
  category: 'stroitelstvo',
  subcategory: 'home-improvement',
  type: 'formula',
  inputs: [
    {
      name: 'wallArea',
      label: 'Площадь стен (м²)',
      type: 'number',
      placeholder: '40',
      min: 1,
      defaultValue: 40
    },
    {
      name: 'ceilingArea',
      label: 'Площадь потолка (м²)',
      type: 'number',
      placeholder: '15',
      min: 0,
      defaultValue: 15
    },
    {
      name: 'paintCoverage',
      label: 'Расход краски (м²/л)',
      type: 'number',
      placeholder: '10',
      min: 1,
      max: 30,
      defaultValue: 10
    },
    {
      name: 'coats',
      label: 'Количество слоёв',
      type: 'number',
      placeholder: '2',
      min: 1,
      max: 5,
      defaultValue: 2
    },
    {
      name: 'surfaceType',
      label: 'Тип поверхности',
      type: 'select',
      options: [
        { value: 'smooth', label: 'Гладкая (гипсокартон)' },
        { value: 'normal', label: 'Обычная (штукатурка)' },
        { value: 'porous', label: 'Пористая (бетон, кирпич)' },
        { value: 'textured', label: 'Фактурная (штукатурка)' }
      ],
      defaultValue: 'normal'
    }
  ],
  outputs: [
    { name: 'totalArea', label: 'Общая площадь', type: 'number', unit: 'м²' },
    { name: 'paintVolume', label: 'Объём краски', type: 'number', unit: 'л' },
    { name: 'paintCans', label: 'Количество банок', type: 'number', unit: 'шт' },
    { name: 'cansSize', label: 'Рекомендуемый размер', type: 'text' },
    { name: 'primerVolume', label: 'Грунтовка (10% запас)', type: 'number', unit: 'л' }
  ],
  calculate: (inputs) => {
    const wallArea = Number(inputs.wallArea) || 0;
    const ceilingArea = Number(inputs.ceilingArea) || 0;
    const paintCoverage = Number(inputs.paintCoverage);
    const coats = Number(inputs.coats);
    const surfaceType = String(inputs.surfaceType);
    
    if (!paintCoverage || !coats) {
      return [
        { value: '—', label: 'Общая площадь', unit: 'м²' },
        { value: '—', label: 'Объём краски', unit: 'л' },
        { value: '—', label: 'Количество банок', unit: 'шт' },
        { value: '—', label: 'Рекомендуемый размер' },
        { value: '—', label: 'Грунтовка (10% запас)', unit: 'л' }
      ];
    }
    
    const totalArea = wallArea + ceilingArea;
    
    // Surface type multiplier
    const surfaceMultipliers: Record<string, number> = {
      'smooth': 1.0,
      'normal': 1.1,
      'porous': 1.4,
      'textured': 1.2
    };
    
    const multiplier = surfaceMultipliers[surfaceType];
    const effectiveArea = totalArea * multiplier * coats;
    const paintVolume = effectiveArea / paintCoverage;
    const primerVolume = totalArea * 0.1 / 10; // Primer coverage ~10 m²/l with 10% extra
    
    // Calculate cans needed (standard sizes: 2.5L, 5L, 10L)
    let cansNeeded: number;
    let canSize: string;
    
    if (paintVolume <= 2.5) {
      cansNeeded = 1;
      canSize = '2.5 л';
    } else if (paintVolume <= 5) {
      cansNeeded = 1;
      canSize = '5 л';
    } else if (paintVolume <= 10) {
      cansNeeded = 1;
      canSize = '10 л';
    } else {
      cansNeeded = Math.ceil(paintVolume / 10);
      canSize = '10 л';
    }
    
    return [
      { value: totalArea, label: 'Общая площадь', unit: 'м²' },
      { value: Number(paintVolume.toFixed(1)), label: 'Объём краски', unit: 'л' },
      { value: cansNeeded, label: 'Количество банок', unit: 'шт' },
      { value: canSize, label: 'Рекомендуемый размер' },
      { value: Number(primerVolume.toFixed(1)), label: 'Грунтовка (10% запас)', unit: 'л' }
    ];
  },
  content: {
    howTo: 'Введите площадь стен и потолка, расход краски с банки, количество слоёв и тип поверхности. Калькулятор рассчитает нужный объём и количество банок с запасом.',
    about: 'Расход краски зависит от плотности поверхности (пористые материалы впитывают больше), качества краски и желаемой плотности цвета. Всегда покупайте с 10-15% запасом.',
    formula: 'Объём краски = Площадь × Коэффициент поверхности × Слои / Расход\nКоэффициент: гладкая 1.0, обычная 1.1, пористая 1.4, фактурная 1.2',
    faq: [
      { question: 'Сколько слоёв краски нужно?', answer: 'Обычно 2 слоя для качественного покрытия. На пористых поверхностях может понадобиться 3.' },
      { question: 'Нужна ли грунтовка?', answer: 'Да, особенно на пористых и цветных поверхностях. Экономит краску и улучшает сцепление.' }
    ],
    sources: [
      { title: 'Dulux - Paint Calculator', url: 'https://www.dulux.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор ламината/паркета
export const flooringCalculator: Calculator = {
  id: 'flooring-calculator',
  slug: 'raskhod-laminata',
  title: 'Калькулятор напольного покрытия',
  description: 'Расчёт количества ламината, паркета, плитки или линолеума с учётом укладки и запаса',
  category: 'stroitelstvo',
  subcategory: 'home-improvement',
  type: 'formula',
  inputs: [
    {
      name: 'roomLength',
      label: 'Длина комнаты (м)',
      type: 'number',
      placeholder: '5',
      min: 1,
      defaultValue: 5
    },
    {
      name: 'roomWidth',
      label: 'Ширина комнаты (м)',
      type: 'number',
      placeholder: '4',
      min: 1,
      defaultValue: 4
    },
    {
      name: 'flooringType',
      label: 'Тип покрытия',
      type: 'select',
      options: [
        { value: 'laminate', label: 'Ламинат' },
        { value: 'parquet', label: 'Паркетная доска' },
        { value: 'tile', label: 'Керамическая плитка' },
        { value: 'linoleum', label: 'Линолеум' },
        { value: 'vinyl', label: 'Виниловая плитка SPC' }
      ],
      defaultValue: 'laminate'
    },
    {
      name: 'wastePercent',
      label: 'Процент запаса',
      type: 'number',
      placeholder: '10',
      min: 5,
      max: 30,
      defaultValue: 10
    },
    {
      name: 'packageSize',
      label: 'Площадь упаковки (м²)',
      type: 'number',
      placeholder: '2.5',
      min: 0.5,
      defaultValue: 2.5
    }
  ],
  outputs: [
    { name: 'roomArea', label: 'Площадь комнаты', type: 'number', unit: 'м²' },
    { name: 'totalArea', label: 'С учётом запаса', type: 'number', unit: 'м²' },
    { name: 'packages', label: 'Количество упаковок', type: 'number', unit: 'шт' },
    { name: 'extraArea', label: 'Запас', type: 'number', unit: 'м²' },
    { name: 'estimatedCost', label: 'Ориентировочная стоимость', type: 'text' }
  ],
  calculate: (inputs) => {
    const roomLength = Number(inputs.roomLength);
    const roomWidth = Number(inputs.roomWidth);
    const flooringType = String(inputs.flooringType);
    const wastePercent = Number(inputs.wastePercent);
    const packageSize = Number(inputs.packageSize);
    
    if (!roomLength || !roomWidth || !packageSize) {
      return [
        { value: '—', label: 'Площадь комнаты', unit: 'м²' },
        { value: '—', label: 'С учётом запаса', unit: 'м²' },
        { value: '—', label: 'Количество упаковок', unit: 'шт' },
        { value: '—', label: 'Запас', unit: 'м²' },
        { value: '—', label: 'Ориентировочная стоимость' }
      ];
    }
    
    const roomArea = roomLength * roomWidth;
    
    // Adjust waste based on flooring type and room shape
    let adjustedWaste = wastePercent;
    if (flooringType === 'tile') adjustedWaste += 5; // More waste for tile
    if (roomLength / roomWidth > 2 || roomWidth / roomLength > 2) adjustedWaste += 3; // Elongated room
    
    const totalArea = roomArea * (1 + adjustedWaste / 100);
    const packages = Math.ceil(totalArea / packageSize);
    const extraArea = packages * packageSize - roomArea;
    
    // Estimated cost ranges per m²
    const costRanges: Record<string, [number, number]> = {
      'laminate': [300, 1500],
      'parquet': [800, 4000],
      'tile': [500, 2500],
      'linoleum': [200, 800],
      'vinyl': [600, 2000]
    };
    
    const [minCost, maxCost] = costRanges[flooringType];
    const minTotal = Math.round(roomArea * minCost);
    const maxTotal = Math.round(roomArea * maxCost);
    
    return [
      { value: roomArea, label: 'Площадь комнаты', unit: 'м²' },
      { value: Number(totalArea.toFixed(1)), label: 'С учётом запаса', unit: 'м²' },
      { value: packages, label: 'Количество упаковок', unit: 'шт' },
      { value: Number(extraArea.toFixed(1)), label: 'Запас', unit: 'м²' },
      { value: `${minTotal.toLocaleString()} - ${maxTotal.toLocaleString()} ₽`, label: 'Ориентировочная стоимость' }
    ];
  },
  content: {
    howTo: 'Введите размеры комнаты, тип покрытия, размер упаковки и желаемый запас. Калькулятор рассчитает количество материала и даст ориентировочную стоимость.',
    about: 'При укладке напольного покрытия всегда нужен запас на обрезку, подгонку и возможный брак. Для простых комнат — 5-7%, для сложных с колоннами — 15-20%.',
    formula: 'Упаковки = ⌈(Длина × Ширина × (1 + Запас%)) / Размер упаковки⌉',
    faq: [
      { question: 'Почему так много запаса?', answer: 'На раскрой планок, подгонку к стенам, запас на будущий ремонт. Остатки пригодятся при повреждении.' },
      { question: 'Линолеум тоже нужно с запасом?', answer: 'Да, особенно если ширина рулона меньше ширины комнаты — нужен запас на стыки и подгонку.' }
    ],
    sources: [
      { title: 'Tarkett - Flooring Guide', url: 'https://www.tarkett.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор обоев
export const wallpaperCalculator: Calculator = {
  id: 'wallpaper-renovation-calculator',
  slug: 'raskhod-oboev',
  title: 'Калькулятор обоев',
  description: 'Расчёт количества рулонов обоев с учётом площади, рисунка и высоты потолков',
  category: 'stroitelstvo',
  subcategory: 'home-improvement',
  type: 'formula',
  inputs: [
    {
      name: 'perimeter',
      label: 'Периметр комнаты (м)',
      type: 'number',
      placeholder: '16',
      min: 1,
      defaultValue: 16
    },
    {
      name: 'ceilingHeight',
      label: 'Высота потолков (м)',
      type: 'number',
      placeholder: '2.7',
      min: 2,
      max: 5,
      step: 0.1,
      defaultValue: 2.7
    },
    {
      name: 'doorArea',
      label: 'Площадь дверей/окон (м²)',
      type: 'number',
      placeholder: '4',
      min: 0,
      defaultValue: 4
    },
    {
      name: 'rollWidth',
      label: 'Ширина рулона (м)',
      type: 'select',
      options: [
        { value: '0.53', label: 'Стандарт (53 см)' },
        { value: '1.06', label: 'Широкие (106 см)' }
      ],
      defaultValue: '0.53'
    },
    {
      name: 'patternRepeat',
      label: 'Раппорт (высота рисунка) (см)',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'wallArea', label: 'Площадь стен', type: 'number', unit: 'м²' },
    { name: 'effectiveArea', label: 'С учётом вычетов', type: 'number', unit: 'м²' },
    { name: 'strips', label: 'Количество полос', type: 'number', unit: 'шт' },
    { name: 'rolls', label: 'Рулонов нужно', type: 'number', unit: 'шт' },
    { name: 'rollLength', label: 'Длина рулона', type: 'text' }
  ],
  calculate: (inputs) => {
    const perimeter = Number(inputs.perimeter);
    const ceilingHeight = Number(inputs.ceilingHeight);
    const doorArea = Number(inputs.doorArea);
    const rollWidth = Number(inputs.rollWidth);
    const patternRepeat = Number(inputs.patternRepeat);
    
    if (!perimeter || !ceilingHeight) {
      return [
        { value: '—', label: 'Площадь стен', unit: 'м²' },
        { value: '—', label: 'С учётом вычетов', unit: 'м²' },
        { value: '—', label: 'Количество полос', unit: 'шт' },
        { value: '—', label: 'Рулонов нужно', unit: 'шт' },
        { value: '—', label: 'Длина рулона' }
      ];
    }
    
    const wallArea = perimeter * ceilingHeight;
    const effectiveArea = wallArea - doorArea;
    
    // Standard roll is 10.05m long
    const rollLength = 10.05;
    
    // Calculate strips needed
    const stripsNeeded = Math.ceil(perimeter / rollWidth);
    
    // Calculate strip length with pattern matching
    let stripLength = ceilingHeight + 0.1; // +10cm for trimming
    if (patternRepeat > 0) {
      // Round up to next pattern repeat
      stripLength = Math.ceil(stripLength / (patternRepeat / 100)) * (patternRepeat / 100);
    }
    
    // Calculate strips per roll
    const stripsPerRoll = Math.floor(rollLength / stripLength);
    
    // Calculate total rolls needed
    const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
    
    return [
      { value: Number(wallArea.toFixed(1)), label: 'Площадь стен', unit: 'м²' },
      { value: Number(effectiveArea.toFixed(1)), label: 'С учётом вычетов', unit: 'м²' },
      { value: stripsNeeded, label: 'Количество полос', unit: 'шт' },
      { value: rollsNeeded, label: 'Рулонов нужно', unit: 'шт' },
      { value: `${rollLength} м (${rollWidth} м ширина)`, label: 'Длина рулона' }
    ];
  },
  content: {
    howTo: 'Введите периметр комнаты, высоту потолков, площадь дверей и окон, ширину рулона и раппорт (при наличии рисунка). Калькулятор рассчитает количество рулонов.',
    about: 'Обои стандартно продаются рулонами по 10.05 м. При наличии рисунка с подбором (раппорт) расход увеличивается. Широкие обои (1.06 м) экономят время поклейки, но требуют навыков.',
    formula: 'Полосы = ⌈Периметр / Ширина рулона⌉\nПолос в рулоне = ⌊10.05 / (Высота + Раппорт)⌋\nРулоны = ⌈Полосы / Полос в рулоне⌉',
    faq: [
      { question: 'Что такое раппорт?', answer: 'Высота повторяющегося элемента рисунка. При подгонке от каждого отреза отрезается часть для совпадения рисунка.' },
      { question: 'Какие обои лучше — 53 см или 106 см?', answer: '106 см быстрее клеить на больших стенах без окон, 53 см универсальнее для сложных комнат.' }
    ],
    sources: [
      { title: 'Pirelli - Wallpaper Guide', url: 'https://www.pirelli.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор штукатурки
export const plasterCalculator: Calculator = {
  id: 'plaster-calculator',
  slug: 'raskhod-shtukaturki',
  title: 'Калькулятор штукатурки',
  description: 'Расчёт количества штукатурной смеси с учётом площади и толщины слоя',
  category: 'stroitelstvo',
  subcategory: 'construction-materials',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь стен (м²)',
      type: 'number',
      placeholder: '50',
      min: 1,
      defaultValue: 50
    },
    {
      name: 'thickness',
      label: 'Средняя толщина слоя (мм)',
      type: 'number',
      placeholder: '15',
      min: 5,
      max: 50,
      defaultValue: 15
    },
    {
      name: 'mixType',
      label: 'Тип смеси',
      type: 'select',
      options: [
        { value: 'cement', label: 'Цементная' },
        { value: 'gypsum', label: 'Гипсовая' },
        { value: 'polymer', label: 'Полимерная' },
        { value: 'lime', label: 'Известковая' }
      ],
      defaultValue: 'gypsum'
    },
    {
      name: 'bagWeight',
      label: 'Вес мешка (кг)',
      type: 'number',
      placeholder: '30',
      min: 5,
      defaultValue: 30
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём штукатурки', type: 'number', unit: 'м³' },
    { name: 'dryWeight', label: 'Вес сухой смеси', type: 'number', unit: 'кг' },
    { name: 'bags', label: 'Количество мешков', type: 'number', unit: 'шт' },
    { name: 'waterNeeded', label: 'Воды понадобится', type: 'number', unit: 'л' },
    { name: 'coverage', label: 'Расход на м²', type: 'text' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness);
    const mixType = String(inputs.mixType);
    const bagWeight = Number(inputs.bagWeight);
    
    if (!area || !thickness || !bagWeight) {
      return [
        { value: '—', label: 'Объём штукатурки', unit: 'м³' },
        { value: '—', label: 'Вес сухой смеси', unit: 'кг' },
        { value: '—', label: 'Количество мешков', unit: 'шт' },
        { value: '—', label: 'Воды понадобится', unit: 'л' },
        { value: '—', label: 'Расход на м²' }
      ];
    }
    
    // Consumption rates (kg per m² per 10mm thickness)
    const consumptionRates: Record<string, number> = {
      'cement': 16,
      'gypsum': 9,
      'polymer': 10,
      'lime': 14
    };
    
    const rate = consumptionRates[mixType];
    const consumptionPerSqM = (rate * thickness) / 10;
    
    const volume = (area * thickness) / 1000; // m³
    const dryWeight = area * consumptionPerSqM;
    const bags = Math.ceil(dryWeight / bagWeight);
    
    // Water ratio varies by type
    const waterRatios: Record<string, number> = {
      'cement': 0.15,
      'gypsum': 0.6,
      'polymer': 0.5,
      'lime': 0.25
    };
    const waterNeeded = dryWeight * waterRatios[mixType];
    
    return [
      { value: Number(volume.toFixed(3)), label: 'Объём штукатурки', unit: 'м³' },
      { value: Math.round(dryWeight), label: 'Вес сухой смеси', unit: 'кг' },
      { value: bags, label: 'Количество мешков', unit: 'шт' },
      { value: Math.round(waterNeeded), label: 'Воды понадобится', unit: 'л' },
      { value: `${consumptionPerSqM.toFixed(1)} кг/м²`, label: 'Расход на м²' }
    ];
  },
  content: {
    howTo: 'Введите площадь стен, толщину слоя штукатурки, тип смеси и вес мешка. Калькулятор рассчитает количество материала и воды для замешивания.',
    about: 'Расход штукатурки зависит от типа смеси: гипсовая легче (~9 кг/м²/10мм), цементная тяжелее (~16 кг/м²/10мм). Реальная толщина может варьироваться от 5 до 50 мм в зависимости от кривизны стен.',
    formula: 'Сухая смесь (кг) = Площадь × Норма расхода × (Толщина / 10)\nНормы: гипс 9, цемент 16, полимер 10, известь 14 кг/м²/10мм',
    faq: [
      { question: 'Какая штукатурка лучше для ванной?', answer: 'Цементная или полимерная — водостойкие. Гипсовая бояться влаги.' },
      { question: 'Сколько слоёв наносить?', answer: 'Один слой до 30 мм или два по 15 мм с промежуточным высыханием.' }
    ],
    sources: [
      { title: 'Knauf - Plaster Guide', url: 'https://www.knauf.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор плитки
export const tileCalculator: Calculator = {
  id: 'tile-renovation-calculator',
  slug: 'raskhod-plitki',
  title: 'Калькулятор керамической плитки',
  description: 'Расчёт количества плитки для стен и пола с учётом способа укладки и запаса',
  category: 'stroitelstvo',
  subcategory: 'home-improvement',
  type: 'formula',
  inputs: [
    {
      name: 'wallArea',
      label: 'Площадь стен (м²)',
      type: 'number',
      placeholder: '20',
      min: 0,
      defaultValue: 20
    },
    {
      name: 'floorArea',
      label: 'Площадь пола (м²)',
      type: 'number',
      placeholder: '8',
      min: 0,
      defaultValue: 8
    },
    {
      name: 'tileSize',
      label: 'Размер плитки (см)',
      type: 'select',
      options: [
        { value: '10x10', label: '10×10' },
        { value: '20x20', label: '20×20' },
        { value: '20x30', label: '20×30' },
        { value: '30x30', label: '30×30' },
        { value: '30x60', label: '30×60' },
        { value: '60x60', label: '60×60' }
      ],
      defaultValue: '30x30'
    },
    {
      name: 'pattern',
      label: 'Способ укладки',
      type: 'select',
      options: [
        { value: 'straight', label: 'Прямая (со смещением)' },
        { value: 'diagonal', label: 'Диагональная' },
        { value: 'herringbone', label: 'Ёлочка' }
      ],
      defaultValue: 'straight'
    },
    {
      name: 'wastePercent',
      label: 'Запас (%)',
      type: 'number',
      placeholder: '10',
      min: 5,
      max: 20,
      defaultValue: 10
    }
  ],
  outputs: [
    { name: 'totalArea', label: 'Общая площадь', type: 'number', unit: 'м²' },
    { name: 'tilesNeeded', label: 'Плиток нужно', type: 'number', unit: 'шт' },
    { name: 'boxes', label: 'Упаковок', type: 'number', unit: 'шт' },
    { name: 'extraTiles', label: 'Запас', type: 'number', unit: 'шт' },
    { name: 'totalWithWaste', label: 'С учётом запаса', type: 'number', unit: 'м²' }
  ],
  calculate: (inputs) => {
    const wallArea = Number(inputs.wallArea) || 0;
    const floorArea = Number(inputs.floorArea) || 0;
    const tileSize = String(inputs.tileSize);
    const pattern = String(inputs.pattern);
    const wastePercent = Number(inputs.wastePercent);
    
    if ((!wallArea && !floorArea) || !tileSize) {
      return [
        { value: '—', label: 'Общая площадь', unit: 'м²' },
        { value: '—', label: 'Плиток нужно', unit: 'шт' },
        { value: '—', label: 'Упаковок', unit: 'шт' },
        { value: '—', label: 'Запас', unit: 'шт' },
        { value: '—', label: 'С учётом запаса', unit: 'м²' }
      ];
    }
    
    const totalArea = wallArea + floorArea;
    
    // Parse tile size
    const [width, height] = tileSize.split('x').map(Number);
    const tileArea = (width * height) / 10000; // in m²
    
    // Adjust waste for pattern
    let adjustedWaste = wastePercent;
    if (pattern === 'diagonal') adjustedWaste += 5;
    if (pattern === 'herringbone') adjustedWaste += 8;
    
    const totalWithWaste = totalArea * (1 + adjustedWaste / 100);
    const tilesNeeded = Math.ceil(totalArea / tileArea);
    const tilesWithWaste = Math.ceil(totalWithWaste / tileArea);
    const extraTiles = tilesWithWaste - tilesNeeded;
    
    // Standard box size varies, assume ~1.5-2 m² per box
    const tilesPerBox = Math.floor(1.8 / tileArea);
    const boxes = Math.ceil(tilesWithWaste / tilesPerBox);
    
    return [
      { value: totalArea, label: 'Общая площадь', unit: 'м²' },
      { value: tilesNeeded, label: 'Плиток нужно', unit: 'шт' },
      { value: boxes, label: 'Упаковок', unit: 'шт' },
      { value: extraTiles, label: 'Запас', unit: 'шт' },
      { value: Number(totalWithWaste.toFixed(1)), label: 'С учётом запаса', unit: 'м²' }
    ];
  },
  content: {
    howTo: 'Введите площадь стен и пола, размер плитки, способ укладки и желаемый запас. Калькулятор рассчитает количество плитки и упаковок.',
    about: 'Диагональная и елочная укладка требуют больше запаса из-за обрезки. Стандартная упаковка содержит 1.5-2 м² плитки. Запас нужен на обрезку и возможный будущий ремонт.',
    formula: 'Плиток = ⌈Площадь / Размер плитки⌉\nС запасом: × (1 + Запас% + Поправка на укладку)',
    faq: [
      { question: 'Сколько плитки в упаковке?', answer: 'Зависит от размера. Обычно 1.5-2 м². Мелкая плитка — больше штук, крупная — меньше.' },
      { question: 'Почему диагональная укладка дороже?', answer: 'Больше отходов (обрезки по углам), сложнее разметка, требует опыта.' }
    ],
    sources: [
      { title: 'Kerama Marazzi - Tile Calculator', url: 'https://www.kerama-marazzi.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор отопления
export const heatingCalculator: Calculator = {
  id: 'heating-calculator',
  slug: 'raschet-otopleniya',
  title: 'Калькулятор мощности отопления',
  description: 'Расчёт тепловой мощности для обогрева помещения с учётом климата и утепления',
  category: 'stroitelstvo',
  subcategory: 'home-improvement',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь помещения (м²)',
      type: 'number',
      placeholder: '20',
      min: 1,
      defaultValue: 20
    },
    {
      name: 'ceilingHeight',
      label: 'Высота потолков (м)',
      type: 'number',
      placeholder: '2.7',
      min: 2,
      max: 5,
      step: 0.1,
      defaultValue: 2.7
    },
    {
      name: 'climateZone',
      label: 'Климатическая зона',
      type: 'select',
      options: [
        { value: 'mild', label: 'Мягкий климат (юг)' },
        { value: 'moderate', label: 'Умеренный климат' },
        { value: 'cold', label: 'Холодный климат (север)' },
        { value: 'severe', label: 'Суровый климат (крайний север)' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'insulation',
      label: 'Утепление',
      type: 'select',
      options: [
        { value: 'poor', label: 'Плохое (старый дом)' },
        { value: 'average', label: 'Среднее' },
        { value: 'good', label: 'Хорошее (современный дом)' }
      ],
      defaultValue: 'average'
    },
    {
      name: 'windows',
      label: 'Тип окон',
      type: 'select',
      options: [
        { value: 'single', label: 'Одинарные' },
        { value: 'double', label: 'Двойные' },
        { value: 'triple', label: 'Стеклопакет' }
      ],
      defaultValue: 'double'
    }
  ],
  outputs: [
    { name: 'roomVolume', label: 'Объём помещения', type: 'number', unit: 'м³' },
    { name: 'basePower', label: 'Базовая мощность', type: 'number', unit: 'Вт' },
    { name: 'totalPower', label: 'Требуемая мощность', type: 'number', unit: 'Вт' },
    { name: 'radiators', label: 'Радиаторов (2000 Вт)', type: 'number', unit: 'шт' },
    { name: 'powerPerSqM', label: 'Мощность на м²', type: 'number', unit: 'Вт/м²' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const ceilingHeight = Number(inputs.ceilingHeight);
    const climateZone = String(inputs.climateZone);
    const insulation = String(inputs.insulation);
    const windows = String(inputs.windows);
    
    if (!area || !ceilingHeight) {
      return [
        { value: '—', label: 'Объём помещения', unit: 'м³' },
        { value: '—', label: 'Базовая мощность', unit: 'Вт' },
        { value: '—', label: 'Требуемая мощность', unit: 'Вт' },
        { value: '—', label: 'Радиаторов (2000 Вт)', unit: 'шт' },
        { value: '—', label: 'Мощность на м²', unit: 'Вт/м²' }
      ];
    }
    
    const roomVolume = area * ceilingHeight;
    
    // Base power per m³ by climate
    const climateMultipliers: Record<string, number> = {
      'mild': 30,
      'moderate': 40,
      'cold': 50,
      'severe': 60
    };
    
    // Insulation factor
    const insulationFactors: Record<string, number> = {
      'poor': 1.3,
      'average': 1.0,
      'good': 0.8
    };
    
    // Window factor
    const windowFactors: Record<string, number> = {
      'single': 1.2,
      'double': 1.0,
      'triple': 0.9
    };
    
    const basePowerPerM3 = climateMultipliers[climateZone];
    const basePower = roomVolume * basePowerPerM3;
    const totalPower = basePower * insulationFactors[insulation] * windowFactors[windows];
    const radiators = Math.ceil(totalPower / 2000);
    const powerPerSqM = totalPower / area;
    
    return [
      { value: roomVolume, label: 'Объём помещения', unit: 'м³' },
      { value: Math.round(basePower), label: 'Базовая мощность', unit: 'Вт' },
      { value: Math.round(totalPower), label: 'Требуемая мощность', unit: 'Вт' },
      { value: radiators, label: 'Радиаторов (2000 Вт)', unit: 'шт' },
      { value: Math.round(powerPerSqM), label: 'Мощность на м²', unit: 'Вт/м²' }
    ];
  },
  content: {
    howTo: 'Введите площадь и высоту помещения, климатическую зону, качество утепления и тип окон. Калькулятор рассчитает требуемую мощность отопления.',
    about: 'Норма мощности: 40 Вт/м³ для умеренного климата. Холоднее климат — больше мощности. Плохое утепление и старые окна увеличивают потребность в 1.2-1.3 раза.',
    formula: 'Мощность = Объём × Норма климата × Коэффициент утепления × Коэффициент окон\nНормы: юг 30, средний 40, север 50, крайний север 60 Вт/м³',
    faq: [
      { question: 'Сколько секций радиатора нужно?', answer: 'Средняя секция алюминиевого радиатора — 150-200 Вт. Делите общую мощность на 150-200.' },
      { question: 'Хватит ли электрообогревателя?', answer: 'Обычно электрообогреватель 1-2 кВт хватит для 15-20 м² при хорошем утеплении.' }
    ],
    sources: [
      { title: 'SNiP - Heating Standards', url: 'https://docs.cntd.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор кондиционирования
export const airConditioningCalculator: Calculator = {
  id: 'ac-calculator',
  slug: 'raschet-kondicionera',
  title: 'Подбор мощности кондиционера',
  description: 'Расчёт требуемой мощности кондиционера для охлаждения помещения',
  category: 'stroitelstvo',
  subcategory: 'home-improvement',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь (м²)',
      type: 'number',
      placeholder: '25',
      min: 1,
      defaultValue: 25
    },
    {
      name: 'ceilingHeight',
      label: 'Высота потолков (м)',
      type: 'number',
      placeholder: '2.7',
      min: 2,
      max: 5,
      step: 0.1,
      defaultValue: 2.7
    },
    {
      name: 'sunExposure',
      label: 'Ориентация окна',
      type: 'select',
      options: [
        { value: 'north', label: 'Север (тенёк)' },
        { value: 'east', label: 'Восток' },
        { value: 'south', label: 'Юг (солнечная)' },
        { value: 'west', label: 'Запад (жаркая)' }
      ],
      defaultValue: 'south'
    },
    {
      name: 'occupants',
      label: 'Количество людей',
      type: 'number',
      placeholder: '2',
      min: 1,
      max: 20,
      defaultValue: 2
    },
    {
      name: 'equipmentHeat',
      label: 'Тепловыделение техники (Вт)',
      type: 'number',
      placeholder: '300',
      min: 0,
      defaultValue: 300
    }
  ],
  outputs: [
    { name: 'coolingPower', label: 'Мощность охлаждения', type: 'number', unit: 'кВт' },
    { name: 'btuPerHour', label: 'Мощность в BTU/ч', type: 'number', unit: 'BTU' },
    { name: 'recommendedModel', label: 'Рекомендуемая модель', type: 'text' },
    { name: 'areaCovered', label: 'Рекомендуемая площадь', type: 'text' },
    { name: 'notes', label: 'Примечания', type: 'text' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const ceilingHeight = Number(inputs.ceilingHeight);
    const sunExposure = String(inputs.sunExposure);
    const occupants = Number(inputs.occupants);
    const equipmentHeat = Number(inputs.equipmentHeat);
    
    if (!area || !ceilingHeight) {
      return [
        { value: '—', label: 'Мощность охлаждения', unit: 'кВт' },
        { value: '—', label: 'Мощность в BTU/ч', unit: 'BTU' },
        { value: '—', label: 'Рекомендуемая модель' },
        { value: '—', label: 'Рекомендуемая площадь' },
        { value: '—', label: 'Примечания' }
      ];
    }
    
    const volume = area * ceilingHeight;
    
    // Base cooling requirement: 30-40 W per m³
    let basePower = volume * 35; // Watts
    
    // Sun exposure adjustment
    const sunFactors: Record<string, number> = {
      'north': 0.9,
      'east': 1.0,
      'south': 1.15,
      'west': 1.2
    };
    basePower *= sunFactors[sunExposure];
    
    // People heat (average person emits ~100W at rest)
    const peopleHeat = occupants * 100;
    
    // Total power needed
    const totalPower = basePower + peopleHeat + equipmentHeat;
    const coolingPower = totalPower / 1000; // Convert to kW
    
    // BTU conversion (1 kW ≈ 3412 BTU/h)
    const btuPerHour = Math.ceil(coolingPower * 3412 / 1000) * 1000;
    
    // Recommend standard model
    let recommendedModel: string;
    if (coolingPower <= 2.0) {
      recommendedModel = '07 (7000 BTU, до 20 м²)';
    } else if (coolingPower <= 2.5) {
      recommendedModel = '09 (9000 BTU, до 25 м²)';
    } else if (coolingPower <= 3.5) {
      recommendedModel = '12 (12000 BTU, до 35 м²)';
    } else if (coolingPower <= 5.0) {
      recommendedModel = '18 (18000 BTU, до 50 м²)';
    } else {
      recommendedModel = '24 (24000 BTU, до 70 м²) или две сплит-системы';
    }
    
    // Recommended area
    const areaCovered = btuPerHour > 24000 
      ? 'Рекомендуется два кондиционера'
      : `До ~${Math.floor(btuPerHour / 350)} м² при стандартной высоте`;
    
    let notes = 'Учтите: мощность берите с запасом 10-15%. Лучше перенагрузить, чем недогрузить.';
    if (equipmentHeat > 500) {
      notes += ' При значительном тепловыделении техники рассмотрите более мощную модель.';
    }
    
    return [
      { value: Number(coolingPower.toFixed(1)), label: 'Мощность охлаждения', unit: 'кВт' },
      { value: btuPerHour, label: 'Мощность в BTU/ч', unit: 'BTU' },
      { value: recommendedModel, label: 'Рекомендуемая модель' },
      { value: areaCovered, label: 'Рекомендуемая площадь' },
      { value: notes, label: 'Примечания' }
    ];
  },
  content: {
    howTo: 'Введите площадь помещения, высоту потолков, ориентацию окон, количество людей и тепловыделение техники. Калькулятор подберёт подходящую мощность кондиционера.',
    about: 'Мощность кондиционеров обычно указывается в BTU/ч (British Thermal Units). Стандартные модели: 07 (7000 BTU ~ 2 кВт), 09 (9000 BTU ~ 2.5 кВт), 12 (12000 BTU ~ 3.5 кВт).',
    formula: 'Мощность = (Объём × 35 Вт/м³ × Коэффициент солнца) + Тепло людей + Тепло техники\nКоэффициенты: север 0.9, восток 1.0, юг 1.15, запад 1.2',
    faq: [
      { question: 'Что означает "09" в названии кондиционера?', answer: 'Это мощность в тысячах BTU/ч. 09 = 9000 BTU/ч ≈ 2.5 кВт, подходит для ~25 м².' },
      { question: 'Можно ли взять мощнее, чем нужно?', answer: 'Да, с запасом 10-20%. Слишком мощный будет часто включаться/выключаться, что снижает ресурс.' }
    ],
    sources: [
      { title: 'LG - AC Sizing Guide', url: 'https://www.lg.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор грунтовки
export const primerCalculator: Calculator = {
  id: 'primer-renovation-calculator',
  slug: 'raskhod-gruntovki',
  title: 'Калькулятор грунтовки',
  description: 'Расчёт количества грунтовочной смеси для подготовки стен и пола',
  category: 'stroitelstvo',
  subcategory: 'home-improvement',
  type: 'formula',
  inputs: [
    {
      name: 'wallArea',
      label: 'Площадь стен (м²)',
      type: 'number',
      placeholder: '50',
      min: 1,
      defaultValue: 50
    },
    {
      name: 'floorArea',
      label: 'Площадь пола (м²)',
      type: 'number',
      placeholder: '20',
      min: 0,
      defaultValue: 20
    },
    {
      name: 'surfaceType',
      label: 'Тип поверхности',
      type: 'select',
      options: [
        { value: 'concrete', label: 'Бетон' },
        { value: 'plaster', label: 'Штукатурка' },
        { value: 'drywall', label: 'Гипсокартон' },
        { value: 'wood', label: 'Дерево' }
      ],
      defaultValue: 'plaster'
    },
    {
      name: 'primerType',
      label: 'Тип грунтовки',
      type: 'select',
      options: [
        { value: 'universal', label: 'Универсальная' },
        { value: 'deep', label: 'Глубокого проникновения' },
        { value: 'acrylic', label: 'Акриловая' },
        { value: 'betoncontact', label: 'Бетонконтакт' }
      ],
      defaultValue: 'deep'
    },
    {
      name: 'coats',
      label: 'Количество слоёв',
      type: 'number',
      placeholder: '1',
      min: 1,
      max: 3,
      defaultValue: 1
    }
  ],
  outputs: [
    { name: 'totalArea', label: 'Общая площадь', type: 'number', unit: 'м²' },
    { name: 'consumption', label: 'Расход на м²', type: 'number', unit: 'л/м²' },
    { name: 'totalLiters', label: 'Всего грунтовки', type: 'number', unit: 'л' },
    { name: 'cans', label: 'Канистр (5л)', type: 'number', unit: 'шт' },
    { name: 'dilution', label: 'Разведение водой', type: 'text' }
  ],
  calculate: (inputs) => {
    const wallArea = Number(inputs.wallArea);
    const floorArea = Number(inputs.floorArea);
    const surfaceType = String(inputs.surfaceType);
    const primerType = String(inputs.primerType);
    const coats = Number(inputs.coats);
    
    if ((!wallArea && !floorArea) || !coats) {
      return [
        { value: '—', label: 'Общая площадь', unit: 'м²' },
        { value: '—', label: 'Расход на м²', unit: 'л/м²' },
        { value: '—', label: 'Всего грунтовки', unit: 'л' },
        { value: '—', label: 'Канистр (5л)', unit: 'шт' },
        { value: '—', label: 'Разведение водой' }
      ];
    }
    
    const totalArea = wallArea + floorArea;
    
    // Consumption rates (L per m² per coat) by surface type
    const surfaceRates: Record<string, number> = {
      'concrete': 0.35,
      'plaster': 0.25,
      'drywall': 0.15,
      'wood': 0.12
    };
    
    // Primer type multipliers
    const primerFactors: Record<string, number> = {
      'universal': 1.0,
      'deep': 1.2,
      'acrylic': 0.9,
      'betoncontact': 1.5
    };
    
    const baseRate = surfaceRates[surfaceType];
    const consumption = baseRate * primerFactors[primerType];
    const totalLiters = totalArea * consumption * coats;
    const cans = Math.ceil(totalLiters / 5);
    
    // Dilution recommendations
    const dilutionText: Record<string, string> = {
      'universal': 'Готова к применению или 1:1 с водой',
      'deep': 'Не разбавлять для пористых поверхностей, 1:1 для плотных',
      'acrylic': 'Разбавить 1:1 для первого слоя',
      'betoncontact': 'Готова к применению, не разбавлять'
    };
    
    return [
      { value: totalArea, label: 'Общая площадь', unit: 'м²' },
      { value: Number(consumption.toFixed(2)), label: 'Расход на м²', unit: 'л/м²' },
      { value: Number(totalLiters.toFixed(1)), label: 'Всего грунтовки', unit: 'л' },
      { value: cans, label: 'Канистр (5л)', unit: 'шт' },
      { value: dilutionText[primerType], label: 'Разведение водой' }
    ];
  },
  content: {
    howTo: 'Введите площадь стен и пола, тип поверхности, вид грунтовки и количество слоёв. Калькулятор рассчитает нужный объём и даст рекомендации по разведению.',
    about: 'Грунтовка подготавливает поверхность к отделке, укрепляет, уменьшает расход краски/штукатурки. Бетонконтакт нужен для гладких поверхностей, глубокого проникновения — для пористых.',
    formula: 'Объём = Площадь × Расход × Слои\nРасход: бетон 0.35, штукатурка 0.25, ГКЛ 0.15, дерево 0.12 л/м²',
    faq: [
      { question: 'Сколько сохнет грунтовка?', answer: 'Обычно 2-4 часа до полного высыхания. Можно наносить краску через 1-2 часа.' },
      { question: 'Нужна ли грунтовка под обои?', answer: 'Да, особенно на гипсокартоне и пористых поверхностях. Улучшает сцепление и экономит клей.' }
    ],
    sources: [
      { title: 'Ceresit - Primer Guide', url: 'https://www.ceresit.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const homeMaintenanceCalculators: Calculator[] = [
  paintCalculator,
  flooringCalculator,
  wallpaperCalculator,
  plasterCalculator,
  tileCalculator,
  heatingCalculator,
  airConditioningCalculator,
  primerCalculator
];
