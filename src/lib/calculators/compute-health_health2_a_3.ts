import type { ComputeFn } from './compute-helpers';
import { foodDatabase, russianFoodDatabase } from './compute-helpers';

export const computeMap_health_health2_a_3: Record<string, ComputeFn> = {
  'kalkulyator-nabora-massy': (inputs): any => {
    const n = inputs as Record<string, number>;
    const weight = Number(inputs.weight || 70);
    const bodyfat = Number(inputs.bodyfat || 15);
    const activity = String(inputs.activity || 'moderate');
    const surplus = String(inputs.surplus || 'moderate');
    const leanMass = weight * (1 - bodyfat / 100);
    const bmr = 370 + (21.6 * leanMass);
    const activityMult: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
    };
    const tdee = bmr * activityMult[activity];
    const surplusMult: Record<string, number> = {
        conservative: 1.1,
        moderate: 1.15,
        aggressive: 1.2
    };
    const calories = Math.round(tdee * surplusMult[surplus]);
    const protein = Math.round(leanMass * 2.2); // 2.2g per kg of lean mass
    const fats = Math.round(calories * 0.25 / 9); // 25% of calories
    const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);
    let expectedGain = '';
    if (surplus === 'conservative') {
        expectedGain = '0.25-0.5 кг/неделю (в основном мышцы)';
    }
    else if (surplus === 'moderate') {
        expectedGain = '0.5-0.75 кг/неделю (баланс мышц и жира)';
    }
    else {
        expectedGain = '0.75-1 кг/неделю (может быть много жира)';
    }
    return [
        { value: calories, label: 'Калорий в день', unit: 'ккал' },
        { value: protein, label: 'Белков', unit: 'г' },
        { name: 'fats', value: fats, label: 'Жиров', unit: 'г' },
        { value: carbs, label: 'Углеводов', unit: 'г' },
        { value: Math.round(leanMass), label: 'Сухая мышечная масса', unit: 'кг' },
        { value: expectedGain, label: 'Ожидаемый прирост' }
    ];
},
  'kalkulyator-rosta-rebenka': (inputs) => {
    const _ageMonths = Number(inputs.ageMonths) || 0;
    const gender = String(inputs.gender);
    const heightCm = Number(inputs.heightCm) || 0;
    const weightKg = Number(inputs.weightKg) || 0;
    // Simplified WHO growth charts approximation for 2 years old (24 months)
    const reference = gender === 'boy' ? {
        heightMean: 87.1, heightSD: 3.2,
        weightMean: 12.2, weightSD: 1.4,
        bmiMean: 16.0, bmiSD: 1.2
    } : {
        heightMean: 85.7, heightSD: 3.1,
        weightMean: 11.5, weightSD: 1.3,
        bmiMean: 15.7, bmiSD: 1.1
    };
    // Age adjustments (simplified linear approximation)
    const ageFactor = Math.min(_ageMonths, 24) / 24;
    const adjustedHeightMean = reference.heightMean * (ageFactor < 1 ? 0.5 + 0.5 * ageFactor : 1 + (_ageMonths - 24) * 0.06);
    const adjustedWeightMean = reference.weightMean * (ageFactor < 1 ? 0.2 + 0.8 * ageFactor : 1 + (_ageMonths - 24) * 0.02);
    const heightZ = (heightCm - adjustedHeightMean) / reference.heightSD;
    const weightZ = (weightKg - adjustedWeightMean) / reference.weightSD;
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiZ = (bmi - reference.bmiMean) / reference.bmiSD;
    const zToPercentile = (z: number): number => {
        const percentiles = [0.1, 2.3, 9, 25, 50, 75, 91, 97.7, 99.9];
        const zScores = [-3, -2, -1.28, -0.67, 0, 0.67, 1.28, 2, 3];
        if (z <= -3)
            return 0.1;
        if (z >= 3)
            return 99.9;
        for (let i = 0; i < zScores.length - 1; i++) {
            if (z >= zScores[i] && z < zScores[i + 1]) {
                const t = (z - zScores[i]) / (zScores[i + 1] - zScores[i]);
                return percentiles[i] + t * (percentiles[i + 1] - percentiles[i]);
            }
        }
        return 50;
    };
    const heightPct = zToPercentile(heightZ);
    const weightPct = zToPercentile(weightZ);
    const bmiPct = zToPercentile(bmiZ);
    let assessment = '';
    if (heightPct < 3 || weightPct < 3)
        assessment = 'Ниже нормы — рекомендуется консультация врача';
    else if (heightPct > 97 || weightPct > 97)
        assessment = 'Выше среднего — рекомендуется консультация врача';
    else if (heightPct < 25)
        assessment = 'Ниже среднего — в пределах нормы';
    else if (heightPct > 75)
        assessment = 'Выше среднего — в пределах нормы';
    else
        assessment = 'В среднем диапазоне — норма';
    const getPercentileLabel = (pct: number): string => {
        if (pct < 3)
            return `${pct.toFixed(1)}% — ниже 3-го`;
        if (pct < 10)
            return `${pct.toFixed(1)}% — 3-10`;
        if (pct < 25)
            return `${pct.toFixed(1)}% — 10-25`;
        if (pct < 50)
            return `${pct.toFixed(1)}% — 25-50`;
        if (pct < 75)
            return `${pct.toFixed(1)}% — 50-75`;
        if (pct < 90)
            return `${pct.toFixed(1)}% — 75-90`;
        if (pct < 97)
            return `${pct.toFixed(1)}% — 90-97`;
        return `${pct.toFixed(1)}% — выше 97-го`;
    };
    return [
        { value: getPercentileLabel(heightPct), label: 'Перцентиль роста', unit: '' },
        { value: getPercentileLabel(weightPct), label: 'Перцентиль веса', unit: '' },
        { value: bmi.toFixed(1), label: 'ИМТ', unit: '' },
        { value: getPercentileLabel(bmiPct), label: 'Перцентиль ИМТ', unit: '' },
        { value: assessment, label: 'Оценка развития', unit: '' }
    ];
},
  'kalkulyator-sna': (inputs) => {
    const bedTimeStr = String(inputs.bedTime);
    const fallAsleepTime = Number(inputs.fallAsleepTime);
    const [hours, minutes] = bedTimeStr.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
        return [{ value: 'Неверный формат времени', label: 'Ошибка' }];
    }
    const cycleLength = 90;
    const bedDate = new Date();
    bedDate.setHours(hours, minutes + fallAsleepTime, 0, 0);
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };
    const wake1 = new Date(bedDate.getTime() + 4 * cycleLength * 60000);
    const wake2 = new Date(bedDate.getTime() + 5 * cycleLength * 60000);
    const wake3 = new Date(bedDate.getTime() + 6 * cycleLength * 60000);
    return [
        { value: formatTime(wake1), label: 'После 4 циклов (6 ч)', unit: '' },
        { value: formatTime(wake2), label: 'После 5 циклов (7.5 ч)', unit: '' },
        { value: formatTime(wake3), label: 'После 6 циклов (9 ч)', unit: '' }
    ];
},
  'kalkulyator-sushki': (inputs): any => {
    const n = inputs as Record<string, number>;
    const weight = Number(inputs.weight || 80);
    const bodyfat = Number(inputs.bodyfat || 20);
    const targetBodyfat = Number(inputs.targetBodyfat || 12);
    const activity = String(inputs.activity || 'moderate');
    const leanMass = weight * (1 - bodyfat / 100);
    const bmr = 370 + (21.6 * leanMass);
    const activityMult: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725
    };
    const tdee = bmr * activityMult[activity];
    const calories = Math.round(tdee * 0.75);
    const deficit = Math.round(tdee - calories);
    const protein = Math.round(leanMass * 2.5); // 2.5g per kg lean mass
    const fats = Math.round(calories * 0.2 / 9); // 20% of calories
    const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);
    const fatToLose = weight * (bodyfat - targetBodyfat) / 100;
    // Safe fat loss: 0.5-1% of body weight per week, mostly fat
    const weeklyFatLoss = weight * 0.007; // 0.7% per week
    const weeks = Math.ceil(fatToLose / weeklyFatLoss);
    const finalFatMass = leanMass * targetBodyfat / (100 - targetBodyfat);
    const finalWeight = Math.round(leanMass + finalFatMass);
    return [
        { value: calories, label: 'Калорий для сушки', unit: 'ккал' },
        { value: protein, label: 'Белков', unit: 'г' },
        { value: fats, label: 'Жиров', unit: 'г' },
        { value: carbs, label: 'Углеводов', unit: 'г' },
        { value: deficit, label: 'Дефицит', unit: 'ккал' },
        { value: weeks, label: 'Время сушки', unit: 'нед' },
        { value: finalWeight, label: 'Итоговый вес', unit: 'кг' }
    ];
},
  'kalkulyator-tdee': (inputs) => {
    const gender = String(inputs.gender);
    const _age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    const activity = String(inputs.activity);
    if (!_age || !height || !weight) {
        return [{ value: '—', label: 'Результат' }];
    }
    let bmr = 0;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * _age + 5;
    }
    else {
        bmr = 10 * weight + 6.25 * height - 5 * _age - 161;
    }
    const multipliers: Record<string, number> = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very-active': 1.9
    };
    const tdee = bmr * multipliers[activity];
    return [
        { value: Math.round(tdee), label: 'Суточная норма (TDEE)', unit: 'ккал/день' },
        { value: Math.round(bmr), label: 'Базальный метаболизм (BMR)', unit: 'ккал/день' }
    ];
},
  'kaloriynost-priema-pishchi': (inputs) => {
    const items = Number(inputs.items) || 3;
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    for (let i = 1; i <= Math.min(items, 4); i++) {
        const foodKey = String(inputs[`food${i}`]);
        const weight = Number(inputs[`weight${i}`]) || 0;
        if (foodKey && foodKey !== 'none' && russianFoodDatabase[foodKey] && weight > 0) {
            const food = russianFoodDatabase[foodKey];
            const ratio = weight / 100;
            totalCalories += food.calories * ratio;
            totalProtein += food.protein * ratio;
            totalFat += food.fat * ratio;
            totalCarbs += food.carbs * ratio;
        }
    }
    const dailyNorm = 2000;
    const mealPercent = (totalCalories / dailyNorm * 100).toFixed(1);
    return [
        { value: Math.round(totalCalories), label: 'Всего калорий', unit: 'ккал' },
        { value: totalProtein.toFixed(1), label: 'Всего белков', unit: 'г' },
        { value: totalFat.toFixed(1), label: 'Всего жиров', unit: 'г' },
        { value: totalCarbs.toFixed(1), label: 'Всего углеводов', unit: 'г' },
        { value: `${mealPercent}%`, label: '% от суточной нормы' }
    ];
},
  'kaloriynost-produktov': (inputs) => {
    const foodItem = String(inputs.foodItem);
    const weight = Number(inputs.weight);
    if (!foodItem || !foodDatabase[foodItem]) {
        return [{ value: 'Выберите продукт', label: 'Результат' }];
    }
    const food = foodDatabase[foodItem];
    const ratio = weight / 100;
    return [
        { value: Math.round(food.calories * ratio), label: 'Калорийность', unit: 'ккал' },
        { value: (food.protein * ratio).toFixed(1), label: 'Белки', unit: 'г' },
        { value: (food.fat * ratio).toFixed(1), label: 'Жиры', unit: 'г' },
        { value: (food.carbs * ratio).toFixed(1), label: 'Углеводы', unit: 'г' }
    ];
},
  'kaloriynost-recepta': (inputs) => {
    const totalWeight = Number(inputs.totalWeight);
    const servings = Number(inputs.servings);
    const calories = Number(inputs.calories);
    const protein = Number(inputs.protein);
    const fat = Number(inputs.fat);
    const carbs = Number(inputs.carbs);
    if (!totalWeight || !servings) {
        return [
            { value: '—', label: 'Калории на 100 г', unit: 'ккал' },
            { value: '—', label: 'Калории на порцию', unit: 'ккал' },
            { value: '—', label: 'Б/Ж/У на 100 г' },
            { value: '—', label: 'Б/Ж/У на порцию' },
            { value: '—', label: 'Вес порции', unit: 'г' }
        ];
    }
    const caloriesPer100g = (calories / totalWeight) * 100;
    const servingWeight = totalWeight / servings;
    const caloriesPerServing = (calories / totalWeight) * servingWeight;
    const pPer100g = (protein / totalWeight) * 100;
    const fPer100g = (fat / totalWeight) * 100;
    const cPer100g = (carbs / totalWeight) * 100;
    const pPerServing = protein / servings;
    const fPerServing = fat / servings;
    const cPerServing = carbs / servings;
    return [
        { value: Math.round(caloriesPer100g), label: 'Калории на 100 г', unit: 'ккал' },
        { value: Math.round(caloriesPerServing), label: 'Калории на порцию', unit: 'ккал' },
        { value: `${pPer100g.toFixed(1)} / ${fPer100g.toFixed(1)} / ${cPer100g.toFixed(1)} г`, label: 'Б/Ж/У на 100 г' },
        { value: `${pPerServing.toFixed(1)} / ${fPerServing.toFixed(1)} / ${cPerServing.toFixed(1)} г`, label: 'Б/Ж/У на порцию' },
        { value: Math.round(servingWeight), label: 'Вес порции', unit: 'г' }
    ];
},
  'klimaks-kalkulyator': (inputs) => {
    const birthYear = Number(inputs.birthYear);
    const motherAge = Number(inputs.motherMenopause);
    const smoking = String(inputs.smoking);
    const today = new Date().getFullYear();
    const _age = today - birthYear;
    let expected = motherAge;
    if (smoking === 'yes')
        expected -= 2;
    const perimenopauseStart = expected - 4;
    const perimenopauseYear = birthYear + perimenopauseStart;
    let status = '';
    if (_age < perimenopauseStart)
        status = 'Репродуктивный период';
    else if (_age < expected)
        status = 'Перименопауза';
    else
        status = 'Постменопауза';
    return [
        { value: expected, label: 'Ожидаемая менопауза', unit: 'лет' },
        { value: `Примерно ${perimenopauseYear} (${perimenopauseStart} лет)`, label: 'Начало перименопаузы' },
        { value: status, label: 'Статус' }
    ];
},
  'konverter-sahara-v-krovi': (inputs) => {
    const conversionType = String(inputs.conversionType);
    const value = Number(inputs.value);
    const measurementType = String(inputs.measurementType);
    if (!value) {
        return [{ value: 'Введите значение', label: 'Результат' }];
    }
    let convertedValue = '';
    let hba1cEstimated = '';
    let category = '';
    let mmolValue = 0;
    if (conversionType === 'mg_to_mmol') {
        mmolValue = value / 18;
        convertedValue = `${mmolValue.toFixed(2)} mmol/L`;
    }
    else if (conversionType === 'mmol_to_mg') {
        mmolValue = value;
        const mgValue = value * 18;
        convertedValue = `${mgValue.toFixed(0)} mg/dL`;
    }
    else {
        mmolValue = value;
        convertedValue = `${value.toFixed(1)} mmol/L (${(value * 18).toFixed(0)} mg/dL)`;
    }
    // Формула: HbA1c ≈ (средняя глюкоза + 46.7) / 28.7 для mg/dL
    const avgGlucoseMg = conversionType === 'mmol_to_mg' ? value * 18 : value;
    let hba1c = (avgGlucoseMg + 46.7) / 28.7;
    hba1cEstimated = `${hba1c.toFixed(1)}%`;
    if (measurementType === 'fasting') {
        if (mmolValue < 3.9)
            category = 'Гипогликемия (низкий сахар)';
        else if (mmolValue < 5.6)
            category = 'Норма';
        else if (mmolValue < 7.0)
            category = 'Нарушение толерантности к глюкозе';
        else
            category = 'Диабет';
    }
    else {
        if (mmolValue < 4.0)
            category = 'Гипогликемия';
        else if (mmolValue < 7.8)
            category = 'Норма';
        else if (mmolValue < 11.1)
            category = 'Повышенный уровень';
        else
            category = 'Высокий уровень (требует внимания)';
    }
    return [
        { value: convertedValue, label: 'Конвертированное значение' },
        { value: hba1cEstimated, label: 'Оценка HbA1c' },
        { value: category, label: 'Категория' },
        { value: 'Норма: 3.9-5.6 mmol/L (70-100 mg/dL) натощак; HbA1c < 5.7%', label: 'Референсные значения' }
    ];
},
  'lekztva-dlya-zhivotnyh': (inputs) => {
    const pet = String(inputs.petType);
    const weight = Number(inputs.weight);
    const med = String(inputs.medication);
    let dose = 0;
    let freq = '';
    if (med === 'carprofen') {
        dose = weight * 2.2;
        freq = '2 раза в день';
    }
    else if (med === 'meloxicam') {
        dose = weight * 0.2;
        freq = '1 раз в день';
    }
    else if (med === 'amoxicillin') {
        dose = weight * 10;
        freq = '2 раза в день';
    }
    else if (med === 'cephalexin') {
        dose = weight * 15;
        freq = '3 раза в день';
    }
    if (pet === 'cat' && med === 'carprofen')
        dose = 0;
    return [
        { value: Math.round(dose), label: 'Доза', unit: 'мг' },
        { value: freq, label: 'Частота' },
        { value: 'Консультируйтесь с ветеринаром перед применением!', label: 'Важно' }
    ];
},
}
