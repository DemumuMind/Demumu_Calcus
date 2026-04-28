import { Calculator } from '../types';

// 1. Калькулятор логарифмов
export const logarithmCalculator: Calculator = {
  id: 'logarithm-calculator',
  slug: 'kalkulyator-logarifmov',
  title: 'Калькулятор логарифмов',
  description: 'Вычисление натурального, десятичного и логарифма по произвольному основанию',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'value',
      label: 'Число (аргумент)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0.0001,
      step: 0.01
    },
    {
      name: 'base',
      label: 'Основание логарифма',
      type: 'select',
      options: [
        { value: 'e', label: 'e — натуральный (ln)' },
        { value: '10', label: '10 — десятичный (lg)' },
        { value: '2', label: '2 — двоичный' },
        { value: 'custom', label: 'Произвольное основание' }
      ],
      defaultValue: 'e'
    },
    {
      name: 'customBase',
      label: 'Произвольное основание',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 0.0001,
      step: 0.01
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'number' },
    { name: 'formula', label: 'Формула', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const base = String(inputs.base);
    const customBase = Number(inputs.customBase);
    
    if (!value || value <= 0) {
      return [{ value: '—', label: 'Результат', additionalInfo: 'Аргумент должен быть > 0' }];
    }
    
    let result = 0;
    let formula = '';
    
    switch (base) {
      case 'e':
        result = Math.log(value);
        formula = `ln(${value})`;
        break;
      case '10':
        result = Math.log10(value);
        formula = `lg(${value})`;
        break;
      case '2':
        result = Math.log2(value);
        formula = `log₂(${value})`;
        break;
      case 'custom':
        if (!customBase || customBase <= 0 || customBase === 1) {
          return [{ value: '—', label: 'Результат', additionalInfo: 'Основание должно быть > 0 и ≠ 1' }];
        }
        result = Math.log(value) / Math.log(customBase);
        formula = `log${customBase}(${value})`;
        break;
    }
    
    return [
      { value: result.toFixed(6), label: 'Результат' },
      { value: formula, label: 'Формула' }
    ];
  },
  content: {
    howTo: 'Введите число и выберите основание логарифма. Для произвольного основания введите его значение.',
    about: 'Логарифм — это показатель степени, в которую нужно возвести основание, чтобы получить аргумент.',
    usage: 'Используется в математике, физике, информатике, финансах.',
    formula: 'logₐ(b) = ln(b) / ln(a)',
    faq: [
      {
        question: 'Что такое натуральный логарифм?',
        answer: 'Логарифм по основанию e ≈ 2.71828. Обозначается ln(x).'
      },
      {
        question: 'Почему аргумент должен быть положительным?',
        answer: 'Логарифм отрицательного числа не определён в действительных числах.'
      }
    ],
    sources: [
      { title: 'Логарифм — Википедия', url: 'https://ru.wikipedia.org/wiki/Логарифм' }
    ],
    updatedAt: '2026-04-27'
  }
};

// 2. Римские цифры
export const romanNumeralsCalculator: Calculator = {
  id: 'roman-numerals-calculator',
  slug: 'rimskie-cifry',
  title: 'Римские цифры',
  description: 'Перевод арабских чисел в римские и обратно',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'mode',
      label: 'Направление перевода',
      type: 'select',
      options: [
        { value: 'arabic_to_roman', label: 'Арабские → Римские' },
        { value: 'roman_to_arabic', label: 'Римские → Арабские' }
      ],
      defaultValue: 'arabic_to_roman'
    },
    {
      name: 'arabicNumber',
      label: 'Арабское число',
      type: 'number',
      placeholder: '2024',
      defaultValue: 2024,
      min: 1,
      max: 3999
    },
    {
      name: 'romanNumber',
      label: 'Римское число',
      type: 'text',
      placeholder: 'MMXXIV',
      defaultValue: 'MMXXIV'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const mode = String(inputs.mode);
    
    if (mode === 'arabic_to_roman') {
      const num = Math.floor(Number(inputs.arabicNumber));
      if (!num || num < 1 || num > 3999) {
        return [{ value: '—', label: 'Результат', additionalInfo: 'Число должно быть от 1 до 3999' }];
      }
      
      const romanMap: Record<number, string> = {
        1000: 'M', 900: 'CM', 500: 'D', 400: 'CD',
        100: 'C', 90: 'XC', 50: 'L', 40: 'XL',
        10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I'
      };
      
      let result = '';
      let remaining = num;
      const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
      
      for (const value of values) {
        while (remaining >= value) {
          result += romanMap[value];
          remaining -= value;
        }
      }
      
      return [{ value: `${num} = ${result}`, label: 'Результат' }];
    } else {
      const roman = String(inputs.romanNumber).toUpperCase().trim();
      if (!roman) {
        return [{ value: '—', label: 'Результат' }];
      }
      
      const romanValues: Record<string, number> = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
      };
      
      let result = 0;
      let prev = 0;
      
      for (let i = roman.length - 1; i >= 0; i--) {
        const current = romanValues[roman[i]] || 0;
        if (current < prev) {
          result -= current;
        } else {
          result += current;
          prev = current;
        }
      }
      
      return [{ value: `${roman} = ${result}`, label: 'Результат' }];
    }
  },
  content: {
    howTo: 'Выберите направление перевода и введите число.',
    about: 'Римские цифры — система записи чисел, использовавшаяся в Древнем Риме.',
    usage: 'Используется в нумерологии, истории, оформлении документов.',
    formula: 'I=1, V=5, X=10, L=50, C=100, D=500, M=1000',
    faq: [
      {
        question: 'Как записать 4?',
        answer: 'IV — вычитание: 5 - 1 = 4. Это принцип субтрактивной записи.'
      }
    ],
    sources: [
      { title: 'Римские цифры — Википедия', url: 'https://ru.wikipedia.org/wiki/Римские_цифры' }
    ],
    updatedAt: '2026-04-27'
  }
};

// 3. Сумма прописью
export const sumInWordsCalculator: Calculator = {
  id: 'sum-in-words-calculator',
  slug: 'summa-propisyu',
  title: 'Сумма прописью',
  description: 'Перевод числа в текстовую форму для документов',
  category: 'finansy',
  subcategory: 'nalogi',
  type: 'formula',
  inputs: [
    {
      name: 'amount',
      label: 'Сумма',
      type: 'number',
      placeholder: '12345.67',
      defaultValue: 12345.67,
      min: 0,
      step: 0.01
    },
    {
      name: 'currency',
      label: 'Валюта',
      type: 'select',
      options: [
        { value: 'rub', label: 'Рубли' },
        { value: 'usd', label: 'Доллары' },
        { value: 'eur', label: 'Евро' }
      ],
      defaultValue: 'rub'
    },
    {
      name: 'format',
      label: 'Формат',
      type: 'select',
      options: [
        { value: 'lowercase', label: 'строчными буквами' },
        { value: 'uppercase', label: 'ЗАГЛАВНЫМИ БУКВАМИ' },
        { value: 'capitalize', label: 'С Заглавной Буквы' }
      ],
      defaultValue: 'lowercase'
    }
  ],
  outputs: [
    { name: 'text', label: 'Прописью', type: 'text' },
    { name: 'withNumber', label: 'С цифрами', type: 'text' }
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const currency = String(inputs.currency);
    const format = String(inputs.format);
    
    if (!amount && amount !== 0) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать',
                   'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
    
    const thousandsForms = ['тысяча', 'тысячи', 'тысяч'];
    const millionsForms = ['миллион', 'миллиона', 'миллионов'];
    
    function getPluralForm(n: number, forms: string[]): string {
      const lastDigit = n % 10;
      const lastTwoDigits = n % 100;
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return forms[2];
      if (lastDigit === 1) return forms[0];
      if (lastDigit >= 2 && lastDigit <= 4) return forms[1];
      return forms[2];
    }
    
    function convertLessThanThousand(n: number, isThousand = false): string {
      if (n === 0) return '';
      
      let result = '';
      const h = Math.floor(n / 100);
      const remainder = n % 100;
      
      if (h > 0) result += hundreds[h] + ' ';
      
      if (remainder >= 10 && remainder < 20) {
        result += teens[remainder - 10] + ' ';
      } else {
        const t = Math.floor(remainder / 10);
        const u = remainder % 10;
        if (t > 0) result += tens[t] + ' ';
        if (u > 0) {
          if (isThousand && u === 1) result += 'одна ';
          else if (isThousand && u === 2) result += 'две ';
          else result += units[u] + ' ';
        }
      }
      
      return result.trim();
    }
    
    function numberToWords(n: number): string {
      if (n === 0) return 'ноль';
      
      let result = '';
      
      const millions = Math.floor(n / 1000000);
      const thousands = Math.floor((n % 1000000) / 1000);
      const remainder = n % 1000;
      
      if (millions > 0) {
        result += convertLessThanThousand(millions) + ' ' + getPluralForm(millions, millionsForms) + ' ';
      }
      
      if (thousands > 0) {
        result += convertLessThanThousand(thousands, true) + ' ' + getPluralForm(thousands, thousandsForms) + ' ';
      }
      
      if (remainder > 0) {
        result += convertLessThanThousand(remainder) + ' ';
      }
      
      return result.trim();
    }
    
    const wholePart = Math.floor(amount);
    const fractionalPart = Math.round((amount - wholePart) * 100);
    
    const currencyNames: Record<string, { whole: string[], fractional: string }> = {
      'rub': { whole: ['рубль', 'рубля', 'рублей'], fractional: 'копеек' },
      'usd': { whole: ['доллар', 'доллара', 'долларов'], fractional: 'центов' },
      'eur': { whole: ['евро', 'евро', 'евро'], fractional: 'центов' }
    };
    
    const curr = currencyNames[currency] || currencyNames['rub'];
    
    let text = numberToWords(wholePart) + ' ' + getPluralForm(wholePart, curr.whole);
    if (fractionalPart > 0 || currency === 'rub') {
      text += ' ' + fractionalPart.toString().padStart(2, '0') + ' ' + curr.fractional;
    }
    
    // Применяем формат
    if (format === 'uppercase') text = text.toUpperCase();
    else if (format === 'capitalize') text = text.charAt(0).toUpperCase() + text.slice(1);
    
    const withNumber = `${amount.toFixed(2)} (${text})`;
    
    return [
      { value: text, label: 'Прописью' },
      { value: withNumber, label: 'С цифрами' }
    ];
  },
  content: {
    howTo: 'Введите сумму, выберите валюту и формат.',
    about: 'Сумма прописью — обязательный элемент финансовых и юридических документов.',
    usage: 'Используется при заполнении договоров, чеков, бухгалтерских документов.',
    formula: 'Перевод числа в текстовую форму с учётом склонения единиц измерения.',
    faq: [
      {
        question: 'Зачем писать сумму прописью?',
        answer: 'Это защита от подделки документов — сложнее изменить текст, чем цифру.'
      }
    ],
    sources: [
      { title: 'Сумма прописью', url: 'https://ru.wikipedia.org/wiki/Числительные' }
    ],
    updatedAt: '2026-04-27'
  }
};

// 4. На сколько процентов больше/меньше
export const percentageDifferenceCalculator: Calculator = {
  id: 'percentage-difference-calculator',
  slug: 'na-skolko-procentov-bolshe-menshe',
  title: 'На сколько процентов больше/меньше',
  description: 'Расчёт разницы между двумя числами в процентах',
  category: 'procenty',
  subcategory: 'procenty-izmenenie',
  type: 'formula',
  inputs: [
    {
      name: 'originalValue',
      label: 'Исходное значение',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0.01,
      step: 0.01
    },
    {
      name: 'newValue',
      label: 'Новое значение',
      type: 'number',
      placeholder: '150',
      defaultValue: 150,
      min: 0,
      step: 0.01
    }
  ],
  outputs: [
    { name: 'difference', label: 'Разница', type: 'number', unit: '%' },
    { name: 'absDifference', label: 'Абсолютная разница', type: 'number' },
    { name: 'multiplier', label: 'Во сколько раз', type: 'number' }
  ],
  calculate: (inputs) => {
    const original = Number(inputs.originalValue);
    const newValue = Number(inputs.newValue);
    
    if (!original || original <= 0) {
      return [{ value: '—', label: 'Результат', additionalInfo: 'Исходное значение должно быть > 0' }];
    }
    
    const difference = ((newValue - original) / original) * 100;
    const absDifference = newValue - original;
    const multiplier = newValue / original;
    
    return [
      { value: (difference > 0 ? '+' : '') + difference.toFixed(2), label: 'Разница', unit: '%' },
      { value: (absDifference > 0 ? '+' : '') + absDifference.toFixed(2), label: 'Абсолютная разница' },
      { value: multiplier.toFixed(4), label: 'Во сколько раз' }
    ];
  },
  content: {
    howTo: 'Введите исходное и новое значение.',
    about: 'Показывает, на сколько процентов изменилось значение по сравнению с исходным.',
    usage: 'Используется для анализа роста, снижения цен, изменения показателей.',
    formula: 'Разница (%) = ((Новое - Исходное) / Исходное) × 100',
    faq: [
      {
        question: 'Что означает отрицательный результат?',
        answer: 'Значение уменьшилось по сравнению с исходным.'
      }
    ],
    sources: [
      { title: 'Процент', url: 'https://ru.wikipedia.org/wiki/Процент' }
    ],
    updatedAt: '2026-04-27'
  }
};

// 5. Сумма чисел от 1 до N
export const sumToNCalculator: Calculator = {
  id: 'sum-to-n-calculator',
  slug: 'summa-chisel-do-n',
  title: 'Сумма чисел от 1 до N',
  description: 'Быстрый расчёт суммы арифметической прогрессии',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'n',
      label: 'Число N',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 1,
      max: 1000000000
    },
    {
      name: 'start',
      label: 'Начальное число (опционально)',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    }
  ],
  outputs: [
    { name: 'formula', label: 'Формула', type: 'text' },
    { name: 'result', label: 'Сумма', type: 'number' },
    { name: 'count', label: 'Количество чисел', type: 'number' }
  ],
  calculate: (inputs) => {
    const n = Number(inputs.n);
    const start = Number(inputs.start) || 1;
    
    if (!n || n < 1) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const count = n - start + 1;
    const result = (count * (start + n)) / 2;
    const formula = count === n 
      ? `S = ${n} × (${n} + 1) / 2 = ${result.toFixed(0)}`
      : `S = ${count} × (${start} + ${n}) / 2 = ${result.toFixed(0)}`;
    
    return [
      { value: formula, label: 'Формула' },
      { value: result.toFixed(0), label: 'Сумма' },
      { value: count.toString(), label: 'Количество чисел' }
    ];
  },
  content: {
    howTo: 'Введите N (конечное число) и, если нужно, начальное число.',
    about: 'Формула Гаусса: сумма чисел от 1 до N = N × (N + 1) / 2.',
    usage: 'Используется в математике, программировании, статистике.',
    formula: 'S = n × (n + 1) / 2',
    faq: [
      {
        question: 'Как посчитать сумму от 50 до 100?',
        answer: 'Введите N=100, начальное число=50. Сумма = (100-50+1) × (50+100) / 2 = 51 × 150 / 2 = 3825.'
      }
    ],
    sources: [
      { title: 'Арифметическая прогрессия', url: 'https://ru.wikipedia.org/wiki/Арифметическая_прогрессия' }
    ],
    updatedAt: '2026-04-27'
  }
};

// 6. Дни между датами
export const daysBetweenDatesCalculator: Calculator = {
  id: 'days-between-dates-calculator',
  slug: 'dni-mezhdu-datami',
  title: 'Дни между датами',
  description: 'Расчёт количества дней, рабочих дней, недель между двумя датами',
  category: 'povsednevnoe',
  subcategory: 'data-i-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'startDate',
      label: 'Начальная дата',
      type: 'date',
      placeholder: '2024-01-01'
    },
    {
      name: 'endDate',
      label: 'Конечная дата',
      type: 'date',
      placeholder: '2024-12-31'
    },
    {
      name: 'includeEnd',
      label: 'Включать конечную дату',
      type: 'boolean',
      defaultValue: true
    }
  ],
  outputs: [
    { name: 'totalDays', label: 'Всего дней', type: 'number', unit: 'дн.' },
    { name: 'weeks', label: 'Полных недель', type: 'number', unit: 'нед.' },
    { name: 'workDays', label: 'Рабочих дней (пн-пт)', type: 'number', unit: 'дн.' },
    { name: 'months', label: 'Полных месяцев', type: 'number', unit: 'мес.' }
  ],
  calculate: (inputs) => {
    const start = new Date(inputs.startDate as string);
    const end = new Date(inputs.endDate as string);
    const includeEnd = Boolean(inputs.includeEnd);
    
    if (!start.getTime() || !end.getTime()) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    let totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (includeEnd) totalDays += 1;
    
    const weeks = Math.floor(totalDays / 7);
    
    // Рабочие дни (пн-пт)
    let workDays = 0;
    const current = new Date(start);
    const endDate = new Date(end);
    if (includeEnd) endDate.setDate(endDate.getDate() + 1);
    
    while (current < endDate) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) workDays++;
      current.setDate(current.getDate() + 1);
    }
    
    // Полных месяцев
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    return [
      { value: totalDays.toString(), label: 'Всего дней', unit: 'дн.' },
      { value: weeks.toString(), label: 'Полных недель', unit: 'нед.' },
      { value: workDays.toString(), label: 'Рабочих дней (пн-пт)', unit: 'дн.' },
      { value: months.toString(), label: 'Полных месяцев', unit: 'мес.' }
    ];
  },
  content: {
    howTo: 'Выберите начальную и конечную даты.',
    about: 'Показывает количество дней, недель, рабочих дней и месяцев между датами.',
    usage: 'Используется для планирования отпусков, сроков, проектов.',
    formula: 'Дни = (Дата2 - Дата1) в миллисекундах / 86400000',
    faq: [
      {
        question: 'Учитываются ли выходные?',
        answer: 'Нет, рабочие дни считаются только с понедельника по пятницу.'
      }
    ],
    sources: [
      { title: 'Календарь', url: 'https://ru.wikipedia.org/wiki/Календарь' }
    ],
    updatedAt: '2026-04-27'
  }
};

// 7. День недели
export const dayOfWeekCalculator: Calculator = {
  id: 'day-of-week-calculator',
  slug: 'den-nedeli',
  title: 'День недели по дате',
  description: 'Определение дня недели для любой даты',
  category: 'povsednevnoe',
  subcategory: 'data-i-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'date',
      label: 'Дата',
      type: 'date',
      placeholder: '2024-06-15'
    }
  ],
  outputs: [
    { name: 'dayOfWeek', label: 'День недели', type: 'text' },
    { name: 'dayOfYear', label: 'День года', type: 'number', unit: 'дн.' },
    { name: 'weekOfYear', label: 'Неделя года', type: 'number', unit: 'нед.' }
  ],
  calculate: (inputs) => {
    const date = new Date(inputs.date as string);
    
    if (!date.getTime()) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    
    // День года
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Неделя года (ISO)
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekOfYear = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    
    return [
      { value: dayOfWeek, label: 'День недели' },
      { value: dayOfYear.toString(), label: 'День года', unit: 'дн.' },
      { value: weekOfYear.toString(), label: 'Неделя года', unit: 'нед.' }
    ];
  },
  content: {
    howTo: 'Выберите дату из календаря.',
    about: 'Определяет день недели, номер дня и недели в году.',
    usage: 'Используется для планирования, исторических расчётов.',
    formula: 'Используется алгоритм определения дня недели по дате.',
    faq: [
      {
        question: 'Работает ли для прошлых веков?',
        answer: 'Да, для дат по григорианскому календарю (с 1582 года).'
      }
    ],
    sources: [
      { title: 'День недели', url: 'https://ru.wikipedia.org/wiki/День_недели' }
    ],
    updatedAt: '2026-04-27'
  }
};

// 8. Високосные годы
export const leapYearCalculator: Calculator = {
  id: 'leap-year-calculator',
  slug: 'visokosnye-gody',
  title: 'Високосные годы',
  description: 'Проверка года и список високосных годов в диапазоне',
  category: 'povsednevnoe',
  subcategory: 'data-i-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'mode',
      label: 'Режим',
      type: 'select',
      options: [
        { value: 'check', label: 'Проверить один год' },
        { value: 'list', label: 'Список годов в диапазоне' }
      ],
      defaultValue: 'check'
    },
    {
      name: 'year',
      label: 'Год',
      type: 'number',
      placeholder: '2024',
      defaultValue: 2024,
      min: 1,
      max: 9999
    },
    {
      name: 'startYear',
      label: 'Начальный год',
      type: 'number',
      placeholder: '2000',
      defaultValue: 2000,
      min: 1,
      max: 9999
    },
    {
      name: 'endYear',
      label: 'Конечный год',
      type: 'number',
      placeholder: '2030',
      defaultValue: 2030,
      min: 1,
      max: 9999
    }
  ],
  outputs: [
    { name: 'isLeap', label: 'Результат', type: 'text' },
    { name: 'daysInYear', label: 'Дней в году', type: 'number', unit: 'дн.' }
  ],
  calculate: (inputs) => {
    const mode = String(inputs.mode);
    
    function isLeap(year: number): boolean {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    
    if (mode === 'check') {
      const year = Number(inputs.year);
      const leap = isLeap(year);
      const days = leap ? 366 : 365;
      
      return [
        { value: leap ? 'Да, високосный' : 'Нет, обычный год', label: 'Результат' },
        { value: days.toString(), label: 'Дней в году', unit: 'дн.' }
      ];
    } else {
      const startYear = Number(inputs.startYear);
      const endYear = Number(inputs.endYear);
      
      if (startYear > endYear) {
        return [{ value: '—', label: 'Результат', additionalInfo: 'Начальный год должен быть меньше конечного' }];
      }
      
      const leapYears: number[] = [];
      for (let y = startYear; y <= endYear; y++) {
        if (isLeap(y)) leapYears.push(y);
      }
      
      const result = leapYears.length > 0 
        ? leapYears.join(', ') 
        : 'Нет високосных годов в указанном диапазоне';
      
      return [
        { value: result, label: 'Високосные годы' },
        { value: leapYears.length.toString(), label: 'Количество', unit: 'шт.' }
      ];
    }
  },
  content: {
    howTo: 'Выберите режим: проверить один год или получить список за период.',
    about: 'Високосный год содержит 366 дней вместо 365. Дополнительный день — 29 февраля.',
    usage: 'Используется для планирования, проверки календарей.',
    formula: 'Високосный, если делится на 4, но не на 100, или делится на 400.',
    faq: [
      {
        question: 'Почему високосный год?',
        answer: 'Для компенсации разницы между календарным годом (365 дней) и тропическим годом (~365.25 дней).'
      }
    ],
    sources: [
      { title: 'Високосный год', url: 'https://ru.wikipedia.org/wiki/Високосный_год' }
    ],
    updatedAt: '2026-04-27'
  }
};

// 9. Обратный отсчёт до даты
export const countdownCalculator: Calculator = {
  id: 'countdown-calculator',
  slug: 'obratnyj-otschet-do-daty',
  title: 'Обратный отсчёт до даты',
  description: 'Сколько осталось дней, часов, минут до важной даты',
  category: 'povsednevnoe',
  subcategory: 'data-i-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'targetDate',
      label: 'Целевая дата',
      type: 'date',
      placeholder: '2025-01-01'
    },
    {
      name: 'targetTime',
      label: 'Время (опционально)',
      type: 'text',
      placeholder: '00:00',
      defaultValue: '00:00'
    },
    {
      name: 'eventName',
      label: 'Название события',
      type: 'text',
      placeholder: 'Новый год',
      defaultValue: 'Новый год'
    }
  ],
  outputs: [
    { name: 'totalDays', label: 'Всего дней', type: 'number', unit: 'дн.' },
    { name: 'detailed', label: 'Детально', type: 'text' },
    { name: 'weeks', label: 'Недель', type: 'number', unit: 'нед.' }
  ],
  calculate: (inputs) => {
    const now = new Date();
    const targetDateStr = String(inputs.targetDate);
    const targetTime = String(inputs.targetTime) || '00:00';
    
    if (!targetDateStr) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const [hours, minutes] = targetTime.split(':').map(Number);
    const target = new Date(targetDateStr);
    target.setHours(hours || 0, minutes || 0, 0, 0);
    
    const diff = target.getTime() - now.getTime();
    
    if (diff < 0) {
      return [
        { value: 'Событие уже прошло!', label: 'Результат' },
        { value: '—', label: 'Детально' }
      ];
    }
    
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const weeks = Math.floor(totalDays / 7);
    
    return [
      { value: totalDays.toString(), label: 'Всего дней', unit: 'дн.' },
      { value: `${totalDays} дн. ${remainingHours} ч. ${remainingMinutes} мин.`, label: 'Детально' },
      { value: weeks.toString(), label: 'Недель', unit: 'нед.' }
    ];
  },
  content: {
    howTo: 'Выберите дату события, укажите время и название.',
    about: 'Показывает, сколько времени осталось до важной даты.',
    usage: 'Используется для отсчёта до отпуска, дня рождения, свадьбы, экзаменов.',
    formula: 'Осталось = Целевая дата - Текущая дата',
    faq: [
      {
        question: 'Учитывается ли текущее время?',
        answer: 'Да, расчёт ведётся от текущего момента до указанной даты и времени.'
      }
    ],
    sources: [
      { title: 'Обратный отсчёт', url: 'https://ru.wikipedia.org/wiki/Таймер' }
    ],
    updatedAt: '2026-04-27'
  }
};

// 10. Норма углеводов
export const carbsCalculator: Calculator = {
  id: 'carbs-calculator',
  slug: 'norma-uglevodov',
  title: 'Норма углеводов',
  description: 'Расчёт суточной нормы углеводов по весу и активности',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес',
      type: 'number',
      placeholder: '70',
      defaultValue: 70,
      min: 20,
      max: 300,
      unit: 'кг'
    },
    {
      name: 'activityLevel',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкий (сидячий образ)' },
        { value: 'moderate', label: 'Умеренный (1-3 тренировки/неделю)' },
        { value: 'high', label: 'Высокий (4-5 тренировок/неделю)' },
        { value: 'very_high', label: 'Очень высокий (ежедневные тренировки)' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'goal',
      label: 'Цель',
      type: 'select',
      options: [
        { value: 'lose', label: 'Похудение' },
        { value: 'maintain', label: 'Поддержание веса' },
        { value: 'gain', label: 'Набор массы' }
      ],
      defaultValue: 'maintain'
    }
  ],
  outputs: [
    { name: 'dailyCarbs', label: 'Углеводов в день', type: 'number', unit: 'г' },
    { name: 'carbsPerMeal', label: 'В среднем за приём пищи', type: 'number', unit: 'г' },
    { name: 'percentage', label: '% от калорий', type: 'number', unit: '%' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight);
    const activityLevel = String(inputs.activityLevel);
    const goal = String(inputs.goal);
    
    if (!weight) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Базовая норма углеводов (г/кг веса)
    let carbsPerKg = 4;
    
    switch (activityLevel) {
      case 'low': carbsPerKg = 3; break;
      case 'moderate': carbsPerKg = 4; break;
      case 'high': carbsPerKg = 5; break;
      case 'very_high': carbsPerKg = 7; break;
    }
    
    let dailyCarbs = weight * carbsPerKg;
    
    // Корректировка по цели
    switch (goal) {
      case 'lose': dailyCarbs *= 0.8; break; // -20%
      case 'gain': dailyCarbs *= 1.2; break; // +20%
    }
    
    const carbsPerMeal = dailyCarbs / 3; // 3 приёма пищи
    const caloriesFromCarbs = dailyCarbs * 4; // 1г углеводов = 4 ккал
    const totalCalories = weight * 30; // примерно
    const percentage = (caloriesFromCarbs / totalCalories) * 100;
    
    return [
      { value: Math.round(dailyCarbs).toString(), label: 'Углеводов в день', unit: 'г' },
      { value: Math.round(carbsPerMeal).toString(), label: 'В среднем за приём пищи', unit: 'г' },
      { value: percentage.toFixed(0), label: '% от калорий', unit: '%' }
    ];
  },
  content: {
    howTo: 'Введите вес, выберите уровень активности и цель.',
    about: 'Углеводы — основной источник энергии. Рекомендуемая норма зависит от веса, активности и целей.',
    usage: 'Используется для составления диеты, контроля питания.',
    formula: 'Углеводы = Вес × коэффициент активности × корректировка цели',
    faq: [
      {
        question: 'Сколько углеводов нужно для похудения?',
        answer: 'Обычно 2-3 г/кг веса. Резкое снижение может вызвать слабость.'
      },
      {
        question: 'Какие углеводы полезнее?',
        answer: 'Сложные (крупы, овощи, фрукты) лучше простых (сахар, сладости) — дают длительную энергию.'
      }
    ],
    sources: [
      { title: 'Углеводы — Википедия', url: 'https://ru.wikipedia.org/wiki/Углеводы' }
    ],
    updatedAt: '2026-04-27'
  }
};

export const missingCalculators: Calculator[] = [
  logarithmCalculator,
  romanNumeralsCalculator,
  sumInWordsCalculator,
  percentageDifferenceCalculator,
  sumToNCalculator,
  daysBetweenDatesCalculator,
  dayOfWeekCalculator,
  leapYearCalculator,
  countdownCalculator,
  carbsCalculator
];
