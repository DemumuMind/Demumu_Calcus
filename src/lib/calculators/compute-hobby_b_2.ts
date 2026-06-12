import type { ComputeFn } from './compute-helpers';

export const computeMap_hobby_b_2: Record<string, ComputeFn> = {
  'vyderzhka': (inputs) => {
    const baseShutter = Number(inputs.baseShutter);
    const baseAperture = Number(inputs.baseAperture);
    const baseISO = Number(inputs.baseISO);
    const newAperture = Number(inputs.newAperture);
    const newISO = Number(inputs.newISO);
    if (!baseShutter || !baseAperture || !baseISO || !newAperture || !newISO) {
        return [
            { value: '—', label: 'Новая выдержка' },
            { value: '—', label: 'Изменение экспозиции (EV)' },
            { value: '', label: 'Рекомендация' }
        ];
    }
    const apertureEV = Math.log2(Math.pow(newAperture / baseAperture, 2));
    const isoEV = Math.log2(newISO / baseISO);
    const totalEV = apertureEV + isoEV;
    const newShutterSeconds = baseShutter / Math.pow(2, totalEV);
    let shutterText = '';
    if (newShutterSeconds < 1) {
        const denominator = Math.round(1 / newShutterSeconds);
        shutterText = `1/${denominator} сек`;
    }
    else {
        shutterText = `${Math.round(newShutterSeconds * 10) / 10} сек`;
    }
    let _recommendation = '';
    if (newShutterSeconds < 1 / 500) {
        _recommendation = 'Очень короткая выдержка - заморозит движение';
    }
    else if (newShutterSeconds < 1 / 60) {
        _recommendation = 'Короткая выдержка - подходит для ручной съёмки';
    }
    else if (newShutterSeconds < 1 / 15) {
        _recommendation = 'Средняя выдержка - используйте штатив';
    }
    else {
        _recommendation = 'Длинная выдержка - обязателен штатив';
    }
    return [
        { value: shutterText, label: 'Новая выдержка' },
        { value: Math.round(totalEV * 10) / 10, label: 'Изменение экспозиции (EV)' },
        { value: _recommendation, label: 'Рекомендация' }
    ];
},
  'wallpaper-calculator': (inputs): any => {
    const perimeter = Number(inputs.perimeter);
    const ceilingHeight = Number(inputs.ceilingHeight);
    const rollWidth = Number(inputs.rollWidth);
    const patternRepeat = Number(inputs.patternRepeat);
    const openings = Number(inputs.openings) || 0;
    const totalArea = perimeter * ceilingHeight - openings;
    const stripsPerRoll = 10 / (ceilingHeight + patternRepeat / 100);
    const totalStrips = Math.ceil(perimeter / rollWidth);
    const rollsNeeded = Math.ceil(totalStrips / stripsPerRoll);
    const stripLength = ceilingHeight + (patternRepeat > 0 ? patternRepeat / 100 : 0.1);
    return [
        { value: Math.round(totalArea * 10) / 10, label: 'Общая площадь', unit: 'м²' },
        { value: rollsNeeded, label: 'Количество рулонов', unit: 'шт' },
        { value: Math.round(stripLength * 100) / 100, label: 'Длина одной полосы', unit: 'м' }
    ];
},
  'wallpaper-pattern-match-calculator': (inputs): any => {
    const roomPerimeter = Number(inputs.roomPerimeter);
    const ceilingHeight = Number(inputs.ceilingHeight);
    const rollWidth = Number(inputs.rollWidth);
    const patternRepeat = Number(inputs.patternRepeat);
    const stripsNeeded = Math.ceil(roomPerimeter / (rollWidth / 100));
    const effectiveHeight = ceilingHeight + (patternRepeat / 100);
    const stripsPerRoll = Math.floor(10 / effectiveHeight);
    const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
    const wastePercent = Math.round(((patternRepeat / 100) * stripsNeeded) / (ceilingHeight * stripsNeeded) * 100);
    return [
        { value: stripsNeeded, label: 'Полос нужно', unit: 'шт' },
        { value: stripsPerRoll, label: 'Полос из рулона', unit: 'шт' },
        { value: rollsNeeded, label: 'Рулонов нужно', unit: 'шт' },
        { value: wastePercent, label: 'Отходов', unit: '%' }
    ];
},
  'wood-calculator': (inputs): any => {
    const area = Number(inputs.area);
    const boardWidth = Number(inputs.boardWidth);
    const boardLength = Number(inputs.boardLength);
    const spacing = Number(inputs.spacing);
    const effectiveWidth = (boardWidth + spacing) / 1000;
    const boardsNeeded = Math.ceil(area / (effectiveWidth * boardLength));
    const linearMeters = boardsNeeded * boardLength;
    const volume = (boardWidth / 1000) * 0.025 * linearMeters; // толщина 25мм
    return [
        { value: boardsNeeded, label: 'Количество досок', unit: 'шт' },
        { value: linearMeters, label: 'Погонных метров', unit: 'м.п.' },
        { value: Math.round(volume * 100) / 100, label: 'Объём древесины', unit: 'м³' }
    ];
},
  'zvezdy-vyderzhka': (inputs) => {
    const focalLength = Number(inputs.focalLength);
    const sensorSize = String(inputs.sensorSize);
    const method = String(inputs.method);
    const aperture = Number(inputs.aperture);
    const pixelSize = Number(inputs.pixelSize);
    if (!focalLength) {
        return [
            { value: '—', label: 'Максимальная выдержка (сек)' },
            { value: '—', label: 'Рекомендуемая выдержка' },
            { value: '', label: 'Советы' }
        ];
    }
    const cropFactors: Record<string, number> = {
        fullframe: 1,
        apsc: 1.5,
        m43: 2
    };
    const cropFactor = cropFactors[sensorSize] || 1;
    const effectiveFocal = focalLength * cropFactor;
    let maxShutter = 0;
    if (method === '500') {
        maxShutter = 500 / effectiveFocal;
    }
    else if (method === '600') {
        maxShutter = 600 / effectiveFocal;
    }
    else if (method === 'npf') {
        // NPF formula: shutter = (35 × aperture + 30 × pixel_size) / focal_length
        if (aperture && pixelSize) {
            maxShutter = (35 * aperture + 30 * pixelSize) / effectiveFocal;
        }
        else {
            maxShutter = 0;
        }
    }
    let shutterText = '';
    if (maxShutter < 1) {
        const denominator = Math.round(1 / maxShutter);
        shutterText = `1/${denominator} сек`;
    }
    else {
        shutterText = `${Math.round(maxShutter)} сек`;
    }
    let tips = '';
    if (maxShutter > 30) {
        tips = 'Используйте интервалометр или Bulb-режим';
    }
    else if (maxShutter > 1) {
        tips = 'Можно снимать с рук или на штативе';
    }
    else {
        tips = 'Требуется штатив и высокое ISO';
    }
    return [
        { value: Math.round(maxShutter * 100) / 100, label: 'Максимальная выдержка (сек)' },
        { value: shutterText, label: 'Рекомендуемая выдержка' },
        { value: tips, label: 'Советы' }
    ];
},
}
