import { Calculator } from '../types';

// Helper for formatting results
function fmtResult(n: number): string {
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs < 1e-6 || abs >= 1e9) {
    return n.toExponential(4).replace(/e([+-]?)(\\d+)/, '×10^$1$2');
  }
  let s = n.toFixed(6);
  if (s.includes('.')) {
    s = s.replace(/\.?0+$/, '');
  }
  return s;
}

// Паскали в мм рт. ст.
export const pressurePaToMmHg: Calculator = {
  id: 'pressurePaToMmHg',
  slug: 'paskali-v-mm-rt-st',
  title: 'Паскали в мм рт. ст.',
  description: 'Перевод давления из Паскалей в миллиметры ртутного столба',
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
      options: [{ value: 'pa', label: 'Па (Паскали)' }],
      defaultValue: 'pa'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'mmhg', label: 'мм рт. ст.' }],
      defaultValue: 'mmhg'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0075006157584566;
    return [{
      value: `${value} Па = ${fmtResult(result)} мм рт. ст.`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в Паскалях, результат в мм рт. ст. появится автоматически.",
    "about": "Конвертер Паскалей в миллиметры ртутного столба. Используется в медицине для артериального давления.",
    "formula": "1 Па ≈ 0.00750062 мм рт. ст.",
    "faq": [
      {
        "question": "Что такое мм рт. ст.?",
        "answer": "Миллиметр ртутного столба — единица давления, равная давлению столба ртути высотой 1 мм."
      },
      {
        "question": "Сколько Па в 1 мм рт. ст.?",
        "answer": "1 мм рт. ст. ≈ 133.322 Па."
      }
    ],
    "sources": [
      {
        "title": "Единицы давления — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Давление"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "101325 Па в мм рт. ст.",
      "url": "/paskali-v-mm-rt-st?value=101325&from=pa&to=mmhg"
    },
    {
      "value": "1000 Па в мм рт. ст.",
      "url": "/paskali-v-mm-rt-st?value=1000&from=pa&to=mmhg"
    },
    {
      "value": "133.322 Па в мм рт. ст.",
      "url": "/paskali-v-mm-rt-st?value=133.322&from=pa&to=mmhg"
    }
  ]
};

// мм рт. ст. в Паскали
export const pressureMmHgToPa: Calculator = {
  id: 'pressureMmHgToPa',
  slug: 'mm-rt-st-v-paskali',
  title: 'мм рт. ст. в Паскали',
  description: 'Перевод давления из миллиметров ртутного столба в Паскали',
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
      options: [{ value: 'mmhg', label: 'мм рт. ст.' }],
      defaultValue: 'mmhg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'pa', label: 'Па (Паскали)' }],
      defaultValue: 'pa'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 133.322;
    return [{
      value: `${value} мм рт. ст. = ${fmtResult(result)} Па`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в мм рт. ст., результат в Паскалях появится автоматически.",
    "about": "Конвертер миллиметров ртутного столба в Паскали. Часто нужен для перевода медицинских показателей.",
    "formula": "1 мм рт. ст. = 133.322 Па",
    "faq": [
      {
        "question": "Как перевести артериальное давление в Паскали?",
        "answer": "Умножьте значение в мм рт. ст. на 133.322. Например, 120 мм рт. ст. ≈ 15998.64 Па."
      },
      {
        "question": "Почему в медицине используют мм рт. ст.?",
        "answer": "Исторически сложилось: ртутный барометр и тонометр дали удобную шкалу измерения."
      }
    ],
    "sources": [
      {
        "title": "Единицы давления — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Давление"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "760 мм рт. ст. в Па",
      "url": "/mm-rt-st-v-paskali?value=760&from=mmhg&to=pa"
    },
    {
      "value": "120 мм рт. ст. в Па",
      "url": "/mm-rt-st-v-paskali?value=120&from=mmhg&to=pa"
    },
    {
      "value": "1 мм рт. ст. в Па",
      "url": "/mm-rt-st-v-paskali?value=1&from=mmhg&to=pa"
    }
  ]
};

// Бар в атмосферы
export const pressureBarToAtm: Calculator = {
  id: 'pressureBarToAtm',
  slug: 'bar-v-atm',
  title: 'Бар в атмосферы',
  description: 'Перевод давления из баров в физические атмосферы',
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
      options: [{ value: 'bar', label: 'бар' }],
      defaultValue: 'bar'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'atm', label: 'атм (физ. атмосферы)' }],
      defaultValue: 'atm'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.9869232667160128;
    return [{
      value: `${value} бар = ${fmtResult(result)} атм`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в барах, результат в атмосферах появится автоматически.",
    "about": "Конвертер баров в физические атмосферы. Бар и атмосфера — близкие единицы, часто используемые в технике.",
    "formula": "1 бар ≈ 0.986923 атм",
    "faq": [
      {
        "question": "В чём разница между баром и атмосферой?",
        "answer": "1 бар = 100 000 Па. 1 атм = 101 325 Па. Разница около 1.3%."
      },
      {
        "question": "Где используют бар?",
        "answer": "В метеорологии, технике, науке. Бар удобен, так как близок к атмосферному давлению."
      }
    ],
    "sources": [
      {
        "title": "Бар (единица) — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Бар_(единица)"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 бар в атм",
      "url": "/bar-v-atm?value=1&from=bar&to=atm"
    },
    {
      "value": "2 бара в атм",
      "url": "/bar-v-atm?value=2&from=bar&to=atm"
    },
    {
      "value": "1013.25 мбар в атм",
      "url": "/bar-v-atm?value=1.01325&from=bar&to=atm"
    }
  ]
};

// Атмосферы в бар
export const pressureAtmToBar: Calculator = {
  id: 'pressureAtmToBar',
  slug: 'atm-v-bar',
  title: 'Атмосферы в бар',
  description: 'Перевод давления из физических атмосфер в бары',
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
      options: [{ value: 'atm', label: 'атм (физ. атмосферы)' }],
      defaultValue: 'atm'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'bar', label: 'бар' }],
      defaultValue: 'bar'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1.01325;
    return [{
      value: `${value} атм = ${fmtResult(result)} бар`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в атмосферах, результат в барах появится автоматически.",
    "about": "Конвертер физических атмосфер в бары. Используется для перевода стандартных условий в технические единицы.",
    "formula": "1 атм = 1.01325 бар",
    "faq": [
      {
        "question": "Что такое стандартная атмосфера?",
        "answer": "Это давление 101 325 Па, принятое за стандарт при стандартных условиях."
      },
      {
        "question": "Сколько баров в 2 атмосферах?",
        "answer": "2 атм ≈ 2.0265 бара."
      }
    ],
    "sources": [
      {
        "title": "Атмосфера (единица) — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Атмосфера_(единица)"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 атм в бар",
      "url": "/atm-v-bar?value=1&from=atm&to=bar"
    },
    {
      "value": "5 атм в бар",
      "url": "/atm-v-bar?value=5&from=atm&to=bar"
    },
    {
      "value": "0.5 атм в бар",
      "url": "/atm-v-bar?value=0.5&from=atm&to=bar"
    }
  ]
};

// Бар в Паскали
export const pressureBarToPa: Calculator = {
  id: 'pressureBarToPa',
  slug: 'bar-v-paskali',
  title: 'Бар в Паскали',
  description: 'Перевод давления из баров в Паскали',
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
      options: [{ value: 'bar', label: 'бар' }],
      defaultValue: 'bar'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'pa', label: 'Па (Паскали)' }],
      defaultValue: 'pa'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 100000;
    return [{
      value: `${value} бар = ${fmtResult(result)} Па`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в барах, результат в Паскалях появится автоматически.",
    "about": "Конвертер баров в Паскали. Бар — популярная внесистемная единица, удобная для практических расчётов.",
    "formula": "1 бар = 100 000 Па",
    "faq": [
      {
        "question": "Почему 1 бар = 100 000 Па?",
        "answer": "Бар определён как 10^5 Па по системе Си для удобства использования в технике."
      },
      {
        "question": "Сколько Па в 2 барах?",
        "answer": "2 бара = 200 000 Па."
      }
    ],
    "sources": [
      {
        "title": "Бар (единица) — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Бар_(единица)"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 бар в Па",
      "url": "/bar-v-paskali?value=1&from=bar&to=pa"
    },
    {
      "value": "0.5 бара в Па",
      "url": "/bar-v-paskali?value=0.5&from=bar&to=pa"
    },
    {
      "value": "10 бар в Па",
      "url": "/bar-v-paskali?value=10&from=bar&to=pa"
    }
  ]
};

// Паскали в бар
export const pressurePaToBar: Calculator = {
  id: 'pressurePaToBar',
  slug: 'paskali-v-bar',
  title: 'Паскали в бар',
  description: 'Перевод давления из Паскалей в бары',
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
      options: [{ value: 'pa', label: 'Па (Паскали)' }],
      defaultValue: 'pa'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'bar', label: 'бар' }],
      defaultValue: 'bar'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.00001;
    return [{
      value: `${value} Па = ${fmtResult(result)} бар`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в Паскалях, результат в барах появится автоматически.",
    "about": "Конвертер Паскалей в бары. Удобен для перевода научных данных в бытовые единицы.",
    "formula": "1 Па = 0.00001 бар",
    "faq": [
      {
        "question": "Что такое Паскаль?",
        "answer": "Паскаль (Па) — единица давления в СИ, равная 1 Ньютону на квадратный метр."
      },
      {
        "question": "Сколько баров в 101325 Па?",
        "answer": "101 325 Па = 1.01325 бара (стандартная атмосфера)."
      }
    ],
    "sources": [
      {
        "title": "Паскаль (единица) — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Паскаль_(единица)"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "100000 Па в бар",
      "url": "/paskali-v-bar?value=100000&from=pa&to=bar"
    },
    {
      "value": "101325 Па в бар",
      "url": "/paskali-v-bar?value=101325&from=pa&to=bar"
    },
    {
      "value": "50000 Па в бар",
      "url": "/paskali-v-bar?value=50000&from=pa&to=bar"
    }
  ]
};

// PSI в бар
export const pressurePsiToBar: Calculator = {
  id: 'pressurePsiToBar',
  slug: 'psi-v-bar',
  title: 'PSI в бар',
  description: 'Перевод давления из фунтов на квадратный дюйм в бары',
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
      options: [{ value: 'psi', label: 'psi' }],
      defaultValue: 'psi'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'bar', label: 'бар' }],
      defaultValue: 'bar'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0689475729317831;
    return [{
      value: `${value} psi = ${fmtResult(result)} бар`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в psi, результат в барах появится автоматически.",
    "about": "Конвертер PSI в бары. PSI (pound per square inch) — единица давления в англоязычных странах.",
    "formula": "1 psi ≈ 0.0689476 бар",
    "faq": [
      {
        "question": "Сколько psi в автомобильной шине?",
        "answer": "Обычно 30–35 psi (≈ 2.0–2.4 бара) для легковых автомобилей."
      },
      {
        "question": "Почему в США используют psi?",
        "answer": "Это часть имперской системы мер, исторически распространённой в англоязычных странах."
      }
    ],
    "sources": [
      {
        "title": "Фунт-сила на квадратный дюйм — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Фунт-сила_на_квадратный_дюйм"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "30 psi в бар",
      "url": "/psi-v-bar?value=30&from=psi&to=bar"
    },
    {
      "value": "14.5 psi в бар",
      "url": "/psi-v-bar?value=14.5&from=psi&to=bar"
    },
    {
      "value": "1 psi в бар",
      "url": "/psi-v-bar?value=1&from=psi&to=bar"
    }
  ]
};

// Бар в PSI
export const pressureBarToPsi: Calculator = {
  id: 'pressureBarToPsi',
  slug: 'bar-v-psi',
  title: 'Бар в PSI',
  description: 'Перевод давления из баров в фунты на квадратный дюйм',
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
      options: [{ value: 'bar', label: 'бар' }],
      defaultValue: 'bar'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'psi', label: 'psi' }],
      defaultValue: 'psi'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 14.503773773022209;
    return [{
      value: `${value} бар = ${fmtResult(result)} psi`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в барах, результат в psi появится автоматически.",
    "about": "Конвертер баров в PSI. Полезен для перевода давления шин из европейских единиц в американские.",
    "formula": "1 бар ≈ 14.5038 psi",
    "faq": [
      {
        "question": "Сколько psi в 2 барах?",
        "answer": "2 бара ≈ 29.0075 psi."
      },
      {
        "question": "Можно ли примерно считать 1 бар = 14.5 psi?",
        "answer": "Да, для бытовых расчётов это допустимая погрешность (≈0.03%)."
      }
    ],
    "sources": [
      {
        "title": "Фунт-сила на квадратный дюйм — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Фунт-сила_на_квадратный_дюйм"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 бар в psi",
      "url": "/bar-v-psi?value=1&from=bar&to=psi"
    },
    {
      "value": "2.5 бара в psi",
      "url": "/bar-v-psi?value=2.5&from=bar&to=psi"
    },
    {
      "value": "0.5 бара в psi",
      "url": "/bar-v-psi?value=0.5&from=bar&to=psi"
    }
  ]
};

// кПа в Па
export const pressureKpaToPa: Calculator = {
  id: 'pressureKpaToPa',
  slug: 'kpa-v-pa',
  title: 'кПа в Па',
  description: 'Перевод давления из килопаскалей в Паскали',
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
      options: [{ value: 'kpa', label: 'кПа (килопаскали)' }],
      defaultValue: 'kpa'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'pa', label: 'Па (Паскали)' }],
      defaultValue: 'pa'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1000;
    return [{
      value: `${value} кПа = ${fmtResult(result)} Па`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в кПа, результат в Па появится автоматически.",
    "about": "Конвертер килопаскалей в Паскали. Килопаскаль — удобная единица для средних давлений.",
    "formula": "1 кПа = 1000 Па",
    "faq": [
      {
        "question": "Что такое килопаскаль?",
        "answer": "Килопаскаль (кПа) = 1000 Па. Часто используется в метеорологии и технике."
      },
      {
        "question": "Сколько кПа в 1 баре?",
        "answer": "1 бар = 100 кПа."
      }
    ],
    "sources": [
      {
        "title": "Паскаль (единица) — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Паскаль_(единица)"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 кПа в Па",
      "url": "/kpa-v-pa?value=1&from=kpa&to=pa"
    },
    {
      "value": "100 кПа в Па",
      "url": "/kpa-v-pa?value=100&from=kpa&to=pa"
    },
    {
      "value": "101.325 кПа в Па",
      "url": "/kpa-v-pa?value=101.325&from=kpa&to=pa"
    }
  ]
};

// Па в кПа
export const pressurePaToKpa: Calculator = {
  id: 'pressurePaToKpa',
  slug: 'pa-v-kpa',
  title: 'Па в кПа',
  description: 'Перевод давления из Паскалей в килопаскали',
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
      options: [{ value: 'pa', label: 'Па (Паскали)' }],
      defaultValue: 'pa'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kpa', label: 'кПа (килопаскали)' }],
      defaultValue: 'kpa'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.001;
    return [{
      value: `${value} Па = ${fmtResult(result)} кПа`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в Па, результат в кПа появится автоматически.",
    "about": "Конвертер Паскалей в килопаскали. Удобен для перевода небольших давлений в более крупные единицы.",
    "formula": "1 Па = 0.001 кПа",
    "faq": [
      {
        "question": "Сколько кПа в стандартной атмосфере?",
        "answer": "101 325 Па = 101.325 кПа."
      },
      {
        "question": "Где используют кПа?",
        "answer": "В метеорологии (давление воздуха), в технике (давление в трубопроводах)."
      }
    ],
    "sources": [
      {
        "title": "Паскаль (единица) — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Паскаль_(единица)"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1000 Па в кПа",
      "url": "/pa-v-kpa?value=1000&from=pa&to=kpa"
    },
    {
      "value": "101325 Па в кПа",
      "url": "/pa-v-kpa?value=101325&from=pa&to=kpa"
    },
    {
      "value": "5000 Па в кПа",
      "url": "/pa-v-kpa?value=5000&from=pa&to=kpa"
    }
  ]
};

// МПа в Па
export const pressureMpaToPa: Calculator = {
  id: 'pressureMpaToPa',
  slug: 'mpa-v-pa',
  title: 'МПа в Па',
  description: 'Перевод давления из мегапаскалей в Паскали',
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
      options: [{ value: 'mpa', label: 'МПа (мегапаскали)' }],
      defaultValue: 'mpa'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'pa', label: 'Па (Паскали)' }],
      defaultValue: 'pa'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1000000;
    return [{
      value: `${value} МПа = ${fmtResult(result)} Па`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в МПа, результат в Па появится автоматически.",
    "about": "Конвертер мегапаскалей в Паскали. МПа используются для высоких давлений в промышленности.",
    "formula": "1 МПа = 1 000 000 Па",
    "faq": [
      {
        "question": "Что такое мегапаскаль?",
        "answer": "Мегапаскаль (МПа) = 10^6 Па. Используется в материаловедении, прочности материалов."
      },
      {
        "question": "Сколько МПа в 1 баре?",
        "answer": "1 бар = 0.1 МПа."
      }
    ],
    "sources": [
      {
        "title": "Паскаль (единица) — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Паскаль_(единица)"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 МПа в Па",
      "url": "/mpa-v-pa?value=1&from=mpa&to=pa"
    },
    {
      "value": "0.1 МПа в Па",
      "url": "/mpa-v-pa?value=0.1&from=mpa&to=pa"
    },
    {
      "value": "10 МПа в Па",
      "url": "/mpa-v-pa?value=10&from=mpa&to=pa"
    }
  ]
};

// Па в МПа
export const pressurePaToMpa: Calculator = {
  id: 'pressurePaToMpa',
  slug: 'pa-v-mpa',
  title: 'Па в МПа',
  description: 'Перевод давления из Паскалей в мегапаскали',
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
      options: [{ value: 'pa', label: 'Па (Паскали)' }],
      defaultValue: 'pa'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'mpa', label: 'МПа (мегапаскали)' }],
      defaultValue: 'mpa'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.000001;
    return [{
      value: `${value} Па = ${fmtResult(result)} МПа`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в Па, результат в МПа появится автоматически.",
    "about": "Конвертер Паскалей в мегапаскали. Полезен для выражения больших давлений в компактной форме.",
    "formula": "1 Па = 0.000001 МПа",
    "faq": [
      {
        "question": "Сколько Па в 1 МПа?",
        "answer": "1 МПа = 1 000 000 Па."
      },
      {
        "question": "Где применяются МПа?",
        "answer": "В инженерии (прочность стали ≈ 250–500 МПа), гидравлике, материаловедении."
      }
    ],
    "sources": [
      {
        "title": "Паскаль (единица) — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Паскаль_(единица)"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1000000 Па в МПа",
      "url": "/pa-v-mpa?value=1000000&from=pa&to=mpa"
    },
    {
      "value": "101325 Па в МПа",
      "url": "/pa-v-mpa?value=101325&from=pa&to=mpa"
    },
    {
      "value": "500000 Па в МПа",
      "url": "/pa-v-mpa?value=500000&from=pa&to=mpa"
    }
  ]
};

// техн. атм в Па
export const pressureAtToPa: Calculator = {
  id: 'pressureAtToPa',
  slug: 'tehn-atm-v-pa',
  title: 'техн. атм в Па',
  description: 'Перевод давления из технических атмосфер в Паскали',
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
      options: [{ value: 'at', label: 'ат (техн. атмосферы)' }],
      defaultValue: 'at'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'pa', label: 'Па (Паскали)' }],
      defaultValue: 'pa'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 98066.5;
    return [{
      value: `${value} ат = ${fmtResult(result)} Па`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в технических атмосферах, результат в Па появится автоматически.",
    "about": "Конвертер технических атмосфер в Паскали. Техническая атмосфера (ат) = 1 кгс/см².",
    "formula": "1 ат = 98 066.5 Па",
    "faq": [
      {
        "question": "В чём разница между атм и ат?",
        "answer": "атм (физ. атм.) = 101 325 Па. ат (техн. атм.) = 98 066.5 Па = 1 кгс/см²."
      },
      {
        "question": "Где используется техническая атмосфера?",
        "answer": "В старых технических справочниках, гидравлике, в СССР и странах СНГ."
      }
    ],
    "sources": [
      {
        "title": "Техническая атмосфера — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Техническая_атмосфера"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 ат в Па",
      "url": "/tehn-atm-v-pa?value=1&from=at&to=pa"
    },
    {
      "value": "10 ат в Па",
      "url": "/tehn-atm-v-pa?value=10&from=at&to=pa"
    },
    {
      "value": "0.5 ат в Па",
      "url": "/tehn-atm-v-pa?value=0.5&from=at&to=pa"
    }
  ]
};

// Па в техн. атм
export const pressurePaToAt: Calculator = {
  id: 'pressurePaToAt',
  slug: 'pa-v-tehn-atm',
  title: 'Па в техн. атм',
  description: 'Перевод давления из Паскалей в технические атмосферы',
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
      options: [{ value: 'pa', label: 'Па (Паскали)' }],
      defaultValue: 'pa'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'at', label: 'ат (техн. атмосферы)' }],
      defaultValue: 'at'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0000101971621297793;
    return [{
      value: `${value} Па = ${fmtResult(result)} ат`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в Па, результат в технических атмосферах появится автоматически.",
    "about": "Конвертер Паскалей в технические атмосферы. Полезен для работы с устаревшей технической литературой.",
    "formula": "1 Па ≈ 0.000010197 ат",
    "faq": [
      {
        "question": "Сколько Па в 1 кгс/см²?",
        "answer": "1 кгс/см² = 1 техн. атм = 98 066.5 Па."
      },
      {
        "question": "Почему техническая атмосфера меньше физической?",
        "answer": "Она основана на силе 1 кг на 1 см² при стандартном g, а не на реальном атмосферном давлении."
      }
    ],
    "sources": [
      {
        "title": "Техническая атмосфера — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Техническая_атмосфера"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "98066.5 Па в ат",
      "url": "/pa-v-tehn-atm?value=98066.5&from=pa&to=at"
    },
    {
      "value": "100000 Па в ат",
      "url": "/pa-v-tehn-atm?value=100000&from=pa&to=at"
    },
    {
      "value": "50000 Па в ат",
      "url": "/pa-v-tehn-atm?value=50000&from=pa&to=at"
    }
  ]
};

// Джоули в калории
export const energyJToCal: Calculator = {
  id: 'energyJToCal',
  slug: 'dzhouli-v-kalorii',
  title: 'Джоули в калории',
  description: 'Перевод энергии из Джоулей в калории',
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
      options: [{ value: 'j', label: 'Дж (Джоули)' }],
      defaultValue: 'j'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'cal', label: 'кал (калории)' }],
      defaultValue: 'cal'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.2390057361376673;
    return [{
      value: `${value} Дж = ${fmtResult(result)} кал`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в Джоулях, результат в калориях появится автоматически.",
    "about": "Конвертер Джоулей в калории. Калория — популярная внесистемная единица энергии, особенно в питании.",
    "formula": "1 Дж ≈ 0.239006 кал",
    "faq": [
      {
        "question": "Что такое калория?",
        "answer": "Калория — энергия, необходимая для нагревания 1 г воды на 1°C. 1 кал = 4.184 Дж."
      },
      {
        "question": "Сколько калорий в 1 кДж?",
        "answer": "1 кДж ≈ 239.006 кал."
      }
    ],
    "sources": [
      {
        "title": "Калория — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Калория"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "4.184 Дж в кал",
      "url": "/dzhouli-v-kalorii?value=4.184&from=j&to=cal"
    },
    {
      "value": "100 Дж в кал",
      "url": "/dzhouli-v-kalorii?value=100&from=j&to=cal"
    },
    {
      "value": "1 Дж в кал",
      "url": "/dzhouli-v-kalorii?value=1&from=j&to=cal"
    }
  ]
};

// Калории в джоули
export const energyCalToJ: Calculator = {
  id: 'energyCalToJ',
  slug: 'kalorii-v-dzhouli',
  title: 'Калории в джоули',
  description: 'Перевод энергии из калорий в Джоули',
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
      options: [{ value: 'cal', label: 'кал (калории)' }],
      defaultValue: 'cal'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'j', label: 'Дж (Джоули)' }],
      defaultValue: 'j'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 4.184;
    return [{
      value: `${value} кал = ${fmtResult(result)} Дж`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в калориях, результат в Джоулях появится автоматически.",
    "about": "Конвертер калорий в Джоули. Полезен для перевода пищевой энергии в единицы СИ.",
    "formula": "1 кал = 4.184 Дж",
    "faq": [
      {
        "question": "Сколько Джоулей в 100 калориях?",
        "answer": "100 кал = 418.4 Дж."
      },
      {
        "question": "Чем отличаются калории от джоулей?",
        "answer": "Это разные единицы одной величины. 1 кал ≈ 4.184 Дж. Джоуль — единица СИ, калория — внесистемная."
      }
    ],
    "sources": [
      {
        "title": "Калория — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Калория"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 кал в Дж",
      "url": "/kalorii-v-dzhouli?value=1&from=cal&to=j"
    },
    {
      "value": "100 кал в Дж",
      "url": "/kalorii-v-dzhouli?value=100&from=cal&to=j"
    },
    {
      "value": "500 кал в Дж",
      "url": "/kalorii-v-dzhouli?value=500&from=cal&to=j"
    }
  ]
};

// ккал в джоули
export const energyKcalToJ: Calculator = {
  id: 'energyKcalToJ',
  slug: 'kkal-v-dzhouli',
  title: 'ккал в джоули',
  description: 'Перевод энергии из килокалорий в Джоули',
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
      options: [{ value: 'kcal', label: 'ккал (килокалории)' }],
      defaultValue: 'kcal'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'j', label: 'Дж (Джоули)' }],
      defaultValue: 'j'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 4184;
    return [{
      value: `${value} ккал = ${fmtResult(result)} Дж`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в ккал, результат в Джоулях появится автоматически.",
    "about": "Конвертер килокалорий в Джоули. Килокалории (ккал) широко используются в пищевой промышленности.",
    "formula": "1 ккал = 4184 Дж",
    "faq": [
      {
        "question": "Сколько Джоулей в 1 ккал?",
        "answer": "1 ккал = 1000 кал = 4184 Дж."
      },
      {
        "question": "Почему на продуктах пишут ккал?",
        "answer": "Это удобная единица для обозначения энергетической ценности продуктов питания."
      }
    ],
    "sources": [
      {
        "title": "Калория — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Калория"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 ккал в Дж",
      "url": "/kkal-v-dzhouli?value=1&from=kcal&to=j"
    },
    {
      "value": "100 ккал в Дж",
      "url": "/kkal-v-dzhouli?value=100&from=kcal&to=j"
    },
    {
      "value": "2000 ккал в Дж",
      "url": "/kkal-v-dzhouli?value=2000&from=kcal&to=j"
    }
  ]
};

// Джоули в ккал
export const energyJToKcal: Calculator = {
  id: 'energyJToKcal',
  slug: 'dzhouli-v-kkal',
  title: 'Джоули в ккал',
  description: 'Перевод энергии из Джоулей в килокалории',
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
      options: [{ value: 'j', label: 'Дж (Джоули)' }],
      defaultValue: 'j'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kcal', label: 'ккал (килокалории)' }],
      defaultValue: 'kcal'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0002390057361376673;
    return [{
      value: `${value} Дж = ${fmtResult(result)} ккал`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в Джоулях, результат в ккал появится автоматически.",
    "about": "Конвертер Джоулей в килокалории. Удобен для перевода физических расчётов в пищевые единицы.",
    "formula": "1 Дж ≈ 0.000239006 ккал",
    "faq": [
      {
        "question": "Сколько ккал сжигается при пробежке?",
        "answer": "Примерно 300–600 ккал за 30 минут в зависимости от веса и интенсивности."
      },
      {
        "question": "Как перевести кДж в ккал?",
        "answer": "1 кДж = 1000 Дж ≈ 0.239006 ккал."
      }
    ],
    "sources": [
      {
        "title": "Калория — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Калория"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "4184 Дж в ккал",
      "url": "/dzhouli-v-kkal?value=4184&from=j&to=kcal"
    },
    {
      "value": "1000 Дж в ккал",
      "url": "/dzhouli-v-kkal?value=1000&from=j&to=kcal"
    },
    {
      "value": "10000 Дж в ккал",
      "url": "/dzhouli-v-kkal?value=10000&from=j&to=kcal"
    }
  ]
};

// кВт·ч в джоули
export const energyKwhToJ: Calculator = {
  id: 'energyKwhToJ',
  slug: 'kvt-ch-v-dzhouli',
  title: 'кВт·ч в джоули',
  description: 'Перевод энергии из киловатт-часов в Джоули',
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
      options: [{ value: 'kwh', label: 'кВт·ч (киловатт-часы)' }],
      defaultValue: 'kwh'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'j', label: 'Дж (Джоули)' }],
      defaultValue: 'j'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 3600000;
    return [{
      value: `${value} кВт·ч = ${fmtResult(result)} Дж`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в кВт·ч, результат в Джоулях появится автоматически.",
    "about": "Конвертер киловатт-часов в Джоули. кВт·ч — единица энергии в электротехнике и быту.",
    "formula": "1 кВт·ч = 3 600 000 Дж",
    "faq": [
      {
        "question": "Сколько Джоулей в 1 кВт·ч?",
        "answer": "1 кВт·ч = 3.6 × 10^6 Дж = 3.6 МДж."
      },
      {
        "question": "Почему электроэнергию считают в кВт·ч?",
        "answer": "Это удобная бытовая единица: мощность (кВт) × время (ч) = энергия."
      }
    ],
    "sources": [
      {
        "title": "Киловатт-час — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Киловатт-час"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 кВт·ч в Дж",
      "url": "/kvt-ch-v-dzhouli?value=1&from=kwh&to=j"
    },
    {
      "value": "0.5 кВт·ч в Дж",
      "url": "/kvt-ch-v-dzhouli?value=0.5&from=kwh&to=j"
    },
    {
      "value": "10 кВт·ч в Дж",
      "url": "/kvt-ch-v-dzhouli?value=10&from=kwh&to=j"
    }
  ]
};

// Джоули в кВт·ч
export const energyJToKwh: Calculator = {
  id: 'energyJToKwh',
  slug: 'dzhouli-v-kvt-ch',
  title: 'Джоули в кВт·ч',
  description: 'Перевод энергии из Джоулей в киловатт-часы',
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
      options: [{ value: 'j', label: 'Дж (Джоули)' }],
      defaultValue: 'j'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kwh', label: 'кВт·ч (киловатт-часы)' }],
      defaultValue: 'kwh'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 2.777777777777778e-7;
    return [{
      value: `${value} Дж = ${fmtResult(result)} кВт·ч`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в Джоулях, результат в кВт·ч появится автоматически.",
    "about": "Конвертер Джоулей в киловатт-часы. Используется для перевода научных расчётов в бытовые единицы.",
    "formula": "1 Дж ≈ 2.77778×10⁻⁷ кВт·ч",
    "faq": [
      {
        "question": "Сколько кВт·ч в 1 МДж?",
        "answer": "1 МДж = 1 000 000 Дж ≈ 0.2778 кВт·ч."
      },
      {
        "question": "Как перевести Джоули в кВт·ч?",
        "answer": "Разделите количество Джоулей на 3 600 000."
      }
    ],
    "sources": [
      {
        "title": "Киловатт-час — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Киловатт-час"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "3600000 Дж в кВт·ч",
      "url": "/dzhouli-v-kvt-ch?value=3600000&from=j&to=kwh"
    },
    {
      "value": "1000000 Дж в кВт·ч",
      "url": "/dzhouli-v-kvt-ch?value=1000000&from=j&to=kwh"
    },
    {
      "value": "1 Дж в кВт·ч",
      "url": "/dzhouli-v-kvt-ch?value=1&from=j&to=kwh"
    }
  ]
};

// эВ в джоули
export const energyEvToJ: Calculator = {
  id: 'energyEvToJ',
  slug: 'ev-v-dzhouli',
  title: 'эВ в джоули',
  description: 'Перевод энергии из электронвольтов в Джоули',
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
      options: [{ value: 'ev', label: 'эВ (электронвольты)' }],
      defaultValue: 'ev'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'j', label: 'Дж (Джоули)' }],
      defaultValue: 'j'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1.602176634e-19;
    return [{
      value: `${value} эВ = ${fmtResult(result)} Дж`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в эВ, результат в Джоулях появится автоматически.",
    "about": "Конвертер электронвольтов в Джоули. эВ — стандартная единица в атомной и ядерной физике.",
    "formula": "1 эВ = 1.60218×10⁻¹⁹ Дж",
    "faq": [
      {
        "question": "Что такое электронвольт?",
        "answer": "Энергия, которую получает электрон при ускорении разностью потенциалов в 1 вольт."
      },
      {
        "question": "Сколько Джоулей в 1 МэВ?",
        "answer": "1 МэВ = 10^6 эВ ≈ 1.60218 × 10⁻¹³ Дж."
      }
    ],
    "sources": [
      {
        "title": "Электронвольт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Электронвольт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 эВ в Дж",
      "url": "/ev-v-dzhouli?value=1&from=ev&to=j"
    },
    {
      "value": "1000 эВ в Дж",
      "url": "/ev-v-dzhouli?value=1000&from=ev&to=j"
    },
    {
      "value": "1 МэВ в Дж",
      "url": "/ev-v-dzhouli?value=1000000&from=ev&to=j"
    }
  ]
};

// Джоули в эВ
export const energyJToEv: Calculator = {
  id: 'energyJToEv',
  slug: 'dzhouli-v-ev',
  title: 'Джоули в эВ',
  description: 'Перевод энергии из Джоулей в электронвольты',
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
      options: [{ value: 'j', label: 'Дж (Джоули)' }],
      defaultValue: 'j'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'ev', label: 'эВ (электронвольты)' }],
      defaultValue: 'ev'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 6241509074460763000;
    return [{
      value: `${value} Дж = ${fmtResult(result)} эВ`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в Джоулях, результат в эВ появится автоматически.",
    "about": "Конвертер Джоулей в электронвольты. Полезен для перевода макроскопической энергии в микроскопические единицы.",
    "formula": "1 Дж ≈ 6.2415×10¹⁸ эВ",
    "faq": [
      {
        "question": "Сколько эВ в 1 Дж?",
        "answer": "1 Дж ≈ 6.2415 × 10¹⁸ эВ."
      },
      {
        "question": "Где применяется электронвольт?",
        "answer": "В физике элементарных частиц, спектроскопии, ядерной физике, химии."
      }
    ],
    "sources": [
      {
        "title": "Электронвольт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Электронвольт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 Дж в эВ",
      "url": "/dzhouli-v-ev?value=1&from=j&to=ev"
    },
    {
      "value": "1e-19 Дж в эВ",
      "url": "/dzhouli-v-ev?value=1e-19&from=j&to=ev"
    },
    {
      "value": "100 Дж в эВ",
      "url": "/dzhouli-v-ev?value=100&from=j&to=ev"
    }
  ]
};

// Ватты в киловатты
export const powerWToKw: Calculator = {
  id: 'powerWToKw',
  slug: 'vatty-v-kilovatty',
  title: 'Ватты в киловатты',
  description: 'Перевод мощности из ватт в киловатты',
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
      options: [{ value: 'w', label: 'Вт (ватты)' }],
      defaultValue: 'w'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kw', label: 'кВт (киловатты)' }],
      defaultValue: 'kw'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.001;
    return [{
      value: `${value} Вт = ${fmtResult(result)} кВт`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в ваттах, результат в киловаттах появится автоматически.",
    "about": "Конвертер ватт в киловатты. Киловатт — 1000 ватт, стандартная единица для бытовой техники.",
    "formula": "1 Вт = 0.001 кВт",
    "faq": [
      {
        "question": "Сколько ватт в 1 кВт?",
        "answer": "1 кВт = 1000 Вт."
      },
      {
        "question": "Как рассчитать мощность прибора?",
        "answer": "Мощность (Вт) = Напряжение (В) × Сила тока (А)."
      }
    ],
    "sources": [
      {
        "title": "Ватт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Ватт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1000 Вт в кВт",
      "url": "/vatty-v-kilovatty?value=1000&from=w&to=kw"
    },
    {
      "value": "100 Вт в кВт",
      "url": "/vatty-v-kilovatty?value=100&from=w&to=kw"
    },
    {
      "value": "2500 Вт в кВт",
      "url": "/vatty-v-kilovatty?value=2500&from=w&to=kw"
    }
  ]
};

// Киловатты в ватты
export const powerKwToW: Calculator = {
  id: 'powerKwToW',
  slug: 'kilovatty-v-vatty',
  title: 'Киловатты в ватты',
  description: 'Перевод мощности из киловатт в ватты',
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
      options: [{ value: 'kw', label: 'кВт (киловатты)' }],
      defaultValue: 'kw'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'w', label: 'Вт (ватты)' }],
      defaultValue: 'w'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1000;
    return [{
      value: `${value} кВт = ${fmtResult(result)} Вт`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в кВт, результат в ваттах появится автоматически.",
    "about": "Конвертер киловатт в ватты. Необходим для расчётов электропотребления и выбора проводки.",
    "formula": "1 кВт = 1000 Вт",
    "faq": [
      {
        "question": "Сколько ампер в 1 кВт при 220 В?",
        "answer": "Примерно 4.55 А (1000 Вт / 220 В)."
      },
      {
        "question": "Почему счётчики электроэнергии измеряют в кВт·ч?",
        "answer": "Потому что киловатт-час удобнее для измерения потребления за длительное время."
      }
    ],
    "sources": [
      {
        "title": "Ватт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Ватт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 кВт в Вт",
      "url": "/kilovatty-v-vatty?value=1&from=kw&to=w"
    },
    {
      "value": "5 кВт в Вт",
      "url": "/kilovatty-v-vatty?value=5&from=kw&to=w"
    },
    {
      "value": "0.5 кВт в Вт",
      "url": "/kilovatty-v-vatty?value=0.5&from=kw&to=w"
    }
  ]
};

// Киловатты в л.с.
export const powerKwToHp: Calculator = {
  id: 'powerKwToHp',
  slug: 'kilovatty-v-ls',
  title: 'Киловатты в л.с.',
  description: 'Перевод мощности из киловатт в лошадиные силы',
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
      options: [{ value: 'kw', label: 'кВт (киловатты)' }],
      defaultValue: 'kw'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'hp', label: 'л.с. (лошадиные силы)' }],
      defaultValue: 'hp'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1.3596216173039044;
    return [{
      value: `${value} кВт = ${fmtResult(result)} л.с.`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в кВт, результат в л.с. появится автоматически.",
    "about": "Конвертер киловатт в лошадиные силы. Лошадиная сила — историческая единица, всё ещё популярная в автомобилестроении.",
    "formula": "1 кВт ≈ 1.35962 л.с.",
    "faq": [
      {
        "question": "Сколько л.с. в 100 кВт?",
        "answer": "100 кВт ≈ 135.96 л.с."
      },
      {
        "question": "В чём разница между метрической и имперской л.с.?",
        "answer": "Метрическая л.с. = 735.5 Вт. Имперская (hp) = 745.7 Вт. В РФ используется метрическая."
      }
    ],
    "sources": [
      {
        "title": "Лошадиная сила — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Лошадиная_сила"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 кВт в л.с.",
      "url": "/kilovatty-v-ls?value=1&from=kw&to=hp"
    },
    {
      "value": "74 кВт в л.с.",
      "url": "/kilovatty-v-ls?value=74&from=kw&to=hp"
    },
    {
      "value": "100 кВт в л.с.",
      "url": "/kilovatty-v-ls?value=100&from=kw&to=hp"
    }
  ]
};

// л.с. в киловатты
export const powerHpToKw: Calculator = {
  id: 'powerHpToKw',
  slug: 'ls-v-kilovatty',
  title: 'л.с. в киловатты',
  description: 'Перевод мощности из лошадиных сил в киловатты',
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
      options: [{ value: 'hp', label: 'л.с. (лошадиные силы)' }],
      defaultValue: 'hp'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kw', label: 'кВт (киловатты)' }],
      defaultValue: 'kw'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.73549875;
    return [{
      value: `${value} л.с. = ${fmtResult(result)} кВт`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в л.с., результат в кВт появится автоматически.",
    "about": "Конвертер лошадиных сил в киловатты. Необходим для сравнения мощности автомобилей и двигателей.",
    "formula": "1 л.с. = 0.7355 кВт",
    "faq": [
      {
        "question": "Сколько кВт в 100 л.с.?",
        "answer": "100 л.с. ≈ 73.55 кВт."
      },
      {
        "question": "Почему автомобилисты используют л.с.?",
        "answer": "Традиция. Лошадиная сила появилась раньше ватта и удобна для интуитивного сравнения с живыми лошадьми."
      }
    ],
    "sources": [
      {
        "title": "Лошадиная сила — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Лошадиная_сила"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 л.с. в кВт",
      "url": "/ls-v-kilovatty?value=1&from=hp&to=kw"
    },
    {
      "value": "100 л.с. в кВт",
      "url": "/ls-v-kilovatty?value=100&from=hp&to=kw"
    },
    {
      "value": "75 л.с. в кВт",
      "url": "/ls-v-kilovatty?value=75&from=hp&to=kw"
    }
  ]
};

// Ватты в л.с.
export const powerWToHp: Calculator = {
  id: 'powerWToHp',
  slug: 'vatty-v-ls',
  title: 'Ватты в л.с.',
  description: 'Перевод мощности из ватт в лошадиные силы',
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
      options: [{ value: 'w', label: 'Вт (ватты)' }],
      defaultValue: 'w'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'hp', label: 'л.с. (лошадиные силы)' }],
      defaultValue: 'hp'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0013596216173039043;
    return [{
      value: `${value} Вт = ${fmtResult(result)} л.с.`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в ваттах, результат в л.с. появится автоматически.",
    "about": "Конвертер ватт в лошадиные силы. Удобен для перевода небольших мощностей в традиционные единицы.",
    "formula": "1 Вт ≈ 0.00135962 л.с.",
    "faq": [
      {
        "question": "Сколько л.с. в 1000 Вт?",
        "answer": "1000 Вт = 1 кВт ≈ 1.36 л.с."
      },
      {
        "question": "Можно ли перевести Вт в л.с. в уме?",
        "answer": "Да, примерно: Вт ÷ 735.5 ≈ л.с. Или проще: кВт × 1.36 ≈ л.с."
      }
    ],
    "sources": [
      {
        "title": "Лошадиная сила — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Лошадиная_сила"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1000 Вт в л.с.",
      "url": "/vatty-v-ls?value=1000&from=w&to=hp"
    },
    {
      "value": "500 Вт в л.с.",
      "url": "/vatty-v-ls?value=500&from=w&to=hp"
    },
    {
      "value": "100 Вт в л.с.",
      "url": "/vatty-v-ls?value=100&from=w&to=hp"
    }
  ]
};

// л.с. в ватты
export const powerHpToW: Calculator = {
  id: 'powerHpToW',
  slug: 'ls-v-vatty',
  title: 'л.с. в ватты',
  description: 'Перевод мощности из лошадиных сил в ватты',
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
      options: [{ value: 'hp', label: 'л.с. (лошадиные силы)' }],
      defaultValue: 'hp'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'w', label: 'Вт (ватты)' }],
      defaultValue: 'w'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 735.49875;
    return [{
      value: `${value} л.с. = ${fmtResult(result)} Вт`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в л.с., результат в ваттах появится автоматически.",
    "about": "Конвертер лошадиных сил в ватты. Полезен для точных инженерных расчётов мощности двигателей.",
    "formula": "1 л.с. = 735.499 Вт",
    "faq": [
      {
        "question": "Сколько Вт в 1 л.с.?",
        "answer": "1 метрическая л.с. = 735.499 Вт."
      },
      {
        "question": "Что больше: 1 кВт или 1 л.с.?",
        "answer": "1 кВт (1000 Вт) > 1 л.с. (735.5 Вт). Разница около 36%."
      }
    ],
    "sources": [
      {
        "title": "Лошадиная сила — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Лошадиная_сила"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 л.с. в Вт",
      "url": "/ls-v-vatty?value=1&from=hp&to=w"
    },
    {
      "value": "5 л.с. в Вт",
      "url": "/ls-v-vatty?value=5&from=hp&to=w"
    },
    {
      "value": "10 л.с. в Вт",
      "url": "/ls-v-vatty?value=10&from=hp&to=w"
    }
  ]
};

// Мегаватты в киловатты
export const powerMwToKw: Calculator = {
  id: 'powerMwToKw',
  slug: 'megavatty-v-kilovatty',
  title: 'Мегаватты в киловатты',
  description: 'Перевод мощности из мегаватт в киловатты',
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
      options: [{ value: 'mw', label: 'МВт (мегаватты)' }],
      defaultValue: 'mw'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kw', label: 'кВт (киловатты)' }],
      defaultValue: 'kw'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1000;
    return [{
      value: `${value} МВт = ${fmtResult(result)} кВт`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в МВт, результат в кВт появится автоматически.",
    "about": "Конвертер мегаватт в киловатты. МВт используются для мощности электростанций и промышленных объектов.",
    "formula": "1 МВт = 1000 кВт",
    "faq": [
      {
        "question": "Что такое мегаватт?",
        "answer": "Мегаватт (МВт) = 1 000 000 Вт = 1000 кВт. Мощность небольшой электростанции."
      },
      {
        "question": "Сколько МВт в ГВт?",
        "answer": "1 ГВт = 1000 МВт. Крупные АЭС выдают 1–4 ГВт."
      }
    ],
    "sources": [
      {
        "title": "Ватт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Ватт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 МВт в кВт",
      "url": "/megavatty-v-kilovatty?value=1&from=mw&to=kw"
    },
    {
      "value": "10 МВт в кВт",
      "url": "/megavatty-v-kilovatty?value=10&from=mw&to=kw"
    },
    {
      "value": "0.5 МВт в кВт",
      "url": "/megavatty-v-kilovatty?value=0.5&from=mw&to=kw"
    }
  ]
};

// Киловатты в мегаватты
export const powerKwToMw: Calculator = {
  id: 'powerKwToMw',
  slug: 'kilovatty-v-megavatty',
  title: 'Киловатты в мегаватты',
  description: 'Перевод мощности из киловатт в мегаватты',
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
      options: [{ value: 'kw', label: 'кВт (киловатты)' }],
      defaultValue: 'kw'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'mw', label: 'МВт (мегаватты)' }],
      defaultValue: 'mw'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.001;
    return [{
      value: `${value} кВт = ${fmtResult(result)} МВт`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в кВт, результат в МВт появится автоматически.",
    "about": "Конвертер киловатт в мегаватты. Используется при масштабировании энергетических проектов.",
    "formula": "1 кВт = 0.001 МВт",
    "faq": [
      {
        "question": "Сколько кВт в 1 МВт?",
        "answer": "1 МВт = 1000 кВт."
      },
      {
        "question": "Какая мощность типичной ветряной турбины?",
        "answer": "Современные ветротурбины: 2–8 МВт."
      }
    ],
    "sources": [
      {
        "title": "Ватт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Ватт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1000 кВт в МВт",
      "url": "/kilovatty-v-megavatty?value=1000&from=kw&to=mw"
    },
    {
      "value": "500 кВт в МВт",
      "url": "/kilovatty-v-megavatty?value=500&from=kw&to=mw"
    },
    {
      "value": "100 кВт в МВт",
      "url": "/kilovatty-v-megavatty?value=100&from=kw&to=mw"
    }
  ]
};

// Секунды в минуты
export const timeSecToMin: Calculator = {
  id: 'timeSecToMin',
  slug: 'sekundy-v-minuty',
  title: 'Секунды в минуты',
  description: 'Перевод времени из секунд в минуты',
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
      options: [{ value: 'sec', label: 'с (секунды)' }],
      defaultValue: 'sec'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'min', label: 'мин (минуты)' }],
      defaultValue: 'min'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.016666666666666666;
    return [{
      value: `${value} с = ${fmtResult(result)} мин`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в секундах, результат в минутах появится автоматически.",
    "about": "Конвертер секунд в минуты. Секунда — базовая единица времени в СИ.",
    "formula": "1 с = 1/60 мин ≈ 0.016667 мин",
    "faq": [
      {
        "question": "Сколько секунд в минуте?",
        "answer": "1 минута = 60 секунд."
      },
      {
        "question": "Сколько секунд в часе?",
        "answer": "1 час = 3600 секунд."
      }
    ],
    "sources": [
      {
        "title": "Секунда — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Секунда"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "60 с в мин",
      "url": "/sekundy-v-minuty?value=60&from=sec&to=min"
    },
    {
      "value": "120 с в мин",
      "url": "/sekundy-v-minuty?value=120&from=sec&to=min"
    },
    {
      "value": "300 с в мин",
      "url": "/sekundy-v-minuty?value=300&from=sec&to=min"
    }
  ]
};

// Минуты в секунды
export const timeMinToSec: Calculator = {
  id: 'timeMinToSec',
  slug: 'minuty-v-sekundy',
  title: 'Минуты в секунды',
  description: 'Перевод времени из минут в секунды',
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
      options: [{ value: 'min', label: 'мин (минуты)' }],
      defaultValue: 'min'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'sec', label: 'с (секунды)' }],
      defaultValue: 'sec'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 60;
    return [{
      value: `${value} мин = ${fmtResult(result)} с`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в минутах, результат в секундах появится автоматически.",
    "about": "Конвертер минут в секунды. Используется для точных таймеров и спортивных замеров.",
    "formula": "1 мин = 60 с",
    "faq": [
      {
        "question": "Сколько секунд в 5 минутах?",
        "answer": "5 мин = 300 секунд."
      },
      {
        "question": "Сколько секунд в сутках?",
        "answer": "24 ч × 60 мин × 60 с = 86 400 секунд."
      }
    ],
    "sources": [
      {
        "title": "Минута — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Минута"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 мин в с",
      "url": "/minuty-v-sekundy?value=1&from=min&to=sec"
    },
    {
      "value": "5 мин в с",
      "url": "/minuty-v-sekundy?value=5&from=min&to=sec"
    },
    {
      "value": "10 мин в с",
      "url": "/minuty-v-sekundy?value=10&from=min&to=sec"
    }
  ]
};

// Минуты в часы
export const timeMinToHour: Calculator = {
  id: 'timeMinToHour',
  slug: 'minuty-v-chasy',
  title: 'Минуты в часы',
  description: 'Перевод времени из минут в часы',
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
      options: [{ value: 'min', label: 'мин (минуты)' }],
      defaultValue: 'min'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'hour', label: 'ч (часы)' }],
      defaultValue: 'hour'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.016666666666666666;
    return [{
      value: `${value} мин = ${fmtResult(result)} ч`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в минутах, результат в часах появится автоматически.",
    "about": "Конвертер минут в часы. Полезен для расчёта рабочего времени и длительности задач.",
    "formula": "1 мин = 1/60 ч ≈ 0.016667 ч",
    "faq": [
      {
        "question": "Сколько минут в часе?",
        "answer": "1 час = 60 минут."
      },
      {
        "question": "Как перевести минуты в часы?",
        "answer": "Разделите количество минут на 60."
      }
    ],
    "sources": [
      {
        "title": "Минута — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Минута"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "60 мин в ч",
      "url": "/minuty-v-chasy?value=60&from=min&to=hour"
    },
    {
      "value": "30 мин в ч",
      "url": "/minuty-v-chasy?value=30&from=min&to=hour"
    },
    {
      "value": "120 мин в ч",
      "url": "/minuty-v-chasy?value=120&from=min&to=hour"
    }
  ]
};

// Часы в минуты
export const timeHourToMin: Calculator = {
  id: 'timeHourToMin',
  slug: 'chasy-v-minuty',
  title: 'Часы в минуты',
  description: 'Перевод времени из часов в минуты',
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
      options: [{ value: 'hour', label: 'ч (часы)' }],
      defaultValue: 'hour'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'min', label: 'мин (минуты)' }],
      defaultValue: 'min'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 60;
    return [{
      value: `${value} ч = ${fmtResult(result)} мин`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в часах, результат в минутах появится автоматически.",
    "about": "Конвертер часов в минуты. Необходим для планирования расписаний и маршрутов.",
    "formula": "1 ч = 60 мин",
    "faq": [
      {
        "question": "Сколько минут в сутках?",
        "answer": "24 ч × 60 мин = 1440 минут."
      },
      {
        "question": "Сколько минут в неделе?",
        "answer": "7 дней × 24 ч × 60 мин = 10 080 минут."
      }
    ],
    "sources": [
      {
        "title": "Час — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Час"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 ч в мин",
      "url": "/chasy-v-minuty?value=1&from=hour&to=min"
    },
    {
      "value": "2 ч в мин",
      "url": "/chasy-v-minuty?value=2&from=hour&to=min"
    },
    {
      "value": "0.5 ч в мин",
      "url": "/chasy-v-minuty?value=0.5&from=hour&to=min"
    }
  ]
};

// Часы в дни
export const timeHourToDay: Calculator = {
  id: 'timeHourToDay',
  slug: 'chasy-v-dni',
  title: 'Часы в дни',
  description: 'Перевод времени из часов в дни',
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
      options: [{ value: 'hour', label: 'ч (часы)' }],
      defaultValue: 'hour'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'day', label: 'дн (дни)' }],
      defaultValue: 'day'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.041666666666666664;
    return [{
      value: `${value} ч = ${fmtResult(result)} дн`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в часах, результат в днях появится автоматически.",
    "about": "Конвертер часов в дни. Удобен для расчёта сроков выполнения проектов и задач.",
    "formula": "1 ч = 1/24 дня ≈ 0.041667 дн",
    "faq": [
      {
        "question": "Сколько часов в сутках?",
        "answer": "1 сутки = 24 часа."
      },
      {
        "question": "Сколько часов в неделе?",
        "answer": "1 неделя = 168 часов."
      }
    ],
    "sources": [
      {
        "title": "Сутки — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Сутки"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "24 ч в дни",
      "url": "/chasy-v-dni?value=24&from=hour&to=day"
    },
    {
      "value": "48 ч в дни",
      "url": "/chasy-v-dni?value=48&from=hour&to=day"
    },
    {
      "value": "12 ч в дни",
      "url": "/chasy-v-dni?value=12&from=hour&to=day"
    }
  ]
};

// Дни в часы
export const timeDayToHour: Calculator = {
  id: 'timeDayToHour',
  slug: 'dni-v-chasy',
  title: 'Дни в часы',
  description: 'Перевод времени из дней в часы',
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
      options: [{ value: 'day', label: 'дн (дни)' }],
      defaultValue: 'day'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'hour', label: 'ч (часы)' }],
      defaultValue: 'hour'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 24;
    return [{
      value: `${value} дн = ${fmtResult(result)} ч`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в днях, результат в часах появится автоматически.",
    "about": "Конвертер дней в часы. Используется для планирования длительных операций и периодов.",
    "formula": "1 дн = 24 ч",
    "faq": [
      {
        "question": "Сколько часов в 7 днях?",
        "answer": "7 дней = 168 часов."
      },
      {
        "question": "Сколько рабочих часов в месяце?",
        "answer": "При 5-дневной неделе и 8-часовом дне: около 160–184 часа."
      }
    ],
    "sources": [
      {
        "title": "Сутки — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Сутки"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 дн в ч",
      "url": "/dni-v-chasy?value=1&from=day&to=hour"
    },
    {
      "value": "7 дн в ч",
      "url": "/dni-v-chasy?value=7&from=day&to=hour"
    },
    {
      "value": "30 дн в ч",
      "url": "/dni-v-chasy?value=30&from=day&to=hour"
    }
  ]
};

// Дни в недели
export const timeDayToWeek: Calculator = {
  id: 'timeDayToWeek',
  slug: 'dni-v-nedeli',
  title: 'Дни в недели',
  description: 'Перевод времени из дней в недели',
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
      options: [{ value: 'day', label: 'дн (дни)' }],
      defaultValue: 'day'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'week', label: 'нед (недели)' }],
      defaultValue: 'week'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.14285714285714285;
    return [{
      value: `${value} дн = ${fmtResult(result)} нед`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в днях, результат в неделях появится автоматически.",
    "about": "Конвертер дней в недели. Неделя — традиционная единица времени, равная 7 дням.",
    "formula": "1 дн = 1/7 нед ≈ 0.142857 нед",
    "faq": [
      {
        "question": "Сколько дней в неделе?",
        "answer": "1 неделя = 7 дней."
      },
      {
        "question": "Сколько недель в месяце?",
        "answer": "В среднем около 4.3 недели."
      }
    ],
    "sources": [
      {
        "title": "Неделя — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Неделя"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "7 дн в нед",
      "url": "/dni-v-nedeli?value=7&from=day&to=week"
    },
    {
      "value": "14 дн в нед",
      "url": "/dni-v-nedeli?value=14&from=day&to=week"
    },
    {
      "value": "30 дн в нед",
      "url": "/dni-v-nedeli?value=30&from=day&to=week"
    }
  ]
};

// Недели в дни
export const timeWeekToDay: Calculator = {
  id: 'timeWeekToDay',
  slug: 'nedeli-v-dni',
  title: 'Недели в дни',
  description: 'Перевод времени из недель в дни',
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
      options: [{ value: 'week', label: 'нед (недели)' }],
      defaultValue: 'week'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'day', label: 'дн (дни)' }],
      defaultValue: 'day'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 7;
    return [{
      value: `${value} нед = ${fmtResult(result)} дн`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в неделях, результат в днях появится автоматически.",
    "about": "Конвертер недель в дни. Удобен для планирования проектов с длительностью в неделях.",
    "formula": "1 нед = 7 дн",
    "faq": [
      {
        "question": "Сколько дней в 4 неделях?",
        "answer": "4 недели = 28 дней."
      },
      {
        "question": "Сколько рабочих дней в неделе?",
        "answer": "Обычно 5 рабочих дней при 5-дневной рабочей неделе."
      }
    ],
    "sources": [
      {
        "title": "Неделя — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Неделя"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 нед в дни",
      "url": "/nedeli-v-dni?value=1&from=week&to=day"
    },
    {
      "value": "4 нед в дни",
      "url": "/nedeli-v-dni?value=4&from=week&to=day"
    },
    {
      "value": "52 нед в дни",
      "url": "/nedeli-v-dni?value=52&from=week&to=day"
    }
  ]
};

// Дни в месяцы
export const timeDayToMonth: Calculator = {
  id: 'timeDayToMonth',
  slug: 'dni-v-mesyacy',
  title: 'Дни в месяцы',
  description: 'Перевод времени из дней в месяцы',
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
      options: [{ value: 'day', label: 'дн (дни)' }],
      defaultValue: 'day'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'month', label: 'мес (месяцы)' }],
      defaultValue: 'month'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0328542094455853;
    return [{
      value: `${value} дн = ${fmtResult(result)} мес`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в днях, результат в месяцах появится автоматически.",
    "about": "Конвертер дней в месяцы. Расчёт по среднему месяцу (365.25 дней / 12 = 30.4375 дня).",
    "formula": "1 дн ≈ 0.03285 мес (в среднем)",
    "faq": [
      {
        "question": "Сколько дней в месяце в среднем?",
        "answer": "Среднемесячное значение: 365.25 / 12 ≈ 30.44 дня."
      },
      {
        "question": "Сколько дней в високосном году?",
        "answer": "366 дней. Високосные годы повторяются каждые 4 года."
      }
    ],
    "sources": [
      {
        "title": "Месяц — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Месяц"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "30 дн в мес",
      "url": "/dni-v-mesyacy?value=30&from=day&to=month"
    },
    {
      "value": "90 дн в мес",
      "url": "/dni-v-mesyacy?value=90&from=day&to=month"
    },
    {
      "value": "365 дн в мес",
      "url": "/dni-v-mesyacy?value=365&from=day&to=month"
    }
  ]
};

// Месяцы в дни
export const timeMonthToDay: Calculator = {
  id: 'timeMonthToDay',
  slug: 'mesyacy-v-dni',
  title: 'Месяцы в дни',
  description: 'Перевод времени из месяцев в дни',
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
      options: [{ value: 'month', label: 'мес (месяцы)' }],
      defaultValue: 'month'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'day', label: 'дн (дни)' }],
      defaultValue: 'day'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 30.4375;
    return [{
      value: `${value} мес = ${fmtResult(result)} дн`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в месяцах, результат в днях появится автоматически.",
    "about": "Конвертер месяцев в дни. Расчёт по среднему месяцу (365.25 дней / 12 = 30.4375 дня).",
    "formula": "1 мес ≈ 30.4375 дн (в среднем)",
    "faq": [
      {
        "question": "Сколько дней в 6 месяцах?",
        "answer": "6 месяцев ≈ 182.6 дней (в среднем)."
      },
      {
        "question": "Почему месяцы имеют разную длину?",
        "answer": "Исторически сложилось из римского календаря. Февраль — самый короткий."
      }
    ],
    "sources": [
      {
        "title": "Месяц — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Месяц"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 мес в дни",
      "url": "/mesyacy-v-dni?value=1&from=month&to=day"
    },
    {
      "value": "3 мес в дни",
      "url": "/mesyacy-v-dni?value=3&from=month&to=day"
    },
    {
      "value": "12 мес в дни",
      "url": "/mesyacy-v-dni?value=12&from=month&to=day"
    }
  ]
};

// Месяцы в годы
export const timeMonthToYear: Calculator = {
  id: 'timeMonthToYear',
  slug: 'mesyacy-v-gody',
  title: 'Месяцы в годы',
  description: 'Перевод времени из месяцев в годы',
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
      options: [{ value: 'month', label: 'мес (месяцы)' }],
      defaultValue: 'month'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'year', label: 'г (годы)' }],
      defaultValue: 'year'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.08333333333333333;
    return [{
      value: `${value} мес = ${fmtResult(result)} г`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в месяцах, результат в годах появится автоматически.",
    "about": "Конвертер месяцев в годы. Используется для расчёта возраста, стажа, сроков кредитов.",
    "formula": "1 мес = 1/12 г ≈ 0.083333 г",
    "faq": [
      {
        "question": "Сколько месяцев в году?",
        "answer": "1 год = 12 месяцев."
      },
      {
        "question": "Сколько месяцев в квартале?",
        "answer": "1 квартал = 3 месяца. В году 4 квартала."
      }
    ],
    "sources": [
      {
        "title": "Год — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Год"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "12 мес в г",
      "url": "/mesyacy-v-gody?value=12&from=month&to=year"
    },
    {
      "value": "6 мес в г",
      "url": "/mesyacy-v-gody?value=6&from=month&to=year"
    },
    {
      "value": "18 мес в г",
      "url": "/mesyacy-v-gody?value=18&from=month&to=year"
    }
  ]
};

// Годы в месяцы
export const timeYearToMonth: Calculator = {
  id: 'timeYearToMonth',
  slug: 'gody-v-mesyacy',
  title: 'Годы в месяцы',
  description: 'Перевод времени из годов в месяцы',
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
      options: [{ value: 'year', label: 'г (годы)' }],
      defaultValue: 'year'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'month', label: 'мес (месяцы)' }],
      defaultValue: 'month'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 12;
    return [{
      value: `${value} г = ${fmtResult(result)} мес`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в годах, результат в месяцах появится автоматически.",
    "about": "Конвертер годов в месяцы. Полезен для расчёта ипотечных сроков, страховки, подписок.",
    "formula": "1 г = 12 мес",
    "faq": [
      {
        "question": "Сколько месяцев в 5 годах?",
        "answer": "5 лет = 60 месяцев."
      },
      {
        "question": "Сколько месяцев в 30 годах?",
        "answer": "30 лет = 360 месяцев."
      }
    ],
    "sources": [
      {
        "title": "Год — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Год"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 г в мес",
      "url": "/gody-v-mesyacy?value=1&from=year&to=month"
    },
    {
      "value": "2 г в мес",
      "url": "/gody-v-mesyacy?value=2&from=year&to=month"
    },
    {
      "value": "5 г в мес",
      "url": "/gody-v-mesyacy?value=5&from=year&to=month"
    }
  ]
};

// Градусы в радианы
export const angleDegToRad: Calculator = {
  id: 'angleDegToRad',
  slug: 'gradusy-v-radiany',
  title: 'Градусы в радианы',
  description: 'Перевод угловых величин из градусов в радианы',
  category: 'konvertery',
  subcategory: 'conv-ugly',
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
      options: [{ value: 'deg', label: '° (градусы)' }],
      defaultValue: 'deg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'rad', label: 'рад (радианы)' }],
      defaultValue: 'rad'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.017453292519943295;
    return [{
      value: `${value} ° = ${fmtResult(result)} рад`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в градусах, результат в радианах появится автоматически.",
    "about": "Конвертер градусов в радианы. Радиан — единица измерения угла в математике и физике.",
    "formula": "1° = π/180 ≈ 0.0174533 рад",
    "faq": [
      {
        "question": "Что такое радиан?",
        "answer": "Радиан — угол, при котором длина дуги окружности равна её радиусу. В 1 радиане ≈ 57.2958°."
      },
      {
        "question": "Сколько радиан в 180°?",
        "answer": "180° = π рад ≈ 3.14159 рад."
      }
    ],
    "sources": [
      {
        "title": "Радиан — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Радиан"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "180° в рад",
      "url": "/gradusy-v-radiany?value=180&from=deg&to=rad"
    },
    {
      "value": "90° в рад",
      "url": "/gradusy-v-radiany?value=90&from=deg&to=rad"
    },
    {
      "value": "360° в рад",
      "url": "/gradusy-v-radiany?value=360&from=deg&to=rad"
    }
  ]
};

// Радианы в градусы
export const angleRadToDeg: Calculator = {
  id: 'angleRadToDeg',
  slug: 'radiany-v-gradusy',
  title: 'Радианы в градусы',
  description: 'Перевод угловых величин из радиан в градусы',
  category: 'konvertery',
  subcategory: 'conv-ugly',
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
      options: [{ value: 'rad', label: 'рад (радианы)' }],
      defaultValue: 'rad'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'deg', label: '° (градусы)' }],
      defaultValue: 'deg'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 57.29577951308232;
    return [{
      value: `${value} рад = ${fmtResult(result)} °`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в радианах, результат в градусах появится автоматически.",
    "about": "Конвертер радиан в градусы. Необходим для перевода математических расчётов в привычные градусы.",
    "formula": "1 рад = 180°/π ≈ 57.2958°",
    "faq": [
      {
        "question": "Сколько градусов в π радианах?",
        "answer": "π рад = 180°."
      },
      {
        "question": "Сколько градусов в 2π радианах?",
        "answer": "2π рад = 360° — полный оборот."
      }
    ],
    "sources": [
      {
        "title": "Радиан — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Радиан"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 рад в °",
      "url": "/radiany-v-gradusy?value=1&from=rad&to=deg"
    },
    {
      "value": "π рад в °",
      "url": "/radiany-v-gradusy?value=3.14159&from=rad&to=deg"
    },
    {
      "value": "2 рад в °",
      "url": "/radiany-v-gradusy?value=2&from=rad&to=deg"
    }
  ]
};

// Градусы в грады
export const angleDegToGrad: Calculator = {
  id: 'angleDegToGrad',
  slug: 'gradusy-v-grady',
  title: 'Градусы в грады',
  description: 'Перевод угловых величин из градусов в грады',
  category: 'konvertery',
  subcategory: 'conv-ugly',
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
      options: [{ value: 'deg', label: '° (градусы)' }],
      defaultValue: 'deg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'grad', label: 'град (грады)' }],
      defaultValue: 'grad'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1.1111111111111112;
    return [{
      value: `${value} ° = ${fmtResult(result)} град`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в градусах, результат в градах появится автоматически.",
    "about": "Конвертер градусов в грады. Град — угловая единица, равная 1/100 прямого угла (90°).",
    "formula": "1° = 10/9 град ≈ 1.11111 град",
    "faq": [
      {
        "question": "Что такое град?",
        "answer": "Град (gon) — 1/100 прямого угла = 0.9°. Прямой угол = 100 град, полный оборот = 400 град."
      },
      {
        "question": "Сколько градусов в 100 градах?",
        "answer": "100 град = 90°."
      }
    ],
    "sources": [
      {
        "title": "Град (геометрия) — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Град_(геометрия)"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "90° в град",
      "url": "/gradusy-v-grady?value=90&from=deg&to=grad"
    },
    {
      "value": "180° в град",
      "url": "/gradusy-v-grady?value=180&from=deg&to=grad"
    },
    {
      "value": "45° в град",
      "url": "/gradusy-v-grady?value=45&from=deg&to=grad"
    }
  ]
};

// Грады в градусы
export const angleGradToDeg: Calculator = {
  id: 'angleGradToDeg',
  slug: 'grady-v-gradusy',
  title: 'Грады в градусы',
  description: 'Перевод угловых величин из градов в градусы',
  category: 'konvertery',
  subcategory: 'conv-ugly',
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
      options: [{ value: 'grad', label: 'град (грады)' }],
      defaultValue: 'grad'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'deg', label: '° (градусы)' }],
      defaultValue: 'deg'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.9;
    return [{
      value: `${value} град = ${fmtResult(result)} °`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в градах, результат в градусах появится автоматически.",
    "about": "Конвертер градов в градусы. Град (gon) — метрическая единица угла, популярная в геодезии.",
    "formula": "1 град = 0.9°",
    "faq": [
      {
        "question": "Сколько градусов в 100 гонах?",
        "answer": "100 гон = 90° (прямой угол)."
      },
      {
        "question": "Почему в геодезии используют грады?",
        "answer": "Метрическая система углов упрощает расчёты: прямой угол = 100, полный = 400."
      }
    ],
    "sources": [
      {
        "title": "Град (геометрия) — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Град_(геометрия)"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "100 град в °",
      "url": "/grady-v-gradusy?value=100&from=grad&to=deg"
    },
    {
      "value": "50 град в °",
      "url": "/grady-v-gradusy?value=50&from=grad&to=deg"
    },
    {
      "value": "200 град в °",
      "url": "/grady-v-gradusy?value=200&from=grad&to=deg"
    }
  ]
};

// Угловые минуты в градусы
export const angleArcminToDeg: Calculator = {
  id: 'angleArcminToDeg',
  slug: 'uglovye-minuty-v-gradusy',
  title: 'Угловые минуты в градусы',
  description: 'Перевод угловых величин из угловых минут в градусы',
  category: 'konvertery',
  subcategory: 'conv-ugly',
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
      options: [{ value: 'arcmin', label: 'угл. мин (угловые минуты)' }],
      defaultValue: 'arcmin'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'deg', label: '° (градусы)' }],
      defaultValue: 'deg'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.016666666666666666;
    return [{
      value: `${value} угл. мин = ${fmtResult(result)} °`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в угловых минутах, результат в градусах появится автоматически.",
    "about": "Конвертер угловых минут в градусы. Угловые минуты используются в астрономии, навигации, геодезии.",
    "formula": "1 угл. мин = 1/60° ≈ 0.016667°",
    "faq": [
      {
        "question": "Сколько угловых минут в градусе?",
        "answer": "1° = 60 угловых минут."
      },
      {
        "question": "Что такое угловая минута?",
        "answer": "1/60 градуса. В 1 угловой минуте 60 угловых секунд."
      }
    ],
    "sources": [
      {
        "title": "Угловая минута — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Угловая_минута"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "60 угл. мин в °",
      "url": "/uglovye-minuty-v-gradusy?value=60&from=arcmin&to=deg"
    },
    {
      "value": "30 угл. мин в °",
      "url": "/uglovye-minuty-v-gradusy?value=30&from=arcmin&to=deg"
    },
    {
      "value": "1 угл. мин в °",
      "url": "/uglovye-minuty-v-gradusy?value=1&from=arcmin&to=deg"
    }
  ]
};

// Градусы в угловые минуты
export const angleDegToArcmin: Calculator = {
  id: 'angleDegToArcmin',
  slug: 'gradusy-v-uglovye-minuty',
  title: 'Градусы в угловые минуты',
  description: 'Перевод угловых величин из градусов в угловые минуты',
  category: 'konvertery',
  subcategory: 'conv-ugly',
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
      options: [{ value: 'deg', label: '° (градусы)' }],
      defaultValue: 'deg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'arcmin', label: 'угл. мин (угловые минуты)' }],
      defaultValue: 'arcmin'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 60;
    return [{
      value: `${value} ° = ${fmtResult(result)} угл. мин`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в градусах, результат в угловых минутах появится автоматически.",
    "about": "Конвертер градусов в угловые минуты. Используется в астрономии для точного позиционирования объектов.",
    "formula": "1° = 60 угл. мин",
    "faq": [
      {
        "question": "Сколько угловых минут в 2 градусах?",
        "answer": "2° = 120 угловых минут."
      },
      {
        "question": "Чем отличаются угловые минуты от минут времени?",
        "answer": "Угловые минуты — единица угла (1/60°), минуты времени — единица времени (1/60 ч)."
      }
    ],
    "sources": [
      {
        "title": "Угловая минута — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Угловая_минута"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1° в угл. мин",
      "url": "/gradusy-v-uglovye-minuty?value=1&from=deg&to=arcmin"
    },
    {
      "value": "2° в угл. мин",
      "url": "/gradusy-v-uglovye-minuty?value=2&from=deg&to=arcmin"
    },
    {
      "value": "0.5° в угл. мин",
      "url": "/gradusy-v-uglovye-minuty?value=0.5&from=deg&to=arcmin"
    }
  ]
};

// Угловые секунды в градусы
export const angleArcsecToDeg: Calculator = {
  id: 'angleArcsecToDeg',
  slug: 'uglovye-sekundy-v-gradusy',
  title: 'Угловые секунды в градусы',
  description: 'Перевод угловых величин из угловых секунд в градусы',
  category: 'konvertery',
  subcategory: 'conv-ugly',
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
      options: [{ value: 'arcsec', label: 'угл. сек (угловые секунды)' }],
      defaultValue: 'arcsec'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'deg', label: '° (градусы)' }],
      defaultValue: 'deg'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0002777777777777778;
    return [{
      value: `${value} угл. сек = ${fmtResult(result)} °`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в угловых секундах, результат в градусах появится автоматически.",
    "about": "Конвертер угловых секунд в градусы. Угловые секунды — очень маленькая единица угла, используется в астрономии.",
    "formula": "1 угл. сек = 1/3600° ≈ 0.00027778°",
    "faq": [
      {
        "question": "Сколько угловых секунд в градусе?",
        "answer": "1° = 3600 угловых секунд."
      },
      {
        "question": "Что такое угловая секунда?",
        "answer": "1/3600 градуса или 1/60 угловой минуты. Стандартная единица точности в астрономии."
      }
    ],
    "sources": [
      {
        "title": "Угловая секунда — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Угловая_секунда"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "3600 угл. сек в °",
      "url": "/uglovye-sekundy-v-gradusy?value=3600&from=arcsec&to=deg"
    },
    {
      "value": "1800 угл. сек в °",
      "url": "/uglovye-sekundy-v-gradusy?value=1800&from=arcsec&to=deg"
    },
    {
      "value": "1 угл. сек в °",
      "url": "/uglovye-sekundy-v-gradusy?value=1&from=arcsec&to=deg"
    }
  ]
};

// Градусы в угловые секунды
export const angleDegToArcsec: Calculator = {
  id: 'angleDegToArcsec',
  slug: 'gradusy-v-uglovye-sekundy',
  title: 'Градусы в угловые секунды',
  description: 'Перевод угловых величин из градусов в угловые секунды',
  category: 'konvertery',
  subcategory: 'conv-ugly',
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
      options: [{ value: 'deg', label: '° (градусы)' }],
      defaultValue: 'deg'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'arcsec', label: 'угл. сек (угловые секунды)' }],
      defaultValue: 'arcsec'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 3600;
    return [{
      value: `${value} ° = ${fmtResult(result)} угл. сек`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в градусах, результат в угловых секундах появится автоматически.",
    "about": "Конвертер градусов в угловые секунды. Астрономия использует угловые секунды для точного позиционирования звёзд.",
    "formula": "1° = 3600 угл. сек",
    "faq": [
      {
        "question": "Сколько угловых секунд в 0.5°?",
        "answer": "0.5° = 1800 угловых секунд."
      },
      {
        "question": "Почему в астрономии используют угловые секунды?",
        "answer": "Для описания очень малых угловых расстояний между небесными объектами."
      }
    ],
    "sources": [
      {
        "title": "Угловая секунда — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Угловая_секунда"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1° в угл. сек",
      "url": "/gradusy-v-uglovye-sekundy?value=1&from=deg&to=arcsec"
    },
    {
      "value": "0.5° в угл. сек",
      "url": "/gradusy-v-uglovye-sekundy?value=0.5&from=deg&to=arcsec"
    },
    {
      "value": "2° в угл. сек",
      "url": "/gradusy-v-uglovye-sekundy?value=2&from=deg&to=arcsec"
    }
  ]
};

// Байты в килобайты
export const dataByteToKb: Calculator = {
  id: 'dataByteToKb',
  slug: 'bajty-v-kilobajty',
  title: 'Байты в килобайты',
  description: 'Перевод данных из байт в килобайты',
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
      options: [{ value: 'byte', label: 'байт' }],
      defaultValue: 'byte'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kb', label: 'КБ (килобайты)' }],
      defaultValue: 'kb'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0009765625;
    return [{
      value: `${value} байт = ${fmtResult(result)} КБ`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в байтах, результат в килобайтах появится автоматически.",
    "about": "Конвертер байт в килобайты. В информатике 1 КБ = 1024 байт (стандарт IEC).",
    "formula": "1 байт = 1/1024 КБ ≈ 0.00097656 КБ",
    "faq": [
      {
        "question": "Сколько байт в 1 КБ?",
        "answer": "1 КБ = 1024 байт."
      },
      {
        "question": "В чём разница между КБ и кБ?",
        "answer": "КБ (кибибайт) = 1024 байт. кБ (килобайт) = 1000 байт. В быту обычно подразумевают 1024."
      }
    ],
    "sources": [
      {
        "title": "Байт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Байт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1024 байт в КБ",
      "url": "/bajty-v-kilobajty?value=1024&from=byte&to=kb"
    },
    {
      "value": "512 байт в КБ",
      "url": "/bajty-v-kilobajty?value=512&from=byte&to=kb"
    },
    {
      "value": "2048 байт в КБ",
      "url": "/bajty-v-kilobajty?value=2048&from=byte&to=kb"
    }
  ]
};

// Килобайты в байты
export const dataKbToByte: Calculator = {
  id: 'dataKbToByte',
  slug: 'kilobajty-v-bajty',
  title: 'Килобайты в байты',
  description: 'Перевод данных из килобайт в байты',
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
      options: [{ value: 'kb', label: 'КБ (килобайты)' }],
      defaultValue: 'kb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'byte', label: 'байт' }],
      defaultValue: 'byte'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1024;
    return [{
      value: `${value} КБ = ${fmtResult(result)} байт`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в килобайтах, результат в байтах появится автоматически.",
    "about": "Конвертер килобайт в байты. 1 КБ = 1024 байт. Используется для описания размеров малых файлов.",
    "formula": "1 КБ = 1024 байт",
    "faq": [
      {
        "question": "Сколько байт в 1 МБ?",
        "answer": "1 МБ = 1024 КБ = 1 048 576 байт."
      },
      {
        "question": "Почему 1 КБ = 1024, а не 1000?",
        "answer": "Компьютеры работают в двоичной системе, 1024 = 2^10 — удобная степень двойки."
      }
    ],
    "sources": [
      {
        "title": "Байт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Байт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 КБ в байт",
      "url": "/kilobajty-v-bajty?value=1&from=kb&to=byte"
    },
    {
      "value": "2 КБ в байт",
      "url": "/kilobajty-v-bajty?value=2&from=kb&to=byte"
    },
    {
      "value": "0.5 КБ в байт",
      "url": "/kilobajty-v-bajty?value=0.5&from=kb&to=byte"
    }
  ]
};

// Килобайты в мегабайты
export const dataKbToMb: Calculator = {
  id: 'dataKbToMb',
  slug: 'kilobajty-v-megabajty',
  title: 'Килобайты в мегабайты',
  description: 'Перевод данных из килобайт в мегабайты',
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
      options: [{ value: 'kb', label: 'КБ (килобайты)' }],
      defaultValue: 'kb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'mb', label: 'МБ (мегабайты)' }],
      defaultValue: 'mb'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0009765625;
    return [{
      value: `${value} КБ = ${fmtResult(result)} МБ`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в килобайтах, результат в мегабайтах появится автоматически.",
    "about": "Конвертер килобайт в мегабайты. 1 МБ = 1024 КБ. Стандартный размер для фотографий и документов.",
    "formula": "1 КБ = 1/1024 МБ ≈ 0.00097656 МБ",
    "faq": [
      {
        "question": "Сколько КБ в 1 МБ?",
        "answer": "1 МБ = 1024 КБ."
      },
      {
        "question": "Сколько байт в 1 МБ?",
        "answer": "1 МБ = 1024 × 1024 = 1 048 576 байт."
      }
    ],
    "sources": [
      {
        "title": "Мегабайт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Мегабайт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1024 КБ в МБ",
      "url": "/kilobajty-v-megabajty?value=1024&from=kb&to=mb"
    },
    {
      "value": "512 КБ в МБ",
      "url": "/kilobajty-v-megabajty?value=512&from=kb&to=mb"
    },
    {
      "value": "2048 КБ в МБ",
      "url": "/kilobajty-v-megabajty?value=2048&from=kb&to=mb"
    }
  ]
};

// Мегабайты в килобайты
export const dataMbToKb: Calculator = {
  id: 'dataMbToKb',
  slug: 'megabajty-v-kilobajty',
  title: 'Мегабайты в килобайты',
  description: 'Перевод данных из мегабайт в килобайты',
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
      options: [{ value: 'mb', label: 'МБ (мегабайты)' }],
      defaultValue: 'mb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'kb', label: 'КБ (килобайты)' }],
      defaultValue: 'kb'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1024;
    return [{
      value: `${value} МБ = ${fmtResult(result)} КБ`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в мегабайтах, результат в килобайтах появится автоматически.",
    "about": "Конвертер мегабайт в килобайты. Используется для сравнения размеров файлов и скорости загрузки.",
    "formula": "1 МБ = 1024 КБ",
    "faq": [
      {
        "question": "Сколько КБ в 5 МБ?",
        "answer": "5 МБ = 5 × 1024 = 5120 КБ."
      },
      {
        "question": "Чем отличается МБ от Мб?",
        "answer": "МБ (мегабайт) = 8 Мб (мегабит). Байт = 8 бит."
      }
    ],
    "sources": [
      {
        "title": "Мегабайт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Мегабайт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 МБ в КБ",
      "url": "/megabajty-v-kilobajty?value=1&from=mb&to=kb"
    },
    {
      "value": "5 МБ в КБ",
      "url": "/megabajty-v-kilobajty?value=5&from=mb&to=kb"
    },
    {
      "value": "10 МБ в КБ",
      "url": "/megabajty-v-kilobajty?value=10&from=mb&to=kb"
    }
  ]
};

// Мегабайты в гигабайты
export const dataMbToGb: Calculator = {
  id: 'dataMbToGb',
  slug: 'megabajty-v-gigabajty',
  title: 'Мегабайты в гигабайты',
  description: 'Перевод данных из мегабайт в гигабайты',
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
      options: [{ value: 'mb', label: 'МБ (мегабайты)' }],
      defaultValue: 'mb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'gb', label: 'ГБ (гигабайты)' }],
      defaultValue: 'gb'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0009765625;
    return [{
      value: `${value} МБ = ${fmtResult(result)} ГБ`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в мегабайтах, результат в гигабайтах появится автоматически.",
    "about": "Конвертер мегабайт в гигабайты. 1 ГБ = 1024 МБ. Размер фильмов, игр, программ.",
    "formula": "1 МБ = 1/1024 ГБ ≈ 0.00097656 ГБ",
    "faq": [
      {
        "question": "Сколько МБ в 1 ГБ?",
        "answer": "1 ГБ = 1024 МБ."
      },
      {
        "question": "Сколько ГБ в типовом фильме?",
        "answer": "Full HD фильм: 1.5–4 ГБ. 4K фильм: 10–50 ГБ."
      }
    ],
    "sources": [
      {
        "title": "Гигабайт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Гигабайт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1024 МБ в ГБ",
      "url": "/megabajty-v-gigabajty?value=1024&from=mb&to=gb"
    },
    {
      "value": "512 МБ в ГБ",
      "url": "/megabajty-v-gigabajty?value=512&from=mb&to=gb"
    },
    {
      "value": "2048 МБ в ГБ",
      "url": "/megabajty-v-gigabajty?value=2048&from=mb&to=gb"
    }
  ]
};

// Гигабайты в мегабайты
export const dataGbToMb: Calculator = {
  id: 'dataGbToMb',
  slug: 'gigabajty-v-megabajty',
  title: 'Гигабайты в мегабайты',
  description: 'Перевод данных из гигабайт в мегабайты',
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
      options: [{ value: 'gb', label: 'ГБ (гигабайты)' }],
      defaultValue: 'gb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'mb', label: 'МБ (мегабайты)' }],
      defaultValue: 'mb'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1024;
    return [{
      value: `${value} ГБ = ${fmtResult(result)} МБ`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в гигабайтах, результат в мегабайтах появится автоматически.",
    "about": "Конвертер гигабайт в мегабайты. Используется для расчёта объёма памяти и трафика.",
    "formula": "1 ГБ = 1024 МБ",
    "faq": [
      {
        "question": "Сколько МБ в 2 ГБ?",
        "answer": "2 ГБ = 2048 МБ."
      },
      {
        "question": "Почему жёсткий диск на 1 ТБ показывает меньше?",
        "answer": "Производители используют десятичные единицы (1 ТБ = 1000 ГБ), а ОС — двоичные (1 ТиБ = 1024 ГиБ)."
      }
    ],
    "sources": [
      {
        "title": "Гигабайт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Гигабайт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 ГБ в МБ",
      "url": "/gigabajty-v-megabajty?value=1&from=gb&to=mb"
    },
    {
      "value": "2 ГБ в МБ",
      "url": "/gigabajty-v-megabajty?value=2&from=gb&to=mb"
    },
    {
      "value": "0.5 ГБ в МБ",
      "url": "/gigabajty-v-megabajty?value=0.5&from=gb&to=mb"
    }
  ]
};

// Гигабайты в терабайты
export const dataGbToTb: Calculator = {
  id: 'dataGbToTb',
  slug: 'gigabajty-v-terabajty',
  title: 'Гигабайты в терабайты',
  description: 'Перевод данных из гигабайт в терабайты',
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
      options: [{ value: 'gb', label: 'ГБ (гигабайты)' }],
      defaultValue: 'gb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'tb', label: 'ТБ (терабайты)' }],
      defaultValue: 'tb'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0009765625;
    return [{
      value: `${value} ГБ = ${fmtResult(result)} ТБ`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в гигабайтах, результат в терабайтах появится автоматически.",
    "about": "Конвертер гигабайт в терабайты. 1 ТБ = 1024 ГБ. Объём жёстких дисков и серверов.",
    "formula": "1 ГБ = 1/1024 ТБ ≈ 0.00097656 ТБ",
    "faq": [
      {
        "question": "Сколько ГБ в 1 ТБ?",
        "answer": "1 ТБ = 1024 ГБ."
      },
      {
        "question": "Сколько фильмов в 1 ТБ?",
        "answer": "Примерно 200–500 Full HD фильмов в зависимости от качества."
      }
    ],
    "sources": [
      {
        "title": "Терабайт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Терабайт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1024 ГБ в ТБ",
      "url": "/gigabajty-v-terabajty?value=1024&from=gb&to=tb"
    },
    {
      "value": "512 ГБ в ТБ",
      "url": "/gigabajty-v-terabajty?value=512&from=gb&to=tb"
    },
    {
      "value": "2048 ГБ в ТБ",
      "url": "/gigabajty-v-terabajty?value=2048&from=gb&to=tb"
    }
  ]
};

// Терабайты в гигабайты
export const dataTbToGb: Calculator = {
  id: 'dataTbToGb',
  slug: 'terabajty-v-gigabajty',
  title: 'Терабайты в гигабайты',
  description: 'Перевод данных из терабайт в гигабайты',
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
      options: [{ value: 'tb', label: 'ТБ (терабайты)' }],
      defaultValue: 'tb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'gb', label: 'ГБ (гигабайты)' }],
      defaultValue: 'gb'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 1024;
    return [{
      value: `${value} ТБ = ${fmtResult(result)} ГБ`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в терабайтах, результат в гигабайтах появится автоматически.",
    "about": "Конвертер терабайт в гигабайты. 1 ТБ = 1024 ГБ. Стандарт для жёстких дисков и SSD.",
    "formula": "1 ТБ = 1024 ГБ",
    "faq": [
      {
        "question": "Сколько ГБ в 2 ТБ?",
        "answer": "2 ТБ = 2048 ГБ."
      },
      {
        "question": "Чем отличается ТБ от ТиБ?",
        "answer": "ТБ (террабайт) = 10^12 байт. ТиБ (тебибайт) = 2^40 = 1 099 511 627 776 байт."
      }
    ],
    "sources": [
      {
        "title": "Терабайт — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Терабайт"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 ТБ в ГБ",
      "url": "/terabajty-v-gigabajty?value=1&from=tb&to=gb"
    },
    {
      "value": "2 ТБ в ГБ",
      "url": "/terabajty-v-gigabajty?value=2&from=tb&to=gb"
    },
    {
      "value": "0.5 ТБ в ГБ",
      "url": "/terabajty-v-gigabajty?value=0.5&from=tb&to=gb"
    }
  ]
};

// Мегабиты в мегабайты
export const dataMbitToMb: Calculator = {
  id: 'dataMbitToMb',
  slug: 'megabity-v-megabajty',
  title: 'Мегабиты в мегабайты',
  description: 'Перевод данных из мегабит в мегабайты',
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
      options: [{ value: 'mbit', label: 'Мбит (мегабиты)' }],
      defaultValue: 'mbit'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'mb', label: 'МБ (мегабайты)' }],
      defaultValue: 'mb'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 0.125;
    return [{
      value: `${value} Мбит = ${fmtResult(result)} МБ`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в мегабитах, результат в мегабайтах появится автоматически.",
    "about": "Конвертер мегабит в мегабайты. Важно: скорость интернета измеряется в Мбит/с, а файлы — в МБ.",
    "formula": "1 Мбит = 0.125 МБ",
    "faq": [
      {
        "question": "Сколько Мбит в 1 МБ?",
        "answer": "1 МБ = 8 Мбит."
      },
      {
        "question": "Почему скорость интернета 100 Мбит/с, а файл качается 12.5 МБ/с?",
        "answer": "Потому что 100 Мбит/с = 100 / 8 = 12.5 МБ/с."
      }
    ],
    "sources": [
      {
        "title": "Мегабит — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Мегабит"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "8 Мбит в МБ",
      "url": "/megabity-v-megabajty?value=8&from=mbit&to=mb"
    },
    {
      "value": "100 Мбит в МБ",
      "url": "/megabity-v-megabajty?value=100&from=mbit&to=mb"
    },
    {
      "value": "1 Мбит в МБ",
      "url": "/megabity-v-megabajty?value=1&from=mbit&to=mb"
    }
  ]
};

// Мегабайты в мегабиты
export const dataMbToMbit: Calculator = {
  id: 'dataMbToMbit',
  slug: 'megabajty-v-megabity',
  title: 'Мегабайты в мегабиты',
  description: 'Перевод данных из мегабайт в мегабиты',
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
      options: [{ value: 'mb', label: 'МБ (мегабайты)' }],
      defaultValue: 'mb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [{ value: 'mbit', label: 'Мбит (мегабиты)' }],
      defaultValue: 'mbit'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const result = value * 8;
    return [{
      value: `${value} МБ = ${fmtResult(result)} Мбит`,
      label: 'Результат'
    }];
  },
  content: {
    "howTo": "Введите значение в мегабайтах, результат в мегабитах появится автоматически.",
    "about": "Конвертер мегабайт в мегабиты. Полезен для расчёта времени загрузки файла при заданной скорости.",
    "formula": "1 МБ = 8 Мбит",
    "faq": [
      {
        "question": "Сколько мегабит в 100 МБ?",
        "answer": "100 МБ = 800 Мбит."
      },
      {
        "question": "Сколько времени качать файл 100 МБ при 10 Мбит/с?",
        "answer": "800 Мбит / 10 Мбит/с = 80 секунд ≈ 1 мин 20 с."
      }
    ],
    "sources": [
      {
        "title": "Мегабит — Википедия",
        "url": "https://ru.wikipedia.org/wiki/Мегабит"
      }
    ],
    "updatedAt": "2026-04-28"
  },
  popularCalculations: [
    {
      "value": "1 МБ в Мбит",
      "url": "/megabajty-v-megabity?value=1&from=mb&to=mbit"
    },
    {
      "value": "10 МБ в Мбит",
      "url": "/megabajty-v-megabity?value=10&from=mb&to=mbit"
    },
    {
      "value": "100 МБ в Мбит",
      "url": "/megabajty-v-megabity?value=100&from=mb&to=mbit"
    }
  ]
};

export const allConverters: Calculator[] = [
  pressurePaToMmHg,
  pressureMmHgToPa,
  pressureBarToAtm,
  pressureAtmToBar,
  pressureBarToPa,
  pressurePaToBar,
  pressurePsiToBar,
  pressureBarToPsi,
  pressureKpaToPa,
  pressurePaToKpa,
  pressureMpaToPa,
  pressurePaToMpa,
  pressureAtToPa,
  pressurePaToAt,
  energyJToCal,
  energyCalToJ,
  energyKcalToJ,
  energyJToKcal,
  energyKwhToJ,
  energyJToKwh,
  energyEvToJ,
  energyJToEv,
  powerWToKw,
  powerKwToW,
  powerKwToHp,
  powerHpToKw,
  powerWToHp,
  powerHpToW,
  powerMwToKw,
  powerKwToMw,
  timeSecToMin,
  timeMinToSec,
  timeMinToHour,
  timeHourToMin,
  timeHourToDay,
  timeDayToHour,
  timeDayToWeek,
  timeWeekToDay,
  timeDayToMonth,
  timeMonthToDay,
  timeMonthToYear,
  timeYearToMonth,
  angleDegToRad,
  angleRadToDeg,
  angleDegToGrad,
  angleGradToDeg,
  angleArcminToDeg,
  angleDegToArcmin,
  angleArcsecToDeg,
  angleDegToArcsec,
  dataByteToKb,
  dataKbToByte,
  dataKbToMb,
  dataMbToKb,
  dataMbToGb,
  dataGbToMb,
  dataGbToTb,
  dataTbToGb,
  dataMbitToMb,
  dataMbToMbit
];