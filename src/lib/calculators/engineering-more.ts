import { Calculator } from '../types';

// 1. Калькулятор трубопровода
export const pipeCalculator: Calculator = {
  id: 'pipe-calculator',
  slug: 'truboprovod',
  title: 'Трубопровод',
  description: 'Расчёт диаметра, расхода, скорости потока и потерь давления в трубопроводе',
  category: 'nauka-i-ucheba',
  subcategory: 'inzhenernye-raschety',
  type: 'formula',
  inputs: [
    {
      name: 'diameter',
      label: 'Диаметр трубы D (мм)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 1
    },
    {
      name: 'flowRate',
      label: 'Расход Q (м³/ч)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    },
    {
      name: 'velocity',
      label: 'Скорость v (м/с)',
      type: 'number',
      placeholder: '1.4',
      defaultValue: 1.4,
      min: 0
    },
    {
      name: 'length',
      label: 'Длина трубы L (м)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0
    },
    {
      name: 'roughness',
      label: 'Шероховатость',
      type: 'select',
      options: [
        { value: '0.0001', label: 'Сталь новая (0.1 мм)' },
        { value: '0.0002', label: 'Сталь после эксплуатации (0.2 мм)' },
        { value: '0.0005', label: 'Чугун (0.5 мм)' },
        { value: '0.0015', label: 'Асбестоцемент (1.5 мм)' },
        { value: '0.00001', label: 'Медь/пластик (0.01 мм)' }
      ],
      defaultValue: '0.0002'
    },
    {
      name: 'fluid',
      label: 'Среда',
      type: 'select',
      options: [
        { value: 'water', label: 'Вода (20°C)' },
        { value: 'oil', label: 'Масло (40°C)' },
        { value: 'air', label: 'Воздух (20°C)' }
      ],
      defaultValue: 'water'
    }
  ],
  outputs: [
    { name: 'velocity', label: 'Скорость потока', type: 'number', unit: 'м/с' },
    { name: 'flowRate', label: 'Расход', type: 'number', unit: 'м³/ч' },
    { name: 'reynolds', label: 'Число Рейнольдса', type: 'number', unit: '' },
    { name: 'pressureDrop', label: 'Потеря давления', type: 'number', unit: 'Па' }
  ],
  calculate: (inputs) => {
    const D = Number(inputs.diameter) / 1000; // в метры
    const Q_input = Number(inputs.flowRate);
    const v_input = Number(inputs.velocity);
    const L = Number(inputs.length);
    const roughness = Number(inputs.roughness);
    const fluid = String(inputs.fluid);

    if (!D) return [{ value: 'Введите диаметр', label: 'Ошибка' }];

    // Свойства сред
    const properties = {
      water: { density: 1000, viscosity: 0.001 },
      oil: { density: 900, viscosity: 0.1 },
      air: { density: 1.2, viscosity: 0.000018 }
    };
    const props = properties[fluid as keyof typeof properties];

    const A = Math.PI * D * D / 4; // площадь сечения

    let Q = Q_input;
    let v = v_input;

    if (Q && !v) {
      v = (Q / 3600) / A;
    } else if (v && !Q) {
      Q = v * A * 3600;
    } else if (!Q && !v) {
      return [{ value: 'Введите расход или скорость', label: 'Ошибка' }];
    }

    // Число Рейнольдса
    const Re = (props.density * v * D) / props.viscosity;

    // Формула Дарси-Вейсбаха для потерь давления
    // lambda = 0.316/Re^0.25 для турбулентного течения (формула Блазиуса)
    let lambda = 0.316 / Math.pow(Re, 0.25);
    if (Re < 2300) {
      lambda = 64 / Re; // ламинарное течение
    }

    // Потеря давления: deltaP = lambda * (L/D) * (rho*v²/2)
    const pressureDrop = lambda * (L / D) * (props.density * v * v / 2);

    return [
      { value: v.toFixed(2), label: 'Скорость потока', unit: 'м/с' },
      { value: Q.toFixed(2), label: 'Расход', unit: 'м³/ч' },
      { value: Math.round(Re).toString(), label: 'Число Рейнольдса', unit: '' },
      { value: Math.round(pressureDrop).toString(), label: 'Потеря давления', unit: 'Па' }
    ];
  },
  content: {
    howTo: 'Введите диаметр трубы, длину и расход (или скорость). Выберите материал трубы и среду. Калькулятор рассчитает гидравлические параметры.',
    about: 'Калькулятор трубопровода использует формулы гидравлики для расчёта скорости потока, расхода, числа Рейнольдса и потерь давления по методу Дарси-Вейсбаха.',
    usage: 'Используется при проектировании систем водоснабжения, отопления, пневматических и гидравлических систем.',
    formula: 'Q = v * A, Re = (rho*v*D) / mu, deltaP = lambda * (L/D) * (rho*v²/2), где A = pi*D²/4, lambda - коэффициент сопротивления',
    faq: [
      {
        question: 'Что такое число Рейнольдса?',
        answer: 'Число Re определяет режим течения: при Re < 2300 - ламинарное, при Re > 4000 - турбулентное течение.'
      },
      {
        question: 'Как влияет диаметр на потери давления?',
        answer: 'Потери давления обратно пропорциональны диаметру в 5-й степени при постоянном расходе. Увеличение диаметра существенно снижает сопротивление.'
      }
    ],
    sources: [
      { title: 'Формула Дарси-Вейсбаха - Википедия', url: 'https://ru.wikipedia.org/wiki/Формула_Дарси-Вейсбаха' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 2. Калькулятор ременной передачи
export const beltPulleyCalculator: Calculator = {
  id: 'belt-pulley-calculator',
  slug: 'remennaya-peredacha',
  title: 'Ременная передача',
  description: 'Расчёт передаточного отношения, длины ремня и центрального расстояния',
  category: 'nauka-i-ucheba',
  subcategory: 'inzhenernye-raschety',
  type: 'formula',
  inputs: [
    {
      name: 'drivingPulley',
      label: 'Диаметр ведущего шкива d1 (мм)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 1
    },
    {
      name: 'drivenPulley',
      label: 'Диаметр ведомого шкива d2 (мм)',
      type: 'number',
      placeholder: '200',
      defaultValue: 200,
      min: 1
    },
    {
      name: 'centerDistance',
      label: 'Центральное расстояние a (мм)',
      type: 'number',
      placeholder: '500',
      defaultValue: 500,
      min: 1
    },
    {
      name: 'drivingRpm',
      label: 'Частота вращения ведущего n1 (об/мин)',
      type: 'number',
      placeholder: '1500',
      defaultValue: 1500,
      min: 0
    }
  ],
  outputs: [
    { name: 'ratio', label: 'Передаточное отношение', type: 'number', unit: '' },
    { name: 'drivenRpm', label: 'Частота ведомого', type: 'number', unit: 'об/мин' },
    { name: 'beltLength', label: 'Длина ремня', type: 'number', unit: 'мм' }
  ],
  calculate: (inputs) => {
    const d1 = Number(inputs.drivingPulley);
    const d2 = Number(inputs.drivenPulley);
    const a = Number(inputs.centerDistance);
    const n1 = Number(inputs.drivingRpm);

    if (!d1 || !d2 || !a) {
      return [{ value: 'Введите все размеры', label: 'Ошибка' }];
    }

    // Передаточное отношение
    const ratio = d2 / d1;

    // Частота ведомого шкива
    const n2 = n1 ? n1 / ratio : 0;

    // Длина ремня для открытой передачи: L = 2a + pi(d1+d2)/2 + (d2-d1)²/(4a)
    const beltLength = 2 * a + (Math.PI * (d1 + d2)) / 2 + Math.pow(d2 - d1, 2) / (4 * a);

    return [
      { value: ratio.toFixed(2), label: 'Передаточное отношение', unit: '' },
      { value: n2 ? Math.round(n2).toString() : '-', label: 'Частота ведомого', unit: 'об/мин' },
      { value: Math.round(beltLength).toString(), label: 'Длина ремня', unit: 'мм' }
    ];
  },
  content: {
    howTo: 'Введите диаметры шкивов, центральное расстояние и частоту вращения. Калькулятор определит передаточное отношение и длину ремня.',
    about: 'Ременная передача передаёт вращение между валами с помощью ремня и шкивов. Передаточное отношение обратно пропорционально диаметрам шкивов.',
    usage: 'Применяется для снижения или повышения оборотов, передачи мощности между удалёнными валами, демпфирования колебаний.',
    formula: 'i = d2/d1, n2 = n1/i, L = 2a + pi(d1+d2)/2 + (d2-d1)²/(4a)',
    faq: [
      {
        question: 'Как определить направление вращения?',
        answer: 'При открытой передаче (схема с чертежа) шестерни вращаются в одном направлении. При перекрёстной - в противоположных.'
      },
      {
        question: 'Какое рекомендуется центральное расстояние?',
        answer: 'Оптимальное центральное расстояние: a = (d1+d2)/2 до 2(d1+d2). Минимум - 0.7(d1+d2).'
      }
    ],
    sources: [
      { title: 'Ременная передача - Википедия', url: 'https://ru.wikipedia.org/wiki/Ремённая_передача' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 3. Калькулятор пружины
export const springCalculator: Calculator = {
  id: 'spring-calculator',
  slug: 'pruzhina',
  title: 'Пружина',
  description: 'Расчёт жёсткости, деформации и параметров сжатия, растяжения, кручения',
  category: 'nauka-i-ucheba',
  subcategory: 'inzhenernye-raschety',
  type: 'formula',
  inputs: [
    {
      name: 'springType',
      label: 'Тип пружины',
      type: 'select',
      options: [
        { value: 'compression', label: 'Сжатие' },
        { value: 'extension', label: 'Растяжение' },
        { value: 'torsion', label: 'Кручение' }
      ],
      defaultValue: 'compression'
    },
    {
      name: 'wireDiameter',
      label: 'Диаметр проволоки d (мм)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 0.1
    },
    {
      name: 'meanDiameter',
      label: 'Средний диаметр пружины D (мм)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 1
    },
    {
      name: 'coilCount',
      label: 'Количество рабочих витков n',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 1
    },
    {
      name: 'load',
      label: 'Нагрузка F (Н)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0
    },
    {
      name: 'shearModulus',
      label: 'Модуль сдвига G (МПа)',
      type: 'select',
      options: [
        { value: '80000', label: 'Сталь пружинная (80000 МПа)' },
        { value: '45000', label: 'Бронза (45000 МПа)' },
        { value: '44000', label: 'Латунь (44000 МПа)' },
        { value: '78000', label: 'Нержавеющая сталь (78000 МПа)' }
      ],
      defaultValue: '80000'
    }
  ],
  outputs: [
    { name: 'springRate', label: 'Жёсткость пружины', type: 'number', unit: 'Н/мм' },
    { name: 'deflection', label: 'Деформация', type: 'number', unit: 'мм' },
    { name: 'springIndex', label: 'Показатель пружины', type: 'number', unit: '' },
    { name: 'maxShearStress', label: 'Максимальное касательное напряжение', type: 'number', unit: 'МПа' }
  ],
  calculate: (inputs) => {
    const type = String(inputs.springType);
    const d = Number(inputs.wireDiameter);
    const D = Number(inputs.meanDiameter);
    const n = Number(inputs.coilCount);
    const F = Number(inputs.load);
    const G = Number(inputs.shearModulus);

    if (!d || !D || !n) {
      return [{ value: 'Введите все параметры', label: 'Ошибка' }];
    }

    // Показатель пружины C = D/d
    const C = D / d;

    // Жёсткость пружины сжатия/растяжения: k = (G * d⁴) / (8 * D³ * n)
    const k = (G * Math.pow(d, 4)) / (8 * Math.pow(D, 3) * n);

    // Деформация под нагрузкой
    const deflection = F ? F / k : 0;

    // Максимальное касательное напряжение (формула с поправкой)
    const K = (4 * C - 1) / (4 * C - 4) + 0.615 / C; // коэффициент Вала
    const tau = F ? (8 * F * D * K) / (Math.PI * Math.pow(d, 3)) : 0;

    return [
      { value: k.toFixed(2), label: 'Жёсткость пружины', unit: 'Н/мм' },
      { value: deflection.toFixed(2), label: 'Деформация', unit: 'мм' },
      { value: C.toFixed(2), label: 'Показатель пружины', unit: '' },
      { value: tau.toFixed(2), label: 'Макс. касательное напряжение', unit: 'МПа' }
    ];
  },
  content: {
    howTo: 'Введите тип пружины, диаметр проволоки, средний диаметр, количество витков и нагрузку. Калькулятор определит жёсткость и деформацию.',
    about: 'Пружина - упругий элемент, накапливающий механическую энергию при деформации. Жёсткость пружины зависит от материала, размеров и количества витков.',
    usage: 'Используется в механизмах для возврата деталей в исходное положение, амортизации, хранения энергии, создания усилий.',
    formula: 'C = D/d - показатель пружины, k = (Gd⁴)/(8D³n) - жёсткость, s = F/k - деформация, tau = (8FDK)/(pi*d³) - напряжение, K - коэффициент Вала',
    faq: [
      {
        question: 'Что такое показатель пружины?',
        answer: 'Показатель пружины C = D/d должен быть в диапазоне 4-16. При C < 4 пружина сложна в изготовлении, при C > 16 возможна потеря устойчивости.'
      },
      {
        question: 'Как влияет число витков на жёсткость?',
        answer: 'Жёсткость обратно пропорциональна числу витков. Увеличение витков в 2 раза уменьшает жёсткость в 2 раза.'
      }
    ],
    sources: [
      { title: 'Пружина - Википедия', url: 'https://ru.wikipedia.org/wiki/Пружина' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 4. Калькулятор резьбы
export const threadCalculator: Calculator = {
  id: 'thread-calculator',
  slug: 'rezba',
  title: 'Резьба',
  description: 'Параметры метрической, дюймовой резьбы: шаг, диаметры, сверло под резьбу',
  category: 'nauka-i-ucheba',
  subcategory: 'inzhenernye-raschety',
  type: 'formula',
  inputs: [
    {
      name: 'threadType',
      label: 'Тип резьбы',
      type: 'select',
      options: [
        { value: 'M6', label: 'Метрическая M6' },
        { value: 'M8', label: 'Метрическая M8' },
        { value: 'M10', label: 'Метрическая M10' },
        { value: 'M12', label: 'Метрическая M12' },
        { value: 'M16', label: 'Метрическая M16' },
        { value: 'M20', label: 'Метрическая M20' },
        { value: 'M24', label: 'Метрическая M24' },
        { value: '1/4-20', label: 'UNC 1/4-20' },
        { value: '3/8-16', label: 'UNC 3/8-16' },
        { value: '1/2-13', label: 'UNC 1/2-13' },
        { value: '1/4-28', label: 'UNF 1/4-28' },
        { value: '3/8-24', label: 'UNF 3/8-24' }
      ],
      defaultValue: 'M10'
    }
  ],
  outputs: [
    { name: 'nominalDiameter', label: 'Номинальный диаметр', type: 'number', unit: 'мм' },
    { name: 'pitch', label: 'Шаг резьбы', type: 'number', unit: 'мм' },
    { name: 'majorDiameter', label: 'Наружный диаметр', type: 'number', unit: 'мм' },
    { name: 'minorDiameter', label: 'Внутренний диаметр', type: 'number', unit: 'мм' },
    { name: 'tapDrill', label: 'Сверло под резьбу', type: 'number', unit: 'мм' }
  ],
  calculate: (inputs) => {
    const threadType = String(inputs.threadType);

    const threadData: Record<string, { pitch: number; major: number; minor: number; tap: number }> = {
      'M6': { pitch: 1.0, major: 6.0, minor: 4.917, tap: 5.0 },
      'M8': { pitch: 1.25, major: 8.0, minor: 6.647, tap: 6.8 },
      'M10': { pitch: 1.5, major: 10.0, minor: 8.376, tap: 8.5 },
      'M12': { pitch: 1.75, major: 12.0, minor: 10.106, tap: 10.2 },
      'M16': { pitch: 2.0, major: 16.0, minor: 13.835, tap: 14.0 },
      'M20': { pitch: 2.5, major: 20.0, minor: 17.294, tap: 17.5 },
      'M24': { pitch: 3.0, major: 24.0, minor: 20.752, tap: 21.0 },
      '1/4-20': { pitch: 1.27, major: 6.35, minor: 4.98, tap: 5.1 },
      '3/8-16': { pitch: 1.587, major: 9.525, minor: 7.493, tap: 7.9 },
      '1/2-13': { pitch: 1.954, major: 12.7, minor: 10.21, tap: 10.5 },
      '1/4-28': { pitch: 0.907, major: 6.35, minor: 5.24, tap: 5.5 },
      '3/8-24': { pitch: 1.058, major: 9.525, minor: 8.024, tap: 8.3 }
    };

    const data = threadData[threadType];
    if (!data) {
      return [{ value: 'Неверный тип резьбы', label: 'Ошибка' }];
    }

    return [
      { value: data.major.toFixed(2), label: 'Номинальный диаметр', unit: 'мм' },
      { value: data.pitch.toFixed(3), label: 'Шаг резьбы', unit: 'мм' },
      { value: data.major.toFixed(2), label: 'Наружный диаметр', type: 'number', unit: 'мм' },
      { value: data.minor.toFixed(3), label: 'Внутренний диаметр', type: 'number', unit: 'мм' },
      { value: data.tap.toFixed(1), label: 'Сверло под резьбу', type: 'number', unit: 'мм' }
    ];
  },
  content: {
    howTo: 'Выберите тип резьбы. Калькулятор покажет все параметры: шаг, диаметры, размер сверла для нарезания резьбы.',
    about: 'Резьба - винтовая канавка на цилиндрической или конической поверхности. Метрическая резьба (M) имеет профиль треугольника с углом 60°, дюймовая - 55° (BSW) или 60° (UNC/UNF).',
    usage: 'Используется при изготовлении деталей, подборе крепежа, выборе инструмента для нарезания резьбы.',
    formula: 'H = 0.866P - высота профиля, D2 = D - 0.6495P - средний диаметр, D1 = D - 1.0825P - внутренний диаметр, Сверло = D - P (приближённо)',
    faq: [
      {
        question: 'Чем отличается метрическая резьба от дюймовой?',
        answer: 'Метрическая (M) измеряется в мм с шагом в мм. Дюймовая (UNC/UNF) измеряется в дюймах с количеством витков на дюйм (TPI).'
      },
      {
        question: 'Как подобрать сверло под резьбу?',
        answer: 'Диаметр сверла приближённо равен номинальному диаметру минус шаг резьбы. Например, для M10 (шаг 1.5) сверло ≈ 8.5 мм.'
      }
    ],
    sources: [
      { title: 'Метрическая резьба - Википедия', url: 'https://ru.wikipedia.org/wiki/Метрическая_резьба' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 5. Калькулятор зубчатых колёс
export const gearCalculator: Calculator = {
  id: 'gear-calculator',
  slug: 'zubchatoe-koleso',
  title: 'Зубчатое колесо',
  description: 'Расчёт модуля, числа зубьев, делительного диаметра, передаточного отношения',
  category: 'nauka-i-ucheba',
  subcategory: 'inzhenernye-raschety',
  type: 'formula',
  inputs: [
    {
      name: 'module',
      label: 'Модуль m (мм)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 0.1
    },
    {
      name: 'teeth1',
      label: 'Число зубьев колеса 1 z1',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 1
    },
    {
      name: 'teeth2',
      label: 'Число зубьев колеса 2 z2',
      type: 'number',
      placeholder: '40',
      defaultValue: 40,
      min: 1
    }
  ],
  outputs: [
    { name: 'pitchDiameter1', label: 'Делительный диаметр d1', type: 'number', unit: 'мм' },
    { name: 'pitchDiameter2', label: 'Делительный диаметр d2', type: 'number', unit: 'мм' },
    { name: 'gearRatio', label: 'Передаточное отношение', type: 'number', unit: '' },
    { name: 'centerDistance', label: 'Межосевое расстояние', type: 'number', unit: 'мм' },
    { name: 'outsideDiameter1', label: 'Вершины зубьев колеса 1', type: 'number', unit: 'мм' },
    { name: 'outsideDiameter2', label: 'Вершины зубьев колеса 2', type: 'number', unit: 'мм' }
  ],
  calculate: (inputs) => {
    const m = Number(inputs.module);
    const z1 = Number(inputs.teeth1);
    const z2 = Number(inputs.teeth2);

    if (!m || !z1 || !z2) {
      return [{ value: 'Введите все параметры', label: 'Ошибка' }];
    }

    // Делительный диаметр: d = m * z
    const d1 = m * z1;
    const d2 = m * z2;

    // Передаточное отношение
    const ratio = z2 / z1;

    // Межосевое расстояние: a = (d1 + d2)/2 = m(z1 + z2)/2
    const a = (d1 + d2) / 2;

    // Диаметр вершин зубьев: da = d + 2m = m(z + 2)
    const da1 = m * (z1 + 2);
    const da2 = m * (z2 + 2);

    return [
      { value: d1.toFixed(2), label: 'Делительный диаметр d1', unit: 'мм' },
      { value: d2.toFixed(2), label: 'Делительный диаметр d2', unit: 'мм' },
      { value: ratio.toFixed(2), label: 'Передаточное отношение', unit: '' },
      { value: a.toFixed(2), label: 'Межосевое расстояние', unit: 'мм' },
      { value: da1.toFixed(2), label: 'Вершины зубьев колеса 1', unit: 'мм' },
      { value: da2.toFixed(2), label: 'Вершины зубьев колеса 2', unit: 'мм' }
    ];
  },
  content: {
    howTo: 'Введите модуль и число зубьев обоих колёс. Калькулятор рассчитает геометрические параметры зубчатой передачи.',
    about: 'Модуль - отношение делительного диаметра к числу зубьев. Стандартные модули: 0.5, 0.8, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8 мм.',
    usage: 'Используется при проектировании редукторов, коробок передач, зубчатых механизмов.',
    formula: 'd = m * z - делительный диаметр, i = z2/z1 - передаточное отношение, a = m(z1+z2)/2 - межосевое расстояние, da = m(z+2) - диаметр вершин',
    faq: [
      {
        question: 'Что такое модуль зубчатого колеса?',
        answer: 'Модуль - основной параметр зубчатого колеса, равный отношению делительного диаметра к числу зубьев или делённый на pi шагу по делительной окружности.'
      },
      {
        question: 'Как рассчитать расстояние между осями?',
        answer: 'Межосевое расстояние a = m(z1+z2)/2 = (d1+d2)/2 - полусумма делительных диаметров.'
      }
    ],
    sources: [
      { title: 'Зубчатое колесо - Википедия', url: 'https://ru.wikipedia.org/wiki/Зубчатое_колесо' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 6. Калькулятор ресурса подшипника
export const bearingCalculator: Calculator = {
  id: 'bearing-calculator',
  slug: 'podshipnik',
  title: 'Подшипник качения',
  description: 'Расчёт номинального ресурса L10 и срока службы подшипника',
  category: 'nauka-i-ucheba',
  subcategory: 'inzhenernye-raschety',
  type: 'formula',
  inputs: [
    {
      name: 'dynamicLoadRating',
      label: 'Динамическая грузоподъёмность C (кН)',
      type: 'number',
      placeholder: '19.5',
      defaultValue: 19.5,
      min: 0.1
    },
    {
      name: 'equivalentLoad',
      label: 'Эквивалентная нагрузка P (кН)',
      type: 'number',
      placeholder: '6.5',
      defaultValue: 6.5,
      min: 0.1
    },
    {
      name: 'rpm',
      label: 'Частота вращения n (об/мин)',
      type: 'number',
      placeholder: '1500',
      defaultValue: 1500,
      min: 0
    },
    {
      name: 'bearingType',
      label: 'Тип подшипника',
      type: 'select',
      options: [
        { value: '3', label: 'Шариковый (показатель степени p=3)' },
        { value: '10/3', label: 'Роликовый (показатель степени p=10/3)' }
      ],
      defaultValue: '3'
    },
    {
      name: 'lifeFactor',
      label: 'Коэффициент надёжности a1',
      type: 'select',
      options: [
        { value: '1', label: '90% надёжность (L10)' },
        { value: '0.62', label: '95% надёжность (L5)' },
        { value: '0.33', label: '99% надёжность (L1)' }
      ],
      defaultValue: '1'
    }
  ],
  outputs: [
    { name: 'l10Life', label: 'Номинальный ресурс L10', type: 'number', unit: 'млн об.' },
    { name: 'lifeHours', label: 'Ресурс в часах', type: 'number', unit: 'ч' },
    { name: 'lifeYears', label: 'Ресурс в годах', type: 'number', unit: 'лет' }
  ],
  calculate: (inputs) => {
    const C = Number(inputs.dynamicLoadRating);
    const P = Number(inputs.equivalentLoad);
    const n = Number(inputs.rpm);
    const pStr = String(inputs.bearingType);
    const a1 = Number(inputs.lifeFactor);

    if (!C || !P) {
      return [{ value: 'Введите нагрузки', label: 'Ошибка' }];
    }

    if (P > C) {
      return [{ value: 'Нагрузка превышает грузоподъёмность!', label: 'Ошибка' }];
    }

    // Показатель степени p
    const p = pStr === '3' ? 3 : 10/3;

    // L10 = (C/P)^p * a1 (млн оборотов)
    const L10 = Math.pow(C / P, p) * a1;

    // Ресурс в часах: L10h = (10^6 * L10) / (60 * n)
    const L10h = n ? (1000000 * L10) / (60 * n) : 0;

    // Ресурс в годах (при 8760 часов в году или при непрерывной работе)
    const L10y = L10h ? L10h / (365 * 24) : 0;

    return [
      { value: L10.toFixed(2), label: 'Номинальный ресурс L10', unit: 'млн об.' },
      { value: Math.round(L10h).toString(), label: 'Ресурс в часах', unit: 'ч' },
      { value: L10y.toFixed(2), label: 'Ресурс в годах', unit: 'лет' }
    ];
  },
  content: {
    howTo: 'Введите динамическую грузоподъёмность, эквивалентную нагрузку, частоту вращения и тип подшипника. Калькулятор определит расчётный ресурс.',
    about: 'Номинальный ресурс L10 - число миллионов оборотов, которое выдержит 90% подшипников до появления признаков усталости. Расчёт по стандарту ISO 281.',
    usage: 'Применяется для выбора подшипника, оценки срока службы, планирования технического обслуживания.',
    formula: 'L10 = (C/P)^p * a1 (млн оборотов), p = 3 для шариковых, p = 10/3 для роликовых, L10h = 10^6 * L10 / (60 * n) - в часах',
    faq: [
      {
        question: 'Что такое L10?',
        answer: 'L10 - номинальный ресурс подшипника. 90% подшипников выдержат этот ресурс без признаков усталости.'
      },
      {
        question: 'Как рассчитать эквивалентную нагрузку?',
        answer: 'P = X*Fr + Y*Fa, где Fr - радиальная нагрузка, Fa - осевая, X и Y - коэффициенты из каталога.'
      }
    ],
    sources: [
      { title: 'Подшипник качения - Википедия', url: 'https://ru.wikipedia.org/wiki/Подшипник_качения' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 7. Калькулятор момента затяжки болта
export const boltTorqueCalculator: Calculator = {
  id: 'bolt-torque-calculator',
  slug: 'moment-bolta',
  title: 'Момент затяжки болта',
  description: 'Расчёт рекомендуемого момента затяжки для метрических болтов',
  category: 'nauka-i-ucheba',
  subcategory: 'inzhenernye-raschety',
  type: 'formula',
  inputs: [
    {
      name: 'boltSize',
      label: 'Размер болта',
      type: 'select',
      options: [
        { value: 'M6', label: 'M6' },
        { value: 'M8', label: 'M8' },
        { value: 'M10', label: 'M10' },
        { value: 'M12', label: 'M12' },
        { value: 'M16', label: 'M16' },
        { value: 'M20', label: 'M20' },
        { value: 'M24', label: 'M24' }
      ],
      defaultValue: 'M10'
    },
    {
      name: 'boltGrade',
      label: 'Класс прочности',
      type: 'select',
      options: [
        { value: '8.8', label: '8.8 (sigmaв=800 МПа, sigmaт=640 МПа)' },
        { value: '10.9', label: '10.9 (sigmaв=1000 МПа, sigmaт=900 МПа)' },
        { value: '12.9', label: '12.9 (sigmaв=1200 МПа, sigmaт=1080 МПа)' }
      ],
      defaultValue: '8.8'
    },
    {
      name: 'lubrication',
      label: 'Состояние резьбы',
      type: 'select',
      options: [
        { value: '0.2', label: 'Сухая (K=0.2)' },
        { value: '0.15', label: 'Смазанная маслом (K=0.15)' },
        { value: '0.12', label: 'Смазанная MoS2 (K=0.12)' }
      ],
      defaultValue: '0.2'
    }
  ],
  outputs: [
    { name: 'torque', label: 'Момент затяжки', type: 'number', unit: 'Н*м' },
    { name: 'preload', label: 'Усилие предварительного затяжки', type: 'number', unit: 'кН' },
    { name: 'stress', label: 'Напряжение в болте', type: 'number', unit: 'МПа' }
  ],
  calculate: (inputs) => {
    const size = String(inputs.boltSize);
    const grade = String(inputs.boltGrade);
    const K = Number(inputs.lubrication);

    // Данные болтов: размер -> номинальный диаметр, шаг, площадь сечения
    const boltData: Record<string, { d: number; P: number; As: number }> = {
      'M6': { d: 6, P: 1.0, As: 20.1 },
      'M8': { d: 8, P: 1.25, As: 36.6 },
      'M10': { d: 10, P: 1.5, As: 58.0 },
      'M12': { d: 12, P: 1.75, As: 84.3 },
      'M16': { d: 16, P: 2.0, As: 157 },
      'M20': { d: 20, P: 2.5, As: 245 },
      'M24': { d: 24, P: 3.0, As: 353 }
    };

    const data = boltData[size];
    if (!data) {
      return [{ value: 'Неверный размер', label: 'Ошибка' }];
    }

    // Предел текучести из класса прочности (вторая цифра * 10 = % от 100 МПа * первое число)
    const Rm = parseInt(grade.split('.')[0]) * 100; // sigmaв
    const Re = parseInt(grade.split('.')[1]) / 10 * Rm; // sigmaт

    // Рекомендуемое напряжение предварительного затяжки: 70-90% от sigmaт
    const sigma = 0.75 * Re;

    // Усилие предварительного затяжения
    const Fp = (sigma * data.As) / 1000; // в кН

    // Момент затяжки: T = K * Fp * d
    // Fp в Н, d в мм -> T в Н*мм, переводим в Н*м
    const T = (K * Fp * 1000 * data.d) / 1000; // Н*м

    return [
      { value: Math.round(T).toString(), label: 'Момент затяжки', unit: 'Н*м' },
      { value: Fp.toFixed(1), label: 'Усилие предварительного затяжки', unit: 'кН' },
      { value: Math.round(sigma).toString(), label: 'Напряжение в болте', unit: 'МПа' }
    ];
  },
  content: {
    howTo: 'Выберите размер болта, класс прочности и состояние резьбы. Калькулятор определит рекомендуемый момент затяжки.',
    about: 'Момент затяжки обеспечивает необходимое предварительное напряжение в болте для надёжности соединения. Зависит от размера, класса прочности и коэффициента трения.',
    usage: 'Используется при сборке узлов, составлении технологических карт, выборе динамометрических ключей.',
    formula: 'T = K * Fp * d, Fp = 0.7-0.9 * Re * As, где K - коэффициент трения (0.12-0.2), As - расчётное напряжённое сечение',
    faq: [
      {
        question: 'Что означает класс прочности 8.8?',
        answer: 'Первая цифра (8) - sigmaв в сотнях МПа (800 МПа). Вторая цифра (8) - соотношение sigmaт/sigmaв * 10 (sigmaт = 640 МПа).'
      },
      {
        question: 'Почему важна смазка резьбы?',
        answer: 'Смазка снижает коэффициент трения (K), при том же моменте создаётся большее усилие затяжки. Без смазки болт может быть недотянут.'
      }
    ],
    sources: [
      { title: 'Болт - Википедия', url: 'https://ru.wikipedia.org/wiki/Болт' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 8. Калькулятор листового металла
export const sheetMetalCalculator: Calculator = {
  id: 'sheet-metal-calculator',
  slug: 'listovoj-metall',
  title: 'Листовой металл',
  description: 'Расчёт развёртки, поправки на изгиб и K-фактора',
  category: 'nauka-i-ucheba',
  subcategory: 'inzhenernye-raschety',
  type: 'formula',
  inputs: [
    {
      name: 'thickness',
      label: 'Толщина листа S (мм)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 0.1
    },
    {
      name: 'bendAngle',
      label: 'Угол изгиба alpha (град.)',
      type: 'number',
      placeholder: '90',
      defaultValue: 90,
      min: 0,
      max: 180
    },
    {
      name: 'innerRadius',
      label: 'Внутренний радиус изгиба r (мм)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      min: 0
    },
    {
      name: 'leg1',
      label: 'Длина прямого участка L1 (мм)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 0
    },
    {
      name: 'leg2',
      label: 'Длина прямого участка L2 (мм)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 0
    },
    {
      name: 'kFactor',
      label: 'K-фактор',
      type: 'number',
      placeholder: '0.45',
      defaultValue: 0.45,
      min: 0.3,
      max: 0.5,
      step: 0.01
    }
  ],
  outputs: [
    { name: 'bendAllowance', label: 'Поправка на изгиб', type: 'number', unit: 'мм' },
    { name: 'flatPattern', label: 'Развёртка (длина заготовки)', type: 'number', unit: 'мм' },
    { name: 'neutralAxis', label: 'Нейтральный слой', type: 'number', unit: 'мм' }
  ],
  calculate: (inputs) => {
    const S = Number(inputs.thickness);
    const alpha = Number(inputs.bendAngle);
    const r = Number(inputs.innerRadius);
    const L1 = Number(inputs.leg1);
    const L2 = Number(inputs.leg2);
    const K = Number(inputs.kFactor);

    if (!S || !L1 || !L2) {
      return [{ value: 'Введите размеры', label: 'Ошибка' }];
    }

    // Радиус нейтрального слоя: R = r + K*S
    const R = r + K * S;

    // Поправка на изгиб (Bend Allowance): BA = pi/180 * alpha * R
    const BA = (Math.PI / 180) * alpha * R;

    // Развёртка: L = L1 + L2 + BA
    const flatPattern = L1 + L2 + BA;

    // Положение нейтрального слоя от внутренней поверхности
    const neutralAxis = r + K * S;

    return [
      { value: BA.toFixed(2), label: 'Поправка на изгиб', unit: 'мм' },
      { value: flatPattern.toFixed(2), label: 'Развёртка (длина заготовки)', unit: 'мм' },
      { value: neutralAxis.toFixed(2), label: 'Нейтральный слой', unit: 'мм' }
    ];
  },
  content: {
    howTo: 'Введите толщину листа, угол и радиус изгиба, длины прямых участков и K-фактор. Калькулятор определит развёртку заготовки.',
    about: 'При изгибе листового металла наружные волокна растягиваются, внутренние - сжимаются. Нейтральный слой не меняет длины. K-фактор - положение нейтрального слоя (обычно 0.3-0.5).',
    usage: 'Используется в производстве деталей из листового металла, приготовлении развёрток, программировании листогибочных станков.',
    formula: 'BA = (pi/180) * alpha * (r + K*S) - поправка на изгиб, L = L1 + L2 + BA - развёртка, K = 0.45 для стали, 0.3-0.35 для алюминия',
    faq: [
      {
        question: 'Что такое K-фактор?',
        answer: 'K-фактор - отношение расстояния от внутренней поверхности до нейтрального слоя к толщине листа. Для стали K=0.45, для алюминия K=0.3-0.35.'
      },
      {
        question: 'Как влияет радиус изгиба?',
        answer: 'При большем радиусе (r > 5S) K-фактор приближается к 0.5. При остром изгибе (r < S) нейтральный слой смещается к внутренней стороне.'
      }
    ],
    sources: [
      { title: 'Гибка металла - Википедия', url: 'https://ru.wikipedia.org/wiki/Гибка_металла' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 9. Калькулятор теплообменника
export const heatExchangerCalculator: Calculator = {
  id: 'heat-exchanger-calculator',
  slug: 'teploobmennik',
  title: 'Теплообменник',
  description: 'Расчёт тепловой мощности, температур и КПД теплообменника',
  category: 'nauka-i-ucheba',
  subcategory: 'inzhenernye-raschety',
  type: 'formula',
  inputs: [
    {
      name: 'hotInlet',
      label: 'Температура горячей среды на входе T1h (°C)',
      type: 'number',
      placeholder: '80',
      defaultValue: 80
    },
    {
      name: 'hotOutlet',
      label: 'Температура горячей среды на выходе T2h (°C)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50
    },
    {
      name: 'coldInlet',
      label: 'Температура холодной среды на входе T1c (°C)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20
    },
    {
      name: 'coldOutlet',
      label: 'Температура холодной среды на выходе T2c (°C)',
      type: 'number',
      placeholder: '40',
      defaultValue: 40
    },
    {
      name: 'hotFlowRate',
      label: 'Расход горячей среды Gh (кг/с)',
      type: 'number',
      placeholder: '0.5',
      defaultValue: 0.5,
      min: 0
    },
    {
      name: 'heatCapacity',
      label: 'Теплоёмкость среды cp (кДж/(кг*K))',
      type: 'select',
      options: [
        { value: '4.18', label: 'Вода (4.18 кДж/(кг*K))' },
        { value: '2.0', label: 'Масло (2.0 кДж/(кг*K))' },
        { value: '1.0', label: 'Воздух (1.0 кДж/(кг*K))' }
      ],
      defaultValue: '4.18'
    }
  ],
  outputs: [
    { name: 'heatPower', label: 'Тепловая мощность', type: 'number', unit: 'кВт' },
    { name: 'logMeanTemp', label: 'Среднелогарифмическая разность температур', type: 'number', unit: '°C' },
    { name: 'effectiveness', label: 'КПД теплообменника', type: 'number', unit: '%' }
  ],
  calculate: (inputs) => {
    const T1h = Number(inputs.hotInlet);
    const T2h = Number(inputs.hotOutlet);
    const T1c = Number(inputs.coldInlet);
    const T2c = Number(inputs.coldOutlet);
    const Gh = Number(inputs.hotFlowRate);
    const cp = Number(inputs.heatCapacity);

    if (!Gh || !cp) {
      return [{ value: 'Введите параметры', label: 'Ошибка' }];
    }

    // Тепловая мощность: Q = G * cp * deltaT
    const deltaTh = T1h - T2h;
    const Q = Gh * cp * deltaTh; // кВт (cp в кДж)

    // Среднелогарифмическая разность температур (LMTD)
    // deltaT1 = T1h - T2c, deltaT2 = T2h - T1c
    const deltaT1 = T1h - T2c;
    const deltaT2 = T2h - T1c;
    const LMTD = (deltaT1 - deltaT2) / Math.log(deltaT1 / deltaT2);

    // КПД теплообменника: epsilon = (T2c - T1c) / (T1h - T1c) - для холодной среды
    const epsilon = ((T2c - T1c) / (T1h - T1c)) * 100;

    return [
      { value: Q.toFixed(2), label: 'Тепловая мощность', unit: 'кВт' },
      { value: LMTD.toFixed(2), label: 'Среднелогарифмическая разность температур', unit: '°C' },
      { value: epsilon.toFixed(1), label: 'КПД теплообменника', unit: '%' }
    ];
  },
  content: {
    howTo: 'Введите температуры на входе и выходе, расход и тип среды. Калькулятор определит тепловую мощность и эффективность.',
    about: 'Теплообменник - устройство для передачи тепла между двумя средами. Мощность зависит от расхода, температурного напора и теплоёмкости.',
    usage: 'Применяется при проектировании систем отопления, кондиционирования, охлаждения, тепловых пунктов.',
    formula: 'Q = G * cp * (T1 - T2) - тепловая мощность, LMTD = (deltaT1 - deltaT2) / ln(deltaT1/deltaT2) - среднелогарифмический перепад, epsilon = (T2c - T1c) / (T1h - T1c) - КПД',
    faq: [
      {
        question: 'Что такое LMTD?',
        answer: 'Log Mean Temperature Difference - среднелогарифмическая разность температур. Учитывает, что разность температур меняется по длине теплообменника.'
      },
      {
        question: 'Как повысить КПД теплообменника?',
        answer: 'Увеличить площадь поверхности, повысить скорость потоков (увеличив коэффициент теплоотдачи), использовать противоток вместо прямотока.'
      }
    ],
    sources: [
      { title: 'Теплообменник - Википедия', url: 'https://ru.wikipedia.org/wiki/Теплообменник' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 10. Калькулятор пневмоцилиндра
export const pneumaticCylinderCalculator: Calculator = {
  id: 'pneumatic-cylinder-calculator',
  slug: 'pnevmocilindr',
  title: 'Пневмоцилиндр',
  description: 'Расчёт усилия и расхода воздуха пневматического цилиндра',
  category: 'nauka-i-ucheba',
  subcategory: 'inzhenernye-raschety',
  type: 'formula',
  inputs: [
    {
      name: 'boreDiameter',
      label: 'Диаметр поршня D (мм)',
      type: 'select',
      options: [
        { value: '16', label: '16 мм' },
        { value: '20', label: '20 мм' },
        { value: '25', label: '25 мм' },
        { value: '32', label: '32 мм' },
        { value: '40', label: '40 мм' },
        { value: '50', label: '50 мм' },
        { value: '63', label: '63 мм' },
        { value: '80', label: '80 мм' },
        { value: '100', label: '100 мм' },
        { value: '125', label: '125 мм' }
      ],
      defaultValue: '50'
    },
    {
      name: 'rodDiameter',
      label: 'Диаметр штока d (мм)',
      type: 'number',
      placeholder: '16',
      defaultValue: 16,
      min: 0
    },
    {
      name: 'pressure',
      label: 'Давление воздуха P (бар)',
      type: 'number',
      placeholder: '6',
      defaultValue: 6,
      min: 0,
      max: 10
    },
    {
      name: 'stroke',
      label: 'Ход поршня L (мм)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0
    },
    {
      name: 'cycles',
      label: 'Число циклов в минуту',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 0
    }
  ],
  outputs: [
    { name: 'forwardForce', label: 'Усилие при выдвижении', type: 'number', unit: 'Н' },
    { name: 'returnForce', label: 'Усилие при втягивании', type: 'number', unit: 'Н' },
    { name: 'airConsumption', label: 'Расход воздуха на цикл', type: 'number', unit: 'Л' },
    { name: 'airConsumptionPerMin', label: 'Расход воздуха в минуту', type: 'number', unit: 'Л/мин' },
    { name: 'pistonArea', label: 'Площадь поршня', type: 'number', unit: 'см²' }
  ],
  calculate: (inputs) => {
    const D = Number(inputs.boreDiameter);
    const d = Number(inputs.rodDiameter);
    const P = Number(inputs.pressure);
    const L = Number(inputs.stroke);
    const n = Number(inputs.cycles);

    if (!D || !P) {
      return [{ value: 'Введите параметры', label: 'Ошибка' }];
    }

    // Площадь поршня
    const A_forward = (Math.PI * D * D) / 4; // мм²
    const A_return = (Math.PI * (D * D - d * d)) / 4; // мм²

    // Усилие: F = P * A (давление в Па = бар * 10^5)
    const F_forward = P * 10 * A_forward / 100; // Н (P*10^5 Па * A*10^-6 м²)
    const F_return = P * 10 * A_return / 100; // Н

    // Расход воздуха на цикл (приведённый к атмосферному давлению)
    // V = A * L * (P + 1) (в литрах)
    const V_cycle = (A_forward * L / 1000) * (P + 1) / 1000; // в литрах

    // Расход в минуту
    const V_min = V_cycle * n;

    return [
      { value: Math.round(F_forward).toString(), label: 'Усилие при выдвижении', unit: 'Н' },
      { value: Math.round(F_return).toString(), label: 'Усилие при втягивании', unit: 'Н' },
      { value: V_cycle.toFixed(3), label: 'Расход воздуха на цикл', unit: 'Л' },
      { value: Math.round(V_min).toString(), label: 'Расход воздуха в минуту', unit: 'Л/мин' },
      { value: (A_forward / 100).toFixed(2), label: 'Площадь поршня', unit: 'см²' }
    ];
  },
  content: {
    howTo: 'Выберите диаметр поршня, введите диаметр штока, давление, ход и число циклов. Калькулятор определит усилие и расход воздуха.',
    about: 'Пневмоцилиндр преобразует энергию сжатого воздуха в механическое движение. Усилие пропорционально давлению и площади поршня.',
    usage: 'Применяется в пневматических приводах, автоматизации производства, упаковочных машинах, робототехнике.',
    formula: 'F = P * A - усилие, A = pi*D²/4 - площадь поршня, V = A * L * (P + 1) - расход воздуха (приведённый), Усилие втягивания меньше из-за штока',
    faq: [
      {
        question: 'Почему усилие втягивания меньше?',
        answer: 'При втягивании давление действует только на кольцевую площадь поршня за вычетом площади штока, поэтому усилие меньше.'
      },
      {
        question: 'Как рассчитать ресурс компрессора?',
        answer: 'Суммируйте расходы всех пневмоцилиндров и других потребителей. Компрессор должен обеспечивать запас 20-30% по производительности.'
      }
    ],
    sources: [
      { title: 'Пневмоцилиндр - Википедия', url: 'https://ru.wikipedia.org/wiki/Пневмоцилиндр' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Экспорт всех инженерных калькуляторов
export const engineeringMoreCalculators = [
  pipeCalculator,
  beltPulleyCalculator,
  springCalculator,
  threadCalculator,
  gearCalculator,
  bearingCalculator,
  boltTorqueCalculator,
  sheetMetalCalculator,
  heatExchangerCalculator,
  pneumaticCylinderCalculator
];
