import Link from 'next/link';
import { categories } from '@/lib/categories';
import { SubscribeInline } from '@/components/subscribe/subscribe-inline';
import { Mail, Heart, History, User, BookOpen, FileText } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Subscribe section */}
        <div className="mb-8 pb-8 border-b">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Подпишитесь на обновления
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Получайте новые калькуляторы, статьи и полезные советы
            </p>
            <SubscribeInline className="max-w-md mx-auto" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-lg font-bold">CALCUS.CLONE</h3>
            <p className="text-sm text-muted-foreground">
              538+ онлайн-калькуляторов для математики, финансов, здоровья,
              строительства и других задач. Все расчёты выполняются мгновенно,
              бесплатно. Создавайте аккаунт для синхронизации истории и избранного.
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
              <li>
                <Link href="/istoriya" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <History className="h-3.5 w-3.5" />
                  История
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5" />
                  Избранное
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  Профиль
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
              <li>История в облаке</li>
              <li>Избранное калькуляторы</li>
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
