import type { Calculator } from '../types';

export const shoppingDealsCalculators: Calculator[] = [
  {
    id: 'discount-shopping-calculator',
    slug: 'discount-calculator',
    title: 'Калькулятор скидок',
    description: 'Рассчитайте финальную цену с учётом всех скидок',
    category: 'shopping',
    subcategory: 'deals',
    type: 'arithmetic',
    inputs: [
      {
        name: 'originalPrice',
        label: 'Начальная цена',
      type: 'number', min: 0
      },
      {
        name: 'discountPercent',
        label: 'Процент скидки',
      type: 'number', min: 0,
        max: 100,
        defaultValue: 10
      },
      {
        name: 'additionalDiscount',
        label: 'Дополнительная скидка',
      type: 'number', min: 0,
        max: 50,
        defaultValue: 0
      }
    ],
    outputs: [
      {
        name: 'discountAmount',
        label: 'Сумма скидки',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'finalPrice',
        label: 'Итоговая цена',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'totalSavings',
        label: 'Общая экономия',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'savingsPercent',
        label: 'Процент экономии',
      type: 'number',
      unit: '%'
      }
    ],
    calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
      const firstDiscount = inputs.originalPrice * (inputs.discountPercent / 100);
      const afterFirstDiscount = inputs.originalPrice - firstDiscount;
      const secondDiscount = afterFirstDiscount * (inputs.additionalDiscount / 100);
      const finalPrice = Math.round(afterFirstDiscount - secondDiscount);
      const totalSavings = inputs.originalPrice - finalPrice;
      const savingsPercent = Math.round((totalSavings / inputs.originalPrice) * 100);

      return [{ value: Math.round(firstDiscount + secondDiscount), label: 'discountAmount', unit: '' }];
    },
    content: {
      howTo: `Для расчёта:
1. Укажите начальную цену товара
2. Введите процент скидки
3. Добавьте дополнительную скидку если есть`,
      about: `Некоторые магазины дают скидки "скидка на скидку" (умножаются), а не складываются.`,
      formula: `Итог = Цена × (1 - Скидка1/100) × (1 - Скидка2/100)`,
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'bulk-discount-calculator',
    slug: 'bulk-discount-calculator',
    title: 'Калькулятор оптовой скидки',
    description: 'Рассчитайте выгоду от покупки оптом или в большом количестве',
    category: 'shopping',
    subcategory: 'deals',
    type: 'arithmetic',
    inputs: [
      {
        name: 'unitPrice',
        label: 'Цена за штуку',
      type: 'number', min: 0
      },
      {
        name: 'bulkPrice',
        label: 'Цена за партию',
      type: 'number', min: 0
      },
      {
        name: 'quantity',
        label: 'Количество в партии',
      type: 'number', min: 2
      }
    ],
    outputs: [
      {
        name: 'regularTotal',
        label: 'Обычная цена',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'savings',
        label: 'Экономия',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'discountPercent',
        label: 'Скидка',
      type: 'number',
      unit: '%'
      },
      {
        name: 'unitPriceAfter',
        label: 'Цена за штуку после скидки',
      type: 'number',
      unit: '₽'
      }
    ],
    calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
      const regularTotal = inputs.unitPrice * inputs.quantity;
      const savings = regularTotal - inputs.bulkPrice;
      const discountPercent = Math.round((savings / regularTotal) * 100);
      const unitPriceAfter = Math.round(inputs.bulkPrice / inputs.quantity);

      return [];
    },
    content: {
      howTo: `Для расчёта выгоды:
1. Укажите обычную цену за штуку
2. Введите цену всей партии
3. Укажите количество`,
      about: `Оптовые покупки выгодны при больших объёмах и частом потреблении.`,
      formula: `Скидка = (Обычная цена - Оптовая) / Обычная цена`,
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'loyalty-cashback-calculator',
    slug: 'loyalty-cashback-calculator',
    title: 'Калькулятор кешбэка и бонусов',
    description: 'Рассчитайте выгоду от программ лояльности',
    category: 'shopping',
    subcategory: 'deals',
    type: 'arithmetic',
    inputs: [
      {
        name: 'monthlySpend',
        label: 'Траты в месяц',
      type: 'number', min: 0
      },
      {
        name: 'cashbackPercent',
        label: 'Процент кешбэка',
      type: 'number', min: 0,
        max: 30,
        defaultValue: 3
      },
      {
        name: 'bonusMultiplier',
        label: 'Умножитель бонусов',
        type: 'select',
                options: [
          { value: '1', label: 'Нет' },
          { value: '2', label: '2x (двойные бонусы)' },
          { value: '3', label: '3x (тройные)' },
          { value: '5', label: '5x (повышенные)' }
        ],
        defaultValue: '1'
      }
    ],
    outputs: [
      {
        name: 'monthlyCashback',
        label: 'Кешбэк в месяц',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'annualCashback',
        label: 'Кешбэк в год',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'effectiveDiscount',
        label: 'Эффективная скидка',
      type: 'number',
      unit: '%'
      }
    ],
    calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
      const baseCashback = inputs.monthlySpend * (inputs.cashbackPercent / 100);
      const multiplier = parseInt(inputs.bonusMultiplier);
      const monthlyCashback = Math.round(baseCashback * multiplier);
      const annualCashback = monthlyCashback * 12;
      const effectiveDiscount = Math.round(inputs.cashbackPercent * multiplier * 10) / 10;

      return [];
    },
    content: {
      howTo: `Для расчёта:
1. Укажите средние ежемесячные траты
2. Введите процент кешбэка программы
3. Учтите бонусные акции`,
      about: `Программы лояльности могут давать 3-10% возврата. При умножителях выгода значительно выше.`,
      formula: `Кешбэк = Траты × Процент × Множитель`,
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'compare-price-calculator',
    slug: 'compare-price-calculator',
    title: 'Калькулятор сравнения цен',
    description: 'Сравните цены в разных магазинах с учётом доставки',
    category: 'shopping',
    subcategory: 'deals',
    type: 'arithmetic',
    inputs: [
      {
        name: 'store1Price',
        label: 'Цена в магазине 1',
      type: 'number', min: 0
      },
      {
        name: 'store1Delivery',
        label: 'Доставка магазина 1',
      type: 'number', min: 0,
        defaultValue: 0
      },
      {
        name: 'store2Price',
        label: 'Цена в магазине 2',
      type: 'number', min: 0
      },
      {
        name: 'store2Delivery',
        label: 'Доставка магазина 2',
      type: 'number', min: 0,
        defaultValue: 0
      }
    ],
    outputs: [
      {
        name: 'store1Total',
        label: 'Итого магазин 1',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'store2Total',
        label: 'Итого магазин 2',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'savings',
        label: 'Экономия',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'betterStore',
        label: 'Выгоднее'
      }
    ],
    calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
      const store1Total = inputs.store1Price + inputs.store1Delivery;
      const store2Total = inputs.store2Price + inputs.store2Delivery;
      const savings = Math.abs(store1Total - store2Total);
      const betterStore = store1Total < store2Total ? 'Магазин 1' : 'Магазин 2';

      return [];
    },
    content: {
      howTo: `Для сравнения:
1. Укажите цену в первом магазине
2. Добавьте стоимость доставки
3. То же для второго магазина`,
      about: `Дорогая доставка может свести на нет выгоду от низкой цены товара.`,
      formula: `Итого = Цена + Доставка`,
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'unit-price-calculator',
    slug: 'unit-price-calculator',
    title: 'Калькулятор цены за единицу',
    description: 'Сравните, где выгоднее: большая упаковка или маленькая',
    category: 'shopping',
    subcategory: 'deals',
    type: 'arithmetic',
    inputs: [
      {
        name: 'option1Price',
        label: 'Цена варианта 1',
      type: 'number', min: 0
      },
      {
        name: 'option1Amount',
        label: 'Количество варианта 1',
      type: 'number',
                min: 0.1
      },
      {
        name: 'option1Unit',
        label: 'Единица варианта 1',
        type: 'select',
                options: [
          { value: 'g', label: 'грамм' },
          { value: 'kg', label: 'кг' },
          { value: 'ml', label: 'мл' },
          { value: 'l', label: 'л' },
          { value: 'pc', label: 'шт' }
        ]
      },
      {
        name: 'option2Price',
        label: 'Цена варианта 2',
      type: 'number', min: 0
      },
      {
        name: 'option2Amount',
        label: 'Количество варианта 2',
      type: 'number',
                min: 0.1
      },
      {
        name: 'option2Unit',
        label: 'Единица варианта 2',
        type: 'select',
                options: [
          { value: 'g', label: 'грамм' },
          { value: 'kg', label: 'кг' },
          { value: 'ml', label: 'мл' },
          { value: 'l', label: 'л' },
          { value: 'pc', label: 'шт' }
        ]
      }
    ],
    outputs: [
      {
        name: 'unitPrice1',
        label: 'Цена за единицу 1',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'unitPrice2',
        label: 'Цена за единицу 2',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'betterOption',
        label: 'Выгоднее'
      },
      {
        name: 'savingsPercent',
        label: 'Разница',
      type: 'number',
      unit: '%'
      }
    ],
    calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
      const toBaseUnit = (amount: number, unit: string) => {
        const multipliers: Record<string, number> = { g: 1, kg: 1000, ml: 1, l: 1000, pc: 1 };
        return amount * multipliers[unit];
      };

      const base1 = toBaseUnit(inputs.option1Amount, inputs.option1Unit);
      const base2 = toBaseUnit(inputs.option2Amount, inputs.option2Unit);

      const unitPrice1 = Math.round((inputs.option1Price / base1) * 1000 * 100) / 100;
      const unitPrice2 = Math.round((inputs.option2Price / base2) * 1000 * 100) / 100;

      const betterOption = unitPrice1 < unitPrice2 ? 'Вариант 1' : 'Вариант 2';
      const minPrice = Math.min(unitPrice1, unitPrice2);
      const maxPrice = Math.max(unitPrice1, unitPrice2);
      const savingsPercent = Math.round(((maxPrice - minPrice) / maxPrice) * 100);

      return [];
    },
    content: {
      howTo: `Для сравнения:
1. Укажите цену и количество первого варианта
2. Укажите цену и количество второго варианта
3. Выберите единицы измерения`,
      about: `Большая упаковка не всегда выгоднее. Считайте цену за единицу (кг, литр, штуку).`,
      formula: `Цена за единицу = Цена / Количество`,
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'installment-calculator',
    slug: 'installment-calculator',
    title: 'Калькулятор рассрочки',
    description: 'Рассчитайте переплату и ежемесячный платёж при покупке в рассрочку',
    category: 'shopping',
    subcategory: 'deals',
    type: 'arithmetic',
    inputs: [
      {
        name: 'itemPrice',
        label: 'Цена товара',
      type: 'number', min: 1000
      },
      {
        name: 'months',
        label: 'Срок рассрочки',
      type: 'number', min: 1,
        max: 36
      },
      {
        name: 'interestRate',
        label: 'Процентная ставка',
      type: 'number', min: 0,
        max: 100,
        defaultValue: 0
      },
      {
        name: 'downPayment',
        label: 'Первый взнос',
      type: 'number', min: 0,
        defaultValue: 0
      }
    ],
    outputs: [
      {
        name: 'loanAmount',
        label: 'Сумма кредита',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'monthlyPayment',
        label: 'Ежемесячный платёж',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'totalInterest',
        label: 'Переплата',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'totalCost',
        label: 'Общая сумма',
      type: 'number',
      unit: '₽'
      }
    ],
    calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
      const loanAmount = inputs.itemPrice - inputs.downPayment;

      let monthlyPayment;
      let totalInterest;

      if (inputs.interestRate === 0) {
        monthlyPayment = Math.round(loanAmount / inputs.months);
        totalInterest = 0;
      } else {
        const monthlyRate = inputs.interestRate / 100 / 12;
        const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, inputs.months)) /
                       (Math.pow(1 + monthlyRate, inputs.months) - 1);
        monthlyPayment = Math.round(payment);
        totalInterest = monthlyPayment * inputs.months - loanAmount;
      }

      const totalCost = inputs.downPayment + monthlyPayment * inputs.months;

      return [];
    },
    content: {
      howTo: `Для расчёта рассрочки:
1. Укажите цену товара
2. Выберите срок (обычно 3-12 месяцев)
3. Учтите ставку (0% для беспроцентной)
4. Добавьте первый взнос если есть`,
      about: `Беспроцентная рассрочка от банка обычно без переплаты. Рассрочка от магазина может содержать скрытые комиссии.`,
      formula: `Аннуитетный платёж = Сумма × (Ставка × (1+Ставка)^n) / ((1+Ставка)^n - 1)`,
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'shopping-budget-calculator',
    slug: 'shopping-budget-calculator',
    title: 'Калькулятор бюджета покупок',
    description: 'Распределите бюджет между категориями одежды',
    category: 'shopping',
    subcategory: 'budget',
    type: 'arithmetic',
    inputs: [
      {
        name: 'totalBudget',
        label: 'Общий бюджет',
      type: 'number', min: 5000
      },
      {
        name: 'season',
        label: 'Сезон',
        type: 'select',
                options: [
          { value: 'spring-summer', label: 'Весна-лето' },
          { value: 'autumn-winter', label: 'Осень-зима' },
          { value: 'all', label: 'Всесезонный гардероб' }
        ]
      }
    ],
    outputs: [
      {
        name: 'outerwear',
        label: 'Верхняя одежда',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'tops',
        label: 'Верх (футболки/блузки)',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'bottoms',
        label: 'Низ',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'shoes',
        label: 'Обувь',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'accessories',
        label: 'Аксессуары',
      type: 'number',
      unit: '₽'
      }
    ],
    calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
      const distribution: Record<string, { outerwear: number; tops: number; bottoms: number; shoes: number; accessories: number }> = {
        'spring-summer': { outerwear: 0.1, tops: 0.25, bottoms: 0.25, shoes: 0.25, accessories: 0.15 },
        'autumn-winter': { outerwear: 0.3, tops: 0.2, bottoms: 0.2, shoes: 0.2, accessories: 0.1 },
        all: { outerwear: 0.2, tops: 0.25, bottoms: 0.25, shoes: 0.2, accessories: 0.1 }
      };

      const dist = distribution[String(inputs.season)];

      return [{ value: Math.round(inputs.totalBudget * dist.outerwear), label: 'outerwear', unit: '' }, { value: Math.round(inputs.totalBudget * dist.tops), label: 'tops', unit: '' }, { value: Math.round(inputs.totalBudget * dist.bottoms), label: 'bottoms', unit: '' }, { value: Math.round(inputs.totalBudget * dist.shoes), label: 'shoes', unit: '' }, { value: Math.round(inputs.totalBudget * dist.accessories), label: 'accessories', unit: '' }];
    },
    content: {
      howTo: `Для планирования:
1. Укажите общий бюджет на покупки
2. Выберите сезон
3. Получите распределение по категориям`,
      about: `Правило бюджета: инвестируйте больше в базовые вещи и обувь, меньше в трендовые предметы.`,
      formula: `Распределение = Бюджет × Процент категории`,
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'wishlist-priority-calculator',
    slug: 'wishlist-priority-calculator',
    title: 'Калькулятор приоритетов wishlist',
    description: 'Расставьте приоритеты покупкам по полезности и цене',
    category: 'shopping',
    subcategory: 'planning',
    type: 'formula',
    inputs: [
      {
        name: 'price1',
        label: 'Цена товара 1',
      type: 'number', min: 0
      },
      {
        name: 'utility1',
        label: 'Полезность товара 1',
      type: 'number', min: 1,
        max: 10
      },
      {
        name: 'price2',
        label: 'Цена товара 2',
      type: 'number', min: 0
      },
      {
        name: 'utility2',
        label: 'Полезность товара 2',
      type: 'number', min: 1,
        max: 10
      }
    ],
    outputs: [
      {
        name: 'value1',
        label: 'Ценность товара 1',
      type: 'number',
      unit: 'балл/₽'
      },
      {
        name: 'value2',
        label: 'Ценность товара 2',
      type: 'number',
      unit: 'балл/₽'
      },
      {
        name: 'priority',
        label: 'Покупать сначала'
      }
    ],
    calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
      const value1 = Math.round((inputs.utility1 / inputs.price1) * 10000) / 10;
      const value2 = Math.round((inputs.utility2 / inputs.price2) * 10000) / 10;

      const priority = value1 > value2 ? 'Товар 1 (лучшее соотношение)' : 'Товар 2 (лучшее соотношение)';

      return [];
    },
    content: {
      howTo: `Для определения приоритета:
1. Оцените полезность каждого товара (1-10)
2. Укажите цены
3. Сравните ценность (полезность/цена)`,
      about: `Покупайте сначала то, что даёт больше пользы за меньшие деньги.`,
      formula: `Ценность = Полезность / Цена`,
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'sales-calendar',
    slug: 'sales-calendar',
    title: 'Календарь распродаж',
    description: 'Узнайте когда лучше всего покупать разные категории товаров',
    category: 'shopping',
    subcategory: 'planning',
    type: 'arithmetic',
    inputs: [
      {
        name: 'category',
        label: 'Категория',
        type: 'select',
                options: [
          { value: 'clothing', label: 'Одежда' },
          { value: 'shoes', label: 'Обувь' },
          { value: 'electronics', label: 'Электроника' },
          { value: 'furniture', label: 'Мебель' },
          { value: 'travel', label: 'Путешествия' },
          { value: 'appliances', label: 'Бытовая техника' }
        ]
      },
      {
        name: 'urgency',
        label: 'Срочность',
        type: 'select',
                options: [
          { value: 'low', label: 'Не срочно (можу ждать 3-6 мес)' },
          { value: 'medium', label: 'Средняя (1-3 месяца)' },
          { value: 'high', label: 'Срочно (нужно сейчас)' }
        ]
      }
    ],
    outputs: [
      {
        name: 'bestMonths',
        label: 'Лучшие месяцы'
      },
      {
        name: 'expectedDiscount',
        label: 'Ожидаемая скидка'
      },
      {
        name: 'recommendation',
        label: 'Рекомендация'
      }
    ],
    calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
      const salesData: Record<string, { best: string; discount: string }> = {
        clothing: {
          best: 'Январь, июль, ноябрь (чёрная пятница)',
          discount: '30-70%'
        },
        shoes: {
          best: 'Январь, июль, сентябрь',
          discount: '30-50%'
        },
        electronics: {
          best: 'Ноябрь, февраль, сентябрь',
          discount: '15-40%'
        },
        furniture: {
          best: 'Январь, июль, август',
          discount: '20-50%'
        },
        travel: {
          best: 'Январь-май (раннее бронирование), сентябрь',
          discount: '20-60%'
        },
        appliances: {
          best: 'Март, май, ноябрь',
          discount: '20-40%'
        }
      };

      const data = salesData[String(inputs.category)];

      let recommendation;
      if (inputs.urgency === 'low') {
        recommendation = `Подождите до лучших месяцев: ${data.best}. Сэкономите ${data.discount}`;
      } else if (inputs.urgency === 'medium') {
        recommendation = 'Подождите 1-2 месяца или смотрите промокоды';
      } else {
        recommendation = 'Смотрите текущие акции и кешбэк, но будьте готовы переплатить';
      }

      return [{ value: data.best, label: 'bestMonths', unit: '' }, { value: data.discount, label: 'expectedDiscount', unit: '' }];
    },
    content: {
      howTo: `Для планирования:
1. Выберите категорию покупки
2. Укажите насколько срочно нужно
3. Получите рекомендацию по срокам`,
      about: `Сезонные распродажи позволяют сэкономить 30-70%. Чёрная пятница, летние и зимние распродажи - лучшее время.`,
      formula: `Оптимальное время = Сезонность категории`,
      faq: [],
      sources: [
        { title: 'Яндекс.Маркет - календарь скидок', url: 'https://market.yandex.ru/sales' }
      ],
      updatedAt: '2026-04-08'
    }
  }
];
