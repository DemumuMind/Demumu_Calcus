import type { ComputeFn } from './compute-helpers';

export const computeMap_hobby_a: Record<string, ComputeFn> = {
  'bead-calculator': (inputs): any => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const beadSize = String(inputs.beadSize);
    const beadDiameters: Record<string, number> = { '15': 1.5, '11': 2.1, '8': 3.0, '6': 4.0 };
    const beadsPerGram: Record<string, number> = { '15': 350, '11': 180, '8': 65, '6': 30 };
    const beadDiameter = beadDiameters[beadSize];
    const beadsPerRow = Math.floor(width * 10 / beadDiameter);
    const rows = Math.floor(length * 10 / beadDiameter);
    const beadsNeeded = beadsPerRow * rows;
    const gramsNeeded = Math.ceil(beadsNeeded / beadsPerGram[beadSize]);
    const packsNeeded = Math.ceil(gramsNeeded / 5);
    return [
        { value: beadsNeeded, label: 'Количество бисерин', unit: 'шт' },
        { value: gramsNeeded, label: 'Вес бисера', unit: 'г' },
        { value: packsNeeded, label: 'Пакетиков (5г)', unit: 'шт' }
    ];
},
  'bokeh-razmytie': (inputs) => {
    const focalLength = Number(inputs.focalLength);
    const aperture = Number(inputs.aperture);
    const subjectDistance = Number(inputs.subjectDistance);
    const backgroundDistance = Number(inputs.backgroundDistance);
    if (!focalLength || !aperture || !subjectDistance || !backgroundDistance) {
        return [
            { value: '—', label: 'Сила размытия (мм)' },
            { value: '—', label: 'Оценка боке' },
            { value: '', label: 'Рекомендации' }
        ];
    }
    // blur = (focal_length² × (bg_distance - subject_distance)) / (aperture × subject_distance × bg_distance)
    const blurAmount = (focalLength ** 2 * (backgroundDistance - subjectDistance)) /
        (aperture * subjectDistance * backgroundDistance * 100); // convert to mm
    let blurRating = '';
    if (blurAmount < 0.1) {
        blurRating = 'Слабое размытие';
    }
    else if (blurAmount < 0.3) {
        blurRating = 'Умеренное размытие';
    }
    else if (blurAmount < 0.5) {
        blurRating = 'Хорошее размытие';
    }
    else {
        blurRating = 'Отличное размытие (кремовое боке)';
    }
    let _recommendation = '';
    if (blurAmount < 0.2) {
        _recommendation = 'Для усиления боке: используйте более длинное фокусное расстояние или снимайте ближе к объекту';
    }
    else {
        _recommendation = 'Отличные условия для портретной съёмки с красивым фоном';
    }
    return [
        { value: Math.round(blurAmount * 100) / 100, label: 'Сила размытия (мм)' },
        { value: blurRating, label: 'Оценка боке' },
        { value: _recommendation, label: 'Рекомендации' }
    ];
},
  'bpm-temp': (inputs) => {
    const bpm = Number(inputs.bpm);
    if (!bpm) {
        return [
            { value: '—', label: 'Длительность четверти (мс)' },
            { value: '—', label: 'Восьмая нота (мс)' },
            { value: '—', label: 'Шестнадцатая (мс)' },
            { value: '—', label: 'Delay 1/4 (мс)' },
            { value: '—', label: 'Частота (Hz)' }
        ];
    }
    const beatDuration = (60000 / bpm); // Quarter note in ms
    const eighthNote = beatDuration / 2;
    const sixteenthNote = beatDuration / 4;
    const delayTime = beatDuration;
    const frequency = bpm / 60; // Hz
    return [
        { value: Math.round(beatDuration), label: 'Длительность четверти (мс)' },
        { value: Math.round(eighthNote), label: 'Восьмая нота (мс)' },
        { value: Math.round(sixteenthNote), label: 'Шестнадцатая (мс)' },
        { value: Math.round(delayTime), label: 'Delay 1/4 (мс)' },
        { value: Math.round(frequency * 100) / 100, label: 'Частота (Hz)' }
    ];
},
  'chastoty-not': (inputs) => {
    const note = String(inputs.note);
    const octave = Number(inputs.octave);
    if (!note) {
        return [
            { value: '—', label: 'Частота (Hz)' },
            { value: '—', label: 'Длина волны (м)' },
            { value: '—', label: 'Период (мс)' }
        ];
    }
    // Note numbers relative to A4 (440 Hz)
    const noteNumbers: Record<string, number> = {
        'C': -9, 'C#': -8, 'Db': -8,
        'D': -7, 'D#': -6, 'Eb': -6,
        'E': -5,
        'F': -4, 'F#': -3, 'Gb': -3,
        'G': -2, 'G#': -1, 'Ab': -1,
        'A': 0, 'A#': 1, 'Bb': 1,
        'B': 2
    };
    const semitones = noteNumbers[note] + (octave - 4) * 12;
    const frequency = 440 * Math.pow(2, semitones / 12);
    const speedOfSound = 343;
    const wavelength = speedOfSound / frequency;
    const period = (1 / frequency) * 1000;
    return [
        { value: Math.round(frequency * 100) / 100, label: 'Частота (Hz)' },
        { value: Math.round(wavelength * 100) / 100, label: 'Длина волны (м)' },
        { value: Math.round(period * 1000) / 1000, label: 'Период (мс)' }
    ];
},
  'concrete-calculator': (inputs): any => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const depth = Number(inputs.depth);
    const volume = length * width * depth;
    const weight = volume * 2400; // ~2400 кг/м³
    return [
        { value: Math.round(volume * 100) / 100, label: 'Объём бетона', unit: 'м³' },
        { value: Math.round(volume * 1000), label: 'Объём в литрах', unit: 'л' },
        { value: Math.round(weight), label: 'Вес бетона', unit: 'кг' }
    ];
},
  'crochet-calculator': (inputs): any => {
    const gaugeStitches = Number(inputs.gaugeStitches);
    const gaugeRows = Number(inputs.gaugeRows);
    const targetWidth = Number(inputs.targetWidth);
    const targetLength = Number(inputs.targetLength);
    const stitchesPerCm = gaugeStitches / 10;
    const rowsPerCm = gaugeRows / 10;
    const stitchesNeeded = Math.round(targetWidth * stitchesPerCm);
    const rowsNeeded = Math.round(targetLength * rowsPerCm);
    const turningChain = Math.ceil(stitchesPerCm) + 1;
    return [
        { value: stitchesNeeded, label: 'Набрать петель', unit: 'шт' },
        { value: rowsNeeded, label: 'Провязать рядов', unit: 'шт' },
        { value: turningChain, label: 'Петли подъёма', unit: 'шт' }
    ];
},
  'detune-rastrojka': (inputs) => {
    const baseFrequency = Number(inputs.baseFrequency);
    const cents = Number(inputs.cents);
    if (!baseFrequency || !cents) {
        return [
            { value: '—', label: 'Новая частота (Hz)' },
            { value: '—', label: 'Разница (Hz)' },
            { value: '—', label: 'Частота биений (Hz)' }
        ];
    }
    const newFrequency = baseFrequency * Math.pow(2, cents / 1200);
    const hzDifference = newFrequency - baseFrequency;
    const beatFrequency = Math.abs(hzDifference);
    return [
        { value: Math.round(newFrequency * 100) / 100, label: 'Новая частота (Hz)' },
        { value: Math.round(hzDifference * 100) / 100, label: 'Разница (Hz)' },
        { value: Math.round(beatFrequency * 100) / 100, label: 'Частота биений (Hz)' }
    ];
},
  'diy-cost-calculator': (inputs): any => {
    const materialsCost = Number(inputs.materialsCost);
    const toolsCost = Number(inputs.toolsCost);
    const hoursSpent = Number(inputs.hoursSpent);
    const hourlyValue = Number(inputs.hourlyValue);
    const storePrice = Number(inputs.storePrice);
    const totalDIYCost = materialsCost + toolsCost + (hoursSpent * hourlyValue);
    const _savings = storePrice - totalDIYCost;
    const worthIt = _savings > 0 ? 'Да! DIY выгоднее на ' + Math.round(_savings) + '₽' : 'Нет, дешевле купить готовое';
    return [
        { value: Math.round(totalDIYCost), label: 'Итоговая стоимость DIY', unit: '₽' },
        { value: Math.round(_savings), label: 'Экономия', unit: '₽' },
        { value: worthIt, label: 'Выгодно ли?', unit: '' }
    ];
},
  'embroidery-calculator': (inputs): any => {
    const patternWidth = Number(inputs.patternWidth);
    const patternHeight = Number(inputs.patternHeight);
    const canvasCount = Number(inputs.canvasCount);
    const colors = Number(inputs.colors);
    const margin = 10; // отступ с каждой стороны
    const cellsPerCm = canvasCount / 2.54;
    const canvasWidthCm = Math.ceil((patternWidth / cellsPerCm) + margin * 2);
    const canvasHeightCm = Math.ceil((patternHeight / cellsPerCm) + margin * 2);
    const threadsNeeded = Math.ceil(colors * 0.8); // не все цвета используются одинаково
    return [
        { value: canvasWidthCm, label: 'Ширина канвы', unit: 'см' },
        { value: canvasHeightCm, label: 'Высота канвы', unit: 'см' },
        { value: threadsNeeded, label: 'Мотков ниток', unit: 'шт' }
    ];
},
  'fabric-calculator': (inputs): any => {
    const clothingType = String(inputs.clothingType);
    const size = String(inputs.size);
    const fabricWidth = String(inputs.fabricWidth);
    const baseRequirements: Record<string, Record<string, number>> = {
        skirt: { 'XS-S': 1.5, 'M-L': 1.7, 'XL-XXL': 2 },
        dress: { 'XS-S': 2.5, 'M-L': 2.8, 'XL-XXL': 3.2 },
        pants: { 'XS-S': 1.8, 'M-L': 2, 'XL-XXL': 2.3 },
        shirt: { 'XS-S': 1.5, 'M-L': 1.8, 'XL-XXL': 2 },
        jacket: { 'XS-S': 2, 'M-L': 2.3, 'XL-XXL': 2.6 }
    };
    const widthMultiplier: Record<string, number> = { '90': 1.5, '110': 1.2, '140': 1, '150': 0.95 };
    const fabricLength = Math.ceil(baseRequirements[clothingType][size] * widthMultiplier[fabricWidth] * 10) / 10;
    const totalArea = Math.round(fabricLength * (Number(fabricWidth) / 100) * 10) / 10;
    return [
        { value: fabricLength, label: 'Длина ткани', unit: 'м' },
        { value: totalArea, label: 'Площадь ткани', unit: 'м²' }
    ];
},
  'garden-soil-calculator': (inputs): any => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const depth = Number(inputs.depth);
    const bedCount = Number(inputs.bedCount);
    const volumeM3 = length * width * (depth / 100) * bedCount;
    const soilVolume = Math.round(volumeM3 * 100) / 100;
    const bagsNeeded = Math.ceil(soilVolume * 1000 / 50);
    const compostVolume = Math.round(volumeM3 * 0.3 * 100) / 100;
    return [
        { value: soilVolume, label: 'Объём грунта', unit: 'м³' },
        { value: bagsNeeded, label: 'Мешков земли (50л)', unit: 'шт' },
        { value: compostVolume, label: 'Компоста (30% смеси)', unit: 'м³' }
    ];
},
  'glubina-rezkosti': (inputs) => {
    const focalLength = Number(inputs.focalLength);
    const aperture = Number(inputs.aperture);
    const distance = Number(inputs.distance);
    const sensorSize = String(inputs.sensorSize);
    if (!focalLength || !aperture || !distance) {
        return [
            { value: '—', label: 'Ближняя граница (м)' },
            { value: '—', label: 'Дальняя граница (м)' },
            { value: '—', label: 'Глубина резкости (м)' },
            { value: '—', label: 'Гиперфокальное расстояние (м)' }
        ];
    }
    const cocValues: Record<string, number> = {
        fullframe: 0.029,
        apsc: 0.019,
        m43: 0.015,
        '1inch': 0.011
    };
    const coc = cocValues[sensorSize] || 0.029;
    const hyperfocal = (focalLength * focalLength) / (aperture * coc) + focalLength;
    const hyperfocalM = hyperfocal / 1000;
    const H = hyperfocalM;
    const D = distance;
    const nearLimit = (H * D) / (H + D);
    let farLimit = (H * D) / (H - D);
    if (farLimit < 0 || !isFinite(farLimit))
        farLimit = Infinity;
    const totalDOF = farLimit === Infinity ? Infinity : farLimit - nearLimit;
    return [
        { value: Math.round(nearLimit * 100) / 100, label: 'Ближняя граница (м)' },
        { value: farLimit === Infinity ? '∞' : Math.round(farLimit * 100) / 100, label: 'Дальняя граница (м)' },
        { value: totalDOF === Infinity ? '∞' : Math.round(totalDOF * 100) / 100, label: 'Глубина резкости (м)' },
        { value: Math.round(hyperfocalM * 100) / 100, label: 'Гиперфокальное расстояние (м)' }
    ];
},
  'gromkost-lufs': (inputs) => {
    const platform = String(inputs.platform);
    const currentLufs = Number(inputs.currentLufs);
    const standards: Record<string, {
        target: string;
        peak: string;
    }> = {
        spotify: { target: '-14 LUFS', peak: '-1 dBTP' },
        apple: { target: '-16 LUFS', peak: '-1 dBTP' },
        youtube: { target: '-14 LUFS', peak: '-1 dBTP' },
        tidal: { target: '-14 LUFS', peak: '-1 dBTP' },
        amazon: { target: '-14 LUFS', peak: '-1 dBTP' },
        cd: { target: '-9 до -13 LUFS', peak: '-0.1 dBTP' },
        broadcast: { target: '-23 LUFS', peak: '-1 dBTP' }
    };
    const standard = standards[platform];
    if (!standard || !currentLufs) {
        return [
            { value: '—', label: 'Целевой уровень (LUFS)' },
            { value: '—', label: 'Корректировка' },
            { value: '—', label: 'True Peak (dBTP)' }
        ];
    }
    const targetMatch = standard.target.match(/-?\d+/);
    const targetLufs = targetMatch ? parseInt(targetMatch[0]) : -14;
    const difference = currentLufs - targetLufs;
    let adjustment = '';
    if (Math.abs(difference) < 1) {
        adjustment = '✅ Громкость оптимальна';
    }
    else if (difference > 0) {
        adjustment = `⬇️ Нужно уменьшить на ${Math.round(difference)} LUFS`;
    }
    else {
        adjustment = `⬆️ Можно увеличить на ${Math.round(Math.abs(difference))} LUFS`;
    }
    return [
        { value: standard.target, label: 'Целевой уровень (LUFS)' },
        { value: adjustment, label: 'Корректировка' },
        { value: standard.peak, label: 'True Peak (dBTP)' }
    ];
},
  'hdr-breketing': (inputs) => {
    const evRange = Number(inputs.evRange);
    const evStep = Number(inputs.evStep);
    const baseISO = Number(inputs.baseISO);
    if (!evRange || !evStep) {
        return [
            { value: '—', label: 'Количество кадров' },
            { value: '—', label: 'Рекомендуемые настройки' },
            { value: '—', label: 'Диапазон ISO' },
            { value: '', label: 'Советы' }
        ];
    }
    const numFrames = Math.ceil((evRange + 2) / evStep);
    const minISO = Math.max(100, baseISO / Math.pow(2, evRange / 2));
    const maxISO = Math.min(12800, baseISO * Math.pow(2, evRange / 2));
    let settings = '';
    if (numFrames <= 3) {
        settings = 'Брекетинг: -2/0/+2 EV или -3/0/+3 EV';
    }
    else if (numFrames <= 5) {
        settings = 'Брекетинг: -4/-2/0/+2/+4 EV или -2/0/+2 с разными ISO';
    }
    else {
        settings = 'Требуется сложный брекетинг или съёмка с разными ISO';
    }
    let tips = '';
    if (evRange > 15) {
        tips = 'Очень широкий динамический диапазон. Рассмотрите съёмку в разное время суток.';
    }
    else {
        tips = 'Используйте штатив и интервалометр для точной синхронизации.';
    }
    return [
        { value: numFrames, label: 'Количество кадров' },
        { value: settings, label: 'Рекомендуемые настройки' },
        { value: `${Math.round(minISO)} - ${Math.round(maxISO)}`, label: 'Диапазон ISO' },
        { value: tips, label: 'Советы' }
    ];
},
  'knitting-calculator': (inputs): any => {
    const itemType = String(inputs.itemType);
    const size = String(inputs.size);
    const yarnWeight = String(inputs.yarnWeight);
    const baseWeights: Record<string, Record<string, number>> = {
        scarf: { child: 100, adult: 200, large: 300 },
        hat: { child: 50, adult: 100, large: 150 },
        sweater: { child: 300, adult: 500, large: 700 },
        socks: { child: 50, adult: 100, large: 150 },
        blanket: { child: 500, adult: 1000, large: 1500 }
    };
    const yarnMultiplier: Record<string, number> = { thin: 0.7, medium: 1, thick: 1.4 };
    const yarnWeightValue = Math.ceil(baseWeights[itemType][size] * yarnMultiplier[yarnWeight]);
    const skeinsNeeded = Math.ceil(yarnWeightValue / 100);
    const knittingTime = Math.ceil(yarnWeightValue / 50); // примерно 50г в час
    return [
        { value: yarnWeightValue, label: 'Необходимый вес пряжи', unit: 'г' },
        { value: skeinsNeeded, label: 'Количество мотков (100г)', unit: 'шт' },
        { value: knittingTime, label: 'Примерное время вязания', unit: 'ч' }
    ];
},
}
