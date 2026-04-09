import { Calculator } from '../types';

// Калькулятор ROI маркетинга
export const marketingRoiCalculator: Calculator = {
  id: 'marketing-roi',
  slug: 'roi-marketing',
  title: 'ROI маркетинговых кампаний',
  description: 'Расчёт возврата инвестиций в маркетинговые кампании (ROMI)',
  category: 'biznes',
  subcategory: 'biznes-marketing',
  type: 'formula',
  inputs: [
    {
      name: 'revenue',
      label: 'Выручка от кампании (₽)',
      type: 'number',
      placeholder: '100000',
      defaultValue: 100000
    },
    {
      name: 'marketingCost',
      label: 'Затраты на маркетинг (₽)',
      type: 'number',
      placeholder: '20000',
      defaultValue: 20000
    },
    {
      name: 'productCost',
      label: 'Себестоимость товара (%)',
      type: 'number',
      placeholder: '40',
      defaultValue: 40
    }
  ],
  outputs: [
    { name: 'roi', label: 'ROMI (%)', type: 'number' },
    { name: 'profit', label: 'Прибыль (₽)', type: 'number' },
    { name: 'cpa', label: 'CPA (₽)', type: 'number' },
    { name: 'assessment', label: 'Оценка', type: 'text' }
  ],
  calculate: (inputs) => {
    const revenue = Number(inputs.revenue);
    const marketingCost = Number(inputs.marketingCost);
    const productCost = Number(inputs.productCost) / 100;
    
    if (!revenue || !marketingCost) {
      return [
        { value: '—', label: 'ROMI (%)' },
        { value: '—', label: 'Прибыль (₽)' },
        { value: '—', label: 'CPA (₽)' },
        { value: '', label: 'Оценка' }
      ];
    }
    
    const grossProfit = revenue * (1 - productCost);
    const netProfit = grossProfit - marketingCost;
    const romi = ((netProfit / marketingCost) * 100);
    const cpa = marketingCost / (revenue / 1000); // Assuming average order value
    
    let assessment = '';
    if (romi < 0) {
      assessment = '❌ Убыточная кампания';
    } else if (romi < 100) {
      assessment = '⚠️ Низкая эффективность';
    } else if (romi < 300) {
      assessment = '✅ Хороший результат';
    } else {
      assessment = '🌟 Отличный результат!';
    }
    
    return [
      { value: Math.round(romi * 10) / 10, label: 'ROMI (%)' },
      { value: Math.round(netProfit), label: 'Прибыль (₽)' },
      { value: Math.round(cpa), label: 'CPA (₽)' },
      { value: assessment, label: 'Оценка' }
    ];
  },
  content: {
    howTo: 'Введите выручку от маркетинговой кампании, затраты на маркетинг и процент себестоимости товара.',
    about: 'ROMI (Return on Marketing Investment) показывает, сколько прибыли принесла каждая вложенная рубль в маркетинг.',
    formula: 'ROMI = ((Прибыль - Маркетинг) / Маркетинг) × 100%',
    usage: 'Используется для оценки эффективности рекламных кампаний и каналов привлечения.',
    faq: [
      {
        question: 'Какой ROMI считается хорошим?',
        answer: 'ROMI > 100% означает, что кампания окупается. ROMI > 300% - хороший результат для большинства отраслей.'
      }
    ],
    sources: [
      { title: 'ROMI — Википедия', url: 'https://en.wikipedia.org/wiki/Return_on_marketing_investment' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор конверсии
export const conversionCalculator: Calculator = {
  id: 'conversion-rate',
  slug: 'konversiya',
  title: 'Конверсия и воронка продаж',
  description: 'Расчёт коэффициента конверсии на каждом этапе воронки продаж',
  category: 'biznes',
  subcategory: 'biznes-marketing',
  type: 'formula',
  inputs: [
    {
      name: 'visitors',
      label: 'Посетители/Показы',
      type: 'number',
      placeholder: '10000',
      defaultValue: 10000
    },
    {
      name: 'leads',
      label: 'Лиды (заявки)',
      type: 'number',
      placeholder: '500',
      defaultValue: 500
    },
    {
      name: 'qualified',
      label: 'Квалифицированные лиды',
      type: 'number',
      placeholder: '200',
      defaultValue: 200
    },
    {
      name: 'customers',
      label: 'Клиенты (продажи)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50
    }
  ],
  outputs: [
    { name: 'visitorToLead', label: 'Конверсия посетитель→лид (%)', type: 'number' },
    { name: 'leadToQualified', label: 'Квалификация лидов (%)', type: 'number' },
    { name: 'qualifiedToCustomer', label: 'Закрытие сделок (%)', type: 'number' },
    { name: 'totalConversion', label: 'Общая конверсия (%)', type: 'number' }
  ],
  calculate: (inputs) => {
    const visitors = Number(inputs.visitors);
    const leads = Number(inputs.leads);
    const qualified = Number(inputs.qualified);
    const customers = Number(inputs.customers);
    
    if (!visitors || !leads || !qualified || !customers) {
      return [
        { value: '—', label: 'Конверсия посетитель→лид (%)' },
        { value: '—', label: 'Квалификация лидов (%)' },
        { value: '—', label: 'Закрытие сделок (%)' },
        { value: '—', label: 'Общая конверсия (%)' }
      ];
    }
    
    const visitorToLead = (leads / visitors) * 100;
    const leadToQualified = (qualified / leads) * 100;
    const qualifiedToCustomer = (customers / qualified) * 100;
    const totalConversion = (customers / visitors) * 100;
    
    return [
      { value: Math.round(visitorToLead * 100) / 100, label: 'Конверсия посетитель→лид (%)' },
      { value: Math.round(leadToQualified * 100) / 100, label: 'Квалификация лидов (%)' },
      { value: Math.round(qualifiedToCustomer * 100) / 100, label: 'Закрытие сделок (%)' },
      { value: Math.round(totalConversion * 100) / 100, label: 'Общая конверсия (%)' }
    ];
  },
  content: {
    howTo: 'Введите количество посетителей, лидов, квалифицированных лидов и клиентов на каждом этапе воронки.',
    about: 'Воронка продаж показывает, сколько потенциальных клиентов проходит через каждый этап от знакомства до покупки.',
    usage: 'Используется для анализа эффективности продаж и выявления "узких мест" в воронке.',
    faq: [
      {
        question: 'Какая конверсия считается нормальной?',
        answer: 'Зависит от отрасли. Для e-commerce: 1-3%, для B2B: 5-20%, для landing pages: 10-30%.'
      }
    ],
    sources: [
      { title: 'Воронка продаж', url: 'https://ru.wikipedia.org/wiki/Воронка_продаж' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор CAC (Customer Acquisition Cost)
export const cacCalculator: Calculator = {
  id: 'customer-acquisition-cost',
  slug: 'cac-stoimost',
  title: 'Стоимость привлечения клиента (CAC)',
  description: 'Расчёт CAC и LTV (Lifetime Value) для оценки экономики бизнеса',
  category: 'biznes',
  subcategory: 'biznes-marketing',
  type: 'formula',
  inputs: [
    {
      name: 'marketingSpend',
      label: 'Маркетинговые расходы (₽/мес)',
      type: 'number',
      placeholder: '50000',
      defaultValue: 50000
    },
    {
      name: 'salesSpend',
      label: 'Расходы на продажи (₽/мес)',
      type: 'number',
      placeholder: '30000',
      defaultValue: 30000
    },
    {
      name: 'newCustomers',
      label: 'Новые клиенты (в мес)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'avgOrderValue',
      label: 'Средний чек (₽)',
      type: 'number',
      placeholder: '2000',
      defaultValue: 2000
    },
    {
      name: 'purchaseFrequency',
      label: 'Частота покупок (в год)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4
    },
    {
      name: 'customerLifetime',
      label: 'Срок жизни клиента (лет)',
      type: 'number',
      placeholder: '3',
      defaultValue: 3
    }
  ],
  outputs: [
    { name: 'cac', label: 'CAC (₽)', type: 'number' },
    { name: 'ltv', label: 'LTV (₽)', type: 'number' },
    { name: 'ltvCacRatio', label: 'LTV/CAC', type: 'number' },
    { name: 'payback', label: 'Окупаемость (мес)', type: 'number' },
    { name: 'assessment', label: 'Оценка бизнес-модели', type: 'text' }
  ],
  calculate: (inputs) => {
    const marketingSpend = Number(inputs.marketingSpend);
    const salesSpend = Number(inputs.salesSpend);
    const newCustomers = Number(inputs.newCustomers);
    const avgOrderValue = Number(inputs.avgOrderValue);
    const purchaseFrequency = Number(inputs.purchaseFrequency);
    const customerLifetime = Number(inputs.customerLifetime);
    
    if (!marketingSpend || !salesSpend || !newCustomers || !avgOrderValue) {
      return [
        { value: '—', label: 'CAC (₽)' },
        { value: '—', label: 'LTV (₽)' },
        { value: '—', label: 'LTV/CAC' },
        { value: '—', label: 'Окупаемость (мес)' },
        { value: '', label: 'Оценка бизнес-модели' }
      ];
    }
    
    const totalSpend = marketingSpend + salesSpend;
    const cac = totalSpend / newCustomers;
    const ltv = avgOrderValue * purchaseFrequency * customerLifetime;
    const ltvCacRatio = ltv / cac;
    const payback = cac / (avgOrderValue * purchaseFrequency / 12);
    
    let assessment = '';
    if (ltvCacRatio < 1) {
      assessment = '❌ Критично: LTV < CAC';
    } else if (ltvCacRatio < 3) {
      assessment = '⚠️ Слабая экономика (LTV/CAC < 3)';
    } else if (ltvCacRatio < 5) {
      assessment = '✅ Хорошая экономика';
    } else {
      assessment = '🌟 Отличная экономика!';
    }
    
    return [
      { value: Math.round(cac), label: 'CAC (₽)' },
      { value: Math.round(ltv), label: 'LTV (₽)' },
      { value: Math.round(ltvCacRatio * 10) / 10, label: 'LTV/CAC' },
      { value: Math.round(payback * 10) / 10, label: 'Окупаемость (мес)' },
      { value: assessment, label: 'Оценка бизнес-модели' }
    ];
  },
  content: {
    howTo: 'Введите маркетинговые расходы, расходы на продажи, количество новых клиентов и показатели среднего чека.',
    about: 'CAC (Cost to Acquire a Customer) - сколько денег тратится на привлечение одного клиента. LTV (Lifetime Value) - сколько денег приносит клиент за всё время.',
    formula: 'CAC = (Маркетинг + Продажи) / Новые клиенты. LTV = Средний чек × Частота × Срок жизни.',
    usage: 'Ключевые метрики для SaaS, e-commerce и подписочных бизнесов. Здоровый бизнес имеет LTV/CAC > 3.',
    faq: [
      {
        question: 'Какое соотношение LTV/CAC считается хорошим?',
        answer: 'LTV/CAC должно быть > 3 для устойчивого бизнеса. При < 1 бизнес убыточен на каждом клиенте.'
      }
    ],
    sources: [
      { title: 'Unit Economics', url: 'https://en.wikipedia.org/wiki/Unit_economics' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор цены на основе конкурентов
export const competitivePricingCalculator: Calculator = {
  id: 'competitive-pricing',
  slug: 'konkurentnaya-cena',
  title: 'Конкурентный анализ цен',
  description: 'Расчёт оптимальной цены на основе цен конкурентов и стратегии позиционирования',
  category: 'biznes',
  subcategory: 'bizbi-tsenoobrazovanie',
  type: 'formula',
  inputs: [
    {
      name: 'competitor1',
      label: 'Цена конкурента 1 (₽)',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000
    },
    {
      name: 'competitor2',
      label: 'Цена конкурента 2 (₽)',
      type: 'number',
      placeholder: '1200',
      defaultValue: 1200
    },
    {
      name: 'competitor3',
      label: 'Цена конкурента 3 (₽)',
      type: 'number',
      placeholder: '1100',
      defaultValue: 1100
    },
    {
      name: 'strategy',
      label: 'Стратегия ценообразования',
      type: 'select',
      options: [
        { value: 'lowest', label: 'Ниже рынка (-10%)' },
        { value: 'market', label: 'Рыночная цена' },
        { value: 'premium', label: 'Премиум (+20%)' },
        { value: 'skimming', label: 'Скimming (+30%)' }
      ],
      defaultValue: 'market'
    },
    {
      name: 'cost',
      label: 'Себестоимость (₽)',
      type: 'number',
      placeholder: '600',
      defaultValue: 600
    }
  ],
  outputs: [
    { name: 'avgCompetitorPrice', label: 'Средняя цена конкурентов (₽)', type: 'number' },
    { name: 'recommendedPrice', label: 'Рекомендуемая цена (₽)', type: 'number' },
    { name: 'margin', label: 'Маржа (%)', type: 'number' },
    { name: 'profit', label: 'Прибыль (₽)', type: 'number' }
  ],
  calculate: (inputs) => {
    const c1 = Number(inputs.competitor1);
    const c2 = Number(inputs.competitor2);
    const c3 = Number(inputs.competitor3);
    const strategy = String(inputs.strategy);
    const cost = Number(inputs.cost);
    
    if (!c1 || !cost) {
      return [
        { value: '—', label: 'Средняя цена конкурентов (₽)' },
        { value: '—', label: 'Рекомендуемая цена (₽)' },
        { value: '—', label: 'Маржа (%)' },
        { value: '—', label: 'Прибыль (₽)' }
      ];
    }
    
    // Calculate average competitor price (only counting provided values)
    const competitors = [c1, c2, c3].filter(c => c > 0);
    const avgCompetitorPrice = competitors.reduce((a, b) => a + b, 0) / competitors.length;
    
    // Apply strategy
    let multiplier = 1;
    switch (strategy) {
      case 'lowest': multiplier = 0.9; break;
      case 'market': multiplier = 1; break;
      case 'premium': multiplier = 1.2; break;
      case 'skimming': multiplier = 1.3; break;
    }
    
    const recommendedPrice = Math.round(avgCompetitorPrice * multiplier);
    
    // Ensure price covers cost
    const finalPrice = Math.max(recommendedPrice, cost * 1.1);
    
    const margin = ((finalPrice - cost) / finalPrice) * 100;
    const profit = finalPrice - cost;
    
    return [
      { value: Math.round(avgCompetitorPrice), label: 'Средняя цена конкурентов (₽)' },
      { value: finalPrice, label: 'Рекомендуемая цена (₽)' },
      { value: Math.round(margin * 10) / 10, label: 'Маржа (%)' },
      { value: profit, label: 'Прибыль (₽)' }
    ];
  },
  content: {
    howTo: 'Введите цены 2-3 конкурентов, выберите стратегию позиционирования и укажите свою себестоимость.',
    about: 'Конкурентное ценообразование учитывает рыночные цены и позиционирование вашего продукта.',
    usage: 'Используется для входа на рынок, пересмотра цен или запуска новых продуктов.',
    faq: [
      {
        question: 'Какую стратегию выбрать?',
        answer: 'Ниже рынка - для захвата доли. Рыночная - для стабильного роста. Премиум - если у вас уникальные преимущества.'
      }
    ],
    sources: [
      { title: 'Ценообразование', url: 'https://ru.wikipedia.org/wiki/Ценообразование' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор бонусов и комиссий
export const commissionCalculator: Calculator = {
  id: 'commission',
  slug: 'komissiya-bonusy',
  title: 'Расчёт комиссий и бонусов',
  description: 'Расчёт комиссий продавцов, бонусов менеджеров по продажам',
  category: 'biznes',
  subcategory: 'biznes-finance',
  type: 'formula',
  inputs: [
    {
      name: 'revenue',
      label: 'Выручка/Продажи (₽)',
      type: 'number',
      placeholder: '500000',
      defaultValue: 500000
    },
    {
      name: 'target',
      label: 'Целевой план (₽)',
      type: 'number',
      placeholder: '400000',
      defaultValue: 400000
    },
    {
      name: 'baseRate',
      label: 'Базовый процент (%)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5
    },
    {
      name: 'bonusRate',
      label: 'Бонусный процент (%)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2
    }
  ],
  outputs: [
    { name: 'achievement', label: 'Выполнение плана (%)', type: 'number' },
    { name: 'baseCommission', label: 'Базовая комиссия (₽)', type: 'number' },
    { name: 'bonusCommission', label: 'Бонусная комиссия (₽)', type: 'number' },
    { name: 'totalCommission', label: 'Итого комиссия (₽)', type: 'number' },
    { name: 'effectiveRate', label: 'Эффективный %', type: 'number' }
  ],
  calculate: (inputs) => {
    const revenue = Number(inputs.revenue);
    const target = Number(inputs.target);
    const baseRate = Number(inputs.baseRate) / 100;
    const bonusRate = Number(inputs.bonusRate) / 100;
    
    if (!revenue || !target) {
      return [
        { value: '—', label: 'Выполнение плана (%)' },
        { value: '—', label: 'Базовая комиссия (₽)' },
        { value: '—', label: 'Бонусная комиссия (₽)' },
        { value: '—', label: 'Итого комиссия (₽)' },
        { value: '—', label: 'Эффективный %' }
      ];
    }
    
    const achievement = (revenue / target) * 100;
    const baseCommission = revenue * baseRate;
    
    // Bonus applies only if target is exceeded
    let bonusCommission = 0;
    if (revenue > target) {
      bonusCommission = (revenue - target) * bonusRate;
    }
    
    const totalCommission = baseCommission + bonusCommission;
    const effectiveRate = (totalCommission / revenue) * 100;
    
    return [
      { value: Math.round(achievement * 10) / 10, label: 'Выполнение плана (%)' },
      { value: Math.round(baseCommission), label: 'Базовая комиссия (₽)' },
      { value: Math.round(bonusCommission), label: 'Бонусная комиссия (₽)' },
      { value: Math.round(totalCommission), label: 'Итого комиссия (₽)' },
      { value: Math.round(effectiveRate * 100) / 100, label: 'Эффективный %' }
    ];
  },
  content: {
    howTo: 'Введите фактическую выручку, целевой план, базовый процент комиссии и бонусный процент за перевыполнение.',
    about: 'Система мотивации продавцов с прогрессивной шкалой: базовый процент от всех продаж + бонус за перевыполнение плана.',
    usage: 'Используется для расчёта зарплаты менеджеров по продажам, планирования фонда оплаты труда.',
    faq: [
      {
        question: 'Какой процент комиссии нормальный?',
        answer: 'В B2B: 2-5% от выручки. В B2C: 5-15%. Бонус за перевыполнение: +1-3% на сумму превышения.'
      }
    ],
    sources: [
      { title: 'Комиссия', url: 'https://ru.wikipedia.org/wiki/Комиссия' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор точки безубыточности (расширенный)
export const breakEvenAdvancedCalculator: Calculator = {
  id: 'break-even-advanced',
  slug: 'tochka-bezubytochnosti-rasshirennaya',
  title: 'Точка безубыточности (расширенная)',
  description: 'Расчёт точки безубыточности с учётом нескольких продуктов, переменных затрат и анализ чувствительности',
  category: 'biznes',
  subcategory: 'biznes-finance',
  type: 'formula',
  inputs: [
    {
      name: 'fixedCosts',
      label: 'Постоянные затраты (₽/мес)',
      type: 'number',
      placeholder: '100000',
      defaultValue: 100000
    },
    {
      name: 'price',
      label: 'Цена единицы (₽)',
      type: 'number',
      placeholder: '500',
      defaultValue: 500
    },
    {
      name: 'variableCost',
      label: 'Переменные затраты на ед. (₽)',
      type: 'number',
      placeholder: '300',
      defaultValue: 300
    },
    {
      name: 'targetProfit',
      label: 'Целевая прибыль (₽/мес)',
      type: 'number',
      placeholder: '50000',
      defaultValue: 50000
    }
  ],
  outputs: [
    { name: 'contributionMargin', label: 'Маржинальный доход (₽)', type: 'number' },
    { name: 'breakEvenUnits', label: 'Точка безубыточности (шт)', type: 'number' },
    { name: 'breakEvenRevenue', label: 'Точка безубыточности (₽)', type: 'number' },
    { name: 'targetUnits', label: 'Для целевой прибыли (шт)', type: 'number' },
    { name: 'marginPercent', label: 'Коэффициент маржи (%)', type: 'number' }
  ],
  calculate: (inputs) => {
    const fixedCosts = Number(inputs.fixedCosts);
    const price = Number(inputs.price);
    const variableCost = Number(inputs.variableCost);
    const targetProfit = Number(inputs.targetProfit);
    
    if (!fixedCosts || !price || !variableCost) {
      return [
        { value: '—', label: 'Маржинальный доход (₽)' },
        { value: '—', label: 'Точка безубыточности (шт)' },
        { value: '—', label: 'Точка безубыточности (₽)' },
        { value: '—', label: 'Для целевой прибыли (шт)' },
        { value: '—', label: 'Коэффициент маржи (%)' }
      ];
    }
    
    const contributionMargin = price - variableCost;
    const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
    const breakEvenRevenue = breakEvenUnits * price;
    const targetUnits = Math.ceil((fixedCosts + targetProfit) / contributionMargin);
    const marginPercent = (contributionMargin / price) * 100;
    
    return [
      { value: contributionMargin, label: 'Маржинальный доход (₽)' },
      { value: breakEvenUnits, label: 'Точка безубыточности (шт)' },
      { value: breakEvenRevenue, label: 'Точка безубыточности (₽)' },
      { value: targetUnits, label: 'Для целевой прибыли (шт)' },
      { value: Math.round(marginPercent * 10) / 10, label: 'Коэффициент маржи (%)' }
    ];
  },
  content: {
    howTo: 'Введите постоянные затраты, цену продажи, переменные затраты на единицу и желаемую прибыль.',
    about: 'Точка безубыточности - объём продаж, при котором выручка равна затратам. Выше этой точки бизнес приносит прибыль.',
    formula: 'Точка безубыточности = Постоянные затраты / (Цена - Переменные затраты)',
    usage: 'Используется для планирования продаж, определения минимального объёма производства, анализа рисков.',
    faq: [
      {
        question: 'Что такое маржинальный доход?',
        answer: 'Это разница между ценой продажи и переменными затратами. Показывает, сколько денег остаётся на покрытие постоянных затрат.'
      }
    ],
    sources: [
      { title: 'Точка безубыточности', url: 'https://ru.wikipedia.org/wiki/Точка_безубыточности' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор прогноза продаж
export const salesForecastCalculator: Calculator = {
  id: 'sales-forecast',
  slug: 'prognoz-prodazh',
  title: 'Прогноз продаж',
  description: 'Простой прогноз продаж на основе исторических данных и темпов роста',
  category: 'biznes',
  subcategory: 'biznes-planning',
  type: 'formula',
  inputs: [
    {
      name: 'lastMonthSales',
      label: 'Продажи прошлого месяца (₽)',
      type: 'number',
      placeholder: '500000',
      defaultValue: 500000
    },
    {
      name: 'growthRate',
      label: 'Ожидаемый рост (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10
    },
    {
      name: 'seasonality',
      label: 'Сезонный коэффициент',
      type: 'select',
      options: [
        { value: '1', label: 'Без сезонности' },
        { value: '1.2', label: 'Высокий сезон (+20%)' },
        { value: '0.8', label: 'Низкий сезон (-20%)' },
        { value: '1.5', label: 'Пик сезона (+50%)' }
      ],
      defaultValue: '1'
    },
    {
      name: 'forecastMonths',
      label: 'Прогноз на (месяцев)',
      type: 'number',
      placeholder: '6',
      defaultValue: 6
    }
  ],
  outputs: [
    { name: 'forecast1', label: 'Месяц 1 (₽)', type: 'number' },
    { name: 'forecast3', label: 'Месяц 3 (₽)', type: 'number' },
    { name: 'forecast6', label: 'Месяц 6 (₽)', type: 'number' },
    { name: 'totalForecast', label: 'Итого прогноз (₽)', type: 'number' },
    { name: 'avgGrowth', label: 'Средний рост (%)', type: 'number' }
  ],
  calculate: (inputs) => {
    const lastMonth = Number(inputs.lastMonthSales);
    const growthRate = Number(inputs.growthRate) / 100;
    const seasonality = Number(inputs.seasonality);
    const forecastMonths = Number(inputs.forecastMonths);
    
    if (!lastMonth || !forecastMonths) {
      return [
        { value: '—', label: 'Месяц 1 (₽)' },
        { value: '—', label: 'Месяц 3 (₽)' },
        { value: '—', label: 'Месяц 6 (₽)' },
        { value: '—', label: 'Итого прогноз (₽)' },
        { value: '—', label: 'Средний рост (%)' }
      ];
    }
    
    // Calculate compound growth for each month
    const forecast1 = lastMonth * (1 + growthRate) * seasonality;
    const forecast3 = lastMonth * Math.pow(1 + growthRate, 3) * seasonality;
    const forecast6 = lastMonth * Math.pow(1 + growthRate, 6) * seasonality;
    
    // Total for all months
    let totalForecast = 0;
    for (let i = 1; i <= forecastMonths; i++) {
      totalForecast += lastMonth * Math.pow(1 + growthRate, i) * seasonality;
    }
    
    const avgGrowth = growthRate * 100;
    
    return [
      { value: Math.round(forecast1), label: 'Месяц 1 (₽)' },
      { value: Math.round(forecast3), label: 'Месяц 3 (₽)' },
      { value: Math.round(forecast6), label: 'Месяц 6 (₽)' },
      { value: Math.round(totalForecast), label: 'Итого прогноз (₽)' },
      { value: Math.round(avgGrowth * 10) / 10, label: 'Средний рост (%)' }
    ];
  },
  content: {
    howTo: 'Введите продажи прошлого месяца, ожидаемый темп роста, сезонный коэффициент и срок прогноза.',
    about: 'Простой метод прогнозирования на основе комплексного роста. Подходит для быстрой оценки будущих продаж.',
    formula: 'Прогноз = Текущие продажи × (1 + Темп роста)^n × Сезонность',
    usage: 'Используется для планирования закупок, определения целей продаж, бюджетирования.',
    faq: [
      {
        question: 'Как учесть сезонность?',
        answer: 'Сезонный коэффициент показывает, насколько текущий месяц отличается от среднего. Декабрь = 1.5, январь = 0.6 для многих бизнесов.'
      }
    ],
    sources: [
      { title: 'Прогнозирование продаж', url: 'https://en.wikipedia.org/wiki/Sales_forecasting' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор ABC-анализа
export const abcAnalysisCalculator: Calculator = {
  id: 'abc-analysis',
  slug: 'abc-analiz',
  title: 'ABC-анализ ассортимента',
  description: 'Классификация товаров/клиентов по принципу Парето (80/20)',
  category: 'biznes',
  subcategory: 'biznes-analitika',
  type: 'formula',
  inputs: [
    {
      name: 'totalRevenue',
      label: 'Общая выручка (₽)',
      type: 'number',
      placeholder: '1000000',
      defaultValue: 1000000
    },
    {
      name: 'itemRevenue',
      label: 'Выручка от позиции (₽)',
      type: 'number',
      placeholder: '150000',
      defaultValue: 150000
    },
    {
      name: 'cumulativePercent',
      label: 'Накопительный % выручки',
      type: 'number',
      placeholder: '15',
      defaultValue: 15
    }
  ],
  outputs: [
    { name: 'itemPercent', label: 'Доля позиции (%)', type: 'number' },
    { name: 'category', label: 'Категория ABC', type: 'text' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const totalRevenue = Number(inputs.totalRevenue);
    const itemRevenue = Number(inputs.itemRevenue);
    const cumulativePercent = Number(inputs.cumulativePercent);
    
    if (!totalRevenue || !itemRevenue) {
      return [
        { value: '—', label: 'Доля позиции (%)' },
        { value: '—', label: 'Категория ABC' },
        { value: '', label: 'Рекомендация' }
      ];
    }
    
    const itemPercent = (itemRevenue / totalRevenue) * 100;
    
    // ABC classification based on cumulative percentage
    let category = '';
    let recommendation = '';
    
    if (cumulativePercent <= 80) {
      category = 'A - Основной ассортимент';
      recommendation = 'Приоритетное управление, постоянный контроль запасов';
    } else if (cumulativePercent <= 95) {
      category = 'B - Средний ассортимент';
      recommendation = 'Стандартное управление, периодический анализ';
    } else {
      category = 'C - Малый ассортимент';
      recommendation = 'Минимальные запасы, рассмотреть исключение';
    }
    
    return [
      { value: Math.round(itemPercent * 10) / 10, label: 'Доля позиции (%)' },
      { value: category, label: 'Категория ABC' },
      { value: recommendation, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Введите общую выручку и выручку от конкретной позиции/клиента, а также накопительный процент.',
    about: 'ABC-анализ разделяет ассортимент на 3 группы: A (80% выручки), B (15%), C (5%). Позволяет сфокусироваться на важном.',
    formula: 'A = первые 80% накопительной выручки, B = 80-95%, C = 95-100%',
    usage: 'Используется для управления запасами, приоритизации клиентов, оптимизации ассортимента.',
    faq: [
      {
        question: 'Как провести ABC-анализ?',
        answer: 'Отсортируйте все позиции по убыванию выручки. Рассчитайте накопительный %. A = до 80%, B = до 95%, C = остальные.'
      }
    ],
    sources: [
      { title: 'ABC-анализ', url: 'https://ru.wikipedia.org/wiki/ABC-анализ' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор маржинальности каналов
export const channelMarginCalculator: Calculator = {
  id: 'channel-margin',
  slug: 'marzhinalnost-kanalov',
  title: 'Маржинальность каналов продаж',
  description: 'Сравнение рентабельности разных каналов продаж (онлайн, офлайн, партнёры)',
  category: 'biznes',
  subcategory: 'biznes-analitika',
  type: 'formula',
  inputs: [
    {
      name: 'channel',
      label: 'Канал продаж',
      type: 'select',
      options: [
        { value: 'online', label: 'Свой сайт' },
        { value: 'marketplace', label: 'Маркетплейсы' },
        { value: 'retail', label: 'Розница' },
        { value: 'partners', label: 'Партнёры' }
      ],
      defaultValue: 'online'
    },
    {
      name: 'revenue',
      label: 'Выручка (₽)',
      type: 'number',
      placeholder: '100000',
      defaultValue: 100000
    },
    {
      name: 'productCost',
      label: 'Себестоимость (%)',
      type: 'number',
      placeholder: '40',
      defaultValue: 40
    },
    {
      name: 'commission',
      label: 'Комиссия канала (%)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0
    },
    {
      name: 'delivery',
      label: 'Доставка/логистика (₽)',
      type: 'number',
      placeholder: '5000',
      defaultValue: 5000
    }
  ],
  outputs: [
    { name: 'grossMargin', label: 'Валовая маржа (₽)', type: 'number' },
    { name: 'channelCosts', label: 'Затраты канала (₽)', type: 'number' },
    { name: 'netMargin', label: 'Чистая маржа (₽)', type: 'number' },
    { name: 'marginPercent', label: 'Рентабельность (%)', type: 'number' },
    { name: 'assessment', label: 'Оценка канала', type: 'text' }
  ],
  calculate: (inputs) => {
    const channel = String(inputs.channel);
    const revenue = Number(inputs.revenue);
    const productCost = Number(inputs.productCost) / 100;
    const commission = Number(inputs.commission) / 100;
    const delivery = Number(inputs.delivery);
    
    if (!revenue) {
      return [
        { value: '—', label: 'Валовая маржа (₽)' },
        { value: '—', label: 'Затраты канала (₽)' },
        { value: '—', label: 'Чистая маржа (₽)' },
        { value: '—', label: 'Рентабельность (%)' },
        { value: '', label: 'Оценка канала' }
      ];
    }
    
    // Channel defaults
    const channelDefaults: Record<string, { commission: number; delivery: number }> = {
      online: { commission: 0, delivery: 5000 },
      marketplace: { commission: 0.15, delivery: 0 },
      retail: { commission: 0.3, delivery: 0 },
      partners: { commission: 0.25, delivery: 3000 }
    };
    
    const defaults = channelDefaults[channel];
    const actualCommission = commission || defaults.commission;
    const actualDelivery = delivery || defaults.delivery;
    
    const grossMargin = revenue * (1 - productCost);
    const channelCosts = revenue * actualCommission + actualDelivery;
    const netMargin = grossMargin - channelCosts;
    const marginPercent = (netMargin / revenue) * 100;
    
    let assessment = '';
    if (marginPercent < 10) {
      assessment = '⚠️ Низкая рентабельность';
    } else if (marginPercent < 20) {
      assessment = '✅ Нормальная рентабельность';
    } else {
      assessment = '🌟 Высокая рентабельность';
    }
    
    return [
      { value: Math.round(grossMargin), label: 'Валовая маржа (₽)' },
      { value: Math.round(channelCosts), label: 'Затраты канала (₽)' },
      { value: Math.round(netMargin), label: 'Чистая маржа (₽)' },
      { value: Math.round(marginPercent * 10) / 10, label: 'Рентабельность (%)' },
      { value: assessment, label: 'Оценка канала' }
    ];
  },
  content: {
    howTo: 'Выберите канал продаж, введите выручку, себестоимость, комиссию канала и затраты на доставку.',
    about: 'Разные каналы продаж имеют разную структуру затрат. Этот калькулятор помогает сравнить их рентабельность.',
    usage: 'Используется для выбора каналов продаж, переговоров с партнёрами, оптимизации канальной стратегии.',
    faq: [
      {
        question: 'Какой канал самый выгодный?',
        answer: 'Обычно собственный сайт (если есть трафик) или прямые продажи. Маркетплейсы дают объём, но снижают маржу комиссиями.'
      }
    ],
    sources: [
      { title: 'Каналы продаж', url: 'https://ru.wikipedia.org/wiki/Канал_распределения' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор NPV проекта
export const projectNpvCalculator: Calculator = {
  id: 'project-npv',
  slug: 'npv-proekta',
  title: 'NPV инвестиционного проекта',
  description: 'Расчёт чистой приведённой стоимости (NPV) для оценки инвестиций в проект',
  category: 'biznes',
  subcategory: 'biznes-investicii',
  type: 'formula',
  inputs: [
    {
      name: 'initialInvestment',
      label: 'Начальные инвестиции (₽)',
      type: 'number',
      placeholder: '500000',
      defaultValue: 500000
    },
    {
      name: 'discountRate',
      label: 'Ставка дисконтирования (%)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10
    },
    {
      name: 'cashFlow1',
      label: 'Денежный поток год 1 (₽)',
      type: 'number',
      placeholder: '200000',
      defaultValue: 200000
    },
    {
      name: 'cashFlow2',
      label: 'Денежный поток год 2 (₽)',
      type: 'number',
      placeholder: '250000',
      defaultValue: 250000
    },
    {
      name: 'cashFlow3',
      label: 'Денежный поток год 3 (₽)',
      type: 'number',
      placeholder: '300000',
      defaultValue: 300000
    }
  ],
  outputs: [
    { name: 'npv', label: 'NPV (₽)', type: 'number' },
    { name: 'payback', label: 'Срок окупаемости (лет)', type: 'number' },
    { name: 'profitability', label: 'Доходность (%)', type: 'number' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const initial = Number(inputs.initialInvestment);
    const rate = Number(inputs.discountRate) / 100;
    const cf1 = Number(inputs.cashFlow1);
    const cf2 = Number(inputs.cashFlow2);
    const cf3 = Number(inputs.cashFlow3);
    
    if (!initial || !rate) {
      return [
        { value: '—', label: 'NPV (₽)' },
        { value: '—', label: 'Срок окупаемости (лет)' },
        { value: '—', label: 'Доходность (%)' },
        { value: '', label: 'Рекомендация' }
      ];
    }
    
    // Calculate NPV
    const pv1 = cf1 / Math.pow(1 + rate, 1);
    const pv2 = cf2 / Math.pow(1 + rate, 2);
    const pv3 = cf3 / Math.pow(1 + rate, 3);
    const npv = -initial + pv1 + pv2 + pv3;
    
    // Calculate payback period
    let cumulative = -initial;
    let payback = 0;
    const flows = [cf1, cf2, cf3];
    for (let i = 0; i < flows.length; i++) {
      cumulative += flows[i] / Math.pow(1 + rate, i + 1);
      if (cumulative > 0 && payback === 0) {
        payback = i + 1;
      }
    }
    if (payback === 0) payback = 999;
    
    // Profitability
    const totalProfit = cf1 + cf2 + cf3 - initial;
    const profitability = (totalProfit / initial) * 100;
    
    // Recommendation
    let recommendation = '';
    if (npv > 0 && payback <= 3) {
      recommendation = '✅ Проект рекомендуется к реализации';
    } else if (npv > 0) {
      recommendation = '⚠️ Проект окупается, но срок окупаемости длинный';
    } else {
      recommendation = '❌ Проект не рекомендуется (NPV < 0)';
    }
    
    return [
      { value: Math.round(npv), label: 'NPV (₽)' },
      { value: payback === 999 ? '>3' : payback, label: 'Срок окупаемости (лет)' },
      { value: Math.round(profitability * 10) / 10, label: 'Доходность (%)' },
      { value: recommendation, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Введите начальные инвестиции, ставку дисконтирования и ожидаемые денежные потоки на 3 года.',
    about: 'NPV (Net Present Value) - чистая приведённая стоимость. Проект с NPV > 0 приносит прибыль с учётом временной стоимости денег.',
    formula: 'NPV = Σ (CFt / (1+r)^t) - Initial, где CFt - денежный поток в год t, r - ставка дисконтирования',
    usage: 'Используется для оценки инвестиционных проектов, сравнения альтернатив, принятия решений о капитальных затратах.',
    faq: [
      {
        question: 'Какую ставку дисконтирования использовать?',
        answer: 'Обычно: стоимость капитала компании, альтернативная доходность (например, 10-15% для среднего бизнеса) или ставка по банковским кредитам.'
      }
    ],
    sources: [
      { title: 'NPV', url: 'https://ru.wikipedia.org/wiki/Чистая_приведённая_стоимость' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const businessMarketingCalculators: Calculator[] = [
  marketingRoiCalculator,
  conversionCalculator,
  cacCalculator,
  competitivePricingCalculator,
  commissionCalculator,
  breakEvenAdvancedCalculator,
  salesForecastCalculator,
  abcAnalysisCalculator,
  channelMarginCalculator,
  projectNpvCalculator,
];
