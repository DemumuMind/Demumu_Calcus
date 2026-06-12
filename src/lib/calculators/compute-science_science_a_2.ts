import type { ComputeFn } from './compute-helpers';

export const computeMap_science_science_a_2: Record<string, ComputeFn> = {
  'effekt-doplera': (inputs) => {
    const f0 = Number(inputs.sourceFreq);
    const vs = Number(inputs.sourceSpeed);
    const vo = Number(inputs.observerSpeed);
    const v = Number(inputs.soundSpeed);
    const f = f0 * (v + vo) / (v - vs);
    return [{ value: Math.round(f * 10) / 10, label: 'Наблюдаемая частота', unit: 'Гц' }];
},
  'electric-car-savings': (inputs): any => {
    const monthlyKm = Number(inputs.monthlyKm);
    const fuelConsumption = Number(inputs.fuelConsumption);
    const fuelPrice = Number(inputs.fuelPrice);
    const electricityPrice = Number(inputs.electricityPrice);
    const fuelCost = (monthlyKm / 100) * fuelConsumption * fuelPrice;
    const evConsumption = 0.18; // ~18 кВт⋅ч/100км
    const electricityCost = (monthlyKm / 100) * evConsumption * electricityPrice;
    const monthlySavings = Math.round(fuelCost - electricityCost);
    const annualSavings = monthlySavings * 12;
    const co2Savings = Math.round(monthlyKm * 12 * 0.12); // ~120г CO2/км для бензина
    return [
        { value: Math.round(fuelCost), label: 'Расходы на бензин', unit: '₽/мес' },
        { value: Math.round(electricityCost), label: 'Расходы на электричество', unit: '₽/мес' },
        { value: monthlySavings, label: 'Экономия в месяц', unit: '₽' },
        { value: annualSavings, label: 'Экономия в год', unit: '₽' },
        { value: co2Savings, label: 'Снижение CO₂', unit: 'кг/год' }
    ];
},
  'energy-efficiency-calculator': (inputs): any => {
    const bulbsCount = Number(inputs.bulbsCount);
    const hoursPerDay = Number(inputs.hoursPerDay);
    const tariff = Number(inputs.tariff);
    const ledUpgrade = Boolean(inputs.ledUpgrade);
    const incandescentPower = 0.06; // 60W
    const ledPower = 0.009; // 9W
    const currentMonthly = bulbsCount * incandescentPower * hoursPerDay * 30 * tariff;
    const ledMonthly = bulbsCount * ledPower * hoursPerDay * 30 * tariff;
    const monthlySavings = ledUpgrade ? Math.round(currentMonthly - ledMonthly) : 0;
    const annualSavings = monthlySavings * 12;
    const co2Reduction = Math.round(monthlySavings * 12 * 0.5); // ~0.5 кг CO2 на кВт⋅ч
    return [
        { value: Math.round(currentMonthly), label: 'Текущие расходы', unit: '₽/мес' },
        { value: Math.round(ledMonthly), label: 'С LED лампами', unit: '₽/мес' },
        { value: monthlySavings, label: 'Экономия в месяц', unit: '₽' },
        { value: annualSavings, label: 'Экономия в год', unit: '₽' },
        { value: co2Reduction, label: 'Снижение CO₂', unit: 'кг/год' }
    ];
},
  'faktorial': (inputs) => {
    const n = Math.floor(Number(inputs.n));
    const type = String(inputs.type);
    if (n < 0)
        return [{ value: 'Ошибка: n должно быть ≥ 0', label: 'Ошибка' }];
    let result = 1;
    if (type === 'single') {
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
    }
    else {
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
  'garden-water-calculator': (inputs): any => {
    const gardenArea = Number(inputs.gardenArea);
    const plantType = String(inputs.plantType);
    const soilType = String(inputs.soilType);
    const climate = String(inputs.climate);
    const baseNeeds: Record<string, number> = {
        vegetables: 2,
        flowers: 1.5,
        lawn: 2.5,
        shrubs: 1.5
    };
    const soilMultipliers: Record<string, number> = {
        sandy: 1.5,
        loamy: 1,
        clay: 0.7
    };
    const climateMultipliers: Record<string, number> = {
        humid: 0.7,
        moderate: 1,
        dry: 1.5
    };
    const dailyWater = Math.round(gardenArea * baseNeeds[plantType] * soilMultipliers[soilType] * climateMultipliers[climate]);
    const weeklyWater = dailyWater * 7;
    const monthlyWater = Math.round(weeklyWater * 4 / 1000);
    const rainwaterNeeded = Math.round(weeklyWater * 2); // запас на 2 недели
    return [
        { value: dailyWater, label: 'Воды в день', unit: 'л' },
        { value: weeklyWater, label: 'Воды в неделю', unit: 'л' },
        { value: monthlyWater, label: 'Воды в месяц', unit: 'м³' },
        { value: rainwaterNeeded, label: 'Ёмкость для дождевой воды', unit: 'л' }
    ];
},
  'gidrostaticheskoe-davlenie': (inputs) => {
    const h = Number(inputs.depth);
    const rho = Number(inputs.density);
    const g = 9.81;
    const P0 = inputs.atmospheric === 'yes' ? 101325 : 0;
    const pressure = rho * g * h + P0;
    const pressureAtm = pressure / 101325;
    return [
        { value: Math.round(pressure), label: 'Давление', unit: 'Па' },
        { value: Math.round(pressureAtm * 100) / 100, label: 'Давление', unit: 'атм' }
    ];
},
  'gpa-kalkulyator': (inputs): any => {
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
    const average100 = grades.reduce((sum, g) => sum + g.grade, 0) / grades.length;
    const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);
    const weightedSum = grades.reduce((sum, g) => sum + g.grade * g.credits, 0);
    const weighted = weightedSum / totalCredits;
    // 90-100 = 4.0, 80-89 = 3.0, 70-79 = 2.0, 60-69 = 1.0, <60 = 0
    let gpa40 = 0;
    if (weighted >= 90)
        gpa40 = 4.0;
    else if (weighted >= 80)
        gpa40 = 3.0 + (weighted - 80) / 10;
    else if (weighted >= 70)
        gpa40 = 2.0 + (weighted - 70) / 10;
    else if (weighted >= 60)
        gpa40 = 1.0 + (weighted - 60) / 10;
    else
        gpa40 = weighted / 60;
    const gpa50 = Math.min(5.0, gpa40 * 1.25);
    let letterGrade = '';
    if (weighted >= 90)
        letterGrade = 'A (Отлично)';
    else if (weighted >= 80)
        letterGrade = 'B (Хорошо)';
    else if (weighted >= 70)
        letterGrade = 'C (Удовлетворительно)';
    else if (weighted >= 60)
        letterGrade = 'D (Ниже среднего)';
    else
        letterGrade = 'F (Неудовлетворительно)';
    return [
        { value: Math.round(average100 * 10) / 10, label: 'Средний балл (100)', unit: '%' },
        { value: Math.round(gpa40 * 100) / 100, label: 'GPA (4.0 шкала)' },
        { value: Math.round(gpa50 * 100) / 100, label: 'GPA (5.0 шкала)' },
        { value: Math.round(weighted * 10) / 10, label: 'Взвешенный средний', unit: '%' },
        { value: totalCredits, label: 'Всего кредитов', unit: '' },
        { value: letterGrade, label: 'Буквенная оценка' }
    ];
},
  'impuls-sily': (inputs) => {
    const m1 = Number(inputs.m1);
    const v1 = Number(inputs.v1);
    const m2 = Number(inputs.m2);
    const v2 = Number(inputs.v2);
    const p1 = m1 * v1;
    const p2 = m2 * v2;
    const pTotal = p1 + p2;
    const vAfter = pTotal / (m1 + m2);
    return [
        { value: Math.round(p1 * 100) / 100, label: 'p₁ = m₁ × v₁', unit: 'кг⋅м/с' },
        { value: Math.round(p2 * 100) / 100, label: 'p₂ = m₂ × v₂', unit: 'кг⋅м/с' },
        { value: Math.round(pTotal * 100) / 100, label: 'p₁ + p₂', unit: 'кг⋅м/с' },
        { value: Math.round(vAfter * 100) / 100, label: 'Скорость после неупругого соударения', unit: 'м/с' }
    ];
},
  'inflyaciya': (inputs) => {
    const amount = Number(inputs.currentAmount);
    const rate = Number(inputs.inflationRate) / 100;
    const years = Number(inputs.years);
    const futureValue = amount / Math.pow(1 + rate, years);
    const presentValue = futureValue;
    const purchasingPowerLoss = ((amount - futureValue) / amount) * 100;
    const requiredReturn = rate * 100;
    return [
        { value: Math.round(futureValue * 100) / 100, label: 'Будущая стоимость', unit: '₽' },
        { value: Math.round(presentValue * 100) / 100, label: 'Покупательная способность сегодня', unit: '₽' },
        { value: Math.round(purchasingPowerLoss * 100) / 100, label: 'Потеря покупательной способности', unit: '%' },
        { value: Math.round(requiredReturn * 100) / 100, label: 'Необходимая доходность', unit: '%' },
    ];
},
  'intervalnoe-povtorenie': (inputs): any => {
    const n = inputs as Record<string, number>;
    const items = Number(inputs.itemsCount || 100);
    const difficulty = String(inputs.difficulty || 'medium');
    const days = Number(inputs.daysUntilTest || 30);
    const newPerDay = Math.ceil(items / days);
    const intervals: Record<string, number[]> = {
        easy: [1, 3, 7, 14],
        medium: [1, 2, 4, 8],
        hard: [1, 1, 3, 5]
    };
    const interval = intervals[difficulty];
    let totalReviews = 0;
    for (let i = 1; i <= days; i++) {
        let dueToday = 0;
        for (let j = 1; j <= Math.min(i, items / newPerDay); j++) {
            const itemDay = j; // day when item was first learned
            const daysSinceLearned = i - itemDay;
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
    }
    else if (difficulty === 'hard') {
        method = 'Частое повторение в начале: 1-1-3-5 дней. Сложный материал требует больше повторений на старте.';
    }
    else {
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
  'inzhenernyj-kalkulyator': () => [],
  'ipotchnyj-kalkulyator': (inputs) => {
    const propertyValue = Number(inputs.propertyValue);
    const downPayment = Number(inputs.downPayment);
    const interestRate = Number(inputs.interestRate);
    const loanTerm = Number(inputs.loanTerm);
    const paymentType = String(inputs.paymentType);
    if (!propertyValue || !interestRate || !loanTerm || propertyValue <= downPayment) {
        return [
            { value: '—', label: 'Сумма кредита' },
            { value: '—', label: 'Ежемесячный платёж' },
            { value: '—', label: 'Общая сумма выплат' },
            { value: 'Введите корректные данные', label: 'Переплата по процентам' }
        ];
    }
    const loanAmount = propertyValue - downPayment;
    const monthlyRate = interestRate / 100 / 12; // Месячная ставка
    const numberOfPayments = loanTerm * 12; // Количество месяцев
    let monthlyPayment: number;
    let totalPayment: number;
    let totalInterest: number;
    if (paymentType === 'annuity') {
        // Формула: П = С × [i × (1 + i)^n] / [(1 + i)^n − 1]
        const annuityFactor = (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        monthlyPayment = loanAmount * annuityFactor;
        totalPayment = monthlyPayment * numberOfPayments;
        totalInterest = totalPayment - loanAmount;
    }
    else {
        const principalPayment = loanAmount / numberOfPayments;
        const firstMonthInterest = loanAmount * monthlyRate;
        const firstMonthPayment = principalPayment + firstMonthInterest;
        const lastMonthInterest = principalPayment * monthlyRate;
        const lastMonthPayment = principalPayment + lastMonthInterest;
        monthlyPayment = (firstMonthPayment + lastMonthPayment) / 2;
        totalInterest = (loanAmount * monthlyRate * (numberOfPayments + 1)) / 2;
        totalPayment = loanAmount + totalInterest;
    }
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0
        }).format(amount);
    };
    return [
        {
            value: formatCurrency(loanAmount),
            label: 'Сумма кредита'
        },
        {
            value: paymentType === 'differentiated'
                ? `${formatCurrency(loanAmount / numberOfPayments + loanAmount * monthlyRate)} — ${formatCurrency(loanAmount / numberOfPayments + (loanAmount / numberOfPayments) * monthlyRate)}`
                : formatCurrency(monthlyPayment),
            label: 'Ежемесячный платёж',
            description: paymentType === 'differentiated'
                ? 'От первого к последнему платежу'
                : 'Равные платежи на протяжении всего срока'
        },
        {
            value: formatCurrency(totalPayment),
            label: 'Общая сумма выплат'
        },
        {
            value: formatCurrency(totalInterest),
            label: 'Переплата по процентам',
            className: 'text-red-600'
        }
    ];
},
  'ipotechnyj-kalkulyator': (inputs) => {
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
        { value: Math.round(totalPayment * 100) / 100, label: 'Общая сумма платежей', unit: '₽' },
        { value: Math.round(totalInterest * 100) / 100, label: 'Переплата по процентам', unit: '₽' },
        { value: Math.round(downPaymentPercent * 100) / 100, label: 'Доля первого взноса', unit: '%' },
    ];
},
  'kalkulyator-drobej': (inputs) => {
    const firstNum = Number(inputs.num1);
    const den1 = Number(inputs.den1);
    const secondNum = Number(inputs.num2);
    const den2 = Number(inputs.den2);
    const operation = String(inputs.operation);
    if (!den1 || !den2) {
        return [{ value: 'Знаменатель не может быть 0', label: 'Ошибка' }];
    }
    let resultNum = 0;
    let resultDen = 1;
    switch (operation) {
        case 'add':
            resultNum = firstNum * den2 + secondNum * den1;
            resultDen = den1 * den2;
            break;
        case 'subtract':
            resultNum = firstNum * den2 - secondNum * den1;
            resultDen = den1 * den2;
            break;
        case 'multiply':
            resultNum = firstNum * secondNum;
            resultDen = den1 * den2;
            break;
        case 'divide':
            resultNum = firstNum * den2;
            resultDen = den1 * secondNum;
            break;
    }
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
}
