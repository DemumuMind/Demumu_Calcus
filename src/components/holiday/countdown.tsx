'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Holiday, getTimeUntil, declineDays, declineHours, declineMinutes, declineSeconds } from '@/lib/holidays';
import { Calendar } from 'lucide-react';

interface CountdownProps {
  holiday?: Holiday;
  targetDate?: Date;
  title?: string;
  subtitle?: string;
}

function getTimeUntilDate(target: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
} {
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalMs: diffMs };
}

export function Countdown({ holiday, targetDate, title, subtitle }: CountdownProps) {
  const [time, setTime] = useState(() => {
    if (holiday) return getTimeUntil(holiday);
    if (targetDate) return getTimeUntilDate(targetDate);
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  });

  const [pulseSeconds, setPulseSeconds] = useState(false);

  const tick = useCallback(() => {
    const next = holiday ? getTimeUntil(holiday) : targetDate ? getTimeUntilDate(targetDate) : { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
    setTime(next);
    setPulseSeconds(true);
    setTimeout(() => setPulseSeconds(false), 500);
  }, [holiday, targetDate]);

  useEffect(() => {
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const displayTitle = title || (holiday ? 'Обратный отсчёт' : 'Обратный отсчёт');
  const displaySubtitle = subtitle || (holiday ? `До праздника ${holiday.description} осталось ` : 'Осталось ');

  const timeBlocks = [
    { value: time.days, label: 'дни' },
    { value: time.hours, label: 'часы' },
    { value: time.minutes, label: 'минуты' },
    { value: time.seconds, label: 'секунды' },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {timeBlocks.map((block, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-xl bg-muted/50 p-4"
            >
              <span
                className={`text-3xl sm:text-4xl font-bold tabular-nums text-foreground ${
                  index === 3 && pulseSeconds ? 'animate-pulse' : ''
                }`}
              >
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                {block.label}
              </span>
            </div>
          ))}
        </div>
        {holiday && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            {displaySubtitle}
            <span className="font-medium text-foreground">
              {time.days} {declineDays(time.days)}
            </span>
            , {time.hours} {declineHours(time.hours)}, {time.minutes}{' '}
            {declineMinutes(time.minutes)} и {time.seconds}{' '}
            {declineSeconds(time.seconds)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
