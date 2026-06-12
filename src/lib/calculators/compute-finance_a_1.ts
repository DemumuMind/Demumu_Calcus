import type { ComputeFn } from './compute-helpers';

export const computeMap_finance_a_1: Record<string, ComputeFn> = {
  'abc-analiz': (inputs) => {
    const totalRevenue = Number(inputs.totalRevenue);
    const itemRevenue = Number(inputs.itemRevenue);
    const cumulativePercent = Number(inputs.cumulativePercent);
    if (!totalRevenue || !itemRevenue) {
        return [
            { value: '—', label: 'Доля позиции (%)' },
            { value: '—', label: 'Категория ABC' },
            { value: '', label: 'Рекомендация' }
        ];
    }
    const itemPercent = (itemRevenue / totalRevenue) * 100;
    // ABC classification based on cumulative percentage
    let category = '';
    let _recommendation = '';
    if (cumulativePercent <= 80) {
        category = 'A - Основной ассортимент';
        _recommendation = 'Приоритетное управление, постоянный контроль запасов';
    }
    else if (cumulativePercent <= 95) {
        category = 'B - Средний ассортимент';
        _recommendation = 'Стандартное управление, периодический анализ';
    }
    else {
        category = 'C - Малый ассортимент';
        _recommendation = 'Минимальные запасы, рассмотреть исключение';
    }
    return [
        { value: Math.round(itemPercent * 10) / 10, label: 'Доля позиции (%)' },
        { value: category, label: 'Категория ABC' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
  'cac-stoimost': (inputs) => {
    const marketingSpend = Number(inputs.marketingSpend);
    const salesSpend = Number(inputs.salesSpend);
    const newCustomers = Number(inputs.newCustomers);
    const avgOrderValue = Number(inputs.avgOrderValue);
    const purchaseFrequency = Number(inputs.purchaseFrequency);
    const customerLifetime = Number(inputs.customerLifetime);
    if (!marketingSpend || !salesSpend || !newCustomers || !avgOrderValue) {
        return [
            { value: '—', label: 'CAC (₽)' },
            { value: '—', label: 'LTV (₽)' },
            { value: '—', label: 'LTV/CAC' },
            { value: '—', label: 'Окупаемость (мес)' },
            { value: '', label: 'Оценка бизнес-модели' }
        ];
    }
    const totalSpend = marketingSpend + salesSpend;
    const cac = totalSpend / newCustomers;
    const ltv = avgOrderValue * purchaseFrequency * customerLifetime;
    const ltvCacRatio = ltv / cac;
    const payback = cac / (avgOrderValue * purchaseFrequency / 12);
    let assessment = '';
    if (ltvCacRatio < 1) {
        assessment = '❌ Критично: LTV < CAC';
    }
    else if (ltvCacRatio < 3) {
        assessment = '⚠️ Слабая экономика (LTV/CAC < 3)';
    }
    else if (ltvCacRatio < 5) {
        assessment = '✅ Хорошая экономика';
    }
    else {
        assessment = '🌟 Отличная экономика!';
    }
    return [
        { value: Math.round(cac), label: 'CAC (₽)' },
        { value: Math.round(ltv), label: 'LTV (₽)' },
        { value: Math.round(ltvCacRatio * 10) / 10, label: 'LTV/CAC' },
        { value: Math.round(payback * 10) / 10, label: 'Окупаемость (мес)' },
        { value: assessment, label: 'Оценка бизнес-модели' }
    ];
},
  'kalkulyator-alimentov': (inputs) => {
    const calculationType = String(inputs.calculationType);
    const parentSalary = Number(inputs.parentSalary);
    const childrenCount = Number(inputs.childrenCount);
    const fixedAmount = Number(inputs.fixedAmount);
    const region = String(inputs.region);
    if (!parentSalary && calculationType !== 'fixed') {
        return [{ value: '—', label: 'Результат' }];
    }
    let alimonyAmount = 0;
    let afterTaxSalary = 0;
    if (calculationType === 'percentage') {
        afterTaxSalary = parentSalary * 0.87; // После НДФЛ
        alimonyAmount = afterTaxSalary * (childrenCount / 100);
    }
    else if (calculationType === 'fixed') {
        afterTaxSalary = parentSalary * 0.87;
        alimonyAmount = fixedAmount;
    }
    else if (calculationType === 'minimum') {
        // Минимальный размер = 50% от прожиточного минимума ребёнка
        let subsistenceMin = 16000; // Базовое значение
        if (region === 'moscow')
            subsistenceMin = 20000;
        if (region === 'spb')
            subsistenceMin = 18000;
        afterTaxSalary = parentSalary * 0.87;
        alimonyAmount = subsistenceMin * 0.5; // Половина ПМ
    }
    const remainingAmount = afterTaxSalary - alimonyAmount;
    return [
        { value: alimonyAmount.toFixed(2), label: 'Размер алиментов', unit: '₽' },
        { value: afterTaxSalary.toFixed(2), label: 'Зарплата после НДФЛ', unit: '₽' },
        { value: remainingAmount.toFixed(2), label: 'Остаётся у родителя', unit: '₽' }
    ];
},
  'kalkulyator-dekretnyh': (inputs) => {
    const salaryYear1 = Number(inputs.salaryYear1);
    const salaryYear2 = Number(inputs.salaryYear2);
    const excludedDays = Number(inputs.excludedDays);
    const leaveDuration = Number(inputs.leaveDuration);
    if (!salaryYear1 || !salaryYear2) {
        return [{ value: '—', label: 'Результат' }];
    }
    const totalSalary = salaryYear1 + salaryYear2;
    const workingDays = 730 - excludedDays; // 2 года = 730 дней
    // Минимальные и максимальные ограничения на дневной заработок (2024-2025)
    const minDailyEarnings = 492.60; // МРОТ / 30.44
    const maxDailyEarnings = (12000000 + 12000000) / 730; // ~3287.67
    let dailyEarnings = totalSalary / workingDays;
    if (dailyEarnings < minDailyEarnings)
        dailyEarnings = minDailyEarnings;
    if (dailyEarnings > maxDailyEarnings)
        dailyEarnings = maxDailyEarnings;
    const totalAmount = dailyEarnings * leaveDuration;
    const monthlyAverage = totalAmount / (leaveDuration / 30.44);
    return [
        { value: dailyEarnings.toFixed(2), label: 'Средний дневной заработок', unit: '₽' },
        { value: totalAmount.toFixed(2), label: 'Общая сумма декретных', unit: '₽' },
        { value: monthlyAverage.toFixed(2), label: 'В среднем в месяц', unit: '₽' }
    ];
},
  'kalkulyator-gosposhliny': (inputs) => {
    const dutyType = String(inputs.dutyType);
    const claimAmount = Number(inputs.claimAmount);
    let dutyAmount = 0;
    let discountInfo = '';
    switch (dutyType) {
        case 'property_claim':
            if (claimAmount <= 20000) {
                dutyAmount = Math.max(400, claimAmount * 0.04);
            }
            else if (claimAmount <= 100000) {
                dutyAmount = 800 + (claimAmount - 20000) * 0.03;
            }
            else if (claimAmount <= 200000) {
                dutyAmount = 3200 + (claimAmount - 100000) * 0.02;
            }
            else if (claimAmount <= 1000000) {
                dutyAmount = 5200 + (claimAmount - 200000) * 0.01;
            }
            else {
                dutyAmount = 13200 + (claimAmount - 1000000) * 0.005;
                if (dutyAmount > 60000)
                    dutyAmount = 60000;
            }
            discountInfo = 'Инвалиды I-II группы, пенсионеры освобождаются от уплаты госпошлины при подаче иска на сумму до 1 млн ₽';
            break;
        case 'divorce':
            dutyAmount = 600;
            discountInfo = 'При взаимном согласии развод через ЗАГС — 650 ₽';
            break;
        case 'divorce_property':
            dutyAmount = 600 + Math.min(60000, Math.max(400, claimAmount * 0.005));
            discountInfo = 'Если имущество не подлежит оценке — 600 ₽ + 400 ₽';
            break;
        case 'alimony':
            dutyAmount = 0; // Алименты освобождены от госпошлины
            discountInfo = 'Иски о взыскании алиментов не облагаются госпошлиной (подаётся заявителем)';
            break;
        case 'notary':
            dutyAmount = 500; // Базовая ставка
            discountInfo = 'Заверение копий — 100 ₽ за страницу, доверенность — от 500 ₽';
            break;
        case 'passport':
            dutyAmount = 5000; // Загранпаспорт нового поколения
            discountInfo = 'Паспорт старого поколения — 2000 ₽, оформление через Госуслуги — скидка 30%';
            break;
        case 'registration_ip':
            dutyAmount = 0; // Бесплатно через налоговую или Госуслуги
            discountInfo = 'Регистрация ИП бесплатна при подаче через Госуслуги или налоговую инспекцию';
            break;
        case 'registration_ooo':
            dutyAmount = 4000; // Регистрация ООО
            discountInfo = 'При подаче через Госуслуги — скидка 30% (2800 ₽)';
            break;
    }
    return [
        { value: dutyAmount.toFixed(2), label: 'Размер госпошлины', unit: '₽' },
        { value: discountInfo, label: 'Информация о льготах', unit: '' }
    ];
},
  'kalkulyator-ndfl': (inputs) => {
    const incomeAmount = Number(inputs.incomeAmount);
    const incomeType = String(inputs.incomeType);
    const hasDeductions = Boolean(inputs.hasDeductions);
    const deductionAmount = Number(inputs.deductionAmount);
    if (!incomeAmount) {
        return [{ value: '—', label: 'Результат' }];
    }
    let taxRate = 0.13; // Базовая ставка
    switch (incomeType) {
        case 'high_income':
            taxRate = 0.15;
            break;
        case 'foreign':
            taxRate = 0.30;
            break;
        case 'winnings':
            taxRate = 0.35;
            break;
    }
    let taxableIncome = incomeAmount;
    if (hasDeductions) {
        taxableIncome = Math.max(0, incomeAmount - deductionAmount);
    }
    // Для высоких доходов (свыше 5 млн) применяется прогрессивная шкала
    let ndflAmount = 0;
    if (incomeType === 'high_income' && incomeAmount > 5000000) {
        ndflAmount = 5000000 * 0.13 + (taxableIncome - 5000000) * 0.15;
    }
    else {
        ndflAmount = taxableIncome * taxRate;
    }
    const netIncome = incomeAmount - ndflAmount;
    return [
        { value: taxableIncome.toFixed(2), label: 'Налогооблагаемый доход', unit: '₽' },
        { value: ndflAmount.toFixed(2), label: 'Сумма НДФЛ', unit: '₽' },
        { value: netIncome.toFixed(2), label: 'Доход на руки', unit: '₽' }
    ];
},
  'kalkulyator-nds': (inputs) => {
    const amount = Number(inputs.amount);
    const vatRate = Number(inputs.vatRate) / 100;
    const operation = String(inputs.operation);
    if (!amount) {
        return [{ value: '—', label: 'Результат' }];
    }
    let amountWithoutVat = 0;
    let vatAmount = 0;
    let totalAmount = 0;
    if (operation === 'add') {
        amountWithoutVat = amount;
        vatAmount = amount * vatRate;
        totalAmount = amount + vatAmount;
    }
    else {
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
  'kalkulyator-neustoiki-395-gk': (inputs) => {
    const debtAmount = Number(inputs.debtAmount);
    const startDate = new Date(inputs.startDate as string);
    const endDate = new Date(inputs.endDate as string);
    const rateType = String(inputs.rateType);
    const customRate = Number(inputs.customRate);
    if (!debtAmount || !startDate.getTime() || !endDate.getTime()) {
        return [{ value: '—', label: 'Результат' }];
    }
    const diffTime = endDate.getTime() - startDate.getTime();
    const daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (daysOverdue <= 0) {
        return [{ value: '—', label: 'Результат', additionalInfo: 'Дата окончания должна быть позже даты начала' }];
    }
    let rate = 21; // Текущая ключевая ставка ЦБ по умолчанию
    if (rateType === '16')
        rate = 16;
    else if (rateType === '13')
        rate = 13;
    else if (rateType === 'custom')
        rate = customRate;
    const penaltyAmount = (rate / 365) * daysOverdue * debtAmount / 100;
    const totalAmount = debtAmount + penaltyAmount;
    return [
        { value: daysOverdue.toString(), label: 'Дней просрочки', unit: 'дней' },
        { value: penaltyAmount.toFixed(2), label: 'Сумма неустойки', unit: '₽' },
        { value: totalAmount.toFixed(2), label: 'Итого (долг + неустойка)', unit: '₽' }
    ];
},
  'kalkulyator-otpusknyh': (inputs) => {
    const averageSalary = Number(inputs.averageSalary);
    const vacationDays = Number(inputs.vacationDays);
    if (!averageSalary || !vacationDays) {
        return [{ value: '—', label: 'Результат' }];
    }
    // Средний дневной заработок = ЗП / 12 / 29.3 (среднее кол-во дней в месяце)
    const dailyEarnings = averageSalary / 12 / 29.3;
    const vacationPay = dailyEarnings * vacationDays;
    const ndfl = vacationPay * 0.13;
    const netAmount = vacationPay - ndfl;
    return [
        { value: dailyEarnings.toFixed(2), label: 'Средний дневной заработок', unit: '₽' },
        { value: vacationPay.toFixed(2), label: 'Сумма отпускных', unit: '₽' },
        { value: ndfl.toFixed(2), label: 'НДФЛ (13%)', unit: '₽' },
        { value: netAmount.toFixed(2), label: 'К выдаче на руки', unit: '₽' }
    ];
},
  'kalkulyator-pensii': (inputs) => {
    const pensionPoints = Number(inputs.pensionPoints);
    const region = String(inputs.region);
    if (!pensionPoints) {
        return [{ value: '—', label: 'Результат' }];
    }
    const pointValue = 133.05; // Стоимость пенсионного коэффициента
    let fixedPayment = 8726.13; // Фиксированная выплата
    if (region === 'north') {
        fixedPayment *= 1.5; // Коэффициент РКС
    }
    else if (region === 'equated') {
        fixedPayment *= 1.3; // Коэффициент МРС
    }
    const insurancePart = pensionPoints * pointValue;
    const totalPension = fixedPayment + insurancePart;
    return [
        { value: fixedPayment.toFixed(2), label: 'Фиксированная выплата', unit: '₽' },
        { value: insurancePart.toFixed(2), label: 'Страховая часть (ПК × стоимость)', unit: '₽' },
        { value: totalPension.toFixed(2), label: 'Общий размер пенсии', unit: '₽' }
    ];
},
  'kalkulyator-vklada': (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate);
    const term = Number(inputs.term);
    const capitalization = String(inputs.capitalization);
    if (!amount || !rate || !term) {
        return [{ value: '—', label: 'Результат' }];
    }
    let totalAmount = amount;
    let periods = 0;
    let ratePerPeriod = 0;
    switch (capitalization) {
        case 'monthly':
            periods = term;
            ratePerPeriod = rate / 100 / 12;
            break;
        case 'quarterly':
            periods = Math.floor(term / 3);
            ratePerPeriod = rate / 100 / 4;
            break;
        case 'yearly':
            periods = Math.floor(term / 12);
            ratePerPeriod = rate / 100;
            break;
        default:
            periods = 1;
            ratePerPeriod = (rate / 100) * (term / 12);
    }
    if (capitalization === 'none') {
        totalAmount = amount * (1 + ratePerPeriod);
    }
    else {
        totalAmount = amount * Math.pow(1 + ratePerPeriod, periods);
    }
    const interest = totalAmount - amount;
    const effectiveRate = ((totalAmount - amount) / amount) * (12 / term) * 100;
    return [
        { value: totalAmount.toFixed(2), label: 'Итоговая сумма', unit: '₽' },
        { value: interest.toFixed(2), label: 'Доход по процентам', unit: '₽' },
        { value: effectiveRate.toFixed(2), label: 'Эффективная годовая ставка', unit: '%' }
    ];
},
  'komissii-brokera': (inputs) => {
    const amount = Number(inputs.tradeAmount);
    const type = String(inputs.commissionType);
    const value = Number(inputs.commissionValue);
    const trades = Number(inputs.tradesPerMonth);
    let perTrade = 0;
    if (type === 'percent')
        perTrade = amount * value / 100;
    else if (type === 'fixed')
        perTrade = value;
    else
        perTrade = Math.max(amount * value / 100, value);
    const monthly = perTrade * trades;
    const annual = monthly * 12;
    const impact = (annual / (amount * trades * 12)) * 100;
    return [
        { value: Math.round(perTrade * 100) / 100, label: 'Комиссия за сделку', unit: '$' },
        { value: Math.round(monthly * 100) / 100, label: 'Комиссия в месяц', unit: '$' },
        { value: Math.round(annual * 100) / 100, label: 'Комиссия в год', unit: '$' },
        { value: Math.round(impact * 100) / 100, label: 'Влияние на доходность', unit: '%' }
    ];
},
}
