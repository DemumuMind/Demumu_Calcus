import type { ComputeFn } from './compute-helpers';

export const computeMap_finance_a_2: Record<string, ComputeFn> = {
  'komissiya-bonusy': (inputs) => {
    const revenue = Number(inputs.revenue);
    const target = Number(inputs.target);
    const baseRate = Number(inputs.baseRate) / 100;
    const bonusRate = Number(inputs.bonusRate) / 100;
    if (!revenue || !target) {
        return [
            { value: '—', label: 'Выполнение плана (%)' },
            { value: '—', label: 'Базовая комиссия (₽)' },
            { value: '—', label: 'Бонусная комиссия (₽)' },
            { value: '—', label: 'Итого комиссия (₽)' },
            { value: '—', label: 'Эффективный %' }
        ];
    }
    const achievement = (revenue / target) * 100;
    const baseCommission = revenue * baseRate;
    let bonusCommission = 0;
    if (revenue > target) {
        bonusCommission = (revenue - target) * bonusRate;
    }
    const totalCommission = baseCommission + bonusCommission;
    const effectiveRate = (totalCommission / revenue) * 100;
    return [
        { value: Math.round(achievement * 10) / 10, label: 'Выполнение плана (%)' },
        { value: Math.round(baseCommission), label: 'Базовая комиссия (₽)' },
        { value: Math.round(bonusCommission), label: 'Бонусная комиссия (₽)' },
        { value: Math.round(totalCommission), label: 'Итого комиссия (₽)' },
        { value: Math.round(effectiveRate * 100) / 100, label: 'Эффективный %' }
    ];
},
  'konkurentnaya-cena': (inputs) => {
    const c1 = Number(inputs.competitor1);
    const c2 = Number(inputs.competitor2);
    const c3 = Number(inputs.competitor3);
    const strategy = String(inputs.strategy);
    const cost = Number(inputs.cost);
    if (!c1 || !cost) {
        return [
            { value: '—', label: 'Средняя цена конкурентов (₽)' },
            { value: '—', label: 'Рекомендуемая цена (₽)' },
            { value: '—', label: 'Маржа (%)' },
            { value: '—', label: 'Прибыль (₽)' }
        ];
    }
    const competitors = [c1, c2, c3].filter(c => c > 0);
    const avgCompetitorPrice = competitors.reduce((a, b) => a + b, 0) / competitors.length;
    let multiplier = 1;
    switch (strategy) {
        case 'lowest':
            multiplier = 0.9;
            break;
        case 'market':
            multiplier = 1;
            break;
        case 'premium':
            multiplier = 1.2;
            break;
        case 'skimming':
            multiplier = 1.3;
            break;
    }
    const recommendedPrice = Math.round(avgCompetitorPrice * multiplier);
    const finalPrice = Math.max(recommendedPrice, cost * 1.1);
    const margin = ((finalPrice - cost) / finalPrice) * 100;
    const profit = finalPrice - cost;
    return [
        { value: Math.round(avgCompetitorPrice), label: 'Средняя цена конкурентов (₽)' },
        { value: finalPrice, label: 'Рекомендуемая цена (₽)' },
        { value: Math.round(margin * 10) / 10, label: 'Маржа (%)' },
        { value: profit, label: 'Прибыль (₽)' }
    ];
},
  'konversiya': (inputs) => {
    const visitors = Number(inputs.visitors);
    const leads = Number(inputs.leads);
    const qualified = Number(inputs.qualified);
    const customers = Number(inputs.customers);
    if (!visitors || !leads || !qualified || !customers) {
        return [
            { value: '—', label: 'Конверсия посетитель→лид (%)' },
            { value: '—', label: 'Квалификация лидов (%)' },
            { value: '—', label: 'Закрытие сделок (%)' },
            { value: '—', label: 'Общая конверсия (%)' }
        ];
    }
    const visitorToLead = (leads / visitors) * 100;
    const leadToQualified = (qualified / leads) * 100;
    const qualifiedToCustomer = (customers / qualified) * 100;
    const totalConversion = (customers / visitors) * 100;
    return [
        { value: Math.round(visitorToLead * 100) / 100, label: 'Конверсия посетитель→лид (%)' },
        { value: Math.round(leadToQualified * 100) / 100, label: 'Квалификация лидов (%)' },
        { value: Math.round(qualifiedToCustomer * 100) / 100, label: 'Закрытие сделок (%)' },
        { value: Math.round(totalConversion * 100) / 100, label: 'Общая конверсия (%)' }
    ];
},
  'lizing-raschet': (inputs) => {
    const value = Number(inputs.assetValue);
    const residual = Number(inputs.residualValue) / 100;
    const months = Number(inputs.leaseTerm);
    const rate = Number(inputs.interestRate) / 100 / 12;
    const advance = Number(inputs.advancePayment) / 100;
    const financed = value * (1 - advance);
    const residualValue = value * residual;
    let monthlyPayment = 0;
    if (rate > 0) {
        monthlyPayment = (financed * rate * Math.pow(1 + rate, months) - residualValue * rate) / (Math.pow(1 + rate, months) - 1);
    }
    else {
        monthlyPayment = (financed - residualValue) / months;
    }
    const totalPaid = monthlyPayment * months + value * advance;
    const totalInterest = totalPaid - value;
    return [
        { value: Math.round(monthlyPayment * 100) / 100, label: 'Ежемесячный платёж', unit: '$' },
        { value: Math.round(totalPaid * 100) / 100, label: 'Всего выплачено', unit: '$' },
        { value: Math.round(totalInterest * 100) / 100, label: 'Переплата', unit: '$' }
    ];
},
  'marzhinalnost-kanalov': (inputs) => {
    const channel = String(inputs.channel);
    const revenue = Number(inputs.revenue);
    const productCost = Number(inputs.productCost) / 100;
    const commission = Number(inputs.commission) / 100;
    const delivery = Number(inputs.delivery);
    if (!revenue) {
        return [
            { value: '—', label: 'Валовая маржа (₽)' },
            { value: '—', label: 'Затраты канала (₽)' },
            { value: '—', label: 'Чистая маржа (₽)' },
            { value: '—', label: 'Рентабельность (%)' },
            { value: '', label: 'Оценка канала' }
        ];
    }
    const channelDefaults: Record<string, {
        commission: number;
        delivery: number;
    }> = {
        online: { commission: 0, delivery: 5000 },
        marketplace: { commission: 0.15, delivery: 0 },
        retail: { commission: 0.3, delivery: 0 },
        partners: { commission: 0.25, delivery: 3000 }
    };
    const defaults = channelDefaults[channel];
    const actualCommission = commission || defaults.commission;
    const actualDelivery = delivery || defaults.delivery;
    const grossMargin = revenue * (1 - productCost);
    const channelCosts = revenue * actualCommission + actualDelivery;
    const netMargin = grossMargin - channelCosts;
    const marginPercent = (netMargin / revenue) * 100;
    let assessment = '';
    if (marginPercent < 10) {
        assessment = '⚠️ Низкая рентабельность';
    }
    else if (marginPercent < 20) {
        assessment = '✅ Нормальная рентабельность';
    }
    else {
        assessment = '🌟 Высокая рентабельность';
    }
    return [
        { value: Math.round(grossMargin), label: 'Валовая маржа (₽)' },
        { value: Math.round(channelCosts), label: 'Затраты канала (₽)' },
        { value: Math.round(netMargin), label: 'Чистая маржа (₽)' },
        { value: Math.round(marginPercent * 10) / 10, label: 'Рентабельность (%)' },
        { value: assessment, label: 'Оценка канала' }
    ];
},
}
