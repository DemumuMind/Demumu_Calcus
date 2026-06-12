import type { ComputeFn } from './compute-helpers';

export const computeMap_science_science_a_1: Record<string, ComputeFn> = {
  'arenda-ili-pokupka': (inputs) => {
    const monthlyRent = Number(inputs.monthlyRent);
    const rentGrowth = Number(inputs.rentGrowth) / 100;
    const propertyPrice = Number(inputs.propertyPrice);
    const propertyGrowth = Number(inputs.propertyGrowth) / 100;
    const investmentReturn = Number(inputs.investmentReturn) / 100;
    const years = Number(inputs.years);
    let totalRentPaid = 0;
    let currentRent = monthlyRent;
    for (let i = 0; i < years; i++) {
        totalRentPaid += currentRent * 12;
        currentRent *= (1 + rentGrowth);
    }
    const propertyValueFuture = propertyPrice * Math.pow(1 + propertyGrowth, years);
    const investmentValue = propertyPrice * Math.pow(1 + investmentReturn, years);
    const buyNetWorth = propertyValueFuture;
    const rentNetWorth = Math.max(0, investmentValue - totalRentPaid);
    const winner = buyNetWorth > rentNetWorth ? 'Покупка' : 'Аренда';
    return [
        { value: Math.round(totalRentPaid * 100) / 100, label: 'Всего потрачено на аренду', unit: '₽' },
        { value: Math.round(propertyValueFuture * 100) / 100, label: 'Будущая стоимость квартиры', unit: '₽' },
        { value: Math.round(investmentValue * 100) / 100, label: 'Стоимость инвестиций при аренде', unit: '₽' },
        { value: Math.round(buyNetWorth * 100) / 100, label: 'Чистая стоимость при покупке', unit: '₽' },
        { value: Math.round(rentNetWorth * 100) / 100, label: 'Чистая стоимость при аренде', unit: '₽' },
        { value: winner, label: 'Выгоднее', unit: '' },
    ];
},
  'bitovye-operacii': (inputs) => {
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
        if (n < 0)
            return (n >>> 0).toString(2).padStart(32, '0');
        return n.toString(2).padStart(8, '0');
    };
    return [
        { value: `${result} (0b${toBinary(result)})`, label: 'Результат' },
        { value: `${a} = 0b${toBinary(a)}`, label: 'Число A' },
        { value: `${b} = 0b${toBinary(b)}`, label: 'Число B' }
    ];
},
  'carbon-footprint-calculator': (inputs): any => {
    const carKm = Number(inputs.carKm);
    const electricity = Number(inputs.electricity);
    const flights = Number(inputs.flights);
    const meatConsumption = String(inputs.meatConsumption);
    const carEmission = carKm * 0.00012; // ~120г CO2/км
    const electricityEmission = electricity * 12 * 0.0005; // ~500г/кВт⋅ч
    const flightEmission = flights * 1.5; // средний перелёт
    const dietEmissions: Record<string, number> = {
        vegan: 1,
        vegetarian: 1.5,
        low: 2,
        medium: 2.5,
        high: 3.5
    };
    const transport = carEmission + flightEmission;
    const home = electricityEmission;
    const diet = dietEmissions[meatConsumption];
    const totalFootprint = transport + home + diet;
    const comparison = Math.round((totalFootprint / 5) * 100); // средний след ~5 тонн
    return [
        { value: Math.round(totalFootprint * 10) / 10, label: 'Годовой углеродный след', unit: 'тонн CO₂' },
        { value: Math.round(transport * 10) / 10, label: 'Транспорт', unit: 'тонн CO₂' },
        { value: Math.round(home * 10) / 10, label: 'Дом', unit: 'тонн CO₂' },
        { value: Math.round(diet * 10) / 10, label: 'Питание', unit: 'тонн CO₂' },
        { value: comparison, label: 'Относительно среднего', unit: '%' }
    ];
},
  'cel-nakopleniya': (inputs) => {
    const goal = Number(inputs.goalAmount);
    const current = Number(inputs.currentSavings);
    const months = Number(inputs.months);
    const rate = Number(inputs.interestRate || 0) / 100;
    const monthlyRate = rate / 12;
    const amountNeeded = goal - current;
    let monthlySavings;
    if (rate === 0) {
        monthlySavings = amountNeeded / months;
    }
    else {
        monthlySavings = amountNeeded * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
    }
    const totalSaved = current + monthlySavings * months;
    const interestEarned = totalSaved - goal;
    const percentOfGoal = (current / goal) * 100;
    return [
        { value: Math.round(monthlySavings * 100) / 100, label: 'Необходимо откладывать в месяц', unit: '₽' },
        { value: Math.round(totalSaved * 100) / 100, label: 'Итого накоплено', unit: '₽' },
        { value: Math.round(interestEarned * 100) / 100, label: 'Проценты', unit: '₽' },
        { value: Math.round(percentOfGoal * 100) / 100, label: 'Прогресс', unit: '%' },
    ];
},
  'centrostremitelnaya-sila': (inputs) => {
    const m = Number(inputs.mass);
    const v = Number(inputs.velocity);
    const r = Number(inputs.radius);
    if (r === 0)
        return [{ value: '—', label: 'Центростремительная сила', unit: '' }, { value: '—', label: 'Ускорение', unit: '' }];
    const F = m * v * v / r;
    const a = v * v / r;
    return [
        { value: Math.round(F * 100) / 100, label: 'Центростремительная сила', unit: 'Н' },
        { value: Math.round(a * 100) / 100, label: 'Ускорение', unit: 'м/с²' }
    ];
},
  'chisla-fibonachchi': (inputs) => {
    const n = Math.floor(Number(inputs.n));
    const showSeq = String(inputs.showSequence) === 'yes';
    if (n === 0) {
        return [
            { value: 0, label: 'F(0)' },
            { value: '—', label: 'Золотое сечение' },
            { value: '0', label: 'Ряд' }
        ];
    }
    let a = 0;
    let b = 1;
    const sequence: number[] = [0, 1];
    for (let i = 2; i <= Math.min(n, 50); i++) { // Limit to 50 to avoid overflow
        const temp = a + b;
        a = b;
        b = temp;
        if (i <= 20)
            sequence.push(temp);
    }
    let fn: number;
    if (n <= 50) {
        fn = n === 0 ? 0 : n === 1 ? 1 : b;
    }
    else {
        const phi = (1 + Math.sqrt(5)) / 2;
        fn = Math.round(Math.pow(phi, n) / Math.sqrt(5));
    }
    const fnMinus1 = n === 1 ? 1 : a;
    const ratio = Number(fn) / Number(fnMinus1);
    return [
        { value: fn.toString(), label: `F(${n})` },
        { value: fnMinus1 > 0 ? ratio.toFixed(6) : '—', label: 'Приближение φ (золотое сечение)' },
        { value: showSeq ? (n > 20 ? sequence.slice(0, 21).join(', ') + '...' : sequence.join(', ')) : '(не показано)', label: n > 20 ? 'Первые 20 чисел' : 'Ряд Фибоначчи' }
    ];
},
  'compost-calculator': (inputs): any => {
    const foodWaste = Number(inputs.foodWaste);
    const yardWaste = Number(inputs.yardWaste);
    const compostMethod = String(inputs.compostMethod);
    const yearlyInput = foodWaste * 52 + yardWaste * 12;
    const efficiencyRates: Record<string, number> = {
        pile: 0.2,
        bin: 0.25,
        tumbler: 0.3,
        vermicompost: 0.35
    };
    const compostYield = Math.round(yearlyInput * efficiencyRates[compostMethod]);
    const fertilizerValue = Math.round(compostYield * 50); // ~50₽ за кг готового компоста
    const landfillDiverted = Math.round(yearlyInput);
    const readyTimes: Record<string, number> = {
        pile: 12,
        bin: 8,
        tumbler: 4,
        vermicompost: 3
    };
    return [
        { value: yearlyInput, label: 'Входящий материал', unit: 'кг/год' },
        { value: compostYield, label: 'Выход компоста', unit: 'кг/год' },
        { value: fertilizerValue, label: 'Эквивалент удобрений', unit: '₽' },
        { value: landfillDiverted, label: 'Не попало на свалку', unit: 'кг/год' },
        { value: readyTimes[compostMethod], label: 'Время созревания', unit: 'мес' }
    ];
},
  'davlenie': (inputs) => {
    const mode = String(inputs.mode);
    const v1 = Number(inputs.value1);
    const v2 = Number(inputs.value2);
    const v3 = Number(inputs.value3);
    const g = 9.81;
    let result = 0;
    let label = '';
    let unit = '';
    switch (mode) {
        case 'pressure':
            result = v1 / v2; // F / A
            label = 'Давление';
            unit = 'Па';
            break;
        case 'hydrostatic':
            result = v3 * g * v1; // ρ * g * h
            label = 'Гидростатическое давление';
            unit = 'Па';
            break;
        case 'buoyancy':
            result = v3 * g * v1; // ρ * g * V
            label = 'Сила Архимеда';
            unit = 'Н';
            break;
    }
    let displayValue = '';
    if (unit === 'Па') {
        if (result >= 101325) {
            displayValue = `${(result / 101325).toFixed(4)} атм`;
        }
        else if (result >= 1000) {
            displayValue = `${(result / 1000).toFixed(2)} кПа`;
        }
        else {
            displayValue = `${result.toFixed(2)} Па`;
        }
    }
    else {
        displayValue = `${result.toFixed(2)} ${unit}`;
    }
    return [{ value: displayValue, label }];
},
  'depozitnyj-kalkulyator': (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate) / 100;
    const term = Number(inputs.term);
    const cap = String(inputs.capitalization);
    let final = amount;
    let periods = 1;
    let periodRate = rate;
    switch (cap) {
        case 'monthly':
            periods = term;
            periodRate = rate / 12;
            break;
        case 'quarterly':
            periods = Math.floor(term / 3);
            periodRate = rate / 4;
            break;
        case 'yearly':
            periods = Math.floor(term / 12);
            periodRate = rate;
            break;
        case 'none':
            periods = 1;
            periodRate = rate * (term / 12);
            break;
    }
    if (cap === 'none') {
        final = amount + amount * periodRate;
    }
    else {
        final = amount * Math.pow(1 + periodRate, periods);
    }
    const income = final - amount;
    const effectiveRate = (Math.pow(final / amount, 12 / term) - 1) * 100;
    return [
        { value: Math.round(final), label: 'Сумма в конце срока', unit: '₽' },
        { value: Math.round(income), label: 'Заработанные проценты', unit: '₽' },
        { value: Math.round(effectiveRate * 100) / 100, label: 'Эффективная ставка годовых', unit: '%' }
    ];
},
  'dlina-volny': (inputs) => {
    const speed = Number(inputs.speed);
    const freq = Number(inputs.frequency);
    const known = String(inputs.known);
    let wavelength = 0;
    let frequency = 0;
    if (known === 'wavelength') {
        wavelength = speed / freq;
        frequency = freq;
    }
    else {
        frequency = speed / freq; // in this case freq input is actually wavelength
        wavelength = freq;
    }
    const period = 1 / frequency;
    let wlText = '';
    if (wavelength >= 1000) {
        wlText = `${(wavelength / 1000).toFixed(3)} км`;
    }
    else if (wavelength >= 1) {
        wlText = `${wavelength.toFixed(3)} м`;
    }
    else if (wavelength >= 0.001) {
        wlText = `${(wavelength * 1000).toFixed(3)} мм`;
    }
    else if (wavelength >= 1e-6) {
        wlText = `${(wavelength * 1e6).toFixed(3)} мкм`;
    }
    else {
        wlText = `${(wavelength * 1e9).toFixed(3)} нм`;
    }
    let freqText = '';
    if (frequency >= 1e9) {
        freqText = `${(frequency / 1e9).toFixed(3)} ГГц`;
    }
    else if (frequency >= 1e6) {
        freqText = `${(frequency / 1e6).toFixed(3)} МГц`;
    }
    else if (frequency >= 1000) {
        freqText = `${(frequency / 1000).toFixed(3)} кГц`;
    }
    else {
        freqText = `${frequency.toFixed(3)} Гц`;
    }
    return [
        { value: wlText, label: 'Длина волны (λ)' },
        { value: freqText, label: 'Частота (f)' },
        { value: period >= 1 ? `${period.toFixed(3)} с` : period >= 0.001 ? `${(period * 1000).toFixed(3)} мс` : `${(period * 1e6).toFixed(3)} мкс`, label: 'Период (T = 1/f)' }
    ];
},
  'dohodnost-investicij': (inputs) => {
    const initial = Number(inputs.initialInvestment);
    const final = Number(inputs.finalValue);
    const dividends = Number(inputs.dividends || 0);
    const fees = Number(inputs.fees || 0);
    const years = Number(inputs.years);
    const totalReturn = final - initial + dividends - fees;
    const roiPercent = (totalReturn / initial) * 100;
    const annualizedReturn = (Math.pow((final + dividends - fees) / initial, 1 / years) - 1) * 100;
    return [
        { value: Math.round(totalReturn * 100) / 100, label: 'Абсолютный доход', unit: '₽' },
        { value: Math.round(roiPercent * 100) / 100, label: 'ROI', unit: '%' },
        { value: Math.round(annualizedReturn * 100) / 100, label: 'Годовая доходность', unit: '%' },
        { value: Math.round(totalReturn * 100) / 100, label: 'Чистая прибыль', unit: '₽' },
    ];
},
  'e-mc-kvadrat': (inputs) => {
    const mass = Number(inputs.mass);
    const unit = String(inputs.unit);
    const c = 299792458;
    const energyJoules = mass * c * c;
    let result = 0;
    let unitLabel = '';
    switch (unit) {
        case 'joules':
            result = energyJoules;
            unitLabel = 'Дж';
            break;
        case 'kwh':
            result = energyJoules / 3600000;
            unitLabel = 'кВт·ч';
            break;
        case 'tons':
            result = energyJoules / 4184000000;
            unitLabel = 'тонн ТНТ';
            break;
    }
    return [{ value: Math.round(result * 100) / 100, label: 'Энергия', unit: unitLabel }];
},
  'eco-score-calculator': (inputs): any => {
    const transportScore = parseInt(String(inputs.transportScore));
    const dietScore = parseInt(String(inputs.dietScore));
    const wasteScore = parseInt(String(inputs.wasteScore));
    const energyScore = parseInt(String(inputs.energyScore));
    const consumptionScore = parseInt(String(inputs.consumptionScore));
    const totalScore = transportScore + dietScore + wasteScore + energyScore + consumptionScore;
    const percentage = Math.round((totalScore / 15) * 100);
    let rating;
    let improvements;
    if (totalScore >= 12) {
        rating = 'Эко-герой 🌿';
        improvements = 'Отличный результат! Продолжайте в том же духе.';
    }
    else if (totalScore >= 8) {
        rating = 'Эко-друг 🌱';
        improvements = 'Хорошо! Есть куда расти в транспорте и энергосбережении.';
    }
    else if (totalScore >= 4) {
        rating = 'Эко-новичок 🌾';
        improvements = 'Начните с сортировки мусора и замены ламп на LED.';
    }
    else {
        rating = 'Требуется улучшение 🍂';
        improvements = 'Попробуйте сократить мясо, использовать общественный транспорт, сортировать мусор.';
    }
    return [
        { value: totalScore, label: 'Общий эко-рейтинг', unit: '/15' },
        { value: percentage, label: 'Процент экологичности', unit: '%' },
        { value: rating, label: 'Оценка', unit: '' },
        { value: improvements, label: 'Рекомендации', unit: '' }
    ];
},
}
