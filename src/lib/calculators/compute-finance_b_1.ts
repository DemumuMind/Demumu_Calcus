import type { ComputeFn } from './compute-helpers';

export const computeMap_finance_b_1: Record<string, ComputeFn> = {
  'nalog-na-pribyl': (inputs) => {
    const purchase = Number(inputs.purchasePrice);
    const sale = Number(inputs.salePrice);
    const period = String(inputs.holdingPeriod);
    const bracket = Number(inputs.taxBracket);
    const gain = Math.max(0, sale - purchase);
    const tax = gain * bracket / 100;
    const net = gain - tax;
    return [
        { value: Math.round(gain * 100) / 100, label: 'Капитальная прибыль', unit: '$' },
        { value: Math.round(tax * 100) / 100, label: 'Налог к уплате', unit: '$' },
        { value: Math.round(net * 100) / 100, label: 'Прибыль после налога', unit: '$' }
    ];
},
  'npv-proekta': (inputs) => {
    const initial = Number(inputs.initialInvestment);
    const rate = Number(inputs.discountRate) / 100;
    const cf1 = Number(inputs.cashFlow1);
    const cf2 = Number(inputs.cashFlow2);
    const cf3 = Number(inputs.cashFlow3);
    if (!initial || !rate) {
        return [
            { value: '—', label: 'NPV (₽)' },
            { value: '—', label: 'Срок окупаемости (лет)' },
            { value: '—', label: 'Доходность (%)' },
            { value: '', label: 'Рекомендация' }
        ];
    }
    const pv1 = cf1 / Math.pow(1 + rate, 1);
    const pv2 = cf2 / Math.pow(1 + rate, 2);
    const pv3 = cf3 / Math.pow(1 + rate, 3);
    const npv = -initial + pv1 + pv2 + pv3;
    let cumulative = -initial;
    let payback = 0;
    const flows = [cf1, cf2, cf3];
    for (let i = 0; i < flows.length; i++) {
        cumulative += flows[i] / Math.pow(1 + rate, i + 1);
        if (cumulative > 0 && payback === 0) {
            payback = i + 1;
        }
    }
    if (payback === 0)
        payback = 999;
    const totalProfit = cf1 + cf2 + cf3 - initial;
    const profitability = (totalProfit / initial) * 100;
    let _recommendation = '';
    if (npv > 0 && payback <= 3) {
        _recommendation = '✅ Проект рекомендуется к реализации';
    }
    else if (npv > 0) {
        _recommendation = '⚠️ Проект окупается, но срок окупаемости длинный';
    }
    else {
        _recommendation = '❌ Проект не рекомендуется (NPV < 0)';
    }
    return [
        { value: Math.round(npv), label: 'NPV (₽)' },
        { value: payback === 999 ? '>3' : payback, label: 'Срок окупаемости (лет)' },
        { value: Math.round(profitability * 10) / 10, label: 'Доходность (%)' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
  'obligaczii-dokhodnost': (inputs) => {
    const face = Number(inputs.faceValue);
    const price = Number(inputs.marketPrice) / 100 * face;
    const coupon = Number(inputs.couponRate) / 100;
    const years = Number(inputs.yearsToMaturity);
    const annualCoupon = face * coupon;
    const currentYield = (annualCoupon / price) * 100;
    const capitalGain = (face - price) / years;
    const ytm = ((annualCoupon + capitalGain) / ((face + price) / 2)) * 100;
    return [
        { value: Math.round(currentYield * 100) / 100, label: 'Текущая доходность', unit: '%' },
        { value: Math.round(ytm * 100) / 100, label: 'Доходность к погашению', unit: '%' },
        { value: Math.round(annualCoupon * 100) / 100, label: 'Годовой купонный доход', unit: '$' }
    ];
},
  'obmen-valyuty': (inputs) => {
    const amount = Number(inputs.amount);
    const exchangeRate = Number(inputs.exchangeRate);
    const commission = Number(inputs.commission);
    const spread = Number(inputs.spread);
    if (!amount || !exchangeRate) {
        return [
            { value: '—', label: 'Сумма без комиссий', unit: '₽' },
            { value: '—', label: 'Комиссия', unit: '₽' },
            { value: '—', label: 'Потери на спреде', unit: '₽' },
            { value: '—', label: 'Итоговая сумма', unit: '₽' },
            { value: '—', label: 'Эффективный курс' }
        ];
    }
    const baseAmount = amount * exchangeRate;
    const commissionAmount = baseAmount * (commission / 100);
    const spreadFactor = 1 - (spread / 100);
    const spreadLoss = baseAmount * (spread / 100);
    const finalAmount = (baseAmount - commissionAmount) * spreadFactor;
    const effectiveRate = finalAmount / amount;
    return [
        { value: Math.round(baseAmount), label: 'Сумма без комиссий', unit: '₽' },
        { value: Math.round(commissionAmount), label: 'Комиссия', unit: '₽' },
        { value: Math.round(spreadLoss), label: 'Потери на спреде', unit: '₽' },
        { value: Math.round(finalAmount), label: 'Итоговая сумма', unit: '₽' },
        { value: Number(effectiveRate.toFixed(3)), label: 'Эффективный курс' }
    ];
},
  'opcziony-bazovyj': (inputs) => {
    const type = String(inputs.optionType);
    const strike = Number(inputs.strikePrice);
    const premium = Number(inputs.premium);
    const current = Number(inputs.currentPrice);
    let profit = 0;
    let breakEven = 0;
    if (type === 'call') {
        profit = Math.max(0, current - strike) - premium;
        breakEven = strike + premium;
    }
    else {
        profit = Math.max(0, strike - current) - premium;
        breakEven = strike - premium;
    }
    return [
        { value: Math.round(profit * 100) / 100, label: 'Прибыль/убыток', unit: '$' },
        { value: Math.round(breakEven * 100) / 100, label: 'Точка безубыточности', unit: '$' }
    ];
},
  'pensionnyj-kalkulyator': (inputs) => {
    const currentAge = Number(inputs.currentAge);
    const retirementAge = Number(inputs.retirementAge);
    const monthly = Number(inputs.monthlyContribution);
    const rate = Number(inputs.returnRate) / 100 / 12;
    const current = Number(inputs.currentSavings);
    const years = retirementAge - currentAge;
    const months = years * 12;
    const totalContributions = monthly * months;
    let totalSavings = current * Math.pow(1 + rate, months);
    if (rate > 0) {
        totalSavings += monthly * (Math.pow(1 + rate, months) - 1) / rate;
    }
    else {
        totalSavings += totalContributions;
    }
    const pensionMonths = 20 * 12;
    const monthlyPension = totalSavings / pensionMonths;
    const investmentIncome = totalSavings - current - totalContributions;
    return [
        { value: Math.round(totalSavings), label: 'Итоговые накопления', unit: '$' },
        { value: Math.round(monthlyPension), label: 'Ежемесячная пенсия (20 лет)', unit: '$' },
        { value: Math.round(totalContributions), label: 'Всего взносов', unit: '$' },
        { value: Math.round(investmentIncome), label: 'Инвестиционный доход', unit: '$' }
    ];
},
  'prognoz-prodazh': (inputs) => {
    const lastMonth = Number(inputs.lastMonthSales);
    const growthRate = Number(inputs.growthRate) / 100;
    const seasonality = Number(inputs.seasonality);
    const forecastMonths = Number(inputs.forecastMonths);
    if (!lastMonth || !forecastMonths) {
        return [
            { value: '—', label: 'Месяц 1 (₽)' },
            { value: '—', label: 'Месяц 3 (₽)' },
            { value: '—', label: 'Месяц 6 (₽)' },
            { value: '—', label: 'Итого прогноз (₽)' },
            { value: '—', label: 'Средний рост (%)' }
        ];
    }
    const forecast1 = lastMonth * (1 + growthRate) * seasonality;
    const forecast3 = lastMonth * Math.pow(1 + growthRate, 3) * seasonality;
    const forecast6 = lastMonth * Math.pow(1 + growthRate, 6) * seasonality;
    let totalForecast = 0;
    for (let i = 1; i <= forecastMonths; i++) {
        totalForecast += lastMonth * Math.pow(1 + growthRate, i) * seasonality;
    }
    const avgGrowth = growthRate * 100;
    return [
        { value: Math.round(forecast1), label: 'Месяц 1 (₽)' },
        { value: Math.round(forecast3), label: 'Месяц 3 (₽)' },
        { value: Math.round(forecast6), label: 'Месяц 6 (₽)' },
        { value: Math.round(totalForecast), label: 'Итого прогноз (₽)' },
        { value: Math.round(avgGrowth * 10) / 10, label: 'Средний рост (%)' }
    ];
},
  'realnyj-dokhod': (inputs) => {
    const nominal = Number(inputs.nominalReturn) / 100;
    const inflation = Number(inputs.inflation) / 100;
    const tax = Number(inputs.taxRate) / 100;
    const realReturn = ((1 + nominal) / (1 + inflation) - 1) * 100;
    const afterTax = nominal * (1 - tax) * 100;
    const realAfterTax = ((1 + nominal * (1 - tax)) / (1 + inflation) - 1) * 100;
    return [
        { value: Math.round(realReturn * 100) / 100, label: 'Реальная доходность', unit: '%' },
        { value: Math.round(afterTax * 100) / 100, label: 'После налогов', unit: '%' },
        { value: Math.round(realAfterTax * 100) / 100, label: 'Реальная после налогов', unit: '%' }
    ];
},
  'reinvestirovanie-dividendov': (inputs) => {
    const initial = Number(inputs.initialInvestment);
    const yieldRate = Number(inputs.dividendYield) / 100;
    const growth = Number(inputs.stockGrowth) / 100;
    const years = Number(inputs.years);
    const tax = Number(inputs.taxRate) / 100;
    const stockValue = initial * Math.pow(1 + growth, years);
    const annualDividend = initial * yieldRate;
    let totalDividendsNoReinvest = 0;
    for (let i = 0; i < years; i++) {
        totalDividendsNoReinvest += annualDividend * Math.pow(1 + growth, i) * (1 - tax);
    }
    const withoutReinvestment = stockValue + totalDividendsNoReinvest;
    const totalReturn = growth + yieldRate * (1 - tax);
    const withReinvestment = initial * Math.pow(1 + totalReturn, years);
    const totalDividends = withReinvestment - stockValue;
    const difference = withReinvestment - withoutReinvestment;
    return [
        { value: Math.round(withoutReinvestment), label: 'Без реинвестирования', unit: '$' },
        { value: Math.round(withReinvestment), label: 'С реинвестированием', unit: '$' },
        { value: Math.round(difference), label: 'Разница', unit: '$' },
        { value: Math.round(totalDividends), label: 'Всего дивидендов', unit: '$' }
    ];
},
  'roi-marketing': (inputs) => {
    const revenue = Number(inputs.revenue);
    const marketingCost = Number(inputs.marketingCost);
    const productCost = Number(inputs.productCost) / 100;
    if (!revenue || !marketingCost) {
        return [
            { value: '—', label: 'ROMI (%)' },
            { value: '—', label: 'Прибыль (₽)' },
            { value: '—', label: 'CPA (₽)' },
            { value: '', label: 'Оценка' }
        ];
    }
    const grossProfit = revenue * (1 - productCost);
    const netProfit = grossProfit - marketingCost;
    const romi = ((netProfit / marketingCost) * 100);
    const cpa = marketingCost / (revenue / 1000); // Assuming average order value
    let assessment = '';
    if (romi < 0) {
        assessment = '❌ Убыточная кампания';
    }
    else if (romi < 100) {
        assessment = '⚠️ Низкая эффективность';
    }
    else if (romi < 300) {
        assessment = '✅ Хороший результат';
    }
    else {
        assessment = '🌟 Отличный результат!';
    }
    return [
        { value: Math.round(romi * 10) / 10, label: 'ROMI (%)' },
        { value: Math.round(netProfit), label: 'Прибыль (₽)' },
        { value: Math.round(cpa), label: 'CPA (₽)' },
        { value: assessment, label: 'Оценка' }
    ];
},
  'slozhnyj-procent': (inputs) => {
    const principal = Number(inputs.principal);
    const rate = Number(inputs.rate);
    const periods = Number(inputs.periods);
    const monthlyAddition = Number(inputs.monthlyAddition);
    if (!principal && !monthlyAddition) {
        return [{ value: '—', label: 'Результат' }];
    }
    const monthlyRate = rate / 100 / 12;
    let finalAmount = principal * Math.pow(1 + monthlyRate, periods);
    if (monthlyAddition > 0 && monthlyRate > 0) {
        finalAmount += monthlyAddition * (Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate;
    }
    else if (monthlyAddition > 0) {
        finalAmount += monthlyAddition * periods;
    }
    const totalContributions = principal + monthlyAddition * periods;
    const totalInterest = finalAmount - totalContributions;
    return [
        { value: finalAmount.toFixed(2), label: 'Итоговая сумма', unit: '₽' },
        { value: totalInterest.toFixed(2), label: 'Доход от процентов', unit: '₽' },
        { value: totalContributions.toFixed(2), label: 'Всего внесено', unit: '₽' }
    ];
},
  'stoimost-poezdki': (inputs) => {
    const flight = Number(inputs.flight) || 0;
    const hotel = Number(inputs.hotel) || 0;
    const nights = Number(inputs.nights) || 1;
    const foodPerDay = Number(inputs.foodPerDay) || 0;
    const activities = Number(inputs.activities) || 0;
    const totalHotel = hotel * nights;
    const totalFood = foodPerDay * nights;
    const subtotal = flight + totalHotel + totalFood + activities;
    const emergency = subtotal * 0.1;
    const total = subtotal + emergency;
    const perDay = total / nights;
    return [
        { value: totalHotel, label: 'Отель всего', unit: '₽' },
        { value: totalFood, label: 'Еда всего', unit: '₽' },
        { value: subtotal, label: 'Подытог', unit: '₽' },
        { value: Math.round(emergency), label: 'Резерв (10%)', unit: '₽' },
        { value: Math.round(total), label: 'ИТОГО', unit: '₽' },
        { value: Math.round(perDay), label: 'В день на человека', unit: '₽' }
    ];
},
  'summa-propisyu': (inputs) => {
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
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19)
            return forms[2];
        if (lastDigit === 1)
            return forms[0];
        if (lastDigit >= 2 && lastDigit <= 4)
            return forms[1];
        return forms[2];
    }
    function convertLessThanThousand(n: number, isThousand = false): string {
        if (n === 0)
            return '';
        let result = '';
        const h = Math.floor(n / 100);
        const remainder = n % 100;
        if (h > 0)
            result += hundreds[h] + ' ';
        if (remainder >= 10 && remainder < 20) {
            result += teens[remainder - 10] + ' ';
        }
        else {
            const t = Math.floor(remainder / 10);
            const u = remainder % 10;
            if (t > 0)
                result += tens[t] + ' ';
            if (u > 0) {
                if (isThousand && u === 1)
                    result += 'одна ';
                else if (isThousand && u === 2)
                    result += 'две ';
                else
                    result += units[u] + ' ';
            }
        }
        return result.trim();
    }
    function numberToWords(n: number): string {
        if (n === 0)
            return 'ноль';
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
    const currencyNames: Record<string, {
        whole: string[];
        fractional: string;
    }> = {
        'rub': { whole: ['рубль', 'рубля', 'рублей'], fractional: 'копеек' },
        'usd': { whole: ['доллар', 'доллара', 'долларов'], fractional: 'центов' },
        'eur': { whole: ['евро', 'евро', 'евро'], fractional: 'центов' }
    };
    const curr = currencyNames[currency] || currencyNames['rub'];
    let text = numberToWords(wholePart) + ' ' + getPluralForm(wholePart, curr.whole);
    if (fractionalPart > 0 || currency === 'rub') {
        text += ' ' + fractionalPart.toString().padStart(2, '0') + ' ' + curr.fractional;
    }
    if (format === 'uppercase')
        text = text.toUpperCase();
    else if (format === 'capitalize')
        text = text.charAt(0).toUpperCase() + text.slice(1);
    const withNumber = `${amount.toFixed(2)} (${text})`;
    return [
        { value: text, label: 'Прописью' },
        { value: withNumber, label: 'С цифрами' }
    ];
},
}
