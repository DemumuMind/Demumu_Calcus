import type { ComputeFn } from './compute-helpers';

export const computeMap_other_other2_b_1: Record<string, ComputeFn> = {
  'naevye': (inputs) => {
    const billAmount = Number(inputs.billAmount);
    const tipPercent = Number(inputs.tipPercent);
    const peopleCount = Number(inputs.peopleCount);
    if (!billAmount || !peopleCount) {
        return [
            { value: '—', label: 'Сумма чаевых', unit: '₽' },
            { value: '—', label: 'Итого с чаевыми', unit: '₽' },
            { value: '—', label: 'На человека', unit: '₽' },
            { value: '—', label: 'Рекомендация' }
        ];
    }
    const tipAmount = billAmount * (tipPercent / 100);
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / peopleCount;
    let _recommendation = '';
    if (tipPercent === 0) {
        _recommendation = 'В некоторых странах чаевые не принято оставлять (Япония, Китай, Корея)';
    }
    else if (tipPercent <= 10) {
        _recommendation = 'Стандарт для Европы и России. В США может считаться недостаточным.';
    }
    else if (tipPercent <= 18) {
        _recommendation = 'Хороший стандарт для большинства стран. В США — минимум.';
    }
    else {
        _recommendation = 'Щедрые чаевые. Отличный способ отблагодарить за превосходный сервис.';
    }
    return [
        { value: Math.round(tipAmount), label: 'Сумма чаевых', unit: '₽' },
        { value: Math.round(totalAmount), label: 'Итого с чаевыми', unit: '₽' },
        { value: Math.round(perPerson), label: 'На человека', unit: '₽' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
  'otoplenie-radiatory': (inputs) => {
    const area = Number(inputs.area);
    const height = Number(inputs.ceilingHeight);
    const heatLoss = Number(inputs.heatLoss);
    const volume = area * height;
    const requiredPower = volume * 40 * heatLoss;
    const sectionPower = 150;
    const sections = Math.ceil(requiredPower / sectionPower);
    return [
        { value: Math.round(requiredPower), label: 'Требуемая мощность', unit: 'Вт' },
        { value: sections, label: 'Количество секций' }
    ];
},
  'outfit-cost-calculator': (inputs): any => {
    const topPrice = Number(inputs.topPrice);
    const bottomPrice = Number(inputs.bottomPrice);
    const shoesPrice = Number(inputs.shoesPrice);
    const accessoriesPrice = Number(inputs.accessoriesPrice);
    const expectedWears = Number(inputs.expectedWears);
    const totalCost = topPrice + bottomPrice + shoesPrice + accessoriesPrice;
    const costPerWear = Math.round(totalCost / expectedWears);
    let category;
    if (totalCost < 5000) {
        category = 'Бюджетный 💚';
    }
    else if (totalCost < 15000) {
        category = 'Средний 💛';
    }
    else if (totalCost < 50000) {
        category = 'Премиум 🧡';
    }
    else {
        category = 'Люкс ❤️';
    }
    return [
        { value: totalCost, label: 'Общая стоимость', unit: '₽' },
        { value: costPerWear, label: 'Цена за носку', unit: '₽' },
        { value: category, label: 'Категория', unit: '' }
    ];
},
  'oven-temp-converter': (inputs): any => {
    const tempValue = Number(inputs.temp);
    const fromScale = String(inputs.fromScale);
    let celsius;
    if (fromScale === 'c')
        celsius = tempValue;
    else if (fromScale === 'f')
        celsius = (tempValue - 32) * 5 / 9;
    else
        celsius = tempValue * 25; // приближение для газовых марок
    const fahrenheit = celsius * 9 / 5 + 32;
    return [
        { value: Math.round(celsius), label: '°C', unit: '°C' },
        { value: Math.round(fahrenheit), label: '°F', unit: '°F' }
    ];
},
  'pereezd-kalkulyator': (inputs) => {
    const rooms = Number(inputs.rooms) || 2;
    const extraItems = String(inputs.extraItems);
    const distance = Number(inputs.distance) || 0;
    const baseVolumes: Record<number, number> = {
        1: 8,
        2: 15,
        3: 25,
        4: 35,
        5: 50
    };
    let volume = baseVolumes[Math.min(rooms, 5)] || 15;
    const extraVolumes: Record<string, number> = {
        none: 0,
        fridge: 2,
        furniture: 5,
        all: 10
    };
    volume += extraVolumes[extraItems] || 0;
    const gazelCount = Math.ceil(volume / 9);
    const truckCount = Math.ceil(volume / 20);
    const estimatedCost = Math.round(volume * 1500 + distance * 30);
    let _recommendation = '';
    if (volume <= 9) {
        _recommendation = 'Достаточно одной газели. Закажите 2 грузчиков.';
    }
    else if (volume <= 18) {
        _recommendation = 'Лучше 2 газели или 1 фургон. 2–3 грузчика.';
    }
    else {
        _recommendation = 'Рекомендуем фургон. Минимум 3 грузчика. Возможно 2 рейса.';
    }
    return [
        { value: volume, label: 'Объём вещей', unit: 'м³' },
        { value: gazelCount, label: 'Газелей (1,5 т, 9 м³)', unit: 'шт' },
        { value: truckCount, label: 'Фургонов (5 т, 20 м³)', unit: 'шт' },
        { value: estimatedCost, label: 'Примерная стоимость', unit: '₽' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
  'pitanie-vo-vremya-trenirovki': (inputs) => {
    const duration = Number(inputs.duration);
    const intensity = String(inputs.intensity);
    const weight = Number(inputs.weight);
    let carbsPerHour = 0;
    if (intensity === 'low')
        carbsPerHour = 20;
    else if (intensity === 'moderate')
        carbsPerHour = 40;
    else
        carbsPerHour = 60;
    const totalCarbs = (duration / 60) * carbsPerHour;
    const gels = Math.ceil(totalCarbs / 25);
    let timing = '';
    if (duration < 60)
        timing = 'Не нужно';
    else if (duration < 90)
        timing = 'С 45-й минуты';
    else
        timing = 'С 30-й минуты, каждые 20-30 мин';
    return [
        { value: Math.round(totalCarbs), label: 'Углеводов нужно', unit: 'г' },
        { value: carbsPerHour, label: 'В час', unit: 'г/ч' },
        { value: gels, label: 'Эквивалент гелей', unit: 'шт' },
        { value: timing, label: 'Когда принимать' }
    ];
},
  'plitka-steny': (inputs) => {
    const perimeter = Number(inputs.perimeter);
    const height = Number(inputs.height);
    const doorArea = Number(inputs.doorArea);
    const tileW = Number(inputs.tileWidth) / 100;
    const tileH = Number(inputs.tileHeight) / 100;
    const totalArea = perimeter * height - doorArea;
    const tileArea = tileW * tileH;
    const tilesCount = Math.ceil(totalArea / tileArea);
    const tilesWithWaste = Math.ceil(tilesCount * 1.1);
    return [
        { value: Math.round(totalArea * 100) / 100, label: 'Площадь облицовки', unit: 'м²' },
        { value: tilesCount, label: 'Количество плитки' },
        { value: tilesWithWaste, label: 'С запасом 10%' }
    ];
},
  'ploshchad-dlya-pitomca': (inputs) => {
    const petType = String(inputs.petType);
    const livingSpace = Number(inputs.livingSpace);
    const outdoorAccess = String(inputs.outdoorAccess);
    if (!livingSpace) {
        return [
            { value: '—', label: 'Оценка пространства' },
            { value: '', label: 'Рекомендации' },
            { value: '—', label: 'Минимум (м²)' }
        ];
    }
    const minSpaceReq: Record<string, number> = {
        cat: 15,
        dog_small: 20,
        dog_medium: 40,
        dog_large: 60,
        bird: 5,
        rodent: 2
    };
    const minSpace = minSpaceReq[petType] || 20;
    let spaceRating = '';
    let recommendations = '';
    if (livingSpace < minSpace * 0.8) {
        spaceRating = '❌ Недостаточно';
        recommendations = 'Критически мало места. Рассмотрите другой вариант питомца или увеличение пространства.';
    }
    else if (livingSpace < minSpace) {
        spaceRating = '⚠️ Тесновато';
        recommendations = 'Минимум для выживания. Нужны частые прогулки и активное использование вертикального пространства.';
    }
    else if (livingSpace < minSpace * 1.5) {
        spaceRating = '✅ Приемлемо';
        recommendations = 'Достаточно места при регулярной активности вне дома.';
    }
    else {
        spaceRating = '🌟 Отлично';
        recommendations = 'Просторное жильё позволяет питомцу чувствовать себя комфортно.';
    }
    if (outdoorAccess === 'yes' && (petType.includes('dog') || petType === 'cat')) {
        recommendations += ' Доступ на балкон/улицу компенсирует ограниченное пространство.';
    }
    return [
        { value: spaceRating, label: 'Оценка пространства' },
        { value: recommendations, label: 'Рекомендации' },
        { value: minSpace, label: 'Минимум (м²)' }
    ];
},
  'podseti-ip': (inputs) => {
    const ipAddress = String(inputs.ipAddress);
    const cidr = Number(inputs.cidr);
    const ipParts = ipAddress.split('.').map(Number);
    if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return [
            { value: 'Некорректный IP', label: 'Сетевой адрес' },
            { value: '—', label: 'Маска подсети' },
            { value: '—', label: 'Broadcast' },
            { value: '—', label: 'Первый хост' },
            { value: '—', label: 'Последний хост' },
            { value: '—', label: 'Всего хостов', unit: 'шт' },
            { value: '—', label: 'Используемых', unit: 'шт' }
        ];
    }
    const maskInt = 0xFFFFFFFF << (32 - cidr);
    const maskParts = [
        (maskInt >>> 24) & 0xFF,
        (maskInt >>> 16) & 0xFF,
        (maskInt >>> 8) & 0xFF,
        maskInt & 0xFF
    ];
    const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
    const networkInt = ipInt & maskInt;
    const networkParts = [
        (networkInt >>> 24) & 0xFF,
        (networkInt >>> 16) & 0xFF,
        (networkInt >>> 8) & 0xFF,
        networkInt & 0xFF
    ];
    const broadcastInt = networkInt | (~maskInt & 0xFFFFFFFF);
    const broadcastParts = [
        (broadcastInt >>> 24) & 0xFF,
        (broadcastInt >>> 16) & 0xFF,
        (broadcastInt >>> 8) & 0xFF,
        broadcastInt & 0xFF
    ];
    const firstHostInt = networkInt + 1;
    const lastHostInt = broadcastInt - 1;
    const firstHostParts = [
        (firstHostInt >>> 24) & 0xFF,
        (firstHostInt >>> 16) & 0xFF,
        (firstHostInt >>> 8) & 0xFF,
        firstHostInt & 0xFF
    ];
    const lastHostParts = [
        (lastHostInt >>> 24) & 0xFF,
        (lastHostInt >>> 16) & 0xFF,
        (lastHostInt >>> 8) & 0xFF,
        lastHostInt & 0xFF
    ];
    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = Math.max(0, totalHosts - 2);
    return [
        { value: networkParts.join('.'), label: 'Сетевой адрес' },
        { value: maskParts.join('.'), label: 'Маска подсети' },
        { value: broadcastParts.join('.'), label: 'Broadcast' },
        { value: firstHostParts.join('.'), label: 'Первый хост' },
        { value: lastHostParts.join('.'), label: 'Последний хост' },
        { value: totalHosts, label: 'Всего хостов', unit: 'шт' },
        { value: usableHosts, label: 'Используемых', unit: 'шт' }
    ];
},
  'procentov-ot-chisla': (inputs) => {
    const percent = Number(inputs.percent) || 0;
    const number = Number(inputs.number) || 0;
    const result = (percent * number) / 100;
    return [
        { value: result, label: 'Результат' },
        { value: `${percent}% от ${number} = ${result}`, label: 'Формула' },
    ];
},
  'prognoz-marafona': (inputs) => {
    const dist = Number(inputs.raceDistance);
    const hours = Number(inputs.hours);
    const minutes = Number(inputs.minutes);
    const seconds = Number(inputs.seconds);
    const experience = String(inputs.experience);
    const timeSeconds = hours * 3600 + minutes * 60 + seconds;
    const RiegelTime = timeSeconds * Math.pow(42.195 / dist, 1.06);
    let adjustment = 1.05;
    if (experience === 'some')
        adjustment = 1.0;
    else if (experience === 'experienced')
        adjustment = 0.98;
    const predicted = RiegelTime * adjustment;
    const pacePerKm = predicted / 42.195;
    const pMin = Math.floor(pacePerKm / 60);
    const pSec = Math.round(pacePerKm % 60);
    const predHours = Math.floor(predicted / 3600);
    const predMin = Math.floor((predicted % 3600) / 60);
    const _rangeMin = predicted * 0.95;
    const _rangeMax = predicted * 1.05;
    return [
        { value: `${predHours}:${predMin.toString().padStart(2, '0')}`, label: 'Прогноз марафона' },
        { value: `${pMin}:${pSec.toString().padStart(2, '0')}`, label: 'Темп марафона' },
        { value: `±5% от прогноза`, label: 'Возможный диапазон' }
    ];
},
  'puls-zony-karvonen': (inputs) => {
    const maxHR = Number(inputs.maxHR);
    const restHR = Number(inputs.restHR);
    const hrr = maxHR - restHR;
    const z1 = `${restHR + Math.round(hrr * 0.5)} - ${restHR + Math.round(hrr * 0.6)}`;
    const z2 = `${restHR + Math.round(hrr * 0.6)} - ${restHR + Math.round(hrr * 0.7)}`;
    const z3 = `${restHR + Math.round(hrr * 0.7)} - ${restHR + Math.round(hrr * 0.8)}`;
    const z4 = `${restHR + Math.round(hrr * 0.8)} - ${restHR + Math.round(hrr * 0.9)}`;
    const z5 = `${restHR + Math.round(hrr * 0.9)} - ${maxHR}`;
    return [
        { value: hrr, label: 'HRR (резерв)', unit: 'уд/мин' },
        { value: z1, label: 'Зона 1 (50-60%)' },
        { value: z2, label: 'Зона 2 (60-70%)' },
        { value: z3, label: 'Зона 3 (70-80%)' },
        { value: z4, label: 'Зона 4 (80-90%)' },
        { value: z5, label: 'Зона 5 (90-100%)' }
    ];
},
}
