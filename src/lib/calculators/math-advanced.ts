import { Calculator } from '../types';

// Калькулятор процентов (расширенный)
export const percentAdvancedCalculator: Calculator = {
  id: 'percent-advanced-calculator',
  slug: 'procenty-rasshirennyj',
  title: 'Калькулятор процентов (расширенный)',
  description: 'Сложные проценты, изменение, процент от числа, сколько процентов составляет',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'mode',
      label: 'Операция',
      type: 'select',
      options: [
        { value: 'percent_of', label: 'Сколько будет X% от числа' },
        { value: 'what_percent', label: 'Сколько % составляет число' },
        { value: 'percent_change', label: 'Изменение в %' },
        { value: 'add_percent', label: 'Прибавить %' },
        { value: 'subtract_percent', label: 'Вычесть %' }
      ],
      defaultValue: 'percent_of'
    },
    {
      name: 'value1',
      label: 'Значение 1',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'value2',
      label: 'Значение 2',
      type: 'number',
      placeholder: '20',
      defaultValue: 20
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const mode = String(inputs.mode);
    const value1 = Number(inputs.value1);
    const value2 = Number(inputs.value2);
    
    let result = 0;
    let text = '';
    
    switch (mode) {
      case 'percent_of':
        result = (value1 * value2) / 100;
        text = `${value2}% от ${value1} = ${result}`;
        break;
      case 'what_percent':
        result = (value1 / value2) * 100;
        text = `${value1} составляет ${result.toFixed(2)}% от ${value2}`;
        break;
      case 'percent_change':
        result = ((value2 - value1) / value1) * 100;
        text = `Изменение от ${value1} до ${value2} = ${result > 0 ? '+' : ''}${result.toFixed(2)}%`;
        break;
      case 'add_percent':
        result = value1 + (value1 * value2) / 100;
        text = `${value1} + ${value2}% = ${result}`;
        break;
      case 'subtract_percent':
        result = value1 - (value1 * value2) / 100;
        text = `${value1} - ${value2}% = ${result}`;
        break;
    }
    
    return [{ value: text, label: 'Результат' }];
  },
  content: {
    howTo: 'Выберите операцию, введите два значения. Калькулятор выполнит расчёт процентов.',
    about: 'Процент — сотая часть числа. Обозначается знаком %. Проценты используются повсеместно: в финансах, статистике, науке, повседневной жизни.',
    usage: 'Используется для расчётов скидок, налогов, прибыли, роста, изменений.',
    formula: 'X% от Y = (X × Y) / 100\nИзменение % = ((Новое - Старое) / Старое) × 100',
    faq: [
      {
        question: 'Как посчитать скидку?',
        answer: 'Цена со скидкой = Старая цена - (Старая цена × % скидки / 100)'
      },
      {
        question: 'Как найти, сколько % одно число от другого?',
        answer: '(Часть / Целое) × 100 = Процент'
      }
    ],
    sources: [
      { title: 'Процент — Википедия', url: 'https://ru.wikipedia.org/wiki/Процент' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор факториала
export const factorialCalculator: Calculator = {
  id: 'factorial-calculator',
  slug: 'faktorial',
  title: 'Калькулятор факториала',
  description: 'Расчёт факториала n! и двойного факториала n!!',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'n',
      label: 'Число n',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0,
      max: 170  // factorial(171) exceeds Number.MAX_VALUE
    },
    {
      name: 'type',
      label: 'Тип факториала',
      type: 'select',
      options: [
        { value: 'single', label: 'Обычный n!' },
        { value: 'double', label: 'Двойной n!!' }
      ],
      defaultValue: 'single'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'number' },
    { name: 'scientific', label: 'Научная нотация', type: 'text' }
  ],
  calculate: (inputs) => {
    const n = Math.floor(Number(inputs.n));
    const type = String(inputs.type);
    
    if (n < 0) return [{ value: 'Ошибка: n должно быть ≥ 0', label: 'Ошибка' }];
    
    let result = 1;
    
    if (type === 'single') {
      // Single factorial
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
    } else {
      // Double factorial
      let i = n;
      while (i > 0) {
        result *= i;
        i -= 2;
      }
    }
    
    return [
      { 
        value: result, 
        label: type === 'single' ? `${n}!` : `${n}!!`
      },
      { 
        value: result.toExponential(4), 
        label: 'Научная нотация'
      }
    ];
  },
  content: {
    howTo: 'Введите число n и выберите тип факториала. Калькулятор вычислит значение.',
    about: 'Факториал — произведение всех натуральных чисел от 1 до n включительно. Обозначается n!. Факториал 0 = 1.',
    usage: 'Используется в комбинаторике (перестановки, сочетания), теории вероятностей, математическом анализе (ряды Тейлора).',
    formula: 'n! = 1 × 2 × 3 × ... × n\n5! = 1 × 2 × 3 × 4 × 5 = 120',
    faq: [
      {
        question: 'Что такое факториал?',
        answer: 'Факториал числа n — это произведение всех целых чисел от 1 до n. Например, 4! = 1 × 2 × 3 × 4 = 24.'
      },
      {
        question: 'Чему равен 0! ?',
        answer: '0! = 1 по определению. Это необходимо для согласованности формул в комбинаторике и математике.'
      }
    ],
    sources: [
      { title: 'Факториал — Википедия', url: 'https://ru.wikipedia.org/wiki/Факториал' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор степеней и корней
export const powerRootCalculator: Calculator = {
  id: 'power-root-calculator',
  slug: 'stepeni-i-korni',
  title: 'Калькулятор степеней и корней',
  description: 'Возведение в степень, извлечение корней, логарифмы',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'base',
      label: 'Основание (a)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2
    },
    {
      name: 'exponent',
      label: 'Показатель (n)',
      type: 'number',
      placeholder: '3',
      defaultValue: 3
    },
    {
      name: 'operation',
      label: 'Операция',
      type: 'select',
      options: [
        { value: 'power', label: 'aⁿ (возведение в степень)' },
        { value: 'root', label: 'ⁿ√a (корень n-й степени)' },
        { value: 'log', label: 'logₐ(n) (логарифм)' }
      ],
      defaultValue: 'power'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'number' }
  ],
  calculate: (inputs) => {
    const base = Number(inputs.base);
    const exponent = Number(inputs.exponent);
    const operation = String(inputs.operation);
    
    let result = 0;
    let label = '';
    
    switch (operation) {
      case 'power':
        result = Math.pow(base, exponent);
        label = `${base}^${exponent}`;
        break;
      case 'root':
        if (base < 0 && exponent % 2 === 0) {
          return [{ value: 'Ошибка: чётный корень из отрицательного', label: 'Ошибка' }];
        }
        result = Math.pow(Math.abs(base), 1 / exponent);
        if (base < 0) result = -result;
        label = `${exponent}√${base}`;
        break;
      case 'log':
        if (base <= 0 || base === 1 || exponent <= 0) {
          return [{ value: 'Ошибка: недопустимые значения', label: 'Ошибка' }];
        }
        result = Math.log(exponent) / Math.log(base);
        label = `log_${base}(${exponent})`;
        break;
    }
    
    return [{ value: Math.round(result * 1e10) / 1e10, label }];
  },
  content: {
    howTo: 'Введите основание и показатель, выберите операцию. Калькулятор выполнит вычисление.',
    about: 'Степень — операция умножения числа на себя n раз. Корень — обратная операция. Логарифм — показатель степени, в которую нужно возвести основание.',
    usage: 'Используется в математике, физике, инженерии, программировании, экономике (сложные проценты).',
    formula: 'aⁿ = a × a × ... × a (n раз)\nⁿ√a = a^(1/n)\nlogₐ(b) = c, если aᶜ = b',
    faq: [
      {
        question: 'Что такое квадратный корень?',
        answer: 'Квадратный корень из числа a — это число, которое при умножении на себя даёт a. Обозначается √a или a^(1/2).'
      },
      {
        question: 'Что такое натуральный логарифм?',
        answer: 'Натуральный логарифм ln(x) — это логарифм по основанию e (число Эйлера ≈ 2.718).'
      }
    ],
    sources: [
      { title: 'Степень — Википедия', url: 'https://ru.wikipedia.org/wiki/Степень_(математика)' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор тригонометрии
export const trigonometryCalculator: Calculator = {
  id: 'trigonometry-calculator',
  slug: 'trigonometriya',
  title: 'Калькулятор тригонометрии',
  description: 'Синус, косинус, тангенс, котангенс, аркфункции',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'angle',
      label: 'Угол',
      type: 'number',
      placeholder: '30',
      defaultValue: 30
    },
    {
      name: 'unit',
      label: 'Единица измерения',
      type: 'select',
      options: [
        { value: 'deg', label: 'Градусы (°)' },
        { value: 'rad', label: 'Радианы' },
        { value: 'grad', label: 'Грады' }
      ],
      defaultValue: 'deg'
    },
    {
      name: 'function',
      label: 'Функция',
      type: 'select',
      options: [
        { value: 'sin', label: 'sin (синус)' },
        { value: 'cos', label: 'cos (косинус)' },
        { value: 'tan', label: 'tan (тангенс)' },
        { value: 'cot', label: 'cot (котангенс)' },
        { value: 'asin', label: 'arcsin (арксинус)' },
        { value: 'acos', label: 'arccos (арккосинус)' },
        { value: 'atan', label: 'arctan (арктангенс)' }
      ],
      defaultValue: 'sin'
    }
  ],
  outputs: [
    { name: 'result', label: 'Значение', type: 'number' },
    { name: 'radValue', label: 'В радианах', type: 'number' }
  ],
  calculate: (inputs) => {
    const angle = Number(inputs.angle);
    const unit = String(inputs.unit);
    const func = String(inputs.function);
    
    // Convert to radians
    let rad = angle;
    if (unit === 'deg') {
      rad = angle * Math.PI / 180;
    } else if (unit === 'grad') {
      rad = angle * Math.PI / 200;
    }
    
    let result = 0;
    
    switch (func) {
      case 'sin':
        result = Math.sin(rad);
        break;
      case 'cos':
        result = Math.cos(rad);
        break;
      case 'tan':
        result = Math.tan(rad);
        break;
      case 'cot':
        result = 1 / Math.tan(rad);
        break;
      case 'asin':
        result = Math.asin(angle) * 180 / Math.PI;
        if (unit === 'rad') result = Math.asin(angle);
        if (unit === 'grad') result = Math.asin(angle) * 200 / Math.PI;
        return [
          { value: Math.round(result * 1e6) / 1e6, label: 'arcsin' + (unit === 'rad' ? ' (рад)' : unit === 'grad' ? ' (град)' : ' (°)') },
          { value: Math.round(Math.asin(angle) * 1e6) / 1e6, label: 'В радианах' }
        ];
      case 'acos':
        result = Math.acos(angle) * 180 / Math.PI;
        if (unit === 'rad') result = Math.acos(angle);
        if (unit === 'grad') result = Math.acos(angle) * 200 / Math.PI;
        return [
          { value: Math.round(result * 1e6) / 1e6, label: 'arccos' + (unit === 'rad' ? ' (рад)' : unit === 'grad' ? ' (град)' : ' (°)') },
          { value: Math.round(Math.acos(angle) * 1e6) / 1e6, label: 'В радианах' }
        ];
      case 'atan':
        result = Math.atan(angle) * 180 / Math.PI;
        if (unit === 'rad') result = Math.atan(angle);
        if (unit === 'grad') result = Math.atan(angle) * 200 / Math.PI;
        return [
          { value: Math.round(result * 1e6) / 1e6, label: 'arctan' + (unit === 'rad' ? ' (рад)' : unit === 'grad' ? ' (град)' : ' (°)') },
          { value: Math.round(Math.atan(angle) * 1e6) / 1e6, label: 'В радианах' }
        ];
    }
    
    return [
      { value: Math.round(result * 1e6) / 1e6, label: func },
      { value: Math.round(rad * 1e6) / 1e6, label: 'В радианах' }
    ];
  },
  content: {
    howTo: 'Введите угол, выберите единицу измерения и тригонометрическую функцию.',
    about: 'Тригонометрические функции — отношения сторон прямоугольного труегольника. Основные: синус, косинус, тангенс.',
    usage: 'Используется в математике, физике, инженерии, навигации, астрономии, архитектуре.',
    formula: 'sin(α) = противолежащий / гипотенуза\ncos(α) = прилежащий / гипотенуза\ntan(α) = sin(α) / cos(α)',
    faq: [
      {
        question: 'Что такое синус?',
        answer: 'Синус угла — отношение длины противолежащего катета к гипотенузе прямоугольного треугольника.'
      },
      {
        question: 'Как перевести градусы в радианы?',
        answer: 'Радианы = Градусы × π / 180. Например, 90° = π/2 ≈ 1.57 рад.'
      }
    ],
    sources: [
      { title: 'Тригонометрия — Википедия', url: 'https://ru.wikipedia.org/wiki/Тригонометрия' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор квадратного уравнения
export const quadraticEquationCalculator: Calculator = {
  id: 'quadratic-equation-calculator',
  slug: 'kvadratnoe-uravnenie',
  title: 'Решение квадратного уравнения',
  description: 'Находит корни уравнения ax² + bx + c = 0',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'a',
      label: 'a (коэффициент x²)',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'b',
      label: 'b (коэффициент x)',
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
    { name: 'x1', label: 'x₁', type: 'text' },
    { name: 'x2', label: 'x₂', type: 'text' },
    { name: 'discriminant', label: 'Дискриминант', type: 'text' },
    { name: 'vertex', label: 'Вершина параболы', type: 'text' }
  ],
  calculate: (inputs) => {
    const a = Number(inputs.a);
    const b = Number(inputs.b);
    const c = Number(inputs.c);
    
    if (a === 0) {
      // Linear equation
      const x = -c / b;
      return [
        { value: `x = ${x}`, label: 'Корень (линейное уравнение)' },
        { value: '—', label: 'Второй корень' },
        { value: 'Линейное уравнение', label: 'Тип' },
        { value: '—', label: 'Вершина' }
      ];
    }
    
    const discriminant = b * b - 4 * a * c;
    
    let x1, x2;
    let x1Text, x2Text;
    
    if (discriminant > 0) {
      x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      x1Text = `x₁ = ${Math.round(x1 * 1e6) / 1e6}`;
      x2Text = `x₂ = ${Math.round(x2 * 1e6) / 1e6}`;
    } else if (discriminant === 0) {
      x1 = -b / (2 * a);
      x1Text = `x = ${Math.round(x1 * 1e6) / 1e6}`;
      x2Text = 'Один корень (кратность 2)';
    } else {
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(-discriminant) / (2 * a);
      x1Text = `${Math.round(realPart * 1e6) / 1e6} + ${Math.round(imagPart * 1e6) / 1e6}i`;
      x2Text = `${Math.round(realPart * 1e6) / 1e6} - ${Math.round(imagPart * 1e6) / 1e6}i`;
    }
    
    const vertexX = -b / (2 * a);
    const vertexY = -(discriminant) / (4 * a);
    
    return [
      { value: x1Text, label: 'Первый корень' },
      { value: x2Text, label: 'Второй корень' },
      { value: `D = ${discriminant}`, label: 'Дискриминант' },
      { value: `(${Math.round(vertexX * 1e6) / 1e6}; ${Math.round(vertexY * 1e6) / 1e6})`, label: 'Вершина параболы' }
    ];
  },
  content: {
    howTo: 'Введите коэффициенты a, b, c уравнения ax² + bx + c = 0. Калькулятор найдёт корни.',
    about: 'Квадратное уравнение — уравнение вида ax² + bx + c = 0, где a ≠ 0. Имеет до двух корней.',
    usage: 'Используется в алгебре, физике (движение с ускорением), экономике, инженерии.',
    formula: 'Дискриминант D = b² - 4ac\nЕсли D > 0: два корня\nЕсли D = 0: один корень\nЕсли D < 0: нет действительных корней',
    faq: [
      {
        question: 'Что такое дискриминант?',
        answer: 'Дискриминант (D = b² - 4ac) определяет количество корней квадратного уравнения. Если D > 0 — два корня, D = 0 — один, D < 0 — нет действительных корней.'
      },
      {
        question: 'Какая формула корней?',
        answer: 'x = (-b ± √D) / (2a), где D = b² - 4ac.'
      }
    ],
    sources: [
      { title: 'Квадратное уравнение — Википедия', url: 'https://ru.wikipedia.org/wiki/Квадратное_уравнение' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор НОД и НОК
export const gcdLcmCalculator: Calculator = {
  id: 'gcd-lcm-calculator',
  slug: 'nod-i-nok',
  title: 'Калькулятор НОД и НОК',
  description: 'Наибольший общий делитель и наименьшее общее кратное двух чисел',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'a',
      label: 'Первое число',
      type: 'number',
      placeholder: '48',
      defaultValue: 48,
      min: 1
    },
    {
      name: 'b',
      label: 'Второе число',
      type: 'number',
      placeholder: '18',
      defaultValue: 18,
      min: 1
    }
  ],
  outputs: [
    { name: 'gcd', label: 'НОД', type: 'number' },
    { name: 'lcm', label: 'НОК', type: 'number' },
    { name: 'factorsA', label: 'Факторы первого', type: 'text' },
    { name: 'factorsB', label: 'Факторы второго', type: 'text' }
  ],
  calculate: (inputs) => {
    let a = Math.abs(Number(inputs.a));
    let b = Math.abs(Number(inputs.b));
    
    // GCD using Euclidean algorithm
    const gcd = (x: number, y: number): number => {
      while (y !== 0) {
        const temp = y;
        y = x % y;
        x = temp;
      }
      return x;
    };
    
    // Factorization function
    const factorize = (n: number): string => {
      const factors: number[] = [];
      let d = 2;
      let num = n;
      while (d * d <= num) {
        while (num % d === 0) {
          factors.push(d);
          num /= d;
        }
        d++;
      }
      if (num > 1) factors.push(num);
      return factors.join(' × ');
    };
    
    const resultGcd = gcd(a, b);
    const resultLcm = (a * b) / resultGcd;
    
    return [
      { value: resultGcd, label: 'НОД (GCD)' },
      { value: resultLcm, label: 'НОК (LCM)' },
      { value: factorize(a), label: `Разложение ${a}` },
      { value: factorize(b), label: `Разложение ${b}` }
    ];
  },
  content: {
    howTo: 'Введите два числа. Калькулятор найдёт НОД и НОК, а также покажет разложение на множители.',
    about: 'НОД — наибольшее число, на которое делятся оба числа. НОК — наименьшее число, которое делится на оба.',
    usage: 'Используется для сокращения дробей, решения задач на делимость, нахождения периодичности.',
    formula: 'НОК(a,b) = (a × b) / НОД(a,b)\nНОД находится алгоритмом Евклида',
    faq: [
      {
        question: 'Что такое НОД?',
        answer: 'Наибольший общий делитель (НОД, GCD) — это наибольшее число, на которое делятся оба числа без остатка. Например, НОД(12, 18) = 6.'
      },
      {
        question: 'Что такое НОК?',
        answer: 'Наименьшее общее кратное (НОК, LCM) — это наименьшее число, которое делится на оба числа без остатка. Например, НОК(4, 6) = 12.'
      }
    ],
    sources: [
      { title: 'Наибольший общий делитель — Википедия', url: 'https://ru.wikipedia.org/wiki/Наибольший_общий_делитель' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор чисел Фибоначчи
export const fibonacciCalculator: Calculator = {
  id: 'fibonacci-calculator',
  slug: 'chisla-fibonachchi',
  title: 'Числа Фибоначчи',
  description: 'Вычисление n-го числа Фибоначчи и ряда',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'n',
      label: 'Номер числа (n)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0,
      max: 1476  // F(1476) is the largest that fits in JS number
    },
    {
      name: 'showSequence',
      label: 'Показать последовательность',
      type: 'select',
      options: [
        { value: 'yes', label: 'Да, показать ряд' },
        { value: 'no', label: 'Нет, только n-е число' }
      ],
      defaultValue: 'yes'
    }
  ],
  outputs: [
    { name: 'fn', label: 'F(n)', type: 'text' },
    { name: 'ratio', label: 'Отношение F(n)/F(n-1)', type: 'text' },
    { name: 'sequence', label: 'Последовательность', type: 'text' }
  ],
  calculate: (inputs) => {
    const n = Math.floor(Number(inputs.n));
    const showSeq = String(inputs.showSequence) === 'yes';
    
    if (n === 0) {
      return [
        { value: 0, label: 'F(0)' },
        { value: '—', label: 'Золотое сечение' },
        { value: '0', label: 'Ряд' }
      ];
    }
    
    // Calculate using iterative approach (limited to avoid BigInt)
    let a = 0;
    let b = 1;
    const sequence: number[] = [0, 1];
    
    for (let i = 2; i <= Math.min(n, 50); i++) {  // Limit to 50 to avoid overflow
      const temp = a + b;
      a = b;
      b = temp;
      if (i <= 20) sequence.push(temp);
    }
    
    // For larger n, use approximation formula
    let fn: number;
    if (n <= 50) {
      fn = n === 0 ? 0 : n === 1 ? 1 : b;
    } else {
      // Binet's formula approximation
      const phi = (1 + Math.sqrt(5)) / 2;
      fn = Math.round(Math.pow(phi, n) / Math.sqrt(5));
    }
    
    const fnMinus1 = n === 1 ? 1 : a;
    
    // Calculate golden ratio approximation
    const ratio = Number(fn) / Number(fnMinus1);
    
    return [
      { value: fn.toString(), label: `F(${n})` },
      { value: fnMinus1 > 0 ? ratio.toFixed(6) : '—', label: 'Приближение φ (золотое сечение)' },
      { value: showSeq ? (n > 20 ? sequence.slice(0, 21).join(', ') + '...' : sequence.join(', ')) : '(не показано)', label: n > 20 ? 'Первые 20 чисел' : 'Ряд Фибоначчи' }
    ];
  },
  content: {
    howTo: 'Введите номер числа n. Калькулятор вычислит F(n) и покажет последовательность.',
    about: 'Числа Фибоначчи — последовательность, где каждое число равно сумме двух предыдущих: 0, 1, 1, 2, 3, 5, 8, 13, 21...',
    usage: 'Используется в математике, биологии (филотаксис), финансах (технический анализ), искусстве, архитектуре.',
    formula: 'F(0) = 0, F(1) = 1\nF(n) = F(n-1) + F(n-2) для n > 1\nОтношение F(n)/F(n-1) → φ ≈ 1.618 (золотое сечение)',
    faq: [
      {
        question: 'Что такое золотое сечение?',
        answer: 'Золотое сечение φ ≈ 1.618 — это отношение, к которому стремится отношение соседних чисел Фибоначчи. Найдено в природе, искусстве, архитектуре.'
      },
      {
        question: 'Где встречаются числа Фибоначчи?',
        answer: 'В расположении листьев на стеблях, спиралях раковин, семенах подсолнуха, пропорциях тела, музыкальных интервалах, финансовых рынках.'
      }
    ],
    sources: [
      { title: 'Числа Фибоначчи — Википедия', url: 'https://ru.wikipedia.org/wiki/Числа_Фибоначчи' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор перевода систем счисления
export const baseConverterCalculator: Calculator = {
  id: 'base-converter-calculator',
  slug: 'sistemy-schisleniya',
  title: 'Перевод систем счисления',
  description: 'Конвертация между двоичной, восьмеричной, десятичной, шестнадцатеричной',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'converter',
  inputs: [
    {
      name: 'number',
      label: 'Число',
      type: 'text',
      placeholder: '255',
      defaultValue: '255'
    },
    {
      name: 'fromBase',
      label: 'Из системы',
      type: 'select',
      options: [
        { value: '2', label: 'Двоичная (base-2)' },
        { value: '8', label: 'Восьмеричная (base-8)' },
        { value: '10', label: 'Десятичная (base-10)' },
        { value: '16', label: 'Шестнадцатеричная (base-16)' },
        { value: '32', label: '32-ричная' },
        { value: '36', label: '36-ричная' }
      ],
      defaultValue: '10'
    }
  ],
  outputs: [
    { name: 'binary', label: 'Двоичная', type: 'text' },
    { name: 'octal', label: 'Восьмеричная', type: 'text' },
    { name: 'decimal', label: 'Десятичная', type: 'text' },
    { name: 'hex', label: 'Шестнадцатеричная', type: 'text' }
  ],
  calculate: (inputs) => {
    const number = String(inputs.number);
    const fromBase = parseInt(String(inputs.fromBase), 10);
    
    try {
      // Parse from source base
      const decimal = parseInt(number, fromBase);
      
      if (isNaN(decimal)) {
        return [
          { value: 'Ошибка', label: 'Ошибка' },
          { value: 'Ошибка', label: 'Ошибка' },
          { value: 'Ошибка', label: 'Ошибка' },
          { value: 'Ошибка', label: 'Ошибка' }
        ];
      }
      
      return [
        { value: decimal.toString(2), label: 'Base-2 (двоичная)' },
        { value: decimal.toString(8), label: 'Base-8 (восьмеричная)' },
        { value: decimal.toString(10), label: 'Base-10 (десятичная)' },
        { value: '0x' + decimal.toString(16).toUpperCase(), label: 'Base-16 (шестнадцатеричная)' }
      ];
    } catch {
      return [
        { value: 'Ошибка ввода', label: 'Ошибка' },
        { value: 'Ошибка ввода', label: 'Ошибка' },
        { value: 'Ошибка ввода', label: 'Ошибка' },
        { value: 'Ошибка ввода', label: 'Ошибка' }
      ];
    }
  },
  content: {
    howTo: 'Введите число и выберите текущую систему счисления. Калькулятор конвертирует во все основные системы.',
    about: 'Система счисления — способ записи чисел. Десятичная — 10 цифр (0-9). Двоичная — 2 цифры (0-1). Шестнадцатеричная — 16 символов (0-9, A-F).',
    usage: 'Используется в программировании, информатике, электронике, криптографии, математике.',
    formula: 'Двоичная: только 0 и 1\nВосьмеричная: 0-7\nШестнадцатеричная: 0-9, A=10, B=11, ..., F=15',
    faq: [
      {
        question: 'Зачем нужна двоичная система?',
        answer: 'Компьютеры работают с электрическими сигналами (вкл/выкл). Двоичная система (0/1) идеально подходит для представления этих состояний.'
      },
      {
        question: 'Почему шестнадцатеричная популярна?',
        answer: 'Одна шестнадцатеричная цифра = 4 бита. Компактно представляет двоичные данные: цвета (FF00FF), адреса памяти, байты.'
      }
    ],
    sources: [
      { title: 'Система счисления — Википедия', url: 'https://ru.wikipedia.org/wiki/Система_счисления' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор битовых операций
export const bitwiseCalculator: Calculator = {
  id: 'bitwise-calculator',
  slug: 'bitovye-operacii',
  title: 'Битовые операции',
  description: 'AND, OR, XOR, NOT, сдвиги битов',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'a',
      label: 'Число A',
      type: 'number',
      placeholder: '5',
      defaultValue: 5
    },
    {
      name: 'b',
      label: 'Число B',
      type: 'number',
      placeholder: '3',
      defaultValue: 3
    },
    {
      name: 'operation',
      label: 'Операция',
      type: 'select',
      options: [
        { value: 'and', label: 'AND (&) — И' },
        { value: 'or', label: 'OR (|) — ИЛИ' },
        { value: 'xor', label: 'XOR (^) — Исключающее ИЛИ' },
        { value: 'not', label: 'NOT (~) — НЕ (только A)' },
        { value: 'shl', label: 'SHL (<<) — Сдвиг влево' },
        { value: 'shr', label: 'SHR (>>) — Сдвиг вправо' }
      ],
      defaultValue: 'and'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' },
    { name: 'binaryA', label: 'A в двоичном', type: 'text' },
    { name: 'binaryB', label: 'B в двоичном', type: 'text' }
  ],
  calculate: (inputs) => {
    const a = Math.floor(Number(inputs.a));
    const b = Math.floor(Number(inputs.b));
    const op = String(inputs.operation);
    
    let result = 0;
    
    switch (op) {
      case 'and':
        result = a & b;
        break;
      case 'or':
        result = a | b;
        break;
      case 'xor':
        result = a ^ b;
        break;
      case 'not':
        result = ~a;
        break;
      case 'shl':
        result = a << b;
        break;
      case 'shr':
        result = a >> b;
        break;
    }
    
    const toBinary = (n: number) => {
      if (n < 0) return (n >>> 0).toString(2).padStart(32, '0');
      return n.toString(2).padStart(8, '0');
    };
    
    return [
      { value: `${result} (0b${toBinary(result)})`, label: 'Результат' },
      { value: `${a} = 0b${toBinary(a)}`, label: 'Число A' },
      { value: `${b} = 0b${toBinary(b)}`, label: 'Число B' }
    ];
  },
  content: {
    howTo: 'Введите два числа, выберите битовую операцию. Калькулятор покажет результат в десятичной и двоичной системах.',
    about: 'Битовые операции работают с отдельными битами чисел. Основные: AND, OR, XOR, NOT. Используются для манипуляции флагами, масок, сжатия данных.',
    usage: 'Используется в программировании (низкоуровневое), криптографии, сетевых протоколах, графике, оптимизации.',
    formula: 'AND: бит = 1, если оба бита = 1\nOR: бит = 1, если хотя бы один бит = 1\nXOR: бит = 1, если биты разные',
    faq: [
      {
        question: 'Что такое битовая маска?',
        answer: 'Маска — это число, используемое с AND для извлечения определённых битов. Например, x & 1 проверяет, чётное ли число (младший бит = 0).'
      },
      {
        question: 'Зачем нужен XOR?',
        answer: 'XOR используется для шифрования, переключения битов, сравнения (XOR двух одинаковых чисел = 0), обмена значений без временной переменной.'
      }
    ],
    sources: [
      { title: 'Битовая операция — Википедия', url: 'https://ru.wikipedia.org/wiki/Битовая_операция' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор простых чисел
export const primeCalculator: Calculator = {
  id: 'prime-calculator',
  slug: 'prostye-chisla',
  title: 'Калькулятор простых чисел',
  description: 'Проверка на простоту, разложение на множители, генерация простых',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'number',
      label: 'Число',
      type: 'number',
      placeholder: '97',
      defaultValue: 97,
      min: 1,
      max: 10000000
    },
    {
      name: 'action',
      label: 'Действие',
      type: 'select',
      options: [
        { value: 'check', label: 'Проверить на простоту' },
        { value: 'factor', label: 'Разложить на множители' },
        { value: 'next', label: 'Найти следующее простое' },
        { value: 'prev', label: 'Найти предыдущее простое' }
      ],
      defaultValue: 'check'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' },
    { name: 'details', label: 'Детали', type: 'text' }
  ],
  calculate: (inputs) => {
    const n = Math.floor(Number(inputs.number));
    const action = String(inputs.action);
    
    const isPrime = (num: number): boolean => {
      if (num < 2) return false;
      if (num === 2) return true;
      if (num % 2 === 0) return false;
      for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
      }
      return true;
    };
    
    const factorize = (num: number): number[] => {
      const factors: number[] = [];
      let d = 2;
      let temp = num;
      while (d * d <= temp) {
        while (temp % d === 0) {
          factors.push(d);
          temp /= d;
        }
        d++;
      }
      if (temp > 1) factors.push(temp);
      return factors;
    };
    
    const findNextPrime = (num: number): number => {
      let candidate = num + 1;
      while (!isPrime(candidate)) {
        candidate++;
      }
      return candidate;
    };
    
    const findPrevPrime = (num: number): number => {
      let candidate = num - 1;
      while (candidate > 1 && !isPrime(candidate)) {
        candidate--;
      }
      return candidate > 1 ? candidate : -1;
    };
    
    switch (action) {
      case 'check':
        const prime = isPrime(n);
        return [
          { value: prime ? 'Да, простое' : 'Нет, составное', label: 'Результат' },
          { value: prime ? `${n} не делится ни на какое число кроме 1 и себя` : `${n} = ${factorize(n).join(' × ')}`, label: 'Проверка' }
        ];
      case 'factor':
        const factors = factorize(n);
        return [
          { value: factors.join(' × '), label: 'Разложение' },
          { value: `${factors.length} множителей`, label: 'Детали' }
        ];
      case 'next':
        const next = findNextPrime(n);
        return [
          { value: next, label: 'Следующее простое' },
          { value: `Разница: ${next - n}`, label: 'Детали' }
        ];
      case 'prev':
        const prev = findPrevPrime(n);
        return [
          { value: prev > 0 ? prev : 'Не найдено', label: 'Предыдущее простое' },
          { value: prev > 0 ? `Разница: ${n - prev}` : 'Нет простых меньше 2', label: 'Детали' }
        ];
      default:
        return [{ value: 'Ошибка', label: 'Ошибка' }];
    }
  },
  content: {
    howTo: 'Введите число и выберите действие: проверить на простоту, разложить, найти ближайшее простое.',
    about: 'Простое число — натуральное число, больше 1, имеющее ровно два делителя: 1 и само себя. Первые простые: 2, 3, 5, 7, 11, 13...',
    usage: 'Используется в криптографии (RSA), теории чисел, хешировании, генерации случайных чисел, computer science.',
    formula: 'Простое число: делится только на 1 и на себя\nОсновная теорема арифметики: любое число можно разложить в произведение простых',
    faq: [
      {
        question: 'Почему 1 не является простым?',
        answer: 'По современному определению простое число должно иметь ровно два различных делителя. У 1 только один делитель — сама единица.'
      },
      {
        question: 'Как используются простые числа?',
        answer: 'В криптографии (RSA основан на сложности факторизации), генерации хешей, проверке целостности данных, случайных числах.'
      }
    ],
    sources: [
      { title: 'Простое число — Википедия', url: 'https://ru.wikipedia.org/wiki/Простое_число' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор комплексных чисел
export const complexCalculator: Calculator = {
  id: 'complex-calculator',
  slug: 'kompleksnye-chisla',
  title: 'Калькулятор комплексных чисел',
  description: 'Сложение, умножение, деление, модуль, аргумент комплексных чисел',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'aReal',
      label: 'A (действительная часть)',
      type: 'number',
      placeholder: '3',
      defaultValue: 3
    },
    {
      name: 'aImag',
      label: 'A (мнимая часть)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4
    },
    {
      name: 'bReal',
      label: 'B (действительная часть)',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'bImag',
      label: 'B (мнимая часть)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2
    },
    {
      name: 'operation',
      label: 'Операция',
      type: 'select',
      options: [
        { value: 'add', label: 'Сложение (A + B)' },
        { value: 'sub', label: 'Вычитание (A - B)' },
        { value: 'mul', label: 'Умножение (A × B)' },
        { value: 'div', label: 'Деление (A / B)' },
        { value: 'abs', label: 'Модуль |A|' }
      ],
      defaultValue: 'add'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const aR = Number(inputs.aReal);
    const aI = Number(inputs.aImag);
    const bR = Number(inputs.bReal);
    const bI = Number(inputs.bImag);
    const op = String(inputs.operation);
    
    let rR = 0, rI = 0;
    let label = '';
    
    switch (op) {
      case 'add':
        rR = aR + bR;
        rI = aI + bI;
        label = 'A + B';
        break;
      case 'sub':
        rR = aR - bR;
        rI = aI - bI;
        label = 'A - B';
        break;
      case 'mul':
        rR = aR * bR - aI * bI;
        rI = aR * bI + aI * bR;
        label = 'A × B';
        break;
      case 'div':
        const denom = bR * bR + bI * bI;
        if (denom === 0) return [{ value: 'Ошибка: деление на ноль', label: 'Ошибка' }];
        rR = (aR * bR + aI * bI) / denom;
        rI = (aI * bR - aR * bI) / denom;
        label = 'A / B';
        break;
      case 'abs':
        const abs = Math.sqrt(aR * aR + aI * aI);
        return [{ value: Math.round(abs * 1e6) / 1e6, label: '|A| (модуль A)' }];
    }
    
    const sign = rI >= 0 ? '+' : '-';
    const imag = Math.abs(rI);
    
    return [{ 
      value: `${Math.round(rR * 1e6) / 1e6} ${sign} ${Math.round(imag * 1e6) / 1e6}i`, 
      label 
    }];
  },
  content: {
    howTo: 'Введите действительные и мнимые части двух комплексных чисел, выберите операцию.',
    about: 'Комплексное число — число вида a + bi, где a, b — действительные числа, i — мнимая единица (i² = -1).',
    usage: 'Используется в электротехнике (переменный ток), квантовой механике, обработке сигналов, теории управления.',
    formula: '(a + bi) + (c + di) = (a+c) + (b+d)i\n(a + bi) × (c + di) = (ac-bd) + (ad+bc)i\n|a + bi| = √(a² + b²)',
    faq: [
      {
        question: 'Что такое мнимая единица i?',
        answer: 'i — это число, квадрат которого равен -1. Не существует действительного числа с таким свойством, поэтому ввели мнимые числа.'
      },
      {
        question: 'Где применяются комплексные числа?',
        answer: 'В электротехнике (переменный ток, импеданс), физике (квантовая механика), инженерии (вибрации, сигналы), математике.'
      }
    ],
    sources: [
      { title: 'Комплексное число — Википедия', url: 'https://ru.wikipedia.org/wiki/Комплексное_число' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const mathAdvancedCalculators = [
  percentAdvancedCalculator,
  factorialCalculator,
  powerRootCalculator,
  trigonometryCalculator,
  quadraticEquationCalculator,
  gcdLcmCalculator,
  fibonacciCalculator,
  baseConverterCalculator,
  bitwiseCalculator,
  primeCalculator,
  complexCalculator,
];
