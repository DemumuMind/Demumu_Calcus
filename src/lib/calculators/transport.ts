import { Calculator } from '../types';

// Калькулятор расхода топлива
export const fuelConsumptionCalculator: Calculator = {
  id: 'fuel-consumption',
  slug: 'rashod-topliva',
  title: 'Калькулятор расхода топлива',
  description: 'Расчёт расхода топлива на 100 км, конвертация L/100km ↔ MPG',
  category: 'transport',
  subcategory: 'raskhod-topliva',
  type: 'formula',
  inputs: [
    {
      name: 'distance',
      label: 'Пройденное расстояние (км)',
      type: 'number',
      placeholder: '500',
      defaultValue: 500,
      min: 0.1
    },
    {
      name: 'fuelUsed',
      label: 'Израсходовано топлива (литры)',
      type: 'number',
      placeholder: '40',
      defaultValue: 40,
      min: 0.1
    },
    {
      name: 'fuelPrice',
      label: 'Цена топлива (₽/литр)',
      type: 'number',
      placeholder: '55',
      defaultValue: 55,
      min: 0
    }
  ],
  outputs: [
    { name: 'consumption100', label: 'Расход на 100 км', type: 'number', unit: 'л/100км' },
    { name: 'mpg', label: 'Мили на галлон (MPG)', type: 'number', unit: 'MPG' },
    { name: 'costPerKm', label: 'Стоимость на 1 км', type: 'number', unit: '₽' },
    { name: 'costPer100km', label: 'Стоимость на 100 км', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const distance = Number(inputs.distance);
    const fuelUsed = Number(inputs.fuelUsed);
    const fuelPrice = Number(inputs.fuelPrice);
    
    if (!distance || !fuelUsed) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const consumption100 = (fuelUsed / distance) * 100;
    const mpg = 235.215 / consumption100; // Конвертация л/100км в MPG
    const costPerKm = (fuelUsed * fuelPrice) / distance;
    const costPer100km = consumption100 * fuelPrice;
    
    return [
      { value: consumption100.toFixed(2), label: 'Расход на 100 км', unit: 'л/100км' },
      { value: mpg.toFixed(2), label: 'Мили на галлон', unit: 'MPG' },
      { value: costPerKm.toFixed(2), label: 'Стоимость на 1 км', unit: '₽' },
      { value: costPer100km.toFixed(2), label: 'Стоимость на 100 км', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите пройденное расстояние и количество израсходованного топлива. Калькулятор покажет расход в литрах на 100 км и в MPG.',
    about: 'Расход топлива — важный показатель экономичности автомобиля. Нормальный расход для бензиновых двигателей: 6-10 л/100км, для дизельных: 5-8 л/100км.',
    usage: 'Используется для оценки экономичности авто, планирования бюджета на топливо, сравнения расхода с нормами производителя.',
    formula: 'Расход (л/100км) = (Топливо (л) / Расстояние (км)) × 100\nMPG = 235.215 / Расход (л/100км)',
    faq: [
      {
        question: 'Что такое MPG?',
        answer: 'Miles Per Gallon — меры на галлон. Чем выше значение, тем экономичнее авто. Популярная мера в США и Великобритании.'
      },
      {
        question: 'Какой расход считается нормальным?',
        answer: 'Для городского цикла: малолитражки 5-7 л/100км, седаны 8-10 л/100км, кроссоверы 9-12 л/100км. Трасса на 20-30% экономичнее.'
      }
    ],
    sources: [
      { title: 'Расход топлива — Википедия', url: 'https://ru.wikipedia.org/wiki/Расход_топлива' }
    ],
    updatedAt: '2026-04-07'
  },
  popularCalculations: [
    { value: '500 км, 40 литров', url: '/rashod-topliva?distance=500&fuelUsed=40' },
    { value: '1000 км, 70 литров', url: '/rashod-topliva?distance=1000&fuelUsed=70' }
  ]
};

// Калькулятор стоимости поездки
export const tripCostCalculator: Calculator = {
  id: 'trip-cost-fuel',
  slug: 'stoimost-poezdki',
  title: 'Калькулятор стоимости поездки',
  description: 'Расчёт стоимости поездки на авто с учётом расхода топлива',
  category: 'transport',
  subcategory: 'stoimost-poezdki',
  type: 'formula',
  inputs: [
    {
      name: 'distance',
      label: 'Расстояние (км)',
      type: 'number',
      placeholder: '300',
      defaultValue: 300,
      min: 1
    },
    {
      name: 'consumption',
      label: 'Расход топлива (л/100км)',
      type: 'number',
      placeholder: '8',
      defaultValue: 8,
      min: 1,
      max: 50
    },
    {
      name: 'fuelPrice',
      label: 'Цена топлива (₽/литр)',
      type: 'number',
      placeholder: '55',
      defaultValue: 55,
      min: 1
    },
    {
      name: 'passengers',
      label: 'Количество пассажиров',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 1,
      max: 8
    }
  ],
  outputs: [
    { name: 'fuelNeeded', label: 'Нужно топлива', type: 'number', unit: 'л' },
    { name: 'fuelCost', label: 'Стоимость топлива', type: 'number', unit: '₽' },
    { name: 'costPerPerson', label: 'Стоимость с человека', type: 'number', unit: '₽' },
    { name: 'totalCost', label: 'Общая стоимость', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const distance = Number(inputs.distance);
    const consumption = Number(inputs.consumption);
    const fuelPrice = Number(inputs.fuelPrice);
    const passengers = Number(inputs.passengers);
    
    if (!distance || !consumption) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const fuelNeeded = (distance * consumption) / 100;
    const fuelCost = fuelNeeded * fuelPrice;
    const costPerPerson = fuelCost / passengers;
    
    return [
      { value: fuelNeeded.toFixed(2), label: 'Нужно топлива', unit: 'л' },
      { value: fuelCost.toFixed(2), label: 'Стоимость топлива', unit: '₽' },
      { value: costPerPerson.toFixed(2), label: 'Стоимость с человека', unit: '₽' },
      { value: fuelCost.toFixed(2), label: 'Общая стоимость', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите расстояние поездки, расход вашего авто и цену топлива. Укажите количество пассажиров для разделения стоимости.',
    about: 'Калькулятор помогает спланировать бюджет поездки и разделить расходы между попутчиками.',
    usage: 'Используйте для планирования поездок, расчёта совместных поездок с друзьями, оценки стоимости командировки.',
    formula: 'Топливо = (Расстояние × Расход) / 100\nСтоимость = Топливо × Цена за литр',
    faq: [
      {
        question: 'Учитывается ли износ авто?',
        answer: 'Базовый расчёт только топливо. Для полной стоимости добавьте амортизацию: 3-5 ₽/км для обычных авто, 5-10 ₽/км для премиум.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор транспортного налога
export const vehicleTaxCalculator: Calculator = {
  id: 'vehicle-tax',
  slug: 'transportnyj-nalog',
  title: 'Калькулятор транспортного налога',
  description: 'Расчёт транспортного налога по мощности двигателя и региону',
  category: 'transport',
  subcategory: 'nalogi-i-sbory',
  type: 'formula',
  inputs: [
    {
      name: 'power',
      label: 'Мощность двигателя',
      type: 'number',
      placeholder: '150',
      defaultValue: 150,
      min: 1
    },
    {
      name: 'powerUnit',
      label: 'Единица мощности',
      type: 'select',
      options: [
        { value: 'hp', label: 'л.с.' },
        { value: 'kw', label: 'кВт' }
      ],
      defaultValue: 'hp'
    },
    {
      name: 'region',
      label: 'Регион',
      type: 'select',
      options: [
        { value: 'moscow', label: 'Москва' },
        { value: 'spb', label: 'Санкт-Петербург' },
        { value: 'region', label: 'Другой регион' }
      ],
      defaultValue: 'region'
    },
    {
      name: 'months',
      label: 'Месяцев владения в году',
      type: 'number',
      placeholder: '12',
      defaultValue: 12,
      min: 1,
      max: 12
    }
  ],
  outputs: [
    { name: 'powerHp', label: 'Мощность', type: 'number', unit: 'л.с.' },
    { name: 'taxBase', label: 'Ставка за 1 л.с.', type: 'number', unit: '₽' },
    { name: 'annualTax', label: 'Налог за год', type: 'number', unit: '₽' },
    { name: 'monthlyTax', label: 'Налог за месяц', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const power = Number(inputs.power);
    const powerUnit = String(inputs.powerUnit);
    const region = String(inputs.region);
    const months = Number(inputs.months);
    
    if (!power) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Конвертация кВт в л.с.
    const powerHp = powerUnit === 'kw' ? power * 1.35962 : power;
    
    // Ставки по регионам (примерные)
    const rates: Record<string, number> = {
      'moscow': 50,
      'spb': 50,
      'region': 35
    };
    
    // Коэффициент по мощности
    let rate = rates[region] || 35;
    if (powerHp > 250) rate *= 1.5;
    else if (powerHp > 200) rate *= 1.3;
    else if (powerHp > 150) rate *= 1.1;
    
    const annualTax = powerHp * rate;
    const proratedTax = (annualTax / 12) * months;
    
    return [
      { value: Math.round(powerHp).toString(), label: 'Мощность', unit: 'л.с.' },
      { value: rate.toString(), label: 'Ставка', unit: '₽/л.с.' },
      { value: Math.round(proratedTax).toString(), label: 'Налог за период', unit: '₽' },
      { value: Math.round(annualTax).toString(), label: 'Налог за полный год', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите мощность двигателя в лошадиных силах или кВт, выберите регион и количество месяцев владения.',
    about: 'Транспортный налог рассчитывается исходя из мощности двигателя в лошадиных силах и региональной ставки.',
    usage: 'Используйте для планирования расходов на содержание авто, проверки начислений налоговой.',
    formula: 'Налог = Мощность (л.с.) × Ставка × (Месяцев / 12)',
    faq: [
      {
        question: 'Какие ставки в разных регионах?',
        answer: 'Ставки различаются в 2-3 раза. Москва и СПб: до 50-75 ₽/л.с., регионы: 20-35 ₽/л.с. Для мощных авто (200+ л.с.) применяются повышающие коэффициенты.'
      },
      {
        question: 'Есть ли льготы?',
        answer: 'Льготы предусмотрены для пенсионеров, инвалидов, многодетных семей — зависят от региона. Обычно льгота 50-100% для авто до 150 л.с.'
      }
    ],
    sources: [
      { title: 'Транспортный налог — Википедия', url: 'https://ru.wikipedia.org/wiki/Транспортный_налог' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор растаможки авто
export const customsCalculator: Calculator = {
  id: 'customs',
  slug: 'rastamozhka-avto',
  title: 'Калькулятор растаможки авто',
  description: 'Расчёт стоимости растаможки автомобиля из-за рубежа',
  category: 'transport',
  subcategory: 'rastamozhka',
  type: 'formula',
  inputs: [
    {
      name: 'carPrice',
      label: 'Стоимость авто (€)',
      type: 'number',
      placeholder: '15000',
      defaultValue: 15000,
      min: 100
    },
    {
      name: 'engineVolume',
      label: 'Объём двигателя (см³)',
      type: 'number',
      placeholder: '2000',
      defaultValue: 2000,
      min: 500,
      max: 8000
    },
    {
      name: 'engineType',
      label: 'Тип двигателя',
      type: 'select',
      options: [
        { value: 'petrol', label: 'Бензин' },
        { value: 'diesel', label: 'Дизель' },
        { value: 'hybrid', label: 'Гибрид' },
        { value: 'electric', label: 'Электро' }
      ],
      defaultValue: 'petrol'
    },
    {
      name: 'carAge',
      label: 'Возраст авто (лет)',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 0,
      max: 50
    }
  ],
  outputs: [
    { name: 'customsDuty', label: 'Таможенная пошлина', type: 'number', unit: '€' },
    { name: 'exciseTax', label: 'Акциз', type: 'number', unit: '€' },
    { name: 'vat', label: 'НДС', type: 'number', unit: '€' },
    { name: 'utilizationFee', label: 'Утилизационный сбор', type: 'number', unit: '€' },
    { name: 'total', label: 'Итого растаможка', type: 'number', unit: '€' },
    { name: 'totalPercent', label: '% от стоимости авто', type: 'number', unit: '%' }
  ],
  calculate: (inputs) => {
    const carPrice = Number(inputs.carPrice);
    const engineVolume = Number(inputs.engineVolume);
    const engineType = String(inputs.engineType);
    const carAge = Number(inputs.carAge);
    
    if (!carPrice || !engineVolume) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Упрощённые ставки для физлиц
    let customsDuty = carPrice * 0.25; // ~25%
    if (carAge > 3 && carAge <= 5) customsDuty = carPrice * 0.35;
    if (carAge > 5) customsDuty = carPrice * 0.5;
    
    // Акциз (€ за 1 см³)
    let exciseRate = 0.5; // Бензин до 3 лет
    if (engineType === 'diesel') exciseRate = 0.8;
    if (engineType === 'electric') exciseRate = 0;
    if (carAge > 3) exciseRate *= 1.5;
    
    const exciseTax = engineVolume * exciseRate;
    
    // НДС 20%
    const vatBase = carPrice + customsDuty + exciseTax;
    const vat = vatBase * 0.20;
    
    // Утилизационный сбор
    let utilizationBase = 20000; // Руб, конвертируем условно
    if (engineType === 'electric') utilizationBase = 0;
    const utilizationFee = utilizationBase / 90; // Конвертация в € (примерно)
    
    const total = customsDuty + exciseTax + vat + utilizationFee;
    const totalPercent = (total / carPrice) * 100;
    
    return [
      { value: customsDuty.toFixed(2), label: 'Таможенная пошлина', unit: '€' },
      { value: exciseTax.toFixed(2), label: 'Акциз', unit: '€' },
      { value: vat.toFixed(2), label: 'НДС', unit: '€' },
      { value: utilizationFee.toFixed(2), label: 'Утилизационный сбор', unit: '€' },
      { value: total.toFixed(2), label: 'Итого растаможка', unit: '€' },
      { value: totalPercent.toFixed(1), label: '% от стоимости', unit: '%' }
    ];
  },
  content: {
    howTo: 'Введите стоимость автомобиля, объём двигателя, тип топлива и возраст. Калькулятор рассчитает все платежи.',
    about: 'Растаможка включает: таможенную пошлину, акциз, НДС и утилизационный сбор. Для физлиц действуют упрощённые правила.',
    usage: 'Используйте перед покупкой авто за границей для оценки полной стоимости.',
    formula: 'Пошлина: до 3 лет — 25-48%, 3-5 лет — 35%, старше 5 лет — 50%\nАкциз: зависит от объёма и типа двигателя\nНДС: 20% от (цена + пошлина + акциз)',
    faq: [
      {
        question: 'Можно ли ввезти авто без пошлин?',
        answer: 'Физлицам можно ввезти 1 авто в год с двигателем до 3.5 л без пошлины, но акциз и утилизационный сбор всё равно платятся.'
      },
      {
        question: 'Сколько стоит растаможка электромобиля?',
        answer: 'Для электромобилей до 2025 года действуют льготы: нулевая пошлина и акциз, только НДС 20% и минимальный утилизационный сбор.'
      }
    ],
    sources: [
      { title: 'Таможенное оформление авто', url: 'https://customs.gov.ru' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор утилизационного сбора
export const utilizationFeeCalculator: Calculator = {
  id: 'utilization-fee',
  slug: 'utilizacionnyj-sbor',
  title: 'Калькулятор утилизационного сбора',
  description: 'Расчёт утилизационного сбора для автомобилей',
  category: 'transport',
  subcategory: 'utilizacionnyj-sbor',
  type: 'formula',
  inputs: [
    {
      name: 'engineVolume',
      label: 'Объём двигателя (см³)',
      type: 'number',
      placeholder: '1600',
      defaultValue: 1600,
      min: 0,
      max: 10000
    },
    {
      name: 'vehicleType',
      label: 'Тип транспортного средства',
      type: 'select',
      options: [
        { value: 'passenger', label: 'Легковой автомобиль' },
        { value: 'truck', label: 'Грузовой автомобиль' },
        { value: 'bus', label: 'Автобус' },
        { value: 'trailer', label: 'Прицеп/полуприцеп' },
        { value: 'bike', label: 'Мотоцикл/мопед' }
      ],
      defaultValue: 'passenger'
    },
    {
      name: 'isLegalEntity',
      label: 'Юридическое лицо',
      type: 'select',
      options: [
        { value: 'false', label: 'Физическое лицо' },
        { value: 'true', label: 'Юридическое лицо' }
      ],
      defaultValue: 'false'
    }
  ],
  outputs: [
    { name: 'baseRate', label: 'Базовая ставка', type: 'number', unit: '₽' },
    { name: 'multiplier', label: 'Коэффициент', type: 'number', unit: '' },
    { name: 'totalFee', label: 'Утилизационный сбор', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const engineVolume = Number(inputs.engineVolume);
    const vehicleType = String(inputs.vehicleType);
    const isLegalEntity = inputs.isLegalEntity === 'true';
    
    // Базовые ставки (утилизационный сбор)
    const baseRates: Record<string, number> = {
      'passenger': 20000,
      'truck': 30000,
      'bus': 35000,
      'trailer': 15000,
      'bike': 8000
    };
    
    const baseRate = baseRates[vehicleType] || 20000;
    
    // Коэффициенты для объёма двигателя
    let multiplier = 1;
    if (engineVolume > 1000 && engineVolume <= 2000) multiplier = 1.5;
    if (engineVolume > 2000 && engineVolume <= 3000) multiplier = 2.5;
    if (engineVolume > 3000 && engineVolume <= 3500) multiplier = 3.5;
    if (engineVolume > 3500) multiplier = 5;
    
    // Для юрлиц ставка выше
    if (isLegalEntity) multiplier *= 1.5;
    
    // Для электромобилей (объём = 0)
    if (engineVolume === 0) {
      multiplier = isLegalEntity ? 1.5 : 0.5;
    }
    
    const totalFee = baseRate * multiplier;
    
    return [
      { value: baseRate.toString(), label: 'Базовая ставка', unit: '₽' },
      { value: multiplier.toString(), label: 'Коэффициент', unit: '' },
      { value: totalFee.toString(), label: 'Итого сбор', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите объём двигателя и тип транспортного средства. Укажите, физическое или юридическое лицо.',
    about: 'Утилизационный сбор — обязательный платёж при ввозе или производстве авто. Идёт на экологичную утилизацию старых машин.',
    usage: 'Используется при растаможке авто, покупке нового транспортного средства.',
    formula: 'Сбор = Базовая ставка × Коэффициент\nКоэффициент зависит от объёма двигателя и типа плательщика',
    faq: [
      {
        question: 'Кто платит утилизационный сбор?',
        answer: 'Все производители и импортёры авто. Для физлиц при ввозе 1 авто в год ставки ниже.'
      },
      {
        question: 'Сколько стоит для электромобиля?',
        answer: 'Для электромобилей минимальный сбор: от 10 000 ₽ для физлиц, от 30 000 ₽ для юрлиц.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

export const transportCalculators = [
  fuelConsumptionCalculator,
  tripCostCalculator,
  vehicleTaxCalculator,
  customsCalculator,
  utilizationFeeCalculator
];
