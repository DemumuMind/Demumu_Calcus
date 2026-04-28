import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SchemaInjector } from '@/components/seo/schema-injector';
import { generateCategorySchema, generateBreadcrumbSchema } from '@/lib/schema';
import { Metadata } from 'next';
import { ArrowRight, Calculator } from 'lucide-react';
import { categories } from '@/lib/categories';
import { getCalculatorsByCategory } from '@/lib/calculators';
import { getCategoryStyle, getSubcategoryIcon } from '@/lib/category-styles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchBox } from '@/components/search/search-box';
import { YandexAdBlock } from '@/components/ads/ad-placeholder';
import { AD_BLOCK_IDS } from '@/lib/ads/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus-site.vercel.app';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find(c => c.slug === categorySlug);

  if (!category) {
    return { title: 'Категория не найдена' };
  }

  const url = `${SITE_URL}/${categorySlug}`;

  return {
    title: `${category.title} — онлайн калькуляторы | Calcus`,
    description: category.description,
    openGraph: {
      title: category.title,
      description: category.description,
      url,
      siteName: 'Calcus',
      type: 'website',
      locale: 'ru_RU',
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = categories.find(c => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const calculators = getCalculatorsByCategory(categorySlug);
  const style = getCategoryStyle(categorySlug);
  const CategoryIcon = style.icon;

  const schemas = [
    generateCategorySchema(categorySlug),
    generateBreadcrumbSchema([
      { name: 'Главная', url: SITE_URL },
      { name: category.title, url: `${SITE_URL}/${categorySlug}` },
    ]),
  ];

  return (
    <div className="flex flex-col min-h-full">
      <SchemaInjector schemas={schemas} />

      <section className={`border-b py-12 md:py-16 bg-gradient-to-b ${style.gradient}`}>
        <div className="mx-auto max-w-7xl px-4">
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{category.title}</span>
          </nav>

          <div className="flex items-center gap-4 mb-6">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${style.bgColor} ${style.color}`}>
              <CategoryIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">{category.title}</h1>
              <p className="text-muted-foreground mt-1">
                {calculators.length} инструментов • {category.subcategories.length} подкатегорий
              </p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            {category.description}
          </p>

          <div className="max-w-md">
            <SearchBox />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 w-full">
        <YandexAdBlock blockId={AD_BLOCK_IDS.categoryTop} renderTo="yandex_rtb_R-A-99999999-5" size="leaderboard" className="mb-8" />

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Подкатегории</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.subcategories.map((subcategory) => {
              const subCalculators = calculators.filter(c => c.subcategory === subcategory.slug);
              const SubIcon = getSubcategoryIcon(subcategory.slug);

              return (
                <Link key={subcategory.id} href={`/${category.slug}/podkat/${subcategory.slug}`}>
                  <Card className={`group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border-2 hover:border-primary/20`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.bgColor} ${style.color}`}>
                          <SubIcon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {subcategory.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {subcategory.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {subCalculators.length} калькуляторов
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {calculators.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Все калькуляторы</h2>
              <span className="text-sm text-muted-foreground">
                {calculators.length} инструментов
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {calculators.map((calc) => (
                <Link key={calc.id} href={`/${calc.slug}`}>
                  <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border-2 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.bgColor} ${style.color}`}>
                          <Calculator className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-1">
                          {calc.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {calc.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        <span>Открыть калькулятор</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {calculators.length === 0 && (
          <div className="text-center py-12">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${style.bgColor}`}>
              <Calculator className={`h-8 w-8 ${style.color}`} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Калькуляторы в разработке</h3>
            <p className="text-muted-foreground">
              Подкатегории созданы, калькуляторы скоро появятся
            </p>
          </div>
        )}

        <YandexAdBlock blockId={AD_BLOCK_IDS.categoryBottom} renderTo="yandex_rtb_R-A-99999999-6" size="rectangle" className="mt-8 mx-auto" />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}
