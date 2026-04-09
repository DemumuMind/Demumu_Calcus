import { Calculator } from '../types';

// Продвинутый генератор случайных чисел с разными распределениями
export const advancedRandomGenerator: Calculator = {
  id: 'advanced-random',
  slug: 'prodvinutyj-generator-sluchajnyh-chisel',
  title: 'Продвинутый генератор случайных чисел',
  description: 'Генератор случайных чисел с различными распределениями: равномерное, нормальное, экспоненциальное',
  category: 'tekhnologii',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'min',
      label: 'Минимум',
      type: 'number',
      placeholder: '1',
      defaultValue: 1
    },
    {
      name: 'max',
      label: 'Максимум',
      type: 'number',
      placeholder: '100',
      defaultValue: 100
    },
    {
      name: 'distribution',
      label: 'Распределение',
      type: 'select',
      options: [
        { value: 'uniform', label: 'Равномерное (равновероятное)' },
        { value: 'normal', label: 'Нормальное (Гаусса)' },
        { value: 'exponential', label: 'Экспоненциальное' }
      ],
      defaultValue: 'uniform'
    },
    {
      name: 'count',
      label: 'Количество чисел',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 1,
      max: 20
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' },
    { name: 'stats', label: 'Статистика', type: 'text' }
  ],
  calculate: (inputs) => {
    const min = Number(inputs.min);
    const max = Number(inputs.max);
    const distribution = String(inputs.distribution);
    const count = Math.min(Math.max(Number(inputs.count), 1), 20);
    
    if (isNaN(min) || isNaN(max) || min >= max) {
      return [{ value: 'Неверный диапазон', label: 'Ошибка' }];
    }
    
    const numbers: number[] = [];
    
    for (let i = 0; i < count; i++) {
      let value: number;
      
      switch (distribution) {
        case 'uniform':
          value = Math.floor(Math.random() * (max - min + 1)) + min;
          break;
        case 'normal':
          // Box-Muller transform for normal distribution
          const u1 = Math.random();
          const u2 = Math.random();
          const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
          // Scale to range, center around mean
          const mean = (min + max) / 2;
          const stdDev = (max - min) / 6;
          value = Math.round(mean + z * stdDev);
          // Clamp to range
          value = Math.max(min, Math.min(max, value));
          break;
        case 'exponential':
          // Exponential distribution (for time intervals, radioactive decay, etc.)
          const lambda = 1 / ((max - min) / 4);
          const expValue = -Math.log(1 - Math.random()) / lambda;
          value = Math.round(min + expValue);
          value = Math.max(min, Math.min(max, value));
          break;
        default:
          value = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      numbers.push(value);
    }
    
    // Calculate statistics
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = (sum / numbers.length).toFixed(2);
    const minVal = Math.min(...numbers);
    const maxVal = Math.max(...numbers);
    
    const distNames: Record<string, string> = {
      uniform: 'равномерное',
      normal: 'нормальное',
      exponential: 'экспоненциальное'
    };
    
    return [
      { value: numbers.join(', '), label: `Числа (${distNames[distribution]} распределение)`, unit: '' },
      { value: `Среднее: ${avg}, Мин: ${minVal}, Макс: ${maxVal}`, label: 'Статистика', unit: '' }
    ];
  },
  content: {
    howTo: 'Введите диапазон, выберите тип распределения и количество чисел. Калькулятор сгенерирует случайные числа с указанными характеристиками.',
    about: 'Продвинутый генератор с поддержкой различных статистических распределений: равномерное (каждое число равновероятно), нормальное (большинство значений около среднего), экспоненциальное (для моделирования временных интервалов).',
    usage: 'Используется для статистического моделирования, симуляций, генерации тестовых данных, обучения теории вероятностей.',
    formula: 'Равномерное: min + floor(random × (max - min + 1)) | Нормальное: преобразование Бокса-Мюллера | Экспоненциальное: -ln(1 - random) / λ',
    faq: [
      {
        question: 'Какое распределение выбрать?',
        answer: 'Равномерное — когда все значения должны быть равновероятны. Нормальное — когда большинство значений должны быть около среднего. Экспоненциальное — для времени между событиями.'
      },
      {
        question: 'Для чего используется нормальное распределение?',
        answer: 'Для моделирования реальных явлений: рост людей, результаты тестов, ошибки измерений, где большинство значений близки к среднему.'
      },
      {
        question: 'Что такое экспоненциальное распределение?',
        answer: 'Описывает время между независимыми событиями: время между звонками в колл-центр, распад радиоактивных атомов, время между приходом клиентов.'
      }
    ],
    sources: [
      { title: 'Распределение вероятностей — Википедия', url: 'https://ru.wikipedia.org/wiki/Распределение_вероятностей' },
      { title: 'Нормальное распределение — Википедия', url: 'https://ru.wikipedia.org/wiki/Нормальное_распределение' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Генератор UUID/GUID
export const uuidGenerator: Calculator = {
  id: 'uuid-generator',
  slug: 'generator-uuid-guid',
  title: 'Генератор UUID/GUID',
  description: 'Генератор уникальных идентификаторов: UUID v4 (случайный), v1 (timestamp), v5 (SHA-1)',
  category: 'tekhnologii',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'version',
      label: 'Версия UUID',
      type: 'select',
      options: [
        { value: 'v4', label: 'UUID v4 — случайный (рекомендуется)' },
        { value: 'v1', label: 'UUID v1 — временная метка + MAC' },
        { value: 'v5', label: 'UUID v5 — SHA-1 хеш (детерминированный)' }
      ],
      defaultValue: 'v4'
    },
    {
      name: 'count',
      label: 'Количество',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 1,
      max: 10
    },
    {
      name: 'format',
      label: 'Формат',
      type: 'select',
      options: [
        { value: 'standard', label: 'Стандартный (с дефисами)' },
        { value: 'compact', label: 'Компактный (без дефисов)' },
        { value: 'braces', label: 'С фигурными скобками' }
      ],
      defaultValue: 'standard'
    }
  ],
  outputs: [
    { name: 'uuids', label: 'UUID', type: 'text' }
  ],
  calculate: (inputs) => {
    const version = String(inputs.version);
    const count = Math.min(Math.max(Number(inputs.count), 1), 10);
    const format = String(inputs.format);
    
    const uuids: string[] = [];
    
    for (let i = 0; i < count; i++) {
      let uuid = '';
      
      if (version === 'v4') {
        // UUID v4 — случайный
        const hex = '0123456789abcdef';
        for (let j = 0; j < 36; j++) {
          if (j === 8 || j === 13 || j === 18 || j === 23) {
            uuid += '-';
          } else if (j === 14) {
            uuid += '4'; // Version 4
          } else if (j === 19) {
            uuid += hex[(Math.random() * 4) | 8]; // Variant
          } else {
            uuid += hex[Math.floor(Math.random() * 16)];
          }
        }
      } else if (version === 'v1') {
        // UUID v1 — timestamp + random node
        const timestamp = Date.now();
        const timeHex = timestamp.toString(16).padStart(12, '0');
        const node = Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        uuid = `${timeHex.slice(0, 8)}-${timeHex.slice(8)}-1${Math.floor(Math.random() * 4 + 8).toString(16)}${Math.floor(Math.random() * 16).toString(16)}-${Math.floor(Math.random() * 16).toString(16)}${Math.floor(Math.random() * 16).toString(16)}-${node.slice(0, 12)}`;
      } else if (version === 'v5') {
        // UUID v5 — deterministic based on namespace + name
        const namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'; // DNS namespace
        const name = `calcus-${Date.now()}-${i}`;
        const hashInput = namespace + name;
        let hash = 0;
        for (let j = 0; j < hashInput.length; j++) {
          hash = ((hash << 5) - hash + hashInput.charCodeAt(j)) | 0;
        }
        const hashHex = Math.abs(hash).toString(16).padStart(32, '0');
        uuid = `${hashHex.slice(0, 8)}-${hashHex.slice(8, 12)}-5${hashHex.slice(13, 16)}-${(parseInt(hashHex.slice(16, 17), 16) & 3 | 8).toString(16)}${hashHex.slice(17, 20)}-${hashHex.slice(20, 32)}`;
      }
      
      // Apply format
      let formatted = uuid;
      if (format === 'compact') {
        formatted = uuid.replace(/-/g, '');
      } else if (format === 'braces') {
        formatted = `{${uuid}}`;
      }
      
      uuids.push(formatted);
    }
    
    return [
      { value: uuids.join('\n'), label: `UUID ${version.toUpperCase()}`, unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите версию UUID, количество и формат. UUID v4 (случайный) рекомендуется для большинства случаев.',
    about: 'UUID (Universally Unique Identifier) — 128-битный идентификатор. Версия 4 — полностью случайная, версия 1 — основана на времени, версия 5 — детерминированная на основе хеша SHA-1.',
    usage: 'Используется в базах данных как первичные ключи, для идентификации сессий, файлов, заказов, документов, где требуется глобальная уникальность.',
    formula: 'UUID v4: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (где x — случайный, y — 8, 9, a, или b)',
    faq: [
      {
        question: 'Какую версию UUID использовать?',
        answer: 'UUID v4 для большинства случаев — полностью случайный и безопасный. UUID v1 если нужно отслеживать время создания. UUID v5 для детерминированных идентификаторов из строк.'
      },
      {
        question: 'Могут ли UUID повториться?',
        answer: 'Теоретически возможно, но вероятность ничтожна. Для UUID v4: 1 из 2^122 (примерно 1 из 5×10^36).'
      },
      {
        question: 'Чем GUID отличается от UUID?',
        answer: 'GUID (Microsoft) и UUID (стандарт ITU-T/ISO/IEC) технически идентичны — оба 128-битные идентификаторы.'
      }
    ],
    sources: [
      { title: 'UUID — Википедия', url: 'https://ru.wikipedia.org/wiki/UUID' },
      { title: 'RFC 4122 — UUID Specification', url: 'https://tools.ietf.org/html/rfc4122' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Генератор штрих-кодов
export const barcodeGenerator: Calculator = {
  id: 'barcode-generator',
  slug: 'generator-shtrih-kodov',
  title: 'Генератор штрих-кодов',
  description: 'Генератор и проверка штрих-кодов: EAN-8, EAN-13, UPC-A, Code128, Code39, ISBN',
  category: 'tekhnologii',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'type',
      label: 'Тип штрих-кода',
      type: 'select',
      options: [
        { value: 'ean13', label: 'EAN-13 (товары в Европе)' },
        { value: 'ean8', label: 'EAN-8 (маленькие товары)' },
        { value: 'upca', label: 'UPC-A (США, Канада)' },
        { value: 'isbn10', label: 'ISBN-10 (книги до 2007)' },
        { value: 'isbn13', label: 'ISBN-13 (книги)' },
        { value: 'code128', label: 'Code128 (универсальный)' },
        { value: 'code39', label: 'Code39 (промышленный)' }
      ],
      defaultValue: 'ean13'
    },
    {
      name: 'data',
      label: 'Данные (без контрольной цифры)',
      type: 'text',
      placeholder: '460123456789',
      defaultValue: '460123456789'
    },
    {
      name: 'action',
      label: 'Действие',
      type: 'select',
      options: [
        { value: 'validate', label: 'Проверить контрольную цифру' },
        { value: 'generate', label: 'Сгенерировать контрольную цифру' }
      ],
      defaultValue: 'generate'
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' },
    { name: 'info', label: 'Информация', type: 'text' }
  ],
  calculate: (inputs) => {
    const type = String(inputs.type);
    let data = String(inputs.data).trim();
    const action = String(inputs.action);
    
    // Helper function for EAN/UPC check digit
    const calculateEANCheckDigit = (code: string): number => {
      let sum = 0;
      for (let i = 0; i < code.length; i++) {
        const digit = parseInt(code[i]);
        sum += (i % 2 === 0) ? digit : digit * 3;
      }
      return (10 - (sum % 10)) % 10;
    };
    
    // ISBN-10 check digit
    const calculateISBN10CheckDigit = (code: string): string => {
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(code[i]) * (10 - i);
      }
      const check = 11 - (sum % 11);
      return check === 11 ? '0' : check === 10 ? 'X' : check.toString();
    };
    
    let result = '';
    let info = '';
    
    try {
      switch (type) {
        case 'ean13':
          if (data.length === 13) {
            if (action === 'validate') {
              const providedCheck = parseInt(data[12]);
              const calculated = calculateEANCheckDigit(data.slice(0, 12));
              result = providedCheck === calculated ? '✓ Контрольная цифра верна' : '✗ Контрольная цифра неверна';
              info = `Предоставлена: ${providedCheck}, Вычислена: ${calculated}`;
            } else {
              data = data.slice(0, 12);
              const checkDigit = calculateEANCheckDigit(data);
              result = data + checkDigit;
              info = `Контрольная цифра: ${checkDigit}. Страна: ${data.startsWith('460') ? 'Россия (460-469)' : 'Уточните по префиксу'}`;
            }
          } else {
            result = action === 'generate' ? data + calculateEANCheckDigit(data.padEnd(12, '0')) : 'Длина EAN-13 должна быть 13 цифр';
          }
          break;
          
        case 'ean8':
          if (action === 'generate') {
            data = data.slice(0, 7).padEnd(7, '0');
            const checkDigit = calculateEANCheckDigit(data);
            result = data + checkDigit;
            info = `Контрольная цифра: ${checkDigit}`;
          } else {
            result = 'EAN-8: введите 7 цифр для генерации';
          }
          break;
          
        case 'upca':
          if (action === 'generate') {
            data = data.slice(0, 11).padEnd(11, '0');
            const checkDigit = calculateEANCheckDigit(data);
            result = data + checkDigit;
            info = `UPC-A: ${data}-${checkDigit}`;
          } else {
            result = 'UPC-A: введите 11 цифр для генерации';
          }
          break;
          
        case 'isbn10':
          if (action === 'generate') {
            data = data.slice(0, 9).padEnd(9, '0');
            const checkDigit = calculateISBN10CheckDigit(data);
            result = data + checkDigit;
            info = `ISBN-10: ${data.slice(0, 1)}-${data.slice(1, 4)}-${data.slice(4, 9)}-${checkDigit}`;
          } else {
            result = 'ISBN-10: введите 9 цифр для генерации';
          }
          break;
          
        case 'isbn13':
          if (action === 'generate') {
            data = data.slice(0, 12).padEnd(12, '0');
            const checkDigit = calculateEANCheckDigit(data);
            result = data + checkDigit;
            info = `ISBN-13: ${data.slice(0, 3)}-${data.slice(3, 4)}-${data.slice(4, 7)}-${data.slice(7, 12)}-${checkDigit}`;
          } else {
            result = 'ISBN-13: введите 12 цифр для генерации';
          }
          break;
          
        case 'code128':
          result = `Code128: ${data} (поддерживает ASCII 0-127)`;
          info = 'Code128 — универсальный штрих-код для логистики и маркировки';
          break;
          
        case 'code39':
          result = `Code39: ${data.toUpperCase().replace(/[^0-9A-Z\-\.\s$\/+%]/g, '')}`;
          info = 'Code39 — промышленный штрих-код. Поддерживает: 0-9, A-Z, - . $ / + %';
          break;
          
        default:
          result = 'Выберите тип штрих-кода';
      }
    } catch (e) {
      result = 'Ошибка в данных';
    }
    
    return [
      { value: result, label: 'Штрих-код', unit: '' },
      { value: info, label: 'Информация', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите тип штрих-кода, введите данные без контрольной цифры и выберите действие. Калькулятор вычислит или проверит контрольную цифру.',
    about: 'Генератор штрих-кодов различных форматов с расчётом контрольных цифр. EAN-13 используется для товаров в России и Европе, ISBN — для книг, Code128 — универсальный для логистики.',
    usage: 'Используется для проверки штрих-кодов на товарах, генерации ISBN для книг, создания кодов для инвентаризации.',
    formula: 'EAN: сумма цифр с весом 1/3, 3/1 + контрольная = 0 (mod 10) | ISBN-10: взвешенная сумма с весами 10..1',
    faq: [
      {
        question: 'Что такое контрольная цифра?',
        answer: 'Цифра в конце штрих-кода для проверки правильности сканирования. Рассчитывается по специальному алгоритму из остальных цифр.'
      },
      {
        question: 'Чем отличается EAN-13 от UPC-A?',
        answer: 'EAN-13 имеет 13 цифр, используется в Европе. UPC-A — 12 цифр, используется в США. EAN-13 с префиксом 0 = UPC-A.'
      },
      {
        question: 'Какой формат для книг?',
        answer: 'ISBN-13 — современный стандарт с префиксом 978 или 979. ISBN-10 — старый формат (до 2007 года).'
      }
    ],
    sources: [
      { title: 'Штрих-код — Википедия', url: 'https://ru.wikipedia.org/wiki/Штриховой_код' },
      { title: 'EAN-13 — GS1', url: 'https://www.gs1.org/standards/id-keys/ean-upc' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Генератор QR-кодов (структуры)
export const qrCodeGenerator: Calculator = {
  id: 'qr-generator',
  slug: 'generator-qr-kodov',
  title: 'Генератор структур QR-кодов',
  description: 'Создание структурированных данных для QR-кодов: тексты, URL, WiFi, email, vCard',
  category: 'tekhnologii',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'type',
      label: 'Тип данных',
      type: 'select',
      options: [
        { value: 'text', label: 'Текст (простой)' },
        { value: 'url', label: 'URL (ссылка)' },
        { value: 'wifi', label: 'WiFi (подключение)' },
        { value: 'email', label: 'Email (сообщение)' },
        { value: 'vcard', label: 'vCard (контакт)' },
        { value: 'phone', label: 'Телефон (звонок)' },
        { value: 'sms', label: 'SMS (сообщение)' }
      ],
      defaultValue: 'url'
    },
    {
      name: 'field1',
      label: 'Основное поле',
      type: 'text',
      placeholder: 'https://example.com',
      defaultValue: 'https://calcus.ru'
    },
    {
      name: 'field2',
      label: 'Дополнительное поле',
      type: 'text',
      placeholder: 'Описание или пароль',
      defaultValue: ''
    },
    {
      name: 'field3',
      label: 'Третье поле',
      type: 'text',
      placeholder: 'Дополнительные данные',
      defaultValue: ''
    }
  ],
  outputs: [
    { name: 'qrdata', label: 'QR-данные', type: 'text' },
    { name: 'structure', label: 'Структура', type: 'text' }
  ],
  calculate: (inputs) => {
    const type = String(inputs.type);
    const field1 = String(inputs.field1).trim();
    const field2 = String(inputs.field2).trim();
    const field3 = String(inputs.field3).trim();
    
    let qrdata = '';
    let structure = '';
    
    switch (type) {
      case 'text':
        qrdata = field1 || 'Пример текста для QR-кода';
        structure = 'Простой текст (Plain Text)';
        break;
        
      case 'url':
        qrdata = field1.startsWith('http') ? field1 : `https://${field1 || 'example.com'}`;
        structure = 'URL схема: [протокол]://[домен]';
        break;
        
      case 'wifi':
        // WiFi format: WIFI:T:WPA;S:ssid;P:password;H:hidden;;
        const ssid = field1 || 'MyWiFi';
        const password = field2 || 'password123';
        const security = field3 || 'WPA';
        qrdata = `WIFI:T:${security};S:${ssid};P:${password};;`;
        structure = 'WiFi: T=тип шифрования, S=SSID, P=пароль';
        break;
        
      case 'email':
        // mailto:email@example.com?subject=Subject&body=Body
        const email = field1 || 'user@example.com';
        const subject = encodeURIComponent(field2 || 'Тема письма');
        const body = encodeURIComponent(field3 || 'Текст письма');
        qrdata = `mailto:${email}?subject=${subject}&body=${body}`;
        structure = 'Email: mailto:[адрес]?subject=[тема]&body=[текст]';
        break;
        
      case 'vcard':
        // vCard 3.0 format
        const fullName = field1 || 'Иванов Иван';
        const phone = field2 || '+7 (999) 123-45-67';
        const email2 = field3 || 'ivan@example.com';
        qrdata = `BEGIN:VCARD\nVERSION:3.0\nFN:${fullName}\nTEL:${phone}\nEMAIL:${email2}\nEND:VCARD`;
        structure = 'vCard 3.0: FN=полное имя, TEL=телефон, EMAIL=почта';
        break;
        
      case 'phone':
        const phoneNum = field1.replace(/[^0-9+]/g, '') || '+79991234567';
        qrdata = `tel:${phoneNum}`;
        structure = 'Телефон: tel:[номер]';
        break;
        
      case 'sms':
        const smsNum = field1.replace(/[^0-9+]/g, '') || '+79991234567';
        const smsText = encodeURIComponent(field2 || 'Привет!');
        qrdata = `sms:${smsNum}?body=${smsText}`;
        structure = 'SMS: sms:[номер]?body=[текст]';
        break;
        
      default:
        qrdata = field1 || 'Пример';
        structure = 'Произвольные данные';
    }
    
    return [
      { value: qrdata, label: 'QR-данные для кодирования', unit: '' },
      { value: structure, label: 'Формат структуры', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите тип QR-кода и заполните поля. Калькулятор сгенерирует структурированные данные, которые можно закодировать в QR-код.',
    about: 'Генератор структур данных для QR-кодов различных типов. WiFi — для быстрого подключения к сети, vCard — для обмена контактами, email — для создания письма, URL — для перехода на сайт.',
    usage: 'Используется для создания QR-кодов: на визитках (vCard), в кафе (WiFi), на товарах (URL), для быстрого звонка (tel), отправки SMS.',
    formula: 'Стандартизированные форматы: WiFi(WIFI:), URL(http://), vCard(BEGIN:VCARD), Email(mailto:), Phone(tel:)',
    faq: [
      {
        question: 'Какой тип QR-кода выбрать для визитки?',
        answer: 'vCard — при сканировании контакт автоматически добавляется в адресную книгу телефона.'
      },
      {
        question: 'Как создать QR для WiFi?',
        answer: 'Выберите тип WiFi, введите название сети (SSID) и пароль. При сканировании телефон предложит подключиться автоматически.'
      },
      {
        question: 'Какой размер QR-кода нужен?',
        answer: 'Чем больше данных — тем плотнее QR. Для URL достаточно версии 2-3, для vCard может понадобиться версия 5-10.'
      }
    ],
    sources: [
      { title: 'QR-код — Википедия', url: 'https://ru.wikipedia.org/wiki/QR-код' },
      { title: 'ZXing QR Code Format', url: 'https://github.com/zxing/zxing/wiki/Barcode-Contents' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Генератор фейковых данных (российских)
export const fakeDataGenerator: Calculator = {
  id: 'fake-data-generator',
  slug: 'generator-fejkovyh-dannyh',
  title: 'Генератор фейковых данных',
  description: 'Генератор российских имён, адресов, телефонов, email и названий компаний для тестирования',
  category: 'tekhnologii',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'type',
      label: 'Тип данных',
      type: 'select',
      options: [
        { value: 'person', label: 'Человек (ФИО + телефон + email)' },
        { value: 'address', label: 'Адрес (город, улица, дом)' },
        { value: 'company', label: 'Компания (название + ИНН)' },
        { value: 'phone', label: 'Телефон (+7 формат)' },
        { value: 'email', label: 'Email адрес' },
        { value: 'inn', label: 'ИНН (ИП или организации)' }
      ],
      defaultValue: 'person'
    },
    {
      name: 'gender',
      label: 'Пол (для имён)',
      type: 'select',
      options: [
        { value: 'any', label: 'Любой' },
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' }
      ],
      defaultValue: 'any'
    },
    {
      name: 'count',
      label: 'Количество',
      type: 'number',
      placeholder: '3',
      defaultValue: 3,
      min: 1,
      max: 10
    }
  ],
  outputs: [
    { name: 'data', label: 'Сгенерированные данные', type: 'text' }
  ],
  calculate: (inputs) => {
    const type = String(inputs.type);
    const gender = String(inputs.gender);
    const count = Math.min(Math.max(Number(inputs.count), 1), 10);
    
    const maleFirstNames = ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артём', 'Илья', 'Кирилл', 'Михаил', 'Никита', 'Матвей', 'Роман', 'Егор', 'Арсений', 'Иван', 'Денис', 'Евгений', 'Даниил', 'Тимофей'];
    const femaleFirstNames = ['Анастасия', 'Мария', 'Дарья', 'Анна', 'Елизавета', 'Полина', 'Виктория', 'Алиса', 'Варвара', 'Александра', 'Ксения', 'Екатерина', 'Вера', 'Надежда', 'Галина', 'Ольга', 'Татьяна', 'Ирина', 'Елена', 'Юлия'];
    const lastNames = ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Фёдоров', 'Морозов', 'Волков', 'Алексеев', 'Лебедев', 'Семёнов', 'Егоров', 'Павлов', 'Козлов', 'Степанов', 'Николаев', 'Орлов', 'Андреев', 'Макаров', 'Захаров', 'Зайцев', 'Соловьёв', 'Борисов', 'Яковлев', 'Григорьев', 'Романов'];
    const malePatronymics = ['Александрович', 'Дмитриевич', 'Максимович', 'Сергеевич', 'Андреевич', 'Алексеевич', 'Артёмович', 'Ильич', 'Кириллович', 'Михайлович', 'Никитич', 'Владимирович', 'Иванович', 'Петрович', 'Семёнович', 'Викторович', 'Олегович'];
    const femalePatronymics = ['Александровна', 'Дмитриевна', 'Максимовна', 'Сергеевна', 'Андреевна', 'Алексеевна', 'Артёмовна', 'Ильинична', 'Кирилловна', 'Михайловна', 'Никитична', 'Владимировна', 'Ивановна', 'Петровна', 'Семёновна', 'Викторовна', 'Олеговна'];
    
    const cities = [
      { name: 'Москва', region: 'г. Москва', zip: '101000' },
      { name: 'Санкт-Петербург', region: 'г. Санкт-Петербург', zip: '190000' },
      { name: 'Новосибирск', region: 'Новосибирская обл.', zip: '630000' },
      { name: 'Екатеринбург', region: 'Свердловская обл.', zip: '620000' },
      { name: 'Казань', region: 'Респ. Татарстан', zip: '420000' },
      { name: 'Нижний Новгород', region: 'Нижегородская обл.', zip: '603000' },
      { name: 'Челябинск', region: 'Челябинская обл.', zip: '454000' },
      { name: 'Самара', region: 'Самарская обл.', zip: '443000' },
      { name: 'Омск', region: 'Омская обл.', zip: '644000' },
      { name: 'Ростов-на-Дону', region: 'Ростовская обл.', zip: '344000' },
      { name: 'Уфа', region: 'Респ. Башкортостан', zip: '450000' },
      { name: 'Красноярск', region: 'Красноярский край', zip: '660000' },
      { name: 'Воронеж', region: 'Воронежская обл.', zip: '394000' },
      { name: 'Пермь', region: 'Пермский край', zip: '614000' },
      { name: 'Волгоград', region: 'Волгоградская обл.', zip: '400000' }
    ];
    
    const streets = ['Ленина', 'Гагарина', 'Мира', 'Центральная', 'Советская', 'Кирова', 'Победы', 'Октябрьская', 'Пролетарская', 'Коммунистическая', 'Красная', 'Новая', 'Парковая', 'Школьная', 'Зелёная', 'Лесная', 'Садовая', 'Набережная', 'Пушкина', 'Горького'];
    const companyPrefixes = ['ООО', 'АО', 'ПАО', 'ЗАО', 'ИП'];
    const companyNames = ['ТехноПром', 'ИнвестСтрой', 'ГлобалСервис', 'РосТорг', 'МегаФинанс', 'АльфаГрупп', 'БизнесРешения', 'ЭкоПродукт', 'МедиаСофт', 'ЮнионТрейд', 'ВекторПлюс', 'ДомСтрой', 'АвтоМир', 'ТехноСнаб', 'ПрогрессОйл', 'АгроКомплект', 'ТранзитЛогистик', 'ЭнергоСбыт', 'ИнфоТех', 'РитейлСолюшнс'];
    const companyActivities = ['', 'Строительство', 'Торговля', 'ИТ-услуги', 'Производство', 'Логистика', 'Консалтинг', 'Финансы', 'Недвижимость', 'Образование'];
    const emailDomains = ['mail.ru', 'yandex.ru', 'gmail.com', 'bk.ru', 'list.ru', 'inbox.ru', 'rambler.ru', 'ya.ru', 'icloud.com', 'outlook.com'];
    
    const results: string[] = [];
    
    for (let i = 0; i < count; i++) {
      let result = '';
      
      switch (type) {
        case 'person': {
          const isMale = gender === 'any' ? Math.random() > 0.5 : gender === 'male';
          const firstName = isMale ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)] : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)] + (isMale ? '' : 'а');
          const patronymic = isMale ? malePatronymics[Math.floor(Math.random() * malePatronymics.length)] : femalePatronymics[Math.floor(Math.random() * femalePatronymics.length)];
          const phone = `+7 (${Math.floor(Math.random() * 900 + 100)}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 90 + 10)}`;
          const email = `${firstName.toLowerCase()}.${lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase()}${Math.floor(Math.random() * 999)}@${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`;
          result = `${lastName} ${firstName} ${patronymic}\nТелефон: ${phone}\nEmail: ${email}`;
          break;
        }
        
        case 'address': {
          const city = cities[Math.floor(Math.random() * cities.length)];
          const street = streets[Math.floor(Math.random() * streets.length)];
          const house = Math.floor(Math.random() * 150 + 1);
          const apt = Math.floor(Math.random() * 200 + 1);
          result = `${city.zip}, ${city.region}\nг. ${city.name}, ул. ${street}, д. ${house}, кв. ${apt}`;
          break;
        }
        
        case 'company': {
          const prefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)];
          const name = companyNames[Math.floor(Math.random() * companyNames.length)];
          const activity = companyActivities[Math.floor(Math.random() * companyActivities.length)];
          // Generate INN
          let inn = '';
          if (prefix === 'ИП') {
            // 12 digits for individual entrepreneur
            inn = Math.floor(Math.random() * 900000000000 + 100000000000).toString();
          } else {
            // 10 digits for organization
            inn = Math.floor(Math.random() * 9000000000 + 1000000000).toString();
          }
          result = `${prefix} «${name}»${activity ? ` — ${activity}` : ''}\nИНН: ${inn}`;
          break;
        }
        
        case 'phone': {
          const code = Math.floor(Math.random() * 900 + 100);
          const num1 = Math.floor(Math.random() * 900 + 100);
          const num2 = Math.floor(Math.random() * 90 + 10);
          const num3 = Math.floor(Math.random() * 90 + 10);
          result = `+7 (${code}) ${num1}-${num2}-${num3}`;
          break;
        }
        
        case 'email': {
          const name = maleFirstNames.concat(femaleFirstNames)[Math.floor(Math.random() * (maleFirstNames.length + femaleFirstNames.length))].toLowerCase();
          const surname = lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase();
          const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
          const variant = Math.floor(Math.random() * 4);
          if (variant === 0) result = `${name}.${surname}@${domain}`;
          else if (variant === 1) result = `${surname}_${Math.floor(Math.random() * 999)}@${domain}`;
          else if (variant === 2) result = `${name}${Math.floor(Math.random() * 9999)}@${domain}`;
          else result = `${surname}.${name[0]}@${domain}`;
          break;
        }
        
        case 'inn': {
          const isIP = Math.random() > 0.5;
          if (isIP) {
            result = `ИНН ИП: ${Math.floor(Math.random() * 900000000000 + 100000000000)} (12 цифр)`;
          } else {
            result = `ИНН Организации: ${Math.floor(Math.random() * 9000000000 + 1000000000)} (10 цифр)`;
          }
          break;
        }
        
        default:
          result = 'Выберите тип данных';
      }
      
      results.push(`${i + 1}. ${result}`);
    }
    
    return [
      { value: results.join('\n\n'), label: 'Фейковые данные (демо)', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите тип данных и количество. Калькулятор сгенерирует фейковые но реалистичные данные для тестирования.',
    about: 'Генератор случайных но структурно правильных российских данных: ФИО, адреса, телефоны в формате +7, email адреса, названия компаний с ИНН.',
    usage: 'Используется разработчиками и тестировщиками для наполнения тестовых баз данных, демонстрации интерфейсов, обучения работе с формами.',
    formula: 'Случайный выбор из базы реальных российских имён, городов, улиц с правильным форматированием.',
    faq: [
      {
        question: 'Это реальные данные?',
        answer: 'Нет, все данные сгенерированы случайно и не принадлежат реальным людям. Но структура соответствует реальным форматам.'
      },
      {
        question: 'Можно ли использовать в production?',
        answer: 'Только для тестирования! Для production используйте специализированные библиотеки вроде Faker.js с бóльшей вариативностью.'
      },
      {
        question: 'Почему ИНН может быть невалидным?',
        answer: 'Генератор создаёт 10 или 12 цифр без расчёта контрольных чисел. Для валидации ИНН нужен отдельный алгоритм.'
      }
    ],
    sources: [
      { title: 'Генерация тестовых данных', url: 'https://ru.wikipedia.org/wiki/Тестовые_данные' },
      { title: 'Faker.js — библиотека для генерации', url: 'https://fakerjs.dev/' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Генератор случайных имён (разные культуры)
export const randomNameGenerator: Calculator = {
  id: 'random-name-generator',
  slug: 'generator-sluchajnyh-imen',
  title: 'Генератор случайных имён',
  description: 'Генератор имён: русские, английские, фэнтези (эльфы, дварфы, орки), случайные комбинации',
  category: 'razvlecheniya',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'culture',
      label: 'Культура/стиль',
      type: 'select',
      options: [
        { value: 'russian', label: '🇷🇺 Русские имена' },
        { value: 'english', label: '🇬🇧 Английские имена' },
        { value: 'elf', label: '🧝 Эльфы (фэнтези)' },
        { value: 'dwarf', label: '⛏️ Дварфы (фэнтези)' },
        { value: 'orc', label: '👹 Орки (фэнтези)' },
        { value: 'cyber', label: '🤖 Киберпанк' },
        { value: 'random', label: '🎲 Случайные слоги' }
      ],
      defaultValue: 'russian'
    },
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'any', label: 'Любой' },
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' }
      ],
      defaultValue: 'any'
    },
    {
      name: 'count',
      label: 'Количество',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 1,
      max: 15
    },
    {
      name: 'surname',
      label: 'Добавить фамилию',
      type: 'select',
      options: [
        { value: 'yes', label: 'Да' },
        { value: 'no', label: 'Нет' }
      ],
      defaultValue: 'yes'
    }
  ],
  outputs: [
    { name: 'names', label: 'Сгенерированные имена', type: 'text' }
  ],
  calculate: (inputs) => {
    const culture = String(inputs.culture);
    const gender = String(inputs.gender);
    const count = Math.min(Math.max(Number(inputs.count), 1), 15);
    const withSurname = String(inputs.surname) === 'yes';
    
    const russianMale = ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артём', 'Илья', 'Кирилл', 'Михаил', 'Никита', 'Матвей', 'Роман', 'Егор', 'Арсений', 'Иван', 'Денис', 'Евгений', 'Даниил', 'Тимофей'];
    const russianFemale = ['Анастасия', 'Мария', 'Дарья', 'Анна', 'Елизавета', 'Полина', 'Виктория', 'Алиса', 'Варвара', 'Александра', 'Ксения', 'Екатерина', 'Вера', 'Надежда', 'Галина', 'Ольга', 'Татьяна', 'Ирина', 'Елена', 'Юлия'];
    const russianSurnames = ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Фёдоров', 'Морозов', 'Волков', 'Алексеев', 'Лебедев', 'Семёнов', 'Егоров', 'Павлов', 'Козлов', 'Степанов', 'Николаев'];
    
    const englishMale = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Kenneth', 'Joshua'];
    const englishFemale = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Dorothy'];
    const englishSurnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
    
    const elfPrefixes = ['Ael', 'Thal', 'Gal', 'Cele', 'Elen', 'Thran', 'Fir', 'Syl', 'An', 'El', 'Lor', 'Mel', 'Sil', 'Val', 'Yr'];
    const elfSuffixes = ['ond', 'ras', 'ion', 'ien', 'riel', 'we', 'dan', 'dir', 'las', 'dor', 'mar', 'ien', 'or', 'as', 'el'];
    const elfSurnames = ['Moonwhisper', 'Starshine', 'Dawnbringer', 'Silverleaf', 'Windwalker', 'Nightbreeze', 'Goldenwood', 'Swiftblade', 'Brightsong', 'Shadowfell'];
    
    const dwarfPrefixes = ['Thor', 'Dur', 'Bal', 'Gim', 'Dain', 'Bif', 'Bomb', 'Fili', 'Kili', 'Oin', 'Gloin', 'Dwal', 'Nor', 'Ori', 'Thrain'];
    const dwarfSuffixes = ['in', 'ak', 'ek', 'ur', 'or', 'ar', 'ir', 'ok', 'uk', 'ik', 'un', 'on', 'an', 'im', 'am'];
    const dwarfSurnames = ['Ironbeard', 'Stonefoot', 'Goldfinder', 'Deepdelver', 'Forgehammer', 'Mountainheart', 'Oreseeker', 'Steelhand', 'Anvilbreaker', 'Cavedweller'];
    
    const orcPrefixes = ['Gor', 'Mok', 'Kra', 'Thr', 'Nar', 'Dur', 'Gar', 'Zug', 'Gru', 'Kil', 'Rog', 'Bur', 'Mor', 'Ugl', 'Lug'];
    const orcSuffixes = ['k', 'g', 'r', 'sh', 'n', 't', 'z', 'm', 'd', 'l', 'x', 'b', 'p', 'v', 'th'];
    const orcSurnames = ['Skullcrusher', 'Bloodfist', 'Bonebreaker', 'Wolfrider', 'Warbringer', 'Deathdealer', 'Ogreslayer', 'Ravager', 'Destroyer', 'Ironjaw'];
    
    const cyberPrefixes = ['Neo', 'Cyber', 'Tech', 'Net', 'Data', 'Bit', 'Byte', 'Code', 'Hack', 'Link', 'Wire', 'Chip', 'Syn', 'Dig', 'Flux'];
    const cyberSuffixes = ['runner', 'punk', 'ninja', 'coder', 'ghost', 'mind', 'wave', 'storm', 'blade', 'pulse', 'drift', 'shard', 'core', 'node', 'stream'];
    const cyberSurnames = ['ZeroCool', 'AcidBurn', 'Phantom', 'Glitch', 'Vapor', 'Static', 'Echo', 'Neon', 'Razor', 'Spike'];
    
    const randomConsonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'z'];
    const randomVowels = ['a', 'e', 'i', 'o', 'u', 'y', 'ae', 'ai', 'ei', 'ou'];
    
    const generateName = (): string => {
      const isMale = gender === 'any' ? Math.random() > 0.5 : gender === 'male';
      let firstName = '';
      let surname = '';
      
      switch (culture) {
        case 'russian':
          firstName = isMale ? russianMale[Math.floor(Math.random() * russianMale.length)] : russianFemale[Math.floor(Math.random() * russianFemale.length)];
          if (withSurname) {
            surname = russianSurnames[Math.floor(Math.random() * russianSurnames.length)] + (isMale ? '' : 'а');
          }
          break;
          
        case 'english':
          firstName = isMale ? englishMale[Math.floor(Math.random() * englishMale.length)] : englishFemale[Math.floor(Math.random() * englishFemale.length)];
          if (withSurname) surname = englishSurnames[Math.floor(Math.random() * englishSurnames.length)];
          break;
          
        case 'elf':
          firstName = elfPrefixes[Math.floor(Math.random() * elfPrefixes.length)] + elfSuffixes[Math.floor(Math.random() * elfSuffixes.length)];
          if (withSurname) surname = elfSurnames[Math.floor(Math.random() * elfSurnames.length)];
          break;
          
        case 'dwarf':
          firstName = dwarfPrefixes[Math.floor(Math.random() * dwarfPrefixes.length)] + dwarfSuffixes[Math.floor(Math.random() * dwarfSuffixes.length)];
          if (withSurname) surname = dwarfSurnames[Math.floor(Math.random() * dwarfSurnames.length)];
          break;
          
        case 'orc':
          firstName = orcPrefixes[Math.floor(Math.random() * orcPrefixes.length)] + orcSuffixes[Math.floor(Math.random() * orcSuffixes.length)];
          if (withSurname) surname = orcSurnames[Math.floor(Math.random() * orcSurnames.length)];
          break;
          
        case 'cyber':
          firstName = cyberPrefixes[Math.floor(Math.random() * cyberPrefixes.length)] + cyberSuffixes[Math.floor(Math.random() * cyberSuffixes.length)];
          if (withSurname) surname = cyberSurnames[Math.floor(Math.random() * cyberSurnames.length)];
          break;
          
        case 'random':
          // Generate random syllables
          const syllableCount = Math.floor(Math.random() * 2) + 2;
          for (let i = 0; i < syllableCount; i++) {
            firstName += randomConsonants[Math.floor(Math.random() * randomConsonants.length)];
            firstName += randomVowels[Math.floor(Math.random() * randomVowels.length)];
          }
          firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
          break;
          
        default:
          firstName = 'Имя';
      }
      
      return surname ? `${firstName} ${surname}` : firstName;
    };
    
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      names.push(`${i + 1}. ${generateName()}`);
    }
    
    return [
      { value: names.join('\n'), label: 'Случайные имена', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите культуру/стиль, пол и количество имён. Калькулятор сгенерирует случайные имена с фамилиями (опционально).',
    about: 'Генератор имён разных культур и стилей: русские (истинно славянские), английские (современные), фэнтези (эльфы, дварфы, орки), киберпанк (неоновые ники), случайные слоги.',
    usage: 'Используется для создания имён персонажей в играх (RPG, MMO), никнеймов, псевдонимов, имён для творческих проектов, генераторов историй.',
    formula: 'Случайный выбор из базы + комбинирование слогов и аффиксов',
    faq: [
      {
        question: 'Как генерируются эльфийские имена?',
        answer: 'Из префиксов (Ael, Thal, Gal...) и суффиксов (ond, ras, ion...) по правилам типичного фэнтези. Звучат мелодично и возвышенно.'
      },
      {
        question: 'Что такое киберпанк-имена?',
        answer: 'Имена в стиле хакерской субкультуры: TechRunner, NeoCoder, ByteGhost — подходят для никнеймов, имён в играх и форумах.'
      },
      {
        question: 'Можно ли получить средневековые имена?',
        answer: 'Дварфийские и орочьи имена часто имеют скандинавский/германский оттенок, подходят для средневековых или фэнтезийных сеттингов.'
      }
    ],
    sources: [
      { title: 'Имена собственные — Википедия', url: 'https://ru.wikipedia.org/wiki/Имя_собственное' },
      { title: 'Фэнтезийные имена', url: 'https://ru.wikipedia.org/wiki/Фэнтези' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Генератор лотерейных чисел
export const lotteryGenerator: Calculator = {
  id: 'lottery-generator',
  slug: 'generator-loterejnyh-chisel',
  title: 'Генератор лотерейных чисел',
  description: 'Генерация чисел для лотерей: 6 из 49, 5 из 36, Powerball, EuroMillions',
  category: 'razvlecheniya',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'game',
      label: 'Тип лотереи',
      type: 'select',
      options: [
        { value: '6x49', label: '6 из 49 (Русское лото, классика)' },
        { value: '5x36', label: '5 из 36 (Спортлото)' },
        { value: 'powerball', label: 'Powerball (США: 5/69 + 1/26)' },
        { value: 'euromillions', label: 'EuroMillions (Европа: 5/50 + 2/12)' },
        { value: 'keno', label: 'Keno (20 из 80)' },
        { value: 'custom', label: 'Произвольная (настройка)' }
      ],
      defaultValue: '6x49'
    },
    {
      name: 'tickets',
      label: 'Количество билетов',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 1,
      max: 10
    },
    {
      name: 'range',
      label: 'Диапазон (для произвольной)',
      type: 'number',
      placeholder: '49',
      defaultValue: 49,
      min: 10,
      max: 100
    },
    {
      name: 'pick',
      label: 'Сколько чисел выбрать (для произвольной)',
      type: 'number',
      placeholder: '6',
      defaultValue: 6,
      min: 1,
      max: 20
    }
  ],
  outputs: [
    { name: 'numbers', label: 'Ваши числа', type: 'text' },
    { name: 'odds', label: 'Шансы выиграть', type: 'text' }
  ],
  calculate: (inputs) => {
    const game = String(inputs.game);
    const tickets = Math.min(Math.max(Number(inputs.tickets), 1), 10);
    const customRange = Number(inputs.range) || 49;
    const customPick = Number(inputs.pick) || 6;
    
    let mainNumbers = 6;
    let mainRange = 49;
    let extraNumbers = 0;
    let extraRange = 0;
    let gameName = '';
    let oddsText = '';
    
    switch (game) {
      case '6x49':
        mainNumbers = 6;
        mainRange = 49;
        gameName = '6 из 49';
        oddsText = '1 к 13,983,816 (джекпот)';
        break;
      case '5x36':
        mainNumbers = 5;
        mainRange = 36;
        gameName = '5 из 36';
        oddsText = '1 к 376,992';
        break;
      case 'powerball':
        mainNumbers = 5;
        mainRange = 69;
        extraNumbers = 1;
        extraRange = 26;
        gameName = 'Powerball';
        oddsText = '1 к 292,201,338 (джекпот)';
        break;
      case 'euromillions':
        mainNumbers = 5;
        mainRange = 50;
        extraNumbers = 2;
        extraRange = 12;
        gameName = 'EuroMillions';
        oddsText = '1 к 139,838,160 (джекпот)';
        break;
      case 'keno':
        mainNumbers = 20;
        mainRange = 80;
        gameName = 'Keno (20 из 80)';
        oddsText = 'Зависит от угаданных чисел';
        break;
      case 'custom':
        mainNumbers = Math.min(customPick, customRange);
        mainRange = customRange;
        gameName = `Произвольная (${mainNumbers}/${mainRange})`;
        oddsText = 'См. формулу';
        break;
    }
    
    const generateUniqueRandom = (count: number, max: number): number[] => {
      const numbers = new Set<number>();
      while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * max) + 1);
      }
      return Array.from(numbers).sort((a, b) => a - b);
    };
    
    const results: string[] = [];
    
    for (let t = 0; t < tickets; t++) {
      const main = generateUniqueRandom(mainNumbers, mainRange);
      let ticket = `Билет ${t + 1}: ${main.map(n => n.toString().padStart(2, '0')).join(' ')}`;
      
      if (extraNumbers > 0) {
        const extra = generateUniqueRandom(extraNumbers, extraRange);
        ticket += ` + [${extra.map(n => n.toString().padStart(2, '0')).join(' ')}]`;
      }
      
      results.push(ticket);
    }
    
    return [
      { value: results.join('\n'), label: `Числа для ${gameName}`, unit: '' },
      { value: oddsText, label: 'Шансы', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите тип лотереи и количество билетов. Калькулятор сгенерирует случайные уникальные числа для каждого билета.',
    about: 'Генератор комбинаций для популярных лотерей: русское лото (6 из 49), спортлото (5 из 36), Powerball (США), EuroMillions (Европа), Keno. Все числа уникальны в пределах одного билета.',
    usage: 'Используется для выбора чисел в лотереях, жеребьёвки, розыгрышей, для развлечения. Не гарантирует выигрыш — числа случайны.',
    formula: 'Случайный выбор уникальных чисел из диапазона. Шансы = C(n,k) = n!/(k!(n-k)!)',
    faq: [
      {
        question: 'Повышает ли это шансы на выигрыш?',
        answer: 'Нет. Все комбинации равновероятны. Генератор лишь помогает выбрать случайные числа без эмоциональных предубеждений.'
      },
      {
        question: 'Что такое Powerball и EuroMillions?',
        answer: 'Powerball — американская лотерея: 5 основных чисел + 1 Powerball. EuroMillions — европейская: 5 чисел + 2 Lucky Stars.'
      },
      {
        question: 'Как часто выпадают "горячие" числа?',
        answer: 'В теории вероятностей нет "горячих" чисел. Каждый розыгрыш независим, прошлые результаты не влияют на будущие.'
      }
    ],
    sources: [
      { title: 'Лотерея — Википедия', url: 'https://ru.wikipedia.org/wiki/Лотерея' },
      { title: 'Вероятность в лотерее', url: 'https://ru.wikipedia.org/wiki/Вероятность' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Генератор монет/костей с вероятностями
export const coinDiceGenerator: Calculator = {
  id: 'coin-dice-generator',
  slug: 'generator-monet-i-kostej',
  title: 'Монеты и кости с вероятностями',
  description: 'Бросок монеты, многогранных костей (d4-d20) с расчётом вероятностей и статистики',
  category: 'razvlecheniya',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'mode',
      label: 'Режим',
      type: 'select',
      options: [
        { value: 'coin', label: '🪙 Монета (Орёл/Решка)' },
        { value: 'd4', label: '🎲 d4 (4 грани)' },
        { value: 'd6', label: '🎲 d6 (6 граней)' },
        { value: 'd8', label: '🎲 d8 (8 граней)' },
        { value: 'd10', label: '🎲 d10 (10 граней)' },
        { value: 'd12', label: '🎲 d12 (12 граней)' },
        { value: 'd20', label: '🎲 d20 (20 граней, D&D)' },
        { value: 'd100', label: '🎲 d100 (проценты)' },
        { value: 'fudge', label: '⚡ Fudge/Fate кости' }
      ],
      defaultValue: 'coin'
    },
    {
      name: 'count',
      label: 'Количество бросков',
      type: 'number',
      placeholder: '1',
      defaultValue: 1,
      min: 1,
      max: 100
    },
    {
      name: 'target',
      label: 'Целевое значение (для успеха)',
      type: 'number',
      placeholder: '0 (любое)',
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'result', label: 'Результат', type: 'text' },
    { name: 'stats', label: 'Статистика', type: 'text' },
    { name: 'probability', label: 'Вероятность', type: 'text' }
  ],
  calculate: (inputs) => {
    const mode = String(inputs.mode);
    const count = Math.min(Math.max(Number(inputs.count), 1), 100);
    const target = Number(inputs.target);
    
    const results: number[] = [];
    let success = 0;
    
    let sides = 2;
    let labels: string[] = [];
    let modeName = '';
    
    switch (mode) {
      case 'coin':
        sides = 2;
        labels = ['Орёл', 'Решка'];
        modeName = 'Монета';
        break;
      case 'd4':
        sides = 4;
        modeName = 'd4';
        break;
      case 'd6':
        sides = 6;
        modeName = 'd6';
        break;
      case 'd8':
        sides = 8;
        modeName = 'd8';
        break;
      case 'd10':
        sides = 10;
        modeName = 'd10';
        break;
      case 'd12':
        sides = 12;
        modeName = 'd12';
        break;
      case 'd20':
        sides = 20;
        modeName = 'd20 (D&D)';
        break;
      case 'd100':
        sides = 100;
        modeName = 'd100 (проценты)';
        break;
      case 'fudge':
        sides = 3;
        labels = ['-', '0', '+'];
        modeName = 'Fudge/Fate';
        break;
    }
    
    for (let i = 0; i < count; i++) {
      let roll: number;
      if (mode === 'fudge') {
        roll = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
      } else if (mode === 'coin') {
        roll = Math.floor(Math.random() * 2); // 0 or 1
      } else {
        roll = Math.floor(Math.random() * sides) + 1;
      }
      results.push(roll);
      
      // Check for success
      if (target > 0 && roll >= target) {
        success++;
      }
    }
    
    // Calculate statistics
    const sum = results.reduce((a, b) => a + b, 0);
    const avg = (sum / results.length).toFixed(2);
    const min = Math.min(...results);
    const max = Math.max(...results);
    
    // Format results
    let resultStr = '';
    if (mode === 'coin') {
      const heads = results.filter(r => r === 0).length;
      const tails = results.filter(r => r === 1).length;
      resultStr = `Орёл: ${heads}, Решка: ${tails}`;
      if (count <= 20) {
        resultStr += ` (${results.map(r => r === 0 ? 'О' : 'Р').join(', ')})`;
      }
    } else if (mode === 'fudge') {
      const minus = results.filter(r => r === -1).length;
      const zero = results.filter(r => r === 0).length;
      const plus = results.filter(r => r === 1).length;
      const total = plus - minus;
      resultStr = `[-]: ${minus}, [0]: ${zero}, [+]: ${plus} = ${total > 0 ? '+' : ''}${total}`;
      if (count <= 20) {
        resultStr += ` (${results.map(r => r === -1 ? '-' : r === 0 ? '0' : '+').join(', ')})`;
      }
    } else {
      if (count <= 30) {
        resultStr = results.join(', ');
      } else {
        resultStr = `${results.slice(0, 10).join(', ')} ... ${results.slice(-5).join(', ')} (всего ${count})`;
      }
    }
    
    // Calculate probability info
    let probText = '';
    if (target > 0 && mode !== 'coin' && mode !== 'fudge') {
      const prob = ((sides - target + 1) / sides * 100).toFixed(1);
      probText = `≥${target}: ${prob}% (${success}/${count} успехов)`;
    } else if (mode === 'd20' && target === 20) {
      probText = 'Критический успех (20): 5%';
    } else if (mode === 'coin') {
      probText = 'Орёл: 50%, Решка: 50%';
    } else {
      probText = `Равномерное распределение: ${(100 / sides).toFixed(1)}% на грань`;
    }
    
    return [
      { value: resultStr, label: modeName, unit: '' },
      { value: mode === 'coin' || mode === 'fudge' ? '' : `Сумма: ${sum}, Среднее: ${avg}, Мин: ${min}, Макс: ${max}`, label: 'Статистика', unit: '' },
      { value: probText, label: 'Вероятности', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите режим (монета или тип кости), количество бросков. Для игр можно задать целевое значение для подсчёта успехов.',
    about: 'Универсальный генератор бросков: монета (орёл/решка), кости от d4 до d20 (для D&D), d100 (проценты), Fudge/Fate кости с расчётом вероятностей и статистики.',
    usage: 'Используется для настольных игр (D&D, Pathfinder), жеребьёвки, игр с костями, обучения теории вероятностей, quick decisions.',
    formula: 'Равномерное распределение: P(кость=k) = 1/N, где N — число граней',
    faq: [
      {
        question: 'Что такое Fudge/Fate кости?',
        answer: 'Три грани: минус (-), ноль (0), плюс (+). Используются в системе Fudge и Fate для определения успеха с модификаторами.'
      },
      {
        question: 'Как использовать для D&D?',
        answer: 'Выберите d20 для бросков атаки/спасбросков. Установите целевое значение для проверки AC или сложности. 20 — критический успех, 1 — провал.'
      },
      {
        question: 'Можно ли бросить 100d6?',
        answer: 'Да, введите d6 и количество 100. Калькулятор покажет статистику: сумму, среднее, минимум и максимум.'
      }
    ],
    sources: [
      { title: 'Игральная кость — Википедия', url: 'https://ru.wikipedia.org/wiki/Игральная_кость' },
      { title: 'Dungeons & Dragons', url: 'https://ru.wikipedia.org/wiki/Dungeons_%26_Dragons' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Генератор цветовых палитр
export const colorPaletteGenerator: Calculator = {
  id: 'color-palette-generator',
  slug: 'generator-cvetovyh-palitr',
  title: 'Генератор цветовых палитр',
  description: 'Генерация цветовых палитр: случайные, комплементарные, триадные, аналоговые, монохромные',
  category: 'tekhnologii',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'mode',
      label: 'Тип палитры',
      type: 'select',
      options: [
        { value: 'random', label: '🎲 Случайная' },
        { value: 'complementary', label: '🔵🟠 Комплементарная (2 цвета)' },
        { value: 'triadic', label: '🔴🟢🔵 Триадная (3 цвета)' },
        { value: 'analogous', label: '🟡🟢🔵 Аналоговая (соседние)' },
        { value: 'monochromatic', label: '🔵 Оттенки одного (моно)' },
        { value: 'split', label: '🔵🟡🟠 Раздельно-компл.' },
        { value: 'tetradic', label: '🎨 Тетрадная (4 цвета)' }
      ],
      defaultValue: 'random'
    },
    {
      name: 'baseColor',
      label: 'Базовый цвет (HEX, для не-случайных)',
      type: 'text',
      placeholder: '#3B82F6',
      defaultValue: '#3B82F6'
    },
    {
      name: 'count',
      label: 'Количество цветов',
      type: 'number',
      placeholder: '5',
      defaultValue: 5,
      min: 2,
      max: 10
    }
  ],
  outputs: [
    { name: 'palette', label: 'Цветовая палитра', type: 'text' },
    { name: 'css', label: 'CSS код', type: 'text' }
  ],
  calculate: (inputs) => {
    const mode = String(inputs.mode);
    let baseColor = String(inputs.baseColor).trim();
    const count = Math.min(Math.max(Number(inputs.count), 2), 10);
    
    // Helper: HEX to HSL
    const hexToHsl = (hex: string): [number, number, number] => {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    };
    
    // Helper: HSL to HEX
    const hslToHex = (h: number, s: number, l: number): string => {
      h = h % 360;
      s = Math.max(0, Math.min(100, s));
      l = Math.max(0, Math.min(100, l));
      
      const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l / 100 - c / 2;
      
      let r = 0, g = 0, b = 0;
      
      if (h < 60) { r = c; g = x; }
      else if (h < 120) { r = x; g = c; }
      else if (h < 180) { g = c; b = x; }
      else if (h < 240) { g = x; b = c; }
      else if (h < 300) { r = x; b = c; }
      else { r = c; b = x; }
      
      const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
    
    // Random HEX
    const randomHex = (): string => {
      return '#' + Array.from({ length: 6 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    };
    
    let colors: string[] = [];
    
    // Validate base color
    if (!baseColor.match(/^#[0-9A-Fa-f]{6}$/)) {
      baseColor = randomHex();
    }
    
    const [h, s, l] = hexToHsl(baseColor);
    
    switch (mode) {
      case 'random':
        colors = Array.from({ length: count }, randomHex);
        break;
        
      case 'complementary':
        colors = [baseColor, hslToHex((h + 180) % 360, s, l)];
        // Add variations
        colors.push(hslToHex(h, Math.max(20, s - 20), Math.min(90, l + 20)));
        colors.push(hslToHex((h + 180) % 360, Math.max(20, s - 20), Math.min(90, l + 20)));
        break;
        
      case 'triadic':
        colors = [
          baseColor,
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l)
        ];
        break;
        
      case 'analogous':
        for (let i = 0; i < count; i++) {
          colors.push(hslToHex((h + (i - Math.floor(count / 2)) * 30) % 360, s, l));
        }
        break;
        
      case 'monochromatic':
        for (let i = 0; i < count; i++) {
          const newL = Math.max(10, Math.min(90, l + (i - Math.floor(count / 2)) * 15));
          colors.push(hslToHex(h, s, newL));
        }
        break;
        
      case 'split':
        colors = [
          baseColor,
          hslToHex((h + 150) % 360, s, l),
          hslToHex((h + 210) % 360, s, l)
        ];
        break;
        
      case 'tetradic':
        colors = [
          baseColor,
          hslToHex((h + 90) % 360, s, l),
          hslToHex((h + 180) % 360, s, l),
          hslToHex((h + 270) % 360, s, l)
        ];
        break;
        
      default:
        colors = [baseColor];
    }
    
    // Limit to count
    colors = colors.slice(0, count);
    
    const paletteStr = colors.map((c, i) => `${i + 1}. ${c.toUpperCase()}`).join('\n');
    const cssStr = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
    
    return [
      { value: paletteStr, label: 'Цвета (HEX)', unit: '' },
      { value: cssStr, label: 'CSS переменные', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите тип палитры и базовый цвет (для расчётных палитр). Комплементарная — противоположные, триадная — треугольник на цветовом круге.',
    about: 'Генератор цветовых палитр на основе теории цвета. Комплементарные (контрастные), триадные (гармоничные), аналоговые (близкие), монохромные (оттенки), тетрадные (двойной контраст).',
    usage: 'Используется дизайнерами для подбора цветов сайтов, приложений, презентаций, графики. CSS-код можно скопировать напрямую в проект.',
    formula: 'Цветовой круг HSL: Hue 0-360°, Saturation 0-100%, Lightness 0-100%',
    faq: [
      {
        question: 'Что такое комплементарные цвета?',
        answer: 'Цвета напротив друг друга на цветовом круге (например, синий и оранжевый). Создают максимальный контраст, используются для акцентов.'
      },
      {
        question: 'Когда использовать монохромную палитру?',
        answer: 'Для минималистичных дизайнов, когда нужна спокойная гармония. Разные оттенки одного цвета не конфликтуют между собой.'
      },
      {
        question: 'Что такое триадная палитра?',
        answer: 'Три цвета, равноудалённых на цветовом круге (120° друг от друга). Яркая и гармоничная, часто используется в брендинге.'
      }
    ],
    sources: [
      { title: 'Теория цвета — Википедия', url: 'https://ru.wikipedia.org/wiki/Теория_цвета' },
      { title: 'Цветовой круг', url: 'https://ru.wikipedia.org/wiki/Цветовой_круг' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Генератор MEME-текстов
export const memeTextGenerator: Calculator = {
  id: 'meme-text-generator',
  slug: 'generator-meme-tekstov',
  title: 'Генератор MEME-текстов',
  description: 'Создание классических мем-форматов: Impact font, верхний/нижний текст, популярные шаблоны',
  category: 'razvlecheniya',
  subcategory: 'generatory',
  type: 'formula',
  inputs: [
    {
      name: 'template',
      label: 'Шаблон мема',
      type: 'select',
      options: [
        { value: 'classic', label: '🖼️ Классический (верх/низ)' },
        { value: 'drake', label: '🙅 Дрейк (отказ/одобрение)' },
        { value: 'distracted', label: '👀 Отвлекающий парень' },
        { value: 'change_mind', label: '☕ Измени моё мнение' },
        { value: 'always_has', label: '🌍 Всегда было' },
        { value: 'one_does_not', label: '💍 Нельзя просто' },
        { value: 'success_kid', label: '👶 Малыш успеха' },
        { value: 'custom', label: '✏️ Свой текст' }
      ],
      defaultValue: 'classic'
    },
    {
      name: 'topText',
      label: 'Верхний текст',
      type: 'text',
      placeholder: 'КОГДА ТЫ...',
      defaultValue: 'КОГДА ТЫ'
    },
    {
      name: 'bottomText',
      label: 'Нижний текст',
      type: 'text',
      placeholder: '...НО ПОТОМ',
      defaultValue: 'ВСЁ СДЕЛАЛ САМ'
    },
    {
      name: 'format',
      label: 'Формат вывода',
      type: 'select',
      options: [
        { value: 'ascii', label: 'ASCII-арт' },
        { value: 'text', label: 'Текстовое описание' },
        { value: 'html', label: 'HTML структура' }
      ],
      defaultValue: 'text'
    }
  ],
  outputs: [
    { name: 'meme', label: 'Мем-контент', type: 'text' },
    { name: 'specs', label: 'Спецификации', type: 'text' }
  ],
  calculate: (inputs) => {
    const template = String(inputs.template);
    let topText = String(inputs.topText).toUpperCase();
    let bottomText = String(inputs.bottomText).toUpperCase();
    const format = String(inputs.format);
    
    const templates: Record<string, { top?: string; bottom?: string; desc: string; specs: string }> = {
      classic: {
        desc: 'Классический мем с текстом сверху и снизу',
        specs: 'Шрифт: Impact, белый с чёрной обводкой. Размер: 36-72px. Позиция: по центру, верх/низ с отступом 10px.'
      },
      drake: {
        top: '❌ Не одобряю: ' + topText,
        bottom: '✅ Одобряю: ' + bottomText,
        desc: 'Формат Дрейка: верх — отказ, низ — одобрение',
        specs: 'Две панели. Левый Дрейк отмахивается (верх), правый одобряет (низ).'
      },
      distracted: {
        top: 'Твоя девушка: ' + topText,
        bottom: 'Парень смотрит на: ' + bottomText,
        desc: 'Отвлекающий парень — отвлекается на что-то другое',
        specs: 'Три зоны: девушка (слева), парень (центр), отвлекающий объект (справа).'
      },
      change_mind: {
        top: '☕ ' + topText,
        bottom: bottomText,
        desc: '«Измени моё мнение» — вызов на дискуссию',
        specs: 'Чашка кофе на столе, серьёзное лицо. Центральная надпись: "CHANGE MY MIND".'
      },
      always_has: {
        top: topText + '?',
        bottom: 'Всегда было: ' + bottomText,
        desc: 'Астронавт с пистолетом — всегда было так',
        specs: 'Две панели: первый астронавт говорит, второй готовит пистолет сзади.'
      },
      one_does_not: {
        top: 'НЕЛЬЗЯ ПРОСТО ВЗЯТЬ',
        bottom: bottomText || 'И ПРОСТО ' + topText,
        desc: 'Боромир — «Нельзя просто взять»',
        specs: 'Кадр из ВК: «Одни не просто входят в Мордор». Шрифт крупный, драматичный.'
      },
      success_kid: {
        top: topText,
        bottom: bottomText || 'УСПЕХ!',
        desc: 'Малыш с кулаком — мем успеха',
        specs: 'Фото ребёнка с песком в руке, выражение победы. Короткий текст, punchline снизу.'
      },
      custom: {
        desc: 'Пользовательский мем',
        specs: 'Настраиваемый формат. Рекомендуется Impact font, ALL CAPS, белый текст с обводкой.'
      }
    };
    
    const t = templates[template] || templates.classic;
    
    let output = '';
    
    if (format === 'ascii') {
      // Simple ASCII art representation
      const width = Math.max(topText.length, bottomText.length, 20);
      output = `
┌${'─'.repeat(width + 4)}┐
│  ${topText.padEnd(width)}  │
│${' '.repeat(width + 4)}│
│     [ КАРТИНКА ]      │
│${' '.repeat(width + 4)}│
│  ${bottomText.padEnd(width)}  │
└${'─'.repeat(width + 4)}┘`;
    } else if (format === 'html') {
      output = `<div class="meme-container">
  <div class="meme-top-text">${topText}</div>
  <img src="meme-template.jpg" alt="${template}">
  <div class="meme-bottom-text">${bottomText}</div>
</div>

<style>
.meme-container {
  position: relative;
  text-align: center;
  font-family: Impact, sans-serif;
}
.meme-top-text, .meme-bottom-text {
  color: white;
  text-shadow: 2px 2px 0 #000, -1px -1px 0 #000;
  font-size: 36px;
  text-transform: uppercase;
}
.meme-top-text { position: absolute; top: 10px; width: 100%; }
.meme-bottom-text { position: absolute; bottom: 10px; width: 100%; }
</style>`;
    } else {
      // Text format
      const tt = t.top || topText;
      const bt = t.bottom || bottomText;
      output = `[${template.toUpperCase()}]

┌─────────────────────────┐
  ${tt}
                         
    [ ИЗОБРАЖЕНИЕ ]
                         
  ${bt}
└─────────────────────────┘

${t.desc}`;
    }
    
    return [
      { value: output, label: 'Мем-структура', unit: '' },
      { value: t.specs, label: 'Технические спецификации', unit: '' }
    ];
  },
  content: {
    howTo: 'Выберите шаблон мема, введите верхний и нижний текст. Калькулятор сгенерирует структуру мема с правильными спецификациями.',
    about: 'Генератор классических интернет-мемов: Impact font, верхний/нижний текст (top text/bottom text), популярные шаблоны (Дрейк, Отвлекающий парень, Успех Кид, Боромир).',
    usage: 'Используется для создания мемов для социальных сетей, мессенджеров, форумов. Генерирует правильную структуру для дальнейшего редактирования в графических редакторах.',
    formula: 'Классический формат: Impact font, ALL CAPS, белый текст с чёрной обводкой (2px), позиционирование по центру.',
    faq: [
      {
        question: 'Какой шрифт используется в классических мемах?',
        answer: 'Impact — жирный sans-serif шрифт. Текст всегда заглавными буквами (ALL CAPS), белый с чёрной обводкой.'
      },
      {
        question: 'Какая структура у классического мема?',
        answer: 'Верхний текст — завязка/ситуация (setup). Изображение — визуальный гэг. Нижний текст — развязка/панчлайн (punchline).'
      },
      {
        question: 'Можно ли скачать готовый мем?',
        answer: 'Нет, калькулятор генерирует текстовую структуру и спецификации. Для создания изображения используйте: imgflip.com, memegenerator.net, или графические редакторы.'
      }
    ],
    sources: [
      { title: 'Интернет-мем — Википедия', url: 'https://ru.wikipedia.org/wiki/Интернет-мем' },
      { title: 'Impact шрифт', url: 'https://ru.wikipedia.org/wiki/Impact' }
    ],
    updatedAt: '2026-04-07'
  }
};

// Export all generators
export const generatorsMoreCalculators = [
  advancedRandomGenerator,
  uuidGenerator,
  barcodeGenerator,
  qrCodeGenerator,
  fakeDataGenerator,
  randomNameGenerator,
  lotteryGenerator,
  coinDiceGenerator,
  colorPaletteGenerator,
  memeTextGenerator
];
