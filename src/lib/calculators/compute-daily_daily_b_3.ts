import type { ComputeFn } from './compute-helpers';

export const computeMap_daily_daily_b_3: Record<string, ComputeFn> = {
  'stoimost-manikyura': (inputs) => {
    const serviceType = String(inputs.serviceType || 'hardware');
    const nailDesign = String(inputs.nailDesign || 'gel');
    const cityTier = String(inputs.cityTier || 'medium');
    const salonLevel = String(inputs.salonLevel || 'standard');
    const basePrices: Record<string, number> = {
        small: 500, medium: 800, large: 1200
    };
    const serviceMult: Record<string, number> = {
        classic: 1, hardware: 1.2, european: 0.9, spa: 1.5
    };
    const designMult: Record<string, number> = {
        none: 0, regular: 0.3, gel: 0.8, acrylic: 1.2, design: 1.5
    };
    const salonMult: Record<string, number> = {
        economy: 0.7, standard: 1, premium: 1.8
    };
    let cost = basePrices[cityTier];
    cost *= serviceMult[serviceType];
    cost += basePrices[cityTier] * designMult[nailDesign];
    cost *= salonMult[salonLevel];
    let duration = '';
    if (nailDesign === 'none') {
        duration = '30-45 минут';
    }
    else if (nailDesign === 'regular') {
        duration = '45-60 минут';
    }
    else if (nailDesign === 'gel' || nailDesign === 'design') {
        duration = '60-90 минут';
    }
    else if (nailDesign === 'acrylic') {
        duration = '90-120 минут';
    }
    let frequency = '';
    if (nailDesign === 'none' || nailDesign === 'regular') {
        frequency = 'Каждые 5-7 дней (лак обновляется)';
    }
    else if (nailDesign === 'gel' || nailDesign === 'design') {
        frequency = 'Каждые 2-3 недели (коррекция)';
    }
    else if (nailDesign === 'acrylic') {
        frequency = 'Каждые 2-3 недели (наращивание)';
    }
    let visitsPerMonth = 1;
    if (nailDesign === 'none' || nailDesign === 'regular') {
        visitsPerMonth = 4; // Weekly
    }
    else {
        visitsPerMonth = 1.5; // Every 2-3 weeks
    }
    const monthlyCost = Math.round(cost * visitsPerMonth);
    const annualCost = monthlyCost * 12;
    return [
        { value: Math.round(cost), label: 'Стоимость', unit: '₽' },
        { value: duration, label: 'Длительность' },
        { value: frequency, label: 'Частота коррекции' },
        { value: monthlyCost, label: 'Затраты в месяц', unit: '₽' },
        { value: annualCost, label: 'Затраты в год', unit: '₽' }
    ];
},
  'stoimost-moyki': (inputs) => {
    const washType = String(inputs.washType);
    const carSize = String(inputs.carSize);
    const washFrequency = String(inputs.washFrequency);
    const addServices = String(inputs.addServices);
    const baseCosts: Record<string, Record<string, number>> = {
        'self_service': { small: 250, medium: 300, large: 350, van: 400 },
        'automatic': { small: 300, medium: 400, large: 500, van: 600 },
        'touchless': { small: 350, medium: 450, large: 550, van: 650 },
        'hand_wash': { small: 500, medium: 700, large: 900, van: 1100 },
        'detailing': { small: 2000, medium: 3000, large: 4000, van: 5000 }
    };
    let singleWashCost = baseCosts[washType][carSize] || 400;
    const addServiceCosts: Record<string, number> = {
        'none': 0,
        'wax': 300,
        'interior': 500,
        'full': 700
    };
    singleWashCost += addServiceCosts[addServices];
    const washesPerMonth: Record<string, number> = {
        'weekly': 4,
        'biweekly': 2,
        'monthly': 1,
        'as_needed': 1
    };
    const monthlyWashes = washesPerMonth[washFrequency];
    const monthlyCost = singleWashCost * monthlyWashes;
    const yearlyCost = monthlyCost * 12;
    const timeSpent: Record<string, string> = {
        'self_service': '15-30 минут (ваше время)',
        'automatic': '5-10 минут',
        'touchless': '5-10 минут',
        'hand_wash': '30-60 минут',
        'detailing': '2-6 часов'
    };
    const quality: Record<string, string> = {
        'self_service': 'Зависит от ваших усилий. Можно добиться отличного результата.',
        'automatic': 'Среднее. Щётки могут оставлять царапины на ЛКП.',
        'touchless': 'Среднее. Безопасно для ЛКП, но может плохо отмывать сильные загрязнения.',
        'hand_wash': 'Хорошее. Ручная работа, внимание к деталям.',
        'detailing': 'Отличное. Глубокая очистка, защитные покрытия, идеальный результат.'
    };
    let recommendations = '';
    if (washType === 'self_service') {
        recommendations = 'Самый экономичный вариант. Используйте два ведра (мойка и полоскание), микрофибру, специальный автошампунь.';
    }
    else if (washType === 'automatic') {
        recommendations = 'Удобно, но рискует царапать ЛКП щётками. Не рекомендуется для дорогих автомобилей с тонким лаком.';
    }
    else if (washType === 'touchless') {
        recommendations = 'Безопасный для лакокрасочного покрытия метод, но иногда требует доработки вручную.';
    }
    else if (washType === 'hand_wash') {
        recommendations = 'Оптимальное соотношение цена/качество. Мойщики обращают внимание на детали.';
    }
    else {
        recommendations = 'Делайте детейлинг 1-2 раза в год для поддержания состояния кузова и салона.';
    }
    return [
        { value: singleWashCost, label: 'За одну мойку', unit: '₽' },
        { value: monthlyCost, label: 'В месяц', unit: '₽' },
        { value: yearlyCost, label: 'В год', unit: '₽' },
        { value: timeSpent[washType], label: 'Время' },
        { value: quality[washType], label: 'Качество мойки' },
        { value: recommendations, label: 'Совет' }
    ];
},
  'svadebnyj-byudzhet': (inputs) => {
    const guests = Number(inputs.guests) || 0;
    const budgetLevel = String(inputs.budgetLevel);
    if (!guests) {
        return [
            { value: '—', label: 'Общий бюджет', unit: '₽' },
            { value: '—', label: 'Банкет', unit: '₽' },
            { value: '—', label: 'Площадка', unit: '₽' },
            { value: '—', label: 'Фото и видео', unit: '₽' },
            { value: '—', label: 'Декор и цветы', unit: '₽' },
            { value: '—', label: 'Прочее (транспорт, тамада, наряды)', unit: '₽' }
        ];
    }
    const perPerson: Record<string, number> = {
        economy: 1500,
        standard: 3000,
        premium: 6000,
        luxury: 12000
    };
    const banquetPerPerson = perPerson[budgetLevel] || 3000;
    const banquet = guests * banquetPerPerson;
    const venue = Math.round(banquet * 0.3);
    const photoVideo = Math.round(banquet * 0.2);
    const decor = Math.round(banquet * 0.15);
    const other = Math.round(banquet * 0.35);
    const totalBudget = banquet + venue + photoVideo + decor + other;
    return [
        { value: totalBudget, label: 'Общий бюджет', unit: '₽' },
        { value: banquet, label: 'Банкет', unit: '₽' },
        { value: venue, label: 'Площадка', unit: '₽' },
        { value: photoVideo, label: 'Фото и видео', unit: '₽' },
        { value: decor, label: 'Декор и цветы', unit: '₽' },
        { value: other, label: 'Прочее (транспорт, тамада, наряды)', unit: '₽' }
    ];
},
  'temperatura-duhovki': (inputs) => {
    const celsius = Number(inputs.celsius);
    if (!celsius) {
        return [
            { value: '—', label: 'Фаренгейт', unit: '°F' },
            { value: '—', label: 'Газовая шкала' },
            { value: '—', label: 'Описание режима' },
            { value: '—', label: 'Подходит для' }
        ];
    }
    const fahrenheit = Math.round((celsius * 9 / 5) + 32);
    let gasMark: string;
    if (celsius < 135)
        gasMark = '1/4';
    else if (celsius < 150)
        gasMark = '1/2';
    else if (celsius < 165)
        gasMark = '1';
    else if (celsius < 180)
        gasMark = '2';
    else if (celsius < 190)
        gasMark = '3';
    else if (celsius < 200)
        gasMark = '4';
    else if (celsius < 220)
        gasMark = '5';
    else if (celsius < 230)
        gasMark = '6';
    else if (celsius < 240)
        gasMark = '7';
    else if (celsius < 250)
        gasMark = '8';
    else
        gasMark = '9';
    let description: string;
    let suitableFor: string;
    if (celsius < 120) {
        description = 'Очень низкая';
        suitableFor = 'Сушка, подогрев';
    }
    else if (celsius < 150) {
        description = 'Низкая';
        suitableFor = 'Меренги, сушка овощей';
    }
    else if (celsius < 170) {
        description = 'Средне-низкая';
        suitableFor = 'Тушение, запекание рыбы';
    }
    else if (celsius < 190) {
        description = 'Средняя';
        suitableFor = 'Печенье, кексы, запеканки';
    }
    else if (celsius < 210) {
        description = 'Средне-высокая';
        suitableFor = 'Торты, пироги, рулеты';
    }
    else if (celsius < 230) {
        description = 'Высокая';
        suitableFor = 'Хлеб, пицца, выпечка с дрожжами';
    }
    else {
        description = 'Очень высокая';
        suitableFor = 'Пицца на тонком тесте, обжарка';
    }
    return [
        { value: fahrenheit, label: 'Фаренгейт', unit: '°F' },
        { value: gasMark, label: 'Газовая шкала' },
        { value: description, label: 'Описание режима' },
        { value: suitableFor, label: 'Подходит для' }
    ];
},
  'temperatura-pochvy': (inputs) => {
    const airTemp = Number(inputs.airTemp);
    const sunny = String(inputs.sunny);
    const mulch = String(inputs.mulch);
    const depth = Number(inputs.depth);
    if (!airTemp) {
        return [
            { value: '—', label: 'Температура почвы', unit: '°C' },
            { value: '—', label: 'Готово для посева' },
            { value: '—', label: 'Примечание по глубине' }
        ];
    }
    // Soil temp is usually 2-5 degrees lower than air temp
    let soilTemp = airTemp - 3;
    if (sunny === 'yes') {
        soilTemp += 2;
    }
    else {
        soilTemp -= 1;
    }
    const mulchAdjust: Record<string, number> = {
        'none': 0,
        'light': -1,
        'heavy': -3
    };
    soilTemp += mulchAdjust[mulch];
    soilTemp -= (depth - 5) * 0.3;
    let readyFor = '';
    if (soilTemp >= 10) {
        readyFor = 'Огурцы, тыквы, кукуруза, фасоль';
    }
    else if (soilTemp >= 8) {
        readyFor = 'Свёкла, морковь, редис, шпинат';
    }
    else if (soilTemp >= 5) {
        readyFor = 'Картофель, лук, горох, укроп';
    }
    else if (soilTemp >= 2) {
        readyFor = 'Ранняя редька, зелень, горох';
    }
    else {
        readyFor = 'Ещё рано для посева';
    }
    let depthNote = '';
    if (depth > 10) {
        depthNote = 'На глубине >10 см почва прогревается медленнее. Для раннего посева делайте мелкие борозды.';
    }
    else {
        depthNote = 'Мелкая посадка быстрее прогревается, но быстрее высыхает.';
    }
    return [
        { value: Math.round(soilTemp), label: 'Температура почвы', unit: '°C' },
        { value: readyFor, label: 'Готово для посева' },
        { value: depthNote, label: 'Примечание по глубине' }
    ];
},
  'udobreniya-dlya-sada': (inputs) => {
    const area = Number(inputs.area);
    const fertilizerType = String(inputs.fertilizerType);
    const plantGroup = String(inputs.plantGroup);
    if (!area) {
        return [
            { value: '—', label: 'Удобрений нужно', unit: 'кг' },
            { value: '—', label: 'На квадратный метр', unit: 'г/м²' },
            { value: '—', label: 'Способ внесения' },
            { value: '—', label: 'Сроки внесения' },
            { value: '—', label: 'Предупреждение' }
        ];
    }
    const rates: Record<string, Record<string, number>> = {
        'nitrogen': { 'vegetables': 20, 'fruits': 15, 'root': 15, 'leafy': 25, 'flowers': 20 },
        'phosphorus': { 'vegetables': 30, 'fruits': 40, 'root': 35, 'leafy': 20, 'flowers': 25 },
        'potassium': { 'vegetables': 20, 'fruits': 25, 'root': 20, 'leafy': 15, 'flowers': 20 },
        'complex': { 'vegetables': 50, 'fruits': 60, 'root': 55, 'leafy': 45, 'flowers': 50 },
        'organic': { 'vegetables': 3000, 'fruits': 4000, 'root': 3500, 'leafy': 2500, 'flowers': 2000 }
    };
    const rate = rates[fertilizerType][plantGroup];
    const totalGrams = area * rate;
    const totalKg = totalGrams / 1000;
    const methods: Record<string, string> = {
        'nitrogen': 'Внесение в рядки перед посадкой или подкормка в фазу роста',
        'phosphorus': 'Внесение в лунки при посадке для лучшего усвоения',
        'potassium': 'Внесение под перекопку осенью или весной',
        'complex': 'Внесение равномерно по площади перед перекопкой',
        'organic': 'Перекапывание в осеннюю перекопку или весной под посадку'
    };
    const timings: Record<string, string> = {
        'nitrogen': 'Весна, начало лета. Не вносите поздно — отрастёт ботва вместо плодов.',
        'phosphorus': 'При посадке. Действует медленно, вносить заранее.',
        'potassium': 'Осень или ранняя весна. Улучшает зимостойкость и урожай.',
        'complex': 'За 2 недели до посадки. Содержит все элементы.',
        'organic': 'Осень под перекопку или весной за 2 недели до посадки.'
    };
    const warnings: Record<string, string> = {
        'nitrogen': 'Осторожно! Избыток азота отравляет растения и накапливается в плодах как нитраты.',
        'phosphorus': 'Не переборщите — фосфор связывается с почвой и не вымывается.',
        'potassium': 'Зола щелочная, не подходит для кислых почв.',
        'complex': 'Соблюдайте нормы — избыток удобрений вредит.',
        'organic': 'Перегной должен быть хорошо перепревшим — свежий навоз жжёт корни!'
    };
    return [
        { value: Number(totalKg.toFixed(2)), label: 'Удобрений нужно', unit: 'кг' },
        { value: rate, label: 'На квадратный метр', unit: 'г/м²' },
        { value: methods[fertilizerType], label: 'Способ внесения' },
        { value: timings[fertilizerType], label: 'Сроки внесения' },
        { value: warnings[fertilizerType], label: 'Предупреждение' }
    ];
},
}
