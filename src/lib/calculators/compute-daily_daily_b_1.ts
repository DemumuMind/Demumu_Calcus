import type { ComputeFn } from './compute-helpers';

export const computeMap_daily_daily_b_1: Record<string, ComputeFn> = {
  'produkty-na-kompaniyu': (inputs) => {
    const guests = Number(inputs.guests);
    const duration = Number(inputs.duration);
    const mealType = String(inputs.mealType);
    const dietaryRestrictions = String(inputs.dietaryRestrictions);
    const baseConsumption: Record<string, number> = {
        'buffet': 0.15,
        'sitdown': 0.12,
        'finger': 0.10,
        'bbq': 0.20
    };
    const base = baseConsumption[mealType] || 0.15;
    let totalFood = guests * duration * base;
    let meatRatio = 0.30;
    let saladRatio = 0.25;
    let sidesRatio = 0.25;
    let snacksRatio = 0.20;
    if (mealType === 'bbq') {
        meatRatio = 0.50;
        saladRatio = 0.20;
        sidesRatio = 0.20;
        snacksRatio = 0.10;
    }
    else if (mealType === 'finger') {
        meatRatio = 0.20;
        saladRatio = 0.15;
        sidesRatio = 0.10;
        snacksRatio = 0.55;
    }
    let recommendations = '';
    if (dietaryRestrictions === 'vegetarian') {
        meatRatio *= 0.6;
        saladRatio += 0.15;
        recommendations = 'Увеличьте овощные блюда, добавьте больше вегетарианских протеинов (тофу, грибы, бобовые)';
    }
    else if (dietaryRestrictions === 'vegan') {
        meatRatio = 0;
        saladRatio += 0.20;
        recommendations = 'Замените мясо на веганские альтернативы: falafel, овощные котлеты, грибные блюда';
    }
    else if (dietaryRestrictions === 'allergies') {
        recommendations = 'Уточните у гостей конкретные аллергены. Стандартные риски: орехи, глютен, молочные, морепродукты';
    }
    else {
        recommendations = 'Стандартный набор с учётом разнообразия вкусов';
    }
    const meat = Math.round(totalFood * meatRatio * 10) / 10;
    const salads = Math.round(totalFood * saladRatio * 10) / 10;
    const sides = Math.round(totalFood * sidesRatio * 10) / 10;
    const snacks = Math.round(totalFood * snacksRatio * 10) / 10;
    const drinks = Math.round(guests * duration * 0.4 * 10) / 10;
    return [
        { value: Math.round(totalFood * 10) / 10, label: 'Общий вес еды', unit: 'кг' },
        { value: meat, label: 'Мяса/рыбы/белка', unit: 'кг' },
        { value: salads, label: 'Салатов и овощей', unit: 'кг' },
        { value: sides, label: 'Гарниров и хлеба', unit: 'кг' },
        { value: snacks, label: 'Закусок и десертов', unit: 'кг' },
        { value: drinks, label: 'Напитков (вода, сок, алкоголь)', unit: 'л' },
        { value: recommendations, label: 'Рекомендации' }
    ];
},
  'rabochie-dni': (inputs) => {
    const start = new Date(String(inputs.startDate));
    const end = new Date(String(inputs.endDate));
    if (start > end) {
        const temp = start;
        start.setTime(end.getTime());
        end.setTime(temp.getTime());
    }
    let workdays = 0;
    let weekends = 0;
    let total = 0;
    const current = new Date(start);
    while (current <= end) {
        const day = current.getDay();
        if (day === 0 || day === 6) {
            weekends++;
        }
        else {
            workdays++;
        }
        total++;
        current.setDate(current.getDate() + 1);
    }
    const weeks = Math.floor(total / 7);
    return [
        { value: workdays, label: 'Рабочих дней (пн-пт)', unit: 'дн.' },
        { value: weekends, label: 'Выходных (сб-вс)', unit: 'дн.' },
        { value: total, label: 'Всего дней', unit: 'дн.' },
        { value: weeks, label: 'Полных недель', unit: 'нед.' }
    ];
},
  'rashody-na-otpusk': (inputs) => {
    const duration = Number(inputs.duration);
    const travelers = Number(inputs.travelers);
    const dest = String(inputs.destination);
    const acc = String(inputs.accommodation);
    let destMult = 1;
    if (dest === 'near')
        destMult = 1.2;
    else if (dest === 'europe')
        destMult = 2;
    else if (dest === 'asia')
        destMult = 0.8;
    let accPerNight = 3000;
    if (acc === 'budget')
        accPerNight = 1500;
    else if (acc === 'luxury')
        accPerNight = 8000;
    const accommodationCost = accPerNight * destMult * duration;
    const foodPerDay = 1500 * destMult * travelers;
    const foodCost = foodPerDay * duration;
    const activitiesPerDay = 1000 * destMult * travelers;
    const activitiesCost = activitiesPerDay * duration;
    const totalCost = accommodationCost + foodCost + activitiesCost;
    return [
        { value: Math.round(accommodationCost), label: 'Жильё', unit: '₽' },
        { value: Math.round(foodCost), label: 'Еда', unit: '₽' },
        { value: Math.round(activitiesCost), label: 'Развлечения', unit: '₽' },
        { value: Math.round(totalCost), label: 'Всего', unit: '₽' },
        { value: Math.round(totalCost / travelers), label: 'На человека', unit: '₽' },
        { value: Math.round(totalCost / duration), label: 'В день (на всех)', unit: '₽' }
    ];
},
  'rashody-na-pitomca': (inputs) => {
    const pet = String(inputs.petType);
    const quality = String(inputs.foodQuality);
    const vet = Number(inputs.vetVisits);
    let foodBase = 0;
    if (pet === 'cat')
        foodBase = 1500;
    else if (pet === 'dog_small')
        foodBase = 1000;
    else if (pet === 'dog_medium')
        foodBase = 2500;
    else if (pet === 'dog_large')
        foodBase = 4000;
    else if (pet === 'hamster')
        foodBase = 300;
    else if (pet === 'parrot')
        foodBase = 500;
    let qualityMult = 1;
    if (quality === 'economy')
        qualityMult = 0.6;
    else if (quality === 'premium')
        qualityMult = 2;
    const monthlyFood = foodBase * qualityMult;
    const litter = pet === 'cat' ? 500 : 0;
    const toys = pet.includes('dog') || pet === 'cat' ? 300 : 100;
    const vetMonthly = vet * 2000 / 12;
    const grooming = pet.includes('dog') ? 500 : 0;
    const monthlyTotal = monthlyFood + litter + toys + vetMonthly + grooming;
    const annualTotal = monthlyTotal * 12;
    return [
        { value: Math.round(monthlyFood), label: 'Корм в месяц', unit: '₽' },
        { value: Math.round(monthlyTotal), label: 'Всего в месяц', unit: '₽' },
        { value: Math.round(annualTotal), label: 'Всего в год', unit: '₽' },
        { value: `Корм: ${Math.round(monthlyFood)}₽, Наполнитель/аксессуары: ${Math.round(litter + toys)}₽, Ветеринар: ${Math.round(vetMonthly)}₽`, label: 'Структура расходов' }
    ];
},
  'rashody-na-stirku': (inputs) => {
    const loadsPerWeek = Number(inputs.loadsPerWeek);
    const loadSize = String(inputs.loadSize);
    const detergentCostPerKg = Number(inputs.detergentCost);
    const machineType = String(inputs.machineType);
    const waterCostPerM3 = Number(inputs.waterCost);
    const electricityCostPerKwh = Number(inputs.electricityCost);
    // Water consumption per load (liters) based on load size and machine type
    const waterConsumption: Record<string, Record<string, number>> = {
        'small': { modern: 30, standard: 40, old: 50 },
        'medium': { modern: 40, standard: 55, old: 70 },
        'large': { modern: 50, standard: 70, old: 90 },
        'xlarge': { modern: 60, standard: 85, old: 110 }
    };
    const waterLiters = waterConsumption[loadSize][machineType];
    const waterM3 = waterLiters / 1000;
    const electricityConsumption: Record<string, Record<string, number>> = {
        'small': { modern: 0.4, standard: 0.6, old: 0.9 },
        'medium': { modern: 0.6, standard: 0.9, old: 1.3 },
        'large': { modern: 0.8, standard: 1.2, old: 1.7 },
        'xlarge': { modern: 1.0, standard: 1.5, old: 2.1 }
    };
    const kwhPerLoad = electricityConsumption[loadSize][machineType];
    const detergentGrams: Record<string, number> = {
        'small': 50,
        'medium': 70,
        'large': 90,
        'xlarge': 120
    };
    const detergentPerLoad = detergentGrams[loadSize];
    const detergentCostPerLoad = (detergentPerLoad / 1000) * detergentCostPerKg;
    const waterCostPerLoad = waterM3 * waterCostPerM3;
    const electricityCostPerLoad = kwhPerLoad * electricityCostPerKwh;
    const costPerLoad = detergentCostPerLoad + waterCostPerLoad + electricityCostPerLoad;
    const monthlyLoads = loadsPerWeek * 4.33; // average weeks per month
    const detergentMonthly = detergentCostPerLoad * monthlyLoads;
    const waterMonthly = waterCostPerLoad * monthlyLoads;
    const electricityMonthly = electricityCostPerLoad * monthlyLoads;
    const totalMonthly = detergentMonthly + waterMonthly + electricityMonthly;
    const totalYearly = totalMonthly * 12;
    return [
        { value: Math.round(detergentMonthly), label: 'Порошок/гель', unit: '₽/мес' },
        { value: Math.round(waterMonthly), label: 'Вода', unit: '₽/мес' },
        { value: Math.round(electricityMonthly), label: 'Электричество', unit: '₽/мес' },
        { value: Math.round(totalMonthly), label: 'Всего в месяц', unit: '₽' },
        { value: Math.round(totalYearly), label: 'Всего в год', unit: '₽' },
        { value: Math.round(costPerLoad * 100) / 100, label: 'За одну стирку', unit: '₽' },
        { value: '1) Собирайте полную загрузку. 2) Используйте режим 30°C вместо 60°C. 3) Современная машина экономит 30-40% ресурсов.', label: 'Советы' }
    ];
},
  'raskhod-semyan': (inputs) => {
    const area = Number(inputs.area);
    const spacing = Number(inputs.spacing);
    const germinationRate = Number(inputs.germinationRate);
    if (!area || !spacing || !germinationRate) {
        return [
            { value: '—', label: 'Растений нужно', unit: 'шт' },
            { value: '—', label: 'Семян с запасом', unit: 'шт' },
            { value: '—', label: 'Количество рядов', unit: 'шт' },
            { value: '—', label: 'Растений в ряду', unit: 'шт' },
            { value: '—', label: 'Пакетиков семян', unit: 'шт' }
        ];
    }
    // Assume square area, calculate rows and plants per row
    const side = Math.sqrt(area);
    const spacingM = spacing / 100;
    const rows = Math.floor(side / spacingM);
    const perRow = Math.floor(side / spacingM);
    const plantsNeeded = rows * perRow;
    const reserve = 1.2;
    const seedsNeeded = Math.ceil((plantsNeeded * reserve) / (germinationRate / 100));
    // Assume standard packet has 30-50 seeds depending on type
    const seedsPerPacket = 40;
    const packets = Math.ceil(seedsNeeded / seedsPerPacket);
    return [
        { value: plantsNeeded, label: 'Растений нужно', unit: 'шт' },
        { value: seedsNeeded, label: 'Семян с запасом', unit: 'шт' },
        { value: rows, label: 'Количество рядов', unit: 'шт' },
        { value: perRow, label: 'Растений в ряду', unit: 'шт' },
        { value: packets, label: 'Пакетиков семян', unit: 'шт' }
    ];
},
  'razdelenie-cheka': (inputs) => {
    const total = Number(inputs.total);
    const people = Number(inputs.people);
    const tipPercent = Number(inputs.tipPercent);
    const roundUp = String(inputs.roundUp);
    const tipAmount = total * (tipPercent / 100);
    const totalWithTip = total + tipAmount;
    let perPerson = totalWithTip / people;
    if (roundUp !== 'none') {
        const roundValue = Number(roundUp);
        perPerson = Math.ceil(perPerson / roundValue) * roundValue;
    }
    return [
        {
            value: Math.round(perPerson * 100) / 100,
            label: 'С каждого человека',
            unit: '₽'
        },
        {
            value: Math.round(tipAmount * 100) / 100,
            label: 'Сумма чаевых',
            unit: '₽'
        },
        {
            value: Math.round(totalWithTip * 100) / 100,
            label: 'Общая сумма с чаевыми',
            unit: '₽'
        }
    ];
},
  'razdelenie-po-poziciyam': (inputs) => {
    const people = Number(inputs.people);
    const itemsStr = String(inputs.items);
    const taxRate = Number(inputs.taxRate);
    const tipPercent = Number(inputs.tipPercent);
    let items: {
        name: string;
        price: number;
        who: number[];
    }[] = [];
    try {
        items = JSON.parse(itemsStr);
    }
    catch {
        return [
            { value: 0, label: 'Ошибка', unit: '₽' },
            { value: 0, label: 'Ошибка', unit: '₽' },
            { value: 0, label: 'Ошибка', unit: '₽' },
            { value: 0, label: 'Ошибка', unit: '₽' },
            { value: 'Некорректный JSON в поле "Позиции"', label: 'Ошибка' }
        ];
    }
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * (taxRate / 100);
    const tip = subtotal * (tipPercent / 100);
    const total = subtotal + tax + tip;
    const amounts: number[] = Array.from({ length: people }, () => 0);
    items.forEach(item => {
        const perPerson = item.price / item.who.length;
        item.who.forEach(personIndex => {
            if (personIndex >= 0 && personIndex < people) {
                amounts[personIndex] += perPerson;
            }
        });
    });
    amounts.forEach((amount, i) => {
        const ratio = amount / subtotal;
        amounts[i] = amount + (tax * ratio) + (tip * ratio);
    });
    const perPersonResult = amounts.map((amount, i) => `Чел ${i + 1}: ${Math.round(amount * 100) / 100} ₽`).join(', ');
    return [
        { value: Math.round(subtotal * 100) / 100, label: 'Подытог (блюда)', unit: '₽' },
        { value: Math.round(tax * 100) / 100, label: 'Налог', unit: '₽' },
        { value: Math.round(tip * 100) / 100, label: 'Чаевые', unit: '₽' },
        { value: Math.round(total * 100) / 100, label: 'Итого', unit: '₽' },
        { value: perPersonResult, label: 'С каждого' }
    ];
},
  'razmer-kolca': (inputs) => {
    let circumference = Number(inputs.circumference);
    const inputType = String(inputs.inputType);
    if (!circumference) {
        return [{ value: '—', label: 'Результат' }];
    }
    if (inputType === 'diameter') {
        circumference = circumference * Math.PI;
    }
    const diameter = circumference / Math.PI;
    const ruSize = Math.round(diameter * 2) / 2;
    const euSize = Math.round(circumference);
    const usSize = (diameter - 11.54) / 0.8326;
    return [
        { value: ruSize.toFixed(1), label: 'Российский' },
        { value: euSize.toString(), label: 'Европейский' },
        { value: Math.round(usSize * 2) / 2, label: 'US' },
        { value: Math.round(circumference), label: 'Обхват', unit: 'мм' }
    ];
},
  'razmer-obuvi': (inputs) => {
    const footLength = Number(inputs.footLength);
    const gender = String(inputs.gender);
    if (!footLength) {
        return [{ value: '—', label: 'Результат' }];
    }
    const ruSize = footLength * 1.5 + 1.5;
    const euSize = footLength * 1.5 + 2;
    let usSize = 0;
    let ukSize = 0;
    if (gender === 'male') {
        usSize = footLength - 17.5;
        ukSize = usSize - 0.5;
    }
    else if (gender === 'female') {
        usSize = footLength - 16;
        ukSize = usSize - 2;
    }
    else {
        usSize = footLength - 13;
        ukSize = usSize - 0.5;
    }
    let width = '';
    if (gender === 'male') {
        width = 'Средняя (D)';
    }
    else if (gender === 'female') {
        width = 'Средняя (B)';
    }
    else {
        width = 'Стандартная';
    }
    return [
        { value: Math.round(ruSize).toString(), label: 'Российский' },
        { value: Math.round(euSize).toString(), label: 'Европейский' },
        { value: usSize.toFixed(1), label: 'US' },
        { value: ukSize.toFixed(1), label: 'UK' },
        { value: width, label: 'Полнота' }
    ];
},
}
