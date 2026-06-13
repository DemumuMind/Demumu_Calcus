import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRightLeft, ChefHat, HelpCircle } from 'lucide-react';
import {
  cookingIngredients,
  standardMeasures,
  gramsToMeasure,
  generateCookingSlug,
  generateReverseCookingSlug,
  resolveReverseCookingSlug,
  getMeasurePluralForm,
} from '@/lib/cooking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus.ru';

interface ReverseCookingPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

function parseReverseSlug(slug: string[]): { grams: number; ingredientId: string; measureId: string } | null {
  if (slug.length !== 1) return null;

  const resolved = resolveReverseCookingSlug(slug[0]);
  if (resolved) {
    return resolved;
  }

  // Fallback: try to parse manually by building slug and comparing
  for (const grams of [50, 100, 150, 200, 250, 300, 500]) {
    for (const ingredient of Object.values(cookingIngredients)) {
      for (const measure of Object.values(standardMeasures)) {
        const expectedSlug = generateReverseCookingSlug(ingredient.id, measure.id, grams);
        if (expectedSlug === slug[0]) {
          return { grams, ingredientId: ingredient.id, measureId: measure.id };
        }
      }
    }
  }

  return null;
}

export async function generateMetadata({ params }: ReverseCookingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseReverseSlug(slug);

  if (!parsed) {
    return { title: 'Конвертер не найден' };
  }

  const ingredient = cookingIngredients[parsed.ingredientId];
  const measure = standardMeasures[parsed.measureId];

  if (!ingredient || !measure) {
    return { title: 'Конвертер не найден' };
  }

  const result = gramsToMeasure(parsed.ingredientId, parsed.measureId, parsed.grams);
  const measureName = getMeasurePluralForm(parsed.measureId, result);
  const resultFormatted = result < 10 ? result.toFixed(1) : result.toFixed(0);

  const title = `${parsed.grams} грамм ${ingredient.name} — сколько ${measureName}`;
  const description = `${parsed.grams} грамм ${ingredient.name} = ${resultFormatted} ${measureName}. Точный перевод граммов в кулинарные меры онлайн.`;
  const url = `${SITE_URL}/kulinarnye-mery/reverse/${slug[0]}`;

  return {
    title,
    description,
    keywords: `${parsed.grams} грамм ${ingredient.name}, ${measure.name}, кулинарные меры, перевод граммов, сколько ${measureName} в ${parsed.grams} граммах`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Calcus',
    },
  };
}

export function generateStaticParams() {
  const params: Array<{ slug: string[] }> = [];
  const gramsValues = [50, 100, 250, 500];
  const popularIngredients = [
    'wheat_flour',
    'sugar',
    'salt',
    'butter',
    'milk',
    'vegetable_oil',
  ];
  const popularMeasures = ['teaspoon', 'tablespoon', 'shot', 'faceted_glass'];

  for (const grams of gramsValues) {
    for (const ingredientId of popularIngredients) {
      for (const measureId of popularMeasures) {
        const slug = generateReverseCookingSlug(ingredientId, measureId, grams);
        if (slug) {
          params.push({ slug: [slug] });
        }
      }
    }
  }

  return params;
}

export default async function ReverseCookingPage({ params }: ReverseCookingPageProps) {
  const { slug } = await params;
  const parsed = parseReverseSlug(slug);

  if (!parsed) {
    notFound();
  }

  const ingredient = cookingIngredients[parsed.ingredientId];
  const measure = standardMeasures[parsed.measureId];

  if (!ingredient || !measure) {
    notFound();
  }

  const result = gramsToMeasure(parsed.ingredientId, parsed.measureId, parsed.grams);
  const resultFormatted = result < 10 ? result.toFixed(1) : result.toFixed(0);
  const measurePlural = getMeasurePluralForm(parsed.measureId, result);

  const forwardSlugPath = `/kulinarnye-mery/${generateCookingSlug(ingredient.id, measure.id)}`;

  // Related gram values for this ingredient+measure combo
  const relatedGrams = [50, 100, 150, 200, 250, 300, 500].filter((g) => g !== parsed.grams);

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
            <Link href="/kulinarnye-mery" className="hover:text-foreground transition-colors">
              Кулинарные меры
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">
              {parsed.grams} г {ingredient.name} в {measure.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            {parsed.grams} грамм {ingredient.name} — сколько {measurePlural}
          </h1>
          <p className="text-lg text-muted-foreground">
            Точный перевод {parsed.grams} грамм {ingredient.name} в {measure.name}. 
            Результат с формулой и таблицей ниже.
          </p>
        </div>

        {/* Prominent Result */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {parsed.grams} грамм {ingredient.name} =
              </p>
              <p className="text-4xl font-bold text-primary mb-2">
                {resultFormatted} {measurePlural}
              </p>
              <p className="text-sm text-muted-foreground">
                {parsed.grams} ÷ {measure.volumeMl} мл × 250 мл ÷ {ingredient.gramsPerCup} г/стакан = {resultFormatted} {measure.shortName}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Formula Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              Формула расчёта
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Чтобы перевести граммы {ingredient.name} в {measure.name}, используйте формулу:
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm">
                <strong>Шаг 1:</strong> Определите вес {ingredient.name} в одном стакане (250 мл):{' '}
                <strong>{ingredient.gramsPerCup} г</strong>.
              </p>
              <p className="text-sm">
                <strong>Шаг 2:</strong> Рассчитайте вес {ingredient.name} в 1 {measure.shortName}:{' '}
                {ingredient.gramsPerCup} × ({measure.volumeMl} ÷ 250) ={' '}
                <strong>{(ingredient.gramsPerCup * (measure.volumeMl / 250)).toFixed(1)} г</strong>.
              </p>
              <p className="text-sm">
                <strong>Шаг 3:</strong> Разделите нужное количество граммов на вес в 1 {measure.shortName}:{' '}
                {parsed.grams} ÷ {(ingredient.gramsPerCup * (measure.volumeMl / 250)).toFixed(1)} ={' '}
                <strong>{resultFormatted} {measurePlural}</strong>.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Gram Values */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-base">Похожие расчёты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {relatedGrams.map((grams) => {
                const relatedResult = gramsToMeasure(parsed.ingredientId, parsed.measureId, grams);
                const relatedSlug = generateReverseCookingSlug(parsed.ingredientId, parsed.measureId, grams);
                const relatedFormatted = relatedResult < 10 ? relatedResult.toFixed(1) : relatedResult.toFixed(0);
                const relatedPlural = getMeasurePluralForm(parsed.measureId, relatedResult);
                return (
                  <Link
                    key={grams}
                    href={`/kulinarnye-mery/reverse/${relatedSlug}`}
                    className="flex justify-between py-2 border-b last:border-0 hover:bg-muted/50 transition-colors px-2 -mx-2 rounded"
                  >
                    <span className="text-sm">
                      {grams} г {ingredient.name} =
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {relatedFormatted} {relatedPlural}
                    </span>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Forward Converter Link */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-primary" />
              Обратный перевод
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Нужно перевести {measure.name} в граммы? Используйте прямой конвертер.
            </p>
            <Link
              href={forwardSlugPath}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
            >
              <ArrowRightLeft className="h-4 w-4" />
              {measure.name} {ingredient.name} в граммы
            </Link>
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
                Сколько {measurePlural} в {parsed.grams} граммах {ingredient.name}?
              </h3>
              <p className="text-sm text-muted-foreground">
                В {parsed.grams} граммах {ingredient.name} содержится <strong>{resultFormatted} {measurePlural}</strong>.
                Для расчёта используется формула: {parsed.grams} ÷ {(ingredient.gramsPerCup * (measure.volumeMl / 250)).toFixed(1)} = {resultFormatted}.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">
                Как перевести граммы {ingredient.name} в {measure.name}?
              </h3>
              <p className="text-sm text-muted-foreground">
                Чтобы перевести граммы {ingredient.name} в {measure.name}, разделите количество граммов на вес
                одной меры. 1 {measure.shortName} {ingredient.name} весит примерно{' '}
                {(ingredient.gramsPerCup * (measure.volumeMl / 250)).toFixed(1)} г.
                Значит, {parsed.grams} г ÷ {(ingredient.gramsPerCup * (measure.volumeMl / 250)).toFixed(1)} г = {resultFormatted} {measurePlural}.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">
                Сколько граммов {ingredient.name} в 1 {measure.shortName}?
              </h3>
              <p className="text-sm text-muted-foreground">
                В 1 {measure.shortName} {ingredient.name} содержится примерно{' '}
                {(ingredient.gramsPerCup * (measure.volumeMl / 250)).toFixed(1)} г.
                Это значение основано на средней плотности продукта и может незначительно отличаться в зависимости
                от сорта и влажности.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">
                Почему результат может отличаться от реального?
              </h3>
              <p className="text-sm text-muted-foreground">
                Расчёты основаны на средних значениях плотности {ingredient.name}. Фактический вес может
                варьироваться в зависимости от влажности, температуры, сорта продукта и степени утрамбовки.
                Для точных измерений рекомендуется использовать кухонные весы.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/kulinarnye-mery"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Все кулинарные меры
          </Link>
        </div>
      </main>
    </div>
  );
}
