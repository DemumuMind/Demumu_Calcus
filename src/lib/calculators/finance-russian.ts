import { Calculator } from '../types';

// Калькулятор отпускных
export const vacationCalculator: Calculator = {
  id: 'vacation-calculator',
  slug: 'kalkulyator-otpusknyh',
  title: 'Калькулятор отпускных',
  description: 'Расчёт отпускных по среднему заработку за 12 месяцев',
  category: 'finansy',
  subcategory: 'zarplata',
  type: 'formula',
  inputs: [
    {
      name: 'averageSalary',
      label: 'Средняя зарплата за 12 месяцев',
      type: 'number',
      placeholder: '50000',
      defaultValue: 50000,
      min: 0,
      unit: '₽'
    },
    {
      name: 'vacationDays',
      label: 'Количество дней отпуска',
      type: 'number',
      placeholder: '28',
      defaultValue: 28,
      min: 1,
      max: 365,
      unit: 'дней'
    }
  ],
  outputs: [
    { name: 'dailyEarnings', label: 'Средний дневной заработок', type: 'number', unit: '₽' },
    { name: 'vacationPay', label: 'Сумма отпускных', type: 'number', unit: '₽' },
    { name: 'ndfl', label: 'НДФЛ (13%)', type: 'number', unit: '₽' },
    { name: 'netAmount', label: 'К выдаче на руки', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const averageSalary = Number(inputs.averageSalary);
    const vacationDays = Number(inputs.vacationDays);
    
    if (!averageSalary || !vacationDays) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Средний дневной заработок = ЗП / 12 / 29.3 (среднее кол-во дней в месяце)
    const dailyEarnings = averageSalary / 12 / 29.3;
    const vacationPay = dailyEarnings * vacationDays;
    const ndfl = vacationPay * 0.13;
    const netAmount = vacationPay - ndfl;
    
    return [
      { value: dailyEarnings.toFixed(2), label: 'Средний дневной заработок', unit: '₽' },
      { value: vacationPay.toFixed(2), label: 'Сумма отпускных', unit: '₽' },
      { value: ndfl.toFixed(2), label: 'НДФЛ (13%)', unit: '₽' },
      { value: netAmount.toFixed(2), label: 'К выдаче на руки', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите среднемесячную зарплату за последние 12 месяцев и количество дней отпуска. Калькулятор рассчитает отпускные с учётом НДФЛ.',
    about: 'Отпускные рассчитываются по формуле: средний дневной заработок × количество дней отпуска. Средний дневной заработок = зарплата за 12 месяцев / 12 / 29.3 (среднее количество дней в месяце).',
    usage: 'Используется для планирования отпуска и контроля правильности начисления отпускных работодателем.',
    formula: 'Отпускные = (ЗП × 12 / 12 / 29.3) × Дней отпуска',
    faq: [
      {
        question: 'Какой период учитывается при расчёте отпускных?',
        answer: 'При расчёте учитывается заработок за последние 12 месяцев перед отпуском.'
      },
      {
        question: 'Как рассчитывается средний дневной заработок?',
        answer: 'Средний дневной заработок = зарплата за 12 месяцев / 12 / 29.3, где 29.3 — среднее количество дней в месяце.'
      },
      {
        question: 'Удерживается ли НДФЛ с отпускных?',
        answer: 'Да, с отпускных удерживается НДФЛ 13% (или 15% для доходов свыше 5 млн руб. в год).'
      }
    ],
    sources: [
      { title: 'Трудовой кодекс РФ — статья 139', url: 'https://www.consultant.ru/document/cons_doc_LAW_34683/6b6a582895454eaf146e6e8098d48a5e4b31d2cd/' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: '28 дней при ЗП 50000', url: '/kalkulyator-otpusknyh?averageSalary=50000&vacationDays=28' },
    { value: '14 дней при ЗП 100000', url: '/kalkulyator-otpusknyh?averageSalary=100000&vacationDays=14' },
    { value: '42 дня при ЗП 75000', url: '/kalkulyator-otpusknyh?averageSalary=75000&vacationDays=42' }
  ]
};

// Калькулятор декретных
export const maternityCalculator: Calculator = {
  id: 'maternity-calculator',
  slug: 'kalkulyator-dekretnyh',
  title: 'Калькулятор декретных',
  description: 'Расчёт пособия по беременности и родам (декретные)',
  category: 'finansy',
  subcategory: 'zarplata',
  type: 'formula',
  inputs: [
    {
      name: 'salaryYear1',
      label: 'Зарплата за 1-й год (год назад)',
      type: 'number',
      placeholder: '600000',
      defaultValue: 600000,
      min: 0,
      max: 12000000,
      unit: '₽'
    },
    {
      name: 'salaryYear2',
      label: 'Зарплата за 2-й год (2 года назад)',
      type: 'number',
      placeholder: '550000',
      defaultValue: 550000,
      min: 0,
      max: 12000000,
      unit: '₽'
    },
    {
      name: 'excludedDays',
      label: 'Исключённые дни (больничные, другие декреты)',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      max: 730,
      unit: 'дней'
    },
    {
      name: 'leaveDuration',
      label: 'Длительность отпуска',
      type: 'select',
      options: [
        { value: '140', label: '140 дней (обычные роды)' },
        { value: '156', label: '156 дней (осложнённые роды)' },
        { value: '194', label: '194 дня (двойня и более)' }
      ],
      defaultValue: '140'
    }
  ],
  outputs: [
    { name: 'dailyEarnings', label: 'Средний дневной заработок', type: 'number', unit: '₽' },
    { name: 'totalAmount', label: 'Общая сумма декретных', type: 'number', unit: '₽' },
    { name: 'monthlyAverage', label: 'В среднем в месяц', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const salaryYear1 = Number(inputs.salaryYear1);
    const salaryYear2 = Number(inputs.salaryYear2);
    const excludedDays = Number(inputs.excludedDays);
    const leaveDuration = Number(inputs.leaveDuration);
    
    if (!salaryYear1 || !salaryYear2) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const totalSalary = salaryYear1 + salaryYear2;
    const workingDays = 730 - excludedDays; // 2 года = 730 дней
    
    // Минимальные и максимальные ограничения на дневной заработок (2024-2025)
    const minDailyEarnings = 492.60; // МРОТ / 30.44
    const maxDailyEarnings = (12000000 + 12000000) / 730; // ~3287.67
    
    let dailyEarnings = totalSalary / workingDays;
    
    // Применяем ограничения
    if (dailyEarnings < minDailyEarnings) dailyEarnings = minDailyEarnings;
    if (dailyEarnings > maxDailyEarnings) dailyEarnings = maxDailyEarnings;
    
    const totalAmount = dailyEarnings * leaveDuration;
    const monthlyAverage = totalAmount / (leaveDuration / 30.44);
    
    return [
      { value: dailyEarnings.toFixed(2), label: 'Средний дневной заработок', unit: '₽' },
      { value: totalAmount.toFixed(2), label: 'Общая сумма декретных', unit: '₽' },
      { value: monthlyAverage.toFixed(2), label: 'В среднем в месяц', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите зарплату за два предыдущих года, укажите количество исключённых дней (больничные, предыдущие декреты) и выберите длительность отпуска.',
    about: 'Декретные (пособие по беременности и родам) рассчитываются из среднего заработка за 2 предыдущих года. Минимальная сумма зависит от МРОТ, максимальная — от предельной базы взносов.',
    usage: 'Используется для планирования бюджета во время декретного отпуска.',
    formula: 'Декретные = (ЗП за 2 года / (730 - исключённые дни)) × дней отпуска',
    faq: [
      {
        question: 'Какие годы учитываются при расчёте?',
        answer: 'Учитывается заработок за 2 календарных года, предшествующих году ухода в декретный отпуск.'
      },
      {
        question: 'Можно ли заменить годы при расчёте?',
        answer: 'Да, если в расчётном периоде была другая декретная отпуск или больничный, можно заменить соответствующие годы на предыдущие.'
      },
      {
        question: 'Какая максимальная сумма декретных?',
        answer: 'В 2024-2025 году максимальный средний дневной заработок — около 3287 ₽, максимальные декретные за 140 дней — около 460 000 ₽.'
      }
    ],
    sources: [
      { title: 'Федеральный закон №255-ФЗ "Об обязательном социальном страховании"', url: 'https://www.consultant.ru/document/cons_doc_LAW_142584/' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Калькулятор пенсии
export const pensionCalculator: Calculator = {
  id: 'pension-calculator',
  slug: 'kalkulyator-pensii',
  title: 'Калькулятор пенсии по старости',
  description: 'Расчёт размера страховой пенсии по старости в России',
  category: 'finansy',
  subcategory: 'pensiya',
  type: 'formula',
  inputs: [
    {
      name: 'workExperience',
      label: 'Стаж работы',
      type: 'number',
      placeholder: '25',
      defaultValue: 25,
      min: 0,
      max: 60,
      unit: 'лет'
    },
    {
      name: 'totalSalary',
      label: 'Средняя зарплата за год',
      type: 'number',
      placeholder: '50000',
      defaultValue: 50000,
      min: 0,
      unit: '₽/мес'
    },
    {
      name: 'pensionPoints',
      label: 'Накоплено пенсионных коэффициентов (ПК)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 0,
      max: 500
    },
    {
      name: 'region',
      label: 'Регион',
      type: 'select',
      options: [
        { value: 'standard', label: 'Обычный регион' },
        { value: 'north', label: 'РКС (Районы Крайнего Севера)' },
        { value: 'equated', label: 'МРС (Приравненные к Северу)' }
      ],
      defaultValue: 'standard'
    }
  ],
  outputs: [
    { name: 'fixedPayment', label: 'Фиксированная выплата', type: 'number', unit: '₽' },
    { name: 'insurancePart', label: 'Страховая часть (ПК × стоимость)', type: 'number', unit: '₽' },
    { name: 'totalPension', label: 'Общий размер пенсии', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const pensionPoints = Number(inputs.pensionPoints);
    const region = String(inputs.region);
    
    if (!pensionPoints) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Значения на 2024-2025 год
    const pointValue = 133.05; // Стоимость пенсионного коэффициента
    let fixedPayment = 8726.13; // Фиксированная выплата
    
    // Коэффициенты для северных регионов
    if (region === 'north') {
      fixedPayment *= 1.5; // Коэффициент РКС
    } else if (region === 'equated') {
      fixedPayment *= 1.3; // Коэффициент МРС
    }
    
    const insurancePart = pensionPoints * pointValue;
    const totalPension = fixedPayment + insurancePart;
    
    return [
      { value: fixedPayment.toFixed(2), label: 'Фиксированная выплата', unit: '₽' },
      { value: insurancePart.toFixed(2), label: 'Страховая часть (ПК × стоимость)', unit: '₽' },
      { value: totalPension.toFixed(2), label: 'Общий размер пенсии', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите количество накопленных пенсионных коэффициентов (ПК), выберите регион проживания. Калькулятор рассчитает примерный размер пенсии.',
    about: 'Страховая пенсия по старости состоит из фиксированной выплаты и страховой части (пенсионные коэффициенты × их стоимость).',
    usage: 'Используется для предварительной оценки размера будущей пенсии. Точный расчёт делается только в ПФР.',
    formula: 'Пенсия = Фиксированная выплата + (ПК × Стоимость ПК)',
    faq: [
      {
        question: 'Как узнать количество пенсионных коэффициентов?',
        answer: 'Информация доступна в личном кабинете на сайте ПФР или Госуслугах, а также в выписке из СНИЛС.'
      },
      {
        question: 'С какого возраста назначается пенсия?',
        answer: 'Для мужчин — с 65 лет, для женщин — с 60 лет (с учётом переходного периода в 2024-2028 годах).'
      },
      {
        question: 'Какой минимальный стаж нужен для пенсии?',
        answer: 'В 2024 году минимальный страховой стаж — 15 лет, минимальное количество ПК — 28.2.'
      }
    ],
    sources: [
      { title: 'Пенсионный фонд России', url: 'http://www.pfrf.ru/' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Калькулятор неустойки по 395 ГК РФ
export const penalty395Calculator: Calculator = {
  id: 'penalty-395-calculator',
  slug: 'kalkulyator-neustoiki-395-gk',
  title: 'Калькулятор неустойки по 395 ГК РФ',
  description: 'Расчёт процентов за просрочку платежа по статье 395 Гражданского кодекса РФ',
  category: 'finansy',
  subcategory: 'yuridicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'debtAmount',
      label: 'Сумма долга',
      type: 'number',
      placeholder: '100000',
      defaultValue: 100000,
      min: 0,
      unit: '₽'
    },
    {
      name: 'startDate',
      label: 'Дата начала просрочки',
      type: 'date',
      placeholder: '2024-01-01'
    },
    {
      name: 'endDate',
      label: 'Дата окончания (или сегодня)',
      type: 'date',
      placeholder: '2024-12-31'
    },
    {
      name: 'rateType',
      label: 'Ставка',
      type: 'select',
      options: [
        { value: 'current', label: 'Текущая ключевая ставка ЦБ (21%)' },
        { value: '16', label: '16% (период 07.2024-10.2024)' },
        { value: '13', label: '13% (период до 07.2024)' },
        { value: 'custom', label: 'Указать вручную' }
      ],
      defaultValue: 'current'
    },
    {
      name: 'customRate',
      label: 'Процентная ставка (если выбрано "Указать вручную")',
      type: 'number',
      placeholder: '21',
      defaultValue: 21,
      min: 0,
      max: 100,
      unit: '%'
    }
  ],
  outputs: [
    { name: 'daysOverdue', label: 'Дней просрочки', type: 'number', unit: 'дней' },
    { name: 'penaltyAmount', label: 'Сумма неустойки', type: 'number', unit: '₽' },
    { name: 'totalAmount', label: 'Итого (долг + неустойка)', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const debtAmount = Number(inputs.debtAmount);
    const startDate = new Date(inputs.startDate as string);
    const endDate = new Date(inputs.endDate as string);
    const rateType = String(inputs.rateType);
    const customRate = Number(inputs.customRate);
    
    if (!debtAmount || !startDate.getTime() || !endDate.getTime()) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Расчёт количества дней
    const diffTime = endDate.getTime() - startDate.getTime();
    const daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (daysOverdue <= 0) {
      return [{ value: '—', label: 'Результат', additionalInfo: 'Дата окончания должна быть позже даты начала' }];
    }
    
    // Определение ставки
    let rate = 21; // Текущая ключевая ставка ЦБ по умолчанию
    if (rateType === '16') rate = 16;
    else if (rateType === '13') rate = 13;
    else if (rateType === 'custom') rate = customRate;
    
    // Формула: (ставка / 365) × дни × сумма / 100
    const penaltyAmount = (rate / 365) * daysOverdue * debtAmount / 100;
    const totalAmount = debtAmount + penaltyAmount;
    
    return [
      { value: daysOverdue.toString(), label: 'Дней просрочки', unit: 'дней' },
      { value: penaltyAmount.toFixed(2), label: 'Сумма неустойки', unit: '₽' },
      { value: totalAmount.toFixed(2), label: 'Итого (долг + неустойка)', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите сумму долга, дату начала просрочки, дату окончания (или сегодняшнюю дату) и выберите процентную ставку.',
    about: 'Неустойка по статье 395 ГК РФ начисляется за пользование чужими денежными средствами. Ставка равна ключевой ставке ЦБ РФ.',
    usage: 'Используется для расчёта неустойки при нарушении договорных обязательств, просрочке платежей.',
    formula: 'Неустойка = (Ставка ЦБ / 365) × Дни просрочки × Сумма долга / 100',
    faq: [
      {
        question: 'Какая ставка применяется?',
        answer: 'Применяется ключевая ставка ЦБ РФ, действовавшая в период просрочки. Сейчас (2024-2025) — 21%.'
      },
      {
        question: 'С какого дня начинается просрочка?',
        answer: 'Просрочка начинается со дня, следующего за днём исполнения обязательства по договору.'
      },
      {
        question: 'Можно ли взыскать неустойку через суд?',
        answer: 'Да, требование о взыскании процентов по ст. 395 ГК РФ может быть предъявлено в судебном порядке.'
      }
    ],
    sources: [
      { title: 'ГК РФ Статья 395. Ответственность за неисполнение денежного обязательства', url: 'https://www.consultant.ru/document/cons_doc_LAW_5142/8a5f013e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5/' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Калькулятор госпошлин
export const stateDutyCalculator: Calculator = {
  id: 'state-duty-calculator',
  slug: 'kalkulyator-gosposhliny',
  title: 'Калькулятор госпошлины',
  description: 'Расчёт госпошлины для суда, загса, нотариуса, регистрации',
  category: 'finansy',
  subcategory: 'yuridicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'dutyType',
      label: 'Тип услуги',
      type: 'select',
      options: [
        { value: 'property_claim', label: 'Имущественный иск (в зависимости от суммы)' },
        { value: 'divorce', label: 'Развод (без раздела имущества)' },
        { value: 'divorce_property', label: 'Развод с разделом имущества' },
        { value: 'alimony', label: 'Взыскание алиментов' },
        { value: 'notary', label: 'Нотариальное заверение' },
        { value: 'passport', label: 'Загранпаспорт (новый)' },
        { value: 'registration_ip', label: 'Регистрация ИП' },
        { value: 'registration_ooo', label: 'Регистрация ООО' }
      ],
      defaultValue: 'property_claim'
    },
    {
      name: 'claimAmount',
      label: 'Сумма иска (для имущественных требований)',
      type: 'number',
      placeholder: '500000',
      defaultValue: 500000,
      min: 0,
      unit: '₽'
    }
  ],
  outputs: [
    { name: 'dutyAmount', label: 'Размер госпошлины', type: 'number', unit: '₽' },
    { name: 'discountInfo', label: 'Информация о льготах', type: 'text' }
  ],
  calculate: (inputs) => {
    const dutyType = String(inputs.dutyType);
    const claimAmount = Number(inputs.claimAmount);
    
    let dutyAmount = 0;
    let discountInfo = '';
    
    switch (dutyType) {
      case 'property_claim':
        // Расчёт по шкале
        if (claimAmount <= 20000) {
          dutyAmount = Math.max(400, claimAmount * 0.04);
        } else if (claimAmount <= 100000) {
          dutyAmount = 800 + (claimAmount - 20000) * 0.03;
        } else if (claimAmount <= 200000) {
          dutyAmount = 3200 + (claimAmount - 100000) * 0.02;
        } else if (claimAmount <= 1000000) {
          dutyAmount = 5200 + (claimAmount - 200000) * 0.01;
        } else {
          dutyAmount = 13200 + (claimAmount - 1000000) * 0.005;
          if (dutyAmount > 60000) dutyAmount = 60000;
        }
        discountInfo = 'Инвалиды I-II группы, пенсионеры освобождаются от уплаты госпошлины при подаче иска на сумму до 1 млн ₽';
        break;
      
      case 'divorce':
        dutyAmount = 600;
        discountInfo = 'При взаимном согласии развод через ЗАГС — 650 ₽';
        break;
      
      case 'divorce_property':
        dutyAmount = 600 + Math.min(60000, Math.max(400, claimAmount * 0.005));
        discountInfo = 'Если имущество не подлежит оценке — 600 ₽ + 400 ₽';
        break;
      
      case 'alimony':
        dutyAmount = 0; // Алименты освобождены от госпошлины
        discountInfo = 'Иски о взыскании алиментов не облагаются госпошлиной (подаётся заявителем)';
        break;
      
      case 'notary':
        dutyAmount = 500; // Базовая ставка
        discountInfo = 'Заверение копий — 100 ₽ за страницу, доверенность — от 500 ₽';
        break;
      
      case 'passport':
        dutyAmount = 5000; // Загранпаспорт нового поколения
        discountInfo = 'Паспорт старого поколения — 2000 ₽, оформление через Госуслуги — скидка 30%';
        break;
      
      case 'registration_ip':
        dutyAmount = 0; // Бесплатно через налоговую или Госуслуги
        discountInfo = 'Регистрация ИП бесплатна при подаче через Госуслуги или налоговую инспекцию';
        break;
      
      case 'registration_ooo':
        dutyAmount = 4000; // Регистрация ООО
        discountInfo = 'При подаче через Госуслуги — скидка 30% (2800 ₽)';
        break;
    }
    
    return [
      { value: dutyAmount.toFixed(2), label: 'Размер госпошлины', unit: '₽' },
      { value: discountInfo, label: 'Информация о льготах', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите тип услуги и укажите сумму иска (если применимо). Калькулятор рассчитает размер госпошлины согласно Налоговому кодексу РФ.',
    about: 'Госпошлина — сбор, взимаемый при подаче заявлений в суд, органы ЗАГСа, нотариальные конторы и другие государственные органы.',
    usage: 'Используется для расчёта размера государственной пошлины при подаче исковых заявлений, регистрации бизнеса, получении документов.',
    formula: 'Расчёт по шкале: до 20 000 — 4%, от 20 000 до 100 000 — 800 + 3%, и т.д.',
    faq: [
      {
        question: 'Какие категории граждан освобождаются от госпошлины?',
        answer: 'Инвалиды I-II группы, пенсионеры, ветераны ВОВ, истцы по алиментам, защите прав потребителей (до 1 млн ₽).'
      },
      {
        question: 'Можно ли вернуть госпошлину?',
        answer: 'Да, если иск был отозван до начала рассмотрения или дело прекращено. Необходимо подать заявление о возврате.'
      },
      {
        question: 'Есть ли скидка при подаче через Госуслуги?',
        answer: 'Да, при подаче многих заявлений через Госуслуги предоставляется скидка 30% на госпошлину.'
      }
    ],
    sources: [
      { title: 'НК РФ Статья 333.19. Размеры государственной пошлины', url: 'https://www.consultant.ru/document/cons_doc_LAW_19671/6b5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5/' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Калькулятор алиментов
export const alimonyCalculator: Calculator = {
  id: 'alimony-calculator',
  slug: 'kalkulyator-alimentov',
  title: 'Калькулятор алиментов',
  description: 'Расчёт размера алиментов на ребёнка по долям или в твёрдой сумме',
  category: 'finansy',
  subcategory: 'yuridicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'calculationType',
      label: 'Способ расчёта',
      type: 'select',
      options: [
        { value: 'percentage', label: 'Доля от зарплаты (%)' },
        { value: 'fixed', label: 'Твёрдая сумма' },
        { value: 'minimum', label: 'Минимальный размер' }
      ],
      defaultValue: 'percentage'
    },
    {
      name: 'parentSalary',
      label: 'Зарплата родителя',
      type: 'number',
      placeholder: '50000',
      defaultValue: 50000,
      min: 0,
      unit: '₽'
    },
    {
      name: 'childrenCount',
      label: 'Количество детей',
      type: 'select',
      options: [
        { value: '1', label: '1 ребёнок (25%)' },
        { value: '2', label: '2 детей (33%)' },
        { value: '3', label: '3 и более детей (50%)' }
      ],
      defaultValue: '1'
    },
    {
      name: 'fixedAmount',
      label: 'Твёрдая сумма алиментов',
      type: 'number',
      placeholder: '15000',
      defaultValue: 15000,
      min: 0,
      unit: '₽'
    },
    {
      name: 'region',
      label: 'Регион для расчёта прожиточного минимума',
      type: 'select',
      options: [
        { value: 'moscow', label: 'Москва' },
        { value: 'spb', label: 'Санкт-Петербург' },
        { value: 'regional', label: 'Другой регион (~16000 ₽)' }
      ],
      defaultValue: 'regional'
    }
  ],
  outputs: [
    { name: 'alimonyAmount', label: 'Размер алиментов', type: 'number', unit: '₽' },
    { name: 'afterTaxSalary', label: 'Зарплата после НДФЛ', type: 'number', unit: '₽' },
    { name: 'remainingAmount', label: 'Остаётся у родителя', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const calculationType = String(inputs.calculationType);
    const parentSalary = Number(inputs.parentSalary);
    const childrenCount = Number(inputs.childrenCount);
    const fixedAmount = Number(inputs.fixedAmount);
    const region = String(inputs.region);
    
    if (!parentSalary && calculationType !== 'fixed') {
      return [{ value: '—', label: 'Результат' }];
    }
    
    let alimonyAmount = 0;
    let afterTaxSalary = 0;
    
    if (calculationType === 'percentage') {
      // Расчёт доли от зарплаты
      afterTaxSalary = parentSalary * 0.87; // После НДФЛ
      alimonyAmount = afterTaxSalary * (childrenCount / 100);
    } else if (calculationType === 'fixed') {
      // Твёрдая сумма
      afterTaxSalary = parentSalary * 0.87;
      alimonyAmount = fixedAmount;
    } else if (calculationType === 'minimum') {
      // Минимальный размер = 50% от прожиточного минимума ребёнка
      let subsistenceMin = 16000; // Базовое значение
      if (region === 'moscow') subsistenceMin = 20000;
      if (region === 'spb') subsistenceMin = 18000;
      
      afterTaxSalary = parentSalary * 0.87;
      alimonyAmount = subsistenceMin * 0.5; // Половина ПМ
    }
    
    const remainingAmount = afterTaxSalary - alimonyAmount;
    
    return [
      { value: alimonyAmount.toFixed(2), label: 'Размер алиментов', unit: '₽' },
      { value: afterTaxSalary.toFixed(2), label: 'Зарплата после НДФЛ', unit: '₽' },
      { value: remainingAmount.toFixed(2), label: 'Остаётся у родителя', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Выберите способ расчёта: доля от зарплаты, твёрдая сумма или минимальный размер. Введите зарплату родителя и количество детей.',
    about: 'Алименты на содержание детей могут начисляться в процентах от заработка (25% на 1-го, 33% на 2-х, 50% на 3-х и более), твёрдой суммой или иным способом.',
    usage: 'Используется для расчёта размера алиментов при заключении соглашения или подготовке искового заявления.',
    formula: 'Доля от зарплаты: ЗП × 0.87 × Процент. Твёрдая сумма: фиксированная сумма.',
    faq: [
      {
        question: 'Какие проценты алиментов установлены законом?',
        answer: 'На 1 ребёнка — 25%, на 2 детей — 33%, на 3 и более — 50% от заработка родителя.'
      },
      {
        question: 'Можно ли установить алименты в твёрдой сумме?',
        answer: 'Да, если родитель имеет нерегулярный доход, получает доход в валюте или натуральной форме.'
      },
      {
        question: 'С какого момента начисляются алименты?',
        answer: 'При наличии соглашения — с даты, указанной в соглашении. При судебном решении — с даты подачи иска.'
      }
    ],
    sources: [
      { title: 'Семейный кодекс РФ — статья 81. Размеры алиментов', url: 'https://www.consultant.ru/document/cons_doc_LAW_8982/6b5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5/' }
    ],
    updatedAt: '2026-04-27'
  }
};

// Калькулятор НДФЛ
export const ndflCalculator: Calculator = {
  id: 'ndfl-calculator',
  slug: 'kalkulyator-ndfl',
  title: 'Калькулятор НДФЛ',
  description: 'Расчёт налога на доходы физических лиц (13%, 15%)',
  category: 'finansy',
  subcategory: 'nalogi',
  type: 'formula',
  inputs: [
    {
      name: 'incomeAmount',
      label: 'Сумма дохода',
      type: 'number',
      placeholder: '100000',
      defaultValue: 100000,
      min: 0,
      unit: '₽'
    },
    {
      name: 'incomeType',
      label: 'Тип дохода',
      type: 'select',
      options: [
        { value: 'salary', label: 'Зарплата (13%)' },
        { value: 'dividends', label: 'Дивиденды (13%)' },
        { value: 'high_income', label: 'Доход свыше 5 млн ₽ в год (15%)' },
        { value: 'foreign', label: 'Доход нерезидента (30%)' },
        { value: 'winnings', label: 'Выигрыши и призы (35%)' }
      ],
      defaultValue: 'salary'
    },
    {
      name: 'hasDeductions',
      label: 'Учитывать вычеты',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'deductionAmount',
      label: 'Сумма вычетов',
      type: 'number',
      placeholder: '0',
      defaultValue: 0,
      min: 0,
      unit: '₽'
    }
  ],
  outputs: [
    { name: 'taxableIncome', label: 'Налогооблагаемый доход', type: 'number', unit: '₽' },
    { name: 'ndflAmount', label: 'Сумма НДФЛ', type: 'number', unit: '₽' },
    { name: 'netIncome', label: 'Доход на руки', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const incomeAmount = Number(inputs.incomeAmount);
    const incomeType = String(inputs.incomeType);
    const hasDeductions = Boolean(inputs.hasDeductions);
    const deductionAmount = Number(inputs.deductionAmount);
    
    if (!incomeAmount) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Ставки НДФЛ
    let taxRate = 0.13; // Базовая ставка
    switch (incomeType) {
      case 'high_income':
        taxRate = 0.15;
        break;
      case 'foreign':
        taxRate = 0.30;
        break;
      case 'winnings':
        taxRate = 0.35;
        break;
    }
    
    // Расчёт с учётом вычетов
    let taxableIncome = incomeAmount;
    if (hasDeductions) {
      taxableIncome = Math.max(0, incomeAmount - deductionAmount);
    }
    
    // Для высоких доходов (свыше 5 млн) применяется прогрессивная шкала
    let ndflAmount = 0;
    if (incomeType === 'high_income' && incomeAmount > 5000000) {
      // Первые 5 млн — 13%, всё что свыше — 15%
      ndflAmount = 5000000 * 0.13 + (taxableIncome - 5000000) * 0.15;
    } else {
      ndflAmount = taxableIncome * taxRate;
    }
    
    const netIncome = incomeAmount - ndflAmount;
    
    return [
      { value: taxableIncome.toFixed(2), label: 'Налогооблагаемый доход', unit: '₽' },
      { value: ndflAmount.toFixed(2), label: 'Сумма НДФЛ', unit: '₽' },
      { value: netIncome.toFixed(2), label: 'Доход на руки', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите сумму дохода, выберите тип и укажите вычеты (если есть). Калькулятор рассчитает сумму НДФЛ по текущим ставкам.',
    about: 'НДФЛ (налог на доходы физических лиц) — прямой федеральный налог. Ставка зависит от типа дохода и его размера.',
    usage: 'Используется для расчёта чистого дохода после налогов, планирования бюджета.',
    formula: 'НДФЛ = Доход × Ставка - Вычеты. Ставки: 13% — основная, 15% — доход свыше 5 млн ₽.',
    faq: [
      {
        question: 'Какие ставки НДФЛ существуют?',
        answer: '13% — основная ставка для резидентов РФ, 15% — для доходов свыше 5 млн ₽ в год, 30% — для нерезидентов, 35% — для выигрышей.'
      },
      {
        question: 'Какие налоговые вычеты можно применить?',
        answer: 'Стандартные (на детей, на себя), социальные (лечение, обучение), имущественные (при покупке жилья), инвестиционные.'
      },
      {
        question: 'Кто считается налоговым резидентом?',
        answer: 'Физическое лицо, находящееся в РФ более 183 календарных дней в течение 12 месяцев подряд.'
      }
    ],
    sources: [
      { title: 'НК РФ Глава 23. Налог на доходы физических лиц', url: 'https://www.consultant.ru/document/cons_doc_LAW_19671/6b5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5/' }
    ],
    updatedAt: '2026-04-27'
  }
};

export const russianFinanceCalculators: Calculator[] = [
  vacationCalculator,
  maternityCalculator,
  pensionCalculator,
  penalty395Calculator,
  stateDutyCalculator,
  alimonyCalculator,
  ndflCalculator
];
