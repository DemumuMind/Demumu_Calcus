import { Calculator } from '../types';

// Конвертер объёма
export const volumeConverter: Calculator = {
  id: 'volume-basic-converter',
  slug: 'konverter-obyoma',
  title: 'Конвертер объёма',
  description: 'Перевод литров, миллилитров, галлонов, кубометров, жидких унций',
  category: 'konvertery',
  subcategory: 'conv-obyom',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'l', label: 'л — литры' },
        { value: 'ml', label: 'мл — миллилитры' },
        { value: 'm3', label: 'м³ — кубометры' },
        { value: 'cm3', label: 'см³ — кубические сантиметры' },
        { value: 'gal_us', label: 'гал (US) — галлоны США' },
        { value: 'gal_uk', label: 'гал (UK) — галлоны UK' },
        { value: 'fl_oz', label: 'fl oz — жидкие унции' },
        { value: 'pt', label: 'пт — пинты' },
        { value: 'qt', label: 'кварт — кварты' }
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
        { value: 'm3', label: 'м³ — кубометры' },
        { value: 'cm3', label: 'см³ — кубические сантиметры' },
        { value: 'gal_us', label: 'гал (US) — галлоны США' },
        { value: 'gal_uk', label: 'гал (UK) — галлоны UK' },
        { value: 'fl_oz', label: 'fl oz — жидкие унции' },
        { value: 'pt', label: 'пт — пинты' },
        { value: 'qt', label: 'кварт — кварты' }
      ],
      defaultValue: 'ml'
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
      'gal_us': 3.78541,
      'gal_uk': 4.54609,
      'fl_oz': 0.0295735,
      'pt': 0.473176,
      'qt': 0.946353
    };
    
    const inLiters = value * toLiters[from];
    const result = inLiters / toLiters[to];
    
    const labels: Record<string, string> = {
      'l': 'л', 'ml': 'мл', 'm3': 'м³', 'cm3': 'см³',
      'gal_us': 'галлонов (US)', 'gal_uk': 'галлонов (UK)',
      'fl_oz': 'жидких унций', 'pt': 'пинт', 'qt': 'кварт'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите объём, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Объём — мера трёхмерного пространства, занимаемого телом или веществом. Основная единица в СИ — кубический метр (м³).',
    usage: 'Используется в кулинарии, медицине, химии, строительстве, топливной промышленности.',
    formula: '1 л = 1000 мл = 1 дм³ = 0.001 м³\n1 галлон (US) = 3.785 л\n1 галлон (UK) = 4.546 л',
    faq: [
      {
        question: 'Сколько литров в галлоне?',
        answer: '1 галлон США = 3.785 литра. 1 британский галлон = 4.546 литра.'
      },
      {
        question: 'Сколько миллилитров в стакане?',
        answer: 'Стандартный стакан = 250 мл (стакан гранёный).'
      }
    ],
    sources: [
      { title: 'Литр — Википедия', url: 'https://ru.wikipedia.org/wiki/Литр' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер площади
export const areaConverter: Calculator = {
  id: 'area-basic-converter',
  slug: 'konverter-ploshchadi',
  title: 'Конвертер площади',
  description: 'Перевод м², км², гектаров, соток, акров, квадратных футов',
  category: 'konvertery',
  subcategory: 'conv-ploshchad',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
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
        { value: 'sotka', label: 'соток — сотки' },
        { value: 'acre', label: 'акров — акры' },
        { value: 'ft2', label: 'ft² — квадратные футы' },
        { value: 'inch2', label: 'in² — квадратные дюймы' },
        { value: 'cm2', label: 'см² — квадратные сантиметры' }
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
        { value: 'sotka', label: 'соток — сотки' },
        { value: 'acre', label: 'акров — акры' },
        { value: 'ft2', label: 'ft² — квадратные футы' },
        { value: 'inch2', label: 'in² — квадратные дюймы' },
        { value: 'cm2', label: 'см² — квадратные сантиметры' }
      ],
      defaultValue: 'sotka'
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
    const toSqMeters: Record<string, number> = {
      'm2': 1,
      'km2': 1e6,
      'ha': 10000,
      'sotka': 100,
      'acre': 4046.86,
      'ft2': 0.092903,
      'inch2': 0.00064516,
      'cm2': 0.0001
    };
    
    const inSqMeters = value * toSqMeters[from];
    const result = inSqMeters / toSqMeters[to];
    
    const labels: Record<string, string> = {
      'm2': 'м²', 'km2': 'км²', 'ha': 'га', 'sotka': 'соток',
      'acre': 'акров', 'ft2': 'ft²', 'inch2': 'in²', 'cm2': 'см²'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите площадь, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Площадь — величина, характеризующая размер поверхности. Основная единица в СИ — квадратный метр (м²).',
    usage: 'Используется в недвижимости, строительстве, сельском хозяйстве, картографии.',
    formula: '1 км² = 100 га = 10 000 соток\n1 га = 100 соток = 10 000 м²\n1 акр = 4046.86 м² ≈ 40 соток',
    faq: [
      {
        question: 'Сколько соток в гектаре?',
        answer: '1 гектар = 100 соток.'
      },
      {
        question: 'Сколько квадратных метров в сотке?',
        answer: '1 сотка = 100 м² (10 × 10 метров).'
      }
    ],
    sources: [
      { title: 'Гектар — Википедия', url: 'https://ru.wikipedia.org/wiki/Гектар' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер времени
export const timeConverter: Calculator = {
  id: 'time-basic-converter',
  slug: 'konverter-vremeni',
  title: 'Конвертер времени',
  description: 'Перевод секунд, минут, часов, дней, недель, месяцев, лет',
  category: 'konvertery',
  subcategory: 'conv-vremya',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 's', label: 'с — секунды' },
        { value: 'min', label: 'мин — минуты' },
        { value: 'h', label: 'ч — часы' },
        { value: 'd', label: 'дн — дни' },
        { value: 'wk', label: 'нед — недели' },
        { value: 'mo', label: 'мес — месяцы' },
        { value: 'y', label: 'лет — года' }
      ],
      defaultValue: 'h'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 's', label: 'с — секунды' },
        { value: 'min', label: 'мин — минуты' },
        { value: 'h', label: 'ч — часы' },
        { value: 'd', label: 'дн — дни' },
        { value: 'wk', label: 'нед — недели' },
        { value: 'mo', label: 'мес — месяцы' },
        { value: 'y', label: 'лет — года' }
      ],
      defaultValue: 'min'
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
    
    // Convert to seconds first
    const toSeconds: Record<string, number> = {
      's': 1,
      'min': 60,
      'h': 3600,
      'd': 86400,
      'wk': 604800,
      'mo': 2629746,  // average month (30.44 days)
      'y': 31556952   // average year (365.25 days)
    };
    
    const inSeconds = value * toSeconds[from];
    const result = inSeconds / toSeconds[to];
    
    const labels: Record<string, string> = {
      's': 'секунд', 'min': 'минут', 'h': 'часов',
      'd': 'дней', 'wk': 'недель', 'mo': 'месяцев', 'y': 'лет'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите время, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Время — физическая величина, характеризующая длительность событий. Основная единица в СИ — секунда (с).',
    usage: 'Используется повсеместно: в быту, науке, спорте, производстве, планировании.',
    formula: '1 мин = 60 с\n1 ч = 60 мин = 3600 с\n1 день = 24 ч = 86 400 с',
    faq: [
      {
        question: 'Сколько секунд в часе?',
        answer: '1 час = 60 минут × 60 секунд = 3600 секунд.'
      },
      {
        question: 'Сколько недель в году?',
        answer: 'Примерно 52 недели в году (52.143 для невисокосного года).'
      }
    ],
    sources: [
      { title: 'Секунда — Википедия', url: 'https://ru.wikipedia.org/wiki/Секунда' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер давления
export const pressureConverter: Calculator = {
  id: 'pressure-converter',
  slug: 'konverter-davleniya',
  title: 'Конвертер давления',
  description: 'Перевод Паскалей, бар, атмосфер, мм рт. ст., psi',
  category: 'konvertery',
  subcategory: 'conv-davlenie',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'pa', label: 'Па — Паскали' },
        { value: 'kpa', label: 'кПа — килопаскали' },
        { value: 'mpa', label: 'МПа — мегапаскали' },
        { value: 'bar', label: 'бар — бары' },
        { value: 'atm', label: 'атм — атмосферы' },
        { value: 'mmhg', label: 'мм рт. ст. — миллиметры ртутного столба' },
        { value: 'psi', label: 'psi — фунты на кв. дюйм' },
        { value: 'torr', label: 'торр — торричелли' }
      ],
      defaultValue: 'atm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'pa', label: 'Па — Паскали' },
        { value: 'kpa', label: 'кПа — килопаскали' },
        { value: 'mpa', label: 'МПа — мегапаскали' },
        { value: 'bar', label: 'бар — бары' },
        { value: 'atm', label: 'атм — атмосферы' },
        { value: 'mmhg', label: 'мм рт. ст. — миллиметры ртутного столба' },
        { value: 'psi', label: 'psi — фунты на кв. дюйм' },
        { value: 'torr', label: 'торр — торричелли' }
      ],
      defaultValue: 'mmhg'
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
    
    // Convert to Pascals first
    const toPascals: Record<string, number> = {
      'pa': 1,
      'kpa': 1000,
      'mpa': 1e6,
      'bar': 100000,
      'atm': 101325,
      'mmhg': 133.322,
      'psi': 6894.76,
      'torr': 133.322
    };
    
    const inPascals = value * toPascals[from];
    const result = inPascals / toPascals[to];
    
    const labels: Record<string, string> = {
      'pa': 'Па', 'kpa': 'кПа', 'mpa': 'МПа', 'bar': 'бар',
      'atm': 'атм', 'mmhg': 'мм рт. ст.', 'psi': 'psi', 'torr': 'торр'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите давление, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Давление — физическая величина, равная силе, действующей перпендикулярно поверхности на единицу площади.',
    usage: 'Используется в метеорологии, медицине, технике, физике, промышленности.',
    formula: '1 атм = 101325 Па = 760 мм рт. ст. = 1.01325 бар\n1 бар = 100000 Па\n1 psi ≈ 6894.76 Па',
    faq: [
      {
        question: 'Сколько мм рт. ст. в атмосфере?',
        answer: '1 атмосфера = 760 мм ртутного столба (при 0°C).'
      },
      {
        question: 'Что такое psi?',
        answer: 'PSI (pounds per square inch) — фунты на квадратный дюйм. Используется в США для давления в шинах.'
      }
    ],
    sources: [
      { title: 'Давление — Википедия', url: 'https://ru.wikipedia.org/wiki/Давление' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер энергии
export const energyConverter: Calculator = {
  id: 'energy-converter',
  slug: 'konverter-energii',
  title: 'Конвертер энергии',
  description: 'Перевод Джоулей, калорий, кВт⋅ч, эВ, BTU',
  category: 'konvertery',
  subcategory: 'conv-energiya',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'j', label: 'Дж — Джоули' },
        { value: 'kj', label: 'кДж — килоджоули' },
        { value: 'cal', label: 'кал — калории' },
        { value: 'kcal', label: 'ккал — килокалории' },
        { value: 'kwh', label: 'кВт⋅ч — киловатт-часы' },
        { value: 'wh', label: 'Вт⋅ч — ватт-часы' },
        { value: 'ev', label: 'эВ — электронвольты' },
        { value: 'btu', label: 'BTU — британские тепловые единицы' }
      ],
      defaultValue: 'kcal'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'j', label: 'Дж — Джоули' },
        { value: 'kj', label: 'кДж — килоджоули' },
        { value: 'cal', label: 'кал — калории' },
        { value: 'kcal', label: 'ккал — килокалории' },
        { value: 'kwh', label: 'кВт⋅ч — киловатт-часы' },
        { value: 'wh', label: 'Вт⋅ч — ватт-часы' },
        { value: 'ev', label: 'эВ — электронвольты' },
        { value: 'btu', label: 'BTU — британские тепловые единицы' }
      ],
      defaultValue: 'j'
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
    
    // Convert to Joules first
    const toJoules: Record<string, number> = {
      'j': 1,
      'kj': 1000,
      'cal': 4.184,
      'kcal': 4184,
      'kwh': 3.6e6,
      'wh': 3600,
      'ev': 1.60218e-19,
      'btu': 1055.06
    };
    
    const inJoules = value * toJoules[from];
    const result = inJoules / toJoules[to];
    
    const labels: Record<string, string> = {
      'j': 'Дж', 'kj': 'кДж', 'cal': 'кал', 'kcal': 'ккал',
      'kwh': 'кВт⋅ч', 'wh': 'Вт⋅ч', 'ev': 'эВ', 'btu': 'BTU'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toExponential(4).replace(/\.?0+e/, 'e')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите энергию, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Энергия — физическая величина, характеризующая способность тела или системы совершать работу.',
    usage: 'Используется в физике, химии, энергетике, питании, технике.',
    formula: '1 ккал = 4184 Дж\n1 кВт⋅ч = 3.6 МДж\n1 калория (пищевая) = 4184 Дж',
    faq: [
      {
        question: 'Сколько джоулей в калории?',
        answer: '1 калория (тепловая) = 4.184 джоуля. 1 килокалория (ккал, пищевая) = 4184 джоуля.'
      },
      {
        question: 'Что такое BTU?',
        answer: 'BTU (British Thermal Unit) — британская тепловая единица. 1 BTU ≈ 1055 джоулей.'
      }
    ],
    sources: [
      { title: 'Джоуль — Википедия', url: 'https://ru.wikipedia.org/wiki/Джоуль' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер мощности
export const powerConverter: Calculator = {
  id: 'power-basic-converter',
  slug: 'konverter-moshchnosti',
  title: 'Конвертер мощности',
  description: 'Перевод Ватт, киловатт, лошадиных сил, BTU/ч',
  category: 'konvertery',
  subcategory: 'conv-moshchnost',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'w', label: 'Вт — Ватты' },
        { value: 'kw', label: 'кВт — киловатты' },
        { value: 'mw', label: 'МВт — мегаватты' },
        { value: 'hp_m', label: 'л.с. (метр.) — метрические лошадиные силы' },
        { value: 'hp_i', label: 'hp (импер.) — имперские лошадиные силы' },
        { value: 'btu_h', label: 'BTU/ч — британские единицы в час' },
        { value: 'j_s', label: 'Дж/с — джоули в секунду' }
      ],
      defaultValue: 'kw'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'w', label: 'Вт — Ватты' },
        { value: 'kw', label: 'кВт — киловатты' },
        { value: 'mw', label: 'МВт — мегаватты' },
        { value: 'hp_m', label: 'л.с. (метр.) — метрические лошадиные силы' },
        { value: 'hp_i', label: 'hp (импер.) — имперские лошадиные силы' },
        { value: 'btu_h', label: 'BTU/ч — британские единицы в час' },
        { value: 'j_s', label: 'Дж/с — джоули в секунду' }
      ],
      defaultValue: 'w'
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
    
    // Convert to Watts first
    const toWatts: Record<string, number> = {
      'w': 1,
      'kw': 1000,
      'mw': 1e6,
      'hp_m': 735.499,
      'hp_i': 745.7,
      'btu_h': 0.293071,
      'j_s': 1
    };
    
    const inWatts = value * toWatts[from];
    const result = inWatts / toWatts[to];
    
    const labels: Record<string, string> = {
      'w': 'Вт', 'kw': 'кВт', 'mw': 'МВт',
      'hp_m': 'л.с. (метр.)', 'hp_i': 'hp (импер.)',
      'btu_h': 'BTU/ч', 'j_s': 'Дж/с'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите мощность, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Мощность — физическая величина, показывающая, какую работу совершает система в единицу времени.',
    usage: 'Используется в энергетике, технике, автомобильной промышленности, физике.',
    formula: '1 кВт = 1000 Вт\n1 метрическая л.с. = 735.5 Вт\n1 имперская hp = 745.7 Вт',
    faq: [
      {
        question: 'Сколько ватт в лошадиной силе?',
        answer: '1 метрическая лошадиная сила = 735.5 Вт. 1 имперская (английская) л.с. = 745.7 Вт.'
      },
      {
        question: 'Что такое киловатт?',
        answer: 'Киловатт (кВт) — единица мощности, равная 1000 ваттам. Используется для обозначения мощности двигателей и электроприборов.'
      }
    ],
    sources: [
      { title: 'Ватт — Википедия', url: 'https://ru.wikipedia.org/wiki/Ватт' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер скорости (расширенный)
export const speedExtendedConverter: Calculator = {
  id: 'speed-converter-extended',
  slug: 'konverter-skorosti',
  title: 'Конвертер скорости',
  description: 'Перевод м/с, км/ч, миль/ч, узлов, скорости звука и света',
  category: 'konvertery',
  subcategory: 'conv-skorost',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'ms', label: 'м/с — метры в секунду' },
        { value: 'kmh', label: 'км/ч — километры в час' },
        { value: 'mph', label: 'миль/ч — мили в час' },
        { value: 'knot', label: 'уз — узлы (морские мили/ч)' },
        { value: 'mach', label: 'М — числа Маха' },
        { value: 'c', label: 'c — скорость света' },
        { value: 'fts', label: 'фт/с — футы в секунду' }
      ],
      defaultValue: 'kmh'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'ms', label: 'м/с — метры в секунду' },
        { value: 'kmh', label: 'км/ч — километры в час' },
        { value: 'mph', label: 'миль/ч — мили в час' },
        { value: 'knot', label: 'уз — узлы (морские мили/ч)' },
        { value: 'mach', label: 'М — числа Маха' },
        { value: 'c', label: 'c — скорость света' },
        { value: 'fts', label: 'фт/с — футы в секунду' }
      ],
      defaultValue: 'ms'
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
    
    // Convert to m/s first
    const toMs: Record<string, number> = {
      'ms': 1,
      'kmh': 0.277778,
      'mph': 0.44704,
      'knot': 0.514444,
      'mach': 340.3,  // at sea level, 15°C
      'c': 299792458,
      'fts': 0.3048
    };
    
    const inMs = value * toMs[from];
    const result = inMs / toMs[to];
    
    const labels: Record<string, string> = {
      'ms': 'м/с', 'kmh': 'км/ч', 'mph': 'миль/ч',
      'knot': 'узлов', 'mach': 'Маха',
      'c': 'c (скорость света)', 'fts': 'фт/с'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toExponential(4).replace(/\.?0+e/, 'e')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите скорость, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Скорость — векторная физическая величина, характеризующая быстроту перемещения объекта.',
    usage: 'Используется в физике, транспорте, авиации, космонавтике, спорте.',
    formula: '1 км/ч = 0.278 м/с\n1 миля/ч = 0.447 м/с\n1 узел = 0.514 м/с\n1 Маха ≈ 340 м/с (при 15°C)',
    faq: [
      {
        question: 'Сколько м/с в км/ч?',
        answer: '1 км/ч = 1000 м / 3600 с ≈ 0.278 м/с. Чтобы перевести км/ч в м/с, разделите на 3.6.'
      },
      {
        question: 'Что такое число Маха?',
        answer: 'Число Маха — отношение скорости объекта к скорости звука в данной среде. 1 Маха = скорость звука ≈ 340 м/с на уровне моря.'
      }
    ],
    sources: [
      { title: 'Скорость — Википедия', url: 'https://ru.wikipedia.org/wiki/Скорость' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер углов
export const angleConverter: Calculator = {
  id: 'angle-basic-converter',
  slug: 'konverter-uglov',
  title: 'Конвертер углов',
  description: 'Перевод градусов, радиан, градов, минут, угловых секунд',
  category: 'konvertery',
  subcategory: 'conv-ugol',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'deg', label: '° — градусы' },
        { value: 'rad', label: 'рад — радианы' },
        { value: 'grad', label: 'град — грады' },
        { value: 'min', label: '′ — угловые минуты' },
        { value: 'sec', label: '″ — угловые секунды' },
        { value: 'turn', label: 'об — обороты' }
      ],
      defaultValue: 'deg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'deg', label: '° — градусы' },
        { value: 'rad', label: 'рад — радианы' },
        { value: 'grad', label: 'град — грады' },
        { value: 'min', label: '′ — угловые минуты' },
        { value: 'sec', label: '″ — угловые секунды' },
        { value: 'turn', label: 'об — обороты' }
      ],
      defaultValue: 'rad'
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
    
    // Convert to degrees first
    const toDegrees: Record<string, number> = {
      'deg': 1,
      'rad': 57.2958,
      'grad': 0.9,
      'min': 1/60,
      'sec': 1/3600,
      'turn': 360
    };
    
    const inDegrees = value * toDegrees[from];
    const result = inDegrees / toDegrees[to];
    
    const labels: Record<string, string> = {
      'deg': '°', 'rad': 'рад', 'grad': 'град',
      'min': '′', 'sec': '″', 'turn': 'оборотов'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите угол, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Угол — геометрическая фигура, образованная двумя лучами, выходящими из одной точки (вершины).',
    usage: 'Используется в математике, геодезии, астрономии, физике, навигации, строительстве.',
    formula: '1 радиан = 180°/π ≈ 57.3°\n1 град = 0.9°\n1° = 60′ = 3600″\n1 оборот = 360° = 2π рад',
    faq: [
      {
        question: 'Сколько радиан в градусе?',
        answer: '1° = π/180 ≈ 0.01745 радиан.'
      },
      {
        question: 'Что такое град?',
        answer: 'Град (gon) — единица измерения угла, равная 1/100 прямого угла (90°). 1 град = 0.9°.'
      }
    ],
    sources: [
      { title: 'Угол — Википедия', url: 'https://ru.wikipedia.org/wiki/Угол' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер информации (данных)
export const dataStorageConverter: Calculator = {
  id: 'data-storage-converter',
  slug: 'konverter-dannyh',
  title: 'Конвертер данных',
  description: 'Перевод байтов, килобайтов, мегабайтов, гигабайтов, терабайтов',
  category: 'konvertery',
  subcategory: 'conv-informaciya',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'b', label: 'Б — байты' },
        { value: 'kb', label: 'КБ — килобайты (1000 Б)' },
        { value: 'kib', label: 'КиБ — кибибайты (1024 Б)' },
        { value: 'mb', label: 'МБ — мегабайты' },
        { value: 'mib', label: 'МиБ — мебибайты' },
        { value: 'gb', label: 'ГБ — гигабайты' },
        { value: 'gib', label: 'ГиБ — гибибайты' },
        { value: 'tb', label: 'ТБ — терабайты' },
        { value: 'tib', label: 'ТиБ — тебибайты' },
        { value: 'pb', label: 'ПБ — петабайты' }
      ],
      defaultValue: 'gb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'b', label: 'Б — байты' },
        { value: 'kb', label: 'КБ — килобайты (1000 Б)' },
        { value: 'kib', label: 'КиБ — кибибайты (1024 Б)' },
        { value: 'mb', label: 'МБ — мегабайты' },
        { value: 'mib', label: 'МиБ — мебибайты' },
        { value: 'gb', label: 'ГБ — гигабайты' },
        { value: 'gib', label: 'ГиБ — гибибайты' },
        { value: 'tb', label: 'ТБ — терабайты' },
        { value: 'tib', label: 'ТиБ — тебибайты' },
        { value: 'pb', label: 'ПБ — петабайты' }
      ],
      defaultValue: 'mb'
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
    
    // Convert to bytes first (using decimal for KB/MB/GB, binary for KiB/MiB/GiB)
    const toBytes: Record<string, number> = {
      'b': 1,
      'kb': 1000,
      'kib': 1024,
      'mb': 1e6,
      'mib': 1048576,
      'gb': 1e9,
      'gib': 1073741824,
      'tb': 1e12,
      'tib': 1099511627776,
      'pb': 1e15
    };
    
    const inBytes = value * toBytes[from];
    const result = inBytes / toBytes[to];
    
    const labels: Record<string, string> = {
      'b': 'Б', 'kb': 'КБ', 'kib': 'КиБ',
      'mb': 'МБ', 'mib': 'МиБ', 'gb': 'ГБ', 'gib': 'ГиБ',
      'tb': 'ТБ', 'tib': 'ТиБ', 'pb': 'ПБ'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toExponential(4).replace(/\.?0+e/, 'e')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите объём данных, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Байт — единица хранения и обработки цифровой информации. Состоит из 8 бит.',
    usage: 'Используется в информатике, при работе с файлами, памятью, носителями информации.',
    formula: '1 КБ = 1000 Б (десятичная)\n1 КиБ = 1024 Б (двоичная)\n1 МБ = 10⁶ Б\n1 ГБ = 10⁹ Б',
    faq: [
      {
        question: 'Почему жёсткий диск на 1 ТБ показывает меньше?',
        answer: 'Производители используют десятичную систему (1 ТБ = 10¹² Б), а ОС используют двоичную (1 ТиБ = 2⁴⁰ Б). 1 ТБ = ~0.909 ТиБ.'
      },
      {
        question: 'Сколько байт в мегабайте?',
        answer: 'В десятичной системе: 1 МБ = 1 000 000 Б. В двоичной: 1 МиБ = 1 048 576 Б (1024²).'
      }
    ],
    sources: [
      { title: 'Байт — Википедия', url: 'https://ru.wikipedia.org/wiki/Байт' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер частоты
export const frequencyConverter: Calculator = {
  id: 'frequency-converter',
  slug: 'konverter-chastoty',
  title: 'Конвертер частоты',
  description: 'Перевод Герц, килогерц, мегагерц, гигагерц',
  category: 'konvertery',
  subcategory: 'conv-chastota',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'hz', label: 'Гц — Герцы' },
        { value: 'khz', label: 'кГц — килогерцы' },
        { value: 'mhz', label: 'МГц — мегагерцы' },
        { value: 'ghz', label: 'ГГц — гигагерцы' },
        { value: 'thz', label: 'ТГц — терагерцы' },
        { value: 'rpm', label: 'об/мин — оборотов в минуту' }
      ],
      defaultValue: 'mhz'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'hz', label: 'Гц — Герцы' },
        { value: 'khz', label: 'кГц — килогерцы' },
        { value: 'mhz', label: 'МГц — мегагерцы' },
        { value: 'ghz', label: 'ГГц — гигагерцы' },
        { value: 'thz', label: 'ТГц — терагерцы' },
        { value: 'rpm', label: 'об/мин — оборотов в минуту' }
      ],
      defaultValue: 'ghz'
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
    
    // Convert to Hz first
    const toHz: Record<string, number> = {
      'hz': 1,
      'khz': 1000,
      'mhz': 1e6,
      'ghz': 1e9,
      'thz': 1e12,
      'rpm': 1/60
    };
    
    const inHz = value * toHz[from];
    const result = inHz / toHz[to];
    
    const labels: Record<string, string> = {
      'hz': 'Гц', 'khz': 'кГц', 'mhz': 'МГц',
      'ghz': 'ГГц', 'thz': 'ТГц', 'rpm': 'об/мин'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите частоту, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Частота — физическая величина, показывающая количество повторений периодического процесса в единицу времени.',
    usage: 'Используется в физике, радиоэлектронике, акустике, механике, медицине.',
    formula: '1 кГц = 1000 Гц\n1 МГц = 10⁶ Гц\n1 ГГц = 10⁹ Гц\n1 об/мин = 1/60 Гц',
    faq: [
      {
        question: 'Сколько Гц в МГц?',
        answer: '1 мегагерц (МГц) = 1 000 000 герц (Гц) = 10⁶ Гц.'
      },
      {
        question: 'Что такое частота процессора?',
        answer: 'Частота процессора — количество тактов в секунду, определяет скорость работы. Измеряется в ГГц (миллиардах тактов в секунду).'
      }
    ],
    sources: [
      { title: 'Герц — Википедия', url: 'https://ru.wikipedia.org/wiki/Герц' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const extendedConverters = [
  volumeConverter,
  areaConverter,
  timeConverter,
  pressureConverter,
  energyConverter,
  powerConverter,
  speedExtendedConverter,
  angleConverter,
  dataStorageConverter,
  frequencyConverter,
];
