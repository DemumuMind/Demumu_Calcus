import type { ComputeFn } from './compute-helpers';

export const computeMap_health_health2_b_3: Record<string, ComputeFn> = {
  'shagi-v-kilometry': (inputs) => {
    const steps = Number(inputs.steps) || 0;
    const height = Number(inputs.height) || 170;
    const gender = String(inputs.gender);
    if (!steps) {
        return [
            { value: '—', label: 'Длина шага', unit: 'см' },
            { value: '—', label: 'Расстояние', unit: 'км' },
            { value: '—', label: 'Расстояние', unit: 'миль' },
            { value: '—', label: 'Примерные калории', unit: 'ккал' },
            { value: '—', label: 'Примерное время', unit: 'мин' },
        ];
    }
    const stepLength = gender === 'female'
        ? height * 0.413
        : height * 0.415;
    const distanceM = (steps * stepLength) / 100;
    const distanceKm = distanceM / 1000;
    const distanceMiles = distanceKm * 0.621371;
    const calories = Math.round(steps * 0.04);
    const timeMinutes = Math.round(steps / 100);
    return [
        { value: Number(stepLength.toFixed(1)), label: 'Длина шага', unit: 'см' },
        { value: Number(distanceKm.toFixed(2)), label: 'Расстояние', unit: 'км' },
        { value: Number(distanceMiles.toFixed(2)), label: 'Расстояние', unit: 'миль' },
        { value: calories, label: 'Примерные калории', unit: 'ккал' },
        { value: timeMinutes, label: 'Примерное время', unit: 'мин' },
    ];
},
  'shkala-rpe': (inputs): any => {
    const n = inputs as Record<string, number>;
    const oneRM = Number(inputs.oneRM || 100);
    const targetRPE = Number(inputs.targetRPE || 8);
    const targetReps = Number(inputs.targetReps || 5);
    const rir = 10 - targetRPE;
    // Use Brzycki formula in reverse: Weight = 1RM × (1.0278 - 0.0278 × (reps + RIR))
    const weight = oneRM * (1.0278 - 0.0278 * (targetReps + rir));
    const percentage = Math.round(weight / oneRM * 100);
    let description = '';
    let usage = '';
    switch (targetRPE) {
        case 10:
            description = 'Максимальное усилие, мышечный отказ, невозможно сделать ещё один повтор';
            usage = 'Тестирование максимума, последний подход, соревнования';
            break;
        case 9.5:
            description = 'Очень тяжело, возможно ещё 1 повтор с большим риском';
            usage = 'Последние подходы в программе, пиковые нагрузки';
            break;
        case 9:
            description = 'Тяжело, но 1 повтор в запасе точно есть';
            usage = 'Рабочие подходы, оптимально для гипертрофии';
            break;
        case 8.5:
            description = 'Сложно, но контролируемо, 1-2 повтора в запасе';
            usage = 'Основные рабочие подходы';
            break;
        case 8:
            description = 'Умеренно сложно, 2 повтора в запасе';
            usage = 'Техничные работы, объёмные тренировки';
            break;
        case 7:
            description = 'Относительно легко, 3 повтора в запасе';
            usage = 'Разминочные подходы, deload, техника';
            break;
        case 6:
            description = 'Легко, 4+ повторов в запасе';
            usage = 'Разминка, новые упражнения, восстановление';
            break;
        default:
            description = 'Средняя интенсивность';
            usage = 'Тренировочные подходы';
    }
    return [
        { value: Math.round(weight), label: 'Рекомендуемый вес', unit: 'кг' },
        { value: rir, label: 'RIR (повторов в запасе)', unit: 'повт' },
        { value: percentage, label: '% от 1RM', unit: '%' },
        { value: description, label: 'Описание усилий' },
        { value: usage, label: 'Когда использовать' }
    ];
},
  'skolko-kalorij-szhigayetsya': (inputs) => {
    const weight = Number(inputs.weight);
    const activity = String(inputs.activity);
    const duration = Number(inputs.duration);
    const metValues: Record<string, number> = {
        'sleep': 0.95,
        'sit': 1.3,
        'walk_slow': 2.8,
        'walk_fast': 4.3,
        'jog': 8.3,
        'run': 10,
        'cycling': 6.8,
        'swimming': 8,
        'gym': 6,
        'hiit': 11,
        'yoga': 2.5,
        'dance': 5
    };
    const met = metValues[activity];
    const hours = duration / 60;
    // Formula: Calories = MET × weight(kg) × time(hours)
    const burned = met * weight * hours;
    const perHour = met * weight;
    return [
        {
            value: Math.round(burned),
            label: 'Сожжено за время активности',
            unit: 'ккал'
        },
        {
            value: Math.round(perHour),
            label: 'Сжигание в час',
            unit: 'ккал/ч'
        }
    ];
},
  'son-i-krasota': (inputs) => {
    const _age = Number(inputs.age || 30);
    const stressLevel = String(inputs.stressLevel || 'medium');
    const _exercise = String(inputs.exerciseFrequency || 'light');
    let optimalSleep = 8;
    if (_age < 25) {
        optimalSleep = 8.5;
    }
    else if (_age > 50) {
        optimalSleep = 7.5;
    }
    const stressAdjust: Record<string, number> = {
        low: 0, medium: 0.5, high: 1
    };
    optimalSleep += stressAdjust[stressLevel];
    const exerciseAdjust: Record<string, number> = {
        sedentary: 0, light: 0, moderate: 0.5, intense: 1
    };
    optimalSleep += exerciseAdjust[_exercise];
    // Beauty sleep window (22:00-02:00 is when growth hormone peaks)
    const beautySleep = '22:00-02:00 — время пика гормона роста, кожа активно восстанавливается';
    let skinRecovery = '';
    if (optimalSleep >= 8) {
        skinRecovery = 'Полное восстановление кожи за ночь';
    }
    else if (optimalSleep >= 7) {
        skinRecovery = 'Хорошее восстановление, но без запаса';
    }
    else {
        skinRecovery = 'Недостаточно времени для полного восстановления';
    }
    let darkCircles = '';
    if (optimalSleep < 7 || stressLevel === 'high') {
        darkCircles = 'Высокий риск — используйте крем с кофеином';
    }
    else if (optimalSleep < 8) {
        darkCircles = 'Средний риск — следите за гигиеной сна';
    }
    else {
        darkCircles = 'Низкий риск при соблюдении режима';
    }
    let recommendations = '';
    if (_exercise === 'intense') {
        recommendations = 'После интенсивных тренировок коже нужно больше времени на восстановление. Спите на шёлковой наволочке.';
    }
    else if (stressLevel === 'high') {
        recommendations = 'При стрессе страдает барьерная функция кожи. Используйте ночные восстанавливающие средства.';
    }
    else {
        recommendations = 'Ложитесь в 22:00-23:00 для максимального восстановления кожи.';
    }
    return [
        { value: Number(optimalSleep.toFixed(1)), label: 'Оптимальное время сна', unit: 'ч' },
        { value: beautySleep, label: 'Красивый сон (22:00-02:00)' },
        { value: skinRecovery, label: 'Время восстановления кожи' },
        { value: darkCircles, label: 'Риск тёмных кругов' },
        { value: recommendations, label: 'Рекомендации' }
    ];
},
  'spc-zashita': (inputs) => {
    const skinType = Number(inputs.skinType || 2);
    const uvIndex = String(inputs.uvIndex || 'moderate');
    const spfUsed = Number(inputs.spfUsed || 30);
    const activity = String(inputs.activity || 'normal');
    const baseBurnTimes: Record<number, number> = {
        1: 10, 2: 15, 3: 25, 4: 40, 5: 60, 6: 120
    };
    const uvMultipliers: Record<string, number> = {
        low: 2, moderate: 1, high: 0.6, veryhigh: 0.4, extreme: 0.25
    };
    const baseBurn = baseBurnTimes[skinType];
    const burnTimeWithoutSPF = Math.round(baseBurn * uvMultipliers[uvIndex]);
    // Protected time (in theory, but practical limits apply)
    // SPF protection is not linear and has practical limits
    const practicalLimit = 120; // 2 hours max effective protection
    const protectedTime = Math.min(Math.round(burnTimeWithoutSPF * spfUsed), practicalLimit);
    let reapplyEvery = 120;
    if (activity === 'swimming')
        reapplyEvery = 40;
    else if (activity === 'sports')
        reapplyEvery = 80;
    else
        reapplyEvery = 120;
    let recommendedSPF = 30;
    if (skinType <= 2 && (uvIndex === 'high' || uvIndex === 'veryhigh' || uvIndex === 'extreme')) {
        recommendedSPF = 50;
    }
    else if (uvIndex === 'extreme') {
        recommendedSPF = 50;
    }
    else if (skinType === 1) {
        recommendedSPF = 50;
    }
    const peakHours = 'Избегайте солнца с 11:00 до 16:00 — максимальный УФ-индекс';
    return [
        { value: burnTimeWithoutSPF, label: 'Время до ожога (без SPF)', unit: 'мин' },
        { value: protectedTime, label: 'Безопасное время (с SPF)', unit: 'мин' },
        { value: reapplyEvery, label: 'Обновлять SPF каждые', unit: 'мин' },
        { value: recommendedSPF, label: 'Рекомендуемый SPF' },
        { value: peakHours, label: 'Опасные часы' }
    ];
},
  'stoimost-kureniya': (inputs) => {
    const packsPerDay = Number(inputs.packsPerDay);
    const packPrice = Number(inputs.packPrice);
    const yearsSmoking = Number(inputs.yearsSmoking);
    const cigarettesPerPack = Number(inputs.cigarettesPerPack);
    const dailyCost = packsPerDay * packPrice;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = dailyCost * 365;
    const totalCost = yearlyCost * yearsSmoking;
    const cigarettesTotal = packsPerDay * cigarettesPerPack * 365 * yearsSmoking;
    // Средняя статистика: каждая сигарета сокращает жизнь на ~11 минут
    const lifeLostMinutes = cigarettesTotal * 11;
    const lifeLostDays = Math.floor(lifeLostMinutes / 1440);
    const lifeLostYears = (lifeLostDays / 365).toFixed(1);
    // Потенциальные накопления при инвестировании 5% годовых
    const interestRate = 0.05;
    let potentialSavings = 0;
    for (let i = 0; i < yearsSmoking; i++) {
        potentialSavings += yearlyCost * Math.pow(1 + interestRate, yearsSmoking - i - 1);
    }
    return [
        { value: dailyCost.toFixed(0), label: 'Затраты в день', unit: '₽' },
        { value: monthlyCost.toFixed(0), label: 'Затраты в месяц', unit: '₽' },
        { value: yearlyCost.toFixed(0), label: 'Затраты в год', unit: '₽' },
        { value: totalCost.toFixed(0), label: 'Общие затраты за всё время', unit: '₽' },
        { value: cigarettesTotal.toFixed(0), label: 'Всего выкурено сигарет', unit: 'шт' },
        { value: `${lifeLostDays} дней (${lifeLostYears} лет)`, label: 'Сокращение жизни' },
        { value: potentialSavings.toFixed(0), label: 'Возможные накопления', unit: '₽' }
    ];
},
  'sutochnaya-norma-kalorij': (inputs) => {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height);
    const _age = Number(inputs.age);
    const gender = String(inputs.gender);
    const activity = Number(inputs.activity);
    const goal = String(inputs.goal);
    let bmr = 0;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * _age) + 5;
    }
    else {
        bmr = (10 * weight) + (6.25 * height) - (5 * _age) - 161;
    }
    const tdee = bmr * activity;
    let target = tdee;
    let adjustment = '';
    if (goal === 'lose') {
        target = tdee - 500; // 500 cal deficit for ~0.5kg/week loss
        adjustment = 'дефицит 500 ккал для похудения';
    }
    else if (goal === 'gain') {
        target = tdee + 300; // 300 cal surplus for muscle gain
        adjustment = 'профицит 300 ккал для набора массы';
    }
    else {
        adjustment = 'поддержание текущего веса';
    }
    return [
        {
            value: Math.round(bmr),
            label: 'Базальный метаболизм (BMR)',
            unit: 'ккал/сутки'
        },
        {
            value: Math.round(tdee),
            label: 'Общая суточная норма (TDEE)',
            unit: 'ккал/сутки',
            additionalInfo: 'С учётом активности'
        },
        {
            value: Math.round(target),
            label: 'Целевая норма калорий',
            unit: 'ккал/сутки',
            additionalInfo: adjustment
        }
    ];
},
  'test-na-gibkost': (inputs) => {
    const gender = String(inputs.gender);
    const _age = Number(inputs.age);
    const reachDistance = Number(inputs.reachDistance);
    // Нормативы (примерные значения для стандартного теста)
    // Возрастные группы: до 19, 20-29, 30-39, 40-49, 50-59, 60+
    const norms: Record<string, Record<string, {
        excellent: number;
        good: number;
        average: number;
        below: number;
    }>> = {
        'male': {
            '19': { excellent: 40, good: 30, average: 20, below: 10 },
            '29': { excellent: 38, good: 28, average: 18, below: 8 },
            '39': { excellent: 35, good: 25, average: 15, below: 5 },
            '49': { excellent: 30, good: 20, average: 10, below: 0 },
            '59': { excellent: 25, good: 15, average: 5, below: -5 },
            '80': { excellent: 20, good: 10, average: 0, below: -10 }
        },
        'female': {
            '19': { excellent: 43, good: 33, average: 23, below: 13 },
            '29': { excellent: 41, good: 31, average: 21, below: 11 },
            '39': { excellent: 38, good: 28, average: 18, below: 8 },
            '49': { excellent: 33, good: 23, average: 13, below: 3 },
            '59': { excellent: 28, good: 18, average: 8, below: -2 },
            '80': { excellent: 23, good: 13, average: 3, below: -7 }
        }
    };
    let ageGroup = '80';
    if (_age <= 19)
        ageGroup = '19';
    else if (_age <= 29)
        ageGroup = '29';
    else if (_age <= 39)
        ageGroup = '39';
    else if (_age <= 49)
        ageGroup = '49';
    else if (_age <= 59)
        ageGroup = '59';
    const norm = norms[gender][ageGroup];
    let rating = '';
    let percentile = '';
    if (reachDistance >= norm.excellent) {
        rating = 'Отлично';
        percentile = '90-100%';
    }
    else if (reachDistance >= norm.good) {
        rating = 'Хорошо';
        percentile = '75-90%';
    }
    else if (reachDistance >= norm.average) {
        rating = 'Средне';
        percentile = '50-75%';
    }
    else if (reachDistance >= norm.below) {
        rating = 'Ниже среднего';
        percentile = '25-50%';
    }
    else {
        rating = 'Требует улучшения';
        percentile = 'Ниже 25%';
    }
    const target = norm.good;
    let _recommendation = '';
    if (rating === 'Требует улучшения') {
        _recommendation = 'Рекомендуется ежедневная растяжка задней поверхности бедра и спины. Начните с 10 минут в день.';
    }
    else if (rating === 'Ниже среднего') {
        _recommendation = 'Улучшите гибкость регулярными упражнениями на растяжку 3-4 раза в неделю.';
    }
    else if (rating === 'Средне') {
        _recommendation = 'Хороший результат! Поддерживайте гибкость регулярной растяжкой.';
    }
    else {
        _recommendation = 'Отличная гибкость! Продолжайте текущую программу тренировок.';
    }
    return [
        { value: reachDistance.toFixed(1), label: 'Результат', unit: 'см' },
        { value: rating, label: 'Оценка' },
        { value: percentile, label: 'Процентиль' },
        { value: `${target} см`, label: 'Целевой показатель' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
}
