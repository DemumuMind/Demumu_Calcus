import { Calculator } from '../types';
import { mathematicalCalculators } from './math';
import { converterCalculators } from './converters';
import { extendedConverters } from './converters-extended';
import { advancedConverters } from './converters-advanced';
import { healthCalculators } from './health';
import { financeCalculators } from './finance';
import { constructionCalculators } from './construction';
import { constructionMoreCalculators } from './construction-more';
import { areaVolumeCalculators } from './area-volume';
import { timeDateCalculators } from './time-date';
import { digitalCalculators } from './digital';
import { dailyCalculators } from './daily';
import { engineeringCalculators } from './engineering';
import { engineeringMoreCalculators } from './engineering-more';
import { generatorsMoreCalculators } from './generators-more';
import { textCalculators } from './text';
import { colorCalculators } from './color';
import { colorToolsCalculators } from './color-tools';
import { generatorCalculators, passwordGenerator } from './generators';
import { financeAdvancedCalculators } from './finance-advanced';
import { financeMoreCalculators } from './finance-more';
import { transportCalculators } from './transport';
import { geometryCalculators } from './geometry';
import { healthExtendedCalculators } from './health-extended';
import { healthExtendedMoreCalculators } from './health-extended-more';
import { dailyExtendedCalculators } from './daily-extended';
import { mathAdvancedCalculators } from './math-advanced';
import { physicsCalculators } from './physics';
import { technologyCalculators } from './technology';

import { datetimeCalculators } from './datetime';

import { specialConverters } from './converters-special';
import { specialConvertersMore } from './converters-special-more';
import { currencyConverters } from './converters-currency';
import { constructionFinalCalculators } from './construction-final';
import { constructionExtendedCalculators } from './construction-extended';
import { healthMore1Calculators } from './health-more-1';
import { healthMore2Calculators } from './health-more-2';
import { healthMore3Calculators } from './health-more-3';
import { dailyMore1Calculators } from './daily-more-1';
import { dailyMore2Calculators } from './daily-more-2';
import { dailyMore3Calculators } from './daily-more-3';
import { textToolsCalculators } from './text-tools';
import { physicsMoreCalculators } from './physics-more';
import { financeExtendedCalculators } from './finance-extended';
import { sportsFitnessCalculators } from './sports-fitness';
import { moreConvertersCalculators } from './converters-more';
import { hobbiesPhotographyCalculators } from './hobbies-photography';
import { businessMarketingCalculators } from './business-marketing';
import { musicAudioCalculators } from './music-audio';
import { petCareCalculators } from './pet-care';
import { astronomyCalculators } from './converters-astronomy';
import { cookingFoodCalculators } from './cooking-food';
import { homeMaintenanceCalculators } from './home-maintenance';
import { itDevopsCalculators } from './it-devops';
import { ancientConvertersCalculators } from './converters-ancient';
import { travelConvertersCalculators } from './converters-travel';
import { gardeningCalculators } from './hobby-garden';
import { beautyCareCalculators } from './beauty-care';
import { convertersCookingCalculators } from './converters-cooking';
import { fitnessBodybuildingCalculators } from './fitness-bodybuilding';
import { educationLearningCalculators } from './education-learning';
import { diyCraftsCalculators } from './diy-crafts';
import { environmentEcologyCalculators } from './environment-ecology';
import { parentingBabyCalculators } from './parenting-baby';
import { fashionStyleCalculators } from './fashion-style';
import { shoppingDealsCalculators } from './shopping-deals';
import { bmiCalculator, calorieCalculator, mortgageCalculator } from './additional-calculators';

export const simpleCalculator: Calculator = {
  id: 'simple-calculator',
  slug: 'prostoj-kalkulyator',
  title: 'Простой калькулятор',
  description: 'Базовые арифметические операции: сложение, вычитание, умножение, деление',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'arithmetic',
  inputs: [],
  outputs: [],
  calculate: () => [],
  content: {
    howTo: 'Используйте кнопки калькулятора для ввода чисел и операций. Нажмите C для сброса, = для получения результата.',
    about: 'Простой калькулятор для базовых арифметических операций: сложение (+), вычитание (-), умножение (×), деление (÷).',
    usage: 'Подходит для быстрых расчётов в повседневной жизни, учёбе и работе.',
    formula: 'Следуйте стандартным правилам арифметики: сначала умножение и деление, затем сложение и вычитание.',
    faq: [
      {
        question: 'Как сбросить результат?',
        answer: 'Нажмите кнопку C для полного сброса калькулятора.'
      },
      {
        question: 'Можно ли использовать клавиатуру?',
        answer: 'Да, вы можете вводить цифры и операции с клавиатуры.'
      },
      {
        question: 'Какое максимальное число?',
        answer: 'Калькулятор поддерживает числа до 15 значащих цифр.'
      }
    ],
    sources: [
      { title: 'Арифметика — Википедия', url: 'https://ru.wikipedia.org/wiki/Арифметика' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const kmhToMsConverter: Calculator = {
  id: 'kmh-to-ms',
  slug: 'km-ch-v-m-s',
  title: 'Км/ч в м/с',
  description: 'Онлайн конвертер: км/ч в м/с. Быстрый и точный перевод единиц.',
  category: 'konvertery',
  subcategory: 'conv-skorost',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'kmh', label: 'км/ч' },
        { value: 'ms', label: 'м/с' },
        { value: 'mph', label: 'миль/ч' },
        { value: 'knot', label: 'узлы' }
      ],
      defaultValue: 'kmh'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'kmh', label: 'км/ч' },
        { value: 'ms', label: 'м/с' },
        { value: 'mph', label: 'миль/ч' },
        { value: 'knot', label: 'узлы' }
      ],
      defaultValue: 'ms'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) return [{ value: '—', label: 'Результат' }];
    
    let ms = 0;
    switch (from) {
      case 'kmh': ms = value / 3.6; break;
      case 'ms': ms = value; break;
      case 'mph': ms = value * 0.44704; break;
      case 'knot': ms = value * 0.514444; break;
    }
    
    let result = 0;
    switch (to) {
      case 'kmh': result = ms * 3.6; break;
      case 'ms': result = ms; break;
      case 'mph': result = ms / 0.44704; break;
      case 'knot': result = ms / 0.514444; break;
    }
    
    const fromLabel = from === 'kmh' ? 'км/ч' : from === 'ms' ? 'м/с' : from === 'mph' ? 'миль/ч' : 'узлов';
    const toLabel = to === 'kmh' ? 'км/ч' : to === 'ms' ? 'м/с' : to === 'mph' ? 'миль/ч' : 'узлов';
    
    return [{
      value: `${value} ${fromLabel} = ${Math.round(result * 100000) / 100000} ${toLabel}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите значение скорости, выберите единицы измерения "из" и "в". Результат появится автоматически.',
    about: 'Конвертер скорости для перевода между различными единицами измерения: км/ч, м/с, мили/ч, узлы.',
    usage: 'Используется для перевода скорости в физике, спорте, навигации и повседневной жизни.',
    formula: '1 км/ч = 0.277778 м/с = 0.621371 миль/ч = 0.539957 узлов',
    faq: [
      {
        question: 'Как перевести км/ч в м/с?',
        answer: 'Умножьте значение в км/ч на 0.277778 или разделите на 3.6.'
      },
      {
        question: 'Сколько м/с в 1 км/ч?',
        answer: 'В 1 км/ч содержится примерно 0.278 м/с.'
      }
    ],
    sources: [
      { title: 'Единицы измерения скорости — Википедия', url: 'https://ru.wikipedia.org/wiki/Единицы_и_эталоны_скорости' }
    ],
    updatedAt: '2026-04-07'
  },
  popularCalculations: [
    { value: '1 км/ч в м/с', url: '/km-ch-v-m-s?value=1&from=kmh&to=ms' },
    { value: '60 км/ч в м/с', url: '/km-ch-v-m-s?value=60&from=kmh&to=ms' },
    { value: '100 км/ч в м/с', url: '/km-ch-v-m-s?value=100&from=kmh&to=ms' }
  ]
};

export const calculators: Calculator[] = [
  simpleCalculator,
  kmhToMsConverter,
  ...mathematicalCalculators,
  ...mathAdvancedCalculators,
  ...physicsCalculators,
  ...physicsMoreCalculators,
  ...technologyCalculators,
  ...geometryCalculators,
  ...converterCalculators,
  ...extendedConverters,
  ...advancedConverters,
  ...specialConverters,
  ...specialConvertersMore,
  ...currencyConverters,
  ...moreConvertersCalculators,
  ...healthCalculators,
  ...healthExtendedCalculators,
  ...healthExtendedMoreCalculators,
  ...healthMore1Calculators,
  ...healthMore2Calculators,
  ...healthMore3Calculators,
  ...financeCalculators,
  ...financeAdvancedCalculators,
  ...financeMoreCalculators,
  ...financeExtendedCalculators,
  ...constructionCalculators,
  ...constructionMoreCalculators,
  ...constructionFinalCalculators,
  ...constructionExtendedCalculators,
  ...areaVolumeCalculators,
  ...timeDateCalculators,
  ...datetimeCalculators,
  ...digitalCalculators,
  ...dailyCalculators,
  ...dailyExtendedCalculators,
  ...dailyMore1Calculators,
  ...dailyMore2Calculators,
  ...dailyMore3Calculators,
  ...textToolsCalculators,
  ...engineeringCalculators,
  ...engineeringMoreCalculators,
  ...textCalculators,
  ...colorCalculators,
  ...colorToolsCalculators,
  ...generatorCalculators,
  ...generatorsMoreCalculators,
  ...transportCalculators,
  ...sportsFitnessCalculators,
  ...hobbiesPhotographyCalculators,
  ...businessMarketingCalculators,
  ...musicAudioCalculators,
  ...petCareCalculators,
  ...astronomyCalculators,
  ...cookingFoodCalculators,
  ...homeMaintenanceCalculators,
  ...itDevopsCalculators,
  ...ancientConvertersCalculators,
  ...travelConvertersCalculators,
  ...gardeningCalculators,
  ...beautyCareCalculators,
  ...convertersCookingCalculators,
  ...fitnessBodybuildingCalculators,
  ...educationLearningCalculators,
  ...diyCraftsCalculators,
  ...environmentEcologyCalculators,
  ...parentingBabyCalculators,
  ...fashionStyleCalculators,
  ...shoppingDealsCalculators,
  bmiCalculator,
  calorieCalculator,
  mortgageCalculator,
];

const calculatorSlugMap = new Map<string, Calculator>(calculators.map(calc => [calc.slug, calc]));

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculatorSlugMap.get(slug);
}

export function getCalculatorsByCategory(categorySlug: string): Calculator[] {
  return calculators.filter(calc => calc.category === categorySlug);
}

export function getCalculatorsBySubcategory(subcategorySlug: string): Calculator[] {
  return calculators.filter(calc => calc.subcategory === subcategorySlug);
}

export function searchCalculators(query: string): Calculator[] {
  const lowerQuery = query.toLowerCase();
  return calculators.filter(calc => 
    calc.title.toLowerCase().includes(lowerQuery) ||
    calc.description.toLowerCase().includes(lowerQuery) ||
    calc.category.toLowerCase().includes(lowerQuery)
  );
}
