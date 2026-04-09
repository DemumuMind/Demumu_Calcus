// ============================================
// ТАЙМЕРЫ
// Онлайн таймеры обратного отсчёта
// ============================================

export interface TimerPreset {
  id: string;
  slug: string;
  name: string;
  description: string;
  seconds: number;
  icon?: string;
}

// Готовые пресеты таймеров
export const timerPresets: TimerPreset[] = [
  // Секунды
  { id: '5-sec', slug: '5-sekund', name: '5 секунд', description: 'Короткий таймер на 5 секунд', seconds: 5 },
  { id: '10-sec', slug: '10-sekund', name: '10 секунд', description: 'Таймер на 10 секунд', seconds: 10 },
  { id: '15-sec', slug: '15-sekund', name: '15 секунд', description: 'Таймер на 15 секунд', seconds: 15 },
  { id: '30-sec', slug: '30-sekund', name: '30 секунд', description: 'Таймер на 30 секунд', seconds: 30 },
  { id: '45-sec', slug: '45-sekund', name: '45 секунд', description: 'Таймер на 45 секунд', seconds: 45 },
  
  // Минуты
  { id: '1-min', slug: '1-minuta', name: '1 минута', description: 'Таймер на 1 минуту', seconds: 60 },
  { id: '2-min', slug: '2-minuty', name: '2 минуты', description: 'Таймер на 2 минуты', seconds: 120 },
  { id: '3-min', slug: '3-minuty', name: '3 минуты', description: 'Таймер на 3 минуты', seconds: 180 },
  { id: '5-min', slug: '5-minut', name: '5 минут', description: 'Таймер на 5 минут', seconds: 300 },
  { id: '10-min', slug: '10-minut', name: '10 минут', description: 'Таймер на 10 минут', seconds: 600 },
  { id: '15-min', slug: '15-minut', name: '15 минут', description: 'Таймер на 15 минут', seconds: 900 },
  { id: '20-min', slug: '20-minut', name: '20 минут', description: 'Таймер на 20 минут', seconds: 1200 },
  { id: '25-min', slug: '25-minut', name: '25 минут', description: 'Таймер помидоро на 25 минут', seconds: 1500 },
  { id: '30-min', slug: '30-minut', name: '30 минут', description: 'Таймер на 30 минут', seconds: 1800 },
  { id: '45-min', slug: '45-minut', name: '45 минут', description: 'Таймер на 45 минут', seconds: 2700 },
  
  // Часы
  { id: '1-hour', slug: '1-chas', name: '1 час', description: 'Таймер на 1 час', seconds: 3600 },
  { id: '2-hours', slug: '2-chasa', name: '2 часа', description: 'Таймер на 2 часа', seconds: 7200 },
  { id: '3-hours', slug: '3-chasa', name: '3 часа', description: 'Таймер на 3 часа', seconds: 10800 },
  { id: '4-hours', slug: '4-chasa', name: '4 часа', description: 'Таймер на 4 часа', seconds: 14400 },
  { id: '6-hours', slug: '6-chasov', name: '6 часов', description: 'Таймер на 6 часов', seconds: 21600 },
  { id: '8-hours', slug: '8-chasov', name: '8 часов', description: 'Таймер на 8 часов', seconds: 28800 },
  { id: '12-hours', slug: '12-chasov', name: '12 часов', description: 'Таймер на 12 часов', seconds: 43200 },
  { id: '24-hours', slug: '24-chasa', name: '24 часа', description: 'Таймер на сутки', seconds: 86400 },
];

// ============================================
// УТИЛИТЫ ДЛЯ ТАЙМЕРОВ
// ============================================

/**
 * Форматирует секунды в читаемый вид
 */
export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Форматирует секунды в текстовое описание
 */
export function formatTimeText(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const parts: string[] = [];
  
  if (hours > 0) {
    parts.push(`${hours} ${declineWord(hours, 'час', 'часа', 'часов')}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${declineWord(minutes, 'минута', 'минуты', 'минут')}`);
  }
  if (seconds > 0 && hours === 0) {
    parts.push(`${seconds} ${declineWord(seconds, 'секунда', 'секунды', 'секунд')}`);
  }
  
  return parts.join(' ') || '0 секунд';
}

/**
 * Склонение слов
 */
function declineWord(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

/**
 * Находит таймер по slug
 */
export function getTimerBySlug(slug: string): TimerPreset | undefined {
  return timerPresets.find((t) => t.slug === slug);
}

/**
 * Генерирует статические параметры для всех таймеров
 */
export function generateTimerStaticParams(): Array<{ slug: string }> {
  return timerPresets.map((timer) => ({ slug: timer.slug }));
}

/**
 * Генерирует заголовок для страницы таймера
 */
export function generateTimerTitle(timer: TimerPreset): string {
  return `Таймер на ${timer.name} — онлайн отсчёт`;
}

/**
 * Генерирует описание для страницы таймера
 */
export function generateTimerDescription(timer: TimerPreset): string {
  return `Онлайн таймер обратного отсчёта на ${timer.name} (${formatTimeText(timer.seconds)}). 
    Бесплатный таймер с звуковым сигналом. Не требует установки.`;
}

/**
 * Получает похожие таймеры (ближайшие по времени)
 */
export function getRelatedTimers(currentTimer: TimerPreset, count: number = 5): TimerPreset[] {
  return timerPresets
    .filter((t) => t.id !== currentTimer.id)
    .sort((a, b) => Math.abs(a.seconds - currentTimer.seconds) - Math.abs(b.seconds - currentTimer.seconds))
    .slice(0, count);
}

/**
 * Группирует таймеры по категориям
 */
export function getTimersByCategory(): Array<{
  category: string;
  timers: TimerPreset[];
}> {
  return [
    {
      category: 'Секунды',
      timers: timerPresets.filter((t) => t.seconds < 60),
    },
    {
      category: 'Минуты',
      timers: timerPresets.filter((t) => t.seconds >= 60 && t.seconds < 3600),
    },
    {
      category: 'Часы',
      timers: timerPresets.filter((t) => t.seconds >= 3600),
    },
  ];
}

/**
 * Проверяет, является ли значение валидным временем для таймера
 */
export function isValidTimerSeconds(seconds: number): boolean {
  return seconds > 0 && seconds <= 86400; // Максимум 24 часа
}
