import type { ComputeFn } from './compute-helpers';

export const computeMap_construction_a_1: Record<string, ComputeFn> = {
  'fundament': (inputs) => {
    const perimeter = Number(inputs.perimeter);
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const reinforcement = String(inputs.reinforcement);
    const concrete = perimeter * width * height;
    const bars = parseInt(reinforcement.split('x')[0]);
    const diameter = parseInt(reinforcement.split('x')[1]);
    const rebarLength = perimeter * bars;
    // Weight per meter (kg/m) for round steel: 0.00617 × d²
    const weightPerMeter = 0.00617 * diameter * diameter;
    const rebarWeight = rebarLength * weightPerMeter;
    return [
        { value: Math.round(concrete * 100) / 100, label: 'Бетона М200-М400', unit: 'м³' },
        { value: Math.round(rebarLength), label: 'Продольной арматуры', unit: 'п.м.' },
        { value: Math.round(rebarWeight), label: 'Вес арматуры', unit: 'кг' }
    ];
},
  'gruntovka': (inputs) => {
    const area = Number(inputs.area);
    const surfaceType = String(inputs.surfaceType);
    const primerType = String(inputs.primerType);
    const surfaceConsumption: Record<string, number> = {
        'concrete': 225,
        'plaster': 175,
        'drywall': 125,
        'wood': 275
    };
    const primerMultiplier: Record<string, number> = {
        'deep': 1.0,
        'universal': 1.1,
        'acrylic': 0.9
    };
    const baseConsumption = surfaceConsumption[surfaceType];
    const multiplier = primerMultiplier[primerType];
    const consumption = area * baseConsumption * multiplier;
    const withReserve = consumption * 1.1;
    const liters = withReserve / 1000; // Convert grams to liters (approx density ~1 kg/l)
    const cans = Math.ceil(liters / 5);
    return [
        { value: Math.round(withReserve), label: 'Необходимо грунтовки', unit: 'г' },
        { value: Math.round(liters * 10) / 10, label: 'Объём с запасом', unit: 'л' },
        { value: cans, label: 'Банок по 5 л', unit: 'шт.' }
    ];
},
  'kalkulyator-betona': (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const shrinkage = Number(inputs.shrinkage) / 100;
    if (!length || !width || !height) {
        return [{ value: '—', label: 'Результат' }];
    }
    const volume = length * width * height * (1 + shrinkage);
    const cement = Math.round(volume * 350);
    const sand = Math.round(volume * 850);
    const gravel = Math.round(volume * 1050);
    const water = Math.round(volume * 180);
    return [
        { value: volume.toFixed(2), label: 'Объём бетона', unit: 'м³' },
        { value: `Цемент: ${cement} кг, Песок: ${sand} кг, Щебень: ${gravel} кг, Вода: ${water} л`, label: 'Состав М300', unit: '' }
    ];
},
  'kalkulyator-elektriki': (inputs) => {
    const power = Number(inputs.power);
    const voltage = Number(inputs.voltage);
    const cableType = String(inputs.cableType);
    const installationType = String(inputs.installationType);
    if (!power) {
        return [{ value: '—', label: 'Результат' }];
    }
    // Расчёт тока: I = P / (U × cosφ), где cosφ ≈ 0.95 для бытовых нагрузок
    let current = 0;
    if (voltage === 220) {
        current = power / (220 * 0.95);
    }
    else {
        current = power / (1.732 * 380 * 0.95);
    }
    // Медь: 10А на мм² для открытой проводки, 8А для закрытой
    // Алюминий: 8А на мм² для открытой, 6А для закрытой
    let ampacity = cableType === 'copper' ? 10 : 8;
    if (installationType !== 'open') {
        ampacity = cableType === 'copper' ? 8 : 6;
    }
    let cableSection = current / ampacity;
    const standardSections = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];
    for (const section of standardSections) {
        if (cableSection <= section) {
            cableSection = section;
            break;
        }
    }
    // Номинал автомата (округляем до ближайшего стандартного)
    const standardBreakers = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];
    let breakerRating = current * 1.25; // Запас 25%
    for (const rating of standardBreakers) {
        if (breakerRating <= rating) {
            breakerRating = rating;
            break;
        }
    }
    let rcdRating = '';
    if (power <= 3000) {
        rcdRating = 'УЗО 25А, 30мА (тип А)';
    }
    else if (power <= 5000) {
        rcdRating = 'УЗО 40А, 30мА (тип А)';
    }
    else {
        rcdRating = 'УЗО 63А, 30мА (тип А)';
    }
    return [
        { value: current.toFixed(1), label: 'Ток нагрузки', unit: 'А' },
        { value: cableSection.toString(), label: 'Сечение кабеля', unit: 'мм²' },
        { value: breakerRating.toString(), label: 'Номинал автомата', unit: 'А' },
        { value: rcdRating, label: 'УЗО (если нужно)', unit: '' }
    ];
},
  'kalkulyator-fundamenta': (inputs) => {
    const foundationType = String(inputs.foundationType);
    const housePerimeter = Number(inputs.housePerimeter);
    const slabArea = Number(inputs.slabArea);
    const columnCount = Number(inputs.columnCount);
    const foundationWidth = Number(inputs.foundationWidth);
    const foundationDepth = Number(inputs.foundationDepth);
    const widthM = foundationWidth / 100;
    const depthM = foundationDepth / 100;
    let concreteVolume = 0;
    let reinforcementEstimate = 0;
    if (foundationType === 'strip') {
        if (!housePerimeter) {
            return [{ value: '—', label: 'Результат' }];
        }
        concreteVolume = housePerimeter * widthM * depthM;
        reinforcementEstimate = concreteVolume * 80;
    }
    else if (foundationType === 'slab') {
        if (!slabArea) {
            return [{ value: '—', label: 'Результат' }];
        }
        concreteVolume = slabArea * depthM;
        reinforcementEstimate = concreteVolume * 100;
    }
    else if (foundationType === 'column') {
        // Столбчатый: количество × площадь сечения × высота
        if (!columnCount) {
            return [{ value: '—', label: 'Результат' }];
        }
        const columnSection = widthM * widthM; // квадратное сечение
        concreteVolume = columnCount * columnSection * depthM;
        reinforcementEstimate = concreteVolume * 50;
    }
    const mixerTrips = Math.ceil(concreteVolume / 6); // миксер обычно 6 м³
    const priceEstimate = concreteVolume * 4500; // ~4500₽ за м³
    return [
        { value: concreteVolume.toFixed(2), label: 'Объём бетона', unit: 'м³' },
        { value: mixerTrips.toString(), label: 'Рейсов миксера (6 м³)', unit: 'рейсов' },
        { value: priceEstimate.toFixed(0), label: 'Примерная стоимость бетона', unit: '₽' },
        { value: reinforcementEstimate.toFixed(1), label: 'Арматура (приблизительно)', unit: 'кг' }
    ];
},
  'kalkulyator-gipsokartona': (inputs) => {
    const wallLength = Number(inputs.wallLength);
    const wallHeight = Number(inputs.wallHeight);
    const ceilingArea = Number(inputs.ceilingArea);
    const sheetSize = Number(inputs.sheetSize);
    const reserve = Number(inputs.reserve) / 100;
    const wallArea = wallLength * wallHeight;
    const totalArea = wallArea + ceilingArea;
    const sheetsNeeded = Math.ceil((totalArea / sheetSize) * (1 + reserve));
    return [
        { value: totalArea.toFixed(2), label: 'Общая площадь', unit: 'м²' },
        { value: sheetsNeeded.toString(), label: 'Листов нужно', unit: 'шт' }
    ];
},
  'kalkulyator-kirpicha': (inputs) => {
    const length = Number(inputs.length);
    const height = Number(inputs.height);
    const thickness = Number(inputs.thickness);
    const joint = Number(inputs.joint) / 1000;
    const brickType = String(inputs.brickType);
    if (!length || !height) {
        return [{ value: '—', label: 'Результат' }];
    }
    const wallArea = length * height;
    const wallVolume = wallArea * thickness;
    const [bLength, bWidth, bHeight] = brickType.split('x').map(Number);
    const brickVolume = (bLength / 1000 + joint) * (bWidth / 1000 + joint) * (bHeight / 1000 + joint);
    const brickCount = Math.ceil(wallVolume / brickVolume);
    return [
        { value: wallArea.toFixed(2), label: 'Площадь стены', unit: 'м²' },
        { value: brickCount.toString(), label: 'Количество кирпича', unit: 'шт' }
    ];
},
  'kalkulyator-kraski': (inputs) => {
    const wallArea = Number(inputs.wallArea);
    const coats = Number(inputs.coats);
    const consumption = Number(inputs.consumption);
    const canVolume = Number(inputs.canVolume);
    if (!wallArea || !coats || !consumption || !canVolume) {
        return [{ value: '—', label: 'Результат' }];
    }
    const totalPaint = wallArea * consumption * coats;
    const cansNeeded = Math.ceil(totalPaint / canVolume);
    return [
        { value: totalPaint.toFixed(2), label: 'Всего краски', unit: 'л' },
        { value: cansNeeded.toString(), label: 'Банок нужно', unit: 'шт' }
    ];
},
  'kalkulyator-krovli': (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const slope = Number(inputs.slope);
    const sheetWidth = Number(inputs.sheetWidth);
    const reserve = Number(inputs.reserve) / 100;
    if (!length || !width || !slope || !sheetWidth) {
        return [{ value: '—', label: 'Результат' }];
    }
    const slopeRadians = (slope * Math.PI) / 180;
    const roofArea = (length * width) / Math.cos(slopeRadians) * (1 + reserve);
    const sheetsNeeded = Math.ceil(roofArea / (sheetWidth * length));
    return [
        { value: roofArea.toFixed(2), label: 'Площадь крыши', unit: 'м²' },
        { value: sheetsNeeded.toString(), label: 'Листов нужно', unit: 'шт' }
    ];
},
  'kalkulyator-kubatury-brevna': (inputs) => {
    const diameter = Number(inputs.diameter) / 100; // convert to meters
    const length = Number(inputs.length);
    const quantity = Number(inputs.quantity);
    if (!diameter || !length || !quantity) {
        return [{ value: '—', label: 'Результат' }];
    }
    const radius = diameter / 2;
    const singleVolume = Math.PI * radius * radius * length;
    const totalVolume = singleVolume * quantity;
    return [
        { value: singleVolume.toFixed(3), label: 'Объём одного бревна', unit: 'м³' },
        { value: totalVolume.toFixed(3), label: 'Общий объём', unit: 'м³' }
    ];
},
  'kalkulyator-kubatury-doski': (inputs) => {
    const thickness = Number(inputs.thickness) / 1000;
    const width = Number(inputs.width) / 1000;
    const length = Number(inputs.length);
    if (!thickness || !width || !length) {
        return [{ value: '—', label: 'Результат' }];
    }
    const volume = thickness * width * length;
    const boardsInCube = Math.floor(1 / volume);
    const pricePerBoard = 10000 / boardsInCube; // Assuming 10000 per cubic meter
    return [
        { value: volume.toFixed(5), label: 'Объём одной доски', unit: 'м³' },
        { value: boardsInCube.toString(), label: 'Досок в кубе', unit: 'шт' },
        { value: `При цене 10000₽/м³: ~${Math.round(pricePerBoard)}₽ за доску`, label: 'Цена за доску', unit: '' }
    ];
},
  'kalkulyator-laminata': (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const plankLength = Number(inputs.plankLength);
    const plankWidth = Number(inputs.plankWidth);
    const packSize = Number(inputs.packSize);
    const reserve = Number(inputs.reserve) / 100;
    if (!length || !width || !plankLength || !plankWidth || !packSize) {
        return [{ value: '—', label: 'Результат' }];
    }
    const area = length * width;
    const plankArea = plankLength * plankWidth;
    const planksNeeded = Math.ceil((area / plankArea) * (1 + reserve));
    const packsNeeded = Math.ceil(planksNeeded / packSize);
    return [
        { value: area.toFixed(2), label: 'Площадь пола', unit: 'м²' },
        { value: planksNeeded.toString(), label: 'Досок нужно', unit: 'шт' },
        { value: packsNeeded.toString(), label: 'Упаковок нужно', unit: 'шт' }
    ];
},
  'kalkulyator-oboev': (inputs) => {
    const perimeter = Number(inputs.perimeter);
    const height = Number(inputs.height);
    const wallpaperWidth = Number(inputs.wallpaperWidth);
    const wallpaperLength = Number(inputs.wallpaperLength);
    const patternRepeat = Number(inputs.patternRepeat);
    if (!perimeter || !height || !wallpaperWidth || !wallpaperLength) {
        return [{ value: '—', label: 'Результат' }];
    }
    const stripsNeeded = Math.ceil(perimeter / wallpaperWidth);
    let stripLength = height + 0.1; // +10cm for trimming
    if (patternRepeat > 0) {
        stripLength = Math.ceil((height + 0.1) / patternRepeat) * patternRepeat;
    }
    const stripsPerRoll = Math.floor(wallpaperLength / stripLength);
    const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
    return [
        { value: stripsNeeded.toString(), label: 'Полос нужно', unit: 'шт' },
        { value: rollsNeeded.toString(), label: 'Рулонов нужно', unit: 'шт' }
    ];
},
  'kalkulyator-pilomaterialov': (inputs) => {
    const thickness = Number(inputs.thickness) / 1000;
    const width = Number(inputs.width) / 1000;
    const length = Number(inputs.length);
    const quantity = Number(inputs.quantity);
    if (!thickness || !width || !length || !quantity) {
        return [{ value: '—', label: 'Результат' }];
    }
    const volume = thickness * width * length;
    const totalVolume = volume * quantity;
    const area = width * length * quantity;
    return [
        { value: volume.toFixed(4), label: 'Объём одной доски', unit: 'м³' },
        { value: totalVolume.toFixed(3), label: 'Общий объём', unit: 'м³' },
        { value: area.toFixed(2), label: 'Площадь покрытия', unit: 'м²' }
    ];
},
  'kalkulyator-plitki': (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const tileLength = Number(inputs.tileLength) / 100;
    const tileWidth = Number(inputs.tileWidth) / 100;
    const reserve = Number(inputs.reserve) / 100;
    if (!length || !width || !tileLength || !tileWidth) {
        return [{ value: '—', label: 'Результат' }];
    }
    const area = length * width;
    const tileArea = tileLength * tileWidth;
    const tileCount = Math.ceil((area / tileArea) * (1 + reserve));
    const totalTileArea = tileCount * tileArea;
    return [
        { value: area.toFixed(2), label: 'Площадь помещения', unit: 'м²' },
        { value: tileCount.toString(), label: 'Количество плитки', unit: 'шт' },
        { value: totalTileArea.toFixed(2), label: 'Площадь плитки с запасом', unit: 'м²' }
    ];
},
  'kalkulyator-shtukaturki': (inputs) => {
    const wallArea = Number(inputs.wallArea);
    const layerThickness = Number(inputs.layerThickness);
    const materialType = String(inputs.materialType);
    const bagSize = Number(inputs.bagSize);
    if (!wallArea || !layerThickness) {
        return [{ value: '—', label: 'Результат' }];
    }
    const densities: Record<string, number> = {
        'cement': 1900,
        'gypsum': 1000,
        'lime': 1700,
        'polymer': 1400
    };
    const density = densities[materialType] || 1000;
    const thicknessM = layerThickness / 1000; // перевод в метры
    const volume = wallArea * thicknessM; // м³
    const weight = volume * density; // кг
    const bagsCount = Math.ceil(weight / bagSize);
    // Примерная стоимость (для гипсовой штукатурки ~400₽/мешок 30кг)
    const pricePerBag = materialType === 'gypsum' ? 450 : materialType === 'cement' ? 350 : 400;
    const priceEstimate = bagsCount * pricePerBag;
    return [
        { value: volume.toFixed(3), label: 'Объём штукатурки', unit: 'м³' },
        { value: weight.toFixed(1), label: 'Масса смеси', unit: 'кг' },
        { value: bagsCount.toString(), label: 'Количество мешков', unit: 'шт' },
        { value: priceEstimate.toFixed(0), label: 'Примерная стоимость', unit: '₽' }
    ];
},
  'kalkulyator-styazhki-pola': (inputs) => {
    const floorArea = Number(inputs.floorArea);
    const screedThickness = Number(inputs.screedThickness);
    const _cementGrade = String(inputs.cementGrade);
    const mixRatio = String(inputs.mixRatio);
    if (!floorArea || !screedThickness) {
        return [{ value: '—', label: 'Результат' }];
    }
    const thicknessM = screedThickness / 1000;
    const volume = floorArea * thicknessM;
    const mixDensity = 2100;
    const totalWeight = volume * mixDensity;
    let cementRatio = 1;
    let sandRatio = 3;
    if (mixRatio === '1_4') {
        sandRatio = 4;
    }
    const totalParts = cementRatio + sandRatio;
    const cementWeight = (totalWeight * cementRatio) / totalParts;
    const sandWeight = (totalWeight * sandRatio) / totalParts;
    const sandDensity = 1600;
    const sandVolume = sandWeight / sandDensity;
    const waterVolume = cementWeight * 0.5;
    const cementBags = Math.ceil(cementWeight / 50);
    return [
        { value: volume.toFixed(3), label: 'Объём стяжки', unit: 'м³' },
        { value: cementWeight.toFixed(1), label: 'Цемент', unit: 'кг' },
        { value: sandVolume.toFixed(3), label: 'Песок', unit: 'м³' },
        { value: waterVolume.toFixed(1), label: 'Вода', unit: 'л' },
        { value: cementBags.toString(), label: 'Мешков цемента (50 кг)', unit: 'шт' }
    ];
},
}
