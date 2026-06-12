import type { ComputeFn } from './compute-helpers';

export const computeMap_daily_daily_a_3: Record<string, ComputeFn> = {
  'kalkulyator-vozrasta': (inputs) => {
    const birthDateStr = String(inputs.birthDate);
    const calculateDateStr = String(inputs.calculateDate) || new Date().toISOString().split('T')[0];
    const birthDate = new Date(birthDateStr);
    const calcDate = new Date(calculateDateStr);
    if (isNaN(birthDate.getTime()) || isNaN(calcDate.getTime())) {
        return [{ value: 'Неверный формат даты', label: 'Ошибка' }];
    }
    let years = calcDate.getFullYear() - birthDate.getFullYear();
    let months = calcDate.getMonth() - birthDate.getMonth();
    let days = calcDate.getDate() - birthDate.getDate();
    if (days < 0) {
        months--;
        days += new Date(calcDate.getFullYear(), calcDate.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    const totalDays = Math.floor((calcDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    return [
        { value: years.toString(), label: 'Полных лет', unit: 'лет' },
        { value: (years * 12 + months).toString(), label: 'Всего месяцев', unit: 'мес' },
        { value: totalDays.toString(), label: 'Всего дней', unit: 'дн' }
    ];
},
  'kofeynoe-sootnoshenie': (inputs) => {
    const method = String(inputs.method);
    const coffeeAmount = Number(inputs.coffeeAmount);
    const strength = String(inputs.strength);
    if (!coffeeAmount) {
        return [
            { value: '—', label: 'Количество воды', unit: 'мл' },
            { value: '—', label: 'Соотношение' },
            { value: '—', label: 'Помол' },
            { value: '—', label: 'Время заваривания' },
            { value: '—', label: 'Температура воды', unit: '°C' }
        ];
    }
    const methodData: Record<string, {
        baseRatio: number;
        ratioRange: number[];
        grind: string;
        time: string;
        temp: number;
    }> = {
        'espresso': { baseRatio: 2, ratioRange: [1.5, 2.5], grind: 'Тонкий (как соль)', time: '25-30 сек', temp: 93 },
        'pourover': { baseRatio: 16, ratioRange: [15, 17], grind: 'Средний (как сахар)', time: '2.5-3.5 мин', temp: 96 },
        'french': { baseRatio: 15, ratioRange: [12, 17], grind: 'Крупный (как морская соль)', time: '4 мин', temp: 94 },
        'aeropress': { baseRatio: 15, ratioRange: [10, 20], grind: 'Средний-мелкий', time: '1.5-2 мин', temp: 85 },
        'moka': { baseRatio: 10, ratioRange: [7, 10], grind: 'Мелкий, но не пудра', time: '3-5 мин', temp: 100 },
        'cold_brew': { baseRatio: 8, ratioRange: [5, 10], grind: 'Очень крупный', time: '12-24 ч', temp: 5 },
        'turkish': { baseRatio: 10, ratioRange: [8, 12], grind: 'Пудра (мелчайший)', time: '2-3 мин', temp: 100 }
    };
    const data = methodData[method];
    let ratio = data.baseRatio;
    if (strength === 'light')
        ratio -= 2;
    if (strength === 'strong')
        ratio += 2;
    const waterAmount = coffeeAmount * ratio;
    let temp = data.temp;
    if (method !== 'cold_brew') {
        temp = strength === 'strong' ? temp - 2 : temp; // Darker roasts = lower temp
    }
    return [
        { value: Math.round(waterAmount), label: 'Количество воды', unit: 'мл' },
        { value: `1:${ratio}`, label: 'Соотношение' },
        { value: data.grind, label: 'Помол' },
        { value: data.time, label: 'Время заваривания' },
        { value: temp, label: 'Температура воды', unit: '°C' }
    ];
},
  'komplektaciya-posudy': (inputs) => {
    const guests = Number(inputs.guests);
    const courses = Number(inputs.courses);
    const beverages = Number(inputs.beverages);
    const extraPercent = Number(inputs.extraPercent);
    const multiplier = 1 + (extraPercent / 100);
    const plates = Math.ceil(guests * courses * multiplier);
    const glasses = Math.ceil(guests * beverages * multiplier);
    const cutlery = Math.ceil(guests * multiplier);
    const napkins = Math.ceil(guests * courses * 2 * multiplier);
    return [
        { value: plates, label: 'Всего тарелок', unit: 'шт.' },
        { value: glasses, label: 'Всего стаканов/бокалов', unit: 'шт.' },
        { value: cutlery, label: 'Наборов столовых приборов', unit: 'шт.' },
        { value: napkins, label: 'Салфеток (с запасом)', unit: 'шт.' }
    ];
},
  'kompostirovanie': (inputs) => {
    const greenMaterial = Number(inputs.greenMaterial);
    const brownMaterial = Number(inputs.brownMaterial);
    const pileSize = Number(inputs.pileSize);
    if (!greenMaterial && !brownMaterial) {
        return [
            { value: '—', label: 'Соотношение C:N' },
            { value: '—', label: 'Статус соотношения' },
            { value: '—', label: 'Компост готов через' },
            { value: '—', label: 'Выход готового компоста', unit: 'кг' },
            { value: '—', label: 'Рекомендации' }
        ];
    }
    // Green material: 15:1 (fresh grass, vegetable scraps)
    const greenC = greenMaterial * 15;
    const greenN = greenMaterial;
    const brownC = brownMaterial * 40;
    const brownN = brownMaterial;
    const totalC = greenC + brownC;
    const totalN = greenN + brownN;
    const cnRatio = totalN > 0 ? totalC / totalN : 0;
    let status: string;
    let _recommendation: string;
    if (cnRatio < 20) {
        status = 'Слишком богат азотом';
        _recommendation = 'Добавьте больше сухого материала (солома, опавшие листья, картон)';
    }
    else if (cnRatio > 35) {
        status = 'Слишком много углерода';
        _recommendation = 'Добавьте больше свежего материала (трава, овощные очистки, кофейная гуща)';
    }
    else {
        status = '✓ Оптимальное соотношение';
        _recommendation = 'Соотношение идеально! Перемешайте и поддерживайте влажность.';
    }
    let readyTime: string;
    if (pileSize < 0.5) {
        readyTime = '3-4 месяца (маленькая куча греется плохо)';
    }
    else if (cnRatio >= 20 && cnRatio <= 35) {
        readyTime = '2-3 месяца (оптимальные условия)';
    }
    else {
        readyTime = '4-6 месяцев (неоптимальное соотношение)';
    }
    const totalInput = greenMaterial + brownMaterial;
    const yield_ = totalInput * 0.4;
    return [
        { value: Math.round(cnRatio), label: 'Соотношение C:N' },
        { value: status, label: 'Статус соотношения' },
        { value: readyTime, label: 'Компост готов через' },
        { value: Math.round(yield_), label: 'Выход готового компоста', unit: 'кг' },
        { value: _recommendation, label: 'Рекомендации' }
    ];
},
  'korm-dlya-pitomca': (inputs) => {
    const petType = String(inputs.petType);
    const weight = Number(inputs.weight);
    const ageGroup = String(inputs.ageGroup);
    const activityLevel = String(inputs.activityLevel);
    const foodType = String(inputs.foodType);
    const rer = 70 * Math.pow(weight, 0.75);
    const multipliers: Record<string, Record<string, number>> = {
        'dog': {
            'puppy_low': 2.0,
            'puppy_moderate': 2.5,
            'puppy_high': 3.0,
            'adult_low': 1.2,
            'adult_moderate': 1.6,
            'adult_high': 2.0,
            'adult_very_high': 3.0,
            'senior_low': 1.0,
            'senior_moderate': 1.3,
            'senior_high': 1.6
        },
        'cat': {
            'puppy_low': 2.0,
            'puppy_moderate': 2.5,
            'puppy_high': 3.0,
            'adult_low': 0.9,
            'adult_moderate': 1.2,
            'adult_high': 1.4,
            'adult_very_high': 1.6,
            'senior_low': 0.8,
            'senior_moderate': 1.0,
            'senior_high': 1.2
        }
    };
    const key = `${ageGroup}_${activityLevel}`;
    const multiplier = multipliers[petType]?.[key] || 1.4;
    const dailyCalories = Math.round(rer * multiplier);
    // Dry food: ~350-400 kcal per 100g (high quality)
    const dryFoodAmount = Math.round((dailyCalories / 3.8) * 10) / 10; // ~3.8 kcal/g average
    const wetFoodAmount = Math.round((dailyCalories / 1.0) * 10) / 10; // ~1 kcal/g average
    const mealsPerDay: Record<string, string> = {
        'puppy': '3-4 раза в день (маленькими порциями)',
        'adult': '2 раза в день',
        'senior': '2 раза в день (можно 3 маленькими)'
    };
    // Monthly cost estimation (rough estimates in RUB)
    const costPerKg: Record<string, number> = {
        'dry': 400, // ~400₽ per kg for decent quality
        'wet': 150, // ~150₽ per can/pouch
        'natural': 500, // ~500₽ per kg of fresh meat/ingredients
        'mixed': 300
    };
    let monthlyCost = 0;
    if (foodType === 'dry') {
        monthlyCost = (dryFoodAmount / 1000) * costPerKg.dry * 30;
    }
    else if (foodType === 'wet') {
        const cansPerDay = wetFoodAmount / 400;
        monthlyCost = cansPerDay * costPerKg.wet * 30;
    }
    else if (foodType === 'natural') {
        // Natural diet: ~2-3% of body weight per day in fresh food
        const naturalAmount = weight * 0.025 * 1000; // grams per day
        monthlyCost = (naturalAmount / 1000) * costPerKg.natural * 30;
    }
    else {
        monthlyCost = ((dryFoodAmount / 2 / 1000) * costPerKg.dry + (wetFoodAmount / 2 / 400) * costPerKg.wet) * 30;
    }
    // Notes
    let notes = '';
    if (ageGroup === 'puppy') {
        notes = 'Щенкам и котятам требуется больше калорий для роста. Корм должен быть специально для молодых животных — с другим соотношением кальция и фосфора.';
    }
    else if (ageGroup === 'senior') {
        notes = 'Пожилым животным часто требуется меньше калорий, но корм лучшего качества. Следите за весом — лишний вес усугубляет проблемы с суставами.';
    }
    if (activityLevel === 'low') {
        notes += ' При низкой активности высок риск ожирения — контролируйте вес и уменьшайте порцию при наборе.';
    }
    return [
        { value: dailyCalories, label: 'Калорий в день', unit: 'ккал' },
        { value: dryFoodAmount, label: 'Сухого корма в день', unit: 'г' },
        { value: wetFoodAmount, label: 'Влажного корма в день', unit: 'г' },
        { value: mealsPerDay[ageGroup], label: 'Режим питания' },
        { value: Math.round(monthlyCost), label: 'Примерно в месяц', unit: '₽' },
        { value: notes, label: 'Важно' }
    ];
},
  'krepost-koktejlya': (inputs) => {
    const alcoholVolume = Number(inputs.alcoholVolume);
    const alcoholPercent = Number(inputs.alcoholPercent);
    const mixerVolume = Number(inputs.mixerVolume);
    if (!alcoholVolume && !mixerVolume) {
        return [{ value: '—', label: 'Результат' }];
    }
    const totalVolume = alcoholVolume + mixerVolume;
    const pureAlcohol = alcoholVolume * (alcoholPercent / 100);
    const resultPercent = totalVolume > 0 ? (pureAlcohol / totalVolume) * 100 : 0;
    let classification = '';
    if (resultPercent < 5)
        classification = 'Слабый (напиток)';
    else if (resultPercent < 15)
        classification = 'Средний (винный/коктейль)';
    else if (resultPercent < 30)
        classification = 'Крепкий коктейль';
    else
        classification = 'Очень крепкий';
    return [
        { value: totalVolume.toFixed(1), label: 'Общий объём', unit: 'мл' },
        { value: resultPercent.toFixed(2), label: 'Итоговая крепость', unit: '%' },
        { value: classification, label: 'Классификация' }
    ];
},
  'mashtabirovanie-recepta': (inputs) => {
    const originalServings = Number(inputs.originalServings);
    const targetServings = Number(inputs.targetServings);
    const originalAmount = Number(inputs.originalAmount);
    const unit = String(inputs.unit);
    if (!originalServings || !targetServings || !originalAmount) {
        return [
            { value: '—', label: 'Коэффициент масштабирования' },
            { value: '—', label: 'Новое количество' },
            { value: '—', label: 'Результат' },
            { value: '—', label: 'Рекомендации' }
        ];
    }
    const scalingFactor = targetServings / originalServings;
    const newAmount = originalAmount * scalingFactor;
    let formattedAmount: string;
    if (unit === 'pcs') {
        formattedAmount = `${Math.ceil(newAmount)} ${unit}`;
    }
    else if (newAmount >= 1000 && (unit === 'g' || unit === 'ml')) {
        formattedAmount = `${(newAmount / 1000).toFixed(2)} ${unit === 'g' ? 'кг' : 'л'}`;
    }
    else {
        formattedAmount = `${Math.round(newAmount * 10) / 10} ${unit}`;
    }
    let tips = '';
    if (scalingFactor > 2) {
        tips = 'При увеличении более чем в 2 раза: время выпечки может увеличиться, проверяйте готовность. Специи и соль увеличивайте осторожно (не в полной пропорции).';
    }
    else if (scalingFactor < 0.5) {
        tips = 'При уменьшении рецепта: время приготовления сократится, используйте меньшую посуду.';
    }
    else {
        tips = 'Стандартное масштабирование: все ингредиенты изменяются пропорционально.';
    }
    return [
        { value: Number(scalingFactor.toFixed(2)), label: 'Коэффициент масштабирования' },
        { value: Math.round(newAmount * 10) / 10, label: 'Новое количество' },
        { value: formattedAmount, label: 'Результат' },
        { value: tips, label: 'Рекомендации' }
    ];
},
  'nalogovyj-vychet': (inputs) => {
    const income = Number(inputs.income);
    const deductionType = String(inputs.deductionType);
    const expenses = Number(inputs.expenses);
    const taxRate = 0.13;
    const paidTax = income * taxRate;
    const maxDeductions: Record<string, number> = {
        'property': 2000000,
        'medical': 120000,
        'education': 120000,
        'investment': 400000,
        'charity': Math.min(income * 0.25, 1000000)
    };
    const maxDeduction = maxDeductions[deductionType];
    const actualDeduction = Math.min(expenses, maxDeduction);
    const taxReturn = Math.min(actualDeduction * taxRate, paidTax);
    return [
        {
            value: maxDeduction,
            label: 'Максимальная сумма вычета',
            unit: '₽'
        },
        {
            value: Math.round(taxReturn),
            label: 'Возврат налога (13%)',
            unit: '₽',
            additionalInfo: 'Максимально возможный'
        },
        {
            value: Math.round(paidTax),
            label: 'Уплаченный НДФЛ за год',
            unit: '₽'
        }
    ];
},
  'nomer-dnya-i-nedeli': (inputs) => {
    const dateStr = String(inputs.date);
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        return [{ value: 'Неверный формат даты', label: 'Ошибка' }];
    }
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const endOfYear = new Date(date.getFullYear(), 11, 31);
    const daysLeft = Math.floor((endOfYear.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return [
        { value: dayOfYear.toString(), label: 'День года', unit: 'день' },
        { value: weekNumber.toString(), label: 'Номер недели ISO', unit: 'неделя' },
        { value: dayOfWeek, label: 'День недели', unit: '' },
        { value: daysLeft.toString(), label: 'Дней до конца года', unit: 'дн' }
    ];
},
}
