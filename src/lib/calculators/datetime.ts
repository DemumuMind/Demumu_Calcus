import { Calculator } from '../types';

// Калькулятор разницы между датами
export const dateDiffCalculator: Calculator = {
  id: 'date-diff-calculator',
  slug: 'raznica-mezhdu-datami',
  title: 'Разница между датами',
  description: 'Сколько дней, месяцев, лет между двумя датами',
  category: 'povsednevnoe',
  subcategory: 'everyday-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'date1',
      label: 'Первая дата',
      type: 'date',
      placeholder: '2024-01-01',
      defaultValue: '2024-01-01'
    },
    {
      name: 'date2',
      label: 'Вторая дата',
      type: 'date',
      placeholder: '2024-12-31',
      defaultValue: '2024-12-31'
    },
    {
      name: 'includeEnd',
      label: 'Включить последний день',
      type: 'select',
      options: [
        { value: 'yes', label: 'Да (+1 день)' },
        { value: 'no', label: 'Нет' }
      ],
      defaultValue: 'no'
    }
  ],
  outputs: [
    { name: 'days', label: 'Дней', type: 'number', unit: 'дн.' },
    { name: 'weeks', label: 'Недель', type: 'text' },
    { name: 'months', label: 'Месяцев', type: 'text' },
    { name: 'years', label: 'Лет', type: 'text' },
    { name: 'weekdays', label: 'Рабочих дней', type: 'text' }
  ],
  calculate: (inputs) => {
    const date1 = new Date(String(inputs.date1));
    const date2 = new Date(String(inputs.date2));
    const includeEnd = String(inputs.includeEnd) === 'yes';
    
    // Ensure date1 is earlier
    let start = date1;
    let end = date2;
    if (date1 > date2) {
      start = date2;
      end = date1;
    }
    
    const diffMs = end.getTime() - start.getTime();
    let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (includeEnd) {
      diffDays += 1;
    }
    
    const weeks = Math.floor(diffDays / 7);
    const daysRemainder = diffDays % 7;
    
    // Calculate years and months
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Working days (approximation: 5/7 of total)
    const workDays = Math.floor(diffDays * 5 / 7);
    
    return [
      { value: diffDays, label: 'Всего дней', unit: 'дн.' },
      { value: `${weeks} нед ${daysRemainder} дн`, label: 'Недель и дней' },
      { value: `${years} лет ${months} мес`, label: 'Полных месяцев/лет' },
      { value: (years + months / 12).toFixed(1), label: 'В годах (десятично)' },
      { value: `~${workDays}`, label: 'Рабочих дней (пн-пт)' }
    ];
  },
  content: {
    howTo: 'Введите две даты. Калькулятор покажет разницу в днях, неделях, месяцах и годах.',
    about: 'Разница между датами вычисляется в календарных днях. Рабочие дни — приблизительно, без учёта праздников.',
    usage: 'Используется для расчёта стажа, возраста, сроков договоров, планирования проектов.',
    formula: 'Разница = Дата2 − Дата1\n1 год = 365/366 дней\n1 месяц ≈ 30.44 дня',
    faq: [
      {
        question: 'Как считаются високосные годы?',
        answer: 'Калькулятор автоматически учитывает високосные годы через встроенный объект Date JavaScript.'
      },
      {
        question: 'Что означает "рабочие дни"?',
        answer: 'Приблизительный расчёт: 5 рабочих дней из 7. Без учёта праздников, выходных и переносов.'
      }
    ],
    sources: [
      { title: 'Дата — Википедия', url: 'https://ru.wikipedia.org/wiki/Дата' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор даты через N дней
export const dateAddCalculator: Calculator = {
  id: 'date-add-calculator',
  slug: 'data-cherez-n-dnej',
  title: 'Дата через N дней',
  description: 'Какая дата будет через указанное количество дней, месяцев, лет',
  category: 'povsednevnoe',
  subcategory: 'everyday-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'startDate',
      label: 'Начальная дата',
      type: 'date',
      placeholder: '2024-01-01',
      defaultValue: '2024-01-01'
    },
    {
      name: 'days',
      label: 'Дней',
      type: 'number',
      placeholder: '30',
      defaultValue: 30
    },
    {
      name: 'months',
      label: 'Месяцев',
      type: 'number',
      placeholder: '0',
      defaultValue: 0
    },
    {
      name: 'years',
      label: 'Лет',
      type: 'number',
      placeholder: '0',
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'result', label: 'Итоговая дата', type: 'text' },
    { name: 'weekday', label: 'День недели', type: 'text' },
    { name: 'dayOfYear', label: 'День года', type: 'text' }
  ],
  calculate: (inputs) => {
    const start = new Date(String(inputs.startDate));
    const days = Number(inputs.days);
    const months = Number(inputs.months);
    const years = Number(inputs.years);
    
    const result = new Date(start);
    result.setFullYear(result.getFullYear() + years);
    result.setMonth(result.getMonth() + months);
    result.setDate(result.getDate() + days);
    
    // Weekday names
    const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const weekday = weekdays[result.getDay()];
    
    // Day of year
    const startOfYear = new Date(result.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((result.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    const formatDate = (d: Date) => {
      return d.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    
    return [
      { value: formatDate(result), label: 'Итоговая дата' },
      { value: weekday, label: 'День недели' },
      { value: `${dayOfYear}-й день ${result.getFullYear()} года`, label: 'День года' }
    ];
  },
  content: {
    howTo: 'Введите начальную дату и количество дней, месяцев или лет. Калькулятор вычислит конечную дату.',
    about: 'Добавление временных интервалов к дате. Учитывает разное количество дней в месяцах и високосные годы.',
    usage: 'Используется для планирования сроков, расчёта дат доставки, сроков годности, дедлайнов.',
    formula: 'Конечная дата = Начальная дата + Дни + Месяцы + Годы',
    faq: [
      {
        question: 'Что если добавить 1 месяц к 31 января?',
        answer: 'JavaScript автоматически обработает переход: 31 января + 1 месяц = 28/29 февраля (или 30 февраля → 1-2 марта).'
      },
      {
        question: 'Как узнать дату доставки?',
        answer: 'Введите сегодняшнюю дату и срок доставки в днях. Калькулятор покажет дату и день недели.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор временных зон
export const timezoneCalculator: Calculator = {
  id: 'timezone-calculator',
  slug: 'chasovye-poyasa',
  title: 'Калькулятор временных зон',
  description: 'Конвертация времени между городами и часовыми поясами',
  category: 'povsednevnoe',
  subcategory: 'everyday-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'time',
      label: 'Время',
      type: 'text',
      placeholder: '14:00',
      defaultValue: '14:00'
    },
    {
      name: 'fromZone',
      label: 'Откуда',
      type: 'select',
      options: [
        { value: '0', label: 'UTC / Лондон / Дублин' },
        { value: '3', label: 'Москва / Санкт-Петербург' },
        { value: '5', label: 'Екатеринбург' },
        { value: '7', label: 'Новосибирск / Бангкок' },
        { value: '9', label: 'Владивосток / Токио' },
        { value: '-5', label: 'Нью-Йорк / Торонто' },
        { value: '-8', label: 'Лос-Анджелес / Ванкувер' },
        { value: '1', label: 'Берлин / Париж / Рим' },
        { value: '8', label: 'Пекин / Сингапур / Перт' },
        { value: '12', label: 'Веллингтон / Окленд' }
      ],
      defaultValue: '3'
    },
    {
      name: 'toZone',
      label: 'Куда',
      type: 'select',
      options: [
        { value: '0', label: 'UTC / Лондон / Дублин' },
        { value: '3', label: 'Москва / Санкт-Петербург' },
        { value: '5', label: 'Екатеринбург' },
        { value: '7', label: 'Новосибирск / Бангкок' },
        { value: '9', label: 'Владивосток / Токио' },
        { value: '-5', label: 'Нью-Йорк / Торонто' },
        { value: '-8', label: 'Лос-Анджелес / Ванкувер' },
        { value: '1', label: 'Берлин / Париж / Рим' },
        { value: '8', label: 'Пекин / Сингапур / Перт' },
        { value: '12', label: 'Веллингтон / Окленд' }
      ],
      defaultValue: '-5'
    }
  ],
  outputs: [
    { name: 'result', label: 'Время в пункте назначения', type: 'text' },
    { name: 'diff', label: 'Разница во времени', type: 'text' },
    { name: 'date', label: 'Дата', type: 'text' }
  ],
  calculate: (inputs) => {
    const time = String(inputs.time);
    const fromZone = Number(inputs.fromZone);
    const toZone = Number(inputs.toZone);
    
    // Parse time
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      return [
        { value: 'Ошибка в формате времени', label: 'Ошибка' },
        { value: '—', label: 'Разница' },
        { value: '—', label: 'Дата' }
      ];
    }
    
    // Calculate UTC
    const utcHours = hours - fromZone;
    
    // Calculate target
    let targetHours = utcHours + toZone;
    let dayOffset = 0;
    
    // Handle day wrap
    while (targetHours >= 24) {
      targetHours -= 24;
      dayOffset++;
    }
    while (targetHours < 0) {
      targetHours += 24;
      dayOffset--;
    }
    
    const diff = toZone - fromZone;
    let diffText = '';
    if (diff > 0) {
      diffText = `+${diff} часов (вперёд)`;
    } else if (diff < 0) {
      diffText = `${diff} часов (назад)`;
    } else {
      diffText = 'Нет разницы';
    }
    
    let dateText = 'Тот же день';
    if (dayOffset === 1) dateText = 'Завтра (+1 день)';
    if (dayOffset === -1) dateText = 'Вчера (−1 день)';
    if (dayOffset > 1) dateText = `+${dayOffset} дня`;
    if (dayOffset < -1) dateText = `${dayOffset} дней`;
    
    return [
      { value: `${String(targetHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`, label: 'Время в пункте назначения' },
      { value: diffText, label: 'Разница во времени' },
      { value: dateText, label: 'Изменение даты' }
    ];
  },
  content: {
    howTo: 'Введите время, выберите часовой пояс отправления и назначения. Калькулятор конвертирует время.',
    about: 'Временные зоны основаны на UTC (Coordinated Universal Time). Разница может составлять от −12 до +14 часов.',
    usage: 'Используется для планирования международных звонков, путешествий, работы с удалёнными командами.',
    formula: 'Время назначения = Время отправления + (UTC назначения − UTC отправления)',
    faq: [
      {
        question: 'Что такое UTC?',
        answer: 'Coordinated Universal Time — всемирное координированное время. Базовая точка отсчёта для всех часовых поясов.'
      },
      {
        question: 'Учитывается ли летнее время?',
        answer: 'Этот калькулятор использует фиксированные смещения без летнего времени. Для точного расчёта с DST используйте онлайн-сервисы с актуальными базами данных.'
      }
    ],
    sources: [
      { title: 'Часовой пояс — Википедия', url: 'https://ru.wikipedia.org/wiki/Часовой_пояс' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор рабочих дней
export const workdayCalculator: Calculator = {
  id: 'workday-calculator',
  slug: 'rabochie-dni',
  title: 'Калькулятор рабочих дней',
  description: 'Сколько рабочих дней между датами с учётом выходных',
  category: 'povsednevnoe',
  subcategory: 'everyday-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'startDate',
      label: 'Начальная дата',
      type: 'date',
      placeholder: '2024-01-01',
      defaultValue: '2024-01-01'
    },
    {
      name: 'endDate',
      label: 'Конечная дата',
      type: 'date',
      placeholder: '2024-01-31',
      defaultValue: '2024-01-31'
    }
  ],
  outputs: [
    { name: 'workdays', label: 'Рабочих дней', type: 'number', unit: 'дн.' },
    { name: 'weekends', label: 'Выходных', type: 'number', unit: 'дн.' },
    { name: 'total', label: 'Всего календарных дней', type: 'number', unit: 'дн.' },
    { name: 'weeks', label: 'Полных недель', type: 'number', unit: 'нед.' }
  ],
  calculate: (inputs) => {
    const start = new Date(String(inputs.startDate));
    const end = new Date(String(inputs.endDate));
    
    // Ensure start is earlier
    if (start > end) {
      const temp = start;
      start.setTime(end.getTime());
      end.setTime(temp.getTime());
    }
    
    let workdays = 0;
    let weekends = 0;
    let total = 0;
    
    const current = new Date(start);
    while (current <= end) {
      const day = current.getDay();
      if (day === 0 || day === 6) {
        weekends++;
      } else {
        workdays++;
      }
      total++;
      current.setDate(current.getDate() + 1);
    }
    
    const weeks = Math.floor(total / 7);
    
    return [
      { value: workdays, label: 'Рабочих дней (пн-пт)', unit: 'дн.' },
      { value: weekends, label: 'Выходных (сб-вс)', unit: 'дн.' },
      { value: total, label: 'Всего дней', unit: 'дн.' },
      { value: weeks, label: 'Полных недель', unit: 'нед.' }
    ];
  },
  content: {
    howTo: 'Введите начальную и конечную дату. Калькулятор посчитает рабочие и выходные дни (без праздников).',
    about: 'Рабочие дни — понедельник-пятница. Выходные — суббота и воскресенье. Праздники не учитываются.',
    usage: 'Используется для расчёта рабочего времени, сроков выполнения работ, планирования отпусков.',
    formula: '5 рабочих дней в неделю\nПример: 2 недели = 10 рабочих дней',
    faq: [
      {
        question: 'Учитываются ли праздники?',
        answer: 'Нет, базовый калькулятор считает только субботы и воскресенья. Праздники различаются по странам и годам.'
      },
      {
        question: 'Как посчитать рабочие часы?',
        answer: 'Рабочих дней × 8 часов (стандартный день). Например, 10 рабочих дней = 80 рабочих часов.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор знака зодиака
export const zodiacCalculator: Calculator = {
  id: 'zodiac-calculator',
  slug: 'znak-zodiaka',
  title: 'Калькулятор знака зодиака',
  description: 'Определение знака зодиака по дате рождения',
  category: 'povsednevnoe',
  subcategory: 'everyday-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'day',
      label: 'День',
      type: 'number',
      placeholder: '15',
      defaultValue: 15,
      min: 1,
      max: 31
    },
    {
      name: 'month',
      label: 'Месяц',
      type: 'select',
      options: [
        { value: '1', label: 'Январь' },
        { value: '2', label: 'Февраль' },
        { value: '3', label: 'Март' },
        { value: '4', label: 'Апрель' },
        { value: '5', label: 'Май' },
        { value: '6', label: 'Июнь' },
        { value: '7', label: 'Июль' },
        { value: '8', label: 'Август' },
        { value: '9', label: 'Сентябрь' },
        { value: '10', label: 'Октябрь' },
        { value: '11', label: 'Ноябрь' },
        { value: '12', label: 'Декабрь' }
      ],
      defaultValue: '3'
    }
  ],
  outputs: [
    { name: 'zodiac', label: 'Знак зодиака', type: 'text' },
    { name: 'element', label: 'Стихия', type: 'text' },
    { name: 'dates', label: 'Период', type: 'text' }
  ],
  calculate: (inputs) => {
    const day = Number(inputs.day);
    const month = Number(inputs.month);
    
    // Zodiac signs with their start dates (month, day)
    const signs = [
      { name: 'Козерог', element: 'Земля', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
      { name: 'Водолей', element: 'Воздух', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
      { name: 'Рыбы', element: 'Вода', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
      { name: 'Овен', element: 'Огонь', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
      { name: 'Телец', element: 'Земля', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
      { name: 'Близнецы', element: 'Воздух', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
      { name: 'Рак', element: 'Вода', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
      { name: 'Лев', element: 'Огонь', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
      { name: 'Дева', element: 'Земля', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
      { name: 'Весы', element: 'Воздух', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
      { name: 'Скорпион', element: 'Вода', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
      { name: 'Стрелец', element: 'Огонь', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 }
    ];
    
    let sign = signs.find(s => {
      if (s.startMonth === month && day >= s.startDay) return true;
      if (s.endMonth === month && day <= s.endDay) return true;
      // Handle Capricorn (crosses year boundary)
      if (s.name === 'Козерог') {
        if (month === 12 && day >= 22) return true;
        if (month === 1 && day <= 19) return true;
      }
      return false;
    });
    
    if (!sign) sign = signs[0]; // Default to Capricorn
    
    return [
      { value: sign.name, label: 'Знак зодиака' },
      { value: sign.element, label: 'Стихия' },
      { value: `${sign.startDay}.${sign.startMonth} — ${sign.endDay}.${sign.endMonth}`, label: 'Период' }
    ];
  },
  content: {
    howTo: 'Введите день и месяц рождения. Калькулятор определит знак зодиака.',
    about: 'Зодиак — пояс на небесной сфере, разделённый на 12 частей. Знаки связаны с положением Солнца в момент рождения (астрология).',
    usage: 'Используется для развлечения, астрологии, определения совместимости (для интереса).',
    formula: '12 знаков, примерно по месяцу каждый\nСтихии: Огонь, Земля, Воздух, Вода (по 3 знака)',
    faq: [
      {
        question: 'Научно ли это?',
        answer: 'Астрология не является наукой. Это древняя система предсказаний, не подтверждённая современной наукой.'
      },
      {
        question: 'В чём разница между знаком и созвездием?',
        answer: 'Знак зодиака — 30° сектор небесной сферы. Созвездие — группа звёзд. Из-за прецессии они смещены примерно на месяц.'
      }
    ],
    sources: [
      { title: 'Зодиак — Википедия', url: 'https://ru.wikipedia.org/wiki/Зодиак' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор возраста (точный)
export const ageCalculator: Calculator = {
  id: 'age-calculator',
  slug: 'vozrast-tochnyj',
  title: 'Калькулятор возраста',
  description: 'Точный возраст в годах, месяцах и днях',
  category: 'povsednevnoe',
  subcategory: 'everyday-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'birthDate',
      label: 'Дата рождения',
      type: 'date',
      placeholder: '1990-01-01',
      defaultValue: '1990-01-01'
    },
    {
      name: 'targetDate',
      label: 'На дату (пусто = сегодня)',
      type: 'date',
      placeholder: '',
      defaultValue: ''
    }
  ],
  outputs: [
    { name: 'years', label: 'Полных лет', type: 'number', unit: 'лет' },
    { name: 'months', label: 'Месяцев', type: 'number', unit: 'мес.' },
    { name: 'days', label: 'Дней', type: 'number', unit: 'дн.' },
    { name: 'totalDays', label: 'Всего прожито дней', type: 'text' },
    { name: 'nextBirthday', label: 'До следующего дня рождения', type: 'text' }
  ],
  calculate: (inputs) => {
    const birth = new Date(String(inputs.birthDate));
    const target = inputs.targetDate ? new Date(String(inputs.targetDate)) : new Date();
    
    if (birth > target) {
      return [
        { value: 'Ошибка', label: 'Дата рождения в будущем' },
        { value: 0, label: '—' },
        { value: 0, label: '—' },
        { value: '—', label: '—' },
        { value: '—', label: '—' }
      ];
    }
    
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Total days
    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Next birthday
    const nextBirthday = new Date(birth);
    nextBirthday.setFullYear(target.getFullYear());
    if (nextBirthday < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysToBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    
    return [
      { value: years, label: 'Полных лет', unit: 'лет' },
      { value: months, label: 'Месяцев', unit: 'мес.' },
      { value: days, label: 'Дней', unit: 'дн.' },
      { value: totalDays.toLocaleString(), label: 'Всего дней' },
      { value: `${daysToBirthday} дней`, label: 'До дня рождения' }
    ];
  },
  content: {
    howTo: 'Введите дату рождения и целевую дату (или оставьте пустым для сегодня).',
    about: 'Точный возраст с учётом месяцев и дней. Используется для официальных документов, юридических целей.',
    usage: 'Используется для определения точного возраста, планирования событий, юридических расчётов.',
    formula: 'Возраст = Текущая дата − Дата рождения\nС учётом: лет, месяцев, дней',
    faq: [
      {
        question: 'Как считается полный год?',
        answer: 'Полный год заканчивается в день рождения каждого года. До этого дня — на год меньше.'
      },
      {
        question: 'Високосные годы учитываются?',
        answer: 'Да, при расчёте общего количества дней високосные годы учитываются автоматически.'
      }
    ],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

export const datetimeCalculators = [
  dateDiffCalculator,
  dateAddCalculator,
  timezoneCalculator,
  workdayCalculator,
  zodiacCalculator,
  ageCalculator,
];
