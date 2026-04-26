import { categories } from '@/lib/categories';

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

  return params;
}

interface RedirectPageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { category, subcategory } = await params;
  const redirectUrl = `/${category}/podkat/${subcategory}`;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <meta httpEquiv="refresh" content={`0; url=${redirectUrl}`} />
      <p className="text-muted-foreground">
        Перенаправление... Если ничего не произошло,{' '}
        <a href={redirectUrl} className="text-primary underline">
          нажмите здесь
        </a>
        .
      </p>
    </div>
  );
}
