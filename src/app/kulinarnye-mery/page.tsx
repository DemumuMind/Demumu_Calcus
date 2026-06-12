import { Metadata } from 'next';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';
import { 
  cookingIngredients, 
  standardMeasures,
  generateCookingSlug,
  getIngredientCategories 
} from '@/lib/cooking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Кулинарные меры — таблица перевода в граммы',
  description: 'Таблица перевода кулинарных мер в граммы. Сколько граммов в ложке, стакане, рюмке для разных продуктов.',
  keywords: 'кулинарные меры, сколько грамм в ложке, перевод мер, граммы в стакане' };

export default function CookingPage() {
  const categories = getIngredientCategories();
  const _measures = Object.values(standardMeasures).slice(0, 4); // Show main measures

  return (
    <div className="flex flex-col min-h-full">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Кулинарные меры</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Кулинарные меры
          </h1>
          <p className="text-lg text-muted-foreground">
            Таблицы перевода кулинарных мер в граммы для разных продуктов.
            Узнайте сколько граммов в ложке, стакане или рюмке.
          </p>
        </div>

        {/* Popular Converters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Популярные конвертеры</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {['sugar', 'wheat_flour', 'butter', 'milk', 'salt', 'vegetable_oil'].map((ingId) => {
              const ingredient = cookingIngredients[ingId];
              if (!ingredient) return null;
              
              return (
                <Link
                  key={ingId}
                  href={`/kulinarnye-mery/${generateCookingSlug(ingId, 'tablespoon')}`}
                  className="group"
                >
                  <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700 shrink-0">
                          <ChefHat className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {ingredient.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            1 ст. л. = {ingredient.gramsPerTablespoon} г
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((cat) => (
            <Card key={cat.id}>
              <CardHeader>
                <CardTitle className="text-lg">{cat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Object.values(cookingIngredients)
                    .filter(ing => ing.category === cat.id)
                    .map(ing => (
                      <Link
                        key={ing.id}
                        href={`/kulinarnye-mery/${generateCookingSlug(ing.id, 'tablespoon')}`}
                        className="text-sm px-3 py-1 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {ing.name}
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reference Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Справочная таблица мер</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-medium">Мера</th>
                    <th className="text-left py-2 px-3 font-medium">Объём</th>
                    <th className="text-left py-2 px-3 font-medium">Сокращение</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(standardMeasures).map((measure) => (
                    <tr key={measure.id} className="border-b last:border-0">
                      <td className="py-2 px-3">{measure.name}</td>
                      <td className="py-2 px-3">{measure.volumeMl} мл</td>
                      <td className="py-2 px-3 text-muted-foreground">{measure.shortName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
