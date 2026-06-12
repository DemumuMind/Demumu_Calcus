import type { ComputeFn } from './compute-helpers';

export const computeMap_other_other2_a_5: Record<string, ComputeFn> = {
  'korm-sobaki': (inputs) => {
    const weight = Number(inputs.weight);
    const _age = String(inputs.age);
    const activity = String(inputs.activity);
    const foodType = String(inputs.foodType);
    if (!weight) {
        return [
            { value: '—', label: 'Калории (ккал/день)' },
            { value: '—', label: 'Количество корма (г/день)' },
            { value: '—', label: 'Количество приёмов пищи' },
            { value: '—', label: 'Воды (мл/день)' }
        ];
    }
    const rer = 70 * Math.pow(weight, 0.75);
    const activityMultipliers: Record<string, number> = {
        low: 1.2,
        moderate: 1.6,
        high: 2.0,
        veryhigh: 3.0
    };
    const ageMultipliers: Record<string, number> = {
        puppy: 2.0,
        adult: 1.0,
        senior: 0.8
    };
    const totalCalories = rer * (activityMultipliers[activity] || 1.6) * (ageMultipliers[_age] || 1);
    const caloriesPerGram: Record<string, number> = {
        dry: 3.5,
        wet: 1.2,
        raw: 1.5,
        homemade: 1.3
    };
    const foodAmount = totalCalories / (caloriesPerGram[foodType] || 3.5);
    let meals = 2;
    if (_age === 'puppy') {
        meals = weight < 5 ? 4 : 3;
    }
    else if (_age === 'senior') {
        meals = 2;
    }
    const water = weight * 60;
    return [
        { value: Math.round(totalCalories), label: 'Калории (ккал/день)' },
        { value: Math.round(foodAmount), label: 'Количество корма (г/день)' },
        { value: meals, label: 'Количество приёмов пищи' },
        { value: Math.round(water), label: 'Воды (мл/день)' }
    ];
},
  'krysha-materialy': (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const overhang = Number(inputs.overhang);
    const waste = Number(inputs.waste);
    const area = (length + overhang * 2) * (width + overhang * 2);
    const materials = area * (1 + waste / 100);
    return [
        { value: Math.round(area * 100) / 100, label: 'Площадь крыши', unit: 'м²' },
        { value: Math.round(materials * 100) / 100, label: 'Материалов с запасом', unit: 'м²' }
    ];
},
  'lestnica-raschet': (inputs) => {
    const height = Number(inputs.height) * 100;
    const length = Number(inputs.length) * 100;
    const stepHeight = Number(inputs.stepHeight);
    const steps = Math.round(height / stepHeight);
    const actualHeight = height / steps;
    const depth = length / steps;
    const angle = Math.atan(height / length) * 180 / Math.PI;
    return [
        { value: steps, label: 'Количество ступеней' },
        { value: Math.round(actualHeight * 10) / 10, label: 'Высота ступени', unit: 'см' },
        { value: Math.round(depth * 10) / 10, label: 'Глубина ступени', unit: 'см' },
        { value: Math.round(angle * 10) / 10, label: 'Угол наклона', unit: '°' }
    ];
},
  'loyalty-cashback-calculator': (inputs): any => {
    const n = inputs as Record<string, number>;
    const baseCashback = inputs.monthlySpend * (inputs.cashbackPercent / 100);
    const multiplier = parseInt(inputs.bonusMultiplier);
    const monthlyCashback = Math.round(baseCashback * multiplier);
    const _annualCashback = monthlyCashback * 12;
    const _effectiveDiscount = Math.round(inputs.cashbackPercent * multiplier * 10) / 10;
    return [];
},
  'maternity-benefit-calculator': (inputs): any => {
    const salary = Number(inputs.salary);
    const daysAbsent = Number(inputs.daysAbsent);
    const workDays = 730 - daysAbsent;
    const dailyEarnings = salary * 24 / workDays;
    const dailyBenefit = Math.min(Math.max(dailyEarnings, 500), 2300); // min/max на 2025
    const maternityDays = 140; // обычные роды
    const totalBenefit = Math.round(dailyBenefit * maternityDays);
    const minBenefit = 70000; // примерно
    const maxBenefit = 322000; // примерно
    return [
        { value: Math.round(dailyBenefit), label: 'Пособие в день', unit: '₽' },
        { value: totalBenefit, label: 'Общая сумма декретных', unit: '₽' },
        { value: minBenefit, label: 'Минимальные декретные', unit: '₽' },
        { value: maxBenefit, label: 'Максимальные декретные', unit: '₽' }
    ];
},
  'na-skolko-procentov-bolshe-menshe': (inputs) => {
    const original = Number(inputs.originalValue);
    const newValue = Number(inputs.newValue);
    if (!original || original <= 0) {
        return [{ value: '—', label: 'Результат', additionalInfo: 'Исходное значение должно быть > 0' }];
    }
    const difference = ((newValue - original) / original) * 100;
    const absDifference = newValue - original;
    const multiplier = newValue / original;
    return [
        { value: (difference > 0 ? '+' : '') + difference.toFixed(2), label: 'Разница', unit: '%' },
        { value: (absDifference > 0 ? '+' : '') + absDifference.toFixed(2), label: 'Абсолютная разница' },
        { value: multiplier.toFixed(4), label: 'Во сколько раз' }
    ];
},
}
