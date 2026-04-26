import { Calculator } from '../types';

// Калькулятор IP-адреса и подсети
export const ipCalculator: Calculator = {
  id: 'ip-calculator',
  slug: 'ip-kalkulyator',
  title: 'Калькулятор IP-адреса и подсети',
  description: 'Расчёт сетевых параметров: маска, широковещательный адрес, количество хостов',
  category: 'tehnologii',
  subcategory: 'tech-set',
  type: 'formula',
  inputs: [
    {
      name: 'ip',
      label: 'IP-адрес',
      type: 'text',
      placeholder: '192.168.1.0',
      defaultValue: '192.168.1.0'
    },
    {
      name: 'prefix',
      label: 'Префикс (CIDR)',
      type: 'select',
      options: [
        { value: '24', label: '/24 (255.255.255.0) — 254 хоста' },
        { value: '16', label: '/16 (255.255.0.0) — 65,534 хоста' },
        { value: '8', label: '/8 (255.0.0.0) — 16,777,214 хостов' },
        { value: '30', label: '/30 (255.255.255.252) — 2 хоста' },
        { value: '28', label: '/28 (255.255.255.240) — 14 хостов' },
        { value: '26', label: '/26 (255.255.255.192) — 62 хоста' }
      ],
      defaultValue: '24'
    }
  ],
  outputs: [
    { name: 'network', label: 'Сетевой адрес', type: 'text' },
    { name: 'mask', label: 'Маска подсети', type: 'text' },
    { name: 'broadcast', label: 'Broadcast', type: 'text' },
    { name: 'hosts', label: 'Доступно хостов', type: 'text' },
    { name: 'range', label: 'Диапазон', type: 'text' }
  ],
  calculate: (inputs) => {
    const ip = String(inputs.ip);
    const prefix = parseInt(String(inputs.prefix), 10);
    
    // Parse IP
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
      return [
        { value: 'Ошибка в IP', label: 'Ошибка' },
        { value: '—', label: 'Маска' },
        { value: '—', label: 'Broadcast' },
        { value: '—', label: 'Хосты' },
        { value: '—', label: 'Диапазон' }
      ];
    }
    
    // Convert to 32-bit integer
    const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    
    // Calculate mask
    const maskNum = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    
    // Network address
    const networkNum = (ipNum & maskNum) >>> 0;
    
    // Broadcast
    const broadcastNum = (networkNum | (~maskNum >>> 0)) >>> 0;
    
    // Number of hosts
    const hosts = Math.max(0, Math.pow(2, 32 - prefix) - 2);
    
    // Convert back to dotted notation
    const toIp = (num: number) => {
      return [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
      ].join('.');
    };
    
    const network = toIp(networkNum);
    const mask = toIp(maskNum);
    const broadcast = toIp(broadcastNum);
    
    // Range
    const firstHost = toIp((networkNum + 1) >>> 0);
    const lastHost = toIp((broadcastNum - 1) >>> 0);
    
    return [
      { value: network, label: 'Сеть' },
      { value: mask, label: 'Маска подсети' },
      { value: broadcast, label: 'Широковещательный' },
      { value: hosts.toLocaleString(), label: 'Количество хостов' },
      { value: `${firstHost} — ${lastHost}`, label: 'Диапазон IP' }
    ];
  },
  content: {
    howTo: 'Введите IP-адрес и выберите CIDR-префикс. Калькулятор рассчитает все сетевые параметры.',
    about: 'IP-адрес — уникальный идентификатор устройства в сети. Маска определяет размер подсети. CIDR — Classless Inter-Domain Routing.',
    usage: 'Используется сетевыми администраторами, для настройки роутеров, планирования сетей, DevOps.',
    formula: 'Маска = 32 − log₂(количество адресов)\nХостов = 2^(32−prefix) − 2\n(за вычетом сети и broadcast)',
    faq: [
      {
        question: 'Что такое /24?',
        answer: 'CIDR-префикс /24 означает, что первые 24 бита — адрес сети, последние 8 — хосты. Маска: 255.255.255.0. Хостов: 254.'
      },
      {
        question: 'Зачем нужен broadcast?',
        answer: 'Broadcast-адрес используется для отправки данных всем устройствам в сети одновременно. Например, ARP-запросы.'
      }
    ],
    sources: [
      { title: 'CIDR — Википедия', url: 'https://ru.wikipedia.org/wiki/Бесклассовая_адресация' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор разрешения экрана (DPI/PPI)
export const dpiCalculator: Calculator = {
  id: 'dpi-display-calculator',
  slug: 'dpi-ppi-razreshenie',
  title: 'Калькулятор DPI/PPI',
  description: 'Расчёт плотности пикселей экрана, размеров элементов',
  category: 'tehnologii',
  subcategory: 'tech-ekrany',
  type: 'formula',
  inputs: [
    {
      name: 'width',
      label: 'Ширина (пикселей)',
      type: 'number',
      placeholder: '1920',
      defaultValue: 1920
    },
    {
      name: 'height',
      label: 'Высота (пикселей)',
      type: 'number',
      placeholder: '1080',
      defaultValue: 1080
    },
    {
      name: 'diagonal',
      label: 'Диагональ экрана (дюймов)',
      type: 'number',
      placeholder: '24',
      defaultValue: 24
    },
    {
      name: 'viewingDistance',
      label: 'Расстояние просмотра (см)',
      type: 'number',
      placeholder: '60',
      defaultValue: 60
    }
  ],
  outputs: [
    { name: 'ppi', label: 'PPI (пикселей на дюйм)', type: 'number' },
    { name: 'totalPixels', label: 'Всего пикселей', type: 'text' },
    { name: 'aspectRatio', label: 'Соотношение сторон', type: 'text' },
    { name: 'retina', label: 'Retina-стандарт', type: 'text' }
  ],
  calculate: (inputs) => {
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const diagonal = Number(inputs.diagonal);
    const distance = Number(inputs.viewingDistance);
    
    // Calculate diagonal in pixels
    const diagonalPixels = Math.sqrt(width * width + height * height);
    
    // PPI
    const ppi = diagonalPixels / diagonal;
    
    // Total pixels
    const totalPixels = width * height;
    const megaPixels = (totalPixels / 1000000).toFixed(1);
    
    // Aspect ratio
    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b);
    };
    const divisor = gcd(width, height);
    const ratioW = width / divisor;
    const ratioH = height / divisor;
    
    // Standard aspect ratio name
    let ratioName = `${ratioW}:${ratioH}`;
    if (Math.abs(width / height - 16 / 9) < 0.01) ratioName = '16:9';
    if (Math.abs(width / height - 4 / 3) < 0.01) ratioName = '4:3';
    if (Math.abs(width / height - 21 / 9) < 0.01) ratioName = '21:9 (UltraWide)';
    
    // Retina calculation (Apple's formula: roughly 60 PPI at viewing distance)
    const retinaPpi = 60 / (distance / 2.54) * 2.5; // approximate
    const isRetina = ppi >= retinaPpi * 0.8;
    
    return [
      { value: Math.round(ppi), label: 'PPI (pixels per inch)' },
      { value: `${totalPixels.toLocaleString()} (${megaPixels} MP)`, label: 'Всего пикселей' },
      { value: ratioName, label: 'Соотношение сторон' },
      { value: isRetina ? '✅ Да, Retina-класс' : `❌ Нет (нужно ${Math.round(retinaPpi)}+ PPI)`, label: 'Retina на этом расстоянии' }
    ];
  },
  content: {
    howTo: 'Введите разрешение экрана в пикселях, диагональ в дюймах и расстояние просмотра.',
    about: 'PPI (pixels per inch) — плотность пикселей. Чем выше, тем чётче картинка. Retina — маркетинговый термин Apple для высокой плотности.',
    usage: 'Используется при выборе монитора, смартфона, расчёте качества изображения, веб-дизайне.',
    formula: 'PPI = √(W² + H²) / Диагональ\nгде W, H — ширина и высота в пикселях',
    faq: [
      {
        question: 'Какой PPI считается хорошим?',
        answer: 'Для смартфонов: 300+ PPI. Для мониторов: 100-150 PPI. Для печати: 300 PPI. Чем ближе глаза, тем выше нужен PPI.'
      },
      {
        question: 'В чём разница DPI и PPI?',
        answer: 'DPI (dots per inch) — для печати, количество точек краски. PPI (pixels per inch) — для экранов, количество пикселей. Часто путают.'
      }
    ],
    sources: [
      { title: 'Pixel density — Википедия', url: 'https://en.wikipedia.org/wiki/Pixel_density' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор RAID
export const raidCalculator: Calculator = {
  id: 'raid-basic-calculator',
  slug: 'raid-kalkulyator',
  title: 'Калькулятор RAID',
  description: 'Расчёт ёмкости, надёжности и производительности RAID-массивов',
  category: 'tehnologii',
  subcategory: 'tech-hranenie',
  type: 'formula',
  inputs: [
    {
      name: 'drives',
      label: 'Количество дисков',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      min: 2,
      max: 24
    },
    {
      name: 'driveSize',
      label: 'Объём одного диска (ТБ)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4
    },
    {
      name: 'raidLevel',
      label: 'Уровень RAID',
      type: 'select',
      options: [
        { value: '0', label: 'RAID 0 (stripe) — скорость, нет защиты' },
        { value: '1', label: 'RAID 1 (mirror) — зеркало, 50% ёмкость' },
        { value: '5', label: 'RAID 5 — распределённый XOR, 1 диск защита' },
        { value: '6', label: 'RAID 6 — двойной XOR, 2 диска защита' },
        { value: '10', label: 'RAID 10 — зеркало + страйп, быстрый и надёжный' }
      ],
      defaultValue: '5'
    }
  ],
  outputs: [
    { name: 'capacity', label: 'Полезная ёмкость', type: 'text' },
    { name: 'redundancy', label: 'Избыточность', type: 'text' },
    { name: 'faultTolerance', label: 'Отказоустойчивость', type: 'text' },
    { name: 'performance', label: 'Характеристики', type: 'text' }
  ],
  calculate: (inputs) => {
    const drives = Number(inputs.drives);
    const size = Number(inputs.driveSize);
    const level = String(inputs.raidLevel);
    
    let capacity = 0;
    let redundancy = '';
    let faultTolerance = '';
    let performance = '';
    
    switch (level) {
      case '0':
        capacity = drives * size;
        redundancy = 'Нет (0%)';
        faultTolerance = '❌ Выход любого диска = потеря всех данных';
        performance = '✅ Максимальная скорость чтения/записи';
        break;
      case '1':
        capacity = size; // Only one drive worth
        redundancy = `${(drives - 1) * size} ТБ (${Math.round((drives - 1) / drives * 100)}%)`;
        faultTolerance = `✅ Может выйти из строя ${drives - 1} из ${drives} дисков`;
        performance = '⚡️ Быстрое чтение, средняя запись';
        break;
      case '5':
        capacity = (drives - 1) * size;
        redundancy = `${size} ТБ (${Math.round(1 / drives * 100)}%)`;
        faultTolerance = `✅ Может выйти 1 диск из ${drives}`;
        performance = '⚡️ Быстрое чтение, медленная запись (сложный XOR)';
        break;
      case '6':
        capacity = (drives - 2) * size;
        redundancy = `${2 * size} ТБ (${Math.round(2 / drives * 100)}%)`;
        faultTolerance = `✅ Могут выйти 2 диска из ${drives}`;
        performance = '📊 Сбалансированная скорость, высокая защита';
        break;
      case '10':
        capacity = (drives / 2) * size;
        redundancy = `${capacity} ТБ (50%)`;
        faultTolerance = `✅ Может выйти ${drives / 2} дисков (по одному из каждой пары)`;
        performance = '⚡️⚡️ Максимальная скорость чтения и записи';
        break;
    }
    
    return [
      { value: `${capacity} ТБ`, label: 'Полезная ёмкость' },
      { value: redundancy, label: 'Избыточность' },
      { value: faultTolerance, label: 'Отказоустойчивость' },
      { value: performance, label: 'Производительность' }
    ];
  },
  content: {
    howTo: 'Введите количество дисков, их объём и уровень RAID. Калькулятор покажет ёмкость и надёжность массива.',
    about: 'RAID (Redundant Array of Independent Disks) — объединение дисков для повышения надёжности или скорости.',
    usage: 'Используется системными администраторами, при проектировании хранилищ, выборе NAS/SAN, резервном копировании.',
    formula: 'RAID 0: Все диски для скорости\nRAID 1: Зеркалирование\nRAID 5: N-1 дисков данных, 1 чётность\nRAID 6: N-2 дисков данных, 2 чётности',
    faq: [
      {
        question: 'Какой RAID выбрать?',
        answer: 'RAID 0 — для скорости (игры, видеомонтаж). RAID 1 — для надёжности (2 диска). RAID 5 — баланс (4+ диска). RAID 6 — максимальная защита (6+ диска). RAID 10 — для баз данных (скорость + защита).'
      },
      {
        question: 'Что такое XOR в RAID?',
        answer: 'Операция "исключающее ИЛИ" используется для расчёта чётности. Позволяет восстановить данные при выходе диска из строя.'
      }
    ],
    sources: [
      { title: 'RAID — Википедия', url: 'https://ru.wikipedia.org/wiki/RAID' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор битрейта видео
export const bitrateCalculator: Calculator = {
  id: 'bitrate-calculator',
  slug: 'bitrate-video',
  title: 'Калькулятор битрейта видео',
  description: 'Расчёт размера файла по параметрам видео',
  category: 'tehnologii',
  subcategory: 'tech-video',
  type: 'formula',
  inputs: [
    {
      name: 'resolution',
      label: 'Разрешение',
      type: 'select',
      options: [
        { value: 'sd', label: 'SD (720×480) — DVD качество' },
        { value: 'hd', label: 'HD (1280×720) — 720p' },
        { value: 'fhd', label: 'Full HD (1920×1080) — 1080p' },
        { value: '4k', label: '4K UHD (3840×2160)' },
        { value: '8k', label: '8K UHD (7680×4320)' }
      ],
      defaultValue: 'fhd'
    },
    {
      name: 'fps',
      label: 'Частота кадров (FPS)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30
    },
    {
      name: 'bitrate',
      label: 'Битрейт (Мбит/с)',
      type: 'number',
      placeholder: '8',
      defaultValue: 8
    },
    {
      name: 'duration',
      label: 'Длительность (минут)',
      type: 'number',
      placeholder: '90',
      defaultValue: 90
    }
  ],
  outputs: [
    { name: 'fileSize', label: 'Размер файла', type: 'text' },
    { name: 'perMinute', label: 'В минуту', type: 'text' },
    { name: 'pixels', label: 'Пикселей в кадре', type: 'text' },
    { name: 'dataRate', label: 'Скорость данных', type: 'text' }
  ],
  calculate: (inputs) => {
    const resolution = String(inputs.resolution);
    const fps = Number(inputs.fps);
    const bitrate = Number(inputs.bitrate);
    const duration = Number(inputs.duration);
    
    const resolutions: Record<string, { w: number; h: number; name: string }> = {
      'sd': { w: 720, h: 480, name: 'SD' },
      'hd': { w: 1280, h: 720, name: 'HD 720p' },
      'fhd': { w: 1920, h: 1080, name: 'Full HD 1080p' },
      '4k': { w: 3840, h: 2160, name: '4K UHD' },
      '8k': { w: 7680, h: 4320, name: '8K UHD' }
    };
    
    const res = resolutions[resolution];
    const pixels = res.w * res.h;
    const megapixels = (pixels / 1000000).toFixed(1);
    
    // File size: bitrate (Mbps) * duration (seconds) / 8 = MB
    const fileSizeMB = (bitrate * duration * 60) / 8;
    const fileSizeGB = fileSizeMB / 1024;
    
    // Per minute
    const perMinuteMB = (bitrate * 60) / 8;
    
    // Data rate
    const dataRateMB = bitrate / 8;
    
    let sizeText = '';
    if (fileSizeGB >= 1) {
      sizeText = `${fileSizeGB.toFixed(2)} ГБ`;
    } else {
      sizeText = `${Math.round(fileSizeMB)} МБ`;
    }
    
    return [
      { value: sizeText, label: 'Размер файла' },
      { value: `${Math.round(perMinuteMB)} МБ/мин`, label: 'В минуту' },
      { value: `${pixels.toLocaleString()} (${megapixels} MP)`, label: 'Пикселей в кадре' },
      { value: `${dataRateMB.toFixed(1)} МБ/с`, label: 'Скорость потока' }
    ];
  },
  content: {
    howTo: 'Выберите разрешение, введите FPS, битрейт и длительность. Калькулятор рассчитает размер файла.',
    about: 'Битрейт — количество данных, обрабатываемых за единицу времени. Влияет на качество и размер видео.',
    usage: 'Используется видеомонтажёрами, стримерами, для планирования хранилищ, настройки кодеков.',
    formula: 'Размер (МБ) = Битрейт (Мбит/с) × Время (с) / 8\n1 байт = 8 бит',
    faq: [
      {
        question: 'Какой битрейт выбрать?',
        answer: 'YouTube 1080p: 8 Мбит/с. Профессиональное видео: 25-50 Мбит/с. 4K: 35-100 Мбит/с. Стрим: 4-6 Мбит/с для 1080p.'
      },
      {
        question: 'Почему 4K занимает так много места?',
        answer: '4K содержит в 4 раза больше пикселей, чем 1080p. При том же битрейте качество было бы хуже, поэтому нужен более высокий битрейт.'
      }
    ],
    sources: [
      { title: 'Битрейт — Википедия', url: 'https://ru.wikipedia.org/wiki/Битрейт' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор скорости интернета
export const internetSpeedCalculator: Calculator = {
  id: 'internet-speed-calculator',
  slug: 'skorost-interneta',
  title: 'Калькулятор скорости интернета',
  description: 'Расчёт времени загрузки и скачивания файлов',
  category: 'tehnologii',
  subcategory: 'tech-set',
  type: 'formula',
  inputs: [
    {
      name: 'speed',
      label: 'Скорость интернета',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'speedUnit',
      label: 'Единица скорости',
      type: 'select',
      options: [
        { value: 'mbps', label: 'Мбит/с (Mbps) — обычно указывается провайдерами' },
        { value: 'mb', label: 'МБ/с (MB/s) — реальная скорость' }
      ],
      defaultValue: 'mbps'
    },
    {
      name: 'fileSize',
      label: 'Размер файла',
      type: 'number',
      placeholder: '5',
      defaultValue: 5
    },
    {
      name: 'fileUnit',
      label: 'Единица размера',
      type: 'select',
      options: [
        { value: 'mb', label: 'МБ' },
        { value: 'gb', label: 'ГБ' },
        { value: 'tb', label: 'ТБ' }
      ],
      defaultValue: 'gb'
    }
  ],
  outputs: [
    { name: 'downloadTime', label: 'Время скачивания', type: 'text' },
    { name: 'realSpeed', label: 'Реальная скорость', type: 'text' },
    { name: 'perHour', label: 'В час', type: 'text' }
  ],
  calculate: (inputs) => {
    const speed = Number(inputs.speed);
    const speedUnit = String(inputs.speedUnit);
    const fileSize = Number(inputs.fileSize);
    const fileUnit = String(inputs.fileUnit);
    
    // Convert speed to MB/s
    let speedMBs = speed;
    if (speedUnit === 'mbps') {
      speedMBs = speed / 8;
    }
    
    // Convert file size to MB
    let fileSizeMB = fileSize;
    if (fileUnit === 'gb') {
      fileSizeMB = fileSize * 1024;
    } else if (fileUnit === 'tb') {
      fileSizeMB = fileSize * 1024 * 1024;
    }
    
    // Calculate time in seconds
    const timeSeconds = fileSizeMB / speedMBs;
    
    // Format time
    let timeText = '';
    if (timeSeconds < 60) {
      timeText = `${Math.round(timeSeconds)} сек`;
    } else if (timeSeconds < 3600) {
      const minutes = Math.floor(timeSeconds / 60);
      const seconds = Math.round(timeSeconds % 60);
      timeText = `${minutes} мин ${seconds} сек`;
    } else {
      const hours = Math.floor(timeSeconds / 3600);
      const minutes = Math.floor((timeSeconds % 3600) / 60);
      timeText = `${hours} ч ${minutes} мин`;
    }
    
    // Per hour
    const perHourGB = (speedMBs * 3600) / 1024;
    
    return [
      { value: timeText, label: 'Время скачивания' },
      { value: `${speedMBs.toFixed(1)} МБ/с`, label: 'Реальная скорость' },
      { value: `${perHourGB.toFixed(1)} ГБ/час`, label: 'Можно скачать за час' }
    ];
  },
  content: {
    howTo: 'Введите скорость интернета, выберите единицы, введите размер файла. Калькулятор покажет время загрузки.',
    about: 'Провайдеры указывают скорость в Мбит/с (Mbps), но браузеры показывают в МБ/с (MB/s). 1 МБ/с = 8 Мбит/с.',
    usage: 'Используется для планирования загрузок, выбора тарифа интернета, оценки времени скачивания.',
    formula: 'Время = Размер / Скорость\n1 байт = 8 бит\n1 ГБ = 1024 МБ',
    faq: [
      {
        question: 'Почему я не получаю заявленную скорость?',
        answer: 'Провайдер указывает максимальную скорость. Реальная зависит от: загруженности сети, сервера, Wi-Fi, дальности от роутера.'
      },
      {
        question: 'Сколько нужно для 4K видео?',
        answer: 'Для одного 4K-потока: 25-50 Мбит/с. Для комфортной работы дома: 100+ Мбит/с. Для большой семьи: 300+ Мбит/с.'
      }
    ],
    sources: [
      { title: 'Скорость передачи данных — Википедия', url: 'https://ru.wikipedia.org/wiki/Скорость_передачи_данных' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Калькулятор хеширования (контрольная сумма)
export const hashCalculator: Calculator = {
  id: 'hash-calculator',
  slug: 'kontrolnaya-summa',
  title: 'Калькулятор хешей (контрольных сумм)',
  description: 'Расчёт CRC32 и информация о хеш-функциях',
  category: 'tehnologii',
  subcategory: 'tech-hranenie',
  type: 'formula',
  inputs: [
    {
      name: 'input',
      label: 'Текст для хеширования',
      type: 'text',
      placeholder: 'Hello, World!',
      defaultValue: 'Hello, World!'
    },
    {
      name: 'algorithm',
      label: 'Алгоритм',
      type: 'select',
      options: [
        { value: 'length', label: 'Длина строки' },
        { value: 'simple', label: 'Простая сумма (для демонстрации)' },
        { value: 'info', label: 'Информация об алгоритмах' }
      ],
      defaultValue: 'length'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' },
    { name: 'info', label: 'Информация', type: 'text' }
  ],
  calculate: (inputs) => {
    const input = String(inputs.input);
    const algo = String(inputs.algorithm);
    
    if (algo === 'length') {
      return [
        { value: `${input.length} символов`, label: 'Длина строки' },
        { value: `${new Blob([input]).size} байт`, label: 'Размер в байтах' }
      ];
    } else if (algo === 'simple') {
      // Simple checksum for demonstration
      let sum = 0;
      for (let i = 0; i < input.length; i++) {
        sum = (sum + input.charCodeAt(i)) % 65535;
      }
      return [
        { value: sum.toString(16).toUpperCase().padStart(4, '0'), label: 'Простая контрольная сумма' },
        { value: 'Для реальных задач используйте MD5/SHA256', label: 'Примечание' }
      ];
    } else {
      return [
        { value: '—', label: 'Выберите алгоритм' },
        { value: 'MD5: 128 бит, SHA-1: 160 бит, SHA-256: 256 бит. CRC32 для проверки целостности.', label: 'Популярные алгоритмы' }
      ];
    }
  },
  content: {
    howTo: 'Введите текст и выберите алгоритм. Калькулятор покажет информацию о хешировании.',
    about: 'Хеш-функция преобразует данные произвольного размера в фиксированную строку (хеш). Используется для проверки целостности и хранения паролей.',
    usage: 'Используется для проверки целостности файлов, хранения паролей, цифровых подписей, блокчейна.',
    formula: 'Хеш: произвольные данные → фиксированная строка\nОдносторонняя функция: невозможно восстановить данные из хеша',
    faq: [
      {
        question: 'Что такое MD5 и SHA?',
        answer: 'MD5 — устаревший алгоритм (128 бит), небезопасен. SHA-256 — современный стандарт (256 бит), используется везде.'
      },
      {
        question: 'Как проверить целостность файла?',
        answer: 'Скачайте файл, вычислите его хеш (например, SHA-256), сравните с опубликованным на сайте. Если совпадают — файл не повреждён.'
      }
    ],
    sources: [
      { title: 'Хеш-функция — Википедия', url: 'https://ru.wikipedia.org/wiki/Хеш-функция' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Секундомер (данные — UI реализован как client component)
export const stopwatchCalculator: Calculator = {
  id: 'stopwatch-calculator',
  slug: 'sekundomer',
  title: 'Секундомер',
  description: 'Онлайн-секундомер с отметками времени (круги)',
  category: 'tekhnologii',
  subcategory: 'data-i-vremya',
  type: 'timer',
  inputs: [],
  outputs: [],
  calculate: () => [],
  content: {
    howTo: 'Нажмите кнопку "Старт" для запуска секундомера, "Стоп" — для паузы, "Круг" — для фиксации промежуточного времени, "Сброс" — для обнуления.',
    about: 'Секундомер измеряет время с точностью до миллисекунды. Использует системные часы устройства.',
    usage: 'Для спортивных тренировок, измерения длительности задач, кулинарии, экспериментов.',
    formula: 'Время измеряется через performance.now() или Date.now() в браузере.',
    faq: [
      {
        question: 'Насколько точен секундомер?',
        answer: 'Браузерный таймер обычно точен до 1-15 мс. Для спортивных соревнований используйте профессиональное оборудование.'
      },
      {
        question: 'Сохраняются ли данные при обновлении страницы?',
        answer: 'Нет, при обновлении страницы секундомер сбрасывается.'
      }
    ],
    sources: [
      { title: 'Секундомер — Википедия', url: 'https://ru.wikipedia.org/wiki/Секундомер' }
    ],
    updatedAt: '2026-04-26'
  }
};

export const technologyCalculators = [
  ipCalculator,
  dpiCalculator,
  raidCalculator,
  bitrateCalculator,
  internetSpeedCalculator,
  hashCalculator,
  stopwatchCalculator,
];
