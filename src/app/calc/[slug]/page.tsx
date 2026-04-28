import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calculator as CalculatorType } from '@/lib/types';
import { categories } from '@/lib/categories';
import { calculators, getCalculatorBySlug, getCalculatorsByCategory, getCalculatorsBySubcategory } from '@/lib/calculators';
import { getCategoryStyle } from '@/lib/category-styles';
import { CalculatorClientWrapper } from '@/components/calculator/calculator-client-wrapper';
import { YandexAdBlock } from '@/components/ads/ad-placeholder';
import { TableOfContents } from '@/components/table-of-contents';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { ArrowRight, ChevronRight, Clock, BookOpen, Info, HelpCircle, FileText, Calculator as CalculatorIcon, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus-site.vercel.app';

interface CalculatorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return calculators.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) return {};

  const category = categories.find((c) => c.slug === calculator.category);

  return {
    title: `${calculator.title} — онлайн калькулятор | Calcus`,
    description: calculator.description,
    openGraph: {
      title: calculator.title,
      description: calculator.description,
      url: `${SITE_URL}/${slug}`,
      siteName: 'Calcus',
      type: 'website',
      locale: 'ru_RU',
    },
    alternates: {
      canonical: `${SITE_URL}/${slug}`,
    },
  };
}

function getRelatedCalculators(calculator: CalculatorType, limit: number = 4): CalculatorType[] {
  const sameSubcategory = getCalculatorsBySubcategory(calculator.subcategory)
    .filter(c => c.slug !== calculator.slug);
  
  if (sameSubcategory.length >= limit) {
    return sameSubcategory.slice(0, limit);
  }

  const sameCategory = getCalculatorsByCategory(calculator.category)
    .filter(c => c.slug !== calculator.slug && !sameSubcategory.some(s => s.slug === c.slug));

  return [...sameSubcategory, ...sameCategory].slice(0, limit);
}

function generateCalculatorSchema(calculator: CalculatorType, slug: string, categoryTitle?: string) {
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: calculator.title,
      description: calculator.description,
      url: `${SITE_URL}/${slug}`,
      applicationCategory: 'CalculatorApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
      },
    },
  ];

  if (calculator.content.faq && calculator.content.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: calculator.content.faq.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      ...(categoryTitle
        ? [{ '@type': 'ListItem', position: 2, name: categoryTitle, item: `${SITE_URL}/${calculator.category}` }]
        : []),
      { '@type': 'ListItem', position: categoryTitle ? 3 : 2, name: calculator.title, item: `${SITE_URL}/${slug}` },
    ],
  });

  return schemas;
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  const category = categories.find((c) => c.slug === calculator.category);
  const subcategory = category?.subcategories.find((s) => s.slug === calculator.subcategory);
  const style = getCategoryStyle(calculator.category);
  const CategoryIcon = style.icon;

  const schemas = generateCalculatorSchema(calculator, slug, category?.title);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {schemas.map((schema, index) => (
        <script
          key={index}
          id={`schema-calc-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <nav className="mb-6" aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-1.5">
            <Link href="/" className="transition-colors hover:text-foreground">
              Главная
            </Link>
          </li>
          {category && (
            <>
              <li role="presentation" aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Link 
                  href={`/${category.slug}`}
                  className="transition-colors hover:text-foreground"
                >
                  {category.title}
                </Link>
              </li>
            </>
          )}
          {subcategory && (
            <>
              <li role="presentation" aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Link 
                  href={`/${category?.slug}/podkat/${subcategory.slug}`}
                  className="transition-colors hover:text-foreground"
                >
                  {subcategory.title}
                </Link>
              </li>
            </>
          )}
          <li role="presentation" aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li className="inline-flex items-center gap-1.5">
            <span className="font-normal text-foreground">{calculator.title}</span>
          </li>
        </ol>
      </nav>

      <TableOfContents items={getTocItems(calculator)} />

      <article>
        <div id="calculator" className={`mb-8 rounded-2xl p-6 bg-gradient-to-br ${style.gradient} border ${style.borderColor}`}>
          <div className="flex items-start gap-4 mb-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${style.bgColor} ${style.color}`}>
              <CategoryIcon className="h-7 w-7" />
            </div>
            <div className="flex-1 min-w-0">
              <div>
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                  {calculator.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {category?.title} {subcategory && `• ${subcategory.title}`}
                </p>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed" data-testid="calculator-description">{calculator.description}</p>
        </div>

        <YandexAdBlock blockId="R-A-99999999-3" renderTo="yandex_rtb_R-A-99999999-3" size="leaderboard" className="mb-8" />

        <div className="mb-8">
          <CalculatorClientWrapper slug={calculator.slug} type={calculator.type} />
        </div>

        <YandexAdBlock blockId="R-A-99999999-4" renderTo="yandex_rtb_R-A-99999999-4" size="rectangle" className="mb-8 mx-auto" />

        <div id="how-to" className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Как использовать</h2>
          </div>
          <Card className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              {calculator.content.howTo}
            </p>
          </Card>
        </div>

        <div id="about" className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">О калькуляторе</h2>
          </div>
          <Card className="p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {calculator.content.about}
            </p>
            {calculator.content.formula && (
              <>
                <Separator className="my-4" />
                <div id="formula">
                  <h3 className="font-semibold mb-2">Формула</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {calculator.content.formula}
                  </p>
                </div>
              </>
            )}
          </Card>
        </div>

        {calculator.content.faq && calculator.content.faq.length > 0 && (
          <div id="faq" className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Часто задаваемые вопросы</h2>
            </div>
            <Accordion className="space-y-2">
              {calculator.content.faq.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {calculator.popularCalculations && calculator.popularCalculations.length > 0 && (
          <div id="popular" className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Популярные расчёты</h2>
            </div>
            <Card className="p-6">
              <div className="flex flex-wrap gap-2">
                {calculator.popularCalculations.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-primary/5 hover:border-primary/30 transition-colors whitespace-nowrap"
                  >
                    {item.value}
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        )}

        <div id="related">
          <RelatedCalculatorsSection currentCalculator={calculator} style={style} />
        </div>

        {calculator.content.sources && calculator.content.sources.length > 0 && (
          <div id="sources" className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Источники</h2>
            </div>
            <Card className="p-6">
              <ul className="space-y-2">
                {calculator.content.sources.map((source, index) => (
                  <li key={index}>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {source.title}
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Обновлено: {calculator.content.updatedAt}</span>
        </div>
      </article>
    </div>
  );
}

function getTocItems(calculator: CalculatorType): { id: string; label: string }[] {
  const items = [
    { id: 'calculator', label: 'Калькулятор' },
    { id: 'how-to', label: 'Как использовать' },
    { id: 'about', label: 'О калькуляторе' },
  ];
  
  if (calculator.content.formula) {
    items.push({ id: 'formula', label: 'Формула' });
  }
  
  if (calculator.content.faq && calculator.content.faq.length > 0) {
    items.push({ id: 'faq', label: 'Часто задаваемые вопросы' });
  }
  
  if (calculator.popularCalculations && calculator.popularCalculations.length > 0) {
    items.push({ id: 'popular', label: 'Популярные расчёты' });
  }
  
  items.push({ id: 'related', label: 'Похожие калькуляторы' });
  
  if (calculator.content.sources && calculator.content.sources.length > 0) {
    items.push({ id: 'sources', label: 'Источники' });
  }
  
  return items;
}

function RelatedCalculatorsSection({
  currentCalculator,
  style,
}: {
  currentCalculator: CalculatorType;
  style: { bgColor: string; color: string; borderColor: string; gradient: string; icon: React.ComponentType<{ className?: string }> };
}) {
  const related = getRelatedCalculators(currentCalculator, 4);

  if (related.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <CalculatorIcon className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Похожие калькуляторы</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {related.map((calc) => (
          <Link key={calc.id} href={`/${calc.slug}`}>
            <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border-2 hover:border-primary/20">
              <div className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.bgColor} ${style.color} transition-transform duration-300 group-hover:scale-110`}>
                  <CalculatorIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                    {calc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {calc.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 ml-auto shrink-0" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
