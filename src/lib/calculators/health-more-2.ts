import { Calculator } from '../types';

// Расширенная база данных русских продуктов (50+ позиций)
const russianFoodDatabase: Record<string, { name: string; calories: number; protein: number; fat: number; carbs: number }> = {
  // Каши и хлеб
  'grechka': { name: 'Гречневая каша', calories: 132, protein: 4.5, fat: 1.6, carbs: 27 },
  'ovsyanka': { name: 'Овсяная каша на воде', calories: 68, protein: 2.4, fat: 1.4, carbs: 12 },
  'pshenka': { name: 'Пшенная каша', calories: 135, protein: 3.5, fat: 1.0, carbs: 25 },
  'ris': { name: 'Рис отварной', calories: 130, protein: 2.7, fat: 0.3, carbs: 28 },
  'manka': { name: 'Манная каша', calories: 98, protein: 2.5, fat: 3.2, carbs: 16 },
  'rzhanye_hlebcy': { name: 'Ржаные хлебцы', calories: 340, protein: 8, fat: 2, carbs: 70 },
  'borodino': { name: 'Хлеб Бородинский', calories: 202, protein: 6, fat: 1, carbs: 40 },
  'baton': { name: 'Батон нарезной', calories: 264, protein: 8, fat: 3, carbs: 50 },

  // Молочные продукты
  'moloko_3_2': { name: 'Молоко 3.2%', calories: 62, protein: 3.2, fat: 3.2, carbs: 4.8 },
  'kefir_2_5': { name: 'Кефир 2.5%', calories: 52, protein: 2.9, fat: 2.5, carbs: 4.0 },
  'kefir_3_2': { name: 'Кефир 3.2%', calories: 58, protein: 3.0, fat: 3.2, carbs: 4.0 },
  'ryazhenka': { name: 'Ряженка 2.5%', calories: 54, protein: 3.0, fat: 2.5, carbs: 4.2 },
  'prostokvasha': { name: 'Простокваша', calories: 58, protein: 2.9, fat: 2.5, carbs: 4.1 },
  'tvorog_5': { name: 'Творог 5%', calories: 120, protein: 17, fat: 5, carbs: 3 },
  'tvorog_9': { name: 'Творог 9%', calories: 159, protein: 16, fat: 9, carbs: 2.5 },
  'tvorog_18': { name: 'Творог 18%', calories: 232, protein: 14, fat: 18, carbs: 2.5 },
  'smetana_15': { name: 'Сметана 15%', calories: 158, protein: 2.7, fat: 15, carbs: 3 },
  'smetana_20': { name: 'Сметана 20%', calories: 206, protein: 2.5, fat: 20, carbs: 3.2 },
  'syr_tv': { name: 'Сыр твёрдый', calories: 350, protein: 25, fat: 27, carbs: 2 },
  'syr_pl': { name: 'Сыр плавленый', calories: 290, protein: 16, fat: 24, carbs: 4 },
  'syr_tvor': { name: 'Сырок творожный', calories: 190, protein: 6, fat: 12, carbs: 15 },
  'maslo_sl': { name: 'Сливочное масло', calories: 717, protein: 0.9, fat: 81, carbs: 0.1 },
  'margarin': { name: 'Маргарин', calories: 717, protein: 0.2, fat: 81, carbs: 0.7 },
  'yogurt_grech': { name: 'Йогурт греческий', calories: 97, protein: 9, fat: 5, carbs: 3.6 },

  // Мясо
  'govyadina_vr': { name: 'Говядина варёная', calories: 175, protein: 25, fat: 8, carbs: 0 },
  'govyadina_zh': { name: 'Говядина жареная', calories: 218, protein: 25, fat: 12, carbs: 0 },
  'svinina_vr': { name: 'Свинина варёная', calories: 252, protein: 22, fat: 18, carbs: 0 },
  'svinina_zh': { name: 'Свинина жареная', calories: 298, protein: 22, fat: 22, carbs: 0 },
  'kur_grud': { name: 'Куриная грудка', calories: 165, protein: 31, fat: 3.6, carbs: 0 },
  'kur_bedro': { name: 'Куриное бедро', calories: 184, protein: 20, fat: 11, carbs: 0 },
  'kur_jaico': { name: 'Яйцо куриное', calories: 155, protein: 13, fat: 11, carbs: 1.1 },
  'kur_jaico_vr': { name: 'Яйцо варёное', calories: 155, protein: 13, fat: 11, carbs: 1.1 },
  'kur_jaico_je': { name: 'Яичница', calories: 175, protein: 13, fat: 13, carbs: 1.1 },
  'ind_kur': { name: 'Индейка', calories: 135, protein: 30, fat: 1, carbs: 0 },
  'baran': { name: 'Баранина', calories: 294, protein: 25, fat: 21, carbs: 0 },
  'krolik': { name: 'Кролик', calories: 173, protein: 21, fat: 10, carbs: 0 },
  'vetchina': { name: 'Ветчина', calories: 107, protein: 18, fat: 4, carbs: 0 },
  'kolbasa_dok': { name: 'Колбаса докторская', calories: 260, protein: 13, fat: 22, carbs: 0 },
  'kolbasa_milk': { name: 'Молочная колбаса', calories: 391, protein: 11, fat: 37, carbs: 0 },
  'sosiska': { name: 'Сосиски молочные', calories: 294, protein: 10, fat: 27, carbs: 0 },
  'sardelki': { name: 'Сардельки', calories: 325, protein: 11, fat: 30, carbs: 0 },

  // Рыба
  'treska': { name: 'Треска', calories: 82, protein: 18, fat: 0.7, carbs: 0 },
  'kambala': { name: 'Камбала', calories: 90, protein: 16, fat: 3, carbs: 0 },
  'mintay': { name: 'Минтай', calories: 79, protein: 16, fat: 1, carbs: 0 },
  'seledka': { name: 'Селёдка', calories: 160, protein: 17, fat: 10, carbs: 0 },
  'losos': { name: 'Лосось', calories: 208, protein: 20, fat: 13, carbs: 0 },
  'gorbusha': { name: 'Горбуша', calories: 116, protein: 21, fat: 3, carbs: 0 },
  'keta': { name: 'Кета', calories: 136, protein: 22, fat: 5, carbs: 0 },
  'semga': { name: 'Сёмга', calories: 182, protein: 20, fat: 11, carbs: 0 },
  'skumbria': { name: 'Скумбрия', calories: 191, protein: 18, fat: 13, carbs: 0 },
  'sardina': { name: 'Сардина', calories: 208, protein: 25, fat: 11, carbs: 0 },
  'tunec': { name: 'Тунец', calories: 144, protein: 23, fat: 5, carbs: 0 },
  'krevetki': { name: 'Креветки', calories: 106, protein: 20, fat: 2, carbs: 1 },
  'kalmar': { name: 'Кальмар', calories: 100, protein: 16, fat: 2, carbs: 3 },
  'mussels': { name: 'Мидии', calories: 172, protein: 24, fat: 4, carbs: 7 },

  // Овощи
  'kartoshka_vr': { name: 'Картофель варёный', calories: 77, protein: 2, fat: 0.1, carbs: 17 },
  'kartoshka_zh': { name: 'Картофель жареный', calories: 198, protein: 2, fat: 9, carbs: 25 },
  'morkov': { name: 'Морковь', calories: 41, protein: 0.9, fat: 0.2, carbs: 10 },
  'svekla': { name: 'Свёкла', calories: 43, protein: 1.6, fat: 0.2, carbs: 10 },
  'kapusta': { name: 'Капуста белокочанная', calories: 25, protein: 1.3, fat: 0.1, carbs: 6 },
  'kapusta_cv': { name: 'Цветная капуста', calories: 25, protein: 1.9, fat: 0.3, carbs: 5 },
  'brokkoli': { name: 'Брокколи', calories: 34, protein: 2.8, fat: 0.4, carbs: 7 },
  'pomidor': { name: 'Помидор', calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9 },
  'ogurec': { name: 'Огурец', calories: 16, protein: 0.7, fat: 0.1, carbs: 3.6 },
  'baklazhan': { name: 'Баклажан', calories: 25, protein: 1, fat: 0.2, carbs: 6 },
  'kabachok': { name: 'Кабачок', calories: 17, protein: 1.2, fat: 0.3, carbs: 3.1 },
  'perets': { name: 'Перец болгарский', calories: 27, protein: 1, fat: 0.3, carbs: 6 },
  'luk_rep': { name: 'Лук репчатый', calories: 40, protein: 1.1, fat: 0.1, carbs: 9 },
  'chesnok': { name: 'Чеснок', calories: 149, protein: 6.4, fat: 0.5, carbs: 33 },
  'ukrop': { name: 'Укроп', calories: 43, protein: 2.5, fat: 1.1, carbs: 7 },
  'petrushka': { name: 'Петрушка', calories: 36, protein: 2.6, fat: 0.8, carbs: 6 },
  'shampin': { name: 'Шампиньоны', calories: 22, protein: 2, fat: 0.3, carbs: 3.3 },
  'bely_grib': { name: 'Белые грибы', calories: 34, protein: 3.3, fat: 1.7, carbs: 3 },

  // Фрукты и ягоды
  'yabloko': { name: 'Яблоко', calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
  'banan': { name: 'Банан', calories: 89, protein: 1.1, fat: 0.3, carbs: 23 },
  'apelsin': { name: 'Апельсин', calories: 47, protein: 0.9, fat: 0.1, carbs: 12 },
  'grusha': { name: 'Груша', calories: 57, protein: 0.4, fat: 0.1, carbs: 15 },
  'persik': { name: 'Персик', calories: 39, protein: 0.9, fat: 0.3, carbs: 10 },
  'vinograd': { name: 'Виноград', calories: 69, protein: 0.7, fat: 0.2, carbs: 18 },
  'sliva': { name: 'Слива', calories: 46, protein: 0.7, fat: 0.3, carbs: 11 },
  'klubnika': { name: 'Клубника', calories: 32, protein: 0.7, fat: 0.3, carbs: 8 },
  'malina': { name: 'Малина', calories: 52, protein: 1.2, fat: 0.7, carbs: 12 },
  'smorodina': { name: 'Смородина чёрная', calories: 63, protein: 1.4, fat: 0.4, carbs: 15 },
  'chernika': { name: 'Черника', calories: 57, protein: 0.7, fat: 0.3, carbs: 14 },
  'arbuz': { name: 'Арбуз', calories: 30, protein: 0.6, fat: 0.2, carbs: 8 },
  'dynya': { name: 'Дыня', calories: 34, protein: 0.8, fat: 0.2, carbs: 8 },
  'avokado': { name: 'Авокадо', calories: 160, protein: 2, fat: 15, carbs: 9 },
  'limon': { name: 'Лимон', calories: 29, protein: 1.1, fat: 0.3, carbs: 9 },

  // Орехи и семена
  'grech_oreh': { name: 'Грецкие орехи', calories: 654, protein: 15, fat: 65, carbs: 14 },
  'mindal': { name: 'Миндаль', calories: 579, protein: 21, fat: 50, carbs: 22 },
  'keshyu': { name: 'Кешью', calories: 553, protein: 18, fat: 44, carbs: 30 },
  'fistashki': { name: 'Фисташки', calories: 560, protein: 20, fat: 45, carbs: 28 },
  'izum': { name: 'Изюм', calories: 299, protein: 3.1, fat: 0.5, carbs: 79 },
  'kuraga': { name: 'Курага', calories: 241, protein: 3.4, fat: 0.5, carbs: 63 },
  'finiki': { name: 'Финики', calories: 282, protein: 2.5, fat: 0.4, carbs: 75 },

  // Напитки
  'kofe': { name: 'Кофе чёрный', calories: 2, protein: 0.1, fat: 0, carbs: 0.3 },
  'kofe_mol': { name: 'Кофе с молоком', calories: 45, protein: 2, fat: 2, carbs: 5 },
  'chay': { name: 'Чай чёрный', calories: 1, protein: 0, fat: 0, carbs: 0.2 },
  'kakao': { name: 'Какао на молоке', calories: 88, protein: 3, fat: 3, carbs: 13 },
  'kompot': { name: 'Компот', calories: 60, protein: 0.5, fat: 0, carbs: 15 },
  'kissel': { name: 'Кисель', calories: 78, protein: 0.5, fat: 0.1, carbs: 19 },
  'mors': { name: 'Морс', calories: 48, protein: 0.2, fat: 0, carbs: 12 },
  'kvass': { name: 'Квас', calories: 27, protein: 0.5, fat: 0, carbs: 6 },

  // Сладости
  'shokolad': { name: 'Шоколад молочный', calories: 534, protein: 7.7, fat: 34, carbs: 53 },
  'shok_gor': { name: 'Шоколад горький', calories: 546, protein: 4.9, fat: 35, carbs: 48 },
  'zefir': { name: 'Зефир', calories: 326, protein: 1.5, fat: 0, carbs: 78 },
  'pastila': { name: 'Пастила', calories: 333, protein: 1, fat: 0, carbs: 82 },
  'marmelad': { name: 'Мармелад', calories: 296, protein: 0, fat: 0.1, carbs: 74 },
  'varene': { name: 'Варенье', calories: 262, protein: 0.3, fat: 0.2, carbs: 67 },
  'med': { name: 'Мёд', calories: 304, protein: 0.3, fat: 0, carbs: 82 },
  'sahar': { name: 'Сахар', calories: 387, protein: 0, fat: 0, carbs: 100 },
  'sahar_raf': { name: 'Сахар рафинад', calories: 387, protein: 0, fat: 0, carbs: 100 },
  'vareniki': { name: 'Вареники с творогом', calories: 185, protein: 7, fat: 4, carbs: 30 },
  'vareniki_kar': { name: 'Вареники с картошкой', calories: 155, protein: 4, fat: 4, carbs: 26 },
  'pelmeni': { name: 'Пельмени', calories: 260, protein: 12, fat: 15, carbs: 19 },
  'bliny': { name: 'Блины', calories: 226, protein: 6, fat: 10, carbs: 28 },
  'sirniki': { name: 'Сырники', calories: 222, protein: 13, fat: 11, carbs: 17 },
  'vatrushka': { name: 'Ватрушка с творогом', calories: 290, protein: 9, fat: 12, carbs: 37 },
  'pizza': { name: 'Пицца пепперони', calories: 266, protein: 11, fat: 10, carbs: 33 },
  'burger': { name: 'Бургер', calories: 295, protein: 15, fat: 14, carbs: 30 },
  'kart_fr': { name: 'Картофель фри', calories: 312, protein: 3.4, fat: 15, carbs: 41 },
  'naggets': { name: 'Куриные наггетсы', calories: 296, protein: 15, fat: 20, carbs: 16 },
  'hot_dog': { name: 'Хот-дог', calories: 290, protein: 10, fat: 17, carbs: 23 }
};

// Калькулятор калорийности приёма пищи
export const mealCalorieCalculator: Calculator = {
  id: 'meal-calories',
  slug: 'kaloriynost-priema-pishchi',
  title: 'Калькулятор калорийности приёма пищи',
  description: 'Расчёт калорийности завтрака, обеда, ужина и перекусов',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'mealType',
      label: 'Приём пищи',
      type: 'select',
      options: [
        { value: 'breakfast', label: 'Завтрак' },
        { value: 'lunch', label: 'Обед' },
        { value: 'dinner', label: 'Ужин' },
        { value: 'snack', label: 'Перекус' }
      ],
      defaultValue: 'breakfast'
    },
    {
      name: 'items',
      label: 'Количество продуктов',
      type: 'select',
      options: [
        { value: '2', label: '2 продукта' },
        { value: '3', label: '3 продукта' },
        { value: '4', label: '4 продукта' },
        { value: '5', label: '5 продуктов' }
      ],
      defaultValue: '3'
    },
    {
      name: 'food1',
      label: 'Продукт 1',
      type: 'select',
      options: Object.entries(russianFoodDatabase).map(([key, value]) => ({
        value: key,
        label: value.name
      })),
      defaultValue: 'ovsyanka'
    },
    {
      name: 'weight1',
      label: 'Вес продукта 1 (г)',
      type: 'number',
      placeholder: '150',
      defaultValue: 150,
      min: 1,
      max: 1000
    },
    {
      name: 'food2',
      label: 'Продукт 2',
      type: 'select',
      options: Object.entries(russianFoodDatabase).map(([key, value]) => ({
        value: key,
        label: value.name
      })),
      defaultValue: 'banan'
    },
    {
      name: 'weight2',
      label: 'Вес продукта 2 (г)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 1,
      max: 1000
    },
    {
      name: 'food3',
      label: 'Продукт 3',
      type: 'select',
      options: Object.entries(russianFoodDatabase).map(([key, value]) => ({
        value: key,
        label: value.name
      })),
      defaultValue: 'moloko_3_2'
    },
    {
      name: 'weight3',
      label: 'Вес продукта 3 (г)',
      type: 'number',
      placeholder: '200',
      defaultValue: 200,
      min: 1,
      max: 1000
    },
    {
      name: 'food4',
      label: 'Продукт 4',
      type: 'select',
      options: Object.entries(russianFoodDatabase).map(([key, value]) => ({
        value: key,
        label: value.name
      })),
      defaultValue: 'none'
    },
    {
      name: 'weight4',
      label: 'Вес продукта 4 (г)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 1000
    }
  ],
  outputs: [
    { name: 'totalCalories', label: 'Всего калорий', type: 'number', unit: 'ккал' },
    { name: 'totalProtein', label: 'Всего белков', type: 'number', unit: 'г' },
    { name: 'totalFat', label: 'Всего жиров', type: 'number', unit: 'г' },
    { name: 'totalCarbs', label: 'Всего углеводов', type: 'number', unit: 'г' },
    { name: 'mealPercent', label: '% от суточной нормы', type: 'text' }
  ],
  calculate: (inputs) => {
    const items = Number(inputs.items) || 3;
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    for (let i = 1; i <= Math.min(items, 4); i++) {
      const foodKey = String(inputs[`food${i}`]);
      const weight = Number(inputs[`weight${i}`]) || 0;

      if (foodKey && foodKey !== 'none' && russianFoodDatabase[foodKey] && weight > 0) {
        const food = russianFoodDatabase[foodKey];
        const ratio = weight / 100;
        totalCalories += food.calories * ratio;
        totalProtein += food.protein * ratio;
        totalFat += food.fat * ratio;
        totalCarbs += food.carbs * ratio;
      }
    }

    // Примерная суточная норма для расчёта процента
    const dailyNorm = 2000;
    const mealPercent = (totalCalories / dailyNorm * 100).toFixed(1);

    return [
      { value: Math.round(totalCalories), label: 'Всего калорий', unit: 'ккал' },
      { value: totalProtein.toFixed(1), label: 'Всего белков', unit: 'г' },
      { value: totalFat.toFixed(1), label: 'Всего жиров', unit: 'г' },
      { value: totalCarbs.toFixed(1), label: 'Всего углеводов', unit: 'г' },
      { value: `${mealPercent}%`, label: '% от суточной нормы' }
    ];
  },
  content: {
    howTo: 'Выберите тип приёма пищи, количество продуктов, затем укажите продукты и их вес.',
    about: 'Калькулятор помогает рассчитать калорийность и БЖУ для любого приёма пищи: завтрака, обеда, ужина или перекуса. База содержит более 50 типичных русских продуктов.',
    usage: 'Используйте для планирования меню, контроля калорийности рациона, составления диеты.',
    formula: 'Калории = Σ (Калории на 100г × вес / 100) для всех продуктов',
    faq: [
      {
        question: 'Сколько должна составлять калорийность одного приёма пищи?',
        answer: 'Завтрак — 25-30%, обед — 35-40%, ужин — 20-25%, перекусы — 10-15% от суточной нормы калорий.'
      },
      {
        question: 'Почему важен баланс БЖУ?',
        answer: 'Для здорового питания рекомендуется соотношение: белки 15-20%, жиры 25-30%, углеводы 50-60% от общей калорийности.'
      },
      {
        question: 'Какое количество приёмов пищи оптимально?',
        answer: 'Рекомендуется 3 основных приёма пищи + 1-2 перекуса с интервалом 3-4 часа.'
      }
    ],
    sources: [
      { title: 'Рекомендации Роспотребнадзора по питанию', url: 'https://rospotrebnadzor.ru/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор качества сна
export const sleepQualityCalculator: Calculator = {
  id: 'sleep-quality',
  slug: 'kachestvo-sna',
  title: 'Калькулятор качества сна',
  description: 'Расчёт циклов сна и оценка качества отдыха',
  category: 'zdorove-i-krasota',
  subcategory: 'zdorove',
  type: 'formula',
  inputs: [
    {
      name: 'bedtime',
      label: 'Время отхода ко сну',
      type: 'text',
      placeholder: '22:30',
      defaultValue: '22:30'
    },
    {
      name: 'waketime',
      label: 'Время пробуждения',
      type: 'text',
      placeholder: '06:30',
      defaultValue: '06:30'
    },
    {
      name: 'fallAsleepTime',
      label: 'Время засыпания (мин)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15,
      min: 0,
      max: 120
    },
    {
      name: 'wakeCount',
      label: 'Количество пробуждений за ночь',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 10
    },
    {
      name: 'sleepQuality',
      label: 'Субъективное качество сна',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Отлично — выспался, бодрость' },
        { value: 'good', label: 'Хорошо — небольшая сонливость' },
        { value: 'average', label: 'Средне — чувствую усталость' },
        { value: 'poor', label: 'Плохо — сильная сонливость' }
      ],
      defaultValue: 'good'
    }
  ],
  outputs: [
    { name: 'totalSleep', label: 'Общее время сна', type: 'text' },
    { name: 'sleepCycles', label: 'Количество циклов сна', type: 'number' },
    { name: 'qualityScore', label: 'Оценка качества сна', type: 'number', unit: '%' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const parseTime = (timeStr: string): number => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const bedtime = parseTime(String(inputs.bedtime));
    const waketime = parseTime(String(inputs.waketime));
    const fallAsleepTime = Number(inputs.fallAsleepTime) || 0;
    const wakeCount = Number(inputs.wakeCount) || 0;
    const quality = String(inputs.sleepQuality);

    let totalMinutes: number;
    if (waketime > bedtime) {
      totalMinutes = waketime - bedtime;
    } else {
      totalMinutes = (24 * 60 - bedtime) + waketime;
    }

    const actualSleepMinutes = Math.max(0, totalMinutes - fallAsleepTime - wakeCount * 10);
    const sleepCycles = Math.floor(actualSleepMinutes / 90);

    let qualityScore = 100;
    qualityScore -= wakeCount * 5;
    if (quality === 'poor') qualityScore -= 30;
    else if (quality === 'average') qualityScore -= 15;
    else if (quality === 'excellent') qualityScore += 5;

    if (actualSleepMinutes < 420) qualityScore -= 25;
    else if (actualSleepMinutes < 360) qualityScore -= 40;
    else if (actualSleepMinutes > 540) qualityScore -= 10;

    if (fallAsleepTime > 30) qualityScore -= 10;

    qualityScore = Math.max(0, Math.min(100, qualityScore));

    const hours = Math.floor(actualSleepMinutes / 60);
    const minutes = actualSleepMinutes % 60;

    let recommendation = '';
    if (qualityScore >= 85) {
      recommendation = 'Отличное качество сна! Продолжайте в том же духе.';
    } else if (qualityScore >= 70) {
      recommendation = 'Хорошее качество сна. Для улучшения старайтесь ложиться в одно время.';
    } else if (qualityScore >= 50) {
      recommendation = 'Среднее качество сна. Рекомендуется устранить причины пробуждений.';
    } else {
      recommendation = 'Низкое качество сна. Рекомендуется консультация с врачом-сомнологом.';
    }

    return [
      { value: `${hours} ч ${minutes} мин`, label: 'Общее время сна' },
      { value: sleepCycles.toString(), label: 'Количество циклов сна' },
      { value: qualityScore.toString(), label: 'Оценка качества сна', unit: '%' },
      { value: recommendation, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Укажите время отхода ко сну и пробуждения, время засыпания, количество пробуждений и оцените качество сна.',
    about: 'Калькулятор оценивает качество сна на основе длительности, количества циклов (по 90 минут), пробуждений и субъективных ощущений. Оптимальная длительность сна для взрослых — 7-9 часов, 5-6 циклов.',
    usage: 'Используйте для анализа режима сна, выявления проблем со сном, оптимизации времени отхода ко сну.',
    formula: 'Циклы сна = Время сна / 90 мин\nКачество = 100 − штрафы за проблемы',
    faq: [
      {
        question: 'Что такое цикл сна?',
        answer: 'Цикл сна — это период около 90 минут, включающий фазы медленного (глубокого) и быстрого (REM) сна. Оптимально завершать сон в конце цикла, а не посередине.'
      },
      {
        question: 'Почему важно время засыпания?',
        answer: 'Время от ложения до фактического сна (сонная латентность) у здорового человека составляет 10-20 минут. Больше 30 минут может указывать на бессонницу.'
      },
      {
        question: 'Как улучшить качество сна?',
        answer: 'Соблюдайте режим, избегайте кофеина после 14:00, не используйте гаджеты перед сном, поддерживайте комфортную температуру в спальне (18-20°C).'
      }
    ],
    sources: [
      { title: 'Sleep Cycles — National Sleep Foundation', url: 'https://www.sleepfoundation.org/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор процента жира (метод ВМС США)
export const bodyFatNavyCalculator: Calculator = {
  id: 'body-fat-navy',
  slug: 'procent-zhira-vms-ssha',
  title: 'Калькулятор процента жира (метод ВМС США)',
  description: 'Расчёт процента жира в организме по измерениям обхватов',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' }
      ],
      defaultValue: 'male'
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '175',
      defaultValue: 175,
      min: 100,
      max: 250
    },
    {
      name: 'neck',
      label: 'Обхват шеи (см)',
      type: 'number',
      placeholder: '38',
      defaultValue: 38,
      min: 20,
      max: 60
    },
    {
      name: 'waist',
      label: 'Обхват талии (см)',
      type: 'number',
      placeholder: '85',
      defaultValue: 85,
      min: 40,
      max: 200
    },
    {
      name: 'hip',
      label: 'Обхват бёдер (см)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 200
    }
  ],
  outputs: [
    { name: 'bodyFat', label: 'Процент жира', type: 'number', unit: '%' },
    { name: 'fatMass', label: 'Масса жира', type: 'number', unit: 'кг' },
    { name: 'leanMass', label: 'Масса без жира', type: 'number', unit: 'кг' },
    { name: 'category', label: 'Категория', type: 'text' }
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender);
    const height = Number(inputs.height);
    const neck = Number(inputs.neck);
    const waist = Number(inputs.waist);
    const hip = Number(inputs.hip);

    if (!height || !neck || !waist) {
      return [{ value: 'Заполните обязательные поля', label: 'Результат' }];
    }

    let bodyFat = 0;

    if (gender === 'male') {
      // Формула для мужчин: log10(abdomen - neck)
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      // Формула для женщин: log10(hips + waist - neck)
      const hipValue = hip > 0 ? hip : waist * 1.1;
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hipValue - neck) + 0.221 * Math.log10(height)) - 450;
    }

    bodyFat = Math.max(2, Math.min(60, bodyFat));

    // Оценка категории
    let category = '';
    if (gender === 'male') {
      if (bodyFat < 6) category = 'Эссенциальный жир (спортсмены)';
      else if (bodyFat < 14) category = 'Атлетический тип';
      else if (bodyFat < 18) category = 'Фитнес';
      else if (bodyFat < 25) category = 'Норма';
      else if (bodyFat < 30) category = 'Избыточный вес';
      else category = 'Ожирение';
    } else {
      if (bodyFat < 14) category = 'Эссенциальный жир (спортсмены)';
      else if (bodyFat < 21) category = 'Атлетический тип';
      else if (bodyFat < 25) category = 'Фитнес';
      else if (bodyFat < 32) category = 'Норма';
      else if (bodyFat < 37) category = 'Избыточный вес';
      else category = 'Ожирение';
    }

    // Предполагаемый вес (для расчёта массы жира)
    // Используем упрощённую формулу: для мужчин BMI ~ 22, для женщин ~ 21
    const assumedBMI = gender === 'male' ? 22 : 21;
    const heightM = height / 100;
    const assumedWeight = assumedBMI * heightM * heightM;
    const fatMass = assumedWeight * bodyFat / 100;
    const leanMass = assumedWeight - fatMass;

    return [
      { value: bodyFat.toFixed(1), label: 'Процент жира', unit: '%' },
      { value: fatMass.toFixed(1), label: 'Масса жира', unit: 'кг' },
      { value: leanMass.toFixed(1), label: 'Масса без жира', unit: 'кг' },
      { value: category, label: 'Категория' }
    ];
  },
  content: {
    howTo: 'Измерьте обхват шеи (ниже Adam\'s apple), талии (на уровне пупка) и для женщин — бёдер (в широком месте). Введите данные в сантиметрах.',
    about: 'Метод ВМС США (US Navy Method) использует измерения обхватов для оценки процента жира. Точность ±3-4% по сравнению с эталонными методами. Для женщин требуется измерение бёдер.',
    usage: 'Используйте для оценки состава тела, отслеживания прогресса фитнеса, определения целей по снижению жира.',
    formula: 'Мужчины: %жира = 495/(1.0324 − 0.19077×log(талия−шея) + 0.15456×log(рост)) − 450\nЖенщины: %жира = 495/(1.29579 − 0.35004×log(талия+бёдра−шея) + 0.221×log(рост)) − 450',
    faq: [
      {
        question: 'Как правильно измерять обхваты?',
        answer: 'Измеряйте сантиметровой лентой, не втягивая живот, в конце выдоха. Шея — ниже адамового яблока, талия — на уровне пупка, бёдра — в самом широком месте.'
      },
      {
        question: 'Какой процент жира считается нормальным?',
        answer: 'Для мужчин: 10-20% — норма, для женщин: 18-28% — норма. Эссенциальный жир (минимум для здоровья): 3-5% для мужчин, 10-13% для женщин.'
      },
      {
        question: 'Почему для женщин нужен обхват бёдер?',
        answer: 'У женщин жир распределяется иначе из-за гормональных особенностей. Учёт бёдер улучшает точность расчёта.'
      }
    ],
    sources: [
      { title: 'US Navy Body Fat Calculator — Military.com', url: 'https://www.military.com/military-fitness/workouts/military-fitness-general/body-fat-calculator' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор максимума в одном повторении (1RM)
export const oneRepMaxCalculator: Calculator = {
  id: 'one-rep-max',
  slug: 'maksimum-v-odnom-povtorenii',
  title: 'Калькулятор 1RM (максимум в одном повторении)',
  description: 'Расчёт максимального веса для одного повторения по нескольким формулам',
  category: 'zdorove-i-krasota',
  subcategory: 'sport-i-aktivnost',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес в подходе (кг)',
      type: 'number',
      placeholder: '80',
      defaultValue: 80,
      min: 1,
      max: 500
    },
    {
      name: 'reps',
      label: 'Количество повторений',
      type: 'number',
      placeholder: '8',
      defaultValue: 8,
      min: 1,
      max: 30
    },
    {
      name: 'exercise',
      label: 'Упражнение',
      type: 'select',
      options: [
        { value: 'squat', label: 'Приседания' },
        { value: 'bench', label: 'Жим лёжа' },
        { value: 'deadlift', label: 'Становая тяга' },
        { value: 'press', label: 'Жим над головой' },
        { value: 'other', label: 'Другое упражнение' }
      ],
      defaultValue: 'bench'
    }
  ],
  outputs: [
    { name: 'brzycki', label: 'Формула Бржицкого', type: 'number', unit: 'кг' },
    { name: 'epley', label: 'Формула Эпли', type: 'number', unit: 'кг' },
    { name: 'lombardi', label: 'Формула Ломбарди', type: 'number', unit: 'кг' },
    { name: 'average', label: 'Среднее значение', type: 'number', unit: 'кг' },
    { name: 'percentages', label: 'Проценты от 1RM', type: 'text' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const reps = Number(inputs.reps);

    if (!weight || !reps) {
      return [{ value: 'Введите вес и количество повторений', label: 'Результат' }];
    }

    // Формула Бржицкого (Brzycki): 1RM = weight / (1.0278 − 0.0278 × reps)
    const brzycki = weight / (1.0278 - 0.0278 * reps);

    // Формула Эпли (Epley): 1RM = weight × (1 + 0.0333 × reps)
    const epley = weight * (1 + 0.0333 * reps);

    // Формула Ломбарди (Lombardi): 1RM = weight × reps^0.10
    const lombardi = weight * Math.pow(reps, 0.10);

    const average = (brzycki + epley + lombardi) / 3;

    // Расчёт процентов для разных повторений
    const percentages: string[] = [];
    for (const pct of [50, 60, 70, 80, 90]) {
      const weightAtPct = (average * pct / 100).toFixed(1);
      percentages.push(`${pct}%: ${weightAtPct} кг`);
    }

    return [
      { value: brzycki.toFixed(1), label: 'Формула Бржицкого', unit: 'кг' },
      { value: epley.toFixed(1), label: 'Формула Эпли', unit: 'кг' },
      { value: lombardi.toFixed(1), label: 'Формула Ломбарди', unit: 'кг' },
      { value: average.toFixed(1), label: 'Среднее значение', unit: 'кг' },
      { value: percentages.join('; '), label: 'Проценты от 1RM' }
    ];
  },
  content: {
    howTo: 'Введите вес, который вы можете поднять указанное количество раз. Не используйте подходы ближе к отказу (менее 3 повторений).',
    about: 'Калькулятор оценивает максимальный вес для одного повторения (1RM) по трём популярным формулам: Бржицкого, Эпли и Ломбарди. Среднее значение даёт наиболее точную оценку.',
    usage: 'Используйте для планирования тренировок, определения рабочих весов, отслеживания прогресса силы.',
    formula: 'Бржицкий: 1RM = вес / (1.0278 − 0.0278×пвт)\nЭпли: 1RM = вес × (1 + 0.0333×пвт)\nЛомбарди: 1RM = вес × пвт^0.10',
    faq: [
      {
        question: 'Какая формула самая точная?',
        answer: 'Формула Бржицкого считается одной из наиболее точных для повторений от 1 до 10. Для более высоких повторений может занижать результат.'
      },
      {
        question: 'Можно ли использовать для определения рабочих весов?',
        answer: 'Да! Для силовой гипертрофии используйте 70-80% от 1RM (6-12 повторений), для силы — 80-90% (1-5 повторений).'
      },
      {
        question: 'Почему результаты формул различаются?',
        answer: 'Разные формулы основаны на разных исследованиях и популяциях. Среднее значение даёт наиболее надёжную оценку.'
      }
    ],
    sources: [
      { title: 'One Repetition Maximum — ExRx.net', url: 'https://exrx.net/Calculators/OneRepMax' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор VO2 max
export const vo2maxCalculator: Calculator = {
  id: 'vo2max',
  slug: 'vo2-maksimum',
  title: 'Калькулятор VO₂ max',
  description: 'Расчёт максимального потребления кислорода по тестам Купера и Рокпорта',
  category: 'zdorove-i-krasota',
  subcategory: 'sport-i-aktivnost',
  type: 'formula',
  inputs: [
    {
      name: 'testType',
      label: 'Тип теста',
      type: 'select',
      options: [
        { value: 'cooper', label: 'Тест Купера (12 минут бег)' },
        { value: 'rockport', label: 'Тест Рокпорта (1.6 км ходьба)' }
      ],
      defaultValue: 'cooper'
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
    },
    {
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 10,
      max: 90
    },
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 30,
      max: 200
    },
    {
      name: 'distance',
      label: 'Дистанция (м)',
      type: 'number',
      placeholder: '2500',
      defaultValue: 2500,
      min: 500,
      max: 5000
    },
    {
      name: 'heartRate',
      label: 'Пульс после теста (уд/мин) — только для Рокпорта',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 200
    }
  ],
  outputs: [
    { name: 'vo2max', label: 'VO₂ max', type: 'number', unit: 'мл/кг/мин' },
    { name: 'fitnessLevel', label: 'Уровень физподготовки', type: 'text' },
    { name: 'percentile', label: 'Процентиль', type: 'text' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const testType = String(inputs.testType);
    const gender = String(inputs.gender);
    const age = Number(inputs.age);
    const weight = Number(inputs.weight);
    const distance = Number(inputs.distance);
    const heartRate = Number(inputs.heartRate) || 0;

    if (!age || !weight || !distance) {
      return [{ value: 'Заполните обязательные поля', label: 'Результат' }];
    }

    let vo2max = 0;

    if (testType === 'cooper') {
      // Тест Купера: VO2max = (distance − 504.9) / 44.73
      vo2max = (distance - 504.9) / 44.73;
    } else {
      // Тест Рокпорта: VO2max = 132.853 − 0.0769×вес − 0.3877×возраст + 6.315×пол − 3.2649×время − 0.1565×пульс
      // Упрощённая формула: пол = 1 для мужчин, 0 для женщин
      const genderFactor = gender === 'male' ? 1 : 0;
      const time = distance / 100; // Примерное время в минутах
      vo2max = 132.853 - 0.0769 * weight - 0.3877 * age + 6.315 * genderFactor - 3.2649 * time - 0.1565 * heartRate;
    }

    vo2max = Math.max(0, vo2max);

    // Оценка уровня физподготовки
    let fitnessLevel = '';
    let percentile = '';

    if (gender === 'male') {
      if (vo2max < 25) { fitnessLevel = 'Очень низкий'; percentile = 'Ниже 10%'; }
      else if (vo2max < 30) { fitnessLevel = 'Низкий'; percentile = '10-25%'; }
      else if (vo2max < 35) { fitnessLevel = 'Ниже среднего'; percentile = '25-50%'; }
      else if (vo2max < 40) { fitnessLevel = 'Средний'; percentile = '50-75%'; }
      else if (vo2max < 45) { fitnessLevel = 'Хороший'; percentile = '75-90%'; }
      else if (vo2max < 50) { fitnessLevel = 'Отличный'; percentile = '90-95%'; }
      else { fitnessLevel = 'Превосходный'; percentile = 'Выше 95%'; }
    } else {
      if (vo2max < 20) { fitnessLevel = 'Очень низкий'; percentile = 'Ниже 10%'; }
      else if (vo2max < 25) { fitnessLevel = 'Низкий'; percentile = '10-25%'; }
      else if (vo2max < 30) { fitnessLevel = 'Ниже среднего'; percentile = '25-50%'; }
      else if (vo2max < 35) { fitnessLevel = 'Средний'; percentile = '50-75%'; }
      else if (vo2max < 40) { fitnessLevel = 'Хороший'; percentile = '75-90%'; }
      else if (vo2max < 45) { fitnessLevel = 'Отличный'; percentile = '90-95%'; }
      else { fitnessLevel = 'Превосходный'; percentile = 'Выше 95%'; }
    }

    let recommendation = '';
    if (vo2max < 30) {
      recommendation = 'Рекомендуется начать с регулярных прогулок и лёгкого бега 3 раза в неделю.';
    } else if (vo2max < 40) {
      recommendation = 'Хороший результат! Для улучшения добавьте интервальные тренировки.';
    } else {
      recommendation = 'Отличный результат! Поддерживайте текущий уровень с регулярными кардиотренировками.';
    }

    return [
      { value: vo2max.toFixed(1), label: 'VO₂ max', unit: 'мл/кг/мин' },
      { value: fitnessLevel, label: 'Уровень физподготовки' },
      { value: percentile, label: 'Процентиль' },
      { value: recommendation, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Выберите тест. Для теста Купера — бегите 12 минут максимально быстро и измерьте дистанцию. Для теста Рокпорта — пройдите 1.6 км быстрым шагом и измерьте пульс.',
    about: 'VO₂ max — максимальное количество кислорода, которое организм может использовать во время интенсивных упражнений. Важный показатель сердечно-лёгочной выносливости.',
    usage: 'Используйте для оценки аэробной выносливости, планирования кардиотренировок, отслеживания прогресса физической формы.',
    formula: 'Тест Купера: VO₂max = (дистанция − 504.9) / 44.73\nТест Рокпорта: VO₂max = 132.853 − 0.0769×вес − 0.3877×возраст + 6.315×пол − 3.2649×время − 0.1565×пульс',
    faq: [
      {
        question: 'Какой VO₂ max считается хорошим?',
        answer: 'Для мужчин 20-29 лет: хороший — 38-43, отличный — 44-48. Для женщин: хороший — 32-37, отличный — 38-42. С возрастом нормы снижаются.'
      },
      {
        question: 'Можно ли улучшить VO₂ max?',
        answer: 'Да! Регулярные аэробные тренировки (бег, плавание, велосипед) могут улучшить VO₂ max на 5-20% за несколько месяцев.'
      },
      {
        question: 'Что влияет на VO₂ max?',
        answer: 'Генетика (50%), тренированность (30%), возраст, пол, масса тела. Максимальное значение достигается в 20-25 лет.'
      }
    ],
    sources: [
      { title: 'VO2 Max Testing — American Council on Exercise', url: 'https://www.acefitness.org/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор стоимости курения
export const smokingCostCalculator: Calculator = {
  id: 'smoking-cost',
  slug: 'stoimost-kureniya',
  title: 'Калькулятор стоимости курения',
  description: 'Расчёт финансовых затрат и последствий курения',
  category: 'zdorove-i-krasota',
  subcategory: 'zdorove',
  type: 'formula',
  inputs: [
    {
      name: 'packsPerDay',
      label: 'Пачек в день',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0.1,
      max: 5,
      step: 0.5
    },
    {
      name: 'packPrice',
      label: 'Цена пачки (₽)',
      type: 'number',
      placeholder: '150',
      defaultValue: 150,
      min: 50,
      max: 500
    },
    {
      name: 'yearsSmoking',
      label: 'Лет курения',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 60
    },
    {
      name: 'cigarettesPerPack',
      label: 'Сигарет в пачке',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 10,
      max: 25
    }
  ],
  outputs: [
    { name: 'dailyCost', label: 'Затраты в день', type: 'number', unit: '₽' },
    { name: 'monthlyCost', label: 'Затраты в месяц', type: 'number', unit: '₽' },
    { name: 'yearlyCost', label: 'Затраты в год', type: 'number', unit: '₽' },
    { name: 'totalCost', label: 'Общие затраты за всё время', type: 'number', unit: '₽' },
    { name: 'cigarettesTotal', label: 'Всего выкурено сигарет', type: 'number', unit: 'шт' },
    { name: 'lifeLost', label: 'Сокращение жизни', type: 'text' },
    { name: 'potentialSavings', label: 'Возможные накопления', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const packsPerDay = Number(inputs.packsPerDay);
    const packPrice = Number(inputs.packPrice);
    const yearsSmoking = Number(inputs.yearsSmoking);
    const cigarettesPerPack = Number(inputs.cigarettesPerPack);

    const dailyCost = packsPerDay * packPrice;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = dailyCost * 365;
    const totalCost = yearlyCost * yearsSmoking;

    const cigarettesTotal = packsPerDay * cigarettesPerPack * 365 * yearsSmoking;

    // Средняя статистика: каждая сигарета сокращает жизнь на ~11 минут
    const lifeLostMinutes = cigarettesTotal * 11;
    const lifeLostDays = Math.floor(lifeLostMinutes / 1440);
    const lifeLostYears = (lifeLostDays / 365).toFixed(1);

    // Потенциальные накопления при инвестировании 5% годовых
    const interestRate = 0.05;
    let potentialSavings = 0;
    for (let i = 0; i < yearsSmoking; i++) {
      potentialSavings += yearlyCost * Math.pow(1 + interestRate, yearsSmoking - i - 1);
    }

    return [
      { value: dailyCost.toFixed(0), label: 'Затраты в день', unit: '₽' },
      { value: monthlyCost.toFixed(0), label: 'Затраты в месяц', unit: '₽' },
      { value: yearlyCost.toFixed(0), label: 'Затраты в год', unit: '₽' },
      { value: totalCost.toFixed(0), label: 'Общие затраты за всё время', unit: '₽' },
      { value: cigarettesTotal.toFixed(0), label: 'Всего выкурено сигарет', unit: 'шт' },
      { value: `${lifeLostDays} дней (${lifeLostYears} лет)`, label: 'Сокращение жизни' },
      { value: potentialSavings.toFixed(0), label: 'Возможные накопления', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите количество пачек в день, цену пачки, количество лет курения и сигарет в пачке.',
    about: 'Калькулятор показывает реальную стоимость курения: деньги, потраченные на сигареты, сокращение продолжительности жизни и упущенную выгоду от инвестирования сэкономленных средств.',
    usage: 'Используйте для мотивации к отказу от курения, осознания масштаба затрат, планирования бюджета после отказа от курения.',
    formula: 'Затраты = пачки/день × цена × дни\nСокращение жизни ≈ 11 минут на сигарету\nНакопления при инвестировании 5% годовых',
    faq: [
      {
        question: 'Насколько точно считается сокращение жизни?',
        answer: 'Согласно исследованиям, каждая сигарета сокращает жизнь в среднем на 11 минут. Это усреднённая статистика.'
      },
      {
        question: 'Можно ли вернуть потраченные годы жизни, бросив курить?',
        answer: 'Да! После отказа от курения риски постепенно снижаются. Через 10-15 лет риск заболеваний приближается к уровню некурящих.'
      },
      {
        question: 'Какие ещё косвенные расходы есть от курения?',
        answer: 'Дополнительные расходы: медицинские услуги, более дорогая страховка, чистка одежды и квартиры, пониженная продуктивность на работе.'
      }
    ],
    sources: [
      { title: 'Cost of Smoking — American Lung Association', url: 'https://www.lung.org/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор нормы воды с учётом активности
export const waterActivityCalculator: Calculator = {
  id: 'water-activity',
  slug: 'voda-s-uchetom-aktivnosti',
  title: 'Калькулятор нормы воды с учётом активности',
  description: 'Расчёт необходимого количества воды с учётом базовых потребностей, упражнений и климата',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 30,
      max: 200
    },
    {
      name: 'exerciseMinutes',
      label: 'Минут упражнений в день',
      type: 'number',
      placeholder: '60',
      defaultValue: 60,
      min: 0,
      max: 300
    },
    {
      name: 'exerciseIntensity',
      label: 'Интенсивность тренировок',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкая (йога, прогулки)' },
        { value: 'moderate', label: 'Средняя (бег, фитнес)' },
        { value: 'high', label: 'Высокая (HIIT, спорт)' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'climate',
      label: 'Климат',
      type: 'select',
      options: [
        { value: 'cold', label: 'Холодный (зима, кондиционер)' },
        { value: 'moderate', label: 'Умеренный (весна/осень)' },
        { value: 'hot', label: 'Жаркий (лето, тропики)' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'altitude',
      label: 'Высота над уровнем моря (м)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 5000
    }
  ],
  outputs: [
    { name: 'baseWater', label: 'Базовая потребность', type: 'number', unit: 'мл' },
    { name: 'exerciseWater', label: 'Дополнительно для тренировок', type: 'number', unit: 'мл' },
    { name: 'climateWater', label: 'Корректировка по климату', type: 'number', unit: 'мл' },
    { name: 'altitudeWater', label: 'Корректировка по высоте', type: 'number', unit: 'мл' },
    { name: 'totalWater', label: 'Итого воды в день', type: 'number', unit: 'мл' },
    { name: 'glasses', label: 'Примерно стаканов (250 мл)', type: 'number', unit: 'стаканов' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const exerciseMinutes = Number(inputs.exerciseMinutes);
    const exerciseIntensity = String(inputs.exerciseIntensity);
    const climate = String(inputs.climate);
    const altitude = Number(inputs.altitude);

    // Базовая потребность: 30-35 мл на кг веса
    const baseWater = weight * 35;

    // Дополнительно для тренировок: 400-800 мл в час в зависимости от интенсивности
    let waterPerHour = 500;
    if (exerciseIntensity === 'low') waterPerHour = 400;
    else if (exerciseIntensity === 'high') waterPerHour = 800;

    const exerciseWater = (exerciseMinutes / 60) * waterPerHour;

    // Климат
    let climateWater = 0;
    if (climate === 'cold') climateWater = -200;
    else if (climate === 'hot') climateWater = 500;

    // Высота: +300-500 мл на каждые 1000 м над уровнем моря
    const altitudeWater = altitude > 1500 ? Math.floor(altitude / 1000) * 400 : 0;

    const totalWater = Math.round(baseWater + exerciseWater + climateWater + altitudeWater);
    const glasses = Math.round(totalWater / 250);

    return [
      { value: Math.round(baseWater), label: 'Базовая потребность', unit: 'мл' },
      { value: Math.round(exerciseWater), label: 'Дополнительно для тренировок', unit: 'мл' },
      { value: climateWater, label: 'Корректировка по климату', unit: 'мл' },
      { value: altitudeWater, label: 'Корректировка по высоте', unit: 'мл' },
      { value: totalWater, label: 'Итого воды в день', unit: 'мл' },
      { value: glasses, label: 'Примерно стаканов (250 мл)', unit: 'стаканов' }
    ];
  },
  content: {
    howTo: 'Введите ваш вес, количество минут упражнений, интенсивность тренировок, климат и высоту над уровнем моря.',
    about: 'Калькулятор учитывает базовую потребность в воде (30-35 мл/кг), потери при физической активности, испарение в жарком климате и дополнительные потребности на высоте.',
    usage: 'Используйте для определения дневной нормы воды, планирования гидратации при тренировках, подготовки к походам в горы или жаркому климату.',
    formula: 'Базовая норма = Вес × 35 мл\nТренировки = Минуты/60 × (400-800 мл/час)\nКлимат: холод −200 мл, жара +500 мл\nВысота: +400 мл на каждые 1000 м выше 1500 м',
    faq: [
      {
        question: 'Можно ли пить слишком много воды?',
        answer: 'Да, гипергидратация (более 1 литра в час) может привести к гипонатриемии — низкой концентрации натрия в крови. Пейте умеренно.'
      },
      {
        question: 'Считается ли чай и кофе?',
        answer: 'Да, но в небольших количествах. Кофе и чай имеют мочегонный эффект. Рекомендуется основной объём получать из чистой воды.'
      },
      {
        question: 'Как понять, что пью достаточно?',
        answer: 'Цвет мочи — хороший индикатор. Светло-жёлтый цвет означает хорошую гидратацию. Тёмный цвет сигнализирует о недостатке воды.'
      }
    ],
    sources: [
      { title: 'Hydration — National Academy of Medicine', url: 'https://www.nationalacademies.org/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор теста на гибкость (sit-and-reach)
export const flexibilityTestCalculator: Calculator = {
  id: 'flexibility-test',
  slug: 'test-na-gibkost',
  title: 'Калькулятор теста на гибкость (sit-and-reach)',
  description: 'Оценка гибкости спины и задней поверхности бедра с нормативами по возрасту и полу',
  category: 'zdorove-i-krasota',
  subcategory: 'sport-i-aktivnost',
  type: 'formula',
  inputs: [
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' }
      ],
      defaultValue: 'male'
    },
    {
      name: 'age',
      label: 'Возраст (лет)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 10,
      max: 80
    },
    {
      name: 'reachDistance',
      label: 'Расстояние (см)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15,
      min: -50,
      max: 50
    },
    {
      name: 'testType',
      label: 'Тип теста',
      type: 'select',
      options: [
        { value: 'standard', label: 'Стандартный (ноги прямые)' },
        { value: 'chair', label: 'Стульчик (для пожилых)' }
      ],
      defaultValue: 'standard'
    }
  ],
  outputs: [
    { name: 'reachDistance', label: 'Результат', type: 'number', unit: 'см' },
    { name: 'rating', label: 'Оценка', type: 'text' },
    { name: 'percentile', label: 'Процентиль', type: 'text' },
    { name: 'target', label: 'Целевой показатель', type: 'text' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender);
    const age = Number(inputs.age);
    const reachDistance = Number(inputs.reachDistance);

    // Нормативы (примерные значения для стандартного теста)
    // Возрастные группы: до 19, 20-29, 30-39, 40-49, 50-59, 60+
    const norms: Record<string, Record<string, { excellent: number; good: number; average: number; below: number }>> = {
      'male': {
        '19': { excellent: 40, good: 30, average: 20, below: 10 },
        '29': { excellent: 38, good: 28, average: 18, below: 8 },
        '39': { excellent: 35, good: 25, average: 15, below: 5 },
        '49': { excellent: 30, good: 20, average: 10, below: 0 },
        '59': { excellent: 25, good: 15, average: 5, below: -5 },
        '80': { excellent: 20, good: 10, average: 0, below: -10 }
      },
      'female': {
        '19': { excellent: 43, good: 33, average: 23, below: 13 },
        '29': { excellent: 41, good: 31, average: 21, below: 11 },
        '39': { excellent: 38, good: 28, average: 18, below: 8 },
        '49': { excellent: 33, good: 23, average: 13, below: 3 },
        '59': { excellent: 28, good: 18, average: 8, below: -2 },
        '80': { excellent: 23, good: 13, average: 3, below: -7 }
      }
    };

    // Определение возрастной группы
    let ageGroup = '80';
    if (age <= 19) ageGroup = '19';
    else if (age <= 29) ageGroup = '29';
    else if (age <= 39) ageGroup = '39';
    else if (age <= 49) ageGroup = '49';
    else if (age <= 59) ageGroup = '59';

    const norm = norms[gender][ageGroup];

    let rating = '';
    let percentile = '';
    if (reachDistance >= norm.excellent) {
      rating = 'Отлично';
      percentile = '90-100%';
    } else if (reachDistance >= norm.good) {
      rating = 'Хорошо';
      percentile = '75-90%';
    } else if (reachDistance >= norm.average) {
      rating = 'Средне';
      percentile = '50-75%';
    } else if (reachDistance >= norm.below) {
      rating = 'Ниже среднего';
      percentile = '25-50%';
    } else {
      rating = 'Требует улучшения';
      percentile = 'Ниже 25%';
    }

    const target = norm.good;

    let recommendation = '';
    if (rating === 'Требует улучшения') {
      recommendation = 'Рекомендуется ежедневная растяжка задней поверхности бедра и спины. Начните с 10 минут в день.';
    } else if (rating === 'Ниже среднего') {
      recommendation = 'Улучшите гибкость регулярными упражнениями на растяжку 3-4 раза в неделю.';
    } else if (rating === 'Средне') {
      recommendation = 'Хороший результат! Поддерживайте гибкость регулярной растяжкой.';
    } else {
      recommendation = 'Отличная гибкость! Продолжайте текущую программу тренировок.';
    }

    return [
      { value: reachDistance.toFixed(1), label: 'Результат', unit: 'см' },
      { value: rating, label: 'Оценка' },
      { value: percentile, label: 'Процентиль' },
      { value: `${target} см`, label: 'Целевой показатель' },
      { value: recommendation, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Сядьте на пол, ноги прямые, стопы касаются стенки теста. Медленно тянитесь вперёд к носкам, измерьте расстояние от стенки до кончиков пальцев.',
    about: 'Тест sit-and-reach — стандартный тест гибкости, оценивающий гибкость задней поверхности бедра и поясницы. Важный показатель общей физической подготовки и профилактики травм.',
    usage: 'Используйте для оценки гибкости, планирования программы растяжки, отслеживания прогресса.',
    formula: 'Оценка по сравнению с возрастными нормами\nОтлично/Хорошо/Средне/Ниже среднего',
    faq: [
      {
        question: 'Как правильно выполнять тест?',
        answer: 'Ноги прямые, колени не сгибать. Тянуться медленно, не рывками. Зафиксировать максимальное положение на 2 секунды. Делать выдох при наклоне.'
      },
      {
        question: 'Почему уменьшается гибкость с возрастом?',
        answer: 'С возрастом мышцы и связки теряют эластичность, уменьшается выработка коллагена. Регулярная растяжка помогает сохранить гибкость.'
      },
      {
        question: 'Как быстро можно улучшить гибкость?',
        answer: 'При регулярной растяжке (ежедневно по 10-15 минут) заметное улучшение возможно за 4-8 недель. Ключ к успеху — регулярность.'
      }
    ],
    sources: [
      { title: 'Sit and Reach Test — Topend Sports', url: 'https://www.topendsports.com/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор конвертера сахара в крови
export const bloodSugarConverterCalculator: Calculator = {
  id: 'blood-sugar-converter',
  slug: 'konverter-sahara-v-krovi',
  title: 'Конвертер сахара в крови',
  description: 'Перевод mg/dL ↔ mmol/L и оценка HbA1c',
  category: 'zdorove-i-krasota',
  subcategory: 'zdorove',
  type: 'formula',
  inputs: [
    {
      name: 'conversionType',
      label: 'Тип конвертации',
      type: 'select',
      options: [
        { value: 'mg_to_mmol', label: 'mg/dL → mmol/L' },
        { value: 'mmol_to_mg', label: 'mmol/L → mg/dL' },
        { value: 'hba1c_estimate', label: 'Оценка HbA1c по глюкозе' }
      ],
      defaultValue: 'mg_to_mmol'
    },
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0,
      max: 600
    },
    {
      name: 'measurementType',
      label: 'Тип измерения (для оценки HbA1c)',
      type: 'select',
      options: [
        { value: 'fasting', label: 'Натощак' },
        { value: 'random', label: 'Случайное' },
        { value: 'average', label: 'Среднее значение' }
      ],
      defaultValue: 'average'
    }
  ],
  outputs: [
    { name: 'convertedValue', label: 'Конвертированное значение', type: 'text' },
    { name: 'hba1cEstimated', label: 'Оценка HbA1c', type: 'text' },
    { name: 'category', label: 'Категория', type: 'text' },
    { name: 'referenceRange', label: 'Референсные значения', type: 'text' }
  ],
  calculate: (inputs) => {
    const conversionType = String(inputs.conversionType);
    const value = Number(inputs.value);
    const measurementType = String(inputs.measurementType);

    if (!value) {
      return [{ value: 'Введите значение', label: 'Результат' }];
    }

    let convertedValue = '';
    let hba1cEstimated = '';
    let category = '';
    let mmolValue = 0;

    // Конвертация
    if (conversionType === 'mg_to_mmol') {
      mmolValue = value / 18;
      convertedValue = `${mmolValue.toFixed(2)} mmol/L`;
    } else if (conversionType === 'mmol_to_mg') {
      mmolValue = value;
      const mgValue = value * 18;
      convertedValue = `${mgValue.toFixed(0)} mg/dL`;
    } else {
      // Оценка HbA1c по глюкозе
      mmolValue = value;
      convertedValue = `${value.toFixed(1)} mmol/L (${(value * 18).toFixed(0)} mg/dL)`;
    }

    // Расчёт оценки HbA1c (приблизительно)
    // Формула: HbA1c ≈ (средняя глюкоза + 46.7) / 28.7 для mg/dL
    const avgGlucoseMg = conversionType === 'mmol_to_mg' ? value * 18 : value;
    let hba1c = (avgGlucoseMg + 46.7) / 28.7;
    hba1cEstimated = `${hba1c.toFixed(1)}%`;

    // Категория
    if (measurementType === 'fasting') {
      if (mmolValue < 3.9) category = 'Гипогликемия (низкий сахар)';
      else if (mmolValue < 5.6) category = 'Норма';
      else if (mmolValue < 7.0) category = 'Нарушение толерантности к глюкозе';
      else category = 'Диабет';
    } else {
      if (mmolValue < 4.0) category = 'Гипогликемия';
      else if (mmolValue < 7.8) category = 'Норма';
      else if (mmolValue < 11.1) category = 'Повышенный уровень';
      else category = 'Высокий уровень (требует внимания)';
    }

    return [
      { value: convertedValue, label: 'Конвертированное значение' },
      { value: hba1cEstimated, label: 'Оценка HbA1c' },
      { value: category, label: 'Категория' },
      { value: 'Норма: 3.9-5.6 mmol/L (70-100 mg/dL) натощак; HbA1c < 5.7%', label: 'Референсные значения' }
    ];
  },
  content: {
    howTo: 'Введите значение сахара в крови и выберите тип конвертации. Для оценки HbA1c выберите соответствующий режим.',
    about: 'Калькулятор переводит значения глюкозы из mg/dL (американская система) в mmol/L (европейская/российская) и наоборот. Также оценивает уровень HbA1c — важный показатель контроля диабета.',
    usage: 'Используйте для перевода результатов анализов между системами измерения, оценки рисков диабета, мониторинга уровня сахара.',
    formula: 'mmol/L = mg/dL / 18\nmg/dL = mmol/L × 18\nHbA1c ≈ (средняя глюкоза + 46.7) / 28.7',
    faq: [
      {
        question: 'Какая система измерения используется в России?',
        answer: 'В России используется mmol/L (миллимоль на литр). США и некоторые другие страны используют mg/dL.'
      },
      {
        question: 'Что такое HbA1c?',
        answer: 'HbA1c (гликированный гемоглобин) показывает средний уровень сахара в крови за последние 2-3 месяца. Норма < 5.7%, преддиабет 5.7-6.4%, диабет ≥ 6.5%.'
      },
      {
        question: 'Насколько точна оценка HbA1c по глюкозе?',
        answer: 'Это приблизительная оценка. Точный HbA1c можно определить только лабораторным анализом крови. Оценка может отличаться на 0.3-0.5%.'
      }
    ],
    sources: [
      { title: 'Blood Glucose Conversion — Diabetes UK', url: 'https://www.diabetes.org.uk/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор офтальмологических рецептов
export const eyePrescriptionCalculator: Calculator = {
  id: 'eye-prescription',
  slug: 'recept-dlya-ochkov',
  title: 'Калькулятор офтальмологического рецепта',
  description: 'Расчёт диоптрий, остроты зрения и конвертация рецептов',
  category: 'zdorove-i-krasota',
  subcategory: 'zdorove',
  type: 'formula',
  inputs: [
    {
      name: 'sphereRight',
      label: 'Сфера (OD/правый глаз) в диоптриях',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: -20,
      max: 20,
      step: 0.25
    },
    {
      name: 'cylinderRight',
      label: 'Цилиндр (OD/правый глаз)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: -6,
      max: 0,
      step: 0.25
    },
    {
      name: 'axisRight',
      label: 'Ось (OD/правый глаз) в градусах',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 180,
      step: 1
    },
    {
      name: 'sphereLeft',
      label: 'Сфера (OS/левый глаз) в диоптриях',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: -20,
      max: 20,
      step: 0.25
    },
    {
      name: 'cylinderLeft',
      label: 'Цилиндр (OS/левый глаз)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: -6,
      max: 0,
      step: 0.25
    },
    {
      name: 'axisLeft',
      label: 'Ось (OS/левый глаз) в градусах',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 180,
      step: 1
    },
    {
      name: 'pd',
      label: 'Межзрачковое расстояние (PD) в мм',
      type: 'number',
      placeholder: '62',
      defaultValue: 62,
      min: 50,
      max: 80
    }
  ],
  outputs: [
    { name: 'sphericalEquivalentRight', label: 'Сферический эквивалент (правый)', type: 'number', unit: 'D' },
    { name: 'sphericalEquivalentLeft', label: 'Сферический эквивалент (левый)', type: 'number', unit: 'D' },
    { name: 'visualAcuityRight', label: 'Примерная острота зрения (правый)', type: 'text' },
    { name: 'visualAcuityLeft', label: 'Примерная острота зрения (левый)', type: 'text' },
    { name: 'myopiaHyperopia', label: 'Тип коррекции', type: 'text' },
    { name: 'astigmatism', label: 'Астигматизм', type: 'text' }
  ],
  calculate: (inputs) => {
    const sphereRight = Number(inputs.sphereRight) || 0;
    const cylinderRight = Number(inputs.cylinderRight) || 0;
    const axisRight = Number(inputs.axisRight) || 0;
    const sphereLeft = Number(inputs.sphereLeft) || 0;
    const cylinderLeft = Number(inputs.cylinderLeft) || 0;
    const axisLeft = Number(inputs.axisLeft) || 0;

    // Сферический эквивалент = Сфера + Цилиндр/2
    const seRight = sphereRight + cylinderRight / 2;
    const seLeft = sphereLeft + cylinderLeft / 2;

    // Примерная острота зрения без коррекции (грубая оценка)
    // Не является медицинской точной оценкой!
    const estimateAcuity = (sphericalEquiv: number): string => {
      const se = Math.abs(sphericalEquiv);
      if (se < 0.25) return '20/20 (1.0)';
      if (se < 1) return '~20/25-20/40 (0.8-0.5)';
      if (se < 2) return '~20/50-20/100 (0.4-0.2)';
      if (se < 4) return '~20/100-20/200 (0.2-0.1)';
      if (se < 6) return '~20/200-20/400 (0.1-0.05)';
      return '< 20/400 (< 0.05)';
    };

    // Определение типа
    let myopiaHyperopia = '';
    const avgSE = (seRight + seLeft) / 2;
    if (avgSE < -0.5) myopiaHyperopia = 'Близорукость (миопия)';
    else if (avgSE > 0.5) myopiaHyperopia = 'Дальнозоркость (гиперметропия)';
    else myopiaHyperopia = 'Эмметропия или лёгкая аметропия';

    // Астигматизм
    const maxCylinder = Math.max(Math.abs(cylinderRight), Math.abs(cylinderLeft));
    let astigmatism = '';
    if (maxCylinder < 0.5) astigmatism = 'Нет или незначительный';
    else if (maxCylinder < 1.5) astigmatism = 'Слабый';
    else if (maxCylinder < 2.5) astigmatism = 'Средний';
    else if (maxCylinder < 4) astigmatism = 'Высокий';
    else astigmatism = 'Очень высокий';

    return [
      { value: seRight.toFixed(2), label: 'Сферический эквивалент (правый)', unit: 'D' },
      { value: seLeft.toFixed(2), label: 'Сферический эквивалент (левый)', unit: 'D' },
      { value: estimateAcuity(seRight), label: 'Примерная острота зрения (правый)' },
      { value: estimateAcuity(seLeft), label: 'Примерная острота зрения (левый)' },
      { value: myopiaHyperopia, label: 'Тип коррекции' },
      { value: astigmatism, label: 'Астигматизм' }
    ];
  },
  content: {
    howTo: 'Введите параметры рецепта: сферу, цилиндр и ось для каждого глаза. Сферический эквивалент помогает оценить общую силу коррекции.',
    about: 'Калькулятор помогает понять офтальмологический рецепт: рассчитывает сферический эквивалент, оценивает тип аметропии (близорукость/дальнозоркость) и степень астигматизма.',
    usage: 'Используйте для понимания своего рецепта, оценки изменений при новых очках, конвертации между форматами записи (минус/плюс цилиндр).',
    formula: 'Сферический эквивалент = Сфера + Цилиндр/2\nОстрота зрения ≈ приблизительная оценка по силе коррекции',
    faq: [
      {
        question: 'Что означает «сфера», «цилиндр» и «ось»?',
        answer: 'Сфера (Sphere) — сила линзы для коррекции близорукости (-) или дальнозоркости (+). Цилиндр (Cylinder) — коррекция астигматизма. Ось (Axis) — ориентация цилиндра в градусах (1-180°).'
      },
      {
        question: 'Что такое сферический эквивалент?',
        answer: 'Это усреднённая сила коррекции, которая учитывает и сферу, и астигматизм. Используется для оценки общей аметропии.'
      },
      {
        question: 'Почему цилиндр всегда отрицательный?',
        answer: 'В некоторых странах (включая Россию) используется «минус-цилиндровая» запись. В США и некоторых европейских странах — «плюс-цилиндровая». Значения конвертируются: новая сфера = старая сфера + старый цилиндр, новый цилиндр = −старый цилиндр, ось меняется на 90°.'
      },
      {
        question: 'Можно ли использовать калькулятор для подбора очков онлайн?',
        answer: 'Нет! Этот калькулятор только для справки. Для подбора очков необходима консультация офтальмолога или оптометриста с полным обследованием.'
      }
    ],
    sources: [
      { title: 'Understanding Your Eyeglass Prescription — AAO', url: 'https://www.aao.org/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Экспорт всех калькуляторов
export const healthMore2Calculators = [
  mealCalorieCalculator,
  sleepQualityCalculator,
  bodyFatNavyCalculator,
  oneRepMaxCalculator,
  vo2maxCalculator,
  smokingCostCalculator,
  waterActivityCalculator,
  flexibilityTestCalculator,
  bloodSugarConverterCalculator,
  eyePrescriptionCalculator
];
