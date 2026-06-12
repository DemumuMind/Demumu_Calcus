import type { ComputeFn } from './compute-helpers';

export const computeMap_daily_daily_a_1: Record<string, ComputeFn> = {
  'broskok-kostej': (inputs) => {
    const diceType = Number(inputs.diceType);
    const count = Math.min(Number(inputs.count), 10);
    const results: number[] = [];
    for (let i = 0; i < count; i++) {
        results.push(Math.floor(Math.random() * diceType) + 1);
    }
    const total = results.reduce((a, b) => a + b, 0);
    return [
        { value: results.join(' + '), label: 'Выпало', unit: '' },
        { value: total.toString(), label: 'Сумма', unit: '' }
    ];
},
  'brozhenie-testa': (inputs) => {
    const yeastType = String(inputs.yeastType);
    const yeastAmount = Number(inputs.yeastAmount);
    const temperature = Number(inputs.temperature);
    const doughType = String(inputs.doughType);
    if (!yeastAmount || !temperature) {
        return [
            { value: '—', label: 'Первая расстойка', unit: 'мин' },
            { value: '—', label: 'Вторая расстойка', unit: 'мин' },
            { value: '—', label: 'Общее время' },
            { value: '—', label: 'Время удвоения', unit: 'мин' },
            { value: '—', label: 'Советы' }
        ];
    }
    let baseDoublingTime = 60; // minutes
    const yeastMultipliers: Record<string, number> = {
        'fresh': 2.0, // Need 2x more fresh yeast
        'dry': 1.0, // Standard
        'instant': 0.9 // Slightly more active
    };
    const standardAmount = 10; // 10g dry per 500g flour
    const yeastRatio = standardAmount / (yeastAmount * yeastMultipliers[yeastType]);
    // Temperature factor (roughly doubles every 10°C in optimal range)
    const tempFactor = Math.pow(2, (25 - temperature) / 10);
    const doughMultipliers: Record<string, number> = {
        'bread': 1.0,
        'pizza': 0.8, // Thinner, rises faster
        'rich': 1.5 // Fat slows fermentation
    };
    const doublingTime = baseDoublingTime * yeastRatio * tempFactor * doughMultipliers[doughType];
    const firstRise = Math.round(doublingTime * 1.5); // Until doubled + 50%
    const secondRise = Math.round(doublingTime * 0.8); // After shaping
    const totalMinutes = firstRise + 15 + secondRise; // +15 min for shaping
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const totalTime = hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
    let tips = '';
    if (temperature < 15) {
        tips = 'Холодное брожение развивает вкус, но требует больше времени. Можно оставить на ночь в холодильнике.';
    }
    else if (temperature > 30) {
        tips = 'Высокая температура ускоряет брожение, но может дать неприятный привкус. Следите, не перебродите.';
    }
    else {
        tips = 'Оптимальная температура для брожения. Тесто должно удвоиться в объёме.';
    }
    return [
        { value: firstRise, label: 'Первая расстойка', unit: 'мин' },
        { value: secondRise, label: 'Вторая расстойка', unit: 'мин' },
        { value: totalTime, label: 'Общее время' },
        { value: Math.round(doublingTime), label: 'Время удвоения', unit: 'мин' },
        { value: tips, label: 'Советы' }
    ];
},
  'byudzhet-na-podarki': (inputs) => {
    const occasion = String(inputs.occasion);
    const relationship = String(inputs.relationship);
    const monthlyIncome = Number(inputs.monthlyIncome);
    const recipientAge = String(inputs.recipientAge);
    const occasionBases: Record<string, {
        min: number;
        rec: number;
        max: number;
    }> = {
        'birthday': { min: 500, rec: 2000, max: 10000 },
        'wedding': { min: 3000, rec: 10000, max: 50000 },
        'newyear': { min: 500, rec: 1500, max: 5000 },
        'anniversary': { min: 2000, rec: 5000, max: 20000 },
        'housewarming': { min: 1000, rec: 3000, max: 15000 },
        'babyshower': { min: 1000, rec: 3000, max: 10000 },
        'graduation': { min: 1000, rec: 3000, max: 8000 },
        'valentine': { min: 1000, rec: 3000, max: 10000 }
    };
    const base = occasionBases[occasion];
    const relationshipMultipliers: Record<string, number> = {
        'close_family': 2.5,
        'family': 1.5,
        'best_friend': 1.8,
        'friend': 1.0,
        'colleague': 0.7,
        'acquaintance': 0.5
    };
    const multiplier = relationshipMultipliers[relationship] || 1.0;
    let minBudget = Math.round(base.min * multiplier);
    let recBudget = Math.round(base.rec * multiplier);
    let maxBudget = Math.round(base.max * multiplier);
    // Cap at 15% of monthly income for non-wedding occasions
    const maxPercentOfIncome = occasion === 'wedding' ? 0.25 : 0.15;
    const incomeCap = monthlyIncome * maxPercentOfIncome;
    if (maxBudget > incomeCap) {
        maxBudget = Math.round(incomeCap);
        recBudget = Math.round(maxBudget * 0.5);
        minBudget = Math.round(maxBudget * 0.2);
    }
    const percentOfIncome = ((recBudget / monthlyIncome) * 100).toFixed(1);
    const giftIdeas: Record<string, Record<string, string>> = {
        'birthday': {
            'child': 'Игрушки, книги, наборы для творчества, конструкторы',
            'teen': 'Гаджеты, наушники, косметика, подарочные карты, книги',
            'adult': 'Подарочные сертификаты, алкоголь, книги, техника, впечатления',
            'senior': 'Тёплые вещи, чаи/кофе, фотоальбомы, удобные мелочи для дома'
        },
        'wedding': {
            'adult': 'Деньги в конверте (традиция), бытовая техника, подарки из реестра'
        },
        'newyear': {
            'child': 'Сладости, игрушки, новогодние наборы',
            'teen': 'Косметика, аксессуары, подарочные карты',
            'adult': 'Сладости, алкоголь, новогодние украшения, подарочные наборы',
            'senior': 'Продуктовые наборы, чаи, тёплые носки, мёд'
        },
        'housewarming': {
            'adult': 'Бытовая техника, текстиль, посуда, растения, алкоголь'
        },
        'babyshower': {
            'adult': 'Одежда, игрушки, подгузники, средства гигиены, деньги'
        }
    };
    const ideas = giftIdeas[occasion]?.[recipientAge] || 'Универсальный подарочный сертификат, цветы, книги, сладости';
    const etiquetteTips: Record<string, string> = {
        'wedding': 'На свадьбу принято дарить деньги в конверте — сумма должна покрыть стоимость вашего ужина (минимум) и поздравить пару.',
        'birthday': 'Не дарите слишком личные вещи (одежду, парфюм) без уверенности в предпочтениях. Подарочный сертификат — универсальный выход.',
        'newyear': 'Если обмениваетесь подарками с коллегами — заранее договоритесь о сумме.',
        'housewarming': 'Не дарите острые предметы (ножи) — по приметам это символ разрыва. Если дарите — попросите символическую монету взамен.',
        'babyshower': 'Уточните у родителей, что уже есть. Практичные подарки (подгузники, одежда на вырост) всегда ценятся.'
    };
    return [
        { value: minBudget, label: 'Минимум', unit: '₽' },
        { value: recBudget, label: 'Рекомендуемо', unit: '₽' },
        { value: maxBudget, label: 'Максимум', unit: '₽' },
        { value: percentOfIncome, label: 'От вашего дохода', unit: '%' },
        { value: ideas, label: 'Что подарить' },
        { value: etiquetteTips[occasion] || 'Главное — внимание, а не цена. Красиво упакуйте, добавьте открытку с тёплыми словами.', label: 'Этикет' }
    ];
},
  'byudzhet-otpiska': (inputs) => {
    const destination = String(inputs.destination);
    const duration = Number(inputs.duration);
    const travelers = Number(inputs.travelers);
    const comfortLevel = String(inputs.comfortLevel);
    const transportType = String(inputs.transportType);
    const comfortMultipliers: Record<string, number> = {
        'budget': 0.5,
        'standard': 1.0,
        'comfort': 1.8,
        'luxury': 3.5
    };
    const multiplier = comfortMultipliers[comfortLevel];
    const destinationCosts: Record<string, {
        transport: number;
        hotel: number;
        food: number;
        activities: number;
    }> = {
        'russia_moscow': { transport: 5000, hotel: 4000, food: 2000, activities: 1500 },
        'russia_spb': { transport: 5000, hotel: 3500, food: 1800, activities: 1500 },
        'russia_sochi': { transport: 8000, hotel: 5000, food: 2000, activities: 2000 },
        'turkey': { transport: 40000, hotel: 3000, food: 1500, activities: 1000 },
        'egypt': { transport: 35000, hotel: 2500, food: 1200, activities: 800 },
        'thailand': { transport: 45000, hotel: 2000, food: 1000, activities: 1200 },
        'uae': { transport: 40000, hotel: 6000, food: 3000, activities: 2500 },
        'europe_west': { transport: 50000, hotel: 8000, food: 4000, activities: 3000 },
        'europe_east': { transport: 40000, hotel: 4000, food: 2000, activities: 1500 },
        'usa': { transport: 60000, hotel: 10000, food: 5000, activities: 4000 },
        'asia': { transport: 50000, hotel: 5000, food: 2500, activities: 2000 },
        'custom': { transport: 30000, hotel: 4000, food: 2000, activities: 1500 }
    };
    const costs = destinationCosts[destination];
    let transportMultiplier = 1.0;
    if (transportType === 'train')
        transportMultiplier = 0.7;
    if (transportType === 'bus')
        transportMultiplier = 0.4;
    if (transportType === 'car')
        transportMultiplier = 0.6; // fuel costs
    const transportCost = Math.round(costs.transport * transportMultiplier * travelers * multiplier);
    const accommodationCost = Math.round(costs.hotel * duration * travelers * multiplier);
    const foodCost = Math.round(costs.food * duration * travelers * multiplier);
    const activitiesCost = Math.round(costs.activities * duration * travelers * multiplier);
    const miscCost = Math.round((transportCost + accommodationCost + foodCost + activitiesCost) * 0.15); // 15% for unexpected
    const totalCost = transportCost + accommodationCost + foodCost + activitiesCost + miscCost;
    const perPerson = Math.round(totalCost / travelers);
    const tips: Record<string, string> = {
        'russia_moscow': 'Москва — дорогой город. Отели в центре дороже, рассмотрите варианты на окраинах с метро.',
        'russia_spb': 'Петербург: многие музеи бесплатные по определённым дням. Белые ночи — сезон подорожания.',
        'russia_sochi': 'Сочи: цены сильно зависят от сезона (лето/зима). Бронируйте заранее для экономии.',
        'turkey': 'Турция: all inclusive выгоден при комфортном отдыхе. Шопинг на базарах — торгуйтесь!',
        'egypt': 'Египет: берите all inclusive, питание и напитки включены. Доллары приветствуются.',
        'thailand': 'Таиланд: дёшево и вкусно уличная еда. Хостелы от 300₽/ночь, отели от 1000₽/ночь.',
        'uae': 'ОАЭ: дорогая страна, но качество высокое. Шоппинг — основная статья расходов.',
        'europe_west': 'Западная Европа: еда в супермаркетах дешевле ресторанов в 2-3 раза.',
        'europe_east': 'Восточная Европа: цены ниже, качество отличное. Прага, Будапешт — бюджетные жемчужины.',
        'usa': 'США: не забудьте про чаевые (15-20%) и налоги. Общественный транспорт развит плохо, авто необходимо.',
        'asia': 'Азия: разные страны — разные цены. Япония дорогая, Китай и Вьетнам — дешёвые.',
        'custom': 'Для любого направления: закладывайте запас 15-20% на непредвиденные расходы.'
    };
    return [
        { value: transportCost, label: 'Транспорт (туда-обратно)', unit: '₽' },
        { value: accommodationCost, label: 'Проживание', unit: '₽' },
        { value: foodCost, label: 'Питание', unit: '₽' },
        { value: activitiesCost, label: 'Экскурсии и активности', unit: '₽' },
        { value: miscCost, label: 'Прочее и запас (15%)', unit: '₽' },
        { value: totalCost, label: 'ОБЩАЯ СУММА', unit: '₽' },
        { value: perPerson, label: 'На одного человека', unit: '₽' },
        { value: tips[destination], label: 'Советы по направлению' }
    ];
},
  'calculyator-chaevyh': (inputs) => {
    const amount = Number(inputs.amount);
    const tipPercent = Number(inputs.tipPercent);
    const people = Number(inputs.people);
    const tip = amount * (tipPercent / 100);
    const total = amount + tip;
    const perPerson = total / people;
    return [
        {
            value: Math.round(tip * 100) / 100,
            label: 'Сумма чаевых',
            unit: '₽'
        },
        {
            value: Math.round(total * 100) / 100,
            label: 'Итого к оплате',
            unit: '₽'
        },
        {
            value: Math.round(perPerson * 100) / 100,
            label: 'С каждого человека',
            unit: '₽'
        }
    ];
},
  'chaevye-po-stranam': (inputs) => {
    const country = String(inputs.country);
    const billAmount = Number(inputs.billAmount);
    const serviceQuality = String(inputs.serviceQuality);
    const serviceType = String(inputs.serviceType);
    const baseTips: Record<string, number> = {
        'usa': 15,
        'uk': 10,
        'germany': 5,
        'france': 0,
        'russia': 5,
        'japan': 0,
        'italy': 10,
        'spain': 5,
        'uae': 10,
        'thailand': 10
    };
    const qualityMult: Record<string, number> = {
        'poor': 0,
        'average': 0.8,
        'good': 1.0,
        'excellent': 1.3
    };
    let tipPercent = baseTips[country] * qualityMult[serviceQuality];
    if (country === 'usa') {
        if (serviceType === 'bar')
            tipPercent = Math.max(tipPercent, 1);
        if (serviceType === 'taxi')
            tipPercent = 15;
        if (serviceType === 'hotel')
            tipPercent = 2;
    }
    const customs: Record<string, string> = {
        'usa': 'В США чаевые обязательны — 15-20% в ресторанах. Оставлять меньше считается оскорблением.',
        'uk': 'В UK чаевые приветствуются, но не обязательны. Округлите сумму или оставьте 10%.',
        'germany': 'В Германии чаевые не обязательны, но принято округлять вверх или оставлять 5-10%.',
        'france': 'Во Франции service compris (обслуживание включено) — чаевые не обязательны, но можно оставить мелочь.',
        'russia': 'В России чаевые 5-10% при хорошем обслуживании. Часто включены в счёт как сервисный сбор.',
        'japan': 'В Японии чаевые НЕ принято оставлять — это может обидеть персонал. Отличный сервис включён в цену.',
        'italy': 'В Италии coperto (покрытие) включено в счёт. Чаевые 5-10% за отличный сервис.',
        'spain': 'В Испании чаевые не обязательны, но принято оставлять мелочь (5-10%).',
        'uae': 'В ОАЭ чаевые приветствуются — 10% в ресторанах, 5-10 таксистам.',
        'thailand': 'В Таиланде чаевые не обязательны, но 10-20 бат (или 10%) за хороший сервис будут оценены.'
    };
    const tipAmount = Math.round(billAmount * (tipPercent / 100) * 100) / 100;
    const totalAmount = Math.round((billAmount + tipAmount) * 100) / 100;
    return [
        { value: Math.round(tipPercent), label: 'Рекомендуемый процент', unit: '%' },
        { value: tipAmount, label: 'Сумма чаевых', unit: '$' },
        { value: totalAmount, label: 'Итого с чаевыми', unit: '$' },
        { value: customs[country], label: 'Местные обычаи' }
    ];
},
  'data-cherez-n-dnej': (inputs) => {
    const start = new Date(String(inputs.startDate));
    const days = Number(inputs.days);
    const months = Number(inputs.months);
    const years = Number(inputs.years);
    const result = new Date(start);
    result.setFullYear(result.getFullYear() + years);
    result.setMonth(result.getMonth() + months);
    result.setDate(result.getDate() + days);
    const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const weekday = weekdays[result.getDay()];
    const startOfYear = new Date(result.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((result.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const formatDate = (d: Date) => {
        return d.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    return [
        { value: formatDate(result), label: 'Итоговая дата' },
        { value: weekday, label: 'День недели' },
        { value: `${dayOfYear}-й день ${result.getFullYear()} года`, label: 'День года' }
    ];
},
  'den-nedeli': (inputs) => {
    const date = new Date(inputs.date as string);
    if (!date.getTime()) {
        return [{ value: '—', label: 'Результат' }];
    }
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekOfYear = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return [
        { value: dayOfWeek, label: 'День недели' },
        { value: dayOfYear.toString(), label: 'День года', unit: 'дн.' },
        { value: weekOfYear.toString(), label: 'Неделя года', unit: 'нед.' }
    ];
},
  'dni-mezhdu-datami': (inputs) => {
    const start = new Date(inputs.startDate as string);
    const end = new Date(inputs.endDate as string);
    const includeEnd = Boolean(inputs.includeEnd);
    if (!start.getTime() || !end.getTime()) {
        return [{ value: '—', label: 'Результат' }];
    }
    let totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (includeEnd)
        totalDays += 1;
    const weeks = Math.floor(totalDays / 7);
    let workDays = 0;
    const current = new Date(start);
    const endDate = new Date(end);
    if (includeEnd)
        endDate.setDate(endDate.getDate() + 1);
    while (current < endDate) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6)
            workDays++;
        current.setDate(current.getDate() + 1);
    }
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return [
        { value: totalDays.toString(), label: 'Всего дней', unit: 'дн.' },
        { value: weeks.toString(), label: 'Полных недель', unit: 'нед.' },
        { value: workDays.toString(), label: 'Рабочих дней (пн-пт)', unit: 'дн.' },
        { value: months.toString(), label: 'Полных месяцев', unit: 'мес.' }
    ];
},
  'domashnij-byudzhet': (inputs) => {
    const income = Number(inputs.income);
    const totalExpenses = Number(inputs.rent) + Number(inputs.food) + Number(inputs.transport) + Number(inputs.utilities) + Number(inputs.entertainment) + Number(inputs.other);
    const balance = income - totalExpenses;
    const savingsRate = (balance / income) * 100;
    let _recommendation = '';
    if (savingsRate < 0)
        _recommendation = 'Дефицит бюджета! Срочно сократите расходы.';
    else if (savingsRate < 10)
        _recommendation = 'Слишком мало сбережений. Цель — минимум 10-20%.';
    else if (savingsRate < 20)
        _recommendation = 'Хороший баланс. Можно улучшить до 20%.';
    else
        _recommendation = 'Отличный уровень сбережений!';
    return [
        { value: totalExpenses, label: 'Всего расходов', unit: '₽' },
        { value: balance, label: 'Баланс', unit: '₽' },
        { value: Math.round(savingsRate * 10) / 10, label: 'Сбережения', unit: '%' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
}
