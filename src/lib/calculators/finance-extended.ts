import { Calculator } from '../types';

export const financeExtendedCalculators: Calculator[] = [
  // 1. Опционы (базовый расчёт премии)
  {
    id: 'options-basic',
    slug: 'opcziony-bazovyj',
    title: 'Расчёт опционов (базовый)',
    description: 'Расчёт прибыли/убытка по опционам call и put',
    category: 'finansy',
    subcategory: 'investiczii',
    type: 'formula',
    inputs: [
      { name: 'optionType', label: 'Тип опциона', type: 'select', options: [{ value: 'call', label: 'Call (право покупки)' }, { value: 'put', label: 'Put (право продажи)' }], defaultValue: 'call' },
      { name: 'strikePrice', label: 'Страйк-цена ($)', type: 'number', placeholder: '100', defaultValue: 100, min: 0 },
      { name: 'premium', label: 'Премия ($)', type: 'number', placeholder: '5', defaultValue: 5, min: 0 },
      { name: 'currentPrice', label: 'Текущая цена актива ($)', type: 'number', placeholder: '110', defaultValue: 110, min: 0 }
    ],
    outputs: [
      { name: 'profit', label: 'Прибыль/убыток', type: 'number', unit: '$' },
      { name: 'breakEven', label: 'Точка безубыточности', type: 'number', unit: '$' }
    ],
    calculate: (inputs) => {
      const type = String(inputs.optionType);
      const strike = Number(inputs.strikePrice);
      const premium = Number(inputs.premium);
      const current = Number(inputs.currentPrice);
      let profit = 0;
      let breakEven = 0;
      if (type === 'call') {
        profit = Math.max(0, current - strike) - premium;
        breakEven = strike + premium;
      } else {
        profit = Math.max(0, strike - current) - premium;
        breakEven = strike - premium;
      }
      return [
        { value: Math.round(profit * 100) / 100, label: 'Прибыль/убыток', unit: '$' },
        { value: Math.round(breakEven * 100) / 100, label: 'Точка безубыточности', unit: '$' }
      ];
    },
    content: {
      howTo: 'Выберите тип опциона, введите страйк-цену, премию и текущую цену актива.',
      about: 'Опцион — контракт, дающий право (но не обязанность) купить (call) или продать (put) актив по заданной цене.',
      usage: 'Для оценки рисков и потенциальной прибыли при торговле опционами.',
      formula: 'Call: Прибыль = max(0, Цена - Страйк) - Премия. Put: Прибыль = max(0, Страйк - Цена) - Премия.',
      faq: [
        { question: 'Что такое страйк-цена?', answer: 'Цена, по которой можно купить/продать актив при исполнении опциона.' },
        { question: 'Почему премия вычитается?', answer: 'Премия — это цена самого опциона, которую вы платите при покупке.' }
      ],
      sources: [{ title: 'Опционы — Википедия', url: 'https://ru.wikipedia.org/wiki/Опцион' }],
      updatedAt: '2026-04-07'
    }
  },
  // 2. Облигации (доходность)
  {
    id: 'bond-yield',
    slug: 'obligaczii-dokhodnost',
    title: 'Доходность облигаций',
    description: 'Расчёт текущей доходности и доходности к погашению',
    category: 'finansy',
    subcategory: 'investiczii',
    type: 'formula',
    inputs: [
      { name: 'faceValue', label: 'Номинал ($)', type: 'number', placeholder: '1000', defaultValue: 1000, min: 0 },
      { name: 'marketPrice', label: 'Рыночная цена (%)', type: 'number', placeholder: '95', defaultValue: 95, min: 1, max: 200 },
      { name: 'couponRate', label: 'Купонная ставка (%)', type: 'number', placeholder: '8', defaultValue: 8, min: 0, max: 50 },
      { name: 'yearsToMaturity', label: 'Лет до погашения', type: 'number', placeholder: '5', defaultValue: 5, min: 0 }
    ],
    outputs: [
      { name: 'currentYield', label: 'Текущая доходность', type: 'number', unit: '%' },
      { name: 'ytm', label: 'Доходность к погашению', type: 'number', unit: '%' },
      { name: 'annualIncome', label: 'Годовой купонный доход', type: 'number', unit: '$' }
    ],
    calculate: (inputs) => {
      const face = Number(inputs.faceValue);
      const price = Number(inputs.marketPrice) / 100 * face;
      const coupon = Number(inputs.couponRate) / 100;
      const years = Number(inputs.yearsToMaturity);
      const annualCoupon = face * coupon;
      const currentYield = (annualCoupon / price) * 100;
      const capitalGain = (face - price) / years;
      const ytm = ((annualCoupon + capitalGain) / ((face + price) / 2)) * 100;
      return [
        { value: Math.round(currentYield * 100) / 100, label: 'Текущая доходность', unit: '%' },
        { value: Math.round(ytm * 100) / 100, label: 'Доходность к погашению', unit: '%' },
        { value: Math.round(annualCoupon * 100) / 100, label: 'Годовой купонный доход', unit: '$' }
      ];
    },
    content: {
      howTo: 'Введите номинал, рыночную цену (в %), купонную ставку и срок до погашения.',
      about: 'Облигация — долговая ценная бумага. Доходность зависит от цены покупки и купонных выплат.',
      usage: 'Для сравнения облигаций и оценки реальной доходности.',
      formula: 'Текущая доходность = (Годовой купон / Цена) * 100%. Доходность к погашению учитывает капитальный доход.',
      faq: [
        { question: 'Почему доходность к погашению важнее текущей?', answer: 'YTM учитывает прибыль/убыток при погашении по номиналу, если покупали не по номиналу.' },
        { question: 'Что такое купон?', answer: 'Процентные выплаты по облигации, обычно раз в полгода или год.' }
      ],
      sources: [{ title: 'Облигации — Википедия', url: 'https://ru.wikipedia.org/wiki/Облигация' }],
      updatedAt: '2026-04-07'
    }
  },
  // 3. Пенсионный калькулятор
  {
    id: 'pension-calculator',
    slug: 'pensionnyj-kalkulyator',
    title: 'Пенсионный калькулятор',
    description: 'Расчёт накоплений к выходу на пенсию и ежемесячных выплат',
    category: 'finansy',
    subcategory: 'lichnye-finansy',
    type: 'formula',
    inputs: [
      { name: 'currentAge', label: 'Текущий возраст', type: 'number', placeholder: '35', defaultValue: 35, min: 18, max: 70 },
      { name: 'retirementAge', label: 'Возраст выхода на пенсию', type: 'number', placeholder: '60', defaultValue: 60, min: 40, max: 80 },
      { name: 'monthlyContribution', label: 'Ежемесячный взнос ($)', type: 'number', placeholder: '500', defaultValue: 500, min: 0 },
      { name: 'returnRate', label: 'Ожидаемая доходность (%)', type: 'number', placeholder: '7', defaultValue: 7, min: 0, max: 20 },
      { name: 'currentSavings', label: 'Текущие накопления ($)', type: 'number', placeholder: '10000', defaultValue: 10000, min: 0 }
    ],
    outputs: [
      { name: 'totalSavings', label: 'Итоговые накопления', type: 'number', unit: '$' },
      { name: 'monthlyPension', label: 'Ежемесячная пенсия (20 лет)', type: 'number', unit: '$' },
      { name: 'totalContributions', label: 'Всего взносов', type: 'number', unit: '$' },
      { name: 'investmentIncome', label: 'Инвестиционный доход', type: 'number', unit: '$' }
    ],
    calculate: (inputs) => {
      const currentAge = Number(inputs.currentAge);
      const retirementAge = Number(inputs.retirementAge);
      const monthly = Number(inputs.monthlyContribution);
      const rate = Number(inputs.returnRate) / 100 / 12;
      const current = Number(inputs.currentSavings);
      const years = retirementAge - currentAge;
      const months = years * 12;
      const totalContributions = monthly * months;
      let totalSavings = current * Math.pow(1 + rate, months);
      if (rate > 0) {
        totalSavings += monthly * (Math.pow(1 + rate, months) - 1) / rate;
      } else {
        totalSavings += totalContributions;
      }
      const pensionMonths = 20 * 12;
      const monthlyPension = totalSavings / pensionMonths;
      const investmentIncome = totalSavings - current - totalContributions;
      return [
        { value: Math.round(totalSavings), label: 'Итоговые накопления', unit: '$' },
        { value: Math.round(monthlyPension), label: 'Ежемесячная пенсия (20 лет)', unit: '$' },
        { value: Math.round(totalContributions), label: 'Всего взносов', unit: '$' },
        { value: Math.round(investmentIncome), label: 'Инвестиционный доход', unit: '$' }
      ];
    },
    content: {
      howTo: 'Введите текущий и пенсионный возраст, ежемесячный взнос, ожидаемую доходность и текущие накопления.',
      about: 'Расчёт накоплений на пенсию с учётом сложного процента и инвестиционного дохода.',
      usage: 'Для планирования пенсионных накоплений и выбора стратегии инвестирования.',
      formula: 'FV = PV*(1+r)^n + PMT*(((1+r)^n-1)/r), где n — количество месяцев.',
      faq: [
        { question: 'Сколько нужно накопить на пенсию?', answer: 'Правило 4%: можно тратить 4% от накоплений в год. Для $3000/мес нужно примерно $900,000.' },
        { question: 'Влияет ли начальный возраст?', answer: 'Да! При 25 годах при тех же взносах накопится в 2-3 раза больше, чем при 45.' }
      ],
      sources: [{ title: 'Пенсионное планирование', url: 'https://www.investopedia.com/retirement-planning-4689815' }],
      updatedAt: '2026-04-07'
    }
  },
  // 4. Налог на прибыль (капитальный)
  {
    id: 'capital-gains-tax',
    slug: 'nalog-na-pribyl',
    title: 'Налог на капитальную прибыль',
    description: 'Расчёт налога на прибыль от продажи активов',
    category: 'finansy',
    subcategory: 'nalogi',
    type: 'formula',
    inputs: [
      { name: 'purchasePrice', label: 'Цена покупки ($)', type: 'number', placeholder: '10000', defaultValue: 10000, min: 0 },
      { name: 'salePrice', label: 'Цена продажи ($)', type: 'number', placeholder: '15000', defaultValue: 15000, min: 0 },
      { name: 'holdingPeriod', label: 'Срок владения', type: 'select', options: [{ value: 'short', label: 'Менее 1 года (short-term)' }, { value: 'long', label: 'Более 1 года (long-term)' }], defaultValue: 'long' },
      { name: 'taxBracket', label: 'Налоговая ставка (%)', type: 'number', placeholder: '15', defaultValue: 15, min: 0, max: 50 }
    ],
    outputs: [
      { name: 'capitalGain', label: 'Капитальная прибыль', type: 'number', unit: '$' },
      { name: 'tax', label: 'Налог к уплате', type: 'number', unit: '$' },
      { name: 'netProfit', label: 'Прибыль после налога', type: 'number', unit: '$' }
    ],
    calculate: (inputs) => {
      const purchase = Number(inputs.purchasePrice);
      const sale = Number(inputs.salePrice);
      const period = String(inputs.holdingPeriod);
      const bracket = Number(inputs.taxBracket);
      const gain = Math.max(0, sale - purchase);
      const tax = gain * bracket / 100;
      const net = gain - tax;
      return [
        { value: Math.round(gain * 100) / 100, label: 'Капитальная прибыль', unit: '$' },
        { value: Math.round(tax * 100) / 100, label: 'Налог к уплате', unit: '$' },
        { value: Math.round(net * 100) / 100, label: 'Прибыль после налога', unit: '$' }
      ];
    },
    content: {
      howTo: 'Введите цены покупки и продажи, срок владения и налоговую ставку.',
      about: 'В США short-term прибыль (до 1 года) облагается как обычный доход, long-term — льготными ставками (0/15/20%).',
      usage: 'Для планирования продажи активов с учётом налогов.',
      formula: 'Прибыль = Цена продажи - Цена покупки. Налог = Прибыль * Ставка.',
      faq: [
        { question: 'Как снизить налог?', answer: 'Удерживайте актив более 1 года для long-term ставок. Используйте tax-loss harvesting.' },
        { question: 'Что такое tax-loss harvesting?', answer: 'Продажа убыточных активов для компенсации прибыли и уменьшения налога.' }
      ],
      sources: [{ title: 'Capital Gains Tax', url: 'https://www.irs.gov/taxes/capital-gains-and-losses' }],
      updatedAt: '2026-04-07'
    }
  },
  // 5. Реальный доход с учётом инфляции
  {
    id: 'real-return',
    slug: 'realnyj-dokhod',
    title: 'Реальный доход с учётом инфляции',
    description: 'Расчёт реальной доходности инвестиций после вычета инфляции',
    category: 'finansy',
    subcategory: 'investiczii',
    type: 'formula',
    inputs: [
      { name: 'nominalReturn', label: 'Номинальная доходность (%)', type: 'number', placeholder: '10', defaultValue: 10, min: 0, max: 100 },
      { name: 'inflation', label: 'Инфляция (%)', type: 'number', placeholder: '5', defaultValue: 5, min: 0, max: 50 },
      { name: 'taxRate', label: 'Налоговая ставка (%)', type: 'number', placeholder: '13', defaultValue: 13, min: 0, max: 50 }
    ],
    outputs: [
      { name: 'realReturn', label: 'Реальная доходность', type: 'number', unit: '%' },
      { name: 'afterTaxReturn', label: 'После налогов', type: 'number', unit: '%' },
      { name: 'realAfterTax', label: 'Реальная после налогов', type: 'number', unit: '%' }
    ],
    calculate: (inputs) => {
      const nominal = Number(inputs.nominalReturn) / 100;
      const inflation = Number(inputs.inflation) / 100;
      const tax = Number(inputs.taxRate) / 100;
      const realReturn = ((1 + nominal) / (1 + inflation) - 1) * 100;
      const afterTax = nominal * (1 - tax) * 100;
      const realAfterTax = ((1 + nominal * (1 - tax)) / (1 + inflation) - 1) * 100;
      return [
        { value: Math.round(realReturn * 100) / 100, label: 'Реальная доходность', unit: '%' },
        { value: Math.round(afterTax * 100) / 100, label: 'После налогов', unit: '%' },
        { value: Math.round(realAfterTax * 100) / 100, label: 'Реальная после налогов', unit: '%' }
      ];
    },
    content: {
      howTo: 'Введите номинальную доходность, инфляцию и налоговую ставку.',
      about: 'Реальная доходность показывает истинный рост покупательной способности после инфляции и налогов.',
      usage: 'Для сравнения инвестиций и оценки их реальной эффективности.',
      formula: 'Реальная = (1 + Номинальная)/(1 + Инфляция) - 1. После налогов: Номинальная * (1 - Ставка).',
      faq: [
        { question: 'Почему важна реальная доходность?', answer: 'Номинальная доходность 10% при инфляции 9% — всего 1% реального роста покупательной способности.' },
        { question: 'Как сохранить капитал при высокой инфляции?', answer: 'Ищите инструменты с доходностью выше инфляции: акции, недвижимость, инфляционные облигации.' }
      ],
      sources: [{ title: 'Реальная доходность', url: 'https://www.investopedia.com/terms/r/realinterestrate.asp' }],
      updatedAt: '2026-04-07'
    }
  },
  // 6. Лизинг (расчёт платежей)
  {
    id: 'lease-calculator',
    slug: 'lizing-raschet',
    title: 'Расчёт лизинговых платежей',
    description: 'Расчёт ежемесячных платежей по лизингу автомобиля или оборудования',
    category: 'finansy',
    subcategory: 'kreditovanie',
    type: 'formula',
    inputs: [
      { name: 'assetValue', label: 'Стоимость актива ($)', type: 'number', placeholder: '30000', defaultValue: 30000, min: 0 },
      { name: 'residualValue', label: 'Остаточная стоимость (%)', type: 'number', placeholder: '20', defaultValue: 20, min: 0, max: 100 },
      { name: 'leaseTerm', label: 'Срок лизинга (месяцев)', type: 'number', placeholder: '36', defaultValue: 36, min: 1, max: 120 },
      { name: 'interestRate', label: 'Процентная ставка (%)', type: 'number', placeholder: '8', defaultValue: 8, min: 0, max: 50 },
      { name: 'advancePayment', label: 'Аванс (%)', type: 'number', placeholder: '10', defaultValue: 10, min: 0, max: 50 }
    ],
    outputs: [
      { name: 'monthlyPayment', label: 'Ежемесячный платёж', type: 'number', unit: '$' },
      { name: 'totalPaid', label: 'Всего выплачено', type: 'number', unit: '$' },
      { name: 'totalInterest', label: 'Переплата', type: 'number', unit: '$' }
    ],
    calculate: (inputs) => {
      const value = Number(inputs.assetValue);
      const residual = Number(inputs.residualValue) / 100;
      const months = Number(inputs.leaseTerm);
      const rate = Number(inputs.interestRate) / 100 / 12;
      const advance = Number(inputs.advancePayment) / 100;
      const financed = value * (1 - advance);
      const residualValue = value * residual;
      let monthlyPayment = 0;
      if (rate > 0) {
        monthlyPayment = (financed * rate * Math.pow(1 + rate, months) - residualValue * rate) / (Math.pow(1 + rate, months) - 1);
      } else {
        monthlyPayment = (financed - residualValue) / months;
      }
      const totalPaid = monthlyPayment * months + value * advance;
      const totalInterest = totalPaid - value;
      return [
        { value: Math.round(monthlyPayment * 100) / 100, label: 'Ежемесячный платёж', unit: '$' },
        { value: Math.round(totalPaid * 100) / 100, label: 'Всего выплачено', unit: '$' },
        { value: Math.round(totalInterest * 100) / 100, label: 'Переплата', unit: '$' }
      ];
    },
    content: {
      howTo: 'Введите стоимость актива, остаточную стоимость, срок, ставку и аванс.',
      about: 'Лизинг — форма аренды с правом выкупа. Расчёт аналогичен кредиту с учётом остаточной стоимости.',
      usage: 'Для сравнения лизинга и покупки в кредит, планирования бюджета.',
      formula: 'Платёж = [PV*r*(1+r)^n - RV*r] / [(1+r)^n - 1], где PV — финансируемая сумма, RV — остаточная стоимость.',
      faq: [
        { question: 'Что такое остаточная стоимость?', answer: 'Предполагаемая стоимость актива в конце договора. Чем выше — тем ниже платежи.' },
        { question: 'Выгоднее лизинг или кредит?', answer: 'Зависит от налоговых льгот, ставок и условий. Лизинг иногда вычитается из налоговой базы.' }
      ],
      sources: [{ title: 'Лизинг — Википедия', url: 'https://ru.wikipedia.org/wiki/Лизинг' }],
      updatedAt: '2026-04-07'
    }
  },
  // 7. Комиссии брокера
  {
    id: 'broker-fees',
    slug: 'komissii-brokera',
    title: 'Расчёт комиссий брокера',
    description: 'Сравнение комиссий разных брокеров для разных стратегий торговли',
    category: 'finansy',
    subcategory: 'investiczii',
    type: 'formula',
    inputs: [
      { name: 'tradeAmount', label: 'Сумма сделки ($)', type: 'number', placeholder: '10000', defaultValue: 10000, min: 0 },
      { name: 'commissionType', label: 'Тип комиссии', type: 'select', options: [{ value: 'percent', label: 'Процент от суммы' }, { value: 'fixed', label: 'Фиксированная' }, { value: 'mixed', label: 'Смешанная' }], defaultValue: 'percent' },
      { name: 'commissionValue', label: 'Значение комиссии (% или $)', type: 'number', placeholder: '0.3', defaultValue: 0.3, min: 0 },
      { name: 'tradesPerMonth', label: 'Сделок в месяц', type: 'number', placeholder: '10', defaultValue: 10, min: 0 }
    ],
    outputs: [
      { name: 'commissionPerTrade', label: 'Комиссия за сделку', type: 'number', unit: '$' },
      { name: 'monthlyCommission', label: 'Комиссия в месяц', type: 'number', unit: '$' },
      { name: 'annualCommission', label: 'Комиссия в год', type: 'number', unit: '$' },
      { name: 'commissionImpact', label: 'Влияние на доходность', type: 'number', unit: '%' }
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.tradeAmount);
      const type = String(inputs.commissionType);
      const value = Number(inputs.commissionValue);
      const trades = Number(inputs.tradesPerMonth);
      let perTrade = 0;
      if (type === 'percent') perTrade = amount * value / 100;
      else if (type === 'fixed') perTrade = value;
      else perTrade = Math.max(amount * value / 100, value);
      const monthly = perTrade * trades;
      const annual = monthly * 12;
      const impact = (annual / (amount * trades * 12)) * 100;
      return [
        { value: Math.round(perTrade * 100) / 100, label: 'Комиссия за сделку', unit: '$' },
        { value: Math.round(monthly * 100) / 100, label: 'Комиссия в месяц', unit: '$' },
        { value: Math.round(annual * 100) / 100, label: 'Комиссия в год', unit: '$' },
        { value: Math.round(impact * 100) / 100, label: 'Влияние на доходность', unit: '%' }
      ];
    },
    content: {
      howTo: 'Введите сумму сделки, тип и размер комиссии, количество сделок в месяц.',
      about: 'Комиссии брокера могут существенно снизить доходность при частой торговле.',
      usage: 'Для выбора брокера и оценки влияния комиссий на стратегию.',
      formula: 'Годовая комиссия = Комиссия за сделку * Сделок в месяц * 12.',
      faq: [
        { question: 'Как выбрать брокера?', answer: 'Для редких сделок — фиксированная комиссия. Для частых — процентная, лучше 0.01-0.05%.' },
        { question: 'Скрытые комиссии?', answer: 'Спреды, свопы, плата за данные — уточняйте полный прайс-лист.' }
      ],
      sources: [{ title: 'Как выбрать брокера', url: 'https://www.investopedia.com/best-brokers-4587872' }],
      updatedAt: '2026-04-07'
    }
  },
  // 8. Реинвестирование дивидендов (DRIP)
  {
    id: 'dividend-reinvestment',
    slug: 'reinvestirovanie-dividendov',
    title: 'Расчёт реинвестирования дивидендов',
    description: 'Сравнение доходности с реинвестированием и без него',
    category: 'finansy',
    subcategory: 'investiczii',
    type: 'formula',
    inputs: [
      { name: 'initialInvestment', label: 'Начальная инвестиция ($)', type: 'number', placeholder: '10000', defaultValue: 10000, min: 0 },
      { name: 'dividendYield', label: 'Дивидендная доходность (%)', type: 'number', placeholder: '4', defaultValue: 4, min: 0, max: 20 },
      { name: 'stockGrowth', label: 'Рост акций в год (%)', type: 'number', placeholder: '6', defaultValue: 6, min: 0, max: 50 },
      { name: 'years', label: 'Срок инвестирования (лет)', type: 'number', placeholder: '20', defaultValue: 20, min: 1, max: 50 },
      { name: 'taxRate', label: 'Налог на дивиденды (%)', type: 'number', placeholder: '13', defaultValue: 13, min: 0, max: 50 }
    ],
    outputs: [
      { name: 'withoutReinvestment', label: 'Без реинвестирования', type: 'number', unit: '$' },
      { name: 'withReinvestment', label: 'С реинвестированием', type: 'number', unit: '$' },
      { name: 'difference', label: 'Разница', type: 'number', unit: '$' },
      { name: 'totalDividends', label: 'Всего дивидендов', type: 'number', unit: '$' }
    ],
    calculate: (inputs) => {
      const initial = Number(inputs.initialInvestment);
      const yieldRate = Number(inputs.dividendYield) / 100;
      const growth = Number(inputs.stockGrowth) / 100;
      const years = Number(inputs.years);
      const tax = Number(inputs.taxRate) / 100;
      const stockValue = initial * Math.pow(1 + growth, years);
      const annualDividend = initial * yieldRate;
      let totalDividendsNoReinvest = 0;
      for (let i = 0; i < years; i++) {
        totalDividendsNoReinvest += annualDividend * Math.pow(1 + growth, i) * (1 - tax);
      }
      const withoutReinvestment = stockValue + totalDividendsNoReinvest;
      const totalReturn = growth + yieldRate * (1 - tax);
      const withReinvestment = initial * Math.pow(1 + totalReturn, years);
      const totalDividends = withReinvestment - stockValue;
      const difference = withReinvestment - withoutReinvestment;
      return [
        { value: Math.round(withoutReinvestment), label: 'Без реинвестирования', unit: '$' },
        { value: Math.round(withReinvestment), label: 'С реинвестированием', unit: '$' },
        { value: Math.round(difference), label: 'Разница', unit: '$' },
        { value: Math.round(totalDividends), label: 'Всего дивидендов', unit: '$' }
      ];
    },
    content: {
      howTo: 'Введите начальную инвестицию, дивидендную доходность, рост акций, срок и налог.',
      about: 'DRIP (Dividend Reinvestment Plan) — автоматическое реинвестирование дивидендов в новые акции.',
      usage: 'Для демонстрации эффекта сложного процента на дивидендах.',
      formula: 'С реинвестированием: FV = PV * (1 + Рост + Див*(1-Налог))^n. Эффект сложного процента.',
      faq: [
        { question: 'Насколько важно реинвестирование?', answer: 'При 4% дивидендах и 20-летнем сроке реинвестирование добавляет 25-30% к итоговой сумме.' },
        { question: 'Что такое DRIP?', answer: 'План автоматического реинвестирования дивидендов без комиссий у многих брокеров.' }
      ],
      sources: [{ title: 'DRIP инвестирование', url: 'https://www.investopedia.com/terms/d/dividendreinvestmentplan.asp' }],
      updatedAt: '2026-04-07'
    }
  },
  // 9. Валютный калькулятор (обмен с учётом спреда)
  {
    id: 'forex-calculator',
    slug: 'valyutnyj-kalkulyator',
    title: 'Валютный калькулятор',
    description: 'Расчёт обмена валют с учётом спреда и комиссии обменника',
    category: 'finansy',
    subcategory: 'valyuty',
    type: 'formula',
    inputs: [
      { name: 'amount', label: 'Сумма к обмену', type: 'number', placeholder: '1000', defaultValue: 1000, min: 0 },
      { name: 'marketRate', label: 'Рыночный курс', type: 'number', placeholder: '92.5', defaultValue: 92.5, min: 0 },
      { name: 'spread', label: 'Спред (%)', type: 'number', placeholder: '2', defaultValue: 2, min: 0, max: 20 },
      { name: 'commission', label: 'Комиссия ($)', type: 'number', placeholder: '5', defaultValue: 5, min: 0 }
    ],
    outputs: [
      { name: 'exchangeRate', label: 'Курс обмена', type: 'number' },
      { name: 'received', label: 'Получено', type: 'number' },
      { name: 'effectiveRate', label: 'Эффективный курс', type: 'number' },
      { name: 'costPercent', label: 'Стоимость обмена', type: 'number', unit: '%' }
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.amount);
      const rate = Number(inputs.marketRate);
      const spread = Number(inputs.spread) / 100;
      const commission = Number(inputs.commission);
      const exchangeRate = rate * (1 - spread);
      const received = amount * exchangeRate - commission;
      const effectiveRate = received / amount;
      const costPercent = ((amount * rate - received) / (amount * rate)) * 100;
      return [
        { value: Math.round(exchangeRate * 100) / 100, label: 'Курс обмена' },
        { value: Math.round(received * 100) / 100, label: 'Получено' },
        { value: Math.round(effectiveRate * 100) / 100, label: 'Эффективный курс' },
        { value: Math.round(costPercent * 100) / 100, label: 'Стоимость обмена', unit: '%' }
      ];
    },
    content: {
      howTo: 'Введите сумму, рыночный курс, спред и комиссию обменника.',
      about: 'Обменники берут спред (разницу между покупкой и продажей) и комиссию. Эффективный курс может отличаться от рыночного.',
      usage: 'Для выбора выгодного обменника и понимания реальных затрат.',
      formula: 'Курс обмена = Рыночный * (1 - Спред). Получено = Сумма * Курс - Комиссия.',
      faq: [
        { question: 'Что такое спред?', answer: 'Разница между курсом покупки и продажи валюты. Основной источник дохода обменников.' },
        { question: 'Как найти выгодный курс?', answer: 'Сравните эффективный курс у нескольких обменников. Учитывайте и спред, и комиссию.' }
      ],
      sources: [{ title: 'Forex спреды', url: 'https://www.investopedia.com/terms/s/spread.asp' }],
      updatedAt: '2026-04-07'
    }
  },
  // 10. Инфляция (снижение покупательной способности)
  {
    id: 'inflation-impact',
    slug: 'vliyanie-inflyaczii',
    title: 'Влияние инфляции на сбережения',
    description: 'Расчёт потери покупательной способности денег со временем',
    category: 'finansy',
    subcategory: 'investiczii',
    type: 'formula',
    inputs: [
      { name: 'amount', label: 'Начальная сумма ($)', type: 'number', placeholder: '100000', defaultValue: 100000, min: 0 },
      { name: 'inflationRate', label: 'Инфляция (%/год)', type: 'number', placeholder: '5', defaultValue: 5, min: 0, max: 100 },
      { name: 'years', label: 'Период (лет)', type: 'number', placeholder: '10', defaultValue: 10, min: 1, max: 50 }
    ],
    outputs: [
      { name: 'futureValue', label: 'Будущая стоимость', type: 'number', unit: '$' },
      { name: 'purchasingPower', label: 'Покупательная способность', type: 'number', unit: '%' },
      { name: 'loss', label: 'Потери от инфляции', type: 'number', unit: '$' }
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.amount);
      const inflation = Number(inputs.inflationRate) / 100;
      const years = Number(inputs.years);
      const futureValue = amount / Math.pow(1 + inflation, years);
      const purchasingPower = (futureValue / amount) * 100;
      const loss = amount - futureValue;
      return [
        { value: Math.round(futureValue), label: 'Будущая стоимость', unit: '$' },
        { value: Math.round(purchasingPower * 100) / 100, label: 'Покупательная способность', unit: '%' },
        { value: Math.round(loss), label: 'Потери от инфляции', unit: '$' }
      ];
    },
    content: {
      howTo: 'Введите начальную сумму, уровень инфляции и период.',
      about: 'Инфляция постепенно обесценивает деньги. При 5% инфляции через 10 лет $100 будут стоить как $61 сегодня.',
      usage: 'Для понимания необходимости инвестирования вместо хранения денег.',
      formula: 'Будущая стоимость = Начальная / (1 + Инфляция)^Лет.',
      faq: [
        { question: 'Почему важно инвестировать?', answer: 'При инфляции 5% деньги теряют половину стоимости за 14 лет без инвестиций.' },
        { question: 'Как защититься от инфляции?', answer: 'Инвестируйте в активы с доходностью выше инфляции: акции, недвижимость, инфляционные облигации.' }
      ],
      sources: [{ title: 'Инфляция', url: 'https://ru.wikipedia.org/wiki/Инфляция' }],
      updatedAt: '2026-04-07'
    }
  }
];
