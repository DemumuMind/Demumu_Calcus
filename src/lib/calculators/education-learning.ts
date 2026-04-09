import { Calculator } from '../types';

// Калькулятор GPA (Grade Point Average)
export const gpaCalculator: Calculator = {
  id: 'gpa-calculator',
  slug: 'gpa-kalkulyator',
  title: 'Калькулятор GPA',
  description: 'Расчёт среднего балла GPA по шкалам 4.0, 5.0 и 100-балльной системе',
  category: 'nauka-i-ucheba',
  subcategory: 'education',
  type: 'formula',
  inputs: [
    {
      name: 'grade1',
      label: 'Оценка 1',
      type: 'number',
      placeholder: '85',
      min: 0,
      max: 100,
      defaultValue: 85
    },
    {
      name: 'credits1',
      label: 'Кредиты/часы предмета 1',
      type: 'number',
      placeholder: '3',
      min: 1,
      max: 10,
      defaultValue: 3
    },
    {
      name: 'grade2',
      label: 'Оценка 2',
      type: 'number',
      placeholder: '90',
      min: 0,
      max: 100,
      defaultValue: 90
    },
    {
      name: 'credits2',
      label: 'Кредиты предмета 2',
      type: 'number',
      placeholder: '4',
      min: 1,
      max: 10,
      defaultValue: 4
    },
    {
      name: 'grade3',
      label: 'Оценка 3',
      type: 'number',
      placeholder: '78',
      min: 0,
      max: 100,
      defaultValue: 78
    },
    {
      name: 'credits3',
      label: 'Кредиты предмета 3',
      type: 'number',
      placeholder: '3',
      min: 1,
      max: 10,
      defaultValue: 3
    },
    {
      name: 'grade4',
      label: 'Оценка 4',
      type: 'number',
      placeholder: '92',
      min: 0,
      max: 100,
      defaultValue: 92
    },
    {
      name: 'credits4',
      label: 'Кредиты предмета 4',
      type: 'number',
      placeholder: '2',
      min: 1,
      max: 10,
      defaultValue: 2
    }
  ],
  outputs: [
    { name: 'average100', label: 'Средний балл (100)', type: 'number', unit: '%' },
    { name: 'gpa40', label: 'GPA (4.0 шкала)', type: 'number' },
    { name: 'gpa50', label: 'GPA (5.0 шкала)', type: 'number' },
    { name: 'weighted', label: 'Взвешенный средний', type: 'number', unit: '%' },
    { name: 'totalCredits', label: 'Всего кредитов', type: 'number', unit: '' },
    { name: 'letterGrade', label: 'Буквенная оценка', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const grades = [
      { grade: Number(inputs.grade1 || 85), credits: Number(inputs.credits1 || 3) },
      { grade: Number(inputs.grade2 || 90), credits: Number(inputs.credits2 || 4) },
      { grade: Number(inputs.grade3 || 78), credits: Number(inputs.credits3 || 3) },
      { grade: Number(inputs.grade4 || 92), credits: Number(inputs.credits4 || 2) }
    ].filter(g => g.grade > 0 && g.credits > 0);
    
    if (grades.length === 0) {
      return [
        { value: '—', label: 'Средний балл (100)', unit: '%' },
        { value: '—', label: 'GPA (4.0 шкала)' },
        { value: '—', label: 'GPA (5.0 шкала)' },
        { value: '—', label: 'Взвешенный средний', unit: '%' },
        { value: 0, label: 'Всего кредитов', unit: '' },
        { value: '—', label: 'Буквенная оценка' }
      ];
    }
    
    // Simple average
    const average100 = grades.reduce((sum, g) => sum + g.grade, 0) / grades.length;
    
    // Weighted average
    const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);
    const weightedSum = grades.reduce((sum, g) => sum + g.grade * g.credits, 0);
    const weighted = weightedSum / totalCredits;
    
    // Convert to GPA 4.0 scale
    // 90-100 = 4.0, 80-89 = 3.0, 70-79 = 2.0, 60-69 = 1.0, <60 = 0
    let gpa40 = 0;
    if (weighted >= 90) gpa40 = 4.0;
    else if (weighted >= 80) gpa40 = 3.0 + (weighted - 80) / 10;
    else if (weighted >= 70) gpa40 = 2.0 + (weighted - 70) / 10;
    else if (weighted >= 60) gpa40 = 1.0 + (weighted - 60) / 10;
    else gpa40 = weighted / 60;
    
    // Convert to GPA 5.0 scale (multiply by 1.25)
    const gpa50 = Math.min(5.0, gpa40 * 1.25);
    
    // Letter grade
    let letterGrade = '';
    if (weighted >= 90) letterGrade = 'A (Отлично)';
    else if (weighted >= 80) letterGrade = 'B (Хорошо)';
    else if (weighted >= 70) letterGrade = 'C (Удовлетворительно)';
    else if (weighted >= 60) letterGrade = 'D (Ниже среднего)';
    else letterGrade = 'F (Неудовлетворительно)';
    
    return [
      { value: Math.round(average100 * 10) / 10, label: 'Средний балл (100)', unit: '%' },
      { value: Math.round(gpa40 * 100) / 100, label: 'GPA (4.0 шкала)' },
      { value: Math.round(gpa50 * 100) / 100, label: 'GPA (5.0 шкала)' },
      { value: Math.round(weighted * 10) / 10, label: 'Взвешенный средний', unit: '%' },
      { value: totalCredits, label: 'Всего кредитов', unit: '' },
      { value: letterGrade, label: 'Буквенная оценка' }
    ];
  },
  content: {
    howTo: 'Введите оценки по 100-балльной шкале и количество кредитов (часов) для каждого предмета. Калькулятор рассчитает GPA.',
    about: 'GPA (Grade Point Average) — средний балл, используемый в американских и международных университетах. 4.0 шкала: A=4, B=3, C=2, D=1, F=0.',
    formula: 'GPA 4.0 = (Сумма баллов × Кредиты) / Общие кредиты\n90-100% = 4.0, 80-89% = 3.0, 70-79% = 2.0',
    faq: [
      { question: 'Как перевести российские оценки в GPA?', answer: 'Отлично (5) = 90-100% = 4.0, Хорошо (4) = 80-89% = 3.0, Удовлетворительно (3) = 70-79% = 2.0.' },
      { question: 'Что такое взвешенный GPA?', answer: 'Предметы с большим количеством кредитов (часов) имеют больший вес в расчёте. Например, математика 6 часов важнее физкультуры 2 часа.' }
    ],
    sources: [
      { title: 'GPA Calculator', url: 'https://gpacalculator.net/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор времени чтения
export const readingTimeCalculator: Calculator = {
  id: 'reading-time-calculator',
  slug: 'vremya-chteniya',
  title: 'Калькулятор времени чтения',
  description: 'Расчёт времени, необходимого для прочтения текста или книги с учётом скорости чтения',
  category: 'nauka-i-ucheba',
  subcategory: 'education',
  type: 'formula',
  inputs: [
    {
      name: 'wordCount',
      label: 'Количество слов',
      type: 'number',
      placeholder: '5000',
      min: 100,
      max: 500000,
      defaultValue: 5000
    },
    {
      name: 'readingSpeed',
      label: 'Скорость чтения',
      type: 'select',
      options: [
        { value: 'slow', label: 'Медленное (150 слов/мин) — учебная литература' },
        { value: 'average', label: 'Среднее (250 слов/мин) — обычная скорость' },
        { value: 'fast', label: 'Быстрое (400 слов/мин) — художественная литература' },
        { value: 'speed', label: 'Скорочтение (600+ слов/мин)' }
      ],
      defaultValue: 'average'
    },
    {
      name: 'textType',
      label: 'Тип текста',
      type: 'select',
      options: [
        { value: 'fiction', label: 'Художественная литература' },
        { value: 'nonfiction', label: 'Научно-популярная' },
        { value: 'academic', label: 'Учебная/научная' },
        { value: 'technical', label: 'Техническая документация' }
      ],
      defaultValue: 'fiction'
    }
  ],
  outputs: [
    { name: 'readingTime', label: 'Время чтения', type: 'text' },
    { name: 'minutes', label: 'В минутах', type: 'number', unit: 'мин' },
    { name: 'hours', label: 'В часах', type: 'number', unit: 'ч' },
    { name: 'pages', label: 'Примерно страниц', type: 'number', unit: 'стр' },
    { name: 'dailyPlan', label: 'План на каждый день (30 мин)', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const wordCount = Number(inputs.wordCount || 5000);
    const readingSpeed = String(inputs.readingSpeed || 'average');
    const textType = String(inputs.textType || 'fiction');
    
    // Base speeds (words per minute)
    const speeds: Record<string, number> = {
      slow: 150,
      average: 250,
      fast: 400,
      speed: 600
    };
    
    let speed = speeds[readingSpeed];
    
    // Adjust for text type
    if (textType === 'academic') {
      speed *= 0.7; // Slower for academic texts
    } else if (textType === 'technical') {
      speed *= 0.6;
    } else if (textType === 'nonfiction') {
      speed *= 0.85;
    }
    
    const minutes = Math.ceil(wordCount / speed);
    const hours = Math.ceil(minutes / 60 * 10) / 10;
    
    // Approximate pages (250 words per page is standard)
    const pages = Math.ceil(wordCount / 250);
    
    let readingTimeText = '';
    if (minutes < 60) {
      readingTimeText = `${minutes} минут`;
    } else if (hours < 24) {
      readingTimeText = `${Math.floor(hours)} ч ${minutes % 60} мин`;
    } else {
      const days = Math.floor(hours / 24);
      readingTimeText = `${days} дней ${Math.floor(hours % 24)} ч`;
    }
    
    const dailyMinutes = 30;
    const daysNeeded = Math.ceil(minutes / dailyMinutes);
    const dailyPlan = `Читать ${dailyMinutes} мин/день = закончите за ${daysNeeded} дней (${Math.ceil(wordCount / daysNeeded)} слов/день)`;
    
    return [
      { value: readingTimeText, label: 'Время чтения' },
      { value: minutes, label: 'В минутах', unit: 'мин' },
      { value: hours, label: 'В часах', unit: 'ч' },
      { value: pages, label: 'Примерно страниц', unit: 'стр' },
      { value: dailyPlan, label: 'План на каждый день (30 мин)' }
    ];
  },
  content: {
    howTo: 'Введите количество слов, вашу скорость чтения и тип текста. Калькулятор рассчитает время чтения.',
    about: 'Средняя скорость чтения — 200-250 слов в минуту. Скорочтение позволяет достичь 400-1000 слов/мин. Учебная литература читается в 2-3 раза медленнее художественной.',
    formula: 'Время (мин) = Количество слов / Скорость чтения\nСтандартная страница ≈ 250 слов',
    faq: [
      { question: 'Как увеличить скорость чтения?', answer: '1) Устраните субвокализацию (произнесение слов про себя). 2) Используйте указку (палец или карандаш). 3) Расширяйте поле зрения. 4) Практикуйтесь ежедневно.' },
      { question: 'Сколько слов в средней книге?', answer: 'Тонкая книга — 30-50 тыс слов, средняя — 80-100 тыс, толстый роман — 200-400 тыс слов ("Война и мир" — ~560 тыс).' }
    ],
    sources: [
      { title: 'Reading Length', url: 'https://howlongtoread.com/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор концентрации внимания (Помодоро)
export const pomodoroCalculator: Calculator = {
  id: 'pomodoro-calculator',
  slug: 'pomodoro-tekhnika',
  title: 'Калькулятор Pomodoro',
  description: 'Планирование учёбы/работы по технике Pomodoro с перерывами и длинными паузами',
  category: 'nauka-i-ucheba',
  subcategory: 'education',
  type: 'formula',
  inputs: [
    {
      name: 'availableTime',
      label: 'Доступное время (часов)',
      type: 'number',
      placeholder: '4',
      min: 1,
      max: 12,
      defaultValue: 4
    },
    {
      name: 'taskType',
      label: 'Тип задачи',
      type: 'select',
      options: [
        { value: 'study', label: 'Учёба (чтение, конспекты)' },
        { value: 'creative', label: 'Творческая работа' },
        { value: 'analytical', label: 'Аналитическая работа' },
        { value: 'routine', label: 'Рутинные задачи' }
      ],
      defaultValue: 'study'
    },
    {
      name: 'focusLevel',
      label: 'Уровень концентрации',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкий (легко отвлекаюсь)' },
        { value: 'medium', label: 'Средний' },
        { value: 'high', label: 'Высокий (могу долго концентрироваться)' }
      ],
      defaultValue: 'medium'
    }
  ],
  outputs: [
    { name: 'pomodoros', label: 'Количество помидорок', type: 'number', unit: 'шт' },
    { name: 'totalFocus', label: 'Время фокуса', type: 'number', unit: 'мин' },
    { name: 'shortBreaks', label: 'Коротких перерывов', type: 'number', unit: 'шт' },
    { name: 'longBreaks', label: 'Длинных перерывов', type: 'number', unit: 'шт' },
    { name: 'schedule', label: 'Примерный расписание', type: 'text' },
    { name: 'tips', label: 'Советы по технике', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const availableTime = Number(inputs.availableTime || 4);
    const taskType = String(inputs.taskType || 'study');
    const focusLevel = String(inputs.focusLevel || 'medium');
    
    // Standard Pomodoro: 25 min work + 5 min break
    // Long break: 15-30 min after every 4 pomodoros
    const workTime = 25;
    const shortBreak = 5;
    const longBreak = 20;
    const pomodorosPerSet = 4;
    
    const totalMinutes = availableTime * 60;
    
    // Calculate how many pomodoros fit
    // Each set of 4: 4×25 + 3×5 + 20 = 135 minutes
    const setDuration = pomodorosPerSet * workTime + (pomodorosPerSet - 1) * shortBreak + longBreak;
    const fullSets = Math.floor(totalMinutes / setDuration);
    const remainingMinutes = totalMinutes % setDuration;
    
    // Calculate remaining pomodoros in incomplete set
    const remainingPomodoros = Math.min(4, Math.floor(remainingMinutes / (workTime + shortBreak)));
    
    const totalPomodoros = fullSets * pomodorosPerSet + remainingPomodoros;
    const totalFocus = totalPomodoros * workTime;
    const shortBreaks = totalPomodoros - fullSets; // Minus long breaks
    const longBreaks = fullSets;
    
    let schedule = '';
    if (totalPomodoros <= 4) {
      schedule = '25 мин работа → 5 мин перерыв → повторить ' + totalPomodoros + ' раза';
    } else {
      schedule = `4×(25 мин работа → 5 мин перерыв) → 20 мин длинный перерыв → повторить ${fullSets} раза`;
    }
    
    let tips = '';
    if (taskType === 'creative') {
      tips = 'Для творческих задач можно увеличить помидорку до 45-50 минут (flow state требует времени).';
    } else if (focusLevel === 'low') {
      tips = 'Начните с 15-минутных помидорок. Используйте блокировщики сайтов (Freedom, Cold Turkey).';
    } else {
      tips = 'Во время помидорки: телефон в другой комнате, уведомления выключены, только задача.';
    }
    
    return [
      { value: totalPomodoros, label: 'Количество помидорок', unit: 'шт' },
      { value: totalFocus, label: 'Время фокуса', unit: 'мин' },
      { value: shortBreaks, label: 'Коротких перерывов', unit: 'шт' },
      { value: longBreaks, label: 'Длинных перерывов', unit: 'шт' },
      { value: schedule, label: 'Примерный расписание' },
      { value: tips, label: 'Советы по технике' }
    ];
  },
  content: {
    howTo: 'Введите доступное время, тип задачи и ваш уровень концентрации. Калькулятор составит план Pomodoro.',
    about: 'Техника Pomodoro: 25 минут работы (помидорка) → 5 минут перерыв. После 4 помидорок — длинный перерыв 15-30 минут. Помогает бороться с прокрастинацией.',
    formula: 'Помидорка = 25 мин фокуса + 5 мин перерыв\nСет = 4 помидорки + длинный перерыв 20 мин',
    faq: [
      { question: 'Что делать, если прервали помидорку?', answer: 'Правило: если прервали на >2 минут — помидорка отменяется, начать заново. Если коротко — продолжить.' },
      { question: 'Можно ли менять длительность?', answer: 'Да! Для сложных задач используйте 45-50 минут. Для начинающих — 15 минут. Главное: фокус без отвлечений.' }
    ],
    sources: [
      { title: 'Pomodoro Technique', url: 'https://francescocirillo.com/pages/pomodoro-technique' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор плана подготовки к экзамену
export const examPrepCalculator: Calculator = {
  id: 'exam-prep-calculator',
  slug: 'plan-podgotovki-k-ekzamenu',
  title: 'План подготовки к экзамену',
  description: 'Составление расписания подготовки к экзамену с учётом оставшегося времени и объёма материала',
  category: 'nauka-i-ucheba',
  subcategory: 'education',
  type: 'formula',
  inputs: [
    {
      name: 'daysUntilExam',
      label: 'Дней до экзамена',
      type: 'number',
      placeholder: '30',
      min: 1,
      max: 365,
      defaultValue: 30
    },
    {
      name: 'topicsCount',
      label: 'Количество тем/разделов',
      type: 'number',
      placeholder: '15',
      min: 1,
      max: 100,
      defaultValue: 15
    },
    {
      name: 'availableHours',
      label: 'Часов в день на подготовку',
      type: 'number',
      placeholder: '3',
      min: 0.5,
      max: 12,
      step: 0.5,
      defaultValue: 3
    },
    {
      name: 'examType',
      label: 'Тип экзамена',
      type: 'select',
      options: [
        { value: 'test', label: 'Тест (множественный выбор)' },
        { value: 'oral', label: 'Устный экзамен' },
        { value: 'written', label: 'Письменный развёрнутый' },
        { value: 'problem', label: 'Решение задач' }
      ],
      defaultValue: 'test'
    }
  ],
  outputs: [
    { name: 'dailyTopics', label: 'Тем в день', type: 'number', unit: 'тем' },
    { name: 'totalHours', label: 'Всего часов доступно', type: 'number', unit: 'ч' },
    { name: 'hoursPerTopic', label: 'На изучение темы', type: 'number', unit: 'ч' },
    { name: 'reviewDays', label: 'Дней на повторение', type: 'number', unit: 'дн' },
    { name: 'schedule', label: 'Рекомендуемый план', type: 'text' },
    { name: 'intensity', label: 'Интенсивность', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const days = Number(inputs.daysUntilExam || 30);
    const topics = Number(inputs.topicsCount || 15);
    const hoursPerDay = Number(inputs.availableHours || 3);
    const examType = String(inputs.examType || 'test');
    
    const totalHours = Math.round(days * hoursPerDay);
    
    // Reserve 20% of time for review
    const reviewRatio = 0.2;
    const studyDays = Math.floor(days * (1 - reviewRatio));
    const reviewDays = days - studyDays;
    
    const dailyTopics = Math.ceil(topics / studyDays);
    const hoursPerTopic = Math.round((totalHours * (1 - reviewRatio)) / topics * 10) / 10;
    
    let schedule = '';
    if (days > 14) {
      schedule = `Неделя 1-${Math.floor(studyDays / 7)}: изучение по ${dailyTopics} тем/день. Последние ${reviewDays} дней: повторение, решение пробных, отдых.`;
    } else {
      schedule = `Интенсивный режим: ${dailyTopics} тем каждый день + повторение вечером. Последний день: только повторение!`;
    }
    
    let intensity = '';
    if (dailyTopics > 3 && hoursPerDay > 4) {
      intensity = '⚠️ Высокая! Риск выгорания. Обязательно делайте перерывы и спите 7-8 часов.';
    } else if (dailyTopics <= 1) {
      intensity = 'Низкая. Есть запас времени для глубокого изучения или дополнительных источников.';
    } else {
      intensity = '✓ Умеренная. Оптимальный баланс между интенсивностью и усвоением.';
    }
    
    return [
      { value: dailyTopics, label: 'Тем в день', unit: 'тем' },
      { value: totalHours, label: 'Всего часов доступно', unit: 'ч' },
      { value: hoursPerTopic, label: 'На изучение темы', unit: 'ч' },
      { value: reviewDays, label: 'Дней на повторение', unit: 'дн' },
      { value: schedule, label: 'Рекомендуемый план' },
      { value: intensity, label: 'Интенсивность' }
    ];
  },
  content: {
    howTo: 'Введите дни до экзамена, количество тем и доступное время в день. Калькулятор составит план подготовки.',
    about: 'Эффективная подготовка включает: 1) Изучение материала (80% времени), 2) Повторение (20% времени). Запоминание требует интервалов и сна для консолидации.',
    formula: 'Тем в день = Всего тем / (Дней × 0.8)\n20% времени резервируется на повторение перед экзаменом',
    faq: [
      { question: 'Как лучше готовиться — постепенно или интенсивно?', answer: 'Распределённые повторения (spaced repetition) эффективнее зубрёжки. Лучше 1 час в день 30 дней, чем 10 часов в последнюю ночь.' },
      { question: 'Когда начинать повторение?', answer: 'Начинайте повторение за 3-5 дней до экзамена. Последний день — только лёгкое повторение формул/терминов, без нового материала.' }
    ],
    sources: [
      { title: 'Learning Scientists - Spaced Practice', url: 'https://www.learningscientists.org/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор стипендии
export const scholarshipCalculator: Calculator = {
  id: 'scholarship-calculator',
  slug: 'kalkulyator-stipendii',
  title: 'Калькулятор стипендии',
  description: 'Расчёт академической стипендии с учётом среднего балла и повышающих коэффициентов',
  category: 'nauka-i-ucheba',
  subcategory: 'education',
  type: 'formula',
  inputs: [
    {
      name: 'baseScholarship',
      label: 'Базовая стипендия (₽)',
      type: 'number',
      placeholder: '3000',
      min: 1000,
      max: 20000,
      defaultValue: 3000
    },
    {
      name: 'gpa',
      label: 'Средний балл (GPA 5.0)',
      type: 'number',
      placeholder: '4.5',
      min: 3,
      max: 5,
      step: 0.1,
      defaultValue: 4.5
    },
    {
      name: 'meritBonus',
      label: 'Повышающий коэффициент',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет (базовая)' },
        { value: 'good', label: 'Хорошая учёба (×1.4)' },
        { value: 'excellent', label: 'Отличная учёба (×1.8)' },
        { value: 'increased', label: 'Повышенная гос. (×2.0)' },
        { value: 'president', label: 'Президентская (×4.0+)' }
      ],
      defaultValue: 'excellent'
    },
    {
      name: 'achievements',
      label: 'Достижения (дополнительно)',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет' },
        { value: 'conference', label: 'Участие в конференции (+500₽)' },
        { value: 'olympiad', label: 'Олимпиада (+1000₽)' },
        { value: 'publication', label: 'Публикация статьи (+2000₽)' },
        { value: 'social', label: 'Общественная работа (+500₽)' }
      ],
      defaultValue: 'none'
    }
  ],
  outputs: [
    { name: 'totalScholarship', label: 'Итоговая стипендия', type: 'number', unit: '₽' },
    { name: 'coefficient', label: 'Коэффициент', type: 'number' },
    { name: 'bonus', label: 'Бонус за достижения', type: 'number', unit: '₽' },
    { name: 'annual', label: 'В год', type: 'number', unit: '₽' },
    { name: 'monthly', label: 'Ежемесячно', type: 'number', unit: '₽' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const base = Number(inputs.baseScholarship || 3000);
    const gpa = Number(inputs.gpa || 4.5);
    const merit = String(inputs.meritBonus || 'excellent');
    const achievements = String(inputs.achievements || 'none');
    
    // Merit coefficients
    const meritCoeff: Record<string, number> = {
      none: 1,
      good: 1.4,
      excellent: 1.8,
      increased: 2.0,
      president: 4.0
    };
    
    // Achievement bonuses
    const achievementBonus: Record<string, number> = {
      none: 0,
      conference: 500,
      olympiad: 1000,
      publication: 2000,
      social: 500
    };
    
    const coefficient = meritCoeff[merit];
    const bonus = achievementBonus[achievements];
    
    // Some universities reduce scholarship if GPA drops
    let gpaMultiplier = 1;
    if (gpa < 4.0) {
      gpaMultiplier = 0.7; // Reduced for good marks
    } else if (gpa < 3.5) {
      gpaMultiplier = 0; // No scholarship
    }
    
    const totalScholarship = Math.round(base * coefficient * gpaMultiplier + bonus);
    const annual = totalScholarship * 10; // Usually 10 months
    
    return [
      { value: totalScholarship, label: 'Итоговая стипендия', unit: '₽' },
      { value: coefficient, label: 'Коэффициент' },
      { value: bonus, label: 'Бонус за достижения', unit: '₽' },
      { value: annual, label: 'В год', unit: '₽' },
      { value: totalScholarship, label: 'Ежемесячно', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите базовую стипендию вашего ВУЗа, GPA и коэффициент. Калькулятор рассчитает итоговую сумму.',
    about: 'Академическая стипендия в России: базовая обычно 2000-3000₽. При хорошей учёбе ×1.4, отличной ×1.8. Повышенная государственная достигает 6000-8000₽.',
    formula: 'Стипендия = Базовая × Коэффициент + Бонусы\nКоэффициент: хорошо=1.4, отлично=1.8, повышенная=2.0',
    faq: [
      { question: 'Как получить повышенную стипендию?', answer: 'Нужен средний балл 4.5-5.0, участие в НИР, публикации, олимпиады. Подача заявления в деканат.' },
      { question: 'Могут ли лишить стипендии?', answer: 'Да, если средний балл упал ниже 4.0 (хорошо) или есть неудовлетворительные оценки. После сессии пересчитывается.' }
    ],
    sources: [
      { title: 'Минобрнауки — Стипендии', url: 'https://www.gov.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор затрат на образование
export const educationCostCalculator: Calculator = {
  id: 'education-cost-calculator',
  slug: 'zatraty-na-obrazovanie',
  title: 'Затраты на образование',
  description: 'Расчёт полной стоимости обучения в ВУЗе или колледже с учётом всех расходов',
  category: 'finansy',
  subcategory: 'education',
  type: 'formula',
  inputs: [
    {
      name: 'tuitionPerYear',
      label: 'Оплата за год (₽)',
      type: 'number',
      placeholder: '150000',
      min: 0,
      max: 1000000,
      defaultValue: 150000
    },
    {
      name: 'years',
      label: 'Количество лет',
      type: 'number',
      placeholder: '4',
      min: 1,
      max: 6,
      defaultValue: 4
    },
    {
      name: 'accommodation',
      label: 'Проживание в месяц (₽)',
      type: 'number',
      placeholder: '15000',
      min: 0,
      max: 50000,
      defaultValue: 15000
    },
    {
      name: 'food',
      label: 'Питание в месяц (₽)',
      type: 'number',
      placeholder: '12000',
      min: 0,
      max: 30000,
      defaultValue: 12000
    },
    {
      name: 'books',
      label: 'Книги/материалы в год (₽)',
      type: 'number',
      placeholder: '10000',
      min: 0,
      max: 50000,
      defaultValue: 10000
    },
    {
      name: 'transport',
      label: 'Транспорт в месяц (₽)',
      type: 'number',
      placeholder: '3000',
      min: 0,
      max: 10000,
      defaultValue: 3000
    }
  ],
  outputs: [
    { name: 'tuitionTotal', label: 'Всего за обучение', type: 'number', unit: '₽' },
    { name: 'livingTotal', label: 'Проживание всего', type: 'number', unit: '₽' },
    { name: 'totalCost', label: 'Полная стоимость', type: 'number', unit: '₽' },
    { name: 'perYear', label: 'В год', type: 'number', unit: '₽' },
    { name: 'perMonth', label: 'В месяц (в среднем)', type: 'number', unit: '₽' },
    { name: 'withScholarship', label: 'С учётом стипендии 3000₽/мес', type: 'number', unit: '₽' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const tuition = Number(inputs.tuitionPerYear || 150000);
    const years = Number(inputs.years || 4);
    const accommodation = Number(inputs.accommodation || 15000);
    const food = Number(inputs.food || 12000);
    const books = Number(inputs.books || 10000);
    const transport = Number(inputs.transport || 3000);
    
    const tuitionTotal = tuition * years;
    const monthlyLiving = accommodation + food + transport;
    const yearlyLiving = monthlyLiving * 12 + books;
    const livingTotal = yearlyLiving * years;
    
    const totalCost = tuitionTotal + livingTotal;
    const perYear = totalCost / years;
    const perMonth = totalCost / (years * 12);
    
    // With average scholarship
    const withScholarship = totalCost - (3000 * 10 * years); // 10 months per year
    
    return [
      { value: tuitionTotal, label: 'Всего за обучение', unit: '₽' },
      { value: livingTotal, label: 'Проживание всего', unit: '₽' },
      { value: totalCost, label: 'Полная стоимость', unit: '₽' },
      { value: Math.round(perYear), label: 'В год', unit: '₽' },
      { value: Math.round(perMonth), label: 'В месяц (в среднем)', unit: '₽' },
      { value: withScholarship, label: 'С учётом стипендии 3000₽/мес', unit: '₽' }
    ];
  },
  content: {
    howTo: 'Введите стоимость обучения, количество лет, расходы на проживание, питание, книги и транспорт. Калькулятор покажет полную стоимость образования.',
    about: 'Полная стоимость образования включает не только оплату за обучение, но и проживание, питание, книги, транспорт. В России бюджетное образование бесплатно для поступивших на бюджет.',
    formula: 'Полная стоимость = Обучение × Годы + (Проживание + Питание + Транспорт) × 12 × Годы + Книги × Годы',
    faq: [
      { question: 'Как снизить затраты на образование?', answer: '1) Поступить на бюджет (бесплатно). 2) Получать повышенную стипендию. 3) Жить в общежитии (дешевле аренды). 4) Покупать б/у учебники.' },
      { question: 'Сколько стоит образование в Москве?', answer: 'Бюджет: только проживание ~15-20 тыс/мес. Платное: обучение 150-500 тыс/год + проживание. Всего ~400-800 тыс в год.' }
    ],
    sources: [
      { title: 'Стоимость образования в России', url: 'https://www.edu.ru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор запоминания (интервальное повторение)
export const spacedRepetitionCalculator: Calculator = {
  id: 'spaced-repetition-calculator',
  slug: 'intervalnoe-povtorenie',
  title: 'Интервальное повторение',
  description: 'Расчёт оптимальных интервалов повторения материала для лучшего запоминания',
  category: 'nauka-i-ucheba',
  subcategory: 'education',
  type: 'formula',
  inputs: [
    {
      name: 'itemsCount',
      label: 'Количество элементов для запоминания',
      type: 'number',
      placeholder: '100',
      min: 10,
      max: 1000,
      defaultValue: 100
    },
    {
      name: 'difficulty',
      label: 'Сложность материала',
      type: 'select',
      options: [
        { value: 'easy', label: 'Лёгкий (факты, определения)' },
        { value: 'medium', label: 'Средний (формулы, даты)' },
        { value: 'hard', label: 'Сложный (языки, сложные концепции)' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'daysUntilTest',
      label: 'Дней до проверки знаний',
      type: 'number',
      placeholder: '30',
      min: 1,
      max: 365,
      defaultValue: 30
    }
  ],
  outputs: [
    { name: 'newPerDay', label: 'Новых элементов в день', type: 'number', unit: 'шт' },
    { name: 'reviewPerDay', label: 'Повторений в день', type: 'number', unit: 'шт' },
    { name: 'interval1', label: '1-е повторение', type: 'text' },
    { name: 'interval2', label: '2-е повторение', type: 'text' },
    { name: 'interval3', label: '3-е повторение', type: 'text' },
    { name: 'interval4', label: '4-е повторение', type: 'text' },
    { name: 'method', label: 'Методика', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const items = Number(inputs.itemsCount || 100);
    const difficulty = String(inputs.difficulty || 'medium');
    const days = Number(inputs.daysUntilTest || 30);
    
    // Calculate how many new items per day
    const newPerDay = Math.ceil(items / days);
    
    // Intervals based on difficulty (in days)
    const intervals: Record<string, number[]> = {
      easy: [1, 3, 7, 14],
      medium: [1, 2, 4, 8],
      hard: [1, 1, 3, 5]
    };
    
    const interval = intervals[difficulty];
    
    // Estimated reviews per day (cumulative)
    let totalReviews = 0;
    for (let i = 1; i <= days; i++) {
      // Count items due for review on day i
      let dueToday = 0;
      for (let j = 1; j <= Math.min(i, items / newPerDay); j++) {
        const itemDay = j; // day when item was first learned
        const daysSinceLearned = i - itemDay;
        // Check if today matches any review interval
        if (interval.includes(daysSinceLearned) || 
            (daysSinceLearned > 14 && daysSinceLearned % 14 === 0)) {
          dueToday++;
        }
      }
      totalReviews += dueToday;
    }
    
    const avgReviewPerDay = Math.round(totalReviews / days) + newPerDay;
    
    let method = '';
    if (difficulty === 'easy') {
      method = 'Метод Лейтнера: боксы с интервалами 1-3-7-14 дней. Простые карточки быстро переходят в дальние боксы.';
    } else if (difficulty === 'hard') {
      method = 'Частое повторение в начале: 1-1-3-5 дней. Сложный материал требует больше повторений на старте.';
    } else {
      method = 'Классическая схема СuperMemo: 1-2-4-8 дней. Оптимально для большинства материала.';
    }
    
    return [
      { value: newPerDay, label: 'Новых элементов в день', unit: 'шт' },
      { value: avgReviewPerDay, label: 'Повторений в день', unit: 'шт' },
      { value: `Через ${interval[0]} день`, label: '1-е повторение' },
      { value: `Через ${interval[1]} дня`, label: '2-е повторение' },
      { value: `Через ${interval[2]} дней`, label: '3-е повторение' },
      { value: `Через ${interval[3]} дней`, label: '4-е повторение' },
      { value: method, label: 'Методика' }
    ];
  },
  content: {
    howTo: 'Введите количество элементов для запоминания, сложность и срок до экзамена. Калькулятор рассчитает график интервальных повторений.',
    about: 'Интервальное повторение (spaced repetition) — методика, при которой материал повторяется через увеличивающиеся интервалы. Основана на кривой забывания Эббингауза.',
    formula: 'Интервалы: 1 → 2 → 4 → 8 → 16 → 32 дня\nКривая забывания: через 1 день забыто 50%, через интервальное повторение — 80-90% сохраняется',
    faq: [
      { question: 'Почему интервальное повторение работает?', answer: 'Активное вспоминание в момент "почти забыл" укрепляет нейронные связи. Повторять слишком часто — неэффективно, слишком редко — забывается.' },
      { question: 'Какие программы использовать?', answer: 'Anki (бесплатная, лучшая), Quizlet, Memrise, TinyCards. Для языков — особенно эффективно.' }
    ],
    sources: [
      { title: 'Ebbinghaus Forgetting Curve', url: 'https://en.wikipedia.org/wiki/Forgetting_curve' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор конвертации оценок между системами
export const gradeConverterCalculator: Calculator = {
  id: 'grade-converter',
  slug: 'konverter-ocenok',
  title: 'Конвертер оценок',
  description: 'Перевод оценок между российской 5-балльной, американской буквенной и 100-балльной системами',
  category: 'nauka-i-ucheba',
  subcategory: 'education',
  type: 'converter',
  inputs: [
    {
      name: 'grade',
      label: 'Оценка',
      type: 'number',
      placeholder: '4',
      min: 1,
      max: 100,
      defaultValue: 4
    },
    {
      name: 'fromSystem',
      label: 'Из системы',
      type: 'select',
      options: [
        { value: 'russian5', label: 'Российская (5-балльная)' },
        { value: 'russian100', label: 'Российская (100-балльная)' },
        { value: 'letter', label: 'Американская (A-F)' },
        { value: 'gpa4', label: 'GPA (4.0)' },
        { value: 'gpa5', label: 'GPA (5.0)' },
        { value: 'percent', label: 'Проценты (0-100%)' }
      ],
      defaultValue: 'russian5'
    }
  ],
  outputs: [
    { name: 'russian5', label: 'Российская (5)', type: 'text' },
    { name: 'russian100', label: '100-балльная', type: 'text' },
    { name: 'letter', label: 'Буквенная (A-F)', type: 'text' },
    { name: 'gpa4', label: 'GPA 4.0', type: 'text' },
    { name: 'gpa5', label: 'GPA 5.0', type: 'text' },
    { name: 'description', label: 'Описание', type: 'text' }
  ],
  calculate: (inputs): any => {
      const n = inputs as Record<string, number>;
    const grade = Number(inputs.grade || 4);
    const fromSystem = String(inputs.fromSystem || 'russian5');
    
    // Convert to percentage first as base
    let percent = 0;
    
    switch (fromSystem) {
      case 'russian5':
        // 5=90-100, 4=75-89, 3=60-74, 2=40-59, 1=0-39
        const rus5map: Record<number, number> = { 5: 95, 4: 82, 3: 67, 2: 50, 1: 20 };
        percent = rus5map[Math.round(grade)] || 50;
        break;
      case 'russian100':
        percent = grade;
        break;
      case 'percent':
        percent = grade;
        break;
      case 'gpa4':
        percent = grade * 25; // 4.0 = 100%
        break;
      case 'gpa5':
        percent = grade * 20; // 5.0 = 100%
        break;
      case 'letter':
        // This won't work well with numeric input, default to interpretation
        percent = grade >= 90 ? 95 : grade >= 80 ? 85 : grade >= 70 ? 77 : grade >= 60 ? 65 : 50;
        break;
    }
    
    // Convert from percentage to all systems
    let russian5 = '';
    let russian100 = '';
    let letter = '';
    let gpa4 = '';
    let gpa5 = '';
    let description = '';
    
    if (percent >= 90) {
      russian5 = '5 (Отлично)';
      russian100 = '90-100';
      letter = 'A (Excellent)';
      gpa4 = '4.0';
      gpa5 = '5.0';
      description = 'Высший уровень знаний';
    } else if (percent >= 80) {
      russian5 = '4 (Хорошо)';
      russian100 = '80-89';
      letter = 'B (Good)';
      gpa4 = '3.0-3.9';
      gpa5 = '4.0-4.9';
      description = 'Хорошие знания с небольшими пробелами';
    } else if (percent >= 70) {
      russian5 = '4/3 (Хорошо/Удовл.)';
      russian100 = '70-79';
      letter = 'C (Satisfactory)';
      gpa4 = '2.0-2.9';
      gpa5 = '3.0-3.9';
      description = 'Удовлетворительные знания';
    } else if (percent >= 60) {
      russian5 = '3 (Удовлетворительно)';
      russian100 = '60-69';
      letter = 'D (Passing)';
      gpa4 = '1.0-1.9';
      gpa5 = '2.0-2.9';
      description = 'Минимально допустимый уровень';
    } else if (percent >= 40) {
      russian5 = '2 (Неудовлетворительно)';
      russian100 = '40-59';
      letter = 'F (Fail)';
      gpa4 = '0.0';
      gpa5 = '1.0-1.9';
      description = 'Незачёт, требуется пересдача';
    } else {
      russian5 = '2/1 (Неуд.)';
      russian100 = '0-39';
      letter = 'F (Fail)';
      gpa4 = '0.0';
      gpa5 = '0.0-1.0';
      description = 'Полное незнание материала';
    }
    
    return [
      { value: russian5, label: 'Российская (5)' },
      { value: russian100, label: '100-балльная' },
      { value: letter, label: 'Буквенная (A-F)' },
      { value: gpa4, label: 'GPA 4.0' },
      { value: gpa5, label: 'GPA 5.0' },
      { value: description, label: 'Описание' }
    ];
  },
  content: {
    howTo: 'Введите оценку в одной из систем и выберите исходную шкалу. Калькулятор переведёт во все основные системы оценивания.',
    about: 'Разные страны используют разные системы оценивания. Россия — 5-балльная, США — буквенная (A-F) и GPA 4.0, многие европейские страны — 100-балльная или 10-балльная.',
    formula: '5 (РФ) = A (90-100%) = GPA 4.0\n4 (РФ) = B (80-89%) = GPA 3.0\n3 (РФ) = C/D (60-79%) = GPA 2.0',
    faq: [
      { question: 'Как перевести GPA 4.0 в российскую систему?', answer: 'GPA 4.0 = 5 (отлично), GPA 3.5-3.9 = 4-5 (хорошо-отлично), GPA 3.0 = 4 (хорошо), GPA 2.0 = 3 (удовлетворительно).' },
      { question: 'Что такое GPA 5.0?', answer: 'GPA 5.0 используется в некоторых азиатских странах и России при переводе. Российская 5 = GPA 5.0, 4 = GPA 4.0 и т.д.' }
    ],
    sources: [
      { title: 'World Education Services - Grade Conversion', url: 'https://www.wes.org/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const educationLearningCalculators: Calculator[] = [
  gpaCalculator,
  readingTimeCalculator,
  pomodoroCalculator,
  examPrepCalculator,
  scholarshipCalculator,
  educationCostCalculator,
  spacedRepetitionCalculator,
  gradeConverterCalculator
];
