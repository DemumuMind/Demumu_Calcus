import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { 
  getTimerBySlug,
  generateTimerTitle,
  generateTimerDescription,
  getRelatedTimers,
  formatTimeText } from '@/lib/timers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimerComponent } from '@/components/calculator/timer-component';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://demumu-calcus.vercel.app';

interface TimerPageProps {
  params: Promise<{
    timerId: string;
  }>;
}

export function generateStaticParams() {
  const mainTimers = [
    { timerId: '1-sekunda' },
    { timerId: '2-sekundy' },
    { timerId: '3-sekundy' },
    { timerId: '5-sekund' },
    { timerId: '10-sekund' },
    { timerId: '15-sekund' },
    { timerId: '20-sekund' },
    { timerId: '30-sekund' },
    { timerId: '45-sekund' },
    { timerId: '1-minuta' },
    { timerId: '2-minuty' },
    { timerId: '3-minuty' },
    { timerId: '5-minut' },
    { timerId: '7-minut' },
    { timerId: '8-minut' },
    { timerId: '9-minut' },
    { timerId: '10-minut' },
    { timerId: '11-minut' },
    { timerId: '13-minut' },
    { timerId: '14-minut' },
    { timerId: '15-minut' },
    { timerId: '16-minut' },
    { timerId: '17-minut' },
    { timerId: '18-minut' },
    { timerId: '19-minut' },
    { timerId: '20-minut' },
    { timerId: '21-minuta' },
    { timerId: '22-minuty' },
    { timerId: '23-minuty' },
    { timerId: '24-minuty' },
    { timerId: '25-minut' },
    { timerId: '26-minut' },
    { timerId: '27-minut' },
    { timerId: '28-minut' },
    { timerId: '29-minut' },
    { timerId: '30-minut' },
    { timerId: '45-minut' },
    { timerId: '1-chas' },
    { timerId: '2-chasa' },
    { timerId: '3-chasa' },
    { timerId: '4-chasa' },
    { timerId: '5-chasov' },
    { timerId: '6-chasov' },
    { timerId: '7-chasov' },
    { timerId: '8-chasov' },
    { timerId: '9-chasov' },
    { timerId: '10-chasov' },
    { timerId: '11-chasov' },
    { timerId: '12-chasov' },
    { timerId: '14-chasov' },
    { timerId: '16-chasov' },
    { timerId: '18-chasov' },
    { timerId: '20-chasov' },
    { timerId: '22-chasa' },
    { timerId: '23-chasa' },
    { timerId: '24-chasa' },
  ];

  return mainTimers;
}

export async function generateMetadata({ params }: TimerPageProps): Promise<Metadata> {
  const { timerId } = await params;
  const timer = getTimerBySlug(timerId);
  
  if (!timer) {
    return { title: 'Таймер не найден' };
  }

  const title = generateTimerTitle(timer);
  const description = generateTimerDescription(timer);
  const url = `${SITE_URL}/tajmery/${timerId}`;

  return {
    title,
    description,
    keywords: `${timer.name}, таймер онлайн, обратный отсчёт`,
    alternates: {
      canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Calcus' } };
}

export default async function TimerPage({ params }: TimerPageProps) {
  const { timerId } = await params;
  const timer = getTimerBySlug(timerId);
  
  if (!timer) {
    notFound();
  }

  const relatedTimers = getRelatedTimers(timer, 5);

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
              href="/tajmery" 
              className="hover:text-foreground transition-colors"
            >
              Таймеры
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{timer.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Таймер на {timer.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            Онлайн таймер обратного отсчёта на {formatTimeText(timer.seconds)}. 
            Нажмите «Старт» для начала.
          </p>
        </div>

        {/* Timer */}
        <TimerComponent
          initialTimer={timer}
        />

        {/* Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">О таймере</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Таймер на {timer.name}</strong> — это {formatTimeText(timer.seconds)}.
            </p>
            <p className="text-muted-foreground">
              Таймер работает прямо в браузере и не требует установки. 
              По окончании прозвучит звуковой сигнал (если включён звук).
              Таймер продолжает работать даже если вы переключитесь на другую вкладку.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                <strong>Использование:</strong> Нажмите «Старт» для начала обратного отсчёта. 
                Кнопка «Пауза» остановит таймер, «Сброс» вернёт к начальному значению {formatTimeText(timer.seconds)}.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Timers */}
        {relatedTimers.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Похожие таймеры</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTimers.map((related) => (
                <Link
                  key={related.id}
                  href={`/tajmery/${related.slug}`}
                  className="group"
                >
                  <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="font-medium group-hover:text-primary transition-colors block">
                              {related.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeText(related.seconds)}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/tajmery"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Все таймеры
          </Link>
        </div>
      </main>
    </div>
  );
}
