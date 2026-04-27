import { Calculator } from '../types';

// Калькуляторы кулинарных мер — конвертеры для продуктов

// Базовые данные о продуктах (граммов на мл)
const ingredients: Record<string, { name: string; gPerMl: number; category: string }> = {
  wheat_flour: { name: 'Мука пшеничная', gPerMl: 0.64, category: 'muka' },
  rye_flour: { name: 'Мука ржаная', gPerMl: 0.65, category: 'muka' },
  sugar: { name: 'Сахар', gPerMl: 0.85, category: 'sahar' },
  salt: { name: 'Соль', gPerMl: 1.2, category: 'specii' },
  butter: { name: 'Сливочное масло', gPerMl: 0.96, category: 'masla' },
  vegetable_oil: { name: 'Растительное масло', gPerMl: 0.92, category: 'masla' },
  milk: { name: 'Молоко', gPerMl: 1.03, category: 'molochnye' },
  water: { name: 'Вода', gPerMl: 1.0, category: 'molochnye' },
  honey: { name: 'Мёд', gPerMl: 1.4, category: 'sahar' },
  sour_cream: { name: 'Сметана', gPerMl: 1.05, category: 'molochnye' },
  rice: { name: 'Рис', gPerMl: 0.85, category: 'krupy' },
  buckwheat: { name: 'Гречка', gPerMl: 0.8, category: 'krupy' },
  oatmeal: { name: 'Овсянка', gPerMl: 0.7, category: 'krupy' },
  semolina: { name: 'Манка', gPerMl: 0.75, category: 'krupy' },
  cocoa: { name: 'Какао', gPerMl: 0.5, category: 'specii' },
  starch: { name: 'Крахмал', gPerMl: 0.65, category: 'specii' },
  powder_sugar: { name: 'Сахарная пудра', gPerMl: 0.6, category: 'sahar' },
  jam: { name: 'Варенье', gPerMl: 1.3, category: 'sahar' },
  condensed_milk: { name: 'Сгущёнка', gPerMl: 1.3, category: 'molochnye' },
  yogurt: { name: 'Йогурт', gPerMl: 1.05, category: 'molochnye' },
};

// Мера → объём в мл
const measures: Record<string, { name: string; volumeMl: number }> = {
  teaspoon: { name: 'Чайная ложка', volumeMl: 5 },
  tablespoon: { name: 'Столовая ложка', volumeMl: 15 },
  dessertspoon: { name: 'Десертная ложка', volumeMl: 10 },
  shot: { name: 'Рюмка', volumeMl: 50 },
  faceted_glass: { name: 'Гранёный стакан (до риски)', volumeMl: 200 },
  faceted_glass_full: { name: 'Гранёный стакан (полный)', volumeMl: 250 },
  tea_glass: { name: 'Чайный стакан', volumeMl: 250 },
  cup_mug: { name: 'Кружка', volumeMl: 300 },
  charochka: { name: 'Чарочка', volumeMl: 100 },
};

function createCookingCalculator(
  ingredientId: string,
  measureId: string
): Calculator {
  const ingredient = ingredients[ingredientId];
  const measure = measures[measureId];
  const grams = Math.round(measure.volumeMl * ingredient.gPerMl);

  return {
    id: `cooking-${ingredientId}-${measureId}`,
    slug: `${measureId}-${ingredientId.replace(/_/g, '-')}`,
    title: `${measure.name} ${ingredient.name.toLowerCase()} — сколько грамм`,
    description: `Сколько граммов ${ingredient.name.toLowerCase()} в ${measure.name.toLowerCase()}`,
    category: 'kulinarnye-mery',
    subcategory: ingredient.category,
    type: 'converter',
    inputs: [
      {
        name: 'count',
        label: 'Количество',
        type: 'number',
        placeholder: '1',
        defaultValue: 1,
        min: 1,
      },
    ],
    outputs: [
      { name: 'grams', label: 'Граммов', type: 'number', unit: 'г' },
      { name: 'kg', label: 'Килограммов', type: 'number', unit: 'кг' },
    ],
    calculate: (inputs) => {
      const count = Number(inputs.count) || 1;
      const totalGrams = grams * count;
      return [
        { value: totalGrams, label: 'Граммов' },
        { value: (totalGrams / 1000).toFixed(3), label: 'Килограммов' },
      ];
    },
    content: {
      howTo: 'Введите количество мер. Результат покажет вес в граммах.',
      about: `Конвертер для перевода ${measure.name.toLowerCase()} ${ingredient.name.toLowerCase()} в граммы.`,
      usage: `Используйте при приготовлении блюд с ${ingredient.name.toLowerCase()}.`,
      faq: [
        { question: 'Сколько граммов в одной мере?', answer: `1 ${measure.name.toLowerCase()} = ${grams} г ${ingredient.name.toLowerCase()}` },
      ],
      sources: [{ title: 'Кулинарные меры — Википедия', url: 'https://ru.wikipedia.org/wiki/Кулинарные_меры' }],
      updatedAt: '2026-04-27',
    },
  };
}

// Генерируем все комбинации для популярных продуктов
const popularMeasures = ['teaspoon', 'tablespoon', 'dessertspoon', 'shot', 'faceted_glass'];
const popularIngredients = [
  'wheat_flour', 'sugar', 'salt', 'butter', 'vegetable_oil', 'milk', 'water',
  'honey', 'sour_cream', 'rice', 'buckwheat', 'oatmeal', 'semolina', 'cocoa',
  'starch', 'powder_sugar', 'jam', 'condensed_milk', 'yogurt',
];

export const cookingCalculators: Calculator[] = popularIngredients.flatMap((ingId) =>
  popularMeasures.map((measId) => createCookingCalculator(ingId, measId))
);
