import type { ComputeFn } from './compute-helpers';

export const computeMap_science_science_a_5: Record<string, ComputeFn> = {
  'npv-chistaya-stoimost': (inputs) => {
    const initial = Number(inputs.initial);
    const cashflow = Number(inputs.cashflow);
    const rate = Number(inputs.rate) / 100;
    const years = Number(inputs.years);
    let npv = -initial;
    for (let i = 1; i <= years; i++) {
        npv += cashflow / Math.pow(1 + rate, i);
    }
    const pi = (npv + initial) / initial;
    let decision = '';
    if (npv > 0) {
        decision = '✅ Проект выгоден (NPV > 0)';
    }
    else if (npv === 0) {
        decision = '⚠️ Проект безубыточен (NPV = 0)';
    }
    else {
        decision = '❌ Проект невыгоден (NPV < 0)';
    }
    return [
        { value: Math.round(npv), label: 'Чистая приведённая стоимость', unit: '₽' },
        { value: Math.round(pi * 100) / 100, label: 'Индекс прибыльности' },
        { value: decision, label: 'Инвестиционное решение' }
    ];
},
}
