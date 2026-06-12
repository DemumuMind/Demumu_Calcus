import Link from 'next/link';
import { categories } from '@/lib/categories';
import { BookOpen } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-lg font-bold">CALCUS</h3>
            <p className="text-sm text-muted-foreground">
              760+ онлайн-калькуляторов для математики, финансов, здоровья,
              строительства и других задач. Все расчёты выполняются мгновенно,
              бесплатно и без регистрации.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-semibold">Категории</h4>
            <ul className="space-y-1.5 text-sm">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div className="space-y-3">
            <h4 className="font-semibold">Разделы</h4>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/stati" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  Статьи
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <h4 className="font-semibold">Информация</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Все калькуляторы бесплатны</li>
              <li>Работают без регистрации</li>
              <li>Точные расчёты</li>
              <li>Без ограничений</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Calcus Clone. Все права защищены.</p>
          <p className="mt-2">
            Клон сайта calcus.su для образовательных целей.
          </p>
        </div>
      </div>
    </footer>
  );
}
