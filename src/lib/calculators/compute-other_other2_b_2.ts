import type { ComputeFn } from './compute-helpers';

export const computeMap_other_other2_b_2: Record<string, ComputeFn> = {
  'raid-kalkulyator': (inputs) => {
    const numDisks = Number(inputs.numDisks);
    const diskSize = Number(inputs.diskSize);
    const raidLevel = String(inputs.raidLevel);
    if (!numDisks || !diskSize) {
        return [
            { value: '—', label: 'Общая ёмкость', unit: 'GB' },
            { value: '—', label: 'Доступная ёмкость', unit: 'GB' },
            { value: '—', label: 'Избыточность' },
            { value: '—', label: 'Отказоустойчивость' },
            { value: '—', label: 'Производительность' }
        ];
    }
    const totalCapacity = numDisks * diskSize;
    let usableCapacity: number;
    let redundancy: string;
    let faultTolerance: string;
    let performance: string;
    switch (raidLevel) {
        case '0':
            usableCapacity = totalCapacity;
            redundancy = 'Нет (0%)';
            faultTolerance = '0 дисков (любой отказ = потеря данных)';
            performance = 'Отличная (N× чтение, N× запись)';
            break;
        case '1':
            usableCapacity = diskSize; // Only one disk worth
            redundancy = '100% (все диски — копии)';
            faultTolerance = `${numDisks - 1} дисков (может выжить любой ${numDisks - 1})`;
            performance = 'Хорошая чтение, средняя запись';
            break;
        case '5':
            usableCapacity = (numDisks - 1) * diskSize;
            redundancy = `${(1 / numDisks * 100).toFixed(1)}% (1 диск)`;
            faultTolerance = '1 диск (может потерять любой 1)';
            performance = 'Хорошая чтение, медленная запись (паритет)';
            break;
        case '6':
            usableCapacity = (numDisks - 2) * diskSize;
            redundancy = `${(2 / numDisks * 100).toFixed(1)}% (2 диска)`;
            faultTolerance = '2 диска (может потерять любые 2)';
            performance = 'Хорошая чтение, медленная запись (двойной паритет)';
            break;
        case '10':
            usableCapacity = (numDisks / 2) * diskSize;
            redundancy = '50% (зеркалирование пар)';
            faultTolerance = '1+ дисков (может потерять 1 из каждой пары)';
            performance = 'Отличная (чтение и запись)';
            break;
        default:
            usableCapacity = totalCapacity;
            redundancy = 'Нет';
            faultTolerance = '0';
            performance = 'Обычная';
    }
    return [
        { value: totalCapacity, label: 'Общая ёмкость', unit: 'GB' },
        { value: usableCapacity, label: 'Доступная ёмкость', unit: 'GB' },
        { value: redundancy, label: 'Избыточность' },
        { value: faultTolerance, label: 'Отказоустойчивость' },
        { value: performance, label: 'Производительность' }
    ];
},
  'raschet-bagazha': (inputs) => {
    const weight = Number(inputs.weight);
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const airline = String(inputs.airline);
    if (!weight || !length || !width || !height) {
        return [
            { value: '—', label: 'Линейный размер', unit: 'см' },
            { value: '—', label: 'Статус проверки' },
            { value: '—', label: 'Макс. вес для класса', unit: 'кг' },
            { value: '—', label: 'Макс. линейный размер', unit: 'см' },
            { value: '—', label: 'Рекомендация' }
        ];
    }
    const linearSize = length + width + height;
    const restrictions: Record<string, {
        weight: number;
        linear: number;
    }> = {
        'economy': { weight: 23, linear: 158 },
        'business': { weight: 32, linear: 158 },
        'budget': { weight: 20, linear: 158 },
        'hand': { weight: 10, linear: 115 }
    };
    const limits = restrictions[airline];
    let status: string;
    let advice: string;
    if (weight <= limits.weight && linearSize <= limits.linear) {
        status = '✓ Принимается';
        advice = 'Ваш багаж соответствует требованиям. Учтите, что при перелётах с пересадками могут быть другие правила.';
    }
    else if (weight > limits.weight && linearSize > limits.linear) {
        status = '✗ Превышен вес и размер';
        advice = `Багаж превышает ограничения. Ожидайте доплату за превышение веса и/или негабарит.`;
    }
    else if (weight > limits.weight) {
        status = '✗ Превышен вес';
        advice = `Вес превышен на ${Math.round(weight - limits.weight)} кг. Обычно доплата 50-100€ за каждые лишние кг.`;
    }
    else {
        status = '✗ Превышен размер';
        advice = `Линейный размер превышен на ${linearSize - limits.linear} см. Может считаться негабаритом.`;
    }
    return [
        { value: linearSize, label: 'Линейный размер', unit: 'см' },
        { value: status, label: 'Статус проверки' },
        { value: limits.weight, label: 'Макс. вес для класса', unit: 'кг' },
        { value: limits.linear, label: 'Макс. линейный размер', unit: 'см' },
        { value: advice, label: 'Рекомендация' }
    ];
},
  'rashod-topliva': (inputs) => {
    const distance = Number(inputs.distance);
    const fuelUsed = Number(inputs.fuelUsed);
    const fuelPrice = Number(inputs.fuelPrice);
    if (!distance || !fuelUsed) {
        return [{ value: '—', label: 'Результат' }];
    }
    const consumption100 = (fuelUsed / distance) * 100;
    const mpg = 235.215 / consumption100; // Конвертация л/100км в MPG
    const costPerKm = (fuelUsed * fuelPrice) / distance;
    const costPer100km = consumption100 * fuelPrice;
    return [
        { value: consumption100.toFixed(2), label: 'Расход на 100 км', unit: 'л/100км' },
        { value: mpg.toFixed(2), label: 'Мили на галлон', unit: 'MPG' },
        { value: costPerKm.toFixed(2), label: 'Стоимость на 1 км', unit: '₽' },
        { value: costPer100km.toFixed(2), label: 'Стоимость на 100 км', unit: '₽' }
    ];
},
  'rassol-sol': (inputs) => {
    const totalWeight = Number(inputs.totalWeight) || 0;
    const salinity = Number(inputs.salinity) || 0;
    if (!totalWeight || !salinity) {
        return [
            { value: '—', label: 'Соли нужно', unit: 'г' },
            { value: '—', label: 'Воды нужно', unit: 'мл' },
            { value: '—', label: 'На 1 литр рассола' },
            { value: '—', label: 'Применение' }
        ];
    }
    const saltNeeded = (totalWeight * salinity) / 100;
    const waterNeeded = totalWeight - saltNeeded;
    let usage = '';
    if (salinity < 2)
        usage = 'Очень слабый рассол — для овощей, быстрых маринадов';
    else if (salinity < 4)
        usage = 'Слабый рассол — для огурцов на зиму, капусты';
    else if (salinity < 6)
        usage = 'Средний рассол — для помидоров, грибов';
    else if (salinity < 8)
        usage = 'Крепкий рассол — для рыбы, сала, мяса';
    else
        usage = 'Очень крепкий — для долгого хранения';
    return [
        { value: Number(saltNeeded.toFixed(1)), label: 'Соли нужно', unit: 'г' },
        { value: Number(waterNeeded.toFixed(1)), label: 'Воды нужно', unit: 'мл' },
        { value: `${(saltNeeded / totalWeight * 1000).toFixed(1)} г соли на 1 л`, label: 'На 1 литр рассола' },
        { value: usage, label: 'Применение' }
    ];
},
  'rastamozhka-avto': (inputs) => {
    const carPrice = Number(inputs.carPrice);
    const engineVolume = Number(inputs.engineVolume);
    const engineType = String(inputs.engineType);
    const carAge = Number(inputs.carAge);
    if (!carPrice || !engineVolume) {
        return [{ value: '—', label: 'Результат' }];
    }
    let customsDuty = carPrice * 0.25; // ~25%
    if (carAge > 3 && carAge <= 5)
        customsDuty = carPrice * 0.35;
    if (carAge > 5)
        customsDuty = carPrice * 0.5;
    let exciseRate = 0.5; // Бензин до 3 лет
    if (engineType === 'diesel')
        exciseRate = 0.8;
    if (engineType === 'electric')
        exciseRate = 0;
    if (carAge > 3)
        exciseRate *= 1.5;
    const exciseTax = engineVolume * exciseRate;
    const vatBase = carPrice + customsDuty + exciseTax;
    const vat = vatBase * 0.20;
    let utilizationBase = 20000; // Руб, конвертируем условно
    if (engineType === 'electric')
        utilizationBase = 0;
    const utilizationFee = utilizationBase / 90; // Конвертация в € (примерно)
    const total = customsDuty + exciseTax + vat + utilizationFee;
    const totalPercent = (total / carPrice) * 100;
    return [
        { value: customsDuty.toFixed(2), label: 'Таможенная пошлина', unit: '€' },
        { value: exciseTax.toFixed(2), label: 'Акциз', unit: '€' },
        { value: vat.toFixed(2), label: 'НДС', unit: '€' },
        { value: utilizationFee.toFixed(2), label: 'Утилизационный сбор', unit: '€' },
        { value: total.toFixed(2), label: 'Итого растаможка', unit: '€' },
        { value: totalPercent.toFixed(1), label: '% от стоимости', unit: '%' }
    ];
},
  'raznica-v-procentah': (inputs) => {
    const firstVal = Number(inputs.value1) || 0;
    const secondVal = Number(inputs.value2) || 0;
    if (firstVal === 0)
        return [{ value: '—', label: 'Разница' }];
    const result = (Math.abs(secondVal - firstVal) * 100) / firstVal;
    return [
        { value: result.toFixed(2), label: 'Разница' },
        { value: `Разница: |${secondVal} − ${firstVal}| / ${firstVal} = ${result.toFixed(2)}%`, label: 'Формула' },
    ];
},
  'sales-calendar': (inputs): any => {
    const n = inputs as Record<string, number>;
    const salesData: Record<string, {
        best: string;
        discount: string;
    }> = {
        clothing: {
            best: 'Январь, июль, ноябрь (чёрная пятница)',
            discount: '30-70%'
        },
        shoes: {
            best: 'Январь, июль, сентябрь',
            discount: '30-50%'
        },
        electronics: {
            best: 'Ноябрь, февраль, сентябрь',
            discount: '15-40%'
        },
        furniture: {
            best: 'Январь, июль, август',
            discount: '20-50%'
        },
        travel: {
            best: 'Январь-май (раннее бронирование), сентябрь',
            discount: '20-60%'
        },
        appliances: {
            best: 'Март, май, ноябрь',
            discount: '20-40%'
        }
    };
    const data = salesData[String(inputs.category)];
    let _recommendation;
    if (inputs.urgency === 'low') {
        _recommendation = `Подождите до лучших месяцев: ${data.best}. Сэкономите ${data.discount}`;
    }
    else if (inputs.urgency === 'medium') {
        _recommendation = 'Подождите 1-2 месяца или смотрите промокоды';
    }
    else {
        _recommendation = 'Смотрите текущие акции и кешбэк, но будьте готовы переплатить';
    }
    return [{ value: data.best, label: 'bestMonths', unit: '' }, { value: data.discount, label: 'expectedDiscount', unit: '' }];
},
  'shakhmatnye-chasy': (inputs) => {
    const mode = String(inputs.mode);
    const customMinutes = Number(inputs.customMinutes) || 30;
    const increment = Number(inputs.increment) || 0;
    const _delayType = String(inputs.delayType);
    let baseMinutes = 0;
    switch (mode) {
        case 'blitz3':
            baseMinutes = 3;
            break;
        case 'blitz5':
            baseMinutes = 5;
            break;
        case 'rapid10':
            baseMinutes = 10;
            break;
        case 'rapid15':
            baseMinutes = 15;
            break;
        case 'rapid25':
            baseMinutes = 25;
            break;
        case 'classical60':
            baseMinutes = 60;
            break;
        case 'classical90':
            baseMinutes = 90;
            break;
        case 'custom':
            baseMinutes = customMinutes;
            break;
        default: baseMinutes = 10;
    }
    const totalSeconds = baseMinutes * 60;
    const _modeName = mode === 'blitz3' || mode === 'blitz5' ? 'Блиц' :
        mode === 'rapid10' || mode === 'rapid15' || mode === 'rapid25' ? 'Рапид' :
            mode === 'classical60' || mode === 'classical90' ? 'Классика' : 'Пользовательский';
    // Estimate moves before time runs out with average 40 moves per game
    const estimatedMoves = Math.floor((totalSeconds + increment * 40) / Math.max(30, increment + totalSeconds / 40));
    // Estimated game duration in minutes (assuming 40 moves average)
    const estimatedDuration = Math.round((totalSeconds + increment * 40) / 60 * 2); // ×2 for both players
    return [
        {
            value: `${baseMinutes} мин ${increment > 0 ? '+ ' + increment + ' сек/ход' : ''}`,
            label: 'Время на партию',
            unit: ''
        },
        {
            value: estimatedMoves.toString(),
            label: 'Ходов до истечения',
            unit: 'ходов'
        },
        {
            value: `~${estimatedDuration} мин (${Math.floor(estimatedDuration / 60)}ч ${estimatedDuration % 60}мин)`,
            label: 'Длительность партии',
            unit: ''
        }
    ];
},
  'shoe-size-converter': (inputs): any => {
    const system = String(inputs.system);
    const size = Number(inputs.size);
    const gender = String(inputs.gender);
    let mm;
    if (system === 'cm') {
        mm = size * 10;
    }
    else if (system === 'ru') {
        mm = size * 6.666 + 10;
    }
    else if (system === 'eu') {
        mm = size * 6.666;
    }
    else if (system === 'us' && gender === 'women') {
        mm = (size + 31) * 6.666;
    }
    else if (system === 'us' && gender === 'men') {
        mm = (size + 33) * 6.666;
    }
    else if (system === 'uk') {
        mm = (size + 32.5) * 6.666;
    }
    else {
        mm = size * 6.666;
    }
    const ruSize = Math.round((mm - 10) / 6.666);
    const euSize = Math.round(mm / 6.666);
    const usSize = gender === 'women'
        ? Math.round(mm / 6.666 - 31)
        : Math.round(mm / 6.666 - 33);
    const ukSize = Math.round(mm / 6.666 - 32.5);
    const cmSize = Math.round(mm / 10 * 10) / 10;
    return [
        { value: ruSize, label: 'Российский', unit: '' },
        { value: euSize, label: 'Европейский', unit: '' },
        { value: usSize, label: 'Американский', unit: '' },
        { value: ukSize, label: 'Британский', unit: '' },
        { value: cmSize, label: 'Длина стопы', unit: 'см' }
    ];
},
  'shopping-budget-calculator': (inputs): any => {
    const n = inputs as Record<string, number>;
    const distribution: Record<string, {
        outerwear: number;
        tops: number;
        bottoms: number;
        shoes: number;
        accessories: number;
    }> = {
        'spring-summer': { outerwear: 0.1, tops: 0.25, bottoms: 0.25, shoes: 0.25, accessories: 0.15 },
        'autumn-winter': { outerwear: 0.3, tops: 0.2, bottoms: 0.2, shoes: 0.2, accessories: 0.1 },
        all: { outerwear: 0.2, tops: 0.25, bottoms: 0.25, shoes: 0.2, accessories: 0.1 }
    };
    const dist = distribution[String(inputs.season)];
    return [{ value: Math.round(inputs.totalBudget * dist.outerwear), label: 'outerwear', unit: '' }, { value: Math.round(inputs.totalBudget * dist.tops), label: 'tops', unit: '' }, { value: Math.round(inputs.totalBudget * dist.bottoms), label: 'bottoms', unit: '' }, { value: Math.round(inputs.totalBudget * dist.shoes), label: 'shoes', unit: '' }, { value: Math.round(inputs.totalBudget * dist.accessories), label: 'accessories', unit: '' }];
},
}
