import { Calculator } from '../types';

// 1. Планировщик питания (Meal planner calculator)
export const mealPlannerCalculator: Calculator = {
  id: 'meal-planner-calculator',
  slug: 'planirovshik-pitaniya',
  title: 'Планировщик питания',
  description: 'Расчёт калорий и макронутриентов для разных типов диет',
  category: 'povsednevnoe',
  subcategory: 'everyday-eda',
  type: 'formula',
  inputs: [
    {
      name: 'dietType',
      label: 'Тип диеты',
      type: 'select',
      options: [
        { value: 'keto', label: 'Кето (низкоуглеводная)' },
        { value: 'paleo', label: 'Палео (как у древних)' },
        { value: 'vegan', label: 'Веганская' },
        { value: 'balanced', label: 'Сбалансированная' },
        { value: 'lowfat', label: 'Низкожировая' }
      ],
      defaultValue: 'balanced'
    },
    {
      name: 'dailyCalories',
      label: 'Калорий в день (ккал)',
      type: 'number',
      placeholder: '2000',
      defaultValue: 2000,
      min: 800,
      max: 5000,
      step: 50
    },
    {
      name: 'mealsPerDay',
      label: 'Приёмов пищи в день',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 1,
      max: 6
    },
    {
      name: 'bodyWeight',
      label: 'Вес тела (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 30,
      max: 200
    }
  ],
  outputs: [
    { name: 'caloriesPerMeal', label: 'Калорий за приём', type: 'number', unit: 'ккал' },
    { name: 'protein', label: 'Белки', type: 'number', unit: 'г/день' },
    { name: 'fat', label: 'Жиры', type: 'number', unit: 'г/день' },
    { name: 'carbs', label: 'Углеводы', type: 'number', unit: 'г/день' },
    { name: 'exampleFoods', label: 'Примеры продуктов', type: 'text' }
  ],
  calculate: (inputs) => {
    const dietType = String(inputs.dietType);
    const dailyCalories = Number(inputs.dailyCalories);
    const mealsPerDay = Number(inputs.mealsPerDay);
    const bodyWeight = Number(inputs.bodyWeight);

    // Macro distribution by diet type
    const macroRatios: Record<string, { p: number; f: number; c: number }> = {
      'keto': { p: 20, f: 75, c: 5 },
      'paleo': { p: 30, f: 40, c: 30 },
      'vegan': { p: 15, f: 30, c: 55 },
      'balanced': { p: 25, f: 30, c: 45 },
      'lowfat': { p: 30, f: 15, c: 55 }
    };

    const ratios = macroRatios[dietType];

    // Calculate grams (protein/carbs = 4 kcal/g, fat = 9 kcal/g)
    const proteinGrams = Math.round((dailyCalories * (ratios.p / 100)) / 4);
    const fatGrams = Math.round((dailyCalories * (ratios.f / 100)) / 9);
    const carbsGrams = Math.round((dailyCalories * (ratios.c / 100)) / 4);

    const caloriesPerMeal = Math.round(dailyCalories / mealsPerDay);

    // Example foods by diet
    const exampleFoods: Record<string, string> = {
      'keto': 'Авокадо, оливки, орехи, рыба, яйца, сало',
      'paleo': 'Мясо, рыба, яйца, овощи, фрукты, орехи',
      'vegan': 'Тофу, чечевица, киноа, орехи, овощи, фрукты',
      'balanced': 'Курица, рыба, крупы, овощи, фрукты, орехи',
      'lowfat': 'Курица, белок яйца, овощи, фрукты, зерновые'
    };

    return [
      { value: caloriesPerMeal, label: 'Калорий за приём', unit: 'ккал' },
      { value: proteinGrams, label: 'Белки в день', unit: 'г' },
      { value: fatGrams, label: 'Жиры в день', unit: 'г' },
      { value: carbsGrams, label: 'Углеводы в день', unit: 'г' },
      { value: exampleFoods[dietType], label: 'Примеры продуктов' }
    ];
  },
  content: {
    howTo: 'Выберите тип диеты, укажите суточную калорийность, количество приёмов пищи и вес. Калькулятор рассчитает макронутриенты и даст примеры продуктов.',
    about: 'Разные диеты требуют разного распределения макронутриентов: кето — высокие жиры, веганская — высокие углеводы, сбалансированная — равномерное распределение.',
    formula: 'Белки = Калории × % белков / 4; Жиры = Калории × % жиров / 9; Углеводы = Калории × % углеводов / 4',
    faq: [
      {
        question: 'Сколько белка нужно в день?',
        answer: 'Для поддержания мышц — 1.2-1.6 г на кг веса. Для роста мышц — 1.6-2.2 г. Калькулятор показывает базовое распределение по диете.'
      },
      {
        question: 'Что такое кето-диета?',
        answer: 'Диета с минимумом углеводов (менее 50 г/день), заставляющая организм использовать жиры как топливо. Соотношение: 75% жиров, 20% белков, 5% углеводов.'
      },
      {
        question: 'Как рассчитать суточную калорийность?',
        answer: 'Используйте калькулятор суточной нормы калорий (BMR + активность). Для похудения вычтите 300-500 ккал, для набора массы добавьте 300-500 ккал.'
      }
    ],
    sources: [
      { title: 'Макронутриенты — Википедия', url: 'https://ru.wikipedia.org/wiki/Макронутриенты' },
      { title: 'Кетогенная диета — Healthline', url: 'https://www.healthline.com/nutrition/ketogenic-diet-101' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 2. Расчёт продуктов на компанию (Party food calculator)
export const partyFoodCalculator: Calculator = {
  id: 'party-food-calculator',
  slug: 'produkty-na-kompaniyu',
  title: 'Расчёт продуктов на компанию',
  description: 'Калькулятор количества еды и напитков для мероприятий и праздников',
  category: 'povsednevnoe',
  subcategory: 'everyday-eda',
  type: 'formula',
  inputs: [
    {
      name: 'guests',
      label: 'Количество гостей',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 1,
      max: 200
    },
    {
      name: 'duration',
      label: 'Длительность (часов)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      min: 1,
      max: 12
    },
    {
      name: 'mealType',
      label: 'Тип мероприятия',
      type: 'select',
      options: [
        { value: 'buffet', label: 'Фуршет (самообслуживание)' },
        { value: 'sitdown', label: 'Банкет (за столом)' },
        { value: 'finger', label: 'Фуршет с фингер-фуд' },
        { value: 'bbq', label: 'Шашлыки/BBQ' }
      ],
      defaultValue: 'buffet'
    },
    {
      name: 'dietaryRestrictions',
      label: 'Особенности питания',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет ограничений' },
        { value: 'vegetarian', label: 'Есть вегетарианцы' },
        { value: 'vegan', label: 'Есть веганы' },
        { value: 'allergies', label: 'Есть аллергики' }
      ],
      defaultValue: 'none'
    }
  ],
  outputs: [
    { name: 'totalFood', label: 'Общий вес еды', type: 'number', unit: 'кг' },
    { name: 'meat', label: 'Мяса/рыбы', type: 'number', unit: 'кг' },
    { name: 'salads', label: 'Салатов/овощей', type: 'number', unit: 'кг' },
    { name: 'sides', label: 'Гарниров', type: 'number', unit: 'кг' },
    { name: 'snacks', label: 'Закусок', type: 'number', unit: 'кг' },
    { name: 'drinks', label: 'Напитков', type: 'number', unit: 'л' },
    { name: 'recommendations', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
    const guests = Number(inputs.guests);
    const duration = Number(inputs.duration);
    const mealType = String(inputs.mealType);
    const dietaryRestrictions = String(inputs.dietaryRestrictions);

    // Base consumption per person per hour (in kg)
    const baseConsumption: Record<string, number> = {
      'buffet': 0.15,
      'sitdown': 0.12,
      'finger': 0.10,
      'bbq': 0.20
    };

    const base = baseConsumption[mealType] || 0.15;
    let totalFood = guests * duration * base;

    // Distribution by category
    let meatRatio = 0.30;
    let saladRatio = 0.25;
    let sidesRatio = 0.25;
    let snacksRatio = 0.20;

    // Adjust for meal type
    if (mealType === 'bbq') {
      meatRatio = 0.50;
      saladRatio = 0.20;
      sidesRatio = 0.20;
      snacksRatio = 0.10;
    } else if (mealType === 'finger') {
      meatRatio = 0.20;
      saladRatio = 0.15;
      sidesRatio = 0.10;
      snacksRatio = 0.55;
    }

    // Adjust for dietary restrictions
    let recommendations = '';
    if (dietaryRestrictions === 'vegetarian') {
      meatRatio *= 0.6;
      saladRatio += 0.15;
      recommendations = 'Увеличьте овощные блюда, добавьте больше вегетарианских протеинов (тофу, грибы, бобовые)';
    } else if (dietaryRestrictions === 'vegan') {
      meatRatio = 0;
      saladRatio += 0.20;
      recommendations = 'Замените мясо на веганские альтернативы: falafel, овощные котлеты, грибные блюда';
    } else if (dietaryRestrictions === 'allergies') {
      recommendations = 'Уточните у гостей конкретные аллергены. Стандартные риски: орехи, глютен, молочные, морепродукты';
    } else {
      recommendations = 'Стандартный набор с учётом разнообразия вкусов';
    }

    const meat = Math.round(totalFood * meatRatio * 10) / 10;
    const salads = Math.round(totalFood * saladRatio * 10) / 10;
    const sides = Math.round(totalFood * sidesRatio * 10) / 10;
    const snacks = Math.round(totalFood * snacksRatio * 10) / 10;

    // Drinks: ~0.3-0.5L per person per hour
    const drinks = Math.round(guests * duration * 0.4 * 10) / 10;

    return [
      { value: Math.round(totalFood * 10) / 10, label: 'Общий вес еды', unit: 'кг' },
      { value: meat, label: 'Мяса/рыбы/белка', unit: 'кг' },
      { value: salads, label: 'Салатов и овощей', unit: 'кг' },
      { value: sides, label: 'Гарниров и хлеба', unit: 'кг' },
      { value: snacks, label: 'Закусок и десертов', unit: 'кг' },
      { value: drinks, label: 'Напитков (вода, сок, алкоголь)', unit: 'л' },
      { value: recommendations, label: 'Рекомендации' }
    ];
  },
  content: {
    howTo: 'Введите количество гостей, длительность мероприятия, выберите тип и особенности питания. Калькулятор рассчитает необходимое количество продуктов по категориям.',
    about: 'Планирование еды для мероприятий требует учёта типа события, длительности, диетических предпочтений гостей и соотношения категорий блюд.',
    formula: 'Общий вес = Гости × Часы × Норма потребления; Нормы: фуршет 150 г/чел/ч, банкет 120 г/чел/ч, BBQ 200 г/чел/ч',
    faq: [
      {
        question: 'Как рассчитать напитки на свадьбу?',
        answer: 'На 4-5 часов: вода 1.5 л на человека, алкоголь (если планируется) 0.5-1 л на человека, безалкогольные 0.5 л. Учтите детей и трезвенников.'
      },
      {
        question: 'Сколько мяса на шашлык на 10 человек?',
        answer: 'На шашлык/BBQ норма выше: 300-400 г сырого мяса на человека. Для 10 человек — 3-4 кг мяса плюс овощи для гриля.'
      },
      {
        question: 'Какой процент запаса делать?',
        answer: 'Делайте запас 10-15%. Лучше остаться с едой, чем оставить гостей голодными. Остатки можно раздать с собой или использовать в течение недели.'
      }
    ],
    sources: [
      { title: 'Планирование кейтеринга', url: 'https://www.thekitchn.com/catering-planning-guide-231004' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 3. Калькулятор чаевых по странам (Tip calculator by country)
export const tipByCountryCalculator: Calculator = {
  id: 'tip-by-country-calculator',
  slug: 'chaevye-po-stranam',
  title: 'Калькулятор чаевых по странам',
  description: 'Расчёт чаевых с учётом местных обычаев и традиций разных стран',
  category: 'povsednevnoe',
  subcategory: 'everyday-dengi',
  type: 'formula',
  inputs: [
    {
      name: 'country',
      label: 'Страна',
      type: 'select',
      options: [
        { value: 'usa', label: 'США' },
        { value: 'uk', label: 'Великобритания' },
        { value: 'germany', label: 'Германия' },
        { value: 'france', label: 'Франция' },
        { value: 'russia', label: 'Россия' },
        { value: 'japan', label: 'Япония' },
        { value: 'italy', label: 'Италия' },
        { value: 'spain', label: 'Испания' },
        { value: 'uae', label: 'ОАЭ' },
        { value: 'thailand', label: 'Таиланд' }
      ],
      defaultValue: 'usa'
    },
    {
      name: 'billAmount',
      label: 'Сумма чека',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 0,
      step: 0.01
    },
    {
      name: 'serviceQuality',
      label: 'Качество обслуживания',
      type: 'select',
      options: [
        { value: 'poor', label: 'Плохое' },
        { value: 'average', label: 'Среднее' },
        { value: 'good', label: 'Хорошее' },
        { value: 'excellent', label: 'Отличное' }
      ],
      defaultValue: 'good'
    },
    {
      name: 'serviceType',
      label: 'Тип заведения',
      type: 'select',
      options: [
        { value: 'restaurant', label: 'Ресторан' },
        { value: 'cafe', label: 'Кафе' },
        { value: 'bar', label: 'Бар' },
        { value: 'taxi', label: 'Такси' },
        { value: 'hotel', label: 'Отель' }
      ],
      defaultValue: 'restaurant'
    }
  ],
  outputs: [
    { name: 'tipPercent', label: 'Процент чаевых', type: 'number', unit: '%' },
    { name: 'tipAmount', label: 'Сумма чаевых', type: 'number', unit: 'local' },
    { name: 'totalAmount', label: 'Итого с чаевыми', type: 'number', unit: 'local' },
    { name: 'customsNote', label: 'Местные обычаи', type: 'text' }
  ],
  calculate: (inputs) => {
    const country = String(inputs.country);
    const billAmount = Number(inputs.billAmount);
    const serviceQuality = String(inputs.serviceQuality);
    const serviceType = String(inputs.serviceType);

    // Base tip percentage by country
    const baseTips: Record<string, number> = {
      'usa': 15,
      'uk': 10,
      'germany': 5,
      'france': 0,
      'russia': 5,
      'japan': 0,
      'italy': 10,
      'spain': 5,
      'uae': 10,
      'thailand': 10
    };

    // Quality multipliers
    const qualityMult: Record<string, number> = {
      'poor': 0,
      'average': 0.8,
      'good': 1.0,
      'excellent': 1.3
    };

    let tipPercent = baseTips[country] * qualityMult[serviceQuality];

    // Adjust by service type
    if (country === 'usa') {
      if (serviceType === 'bar') tipPercent = Math.max(tipPercent, 1);
      if (serviceType === 'taxi') tipPercent = 15;
      if (serviceType === 'hotel') tipPercent = 2;
    }

    // Special cases
    const customs: Record<string, string> = {
      'usa': 'В США чаевые обязательны — 15-20% в ресторанах. Оставлять меньше считается оскорблением.',
      'uk': 'В UK чаевые приветствуются, но не обязательны. Округлите сумму или оставьте 10%.',
      'germany': 'В Германии чаевые не обязательны, но принято округлять вверх или оставлять 5-10%.',
      'france': 'Во Франции service compris (обслуживание включено) — чаевые не обязательны, но можно оставить мелочь.',
      'russia': 'В России чаевые 5-10% при хорошем обслуживании. Часто включены в счёт как сервисный сбор.',
      'japan': 'В Японии чаевые НЕ принято оставлять — это может обидеть персонал. Отличный сервис включён в цену.',
      'italy': 'В Италии coperto (покрытие) включено в счёт. Чаевые 5-10% за отличный сервис.',
      'spain': 'В Испании чаевые не обязательны, но принято оставлять мелочь (5-10%).',
      'uae': 'В ОАЭ чаевые приветствуются — 10% в ресторанах, 5-10 таксистам.',
      'thailand': 'В Таиланде чаевые не обязательны, но 10-20 бат (или 10%) за хороший сервис будут оценены.'
    };

    const tipAmount = Math.round(billAmount * (tipPercent / 100) * 100) / 100;
    const totalAmount = Math.round((billAmount + tipAmount) * 100) / 100;

    return [
      { value: Math.round(tipPercent), label: 'Рекомендуемый процент', unit: '%' },
      { value: tipAmount, label: 'Сумма чаевых', unit: '$' },
      { value: totalAmount, label: 'Итого с чаевыми', unit: '$' },
      { value: customs[country], label: 'Местные обычаи' }
    ];
  },
  content: {
    howTo: 'Выберите страну, введите сумму чека и оцените качество обслуживания. Калькулятор покажет рекомендуемые чаевые с учётом местных традиций.',
    about: 'Традиции чаевых сильно различаются по странам: в США это почти обязательно, в Японии — не принято, в Европе — по желанию.',
    formula: 'Чаевые = Сумма чека × Местный процент × Коэффициент качества',
    faq: [
      {
        question: 'Сколько чаевых в США?',
        answer: 'В ресторанах — 15-20% от чека. В барах — $1-2 за напиток. В такси — 10-15%. В отелях — $1-2 за чемодан, $2-5 за уборку.'
      },
      {
        question: 'Почему в Японии не оставляют чаевые?',
        answer: 'В японской культуре отличный сервис — это стандарт, включённый в цену. Чаевые могут вызвать неловкость или восприниматься как снисхождение.'
      },
      {
        question: 'Что такое service compris во Франции?',
        answer: 'Это означает "обслуживание включено". Французский закон требует включать 15% на обслуживание в цену. Дополнительные чаевые не обязательны, но можно оставить мелочь за отличный сервис.'
      }
    ],
    sources: [
      { title: 'Tipping etiquette by country', url: 'https://www.tripadvisor.com/TippingEtiquette' },
      { title: 'Чаевые в разных странах', url: 'https://www.theguardian.com/travel/2019/jun/17/tipping-etiquette-world-guide' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 4. Разделение счёта с учётом позиций (Split bill with items)
export const splitBillWithItemsCalculator: Calculator = {
  id: 'split-bill-with-items-calculator',
  slug: 'razdelenie-po-poziciyam',
  title: 'Разделение счёта с учётом позиций',
  description: 'Точное разделение счёта с учётом того, кто что заказал',
  category: 'povsednevnoe',
  subcategory: 'everyday-dengi',
  type: 'formula',
  inputs: [
    {
      name: 'people',
      label: 'Количество человек',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 2,
      max: 20
    },
    {
      name: 'items',
      label: 'Позиции (JSON формат)',
      type: 'text',
      placeholder: 'Пример: [{"name":"Пицца","price":600,"who":[0,1]},{"name":"Салат","price":400,"who":[2]},{"name":"Напитки","price":300,"who":[0,1,2]}]',
      defaultValue: '[{"name":"Пицца","price":600,"who":[0,1]},{"name":"Салат","price":400,"who":[2]},{"name":"Напитки","price":300,"who":[0,1,2]}]'
    },
    {
      name: 'taxRate',
      label: 'Налог (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 50
    },
    {
      name: 'tipPercent',
      label: 'Чаевые (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 50
    }
  ],
  outputs: [
    { name: 'subtotal', label: 'Подытог', type: 'number', unit: '₽' },
    { name: 'tax', label: 'Налог', type: 'number', unit: '₽' },
    { name: 'tip', label: 'Чаевые', type: 'number', unit: '₽' },
    { name: 'total', label: 'Итого', type: 'number', unit: '₽' },
    { name: 'perPerson', label: 'С каждого', type: 'text' }
  ],
  calculate: (inputs) => {
    const people = Number(inputs.people);
    const itemsStr = String(inputs.items);
    const taxRate = Number(inputs.taxRate);
    const tipPercent = Number(inputs.tipPercent);

    let items: { name: string; price: number; who: number[] }[] = [];
    try {
      items = JSON.parse(itemsStr);
    } catch {
      return [
        { value: 0, label: 'Ошибка', unit: '₽' },
        { value: 0, label: 'Ошибка', unit: '₽' },
        { value: 0, label: 'Ошибка', unit: '₽' },
        { value: 0, label: 'Ошибка', unit: '₽' },
        { value: 'Некорректный JSON в поле "Позиции"', label: 'Ошибка' }
      ];
    }

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);

    // Calculate tax and tip
    const tax = subtotal * (taxRate / 100);
    const tip = subtotal * (tipPercent / 100);
    const total = subtotal + tax + tip;

    // Calculate per person
    const amounts: number[] = new Array(people).fill(0);

    items.forEach(item => {
      const perPerson = item.price / item.who.length;
      item.who.forEach(personIndex => {
        if (personIndex >= 0 && personIndex < people) {
          amounts[personIndex] += perPerson;
        }
      });
    });

    // Add proportional tax and tip
    amounts.forEach((amount, i) => {
      const ratio = amount / subtotal;
      amounts[i] = amount + (tax * ratio) + (tip * ratio);
    });

    const perPersonResult = amounts.map((amount, i) => 
      `Чел ${i + 1}: ${Math.round(amount * 100) / 100} ₽`
    ).join(', ');

    return [
      { value: Math.round(subtotal * 100) / 100, label: 'Подытог (блюда)', unit: '₽' },
      { value: Math.round(tax * 100) / 100, label: 'Налог', unit: '₽' },
      { value: Math.round(tip * 100) / 100, label: 'Чаевые', unit: '₽' },
      { value: Math.round(total * 100) / 100, label: 'Итого', unit: '₽' },
      { value: perPersonResult, label: 'С каждого' }
    ];
  },
  content: {
    howTo: 'Укажите количество человек, введите позиции в формате JSON (название, цена, кто ел — индексы от 0). Калькулятор точно разделит счёт.',
    about: 'Позволяет точно разделить счёт, когда кто-то заказал больше или меньше других. Учитывает налог и чаевые пропорционально заказу каждого.',
    formula: 'Сумма человека = Сумма позиций / Кол-во евших + Пропорциональный налог и чаевые',
    faq: [
      {
        question: 'Как указать позиции?',
        answer: 'Формат JSON: [{"name":"Название","price":цена,"who":[индексы]}]. Индексы начинаются с 0. Например, для 3 человек: [0,1,2] — все ели, [0] — только первый.'
      },
      {
        question: 'А если делим поровну?',
        answer: 'Для всех позиций укажите "who":[0,1,2,...] со всеми индексами. Тогда сумма разделится поровну между всеми.'
      },
      {
        question: 'Как учесть доставку или сервисный сбор?',
        answer: 'Добавьте отдельную позицию с названием "Доставка" или "Сервисный сбор" и укажите цену.'
      }
    ],
    sources: [
      { title: 'Splitwise — Bill splitting app', url: 'https://www.splitwise.com/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 5. Время готовки (Cooking time calculator)
export const cookingTimeCalculator: Calculator = {
  id: 'cooking-time-calculator',
  slug: 'vremya-gotovki',
  title: 'Время готовки',
  description: 'Расчёт времени приготовления разных блюд с учётом веса и способа',
  category: 'povsednevnoe',
  subcategory: 'everyday-eda',
  type: 'formula',
  inputs: [
    {
      name: 'dishType',
      label: 'Тип блюда',
      type: 'select',
      options: [
        { value: 'meat', label: 'Мясо (говядина, свинина, баранина)' },
        { value: 'poultry', label: 'Птица (курица, индейка)' },
        { value: 'fish', label: 'Рыба' },
        { value: 'vegetables', label: 'Овощи' },
        { value: 'grains', label: 'Крупы и макароны' },
        { value: 'eggs', label: 'Яйца' }
      ],
      defaultValue: 'meat'
    },
    {
      name: 'weight',
      label: 'Вес/количество',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0.1,
      max: 20,
      step: 0.1
    },
    {
      name: 'cookingMethod',
      label: 'Способ приготовления',
      type: 'select',
      options: [
        { value: 'oven', label: 'Духовка' },
        { value: 'grill', label: 'Гриль' },
        { value: 'pan', label: 'Сковорода' },
        { value: 'boil', label: 'Варка' },
        { value: 'steam', label: 'На пару' },
        { value: 'slow', label: 'Медленное приготовление' }
      ],
      defaultValue: 'oven'
    },
    {
      name: 'doneness',
      label: 'Степень готовности',
      type: 'select',
      options: [
        { value: 'rare', label: 'Rare (редкий, для мяса)' },
        { value: 'medium', label: 'Medium (средний)' },
        { value: 'well', label: 'Well done (хорошо прожаренный)' }
      ],
      defaultValue: 'medium'
    }
  ],
  outputs: [
    { name: 'cookingTime', label: 'Время готовки', type: 'text' },
    { name: 'internalTemp', label: 'Внутренняя температура', type: 'text' },
    { name: 'restTime', label: 'Время отдыха', type: 'text' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs) => {
    const dishType = String(inputs.dishType);
    const weight = Number(inputs.weight);
    const cookingMethod = String(inputs.cookingMethod);
    const doneness = String(inputs.doneness);

    // Base times per kg by method and dish
    const baseTimes: Record<string, Record<string, number>> = {
      'meat': {
        'oven': 60,
        'grill': 30,
        'pan': 20,
        'slow': 120,
        'boil': 45,
        'steam': 50
      },
      'poultry': {
        'oven': 50,
        'grill': 25,
        'pan': 15,
        'slow': 90,
        'boil': 40,
        'steam': 40
      },
      'fish': {
        'oven': 20,
        'grill': 12,
        'pan': 8,
        'slow': 30,
        'boil': 10,
        'steam': 15
      },
      'vegetables': {
        'oven': 30,
        'grill': 15,
        'pan': 10,
        'slow': 60,
        'boil': 8,
        'steam': 12
      },
      'grains': {
        'oven': 0,
        'grill': 0,
        'pan': 15,
        'slow': 0,
        'boil': 15,
        'steam': 20
      },
      'eggs': {
        'oven': 15,
        'grill': 0,
        'pan': 5,
        'slow': 0,
        'boil': 8,
        'steam': 12
      }
    };

    const baseTime = baseTimes[dishType]?.[cookingMethod] || 30;
    let cookingMinutes = baseTime * weight;

    // Adjust for doneness (meat only)
    if (dishType === 'meat' || dishType === 'poultry') {
      const donenessMult: Record<string, number> = { 'rare': 0.7, 'medium': 1.0, 'well': 1.3 };
      cookingMinutes *= donenessMult[doneness] || 1.0;
    }

    // Temperature recommendations
    const temps: Record<string, Record<string, string>> = {
      'meat': { 'rare': '52°C', 'medium': '60°C', 'well': '71°C' },
      'poultry': { 'rare': 'Недопустимо', 'medium': '74°C', 'well': '77°C' },
      'fish': { 'rare': '46°C', 'medium': '52°C', 'well': '60°C' },
      'vegetables': { 'rare': 'Al dente', 'medium': 'Готовы', 'well': 'Мягкие' },
      'grains': { 'rare': 'Al dente', 'medium': 'Готовы', 'well': 'Мягкие' },
      'eggs': { 'rare': '62°C', 'medium': '70°C', 'well': '77°C' }
    };

    const hours = Math.floor(cookingMinutes / 60);
    const minutes = Math.round(cookingMinutes % 60);
    const timeStr = hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;

    // Rest time
    const restMinutes = dishType === 'meat' || dishType === 'poultry' ? 10 : 5;

    // Tips
    const tips: Record<string, string> = {
      'meat': 'Достаньте из холодильника за 30 мин до готовки. Используйте термометр для точности.',
      'poultry': 'Кости проверяйте — сок должен быть прозрачным. Не разрезайте сразу — дайте отдохнуть.',
      'fish': 'Рыба готова, когда легко разделяется вилкой. Не пересушите — станет резиновой.',
      'vegetables': 'Для яркого цвета — бланшируйте 2 мин, затем ледяная вода.',
      'grains': 'Пропорция крупа:вода обычно 1:2. Не мешайте ризотто постоянно.',
      'eggs': 'Для мягкого желтка — готовьте при низкой температуре.'
    };

    return [
      { value: timeStr, label: 'Примерное время готовки' },
      { value: temps[dishType]?.[doneness] || '—', label: 'Целевая температура' },
      { value: `${restMinutes} минут`, label: 'Время отдыха перед подачей' },
      { value: tips[dishType] || '', label: 'Полезные советы' }
    ];
  },
  content: {
    howTo: 'Выберите тип блюда, введите вес, выберите способ приготовления и степень готовности. Калькулятор рассчитает примерное время и температуру.',
    about: 'Время готовки зависит от типа продукта, веса, способа приготовления и желаемой степени готовности. Внутренняя температура — самый точный способ проверки.',
    formula: 'Время = Базовое время × Вес × Коэффициент готовности; Базовое время: духовка 45-60 мин/кг, гриль 20-30 мин/кг',
    faq: [
      {
        question: 'Почему мясо нужно "отдыхать" после готовки?',
        answer: 'При отдыхе соки равномерно распределяются по мясу. Если разрезать сразу — сок вытечет, мясо станет сухим.'
      },
      {
        question: 'Как проверить готовность без термометра?',
        answer: 'Мясо — пальцем: редкий = мягкое как мочка уха, средний = как подбородок, хорошо прожаренный = как лоб. Рыба — должна легко расслаиваться вилкой.'
      },
      {
        question: 'Влияет ли размер куска на время?',
        answer: 'Да! Тонкий стейк готовится 3-4 минуты с каждой стороны, толстый — 6-8 минут. Для равномерной готовки толстое мясо лучше доводить в духовке после обжарки.'
      }
    ],
    sources: [
      { title: 'Internal cooking temperatures — USDA', url: 'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 6. Калькулятор ингредиентов (Recipe scaling calculator)
export const recipeScalingCalculator: Calculator = {
  id: 'recipe-scaling-calculator',
  slug: 'mashtabirovanie-recepta',
  title: 'Калькулятор ингредиентов',
  description: 'Пересчёт количества ингредиентов при изменении порций рецепта',
  category: 'povsednevnoe',
  subcategory: 'everyday-eda',
  type: 'formula',
  inputs: [
    {
      name: 'originalServings',
      label: 'Порций в оригинальном рецепте',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      min: 1,
      max: 50
    },
    {
      name: 'targetServings',
      label: 'Нужно порций',
      type: 'number',
      placeholder: '6',
      defaultValue: 6,
      min: 1,
      max: 100
    },
    {
      name: 'ingredients',
      label: 'Ингредиенты (JSON формат)',
      type: 'text',
      placeholder: 'Пример: [{"name":"Мука","amount":200,"unit":"г"},{"name":"Молоко","amount":500,"unit":"мл"},{"name":"Яйца","amount":2,"unit":"шт"}]',
      defaultValue: '[{"name":"Мука","amount":200,"unit":"г"},{"name":"Молоко","amount":500,"unit":"мл"},{"name":"Яйца","amount":2,"unit":"шт"}]'
    }
  ],
  outputs: [
    { name: 'scaleFactor', label: 'Коэффициент масштабирования', type: 'number', unit: '×' },
    { name: 'scaledIngredients', label: 'Новые количества', type: 'text' },
    { name: 'notes', label: 'Примечания', type: 'text' }
  ],
  calculate: (inputs) => {
    const originalServings = Number(inputs.originalServings);
    const targetServings = Number(inputs.targetServings);
    const ingredientsStr = String(inputs.ingredients);

    let ingredients: { name: string; amount: number; unit: string }[] = [];
    try {
      ingredients = JSON.parse(ingredientsStr);
    } catch {
      return [
        { value: 0, label: 'Ошибка', unit: '×' },
        { value: 'Некорректный JSON', label: 'Ошибка' },
        { value: 'Проверьте формат ингредиентов', label: 'Ошибка' }
      ];
    }

    const scaleFactor = targetServings / originalServings;

    // Scale ingredients
    const scaled = ingredients.map(ing => {
      let newAmount = ing.amount * scaleFactor;
      
      // Round eggs and similar discrete items to nearest whole number
      if (ing.unit === 'шт' || ing.unit.includes('яйц')) {
        newAmount = Math.round(newAmount);
      } else {
        // Round to 1 decimal for other items
        newAmount = Math.round(newAmount * 10) / 10;
      }
      
      return `${ing.name}: ${newAmount} ${ing.unit}`;
    });

    // Notes based on scale
    let notes = '';
    if (scaleFactor > 2) {
      notes = 'При увеличении более чем в 2 раза: время выпечки может увеличиться. Используйте форму большего размера или готовьте партиями.';
    } else if (scaleFactor < 0.5) {
      notes = 'При уменьшении: время готовки сократится. Следите за готовностью, чтобы не пересушить.';
    } else {
      notes = 'Пропорции сохранены. Время и температура готовки остаются примерно теми же.';
    }

    return [
      { value: Math.round(scaleFactor * 100) / 100, label: 'Множитель', unit: '×' },
      { value: scaled.join('; '), label: 'Пересчитанные ингредиенты' },
      { value: notes, label: 'Важные примечания' }
    ];
  },
  content: {
    howTo: 'Укажите порций в оригинальном рецепте, нужное количество порций и список ингредиентов с количествами. Калькулятор пересчитает пропорции.',
    about: 'При масштабировании рецептов важно сохранять пропорции, но также учитывать особенности: яйца округлять, время готовки может меняться при больших изменениях.',
    formula: 'Новое количество = Оригинал × (Нужно порций / Было порций)',
    faq: [
      {
        question: 'Как масштабировать время выпечки?',
        answer: 'Маленькие изменения (×1.5): время то же. Большие (×2+): увеличьте время на 10-20% или используйте несколько форм. Для пирогов проверяйте готовность зубочисткой.'
      },
      {
        question: 'Что если ингредиент не делится?',
        answer: 'Яйца, луковицы, зубчики чеснока округляйте до целых чисел. Для дрожжевого теста используйте вес — можно добавить половинку яйца (взбить и отмерить половину).'
      },
      {
        question: 'Как масштабировать специи?',
        answer: 'Специи масштабируйте осторожно — не всегда линейно. Для больших объёмов добавляйте специи постепенно и пробуйте. Соль и перец — с осторожностью, лучше недосолить и досолить.'
      }
    ],
    sources: [
      { title: 'Recipe scaling guide — King Arthur Baking', url: 'https://www.kingarthurbaking.com/pro/recipe-scaling' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 7. Калькулятор скидок (Discount calculator)
export const discountCalculator: Calculator = {
  id: 'discount-calculator',
  slug: 'kalkulyator-skidok',
  title: 'Калькулятор скидок',
  description: 'Расчёт итоговой цены с учётом различных типов скидок и акций',
  category: 'povsednevnoe',
  subcategory: 'everyday-dengi',
  type: 'formula',
  inputs: [
    {
      name: 'originalPrice',
      label: 'Начальная цена (₽)',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      min: 0,
      step: 0.01
    },
    {
      name: 'discountType',
      label: 'Тип скидки',
      type: 'select',
      options: [
        { value: 'percent', label: 'Процентная (%)' },
        { value: 'fixed', label: 'Фиксированная сумма' },
        { value: 'bogo', label: '2 по цене 1 (BOGO)' },
        { value: 'bundle', label: '3 за цену 2' },
        { value: 'half', label: 'Второй со скидкой 50%' }
      ],
      defaultValue: 'percent'
    },
    {
      name: 'discountValue',
      label: 'Значение скидки',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 0,
      step: 0.01
    },
    {
      name: 'quantity',
      label: 'Количество товаров',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 1,
      max: 100
    },
    {
      name: 'additionalDiscount',
      label: 'Дополнительная скидка (%)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 100
    }
  ],
  outputs: [
    { name: 'originalTotal', label: 'Сумма без скидок', type: 'number', unit: '₽' },
    { name: 'finalPrice', label: 'Итоговая цена', type: 'number', unit: '₽' },
    { name: 'totalSavings', label: 'Общая экономия', type: 'number', unit: '₽' },
    { name: 'effectiveDiscount', label: 'Эффективная скидка', type: 'number', unit: '%' },
    { name: 'perItem', label: 'Цена за штуку', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const originalPrice = Number(inputs.originalPrice);
    const discountType = String(inputs.discountType);
    const discountValue = Number(inputs.discountValue);
    const quantity = Number(inputs.quantity);
    const additionalDiscount = Number(inputs.additionalDiscount);

    const originalTotal = originalPrice * quantity;
    let finalPrice = originalTotal;

    // Apply main discount
    switch (discountType) {
      case 'percent':
        finalPrice = originalTotal * (1 - discountValue / 100);
        break;
      case 'fixed':
        finalPrice = Math.max(0, originalTotal - (discountValue * quantity));
        break;
      case 'bogo':
        // Buy 1 get 1: pay for half
        finalPrice = originalPrice * Math.ceil(quantity / 2);
        break;
      case 'bundle':
        // 3 for 2: every 3rd free
        const setsOf3 = Math.floor(quantity / 3);
        const remainder = quantity % 3;
        finalPrice = originalPrice * (setsOf3 * 2 + remainder);
        break;
      case 'half':
        // Second at 50%
        const fullPrice = Math.ceil(quantity / 2);
        const halfPrice = Math.floor(quantity / 2);
        finalPrice = (originalPrice * fullPrice) + (originalPrice * 0.5 * halfPrice);
        break;
    }

    // Apply additional discount
    finalPrice = finalPrice * (1 - additionalDiscount / 100);
    finalPrice = Math.max(0, finalPrice);

    const totalSavings = originalTotal - finalPrice;
    const effectiveDiscount = originalTotal > 0 ? (totalSavings / originalTotal) * 100 : 0;
    const perItem = quantity > 0 ? finalPrice / quantity : 0;

    return [
      { value: Math.round(originalTotal * 100) / 100, label: 'Без скидок', unit: '₽' },
      { value: Math.round(finalPrice * 100) / 100, label: 'Цена со скидкой', unit: '₽' },
      { value: Math.round(totalSavings * 100) / 100, label: 'Вы экономите', unit: '₽' },
      { value: Math.round(effectiveDiscount * 100) / 100, label: 'Эффективная скидка', unit: '%' },
      { value: Math.round(perItem * 100) / 100, label: 'Цена за штуку', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите начальную цену, выберите тип скидки, укажите значение и количество. Добавьте дополнительную скидку если есть. Калькулятор покажет итоговую цену и экономию.',
    about: 'Магазины используют разные типы скидок: процентные, фиксированные, акции типа "2 по цене 1", комплексные скидки. Этот калькулятор учитывает все варианты.',
    formula: 'Процент: Цена × (1 - %/100); BOGO: Платите за половину товаров; 3 за 2: Каждый 3-й бесплатно',
    faq: [
      {
        question: 'Что выгоднее: 30% скидка или 3 за цену 2?',
        answer: 'При покупке 3 штук: 30% скидка = платите 70% от 3 = 2.1 цены. 3 за цену 2 = платите за 2. Выгоднее 3 за 2 (экономия 33% vs 30%).'
      },
      {
        question: 'Как считается "Второй товар со скидкой 50%"?',
        answer: 'При чётном количестве: половина по полной, половина по половине. Итого скидка 25%. При нечётном: округление вверх по полной цене.'
      },
      {
        question: 'Можно ли комбинировать скидки?',
        answer: 'Зависит от правил магазина. Обычно процентные скидки не суммируются, но процент + фиксированная может работать. Читайте условия акций.'
      }
    ],
    sources: [
      { title: 'Как считать скидки — Lifehacker', url: 'https://lifehacker.ru/discount-calculator' }
    ],
    updatedAt: '2026-04-07'
  }
};

// 8. Калькулятор налогов (Tax calculator)
export const taxCalculator: Calculator = {
  id: 'tax-calculator-price',
  slug: 'kalkulyator-nalogov',
  title: 'Калькулятор налогов',
  description: 'Расчёт цены с налогом или выделение налога из общей суммы',
  category: 'povsednevnoe',
  subcategory: 'everyday-dengi',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма (₽)',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      min: 0,
      step: 0.01
    },
    {
      name: 'taxRate',
      label: 'Ставка налога (%)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      name: 'taxIncluded',
      label: 'Налог включён в сумму',
      type: 'select',
      options: [
        { value: 'false', label: 'Нет — добавить налог' },
        { value: 'true', label: 'Да — выделить налог' }
      ],
      defaultValue: 'false'
    },
    {
      name: 'calculationMode',
      label: 'Режим расчёта',
      type: 'select',
      options: [
        { value: 'single', label: 'Одна ставка' },
        { value: 'vat20', label: 'НДС 20% (РФ)' },
        { value: 'vat10', label: 'НДС 10% (РФ, льготный)' },
        { value: 'us_sales', label: 'Sales tax США (8%)' }
      ],
      defaultValue: 'single'
    }
  ],
  outputs: [
    { name: 'subtotal', label: 'Сумма без налога', type: 'number', unit: '₽' },
    { name: 'taxAmount', label: 'Налог', type: 'number', unit: '₽' },
    { name: 'total', label: 'Итого', type: 'number', unit: '₽' },
    { name: 'breakdown', label: 'Разбивка', type: 'text' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const customTaxRate = Number(inputs.taxRate);
    const taxIncluded = String(inputs.taxIncluded) === 'true';
    const mode = String(inputs.calculationMode);

    // Determine tax rate
    let taxRate = customTaxRate;
    switch (mode) {
      case 'vat20':
        taxRate = 20;
        break;
      case 'vat10':
        taxRate = 10;
        break;
      case 'us_sales':
        taxRate = 8;
        break;
    }

    let subtotal: number;
    let taxAmount: number;
    let total: number;

    if (taxIncluded) {
      // Tax is included in the amount - extract it
      subtotal = amount / (1 + taxRate / 100);
      taxAmount = amount - subtotal;
      total = amount;
    } else {
      // Tax is not included - add it
      subtotal = amount;
      taxAmount = amount * (taxRate / 100);
      total = amount + taxAmount;
    }

    // Format numbers
    const formatNum = (n: number) => Math.round(n * 100) / 100;

    let breakdown = '';
    if (mode === 'vat20') {
      breakdown = 'НДС 20% — стандартная ставка в РФ для большинства товаров и услуг';
    } else if (mode === 'vat10') {
      breakdown = 'НДС 10% — льготная ставка в РФ для продуктов, лекарств, детских товаров';
    } else if (mode === 'us_sales') {
      breakdown = 'Sales tax — от 0% до 13% в зависимости от штата США. Использована средняя ставка 8%';
    } else {
      breakdown = `Ставка ${taxRate}% — пользовательская`;
    }

    return [
      { value: formatNum(subtotal), label: taxIncluded ? 'Сумма без налога' : 'Подытог', unit: '₽' },
      { value: formatNum(taxAmount), label: `Налог (${taxRate}%)`, unit: '₽' },
      { value: formatNum(total), label: taxIncluded ? 'Всего (с налогом)' : 'Итого к оплате', unit: '₽' },
      { value: breakdown, label: 'Информация' }
    ];
  },
  content: {
    howTo: 'Введите сумму, выберите ставку налога или режим расчёта, укажите включён ли налог в сумму. Калькулятор покажет разбивку по сумме и налогу.',
    about: 'Налоги могут включаться в цену (как в Европе и РФ) или добавляться сверху (как в США). Калькулятор работает в обоих режимах и поддерживает разные налоговые системы.',
    formula: 'Налог добавляется: Итого = Сумма × (1 + Ставка/100); Налог включён: Без налога = Сумма / (1 + Ставка/100)',
    faq: [
      {
        question: 'Как выделить НДС 20% из суммы?',
        answer: 'Используйте формулу: Сумма без НДС = Общая сумма / 1.20. Например, из 1200 ₽ НДС составляет 200 ₽ (1200/1.2 = 1000 без НДС, налог 200 ₽).'
      },
      {
        question: 'Чем отличается НДС от sales tax?',
        answer: 'НДС (Value Added Tax) — каскадный налог на каждом этапе производства, обычно включён в цену. Sales tax — конечный налог для потребителя, обычно добавляется к цене на кассе.'
      },
      {
        question: 'Какие ставки НДС в России?',
        answer: '20% — стандартная для большинства товаров. 10% — льготная для продуктов, детских товаров, лекарств, книг. 0% — для экспорта.'
      }
    ],
    sources: [
      { title: 'НДС — Википедия', url: 'https://ru.wikipedia.org/wiki/Налог_на_добавленную_стоимость' },
      { title: 'Sales tax in the US', url: 'https://en.wikipedia.org/wiki/Sales_taxes_in_the_United_States' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Export all calculators
export const dailyMore1Calculators = [
  mealPlannerCalculator,
  partyFoodCalculator,
  tipByCountryCalculator,
  splitBillWithItemsCalculator,
  cookingTimeCalculator,
  recipeScalingCalculator,
  discountCalculator,
  taxCalculator,
];
