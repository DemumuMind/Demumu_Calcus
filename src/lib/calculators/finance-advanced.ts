import { Calculator } from '../types';

export const financeAdvancedCalculators: Calculator[] = [
  {
    id: 'compound-interest',
    slug: 'slozhnye-procenty',
    title: 'Калькулятор сложного процента',
    description: 'Рассчитайте рост инвестиций с учетом сложного процента и капитализации.',
    category: 'nauka-i-ucheba',
    subcategory: 'finansovye',
    type: 'formula',
    inputs: [
      {
        name: 'principal',
        label: 'Начальная сумма',
        type: 'number',
        placeholder: '100000',
        min: 0,
      },
      {
        name: 'rate',
        label: 'Годовая ставка (%)',
        type: 'number',
        placeholder: '10',
        min: 0,
      },
      {
        name: 'years',
        label: 'Срок (лет)',
        type: 'number',
        placeholder: '5',
        min: 1,
      },
      {
        name: 'monthlyContribution',
        label: 'Ежемесячное пополнение',
        type: 'number',
        placeholder: '5000',
        min: 0,
      },
      {
        name: 'compoundFrequency',
        label: 'Капитализация',
        type: 'select',
        placeholder: 'Ежемесячно',
        options: [
          { value: '12', label: 'Ежемесячно' },
          { value: '4', label: 'Ежеквартально' },
          { value: '1', label: 'Ежегодно' },
          { value: '365', label: 'Ежедневно' },
        ],
      },
    ],
    outputs: [
      { name: 'finalAmount', label: 'Итоговая сумма', type: 'number' },
      { name: 'totalContributions', label: 'Всего вложено', type: 'number' },
      { name: 'interestEarned', label: 'Доход от процентов', type: 'number' },
      { name: 'growthPercent', label: 'Доходность (%)', type: 'number' },
    ],
    calculate: (inputs) => {
      const principal = Number(inputs.principal);
      const rate = Number(inputs.rate) / 100;
      const years = Number(inputs.years);
      const monthlyContribution = Number(inputs.monthlyContribution || 0);
      const compoundFreq = Number(inputs.compoundFrequency);
      
      const totalPeriods = years * compoundFreq;
      const periodRate = rate / compoundFreq;
      
      const fvPrincipal = principal * Math.pow(1 + periodRate, totalPeriods);
      
      let fvContributions = 0;
      if (monthlyContribution > 0) {
        const contributionPerPeriod = monthlyContribution * (12 / compoundFreq);
        fvContributions = contributionPerPeriod * (Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate;
      }
      
      const finalAmount = fvPrincipal + fvContributions;
      const totalContributions = principal + (monthlyContribution * years * 12);
      const interestEarned = finalAmount - totalContributions;
      const growthPercent = (interestEarned / totalContributions) * 100;
      
      return [
        { value: Math.round(finalAmount * 100) / 100, label: 'Итоговая сумма', unit: '₽' },
        { value: Math.round(totalContributions * 100) / 100, label: 'Всего вложено', unit: '₽' },
        { value: Math.round(interestEarned * 100) / 100, label: 'Доход от процентов', unit: '₽' },
        { value: Math.round(growthPercent * 100) / 100, label: 'Доходность', unit: '%' },
      ];
    },
    content: {
      howTo: 'Введите начальную сумму, процентную ставку и срок инвестирования. Укажите размер регулярных пополнений и частоту капитализации.',
      about: 'Сложный процент — это процесс начисления процентов как на основную сумму, так и на накопленные ранее проценты. Приводит к экспоненциальному росту капитала.',
      usage: 'Используйте для планирования долгосрочных инвестиций, пенсионных накоплений, оценки роста портфеля.',
      formula: 'A = P × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) - 1) / (r/n)]',
      faq: [
        { question: 'Что такое капитализация?', answer: 'Начисление процентов на проценты — чем чаще, тем быстрее растет капитал.' },
        { question: 'Почему сложный процент важен?', answer: 'Позволяет достичь финансовых целей быстрее благодаря ускоренному росту.' },
      ],
      sources: [
        { title: 'Investopedia', url: 'https://www.investopedia.com' },
        { title: 'SEC', url: 'https://www.sec.gov' },
      ],
      updatedAt: '2026-01-01',
    },
  },
  {
    id: 'investment-return',
    slug: 'dohodnost-investicij',
    title: 'Калькулятор доходности инвестиций (ROI)',
    description: 'Рассчитайте общую доходность инвестиций за любой период.',
    category: 'nauka-i-ucheba',
    subcategory: 'finansovye',
    type: 'formula',
    inputs: [
      {
        name: 'initialInvestment',
        label: 'Начальные инвестиции',
        type: 'number',
        placeholder: '100000',
        min: 0,
      },
      {
        name: 'finalValue',
        label: 'Конечная стоимость',
        type: 'number',
        placeholder: '150000',
        min: 0,
      },
      {
        name: 'dividends',
        label: 'Полученные дивиденды',
        type: 'number',
        placeholder: '5000',
        min: 0,
      },
      {
        name: 'fees',
        label: 'Комиссии и налоги',
        type: 'number',
        placeholder: '2000',
        min: 0,
      },
      {
        name: 'years',
        label: 'Срок инвестирования (лет)',
        type: 'number',
        placeholder: '3',
        min: 0,
      },
    ],
    outputs: [
      { name: 'totalReturn', label: 'Абсолютный доход', type: 'number' },
      { name: 'roiPercent', label: 'ROI (%)', type: 'number' },
      { name: 'annualizedReturn', label: 'Годовая доходность (%)', type: 'number' },
      { name: 'netProfit', label: 'Чистая прибыль', type: 'number' },
    ],
    calculate: (inputs) => {
      const initial = Number(inputs.initialInvestment);
      const final = Number(inputs.finalValue);
      const dividends = Number(inputs.dividends || 0);
      const fees = Number(inputs.fees || 0);
      const years = Number(inputs.years);
      
      const totalReturn = final - initial + dividends - fees;
      const roiPercent = (totalReturn / initial) * 100;
      const annualizedReturn = (Math.pow((final + dividends - fees) / initial, 1 / years) - 1) * 100;
      
      return [
        { value: Math.round(totalReturn * 100) / 100, label: 'Абсолютный доход', unit: '₽' },
        { value: Math.round(roiPercent * 100) / 100, label: 'ROI', unit: '%' },
        { value: Math.round(annualizedReturn * 100) / 100, label: 'Годовая доходность', unit: '%' },
        { value: Math.round(totalReturn * 100) / 100, label: 'Чистая прибыль', unit: '₽' },
      ];
    },
    content: {
      howTo: 'Укажите начальную сумму, конечную стоимость, дивиденды и издержки. Укажите срок для расчета годовой доходности.',
      about: 'ROI (Return on Investment) показывает эффективность вложений в процентном и абсолютном выражении.',
      usage: 'Сравнение разных инвестиционных возможностей, оценка портфеля, анализ прибыльности активов.',
      formula: 'ROI = (Прибыль - Затраты) / Затраты × 100%',
      faq: [
        { question: 'Что такое годовая доходность?', answer: 'Среднегеометрическая доходность за год, позволяет сравнивать инвестиции разной длительности.' },
      ],
      sources: [
        { title: 'Investopedia', url: 'https://www.investopedia.com' },
      ],
      updatedAt: '2026-01-01',
    },
  },
  {
    id: 'break-even',
    slug: 'tochka-bezubytochnosti',
    title: 'Калькулятор точки безубыточности',
    description: 'Определите объем продаж, при котором бизнес выйдет на нулевую прибыль.',
    category: 'nauka-i-ucheba',
    subcategory: 'finansovye',
    type: 'formula',
    inputs: [
      {
        name: 'fixedCosts',
        label: 'Постоянные расходы (в месяц)',
        type: 'number',
        placeholder: '50000',
        min: 0,
      },
      {
        name: 'variableCostPerUnit',
        label: 'Переменные расходы на единицу',
        type: 'number',
        placeholder: '100',
        min: 0,
      },
      {
        name: 'pricePerUnit',
        label: 'Цена продажи за единицу',
        type: 'number',
        placeholder: '200',
        min: 0,
      },
    ],
    outputs: [
      { name: 'breakEvenUnits', label: 'Точка безубыточности (шт)', type: 'number' },
      { name: 'breakEvenRevenue', label: 'Выручка в точке БУ', type: 'number' },
      { name: 'contributionMargin', label: 'Маржинальный доход', type: 'number' },
      { name: 'contributionRatio', label: 'Коэффициент маржинальности', type: 'number' },
    ],
    calculate: (inputs) => {
      const fixed = Number(inputs.fixedCosts);
      const variable = Number(inputs.variableCostPerUnit);
      const price = Number(inputs.pricePerUnit);
      
      if (price <= variable) {
        return [
          { value: 0, label: 'Точка безубыточности', unit: 'шт' },
          { value: 0, label: 'Выручка в точке БУ', unit: '₽' },
          { value: 0, label: 'Маржинальный доход', unit: '₽' },
          { value: 0, label: 'Коэффициент маржинальности', unit: '' },
        ];
      }
      
      const contribution = price - variable;
      const breakEvenUnits = Math.ceil(fixed / contribution);
      const breakEvenRevenue = breakEvenUnits * price;
      const contributionRatio = contribution / price;
      
      return [
        { value: breakEvenUnits, label: 'Точка безубыточности', unit: 'шт' },
        { value: Math.round(breakEvenRevenue * 100) / 100, label: 'Выручка в точке БУ', unit: '₽' },
        { value: Math.round(contribution * 100) / 100, label: 'Маржинальный доход', unit: '₽' },
        { value: Math.round(contributionRatio * 100) / 100, label: 'Коэффициент маржинальности', unit: '' },
      ];
    },
    content: {
      howTo: 'Введите постоянные расходы, затраты на производство одной единицы и цену продажи.',
      about: 'Точка безубыточности — объем продаж, при котором выручка равна издержкам, а прибыль равна нулю.',
      usage: 'Бизнес-планирование, оценка рентабельности проекта, ценообразование.',
      formula: 'Точка БУ = Постоянные расходы / (Цена - Переменные расходы)',
      faq: [
        { question: 'Почему важна точка безубыточности?', answer: 'Помогает понять минимальный объем продаж для выживания бизнеса.' },
      ],
      sources: [
        { title: 'Corporate Finance Institute', url: 'https://corporatefinanceinstitute.com' },
      ],
      updatedAt: '2026-01-01',
    },
  },
  {
    id: 'mortgage',
    slug: 'ipotechnyj-kalkulyator',
    title: 'Ипотечный калькулятор',
    description: 'Рассчитайте платежи по ипотеке, график погашения и переплату.',
    category: 'nauka-i-ucheba',
    subcategory: 'finansovye',
    type: 'formula',
    inputs: [
      {
        name: 'propertyValue',
        label: 'Стоимость недвижимости',
        type: 'number',
        placeholder: '5000000',
        min: 0,
      },
      {
        name: 'downPayment',
        label: 'Первоначальный взнос',
        type: 'number',
        placeholder: '1000000',
        min: 0,
      },
      {
        name: 'interestRate',
        label: 'Процентная ставка (годовых %)',
        type: 'number',
        placeholder: '7.5',
        min: 0,
        max: 100,
      },
      {
        name: 'years',
        label: 'Срок кредита (лет)',
        type: 'number',
        placeholder: '20',
        min: 1,
        max: 50,
      },
    ],
    outputs: [
      { name: 'loanAmount', label: 'Сумма кредита', type: 'number' },
      { name: 'monthlyPayment', label: 'Ежемесячный платеж', type: 'number' },
      { name: 'totalPayment', label: 'Общая сумма платежей', type: 'number' },
      { name: 'totalInterest', label: 'Переплата по процентам', type: 'number' },
      { name: 'downPaymentPercent', label: 'Доля первого взноса (%)', type: 'number' },
    ],
    calculate: (inputs) => {
      const propertyValue = Number(inputs.propertyValue);
      const downPayment = Number(inputs.downPayment);
      const annualRate = Number(inputs.interestRate) / 100;
      const years = Number(inputs.years);
      
      const loanAmount = propertyValue - downPayment;
      const monthlyRate = annualRate / 12;
      const months = years * 12;
      
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                              (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - loanAmount;
      const downPaymentPercent = (downPayment / propertyValue) * 100;
      
      return [
        { value: Math.round(loanAmount * 100) / 100, label: 'Сумма кредита', unit: '₽' },
        { value: Math.round(monthlyPayment * 100) / 100, label: 'Ежемесячный платеж', unit: '₽' },
        { value: Math.round(totalPayment * 100) / 100, label: 'Общая сумма платежей', unit: '₽' },
        { value: Math.round(totalInterest * 100) / 100, label: 'Переплата по процентам', unit: '₽' },
        { value: Math.round(downPaymentPercent * 100) / 100, label: 'Доля первого взноса', unit: '%' },
      ];
    },
    content: {
      howTo: 'Укажите стоимость недвижимости, размер первоначального взноса, процентную ставку и срок кредита.',
      about: 'Аннуитетные платежи равны на протяжении всего срока кредита, включают основной долг и проценты.',
      usage: 'Планирование покупки недвижимости, сравнение ипотечных предложений, оценка финансовой нагрузки.',
      formula: 'Платеж = S × [r(1+r)^n] / [(1+r)^n - 1]',
      faq: [
        { question: 'Что лучше: дифференцированный или аннуитетный платеж?', answer: 'Аннуитетный — равные платежи, дифференцированный — убывающие, меньше переплата.' },
      ],
      sources: [
        { title: 'ЦБ РФ', url: 'https://cbr.ru' },
      ],
      updatedAt: '2026-01-01',
    },
  },
  {
    id: 'rent-vs-buy',
    slug: 'arenda-ili-pokupka',
    title: 'Аренда или покупка',
    description: 'Сравните финансовые выгоды аренды жилья и покупки собственного.',
    category: 'nauka-i-ucheba',
    subcategory: 'finansovye',
    type: 'formula',
    inputs: [
      {
        name: 'monthlyRent',
        label: 'Ежемесячная аренда',
        type: 'number',
        placeholder: '30000',
        min: 0,
      },
      {
        name: 'rentGrowth',
        label: 'Рост аренды в год (%)',
        type: 'number',
        placeholder: '5',
        min: 0,
      },
      {
        name: 'propertyPrice',
        label: 'Цена квартиры',
        type: 'number',
        placeholder: '5000000',
        min: 0,
      },
      {
        name: 'propertyGrowth',
        label: 'Рост цены недвижимости в год (%)',
        type: 'number',
        placeholder: '3',
        min: 0,
      },
      {
        name: 'investmentReturn',
        label: 'Доходность альтернативных инвестиций (%)',
        type: 'number',
        placeholder: '8',
        min: 0,
      },
      {
        name: 'years',
        label: 'Срок сравнения (лет)',
        type: 'number',
        placeholder: '10',
        min: 1,
        max: 50,
      },
    ],
    outputs: [
      { name: 'totalRentPaid', label: 'Всего потрачено на аренду', type: 'number' },
      { name: 'propertyValueFuture', label: 'Будущая стоимость квартиры', type: 'number' },
      { name: 'investmentValue', label: 'Стоимость инвестиций при аренде', type: 'number' },
      { name: 'buyNetWorth', label: 'Чистая стоимость при покупке', type: 'number' },
      { name: 'rentNetWorth', label: 'Чистая стоимость при аренде', type: 'number' },
      { name: 'winner', label: 'Выгоднее', type: 'text' },
    ],
    calculate: (inputs) => {
      const monthlyRent = Number(inputs.monthlyRent);
      const rentGrowth = Number(inputs.rentGrowth) / 100;
      const propertyPrice = Number(inputs.propertyPrice);
      const propertyGrowth = Number(inputs.propertyGrowth) / 100;
      const investmentReturn = Number(inputs.investmentReturn) / 100;
      const years = Number(inputs.years);
      
      let totalRentPaid = 0;
      let currentRent = monthlyRent;
      for (let i = 0; i < years; i++) {
        totalRentPaid += currentRent * 12;
        currentRent *= (1 + rentGrowth);
      }
      
      const propertyValueFuture = propertyPrice * Math.pow(1 + propertyGrowth, years);
      const investmentValue = propertyPrice * Math.pow(1 + investmentReturn, years);
      
      const buyNetWorth = propertyValueFuture;
      const rentNetWorth = Math.max(0, investmentValue - totalRentPaid);
      
      const winner = buyNetWorth > rentNetWorth ? 'Покупка' : 'Аренда';
      
      return [
        { value: Math.round(totalRentPaid * 100) / 100, label: 'Всего потрачено на аренду', unit: '₽' },
        { value: Math.round(propertyValueFuture * 100) / 100, label: 'Будущая стоимость квартиры', unit: '₽' },
        { value: Math.round(investmentValue * 100) / 100, label: 'Стоимость инвестиций при аренде', unit: '₽' },
        { value: Math.round(buyNetWorth * 100) / 100, label: 'Чистая стоимость при покупке', unit: '₽' },
        { value: Math.round(rentNetWorth * 100) / 100, label: 'Чистая стоимость при аренде', unit: '₽' },
        { value: winner, label: 'Выгоднее', unit: '' },
      ];
    },
    content: {
      howTo: 'Введите текущую арендную плату, цену квартиры, ожидаемые темпы роста и доходность инвестиций.',
      about: 'Сравнивает накопленное богатство при покупке жилья и аренде с инвестированием разницы.',
      usage: 'Принятие решения о покупке недвижимости, долгосрочное финансовое планирование.',
      formula: 'Сравнение общей стоимости владения и аренды с учетом роста цен и инвестиционного дохода.',
      faq: [
        { question: 'Какие факторы не учитывает калькулятор?', answer: 'Налоговые вычеты, коммунальные платежи, ремонт, транспортные расходы.' },
      ],
      sources: [
        { title: 'NY Times Rent vs Buy', url: 'https://www.nytimes.com/interactive/rent-or-buy-calculator.html' },
      ],
      updatedAt: '2026-01-01',
    },
  },
  {
    id: 'inflation',
    slug: 'inflyaciya',
    title: 'Калькулятор инфляции',
    description: 'Узнайте, как инфляция влияет на покупательную способность денег со временем.',
    category: 'nauka-i-ucheba',
    subcategory: 'finansovye',
    type: 'formula',
    inputs: [
      {
        name: 'currentAmount',
        label: 'Текущая сумма',
        type: 'number',
        placeholder: '100000',
        min: 0,
      },
      {
        name: 'inflationRate',
        label: 'Ставка инфляции (% в год)',
        type: 'number',
        placeholder: '5',
        min: 0,
      },
      {
        name: 'years',
        label: 'Количество лет',
        type: 'number',
        placeholder: '10',
        min: 1,
      },
    ],
    outputs: [
      { name: 'futureValue', label: 'Будущая стоимость', type: 'number' },
      { name: 'presentValue', label: 'Покупательная способность сегодня', type: 'number' },
      { name: 'purchasingPowerLoss', label: 'Потеря покупательной способности (%)', type: 'number' },
      { name: 'requiredReturn', label: 'Необходимая доходность для сохранения капитала (%)', type: 'number' },
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.currentAmount);
      const rate = Number(inputs.inflationRate) / 100;
      const years = Number(inputs.years);
      
      const futureValue = amount / Math.pow(1 + rate, years);
      const presentValue = futureValue;
      const purchasingPowerLoss = ((amount - futureValue) / amount) * 100;
      const requiredReturn = rate * 100;
      
      return [
        { value: Math.round(futureValue * 100) / 100, label: 'Будущая стоимость', unit: '₽' },
        { value: Math.round(presentValue * 100) / 100, label: 'Покупательная способность сегодня', unit: '₽' },
        { value: Math.round(purchasingPowerLoss * 100) / 100, label: 'Потеря покупательной способности', unit: '%' },
        { value: Math.round(requiredReturn * 100) / 100, label: 'Необходимая доходность', unit: '%' },
      ];
    },
    content: {
      howTo: 'Введите сумму, текущую ставку инфляции и срок. Увидите реальную стоимость денег в будущем.',
      about: 'Инфляция постепенно снижает покупательную способность денег. То, что можно купить сегодня, будет стоить дороже завтра.',
      usage: 'Оценка реальной доходности инвестиций, планирование пенсии, долгосрочное финансовое планирование.',
      formula: 'Будущая стоимость = Текущая сумма / (1 + инфляция)^лет',
      faq: [
        { question: 'Какая инфляция в России?', answer: 'В последние годы колеблется от 4% до 15%. Для расчетов рекомендуется использовать 5-7%.' },
      ],
      sources: [
        { title: 'Росстат', url: 'https://rosstat.gov.ru' },
        { title: 'ЦБ РФ', url: 'https://cbr.ru' },
      ],
      updatedAt: '2026-01-01',
    },
  },
  {
    id: 'salary-converter',
    slug: 'konverter-zarplaty',
    title: 'Конвертер заработной платы',
    description: 'Переведите зарплату между разными периодами: час, день, неделя, месяц, год.',
    category: 'nauka-i-ucheba',
    subcategory: 'finansovye',
    type: 'formula',
    inputs: [
      {
        name: 'amount',
        label: 'Сумма',
        type: 'number',
        placeholder: '100000',
        min: 0,
      },
      {
        name: 'period',
        label: 'Период',
        type: 'select',
        placeholder: 'Месяц',
        options: [
          { value: 'hour', label: 'В час' },
          { value: 'day', label: 'В день' },
          { value: 'week', label: 'В неделю' },
          { value: 'month', label: 'В месяц' },
          { value: 'year', label: 'В год' },
        ],
      },
      {
        name: 'hoursPerWeek',
        label: 'Часов в неделю',
        type: 'number',
        placeholder: '40',
        min: 1,
        max: 168,
      },
      {
        name: 'daysPerWeek',
        label: 'Рабочих дней в неделю',
        type: 'number',
        placeholder: '5',
        min: 1,
        max: 7,
      },
    ],
    outputs: [
      { name: 'hourly', label: 'В час', type: 'number' },
      { name: 'daily', label: 'В день', type: 'number' },
      { name: 'weekly', label: 'В неделю', type: 'number' },
      { name: 'monthly', label: 'В месяц (12 мес)', type: 'number' },
      { name: 'yearly', label: 'В год', type: 'number' },
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.amount);
      const period = inputs.period;
      const hoursPerWeek = Number(inputs.hoursPerWeek);
      const daysPerWeek = Number(inputs.daysPerWeek);
      
      let hourly = 0;
      switch (period) {
        case 'hour':
          hourly = amount;
          break;
        case 'day':
          hourly = amount / (hoursPerWeek / daysPerWeek);
          break;
        case 'week':
          hourly = amount / hoursPerWeek;
          break;
        case 'month':
          hourly = (amount * 12) / (hoursPerWeek * 52);
          break;
        case 'year':
          hourly = amount / (hoursPerWeek * 52);
          break;
      }
      
      const daily = hourly * (hoursPerWeek / daysPerWeek);
      const weekly = hourly * hoursPerWeek;
      const monthly = (hourly * hoursPerWeek * 52) / 12;
      const yearly = hourly * hoursPerWeek * 52;
      
      return [
        { value: Math.round(hourly * 100) / 100, label: 'В час', unit: '₽' },
        { value: Math.round(daily * 100) / 100, label: 'В день', unit: '₽' },
        { value: Math.round(weekly * 100) / 100, label: 'В неделю', unit: '₽' },
        { value: Math.round(monthly * 100) / 100, label: 'В месяц', unit: '₽' },
        { value: Math.round(yearly * 100) / 100, label: 'В год', unit: '₽' },
      ];
    },
    content: {
      howTo: 'Введите сумму, выберите текущий период оплаты и рабочий график. Получите эквиваленты для всех периодов.',
      about: 'Конвертирует зарплату между разными временными периодами с учетом вашего рабочего графика.',
      usage: 'Сравнение предложений о работе, планирование бюджета, оценка стоимости времени.',
      formula: 'Пересчет на базовую почасовую ставку и распределение на другие периоды.',
      faq: [
        { question: 'Как учитываются отпуска?', answer: 'Расчет ведется по календарному году. Для точного расчета уменьшите количество рабочих недель.' },
      ],
      sources: [],
      updatedAt: '2026-01-01',
    },
  },
  {
    id: 'savings-goal',
    slug: 'cel-nakopleniya',
    title: 'Калькулятор цели накопления',
    description: 'Рассчитайте, сколько нужно откладывать для достижения финансовой цели.',
    category: 'nauka-i-ucheba',
    subcategory: 'finansovye',
    type: 'formula',
    inputs: [
      {
        name: 'goalAmount',
        label: 'Целевая сумма',
        type: 'number',
        placeholder: '1000000',
        min: 0,
      },
      {
        name: 'currentSavings',
        label: 'Текущие накопления',
        type: 'number',
        placeholder: '100000',
        min: 0,
      },
      {
        name: 'months',
        label: 'Срок (месяцев)',
        type: 'number',
        placeholder: '24',
        min: 1,
      },
      {
        name: 'interestRate',
        label: 'Процентная ставка (годовых %)',
        type: 'number',
        placeholder: '5',
        min: 0,
      },
    ],
    outputs: [
      { name: 'monthlySavings', label: 'Необходимо откладывать в месяц', type: 'number' },
      { name: 'totalSaved', label: 'Итого накоплено', type: 'number' },
      { name: 'interestEarned', label: 'Проценты', type: 'number' },
      { name: 'percentOfGoal', label: 'Прогресс (%)', type: 'number' },
    ],
    calculate: (inputs) => {
      const goal = Number(inputs.goalAmount);
      const current = Number(inputs.currentSavings);
      const months = Number(inputs.months);
      const rate = Number(inputs.interestRate || 0) / 100;
      
      const monthlyRate = rate / 12;
      const amountNeeded = goal - current;
      
      let monthlySavings;
      if (rate === 0) {
        monthlySavings = amountNeeded / months;
      } else {
        monthlySavings = amountNeeded * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
      }
      
      const totalSaved = current + monthlySavings * months;
      const interestEarned = totalSaved - goal;
      const percentOfGoal = (current / goal) * 100;
      
      return [
        { value: Math.round(monthlySavings * 100) / 100, label: 'Необходимо откладывать в месяц', unit: '₽' },
        { value: Math.round(totalSaved * 100) / 100, label: 'Итого накоплено', unit: '₽' },
        { value: Math.round(interestEarned * 100) / 100, label: 'Проценты', unit: '₽' },
        { value: Math.round(percentOfGoal * 100) / 100, label: 'Прогресс', unit: '%' },
      ];
    },
    content: {
      howTo: 'Введите целевую сумму, текущие накопления и желаемый срок. Получите размер ежемесячных отчислений.',
      about: 'Помогает определить регулярные взносы для достижения финансовых целей с учетом процентного дохода.',
      usage: 'Планирование крупных покупок, накопление на отпуск, создание фонда безопасности.',
      formula: 'PMT = (Цель - Текущее) × r / ((1 + r)^n - 1)',
      faq: [
        { question: 'Что если я откладываю больше?', answer: 'Цель будет достигнута быстрее или накопится больше запланированной суммы.' },
      ],
      sources: [],
      updatedAt: '2026-01-01',
    },
  },
];
