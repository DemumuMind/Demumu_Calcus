import { Calculator } from '../types';

// Калькулятор времени варки (справочник)
export const cookingTimeCalculator: Calculator = {
  id: 'cooking-time-reference',
  slug: 'vremya-varki',
  title: 'Время варки продуктов',
  description: 'Справочная таблица времени варки яиц, макарон, круп, картофеля и риса',
  category: 'povsednevnoe',
  subcategory: 'eda-i-napitki',
  type: 'reference',
  inputs: [
    {
      name: 'product',
      label: 'Продукт',
      type: 'select',
      options: [
        { value: 'egg-soft', label: 'Яйцо всмятку (мягкий желток)' },
        { value: 'egg-medium', label: 'Яйцо в мешочек (густой желток)' },
        { value: 'egg-hard', label: 'Яйцо вкрутую (твёрдый желток)' },
        { value: 'spaghetti', label: 'Спагетти' },
        { value: 'potatoes-whole', label: 'Картофель в мундире (целиком)' },
        { value: 'potatoes-cubes', label: 'Картофель кубиками' },
        { value: 'rice-white', label: 'Белый рис' },
        { value: 'rice-brown', label: 'Бурый рис' },
        { value: 'buckwheat', label: 'Гречка' },
        { value: 'pasta-short', label: 'Макароны (рожки/спиральки)' }
      ],
      defaultValue: 'egg-soft'
    }
  ],
  outputs: [
    { name: 'cookingTime', label: 'Время варки', type: 'text' },
    { name: 'waterAmount', label: 'Вода на 100 г', type: 'text' },
    { name: 'salt', label: 'Соль на 1 л воды', type: 'text' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs) => {
    const product = String(inputs.product);

    const data: Record<string, { time: string; water: string; salt: string; tips: string }> = {
      'egg-soft': { time: '4–5 мин (закипятить воду → опустить яйца)', water: 'Покрыть на 2 см', salt: '1 ч.л.', tips: 'Яйца из холодильника варить на 1 минуту дольше. Сразу охладить ледяной водой, чтобы остановить приготовление.' },
      'egg-medium': { time: '6–7 мин', water: 'Покрыть на 2 см', salt: '1 ч.л.', tips: 'Желток густой кремообразный. Идеально для салатов и ланч-боксов.' },
      'egg-hard': { time: '9–10 мин', water: 'Покрыть на 2 см', salt: '1 ч.л.', tips: 'Переваренные яйца получают серый ободок вокруг желтка. Для паштета и нарезки — оптимально.' },
      'spaghetti': { time: '8–10 мин (по упаковке al dente −1 мин)', water: '1 л на 100 г', salt: '10 г (1 ст.л.)', tips: 'Варить в большом количестве воды. Не промывать — крахмал помогает соусу прилипать. Сохранить 1 стакан воды от макарон.' },
      'potatoes-whole': { time: '20–30 мин (зависит от размера)', water: 'Покрыть на 3 см', salt: '1 ч.л.', tips: 'Начинать с холодной воды — так картофель варится равномерно. Проверить ножом: должен входить легко.' },
      'potatoes-cubes': { time: '10–15 мин (кубики 2 см)', water: 'Покрыть на 3 см', salt: '1 ч.л.', tips: 'Кипятить воду, затем опустить кубики — так сохраняется больше витаминов.' },
      'rice-white': { time: '15–18 мин (парить под крышкой 5 мин)', water: '1,5 части воды на 1 часть риса', salt: '0,5 ч.л. на 1 ст. риса', tips: 'Промыть до прозрачной воды. Не мешать во время варки. Дать постоять под крышкой 10 мин после выключения.' },
      'rice-brown': { time: '35–45 мин', water: '2,5 части воды на 1 часть риса', salt: '0,5 ч.л. на 1 ст. риса', tips: 'Предварительно замочить на 30 мин для мягкости. Варить на медленном огне.' },
      'buckwheat': { time: '15–20 мин (парить под крышкой 5 мин)', water: '2 части воды на 1 часть гречки', salt: '0,5 ч.л. на 1 ст. гречки', tips: 'Не промывать, если варите в пакетиках. Для рассыпчатости — не мешать и дать постоять 5–10 мин.' },
      'pasta-short': { time: '7–9 мин (по упаковке)', water: '1 л на 100 г', salt: '10 г (1 ст.л.)', tips: 'Следить за временем на упаковке. Al dente — с лёгкой твёрдостью в центре. Не разваривайте!' }
    };

    const item = data[product];
    if (!item) {
      return [
        { value: '—', label: 'Время варки' },
        { value: '—', label: 'Вода на 100 г' },
        { value: '—', label: 'Соль на 1 л воды' },
        { value: '—', label: 'Советы' }
      ];
    }

    return [
      { value: item.time, label: 'Время варки' },
      { value: item.water, label: 'Вода на 100 г' },
      { value: item.salt, label: 'Соль на 1 л воды' },
      { value: item.tips, label: 'Советы' }
    ];
  },
  content: {
    howTo: 'Выберите продукт из списка. Калькулятор покажет оптимальное время варки, количество воды, соли и полезные советы.',
    about: 'Точное время варки зависит от размера продукта, начальной температуры, высоты над уровнем моря и желаемой готовности. Эта таблица дана для стандартных условий (город на высоте до 300 м).',
    usage: 'Используется при готовке на кухне, планировании меню, обучении детей готовке.',
    faq: [
      {
        question: 'Почему яйца трескаются при варке?',
        answer: 'Слишком быстрое нагревание или яйца из холодильника в кипяток. Закипятите воду, убавьте огонь, осторожно опустите яйца ложкой. Или начните с холодной воды.'
      },
      {
        question: 'Сколько соли нужно для макарон?',
        answer: 'Стандарт: 10 г соли (1 столовая ложка без горки) на 1 литр воды. Макароны в несолёной воде пресные и клейкие.'
      },
      {
        question: 'Почему рис получается клейким?',
        answer: 'Возможно, мало воды, много мешали или не промыли. Промойте до прозрачной воды, используйте пропорцию 1:1,5, не мешайте во время варки.'
      },
      {
        question: 'Как варить на высоте (горы)?',
        answer: 'Точка кипения воды падает с высотой: 95°C на 1500 м, 90°C на 3000 м. Увеличьте время варки на 20-50%.'
      }
    ],
    sources: [
      { title: 'Время варки яиц — Serious Eats', url: 'https://www.seriouseats.com/' },
      { title: 'Рис — Википедия', url: 'https://ru.wikipedia.org/wiki/Рис' }
    ],
    updatedAt: '2026-04-26'
  }
};

// Калькулятор чаевых
export const tipCalculator: Calculator = {
  id: 'tip-simple-calculator',
  slug: 'kalkulyator-chaevyh',
  title: 'Калькулятор чаевых',
  description: 'Расчёт чаевых и разделение счёта на несколько человек',
  category: 'povsednevnoe',
  subcategory: 'eda-i-napitki',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма счёта',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      min: 0
    },
    {
      name: 'tipPercent',
      label: 'Процент чаевых',
      type: 'select',
      options: [
        { value: '5', label: '5% — минимум' },
        { value: '10', label: '10% — стандарт' },
        { value: '15', label: '15% — хорошо' },
        { value: '20', label: '20% — отлично' }
      ],
      defaultValue: '10'
    },
    {
      name: 'people',
      label: 'Количество человек',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 1
    }
  ],
  outputs: [
    { name: 'tipAmount', label: 'Сумма чаевых', type: 'number', unit: '₽' },
    { name: 'totalAmount', label: 'Итого с чаевыми', type: 'number', unit: '₽' },
    { name: 'perPerson', label: 'С каждого', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const tipPercent = Number(inputs.tipPercent);
    const people = Number(inputs.people);
    
    if (!amount || !people) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const tipAmount = amount * (tipPercent / 100);
    const totalAmount = amount + tipAmount;
    const perPerson = totalAmount / people;
    
    return [
      { value: tipAmount.toFixed(2), label: 'Сумма чаевых', unit: '₽' },
      { value: totalAmount.toFixed(2), label: 'Итого с чаевыми', unit: '₽' },
      { value: perPerson.toFixed(2), label: 'С каждого', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите сумму счёта, процент чаевых и количество человек. Калькулятор рассчитает чаевые и долю каждого.',
    about: 'Калькулятор чаевых помогает рассчитать размер чаевых и разделить общий счёт между несколькими людьми.',
    usage: 'Используется в ресторанах, кафе, такси, отелях для расчёта чаевых.',
    formula: 'Чаевые = сумма × процент / 100\nИтого = сумма + чаевые\nС каждого = итого / количество человек',
    faq: [
      {
        question: 'Какой процент чаевых норма?',
        answer: 'В России: 10-15%, в США: 15-20%, в Европе: 5-10% или округление вверх. Иногда включены в счёт (service charge).'
      },
      {
        question: 'Нужно ли оставлять чаевые?',
        answer: 'В России — по желанию. В США — практически обязательно, так как это основная часть зарплаты персонала.'
      }
    ],
    sources: [
      { title: 'Чаевые — Википедия', url: 'https://ru.wikipedia.org/wiki/Чаевые' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор сна
export const sleepCalculator: Calculator = {
  id: 'sleep-simple-calculator',
  slug: 'kalkulyator-sna',
  title: 'Калькулятор сна',
  description: 'Оптимальное время пробуждения и засыпания по циклам',
  category: 'zdorove-i-krasota',
  subcategory: 'zdorove',
  type: 'formula',
  inputs: [
    {
      name: 'bedTime',
      label: 'Время отхода ко сну',
      type: 'text',
      placeholder: '23:00',
      defaultValue: '23:00'
    },
    {
      name: 'fallAsleepTime',
      label: 'Время засыпания (минут)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15,
      min: 0,
      max: 60
    }
  ],
  outputs: [
    { name: 'wakeTime1', label: 'После 4 циклов', type: 'text' },
    { name: 'wakeTime2', label: 'После 5 циклов', type: 'text' },
    { name: 'wakeTime3', label: 'После 6 циклов', type: 'text' }
  ],
  calculate: (inputs) => {
    const bedTimeStr = String(inputs.bedTime);
    const fallAsleepTime = Number(inputs.fallAsleepTime);
    
    const [hours, minutes] = bedTimeStr.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      return [{ value: 'Неверный формат времени', label: 'Ошибка' }];
    }
    
    // One sleep cycle is approximately 90 minutes
    const cycleLength = 90;
    const bedDate = new Date();
    bedDate.setHours(hours, minutes + fallAsleepTime, 0, 0);
    
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };
    
    const wake1 = new Date(bedDate.getTime() + 4 * cycleLength * 60000);
    const wake2 = new Date(bedDate.getTime() + 5 * cycleLength * 60000);
    const wake3 = new Date(bedDate.getTime() + 6 * cycleLength * 60000);
    
    return [
      { value: formatTime(wake1), label: 'После 4 циклов (6 ч)', unit: '' },
      { value: formatTime(wake2), label: 'После 5 циклов (7.5 ч)', unit: '' },
      { value: formatTime(wake3), label: 'После 6 циклов (9 ч)', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите время отхода ко сну и время, за которое вы обычно засыпаете. Калькулятор покажет оптимальное время пробуждения.',
    about: 'Калькулятор сна основан на циклах сна по 90 минут. Пробуждение в конце цикла помогает чувствовать себя отдохнувшим.',
    usage: 'Используется для планирования оптимального времени пробуждения и повышения качества сна.',
    formula: 'Время пробуждения = время засыпания + (N × 90 минут)\nРекомендуется 4-6 циклов (6-9 часов)',
    faq: [
      {
        question: 'Что такое цикл сна?',
        answer: 'Цикл сна длится около 90 минут и включает фазы: засыпание, лёгкий сон, глубокий сон, БДС (фаза быстрого движения глаз).'
      },
      {
        question: 'Почему важно просыпаться в конце цикла?',
        answer: 'Пробуждение из глубокого сна вызывает сонливость. Проснувшись в лёгкой фазе, вы чувствуете себя бодрее.'
      }
    ],
    sources: [
      { title: 'Сон — Википедия', url: 'https://ru.wikipedia.org/wiki/Сон' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор календаря (номер недели, день года)
export const calendarCalculator: Calculator = {
  id: 'calendar-calculator',
  slug: 'nomer-dnya-i-nedeli',
  title: 'Номер дня и недели',
  description: 'Какой сегодня номер дня в году, номер недели ISO',
  category: 'povsednevnoe',
  subcategory: 'data-i-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'date',
      label: 'Дата',
      type: 'text',
      placeholder: '2026-04-07',
      defaultValue: '2026-04-07'
    }
  ],
  outputs: [
    { name: 'dayOfYear', label: 'День года', type: 'number', unit: 'день' },
    { name: 'weekNumber', label: 'Номер недели ISO', type: 'number', unit: 'неделя' },
    { name: 'dayOfWeek', label: 'День недели', type: 'text' },
    { name: 'daysLeft', label: 'Дней до конца года', type: 'number', unit: 'дн' }
  ],
  calculate: (inputs) => {
    const dateStr = String(inputs.date);
    const date = new Date(dateStr);
    
    if (isNaN(date.getTime())) {
      return [{ value: 'Неверный формат даты', label: 'Ошибка' }];
    }
    
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // ISO week number
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    
    const endOfYear = new Date(date.getFullYear(), 11, 31);
    const daysLeft = Math.floor((endOfYear.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    return [
      { value: dayOfYear.toString(), label: 'День года', unit: 'день' },
      { value: weekNumber.toString(), label: 'Номер недели ISO', unit: 'неделя' },
      { value: dayOfWeek, label: 'День недели', unit: '' },
      { value: daysLeft.toString(), label: 'Дней до конца года', unit: 'дн' }
    ];
  },
  content: {
    howTo: 'Введите дату. Калькулятор покажет номер дня в году, номер недели по стандарту ISO, день недели.',
    about: 'Калькулятор определяет календарные значения: номер дня в году (1-365/366), номер недели ISO (1-52/53).',
    usage: 'Используется для планирования, отчётности, статистики, определения дат по номерам.',
    formula: 'ISO номер недели: первая неделя — та, что содержит первый четверг года.',
    faq: [
      {
        question: 'Что такое номер недели ISO?',
        answer: 'Международный стандарт (ISO 8601): неделя начинается с понедельника, первая неделя содержит первый четверг года.'
      },
      {
        question: 'Сколько дней в високосном году?',
        answer: '366 дней. Високосный год делится на 4, но столетия — только если делятся на 400 (2000 — високосный, 1900 — нет).'
      }
    ],
    sources: [
      { title: 'ISO 8601 — Википедия', url: 'https://ru.wikipedia.org/wiki/ISO_8601' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор шашлыка
export const shashlikCalculator: Calculator = {
  id: 'shashlik-calculator',
  slug: 'kalkulyator-shashlyka',
  title: 'Калькулятор шашлыка',
  description: 'Расчёт количества мяса, овощей, маринада и шампуров на компанию',
  category: 'povsednevnoe',
  subcategory: 'eda-i-napitki',
  type: 'formula',
  inputs: [
    {
      name: 'people',
      label: 'Количество человек',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      min: 1,
      max: 100
    },
    {
      name: 'meatType',
      label: 'Мясо',
      type: 'select',
      options: [
        { value: 'pork', label: 'Свинина' },
        { value: 'chicken', label: 'Курица' },
        { value: 'beef', label: 'Говядина' },
        { value: 'lamb', label: 'Баранина' },
        { value: 'mixed', label: 'Ассорти (свинина + курица)' }
      ],
      defaultValue: 'pork'
    },
    {
      name: 'hunger',
      label: 'Уровень голода',
      type: 'select',
      options: [
        { value: 'light', label: 'Лёгкий перекус' },
        { value: 'normal', label: 'Обычный аппетит' },
        { value: 'hungry', label: 'Голодные' }
      ],
      defaultValue: 'normal'
    }
  ],
  outputs: [
    { name: 'meatKg', label: 'Мяса', type: 'number', unit: 'кг' },
    { name: 'vegetablesKg', label: 'Овощей/грибов', type: 'number', unit: 'кг' },
    { name: 'marinadeKg', label: 'Маринада', type: 'number', unit: 'кг' },
    { name: 'skewers', label: 'Шампуров', type: 'number' },
    { name: 'drinksLiters', label: 'Напитков', type: 'number', unit: 'л' }
  ],
  calculate: (inputs) => {
    const people = Number(inputs.people);
    const meatType = String(inputs.meatType);
    const hunger = String(inputs.hunger);

    if (!people) {
      return [
        { value: '—', label: 'Мяса' },
        { value: '—', label: 'Овощей/грибов' },
        { value: '—', label: 'Маринада' },
        { value: '—', label: 'Шампуров' },
        { value: '—', label: 'Напитков' }
      ];
    }

    const hungerMultiplier: Record<string, number> = {
      light: 0.3,
      normal: 0.45,
      hungry: 0.6
    };

    const multiplier = hungerMultiplier[hunger] || 0.45;
    let meatKg = people * multiplier;
    // Mixed: slightly more total meat (10% more as variety encourages eating more)
    if (meatType === 'mixed') {
      meatKg = meatKg * 1.1;
    }
    const vegetablesKg = people * 0.15;
    const marinadeKg = meatKg * 0.2;
    const skewers = Math.ceil(meatKg * 2.5); // ~400г на шампур
    const drinksLiters = people * 0.5; // ~0.5 л на человека

    let meatLabel = 'Мяса';
    if (meatType === 'mixed') {
      const half = meatKg / 2;
      meatLabel = `Мяса (свинина ${half.toFixed(2)} кг + курица ${half.toFixed(2)} кг)`;
    }

    return [
      { value: meatKg.toFixed(2), label: meatLabel, unit: 'кг' },
      { value: vegetablesKg.toFixed(2), label: 'Овощей/грибов', unit: 'кг' },
      { value: marinadeKg.toFixed(2), label: 'Маринада', unit: 'кг' },
      { value: skewers.toString(), label: 'Шампуров', unit: 'шт' },
      { value: drinksLiters.toFixed(2), label: 'Напитков', unit: 'л' }
    ];
  },
  content: {
    howTo: 'Введите количество человек, выберите тип мяса и уровень аппетита. Калькулятор рассчитает нужное количество продуктов.',
    about: 'Калькулятор шашлыка помогает рассчитать количество мяса, овощей, маринада и шампуров для компании на природе.',
    usage: 'Используется при планировании шашлыка на природе, пикнике или даче.',
    formula: 'Мясо = человек × коэффициент аппетита\nОвощи = человек × 0.15 кг\nМаринад = мясо × 20%\nШампуры = мясо × 2.5\nНапитки = человек × 0.5 л',
    faq: [
      {
        question: 'Как рассчитать порции на шашлык?',
        answer: 'Возьмите количество человек, выберите тип мяса и уровень аппетита. Лёгкий перекус — 300 г/чел, обычный — 450 г/чел, голодная компания — 600 г/чел. Добавьте 150 г овощей и 0.5 л напитков на каждого.'
      },
      {
        question: 'Сколько мяса на человека?',
        answer: 'Обычно 350–450 г мяса на человека. Для голодной компании — до 600 г.'
      },
      {
        question: 'Какие овощи лучше?',
        answer: 'Классика — лук, помидоры, огурцы, перец. Также можно добавить грибы и кабачки.'
      },
      {
        question: 'Что такое ассорти (свинина + курица)?',
        answer: 'Комбинация двух видов мяса. Калькулятор увеличивает общее количество на 10%, так как разнообразие стимулирует аппетит. Каждого вида поровну.'
      }
    ],
    sources: [
      { title: 'Шашлык — Википедия', url: 'https://ru.wikipedia.org/wiki/Шашлык' }
    ],
    updatedAt: '2026-04-26'
  }
};

// Подбросить монетку
export const coinFlipCalculator: Calculator = {
  id: 'coin-flip',
  slug: 'podbrosit-monetku',
  title: 'Подбросить монетку',
  description: 'Случайный выбор: орёл или решка',
  category: 'povsednevnoe',
  subcategory: 'razvlecheniya',
  type: 'tool',
  inputs: [
    {
      name: 'flips',
      label: 'Количество бросков',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 1,
      max: 100
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const flips = Math.min(Number(inputs.flips) || 1, 100);
    const results: string[] = [];
    for (let i = 0; i < flips; i++) {
      results.push(Math.random() < 0.5 ? 'Орёл' : 'Решка');
    }
    return [
      { value: results.join(', '), label: `Результат (${flips} бросок${flips > 1 ? 'ов' : ''})`, unit: '' }
    ];
  },
  content: {
    howTo: 'Нажмите кнопку для броска монетки. Можно бросить несколько раз подряд.',
    about: 'Виртуальный бросок монетки — равновероятный случайный выбор между орлом и решкой.',
    usage: 'Используется для принятия решений, игр, жребия, развлечения.',
    formula: 'Math.random() < 0.5 → Орёл, иначе Решка',
    faq: [
      {
        question: 'Результат действительно случайный?',
        answer: 'Да, используется генератор псевдослучайных чисел JavaScript. Для бытовых задач этого достаточно.'
      },
      {
        question: 'Можно ли бросить несколько монет?',
        answer: 'Да, укажите количество бросков до 100. Результаты покажутся списком.'
      }
    ],
    sources: [
      { title: 'Монета — Википедия', url: 'https://ru.wikipedia.org/wiki/Монета' }
    ],
    updatedAt: '2026-04-26'
  }
};

// Калькулятор крепости коктейля
export const cocktailStrengthCalculator: Calculator = {
  id: 'cocktail-strength-calculator',
  slug: 'krepost-koktejlya',
  title: 'Калькулятор крепости коктейля',
  description: 'Расчёт итоговой крепости и объёма смешанного напитка',
  category: 'povsednevnoe',
  subcategory: 'eda-i-napitki',
  type: 'formula',
  inputs: [
    {
      name: 'alcoholVolume',
      label: 'Объём алкоголя (мл)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 0
    },
    {
      name: 'alcoholPercent',
      label: 'Крепость алкоголя (%)',
      type: 'number',
      placeholder: '40',
      defaultValue: 40,
      min: 0,
      max: 100
    },
    {
      name: 'mixerVolume',
      label: 'Объём миксера (мл)',
      type: 'number',
      placeholder: '150',
      defaultValue: 150,
      min: 0
    }
  ],
  outputs: [
    { name: 'totalVolume', label: 'Общий объём', type: 'number', unit: 'мл' },
    { name: 'resultPercent', label: 'Итоговая крепость', type: 'number', unit: '%' },
    { name: 'classification', label: 'Классификация', type: 'text' }
  ],
  calculate: (inputs) => {
    const alcoholVolume = Number(inputs.alcoholVolume);
    const alcoholPercent = Number(inputs.alcoholPercent);
    const mixerVolume = Number(inputs.mixerVolume);

    if (!alcoholVolume && !mixerVolume) {
      return [{ value: '—', label: 'Результат' }];
    }

    const totalVolume = alcoholVolume + mixerVolume;
    const pureAlcohol = alcoholVolume * (alcoholPercent / 100);
    const resultPercent = totalVolume > 0 ? (pureAlcohol / totalVolume) * 100 : 0;

    let classification = '';
    if (resultPercent < 5) classification = 'Слабый (напиток)';
    else if (resultPercent < 15) classification = 'Средний (винный/коктейль)';
    else if (resultPercent < 30) classification = 'Крепкий коктейль';
    else classification = 'Очень крепкий';

    return [
      { value: totalVolume.toFixed(1), label: 'Общий объём', unit: 'мл' },
      { value: resultPercent.toFixed(2), label: 'Итоговая крепость', unit: '%' },
      { value: classification, label: 'Классификация' }
    ];
  },
  content: {
    howTo: 'Введите объём и крепость алкогольного компонента, а также объём миксера. Калькулятор рассчитает итоговую крепость.',
    about: 'Крепость смешанного напитка зависит от пропорций алкоголя и безалкогольных компонентов.',
    usage: 'Используется для расчёта крепости коктейлей, пуншей, смешанных напитков.',
    formula: 'Крепость = (Объём алкоголя × % алкоголя) / (Общий объём) × 100%',
    faq: [
      {
        question: 'Как сделать слабый коктейль?',
        answer: 'Увеличьте долю миксера. Например, 30 мл водки + 200 мл сока = ~5.2%.'
      },
      {
        question: 'Что считается крепким коктейлем?',
        answer: 'Более 20-25% обычно считается крепким. Классические коктейли часто 15-25%.'
      }
    ],
    sources: [
      { title: 'ABV — Википедия', url: 'https://en.wikipedia.org/wiki/Alcohol_by_volume' }
    ],
    updatedAt: '2026-04-26'
  }
};

// Калькулятор размеров одежды
export const clothingSizeCalculator: Calculator = {
  id: 'clothing-size-calculator',
  slug: 'razmery-odezhdy',
  title: 'Калькулятор размеров одежды',
  description: 'Определение размера одежды по обхватам',
  category: 'povsednevnoe',
  subcategory: 'razmery',
  type: 'formula',
  inputs: [
    {
      name: 'chest',
      label: 'Обхват груди/бёдер (см)',
      type: 'number',
      placeholder: '96',
      defaultValue: 96,
      min: 50,
      max: 150
    },
    {
      name: 'waist',
      label: 'Обхват талии (см)',
      type: 'number',
      placeholder: '80',
      defaultValue: 80,
      min: 40,
      max: 140
    },
    {
      name: 'hips',
      label: 'Обхват бёдер (см)',
      type: 'number',
      placeholder: '98',
      defaultValue: 98,
      min: 50,
      max: 160
    },
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' }
      ],
      defaultValue: 'male'
    }
  ],
  outputs: [
    { name: 'ruSize', label: 'Российский размер', type: 'text' },
    { name: 'intlSize', label: 'Международный', type: 'text' },
    { name: 'euSize', label: 'Европейский', type: 'text' }
  ],
  calculate: (inputs) => {
    const chest = Number(inputs.chest);
    const waist = Number(inputs.waist);
    const hips = Number(inputs.hips);
    const gender = String(inputs.gender);

    if (!chest || !waist || !hips) {
      return [{ value: '—', label: 'Результат' }];
    }

    const menSizes = [
      { chest: [80, 86], waist: [68, 74], hips: [84, 90], ru: '44-46', eu: '34-36', intl: 'XS-S' },
      { chest: [86, 92], waist: [74, 80], hips: [90, 96], ru: '46-48', eu: '36-38', intl: 'S-M' },
      { chest: [92, 98], waist: [80, 86], hips: [96, 102], ru: '48-50', eu: '38-40', intl: 'M-L' },
      { chest: [98, 104], waist: [86, 92], hips: [102, 108], ru: '50-52', eu: '40-42', intl: 'L-XL' },
      { chest: [104, 110], waist: [92, 98], hips: [108, 114], ru: '52-54', eu: '42-44', intl: 'XL-XXL' },
      { chest: [110, 116], waist: [98, 104], hips: [114, 120], ru: '54-56', eu: '44-46', intl: 'XXL-3XL' }
    ];

    const womenSizes = [
      { chest: [76, 82], waist: [58, 64], hips: [84, 90], ru: '40-42', eu: '32-34', intl: 'XS-S' },
      { chest: [82, 88], waist: [64, 70], hips: [90, 96], ru: '42-44', eu: '34-36', intl: 'S-M' },
      { chest: [88, 94], waist: [70, 76], hips: [96, 102], ru: '44-46', eu: '36-38', intl: 'M-L' },
      { chest: [94, 100], waist: [76, 82], hips: [102, 108], ru: '46-48', eu: '38-40', intl: 'L-XL' },
      { chest: [100, 106], waist: [82, 88], hips: [108, 114], ru: '48-50', eu: '40-42', intl: 'XL-XXL' },
      { chest: [106, 112], waist: [88, 94], hips: [114, 120], ru: '50-52', eu: '42-44', intl: 'XXL-3XL' }
    ];

    const table = gender === 'male' ? menSizes : womenSizes;

    let bestMatch = table[2];
    let bestScore = -1;

    for (const size of table) {
      const chestScore = (chest >= size.chest[0] && chest <= size.chest[1]) ? 3 : Math.max(0, 3 - Math.min(Math.abs(chest - size.chest[0]), Math.abs(chest - size.chest[1])) / 3);
      const waistScore = (waist >= size.waist[0] && waist <= size.waist[1]) ? 2 : Math.max(0, 2 - Math.min(Math.abs(waist - size.waist[0]), Math.abs(waist - size.waist[1])) / 3);
      const hipsScore = (hips >= size.hips[0] && hips <= size.hips[1]) ? 1 : Math.max(0, 1 - Math.min(Math.abs(hips - size.hips[0]), Math.abs(hips - size.hips[1])) / 3);
      const score = chestScore + waistScore + hipsScore;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = size;
      }
    }

    return [
      { value: bestMatch.ru, label: 'Российский размер' },
      { value: bestMatch.intl, label: 'Международный' },
      { value: bestMatch.eu, label: 'Европейский' }
    ];
  },
  content: {
    howTo: 'Измерьте обхват груди (или бёдер для низа), талии и бёдер. Введите значения и выберите пол.',
    about: 'Размеры одежды различаются по странам и производителям. Этот калькулятор даёт ориентировочные значения.',
    usage: 'Для покупки одежды онлайн и в магазинах с разными размерными сетками.',
    formula: 'Соответствие по обхватам: грудь, талия, бёдра.',
    faq: [
      {
        question: 'Как правильно измерить обхват?',
        answer: 'Используйте сантиметровую ленту. Обхват груди — по самой широкой части. Талия — по самой узкой. Бёдра — по самой широкой части бёдер.'
      },
      {
        question: 'Почему размеры различаются у брендов?',
        answer: 'У каждого производителя своя размерная сетка. Этот калькулятор даёт средние ориентиры.'
      }
    ],
    sources: [
      { title: 'Размеры одежды — Википедия', url: 'https://ru.wikipedia.org/wiki/Размеры_одежды' }
    ],
    updatedAt: '2026-04-26'
  }
};

// Калькулятор размера обуви
export const shoeSizeCalculator: Calculator = {
  id: 'shoe-size-calculator',
  slug: 'razmer-obuvi',
  title: 'Калькулятор размера обуви',
  description: 'Перевод длины стопы в размеры разных систем',
  category: 'povsednevnoe',
  subcategory: 'razmery',
  type: 'formula',
  inputs: [
    {
      name: 'footLength',
      label: 'Длина стопы (см)',
      type: 'number',
      placeholder: '26',
      defaultValue: 26,
      min: 15,
      max: 35,
      step: 0.1
    },
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' },
        { value: 'child', label: 'Детский' }
      ],
      defaultValue: 'male'
    }
  ],
  outputs: [
    { name: 'ruSize', label: 'Российский', type: 'text' },
    { name: 'euSize', label: 'Европейский', type: 'text' },
    { name: 'usSize', label: 'Американский (US)', type: 'text' },
    { name: 'ukSize', label: 'Британский (UK)', type: 'text' },
    { name: 'width', label: 'Полнота', type: 'text' }
  ],
  calculate: (inputs) => {
    const footLength = Number(inputs.footLength);
    const gender = String(inputs.gender);

    if (!footLength) {
      return [{ value: '—', label: 'Результат' }];
    }

    const ruSize = footLength * 1.5 + 1.5;
    const euSize = footLength * 1.5 + 2;

    let usSize = 0;
    let ukSize = 0;
    if (gender === 'male') {
      usSize = footLength - 17.5;
      ukSize = usSize - 0.5;
    } else if (gender === 'female') {
      usSize = footLength - 16;
      ukSize = usSize - 2;
    } else {
      usSize = footLength - 13;
      ukSize = usSize - 0.5;
    }

    let width = '';
    if (gender === 'male') {
      width = 'Средняя (D)';
    } else if (gender === 'female') {
      width = 'Средняя (B)';
    } else {
      width = 'Стандартная';
    }

    return [
      { value: Math.round(ruSize).toString(), label: 'Российский' },
      { value: Math.round(euSize).toString(), label: 'Европейский' },
      { value: usSize.toFixed(1), label: 'US' },
      { value: ukSize.toFixed(1), label: 'UK' },
      { value: width, label: 'Полнота' }
    ];
  },
  content: {
    howTo: 'Измерьте длину стопы от пятки до конца большого пальца в сантиметрах. Учитывайте припуск ~0.5 см.',
    about: 'Размеры обуви различаются по странам. Мондопоинт — международная система, основанная на длине стопы в миллиметрах.',
    usage: 'Для покупки обуви онлайн и в магазинах с разными размерными сетками.',
    formula: 'RU ≈ длина(см) × 1.5 + 1.5; EU ≈ длина(см) × 1.5 + 2; US/UK зависят от пола',
    faq: [
      {
        question: 'Как измерить длину стопы?',
        answer: 'Поставьте ногу на лист бумаги, обведите карандашом (держите перпендикулярно), измерьте расстояние от пятки до самого длинного пальца.'
      },
      {
        question: 'Какой припуск добавлять?',
        answer: 'Добавьте 0.5-1 см к длине стопы для комфорта. Для зимней обуви — 1-1.5 см.'
      }
    ],
    sources: [
      { title: 'Размеры обуви — Википедия', url: 'https://ru.wikipedia.org/wiki/Размеры_обуви' }
    ],
    updatedAt: '2026-04-26'
  }
};

// Калькулятор размера кольца
export const ringSizeCalculator: Calculator = {
  id: 'ring-size-calculator',
  slug: 'razmer-kolca',
  title: 'Калькулятор размера кольца',
  description: 'Определение размера кольца по обхвату или диаметру пальца',
  category: 'povsednevnoe',
  subcategory: 'razmery',
  type: 'formula',
  inputs: [
    {
      name: 'circumference',
      label: 'Значение (мм)',
      type: 'number',
      placeholder: '57',
      defaultValue: 57,
      min: 30,
      max: 90
    },
    {
      name: 'inputType',
      label: 'Способ измерения',
      type: 'select',
      options: [
        { value: 'circumference', label: 'Обхват пальца' },
        { value: 'diameter', label: 'Диаметр кольца' }
      ],
      defaultValue: 'circumference'
    }
  ],
  outputs: [
    { name: 'ruSize', label: 'Российский', type: 'text' },
    { name: 'euSize', label: 'Европейский', type: 'text' },
    { name: 'usSize', label: 'Американский (US)', type: 'text' },
    { name: 'circumferenceMm', label: 'Обхват', type: 'number', unit: 'мм' }
  ],
  calculate: (inputs) => {
    let circumference = Number(inputs.circumference);
    const inputType = String(inputs.inputType);

    if (!circumference) {
      return [{ value: '—', label: 'Результат' }];
    }

    if (inputType === 'diameter') {
      circumference = circumference * Math.PI;
    }

    const diameter = circumference / Math.PI;
    const ruSize = Math.round(diameter * 2) / 2;
    const euSize = Math.round(circumference);
    const usSize = (diameter - 11.54) / 0.8326;

    return [
      { value: ruSize.toFixed(1), label: 'Российский' },
      { value: euSize.toString(), label: 'Европейский' },
      { value: Math.round(usSize * 2) / 2, label: 'US' },
      { value: Math.round(circumference), label: 'Обхват', unit: 'мм' }
    ];
  },
  content: {
    howTo: 'Измерьте обхват пальца сантиметровой лентой или ниткой, или диаметр существующего кольца. Введите значение.',
    about: 'Размеры колец различаются по странам. Российский — диаметр в мм, европейский — обхват в мм, американский — цифровой индекс.',
    usage: 'Для покупки колец онлайн и подбора правильного размера.',
    formula: 'RU = диаметр(мм); EU = обхват(мм); US = (диаметр − 11.54) / 0.8326',
    faq: [
      {
        question: 'Как измерить обхват пальца?',
        answer: 'Обмотайте палец ниткой, отметьте место пересечения, разверните нитку и измерьте длину линейкой.'
      },
      {
        question: 'Когда лучше измерять?',
        answer: 'Вечером, когда пальцы немного отёчны. Не измеряйте при сильной жаре или холоде.'
      }
    ],
    sources: [
      { title: 'Размеры колец — Википедия', url: 'https://ru.wikipedia.org/wiki/Размеры_колец' }
    ],
    updatedAt: '2026-04-26'
  }
};

export const dailyCalculators = [
  cookingTimeCalculator,
  tipCalculator,
  sleepCalculator,
  calendarCalculator,
  shashlikCalculator,
  coinFlipCalculator,
  cocktailStrengthCalculator,
  clothingSizeCalculator,
  shoeSizeCalculator,
  ringSizeCalculator,
];
