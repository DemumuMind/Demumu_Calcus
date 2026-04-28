import { Calculator } from '../types';

// Конвертер давления: Паскали в мм рт.ст.
export const pressurePascalToMmHg: Calculator = {
  id: 'pressure-pascal-mmhg',
  slug: 'paskali-v-mm-rt-st',
  title: 'Паскали в мм рт. ст.',
  description: 'Конвертер давления: перевод Паскалей в миллиметры ртутного столба',
  category: 'konvertery',
  subcategory: 'conv-davlenie',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '101325',
      defaultValue: 101325,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'pa', label: 'Па (Паскали)' },
        { value: 'mmhg', label: 'мм рт. ст.' },
        { value: 'atm', label: 'атм (физические атмосферы)' },
        { value: 'bar', label: 'бар' },
        { value: 'kpa', label: 'кПа (килопаскали)' },
        { value: 'mpa', label: 'МПа (мегапаскали)' },
        { value: 'psi', label: 'psi (фунт на кв. дюйм)' },
        { value: 'mwater', label: 'м вод. ст. (метры водяного столба)' }
      ],
      defaultValue: 'pa'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'pa', label: 'Па (Паскали)' },
        { value: 'mmhg', label: 'мм рт. ст.' },
        { value: 'atm', label: 'атм (физические атмосферы)' },
        { value: 'bar', label: 'бар' },
        { value: 'kpa', label: 'кПа (килопаскали)' },
        { value: 'mpa', label: 'МПа (мегапаскали)' },
        { value: 'psi', label: 'psi (фунт на кв. дюйм)' },
        { value: 'mwater', label: 'м вод. ст. (метры водяного столба)' }
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
    
    if (!value) return [{ value: '—', label: 'Результат' }];
    
    // Коэффициенты перевода в Паскали
    const toPascal: Record<string, number> = {
      'pa': 1,
      'mmhg': 133.322,
      'atm': 101325,
      'bar': 100000,
      'kpa': 1000,
      'mpa': 1000000,
      'psi': 6894.76,
      'mwater': 9806.65
    };
    
    // Переводим в Паскали
    const inPascals = value * toPascal[from];
    
    // Переводим из Паскалей в целевую единицу
    const result = inPascals / toPascal[to];
    
    const unitLabels: Record<string, string> = {
      'pa': 'Па',
      'mmhg': 'мм рт. ст.',
      'atm': 'атм',
      'bar': 'бар',
      'kpa': 'кПа',
      'mpa': 'МПа',
      'psi': 'psi',
      'mwater': 'м вод. ст.'
    };
    
    return [{
      value: `${value} ${unitLabels[from]} = ${result.toFixed(4)} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение давления, выберите единицы "из" и "в". Результат появится автоматически.',
    about: 'Давление измеряется в различных единицах. Медицина использует мм рт. ст., физика — Паскали, техника — бар и атмосферы.',
    usage: 'Используется в медицине (артериальное давление), метеорологии, технике, физике.',
    formula: '1 атм = 101325 Па = 760 мм рт. ст. = 1.01325 бар',
    faq: [
      {
        question: 'Что такое мм рт. ст.?',
        answer: 'Миллиметр ртутного столба — единица давления, равная давлению столба ртути высотой 1 мм. Используется в медицине для измерения артериального давления.'
      },
      {
        question: 'Сколько Паскалей в атмосфере?',
        answer: '1 физическая атмосфера (атм) = 101325 Паскалей (Па) = 101.325 кПа.'
      }
    ],
    sources: [
      { title: 'Единицы давления — Википедия', url: 'https://ru.wikipedia.org/wiki/Давление' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Конвертер площади: Сотки в м²
export const areaAreToSquareMeter: Calculator = {
  id: 'area-are-sqm',
  slug: 'sotki-v-kvadratnye-metry',
  title: 'Сотки в квадратные метры',
  description: 'Конвертер площади: перевод соток (аров) в квадратные метры и другие единицы',
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
        { value: 'sqm', label: 'м² (кв. метры)' },
        { value: 'are', label: 'сотки (ары)' },
        { value: 'ha', label: 'га (гектары)' },
        { value: 'acre', label: 'акры' },
        { value: 'sqkm', label: 'км² (кв. километры)' },
        { value: 'sqcm', label: 'см² (кв. сантиметры)' },
        { value: 'sqmm', label: 'мм² (кв. миллиметры)' }
      ],
      defaultValue: 'are'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'sqm', label: 'м² (кв. метры)' },
        { value: 'are', label: 'сотки (ары)' },
        { value: 'ha', label: 'га (гектары)' },
        { value: 'acre', label: 'акры' },
        { value: 'sqkm', label: 'км² (кв. километры)' },
        { value: 'sqcm', label: 'см² (кв. сантиметры)' },
        { value: 'sqmm', label: 'мм² (кв. миллиметры)' }
      ],
      defaultValue: 'sqm'
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
    
    // Коэффициенты перевода в м²
    const toSquareMeter: Record<string, number> = {
      'sqm': 1,
      'are': 100,        // 1 сотка = 100 м²
      'ha': 10000,       // 1 гектар = 10000 м²
      'acre': 4046.86,   // 1 акр ≈ 4047 м²
      'sqkm': 1000000,   // 1 км² = 1000000 м²
      'sqcm': 0.0001,    // 1 см² = 0.0001 м²
      'sqmm': 0.000001   // 1 мм² = 0.000001 м²
    };
    
    // Переводим в м²
    const inSqMeters = value * toSquareMeter[from];
    
    // Переводим из м² в целевую единицу
    const result = inSqMeters / toSquareMeter[to];
    
    const unitLabels: Record<string, string> = {
      'sqm': 'м²',
      'are': 'соток',
      'ha': 'га',
      'acre': 'акров',
      'sqkm': 'км²',
      'sqcm': 'см²',
      'sqmm': 'мм²'
    };
    
    return [{
      value: `${value} ${unitLabels[from]} = ${result.toFixed(4)} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите площадь, выберите единицы "из" и "в". Результат появится автоматически.',
    about: 'Площадь измеряется в различных единицаx. Сотки (ары) и гектары используются в сельском хозяйстве, квадратные метры — в строительстве, акры — в англоязычных странах.',
    usage: 'Используется при покупке земельных участков, планировании строительства, оформлении документов.',
    formula: '1 га = 100 соток = 10000 м² = 2.47 акра',
    faq: [
      {
        question: 'Сколько квадратных метров в сотке?',
        answer: '1 сотка (ар) = 100 квадратных метров. Это квадрат 10×10 метров.'
      },
      {
        question: 'Сколько соток в гектаре?',
        answer: '1 гектар (га) = 100 соток = 10000 кв. метров.'
      },
      {
        question: 'Что такое акр?',
        answer: 'Акр — единица площади в англоязычных странах. 1 акр ≈ 4047 кв. метров ≈ 40.5 соток.'
      }
    ],
    sources: [
      { title: 'Единицы площади — Википедия', url: 'https://ru.wikipedia.org/wiki/Площадь' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '6 соток в м²', url: '/sotki-v-kvadratnye-metry?value=6&from=are&to=sqm' },
    { value: '1000 м² в сотки', url: '/sotki-v-kvadratnye-metry?value=1000&from=sqm&to=are' },
    { value: '1 га в м²', url: '/sotki-v-kvadratnye-metry?value=1&from=ha&to=sqm' }
  ]
};

// Конвертер бар в атмосферы
export const pressureBarToAtm: Calculator = {
  id: 'pressure-bar-atm',
  slug: 'bar-v-atm',
  title: 'Бар в атмосферы',
  description: 'Конвертер давления: перевод баров в физические и технические атмосферы',
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
        { value: 'bar', label: 'бар' },
        { value: 'atm', label: 'атм (физ.)' },
        { value: 'at', label: 'ат (техн.)' },
        { value: 'mmhg', label: 'мм рт. ст.' },
        { value: 'kpa', label: 'кПа' }
      ],
      defaultValue: 'bar'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'bar', label: 'бар' },
        { value: 'atm', label: 'атм (физ.)' },
        { value: 'at', label: 'ат (техн.)' },
        { value: 'mmhg', label: 'мм рт. ст.' },
        { value: 'kpa', label: 'кПа' }
      ],
      defaultValue: 'atm'
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
    
    // Коэффициенты перевода в бары
    const toBar: Record<string, number> = {
      'bar': 1,
      'atm': 1.01325,      // 1 атм = 1.01325 бар
      'at': 0.980665,      // 1 ат = 0.980665 бар
      'mmhg': 0.00133322,  // 1 мм рт.ст. = 0.00133322 бар
      'kpa': 0.01          // 1 кПа = 0.01 бар
    };
    
    // Переводим в бары
    const inBars = value * toBar[from];
    
    // Переводим из баров в целевую единицу
    const result = inBars / toBar[to];
    
    const unitLabels: Record<string, string> = {
      'bar': 'бар',
      'atm': 'атм',
      'at': 'ат',
      'mmhg': 'мм рт. ст.',
      'kpa': 'кПа'
    };
    
    return [{
      value: `${value} ${unitLabels[from]} = ${result.toFixed(4)} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение давления, выберите единицы "из" и "в".',
    about: 'Бар и атмосфера — распространённые единицы давления в технике и физике. 1 бар приблизительно равен 1 атмосфере.',
    usage: 'Используется в технике для измерения давления в системах, шинах, гидравлике.',
    formula: '1 бар ≈ 0.987 атм ≈ 750 мм рт. ст.',
    faq: [
      {
        question: 'В чём разница между атм и ат?',
        answer: 'атм (физическая атмосфера) = 101325 Па. ат (техническая атмосфера) = 98066.5 Па = 1 кгс/см².'
      }
    ],
    sources: [
      { title: 'Бар (единица) — Википедия', url: 'https://ru.wikipedia.org/wiki/Бар_(единица)' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Конвертер гектаров в квадратные километры
export const areaHectareToSquareKm: Calculator = {
  id: 'area-ha-sqkm',
  slug: 'gektary-v-kvadratnye-kilometry',
  title: 'Гектары в квадратные километры',
  description: 'Перевод площади из гектаров в квадратные километры и другие единицы',
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
        { value: 'ha', label: 'га (гектары)' },
        { value: 'sqkm', label: 'км²' },
        { value: 'sqm', label: 'м²' },
        { value: 'are', label: 'сотки' },
        { value: 'acre', label: 'акры' }
      ],
      defaultValue: 'ha'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'ha', label: 'га (гектары)' },
        { value: 'sqkm', label: 'км²' },
        { value: 'sqm', label: 'м²' },
        { value: 'are', label: 'сотки' },
        { value: 'acre', label: 'акры' }
      ],
      defaultValue: 'sqkm'
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
    
    // Коэффициенты перевода в м²
    const toSqMeter: Record<string, number> = {
      'ha': 10000,
      'sqkm': 1000000,
      'sqm': 1,
      'are': 100,
      'acre': 4046.86
    };
    
    // Переводим в м²
    const inSqMeters = value * toSqMeter[from];
    
    // Переводим из м² в целевую единицу
    const result = inSqMeters / toSqMeter[to];
    
    const unitLabels: Record<string, string> = {
      'ha': 'га',
      'sqkm': 'км²',
      'sqm': 'м²',
      'are': 'соток',
      'acre': 'акров'
    };
    
    return [{
      value: `${value} ${unitLabels[from]} = ${result.toFixed(4)} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите площадь, выберите единицы "из" и "в".',
    about: 'Гектар и квадратный километр — крупные единицы площади, используемые для измерения земельных массивов, лесов, полей.',
    usage: 'Используется в сельском хозяйстве, лесничестве, градостроительстве.',
    formula: '1 км² = 100 га = 10000 соток',
    faq: [
      {
        question: 'Сколько гектаров в квадратном километре?',
        answer: '1 квадратный километр = 100 гектаров.'
      }
    ],
    sources: [
      { title: 'Гектар — Википедия', url: 'https://ru.wikipedia.org/wiki/Гектар' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Конвертер PSI в бар
export const pressurePsiToBar: Calculator = {
  id: 'pressure-psi-bar',
  slug: 'psi-v-bar',
  title: 'PSI в бар',
  description: 'Конвертер давления: фунты на квадратный дюйм в бары',
  category: 'konvertery',
  subcategory: 'conv-davlenie',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'psi', label: 'psi' },
        { value: 'bar', label: 'бар' },
        { value: 'kpa', label: 'кПа' },
        { value: 'atm', label: 'атм' }
      ],
      defaultValue: 'psi'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'psi', label: 'psi' },
        { value: 'bar', label: 'бар' },
        { value: 'kpa', label: 'кПа' },
        { value: 'atm', label: 'атм' }
      ],
      defaultValue: 'bar'
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
    
    // Коэффициенты перевода в psi
    const toPsi: Record<string, number> = {
      'psi': 1,
      'bar': 14.5038,
      'kpa': 0.145038,
      'atm': 14.6959
    };
    
    // Переводим в psi
    const inPsi = value * toPsi[from];
    
    // Переводим из psi в целевую единицу
    const result = inPsi / toPsi[to];
    
    const unitLabels: Record<string, string> = {
      'psi': 'psi',
      'bar': 'бар',
      'kpa': 'кПа',
      'atm': 'атм'
    };
    
    return [{
      value: `${value} ${unitLabels[from]} = ${result.toFixed(4)} ${unitLabels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите давление, выберите единицы "из" и "в".',
    about: 'PSI (pounds per square inch) — единица давления в англоязычных странах. Часто используется для давления в шинах.',
    usage: 'Используется для перевода давления шин из инструкций (обычно в psi) в привычные бары или атмосферы.',
    formula: '1 бар ≈ 14.5 psi, 1 атм ≈ 14.7 psi',
    faq: [
      {
        question: 'Сколько PSI в автомобильной шине?',
        answer: 'Обычно 30-35 psi (≈2.0-2.4 бара) для легковых автомобилей.'
      }
    ],
    sources: [
      { title: 'Фунт-сила на квадратный дюйм — Википедия', url: 'https://ru.wikipedia.org/wiki/Фунт-сила_на_квадратный_дюйм' }
    ],
    updatedAt: '2026-04-27'
  }
};

export const pressureAreaConverters: Calculator[] = [
  pressurePascalToMmHg,
  areaAreToSquareMeter,
  pressureBarToAtm,
  areaHectareToSquareKm,
  pressurePsiToBar
];
