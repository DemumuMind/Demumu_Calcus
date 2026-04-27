import { Calculator } from '../types';

// Генерация таймеров для разных интервалов
function createTimerCalculator(
  id: string,
  slug: string,
  title: string,
  description: string,
  seconds: number
): Calculator {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  let timeText = '';
  if (hours > 0) timeText += `${hours} ч `;
  if (minutes > 0) timeText += `${minutes} мин `;
  if (remainingSeconds > 0) timeText += `${remainingSeconds} сек`;
  timeText = timeText.trim();

  return {
    id,
    slug,
    title,
    description,
    category: 'tajmery',
    subcategory: seconds < 60 ? 'tajmery-korotkie' : seconds < 1800 ? 'tajmery-minuty' : 'tajmery-chasy',
    type: 'tool',
    inputs: [
      {
        name: 'time',
        label: 'Время отсчёта',
        type: 'text',
        defaultValue: timeText,
      },
    ],
    outputs: [
      { name: 'status', label: 'Статус', type: 'text' },
      { name: 'remaining', label: 'Осталось', type: 'text' },
    ],
    calculate: () => [
      { value: `⏱️ ${title} — готов к запуску`, label: 'Статус' },
      { value: timeText, label: 'Осталось' },
    ],
    content: {
      howTo: 'Нажмите кнопку «Старт» для запуска таймера. По окончании прозвучит звуковой сигнал.',
      about: `Онлайн таймер на ${timeText}. Работает прямо в браузере.`,
      usage: `Используйте для отсчёта ${timeText} на кухне, в спорте, при работе.`,
      faq: [
        { question: 'Будет ли звуковой сигнал?', answer: 'Да, по окончании отсчёта прозвучит сигнал.' },
        { question: 'Работает ли таймер в фоновом режиме?', answer: 'Да, таймер продолжает работать даже если вы переключитесь на другую вкладку.' },
      ],
      sources: [],
      updatedAt: '2026-04-27',
    },
  };
}

export const timerCalculators: Calculator[] = [
  // Секунды
  createTimerCalculator('timer-1-sec', '1-sekunda', 'Таймер на 1 секунду', 'Короткий таймер на 1 секунду', 1),
  createTimerCalculator('timer-2-sec', '2-sekundy', 'Таймер на 2 секунды', 'Короткий таймер на 2 секунды', 2),
  createTimerCalculator('timer-3-sec', '3-sekundy', 'Таймер на 3 секунды', 'Короткий таймер на 3 секунды', 3),
  createTimerCalculator('timer-5-sec', '5-sekund', 'Таймер на 5 секунд', 'Таймер на 5 секунд', 5),
  createTimerCalculator('timer-10-sec', '10-sekund', 'Таймер на 10 секунд', 'Таймер на 10 секунд', 10),
  createTimerCalculator('timer-15-sec', '15-sekund', 'Таймер на 15 секунд', 'Таймер на 15 секунд', 15),
  createTimerCalculator('timer-20-sec', '20-sekund', 'Таймер на 20 секунд', 'Таймер на 20 секунд', 20),
  createTimerCalculator('timer-30-sec', '30-sekund', 'Таймер на 30 секунд', 'Таймер на 30 секунд', 30),
  createTimerCalculator('timer-45-sec', '45-sekund', 'Таймер на 45 секунд', 'Таймер на 45 секунд', 45),

  // Минуты
  createTimerCalculator('timer-1-min', '1-minuta', 'Таймер на 1 минуту', 'Таймер на 1 минуту', 60),
  createTimerCalculator('timer-2-min', '2-minuty', 'Таймер на 2 минуты', 'Таймер на 2 минуты', 120),
  createTimerCalculator('timer-3-min', '3-minuty', 'Таймер на 3 минуты', 'Таймер на 3 минуты', 180),
  createTimerCalculator('timer-5-min', '5-minut', 'Таймер на 5 минут', 'Таймер на 5 минут', 300),
  createTimerCalculator('timer-7-min', '7-minut', 'Таймер на 7 минут', 'Таймер на 7 минут', 420),
  createTimerCalculator('timer-10-min', '10-minut', 'Таймер на 10 минут', 'Таймер на 10 минут', 600),
  createTimerCalculator('timer-15-min', '15-minut', 'Таймер на 15 минут', 'Таймер на 15 минут', 900),
  createTimerCalculator('timer-20-min', '20-minut', 'Таймер на 20 минут', 'Таймер на 20 минут', 1200),
  createTimerCalculator('timer-25-min', '25-minut', 'Таймер на 25 минут (Pomodoro)', 'Таймер на 25 минут — техника Pomodoro', 1500),
  createTimerCalculator('timer-30-min', '30-minut', 'Таймер на 30 минут', 'Таймер на 30 минут', 1800),
  createTimerCalculator('timer-45-min', '45-minut', 'Таймер на 45 минут', 'Таймер на 45 минут', 2700),

  // Часы
  createTimerCalculator('timer-1-hour', '1-chas', 'Таймер на 1 час', 'Таймер на 1 час', 3600),
  createTimerCalculator('timer-2-hours', '2-chasa', 'Таймер на 2 часа', 'Таймер на 2 часа', 7200),
  createTimerCalculator('timer-3-hours', '3-chasa', 'Таймер на 3 часа', 'Таймер на 3 часа', 10800),
  createTimerCalculator('timer-4-hours', '4-chasa', 'Таймер на 4 часа', 'Таймер на 4 часа', 14400),
  createTimerCalculator('timer-5-hours', '5-chasov', 'Таймер на 5 часов', 'Таймер на 5 часов', 18000),
  createTimerCalculator('timer-6-hours', '6-chasov', 'Таймер на 6 часов', 'Таймер на 6 часов', 21600),
  createTimerCalculator('timer-8-hours', '8-chasov', 'Таймер на 8 часов', 'Таймер на 8 часов', 28800),
  createTimerCalculator('timer-10-hours', '10-chasov', 'Таймер на 10 часов', 'Таймер на 10 часов', 36000),
  createTimerCalculator('timer-12-hours', '12-chasov', 'Таймер на 12 часов', 'Таймер на 12 часов', 43200),
  createTimerCalculator('timer-24-hours', '24-chasa', 'Таймер на 24 часа', 'Таймер на сутки', 86400),
];
