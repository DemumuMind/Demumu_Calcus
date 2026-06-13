import type { ComputeFn } from './compute-helpers';

export const computeMap_other_other2_b_3: Record<string, ComputeFn> = {
  'size-converter': (inputs): any => {
    const system = String(inputs.system);
    const size = Number(inputs.size);
    const gender = String(inputs.gender);
    let baseSize = size;
    if (system === 'eu')
        baseSize = size - 6;
    else if (system === 'us' && gender === 'women')
        baseSize = size + 8;
    else if (system === 'us' && gender === 'men')
        baseSize = size + 14;
    else if (system === 'uk')
        baseSize = size + 8;
    else if (system === 'int') {
        const intToRu: Record<string, number> = { XS: 42, S: 44, M: 46, L: 48, XL: 50, XXL: 52, XXXL: 54 };
        baseSize = intToRu[String(size)] || 46;
    }
    const ruSize = baseSize;
    const euSize = baseSize + 6;
    const usSize = gender === 'women' ? baseSize - 8 : baseSize - 14;
    const ukSize = baseSize - 8;
    const intSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    const intIndex = Math.max(0, Math.min(6, Math.floor((baseSize - 42) / 2)));
    const intSize = intSizes[intIndex];
    return [
        { value: ruSize, label: 'Российский', unit: 'размер' },
        { value: euSize, label: 'Европейский', unit: 'размер' },
        { value: usSize, label: 'Американский', unit: 'размер' },
        { value: ukSize, label: 'Британский', unit: 'размер' },
        { value: intSize, label: 'Международный', unit: '' }
    ];
},
  'skorost-interneta': (inputs) => {
    const speed = Number(inputs.speed);
    const speedUnit = String(inputs.speedUnit);
    const fileSize = Number(inputs.fileSize);
    const fileUnit = String(inputs.fileUnit);
    let speedMBs = speed;
    if (speedUnit === 'mbps') {
        speedMBs = speed / 8;
    }
    let fileSizeMB = fileSize;
    if (fileUnit === 'gb') {
        fileSizeMB = fileSize * 1024;
    }
    else if (fileUnit === 'tb') {
        fileSizeMB = fileSize * 1024 * 1024;
    }
    const timeSeconds = fileSizeMB / speedMBs;
    let timeText = '';
    if (timeSeconds < 60) {
        timeText = `${Math.round(timeSeconds)} сек`;
    }
    else if (timeSeconds < 3600) {
        const minutes = Math.floor(timeSeconds / 60);
        const seconds = Math.round(timeSeconds % 60);
        timeText = `${minutes} мин ${seconds} сек`;
    }
    else {
        const hours = Math.floor(timeSeconds / 3600);
        const minutes = Math.floor((timeSeconds % 3600) / 60);
        timeText = `${hours} ч ${minutes} мин`;
    }
    const perHourGB = (speedMBs * 3600) / 1024;
    return [
        { value: timeText, label: 'Время скачивания' },
        { value: `${speedMBs.toFixed(1)} МБ/с`, label: 'Реальная скорость' },
        { value: `${perHourGB.toFixed(1)} ГБ/час`, label: 'Можно скачать за час' }
    ];
},
  'skorost-peredachi-dannyh': (inputs) => {
    const fileSize = Number(inputs.fileSize);
    const fileUnit = String(inputs.fileUnit);
    const speed = Number(inputs.speed);
    const speedUnit = String(inputs.speedUnit);
    if (!fileSize || !speed) {
        return [
            { value: '—', label: 'Время передачи' },
            { value: '—', label: 'В секундах', unit: 'сек' },
            { value: '—', label: 'В минутах', unit: 'мин' },
            { value: '—', label: 'В часах', unit: 'ч' },
            { value: '—', label: 'Реалистичное время' }
        ];
    }
    const fileMultipliers: Record<string, number> = {
        'MB': 1,
        'GB': 1024,
        'TB': 1024 * 1024
    };
    const fileSizeMB = fileSize * fileMultipliers[fileUnit];
    let speedMBps: number;
    switch (speedUnit) {
        case 'Mbps':
            speedMBps = speed / 8;
            break;
        case 'MBps':
            speedMBps = speed;
            break;
        case 'Gbps':
            speedMBps = speed * 128;
            break;
        default: speedMBps = speed / 8;
    }
    const seconds = fileSizeMB / speedMBps;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    let timeText: string;
    if (hours >= 1) {
        timeText = `${Math.floor(hours)} ч ${Math.round((hours % 1) * 60)} мин`;
    }
    else if (minutes >= 1) {
        timeText = `${Math.floor(minutes)} мин ${Math.round((minutes % 1) * 60)} сек`;
    }
    else {
        timeText = `${Math.round(seconds)} сек`;
    }
    // Realistic time (with overhead for protocols, ~85% efficiency)
    const realisticSeconds = seconds / 0.85;
    let realisticTime: string;
    if (realisticSeconds > 3600) {
        realisticTime = `${Math.round(realisticSeconds / 3600 * 10) / 10} ч`;
    }
    else if (realisticSeconds > 60) {
        realisticTime = `${Math.round(realisticSeconds / 60)} мин`;
    }
    else {
        realisticTime = `${Math.round(realisticSeconds)} сек`;
    }
    return [
        { value: timeText, label: 'Время передачи' },
        { value: Math.round(seconds), label: 'В секундах', unit: 'сек' },
        { value: Math.round(minutes), label: 'В минутах', unit: 'мин' },
        { value: Number(hours.toFixed(2)), label: 'В часах', unit: 'ч' },
        { value: `${realisticTime} (с учётом накладных расходов)`, label: 'Реалистичное время' }
    ];
},
  'skorost-plavaniya': (inputs) => {
    const distance = Number(inputs.distance);
    const minutes = Number(inputs.minutes);
    const seconds = Number(inputs.seconds);
    const poolLength = Number(inputs.poolLength);
    const totalSeconds = minutes * 60 + seconds;
    const pace100m = (totalSeconds / distance) * 100;
    const paceMin = Math.floor(pace100m / 60);
    const paceSec = Math.round(pace100m % 60);
    const speed = distance / totalSeconds;
    const timePerLength = (totalSeconds / distance) * poolLength;
    const tMin = Math.floor(timePerLength / 60);
    const tSec = Math.round(timePerLength % 60);
    const swolf = Math.round(pace100m) + (100 / poolLength);
    return [
        { value: `${paceMin}:${paceSec.toString().padStart(2, '0')}`, label: 'Темп на 100м' },
        { value: Math.round(speed * 100) / 100, label: 'Скорость', unit: 'м/с' },
        { value: `${tMin}:${tSec.toString().padStart(2, '0')}`, label: `Время на ${poolLength}м` },
        { value: Math.round(swolf), label: 'SWOLF (25м)' }
    ];
},
  'sleep-calculator': (inputs): any => {
    const _age = String(inputs.age);
    const sleepData: Record<string, {
        total: number;
        night: number;
        naps: number;
        count: number;
    }> = {
        '0-3': { total: 16, night: 9, naps: 7, count: 4 },
        '3-6': { total: 15, night: 10, naps: 5, count: 3 },
        '6-12': { total: 14, night: 11, naps: 3, count: 2 },
        '1-2': { total: 13, night: 11.5, naps: 1.5, count: 1 },
        '2-3': { total: 12, night: 11, naps: 1, count: 1 },
        '3-5': { total: 11, night: 10.5, naps: 0.5, count: 1 }
    };
    const data = sleepData[_age];
    return [
        { value: data.total, label: 'Всего сна в сутки', unit: 'ч' },
        { value: data.night, label: 'Ночной сон', unit: 'ч' },
        { value: data.naps, label: 'Дневной сон', unit: 'ч' },
        { value: data.count, label: 'Количество снов', unit: 'раз' }
    ];
},
  'stoikost-parolya': (inputs) => {
    const passwordLength = Number(inputs.passwordLength);
    const charset = String(inputs.charset);
    const hashType = String(inputs.hashType);
    if (!passwordLength) {
        return [
            { value: '—', label: 'Вариантов комбинаций' },
            { value: '—', label: 'Время взлома (GPU)' },
            { value: '—', label: 'Время взлома (bcrypt)' },
            { value: '—', label: 'Оценка надёжности' },
            { value: '—', label: 'Рекомендация' }
        ];
    }
    const charsetSizes: Record<string, number> = {
        'lowercase': 26,
        'alphanumeric': 36,
        'alphanumeric-mixed': 62,
        'full': 95
    };
    const charsetSize = charsetSizes[charset];
    const combinations = Math.pow(charsetSize, passwordLength);
    // Hash rates (hashes per second on modern hardware)
    const hashRates: Record<string, number> = {
        'md5': 200e9, // 200 billion/s on GPU
        'sha256': 10e9, // 10 billion/s on GPU
        'bcrypt': 10000, // 10 thousand/s (intentionally slow)
        'argon2': 5000, // 5 thousand/s
        'pbkdf2': 100000 // 100 thousand/s
    };
    const rate = hashRates[hashType];
    const secondsFast = combinations / rate;
    const secondsSlow = combinations / 10000; // bcrypt rate
    const formatTime = (seconds: number): string => {
        if (seconds < 1)
            return '< 1 сек';
        if (seconds < 60)
            return `${Math.round(seconds)} сек`;
        if (seconds < 3600)
            return `${Math.round(seconds / 60)} мин`;
        if (seconds < 86400)
            return `${Math.round(seconds / 3600)} ч`;
        if (seconds < 31536000)
            return `${Math.round(seconds / 86400)} дн`;
        if (seconds < 31536000 * 100)
            return `${Math.round(seconds / 31536000)} лет`;
        if (seconds < 31536000 * 1000000)
            return `${Math.round(seconds / 31536000 / 1000)} тыс. лет`;
        return `${Math.round(seconds / 31536000 / 1e9)} млрд лет`;
    };
    let strength: string;
    let _recommendation: string;
    if (combinations < 1e8) {
        strength = 'Очень слабый (мгновенный взлом)';
        _recommendation = 'Увеличьте длину минимум до 12 символов, используйте смешанный регистр и цифры';
    }
    else if (combinations < 1e12) {
        strength = 'Слабый (взламывается за секунды/минуты)';
        _recommendation = 'Минимум 12 символов, используйте все типы символов';
    }
    else if (combinations < 1e18) {
        strength = 'Средний (взламывается за часы/дни)';
        _recommendation = 'Достаточно для обычных аккаунтов, используйте уникальные пароли';
    }
    else if (combinations < 1e24) {
        strength = 'Хороший (взлом нецелесообразен)';
        _recommendation = 'Хороший пароль. Рекомендуется менеджер паролей';
    }
    else {
        strength = 'Отличный (взлом невозможен)';
        _recommendation = 'Отличная защита. Используйте менеджер паролей для генерации';
    }
    let combosText: string;
    if (combinations >= 1e15) {
        combosText = combinations.toExponential(2);
    }
    else {
        combosText = combinations.toLocaleString();
    }
    return [
        { value: combosText, label: 'Вариантов комбинаций' },
        { value: formatTime(secondsFast), label: 'Время взлома (GPU)' },
        { value: formatTime(secondsSlow), label: 'Время взлома (bcrypt)' },
        { value: strength, label: 'Оценка надёжности' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
  'stoimost-pitomca': (inputs) => {
    const petType = String(inputs.petType);
    const foodQuality = String(inputs.foodQuality);
    const vetCare = String(inputs.vetCare);
    const grooming = String(inputs.grooming);
    const foodCosts: Record<string, number> = {
        economy: 500,
        standard: 1500,
        premium: 3000,
        super_premium: 5000
    };
    const sizeMultipliers: Record<string, number> = {
        dog_small: 0.5,
        dog_medium: 1,
        dog_large: 1.8,
        cat: 0.3
    };
    const foodCost = (foodCosts[foodQuality] || 1500) * (sizeMultipliers[petType] || 1);
    const vetCosts: Record<string, number> = {
        basic: 5000,
        extended: 15000,
        full: 30000
    };
    const vetPerMonth = (vetCosts[vetCare] || 5000) / 12;
    const groomingCosts: Record<string, number> = {
        none: 0,
        occasional: 1000,
        regular: 3000
    };
    // Additional costs (toys, treats, accessories, litter for cats)
    let extras = 500;
    if (petType === 'cat') {
        extras += 300; // litter
    }
    const monthlyCost = foodCost + vetPerMonth + (groomingCosts[grooming] || 0) + extras;
    const yearlyCost = monthlyCost * 12;
    const foodPercent = Math.round((foodCost / monthlyCost) * 100);
    const vetPercent = Math.round((vetPerMonth / monthlyCost) * 100);
    const otherPercent = 100 - foodPercent - vetPercent;
    return [
        { value: Math.round(monthlyCost), label: 'В месяц (₽)' },
        { value: Math.round(yearlyCost), label: 'В год (₽)' },
        { value: `Корм ${foodPercent}%, Ветеринар ${vetPercent}%, Прочее ${otherPercent}%`, label: 'Распределение расходов' }
    ];
},
  'styazhka-pola': (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness) / 100;
    const ratio = String(inputs.ratio);
    const volume = area * thickness;
    const totalWeight = volume * 2000;
    const ratioParts = ratio === '1:3' ? 4 : 5;
    const cement = totalWeight / ratioParts;
    const sand = totalWeight - cement;
    const water = cement * 0.5;
    return [
        { value: Math.round(volume * 100) / 100, label: 'Объём стяжки', unit: 'м³' },
        { value: Math.round(cement), label: 'Цемента', unit: 'кг' },
        { value: Math.round(sand), label: 'Песка', unit: 'кг' },
        { value: Math.round(water), label: 'Воды', unit: 'л' }
    ];
},
  'temp-bega': (inputs) => {
    const distance = Number(inputs.distance);
    const hours = Number(inputs.hours);
    const minutes = Number(inputs.minutes);
    const seconds = Number(inputs.seconds);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const pacePerKm = totalSeconds / distance;
    const paceMin = Math.floor(pacePerKm / 60);
    const paceSec = Math.round(pacePerKm % 60);
    const speed = (distance / (totalSeconds / 3600));
    const pace400m = (pacePerKm * 0.4);
    const p400min = Math.floor(pace400m / 60);
    const p400sec = Math.round(pace400m % 60);
    return [
        { value: `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`, label: 'Общее время' },
        { value: `${paceMin}:${paceSec.toString().padStart(2, '0')}`, label: 'Темп мин/км' },
        { value: Math.round(speed * 100) / 100, label: 'Скорость', unit: 'км/ч' },
        { value: `${p400min}:${p400sec.toString().padStart(2, '0')}`, label: 'Темп на 400м' }
    ];
},
  'toplivo-dlya-poezdki': (inputs) => {
    const distance = Number(inputs.distance);
    const consumption = Number(inputs.consumption);
    const fuelPrice = Number(inputs.fuelPrice);
    const passengers = Number(inputs.passengers);
    if (!distance || !consumption || !fuelPrice || !passengers) {
        return [
            { value: '—', label: 'Топлива понадобится', unit: 'л' },
            { value: '—', label: 'Стоимость топлива', unit: '₽' },
            { value: '—', label: 'На человека', unit: '₽' },
            { value: '—', label: 'Заправок (50л бак)', unit: 'раз' },
            { value: '—', label: 'Сравнение с поездом' }
        ];
    }
    const fuelNeeded = (distance / 100) * consumption;
    const fuelCost = fuelNeeded * fuelPrice;
    const costPerPerson = fuelCost / passengers;
    const stops = Math.ceil(fuelNeeded / 50);
    // Comparison with train (rough estimate: ~3-5 rub per km per person)
    const trainCostPerPerson = distance * 4; // rough average
    const comparison = fuelCost < trainCostPerPerson * passengers
        ? `Выгоднее поезда на ${Math.round(trainCostPerPerson * passengers - fuelCost)}₽`
        : `Дороже поезда на ${Math.round(fuelCost - trainCostPerPerson * passengers)}₽`;
    return [
        { value: Number(fuelNeeded.toFixed(1)), label: 'Топлива понадобится', unit: 'л' },
        { value: Math.round(fuelCost), label: 'Стоимость топлива', unit: '₽' },
        { value: Math.round(costPerPerson), label: 'На человека', unit: '₽' },
        { value: stops, label: 'Заправок (50л бак)', unit: 'раз' },
        { value: comparison, label: 'Сравнение с поездом' }
    ];
},
}
