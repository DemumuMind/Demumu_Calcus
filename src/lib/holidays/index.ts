export interface Holiday {
  slug: string;
  name: string;
  description: string;
  date: string; // MM-DD format
}

export const holidays: Holiday[] = [
  { slug: 'novogo-goda', name: 'Нового года', description: 'Новый год', date: '01-01' },
  { slug: 'rozhdestva', name: 'Рождества', description: 'Рождество', date: '01-07' },
  { slug: '23-fevralya', name: '23 февраля', description: 'День защитника Отечества', date: '02-23' },
  { slug: '14-fevralya', name: '14 февраля', description: 'День святого Валентина', date: '02-14' },
  { slug: '8-marta', name: '8 марта', description: 'Международный женский день', date: '03-08' },
  { slug: '9-maya', name: '9 мая', description: 'День Победы', date: '05-09' },
  { slug: 'leta', name: 'лета', description: 'Первый день лета', date: '06-01' },
  { slug: '1-sentyabrya', name: '1 сентября', description: 'День знаний', date: '09-01' },
];

export function getHolidayBySlug(slug: string): Holiday | undefined {
  return holidays.find((h) => h.slug === slug);
}

export function getRelatedHolidays(currentSlug: string, count: number = 3): Holiday[] {
  return holidays
    .filter((h) => h.slug !== currentSlug)
    .slice(0, count);
}

export function getSimilarHolidaysSorted(currentSlug: string, count: number = 4): Holiday[] {
  return holidays
    .filter((h) => h.slug !== currentSlug)
    .sort((a, b) => getDaysUntil(a) - getDaysUntil(b))
    .slice(0, count);
}



function daysBetween(start: Date, end: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.ceil((end.getTime() - start.getTime()) / oneDay);
}

/**
 * Returns the next occurrence date of the holiday from today.
 */
export function getNextHolidayDate(holiday: Holiday, from: Date = new Date()): Date {
  const currentYear = from.getFullYear();
  const [monthStr, dayStr] = holiday.date.split('-');
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  let candidate = new Date(currentYear, month - 1, day, 0, 0, 0, 0);

  // If the holiday has already passed this year (including today), go to next year
  const todayStart = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0, 0);
  if (candidate.getTime() <= todayStart.getTime()) {
    candidate = new Date(currentYear + 1, month - 1, day, 0, 0, 0, 0);
  }

  return candidate;
}

/**
 * Returns the number of full days until the holiday from the given date.
 */
export function getDaysUntil(holiday: Holiday, from: Date = new Date()): number {
  const nextDate = getNextHolidayDate(holiday, from);
  const todayStart = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0, 0);
  const holidayStart = new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate(), 0, 0, 0, 0);
  return daysBetween(todayStart, holidayStart);
}

/**
 * Returns the remaining time (days, hours, minutes, seconds) until the holiday.
 */
export function getTimeUntil(holiday: Holiday, from: Date = new Date()): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
} {
  const nextDate = getNextHolidayDate(holiday, from);
  const diffMs = nextDate.getTime() - from.getTime();

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

/**
 * Formats holiday date in Russian style.
 */
export function formatHolidayDate(holiday: Holiday): string {
  const [monthStr, dayStr] = holiday.date.split('-');
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const monthNames = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];

  return `${day} ${monthNames[month - 1]}`;
}

/**
 * Declines "день" in Russian.
 */
export function declineDays(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) return 'день';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'дня';
  return 'дней';
}

/**
 * Declines "час" in Russian.
 */
export function declineHours(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) return 'час';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'часа';
  return 'часов';
}

/**
 * Declines "минута" in Russian.
 */
export function declineMinutes(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) return 'минута';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'минуты';
  return 'минут';
}

/**
 * Declines "секунда" in Russian.
 */
export function declineSeconds(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) return 'секунда';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'секунды';
  return 'секунд';
}
