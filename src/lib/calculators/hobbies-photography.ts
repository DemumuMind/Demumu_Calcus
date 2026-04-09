import { Calculator } from '../types';

// Калькулятор экспозиции (время выдержки)
export const exposureCalculator: Calculator = {
  id: 'exposure',
  slug: 'vyderzhka',
  title: 'Выдержка и экспозиция',
  description: 'Расчёт выдержки, диафрагмы и ISO для правильной экспозиции фотографии',
  category: 'hobbi',
  subcategory: 'hobbi-photo',
  type: 'formula',
  inputs: [
    {
      name: 'baseShutter',
      label: 'Базовая выдержка (сек)',
      type: 'number',
      placeholder: '1/125',
      defaultValue: 0.008
    },
    {
      name: 'baseAperture',
      label: 'Базовая диафрагма (f/)',
      type: 'number',
      placeholder: '5.6',
      defaultValue: 5.6
    },
    {
      name: 'baseISO',
      label: 'Базовое ISO',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'newAperture',
      label: 'Новая диафрагма (f/)',
      type: 'number',
      placeholder: '2.8',
      defaultValue: 2.8
    },
    {
      name: 'newISO',
      label: 'Новое ISO',
      type: 'number',
      placeholder: '400',
      defaultValue: 400
    }
  ],
  outputs: [
    { name: 'newShutter', label: 'Новая выдержка', type: 'text' },
    { name: 'exposureValue', label: 'Изменение экспозиции (EV)', type: 'number' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
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
    
    // Exposure value change from aperture
    const apertureEV = Math.log2(Math.pow(newAperture / baseAperture, 2));
    
    // Exposure value change from ISO
    const isoEV = Math.log2(newISO / baseISO);
    
    // Total EV change
    const totalEV = apertureEV + isoEV;
    
    // New shutter speed
    const newShutterSeconds = baseShutter / Math.pow(2, totalEV);
    
    // Format shutter speed
    let shutterText = '';
    if (newShutterSeconds < 1) {
      const denominator = Math.round(1 / newShutterSeconds);
      shutterText = `1/${denominator} сек`;
    } else {
      shutterText = `${Math.round(newShutterSeconds * 10) / 10} сек`;
    }
    
    // Recommendation
    let recommendation = '';
    if (newShutterSeconds < 1/500) {
      recommendation = 'Очень короткая выдержка - заморозит движение';
    } else if (newShutterSeconds < 1/60) {
      recommendation = 'Короткая выдержка - подходит для ручной съёмки';
    } else if (newShutterSeconds < 1/15) {
      recommendation = 'Средняя выдержка - используйте штатив';
    } else {
      recommendation = 'Длинная выдержка - обязателен штатив';
    }
    
    return [
      { value: shutterText, label: 'Новая выдержка' },
      { value: Math.round(totalEV * 10) / 10, label: 'Изменение экспозиции (EV)' },
      { value: recommendation, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Введите базовые параметры экспозиции (выдержку, диафрагму, ISO) и новые значения диафрагмы и ISO. Калькулятор рассчитает необходимую выдержку.',
    about: 'Правило экспозиции: при закрытии диафрагмы на одно значение (например, f/2.8 → f/4) нужно удвоить выдержку или ISO для сохранения экспозиции.',
    formula: 'EV = log₂(f²/t) - log₂(ISO/100), где f - диафрагма, t - выдержка',
    usage: 'Используется для расчёта настроек камеры при изменении условий съёмки.',
    faq: [
      {
        question: 'Что такое EV (Exposure Value)?',
        answer: 'EV - число, характеризующее экспозицию. Каждое изменение на 1 EV соответствует удвоению или уменьшению вдвое количества света.'
      }
    ],
    sources: [
      { title: 'Экспозиция в фотографии', url: 'https://ru.wikipedia.org/wiki/Экспозиция_(фотография)' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор глубины резкости
export const depthOfFieldCalculator: Calculator = {
  id: 'depth-of-field',
  slug: 'glubina-rezkosti',
  title: 'Глубина резкости',
  description: 'Расчёт глубины резкости (DOF) на основе фокусного расстояния, диафрагмы и расстояния до объекта',
  category: 'hobbi',
  subcategory: 'hobbi-photo',
  type: 'formula',
  inputs: [
    {
      name: 'focalLength',
      label: 'Фокусное расстояние (мм)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50
    },
    {
      name: 'aperture',
      label: 'Диафрагма (f/)',
      type: 'number',
      placeholder: '2.8',
      defaultValue: 2.8
    },
    {
      name: 'distance',
      label: 'Расстояние до объекта (м)',
      type: 'number',
      placeholder: '3',
      defaultValue: 3
    },
    {
      name: 'sensorSize',
      label: 'Размер сенсора',
      type: 'select',
      options: [
        { value: 'fullframe', label: 'Full Frame (35mm)' },
        { value: 'apsc', label: 'APS-C (1.5x/1.6x)' },
        { value: 'm43', label: 'Micro 4/3 (2x)' },
        { value: '1inch', label: '1" (2.7x)' }
      ],
      defaultValue: 'fullframe'
    }
  ],
  outputs: [
    { name: 'nearLimit', label: 'Ближняя граница (м)', type: 'number' },
    { name: 'farLimit', label: 'Дальняя граница (м)', type: 'number' },
    { name: 'totalDOF', label: 'Глубина резкости (м)', type: 'number' },
    { name: 'hyperfocal', label: 'Гиперфокальное расстояние (м)', type: 'number' }
  ],
  calculate: (inputs) => {
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
    
    // Circle of confusion based on sensor size (mm)
    const cocValues: Record<string, number> = {
      fullframe: 0.029,
      apsc: 0.019,
      m43: 0.015,
      '1inch': 0.011
    };
    
    const coc = cocValues[sensorSize] || 0.029;
    
    // Hyperfocal distance (m)
    const hyperfocal = (focalLength * focalLength) / (aperture * coc) + focalLength;
    const hyperfocalM = hyperfocal / 1000;
    
    // DOF calculation
    const H = hyperfocalM;
    const D = distance;
    
    const nearLimit = (H * D) / (H + D);
    let farLimit = (H * D) / (H - D);
    if (farLimit < 0 || !isFinite(farLimit)) farLimit = Infinity;
    
    const totalDOF = farLimit === Infinity ? Infinity : farLimit - nearLimit;
    
    return [
      { value: Math.round(nearLimit * 100) / 100, label: 'Ближняя граница (м)' },
      { value: farLimit === Infinity ? '∞' : Math.round(farLimit * 100) / 100, label: 'Дальняя граница (м)' },
      { value: totalDOF === Infinity ? '∞' : Math.round(totalDOF * 100) / 100, label: 'Глубина резкости (м)' },
      { value: Math.round(hyperfocalM * 100) / 100, label: 'Гиперфокальное расстояние (м)' }
    ];
  },
  content: {
    howTo: 'Введите фокусное расстояние объектива, диафрагму, расстояние до объекта и выберите размер сенсора камеры.',
    about: 'Глубина резкости (DOF) - диапазон расстояний, в пределах которого объекты выглядят резкими на фотографии.',
    formula: 'H = (f² / N×c) + f, где H - гиперфокальное расстояние, f - фокусное расстояние, N - диафрагма, c - кружок нерезкости',
    usage: 'Помогает контролировать размытие фона (боке) и определять, какая часть сцены будет резкой.',
    faq: [
      {
        question: 'Как получить размытый фон (боке)?',
        answer: 'Используйте большую диафрагму (f/1.4-f/2.8), длинное фокусное расстояние (85mm+), и снимайте на близком расстоянии.'
      }
    ],
    sources: [
      { title: 'Глубина резкости', url: 'https://ru.wikipedia.org/wiki/Глубина_резкости' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор поля зрения (угол обзора)
export const fieldOfViewCalculator: Calculator = {
  id: 'field-of-view',
  slug: 'ugol-obzora',
  title: 'Угол обзора объектива',
  description: 'Расчёт горизонтального, вертикального и диагонального угла обзора объектива',
  category: 'hobbi',
  subcategory: 'hobbi-photo',
  type: 'formula',
  inputs: [
    {
      name: 'focalLength',
      label: 'Фокусное расстояние (мм)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50
    },
    {
      name: 'sensorSize',
      label: 'Размер сенсора',
      type: 'select',
      options: [
        { value: 'fullframe', label: 'Full Frame (36×24mm)' },
        { value: 'apsc_canon', label: 'APS-C Canon (22.2×14.8mm)' },
        { value: 'apsc_nikon', label: 'APS-C Nikon/Sony (23.5×15.6mm)' },
        { value: 'm43', label: 'Micro 4/3 (17.3×13mm)' }
      ],
      defaultValue: 'fullframe'
    }
  ],
  outputs: [
    { name: 'horizontalFOV', label: 'Горизонтальный угол (°)', type: 'number' },
    { name: 'verticalFOV', label: 'Вертикальный угол (°)', type: 'number' },
    { name: 'diagonalFOV', label: 'Диагональный угол (°)', type: 'number' },
    { name: 'equivalent35mm', label: 'Эквивалент на FF (мм)', type: 'number' }
  ],
  calculate: (inputs) => {
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
    
    // Sensor dimensions (width, height) in mm
    const sensorDimensions: Record<string, [number, number]> = {
      fullframe: [36, 24],
      apsc_canon: [22.2, 14.8],
      apsc_nikon: [23.5, 15.6],
      m43: [17.3, 13]
    };
    
    const [sensorW, sensorH] = sensorDimensions[sensorSize] || [36, 24];
    const sensorDiag = Math.sqrt(sensorW ** 2 + sensorH ** 2);
    
    // Calculate angles: angle = 2 × arctan(sensor_dimension / (2 × focal_length))
    const horizontalFOV = 2 * Math.atan(sensorW / (2 * focalLength)) * (180 / Math.PI);
    const verticalFOV = 2 * Math.atan(sensorH / (2 * focalLength)) * (180 / Math.PI);
    const diagonalFOV = 2 * Math.atan(sensorDiag / (2 * focalLength)) * (180 / Math.PI);
    
    // 35mm equivalent focal length
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
  content: {
    howTo: 'Введите фокусное расстояние объектива и выберите размер сенсора камеры.',
    about: 'Угол обзора показывает, какую часть сцены захватывает объектив. Широкоугольные объективы (10-35mm) имеют большой угол, телеобъективы (85mm+) - маленький.',
    formula: 'Угол = 2 × arctan(размер сенсора / (2 × фокусное расстояние))',
    usage: 'Помогает выбрать подходящий объектив для съёмки пейзажей (широкий угол) или портретов (узкий угол).',
    faq: [
      {
        question: 'Что такое эквивалентное фокусное расстояние?',
        answer: 'Это фокусное расстояние, которое дало бы такой же угол обзора на полнокадровой камере (Full Frame). Например, 35mm на APS-C ≈ 50mm на FF.'
      }
    ],
    sources: [
      { title: 'Угол обзора', url: 'https://ru.wikipedia.org/wiki/Угол_обзора' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор звёздных trails (выдержка для звёзд)
export const starTrailsCalculator: Calculator = {
  id: 'star-trails',
  slug: 'zvezdy-vyderzhka',
  title: 'Выдержка для звёзд',
  description: 'Расчёт максимальной выдержки для съёмки звёзд без смазывания (правило 500, 600, NPF)',
  category: 'hobbi',
  subcategory: 'hobbi-photo',
  type: 'formula',
  inputs: [
    {
      name: 'focalLength',
      label: 'Фокусное расстояние (мм)',
      type: 'number',
      placeholder: '20',
      defaultValue: 20
    },
    {
      name: 'sensorSize',
      label: 'Размер сенсора',
      type: 'select',
      options: [
        { value: 'fullframe', label: 'Full Frame' },
        { value: 'apsc', label: 'APS-C' },
        { value: 'm43', label: 'Micro 4/3' }
      ],
      defaultValue: 'fullframe'
    },
    {
      name: 'method',
      label: 'Метод расчёта',
      type: 'select',
      options: [
        { value: '500', label: 'Правило 500 (классика)' },
        { value: '600', label: 'Правило 600 (поправка)' },
        { value: 'npf', label: 'NPF (точный)' }
      ],
      defaultValue: '500'
    },
    {
      name: 'aperture',
      label: 'Диафрагма (f/) для NPF',
      type: 'number',
      placeholder: '2.8',
      defaultValue: 2.8
    },
    {
      name: 'pixelSize',
      label: 'Размер пикселя (мкм) для NPF',
      type: 'number',
      placeholder: '5.9',
      defaultValue: 5.9
    }
  ],
  outputs: [
    { name: 'maxShutter', label: 'Максимальная выдержка (сек)', type: 'text' },
    { name: 'shutterText', label: 'Рекомендуемая выдержка', type: 'text' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs) => {
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
    
    // Crop factors
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
    } else if (method === '600') {
      maxShutter = 600 / effectiveFocal;
    } else if (method === 'npf') {
      // NPF formula: shutter = (35 × aperture + 30 × pixel_size) / focal_length
      if (aperture && pixelSize) {
        maxShutter = (35 * aperture + 30 * pixelSize) / effectiveFocal;
      } else {
        maxShutter = 0;
      }
    }
    
    // Format shutter speed
    let shutterText = '';
    if (maxShutter < 1) {
      const denominator = Math.round(1 / maxShutter);
      shutterText = `1/${denominator} сек`;
    } else {
      shutterText = `${Math.round(maxShutter)} сек`;
    }
    
    // Tips
    let tips = '';
    if (maxShutter > 30) {
      tips = 'Используйте интервалометр или Bulb-режим';
    } else if (maxShutter > 1) {
      tips = 'Можно снимать с рук или на штативе';
    } else {
      tips = 'Требуется штатив и высокое ISO';
    }
    
    return [
      { value: Math.round(maxShutter * 100) / 100, label: 'Максимальная выдержка (сек)' },
      { value: shutterText, label: 'Рекомендуемая выдержка' },
      { value: tips, label: 'Советы' }
    ];
  },
  content: {
    howTo: 'Введите фокусное расстояние, размер сенсора и выберите метод расчёта. Для метода NPF также укажите диафрагму и размер пикселя.',
    about: 'При съёмке звёзд Земля вращается, и при длинных выдержках звёзды превращаются в полосы. Эти правила помогают рассчитать максимальную выдержку.',
    formula: 'Правило 500: выдержка = 500 / (фокусное × кроп-фактор). NPF: более точная формула с учётом диафрагмы и размера пикселя.',
    usage: 'Используется для астрофотографии, съёмки Млечного Пути, звёздного неба.',
    faq: [
      {
        question: 'Какое правило точнее?',
        answer: 'NPF - самое точное, учитывает характеристики камеры. Правило 500 - консервативное (безопасное). Правило 600 - позволяет более длинные выдержки.'
      }
    ],
    sources: [
      { title: 'Астрофотография', url: 'https://ru.wikipedia.org/wiki/Астрофотография' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор макросъёмки (увеличение)
export const macroCalculator: Calculator = {
  id: 'macro',
  slug: 'macrosyomka',
  title: 'Макросъёмка (увеличение)',
  description: 'Расчёт увеличения макрообъектива, рабочего расстояния и размера объекта в кадре',
  category: 'hobbi',
  subcategory: 'hobbi-photo',
  type: 'formula',
  inputs: [
    {
      name: 'focalLength',
      label: 'Фокусное расстояние (мм)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'minFocus',
      label: 'Минимальная дистанция фокусировки (см)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30
    },
    {
      name: 'sensorWidth',
      label: 'Ширина сенсора (мм)',
      type: 'number',
      placeholder: '36',
      defaultValue: 36
    }
  ],
  outputs: [
    { name: 'magnification', label: 'Увеличение (×)', type: 'number' },
    { name: 'subjectSize', label: 'Размер объекта в кадре (мм)', type: 'number' },
    { name: 'workingDistance', label: 'Рабочее расстояние (см)', type: 'number' },
    { name: 'classification', label: 'Классификация', type: 'text' }
  ],
  calculate: (inputs) => {
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
    // For minimum focus distance: u ≈ minFocus (in mm)
    const u = minFocus * 10; // convert to mm
    const magnification = focalLength / (u - focalLength);
    
    // Subject size that fills the frame
    const subjectSize = sensorWidth / magnification;
    
    // Working distance (rough approximation)
    const workingDistance = minFocus - (focalLength / 10); // minus lens length approx
    
    // Classification
    let classification = '';
    if (magnification < 0.25) {
      classification = 'Почти макро (1:4)';
    } else if (magnification < 0.5) {
      classification = 'Полумакро (1:2)';
    } else if (magnification < 1) {
      classification = 'Макро (1:1.5 - 1:1)';
    } else {
      classification = 'Настоящий макро (1:1 и более)';
    }
    
    return [
      { value: Math.round(magnification * 100) / 100, label: 'Увеличение (×)' },
      { value: Math.round(subjectSize), label: 'Размер объекта в кадре (мм)' },
      { value: Math.round(workingDistance * 10) / 10, label: 'Рабочее расстояние (см)' },
      { value: classification, label: 'Классификация' }
    ];
  },
  content: {
    howTo: 'Введите фокусное расстояние макрообъектива, минимальную дистанцию фокусировки и ширину сенсора.',
    about: 'Макрообъективы позволяют снимать мелкие объекты крупным планом. Настоящий макро - это увеличение 1:1 (объект на сенсоре того же размера, что и в реальности).',
    formula: 'Увеличение = фокусное расстояние / (расстояние до объекта - фокусное расстояние)',
    usage: 'Используется для съёмки насекомых, цветов, деталей, ювелирных изделий.',
    faq: [
      {
        question: 'Что означает увеличение 1:1?',
        answer: 'Это означает, что объект проецируется на сенсор в натуральную величину. Например, жук длиной 10 мм займёт 10 мм на сенсоре.'
      }
    ],
    sources: [
      { title: 'Макросъёмка', url: 'https://ru.wikipedia.org/wiki/Макросъёмка' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор размеров печати
export const printSizeCalculator: Calculator = {
  id: 'print-size',
  slug: 'razmer-pechati',
  title: 'Размеры печати фото',
  description: 'Расчёт оптимальных размеров печати на основе разрешения файла и требуемого PPI',
  category: 'hobbi',
  subcategory: 'hobbi-photo',
  type: 'formula',
  inputs: [
    {
      name: 'width',
      label: 'Ширина изображения (пиксели)',
      type: 'number',
      placeholder: '6000',
      defaultValue: 6000
    },
    {
      name: 'height',
      label: 'Высота изображения (пиксели)',
      type: 'number',
      placeholder: '4000',
      defaultValue: 4000
    },
    {
      name: 'targetPPI',
      label: 'Целевой PPI',
      type: 'select',
      options: [
        { value: '300', label: '300 PPI (фотокачество)' },
        { value: '200', label: '200 PPI (хорошее качество)' },
        { value: '150', label: '150 PPI (постеры)' },
        { value: '100', label: '100 PPI (баннеры)' }
      ],
      defaultValue: '300'
    }
  ],
  outputs: [
    { name: 'maxWidth', label: 'Макс. ширина (см)', type: 'number' },
    { name: 'maxHeight', label: 'Макс. высота (см)', type: 'number' },
    { name: 'maxWidthInch', label: 'Макс. ширина (дюймы)', type: 'number' },
    { name: 'maxHeightInch', label: 'Макс. высота (дюймы)', type: 'number' },
    { name: 'megapixels', label: 'Мегапиксели', type: 'number' }
  ],
  calculate: (inputs) => {
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
    
    // Calculate max print sizes
    const maxWidthInch = width / targetPPI;
    const maxHeightInch = height / targetPPI;
    
    const maxWidthCm = maxWidthInch * 2.54;
    const maxHeightCm = maxHeightInch * 2.54;
    
    // Megapixels
    const megapixels = (width * height) / 1000000;
    
    return [
      { value: Math.round(maxWidthCm * 10) / 10, label: 'Макс. ширина (см)' },
      { value: Math.round(maxHeightCm * 10) / 10, label: 'Макс. высота (см)' },
      { value: Math.round(maxWidthInch * 10) / 10, label: 'Макс. ширина (дюймы)' },
      { value: Math.round(maxHeightInch * 10) / 10, label: 'Макс. высота (дюймы)' },
      { value: Math.round(megapixels * 10) / 10, label: 'Мегапиксели' }
    ];
  },
  content: {
    howTo: 'Введите разрешение вашего изображения в пикселях и выберите целевое качество печати (PPI).',
    about: 'Для фотокачественной печати требуется 300 PPI. Для постеров и баннеров, которые смотрят издалека, достаточно 100-150 PPI.',
    formula: 'Размер печати (дюймы) = разрешение (пиксели) / PPI',
    usage: 'Используется для определения, можно ли напечатать фото нужного размера без потери качества.',
    faq: [
      {
        question: 'Сколько мегапикселей нужно для печати А4?',
        answer: 'Для А4 (21×30 см) при 300 PPI нужно примерно 8-9 мегапикселей (около 3500×2500 пикселей).'
      }
    ],
    sources: [
      { title: 'Цифровая печать', url: 'https://ru.wikipedia.org/wiki/Цифровая_печать' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор светосилы (f-stop)
export const apertureCalculator: Calculator = {
  id: 'aperture',
  slug: 'svetosila',
  title: 'Светосила (f-stop)',
  description: 'Расчёт изменения светосилы при разных значениях диафрагмы',
  category: 'hobbi',
  subcategory: 'hobbi-photo',
  type: 'formula',
  inputs: [
    {
      name: 'baseAperture',
      label: 'Базовая диафрагма (f/)',
      type: 'select',
      options: [
        { value: '1.4', label: 'f/1.4' },
        { value: '2', label: 'f/2' },
        { value: '2.8', label: 'f/2.8' },
        { value: '4', label: 'f/4' },
        { value: '5.6', label: 'f/5.6' },
        { value: '8', label: 'f/8' },
        { value: '11', label: 'f/11' },
        { value: '16', label: 'f/16' },
        { value: '22', label: 'f/22' }
      ],
      defaultValue: '2.8'
    },
    {
      name: 'newAperture',
      label: 'Новая диафрагма (f/)',
      type: 'select',
      options: [
        { value: '1.4', label: 'f/1.4' },
        { value: '2', label: 'f/2' },
        { value: '2.8', label: 'f/2.8' },
        { value: '4', label: 'f/4' },
        { value: '5.6', label: 'f/5.6' },
        { value: '8', label: 'f/8' },
        { value: '11', label: 'f/11' },
        { value: '16', label: 'f/16' },
        { value: '22', label: 'f/22' }
      ],
      defaultValue: '8'
    }
  ],
  outputs: [
    { name: 'stops', label: 'Разница в стопах (EV)', type: 'number' },
    { name: 'lightFactor', label: 'Множитель света', type: 'text' },
    { name: 'exposureChange', label: 'Изменение экспозиции', type: 'text' }
  ],
  calculate: (inputs) => {
    const baseAperture = Number(inputs.baseAperture);
    const newAperture = Number(inputs.newAperture);
    
    if (!baseAperture || !newAperture) {
      return [
        { value: '—', label: 'Разница в стопах (EV)' },
        { value: '—', label: 'Множитель света' },
        { value: '—', label: 'Изменение экспозиции' }
      ];
    }
    
    // Calculate stops difference: 2 × log₂(new/base)
    const stops = 2 * Math.log2(newAperture / baseAperture);
    
    // Light factor
    const lightFactor = Math.pow(2, Math.abs(stops));
    
    // Exposure change description
    let exposureChange = '';
    if (stops > 0) {
      exposureChange = `Требуется увеличить экспозицию в ${Math.round(lightFactor)}× (ISO или выдержка)`;
    } else if (stops < 0) {
      exposureChange = `Требуется уменьшить экспозицию в ${Math.round(lightFactor)}×`;
    } else {
      exposureChange = 'Экспозиция не меняется';
    }
    
    return [
      { value: Math.round(stops), label: 'Разница в стопах (EV)' },
      { value: `${Math.round(lightFactor)}×`, label: 'Множитель света' },
      { value: exposureChange, label: 'Изменение экспозиции' }
    ];
  },
  content: {
    howTo: 'Выберите базовую и новую диафрагму. Калькулятор покажет разницу в светосиле.',
    about: 'Каждое значение диафрагмы (f-stop) отличается от соседнего в 2 раза по количеству света. Ряд: f/1.4 → f/2 → f/2.8 → f/4 → f/5.6 → f/8...',
    formula: 'Разница в стопах = 2 × log₂(f₂/f₁)',
    usage: 'Помогает понять, насколько нужно изменить ISO или выдержку при смене диафрагмы.',
    faq: [
      {
        question: 'Почему числа диафрагмы такие странные?',
        answer: 'Ряд f-stop построен так, что каждое следующее число уменьшает площадь отверстия в 2 раза. Это основано на √2 ≈ 1.414.'
      }
    ],
    sources: [
      { title: 'Диафрагма', url: 'https://ru.wikipedia.org/wiki/Диафрагма_(оптика)' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор HDR (брекетинг)
export const hdrBracketingCalculator: Calculator = {
  id: 'hdr-bracketing',
  slug: 'hdr-breketing',
  title: 'HDR брекетинг',
  description: 'Расчёт настроек для съёмки HDR (High Dynamic Range) с брекетингом экспозиции',
  category: 'hobbi',
  subcategory: 'hobbi-photo',
  type: 'formula',
  inputs: [
    {
      name: 'evRange',
      label: 'Диапазон сцены (EV)',
      type: 'number',
      placeholder: '12',
      defaultValue: 12
    },
    {
      name: 'evStep',
      label: 'Шаг брекетинга (EV)',
      type: 'select',
      options: [
        { value: '1', label: '1 EV' },
        { value: '2', label: '2 EV' },
        { value: '3', label: '3 EV' }
      ],
      defaultValue: '2'
    },
    {
      name: 'baseISO',
      label: 'Базовое ISO',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    }
  ],
  outputs: [
    { name: 'numFrames', label: 'Количество кадров', type: 'number' },
    { name: 'settings', label: 'Рекомендуемые настройки', type: 'text' },
    { name: 'isoRange', label: 'Диапазон ISO', type: 'text' },
    { name: 'tips', label: 'Советы', type: 'text' }
  ],
  calculate: (inputs) => {
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
    
    // Calculate number of frames
    const numFrames = Math.ceil((evRange + 2) / evStep);
    
    // ISO range
    const minISO = Math.max(100, baseISO / Math.pow(2, evRange / 2));
    const maxISO = Math.min(12800, baseISO * Math.pow(2, evRange / 2));
    
    // Settings recommendation
    let settings = '';
    if (numFrames <= 3) {
      settings = 'Брекетинг: -2/0/+2 EV или -3/0/+3 EV';
    } else if (numFrames <= 5) {
      settings = 'Брекетинг: -4/-2/0/+2/+4 EV или -2/0/+2 с разными ISO';
    } else {
      settings = 'Требуется сложный брекетинг или съёмка с разными ISO';
    }
    
    // Tips
    let tips = '';
    if (evRange > 15) {
      tips = 'Очень широкий динамический диапазон. Рассмотрите съёмку в разное время суток.';
    } else {
      tips = 'Используйте штатив и интервалометр для точной синхронизации.';
    }
    
    return [
      { value: numFrames, label: 'Количество кадров' },
      { value: settings, label: 'Рекомендуемые настройки' },
      { value: `${Math.round(minISO)} - ${Math.round(maxISO)}`, label: 'Диапазон ISO' },
      { value: tips, label: 'Советы' }
    ];
  },
  content: {
    howTo: 'Введите примерный динамический диапазон сцены в EV (например, от теней до неба), выберите шаг брекетинга.',
    about: 'HDR (High Dynamic Range) - техника объединения нескольких кадров с разной экспозицией для получения деталей и в тенях, и в светах.',
    usage: 'Используется для съёмки контрастных сцен: пейзажи с ярким небом, интерьеры с окнами, ночные города.',
    faq: [
      {
        question: 'Сколько кадров нужно для HDR?',
        answer: 'Обычно 3-5 кадров с шагом 2 EV достаточно для большинства сцен. Для очень контрастных сцен может понадобиться 7+ кадров.'
      }
    ],
    sources: [
      { title: 'High Dynamic Range Imaging', url: 'https://en.wikipedia.org/wiki/High-dynamic-range_imaging' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор размытия фона (боке)
export const bokehCalculator: Calculator = {
  id: 'bokeh',
  slug: 'bokeh-razmytie',
  title: 'Размытие фона (боке)',
  description: 'Оценка силы размытия фона на основе диафрагмы, фокусного расстояния и расстояния до объекта',
  category: 'hobbi',
  subcategory: 'hobbi-photo',
  type: 'formula',
  inputs: [
    {
      name: 'focalLength',
      label: 'Фокусное расстояние (мм)',
      type: 'number',
      placeholder: '85',
      defaultValue: 85
    },
    {
      name: 'aperture',
      label: 'Диафрагма (f/)',
      type: 'number',
      placeholder: '1.8',
      defaultValue: 1.8
    },
    {
      name: 'subjectDistance',
      label: 'Расстояние до объекта (м)',
      type: 'number',
      placeholder: '2',
      defaultValue: 2
    },
    {
      name: 'backgroundDistance',
      label: 'Расстояние до фона (м)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10
    }
  ],
  outputs: [
    { name: 'blurAmount', label: 'Сила размытия (мм)', type: 'number' },
    { name: 'blurRating', label: 'Оценка боке', type: 'text' },
    { name: 'recommendation', label: 'Рекомендации', type: 'text' }
  ],
  calculate: (inputs) => {
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
    
    // Calculate circle of confusion at background (approximate)
    // blur = (focal_length² × (bg_distance - subject_distance)) / (aperture × subject_distance × bg_distance)
    const blurAmount = (focalLength ** 2 * (backgroundDistance - subjectDistance)) / 
                       (aperture * subjectDistance * backgroundDistance * 100); // convert to mm
    
    // Rating
    let blurRating = '';
    if (blurAmount < 0.1) {
      blurRating = 'Слабое размытие';
    } else if (blurAmount < 0.3) {
      blurRating = 'Умеренное размытие';
    } else if (blurAmount < 0.5) {
      blurRating = 'Хорошее размытие';
    } else {
      blurRating = 'Отличное размытие (кремовое боке)';
    }
    
    // Recommendations
    let recommendation = '';
    if (blurAmount < 0.2) {
      recommendation = 'Для усиления боке: используйте более длинное фокусное расстояние или снимайте ближе к объекту';
    } else {
      recommendation = 'Отличные условия для портретной съёмки с красивым фоном';
    }
    
    return [
      { value: Math.round(blurAmount * 100) / 100, label: 'Сила размытия (мм)' },
      { value: blurRating, label: 'Оценка боке' },
      { value: recommendation, label: 'Рекомендации' }
    ];
  },
  content: {
    howTo: 'Введите параметры съёмки: фокусное расстояние, диафрагму, расстояние до объекта и фона.',
    about: 'Боке (bokeh) - художественное качество размытия фона. Сильное боке достигается большой диафрагмой, длинным фокусным расстоянием и близким расстоянием до объекта.',
    formula: 'Сила размытия ∝ (focal_length²) / (aperture × distance)',
    usage: 'Используется для портретной съёмки, когда нужно отделить объект от фона.',
    faq: [
      {
        question: 'Как получить "кремовое" боке?',
        answer: 'Используйте объектив 85mm f/1.4 или 135mm f/2, снимайте на минимальном расстоянии фокусировки с удалённым фоном.'
      }
    ],
    sources: [
      { title: 'Боке', url: 'https://ru.wikipedia.org/wiki/Боке' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const hobbiesPhotographyCalculators: Calculator[] = [
  exposureCalculator,
  depthOfFieldCalculator,
  fieldOfViewCalculator,
  starTrailsCalculator,
  macroCalculator,
  printSizeCalculator,
  apertureCalculator,
  hdrBracketingCalculator,
  bokehCalculator,
];
