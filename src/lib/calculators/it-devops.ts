import { Calculator } from '../types';

// Калькулятор размера файла
export const fileSizeCalculator: Calculator = {
  id: 'file-size',
  slug: 'razmer-fayla',
  title: 'Калькулятор размера файла',
  description: 'Перевод между битами, байтами, килобайтами, мегабайтами, гигабайтами и терабайтами',
  category: 'konvertery',
  subcategory: 'data-units',
  type: 'converter',
  inputs: [
    {
      name: 'value',
      label: 'Значение',
      type: 'number',
      placeholder: '1024',
      defaultValue: 1024
    },
    {
      name: 'fromUnit',
      label: 'Из единицы',
      type: 'select',
      options: [
        { value: 'b', label: 'Биты (b)' },
        { value: 'B', label: 'Байты (B)' },
        { value: 'KB', label: 'Килобайты (KB)' },
        { value: 'MB', label: 'Мегабайты (MB)' },
        { value: 'GB', label: 'Гигабайты (GB)' },
        { value: 'TB', label: 'Терабайты (TB)' },
        { value: 'PB', label: 'Петабайты (PB)' }
      ],
      defaultValue: 'MB'
    }
  ],
  outputs: [
    { name: 'bits', label: 'Биты', type: 'number', unit: 'b' },
    { name: 'bytes', label: 'Байты', type: 'number', unit: 'B' },
    { name: 'kilobytes', label: 'Килобайты', type: 'number', unit: 'KB' },
    { name: 'megabytes', label: 'Мегабайты', type: 'number', unit: 'MB' },
    { name: 'gigabytes', label: 'Гигабайты', type: 'number', unit: 'GB' },
    { name: 'terabytes', label: 'Терабайты', type: 'number', unit: 'TB' }
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value);
    const fromUnit = String(inputs.fromUnit);
    
    if (!value) {
      return [
        { value: '—', label: 'Биты', unit: 'b' },
        { value: '—', label: 'Байты', unit: 'B' },
        { value: '—', label: 'Килобайты', unit: 'KB' },
        { value: '—', label: 'Мегабайты', unit: 'MB' },
        { value: '—', label: 'Гигабайты', unit: 'GB' },
        { value: '—', label: 'Терабайты', unit: 'TB' }
      ];
    }
    
    // Convert to bytes first
    const multipliers: Record<string, number> = {
      'b': 1 / 8,
      'B': 1,
      'KB': 1024,
      'MB': 1024 * 1024,
      'GB': 1024 * 1024 * 1024,
      'TB': 1024 * 1024 * 1024 * 1024,
      'PB': 1024 * 1024 * 1024 * 1024 * 1024
    };
    
    const bytes = value * multipliers[fromUnit];
    
    const format = (num: number) => {
      if (num >= 1e12 || num < 1e-3) return num.toExponential(3);
      return Number(num.toPrecision(8));
    };
    
    return [
      { value: format(bytes * 8), label: 'Биты', unit: 'b' },
      { value: format(bytes), label: 'Байты', unit: 'B' },
      { value: format(bytes / 1024), label: 'Килобайты', unit: 'KB' },
      { value: format(bytes / (1024 * 1024)), label: 'Мегабайты', unit: 'MB' },
      { value: format(bytes / (1024 * 1024 * 1024)), label: 'Гигабайты', unit: 'GB' },
      { value: format(bytes / (1024 * 1024 * 1024 * 1024)), label: 'Терабайты', unit: 'TB' }
    ];
  },
  content: {
    howTo: 'Введите размер файла и выберите единицу измерения. Калькулятор переведёт во все основные единицы.',
    about: 'В IT используется двоичная система: 1 KB = 1024 B (не 1000). Это важно для точных расчётов. Разница накапливается: "500 GB" на упаковке = 465 GiB фактически.',
    formula: '1 KB = 1024 B\n1 MB = 1024 KB = 1,048,576 B\n1 GB = 1024 MB = 1,073,741,824 B',
    faq: [
      { question: 'Почему 1 TB жёсткого диска = 931 GB?', answer: 'Производители используют десятичную систему (1 TB = 10¹²), Windows — двоичную (1 TiB = 2⁴⁰). Разница ~7%.' },
      { question: 'Что больше — 1 Mb или 1 MB?', answer: '1 MB (мегабайт) = 8 Mb (мегабит). Провайдеры интернета указывают скорость в мегабитах.' }
    ],
    sources: [
      { title: 'IEC - Binary Prefixes', url: 'https://www.iec.ch/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор скорости передачи данных
export const dataTransferCalculator: Calculator = {
  id: 'data-transfer',
  slug: 'skorost-peredachi-dannyh',
  title: 'Калькулятор скорости передачи',
  description: 'Расчёт времени передачи файла при заданной скорости соединения',
  category: 'tehnika',
  subcategory: 'it-tools',
  type: 'formula',
  inputs: [
    {
      name: 'fileSize',
      label: 'Размер файла',
      type: 'number',
      placeholder: '1',
      min: 0.001,
      defaultValue: 1
    },
    {
      name: 'fileUnit',
      label: 'Единица файла',
      type: 'select',
      options: [
        { value: 'MB', label: 'MB' },
        { value: 'GB', label: 'GB' },
        { value: 'TB', label: 'TB' }
      ],
      defaultValue: 'GB'
    },
    {
      name: 'speed',
      label: 'Скорость соединения',
      type: 'number',
      placeholder: '100',
      min: 1,
      defaultValue: 100
    },
    {
      name: 'speedUnit',
      label: 'Единица скорости',
      type: 'select',
      options: [
        { value: 'Mbps', label: 'Мбит/с' },
        { value: 'MBps', label: 'Мбайт/с' },
        { value: 'Gbps', label: 'Гбит/с' }
      ],
      defaultValue: 'Mbps'
    }
  ],
  outputs: [
    { name: 'transferTime', label: 'Время передачи', type: 'text' },
    { name: 'seconds', label: 'В секундах', type: 'number', unit: 'сек' },
    { name: 'minutes', label: 'В минутах', type: 'number', unit: 'мин' },
    { name: 'hours', label: 'В часах', type: 'number', unit: 'ч' },
    { name: 'realisticTime', label: 'Реалистичное время', type: 'text' }
  ],
  calculate: (inputs) => {
    const fileSize = Number(inputs.fileSize);
    const fileUnit = String(inputs.fileUnit);
    const speed = Number(inputs.speed);
    const speedUnit = String(inputs.speedUnit);
    
    if (!fileSize || !speed) {
      return [
        { value: '—', label: 'Время передачи' },
        { value: '—', label: 'В секундах', unit: 'сек' },
        { value: '—', label: 'В минутах', unit: 'мин' },
        { value: '—', label: 'В часах', unit: 'ч' },
        { value: '—', label: 'Реалистичное время' }
      ];
    }
    
    // Convert file size to MB
    const fileMultipliers: Record<string, number> = {
      'MB': 1,
      'GB': 1024,
      'TB': 1024 * 1024
    };
    const fileSizeMB = fileSize * fileMultipliers[fileUnit];
    
    // Convert speed to MB/s
    let speedMBps: number;
    switch (speedUnit) {
      case 'Mbps': speedMBps = speed / 8; break;
      case 'MBps': speedMBps = speed; break;
      case 'Gbps': speedMBps = speed * 128; break;
      default: speedMBps = speed / 8;
    }
    
    const seconds = fileSizeMB / speedMBps;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    
    // Format time
    let timeText: string;
    if (hours >= 1) {
      timeText = `${Math.floor(hours)} ч ${Math.round((hours % 1) * 60)} мин`;
    } else if (minutes >= 1) {
      timeText = `${Math.floor(minutes)} мин ${Math.round((minutes % 1) * 60)} сек`;
    } else {
      timeText = `${Math.round(seconds)} сек`;
    }
    
    // Realistic time (with overhead for protocols, ~85% efficiency)
    const realisticSeconds = seconds / 0.85;
    let realisticTime: string;
    if (realisticSeconds > 3600) {
      realisticTime = `${Math.round(realisticSeconds / 3600 * 10) / 10} ч`;
    } else if (realisticSeconds > 60) {
      realisticTime = `${Math.round(realisticSeconds / 60)} мин`;
    } else {
      realisticTime = `${Math.round(realisticSeconds)} сек`;
    }
    
    return [
      { value: timeText, label: 'Время передачи' },
      { value: Math.round(seconds), label: 'В секундах', unit: 'сек' },
      { value: Math.round(minutes), label: 'В минутах', unit: 'мин' },
      { value: Number(hours.toFixed(2)), label: 'В часах', unit: 'ч' },
      { value: `${realisticTime} (с учётом накладных расходов)`, label: 'Реалистичное время' }
    ];
  },
  content: {
    howTo: 'Введите размер файла, скорость соединения и их единицы. Калькулятор рассчитает время передачи.',
    about: 'Теоретическая скорость отличается от реальной из-за накладных расходов протоколов (TCP/IP), контроля ошибок, задержек сети. Реальная эффективность — обычно 80-90%.',
    formula: 'Время = (Размер файла × 8 для Мбит/с) / Скорость\nПример: 1 GB при 100 Мбит/с = (1024 × 8) / 100 = 82 сек',
    faq: [
      { question: 'Почему реальная скорость ниже заявленной?', answer: 'Накладные расходы протоколов, расстояние, перегрузка сети, дисковая подсистема. 100 Мбит/с = ~10-12 МБ/с реально.' },
      { question: 'Какая скорость нужна для 4K видео?', answer: 'Netflix рекомендует 25 Мбит/с для 4K. Для комфорта — минимум 50 Мбит/с с запасом.' }
    ],
    sources: [
      { title: 'Speedtest.net', url: 'https://www.speedtest.net/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор сжатия данных
export const compressionCalculator: Calculator = {
  id: 'compression',
  slug: 'koefficient-szhatiya',
  title: 'Калькулятор сжатия данных',
  description: 'Расчёт эффективности сжатия: коэффициента, экономии места и времени',
  category: 'tehnika',
  subcategory: 'it-tools',
  type: 'formula',
  inputs: [
    {
      name: 'originalSize',
      label: 'Исходный размер (MB)',
      type: 'number',
      placeholder: '1000',
      min: 1,
      defaultValue: 1000
    },
    {
      name: 'compressedSize',
      label: 'Размер после сжатия (MB)',
      type: 'number',
      placeholder: '400',
      min: 1,
      defaultValue: 400
    },
    {
      name: 'compressionMethod',
      label: 'Метод сжатия',
      type: 'select',
      options: [
        { value: 'zip', label: 'ZIP' },
        { value: 'gzip', label: 'GZIP' },
        { value: 'bzip2', label: 'BZIP2' },
        { value: 'xz', label: 'XZ' },
        { value: 'zstd', label: 'Zstandard' },
        { value: 'lz4', label: 'LZ4' }
      ],
      defaultValue: 'zip'
    }
  ],
  outputs: [
    { name: 'ratio', label: 'Коэффициент сжатия', type: 'number' },
    { name: 'savingsPercent', label: 'Экономия', type: 'number', unit: '%' },
    { name: 'savedSize', label: 'Сэкономлено', type: 'number', unit: 'MB' },
    { name: 'efficiency', label: 'Эффективность', type: 'text' },
    { name: 'typicalFor', label: 'Типично для', type: 'text' }
  ],
  calculate: (inputs) => {
    const originalSize = Number(inputs.originalSize);
    const compressedSize = Number(inputs.compressedSize);
    const compressionMethod = String(inputs.compressionMethod);
    
    if (!originalSize || !compressedSize) {
      return [
        { value: '—', label: 'Коэффициент сжатия' },
        { value: '—', label: 'Экономия', unit: '%' },
        { value: '—', label: 'Сэкономлено', unit: 'MB' },
        { value: '—', label: 'Эффективность' },
        { value: '—', label: 'Типично для' }
      ];
    }
    
    const ratio = originalSize / compressedSize;
    const savingsPercent = ((originalSize - compressedSize) / originalSize) * 100;
    const savedSize = originalSize - compressedSize;
    
    let efficiency: string;
    if (ratio >= 10) {
      efficiency = 'Отличное (логи, текст)';
    } else if (ratio >= 3) {
      efficiency = 'Хорошее (JSON, XML)';
    } else if (ratio >= 1.5) {
      efficiency = 'Среднее (смешанные данные)';
    } else {
      efficiency = 'Низкое (уже сжатые данные)';
    }
    
    const typicalUses: Record<string, string> = {
      'zip': 'Универсальный, быстрый, хорош для документов',
      'gzip': 'Веб, HTTP сжатие, логи',
      'bzip2': 'Бэкапы, лучшее сжатие, медленнее',
      'xz': 'Максимальное сжатие, для архивов',
      'zstd': 'Баланс скорости и сжатия, современный',
      'lz4': 'Максимальная скорость, низкое сжатие'
    };
    
    return [
      { value: Number(ratio.toFixed(2)), label: 'Коэффициент сжатия' },
      { value: Math.round(savingsPercent), label: 'Экономия', unit: '%' },
      { value: Math.round(savedSize), label: 'Сэкономлено', unit: 'MB' },
      { value: efficiency, label: 'Эффективность' },
      { value: typicalUses[compressionMethod], label: 'Типично для' }
    ];
  },
  content: {
    howTo: 'Введите исходный и сжатый размер в МБ, выберите метод сжатия. Калькулятор покажет эффективность сжатия.',
    about: 'Сжатие бывает без потерь (LZ77, Huffman) и с потерями (JPEG, MP3). Без потерь позволяет восстановить исходные данные точно. Разные алгоритмы дают разный баланс скорость/сжатие.',
    formula: 'Коэффициент = Исходный / Сжатый\nЭкономия = (1 - Сжатый/Исходный) × 100%',
    faq: [
      { question: 'Почему MP3/ZIP уже не сжимаются?', answer: 'Они уже сжаты. Повторное сжатие не даёт эффекта или увеличивает размер из-за накладных расходов.' },
      { question: 'Какой формат лучше для бэкапов?', answer: 'Для долговременного хранения: bzip2 или xz (лучшее сжатие). Для скорости: zstd или lz4.' }
    ],
    sources: [
      { title: 'zlib - Compression Library', url: 'https://www.zlib.net/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор RAID
export const raidCalculator: Calculator = {
  id: 'raid-storage-calculator',
  slug: 'raid-kalkulyator',
  title: 'Калькулятор RAID-массивов',
  description: 'Расчёт ёмкости, надёжности и производительности RAID-массивов',
  category: 'tehnika',
  subcategory: 'it-tools',
  type: 'formula',
  inputs: [
    {
      name: 'numDisks',
      label: 'Количество дисков',
      type: 'number',
      placeholder: '4',
      min: 2,
      max: 24,
      defaultValue: 4
    },
    {
      name: 'diskSize',
      label: 'Размер диска (GB)',
      type: 'number',
      placeholder: '2000',
      min: 100,
      defaultValue: 2000
    },
    {
      name: 'raidLevel',
      label: 'Уровень RAID',
      type: 'select',
      options: [
        { value: '0', label: 'RAID 0 (Stripe)' },
        { value: '1', label: 'RAID 1 (Mirror)' },
        { value: '5', label: 'RAID 5 (Parity)' },
        { value: '6', label: 'RAID 6 (Double Parity)' },
        { value: '10', label: 'RAID 10 (1+0)' }
      ],
      defaultValue: '5'
    }
  ],
  outputs: [
    { name: 'totalCapacity', label: 'Общая ёмкость', type: 'number', unit: 'GB' },
    { name: 'usableCapacity', label: 'Доступная ёмкость', type: 'number', unit: 'GB' },
    { name: 'redundancy', label: 'Избыточность', type: 'text' },
    { name: 'faultTolerance', label: 'Отказоустойчивость', type: 'text' },
    { name: 'performance', label: 'Производительность', type: 'text' }
  ],
  calculate: (inputs) => {
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
  content: {
    howTo: 'Введите количество дисков, их размер и уровень RAID. Калькулятор покажет доступную ёмкость, надёжность и производительность.',
    about: 'RAID (Redundant Array of Independent Disks) объединяет диски для повышения скорости, надёжности или ёмкости. RAID 0 — скорость, RAID 1 — зеркало, RAID 5/6 — баланс.',
    formula: 'RAID 5: Ёмкость = (N-1) × Размер диска\nRAID 6: Ёмкость = (N-2) × Размер диска\nRAID 10: Ёмкость = N/2 × Размер диска',
    faq: [
      { question: 'Какой RAID выбрать для дома?', answer: 'RAID 1 (2 диска) или RAID 5 (3+ диска) — баланс защиты и ёмкости. Для скорости — RAID 0 без защиты.' },
      { question: 'Что делать при отказе диска в RAID 5?', answer: 'Немедленно заменить. При перестройке (rebuild) массив уязвим — вторая поломка = потеря данных.' }
    ],
    sources: [
      { title: 'Wikipedia - RAID', url: 'https://en.wikipedia.org/wiki/RAID' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор IP-адресов и подсетей
export const subnetCalculator: Calculator = {
  id: 'subnet-calculator',
  slug: 'podseti-ip',
  title: 'Калькулятор IP-подсетей',
  description: 'Расчёт параметров IPv4 подсети: адреса, маски, broadcast, диапазона хостов',
  category: 'tehnika',
  subcategory: 'it-tools',
  type: 'formula',
  inputs: [
    {
      name: 'ipAddress',
      label: 'IP-адрес',
      type: 'text',
      placeholder: '192.168.1.0',
      defaultValue: '192.168.1.0'
    },
    {
      name: 'cidr',
      label: 'CIDR (префикс)',
      type: 'select',
      options: [
        { value: '24', label: '/24 (255.255.255.0)' },
        { value: '16', label: '/16 (255.255.0.0)' },
        { value: '8', label: '/8 (255.0.0.0)' },
        { value: '30', label: '/30 (4 адреса)' },
        { value: '28', label: '/28 (16 адресов)' },
        { value: '26', label: '/26 (64 адреса)' },
        { value: '20', label: '/20 (4096 адресов)' }
      ],
      defaultValue: '24'
    }
  ],
  outputs: [
    { name: 'networkAddress', label: 'Сетевой адрес', type: 'text' },
    { name: 'subnetMask', label: 'Маска подсети', type: 'text' },
    { name: 'broadcast', label: 'Broadcast', type: 'text' },
    { name: 'firstHost', label: 'Первый хост', type: 'text' },
    { name: 'lastHost', label: 'Последний хост', type: 'text' },
    { name: 'totalHosts', label: 'Всего хостов', type: 'number', unit: 'шт' },
    { name: 'usableHosts', label: 'Используемых', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const ipAddress = String(inputs.ipAddress);
    const cidr = Number(inputs.cidr);
    
    // Parse IP
    const ipParts = ipAddress.split('.').map(Number);
    if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) {
      return [
        { value: 'Некорректный IP', label: 'Сетевой адрес' },
        { value: '—', label: 'Маска подсети' },
        { value: '—', label: 'Broadcast' },
        { value: '—', label: 'Первый хост' },
        { value: '—', label: 'Последний хост' },
        { value: '—', label: 'Всего хостов', unit: 'шт' },
        { value: '—', label: 'Используемых', unit: 'шт' }
      ];
    }
    
    // Calculate subnet mask
    const maskInt = 0xFFFFFFFF << (32 - cidr);
    const maskParts = [
      (maskInt >>> 24) & 0xFF,
      (maskInt >>> 16) & 0xFF,
      (maskInt >>> 8) & 0xFF,
      maskInt & 0xFF
    ];
    
    // Network address
    const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
    const networkInt = ipInt & maskInt;
    const networkParts = [
      (networkInt >>> 24) & 0xFF,
      (networkInt >>> 16) & 0xFF,
      (networkInt >>> 8) & 0xFF,
      networkInt & 0xFF
    ];
    
    // Broadcast
    const broadcastInt = networkInt | (~maskInt & 0xFFFFFFFF);
    const broadcastParts = [
      (broadcastInt >>> 24) & 0xFF,
      (broadcastInt >>> 16) & 0xFF,
      (broadcastInt >>> 8) & 0xFF,
      broadcastInt & 0xFF
    ];
    
    // First and last usable hosts
    const firstHostInt = networkInt + 1;
    const lastHostInt = broadcastInt - 1;
    
    const firstHostParts = [
      (firstHostInt >>> 24) & 0xFF,
      (firstHostInt >>> 16) & 0xFF,
      (firstHostInt >>> 8) & 0xFF,
      firstHostInt & 0xFF
    ];
    
    const lastHostParts = [
      (lastHostInt >>> 24) & 0xFF,
      (lastHostInt >>> 16) & 0xFF,
      (lastHostInt >>> 8) & 0xFF,
      lastHostInt & 0xFF
    ];
    
    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = Math.max(0, totalHosts - 2);
    
    return [
      { value: networkParts.join('.'), label: 'Сетевой адрес' },
      { value: maskParts.join('.'), label: 'Маска подсети' },
      { value: broadcastParts.join('.'), label: 'Broadcast' },
      { value: firstHostParts.join('.'), label: 'Первый хост' },
      { value: lastHostParts.join('.'), label: 'Последний хост' },
      { value: totalHosts, label: 'Всего хостов', unit: 'шт' },
      { value: usableHosts, label: 'Используемых', unit: 'шт' }
    ];
  },
  content: {
    howTo: 'Введите IP-адрес сети и CIDR префикс (например, /24). Калькулятор вычислит все параметры подсети.',
    about: 'CIDR (Classless Inter-Domain Routing) обозначает размер подсети. /24 = 256 адресов (класс C), /16 = 65536 адресов (класс B). Сетевой адрес и broadcast не используются для хостов.',
    formula: 'Сетевой адрес = IP AND Маска\nBroadcast = Сеть OR (NOT Маска)\nХостов = 2^(32-CIDR) - 2',
    faq: [
      { question: 'Что такое CIDR?', answer: 'Classless Inter-Domain Routing — способ обозначать размер сети. /24 означает, что первые 24 бита — сеть, последние 8 — хосты.' },
      { question: 'Почему /30 имеет только 2 хоста?', answer: '/30 = 4 адреса. Минус сеть и broadcast = 2 для хостов. Используется для точка-точка соединений.' }
    ],
    sources: [
      { title: 'RFC 1918 - Private Address Space', url: 'https://tools.ietf.org/html/rfc1918' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор хеширования паролей
export const passwordHashCalculator: Calculator = {
  id: 'password-hash',
  slug: 'stoikost-parolya',
  title: 'Калькулятор стойкости пароля',
  description: 'Оценка времени взлома пароля методом перебора при разных алгоритмах хеширования',
  category: 'bezopasnost',
  subcategory: 'security',
  type: 'formula',
  inputs: [
    {
      name: 'passwordLength',
      label: 'Длина пароля',
      type: 'number',
      placeholder: '12',
      min: 1,
      max: 128,
      defaultValue: 12
    },
    {
      name: 'charset',
      label: 'Набор символов',
      type: 'select',
      options: [
        { value: 'lowercase', label: 'Только строчные (a-z)' },
        { value: 'alphanumeric', label: 'Буквы и цифры (a-z, 0-9)' },
        { value: 'alphanumeric-mixed', label: 'Буквы обоих регистров + цифры' },
        { value: 'full', label: 'Все символы (~95)' }
      ],
      defaultValue: 'alphanumeric-mixed'
    },
    {
      name: 'hashType',
      label: 'Алгоритм хеширования',
      type: 'select',
      options: [
        { value: 'md5', label: 'MD5 (слабый)' },
        { value: 'sha256', label: 'SHA-256' },
        { value: 'bcrypt', label: 'bcrypt (рекомендуется)' },
        { value: 'argon2', label: 'Argon2 (современный)' },
        { value: 'pbkdf2', label: 'PBKDF2' }
      ],
      defaultValue: 'bcrypt'
    }
  ],
  outputs: [
    { name: 'combinations', label: 'Вариантов комбинаций', type: 'text' },
    { name: 'crackTimeFast', label: 'Время взлома (GPU)', type: 'text' },
    { name: 'crackTimeSlow', label: 'Время взлома (bcrypt)', type: 'text' },
    { name: 'strength', label: 'Оценка надёжности', type: 'text' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const passwordLength = Number(inputs.passwordLength);
    const charset = String(inputs.charset);
    const hashType = String(inputs.hashType);
    
    if (!passwordLength) {
      return [
        { value: '—', label: 'Вариантов комбинаций' },
        { value: '—', label: 'Время взлома (GPU)' },
        { value: '—', label: 'Время взлома (bcrypt)' },
        { value: '—', label: 'Оценка надёжности' },
        { value: '—', label: 'Рекомендация' }
      ];
    }
    
    // Character set sizes
    const charsetSizes: Record<string, number> = {
      'lowercase': 26,
      'alphanumeric': 36,
      'alphanumeric-mixed': 62,
      'full': 95
    };
    
    const charsetSize = charsetSizes[charset];
    const combinations = Math.pow(charsetSize, passwordLength);
    
    // Hash rates (hashes per second on modern hardware)
    const hashRates: Record<string, number> = {
      'md5': 200e9,        // 200 billion/s on GPU
      'sha256': 10e9,      // 10 billion/s on GPU
      'bcrypt': 10000,     // 10 thousand/s (intentionally slow)
      'argon2': 5000,      // 5 thousand/s
      'pbkdf2': 100000     // 100 thousand/s
    };
    
    const rate = hashRates[hashType];
    const secondsFast = combinations / rate;
    const secondsSlow = combinations / 10000; // bcrypt rate
    
    // Format time
    const formatTime = (seconds: number): string => {
      if (seconds < 1) return '< 1 сек';
      if (seconds < 60) return `${Math.round(seconds)} сек`;
      if (seconds < 3600) return `${Math.round(seconds / 60)} мин`;
      if (seconds < 86400) return `${Math.round(seconds / 3600)} ч`;
      if (seconds < 31536000) return `${Math.round(seconds / 86400)} дн`;
      if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} лет`;
      if (seconds < 31536000 * 1000000) return `${Math.round(seconds / 31536000 / 1000)} тыс. лет`;
      return `${Math.round(seconds / 31536000 / 1e9)} млрд лет`;
    };
    
    // Assess strength
    let strength: string;
    let recommendation: string;
    
    if (combinations < 1e8) {
      strength = 'Очень слабый (мгновенный взлом)';
      recommendation = 'Увеличьте длину минимум до 12 символов, используйте смешанный регистр и цифры';
    } else if (combinations < 1e12) {
      strength = 'Слабый (взламывается за секунды/минуты)';
      recommendation = 'Минимум 12 символов, используйте все типы символов';
    } else if (combinations < 1e18) {
      strength = 'Средний (взламывается за часы/дни)';
      recommendation = 'Достаточно для обычных аккаунтов, используйте уникальные пароли';
    } else if (combinations < 1e24) {
      strength = 'Хороший (взлом нецелесообразен)';
      recommendation = 'Хороший пароль. Рекомендуется менеджер паролей';
    } else {
      strength = 'Отличный (взлом невозможен)';
      recommendation = 'Отличная защита. Используйте менеджер паролей для генерации';
    }
    
    // Format combinations
    let combosText: string;
    if (combinations >= 1e15) {
      combosText = combinations.toExponential(2);
    } else {
      combosText = combinations.toLocaleString();
    }
    
    return [
      { value: combosText, label: 'Вариантов комбинаций' },
      { value: formatTime(secondsFast), label: 'Время взлома (GPU)' },
      { value: formatTime(secondsSlow), label: 'Время взлома (bcrypt)' },
      { value: strength, label: 'Оценка надёжности' },
      { value: recommendation, label: 'Рекомендация' }
    ];
  },
  content: {
    howTo: 'Введите длину пароля, набор используемых символов и алгоритм хеширования. Калькулятор оценит время взлома перебором.',
    about: 'Современные GPU могут проверять миллиарды MD5/SHA-хешей в секунду. Поэтому используются "медленные" алгоритмы (bcrypt, Argon2, PBKDF2), которые специально замедлены.',
    formula: 'Вариантов = (Размер алфавита)^(Длина)\nВремя = Вариантов / Скорость хеширования',
    faq: [
      { question: 'Почему bcrypt лучше MD5?', answer: 'bcrypt специально медленный (~10k хешей/сек). MD5 на GPU — 200 миллиардов/сек. Медленный хеш защищает от перебора.' },
      { question: 'Какой длины должен быть пароль?', answer: 'Минимум 12 символов для важных аккаунтов. Используйте менеджер паролей для генерации случайных паролей.' }
    ],
    sources: [
      { title: 'OWASP - Password Security', url: 'https://owasp.org/www-project-cheat-sheets/cheatsheets/Password_Storage_Cheat_Sheet.html' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор базовой аутентификации
export const base64Calculator: Calculator = {
  id: 'base64-converter',
  slug: 'base64-koder',
  title: 'Base64 кодирование',
  description: 'Кодирование и декодирование текста в Base64 и обратно',
  category: 'tehnika',
  subcategory: 'it-tools',
  type: 'converter',
  inputs: [
    {
      name: 'inputText',
      label: 'Текст для кодирования',
      type: 'text',
      placeholder: 'Hello World',
      defaultValue: 'Hello World'
    },
    {
      name: 'operation',
      label: 'Операция',
      type: 'select',
      options: [
        { value: 'encode', label: 'Кодировать' },
        { value: 'decode', label: 'Декодировать' }
      ],
      defaultValue: 'encode'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' },
    { name: 'originalLength', label: 'Длина оригинала', type: 'number', unit: 'байт' },
    { name: 'resultLength', label: 'Длина результата', type: 'number', unit: 'байт' },
    { name: 'sizeIncrease', label: 'Увеличение размера', type: 'number', unit: '%' },
    { name: 'usage', label: 'Использование', type: 'text' }
  ],
  calculate: (inputs) => {
    const inputText = String(inputs.inputText);
    const operation = String(inputs.operation);
    
    if (!inputText) {
      return [
        { value: '—', label: 'Результат' },
        { value: '—', label: 'Длина оригинала', unit: 'байт' },
        { value: '—', label: 'Длина результата', unit: 'байт' },
        { value: '—', label: 'Увеличение размера', unit: '%' },
        { value: '—', label: 'Использование' }
      ];
    }
    
    try {
      let result: string;
      let originalLength: number;
      let resultLength: number;
      
      if (operation === 'encode') {
        originalLength = new TextEncoder().encode(inputText).length;
        // Simple Base64 encoding
        const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        const bytes = new TextEncoder().encode(inputText);
        let output = '';
        
        for (let i = 0; i < bytes.length; i += 3) {
          const b1 = bytes[i];
          const b2 = bytes[i + 1] || 0;
          const b3 = bytes[i + 2] || 0;
          
          const bitmap = (b1 << 16) | (b2 << 8) | b3;
          
          output += base64Chars[(bitmap >> 18) & 63];
          output += base64Chars[(bitmap >> 12) & 63];
          output += (i + 1 < bytes.length) ? base64Chars[(bitmap >> 6) & 63] : '=';
          output += (i + 2 < bytes.length) ? base64Chars[bitmap & 63] : '=';
        }
        
        result = output;
        resultLength = result.length;
      } else {
        // Decode
        originalLength = inputText.length;
        try {
          // Simple Base64 decoding
          const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
          const input = inputText.replace(/=+$/, '');
          const output: number[] = [];
          
          for (let i = 0; i < input.length; i += 4) {
            const c1 = base64Chars.indexOf(input[i]);
            const c2 = base64Chars.indexOf(input[i + 1] || 'A');
            const c3 = base64Chars.indexOf(input[i + 2] || 'A');
            const c4 = base64Chars.indexOf(input[i + 3] || 'A');
            
            const bitmap = (c1 << 18) | (c2 << 12) | (c3 << 6) | c4;
            
            output.push((bitmap >> 16) & 255);
            if (input[i + 2] !== undefined && input[i + 2] !== '=') {
              output.push((bitmap >> 8) & 255);
            }
            if (input[i + 3] !== undefined && input[i + 3] !== '=') {
              output.push(bitmap & 255);
            }
          }
          
          result = new TextDecoder().decode(new Uint8Array(output));
          resultLength = new TextEncoder().encode(result).length;
        } catch {
          result = 'Ошибка декодирования: некорректный Base64';
          resultLength = 0;
        }
      }
      
      const sizeIncrease = operation === 'encode' 
        ? ((resultLength - originalLength) / originalLength) * 100 
        : ((originalLength - resultLength) / resultLength) * 100;
      
      return [
        { value: result, label: 'Результат' },
        { value: originalLength, label: 'Длина оригинала', unit: 'байт' },
        { value: resultLength, label: 'Длина результата', unit: 'байт' },
        { value: Math.round(sizeIncrease), label: 'Увеличение размера', unit: '%' },
        { value: 'Email вложения, URL-параметры, JSON бинарных данных, Data URI', label: 'Использование' }
      ];
    } catch (error) {
      return [
        { value: 'Ошибка кодирования', label: 'Результат' },
        { value: '—', label: 'Длина оригинала', unit: 'байт' },
        { value: '—', label: 'Длина результата', unit: 'байт' },
        { value: '—', label: 'Увеличение размера', unit: '%' },
        { value: '—', label: 'Использование' }
      ];
    }
  },
  content: {
    howTo: 'Введите текст и выберите операцию. Калькулятор покажет результат кодирования/декодирования Base64.',
    about: 'Base64 — метод кодирования бинарных данных текстом. Увеличивает размер на ~33%, но позволяет передавать бинарные данные через текстовые каналы (email, JSON, URL).',
    formula: '3 байта → 4 Base64 символа\nКаждые 6 бит кодируются одним символом из набора A-Z, a-z, 0-9, +/',
    faq: [
      { question: 'Base64 — это шифрование?', answer: 'Нет, это кодирование. Любой может декодировать. Это не замена шифрованию.' },
      { question: 'Зачем нужен Base64?', answer: 'Для передачи бинарных данных (изображения, файлы) через текстовые протоколы (HTTP, email), в JSON, XML.' }
    ],
    sources: [
      { title: 'RFC 4648 - Base64', url: 'https://tools.ietf.org/html/rfc4648' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор uptime и доступности
export const uptimeCalculator: Calculator = {
  id: 'uptime-calculator',
  slug: 'dostupnost-sistema',
  title: 'Калькулятор доступности системы',
  description: 'Перевод SLA (99.9%, 99.99%) в допустимое время простоя и наоборот',
  category: 'tehnika',
  subcategory: 'it-tools',
  type: 'converter',
  inputs: [
    {
      name: 'slaPercent',
      label: 'SLA (процент доступности)',
      type: 'number',
      placeholder: '99.9',
      min: 90,
      max: 99.9999,
      step: 0.0001,
      defaultValue: 99.9
    },
    {
      name: 'period',
      label: 'Период',
      type: 'select',
      options: [
        { value: 'day', label: 'Сутки' },
        { value: 'week', label: 'Неделя' },
        { value: 'month', label: 'Месяц' },
        { value: 'year', label: 'Год' }
      ],
      defaultValue: 'year'
    }
  ],
  outputs: [
    { name: 'uptimePercent', label: 'Доступность', type: 'number', unit: '%' },
    { name: 'downtimeMinutes', label: 'Максимальный простой', type: 'number', unit: 'мин' },
    { name: 'downtimeHours', label: 'В часах', type: 'number', unit: 'ч' },
    { name: 'nines', label: 'Количество девяток', type: 'text' },
    { name: 'classification', label: 'Классификация', type: 'text' }
  ],
  calculate: (inputs) => {
    const slaPercent = Number(inputs.slaPercent);
    const period = String(inputs.period);
    
    if (!slaPercent) {
      return [
        { value: '—', label: 'Доступность', unit: '%' },
        { value: '—', label: 'Максимальный простой', unit: 'мин' },
        { value: '—', label: 'В часах', unit: 'ч' },
        { value: '—', label: 'Количество девяток' },
        { value: '—', label: 'Классификация' }
      ];
    }
    
    // Period durations in minutes
    const periodMinutes: Record<string, number> = {
      'day': 24 * 60,
      'week': 7 * 24 * 60,
      'month': 30 * 24 * 60, // Average
      'year': 365.25 * 24 * 60
    };
    
    const minutes = periodMinutes[period];
    const downtimePercent = 100 - slaPercent;
    const downtimeMinutes = (downtimePercent / 100) * minutes;
    const downtimeHours = downtimeMinutes / 60;
    
    // Count nines
    let nines = 0;
    let temp = slaPercent;
    while (temp >= 99.0 && temp < 100) {
      nines++;
      temp = (temp - 99) * 10 + 9;
    }
    
    const ninesText = nines >= 1 ? `${nines} nine${nines > 1 ? 's' : ''} (${'9'.repeat(nines)})` : 'less than 1 nine';
    
    // Classification
    let classification: string;
    if (slaPercent >= 99.999) {
      classification = 'High Availability (HA) — критические системы';
    } else if (slaPercent >= 99.99) {
      classification = 'Enterprise — бизнес-критичные';
    } else if (slaPercent >= 99.9) {
      classification = 'Professional — важные системы';
    } else if (slaPercent >= 99.5) {
      classification = 'Standard — обычные сервисы';
    } else {
      classification = 'Basic — некритичные системы';
    }
    
    return [
      { value: slaPercent, label: 'Доступность', unit: '%' },
      { value: Math.round(downtimeMinutes), label: 'Максимальный простой', unit: 'мин' },
      { value: Number(downtimeHours.toFixed(2)), label: 'В часах', unit: 'ч' },
      { value: ninesText, label: 'Количество девяток' },
      { value: classification, label: 'Классификация' }
    ];
  },
  content: {
    howTo: 'Введите SLA в процентах и выберите период. Калькулятор покажет допустимое время простоя и классификацию.',
    about: 'SLA (Service Level Agreement) — соглашение об уровне обслуживания. 99.9% = "три девятки", допускает 8.76 часа простоя в год. 99.999% = "пять девяток" = 5 минут в год.',
    formula: 'Простой = (100% - SLA%) × Период\n99.9% за год = 0.1% × 8760 ч = 8.76 ч простоя',
    faq: [
      { question: 'Что такое "девятки"?', answer: 'Количество девяток после запятой в процентах. 99.9% = 3 девятки, 99.999% = 5 девяток.' },
      { question: 'Сколько стоит повысить SLA?', answer: 'Экспоненциально. С 99.9% до 99.99% — в 10 раз дороже, до 99.999% — ещё в 10 раз.' }
    ],
    sources: [
      { title: 'AWS - SLA Definitions', url: 'https://aws.amazon.com/legal/service-level-agreements/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор конвертации cron
export const cronCalculator: Calculator = {
  id: 'cron-parser',
  slug: 'cron-raspisanie',
  title: 'Калькулятор расписания cron',
  description: 'Интерпретация cron-выражений и расчёт времени следующего запуска',
  category: 'tehnika',
  subcategory: 'it-tools',
  type: 'reference',
  inputs: [
    {
      name: 'cronExpression',
      label: 'Cron-выражение',
      type: 'text',
      placeholder: '0 0 * * *',
      defaultValue: '0 0 * * *'
    },
    {
      name: 'timezone',
      label: 'Часовой пояс',
      type: 'select',
      options: [
        { value: 'UTC', label: 'UTC' },
        { value: 'MSK', label: 'Москва (MSK, UTC+3)' },
        { value: 'Europe-London', label: 'Лондон (GMT/BST)' },
        { value: 'America-New_York', label: 'Нью-Йорк (EST/EDT)' },
        { value: 'Asia-Tokyo', label: 'Токио (JST)' }
      ],
      defaultValue: 'MSK'
    }
  ],
  outputs: [
    { name: 'humanReadable', label: 'Описание', type: 'text' },
    { name: 'minutes', label: 'Минуты (0-59)', type: 'text' },
    { name: 'hours', label: 'Часы (0-23)', type: 'text' },
    { name: 'days', label: 'Дни месяца (1-31)', type: 'text' },
    { name: 'months', label: 'Месяцы (1-12)', type: 'text' },
    { name: 'weekdays', label: 'Дни недели (0-6)', type: 'text' },
    { name: 'examples', label: 'Примеры частых задач', type: 'text' }
  ],
  calculate: (inputs) => {
    const cronExpression = String(inputs.cronExpression).trim();
    
    const parts = cronExpression.split(/\s+/);
    if (parts.length !== 5) {
      return [
        { value: 'Некорректное cron-выражение (нужно 5 полей)', label: 'Описание' },
        { value: '—', label: 'Минуты (0-59)' },
        { value: '—', label: 'Часы (0-23)' },
        { value: '—', label: 'Дни месяца (1-31)' },
        { value: '—', label: 'Месяцы (1-12)' },
        { value: '—', label: 'Дни недели (0-6)' },
        { value: '—', label: 'Примеры частых задач' }
      ];
    }
    
    const [minutes, hours, days, months, weekdays] = parts;
    
    // Simple interpretation
    const interpretField = (field: string, type: string): string => {
      if (field === '*') return 'Каждый';
      if (field.startsWith('*/')) {
        const interval = field.slice(2);
        return `Каждый ${interval}${type === 'hours' ? '-й' : ''}`;
      }
      if (field.includes(',')) return `Конкретные: ${field}`;
      if (field.includes('-')) return `Диапазон: ${field}`;
      return `В ${field}`;
    };
    
    let description = '';
    if (minutes === '0' && hours === '0' && days === '*' && months === '*' && weekdays === '*') {
      description = 'Каждый день в полночь';
    } else if (minutes === '0' && hours === '0' && weekdays === '0') {
      description = 'Каждое воскресенье в полночь';
    } else if (minutes === '0' && hours === '*/12') {
      description = 'Каждые 12 часов (0:00 и 12:00)';
    } else if (minutes === '0' && hours === '*' ) {
      description = 'Каждый час';
    } else if (minutes.startsWith('*/')) {
      description = `Каждые ${minutes.slice(2)} минут`;
    } else {
      const h = hours === '*' ? 'каждый час' : `час ${hours}`;
      const m = minutes === '*' ? 'каждую минуту' : `минута ${minutes}`;
      description = `${m} ${h}`;
    }
    
    const examples = '0 0 * * * — ежедневно в полночь\n0 */6 * * * — каждые 6 часов\n0 2 * * 0 — каждое воскресенье в 2:00\n*/5 * * * * — каждые 5 минут\n0 0 1 * * — 1-го числа каждого месяца';
    
    return [
      { value: description, label: 'Описание' },
      { value: interpretField(minutes, 'minutes'), label: 'Минуты (0-59)' },
      { value: interpretField(hours, 'hours'), label: 'Часы (0-23)' },
      { value: interpretField(days, 'days'), label: 'Дни месяца (1-31)' },
      { value: interpretField(months, 'months'), label: 'Месяцы (1-12)' },
      { value: interpretField(weekdays, 'weekdays'), label: 'Дни недели (0-6)' },
      { value: examples, label: 'Примеры частых задач' }
    ];
  },
  content: {
    howTo: 'Введите cron-выражение из 5 полей (минуты, часы, дни, месяцы, дни недели). Калькулятор интерпретирует расписание.',
    about: 'Cron — планировщик задач в Unix/Linux. 5 полей: минуты (0-59), часы (0-23), дни месяца (1-31), месяцы (1-12), дни недели (0-6, где 0=воскресенье).',
    formula: 'Формат: МИНУТЫ ЧАСЫ ДНИ МЕСЯЦЫ ДНИ_НЕДЕЛИ\nСпецсимволы: * — любое, */n — каждое n-е, , — список, - — диапазон',
    faq: [
      { question: 'Что означает */5?', answer: 'Каждые 5 единиц. */5 в минутах = 0, 5, 10, 15... */6 в часах = 0, 6, 12, 18.' },
      { question: 'Как настроить еженедельную задачу?', answer: '0 0 * * 0 — каждое воскресенье в полночь. 0 9 * * 1 — каждый понедельник в 9:00.' }
    ],
    sources: [
      { title: 'crontab.guru', url: 'https://crontab.guru/' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const itDevopsCalculators: Calculator[] = [
  fileSizeCalculator,
  dataTransferCalculator,
  compressionCalculator,
  raidCalculator,
  subnetCalculator,
  passwordHashCalculator,
  base64Calculator,
  uptimeCalculator,
  cronCalculator
];
