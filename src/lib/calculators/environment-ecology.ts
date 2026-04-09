import type { Calculator } from '../types';

export const environmentEcologyCalculators: Calculator[] = [
  {
    id: 'carbon-footprint-calculator',
    slug: 'carbon-footprint-calculator',
    title: 'Калькулятор углеродного следа',
    description: 'Рассчитайте свой годовой углеродный след',
    category: 'environment',
    subcategory: 'eco-lifestyle',
    type: 'formula',
    inputs: [
      {
        name: 'carKm',
        label: 'Километров на машине в год',
      type: 'number', min: 0
      },
      {
        name: 'electricity',
        label: 'Электроэнергия в месяц',
      type: 'number', min: 0
      },
      {
        name: 'flights',
        label: 'Авиаперелётов в год',
      type: 'number', min: 0
      },
      {
        name: 'meatConsumption',
        label: 'Потребление мяса',
        type: 'select',
                options: [
          { value: 'vegan', label: 'Веган' },
          { value: 'vegetarian', label: 'Вегетарианец' },
          { value: 'low', label: 'Редко (1-2 раза/нед)' },
          { value: 'medium', label: 'Средне (3-5 раз/нед)' },
          { value: 'high', label: 'Каждый день' }
        ]
      }
    ],
    outputs: [
      {
        name: 'totalFootprint',
        label: 'Годовой углеродный след',
      type: 'number',
      unit: 'тонн CO₂'
      },
      {
        name: 'transport',
        label: 'Транспорт',
      type: 'number',
      unit: 'тонн CO₂'
      },
      {
        name: 'home',
        label: 'Дом',
      type: 'number',
      unit: 'тонн CO₂'
      },
      {
        name: 'diet',
        label: 'Питание',
      type: 'number',
      unit: 'тонн CO₂'
      },
      {
        name: 'comparison',
        label: 'Относительно среднего',
      type: 'number',
      unit: '%'
      }
    ],
    calculate: (inputs): any => {
      const carKm = Number(inputs.carKm);
      const electricity = Number(inputs.electricity);
      const flights = Number(inputs.flights);
      const meatConsumption = String(inputs.meatConsumption);
      const carEmission = carKm * 0.00012; // ~120г CO2/км
      const electricityEmission = electricity * 12 * 0.0005; // ~500г/кВт⋅ч
      const flightEmission = flights * 1.5; // средний перелёт

      const dietEmissions: Record<string, number> = {
        vegan: 1,
        vegetarian: 1.5,
        low: 2,
        medium: 2.5,
        high: 3.5
      };

      const transport = carEmission + flightEmission;
      const home = electricityEmission;
      const diet = dietEmissions[meatConsumption];

      const totalFootprint = transport + home + diet;
      const comparison = Math.round((totalFootprint / 5) * 100); // средний след ~5 тонн

      return [
        { value: Math.round(totalFootprint * 10) / 10, label: 'Годовой углеродный след', unit: 'тонн CO₂' },
        { value: Math.round(transport * 10) / 10, label: 'Транспорт', unit: 'тонн CO₂' },
        { value: Math.round(home * 10) / 10, label: 'Дом', unit: 'тонн CO₂' },
        { value: Math.round(diet * 10) / 10, label: 'Питание', unit: 'тонн CO₂' },
        { value: comparison, label: 'Относительно среднего', unit: '%' }
      ];
    },
    content: {
      howTo: `Для расчёта углеродного следа:
1. Оцените пробег автомобиля
2. Укажите расход электроэнергии
3. Посчитайте авиаперелёты
4. Укажите диету`,
      about: `Средний углеродный след в России ~10 тонн CO₂/год, в мире ~5 тонн. Для борьбы с изменением климата нужно снизить до 2-3 тонн.`,
      formula: `Углеродный след = Σ (Активность × Коэффициент эмиссии)`,
      faq: [
        {
          question: 'Как снизить углеродный след?',
          answer: 'Меньше летать, использовать общественный транспорт, экономить электроэнергию, сократить потребление мяса.'
        }
      ],
      sources: [
        { title: 'carbonfootprint.com', url: 'https://www.carbonfootprint.com/calculator.aspx' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'waste-sorting-calculator',
    slug: 'waste-sorting-calculator',
    title: 'Калькулятор раздельного сбора',
    description: 'Рассчитайте, сколько отходов вы можете переработать',
    category: 'environment',
    subcategory: 'eco-lifestyle',
    type: 'formula',
    inputs: [
      {
        name: 'householdSize',
        label: 'Количество человек',
      type: 'number',
                min: 1,
        max: 10
      },
      {
        name: 'plasticBottles',
        label: 'Пластиковых бутылок в неделю',
      type: 'number', min: 0
      },
      {
        name: 'paper',
        label: 'Бумаги/картона в неделю',
      type: 'number', min: 0
      },
      {
        name: 'glass',
        label: 'Стекла в месяц',
      type: 'number', min: 0
      }
    ],
    outputs: [
      {
        name: 'recyclablePercent',
        label: 'Процент переработки',
      type: 'number',
      unit: '%'
      },
      {
        name: 'co2Saved',
        label: 'CO₂ сэкономлено',
      type: 'number',
      unit: 'кг/год'
      },
      {
        name: 'treesSaved',
        label: 'Деревьев эквивалент',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'landfillSaved',
        label: 'Не попало на свалку',
      type: 'number',
      unit: 'кг/год'
      }
    ],
    calculate: (inputs): any => {
      const plasticBottles = Number(inputs.plasticBottles);
      const paper = Number(inputs.paper);
      const glass = Number(inputs.glass);
      const yearlyBottles = plasticBottles * 52;
      const yearlyPaper = paper * 52;
      const yearlyGlass = glass * 12;

      const totalWaste = yearlyBottles * 0.05 + yearlyPaper + yearlyGlass; // бутылка ~50г
      const recyclable = yearlyPaper + yearlyGlass + yearlyBottles * 0.05;

      const recyclablePercent = Math.round((recyclable / totalWaste) * 100);
      const co2Saved = Math.round(recyclable * 2.5); // ~2.5 кг CO2 на кг переработанного
      const treesSaved = Math.round(yearlyPaper / 10); // ~10 кг бумаги = 1 дерево
      const landfillSaved = Math.round(recyclable);

      return [
        { value: recyclablePercent, label: 'Процент переработки', unit: '%' },
        { value: co2Saved, label: 'CO₂ сэкономлено', unit: 'кг/год' },
        { value: treesSaved, label: 'Деревьев эквивалент', unit: 'шт' },
        { value: landfillSaved, label: 'Не попало на свалку', unit: 'кг/год' }
      ];
    },
    content: {
      howTo: `Для расчёта:
1. Укажите размер семьи
2. Оцените количество пластика
3. Укажите бумагу и стекло
4. Получите статистику переработки`,
      about: `В России перерабатывается только ~5-7% отходов. Раздельный сбор может значительно снизить нагрузку на свалки.`,
      formula: `Переработка = Перерабатываемые отходы / Общие отходы`,
      faq: [],
      sources: [
        { title: 'РазДельный Сбор', url: 'https://razdelnyisbor.ru' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'water-footprint-calculator',
    slug: 'water-footprint-calculator',
    title: 'Калькулятор водного следа',
    description: 'Рассчитайте прямое и косвенное потребление воды',
    category: 'environment',
    subcategory: 'eco-lifestyle',
    type: 'formula',
    inputs: [
      {
        name: 'showerMinutes',
        label: 'Душ в день',
      type: 'number', min: 0
      },
      {
        name: 'bathsPerWeek',
        label: 'Ванна в неделю',
      type: 'number', min: 0
      },
      {
        name: 'toiletFlushes',
        label: 'Смывов в день',
      type: 'number', min: 0
      },
      {
        name: 'meat',
        label: 'Потребление мяса',
        type: 'select',
                options: [
          { value: 'none', label: 'Не ем мясо' },
          { value: 'rarely', label: '1-2 раза в неделю' },
          { value: 'regular', label: 'Ежедневно' }
        ]
      }
    ],
    outputs: [
      {
        name: 'directWater',
        label: 'Прямое потребление',
      type: 'number',
      unit: 'л/день'
      },
      {
        name: 'indirectWater',
        label: 'Косвенное потребление',
      type: 'number',
      unit: 'л/день'
      },
      {
        name: 'totalFootprint',
        label: 'Общий водный след',
      type: 'number',
      unit: 'л/день'
      }
    ],
    calculate: (inputs): any => {
      const showerMinutes = Number(inputs.showerMinutes);
      const bathsPerWeek = Number(inputs.bathsPerWeek);
      const toiletFlushes = Number(inputs.toiletFlushes);
      const meat = String(inputs.meat);
      const shower = showerMinutes * 12; // ~12 л/мин
      const baths = bathsPerWeek * 150 / 7; // ~150 л ванна
      const toilet = toiletFlushes * 6; // ~6 л смыв
      const other = 50; // быт

      const directWater = Math.round(shower + baths + toilet + other);

      const meatWater: Record<string, number> = {
        none: 500,
        rarely: 1500,
        regular: 4000
      };

      const indirectWater = meatWater[meat];
      const totalFootprint = directWater + indirectWater;

      return [
        { value: directWater, label: 'Прямое потребление', unit: 'л/день' },
        { value: indirectWater, label: 'Косвенное потребление', unit: 'л/день' },
        { value: totalFootprint, label: 'Общий водный след', unit: 'л/день' }
      ];
    },
    content: {
      howTo: `Для расчёта водного следа:
1. Оцените время в душе
2. Укажите частоту принятия ванны
3. Посчитайте смывы
4. Укажите потребление мяса (самое "водозатратное")`,
      about: `Производство 1 кг говядины требует ~15,000 литров воды. Косвенное потребление часто в десятки раз превышает прямое.`,
      formula: `Водный след = Прямое + Косвенное потребление`,
      faq: [],
      sources: [
        { title: 'waterfootprint.org', url: 'https://www.waterfootprint.org' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'solar-calculator',
    slug: 'solar-calculator',
    title: 'Калькулятор солнечных панелей',
    description: 'Рассчитайте мощность и окупаемость солнечной станции',
    category: 'environment',
    subcategory: 'energy',
    type: 'formula',
    inputs: [
      {
        name: 'monthlyBill',
        label: 'Счёт за электроэнергию',
      type: 'number', min: 0
      },
      {
        name: 'tariff',
        label: 'Тариф за кВт⋅ч',
      type: 'number', min: 1,
        defaultValue: 5.5
      },
      {
        name: 'sunHours',
        label: 'Солнечных часов в день',
      type: 'number', min: 1,
        max: 12,
        defaultValue: 4
      },
      {
        name: 'roofArea',
        label: 'Доступная площадь крыши',
      type: 'number', min: 10
      }
    ],
    outputs: [
      {
        name: 'systemSize',
        label: 'Мощность станции',
      type: 'number',
      unit: 'кВт'
      },
      {
        name: 'panelsNeeded',
        label: 'Количество панелей',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'annualGeneration',
        label: 'Годовая выработка',
      type: 'number',
      unit: 'кВт⋅ч'
      },
      {
        name: 'totalCost',
        label: 'Стоимость установки',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'paybackYears',
        label: 'Окупаемость',
      type: 'number',
      unit: 'лет'
      }
    ],
    calculate: (inputs): any => {
      const monthlyBill = Number(inputs.monthlyBill);
      const tariff = Number(inputs.tariff);
      const sunHours = Number(inputs.sunHours);
      const monthlyKwh = monthlyBill / tariff;
      const systemSize = Math.ceil(monthlyKwh / 30 / sunHours);
      const panelsNeeded = Math.ceil(systemSize * 1000 / 550); // панель ~550 Вт
      const annualGeneration = Math.round(systemSize * sunHours * 365 * 0.75); // КПД ~75%

      const costPerWatt = 60; // ~60₽/Вт
      const totalCost = Math.round(systemSize * 1000 * costPerWatt);
      const annualSavings = annualGeneration * tariff;
      const paybackYears = Math.round(totalCost / annualSavings * 10) / 10;

      return [
        { value: systemSize, label: 'Мощность станции', unit: 'кВт' },
        { value: panelsNeeded, label: 'Количество панелей', unit: 'шт' },
        { value: annualGeneration, label: 'Годовая выработка', unit: 'кВт⋅ч' },
        { value: totalCost, label: 'Стоимость установки', unit: '₽' },
        { value: paybackYears, label: 'Окупаемость', unit: 'лет' }
      ];
    },
    content: {
      howTo: `Для расчёта солнечной станции:
1. Укажите средний счёт за электроэнергию
2. Введите тариф
3. Укажите среднее количество солнечных часов (в России ~3-5)
4. Учтите доступную площадь`,
      about: `Солнечные панели в среднем окупаются за 5-8 лет и работают 25+ лет. Экономия зависит от региона и тарифов.`,
      formula: `Мощность = Потребление / (Солнечные часы × КПД)`,
      faq: [
        {
          question: 'Выгодно ли в России?',
          answer: 'В южных регионах (Краснодар, Крым) окупаемость 5-7 лет. В северных может быть 10+ лет.'
        }
      ],
      sources: [
        { title: 'Солнечная Энергетика', url: 'https://sunenergy.ru' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'energy-efficiency-calculator',
    slug: 'energy-efficiency-calculator',
    title: 'Калькулятор энергоэффективности',
    description: 'Рассчитайте экономию от энергоэффективных решений',
    category: 'environment',
    subcategory: 'energy',
    type: 'formula',
    inputs: [
      {
        name: 'bulbsCount',
        label: 'Лампочек в квартире',
      type: 'number', min: 1
      },
      {
        name: 'hoursPerDay',
        label: 'Среднее время работы',
      type: 'number', min: 1,
        max: 24
      },
      {
        name: 'tariff',
        label: 'Тариф за кВт⋅ч',
      type: 'number', min: 1,
        defaultValue: 5.5
      },
      {
        name: 'ledUpgrade',
        label: 'Переход на LED',
        type: 'boolean',
        defaultValue: true
      }
    ],
    outputs: [
      {
        name: 'currentCost',
        label: 'Текущие расходы',
      type: 'number',
      unit: '₽/мес'
      },
      {
        name: 'ledCost',
        label: 'С LED лампами',
      type: 'number',
      unit: '₽/мес'
      },
      {
        name: 'monthlySavings',
        label: 'Экономия в месяц',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'annualSavings',
        label: 'Экономия в год',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'co2Reduction',
        label: 'Снижение CO₂',
      type: 'number',
      unit: 'кг/год'
      }
    ],
    calculate: (inputs): any => {
      const bulbsCount = Number(inputs.bulbsCount);
      const hoursPerDay = Number(inputs.hoursPerDay);
      const tariff = Number(inputs.tariff);
      const ledUpgrade = Boolean(inputs.ledUpgrade);
      const incandescentPower = 0.06; // 60W
      const ledPower = 0.009; // 9W

      const currentMonthly = bulbsCount * incandescentPower * hoursPerDay * 30 * tariff;
      const ledMonthly = bulbsCount * ledPower * hoursPerDay * 30 * tariff;

      const monthlySavings = ledUpgrade ? Math.round(currentMonthly - ledMonthly) : 0;
      const annualSavings = monthlySavings * 12;
      const co2Reduction = Math.round(monthlySavings * 12 * 0.5); // ~0.5 кг CO2 на кВт⋅ч

      return [
        { value: Math.round(currentMonthly), label: 'Текущие расходы', unit: '₽/мес' },
        { value: Math.round(ledMonthly), label: 'С LED лампами', unit: '₽/мес' },
        { value: monthlySavings, label: 'Экономия в месяц', unit: '₽' },
        { value: annualSavings, label: 'Экономия в год', unit: '₽' },
        { value: co2Reduction, label: 'Снижение CO₂', unit: 'кг/год' }
      ];
    },
    content: {
      howTo: `Для расчёта экономии:
1. Посчитайте лампочки в квартире
2. Оцените среднее время работы
3. Укажите тариф
4. Сравните текущие расходы с LED`,
      about: `LED лампы потребляют в 6-8 раз меньше электроэнергии и служат в 10-20 раз дольше ламп накаливания.`,
      formula: `Экономия = (P_старая - P_LED) × Часы × Тариф`,
      faq: [],
      sources: [
        { title: 'Энергосбережение', url: 'https://energosave.ru' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'compost-eco-calculator',
    slug: 'compost-calculator',
    title: 'Калькулятор компостирования',
    description: 'Рассчитайте, сколько удобрений вы получите из органики',
    category: 'environment',
    subcategory: 'garden-eco',
    type: 'formula',
    inputs: [
      {
        name: 'householdSize',
        label: 'Количество человек',
      type: 'number',
                min: 1,
        max: 10
      },
      {
        name: 'foodWaste',
        label: 'Пищевых отходов в неделю',
      type: 'number', min: 0
      },
      {
        name: 'yardWaste',
        label: 'Садовых отходов в месяц',
      type: 'number', min: 0
      },
      {
        name: 'compostMethod',
        label: 'Способ компостирования',
        type: 'select',
                options: [
          { value: 'pile', label: 'Куча' },
          { value: 'bin', label: 'Компостер' },
          { value: 'tumbler', label: 'Барабан' },
          { value: 'vermicompost', label: 'Вермикомпостинг' }
        ]
      }
    ],
    outputs: [
      {
        name: 'yearlyInput',
        label: 'Входящий материал',
      type: 'number',
      unit: 'кг/год'
      },
      {
        name: 'compostYield',
        label: 'Выход компоста',
      type: 'number',
      unit: 'кг/год'
      },
      {
        name: 'fertilizerValue',
        label: 'Эквивалент удобрений',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'landfillDiverted',
        label: 'Не попало на свалку',
      type: 'number',
      unit: 'кг/год'
      },
      {
        name: 'readyTime',
        label: 'Время созревания',
      type: 'number',
      unit: 'мес'
      }
    ],
    calculate: (inputs): any => {
      const foodWaste = Number(inputs.foodWaste);
      const yardWaste = Number(inputs.yardWaste);
      const compostMethod = String(inputs.compostMethod);
      const yearlyInput = foodWaste * 52 + yardWaste * 12;

      const efficiencyRates: Record<string, number> = {
        pile: 0.2,
        bin: 0.25,
        tumbler: 0.3,
        vermicompost: 0.35
      };

      const compostYield = Math.round(yearlyInput * efficiencyRates[compostMethod]);
      const fertilizerValue = Math.round(compostYield * 50); // ~50₽ за кг готового компоста
      const landfillDiverted = Math.round(yearlyInput);

      const readyTimes: Record<string, number> = {
        pile: 12,
        bin: 8,
        tumbler: 4,
        vermicompost: 3
      };

      return [
        { value: yearlyInput, label: 'Входящий материал', unit: 'кг/год' },
        { value: compostYield, label: 'Выход компоста', unit: 'кг/год' },
        { value: fertilizerValue, label: 'Эквивалент удобрений', unit: '₽' },
        { value: landfillDiverted, label: 'Не попало на свалку', unit: 'кг/год' },
        { value: readyTimes[compostMethod], label: 'Время созревания', unit: 'мес' }
      ];
    },
    content: {
      howTo: `Для расчёта компостирования:
1. Укажите размер семьи
2. Оцените пищевые отходы
3. Учтите садовые отходы
4. Выберите способ компостирования`,
      about: `При правильном компостировании до 30% отходов превращается в ценное органическое удобрение.`,
      formula: `Выход = Вход × Коэффициент эффективности`,
      faq: [],
      sources: [
        { title: 'Компостирование', url: 'https://kompost.ru' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'electric-car-savings',
    slug: 'electric-car-savings',
    title: 'Калькулятор экономии электромобиля',
    description: 'Рассчитайте, сколько вы сэкономите на переходе на электромобиль',
    category: 'environment',
    subcategory: 'transport',
    type: 'formula',
    inputs: [
      {
        name: 'monthlyKm',
        label: 'Пробег в месяц',
      type: 'number', min: 100
      },
      {
        name: 'fuelConsumption',
        label: 'Расход бензина',
      type: 'number', min: 3,
        max: 30
      },
      {
        name: 'fuelPrice',
        label: 'Цена бензина',
      type: 'number', min: 30,
        defaultValue: 55
      },
      {
        name: 'electricityPrice',
        label: 'Цена электроэнергии',
      type: 'number', min: 1,
        defaultValue: 5.5
      }
    ],
    outputs: [
      {
        name: 'fuelCost',
        label: 'Расходы на бензин',
      type: 'number',
      unit: '₽/мес'
      },
      {
        name: 'electricityCost',
        label: 'Расходы на электричество',
      type: 'number',
      unit: '₽/мес'
      },
      {
        name: 'monthlySavings',
        label: 'Экономия в месяц',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'annualSavings',
        label: 'Экономия в год',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'co2Savings',
        label: 'Снижение CO₂',
      type: 'number',
      unit: 'кг/год'
      }
    ],
    calculate: (inputs): any => {
      const monthlyKm = Number(inputs.monthlyKm);
      const fuelConsumption = Number(inputs.fuelConsumption);
      const fuelPrice = Number(inputs.fuelPrice);
      const electricityPrice = Number(inputs.electricityPrice);
      const fuelCost = (monthlyKm / 100) * fuelConsumption * fuelPrice;
      const evConsumption = 0.18; // ~18 кВт⋅ч/100км
      const electricityCost = (monthlyKm / 100) * evConsumption * electricityPrice;

      const monthlySavings = Math.round(fuelCost - electricityCost);
      const annualSavings = monthlySavings * 12;
      const co2Savings = Math.round(monthlyKm * 12 * 0.12); // ~120г CO2/км для бензина

      return [
        { value: Math.round(fuelCost), label: 'Расходы на бензин', unit: '₽/мес' },
        { value: Math.round(electricityCost), label: 'Расходы на электричество', unit: '₽/мес' },
        { value: monthlySavings, label: 'Экономия в месяц', unit: '₽' },
        { value: annualSavings, label: 'Экономия в год', unit: '₽' },
        { value: co2Savings, label: 'Снижение CO₂', unit: 'кг/год' }
      ];
    },
    content: {
      howTo: `Для расчёта экономии:
1. Укажите месячный пробег
2. Введите расход текущего авто
3. Укажите цену бензина
4. Введите тариф на электроэнергию`,
      about: `Электромобили в 5-10 раз дешевле в эксплуатации по топливу. Окупаемость зависит от пробега и стоимости электроэнергии.`,
      formula: `Экономия = Затраты_бензин - Затраты_электричество`,
      faq: [
        {
          question: 'Сколько реально сэкономлю?',
          answer: 'При пробеге 2000 км/мес экономия ~8000-12000₽/мес в зависимости от расхода и цен.'
        }
      ],
      sources: [
        { title: 'Электромобили в России', url: 'https://ev-russia.ru' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'eco-score-calculator',
    slug: 'eco-score-calculator',
    title: 'Калькулятор эко-рейтинга',
    description: 'Узнайте, насколько экологичен ваш образ жизни',
    category: 'environment',
    subcategory: 'eco-lifestyle',
    type: 'formula',
    inputs: [
      {
        name: 'transportScore',
        label: 'Транспорт',
        type: 'select',
                options: [
          { value: '3', label: 'В основном пешком/велосипед/ОТ' },
          { value: '2', label: 'Иногда машина' },
          { value: '1', label: 'В основном машина' },
          { value: '0', label: 'Много летаю' }
        ]
      },
      {
        name: 'dietScore',
        label: 'Питание',
        type: 'select',
                options: [
          { value: '3', label: 'Веган/вегетарианец' },
          { value: '2', label: 'Редко ем мясо' },
          { value: '1', label: 'Ем мясо регулярно' },
          { value: '0', label: 'Мясо каждый день' }
        ]
      },
      {
        name: 'wasteScore',
        label: 'Сортировка мусора',
        type: 'select',
                options: [
          { value: '3', label: 'Всё сортирую и компостирую' },
          { value: '2', label: 'Сортирую основное' },
          { value: '1', label: 'Иногда сортирую' },
          { value: '0', label: 'Не сортирую' }
        ]
      },
      {
        name: 'energyScore',
        label: 'Энергосбережение',
        type: 'select',
                options: [
          { value: '3', label: 'LED, экономлю воду, разумно' },
          { value: '2', label: 'Частично энергосберегаю' },
          { value: '1', label: 'Мало внимания этому' },
          { value: '0', label: 'Не думаю об этом' }
        ]
      },
      {
        name: 'consumptionScore',
        label: 'Потребление',
        type: 'select',
                options: [
          { value: '3', label: 'Минимализм, second-hand' },
          { value: '2', label: 'Осознанное потребление' },
          { value: '1', label: 'Среднее потребление' },
          { value: '0', label: 'Много покупаю нового' }
        ]
      }
    ],
    outputs: [
      {
        name: 'totalScore',
        label: 'Общий эко-рейтинг',
      type: 'number',
      unit: '/15'
      },
      {
        name: 'percentage',
        label: 'Процент экологичности',
      type: 'number',
      unit: '%'
      },
      {
        name: 'rating',
        label: 'Оценка',
        type: 'text'
      },
      {
        name: 'improvements',
        label: 'Рекомендации',
        type: 'text'
      }
    ],
    calculate: (inputs): any => {
      const transportScore = parseInt(String(inputs.transportScore));
      const dietScore = parseInt(String(inputs.dietScore));
      const wasteScore = parseInt(String(inputs.wasteScore));
      const energyScore = parseInt(String(inputs.energyScore));
      const consumptionScore = parseInt(String(inputs.consumptionScore));
      const totalScore = transportScore + dietScore + wasteScore + energyScore + consumptionScore;

      const percentage = Math.round((totalScore / 15) * 100);

      let rating;
      let improvements;

      if (totalScore >= 12) {
        rating = 'Эко-герой 🌿';
        improvements = 'Отличный результат! Продолжайте в том же духе.';
      } else if (totalScore >= 8) {
        rating = 'Эко-друг 🌱';
        improvements = 'Хорошо! Есть куда расти в транспорте и энергосбережении.';
      } else if (totalScore >= 4) {
        rating = 'Эко-новичок 🌾';
        improvements = 'Начните с сортировки мусора и замены ламп на LED.';
      } else {
        rating = 'Требуется улучшение 🍂';
        improvements = 'Попробуйте сократить мясо, использовать общественный транспорт, сортировать мусор.';
      }

      return [
        { value: totalScore, label: 'Общий эко-рейтинг', unit: '/15' },
        { value: percentage, label: 'Процент экологичности', unit: '%' },
        { value: rating, label: 'Оценка', unit: '' },
        { value: improvements, label: 'Рекомендации', unit: '' }
      ];
    },
    content: {
      howTo: `Для оценки экологичности:
1. Честно ответьте на вопросы о транспорте
2. Оцените своё питание
3. Укажите, как сортируете мусор
4. Оцените энергосбережение и потребление`,
      about: `Максимум 15 баллов. 12-15 - эко-герой, 8-11 - эко-друг, 4-7 - начинающий, 0-3 - есть над чем работать.`,
      formula: `Сумма баллов по всем категориям`,
      faq: [],
      sources: [
        { title: 'WWF - эко-рейтинг', url: 'https://wwf.ru/eco-score' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'tree-impact-calculator',
    slug: 'tree-impact-calculator',
    title: 'Калькулятор влияния деревьев',
    description: 'Рассчитайте, сколько CO₂ поглощают деревья',
    category: 'environment',
    subcategory: 'nature',
    type: 'formula',
    inputs: [
      {
        name: 'treeType',
        label: 'Тип дерева',
        type: 'select',
                options: [
          { value: 'birch', label: 'Берёза' },
          { value: 'pine', label: 'Сосна' },
          { value: 'oak', label: 'Дуб' },
          { value: 'spruce', label: 'Ель' },
          { value: 'maple', label: 'Клён' }
        ]
      },
      {
        name: 'treeAge',
        label: 'Возраст дерева',
      type: 'number', min: 1,
        max: 200
      },
      {
        name: 'treeCount',
        label: 'Количество деревьев',
      type: 'number', min: 1,
        defaultValue: 1
      }
    ],
    outputs: [
      {
        name: 'co2Absorbed',
        label: 'CO₂ поглощено в год',
      type: 'number',
      unit: 'кг'
      },
      {
        name: 'lifetimeCo2',
        label: 'CO₂ за всю жизнь',
      type: 'number',
      unit: 'кг'
      },
      {
        name: 'oxygenProduced',
        label: 'Кислорода произведено',
      type: 'number',
      unit: 'кг/год'
      },
      {
        name: 'carsEquivalent',
        label: 'Эквивалент авто',
      type: 'number',
      unit: 'шт'
      }
    ],
    calculate: (inputs): any => {
      const treeType = String(inputs.treeType);
      const treeAge = Number(inputs.treeAge);
      const treeCount = Number(inputs.treeCount);
      const absorptionRates: Record<string, number> = {
        birch: 15,
        pine: 22,
        oak: 30,
        spruce: 20,
        maple: 18
      };

      const co2PerYear = absorptionRates[treeType] * (treeAge / 10) * treeCount;
      const lifetimeCo2 = co2PerYear * Math.min(treeAge, 50); // активное поглощение ~50 лет
      const oxygenProduced = Math.round(co2PerYear * 0.7); // ~0.7 кг O2 на кг CO2
      const carsEquivalent = Math.round(co2PerYear / 1200); // ~1200 кг CO2/год от авто

      return [
        { value: Math.round(co2PerYear), label: 'CO₂ поглощено в год', unit: 'кг' },
        { value: Math.round(lifetimeCo2), label: 'CO₂ за всю жизнь', unit: 'кг' },
        { value: oxygenProduced, label: 'Кислорода произведено', unit: 'кг/год' },
        { value: carsEquivalent, label: 'Эквивалент авто', unit: 'шт' }
      ];
    },
    content: {
      howTo: `Для расчёта влияния деревьев:
1. Выберите тип дерева
2. Укажите возраст
3. Введите количество деревьев
4. Получите расчёт поглощения CO₂`,
      about: `Деревья поглощают CO₂ на протяжении жизни. Молодые деревья растут быстрее и поглощают больше.`,
      formula: `CO₂ = Базовая ставка × Возраст × Количество`,
      faq: [
        {
          question: 'Какое дерево лучше всего?',
          answer: 'Дубы и сосны поглощают больше всего CO₂, но любое дерево полезно!'
        }
      ],
      sources: [
        { title: 'Энциклопедия леса', url: 'https://forest-encyclopedia.ru' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'reusable-items-calculator',
    slug: 'reusable-items-calculator',
    title: 'Калькулятор многоразовых вещей',
    description: 'Рассчитайте экономию и снижение отходов от многоразовых предметов',
    category: 'environment',
    subcategory: 'eco-lifestyle',
    type: 'formula',
    inputs: [
      {
        name: 'reusableBottles',
        label: 'Многоразовые бутылки (вместо пластика)',
        type: 'boolean',
        defaultValue: true
      },
      {
        name: 'reusableBags',
        label: 'Многоразовые сумки (вместо пакетов)',
        type: 'boolean',
        defaultValue: true
      },
      {
        name: 'clothNapkins',
        label: 'Тряпочные салфетки (вместо бумажных)',
        type: 'boolean',
        defaultValue: false
      },
      {
        name: 'menstrualCup',
        label: 'Менструальная чаша (вместо тампонов)',
        type: 'boolean',
        defaultValue: false
      },
      {
        name: 'period',
        label: 'Период использования',
        type: 'select',
                options: [
          { value: '1', label: '1 год' },
          { value: '5', label: '5 лет' },
          { value: '10', label: '10 лет' }
        ],
        defaultValue: '5'
      }
    ],
    outputs: [
      {
        name: 'plasticBottlesSaved',
        label: 'Пластиковых бутылок сэкономлено',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'plasticBagsSaved',
        label: 'Пакетов сэкономлено',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'moneySaved',
        label: 'Денег сэкономлено',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'wasteReduced',
        label: 'Отходов не создано',
      type: 'number',
      unit: 'кг'
      }
    ],
    calculate: (inputs): any => {
      const years = parseInt(String(inputs.period));
      const reusableBottles = Boolean(inputs.reusableBottles);
      const reusableBags = Boolean(inputs.reusableBags);

      const bottlesPerYear = reusableBottles ? 365 : 0;
      const bagsPerYear = reusableBags ? 300 : 0;

      const plasticBottlesSaved = bottlesPerYear * years;
      const plasticBagsSaved = bagsPerYear * years;

      const bottleCost = 30; // ₽
      const bagCost = 5; // ₽
      const moneySaved = (bottlesPerYear * bottleCost + bagsPerYear * bagCost) * years;

      const bottleWeight = 0.02; // кг
      const bagWeight = 0.005; // кг
      const wasteReduced = Math.round((plasticBottlesSaved * bottleWeight + plasticBagsSaved * bagWeight));

      return [
        { value: plasticBottlesSaved, label: 'Пластиковых бутылок сэкономлено', unit: 'шт' },
        { value: plasticBagsSaved, label: 'Пакетов сэкономлено', unit: 'шт' },
        { value: moneySaved, label: 'Денег сэкономлено', unit: '₽' },
        { value: wasteReduced, label: 'Отходов не создано', unit: 'кг' }
      ];
    },
    content: {
      howTo: `Для расчёта:
1. Отметьте используемые многоразовые вещи
2. Укажите период использования
3. Получите статистику экономии`,
      about: `Многоразовые предметы не только снижают отходы, но и экономят деньги в долгосрочной перспективе.`,
      formula: `Экономия = Количество × Стоимость × Годы`,
      faq: [],
      sources: [
        { title: 'Zero Waste Russia', url: 'https://zerowaste.ru' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'garden-water-calculator',
    slug: 'garden-water-calculator',
    title: 'Калькулятор полива сада',
    description: 'Рассчитайте оптимальное количество воды для огорода',
    category: 'environment',
    subcategory: 'garden-eco',
    type: 'formula',
    inputs: [
      {
        name: 'gardenArea',
        label: 'Площадь огорода',
      type: 'number', min: 1
      },
      {
        name: 'plantType',
        label: 'Тип растений',
        type: 'select',
                options: [
          { value: 'vegetables', label: 'Овощи' },
          { value: 'flowers', label: 'Цветы' },
          { value: 'lawn', label: 'Газон' },
          { value: 'shrubs', label: 'Кустарники' }
        ]
      },
      {
        name: 'soilType',
        label: 'Тип почвы',
        type: 'select',
                options: [
          { value: 'sandy', label: 'Песчаная (быстро высыхает)' },
          { value: 'loamy', label: 'Суглинистая' },
          { value: 'clay', label: 'Глинистая (держит воду)' }
        ]
      },
      {
        name: 'climate',
        label: 'Климат',
        type: 'select',
                options: [
          { value: 'humid', label: 'Влажный' },
          { value: 'moderate', label: 'Умеренный' },
          { value: 'dry', label: 'Сухой/жаркий' }
        ]
      }
    ],
    outputs: [
      {
        name: 'dailyWater',
        label: 'Воды в день',
      type: 'number',
      unit: 'л'
      },
      {
        name: 'weeklyWater',
        label: 'Воды в неделю',
      type: 'number',
      unit: 'л'
      },
      {
        name: 'monthlyWater',
        label: 'Воды в месяц',
      type: 'number',
      unit: 'м³'
      },
      {
        name: 'rainwaterNeeded',
        label: 'Ёмкость для дождевой воды',
      type: 'number',
      unit: 'л'
      }
    ],
    calculate: (inputs): any => {
      const gardenArea = Number(inputs.gardenArea);
      const plantType = String(inputs.plantType);
      const soilType = String(inputs.soilType);
      const climate = String(inputs.climate);
      const baseNeeds: Record<string, number> = {
        vegetables: 2,
        flowers: 1.5,
        lawn: 2.5,
        shrubs: 1.5
      };

      const soilMultipliers: Record<string, number> = {
        sandy: 1.5,
        loamy: 1,
        clay: 0.7
      };

      const climateMultipliers: Record<string, number> = {
        humid: 0.7,
        moderate: 1,
        dry: 1.5
      };

      const dailyWater = Math.round(gardenArea * baseNeeds[plantType] * soilMultipliers[soilType] * climateMultipliers[climate]);
      const weeklyWater = dailyWater * 7;
      const monthlyWater = Math.round(weeklyWater * 4 / 1000);
      const rainwaterNeeded = Math.round(weeklyWater * 2); // запас на 2 недели

      return [
        { value: dailyWater, label: 'Воды в день', unit: 'л' },
        { value: weeklyWater, label: 'Воды в неделю', unit: 'л' },
        { value: monthlyWater, label: 'Воды в месяц', unit: 'м³' },
        { value: rainwaterNeeded, label: 'Ёмкость для дождевой воды', unit: 'л' }
      ];
    },
    content: {
      howTo: `Для расчёта полива:
1. Укажите площадь огорода
2. Выберите тип растений
3. Укажите тип почвы
4. Учтите климатические условия`,
      about: `Оптимальный полив экономит воду и улучшает здоровье растений. Лучше поливать реже, но обильно.`,
      formula: `Норма = Площадь × Базовая норма × Почва × Климат`,
      faq: [
        {
          question: 'Когда лучше поливать?',
          answer: 'Утром или вечером, чтобы меньше воды испарялось.'
        }
      ],
      sources: [
        { title: 'Сад и огород - полив', url: 'https://sadogorod.ru/watering' }
      ],
      updatedAt: '2026-04-08'
    }
  }
];
