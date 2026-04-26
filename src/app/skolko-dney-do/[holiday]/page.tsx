import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, HelpCircle, Clock } from 'lucide-react';
import {
  holidays,
  getHolidayBySlug,
  getDaysUntil,
  formatHolidayDate,
  declineDays,
  getSimilarHolidaysSorted,
} from '@/lib/holidays';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Countdown } from '@/components/holiday/countdown';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus-clone.vercel.app';

interface HolidayPageProps {
  params: Promise<{
    holiday: string;
  }>;
}

export function generateStaticParams() {
  return holidays.map((h) => ({ holiday: h.slug }));
}

export async function generateMetadata({ params }: HolidayPageProps): Promise<Metadata> {
  const { holiday: holidaySlug } = await params;
  const holiday = getHolidayBySlug(holidaySlug);

  if (!holiday) {
    return { title: 'Праздник не найден' };
  }

  const days = getDaysUntil(holiday);
  const dateStr = formatHolidayDate(holiday);
  const title = `Сколько дней до ${holiday.name}?`;
  const description = `Узнайте, сколько дней, часов и минут осталось до ${holiday.description} (${dateStr}). Точный обратный отсчёт онлайн.`;
  const url = `${SITE_URL}/skolko-dney-do/${holidaySlug}`;

  return {
    title,
    description,
    keywords: `сколько дней до ${holiday.name}, обратный отсчёт ${holiday.description}, ${holiday.description} когда`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: `Осталось ${days} ${declineDays(days)} до ${holiday.name}`,
      url,
      type: 'website',
      siteName: 'Calcus',
    },
  };
}

export default async function HolidayPage({ params }: HolidayPageProps) {
  const { holiday: holidaySlug } = await params;
  const holiday = getHolidayBySlug(holidaySlug);

  if (!holiday) {
    notFound();
  }

  const days = getDaysUntil(holiday);
  const dateStr = formatHolidayDate(holiday);
  const similarHolidays = getSimilarHolidaysSorted(holiday.slug, 4);

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
            <Link
              href="/skolko-dney-do"
              className="hover:text-foreground transition-colors"
            >
              Сколько дней до праздника
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{holiday.description}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Сколько дней до {holiday.name}?
          </h1>
          <p className="text-lg text-muted-foreground">
            {holiday.description} — {dateStr}. Осталось{' '}
            <span className="font-medium text-foreground">
              {days} {declineDays(days)}
            </span>
            .
          </p>
        </div>

        {/* Countdown */}
        <Countdown holiday={holiday} targetDate={new Date()} />

        {/* Holiday Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              О празднике
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <strong>{holiday.description}</strong> отмечается {dateStr}.
            </p>
            <p className="text-muted-foreground">
              На этой странице вы видите точный обратный отсчёт до праздника с
              обновлением каждую секунду. Данные автоматически пересчитываются
              каждый год, так что вы всегда будете знать, сколько времени
              осталось до следующего праздника.
            </p>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Часто задаваемые вопросы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">
                Когда {holiday.name}?
              </h3>
              <p className="text-sm text-muted-foreground">
                {holiday.description} отмечается {dateStr} каждый год.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">
                Сколько дней осталось до {holiday.name}?
              </h3>
              <p className="text-sm text-muted-foreground">
                До {holiday.description} осталось {days} {declineDays(days)}. Таймер
                обновляется в реальном времени — вы видите точное количество дней,
                часов, минут и секунд.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">
                Как рассчитывается время до праздника?
              </h3>
              <p className="text-sm text-muted-foreground">
                Счётчик рассчитывает разницу между текущим моментом и полуночью
                дня праздника. Если праздник в этом году уже прошёл, автоматически
                показывается обратный отсчёт до следующего года.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Similar countdowns */}
        {similarHolidays.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Похожие обратные отсчёты
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {similarHolidays.map((similar) => {
                const similarDays = getDaysUntil(similar);
                return (
                  <Link
                    key={similar.slug}
                    href={`/skolko-dney-do/${similar.slug}`}
                    className="group"
                  >
                    <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium group-hover:text-primary transition-colors">
                              Сколько дней до {similar.name}?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {similar.description} — {formatHolidayDate(similar)}
                            </p>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <span className="text-2xl font-bold text-primary">
                              {similarDays}
                            </span>
                            <span className="text-xs text-muted-foreground block">
                              {declineDays(similarDays)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8">
          <Link
            href="/skolko-dney-do"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Все обратные отсчёты
          </Link>
        </div>
      </main>
    </div>
  );
}
