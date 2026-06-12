import type { ComputeFn } from './compute-helpers';

export const computeMap_daily_daily_b_2: Record<string, ComputeFn> = {
  'razmer-obuvi-konverter': (inputs) => {
    const ruSize = Number(inputs.ruSize) || 0;
    if (!ruSize) {
        return [
            { value: '—', label: 'Европейский (EU)' },
            { value: '—', label: 'Американский мужской (US)' },
            { value: '—', label: 'Американский женский (US)' },
            { value: '—', label: 'Британский (UK)' },
            { value: '—', label: 'Длина стопы', unit: 'см' }
        ];
    }
    const footLength = (ruSize / 2) + 10;
    const _footLengthMm = footLength * 10;
    const euSize = ruSize;
    const usMenSize = ruSize - 32.5;
    const usWomenSize = ruSize - 31.5;
    const ukSize = ruSize - 33.5;
    return [
        { value: euSize, label: 'Европейский (EU)' },
        { value: Number(usMenSize.toFixed(1)), label: 'Американский мужской (US)' },
        { value: Number(usWomenSize.toFixed(1)), label: 'Американский женский (US)' },
        { value: Number(ukSize.toFixed(1)), label: 'Британский (UK)' },
        { value: Number(footLength.toFixed(1)), label: 'Длина стопы', unit: 'см' }
    ];
},
  'razmery-odezhdy': (inputs) => {
    const chest = Number(inputs.chest);
    const waist = Number(inputs.waist);
    const hips = Number(inputs.hips);
    const gender = String(inputs.gender);
    if (!chest || !waist || !hips) {
        return [{ value: '—', label: 'Результат' }];
    }
    const menSizes = [
        { chest: [80, 86], waist: [68, 74], hips: [84, 90], ru: '44-46', eu: '34-36', intl: 'XS-S' },
        { chest: [86, 92], waist: [74, 80], hips: [90, 96], ru: '46-48', eu: '36-38', intl: 'S-M' },
        { chest: [92, 98], waist: [80, 86], hips: [96, 102], ru: '48-50', eu: '38-40', intl: 'M-L' },
        { chest: [98, 104], waist: [86, 92], hips: [102, 108], ru: '50-52', eu: '40-42', intl: 'L-XL' },
        { chest: [104, 110], waist: [92, 98], hips: [108, 114], ru: '52-54', eu: '42-44', intl: 'XL-XXL' },
        { chest: [110, 116], waist: [98, 104], hips: [114, 120], ru: '54-56', eu: '44-46', intl: 'XXL-3XL' }
    ];
    const womenSizes = [
        { chest: [76, 82], waist: [58, 64], hips: [84, 90], ru: '40-42', eu: '32-34', intl: 'XS-S' },
        { chest: [82, 88], waist: [64, 70], hips: [90, 96], ru: '42-44', eu: '34-36', intl: 'S-M' },
        { chest: [88, 94], waist: [70, 76], hips: [96, 102], ru: '44-46', eu: '36-38', intl: 'M-L' },
        { chest: [94, 100], waist: [76, 82], hips: [102, 108], ru: '46-48', eu: '38-40', intl: 'L-XL' },
        { chest: [100, 106], waist: [82, 88], hips: [108, 114], ru: '48-50', eu: '40-42', intl: 'XL-XXL' },
        { chest: [106, 112], waist: [88, 94], hips: [114, 120], ru: '50-52', eu: '42-44', intl: 'XXL-3XL' }
    ];
    const table = gender === 'male' ? menSizes : womenSizes;
    let bestMatch = table[2];
    let bestScore = -1;
    for (const size of table) {
        const chestScore = (chest >= size.chest[0] && chest <= size.chest[1]) ? 3 : Math.max(0, 3 - Math.min(Math.abs(chest - size.chest[0]), Math.abs(chest - size.chest[1])) / 3);
        const waistScore = (waist >= size.waist[0] && waist <= size.waist[1]) ? 2 : Math.max(0, 2 - Math.min(Math.abs(waist - size.waist[0]), Math.abs(waist - size.waist[1])) / 3);
        const hipsScore = (hips >= size.hips[0] && hips <= size.hips[1]) ? 1 : Math.max(0, 1 - Math.min(Math.abs(hips - size.hips[0]), Math.abs(hips - size.hips[1])) / 3);
        const score = chestScore + waistScore + hipsScore;
        if (score > bestScore) {
            bestScore = score;
            bestMatch = size;
        }
    }
    return [
        { value: bestMatch.ru, label: 'Российский размер' },
        { value: bestMatch.intl, label: 'Международный' },
        { value: bestMatch.eu, label: 'Европейский' }
    ];
},
  'raznica-mezhdu-datami': (inputs) => {
    const date1 = new Date(String(inputs.date1));
    const date2 = new Date(String(inputs.date2));
    const includeEnd = String(inputs.includeEnd) === 'yes';
    let start = date1;
    let end = date2;
    if (date1 > date2) {
        start = date2;
        end = date1;
    }
    const diffMs = end.getTime() - start.getTime();
    let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (includeEnd) {
        diffDays += 1;
    }
    const weeks = Math.floor(diffDays / 7);
    const daysRemainder = diffDays % 7;
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    const workDays = Math.floor(diffDays * 5 / 7);
    return [
        { value: diffDays, label: 'Всего дней', unit: 'дн.' },
        { value: `${weeks} нед ${daysRemainder} дн`, label: 'Недель и дней' },
        { value: `${years} лет ${months} мес`, label: 'Полных месяцев/лет' },
        { value: (years + months / 12).toFixed(1), label: 'В годах (десятично)' },
        { value: `~${workDays}`, label: 'Рабочих дней (пн-пт)' }
    ];
},
  'remont-telefona-stoimost': (inputs) => {
    const brand = String(inputs.brand);
    const repair = String(inputs.repairType);
    const tier = String(inputs.modelTier);
    let baseCost = 0;
    if (repair === 'screen')
        baseCost = 5000;
    else if (repair === 'battery')
        baseCost = 2000;
    else if (repair === 'charging')
        baseCost = 1500;
    else if (repair === 'camera')
        baseCost = 3000;
    else if (repair === 'water')
        baseCost = 4000;
    let brandMultiplier = 1;
    if (brand === 'apple')
        brandMultiplier = 2;
    else if (brand === 'samsung')
        brandMultiplier = 1.5;
    let tierMultiplier = 1;
    if (tier === 'premium')
        tierMultiplier = 1.5;
    else if (tier === 'budget')
        tierMultiplier = 0.7;
    const minCost = baseCost * brandMultiplier * tierMultiplier * 0.6;
    const maxCost = baseCost * brandMultiplier * tierMultiplier;
    const officialCost = baseCost * brandMultiplier * tierMultiplier * 1.5;
    let time = '';
    if (repair === 'screen' || repair === 'battery')
        time = '30-60 мин';
    else if (repair === 'charging')
        time = '1-2 часа';
    else
        time = '2-7 дней';
    return [
        { value: Math.round(minCost), label: 'Минимальная цена', unit: '₽' },
        { value: Math.round(maxCost), label: 'Максимальная цена', unit: '₽' },
        { value: Math.round(officialCost), label: 'Официальный сервис', unit: '₽' },
        { value: time, label: 'Время ремонта' }
    ];
},
  'sad-ogorod-raschet': (inputs) => {
    const crop = String(inputs.cropType);
    const area = Number(inputs.area);
    const data: Record<string, {
        spacing: number;
        row: number;
        seedsPerM2: number;
        yield: number;
    }> = {
        tomato: { spacing: 0.5, row: 0.6, seedsPerM2: 4, yield: 5 },
        cucumber: { spacing: 0.3, row: 1.0, seedsPerM2: 3, yield: 4 },
        potato: { spacing: 0.3, row: 0.7, seedsPerM2: 6, yield: 3 },
        carrot: { spacing: 0.05, row: 0.2, seedsPerM2: 100, yield: 3 },
        beet: { spacing: 0.1, row: 0.25, seedsPerM2: 40, yield: 4 },
        cabbage: { spacing: 0.5, row: 0.6, seedsPerM2: 3, yield: 4 }
    };
    const cropData = data[crop];
    const plantsCount = Math.floor(area / (cropData.spacing * cropData.row));
    const seedsNeeded = Math.ceil(area * cropData.seedsPerM2);
    const spacing = `${cropData.spacing}×${cropData.row} м`;
    const yieldEstimate = area * cropData.yield;
    return [
        { value: plantsCount, label: 'Количество растений', unit: 'шт' },
        { value: seedsNeeded, label: 'Семян нужно', unit: 'г' },
        { value: spacing, label: 'Схема посадки' },
        { value: Math.round(yieldEstimate), label: 'Ожидаемый урожай', unit: 'кг' }
    ];
},
  'shkolnye-prinadlezhnosti': (inputs) => {
    const grade = String(inputs.grade);
    const quality = String(inputs.quality);
    const includeTech = String(inputs.includeTech) === 'yes';
    const qualityMultipliers: Record<string, number> = {
        'budget': 0.6,
        'standard': 1.0,
        'premium': 2.0
    };
    const multiplier = qualityMultipliers[quality];
    const gradeCosts: Record<string, {
        backpack: number;
        stationery: number;
        notebooks: number;
        art: number;
        tech: number;
    }> = {
        'grade1': { backpack: 1500, stationery: 800, notebooks: 500, art: 600, tech: 0 },
        'grade4': { backpack: 1500, stationery: 1000, notebooks: 800, art: 700, tech: 0 },
        'grade5': { backpack: 2000, stationery: 1500, notebooks: 1200, art: 800, tech: 500 },
        'grade9': { backpack: 2000, stationery: 1800, notebooks: 1500, art: 500, tech: 1500 },
        'grade11': { backpack: 2500, stationery: 2000, notebooks: 2000, art: 300, tech: 3000 },
        'university1': { backpack: 3000, stationery: 1500, notebooks: 1000, art: 200, tech: 15000 },
        'university3': { backpack: 0, stationery: 1000, notebooks: 800, art: 0, tech: 5000 }
    };
    const costs = gradeCosts[grade];
    const backpack = Math.round(costs.backpack * multiplier);
    const stationery = Math.round(costs.stationery * multiplier);
    const notebooks = Math.round(costs.notebooks * multiplier);
    const artSupplies = Math.round(costs.art * multiplier);
    const tech = includeTech ? Math.round(costs.tech * (quality === 'premium' ? 1.5 : 1)) : 0;
    const totalCost = backpack + stationery + notebooks + artSupplies + tech;
    const lists: Record<string, string> = {
        'grade1': 'Рюкзак школьный, 10 тетрадей в клетку/линию, цветные карандаши 12 цв., фломастеры, пластилин, кисти, ножницы, клей, линейка, пенал',
        'grade4': 'Рюкзак, 15 тетрадей, ручки шариковые/гелевые, цветные карандаши, фломастеры, фломастеры для доски, пластилин, краски акварель, кисти, циркуль',
        'grade5': 'Рюкзак ортопедический, 20 тетрадей, ручки разных цветов, карандаши чернографитные, ластик, точилка, циркуль, линейка, транспортир, краски акварель/гуашь, кисти',
        'grade9': 'Портфель/рюкзак, 25 тетрадей, ручки гелевые, карандаши, циркуль, линейки, учебники, калькулятор, краски (при необходимости)',
        'grade11': 'Сумка/рюкзак, 30 тетрадей, ручки гелевые, маркеры, учебники, словарь (ин. язык), калькулятор инженерный, планшет/ноутбук (рекомендуется)',
        'university1': 'Рюкзак/сумка для ноутбука, блокноты, ручки, маркеры, папки-скоросшиватели, листы А4, степлер, ноутбук/планшет, наушники',
        'university3': 'Блокноты, ручки, папки, листы А4, принадлежности по специальности, возможно обновление техники'
    };
    return [
        { value: totalCost, label: 'Общая сумма', unit: '₽' },
        { value: backpack, label: 'Рюкзак/сумка', unit: '₽' },
        { value: stationery, label: 'Канцелярия', unit: '₽' },
        { value: notebooks, label: 'Тетради', unit: '₽' },
        { value: artSupplies, label: 'Для рисования/труда', unit: '₽' },
        { value: tech, label: 'Техника', unit: '₽' },
        { value: lists[grade], label: 'Что купить' }
    ];
},
  'sootnoshenie-ingredientov': (inputs) => {
    const ratioType = String(inputs.ratioType);
    const baseAmount = Number(inputs.baseAmount);
    if (!baseAmount) {
        return [
            { value: '—', label: 'Состав' },
            { value: '—', label: 'Рецептура' },
            { value: '—', label: 'Выход' },
            { value: '—', label: 'Советы по приготовлению' }
        ];
    }
    const recipes: Record<string, {
        name: string;
        ingredients: string[];
        ratios: number[];
        yield: string;
        tips: string;
    }> = {
        'pate_brisee': {
            name: 'Песочное тесто',
            ingredients: ['Мука', 'Масло сливочное', 'Вода/яйцо'],
            ratios: [3, 2, 1],
            yield: 'Тесто для пирога 24 см',
            tips: 'Масло должно быть холодным. Не месите долго — оставьте кусочки масла.'
        },
        'pate_a_choux': {
            name: 'Заварное тесто',
            ingredients: ['Молоко/вода', 'Масло', 'Мука', 'Яйца'],
            ratios: [1, 1, 1, 2],
            yield: '30-40 профитролей',
            tips: 'Заварите муку до образования комка. Добавляйте яйца по одному до нужной консистенции.'
        },
        'genoise': {
            name: 'Бисквит',
            ingredients: ['Мука', 'Сахар', 'Яйца', 'Масло'],
            ratios: [1, 1, 1, 0.25],
            yield: 'Бисквит 20-22 см',
            tips: 'Взбейте яйца с сахаром до пышности. Осторожно вмешайте муку сверху вниз.'
        },
        'creme_patissiere': {
            name: 'Заварной крем',
            ingredients: ['Молоко', 'Сахар', 'Желтки', 'Мука/крахмал'],
            ratios: [10, 2, 1, 1],
            yield: '500 мл крема',
            tips: 'Варите до загустения, постоянно мешая. Процедите и накройте плёнкой.'
        },
        'shortbread': {
            name: 'Шортбред',
            ingredients: ['Мука', 'Масло', 'Сахар'],
            ratios: [3, 2, 1],
            yield: '20-24 печенья',
            tips: 'Простое масляное печенье. Не взбивайте — просто смешайте до однородности.'
        },
        'pancake': {
            name: 'Блины',
            ingredients: ['Молоко', 'Мука', 'Яйца', 'Масло'],
            ratios: [2, 2, 1, 0.5],
            yield: '8-10 блинов',
            tips: 'Тесто должно быть как жидкая сметана. Дайте постоять 15 минут перед жаркой.'
        },
        'pasta': {
            name: 'Паста',
            ingredients: ['Мука', 'Яйца'],
            ratios: [3, 2],
            yield: '400 г свежей пасты',
            tips: 'Замешивайте до гладкости. Отдых 30 минут перед раскаткой.'
        },
        'pie_crust': {
            name: 'Пироговое тесто',
            ingredients: ['Мука', 'Жир (масло/сало)', 'Вода'],
            ratios: [3, 1, 1],
            yield: 'Дно пирога 24 см',
            tips: 'Используйте ледяную воду. Работайте быстро, чтобы масло не растаяло.'
        },
        'savory_tart': {
            name: 'Солёный тарт',
            ingredients: ['Мука', 'Масло', 'Жидкость (яйца/вода)'],
            ratios: [3, 1, 1],
            yield: 'Тарт 24-26 см',
            tips: 'Добавьте соль и перец. Можно добавить травы в тесто.'
        }
    };
    const recipe = recipes[ratioType];
    const multiplier = baseAmount / recipe.ratios[0];
    const formattedIngredients = recipe.ingredients.map((ing, i) => {
        const amount = Math.round(recipe.ratios[i] * multiplier);
        return `${ing}: ${amount} г/мл`;
    }).join('; ');
    const recipeFormula = recipe.ingredients.map((ing, i) => `${ing} (${recipe.ratios[i]})`).join(' : ');
    return [
        { value: formattedIngredients, label: 'Состав' },
        { value: recipeFormula, label: 'Рецептура' },
        { value: recipe.yield, label: 'Выход' },
        { value: recipe.tips, label: 'Советы по приготовлению' }
    ];
},
  'sroki-posadki': (inputs) => {
    const crop = String(inputs.crop);
    const frostDate = String(inputs.frostDate);
    const frostDates: Record<string, Date> = {
        'early-april': new Date(2026, 3, 5), // April 5
        'mid-april': new Date(2026, 3, 15), // April 15
        'late-april': new Date(2026, 3, 25), // April 25
        'early-may': new Date(2026, 4, 5), // May 5
        'mid-may': new Date(2026, 4, 15), // May 15
        'late-may': new Date(2026, 4, 25) // May 25
    };
    const lastFrost = frostDates[frostDate];
    // Planting data: [weeks before last frost to start seedlings, weeks after last frost to transplant, days to harvest]
    const cropData: Record<string, {
        seedling: number;
        transplant: number;
        direct: number;
        harvest: number;
    }> = {
        'tomato': { seedling: 8, transplant: 1, direct: -1, harvest: 75 },
        'pepper': { seedling: 10, transplant: 2, direct: -1, harvest: 85 },
        'cucumber': { seedling: 4, transplant: 1, direct: 1, harvest: 55 },
        'cabbage': { seedling: 6, transplant: 2, direct: 4, harvest: 80 },
        'carrot': { seedling: -1, transplant: -1, direct: 3, harvest: 70 },
        'beet': { seedling: -1, transplant: -1, direct: 2, harvest: 65 },
        'potato': { seedling: -1, transplant: -1, direct: 0, harvest: 90 },
        'onion': { seedling: -1, transplant: -1, direct: 4, harvest: 75 }
    };
    const data = cropData[crop];
    let seedlingStart = '';
    if (data.seedling > 0) {
        const seedlingDate = new Date(lastFrost);
        seedlingDate.setDate(seedlingDate.getDate() - (data.seedling * 7));
        seedlingStart = `${seedlingDate.getDate()} ${getMonthName(seedlingDate.getMonth())}`;
    }
    else {
        seedlingStart = 'Не требуется (прямой посев)';
    }
    let transplantDate = '';
    if (data.transplant >= 0) {
        const transplant = new Date(lastFrost);
        transplant.setDate(transplant.getDate() + (data.transplant * 7));
        transplantDate = `${transplant.getDate()} ${getMonthName(transplant.getMonth())}`;
    }
    else {
        transplantDate = 'Не требуется';
    }
    let directSow = '';
    if (data.direct >= 0) {
        const direct = new Date(lastFrost);
        direct.setDate(direct.getDate() + (data.direct * 7));
        directSow = `${direct.getDate()} ${getMonthName(direct.getMonth())}`;
    }
    else {
        directSow = 'Через рассаду';
    }
    const harvestDate = new Date(lastFrost);
    harvestDate.setDate(harvestDate.getDate() + data.harvest);
    const harvest = `${harvestDate.getDate()} ${getMonthName(harvestDate.getMonth())}`;
    function getMonthName(month: number): string {
        const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return months[month];
    }
    return [
        { value: seedlingStart, label: 'Начать рассаду' },
        { value: transplantDate, label: 'Высадка в грунт' },
        { value: directSow, label: 'Посев в грунт' },
        { value: harvest, label: 'Ожидаемый урожай' },
        { value: data.harvest, label: 'Дней до урожая', unit: 'дн' }
    ];
},
}
