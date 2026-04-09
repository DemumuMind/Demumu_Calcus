// ============================================
// ПРОЦЕНТНЫЕ КАЛЬКУЛЯТОРЫ
// Различные типы процентных расчётов
// ============================================

export interface PercentageCalculation {
  id: string;
  slug: string;
  title: string;
  description: string;
  formula: string;
  example: string;
}

// Типы процентных расчётов
export const percentageTypes: PercentageCalculation[] = [
  {
    id: 'percent-of-number',
    slug: 'procentov-ot-chisla',
    title: 'Сколько процентов от числа',
    description: 'Найдите, сколько составляет X% от числа Y',
    formula: 'Результат = (Процент × Число) ÷ 100',
    example: '25% от 200 = 50',
  },
  {
    id: 'number-is-percent-of',
    slug: 'chislo-sostavlyaet-procent',
    title: 'Число составляет сколько процентов',
    description: 'Найдите, какой процент составляет число X от числа Y',
    formula: 'Результат = (Число × 100) ÷ Общее',
    example: '50 от 200 = 25%',
  },
  {
    id: 'percent-change',
    slug: 'izmenenie-v-procentah',
    title: 'Изменение в процентах',
    description: 'Найдите изменение в процентах между двумя числами',
    formula: 'Результат = ((Новое − Старое) × 100) ÷ Старое',
    example: 'Изменение с 100 на 150 = +50%',
  },
  {
    id: 'percent-difference',
    slug: 'raznica-v-procentah',
    title: 'Разница в процентах',
    description: 'Найдите разницу между двумя числами в процентах',
    formula: 'Результат = (|Число1 − Число2| × 100) ÷ Число1',
    example: 'Разница между 80 и 100 = 25%',
  },
  {
    id: 'add-percent',
    slug: 'dobavit-procent',
    title: 'Прибавить процент к числу',
    description: 'Прибавьте X% к числу Y',
    formula: 'Результат = Число + (Число × Процент ÷ 100)',
    example: '200 + 10% = 220',
  },
  {
    id: 'subtract-percent',
    slug: 'vyčest-procent',
    title: 'Вычесть процент из числа',
    description: 'Вычтите X% из числа Y',
    formula: 'Результат = Число − (Число × Процент ÷ 100)',
    example: '200 − 10% = 180',
  },
  {
    id: 'compound-percent',
    slug: 'složnye-procenty',
    title: 'Сложные проценты',
    description: 'Расчёт сложных процентов (капитализация)',
    formula: 'Результат = Сумма × (1 + Ставка)^Период',
    example: '1000 под 10% на 2 года = 1210',
  },
];

// ============================================
// УТИЛИТЫ ДЛЯ РАСЧЁТОВ
// ============================================

/**
 * Сколько составляет percent% от number
 */
export function calculatePercentOf(percent: number, number: number): number {
  return (percent * number) / 100;
}

/**
 * Какой процент составляет value от total
 */
export function calculateWhatPercent(value: number, total: number): number {
  if (total === 0) return 0;
  return (value * 100) / total;
}

/**
 * Изменение в процентах от oldValue к newValue
 */
export function calculatePercentChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) * 100) / oldValue;
}

/**
 * Разница в процентах между двумя числами
 */
export function calculatePercentDifference(value1: number, value2: number): number {
  if (value1 === 0) return 0;
  return (Math.abs(value1 - value2) * 100) / value1;
}

/**
 * Прибавить процент к числу
 */
export function addPercent(number: number, percent: number): number {
  return number + (number * percent) / 100;
}

/**
 * Вычесть процент из числа
 */
export function subtractPercent(number: number, percent: number): number {
  return number - (number * percent) / 100;
}

/**
 * Сложные проценты (капитализация)
 */
export function calculateCompoundInterest(
  principal: number,
  rate: number,
  periods: number
): number {
  return principal * Math.pow(1 + rate / 100, periods);
}

// ============================================
// ГЕНЕРАЦИЯ СТАТИЧЕСКИХ ПАРАМЕТРОВ
// ============================================

/**
 * Генерирует параметры для страниц процентных калькуляторов
 */
export function generateAllPercentageParams(): Array<{
  type: string;
  value1: string;
  value2: string;
}> {
  const params: Array<{ type: string; value1: string; value2: string }> = [];
  const popularValues = [1, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 500, 1000];
  
  // Для каждого типа расчёта генерируем комбинации
  percentageTypes.forEach((calcType) => {
    // Генерируем ~100 комбинаций для каждого типа
    for (let i = 0; i < Math.min(20, popularValues.length); i++) {
      for (let j = 0; j < Math.min(5, popularValues.length); j++) {
        if (i !== j) {
          params.push({
            type: calcType.slug,
            value1: popularValues[i].toString(),
            value2: popularValues[j].toString(),
          });
        }
      }
    }
  });
  
  console.log(`Generated ${params.length} percentage calculator pages`);
  return params;
}

/**
 * Получает тип расчёта по slug
 */
export function getPercentageTypeBySlug(slug: string): PercentageCalculation | undefined {
  return percentageTypes.find((type) => type.slug === slug);
}

/**
 * Генерирует заголовок страницы
 */
export function generatePercentageTitle(
  type: PercentageCalculation,
  value1: number,
  value2: number
): string {
  switch (type.id) {
    case 'percent-of-number':
      return `${value1}% от ${value2} — сколько это`;
    case 'number-is-percent-of':
      return `${value1} от ${value2} — сколько процентов`;
    case 'percent-change':
      return `Изменение с ${value1} на ${value2} — в процентах`;
    case 'percent-difference':
      return `Разница между ${value1} и ${value2} — в процентах`;
    case 'add-percent':
      return `${value2} + ${value1}% — прибавить процент`;
    case 'subtract-percent':
      return `${value2} − ${value1}% — вычесть процент`;
    case 'compound-percent':
      return `${value2} под ${value1}% — сложные проценты`;
    default:
      return `${type.title}: ${value1} и ${value2}`;
  }
}

/**
 * Генерирует описание страницы
 */
export function generatePercentageDescription(
  type: PercentageCalculation,
  value1: number,
  value2: number,
  result: number
): string {
  const formattedResult = Math.abs(result) < 0.01 
    ? result.toExponential(2) 
    : result.toFixed(2);
  
  switch (type.id) {
    case 'percent-of-number':
      return `${value1}% от ${value2} = ${formattedResult}. Онлайн калькулятор процентов с формулой и объяснением.`;
    case 'number-is-percent-of':
      return `${value1} от ${value2} составляет ${formattedResult}%. Онлайн калькулятор с решением.`;
    case 'percent-change':
      return `Изменение с ${value1} на ${value2} = ${result > 0 ? '+' : ''}${formattedResult}%. Калькулятор процентного изменения.`;
    case 'percent-difference':
      return `Разница между ${value1} и ${value2} = ${formattedResult}%. Онлайн расчёт разницы в процентах.`;
    case 'add-percent':
      return `${value2} + ${value1}% = ${formattedResult}. Прибавить процент к числу онлайн.`;
    case 'subtract-percent':
      return `${value2} − ${value1}% = ${formattedResult}. Вычесть процент из числа онлайн.`;
    case 'compound-percent':
      return `${value2} под ${value1}% = ${formattedResult}. Калькулятор сложных процентов.`;
    default:
      return `Расчёт: ${type.title}. Результат: ${formattedResult}`;
  }
}

/**
 * Выполняет расчёт на основе типа
 */
export function calculateByType(
  typeId: string,
  value1: number,
  value2: number
): { result: number; explanation: string } {
  let result = 0;
  let explanation = '';
  
  switch (typeId) {
    case 'percent-of-number':
      result = calculatePercentOf(value1, value2);
      explanation = `${value1}% от ${value2} = (${value1} × ${value2}) ÷ 100 = ${result.toFixed(2)}`;
      break;
    case 'number-is-percent-of':
      result = calculateWhatPercent(value1, value2);
      explanation = `${value1} от ${value2} = (${value1} × 100) ÷ ${value2} = ${result.toFixed(2)}%`;
      break;
    case 'percent-change':
      result = calculatePercentChange(value1, value2);
      explanation = `Изменение с ${value1} на ${value2} = ((${value2} − ${value1}) × 100) ÷ ${value1} = ${result > 0 ? '+' : ''}${result.toFixed(2)}%`;
      break;
    case 'percent-difference':
      result = calculatePercentDifference(value1, value2);
      explanation = `Разница = (|${value1} − ${value2}| × 100) ÷ ${value1} = ${result.toFixed(2)}%`;
      break;
    case 'add-percent':
      result = addPercent(value2, value1);
      explanation = `${value2} + ${value1}% = ${value2} + (${value2} × ${value1} ÷ 100) = ${result.toFixed(2)}`;
      break;
    case 'subtract-percent':
      result = subtractPercent(value2, value1);
      explanation = `${value2} − ${value1}% = ${value2} − (${value2} × ${value1} ÷ 100) = ${result.toFixed(2)}`;
      break;
    case 'compound-percent':
      result = calculateCompoundInterest(value2, value1, 1);
      explanation = `${value2} под ${value1}% = ${value2} × (1 + ${value1}÷100)^1 = ${result.toFixed(2)}`;
      break;
    default:
      result = 0;
      explanation = 'Неизвестный тип расчёта';
  }
  
  return { result, explanation };
}
