import type { ComputeFn } from './compute-helpers';

export const computeMap_science_science_a_4: Record<string, ComputeFn> = {
  'konverter-ocenok': (inputs): any => {
    const n = inputs as Record<string, number>;
    const grade = Number(inputs.grade || 4);
    const fromSystem = String(inputs.fromSystem || 'russian5');
    let percent = 0;
    switch (fromSystem) {
        case 'russian5':
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
            percent = grade >= 90 ? 95 : grade >= 80 ? 85 : grade >= 70 ? 77 : grade >= 60 ? 65 : 50;
            break;
    }
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
    }
    else if (percent >= 80) {
        russian5 = '4 (Хорошо)';
        russian100 = '80-89';
        letter = 'B (Good)';
        gpa4 = '3.0-3.9';
        gpa5 = '4.0-4.9';
        description = 'Хорошие знания с небольшими пробелами';
    }
    else if (percent >= 70) {
        russian5 = '4/3 (Хорошо/Удовл.)';
        russian100 = '70-79';
        letter = 'C (Satisfactory)';
        gpa4 = '2.0-2.9';
        gpa5 = '3.0-3.9';
        description = 'Удовлетворительные знания';
    }
    else if (percent >= 60) {
        russian5 = '3 (Удовлетворительно)';
        russian100 = '60-69';
        letter = 'D (Passing)';
        gpa4 = '1.0-1.9';
        gpa5 = '2.0-2.9';
        description = 'Минимально допустимый уровень';
    }
    else if (percent >= 40) {
        russian5 = '2 (Неудовлетворительно)';
        russian100 = '40-59';
        letter = 'F (Fail)';
        gpa4 = '0.0';
        gpa5 = '1.0-1.9';
        description = 'Незачёт, требуется пересдача';
    }
    else {
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
  'konverter-valyut': (inputs) => {
    const amount = Number(inputs.amount);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!amount) {
        return [{ value: '—', label: 'Результат' }];
    }
    const rates: Record<string, number> = {
        'USD': 1,
        'EUR': 0.92,
        'RUB': 92.5,
        'GBP': 0.79,
        'JPY': 151.5,
        'CNY': 7.23,
        'UAH': 41.2,
        'KZT': 500.5,
        'BYN': 3.27
    };
    const inUSD = amount / rates[from];
    const result = inUSD * rates[to];
    const currencySymbols: Record<string, string> = {
        'USD': '$',
        'EUR': '€',
        'RUB': '₽',
        'GBP': '£',
        'JPY': '¥',
        'CNY': '元',
        'UAH': '₴',
        'KZT': '₸',
        'BYN': 'Br'
    };
    return [{
            value: `${amount.toFixed(2)} ${currencySymbols[from] || from} = ${result.toFixed(2)} ${currencySymbols[to] || to}`,
            label: 'Результат',
            additionalInfo: 'Курсы приблизительные, обновляются ежедневно'
        }];
},
  'konverter-zarplaty': (inputs) => {
    const amount = Number(inputs.amount);
    const period = inputs.period;
    const hoursPerWeek = Number(inputs.hoursPerWeek);
    const daysPerWeek = Number(inputs.daysPerWeek);
    let hourly = 0;
    switch (period) {
        case 'hour':
            hourly = amount;
            break;
        case 'day':
            hourly = amount / (hoursPerWeek / daysPerWeek);
            break;
        case 'week':
            hourly = amount / hoursPerWeek;
            break;
        case 'month':
            hourly = (amount * 12) / (hoursPerWeek * 52);
            break;
        case 'year':
            hourly = amount / (hoursPerWeek * 52);
            break;
    }
    const daily = hourly * (hoursPerWeek / daysPerWeek);
    const weekly = hourly * hoursPerWeek;
    const monthly = (hourly * hoursPerWeek * 52) / 12;
    const yearly = hourly * hoursPerWeek * 52;
    return [
        { value: Math.round(hourly * 100) / 100, label: 'В час', unit: '₽' },
        { value: Math.round(daily * 100) / 100, label: 'В день', unit: '₽' },
        { value: Math.round(weekly * 100) / 100, label: 'В неделю', unit: '₽' },
        { value: Math.round(monthly * 100) / 100, label: 'В месяц', unit: '₽' },
        { value: Math.round(yearly * 100) / 100, label: 'В год', unit: '₽' },
    ];
},
  'kreditnyj-kalkulyator': (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate) / 100 / 12; // monthly rate
    const term = Number(inputs.term);
    const type = String(inputs.type);
    let monthly = 0;
    let total = 0;
    let firstMonth = 0;
    if (type === 'annuity') {
        monthly = amount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        total = monthly * term;
        firstMonth = monthly;
    }
    else {
        const principalPerMonth = amount / term;
        const firstMonthInterest = amount * rate;
        firstMonth = principalPerMonth + firstMonthInterest;
        total = 0;
        let remaining = amount;
        for (let i = 0; i < term; i++) {
            const interest = remaining * rate;
            total += principalPerMonth + interest;
            remaining -= principalPerMonth;
        }
        monthly = total / term; // average
    }
    const overpayment = total - amount;
    return [
        { value: Math.round(monthly), label: type === 'annuity' ? 'Ежемесячный платёж' : 'Средний платёж', unit: '₽' },
        { value: Math.round(total), label: 'Общая сумма', unit: '₽' },
        { value: Math.round(overpayment), label: 'Переплата по процентам', unit: '₽' },
        { value: Math.round(firstMonth), label: 'Первый платёж', unit: '₽' }
    ];
},
  'kvadratnoe-uravnenie': (inputs) => {
    const a = Number(inputs.a);
    const b = Number(inputs.b);
    const c = Number(inputs.c);
    if (a === 0) {
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
    }
    else if (discriminant === 0) {
        x1 = -b / (2 * a);
        x1Text = `x = ${Math.round(x1 * 1e6) / 1e6}`;
        x2Text = 'Один корень (кратность 2)';
    }
    else {
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
  'kvadratnye-uravneniya': (inputs) => {
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
  'listovoj-metall': (inputs) => {
    const S = Number(inputs.thickness);
    const alpha = Number(inputs.bendAngle);
    const r = Number(inputs.innerRadius);
    const L1 = Number(inputs.leg1);
    const L2 = Number(inputs.leg2);
    const K = Number(inputs.kFactor);
    if (!S || !L1 || !L2) {
        return [{ value: 'Введите размеры', label: 'Ошибка' }];
    }
    const R = r + K * S;
    // Поправка на изгиб (Bend Allowance): BA = pi/180 * alpha * R
    const BA = (Math.PI / 180) * alpha * R;
    const flatPattern = L1 + L2 + BA;
    // Положение нейтрального слоя от внутренней поверхности
    const neutralAxis = r + K * S;
    return [
        { value: BA.toFixed(2), label: 'Поправка на изгиб', unit: 'мм' },
        { value: flatPattern.toFixed(2), label: 'Развёртка (длина заготовки)', unit: 'мм' },
        { value: neutralAxis.toFixed(2), label: 'Нейтральный слой', unit: 'мм' }
    ];
},
  'moment-bolta': (inputs) => {
    const size = String(inputs.boltSize);
    const grade = String(inputs.boltGrade);
    const K = Number(inputs.lubrication);
    // Данные болтов: размер -> номинальный диаметр, шаг, площадь сечения
    const boltData: Record<string, {
        d: number;
        P: number;
        As: number;
    }> = {
        'M6': { d: 6, P: 1.0, As: 20.1 },
        'M8': { d: 8, P: 1.25, As: 36.6 },
        'M10': { d: 10, P: 1.5, As: 58.0 },
        'M12': { d: 12, P: 1.75, As: 84.3 },
        'M16': { d: 16, P: 2.0, As: 157 },
        'M20': { d: 20, P: 2.5, As: 245 },
        'M24': { d: 24, P: 3.0, As: 353 }
    };
    const data = boltData[size];
    if (!data) {
        return [{ value: 'Неверный размер', label: 'Ошибка' }];
    }
    // Предел текучести из класса прочности (вторая цифра * 10 = % от 100 МПа * первое число)
    const Rm = parseInt(grade.split('.')[0]) * 100; // sigmaв
    const Re = parseInt(grade.split('.')[1]) / 10 * Rm; // sigmaт
    // Рекомендуемое напряжение предварительного затяжки: 70-90% от sigmaт
    const sigma = 0.75 * Re;
    const Fp = (sigma * data.As) / 1000; // в кН
    const T = (K * Fp * 1000 * data.d) / 1000; // Н*м
    return [
        { value: Math.round(T).toString(), label: 'Момент затяжки', unit: 'Н*м' },
        { value: Fp.toFixed(1), label: 'Усилие предварительного затяжки', unit: 'кН' },
        { value: Math.round(sigma).toString(), label: 'Напряжение в болте', unit: 'МПа' }
    ];
},
  'moment-inertsii': (inputs) => {
    const m = Number(inputs.mass);
    const r = Number(inputs.radius);
    const shape = String(inputs.shape);
    let I = 0;
    switch (shape) {
        case 'point':
            I = m * r * r;
            break;
        case 'disk':
            I = 0.5 * m * r * r;
            break;
        case 'sphere':
            I = 0.4 * m * r * r;
            break;
        case 'rod':
            I = (1 / 12) * m * r * r;
            break;
        case 'hoop':
            I = m * r * r;
            break;
    }
    return [{ value: Math.round(I * 1000) / 1000, label: 'Момент инерции', unit: 'кг·м²' }];
},
  'neustojka-395-gk': (inputs) => {
    const debt = Number(inputs.debt) || 0;
    const days = Number(inputs.days) || 0;
    const rate = Number(inputs.rate) || 0;
    if (!debt || !days || !rate) {
        return [
            { value: '—', label: 'Неустойка за день', unit: '₽' },
            { value: '—', label: 'Общая неустойка', unit: '₽' },
            { value: '—', label: 'Долг + неустойка', unit: '₽' },
            { value: '—', label: 'Годовой эквивалент', unit: '%' }
        ];
    }
    const dailyPenalty = debt * (rate / 100) / 300;
    const totalPenalty = dailyPenalty * days;
    const debtWithPenalty = debt + totalPenalty;
    const annualRate = (rate / 300) * 365;
    return [
        { value: Number(dailyPenalty.toFixed(2)), label: 'Неустойка за день', unit: '₽' },
        { value: Number(totalPenalty.toFixed(2)), label: 'Общая неустойка', unit: '₽' },
        { value: Number(debtWithPenalty.toFixed(2)), label: 'Долг + неустойка', unit: '₽' },
        { value: Number(annualRate.toFixed(2)), label: 'Годовой эквивалент', unit: '%' }
    ];
},
  'nod-i-nok': (inputs) => {
    let a = Math.abs(Number(inputs.a));
    let b = Math.abs(Number(inputs.b));
    const gcd = (x: number, y: number): number => {
        while (y !== 0) {
            const temp = y;
            y = x % y;
            x = temp;
        }
        return x;
    };
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
        if (num > 1)
            factors.push(num);
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
}
