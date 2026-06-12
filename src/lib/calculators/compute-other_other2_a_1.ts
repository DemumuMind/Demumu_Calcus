import type { ComputeFn } from './compute-helpers';

export const computeMap_other_other2_a_1: Record<string, ComputeFn> = {
  'baby-clothes-calculator': (inputs): any => {
    const climate = String(inputs.climate);
    const laundryFrequency = String(inputs.laundryFrequency);
    const baseNeeds: Record<string, Record<string, number>> = {
        bodysuits: { daily: 7, '2-3': 10, weekly: 14 },
        pants: { daily: 5, '2-3': 7, weekly: 10 },
        sleepers: { daily: 4, '2-3': 6, weekly: 8 },
        outerwear: { daily: 2, '2-3': 3, weekly: 4 }
    };
    const climateMultipliers: Record<string, Record<string, number>> = {
        cold: { bodysuits: 1.2, pants: 1.3, sleepers: 1.4, outerwear: 1.5 },
        moderate: { bodysuits: 1, pants: 1, sleepers: 1, outerwear: 1 },
        warm: { bodysuits: 0.9, pants: 0.8, sleepers: 0.7, outerwear: 0.5 }
    };
    const mults = climateMultipliers[climate];
    const bodysuits = Math.ceil(baseNeeds.bodysuits[laundryFrequency] * mults.bodysuits);
    const pants = Math.ceil(baseNeeds.pants[laundryFrequency] * mults.pants);
    const sleepers = Math.ceil(baseNeeds.sleepers[laundryFrequency] * mults.sleepers);
    const outerwear = Math.ceil(baseNeeds.outerwear[laundryFrequency] * mults.outerwear);
    const itemCost = 300;
    const outerCost = 1500;
    const estimatedCost = (bodysuits + pants + sleepers) * itemCost + outerwear * outerCost;
    return [
        { value: bodysuits, label: 'Боди/распашонки', unit: 'шт' },
        { value: pants, label: 'Штанишки/ползунки', unit: 'шт' },
        { value: sleepers, label: 'Слипы/комбинезоны', unit: 'шт' },
        { value: outerwear, label: 'Верхняя одежда', unit: 'шт' },
        { value: estimatedCost, label: 'Примерная стоимость', unit: '₽' }
    ];
},
  'baby-growth-calculator': (inputs): any => {
    const _age = Number(inputs.age);
    const gender = String(inputs.gender);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    // Упрощённый расчёт процентилей (реальные таблицы ВОЗ сложнее)
    const expectedHeight = gender === 'boy'
        ? 50 + _age * 2.5
        : 49 + _age * 2.4;
    const expectedWeight = gender === 'boy'
        ? 3.5 + _age * 0.7
        : 3.3 + _age * 0.65;
    const heightDiff = (height - expectedHeight) / expectedHeight;
    const weightDiff = (weight - expectedWeight) / expectedWeight;
    const heightPercentile = Math.max(1, Math.min(99, Math.round(50 + heightDiff * 100)));
    const weightPercentile = Math.max(1, Math.min(99, Math.round(50 + weightDiff * 100)));
    const heightM = height / 100;
    const bmi = Math.round(weight / (heightM * heightM) * 10) / 10;
    let assessment;
    if (heightPercentile < 3 || weightPercentile < 3) {
        assessment = 'Ниже нормы - проконсультируйтесь с врачом';
    }
    else if (heightPercentile > 97 || weightPercentile > 97) {
        assessment = 'Выше среднего - обсудите с педиатром';
    }
    else {
        assessment = 'В пределах нормы';
    }
    return [
        { value: `${heightPercentile}-й`, label: 'Процентиль роста', unit: '' },
        { value: `${weightPercentile}-й`, label: 'Процентиль веса', unit: '' },
        { value: bmi, label: 'Индекс массы тела', unit: 'кг/м²' },
        { value: assessment, label: 'Оценка', unit: '' }
    ];
},
  'base64-koder': (inputs) => {
    const inputText = String(inputs.inputText);
    const operation = String(inputs.operation);
    if (!inputText) {
        return [
            { value: '—', label: 'Результат' },
            { value: '—', label: 'Длина оригинала', unit: 'байт' },
            { value: '—', label: 'Длина результата', unit: 'байт' },
            { value: '—', label: 'Увеличение размера', unit: '%' },
            { value: '—', label: 'Использование' }
        ];
    }
    try {
        let result: string;
        let originalLength: number;
        let resultLength: number;
        if (operation === 'encode') {
            originalLength = new TextEncoder().encode(inputText).length;
            const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            const bytes = new TextEncoder().encode(inputText);
            let output = '';
            for (let i = 0; i < bytes.length; i += 3) {
                const b1 = bytes[i];
                const b2 = bytes[i + 1] || 0;
                const b3 = bytes[i + 2] || 0;
                const bitmap = (b1 << 16) | (b2 << 8) | b3;
                output += base64Chars[(bitmap >> 18) & 63];
                output += base64Chars[(bitmap >> 12) & 63];
                output += (i + 1 < bytes.length) ? base64Chars[(bitmap >> 6) & 63] : '=';
                output += (i + 2 < bytes.length) ? base64Chars[bitmap & 63] : '=';
            }
            result = output;
            resultLength = result.length;
        }
        else {
            originalLength = inputText.length;
            try {
                const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                const input = inputText.replace(/=+$/, '');
                const output: number[] = [];
                for (let i = 0; i < input.length; i += 4) {
                    const c1 = base64Chars.indexOf(input[i]);
                    const c2 = base64Chars.indexOf(input[i + 1] || 'A');
                    const c3 = base64Chars.indexOf(input[i + 2] || 'A');
                    const c4 = base64Chars.indexOf(input[i + 3] || 'A');
                    const bitmap = (c1 << 18) | (c2 << 12) | (c3 << 6) | c4;
                    output.push((bitmap >> 16) & 255);
                    if (input[i + 2] !== undefined && input[i + 2] !== '=') {
                        output.push((bitmap >> 8) & 255);
                    }
                    if (input[i + 3] !== undefined && input[i + 3] !== '=') {
                        output.push(bitmap & 255);
                    }
                }
                result = new TextDecoder().decode(new Uint8Array(output));
                resultLength = new TextEncoder().encode(result).length;
            }
            catch {
                result = 'Ошибка декодирования: некорректный Base64';
                resultLength = 0;
            }
        }
        const sizeIncrease = operation === 'encode'
            ? ((resultLength - originalLength) / originalLength) * 100
            : ((originalLength - resultLength) / resultLength) * 100;
        return [
            { value: result, label: 'Результат' },
            { value: originalLength, label: 'Длина оригинала', unit: 'байт' },
            { value: resultLength, label: 'Длина результата', unit: 'байт' },
            { value: Math.round(sizeIncrease), label: 'Увеличение размера', unit: '%' },
            { value: 'Email вложения, URL-параметры, JSON бинарных данных, Data URI', label: 'Использование' }
        ];
    }
    catch {
        return [
            { value: 'Ошибка кодирования', label: 'Результат' },
            { value: '—', label: 'Длина оригинала', unit: 'байт' },
            { value: '—', label: 'Длина результата', unit: 'байт' },
            { value: '—', label: 'Увеличение размера', unit: '%' },
            { value: '—', label: 'Использование' }
        ];
    }
},
  'beton-m300': (inputs) => {
    const volume = Number(inputs.volume);
    const cement = volume * 350;
    const sand = volume * 650;
    const aggregate = volume * 1250;
    const water = volume * 200;
    return [
        { value: Math.round(cement), label: 'Цемент М400', unit: 'кг' },
        { value: Math.round(sand), label: 'Песок', unit: 'кг' },
        { value: Math.round(aggregate), label: 'Щебень/гравий', unit: 'кг' },
        { value: Math.round(water), label: 'Вода', unit: 'л' }
    ];
},
  'bitrate-video': (inputs) => {
    const resolution = String(inputs.resolution);
    const _fps = Number(inputs.fps);
    const bitrate = Number(inputs.bitrate);
    const duration = Number(inputs.duration);
    const resolutions: Record<string, {
        w: number;
        h: number;
        name: string;
    }> = {
        'sd': { w: 720, h: 480, name: 'SD' },
        'hd': { w: 1280, h: 720, name: 'HD 720p' },
        'fhd': { w: 1920, h: 1080, name: 'Full HD 1080p' },
        '4k': { w: 3840, h: 2160, name: '4K UHD' },
        '8k': { w: 7680, h: 4320, name: '8K UHD' }
    };
    const res = resolutions[resolution];
    const pixels = res.w * res.h;
    const megapixels = (pixels / 1000000).toFixed(1);
    // File size: bitrate (Mbps) * duration (seconds) / 8 = MB
    const fileSizeMB = (bitrate * duration * 60) / 8;
    const fileSizeGB = fileSizeMB / 1024;
    const perMinuteMB = (bitrate * 60) / 8;
    const dataRateMB = bitrate / 8;
    let sizeText = '';
    if (fileSizeGB >= 1) {
        sizeText = `${fileSizeGB.toFixed(2)} ГБ`;
    }
    else {
        sizeText = `${Math.round(fileSizeMB)} МБ`;
    }
    return [
        { value: sizeText, label: 'Размер файла' },
        { value: `${Math.round(perMinuteMB)} МБ/мин`, label: 'В минуту' },
        { value: `${pixels.toLocaleString()} (${megapixels} MP)`, label: 'Пикселей в кадре' },
        { value: `${dataRateMB.toFixed(1)} МБ/с`, label: 'Скорость потока' }
    ];
},
  'body-shape-calculator': (inputs): any => {
    const shoulders = Number(inputs.shoulders);
    const bust = Number(inputs.bust);
    const waist = Number(inputs.waist);
    const hips = Number(inputs.hips);
    const shoulderToHip = shoulders / hips;
    const waistToHip = waist / hips;
    const bustToWaist = bust / waist;
    let bodyShape;
    let stylingTips;
    if (waistToHip < 0.75 && bustToWaist > 1.2) {
        bodyShape = 'Песочные часы ⏳';
        stylingTips = 'Подчёркивайте талию поясами, облегающие платья, A-силуэты';
    }
    else if (shoulderToHip > 1.05) {
        bodyShape = 'Перевёрнутый треугольник ▽';
        stylingTips = 'Уравновешивайте плечи: расклешённые юбки, V-образный вырез, детали на бёдрах';
    }
    else if (shoulderToHip < 0.95) {
        bodyShape = 'Груша 🍐';
        stylingTips = 'Акцент на верх: декольте, яркие топы, тёмное снизу, A-силуэт';
    }
    else if (waistToHip > 0.85) {
        bodyShape = 'Яблоко 🍎';
        stylingTips = 'Удлиняйте силуэт: имперская талия, прямые линии, вертикальные полосы';
    }
    else if (shoulderToHip >= 0.95 && shoulderToHip <= 1.05 && waistToHip >= 0.75) {
        bodyShape = 'Прямоугольник ▭';
        stylingTips = 'Создавайте талию: пояса, оборки, асимметрия, платья-кейпы';
    }
    else {
        bodyShape = 'Овальная/Комбинированная';
        stylingTips = 'Индивидуальный подбор по сильным сторонам фигуры';
    }
    return [
        { value: bodyShape, label: 'Тип фигуры', unit: '' },
        { value: Math.round(waistToHip * 100) / 100, label: 'Соотношение талия/бёдра', unit: '' },
        { value: stylingTips, label: 'Советы по стилю', unit: '' }
    ];
},
  'bra-size-calculator': (inputs): any => {
    const underbust = Number(inputs.underbust);
    const bust = Number(inputs.bust);
    let bandSize = Math.round(underbust / 2) * 2;
    if (bandSize % 2 !== 0)
        bandSize += 1;
    const diff = bust - underbust;
    const cupSizes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cupIndex = Math.max(0, Math.floor((diff - 10) / 2.5));
    const cupSize = cupSizes[Math.min(cupIndex, cupSizes.length - 1)] || 'A';
    const fullSize = `${bandSize}${cupSize}`;
    const sisterSizes = [
        `${bandSize - 2}${String.fromCharCode(cupSize.charCodeAt(0) + 1)}`,
        `${bandSize + 2}${String.fromCharCode(cupSize.charCodeAt(0) - 1)}`
    ].filter(s => !s.includes('undefined') && !s.includes('@'));
    return [
        { value: bandSize, label: 'Объём ленты', unit: '' },
        { value: cupSize, label: 'Размер чашки', unit: '' },
        { value: fullSize, label: 'Полный размер', unit: '' },
        { value: sisterSizes.join(', '), label: 'Смежные размеры', unit: '' }
    ];
},
  'bulk-discount-calculator': (inputs): any => {
    const n = inputs as Record<string, number>;
    const regularTotal = inputs.unitPrice * inputs.quantity;
    const _savings = regularTotal - inputs.bulkPrice;
    const _discountPercent = Math.round((_savings / regularTotal) * 100);
    const _unitPriceAfter = Math.round(inputs.bulkPrice / inputs.quantity);
    return [];
},
  'capsule-wardrobe-calculator': (inputs): any => {
    const lifestyle = String(inputs.lifestyle);
    const seasons = String(inputs.seasons);
    const budget = String(inputs.budget);
    const baseCounts: Record<string, {
        tops: number;
        bottoms: number;
        layers: number;
        shoes: number;
    }> = {
        office: { tops: 8, bottoms: 4, layers: 4, shoes: 4 },
        casual: { tops: 6, bottoms: 4, layers: 3, shoes: 3 },
        mixed: { tops: 10, bottoms: 6, layers: 4, shoes: 4 },
        creative: { tops: 8, bottoms: 5, layers: 3, shoes: 4 }
    };
    const seasonMultipliers: Record<string, number> = {
        all: 1.2,
        warm: 0.8,
        cold: 1.3
    };
    const prices: Record<string, number> = {
        budget: 1000,
        mid: 3000,
        premium: 8000
    };
    const mult = seasonMultipliers[seasons];
    const base = baseCounts[lifestyle];
    const topsCount = Math.ceil(base.tops * mult);
    const bottomsCount = Math.ceil(base.bottoms * mult);
    const layersCount = Math.ceil(base.layers * mult);
    const shoesCount = Math.ceil(base.shoes * mult);
    const totalItems = topsCount + bottomsCount + layersCount + shoesCount;
    const estimatedCost = Math.round(totalItems * prices[budget] * 0.7); // некоторые вещи дороже
    return [
        { value: topsCount, label: 'Верх', unit: 'шт' },
        { value: bottomsCount, label: 'Низ', unit: 'шт' },
        { value: layersCount, label: 'Слои/пиджаки', unit: 'шт' },
        { value: shoesCount, label: 'Обувь', unit: 'шт' },
        { value: totalItems, label: 'Всего вещей', unit: 'шт' },
        { value: estimatedCost, label: 'Примерная стоимость', unit: '₽' }
    ];
},
  'chasovye-poyasa': (inputs) => {
    const time = String(inputs.time);
    const fromTimezone = String(inputs.fromTimezone);
    const toTimezone = String(inputs.toTimezone);
    const timeParts = time.split(':');
    if (timeParts.length !== 2) {
        return [
            { value: 'Некорректный формат времени', label: 'Время в целевом поясе' },
            { value: '—', label: 'Разница во времени' },
            { value: '—', label: 'Изменение даты' },
            { value: '—', label: 'Время суток' }
        ];
    }
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return [
            { value: 'Некорректное время', label: 'Время в целевом поясе' },
            { value: '—', label: 'Разница во времени' },
            { value: '—', label: 'Изменение даты' },
            { value: '—', label: 'Время суток' }
        ];
    }
    const offsets: Record<string, number> = {
        'UTC': 0,
        'MSK': 3,
        'CET': 1,
        'EST': -5,
        'PST': -8,
        'JST': 9,
        'AEST': 10,
        'GMT': 0
    };
    const fromOffset = offsets[fromTimezone];
    const toOffset = offsets[toTimezone];
    const diff = toOffset - fromOffset;
    let newHours = hours + diff;
    let dayChange = 0;
    while (newHours >= 24) {
        newHours -= 24;
        dayChange++;
    }
    while (newHours < 0) {
        newHours += 24;
        dayChange--;
    }
    const resultTime = `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    let timeDiffText: string;
    if (diff > 0) {
        timeDiffText = `+${diff} часов`;
    }
    else if (diff < 0) {
        timeDiffText = `${diff} часов`;
    }
    else {
        timeDiffText = 'Нет разницы';
    }
    let dateChangeText: string;
    if (dayChange > 0) {
        dateChangeText = `Следующий день (+${dayChange})`;
    }
    else if (dayChange < 0) {
        dateChangeText = `Предыдущий день (${dayChange})`;
    }
    else {
        dateChangeText = 'Тот же день';
    }
    let dayPeriod: string;
    if (newHours >= 5 && newHours < 12) {
        dayPeriod = 'Утро';
    }
    else if (newHours >= 12 && newHours < 17) {
        dayPeriod = 'День';
    }
    else if (newHours >= 17 && newHours < 22) {
        dayPeriod = 'Вечер';
    }
    else {
        dayPeriod = 'Ночь';
    }
    return [
        { value: resultTime, label: 'Время в целевом поясе' },
        { value: timeDiffText, label: 'Разница во времени' },
        { value: dateChangeText, label: 'Изменение даты' },
        { value: dayPeriod, label: 'Время суток' }
    ];
},
}
