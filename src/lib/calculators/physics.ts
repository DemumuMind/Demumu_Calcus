import { Calculator } from '../types';

// Калькулятор закона Ома
export const ohmsLawCalculator: Calculator = {
  id: 'ohms-law-basic',
  slug: 'zakon-oma',
  title: 'Закон Ома',
  description: 'Расчёт напряжения, силы тока, сопротивления и мощности',
  category: 'nauka-i-ucheba',
  subcategory: 'fizicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'known',
      label: 'Что известно?',
      type: 'select',
      options: [
        { value: 'ui', label: 'Напряжение (U) и Ток (I)' },
        { value: 'ur', label: 'Напряжение (U) и Сопротивление (R)' },
        { value: 'ir', label: 'Ток (I) и Сопротивление (R)' }
      ],
      defaultValue: 'ir'
    },
    {
      name: 'value1',
      label: 'Первое значение',
      type: 'number',
      placeholder: '220',
      defaultValue: 220
    },
    {
      name: 'value2',
      label: 'Второе значение',
      type: 'number',
      placeholder: '10',
      defaultValue: 10
    }
  ],
  outputs: [
    { name: 'u', label: 'Напряжение', type: 'number', unit: 'В' },
    { name: 'i', label: 'Ток', type: 'number', unit: 'А' },
    { name: 'r', label: 'Сопротивление', type: 'number', unit: 'Ом' },
    { name: 'p', label: 'Мощность', type: 'number', unit: 'Вт' }
  ],
  calculate: (inputs) => {
    const known = String(inputs.known);
    const val1 = Number(inputs.value1);
    const val2 = Number(inputs.value2);
    
    let u = 0, i = 0, r = 0, p = 0;
    
    switch (known) {
      case 'ui':
        u = val1;
        i = val2;
        r = u / i;
        p = u * i;
        break;
      case 'ur':
        u = val1;
        r = val2;
        i = u / r;
        p = u * i;
        break;
      case 'ir':
        i = val1;
        r = val2;
        u = i * r;
        p = u * i;
        break;
    }
    
    return [
      { value: Math.round(u * 100) / 100, label: 'Напряжение', unit: 'В' },
      { value: Math.round(i * 100) / 100, label: 'Ток', unit: 'А' },
      { value: Math.round(r * 100) / 100, label: 'Сопротивление', unit: 'Ом' },
      { value: Math.round(p * 100) / 100, label: 'Мощность', unit: 'Вт' }
    ];
  },
  content: {
    howTo: 'Выберите, какие два параметра известны (U и I, U и R, или I и R), введите значения. Калькулятор рассчитает остальные.',
    about: 'Закон Ома — физический закон, устанавливающий соотношение между силой тока, напряжением и сопротивлением. Открыт Георгом Омом в 1826 году.',
    usage: 'Используется в электротехнике для расчётов цепей, подбора компонентов, определения потребления.',
    formula: 'U = I × R\nI = U / R\nR = U / I\nP = U × I = I² × R = U² / R',
    faq: [
      {
        question: 'Что такое закон Ома?',
        answer: 'Сила тока прямо пропорциональна напряжению и обратно пропорциональна сопротивлению: I = U / R.'
      },
      {
        question: 'Как рассчитать мощность?',
        answer: 'Мощность P = U × I. Также можно вычислить через сопротивление: P = I² × R или P = U² / R.'
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
  id: 'wire-resistance-basic',
  slug: 'soprotivlenie-provodnika',
  title: 'Сопротивление проводника',
  description: 'Расчёт сопротивления провода по материалу, длине и сечению',
  category: 'nauka-i-ucheba',
  subcategory: 'fizicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'material',
      label: 'Материал',
      type: 'select',
      options: [
        { value: 'copper', label: 'Медь' },
        { value: 'aluminum', label: 'Алюминий' },
        { value: 'iron', label: 'Железо' },
        { value: 'gold', label: 'Золото' },
        { value: 'silver', label: 'Серебро' },
        { value: 'constantan', label: 'Константан' },
        { value: 'nichrome', label: 'Нихром' }
      ],
      defaultValue: 'copper'
    },
    {
      name: 'length',
      label: 'Длина (м)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0.001
    },
    {
      name: 'area',
      label: 'Площадь сечения (мм²)',
      type: 'number',
      placeholder: '1.5',
      defaultValue: 1.5,
      min: 0.001
    },
    {
      name: 'temp',
      label: 'Температура (°C)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20
    }
  ],
  outputs: [
    { name: 'resistance', label: 'Сопротивление', type: 'number', unit: 'Ом' },
    { name: 'resistancePerKm', label: 'Сопротивление на км', type: 'number', unit: 'Ом/км' }
  ],
  calculate: (inputs) => {
    const material = String(inputs.material);
    const length = Number(inputs.length);
    const area = Number(inputs.area);
    const temp = Number(inputs.temp);
    
    // Resistivity at 20°C (Ohm·mm²/m)
    const resistivity: Record<string, number> = {
      'copper': 0.0175,
      'aluminum': 0.028,
      'iron': 0.098,
      'gold': 0.023,
      'silver': 0.016,
      'constantan': 0.5,
      'nichrome': 1.1
    };
    
    // Temperature coefficient
    const tempCoef: Record<string, number> = {
      'copper': 0.00393,
      'aluminum': 0.00403,
      'iron': 0.006,
      'gold': 0.0034,
      'silver': 0.0038,
      'constantan': 0.0001,
      'nichrome': 0.00017
    };
    
    const rho = resistivity[material];
    const alpha = tempCoef[material];
    
    // Calculate resistance at 20°C
    const r20 = (rho * length) / area;
    
    // Adjust for temperature
    const r = r20 * (1 + alpha * (temp - 20));
    
    // Resistance per km
    const perKm = (rho * 1000) / area;
    
    return [
      { value: Math.round(r * 1000) / 1000, label: 'Сопротивление', unit: 'Ом' },
      { value: Math.round(perKm * 100) / 100, label: 'Ом/км (при 20°C)', unit: 'Ом/км' }
    ];
  },
  content: {
    howTo: 'Выберите материал провода, введите длину, площадь сечения и температуру. Калькулятор рассчитает сопротивление.',
    about: 'Сопротивление проводника зависит от материала (удельное сопротивление), длины и площади поперечного сечения.',
    usage: 'Используется для расчёта потерь в проводах, выбора сечения кабеля, проектирования электросетей.',
    formula: 'R = ρ × (L / S)\nгде ρ — удельное сопротивление, L — длина, S — площадь сечения',
    faq: [
      {
        question: 'Почему медь лучше алюминия?',
        answer: 'Медь имеет меньшее удельное сопротивление (0.0175 vs 0.028 Ом·мм²/м), лучше проводит ток, меньше греется.'
      },
      {
        question: 'Как температура влияет на сопротивление?',
        answer: 'У металлов сопротивление растёт с температурой. Формула: R = R₂₀ × (1 + α × (t - 20)), где α — температурный коэффициент.'
      }
    ],
    sources: [
      { title: 'Электрическое сопротивление — Википедия', url: 'https://ru.wikipedia.org/wiki/Электрическое_сопротивление' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор кинетической и потенциальной энергии
export const energyCalculator: Calculator = {
  id: 'energy-calculator',
  slug: 'kineticheskaya-i-potencialnaya-energiya',
  title: 'Кинетическая и потенциальная энергия',
  description: 'Расчёт энергии движения и энергии положения',
  category: 'nauka-i-ucheba',
  subcategory: 'fizicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'mass',
      label: 'Масса (кг)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    },
    {
      name: 'velocity',
      label: 'Скорость (м/с)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    },
    {
      name: 'height',
      label: 'Высота (м)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    },
    {
      name: 'gravity',
      label: 'Ускорение свободного падения',
      type: 'select',
      options: [
        { value: '9.81', label: 'Земля: 9.81 м/с²' },
        { value: '1.62', label: 'Луна: 1.62 м/с²' },
        { value: '3.71', label: 'Марс: 3.71 м/с²' },
        { value: '24.79', label: 'Юпитер: 24.79 м/с²' }
      ],
      defaultValue: '9.81'
    }
  ],
  outputs: [
    { name: 'ke', label: 'Кинетическая энергия', type: 'number', unit: 'Дж' },
    { name: 'pe', label: 'Потенциальная энергия', type: 'number', unit: 'Дж' },
    { name: 'total', label: 'Полная механическая энергия', type: 'number', unit: 'Дж' }
  ],
  calculate: (inputs) => {
    const mass = Number(inputs.mass);
    const velocity = Number(inputs.velocity);
    const height = Number(inputs.height);
    const g = Number(inputs.gravity);
    
    // Kinetic energy: E = ½mv²
    const ke = 0.5 * mass * velocity * velocity;
    
    // Potential energy: E = mgh
    const pe = mass * g * height;
    
    const total = ke + pe;
    
    return [
      { value: Math.round(ke), label: 'Кинетическая (движение)', unit: 'Дж' },
      { value: Math.round(pe), label: 'Потенциальная (положение)', unit: 'Дж' },
      { value: Math.round(total), label: 'Полная энергия', unit: 'Дж' }
    ];
  },
  content: {
    howTo: 'Введите массу тела, его скорость и высоту над уровнем отсчёта. Калькулятор рассчитает оба вида энергии.',
    about: 'Кинетическая энергия — энергия движения. Потенциальная энергия — энергия положения в гравитационном поле.',
    usage: 'Используется в механике, физике, инженерии, расчётах движения, падения, столкновений.',
    formula: 'Кинетическая: Eₖ = ½mv²\nПотенциальная: Eₚ = mgh\nПолная: E = Eₖ + Eₚ',
    faq: [
      {
        question: 'Что такое кинетическая энергия?',
        answer: 'Энергия, которой обладает тело благодаря движению. Зависит от массы и квадрата скорости: E = ½mv².'
      },
      {
        question: 'Что такое потенциальная энергия?',
        answer: 'Энергия положения тела в силовом поле (обычно гравитационном). Зависит от массы, высоты и ускорения: E = mgh.'
      }
    ],
    sources: [
      { title: 'Кинетическая энергия — Википедия', url: 'https://ru.wikipedia.org/wiki/Кинетическая_энергия' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор импульса
export const momentumCalculator: Calculator = {
  id: 'momentum-calculator',
  slug: 'impuls-sily',
  title: 'Калькулятор импульса',
  description: 'Расчёт импульса тела, закон сохранения импульса',
  category: 'nauka-i-ucheba',
  subcategory: 'fizicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'm1',
      label: 'Масса 1 (кг)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2
    },
    {
      name: 'v1',
      label: 'Скорость 1 (м/с)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5
    },
    {
      name: 'm2',
      label: 'Масса 2 (кг)',
      type: 'number',
      placeholder: '3',
      defaultValue: 3
    },
    {
      name: 'v2',
      label: 'Скорость 2 (м/с)',
      type: 'number',
      placeholder: '-2',
      defaultValue: -2
    }
  ],
  outputs: [
    { name: 'p1', label: 'Импульс 1', type: 'number', unit: 'кг⋅м/с' },
    { name: 'p2', label: 'Импульс 2', type: 'number', unit: 'кг⋅м/с' },
    { name: 'pTotal', label: 'Суммарный импульс', type: 'number', unit: 'кг⋅м/с' },
    { name: 'vAfter', label: 'Скорость после соударения', type: 'number', unit: 'м/с' }
  ],
  calculate: (inputs) => {
    const m1 = Number(inputs.m1);
    const v1 = Number(inputs.v1);
    const m2 = Number(inputs.m2);
    const v2 = Number(inputs.v2);
    
    const p1 = m1 * v1;
    const p2 = m2 * v2;
    const pTotal = p1 + p2;
    
    // Velocity after perfectly inelastic collision
    const vAfter = pTotal / (m1 + m2);
    
    return [
      { value: Math.round(p1 * 100) / 100, label: 'p₁ = m₁ × v₁', unit: 'кг⋅м/с' },
      { value: Math.round(p2 * 100) / 100, label: 'p₂ = m₂ × v₂', unit: 'кг⋅м/с' },
      { value: Math.round(pTotal * 100) / 100, label: 'p₁ + p₂', unit: 'кг⋅м/с' },
      { value: Math.round(vAfter * 100) / 100, label: 'Скорость после неупругого соударения', unit: 'м/с' }
    ];
  },
  content: {
    howTo: 'Введите массы и скорости двух тел. Калькулятор рассчитает импульсы и покажет скорость после неупругого соударения.',
    about: 'Импульс — произведение массы тела на его скорость. Векторная величина, направленная как скорость. Закон сохранения: в замкнутой системе суммарный импульс постоянен.',
    usage: 'Используется в механике столкновений, баллистике, ракетной технике, ядерной физике.',
    formula: 'p = m × v\nЗакон сохранения: m₁v₁ + m₂v₂ = (m₁ + m₂)v\n(для неупругого соударения)',
    faq: [
      {
        question: 'Что такое импульс?',
        answer: 'Импульс (количество движения) — мера механического движения, равная произведению массы на скорость: p = mv.'
      },
      {
        question: 'Что такое закон сохранения импульса?',
        answer: 'В замкнутой системе суммарный импульс всех тел остаётся постоянным. Это позволяет рассчитывать движение после столкновений.'
      }
    ],
    sources: [
      { title: 'Импульс — Википедия', url: 'https://ru.wikipedia.org/wiki/Импульс' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор работы и мощности
export const workPowerCalculator: Calculator = {
  id: 'work-power-calculator',
  slug: 'rabota-i-moshchnost',
  title: 'Работа и мощность',
  description: 'Расчёт механической работы и мощности',
  category: 'nauka-i-ucheba',
  subcategory: 'fizicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'force',
      label: 'Сила (Н)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'distance',
      label: 'Расстояние (м)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50
    },
    {
      name: 'time',
      label: 'Время (с)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0.001
    },
    {
      name: 'angle',
      label: 'Угол между силой и направлением (°)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 90
    }
  ],
  outputs: [
    { name: 'work', label: 'Работа', type: 'number', unit: 'Дж' },
    { name: 'power', label: 'Мощность', type: 'number', unit: 'Вт' },
    { name: 'hp', label: 'В лошадиных силах', type: 'number', unit: 'л.с.' }
  ],
  calculate: (inputs) => {
    const force = Number(inputs.force);
    const distance = Number(inputs.distance);
    const time = Number(inputs.time);
    const angle = Number(inputs.angle);
    
    // Work: A = F × s × cos(α)
    const work = force * distance * Math.cos(angle * Math.PI / 180);
    
    // Power: N = A / t
    const power = work / time;
    
    // Convert to horsepower (metric)
    const hp = power / 735.5;
    
    return [
      { value: Math.round(work), label: 'Работа (A = F × s × cos α)', unit: 'Дж' },
      { value: Math.round(power), label: 'Мощность (N = A / t)', unit: 'Вт' },
      { value: Math.round(hp * 100) / 100, label: 'Метрические л.с.', unit: 'л.с.' }
    ];
  },
  content: {
    howTo: 'Введите силу, расстояние, время и угол. Калькулятор рассчитает работу и мощность.',
    about: 'Работа — мера действия силы, при которой тело перемещается. Мощность — скорость совершения работы.',
    usage: 'Используется в механике, инженерии, расчётах двигателей, лебёдок, насосов.',
    formula: 'Работа: A = F × s × cos(α)\nМощность: N = A / t\n1 л.с. = 735.5 Вт',
    faq: [
      {
        question: 'В чём разница между работой и мощностью?',
        answer: 'Работа — это количество энергии, переданное силой (Дж). Мощность — скорость, с которой совершается работа (Вт = Дж/с).'
      },
      {
        question: 'Почему нужен угол?',
        answer: 'Если сила направлена под углом к движению, только её проекция на направление движения совершает работу: F × cos(α).'
      }
    ],
    sources: [
      { title: 'Работа (физика) — Википедия', url: 'https://ru.wikipedia.org/wiki/Работа_(физика)' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор длины волны
export const wavelengthCalculator: Calculator = {
  id: 'wavelength-calculator',
  slug: 'dlina-volny',
  title: 'Длина волны и частота',
  description: 'Расчёт длины волны по частоте и скорости распространения',
  category: 'nauka-i-ucheba',
  subcategory: 'fizicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'speed',
      label: 'Скорость распространения (м/с)',
      type: 'number',
      placeholder: '300000000',
      defaultValue: 300000000
    },
    {
      name: 'frequency',
      label: 'Частота (Гц)',
      type: 'number',
      placeholder: '100000000',
      defaultValue: 100000000
    },
    {
      name: 'known',
      label: 'Что найти',
      type: 'select',
      options: [
        { value: 'wavelength', label: 'Длину волны' },
        { value: 'frequency', label: 'Частоту' }
      ],
      defaultValue: 'wavelength'
    }
  ],
  outputs: [
    { name: 'wavelength', label: 'Длина волны', type: 'text' },
    { name: 'frequency', label: 'Частота', type: 'text' },
    { name: 'period', label: 'Период', type: 'text' }
  ],
  calculate: (inputs) => {
    const speed = Number(inputs.speed);
    const freq = Number(inputs.frequency);
    const known = String(inputs.known);
    
    let wavelength = 0;
    let frequency = 0;
    
    if (known === 'wavelength') {
      // Calculate wavelength
      wavelength = speed / freq;
      frequency = freq;
    } else {
      // Calculate frequency
      frequency = speed / freq;  // in this case freq input is actually wavelength
      wavelength = freq;
    }
    
    const period = 1 / frequency;
    
    // Format wavelength with appropriate units
    let wlText = '';
    if (wavelength >= 1000) {
      wlText = `${(wavelength / 1000).toFixed(3)} км`;
    } else if (wavelength >= 1) {
      wlText = `${wavelength.toFixed(3)} м`;
    } else if (wavelength >= 0.001) {
      wlText = `${(wavelength * 1000).toFixed(3)} мм`;
    } else if (wavelength >= 1e-6) {
      wlText = `${(wavelength * 1e6).toFixed(3)} мкм`;
    } else {
      wlText = `${(wavelength * 1e9).toFixed(3)} нм`;
    }
    
    // Format frequency
    let freqText = '';
    if (frequency >= 1e9) {
      freqText = `${(frequency / 1e9).toFixed(3)} ГГц`;
    } else if (frequency >= 1e6) {
      freqText = `${(frequency / 1e6).toFixed(3)} МГц`;
    } else if (frequency >= 1000) {
      freqText = `${(frequency / 1000).toFixed(3)} кГц`;
    } else {
      freqText = `${frequency.toFixed(3)} Гц`;
    }
    
    return [
      { value: wlText, label: 'Длина волны (λ)' },
      { value: freqText, label: 'Частота (f)' },
      { value: period >= 1 ? `${period.toFixed(3)} с` : period >= 0.001 ? `${(period * 1000).toFixed(3)} мс` : `${(period * 1e6).toFixed(3)} мкс`, label: 'Период (T = 1/f)' }
    ];
  },
  content: {
    howTo: 'Введите скорость распространения и частоту (или длину волны). Калькулятор найдёт связанную величину.',
    about: 'Длина волны — расстояние между двумя ближайшими точками, колеблющимися в одинаковой фазе. Связана с частотой формулой λ = v / f.',
    usage: 'Используется в радиотехнике, оптике, акустике, связи, спектроскопии.',
    formula: 'λ = v / f\nгде λ — длина волны, v — скорость, f — частота\nT = 1/f — период',
    faq: [
      {
        question: 'Какая длина волны у радиоволн FM?',
        answer: 'FM-радио работает на частотах 88-108 МГц. Длина волны примерно 2.8-3.4 метра.'
      },
      {
        question: 'Какая длина волны у видимого света?',
        answer: 'Видимый свет: 380-750 нм (нанометров). Фиолетовый — ~400 нм, красный — ~700 нм.'
      }
    ],
    sources: [
      { title: 'Длина волны — Википедия', url: 'https://ru.wikipedia.org/wiki/Длина_волны' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор давления
export const pressureCalculator: Calculator = {
  id: 'pressure-calculator',
  slug: 'davlenie',
  title: 'Калькулятор давления',
  description: 'Расчёт давления, силы и площади. Закон Паскаля и Архимеда',
  category: 'nauka-i-ucheba',
  subcategory: 'fizicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'mode',
      label: 'Что рассчитать',
      type: 'select',
      options: [
        { value: 'pressure', label: 'Давление (P = F/A)' },
        { value: 'hydrostatic', label: 'Гидростатическое давление (P = ρgh)' },
        { value: 'buoyancy', label: 'Сила Архимеда (F = ρgV)' }
      ],
      defaultValue: 'pressure'
    },
    {
      name: 'value1',
      label: 'Значение 1',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'value2',
      label: 'Значение 2',
      type: 'number',
      placeholder: '0.5',
      defaultValue: 0.5
    },
    {
      name: 'value3',
      label: 'Значение 3 (для жидкости)',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const mode = String(inputs.mode);
    const v1 = Number(inputs.value1);
    const v2 = Number(inputs.value2);
    const v3 = Number(inputs.value3);
    const g = 9.81;
    
    let result = 0;
    let label = '';
    let unit = '';
    
    switch (mode) {
      case 'pressure':
        result = v1 / v2;  // F / A
        label = 'Давление';
        unit = 'Па';
        break;
      case 'hydrostatic':
        result = v3 * g * v1;  // ρ * g * h
        label = 'Гидростатическое давление';
        unit = 'Па';
        break;
      case 'buoyancy':
        result = v3 * g * v1;  // ρ * g * V
        label = 'Сила Архимеда';
        unit = 'Н';
        break;
    }
    
    // Convert to appropriate units
    let displayValue = '';
    if (unit === 'Па') {
      if (result >= 101325) {
        displayValue = `${(result / 101325).toFixed(4)} атм`;
      } else if (result >= 1000) {
        displayValue = `${(result / 1000).toFixed(2)} кПа`;
      } else {
        displayValue = `${result.toFixed(2)} Па`;
      }
    } else {
      displayValue = `${result.toFixed(2)} ${unit}`;
    }
    
    return [{ value: displayValue, label }];
  },
  content: {
    howTo: 'Выберите режим расчёта, введите значения. Для давления введите силу и площадь. Для жидкости — плотность, высоту/объём.',
    about: 'Давление — сила, действующая перпендикулярно поверхности на единицу площади. Гидростатическое давление растёт с глубиной.',
    usage: 'Используется в гидравлике, строительстве, судостроении, пневматике.',
    formula: 'Давление: P = F / S\nГидростатическое: P = ρgh\nАрхимед: F = ρgV',
    faq: [
      {
        question: 'Что такое давление?',
        answer: 'Давление — сила, действующая на единицу площади перпендикулярно поверхности. P = F/A. Единица: Паскаль (Па) = Н/м².'
      },
      {
        question: 'Почему гидростатическое давление не зависит от формы сосуда?',
        answer: 'По закону Паскаля давление на одинаковой глубине одинаково во всех направлениях. Зависит только от высоты столба жидкости: P = ρgh.'
      }
    ],
    sources: [
      { title: 'Давление — Википедия', url: 'https://ru.wikipedia.org/wiki/Давление' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const physicsCalculators = [
  ohmsLawCalculator,
  wireResistanceCalculator,
  energyCalculator,
  momentumCalculator,
  workPowerCalculator,
  wavelengthCalculator,
  pressureCalculator,
];
