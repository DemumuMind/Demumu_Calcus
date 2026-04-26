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

const SPECIFIC_VALUE_N = [1, 5, 10, 15, 20, 25, 30, 50, 75];
const SPECIFIC_VALUE_M = [100, 200, 500, 1000];
const SPECIFIC_VALUE_TYPE_SLUG = 'procentov-ot-chisla';
const SPECIFIC_VALUE_TYPE_ID = 'percent-of-number';

interface PercentagePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

type PageMode =
  | { kind: 'type'; typeSlug: string }
  | { kind: 'specific'; percent: number; baseNumber: number };

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

  // Specific-value page: ['N', 'procentov', 'ot', 'M']
  if (slug.length === 4 && slug[1] === 'procentov' && slug[2] === 'ot') {
    const percent = parseFloat(slug[0]);
    const baseNumber = parseFloat(slug[3]);
    if (!isNaN(percent) && !isNaN(baseNumber)) {
      return { kind: 'specific', percent, baseNumber };
    }
    return null;
  }

  return null;
}

export function generateStaticParams() {
  const params: Array<{ slug: string[] }> = [];

  // 1. All 7 percentage type pages
  for (const type of percentageTypes) {
    params.push({ slug: [type.slug] });
  }

  // 2. Specific-value pages for percent-of-number
  for (const n of SPECIFIC_VALUE_N) {
    for (const m of SPECIFIC_VALUE_M) {
      params.push({ slug: [n.toString(), 'procentov', 'ot', m.toString()] });
    }
  }

  console.log(`Generated ${params.length} percentage pages (${percentageTypes.length} types + ${params.length - percentageTypes.length} specific-value)`);
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
  const { percent, baseNumber } = parsed;
  const result = (percent * baseNumber) / 100;
  const formattedResult = result.toLocaleString('ru-RU', { maximumFractionDigits: 2 });

  const title = `${percent}% от ${baseNumber} — ${formattedResult}`;
  const description = `Сколько составляет ${percent}% от ${baseNumber}? Результат: ${formattedResult}. Онлайн калькулятор процентов с формулой и объяснением.`;
  const url = `${SITE_URL}/procenty/${percent}-procentov-ot-${baseNumber}`;

  return {
    title,
    description,
    keywords: `${percent} процентов от ${baseNumber}, процент от числа, калькулятор процентов, онлайн`,
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
  // SPECIFIC-VALUE PAGE (new)
  // =====================================================
  const { percent, baseNumber } = parsed;
  const result = (percent * baseNumber) / 100;
  const formattedResult = result.toLocaleString('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: result % 1 === 0 ? 0 : 2,
  });

  // Calc type used for the pre-filled calculator
  const calcType = getPercentageTypeBySlug(SPECIFIC_VALUE_TYPE_SLUG)!;
  const { explanation } = calculateByType(SPECIFIC_VALUE_TYPE_ID, percent, baseNumber);

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
            <span className="text-foreground">
              {percent}% от {baseNumber}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            {percent}% от {baseNumber} — результат
          </h1>
          <p className="text-lg text-muted-foreground">
            Сколько составляет {percent} процентов от {baseNumber}? Рассчитайте онлайн с формулой.
          </p>
        </div>

        {/* Prominent Result Card */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {percent}% от {baseNumber} =
              </p>
              <p className="text-4xl font-bold text-primary mb-2">
                {formattedResult}
              </p>
              <p className="text-sm text-muted-foreground">
                ({percent} × {baseNumber}) ÷ 100 = {formattedResult}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Calculator pre-filled */}
        <PercentageCalculator
          initialType={SPECIFIC_VALUE_TYPE_SLUG}
          initialValue1={percent}
          initialValue2={baseNumber}
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
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Часто задаваемые вопросы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">
                Сколько составляет {percent}% от {baseNumber}?
              </h3>
              <p className="text-sm text-muted-foreground">
                {percent}% от {baseNumber} составляет <strong>{formattedResult}</strong>.
                Для расчёта используется формула: ({percent} × {baseNumber}) ÷ 100 = {formattedResult}.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">
                Как посчитать {percent} процентов от {baseNumber}?
              </h3>
              <p className="text-sm text-muted-foreground">
                Чтобы посчитать {percent} процентов от {baseNumber}, умножьте {baseNumber} на {percent} и разделите на 100:
                ({baseNumber} × {percent}) ÷ 100 = {formattedResult}.
                Используйте калькулятор выше, чтобы быстро получить результат для любых чисел.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">
                Как найти {percent}% от любого числа?
              </h3>
              <p className="text-sm text-muted-foreground">
                Чтобы найти {percent}% от любого числа, умножьте это число на {percent} и разделите результат на 100.
                Например, {percent}% от 500 = {((percent * 500) / 100).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}.
              </p>
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
