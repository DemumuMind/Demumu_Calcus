import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Percent, Calculator, HelpCircle } from 'lucide-react';
import {
  getPercentageTypeBySlug,
  calculateByType,
  generatePercentageTitle,
  generatePercentageDescription,
  percentageTypes,
} from '@/lib/percentages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PercentageCalculator } from '@/components/calculator/percentage-calculator';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus-site.vercel.app';

const SPECIFIC_VALUE_N = [10, 50, 100];
const SPECIFIC_VALUE_M = [100, 500];

interface PercentagePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

type PageMode =
  | { kind: 'type'; typeSlug: string }
  | {
      kind: 'specific';
      typeId: string;
      typeSlug: string;
      value1: number;
      value2: number;
    };

/**
 * Config for each specific-value percentage type slug pattern.
 */
const SPECIFIC_TYPE_CONFIGS = [
  {
    slugPattern: ['N', 'procentov', 'ot', 'M'],
    typeId: 'percent-of-number',
    typeSlug: 'procentov-ot-chisla',
  },
  {
    slugPattern: ['N', 'dobavit', 'procent', 'k', 'M'],
    typeId: 'add-percent',
    typeSlug: 'dobavit-procent',
  },
  {
    slugPattern: ['N', 'vychest', 'procent', 'iz', 'M'],
    typeId: 'subtract-percent',
    typeSlug: 'vyčest-procent',
  },
  {
    slugPattern: ['izmenenie', 's', 'N', 'na', 'M'],
    typeId: 'percent-change',
    typeSlug: 'izmenenie-v-procentah',
  },
  {
    slugPattern: ['raznica', 'mezhdu', 'N', 'i', 'M'],
    typeId: 'percent-difference',
    typeSlug: 'raznica-v-procentah',
  },
  {
    slugPattern: ['N', 'sostavlyaet', 'skolko', 'procentov', 'ot', 'M'],
    typeId: 'number-is-percent-of',
    typeSlug: 'chislo-sostavlyaet-procent',
  },
];

/**
 * Parse the slug array to determine the page mode.
 */
function parseSlug(slug: string[]): PageMode | null {
  // Type page: exactly one segment that matches a known type slug
  if (slug.length === 1) {
    const typeSlug = slug[0];
    if (getPercentageTypeBySlug(typeSlug)) {
      return { kind: 'type', typeSlug };
    }
    return null;
  }

  // Specific-value pages: match against known patterns
  for (const config of SPECIFIC_TYPE_CONFIGS) {
    if (slug.length !== config.slugPattern.length) continue;

    let value1: number | null = null;
    let value2: number | null = null;
    let match = true;

    for (let i = 0; i < config.slugPattern.length; i++) {
      const part = config.slugPattern[i];
      if (part === 'N') {
        const parsed = parseFloat(slug[i]);
        if (isNaN(parsed)) {
          match = false;
          break;
        }
        value1 = parsed;
      } else if (part === 'M') {
        const parsed = parseFloat(slug[i]);
        if (isNaN(parsed)) {
          match = false;
          break;
        }
        value2 = parsed;
      } else if (slug[i] !== part) {
        match = false;
        break;
      }
    }

    if (match && value1 !== null && value2 !== null) {
      return {
        kind: 'specific',
        typeId: config.typeId,
        typeSlug: config.typeSlug,
        value1,
        value2,
      };
    }
  }

  return null;
}

export function generateStaticParams() {
  const params: Array<{ slug: string[] }> = [];

  // 1. All 7 percentage type pages
  for (const type of percentageTypes) {
    params.push({ slug: [type.slug] });
  }

  // 2. Specific-value pages for all types
  for (const config of SPECIFIC_TYPE_CONFIGS) {
    for (const n of SPECIFIC_VALUE_N) {
      for (const m of SPECIFIC_VALUE_M) {
        const slugParts = config.slugPattern.map((p) => {
          if (p === 'N') return n.toString();
          if (p === 'M') return m.toString();
          return p;
        });
        params.push({ slug: slugParts });
      }
    }
  }

  console.log(
    `Generated ${params.length} percentage pages (${percentageTypes.length} types + ${params.length - percentageTypes.length} specific-value)`
  );
  return params;
}

export async function generateMetadata({ params }: PercentagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return { title: 'Калькулятор не найден' };
  }

  if (parsed.kind === 'type') {
    const calcType = getPercentageTypeBySlug(parsed.typeSlug);
    if (!calcType) {
      return { title: 'Калькулятор не найден' };
    }
    const num1 = 25;
    const num2 = 100;
    const { result } = calculateByType(calcType.id, num1, num2);

    const title = generatePercentageTitle(calcType, num1, num2);
    const description = generatePercentageDescription(calcType, num1, num2, result);
    const url = `${SITE_URL}/procenty/${parsed.typeSlug}`;

    return {
      title,
      description,
      keywords: `${calcType.title}, проценты, калькулятор, онлайн`,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        type: 'website',
        siteName: 'Calcus',
      },
    };
  }

  // Specific-value page metadata
  const { typeId, typeSlug, value1, value2 } = parsed;
  const calcType = getPercentageTypeBySlug(typeSlug);
  if (!calcType) {
    return { title: 'Калькулятор не найден' };
  }

  const { result } = calculateByType(typeId, value1, value2);
  const formattedResult =
    typeId === 'number-is-percent-of'
      ? `${result.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}%`
      : result.toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
          minimumFractionDigits: result % 1 === 0 ? 0 : 2,
        });

  let title = '';
  let description = '';
  let url = '';

  switch (typeId) {
    case 'percent-of-number': {
      title = `${value1}% от ${value2} — ${formattedResult}`;
      description = `Сколько составляет ${value1}% от ${value2}? Результат: ${formattedResult}. Онлайн калькулятор процентов с формулой и объяснением.`;
      url = `${SITE_URL}/procenty/${value1}-procentov-ot-${value2}`;
      break;
    }
    case 'add-percent': {
      title = `${value2} + ${value1}% — ${formattedResult}`;
      description = `Прибавить ${value1}% к ${value2} = ${formattedResult}. Онлайн калькулятор процентов с формулой и объяснением.`;
      url = `${SITE_URL}/procenty/${value1}-dobavit-procent-k-${value2}`;
      break;
    }
    case 'subtract-percent': {
      title = `${value2} − ${value1}% — ${formattedResult}`;
      description = `Вычесть ${value1}% из ${value2} = ${formattedResult}. Онлайн калькулятор процентов с формулой и объяснением.`;
      url = `${SITE_URL}/procenty/${value1}-vychest-procent-iz-${value2}`;
      break;
    }
    case 'percent-change': {
      const sign = result > 0 ? '+' : '';
      title = `Изменение с ${value1} на ${value2} — ${sign}${formattedResult}`;
      description = `Изменение с ${value1} на ${value2} = ${sign}${formattedResult}. Онлайн калькулятор процентного изменения.`;
      url = `${SITE_URL}/procenty/izmenenie-s-${value1}-na-${value2}`;
      break;
    }
    case 'percent-difference': {
      title = `Разница между ${value1} и ${value2} — ${formattedResult}`;
      description = `Разница между ${value1} и ${value2} в процентах = ${formattedResult}. Онлайн калькулятор разницы в процентах.`;
      url = `${SITE_URL}/procenty/raznica-mezhdu-${value1}-i-${value2}`;
      break;
    }
    case 'number-is-percent-of': {
      title = `${value1} от ${value2} — ${formattedResult}`;
      description = `Сколько процентов составляет ${value1} от ${value2}? Результат: ${formattedResult}. Онлайн калькулятор процентов.`;
      url = `${SITE_URL}/procenty/${value1}-sostavlyaet-skolko-procentov-ot-${value2}`;
      break;
    }
  }

  return {
    title,
    description,
    keywords: `${calcType.title}, проценты, калькулятор, онлайн`,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Calcus',
    },
  };
}

// =====================================================
// HELPER: get specific-value page display data
// =====================================================
function getSpecificPageDisplay(
  typeId: string,
  n: number,
  m: number,
  result: number,
  explanation: string
) {
  const formattedResult =
    typeId === 'number-is-percent-of'
      ? `${result.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}%`
      : result.toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
          minimumFractionDigits: result % 1 === 0 ? 0 : 2,
        });

  switch (typeId) {
    case 'percent-of-number': {
      return {
        h1: `${n}% от ${m} — результат`,
        subhead: `Сколько составляет ${n} процентов от ${m}? Рассчитайте онлайн с формулой.`,
        resultLabel: `${n}% от ${m} =`,
        resultValue: formattedResult,
        formulaLine: `(${n} \u00d7 ${m}) \u00f7 100 = ${formattedResult}`,
        faq: [
          {
            q: `Сколько составляет ${n}% от ${m}?`,
            a: `${n}% от ${m} составляет <strong>${formattedResult}</strong>. Для расчёта используется формула: (${n} \u00d7 ${m}) \u00f7 100 = ${formattedResult}.`,
          },
          {
            q: `Как посчитать ${n} процентов от ${m}?`,
            a: `Чтобы посчитать ${n} процентов от ${m}, умножьте ${m} на ${n} и разделите на 100: (${m} \u00d7 ${n}) \u00f7 100 = ${formattedResult}. Используйте калькулятор выше, чтобы быстро получить результат для любых чисел.`,
          },
          {
            q: `Как найти ${n}% от любого числа?`,
            a: `Чтобы найти ${n}% от любого числа, умножьте это число на ${n} и разделите результат на 100. Например, ${n}% от 500 = ${((n * 500) / 100).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}.`,
          },
        ],
      };
    }
    case 'add-percent': {
      return {
        h1: `${m} + ${n}% — результат`,
        subhead: `Прибавить ${n} процентов к ${m}. Онлайн расчёт с формулой.`,
        resultLabel: `${m} + ${n}% =`,
        resultValue: formattedResult,
        formulaLine: `${m} + (${m} \u00d7 ${n} \u00f7 100) = ${formattedResult}`,
        faq: [
          {
            q: `Сколько будет ${m} + ${n}%?`,
            a: `${m} + ${n}% = <strong>${formattedResult}</strong>. Формула: ${m} + (${m} \u00d7 ${n} / 100) = ${formattedResult}.`,
          },
          {
            q: `Как прибавить ${n}% к числу?`,
            a: `Умножьте число на ${n}, разделите на 100 и прибавьте к исходному числу. Например, 500 + ${n}% = ${(500 + (500 * n) / 100).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}.`,
          },
          {
            q: `Как увеличить число на ${n} процентов?`,
            a: `Чтобы увеличить число на ${n}%, умножьте его на (1 + ${n}/100). Например, ${m} \u00d7 (1 + ${n}/100) = ${formattedResult}.`,
          },
        ],
      };
    }
    case 'subtract-percent': {
      return {
        h1: `${m} − ${n}% — результат`,
        subhead: `Вычесть ${n} процентов из ${m}. Онлайн расчёт с формулой.`,
        resultLabel: `${m} − ${n}% =`,
        resultValue: formattedResult,
        formulaLine: `${m} − (${m} \u00d7 ${n} \u00f7 100) = ${formattedResult}`,
        faq: [
          {
            q: `Сколько будет ${m} − ${n}%?`,
            a: `${m} − ${n}% = <strong>${formattedResult}</strong>. Формула: ${m} − (${m} \u00d7 ${n} / 100) = ${formattedResult}.`,
          },
          {
            q: `Как вычесть ${n}% из числа?`,
            a: `Умножьте число на ${n}, разделите на 100 и вычтите из исходного числа. Например, 500 − ${n}% = ${(500 - (500 * n) / 100).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}.`,
          },
          {
            q: `Как уменьшить число на ${n} процентов?`,
            a: `Чтобы уменьшить число на ${n}%, умножьте его на (1 − ${n}/100). Например, ${m} \u00d7 (1 − ${n}/100) = ${formattedResult}.`,
          },
        ],
      };
    }
    case 'percent-change': {
      const sign = result > 0 ? '+' : '';
      return {
        h1: `Изменение с ${n} на ${m} — результат`,
        subhead: `На сколько процентов изменилось значение с ${n} до ${m}?`,
        resultLabel: `Изменение:`,
        resultValue: `${sign}${formattedResult}`,
        formulaLine: `((${m} − ${n}) \u00d7 100) \u00f7 ${n} = ${sign}${formattedResult}`,
        faq: [
          {
            q: `На сколько процентов изменилось значение с ${n} на ${m}?`,
            a: `Изменение составляет <strong>${sign}${formattedResult}</strong>. Формула: ((${m} − ${n}) \u00d7 100) \u00f7 ${n} = ${sign}${formattedResult}.`,
          },
          {
            q: `Как посчитать процентное изменение?`,
            a: `Вычтите старое значение из нового, умножьте на 100 и разделите на старое значение. Например, изменение с 100 на 150 = +50%.`,
          },
          {
            q: `Что означает изменение на ${formattedResult}?`,
            a: `Это означает, что значение ${result > 0 ? 'увеличилось' : 'уменьшилось'} на ${Math.abs(result).toFixed(2)}% от исходного.`,
          },
        ],
      };
    }
    case 'percent-difference': {
      return {
        h1: `Разница между ${n} и ${m} — результат`,
        subhead: `На сколько процентов ${m} отличается от ${n}?`,
        resultLabel: `Разница:`,
        resultValue: formattedResult,
        formulaLine: `(|${m} − ${n}| \u00d7 100) \u00f7 ${n} = ${formattedResult}`,
        faq: [
          {
            q: `На сколько процентов ${m} отличается от ${n}?`,
            a: `Разница составляет <strong>${formattedResult}</strong>. Формула: (|${m} − ${n}| \u00d7 100) \u00f7 ${n} = ${formattedResult}.`,
          },
          {
            q: `Как посчитать разницу в процентах?`,
            a: `Найдите модуль разности чисел, умножьте на 100 и разделите на первое число. Например, разница между 80 и 100 = 25%.`,
          },
          {
            q: `В чём разница между процентным изменением и разницей?`,
            a: `Процентное изменение показывает направление (увеличение/уменьшение), а процентная разница — только величину отклонения.`,
          },
        ],
      };
    }
    case 'number-is-percent-of': {
      return {
        h1: `${n} от ${m} — сколько процентов`,
        subhead: `Сколько процентов составляет ${n} от ${m}?`,
        resultLabel: `${n} от ${m} =`,
        resultValue: formattedResult,
        formulaLine: `(${n} \u00d7 100) \u00f7 ${m} = ${formattedResult}`,
        faq: [
          {
            q: `Сколько процентов составляет ${n} от ${m}?`,
            a: `${n} от ${m} составляет <strong>${formattedResult}</strong>. Формула: (${n} \u00d7 100) \u00f7 ${m} = ${formattedResult}.`,
          },
          {
            q: `Как посчитать, сколько процентов составляет число?`,
            a: `Умножьте число на 100 и разделите на общее значение. Например, 50 от 200 = 25%.`,
          },
          {
            q: `${n} — это сколько процентов от ${m}?`,
            a: `${n} от ${m} = ${formattedResult}. Чтобы найти, сколько процентов составляет число, используйте формулу: (число \u00d7 100) \u00f7 общее.`,
          },
        ],
      };
    }
    default: {
      return {
        h1: `Расчёт`,
        subhead: `Онлайн калькулятор процентов`,
        resultLabel: `Результат:`,
        resultValue: formattedResult,
        formulaLine: explanation,
        faq: [],
      };
    }
  }
}

export default async function PercentagePage({ params }: PercentagePageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  // =====================================================
  // TYPE PAGE (existing behavior)
  // =====================================================
  if (parsed.kind === 'type') {
    const calcType = getPercentageTypeBySlug(parsed.typeSlug);
    if (!calcType) {
      notFound();
    }

    const num1 = 25;
    const num2 = 100;
    const { result, explanation } = calculateByType(calcType.id, num1, num2);

    const relatedValues = [1, 5, 10, 25, 50];
    const relatedCalcs = relatedValues.map((v) => ({
      value: v,
      result: calculateByType(calcType.id, v, num2).result,
    }));

    return (
      <div className="flex flex-col min-h-full">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Главная
              </Link>
              <span className="mx-2">/</span>
              <Link href="/procenty" className="hover:text-foreground transition-colors">
                Проценты
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{calcType.title}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3">
              {generatePercentageTitle(calcType, num1, num2)}
            </h1>
            <p className="text-lg text-muted-foreground">
              {calcType.description}. Результат с формулой и объяснением.
            </p>
          </div>

          {/* Calculator */}
          <PercentageCalculator
            initialType={parsed.typeSlug}
            initialValue1={num1}
            initialValue2={num2}
          />

          {/* Result Card */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Percent className="h-5 w-5 text-primary" />
                Решение
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-2">Результат</p>
                <p className="text-4xl font-bold text-primary">
                  {result.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
                  {calcType.id === 'number-is-percent-of' ? '%' : ''}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Формула:</strong> {calcType.formula}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Решение:</strong> {explanation}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculations */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-base">Похожие расчёты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {relatedCalcs.map((calc, idx) => (
                  <Link
                    key={idx}
                    href={`/procenty/${parsed.typeSlug}?v1=${calc.value}&v2=${num2}`}
                    className="flex justify-between py-2 border-b last:border-0 hover:bg-muted/50 transition-colors px-2 -mx-2 rounded"
                  >
                    <span className="text-sm">
                      {calcType.id === 'percent-of-number' && `${calc.value}% от ${num2}`}
                      {calcType.id === 'number-is-percent-of' && `${calc.value} от ${num2}`}
                      {calcType.id === 'percent-change' && `Изменение с ${calc.value} на ${num2}`}
                      {calcType.id === 'percent-difference' && `Разница ${calc.value} и ${num2}`}
                      {calcType.id === 'add-percent' && `${num2} + ${calc.value}%`}
                      {calcType.id === 'subtract-percent' && `${num2} − ${calc.value}%`}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {calc.result.toFixed(2)}
                      {calcType.id === 'number-is-percent-of' ? '%' : ''}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link
              href="/procenty"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Все проценты
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // =====================================================
  // SPECIFIC-VALUE PAGE
  // =====================================================
  const { typeId, typeSlug, value1, value2 } = parsed;
  const calcType = getPercentageTypeBySlug(typeSlug);
  if (!calcType) {
    notFound();
  }

  const { result, explanation } = calculateByType(typeId, value1, value2);
  const display = getSpecificPageDisplay(typeId, value1, value2, result, explanation);

  const formattedResult =
    typeId === 'number-is-percent-of'
      ? `${result.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}%`
      : result.toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
          minimumFractionDigits: result % 1 === 0 ? 0 : 2,
        });

  return (
    <div className="flex flex-col min-h-full">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <Link href="/procenty" className="hover:text-foreground transition-colors">
              Проценты
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{display.h1}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">{display.h1}</h1>
          <p className="text-lg text-muted-foreground">{display.subhead}</p>
        </div>

        {/* Prominent Result Card */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">{display.resultLabel}</p>
              <p className="text-4xl font-bold text-primary mb-2">{display.resultValue}</p>
              <p className="text-sm text-muted-foreground">{display.formulaLine}</p>
            </div>
          </CardContent>
        </Card>

        {/* Calculator pre-filled */}
        <PercentageCalculator
          initialType={typeSlug}
          initialValue1={value1}
          initialValue2={value2}
        />

        {/* Formula Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Формула расчёта
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{calcType.formula}</p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                <strong>Решение:</strong> {explanation}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        {display.faq.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Часто задаваемые вопросы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {display.faq.map((item, idx) => (
                <div key={idx}>
                  <h3 className="font-medium mb-1">{item.q}</h3>
                  <p
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/procenty"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Все проценты
          </Link>
        </div>
      </main>
    </div>
  );
}
