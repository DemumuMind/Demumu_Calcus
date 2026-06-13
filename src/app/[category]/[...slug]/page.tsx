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
import { YandexAdBlock } from '@/components/ads/ad-placeholder';
import { AD_BLOCK_IDS } from '@/lib/ads/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus.ru';

interface ConverterPageProps {
  params: Promise<{
    category: string;
    slug: string[];
  }>;
}

function findCategoryBySlug(slug: string): UnitCategory | undefined {
  return Object.values(allUnitCategories).find(cat => cat.slug === slug);
}

function parseSlug(slug: string[]): { value?: number; from: string; to: string } | null {
  // Format: ['from', 'v', 'to'] — existing
  if (slug.length === 3 && slug[1] === 'v') {
    return { from: slug[0], to: slug[2] };
  }
  // Format: ['value', 'from', 'v', 'to'] — new specific-value
  if (slug.length === 4 && slug[2] === 'v') {
    const value = parseFloat(slug[0]);
    if (isNaN(value) || value < 0) {
      return null;
    }
    return { value, from: slug[1], to: slug[3] };
  }
  return null;
}

export async function generateMetadata({ params }: ConverterPageProps): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return { title: 'Конвертер не найден' };
  }

  const { value, from, to } = parsed;
  const category = findCategoryBySlug(categorySlug);

  if (!category) {
    return { title: 'Конвертер не найден' };
  }

  const fromUnit = category.units[from];
  const toUnit = category.units[to];

  if (!fromUnit || !toUnit) {
    return { title: 'Конвертер не найден' };
  }

  let title: string;
  let description: string;
  let url: string;

  if (value !== undefined) {
    const converted = convert(value, from, to, category);
    const formatted = converted.toLocaleString('ru-RU', { maximumFractionDigits: 6 });
    title = `${value} ${fromUnit.name} в ${toUnit.name} — ${formatted} ${toUnit.shortName}`;
    description = `${value} ${fromUnit.name} (${fromUnit.shortName}) = ${formatted} ${toUnit.name} (${toUnit.shortName}). Быстрый и точный перевод ${category.name.toLowerCase()}.`;
    url = `${SITE_URL}/${categorySlug}/${value}-${from}-v-${to}`;
  } else {
    title = `${fromUnit.name} в ${toUnit.name} — онлайн конвертер`;
    description = `Конвертируйте ${fromUnit.name} (${fromUnit.shortName}) в ${toUnit.name} (${toUnit.shortName}) онлайн. Быстрый и точный перевод ${category.name.toLowerCase()}.`;
    url = `${SITE_URL}/${categorySlug}/${from}-v-${to}`;
  }

  const keywords = `${fromUnit.name}, ${toUnit.name}, ${fromUnit.shortName}, ${toUnit.shortName}, конвертер, перевод, ${category.name.toLowerCase()}, онлайн`;

  return {
    title,
    description,
    keywords,
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

// Static generation for all converter categories with expanded popular values.
const POPULAR_CATEGORIES = [
  'dlina', 'massa', 'temperatura', 'skorost', 'obem',
  'informaciya', 'ploshchad', 'energiya', 'davlenie',
  'moshchnost', 'vremya', 'ugly',
];

const POPULAR_VALUES = ['1', '10', '100'];

const POPULAR_SIX = ['dlina', 'massa', 'temperatura', 'skorost', 'obem', 'informaciya'];
const OTHER_SIX = ['ploshchad', 'energiya', 'davlenie', 'moshchnost', 'vremya', 'ugly'];

function addPopularPairParams(
  categorySlug: string,
  units: string[],
  values: string[],
  add: (category: string, slug: string[]) => void
) {
  const priorityUnits = units.slice(0, 3);
  for (const from of priorityUnits) {
    for (const to of priorityUnits) {
      if (from === to) continue;
      add(categorySlug, [from, 'v', to]);
      for (const val of values) {
        add(categorySlug, [val, from, 'v', to]);
      }
    }
  }
}

function addOtherPairParams(
  categorySlug: string,
  units: string[],
  add: (category: string, slug: string[]) => void
) {
  const priorityUnits = units.slice(0, 2);
  for (const from of priorityUnits) {
    for (const to of priorityUnits) {
      if (from === to) continue;
      add(categorySlug, [from, 'v', to]);
    }
  }
}

export function generateStaticParams() {
  const seen = new Set<string>();
  const params: Array<{ category: string; slug: string[] }> = [];

  function add(category: string, slug: string[]) {
    const key = `${category}/${slug.join('/')}`;
    if (seen.has(key)) return;
    seen.add(key);
    params.push({ category, slug });
  }

  for (const category of Object.values(allUnitCategories)) {
    if (!POPULAR_CATEGORIES.includes(category.slug)) continue;
    const units = Object.keys(category.units);

    if (POPULAR_SIX.includes(category.slug)) {
      addPopularPairParams(category.slug, units, POPULAR_VALUES, add);
    } else if (OTHER_SIX.includes(category.slug)) {
      addOtherPairParams(category.slug, units, add);
    }
  }

  return params;
}

export const dynamicParams = true;

export default async function ConverterPage({ params }: ConverterPageProps) {
  const { category: categorySlug, slug } = await params;

  const parsed = parseSlug(slug);
  if (!parsed) {
    notFound();
  }

  const { value, from, to } = parsed;

  const category = findCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }

  const fromUnit = category.units[from];
  const toUnit = category.units[to];

  if (!fromUnit || !toUnit) {
    notFound();
  }

  const unitIds = Object.keys(category.units);
  const currentIndex = unitIds.indexOf(from);
  const prevUnit = currentIndex > 0 ? unitIds[currentIndex - 1] : null;
  const nextUnit = currentIndex < unitIds.length - 1 ? unitIds[currentIndex + 1] : null;

  const relatedConverters = unitIds
    .filter(unitId => unitId !== from && unitId !== to)
    .slice(0, 4)
    .map(unitId => ({
      from,
      to: unitId,
      fromUnit: category.units[from],
      toUnit: category.units[unitId],
    }));

  const conversionTable = [1, 10, 100].map(val => ({
    fromValue: val,
    toValue: convert(val, from, to, category),
  }));

  const specificValuesTable = value !== undefined
    ? [value, 1, 5, 10, 50, 100].map(val => ({
        fromValue: val,
        toValue: convert(val, from, to, category),
        isActive: val === value,
      }))
    : null;

  const specificResult = value !== undefined
    ? convert(value, from, to, category)
    : null;

  const pageUrl = value !== undefined
    ? `${SITE_URL}/${categorySlug}/${value}-${from}-v-${to}`
    : `${SITE_URL}/${categorySlug}/${from}-v-${to}`;

  const formatNumber = (num: number): string => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.001 || Math.abs(num) > 1e6) {
      return num.toExponential(6);
    }
    return num.toLocaleString('ru-RU', {
      maximumFractionDigits: 6,
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-converter"
        type="application/ld+json"
        strategy="lazyOnload"
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
                url: pageUrl
              },
              {
                '@type': 'HowToStep',
                name: 'Выберите единицы измерения',
                text: `Убедитесь, что выбраны ${fromUnit.name} для конвертации из и ${toUnit.name} для конвертации в.`,
                url: pageUrl
              },
              {
                '@type': 'HowToStep',
                name: 'Получите результат',
                text: `Результат конвертации отображается автоматически.`,
                url: pageUrl
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
              {value !== undefined ? `${value} ${fromUnit.name} в ${toUnit.name}` : `${fromUnit.name} в ${toUnit.name}`}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        <YandexAdBlock blockId={AD_BLOCK_IDS.converterTop} renderTo="yandex_rtb_R-A-99999999-7" size="leaderboard" className="mb-8" />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            {value !== undefined ? `${value} ${fromUnit.name} в ${toUnit.name}` : `${fromUnit.name} в ${toUnit.name}`}
          </h1>
          <p className="text-lg text-muted-foreground">
            Конвертер {category.name.toLowerCase()}. Переводите точно и быстро.
          </p>
        </div>

        {/* Prominent specific result */}
        {specificResult !== null && (
          <Card className="mb-8 border-primary/30 bg-primary/5">
            <CardContent className="py-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {value} {fromUnit.shortName} =
                </p>
                <p className="text-4xl font-bold text-primary mb-2">
                  {formatNumber(specificResult)} {toUnit.shortName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {fromUnit.name} → {toUnit.name}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Converter Component */}
        <UniversalConverter
          category={category}
          initialFrom={from}
          initialTo={to}
          initialValue={value || 1}
        />

        {/* Specific values conversion table */}
        {specificValuesTable && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Перевод {fromUnit.name} в {toUnit.name} для популярных значений
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
                    {specificValuesTable.map((row, index) => (
                      <tr
                        key={index}
                        className={row.isActive ? 'bg-primary/10 font-semibold' : 'hover:bg-muted/50'}
                      >
                        <td className="px-4 py-3">
                          {row.fromValue} {fromUnit.shortName}
                        </td>
                        <td className="px-4 py-3">
                          {formatNumber(row.toValue)} {toUnit.shortName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

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

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Часто задаваемые вопросы</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">
                Сколько {toUnit.name} в {value !== undefined ? value : 1} {fromUnit.name}?
              </h3>
              <p className="text-sm text-muted-foreground">
                {value !== undefined
                  ? `${value} ${fromUnit.name} = ${formatNumber(convert(value, from, to, category))} ${toUnit.shortName}.`
                  : `1 ${fromUnit.name} = ${formatNumber(convert(1, from, to, category))} ${toUnit.shortName}.`
                } Используйте наш конвертер для точного перевода.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">
                Как перевести {fromUnit.name} в {toUnit.name}?
              </h3>
              <p className="text-sm text-muted-foreground">
                Введите нужное значение в поле "Из", выберите {fromUnit.name} в левом списке
                и {toUnit.name} в правом — результат появится автоматически.
                Вы также можете воспользоваться таблицей перевода выше.
              </p>
            </div>
          </CardContent>
        </Card>

        <YandexAdBlock blockId={AD_BLOCK_IDS.converterBottom} renderTo="yandex_rtb_R-A-99999999-8" size="rectangle" className="mt-8 mx-auto" />

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
