import type { ComputeFn } from './compute-helpers';

export const computeMap_finance_b_2: Record<string, ComputeFn> = {
  'tochka-bezubytochnosti-rasshirennaya': (inputs) => {
    const fixedCosts = Number(inputs.fixedCosts);
    const price = Number(inputs.price);
    const variableCost = Number(inputs.variableCost);
    const targetProfit = Number(inputs.targetProfit);
    if (!fixedCosts || !price || !variableCost) {
        return [
            { value: '—', label: 'Маржинальный доход (₽)' },
            { value: '—', label: 'Точка безубыточности (шт)' },
            { value: '—', label: 'Точка безубыточности (₽)' },
            { value: '—', label: 'Для целевой прибыли (шт)' },
            { value: '—', label: 'Коэффициент маржи (%)' }
        ];
    }
    const contributionMargin = price - variableCost;
    const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
    const breakEvenRevenue = breakEvenUnits * price;
    const targetUnits = Math.ceil((fixedCosts + targetProfit) / contributionMargin);
    const marginPercent = (contributionMargin / price) * 100;
    return [
        { value: contributionMargin, label: 'Маржинальный доход (₽)' },
        { value: breakEvenUnits, label: 'Точка безубыточности (шт)' },
        { value: breakEvenRevenue, label: 'Точка безубыточности (₽)' },
        { value: targetUnits, label: 'Для целевой прибыли (шт)' },
        { value: Math.round(marginPercent * 10) / 10, label: 'Коэффициент маржи (%)' }
    ];
},
  'valyutnyj-kalkulyator': (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.marketRate);
    const spread = Number(inputs.spread) / 100;
    const commission = Number(inputs.commission);
    const exchangeRate = rate * (1 - spread);
    const received = amount * exchangeRate - commission;
    const effectiveRate = received / amount;
    const costPercent = ((amount * rate - received) / (amount * rate)) * 100;
    return [
        { value: Math.round(exchangeRate * 100) / 100, label: 'Курс обмена' },
        { value: Math.round(received * 100) / 100, label: 'Получено' },
        { value: Math.round(effectiveRate * 100) / 100, label: 'Эффективный курс' },
        { value: Math.round(costPercent * 100) / 100, label: 'Стоимость обмена', unit: '%' }
    ];
},
  'vliyanie-inflyaczii': (inputs) => {
    const amount = Number(inputs.amount);
    const inflation = Number(inputs.inflationRate) / 100;
    const years = Number(inputs.years);
    const futureValue = amount / Math.pow(1 + inflation, years);
    const purchasingPower = (futureValue / amount) * 100;
    const loss = amount - futureValue;
    return [
        { value: Math.round(futureValue), label: 'Будущая стоимость', unit: '$' },
        { value: Math.round(purchasingPower * 100) / 100, label: 'Покупательная способность', unit: '%' },
        { value: Math.round(loss), label: 'Потери от инфляции', unit: '$' }
    ];
},
  'zatraty-na-obrazovanie': (inputs): any => {
    const n = inputs as Record<string, number>;
    const tuition = Number(inputs.tuitionPerYear || 150000);
    const years = Number(inputs.years || 4);
    const accommodation = Number(inputs.accommodation || 15000);
    const food = Number(inputs.food || 12000);
    const books = Number(inputs.books || 10000);
    const transport = Number(inputs.transport || 3000);
    const tuitionTotal = tuition * years;
    const monthlyLiving = accommodation + food + transport;
    const yearlyLiving = monthlyLiving * 12 + books;
    const livingTotal = yearlyLiving * years;
    const totalCost = tuitionTotal + livingTotal;
    const perYear = totalCost / years;
    const perMonth = totalCost / (years * 12);
    const withScholarship = totalCost - (3000 * 10 * years); // 10 months per year
    return [
        { value: tuitionTotal, label: 'Всего за обучение', unit: '₽' },
        { value: livingTotal, label: 'Проживание всего', unit: '₽' },
        { value: totalCost, label: 'Полная стоимость', unit: '₽' },
        { value: Math.round(perYear), label: 'В год', unit: '₽' },
        { value: Math.round(perMonth), label: 'В месяц (в среднем)', unit: '₽' },
        { value: withScholarship, label: 'С учётом стипендии 3000₽/мес', unit: '₽' }
    ];
},
}
