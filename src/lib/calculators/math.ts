import { Calculator } from '../types';

// Калькулятор процентов
export const percentageCalculator: Calculator = {
  id: 'percentage-calculator',
  slug: 'kalkulyator-procentov',
  title: 'Калькулятор процентов',
  description: 'Расчёт процентов от числа, сложный процент, процент от суммы',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'value',
      label: 'Число',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000
    },
    {
      name: 'percentage',
      label: 'Процент (%)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20
    }
  ],
  outputs: [
    { name: 'result', label: 'Процент от числа', type: 'number' },
    { name: 'increased', label: 'Увеличенное значение', type: 'number' },
    { name: 'decreased', label: 'Уменьшенное значение', type: 'number' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const percentage = Number(inputs.percentage);
    
    if (!value || !percentage) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const result = (value * percentage) / 100;
    const increased = value + result;
    const decreased = value - result;
    
    return [
      { value: result.toFixed(2), label: `${percentage}% от ${value}`, unit: '' },
      { value: increased.toFixed(2), label: 'Увеличение на %', unit: '' },
      { value: decreased.toFixed(2), label: 'Уменьшение на %', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите число и процент. Калькулятор покажет процент от числа, а также результат увеличения и уменьшения.',
    about: 'Процент — это одна сотая часть чего-либо. Обозначается знаком %. Используется в финансах, статистике, математике.',
    usage: 'Применяется для расчёта скидок, налогов, процентов по вкладам, статистических данных.',
    formula: 'Процент от числа = (Число × Процент) / 100',
    faq: [
      {
        question: 'Как посчитать 20% от числа?',
        answer: 'Умножьте число на 20 и разделите на 100. Например, 20% от 500 = 500 × 20 / 100 = 100.'
      },
      {
        question: 'Как увеличить число на процент?',
        answer: 'Прибавьте вычисленный процент к исходному числу. Например, 500 + 20% = 500 + 100 = 600.'
      },
      {
        question: 'Как уменьшить число на процент?',
        answer: 'Вычтите вычисленный процент из исходного числа. Например, 500 - 20% = 500 - 100 = 400.'
      }
    ],
    sources: [
      { title: 'Процент — Википедия', url: 'https://ru.wikipedia.org/wiki/Процент' }
    ],
    updatedAt: '2026-04-07'
  },
  popularCalculations: [
    { value: '20% от 1000', url: '/kalkulyator-procentov?value=1000&percentage=20' },
    { value: '10% от 500', url: '/kalkulyator-procentov?value=500&percentage=10' },
    { value: '50% от 200', url: '/kalkulyator-procentov?value=200&percentage=50' }
  ]
};

// Калькулятор квадратных уравнений
export const quadraticEquationCalculator: Calculator = {
  id: 'quadratic-equation',
  slug: 'kvadratnye-uravneniya',
  title: 'Квадратные уравнения',
  description: 'Решение квадратных уравнений ax² + bx + c = 0',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'a',
      label: 'a (коэффициент при x²)',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'b',
      label: 'b (коэффициент при x)',
      type: 'number',
      placeholder: '-5',
      defaultValue: -5
    },
    {
      name: 'c',
      label: 'c (свободный член)',
      type: 'number',
      placeholder: '6',
      defaultValue: 6
    }
  ],
  outputs: [
    { name: 'discriminant', label: 'Дискриминант (D)', type: 'number' },
    { name: 'x1', label: 'x₁', type: 'number' },
    { name: 'x2', label: 'x₂', type: 'number' }
  ],
  calculate: (inputs) => {
    const a = Number(inputs.a);
    const b = Number(inputs.b);
    const c = Number(inputs.c);
    
    if (!a) {
      return [{ value: 'a не может быть 0', label: 'Ошибка' }];
    }
    
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant < 0) {
      return [
        { value: discriminant.toFixed(2), label: 'Дискриминант (D)' },
        { value: 'Нет действительных корней', label: 'Решение' }
      ];
    }
    
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    
    return [
      { value: discriminant.toFixed(2), label: 'Дискриминант (D)' },
      { value: x1.toFixed(4), label: 'x₁', unit: '' },
      { value: discriminant === 0 ? x1.toFixed(4) : x2.toFixed(4), label: discriminant === 0 ? 'x (двойной корень)' : 'x₂', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите коэффициенты a, b и c уравнения ax² + bx + c = 0. Калькулятор найдёт дискриминант и корни.',
    about: 'Квадратное уравнение — уравнение вида ax² + bx + c = 0, где a ≠ 0. Имеет два корня, которые находятся через дискриминант.',
    usage: 'Используется в алгебре, физике, экономике для решения задач с параболическими зависимостями.',
    formula: 'D = b² - 4ac\nx = (-b ± √D) / (2a)',
    faq: [
      {
        question: 'Что такое дискриминант?',
        answer: 'Дискриминант (D) определяет количество корней уравнения. Если D > 0 — два корня, D = 0 — один корень, D < 0 — нет действительных корней.'
      },
      {
        question: 'Что если a = 0?',
        answer: 'Если a = 0, уравнение становится линейным bx + c = 0, а не квадратным.'
      }
    ],
    sources: [
      { title: 'Квадратное уравнение — Википедия', url: 'https://ru.wikipedia.org/wiki/Квадратное_уравнение' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор корней
export const rootCalculator: Calculator = {
  id: 'root-calculator',
  slug: 'kalkulyator-kornej',
  title: 'Калькулятор корней',
  description: 'Извлечение квадратного, кубического и n-ной степени корня',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'number',
      label: 'Число',
      type: 'number',
      placeholder: '16',
      defaultValue: 16,
      min: 0
    },
    {
      name: 'degree',
      label: 'Степень корня',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 1
    }
  ],
  outputs: [
    { name: 'result', label: 'Корень', type: 'number' },
    { name: 'verification', label: 'Проверка', type: 'number' }
  ],
  calculate: (inputs) => {
    const number = Number(inputs.number);
    const degree = Number(inputs.degree);
    
    if (!number || !degree) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    if (number < 0 && degree % 2 === 0) {
      return [{ value: 'Нет действительного корня', label: 'Результат' }];
    }
    
    const result = Math.pow(Math.abs(number), 1 / degree);
    const signedResult = number < 0 ? -result : result;
    
    return [
      { 
        value: signedResult.toFixed(6), 
        label: `Корень ${degree}-й степени из ${number}`,
        unit: ''
      },
      {
        value: Math.pow(signedResult, degree).toFixed(2),
        label: 'Проверка (возведение в степень)',
        unit: ''
      }
    ];
  },
  content: {
    howTo: 'Введите число и степень корня. Калькулятор вычислит корень указанной степени.',
    about: 'Корень n-й степени из числа a — это число b, такое что bⁿ = a. Квадратный корень (√a) — частный случай при n = 2.',
    usage: 'Применяется в геометрии (длина диагонали), физике, инженерных расчётах.',
    formula: 'ⁿ√a = a^(1/n)',
    faq: [
      {
        question: 'Что такое квадратный корень?',
        answer: 'Квадратный корень из числа a — это число b, которое при умножении на себя даёт a: b × b = a.'
      },
      {
        question: 'Можно ли извлечь корень из отрицательного числа?',
        answer: 'Из отрицательного числа можно извлечь только корень нечётной степени (3, 5, 7...). Корень чётной степени из отрицательного числа — мнимое число.'
      }
    ],
    sources: [
      { title: 'Корень (математика) — Википедия', url: 'https://ru.wikipedia.org/wiki/Корень_(математика)' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор дробей
export const fractionCalculator: Calculator = {
  id: 'fraction-calculator',
  slug: 'kalkulyator-drobej',
  title: 'Калькулятор дробей',
  description: 'Сложение, вычитание, умножение и деление дробей',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'num1',
      label: 'Числитель 1',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'den1',
      label: 'Знаменатель 1',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 1
    },
    {
      name: 'operation',
      label: 'Операция',
      type: 'select',
      options: [
        { value: 'add', label: '+' },
        { value: 'subtract', label: '-' },
        { value: 'multiply', label: '×' },
        { value: 'divide', label: '÷' }
      ],
      defaultValue: 'add'
    },
    {
      name: 'num2',
      label: 'Числитель 2',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'den2',
      label: 'Знаменатель 2',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 1
    }
  ],
  outputs: [
    { name: 'fraction', label: 'Результат (дробь)', type: 'text' },
    { name: 'decimal', label: 'Десятичное значение', type: 'number' }
  ],
  calculate: (inputs) => {
    const num1 = Number(inputs.num1);
    const den1 = Number(inputs.den1);
    const num2 = Number(inputs.num2);
    const den2 = Number(inputs.den2);
    const operation = String(inputs.operation);
    
    if (!den1 || !den2) {
      return [{ value: 'Знаменатель не может быть 0', label: 'Ошибка' }];
    }
    
    let resultNum = 0;
    let resultDen = 1;
    
    switch (operation) {
      case 'add':
        resultNum = num1 * den2 + num2 * den1;
        resultDen = den1 * den2;
        break;
      case 'subtract':
        resultNum = num1 * den2 - num2 * den1;
        resultDen = den1 * den2;
        break;
      case 'multiply':
        resultNum = num1 * num2;
        resultDen = den1 * den2;
        break;
      case 'divide':
        resultNum = num1 * den2;
        resultDen = den1 * num2;
        break;
    }
    
    // Simplify fraction (find GCD)
    const gcd = (a: number, b: number): number => {
      a = Math.abs(a);
      b = Math.abs(b);
      while (b) {
        const t = b;
        b = a % b;
        a = t;
      }
      return a;
    };
    
    const commonDivisor = gcd(resultNum, resultDen);
    const simplifiedNum = resultNum / commonDivisor;
    const simplifiedDen = resultDen / commonDivisor;
    
    const decimalValue = resultNum / resultDen;
    
    return [
      { 
        value: `${simplifiedNum}/${simplifiedDen}`, 
        label: 'Результат (дробь)',
        unit: ''
      },
      { 
        value: decimalValue.toFixed(6), 
        label: 'Десятичное значение',
        unit: ''
      }
    ];
  },
  content: {
    howTo: 'Введите две дроби (числитель и знаменатель каждой), выберите операцию. Калькулятор покажет результат в виде дроби и десятичного числа.',
    about: 'Обыкновенная дробь — запись числа в виде a/b, где a — числитель, b — знаменатель. Дроби используются для представления частей целого.',
    usage: 'Применяется в математике, кулинарии (рецепты), строительстве (измерения), финансах.',
    formula: 'Сложение: a/b + c/d = (ad + bc) / bd\nВычитание: a/b - c/d = (ad - bc) / bd\nУмножение: a/b × c/d = ac / bd\nДеление: a/b ÷ c/d = ad / bc',
    faq: [
      {
        question: 'Как сложить дроби с разными знаменателями?',
        answer: 'Приведите дроби к общему знаменателю (перемножьте знаменатели), сложите числители с учётом новых знаменателей.'
      },
      {
        question: 'Как сократить дробь?',
        answer: 'Разделите числитель и знаменатель на их наибольший общий делитель (НОД).'
      }
    ],
    sources: [
      { title: 'Дробь (математика) — Википедия', url: 'https://ru.wikipedia.org/wiki/Дробь_(математика)' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор факториала (базовый)
export const factorialSimpleCalculator: Calculator = {
  id: 'factorial-simple-calculator',
  slug: 'kalkulyator-faktoriala',
  title: 'Калькулятор факториала',
  description: 'Вычисление факториала числа n!',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'n',
      label: 'n (число)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0,
      max: 170  // Limit to prevent overflow
    }
  ],
  outputs: [
    { name: 'factorial', label: 'n!', type: 'text' },
    { name: 'count', label: 'Число слагаемых', type: 'number' }
  ],
  calculate: (inputs) => {
    const n = Math.floor(Number(inputs.n));
    
    if (n < 0) {
      return [{ value: 'Факториал определён только для n ≥ 0', label: 'Ошибка' }];
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    
    return [
      { value: result.toLocaleString('ru-RU'), label: `${n}!`, unit: '' },
      { value: n.toString(), label: 'Число слагаемых', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите неотрицательное целое число n. Калькулятор вычислит факториал n! (произведение всех чисел от 1 до n).',
    about: 'Факториал числа n (обозначается n!) — произведение всех натуральных чисел от 1 до n включительно. По определению: 0! = 1.',
    usage: 'Используется в комбинаторике (подсчёт вариантов), теории вероятностей, статистике.',
    formula: 'n! = 1 × 2 × 3 × ... × n',
    faq: [
      {
        question: 'Что такое 0! ?',
        answer: '0! = 1 по определению. Это необходимо для согласованности формул в комбинаторике.'
      },
      {
        question: 'Почему ограничение 170?',
        answer: '170! ≈ 7.26 × 10³⁰⁶ — это максимальное значение, которое можно представить в JavaScript без потери точности.'
      }
    ],
    sources: [
      { title: 'Факториал — Википедия', url: 'https://ru.wikipedia.org/wiki/Факториал' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const mathematicalCalculators = [
  percentageCalculator,
  quadraticEquationCalculator,
  rootCalculator,
  fractionCalculator,
  factorialSimpleCalculator,
];
