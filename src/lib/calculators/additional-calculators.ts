import { Calculator } from '../types';

// Калькулятор ИМТ (Индекс массы тела)
export const bmiCalculator: Calculator = {
  id: 'bmi-calculator',
  slug: 'kalkulyator-imt',
  title: 'Калькулятор ИМТ',
  description: 'Рассчитайте индекс массы тела (ИМТ) онлайн. Узнайте, есть ли у вас избыточный вес или дефицит массы тела.',
  category: 'nauka-i-ucheba',
  subcategory: 'zdorove',
  type: 'calculator',
  inputs: [
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '170',
      defaultValue: 170,
      min: 50,
      max: 250
    },
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 20,
      max: 300
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
      min: 2,
      max: 120
    }
  ],
  outputs: [
    { name: 'bmi', label: 'ИМТ', type: 'text' },
    { name: 'category', label: 'Категория', type: 'text' },
    { name: 'idealWeight', label: 'Идеальный вес', type: 'text' }
  ],
  calculate: (inputs) => {
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    const age = Number(inputs.age);
    
    if (!height || !weight || height < 50 || weight < 20) {
      return [
        { value: '—', label: 'ИМТ' },
        { value: 'Введите корректные данные', label: 'Категория' },
        { value: '—', label: 'Идеальный вес' }
      ];
    }
    
    // Расчёт ИМТ: вес (кг) / (рост (м))²
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = Math.round(bmi * 10) / 10;
    
    // Определение категории
    let category = '';
    let color = '';
    
    if (bmi < 16) {
      category = 'Выраженный дефицит массы тела';
      color = 'text-red-600';
    } else if (bmi < 18.5) {
      category = 'Недостаточная масса тела';
      color = 'text-orange-500';
    } else if (bmi < 25) {
      category = 'Нормальная масса тела';
      color = 'text-green-600';
    } else if (bmi < 30) {
      category = 'Избыточная масса тела (предожирение)';
      color = 'text-orange-500';
    } else if (bmi < 35) {
      category = 'Ожирение I степени';
      color = 'text-red-500';
    } else if (bmi < 40) {
      category = 'Ожирение II степени';
      color = 'text-red-600';
    } else {
      category = 'Ожирение III степени';
      color = 'text-red-700';
    }
    
    // Идеальный вес (формула Брока для взрослых)
    const idealWeightMin = 18.5 * heightInMeters * heightInMeters;
    const idealWeightMax = 24.9 * heightInMeters * heightInMeters;
    
    // Корректировка по возрасту для людей старше 40 лет
    let ageAdjustment = 0;
    if (age > 40) {
      ageAdjustment = (age - 40) * 0.1;
    }
    
    const idealMin = Math.round((idealWeightMin + ageAdjustment) * 10) / 10;
    const idealMax = Math.round((idealWeightMax + ageAdjustment) * 10) / 10;
    
    return [
      { 
        value: bmiRounded.toString(), 
        label: 'ИМТ',
        className: color
      },
      { 
        value: category, 
        label: 'Категория',
        className: color
      },
      { 
        value: `${idealMin} — ${idealMax} кг`, 
        label: 'Идеальный вес'
      }
    ];
  },
  content: {
    howTo: 'Введите ваш рост в сантиметрах, вес в килограммах, пол и возраст. Калькулятор автоматически рассчитает ИМТ и покажет категорию.',
    about: 'Индекс массы тела (ИМТ, BMI — Body Mass Index) — показатель, позволяющий оценить соответствие между массой человека и его ростом. Разработан бельгийским статистиком Адольфом Кетле в 1832 году.',
    usage: 'Используется для предварительной оценки массы тела и выявления рисков, связанных с избыточным или недостаточным весом.',
    formula: 'ИМТ = вес (кг) / [рост (м)]²',
    faq: [
      {
        question: 'Какой ИМТ считается нормальным?',
        answer: 'Нормальный ИМТ для взрослых составляет от 18.5 до 24.9.'
      },
      {
        question: 'Имеет ли значение пол при расчёте ИМТ?',
        answer: 'Базовая формула ИМТ универсальна, но идеальный вес может немного отличаться для мужчин и женщин из-за различий в телосложении.'
      },
      {
        question: 'Точен ли ИМТ для спортсменов?',
        answer: 'Для людей с развитой мускулатурой ИМТ может показывать избыточный вес, так как не различает мышцы и жир. В таких случаях лучше использовать анализ состава тела.'
      },
      {
        question: 'Как часто нужно проверять ИМТ?',
        answer: 'Рекомендуется отслеживать ИМТ каждые 3-6 месяцев или при значительном изменении веса.'
      }
    ],
    sources: [
      { title: 'Индекс массы тела — Википедия', url: 'https://ru.wikipedia.org/wiki/Индекс_массы_тела' },
      { title: 'ВОЗ: Индекс массы тела', url: 'https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index' }
    ],
    updatedAt: '2026-04-08'
  },
  popularCalculations: [
    { value: 'Рост 170 см, вес 70 кг', url: '/kalkulyator-imt?height=170&weight=70' },
    { value: 'Рост 160 см, вес 55 кг', url: '/kalkulyator-imt?height=160&weight=55' },
    { value: 'Рост 180 см, вес 85 кг', url: '/kalkulyator-imt?height=180&weight=85' }
  ]
};

// Калькулятор суточной нормы калорий
export const calorieCalculator: Calculator = {
  id: 'calorie-calculator',
  slug: 'kalkulyator-kalorij',
  title: 'Калькулятор калорий',
  description: 'Рассчитайте суточную норму калорий (BMR и TDEE) для поддержания, похудения или набора веса.',
  category: 'nauka-i-ucheba',
  subcategory: 'zdorove',
  type: 'calculator',
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
      max: 100
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '170',
      defaultValue: 170,
      min: 100,
      max: 250
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
      name: 'activity',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: 'sedentary', label: 'Сидячий образ жизни (нет или минимум активности)' },
        { value: 'light', label: 'Лёгкая активность (1-3 раза в неделю)' },
        { value: 'moderate', label: 'Средняя активность (3-5 раз в неделю)' },
        { value: 'active', label: 'Высокая активность (6-7 раз в неделю)' },
        { value: 'very-active', label: 'Очень высокая активность (физическая работа или 2 тренировки в день)' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'goal',
      label: 'Цель',
      type: 'select',
      options: [
        { value: 'maintain', label: 'Поддержание веса' },
        { value: 'lose', label: 'Похудение' },
        { value: 'gain', label: 'Набор веса' }
      ],
      defaultValue: 'maintain'
    }
  ],
  outputs: [
    { name: 'bmr', label: 'BMR (основной обмен)', type: 'text' },
    { name: 'tdee', label: 'TDEE (суточная норма)', type: 'text' },
    { name: 'target', label: 'Целевые калории', type: 'text' }
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender);
    const age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    const activity = String(inputs.activity);
    const goal = String(inputs.goal);
    
    if (!age || !height || !weight || age < 10 || height < 100 || weight < 30) {
      return [
        { value: '—', label: 'BMR (основной обмен)' },
        { value: '—', label: 'TDEE (суточная норма)' },
        { value: 'Введите корректные данные', label: 'Целевые калории' }
      ];
    }
    
    // Расчёт BMR по формуле Миффлина-Сан Жеора
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    bmr = Math.round(bmr);
    
    // Коэффициенты активности
    const activityMultipliers: Record<string, number> = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };
    
    // Расчёт TDEE
    const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.55));
    
    // Целевые калории в зависимости от цели
    let targetCalories: number;
    let targetLabel: string;
    
    switch (goal) {
      case 'lose':
        targetCalories = Math.round(tdee * 0.8); // Дефицит 20%
        targetLabel = 'для похудения';
        break;
      case 'gain':
        targetCalories = Math.round(tdee * 1.15); // Профицит 15%
        targetLabel = 'для набора массы';
        break;
      default:
        targetCalories = tdee;
        targetLabel = 'для поддержания';
    }
    
    return [
      { 
        value: `${bmr.toLocaleString('ru-RU')} ккал`, 
        label: 'BMR (основной обмен)',
        description: 'Калории для поддержания жизнедеятельности в покое'
      },
      { 
        value: `${tdee.toLocaleString('ru-RU')} ккал`, 
        label: 'TDEE (суточная норма)',
        description: 'Общие энергетические затраты с учётом активности'
      },
      { 
        value: `${targetCalories.toLocaleString('ru-RU')} ккал`, 
        label: `Целевые калории ${targetLabel}`,
        className: goal === 'maintain' ? 'text-green-600' : goal === 'lose' ? 'text-orange-500' : 'text-blue-600'
      }
    ];
  },
  content: {
    howTo: 'Введите пол, возраст, рост, вес, уровень физической активности и цель. Калькулятор рассчитает вашу базовую метаболическую скорость (BMR) и общую суточную норму калорий (TDEE).',
    about: 'Калькулятор использует усовершенствованную формулу Миффлина-Сан Жеора для расчёта базового обмена веществ (BMR) и добавляет коэффициент физической активности для определения общей суточной энергетической затраты (TDEE).',
    usage: 'Помогает составить правильный план питания для поддержания, снижения или набора веса. Рекомендуется использовать в сочетании с отслеживанием макронутриентов.',
    formula: 'BMR (мужчины) = 10 × вес(кг) + 6.25 × рост(см) − 5 × возраст(лет) + 5\nBMR (женщины) = 10 × вес(кг) + 6.25 × рост(см) − 5 × возраст(лет) − 161\nTDEE = BMR × коэффициент активности',
    faq: [
      {
        question: 'Что такое BMR?',
        answer: 'BMR (Basal Metabolic Rate) — базальная метаболическая скорость или основной обмен веществ. Это количество калорий, которое ваше тело сжигает в состоянии полного покоя для поддержания жизненно важных функций.'
      },
      {
        question: 'Что такое TDEE?',
        answer: 'TDEE (Total Daily Energy Expenditure) — общие суточные энергетические затраты. Включает BMR плюс калории, сожжённые при физической активности.'
      },
      {
        question: 'Какой дефицит калорий нужен для похудения?',
        answer: 'Для безопасного похудения рекомендуется дефицит 300-500 ккал (15-20% от TDEE). Это позволяет терять около 0.5-1 кг в неделю.'
      },
      {
        question: 'Насколько точна формула?',
        answer: 'Формула Миффлина-Сан Жеора считается одной из самых точных, но индивидуальные особенности метаболизма могут отличаться на 10-15%.'
      }
    ],
    sources: [
      { title: 'Уравнение Миффлина-Сан Жеора', url: 'https://en.wikipedia.org/wiki/Basal_metabolic_rate#Mifflin_St_Jeor_equation' },
      { title: 'Расчёт энергетических затрат', url: 'https://ru.wikipedia.org/wiki/Энергетические_затраты' }
    ],
    updatedAt: '2026-04-08'
  },
  popularCalculations: [
    { value: 'Мужчина 30 лет, 180 см, 80 кг, средняя активность', url: '/kalkulyator-kalorij?gender=male&age=30&height=180&weight=80&activity=moderate&goal=maintain' },
    { value: 'Женщина 25 лет, 165 см, 60 кг, лёгкая активность', url: '/kalkulyator-kalorij?gender=female&age=25&height=165&weight=60&activity=light&goal=maintain' },
    { value: 'Мужчина 35 лет, 175 см, 90 кг, дефицит для похудения', url: '/kalkulyator-kalorij?gender=male&age=35&height=175&weight=90&activity=moderate&goal=lose' }
  ]
};

// Ипотечный калькулятор
export const mortgageCalculator: Calculator = {
  id: 'mortgage-calculator',
  slug: 'ipotchnyj-kalkulyator',
  title: 'Ипотечный калькулятор',
  description: 'Рассчитайте ежемесячный платёж по ипотеке, переплату и общую сумму выплат. Аннуитетные и дифференцированные платежи.',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'calculator',
  inputs: [
    {
      name: 'propertyValue',
      label: 'Стоимость недвижимости (₽)',
      type: 'number',
      placeholder: '5000000',
      defaultValue: 5000000,
      min: 100000,
      max: 1000000000
    },
    {
      name: 'downPayment',
      label: 'Первоначальный взнос (₽)',
      type: 'number',
      placeholder: '1000000',
      defaultValue: 1000000,
      min: 0
    },
    {
      name: 'interestRate',
      label: 'Процентная ставка (% годовых)',
      type: 'number',
      placeholder: '8.5',
      defaultValue: 8.5,
      min: 0.1,
      max: 50,
      step: 0.1
    },
    {
      name: 'loanTerm',
      label: 'Срок кредита (лет)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20,
      min: 1,
      max: 30
    },
    {
      name: 'paymentType',
      label: 'Тип платежей',
      type: 'select',
      options: [
        { value: 'annuity', label: 'Аннуитетные (равные платежи)' },
        { value: 'differentiated', label: 'Дифференцированные (убывающие платежи)' }
      ],
      defaultValue: 'annuity'
    }
  ],
  outputs: [
    { name: 'loanAmount', label: 'Сумма кредита', type: 'text' },
    { name: 'monthlyPayment', label: 'Ежемесячный платёж', type: 'text' },
    { name: 'totalPayment', label: 'Общая сумма выплат', type: 'text' },
    { name: 'totalInterest', label: 'Переплата по процентам', type: 'text' }
  ],
  calculate: (inputs) => {
    const propertyValue = Number(inputs.propertyValue);
    const downPayment = Number(inputs.downPayment);
    const interestRate = Number(inputs.interestRate);
    const loanTerm = Number(inputs.loanTerm);
    const paymentType = String(inputs.paymentType);
    
    if (!propertyValue || !interestRate || !loanTerm || propertyValue <= downPayment) {
      return [
        { value: '—', label: 'Сумма кредита' },
        { value: '—', label: 'Ежемесячный платёж' },
        { value: '—', label: 'Общая сумма выплат' },
        { value: 'Введите корректные данные', label: 'Переплата по процентам' }
      ];
    }
    
    // Сумма кредита
    const loanAmount = propertyValue - downPayment;
    
    // Параметры кредита
    const monthlyRate = interestRate / 100 / 12; // Месячная ставка
    const numberOfPayments = loanTerm * 12; // Количество месяцев
    
    let monthlyPayment: number;
    let totalPayment: number;
    let totalInterest: number;
    
    if (paymentType === 'annuity') {
      // Аннуитетный платёж
      // Формула: П = С × [i × (1 + i)^n] / [(1 + i)^n − 1]
      const annuityFactor = (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      monthlyPayment = loanAmount * annuityFactor;
      totalPayment = monthlyPayment * numberOfPayments;
      totalInterest = totalPayment - loanAmount;
    } else {
      // Дифференцированный платёж
      // Ежемесячное уменьшение основного долга
      const principalPayment = loanAmount / numberOfPayments;
      
      // Первый и последний платёжи
      const firstMonthInterest = loanAmount * monthlyRate;
      const firstMonthPayment = principalPayment + firstMonthInterest;
      
      const lastMonthInterest = principalPayment * monthlyRate;
      const lastMonthPayment = principalPayment + lastMonthInterest;
      
      // Средний платёж (для отображения)
      monthlyPayment = (firstMonthPayment + lastMonthPayment) / 2;
      
      // Общая переплата по процентам
      totalInterest = (loanAmount * monthlyRate * (numberOfPayments + 1)) / 2;
      totalPayment = loanAmount + totalInterest;
    }
    
    // Форматирование сумм
    const formatCurrency = (amount: number): string => {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0
      }).format(amount);
    };
    
    return [
      { 
        value: formatCurrency(loanAmount), 
        label: 'Сумма кредита'
      },
      { 
        value: paymentType === 'differentiated' 
          ? `${formatCurrency(loanAmount / numberOfPayments + loanAmount * monthlyRate)} — ${formatCurrency(loanAmount / numberOfPayments + (loanAmount / numberOfPayments) * monthlyRate)}`
          : formatCurrency(monthlyPayment), 
        label: 'Ежемесячный платёж',
        description: paymentType === 'differentiated' 
          ? 'От первого к последнему платежу' 
          : 'Равные платежи на протяжении всего срока'
      },
      { 
        value: formatCurrency(totalPayment), 
        label: 'Общая сумма выплат'
      },
      { 
        value: formatCurrency(totalInterest), 
        label: 'Переплата по процентам',
        className: 'text-red-600'
      }
    ];
  },
  content: {
    howTo: 'Введите стоимость недвижимости, размер первоначального взноса, годовую процентную ставку и срок кредита. Выберите тип платежей: аннуитетные (равные) или дифференцированные (убывающие).',
    about: 'Ипотечный калькулятор помогает рассчитать все параметры кредита на недвижимость. Поддерживает два типа платежей: аннуитетные (весь срок платите одинаковую сумму) и дифференцированные (платёж уменьшается каждый месяц).',
    usage: 'Используйте для предварительной оценки ипотечных условий перед обращением в банк. Рассчитайте, какую сумму вы сможете выплачивать ежемесячно.',
    formula: 'Аннуитетный платёж: П = С × [i × (1 + i)^n] / [(1 + i)^n − 1]\nгде П — платёж, С — сумма кредита, i — месячная ставка, n — количество месяцев',
    faq: [
      {
        question: 'Что лучше — аннуитетные или дифференцированные платежи?',
        answer: 'Аннуитетные удобнее для планирования бюджета (платёж постоянный). Дифференцированные выгоднее по переплате (меньше переплата), но первые платежи выше.'
      },
      {
        question: 'Как влияет размер первоначального взноса?',
        answer: 'Чем больше первоначальный взнос, тем меньше сумма кредита и переплата по процентам. Многие банки требуют минимум 10-20% от стоимости недвижимости.'
      },
      {
        question: 'Что такое полная стоимость кредита (ПСК)?',
        answer: 'ПСК включает не только проценты, но и все комиссии, страховки и другие обязательные платежи. Это реальная ставка по кредиту, она обычно выше номинальной.'
      },
      {
        question: 'Можно ли досрочно погасить ипотеку?',
        answer: 'Да, по закону РФ можно погасить ипотеку досрочно полностью или частично без штрафов (с 2022 года). При частичном погашении можно уменьшить платёж или срок.'
      },
      {
        question: 'На что обратить внимание при выборе ипотеки?',
        answer: 'Ставка (фиксированная/плавающая), первоначальный взнос, комиссии, страховки, возможность досрочного погашения, требования к заёмщику.'
      }
    ],
    sources: [
      { title: 'Ипотечный кредит — Википедия', url: 'https://ru.wikipedia.org/wiki/Ипотечный_кредит' },
      { title: 'ЦБ РФ: информация по ипотеке', url: 'https://www.cbr.ru/hd_base/mort_sl/' }
    ],
    updatedAt: '2026-04-08'
  },
  popularCalculations: [
    { value: 'Квартира 5 млн, взнос 1 млн, ставка 8%, 20 лет', url: '/ipotchnyj-kalkulyator?propertyValue=5000000&downPayment=1000000&interestRate=8&loanTerm=20&paymentType=annuity' },
    { value: 'Квартира 8 млн, взнос 2 млн, ставка 7.5%, 15 лет', url: '/ipotchnyj-kalkulyator?propertyValue=8000000&downPayment=2000000&interestRate=7.5&loanTerm=15&paymentType=annuity' },
    { value: 'Квартира 3 млн, без взноса, ставка 9%, 25 лет', url: '/ipotchnyj-kalkulyator?propertyValue=3000000&downPayment=0&interestRate=9&loanTerm=25&paymentType=annuity' }
  ]
};
