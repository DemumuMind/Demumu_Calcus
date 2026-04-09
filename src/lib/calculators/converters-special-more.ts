import { Calculator } from '../types';

// 1. Конвертер кулинарных мер
export const cookingMeasuresConverter: Calculator = {
  id: 'cooking-measures-converter',
  slug: 'konverter-kulinarnyh-mer',
  title: 'Конвертер кулинарных мер',
  description: 'Перевод между чашками, ложками, миллилитрами и жидкими унциями для разных систем мер',
  category: 'konvertery',
  subcategory: 'special',
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
      label: 'Из единицы',
      type: 'select',
      options: [
        { value: 'cup_us', label: 'Чашка (США, 240 мл)' },
        { value: 'cup_uk', label: 'Чашка (Великобритания, 284 мл)' },
        { value: 'cup_metric', label: 'Чашка (метрическая, 250 мл)' },
        { value: 'tbsp', label: 'Столовая ложка (15 мл)' },
        { value: 'tsp', label: 'Чайная ложка (5 мл)' },
        { value: 'ml', label: 'Миллилитры (мл)' },
        { value: 'l', label: 'Литры (л)' },
        { value: 'fl_oz_us', label: 'Жидкая унция (США, 29.57 мл)' },
        { value: 'fl_oz_uk', label: 'Жидкая унция (Великобритания, 28.41 мл)' }
      ],
      defaultValue: 'cup_us'
    }
  ],
  outputs: [
    { name: 'ml', label: 'Миллилитры', type: 'text' },
    { name: 'l', label: 'Литры', type: 'text' },
    { name: 'cup_us', label: 'Чашки (США)', type: 'text' },
    { name: 'tbsp', label: 'Столовые ложки', type: 'text' },
    { name: 'tsp', label: 'Чайные ложки', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);

    if (!value) return [
      { value: '—', label: 'Миллилитры' },
      { value: '—', label: 'Литры' },
      { value: '—', label: 'Чашки (США)' },
      { value: '—', label: 'Столовые ложки' },
      { value: '—', label: 'Чайные ложки' }
    ];

    // Convert to ml first
    let ml = 0;
    switch (from) {
      case 'cup_us': ml = value * 240; break;
      case 'cup_uk': ml = value * 284; break;
      case 'cup_metric': ml = value * 250; break;
      case 'tbsp': ml = value * 15; break;
      case 'tsp': ml = value * 5; break;
      case 'ml': ml = value; break;
      case 'l': ml = value * 1000; break;
      case 'fl_oz_us': ml = value * 29.57; break;
      case 'fl_oz_uk': ml = value * 28.41; break;
    }

    return [
      { value: `${Math.round(ml)} мл`, label: 'Миллилитры' },
      { value: `${Math.round(ml / 10) / 100} л`, label: 'Литры' },
      { value: `${Math.round(ml / 240 * 100) / 100} чашек`, label: 'Чашки (США)' },
      { value: `${Math.round(ml / 15 * 100) / 100} ст. ложек`, label: 'Столовые ложки' },
      { value: `${Math.round(ml / 5 * 100) / 100} чайн. ложек`, label: 'Чайные ложки' }
    ];
  },
  content: {
    howTo: 'Введите количество и выберите единицу измерения. Конвертер покажет эквиваленты в других кулинарных мерах.',
    about: 'Конвертер кулинарных мер помогает переводить между различными объёмными единицами, используемыми в кулинарии. Учитывает различия между американской, британской и метрической системами.',
    formula: '1 чашка (США) = 240 мл, 1 чашка (UK) = 284 мл, 1 ст. ложка = 15 мл, 1 чайн. ложка = 5 мл',
    faq: [
      { question: 'Почему размеры чашек различаются?', answer: 'В США стандартная мерная чашка составляет 240 мл, в Великобритании — 284 мл, а метрическая чашка — 250 мл.' },
      { question: 'Что такое жидкая унция?', answer: 'Жидкая унция — единица объёма жидкости. В США 1 fl oz = 29.57 мл, в Великобритании — 28.41 мл.' },
      { question: 'Сколько столовых ложек в чашке?', answer: 'В американской чашке (240 мл) содержится 16 столовых ложек.' }
    ],
    sources: [
      { title: 'Кулинарные меры', url: 'https://ru.wikipedia.org/wiki/Кулинарные_меры' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 2. Конвертер толщины пряжи
export const yarnThicknessConverter: Calculator = {
  id: 'yarn-thickness-converter',
  slug: 'konverter-tolshiny-pryazhi',
  title: 'Конвертер толщины пряжи',
  description: 'Перевод между системами Nm, Tex, Denier, WPI и категориями толщины пряжи',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'from',
      label: 'Из системы',
      type: 'select',
      options: [
        { value: 'tex', label: 'Tex (г/км)' },
        { value: 'dtex', label: 'Decitex (дтекс, 0.1 г/км)' },
        { value: 'den', label: 'Denier (ден, г/9 км)' },
        { value: 'nm', label: 'Metric Nm (м/г)' },
        { value: 'wpi', label: 'WPI (оборотов на дюйм)' }
      ],
      defaultValue: 'tex'
    }
  ],
  outputs: [
    { name: 'tex', label: 'Tex (г/км)', type: 'text' },
    { name: 'denier', label: 'Denier (ден)', type: 'text' },
    { name: 'nm', label: 'Metric Nm', type: 'text' },
    { name: 'wpi', label: 'WPI (об/дюйм)', type: 'text' },
    { name: 'category', label: 'Категория пряжи', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);

    if (!value) return [
      { value: '—', label: 'Tex (г/км)' },
      { value: '—', label: 'Denier (ден)' },
      { value: '—', label: 'Metric Nm' },
      { value: '—', label: 'WPI (об/дюйм)' },
      { value: '—', label: 'Категория пряжи' }
    ];

    // Convert to Tex first
    let tex = 0;
    switch (from) {
      case 'tex': tex = value; break;
      case 'dtex': tex = value / 10; break;
      case 'den': tex = value / 9; break;
      case 'nm': tex = 1000 / value; break;
      case 'wpi': tex = 3500 / (value * value); break; // Approximate conversion
    }

    const denier = tex * 9;
    const nm = 1000 / tex;
    const wpi = Math.sqrt(3500 / tex);

    // Determine yarn category
    let category = '';
    if (tex < 30) category = 'Кружевная / Cobweb (0-2)';
    else if (tex < 60) category = 'Супертонкая / Fingering (1-3)';
    else if (tex < 85) category = 'Спортивная / Sport (2-5)';
    else if (tex < 120) category = 'Полувесовая / DK (3-7)';
    else if (tex < 200) category = 'Весовая / Worsted-Aran (4-9)';
    else if (tex < 400) category = 'Толстая / Bulky (5-12)';
    else category = 'Супертолстая / Super Bulky (6-15)';

    return [
      { value: `${Math.round(tex * 10) / 10}`, label: 'Tex (г/км)' },
      { value: `${Math.round(denier)}`, label: 'Denier (ден)' },
      { value: `${Math.round(nm * 10) / 10}`, label: 'Metric Nm' },
      { value: `${Math.round(wpi * 10) / 10}`, label: 'WPI (об/дюйм)' },
      { value: category, label: 'Категория пряжи' }
    ];
  },
  content: {
    howTo: 'Введите значение толщины пряжи и выберите систему измерения. Конвертер покажет эквиваленты во всех системах и категорию пряжи.',
    about: 'Конвертер толщины пряжи переводит между различными системами обозначения толщины нитей (Tex, Denier, Nm, WPI) и определяет категорию пряжи по международной стандартной системе вязания.',
    formula: 'Denier = Tex × 9, Nm = 1000 / Tex. WPI (Wraps Per Inch) — количество оборотов пряжи на дюйм при намотке.',
    faq: [
      { question: 'Что такое Tex?', answer: 'Tex — международная единица линейной плотности нитей, равная массе в граммах на 1000 метров нити.' },
      { question: 'Что такое WPI?', answer: 'WPI (Wraps Per Inch) — метод измерения толщины пряжи путём намотки на линейку и подсчёта оборотов на дюйм.' },
      { question: 'Какая пряжа подходит для начинающих?', answer: 'Для начинающих рекомендуется пряжа категории Worsted (весовая, 100-200 tex) — она хорошо видна и не слишком тонкая.' }
    ],
    sources: [
      { title: 'Системы обозначения пряжи', url: 'https://en.wikipedia.org/wiki/Yarn_weight' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 3. Конвертер плотности бумаги
export const paperDensityConverter: Calculator = {
  id: 'paper-density-converter',
  slug: 'konverter-plotnosti-bumagi',
  title: 'Конвертер плотности бумаги',
  description: 'Перевод между gsm, пунктами (pt), миллиметрами толщины и фунтами (lb)',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '80',
      defaultValue: 80
    },
    {
      name: 'from',
      label: 'Из единицы',
      type: 'select',
      options: [
        { value: 'gsm', label: 'GSM (г/м²)' },
        { value: 'pt', label: 'Пункты (pt, 1/1000 дюйма)' },
        { value: 'mm', label: 'Миллиметры толщины' },
        { value: 'lb_text', label: 'Фунты (текстовая бумага)' },
        { value: 'lb_cover', label: 'Фунты (обложечная бумага)' },
        { value: 'lb_bond', label: 'Фунты (канцелярская)' }
      ],
      defaultValue: 'gsm'
    },
    {
      name: 'paperType',
      label: 'Тип бумаги',
      type: 'select',
      options: [
        { value: 'standard', label: 'Стандартная (0.08 мм при 80 gsm)' },
        { value: 'coated', label: 'Мелованная (0.06 мм при 80 gsm)' },
        { value: 'cardstock', label: 'Картон (0.10 мм при 80 gsm)' }
      ],
      defaultValue: 'standard'
    }
  ],
  outputs: [
    { name: 'gsm', label: 'GSM (г/м²)', type: 'text' },
    { name: 'pt', label: 'Пункты (pt)', type: 'text' },
    { name: 'mm', label: 'Миллиметры', type: 'text' },
    { name: 'lb_bond', label: 'Фунты (канцелярская)', type: 'text' },
    { name: 'caliper', label: 'Калипер (мкм)', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const paperType = String(inputs.paperType);

    if (!value) return [
      { value: '—', label: 'GSM (г/м²)' },
      { value: '—', label: 'Пункты (pt)' },
      { value: '—', label: 'Миллиметры' },
      { value: '—', label: 'Фунты (канцелярская)' },
      { value: '—', label: 'Калипер (мкм)' }
    ];

    // Thickness factor based on paper type (mm per gsm)
    const thicknessFactor = paperType === 'standard' ? 0.001 : paperType === 'coated' ? 0.00075 : 0.00125;

    // Convert to GSM first
    let gsm = 0;
    switch (from) {
      case 'gsm': gsm = value; break;
      case 'pt': gsm = value * 1.5; break; // Approximate
      case 'mm': gsm = value / thicknessFactor; break;
      case 'lb_text': gsm = value * 1.48; break;
      case 'lb_cover': gsm = value * 2.7; break;
      case 'lb_bond': gsm = value * 3.76; break;
    }

    const pt = gsm / 1.5;
    const mm = gsm * thicknessFactor;
    const lbBond = gsm / 3.76;
    const caliper = mm * 1000; // Convert to micrometers

    return [
      { value: `${Math.round(gsm)} г/м²`, label: 'GSM (г/м²)' },
      { value: `${Math.round(pt * 10) / 10} pt`, label: 'Пункты (pt)' },
      { value: `${Math.round(mm * 100) / 100} мм`, label: 'Миллиметры' },
      { value: `${Math.round(lbBond * 10) / 10} lb`, label: 'Фунты (канцелярская)' },
      { value: `${Math.round(caliper)} мкм`, label: 'Калипер (мкм)' }
    ];
  },
  content: {
    howTo: 'Введите значение плотности или толщины бумаги и выберите единицу измерения. Выберите тип бумаги для более точного расчёта толщины.',
    about: 'Конвертер плотности бумаги переводит между различными системами обозначения: граммаж (gsm), пункты (типографские), толщина в мм и американская система фунтов (lb).',
    formula: 'GSM — граммы на квадратный метр. 1 pt = 0.0254 мм. Фунты зависят от базового размера бумаги для разных категорий.',
    faq: [
      { question: 'Что такое GSM?', answer: 'GSM (Grams per Square Meter) — граммаж бумаги, масса одного квадратного метра в граммах. Стандартная офисная бумага — 80 gsm.' },
      { question: 'Что такое пункты (pt) в бумаге?', answer: 'Пункт (pt) — единица толщины, равная 1/1000 дюйма (0.0254 мм). Используется для обозначения плотности картона и обложек.' },
      { question: 'Почему фунты различаются для разных типов бумаги?', answer: 'Американская система фунтов основана на разном базовом размере листа для текстовой бумаги (25×38"), обложечной (20×26") и канцелярской (17×22").' }
    ],
    sources: [
      { title: 'Плотность бумаги', url: 'https://en.wikipedia.org/wiki/Grammage' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 4. Конвертер размеров шин
export const tireSizeConverter: Calculator = {
  id: 'tire-size-converter',
  slug: 'konverter-razmerov-shin',
  title: 'Конвертер размеров шин',
  description: 'Перевод между метрической и дюймовой системами обозначения шин, расчёт диаметра',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'width',
      label: 'Ширина шины (мм)',
      type: 'number',
      placeholder: '205',
      defaultValue: 205
    },
    {
      name: 'aspect',
      label: 'Профиль (высота/ширина %)',
      type: 'number',
      placeholder: '55',
      defaultValue: 55
    },
    {
      name: 'rim',
      label: 'Диаметр диска (дюймы)',
      type: 'number',
      placeholder: '16',
      defaultValue: 16
    }
  ],
  outputs: [
    { name: 'metricSize', label: 'Метрический размер', type: 'text' },
    { name: 'diameter', label: 'Диаметр шины (мм)', type: 'text' },
    { name: 'diameterInch', label: 'Диаметр шины (дюймы)', type: 'text' },
    { name: 'sidewall', label: 'Высота боковины (мм)', type: 'text' },
    { name: 'circumference', label: 'Окружность (мм)', type: 'text' }
  ],
  calculate: (inputs) => {
    const width = Number(inputs.width);
    const aspect = Number(inputs.aspect);
    const rim = Number(inputs.rim);

    if (!width || !aspect || !rim) return [
      { value: '—', label: 'Метрический размер' },
      { value: '—', label: 'Диаметр шины (мм)' },
      { value: '—', label: 'Диаметр шины (дюймы)' },
      { value: '—', label: 'Высота боковины (мм)' },
      { value: '—', label: 'Окружность (мм)' }
    ];

    const sidewallHeight = (width * aspect) / 100;
    const rimMm = rim * 25.4;
    const diameter = rimMm + (2 * sidewallHeight);
    const diameterInch = diameter / 25.4;
    const circumference = Math.PI * diameter;

    return [
      { value: `${width}/${aspect}R${rim}`, label: 'Метрический размер' },
      { value: `${Math.round(diameter)} мм`, label: 'Диаметр шины (мм)' },
      { value: `${Math.round(diameterInch * 10) / 10}"`, label: 'Диаметр шины (дюймы)' },
      { value: `${Math.round(sidewallHeight)} мм`, label: 'Высота боковины (мм)' },
      { value: `${Math.round(circumference)} мм`, label: 'Окружность (мм)' }
    ];
  },
  content: {
    howTo: 'Введите ширину шины в мм, профиль (в процентах от ширины) и диаметр диска в дюймах. Калькулятор рассчитает полный диаметр шины и другие параметры.',
    about: 'Конвертер размеров шин переводит между метрической системой (205/55R16) и рассчитывает реальный диаметр, окружность и высоту боковины. Важно при подборе зимней/летней резины и проверке совместимости.',
    formula: 'Высота боковины = Ширина × (Профиль/100). Диаметр шины = Диаметр диска×25.4 + 2×Высота боковины. Окружность = π × Диаметр.',
    faq: [
      { question: 'Что означает 205/55R16?', answer: '205 — ширина шины в мм, 55 — высота профиля в % от ширины, R — радиальная конструкция, 16 — диаметр диска в дюймах.' },
      { question: 'Можно ли ставить шины другого размера?', answer: 'Отклонение диаметра более 3% влияет на показания спидометра и может приводить к проблемам с подвеской. Рекомендуется сохранять диаметр в пределах ±2%.' },
      { question: 'Что такое профиль шины?', answer: 'Профиль — отношение высоты боковины к ширине шины в процентах. Низкопрофильные шины (30-40%) обеспечивают лучшую управляемость, но менее комфортны.' }
    ],
    sources: [
      { title: 'Маркировка шин', url: 'https://ru.wikipedia.org/wiki/Автомобильная_шина#Маркировка' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 5. Конвертер размеров колец
export const ringSizeConverter: Calculator = {
  id: 'ring-size-converter',
  slug: 'konverter-razmerov-kolec',
  title: 'Конвертер размеров колец',
  description: 'Перевод между системами размеров колец США, Великобритании, ЕС, Японии и Швейцарии',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'size',
      label: 'Размер',
      type: 'number',
      placeholder: '7',
      defaultValue: 7
    },
    {
      name: 'system',
      label: 'Система',
      type: 'select',
      options: [
        { value: 'us', label: 'США / Канада' },
        { value: 'uk', label: 'Великобритания / Австралия / Новая Зеландия' },
        { value: 'eu', label: 'Европа (обхват в мм)' },
        { value: 'jp', label: 'Япония / Китай' },
        { value: 'ch', label: 'Швейцария' }
      ],
      defaultValue: 'us'
    }
  ],
  outputs: [
    { name: 'us', label: 'США / Канада', type: 'text' },
    { name: 'uk', label: 'Великобритания / AU / NZ', type: 'text' },
    { name: 'eu', label: 'Европа (мм)', type: 'text' },
    { name: 'jp', label: 'Япония / Китай', type: 'text' },
    { name: 'ch', label: 'Швейцария', type: 'text' },
    { name: 'circumference', label: 'Окружность (мм)', type: 'text' },
    { name: 'diameter', label: 'Диаметр (мм)', type: 'text' }
  ],
  calculate: (inputs) => {
    const size = Number(inputs.size);
    const system = String(inputs.system);

    if (!size) return [
      { value: '—', label: 'США / Канада' },
      { value: '—', label: 'Великобритания / AU / NZ' },
      { value: '—', label: 'Европа (мм)' },
      { value: '—', label: 'Япония / Китай' },
      { value: '—', label: 'Швейцария' },
      { value: '—', label: 'Окружность (мм)' },
      { value: '—', label: 'Диаметр (мм)' }
    ];

    // Convert to EU circumference in mm first
    let euMm = 0;
    switch (system) {
      case 'us': euMm = 11.63 + size * 2.55; break;
      case 'uk': euMm = 37.5 + size * 2.55; break; // Approximate
      case 'eu': euMm = size; break;
      case 'jp': euMm = size + 39; break;
      case 'ch': euMm = size * 2.55 + 11.63; break; // Similar to US
    }

    // Calculate all sizes
    const usSize = Math.round((euMm - 11.63) / 2.55 * 2) / 2;
    const ukSize = Math.round((euMm - 37.5) / 2.55 * 2) / 2;
    const jpSize = Math.round((euMm - 39) * 2) / 2;
    const chSize = Math.round((euMm - 11.63) / 2.55 * 2) / 2;
    const diameter = euMm / Math.PI;

    return [
      { value: `${usSize}`, label: 'США / Канада' },
      { value: `${ukSize}`, label: 'Великобритания / AU / NZ' },
      { value: `${Math.round(euMm)} мм`, label: 'Европа (мм)' },
      { value: `${jpSize}`, label: 'Япония / Китай' },
      { value: `${chSize}`, label: 'Швейцария' },
      { value: `${Math.round(euMm)} мм`, label: 'Окружность (мм)' },
      { value: `${Math.round(diameter * 10) / 10} мм`, label: 'Диаметр (мм)' }
    ];
  },
  content: {
    howTo: 'Введите размер кольца и выберите систему измерения. Конвертер покажет соответствующие размеры в других системах, а также фактический диаметр и окружность.',
    about: 'Конвертер размеров колец переводит между различными международными системами обозначения. Стандартные системы: США (цифры), Великобритания (буквы), Европа (обхват в мм), Япония (цифровая шкала).',
    formula: 'Европейский размер = внутренний обхват кольца в мм. Диаметр = Окружность / π. США: размер = (обхват - 11.63) / 2.55.',
    faq: [
      { question: 'Как измерить размер кольца?', answer: 'Оберните тонкую полоску бумаги вокруг пальца, отметьте где она перекрывается, измерьте длину линейкой — это окружность в мм (европейская система).' },
      { question: 'Какой самый распространённый размер кольца?', answer: 'Для женщин — 16-18 мм (обхват), для мужчин — 20-22 мм. В американской системе это соответственно 6-8 и 10-12.' },
      { question: 'Можно ли изменить размер кольца?', answer: 'Большинство колец можно увеличить или уменьшить на 1-2 размера у ювелира, но кольца с камнями по всему ободку изменить сложно.' }
    ],
    sources: [
      { title: 'Размеры колец', url: 'https://en.wikipedia.org/wiki/Ring_size' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 6. Конвертер размеров одежды по странам
export const clothingSizesConverter: Calculator = {
  id: 'clothing-sizes-converter',
  slug: 'konverter-razmerov-odezhdy',
  title: 'Конвертер размеров одежды',
  description: 'Перевод размеров XS-XXL между США, Великобританией, ЕС, Россией, Японией и Китаем',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'size',
      label: 'Размер',
      type: 'select',
      options: [
        { value: 'xs', label: 'XS (экстра малый)' },
        { value: 's', label: 'S (малый)' },
        { value: 'm', label: 'M (средний)' },
        { value: 'l', label: 'L (большой)' },
        { value: 'xl', label: 'XL (экстра большой)' },
        { value: 'xxl', label: 'XXL (двойной экстра большой)' }
      ],
      defaultValue: 'm'
    },
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'women', label: 'Женский' },
        { value: 'men', label: 'Мужской' }
      ],
      defaultValue: 'women'
    }
  ],
  outputs: [
    { name: 'us', label: 'США', type: 'text' },
    { name: 'uk', label: 'Великобритания', type: 'text' },
    { name: 'eu', label: 'Европа (EU)', type: 'text' },
    { name: 'ru', label: 'Россия', type: 'text' },
    { name: 'jp', label: 'Япония', type: 'text' },
    { name: 'cn', label: 'Китай', type: 'text' }
  ],
  calculate: (inputs) => {
    const size = String(inputs.size);
    const gender = String(inputs.gender);

    const sizeMap: Record<string, Record<string, Record<string, string>>> = {
      women: {
        xs: { us: '0-2', uk: '4-6', eu: '32-34', ru: '40-42', jp: '5-7', cn: '155/80A' },
        s: { us: '4-6', uk: '8-10', eu: '36-38', ru: '44-46', jp: '7-9', cn: '160/84A' },
        m: { us: '8-10', uk: '12-14', eu: '40-42', ru: '48-50', jp: '9-11', cn: '165/88A' },
        l: { us: '12-14', uk: '16-18', eu: '44-46', ru: '52-54', jp: '11-13', cn: '170/92A' },
        xl: { us: '16-18', uk: '20-22', eu: '48-50', ru: '56-58', jp: '13-15', cn: '175/96A' },
        xxl: { us: '20-22', uk: '24-26', eu: '52-54', ru: '60-62', jp: '15-17', cn: '180/100A' }
      },
      men: {
        xs: { us: '30-32', uk: '30-32', eu: '40-42', ru: '44-46', jp: '32-34', cn: '160/80A' },
        s: { us: '34-36', uk: '34-36', eu: '44-46', ru: '48-50', jp: '36-38', cn: '165/84A' },
        m: { us: '38-40', uk: '38-40', eu: '48-50', ru: '52-54', jp: '40-42', cn: '170/92A' },
        l: { us: '42-44', uk: '42-44', eu: '52-54', ru: '56-58', jp: '44-46', cn: '175/96A' },
        xl: { us: '46-48', uk: '46-48', eu: '56-58', ru: '60-62', jp: '48-50', cn: '180/100A' },
        xxl: { us: '50-52', uk: '50-52', eu: '60-62', ru: '64-66', jp: '52-54', cn: '185/104A' }
      }
    };

    const sizes = sizeMap[gender][size];

    return [
      { value: sizes.us, label: 'США' },
      { value: sizes.uk, label: 'Великобритания' },
      { value: sizes.eu, label: 'Европа (EU)' },
      { value: sizes.ru, label: 'Россия' },
      { value: sizes.jp, label: 'Япония' },
      { value: sizes.cn, label: 'Китай' }
    ];
  },
  content: {
    howTo: 'Выберите размер одежды (XS-XXL) и пол. Конвертер покажет соответствующие размеры в разных странах.',
    about: 'Конвертер размеров одежды переводит между международными системами размеров. Учитывает различия между женской и мужской одеждой.',
    formula: 'Размеры основаны на стандартных таблицах соответствия между национальными системами.',
    faq: [
      { question: 'Почему размеры различаются в разных странах?', answer: 'Разные страны используют разные стандарты измерений и типовые фигуры. Также существуют "vanity sizing" — маркировка меньшего размера для психологического комфорта покупателей.' },
      { question: 'Как выбрать правильный размер при покупке онлайн?', answer: 'Сверьтесь с таблицей размеров конкретного бренда, измерьте свои параметры (обхват груди, талии, бёдер) и сравните.' },
      { question: 'Что означают буквы в китайских размерах?', answer: 'A, B, C обозначают тип фигуры от стандартной (A) до полной (C). 160, 165, 170 — рост в сантиметрах.' }
    ],
    sources: [
      { title: 'Размеры одежды', url: 'https://en.wikipedia.org/wiki/Clothing_sizes' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 7. Конвертер размеров обуви
export const shoeSizeConverter: Calculator = {
  id: 'shoe-size-converter',
  slug: 'konverter-razmerov-obuvi',
  title: 'Конвертер размеров обуви',
  description: 'Перевод между системами размеров обуви США, Великобритании, ЕС, России, Японии, Китая и длиной стопы',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'size',
      label: 'Размер',
      type: 'number',
      placeholder: '40',
      defaultValue: 40
    },
    {
      name: 'system',
      label: 'Система',
      type: 'select',
      options: [
        { value: 'eu', label: 'Европа (EU)' },
        { value: 'us_m', label: 'США (мужские)' },
        { value: 'us_w', label: 'США (женские)' },
        { value: 'uk_m', label: 'Великобритания (мужские)' },
        { value: 'uk_w', label: 'Великобритания (женские)' },
        { value: 'ru', label: 'Россия (СССР)' },
        { value: 'jp', label: 'Япония (мм)' },
        { value: 'cn', label: 'Китай (мм)' },
        { value: 'cm', label: 'Длина стопы (см)' },
        { value: 'inch', label: 'Длина стопы (дюймы)' }
      ],
      defaultValue: 'eu'
    }
  ],
  outputs: [
    { name: 'eu', label: 'Европа (EU)', type: 'text' },
    { name: 'us_m', label: 'США (мужские)', type: 'text' },
    { name: 'us_w', label: 'США (женские)', type: 'text' },
    { name: 'uk_m', label: 'Великобритания (мужские)', type: 'text' },
    { name: 'uk_w', label: 'Великобритания (женские)', type: 'text' },
    { name: 'ru', label: 'Россия', type: 'text' },
    { name: 'jp', label: 'Япония (мм)', type: 'text' },
    { name: 'cm', label: 'Длина стопы (см)', type: 'text' }
  ],
  calculate: (inputs) => {
    const size = Number(inputs.size);
    const system = String(inputs.system);

    if (!size) return [
      { value: '—', label: 'Европа (EU)' },
      { value: '—', label: 'США (мужские)' },
      { value: '—', label: 'США (женские)' },
      { value: '—', label: 'Великобритания (мужские)' },
      { value: '—', label: 'Великобритания (женские)' },
      { value: '—', label: 'Россия' },
      { value: '—', label: 'Япония (мм)' },
      { value: '—', label: 'Длина стопы (см)' }
    ];

    // Convert to cm (length of foot) first
    let cm = 0;
    switch (system) {
      case 'eu': cm = (size + 1.5) * 2 / 3; break; // Paris point system
      case 'us_m': cm = (size + 24) * 2 / 3; break;
      case 'us_w': cm = (size + 23) * 2 / 3; break;
      case 'uk_m': cm = (size + 25) * 2 / 3; break;
      case 'uk_w': cm = (size + 23.5) * 2 / 3; break;
      case 'ru': cm = (size + 1.5) * 2 / 3; break; // Same as EU
      case 'jp': cm = size / 10; break;
      case 'cn': cm = size / 10; break;
      case 'cm': cm = size; break;
      case 'inch': cm = size * 2.54; break;
    }

    const mm = Math.round(cm * 10);

    // Calculate all sizes
    const eu = Math.round((3 * cm / 2 - 1.5) * 2) / 2;
    const usM = Math.round((3 * cm / 2 - 24) * 2) / 2;
    const usW = Math.round((3 * cm / 2 - 23) * 2) / 2;
    const ukM = Math.round((3 * cm / 2 - 25) * 2) / 2;
    const ukW = Math.round((3 * cm / 2 - 23.5) * 2) / 2;
    const ru = eu; // Same as EU

    return [
      { value: `${eu}`, label: 'Европа (EU)' },
      { value: `${usM}`, label: 'США (мужские)' },
      { value: `${usW}`, label: 'США (женские)' },
      { value: `${ukM}`, label: 'Великобритания (мужские)' },
      { value: `${ukW}`, label: 'Великобритания (женские)' },
      { value: `${ru}`, label: 'Россия' },
      { value: `${mm} мм`, label: 'Япония (мм)' },
      { value: `${Math.round(cm * 10) / 10} см`, label: 'Длина стопы (см)' }
    ];
  },
  content: {
    howTo: 'Введите размер обуви и выберите систему измерения. Конвертер покажет соответствующие размеры в других системах и длину стопы.',
    about: 'Конвертер размеров обуви переводит между международными системами. Европейская система основана на "парижском пункте" (2/3 см), американская и британская — на дюймах.',
    formula: 'Европа: размер = 3/2 × длина (см) - 1.5. США мужские: размер = 3/2 × длина (см) - 24. Япония: размер = длина в мм.',
    faq: [
      { question: 'Как правильно измерить длину стопы?', answer: 'Поставьте ногу на лист бумаги, обведите карандашом, держа его вертикально, и измерьте расстояние от края большого пальца до пятки. Измеряйте вечером, когда нога немного отёкшая.' },
      { question: 'Почему мужские и женские размеры различаются?', answer: 'В США и Великобритании используются разные шкалы для мужчин и женщин. Например, женский US 8 = мужской US 6.5.' },
      { question: 'Какой запас оставлять при выборе размера?', answer: 'Между концом большого пальца и носком обуви должно быть около 1-1.5 см свободного пространства для носка и движения пальцев.' }
    ],
    sources: [
      { title: 'Размеры обуви', url: 'https://en.wikipedia.org/wiki/Shoe_size' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 8. Конвертер калибра провода
export const wireGaugeConverter: Calculator = {
  id: 'wire-gauge-converter',
  slug: 'konverter-kalibra-provoda',
  title: 'Конвертер калибра провода',
  description: 'Перевод между AWG, SWG, BWG и диаметром в мм и дюймах, расчёт площади сечения',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'gauge',
      label: 'Калибр (номер)',
      type: 'number',
      placeholder: '14',
      defaultValue: 14
    },
    {
      name: 'system',
      label: 'Система',
      type: 'select',
      options: [
        { value: 'awg', label: 'AWG (American Wire Gauge)' },
        { value: 'swg', label: 'SWG (British Standard Wire Gauge)' },
        { value: 'bwg', label: 'BWG (Birmingham Wire Gauge)' }
      ],
      defaultValue: 'awg'
    }
  ],
  outputs: [
    { name: 'awg', label: 'AWG', type: 'text' },
    { name: 'mm', label: 'Диаметр (мм)', type: 'text' },
    { name: 'inch', label: 'Диаметр (дюймы)', type: 'text' },
    { name: 'areaMm2', label: 'Площадь сечения (мм²)', type: 'text' },
    { name: 'areaCircularMil', label: 'Площадь (circular mils)', type: 'text' }
  ],
  calculate: (inputs) => {
    const gauge = Number(inputs.gauge);
    const system = String(inputs.system);

    if (!gauge || gauge < 0) return [
      { value: '—', label: 'AWG' },
      { value: '—', label: 'Диаметр (мм)' },
      { value: '—', label: 'Диаметр (дюймы)' },
      { value: '—', label: 'Площадь сечения (мм²)' },
      { value: '—', label: 'Площадь (circular mils)' }
    ];

    // Calculate diameter based on system
    let diameterMm = 0;
    let awg = gauge;

    switch (system) {
      case 'awg':
        // AWG formula: d = 0.127 × 92^((36-n)/39) mm
        diameterMm = 0.127 * Math.pow(92, (36 - gauge) / 39);
        break;
      case 'swg':
        // SWG approximation
        if (gauge === 0) diameterMm = 8.23;
        else if (gauge === 1) diameterMm = 7.62;
        else diameterMm = 7.62 * Math.pow(0.8905, gauge - 1);
        awg = Math.round(36 - 39 * Math.log(diameterMm / 0.127) / Math.log(92));
        break;
      case 'bwg':
        // BWG approximation
        diameterMm = 0.013 * (36 - gauge) * 25.4;
        if (diameterMm < 0.127) diameterMm = 0.127 * Math.pow(92, (36 - gauge) / 39);
        awg = Math.round(36 - 39 * Math.log(diameterMm / 0.127) / Math.log(92));
        break;
    }

    const diameterInch = diameterMm / 25.4;
    const areaMm2 = Math.PI * Math.pow(diameterMm / 2, 2);
    const circularMils = Math.pow(diameterMm / 25.4 * 1000, 2);

    return [
      { value: `${Math.max(0, awg)}`, label: 'AWG' },
      { value: `${Math.round(diameterMm * 100) / 100} мм`, label: 'Диаметр (мм)' },
      { value: `${Math.round(diameterInch * 1000) / 1000}"`, label: 'Диаметр (дюймы)' },
      { value: `${Math.round(areaMm2 * 100) / 100} мм²`, label: 'Площадь сечения (мм²)' },
      { value: `${Math.round(circularMils)} cmil`, label: 'Площадь (circular mils)' }
    ];
  },
  content: {
    howTo: 'Введите номер калибра провода и выберите систему (AWG, SWG, BWG). Конвертер рассчитает диаметр, площадь сечения и эквивалент в других системах.',
    about: 'Конвертер калибра провода переводит между различными системами обозначения толщины проволоки: AWG (американская), SWG (британская), BWG (伯明翰). Также рассчитывает площадь поперечного сечения.',
    formula: 'AWG: d = 0.127 × 92^((36-n)/39) мм, где n — номер калибра. Площадь = π × (d/2)². Circular mil = (d в тысячных дюйма)².',
    faq: [
      { question: 'Что такое AWG?', answer: 'American Wire Gauge — американская система обозначения диаметра проволоки. Чем меньше номер, тем толще провод. Калибр 0000 (4/0) — самый толстый стандартный, 40 — очень тонкий.' },
      { question: 'Какой калибр провода для домашней проводки?', answer: 'Для освещения обычно используется AWG 14 (1.6 мм), для розеток — AWG 12 (2.0 мм), для электроплит — AWG 8-10.' },
      { question: 'Что такое circular mil?', answer: 'Единица площади сечения провода, равная площади круга диаметром 1/1000 дюйма (1 mil). Используется в электротехнике для расчёта сопротивления.' }
    ],
    sources: [
      { title: 'American Wire Gauge', url: 'https://en.wikipedia.org/wiki/American_wire_gauge' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 9. Конвертер калибра игл и шприцов
export const needleGaugeConverter: Calculator = {
  id: 'needle-gauge-converter',
  slug: 'konverter-kalibra-igl',
  title: 'Конвертер калибра игл и шприцов',
  description: 'Перевод калибра игл в диаметр (мм), информация о объёмах шприцов и длинах игл',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'gauge',
      label: 'Калибр иглы (G)',
      type: 'select',
      options: [
        { value: '16', label: '16G — крупная (для крови)' },
        { value: '18', label: '18G — крупная (для крови)' },
        { value: '20', label: '20G — средняя (внутривенная)' },
        { value: '21', label: '21G — средняя (внутримышечная)' },
        { value: '22', label: '22G — средняя (внутривенная)' },
        { value: '23', label: '23G — тонкая (подкожная)' },
        { value: '25', label: '25G — тонкая (инсулиновая)' },
        { value: '26', label: '26G — очень тонкая' },
        { value: '27', label: '27G — микро' },
        { value: '30', label: '30G — ультратонкая' },
        { value: '31', label: '31G — супертонкая' }
      ],
      defaultValue: '25'
    },
    {
      name: 'length',
      label: 'Длина иглы (мм)',
      type: 'select',
      options: [
        { value: '4', label: '4 мм (микро)' },
        { value: '6', label: '6 мм' },
        { value: '8', label: '8 мм' },
        { value: '12', label: '12 мм (1/2")' },
        { value: '16', label: '16 мм (5/8")' },
        { value: '25', label: '25 мм (1")' },
        { value: '38', label: '38 мм (1.5")' },
        { value: '50', label: '50 мм (2")' }
      ],
      defaultValue: '8'
    }
  ],
  outputs: [
    { name: 'gauge', label: 'Калибр (G)', type: 'text' },
    { name: 'diameterMm', label: 'Диаметр (мм)', type: 'text' },
    { name: 'diameterInch', label: 'Диаметр (дюймы)', type: 'text' },
    { name: 'usage', label: 'Типичное применение', type: 'text' },
    { name: 'flowRate', label: 'Скорость потока', type: 'text' }
  ],
  calculate: (inputs) => {
    const gauge = Number(inputs.gauge);

    if (!gauge) return [
      { value: '—', label: 'Калибр (G)' },
      { value: '—', label: 'Диаметр (мм)' },
      { value: '—', label: 'Диаметр (дюймы)' },
      { value: '—', label: 'Типичное применение' },
      { value: '—', label: 'Скорость потока' }
    ];

    // Stubs gauge formula (approximate): d = 0.127 × 92^((36-n)/39) / 2 (divide by 2 for needle gauge difference)
    // Actually using standard needle gauge table
    const gaugeToMm: Record<number, number> = {
      16: 1.65, 18: 1.27, 20: 0.91, 21: 0.82, 22: 0.72,
      23: 0.64, 25: 0.51, 26: 0.46, 27: 0.41, 30: 0.31, 31: 0.26
    };

    const diameterMm = gaugeToMm[gauge] || 0.51;
    const diameterInch = diameterMm / 25.4;

    let usage = '';
    let flowRate = '';

    if (gauge <= 18) {
      usage = 'Взятие крови, трансфузия, крупные внутривенные доступы';
      flowRate = 'Очень высокая';
    } else if (gauge <= 21) {
      usage = 'Внутривенные инъекции, взятие крови';
      flowRate = 'Высокая';
    } else if (gauge <= 25) {
      usage = 'Инсулиновые инъекции, подкожные инъекции';
      flowRate = 'Средняя';
    } else {
      usage = 'Инсулин, вакцины, микроинъекции';
      flowRate = 'Низкая';
    }

    return [
      { value: `${gauge}G`, label: 'Калибр (G)' },
      { value: `${diameterMm} мм`, label: 'Диаметр (мм)' },
      { value: `${Math.round(diameterInch * 100) / 100}"`, label: 'Диаметр (дюймы)' },
      { value: usage, label: 'Типичное применение' },
      { value: flowRate, label: 'Скорость потока' }
    ];
  },
  content: {
    howTo: 'Выберите калибр иглы (G) и длину. Конвертер покажет диаметр и рекомендуемое применение для данного калибра.',
    about: 'Конвертер калибра игл переводит номер калибра (Gauge) в фактический диаметр и предоставляет информацию о типичном медицинском применении. Медицинские иглы используют систему Stubs, отличную от AWG.',
    formula: 'Медицинский калибр игл (Stubs): чем больше номер, тем тоньше игла. Диаметры стандартизированы ISO 9626.',
    faq: [
      { question: 'Что означает "25G" на игле?', answer: '25 Gauge — номер калибра иглы. В медицинской системе Stubs чем больше номер, тем тоньше игла. 25G ≈ 0.51 мм диаметром.' },
      { question: 'Какой калибр для инсулиновых шприцов?', answer: 'Инсулиновые шприцы обычно имеют калибр 28-31G (0.36-0.26 мм). Более тонкие иглы менее болезненны.' },
      { question: 'Какая длина иглы нужна для внутримышечной инъекции?', answer: 'Для взрослых — 25-38 мм (1-1.5 дюйма), для детей — 16-25 мм (5/8-1 дюйм). Зависит от объёма и места инъекции.' }
    ],
    sources: [
      { title: 'Hypodermic needle', url: 'https://en.wikipedia.org/wiki/Hypodermic_needle' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 10. Конвертер диагонали экранов
export const screenDiagonalConverter: Calculator = {
  id: 'screen-diagonal-converter',
  slug: 'konverter-diagonali-ekrana',
  title: 'Конвертер диагонали экрана',
  description: 'Перевод дюймов в сантиметры, расчёт ширины и высоты по диагонали и соотношению сторон',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'diagonal',
      label: 'Диагональ (дюймы)',
      type: 'number',
      placeholder: '27',
      defaultValue: 27,
      min: 1,
      max: 100
    },
    {
      name: 'aspectRatio',
      label: 'Соотношение сторон',
      type: 'select',
      options: [
        { value: '16:9', label: '16:9 (HD, Full HD, 4K)' },
        { value: '16:10', label: '16:10 (мониторы, Mac)' },
        { value: '21:9', label: '21:9 (ультраширокие)' },
        { value: '32:9', label: '32:9 (супер-ультраширокие)' },
        { value: '4:3', label: '4:3 (классические мониторы)' },
        { value: '3:2', label: '3:2 (Surface, некоторые ноутбуки)' },
        { value: '1:1', label: '1:1 (квадратные)' }
      ],
      defaultValue: '16:9'
    }
  ],
  outputs: [
    { name: 'diagonalCm', label: 'Диагональ (см)', type: 'text' },
    { name: 'diagonalMm', label: 'Диагональ (мм)', type: 'text' },
    { name: 'widthCm', label: 'Ширина (см)', type: 'text' },
    { name: 'heightCm', label: 'Высота (см)', type: 'text' },
    { name: 'widthPixels', label: 'Ширина (типичное разрешение)', type: 'text' },
    { name: 'area', label: 'Площадь экрана (см²)', type: 'text' }
  ],
  calculate: (inputs) => {
    const diagonal = Number(inputs.diagonal);
    const aspectRatio = String(inputs.aspectRatio);

    if (!diagonal) return [
      { value: '—', label: 'Диагональ (см)' },
      { value: '—', label: 'Диагональ (мм)' },
      { value: '—', label: 'Ширина (см)' },
      { value: '—', label: 'Высота (см)' },
      { value: '—', label: 'Ширина (типичное разрешение)' },
      { value: '—', label: 'Площадь экрана (см²)' }
    ];

    // Parse aspect ratio
    const [w, h] = aspectRatio.split(':').map(Number);
    const ratio = w / h;

    // Convert diagonal to cm
    const diagonalCm = diagonal * 2.54;
    const diagonalMm = diagonalCm * 10;

    // Calculate width and height using Pythagorean theorem
    // diagonal² = width² + height²
    // width = height × ratio
    // diagonal² = (height × ratio)² + height² = height² × (ratio² + 1)
    // height = diagonal / √(ratio² + 1)
    const heightCm = diagonalCm / Math.sqrt(ratio * ratio + 1);
    const widthCm = heightCm * ratio;

    // Calculate area
    const area = widthCm * heightCm;

    // Typical resolution (approximate PPI ~100)
    const typicalResolutions: Record<string, string> = {
      '16:9': diagonal < 20 ? '1920×1080' : diagonal < 28 ? '2560×1440' : '3840×2160',
      '16:10': diagonal < 20 ? '1920×1200' : '2560×1600',
      '21:9': '3440×1440',
      '32:9': '5120×1440',
      '4:3': '1600×1200',
      '3:2': '2256×1504',
      '1:1': '1080×1080'
    };

    return [
      { value: `${Math.round(diagonalCm * 10) / 10} см`, label: 'Диагональ (см)' },
      { value: `${Math.round(diagonalMm)} мм`, label: 'Диагональ (мм)' },
      { value: `${Math.round(widthCm * 10) / 10} см`, label: 'Ширина (см)' },
      { value: `${Math.round(heightCm * 10) / 10} см`, label: 'Высота (см)' },
      { value: typicalResolutions[aspectRatio] || 'Различное', label: 'Ширина (типичное разрешение)' },
      { value: `${Math.round(area)} см²`, label: 'Площадь экрана (см²)' }
    ];
  },
  content: {
    howTo: 'Введите диагональ экрана в дюймах и выберите соотношение сторон. Конвертер рассчитает фактические размеры в сантиметрах и площадь экрана.',
    about: 'Конвертер диагонали экрана переводит дюймы в сантиметры и рассчитывает реальные ширину и высоту дисплея по его диагонали и соотношению сторон. Помогает при выборе монитора или телевизора.',
    formula: '1 дюйм = 2.54 см. Ширина = (Диагональ × Соотношение) / √(Соотношение² + 1). Высота = Диагональ / √(Соотношение² + 1).',
    faq: [
      { question: 'Какая диагональ подходит для гостиной?', answer: 'Для просмотра на расстоянии 2-3 метра оптимальны телевизоры 50-65 дюймов (127-165 см). Для небольших комнат — 40-50 дюймов.' },
      { question: 'Что такое соотношение сторон 21:9?', answer: 'Ультраширокий формат, используемый в кино и игровых мониторах. Обеспечивает более погружающий опыт, но не все видео поддерживают этот формат.' },
      { question: 'Почему 27" монитор может быть разных размеров?', answer: 'Мониторы с разным соотношением сторон имеют разную площадь. 27" 16:9 шире, чем 27" 4:3, но ниже по высоте.' }
    ],
    sources: [
      { title: 'Display size', url: 'https://en.wikipedia.org/wiki/Display_size' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 11. Конвертер размеров обуви детской
export const childrenShoeSizeConverter: Calculator = {
  id: 'children-shoe-size-converter',
  slug: 'konverter-detskoj-obuvi',
  title: 'Конвертер размеров детской обуви',
  description: 'Перевод между системами размеров детской обуви с учётом возрастных групп',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'size',
      label: 'Размер',
      type: 'number',
      placeholder: '28',
      defaultValue: 28
    },
    {
      name: 'system',
      label: 'Система',
      type: 'select',
      options: [
        { value: 'eu', label: 'Европа (EU)' },
        { value: 'us', label: 'США' },
        { value: 'uk', label: 'Великобритания' },
        { value: 'ru', label: 'Россия' },
        { value: 'jp', label: 'Япония (мм)' },
        { value: 'cm', label: 'Длина стопы (см)' }
      ],
      defaultValue: 'eu'
    }
  ],
  outputs: [
    { name: 'eu', label: 'Европа (EU)', type: 'text' },
    { name: 'us', label: 'США', type: 'text' },
    { name: 'uk', label: 'Великобритания', type: 'text' },
    { name: 'ru', label: 'Россия', type: 'text' },
    { name: 'jp', label: 'Япония (мм)', type: 'text' },
    { name: 'cm', label: 'Длина стопы (см)', type: 'text' },
    { name: 'ageGroup', label: 'Возрастная группа', type: 'text' },
    { name: 'monthRange', label: 'Примерный возраст', type: 'text' }
  ],
  calculate: (inputs) => {
    const size = Number(inputs.size);
    const system = String(inputs.system);

    if (!size) return [
      { value: '—', label: 'Европа (EU)' },
      { value: '—', label: 'США' },
      { value: '—', label: 'Великобритания' },
      { value: '—', label: 'Россия' },
      { value: '—', label: 'Япония (мм)' },
      { value: '—', label: 'Длина стопы (см)' },
      { value: '—', label: 'Возрастная группа' },
      { value: '—', label: 'Примерный возраст' }
    ];

    // Convert to cm (length of foot) first
    let cm = 0;
    switch (system) {
      case 'eu': cm = (size + 1.5) * 2 / 3; break;
      case 'us': cm = (size + 11.5) * 2 / 3; break;
      case 'uk': cm = (size + 12.5) * 2 / 3; break;
      case 'ru': cm = (size + 1.5) * 2 / 3; break;
      case 'jp': cm = size / 10; break;
      case 'cm': cm = size; break;
    }

    const mm = Math.round(cm * 10);

    // Calculate all sizes
    const eu = Math.round((3 * cm / 2 - 1.5) * 2) / 2;
    const us = Math.round((3 * cm / 2 - 11.5) * 2) / 2;
    const uk = Math.round((3 * cm / 2 - 12.5) * 2) / 2;
    const ru = eu;

    // Determine age group and month range
    let ageGroup = '';
    let monthRange = '';

    if (cm < 9) {
      ageGroup = 'Новорождённые / Infant';
      monthRange = '0-3 месяца';
    } else if (cm < 11) {
      ageGroup = 'Младенцы / Baby';
      monthRange = '3-9 месяцев';
    } else if (cm < 13) {
      ageGroup = 'Ползуны / Crawler';
      monthRange = '9-18 месяцев';
    } else if (cm < 16) {
      ageGroup = 'Первые шаги / Toddler';
      monthRange = '1.5-3 года';
    } else if (cm < 19) {
      ageGroup = 'Малыши / Little Kid';
      monthRange = '3-5 лет';
    } else if (cm < 22) {
      ageGroup = 'Дошкольники / Big Kid';
      monthRange = '5-8 лет';
    } else if (cm < 24) {
      ageGroup = 'Школьники / Youth';
      monthRange = '8-12 лет';
    } else {
      ageGroup = 'Подростки / Junior';
      monthRange = '12+ лет';
    }

    return [
      { value: `${eu}`, label: 'Европа (EU)' },
      { value: `${us}`, label: 'США' },
      { value: `${uk}`, label: 'Великобритания' },
      { value: `${ru}`, label: 'Россия' },
      { value: `${mm} мм`, label: 'Япония (мм)' },
      { value: `${Math.round(cm * 10) / 10} см`, label: 'Длина стопы (см)' },
      { value: ageGroup, label: 'Возрастная группа' },
      { value: monthRange, label: 'Примерный возраст' }
    ];
  },
  content: {
    howTo: 'Введите размер детской обуви и выберите систему измерения. Конвертер покажет соответствующие размеры и возрастную группу ребёнка.',
    about: 'Конвертер размеров детской обуви специализирован на переводе размеров для детей от новорождённых до подростков. Учитывает быстрый рост детской стопы и возрастные группы.',
    formula: 'Европа: размер = 3/2 × длина (см) - 1.5. Детские размеры США: размер = 3/2 × длина (см) - 11.5. Длина стопы примерно соответствует возрасту.',
    faq: [
      { question: 'Как часто менять размер обуви у ребёнка?', answer: 'Детская стопа растёт быстро: до 1.5 лет — каждые 2-3 месяца, до 3 лет — каждые 3-4 месяца, до 5 лет — каждые 4-6 месяцев.' },
      { question: 'Какой запас оставлять в детской обуви?', answer: 'Для первых шагов — 0.5-1 см, для активных детей — 1-1.5 см. Слишком большая обувь опасна для развития стопы.' },
      { question: 'Когда покупать первую обувь?', answer: 'Первую обувь для ходьбы (не пинетки) покупают когда ребёнок самостоятельно стоит и делает шаги. Обычно это 9-15 месяцев, размер 19-22 EU.' }
    ],
    sources: [
      { title: 'Children\'s shoe sizes', url: 'https://en.wikipedia.org/wiki/Shoe_size#Children' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 12. Конвертер размеров бюстгальтеров
export const braSizeConverter: Calculator = {
  id: 'bra-size-converter',
  slug: 'konverter-razmerov-byustgaltera',
  title: 'Конвертер размеров бюстгальтеров',
  description: 'Перевод между системами размеров бюстгальтеров США, Великобритании, ЕС и Японии',
  category: 'konvertery',
  subcategory: 'special',
  type: 'converter',
  inputs: [
    {
      name: 'bandSize',
      label: 'Обхват под грудью',
      type: 'number',
      placeholder: '75',
      defaultValue: 75
    },
    {
      name: 'bandSystem',
      label: 'Система обхвата',
      type: 'select',
      options: [
        { value: 'eu', label: 'Европа / Россия (см: 65, 70, 75...)' },
        { value: 'us', label: 'США / Великобритания (дюймы: 30, 32, 34...)' },
        { value: 'fr', label: 'Франция (см +15: 80, 85, 90...)' },
        { value: 'it', label: 'Италия (см: 0, 1, 2...)' },
        { value: 'au', label: 'Австралия (см: 8, 10, 12...)' }
      ],
      defaultValue: 'eu'
    },
    {
      name: 'cupSize',
      label: 'Размер чашки',
      type: 'select',
      options: [
        { value: 'AA', label: 'AA' },
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' },
        { value: 'DD', label: 'DD / E' },
        { value: 'E', label: 'E / DDD' },
        { value: 'F', label: 'F / DDDD' },
        { value: 'G', label: 'G' },
        { value: 'H', label: 'H' }
      ],
      defaultValue: 'B'
    }
  ],
  outputs: [
    { name: 'euSize', label: 'Европа / Россия', type: 'text' },
    { name: 'usSize', label: 'США / Канада', type: 'text' },
    { name: 'ukSize', label: 'Великобритания', type: 'text' },
    { name: 'frSize', label: 'Франция / Бельгия', type: 'text' },
    { name: 'jpSize', label: 'Япония', type: 'text' },
    { name: 'auSize', label: 'Австралия / Новая Зеландия', type: 'text' }
  ],
  calculate: (inputs) => {
    const bandSize = Number(inputs.bandSize);
    const bandSystem = String(inputs.bandSystem);
    const cupSize = String(inputs.cupSize);

    if (!bandSize) return [
      { value: '—', label: 'Европа / Россия' },
      { value: '—', label: 'США / Канада' },
      { value: '—', label: 'Великобритания' },
      { value: '—', label: 'Франция / Бельгия' },
      { value: '—', label: 'Япония' },
      { value: '—', label: 'Австралия / Новая Зеландия' }
    ];

    // Convert band size to EU cm first
    let euBand = 0;
    switch (bandSystem) {
      case 'eu': euBand = bandSize; break;
      case 'us': euBand = bandSize * 2.54; break; // inches to cm
      case 'fr': euBand = bandSize - 15; break;
      case 'it': euBand = bandSize * 5 + 60; break;
      case 'au': euBand = bandSize * 5 + 55; break;
    }

    // Round to nearest 5 cm
    euBand = Math.round(euBand / 5) * 5;

    // Calculate all band sizes
    const usBand = Math.round(euBand / 2.54);
    const ukBand = usBand; // Same as US
    const frBand = euBand + 15;
    const itBand = Math.round((euBand - 60) / 5);
    const auBand = Math.round((euBand - 55) / 5);

    // Cup size conversions
    const cupMap: Record<string, Record<string, string>> = {
      'AA': { eu: 'AA', us: 'AA', uk: 'AA', fr: 'AA', jp: 'A', au: 'AA' },
      'A': { eu: 'A', us: 'A', uk: 'A', fr: 'A', jp: 'B', au: 'A' },
      'B': { eu: 'B', us: 'B', uk: 'B', fr: 'B', jp: 'C', au: 'B' },
      'C': { eu: 'C', us: 'C', uk: 'C', fr: 'C', jp: 'D', au: 'C' },
      'D': { eu: 'D', us: 'D', uk: 'D', fr: 'D', jp: 'E', au: 'D' },
      'DD': { eu: 'E', us: 'DD/E', uk: 'DD', fr: 'E', jp: 'F', au: 'DD' },
      'E': { eu: 'F', us: 'DDD/F', uk: 'E', fr: 'F', jp: 'G', au: 'E' },
      'F': { eu: 'G', us: 'G', uk: 'F', fr: 'G', jp: 'H', au: 'F' },
      'G': { eu: 'H', us: 'H', uk: 'FF', fr: 'H', jp: 'I', au: 'G' },
      'H': { eu: 'I', us: 'I', uk: 'G', fr: 'I', jp: 'J', au: 'H' }
    };

    const cups = cupMap[cupSize] || cupMap['B'];

    return [
      { value: `${euBand}${cups.eu}`, label: 'Европа / Россия' },
      { value: `${usBand}${cups.us}`, label: 'США / Канада' },
      { value: `${ukBand}${cups.uk}`, label: 'Великобритания' },
      { value: `${frBand}${cups.fr}`, label: 'Франция / Бельгия' },
      { value: `${euBand}${cups.jp}`, label: 'Япония' },
      { value: `${auBand}${cups.au}`, label: 'Австралия / Новая Зеландия' }
    ];
  },
  content: {
    howTo: 'Введите обхват под грудью и выберите систему, а также размер чашки. Конвертер покажет соответствующие размеры в других странах.',
    about: 'Конвертер размеров бюстгальтеров переводит между международными системами. Размер состоит из двух частей: обхвата под грудью (лента) и объёма чашки (буква). Разные страны используют разные системы обозначения.',
    formula: 'Европа: обхват в см (65, 70, 75...). США/UK: обхват в дюймах (30, 32, 34...). Франция: +15 к европейскому. Чашки также различаются между системами.',
    faq: [
      { question: 'Как правильно измерить размер бюстгальтера?', answer: 'Обхват под грудью измеряется плотно, на выдохе. Обхват по наиболее выступающим точкам груди — свободно. Разница между этими измерениями определяет размер чашки.' },
      { question: 'Почему размеры чашек различаются?', answer: 'В США и Великобритании используются разные обозначения после D (DD, DDD vs E, F). Япония использует другую шкалу чашек вообще. Франция добавляет 15 к европейскому обхвату.' },
      { question: 'Что делать, если размер "между" размерами?', answer: 'Пробуйте оба соседних размера — у разных брендов крой может отличаться. Для чашки лучше взять размер больше, для ленты — точный или на крючке плотнее.' }
    ],
    sources: [
      { title: 'Bra size', url: 'https://en.wikipedia.org/wiki/Bra_size' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Экспорт всех дополнительных специальных конвертеров
export const specialConvertersMore: Calculator[] = [
  cookingMeasuresConverter,
  yarnThicknessConverter,
  paperDensityConverter,
  tireSizeConverter,
  ringSizeConverter,
  clothingSizesConverter,
  shoeSizeConverter,
  wireGaugeConverter,
  needleGaugeConverter,
  screenDiagonalConverter,
  childrenShoeSizeConverter,
  braSizeConverter
];
