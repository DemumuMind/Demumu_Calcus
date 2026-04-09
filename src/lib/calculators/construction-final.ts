import { Calculator } from '../types';

// Калькулятор шпаклёвки
export const puttyCalculator: Calculator = {
  id: 'putty-calculator',
  slug: 'shpaklyovka',
  title: 'Калькулятор шпаклёвки',
  description: 'Расчёт количества шпаклёвки для выравнивания стен',
  category: 'stroitelstvo',
  subcategory: 'build-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь стен (м²)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 0.1
    },
    {
      name: 'thickness',
      label: 'Толщина слоя (мм)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 0.5,
      max: 10,
      step: 0.5
    },
    {
      name: 'puttyType',
      label: 'Тип шпаклёвки',
      type: 'select',
      options: [
        { value: 'finish', label: 'Финишная (0.8 кг/м²/мм)' },
        { value: 'base', label: 'Базовая/стартовая (1.2 кг/м²/мм)' },
        { value: 'universal', label: 'Универсальная (1.0 кг/м²/мм)' }
      ],
      defaultValue: 'finish'
    }
  ],
  outputs: [
    { name: 'weight', label: 'Необходимый вес', type: 'number', unit: 'кг' },
    { name: 'bags', label: 'Мешков (25 кг)', type: 'number', unit: 'шт.' },
    { name: 'withReserve', label: 'С запасом 10%', type: 'number', unit: 'кг' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness);
    const puttyType = String(inputs.puttyType);
    
    // Consumption per m² per mm thickness based on putty type
    const consumptionRates: Record<string, number> = {
      'finish': 0.8,
      'base': 1.2,
      'universal': 1.0
    };
    
    const consumption = consumptionRates[puttyType];
    const weight = area * consumption * thickness;
    const withReserve = weight * 1.1;
    const bags = Math.ceil(withReserve / 25);
    
    return [
      { value: Math.round(weight * 10) / 10, label: 'Необходимо шпаклёвки', unit: 'кг' },
      { value: bags, label: 'Мешков по 25 кг', unit: 'шт.' },
      { value: Math.round(withReserve * 10) / 10, label: 'С запасом 10%', unit: 'кг' }
    ];
  },
  content: {
    howTo: 'Введите площадь стен, толщину слоя шпаклёвки и выберите тип. Калькулятор рассчитает количество с учётом 10% запаса.',
    about: 'Шпаклёвка используется для финишного выравнивания стен перед покраской или поклейкой обоев. Расход зависит от толщины слоя и типа шпаклёвки: финишная (0.8 кг/м²/мм), базовая (1.2 кг/м²/мм), универсальная (1.0 кг/м²/мм).',
    usage: 'Используется при подготовке стен к отделке, расчёте материалов для ремонта.',
    formula: 'Вес = Площадь × Толщина × Расход на мм\nС запасом = Вес × 1.10\nМешков = С запасом / 25 кг',
    faq: [
      {
        question: 'Какой слой шпаклёвки нужен?',
        answer: 'Финишная шпаклёвка наносится слоем 0.5-3 мм. Базовая шпаклёвка может наноситься слоем до 10 мм для выравнивания неровностей.'
      },
      {
        question: 'Сколько слоёв шпаклёвки нужно нанести?',
        answer: 'Обычно 1-2 слоя: стартовый слой для выравнивания и финишный для гладкости. Каждый слой должен полностью высохнуть перед нанесением следующего.'
      },
      {
        question: 'Можно ли красить поверх шпаклёвки без шлифовки?',
        answer: 'Нет, шпаклёвку обязательно нужно отшлифовать наждачной бумагой (зернистость 120-220) для получения гладкой поверхности перед покраской.'
      }
    ],
    sources: [
      { title: 'Технология нанесения шпаклёвки', url: 'https://www.knauf.ru/product/shpaklevki/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор грунтовки
export const primerCalculator: Calculator = {
  id: 'primer-calculator',
  slug: 'gruntovka',
  title: 'Калькулятор грунтовки',
  description: 'Расчёт расхода грунтовки для стен и потолков',
  category: 'stroitelstvo',
  subcategory: 'build-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Общая площадь (м²)',
      type: 'number',
      placeholder: '80',
      defaultValue: 80,
      min: 0.1
    },
    {
      name: 'surfaceType',
      label: 'Тип поверхности',
      type: 'select',
      options: [
        { value: 'concrete', label: 'Бетон (200-250 г/м²)' },
        { value: 'plaster', label: 'Штукатурка (150-200 г/м²)' },
        { value: 'drywall', label: 'Гипсокартон (100-150 г/м²)' },
        { value: 'wood', label: 'Дерево (250-300 г/м²)' }
      ],
      defaultValue: 'plaster'
    },
    {
      name: 'primerType',
      label: 'Тип грунтовки',
      type: 'select',
      options: [
        { value: 'deep', label: 'Глубокого проникновения' },
        { value: 'universal', label: 'Универсальная' },
        { value: 'acrylic', label: 'Акриловая' }
      ],
      defaultValue: 'deep'
    }
  ],
  outputs: [
    { name: 'consumption', label: 'Расход грунтовки', type: 'number', unit: 'г' },
    { name: 'liters', label: 'Объём', type: 'number', unit: 'л' },
    { name: 'cans', label: 'Банок (5 л)', type: 'number', unit: 'шт.' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const surfaceType = String(inputs.surfaceType);
    const primerType = String(inputs.primerType);
    
    // Base consumption per m² by surface type (grams)
    const surfaceConsumption: Record<string, number> = {
      'concrete': 225,
      'plaster': 175,
      'drywall': 125,
      'wood': 275
    };
    
    // Multiplier by primer type
    const primerMultiplier: Record<string, number> = {
      'deep': 1.0,
      'universal': 1.1,
      'acrylic': 0.9
    };
    
    const baseConsumption = surfaceConsumption[surfaceType];
    const multiplier = primerMultiplier[primerType];
    const consumption = area * baseConsumption * multiplier;
    const withReserve = consumption * 1.1;
    const liters = withReserve / 1000; // Convert grams to liters (approx density ~1 kg/l)
    const cans = Math.ceil(liters / 5);
    
    return [
      { value: Math.round(withReserve), label: 'Необходимо грунтовки', unit: 'г' },
      { value: Math.round(liters * 10) / 10, label: 'Объём с запасом', unit: 'л' },
      { value: cans, label: 'Банок по 5 л', unit: 'шт.' }
    ];
  },
  content: {
    howTo: 'Введите общую площадь стен и потолка, выберите тип поверхности и грунтовки. Калькулятор рассчитает расход с учётом 10% запаса.',
    about: 'Грунтовка укрепляет поверхность, улучшает сцепление с последующими слоями отделки и снижает расход краски или клея. Расход зависит от впитываемости поверхности: бетон (200-250 г/м²), штукатурка (150-200 г/м²), гипсокартон (100-150 г/м²), дерево (250-300 г/м²).',
    usage: 'Используется при подготовке поверхностей перед покраской, шпаклёвкой, укладкой плитки.',
    formula: 'Расход = Площадь × Базовый расход × Коэффициент грунтовки × 1.10 (запас)',
    faq: [
      {
        question: 'Зачем нужна грунтовка перед покраской?',
        answer: 'Грунтовка укрепляет поверхность, снижает пылеобразование, улучшает адгезию краски и сокращает её расход на 10-20%.'
      },
      {
        question: 'Сколько слоёв грунтовки нужно нанести?',
        answer: 'Обычно достаточно 1 слоя. Для сильновпитывающих поверхностей (бетон, кирпич) рекомендуется 2 слоя с промежуточной сушкой 2-4 часа.'
      },
      {
        question: 'Можно ли разбавлять грунтовку водой?',
        answer: 'Некоторые грунтовки (обычно концентраты) можно разбавлять водой до 1:5. Всегда читайте инструкцию на упаковке.'
      }
    ],
    sources: [
      { title: 'Грунтовки для стен и потолков', url: 'https://www.tikkurila.ru/recommendation/gruntovka-sten/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор утеплителя
export const insulationCalculator: Calculator = {
  id: 'insulation-calculator',
  slug: 'utepitel',
  title: 'Калькулятор утеплителя',
  description: 'Расчёт количества утеплителя для стен, полов и крыш',
  category: 'stroitelstvo',
  subcategory: 'build-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь поверхности (м²)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0.1
    },
    {
      name: 'thickness',
      label: 'Толщина утепления (см)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 1,
      max: 30
    },
    {
      name: 'materialType',
      label: 'Тип утеплителя',
      type: 'select',
      options: [
        { value: 'mineral-wool', label: 'Минеральная вата (плиты 0.36 м²)' },
        { value: 'polystyrene', label: 'Пенополистирол ПСБ (плиты 0.72 м²)' },
        { value: 'extruder', label: 'Экструдер XPS (плиты 0.72 м²)' },
        { value: 'basalt-wool', label: 'Базальтовая вата (плиты 0.36 м²)' }
      ],
      defaultValue: 'mineral-wool'
    },
    {
      name: 'packageArea',
      label: 'Площадь в упаковке (м²)',
      type: 'number',
      placeholder: '7.2',
      defaultValue: 7.2,
      min: 0.1,
      step: 0.1
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём утеплителя', type: 'number', unit: 'м³' },
    { name: 'packages', label: 'Упаковок', type: 'number', unit: 'шт.' },
    { name: 'sheets', label: 'Листов/плит', type: 'number', unit: 'шт.' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness);
    const materialType = String(inputs.materialType);
    const packageArea = Number(inputs.packageArea);
    
    // Sheet sizes by material type (m² per sheet)
    const sheetSizes: Record<string, number> = {
      'mineral-wool': 0.36,  // 600x600 mm
      'polystyrene': 0.72,   // 1200x600 mm
      'extruder': 0.72,      // 1200x600 mm
      'basalt-wool': 0.36    // 600x600 mm
    };
    
    const sheetArea = sheetSizes[materialType];
    const volume = (area * thickness) / 100; // Convert cm to m for volume
    
    // Calculate sheets with 10% reserve for cutting waste
    const totalArea = area * 1.1;
    const sheets = Math.ceil(totalArea / sheetArea);
    const packages = Math.ceil(totalArea / packageArea);
    
    return [
      { value: Math.round(volume * 100) / 100, label: 'Объём утеплителя', unit: 'м³' },
      { value: packages, label: 'Упаковок с запасом', unit: 'шт.' },
      { value: sheets, label: 'Плит/листов', unit: 'шт.' }
    ];
  },
  content: {
    howTo: 'Введите площадь поверхности, толщину утепления, тип материала и площадь в одной упаковке. Калькулятор рассчитает количество с учётом 10% запаса на подрезку.',
    about: 'Утеплитель снижает теплопотери и повышает энергоэффективность здания. Минеральная вата и базальтовая вата имеют размер плит 600×600 мм (0.36 м²), пенополистирол и экструдер — 1200×600 мм (0.72 м²). Запас 10% закладывается на подрезку углов и заполнение проёмов.',
    usage: 'Используется при утеплении стен снаружи и изнутри, полов, потолков, крыш, мансард.',
    formula: 'Объём = Площадь × Толщина (в метрах)\nПлит = (Площадь × 1.10) / Площадь плиты\nУпаковок = (Площадь × 1.10) / Площадь упаковки',
    faq: [
      {
        question: 'Какая толщина утеплителя нужна для стен?',
        answer: 'Для наружных стен в средней полосе России: минеральная вата 150-200 мм, пеноплекс 100-150 мм. Для пола: 100-150 мм, для потолка/кровли: 200-300 мм.'
      },
      {
        question: 'Что лучше — минеральная вата или пеноплекс?',
        answer: 'Минеральная вата дышит и не горит, но боится влаги. Пеноплекс (экструдер) не боится влаги, но горючий. Для фасадов часто используют комбинацию: вата внутри, пеноплекс снаружи.'
      },
      {
        question: 'Нужна пароизоляция при утеплении?',
        answer: 'Да, при утеплении изнутри обязательна пароизоляция со стороны помещения, чтобы предотвратить конденсацию в толще утеплителя. При утеплении снаружи — ветрозащита.'
      }
    ],
    sources: [
      { title: 'Выбор и расчёт утеплителя', url: 'https://www.rockwool.ru/products/' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const constructionFinalCalculators = [
  puttyCalculator,
  primerCalculator,
  insulationCalculator,
];
