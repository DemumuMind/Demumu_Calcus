import { Calculator } from '../types';

// Подсчёт слов и символов
export const wordCountCalculator: Calculator = {
  id: 'word-count',
  slug: 'podschet-slov',
  title: 'Подсчёт слов и символов',
  description: 'Считает количество слов, символов, предложений в тексте',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'text',
      label: 'Текст',
      type: 'text',
      placeholder: 'Введите текст для анализа...',
      defaultValue: ''
    }
  ],
  outputs: [
    { name: 'wordCount', label: 'Слов', type: 'number', unit: 'шт' },
    { name: 'charCount', label: 'Символов (с пробелами)', type: 'number', unit: 'шт' },
    { name: 'charCountNoSpaces', label: 'Символов (без пробелов)', type: 'number', unit: 'шт' },
    { name: 'sentenceCount', label: 'Предложений', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const text = String(inputs.text || '');
    
    if (!text.trim()) {
      return [
        { value: '0', label: 'Слов', unit: 'шт' },
        { value: '0', label: 'Символов (с пробелами)', unit: 'шт' },
        { value: '0', label: 'Символов (без пробелов)', unit: 'шт' },
        { value: '0', label: 'Предложений', unit: 'шт' }
      ];
    }
    
    const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    return [
      { value: wordCount.toString(), label: 'Слов', unit: 'шт' },
      { value: charCount.toString(), label: 'Символов (с пробелами)', unit: 'шт' },
      { value: charCountNoSpaces.toString(), label: 'Символов (без пробелов)', unit: 'шт' },
      { value: sentenceCount.toString(), label: 'Предложений', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите или вставьте текст. Калькулятор автоматически подсчитает слова, символы и предложения.',
    about: 'Инструмент для подсчёта статистики текста: количество слов, символов с пробелами и без, предложений.',
    usage: 'Используется для написания статей, постов (с лимитами символов), SEO-анализа, переводов, копирайтинга.',
    formula: 'Слова разделяются пробелами\nПредложения разделяются . ! ?',
    faq: [
      {
        question: 'Как считаются слова?',
        answer: 'Слова разделяются пробелами и переносами строк. Последовательность непробельных символов — одно слово.'
      },
      {
        question: 'Есть ли ограничение по длине текста?',
        answer: 'Нет, можно вводить тексты любой длины. Счётчик работает в реальном времени.'
      }
    ],
    sources: [
      { title: 'Слово — Википедия', url: 'https://ru.wikipedia.org/wiki/Слово' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Время чтения
export const readingTimeCalculator: Calculator = {
  id: 'reading-time',
  slug: 'vremya-chteniya',
  title: 'Время чтения',
  description: 'Расчёт времени чтения текста с учётом скорости',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'wordCount',
      label: 'Количество слов',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      min: 1
    },
    {
      name: 'readingSpeed',
      label: 'Скорость чтения',
      type: 'select',
      options: [
        { value: '150', label: '150 слов/мин — медленно' },
        { value: '200', label: '200 слов/мин — средне' },
        { value: '250', label: '250 слов/мин — быстро' },
        { value: '300', label: '300 слов/мин — очень быстро' }
      ],
      defaultValue: '200'
    }
  ],
  outputs: [
    { name: 'minutes', label: 'Минут чтения', type: 'number', unit: 'мин' },
    { name: 'formatted', label: 'Форматированное время', type: 'text' }
  ],
  calculate: (inputs) => {
    const wordCount = Number(inputs.wordCount);
    const readingSpeed = Number(inputs.readingSpeed);
    
    if (!wordCount || !readingSpeed) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const minutes = wordCount / readingSpeed;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.ceil(minutes % 60);
    
    let formatted: string;
    if (hours > 0) {
      formatted = `${hours} ч ${remainingMinutes} мин`;
    } else {
      formatted = `${Math.ceil(minutes)} мин`;
    }
    
    return [
      { value: minutes.toFixed(1), label: 'Минут чтения', unit: 'мин' },
      { value: formatted, label: 'Примерно', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите количество слов и выберите скорость чтения. Калькулятор покажет время чтения.',
    about: 'Калькулятор времени чтения оценивает, сколько времени потребуется для чтения текста определённой длины.',
    usage: 'Используется для указания времени чтения в статьях, планирования чтения, оценки сложности материала.',
    formula: 'Время (мин) = количество слов / скорость чтения\nСредняя скорость: 200 слов/мин',
    faq: [
      {
        question: 'Какая средняя скорость чтения?',
        answer: 'Взрослый человек читает в среднем 200-250 слов в минуту. Скорость можно улучшить тренировками до 400+.'
      },
      {
        question: 'От чего зависит скорость чтения?',
        answer: 'От сложности текста, знакомства с темой, языка, форматирования, опыта читателя, концентрации.'
      }
    ],
    sources: [
      { title: 'Скорочтение — Википедия', url: 'https://ru.wikipedia.org/wiki/Скорочтение' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Сила пароля
export const passwordStrengthCalculator: Calculator = {
  id: 'password-strength',
  slug: 'sila-parolya',
  title: 'Проверка силы пароля',
  description: 'Оценка надёжности и энтропии пароля',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'password',
      label: 'Пароль',
      type: 'text',
      placeholder: 'Введите пароль...',
      defaultValue: 'MyP@ssw0rd!'
    }
  ],
  outputs: [
    { name: 'strength', label: 'Надёжность', type: 'text' },
    { name: 'entropy', label: 'Энтропия', type: 'number', unit: 'бит' },
    { name: 'timeToCrack', label: 'Время взлома', type: 'text' }
  ],
  calculate: (inputs) => {
    const password = String(inputs.password || '');
    
    if (!password) {
      return [
        { value: 'Введите пароль', label: 'Надёжность', unit: '' },
        { value: '0', label: 'Энтропия', unit: 'бит' },
        { value: '-', label: 'Время взлома', unit: '' }
      ];
    }
    
    const length = password.length;
    
    // Determine character set size
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;
    
    if (charsetSize === 0) charsetSize = 1;
    
    // Calculate entropy
    const entropy = Math.log2(Math.pow(charsetSize, length));
    
    // Determine strength
    let strength: string;
    if (entropy < 28) strength = 'Очень слабый';
    else if (entropy < 36) strength = 'Слабый';
    else if (entropy < 60) strength = 'Средний';
    else if (entropy < 80) strength = 'Сильный';
    else strength = 'Очень сильный';
    
    // Estimate crack time (assuming 1 billion guesses per second)
    const guessesPerSecond = 1000000000;
    const secondsToCrack = Math.pow(2, entropy) / guessesPerSecond;
    
    let timeToCrack: string;
    if (secondsToCrack < 1) timeToCrack = 'Мгновенно';
    else if (secondsToCrack < 60) timeToCrack = `${Math.round(secondsToCrack)} сек`;
    else if (secondsToCrack < 3600) timeToCrack = `${Math.round(secondsToCrack / 60)} мин`;
    else if (secondsToCrack < 86400) timeToCrack = `${Math.round(secondsToCrack / 3600)} час`;
    else if (secondsToCrack < 31536000) timeToCrack = `${Math.round(secondsToCrack / 86400)} дн`;
    else if (secondsToCrack < 3153600000) timeToCrack = `${Math.round(secondsToCrack / 31536000)} лет`;
    else timeToCrack = 'Миллиарды лет';
    
    return [
      { value: strength, label: 'Надёжность', unit: '' },
      { value: Math.round(entropy).toString(), label: 'Энтропия', unit: 'бит' },
      { value: timeToCrack, label: 'Время взлома', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите пароль. Калькулятор оценит его надёжность на основе длины, используемых символов и энтропии.',
    about: 'Калькулятор оценивает силу пароля через энтропию — меру непредсказуемости. Чем выше энтропия, тем сложнее подобрать пароль.',
    usage: 'Используется для проверки надёжности паролей, выбора безопасных комбинаций, оценки рисков.',
    formula: 'Энтропия = L × log₂(N)\nгде L — длина, N — размер набора символов',
    faq: [
      {
        question: 'Какой пароль считается надёжным?',
        answer: 'Минимум 12 символов, смесь букв разного регистра, цифр, спецсимволов. Энтропия > 60 бит.'
      },
      {
        question: 'Что такое энтропия пароля?',
        answer: 'Мера случайности пароля в битах. 30 бит — слабый, 60+ бит — сильный, 80+ бит — очень сильный.'
      }
    ],
    sources: [
      { title: 'Пароль — Википедия', url: 'https://ru.wikipedia.org/wiki/Пароль' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const textCalculators = [
  wordCountCalculator,
  readingTimeCalculator,
  passwordStrengthCalculator,
];
