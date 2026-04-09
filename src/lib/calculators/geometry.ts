import { Calculator } from '../types';

// Площадь круга
export const circleAreaCalculator: Calculator = {
  id: 'circle-area',
  slug: 'ploshchad-kruga',
  title: 'Площадь круга',
  description: 'Расчёт площади круга по радиусу или диаметру',
  category: 'nauka-i-ucheba',
  subcategory: 'geometriya',
  type: 'formula',
  inputs: [
    {
      name: 'radius',
      label: 'Радиус (r)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    },
    {
      name: 'diameter',
      label: 'Диаметр (d)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    }
  ],
  outputs: [
    { name: 'area', label: 'Площадь', type: 'number', unit: 'м²' },
    { name: 'circumference', label: 'Длина окружности', type: 'number', unit: 'м' },
    { name: 'diameter', label: 'Диаметр', type: 'number', unit: 'м' }
  ],
  calculate: (inputs) => {
    const radius = Number(inputs.radius) || Number(inputs.diameter) / 2;
    if (!radius) return [{ value: '—', label: 'Результат' }];
    
    const area = Math.PI * radius * radius;
    const circumference = 2 * Math.PI * radius;
    const diameter = radius * 2;
    
    return [
      { value: area.toFixed(4), label: 'Площадь', unit: 'м²' },
      { value: circumference.toFixed(4), label: 'Длина окружности', unit: 'м' },
      { value: diameter.toFixed(4), label: 'Диаметр', unit: 'м' }
    ];
  },
  content: {
    howTo: 'Введите радиус или диаметр круга. Калькулятор вычислит площадь и длину окружности.',
    about: 'Площадь круга — это количество пространства внутри окружности. Вычисляется по формуле S = πr².',
    usage: 'Используется в строительстве, дизайне, инженерии для расчёта круглых элементов.',
    formula: 'S = π × r²\nДлина окружности: C = 2 × π × r',
    faq: [
      {
        question: 'Что такое число π (пи)?',
        answer: 'π ≈ 3.14159 — математическая константа, отношение длины окружности к диаметру.'
      }
    ],
    sources: [
      { title: 'Площадь круга — Википедия', url: 'https://ru.wikipedia.org/wiki/Круг' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Площадь треугольника
export const triangleAreaCalculator: Calculator = {
  id: 'triangle-area',
  slug: 'ploshchad-treugolnika',
  title: 'Площадь треугольника',
  description: 'Расчёт площади треугольника разными способами',
  category: 'nauka-i-ucheba',
  subcategory: 'geometriya',
  type: 'formula',
  inputs: [
    {
      name: 'method',
      label: 'Способ расчёта',
      type: 'select',
      options: [
        { value: 'base-height', label: 'По основанию и высоте' },
        { value: 'sides', label: 'По трём сторонам (формула Герона)' },
        { value: 'two-sides-angle', label: 'По двум сторонам и углу' }
      ],
      defaultValue: 'base-height'
    },
    {
      name: 'base',
      label: 'Основание (a)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    },
    {
      name: 'height',
      label: 'Высота (h)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    },
    {
      name: 'sideA',
      label: 'Сторона a',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    },
    {
      name: 'sideB',
      label: 'Сторона b',
      type: 'number',
      placeholder: '7',
      defaultValue: 7,
      min: 0
    },
    {
      name: 'sideC',
      label: 'Сторона c',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    },
    {
      name: 'angle',
      label: 'Угол между сторонами (°)',
      type: 'number',
      placeholder: '60',
      defaultValue: 60,
      min: 0,
      max: 180
    }
  ],
  outputs: [
    { name: 'area', label: 'Площадь', type: 'number', unit: 'м²' },
    { name: 'perimeter', label: 'Периметр', type: 'number', unit: 'м' }
  ],
  calculate: (inputs) => {
    const method = String(inputs.method);
    let area = 0;
    let perimeter = 0;
    
    if (method === 'base-height') {
      const base = Number(inputs.base);
      const height = Number(inputs.height);
      if (base && height) {
        area = 0.5 * base * height;
        perimeter = base + 2 * Math.sqrt(height * height + (base / 2) * (base / 2));
      }
    } else if (method === 'sides') {
      const a = Number(inputs.sideA);
      const b = Number(inputs.sideB);
      const c = Number(inputs.sideC);
      if (a && b && c) {
        const s = (a + b + c) / 2;
        area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        perimeter = a + b + c;
      }
    } else if (method === 'two-sides-angle') {
      const a = Number(inputs.sideA);
      const b = Number(inputs.sideB);
      const angle = Number(inputs.angle);
      if (a && b && angle) {
        area = 0.5 * a * b * Math.sin(angle * Math.PI / 180);
        const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle * Math.PI / 180));
        perimeter = a + b + c;
      }
    }
    
    return [
      { value: area.toFixed(4), label: 'Площадь', unit: 'м²' },
      { value: perimeter.toFixed(4), label: 'Периметр', unit: 'м' }
    ];
  },
  content: {
    howTo: 'Выберите способ расчёта и введите известные значения. Можно использовать основание и высоту, три стороны или две стороны и угол.',
    about: 'Треугольник — фигура с тремя сторонами. Площадь можно вычислить несколькими способами в зависимости от известных данных.',
    usage: 'Используется в строительстве, геодезии, дизайне.',
    formula: 'По основанию: S = ½ × a × h\nПо сторонам (Герон): S = √[s(s-a)(s-b)(s-c)]\nПо углу: S = ½ × a × b × sin(γ)',
    faq: [
      {
        question: 'Что такое формула Герона?',
        answer: 'Формула позволяет найти площадь треугольника по трём сторонам. s — полупериметр: s = (a+b+c)/2.'
      }
    ],
    sources: [
      { title: 'Площадь треугольника — Википедия', url: 'https://ru.wikipedia.org/wiki/Площадь_треугольника' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Площадь прямоугольника
export const rectangleAreaCalculator: Calculator = {
  id: 'rectangle-area',
  slug: 'ploshchad-pryamougolnika',
  title: 'Площадь прямоугольника',
  description: 'Расчёт площади и периметра прямоугольника',
  category: 'nauka-i-ucheba',
  subcategory: 'geometriya',
  type: 'formula',
  inputs: [
    {
      name: 'length',
      label: 'Длина (a)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    },
    {
      name: 'width',
      label: 'Ширина (b)',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    }
  ],
  outputs: [
    { name: 'area', label: 'Площадь', type: 'number', unit: 'м²' },
    { name: 'perimeter', label: 'Периметр', type: 'number', unit: 'м' },
    { name: 'diagonal', label: 'Диагональ', type: 'number', unit: 'м' }
  ],
  calculate: (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    
    if (!length || !width) return [{ value: '—', label: 'Результат' }];
    
    const area = length * width;
    const perimeter = 2 * (length + width);
    const diagonal = Math.sqrt(length * length + width * width);
    
    return [
      { value: area.toFixed(4), label: 'Площадь', unit: 'м²' },
      { value: perimeter.toFixed(4), label: 'Периметр', unit: 'м' },
      { value: diagonal.toFixed(4), label: 'Диагональ', unit: 'м' }
    ];
  },
  content: {
    howTo: 'Введите длину и ширину прямоугольника.',
    about: 'Прямоугольник — четырёхугольник с прямыми углами.',
    usage: 'Самый распространённый расчёт в быту и строительстве.',
    formula: 'S = a × b\nP = 2 × (a + b)\nДиагональ d = √(a² + b²)',
    faq: [],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Площадь шестиугольника
export const hexagonAreaCalculator: Calculator = {
  id: 'hexagon-area',
  slug: 'ploshchad-shestiugolnika',
  title: 'Площадь шестиугольника',
  description: 'Расчёт площади правильного шестиугольника',
  category: 'nauka-i-ucheba',
  subcategory: 'geometriya',
  type: 'formula',
  inputs: [
    {
      name: 'side',
      label: 'Длина стороны',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    }
  ],
  outputs: [
    { name: 'area', label: 'Площадь', type: 'number', unit: 'м²' },
    { name: 'perimeter', label: 'Периметр', type: 'number', unit: 'м' }
  ],
  calculate: (inputs) => {
    const side = Number(inputs.side);
    if (!side) return [{ value: '—', label: 'Результат' }];
    
    const area = (3 * Math.sqrt(3) / 2) * side * side;
    const perimeter = 6 * side;
    
    return [
      { value: area.toFixed(4), label: 'Площадь', unit: 'м²' },
      { value: perimeter.toFixed(4), label: 'Периметр', unit: 'м' }
    ];
  },
  content: {
    howTo: 'Введите длину стороны правильного шестиугольника.',
    about: 'Правильный шестиугольник имеет шесть равных сторон и углов.',
    usage: 'Используется при укладке плитки, сотовых конструкций.',
    formula: 'S = (3√3 / 2) × a²',
    faq: [],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Площадь трапеции
export const trapezoidAreaCalculator: Calculator = {
  id: 'trapezoid-area',
  slug: 'ploshchad-trapecii',
  title: 'Площадь трапеции',
  description: 'Расчёт площади трапеции по основаниям и высоте',
  category: 'nauka-i-ucheba',
  subcategory: 'geometriya',
  type: 'formula',
  inputs: [
    {
      name: 'baseA',
      label: 'Основание a',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    },
    {
      name: 'baseB',
      label: 'Основание b',
      type: 'number',
      placeholder: '6',
      defaultValue: 6,
      min: 0
    },
    {
      name: 'height',
      label: 'Высота',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      min: 0
    }
  ],
  outputs: [
    { name: 'area', label: 'Площадь', type: 'number', unit: 'м²' },
    { name: 'midline', label: 'Средняя линия', type: 'number', unit: 'м' }
  ],
  calculate: (inputs) => {
    const a = Number(inputs.baseA);
    const b = Number(inputs.baseB);
    const h = Number(inputs.height);
    
    if (!a || !b || !h) return [{ value: '—', label: 'Результат' }];
    
    const area = ((a + b) / 2) * h;
    const midline = (a + b) / 2;
    
    return [
      { value: area.toFixed(4), label: 'Площадь', unit: 'м²' },
      { value: midline.toFixed(4), label: 'Средняя линия', unit: 'м' }
    ];
  },
  content: {
    howTo: 'Введите два основания и высоту трапеции.',
    about: 'Трапеция — четырёхугольник с двумя параллельными сторонами.',
    usage: 'Строительство, геодезия.',
    formula: 'S = (a + b) / 2 × h',
    faq: [],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Объём цилиндра
export const cylinderVolumeCalculator: Calculator = {
  id: 'cylinder-volume',
  slug: 'obem-cilindra',
  title: 'Объём цилиндра',
  description: 'Расчёт объёма и площади поверхности цилиндра',
  category: 'nauka-i-ucheba',
  subcategory: 'geometriya',
  type: 'formula',
  inputs: [
    {
      name: 'radius',
      label: 'Радиус основания',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 0
    },
    {
      name: 'height',
      label: 'Высота цилиндра',
      type: 'number',
      placeholder: '10',
      defaultValue: 10,
      min: 0
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём', type: 'number', unit: 'м³' },
    { name: 'lateralArea', label: 'Боковая поверхность', type: 'number', unit: 'м²' },
    { name: 'totalArea', label: 'Полная поверхность', type: 'number', unit: 'м²' }
  ],
  calculate: (inputs) => {
    const r = Number(inputs.radius);
    const h = Number(inputs.height);
    
    if (!r || !h) return [{ value: '—', label: 'Результат' }];
    
    const volume = Math.PI * r * r * h;
    const lateralArea = 2 * Math.PI * r * h;
    const totalArea = 2 * Math.PI * r * (r + h);
    
    return [
      { value: volume.toFixed(4), label: 'Объём', unit: 'м³' },
      { value: lateralArea.toFixed(4), label: 'Боковая поверхность', unit: 'м²' },
      { value: totalArea.toFixed(4), label: 'Полная поверхность', unit: 'м²' }
    ];
  },
  content: {
    howTo: 'Введите радиус основания и высоту цилиндра.',
    about: 'Цилиндр — геометрическое тело с круглым основанием.',
    usage: 'Расчёт ёмкостей, баков, труб.',
    formula: 'V = π × r² × h\nS боковой = 2πrh\nS полной = 2πr(r + h)',
    faq: [],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Объём конуса
export const coneVolumeCalculator: Calculator = {
  id: 'cone-volume',
  slug: 'obem-konusa',
  title: 'Объём конуса',
  description: 'Расчёт объёма и площади конуса',
  category: 'nauka-i-ucheba',
  subcategory: 'geometriya',
  type: 'formula',
  inputs: [
    {
      name: 'radius',
      label: 'Радиус основания',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 0
    },
    {
      name: 'height',
      label: 'Высота конуса',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём', type: 'number', unit: 'м³' },
    { name: 'slantHeight', label: 'Образующая', type: 'number', unit: 'м' },
    { name: 'surfaceArea', label: 'Площадь поверхности', type: 'number', unit: 'м²' }
  ],
  calculate: (inputs) => {
    const r = Number(inputs.radius);
    const h = Number(inputs.height);
    
    if (!r || !h) return [{ value: '—', label: 'Результат' }];
    
    const volume = (1 / 3) * Math.PI * r * r * h;
    const slantHeight = Math.sqrt(r * r + h * h);
    const surfaceArea = Math.PI * r * (r + slantHeight);
    
    return [
      { value: volume.toFixed(4), label: 'Объём', unit: 'м³' },
      { value: slantHeight.toFixed(4), label: 'Образующая', unit: 'м' },
      { value: surfaceArea.toFixed(4), label: 'Площадь поверхности', unit: 'м²' }
    ];
  },
  content: {
    howTo: 'Введите радиус основания и высоту конуса.',
    about: 'Конус — тело с круглым основанием и вершиной.',
    usage: 'Инженерия, архитектура.',
    formula: 'V = (1/3) × π × r² × h',
    faq: [],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Объём куба
export const cubeVolumeCalculator: Calculator = {
  id: 'cube-volume',
  slug: 'obem-kuba',
  title: 'Объём куба',
  description: 'Расчёт объёма, площади поверхности и диагонали куба',
  category: 'nauka-i-ucheba',
  subcategory: 'geometriya',
  type: 'formula',
  inputs: [
    {
      name: 'side',
      label: 'Длина ребра',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём', type: 'number', unit: 'м³' },
    { name: 'surfaceArea', label: 'Площадь поверхности', type: 'number', unit: 'м²' },
    { name: 'faceDiagonal', label: 'Диагональ грани', type: 'number', unit: 'м' },
    { name: 'spaceDiagonal', label: 'Пространственная диагональ', type: 'number', unit: 'м' }
  ],
  calculate: (inputs) => {
    const a = Number(inputs.side);
    if (!a) return [{ value: '—', label: 'Результат' }];
    
    const volume = a * a * a;
    const surfaceArea = 6 * a * a;
    const faceDiagonal = a * Math.sqrt(2);
    const spaceDiagonal = a * Math.sqrt(3);
    
    return [
      { value: volume.toFixed(4), label: 'Объём', unit: 'м³' },
      { value: surfaceArea.toFixed(4), label: 'Площадь поверхности', unit: 'м²' },
      { value: faceDiagonal.toFixed(4), label: 'Диагональ грани', unit: 'м' },
      { value: spaceDiagonal.toFixed(4), label: 'Пространственная диагональ', unit: 'м' }
    ];
  },
  content: {
    howTo: 'Введите длину ребра куба.',
    about: 'Куб — правильный многогранник с шестью квадратными гранями.',
    usage: 'Расчёт ёмкостей, упаковки.',
    formula: 'V = a³\nS = 6a²',
    faq: [],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Объём шара (сферы)
export const sphereVolumeCalculator: Calculator = {
  id: 'sphere-volume',
  slug: 'obem-shara',
  title: 'Объём шара',
  description: 'Расчёт объёма и площади сферы',
  category: 'nauka-i-ucheba',
  subcategory: 'geometriya',
  type: 'formula',
  inputs: [
    {
      name: 'radius',
      label: 'Радиус',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём', type: 'number', unit: 'м³' },
    { name: 'surfaceArea', label: 'Площадь поверхности', type: 'number', unit: 'м²' },
    { name: 'diameter', label: 'Диаметр', type: 'number', unit: 'м' }
  ],
  calculate: (inputs) => {
    const r = Number(inputs.radius);
    if (!r) return [{ value: '—', label: 'Результат' }];
    
    const volume = (4 / 3) * Math.PI * r * r * r;
    const surfaceArea = 4 * Math.PI * r * r;
    const diameter = 2 * r;
    
    return [
      { value: volume.toFixed(4), label: 'Объём', unit: 'м³' },
      { value: surfaceArea.toFixed(4), label: 'Площадь поверхности', unit: 'м²' },
      { value: diameter.toFixed(4), label: 'Диаметр', unit: 'м' }
    ];
  },
  content: {
    howTo: 'Введите радиус сферы.',
    about: 'Сфера — поверхность всех точек, равноудалённых от центра.',
    usage: 'Астрономия, физика, инженерия.',
    formula: 'V = (4/3) × π × r³\nS = 4 × π × r²',
    faq: [],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

// Площадь стен комнаты
export const roomWallsAreaCalculator: Calculator = {
  id: 'room-walls-area',
  slug: 'ploshchad-sten',
  title: 'Площадь стен комнаты',
  description: 'Расчёт площади стен с учётом окон и дверей',
  category: 'nauka-i-ucheba',
  subcategory: 'geometriya',
  type: 'formula',
  inputs: [
    {
      name: 'length',
      label: 'Длина комнаты',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 0
    },
    {
      name: 'width',
      label: 'Ширина комнаты',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      min: 0
    },
    {
      name: 'height',
      label: 'Высота потолков',
      type: 'number',
      placeholder: '2.7',
      defaultValue: 2.7,
      min: 0
    },
    {
      name: 'windowsArea',
      label: 'Площадь окон',
      type: 'number',
      placeholder: '2.5',
      defaultValue: 2.5,
      min: 0
    },
    {
      name: 'doorsArea',
      label: 'Площадь дверей',
      type: 'number',
      placeholder: '2',
      defaultValue: 2,
      min: 0
    }
  ],
  outputs: [
    { name: 'totalWalls', label: 'Площадь стен (брутто)', type: 'number', unit: 'м²' },
    { name: 'openings', label: 'Площадь проёмов', type: 'number', unit: 'м²' },
    { name: 'netWalls', label: 'Площадь стен (нетто)', type: 'number', unit: 'м²' },
    { name: 'floorArea', label: 'Площадь пола', type: 'number', unit: 'м²' }
  ],
  calculate: (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const windowsArea = Number(inputs.windowsArea) || 0;
    const doorsArea = Number(inputs.doorsArea) || 0;
    
    if (!length || !width || !height) return [{ value: '—', label: 'Результат' }];
    
    const perimeter = 2 * (length + width);
    const totalWalls = perimeter * height;
    const openings = windowsArea + doorsArea;
    const netWalls = totalWalls - openings;
    const floorArea = length * width;
    
    return [
      { value: totalWalls.toFixed(2), label: 'Площадь стен (брутто)', unit: 'м²' },
      { value: openings.toFixed(2), label: 'Площадь проёмов', unit: 'м²' },
      { value: netWalls.toFixed(2), label: 'Площадь стен (нетто)', unit: 'м²' },
      { value: floorArea.toFixed(2), label: 'Площадь пола', unit: 'м²' }
    ];
  },
  content: {
    howTo: 'Введите размеры комнаты и площади окон/дверей.',
    about: 'Расчёт площади стен для покупки обоев или краски.',
    usage: 'Ремонт, строительство.',
    formula: 'Стены = Периметр × Высота − Проёмы',
    faq: [],
    sources: [],
    updatedAt: '2026-04-07'
  }
};

export const geometryCalculators = [
  circleAreaCalculator,
  triangleAreaCalculator,
  rectangleAreaCalculator,
  hexagonAreaCalculator,
  trapezoidAreaCalculator,
  cylinderVolumeCalculator,
  coneVolumeCalculator,
  cubeVolumeCalculator,
  sphereVolumeCalculator,
  roomWallsAreaCalculator
];
