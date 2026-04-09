import { Metadata } from 'next';
import Link from 'next/link';
import { Timer, Clock, ArrowRight } from 'lucide-react';
import { timerPresets, getTimersByCategory } from '@/lib/timers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Онлайн таймеры — обратный отсчёт',
  description: 'Бесплатные онлайн таймеры обратного отсчёта. 5 секунд до 24 часов. С звуковым сигналом. Не требует установки.',
  keywords: 'таймер онлайн, таймер обратного отсчёта, онлайн секундомер',
};

export default function TimersPage() {
  const categories = getTimersByCategory();

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
            <span className="text-foreground">Таймеры</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Онлайн таймеры
          </h1>
          <p className="text-lg text-muted-foreground">
            Таймеры обратного отсчёта для любых задач. Работают прямо в браузере.
          </p>
        </div>

        {/* Timer Categories */}
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.category}>
              <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {category.timers.map((timer) => (
                  <Link
                    key={timer.id}
                    href={`/tajmery/${timer.slug}`}
                    className="group"
                  >
                    <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium group-hover:text-primary transition-colors">
                              {timer.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {timer.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">О таймерах</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Все таймеры работают прямо в браузере и не требуют установки.
              По окончании отсчёта вы услышите звуковой сигнал.
            </p>
            <p className="text-sm text-muted-foreground">
              Таймер продолжает работать даже если вы переключитесь на другую вкладку браузера.
              Для точности используйте таймеры на устройствах с стабильным интернет-соединением.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
