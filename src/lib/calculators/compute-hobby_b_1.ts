import type { ComputeFn } from './compute-helpers';

export const computeMap_hobby_b_1: Record<string, ComputeFn> = {
  'macrosyomka': (inputs) => {
    const focalLength = Number(inputs.focalLength);
    const minFocus = Number(inputs.minFocus);
    const sensorWidth = Number(inputs.sensorWidth);
    if (!focalLength || !minFocus) {
        return [
            { value: '—', label: 'Увеличение (×)' },
            { value: '—', label: 'Размер объекта в кадре (мм)' },
            { value: '—', label: 'Рабочее расстояние (см)' },
            { value: '', label: 'Классификация' }
        ];
    }
    // Approximate magnification formula: M = f / (u - f), where u is object distance
    const u = minFocus * 10; // convert to mm
    const magnification = focalLength / (u - focalLength);
    const subjectSize = sensorWidth / magnification;
    const workingDistance = minFocus - (focalLength / 10); // minus lens length approx
    let classification = '';
    if (magnification < 0.25) {
        classification = 'Почти макро (1:4)';
    }
    else if (magnification < 0.5) {
        classification = 'Полумакро (1:2)';
    }
    else if (magnification < 1) {
        classification = 'Макро (1:1.5 - 1:1)';
    }
    else {
        classification = 'Настоящий макро (1:1 и более)';
    }
    return [
        { value: Math.round(magnification * 100) / 100, label: 'Увеличение (×)' },
        { value: Math.round(subjectSize), label: 'Размер объекта в кадре (мм)' },
        { value: Math.round(workingDistance * 10) / 10, label: 'Рабочее расстояние (см)' },
        { value: classification, label: 'Классификация' }
    ];
},
  'miks-balanss': (inputs) => {
    const genre = String(inputs.genre);
    const balances: Record<string, string[]> = {
        pop: [
            '0 dB (референс)',
            '-3 dB',
            '-6 dB',
            '-3 dB (соло: 0 dB)',
            '-9 dB',
            '-9 dB',
            '-12 dB до -18 dB'
        ],
        rock: [
            '0 dB',
            '-2 dB',
            '-4 dB',
            '-4 dB',
            '-6 dB',
            '-10 dB',
            '-14 dB'
        ],
        electronic: [
            '0 dB',
            '-4 dB',
            '-3 dB',
            '-5 dB',
            'Вариативно',
            '-8 dB',
            '-12 dB'
        ],
        jazz: [
            '-6 dB',
            '-4 dB',
            '-3 dB',
            '-2 dB',
            '-8 dB',
            '-6 dB',
            '-15 dB (естественная)'
        ],
        classical: [
            'Нет фиксированного',
            'Нет фиксированного',
            'Нет фиксированного',
            'Динамический диапазон',
            'Нет фиксированного',
            'Нет фиксированного',
            'Естественная акустика'
        ]
    };
    const result = balances[genre] || balances.pop;
    return [
        { value: result[0], label: 'Бочка (Kick)' },
        { value: result[1], label: 'Малый барабан' },
        { value: result[2], label: 'Бас-гитара' },
        { value: result[3], label: 'Вокал' },
        { value: result[4], label: 'Гитары' },
        { value: result[5], label: 'Клавишные' },
        { value: result[6], label: 'Реверберация' }
    ];
},
  'nastrojka-gitary': (inputs) => {
    const tuning = String(inputs.tuning);
    const tunings: Record<string, string[]> = {
        standard: ['E4 - 329.63 Hz', 'B3 - 246.94 Hz', 'G3 - 196.00 Hz', 'D3 - 146.83 Hz', 'A2 - 110.00 Hz', 'E2 - 82.41 Hz'],
        drop_d: ['E4 - 329.63 Hz', 'B3 - 246.94 Hz', 'G3 - 196.00 Hz', 'D3 - 146.83 Hz', 'A2 - 110.00 Hz', 'D2 - 73.42 Hz'],
        half_step: ['D#4 - 311.13 Hz', 'A#3 - 233.08 Hz', 'F#3 - 185.00 Hz', 'C#3 - 138.59 Hz', 'G#2 - 103.83 Hz', 'D#2 - 77.78 Hz'],
        open_g: ['D4 - 293.66 Hz', 'B3 - 246.94 Hz', 'G3 - 196.00 Hz', 'D3 - 146.83 Hz', 'G2 - 98.00 Hz', 'D2 - 73.42 Hz'],
        dadgad: ['D4 - 293.66 Hz', 'A3 - 220.00 Hz', 'G3 - 196.00 Hz', 'D3 - 146.83 Hz', 'A2 - 110.00 Hz', 'D2 - 73.42 Hz'],
        open_e: ['E4 - 329.63 Hz', 'B3 - 246.94 Hz', 'G#3 - 207.65 Hz', 'E3 - 164.81 Hz', 'B2 - 123.47 Hz', 'E2 - 82.41 Hz']
    };
    const result = tunings[tuning] || tunings.standard;
    return [
        { value: result[0], label: '1-я струна (тонкая)' },
        { value: result[1], label: '2-я струна' },
        { value: result[2], label: '3-я струна' },
        { value: result[3], label: '4-я струна' },
        { value: result[4], label: '5-я струна' },
        { value: result[5], label: '6-я струна (толстая)' }
    ];
},
  'paint-calculator': (inputs): any => {
    const wallArea = Number(inputs.wallArea);
    const coats = Number(inputs.coats);
    const coverage = String(inputs.coverage);
    const totalArea = wallArea * coats;
    const paintVolume = Math.ceil(totalArea / Number(coverage) * 10) / 10;
    const cansNeeded = Math.ceil(paintVolume / 2.5);
    const pricePerLiter = coverage === '12' ? 450 : coverage === '10' ? 320 : 250;
    const totalCost = Math.ceil(paintVolume * pricePerLiter);
    return [
        { value: paintVolume, label: 'Объём краски', unit: 'л' },
        { value: cansNeeded, label: 'Количество банок', unit: 'шт' },
        { value: totalCost, label: 'Примерная стоимость', unit: '₽' }
    ];
},
  'quilt-calculator': (inputs): any => {
    const quiltWidth = Number(inputs.quiltWidth);
    const quiltLength = Number(inputs.quiltLength);
    const patchSize = Number(inputs.patchSize);
    const patchesPerRow = Math.ceil(quiltWidth / patchSize);
    const rows = Math.ceil(quiltLength / patchSize);
    const patchCount = patchesPerRow * rows;
    const fabricNeeded = Math.round(patchCount * (patchSize / 100) * (patchSize / 100) * 1.2 * 100) / 100;
    const estimatedTime = Math.round(patchCount * 0.15); // ~10 минут на лоскут
    return [
        { value: patchCount, label: 'Количество лоскутов', unit: 'шт' },
        { value: fabricNeeded, label: 'Ткани нужно', unit: 'м²' },
        { value: estimatedTime, label: 'Примерное время', unit: 'ч' }
    ];
},
  'razmer-audio': (inputs) => {
    const duration = Number(inputs.duration);
    const bitrate = Number(inputs.bitrate);
    if (!duration || !bitrate) {
        return [
            { value: '—', label: 'Размер файла (MB)' },
            { value: '—', label: 'Размер файла (KB)' },
            { value: '—', label: 'MB за минуту' },
            { value: '', label: 'Качество звука' }
        ];
    }
    // File size in KB = (bitrate * duration * 60) / 8
    const fileSizeKB = (bitrate * duration * 60) / 8;
    const fileSizeMB = fileSizeKB / 1024;
    const perMinute = fileSizeMB / duration;
    let quality = '';
    if (bitrate < 100) {
        quality = 'Телефонное/голосовое качество';
    }
    else if (bitrate < 160) {
        quality = 'Приемлемое для MP3';
    }
    else if (bitrate < 250) {
        quality = 'Хорошее качество';
    }
    else if (bitrate < 500) {
        quality = 'Отличное качество (прозрачное)';
    }
    else {
        quality = 'Профессиональное/студийное';
    }
    return [
        { value: Math.round(fileSizeMB * 100) / 100, label: 'Размер файла (MB)' },
        { value: Math.round(fileSizeKB), label: 'Размер файла (KB)' },
        { value: Math.round(perMinute * 100) / 100, label: 'MB за минуту' },
        { value: quality, label: 'Качество звука' }
    ];
},
  'razmer-pechati': (inputs) => {
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const targetPPI = Number(inputs.targetPPI);
    if (!width || !height || !targetPPI) {
        return [
            { value: '—', label: 'Макс. ширина (см)' },
            { value: '—', label: 'Макс. высота (см)' },
            { value: '—', label: 'Макс. ширина (дюймы)' },
            { value: '—', label: 'Макс. высота (дюймы)' },
            { value: '—', label: 'Мегапиксели' }
        ];
    }
    const maxWidthInch = width / targetPPI;
    const maxHeightInch = height / targetPPI;
    const maxWidthCm = maxWidthInch * 2.54;
    const maxHeightCm = maxHeightInch * 2.54;
    const megapixels = (width * height) / 1000000;
    return [
        { value: Math.round(maxWidthCm * 10) / 10, label: 'Макс. ширина (см)' },
        { value: Math.round(maxHeightCm * 10) / 10, label: 'Макс. высота (см)' },
        { value: Math.round(maxWidthInch * 10) / 10, label: 'Макс. ширина (дюймы)' },
        { value: Math.round(maxHeightInch * 10) / 10, label: 'Макс. высота (дюймы)' },
        { value: Math.round(megapixels * 10) / 10, label: 'Мегапиксели' }
    ];
},
  'svetosila': (inputs) => {
    const baseAperture = Number(inputs.baseAperture);
    const newAperture = Number(inputs.newAperture);
    if (!baseAperture || !newAperture) {
        return [
            { value: '—', label: 'Разница в стопах (EV)' },
            { value: '—', label: 'Множитель света' },
            { value: '—', label: 'Изменение экспозиции' }
        ];
    }
    const stops = 2 * Math.log2(newAperture / baseAperture);
    const lightFactor = Math.pow(2, Math.abs(stops));
    let exposureChange = '';
    if (stops > 0) {
        exposureChange = `Требуется увеличить экспозицию в ${Math.round(lightFactor)}× (ISO или выдержка)`;
    }
    else if (stops < 0) {
        exposureChange = `Требуется уменьшить экспозицию в ${Math.round(lightFactor)}×`;
    }
    else {
        exposureChange = 'Экспозиция не меняется';
    }
    return [
        { value: Math.round(stops), label: 'Разница в стопах (EV)' },
        { value: `${Math.round(lightFactor)}×`, label: 'Множитель света' },
        { value: exposureChange, label: 'Изменение экспозиции' }
    ];
},
  'tile-calculator': (inputs): any => {
    const roomLength = Number(inputs.roomLength);
    const roomWidth = Number(inputs.roomWidth);
    const tileLength = Number(inputs.tileLength);
    const tileWidth = Number(inputs.tileWidth);
    const waste = Number(inputs.waste);
    const roomArea = roomLength * roomWidth;
    const tileAreaM2 = (tileLength / 100) * (tileWidth / 100);
    const baseTiles = roomArea / tileAreaM2;
    const tilesWithWaste = baseTiles * (1 + waste / 100);
    const tilesNeeded = Math.ceil(tilesWithWaste);
    const totalTileArea = tilesNeeded * tileAreaM2;
    return [
        { value: Math.round(roomArea * 100) / 100, label: 'Площадь комнаты', unit: 'м²' },
        { value: tilesNeeded, label: 'Количество плитки', unit: 'шт' },
        { value: Math.round(totalTileArea * 100) / 100, label: 'Площадь плитки', unit: 'м²' }
    ];
},
  'ugol-obzora': (inputs) => {
    const focalLength = Number(inputs.focalLength);
    const sensorSize = String(inputs.sensorSize);
    if (!focalLength) {
        return [
            { value: '—', label: 'Горизонтальный угол (°)' },
            { value: '—', label: 'Вертикальный угол (°)' },
            { value: '—', label: 'Диагональный угол (°)' },
            { value: '—', label: 'Эквивалент на FF (мм)' }
        ];
    }
    const sensorDimensions: Record<string, [
        number,
        number
    ]> = {
        fullframe: [36, 24],
        apsc_canon: [22.2, 14.8],
        apsc_nikon: [23.5, 15.6],
        m43: [17.3, 13]
    };
    const [sensorW, sensorH] = sensorDimensions[sensorSize] || [36, 24];
    const sensorDiag = Math.sqrt(sensorW ** 2 + sensorH ** 2);
    const horizontalFOV = 2 * Math.atan(sensorW / (2 * focalLength)) * (180 / Math.PI);
    const verticalFOV = 2 * Math.atan(sensorH / (2 * focalLength)) * (180 / Math.PI);
    const diagonalFOV = 2 * Math.atan(sensorDiag / (2 * focalLength)) * (180 / Math.PI);
    const cropFactors: Record<string, number> = {
        fullframe: 1,
        apsc_canon: 1.62,
        apsc_nikon: 1.53,
        m43: 2
    };
    const cropFactor = cropFactors[sensorSize] || 1;
    const equivalent35mm = focalLength * cropFactor;
    return [
        { value: Math.round(horizontalFOV * 10) / 10, label: 'Горизонтальный угол (°)' },
        { value: Math.round(verticalFOV * 10) / 10, label: 'Вертикальный угол (°)' },
        { value: Math.round(diagonalFOV * 10) / 10, label: 'Диагональный угол (°)' },
        { value: Math.round(equivalent35mm), label: 'Эквивалент на FF (мм)' }
    ];
},
  'uroven-zvuka': (inputs) => {
    const spl = Number(inputs.spl);
    if (!spl) {
        return [
            { value: '—', label: 'Безопасное время (часов)' },
            { value: '—', label: 'Восприятие' },
            { value: '', label: 'Примеры' },
            { value: '', label: 'Предупреждение' }
        ];
    }
    // Safe exposure time (Niosh criterion: 85 dB for 8 hours, -3 dB per doubling)
    const safeTime = 8 / Math.pow(2, (spl - 85) / 3);
    let perception = '';
    if (spl < 60) {
        perception = 'Тихо';
    }
    else if (spl < 70) {
        perception = 'Нормальная речь';
    }
    else if (spl < 80) {
        perception = 'Громко';
    }
    else if (spl < 90) {
        perception = 'Очень громко';
    }
    else if (spl < 100) {
        perception = 'Неприятно громко';
    }
    else if (spl < 110) {
        perception = 'Болезненно громко';
    }
    else {
        perception = 'Опасно для слуха';
    }
    let examples = '';
    if (spl < 40)
        examples = 'Библиотека, спальня';
    else if (spl < 60)
        examples = 'Обычный офис, тихая музыка';
    else if (spl < 70)
        examples = 'Разговор, кондиционер';
    else if (spl < 80)
        examples = 'Шумный офис, дорожный трафик';
    else if (spl < 90)
        examples = 'Грузовик, мотоцикл, громкая музыка';
    else if (spl < 100)
        examples = 'Метро, рок-концерт';
    else if (spl < 110)
        examples = 'Рядом с барабанной установкой';
    else
        examples = 'Взлёт самолёта, выстрел';
    let warning = '';
    if (spl > 85) {
        warning = '⚠️ Риск повреждения слуха при длительном воздействии';
    }
    else if (spl > 100) {
        warning = '❌ Опасно! Используйте защиту слуха';
    }
    else {
        warning = '✅ Безопасный уровень';
    }
    return [
        { value: Math.round(safeTime * 10) / 10, label: 'Безопасное время (часов)' },
        { value: perception, label: 'Восприятие' },
        { value: examples, label: 'Примеры' },
        { value: warning, label: 'Предупреждение' }
    ];
},
}
