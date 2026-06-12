import type { ComputeFn } from './compute-helpers';

export const computeMap_construction_b_1: Record<string, ComputeFn> = {
  'kirpich': (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness);
    const brickType = String(inputs.brickType);
    // Bricks per m² for different thickness (with mortar joints)
    const bricksPerM2: Record<string, Record<string, number>> = {
        'single': {
            '0.5': 51,
            '1': 102,
            '1.5': 153,
            '2': 204
        },
        'oneandhalf': {
            '0.5': 39,
            '1': 78,
            '1.5': 117,
            '2': 156
        },
        'double': {
            '0.5': 26,
            '1': 52,
            '1.5': 78,
            '2': 104
        }
    };
    const perM2 = bricksPerM2[brickType][String(thickness)];
    const bricks = Math.ceil(area * perM2);
    const pallets = Math.ceil(bricks / 400);
    return [
        { value: bricks, label: 'Всего кирпича', unit: 'шт.' },
        { value: perM2, label: 'На 1 м² стены', unit: 'шт.' },
        { value: pallets, label: 'Поддонов (по 400 шт)', unit: 'шт.' }
    ];
},
  'kraska-raskhod': (inputs) => {
    const wallArea = Number(inputs.wallArea) || 0;
    const ceilingArea = Number(inputs.ceilingArea) || 0;
    const consumption = Number(inputs.consumption) || 10;
    const coats = Number(inputs.coats) || 2;
    const canVolume = Number(inputs.canVolume) || 2.5;
    const totalArea = (wallArea + ceilingArea) * coats;
    const litersNeeded = totalArea / consumption;
    const cansNeeded = Math.ceil(litersNeeded / canVolume);
    const wallPaint = (wallArea * coats) / consumption;
    const ceilingPaint = (ceilingArea * coats) / consumption;
    return [
        { value: totalArea, label: 'Общая площадь', unit: 'м²' },
        { value: Number(litersNeeded.toFixed(1)), label: 'Литров краски', unit: 'л' },
        { value: cansNeeded, label: 'Банок нужно', unit: 'шт' },
        { value: Number(wallPaint.toFixed(1)), label: 'На стены', unit: 'л' },
        { value: Number(ceilingPaint.toFixed(1)), label: 'На потолок', unit: 'л' }
    ];
},
  'laminat': (inputs) => {
    const area = Number(inputs.area);
    const width = Number(inputs.boardWidth) / 1000;
    const length = Number(inputs.boardLength) / 1000;
    const inPack = Number(inputs.inPack);
    const extra = Number(inputs.extra);
    const boardArea = width * length;
    const packArea = boardArea * inPack;
    const totalArea = area * (1 + extra / 100);
    const boards = Math.ceil(totalArea / boardArea);
    const packs = Math.ceil(boards / inPack);
    return [
        { value: boards, label: 'Досок с запасом', unit: 'шт.' },
        { value: packs, label: 'Упаковок', unit: 'шт.' },
        { value: Math.round(packArea * 100) / 100, label: 'Площадь в упаковке', unit: 'м²' }
    ];
},
  'laminat-kalkulyator': (inputs) => {
    const roomLength = Number(inputs.roomLength) || 0;
    const roomWidth = Number(inputs.roomWidth) || 0;
    const packageArea = Number(inputs.packageArea) || 2.4;
    const reservePercent = Number(inputs.reservePercent) || 10;
    if (!roomLength || !roomWidth) {
        return [
            { value: '—', label: 'Площадь комнаты', unit: 'м²' },
            { value: '—', label: 'С запасом', unit: 'м²' },
            { value: '—', label: 'Упаковок нужно', unit: 'шт' },
            { value: '—', label: 'Площадь купленных упаковок', unit: 'м²' },
            { value: '—', label: 'Остаток', unit: 'м²' }
        ];
    }
    const roomArea = roomLength * roomWidth;
    const areaWithReserve = roomArea * (1 + reservePercent / 100);
    const packagesNeeded = Math.ceil(areaWithReserve / packageArea);
    const totalAreaPackages = packagesNeeded * packageArea;
    const extraArea = Number((totalAreaPackages - roomArea).toFixed(2));
    return [
        { value: Number(roomArea.toFixed(2)), label: 'Площадь комнаты', unit: 'м²' },
        { value: Number(areaWithReserve.toFixed(2)), label: 'С запасом', unit: 'м²' },
        { value: packagesNeeded, label: 'Упаковок нужно', unit: 'шт' },
        { value: Number(totalAreaPackages.toFixed(2)), label: 'Площадь купленных упаковок', unit: 'м²' },
        { value: extraArea, label: 'Остаток', unit: 'м²' }
    ];
},
  'oboi-kalkulyator': (inputs) => {
    const perimeter = Number(inputs.perimeter) || 0;
    const height = Number(inputs.height) || 0;
    const rollWidth = Number(inputs.rollWidth) || 0.53;
    const rollLength = Number(inputs.rollLength) || 10;
    const patternRepeat = Number(inputs.patternRepeat) || 0;
    if (!perimeter || !height) {
        return [
            { value: '—', label: 'Площадь стен', unit: 'м²' },
            { value: '—', label: 'Полос из рулона', unit: 'шт' },
            { value: '—', label: 'Всего полос', unit: 'шт' },
            { value: '—', label: 'Рулонов нужно', unit: 'шт' },
            { value: '—', label: 'С запасом (+10%)', unit: 'шт' }
        ];
    }
    const wallArea = perimeter * height;
    const totalStrips = Math.ceil(perimeter / rollWidth);
    let effectiveStripHeight = height;
    if (patternRepeat > 0) {
        effectiveStripHeight = height + (patternRepeat / 100);
    }
    const stripsPerRoll = Math.floor(rollLength / effectiveStripHeight);
    const rollsNeeded = Math.ceil(totalStrips / stripsPerRoll);
    const reserve = Math.ceil(rollsNeeded * 1.1);
    return [
        { value: Number(wallArea.toFixed(1)), label: 'Площадь стен', unit: 'м²' },
        { value: stripsPerRoll, label: 'Полос из рулона', unit: 'шт' },
        { value: totalStrips, label: 'Всего полос', unit: 'шт' },
        { value: rollsNeeded, label: 'Рулонов нужно', unit: 'шт' },
        { value: reserve, label: 'С запасом (+10%)', unit: 'шт' }
    ];
},
  'plitka-kalkulyator': (inputs) => {
    const area = Number(inputs.area) || 0;
    const tileWidth = Number(inputs.tileWidth) || 0;
    const tileHeight = Number(inputs.tileHeight) || 0;
    const reservePercent = Number(inputs.reservePercent) || 10;
    if (!area || !tileWidth || !tileHeight) {
        return [
            { value: '—', label: 'Площадь одной плитки', unit: 'м²' },
            { value: '—', label: 'Плиток без запаса', unit: 'шт' },
            { value: '—', label: 'Плиток с запасом', unit: 'шт' },
            { value: '—', label: 'Квадратных метров с запасом', unit: 'м²' },
            { value: '—', label: 'Упаковок (если по 1,5 м²)', unit: 'шт' }
        ];
    }
    const tileArea = (tileWidth * tileHeight) / 10000;
    const tilesNeeded = Math.ceil(area / tileArea);
    const tilesWithReserve = Math.ceil(tilesNeeded * (1 + reservePercent / 100));
    const squareMeters = Number((tilesWithReserve * tileArea).toFixed(2));
    const packages = Math.ceil(squareMeters / 1.5);
    return [
        { value: Number(tileArea.toFixed(3)), label: 'Площадь одной плитки', unit: 'м²' },
        { value: tilesNeeded, label: 'Плиток без запаса', unit: 'шт' },
        { value: tilesWithReserve, label: 'Плиток с запасом', unit: 'шт' },
        { value: squareMeters, label: 'Квадратных метров с запасом', unit: 'м²' },
        { value: packages, label: 'Упаковок (если по 1,5 м²)', unit: 'шт' }
    ];
},
  'plitka-na-pol-steny': (inputs) => {
    const area = Number(inputs.area);
    const tileW = Number(inputs.tileWidth) / 100; // convert to meters
    const tileH = Number(inputs.tileHeight) / 100;
    const extra = Number(inputs.extra);
    const tileArea = tileW * tileH;
    const tilesPerM2 = 1 / tileArea;
    const tiles = Math.ceil(area * tilesPerM2 * (1 + extra / 100));
    const boxes = Math.ceil(tiles / 10);
    return [
        { value: tiles, label: 'Плиток с запасом', unit: 'шт.' },
        { value: Math.ceil(tilesPerM2), label: 'Плиток на м²', unit: 'шт.' },
        { value: boxes, label: 'Упаковок (по 10 шт)', unit: 'упак.' }
    ];
},
  'raschet-kondicionera': (inputs) => {
    const area = Number(inputs.area);
    const ceilingHeight = Number(inputs.ceilingHeight);
    const sunExposure = String(inputs.sunExposure);
    const occupants = Number(inputs.occupants);
    const equipmentHeat = Number(inputs.equipmentHeat);
    if (!area || !ceilingHeight) {
        return [
            { value: '—', label: 'Мощность охлаждения', unit: 'кВт' },
            { value: '—', label: 'Мощность в BTU/ч', unit: 'BTU' },
            { value: '—', label: 'Рекомендуемая модель' },
            { value: '—', label: 'Рекомендуемая площадь' },
            { value: '—', label: 'Примечания' }
        ];
    }
    const volume = area * ceilingHeight;
    let basePower = volume * 35; // Watts
    const sunFactors: Record<string, number> = {
        'north': 0.9,
        'east': 1.0,
        'south': 1.15,
        'west': 1.2
    };
    basePower *= sunFactors[sunExposure];
    // People heat (average person emits ~100W at rest)
    const peopleHeat = occupants * 100;
    const totalPower = basePower + peopleHeat + equipmentHeat;
    const coolingPower = totalPower / 1000; // Convert to kW
    const btuPerHour = Math.ceil(coolingPower * 3412 / 1000) * 1000;
    let recommendedModel: string;
    if (coolingPower <= 2.0) {
        recommendedModel = '07 (7000 BTU, до 20 м²)';
    }
    else if (coolingPower <= 2.5) {
        recommendedModel = '09 (9000 BTU, до 25 м²)';
    }
    else if (coolingPower <= 3.5) {
        recommendedModel = '12 (12000 BTU, до 35 м²)';
    }
    else if (coolingPower <= 5.0) {
        recommendedModel = '18 (18000 BTU, до 50 м²)';
    }
    else {
        recommendedModel = '24 (24000 BTU, до 70 м²) или две сплит-системы';
    }
    const areaCovered = btuPerHour > 24000
        ? 'Рекомендуется два кондиционера'
        : `До ~${Math.floor(btuPerHour / 350)} м² при стандартной высоте`;
    let notes = 'Учтите: мощность берите с запасом 10-15%. Лучше перенагрузить, чем недогрузить.';
    if (equipmentHeat > 500) {
        notes += ' При значительном тепловыделении техники рассмотрите более мощную модель.';
    }
    return [
        { value: Number(coolingPower.toFixed(1)), label: 'Мощность охлаждения', unit: 'кВт' },
        { value: btuPerHour, label: 'Мощность в BTU/ч', unit: 'BTU' },
        { value: recommendedModel, label: 'Рекомендуемая модель' },
        { value: areaCovered, label: 'Рекомендуемая площадь' },
        { value: notes, label: 'Примечания' }
    ];
},
  'raschet-otopleniya': (inputs) => {
    const area = Number(inputs.area);
    const ceilingHeight = Number(inputs.ceilingHeight);
    const climateZone = String(inputs.climateZone);
    const insulation = String(inputs.insulation);
    const windows = String(inputs.windows);
    if (!area || !ceilingHeight) {
        return [
            { value: '—', label: 'Объём помещения', unit: 'м³' },
            { value: '—', label: 'Базовая мощность', unit: 'Вт' },
            { value: '—', label: 'Требуемая мощность', unit: 'Вт' },
            { value: '—', label: 'Радиаторов (2000 Вт)', unit: 'шт' },
            { value: '—', label: 'Мощность на м²', unit: 'Вт/м²' }
        ];
    }
    const roomVolume = area * ceilingHeight;
    const climateMultipliers: Record<string, number> = {
        'mild': 30,
        'moderate': 40,
        'cold': 50,
        'severe': 60
    };
    const insulationFactors: Record<string, number> = {
        'poor': 1.3,
        'average': 1.0,
        'good': 0.8
    };
    const windowFactors: Record<string, number> = {
        'single': 1.2,
        'double': 1.0,
        'triple': 0.9
    };
    const basePowerPerM3 = climateMultipliers[climateZone];
    const basePower = roomVolume * basePowerPerM3;
    const totalPower = basePower * insulationFactors[insulation] * windowFactors[windows];
    const radiators = Math.ceil(totalPower / 2000);
    const powerPerSqM = totalPower / area;
    return [
        { value: roomVolume, label: 'Объём помещения', unit: 'м³' },
        { value: Math.round(basePower), label: 'Базовая мощность', unit: 'Вт' },
        { value: Math.round(totalPower), label: 'Требуемая мощность', unit: 'Вт' },
        { value: radiators, label: 'Радиаторов (2000 Вт)', unit: 'шт' },
        { value: Math.round(powerPerSqM), label: 'Мощность на м²', unit: 'Вт/м²' }
    ];
},
  'rashod-kraski': (inputs) => {
    const area = Number(inputs.area);
    const consumption = Number(inputs.consumption);
    const coats = Number(inputs.coats);
    const canSize = Number(inputs.canSize);
    const totalLiters = area * consumption * coats;
    const cans = Math.ceil(totalLiters / canSize);
    const cost = cans * canSize * 500; // rough estimate: 500 rub/liter
    return [
        { value: Math.round(totalLiters * 100) / 100, label: 'Объём краски', unit: 'л' },
        { value: cans, label: 'Банок по ' + canSize + ' л', unit: 'шт.' },
        { value: '~' + Math.round(cost) + ' ₽ (при ~500 ₽/л)', label: 'Примерная стоимость' }
    ];
},
  'raskhod-gruntovki': (inputs) => {
    const wallArea = Number(inputs.wallArea);
    const floorArea = Number(inputs.floorArea);
    const surfaceType = String(inputs.surfaceType);
    const primerType = String(inputs.primerType);
    const coats = Number(inputs.coats);
    if ((!wallArea && !floorArea) || !coats) {
        return [
            { value: '—', label: 'Общая площадь', unit: 'м²' },
            { value: '—', label: 'Расход на м²', unit: 'л/м²' },
            { value: '—', label: 'Всего грунтовки', unit: 'л' },
            { value: '—', label: 'Канистр (5л)', unit: 'шт' },
            { value: '—', label: 'Разведение водой' }
        ];
    }
    const totalArea = wallArea + floorArea;
    // Consumption rates (L per m² per coat) by surface type
    const surfaceRates: Record<string, number> = {
        'concrete': 0.35,
        'plaster': 0.25,
        'drywall': 0.15,
        'wood': 0.12
    };
    const primerFactors: Record<string, number> = {
        'universal': 1.0,
        'deep': 1.2,
        'acrylic': 0.9,
        'betoncontact': 1.5
    };
    const baseRate = surfaceRates[surfaceType];
    const consumption = baseRate * primerFactors[primerType];
    const totalLiters = totalArea * consumption * coats;
    const cans = Math.ceil(totalLiters / 5);
    const dilutionText: Record<string, string> = {
        'universal': 'Готова к применению или 1:1 с водой',
        'deep': 'Не разбавлять для пористых поверхностей, 1:1 для плотных',
        'acrylic': 'Разбавить 1:1 для первого слоя',
        'betoncontact': 'Готова к применению, не разбавлять'
    };
    return [
        { value: totalArea, label: 'Общая площадь', unit: 'м²' },
        { value: Number(consumption.toFixed(2)), label: 'Расход на м²', unit: 'л/м²' },
        { value: Number(totalLiters.toFixed(1)), label: 'Всего грунтовки', unit: 'л' },
        { value: cans, label: 'Канистр (5л)', unit: 'шт' },
        { value: dilutionText[primerType], label: 'Разведение водой' }
    ];
},
  'raskhod-kraski': (inputs) => {
    const wallArea = Number(inputs.wallArea) || 0;
    const ceilingArea = Number(inputs.ceilingArea) || 0;
    const paintCoverage = Number(inputs.paintCoverage);
    const coats = Number(inputs.coats);
    const surfaceType = String(inputs.surfaceType);
    if (!paintCoverage || !coats) {
        return [
            { value: '—', label: 'Общая площадь', unit: 'м²' },
            { value: '—', label: 'Объём краски', unit: 'л' },
            { value: '—', label: 'Количество банок', unit: 'шт' },
            { value: '—', label: 'Рекомендуемый размер' },
            { value: '—', label: 'Грунтовка (10% запас)', unit: 'л' }
        ];
    }
    const totalArea = wallArea + ceilingArea;
    const surfaceMultipliers: Record<string, number> = {
        'smooth': 1.0,
        'normal': 1.1,
        'porous': 1.4,
        'textured': 1.2
    };
    const multiplier = surfaceMultipliers[surfaceType];
    const effectiveArea = totalArea * multiplier * coats;
    const paintVolume = effectiveArea / paintCoverage;
    const primerVolume = totalArea * 0.1 / 10; // Primer coverage ~10 m²/l with 10% extra
    let cansNeeded: number;
    let canSize: string;
    if (paintVolume <= 2.5) {
        cansNeeded = 1;
        canSize = '2.5 л';
    }
    else if (paintVolume <= 5) {
        cansNeeded = 1;
        canSize = '5 л';
    }
    else if (paintVolume <= 10) {
        cansNeeded = 1;
        canSize = '10 л';
    }
    else {
        cansNeeded = Math.ceil(paintVolume / 10);
        canSize = '10 л';
    }
    return [
        { value: totalArea, label: 'Общая площадь', unit: 'м²' },
        { value: Number(paintVolume.toFixed(1)), label: 'Объём краски', unit: 'л' },
        { value: cansNeeded, label: 'Количество банок', unit: 'шт' },
        { value: canSize, label: 'Рекомендуемый размер' },
        { value: Number(primerVolume.toFixed(1)), label: 'Грунтовка (10% запас)', unit: 'л' }
    ];
},
}
