import { MetadataRoute } from 'next';
import { categories } from '@/lib/categories';
import { calculators } from '@/lib/calculators';
import { allUnitCategories } from '@/lib/units';
import { cookingIngredients, standardMeasures, generateCookingSlug } from '@/lib/cooking';
import { percentageTypes } from '@/lib/percentages';
import { timerPresets } from '@/lib/timers';

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
  });

  // 5. Unit converter pages (limited set for sitemap)
  Object.values(allUnitCategories).forEach((category) => {
    const unitIds = Object.keys(category.units).slice(0, 5); // Only first 5 units
    
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

  // 7. Individual cooking converter pages (limited set)
  const popularIngredients = ['sugar', 'wheat_flour', 'butter', 'milk', 'salt'];
  const mainMeasures = ['teaspoon', 'tablespoon', 'faceted_glass'];
  
  popularIngredients.forEach((ingredientId) => {
    mainMeasures.forEach((measureId) => {
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

  console.log(`Generated sitemap with ${routes.length} URLs`);
  return routes;
}
