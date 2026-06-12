import type { ComputeFn } from './compute-helpers';

export const computeMap_daily_daily_a_4: Record<string, ComputeFn> = {
  'novogodniy-dekor': (inputs) => {
    const treeSize = String(inputs.treeSize);
    const treeType = String(inputs.treeType);
    const lightLength = Number(inputs.lightLength);
    const ornamentCount = Number(inputs.ornamentCount);
    const additionalDecor = String(inputs.additionalDecor);
    const quality = String(inputs.quality);
    const qualityMultipliers: Record<string, number> = {
        'budget': 0.5,
        'standard': 1.0,
        'premium': 2.5
    };
    const multiplier = qualityMultipliers[quality];
    const treeCosts: Record<string, Record<string, number>> = {
        'none': { live: 0, potted: 0, artificial: 0, premium_artificial: 0 },
        'small': { live: 500, potted: 800, artificial: 1500, premium_artificial: 3000 },
        'medium': { live: 1500, potted: 2000, artificial: 3000, premium_artificial: 8000 },
        'large': { live: 3000, potted: 4000, artificial: 5000, premium_artificial: 15000 },
        'xlarge': { live: 6000, potted: 8000, artificial: 10000, premium_artificial: 25000 }
    };
    const treeCost = treeCosts[treeSize][treeType] ? Math.round(treeCosts[treeSize][treeType] * multiplier) : 0;
    const lightCostPerMeter = quality === 'budget' ? 50 : quality === 'standard' ? 100 : 250;
    const lightsCost = lightLength * lightCostPerMeter;
    const ornamentCostPerItem = quality === 'budget' ? 20 : quality === 'standard' ? 50 : 150;
    const ornamentsCost = ornamentCount * ornamentCostPerItem;
    const additionalCosts: Record<string, number> = {
        'none': 0,
        'basic': quality === 'budget' ? 300 : quality === 'standard' ? 800 : 2000,
        'full': quality === 'budget' ? 800 : quality === 'standard' ? 2000 : 6000,
        'extreme': quality === 'budget' ? 1500 : quality === 'standard' ? 5000 : 15000
    };
    const additionalCost = additionalCosts[additionalDecor];
    const totalCost = treeCost + lightsCost + ornamentsCost + additionalCost;
    let recommendations = '';
    if (treeType === 'live') {
        recommendations = 'Живая ёлка требует ухода: вода в поддон, не ставьте near батареи, утилизируйте экологично после праздников (пункты сбора).';
    }
    else if (treeType === 'potted') {
        recommendations = 'Ёлка в горшке — можно посадить после праздников или оставить в горшке для следующего года. Поливайте умеренно.';
    }
    else {
        recommendations = 'Искусственная ёлка служит 5-10 лет. Храните в коробке away from солнца. Литые ветви выглядят реалистичнее.';
    }
    if (lightLength > 0) {
        recommendations += ` Для ёлки высотой ${treeSize === 'small' ? 'до 1м' : treeSize === 'medium' ? '1.5-1.8м' : '2м и выше'} рекомендуется ${treeSize === 'small' ? '3-5' : treeSize === 'medium' ? '8-12' : '15-20'} метров гирлянд.`;
    }
    return [
        { value: treeCost, label: 'Ёлка', unit: '₽' },
        { value: lightsCost, label: 'Гирлянды', unit: '₽' },
        { value: ornamentsCost, label: 'Игрушки', unit: '₽' },
        { value: additionalCost, label: 'Доп. декор', unit: '₽' },
        { value: totalCost, label: 'ВСЕГО', unit: '₽' },
        { value: recommendations, label: 'Советы' }
    ];
},
  'obratnyj-otschet-do-daty': (inputs) => {
    const now = new Date();
    const targetDateStr = String(inputs.targetDate);
    const targetTime = String(inputs.targetTime) || '00:00';
    if (!targetDateStr) {
        return [{ value: '—', label: 'Результат' }];
    }
    const [hours, minutes] = targetTime.split(':').map(Number);
    const target = new Date(targetDateStr);
    target.setHours(hours || 0, minutes || 0, 0, 0);
    const diff = target.getTime() - now.getTime();
    if (diff < 0) {
        return [
            { value: 'Событие уже прошло!', label: 'Результат' },
            { value: '—', label: 'Детально' }
        ];
    }
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const weeks = Math.floor(totalDays / 7);
    return [
        { value: totalDays.toString(), label: 'Всего дней', unit: 'дн.' },
        { value: `${totalDays} дн. ${remainingHours} ч. ${remainingMinutes} мин.`, label: 'Детально' },
        { value: weeks.toString(), label: 'Недель', unit: 'нед.' }
    ];
},
  'odezhda-po-pogode': (inputs) => {
    const temperature = Number(inputs.temperature);
    const windSpeed = Number(inputs.windSpeed);
    const activityLevel = String(inputs.activityLevel);
    const precipitation = String(inputs.precipitation);
    // Simplified formula: feels like = temp - (wind * 0.7) for cold weather
    let feelsLike = temperature;
    if (temperature <= 10 && windSpeed > 5) {
        feelsLike = temperature - (windSpeed * 0.7);
    }
    else if (temperature > 25 && windSpeed > 10) {
        feelsLike = temperature - (windSpeed * 0.2); // Wind cools in heat too
    }
    const activityAdjustment: Record<string, number> = {
        'low': -2,
        'medium': 0,
        'high': 5
    };
    const adjustedTemp = feelsLike + activityAdjustment[activityLevel];
    let baseLayer = '';
    let midLayer = '';
    let outerLayer = '';
    let accessories = '';
    let recommendations = '';
    if (adjustedTemp >= 25) {
        baseLayer = 'Лёгкая дышащая футболка или майка из хлопка/синтетики';
        midLayer = 'Не требуется';
        outerLayer = 'Не требуется (возьмите лёгкую рубашку на всякий случай)';
        accessories = 'Кепка/панама от солнца, солнцезащитные очки';
        recommendations = 'Пейте больше воды. Носите светлую одежду — она отражает солнце.';
    }
    else if (adjustedTemp >= 15) {
        baseLayer = 'Футболка с коротким или длинным рукавом';
        midLayer = 'Лёгкий кардиган или толстовка на всякий случай';
        outerLayer = 'Лёгкая ветровка при ветре > 15 км/ч';
        accessories = 'При необходимости — лёгкий шарф';
        recommendations = 'Универсальная погода — слои можно снять при нагреве.';
    }
    else if (adjustedTemp >= 5) {
        baseLayer = 'Термобельё или длинный рукав';
        midLayer = 'Свитер, худи или флисовая кофта';
        outerLayer = 'Куртка или пальто средней плотности';
        accessories = 'Шапка или повязка, лёгкие перчатки';
        recommendations = 'Погода для слоёв. В помещении можно снять верхний слой.';
    }
    else if (adjustedTemp >= -10) {
        baseLayer = 'Термобельё (верх и низ) или тёплое бельё';
        midLayer = 'Тёплый свитер или флисовая кофта';
        outerLayer = 'Зимняя куртка с утеплителем';
        accessories = 'Шапка, шарф, перчатки, тёплые носки';
        recommendations = 'Не оставляйте открытыми участки кожи — потери тепла значительны.';
    }
    else {
        baseLayer = 'Термобельё (верх и низ), тёплая термофутболка';
        midLayer = 'Флисовая кофта + тёплый свитер или жилет';
        outerLayer = 'Пуховик или парка с мембраной';
        accessories = 'Утеплённая шапка, шарф-труба, варежки, тёплые носки';
        recommendations = 'Экстремальный холод. Минимизируйте время на улице, проверяйте пальцы и уши.';
    }
    if (precipitation === 'rain') {
        outerLayer = 'Водонепроницаемая куртка или дождевик поверх одежды';
        accessories += ', зонт или капюшон';
        recommendations += ' Дождливая погода — возьмите сменную обувь или непромокаемые ботинки.';
    }
    else if (precipitation === 'snow') {
        outerLayer = 'Зимняя водонепроницаемая куртка';
        accessories += ', защита для обуви от слякоти';
        recommendations += ' Снежная погода — обувь на толстой подошве с протектором.';
    }
    return [
        { value: `${Math.round(feelsLike)}°C`, label: 'Ощущается как' },
        { value: baseLayer, label: 'Базовый слой (впритык к телу)' },
        { value: midLayer, label: 'Средний слой (утепление)' },
        { value: outerLayer, label: 'Верхний слой (защита)' },
        { value: accessories, label: 'Аксессуары' },
        { value: recommendations, label: 'Советы' }
    ];
},
  'pereezd-raschet': (inputs) => {
    const rooms = Number(inputs.rooms);
    const distance = Number(inputs.distance);
    const floorFrom = Number(inputs.floorFrom);
    const floorTo = Number(inputs.floorTo);
    const hasElevator = String(inputs.hasElevator) === 'yes';
    const packing = String(inputs.packing);
    const volume = rooms * 12;
    const truckTrips = Math.ceil(volume / 15);
    let cost = truckTrips * (3000 + distance * 30);
    if (!hasElevator)
        cost += (floorFrom + floorTo) * 300;
    cost += rooms * 2000;
    if (packing === 'service')
        cost += volume * 150;
    return [
        { value: volume, label: 'Объём вещей', unit: 'м³' },
        { value: truckTrips, label: 'Рейсов газели' },
        { value: Math.round(cost / 100) * 100, label: 'Ориентировочная стоимость', unit: '₽' }
    ];
},
  'planirovshik-pitaniya': (inputs) => {
    const dietType = String(inputs.dietType);
    const dailyCalories = Number(inputs.dailyCalories);
    const mealsPerDay = Number(inputs.mealsPerDay);
    const _bodyWeight = Number(inputs.bodyWeight);
    const macroRatios: Record<string, {
        p: number;
        f: number;
        c: number;
    }> = {
        'keto': { p: 20, f: 75, c: 5 },
        'paleo': { p: 30, f: 40, c: 30 },
        'vegan': { p: 15, f: 30, c: 55 },
        'balanced': { p: 25, f: 30, c: 45 },
        'lowfat': { p: 30, f: 15, c: 55 }
    };
    const ratios = macroRatios[dietType];
    const proteinGrams = Math.round((dailyCalories * (ratios.p / 100)) / 4);
    const fatGrams = Math.round((dailyCalories * (ratios.f / 100)) / 9);
    const carbsGrams = Math.round((dailyCalories * (ratios.c / 100)) / 4);
    const caloriesPerMeal = Math.round(dailyCalories / mealsPerDay);
    const exampleFoods: Record<string, string> = {
        'keto': 'Авокадо, оливки, орехи, рыба, яйца, сало',
        'paleo': 'Мясо, рыба, яйца, овощи, фрукты, орехи',
        'vegan': 'Тофу, чечевица, киноа, орехи, овощи, фрукты',
        'balanced': 'Курица, рыба, крупы, овощи, фрукты, орехи',
        'lowfat': 'Курица, белок яйца, овощи, фрукты, зерновые'
    };
    return [
        { value: caloriesPerMeal, label: 'Калорий за приём', unit: 'ккал' },
        { value: proteinGrams, label: 'Белки в день', unit: 'г' },
        { value: fatGrams, label: 'Жиры в день', unit: 'г' },
        { value: carbsGrams, label: 'Углеводы в день', unit: 'г' },
        { value: exampleFoods[dietType], label: 'Примеры продуктов' }
    ];
},
  'ploshad-posadki': (inputs) => {
    const people = Number(inputs.people);
    const potato = Number(inputs.potato);
    const vegetables = Number(inputs.vegetables);
    if (!people) {
        return [
            { value: '—', label: 'Картофеля всего', unit: 'кг' },
            { value: '—', label: 'Площадь под картофель', unit: 'м²' },
            { value: '—', label: 'Площадь под овощи', unit: 'м²' },
            { value: '—', label: 'Общая площадь', unit: 'м²' },
            { value: '—', label: 'В сотках', unit: 'соток' }
        ];
    }
    const potatoYield = 4; // kg/m²
    const vegYield = 6; // kg/m² average
    const totalPotato = potato * people;
    const totalVeg = vegetables * people;
    const potatoArea = totalPotato / potatoYield;
    const vegArea = totalVeg / vegYield;
    const totalArea = potatoArea + vegArea;
    const inSotki = totalArea / 100;
    return [
        { value: totalPotato, label: 'Картофеля всего', unit: 'кг' },
        { value: Math.round(potatoArea), label: 'Площадь под картофель', unit: 'м²' },
        { value: Math.round(vegArea), label: 'Площадь под овощи', unit: 'м²' },
        { value: Math.round(totalArea), label: 'Общая площадь', unit: 'м²' },
        { value: Number(inSotki.toFixed(1)), label: 'В сотках', unit: 'соток' }
    ];
},
  'podarki-na-svadbu': (inputs) => {
    const relation = String(inputs.relationship);
    const attending = String(inputs.attending) === 'yes';
    const region = String(inputs.region);
    let base = 3000;
    if (relation === 'close')
        base = 15000;
    else if (relation === 'relative')
        base = 7000;
    else if (relation === 'colleague')
        base = 3000;
    else
        base = 2000;
    if (!attending)
        base = base * 0.5;
    let regionMult = 1;
    if (region === 'moscow')
        regionMult = 1.5;
    else if (region === 'small')
        regionMult = 0.7;
    const moneyGift = Math.round(base * regionMult / 1000) * 1000;
    let alternative = '';
    if (relation === 'close')
        alternative = 'Подарок из вишлиста (20000-30000₽) или сертификат';
    else if (moneyGift < 5000)
        alternative = 'Подарок (3000-5000₽) или набор для дома';
    else
        alternative = 'Деньги в конверте';
    let etiquette = attending ? 'Принесите на свадьбу или передадите лично' : 'Отправьте до/после свадьбы';
    return [
        { value: moneyGift, label: 'Денежный подарок', unit: '₽' },
        { value: alternative, label: 'Альтернатива' },
        { value: etiquette, label: 'Этикет' }
    ];
},
  'podbrosit-monetku': (inputs) => {
    const flips = Math.min(Number(inputs.flips) || 1, 100);
    const results: string[] = [];
    for (let i = 0; i < flips; i++) {
        results.push(Math.random() < 0.5 ? 'Орёл' : 'Решка');
    }
    return [
        { value: results.join(', '), label: `Результат (${flips} бросок${flips > 1 ? 'ов' : ''})`, unit: '' }
    ];
},
  'poezdka-na-mashine': (inputs) => {
    const distance = Number(inputs.distance);
    const consumption = Number(inputs.fuelConsumption);
    const fuelPrice = Number(inputs.fuelPrice);
    const tollRoads = Number(inputs.tollRoads);
    const passengers = Number(inputs.passengers);
    const fuelNeeded = (distance / 100) * consumption;
    const fuelCost = fuelNeeded * fuelPrice;
    const totalCost = fuelCost + tollRoads;
    const perPerson = totalCost / passengers;
    return [
        { value: Math.round(fuelNeeded * 10) / 10, label: 'Топлива нужно', unit: 'л' },
        { value: Math.round(fuelCost), label: 'Стоимость топлива', unit: '₽' },
        { value: Math.round(totalCost), label: 'Всего расходов', unit: '₽' },
        { value: Math.round(perPerson), label: 'На человека', unit: '₽' }
    ];
},
  'poliv-rastenij': (inputs) => {
    const plantType = String(inputs.plantType);
    const potSize = String(inputs.potSize);
    const season = String(inputs.season);
    const conditions = String(inputs.conditions);
    const baseFreq: Record<string, number> = {
        'succulent': 14,
        'leafy': 7,
        'flowering': 5,
        'palm': 10,
        'fern': 4,
        'herb': 3
    };
    let frequency = baseFreq[plantType];
    const seasonMult: Record<string, number> = {
        'summer': 0.8,
        'winter': 1.5,
        'transition': 1.0
    };
    frequency *= seasonMult[season];
    const condMult: Record<string, number> = {
        'bright': 0.9,
        'moderate': 1.0,
        'shady': 1.2
    };
    frequency *= condMult[conditions];
    const potMult: Record<string, number> = {
        'small': 0.9,
        'medium': 1.0,
        'large': 1.2
    };
    frequency *= potMult[potSize];
    const waterAmount: Record<string, string> = {
        'small': '50-100 мл',
        'medium': '200-300 мл',
        'large': '400-600 мл'
    };
    const tips: Record<string, string> = {
        'succulent': 'Поливайте только когда земля полностью высохнет',
        'leafy': 'Поддерживайте умеренную влажность почвы',
        'flowering': 'Избегайте попадания воды на листья и цветы',
        'palm': 'Опрыскивайте листья для повышения влажности',
        'fern': 'Не допускайте пересыхания, любят высокую влажность',
        'herb': 'Поливайте обильно, почва должна быть влажной'
    };
    return [
        {
            value: `Каждые ${Math.round(frequency)} дней`,
            label: 'Рекомендуемая частота полива'
        },
        {
            value: waterAmount[potSize],
            label: 'Количество воды'
        },
        {
            value: tips[plantType],
            label: 'Специфические советы'
        }
    ];
},
}
