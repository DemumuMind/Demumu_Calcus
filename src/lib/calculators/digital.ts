import { Calculator } from '../types';

// Конвертер данных (байты)
export const dataConverter: Calculator = {
  id: 'data-converter',
  slug: 'konverter-dannyh',
  title: 'Конвертер данных',
  description: 'Перевод байтов, килобайтов, мегабайтов, гигабайтов, терабайтов',
  category: 'konvertery',
  subcategory: 'conv-informaciya',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'b', label: 'B — байты' },
        { value: 'kb', label: 'KB — килобайты' },
        { value: 'mb', label: 'MB — мегабайты' },
        { value: 'gb', label: 'GB — гигабайты' },
        { value: 'tb', label: 'TB — терабайты' },
        { value: 'pb', label: 'PB — петабайты' }
      ],
      defaultValue: 'gb'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'b', label: 'B — байты' },
        { value: 'kb', label: 'KB — килобайты' },
        { value: 'mb', label: 'MB — мегабайты' },
        { value: 'gb', label: 'GB — гигабайты' },
        { value: 'tb', label: 'TB — терабайты' },
        { value: 'pb', label: 'PB — петабайты' }
      ],
      defaultValue: 'mb'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Using decimal (SI) units: 1 KB = 1000 B
    const toBytes: Record<string, number> = {
      'b': 1,
      'kb': 1000,
      'mb': 1000000,
      'gb': 1000000000,
      'tb': 1000000000000,
      'pb': 1000000000000000
    };
    
    const inBytes = value * toBytes[from];
    const result = inBytes / toBytes[to];
    
    const labels: Record<string, string> = {
      'b': 'B', 'kb': 'KB', 'mb': 'MB', 'gb': 'GB', 'tb': 'TB', 'pb': 'PB'
    };
    
    // Format with appropriate precision
    let formattedResult: string;
    if (result >= 1000000) {
      formattedResult = result.toExponential(4);
    } else if (result >= 1) {
      formattedResult = result.toFixed(2).replace(/\.?0+$/, '');
    } else {
      formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
    }
    
    return [{
      value: `${value} ${labels[from]} = ${formattedResult} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите размер данных, выберите единицы "из" и "в". Результат появится автоматически.',
    about: 'Конвертер данных переводит между единицами хранения информации: байты, килобайты, мегабайты, гигабайты, терабайты.',
    usage: 'Используется для оценки размера файлов, объёма накопителей, скорости передачи данных.',
    formula: 'Используются десятичные единицы (SI): 1 KB = 1000 B, 1 MB = 1000 KB\nДля двоичных: KiB = 1024 B (калькулятор использует десятичные)',
    faq: [
      {
        question: 'В чём разница между GB и GiB?',
        answer: 'GB (гигабайт) = 10⁹ байт = 1 000 000 000 B. GiB (гибибайт) = 2³⁰ байт = 1 073 741 824 B.'
      },
      {
        question: 'Почему жёсткий диск на 1 TB показывает меньше?',
        answer: 'Производители используют десятичные единицы (1 TB = 10¹²), а Windows — двоичные (1 TiB = 2⁴⁰).'
      }
    ],
    sources: [
      { title: 'Байт — Википедия', url: 'https://ru.wikipedia.org/wiki/Байт' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Конвертер скорости передачи данных
export const dataSpeedConverter: Calculator = {
  id: 'data-speed-converter',
  slug: 'konverter-skorosti-peredachi',
  title: 'Скорость передачи данных',
  description: 'Конвертер bps, Kbps, Mbps, Gbps, Tbps',
  category: 'konvertery',
  subcategory: 'conv-informaciya',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0
    },
    {
      name: 'from',
      label: 'Из',
      type: 'select',
      options: [
        { value: 'bps', label: 'bps — бит/сек' },
        { value: 'kbps', label: 'Kbps — килобит/сек' },
        { value: 'mbps', label: 'Mbps — мегабит/сек' },
        { value: 'gbps', label: 'Gbps — гигабит/сек' },
        { value: 'tbps', label: 'Tbps — терабит/сек' }
      ],
      defaultValue: 'mbps'
    },
    {
      name: 'to',
      label: 'В',
      type: 'select',
      options: [
        { value: 'bps', label: 'bps — бит/сек' },
        { value: 'kbps', label: 'Kbps — килобит/сек' },
        { value: 'mbps', label: 'Mbps — мегабит/сек' },
        { value: 'gbps', label: 'Gbps — гигабит/сек' },
        { value: 'tbps', label: 'Tbps — терабит/сек' },
        { value: 'mb_s', label: 'MB/s — мегабайт/сек' },
        { value: 'gb_s', label: 'GB/s — гигабайт/сек' }
      ],
      defaultValue: 'mb_s'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    
    if (!value) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    // Convert to bps first
    const toBps: Record<string, number> = {
      'bps': 1,
      'kbps': 1000,
      'mbps': 1000000,
      'gbps': 1000000000,
      'tbps': 1000000000000,
      'mb_s': 8000000, // 1 MB/s = 8 Mbps
      'gb_s': 8000000000
    };
    
    const inBps = value * toBps[from];
    const result = inBps / toBps[to];
    
    const labels: Record<string, string> = {
      'bps': 'bps', 'kbps': 'Kbps', 'mbps': 'Mbps', 'gbps': 'Gbps', 'tbps': 'Tbps',
      'mb_s': 'MB/s', 'gb_s': 'GB/s'
    };
    
    return [{
      value: `${value} ${labels[from]} = ${result.toFixed(2).replace(/\.?0+$/, '')} ${labels[to]}`,
      label: 'Результат'
    }];
  },
  content: {
    howTo: 'Введите скорость, выберите единицы "из" и "в". Можно переводить между битами и байтами.',
    about: 'Конвертер скорости передачи данных переводит между бит/сек и байт/сек. 1 байт = 8 бит.',
    usage: 'Используется для сравнения скоростей интернета, оценки времени загрузки файлов.',
    formula: '1 Mbps = 1000 Kbps = 1 000 000 bps\n1 MB/s = 8 Mbps = 8 000 000 bps',
    faq: [
      {
        question: 'Сколько мегабит в мегабайте?',
        answer: '1 мегабайт (MB) = 8 мегабит (Mb). Провайдеры обычно указывают скорость в мегабитах.'
      },
      {
        question: 'Как рассчитать время загрузки файла?',
        answer: 'Время (сек) = размер файла (биты) / скорость (бит/сек). Например, 100 MB на 100 Mbps = 100×8/100 = 8 секунд.'
      }
    ],
    sources: [
      { title: 'Бит в секунду — Википедия', url: 'https://ru.wikipedia.org/wiki/Бит_в_секунду' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор DPI (разрешение экрана)
export const dpiCalculator: Calculator = {
  id: 'dpi-calculator',
  slug: 'kalkulyator-dpi',
  title: 'Калькулятор DPI',
  description: 'Расчёт плотности пикселей экрана или изображения',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'width',
      label: 'Ширина (пикселей)',
      type: 'number',
      placeholder: '1920',
      defaultValue: 1920,
      min: 1
    },
    {
      name: 'height',
      label: 'Высота (пикселей)',
      type: 'number',
      placeholder: '1080',
      defaultValue: 1080,
      min: 1
    },
    {
      name: 'diagonal',
      label: 'Диагональ экрана (дюймов)',
      type: 'number',
      placeholder: '24',
      defaultValue: 24,
      min: 1,
      max: 100
    }
  ],
  outputs: [
    { name: 'resolution', label: 'Разрешение', type: 'text' },
    { name: 'dpi', label: 'Плотность пикселей', type: 'number', unit: 'DPI' },
    { name: 'totalPixels', label: 'Всего пикселей', type: 'number', unit: 'Мп' }
  ],
  calculate: (inputs) => {
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const diagonal = Number(inputs.diagonal);
    
    if (!width || !height || !diagonal) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const totalPixels = (width * height) / 1000000; // in megapixels
    const aspectRatio = width / height;
    
    // Calculate DPI
    // diagonal² = width² + height²
    // where width and height are in inches
    // DPI = pixels / inches
    const diagonalPixels = Math.sqrt(width * width + height * height);
    const dpi = diagonalPixels / diagonal;
    
    const aspectLabel = aspectRatio > 1.7 ? '16:9' : aspectRatio > 1.5 ? '16:10' : aspectRatio > 1.3 ? '4:3' : 'другой';
    
    return [
      { value: `${width}×${height} (${aspectLabel})`, label: 'Разрешение', unit: '' },
      { value: Math.round(dpi).toString(), label: 'Плотность пикселей', unit: 'DPI' },
      { value: totalPixels.toFixed(1), label: 'Всего пикселей', unit: 'Мп' }
    ];
  },
  content: {
    howTo: 'Введите разрешение экрана (ширина × высота) и диагональ в дюймах. Калькулятор покажет DPI.',
    about: 'DPI (dots per inch) — плотность пикселей, определяющая чёткость изображения. Чем выше DPI, тем чётче картинка.',
    usage: 'Используется для оценки качества дисплеев, выбора мониторов, печати изображений.',
    formula: 'DPI = √(ширина² + высота²) / диагональ\nгде ширина и высота в пикселях, диагональ в дюймах',
    faq: [
      {
        question: 'Что такое Retina дисплей?',
        answer: 'Apple называет Retina экраны с DPI > 300 (телефоны) или > 220 (компьютеры), где глаз не видит отдельных пикселей.'
      },
      {
        question: 'Оптимальный DPI для монитора?',
        answer: 'Для мониторов: 90-110 DPI комфортен. Для ноутбуков: 140-200 DPI. Для смартфонов: 300+ DPI.'
      }
    ],
    sources: [
      { title: 'DPI — Википедия', url: 'https://ru.wikipedia.org/wiki/Dots_per_inch' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор соотношения сторон (Aspect Ratio)
export const aspectRatioCalculator: Calculator = {
  id: 'aspect-ratio-calculator',
  slug: 'sootnoshenie-storon',
  title: 'Соотношение сторон',
  description: 'Расчёт пропорций изображения, видео, экрана',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'width',
      label: 'Ширина (пикселей)',
      type: 'number',
      placeholder: '1920',
      defaultValue: 1920,
      min: 1
    },
    {
      name: 'height',
      label: 'Высота (пикселей)',
      type: 'number',
      placeholder: '1080',
      defaultValue: 1080,
      min: 1
    }
  ],
  outputs: [
    { name: 'ratio', label: 'Соотношение сторон', type: 'text' },
    { name: 'ratioValue', label: 'Десятичное значение', type: 'number' },
    { name: 'orientation', label: 'Ориентация', type: 'text' }
  ],
  calculate: (inputs) => {
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    
    if (!width || !height) {
      return [{ value: '—', label: 'Результат' }];
    }
    
    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b);
    };
    
    const divisor = gcd(width, height);
    const ratioWidth = width / divisor;
    const ratioHeight = height / divisor;
    
    // Simplify common ratios
    let simplifiedRatio: string;
    if (Math.abs(width / height - 16 / 9) < 0.01) simplifiedRatio = '16:9';
    else if (Math.abs(width / height - 4 / 3) < 0.01) simplifiedRatio = '4:3';
    else if (Math.abs(width / height - 21 / 9) < 0.01) simplifiedRatio = '21:9';
    else if (Math.abs(width / height - 16 / 10) < 0.01) simplifiedRatio = '16:10';
    else if (Math.abs(width / height - 1) < 0.01) simplifiedRatio = '1:1';
    else if (Math.abs(width / height - 9 / 16) < 0.01) simplifiedRatio = '9:16';
    else simplifiedRatio = `${ratioWidth}:${ratioHeight}`;
    
    const orientation = width > height ? 'Альбомная (landscape)' : width < height ? 'Портретная (portrait)' : 'Квадрат';
    
    return [
      { value: simplifiedRatio, label: 'Соотношение сторон', unit: '' },
      { value: (width / height).toFixed(3), label: 'Десятичное значение', unit: '' },
      { value: orientation, label: 'Ориентация', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите ширину и высоту изображения или экрана. Калькулятор определит соотношение сторон.',
    about: 'Соотношение сторон (aspect ratio) — отношение ширины к высоте прямоугольника. Стандартные: 16:9, 4:3, 21:9.',
    usage: 'Используется для определения пропорций видео, выбора монитора, масштабирования изображений.',
    formula: 'Соотношение = ширина : высота (после сокращения на НОД)',
    faq: [
      {
        question: 'Какое соотношение сторон выбрать?',
        answer: 'Для фильмов — 21:9, для работы и игр — 16:9 или 16:10, для мобильных — 9:19.5 или подобные.'
      },
      {
        question: 'Что делать если видео не подходит под экран?',
        answer: 'Используйте letterbox (чёрные полосы сверху/снизу) или растягивание с сохранением пропорций.'
      }
    ],
    sources: [
      { title: 'Соотношение сторон — Википедия', url: 'https://ru.wikipedia.org/wiki/Соотношение_сторон' }
    ],
    updatedAt: '2026-04-07'
  }
};

export const digitalCalculators = [
  dataConverter,
  dataSpeedConverter,
  dpiCalculator,
  aspectRatioCalculator,
];
