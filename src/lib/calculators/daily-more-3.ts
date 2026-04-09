import { Calculator } from '../types';

export const dailyMore3Calculators: Calculator[] = [
  // 1. Калькулятор переезда
  {
    id: 'moving-calculator',
    slug: 'pereezd-raschet',
    title: 'Калькулятор переезда',
    description: 'Расчёт стоимости и объёма при переезде в новую квартиру',
    category: 'povsednevnye',
    subcategory: 'povsednevnye-drugoe',
    type: 'formula',
    inputs: [
      { name: 'rooms', label: 'Количество комнат', type: 'number', placeholder: '2', defaultValue: 2, min: 1, max: 10 },
      { name: 'distance', label: 'Расстояние (км)', type: 'number', placeholder: '50', defaultValue: 50, min: 1, max: 1000 },
      { name: 'floorFrom', label: 'Этаж (откуда)', type: 'number', placeholder: '3', defaultValue: 3, min: 1, max: 50 },
      { name: 'floorTo', label: 'Этаж (куда)', type: 'number', placeholder: '5', defaultValue: 5, min: 1, max: 50 },
      { name: 'hasElevator', label: 'Лифт', type: 'select', options: [{ value: 'yes', label: 'Есть' }, { value: 'no', label: 'Нет' }], defaultValue: 'yes' },
      { name: 'packing', label: 'Упаковка', type: 'select', options: [{ value: 'self', label: 'Самостоятельно' }, { value: 'service', label: 'Грузчики' }], defaultValue: 'self' }
    ],
    outputs: [
      { name: 'volume', label: 'Объём вещей', type: 'number', unit: 'м³' },
      { name: 'truckTrips', label: 'Рейсов газели', type: 'number' },
      { name: 'estimatedCost', label: 'Ориентировочная стоимость', type: 'number', unit: '₽' }
    ],
    calculate: (inputs) => {
      const rooms = Number(inputs.rooms);
      const distance = Number(inputs.distance);
      const floorFrom = Number(inputs.floorFrom);
      const floorTo = Number(inputs.floorTo);
      const hasElevator = String(inputs.hasElevator) === 'yes';
      const packing = String(inputs.packing);
      const volume = rooms * 12;
      const truckTrips = Math.ceil(volume / 15);
      let cost = truckTrips * (3000 + distance * 30);
      if (!hasElevator) cost += (floorFrom + floorTo) * 300;
      cost += rooms * 2000;
      if (packing === 'service') cost += volume * 150;
      return [
        { value: volume, label: 'Объём вещей', unit: 'м³' },
        { value: truckTrips, label: 'Рейсов газели' },
        { value: Math.round(cost / 100) * 100, label: 'Ориентировочная стоимость', unit: '₽' }
      ];
    },
    content: {
      howTo: 'Введите параметры переезда: количество комнат, расстояние, этажи, наличие лифта.',
      about: 'Ориентировочный расчёт стоимости переезда. Точная стоимость зависит от транспортной компании.',
      formula: 'Стоимость = Грузоперевозка + Погрузка/разгрузка + Упаковочные материалы.',
      faq: [
        { question: 'Как сэкономить на переезде?', answer: 'Упаковывайте сами, вывезите мусор заранее, выберите будний день, сравните 3-5 компаний.' },
        { question: 'Стоит ли страховать груз?', answer: 'Да, особенно при переезде на дальние расстояния и при ценных вещах.' }
      ],
      sources: [{ title: 'Советы по переезду', url: 'https://www.pereezd.ru/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 2. Калькулятор ремонта телефона
  {
    id: 'phone-repair-cost',
    slug: 'remont-telefona-stoimost',
    title: 'Калькулятор ремонта телефона',
    description: 'Ориентировочная стоимость ремонта смартфона',
    category: 'povsednevnye',
    subcategory: 'povsednevnye-drugoe',
    type: 'reference',
    inputs: [
      { name: 'brand', label: 'Бренд', type: 'select', options: [{ value: 'apple', label: 'Apple' }, { value: 'samsung', label: 'Samsung' }, { value: 'xiaomi', label: 'Xiaomi' }, { value: 'other', label: 'Другой' }], defaultValue: 'apple' },
      { name: 'repairType', label: 'Тип ремонта', type: 'select', options: [{ value: 'screen', label: 'Замена экрана' }, { value: 'battery', label: 'Замена батареи' }, { value: 'charging', label: 'Разъём зарядки' }, { value: 'camera', label: 'Камера' }, { value: 'water', label: 'После воды' }], defaultValue: 'screen' },
      { name: 'modelTier', label: 'Уровень модели', type: 'select', options: [{ value: 'budget', label: 'Бюджетная' }, { value: 'mid', label: 'Средняя' }, { value: 'premium', label: 'Премиум' }], defaultValue: 'mid' }
    ],
    outputs: [
      { name: 'minCost', label: 'Минимальная цена', type: 'number', unit: '₽' },
      { name: 'maxCost', label: 'Максимальная цена', type: 'number', unit: '₽' },
      { name: 'officialCost', label: 'Официальный сервис', type: 'number', unit: '₽' },
      { name: 'repairTime', label: 'Время ремонта', type: 'text' }
    ],
    calculate: (inputs) => {
      const brand = String(inputs.brand);
      const repair = String(inputs.repairType);
      const tier = String(inputs.modelTier);
      let baseCost = 0;
      if (repair === 'screen') baseCost = 5000;
      else if (repair === 'battery') baseCost = 2000;
      else if (repair === 'charging') baseCost = 1500;
      else if (repair === 'camera') baseCost = 3000;
      else if (repair === 'water') baseCost = 4000;
      let brandMultiplier = 1;
      if (brand === 'apple') brandMultiplier = 2;
      else if (brand === 'samsung') brandMultiplier = 1.5;
      let tierMultiplier = 1;
      if (tier === 'premium') tierMultiplier = 1.5;
      else if (tier === 'budget') tierMultiplier = 0.7;
      const minCost = baseCost * brandMultiplier * tierMultiplier * 0.6;
      const maxCost = baseCost * brandMultiplier * tierMultiplier;
      const officialCost = baseCost * brandMultiplier * tierMultiplier * 1.5;
      let time = '';
      if (repair === 'screen' || repair === 'battery') time = '30-60 мин';
      else if (repair === 'charging') time = '1-2 часа';
      else time = '2-7 дней';
      return [
        { value: Math.round(minCost), label: 'Минимальная цена', unit: '₽' },
        { value: Math.round(maxCost), label: 'Максимальная цена', unit: '₽' },
        { value: Math.round(officialCost), label: 'Официальный сервис', unit: '₽' },
        { value: time, label: 'Время ремонта' }
      ];
    },
    content: {
      howTo: 'Выберите бренд, тип ремонта и уровень модели.',
      about: 'Цены ориентировочные. Зависят от города, сервисного центра и наличия запчастей.',
      formula: 'Стоимость = Базовая цена × Мультипликатор бренда × Мультипликатор класса.',
      faq: [
        { question: 'Оригинал или копия экрана?', answer: 'Оригинал — дороже, но качество цвета и тачскрина лучше. Копия — в 2-3 раза дешевле, но может быть менее яркая.' },
        { question: 'Ремонтировать или покупать новый?', answer: 'Если ремонт >50% стоимости нового аналогичного телефона — обычно выгоднее новый.' }
      ],
      sources: [{ title: 'Сервисы ремонта', url: 'https://remont.tele2.ru/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 3. Калькулятор домашнего бюджета
  {
    id: 'household-budget',
    slug: 'domashnij-byudzhet',
    title: 'Калькулятор домашнего бюджета',
    description: 'Расчёт семейного бюджета и баланса доходов/расходов',
    category: 'povsednevnye',
    subcategory: 'povsednevnye-drugoe',
    type: 'formula',
    inputs: [
      { name: 'income', label: 'Доход семьи (₽/мес)', type: 'number', placeholder: '80000', defaultValue: 80000, min: 0 },
      { name: 'rent', label: 'Жильё (аренда/ипотека)', type: 'number', placeholder: '25000', defaultValue: 25000, min: 0 },
      { name: 'food', label: 'Еда и продукты', type: 'number', placeholder: '20000', defaultValue: 20000, min: 0 },
      { name: 'transport', label: 'Транспорт', type: 'number', placeholder: '5000', defaultValue: 5000, min: 0 },
      { name: 'utilities', label: 'Коммунальные услуги', type: 'number', placeholder: '5000', defaultValue: 5000, min: 0 },
      { name: 'entertainment', label: 'Развлечения', type: 'number', placeholder: '5000', defaultValue: 5000, min: 0 },
      { name: 'other', label: 'Прочие расходы', type: 'number', placeholder: '5000', defaultValue: 5000, min: 0 }
    ],
    outputs: [
      { name: 'totalExpenses', label: 'Всего расходов', type: 'number', unit: '₽' },
      { name: 'balance', label: 'Баланс', type: 'number', unit: '₽' },
      { name: 'savingsRate', label: 'Сбережения', type: 'number', unit: '%' },
      { name: 'recommendation', label: 'Рекомендация', type: 'text' }
    ],
    calculate: (inputs) => {
      const income = Number(inputs.income);
      const totalExpenses = Number(inputs.rent) + Number(inputs.food) + Number(inputs.transport) + Number(inputs.utilities) + Number(inputs.entertainment) + Number(inputs.other);
      const balance = income - totalExpenses;
      const savingsRate = (balance / income) * 100;
      let recommendation = '';
      if (savingsRate < 0) recommendation = 'Дефицит бюджета! Срочно сократите расходы.';
      else if (savingsRate < 10) recommendation = 'Слишком мало сбережений. Цель — минимум 10-20%.';
      else if (savingsRate < 20) recommendation = 'Хороший баланс. Можно улучшить до 20%.';
      else recommendation = 'Отличный уровень сбережений!';
      return [
        { value: totalExpenses, label: 'Всего расходов', unit: '₽' },
        { value: balance, label: 'Баланс', unit: '₽' },
        { value: Math.round(savingsRate * 10) / 10, label: 'Сбережения', unit: '%' },
        { value: recommendation, label: 'Рекомендация' }
      ];
    },
    content: {
      howTo: 'Введите доход и все категории расходов.',
      about: 'Правило 50/30/20: 50% — нужды, 30% — хочу, 20% — сбережения.',
      usage: 'Для планирования семейного бюджета и контроля расходов.',
      formula: 'Баланс = Доход − Расходы. Сбережения = (Баланс / Доход) × 100%.',
      faq: [
        { question: 'Какая норма расходов на еду?', answer: 'Обычно 20-30% бюджета. Для семьи из 2 человек — 15000-25000 ₽/мес в зависимости от региона.' },
        { question: 'Как сократить расходы?', answer: 'Ведите учёт (категории), планируйте покупки, отсрочивайте импульсивные траты на 24 часа.' }
      ],
      sources: [{ title: 'Управление личными финансами', url: 'https://www.vse-dengy.ru/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 4. Калькулятор питомца (расходы)
  {
    id: 'pet-cost-calculator',
    slug: 'rashody-na-pitomca',
    title: 'Калькулятор расходов на питомца',
    description: 'Расчёт месячных и годовых расходов на содержание животного',
    category: 'povsednevnye',
    subcategory: 'povsednevnye-drugoe',
    type: 'formula',
    inputs: [
      { name: 'petType', label: 'Тип питомца', type: 'select', options: [{ value: 'cat', label: 'Кошка' }, { value: 'dog_small', label: 'Собака (маленькая)' }, { value: 'dog_medium', label: 'Собака (средняя)' }, { value: 'dog_large', label: 'Собака (крупная)' }, { value: 'hamster', label: 'Хомяк' }, { value: 'parrot', label: 'Попугай' }], defaultValue: 'cat' },
      { name: 'foodQuality', label: 'Качество корма', type: 'select', options: [{ value: 'economy', label: 'Эконом' }, { value: 'standard', label: 'Стандарт' }, { value: 'premium', label: 'Премиум' }], defaultValue: 'standard' },
      { name: 'vetVisits', label: 'Ветеринар (раз в год)', type: 'number', placeholder: '2', defaultValue: 2, min: 0, max: 12 }
    ],
    outputs: [
      { name: 'monthlyFood', label: 'Корм в месяц', type: 'number', unit: '₽' },
      { name: 'monthlyTotal', label: 'Всего в месяц', type: 'number', unit: '₽' },
      { name: 'annualTotal', label: 'Всего в год', type: 'number', unit: '₽' },
      { name: 'breakdown', label: 'Структура расходов', type: 'text' }
    ],
    calculate: (inputs) => {
      const pet = String(inputs.petType);
      const quality = String(inputs.foodQuality);
      const vet = Number(inputs.vetVisits);
      let foodBase = 0;
      if (pet === 'cat') foodBase = 1500;
      else if (pet === 'dog_small') foodBase = 1000;
      else if (pet === 'dog_medium') foodBase = 2500;
      else if (pet === 'dog_large') foodBase = 4000;
      else if (pet === 'hamster') foodBase = 300;
      else if (pet === 'parrot') foodBase = 500;
      let qualityMult = 1;
      if (quality === 'economy') qualityMult = 0.6;
      else if (quality === 'premium') qualityMult = 2;
      const monthlyFood = foodBase * qualityMult;
      const litter = pet === 'cat' ? 500 : 0;
      const toys = pet.includes('dog') || pet === 'cat' ? 300 : 100;
      const vetMonthly = vet * 2000 / 12;
      const grooming = pet.includes('dog') ? 500 : 0;
      const monthlyTotal = monthlyFood + litter + toys + vetMonthly + grooming;
      const annualTotal = monthlyTotal * 12;
      return [
        { value: Math.round(monthlyFood), label: 'Корм в месяц', unit: '₽' },
        { value: Math.round(monthlyTotal), label: 'Всего в месяц', unit: '₽' },
        { value: Math.round(annualTotal), label: 'Всего в год', unit: '₽' },
        { value: `Корм: ${Math.round(monthlyFood)}₽, Наполнитель/аксессуары: ${Math.round(litter + toys)}₽, Ветеринар: ${Math.round(vetMonthly)}₽`, label: 'Структура расходов' }
      ];
    },
    content: {
      howTo: 'Выберите тип питомца, качество корма и планируемое количество визитов к ветеринару.',
      about: 'Расходы на питомца включают корм, наполнитель, ветеринарные услуги, игрушки и аксессуары.',
      usage: 'Для планирования бюджета перед заведением питомца.',
      formula: 'Годовые расходы = Корм × 12 + Ветеринар + Наполнитель/аксессуары.',
      faq: [
        { question: 'Сколько стоит содержать кошку?', answer: 'Эконом: ~1500₽/мес. Премиум: ~4000₽/мес + ветеринар.' },
        { question: 'Непредвиденные расходы?', answer: 'Лечение (от 3000₽), отпуск/передержка (200-500₽/день), ремонт вещей (если щенок/котёнок).' }
      ],
      sources: [{ title: 'Содержание питомцев', url: 'https://www.kinopoisk.ru/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 5. Калькулятор подарков на свадьбу
  {
    id: 'wedding-gift-calculator',
    slug: 'podarki-na-svadbu',
    title: 'Калькулятор подарков на свадьбу',
    description: 'Сколько подарить денег или что подарить на свадьбу',
    category: 'povsednevnye',
    subcategory: 'povsednevnye-drugoe',
    type: 'formula',
    inputs: [
      { name: 'relationship', label: 'Отношения', type: 'select', options: [{ value: 'close', label: 'Близкий родственник/друг' }, { value: 'relative', label: 'Родственник' }, { value: 'colleague', label: 'Коллега' }, { value: 'acquaintance', label: 'Знакомый' }], defaultValue: 'relative' },
      { name: 'attending', label: 'Присутствие', type: 'select', options: [{ value: 'yes', label: 'Буду на свадьбе' }, { value: 'no', label: 'Не приду' }], defaultValue: 'yes' },
      { name: 'region', label: 'Регион', type: 'select', options: [{ value: 'moscow', label: 'Москва/СПб' }, { value: 'city', label: 'Город 500к+' }, { value: 'small', label: 'Малый город' }], defaultValue: 'city' }
    ],
    outputs: [
      { name: 'moneyGift', label: 'Денежный подарок', type: 'number', unit: '₽' },
      { name: 'giftAlternative', label: 'Альтернатива', type: 'text' },
      { name: 'etiquette', label: 'Этикет', type: 'text' }
    ],
    calculate: (inputs) => {
      const relation = String(inputs.relationship);
      const attending = String(inputs.attending) === 'yes';
      const region = String(inputs.region);
      let base = 3000;
      if (relation === 'close') base = 15000;
      else if (relation === 'relative') base = 7000;
      else if (relation === 'colleague') base = 3000;
      else base = 2000;
      if (!attending) base = base * 0.5;
      let regionMult = 1;
      if (region === 'moscow') regionMult = 1.5;
      else if (region === 'small') regionMult = 0.7;
      const moneyGift = Math.round(base * regionMult / 1000) * 1000;
      let alternative = '';
      if (relation === 'close') alternative = 'Подарок из вишлиста (20000-30000₽) или сертификат';
      else if (moneyGift < 5000) alternative = 'Подарок (3000-5000₽) или набор для дома';
      else alternative = 'Деньги в конверте';
      let etiquette = attending ? 'Принесите на свадьбу или передадите лично' : 'Отправьте до/после свадьбы';
      return [
        { value: moneyGift, label: 'Денежный подарок', unit: '₽' },
        { value: alternative, label: 'Альтернатива' },
        { value: etiquette, label: 'Этикет' }
      ];
    },
    content: {
      howTo: 'Укажите отношения к молодожёнам, планируете ли присутствовать и регион.',
      about: 'В России обычно дарят деньги в конверте. Сумма зависит от близости и региона.',
      usage: 'Для определения подходящей суммы денежного подарка.',
      formula: 'Базовая сумма × Регион × (Присутствие ? 1 : 0.5).',
      faq: [
        { question: 'Можно ли подарить не деньги?', answer: 'Да, если знаете вкусы/нужды пары. Но деньги — самый универсальный вариант.' },
        { question: 'Число суммы?', answer: 'В России не принципиально (в отличие от Китая). Но красивые числа (5000, 10000) приятнее.' }
      ],
      sources: [{ title: 'Свадебный этикет', url: 'https://www.theknot.com/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 6. Калькулятор встречи Нового года
  {
    id: 'new-year-party',
    slug: 'vstrecha-novogo-goda',
    title: 'Калькулятор встречи Нового года',
    description: 'Расчёт бюджета и продуктов на новогоднюю вечеринку',
    category: 'povsednevnye',
    subcategory: 'povsednevnye-drugoe',
    type: 'formula',
    inputs: [
      { name: 'guests', label: 'Количество гостей', type: 'number', placeholder: '8', defaultValue: 8, min: 2, max: 50 },
      { name: 'duration', label: 'Длительность (часов)', type: 'number', placeholder: '6', defaultValue: 6, min: 2, max: 24 },
      { name: 'alcohol', label: 'Алкоголь', type: 'select', options: [{ value: 'full', label: 'Полный бар' }, { value: 'wine', label: 'Вино/шампанское' }, { value: 'minimal', label: 'Минимум' }], defaultValue: 'wine' },
      { name: 'location', label: 'Место', type: 'select', options: [{ value: 'home', label: 'Дома' }, { value: 'cafe', label: 'Кафе/ресторан' }], defaultValue: 'home' }
    ],
    outputs: [
      { name: 'foodCost', label: 'Еда', type: 'number', unit: '₽' },
      { name: 'drinksCost', label: 'Напитки', type: 'number', unit: '₽' },
      { name: 'totalCost', label: 'Итого', type: 'number', unit: '₽' },
      { name: 'perPerson', label: 'На человека', type: 'number', unit: '₽' },
      { name: 'shoppingList', label: 'Примерный список', type: 'text' }
    ],
    calculate: (inputs) => {
      const guests = Number(inputs.guests);
      const duration = Number(inputs.duration);
      const alcohol = String(inputs.alcohol);
      const location = String(inputs.location);
      const foodPerPerson = 1000;
      let alcoholPerPerson = 500;
      if (alcohol === 'full') alcoholPerPerson = 1500;
      else if (alcohol === 'wine') alcoholPerPerson = 800;
      else alcoholPerPerson = 200;
      const foodCost = foodPerPerson * guests;
      const drinksCost = alcoholPerPerson * guests;
      let totalCost = foodCost + drinksCost;
      if (location === 'cafe') totalCost = totalCost * 2 + guests * 1500;
      const perPerson = totalCost / guests;
      let shoppingList = '';
      if (alcohol === 'full') shoppingList = 'Шампанское (1 бут/3 чел), вино, водка/виски, пиво, закуски, салаты, мясо/рыба, фрукты';
      else if (alcohol === 'wine') shoppingList = 'Шампанское, вино 2-3 видов, соки, закуски, салаты, десерт';
      else shoppingList = 'Шампанское (для тоста), соки, лимонады, закуски, салаты, фрукты';
      return [
        { value: foodCost, label: 'Еда', unit: '₽' },
        { value: drinksCost, label: 'Напитки', unit: '₽' },
        { value: totalCost, label: 'Итого', unit: '₽' },
        { value: Math.round(perPerson), label: 'На человека', unit: '₽' },
        { value: shoppingList, label: 'Примерный список' }
      ];
    },
    content: {
      howTo: 'Введите количество гостей, планируемую длительность, набор алкоголя и место.',
      about: 'Средний бюджет на домашнюю вечеринку: 2000-3000₽ на человека. В кафе — в 2-3 раза дороже.',
      usage: 'Для планирования новогоднего бюджета и рассылки общака гостям.',
      formula: 'Еда + Напитки + (Кафе ? Аренда : 0). На человека = Итого / Гости.',
      faq: [
        { question: 'Как разделить расходы?', answer: 'Организатор покупает всё, гости скидываются равными долями. Или каждый приносит что-то.' },
        { question: 'Сколько алкоголя на человека?', answer: 'В среднем: 0.5л вина + 200мл крепкого/шампанского на 4-5 часов.' }
      ],
      sources: [{ title: 'Планирование вечеринки', url: 'https://www.party.ru/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 7. Калькулятор поездки на машине
  {
    id: 'road-trip-calculator',
    slug: 'poezdka-na-mashine',
    title: 'Калькулятор автопутешествия',
    description: 'Расчёт расходов на поездку на автомобиле',
    category: 'povsednevnye',
    subcategory: 'povsednevnye-drugoe',
    type: 'formula',
    inputs: [
      { name: 'distance', label: 'Расстояние (км)', type: 'number', placeholder: '500', defaultValue: 500, min: 50, max: 5000 },
      { name: 'fuelConsumption', label: 'Расход топлива (л/100км)', type: 'number', placeholder: '8', defaultValue: 8, min: 3, max: 30 },
      { name: 'fuelPrice', label: 'Цена топлива (₽/л)', type: 'number', placeholder: '55', defaultValue: 55, min: 30, max: 100 },
      { name: 'tollRoads', label: 'Платные дороги', type: 'number', placeholder: '1000', defaultValue: 1000, min: 0 },
      { name: 'passengers', label: 'Пассажиров (включая водителя)', type: 'number', placeholder: '2', defaultValue: 2, min: 1, max: 8 }
    ],
    outputs: [
      { name: 'fuelNeeded', label: 'Топлива нужно', type: 'number', unit: 'л' },
      { name: 'fuelCost', label: 'Стоимость топлива', type: 'number', unit: '₽' },
      { name: 'totalCost', label: 'Всего расходов', type: 'number', unit: '₽' },
      { name: 'perPerson', label: 'На человека', type: 'number', unit: '₽' }
    ],
    calculate: (inputs) => {
      const distance = Number(inputs.distance);
      const consumption = Number(inputs.fuelConsumption);
      const fuelPrice = Number(inputs.fuelPrice);
      const tollRoads = Number(inputs.tollRoads);
      const passengers = Number(inputs.passengers);
      const fuelNeeded = (distance / 100) * consumption;
      const fuelCost = fuelNeeded * fuelPrice;
      const totalCost = fuelCost + tollRoads;
      const perPerson = totalCost / passengers;
      return [
        { value: Math.round(fuelNeeded * 10) / 10, label: 'Топлива нужно', unit: 'л' },
        { value: Math.round(fuelCost), label: 'Стоимость топлива', unit: '₽' },
        { value: Math.round(totalCost), label: 'Всего расходов', unit: '₽' },
        { value: Math.round(perPerson), label: 'На человека', unit: '₽' }
      ];
    },
    content: {
      howTo: 'Введите расстояние, расход топлива, цену за литр и стоимость проезда по платным дорогам.',
      about: 'Расчёт основных расходов на поездку. Не включает еду, ночлег и внезапный ремонт.',
      usage: 'Для планирования бюджета автопутешествия и разделения расходов.',
      formula: 'Топливо = Расстояние × Расход / 100. Стоимость = Топливо × Цена + Платные дороги.',
      faq: [
        { question: 'Как сэкономить на топливе?', answer: 'Езжайте 90-100 км/ч (оптимальная скорость), следите за давлением в шинах, уберите лишний вес.' },
        { question: 'Стоит ли ехать по платной дороге?', answer: 'Если экономите время — да. Иногда платная дорога короче на 100+ км, что компенсирует стоимость.' }
      ],
      sources: [{ title: 'Планирование автопутешествия', url: 'https://www.avtodor-tr.ru/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 8. Калькулятор сада/огорода
  {
    id: 'garden-calculator',
    slug: 'sad-ogorod-raschet',
    title: 'Калькулятор посадок в саду',
    description: 'Расчёт количества семян и расстояний между растениями',
    category: 'povsednevnye',
    subcategory: 'povsednevnye-drugoe',
    type: 'formula',
    inputs: [
      { name: 'cropType', label: 'Культура', type: 'select', options: [{ value: 'tomato', label: 'Помидоры' }, { value: 'cucumber', label: 'Огурцы' }, { value: 'potato', label: 'Картофель' }, { value: 'carrot', label: 'Морковь' }, { value: 'beet', label: 'Свёкла' }, { value: 'cabbage', label: 'Капуста' }], defaultValue: 'tomato' },
      { name: 'area', label: 'Площадь (м²)', type: 'number', placeholder: '10', defaultValue: 10, min: 1, max: 1000 }
    ],
    outputs: [
      { name: 'plantsCount', label: 'Количество растений', type: 'number', unit: 'шт' },
      { name: 'seedsNeeded', label: 'Семян нужно', type: 'number', unit: 'г' },
      { name: 'spacing', label: 'Схема посадки', type: 'text' },
      { name: 'yieldEstimate', label: 'Ожидаемый урожай', type: 'number', unit: 'кг' }
    ],
    calculate: (inputs) => {
      const crop = String(inputs.cropType);
      const area = Number(inputs.area);
      const data: Record<string, { spacing: number, row: number, seedsPerM2: number, yield: number }> = {
        tomato: { spacing: 0.5, row: 0.6, seedsPerM2: 4, yield: 5 },
        cucumber: { spacing: 0.3, row: 1.0, seedsPerM2: 3, yield: 4 },
        potato: { spacing: 0.3, row: 0.7, seedsPerM2: 6, yield: 3 },
        carrot: { spacing: 0.05, row: 0.2, seedsPerM2: 100, yield: 3 },
        beet: { spacing: 0.1, row: 0.25, seedsPerM2: 40, yield: 4 },
        cabbage: { spacing: 0.5, row: 0.6, seedsPerM2: 3, yield: 4 }
      };
      const cropData = data[crop];
      const plantsCount = Math.floor(area / (cropData.spacing * cropData.row));
      const seedsNeeded = Math.ceil(area * cropData.seedsPerM2);
      const spacing = `${cropData.spacing}×${cropData.row} м`;
      const yieldEstimate = area * cropData.yield;
      return [
        { value: plantsCount, label: 'Количество растений', unit: 'шт' },
        { value: seedsNeeded, label: 'Семян нужно', unit: 'г' },
        { value: spacing, label: 'Схема посадки' },
        { value: Math.round(yieldEstimate), label: 'Ожидаемый урожай', unit: 'кг' }
      ];
    },
    content: {
      howTo: 'Выберите тип культуры и площадь грядки.',
      about: 'Расчёт норм посева для огорода. Урожайность сильно зависит от ухода, погоды и сорта.',
      usage: 'Для планирования закупки семян и организации пространства на грядках.',
      formula: 'Количество = Площадь / (Расстояние между растениями × Между рядами).',
      faq: [
        { question: 'Сколько картофеля с 1 сотки?', answer: 'При хорошем уходе — 200-300 кг с 100 м² (10 соток = 2-3 тонны).' },
        { question: 'Когда сажать?', answer: 'Картофель — когда почва прогреется до +8°C. Огурцы/помидоры — после заморозков (конец мая в средней полосе).' }
      ],
      sources: [{ title: 'Советы огородникам', url: 'https://www.ogorod.ru/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 9. Калькулятор отпуска (расходы)
  {
    id: 'vacation-cost',
    slug: 'rashody-na-otpusk',
    title: 'Калькулятор расходов на отпуск',
    description: 'Планирование бюджета отпуска с учётом всех статей расходов',
    category: 'povsednevnye',
    subcategory: 'povsednevnye-drugoe',
    type: 'formula',
    inputs: [
      { name: 'duration', label: 'Длительность (дней)', type: 'number', placeholder: '7', defaultValue: 7, min: 1, max: 30 },
      { name: 'travelers', label: 'Путешественников', type: 'number', placeholder: '2', defaultValue: 2, min: 1, max: 10 },
      { name: 'destination', label: 'Направление', type: 'select', options: [{ value: 'russia', label: 'Россия' }, { value: 'near', label: 'Ближнее зарубежье' }, { value: 'europe', label: 'Европа' }, { value: 'asia', label: 'Азия' }], defaultValue: 'russia' },
      { name: 'accommodation', label: 'Тип жилья', type: 'select', options: [{ value: 'budget', label: 'Хостел/Эконом' }, { value: 'mid', label: '3* отель/Апартаменты' }, { value: 'luxury', label: '4-5* отель' }], defaultValue: 'mid' }
    ],
    outputs: [
      { name: 'accommodationCost', label: 'Жильё', type: 'number', unit: '₽' },
      { name: 'foodCost', label: 'Еда', type: 'number', unit: '₽' },
      { name: 'activitiesCost', label: 'Развлечения', type: 'number', unit: '₽' },
      { name: 'totalCost', label: 'Всего', type: 'number', unit: '₽' },
      { name: 'perPerson', label: 'На человека', type: 'number', unit: '₽' },
      { name: 'dailyBudget', label: 'В день (на всех)', type: 'number', unit: '₽' }
    ],
    calculate: (inputs) => {
      const duration = Number(inputs.duration);
      const travelers = Number(inputs.travelers);
      const dest = String(inputs.destination);
      const acc = String(inputs.accommodation);
      let destMult = 1;
      if (dest === 'near') destMult = 1.2;
      else if (dest === 'europe') destMult = 2;
      else if (dest === 'asia') destMult = 0.8;
      let accPerNight = 3000;
      if (acc === 'budget') accPerNight = 1500;
      else if (acc === 'luxury') accPerNight = 8000;
      const accommodationCost = accPerNight * destMult * duration;
      const foodPerDay = 1500 * destMult * travelers;
      const foodCost = foodPerDay * duration;
      const activitiesPerDay = 1000 * destMult * travelers;
      const activitiesCost = activitiesPerDay * duration;
      const totalCost = accommodationCost + foodCost + activitiesCost;
      return [
        { value: Math.round(accommodationCost), label: 'Жильё', unit: '₽' },
        { value: Math.round(foodCost), label: 'Еда', unit: '₽' },
        { value: Math.round(activitiesCost), label: 'Развлечения', unit: '₽' },
        { value: Math.round(totalCost), label: 'Всего', unit: '₽' },
        { value: Math.round(totalCost / travelers), label: 'На человека', unit: '₽' },
        { value: Math.round(totalCost / duration), label: 'В день (на всех)', unit: '₽' }
      ];
    },
    content: {
      howTo: 'Введите длительность, количество людей, направление и тип жилья.',
      about: 'Ориентировочный бюджет без учёта перелётов/транспорта до места. Добавьте 15-20% на непредвиденные расходы.',
      usage: 'Для планирования отпускного бюджета и накопления.',
      formula: 'Жильё + Еда + Развлечения. Каждая статья × Мультипликатор направления.',
      faq: [
        { question: 'Как сэкономить на отпуске?', answer: 'Бронируйте заранее (3-6 мес), ешьте где местные, используйте общественный транспорт, бесплатные достопримечательности.' },
        { question: 'Нужен ли резерв?', answer: 'Да, минимум 15-20% сверх бюджета. Или кредитная карта на случай чрезвычайных ситуаций.' }
      ],
      sources: [{ title: 'Планирование отпуска', url: 'https://www.booking.com/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 10. Калькулятор инвестиций в себя (образование)
  {
    id: 'self-investment',
    slug: 'investiczii-v-sebya',
    title: 'Калькулятор инвестиций в себя',
    description: 'Окупаемость обучения и курсов повышения квалификации',
    category: 'povsednevnye',
    subcategory: 'povsednevnye-drugoe',
    type: 'formula',
    inputs: [
      { name: 'courseCost', label: 'Стоимость курса/образования (₽)', type: 'number', placeholder: '100000', defaultValue: 100000, min: 0 },
      { name: 'currentSalary', label: 'Текущая зарплата (₽/мес)', type: 'number', placeholder: '60000', defaultValue: 60000, min: 0 },
      { name: 'expectedIncrease', label: 'Ожидаемый прирост зарплаты (%)', type: 'number', placeholder: '30', defaultValue: 30, min: 0, max: 200 },
      { name: 'monthsToComplete', label: 'Длительность обучения (мес)', type: 'number', placeholder: '6', defaultValue: 6, min: 1, max: 60 }
    ],
    outputs: [
      { name: 'newSalary', label: 'Новая зарплата', type: 'number', unit: '₽/мес' },
      { name: 'monthlyIncrease', label: 'Прибавка в месяц', type: 'number', unit: '₽' },
      { name: 'paybackMonths', label: 'Окупаемость (мес)', type: 'number' },
      { name: 'roi5years', label: 'ROI за 5 лет', type: 'number', unit: '%' },
      { name: 'totalGain5years', label: 'Чистая выгода за 5 лет', type: 'number', unit: '₽' }
    ],
    calculate: (inputs) => {
      const cost = Number(inputs.courseCost);
      const current = Number(inputs.currentSalary);
      const increase = Number(inputs.expectedIncrease) / 100;
      const newSalary = current * (1 + increase);
      const monthlyIncrease = newSalary - current;
      const paybackMonths = monthlyIncrease > 0 ? cost / monthlyIncrease : 999;
      const totalGain5Years = monthlyIncrease * 60;
      const roi5years = (totalGain5Years / cost - 1) * 100;
      return [
        { value: Math.round(newSalary), label: 'Новая зарплата', unit: '₽/мес' },
        { value: Math.round(monthlyIncrease), label: 'Прибавка в месяц', unit: '₽' },
        { value: Math.round(paybackMonths), label: 'Окупаемость', unit: 'мес' },
        { value: Math.round(roi5years), label: 'ROI за 5 лет', unit: '%' },
        { value: Math.round(totalGain5Years - cost), label: 'Чистая выгода за 5 лет', unit: '₽' }
      ];
    },
    content: {
      howTo: 'Введите стоимость обучения, текущую зарплату и ожидаемый процент прироста.',
      about: 'Лучшая инвестиция — в себя. Обучение часто окупается за 6-18 месяцев через повышение зарплаты.',
      usage: 'Для принятия решения о записи на курсы или получении новой специализации.',
      formula: 'Окупаемость = Стоимость / (Новая зарплата − Текущая). ROI = (Выгода − Затраты) / Затраты × 100%.',
      faq: [
        { question: 'Какой прирост зарплаты реалистичен?', answer: 'IT-курсы: 30-100%. MBA: 20-50%. Языковые: 10-30% (зависит от сферы).' },
        { question: 'Стоит ли учиться за свой счёт?', answer: 'Если окупаемость < 24 месяцев — обычно да. Сравните с альтернативной стоимостью (банковский депозит).' }
      ],
      sources: [{ title: 'ROI образования', url: 'https://www.investopedia.com/terms/r/returnoninvestment.asp' }],
      updatedAt: '2026-04-08'
    }
  }
];
