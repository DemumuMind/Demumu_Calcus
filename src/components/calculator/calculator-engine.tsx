'use client';

import { CalculationResult } from '@/lib/types';

// Engine that maps calculator IDs to their calculate functions
export const calculatorEngines: Record<string, (inputs: Record<string, string | number>) => CalculationResult[]> = {
  // Math
  'percentage-calculator': (inputs) => {
    const value = Number(inputs.value);
    const percentage = Number(inputs.percentage);
    if (!value || !percentage) return [{ value: '—', label: 'Результат' }];
    const result = (value * percentage) / 100;
    const increased = value + result;
    const decreased = value - result;
    return [
      { value: result.toFixed(2), label: `${percentage}% от ${value}` },
      { value: increased.toFixed(2), label: 'Увеличение на %' },
      { value: decreased.toFixed(2), label: 'Уменьшение на %' }
    ];
  },

  'quadratic-equation': (inputs) => {
    const a = Number(inputs.a);
    const b = Number(inputs.b);
    const c = Number(inputs.c);
    if (!a) return [{ value: 'a не может быть 0', label: 'Ошибка' }];
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
      { value: x1.toFixed(4), label: 'x₁' },
      { value: discriminant === 0 ? x1.toFixed(4) : x2.toFixed(4), label: discriminant === 0 ? 'x (двойной корень)' : 'x₂' }
    ];
  },

  'root-calculator': (inputs) => {
    const number = Number(inputs.number);
    const degree = Number(inputs.degree);
    if (!number || !degree) return [{ value: '—', label: 'Результат' }];
    if (number < 0 && degree % 2 === 0) {
      return [{ value: 'Нет действительного корня', label: 'Результат' }];
    }
    const result = Math.pow(Math.abs(number), 1 / degree);
    const signedResult = number < 0 ? -result : result;
    return [
      { value: signedResult.toFixed(6), label: `Корень ${degree}-й степени из ${number}` },
      { value: Math.pow(signedResult, degree).toFixed(2), label: 'Проверка' }
    ];
  },

  'fraction-calculator': (inputs) => {
    const num1 = Number(inputs.numerator1);
    const den1 = Number(inputs.denominator1);
    const num2 = Number(inputs.numerator2);
    const den2 = Number(inputs.denominator2);
    const operation = String(inputs.operation);
    if (!den1 || !den2) return [{ value: 'Знаменатель не может быть 0', label: 'Ошибка' }];
    let resultNum, resultDen;
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
      default:
        return [{ value: '—', label: 'Результат' }];
    }
    // Simplify fraction
    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
    const divisor = gcd(Math.abs(resultNum), Math.abs(resultDen));
    return [
      { value: `${resultNum / divisor}/${resultDen / divisor}`, label: 'Результат' },
      { value: (resultNum / resultDen).toFixed(4), label: 'Десятичное' }
    ];
  },

  'factorial-calculator': (inputs) => {
    const n = Number(inputs.number);
    if (n < 0 || n > 170) return [{ value: 'Число должно быть от 0 до 170', label: 'Ошибка' }];
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return [
      { value: result.toLocaleString('ru-RU'), label: `${n}!` }
    ];
  },

  'factorial-simple-calculator': (inputs) => {
    const n = Math.floor(Number(inputs.n));
    if (n < 0 || n > 170) return [{ value: 'Число должно быть от 0 до 170', label: 'Ошибка' }];
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return [
      { value: result.toLocaleString('ru-RU'), label: `${n}!` },
      { value: n.toString(), label: 'Число слагаемых' }
    ];
  },

  // Health
  'bmi-calculator': (inputs) => {
    const height = Number(inputs.height) / 100;
    const weight = Number(inputs.weight);
    if (!height || !weight) return [{ value: '—', label: 'Результат' }];
    const bmi = weight / (height * height);
    const roundedBMI = Math.round(bmi * 10) / 10;
    let category = '';
    if (bmi < 16) category = 'Выраженный дефицит массы';
    else if (bmi < 18.5) category = 'Недостаточная масса';
    else if (bmi < 25) category = 'Нормальная масса';
    else if (bmi < 30) category = 'Избыточная масса';
    else category = 'Ожирение';
    return [
      { value: roundedBMI, label: 'ИМТ', unit: 'кг/м²', additionalInfo: category }
    ];
  },

  'bmr-calculator': (inputs) => {
    const gender = String(inputs.gender);
    const age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    if (!age || !height || !weight) return [{ value: '—', label: 'Результат' }];
    let bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    return [
      { value: Math.round(bmr), label: 'BMR', unit: 'ккал/день' }
    ];
  },

  'tdee-calculator': (inputs) => {
    const gender = String(inputs.gender);
    const age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    const activity = Number(inputs.activity);
    if (!age || !height || !weight) return [{ value: '—', label: 'Результат' }];
    let bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = Math.round(bmr * activity);
    return [
      { value: tdee, label: 'TDEE', unit: 'ккал/день' },
      { value: Math.round(tdee * 0.3 / 4), label: 'Белки', unit: 'г' },
      { value: Math.round(tdee * 0.25 / 9), label: 'Жиры', unit: 'г' },
      { value: Math.round(tdee * 0.45 / 4), label: 'Углеводы', unit: 'г' }
    ];
  },

  'calories-calculator': (inputs) => {
    const gender = String(inputs.gender);
    const age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    const activity = Number(inputs.activity);
    const goal = String(inputs.goal);
    if (!age || !height || !weight) return [{ value: '—', label: 'Результат' }];
    let bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    let calories = Math.round(bmr * activity);
    if (goal === 'lose') calories -= 500;
    if (goal === 'gain') calories += 500;
    return [
      { value: calories, label: 'Калории', unit: 'ккал' },
      { value: Math.round((calories * 0.30) / 4), label: 'Белки', unit: 'г' },
      { value: Math.round((calories * 0.25) / 9), label: 'Жиры', unit: 'г' },
      { value: Math.round((calories * 0.45) / 4), label: 'Углеводы', unit: 'г' }
    ];
  },

  // Finance
  'vat-calculator': (inputs) => {
    const amount = Number(inputs.amount);
    const vatRate = Number(inputs.vatRate) / 100;
    const operation = String(inputs.operation);
    if (!amount) return [{ value: '—', label: 'Результат' }];
    let amountWithoutVat, vatAmount, totalAmount;
    if (operation === 'add') {
      amountWithoutVat = amount;
      vatAmount = amount * vatRate;
      totalAmount = amount + vatAmount;
    } else {
      totalAmount = amount;
      amountWithoutVat = amount / (1 + vatRate);
      vatAmount = amount - amountWithoutVat;
    }
    return [
      { value: amountWithoutVat.toFixed(2), label: 'Сумма без НДС', unit: '₽' },
      { value: vatAmount.toFixed(2), label: 'Сумма НДС', unit: '₽' },
      { value: totalAmount.toFixed(2), label: 'Итого с НДС', unit: '₽' }
    ];
  },

  'ndfl-calculator': (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate);
    if (!amount) return [{ value: '—', label: 'Результат' }];
    const tax = amount * (rate / 100);
    const net = amount - tax;
    return [
      { value: tax.toFixed(2), label: 'НДФЛ', unit: '₽' },
      { value: net.toFixed(2), label: 'На руки', unit: '₽' },
      { value: amount.toFixed(2), label: 'Доход', unit: '₽' }
    ];
  },

  'loan-calculator': (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate) / 100 / 12;
    const term = Number(inputs.term);
    const paymentType = String(inputs.paymentType);
    if (!amount || !rate || !term) return [{ value: '—', label: 'Результат' }];
    if (paymentType === 'annuity') {
      const payment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      const total = payment * term;
      return [
        { value: payment.toFixed(2), label: 'Ежемесячный платёж', unit: '₽' },
        { value: total.toFixed(2), label: 'Общая сумма', unit: '₽' },
        { value: (total - amount).toFixed(2), label: 'Переплата', unit: '₽' }
      ];
    } else {
      const principalPayment = amount / term;
      let totalPayment = 0;
      for (let month = 1; month <= term; month++) {
        const interestPayment = (amount - principalPayment * (month - 1)) * rate;
        totalPayment += principalPayment + interestPayment;
      }
      return [
        { value: principalPayment.toFixed(2), label: 'Долг в месяц', unit: '₽' },
        { value: totalPayment.toFixed(2), label: 'Общая сумма', unit: '₽' },
        { value: (totalPayment - amount).toFixed(2), label: 'Переплата', unit: '₽' }
      ];
    }
  },

  'mortgage': (inputs) => {
    const propertyValue = Number(inputs.propertyValue);
    const downPayment = Number(inputs.downPayment);
    const annualRate = Number(inputs.interestRate) / 100;
    const years = Number(inputs.years);
    const loanAmount = propertyValue - downPayment;
    const monthlyRate = annualRate / 12;
    const months = years * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - loanAmount;
    const downPaymentPercent = (downPayment / propertyValue) * 100;
    return [
      { value: Math.round(loanAmount * 100) / 100, label: 'Сумма кредита', unit: '₽' },
      { value: Math.round(monthlyPayment * 100) / 100, label: 'Ежемесячный платеж', unit: '₽' },
      { value: Math.round(totalPayment * 100) / 100, label: 'Общая сумма', unit: '₽' },
      { value: Math.round(totalInterest * 100) / 100, label: 'Переплата', unit: '₽' },
      { value: Math.round(downPaymentPercent * 100) / 100, label: 'Первый взнос', unit: '%' }
    ];
  },

  'deposit-calculator': (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate) / 100;
    const term = Number(inputs.term);
    const capitalization = String(inputs.capitalization);
    if (!amount || !rate || !term) return [{ value: '—', label: 'Результат' }];
    let periods = capitalization === 'monthly' ? term : capitalization === 'quarterly' ? term / 3 : term / 12;
    let ratePerPeriod = capitalization === 'monthly' ? rate / 12 : capitalization === 'quarterly' ? rate / 4 : rate;
    const finalAmount = amount * Math.pow(1 + ratePerPeriod, periods);
    const profit = finalAmount - amount;
    return [
      { value: finalAmount.toFixed(2), label: 'Итоговая сумма', unit: '₽' },
      { value: profit.toFixed(2), label: 'Доход', unit: '₽' },
      { value: ((profit / amount) * 100).toFixed(2), label: 'Доходность', unit: '%' }
    ];
  },

  // Converters
  'currency-converter': (inputs) => {
    const rates: Record<string, number> = { USD: 1, EUR: 0.92, RUB: 92.5, GBP: 0.79, JPY: 150.2, CNY: 7.23, UAH: 39.5, KZT: 500, BYN: 3.27 };
    const amount = Number(inputs.amount);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!amount || !rates[from] || !rates[to]) return [{ value: '—', label: 'Результат' }];
    const result = (amount / rates[from]) * rates[to];
    return [{ value: result.toFixed(2), label: 'Результат', unit: to }];
  },

  'length-converter': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const toMeters: Record<string, number> = {
      'm': 1, 'km': 1000, 'cm': 0.01, 'mm': 0.001,
      'inch': 0.0254, 'ft': 0.3048, 'yd': 0.9144, 'mi': 1609.344,
      'nm': 1e-9, 'um': 1e-6
    };
    const inMeters = value * toMeters[from];
    const result = inMeters / toMeters[to];
    const labels: Record<string, string> = {
      'm': 'м', 'km': 'км', 'cm': 'см', 'mm': 'мм',
      'inch': 'дюймов', 'ft': 'футов', 'yd': 'ярдов', 'mi': 'миль',
      'nm': 'нм', 'um': 'мкм'
    };
    return [{ value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`, label: 'Результат' }];
  },

  'weight-converter': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const toGrams: Record<string, number> = {
      'kg': 1000, 'g': 1, 'mg': 0.001, 't': 1e6,
      'lb': 453.592, 'oz': 28.3495, 'ct': 0.2
    };
    const inGrams = value * toGrams[from];
    const result = inGrams / toGrams[to];
    const labels: Record<string, string> = {
      'kg': 'кг', 'g': 'г', 'mg': 'мг', 't': 'т',
      'lb': 'фунтов', 'oz': 'унций', 'ct': 'карат'
    };
    return [{ value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`, label: 'Результат' }];
  },

  'temperature-converter': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (from === to) return [{ value: `${value}° — то же значение`, label: 'Результат' }];
    let celsius = value;
    switch (from) {
      case 'f': celsius = (value - 32) * 5 / 9; break;
      case 'k': celsius = value - 273.15; break;
      case 'r': celsius = value * 5 / 4; break;
    }
    let result = celsius;
    switch (to) {
      case 'f': result = celsius * 9 / 5 + 32; break;
      case 'k': result = celsius + 273.15; break;
      case 'r': result = celsius * 4 / 5; break;
    }
    const symbols: Record<string, string> = { 'c': '°C', 'f': '°F', 'k': 'K', 'r': '°Re' };
    return [{ value: `${value}${symbols[from]} = ${result.toFixed(2)}${symbols[to]}`, label: 'Результат' }];
  },

  'kmh-to-ms': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) return [{ value: '—', label: 'Результат' }];
    const toMs: Record<string, (v: number) => number> = {
      kmh: (v) => v / 3.6, ms: (v) => v, mph: (v) => v * 0.44704, knot: (v) => v * 0.514444
    };
    const fromMs: Record<string, (v: number) => number> = {
      kmh: (v) => v * 3.6, ms: (v) => v, mph: (v) => v / 0.44704, knot: (v) => v / 0.514444
    };
    const ms = toMs[from](value);
    const result = fromMs[to](ms);
    return [{ value: result.toFixed(3), label: 'Результат' }];
  },

  // Generators
  'password-generator': (inputs) => {
    const length = Number(inputs.length) || 16;
    const uppercase = inputs.uppercase !== undefined;
    const lowercase = inputs.lowercase !== undefined;
    const numbers = inputs.numbers !== undefined;
    const symbols = inputs.symbols !== undefined;
    const chars = [
      uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
      lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '',
      numbers ? '0123456789' : '',
      symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : ''
    ].join('') || 'abcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return [{ value: password, label: 'Пароль' }];
  },

  'random-number': (inputs) => {
    const min = Number(inputs.min);
    const max = Number(inputs.max);
    const count = Math.min(Number(inputs.count) || 1, 10);
    if (isNaN(min) || isNaN(max) || min >= max) return [{ value: 'Неверный диапазон', label: 'Ошибка' }];
    const numbers = Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    return [{ value: numbers.join(', '), label: 'Числа' }];
  },

  'dice-roller': (inputs) => {
    const sides = Number(inputs.sides) || 6;
    const count = Math.min(Number(inputs.count) || 1, 10);
    const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
    const sum = rolls.reduce((a, b) => a + b, 0);
    return [
      { value: rolls.join(', '), label: 'Броски' },
      { value: sum.toString(), label: 'Сумма' }
    ];
  },

  // Text
  'word-count': (inputs) => {
    const text = String(inputs.text || '');
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    return [
      { value: words.toString(), label: 'Слов' },
      { value: chars.toString(), label: 'Символов' },
      { value: charsNoSpaces.toString(), label: 'Без пробелов' }
    ];
  },

  'reading-time': (inputs) => {
    const text = String(inputs.text || '');
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const wpm = Number(inputs.wpm) || 200;
    const minutes = Math.ceil(words / wpm);
    return [
      { value: words.toString(), label: 'Слов' },
      { value: `${minutes} мин`, label: 'Время чтения' }
    ];
  },

  // Time & Date
  'age-calculator': (inputs) => {
    const birthDate = new Date(String(inputs.birthDate));
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }
    const days = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    return [
      { value: years.toString(), label: 'Лет' },
      { value: Math.floor(days / 30.44).toString(), label: 'Месяцев' },
      { value: days.toString(), label: 'Дней' }
    ];
  },

  'date-difference': (inputs) => {
    const date1 = new Date(String(inputs.date1));
    const date2 = new Date(String(inputs.date2));
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return [
      { value: diffDays.toString(), label: 'Дней' },
      { value: Math.floor(diffDays / 7).toString(), label: 'Недель' },
      { value: Math.floor(diffDays / 30.44).toString(), label: 'Месяцев' }
    ];
  },

  // Daily
  'tip-calculator': (inputs) => {
    const amount = Number(inputs.amount);
    const tipPercent = Number(inputs.tipPercent);
    const people = Number(inputs.people) || 1;
    const tipAmount = amount * (tipPercent / 100);
    const total = amount + tipAmount;
    return [
      { value: tipAmount.toFixed(2), label: 'Чаевые', unit: '₽' },
      { value: total.toFixed(2), label: 'Итого', unit: '₽' },
      { value: (total / people).toFixed(2), label: 'С человека', unit: '₽' }
    ];
  },

  // Engineering
  'ohms-law': (inputs) => {
    const voltage = Number(inputs.voltage);
    const current = Number(inputs.current);
    const resistance = Number(inputs.resistance);
    if (voltage && current) {
      return [{ value: (voltage / current).toFixed(2), label: 'Сопротивление', unit: 'Ом' }];
    } else if (voltage && resistance) {
      return [{ value: (voltage / resistance).toFixed(2), label: 'Ток', unit: 'А' }];
    } else if (current && resistance) {
      return [{ value: (current * resistance).toFixed(2), label: 'Напряжение', unit: 'В' }];
    }
    return [{ value: 'Введите 2 значения', label: 'Подсказка' }];
  },
};

export function getCalculator(id: string) {
  return calculatorEngines[id] || null;
}
