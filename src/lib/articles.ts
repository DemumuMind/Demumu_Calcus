export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  sections: ArticleSection[];
  faq: Array<{ question: string; answer: string }>;
  cta: {
    text: string;
    link: string;
    linkText: string;
  };
  relatedLinks: Array<{ title: string; href: string }>;
  keywords: string;
  updatedAt: string;
}

export interface ArticleSection {
  heading: string;
  body: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://demumu-calcus.vercel.app';

/** Helper to reduce repetitive article object structure */
export function makeArticle(
  slug: string,
  title: string,
  description: string,
  keywords: string,
  updatedAt: string,
  content: string,
  sections: ArticleSection[],
  faq: Array<{ question: string; answer: string }>,
  cta: { text: string; link: string; linkText: string },
  relatedLinks: Array<{ title: string; href: string }>,
): Article {
  return { slug, title, description, content, sections, faq, cta, relatedLinks, keywords, updatedAt };
}

export { additionalArticles } from './articles-additional';
export { articles } from './articles-main';

import { additionalArticles } from './articles-additional';
import { articles } from './articles-main';

const articleSlugMap = new Map<string, Article>([
  ...additionalArticles.map((a) => [a.slug, a] as const),
  ...articles.map((a) => [a.slug, a] as const),
]);

export function getArticleBySlug(slug: string): Article | undefined {
  return articleSlugMap.get(slug);
}

export function getAllArticles(): Article[] {
  return [...additionalArticles, ...articles];
}

export function generateArticleSchema(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/stati/${article.slug}`,
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Calcus',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calcus',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-192x192.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/stati/${article.slug}`,
    },
  };
}

export function generateArticleBreadcrumbSchema(article: Article) {
  return {
    '@context': 'https://schema.org',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${SITE_URL}/stati/${article.slug}`,
      },
    ],
  };
}
