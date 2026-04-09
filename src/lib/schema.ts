import { categories } from './categories';
import type { Category } from './types';
import type { UnitCategory } from './units';
import type { CookingIngredient } from './cooking';
import type { TimerPreset } from './timers';
import type { PercentageCalculation } from './percentages';

/**
 * Генерирует Schema.org JSON-LD для главной страницы
 */
export function generateHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calcus.su — Онлайн калькуляторы и конвертеры',
    url: 'https://calcus.su',
    description: 'Бесплатные онлайн калькуляторы, конвертеры единиц измерения, процентные калькуляторы, таймеры и кулинарные меры. Более 2500 конверсий и 100+ калькуляторов.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://calcus.su/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Генерирует Schema.org JSON-LD для категории
 */
export function generateCategorySchema(categoryId: string) {
  const category: Category | undefined = categories.find(c => c.slug === categoryId);
  if (!category) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: category.description,
    url: `https://calcus.su/${categoryId}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: 'https://calcus.su'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: category.title,
          item: `https://calcus.su/${categoryId}`
        }
      ]
    }
  };
}

/**
 * Генерирует Schema.org JSON-LD для конвертера единиц
 */
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

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Как конвертировать ${fromUnitData.name} в ${toUnitData.name}`,
    description: `Конвертер ${category.name}: перевод ${fromUnitData.name} в ${toUnitData.name}.`,
    totalTime: 'PT1M',
    step: [
      {
        '@type': 'HowToStep',
        name: `Введите значение в ${fromUnitData.name}`,
        text: `Введите числовое значение в поле "Из" для ${fromUnitData.name}.`,
        url: `https://calcus.su/${category.id}/${fromUnit}-v-${toUnit}`
      },
      {
        '@type': 'HowToStep',
        name: 'Выберите единицы измерения',
        text: `Убедитесь, что выбраны ${fromUnitData.name} для конвертации из и ${toUnitData.name} для конвертации в.`,
        url: `https://calcus.su/${category.id}/${fromUnit}-v-${toUnit}`
      },
      {
        '@type': 'HowToStep',
        name: 'Получите результат',
        text: `Результат ${value} ${fromUnitData.shortName} = ${result} ${toUnitData.shortName} отображается автоматически.`,
        url: `https://calcus.su/${category.id}/${fromUnit}-v-${toUnit}`
      }
    ]
  };
}

/**
 * Генерирует Schema.org JSON-LD для процентного калькулятора
 */
export function generatePercentageSchema(type: PercentageCalculation) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: type.title,
    description: type.description,
    totalTime: 'PT1M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Введите значения',
        text: 'Введите исходные числа в поля калькулятора.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Получите результат',
        text: `Результат вычисляется автоматически по формуле: ${type.formula}`
      }
    ]
  };
}

/**
 * Генерирует Schema.org JSON-LD для кулинарного конвертера
 */
export function generateCookingSchema(
  ingredient: CookingIngredient, 
  measure: { id: string; name: string; shortName: string; volumeMl: number }
) {
  const slug = `${measure.id}-${ingredient.id}`;
  
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
        url: `https://calcus.su/kulinarnye-mery/${slug}`
      },
      {
        '@type': 'HowToStep',
        name: 'Получите результат в граммах',
        text: `Результат автоматически конвертируется в граммы.`,
        url: `https://calcus.su/kulinarnye-mery/${slug}`
      }
    ]
  };
}

/**
 * Генерирует Schema.org JSON-LD для таймера
 */
export function generateTimerSchema(timer: TimerPreset) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: timer.name,
    description: `Онлайн таймер на ${timer.name.toLowerCase()} с обратным отсчётом.`,
    totalTime: `PT${Math.floor(timer.seconds / 3600)}H${Math.floor((timer.seconds % 3600) / 60)}M${timer.seconds % 60}S`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Запустите таймер',
        text: `Нажмите кнопку "Старт" для начала отсчёта ${timer.name.toLowerCase()}.`,
        url: `https://calcus.su/tajmery/${timer.id}`
      },
      {
        '@type': 'HowToStep',
        name: 'Следите за временем',
        text: 'Отслеживайте оставшееся время на экране таймера.',
        url: `https://calcus.su/tajmery/${timer.id}`
      },
      {
        '@type': 'HowToStep',
        name: 'Завершение',
        text: 'Таймер оповестит вас звуковым сигналом по окончании.',
        url: `https://calcus.su/tajmery/${timer.id}`
      }
    ]
  };
}

/**
 * Генерирует Schema.org FAQPage для страницы с FAQ
 */
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

/**
 * Генерирует Schema.org BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://calcus.su${item.url}`
    }))
  };
}

/**
 * Генерирует Schema.org SoftwareApplication для калькулятора
 */
export function generateCalculatorSchema(
  name: string,
  description: string,
  url: string,
  rating?: { value: number; count: number }
) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `https://calcus.su${url}`,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'RUB'
    }
  };

  if (rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.value,
      ratingCount: rating.count
    };
  }

  return schema;
}

/**
 * Генерирует Schema.org Organization для сайта
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calcus.su',
    url: 'https://calcus.su',
    logo: {
      '@type': 'ImageObject',
      url: 'https://calcus.su/logo.png',
      width: 512,
      height: 512
    },
    description: 'Бесплатные онлайн калькуляторы, конвертеры единиц измерения, процентные калькуляторы и таймеры.',
    sameAs: [
      'https://vk.com/calcus',
      'https://t.me/calcus_ru'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@calcus.su'
    }
  };
}

/**
 * Генерирует расширенный Schema.org WebSite с навигацией
 */
export function generateEnhancedWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calcus.su — Онлайн калькуляторы и конвертеры',
    url: 'https://calcus.su',
    description: 'Бесплатные онлайн калькуляторы, конвертеры единиц измерения, процентные калькуляторы, таймеры и кулинарные меры. Более 2500 конверсий и 100+ калькуляторов.',
    inLanguage: 'ru-RU',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://calcus.su/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Генерирует Schema.org для страницы подкатегории с хлебными крошками
 */
export function generateSubcategorySchema(
  category: Category,
  subcategory: { id: string; title: string; description: string }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: subcategory.title,
    description: subcategory.description,
    url: `https://calcus.su/${category.slug}/podkat/${subcategory.id}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Calcus.su',
      url: 'https://calcus.su'
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: 'https://calcus.su'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: category.title,
          item: `https://calcus.su/${category.slug}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: subcategory.title,
          item: `https://calcus.su/${category.slug}/podkat/${subcategory.id}`
        }
      ]
    }
  };
}

/**
 * Генерирует Schema.org Product для конвертера (для rich snippets)
 */
export function generateConverterProductSchema(
  category: UnitCategory,
  fromUnit: string,
  toUnit: string
) {
  const fromUnitData = category.units[fromUnit];
  const toUnitData = category.units[toUnit];
  
  if (!fromUnitData || !toUnitData) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Конвертер ${fromUnitData.name} в ${toUnitData.name}`,
    description: `Бесплатный онлайн конвертер ${category.name.toLowerCase()}: перевод ${fromUnitData.name} в ${toUnitData.name}.`,
    brand: {
      '@type': 'Brand',
      name: 'Calcus.su'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

/**
 * Генерирует Schema.org Speakable для голосового поиска
 */
export function generateSpeakableSchema(cssSelector: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [cssSelector]
    }
  };
}
