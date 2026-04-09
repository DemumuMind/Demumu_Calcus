import { Calculator } from '../types';

// Конвертер плотности
export const densityConverter: Calculator = {
  id: 'density-basic-converter',
  slug: 'konverter-plotnosti',
  title: 'Конвертер плотности',
  description: 'Перевод кг/м³, г/см³, кг/л, фунтов/галлон',
  category: 'konvertery',
  subcategory: 'conv-plotnost',
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
        { value: 'kg_m3', label: 'кг/м³ — килограммы на кубометр' },
        { value: 'g_cm3', label: 'г/см³ — граммы на кубический сантиметр' },
        { value: 'kg_l', label: 'кг/л — килограммы на литр' },
        { value: 'g_ml', label: 'г/мл — граммы на миллилитр' },
        { value: 'lb_ft3', label: 'lb/ft³ — фунты на кубический фут' },
        { value: 'lb_gal', label: 'lb/gal — фунты на галлон' }
      ],
      defaultValue: 'g_cm3'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'kg_m3', label: 'кг/м³ — килограммы на кубометр' },
        { value: 'g_cm3', label: 'г/см³ — граммы на кубический сантиметр' },
        { value: 'kg_l', label: 'кг/л — килограммы на литр' },
        { value: 'g_ml', label: 'г/мл — граммы на миллилитр' },
        { value: 'lb_ft3', label: 'lb/ft³ — фунты на кубический фут' },
        { value: 'lb_gal', label: 'lb/gal — фунты на галлон' }
      ],
      defaultValue: 'kg_m3'
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
    
    // Convert to kg/m³ first
    const toKgM3: Record<string, number> = {
      'kg_m3': 1,
      'g_cm3': 1000,
      'kg_l': 1000,
      'g_ml': 1000,
      'lb_ft3': 16.0185,
      'lb_gal': 119.826
    };
    
    const inKgM3 = value * toKgM3[from];
    const result = inKgM3 / toKgM3[to];
    
    const labels: Record<string, string> = {
      'kg_m3': 'кг/м³', 'g_cm3': 'г/см³', 'kg_l': 'кг/л',
      'g_ml': 'г/мл', 'lb_ft3': 'lb/ft³', 'lb_gal': 'lb/gal'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение плотности, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Плотность — физическая величина, равная отношению массы тела к его объёму. Основная единица в СИ — кг/м³.',
    usage: 'Используется в физике, химии, инженерии, для определения качества продуктов, топлива.',
    formula: '1 г/см³ = 1000 кг/м³ = 1 кг/л\nПлотность воды = 1000 кг/м³ = 1 г/см³',
    faq: [
      {
        question: 'Какая плотность у воды?',
        answer: 'Плотность воды при 4°C = 1000 кг/м³ = 1 г/см³ = 1 кг/л.'
      },
      {
        question: 'Какая плотность у разных материалов?',
        answer: 'Воздух: ~1.2 кг/м³, Вода: 1000 кг/м³, Алюминий: 2700 кг/м³, Железо: 7870 кг/м³, Золото: 19300 кг/м³.'
      }
    ],
    sources: [
      { title: 'Плотность — Википедия', url: 'https://ru.wikipedia.org/wiki/Плотность' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер силы
export const forceConverter: Calculator = {
  id: 'force-converter',
  slug: 'konverter-sily',
  title: 'Конвертер силы',
  description: 'Перевод Ньютонов, килограмм-силы, фунтов-силы, дин',
  category: 'konvertery',
  subcategory: 'conv-sila',
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
        { value: 'n', label: 'Н — Ньютоны' },
        { value: 'kn', label: 'кН — килоньютоны' },
        { value: 'kgf', label: 'кгс — килограмм-силы' },
        { value: 'lbf', label: 'lbf — фунты-силы' },
        { value: 'dyn', label: 'дин — дины' }
      ],
      defaultValue: 'n'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'n', label: 'Н — Ньютоны' },
        { value: 'kn', label: 'кН — килоньютоны' },
        { value: 'kgf', label: 'кгс — килограмм-силы' },
        { value: 'lbf', label: 'lbf — фунты-силы' },
        { value: 'dyn', label: 'дин — дины' }
      ],
      defaultValue: 'kgf'
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
    
    // Convert to Newtons first
    const toNewtons: Record<string, number> = {
      'n': 1,
      'kn': 1000,
      'kgf': 9.80665,
      'lbf': 4.44822,
      'dyn': 1e-5
    };
    
    const inNewtons = value * toNewtons[from];
    const result = inNewtons / toNewtons[to];
    
    const labels: Record<string, string> = {
      'n': 'Н', 'kn': 'кН', 'kgf': 'кгс', 'lbf': 'lbf', 'dyn': 'дин'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение силы, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Сила — векторная физическая величина, характеризующая интенсивность воздействия на тело. Основная единица в СИ — Ньютон (Н).',
    usage: 'Используется в физике, инженерии, механике, строительстве.',
    formula: '1 Н = 1 кг⋅м/с²\n1 кгс = 9.81 Н ≈ 9.8 Н\n1 lbf = 4.45 Н',
    faq: [
      {
        question: 'Что такое Ньютон?',
        answer: 'Ньютон (Н) — единица силы в СИ. 1 Н — это сила, которая сообщает массе 1 кг ускорение 1 м/с².'
      },
      {
        question: 'Сколько Ньютонов в килограмме?',
        answer: 'Масса 1 кг на Земле притягивается с силой примерно 9.8 Н (или 1 кгс — килограмм-сила).'
      }
    ],
    sources: [
      { title: 'Сила — Википедия', url: 'https://ru.wikipedia.org/wiki/Сила' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер электрического сопротивления
export const resistanceConverter: Calculator = {
  id: 'resistance-converter',
  slug: 'konverter-soprotivleniya',
  title: 'Конвертер электрического сопротивления',
  description: 'Перевод Ом, килоом, мегаом, гигаом',
  category: 'konvertery',
  subcategory: 'conv-elektrichestvo',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'ohm', label: 'Ом — Омы' },
        { value: 'mohm', label: 'мОм — миллиомы' },
        { value: 'kohm', label: 'кОм — килоомы' },
        { value: 'mohm_big', label: 'МОм — мегаомы' },
        { value: 'gohm', label: 'ГОм — гигаомы' }
      ],
      defaultValue: 'ohm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'ohm', label: 'Ом — Омы' },
        { value: 'mohm', label: 'мОм — миллиомы' },
        { value: 'kohm', label: 'кОм — килоомы' },
        { value: 'mohm_big', label: 'МОм — мегаомы' },
        { value: 'gohm', label: 'ГОм — гигаомы' }
      ],
      defaultValue: 'kohm'
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
    
    // Convert to Ohms first
    const toOhms: Record<string, number> = {
      'ohm': 1,
      'mohm': 0.001,
      'kohm': 1000,
      'mohm_big': 1e6,
      'gohm': 1e9
    };
    
    const inOhms = value * toOhms[from];
    const result = inOhms / toOhms[to];
    
    const labels: Record<string, string> = {
      'ohm': 'Ом', 'mohm': 'мОм', 'kohm': 'кОм',
      'mohm_big': 'МОм', 'gohm': 'ГОм'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toExponential(4).replace(/\.?0+e/, 'e')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение сопротивления, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Электрическое сопротивление — физическая величина, характеризующая свойство тела препятствовать прохождению электрического тока.',
    usage: 'Используется в электротехнике, электронике, радиотехнике.',
    formula: '1 кОм = 1000 Ом\n1 МОм = 1 000 000 Ом = 10⁶ Ом\n1 ГОм = 10⁹ Ом',
    faq: [
      {
        question: 'Что такое Ом?',
        answer: 'Ом (Ω) — единица электрического сопротивления в СИ. 1 Ом — сопротивление, при котором при напряжении 1 В течёт ток 1 А.'
      },
      {
        question: 'Какие бывают номиналы резисторов?',
        answer: 'Стандартные ряды: E24 (5%), E96 (1%). Частые значения: 100 Ом, 1 кОм, 10 кОм, 100 кОм, 1 МОм.'
      }
    ],
    sources: [
      { title: 'Электрическое сопротивление — Википедия', url: 'https://ru.wikipedia.org/wiki/Электрическое_сопротивление' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер вязкости
export const viscosityConverter: Calculator = {
  id: 'viscosity-converter',
  slug: 'konverter-vyazkosti',
  title: 'Конвертер вязкости',
  description: 'Перевод Па⋅с, Пуаз, сСт, кинематической вязкости',
  category: 'konvertery',
  subcategory: 'conv-vyazkost',
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
        { value: 'pa_s', label: 'Па⋅с — Паскаль-секунды' },
        { value: 'poise', label: 'П — Пуазы' },
        { value: 'cp', label: 'сП — сантмпуазы' },
        { value: 'st', label: 'Ст — Стоксы' },
        { value: 'cst', label: 'сСт — сантистоксы' }
      ],
      defaultValue: 'cp'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'pa_s', label: 'Па⋅с — Паскаль-секунды' },
        { value: 'poise', label: 'П — Пуазы' },
        { value: 'cp', label: 'сП — сантмпуазы' },
        { value: 'st', label: 'Ст — Стоксы' },
        { value: 'cst', label: 'сСт — сантистоксы' }
      ],
      defaultValue: 'pa_s'
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
    
    // Convert to Pa·s (dynamic) or St (kinematic) first
    // Note: St and cSt are kinematic (different dimension), approximation used
    const toPas: Record<string, number> = {
      'pa_s': 1,
      'poise': 0.1,
      'cp': 0.001,
      'st': 0.0001,  // rough approximation without density
      'cst': 1e-7
    };
    
    const inPas = value * toPas[from];
    const result = inPas / toPas[to];
    
    const labels: Record<string, string> = {
      'pa_s': 'Па⋅с', 'poise': 'П', 'cp': 'сП', 'st': 'Ст', 'cst': 'сСт'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toExponential(4).replace(/\.?0+e/, 'e')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение вязкости, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Вязкость — свойство реальных жидкостей и газов оказывать сопротивление перемещению одной части относительно другой.',
    usage: 'Используется в инженерии, нефтепереработке, химии, для выбора масел и смазок.',
    formula: '1 Па⋅с = 10 П = 1000 сП\n1 сП = 1 мПа⋅с\nВода при 20°C: ~1 сП',
    faq: [
      {
        question: 'Что такое вязкость?',
        answer: 'Вязкость — мера текучести жидкости. Высокая вязкость = густая жидкость (мёд, масло). Низкая вязкость = жидкая (вода, спирт).'
      },
      {
        question: 'Какая вязкость у масла?',
        answer: 'Моторные масла обычно 5-20 сП (5W-30, 10W-40). Густые масла (SAE 50) — 100-200 сП при рабочей температуре.'
      }
    ],
    sources: [
      { title: 'Вязкость — Википедия', url: 'https://ru.wikipedia.org/wiki/Вязкость' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер расхода (потока)
export const flowRateConverter: Calculator = {
  id: 'flow-rate-converter',
  slug: 'konverter-rashoda',
  title: 'Конвертер расхода',
  description: 'Перевод м³/с, л/мин, м³/ч, галлонов в минуту (GPM)',
  category: 'konvertery',
  subcategory: 'conv-rashod',
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
        { value: 'm3_s', label: 'м³/с — кубометры в секунду' },
        { value: 'm3_h', label: 'м³/ч — кубометры в час' },
        { value: 'l_s', label: 'л/с — литры в секунду' },
        { value: 'l_min', label: 'л/мин — литры в минуту' },
        { value: 'l_h', label: 'л/ч — литры в час' },
        { value: 'gpm', label: 'GPM — галлоны в минуту (US)' },
        { value: 'gph', label: 'GPH — галлоны в час (US)' }
      ],
      defaultValue: 'l_min'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'm3_s', label: 'м³/с — кубометры в секунду' },
        { value: 'm3_h', label: 'м³/ч — кубометры в час' },
        { value: 'l_s', label: 'л/с — литры в секунду' },
        { value: 'l_min', label: 'л/мин — литры в минуту' },
        { value: 'l_h', label: 'л/ч — литры в час' },
        { value: 'gpm', label: 'GPM — галлоны в минуту (US)' },
        { value: 'gph', label: 'GPH — галлоны в час (US)' }
      ],
      defaultValue: 'm3_h'
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
    
    // Convert to m³/s first
    const toM3s: Record<string, number> = {
      'm3_s': 1,
      'm3_h': 1/3600,
      'l_s': 0.001,
      'l_min': 0.001/60,
      'l_h': 0.001/3600,
      'gpm': 0.0000630902,
      'gph': 0.0000630902/60
    };
    
    const inM3s = value * toM3s[from];
    const result = inM3s / toM3s[to];
    
    const labels: Record<string, string> = {
      'm3_s': 'м³/с', 'm3_h': 'м³/ч', 'l_s': 'л/с',
      'l_min': 'л/мин', 'l_h': 'л/ч', 'gpm': 'GPM', 'gph': 'GPH'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение расхода, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Объёмный расход — объём жидкости или газа, проходящий через сечение в единицу времени.',
    usage: 'Используется в сантехнике, инженерии, водоснабжении, выборе насосов и счётчиков.',
    formula: '1 м³/ч = 1000 л/ч = 16.67 л/мин\n1 GPM (US) = 3.785 л/мин\n1 л/с = 3.6 м³/ч',
    faq: [
      {
        question: 'Какой нормальный расход воды из крана?',
        answer: 'Обычный кран: 6-12 л/мин. Экономичный аэратор: 4-6 л/мин. Душ: 8-15 л/мин.'
      },
      {
        question: 'Сколько литров в кубометре?',
        answer: '1 кубометр (м³) = 1000 литров (л). Кубометр — это куб со стороной 1 метр (100 см).'
      }
    ],
    sources: [
      { title: 'Расход жидкости — Википедия', url: 'https://ru.wikipedia.org/wiki/Расход' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер яркости
export const luminanceConverter: Calculator = {
  id: 'luminance-converter',
  slug: 'konverter-yarkosti',
  title: 'Конвертер яркости',
  description: 'Перевод нит, кд/м², фут-ламберт, стильб',
  category: 'konvertery',
  subcategory: 'conv-svet',
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
        { value: 'cd_m2', label: 'кд/м² — канделы на квадратный метр' },
        { value: 'nit', label: 'нт — ниты' },
        { value: 'ftL', label: 'fL — фут-ламберты' },
        { value: 'sb', label: 'сб — стильбы' },
        { value: 'asb', label: 'асб — апостильбы' }
      ],
      defaultValue: 'cd_m2'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'cd_m2', label: 'кд/м² — канделы на квадратный метр' },
        { value: 'nit', label: 'нт — ниты' },
        { value: 'ftL', label: 'fL — фут-ламберты' },
        { value: 'sb', label: 'сб — стильбы' },
        { value: 'asb', label: 'асб — апостильбы' }
      ],
      defaultValue: 'nit'
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
    
    // Convert to cd/m² first
    const toCdM2: Record<string, number> = {
      'cd_m2': 1,
      'nit': 1,
      'ftL': 3.42626,
      'sb': 10000,
      'asb': 0.31831
    };
    
    const inCdM2 = value * toCdM2[from];
    const result = inCdM2 / toCdM2[to];
    
    const labels: Record<string, string> = {
      'cd_m2': 'кд/м²', 'nit': 'нт', 'ftL': 'fL', 'sb': 'сб', 'asb': 'асб'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение яркости, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Яркость — фотометрическая величина, характеризующая световую плотность светового потока, испускаемого поверхностью.',
    usage: 'Используется в оптике, фотографии, телевидении, производстве дисплеев.',
    formula: '1 нит = 1 кд/м²\n1 стильб = 10 000 кд/м²\n1 фут-ламберт ≈ 3.426 кд/м²',
    faq: [
      {
        question: 'Какая яркость у разных источников?',
        answer: 'Солнце: ~1.6×10⁹ кд/м². Лампа накаливания: ~10⁷ кд/м². Монитор: 250-500 кд/м². Луна: ~2500 кд/м².'
      },
      {
        question: 'Что такое нит?',
        answer: 'Нит (nt) — единица яркости в системе СГС, равна канделе на квадратный метр. 1 нит = 1 кд/м².'
      }
    ],
    sources: [
      { title: 'Яркость — Википедия', url: 'https://ru.wikipedia.org/wiki/Яркость' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер активности радионуклидов
export const radioactivityConverter: Calculator = {
  id: 'radioactivity-converter',
  slug: 'konverter-radioaktivnosti',
  title: 'Конвертер активности радионуклидов',
  description: 'Перевод Беккерелей, Кюри, Грэй, Зиверт',
  category: 'konvertery',
  subcategory: 'conv-radiaciya',
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
        { value: 'bq', label: 'Бк — Беккерели' },
        { value: 'kbq', label: 'кБк — килобеккерели' },
        { value: 'mbq', label: 'МБк — мегабеккерели' },
        { value: 'ci', label: 'Ки — Кюри' },
        { value: 'mci', label: 'мКи — милликюри' },
        { value: 'uci', label: 'мкКи — микрокюри' }
      ],
      defaultValue: 'bq'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'bq', label: 'Бк — Беккерели' },
        { value: 'kbq', label: 'кБк — килобеккерели' },
        { value: 'mbq', label: 'МБк — мегабеккерели' },
        { value: 'ci', label: 'Ки — Кюри' },
        { value: 'mci', label: 'мКи — милликюри' },
        { value: 'uci', label: 'мкКи — микрокюри' }
      ],
      defaultValue: 'ci'
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
    
    // Convert to Bq first
    const toBq: Record<string, number> = {
      'bq': 1,
      'kbq': 1000,
      'mbq': 1e6,
      'ci': 3.7e10,
      'mci': 3.7e7,
      'uci': 3.7e4
    };
    
    const inBq = value * toBq[from];
    const result = inBq / toBq[to];
    
    const labels: Record<string, string> = {
      'bq': 'Бк', 'kbq': 'кБк', 'mbq': 'МБк',
      'ci': 'Ки', 'mci': 'мКи', 'uci': 'мкКи'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toExponential(4).replace(/\.?0+e/, 'e')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение активности, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Активность радионуклида — количество распадов в единицу времени. Основная единица в СИ — Беккерель (Бк).',
    usage: 'Используется в ядерной медицине, радиологии, контроле радиации, датчиках дыма.',
    formula: '1 Бк = 1 распад в секунду\n1 Кюри = 3.7 × 10¹⁰ Бк = 37 ГБк',
    faq: [
      {
        question: 'Что такое Беккерель?',
        answer: 'Беккерель (Бк) — единица активности радионуклида в СИ. 1 Бк = одно ядерное превращение в секунду.'
      },
      {
        question: 'Что такое Кюри?',
        answer: 'Кюри (Ки) — устаревшая единица, равная активности 1 грамма радия-226. 1 Ки = 3.7 × 10¹⁰ Бк.'
      }
    ],
    sources: [
      { title: 'Беккерель — Википедия', url: 'https://ru.wikipedia.org/wiki/Беккерель' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер нефтяных баррелей
export const oilConverter: Calculator = {
  id: 'oil-converter',
  slug: 'konverter-nefti',
  title: 'Конвертер нефти и топлива',
  description: 'Перевод баррелей, галлонов, литров, тонн нефти и нефтепродуктов',
  category: 'konvertery',
  subcategory: 'conv-neft',
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
        { value: 'bbl', label: 'bbl — баррели (нефтяные)' },
        { value: 'gal', label: 'gal — галлоны (US)' },
        { value: 'l', label: 'л — литры' },
        { value: 'm3', label: 'м³ — кубометры' },
        { value: 't', label: 'т — метрические тонны' }
      ],
      defaultValue: 'bbl'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'bbl', label: 'bbl — баррели (нефтяные)' },
        { value: 'gal', label: 'gal — галлоны (US)' },
        { value: 'l', label: 'л — литры' },
        { value: 'm3', label: 'м³ — кубометры' },
        { value: 't', label: 'т — метрические тонны' }
      ],
      defaultValue: 'l'
    },
    {
      name: 'product',
      label: 'Продукт',
      type: 'select',
      options: [
        { value: 'crude', label: 'Сырая нефть' },
        { value: 'gasoline', label: 'Бензин' },
        { value: 'diesel', label: 'Дизельное топливо' },
        { value: 'fuel_oil', label: 'Мазут' }
      ],
      defaultValue: 'crude'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    const product = String(inputs.product);
    
    if (!value) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Density by product (approximate, kg/m³)
    const densities: Record<string, number> = {
      'crude': 850,
      'gasoline': 750,
      'diesel': 840,
      'fuel_oil': 950
    };
    const density = densities[product];
    
    // Convert to liters first
    const toLiters: Record<string, number> = {
      'bbl': 158.987,
      'gal': 3.78541,
      'l': 1,
      'm3': 1000,
      't': 1000 / density  // tonnes to liters
    };
    
    const inLiters = value * toLiters[from];
    let result = inLiters / toLiters[to];
    
    // If converting to/from tonnes, apply density
    if (to === 't') {
      result = inLiters * density / 1000;
    }
    
    const labels: Record<string, string> = {
      'bbl': 'баррелей', 'gal': 'галлонов', 'l': 'литров',
      'm3': 'м³', 't': 'тонн'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(2)} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите объём или массу, выберите единицы, тип продукта. Калькулятор учитывает плотность разных нефтепродуктов.',
    about: 'Нефтяной баррель = 42 галлонам США = 158.987 литрам. Тонна — масса, зависит от плотности продукта.',
    usage: 'Используется в нефтегазовой отрасли, логистике, торговле, транспорте.',
    formula: '1 баррель нефти ≈ 159 литров ≈ 0.136 тонны\n1 баррель бензина ≈ 159 литров ≈ 0.119 тонны',
    faq: [
      {
        question: 'Сколько литров в барреле?',
        answer: '1 нефтяной баррель = 42 US галлона = 158.987 литров (точное значение).'
      },
      {
        question: 'Сколько баррелей в тонне нефти?',
        answer: '1 тонна нефти ≈ 7.33 барреля (при средней плотности 850 кг/м³).'
      }
    ],
    sources: [
      { title: 'Баррель — Википедия', url: 'https://ru.wikipedia.org/wiki/Баррель' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const advancedConverters = [
  densityConverter,
  forceConverter,
  resistanceConverter,
  viscosityConverter,
  flowRateConverter,
  luminanceConverter,
  radioactivityConverter,
  oilConverter,
];
