import { Calculator } from '../types';

// Калькулятор штукатурки
export const plasterCalculator: Calculator = {
  id: 'plaster-calculator',
  slug: 'kalkulyator-shtukaturki',
  title: 'Калькулятор штукатурки',
  description: 'Расчёт количества штукатурки по площади и толщине слоя',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'wallArea',
      label: 'Площадь стен',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 1,
      unit: 'м²'
    },
    {
      name: 'layerThickness',
      label: 'Толщина слоя',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 5,
      max: 50,
      unit: 'мм'
    },
    {
      name: 'materialType',
      label: 'Тип штукатурки',
      type: 'select',
      options: [
        { value: 'cement', label: 'Цементная (1900 кг/м³)' },
        { value: 'gypsum', label: 'Гипсовая (1000 кг/м³)' },
        { value: 'lime', label: 'Известковая (1700 кг/м³)' },
        { value: 'polymer', label: 'Полимерная (1400 кг/м³)' }
      ],
      defaultValue: 'gypsum'
    },
    {
      name: 'bagSize',
      label: 'Вес мешка',
      type: 'select',
      options: [
        { value: '30', label: '30 кг' },
        { value: '25', label: '25 кг' },
        { value: '20', label: '20 кг' },
        { value: '15', label: '15 кг' }
      ],
      defaultValue: '30'
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём штукатурки', type: 'number', unit: 'м³' },
    { name: 'weight', label: 'Масса смеси', type: 'number', unit: 'кг' },
    { name: 'bagsCount', label: 'Количество мешков', type: 'number', unit: 'шт' },
    { name: 'priceEstimate', label: 'Примерная стоимость', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const wallArea = Number(inputs.wallArea);
    const layerThickness = Number(inputs.layerThickness);
    const materialType = String(inputs.materialType);
    const bagSize = Number(inputs.bagSize);
    
    if (!wallArea || !layerThickness) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Плотность материалов кг/м³
    const densities: Record<string, number> = {
      'cement': 1900,
      'gypsum': 1000,
      'lime': 1700,
      'polymer': 1400
    };
    
    const density = densities[materialType] || 1000;
    const thicknessM = layerThickness / 1000; // перевод в метры
    
    const volume = wallArea * thicknessM; // м³
    const weight = volume * density; // кг
    const bagsCount = Math.ceil(weight / bagSize);
    
    // Примерная стоимость (для гипсовой штукатурки ~400₽/мешок 30кг)
    const pricePerBag = materialType === 'gypsum' ? 450 : materialType === 'cement' ? 350 : 400;
    const priceEstimate = bagsCount * pricePerBag;
    
    return [
      { value: volume.toFixed(3), label: 'Объём штукатурки', unit: 'м³' },
      { value: weight.toFixed(1), label: 'Масса смеси', unit: 'кг' },
      { value: bagsCount.toString(), label: 'Количество мешков', unit: 'шт' },
      { value: priceEstimate.toFixed(0), label: 'Примерная стоимость', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите площадь стен, толщину слоя штукатурки, выберите тип материала и вес мешка. Калькулятор рассчитает необходимое количество.',
    about: 'Штукатурка применяется для выравнивания стен, создания декоративных покрытий и защиты поверхностей. Расход зависит от типа смеси и толщины слоя.',
    usage: 'Используется при ремонте для закупки материалов, расчёта бюджета и планирования работ.',
    formula: 'Объём = Площадь × Толщина. Масса = Объём × Плотность.',
    faq: [
      {
        question: 'Какую толщину слоя выбрать?',
        answer: 'Для выравнивания мелких неровностей — 5-10 мм, средних — 10-20 мм, крупных — до 50 мм (требуется армирование).'
      },
      {
        question: 'Какая штукатурка лучше для внутренних работ?',
        answer: 'Гипсовая — быстросохнущая, лёгкая, для сухих помещений. Цементная — для влажных помещений и наружных работ.'
      },
      {
        question: 'Сколько слоёв наносить?',
        answer: 'Обычно 2-3 слоя: базовый (черновой), выравнивающий, финишный. Каждый слой после полного высыхания предыдущего.'
      }
    ],
    sources: [
      { title: 'Штукатурка стен — Википедия', url: 'https://ru.wikipedia.org/wiki/Штукатурка' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '50 м², слой 10 мм', url: '/kalkulyator-shtukaturki?wallArea=50&layerThickness=10' },
    { value: '30 м², слой 20 мм', url: '/kalkulyator-shtukaturki?wallArea=30&layerThickness=20' }
  ]
};

// Калькулятор сыпучих материалов (песок, щебень)
export const bulkMaterialsCalculator: Calculator = {
  id: 'bulk-materials-calculator',
  slug: 'kalkulyator-sypuchih-materialov',
  title: 'Калькулятор сыпучих материалов',
  description: 'Расчёт объёма и массы песка, щебня, гравия, керамзита',
  category: 'stroitelstvo-i-remont',
  subcategory: 'stroitelnye-materialy',
  type: 'formula',
  inputs: [
    {
      name: 'materialType',
      label: 'Материал',
      type: 'select',
      options: [
        { value: 'sand_construction', label: 'Песок строительный (1600 кг/м³)' },
        { value: 'sand_river', label: 'Речной песок (1550 кг/м³)' },
        { value: 'crushed_stone', label: 'Щебень (1500 кг/м³)' },
        { value: 'gravel', label: 'Гравий (1400 кг/м³)' },
        { value: 'expanded_clay', label: 'Керамзит (400 кг/м³)' },
        { value: 'granite', label: 'Гранитный щебень (1470 кг/м³)' }
      ],
      defaultValue: 'sand_construction'
    },
    {
      name: 'calculationMode',
      label: 'Что рассчитать',
      type: 'select',
      options: [
        { value: 'volume_to_weight', label: 'Из объёма в массу' },
        { value: 'weight_to_volume', label: 'Из массы в объём' }
      ],
      defaultValue: 'volume_to_weight'
    },
    {
      name: 'volume',
      label: 'Объём',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      unit: 'м³'
    },
    {
      name: 'weight',
      label: 'Масса',
      type: 'number',
      placeholder: '15000',
      defaultValue: 15000,
      min: 0,
      unit: 'кг'
    },
    {
      name: 'truckVolume',
      label: 'Объём самосвала (для расчёта рейсов)',
      type: 'select',
      options: [
        { value: '0', label: 'Не учитывать' },
        { value: '10', label: '10 м³' },
        { value: '15', label: '15 м³' },
        { value: '20', label: '20 м³' },
        { value: '25', label: '25 м³' }
      ],
      defaultValue: '0'
    }
  ],
  outputs: [
    { name: 'resultWeight', label: 'Масса материала', type: 'number', unit: 'кг' },
    { name: 'resultVolume', label: 'Объём материала', type: 'number', unit: 'м³' },
    { name: 'tons', label: 'В тоннах', type: 'number', unit: 'т' },
    { name: 'truckTrips', label: 'Количество рейсов', type: 'number', unit: 'рейсов' }
  ],
  calculate: (inputs) => {
    const materialType = String(inputs.materialType);
    const calculationMode = String(inputs.calculationMode);
    const volume = Number(inputs.volume);
    const weight = Number(inputs.weight);
    const truckVolume = Number(inputs.truckVolume);
    
    // Плотности кг/м³
    const densities: Record<string, number> = {
      'sand_construction': 1600,
      'sand_river': 1550,
      'crushed_stone': 1500,
      'gravel': 1400,
      'expanded_clay': 400,
      'granite': 1470
    };
    
    const density = densities[materialType] || 1500;
    
    let resultWeight = 0;
    let resultVolume = 0;
    
    if (calculationMode === 'volume_to_weight') {
      if (!volume) {
        return [{ value: '—', label: 'Результат' }];
      }
      resultVolume = volume;
      resultWeight = volume * density;
    } else {
      if (!weight) {
        return [{ value: '—', label: 'Результат' }];
      }
      resultWeight = weight;
      resultVolume = weight / density;
    }
    
    const tons = resultWeight / 1000;
    const truckTrips = truckVolume > 0 ? Math.ceil(resultVolume / truckVolume) : 0;
    
    return [
      { value: resultWeight.toFixed(1), label: 'Масса материала', unit: 'кг' },
      { value: resultVolume.toFixed(3), label: 'Объём материала', unit: 'м³' },
      { value: tons.toFixed(2), label: 'В тоннах', unit: 'т' },
      { value: truckTrips > 0 ? truckTrips.toString() : '—', label: 'Количество рейсов', unit: 'рейсов' }
    ];
  },
  content: {
    howTo: 'Выберите материал, режим расчёта (из объёма в массу или наоборот), введите значение. При необходимости укажите объём самосвала для расчёта рейсов.',
    about: 'Сыпучие строительные материалы (песок, щебень, гравий, керамзит) продаются как навалом (в тоннах), так и в машинах (в м³). Калькулятор помогает перевести одни единицы в другие.',
    usage: 'Используется при закупке материалов для фундамента, отсыпки, засыпки, бетона.',
    formula: 'Масса = Объём × Плотность. Объём = Масса / Плотность.',
    faq: [
      {
        question: 'Сколько весит куб песка?',
        answer: 'В среднем 1500-1600 кг, но точный вес зависит от влажности и фракции.'
      },
      {
        question: 'Что такое керамзит?',
        answer: 'Лёгкий пористый материал из обожжённой глины. Плотность около 400 кг/м³, используется для утепления и как заполнитель для лёгкого бетона.'
      },
      {
        question: 'Какой щебень лучше для фундамента?',
        answer: 'Гранитный щебень фракции 20-40 мм — прочный, морозостойкий, обеспечивает лучшую несущую способность.'
      }
    ],
    sources: [
      { title: 'Сыпучие материалы — Википедия', url: 'https://ru.wikipedia.org/wiki/Нерудные_строительные_материалы' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Калькулятор стяжки пола
export const floorScreedCalculator: Calculator = {
  id: 'floor-screed-calculator',
  slug: 'kalkulyator-styazhki-pola',
  title: 'Калькулятор стяжки пола',
  description: 'Расчёт материалов для цементно-песчаной стяжки пола',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'floorArea',
      label: 'Площадь пола',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 1,
      unit: 'м²'
    },
    {
      name: 'screedThickness',
      label: 'Толщина стяжки',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 20,
      max: 200,
      unit: 'мм'
    },
    {
      name: 'cementGrade',
      label: 'Марка цемента',
      type: 'select',
      options: [
        { value: 'm400', label: 'М400 (обычная стяжка)' },
        { value: 'm500', label: 'М500 (прочная стяжка)' }
      ],
      defaultValue: 'm400'
    },
    {
      name: 'mixRatio',
      label: 'Пропорции смеси',
      type: 'select',
      options: [
        { value: '1_3', label: '1:3 (1 цемент : 3 песка) — стандарт' },
        { value: '1_4', label: '1:4 (1 цемент : 4 песка) — экономичная' }
      ],
      defaultValue: '1_3'
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём стяжки', type: 'number', unit: 'м³' },
    { name: 'cementWeight', label: 'Цемент', type: 'number', unit: 'кг' },
    { name: 'sandVolume', label: 'Песок', type: 'number', unit: 'м³' },
    { name: 'waterVolume', label: 'Вода', type: 'number', unit: 'л' },
    { name: 'cementBags', label: 'Мешков цемента (50 кг)', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const floorArea = Number(inputs.floorArea);
    const screedThickness = Number(inputs.screedThickness);
    const cementGrade = String(inputs.cementGrade);
    const mixRatio = String(inputs.mixRatio);
    
    if (!floorArea || !screedThickness) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const thicknessM = screedThickness / 1000;
    const volume = floorArea * thicknessM;
    
    // Плотность цементно-песчаной смеси ~2100 кг/м³
    const mixDensity = 2100;
    const totalWeight = volume * mixDensity;
    
    // Пропорции
    let cementRatio = 1;
    let sandRatio = 3;
    if (mixRatio === '1_4') {
      sandRatio = 4;
    }
    
    const totalParts = cementRatio + sandRatio;
    const cementWeight = (totalWeight * cementRatio) / totalParts;
    const sandWeight = (totalWeight * sandRatio) / totalParts;
    
    // Плотность песка ~1600 кг/м³
    const sandDensity = 1600;
    const sandVolume = sandWeight / sandDensity;
    
    // Вода: примерно 0.5 от веса цемента
    const waterVolume = cementWeight * 0.5;
    
    const cementBags = Math.ceil(cementWeight / 50);
    
    return [
      { value: volume.toFixed(3), label: 'Объём стяжки', unit: 'м³' },
      { value: cementWeight.toFixed(1), label: 'Цемент', unit: 'кг' },
      { value: sandVolume.toFixed(3), label: 'Песок', unit: 'м³' },
      { value: waterVolume.toFixed(1), label: 'Вода', unit: 'л' },
      { value: cementBags.toString(), label: 'Мешков цемента (50 кг)', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите площадь пола и толщину стяжки, выберите марку цемента и пропорции смеси. Калькулятор рассчитает необходимое количество материалов.',
    about: 'Цементно-песчаная стяжка (ЦПС) — традиционный способ выравнивания полов. Толщина обычно 40-70 мм для выравнивания, до 150 мм для создания уклона или скрытия коммуникаций.',
    usage: 'Используется при подготовке основания под ламинат, плитку, линолеум и другие напольные покрытия.',
    formula: 'Объём = Площадь × Толщина. Расход материалов по пропорциям смеси.',
    faq: [
      {
        question: 'Какая минимальная толщина стяжки?',
        answer: 'Минимальная толщина для прочности — 30-40 мм. Для армируемой стяжки — 50 мм.'
      },
      {
        question: 'Какое соотношение цемента и песка?',
        answer: 'Стандартное соотношение 1:3 (цемент:песок) для марки М150. Для прочной стяжки М200 — 1:2.'
      },
      {
        question: 'Сколько сохнет стяжка?',
        answer: 'Набор прочности — 24-48 часов. Полное высыхание — 1 см толщины за 1 неделю. Стяжка 5 см сохнет около месяца.'
      }
    ],
    sources: [
      { title: 'Стяжка пола — Википедия', url: 'https://ru.wikipedia.org/wiki/Стяжка_пола' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Калькулятор фундамента (объём бетона)
export const foundationCalculator: Calculator = {
  id: 'foundation-calculator',
  slug: 'kalkulyator-fundamenta',
  title: 'Калькулятор фундамента',
  description: 'Расчёт объёма бетона для ленточного или плитного фундамента',
  category: 'stroitelstvo-i-remont',
  subcategory: 'fundamenty',
  type: 'formula',
  inputs: [
    {
      name: 'foundationType',
      label: 'Тип фундамента',
      type: 'select',
      options: [
        { value: 'strip', label: 'Ленточный' },
        { value: 'slab', label: 'Плитный (монолитная плита)' },
        { value: 'column', label: 'Столбчатый' }
      ],
      defaultValue: 'strip'
    },
    {
      name: 'housePerimeter',
      label: 'Периметр дома (для ленточного)',
      type: 'number',
      placeholder: '40',
      defaultValue: 40,
      min: 1,
      unit: 'м'
    },
    {
      name: 'slabArea',
      label: 'Площадь плиты (для плитного)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 1,
      unit: 'м²'
    },
    {
      name: 'columnCount',
      label: 'Количество столбов (для столбчатого)',
      type: 'number',
      placeholder: '16',
      defaultValue: 16,
      min: 1,
      unit: 'шт'
    },
    {
      name: 'foundationWidth',
      label: 'Ширина фундамента/ленты',
      type: 'number',
      placeholder: '40',
      defaultValue: 40,
      min: 20,
      max: 100,
      unit: 'см'
    },
    {
      name: 'foundationDepth',
      label: 'Высота/толщина фундамента',
      type: 'number',
      placeholder: '60',
      defaultValue: 60,
      min: 30,
      max: 150,
      unit: 'см'
    }
  ],
  outputs: [
    { name: 'concreteVolume', label: 'Объём бетона', type: 'number', unit: 'м³' },
    { name: 'mixerTrips', label: 'Рейсов миксера (6 м³)', type: 'number', unit: 'рейсов' },
    { name: 'priceEstimate', label: 'Примерная стоимость бетона', type: 'number', unit: '₽' },
    { name: 'reinforcementEstimate', label: 'Арматура (приблизительно)', type: 'number', unit: 'кг' }
  ],
  calculate: (inputs) => {
    const foundationType = String(inputs.foundationType);
    const housePerimeter = Number(inputs.housePerimeter);
    const slabArea = Number(inputs.slabArea);
    const columnCount = Number(inputs.columnCount);
    const foundationWidth = Number(inputs.foundationWidth);
    const foundationDepth = Number(inputs.foundationDepth);
    
    const widthM = foundationWidth / 100;
    const depthM = foundationDepth / 100;
    
    let concreteVolume = 0;
    let reinforcementEstimate = 0;
    
    if (foundationType === 'strip') {
      // Ленточный: периметр × ширина × глубина
      if (!housePerimeter) {
        return [{ value: '—', label: 'Результат' }];
      }
      concreteVolume = housePerimeter * widthM * depthM;
      // Арматура: ~80 кг на м³
      reinforcementEstimate = concreteVolume * 80;
    } else if (foundationType === 'slab') {
      // Плитный: площадь × толщина
      if (!slabArea) {
        return [{ value: '—', label: 'Результат' }];
      }
      concreteVolume = slabArea * depthM;
      // Арматура: ~100 кг на м³
      reinforcementEstimate = concreteVolume * 100;
    } else if (foundationType === 'column') {
      // Столбчатый: количество × площадь сечения × высота
      if (!columnCount) {
        return [{ value: '—', label: 'Результат' }];
      }
      const columnSection = widthM * widthM; // квадратное сечение
      concreteVolume = columnCount * columnSection * depthM;
      // Арматура: ~50 кг на м³
      reinforcementEstimate = concreteVolume * 50;
    }
    
    const mixerTrips = Math.ceil(concreteVolume / 6); // миксер обычно 6 м³
    const priceEstimate = concreteVolume * 4500; // ~4500₽ за м³
    
    return [
      { value: concreteVolume.toFixed(2), label: 'Объём бетона', unit: 'м³' },
      { value: mixerTrips.toString(), label: 'Рейсов миксера (6 м³)', unit: 'рейсов' },
      { value: priceEstimate.toFixed(0), label: 'Примерная стоимость бетона', unit: '₽' },
      { value: reinforcementEstimate.toFixed(1), label: 'Арматура (приблизительно)', unit: 'кг' }
    ];
  },
  content: {
    howTo: 'Выберите тип фундамента, введите размеры (периметр, площадь или количество столбов), ширину и высоту. Калькулятор рассчитает объём бетона.',
    about: 'Фундамент — основа здания. Ленточный — для домов с подвалом, плитный — для тяжёлых зданий на слабых грунтах, столбчатый — для лёгких конструкций.',
    usage: 'Используется на этапе проектирования для закупки бетона и планирования строительства.',
    formula: 'Ленточный: Периметр × Ширина × Высота. Плитный: Площадь × Толщина. Столбчатый: Количество × Сечение × Высота.',
    faq: [
      {
        question: 'Какой фундамент выбрать?',
        answer: 'Ленточный — для кирпичных/блочных домов с подвалом. Плитный — для тяжёлых домов на слабых грунтах. Столбчатый — для бань, террас, лёгких домов.'
      },
      {
        question: 'Какую глубину заложения выбрать?',
        answer: 'Должна быть ниже глубины промерзания грунта в регионе (для Москвы — 1.4-1.6 м). Мелкозаглубленный — от 0.5 м для лёгких конструкций.'
      },
      {
        question: 'Какой марки бетон нужен?',
        answer: 'Для фундамента рекомендуется бетон М200-М300 (В15-В25). Для тяжёлых домов — М350 и выше.'
      }
    ],
    sources: [
      { title: 'Фундамент — Википедия', url: 'https://ru.wikipedia.org/wiki/Фундамент' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Калькулятор электрики (кабель, автоматы)
export const electricalCalculator: Calculator = {
  id: 'electrical-calculator',
  slug: 'kalkulyator-elektriki',
  title: 'Калькулятор электрики',
  description: 'Расчёт сечения кабеля и номинала автомата по мощности',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'power',
      label: 'Мощность нагрузки',
      type: 'number',
      placeholder: '5000',
      defaultValue: 5000,
      min: 100,
      unit: 'Вт'
    },
    {
      name: 'voltage',
      label: 'Напряжение',
      type: 'select',
      options: [
        { value: '220', label: '220В (однофазная сеть)' },
        { value: '380', label: '380В (трёхфазная сеть)' }
      ],
      defaultValue: '220'
    },
    {
      name: 'cableType',
      label: 'Тип кабеля',
      type: 'select',
      options: [
        { value: 'copper', label: 'Медный' },
        { value: 'aluminum', label: 'Алюминиевый' }
      ],
      defaultValue: 'copper'
    },
    {
      name: 'installationType',
      label: 'Способ прокладки',
      type: 'select',
      options: [
        { value: 'open', label: 'Открытая (воздух)' },
        { value: 'conduit', label: 'В трубе/канале' },
        { value: 'wall', label: 'В стене (штукатурка)' }
      ],
      defaultValue: 'conduit'
    }
  ],
  outputs: [
    { name: 'current', label: 'Ток нагрузки', type: 'number', unit: 'А' },
    { name: 'cableSection', label: 'Сечение кабеля', type: 'number', unit: 'мм²' },
    { name: 'breakerRating', label: 'Номинал автомата', type: 'number', unit: 'А' },
    { name: 'rcdRating', label: 'УЗО (если нужно)', type: 'text' }
  ],
  calculate: (inputs) => {
    const power = Number(inputs.power);
    const voltage = Number(inputs.voltage);
    const cableType = String(inputs.cableType);
    const installationType = String(inputs.installationType);
    
    if (!power) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Расчёт тока: I = P / (U × cosφ), где cosφ ≈ 0.95 для бытовых нагрузок
    // Для трёхфазной: I = P / (√3 × U × cosφ)
    let current = 0;
    if (voltage === 220) {
      current = power / (220 * 0.95);
    } else {
      current = power / (1.732 * 380 * 0.95);
    }
    
    // Расчёт сечения кабеля (упрощённо)
    // Медь: 10А на мм² для открытой проводки, 8А для закрытой
    // Алюминий: 8А на мм² для открытой, 6А для закрытой
    let ampacity = cableType === 'copper' ? 10 : 8;
    if (installationType !== 'open') {
      ampacity = cableType === 'copper' ? 8 : 6;
    }
    
    let cableSection = current / ampacity;
    // Округляем до стандартных сечений
    const standardSections = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];
    for (const section of standardSections) {
      if (cableSection <= section) {
        cableSection = section;
        break;
      }
    }
    
    // Номинал автомата (округляем до ближайшего стандартного)
    const standardBreakers = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];
    let breakerRating = current * 1.25; // Запас 25%
    for (const rating of standardBreakers) {
      if (breakerRating <= rating) {
        breakerRating = rating;
        break;
      }
    }
    
    // Рекомендация по УЗО
    let rcdRating = '';
    if (power <= 3000) {
      rcdRating = 'УЗО 25А, 30мА (тип А)';
    } else if (power <= 5000) {
      rcdRating = 'УЗО 40А, 30мА (тип А)';
    } else {
      rcdRating = 'УЗО 63А, 30мА (тип А)';
    }
    
    return [
      { value: current.toFixed(1), label: 'Ток нагрузки', unit: 'А' },
      { value: cableSection.toString(), label: 'Сечение кабеля', unit: 'мм²' },
      { value: breakerRating.toString(), label: 'Номинал автомата', unit: 'А' },
      { value: rcdRating, label: 'УЗО (если нужно)', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите мощность электроприборов, выберите напряжение, тип кабеля и способ прокладки. Калькулятор рассчитает ток, сечение кабеля и номинал автомата.',
    about: 'Правильный расчёт электропроводки — залог безопасности. Недостаточное сечение кабеля может привести к перегреву и пожару.',
    usage: 'Используется при проектировании электропроводки, выборе кабеля для новых линий, расчёта автоматов защиты.',
    formula: 'Ток I = P / (U × cosφ). Сечение кабеля по таблицам допустимой нагрузки.',
    faq: [
      {
        question: 'Какое сечение нужно для розеток?',
        answer: 'Для обычных розеток (до 16А) — медный кабель 2.5 мм². Для мощной техники (варочные панели, духовки) — 4-6 мм².'
      },
      {
        question: 'Что лучше — медь или алюминий?',
        answer: 'Медь предпочтительнее: лучшая проводимость, меньше окисляется, гибче. Алюминий дешевле, но требует большего сечения.'
      },
      {
        question: 'Нужно ли УЗО?',
        answer: 'Да, УЗО (устройство защитного отключения) обязательно для влажных помещений (ванная, кухня) и внешней проводки.'
      }
    ],
    sources: [
      { title: 'Правила устройства электроустановок (ПУЭ)', url: 'https://ru.wikipedia.org/wiki/Правила_устройства_электроустановок' }
    ],
    updatedAt: '2026-04-27'
  }
};

export const additionalConstructionCalculators: Calculator[] = [
  plasterCalculator,
  bulkMaterialsCalculator,
  floorScreedCalculator,
  foundationCalculator,
  electricalCalculator
];
