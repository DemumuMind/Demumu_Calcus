import { Calculator } from '../types';

// Генератор случайных чисел
export const randomNumberGenerator: Calculator = {
  id: 'random-number',
  slug: 'generator-sluchajnyh-chisel',
  title: 'Случайное число',
  description: 'Генератор случайных чисел в заданном диапазоне',
  category: 'tekhnologii',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'min',
      label: 'Минимум',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'max',
      label: 'Максимум',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'count',
      label: 'Количество',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 1,
      max: 10
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const min = Number(inputs.min);
    const max = Number(inputs.max);
    const count = Math.min(Number(inputs.count), 10);
    
    if (isNaN(min) || isNaN(max) || min >= max) {
      return [{ value: 'Неверный диапазон', label: 'Ошибка' }];
    }
    
    const numbers: number[] = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    
    return [
      { value: numbers.join(', '), label: 'Случайные числа', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите минимум, максимум и количество чисел. Калькулятор сгенерирует случайные числа в диапазоне.',
    about: 'Генератор псевдослучайных чисел в заданном диапазоне. Использует встроенный генератор JavaScript.',
    usage: 'Используется для лотерей, жеребьёвки, выбора случайного элемента, игр, обучения.',
    formula: 'Math.floor(Math.random() × (max - min + 1)) + min',
    faq: [
      {
        question: 'Это действительно случайные числа?',
        answer: 'Нет, это псевдослучайные числа, достаточные для большинства задач, но не для криптографии.'
      },
      {
        question: 'Можно ли сгенерировать несколько чисел?',
        answer: 'Да, укажите количество от 1 до 10. Числа могут повторяться.'
      }
    ],
    sources: [
      { title: 'Генератор случайных чисел — Википедия', url: 'https://ru.wikipedia.org/wiki/Генератор_случайных_чисел' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Генератор паролей
export const passwordGenerator: Calculator = {
  id: 'password-generator',
  slug: 'generator-parolej',
  title: 'Генератор паролей',
  description: 'Генератор надёжных случайных паролей',
  category: 'tekhnologii',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'length',
      label: 'Длина пароля',
      type: 'number',
      placeholder: '16',
      defaultValue: 16,
      min: 4,
      max: 64
    },
    {
      name: 'uppercase',
      label: 'Заглавные буквы (A-Z)',
      type: 'select',
      options: [
        { value: 'yes', label: 'Да' },
        { value: 'no', label: 'Нет' }
      ],
      defaultValue: 'yes'
    },
    {
      name: 'numbers',
      label: 'Цифры (0-9)',
      type: 'select',
      options: [
        { value: 'yes', label: 'Да' },
        { value: 'no', label: 'Нет' }
      ],
      defaultValue: 'yes'
    },
    {
      name: 'symbols',
      label: 'Спецсимволы (!@#$%^&*)',
      type: 'select',
      options: [
        { value: 'yes', label: 'Да' },
        { value: 'no', label: 'Нет' }
      ],
      defaultValue: 'yes'
    }
  ],
  outputs: [
    { name: 'password', label: 'Пароль', type: 'text' },
    { name: 'strength', label: 'Оценка надёжности', type: 'text' }
  ],
  calculate: (inputs) => {
    const length = Number(inputs.length);
    const useUppercase = String(inputs.uppercase) === 'yes';
    const useNumbers = String(inputs.numbers) === 'yes';
    const useSymbols = String(inputs.symbols) === 'yes';
    
    if (length < 4 || length > 64) {
      return [{ value: 'Неверная длина', label: 'Ошибка' }];
    }
    
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Calculate strength
    let strength = 'Слабый';
    if (length >= 12 && useUppercase && useNumbers && useSymbols) {
      strength = 'Очень сильный';
    } else if (length >= 10 && useUppercase && useNumbers && useSymbols) {
      strength = 'Сильный';
    } else if (length >= 8 && (useUppercase || useNumbers)) {
      strength = 'Средний';
    }
    
    return [
      { value: password, label: 'Пароль', unit: '' },
      { value: strength, label: 'Надёжность', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите длину и типы символов. Калькулятор сгенерирует случайный пароль с указанными параметрами.',
    about: 'Генератор создаёт надёжные случайные пароли с различными наборами символов для безопасности.',
    usage: 'Используется для создания новых паролей, обновления старых, генерации ключей и кодов.',
    formula: 'Случайный выбор символов из заданного набора',
    faq: [
      {
        question: 'Какой пароль считается надёжным?',
        answer: 'Минимум 12 символов с буквами разных регистров, цифрами и спецсимволами.'
      },
      {
        question: 'Где хранить сгенерированные пароли?',
        answer: 'Используйте менеджер паролей: Bitwarden, KeePass, 1Password. Не храните в открытом виде.'
      }
    ],
    sources: [
      { title: 'Менеджер паролей — Википедия', url: 'https://ru.wikipedia.org/wiki/Менеджер_паролей' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Бросок костей
export const diceRoller: Calculator = {
  id: 'dice-roller',
  slug: 'broskok-kostej',
  title: 'Бросок костей',
  description: 'Симуляция броска игральных костей d4, d6, d8, d10, d12, d20',
  category: 'povsednevnoe',
  subcategory: 'razvlecheniya',
  type: 'formula',
  inputs: [
    {
      name: 'diceType',
      label: 'Тип кости',
      type: 'select',
      options: [
        { value: '4', label: 'd4 (4 грани)' },
        { value: '6', label: 'd6 (6 граней) — стандартная' },
        { value: '8', label: 'd8 (8 граней)' },
        { value: '10', label: 'd10 (10 граней)' },
        { value: '12', label: 'd12 (12 граней)' },
        { value: '20', label: 'd20 (20 граней) — D&D' }
      ],
      defaultValue: '6'
    },
    {
      name: 'count',
      label: 'Количество костей',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 1,
      max: 10
    }
  ],
  outputs: [
    { name: 'result', label: 'Результаты', type: 'text' },
    { name: 'total', label: 'Сумма', type: 'number' }
  ],
  calculate: (inputs) => {
    const diceType = Number(inputs.diceType);
    const count = Math.min(Number(inputs.count), 10);
    
    const results: number[] = [];
    for (let i = 0; i < count; i++) {
      results.push(Math.floor(Math.random() * diceType) + 1);
    }
    
    const total = results.reduce((a, b) => a + b, 0);
    
    return [
      { value: results.join(' + '), label: 'Выпало', unit: '' },
      { value: total.toString(), label: 'Сумма', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите тип кости и количество. Калькулятор имитирует бросок и покажет результаты.',
    about: 'Симулятор броска многогранных костей (d4, d6, d8, d10, d12, d20), используемых в настольных играх и D&D.',
    usage: 'Используется для настольных игр (D&D, Pathfinder), когда нет физических костей.',
    formula: 'Math.floor(Math.random() × граней) + 1',
    faq: [
      {
        question: 'Что такое d20?',
        answer: 'd20 — 20-гранная кость, основная в Dungeons & Dragons. Результат 20 — критический успех, 1 — провал.'
      },
      {
        question: 'Можно ли бросить несколько костей?',
        answer: 'Да, можно бросить до 10 костей одновременно. Результаты и сумма показываются отдельно.'
      }
    ],
    sources: [
      { title: 'Игральная кость — Википедия', url: 'https://ru.wikipedia.org/wiki/Игральная_кость' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const generatorCalculators = [
  randomNumberGenerator,
  passwordGenerator,
  diceRoller,
];
