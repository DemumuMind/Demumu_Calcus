
export interface CookingIngredient {
  id: string;
  name: string;
  category: string;
  // Граммов в одной чайной ложке (5 мл)
  gramsPerTeaspoon: number;
  // Граммов в одной столовой ложке (15 мл)
  gramsPerTablespoon: number;
  // Граммов в одном стакане (250 мл)
  gramsPerCup: number;
  // Граммов в одной рюмке (50 мл)
  gramsPerShot: number;
}

export interface CookingMeasure {
  id: string;
  name: string;
  shortName: string;
  volumeMl: number; // Объём в миллилитрах
}

// Стандартные меры
export const standardMeasures: Record<string, CookingMeasure> = {
  teaspoon: {
    id: 'teaspoon',
    name: 'чайная ложка',
    shortName: 'ч. л.',
    volumeMl: 5,
  },
  tablespoon: {
    id: 'tablespoon',
    name: 'столовая ложка',
    shortName: 'ст. л.',
    volumeMl: 15,
  },
  dessertspoon: {
    id: 'dessertspoon',
    name: 'десертная ложка',
    shortName: 'дес. л.',
    volumeMl: 10,
  },
  shot: {
    id: 'shot',
    name: 'рюмка',
    shortName: 'рюмка',
    volumeMl: 50,
  },
  faceted_glass: {
    id: 'faceted_glass',
    name: 'гранёный стакан (до риски)',
    shortName: 'стакан',
    volumeMl: 200,
  },
  faceted_glass_full: {
    id: 'faceted_glass_full',
    name: 'гранёный стакан (полный)',
    shortName: 'стакан полн.',
    volumeMl: 250,
  },
  tea_glass: {
    id: 'tea_glass',
    name: 'чайный стакан',
    shortName: 'чайн. стакан',
    volumeMl: 250,
  },
  cup_mug: {
    id: 'cup_mug',
    name: 'кружка',
    shortName: 'кружка',
    volumeMl: 300,
  },
  charochka: {
    id: 'charochka',
    name: 'чарочка',
    shortName: 'чарка',
    volumeMl: 100,
  },
};

// База продуктов с плотностью (граммов на мл)
export const cookingIngredients: Record<string, CookingIngredient> = {
  // Мука и крупы
  wheat_flour: {
    id: 'wheat_flour',
    name: 'мука пшеничная',
    category: 'flour',
    gramsPerTeaspoon: 4,
    gramsPerTablespoon: 12,
    gramsPerCup: 160,
    gramsPerShot: 40,
  },
  rye_flour: {
    id: 'rye_flour',
    name: 'мука ржаная',
    category: 'flour',
    gramsPerTeaspoon: 4,
    gramsPerTablespoon: 12,
    gramsPerCup: 150,
    gramsPerShot: 38,
  },
  buckwheat: {
    id: 'buckwheat',
    name: 'гречка',
    category: 'grains',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 15,
    gramsPerCup: 200,
    gramsPerShot: 50,
  },
  rice: {
    id: 'rice',
    name: 'рис',
    category: 'grains',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 15,
    gramsPerCup: 180,
    gramsPerShot: 45,
  },
  millet: {
    id: 'millet',
    name: 'пшено',
    category: 'grains',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 14,
    gramsPerCup: 190,
    gramsPerShot: 47,
  },
  semolina: {
    id: 'semolina',
    name: 'манка',
    category: 'grains',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 14,
    gramsPerCup: 180,
    gramsPerShot: 45,
  },
  oats: {
    id: 'oats',
    name: 'овсянка',
    category: 'grains',
    gramsPerTeaspoon: 4,
    gramsPerTablespoon: 12,
    gramsPerCup: 100,
    gramsPerShot: 25,
  },
  pearl_barley: {
    id: 'pearl_barley',
    name: 'перловка',
    category: 'grains',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 15,
    gramsPerCup: 200,
    gramsPerShot: 50,
  },

  // Сахар и сладости
  sugar: {
    id: 'sugar',
    name: 'сахар',
    category: 'sugar',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 15,
    gramsPerCup: 200,
    gramsPerShot: 50,
  },
  powdered_sugar: {
    id: 'powdered_sugar',
    name: 'сахарная пудра',
    category: 'sugar',
    gramsPerTeaspoon: 4,
    gramsPerTablespoon: 12,
    gramsPerCup: 140,
    gramsPerShot: 35,
  },
  brown_sugar: {
    id: 'brown_sugar',
    name: 'коричневый сахар',
    category: 'sugar',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 14,
    gramsPerCup: 180,
    gramsPerShot: 45,
  },
  salt: {
    id: 'salt',
    name: 'соль',
    category: 'seasonings',
    gramsPerTeaspoon: 7,
    gramsPerTablespoon: 21,
    gramsPerCup: 300,
    gramsPerShot: 75,
  },
  baking_soda: {
    id: 'baking_soda',
    name: 'сода',
    category: 'seasonings',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 15,
    gramsPerCup: 200,
    gramsPerShot: 50,
  },

  // Молочные продукты
  milk: {
    id: 'milk',
    name: 'молоко',
    category: 'dairy',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 15,
    gramsPerCup: 250,
    gramsPerShot: 50,
  },
  sour_cream: {
    id: 'sour_cream',
    name: 'сметана',
    category: 'dairy',
    gramsPerTeaspoon: 6,
    gramsPerTablespoon: 18,
    gramsPerCup: 250,
    gramsPerShot: 55,
  },
  yogurt: {
    id: 'yogurt',
    name: 'йогурт',
    category: 'dairy',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 15,
    gramsPerCup: 250,
    gramsPerShot: 50,
  },
  kefir: {
    id: 'kefir',
    name: 'кефир',
    category: 'dairy',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 15,
    gramsPerCup: 250,
    gramsPerShot: 50,
  },
  cream: {
    id: 'cream',
    name: 'сливки',
    category: 'dairy',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 15,
    gramsPerCup: 250,
    gramsPerShot: 50,
  },

  // Жиры и масла
  butter: {
    id: 'butter',
    name: 'масло сливочное',
    category: 'fats',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 15,
    gramsPerCup: 240,
    gramsPerShot: 60,
  },
  vegetable_oil: {
    id: 'vegetable_oil',
    name: 'масло растительное',
    category: 'fats',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 14,
    gramsPerCup: 230,
    gramsPerShot: 55,
  },
  olive_oil: {
    id: 'olive_oil',
    name: 'масло оливковое',
    category: 'fats',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 14,
    gramsPerCup: 230,
    gramsPerShot: 55,
  },
  ghee: {
    id: 'ghee',
    name: 'топлёное масло',
    category: 'fats',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 14,
    gramsPerCup: 220,
    gramsPerShot: 55,
  },
  mayonnaise: {
    id: 'mayonnaise',
    name: 'майонез',
    category: 'fats',
    gramsPerTeaspoon: 5,
    gramsPerTablespoon: 14,
    gramsPerCup: 230,
    gramsPerShot: 55,
  },

  // Орехи и сухофрукты
  walnuts: {
    id: 'walnuts',
    name: 'грецкие орехи',
    category: 'nuts',
    gramsPerTeaspoon: 3,
    gramsPerTablespoon: 9,
    gramsPerCup: 150,
    gramsPerShot: 38,
  },
  almonds: {
    id: 'almonds',
    name: 'миндаль',
    category: 'nuts',
    gramsPerTeaspoon: 3,
    gramsPerTablespoon: 9,
    gramsPerCup: 160,
    gramsPerShot: 40,
  },
  raisins: {
    id: 'raisins',
    name: 'изюм',
    category: 'nuts',
    gramsPerTeaspoon: 4,
    gramsPerTablespoon: 12,
    gramsPerCup: 160,
    gramsPerShot: 40,
  },

  // Мёд и сиропы
  honey: {
    id: 'honey',
    name: 'мёд',
    category: 'syrups',
    gramsPerTeaspoon: 7,
    gramsPerTablespoon: 21,
    gramsPerCup: 350,
    gramsPerShot: 85,
  },
  jam: {
    id: 'jam',
    name: 'варенье',
    category: 'syrups',
    gramsPerTeaspoon: 6,
    gramsPerTablespoon: 18,
    gramsPerCup: 300,
    gramsPerShot: 70,
  },
  condensed_milk: {
    id: 'condensed_milk',
    name: 'сгущёнка',
    category: 'dairy',
    gramsPerTeaspoon: 6,
    gramsPerTablespoon: 18,
    gramsPerCup: 300,
    gramsPerShot: 70,
  },

  // Другие
  cocoa: {
    id: 'cocoa',
    name: 'какао-порошок',
    category: 'other',
    gramsPerTeaspoon: 3,
    gramsPerTablespoon: 9,
    gramsPerCup: 120,
    gramsPerShot: 30,
  },
  coffee_ground: {
    id: 'coffee_ground',
    name: 'кофе молотый',
    category: 'other',
    gramsPerTeaspoon: 3,
    gramsPerTablespoon: 9,
    gramsPerCup: 100,
    gramsPerShot: 25,
  },
  gelatin: {
    id: 'gelatin',
    name: 'желатин',
    category: 'other',
    gramsPerTeaspoon: 4,
    gramsPerTablespoon: 12,
    gramsPerCup: 160,
    gramsPerShot: 40,
  },
  starch: {
    id: 'starch',
    name: 'крахмал',
    category: 'other',
    gramsPerTeaspoon: 4,
    gramsPerTablespoon: 12,
    gramsPerCup: 160,
    gramsPerShot: 40,
  },
  breadcrumbs: {
    id: 'breadcrumbs',
    name: 'сухари панировочные',
    category: 'other',
    gramsPerTeaspoon: 3,
    gramsPerTablespoon: 9,
    gramsPerCup: 120,
    gramsPerShot: 30,
  },
};

/**
 * Конвертирует меру в граммы для указанного продукта
 */
export function measureToGrams(
  ingredientId: string,
  measureId: string,
  quantity: number
): number {
  const ingredient = cookingIngredients[ingredientId];
  const measure = standardMeasures[measureId];
  
  if (!ingredient || !measure) {
    throw new Error(`Unknown ingredient or measure: ${ingredientId}, ${measureId}`);
  }
  
  // Используем коэффициент на основе объёма
  const volumeRatio = measure.volumeMl / 250; // Относительно стакана
  return ingredient.gramsPerCup * volumeRatio * quantity;
}

/**
 * Конвертирует граммы в меру для указанного продукта
 */
export function gramsToMeasure(
  ingredientId: string,
  measureId: string,
  grams: number
): number {
  const ingredient = cookingIngredients[ingredientId];
  const measure = standardMeasures[measureId];
  
  if (!ingredient || !measure) {
    throw new Error(`Unknown ingredient or measure: ${ingredientId}, ${measureId}`);
  }
  
  const volumeRatio = measure.volumeMl / 250;
  const gramsInMeasure = ingredient.gramsPerCup * volumeRatio;
  return grams / gramsInMeasure;
}

/**
 * Генерирует таблицу соответствия для продукта
 */
export function generateIngredientTable(ingredientId: string): Array<{
  measure: string;
  shortName: string;
  grams: number;
}> {
  const ingredient = cookingIngredients[ingredientId];
  if (!ingredient) return [];
  
  return [
    { measure: 'чайная ложка', shortName: 'ч. л.', grams: ingredient.gramsPerTeaspoon },
    { measure: 'столовая ложка', shortName: 'ст. л.', grams: ingredient.gramsPerTablespoon },
    { measure: 'рюмка', shortName: 'рюмка', grams: ingredient.gramsPerShot },
    { measure: 'гранёный стакан', shortName: 'стакан', grams: ingredient.gramsPerCup },
  ];
}

/**
 * Получает продукты по категории
 */
export function getIngredientsByCategory(category: string): CookingIngredient[] {
  return Object.values(cookingIngredients).filter(ing => ing.category === category);
}

/**
 * Получает все категории продуктов
 */
export function getIngredientCategories(): Array<{ id: string; name: string }> {
  const categories = new Map<string, string>();
  
  categories.set('flour', 'Мука');
  categories.set('grains', 'Крупы');
  categories.set('sugar', 'Сахар и сладости');
  categories.set('seasonings', 'Приправы');
  categories.set('dairy', 'Молочные продукты');
  categories.set('fats', 'Жиры и масла');
  categories.set('nuts', 'Орехи и сухофрукты');
  categories.set('syrups', 'Мёд и сиропы');
  categories.set('other', 'Другое');
  
  return Array.from(categories.entries()).map(([id, name]) => ({ id, name }));
}

/**
 * Генерирует slug для URL кулинарного конвертера
 */
export function generateCookingSlug(ingredientId: string, measureId: string): string {
  const ingredient = cookingIngredients[ingredientId];
  const measure = standardMeasures[measureId];
  
  if (!ingredient || !measure) return '';
  
  // Транслитерация для URL
  const translitMap: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
    'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', ' ': '-',
  };
  
  const transliterate = (text: string): string => {
    return text
      .toLowerCase()
      .split('')
      .map(char => translitMap[char] || char)
      .join('')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };
  
  return `${transliterate(measure.name)}-${transliterate(ingredient.name)}`;
}

// Precomputed reverse lookup map for O(1) slug resolution at runtime
const _cookingSlugMap: Record<string, { ingredientId: string; measureId: string }> = {};

function _buildCookingSlugMap(): void {
  for (const ingredientId of Object.keys(cookingIngredients)) {
    for (const measureId of Object.keys(standardMeasures)) {
      const slug = generateCookingSlug(ingredientId, measureId);
      if (slug) {
        _cookingSlugMap[slug] = { ingredientId, measureId };
      }
    }
  }
}

_buildCookingSlugMap();

/**
 * Resolves a cooking slug to ingredient and measure IDs in O(1) time.
 */
export function resolveCookingSlug(cookingId: string): { ingredientId: string; measureId: string } | null {
  const result = _cookingSlugMap[cookingId];
  return result || null;
}

/**
 * Генерирует все кулинарные конвертеры для статической генерации
 */
export function generateAllCookingConverters(): Array<{
  slug: string;
  ingredientId: string;
  measureId: string;
}> {
  const converters: Array<{ slug: string; ingredientId: string; measureId: string }> = [];

  Object.keys(cookingIngredients).forEach((ingredientId) => {
    Object.keys(standardMeasures).forEach((measureId) => {
      const slug = generateCookingSlug(ingredientId, measureId);
      if (slug) {
        converters.push({ slug, ingredientId, measureId });
      }
    });
  });

  return converters;
}

const GRAMM_VALUES = [50, 100, 150, 200, 250, 300, 500];

export const POPULAR_REVERSE_INGREDIENTS = [
  'wheat_flour',
  'sugar',
  'salt',
  'butter',
  'milk',
  'vegetable_oil',
  'rice',
  'buckwheat',
  'oats',
  'honey',
];

export const POPULAR_REVERSE_MEASURES = [
  'teaspoon',
  'tablespoon',
  'shot',
  'faceted_glass',
];

/**
 * Генерирует slug для обратного кулинарного конвертера
 * Формат: {N}-gramm-{ingredient}-v-{measure}
 * Пример: 50-gramm-muka-pshenichnaya-v-stolovaya-lozhka
 */
export function generateReverseCookingSlug(
  ingredientId: string,
  measureId: string,
  grams: number
): string {
  const ingredient = cookingIngredients[ingredientId];
  const measure = standardMeasures[measureId];

  if (!ingredient || !measure) return '';

  const translitMap: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
    'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', ' ': '-',
  };

  const transliterate = (text: string): string => {
    return text
      .toLowerCase()
      .split('')
      .map(char => translitMap[char] || char)
      .join('')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  return `${grams}-gramm-${transliterate(ingredient.name)}-v-${transliterate(measure.name)}`;
}

// Precomputed reverse lookup map for O(1) slug resolution
const _reverseCookingSlugMap: Record<string, { grams: number; ingredientId: string; measureId: string }> = {};

function _buildReverseCookingSlugMap(): void {
  for (const grams of GRAMM_VALUES) {
    for (const ingredientId of Object.keys(cookingIngredients)) {
      for (const measureId of Object.keys(standardMeasures)) {
        const slug = generateReverseCookingSlug(ingredientId, measureId, grams);
        if (slug) {
          _reverseCookingSlugMap[slug] = { grams, ingredientId, measureId };
        }
      }
    }
  }
}

_buildReverseCookingSlugMap();

/**
 * Resolves a reverse cooking slug to ingredient, measure and grams in O(1) time.
 */
export function resolveReverseCookingSlug(
  reverseSlug: string
): { grams: number; ingredientId: string; measureId: string } | null {
  const result = _reverseCookingSlugMap[reverseSlug];
  return result || null;
}

/**
 * Генерирует все популярные обратные кулинарные конвертеры для статической генерации
 */
export function generatePopularReverseCookingConverters(): Array<{
  slug: string[];
  ingredientId: string;
  measureId: string;
  grams: number;
}> {
  const converters: Array<{ slug: string[]; ingredientId: string; measureId: string; grams: number }> = [];

  for (const grams of GRAMM_VALUES) {
    for (const ingredientId of POPULAR_REVERSE_INGREDIENTS) {
      for (const measureId of POPULAR_REVERSE_MEASURES) {
        const slug = generateReverseCookingSlug(ingredientId, measureId, grams);
        if (slug) {
          converters.push({ slug: [slug], ingredientId, measureId, grams });
        }
      }
    }
  }

  return converters;
}

/**
 * Returns Russian plural form for a measure name based on count
 */
export function getMeasurePluralForm(measureId: string, count: number): string {
  const measure = standardMeasures[measureId];
  if (!measure) return measureId;

  const forms: Record<string, [string, string, string]> = {
    teaspoon: ['чайная ложка', 'чайные ложки', 'чайных ложек'],
    tablespoon: ['столовая ложка', 'столовые ложки', 'столовых ложек'],
    dessertspoon: ['десертная ложка', 'десертные ложки', 'десертных ложек'],
    shot: ['рюмка', 'рюмки', 'рюмок'],
    faceted_glass: ['гранёный стакан (до риски)', 'гранёных стакана (до риски)', 'гранёных стаканов (до риски)'],
    faceted_glass_full: ['гранёный стакан (полный)', 'гранёных стакана (полных)', 'гранёных стаканов (полных)'],
    tea_glass: ['чайный стакан', 'чайных стакана', 'чайных стаканов'],
    cup_mug: ['кружка', 'кружки', 'кружек'],
    charochka: ['чарочка', 'чарочки', 'чарочек'],
  };

  const [one, two, five] = forms[measureId] || [measure.name, measure.name, measure.name];
  const n = Math.floor(count);
  const lastTwo = n % 100;
  const lastOne = n % 10;

  if (lastTwo >= 11 && lastTwo <= 19) return five;
  if (lastOne === 1) return one;
  if (lastOne >= 2 && lastOne <= 4) return two;
  return five;
}
