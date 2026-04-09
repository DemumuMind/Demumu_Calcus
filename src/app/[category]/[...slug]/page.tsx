import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowLeft, ArrowRight, Calculator } from 'lucide-react';
import { 
  allUnitCategories, 
  convert, 
  UnitCategory 
} from '@/lib/units';
import { UniversalConverter } from '@/components/calculator/universal-converter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ConverterPageProps {
  params: Promise<{
    category: string;
    slug: string[];
  }>;
}

// Find category by slug
function findCategoryBySlug(slug: string): UnitCategory | undefined {
  return Object.values(allUnitCategories).find(cat => cat.slug === slug);
}

// Parse slug array to extract from and to units
function parseSlug(slug: string[]): { from: string; to: string } | null {
  // Expected format: ['from-unit', 'v', 'to-unit']
  if (slug.length !== 3 || slug[1] !== 'v') {
    return null;
  }
  return { from: slug[0], to: slug[2] };
}

// Generate metadata for each converter page
export async function generateMetadata({ params }: ConverterPageProps): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  const parsed = parseSlug(slug);
  
  if (!parsed) {
    return { title: 'Конвертер не найден' };
  }
  
  const { from, to } = parsed;
  const category = findCategoryBySlug(categorySlug);
  
  if (!category) {
    return { title: 'Конвертер не найден' };
  }

  const fromUnit = category.units[from];
  const toUnit = category.units[to];
  
  if (!fromUnit || !toUnit) {
    return { title: 'Конвертер не найден' };
  }

  const title = `${fromUnit.name} в ${toUnit.name} — онлайн конвертер`;
  const description = `Конвертируйте ${fromUnit.name} (${fromUnit.shortName}) в ${toUnit.name} (${toUnit.shortName}) онлайн. Быстрый и точный перевод ${category.name.toLowerCase()}.`;
  const keywords = `${fromUnit.name}, ${toUnit.name}, ${fromUnit.shortName}, ${toUnit.shortName}, конвертер, перевод, ${category.name.toLowerCase()}, онлайн`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

// Generate limited converter combinations for static generation
export function generateStaticParams() {
  const params: Array<{ category: string; slug: string[] }> = [];
  
  Object.values(allUnitCategories).forEach((category) => {
    const units = Object.keys(category.units);
    
    // Generate limited combinations - only common ones to avoid build issues
    // Focus on first 5 units in each category
    const priorityUnits = units.slice(0, 5);
    
    for (let i = 0; i < priorityUnits.length; i++) {
      for (let j = 0; j < priorityUnits.length; j++) {
        if (i !== j) {
          params.push({
            category: category.slug,
            slug: [priorityUnits[i], 'v', priorityUnits[j]],
          });
        }
      }
    }
  });
  
  console.log(`Generated ${params.length} static converter pages (reduced set)`);
  return params;
}

// Main page component
export default async function ConverterPage({ params }: ConverterPageProps) {
  const { category: categorySlug, slug } = await params;
  
  // Parse the slug
  const parsed = parseSlug(slug);
  if (!parsed) {
    notFound();
  }
  
  const { from, to } = parsed;
  
  // Find category
  const category = findCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }

  // Validate units exist
  const fromUnit = category.units[from];
  const toUnit = category.units[to];
  
  if (!fromUnit || !toUnit) {
    notFound();
  }

  // Get all unit IDs for navigation
  const unitIds = Object.keys(category.units);
  const currentIndex = unitIds.indexOf(from);
  const prevUnit = currentIndex > 0 ? unitIds[currentIndex - 1] : null;
  const nextUnit = currentIndex < unitIds.length - 1 ? unitIds[currentIndex + 1] : null;

  // Generate related converters (other combinations with same "from" unit)
  const relatedConverters = unitIds
    .filter(unitId => unitId !== from && unitId !== to)
    .slice(0, 4)
    .map(unitId => ({
      from,
      to: unitId,
      fromUnit: category.units[from],
      toUnit: category.units[unitId],
    }));

  // Generate conversion table
  const conversionTable = [1, 10, 100].map(val => ({
    fromValue: val,
    toValue: convert(val, from, to, category),
  }));

  return (
    <div className="flex flex-col min-h-full">
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-converter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: `Конвертировать ${fromUnit.name} в ${toUnit.name}`,
            description: `Конвертер ${category.name}: перевод ${fromUnit.name} в ${toUnit.name}.`,
            totalTime: 'PT1M',
            step: [
              {
                '@type': 'HowToStep',
                name: `Введите значение в ${fromUnit.name}`,
                text: `Введите числовое значение в поле "Из" для ${fromUnit.name}.`,
                url: `https://calcus.su/${category.slug}/${from}-v-${to}`
              },
              {
                '@type': 'HowToStep',
                name: 'Выберите единицы измерения',
                text: `Убедитесь, что выбраны ${fromUnit.name} для конвертации из и ${toUnit.name} для конвертации в.`,
                url: `https://calcus.su/${category.slug}/${from}-v-${to}`
              },
              {
                '@type': 'HowToStep',
                name: 'Получите результат',
                text: `Результат конвертации отображается автоматически.`,
                url: `https://calcus.su/${category.slug}/${from}-v-${to}`
              }
            ]
          })
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <Link 
              href={`/${category.slug}`} 
              className="hover:text-foreground transition-colors"
            >
              {category.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">
              {fromUnit.name} в {toUnit.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            {fromUnit.name} в {toUnit.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            Конвертер {category.name.toLowerCase()}. Переводите точно и быстро.
          </p>
        </div>

        {/* Converter Component */}
        <UniversalConverter 
          category={category}
          initialFrom={from}
          initialTo={to}
          initialValue={1}
        />

        {/* Conversion Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Таблица перевода {fromUnit.name} в {toUnit.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">{fromUnit.name}</th>
                    <th className="px-4 py-3 text-left font-medium">{toUnit.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {conversionTable.map((row, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="px-4 py-3">
                        {row.fromValue} {fromUnit.shortName}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {row.toValue.toLocaleString('ru-RU', { maximumFractionDigits: 6 })} {toUnit.shortName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          {prevUnit ? (
            <Link
              href={`/${category.slug}/${prevUnit}-v-${to}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {category.units[prevUnit].name} в {toUnit.name}
            </Link>
          ) : (
            <div />
          )}
          {nextUnit ? (
            <Link
              href={`/${category.slug}/${nextUnit}-v-${to}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {category.units[nextUnit].name} в {toUnit.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Related Converters */}
        {relatedConverters.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">
              Другие конвертации из {fromUnit.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedConverters.map((conv) => (
                <Link
                  key={conv.to}
                  href={`/${category.slug}/${conv.from}-v-${conv.to}`}
                  className="group p-4 rounded-lg border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {conv.fromUnit.name} → {conv.toUnit.name}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    1 {conv.fromUnit.shortName} = {convert(1, conv.from, conv.to, category).toLocaleString('ru-RU', { maximumFractionDigits: 4 })} {conv.toUnit.shortName}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
