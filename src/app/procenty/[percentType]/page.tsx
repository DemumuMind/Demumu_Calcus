import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Percent } from 'lucide-react';
import { 
  getPercentageTypeBySlug,
  calculateByType,
  generatePercentageTitle,
  generatePercentageDescription,
  percentageTypes,
} from '@/lib/percentages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PercentageCalculator } from '@/components/calculator/percentage-calculator';

interface PercentageCalcPageProps {
  params: Promise<{
    percentType: string;
  }>;
  searchParams?: Promise<{ v1?: string; v2?: string }>;
}

// Generate static params for percentage types (without value combinations)
export function generateStaticParams() {
  const params = percentageTypes.map((type) => ({ 
    percentType: type.slug 
  }));
  
  console.log(`Generated ${params.length} percentage type pages`);
  return params;
}

// Generate metadata for each page
export async function generateMetadata({ params, searchParams }: PercentageCalcPageProps): Promise<Metadata> {
  const { percentType } = await params;
  const calcType = getPercentageTypeBySlug(percentType);
  
  if (!calcType) {
    return { title: 'Калькулятор не найден' };
  }

  const query = await searchParams || {};
  const num1 = parseFloat(query.v1 || '100');
  const num2 = parseFloat(query.v2 || '25');
  const { result } = calculateByType(calcType.id, num1, num2);

  const title = generatePercentageTitle(calcType, num1, num2);
  const description = generatePercentageDescription(calcType, num1, num2, result);

  return {
    title,
    description,
    keywords: `${calcType.title}, проценты, калькулятор, онлайн`,
  };
}

export default async function PercentageCalcPage({ params, searchParams }: PercentageCalcPageProps) {
  const { percentType } = await params;
  const calcType = getPercentageTypeBySlug(percentType);
  
  if (!calcType) {
    notFound();
  }

  const query = await searchParams || {};
  const num1 = parseFloat(query.v1 || '25');
  const num2 = parseFloat(query.v2 || '100');
  
  if (isNaN(num1) || isNaN(num2)) {
    notFound();
  }

  const { result, explanation } = calculateByType(calcType.id, num1, num2);

  // Generate related calculations
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
            <Link 
              href="/procenty" 
              className="hover:text-foreground transition-colors"
            >
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
          initialType={percentType}
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
                  href={`/procenty/${percentType}?v1=${calc.value}&v2=${num2}`}
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
