import { Metadata } from 'next';
import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';
import {
  holidays,
  getDaysUntil,
  formatHolidayDate,
  declineDays,
} from '@/lib/holidays';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus.ru';

export const metadata: Metadata = {
  title: 'Сколько дней до праздника? — обратный отсчёт онлайн',
  description: 'Точный обратный отсчёт до Нового года, Рождества, 8 марта, 23 февраля, 9 мая и других праздников. Узнайте, сколько дней, часов и минут осталось.',
  keywords: 'сколько дней до праздника, обратный отсчёт онлайн, дней до нового года, дней до лета',
  alternates: {
    canonical: `${SITE_URL}/skolko-dney-do`,
  },
  openGraph: {
    title: 'Сколько дней до праздника?',
    description: 'Обратный отсчёт до всех праздников онлайн',
    url: `${SITE_URL}/skolko-dney-do`,
    type: 'website',
    siteName: 'Calcus',
  },
};

export default function HolidaysIndexPage() {
  const sortedHolidays = [...holidays].sort((a, b) => {
    const daysA = getDaysUntil(a);
    const daysB = getDaysUntil(b);
    return daysA - daysB;
  });

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
            <span className="text-foreground">Сколько дней до праздника</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Сколько дней до праздника?
          </h1>
          <p className="text-lg text-muted-foreground">
            Точный обратный отсчёт до всех популярных праздников. Узнайте, сколько
            времени осталось до Нового года, Рождества, 8 марта, лета и других дат.
          </p>
        </div>

        {/* Holiday Cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          {sortedHolidays.map((holiday) => {
            const days = getDaysUntil(holiday);
            const dateStr = formatHolidayDate(holiday);

            return (
              <Link
                key={holiday.slug}
                href={`/skolko-dney-do/${holiday.slug}`}
                className="group"
              >
                <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                        <CalendarDays className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium group-hover:text-primary transition-colors truncate">
                          Сколько дней до {holiday.name}?
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {holiday.description} — {dateStr}
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="text-2xl font-bold text-primary tabular-nums">
                          {days}
                        </span>
                        <span className="text-xs text-muted-foreground block">
                          {declineDays(days)}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">О обратном отсчёте</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              На этой странице вы найдёте точный обратный отсчёт до всех основных
              российских и международных праздников. Каждый счётчик обновляется
              в реальном времени — вы видите точное количество дней, часов, минут
              и секунд.
            </p>
            <p className="text-muted-foreground">
              Если праздник в этом году уже прошёл, автоматически показывается
              обратный отсчёт до следующего года. Все даты рассчитываются
              автоматически с учётом високосных лет.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
