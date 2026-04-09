import { redirect } from 'next/navigation';
import { categories } from '@/lib/categories';

// Force static generation for all subcategory paths
export const dynamic = 'force-dynamic';
export const revalidate = false;

interface RedirectPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

// Generate static params for all subcategories (old URL format redirect)
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

// Redirect old URL format /[category]/[subcategory] to new format /[category]/podkat/[subcategory]
export default async function RedirectPage({ params }: RedirectPageProps) {
  const { category, subcategory } = await params;
  
  // Redirect to new URL format with podkat
  redirect(`/${category}/podkat/${subcategory}`);
}
