import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChefHat, ArrowLeft } from 'lucide-react';
import { 
  cookingIngredients, 
  standardMeasures,
  measureToGrams,
  generateCookingSlug,
  resolveCookingSlug,
} from '@/lib/cooking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CookingConverter } from '@/components/calculator/cooking-converter';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus-site.vercel.app';

interface CookingConverterPageProps {
  params: Promise<{
    cookingId: string;
  }>;
}

function parseCookingSlug(cookingId: string): { ingredientId: string; measureId: string } | null {
  // Use O(1) precomputed lookup map instead of nested iteration
  const resolved = resolveCookingSlug(cookingId);
  if (resolved) {
    return resolved;
  }

  // Fallback for edge-cases not in the precomputed map
  for (const ingredient of Object.values(cookingIngredients)) {
    for (const measure of Object.values(standardMeasures)) {
      const expectedSlug = generateCookingSlug(ingredient.id, measure.id);
      if (expectedSlug === cookingId) {
        return { ingredientId: ingredient.id, measureId: measure.id };
      }
    }
  }
  return null;
}

export async function generateMetadata({ params }: CookingConverterPageProps): Promise<Metadata> {
  const { cookingId } = await params;
  const parsed = parseCookingSlug(cookingId);
  
  if (!parsed) {
    return { title: 'Конвертер не найден' };
  }

  const ingredient = cookingIngredients[parsed.ingredientId];
  const measure = standardMeasures[parsed.measureId];
  
  if (!ingredient || !measure) {
    return { title: 'Конвертер не найден' };
  }

  const title = `${measure.name} ${ingredient.name} — сколько граммов`;
  const description = `Сколько граммов ${ingredient.name} в ${measure.name}. Точный перевод кулинарных мер в граммы онлайн.`;
  const url = `${SITE_URL}/kulinarnye-mery/${cookingId}`;

  return {
    title,
    description,
    keywords: `${measure.name}, ${ingredient.name}, сколько грамм, кулинарные меры, перевод`,
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
  const params: Array<{ cookingId: string }> = [];

  Object.keys(cookingIngredients).forEach((ingredientId) => {
    Object.keys(standardMeasures).forEach((measureId) => {
      const slug = generateCookingSlug(ingredientId, measureId);
      if (slug) {
        params.push({ cookingId: slug });
      }
    });
  });

  console.log(`Generated ${params.length} cooking converter pages`);
  return params;
}

export default async function CookingConverterPage({ params }: CookingConverterPageProps) {
  const { cookingId } = await params;
  const parsed = parseCookingSlug(cookingId);
  
  if (!parsed) {
    notFound();
  }

  const ingredient = cookingIngredients[parsed.ingredientId];
  const measure = standardMeasures[parsed.measureId];
  
  if (!ingredient || !measure) {
    notFound();
  }

  const conversionTable = [
    { quantity: 1, grams: measureToGrams(ingredient.id, measure.id, 1) },
    { quantity: 2, grams: measureToGrams(ingredient.id, measure.id, 2) },
    { quantity: 5, grams: measureToGrams(ingredient.id, measure.id, 5) },
    { quantity: 10, grams: measureToGrams(ingredient.id, measure.id, 10) },
  ];

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
              href="/kulinarnye-mery" 
              className="hover:text-foreground transition-colors"
            >
              Кулинарные меры
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">
              {measure.name} {ingredient.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            {measure.name} {ingredient.name} — сколько граммов
          </h1>
          <p className="text-lg text-muted-foreground">
            Точный перевод {measure.name} {ingredient.name} в граммы. 
            Используйте конвертер или таблицу ниже.
          </p>
        </div>

        {/* Converter */}
        <CookingConverter
          initialIngredient={ingredient.id}
          initialMeasure={measure.id}
          initialValue={1}
        />

        {/* Conversion Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">
              Таблица: {measure.name} {ingredient.name} в граммах
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-medium">
                      {measure.shortName}
                    </th>
                    <th className="text-left py-2 px-3 font-medium">
                      Граммы
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {conversionTable.map((row, idx) => (
                    <tr 
                      key={idx} 
                      className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-3">
                        {row.quantity} {measure.shortName} {ingredient.name}
                      </td>
                      <td className="py-3 px-3 font-medium text-primary">
                        {row.grams.toFixed(1)} г
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">О продукте</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>{ingredient.name}</strong> — {ingredient.category === 'flour' && 'мука и мучные изделия'}
              {ingredient.category === 'grains' && 'крупы и злаки'}
              {ingredient.category === 'sugar' && 'сахар и сладости'}
              {ingredient.category === 'seasonings' && 'приправы и специи'}
              {ingredient.category === 'dairy' && 'молочные продукты'}
              {ingredient.category === 'fats' && 'жиры и масла'}
              {ingredient.category === 'nuts' && 'орехи и сухофрукты'}
              {ingredient.category === 'syrups' && 'мёд и сиропы'}
              {ingredient.category === 'other' && 'другие продукты'}.
            </p>
            <p className="text-muted-foreground">
              Объём {measure.name} составляет {measure.volumeMl} мл. 
              Плотность {ingredient.name} определяет, сколько граммов вмещается в эту меру.
              Для точных измерений используйте кухонные весы.
            </p>
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
