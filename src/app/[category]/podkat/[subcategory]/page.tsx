import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowRight, Calculator, ChevronRight } from 'lucide-react';
import { categories } from '@/lib/categories';
import { getCalculatorsBySubcategory } from '@/lib/calculators';
import { getCategoryStyle, getSubcategoryIcon } from '@/lib/category-styles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchBox } from '@/components/search/search-box';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus-site.vercel.app';

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = categories.find(c => c.slug === categorySlug);
  const subcategory = category?.subcategories.find(s => s.slug === subcategorySlug);
  
  if (!category || !subcategory) {
    return {
      title: 'Подкатегория не найдена',
    };
  }

  const title = `${subcategory.title} — ${category.title} | Calcus`;
  const url = `${SITE_URL}/${categorySlug}/podkat/${subcategorySlug}`;

  return {
    title,
    description: subcategory.description,
    keywords: `${subcategory.title.toLowerCase()}, ${category.title.toLowerCase()}, калькуляторы, онлайн, расчёт`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: subcategory.description,
      url,
      type: 'website',
      siteName: 'Calcus',
    },
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = categories.find(c => c.slug === categorySlug);
  const subcategory = category?.subcategories.find(s => s.slug === subcategorySlug);

  if (!category || !subcategory) {
    notFound();
  }

  const calculators = getCalculatorsBySubcategory(subcategorySlug);
  const style = getCategoryStyle(categorySlug);
  const CategoryIcon = style.icon;
  const SubIcon = getSubcategoryIcon(subcategorySlug);

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Header */}
      <section className={`border-b py-12 md:py-16 bg-gradient-to-b ${style.gradient}`}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center text-sm text-muted-foreground flex-wrap gap-1">
            <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${category.slug}`} className="hover:text-foreground transition-colors">
              {category.title}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{subcategory.title}</span>
          </nav>

          {/* Subcategory Title */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${style.bgColor} ${style.color}`}>
              <SubIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">{subcategory.title}</h1>
              <p className="text-muted-foreground mt-1">
                {calculators.length} калькуляторов • {category.title}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            {subcategory.description}
          </p>

          {/* Search */}
          <div className="max-w-md">
            <SearchBox />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 w-full">
        {calculators.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${style.bgColor}`}>
              <Calculator className={`h-8 w-8 ${style.color}`} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Калькуляторы в разработке</h3>
            <p className="text-muted-foreground">
              Калькуляторы для этой подкатегории скоро появятся
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];
  
  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      params.push({
        category: category.slug,
        subcategory: subcategory.slug,
      });
    }
  }
  
  console.log(`Generated ${params.length} subcategory pages`);
  return params;
}
