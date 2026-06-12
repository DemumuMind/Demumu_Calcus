import { categories } from './categories';
import type { Category } from './types';
import type { UnitCategory } from './units';
import type { CookingIngredient } from './cooking';
import type { TimerPreset } from './timers';
import type { PercentageCalculation } from './percentages';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://demumu-calcus.vercel.app';

/** Helper to create a HowTo schema with steps */
function makeHowToSchema(name: string, description: string, steps: Array<{ name: string; text: string; url?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime: 'PT1M',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      ...(s.url ? { url: s.url } : { position: i + 1 }),
      name: s.name,
      text: s.text,
    })),
  };
}

/** Helper to create a breadcrumb schema */
function makeBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calcus — Онлайн калькуляторы и конвертеры',
    url: SITE_URL,
    description: 'Бесплатные онлайн калькуляторы, конвертеры единиц измерения, процентные калькуляторы, таймеры и кулинарные меры. Более 2500 конверсий и 100+ калькуляторов.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateCategorySchema(categoryId: string) {
  const category: Category | undefined = categories.find(c => c.slug === categoryId);
  if (!category) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: category.description,
    url: `${SITE_URL}/${categoryId}`,
    breadcrumb: makeBreadcrumbSchema([
      { name: 'Главная', url: '/' },
      { name: category.title, url: `/${categoryId}` },
    ]),
  };
}

export function generateConverterSchema(
  category: UnitCategory,
  fromUnit: string,
  toUnit: string,
  value: number,
  result: number
) {
  const fromUnitData = category.units[fromUnit];
  const toUnitData = category.units[toUnit];
  
  if (!fromUnitData || !toUnitData) return null;

  const stepUrl = `${SITE_URL}/${category.id}/${fromUnit}-v-${toUnit}`;
  return makeHowToSchema(
    `Как конвертировать ${fromUnitData.name} в ${toUnitData.name}`,
    `Конвертер ${category.name}: перевод ${fromUnitData.name} в ${toUnitData.name}.`,
    [
      { name: `Введите значение в ${fromUnitData.name}`, text: `Введите числовое значение в поле "Из" для ${fromUnitData.name}.`, url: stepUrl },
      { name: 'Выберите единицы измерения', text: `Убедитесь, что выбраны ${fromUnitData.name} для конвертации из и ${toUnitData.name} для конвертации в.`, url: stepUrl },
      { name: 'Получите результат', text: `Результат ${value} ${fromUnitData.shortName} = ${result} ${toUnitData.shortName} отображается автоматически.`, url: stepUrl },
    ],
  );
}

export function generatePercentageSchema(type: PercentageCalculation) {
  return makeHowToSchema(
    type.title,
    type.description,
    [
      { name: 'Введите значения', text: 'Введите исходные числа в поля калькулятора.' },
      { name: 'Получите результат', text: `Результат вычисляется автоматически по формуле: ${type.formula}` },
    ],
  );
}

export function generateCookingSchema(
  ingredient: CookingIngredient, 
  measure: { id: string; name: string; shortName: string; volumeMl: number }
) {
  const slug = `${measure.id}-${ingredient.id}`;
  const stepUrl = `${SITE_URL}/kulinarnye-mery/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `${measure.name} ${ingredient.name} — сколько граммов`,
    description: `Сколько граммов ${ingredient.name} в ${measure.name}. Точный перевод кулинарных мер в граммы онлайн.`,
    totalTime: 'PT1M',
    tool: {
      '@type': 'HowToTool',
      name: measure.name
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Введите количество',
        text: `Введите количество ${measure.name} ${ingredient.name} в поле ввода.`,
        url: stepUrl,
      },
      {
        '@type': 'HowToStep',
        name: 'Получите результат в граммах',
        text: `Результат автоматически конвертируется в граммы.`,
        url: stepUrl,
      },
    ],
  };
}

export function generateTimerSchema(timer: TimerPreset) {
  const stepUrl = `${SITE_URL}/tajmery/${timer.id}`;
  return makeHowToSchema(
    timer.name,
    `Онлайн таймер на ${timer.name.toLowerCase()} с обратным отсчётом.`,
    [
      { name: 'Запустите таймер', text: `Нажмите кнопку "Старт" для начала отсчёта ${timer.name.toLowerCase()}.`, url: stepUrl },
      { name: 'Следите за временем', text: 'Отслеживайте оставшееся время на экране таймера.', url: stepUrl },
      { name: 'Завершение', text: 'Таймер оповестит вас звуковым сигналом по окончании.', url: stepUrl },
    ],
  );
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export const generateBreadcrumbSchema = makeBreadcrumbSchema;

export function generateCalculatorSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${SITE_URL}${url}`,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'RUB'
    }
  };
}

export function generateSubcategorySchema(
  category: Category,
  subcategory: { id: string; title: string; description: string }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: subcategory.title,
    description: subcategory.description,
    url: `${SITE_URL}/${category.slug}/podkat/${subcategory.id}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Calcus',
      url: SITE_URL
    },
    breadcrumb: makeBreadcrumbSchema([
      { name: 'Главная', url: '/' },
      { name: category.title, url: `/${category.slug}` },
      { name: subcategory.title, url: `/${category.slug}/podkat/${subcategory.id}` },
    ]),
  };
}
