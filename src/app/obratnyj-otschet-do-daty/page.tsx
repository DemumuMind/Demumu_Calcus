'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Countdown } from '@/components/holiday/countdown';
import {
  Calendar,
  ArrowLeft,
  Clock,
  HelpCircle,
  Timer } from 'lucide-react';
import {
  holidays,
  getDaysUntil,
  formatHolidayDate,
  declineDays } from '@/lib/holidays';

const POPULAR_COUNTDOWNS = [
  { slug: 'novogo-goda', name: 'Нового года', label: 'Новый год' },
  { slug: 'rozhdestva', name: 'Рождества', label: 'Рождество' },
  { slug: '23-fevralya', name: '23 февраля', label: 'День защитника Отечества' },
  { slug: '8-marta', name: '8 марта', label: 'Международный женский день' },
  { slug: '9-maya', name: '9 мая', label: 'День Победы' },
  { slug: 'leta', name: 'лета', label: 'Первый день лета' },
];

function getSortedHolidays() {
  return [...holidays]
    .sort((a, b) => getDaysUntil(a) - getDaysUntil(b))
    .slice(0, 4);
}

/** Shared: popular countdowns grid */
function PopularCountdowns() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Популярные обратные отсчёты
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {POPULAR_COUNTDOWNS.map((item) => {
          const holiday = holidays.find((h) => h.slug === item.slug);
          if (!holiday) return null;
          const days = getDaysUntil(holiday);
          return (
            <Link
              key={item.slug}
              href={`/skolko-dney-do/${item.slug}`}
              className="group"
            >
              <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        Сколько дней до {item.name}?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="text-2xl font-bold text-primary">
                        {days}
                      </span>
                      <span className="text-xs text-muted-foreground block">
                        {declineDays(days)}
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
  );
}

/** Shared: FAQ card */
function FaqCard() {
  return (
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
            Как посчитать дни до даты?
          </h3>
          <p className="text-sm text-muted-foreground">
            Введите целевую дату в поле выше и нажмите «Запустить обратный
            отсчёт». Счётчик покажет точное количество дней, часов, минут
            и секунд до выбранной даты. Расчёт выполняется в вашем местном
            времени.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">
            Как работает обратный отсчёт?
          </h3>
          <p className="text-sm text-muted-foreground">
            Счётчик обновляется каждую секунду на вашем устройстве. Вы
            видите текущую разницу между настоящим моментом и выбранной
            датой. Когда время истекает, все значения становятся нулевыми.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">
            Можно ли выбрать конкретное время?
          </h3>
          <p className="text-sm text-muted-foreground">
            Да, поле времени необязательно. Если вы оставите его пустым,
            отсчёт будет вестись до полуночи выбранного дня. Если укажете
            время — до этого конкретного момента.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/** Shared: nearest holidays grid */
function NearestHolidays({ sortedHolidays }: { sortedHolidays: ReturnType<typeof getSortedHolidays> }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Timer className="h-5 w-5 text-primary" />
        Ближайшие праздники
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {sortedHolidays.map((holiday) => {
          const days = getDaysUntil(holiday);
          return (
            <Link
              key={holiday.slug}
              href={`/skolko-dney-do/${holiday.slug}`}
              className="group"
            >
              <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        Сколько дней до {holiday.name}?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {holiday.description} — {formatHolidayDate(holiday)}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="text-2xl font-bold text-primary">
                        {days}
                      </span>
                      <span className="text-xs text-muted-foreground block">
                        {declineDays(days)}
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
  );
}

/** Shared: back navigation link */
function BackNavigation() {
  return (
    <div>
      <Link
        href="/skolko-dney-do"
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Все обратные отсчёты
      </Link>
    </div>
  );
}

export default function UniversalCountdownPage() {
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [targetLabel, setTargetLabel] = useState('');
  const [sortedHolidays] = useState(() => getSortedHolidays());

  const handleSubmit = useCallback(() => {
    if (!dateValue) return;
    const [year, month, day] = dateValue.split('-').map(Number);
    let hours = 0;
    let minutes = 0;
    if (timeValue) {
      const [h, m] = timeValue.split(':').map(Number);
      hours = h ?? 0;
      minutes = m ?? 0;
    }
    const target = new Date(year, month - 1, day, hours, minutes, 0, 0);
    setTargetDate(target);

    const dateStr = target.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric' });
    const timeStr = timeValue
      ? ` в ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
      : '';
    setTargetLabel(`${dateStr}${timeStr}`);
  }, [dateValue, timeValue]);

  // Initial empty state
  if (!targetDate) {
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
              <span className="text-foreground">Обратный отсчёт до даты</span>
            </nav>
          </div>
        </div>

        <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3">
              Обратный отсчёт до любой даты
            </h1>
            <p className="text-lg text-muted-foreground">
              Выберите дату и время — и следите за точным обратным отсчётом в
              реальном времени.
            </p>
          </div>

          {/* Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Timer className="h-5 w-5 text-primary" />
                Установить таймер
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="countdown-date">Дата</Label>
                  <Input
                    id="countdown-date"
                    type="date"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="countdown-time">
                    Время <span className="text-muted-foreground">(необязательно)</span>
                  </Label>
                  <Input
                    id="countdown-time"
                    type="time"
                    value={timeValue}
                    onChange={(e) => setTimeValue(e.target.value)}
                  />
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!dateValue}
                className="w-full sm:w-auto"
              >
                <Clock className="h-4 w-4 mr-2" />
                Запустить обратный отсчёт
              </Button>
            </CardContent>
          </Card>

          <PopularCountdowns />
          <FaqCard />
          <NearestHolidays sortedHolidays={sortedHolidays} />
          <BackNavigation />
        </main>
      </div>
    );
  }

  // Active countdown state
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
              href="/obratnyj-otschet-do-daty"
              className="hover:text-foreground transition-colors"
            >
              Обратный отсчёт до даты
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{targetLabel}</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Обратный отсчёт до {targetLabel}
          </h1>
          <p className="text-lg text-muted-foreground">
            Точный таймер в реальном времени.
          </p>
        </div>

        <Countdown
          targetDate={targetDate}
          title={`До ${targetLabel}`}
        />

        {/* Reset button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => {
              setTargetDate(null);
              setTargetLabel('');
              setDateValue('');
              setTimeValue('');
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Выбрать другую дату
          </Button>
        </div>

        <PopularCountdowns />
        <FaqCard />
        <BackNavigation />
      </main>
    </div>
  );
}
