import type { ComputeFn } from './compute-helpers';

export const computeMap_health_health2_a_1: Record<string, ComputeFn> = {
  'bazovyj-metabolizm-bmr': (inputs) => {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height);
    const _age = Number(inputs.age);
    const gender = String(inputs.gender);
    let bmr = 0;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * _age) + 5;
    }
    else {
        bmr = (10 * weight) + (6.25 * height) - (5 * _age) - 161;
    }
    return [
        {
            value: Math.round(bmr),
            label: 'Базальный метаболизм',
            unit: 'ккал/сутки',
            additionalInfo: 'Калории, необходимые организму в состоянии полного покоя'
        }
    ];
},
  'data-rodov': (inputs) => {
    const lastPeriod = new Date(String(inputs.lastPeriod));
    const cycleLength = Number(inputs.cycleLength) || 28;
    if (!lastPeriod || isNaN(lastPeriod.getTime())) {
        return [{ value: 'Введите дату', label: 'Результат' }];
    }
    const dueDate = new Date(lastPeriod);
    dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));
    const conceptionDate = new Date(lastPeriod);
    conceptionDate.setDate(conceptionDate.getDate() + 14);
    const today = new Date();
    const diffTime = today.getTime() - lastPeriod.getTime();
    const currentWeek = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };
    return [
        { value: formatDate(dueDate), label: 'Дата родов' },
        { value: formatDate(conceptionDate), label: 'Примерная дата зачатия' },
        { value: currentWeek.toString(), label: 'Текущая неделя', unit: 'неделя' },
        { value: daysLeft.toString(), label: 'Осталось дней', unit: 'дней' }
    ];
},
  'data-rodov-rasshirennyj': (inputs) => {
    const method = String(inputs.method);
    const dateStr = String(inputs.date);
    const cycleLength = Number(inputs.cycleLength);
    if (!dateStr)
        return [{ value: '—', label: 'Предполагаемая дата родов' }, { value: '—', label: 'Текущий срок' }, { value: 0, label: 'Триместр' }];
    const date = new Date(dateStr);
    const today = new Date();
    let dueDate = new Date(date);
    let daysPregnant = 0;
    if (method === 'lmp') {
        dueDate.setDate(date.getDate() + 280 + (cycleLength - 28));
        daysPregnant = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    }
    else if (method === 'conception') {
        dueDate.setDate(date.getDate() + 266);
        daysPregnant = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    }
    else {
        dueDate.setDate(date.getDate() + 280 - 56);
        daysPregnant = 56 + Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    }
    const weeks = Math.floor(daysPregnant / 7);
    const days = daysPregnant % 7;
    const trimester = weeks < 12 ? 1 : weeks < 28 ? 2 : 3;
    return [
        { value: dueDate.toLocaleDateString('ru-RU'), label: 'Предполагаемая дата родов' },
        { value: `${weeks} недель ${days} дней`, label: 'Текущий срок' },
        { value: trimester, label: 'Триместр' }
    ];
},
  'deficit-kaloriy': (inputs) => {
    const tdee = Number(inputs.tdee);
    const goal = String(inputs.goal);
    const rate = Number(inputs.rate);
    const currentWeight = Number(inputs.currentWeight);
    const targetWeight = Number(inputs.targetWeight);
    if (!tdee || !currentWeight || !targetWeight) {
        return [{ value: 'Заполните все поля', label: 'Результат' }];
    }
    const weeklyCalorieChange = rate * 7700;
    const dailyCalorieChange = weeklyCalorieChange / 7;
    let targetCalories = tdee;
    if (goal === 'lose') {
        targetCalories = Math.max(1000, tdee - dailyCalorieChange);
    }
    else if (goal === 'gain') {
        targetCalories = tdee + dailyCalorieChange;
    }
    const weightDifference = currentWeight - targetWeight;
    const weeksToGoal = Math.abs(weightDifference) / rate;
    const daysToGoal = Math.round(weeksToGoal * 7);
    return [
        { value: Math.round(targetCalories), label: 'Целевое потребление калорий', unit: 'ккал/день' },
        { value: Math.round(dailyCalorieChange), label: 'Дефицит/профицит', unit: 'ккал' },
        { value: `${goal === 'lose' ? '−' : goal === 'gain' ? '+' : ''}${rate} кг/неделю`, label: 'Еженедельное изменение' },
        { value: daysToGoal < 30 ? `${daysToGoal} дней` : `${Math.round(weeksToGoal)} недель`, label: 'Время до цели' }
    ];
},
  'dekretnye-kalkulyator': (inputs) => {
    const salary2Years = Number(inputs.salary2Years) || 0;
    const excludedDays = Number(inputs.excludedDays) || 0;
    const leaveDays = Number(inputs.leaveDays) || 140;
    if (!salary2Years) {
        return [
            { value: '—', label: 'Среднедневной заработок', unit: '₽' },
            { value: '—', label: 'Максимальный среднедневной', unit: '₽' },
            { value: '—', label: 'Применённый среднедневной', unit: '₽' },
            { value: '—', label: 'Общая сумма пособия', unit: '₽' },
            { value: '—', label: 'В месяц', unit: '₽' }
        ];
    }
    // Maximum base for social insurance contributions in Russia (2025 approx)
    const maxBaseYear1 = 1965000; // 2024 limit
    const maxBaseYear2 = 1905000; // 2023 limit
    const totalMaxBase = maxBaseYear1 + maxBaseYear2;
    const totalDays = 730;
    const workingDays = totalDays - excludedDays;
    const avgDaily = salary2Years / workingDays;
    const maxAvgDaily = totalMaxBase / totalDays;
    const usedAvgDaily = Math.min(avgDaily, maxAvgDaily);
    const totalBenefit = usedAvgDaily * leaveDays;
    const monthlyEquivalent = totalBenefit / leaveDays * 30.44;
    return [
        { value: Number(avgDaily.toFixed(2)), label: 'Среднедневной заработок', unit: '₽' },
        { value: Number(maxAvgDaily.toFixed(2)), label: 'Максимальный среднедневной', unit: '₽' },
        { value: Number(usedAvgDaily.toFixed(2)), label: 'Применённый среднедневной', unit: '₽' },
        { value: Number(totalBenefit.toFixed(2)), label: 'Общая сумма пособия', unit: '₽' },
        { value: Number(monthlyEquivalent.toFixed(2)), label: 'В месяц', unit: '₽' }
    ];
},
  'dnevnaya-aktivnost': (inputs) => {
    const bmr = Number(inputs.bmr);
    const activityLevel = Number(inputs.activityLevel);
    const exerciseHours = Number(inputs.exerciseHours);
    if (!bmr)
        return [{ value: 'Введите BMR', label: 'Результат' }];
    const tdee = Math.round(bmr * activityLevel);
    const caloriesFromActivity = Math.round(tdee - bmr);
    let _recommendation = '';
    if (exerciseHours < 2) {
        _recommendation = 'Рекомендуется увеличить активность до 150 минут в неделю (ВОЗ)';
    }
    else if (exerciseHours < 5) {
        _recommendation = 'Хороший уровень активности. Для улучшения здоровья стремитесь к 300 минутам в неделю';
    }
    else {
        _recommendation = 'Отличный уровень активности! Поддерживайте баланс тренировок и восстановления';
    }
    return [
        { value: tdee.toString(), label: 'TDEE (суточный расход)', unit: 'ккал' },
        { value: activityLevel.toString(), label: 'Коэффициент PAL' },
        { value: caloriesFromActivity.toString(), label: 'Калории от активности', unit: 'ккал' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
  'doza-kollagena': (inputs) => {
    const _age = Number(inputs.age || 35);
    const goal = String(inputs.goal || 'skin');
    const type = String(inputs.type || 'hydrolyzed');
    const weight = Number(inputs.weight || 65);
    let baseDose = 5; // grams
    if (goal === 'skin')
        baseDose = 5;
    else if (goal === 'hair')
        baseDose = 5;
    else if (goal === 'joints')
        baseDose = 10;
    else if (goal === 'complex')
        baseDose = 7.5;
    if (_age > 50)
        baseDose *= 1.2;
    else if (_age < 25)
        baseDose *= 0.8;
    if (weight > 80)
        baseDose *= 1.1;
    const typeMult: Record<string, number> = {
        hydrolyzed: 1, marine: 1.1, bovine: 0.9
    };
    baseDose /= typeMult[type]; // Marine is more bioavailable, so need slightly less
    const dailyDose = Math.round(baseDose * 10) / 10;
    const course = '2-3 месяца приёма, затем перерыв 1-2 месяца. Минимум 4-8 недель для видимого эффекта на коже.';
    const whenToTake = 'Утром натощак или за 30 минут до еды. Можно вечером перед сном для восстановления.';
    const withWhat = 'Витамин C (200-500 мг) — обязательно для синтеза коллагена. Также хорошо с гиалуроновой кислотой.';
    let expectedEffect = '';
    if (goal === 'skin') {
        expectedEffect = 'Увеличение увлажнённости через 4-6 недель, сглаживание мелких морщин через 8-12 недель';
    }
    else if (goal === 'hair') {
        expectedEffect = 'Укрепление ногтей через 3-4 недели, блеск и рост волос через 2-3 месяца';
    }
    else if (goal === 'joints') {
        expectedEffect = 'Уменьшение скованности через 4-6 недель, снижение дискомфорта при движении';
    }
    else {
        expectedEffect = 'Комплексное улучшение: кожа, волосы, ногти, поддержка суставов';
    }
    const costPerGram = type === 'marine' ? 8 : (type === 'hydrolyzed' ? 5 : 6);
    const costPerMonth = Math.round(dailyDose * 30 * costPerGram);
    return [
        { value: dailyDose, label: 'Суточная доза', unit: 'г' },
        { value: course, label: 'Длительность курса' },
        { value: whenToTake, label: 'Когда принимать' },
        { value: withWhat, label: 'С чем принимать' },
        { value: expectedEffect, label: 'Ожидаемый эффект' },
        { value: costPerMonth, label: 'Стоимость курса', unit: '₽' }
    ];
},
  'dozirovka-lekarstv': (inputs) => {
    const childWeight = Number(inputs.childWeight);
    const medication = String(inputs.medication);
    if (!childWeight)
        return [{ value: 'Введите вес ребёнка', label: 'Результат' }];
    const dosages: Record<string, {
        singlePerKg: number;
        maxPerKg: number;
        frequency: string;
        unit: string;
        maxSingle: number;
        maxDaily: number;
    }> = {
        'paracetamol': {
            singlePerKg: 10, // 10-15 мг/кг
            maxPerKg: 60, // 60 мг/кг/сутки
            frequency: 'Каждые 4-6 часов, не более 4 раз в сутки',
            unit: 'мг',
            maxSingle: 1000,
            maxDaily: 4000
        },
        'ibuprofen': {
            singlePerKg: 5, // 5-10 мг/кг
            maxPerKg: 30, // 30 мг/кг/сутки
            frequency: 'Каждые 6-8 часов, 3 раза в сутки',
            unit: 'мг',
            maxSingle: 400,
            maxDaily: 1200
        },
        'amoxicillin': {
            singlePerKg: 20, // 20-40 мг/кг/приём
            maxPerKg: 80, // до 80 мг/кг/сутки
            frequency: '2-3 раза в сутки (каждые 8-12 часов)',
            unit: 'мг',
            maxSingle: 1000,
            maxDaily: 3000
        },
        'claritin': {
            singlePerKg: 0.2, // ~5 мг для ребёнка >30 кг
            maxPerKg: 0.2,
            frequency: '1 раз в сутки',
            unit: 'мг',
            maxSingle: 10,
            maxDaily: 10
        }
    };
    const dose = dosages[medication];
    const calculatedSingle = Math.min(childWeight * dose.singlePerKg, dose.maxSingle);
    const calculatedDaily = Math.min(childWeight * dose.maxPerKg, dose.maxDaily);
    return [
        { value: `${calculatedSingle.toFixed(0)} ${dose.unit}`, label: 'Разовая доза' },
        { value: `${calculatedDaily.toFixed(0)} ${dose.unit}`, label: 'Максимальная суточная доза' },
        { value: dose.frequency, label: 'Частота приёма' },
        { value: '⚠️ Консультируйтесь с врачом перед применением любых лекарств', label: 'Важно' }
    ];
},
  'faktory-star': (inputs) => {
    const sun = Number(inputs.sunExposure || 2);
    const smoking = String(inputs.smoking || 'no');
    const sleep = Number(inputs.sleepHours || 7);
    const stress = String(inputs.stressLevel || 'medium');
    const diet = String(inputs.dietQuality || 'average');
    const skincare = String(inputs.skincare || 'basic');
    let riskScore = 0;
    // Sun exposure (UV is #1 cause of premature aging)
    if (sun > 6)
        riskScore += 40;
    else if (sun > 3)
        riskScore += 20;
    else if (sun > 1)
        riskScore += 10;
    const smokingRisk: Record<string, number> = {
        no: 0, former: 5, light: 25, heavy: 50
    };
    riskScore += smokingRisk[smoking];
    if (sleep < 6)
        riskScore += 20;
    else if (sleep < 7)
        riskScore += 10;
    const stressRisk: Record<string, number> = {
        low: 0, medium: 10, high: 25
    };
    riskScore += stressRisk[stress];
    const dietRisk: Record<string, number> = {
        healthy: -10, average: 5, poor: 25
    };
    riskScore += dietRisk[diet];
    const skincareProtect: Record<string, number> = {
        excellent: -15, basic: -5, minimal: 5, none: 15
    };
    riskScore += skincareProtect[skincare];
    riskScore = Math.max(0, Math.min(100, riskScore));
    // Skin _age estimate (+/- 5 years from chronological)
    const skinAgeOffset = riskScore > 50 ? 5 : (riskScore > 30 ? 2 : -2);
    let mainRisk = '';
    if (sun > 4)
        mainRisk = '☀️ УФ-излучение — главный фактор старения';
    else if (smoking !== 'no')
        mainRisk = '🚬 Курение разрушает коллаген';
    else if (sleep < 6)
        mainRisk = '😴 Недосыпание нарушает регенерацию';
    else if (stress === 'high')
        mainRisk = '🧠 Хронический стресс вызывает воспаление';
    else if (diet === 'poor')
        mainRisk = '🍔 Неправильное питание — недостаток антиоксидантов';
    else
        mainRisk = '⚠️ Комбинация факторов';
    let priorityAction = '';
    if (sun > 4 && skincare !== 'excellent') {
        priorityAction = 'Используйте SPF 30+ ежедневно, носите шляпу на солнце';
    }
    else if (smoking !== 'no') {
        priorityAction = 'Бросьте курить — кожа начнёт восстанавливаться через 2-4 недели';
    }
    else if (sleep < 6) {
        priorityAction = 'Увеличьте сон до 7-8 часов, ложитесь до 23:00';
    }
    else if (stress === 'high') {
        priorityAction = 'Практикуйте медитацию, массаж — снизьте кортизол';
    }
    else if (diet === 'poor') {
        priorityAction = 'Добавьте в рацион ягоды, орехи, жирную рыбу, зелёный чай';
    }
    else {
        priorityAction = 'Усильте уход: ретинол (вечер), витамин C (утро), SPF (обязательно)';
    }
    let antioxidants = '';
    if (riskScore > 50) {
        antioxidants = 'Витамин C, E, коэнзим Q10, ресвератрол, альфа-липоевая кислота';
    }
    else if (riskScore > 30) {
        antioxidants = 'Витамин C, E, зелёный чай';
    }
    else {
        antioxidants = 'Витамин C (апельсины, киви), витамин E (миндаль, авокадо)';
    }
    return [
        { value: Math.round(riskScore), label: 'Индекс старения' },
        { value: 30 + skinAgeOffset, label: 'Биологический возраст кожи', unit: 'лет' },
        { value: mainRisk, label: 'Главный риск' },
        { value: priorityAction, label: 'Приоритетное действие' },
        { value: antioxidants, label: 'Рекомендуемые антиоксиданты' }
    ];
},
  'gidratacziya-rasshirennaya': (inputs) => {
    const weight = Number(inputs.weight);
    const climate = String(inputs.climate);
    const _exercise = Number(inputs.exerciseMinutes);
    const salt = String(inputs.saltIntake);
    const baseWater = weight * 35;
    let climateAdjustment = 0;
    if (climate === 'hot')
        climateAdjustment = 500;
    else if (climate === 'cold')
        climateAdjustment = -200;
    else if (climate === 'humid')
        climateAdjustment = 300;
    const exerciseWater = _exercise * 10;
    let saltAdjustment = 0;
    if (salt === 'high')
        saltAdjustment = 300;
    else if (salt === 'low')
        saltAdjustment = -150;
    const totalWater = baseWater + climateAdjustment + exerciseWater + saltAdjustment;
    return [
        { value: Math.round(baseWater), label: 'Базовая потребность', unit: 'мл' },
        { value: Math.round(exerciseWater), label: 'Дополнительно для спорта', unit: 'мл' },
        { value: Math.round(climateAdjustment), label: 'Корректировка климата', unit: 'мл' },
        { value: Math.round(totalWater), label: 'Итого воды в день', unit: 'мл' },
        { value: Math.round(totalWater / 250), label: 'Стаканов (250 мл)', unit: 'шт' }
    ];
},
}
