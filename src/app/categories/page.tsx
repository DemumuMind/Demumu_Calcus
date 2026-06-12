import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/categories';
import { getCategoryStyle } from '@/lib/category-styles';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Категории калькуляторов — Calcus',
  description: 'Все категории онлайн-калькуляторов: математика, финансы, здоровье, конвертеры и многое другое.' };

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Категории</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">Категории калькуляторов</h1>
          <p className="text-lg text-muted-foreground">
            Выберите категорию, чтобы найти нужный калькулятор или конвертер.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const style = getCategoryStyle(category.slug);
            const Icon = style.icon;
            return (
              <Link key={category.id} href={`/${category.slug}`}>
                <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border-2 hover:border-primary/20">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.bgColor} ${style.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {category.subcategories.length} подкатегорий
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all ml-auto shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
