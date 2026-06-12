import type { ComputeFn } from './compute-helpers';
import { parseTime } from './compute-helpers';

export const computeMap_health_health2_a_2: Record<string, ComputeFn> = {
  'idealnyj-puls': (inputs) => {
    const _age = Number(inputs.age);
    const restingHR = Number(inputs.restingHR);
    if (!_age || !restingHR)
        return [{ value: '—', label: 'Результат' }];
    // Формула Танака: 208 − 0.7 × возраст (более точная, чем 220 − возраст)
    const maxHR = Math.round(208 - 0.7 * _age);
    const hrr = maxHR - restingHR; // Heart Rate Reserve
    const calculateZone = (minPct: number, maxPct: number) => {
        const minHR = Math.round(restingHR + hrr * minPct);
        const maxHR = Math.round(restingHR + hrr * maxPct);
        return `${minHR} — ${maxHR}`;
    };
    return [
        { value: maxHR.toString(), label: 'Максимальный пульс', unit: 'уд/мин' },
        { value: restingHR.toString(), label: 'Пульс в покое', unit: 'уд/мин' },
        { value: calculateZone(0.5, 0.6), label: 'Разминка (50-60%)' },
        { value: calculateZone(0.6, 0.7), label: 'Жиросжигание (60-70%)' },
        { value: calculateZone(0.7, 0.8), label: 'Кардио (70-80%)' },
        { value: calculateZone(0.8, 0.9), label: 'Анаэробная (80-90%)' }
    ];
},
  'idealnyj-ves': (inputs) => {
    const height = Number(inputs.height);
    const gender = String(inputs.gender);
    const frame = String(inputs.frame);
    let broca = gender === 'male'
        ? height - 100
        : height - 100 - ((height - 150) / 2);
    const frameAdjust = { small: 0.9, medium: 1.0, large: 1.1 };
    broca *= frameAdjust[frame as keyof typeof frameAdjust];
    let hamwi = gender === 'male'
        ? 48 + 2.7 * ((height - 152.4) / 2.54)
        : 45.5 + 2.2 * ((height - 152.4) / 2.54);
    let devine = gender === 'male'
        ? 50 + 0.91 * (height - 152.4)
        : 45.5 + 0.91 * (height - 152.4);
    const heightM = height / 100;
    const minWeight = Math.round(18.5 * heightM * heightM);
    const maxWeight = Math.round(24.9 * heightM * heightM);
    return [
        {
            value: Math.round(broca),
            label: 'По Броку (с корр. на телосложение)',
            unit: 'кг'
        },
        {
            value: Math.round(hamwi),
            label: 'По Хамви',
            unit: 'кг'
        },
        {
            value: Math.round(devine),
            label: 'По Девайну (медицинская)',
            unit: 'кг'
        },
        {
            value: `${minWeight}–${maxWeight} кг`,
            label: 'Диапазон по ИМТ (18.5–24.9)',
            additionalInfo: 'Универсальная норма'
        }
    ];
},
  'imt-dlya-aziatov': (inputs) => {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height);
    if (!weight || !height)
        return [{ value: '—', label: 'Результат' }];
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    let whoCategory = '';
    if (bmi < 18.5)
        whoCategory = 'Недостаточный вес';
    else if (bmi < 25)
        whoCategory = 'Норма';
    else if (bmi < 30)
        whoCategory = 'Избыточный вес';
    else
        whoCategory = 'Ожирение';
    // Азиатские пороги (WHO Western Pacific Region, 2000)
    let asianCategory = '';
    let healthRisk = '';
    if (bmi < 18.5) {
        asianCategory = 'Недостаточный вес';
        healthRisk = 'Низкий риск, но возможны другие проблемы со здоровьем';
    }
    else if (bmi < 23) {
        asianCategory = 'Норма';
        healthRisk = 'Низкий риск';
    }
    else if (bmi < 27.5) {
        asianCategory = 'Повышенный вес';
        healthRisk = 'Умеренный риск заболеваний';
    }
    else {
        asianCategory = 'Ожирение';
        healthRisk = 'Высокий риск диабета, сердечно-сосудистых заболеваний';
    }
    return [
        { value: bmi.toFixed(1), label: 'Индекс массы тела' },
        { value: whoCategory, label: 'Категория (WHO)' },
        { value: asianCategory, label: 'Категория (азиатские пороги)' },
        { value: healthRisk, label: 'Оценка риска' }
    ];
},
  'imt-dlya-beremennih': (inputs) => {
    const preWeight = Number(inputs.preWeight);
    const currentWeight = Number(inputs.currentWeight);
    const height = Number(inputs.height) / 100;
    const week = Number(inputs.week);
    const preBMI = preWeight / (height * height);
    const weightGain = currentWeight - preWeight;
    let minGain = 0, maxGain = 0;
    if (preBMI < 18.5) {
        minGain = 12.5;
        maxGain = 18;
    }
    else if (preBMI < 25) {
        minGain = 11.5;
        maxGain = 16;
    }
    else if (preBMI < 30) {
        minGain = 7;
        maxGain = 11.5;
    }
    else {
        minGain = 5;
        maxGain = 9;
    }
    const expectedGain = (week / 40) * ((minGain + maxGain) / 2);
    let status = weightGain < minGain * 0.7 ? 'Недобор веса' : weightGain > maxGain * 1.3 ? 'Перебор веса' : 'Норма';
    return [
        { value: Math.round(preBMI * 10) / 10, label: 'ИМТ до беременности' },
        { value: Math.round(weightGain * 10) / 10, label: 'Набрано веса', unit: 'кг' },
        { value: Math.round(expectedGain * 10) / 10, label: 'Рекомендуемый набор', unit: 'кг' },
        { value: status, label: 'Статус' }
    ];
},
  'index-massy-rebenka': (inputs) => {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height) / 100;
    const _age = Number(inputs.age);
    const bmi = weight / (height * height);
    // Note: Real percentile charts are complex, this is an approximation
    let percentile = 50;
    if (bmi < 14)
        percentile = 5;
    else if (bmi < 15)
        percentile = 10;
    else if (bmi < 16)
        percentile = 25;
    else if (bmi < 18)
        percentile = 50;
    else if (bmi < 20)
        percentile = 75;
    else if (bmi < 22)
        percentile = 85;
    else if (bmi < 24)
        percentile = 95;
    else
        percentile = 99;
    let category = '';
    if (percentile < 5) {
        category = 'Дефицит массы';
    }
    else if (percentile < 85) {
        category = 'Нормальная масса';
    }
    else if (percentile < 95) {
        category = 'Избыточная масса';
    }
    else {
        category = 'Ожирение';
    }
    return [
        {
            value: Math.round(bmi * 10) / 10,
            label: 'ИМТ ребёнка',
            unit: 'кг/м²'
        },
        {
            value: `${percentile}-й`,
            label: 'Перцентиль (оценочно)',
            additionalInfo: 'Возрастная норма'
        },
        {
            value: category,
            label: 'Оценка по CDC',
            additionalInfo: percentile < 85 ? 'в пределах нормы' : 'требуется консультация врача'
        }
    ];
},
  'index-massy-tela-imt': (inputs) => {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height) / 100; // convert to meters
    const _age = Number(inputs.age);
    const gender = String(inputs.gender);
    const bmi = weight / (height * height);
    let category = '';
    let color = '';
    if (bmi < 16) {
        category = 'Выраженный дефицит массы';
        color = 'critical';
    }
    else if (bmi < 18.5) {
        category = 'Недостаточная масса тела';
        color = 'warning';
    }
    else if (bmi < 25) {
        category = 'Нормальная масса тела';
        color = 'success';
    }
    else if (bmi < 30) {
        category = 'Избыточная масса тела (предожирение)';
        color = 'warning';
    }
    else if (bmi < 35) {
        category = 'Ожирение I степени';
        color = 'critical';
    }
    else if (bmi < 40) {
        category = 'Ожирение II степени';
        color = 'critical';
    }
    else {
        category = 'Ожирение III степени';
        color = 'critical';
    }
    // Ideal weight calculation (Broca's formula adjusted)
    const idealWeight = gender === 'male'
        ? (height * 100 - 100) * 0.9
        : (height * 100 - 100) * 0.85;
    return [
        {
            value: Math.round(bmi * 10) / 10,
            label: 'Ваш ИМТ',
            unit: 'кг/м²'
        },
        {
            value: category,
            label: 'Категория',
            additionalInfo: color
        },
        {
            value: Math.round(idealWeight * 10) / 10,
            label: 'Идеальный вес (формула Брока)',
            unit: 'кг'
        }
    ];
},
  'kachestvo-sna': (inputs) => {
    const parseTime = (timeStr: string): number => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };
    const bedtime = parseTime(String(inputs.bedtime));
    const waketime = parseTime(String(inputs.waketime));
    const fallAsleepTime = Number(inputs.fallAsleepTime) || 0;
    const wakeCount = Number(inputs.wakeCount) || 0;
    const quality = String(inputs.sleepQuality);
    let totalMinutes: number;
    if (waketime > bedtime) {
        totalMinutes = waketime - bedtime;
    }
    else {
        totalMinutes = (24 * 60 - bedtime) + waketime;
    }
    const actualSleepMinutes = Math.max(0, totalMinutes - fallAsleepTime - wakeCount * 10);
    const sleepCycles = Math.floor(actualSleepMinutes / 90);
    let qualityScore = 100;
    qualityScore -= wakeCount * 5;
    if (quality === 'poor')
        qualityScore -= 30;
    else if (quality === 'average')
        qualityScore -= 15;
    else if (quality === 'excellent')
        qualityScore += 5;
    if (actualSleepMinutes < 420)
        qualityScore -= 25;
    else if (actualSleepMinutes < 360)
        qualityScore -= 40;
    else if (actualSleepMinutes > 540)
        qualityScore -= 10;
    if (fallAsleepTime > 30)
        qualityScore -= 10;
    qualityScore = Math.max(0, Math.min(100, qualityScore));
    const hours = Math.floor(actualSleepMinutes / 60);
    const minutes = actualSleepMinutes % 60;
    let _recommendation = '';
    if (qualityScore >= 85) {
        _recommendation = 'Отличное качество сна! Продолжайте в том же духе.';
    }
    else if (qualityScore >= 70) {
        _recommendation = 'Хорошее качество сна. Для улучшения старайтесь ложиться в одно время.';
    }
    else if (qualityScore >= 50) {
        _recommendation = 'Среднее качество сна. Рекомендуется устранить причины пробуждений.';
    }
    else {
        _recommendation = 'Низкое качество сна. Рекомендуется консультация с врачом-сомнологом.';
    }
    return [
        { value: `${hours} ч ${minutes} мин`, label: 'Общее время сна' },
        { value: sleepCycles.toString(), label: 'Количество циклов сна' },
        { value: qualityScore.toString(), label: 'Оценка качества сна', unit: '%' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
  'kalkulyator-alkogolya': (inputs) => {
    const weight = Number(inputs.weight);
    const gender = String(inputs.gender);
    const drinkType = String(inputs.drinkType);
    const amount = Number(inputs.amount);
    const alcoholPercent = Number(inputs.alcoholPercent) || ({
        beer: 5, wine: 12, vodka: 40, cocktail: 20
    } as Record<string, number>)[drinkType] || 5;
    const hours = Number(inputs.hours);
    if (!weight || !amount) {
        return [{ value: '—', label: 'Результат' }];
    }
    const r = gender === 'male' ? 0.68 : 0.55;
    const alcoholGrams = amount * (alcoholPercent / 100) * 0.79;
    let promille = (alcoholGrams / (weight * r)) - (hours * 0.15);
    promille = Math.max(0, promille);
    const soberHours = promille > 0 ? Math.ceil(promille / 0.15) : 0;
    return [
        { value: promille.toFixed(2), label: 'Алкоголь в крови', unit: '‰' },
        { value: soberHours > 0 ? `~${soberHours} ч` : 'Выведено', label: 'До трезвости', unit: '' }
    ];
},
  'kalkulyator-bmr': (inputs) => {
    const gender = String(inputs.gender);
    const _age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
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
    return [
        { value: Math.round(bmr), label: 'Базальный метаболизм (BMR)', unit: 'ккал/день' }
    ];
},
  'kalkulyator-kalorij-kbzhu': (inputs) => {
    const gender = String(inputs.gender);
    const _age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    const activity = Number(inputs.activity);
    const goal = String(inputs.goal);
    if (!_age || !height || !weight) {
        return [{ value: '—', label: 'Результат' }];
    }
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * _age + 5;
    }
    else {
        bmr = 10 * weight + 6.25 * height - 5 * _age - 161;
    }
    let calories = Math.round(bmr * activity);
    if (goal === 'lose')
        calories -= 500;
    if (goal === 'gain')
        calories += 500;
    const protein = Math.round((calories * 0.30) / 4);
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories * 0.45) / 4);
    return [
        { value: calories, label: 'Калории', unit: 'ккал' },
        { value: protein, label: 'Белки', unit: 'г' },
        { value: fat, label: 'Жиры', unit: 'г' },
        { value: carbs, label: 'Углеводы', unit: 'г' }
    ];
},
}
