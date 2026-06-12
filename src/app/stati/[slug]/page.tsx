import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import {
  getArticleBySlug,
  getAllArticles,
  generateArticleSchema,
  generateArticleBreadcrumbSchema,
  Article,
} from '@/lib/articles';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AdPlaceholder } from '@/components/ads/ad-placeholder';
import {
  ChevronRight,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Calculator,
  Clock,
} from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://demumu-calcus.vercel.app';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Calcus`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/stati/${slug}`,
      siteName: 'Calcus',
      type: 'article',
      locale: 'ru_RU',
    },
    alternates: {
      canonical: `${SITE_URL}/stati/${slug}`,
    },
  };
}

function ArticleContent({ article }: { article: Article }) {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="rounded-2xl border bg-gradient-to-br from-muted/60 to-background p-6 md:p-8">
        <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
          {article.content}
        </p>
      </div>

      <AdPlaceholder slot="article-top" size="leaderboard" />

      {/* Sections */}
      {article.sections.map((section, index) => (
        <section key={index} className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            {section.heading}
          </h2>
          <div className="rounded-xl border bg-card p-5 md:p-6">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {section.body}
            </p>
          </div>
        </section>
      ))}

      <AdPlaceholder slot="article-mid" size="rectangle" />

      {/* FAQ */}
      {article.faq.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Часто задаваемые вопросы
            </h2>
          </div>
          <Accordion className="space-y-2">
            {article.faq.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {/* CTA Block */}
      <section>
        <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Используйте наш калькулятор</h3>
              <p className="text-sm text-muted-foreground">{article.cta.text}</p>
            </div>
            <Button className="shrink-0">
              <Link href={article.cta.link} className="inline-flex items-center">
                {article.cta.linkText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Related Links */}
      {article.relatedLinks.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">Похожие калькуляторы</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {article.relatedLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border hover:border-primary/20 p-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-primary">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {link.title}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 shrink-0" />
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Separator />

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>Обновлено: {article.updatedAt}</span>
      </div>
    </div>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = generateArticleSchema(article);
  const breadcrumbSchema = generateArticleBreadcrumbSchema(article);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* JSON-LD Schemas */}
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="lazyOnload"
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="lazyOnload"
      />

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
            <Link href="/stati" className="transition-colors hover:text-foreground">
              Статьи
            </Link>
          </li>
          <li role="presentation" aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li className="inline-flex items-center gap-1.5">
            <span className="font-normal text-foreground">{article.title}</span>
          </li>
        </ol>
      </nav>

      <article>
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              {article.title}
            </h1>
            <p className="text-sm text-muted-foreground">Полезные статьи</p>
          </div>
        </div>

        <ArticleContent article={article} />
      </article>
    </div>
  );
}
