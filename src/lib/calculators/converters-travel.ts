import { Calculator } from '../types';

// Калькулятор часовых поясов
export const timezoneConverter: Calculator = {
  id: 'timezone-converter',
  slug: 'chasovye-poyasa',
  title: 'Конвертер часовых поясов',
  description: 'Перевод времени между различными часовыми поясами мира',
  category: 'puteshestviya',
  subcategory: 'travel-tools',
  type: 'converter',
  inputs: [
    {
      name: 'time',
      label: 'Время',
      type: 'text',
      placeholder: '14:30',
      defaultValue: '12:00'
    },
    {
      name: 'fromTimezone',
      label: 'Из пояса',
      type: 'select',
      options: [
        { value: 'UTC', label: 'UTC' },
        { value: 'MSK', label: 'Москва (MSK, UTC+3)' },
        { value: 'CET', label: 'Центральная Европа (CET, UTC+1)' },
        { value: 'EST', label: 'Нью-Йорк (EST, UTC-5)' },
        { value: 'PST', label: 'Лос-Анджелес (PST, UTC-8)' },
        { value: 'JST', label: 'Токио (JST, UTC+9)' },
        { value: 'AEST', label: 'Сидней (AEST, UTC+10)' },
        { value: 'GMT', label: 'Лондон (GMT, UTC+0)' }
      ],
      defaultValue: 'MSK'
    },
    {
      name: 'toTimezone',
      label: 'В пояс',
      type: 'select',
      options: [
        { value: 'UTC', label: 'UTC' },
        { value: 'MSK', label: 'Москва (MSK, UTC+3)' },
        { value: 'CET', label: 'Центральная Европа (CET, UTC+1)' },
        { value: 'EST', label: 'Нью-Йорк (EST, UTC-5)' },
        { value: 'PST', label: 'Лос-Анджелес (PST, UTC-8)' },
        { value: 'JST', label: 'Токио (JST, UTC+9)' },
        { value: 'AEST', label: 'Сидней (AEST, UTC+10)' },
        { value: 'GMT', label: 'Лондон (GMT, UTC+0)' }
      ],
      defaultValue: 'UTC'
    }
  ],
  outputs: [
    { name: 'resultTime', label: 'Время в целевом поясе', type: 'text' },
    { name: 'timeDifference', label: 'Разница во времени', type: 'text' },
    { name: 'dateChange', label: 'Изменение даты', type: 'text' },
    { name: 'dayPeriod', label: 'Время суток', type: 'text' }
  ],
  calculate: (inputs) => {
    const time = String(inputs.time);
    const fromTimezone = String(inputs.fromTimezone);
    const toTimezone = String(inputs.toTimezone);
    
    // Parse time
    const timeParts = time.split(':');
    if (timeParts.length !== 2) {
      return [
        { value: 'Некорректный формат времени', label: 'Время в целевом поясе' },
        { value: '—', label: 'Разница во времени' },
        { value: '—', label: 'Изменение даты' },
        { value: '—', label: 'Время суток' }
      ];
    }
    
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return [
        { value: 'Некорректное время', label: 'Время в целевом поясе' },
        { value: '—', label: 'Разница во времени' },
        { value: '—', label: 'Изменение даты' },
        { value: '—', label: 'Время суток' }
      ];
    }
    
    // Timezone offsets from UTC
    const offsets: Record<string, number> = {
      'UTC': 0,
      'MSK': 3,
      'CET': 1,
      'EST': -5,
      'PST': -8,
      'JST': 9,
      'AEST': 10,
      'GMT': 0
    };
    
    const fromOffset = offsets[fromTimezone];
    const toOffset = offsets[toTimezone];
    const diff = toOffset - fromOffset;
    
    // Calculate new time
    let newHours = hours + diff;
    let dayChange = 0;
    
    while (newHours >= 24) {
      newHours -= 24;
      dayChange++;
    }
    while (newHours < 0) {
      newHours += 24;
      dayChange--;
    }
    
    const resultTime = `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    
    let timeDiffText: string;
    if (diff > 0) {
      timeDiffText = `+${diff} часов`;
    } else if (diff < 0) {
      timeDiffText = `${diff} часов`;
    } else {
      timeDiffText = 'Нет разницы';
    }
    
    let dateChangeText: string;
    if (dayChange > 0) {
      dateChangeText = `Следующий день (+${dayChange})`;
    } else if (dayChange < 0) {
      dateChangeText = `Предыдущий день (${dayChange})`;
    } else {
      dateChangeText = 'Тот же день';
    }
    
    let dayPeriod: string;
    if (newHours >= 5 && newHours < 12) {
      dayPeriod = 'Утро';
    } else if (newHours >= 12 && newHours < 17) {
      dayPeriod = 'День';
    } else if (newHours >= 17 && newHours < 22) {
      dayPeriod = 'Вечер';
    } else {
      dayPeriod = 'Ночь';
    }
    
    return [
      { value: resultTime, label: 'Время в целевом поясе' },
      { value: timeDiffText, label: 'Разница во времени' },
      { value: dateChangeText, label: 'Изменение даты' },
      { value: dayPeriod, label: 'Время суток' }
    ];
  },
  content: {
    howTo: 'Введите время в формате HH:MM, выберите исходный и целевой часовые пояса. Калькулятор переведёт время и покажет разницу.',
    about: 'Часовые пояса основаны на UTC (Coordinated Universal Time). Мир разделён на 24 часовых пояса, примерно по 15° долготы каждый.',
    formula: 'Целевое время = Исходное время + (Смещение целевого - Смещение исходного)',
    faq: [
      { question: 'Сколько часовых поясов в России?', answer: '11 часовых поясов: от UTC+2 (Калининград) до UTC+12 (Камчатка, Чукотка).' },
      { question: 'Что такое летнее время?', answer: 'Перевод часов на час вперёд летом для экономии электроэнергии. Не все страны используют.' }
    ],
    sources: [
      { title: 'Time Zone Map', url: 'https://www.timeanddate.com/time/map/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор чаевых
export const tipCalculator: Calculator = {
  id: 'tip-travel-calculator',
  slug: 'naevye',
  title: 'Калькулятор чаевых',
  description: 'Расчёт чаевых в ресторане с учётом процента, количества людей и качества обслуживания',
  category: 'puteshestviya',
  subcategory: 'travel-tools',
  type: 'formula',
  inputs: [
    {
      name: 'billAmount',
      label: 'Сумма счёта',
      type: 'number',
      placeholder: '2500',
      min: 0,
      defaultValue: 2500
    },
    {
      name: 'tipPercent',
      label: 'Процент чаевых',
      type: 'select',
      options: [
        { value: '0', label: '0% (чаевые не приняты)' },
        { value: '5', label: '5% (минимум)' },
        { value: '10', label: '10% (среднее)' },
        { value: '15', label: '15% (хорошее обслуживание)' },
        { value: '18', label: '18% (США стандарт)' },
        { value: '20', label: '20% (отличное обслуживание)' }
      ],
      defaultValue: '15'
    },
    {
      name: 'peopleCount',
      label: 'Количество человек',
      type: 'number',
      placeholder: '2',
      min: 1,
      defaultValue: 2
    }
  ],
  outputs: [
    { name: 'tipAmount', label: 'Сумма чаевых', type: 'number', unit: '₽' },
    { name: 'totalAmount', label: 'Итого с чаевыми', type: 'number', unit: '₽' },
    { name: 'perPerson', label: 'На человека', type: 'number', unit: '₽' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const billAmount = Number(inputs.billAmount);
    const tipPercent = Number(inputs.tipPercent);
    const peopleCount = Number(inputs.peopleCount);
    
    if (!billAmount || !peopleCount) {
      return [
        { value: '—', label: 'Сумма чаевых', unit: '₽' },
        { value: '—', label: 'Итого с чаевыми', unit: '₽' },
        { value: '—', label: 'На человека', unit: '₽' },
        { value: '—', label: 'Рекомендация' }
      ];
    }
    
    const tipAmount = billAmount * (tipPercent / 100);
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / peopleCount;
    
    let recommendation = '';
    if (tipPercent === 0) {
      recommendation = 'В некоторых странах чаевые не принято оставлять (Япония, Китай, Корея)';
    } else if (tipPercent <= 10) {
      recommendation = 'Стандарт для Европы и России. В США может считаться недостаточным.';
    } else if (tipPercent <= 18) {
      recommendation = 'Хороший стандарт для большинства стран. В США — минимум.';
    } else {
      recommendation = 'Щедрые чаевые. Отличный способ отблагодарить за превосходный сервис.';
    }
    
    return [
      { value: Math.round(tipAmount), label: 'Сумма чаевых', unit: '₽' },
      { value: Math.round(totalAmount), label: 'Итого с чаевыми', unit: '₽' },
      { value: Math.round(perPerson), label: 'На человека', unit: '₽' },
      { value: recommendation, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Введите сумму счёта, выберите процент чаевых и количество человек. Калькулятор рассчитает размер чаевых на человека.',
    about: 'Чаевые — добровольное вознаграждение за обслуживание. В разных странах разные традиции: от 0% (Япония) до 15-20% (США).',
    formula: 'Чаевые = Счёт × (Процент / 100)\nНа человека = (Счёт + Чаевые) / Количество человек',
    faq: [
      { question: 'Сколько чаевых оставлять в США?', answer: '15-20% в ресторанах. В такси 10-15%. 1-2 доллара за чемодан портье.' },
      { question: 'Где не принято оставлять чаевые?', answer: 'В Японии, Китае, Корее чаевые могут считаться оскорблением. В Европе часто включены в счёт (service charge).' }
    ],
    sources: [
      { title: 'TripAdvisor - Tipping Etiquette', url: 'https://www.tripadvisor.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор багажа
export const luggageCalculator: Calculator = {
  id: 'luggage-calculator',
  slug: 'raschet-bagazha',
  title: 'Калькулятор багажа',
  description: 'Проверка веса и размеров багажа на соответствие требованиям авиакомпаний',
  category: 'puteshestviya',
  subcategory: 'travel-tools',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '20',
      min: 0,
      max: 50,
      defaultValue: 20
    },
    {
      name: 'length',
      label: 'Длина (см)',
      type: 'number',
      placeholder: '55',
      min: 0,
      defaultValue: 55
    },
    {
      name: 'width',
      label: 'Ширина (см)',
      type: 'number',
      placeholder: '40',
      min: 0,
      defaultValue: 40
    },
    {
      name: 'height',
      label: 'Высота (см)',
      type: 'number',
      placeholder: '20',
      min: 0,
      defaultValue: 20
    },
    {
      name: 'airline',
      label: 'Авиакомпания',
      type: 'select',
      options: [
        { value: 'economy', label: 'Стандарт Economy' },
        { value: 'business', label: 'Business Class' },
        { value: 'budget', label: 'Бюджетный перевозчик' },
        { value: 'hand', label: 'Ручная кладь' }
      ],
      defaultValue: 'economy'
    }
  ],
  outputs: [
    { name: 'linearSize', label: 'Линейный размер', type: 'number', unit: 'см' },
    { name: 'status', label: 'Статус проверки', type: 'text' },
    { name: 'maxWeight', label: 'Макс. вес для класса', type: 'number', unit: 'кг' },
    { name: 'maxSize', label: 'Макс. линейный размер', type: 'number', unit: 'см' },
    { name: 'advice', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const airline = String(inputs.airline);
    
    if (!weight || !length || !width || !height) {
      return [
        { value: '—', label: 'Линейный размер', unit: 'см' },
        { value: '—', label: 'Статус проверки' },
        { value: '—', label: 'Макс. вес для класса', unit: 'кг' },
        { value: '—', label: 'Макс. линейный размер', unit: 'см' },
        { value: '—', label: 'Рекомендация' }
      ];
    }
    
    const linearSize = length + width + height;
    
    // Airline restrictions
    const restrictions: Record<string, { weight: number; linear: number }> = {
      'economy': { weight: 23, linear: 158 },
      'business': { weight: 32, linear: 158 },
      'budget': { weight: 20, linear: 158 },
      'hand': { weight: 10, linear: 115 }
    };
    
    const limits = restrictions[airline];
    
    let status: string;
    let advice: string;
    
    if (weight <= limits.weight && linearSize <= limits.linear) {
      status = '✓ Принимается';
      advice = 'Ваш багаж соответствует требованиям. Учтите, что при перелётах с пересадками могут быть другие правила.';
    } else if (weight > limits.weight && linearSize > limits.linear) {
      status = '✗ Превышен вес и размер';
      advice = `Багаж превышает ограничения. Ожидайте доплату за превышение веса и/или негабарит.`;
    } else if (weight > limits.weight) {
      status = '✗ Превышен вес';
      advice = `Вес превышен на ${Math.round(weight - limits.weight)} кг. Обычно доплата 50-100€ за каждые лишние кг.`;
    } else {
      status = '✗ Превышен размер';
      advice = `Линейный размер превышен на ${linearSize - limits.linear} см. Может считаться негабаритом.`;
    }
    
    return [
      { value: linearSize, label: 'Линейный размер', unit: 'см' },
      { value: status, label: 'Статус проверки' },
      { value: limits.weight, label: 'Макс. вес для класса', unit: 'кг' },
      { value: limits.linear, label: 'Макс. линейный размер', unit: 'см' },
      { value: advice, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Введите вес и размеры багажа (длина, ширина, высота), выберите класс обслуживания. Калькулятор проверит соответствие требованиям.',
    about: 'Авиакомпании ограничивают вес и размер багажа. Линейный размер — сумма трёх измерений. Стандарт Economy: 23 кг, 158 см линейно.',
    formula: 'Линейный размер = Длина + Ширина + Высота\nСравнение с лимитами авиакомпании',
    faq: [
      { question: 'Что такое линейный размер?', answer: 'Сумма длины, ширины и высоты чемодана. Стандарт для регистрируемого багажа — 158 см.' },
      { question: 'Сколько стоит лишний вес?', answer: 'Зависит от авиакомпании: от 50€ до 200€ за превышение. Бюджетные перевозчики строже.' }
    ],
    sources: [
      { title: 'IATA - Baggage Guidelines', url: 'https://www.iata.org/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор обмена валют
export const currencyExchangeCalculator: Calculator = {
  id: 'currency-exchange',
  slug: 'obmen-valyuty',
  title: 'Калькулятор обмена валют',
  description: 'Расчёт обмена валюты с учётом курса, комиссии и спреда',
  category: 'finansy',
  subcategory: 'currency',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма',
      type: 'number',
      placeholder: '1000',
      min: 0,
      defaultValue: 1000
    },
    {
      name: 'exchangeRate',
      label: 'Курс обмена',
      type: 'number',
      placeholder: '92.5',
      min: 0.001,
      step: 0.001,
      defaultValue: 92.5
    },
    {
      name: 'commission',
      label: 'Комиссия (%)',
      type: 'number',
      placeholder: '2',
      min: 0,
      max: 50,
      defaultValue: 2
    },
    {
      name: 'spread',
      label: 'Спред (%)',
      type: 'number',
      placeholder: '1',
      min: 0,
      max: 20,
      defaultValue: 1
    }
  ],
  outputs: [
    { name: 'baseAmount', label: 'Сумма без комиссий', type: 'number', unit: '₽' },
    { name: 'commissionAmount', label: 'Комиссия', type: 'number', unit: '₽' },
    { name: 'spreadLoss', label: 'Потери на спреде', type: 'number', unit: '₽' },
    { name: 'finalAmount', label: 'Итоговая сумма', type: 'number', unit: '₽' },
    { name: 'effectiveRate', label: 'Эффективный курс', type: 'number', unit: '' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const exchangeRate = Number(inputs.exchangeRate);
    const commission = Number(inputs.commission);
    const spread = Number(inputs.spread);
    
    if (!amount || !exchangeRate) {
      return [
        { value: '—', label: 'Сумма без комиссий', unit: '₽' },
        { value: '—', label: 'Комиссия', unit: '₽' },
        { value: '—', label: 'Потери на спреде', unit: '₽' },
        { value: '—', label: 'Итоговая сумма', unit: '₽' },
        { value: '—', label: 'Эффективный курс' }
      ];
    }
    
    const baseAmount = amount * exchangeRate;
    const commissionAmount = baseAmount * (commission / 100);
    const spreadFactor = 1 - (spread / 100);
    const spreadLoss = baseAmount * (spread / 100);
    const finalAmount = (baseAmount - commissionAmount) * spreadFactor;
    const effectiveRate = finalAmount / amount;
    
    return [
      { value: Math.round(baseAmount), label: 'Сумма без комиссий', unit: '₽' },
      { value: Math.round(commissionAmount), label: 'Комиссия', unit: '₽' },
      { value: Math.round(spreadLoss), label: 'Потери на спреде', unit: '₽' },
      { value: Math.round(finalAmount), label: 'Итоговая сумма', unit: '₽' },
      { value: Number(effectiveRate.toFixed(3)), label: 'Эффективный курс' }
    ];
  },
  content: {
    howTo: 'Введите сумму валюты, курс обмена, комиссию и спред. Калькулятор покажет итоговую сумму с учётом всех затрат.',
    about: 'Спред — разница между курсами покупки и продажи валюты. Комиссия — дополнительный сбор пункта обмена. Эффективный курс всегда хуже официального.',
    formula: 'Базовая сумма = Сумма × Курс\nКомиссия = Базовая × (Комиссия% / 100)\nСпред = Базовая × (Спред% / 100)\nИтог = (Базовая - Комиссия) × (1 - Спред%)',
    faq: [
      { question: 'Что такое спред?', answer: 'Разница между ценой покупки и продажи. Банки покупают валюту дешевле, продают дороже — разница и есть их прибыль.' },
      { question: 'Где выгоднее менять валюту?', answer: 'Обычно в банках или на бирже. Обменные пункты в аэропортах и отелях дают худший курс.' }
    ],
    sources: [
      { title: 'CBR - Exchange Rates', url: 'https://www.cbr.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор горного давления
export const altitudePressureCalculator: Calculator = {
  id: 'altitude-pressure',
  slug: 'davlenie-v-gorah',
  title: 'Калькулятор давления в горах',
  description: 'Расчёт атмосферного давления, температуры кипения и содержания кислорода на высоте',
  category: 'puteshestviya',
  subcategory: 'mountain',
  type: 'formula',
  inputs: [
    {
      name: 'altitude',
      label: 'Высота над уровнем моря (м)',
      type: 'number',
      placeholder: '2500',
      min: 0,
      max: 9000,
      defaultValue: 2500
    },
    {
      name: 'temperature',
      label: 'Температура у земли (°C)',
      type: 'number',
      placeholder: '20',
      min: -50,
      max: 50,
      defaultValue: 20
    }
  ],
  outputs: [
    { name: 'pressure', label: 'Атмосферное давление', type: 'number', unit: 'мм рт.ст.' },
    { name: 'pressurePercent', label: 'От нормального', type: 'number', unit: '%' },
    { name: 'boilingPoint', label: 'Температура кипения воды', type: 'number', unit: '°C' },
    { name: 'oxygenPercent', label: 'Содержание кислорода', type: 'number', unit: '%' },
    { name: 'altitudeTemp', label: 'Температура на высоте', type: 'number', unit: '°C' },
    { name: 'recommendation', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
    const altitude = Number(inputs.altitude);
    const temperature = Number(inputs.temperature);
    
    if (!altitude && altitude !== 0) {
      return [
        { value: '—', label: 'Атмосферное давление', unit: 'мм рт.ст.' },
        { value: '—', label: 'От нормального', unit: '%' },
        { value: '—', label: 'Температура кипения воды', unit: '°C' },
        { value: '—', label: 'Содержание кислорода', unit: '%' },
        { value: '—', label: 'Температура на высоте', unit: '°C' },
        { value: '—', label: 'Рекомендации' }
      ];
    }
    
    // Barometric formula for pressure
    const seaLevelPressure = 760; // mmHg
    const pressure = seaLevelPressure * Math.pow(1 - (0.0065 * altitude) / (temperature + 0.0065 * altitude + 273.15), 5.257);
    const pressurePercent = (pressure / seaLevelPressure) * 100;
    
    // Boiling point decreases with altitude
    const boilingPoint = 100 - (altitude / 300);
    
    // Oxygen content (partial pressure)
    const oxygenPercent = (pressure / seaLevelPressure) * 21;
    
    // Temperature decreases with altitude (lapse rate ~6.5°C per 1000m)
    const altitudeTemp = temperature - (altitude / 1000) * 6.5;
    
    let recommendation: string;
    if (altitude < 1500) {
      recommendation = 'Лёгкая высота. Акклиматизация не требуется.';
    } else if (altitude < 2500) {
      recommendation = 'Умеренная высота. Возможна лёгкая одышка при физической нагрузке.';
    } else if (altitude < 3500) {
      recommendation = 'Значительная высота. Рекомендуется постепенное восхождение для акклиматизации.';
    } else if (altitude < 5000) {
      recommendation = 'Высокая высота. Риск горной болезни. Обязательна акклиматизация.';
    } else {
      recommendation = 'Экстремальная высота. Требуется кислород и опыт альпинизма.';
    }
    
    return [
      { value: Math.round(pressure), label: 'Атмосферное давление', unit: 'мм рт.ст.' },
      { value: Math.round(pressurePercent), label: 'От нормального', unit: '%' },
      { value: Math.round(boilingPoint * 10) / 10, label: 'Температура кипения воды', unit: '°C' },
      { value: Math.round(oxygenPercent), label: 'Содержание кислорода', unit: '%' },
      { value: Math.round(altitudeTemp * 10) / 10, label: 'Температура на высоте', unit: '°C' },
      { value: recommendation, label: 'Рекомендации' }
    ];
  },
  content: {
    howTo: 'Введите высоту над уровнем моря и температуру у земли. Калькулятор рассчитает давление, температуру кипения воды и содержание кислорода.',
    about: 'С увеличением высоты давление и содержание кислорода падают. Вода закипает при более низкой температуре. Температура снижается примерно на 6.5°C на каждые 1000 м.',
    formula: 'Давление = P₀ × (1 - 0.0065×H/(T+0.0065×H+273.15))^5.257\nТ. кипения ≈ 100 - H/300',
    faq: [
      { question: 'Почему в горах вода кипит быстрее?', answer: 'Пониженное давление снижает температуру кипения. На Эвересте вода кипит при ~71°C — пища готовится медленнее.' },
      { question: 'Что такое горная болезнь?', answer: 'АльтITUDE sickness — реакция на нехватку кислорода. Головная боль, тошнота, усталость. Начинается обычно выше 2500 м.' }
    ],
    sources: [
      { title: 'NOAA - Altitude Pressure', url: 'https://www.noaa.gov/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор стоимости поездки
export const tripCostCalculator: Calculator = {
  id: 'trip-cost',
  slug: 'stoimost-poezdki',
  title: 'Калькулятор стоимости поездки',
  description: 'Расчёт общей стоимости путешествия: перелёт, отель, еда, развлечения',
  category: 'finansy',
  subcategory: 'travel',
  type: 'formula',
  inputs: [
    {
      name: 'flight',
      label: 'Перелёт (туда и обратно)',
      type: 'number',
      placeholder: '50000',
      min: 0,
      defaultValue: 50000
    },
    {
      name: 'hotel',
      label: 'Отель за ночь',
      type: 'number',
      placeholder: '5000',
      min: 0,
      defaultValue: 5000
    },
    {
      name: 'nights',
      label: 'Количество ночей',
      type: 'number',
      placeholder: '7',
      min: 1,
      defaultValue: 7
    },
    {
      name: 'foodPerDay',
      label: 'Еда в день',
      type: 'number',
      placeholder: '2000',
      min: 0,
      defaultValue: 2000
    },
    {
      name: 'activities',
      label: 'Экскурсии и развлечения',
      type: 'number',
      placeholder: '15000',
      min: 0,
      defaultValue: 15000
    }
  ],
  outputs: [
    { name: 'totalHotel', label: 'Отель всего', type: 'number', unit: '₽' },
    { name: 'totalFood', label: 'Еда всего', type: 'number', unit: '₽' },
    { name: 'subtotal', label: 'Подытог', type: 'number', unit: '₽' },
    { name: 'emergency', label: 'Резерв (10%)', type: 'number', unit: '₽' },
    { name: 'total', label: 'ИТОГО', type: 'number', unit: '₽' },
    { name: 'perDay', label: 'В день на человека', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const flight = Number(inputs.flight) || 0;
    const hotel = Number(inputs.hotel) || 0;
    const nights = Number(inputs.nights) || 1;
    const foodPerDay = Number(inputs.foodPerDay) || 0;
    const activities = Number(inputs.activities) || 0;
    
    const totalHotel = hotel * nights;
    const totalFood = foodPerDay * nights;
    const subtotal = flight + totalHotel + totalFood + activities;
    const emergency = subtotal * 0.1;
    const total = subtotal + emergency;
    const perDay = total / nights;
    
    return [
      { value: totalHotel, label: 'Отель всего', unit: '₽' },
      { value: totalFood, label: 'Еда всего', unit: '₽' },
      { value: subtotal, label: 'Подытог', unit: '₽' },
      { value: Math.round(emergency), label: 'Резерв (10%)', unit: '₽' },
      { value: Math.round(total), label: 'ИТОГО', unit: '₽' },
      { value: Math.round(perDay), label: 'В день на человека', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите стоимость перелёта, отеля за ночь, количество ночей, расходы на еду в день и экскурсии. Калькулятор рассчитает общую стоимость с резервом.',
    about: 'Планирование бюджета путешествия помогает избежать неожиданных расходов. Всегда закладывайте 10-15% резерв на непредвиденные ситуации.',
    formula: 'Итого = Перелёт + (Отель × Ночи) + (Еда × Дни) + Экскурсии + 10% резерв',
    faq: [
      { question: 'Сколько денег брать в поездку?', answer: 'Зависит от страны. Европа/США: $100-200/день. Азия: $30-50/день. Всегда берите запас + кредитную карту.' },
      { question: 'Что включать в резерв?', answer: 'Медицинская помощь, потеря багажа, экстренный перелёт домой, внезапное удорожание.' }
    ],
    sources: [
      { title: 'TripAdvisor - Budget Travel', url: 'https://www.tripadvisor.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор топлива для поездки
export const fuelTripCalculator: Calculator = {
  id: 'fuel-trip',
  slug: 'toplivo-dlya-poezdki',
  title: 'Калькулятор топлива для поездки',
  description: 'Расчёт расхода топлива и стоимости для автопутешествия',
  category: 'transport',
  subcategory: 'travel',
  type: 'formula',
  inputs: [
    {
      name: 'distance',
      label: 'Расстояние (км)',
      type: 'number',
      placeholder: '500',
      min: 1,
      defaultValue: 500
    },
    {
      name: 'consumption',
      label: 'Расход на 100 км (л)',
      type: 'number',
      placeholder: '8',
      min: 1,
      max: 50,
      step: 0.1,
      defaultValue: 8
    },
    {
      name: 'fuelPrice',
      label: 'Цена топлива за литр (₽)',
      type: 'number',
      placeholder: '55',
      min: 1,
      max: 500,
      defaultValue: 55
    },
    {
      name: 'passengers',
      label: 'Количество пассажиров',
      type: 'number',
      placeholder: '2',
      min: 1,
      max: 50,
      defaultValue: 2
    }
  ],
  outputs: [
    { name: 'fuelNeeded', label: 'Топлива понадобится', type: 'number', unit: 'л' },
    { name: 'fuelCost', label: 'Стоимость топлива', type: 'number', unit: '₽' },
    { name: 'costPerPerson', label: 'На человека', type: 'number', unit: '₽' },
    { name: 'stops', label: 'Заправок (50л бак)', type: 'number', unit: 'раз' },
    { name: 'comparison', label: 'Сравнение с поездом', type: 'text' }
  ],
  calculate: (inputs) => {
    const distance = Number(inputs.distance);
    const consumption = Number(inputs.consumption);
    const fuelPrice = Number(inputs.fuelPrice);
    const passengers = Number(inputs.passengers);
    
    if (!distance || !consumption || !fuelPrice || !passengers) {
      return [
        { value: '—', label: 'Топлива понадобится', unit: 'л' },
        { value: '—', label: 'Стоимость топлива', unit: '₽' },
        { value: '—', label: 'На человека', unit: '₽' },
        { value: '—', label: 'Заправок (50л бак)', unit: 'раз' },
        { value: '—', label: 'Сравнение с поездом' }
      ];
    }
    
    const fuelNeeded = (distance / 100) * consumption;
    const fuelCost = fuelNeeded * fuelPrice;
    const costPerPerson = fuelCost / passengers;
    const stops = Math.ceil(fuelNeeded / 50);
    
    // Comparison with train (rough estimate: ~3-5 rub per km per person)
    const trainCostPerPerson = distance * 4; // rough average
    const comparison = fuelCost < trainCostPerPerson * passengers
      ? `Выгоднее поезда на ${Math.round(trainCostPerPerson * passengers - fuelCost)}₽`
      : `Дороже поезда на ${Math.round(fuelCost - trainCostPerPerson * passengers)}₽`;
    
    return [
      { value: Number(fuelNeeded.toFixed(1)), label: 'Топлива понадобится', unit: 'л' },
      { value: Math.round(fuelCost), label: 'Стоимость топлива', unit: '₽' },
      { value: Math.round(costPerPerson), label: 'На человека', unit: '₽' },
      { value: stops, label: 'Заправок (50л бак)', unit: 'раз' },
      { value: comparison, label: 'Сравнение с поездом' }
    ];
  },
  content: {
    howTo: 'Введите расстояние, расход топлива вашего авто, цену топлива и количество пассажиров. Калькулятор рассчитает стоимость поездки.',
    about: 'При планировании автопутешествия важно учитывать расход топлива, который зависит от скорости, загрузки и дорожных условий.',
    formula: 'Топливо = (Расстояние / 100) × Расход на 100 км\nСтоимость = Топливо × Цена за литр',
    faq: [
      { question: 'Как снизить расход топлива?', answer: 'Поддерживайте 90-100 км/ч (оптимум), проверяйте давление в шинах, не перегружайте авто.' },
      { question: 'Стоит ли ехать на авто или поезде?', answer: 'До 300 км обычно выгоднее авто. Дальше — зависит от количества людей и цен на билеты.' }
    ],
    sources: [
      { title: 'Fuel Economy Tips', url: 'https://www.fueleconomy.gov/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор пробок и времени в пути
export const travelTimeCalculator: Calculator = {
  id: 'travel-time',
  slug: 'vremya-v-puti',
  title: 'Калькулятор времени в пути',
  description: 'Расчёт времени поездки с учётом средней скорости, пробок и остановок',
  category: 'transport',
  subcategory: 'travel',
  type: 'formula',
  inputs: [
    {
      name: 'distance',
      label: 'Расстояние (км)',
      type: 'number',
      placeholder: '300',
      min: 1,
      defaultValue: 300
    },
    {
      name: 'avgSpeed',
      label: 'Средняя скорость (км/ч)',
      type: 'number',
      placeholder: '80',
      min: 10,
      max: 300,
      defaultValue: 80
    },
    {
      name: 'trafficDelay',
      label: 'Пробки и светофоры (%)',
      type: 'number',
      placeholder: '15',
      min: 0,
      max: 200,
      defaultValue: 15
    },
    {
      name: 'restStops',
      label: 'Остановки отдыха',
      type: 'number',
      placeholder: '1',
      min: 0,
      max: 20,
      defaultValue: 1
    }
  ],
  outputs: [
    { name: 'baseTime', label: 'Базовое время', type: 'text' },
    { name: 'trafficTime', label: 'Время в пробках', type: 'text' },
    { name: 'restTime', label: 'Время остановок', type: 'text' },
    { name: 'totalTime', label: 'Общее время', type: 'text' },
    { name: 'arrivalTime', label: 'Время прибытия', type: 'text' }
  ],
  calculate: (inputs) => {
    const distance = Number(inputs.distance);
    const avgSpeed = Number(inputs.avgSpeed);
    const trafficDelay = Number(inputs.trafficDelay);
    const restStops = Number(inputs.restStops);
    
    if (!distance || !avgSpeed) {
      return [
        { value: '—', label: 'Базовое время' },
        { value: '—', label: 'Время в пробках' },
        { value: '—', label: 'Время остановок' },
        { value: '—', label: 'Общее время' },
        { value: '—', label: 'Время прибытия' }
      ];
    }
    
    const baseMinutes = (distance / avgSpeed) * 60;
    const trafficMinutes = baseMinutes * (trafficDelay / 100);
    const restMinutes = restStops * 15; // Assume 15 min per stop
    const totalMinutes = baseMinutes + trafficMinutes + restMinutes;
    
    // Format time
    const formatTime = (minutes: number): string => {
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      if (hours > 0) {
        return `${hours} ч ${mins} мин`;
      }
      return `${mins} мин`;
    };
    
    const baseTime = formatTime(baseMinutes);
    const trafficTime = formatTime(trafficMinutes);
    const restTime = formatTime(restMinutes);
    const totalTime = formatTime(totalMinutes);
    
    // Calculate arrival time from now
    const now = new Date();
    const arrival = new Date(now.getTime() + totalMinutes * 60000);
    const arrivalTime = arrival.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    
    return [
      { value: baseTime, label: 'Базовое время' },
      { value: trafficTime, label: 'Время в пробках' },
      { value: restTime, label: 'Время остановок' },
      { value: totalTime, label: 'Общее время' },
      { value: arrivalTime, label: 'Время прибытия' }
    ];
  },
  content: {
    howTo: 'Введите расстояние, среднюю скорость, процент времени в пробках и количество остановок. Калькулятор рассчитает общее время в пути.',
    about: 'Реальное время в пути отличается от теоретического из-за пробок, светофоров, ограничений скорости и необходимости отдыха (рекомендуется каждые 2 часа).',
    formula: 'Базовое время = Расстояние / Скорость\nС учётом пробок = Базовое × (1 + Пробки%)\nОбщее = С пробками + Остановки',
    faq: [
      { question: 'Как часто нужно останавливаться?', answer: 'Каждые 2 часа или 200 км — для отдыха и разминки. Длинные поездки требуют больше остановок.' },
      { question: 'Почему средняя скорость ниже максимальной?', answer: 'Города, населённые пункты, пробки, ремонт дорог, погода снижают среднюю скорость.' }
    ],
    sources: [
      { title: 'Yandex Maps - Travel Time', url: 'https://yandex.ru/maps/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор расхода бензина
export const fuelEfficiencyCalculator: Calculator = {
  id: 'fuel-efficiency',
  slug: 'ekonomiya-topliva',
  title: 'Калькулятор экономии топлива',
  description: 'Сравнение расхода топлива при разной скорости и стиле вождения',
  category: 'transport',
  subcategory: 'travel',
  type: 'formula',
  inputs: [
    {
      name: 'distance',
      label: 'Расстояние (км)',
      type: 'number',
      placeholder: '1000',
      min: 1,
      defaultValue: 1000
    },
    {
      name: 'baseConsumption',
      label: 'Базовый расход на 100 км (л)',
      type: 'number',
      placeholder: '8',
      min: 3,
      max: 30,
      step: 0.1,
      defaultValue: 8
    },
    {
      name: 'drivingStyle',
      label: 'Стиль вождения',
      type: 'select',
      options: [
        { value: 'eco', label: 'Экономичный (90 км/ч)' },
        { value: 'normal', label: 'Нормальный (110 км/ч)' },
        { value: 'fast', label: 'Быстрый (130 км/ч)' },
        { value: 'aggressive', label: 'Агрессивный (130+)' }
      ],
      defaultValue: 'normal'
    },
    {
      name: 'fuelPrice',
      label: 'Цена топлива (₽/л)',
      type: 'number',
      placeholder: '55',
      min: 1,
      defaultValue: 55
    }
  ],
  outputs: [
    { name: 'actualConsumption', label: 'Реальный расход', type: 'number', unit: 'л/100км' },
    { name: 'totalFuel', label: 'Всего топлива', type: 'number', unit: 'л' },
    { name: 'fuelCost', label: 'Стоимость топлива', type: 'number', unit: '₽' },
    { name: 'savings', label: 'Экономия vs агрессивный', type: 'text' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs) => {
    const distance = Number(inputs.distance);
    const baseConsumption = Number(inputs.baseConsumption);
    const drivingStyle = String(inputs.drivingStyle);
    const fuelPrice = Number(inputs.fuelPrice);
    
    if (!distance || !baseConsumption || !fuelPrice) {
      return [
        { value: '—', label: 'Реальный расход', unit: 'л/100км' },
        { value: '—', label: 'Всего топлива', unit: 'л' },
        { value: '—', label: 'Стоимость топлива', unit: '₽' },
        { value: '—', label: 'Экономия vs агрессивный' },
        { value: '—', label: 'Советы' }
      ];
    }
    
    // Consumption multipliers based on driving style
    const multipliers: Record<string, number> = {
      'eco': 0.85,      // 15% less
      'normal': 1.0,    // Base
      'fast': 1.15,     // 15% more
      'aggressive': 1.35 // 35% more
    };
    
    const actualConsumption = baseConsumption * multipliers[drivingStyle];
    const totalFuel = (distance / 100) * actualConsumption;
    const fuelCost = totalFuel * fuelPrice;
    
    // Calculate savings vs aggressive
    const aggressiveConsumption = baseConsumption * 1.35;
    const aggressiveFuel = (distance / 100) * aggressiveConsumption;
    const savingsLiters = aggressiveFuel - totalFuel;
    const savingsMoney = savingsLiters * fuelPrice;
    
    const savingsText = `Экономия ${Math.round(savingsLiters)} л (${Math.round(savingsMoney)}₽) vs агрессивным стилем`;
    
    const tips: Record<string, string> = {
      'eco': 'Отличный выбор! Расход минимален. Скорость 90 км/ч — оптимум для большинства авто.',
      'normal': 'Сбалансированный подход. Можно снизить расход, едя медленнее.',
      'fast': 'Высокая скорость увеличивает расход из-за сопротивления воздуха.',
      'aggressive': 'Резкое ускорение и торможение существенно повышают расход. Рекомендуется плавное вождение.'
    };
    
    return [
      { value: Number(actualConsumption.toFixed(1)), label: 'Реальный расход', unit: 'л/100км' },
      { value: Number(totalFuel.toFixed(1)), label: 'Всего топлива', unit: 'л' },
      { value: Math.round(fuelCost), label: 'Стоимость топлива', unit: '₽' },
      { value: savingsText, label: 'Экономия vs агрессивный' },
      { value: tips[drivingStyle], label: 'Советы' }
    ];
  },
  content: {
    howTo: 'Введите расстояние, базовый расход вашего авто, стиль вождения и цену топлива. Калькулятор покажет реальный расход и экономию.',
    about: 'Расход топлива сильно зависит от скорости и стиля вождения. Оптимум — 80-100 км/ч. Каждые +10 км/ч свыше 100 увеличивают расход на ~10%.',
    formula: 'Реальный расход = Базовый × Коэффициент стиля\nКоэффициенты: эко 0.85, нормальный 1.0, быстрый 1.15, агрессивный 1.35',
    faq: [
      { question: 'Почему расход растёт на высокой скорости?', answer: 'Сопротивление воздуха растёт квадратично со скоростью. На 130 км/ч сопротивление в 2 раза больше, чем на 90 км/ч.' },
      { question: 'Как снизить расход топлива?', answer: 'Резкое ускорение требует больше энергии. Двигатель работает неэффективно на высоких оборотах. Соблюдайте скорость 80-100 км/ч, избегайте резких торможений.' }
    ],
    sources: [
      { title: 'Fuel Efficiency', url: 'https://www.fueleconomy.gov/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const travelConvertersCalculators: Calculator[] = [
  timezoneConverter,
  tipCalculator,
  luggageCalculator,
  currencyExchangeCalculator,
  altitudePressureCalculator,
  tripCostCalculator,
  fuelTripCalculator,
  travelTimeCalculator,
  fuelEfficiencyCalculator
];
