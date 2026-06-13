import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { Card } from '@/components/ui/card';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { SchemaInjector } from '@/components/seo/schema-injector';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus.ru';

export const metadata: Metadata = {
  title: 'Полезные статьи — руководства по расчётам и конвертации | Calcus',
  description:
    'Сборник полезных статей: как рассчитать ИМТ, проценты, кредит, НДС, перевод единиц измерения, кулинарные меры и многое другое.',
  openGraph: {
    title: 'Полезные статьи — руководства по расчётам и конвертации',
    description: 'Сборник статей с формулами, таблицами и инструкциями по онлайн-расчётам.',
    url: `${SITE_URL}/stati`,
    siteName: 'Calcus',
    type: 'website',
    locale: 'ru_RU',
  },
  alternates: {
    canonical: `${SITE_URL}/stati`,
  },
};

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Полезные статьи — Calcus',
    description: 'Сборник статей с формулами, таблицами и инструкциями по онлайн-расчётам.',
    url: `${SITE_URL}/stati`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Статьи',
          item: `${SITE_URL}/stati`,
        },
      ],
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <SchemaInjector schemas={schema} />

      {/* Breadcrumbs */}
      <nav className="mb-6" aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-1.5">
            <Link href="/" className="transition-colors hover:text-foreground">
              Главная
            </Link>
          </li>
          <li role="presentation" aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li className="inline-flex items-center gap-1.5">
            <span className="font-normal text-foreground">Статьи</span>
          </li>
        </ol>
      </nav>

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Полезные статьи
          </h1>
          <p className="text-sm text-muted-foreground">
            Руководства по расчётам, конвертации и измерениям
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.slug} href={`/stati/${article.slug}`}>
            <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border hover:border-primary/20 p-5">
              <h2 className="text-base font-semibold group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {article.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {article.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
                <span>Читать</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
