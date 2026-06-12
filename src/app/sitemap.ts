import { MetadataRoute } from 'next';
import { categories } from '@/lib/categories';
import { calculators } from '@/lib/calculators';
import { allUnitCategories } from '@/lib/units';
import { cookingIngredients, standardMeasures, generateCookingSlug } from '@/lib/cooking';
import { percentageTypes } from '@/lib/percentages';
import { timerPresets } from '@/lib/timers';
import { holidays } from '@/lib/holidays';
import { getAllArticles } from '@/lib/articles';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://demumu-calcus.vercel.app';

/** Helper to add a sitemap entry with deduplication */
function addRoute(routes: MetadataRoute.Sitemap, seen: Set<string>, url: string, priority: number, changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] = 'monthly') {
  if (!seen.has(url)) {
    seen.add(url);
    routes.push({ url, lastModified: new Date(), changeFrequency, priority });
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();
  const now = new Date();

  // 1. Homepage
  routes.push({ url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 });

  // 2. Category pages
  categories.forEach((category) => {
    routes.push({ url: `${BASE_URL}/${category.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 });
  });

  // 3. Subcategory pages (with podkat prefix)
  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      routes.push({ url: `${BASE_URL}/${category.slug}/podkat/${subcategory.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 });
    });
  });

  // 4. Calculator pages
  calculators.forEach((calc) => {
    addRoute(routes, seen, `${BASE_URL}/${calc.slug}`, 0.6);
  });

  // 5. Unit converter pages — limited static set for Vercel free tier
  const POPULAR_CATEGORIES = [
    'dlina', 'massa', 'temperatura', 'skorost', 'obem',
    'informaciya', 'ploshchad', 'energiya', 'davlenie',
    'moshchnost', 'vremya', 'ugly',
  ];

  const POPULAR_VALUES = ['1', '10', '100'];

  const POPULAR_SIX = ['dlina', 'massa', 'temperatura', 'skorost', 'obem', 'informaciya'];
  const OTHER_SIX = ['ploshchad', 'energiya', 'davlenie', 'moshchnost', 'vremya', 'ugly'];

  Object.values(allUnitCategories).forEach((category) => {
    if (!POPULAR_CATEGORIES.includes(category.slug)) {
      return;
    }

    const units = Object.keys(category.units);

    if (POPULAR_SIX.includes(category.slug)) {
      const priorityUnits = units.slice(0, 3);
      for (let i = 0; i < priorityUnits.length; i++) {
        for (let j = 0; j < priorityUnits.length; j++) {
          if (i !== j) {
            addRoute(routes, seen, `${BASE_URL}/${category.slug}/${priorityUnits[i]}-v-${priorityUnits[j]}`, 0.5);
            for (const val of POPULAR_VALUES) {
              addRoute(routes, seen, `${BASE_URL}/${category.slug}/${val}-${priorityUnits[i]}-v-${priorityUnits[j]}`, 0.45);
            }
          }
        }
      }
    } else if (OTHER_SIX.includes(category.slug)) {
      const priorityUnits = units.slice(0, 2);
      for (let i = 0; i < priorityUnits.length; i++) {
        for (let j = 0; j < priorityUnits.length; j++) {
          if (i !== j) {
            addRoute(routes, seen, `${BASE_URL}/${category.slug}/${priorityUnits[i]}-v-${priorityUnits[j]}`, 0.5);
          }
        }
      }
    }
  });

  // 6. Cooking pages
  routes.push({ url: `${BASE_URL}/kulinarnye-mery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 });

  Object.keys(cookingIngredients).forEach((ingredientId) => {
    Object.keys(standardMeasures).forEach((measureId) => {
      const slug = generateCookingSlug(ingredientId, measureId);
      if (slug) {
        routes.push({ url: `${BASE_URL}/kulinarnye-mery/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 });
      }
    });
  });

  // 7. Percentage calculators main page
  routes.push({ url: `${BASE_URL}/procenty`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 });

  // 8. Individual percentage calculation pages
  percentageTypes.forEach((calcType) => {
    routes.push({ url: `${BASE_URL}/procenty/${calcType.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 });
  });

  // 9. Specific-value percentage pages — helper to generate all N×M routes for a URL template
  const specificN = [1, 5, 10, 15, 20, 25, 30, 50, 75];
  const specificM = [100, 200, 500, 1000];

  function addSpecificValueRoutes(urlTemplate: (n: number, m: number) => string) {
    specificN.forEach((n) => {
      specificM.forEach((m) => {
        routes.push({ url: urlTemplate(n, m), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.45 });
      });
    });
  }

  addSpecificValueRoutes((n, m) => `${BASE_URL}/procenty/${n}-procentov-ot-${m}`);
  addSpecificValueRoutes((n, m) => `${BASE_URL}/procenty/${n}-dobavit-procent-k-${m}`);
  addSpecificValueRoutes((n, m) => `${BASE_URL}/procenty/${n}-vychest-procent-iz-${m}`);
  addSpecificValueRoutes((n, m) => `${BASE_URL}/procenty/izmenenie-s-${n}-na-${m}`);
  addSpecificValueRoutes((n, m) => `${BASE_URL}/procenty/raznica-mezhdu-${n}-i-${m}`);
  addSpecificValueRoutes((n, m) => `${BASE_URL}/procenty/${n}-sostavlyaet-skolko-procentov-ot-${m}`);

  // 10. Timer pages
  routes.push({ url: `${BASE_URL}/tajmery`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 });
  timerPresets.slice(0, 15).forEach((timer) => {
    routes.push({ url: `${BASE_URL}/tajmery/${timer.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 });
  });

  // 11. Holiday countdown pages
  routes.push({ url: `${BASE_URL}/skolko-dney-do`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 });
  holidays.forEach((holiday) => {
    routes.push({ url: `${BASE_URL}/skolko-dney-do/${holiday.slug}`, lastModified: now, changeFrequency: 'daily', priority: 0.6 });
  });

  // 12. Articles pages
  routes.push({ url: `${BASE_URL}/stati`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 });
  getAllArticles().forEach((article) => {
    routes.push({ url: `${BASE_URL}/stati/${article.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
  });

  return routes;
}
