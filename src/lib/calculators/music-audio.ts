import { Calculator } from '../types';

// Калькулятор BPM (темпа)
export const bpmCalculator: Calculator = {
  id: 'bpm',
  slug: 'bpm-temp',
  title: 'BPM (удары в минуту)',
  description: 'Определение темпа музыки и расчёт задержек/частот для эффектов',
  category: 'hobbi',
  subcategory: 'hobbi-music',
  type: 'formula',
  inputs: [
    {
      name: 'bpm',
      label: 'BPM (удары в минуту)',
      type: 'number',
      placeholder: '120',
      defaultValue: 120
    }
  ],
  outputs: [
    { name: 'beatDuration', label: 'Длительность четверти (мс)', type: 'number' },
    { name: 'eighthNote', label: 'Восьмая нота (мс)', type: 'number' },
    { name: 'sixteenthNote', label: 'Шестнадцатая (мс)', type: 'number' },
    { name: 'delayTime', label: 'Delay 1/4 (мс)', type: 'number' },
    { name: 'frequency', label: 'Частота (Hz)', type: 'number' }
  ],
  calculate: (inputs) => {
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
  content: {
    howTo: 'Введите BPM (темп музыки). Калькулятор рассчитает длительности нот и рекомендуемые значения для эффектов.',
    about: 'BPM (Beats Per Minute) - количество ударов в минуту. Стандартные темпы: 60-80 (медленно), 90-110 (средне), 120-140 (быстро), 160+ (очень быстро).',
    formula: 'Длительность четверти (мс) = 60000 / BPM',
    usage: 'Используется для настройки delay, reverb и других временных эффектов в музыкальных редакторах.',
    faq: [
      {
        question: 'Какой BPM для определенных жанров?',
        answer: 'Ballad: 60-70, Pop: 100-130, House: 120-130, Techno: 130-150, Drum and Bass: 160-180.'
      }
    ],
    sources: [
      { title: 'BPM', url: 'https://en.wikipedia.org/wiki/Beats_per_minute' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор тюнинга гитары
export const guitarTuningCalculator: Calculator = {
  id: 'guitar-tuning',
  slug: 'nastrojka-gitary',
  title: 'Частоты струн гитары',
  description: 'Частоты нот для стандартного и альтернативных строев гитары',
  category: 'hobbi',
  subcategory: 'hobbi-music',
  type: 'reference',
  inputs: [
    {
      name: 'tuning',
      label: 'Строй',
      type: 'select',
      options: [
        { value: 'standard', label: 'Стандартный (E A D G B E)' },
        { value: 'drop_d', label: 'Drop D (D A D G B E)' },
        { value: 'half_step', label: 'Полтона вниз (D# G# C# F# A# D#)' },
        { value: 'open_g', label: 'Open G (D G D G B D)' },
        { value: 'dadgad', label: 'DADGAD (D A D G A D)' },
        { value: 'open_e', label: 'Open E (E B E G# B E)' }
      ],
      defaultValue: 'standard'
    }
  ],
  outputs: [
    { name: 'string1', label: '1-я струна (тонкая)', type: 'text' },
    { name: 'string2', label: '2-я струна', type: 'text' },
    { name: 'string3', label: '3-я струна', type: 'text' },
    { name: 'string4', label: '4-я струна', type: 'text' },
    { name: 'string5', label: '5-я струна', type: 'text' },
    { name: 'string6', label: '6-я струна (толстая)', type: 'text' }
  ],
  calculate: (inputs) => {
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
  content: {
    howTo: 'Выберите строй гитары. Калькулятор покажет частоты для каждой струны.',
    about: 'Стандартный строй E A D G B E - основа для большинства музыки. Альтернативные строи используются для специфических жанров (Drop D для метала, Open G для слайд-гитары).',
    usage: 'Используйте для настройки гитары с помощью тюнера или приложения.',
    faq: [
      {
        question: 'Что такое Drop D?',
        answer: 'Строй, где 6-я струна настраивается на D вместо E. Популярен в метале для создания тяжёлых риффов.'
      }
    ],
    sources: [
      { title: 'Гитарный строй', url: 'https://ru.wikipedia.org/wiki/Строй_гитары' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор интервалов (частота нот)
export const noteFrequencyCalculator: Calculator = {
  id: 'note-frequency',
  slug: 'chastoty-not',
  title: 'Частоты нот',
  description: 'Расчёт частоты любой ноты в равномерно темперированном строе',
  category: 'hobbi',
  subcategory: 'hobbi-music',
  type: 'formula',
  inputs: [
    {
      name: 'note',
      label: 'Нота',
      type: 'select',
      options: [
        { value: 'C', label: 'C (До)' },
        { value: 'C#', label: 'C# / Db' },
        { value: 'D', label: 'D (Ре)' },
        { value: 'D#', label: 'D# / Eb' },
        { value: 'E', label: 'E (Ми)' },
        { value: 'F', label: 'F (Фа)' },
        { value: 'F#', label: 'F# / Gb' },
        { value: 'G', label: 'G (Соль)' },
        { value: 'G#', label: 'G# / Ab' },
        { value: 'A', label: 'A (Ля)' },
        { value: 'A#', label: 'A# / Bb' },
        { value: 'B', label: 'B (Си)' }
      ],
      defaultValue: 'A'
    },
    {
      name: 'octave',
      label: 'Октава',
      type: 'select',
      options: [
        { value: '0', label: '0 (субконтроктава)' },
        { value: '1', label: '1 (контроктава)' },
        { value: '2', label: '2 (большая октава)' },
        { value: '3', label: '3 (малая октава)' },
        { value: '4', label: '4 (первая октава)' },
        { value: '5', label: '5 (вторая октава)' },
        { value: '6', label: '6 (третья октава)' },
        { value: '7', label: '7 (четвёртая октава)' },
        { value: '8', label: '8 (пятая октава)' }
      ],
      defaultValue: '4'
    }
  ],
  outputs: [
    { name: 'frequency', label: 'Частота (Hz)', type: 'number' },
    { name: 'wavelength', label: 'Длина волны (м)', type: 'number' },
    { name: 'period', label: 'Период (мс)', type: 'number' }
  ],
  calculate: (inputs) => {
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
    
    // Wavelength (speed of sound ~343 m/s at 20°C)
    const speedOfSound = 343;
    const wavelength = speedOfSound / frequency;
    
    // Period in ms
    const period = (1 / frequency) * 1000;
    
    return [
      { value: Math.round(frequency * 100) / 100, label: 'Частота (Hz)' },
      { value: Math.round(wavelength * 100) / 100, label: 'Длина волны (м)' },
      { value: Math.round(period * 1000) / 1000, label: 'Период (мс)' }
    ];
  },
  content: {
    howTo: 'Выберите ноту и октаву. Калькулятор покажет её частоту в герцах.',
    about: 'Равномерно темперированный строй - система, где октава разделена на 12 равных частей (полутонов). Частота удваивается каждую октаву.',
    formula: 'f = 440 × 2^(n/12), где n - количество полутонов от A4',
    usage: 'Используется для настройки инструментов, расчёта частот для эквалайзера, настройки репетиционных помещений.',
    faq: [
      {
        question: 'Почему A4 = 440 Hz?',
        answer: 'Это международный стандарт, принятый в 1955 году. Раньше использовались другие стандарты (435, 442, 443 Hz).'
      }
    ],
    sources: [
      { title: 'Равномерно темперированный строй', url: 'https://ru.wikipedia.org/wiki/Равномерно-темперированный_строй' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор размера MP3 файла
export const audioFileSizeCalculator: Calculator = {
  id: 'audio-file-size',
  slug: 'razmer-audio',
  title: 'Размер аудиофайла',
  description: 'Расчёт размера аудиофайла в зависимости от битрейта и длительности',
  category: 'hobbi',
  subcategory: 'hobbi-music',
  type: 'formula',
  inputs: [
    {
      name: 'duration',
      label: 'Длительность (мин)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4
    },
    {
      name: 'bitrate',
      label: 'Битрейт (kbps)',
      type: 'select',
      options: [
        { value: '64', label: '64 kbps (голос)' },
        { value: '128', label: '128 kbps (стандарт)' },
        { value: '192', label: '192 kbps (хорошее качество)' },
        { value: '256', label: '256 kbps (высокое качество)' },
        { value: '320', label: '320 kbps (максимальное)' },
        { value: '1411', label: '1411 kbps (CD качество, WAV)' },
        { value: '2304', label: '2304 kbps (24-bit/96kHz)' }
      ],
      defaultValue: '192'
    }
  ],
  outputs: [
    { name: 'fileSizeMB', label: 'Размер файла (MB)', type: 'number' },
    { name: 'fileSizeKB', label: 'Размер файла (KB)', type: 'number' },
    { name: 'perMinute', label: 'MB за минуту', type: 'number' },
    { name: 'quality', label: 'Качество звука', type: 'text' }
  ],
  calculate: (inputs) => {
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
    } else if (bitrate < 160) {
      quality = 'Приемлемое для MP3';
    } else if (bitrate < 250) {
      quality = 'Хорошее качество';
    } else if (bitrate < 500) {
      quality = 'Отличное качество (прозрачное)';
    } else {
      quality = 'Профессиональное/студийное';
    }
    
    return [
      { value: Math.round(fileSizeMB * 100) / 100, label: 'Размер файла (MB)' },
      { value: Math.round(fileSizeKB), label: 'Размер файла (KB)' },
      { value: Math.round(perMinute * 100) / 100, label: 'MB за минуту' },
      { value: quality, label: 'Качество звука' }
    ];
  },
  content: {
    howTo: 'Введите длительность аудиозаписи в минутах и выберите битрейт.',
    about: 'Битрейт - количество битов, используемых для передачи/хранения аудио в секунду. Выше битрейт = лучше качество, но больше размер файла.',
    formula: 'Размер (KB) = (Битрейт × Длительность × 60) / 8',
    usage: 'Используется для планирования дискового пространства, выбора оптимального битрейта для кодирования.',
    faq: [
      {
        question: 'Какой битрейт выбрать для MP3?',
        answer: '192-256 kbps - оптимально для большинства случаев. 320 kbps - если важно максимальное качество. 128 kbps - если критичен размер файла.'
      }
    ],
    sources: [
      { title: 'MP3', url: 'https://ru.wikipedia.org/wiki/MP3' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор детюнинга (расстройки)
export const detuneCalculator: Calculator = {
  id: 'detune',
  slug: 'detune-rastrojka',
  title: 'Детюнинг (расстройка)',
  description: 'Расчёт расстройки в центах для создания эффектов хоруса и даббинга',
  category: 'hobbi',
  subcategory: 'hobbi-music',
  type: 'formula',
  inputs: [
    {
      name: 'baseFrequency',
      label: 'Базовая частота (Hz)',
      type: 'number',
      placeholder: '440',
      defaultValue: 440
    },
    {
      name: 'cents',
      label: 'Отклонение (центы)',
      type: 'number',
      placeholder: '10',
      defaultValue: 10
    }
  ],
  outputs: [
    { name: 'newFrequency', label: 'Новая частота (Hz)', type: 'number' },
    { name: 'hzDifference', label: 'Разница (Hz)', type: 'number' },
    { name: 'beatFrequency', label: 'Частота биений (Hz)', type: 'number' }
  ],
  calculate: (inputs) => {
    const baseFrequency = Number(inputs.baseFrequency);
    const cents = Number(inputs.cents);
    
    if (!baseFrequency || !cents) {
      return [
        { value: '—', label: 'Новая частота (Hz)' },
        { value: '—', label: 'Разница (Hz)' },
        { value: '—', label: 'Частота биений (Hz)' }
      ];
    }
    
    // 1 cent = 2^(1/1200)
    const newFrequency = baseFrequency * Math.pow(2, cents / 1200);
    const hzDifference = newFrequency - baseFrequency;
    const beatFrequency = Math.abs(hzDifference);
    
    return [
      { value: Math.round(newFrequency * 100) / 100, label: 'Новая частота (Hz)' },
      { value: Math.round(hzDifference * 100) / 100, label: 'Разница (Hz)' },
      { value: Math.round(beatFrequency * 100) / 100, label: 'Частота биений (Hz)' }
    ];
  },
  content: {
    howTo: 'Введите базовую частоту и отклонение в центах. Калькулятор покажет результирующую частоту.',
    about: 'Цент - логарифмическая единица измерения интервалов. 100 центов = 1 полутон, 1200 центов = октава.',
    formula: 'f₂ = f₁ × 2^(cents/1200)',
    usage: 'Используется для настройки детюнеров, хорусов, питч-шифтеров. 5-15 центов типично для эффекта хоруса.',
    faq: [
      {
        question: 'Сколько центов в полутоне?',
        answer: '100 центов = 1 полутон (semitone), 1200 центов = октава (12 полутонов).'
      }
    ],
    sources: [
      { title: 'Цент (музыка)', url: 'https://en.wikipedia.org/wiki/Cent_(music)' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор SPL (громкости)
export const splCalculator: Calculator = {
  id: 'spl',
  slug: 'uroven-zvuka',
  title: 'Уровень звукового давления (SPL)',
  description: 'Расчёт громкости звука в децибелах и безопасного времени прослушивания',
  category: 'hobbi',
  subcategory: 'hobbi-music',
  type: 'formula',
  inputs: [
    {
      name: 'spl',
      label: 'Уровень звука (dB SPL)',
      type: 'number',
      placeholder: '85',
      defaultValue: 85
    }
  ],
  outputs: [
    { name: 'safeTime', label: 'Безопасное время (часов)', type: 'number' },
    { name: 'perception', label: 'Восприятие', type: 'text' },
    { name: 'examples', label: 'Примеры', type: 'text' },
    { name: 'warning', label: 'Предупреждение', type: 'text' }
  ],
  calculate: (inputs) => {
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
    } else if (spl < 70) {
      perception = 'Нормальная речь';
    } else if (spl < 80) {
      perception = 'Громко';
    } else if (spl < 90) {
      perception = 'Очень громко';
    } else if (spl < 100) {
      perception = 'Неприятно громко';
    } else if (spl < 110) {
      perception = 'Болезненно громко';
    } else {
      perception = 'Опасно для слуха';
    }
    
    let examples = '';
    if (spl < 40) examples = 'Библиотека, спальня';
    else if (spl < 60) examples = 'Обычный офис, тихая музыка';
    else if (spl < 70) examples = 'Разговор, кондиционер';
    else if (spl < 80) examples = 'Шумный офис, дорожный трафик';
    else if (spl < 90) examples = 'Грузовик, мотоцикл, громкая музыка';
    else if (spl < 100) examples = 'Метро, рок-концерт';
    else if (spl < 110) examples = 'Рядом с барабанной установкой';
    else examples = 'Взлёт самолёта, выстрел';
    
    let warning = '';
    if (spl > 85) {
      warning = '⚠️ Риск повреждения слуха при длительном воздействии';
    } else if (spl > 100) {
      warning = '❌ Опасно! Используйте защиту слуха';
    } else {
      warning = '✅ Безопасный уровень';
    }
    
    return [
      { value: Math.round(safeTime * 10) / 10, label: 'Безопасное время (часов)' },
      { value: perception, label: 'Восприятие' },
      { value: examples, label: 'Примеры' },
      { value: warning, label: 'Предупреждение' }
    ];
  },
  content: {
    howTo: 'Введите уровень звука в dB SPL. Калькулятор покажет безопасное время прослушивания.',
    about: 'SPL (Sound Pressure Level) измеряется в децибелах. 85 dB - порог, выше которого начинается риск повреждения слуха при длительном воздействии.',
    formula: 'Безопасное время = 8 / 2^((SPL-85)/3) часов',
    usage: 'Используется для оценки риска для слуха на концертах, в наушниках, на производстве.',
    faq: [
      {
        question: 'Как долго можно слушать 85 dB?',
        answer: 'По стандарту NIOSH: 8 часов в день. Каждые +3 dB уменьшают безопасное время вдвое.'
      }
    ],
    sources: [
      { title: 'Децибел', url: 'https://ru.wikipedia.org/wiki/Децибел' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор микширования (баланс громкости)
export const mixingBalanceCalculator: Calculator = {
  id: 'mixing-balance',
  slug: 'miks-balanss',
  title: 'Баланс микса',
  description: 'Рекомендации по уровням громкости инструментов в миксе',
  category: 'hobbi',
  subcategory: 'hobbi-music',
  type: 'reference',
  inputs: [
    {
      name: 'genre',
      label: 'Жанр',
      type: 'select',
      options: [
        { value: 'pop', label: 'Pop' },
        { value: 'rock', label: 'Rock' },
        { value: 'electronic', label: 'Electronic' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'classical', label: 'Classical' }
      ],
      defaultValue: 'pop'
    }
  ],
  outputs: [
    { name: 'kick', label: 'Бочка (Kick)', type: 'text' },
    { name: 'snare', label: 'Малый барабан', type: 'text' },
    { name: 'bass', label: 'Бас-гитара', type: 'text' },
    { name: 'vocals', label: 'Вокал', type: 'text' },
    { name: 'guitars', label: 'Гитары', type: 'text' },
    { name: 'keyboards', label: 'Клавишные', type: 'text' },
    { name: 'reverb', label: 'Реверберация', type: 'text' }
  ],
  calculate: (inputs) => {
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
  content: {
    howTo: 'Выберите жанр музыки. Калькулятор покажет типичные уровни громкости для каждого инструмента.',
    about: 'Баланс микса - искусство распределения громкости инструментов. Каждый жанр имеет свои традиции и ожидания слушателей.',
    usage: 'Используется как отправная точка для микширования. Всегда применяйте на слух!',
    faq: [
      {
        question: 'Почему бочка на 0 dB?',
        answer: 'Бочка часто служит референсом для микса. Остальные инструменты балансируются относительно неё.'
      }
    ],
    sources: [
      { title: 'Микширование музыки', url: 'https://en.wikipedia.org/wiki/Audio_mixing_(recorded_music)' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Калькулятор громкости LUFS
export const lufsCalculator: Calculator = {
  id: 'lufs',
  slug: 'gromkost-lufs',
  title: 'Нормализация громкости (LUFS)',
  description: 'Проверка соответствия стандартам громкости для стриминговых платформ',
  category: 'hobbi',
  subcategory: 'hobbi-music',
  type: 'reference',
  inputs: [
    {
      name: 'platform',
      label: 'Платформа',
      type: 'select',
      options: [
        { value: 'spotify', label: 'Spotify' },
        { value: 'apple', label: 'Apple Music' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'tidal', label: 'Tidal' },
        { value: 'amazon', label: 'Amazon Music' },
        { value: 'cd', label: 'CD (Red Book)' },
        { value: 'broadcast', label: 'ТВ/Радио (EBU R128)' }
      ],
      defaultValue: 'spotify'
    },
    {
      name: 'currentLufs',
      label: 'Текущая громкость (LUFS)',
      type: 'number',
      placeholder: '-8',
      defaultValue: -8
    }
  ],
  outputs: [
    { name: 'target', label: 'Целевой уровень (LUFS)', type: 'text' },
    { name: 'adjustment', label: 'Корректировка', type: 'text' },
    { name: 'peakLevel', label: 'True Peak (dBTP)', type: 'text' }
  ],
  calculate: (inputs) => {
    const platform = String(inputs.platform);
    const currentLufs = Number(inputs.currentLufs);
    
    const standards: Record<string, { target: string; peak: string }> = {
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
    
    // Parse target LUFS
    const targetMatch = standard.target.match(/-?\d+/);
    const targetLufs = targetMatch ? parseInt(targetMatch[0]) : -14;
    
    const difference = currentLufs - targetLufs;
    let adjustment = '';
    
    if (Math.abs(difference) < 1) {
      adjustment = '✅ Громкость оптимальна';
    } else if (difference > 0) {
      adjustment = `⬇️ Нужно уменьшить на ${Math.round(difference)} LUFS`;
    } else {
      adjustment = `⬆️ Можно увеличить на ${Math.round(Math.abs(difference))} LUFS`;
    }
    
    return [
      { value: standard.target, label: 'Целевой уровень (LUFS)' },
      { value: adjustment, label: 'Корректировка' },
      { value: standard.peak, label: 'True Peak (dBTP)' }
    ];
  },
  content: {
    howTo: 'Выберите платформу для публикации и укажите текущую громкость вашего трека в LUFS.',
    about: 'LUFS (Loudness Units Full Scale) - стандарт измерения громкости. Стриминговые платформы нормализуют треки к своему целевому уровню.',
    usage: 'Используется для мастеринга. Мастерьте под целевой уровень платформы, чтобы избежать автоматической нормализации.',
    faq: [
      {
        question: 'Что такое True Peak?',
        answer: 'True Peak - пиковый уровень сигнала после цифро-аналогового преобразования. Не должен превышать -1 dBTP для предотвращения клиппинга.'
      }
    ],
    sources: [
      { title: 'LUFS', url: 'https://en.wikipedia.org/wiki/LKFS' }
    ],
    updatedAt: '2026-04-08'
  }
};

// Экспорт всех калькуляторов
export const musicAudioCalculators: Calculator[] = [
  bpmCalculator,
  guitarTuningCalculator,
  noteFrequencyCalculator,
  audioFileSizeCalculator,
  detuneCalculator,
  splCalculator,
  mixingBalanceCalculator,
  lufsCalculator,
];
