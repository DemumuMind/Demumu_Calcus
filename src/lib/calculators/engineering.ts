import { Calculator } from '../types';

// Калькулятор закона Ома
export const ohmsLawCalculator: Calculator = {
  id: 'ohms-law-calculator',
  slug: 'zakon-oma',
  title: 'Закон Ома',
  description: 'Расчёт напряжения, силы тока, сопротивления',
  category: 'nauka-i-ucheba',
  subcategory: 'fizika',
  type: 'formula',
  inputs: [
    {
      name: 'voltage',
      label: 'Напряжение U (В)',
      type: 'number',
      placeholder: '12',
      defaultValue: 12,
      min: 0
    },
    {
      name: 'current',
      label: 'Сила тока I (А)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 0
    },
    {
      name: 'resistance',
      label: 'Сопротивление R (Ом)',
      type: 'number',
      placeholder: '6',
      defaultValue: 6,
      min: 0
    }
  ],
  outputs: [
    { name: 'power', label: 'Мощность', type: 'number', unit: 'Вт' },
    { name: 'formula', label: 'Использованная формула', type: 'text' }
  ],
  calculate: (inputs) => {
    const U = Number(inputs.voltage);
    const I = Number(inputs.current);
    const R = Number(inputs.resistance);
    
    // Determine which value to calculate
    let calculatedU = U, calculatedI = I, calculatedR = R, usedFormula = '';
    
    if (U && I && !R) {
      calculatedR = U / I;
      usedFormula = 'R = U / I';
    } else if (U && R && !I) {
      calculatedI = U / R;
      usedFormula = 'I = U / R';
    } else if (I && R && !U) {
      calculatedU = I * R;
      usedFormula = 'U = I × R';
    } else if (U && I && R) {
      usedFormula = 'Проверка: U = I×R ✓';
    } else {
      return [{ value: 'Введите два значения из трёх', label: 'Ошибка' }];
    }
    
    const power = calculatedU * calculatedI;
    
    return [
      { value: power.toFixed(2), label: 'Мощность', unit: 'Вт' },
      { value: usedFormula, label: 'Формула', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите два из трёх значений (напряжение, ток, сопротивление). Калькулятор рассчитает третье и мощность.',
    about: 'Закон Ома — основной закон электрической цепи: U = I × R. Напряжение равно произведению тока на сопротивление.',
    usage: 'Используется при расчёте электрических цепей, выборе резисторов, диагностике неисправностей.',
    formula: 'U = I × R\nI = U / R\nR = U / I\nP = U × I = I² × R = U² / R',
    faq: [
      {
        question: 'Что такое закон Ома?',
        answer: 'Закон Ома гласит: сила тока прямо пропорциональна напряжению и обратно пропорциональна сопротивлению.'
      },
      {
        question: 'Как рассчитать мощность?',
        answer: 'Мощность P = U × I. Также P = I² × R или P = U² / R, если известны другие параметры.'
      }
    ],
    sources: [
      { title: 'Закон Ома — Википедия', url: 'https://ru.wikipedia.org/wiki/Закон_Ома' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор сопротивления проводника
export const wireResistanceCalculator: Calculator = {
  id: 'wire-resistance-calculator',
  slug: 'soprotivlenie-provodnika',
  title: 'Сопротивление проводника',
  description: 'Расчёт сопротивления провода по материалу и размеру',
  category: 'nauka-i-ucheba',
  subcategory: 'fizika',
  type: 'formula',
  inputs: [
    {
      name: 'material',
      label: 'Материал',
      type: 'select',
      options: [
        { value: '0.0175', label: 'Медь (0.0175 Ом·мм²/м)' },
        { value: '0.028', label: 'Алюминий (0.028 Ом·мм²/м)' },
        { value: '0.13', label: 'Сталь (0.13 Ом·мм²/м)' },
        { value: '0.0172', label: 'Серебро (0.0172 Ом·мм²/м)' },
        { value: '0.021', label: 'Золото (0.021 Ом·мм²/м)' },
        { value: '0.095', label: 'Железо (0.095 Ом·мм²/м)' }
      ],
      defaultValue: '0.0175'
    },
    {
      name: 'length',
      label: 'Длина провода (м)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0.1
    },
    {
      name: 'crossSection',
      label: 'Площадь сечения (мм²)',
      type: 'number',
      placeholder: '2.5',
      defaultValue: 2.5,
      min: 0.01
    }
  ],
  outputs: [
    { name: 'resistance', label: 'Сопротивление', type: 'number', unit: 'Ом' },
    { name: 'powerLoss', label: 'Потери мощности (при 10А)', type: 'number', unit: 'Вт' }
  ],
  calculate: (inputs) => {
    const resistivity = Number(inputs.material);
    const length = Number(inputs.length);
    const crossSection = Number(inputs.crossSection);
    
    if (!length || !crossSection) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // R = ρ × L / S
    const resistance = (resistivity * length) / crossSection;
    const powerLoss = 10 * 10 * resistance; // At 10A current
    
    return [
      { value: resistance.toFixed(3), label: 'Сопротивление', unit: 'Ом' },
      { value: powerLoss.toFixed(2), label: 'Потери мощности (при 10А)', unit: 'Вт' }
    ];
  },
  content: {
    howTo: 'Выберите материал провода, введите длину и площадь сечения. Калькулятор рассчитает сопротивление.',
    about: 'Сопротивление проводника зависит от удельного сопротивления материала, длины и обратно пропорционально площади сечения.',
    usage: 'Используется при проектировании электропроводки, выборе сечения кабелей, расчёте потерь.',
    formula: 'R = ρ × L / S\nгде ρ — удельное сопротивление, L — длина, S — площадь сечения',
    faq: [
      {
        question: 'Почему медь лучше алюминия?',
        answer: 'Медь имеет меньшее удельное сопротивление (0.0175 vs 0.028), поэтому при том же сечении меньше теряет энергию.'
      },
      {
        question: 'Как влияет сечение на сопротивление?',
        answer: 'Сопротивление обратно пропорционально площади сечения. Увеличение сечения в 2 раза уменьшает сопротивление в 2 раза.'
      }
    ],
    sources: [
      { title: 'Электрическое сопротивление — Википедия', url: 'https://ru.wikipedia.org/wiki/Электрическое_сопротивление' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор конденсатора (RC-цепь)
export const capacitorCalculator: Calculator = {
  id: 'capacitor-calculator',
  slug: 'rc-cepy',
  title: 'RC-цепь',
  description: 'Расчёт постоянной времени RC-цепи (заряд/разряд)',
  category: 'nauka-i-ucheba',
  subcategory: 'fizika',
  type: 'formula',
  inputs: [
    {
      name: 'resistance',
      label: 'Сопротивление R (кОм)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0.001
    },
    {
      name: 'capacitance',
      label: 'Ёмкость C (мкФ)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0.001
    },
    {
      name: 'voltage',
      label: 'Напряжение питания (В)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    }
  ],
  outputs: [
    { name: 'timeConstant', label: 'Постоянная времени τ', type: 'number', unit: 'сек' },
    { name: 'chargeTime', label: 'Время заряда до 99%', type: 'number', unit: 'сек' },
    { name: 'frequency', label: 'Частота среза', type: 'number', unit: 'Гц' }
  ],
  calculate: (inputs) => {
    const R = Number(inputs.resistance) * 1000; // to ohms
    const C = Number(inputs.capacitance) / 1000000; // to farads
    const V = Number(inputs.voltage);
    
    if (!R || !C) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const tau = R * C; // seconds
    const chargeTime = 5 * tau; // 99% charge
    const cutoffFreq = 1 / (2 * Math.PI * tau);
    
    return [
      { value: tau.toFixed(3), label: 'Постоянная времени τ', unit: 'сек' },
      { value: chargeTime.toFixed(2), label: 'Время заряда до 99%', unit: 'сек' },
      { value: cutoffFreq.toFixed(2), label: 'Частота среза', unit: 'Гц' }
    ];
  },
  content: {
    howTo: 'Введите сопротивление, ёмкость и напряжение. Калькулятор рассчитает постоянную времени и характеристики RC-цепи.',
    about: 'RC-цепь — последовательное соединение резистора и конденсатора. Постоянная времени τ = R×C определяет скорость заряда/разряда.',
    usage: 'Используется при проектировании фильтров, таймеров, сглаживающих цепей, генераторов.',
    formula: 'τ = R × C\nВремя заряда до 63% = τ\nВремя заряда до 99% ≈ 5τ\nЧастота среза = 1/(2πRC)',
    faq: [
      {
        question: 'Что такое постоянная времени τ?',
        answer: 'Время, за которое конденсатор заряжается примерно до 63% от максимального напряжения.'
      },
      {
        question: 'Как использовать RC-цепь как фильтр?',
        answer: 'RC-цепь работает как фильтр низких частот. Частоты ниже частоты среза проходят, выше — ослабляются.'
      }
    ],
    sources: [
      { title: 'RC-цепь — Википедия', url: 'https://ru.wikipedia.org/wiki/RC-цепь' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const engineeringCalculators = [
  ohmsLawCalculator,
  wireResistanceCalculator,
  capacitorCalculator,
];
