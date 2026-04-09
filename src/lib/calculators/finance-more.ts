import { Calculator } from '../types';

// Калькулятор кредита (расширенный)
export const loanCalculator: Calculator = {
  id: 'loan-calculator',
  slug: 'kreditnyj-kalkulyator',
  title: 'Кредитный калькулятор',
  description: 'Расчёт ежемесячного платежа, переплаты, графика погашения кредита',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма кредита (₽)',
      type: 'number',
      placeholder: '500000',
      defaultValue: 500000,
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
      placeholder: '24',
      defaultValue: 24,
      min: 1,
      max: 360
    },
    {
      name: 'type',
      label: 'Тип платежей',
      type: 'select',
      options: [
        { value: 'annuity', label: 'Аннуитетные (равные)' },
        { value: 'differentiated', label: 'Дифференцированные (уменьшающиеся)' }
      ],
      defaultValue: 'annuity'
    }
  ],
  outputs: [
    { name: 'monthly', label: 'Ежемесячный платёж', type: 'number', unit: '₽' },
    { name: 'total', label: 'Общая сумма выплат', type: 'number', unit: '₽' },
    { name: 'overpayment', label: 'Переплата', type: 'number', unit: '₽' },
    { name: 'firstMonth', label: 'Первый платёж', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate) / 100 / 12; // monthly rate
    const term = Number(inputs.term);
    const type = String(inputs.type);
    
    let monthly = 0;
    let total = 0;
    let firstMonth = 0;
    
    if (type === 'annuity') {
      // Annuity payment formula
      monthly = amount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      total = monthly * term;
      firstMonth = monthly;
    } else {
      // Differentiated payment
      const principalPerMonth = amount / term;
      const firstMonthInterest = amount * rate;
      firstMonth = principalPerMonth + firstMonthInterest;
      
      // Calculate total for differentiated
      total = 0;
      let remaining = amount;
      for (let i = 0; i < term; i++) {
        const interest = remaining * rate;
        total += principalPerMonth + interest;
        remaining -= principalPerMonth;
      }
      monthly = total / term; // average
    }
    
    const overpayment = total - amount;
    
    return [
      { value: Math.round(monthly), label: type === 'annuity' ? 'Ежемесячный платёж' : 'Средний платёж', unit: '₽' },
      { value: Math.round(total), label: 'Общая сумма', unit: '₽' },
      { value: Math.round(overpayment), label: 'Переплата по процентам', unit: '₽' },
      { value: Math.round(firstMonth), label: 'Первый платёж', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите сумму кредита, процентную ставку, срок в месяцах и выберите тип платежей. Калькулятор рассчитает все параметры.',
    about: 'Кредит — договор, по которому банк предоставляет деньги под процент. Аннуитетные платежи равны, дифференцированные уменьшаются.',
    usage: 'Используется для планирования кредитования, сравнения предложений банков, расчёта финансовой нагрузки.',
    formula: 'Аннуитет: П = С × (i × (1+i)ⁿ) / ((1+i)ⁿ - 1)\nгде С — сумма, i — месячная ставка, n — срок в месяцах',
    faq: [
      {
        question: 'Что лучше: аннуитетные или дифференцированные платежи?',
        answer: 'Дифференцированные выгоднее (меньше переплата), но первые платежи высокие. Аннуитетные удобнее планировать — сумма постоянна.'
      },
      {
        question: 'Как рассчитывается ежемесячный платёж?',
        answer: 'Для аннуитета используется формула с аннуитетным коэффициентом. Для дифференцированных: (сумма/срок) + (остаток × месячная ставка).'
      }
    ],
    sources: [
      { title: 'Кредит — Википедия', url: 'https://ru.wikipedia.org/wiki/Кредит' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор депозита
export const depositCalculator: Calculator = {
  id: 'deposit-calculator',
  slug: 'depozitnyj-kalkulyator',
  title: 'Калькулятор вклада',
  description: 'Расчёт дохода по банковскому депозиту с капитализацией',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма вклада (₽)',
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
      label: 'Капитализация процентов',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет (простые проценты)' },
        { value: 'monthly', label: 'Ежемесячно' },
        { value: 'quarterly', label: 'Ежеквартально' },
        { value: 'yearly', label: 'Ежегодно' }
      ],
      defaultValue: 'monthly'
    }
  ],
  outputs: [
    { name: 'final', label: 'Итоговая сумма', type: 'number', unit: '₽' },
    { name: 'income', label: 'Доход', type: 'number', unit: '₽' },
    { name: 'effective', label: 'Эффективная ставка', type: 'number', unit: '%' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate) / 100;
    const term = Number(inputs.term);
    const cap = String(inputs.capitalization);
    
    let final = amount;
    let periods = 1;
    let periodRate = rate;
    
    switch (cap) {
      case 'monthly':
        periods = term;
        periodRate = rate / 12;
        break;
      case 'quarterly':
        periods = Math.floor(term / 3);
        periodRate = rate / 4;
        break;
      case 'yearly':
        periods = Math.floor(term / 12);
        periodRate = rate;
        break;
      case 'none':
        periods = 1;
        periodRate = rate * (term / 12);
        break;
    }
    
    if (cap === 'none') {
      final = amount + amount * periodRate;
    } else {
      final = amount * Math.pow(1 + periodRate, periods);
    }
    
    const income = final - amount;
    const effectiveRate = (Math.pow(final / amount, 12 / term) - 1) * 100;
    
    return [
      { value: Math.round(final), label: 'Сумма в конце срока', unit: '₽' },
      { value: Math.round(income), label: 'Заработанные проценты', unit: '₽' },
      { value: Math.round(effectiveRate * 100) / 100, label: 'Эффективная ставка годовых', unit: '%' }
    ];
  },
  content: {
    howTo: 'Введите сумму вклада, ставку, срок и тип капитализации. Калькулятор покажет итоговую сумму и доход.',
    about: 'Депозит — банковский вклад с начислением процентов. Капитализация — присоединение процентов к сумме вклада для начисления процентов на проценты.',
    usage: 'Используется для выбора вклада, планирования сбережений, сравнения банковских предложений.',
    formula: 'С капитализацией: S = P × (1 + i)ⁿ\nБез капитализации: S = P × (1 + i × n)\nгде P — сумма, i — ставка, n — количество периодов',
    faq: [
      {
        question: 'Что такое капитализация процентов?',
        answer: 'Присоединение начисленных процентов к основной сумме вклада. В следующем периоде проценты начисляются уже на увеличенную сумму — "проценты на проценты".'
      },
      {
        question: 'Почему с капитализацией выгоднее?',
        answer: 'С капитализацией растёт не только сумма, но и база для начисления процентов. Эффективная ставка выше номинальной.'
      }
    ],
    sources: [
      { title: 'Депозит — Википедия', url: 'https://ru.wikipedia.org/wiki/Депозит' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор ROI
export const roiCalculator: Calculator = {
  id: 'roi-calculator',
  slug: 'roi-okupaemost',
  title: 'Калькулятор ROI (окупаемость)',
  description: 'Расчёт возврата инвестиций и срока окупаемости',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'investment',
      label: 'Первоначальные инвестиции (₽)',
      type: 'number',
      placeholder: '100000',
      defaultValue: 100000,
      min: 0
    },
    {
      name: 'income',
      label: 'Годовой доход/прибыль (₽)',
      type: 'number',
      placeholder: '25000',
      defaultValue: 25000
    },
    {
      name: 'expenses',
      label: 'Годовые расходы (₽)',
      type: 'number',
      placeholder: '5000',
      defaultValue: 5000
    },
    {
      name: 'years',
      label: 'Период анализа (лет)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 1,
      max: 50
    }
  ],
  outputs: [
    { name: 'roi', label: 'ROI', type: 'number', unit: '%' },
    { name: 'payback', label: 'Срок окупаемости', type: 'text' },
    { name: 'netProfit', label: 'Чистая прибыль', type: 'number', unit: '₽' },
    { name: 'totalReturn', label: 'Общая доходность', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const investment = Number(inputs.investment);
    const income = Number(inputs.income);
    const expenses = Number(inputs.expenses);
    const years = Number(inputs.years);
    
    const netAnnual = income - expenses;
    const netProfit = netAnnual * years;
    const totalReturn = netProfit;
    
    // ROI = (Net Profit / Investment) × 100
    const roi = (netProfit / investment) * 100;
    
    // Payback period
    let paybackText = '';
    if (netAnnual <= 0) {
      paybackText = 'Не окупается';
    } else {
      const paybackYears = investment / netAnnual;
      const fullYears = Math.floor(paybackYears);
      const months = Math.round((paybackYears - fullYears) * 12);
      paybackText = `${fullYears} лет ${months} мес`;
    }
    
    return [
      { value: Math.round(roi * 100) / 100, label: 'ROI (Return on Investment)', unit: '%' },
      { value: paybackText, label: 'Срок окупаемости' },
      { value: Math.round(netProfit), label: 'Чистая прибыль за период', unit: '₽' },
      { value: Math.round(totalReturn), label: 'Возврат инвестиций', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите сумму инвестиций, годовой доход, расходы и период анализа. Калькулятор рассчитает ROI и срок окупаемости.',
    about: 'ROI (Return on Investment) — коэффициент возврата инвестиций, показывающий эффективность вложений в процентах.',
    usage: 'Используется для оценки инвестиций, сравнения проектов, бизнес-планирования, маркетинговых кампаний.',
    formula: 'ROI = ((Доход - Инвестиции) / Инвестиции) × 100%\nСрок окупаемости = Инвестиции / Чистый годовой доход',
    faq: [
      {
        question: 'Что такое хороший ROI?',
        answer: 'ROI > 0% — инвестиции окупаются. ROI > 100% — прибыль превышает инвестиции. Средняя доходность по рынку акций: ~7-10% годовых.'
      },
      {
        question: 'Какой срок окупаемости считается хорошим?',
        answer: 'Зависит от отрасли. Для бизнеса: 2-5 лет — хорошо, 5-10 — нормально. Для IT-проектов: часто 1-2 года.'
      }
    ],
    sources: [
      { title: 'Return on Investment — Википедия', url: 'https://ru.wikipedia.org/wiki/ROI' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор инфляции
export const inflationCalculator: Calculator = {
  id: 'inflation-calculator',
  slug: 'inflyaciya',
  title: 'Калькулятор инфляции',
  description: 'Расчёт обесценивания денег и реальной доходности',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Начальная сумма (₽)',
      type: 'number',
      placeholder: '100000',
      defaultValue: 100000
    },
    {
      name: 'inflation',
      label: 'Уровень инфляции (% в год)',
      type: 'number',
      placeholder: '8',
      defaultValue: 8,
      min: 0,
      max: 100
    },
    {
      name: 'rate',
      label: 'Ставка доходности (% в год)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10
    },
    {
      name: 'years',
      label: 'Срок (лет)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 1,
      max: 50
    }
  ],
  outputs: [
    { name: 'nominal', label: 'Номинальная сумма', type: 'number', unit: '₽' },
    { name: 'real', label: 'Реальная покупательная способность', type: 'number', unit: '₽' },
    { name: 'realRate', label: 'Реальная доходность', type: 'number', unit: '%' },
    { name: 'loss', label: 'Потеря от инфляции', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const inflation = Number(inputs.inflation) / 100;
    const rate = Number(inputs.rate) / 100;
    const years = Number(inputs.years);
    
    // Nominal value with interest
    const nominal = amount * Math.pow(1 + rate, years);
    
    // Real value accounting for inflation
    const realValue = nominal / Math.pow(1 + inflation, years);
    
    // Real rate of return (Fisher equation approximation)
    const realRate = ((1 + rate) / (1 + inflation) - 1) * 100;
    
    // Inflation loss
    const loss = nominal - realValue;
    
    return [
      { value: Math.round(nominal), label: 'Номинально (с процентами)', unit: '₽' },
      { value: Math.round(realValue), label: 'Реальная стоимость сегодня', unit: '₽' },
      { value: Math.round(realRate * 100) / 100, label: 'Реальная доходность', unit: '%' },
      { value: Math.round(loss), label: 'Съедено инфляцией', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите сумму, ожидаемую инфляцию, ставку доходности и срок. Калькулятор покажет реальную покупательную способность.',
    about: 'Инфляция — обесценивание денег, рост цен. Реальная доходность = номинальная доходность − инфляция.',
    usage: 'Используется для долгосрочного планирования, оценки инвестиций, расчёта реальной зарплаты, пенсионного планирования.',
    formula: 'Реальная доходность ≈ Номинальная − Инфляция\nТочнее: (1 + r)/(1 + i) − 1\nгде r — ставка, i — инфляция',
    faq: [
      {
        question: 'Как инфляция влияет на сбережения?',
        answer: 'Если ставка депозита ниже инфляции — реальная стоимость сбережений падает. Например, при инфляции 8% и ставке 5% теряете ~3% в год.'
      },
      {
        question: 'Что такое реальная доходность?',
        answer: 'Доходность с учётом инфляции. Показывает, реально ли обогатились или только номинально. Формула Фишера: (1+r)/(1+i) − 1.'
      }
    ],
    sources: [
      { title: 'Инфляция — Википедия', url: 'https://ru.wikipedia.org/wiki/Инфляция' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор NPV (чистая приведённая стоимость)
export const npvCalculator: Calculator = {
  id: 'npv-calculator',
  slug: 'npv-chistaya-stoimost',
  title: 'Калькулятор NPV',
  description: 'Чистая приведённая стоимость инвестиционного проекта',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'initial',
      label: 'Первоначальные инвестиции (₽)',
      type: 'number',
      placeholder: '1000000',
      defaultValue: 1000000,
      min: 0
    },
    {
      name: 'cashflow',
      label: 'Годовой денежный поток (₽)',
      type: 'number',
      placeholder: '300000',
      defaultValue: 300000
    },
    {
      name: 'rate',
      label: 'Ставка дисконтирования (% годовых)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 100
    },
    {
      name: 'years',
      label: 'Срок проекта (лет)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 1,
      max: 50
    }
  ],
  outputs: [
    { name: 'npv', label: 'NPV', type: 'number', unit: '₽' },
    { name: 'pi', label: 'Индекс прибыльности (PI)', type: 'number' },
    { name: 'decision', label: 'Решение', type: 'text' }
  ],
  calculate: (inputs) => {
    const initial = Number(inputs.initial);
    const cashflow = Number(inputs.cashflow);
    const rate = Number(inputs.rate) / 100;
    const years = Number(inputs.years);
    
    // Calculate NPV
    let npv = -initial;
    for (let i = 1; i <= years; i++) {
      npv += cashflow / Math.pow(1 + rate, i);
    }
    
    // Profitability Index
    const pi = (npv + initial) / initial;
    
    // Decision
    let decision = '';
    if (npv > 0) {
      decision = '✅ Проект выгоден (NPV > 0)';
    } else if (npv === 0) {
      decision = '⚠️ Проект безубыточен (NPV = 0)';
    } else {
      decision = '❌ Проект невыгоден (NPV < 0)';
    }
    
    return [
      { value: Math.round(npv), label: 'Чистая приведённая стоимость', unit: '₽' },
      { value: Math.round(pi * 100) / 100, label: 'Индекс прибыльности' },
      { value: decision, label: 'Инвестиционное решение' }
    ];
  },
  content: {
    howTo: 'Введите инвестиции, годовой поток, ставку дисконтирования и срок. NPV > 0 означает, что проект выгоден.',
    about: 'NPV (Net Present Value) — разница между приведёнными денежными потоками и инвестициями. Основной показатель для оценки инвестиций.',
    usage: 'Используется для оценки инвестиционных проектов, сравнения альтернатив, принятия финансовых решений.',
    formula: 'NPV = Σ(CFₜ / (1+r)ᵗ) − Initial\nгде CFₜ — поток в период t, r — ставка дисконтирования',
    faq: [
      {
        question: 'Что такое ставка дисконтирования?',
        answer: 'Процент, отражающий альтернативную стоимость капитала. Обычно: ставка по кредиту, требуемая доходность, WACC для компаний.'
      },
      {
        question: 'Какой NPV считается хорошим?',
        answer: 'NPV > 0 — проект создаёт стоимость. Чем выше NPV, тем лучше. При выборе между проектами берём с максимальным NPV.'
      }
    ],
    sources: [
      { title: 'NPV — Википедия', url: 'https://ru.wikipedia.org/wiki/Net_present_value' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор безубыточности
export const breakEvenCalculator: Calculator = {
  id: 'break-even-calculator',
  slug: 'tochka-bezubytochnosti',
  title: 'Точка безубыточности',
  description: 'Расчёт объёма продаж для покрытия всех издержек',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'fixed',
      label: 'Постоянные издержки (₽/мес)',
      type: 'number',
      placeholder: '50000',
      defaultValue: 50000,
      min: 0
    },
    {
      name: 'price',
      label: 'Цена за единицу (₽)',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      min: 0
    },
    {
      name: 'variable',
      label: 'Переменные издержки на единицу (₽)',
      type: 'number',
      placeholder: '600',
      defaultValue: 600,
      min: 0
    },
    {
      name: 'target',
      label: 'Целевая прибыль (₽/мес)',
      type: 'number',
      placeholder: '20000',
      defaultValue: 20000,
      min: 0
    }
  ],
  outputs: [
    { name: 'breakEven', label: 'Точка безубыточности', type: 'number', unit: 'шт.' },
    { name: 'forTarget', label: 'Для целевой прибыли', type: 'number', unit: 'шт.' },
    { name: 'revenue', label: 'Выручка на точке безубыточности', type: 'number', unit: '₽' },
    { name: 'margin', label: 'Маржинальная прибыль на ед.', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const fixed = Number(inputs.fixed);
    const price = Number(inputs.price);
    const variable = Number(inputs.variable);
    const target = Number(inputs.target);
    
    const marginPerUnit = price - variable;
    
    if (marginPerUnit <= 0) {
      return [
        { value: 'Ошибка', label: 'Ошибка' },
        { value: 'Маржа ≤ 0', label: 'Проблема' },
        { value: 0, label: 'Выручка' },
        { value: marginPerUnit, label: 'Маржа' }
      ];
    }
    
    const breakEven = Math.ceil(fixed / marginPerUnit);
    const forTarget = Math.ceil((fixed + target) / marginPerUnit);
    const revenue = breakEven * price;
    
    return [
      { value: breakEven, label: 'Единиц для безубыточности', unit: 'шт.' },
      { value: forTarget, label: 'Единиц для целевой прибыли', unit: 'шт.' },
      { value: Math.round(revenue), label: 'Выручка на точке безубыточности', unit: '₽' },
      { value: marginPerUnit, label: 'Маржинальная прибыль', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите постоянные издержки, цену, переменные издержки и целевую прибыль. Калькулятор покажет точку безубыточности.',
    about: 'Точка безубыточности — объём продаж, при котором выручка равна издержкам. Важнейший показатель для бизнеса.',
    usage: 'Используется для планирования бизнеса, оценки рисков, установления цен, планирования производства.',
    formula: 'Точка безубыточности = Постоянные издержки / (Цена − Переменные издержки)\nМаржинальная прибыль = Цена − Переменные издержки',
    faq: [
      {
        question: 'Что такое точка безубыточности?',
        answer: 'Объём продаж, при котором доходы равны расходам. При меньшем объёме — убытки, при большем — прибыль.'
      },
      {
        question: 'Как снизить точку безубыточности?',
        answer: '1) Снизить постоянные издержки\n2) Снизить переменные издержки\n3) Увеличить цену\n4) Увеличить маржинальную прибыль'
      }
    ],
    sources: [
      { title: 'Точка безубыточности — Википедия', url: 'https://ru.wikipedia.org/wiki/Точка_безубыточности' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const financeMoreCalculators = [
  loanCalculator,
  depositCalculator,
  roiCalculator,
  inflationCalculator,
  npvCalculator,
  breakEvenCalculator,
];
