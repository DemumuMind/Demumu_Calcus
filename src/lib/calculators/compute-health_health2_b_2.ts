import type { ComputeFn } from './compute-helpers';

export const computeMap_health_health2_b_2: Record<string, ComputeFn> = {
  'procent-zhira-vms-ssha': (inputs) => {
    const gender = String(inputs.gender);
    const height = Number(inputs.height);
    const neck = Number(inputs.neck);
    const waist = Number(inputs.waist);
    const hip = Number(inputs.hip);
    if (!height || !neck || !waist) {
        return [{ value: 'Заполните обязательные поля', label: 'Результат' }];
    }
    let bodyFat = 0;
    if (gender === 'male') {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    }
    else {
        const hipValue = hip > 0 ? hip : waist * 1.1;
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hipValue - neck) + 0.221 * Math.log10(height)) - 450;
    }
    bodyFat = Math.max(2, Math.min(60, bodyFat));
    let category = '';
    if (gender === 'male') {
        if (bodyFat < 6)
            category = 'Эссенциальный жир (спортсмены)';
        else if (bodyFat < 14)
            category = 'Атлетический тип';
        else if (bodyFat < 18)
            category = 'Фитнес';
        else if (bodyFat < 25)
            category = 'Норма';
        else if (bodyFat < 30)
            category = 'Избыточный вес';
        else
            category = 'Ожирение';
    }
    else {
        if (bodyFat < 14)
            category = 'Эссенциальный жир (спортсмены)';
        else if (bodyFat < 21)
            category = 'Атлетический тип';
        else if (bodyFat < 25)
            category = 'Фитнес';
        else if (bodyFat < 32)
            category = 'Норма';
        else if (bodyFat < 37)
            category = 'Избыточный вес';
        else
            category = 'Ожирение';
    }
    // Используем упрощённую формулу: для мужчин BMI ~ 22, для женщин ~ 21
    const assumedBMI = gender === 'male' ? 22 : 21;
    const heightM = height / 100;
    const assumedWeight = assumedBMI * heightM * heightM;
    const fatMass = assumedWeight * bodyFat / 100;
    const leanMass = assumedWeight - fatMass;
    return [
        { value: bodyFat.toFixed(1), label: 'Процент жира', unit: '%' },
        { value: fatMass.toFixed(1), label: 'Масса жира', unit: 'кг' },
        { value: leanMass.toFixed(1), label: 'Масса без жира', unit: 'кг' },
        { value: category, label: 'Категория' }
    ];
},
  'progressivnaya-nagruzka': (inputs): any => {
    const n = inputs as Record<string, number>;
    const currentWeight = Number(inputs.currentWeight || 80);
    const weeks = Number(inputs.weeks || 4);
    const progressionType = String(inputs.progressionType || 'linear');
    const exerciseType = String(inputs.exerciseType || 'compound');
    const progression = exerciseType === 'compound' ? 2.5 : 1.25;
    let week1 = '';
    let week2 = '';
    let week3 = '';
    let week4 = '';
    let finalWeight = currentWeight;
    let tips = '';
    switch (progressionType) {
        case 'linear':
            week1 = `${currentWeight} кг × 3 подхода × 8-10 повторов`;
            week2 = `${currentWeight + progression} кг × 3 × 8-10`;
            week3 = `${currentWeight + progression * 2} кг × 3 × 8-10`;
            week4 = `${currentWeight + progression * 3} кг × 3 × 8-10`;
            finalWeight = currentWeight + progression * weeks;
            tips = 'Увеличивайте вес каждую неделю пока позволяет техника. Когда не получится — добавляйте повторы.';
            break;
        case 'double':
            week1 = `${currentWeight} кг × 3 × 8 (след. неделя 9 повторов)`;
            week2 = `${currentWeight} кг × 3 × 9 (след. неделя 10)`;
            week3 = `${currentWeight} кг × 3 × 10 (след. неделя +2.5 кг)`;
            week4 = `${currentWeight + progression} кг × 3 × 8 (начало нового цикла)`;
            finalWeight = currentWeight + Math.floor(weeks / 4) * progression;
            tips = 'Двойная прогрессия: сначала добавляете повторы (до 10-12), потом вес и сбрасываете повторы.';
            break;
        case 'wave':
            week1 = `${currentWeight} кг × 4 подхода × 6 повторов (тяжёлая)`;
            week2 = `${currentWeight * 0.95} кг × 3 × 8 (средняя)`;
            week3 = `${currentWeight * 1.05} кг × 5 × 5 (суперкомпенсация)`;
            week4 = `${currentWeight * 0.8} кг × 2 × 12 (лёгкая/восстановление)`;
            finalWeight = currentWeight + progression;
            tips = 'Волновая периодизация: варируйте интенсивность для постоянной адаптации без перетренированности.';
            break;
        case 'percentage':
            week1 = `75% 1RM: ${Math.round(currentWeight * 0.75)} кг × 5 × 5`;
            week2 = `80% 1RM: ${Math.round(currentWeight * 0.80)} кг × 4 × 5`;
            week3 = `85% 1RM: ${Math.round(currentWeight * 0.85)} кг × 3 × 4`;
            week4 = `70% 1RM: ${Math.round(currentWeight * 0.70)} кг × 3 × 8 (deload)`;
            finalWeight = currentWeight + progression;
            tips = 'Процентная периодизация используется в силовых видах спорта. Требует знания своего 1RM.';
            break;
    }
    return [
        { value: week1, label: 'Неделя 1' },
        { value: week2, label: 'Неделя 2' },
        { value: week3, label: 'Неделя 3' },
        { value: week4, label: 'Неделя 4' },
        { value: Math.round(finalWeight), label: 'Итоговый вес', unit: 'кг' },
        { value: tips, label: 'Советы по прогрессии' }
    ];
},
  'promille-alkogolya': (inputs) => {
    const gender = String(inputs.gender);
    const weight = Number(inputs.weight);
    const drinkType = String(inputs.drinkType);
    const amount = Number(inputs.amount);
    const time = Number(inputs.time);
    if (!weight || !amount)
        return [{ value: '—', label: 'Результат' }];
    const alcoholContent: Record<string, number> = {
        'beer': 0.05,
        'wine': 0.12,
        'vodka': 0.40,
        'whiskey': 0.40
    };
    const r = gender === 'male' ? 0.68 : 0.55;
    const alcoholGrams = amount * alcoholContent[drinkType] * 0.79;
    const promille = (alcoholGrams / (weight * r)) - (time * 0.15); // 0.15 ‰/час - скорость выведения
    const actualPromille = Math.max(0, promille);
    const timeToSober = Math.ceil(actualPromille / 0.15);
    // Можно ли за руль (0.16 ‰ - допустимая норма в России для водителей)
    const canDrive = actualPromille < 0.16 ? '✓ Можно садиться за руль' : '✗ Нельзя садиться за руль';
    return [
        { value: actualPromille.toFixed(2), label: 'Промилле в крови', unit: '‰' },
        { value: timeToSober > 0 ? `~${timeToSober} часов` : 'Уже трезвый', label: 'Время до полного выведения' },
        { value: canDrive, label: 'Можно ли садиться за руль' }
    ];
},
  'pulsovye-zony': (inputs) => {
    const _age = Number(inputs.age);
    const restingHR = Number(inputs.restingHR);
    if (!_age)
        return [{ value: '—', label: 'Результат' }];
    const maxHR = Math.round(208 - 0.7 * _age);
    const reserve = maxHR - restingHR;
    const calculateZone = (min: number, max: number) => {
        const minHR = Math.round(restingHR + reserve * min);
        const maxHR = Math.round(restingHR + reserve * max);
        return `${minHR} — ${maxHR}`;
    };
    return [
        { value: maxHR.toString(), label: 'Максимальный пульс', unit: 'уд/мин' },
        { value: calculateZone(0.5, 0.6), label: 'Зона восстановления (50-60%)' },
        { value: calculateZone(0.6, 0.7), label: 'Зона жиросжигания (60-70%)' },
        { value: calculateZone(0.7, 0.8), label: 'Аэробная зона (70-80%)' },
        { value: calculateZone(0.8, 0.9), label: 'Анаэробная зона (80-90%)' }
    ];
},
  'raschet-bzhu': (inputs) => {
    const calories = Number(inputs.calories);
    const weight = Number(inputs.weight);
    const goal = String(inputs.goal);
    let proteinPct, fatPct, carbPct;
    switch (goal) {
        case 'balanced':
            proteinPct = 0.30;
            fatPct = 0.30;
            carbPct = 0.40;
            break;
        case 'lowcarb':
            proteinPct = 0.40;
            fatPct = 0.40;
            carbPct = 0.20;
            break;
        case 'keto':
            proteinPct = 0.25;
            fatPct = 0.70;
            carbPct = 0.05;
            break;
        case 'highprot':
            proteinPct = 0.50;
            fatPct = 0.20;
            carbPct = 0.30;
            break;
        default:
            proteinPct = 0.30;
            fatPct = 0.30;
            carbPct = 0.40;
    }
    const protein = (calories * proteinPct) / 4;
    const fat = (calories * fatPct) / 9;
    const carbs = (calories * carbPct) / 4;
    return [
        {
            value: Math.round(protein),
            label: 'Белки',
            unit: 'г/сутки',
            additionalInfo: `${Math.round(proteinPct * 100)}% от калорий`
        },
        {
            value: Math.round(fat),
            label: 'Жиры',
            unit: 'г/сутки',
            additionalInfo: `${Math.round(fatPct * 100)}% от калорий`
        },
        {
            value: Math.round(carbs),
            label: 'Углеводы',
            unit: 'г/сутки',
            additionalInfo: `${Math.round(carbPct * 100)}% от калорий`
        },
        {
            value: Math.round((protein / weight) * 10) / 10,
            label: 'Белок на кг веса',
            unit: 'г/кг'
        }
    ];
},
  'razgruzochnaya-nedelya': (inputs): any => {
    const n = inputs as Record<string, number>;
    const currentVolume = Number(inputs.currentVolume || 15000);
    const currentIntensity = Number(inputs.currentIntensity || 80);
    const deloadType = String(inputs.deloadType || 'full');
    let newVolume = currentVolume;
    let newIntensity = currentIntensity;
    let sets = 3;
    let _reps = '8-10 (лёгкие)';
    let rpe = 'RPE 6-7 (в запасе 3-4 повтора)';
    let duration = '1 неделя (3-4 тренировки)';
    switch (deloadType) {
        case 'volume':
            newVolume = Math.round(currentVolume * 0.6);
            newIntensity = currentIntensity;
            sets = 2;
            _reps = '6-8 (умеренные)';
            break;
        case 'intensity':
            newVolume = currentVolume;
            newIntensity = Math.round(currentIntensity * 0.8);
            sets = 3;
            _reps = '6-8 (не до отказа)';
            break;
        case 'full':
            newVolume = Math.round(currentVolume * 0.6);
            newIntensity = Math.round(currentIntensity * 0.85);
            sets = 2;
            _reps = '5-8 (лёгкие, не до отказа)';
            rpe = 'RPE 5-6 (в запасе 4-5 повторов)';
            break;
        case 'frequency':
            newVolume = Math.round(currentVolume * 0.5);
            newIntensity = Math.round(currentIntensity * 0.85);
            sets = 3;
            duration = '1 неделя (2 тренировки вместо 4-5)';
            break;
    }
    return [
        { value: newVolume, label: 'Объём на deload', unit: 'кг' },
        { value: newIntensity, label: 'Интенсивность на deload', unit: '%' },
        { value: sets, label: 'Подходов на упражнение', unit: 'подх' },
        { value: _reps, label: 'Рекомендуемые повторы' },
        { value: rpe, label: 'Целевой RPE' },
        { value: duration, label: 'Длительность deload' }
    ];
},
  'razvitie-rebenka': (inputs) => {
    const birthStr = String(inputs.birthDate);
    if (!birthStr)
        return [{ value: '—', label: 'Возраст' }, { value: '—', label: 'Моторика' }, { value: '—', label: 'Речь' }, { value: '—', label: 'Социальное развитие' }];
    const birth = new Date(birthStr);
    const today = new Date();
    const months = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    const ageDisplay = years > 0 ? `${years} г ${remMonths} м` : `${months} мес`;
    let motorSkills = '', speech = '', social = '';
    if (months < 2) {
        motorSkills = 'Поднимает голову';
        speech = 'Гуление';
        social = 'Взгляд на лицо';
    }
    else if (months < 4) {
        motorSkills = 'Держит голову, переворачивается';
        speech = 'Агу, гуление';
        social = 'Улыбается';
    }
    else if (months < 6) {
        motorSkills = 'Сидит с опорой, хватает игрушки';
        speech = 'Гласные звуки';
        social = 'Смеется вслух';
    }
    else if (months < 9) {
        motorSkills = 'Ползает, сидит самостоятельно';
        speech = 'Булькание, слоги (ба-ба)';
        social = 'Боится незнакомцев';
    }
    else if (months < 12) {
        motorSkills = 'Встаёт, ходит с опорой';
        speech = 'Мама, папа (осознанно)';
        social = 'Играет в "ладушки"';
    }
    else if (months < 18) {
        motorSkills = 'Ходит самостоятельно, лазает';
        speech = '3-5 слов, жесты';
        social = 'Копирует взрослых';
    }
    else if (months < 24) {
        motorSkills = 'Бегает, прыгает, лазает';
        speech = 'Фразы из 2 слов, 50+ слов';
        social = 'Сопераживание, независимость';
    }
    else if (months < 36) {
        motorSkills = 'Прыгает на двух ногах, ловит мяч';
        speech = 'Предложения, вопросы';
        social = 'Играет с детьми, копирует';
    }
    else {
        motorSkills = 'Прыгает в длину, ловит двумя руками';
        speech = 'Связная речь, счёт';
        social = 'Игры с правилами, дружба';
    }
    return [
        { value: ageDisplay, label: 'Возраст' },
        { value: motorSkills, label: 'Моторика' },
        { value: speech, label: 'Речь' },
        { value: social, label: 'Социальное развитие' }
    ];
},
  'recept-dlya-ochkov': (inputs) => {
    const sphereRight = Number(inputs.sphereRight) || 0;
    const cylinderRight = Number(inputs.cylinderRight) || 0;
    const _axisRight = Number(inputs.axisRight) || 0;
    const sphereLeft = Number(inputs.sphereLeft) || 0;
    const cylinderLeft = Number(inputs.cylinderLeft) || 0;
    const _axisLeft = Number(inputs.axisLeft) || 0;
    const seRight = sphereRight + cylinderRight / 2;
    const seLeft = sphereLeft + cylinderLeft / 2;
    // Примерная острота зрения без коррекции (грубая оценка)
    const estimateAcuity = (sphericalEquiv: number): string => {
        const se = Math.abs(sphericalEquiv);
        if (se < 0.25)
            return '20/20 (1.0)';
        if (se < 1)
            return '~20/25-20/40 (0.8-0.5)';
        if (se < 2)
            return '~20/50-20/100 (0.4-0.2)';
        if (se < 4)
            return '~20/100-20/200 (0.2-0.1)';
        if (se < 6)
            return '~20/200-20/400 (0.1-0.05)';
        return '< 20/400 (< 0.05)';
    };
    let myopiaHyperopia = '';
    const avgSE = (seRight + seLeft) / 2;
    if (avgSE < -0.5)
        myopiaHyperopia = 'Близорукость (миопия)';
    else if (avgSE > 0.5)
        myopiaHyperopia = 'Дальнозоркость (гиперметропия)';
    else
        myopiaHyperopia = 'Эмметропия или лёгкая аметропия';
    const maxCylinder = Math.max(Math.abs(cylinderRight), Math.abs(cylinderLeft));
    let astigmatism = '';
    if (maxCylinder < 0.5)
        astigmatism = 'Нет или незначительный';
    else if (maxCylinder < 1.5)
        astigmatism = 'Слабый';
    else if (maxCylinder < 2.5)
        astigmatism = 'Средний';
    else if (maxCylinder < 4)
        astigmatism = 'Высокий';
    else
        astigmatism = 'Очень высокий';
    return [
        { value: seRight.toFixed(2), label: 'Сферический эквивалент (правый)', unit: 'D' },
        { value: seLeft.toFixed(2), label: 'Сферический эквивалент (левый)', unit: 'D' },
        { value: estimateAcuity(seRight), label: 'Примерная острота зрения (правый)' },
        { value: estimateAcuity(seLeft), label: 'Примерная острота зрения (левый)' },
        { value: myopiaHyperopia, label: 'Тип коррекции' },
        { value: astigmatism, label: 'Астигматизм' }
    ];
},
}
