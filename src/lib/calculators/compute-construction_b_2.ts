import type { ComputeFn } from './compute-helpers';

export const computeMap_construction_b_2: Record<string, ComputeFn> = {
  'raskhod-laminata': (inputs) => {
    const roomLength = Number(inputs.roomLength);
    const roomWidth = Number(inputs.roomWidth);
    const flooringType = String(inputs.flooringType);
    const wastePercent = Number(inputs.wastePercent);
    const packageSize = Number(inputs.packageSize);
    if (!roomLength || !roomWidth || !packageSize) {
        return [
            { value: '—', label: 'Площадь комнаты', unit: 'м²' },
            { value: '—', label: 'С учётом запаса', unit: 'м²' },
            { value: '—', label: 'Количество упаковок', unit: 'шт' },
            { value: '—', label: 'Запас', unit: 'м²' },
            { value: '—', label: 'Ориентировочная стоимость' }
        ];
    }
    const roomArea = roomLength * roomWidth;
    let adjustedWaste = wastePercent;
    if (flooringType === 'tile')
        adjustedWaste += 5; // More waste for tile
    if (roomLength / roomWidth > 2 || roomWidth / roomLength > 2)
        adjustedWaste += 3; // Elongated room
    const totalArea = roomArea * (1 + adjustedWaste / 100);
    const packages = Math.ceil(totalArea / packageSize);
    const extraArea = packages * packageSize - roomArea;
    const costRanges: Record<string, [
        number,
        number
    ]> = {
        'laminate': [300, 1500],
        'parquet': [800, 4000],
        'tile': [500, 2500],
        'linoleum': [200, 800],
        'vinyl': [600, 2000]
    };
    const [minCost, maxCost] = costRanges[flooringType];
    const minTotal = Math.round(roomArea * minCost);
    const maxTotal = Math.round(roomArea * maxCost);
    return [
        { value: roomArea, label: 'Площадь комнаты', unit: 'м²' },
        { value: Number(totalArea.toFixed(1)), label: 'С учётом запаса', unit: 'м²' },
        { value: packages, label: 'Количество упаковок', unit: 'шт' },
        { value: Number(extraArea.toFixed(1)), label: 'Запас', unit: 'м²' },
        { value: `${minTotal.toLocaleString()} - ${maxTotal.toLocaleString()} ₽`, label: 'Ориентировочная стоимость' }
    ];
},
  'raskhod-oboev': (inputs) => {
    const perimeter = Number(inputs.perimeter);
    const ceilingHeight = Number(inputs.ceilingHeight);
    const doorArea = Number(inputs.doorArea);
    const rollWidth = Number(inputs.rollWidth);
    const patternRepeat = Number(inputs.patternRepeat);
    if (!perimeter || !ceilingHeight) {
        return [
            { value: '—', label: 'Площадь стен', unit: 'м²' },
            { value: '—', label: 'С учётом вычетов', unit: 'м²' },
            { value: '—', label: 'Количество полос', unit: 'шт' },
            { value: '—', label: 'Рулонов нужно', unit: 'шт' },
            { value: '—', label: 'Длина рулона' }
        ];
    }
    const wallArea = perimeter * ceilingHeight;
    const effectiveArea = wallArea - doorArea;
    const rollLength = 10.05;
    const stripsNeeded = Math.ceil(perimeter / rollWidth);
    let stripLength = ceilingHeight + 0.1; // +10cm for trimming
    if (patternRepeat > 0) {
        stripLength = Math.ceil(stripLength / (patternRepeat / 100)) * (patternRepeat / 100);
    }
    const stripsPerRoll = Math.floor(rollLength / stripLength);
    const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
    return [
        { value: Number(wallArea.toFixed(1)), label: 'Площадь стен', unit: 'м²' },
        { value: Number(effectiveArea.toFixed(1)), label: 'С учётом вычетов', unit: 'м²' },
        { value: stripsNeeded, label: 'Количество полос', unit: 'шт' },
        { value: rollsNeeded, label: 'Рулонов нужно', unit: 'шт' },
        { value: `${rollLength} м (${rollWidth} м ширина)`, label: 'Длина рулона' }
    ];
},
  'raskhod-plitki': (inputs) => {
    const wallArea = Number(inputs.wallArea) || 0;
    const floorArea = Number(inputs.floorArea) || 0;
    const tileSize = String(inputs.tileSize);
    const pattern = String(inputs.pattern);
    const wastePercent = Number(inputs.wastePercent);
    if ((!wallArea && !floorArea) || !tileSize) {
        return [
            { value: '—', label: 'Общая площадь', unit: 'м²' },
            { value: '—', label: 'Плиток нужно', unit: 'шт' },
            { value: '—', label: 'Упаковок', unit: 'шт' },
            { value: '—', label: 'Запас', unit: 'шт' },
            { value: '—', label: 'С учётом запаса', unit: 'м²' }
        ];
    }
    const totalArea = wallArea + floorArea;
    const [width, height] = tileSize.split('x').map(Number);
    const tileArea = (width * height) / 10000; // in m²
    let adjustedWaste = wastePercent;
    if (pattern === 'diagonal')
        adjustedWaste += 5;
    if (pattern === 'herringbone')
        adjustedWaste += 8;
    const totalWithWaste = totalArea * (1 + adjustedWaste / 100);
    const tilesNeeded = Math.ceil(totalArea / tileArea);
    const tilesWithWaste = Math.ceil(totalWithWaste / tileArea);
    const extraTiles = tilesWithWaste - tilesNeeded;
    const tilesPerBox = Math.floor(1.8 / tileArea);
    const boxes = Math.ceil(tilesWithWaste / tilesPerBox);
    return [
        { value: totalArea, label: 'Общая площадь', unit: 'м²' },
        { value: tilesNeeded, label: 'Плиток нужно', unit: 'шт' },
        { value: boxes, label: 'Упаковок', unit: 'шт' },
        { value: extraTiles, label: 'Запас', unit: 'шт' },
        { value: Number(totalWithWaste.toFixed(1)), label: 'С учётом запаса', unit: 'м²' }
    ];
},
  'raskhod-shtukaturki': (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness);
    const mixType = String(inputs.mixType);
    const bagWeight = Number(inputs.bagWeight);
    if (!area || !thickness || !bagWeight) {
        return [
            { value: '—', label: 'Объём штукатурки', unit: 'м³' },
            { value: '—', label: 'Вес сухой смеси', unit: 'кг' },
            { value: '—', label: 'Количество мешков', unit: 'шт' },
            { value: '—', label: 'Воды понадобится', unit: 'л' },
            { value: '—', label: 'Расход на м²' }
        ];
    }
    // Consumption rates (kg per m² per 10mm thickness)
    const consumptionRates: Record<string, number> = {
        'cement': 16,
        'gypsum': 9,
        'polymer': 10,
        'lime': 14
    };
    const rate = consumptionRates[mixType];
    const consumptionPerSqM = (rate * thickness) / 10;
    const volume = (area * thickness) / 1000; // m³
    const dryWeight = area * consumptionPerSqM;
    const bags = Math.ceil(dryWeight / bagWeight);
    const waterRatios: Record<string, number> = {
        'cement': 0.15,
        'gypsum': 0.6,
        'polymer': 0.5,
        'lime': 0.25
    };
    const waterNeeded = dryWeight * waterRatios[mixType];
    return [
        { value: Number(volume.toFixed(3)), label: 'Объём штукатурки', unit: 'м³' },
        { value: Math.round(dryWeight), label: 'Вес сухой смеси', unit: 'кг' },
        { value: bags, label: 'Количество мешков', unit: 'шт' },
        { value: Math.round(waterNeeded), label: 'Воды понадобится', unit: 'л' },
        { value: `${consumptionPerSqM.toFixed(1)} кг/м²`, label: 'Расход на м²' }
    ];
},
  'shpaklyovka': (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness);
    const puttyType = String(inputs.puttyType);
    // Consumption per m² per mm thickness based on putty type
    const consumptionRates: Record<string, number> = {
        'finish': 0.8,
        'base': 1.2,
        'universal': 1.0
    };
    const consumption = consumptionRates[puttyType];
    const weight = area * consumption * thickness;
    const withReserve = weight * 1.1;
    const bags = Math.ceil(withReserve / 25);
    return [
        { value: Math.round(weight * 10) / 10, label: 'Необходимо шпаклёвки', unit: 'кг' },
        { value: bags, label: 'Мешков по 25 кг', unit: 'шт.' },
        { value: Math.round(withReserve * 10) / 10, label: 'С запасом 10%', unit: 'кг' }
    ];
},
  'shtukaturka': (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness);
    const consumption = Number(inputs.consumption);
    const weight = area * (consumption / 10) * thickness;
    const bags = Math.ceil(weight / 30);
    const volume = (area * thickness) / 1000; // convert mm to m
    return [
        { value: Math.round(weight), label: 'Необходимый вес', unit: 'кг' },
        { value: bags, label: 'Мешков по 30 кг', unit: 'шт.' },
        { value: Math.round(volume * 1000) / 1000, label: 'Объём', unit: 'м³' }
    ];
},
  'utepitel': (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness);
    const materialType = String(inputs.materialType);
    const packageArea = Number(inputs.packageArea);
    const sheetSizes: Record<string, number> = {
        'mineral-wool': 0.36, // 600x600 mm
        'polystyrene': 0.72, // 1200x600 mm
        'extruder': 0.72, // 1200x600 mm
        'basalt-wool': 0.36 // 600x600 mm
    };
    const sheetArea = sheetSizes[materialType];
    const volume = (area * thickness) / 100; // Convert cm to m for volume
    const totalArea = area * 1.1;
    const sheets = Math.ceil(totalArea / sheetArea);
    const packages = Math.ceil(totalArea / packageArea);
    return [
        { value: Math.round(volume * 100) / 100, label: 'Объём утеплителя', unit: 'м³' },
        { value: packages, label: 'Упаковок с запасом', unit: 'шт.' },
        { value: sheets, label: 'Плит/листов', unit: 'шт.' }
    ];
},
}
