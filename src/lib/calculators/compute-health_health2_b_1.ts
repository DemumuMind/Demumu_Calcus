import type { ComputeFn } from './compute-helpers';

export const computeMap_health_health2_b_1: Record<string, ComputeFn> = {
  'metabolicheskij-vozrast': (inputs) => {
    const _age = Number(inputs.age);
    const bmr = Number(inputs.bmr);
    const gender = String(inputs.gender);
    if (!_age || !bmr)
        return [{ value: '—', label: 'Результат' }];
    // Средний BMR по возрасту и полу (примерные данные)
    const averageBMR: Record<string, Record<number, number>> = {
        'male': {
            20: 1800, 25: 1750, 30: 1700, 35: 1650, 40: 1600,
            45: 1550, 50: 1500, 55: 1450, 60: 1400, 65: 1350
        },
        'female': {
            20: 1400, 25: 1350, 30: 1300, 35: 1250, 40: 1200,
            45: 1150, 50: 1100, 55: 1050, 60: 1000, 65: 950
        }
    };
    const ages = Object.keys(averageBMR[gender]).map(Number);
    const closestAge = ages.reduce((prev, curr) => Math.abs(curr - _age) < Math.abs(prev - _age) ? curr : prev);
    const avgBMR = averageBMR[gender][closestAge];
    // Метаболический возраст оцениваем на основе разницы BMR
    const bmrDifference = bmr - avgBMR;
    const ageAdjustment = Math.round(bmrDifference / 100 * 5);
    const metabolicAge = Math.max(10, _age - ageAdjustment);
    const difference = metabolicAge - _age;
    let differenceText = '';
    if (difference < 0) {
        differenceText = `На ${Math.abs(difference)} лет моложе`;
    }
    else if (difference > 0) {
        differenceText = `На ${difference} лет старше`;
    }
    else {
        differenceText = 'Совпадает';
    }
    let interpretation = '';
    if (difference <= -5) {
        interpretation = 'Отличный метаболизм! Высокий BMR указывает на хорошую мышечную массу и активный образ жизни.';
    }
    else if (difference < 0) {
        interpretation = 'Хороший метаболизм. Ваше тело функционирует эффективнее среднего показателя.';
    }
    else if (difference === 0) {
        interpretation = 'Метаболизм соответствует среднему для вашего возраста.';
    }
    else if (difference <= 5) {
        interpretation = 'Метаболизм ниже среднего. Рекомендуется увеличить физическую активность и силовые тренировки.';
    }
    else {
        interpretation = 'Метаболизм значительно ниже среднего. Рекомендуется консультация врача и разработка плана по улучшению метаболизма.';
    }
    return [
        { value: metabolicAge.toString(), label: 'Метаболический возраст', unit: 'лет' },
        { value: differenceText, label: 'Разница с хронологическим' },
        { value: interpretation, label: 'Интерпретация' }
    ];
},
  'norma-belka': (inputs) => {
    const weight = Number(inputs.weight);
    const activity = String(inputs.activityLevel);
    const goal = String(inputs.goal);
    let multiplier = 0.8;
    if (activity === 'moderate')
        multiplier = 1.2;
    else if (activity === 'active')
        multiplier = 1.6;
    else if (activity === 'athlete')
        multiplier = 2.0;
    if (goal === 'muscle')
        multiplier += 0.3;
    if (goal === 'fatloss')
        multiplier += 0.2;
    const proteinMin = weight * 0.8;
    const proteinMax = weight * multiplier;
    const perMeal = proteinMax / 5;
    return [
        { value: Math.round(proteinMin), label: 'Минимум белка', unit: 'г' },
        { value: Math.round(proteinMax), label: 'Оптимум белка', unit: 'г' },
        { value: Math.round(perMeal), label: 'На приём пищи (5x)', unit: 'г' }
    ];
},
  'norma-uglevodov': (inputs) => {
    const weight = Number(inputs.weight);
    const activityLevel = String(inputs.activityLevel);
    const goal = String(inputs.goal);
    if (!weight) {
        return [{ value: '—', label: 'Результат' }];
    }
    let carbsPerKg = 4;
    switch (activityLevel) {
        case 'low':
            carbsPerKg = 3;
            break;
        case 'moderate':
            carbsPerKg = 4;
            break;
        case 'high':
            carbsPerKg = 5;
            break;
        case 'very_high':
            carbsPerKg = 7;
            break;
    }
    let dailyCarbs = weight * carbsPerKg;
    switch (goal) {
        case 'lose':
            dailyCarbs *= 0.8;
            break; // -20%
        case 'gain':
            dailyCarbs *= 1.2;
            break; // +20%
    }
    const carbsPerMeal = dailyCarbs / 3; // 3 приёма пищи
    const caloriesFromCarbs = dailyCarbs * 4; // 1г углеводов = 4 ккал
    const totalCalories = weight * 30; // примерно
    const percentage = (caloriesFromCarbs / totalCalories) * 100;
    return [
        { value: Math.round(dailyCarbs).toString(), label: 'Углеводов в день', unit: 'г' },
        { value: Math.round(carbsPerMeal).toString(), label: 'В среднем за приём пищи', unit: 'г' },
        { value: percentage.toFixed(0), label: '% от калорий', unit: '%' }
    ];
},
  'norma-vody': (inputs) => {
    const weight = Number(inputs.weight);
    const activity = Number(inputs.activity);
    const climate = Number(inputs.climate);
    if (!weight)
        return [{ value: '—', label: 'Результат' }];
    const baseWater = weight * 35;
    const adjustedWater = Math.round(baseWater * activity * climate);
    const glasses = Math.ceil(adjustedWater / 250);
    return [
        { value: baseWater.toString(), label: 'Базовая норма', unit: 'мл' },
        { value: adjustedWater.toString(), label: 'С учётом активности', unit: 'мл' },
        { value: glasses.toString(), label: 'Стаканов (250 мл)', unit: 'шт' },
        { value: `Пейте равномерно в течение дня`, label: 'Рекомендация' }
    ];
},
  'obyom-trenirovki': (inputs): any => {
    const n = inputs as Record<string, number>;
    const exercises = Number(inputs.exercises || 5);
    const setsPerExercise = Number(inputs.setsPerExercise || 4);
    const repsPerSet = Number(inputs.repsPerSet || 10);
    const avgWeight = Number(inputs.avgWeight || 50);
    const totalSets = exercises * setsPerExercise;
    const totalReps = totalSets * repsPerSet;
    const volume = totalReps * avgWeight;
    let intensity = '';
    if (repsPerSet <= 5) {
        intensity = 'Высокая (силовая, низкое число повторов)';
    }
    else if (repsPerSet <= 12) {
        intensity = 'Средняя (гипертрофия, классический диапазон)';
    }
    else {
        intensity = 'Низкая (выносливость, высокое число повторов)';
    }
    let _recommendation = '';
    if (totalSets > 30) {
        _recommendation = '⚠️ Очень высокий объём! Риск перетренированности. Снизьте до 20-25 подходов.';
    }
    else if (totalSets < 12) {
        _recommendation = 'Низкий объём. Добавьте упражнений или подходов для прогресса.';
    }
    else {
        _recommendation = '✓ Оптимальный объём для роста (12-25 подходов на группу за тренировку).';
    }
    return [
        { value: totalSets, label: 'Всего подходов', unit: 'подх' },
        { value: totalReps, label: 'Всего повторов', unit: 'раз' },
        { value: volume, label: 'Объём тренировки', unit: 'кг' },
        { value: intensity, label: 'Интенсивность' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
  'odnopovtornyj-maksimum': (inputs): any => {
    const n = inputs as Record<string, number>;
    const weight = Number(inputs.weight || 80);
    const _reps = Number(inputs.reps || 8);
    const _exercise = String(inputs.exercise || 'bench');
    if (_reps === 1) {
        return [
            { value: weight, label: 'Бриzycki (самая точная)', unit: 'кг' },
            { value: weight, label: 'Эпли', unit: 'кг' },
            { value: weight, label: 'Ломбарди', unit: 'кг' },
            { value: weight, label: 'Среднее значение', unit: 'кг' },
            { value: '100% = твой максимум', label: 'Проценты от 1RM' }
        ];
    }
    // Brzycki formula: 1RM = weight / (1.0278 - 0.0278 × _reps)
    const brzycki = weight / (1.0278 - 0.0278 * _reps);
    const epley = weight * (1 + _reps / 30);
    const lombardi = weight * Math.pow(_reps, 0.10);
    const average = Math.round((brzycki + epley + lombardi) / 3);
    const percentages = '95%=' + Math.round(average * 0.95) + ' | 90%=' + Math.round(average * 0.90) + ' | 85%=' + Math.round(average * 0.85) + ' | 80%=' + Math.round(average * 0.80) + ' | 75%=' + Math.round(average * 0.75) + ' кг';
    return [
        { value: Math.round(brzycki), label: 'Бриzycki (самая точная)', unit: 'кг' },
        { value: Math.round(epley), label: 'Эпли', unit: 'кг' },
        { value: Math.round(lombardi), label: 'Ломбарди', unit: 'кг' },
        { value: average, label: 'Среднее значение', unit: 'кг' },
        { value: percentages, label: 'Проценты от 1RM' }
    ];
},
  'otnoshenie-talii-bedra': (inputs) => {
    const waist = Number(inputs.waist);
    const hip = Number(inputs.hip);
    const gender = String(inputs.gender);
    if (!waist || !hip)
        return [{ value: '—', label: 'Результат' }];
    const whr = waist / hip;
    let riskCategory = '';
    let healthRisk = '';
    if (gender === 'male') {
        if (whr < 0.9) {
            riskCategory = 'Низкий риск';
            healthRisk = 'Минимальный риск сердечно-сосудистых заболеваний и диабета 2 типа';
        }
        else if (whr < 1.0) {
            riskCategory = 'Умеренный риск';
            healthRisk = 'Повышенный риск метаболических заболеваний';
        }
        else {
            riskCategory = 'Высокий риск';
            healthRisk = 'Значительно повышенный риск инфаркта, инсульта, диабета 2 типа';
        }
    }
    else {
        if (whr < 0.8) {
            riskCategory = 'Низкий риск';
            healthRisk = 'Минимальный риск сердечно-сосудистых заболеваний и диабета 2 типа';
        }
        else if (whr < 0.85) {
            riskCategory = 'Умеренный риск';
            healthRisk = 'Повышенный риск метаболических заболеваний';
        }
        else {
            riskCategory = 'Высокий риск';
            healthRisk = 'Значительно повышенный риск инфаркта, инсульта, диабета 2 типа';
        }
    }
    const idealWaist = gender === 'male'
        ? `Менее ${Math.round(hip * 0.9)} см`
        : `Менее ${Math.round(hip * 0.8)} см`;
    return [
        { value: whr.toFixed(2), label: 'Индекс WHR' },
        { value: riskCategory, label: 'Категория риска' },
        { value: healthRisk, label: 'Оценка риска заболеваний' },
        { value: idealWaist, label: 'Рекомендуемый обхват талии' }
    ];
},
  'ovulyaciya': (inputs) => {
    const lastPeriod = new Date(String(inputs.lastPeriod));
    const cycleLength = Number(inputs.cycleLength) || 28;
    if (!lastPeriod || isNaN(lastPeriod.getTime())) {
        return [{ value: 'Введите дату', label: 'Результат' }];
    }
    // Овуляция обычно за 14 дней до следующей менструации
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);
    // Фертильное окно: 5 дней до овуляции + 1 день после
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    };
    return [
        { value: formatDate(ovulationDate), label: 'Овуляция' },
        { value: formatDate(fertileStart), label: 'Начало фертильного окна' },
        { value: formatDate(fertileEnd), label: 'Конец фертильного окна' },
        { value: formatDate(nextPeriod), label: 'Следующая менструация' }
    ];
},
  'pishhevaya-allergiya': (inputs) => {
    const _age = Number(inputs.age);
    const symptoms = String(inputs.symptoms);
    const time = String(inputs.reactionTime);
    let prob = 'Низкая';
    if (symptoms === 'severe')
        prob = 'Высокая';
    else if (symptoms === 'moderate' && time === 'immediate')
        prob = 'Высокая';
    else if (symptoms === 'moderate')
        prob = 'Средняя';
    else if (symptoms === 'mild' && time === 'immediate')
        prob = 'Средняя';
    let rec = 'Наблюдение';
    if (prob === 'Высокая')
        rec = 'Немедленно обратитесь к аллергологу. Исключите продукт полностью.';
    else if (prob === 'Средняя')
        rec = 'Запишитесь к аллергологу. Ведите дневник питания.';
    else if (prob === 'Низкая')
        rec = 'Продолжайте наблюдение. Возможно непереносимость, не аллергия.';
    let tests = 'Нет';
    if (prob !== 'Низкая')
        tests = 'Кожные пробы, IgE анализ крови, оральная провокация';
    return [
        { value: prob, label: 'Вероятность аллергии' },
        { value: rec, label: 'Рекомендации' },
        { value: tests, label: 'Рекомендуемые тесты' }
    ];
},
  'prikorm-dlya-malysha': (inputs) => {
    const birthStr = String(inputs.birthDate);
    const feedingType = String(inputs.feedingType);
    if (!birthStr)
        return [{ value: 0, label: 'Возраст', unit: 'мес' }, { value: '—', label: 'Можно вводить' }, { value: '—', label: 'Следующий этап' }];
    const birth = new Date(birthStr);
    const today = new Date();
    const ageDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const _ageMonths = Math.floor(ageDays / 30.44);
    const startAge = feedingType === 'breast' ? 6 : 4;
    let readyFoods = '';
    let nextFoods = '';
    if (_ageMonths < startAge) {
        readyFoods = 'Только молоко/адаптированная смесь';
        nextFoods = `Прикорм с ${startAge} месяцев`;
    }
    else if (_ageMonths < 7) {
        readyFoods = 'Безглютеновые каши, овощное пюре';
        nextFoods = 'Мясное пюре (с 7 мес)';
    }
    else if (_ageMonths < 8) {
        readyFoods = 'Каши, овощи, мясо (кролик, индейка)';
        nextFoods = 'Фруктовое пюре, творог (с 8 мес)';
    }
    else if (_ageMonths < 10) {
        readyFoods = 'Все овощи, мясо, фрукты, творог, яичный желток';
        nextFoods = 'Рыба, кефир (с 10 мес)';
    }
    else {
        readyFoods = 'Все продукты (пюре, кусочками)';
        nextFoods = 'Меню приближается к семейному';
    }
    return [
        { value: _ageMonths, label: 'Возраст', unit: 'мес' },
        { value: readyFoods, label: 'Можно вводить' },
        { value: nextFoods, label: 'Следующий этап' }
    ];
},
  'procent-zhira': (inputs) => {
    const gender = String(inputs.gender);
    const height = Number(inputs.height);
    const neck = Number(inputs.neck);
    const waist = Number(inputs.waist);
    const hip = Number(inputs.hip);
    if (!height || !neck || !waist)
        return [{ value: '—', label: 'Результат' }];
    let bodyFat = 0;
    if (gender === 'male') {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    }
    else {
        if (!hip)
            return [{ value: 'Введите обхват бёдер', label: 'Результат' }];
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
    }
    bodyFat = Math.max(2, Math.min(60, bodyFat)); // Ограничение
    const weight = gender === 'male' ? 75 : 60;
    const fatMass = (weight * bodyFat / 100).toFixed(1);
    const leanMass = (weight - Number(fatMass)).toFixed(1);
    let category = '';
    if (gender === 'male') {
        if (bodyFat < 6)
            category = 'Спортивная форма';
        else if (bodyFat < 14)
            category = 'Хорошая форма';
        else if (bodyFat < 18)
            category = 'Средний уровень';
        else if (bodyFat < 25)
            category = 'Выше среднего';
        else
            category = 'Ожирение';
    }
    else {
        if (bodyFat < 14)
            category = 'Спортивная форма';
        else if (bodyFat < 21)
            category = 'Хорошая форма';
        else if (bodyFat < 25)
            category = 'Средний уровень';
        else if (bodyFat < 32)
            category = 'Выше среднего';
        else
            category = 'Ожирение';
    }
    return [
        { value: bodyFat.toFixed(1), label: 'Процент жира', unit: '%' },
        { value: fatMass, label: 'Масса жира', unit: 'кг' },
        { value: leanMass, label: 'Мышечная масса', unit: 'кг' },
        { value: category, label: 'Категория' }
    ];
},
}
