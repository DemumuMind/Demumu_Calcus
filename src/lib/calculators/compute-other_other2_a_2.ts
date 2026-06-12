import type { ComputeFn } from './compute-helpers';

export const computeMap_other_other2_a_2: Record<string, ComputeFn> = {
  'chislo-sostavlyaet-procent': (inputs) => {
    const value = Number(inputs.value) || 0;
    const total = Number(inputs.total) || 0;
    if (total === 0)
        return [{ value: '—', label: 'Процент' }];
    const result = (value * 100) / total;
    return [
        { value: result.toFixed(2), label: 'Процент' },
        { value: `${value} от ${total} = ${result.toFixed(2)}%`, label: 'Формула' },
    ];
},
  'color-season-calculator': (inputs): any => {
    const skinTone = String(inputs.skinTone);
    const hairColor = String(inputs.hairColor);
    let seasonType;
    let bestColors;
    let avoidColors;
    let metalType;
    if (skinTone.includes('warm') && hairColor === 'blonde') {
        seasonType = 'Весна (Spring)';
        bestColors = 'Коралловый, персиковый, золотистый, салатовый, бирюзовый';
        avoidColors = 'Чёрный, холодный розовый, серебристый, пастельно-голубой';
        metalType = 'Золото';
    }
    else if (skinTone.includes('cool') && hairColor === 'blonde') {
        seasonType = 'Лето (Summer)';
        bestColors = 'Пыльная роза, лаванда, голубой, серо-голубой, бордо';
        avoidColors = 'Оранжевый, рыжий, тёплый жёлтый, оливковый';
        metalType = 'Серебро';
    }
    else if (skinTone.includes('warm') && (hairColor === 'brown' || hairColor === 'red')) {
        seasonType = 'Осень (Autumn)';
        bestColors = 'Терракотовый, оливковый, горчичный, шоколадный, тёмно-зелёный';
        avoidColors = 'Ярко-розовый, лимонный, серебро, пастельные тона';
        metalType = 'Золото, медь';
    }
    else {
        seasonType = 'Зима (Winter)';
        bestColors = 'Чёрный, белый, красный, изумрудный, синий, фиолетовый';
        avoidColors = 'Тёплый беж, персиковый, оранжевый, золотистый';
        metalType = 'Серебро, платина';
    }
    return [
        { value: seasonType, label: 'Цветовой тип', unit: '' },
        { value: bestColors, label: 'Лучшие цвета', unit: '' },
        { value: avoidColors, label: 'Цвета, которых избегать', unit: '' },
        { value: metalType, label: 'Подходящий металл', unit: '' }
    ];
},
  'compare-price-calculator': (inputs): any => {
    const n = inputs as Record<string, number>;
    const store1Total = inputs.store1Price + inputs.store1Delivery;
    const store2Total = inputs.store2Price + inputs.store2Delivery;
    const _savings = Math.abs(store1Total - store2Total);
    const _betterStore = store1Total < store2Total ? 'Магазин 1' : 'Магазин 2';
    return [];
},
  'cooking-measures-converter': (inputs): any => {
    const conversions: Record<string, number> = {
        cup: 250,
        tbsp: 15,
        tsp: 5,
        ml: 1,
        g: 1,
        l: 1000
    };
    const baseValue = Number(inputs.amount) * conversions[String(inputs.fromUnit)];
    const result = baseValue / conversions[String(inputs.toUnit)];
    return [{ value: Math.round(result * 100) / 100, label: 'Результат', unit: String(inputs.toUnit) }];
},
  'cron-raspisanie': (inputs) => {
    const cronExpression = String(inputs.cronExpression).trim();
    const parts = cronExpression.split(/\s+/);
    if (parts.length !== 5) {
        return [
            { value: 'Некорректное cron-выражение (нужно 5 полей)', label: 'Описание' },
            { value: '—', label: 'Минуты (0-59)' },
            { value: '—', label: 'Часы (0-23)' },
            { value: '—', label: 'Дни месяца (1-31)' },
            { value: '—', label: 'Месяцы (1-12)' },
            { value: '—', label: 'Дни недели (0-6)' },
            { value: '—', label: 'Примеры частых задач' }
        ];
    }
    const [minutes, hours, days, months, weekdays] = parts;
    const interpretField = (field: string, type: string): string => {
        if (field === '*')
            return 'Каждый';
        if (field.startsWith('*/')) {
            const interval = field.slice(2);
            return `Каждый ${interval}${type === 'hours' ? '-й' : ''}`;
        }
        if (field.includes(','))
            return `Конкретные: ${field}`;
        if (field.includes('-'))
            return `Диапазон: ${field}`;
        return `В ${field}`;
    };
    let description = '';
    if (minutes === '0' && hours === '0' && days === '*' && months === '*' && weekdays === '*') {
        description = 'Каждый день в полночь';
    }
    else if (minutes === '0' && hours === '0' && weekdays === '0') {
        description = 'Каждое воскресенье в полночь';
    }
    else if (minutes === '0' && hours === '*/12') {
        description = 'Каждые 12 часов (0:00 и 12:00)';
    }
    else if (minutes === '0' && hours === '*') {
        description = 'Каждый час';
    }
    else if (minutes.startsWith('*/')) {
        description = `Каждые ${minutes.slice(2)} минут`;
    }
    else {
        const h = hours === '*' ? 'каждый час' : `час ${hours}`;
        const m = minutes === '*' ? 'каждую минуту' : `минута ${minutes}`;
        description = `${m} ${h}`;
    }
    const examples = '0 0 * * * — ежедневно в полночь\n0 */6 * * * — каждые 6 часов\n0 2 * * 0 — каждое воскресенье в 2:00\n*/5 * * * * — каждые 5 минут\n0 0 1 * * — 1-го числа каждого месяца';
    return [
        { value: description, label: 'Описание' },
        { value: interpretField(minutes, 'minutes'), label: 'Минуты (0-59)' },
        { value: interpretField(hours, 'hours'), label: 'Часы (0-23)' },
        { value: interpretField(days, 'days'), label: 'Дни месяца (1-31)' },
        { value: interpretField(months, 'months'), label: 'Месяцы (1-12)' },
        { value: interpretField(weekdays, 'weekdays'), label: 'Дни недели (0-6)' },
        { value: examples, label: 'Примеры частых задач' }
    ];
},
  'davlenie-v-gorah': (inputs) => {
    const altitude = Number(inputs.altitude);
    const temperature = Number(inputs.temperature);
    if (!altitude && altitude !== 0) {
        return [
            { value: '—', label: 'Атмосферное давление', unit: 'мм рт.ст.' },
            { value: '—', label: 'От нормального', unit: '%' },
            { value: '—', label: 'Температура кипения воды', unit: '°C' },
            { value: '—', label: 'Содержание кислорода', unit: '%' },
            { value: '—', label: 'Температура на высоте', unit: '°C' },
            { value: '—', label: 'Рекомендации' }
        ];
    }
    const seaLevelPressure = 760; // mmHg
    const pressure = seaLevelPressure * Math.pow(1 - (0.0065 * altitude) / (temperature + 0.0065 * altitude + 273.15), 5.257);
    const pressurePercent = (pressure / seaLevelPressure) * 100;
    const boilingPoint = 100 - (altitude / 300);
    const oxygenPercent = (pressure / seaLevelPressure) * 21;
    // Temperature decreases with altitude (lapse rate ~6.5°C per 1000m)
    const altitudeTemp = temperature - (altitude / 1000) * 6.5;
    let _recommendation: string;
    if (altitude < 1500) {
        _recommendation = 'Лёгкая высота. Акклиматизация не требуется.';
    }
    else if (altitude < 2500) {
        _recommendation = 'Умеренная высота. Возможна лёгкая одышка при физической нагрузке.';
    }
    else if (altitude < 3500) {
        _recommendation = 'Значительная высота. Рекомендуется постепенное восхождение для акклиматизации.';
    }
    else if (altitude < 5000) {
        _recommendation = 'Высокая высота. Риск горной болезни. Обязательна акклиматизация.';
    }
    else {
        _recommendation = 'Экстремальная высота. Требуется кислород и опыт альпинизма.';
    }
    return [
        { value: Math.round(pressure), label: 'Атмосферное давление', unit: 'мм рт.ст.' },
        { value: Math.round(pressurePercent), label: 'От нормального', unit: '%' },
        { value: Math.round(boilingPoint * 10) / 10, label: 'Температура кипения воды', unit: '°C' },
        { value: Math.round(oxygenPercent), label: 'Содержание кислорода', unit: '%' },
        { value: Math.round(altitudeTemp * 10) / 10, label: 'Температура на высоте', unit: '°C' },
        { value: _recommendation, label: 'Рекомендации' }
    ];
},
  'diaper-calculator': (inputs): any => {
    const _age = String(inputs.age);
    const usingDiapers = String(inputs.usingDiapers);
    const brand = String(inputs.brand);
    const baseNeeds: Record<string, number> = {
        '0-3': 10,
        '3-6': 8,
        '6-12': 6,
        '12-24': 5,
        '24+': 3
    };
    const usageMultipliers: Record<string, number> = {
        '24h': 1,
        night: 0.3,
        day: 0.7
    };
    const prices: Record<string, number> = {
        economy: 12,
        mid: 22,
        premium: 40
    };
    const diapersPerDay = Math.round(baseNeeds[_age] * usageMultipliers[usingDiapers]);
    const monthlyNeed = diapersPerDay * 30;
    const monthlyCost = monthlyNeed * prices[brand];
    const annualCost = monthlyCost * 12;
    return [
        { value: diapersPerDay, label: 'Подгузников в день', unit: 'шт' },
        { value: monthlyNeed, label: 'В месяц', unit: 'шт' },
        { value: monthlyCost, label: 'Затраты в месяц', unit: '₽' },
        { value: annualCost, label: 'Затраты в год', unit: '₽' }
    ];
},
  'discount-calculator': (inputs): any => {
    const n = inputs as Record<string, number>;
    const firstDiscount = inputs.originalPrice * (inputs.discountPercent / 100);
    const afterFirstDiscount = inputs.originalPrice - firstDiscount;
    const secondDiscount = afterFirstDiscount * (inputs.additionalDiscount / 100);
    const finalPrice = Math.round(afterFirstDiscount - secondDiscount);
    const totalSavings = inputs.originalPrice - finalPrice;
    const _savingsPercent = Math.round((totalSavings / inputs.originalPrice) * 100);
    return [{ value: Math.round(firstDiscount + secondDiscount), label: 'discountAmount', unit: '' }];
},
  'dobavit-procent': (inputs) => {
    const number = Number(inputs.number) || 0;
    const percent = Number(inputs.percent) || 0;
    const result = number + (number * percent) / 100;
    return [
        { value: result, label: 'Результат' },
        { value: `${number} + ${percent}% = ${result}`, label: 'Формула' },
    ];
},
  'dostupnost-sistema': (inputs) => {
    const slaPercent = Number(inputs.slaPercent);
    const period = String(inputs.period);
    if (!slaPercent) {
        return [
            { value: '—', label: 'Доступность', unit: '%' },
            { value: '—', label: 'Максимальный простой', unit: 'мин' },
            { value: '—', label: 'В часах', unit: 'ч' },
            { value: '—', label: 'Количество девяток' },
            { value: '—', label: 'Классификация' }
        ];
    }
    const periodMinutes: Record<string, number> = {
        'day': 24 * 60,
        'week': 7 * 24 * 60,
        'month': 30 * 24 * 60, // Average
        'year': 365.25 * 24 * 60
    };
    const minutes = periodMinutes[period];
    const downtimePercent = 100 - slaPercent;
    const downtimeMinutes = (downtimePercent / 100) * minutes;
    const downtimeHours = downtimeMinutes / 60;
    let nines = 0;
    let temp = slaPercent;
    while (temp >= 99.0 && temp < 100) {
        nines++;
        temp = (temp - 99) * 10 + 9;
    }
    const ninesText = nines >= 1 ? `${nines} nine${nines > 1 ? 's' : ''} (${'9'.repeat(nines)})` : 'less than 1 nine';
    let classification: string;
    if (slaPercent >= 99.999) {
        classification = 'High Availability (HA) — критические системы';
    }
    else if (slaPercent >= 99.99) {
        classification = 'Enterprise — бизнес-критичные';
    }
    else if (slaPercent >= 99.9) {
        classification = 'Professional — важные системы';
    }
    else if (slaPercent >= 99.5) {
        classification = 'Standard — обычные сервисы';
    }
    else {
        classification = 'Basic — некритичные системы';
    }
    return [
        { value: slaPercent, label: 'Доступность', unit: '%' },
        { value: Math.round(downtimeMinutes), label: 'Максимальный простой', unit: 'мин' },
        { value: Number(downtimeHours.toFixed(2)), label: 'В часах', unit: 'ч' },
        { value: ninesText, label: 'Количество девяток' },
        { value: classification, label: 'Классификация' }
    ];
},
  'doza-lekarstv': (inputs) => {
    const petType = String(inputs.petType);
    const weight = Number(inputs.weight);
    const medication = String(inputs.medication);
    if (!weight) {
        return [
            { value: '—', label: 'Дозировка (мг)' },
            { value: '—', label: 'Частота приёма' },
            { value: '❗ Обязательно проконсультируйтесь с ветеринаром!', label: 'Важно!' }
        ];
    }
    const dosageRanges: Record<string, {
        min: number;
        max: number;
        freq: string;
    }> = {
        general: { min: 5, max: 20, freq: '1-2 раза в день' },
        flea: { min: 0, max: 0, freq: 'Согласно инструкции на упаковке' },
        worm: { min: 0, max: 0, freq: 'Раз в 3-6 месяцев' },
        pain: { min: 2, max: 5, freq: '1-2 раза в день' },
        antibiotic: { min: 5, max: 15, freq: '2-3 раза в день, курс 7-14 дней' }
    };
    const range = dosageRanges[medication];
    let dosageMg = 0;
    if (range.min > 0) {
        const avgDosage = (range.min + range.max) / 2;
        dosageMg = weight * avgDosage;
    }
    const warning = '⚠️ ЭТО ТОЛЬКО ОРИЕНТИР! Обязательно проконсультируйтесь с ветеринаром перед применением любых лекарств!';
    return [
        { value: Math.round(dosageMg), label: 'Дозировка (мг)' },
        { value: range.freq, label: 'Частота приёма' },
        { value: warning, label: 'Важно!' }
    ];
},
  'dpi-ppi-razreshenie': (inputs) => {
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const diagonal = Number(inputs.diagonal);
    const distance = Number(inputs.viewingDistance);
    const diagonalPixels = Math.sqrt(width * width + height * height);
    const ppi = diagonalPixels / diagonal;
    const totalPixels = width * height;
    const megaPixels = (totalPixels / 1000000).toFixed(1);
    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };
    const divisor = gcd(width, height);
    const ratioW = width / divisor;
    const ratioH = height / divisor;
    let ratioName = `${ratioW}:${ratioH}`;
    if (Math.abs(width / height - 16 / 9) < 0.01)
        ratioName = '16:9';
    if (Math.abs(width / height - 4 / 3) < 0.01)
        ratioName = '4:3';
    if (Math.abs(width / height - 21 / 9) < 0.01)
        ratioName = '21:9 (UltraWide)';
    // Retina calculation (Apple's formula: roughly 60 PPI at viewing distance)
    const retinaPpi = 60 / (distance / 2.54) * 2.5; // approximate
    const isRetina = ppi >= retinaPpi * 0.8;
    return [
        { value: Math.round(ppi), label: 'PPI (pixels per inch)' },
        { value: `${totalPixels.toLocaleString()} (${megaPixels} MP)`, label: 'Всего пикселей' },
        { value: ratioName, label: 'Соотношение сторон' },
        { value: isRetina ? '✅ Да, Retina-класс' : `❌ Нет (нужно ${Math.round(retinaPpi)}+ PPI)`, label: 'Retina на этом расстоянии' }
    ];
},
  'due-date-calculator': (inputs): any => {
    const lastPeriodStr = String(inputs.lastPeriod);
    const cycleLength = Number(inputs.cycleLength);
    const lastPeriodDate = new Date(lastPeriodStr);
    const today = new Date();
    const dueDate = new Date(lastPeriodDate);
    dueDate.setDate(dueDate.getDate() + 280);
    const cycleAdjustment = cycleLength - 28;
    dueDate.setDate(dueDate.getDate() + cycleAdjustment);
    const diffTime = today.getTime() - lastPeriodDate.getTime();
    const daysPregnant = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysPregnant / 7);
    const daysLeft = Math.max(0, 280 - daysPregnant + cycleAdjustment);
    let trimester;
    if (currentWeek <= 12)
        trimester = 'Первый триместр';
    else if (currentWeek <= 26)
        trimester = 'Второй триместр';
    else
        trimester = 'Третий триместр';
    return [
        { value: dueDate.toLocaleDateString('ru-RU'), label: 'Предполагаемая дата родов', unit: '' },
        { value: currentWeek, label: 'Текущая неделя беременности', unit: 'неделя' },
        { value: daysLeft, label: 'Дней до родов', unit: 'дней' },
        { value: trimester, label: 'Триместр', unit: '' }
    ];
},
}
