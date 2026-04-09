import { Calculator } from '../types';

// Конвертер световых лет
export const lightYearConverter: Calculator = {
  id: 'light-year-converter',
  slug: 'konverter-svetovyh-let',
  title: 'Конвертер световых лет',
  description: 'Перевод световых лет в километры, астрономические единицы, парсеки и другие единицы расстояния',
  category: 'konvertery',
  subcategory: 'space-units',
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
      name: 'fromUnit',
      label: 'Из единицы',
      type: 'select',
      options: [
        { value: 'ly', label: 'Световые года (ly)' },
        { value: 'au', label: 'Астрономические единицы (AU)' },
        { value: 'pc', label: 'Парсеки (pc)' },
        { value: 'km', label: 'Километры (км)' },
        { value: 'mi', label: 'Мили' }
      ],
      defaultValue: 'ly'
    },
    {
      name: 'toUnit',
      label: 'В единицу',
      type: 'select',
      options: [
        { value: 'ly', label: 'Световые года (ly)' },
        { value: 'au', label: 'Астрономические единицы (AU)' },
        { value: 'pc', label: 'Парсеки (pc)' },
        { value: 'km', label: 'Километры (км)' },
        { value: 'mi', label: 'Мили' }
      ],
      defaultValue: 'km'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'number' },
    { name: 'inLightYears', label: 'В световых годах', type: 'number' },
    { name: 'inParsecs', label: 'В парсеках', type: 'number' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const fromUnit = String(inputs.fromUnit);
    const toUnit = String(inputs.toUnit);
    
    if (!value) {
      return [
        { value: '—', label: 'Результат' },
        { value: '—', label: 'В световых годах' },
        { value: '—', label: 'В парсеках' }
      ];
    }
    
    // Conversion to kilometers first
    const toKm: Record<string, number> = {
      'ly': 9460730472580.8,      // 1 light year in km
      'au': 149597870.7,         // 1 AU in km
      'pc': 30856775814913.6,    // 1 parsec in km
      'km': 1,
      'mi': 1.609344
    };
    
    const km = value * toKm[fromUnit];
    const result = km / toKm[toUnit];
    const inLy = km / toKm['ly'];
    const inPc = km / toKm['pc'];
    
    const format = (num: number) => {
      if (num >= 1000000 || num < 0.001) return num.toExponential(4);
      return Number(num.toPrecision(10));
    };
    
    return [
      { value: format(result), label: 'Результат' },
      { value: format(inLy), label: 'В световых годах' },
      { value: format(inPc), label: 'В парсеках' }
    ];
  },
  content: {
    howTo: 'Введите значение расстояния, выберите исходную и целевую единицы измерения. Калькулятор переведёт расстояние между различными астрономическими единицами.',
    about: 'Световой год — расстояние, которое свет проходит за один год в вакууме (около 9.46 триллиона километров). Парсек — расстояние, с которого радиус земной орбиты виден под углом 1 угловая секунда. Астрономическая единица — среднее расстояние от Земли до Солнца.',
    usage: 'Используйте для перевода расстояний между звёздами и галактиками.',
    formula: '1 световой год = 63,241 AU = 0.3066 парсека = 9.461 × 10¹² км',
    faq: [
      { question: 'Что больше — световой год или парсек?', answer: 'Парсек больше. 1 парсек ≈ 3.26 световых года.' },
      { question: 'Зачем нужны разные единицы?', answer: 'Для удобства: AU для расстояний в Солнечной системе, световые годы для звёзд, парсеки для галактик.' }
    ],
    sources: [
      { title: 'NASA - Cosmic Distances', url: 'https://science.nasa.gov/astrophysics/focus-areas/what-is-dark-energy/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер астрономических единиц
export const astronomicalUnitConverter: Calculator = {
  id: 'au-converter',
  slug: 'konverter-astronomicheskih-edinic',
  title: 'Конвертер астрономических единиц',
  description: 'Перевод между астрономическими единицами AU, километрами, световыми минутами и часами',
  category: 'konvertery',
  subcategory: 'space-units',
  type: 'converter',
  inputs: [
    {
      name: 'au',
      label: 'Астрономические единицы (AU)',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    }
  ],
  outputs: [
    { name: 'km', label: 'Километры', type: 'number', unit: 'км' },
    { name: 'lightMinutes', label: 'Световые минуты', type: 'number', unit: 'мин' },
    { name: 'lightHours', label: 'Световые часы', type: 'number', unit: 'ч' },
    { name: 'lightDays', label: 'Световые сутки', type: 'number', unit: 'дн' },
    { name: 'miles', label: 'Мили', type: 'number', unit: 'mi' }
  ],
  calculate: (inputs) => {
    const au = Number(inputs.au);
    
    if (!au) {
      return [
        { value: '—', label: 'Километры', unit: 'км' },
        { value: '—', label: 'Световые минуты', unit: 'мин' },
        { value: '—', label: 'Световые часы', unit: 'ч' },
        { value: '—', label: 'Световые сутки', unit: 'дн' },
        { value: '—', label: 'Мили', unit: 'mi' }
      ];
    }
    
    const km = au * 149597870.7;
    const lightMinutes = au * 8.3167464;
    const lightHours = lightMinutes / 60;
    const lightDays = lightHours / 24;
    const miles = km * 0.621371;
    
    return [
      { value: Math.round(km), label: 'Километры', unit: 'км' },
      { value: Number(lightMinutes.toFixed(2)), label: 'Световые минуты', unit: 'мин' },
      { value: Number(lightHours.toFixed(4)), label: 'Световые часы', unit: 'ч' },
      { value: Number(lightDays.toFixed(4)), label: 'Световые сутки', unit: 'дн' },
      { value: Math.round(miles), label: 'Мили', unit: 'mi' }
    ];
  },
  content: {
    howTo: 'Введите значение в астрономических единицах (AU). Калькулятор покажет это расстояние в различных единицах, включая время, за которое свет преодолеет его.',
    about: 'Астрономическая единица (AU) — среднее расстояние от Земли до Солнца (149.6 млн км). Свет проходит это расстояние за 8 минут 20 секунд.',
    formula: '1 AU = 149,597,870.7 км ≈ 8.32 световых минут',
    faq: [
      { question: 'Сколько AU до Марса?', answer: 'От 0.37 AU (в противостоянии) до 2.67 AU (в соединении). Среднее — около 1.52 AU.' },
      { question: 'Почему используют AU?', answer: 'Для удобства описания расстояний в Солнечной системе. AU даёт понятные числа для планетных орбит.' }
    ],
    sources: [
      { title: 'IAU - Astronomical Units', url: 'https://www.iau.org/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер парсеков
export const parsecConverter: Calculator = {
  id: 'parsec-converter',
  slug: 'konverter-parsekov',
  title: 'Конвертер парсеков',
  description: 'Перевод парсеков в световые годы, килопарсеки и мегапарсеки для космических расстояний',
  category: 'konvertery',
  subcategory: 'space-units',
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
      name: 'unit',
      label: 'Единица',
      type: 'select',
      options: [
        { value: 'pc', label: 'Парсеки (pc)' },
        { value: 'kpc', label: 'Килопарсеки (kpc)' },
        { value: 'mpc', label: 'Мегапарсеки (Mpc)' },
        { value: 'gpc', label: 'Гигапарсеки (Gpc)' }
      ],
      defaultValue: 'pc'
    }
  ],
  outputs: [
    { name: 'pc', label: 'Парсеки', type: 'number', unit: 'pc' },
    { name: 'kpc', label: 'Килопарсеки', type: 'number', unit: 'kpc' },
    { name: 'mpc', label: 'Мегапарсеки', type: 'number', unit: 'Mpc' },
    { name: 'ly', label: 'Световые года', type: 'number', unit: 'ly' },
    { name: 'au', label: 'Астрономические единицы', type: 'number', unit: 'AU' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const unit = String(inputs.unit);
    
    if (!value) {
      return [
        { value: '—', label: 'Парсеки', unit: 'pc' },
        { value: '—', label: 'Килопарсеки', unit: 'kpc' },
        { value: '—', label: 'Мегапарсеки', unit: 'Mpc' },
        { value: '—', label: 'Световые года', unit: 'ly' },
        { value: '—', label: 'Астрономические единицы', unit: 'AU' }
      ];
    }
    
    // Convert to parsecs first
    const multipliers: Record<string, number> = {
      'pc': 1,
      'kpc': 1000,
      'mpc': 1000000,
      'gpc': 1000000000
    };
    
    const pc = value * multipliers[unit];
    const kpc = pc / 1000;
    const mpc = pc / 1000000;
    const ly = pc * 3.26156;
    const au = pc * 206265;
    
    return [
      { value: pc, label: 'Парсеки', unit: 'pc' },
      { value: Number(kpc.toFixed(6)), label: 'Килопарсеки', unit: 'kpc' },
      { value: Number(mpc.toFixed(9)), label: 'Мегапарсеки', unit: 'Mpc' },
      { value: Number(ly.toFixed(3)), label: 'Световые года', unit: 'ly' },
      { value: Math.round(au), label: 'Астрономические единицы', unit: 'AU' }
    ];
  },
  content: {
    howTo: 'Введите космическое расстояние в парсеках, килопарсеках или мегапарсеках. Калькулятор переведёт его во все основные астрономические единицы.',
    about: 'Парсек (пк) — расстояние, с которого радиус земной орбиты (1 AU) виден под углом 1 угловая секунда. Равен примерно 3.26 световым годам. Килопарсек (кпк) используется для галактик, мегапарсек (Мпк) — для кластеров галактик.',
    formula: '1 pc = 3.26156 ly = 206,265 AU = 3.08568 × 10¹³ км',
    faq: [
      { question: 'Сколько парсеков до ближайшей звезды?', answer: 'До Проксимы Центавра — 1.301 пк (4.24 световых года).' },
      { question: 'Каков размер Млечного Пути в кпк?', answer: 'Диаметр галактики — около 30 кпк (100,000 световых лет).' }
    ],
    sources: [
      { title: 'Wikipedia - Parsec', url: 'https://en.wikipedia.org/wiki/Parsec' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер звёздных величин
export const magnitudeConverter: Calculator = {
  id: 'magnitude-converter',
  slug: 'konverter-zvezdnoy-velichiny',
  title: 'Конвертер звёздной величины',
  description: 'Перевод между кажущейся и абсолютной звёздной величиной, расчёт яркости',
  category: 'konvertery',
  subcategory: 'space-units',
  type: 'formula',
  inputs: [
    {
      name: 'apparentMag',
      label: 'Кажущаяся звёздная величина (m)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0
    },
    {
      name: 'distance',
      label: 'Расстояние (парсеки)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10
    }
  ],
  outputs: [
    { name: 'absoluteMag', label: 'Абсолютная звёздная величина (M)', type: 'number' },
    { name: 'brightnessRatio', label: 'Отношение яркости (относительно Солнца)', type: 'number' },
    { name: 'luminosity', label: 'Светимость (L☉)', type: 'number' }
  ],
  calculate: (inputs) => {
    const apparentMag = Number(inputs.apparentMag);
    const distance = Number(inputs.distance);
    
    if (!distance) {
      return [
        { value: '—', label: 'Абсолютная звёздная величина (M)' },
        { value: '—', label: 'Отношение яркости (относительно Солнца)' },
        { value: '—', label: 'Светимость (L☉)' }
      ];
    }
    
    // M = m - 5 × log₁₀(d) + 5
    const absoluteMag = apparentMag - 5 * Math.log10(distance) + 5;
    
    // Brightness ratio (Sun's apparent mag = -26.74, absolute = 4.83)
    const brightnessRatio = Math.pow(10, (4.83 - absoluteMag) / 2.5);
    const luminosity = brightnessRatio; // Same for same distance
    
    return [
      { value: Number(absoluteMag.toFixed(2)), label: 'Абсолютная звёздная величина (M)' },
      { value: Number(brightnessRatio.toFixed(3)), label: 'Отношение яркости (относительно Солнца)' },
      { value: Number(luminosity.toFixed(3)), label: 'Светимость (L☉)' }
    ];
  },
  content: {
    howTo: 'Введите кажущуюся звёздную величину и расстояние до объекта в парсеках. Калькулятор рассчитает абсолютную звёздную величину и светимость.',
    about: 'Звёздная величина — логарифмическая шкала яркости. Кажущаяся (m) — как ярко объект виден с Земли. Абсолютная (M) — как ярко объект был бы на расстоянии 10 пк. Разница в 5 величин = изменение яркости в 100 раз.',
    formula: 'M = m - 5 × log₁₀(d) + 5\nЯркость = 2.512^(m₁ - m₂)',
    faq: [
      { question: 'Почему у ярких звёзд отрицательная величина?', answer: 'Исторически: яркие звёзды — 1-я величина, тусклые — 6-я. Сириус (-1.46) ярче, чем звёзды 1-й величины.' },
      { question: 'Какая абсолютная величина у Солнца?', answer: '4.83. Это средняя звезда. Сверхгиганты имеют M до -10 (в 10⁶ раз ярче).' }
    ],
    sources: [
      { title: 'Wikipedia - Apparent magnitude', url: 'https://en.wikipedia.org/wiki/Apparent_magnitude' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер космического времени
export const spaceTimeConverter: Calculator = {
  id: 'space-time-converter',
  slug: 'konverter-kosmicheskogo-vremeni',
  title: 'Конвертер космического времени',
  description: 'Перевод времени света в расстояние, расчёт времени пути для разных скоростей',
  category: 'konvertery',
  subcategory: 'space-units',
  type: 'converter',
  inputs: [
    {
      name: 'timeValue',
      label: 'Время',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'timeUnit',
      label: 'Единица времени',
      type: 'select',
      options: [
        { value: 'seconds', label: 'Секунды' },
        { value: 'minutes', label: 'Минуты' },
        { value: 'hours', label: 'Часы' },
        { value: 'days', label: 'Сутки' },
        { value: 'years', label: 'Годы' }
      ],
      defaultValue: 'minutes'
    },
    {
      name: 'speed',
      label: 'Скорость (% от скорости света)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 100
    }
  ],
  outputs: [
    { name: 'distanceKm', label: 'Расстояние (км)', type: 'number', unit: 'км' },
    { name: 'distanceAu', label: 'Расстояние (AU)', type: 'number', unit: 'AU' },
    { name: 'distanceLy', label: 'Расстояние (св. г.)', type: 'number', unit: 'ly' },
    { name: 'actualTime', label: 'Фактическое время в пути', type: 'text' }
  ],
  calculate: (inputs) => {
    const timeValue = Number(inputs.timeValue);
    const timeUnit = String(inputs.timeUnit);
    const speed = Number(inputs.speed) || 100;
    
    if (!timeValue) {
      return [
        { value: '—', label: 'Расстояние (км)', unit: 'км' },
        { value: '—', label: 'Расстояние (AU)', unit: 'AU' },
        { value: '—', label: 'Расстояние (св. г.)', unit: 'ly' },
        { value: '—', label: 'Фактическое время в пути' }
      ];
    }
    
    const speedOfLight = 299792.458; // km/s
    
    // Convert to seconds
    const multipliers: Record<string, number> = {
      'seconds': 1,
      'minutes': 60,
      'hours': 3600,
      'days': 86400,
      'years': 31557600
    };
    
    const seconds = timeValue * multipliers[timeUnit];
    const actualSeconds = seconds * (100 / speed);
    
    const distanceKm = seconds * speedOfLight;
    const distanceAu = distanceKm / 149597870.7;
    const distanceLy = distanceKm / 9460730472580.8;
    
    // Format actual time
    let actualTime: string;
    if (actualSeconds < 60) {
      actualTime = `${Math.round(actualSeconds)} сек`;
    } else if (actualSeconds < 3600) {
      actualTime = `${Math.round(actualSeconds / 60)} мин`;
    } else if (actualSeconds < 86400) {
      actualTime = `${Math.round((actualSeconds / 3600) * 10) / 10} ч`;
    } else if (actualSeconds < 31557600) {
      actualTime = `${Math.round((actualSeconds / 86400) * 10) / 10} дн`;
    } else {
      actualTime = `${Math.round((actualSeconds / 31557600) * 100) / 100} лет`;
    }
    
    const formatLarge = (num: number) => {
      if (num >= 1e9) return `${(num / 1e9).toFixed(2)} млрд`;
      if (num >= 1e6) return `${(num / 1e6).toFixed(2)} млн`;
      if (num >= 1e3) return `${(num / 1e3).toFixed(2)} тыс`;
      return Math.round(num);
    };
    
    return [
      { value: formatLarge(distanceKm), label: 'Расстояние (км)', unit: 'км' },
      { value: Number(distanceAu.toFixed(2)), label: 'Расстояние (AU)', unit: 'AU' },
      { value: Number(distanceLy.toFixed(6)), label: 'Расстояние (св. г.)', unit: 'ly' },
      { value: actualTime, label: 'Фактическое время в пути' }
    ];
  },
  content: {
    howTo: 'Введите время, за которое свет проходит расстояние. Укажите скорость (по умолчанию 100% — скорость света). Калькулятор покажет расстояние и реальное время пути для заданной скорости.',
    about: 'Скорость света — предельная скорость распространения информации в пространстве-времени (299,792 км/с). Время света — время, за которое свет преодолевает расстояние.',
    formula: 'Расстояние = скорость света × время\nВремя пути = время света × (100% / скорость %)',
    faq: [
      { question: 'Сколько времени свет идёт от Солнца до Земли?', answer: '8 минут 20 секунд (8.32 световые минуты или ~1 AU).' },
      { question: 'Зачем нужна настройка скорости?', answer: 'Для расчёта времени пути космических аппаратов (обычно 0.001-0.01% от c) или учёта релятивистских эффектов.' }
    ],
    sources: [
      { title: 'NASA - Speed of Light', url: 'https://science.nasa.gov/light/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер красного смещения
export const redshiftConverter: Calculator = {
  id: 'redshift-converter',
  slug: 'konverter-krasnogo-smeshcheniya',
  title: 'Конвертер красного смещения',
  description: 'Перевод красного смещения z в скорость отдаления, расстояние и возраст Вселенной',
  category: 'konvertery',
  subcategory: 'space-units',
  type: 'formula',
  inputs: [
    {
      name: 'redshift',
      label: 'Красное смещение (z)',
      type: 'number',
      placeholder: '0.1',
      min: 0,
      step: 0.01,
      defaultValue: 0.1
    },
    {
      name: 'calculationType',
      label: 'Тип расчёта',
      type: 'select',
      options: [
        { value: 'approximate', label: 'Приближённый (v << c)' },
        { value: 'relativistic', label: 'Релятивистский (точный)' }
      ],
      defaultValue: 'relativistic'
    }
  ],
  outputs: [
    { name: 'velocity', label: 'Скорость отдаления', type: 'number', unit: 'км/с' },
    { name: 'velocityPercent', label: '% от скорости света', type: 'number', unit: '% c' },
    { name: 'distance', label: 'Примерное расстояние', type: 'number', unit: 'Мпк' },
    { name: 'lookbackTime', label: 'Время в прошлое', type: 'number', unit: 'млрд лет' }
  ],
  calculate: (inputs) => {
    const z = Number(inputs.redshift);
    const calculationType = String(inputs.calculationType);
    
    if (!z && z !== 0) {
      return [
        { value: '—', label: 'Скорость отдаления', unit: 'км/с' },
        { value: '—', label: '% от скорости света', unit: '% c' },
        { value: '—', label: 'Примерное расстояние', unit: 'Мпк' },
        { value: '—', label: 'Время в прошлое', unit: 'млрд лет' }
      ];
    }
    
    const c = 299792.458; // km/s
    
    // Velocity calculation
    let velocity: number;
    if (calculationType === 'approximate') {
      // v ≈ c × z for small z
      velocity = c * z;
    } else {
      // Relativistic: v = c × ((1+z)² - 1) / ((1+z)² + 1)
      const onePlusZ = 1 + z;
      const squared = onePlusZ * onePlusZ;
      velocity = c * (squared - 1) / (squared + 1);
    }
    
    const velocityPercent = (velocity / c) * 100;
    
    // Approximate distance using Hubble's law (H₀ ≈ 70 km/s/Mpc)
    // This is simplified - real cosmology needs proper calculation
    const h0 = 70;
    const distance = velocity / h0;
    
    // Lookback time (rough approximation)
    // For small z: t ≈ z / H₀ in Gyr where H₀ ≈ 0.07 Gyr⁻¹
    const h0Gyr = 0.070; // km/s/Mpc converted to Gyr⁻¹
    const lookbackTime = z / h0Gyr * 0.95; // Rough correction
    
    return [
      { value: Math.round(velocity), label: 'Скорость отдаления', unit: 'км/с' },
      { value: Number(velocityPercent.toFixed(2)), label: '% от скорости света', unit: '% c' },
      { value: Number(distance.toFixed(1)), label: 'Примерное расстояние', unit: 'Мпк' },
      { value: Number(lookbackTime.toFixed(2)), label: 'Время в прошлое', unit: 'млрд лет' }
    ];
  },
  content: {
    howTo: 'Введите красное смещение z объекта. Выберите метод расчёта. Калькулятор оценит скорость отдаления, расстояние и "время в прошлое" — когда мы видим объект таким, каким он был.',
    about: 'Красное смещение (z) — увеличение длины волны света от далёких объектов из-за расширения Вселенной. z = (λ_наблюдаемая - λ_исходная) / λ_исходная. Открыто Эдвином Хабблом.',
    formula: 'Релятивистическая: v = c × ((1+z)² - 1) / ((1+z)² + 1)\nПриближённая: v ≈ c × z (для z << 1)',
    faq: [
      { question: 'Что означает z = 1?', answer: 'Длина волны увеличена в 2 раза. Объект удаляется со скоростью ~60% c. Расстояние ~4 млрд световых лет.' },
      { question: 'Какое z у самых далёких галактик?', answer: 'Самые далёкие известные галактики имеют z > 10 (видимы как они были 13+ млрд лет назад).' }
    ],
    sources: [
      { title: 'NASA - Redshift', url: 'https://imagine.gsfc.nasa.gov/features/cosmic/redshift.html' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер температуры звёзд
export const stellarTemperatureConverter: Calculator = {
  id: 'stellar-temperature-converter',
  slug: 'konverter-zvezdnoy-temperatury',
  title: 'Конвертер температуры звёзд',
  description: 'Перевод между температурой звезды, её спектральным классом и цветом',
  category: 'konvertery',
  subcategory: 'space-units',
  type: 'converter',
  inputs: [
    {
      name: 'temperature',
      label: 'Температура поверхности (K)',
      type: 'number',
      placeholder: '5778',
      min: 2000,
      max: 50000,
      defaultValue: 5778
    }
  ],
  outputs: [
    { name: 'spectralClass', label: 'Спектральный класс', type: 'text' },
    { name: 'color', label: 'Цвет', type: 'text' },
    { name: 'wienPeak', label: 'Пик излучения (Вена)', type: 'number', unit: 'нм' },
    { name: 'bolometricCorrection', label: 'Болометрическая поправка', type: 'number', unit: 'mag' }
  ],
  calculate: (inputs) => {
    const temp = Number(inputs.temperature);
    
    if (!temp) {
      return [
        { value: '—', label: 'Спектральный класс' },
        { value: '—', label: 'Цвет' },
        { value: '—', label: 'Пик излучения (Вена)', unit: 'нм' },
        { value: '—', label: 'Болометрическая поправка', unit: 'mag' }
      ];
    }
    
    // Spectral class determination
    let spectralClass: string;
    let color: string;
    
    if (temp >= 30000) {
      spectralClass = 'O';
      color = 'Голубой';
    } else if (temp >= 10000) {
      spectralClass = 'B';
      color = 'Сине-белый';
    } else if (temp >= 7500) {
      spectralClass = 'A';
      color = 'Белый';
    } else if (temp >= 6000) {
      spectralClass = 'F';
      color = 'Жёлто-белый';
    } else if (temp >= 5200) {
      spectralClass = 'G';
      color = 'Жёлтый';
    } else if (temp >= 3700) {
      spectralClass = 'K';
      color = 'Оранжевый';
    } else {
      spectralClass = 'M';
      color = 'Красный';
    }
    
    // Wien's displacement law: λ_max = b / T, b = 2.898 × 10⁻³ m·K
    const wienConstant = 2.898e6; // nm·K
    const wienPeak = wienConstant / temp;
    
    // Bolometric correction (approximate)
    let bc: number;
    if (temp > 10000) {
      bc = -2.5 * Math.log10(1 + 0.5 * Math.pow(5500 / temp, 3));
    } else {
      bc = 0;
    }
    
    return [
      { value: spectralClass, label: 'Спектральный класс' },
      { value: color, label: 'Цвет' },
      { value: Math.round(wienPeak), label: 'Пик излучения (Вена)', unit: 'нм' },
      { value: Number(bc.toFixed(2)), label: 'Болометрическая поправка', unit: 'mag' }
    ];
  },
  content: {
    howTo: 'Введите температуру поверхности звезды в кельвинах. Калькулятор определит спектральный класс, цвет, длину волны пика излучения по закону Вена.',
    about: 'Закон смещения Вена связывает температуру тела с длиной волны максимума излучения. Звёздные спектральные классы (O-B-A-F-G-K-M) основаны на температуре поверхности.',
    formula: 'λ_max = b / T, где b = 2.898 × 10⁻³ м·К',
    faq: [
      { question: 'Какая температура у Солнца?', answer: '5778 К — спектральный класс G2V (жёлтая карликовая звезда). Пик излучения в видимом диапазоне (~502 нм — зелёный).' },
      { question: 'Почему звёзды разных цветов?', answer: 'Температура определяет цвет: горячие (>10000 К) — голубые, холодные (<4000 К) — красные.' }
    ],
    sources: [
      { title: 'Wikipedia - Stellar classification', url: 'https://en.wikipedia.org/wiki/Stellar_classification' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер массы и радиуса звёзд
export const stellarSizeConverter: Calculator = {
  id: 'stellar-size-converter',
  slug: 'konverter-massy-i-radiusa-zvezd',
  title: 'Конвертер массы и радиуса звёзд',
  description: 'Перевод массы и радиуса звёзд в солнечные единицы, расчёт гравитации и плотности',
  category: 'konvertery',
  subcategory: 'space-units',
  type: 'formula',
  inputs: [
    {
      name: 'mass',
      label: 'Масса (M☉)',
      type: 'number',
      placeholder: '1',
      min: 0.01,
      max: 1000,
      step: 0.01,
      defaultValue: 1
    },
    {
      name: 'radius',
      label: 'Радиус (R☉)',
      type: 'number',
      placeholder: '1',
      min: 0.001,
      max: 2000,
      step: 0.01,
      defaultValue: 1
    }
  ],
  outputs: [
    { name: 'massKg', label: 'Масса (кг)', type: 'number', unit: 'кг' },
    { name: 'radiusKm', label: 'Радиус (км)', type: 'number', unit: 'км' },
    { name: 'surfaceGravity', label: 'Поверхностная гравитация', type: 'number', unit: 'g' },
    { name: 'avgDensity', label: 'Средняя плотность', type: 'number', unit: 'кг/м³' },
    { name: 'escapeVelocity', label: 'Вторая космическая', type: 'number', unit: 'км/с' }
  ],
  calculate: (inputs) => {
    const mass = Number(inputs.mass);
    const radius = Number(inputs.radius);
    
    if (!mass || !radius) {
      return [
        { value: '—', label: 'Масса (кг)', unit: 'кг' },
        { value: '—', label: 'Радиус (км)', unit: 'км' },
        { value: '—', label: 'Поверхностная гравитация', unit: 'g' },
        { value: '—', label: 'Средняя плотность', unit: 'кг/м³' },
        { value: '—', label: 'Вторая космическая', unit: 'км/с' }
      ];
    }
    
    // Solar constants
    const solarMass = 1.989e30; // kg
    const solarRadius = 696340; // km
    const G = 6.674e-11; // m³/kg/s²
    
    const massKg = mass * solarMass;
    const radiusKm = radius * solarRadius;
    const radiusM = radiusKm * 1000;
    
    // Surface gravity: g = GM/R²
    const g = (G * massKg) / Math.pow(radiusM, 2);
    const gRatio = g / 9.81;
    
    // Average density
    const volume = (4 / 3) * Math.PI * Math.pow(radiusM, 3);
    const density = massKg / volume;
    
    // Escape velocity: v = √(2GM/R)
    const escapeVelocity = Math.sqrt((2 * G * massKg) / radiusM) / 1000;
    
    return [
      { value: massKg.toExponential(3), label: 'Масса (кг)', unit: 'кг' },
      { value: Math.round(radiusKm), label: 'Радиус (км)', unit: 'км' },
      { value: Number(gRatio.toFixed(2)), label: 'Поверхностная гравитация', unit: 'g' },
      { value: Number(density.toFixed(1)), label: 'Средняя плотность', unit: 'кг/м³' },
      { value: Number(escapeVelocity.toFixed(1)), label: 'Вторая космическая', unit: 'км/с' }
    ];
  },
  content: {
    howTo: 'Введите массу и радиус звезды в солнечных единицах (M☉ и R☉). Калькулятор переведёт в абсолютные единицы и рассчитает гравитацию, плотность и скорость убегания.',
    about: 'Солнечная масса (M☉) = 1.989 × 10³⁰ кг. Солнечный радиус (R☉) = 696,340 км. Эти единицы позволяют удобно описывать звёзды разных типов: от карликов до сверхгигантов.',
    formula: 'g = GM/R²\nρ = M / (4/3 πR³)\nv_escape = √(2GM/R)',
    faq: [
      { question: 'Сколько массивнее Бетельгейзе?', answer: 'Бетельгейзе имеет массу ~12 M☉ и радиус ~900 R☉. Плотность меньше миллиона раз по сравнению с Солнцем.' },
      { question: 'Какая плотность у белых карликов?', answer: '~10⁹ кг/м³ (в миллион раз плотнее воды). Нейтронные звёзды — ещё в миллиард раз плотнее.' }
    ],
    sources: [
      { title: 'NASA - Star Size Comparison', url: 'https://www.nasa.gov/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер орбитальных периодов
export const orbitalPeriodConverter: Calculator = {
  id: 'orbital-period-converter',
  slug: 'konverter-orbitalnyh-periodov',
  title: 'Конвертер орбитальных периодов',
  description: 'Перевод между периодами обращения планет: земные дни, местные годы, земные годы',
  category: 'konvertery',
  subcategory: 'space-units',
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
      name: 'fromUnit',
      label: 'Из единицы',
      type: 'select',
      options: [
        { value: 'earthDays', label: 'Земные сутки' },
        { value: 'earthYears', label: 'Земные года' },
        { value: 'mercuryYears', label: 'Меркурианские года' },
        { value: 'martianYears', label: 'Марсианские года' },
        { value: 'jupiterYears', label: 'Юпитерианские года' }
      ],
      defaultValue: 'earthDays'
    }
  ],
  outputs: [
    { name: 'earthDays', label: 'Земные сутки', type: 'number', unit: 'дн' },
    { name: 'earthYears', label: 'Земные года', type: 'number', unit: 'лет' },
    { name: 'mercuryYears', label: 'Меркурианские года', type: 'number', unit: 'мерк. лет' },
    { name: 'martianYears', label: 'Марсианские года', type: 'number', unit: 'марс. лет' },
    { name: 'jupiterYears', label: 'Юпитерианские года', type: 'number', unit: 'юп. лет' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const fromUnit = String(inputs.fromUnit);
    
    if (!value) {
      return [
        { value: '—', label: 'Земные сутки', unit: 'дн' },
        { value: '—', label: 'Земные года', unit: 'лет' },
        { value: '—', label: 'Меркурианские года', unit: 'мерк. лет' },
        { value: '—', label: 'Марсианские года', unit: 'марс. лет' },
        { value: '—', label: 'Юпитерианские года', unit: 'юп. лет' }
      ];
    }
    
    // Orbital periods in Earth days
    const periods: Record<string, number> = {
      'earthDays': 1,
      'earthYears': 365.25,
      'mercuryYears': 87.97,
      'martianYears': 686.98,
      'jupiterYears': 4332.59
    };
    
    // Convert to Earth days first
    const earthDays = value * periods[fromUnit];
    
    return [
      { value: Math.round(earthDays), label: 'Земные сутки', unit: 'дн' },
      { value: Number((earthDays / 365.25).toFixed(3)), label: 'Земные года', unit: 'лет' },
      { value: Number((earthDays / 87.97).toFixed(2)), label: 'Меркурианские года', unit: 'мерк. лет' },
      { value: Number((earthDays / 686.98).toFixed(3)), label: 'Марсианские года', unit: 'марс. лет' },
      { value: Number((earthDays / 4332.59).toFixed(4)), label: 'Юпитерианские года', unit: 'юп. лет' }
    ];
  },
  content: {
    howTo: 'Введите период времени и выберите планету отсчёта. Калькулятор покажет, сколько это составит в годах других планет.',
    about: 'Орбитальный период — время полного оборота вокруг Солнца. На разных планетах "год" разной длины: Меркурий — 88 земных дней, Юпитер — почти 12 земных лет.',
    formula: 'Период зависит от расстояния по 3-му закону Кеплера: T² ∝ a³',
    faq: [
      { question: 'Сколько земных лет в марсианском?', answer: '1 марсианский год = 1.88 земных года ≈ 687 земных суток.' },
      { question: 'Какой самый длинный год в Солнечной системе?', answer: 'У Нептуна — 164.8 земных года (60,190 суток).' }
    ],
    sources: [
      { title: 'NASA - Planetary Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const astronomyCalculators: Calculator[] = [
  lightYearConverter,
  astronomicalUnitConverter,
  parsecConverter,
  magnitudeConverter,
  spaceTimeConverter,
  redshiftConverter,
  stellarTemperatureConverter,
  stellarSizeConverter,
  orbitalPeriodConverter
];
