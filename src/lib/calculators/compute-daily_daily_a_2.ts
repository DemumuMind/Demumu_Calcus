import type { ComputeFn } from './compute-helpers';

export const computeMap_daily_daily_a_2: Record<string, ComputeFn> = {
  'godovshchina-svadby': (inputs) => {
    const weddingDate = new Date(String(inputs.weddingDate));
    const today = new Date();
    if (isNaN(weddingDate.getTime())) {
        return [{ value: 'Неверный формат даты', label: 'Ошибка' }];
    }
    let years = today.getFullYear() - weddingDate.getFullYear();
    const monthDiff = today.getMonth() - weddingDate.getMonth();
    const dayDiff = today.getDate() - weddingDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        years--;
    }
    const anniversaryNames: Record<number, string> = {
        1: 'Ситцевая (1 год)',
        2: 'Бумажная (2 года)',
        3: 'Кожаная (3 года)',
        4: 'Льняная (4 года)',
        5: 'Деревянная (5 лет)',
        6: 'Чугунная (6 лет)',
        7: 'Медная (7 лет)',
        8: 'Жестяная (8 лет)',
        9: 'Фарфоровая (9 лет)',
        10: 'Оловянная / Розовая (10 лет)',
        11: 'Стальная (11 лет)',
        12: 'Никелевая (12 лет)',
        13: 'Кружевная (13 лет)',
        14: 'Слоновая кость (14 лет)',
        15: 'Хрустальная (15 лет)',
        16: 'Топазовая (16 лет)',
        17: 'Чертополох (17 лет)',
        18: 'Бирюзовая (18 лет)',
        19: 'Гранатовая (19 лет)',
        20: 'Фарфоровая (20 лет)',
        25: 'Серебряная (25 лет)',
        30: 'Жемчужная (30 лет)',
        35: 'Коралловая / Льняная (35 лет)',
        40: 'Рубиновая (40 лет)',
        45: 'Сапфировая (45 лет)',
        50: 'Золотая (50 лет)',
        55: 'Изумрудная (55 лет)',
        60: 'Бриллиантовая (60 лет)',
        65: 'Железная (65 лет)',
        70: 'Благородная (70 лет)',
        75: 'Коронная (75 лет)'
    };
    let anniversaryName = '';
    if (years <= 0) {
        anniversaryName = 'Ещё не прошёл первый год';
    }
    else {
        anniversaryName = anniversaryNames[years] || `Годовщина ${years}-летия`;
    }
    const nextAnniversary = new Date(weddingDate);
    nextAnniversary.setFullYear(today.getFullYear());
    if (nextAnniversary < today) {
        nextAnniversary.setFullYear(today.getFullYear() + 1);
    }
    const daysUntil = Math.ceil((nextAnniversary.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return [
        { value: years, label: 'Лет в браке', unit: 'лет' },
        { value: anniversaryName, label: 'Годовщина' },
        { value: nextAnniversary.toLocaleDateString('ru-RU'), label: 'Следующая годовщина' },
        { value: daysUntil, label: 'Дней до следующей', unit: 'дн' }
    ];
},
  'himchistka-rashody': (inputs) => {
    const itemsStr = String(inputs.items);
    const frequency = String(inputs.frequency);
    const qualityLevel = String(inputs.qualityLevel);
    let items: {
        type: string;
        count: number;
    }[] = [];
    try {
        items = JSON.parse(itemsStr);
    }
    catch {
        return [
            { value: 0, label: 'Ошибка', unit: '₽' },
            { value: 0, label: 'Ошибка', unit: '₽' },
            { value: 0, label: 'Ошибка', unit: '₽' },
            { value: 'Некорректный JSON', label: 'Ошибка' },
            { value: '', label: 'Ошибка' }
        ];
    }
    const basePrices: Record<string, number> = {
        'suit': 600,
        'jacket': 450,
        'coat': 800,
        'dress': 500,
        'shirt': 250,
        'blouse': 350,
        'pants': 350,
        'skirt': 350,
        'sweater': 400,
        'down_jacket': 700,
        'fur_coat': 2000,
        'wedding_dress': 3000,
        'curtains': 400,
        'bedding': 350
    };
    const qualityMultipliers: Record<string, number> = {
        'budget': 0.7,
        'standard': 1.0,
        'premium': 1.5
    };
    const multiplier = qualityMultipliers[qualityLevel];
    let singleVisitCost = 0;
    const breakdown: string[] = [];
    items.forEach(item => {
        const price = (basePrices[item.type] || 300) * multiplier;
        const itemTotal = Math.round(price * item.count);
        singleVisitCost += itemTotal;
        const itemName: Record<string, string> = {
            'suit': 'Костюм',
            'jacket': 'Пиджак',
            'coat': 'Пальто',
            'dress': 'Платье',
            'shirt': 'Рубашка',
            'blouse': 'Блузка',
            'pants': 'Брюки',
            'skirt': 'Юбка',
            'sweater': 'Свитер',
            'down_jacket': 'Пуховик',
            'fur_coat': 'Шуба',
            'wedding_dress': 'Свадебное платье',
            'curtains': 'Шторы',
            'bedding': 'Постельное бельё'
        };
        breakdown.push(`${itemName[item.type] || item.type}: ${item.count} шт × ${Math.round(price)}₽ = ${itemTotal}₽`);
    });
    const visitsPerMonth: Record<string, number> = {
        'weekly': 4,
        'biweekly': 2,
        'monthly': 1,
        'seasonal': 0.33
    };
    const monthlyVisits = visitsPerMonth[frequency];
    const monthlyCost = Math.round(singleVisitCost * monthlyVisits);
    const yearlyCost = monthlyCost * 12;
    const alternatives = 'Для экономии: пятновыводители для мелких загрязнений, стирайте некоторые вещи в деликатном режиме (рубашки, блузы), используйте пароочиститель для освежения.';
    return [
        { value: Math.round(singleVisitCost), label: 'За один приём', unit: '₽' },
        { value: monthlyCost, label: 'В месяц', unit: '₽' },
        { value: yearlyCost, label: 'В год', unit: '₽' },
        { value: breakdown.join('; '), label: 'Детализация' },
        { value: alternatives, label: 'Как сэкономить' }
    ];
},
  'investiczii-v-sebya': (inputs) => {
    const cost = Number(inputs.courseCost);
    const current = Number(inputs.currentSalary);
    const increase = Number(inputs.expectedIncrease) / 100;
    const newSalary = current * (1 + increase);
    const monthlyIncrease = newSalary - current;
    const paybackMonths = monthlyIncrease > 0 ? cost / monthlyIncrease : 999;
    const totalGain5Years = monthlyIncrease * 60;
    const roi5years = (totalGain5Years / cost - 1) * 100;
    return [
        { value: Math.round(newSalary), label: 'Новая зарплата', unit: '₽/мес' },
        { value: Math.round(monthlyIncrease), label: 'Прибавка в месяц', unit: '₽' },
        { value: Math.round(paybackMonths), label: 'Окупаемость', unit: 'мес' },
        { value: Math.round(roi5years), label: 'ROI за 5 лет', unit: '%' },
        { value: Math.round(totalGain5Years - cost), label: 'Чистая выгода за 5 лет', unit: '₽' }
    ];
},
  'kalkulyator-chaevyh': (inputs) => {
    const amount = Number(inputs.billAmount);
    const tipPercent = Number(inputs.tipPercent);
    const people = Number(inputs.peopleCount);
    if (!amount || !people) {
        return [{ value: '—', label: 'Результат' }];
    }
    const tipAmount = amount * (tipPercent / 100);
    const totalAmount = amount + tipAmount;
    const perPerson = totalAmount / people;
    return [
        { value: tipAmount.toFixed(2), label: 'Сумма чаевых', unit: '₽' },
        { value: totalAmount.toFixed(2), label: 'Итого с чаевыми', unit: '₽' },
        { value: perPerson.toFixed(2), label: 'С каждого', unit: '₽' }
    ];
},
  'kalkulyator-chaevyh-dopolnitelnyj': (inputs) => {
    const amount = Number(inputs.billAmount);
    const tipPercent = Number(inputs.tipPercent);
    const people = Number(inputs.peopleCount);
    if (!amount || !people) {
        return [{ value: '—', label: 'Результат' }];
    }
    const tipAmount = amount * (tipPercent / 100);
    const totalAmount = amount + tipAmount;
    const perPerson = totalAmount / people;
    return [
        { value: tipAmount.toFixed(2), label: 'Сумма чаевых', unit: '₽' },
        { value: totalAmount.toFixed(2), label: 'Итого с чаевыми', unit: '₽' },
        { value: perPerson.toFixed(2), label: 'С каждого', unit: '₽' }
    ];
},
  'kalkulyator-formy-dlya-vypechki': (inputs) => {
    const areaMap: Record<string, number> = {
        round18: Math.PI * 9 * 9, // 254.5
        round20: Math.PI * 10 * 10, // 314.2
        round22: Math.PI * 11 * 11, // 380.1
        round24: Math.PI * 12 * 12, // 452.4
        round26: Math.PI * 13 * 13, // 530.9
        round28: Math.PI * 14 * 14, // 615.8
        square18: 18 * 18, // 324
        square20: 20 * 20, // 400
        square22: 22 * 22, // 484
        rect20x30: 20 * 30, // 600
        rect25x35: 25 * 35, // 875
        rect30x40: 30 * 40, // 1200
        bundt22: Math.PI * 11 * 11 * 0.7, // 266 (rough estimate for ring shape)
        bundt24: Math.PI * 12 * 12 * 0.7, // 317
    };
    const originalShape = String(inputs.originalShape);
    const targetShape = String(inputs.targetShape);
    const ingredientAmount = Number(inputs.ingredientAmount) || 0;
    const areaOriginal = areaMap[originalShape] || 1;
    const areaTarget = areaMap[targetShape] || 1;
    const coefficient = areaTarget / areaOriginal;
    const newAmount = Math.round(ingredientAmount * coefficient);
    return [
        { value: Math.round(coefficient * 100) / 100, label: 'Коэффициент пересчёта' },
        { value: newAmount, label: 'Новое количество' },
        { value: Math.round(areaOriginal), label: 'Площадь исходной формы', unit: 'см²' },
        { value: Math.round(areaTarget), label: 'Площадь новой формы', unit: 'см²' },
    ];
},
  'kalkulyator-nalogov': (inputs) => {
    const amount = Number(inputs.amount);
    const customTaxRate = Number(inputs.taxRate);
    const taxIncluded = String(inputs.taxIncluded) === 'true';
    const mode = String(inputs.calculationMode);
    let taxRate = customTaxRate;
    switch (mode) {
        case 'vat20':
            taxRate = 20;
            break;
        case 'vat10':
            taxRate = 10;
            break;
        case 'us_sales':
            taxRate = 8;
            break;
    }
    let subtotal: number;
    let taxAmount: number;
    let total: number;
    if (taxIncluded) {
        subtotal = amount / (1 + taxRate / 100);
        taxAmount = amount - subtotal;
        total = amount;
    }
    else {
        subtotal = amount;
        taxAmount = amount * (taxRate / 100);
        total = amount + taxAmount;
    }
    const formatNum = (n: number) => Math.round(n * 100) / 100;
    let breakdown = '';
    if (mode === 'vat20') {
        breakdown = 'НДС 20% — стандартная ставка в РФ для большинства товаров и услуг';
    }
    else if (mode === 'vat10') {
        breakdown = 'НДС 10% — льготная ставка в РФ для продуктов, лекарств, детских товаров';
    }
    else if (mode === 'us_sales') {
        breakdown = 'Sales tax — от 0% до 13% в зависимости от штата США. Использована средняя ставка 8%';
    }
    else {
        breakdown = `Ставка ${taxRate}% — пользовательская`;
    }
    return [
        { value: formatNum(subtotal), label: taxIncluded ? 'Сумма без налога' : 'Подытог', unit: '₽' },
        { value: formatNum(taxAmount), label: `Налог (${taxRate}%)`, unit: '₽' },
        { value: formatNum(total), label: taxIncluded ? 'Всего (с налогом)' : 'Итого к оплате', unit: '₽' },
        { value: breakdown, label: 'Информация' }
    ];
},
  'kalkulyator-rabochih-dnej': (inputs) => {
    const startStr = String(inputs.startDate);
    const endStr = String(inputs.endDate);
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return [{ value: 'Неверный формат даты', label: 'Ошибка' }];
    }
    let workDays = 0;
    let weekends = 0;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekends++;
        }
        else {
            workDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return [
        { value: workDays.toString(), label: 'Рабочих дней', unit: 'дн' },
        { value: weekends.toString(), label: 'Выходных', unit: 'дн' },
        { value: totalDays.toString(), label: 'Всего дней', unit: 'дн' }
    ];
},
  'kalkulyator-shashlyka': (inputs) => {
    const people = Number(inputs.people);
    const meatType = String(inputs.meatType);
    const hunger = String(inputs.hunger);
    if (!people) {
        return [
            { value: '—', label: 'Мяса' },
            { value: '—', label: 'Овощей/грибов' },
            { value: '—', label: 'Маринада' },
            { value: '—', label: 'Шампуров' },
            { value: '—', label: 'Напитков' }
        ];
    }
    const hungerMultiplier: Record<string, number> = {
        light: 0.3,
        normal: 0.45,
        hungry: 0.6
    };
    const multiplier = hungerMultiplier[hunger] || 0.45;
    let meatKg = people * multiplier;
    // Mixed: slightly more total meat (10% more as variety encourages eating more)
    if (meatType === 'mixed') {
        meatKg = meatKg * 1.1;
    }
    const vegetablesKg = people * 0.15;
    const marinadeKg = meatKg * 0.2;
    const skewers = Math.ceil(meatKg * 2.5); // ~400г на шампур
    const drinksLiters = people * 0.5; // ~0.5 л на человека
    let meatLabel = 'Мяса';
    if (meatType === 'mixed') {
        const half = meatKg / 2;
        meatLabel = `Мяса (свинина ${half.toFixed(2)} кг + курица ${half.toFixed(2)} кг)`;
    }
    return [
        { value: meatKg.toFixed(2), label: meatLabel, unit: 'кг' },
        { value: vegetablesKg.toFixed(2), label: 'Овощей/грибов', unit: 'кг' },
        { value: marinadeKg.toFixed(2), label: 'Маринада', unit: 'кг' },
        { value: skewers.toString(), label: 'Шампуров', unit: 'шт' },
        { value: drinksLiters.toFixed(2), label: 'Напитков', unit: 'л' }
    ];
},
  'kalkulyator-skidok': (inputs) => {
    const originalPrice = Number(inputs.originalPrice);
    const discountType = String(inputs.discountType);
    const discountValue = Number(inputs.discountValue);
    const quantity = Number(inputs.quantity);
    const additionalDiscount = Number(inputs.additionalDiscount);
    const originalTotal = originalPrice * quantity;
    let finalPrice = originalTotal;
    switch (discountType) {
        case 'percent':
            finalPrice = originalTotal * (1 - discountValue / 100);
            break;
        case 'fixed':
            finalPrice = Math.max(0, originalTotal - (discountValue * quantity));
            break;
        case 'bogo':
            finalPrice = originalPrice * Math.ceil(quantity / 2);
            break;
        case 'bundle':
            const setsOf3 = Math.floor(quantity / 3);
            const remainder = quantity % 3;
            finalPrice = originalPrice * (setsOf3 * 2 + remainder);
            break;
        case 'half':
            const fullPrice = Math.ceil(quantity / 2);
            const halfPrice = Math.floor(quantity / 2);
            finalPrice = (originalPrice * fullPrice) + (originalPrice * 0.5 * halfPrice);
            break;
    }
    finalPrice = finalPrice * (1 - additionalDiscount / 100);
    finalPrice = Math.max(0, finalPrice);
    const totalSavings = originalTotal - finalPrice;
    const _effectiveDiscount = originalTotal > 0 ? (totalSavings / originalTotal) * 100 : 0;
    const perItem = quantity > 0 ? finalPrice / quantity : 0;
    return [
        { value: Math.round(originalTotal * 100) / 100, label: 'Без скидок', unit: '₽' },
        { value: Math.round(finalPrice * 100) / 100, label: 'Цена со скидкой', unit: '₽' },
        { value: Math.round(totalSavings * 100) / 100, label: 'Вы экономите', unit: '₽' },
        { value: Math.round(_effectiveDiscount * 100) / 100, label: 'Эффективная скидка', unit: '%' },
        { value: Math.round(perItem * 100) / 100, label: 'Цена за штуку', unit: '₽' }
    ];
},
}
