import type { ComputeFn } from './compute-helpers';

export const computeMap_science_science_b_2: Record<string, ComputeFn> = {
  'prostye-chisla': (inputs) => {
    const n = Math.floor(Number(inputs.number));
    const action = String(inputs.action);
    const isPrime = (num: number): boolean => {
        if (num < 2)
            return false;
        if (num === 2)
            return true;
        if (num % 2 === 0)
            return false;
        for (let i = 3; i * i <= num; i += 2) {
            if (num % i === 0)
                return false;
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
        if (temp > 1)
            factors.push(temp);
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
  'pruzhina': (inputs) => {
    const _circuitType = String(inputs.springType);
    const d = Number(inputs.wireDiameter);
    const D = Number(inputs.meanDiameter);
    const n = Number(inputs.coilCount);
    const F = Number(inputs.load);
    const G = Number(inputs.shearModulus);
    if (!d || !D || !n) {
        return [{ value: 'Введите все параметры', label: 'Ошибка' }];
    }
    const C = D / d;
    // Жёсткость пружины сжатия/растяжения: k = (G * d⁴) / (8 * D³ * n)
    const k = (G * Math.pow(d, 4)) / (8 * Math.pow(D, 3) * n);
    const deflection = F ? F / k : 0;
    // Максимальное касательное напряжение (формула с поправкой)
    const K = (4 * C - 1) / (4 * C - 4) + 0.615 / C; // коэффициент Вала
    const tau = F ? (8 * F * D * K) / (Math.PI * Math.pow(d, 3)) : 0;
    return [
        { value: k.toFixed(2), label: 'Жёсткость пружины', unit: 'Н/мм' },
        { value: deflection.toFixed(2), label: 'Деформация', unit: 'мм' },
        { value: C.toFixed(2), label: 'Показатель пружины', unit: '' },
        { value: tau.toFixed(2), label: 'Макс. касательное напряжение', unit: 'МПа' }
    ];
},
  'rabota-i-moshchnost': (inputs) => {
    const force = Number(inputs.force);
    const distance = Number(inputs.distance);
    const time = Number(inputs.time);
    const angle = Number(inputs.angle);
    const work = force * distance * Math.cos(angle * Math.PI / 180);
    const power = work / time;
    const hp = power / 735.5;
    return [
        { value: Math.round(work), label: 'Работа (A = F × s × cos α)', unit: 'Дж' },
        { value: Math.round(power), label: 'Мощность (N = A / t)', unit: 'Вт' },
        { value: Math.round(hp * 100) / 100, label: 'Метрические л.с.', unit: 'л.с.' }
    ];
},
  'radioaktivnyj-raspad': (inputs) => {
    const N0 = Number(inputs.initialAmount);
    const T = Number(inputs.halfLife);
    const t = Number(inputs.time);
    const remaining = N0 * Math.pow(0.5, t / T);
    const decayed = N0 - remaining;
    const halfLives = t / T;
    return [
        { value: Math.round(remaining * 100) / 100, label: 'Оставшееся количество' },
        { value: Math.round(decayed * 100) / 100, label: 'Распавшееся количество' },
        { value: Math.round(halfLives * 10) / 10, label: 'Прошло полупериодов' }
    ];
},
  'rc-cepy': (inputs) => {
    const R = Number(inputs.resistance) * 1000; // to ohms
    const C = Number(inputs.capacitance) / 1000000; // to farads
    if (!R || !C) {
        return [{ value: '—', label: 'Результат' }];
    }
    const tau = R * C; // seconds
    const chargeTime = 5 * tau; // 99% charge
    const cutoffFreq = 1 / (2 * Math.PI * tau);
    return [
        { value: tau.toFixed(3), label: 'Постоянная времени τ', unit: 'сек' },
        { value: chargeTime.toFixed(2), label: 'Время заряда до 99%', unit: 'сек' },
        { value: cutoffFreq.toFixed(2), label: 'Частота среза', unit: 'Гц' }
    ];
},
  'remennaya-peredacha': (inputs) => {
    const d1 = Number(inputs.drivingPulley);
    const d2 = Number(inputs.drivenPulley);
    const a = Number(inputs.centerDistance);
    const n1 = Number(inputs.drivingRpm);
    if (!d1 || !d2 || !a) {
        return [{ value: 'Введите все размеры', label: 'Ошибка' }];
    }
    const ratio = d2 / d1;
    const n2 = n1 ? n1 / ratio : 0;
    // Длина ремня для открытой передачи: L = 2a + pi(d1+d2)/2 + (d2-d1)²/(4a)
    const beltLength = 2 * a + (Math.PI * (d1 + d2)) / 2 + Math.pow(d2 - d1, 2) / (4 * a);
    return [
        { value: ratio.toFixed(2), label: 'Передаточное отношение', unit: '' },
        { value: n2 ? Math.round(n2).toString() : '-', label: 'Частота ведомого', unit: 'об/мин' },
        { value: Math.round(beltLength).toString(), label: 'Длина ремня', unit: 'мм' }
    ];
},
  'reusable-items-calculator': (inputs): any => {
    const years = parseInt(String(inputs.period));
    const reusableBottles = Boolean(inputs.reusableBottles);
    const reusableBags = Boolean(inputs.reusableBags);
    const bottlesPerYear = reusableBottles ? 365 : 0;
    const bagsPerYear = reusableBags ? 300 : 0;
    const plasticBottlesSaved = bottlesPerYear * years;
    const plasticBagsSaved = bagsPerYear * years;
    const bottleCost = 30; // ₽
    const bagCost = 5; // ₽
    const moneySaved = (bottlesPerYear * bottleCost + bagsPerYear * bagCost) * years;
    const bottleWeight = 0.02; // кг
    const bagWeight = 0.005; // кг
    const wasteReduced = Math.round((plasticBottlesSaved * bottleWeight + plasticBagsSaved * bagWeight));
    return [
        { value: plasticBottlesSaved, label: 'Пластиковых бутылок сэкономлено', unit: 'шт' },
        { value: plasticBagsSaved, label: 'Пакетов сэкономлено', unit: 'шт' },
        { value: moneySaved, label: 'Денег сэкономлено', unit: '₽' },
        { value: wasteReduced, label: 'Отходов не создано', unit: 'кг' }
    ];
},
  'rezba': (inputs) => {
    const threadType = String(inputs.threadType);
    const threadData: Record<string, {
        pitch: number;
        major: number;
        minor: number;
        tap: number;
    }> = {
        'M6': { pitch: 1.0, major: 6.0, minor: 4.917, tap: 5.0 },
        'M8': { pitch: 1.25, major: 8.0, minor: 6.647, tap: 6.8 },
        'M10': { pitch: 1.5, major: 10.0, minor: 8.376, tap: 8.5 },
        'M12': { pitch: 1.75, major: 12.0, minor: 10.106, tap: 10.2 },
        'M16': { pitch: 2.0, major: 16.0, minor: 13.835, tap: 14.0 },
        'M20': { pitch: 2.5, major: 20.0, minor: 17.294, tap: 17.5 },
        'M24': { pitch: 3.0, major: 24.0, minor: 20.752, tap: 21.0 },
        '1/4-20': { pitch: 1.27, major: 6.35, minor: 4.98, tap: 5.1 },
        '3/8-16': { pitch: 1.587, major: 9.525, minor: 7.493, tap: 7.9 },
        '1/2-13': { pitch: 1.954, major: 12.7, minor: 10.21, tap: 10.5 },
        '1/4-28': { pitch: 0.907, major: 6.35, minor: 5.24, tap: 5.5 },
        '3/8-24': { pitch: 1.058, major: 9.525, minor: 8.024, tap: 8.3 }
    };
    const data = threadData[threadType];
    if (!data) {
        return [{ value: 'Неверный тип резьбы', label: 'Ошибка' }];
    }
    return [
        { value: data.major.toFixed(2), label: 'Номинальный диаметр', unit: 'мм' },
        { value: data.pitch.toFixed(3), label: 'Шаг резьбы', unit: 'мм' },
        { value: data.major.toFixed(2), label: 'Наружный диаметр', _circuitType: 'number', unit: 'мм' },
        { value: data.minor.toFixed(3), label: 'Внутренний диаметр', _circuitType: 'number', unit: 'мм' },
        { value: data.tap.toFixed(1), label: 'Сверло под резьбу', _circuitType: 'number', unit: 'мм' }
    ];
},
  'rimskie-cifry': (inputs) => {
    const mode = String(inputs.mode);
    if (mode === 'arabic_to_roman') {
        const num = Math.floor(Number(inputs.arabicNumber));
        if (!num || num < 1 || num > 3999) {
            return [{ value: '—', label: 'Результат', additionalInfo: 'Число должно быть от 1 до 3999' }];
        }
        const romanMap: Record<number, string> = {
            1000: 'M', 900: 'CM', 500: 'D', 400: 'CD',
            100: 'C', 90: 'XC', 50: 'L', 40: 'XL',
            10: 'X', 9: 'IX', 5: '_V', 4: 'IV', 1: 'I'
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
    }
    else {
        const roman = String(inputs.romanNumber).toUpperCase().trim();
        if (!roman) {
            return [{ value: '—', label: 'Результат' }];
        }
        const romanValues: Record<string, number> = {
            'I': 1, '_V': 5, 'X': 10, 'L': 50,
            'C': 100, 'D': 500, 'M': 1000
        };
        let result = 0;
        let prev = 0;
        for (let i = roman.length - 1; i >= 0; i--) {
            const current = romanValues[roman[i]] || 0;
            if (current < prev) {
                result -= current;
            }
            else {
                result += current;
                prev = current;
            }
        }
        return [{ value: `${roman} = ${result}`, label: 'Результат' }];
    }
},
  'roi-okupaemost': (inputs) => {
    const investment = Number(inputs.investment);
    const income = Number(inputs.income);
    const expenses = Number(inputs.expenses);
    const years = Number(inputs.years);
    const netAnnual = income - expenses;
    const netProfit = netAnnual * years;
    const totalReturn = netProfit;
    const roi = (netProfit / investment) * 100;
    let paybackText = '';
    if (netAnnual <= 0) {
        paybackText = 'Не окупается';
    }
    else {
        const paybackYears = investment / netAnnual;
        const fullYears = Math.floor(paybackYears);
        const months = Math.round((paybackYears - fullYears) * 12);
        paybackText = `${fullYears} лет ${months} мес`;
    }
    return [
        { value: Math.round(roi * 100) / 100, label: 'ROI (Return on Investment)', unit: '%' },
        { value: paybackText, label: 'Срок окупаемости' },
        { value: Math.round(netProfit), label: 'Чистая прибыль за период', unit: '₽' },
        { value: Math.round(totalReturn), label: 'Возврат инвестиций', unit: '₽' }
    ];
},
  'sistemy-schisleniya': (inputs) => {
    const number = String(inputs.number);
    const fromBase = parseInt(String(inputs.fromBase), 10);
    try {
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
    }
    catch {
        return [
            { value: 'Ошибка ввода', label: 'Ошибка' },
            { value: 'Ошибка ввода', label: 'Ошибка' },
            { value: 'Ошибка ввода', label: 'Ошибка' },
            { value: 'Ошибка ввода', label: 'Ошибка' }
        ];
    }
},
  'skorost-zvuka': (inputs) => {
    const temp = Number(inputs.temperature);
    const medium = String(inputs.medium);
    let speed = 0;
    switch (medium) {
        case 'air':
            speed = 331.3 + 0.606 * temp;
            break;
        case 'water':
            speed = 1402.7 + 4.8 * temp;
            break;
        case 'steel':
            speed = 5000 + 0.5 * temp;
            break;
        case 'wood':
            speed = 3300 + 0.3 * temp;
            break;
    }
    return [{ value: Math.round(speed), label: 'Скорость звука', unit: 'м/с' }];
},
  'sloznye-procenty': (inputs) => {
    // Alias for slozhnye-procenty (transliteration fix)
    const P = Number(inputs.P) || 0;
    const n = Number(inputs.n) || 0;
    const r = Number(inputs.r) || 0;
    const result = P * Math.pow(1 + r / 100, n);
    const diff = result - P;
    return [
      { value: result.toFixed(2), label: 'Итоговая сумма', unit: '' },
      { value: diff.toFixed(2), label: 'Прибыль/прирост', unit: '' },
    ];
  },
  'vycest-procent': (inputs) => {
    // Subtract percent from number
    const value = Number(inputs.value) || 0;
    const percent = Number(inputs.percent) || 0;
    const result = value - (value * percent / 100);
    const deducted = value * percent / 100;
    return [
      { value: result.toFixed(2), label: 'Результат', unit: '' },
      { value: deducted.toFixed(2), label: 'Вычтено', unit: '' },
    ];
  },
  'slozhnye-procenty': (inputs) => {
    const principal = Number(inputs.principal);
    const rate = Number(inputs.rate) / 100;
    const years = Number(inputs.years);
    const monthlyContribution = Number(inputs.monthlyContribution || 0);
    const compoundFreq = Number(inputs.compoundFrequency);
    const totalPeriods = years * compoundFreq;
    const periodRate = rate / compoundFreq;
    const fvPrincipal = principal * Math.pow(1 + periodRate, totalPeriods);
    let fvContributions = 0;
    if (monthlyContribution > 0) {
        const contributionPerPeriod = monthlyContribution * (12 / compoundFreq);
        fvContributions = contributionPerPeriod * (Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate;
    }
    const finalAmount = fvPrincipal + fvContributions;
    const totalContributions = principal + (monthlyContribution * years * 12);
    const interestEarned = finalAmount - totalContributions;
    const growthPercent = (interestEarned / totalContributions) * 100;
    return [
        { value: Math.round(finalAmount * 100) / 100, label: 'Итоговая сумма', unit: '₽' },
        { value: Math.round(totalContributions * 100) / 100, label: 'Всего вложено', unit: '₽' },
        { value: Math.round(interestEarned * 100) / 100, label: 'Доход от процентов', unit: '₽' },
        { value: Math.round(growthPercent * 100) / 100, label: 'Доходность', unit: '%' },
    ];
},
  'solar-calculator': (inputs): any => {
    const monthlyBill = Number(inputs.monthlyBill);
    const tariff = Number(inputs.tariff);
    const sunHours = Number(inputs.sunHours);
    const monthlyKwh = monthlyBill / tariff;
    const systemSize = Math.ceil(monthlyKwh / 30 / sunHours);
    const panelsNeeded = Math.ceil(systemSize * 1000 / 550); // панель ~550 Вт
    const annualGeneration = Math.round(systemSize * sunHours * 365 * 0.75); // КПД ~75%
    const costPerWatt = 60; // ~60₽/Вт
    const totalCost = Math.round(systemSize * 1000 * costPerWatt);
    const annualSavings = annualGeneration * tariff;
    const paybackYears = Math.round(totalCost / annualSavings * 10) / 10;
    return [
        { value: systemSize, label: 'Мощность станции', unit: 'кВт' },
        { value: panelsNeeded, label: 'Количество панелей', unit: 'шт' },
        { value: annualGeneration, label: 'Годовая выработка', unit: 'кВт⋅ч' },
        { value: totalCost, label: 'Стоимость установки', unit: '₽' },
        { value: paybackYears, label: 'Окупаемость', unit: 'лет' }
    ];
},
  'soprotivlenie-provodnika': (inputs) => {
    const resistivity = Number(inputs.material);
    const length = Number(inputs.length);
    const crossSection = Number(inputs.crossSection);
    if (!length || !crossSection) {
        return [{ value: '—', label: 'Результат' }];
    }
    const resistance = (resistivity * length) / crossSection;
    const powerLoss = 10 * 10 * resistance; // At 10A current
    return [
        { value: resistance.toFixed(3), label: 'Сопротивление', unit: 'Ом' },
        { value: powerLoss.toFixed(2), label: 'Потери мощности (при 10А)', unit: 'Вт' }
    ];
},
}
