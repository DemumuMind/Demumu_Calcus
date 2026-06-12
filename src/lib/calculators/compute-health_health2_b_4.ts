import type { ComputeFn } from './compute-helpers';

export const computeMap_health_health2_b_4: Record<string, ComputeFn> = {
  'tsikly-sna': (inputs) => {
    const bedtimeStr = String(inputs.bedtime || '23:00');
    const fallAsleep = Number(inputs.fallAsleepMinutes) || 15;
    const [hours, minutes] = bedtimeStr.split(':').map(Number);
    const bedtimeMinutes = (hours || 0) * 60 + (minutes || 0);
    const sleepStart = bedtimeMinutes + fallAsleep;
    const formatTime = (totalMinutes: number) => {
        const h = Math.floor(totalMinutes / 60) % 24;
        const m = Math.floor(totalMinutes % 60);
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };
    const cycles = [4, 5, 6, 7];
    const results = cycles.map(c => {
        const wakeMinutes = sleepStart + c * 90;
        return formatTime(wakeMinutes);
    });
    return [
        { value: results[0], label: '4 цикла (6 ч) — минимум' },
        { value: results[1], label: '5 циклов (7,5 ч) — норма' },
        { value: results[2], label: '6 циклов (9 ч) — оптимум' },
        { value: results[3], label: '7 циклов (10,5 ч) — много' },
        { value: 'Для большинства взрослых оптимально 5–6 циклов (7,5–9 часов). Пробуждение в конце цикла помогает чувствовать себя бодрее.', label: 'Рекомендация' }
    ];
},
  'vitaminy-krasoty': (inputs) => {
    const _age = Number(inputs.age || 30);
    const goal = String(inputs.mainGoal || 'complex');
    const concern = String(inputs.specificConcern || 'dullness');
    const diet = String(inputs.diet || 'balanced');
    let vitaminA = '700-900 мкг (каротиноиды) — морковь, тыква, шпинат';
    let vitaminC = '75-90 мг — цитрусовые, киви, болгарский перец';
    let vitaminE = '15 мг — орехи, семена, авокадо, растительные масла';
    let biotin = '30-50 мкг — яйца, орехи, семена';
    let omega3 = '1-2 г EPA+DHA — жирная рыба 2 раза в неделю или добавки';
    let zinc = '8-11 мг — мясо, семечки, бобовые';
    let collagen = '5-10 г пептидов коллагена ежедневно';
    if (_age > 40) {
        vitaminC = '100-200 мг (повышенная доза для антиоксидантной защиты)';
        vitaminE = '15-20 мг — сильнее антиоксидантная поддержка';
        collagen = '10 г коллагена (с 40 лет синтез снижается)';
    }
    if (goal === 'skin' || goal === 'antiage') {
        vitaminC = '200 мг + местно (сыворотка 10-15%)';
        vitaminE = '20 мг — в тандеме с витамином C';
        vitaminA = 'Ретинол в уходе (вечером), бета-каротин в питании';
    }
    if (goal === 'hair' || goal === 'complex') {
        biotin = '50-100 мкг — для волос и ногтей';
        zinc = '15-25 мг (при выпадении волос)';
        omega3 = '2-3 г — для блеска волос и здоровья кожи';
    }
    if (concern === 'acne') {
        zinc = '25-30 мг (цинк снижает воспаление и себум)';
        vitaminA = 'Ретиноиды — золотой стандарт лечения акне';
        omega3 = '2-3 г — противовоспалительный эффект';
    }
    else if (concern === 'wrinkles') {
        collagen = '10 г + гиалуроновая кислота 100-200 мг';
        vitaminC = '200 мг — обязательно для синтеза коллагена';
    }
    else if (concern === 'hairloss') {
        biotin = '100 мкг';
        zinc = '15-25 мг';
        omega3 = '2-3 г';
        collagen = '10 г — аминокислоты для волос';
    }
    else if (concern === 'brittle') {
        biotin = '100 мкг';
        zinc = '15 мг';
    }
    if (diet === 'vegan') {
        omega3 = '2-3 г от льняного/альгинового масла (растительная форма)';
        biotin = '50-100 мкг (яйца исключены)';
        zinc = '15-20 мг из бобовых, семечек, орехов';
    }
    else if (diet === 'vegetarian') {
        omega3 = '2 г или добавки (рыба исключена)';
    }
    let complexRec = '';
    if (goal === 'complex' && _age < 35) {
        complexRec = 'Базовый комплекс: мультивитамин + Омега-3 + Коллаген 5г';
    }
    else if (goal === 'complex' && _age >= 35) {
        complexRec = 'Антивозрастной комплекс: мультивитамин + Омега-3 + Коллаген 10г + Витамин C 200мг + Коэнзим Q10';
    }
    else if (goal === 'skin') {
        complexRec = 'Для кожи: Витамины A,C,E + Цинк + Омега-3 + Коллаген';
    }
    else if (goal === 'hair') {
        complexRec = 'Для волос: Биотин + Цинк + Железо + Омега-3 + Коллаген';
    }
    else if (goal === 'antiage') {
        complexRec = 'Антивозрастной: Витамин C,E + Ресвератрол + Коллаген + Гиалуроновая кислота + Коэнзим Q10';
    }
    return [
        { value: vitaminA, label: 'Витамин A (ретинол)' },
        { value: vitaminC, label: 'Витамин C' },
        { value: vitaminE, label: 'Витамин E' },
        { value: biotin, label: 'Биотин (B7)' },
        { value: omega3, label: 'Омега-3' },
        { value: zinc, label: 'Цинк' },
        { value: collagen, label: 'Коллаген' },
        { value: complexRec, label: 'Комплексная рекомендация' }
    ];
},
  'vo2-maksimum': (inputs) => {
    const testType = String(inputs.testType);
    const gender = String(inputs.gender);
    const _age = Number(inputs.age);
    const weight = Number(inputs.weight);
    const distance = Number(inputs.distance);
    const heartRate = Number(inputs.heartRate) || 0;
    if (!_age || !weight || !distance) {
        return [{ value: 'Заполните обязательные поля', label: 'Результат' }];
    }
    let vo2max = 0;
    if (testType === 'cooper') {
        // Тест Купера: VO2max = (distance − 504.9) / 44.73
        vo2max = (distance - 504.9) / 44.73;
    }
    else {
        // Тест Рокпорта: VO2max = 132.853 − 0.0769×вес − 0.3877×возраст + 6.315×пол − 3.2649×время − 0.1565×пульс
        // Упрощённая формула: пол = 1 для мужчин, 0 для женщин
        const genderFactor = gender === 'male' ? 1 : 0;
        const time = distance / 100; // Примерное время в минутах
        vo2max = 132.853 - 0.0769 * weight - 0.3877 * _age + 6.315 * genderFactor - 3.2649 * time - 0.1565 * heartRate;
    }
    vo2max = Math.max(0, vo2max);
    let fitnessLevel = '';
    let percentile = '';
    if (gender === 'male') {
        if (vo2max < 25) {
            fitnessLevel = 'Очень низкий';
            percentile = 'Ниже 10%';
        }
        else if (vo2max < 30) {
            fitnessLevel = 'Низкий';
            percentile = '10-25%';
        }
        else if (vo2max < 35) {
            fitnessLevel = 'Ниже среднего';
            percentile = '25-50%';
        }
        else if (vo2max < 40) {
            fitnessLevel = 'Средний';
            percentile = '50-75%';
        }
        else if (vo2max < 45) {
            fitnessLevel = 'Хороший';
            percentile = '75-90%';
        }
        else if (vo2max < 50) {
            fitnessLevel = 'Отличный';
            percentile = '90-95%';
        }
        else {
            fitnessLevel = 'Превосходный';
            percentile = 'Выше 95%';
        }
    }
    else {
        if (vo2max < 20) {
            fitnessLevel = 'Очень низкий';
            percentile = 'Ниже 10%';
        }
        else if (vo2max < 25) {
            fitnessLevel = 'Низкий';
            percentile = '10-25%';
        }
        else if (vo2max < 30) {
            fitnessLevel = 'Ниже среднего';
            percentile = '25-50%';
        }
        else if (vo2max < 35) {
            fitnessLevel = 'Средний';
            percentile = '50-75%';
        }
        else if (vo2max < 40) {
            fitnessLevel = 'Хороший';
            percentile = '75-90%';
        }
        else if (vo2max < 45) {
            fitnessLevel = 'Отличный';
            percentile = '90-95%';
        }
        else {
            fitnessLevel = 'Превосходный';
            percentile = 'Выше 95%';
        }
    }
    let _recommendation = '';
    if (vo2max < 30) {
        _recommendation = 'Рекомендуется начать с регулярных прогулок и лёгкого бега 3 раза в неделю.';
    }
    else if (vo2max < 40) {
        _recommendation = 'Хороший результат! Для улучшения добавьте интервальные тренировки.';
    }
    else {
        _recommendation = 'Отличный результат! Поддерживайте текущий уровень с регулярными кардиотренировками.';
    }
    return [
        { value: vo2max.toFixed(1), label: 'VO₂ max', unit: 'мл/кг/мин' },
        { value: fitnessLevel, label: 'Уровень физподготовки' },
        { value: percentile, label: 'Процентиль' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
  'voda-dlya-kozhi': (inputs) => {
    const weight = Number(inputs.weight || 65);
    const activity = String(inputs.activity || 'light');
    const climate = String(inputs.climate || 'moderate');
    const skinType = String(inputs.skinType || 'normal');
    let water = weight * 33;
    const activityMult: Record<string, number> = {
        sedentary: 1, light: 1.1, moderate: 1.2, active: 1.4
    };
    water *= activityMult[activity];
    const climateAdjust: Record<string, number> = {
        cold: -200, moderate: 0, hot: 500
    };
    water += climateAdjust[climate];
    if (skinType === 'dry') {
        water += 300;
    }
    const glasses = Math.ceil(water / 250);
    let skinHydration = '';
    if (water >= 2500) {
        skinHydration = '✓ Отличное увлажнение для всех типов кожи';
    }
    else if (water >= 2000) {
        skinHydration = skinType === 'dry' ? '⚠ Минимум для сухой кожи' : '✓ Хорошее увлажнение';
    }
    else {
        skinHydration = '⚠ Недостаточно для здоровой кожи';
    }
    const schedule = `Утро: ${Math.ceil(glasses * 0.25)} стакана | День: ${Math.ceil(glasses * 0.45)} стакана | Вечер: ${Math.ceil(glasses * 0.25)} стакана (до 20:00)`;
    return [
        { value: Math.round(water), label: 'Воды в день', unit: 'мл' },
        { value: glasses, label: 'Стаканов (250 мл)', unit: 'шт' },
        { value: skinHydration, label: 'Уровень увлажнения' },
        { value: schedule, label: 'График питья' }
    ];
},
  'voda-s-uchetom-aktivnosti': (inputs) => {
    const weight = Number(inputs.weight);
    const exerciseMinutes = Number(inputs.exerciseMinutes);
    const exerciseIntensity = String(inputs.exerciseIntensity);
    const climate = String(inputs.climate);
    const altitude = Number(inputs.altitude);
    const baseWater = weight * 35;
    // Дополнительно для тренировок: 400-800 мл в час в зависимости от интенсивности
    let waterPerHour = 500;
    if (exerciseIntensity === 'low')
        waterPerHour = 400;
    else if (exerciseIntensity === 'high')
        waterPerHour = 800;
    const exerciseWater = (exerciseMinutes / 60) * waterPerHour;
    let climateWater = 0;
    if (climate === 'cold')
        climateWater = -200;
    else if (climate === 'hot')
        climateWater = 500;
    // Высота: +300-500 мл на каждые 1000 м над уровнем моря
    const altitudeWater = altitude > 1500 ? Math.floor(altitude / 1000) * 400 : 0;
    const totalWater = Math.round(baseWater + exerciseWater + climateWater + altitudeWater);
    const glasses = Math.round(totalWater / 250);
    return [
        { value: Math.round(baseWater), label: 'Базовая потребность', unit: 'мл' },
        { value: Math.round(exerciseWater), label: 'Дополнительно для тренировок', unit: 'мл' },
        { value: climateWater, label: 'Корректировка по климату', unit: 'мл' },
        { value: altitudeWater, label: 'Корректировка по высоте', unit: 'мл' },
        { value: totalWater, label: 'Итого воды в день', unit: 'мл' },
        { value: glasses, label: 'Примерно стаканов (250 мл)', unit: 'стаканов' }
    ];
},
  'vremya-otdyha': (inputs): any => {
    const n = inputs as Record<string, number>;
    const intensity = Number(inputs.intensity || 80);
    const _reps = Number(inputs.reps || 8);
    const goal = String(inputs.goal || 'hypertrophy');
    const exerciseType = String(inputs.exerciseType || 'compound');
    let baseRest = 120; // seconds
    switch (goal) {
        case 'strength':
            baseRest = 180; // 3-5 minutes
            break;
        case 'hypertrophy':
            baseRest = 90; // 1.5-2 minutes
            break;
        case 'endurance':
            baseRest = 60; // 1 minute
            break;
        case 'conditioning':
            baseRest = 45; // 30-45 seconds
            break;
    }
    if (intensity >= 90) {
        baseRest += 60;
    }
    else if (intensity <= 60) {
        baseRest -= 30;
    }
    if (exerciseType === 'isolation') {
        baseRest -= 30;
    }
    else if (exerciseType === 'machine') {
        baseRest -= 15;
    }
    const minTime = Math.max(30, baseRest - 30);
    const maxTime = baseRest + 60;
    let restTimeText = '';
    if (goal === 'strength') {
        restTimeText = '3-5 минут (полное восстановление АТФ)';
    }
    else if (goal === 'hypertrophy') {
        restTimeText = '1.5-2 минуты (баланс восстановления и метаболического стресса)';
    }
    else if (goal === 'endurance') {
        restTimeText = '45-60 секунд (неполное восстановление для выносливости)';
    }
    else {
        restTimeText = '30-45 секунд (поддержание высокого пульса)';
    }
    const heartRate = goal === 'conditioning'
        ? 'Не дожидаться полного восстановления (пульс >100)'
        : `Дождаться снижения пульса до 100-110 уд/мин или ${Math.round(minTime / 60)} минут`;
    let tips = '';
    if (goal === 'strength') {
        tips = 'Отдыхайте полностью между тяжёлыми подходами. Мышечная усталость не должна мешать выполнению следующего подхода.';
    }
    else if (goal === 'hypertrophy') {
        tips = 'Слишком долгий отдых снижает метаболический стресс. Слишком короткий — не даёт восстановиться для следующего качественного подхода.';
    }
    else if (goal === 'conditioning') {
        tips = 'Циркулярные тренировки — минимум отдыха для поддержания высокого пульса и сжигания калорий.';
    }
    return [
        { value: restTimeText, label: 'Время отдыха' },
        { value: minTime, label: 'Минимум', unit: 'сек' },
        { value: maxTime, label: 'Максимум', unit: 'сек' },
        { value: heartRate, label: 'Целевой пульс' },
        { value: tips, label: 'Советы' }
    ];
},
}
