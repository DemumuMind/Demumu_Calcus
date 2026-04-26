import { Calculator } from '../types';

// Калькулятор НДС
export const vatCalculator: Calculator = {
  id: 'vat-calculator',
  slug: 'kalkulyator-nds',
  title: 'Калькулятор НДС',
  description: 'Расчёт НДС: выделить из суммы или начислить на сумму',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма',
      type: 'number',
      placeholder: '10000',
      defaultValue: 10000,
      min: 0
    },
    {
      name: 'vatRate',
      label: 'Ставка НДС (%)',
      type: 'select',
      options: [
        { value: '20', label: '20% (основная)' },
        { value: '10', label: '10% (льготная)' },
        { value: '0', label: '0% (нулевая)' }
      ],
      defaultValue: '20'
    },
    {
      name: 'operation',
      label: 'Операция',
      type: 'select',
      options: [
        { value: 'add', label: 'Начислить НДС' },
        { value: 'extract', label: 'Выделить НДС' }
      ],
      defaultValue: 'add'
    }
  ],
  outputs: [
    { name: 'amountWithoutVat', label: 'Сумма без НДС', type: 'number', unit: '₽' },
    { name: 'vatAmount', label: 'Сумма НДС', type: 'number', unit: '₽' },
    { name: 'totalAmount', label: 'Итого с НДС', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const vatRate = Number(inputs.vatRate) / 100;
    const operation = String(inputs.operation);
    
    if (!amount) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    let amountWithoutVat = 0;
    let vatAmount = 0;
    let totalAmount = 0;
    
    if (operation === 'add') {
      // Начислить НДС
      amountWithoutVat = amount;
      vatAmount = amount * vatRate;
      totalAmount = amount + vatAmount;
    } else {
      // Выделить НДС
      totalAmount = amount;
      amountWithoutVat = amount / (1 + vatRate);
      vatAmount = amount - amountWithoutVat;
    }
    
    return [
      { value: amountWithoutVat.toFixed(2), label: 'Сумма без НДС', unit: '₽' },
      { value: vatAmount.toFixed(2), label: 'Сумма НДС', unit: '₽' },
      { value: totalAmount.toFixed(2), label: 'Итого с НДС', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите сумму, выберите ставку НДС и операцию. Калькулятор покажет сумму без НДС, сумму НДС и итоговую сумму.',
    about: 'НДС (налог на добавленную стоимость) — косвенный налог, взимаемый с продажи товаров и услуг. В России основная ставка — 20%.',
    usage: 'Используется бухгалтерами, предпринимателями и финансистами для расчёта налоговых обязательств.',
    formula: 'Начислить: НДС = Сумма × Ставка / 100\nВыделить: НДС = Сумма × Ставка / (100 + Ставка)',
    faq: [
      {
        question: 'Как выделить НДС 20% из суммы?',
        answer: 'Умножьте сумму на 20 и разделите на 120. Например, из 12000 ₽: 12000 × 20 / 120 = 2000 ₽ НДС.'
      },
      {
        question: 'Какие ставки НДС в России?',
        answer: 'Основная ставка — 20%, льготная — 10% (для некоторых продуктов, лекарств, книг), нулевая — для экспорта.'
      }
    ],
    sources: [
      { title: 'Налог на добавленную стоимость — Википедия', url: 'https://ru.wikipedia.org/wiki/Налог_на_добавленную_стоимость' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор кредита
export const loanCalculator: Calculator = {
  id: 'loan-basic-calculator',
  slug: 'kreditnyj-kalkulyator',
  title: 'Кредитный калькулятор',
  description: 'Расчёт ежемесячного платежа, переплаты и общей суммы',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма кредита',
      type: 'number',
      placeholder: '1000000',
      defaultValue: 1000000,
      min: 1000
    },
    {
      name: 'rate',
      label: 'Процентная ставка (% годовых)',
      type: 'number',
      placeholder: '12',
      defaultValue: 12,
      min: 0.1,
      max: 100
    },
    {
      name: 'term',
      label: 'Срок (месяцев)',
      type: 'number',
      placeholder: '60',
      defaultValue: 60,
      min: 1,
      max: 360
    },
    {
      name: 'paymentType',
      label: 'Тип платежей',
      type: 'select',
      options: [
        { value: 'annuity', label: 'Аннуитетные (равные)' },
        { value: 'differentiated', label: 'Дифференцированные' }
      ],
      defaultValue: 'annuity'
    }
  ],
  outputs: [
    { name: 'monthlyPayment', label: 'Ежемесячный платеж', type: 'number', unit: '₽' },
    { name: 'totalPayment', label: 'Общая сумма выплат', type: 'number', unit: '₽' },
    { name: 'overpayment', label: 'Переплата', type: 'number', unit: '₽' },
    { name: 'overpaymentPercent', label: 'Переплата (%)', type: 'number', unit: '%' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate);
    const term = Number(inputs.term);
    const paymentType = String(inputs.paymentType);
    
    if (!amount || !rate || !term) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const monthlyRate = rate / 100 / 12;
    let monthlyPayment = 0;
    let totalPayment = 0;
    
    if (paymentType === 'annuity') {
      // Аннуитетный платеж
      monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                       (Math.pow(1 + monthlyRate, term) - 1);
      totalPayment = monthlyPayment * term;
    } else {
      // Дифференцированный платеж (средний первый месяц)
      const principalPayment = amount / term;
      const firstMonthInterest = amount * monthlyRate;
      monthlyPayment = principalPayment + firstMonthInterest;
      
      // Общая сумма для дифференцированных
      totalPayment = 0;
      let remaining = amount;
      for (let i = 0; i < term; i++) {
        totalPayment += principalPayment + remaining * monthlyRate;
        remaining -= principalPayment;
      }
    }
    
    const overpayment = totalPayment - amount;
    const overpaymentPercent = (overpayment / amount) * 100;
    
    return [
      { value: monthlyPayment.toFixed(0), label: 'Ежемесячный платеж', unit: '₽' },
      { value: totalPayment.toFixed(0), label: 'Общая сумма выплат', unit: '₽' },
      { value: overpayment.toFixed(0), label: 'Переплата', unit: '₽' },
      { value: overpaymentPercent.toFixed(1), label: 'Переплата', unit: '%' }
    ];
  },
  content: {
    howTo: 'Введите сумму кредита, процентную ставку и срок. Выберите тип платежей. Калькулятор покажет ежемесячный платёж и переплату.',
    about: 'Кредитный калькулятор помогает рассчитать параметры кредита: ежемесячный платёж, общую сумму выплат и переплату.',
    usage: 'Используется для сравнения кредитных предложений и планирования бюджета.',
    formula: 'Аннуитет: П = С × (i × (1+i)ⁿ) / ((1+i)ⁿ − 1)\nГде: П — платёж, С — сумма, i — месячная ставка, n — срок в месяцах',
    faq: [
      {
        question: 'Что лучше — аннуитетные или дифференцированные платежи?',
        answer: 'Аннуитетные: равные платежи, но больше переплата. Дифференцированные: платежи уменьшаются, переплата меньше, но начальные платежи выше.'
      },
      {
        question: 'Как снизить переплату по кредиту?',
        answer: 'Досрочное погашение, рефинансирование под меньший процент, выбор дифференцированных платежей.'
      }
    ],
    sources: [
      { title: 'Кредит — Википедия', url: 'https://ru.wikipedia.org/wiki/Кредит' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор вклада
export const depositCalculator: Calculator = {
  id: 'deposit-basic-calculator',
  slug: 'kalkulyator-vklada',
  title: 'Калькулятор вклада',
  description: 'Расчёт дохода по банковскому вкладу с капитализацией',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма вклада',
      type: 'number',
      placeholder: '100000',
      defaultValue: 100000,
      min: 1000
    },
    {
      name: 'rate',
      label: 'Процентная ставка (% годовых)',
      type: 'number',
      placeholder: '8',
      defaultValue: 8,
      min: 0.1,
      max: 50
    },
    {
      name: 'term',
      label: 'Срок (месяцев)',
      type: 'number',
      placeholder: '12',
      defaultValue: 12,
      min: 1,
      max: 120
    },
    {
      name: 'capitalization',
      label: 'Капитализация',
      type: 'select',
      options: [
        { value: 'none', label: 'Без капитализации' },
        { value: 'monthly', label: 'Ежемесячная' },
        { value: 'quarterly', label: 'Ежеквартальная' },
        { value: 'yearly', label: 'Ежегодная' }
      ],
      defaultValue: 'monthly'
    }
  ],
  outputs: [
    { name: 'totalAmount', label: 'Итоговая сумма', type: 'number', unit: '₽' },
    { name: 'interest', label: 'Доход по процентам', type: 'number', unit: '₽' },
    { name: 'effectiveRate', label: 'Эффективная ставка', type: 'number', unit: '%' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate);
    const term = Number(inputs.term);
    const capitalization = String(inputs.capitalization);
    
    if (!amount || !rate || !term) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    let totalAmount = amount;
    let periods = 0;
    let ratePerPeriod = 0;
    
    switch (capitalization) {
      case 'monthly':
        periods = term;
        ratePerPeriod = rate / 100 / 12;
        break;
      case 'quarterly':
        periods = Math.floor(term / 3);
        ratePerPeriod = rate / 100 / 4;
        break;
      case 'yearly':
        periods = Math.floor(term / 12);
        ratePerPeriod = rate / 100;
        break;
      default:
        // Без капитализации
        periods = 1;
        ratePerPeriod = (rate / 100) * (term / 12);
    }
    
    if (capitalization === 'none') {
      totalAmount = amount * (1 + ratePerPeriod);
    } else {
      totalAmount = amount * Math.pow(1 + ratePerPeriod, periods);
    }
    
    const interest = totalAmount - amount;
    const effectiveRate = ((totalAmount - amount) / amount) * (12 / term) * 100;
    
    return [
      { value: totalAmount.toFixed(2), label: 'Итоговая сумма', unit: '₽' },
      { value: interest.toFixed(2), label: 'Доход по процентам', unit: '₽' },
      { value: effectiveRate.toFixed(2), label: 'Эффективная годовая ставка', unit: '%' }
    ];
  },
  content: {
    howTo: 'Введите сумму вклада, ставку, срок и тип капитализации. Калькулятор покажет итоговую сумму и доход.',
    about: 'Банковский вклад — способ сохранения и приумножения денег. Капитализация — начисление процентов на проценты.',
    usage: 'Используется для выбора выгодного вклада и планирования сбережений.',
    formula: 'С капитализацией: S = P × (1 + r/n)^(n×t)\nБез капитализации: S = P × (1 + r×t)',
    faq: [
      {
        question: 'Что такое капитализация?',
        answer: 'Капитализация — присоединение начисленных процентов к основной сумме вклада. При следующем начислении проценты считаются уже с новой суммы.'
      },
      {
        question: 'Как часто лучше капитализация?',
        answer: 'Чем чаще капитализация, тем выше эффективная ставка. Ежемесячная лучше ежеквартальной.'
      }
    ],
    sources: [
      { title: 'Вклад (банковский) — Википедия', url: 'https://ru.wikipedia.org/wiki/Вклад_(банковский)' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор сложного процента (ежемесячное пополнение)
export const compoundInterestCalculator: Calculator = {
  id: 'compound-interest-basic',
  slug: 'slozhnyj-procent',
  title: 'Сложный процент',
  description: 'Расчёт итоговой суммы при сложном проценте с ежемесячным пополнением',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'principal',
      label: 'Начальная сумма',
      type: 'number',
      placeholder: '100000',
      defaultValue: 100000,
      min: 0
    },
    {
      name: 'rate',
      label: 'Процентная ставка (% годовых)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 100
    },
    {
      name: 'periods',
      label: 'Срок (месяцев)',
      type: 'number',
      placeholder: '60',
      defaultValue: 60,
      min: 1,
      max: 600
    },
    {
      name: 'monthlyAddition',
      label: 'Ежемесячное пополнение',
      type: 'number',
      placeholder: '5000',
      defaultValue: 5000,
      min: 0
    }
  ],
  outputs: [
    { name: 'finalAmount', label: 'Итоговая сумма', type: 'number', unit: '₽' },
    { name: 'totalInterest', label: 'Общий доход от процентов', type: 'number', unit: '₽' },
    { name: 'totalContributions', label: 'Всего внесено', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const principal = Number(inputs.principal);
    const rate = Number(inputs.rate);
    const periods = Number(inputs.periods);
    const monthlyAddition = Number(inputs.monthlyAddition);

    if (!principal && !monthlyAddition) {
      return [{ value: '—', label: 'Результат' }];
    }

    const monthlyRate = rate / 100 / 12;
    let finalAmount = principal * Math.pow(1 + monthlyRate, periods);

    if (monthlyAddition > 0 && monthlyRate > 0) {
      finalAmount += monthlyAddition * (Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate;
    } else if (monthlyAddition > 0) {
      finalAmount += monthlyAddition * periods;
    }

    const totalContributions = principal + monthlyAddition * periods;
    const totalInterest = finalAmount - totalContributions;

    return [
      { value: finalAmount.toFixed(2), label: 'Итоговая сумма', unit: '₽' },
      { value: totalInterest.toFixed(2), label: 'Доход от процентов', unit: '₽' },
      { value: totalContributions.toFixed(2), label: 'Всего внесено', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите начальную сумму, годовую процентную ставку, срок в месяцах и сумму ежемесячного пополнения. Калькулятор рассчитает итоговую сумму с учётом сложного процента.',
    about: 'Сложный процент — начисление процентов не только на первоначальную сумму, но и на накопленные проценты. Пополнение ускоряет рост капитала.',
    usage: 'Используется для планирования инвестиций, накоплений, вкладов с капитализацией и ежемесячным пополнением.',
    formula: 'S = P × (1 + r)^n + A × [((1 + r)^n − 1) / r]\nГде P — начальная сумма, r — месячная ставка, n — срок, A — ежемесячное пополнение',
    faq: [
      {
        question: 'Что такое сложный процент?',
        answer: 'Сложный процент — это когда проценты начисляются не только на основную сумму, но и на ранее начисленные проценты, что ускоряет рост капитала.'
      },
      {
        question: 'Почему ежемесячное пополнение так важно?',
        answer: 'Регулярные пополнения значительно увеличивают итоговую сумму благодаря эффекту сложного процента на каждом взносе.'
      }
    ],
    sources: [
      { title: 'Сложный процент — Википедия', url: 'https://ru.wikipedia.org/wiki/Сложные_проценты' }
    ],
    updatedAt: '2026-04-26'
  }
};

export const financeCalculators = [
  vatCalculator,
  loanCalculator,
  depositCalculator,
  compoundInterestCalculator,
];
