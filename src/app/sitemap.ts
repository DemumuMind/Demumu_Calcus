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

  // 5. Unit converter pages (expanded to all categories and specific values)
  const POPULAR_CATEGORIES = [
    'dlina', 'massa', 'temperatura', 'skorost', 'obem',
    'informaciya', 'ploshchad', 'energiya', 'davlenie',
    'moshchnost', 'vremya', 'ugly',
  ];
  const POPULAR_VALUES = ['1', '2', '5', '10', '20', '50', '100', '200', '500', '1000'];
  Object.values(allUnitCategories).forEach((category) => {
    if (!POPULAR_CATEGORIES.includes(category.slug)) {
      return;
    }

    const unitIds = Object.keys(category.units).slice(0, 3); // Only first 3 units (match generateStaticParams)

    for (let i = 0; i < unitIds.length; i++) {
      for (let j = 0; j < unitIds.length; j++) {
        if (i !== j) {
          // Base converter URL
          routes.push({
            url: `${BASE_URL}/${category.slug}/${unitIds[i]}-v-${unitIds[j]}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
          });
          // Specific-value converter URLs
          for (const val of POPULAR_VALUES) {
            routes.push({
              url: `${BASE_URL}/${category.slug}/${val}-${unitIds[i]}-v-${unitIds[j]}`,
              lastModified: now,
              changeFrequency: 'monthly',
              priority: 0.45,
            });
          }
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

  // 9a. Specific-value percentage pages for ALL 6 types
  const specificN = [1, 5, 10, 15, 20, 25, 30, 50, 75];
  const specificM = [100, 200, 500, 1000];

  // percent-of-number: N-procentov-ot-M
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

  // add-percent: N-dobavit-procent-k-M
  specificN.forEach((n) => {
    specificM.forEach((m) => {
      routes.push({
        url: `${BASE_URL}/procenty/${n}-dobavit-procent-k-${m}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.45,
      });
    });
  });

  // subtract-percent: N-vychest-procent-iz-M
  specificN.forEach((n) => {
    specificM.forEach((m) => {
      routes.push({
        url: `${BASE_URL}/procenty/${n}-vychest-procent-iz-${m}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.45,
      });
    });
  });

  // percent-change: izmenenie-s-N-na-M
  specificN.forEach((n) => {
    specificM.forEach((m) => {
      routes.push({
        url: `${BASE_URL}/procenty/izmenenie-s-${n}-na-${m}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.45,
      });
    });
  });

  // percent-difference: raznica-mezhdu-N-i-M
  specificN.forEach((n) => {
    specificM.forEach((m) => {
      routes.push({
        url: `${BASE_URL}/procenty/raznica-mezhdu-${n}-i-${m}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.45,
      });
    });
  });

  // number-is-percent-of: N-sostavlyaet-skolko-procentov-ot-M
  specificN.forEach((n) => {
    specificM.forEach((m) => {
      routes.push({
        url: `${BASE_URL}/procenty/${n}-sostavlyaet-skolko-procentov-ot-${m}`,
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
