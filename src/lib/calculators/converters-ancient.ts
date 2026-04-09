import { Calculator } from '../types';

// Конвертер древнерусских мер длины
export const ancientRussianLengthConverter: Calculator = {
  id: 'ancient-russian-length',
  slug: 'drevnerusskie-mery-dliny',
  title: 'Древнерусские меры длины',
  description: 'Перевод аршин, вершков, саженей, локтей в современные метры и сантиметры',
  category: 'konvertery',
  subcategory: 'ancient-units',
  type: 'converter',
  inputs: [
    {
      name: 'arshin',
      label: 'Аршин',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'vershok',
      label: 'Вершок',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'sazhen',
      label: 'Сажень',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'lokot',
      label: 'Локоть',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'meters', label: 'Метры', type: 'number', unit: 'м' },
    { name: 'centimeters', label: 'Сантиметры', type: 'number', unit: 'см' },
    { name: 'description', label: 'Описание', type: 'text' }
  ],
  calculate: (inputs) => {
    const arshin = Number(inputs.arshin) || 0;
    const vershok = Number(inputs.vershok) || 0;
    const sazhen = Number(inputs.sazhen) || 0;
    const lokot = Number(inputs.lokot) || 0;
    
    // Ancient Russian units in meters
    const arshinInMeters = 0.7112; // 28 inches
    const vershokInMeters = 0.04445; // 1/16 arshin
    const sazhenInMeters = 2.1336; // 3 arshins
    const lokotInMeters = 0.5334; // 1.5 arshins
    
    const totalMeters = (arshin * arshinInMeters) + (vershok * vershokInMeters) + 
                        (sazhen * sazhenInMeters) + (lokot * lokotInMeters);
    
    let description = '';
    if (totalMeters > 0) {
      description = 'Аршин = 71.12 см (28 дюймов), Вершок = 4.45 см (1/16 аршина), Сажень = 2.13 м (3 аршина), Локоть = 53.34 см';
    }
    
    return [
      { value: Number(totalMeters.toFixed(3)), label: 'Метры', unit: 'м' },
      { value: Number((totalMeters * 100).toFixed(1)), label: 'Сантиметры', unit: 'см' },
      { value: description, label: 'Описание' }
    ];
  },
  content: {
    howTo: 'Введите значения в древнерусских мерах: аршинах, вершках, саженях и локтях. Калькулятор переведёт в метры и сантиметры.',
    about: 'Древнерусские меры длины использовались до введения метрической системы в 1899 году. Аршин — основная единица, равная примерно 71 см.',
    formula: '1 аршин = 71.12 см\n1 вершок = 4.45 см\n1 сажень = 2.13 м\n1 локоть = 53.34 см',
    faq: [
      { question: 'Сколько вершков в аршине?', answer: '16 вершков. Вершок — 1/16 часть аршина (примерно 4.4 см).' },
      { question: 'Что такое "косая сажень"?', answer: 'Косая сажень = 2.48 м — расстояние от пятки одной ноги до конца пальцев другой при разведённых ногах.' }
    ],
    sources: [
      { title: 'Вики - Русские меры длины', url: 'https://ru.wikipedia.org/wiki/Аршин' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер древнерусских мер веса
export const ancientRussianWeightConverter: Calculator = {
  id: 'ancient-russian-weight',
  slug: 'drevnerusskie-mery-vesa',
  title: 'Древнерусские меры веса',
  description: 'Перевод фунтов, пудов, золотников в килограммы и граммы',
  category: 'konvertery',
  subcategory: 'ancient-units',
  type: 'converter',
  inputs: [
    {
      name: 'pud',
      label: 'Пуд',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'funt',
      label: 'Фунт',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'zolotnik',
      label: 'Золотник',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'kilograms', label: 'Килограммы', type: 'number', unit: 'кг' },
    { name: 'grams', label: 'Граммы', type: 'number', unit: 'г' },
    { name: 'description', label: 'Описание', type: 'text' }
  ],
  calculate: (inputs) => {
    const pud = Number(inputs.pud) || 0;
    const funt = Number(inputs.funt) || 0;
    const zolotnik = Number(inputs.zolotnik) || 0;
    
    // Ancient Russian weight units
    const pudInKg = 16.3805;
    const funtInKg = 0.409512;
    const zolotnikInKg = 0.0042658;
    
    const totalKg = (pud * pudInKg) + (funt * funtInKg) + (zolotnik * zolotnikInKg);
    
    let description = '';
    if (totalKg > 0) {
      description = 'Пуд = 16.38 кг (40 фунтов), Фунт = 409.5 г (96 золотников), Золотник = 4.27 г';
    }
    
    return [
      { value: Number(totalKg.toFixed(3)), label: 'Килограммы', unit: 'кг' },
      { value: Number((totalKg * 1000).toFixed(1)), label: 'Граммы', unit: 'г' },
      { value: description, label: 'Описание' }
    ];
  },
  content: {
    howTo: 'Введите значения в пудах, фунтах и золотниках. Калькулятор переведёт в современные килограммы и граммы.',
    about: 'Древнерусские меры веса: пуд — крупная торговая единица (16.38 кг), фунт — основная единица (~409 г), золотник — мелкая единица для драгоценностей (~4.27 г).',
    formula: '1 пуд = 16.3805 кг = 40 фунтов\n1 фунт = 409.512 г = 96 золотников\n1 золотник = 4.2658 г',
    faq: [
      { question: 'Сколько золотников в фунте?', answer: '96 золотников. Золотник использовался для взвешивания золота и драгоценных камней.' },
      { question: 'Что такое "пудовщик"?', answer: 'Пудовщик — должностное лицо, отвечающее за проверку весов и мер на торговых рынках.' }
    ],
    sources: [
      { title: 'Вики - Русские меры веса', url: 'https://ru.wikipedia.org/wiki/Пуд' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер древнерусских мер объёма
export const ancientRussianVolumeConverter: Calculator = {
  id: 'ancient-russian-volume',
  slug: 'drevnerusskie-mery-obema',
  title: 'Древнерусские меры объёма',
  description: 'Перевод вёдер, гарнцев, четвериков, штофов в литры',
  category: 'konvertery',
  subcategory: 'ancient-units',
  type: 'converter',
  inputs: [
    {
      name: 'vedro',
      label: 'Ведро',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'chetverik',
      label: 'Четверик',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'garnec',
      label: 'Гарнец',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'shtof',
      label: 'Штоф',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'liters', label: 'Литры', type: 'number', unit: 'л' },
    { name: 'description', label: 'Описание', type: 'text' }
  ],
  calculate: (inputs) => {
    const vedro = Number(inputs.vedro) || 0;
    const chetverik = Number(inputs.chetverik) || 0;
    const garnec = Number(inputs.garnec) || 0;
    const shtof = Number(inputs.shtof) || 0;
    
    // Ancient Russian volume units in liters
    const vedroInLiters = 12.299;
    const chetverikInLiters = 26.24; // 1/8 chetvert ( quarter barrel)
    const garnecInLiters = 3.28;
    const shtofInLiters = 1.23; // 1/10 vedro
    
    const totalLiters = (vedro * vedroInLiters) + (chetverik * chetverikInLiters) + 
                        (garnec * garnecInLiters) + (shtof * shtofInLiters);
    
    let description = '';
    if (totalLiters > 0) {
      description = 'Ведро = 12.3 л, Четверик = 26.24 л (сухая мера), Гарнец = 3.28 л, Штоф = 1.23 л (для водки)';
    }
    
    return [
      { value: Number(totalLiters.toFixed(2)), label: 'Литры', unit: 'л' },
      { value: description, label: 'Описание' }
    ];
  },
  content: {
    howTo: 'Введите значения в вёдрах, четвериках, гарнцах и штофах. Калькулятор переведёт в литры.',
    about: 'Древнерусские меры объёма использовались для измерения жидкостей и сыпучих тел. Ведро — основная мера для жидкостей, четверик — для зерна.',
    formula: '1 ведро = 12.299 л\n1 четверик = 26.24 л\n1 гарнец = 3.28 л\n1 штоф = 1.23 л',
    faq: [
      { question: 'Сколько штофов в ведре?', answer: '10 штофов. Штоф традиционно использовался для измерения водки (штоф водки).' },
      { question: 'Что такое четверть?', answer: 'Четверть = 209.95 л (мера для зерна, равная 8 четверикам).' }
    ],
    sources: [
      { title: 'Вики - Русские меры объёма', url: 'https://ru.wikipedia.org/wiki/Ведро' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер античных мер
export const ancientGreekRomanConverter: Calculator = {
  id: 'ancient-greek-roman',
  slug: 'antichnye-mery',
  title: 'Античные меры (Греция и Рим)',
  description: 'Перевод стадий, римских миль, пасовов в метры и километры',
  category: 'konvertery',
  subcategory: 'ancient-units',
  type: 'converter',
  inputs: [
    {
      name: 'stadium',
      label: 'Стадии',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'romanMile',
      label: 'Римские мили',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'pes',
      label: 'Пассы (римские футы)',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'cubit',
      label: 'Локти (кубиты)',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'meters', label: 'Метры', type: 'number', unit: 'м' },
    { name: 'kilometers', label: 'Километры', type: 'number', unit: 'км' },
    { name: 'description', label: 'Описание', type: 'text' }
  ],
  calculate: (inputs) => {
    const stadium = Number(inputs.stadium) || 0;
    const romanMile = Number(inputs.romanMile) || 0;
    const pes = Number(inputs.pes) || 0;
    const cubit = Number(inputs.cubit) || 0;
    
    // Ancient units in meters
    const stadiumInMeters = 192.27; // Olympic stadium
    const romanMileInMeters = 1482;
    const pesInMeters = 0.296;
    const cubitInMeters = 0.444; // Egyptian/Greek cubit
    
    const totalMeters = (stadium * stadiumInMeters) + (romanMile * romanMileInMeters) + 
                      (pes * pesInMeters) + (cubit * cubitInMeters);
    
    let description = '';
    if (totalMeters > 0) {
      description = 'Стадий = 192.27 м, Римская миля = 1.482 км (1000 пассов), Пасс = 29.6 см, Кубит = 44.4 см';
    }
    
    return [
      { value: Number(totalMeters.toFixed(2)), label: 'Метры', unit: 'м' },
      { value: Number((totalMeters / 1000).toFixed(3)), label: 'Километры', unit: 'км' },
      { value: description, label: 'Описание' }
    ];
  },
  content: {
    howTo: 'Введите значения в античных единицах: стадиях, римских милях, пассах и кубитах. Калькулятор переведёт в метры.',
    about: 'Античные меры длины: стадий — длина беговой дорожки в Olympia (192 м), римская миля = 1000 двойных шагов (1482 м), кубит — длина предплечья (~44 см).',
    formula: '1 стадий = 192.27 м\n1 римская миля = 1482 м\n1 пасс = 0.296 м\n1 кубит = 0.444 м',
    faq: [
      { question: 'Сколько стадий в марафоне?', answer: 'Марафонская дистанция (42.195 км) ≈ 219 стадий. Древний марафон был около 180 стадий.' },
      { question: 'Почему римская миля не равна современной?', answer: 'Римская миля основана на 1000 двойных шагов (mille passus), а английская — на 8 фurlong.' }
    ],
    sources: [
      { title: 'Ancient Measures', url: 'https://en.wikipedia.org/wiki/Stadion_(unit)' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер английских мер длины (старые)
export const imperialLengthConverter: Calculator = {
  id: 'imperial-length',
  slug: 'angliyskie-mery-dliny',
  title: 'Английские меры длины',
  description: 'Перевод дюймов, футов, ярдов, миль, рыболовных саженей в метры',
  category: 'konvertery',
  subcategory: 'imperial-units',
  type: 'converter',
  inputs: [
    {
      name: 'inches',
      label: 'Дюймы',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'feet',
      label: 'Футы',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'yards',
      label: 'Ярды',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'miles',
      label: 'Мили',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'fathoms',
      label: 'Сажени (fathoms)',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'meters', label: 'Метры', type: 'number', unit: 'м' },
    { name: 'kilometers', label: 'Километры', type: 'number', unit: 'км' },
    { name: 'description', label: 'Описание', type: 'text' }
  ],
  calculate: (inputs) => {
    const inches = Number(inputs.inches) || 0;
    const feet = Number(inputs.feet) || 0;
    const yards = Number(inputs.yards) || 0;
    const miles = Number(inputs.miles) || 0;
    const fathoms = Number(inputs.fathoms) || 0;
    
    // Imperial units in meters
    const inchInMeters = 0.0254;
    const footInMeters = 0.3048;
    const yardInMeters = 0.9144;
    const mileInMeters = 1609.344;
    const fathomInMeters = 1.852;
    
    const totalMeters = (inches * inchInMeters) + (feet * footInMeters) + 
                        (yards * yardInMeters) + (miles * mileInMeters) + 
                        (fathoms * fathomInMeters);
    
    let description = '';
    if (totalMeters > 0) {
      description = '1 дюйм = 2.54 см, 1 фут = 30.48 см, 1 ярд = 91.44 см, 1 миля = 1.609 км, 1 сажень = 1.852 м';
    }
    
    return [
      { value: Number(totalMeters.toFixed(3)), label: 'Метры', unit: 'м' },
      { value: Number((totalMeters / 1000).toFixed(4)), label: 'Километры', unit: 'км' },
      { value: description, label: 'Описание' }
    ];
  },
  content: {
    howTo: 'Введите значения в дюймах, футах, ярдах, милях и рыболовных саженях. Калькулятор переведёт в метрическую систему.',
    about: 'Английские меры длины (имперская система) основаны на эталонах 1824 года. До сих пор используются в США, Великобритании и некоторых других странах.',
    formula: '1 дюйм = 2.54 см\n1 фут = 12 дюймов = 30.48 см\n1 ярд = 3 фута = 91.44 см\n1 миля = 1760 ярдов = 1.609344 км\n1 сажень (fathom) = 6 футов = 1.852 м',
    faq: [
      { question: 'Почему в США до сих пор используют дюймы?', answer: 'Исторические причины, стандартизация оборудования, сопротивление изменениям. Метрическая система принята только в науке.' },
      { question: 'Сколько футов в морской миле?', answer: 'Морская миля = 1852 м = 6076.12 футов. Отличается от сухопутной (5280 футов).' }
    ],
    sources: [
      { title: 'Imperial Units', url: 'https://en.wikipedia.org/wiki/Imperial_units' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер английских мер веса
export const imperialWeightConverter: Calculator = {
  id: 'imperial-weight',
  slug: 'angliyskie-mery-vesa',
  title: 'Английские меры веса',
  description: 'Перевод унций, фунтов, стоунов, квартеров, центнеров в килограммы',
  category: 'konvertery',
  subcategory: 'imperial-units',
  type: 'converter',
  inputs: [
    {
      name: 'ounces',
      label: 'Унции (oz)',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'pounds',
      label: 'Фунты (lb)',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'stones',
      label: 'Стоуны',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'hundredweight',
      label: 'Центнеры (cwt)',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'kilograms', label: 'Килограммы', type: 'number', unit: 'кг' },
    { name: 'grams', label: 'Граммы', type: 'number', unit: 'г' },
    { name: 'description', label: 'Описание', type: 'text' }
  ],
  calculate: (inputs) => {
    const ounces = Number(inputs.ounces) || 0;
    const pounds = Number(inputs.pounds) || 0;
    const stones = Number(inputs.stones) || 0;
    const hundredweight = Number(inputs.hundredweight) || 0;
    
    // Imperial weight units in kilograms
    const ounceInKg = 0.0283495;
    const poundInKg = 0.453592;
    const stoneInKg = 6.35029;
    const cwtInKg = 50.8023; // UK hundredweight
    
    const totalKg = (ounces * ounceInKg) + (pounds * poundInKg) + 
                    (stones * stoneInKg) + (hundredweight * cwtInKg);
    
    let description = '';
    if (totalKg > 0) {
      description = '1 унция = 28.35 г, 1 фунт = 453.59 г, 1 стоун = 6.35 кг, 1 центнер (UK) = 50.8 кг';
    }
    
    return [
      { value: Number(totalKg.toFixed(3)), label: 'Килограммы', unit: 'кг' },
      { value: Number((totalKg * 1000).toFixed(1)), label: 'Граммы', unit: 'г' },
      { value: description, label: 'Описание' }
    ];
  },
  content: {
    howTo: 'Введите значения в унциях, фунтах, стоунах и центнерах. Калькулятор переведёт в килограммы.',
    about: 'Английские меры веса: унция (28.35 г) — основная мера для мелких весов, фунт (453.59 г) — основная единица, стоун (6.35 кг) — для человеческого веса в UK.',
    formula: '1 унция = 28.3495 г\n1 фунт = 16 унций = 453.592 г\n1 стоун = 14 фунтов = 6.35029 кг\n1 центнер (UK) = 8 стоунов = 50.8023 кг',
    faq: [
      { question: 'Что такое стоун?', answer: 'Традиционная британская единица для взвешивания людей. 1 стоун = 14 фунтов ≈ 6.35 кг.' },
      { question: 'Почему фунт называется "pound"?', answer: 'От латинского pondus — вес. Символ lb — от libra (лат. весы).' }
    ],
    sources: [
      { title: 'Imperial Weight Units', url: 'https://en.wikipedia.org/wiki/Pound_(mass)' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер трофейных/ювелирных каратов
export const caratConverter: Calculator = {
  id: 'carat-converter',
  slug: 'konverter-karatov',
  title: 'Конвертер каратов',
  description: 'Перевод между метрическими, тройскими и ювелирными каратами для драгоценных камней и золота',
  category: 'konvertery',
  subcategory: 'precious-units',
  type: 'converter',
  inputs: [
    {
      name: 'metricCarats',
      label: 'Метрические караты (камни)',
      type: 'number',
      placeholder: '1',
      min: 0,
      defaultValue: 1
    },
    {
      name: 'goldPurity',
      label: 'Проба золота (чистота)',
      type: 'select',
      options: [
        { value: '24', label: '24K (999 проба, чистое)' },
        { value: '22', label: '22K (916 проба)' },
        { value: '18', label: '18K (750 проба)' },
        { value: '14', label: '14K (585 проба)' },
        { value: '9', label: '9K (375 проба)' }
      ],
      defaultValue: '18'
    }
  ],
  outputs: [
    { name: 'milligrams', label: 'Миллиграммы', type: 'number', unit: 'мг' },
    { name: 'grams', label: 'Граммы', type: 'number', unit: 'г' },
    { name: 'troyOunce', label: 'Тройские унции', type: 'number', unit: 'oz t' },
    { name: 'goldPercent', label: 'Содержание золота', type: 'number', unit: '%' },
    { name: 'sovietPurity', label: 'Советская проба', type: 'text' }
  ],
  calculate: (inputs) => {
    const metricCarats = Number(inputs.metricCarats) || 0;
    const goldPurity = Number(inputs.goldPurity);
    
    if (!metricCarats) {
      return [
        { value: '—', label: 'Миллиграммы', unit: 'мг' },
        { value: '—', label: 'Граммы', unit: 'г' },
        { value: '—', label: 'Тройские унции', unit: 'oz t' },
        { value: '—', label: 'Содержание золота', unit: '%' },
        { value: '—', label: 'Советская проба' }
      ];
    }
    
    // 1 metric carat = 200 mg
    const milligrams = metricCarats * 200;
    const grams = milligrams / 1000;
    const troyOunce = grams / 31.1035;
    
    const goldPercent = (goldPurity / 24) * 100;
    const sovietPurity = Math.round(goldPercent * 10); // Soviet system: 999 for pure
    
    return [
      { value: milligrams, label: 'Миллиграммы', unit: 'мг' },
      { value: Number(grams.toFixed(3)), label: 'Граммы', unit: 'г' },
      { value: Number(troyOunce.toFixed(4)), label: 'Тройские унции', unit: 'oz t' },
      { value: Math.round(goldPercent), label: 'Содержание золота', unit: '%' },
      { value: `${sovietPurity} проба`, label: 'Советская проба' }
    ];
  },
  content: {
    howTo: 'Введите вес в метрических каратах и выберите пробу золота. Калькулятор переведёт в различные единицы и покажет содержание золота.',
    about: 'Метрический карат (200 мг) используется для драгоценных камней. Каратная проба золота (K) показывает содержание чистого золота: 24K = 100%, 18K = 75%.',
    formula: '1 карат (метрический) = 200 мг = 0.2 г\nЧистота золота = (Караты / 24) × 100%\n1 тройская унция = 31.1035 г',
    faq: [
      { question: 'В чём разница между каратом камней и золота?', answer: 'Для камней карат — единица веса (200 мг). Для золота карат — единица чистоты (1/24 часть).' },
      { question: 'Что такое 585 проба?', answer: 'Советская/российская проба, соответствует 14K (58.5% золота). Самая популярная для украшений.' }
    ],
    sources: [
      { title: 'Carat (mass and purity)', url: 'https://en.wikipedia.org/wiki/Carat' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Конвертер площадей (исторических)
export const historicalAreaConverter: Calculator = {
  id: 'historical-area',
  slug: 'istoricheskie-mery-ploshadi',
  title: 'Исторические меры площади',
  description: 'Перевод десятин, акров, гектаров, аров в квадратные метры',
  category: 'konvertery',
  subcategory: 'ancient-units',
  type: 'converter',
  inputs: [
    {
      name: 'dessiatin',
      label: 'Десятины',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'acre',
      label: 'Акры',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'hectare',
      label: 'Гектары',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    },
    {
      name: 'are',
      label: 'Ары (сотки)',
      type: 'number',
      placeholder: '0',
      min: 0,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'squareMeters', label: 'Квадратные метры', type: 'number', unit: 'м²' },
    { name: 'squareKilometers', label: 'Квадратные километры', type: 'number', unit: 'км²' },
    { name: 'hectares', label: 'В гектарах', type: 'number', unit: 'га' },
    { name: 'comparison', label: 'Сравнение', type: 'text' }
  ],
  calculate: (inputs) => {
    const dessiatin = Number(inputs.dessiatin) || 0;
    const acre = Number(inputs.acre) || 0;
    const hectare = Number(inputs.hectare) || 0;
    const are = Number(inputs.are) || 0;
    
    // Historical area units in square meters
    const dessiatinInM2 = 10925;
    const acreInM2 = 4046.86;
    const hectareInM2 = 10000;
    const areInM2 = 100;
    
    const totalM2 = (dessiatin * dessiatinInM2) + (acre * acreInM2) + 
                    (hectare * hectareInM2) + (are * areInM2);
    
    let comparison = '';
    if (totalM2 > 0) {
      if (totalM2 < 1000) {
        comparison = `Примерно как ${Math.round(totalM2 / 20)} парковочных мест`;
      } else if (totalM2 < 10000) {
        comparison = `Примерно как ${Math.round(totalM2 / 700)} теннисных корта`;
      } else if (totalM2 < 100000) {
        comparison = `Примерно как ${Math.round(totalM2 / 7000)} футбольных полей`;
      } else {
        comparison = `Примерно как ${Math.round(totalM2 / 20000)} гектаров леса`;
      }
    }
    
    return [
      { value: Number(totalM2.toFixed(1)), label: 'Квадратные метры', unit: 'м²' },
      { value: Number((totalM2 / 1000000).toFixed(6)), label: 'Квадратные километры', unit: 'км²' },
      { value: Number((totalM2 / 10000).toFixed(4)), label: 'В гектарах', unit: 'га' },
      { value: comparison, label: 'Сравнение' }
    ];
  },
  content: {
    howTo: 'Введите значения в десятинах, акрах, гектарах и арах (сотках). Калькулятор переведёт в квадратные метры.',
    about: 'Исторические меры площади: десятина — старорусская мера (~1.09 га), акр — английская/американская мера (~0.4 га), гектар — современная метрическая единица (1 га = 10000 м²).',
    formula: '1 десятина = 10925 м² ≈ 1.09 га\n1 акр = 4046.86 м² ≈ 0.405 га\n1 гектар = 10000 м²\n1 ар (сотка) = 100 м²',
    faq: [
      { question: 'Что такое "сотка"?', answer: 'Разговорное название ара — 100 квадратных метров. Стандартный участок 6 соток = 600 м².' },
      { question: 'Сколько гектаров в квадратном километре?', answer: '100 гектаров. 1 км² = 100 га = 10000 соток.' }
    ],
    sources: [
      { title: 'Acre (unit)', url: 'https://en.wikipedia.org/wiki/Acre' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const ancientConvertersCalculators: Calculator[] = [
  ancientRussianLengthConverter,
  ancientRussianWeightConverter,
  ancientRussianVolumeConverter,
  ancientGreekRomanConverter,
  imperialLengthConverter,
  imperialWeightConverter,
  caratConverter,
  historicalAreaConverter
];
