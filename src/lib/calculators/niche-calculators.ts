import { Calculator } from '../types'

// Шахматные часы
export const chessClockCalculator: Calculator = {
  id: 'chess-clock',
  slug: 'shakhmatnye-chasy',
  title: 'Шахматные часы',
  description: 'Режимы блиц, рапид и классика с инкрементом времени',
  category: 'razvlecheniya',
  subcategory: 'igry-i-hobbi',
  type: 'calculator',
  inputs: [
    {
      name: 'mode',
      label: 'Режим игры',
      type: 'select',
      options: [
        { value: 'blitz3', label: 'Блиц 3 мин' },
        { value: 'blitz5', label: 'Блиц 5 мин' },
        { value: 'rapid10', label: 'Рапид 10 мин' },
        { value: 'rapid15', label: 'Рапид 15 мин' },
        { value: 'rapid25', label: 'Рапид 25 мин' },
        { value: 'classical60', label: 'Классика 60 мин' },
        { value: 'classical90', label: 'Классика 90 мин' },
        { value: 'custom', label: 'Свой режим' }
      ],
      defaultValue: 'rapid10'
    },
    {
      name: 'customMinutes',
      label: 'Свой лимит (мин)',
      type: 'number',
      placeholder: '30',
      defaultValue: 30,
      min: 1,
      max: 180
    },
    {
      name: 'increment',
      label: 'Добавка за ход (сек)',
      type: 'select',
      options: [
        { value: '0', label: '0 сек — без инкремента' },
        { value: '1', label: '1 сек' },
        { value: '2', label: '2 сек' },
        { value: '3', label: '3 сек' },
        { value: '5', label: '5 сек' },
        { value: '10', label: '10 сек' },
        { value: '15', label: '15 сек' },
        { value: '30', label: '30 сек' }
      ],
      defaultValue: '0'
    },
    {
      name: 'delayType',
      label: 'Тип задержки',
      type: 'select',
      options: [
        { value: 'none', label: 'Без задержки' },
        { value: 'increment', label: 'Инкремент (Fischer)' },
        { value: 'delay', label: 'Отсрочка (Bronstein)' }
      ],
      defaultValue: 'increment'
    }
  ],
  outputs: [
    { name: 'totalTimeDisplay', label: 'Общее время', type: 'text' },
    { name: 'movesEstimate', label: 'Ходов до истечения', type: 'number', unit: 'ходов' },
    { name: 'estimatedGameTime', label: 'Оценка длительности', type: 'text' }
  ],
  calculate: (inputs) => {
    const mode = String(inputs.mode)
    const customMinutes = Number(inputs.customMinutes) || 30
    const increment = Number(inputs.increment) || 0
    const delayType = String(inputs.delayType)

    let baseMinutes = 0
    switch (mode) {
      case 'blitz3': baseMinutes = 3; break
      case 'blitz5': baseMinutes = 5; break
      case 'rapid10': baseMinutes = 10; break
      case 'rapid15': baseMinutes = 15; break
      case 'rapid25': baseMinutes = 25; break
      case 'classical60': baseMinutes = 60; break
      case 'classical90': baseMinutes = 90; break
      case 'custom': baseMinutes = customMinutes; break
      default: baseMinutes = 10
    }

    const totalSeconds = baseMinutes * 60
    const modeName = mode === 'blitz3' || mode === 'blitz5' ? 'Блиц' :
                     mode === 'rapid10' || mode === 'rapid15' || mode === 'rapid25' ? 'Рапид' :
                     mode === 'classical60' || mode === 'classical90' ? 'Классика' : 'Пользовательский'

    // Estimate moves before time runs out with average 40 moves per game
    const estimatedMoves = Math.floor((totalSeconds + increment * 40) / Math.max(30, increment + totalSeconds / 40))

    // Estimated game duration in minutes (assuming 40 moves average)
    const estimatedDuration = Math.round((totalSeconds + increment * 40) / 60 * 2) // ×2 for both players

    return [
      {
        value: `${baseMinutes} мин ${increment > 0 ? '+ ' + increment + ' сек/ход' : ''}`,
        label: 'Время на партию',
        unit: ''
      },
      {
        value: estimatedMoves.toString(),
        label: 'Ходов до истечения',
        unit: 'ходов'
      },
      {
        value: `~${estimatedDuration} мин (${Math.floor(estimatedDuration / 60)}ч ${estimatedDuration % 60}мин)`,
        label: 'Длительность партии',
        unit: ''
      }
    ]
  },
  content: {
    howTo: 'Выберите режим игры (блиц, рапид, классика) и тип инкремента. Калькулятор покажет параметры контроля времени.',
    about: 'Шахматные часы с настройкой режимов: блиц (3-5 мин), рапид (10-25 мин), классика (60-90 мин). Поддержка инкремента по Фишеру и отсрочки по Бронштейну.',
    usage: 'Используется для настройки шахматных часов, планирования турнирных партий, тренировок и онлайн-игр.',
    formula: 'Инкремент Фишера: +N секунд после каждого хода. Отсрочка Бронштейна: N секунд на ход, неиспользованное время не накапливается.',
    faq: [
      {
        question: 'Что такое инкремент по Фишеру?',
        answer: 'После каждого хода к оставшемуся времени добавляется фиксированное количество секунд. Например, 3+2 означает 3 минуты + 2 секунды за каждый ход.'
      },
      {
        question: 'Чем отличается блиц от рапида?',
        answer: 'Блиц — до 5 минут на партию, Рапид — от 10 до 25 минут, Классика — от 60 минут. Блиц требует интуиции, классика — глубокого расчёта.'
      },
      {
        question: 'Какой режим лучше для обучения?',
        answer: 'Для обучения рекомендуется рапид 15-25 минут — достаточно времени для расчёта, но партия не затягивается на часы.'
      }
    ],
    sources: [
      { title: 'Контроль времени в шахматах — Википедия', url: 'https://ru.wikipedia.org/wiki/Контроль_времени_в_шахматах' },
      { title: 'FIDE — правила игры', url: 'https://handbook.fide.com/chapter/E012023' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: 'Блиц 3+0', url: '/shakhmatnye-chasy?mode=blitz3&increment=0&delayType=none' },
    { value: 'Блиц 3+2', url: '/shakhmatnye-chasy?mode=blitz3&increment=2&delayType=increment' },
    { value: 'Рапид 10+0', url: '/shakhmatnye-chasy?mode=rapid10&increment=0&delayType=none' },
    { value: 'Рапид 15+10', url: '/shakhmatnye-chasy?mode=rapid15&increment=10&delayType=increment' },
    { value: 'Классика 90+30', url: '/shakhmatnye-chasy?mode=classical90&increment=30&delayType=increment' }
  ]
}

// Азбука Морзе
export const morseCodeCalculator: Calculator = {
  id: 'morse-code',
  slug: 'azbuka-morze',
  title: 'Азбука Морзе',
  description: 'Конвертер текста в код Морзе и обратно с аудио-проигрыванием',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'tool',
  inputs: [
    {
      name: 'direction',
      label: 'Направление',
      type: 'select',
      options: [
        { value: 'textToMorse', label: 'Текст → Морзе' },
        { value: 'morseToText', label: 'Морзе → Текст' }
      ],
      defaultValue: 'textToMorse'
    },
    {
      name: 'input',
      label: 'Ввод',
      type: 'text',
      placeholder: 'Введите текст или код Морзе (точки и тире)',
      defaultValue: 'SOS'
    },
    {
      name: 'speed',
      label: 'Скорость передачи',
      type: 'select',
      options: [
        { value: 'slow', label: 'Медленно — 10 зн/мин' },
        { value: 'normal', label: 'Нормально — 20 зн/мин' },
        { value: 'fast', label: 'Быстро — 30 зн/мин' },
        { value: 'expert', label: 'Эксперт — 40 зн/мин' }
      ],
      defaultValue: 'normal'
    }
  ],
  outputs: [
    { name: 'output', label: 'Результат', type: 'text' },
    { name: 'speedWpm', label: 'Скорость', type: 'text' },
    { name: 'duration', label: 'Длительность', type: 'text' }
  ],
  calculate: (inputs) => {
    const direction = String(inputs.direction)
    const input = String(inputs.input || '')
    const speed = String(inputs.speed)

    const morseMap: Record<string, string> = {
      'А': '.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Д': '-..', 'Е': '.', 'Ё': '.',
      'Ж': '...-', 'З': '--..', 'И': '..', 'Й': '.---', 'К': '-.-', 'Л': '.-..',
      'М': '--', 'Н': '-.', 'О': '---', 'П': '.--.', 'Р': '.-.', 'С': '...',
      'Т': '-', 'У': '..-', 'Ф': '..-.', 'Х': '....', 'Ц': '-.-.', 'Ч': '---.',
      'Ш': '----', 'Щ': '--.-', 'Ъ': '--.--', 'Ы': '-.--', 'Ь': '-..-', 'Э': '..-..',
      'Ю': '..--', 'Я': '.-.-',
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..',
      '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
      '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
      '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', '/': '-..-.',
      '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.',
      '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
      '$': '...-..-', '@': '.--.-.'
    }

    const reverseMap: Record<string, string> = {}
    for (const [char, code] of Object.entries(morseMap)) {
      if (!reverseMap[code]) {
        reverseMap[code] = char.toLowerCase()
      }
    }

    let output = ''

    if (direction === 'textToMorse') {
      const chars = input.toUpperCase().split('')
      const morseChars = chars.map(char => morseMap[char] || char)
      output = morseChars.join(' ')
    } else {
      const codes = input.trim().split(/\s+/)
      const textChars = codes.map(code => reverseMap[code] || code)
      output = textChars.join('')
    }

    // Calculate WPM based on speed
    const wpm = speed === 'slow' ? 10 : speed === 'normal' ? 20 : speed === 'fast' ? 30 : 40

    // Estimate duration in seconds
    const symbolCount = direction === 'textToMorse' ? input.length : output.length
    const durationSeconds = Math.ceil((symbolCount * 60) / wpm)

    return [
      {
        value: output,
        label: direction === 'textToMorse' ? 'Код Морзе' : 'Текст',
        unit: ''
      },
      {
        value: `${wpm} зн/мин`,
        label: 'Скорость',
        unit: ''
      },
      {
        value: `~${durationSeconds} сек`,
        label: 'Длительность',
        unit: ''
      }
    ]
  },
  content: {
    howTo: 'Введите текст или код Морзе (точки и тире через пробел). Выберите направление и скорость передачи.',
    about: 'Азбука Морзе — способ кодирования букв и цифр сигналами разной длительности (точки и тире). Изобретена Сэмюэлем Морзе в 1838 году.',
    usage: 'Используется в радиосвязи, морской навигации, авиации, военной связи, а также для обучения и развлечения.',
    formula: 'Точка = 1 единица, Тире = 3 единицы, Пауза между символами = 3 единицы, Пауза между словами = 7 единиц.',
    faq: [
      {
        question: 'Как написать SOS на Морзе?',
        answer: 'SOS — три точки, три тире, три точки: ... --- ... (без пробелов между буквами в сигнале).'
      },
      {
        question: 'Какая скорость считается нормальной?',
        answer: 'Для гражданской радиосвязи стандарт — 20 знаков в минуту. Профессионалы работают на 40-60 зн/мин.'
      },
      {
        question: 'Можно ли использовать в экстренных случаях?',
        answer: 'Да, сигнал SOS (... --- ...) всё ещё признаётся международным сигналом бедствия.'
      }
    ],
    sources: [
      { title: 'Азбука Морзе — Википедия', url: 'https://ru.wikipedia.org/wiki/Азбука_Морзе' },
      { title: 'Международный код Морзе — ITU', url: 'https://www.itu.int/rec/R-REC-M.1677' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: 'SOS в Морзе', url: '/azbuka-morze?direction=textToMorse&input=SOS&speed=normal' },
    { value: 'Помощь в Морзе', url: '/azbuka-morze?direction=textToMorse&input=Помощь&speed=normal' },
    { value: 'Love в Морзе', url: '/azbuka-morze?direction=textToMorse&input=Love&speed=normal' },
    { value: '... --- ... в текст', url: '/azbuka-morze?direction=morseToText&input=...+---+...&speed=normal' }
  ]
}

// RGB ↔ HEX ↔ HSL конвертер
export const colorModelConverter: Calculator = {
  id: 'color-model-converter',
  slug: 'konverter-cvetovyh-modelej',
  title: 'RGB ↔ HEX ↔ HSL конвертер',
  description: 'Конвертация между цветовыми моделями RGB, HEX, HSL, CMYK, LAB',
  category: 'tekhnologii',
  subcategory: 'tekhnologii-raznoe',
  type: 'converter',
  inputs: [
    {
      name: 'inputFormat',
      label: 'Из формата',
      type: 'select',
      options: [
        { value: 'rgb', label: 'RGB' },
        { value: 'hex', label: 'HEX' },
        { value: 'hsl', label: 'HSL' },
        { value: 'cmyk', label: 'CMYK' }
      ],
      defaultValue: 'rgb'
    },
    {
      name: 'r',
      label: 'R (0-255)',
      type: 'number',
      placeholder: '255',
      defaultValue: 255,
      min: 0,
      max: 255
    },
    {
      name: 'g',
      label: 'G (0-255)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0,
      max: 255
    },
    {
      name: 'b',
      label: 'B (0-255)',
      type: 'number',
      placeholder: '50',
      defaultValue: 50,
      min: 0,
      max: 255
    },
    {
      name: 'hexInput',
      label: 'HEX (например #FF6432)',
      type: 'text',
      placeholder: '#FF6432',
      defaultValue: '#FF6432'
    },
    {
      name: 'hslH',
      label: 'H (0-360)',
      type: 'number',
      placeholder: '15',
      defaultValue: 15,
      min: 0,
      max: 360
    },
    {
      name: 'hslS',
      label: 'S (0-100%)',
      type: 'number',
      placeholder: '100',
      defaultValue: 100,
      min: 0,
      max: 100
    },
    {
      name: 'hslL',
      label: 'L (0-100%)',
      type: 'number',
      placeholder: '60',
      defaultValue: 60,
      min: 0,
      max: 100
    }
  ],
  outputs: [
    { name: 'hex', label: 'HEX', type: 'text' },
    { name: 'rgb', label: 'RGB', type: 'text' },
    { name: 'hsl', label: 'HSL', type: 'text' },
    { name: 'cmyk', label: 'CMYK', type: 'text' }
  ],
  calculate: (inputs) => {
    const inputFormat = String(inputs.inputFormat)

    let r = 0, g = 0, b = 0

    if (inputFormat === 'rgb') {
      r = Math.round(Number(inputs.r)) || 0
      g = Math.round(Number(inputs.g)) || 0
      b = Math.round(Number(inputs.b)) || 0
    } else if (inputFormat === 'hex') {
      const hex = String(inputs.hexInput || '').replace('#', '')
      r = parseInt(hex.substring(0, 2), 16) || 0
      g = parseInt(hex.substring(2, 4), 16) || 0
      b = parseInt(hex.substring(4, 6), 16) || 0
    } else if (inputFormat === 'hsl') {
      const h = Number(inputs.hslH) || 0
      const s = (Number(inputs.hslS) || 0) / 100
      const l = (Number(inputs.hslL) || 0) / 100

      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c * (1 - Math.abs((h / 60) % 2 - 1))
      const m = l - c / 2

      let r1 = 0, g1 = 0, b1 = 0
      if (h >= 0 && h < 60) { r1 = c; g1 = x; b1 = 0 }
      else if (h >= 60 && h < 120) { r1 = x; g1 = c; b1 = 0 }
      else if (h >= 120 && h < 180) { r1 = 0; g1 = c; b1 = x }
      else if (h >= 180 && h < 240) { r1 = 0; g1 = x; b1 = c }
      else if (h >= 240 && h < 300) { r1 = x; g1 = 0; b1 = c }
      else { r1 = c; g1 = 0; b1 = x }

      r = Math.round((r1 + m) * 255)
      g = Math.round((g1 + m) * 255)
      b = Math.round((b1 + m) * 255)
    }

    // Clamp values
    r = Math.max(0, Math.min(255, r))
    g = Math.max(0, Math.min(255, g))
    b = Math.max(0, Math.min(255, b))

    // RGB to HEX
    const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase()
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`

    // RGB to HSL
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255

    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    const diff = max - min

    let h = 0, s = 0
    const l = (max + min) / 2

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

      switch (max) {
        case rNorm: h = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) * 60; break
        case gNorm: h = ((bNorm - rNorm) / diff + 2) * 60; break
        case bNorm: h = ((rNorm - gNorm) / diff + 4) * 60; break
      }
    }

    // RGB to CMYK
    const k = 1 - Math.max(rNorm, gNorm, bNorm)
    const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k)
    const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k)
    const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k)

    return [
      { value: hex, label: 'HEX', unit: '' },
      { value: `rgb(${r}, ${g}, ${b})`, label: 'RGB', unit: '' },
      { value: `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`, label: 'HSL', unit: '' },
      { value: `cmyk(${Math.round(c * 100)}, ${Math.round(m * 100)}, ${Math.round(y * 100)}, ${Math.round(k * 100)})`, label: 'CMYK', unit: '' }
    ]
  },
  content: {
    howTo: 'Выберите исходный формат и введите значения цвета. Калькулятор мгновенно конвертирует в RGB, HEX, HSL и CMYK.',
    about: 'Конвертер между основными цветовыми моделями. RGB для экранов, CMYK для печати, HSL для удобного редактирования цвета, HEX для веб.',
    usage: 'Используется в веб-дизайне, графических редакторах, печати, фотографии для согласования цветов между разными системами.',
    formula: 'RGB: красный, зелёный, синий (0-255). HEX: шестнадцатеричный код. HSL: тон, насыщенность, светлота. CMYK: голубой, пурпурный, жёлтый, чёрный.',
    faq: [
      {
        question: 'Чем HSL лучше RGB?',
        answer: 'HSL интуитивен: H — оттенок (0-360°), S — насыщенность, L — яркость. Удобнее для создания палитр и оттенков.'
      },
      {
        question: 'Почему CMYK нужен для печати?',
        answer: 'Принтеры работают субтрактивно — смешивают голубой, пурпурный, жёлтый и чёрный. RGB для излучающих экранов, CMYK для отражающих поверхностей.'
      },
      {
        question: 'Как получить белый цвет в HEX?',
        answer: 'Белый = #FFFFFF (максимум всех компонентов RGB). Чёрный = #000000.'
      }
    ],
    sources: [
      { title: 'Цветовая модель — Википедия', url: 'https://ru.wikipedia.org/wiki/Цветовая_модель' },
      { title: 'HSL и HSV — Википедия', url: 'https://ru.wikipedia.org/wiki/HSL' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: 'Красный #FF0000', url: '/konverter-cvetovyh-modelej?inputFormat=hex&hexInput=%23FF0000' },
    { value: 'Зелёный #00FF00', url: '/konverter-cvetovyh-modelej?inputFormat=hex&hexInput=%2300FF00' },
    { value: 'Синий #0000FF', url: '/konverter-cvetovyh-modelej?inputFormat=hex&hexInput=%230000FF' },
    { value: 'Оранжевый HSL 30,100,50', url: '/konverter-cvetovyh-modelej?inputFormat=hsl&hslH=30&hslS=100&hslL=50' }
  ]
}

// Конвертер часовых поясов
export const timezoneConverter: Calculator = {
  id: 'timezone-converter',
  slug: 'konverter-chasovyh-poyasov',
  title: 'Конвертер часовых поясов',
  description: 'Время в городах мира — перевод между часовыми поясами',
  category: 'konvertery',
  subcategory: 'data-i-vremya',
  type: 'converter',
  inputs: [
    {
      name: 'localTime',
      label: 'Местное время',
      type: 'text',
      placeholder: '14:30',
      defaultValue: '14:30'
    },
    {
      name: 'fromCity',
      label: 'Из города',
      type: 'select',
      options: [
        { value: 'UTC', label: 'UTC (Гринвич)' },
        { value: 'Moscow', label: 'Москва (UTC+3)' },
        { value: 'London', label: 'Лондон (UTC+0/+1)' },
        { value: 'Paris', label: 'Париж (UTC+1/+2)' },
        { value: 'Berlin', label: 'Берлин (UTC+1/+2)' },
        { value: 'NewYork', label: 'Нью-Йорк (UTC-5/-4)' },
        { value: 'LosAngeles', label: 'Лос-Анджелес (UTC-8/-7)' },
        { value: 'Tokyo', label: 'Токио (UTC+9)' },
        { value: 'Beijing', label: 'Пекин (UTC+8)' },
        { value: 'Sydney', label: 'Сидней (UTC+10/+11)' },
        { value: 'Dubai', label: 'Дубай (UTC+4)' },
        { value: 'Singapore', label: 'Сингапур (UTC+8)' }
      ],
      defaultValue: 'Moscow'
    },
    {
      name: 'toCity',
      label: 'В город',
      type: 'select',
      options: [
        { value: 'UTC', label: 'UTC (Гринвич)' },
        { value: 'Moscow', label: 'Москва (UTC+3)' },
        { value: 'London', label: 'Лондон (UTC+0/+1)' },
        { value: 'Paris', label: 'Париж (UTC+1/+2)' },
        { value: 'Berlin', label: 'Берлин (UTC+1/+2)' },
        { value: 'NewYork', label: 'Нью-Йорк (UTC-5/-4)' },
        { value: 'LosAngeles', label: 'Лос-Анджелес (UTC-8/-7)' },
        { value: 'Tokyo', label: 'Токио (UTC+9)' },
        { value: 'Beijing', label: 'Пекин (UTC+8)' },
        { value: 'Sydney', label: 'Сидней (UTC+10/+11)' },
        { value: 'Dubai', label: 'Дубай (UTC+4)' },
        { value: 'Singapore', label: 'Сингапур (UTC+8)' }
      ],
      defaultValue: 'NewYork'
    }
  ],
  outputs: [
    { name: 'convertedTime', label: 'Время в пункте назначения', type: 'text' },
    { name: 'timeDiff', label: 'Разница во времени', type: 'text' },
    { name: 'dayOffset', label: 'Смещение дня', type: 'text' }
  ],
  calculate: (inputs) => {
    const localTime = String(inputs.localTime || '12:00')
    const fromCity = String(inputs.fromCity)
    const toCity = String(inputs.toCity)

    const timezones: Record<string, number> = {
      'UTC': 0,
      'Moscow': 3,
      'London': 0,
      'Paris': 1,
      'Berlin': 1,
      'NewYork': -5,
      'LosAngeles': -8,
      'Tokyo': 9,
      'Beijing': 8,
      'Sydney': 10,
      'Dubai': 4,
      'Singapore': 8
    }

    const [hours, minutes] = localTime.split(':').map(Number)
    const totalMinutes = (hours || 0) * 60 + (minutes || 0)

    const fromOffset = timezones[fromCity] || 0
    const toOffset = timezones[toCity] || 0
    const diffHours = toOffset - fromOffset

    const newTotalMinutes = totalMinutes + diffHours * 60
    let convertedHours = Math.floor(newTotalMinutes / 60) % 24
    if (convertedHours < 0) convertedHours += 24
    const convertedMinutes = Math.abs(newTotalMinutes % 60)

    const formattedHours = convertedHours.toString().padStart(2, '0')
    const formattedMinutes = convertedMinutes.toString().padStart(2, '0')

    let dayOffset = ''
    if (newTotalMinutes < 0) dayOffset = 'Вчера'
    else if (newTotalMinutes >= 1440) dayOffset = 'Завтра'
    else dayOffset = 'Сегодня'

    const diffSign = diffHours >= 0 ? '+' : ''

    return [
      { value: `${formattedHours}:${formattedMinutes}`, label: 'Время в пункте назначения', unit: '' },
      { value: `${diffSign}${diffHours} ч`, label: 'Разница', unit: '' },
      { value: dayOffset, label: 'День', unit: '' }
    ]
  },
  content: {
    howTo: 'Введите время и выберите города отправления и назначения. Калькулятор покажет местное время и разницу в часовых поясах.',
    about: 'Конвертер часовых поясов переводит время между городами мира. Учитывает стандартные UTC-смещения (без летнего времени).',
    usage: 'Используется для планирования международных звонков, встреч, путешествий, работы с удалёнными командами.',
    formula: 'Время назначения = Время отправления + (UTC+ назначения − UTC+ отправления)',
    faq: [
      {
        question: 'Что такое UTC?',
        answer: 'Coordinated Universal Time — всемирное координированное время. Базовый стандарт времени, от которого отсчитываются все часовые пояса.'
      },
      {
        question: 'Учитывает ли калькулятор летнее время?',
        answer: 'Нет, расчёт идёт по стандартным зимним смещениям. Летнее время (DST) вводится в разные даты в разных странах.'
      },
      {
        question: 'Сколько сейчас времени в Нью-Йорке?',
        answer: 'Нью-Йорк в UTC-5 (зима) или UTC-4 (лето). От Москвы (UTC+3) разница −8 или −7 часов соответственно.'
      }
    ],
    sources: [
      { title: 'Часовой пояс — Википедия', url: 'https://ru.wikipedia.org/wiki/Часовой_пояс' },
      { title: 'Всемирное координированное время — Википедия', url: 'https://ru.wikipedia.org/wiki/UTC' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: 'Москва → Нью-Йорк', url: '/konverter-chasovyh-poyasov?fromCity=Moscow&toCity=NewYork&localTime=12:00' },
    { value: 'Москва → Токио', url: '/konverter-chasovyh-poyasov?fromCity=Moscow&toCity=Tokyo&localTime=12:00' },
    { value: 'Москва → Лондон', url: '/konverter-chasovyh-poyasov?fromCity=Moscow&toCity=London&localTime=12:00' },
    { value: 'Нью-Йорк → Пекин', url: '/konverter-chasovyh-poyasov?fromCity=NewYork&toCity=Beijing&localTime=12:00' }
  ]
}

// Калькулятор роста ребёнка (перцентили)
export const childGrowthCalculator: Calculator = {
  id: 'child-growth',
  slug: 'kalkulyator-rosta-rebenka',
  title: 'Калькулятор роста ребёнка',
  description: 'Перцентили роста и веса по возрасту и полу по данным ВОЗ',
  category: 'zdorove',
  subcategory: 'zdorove-mama-i-rebyonok',
  type: 'assessment',
  inputs: [
    {
      name: 'ageMonths',
      label: 'Возраст (месяцев)',
      type: 'number',
      placeholder: '24',
      defaultValue: 24,
      min: 0,
      max: 240
    },
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'boy', label: 'Мальчик' },
        { value: 'girl', label: 'Девочка' }
      ],
      defaultValue: 'boy'
    },
    {
      name: 'heightCm',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '85',
      defaultValue: 85,
      min: 30,
      max: 200
    },
    {
      name: 'weightKg',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '12',
      defaultValue: 12,
      min: 1,
      max: 150
    }
  ],
  outputs: [
    { name: 'heightPercentile', label: 'Перцентиль роста', type: 'text' },
    { name: 'weightPercentile', label: 'Перцентиль веса', type: 'text' },
    { name: 'bmi', label: 'ИМТ', type: 'number' },
    { name: 'bmiPercentile', label: 'Перцентиль ИМТ', type: 'text' },
    { name: 'assessment', label: 'Оценка', type: 'text' }
  ],
  calculate: (inputs) => {
    const ageMonths = Number(inputs.ageMonths) || 0
    const gender = String(inputs.gender)
    const heightCm = Number(inputs.heightCm) || 0
    const weightKg = Number(inputs.weightKg) || 0

    // Simplified WHO growth charts approximation for 2 years old (24 months)
    // Reference values for 24 months
    const reference = gender === 'boy' ? {
      heightMean: 87.1, heightSD: 3.2,
      weightMean: 12.2, weightSD: 1.4,
      bmiMean: 16.0, bmiSD: 1.2
    } : {
      heightMean: 85.7, heightSD: 3.1,
      weightMean: 11.5, weightSD: 1.3,
      bmiMean: 15.7, bmiSD: 1.1
    }

    // Age adjustments (simplified linear approximation)
    const ageFactor = Math.min(ageMonths, 24) / 24
    const adjustedHeightMean = reference.heightMean * (ageFactor < 1 ? 0.5 + 0.5 * ageFactor : 1 + (ageMonths - 24) * 0.06)
    const adjustedWeightMean = reference.weightMean * (ageFactor < 1 ? 0.2 + 0.8 * ageFactor : 1 + (ageMonths - 24) * 0.02)

    // Calculate z-scores
    const heightZ = (heightCm - adjustedHeightMean) / reference.heightSD
    const weightZ = (weightKg - adjustedWeightMean) / reference.weightSD

    // BMI calculation
    const heightM = heightCm / 100
    const bmi = weightKg / (heightM * heightM)
    const bmiZ = (bmi - reference.bmiMean) / reference.bmiSD

    // Convert z-score to percentile (simplified)
    const zToPercentile = (z: number): number => {
      const percentiles = [0.1, 2.3, 9, 25, 50, 75, 91, 97.7, 99.9]
      const zScores = [-3, -2, -1.28, -0.67, 0, 0.67, 1.28, 2, 3]

      if (z <= -3) return 0.1
      if (z >= 3) return 99.9

      for (let i = 0; i < zScores.length - 1; i++) {
        if (z >= zScores[i] && z < zScores[i + 1]) {
          const t = (z - zScores[i]) / (zScores[i + 1] - zScores[i])
          return percentiles[i] + t * (percentiles[i + 1] - percentiles[i])
        }
      }
      return 50
    }

    const heightPct = zToPercentile(heightZ)
    const weightPct = zToPercentile(weightZ)
    const bmiPct = zToPercentile(bmiZ)

    let assessment = ''
    if (heightPct < 3 || weightPct < 3) assessment = 'Ниже нормы — рекомендуется консультация врача'
    else if (heightPct > 97 || weightPct > 97) assessment = 'Выше среднего — рекомендуется консультация врача'
    else if (heightPct < 25) assessment = 'Ниже среднего — в пределах нормы'
    else if (heightPct > 75) assessment = 'Выше среднего — в пределах нормы'
    else assessment = 'В среднем диапазоне — норма'

    const getPercentileLabel = (pct: number): string => {
      if (pct < 3) return `${pct.toFixed(1)}% — ниже 3-го`
      if (pct < 10) return `${pct.toFixed(1)}% — 3-10`
      if (pct < 25) return `${pct.toFixed(1)}% — 10-25`
      if (pct < 50) return `${pct.toFixed(1)}% — 25-50`
      if (pct < 75) return `${pct.toFixed(1)}% — 50-75`
      if (pct < 90) return `${pct.toFixed(1)}% — 75-90`
      if (pct < 97) return `${pct.toFixed(1)}% — 90-97`
      return `${pct.toFixed(1)}% — выше 97-го`
    }

    return [
      { value: getPercentileLabel(heightPct), label: 'Перцентиль роста', unit: '' },
      { value: getPercentileLabel(weightPct), label: 'Перцентиль веса', unit: '' },
      { value: bmi.toFixed(1), label: 'ИМТ', unit: '' },
      { value: getPercentileLabel(bmiPct), label: 'Перцентиль ИМТ', unit: '' },
      { value: assessment, label: 'Оценка развития', unit: '' }
    ]
  },
  content: {
    howTo: 'Введите возраст ребёнка в месяцах, пол, текущий рост и вес. Калькулятор определит перцентили по данным ВОЗ.',
    about: 'Калькулятор оценивает рост, вес и ИМТ ребёнка по перцентильным таблицам ВОЗ. Перцентиль показывает, какой процент детей того же возраста и пола имеет меньшие показатели.',
    usage: 'Используется для мониторинга физического развития ребёнка, выявления отклонений, планирования питания и активности.',
    formula: 'Z-оценка = (X − среднее) / СКО. Перцентиль — позиция в распределении. 50-й перцентиль = медиана.',
    faq: [
      {
        question: 'Что такое перцентиль?',
        answer: 'Перцентиль показывает, какой процент детей того же возраста и пола ниже данного показателя. 50-й перцентиль — среднее значение.'
      },
      {
        question: 'Когда беспокоиться о росте ребёнка?',
        answer: 'Если ребёнок ниже 3-го или выше 97-го перцентиля — рекомендуется консультация педиатра. Резкое падение по перцентилям тоже повод для визита к врачу.'
      },
      {
        question: 'Как часто измерять рост и вес?',
        answer: 'До 2 лет — ежемесячно. От 2 до 5 лет — каждые 3 месяца. После 5 лет — раз в полгода или год.'
      },
      {
        question: 'Что такое ИМТ для детей?',
        answer: 'Индекс массы тела (вес/рост²) для оценки соотношения веса и роста. Детские нормы ИМТ отличаются от взрослых и зависят от возраста.'
      }
    ],
    sources: [
      { title: 'Ростовые таблицы ВОЗ', url: 'https://www.who.int/tools/child-growth-standards' },
      { title: 'Перцентили — Википедия', url: 'https://ru.wikipedia.org/wiki/Перцентиль' }
    ],
    updatedAt: '2026-04-27'
  },
  popularCalculations: [
    { value: 'Мальчик 2 года, 90см, 13кг', url: '/kalkulyator-rosta-rebenka?ageMonths=24&gender=boy&heightCm=90&weightKg=13' },
    { value: 'Девочка 2 года, 88см, 12кг', url: '/kalkulyator-rosta-rebenka?ageMonths=24&gender=girl&heightCm=88&weightKg=12' },
    { value: 'Мальчик 5 лет, 110см, 18кг', url: '/kalkulyator-rosta-rebenka?ageMonths=60&gender=boy&heightCm=110&weightKg=18' },
    { value: 'Девочка 5 лет, 108см, 17кг', url: '/kalkulyator-rosta-rebenka?ageMonths=60&gender=girl&heightCm=108&weightKg=17' }
  ]
}

export const nicheCalculators: Calculator[] = [
  chessClockCalculator,
  morseCodeCalculator,
  colorModelConverter,
  timezoneConverter,
  childGrowthCalculator
]
