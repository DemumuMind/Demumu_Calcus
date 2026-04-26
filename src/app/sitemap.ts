import { MetadataRoute } from 'next';
import { categories } from '@/lib/categories';
import { calculators } from '@/lib/calculators';
import { allUnitCategories } from '@/lib/units';
import { cookingIngredients, standardMeasures, generateCookingSlug } from '@/lib/cooking';
import { percentageTypes } from '@/lib/percentages';
import { timerPresets } from '@/lib/timers';
import { holidays } from '@/lib/holidays';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus-clone.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];
  const now = new Date();
  
  // 1. Homepage
  routes.push({
    url: `${BASE_URL}/`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1,
  });

  // 2. Category pages
  categories.forEach((category) => {
    routes.push({
      url: `${BASE_URL}/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // 3. Subcategory pages (with podkat prefix)
  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      routes.push({
        url: `${BASE_URL}/${category.slug}/podkat/${subcategory.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  // 4. Calculator pages
  calculators.forEach((calc) => {
    routes.push({
      url: `${BASE_URL}/calc/${calc.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
    // Top-level rewrite URLs (non-canonical, slightly lower priority)
    routes.push({
      url: `${BASE_URL}/${calc.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // 5. Unit converter pages (limited set for sitemap — same 6 popular categories as generateStaticParams)
  const POPULAR_CATEGORIES = ['dlina', 'massa', 'temperatura', 'skorost', 'obem', 'informaciya'];
  Object.values(allUnitCategories).forEach((category) => {
    // Skip niche categories to keep sitemap lean and match static generation
    if (!POPULAR_CATEGORIES.includes(category.slug)) {
      return;
    }

    const unitIds = Object.keys(category.units).slice(0, 3); // Only first 3 units (match generateStaticParams)

    for (let i = 0; i < unitIds.length; i++) {
      for (let j = 0; j < unitIds.length; j++) {
        if (i !== j) {
          routes.push({
            url: `${BASE_URL}/${category.slug}/${unitIds[i]}-v-${unitIds[j]}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
          });
        }
      }
    }
  });

  // 6. Cooking pages
  routes.push({
    url: `${BASE_URL}/kulinarnye-mery`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  });

  // 7. Individual cooking converter pages — ALL combinations
  Object.keys(cookingIngredients).forEach((ingredientId) => {
    Object.keys(standardMeasures).forEach((measureId) => {
      const slug = generateCookingSlug(ingredientId, measureId);
      if (slug) {
        routes.push({
          url: `${BASE_URL}/kulinarnye-mery/${slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.4,
        });
      }
    });
  });

  // 8. Percentage calculators main page
  routes.push({
    url: `${BASE_URL}/procenty`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  });

  // 9. Individual percentage calculation pages (limited set)
  percentageTypes.forEach((calcType) => {
    routes.push({
      url: `${BASE_URL}/procenty/${calcType.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // 9a. Specific-value percentage pages (percent-of-number combinations)
  const specificN = [1, 5, 10, 15, 20, 25, 30, 50, 75];
  const specificM = [100, 200, 500, 1000];
  specificN.forEach((n) => {
    specificM.forEach((m) => {
      routes.push({
        url: `${BASE_URL}/procenty/${n}-procentov-ot-${m}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.45,
      });
    });
  });

  // 10. Timer pages
  routes.push({
    url: `${BASE_URL}/tajmery`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  });

  // 11. Individual timer pages (limited set)
  timerPresets.slice(0, 15).forEach((timer) => {
    routes.push({
      url: `${BASE_URL}/tajmery/${timer.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // 12. Holiday countdown main page
  routes.push({
    url: `${BASE_URL}/skolko-dney-do`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  });

  // 13. Individual holiday countdown pages
  holidays.forEach((holiday) => {
    routes.push({
      url: `${BASE_URL}/skolko-dney-do/${holiday.slug}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.6,
    });
  });

  console.log(`Generated sitemap with ${routes.length} URLs`);
  return routes;
}
