import { Calculator } from '../types'

// 1. Калькулятор шагов и расстояния
export const stepsToDistanceCalculator: Calculator = {
  id: 'steps-to-distance',
  slug: 'shagi-v-kilometry',
  title: 'Калькулятор шагов и расстояния',
  description: 'Переводит количество шагов в километры и мили с учётом роста и длины шага',
  category: 'zdorove-i-krasota',
  subcategory: 'sport-i-aktivnost',
  type: 'formula',
  inputs: [
    {
      name: 'steps',
      label: 'Количество шагов',
      type: 'number',
      placeholder: '10000',
      min: 1,
      defaultValue: 10000,
    },
    {
      name: 'height',
      label: 'Рост (см)',
      type: 'number',
      placeholder: '170',
      min: 100,
      max: 220,
      defaultValue: 170,
    },
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: [
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' },
      ],
      defaultValue: 'male',
    },
  ],
  outputs: [
    { name: 'stepLength', label: 'Длина шага', type: 'number', unit: 'см' },
    { name: 'distanceKm', label: 'Расстояние', type: 'number', unit: 'км' },
    { name: 'distanceMiles', label: 'Расстояние', type: 'number', unit: 'миль' },
    { name: 'calories', label: 'Примерные калории', type: 'number', unit: 'ккал' },
    { name: 'timeMinutes', label: 'Примерное время', type: 'number', unit: 'мин' },
  ],
  calculate: (inputs) => {
    const steps = Number(inputs.steps) || 0
    const height = Number(inputs.height) || 170
    const gender = String(inputs.gender)

    if (!steps) {
      return [
        { value: '—', label: 'Длина шага', unit: 'см' },
        { value: '—', label: 'Расстояние', unit: 'км' },
        { value: '—', label: 'Расстояние', unit: 'миль' },
        { value: '—', label: 'Примерные калории', unit: 'ккал' },
        { value: '—', label: 'Примерное время', unit: 'мин' },
      ]
    }

    const stepLength = gender === 'female'
      ? height * 0.413
      : height * 0.415

    const distanceM = (steps * stepLength) / 100
    const distanceKm = distanceM / 1000
    const distanceMiles = distanceKm * 0.621371

    // Approximate calories: 0.04 kcal per step
    const calories = Math.round(steps * 0.04)

    // Approximate time at 100 steps per minute
    const timeMinutes = Math.round(steps / 100)

    return [
      { value: Number(stepLength.toFixed(1)), label: 'Длина шага', unit: 'см' },
      { value: Number(distanceKm.toFixed(2)), label: 'Расстояние', unit: 'км' },
      { value: Number(distanceMiles.toFixed(2)), label: 'Расстояние', unit: 'миль' },
      { value: calories, label: 'Примерные калории', unit: 'ккал' },
      { value: timeMinutes, label: 'Примерное время', unit: 'мин' },
    ]
  },
  content: {
    howTo: 'Введите количество шагов, свой рост и пол. Калькулятор рассчитает длину шага, пройденное расстояние в километрах и милях, а также примерные затраты калорий и время ходьбы.',
    about: 'Длина шага зависит от роста и пола: у мужчин обычно чуть длиннее. Средний шаг взрослого человека — 60–80 см. 10 000 шагов ≈ 6–8 км.',
    formula: 'Длина шага = Рост × 0,415 (муж) / 0,413 (жен)\nРасстояние = Шаги × Длина шага / 100 000 (км)',
    faq: [
      {
        question: 'Сколько шагов в 1 км?',
        answer: 'При росте 170 см ≈ 1400–1500 шагов. Чем выше рост, тем меньше шагов на километр.'
      },
      {
        question: 'Сколько калорий сжигается при ходьбе?',
        answer: 'Примерно 0,04 ккал на шаг или 250–400 ккал на 10 000 шагов, в зависимости от веса и скорости.'
      }
    ],
    sources: [
      { title: 'Шагомер — Википедия', url: 'https://ru.wikipedia.org/wiki/Шагомер' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: '10 000 шагов при росте 170 см', url: '/shagi-v-kilometry?steps=10000&height=170&gender=male' },
    { value: '5 000 шагов при росте 160 см', url: '/shagi-v-kilometry?steps=5000&height=160&gender=female' },
    { value: '15 000 шагов при росте 180 см', url: '/shagi-v-kilometry?steps=15000&height=180&gender=male' }
  ]
}

// 2. Калькулятор циклов сна
export const sleepCyclesCalculator: Calculator = {
  id: 'sleep-cycles',
  slug: 'tsikly-sna',
  title: 'Калькулятор циклов сна',
  description: 'Рассчитывает оптимальное время пробуждения от заданного времени засыпания по 90-минутным циклам',
  category: 'zdorove-i-krasota',
  subcategory: 'zdorove-raznoe',
  type: 'formula',
  inputs: [
    {
      name: 'bedtime',
      label: 'Время засыпания',
      type: 'text',
      placeholder: '23:00',
      defaultValue: '23:00'
    },
    {
      name: 'fallAsleepMinutes',
      label: 'Время на засыпание (мин)',
      type: 'number',
      placeholder: '15',
      min: 0,
      max: 60,
      defaultValue: 15
    }
  ],
  outputs: [
    { name: 'wakeTime4', label: '4 цикла (6 ч) — минимум', type: 'text' },
    { name: 'wakeTime5', label: '5 циклов (7,5 ч) — норма', type: 'text' },
    { name: 'wakeTime6', label: '6 циклов (9 ч) — оптимум', type: 'text' },
    { name: 'wakeTime7', label: '7 циклов (10,5 ч) — много', type: 'text' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const bedtimeStr = String(inputs.bedtime || '23:00')
    const fallAsleep = Number(inputs.fallAsleepMinutes) || 15

    const [hours, minutes] = bedtimeStr.split(':').map(Number)
    const bedtimeMinutes = (hours || 0) * 60 + (minutes || 0)
    const sleepStart = bedtimeMinutes + fallAsleep

    const formatTime = (totalMinutes: number) => {
      const h = Math.floor(totalMinutes / 60) % 24
      const m = Math.floor(totalMinutes % 60)
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    }

    const cycles = [4, 5, 6, 7]
    const results = cycles.map(c => {
      const wakeMinutes = sleepStart + c * 90
      return formatTime(wakeMinutes)
    })

    return [
      { value: results[0], label: '4 цикла (6 ч) — минимум' },
      { value: results[1], label: '5 циклов (7,5 ч) — норма' },
      { value: results[2], label: '6 циклов (9 ч) — оптимум' },
      { value: results[3], label: '7 циклов (10,5 ч) — много' },
      { value: 'Для большинства взрослых оптимально 5–6 циклов (7,5–9 часов). Пробуждение в конце цикла помогает чувствовать себя бодрее.', label: 'Рекомендация' }
    ]
  },
  content: {
    howTo: 'Введите время, когда вы планируете лечь спать, и сколько минут обычно требуется на засыпание. Калькулятор покажет лучшие время пробуждения по циклам сна.',
    about: 'Человеческий сон состоит из циклов по ~90 минут. Пробуждение в середине цикла вызывает сонливость. Пробуждение между циклами — бодрость.',
    formula: 'Время пробуждения = Время засыпания + Время на засыпание + N × 90 мин',
    faq: [
      {
        question: 'Почему именно 90 минут?',
        answer: 'Средний цикл сна включает фазы: засыпание, поверхностный сон, глубокий сон и БДС (быстрый). Полный цикл занимает 80–100 минут, среднее — 90.'
      },
      {
        question: 'Что делать, если проснулся посреди цикла?',
        answer: 'Лучше встать сразу, если осталось менее 20 минут до конца цикла. Иначе попытайтесь уснуть заново.'
      }
    ],
    sources: [
      { title: 'Сон — Википедия', url: 'https://ru.wikipedia.org/wiki/Сон' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Лечь в 23:00, засыпать 15 мин', url: '/tsikly-sna?bedtime=23:00&fallAsleepMinutes=15' },
    { value: 'Лечь в 22:30, засыпать 10 мин', url: '/tsikly-sna?bedtime=22:30&fallAsleepMinutes=10' },
    { value: 'Лечь в 00:00, засыпать 20 мин', url: '/tsikly-sna?bedtime=00:00&fallAsleepMinutes=20' }
  ]
}

// 3. Калькулятор воды/гидратации
export const waterIntakeCalculator: Calculator = {
  id: 'water-intake',
  slug: 'norma-vody',
  title: 'Калькулятор воды и гидратации',
  description: 'Рассчитывает дневную норму воды по весу, активности и климату',
  category: 'zdorove-i-krasota',
  subcategory: 'pitanie-i-ves',
  type: 'formula',
  inputs: [
    {
      name: 'weight',
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      min: 20,
      max: 200,
      defaultValue: 70
    },
    {
      name: 'activity',
      label: 'Уровень активности',
      type: 'select',
      options: [
        { value: 'low', label: 'Низкий (сидячий образ)' },
        { value: 'moderate', label: 'Средний (лёгкая активность)' },
        { value: 'high', label: 'Высокий (спорт 3–5 раз/нед)' },
        { value: 'very_high', label: 'Очень высокий (ежедневный спорт)' }
      ],
      defaultValue: 'moderate'
    },
    {
      name: 'climate',
      label: 'Климат',
      type: 'select',
      options: [
        { value: 'cold', label: 'Холодный / умеренный' },
        { value: 'warm', label: 'Тёплый' },
        { value: 'hot', label: 'Жаркий / влажный' }
      ],
      defaultValue: 'cold'
    }
  ],
  outputs: [
    { name: 'baseWater', label: 'Базовая норма', type: 'number', unit: 'мл' },
    { name: 'totalWater', label: 'Рекомендуемая норма', type: 'number', unit: 'мл' },
    { name: 'glasses', label: 'Стаканов (250 мл)', type: 'number', unit: 'шт' },
    { name: 'perMeal', label: 'На приём пищи', type: 'text' }
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weight) || 0
    const activity = String(inputs.activity)
    const climate = String(inputs.climate)

    if (!weight) {
      return [
        { value: '—', label: 'Базовая норма', unit: 'мл' },
        { value: '—', label: 'Рекомендуемая норма', unit: 'мл' },
        { value: '—', label: 'Стаканов (250 мл)', unit: 'шт' },
        { value: '—', label: 'На приём пищи' }
      ]
    }

    const baseWater = weight * 35

    const activityMultipliers: Record<string, number> = {
      low: 1,
      moderate: 1.2,
      high: 1.5,
      very_high: 1.8
    }

    const climateMultipliers: Record<string, number> = {
      cold: 1,
      warm: 1.1,
      hot: 1.2
    }

    const totalWater = Math.round(baseWater * activityMultipliers[activity] * climateMultipliers[climate])
    const glasses = Math.ceil(totalWater / 250)
    const perMeal = `${Math.round(totalWater / 5)} мл за раз (при 5 приёмах пищи)`

    return [
      { value: Math.round(baseWater), label: 'Базовая норма', unit: 'мл' },
      { value: totalWater, label: 'Рекомендуемая норма', unit: 'мл' },
      { value: glasses, label: 'Стаканов (250 мл)', unit: 'шт' },
      { value: perMeal, label: 'На приём пищи' }
    ]
  },
  content: {
    howTo: 'Введите свой вес, уровень физической активности и климат. Калькулятор рассчитает рекомендуемое количество воды в день и покажет, сколько это стаканов.',
    about: 'Базовая формула: 35 мл на 1 кг веса. Активность и жаркий климат увеличивают потребность. Около 20% воды поступает с едой.',
    formula: 'Норма = Вес × 35 мл × Коэффициент активности × Коэффициент климата',
    faq: [
      {
        question: 'Можно ли пить слишком много воды?',
        answer: 'Да, гипергидратация возможна при >1 литра в час. Норма — равномерно в течение дня.'
      },
      {
        question: 'Считается ли чай и кофе?',
        answer: 'Частично, но кофе и чай имеют мочегонный эффект. Чистая вода — лучший выбор.'
      }
    ],
    sources: [
      { title: 'Вода — Википедия', url: 'https://ru.wikipedia.org/wiki/Вода' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Вес 70 кг, средняя активность', url: '/norma-vody?weight=70&activity=moderate&climate=cold' },
    { value: 'Вес 55 кг, высокая активность', url: '/norma-vody?weight=55&activity=high&climate=warm' },
    { value: 'Вес 90 кг, сидячий образ', url: '/norma-vody?weight=90&activity=low&climate=cold' }
  ]
}

// 4. Калькулятор раствора/солёности
export const brineSaltCalculator: Calculator = {
  id: 'brine-salt',
  slug: 'rassol-sol',
  title: 'Калькулятор рассола и солёности',
  description: 'Расчёт количества соли и воды для рассола любой концентрации',
  category: 'kulinarnye-mery',
  subcategory: 'specii',
  type: 'formula',
  inputs: [
    {
      name: 'totalWeight',
      label: 'Общий вес рассола (г)',
      type: 'number',
      placeholder: '1000',
      min: 100,
      defaultValue: 1000
    },
    {
      name: 'salinity',
      label: 'Желаемая солёность (%)',
      type: 'number',
      placeholder: '3',
      min: 0.5,
      max: 20,
      step: 0.5,
      defaultValue: 3
    }
  ],
  outputs: [
    { name: 'saltNeeded', label: 'Соли нужно', type: 'number', unit: 'г' },
    { name: 'waterNeeded', label: 'Воды нужно', type: 'number', unit: 'мл' },
    { name: 'perLiter', label: 'На 1 литр рассола', type: 'text' },
    { name: 'usage', label: 'Применение', type: 'text' }
  ],
  calculate: (inputs) => {
    const totalWeight = Number(inputs.totalWeight) || 0
    const salinity = Number(inputs.salinity) || 0

    if (!totalWeight || !salinity) {
      return [
        { value: '—', label: 'Соли нужно', unit: 'г' },
        { value: '—', label: 'Воды нужно', unit: 'мл' },
        { value: '—', label: 'На 1 литр рассола' },
        { value: '—', label: 'Применение' }
      ]
    }

    const saltNeeded = (totalWeight * salinity) / 100
    const waterNeeded = totalWeight - saltNeeded

    let usage = ''
    if (salinity < 2) usage = 'Очень слабый рассол — для овощей, быстрых маринадов'
    else if (salinity < 4) usage = 'Слабый рассол — для огурцов на зиму, капусты'
    else if (salinity < 6) usage = 'Средний рассол — для помидоров, грибов'
    else if (salinity < 8) usage = 'Крепкий рассол — для рыбы, сала, мяса'
    else usage = 'Очень крепкий — для долгого хранения'

    return [
      { value: Number(saltNeeded.toFixed(1)), label: 'Соли нужно', unit: 'г' },
      { value: Number(waterNeeded.toFixed(1)), label: 'Воды нужно', unit: 'мл' },
      { value: `${(saltNeeded / totalWeight * 1000).toFixed(1)} г соли на 1 л`, label: 'На 1 литр рассола' },
      { value: usage, label: 'Применение' }
    ]
  },
  content: {
    howTo: 'Введите нужный общий вес рассола и желаемую солёность в процентах. Калькулятор рассчитает, сколько соли и воды смешать.',
    about: 'Солёность рассола измеряется в процентах массы соли от общей массы раствора. Классический рассол для огурцов — 3–4%, для рыбы — 5–8%.',
    formula: 'Соль = Общий вес × Солёность / 100\nВода = Общий вес − Соль',
    faq: [
      {
        question: 'Сколько соли на литр воды для 3% рассола?',
        answer: 'На 1 литр рассола 3% = 30 г соли + 970 мл воды. Важно: процент от общей массы, не от массы воды.'
      },
      {
        question: 'Можно ли использовать йодированную соль?',
        answer: 'Не рекомендуется для консервации — йод может дать неприятный привкус и ускорить помутнение.'
      }
    ],
    sources: [
      { title: 'Рассол — Википедия', url: 'https://ru.wikipedia.org/wiki/Рассол' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: '1 литр рассола 3%', url: '/rassol-sol?totalWeight=1000&salinity=3' },
    { value: '2 литра рассола 5%', url: '/rassol-sol?totalWeight=2000&salinity=5' },
    { value: '1,5 литра рассола 8%', url: '/rassol-sol?totalWeight=1500&salinity=8' }
  ]
}

// 5. Калькулятор GPA
export const gpaCalculator: Calculator = {
  id: 'gpa-calculator',
  slug: 'srednij-ball-gpa',
  title: 'Калькулятор GPA',
  description: 'Расчёт среднего балла по шкалам 5, 10, 12 и 100 баллов с переводом между ними',
  category: 'nauka-i-ucheba',
  subcategory: 'matematicheskie',
  type: 'formula',
  inputs: [
    {
      name: 'scale',
      label: 'Шкала оценок',
      type: 'select',
      options: [
        { value: '5', label: '5-балльная' },
        { value: '10', label: '10-балльная' },
        { value: '12', label: '12-балльная' },
        { value: '100', label: '100-балльная' }
      ],
      defaultValue: '5'
    },
    {
      name: 'grades',
      label: 'Оценки (через запятую)',
      type: 'text',
      placeholder: '4,5,5,3,4',
      defaultValue: '4,5,5,3,4'
    }
  ],
  outputs: [
    { name: 'average', label: 'Средний балл', type: 'number' },
    { name: 'scale5', label: 'Перевод в 5-балльную', type: 'number' },
    { name: 'scale10', label: 'Перевод в 10-балльную', type: 'number' },
    { name: 'scale12', label: 'Перевод в 12-балльную', type: 'number' },
    { name: 'scale100', label: 'Перевод в 100-балльную', type: 'number' },
    { name: 'letterGrade', label: 'Буквенная оценка', type: 'text' }
  ],
  calculate: (inputs) => {
    const scale = Number(inputs.scale) || 5
    const gradesStr = String(inputs.grades || '')
    const grades = gradesStr.split(',').map(g => Number(g.trim())).filter(g => !isNaN(g) && g > 0)

    if (!grades.length) {
      return [
        { value: '—', label: 'Средний балл' },
        { value: '—', label: 'Перевод в 5-балльную' },
        { value: '—', label: 'Перевод в 10-балльную' },
        { value: '—', label: 'Перевод в 12-балльную' },
        { value: '—', label: 'Перевод в 100-балльную' },
        { value: '—', label: 'Буквенная оценка' }
      ]
    }

    const average = grades.reduce((a, b) => a + b, 0) / grades.length
    const normalized = average / scale

    const scale5 = normalized * 5
    const scale10 = normalized * 10
    const scale12 = normalized * 12
    const scale100 = normalized * 100

    let letterGrade = ''
    if (normalized >= 0.9) letterGrade = 'A (отлично)'
    else if (normalized >= 0.8) letterGrade = 'B (хорошо)'
    else if (normalized >= 0.7) letterGrade = 'C (удовлетворительно)'
    else if (normalized >= 0.6) letterGrade = 'D (слабо)'
    else letterGrade = 'F (неудовлетворительно)'

    return [
      { value: Number(average.toFixed(2)), label: 'Средний балл' },
      { value: Number(scale5.toFixed(2)), label: 'Перевод в 5-балльную' },
      { value: Number(scale10.toFixed(2)), label: 'Перевод в 10-балльную' },
      { value: Number(scale12.toFixed(2)), label: 'Перевод в 12-балльную' },
      { value: Number(scale100.toFixed(1)), label: 'Перевод в 100-балльную' },
      { value: letterGrade, label: 'Буквенная оценка' }
    ]
  },
  content: {
    howTo: 'Выберите шкалу оценок и введите оценки через запятую. Калькулятор рассчитает средний балл и переведёт его в другие шкалы.',
    about: 'GPA (Grade Point Average) — средний балл, важный для поступления в зарубежные вузы и некоторые российские программы.',
    formula: 'Средний балл = Сумма оценок / Количество оценок\nНормализованный = Средний / Макс шкалы\nПеревод = Нормализованный × Целевая шкала',
    faq: [
      {
        question: 'Как перевести 5-балльную в 100-балльную?',
        answer: 'Средний балл делится на 5 и умножается на 100. Например, 4,5 по 5-балльной = 90 по 100-балльной.'
      },
      {
        question: 'Что такое GPA 4.0?',
        answer: 'Американская шкала: A=4, B=3, C=2, D=1, F=0. GPA 4.0 — максимум, все оценки A.'
      }
    ],
    sources: [
      { title: 'GPA — Википедия', url: 'https://ru.wikipedia.org/wiki/Grade_Point_Average' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Оценки 4,5,5,3,4 (5-балльная)', url: '/srednij-ball-gpa?scale=5&grades=4,5,5,3,4' },
    { value: 'Оценки 8,9,7,10 (10-балльная)', url: '/srednij-ball-gpa?scale=10&grades=8,9,7,10' },
    { value: 'Оценки 10,11,9,12 (12-балльная)', url: '/srednij-ball-gpa?scale=12&grades=10,11,9,12' }
  ]
}

// 6. Калькулятор обоев
export const wallpaperCalculator: Calculator = {
  id: 'wallpaper-calculator',
  slug: 'oboi-kalkulyator',
  title: 'Калькулятор обоев',
  description: 'Расчёт количества рулонов обоев по площади стен с учётом рисунка и запаса',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'perimeter',
      label: 'Периметр комнаты (м)',
      type: 'number',
      placeholder: '16',
      min: 1,
      defaultValue: 16
    },
    {
      name: 'height',
      label: 'Высота потолков (м)',
      type: 'number',
      placeholder: '2.7',
      min: 1,
      max: 5,
      step: 0.1,
      defaultValue: 2.7
    },
    {
      name: 'rollWidth',
      label: 'Ширина рулона (м)',
      type: 'select',
      options: [
        { value: '0.53', label: '53 см (стандарт)' },
        { value: '1.06', label: '106 см (флизелин)' }
      ],
      defaultValue: '0.53'
    },
    {
      name: 'rollLength',
      label: 'Длина рулона (м)',
      type: 'select',
      options: [
        { value: '10', label: '10 м' },
        { value: '15', label: '15 м' },
        { value: '25', label: '25 м' }
      ],
      defaultValue: '10'
    },
    {
      name: 'patternRepeat',
      label: 'Раппорт рисунка (см)',
      type: 'number',
      placeholder: '0',
      min: 0,
      max: 100,
      defaultValue: 0
    }
  ],
  outputs: [
    { name: 'wallArea', label: 'Площадь стен', type: 'number', unit: 'м²' },
    { name: 'stripsPerRoll', label: 'Полос из рулона', type: 'number', unit: 'шт' },
    { name: 'totalStrips', label: 'Всего полос', type: 'number', unit: 'шт' },
    { name: 'rollsNeeded', label: 'Рулонов нужно', type: 'number', unit: 'шт' },
    { name: 'reserve', label: 'С запасом (+10%)', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const perimeter = Number(inputs.perimeter) || 0
    const height = Number(inputs.height) || 0
    const rollWidth = Number(inputs.rollWidth) || 0.53
    const rollLength = Number(inputs.rollLength) || 10
    const patternRepeat = Number(inputs.patternRepeat) || 0

    if (!perimeter || !height) {
      return [
        { value: '—', label: 'Площадь стен', unit: 'м²' },
        { value: '—', label: 'Полос из рулона', unit: 'шт' },
        { value: '—', label: 'Всего полос', unit: 'шт' },
        { value: '—', label: 'Рулонов нужно', unit: 'шт' },
        { value: '—', label: 'С запасом (+10%)', unit: 'шт' }
      ]
    }

    const wallArea = perimeter * height
    const totalStrips = Math.ceil(perimeter / rollWidth)

    // Account for pattern repeat
    let effectiveStripHeight = height
    if (patternRepeat > 0) {
      effectiveStripHeight = height + (patternRepeat / 100)
    }

    const stripsPerRoll = Math.floor(rollLength / effectiveStripHeight)
    const rollsNeeded = Math.ceil(totalStrips / stripsPerRoll)
    const reserve = Math.ceil(rollsNeeded * 1.1)

    return [
      { value: Number(wallArea.toFixed(1)), label: 'Площадь стен', unit: 'м²' },
      { value: stripsPerRoll, label: 'Полос из рулона', unit: 'шт' },
      { value: totalStrips, label: 'Всего полос', unit: 'шт' },
      { value: rollsNeeded, label: 'Рулонов нужно', unit: 'шт' },
      { value: reserve, label: 'С запасом (+10%)', unit: 'шт' }
    ]
  },
  content: {
    howTo: 'Введите периметр комнаты, высоту потолков, параметры рулонов и раппорт рисунка (если есть). Калькулятор подсчитает нужное количество рулонов.',
    about: 'При покупке обоев важно учитывать раппорт — расстояние между повторяющимися элементами рисунка. Он увеличивает расход на 5–15%.',
    formula: 'Полос = Периметр / Ширина рулона\nПолос из рулона = Длина рулона / (Высота + Раппорт)\nРулоны = Полос / Полос из рулона',
    faq: [
      {
        question: 'Сколько рулонов на комнату 16 м²?',
        answer: 'Зависит от периметра и высоты. Для комнаты 4×4 м с потолком 2,7 м — около 5–6 рулонов шириной 53 см.'
      },
      {
        question: 'Что такое раппорт?',
        answer: 'Раппорт — расстояние между повторяющимися элементами рисунка. Требует сдвига полос, что увеличивает расход обоев.'
      }
    ],
    sources: [
      { title: 'Обои — Википедия', url: 'https://ru.wikipedia.org/wiki/Обои' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Комната 16 м периметр, потолок 2,7 м', url: '/oboi-kalkulyator?perimeter=16&height=2.7&rollWidth=0.53&rollLength=10&patternRepeat=0' },
    { value: 'Комната 20 м, потолок 3 м, раппорт 32 см', url: '/oboi-kalkulyator?perimeter=20&height=3&rollWidth=0.53&rollLength=10&patternRepeat=32' }
  ]
}

// 7. Калькулятор плитки
export const tileCalculator: Calculator = {
  id: 'tile-calculator',
  slug: 'plitka-kalkulyator',
  title: 'Калькулятор плитки',
  description: 'Расчёт количества плитки для пола и стен с учётом запаса и раскладки',
  category: 'stroitelstvo-i-remont',
  subcategory: 'pokrytiya',
  type: 'formula',
  inputs: [
    {
      name: 'area',
      label: 'Площадь поверхности (м²)',
      type: 'number',
      placeholder: '12',
      min: 0.1,
      step: 0.1,
      defaultValue: 12
    },
    {
      name: 'tileWidth',
      label: 'Ширина плитки (см)',
      type: 'number',
      placeholder: '30',
      min: 1,
      defaultValue: 30
    },
    {
      name: 'tileHeight',
      label: 'Высота плитки (см)',
      type: 'number',
      placeholder: '30',
      min: 1,
      defaultValue: 30
    },
    {
      name: 'reservePercent',
      label: 'Запас (%)',
      type: 'select',
      options: [
        { value: '5', label: '5% — прямая укладка' },
        { value: '10', label: '10% — диагональ' },
        { value: '15', label: '15% — сложная раскладка' }
      ],
      defaultValue: '10'
    }
  ],
  outputs: [
    { name: 'tileArea', label: 'Площадь одной плитки', type: 'number', unit: 'м²' },
    { name: 'tilesNeeded', label: 'Плиток без запаса', type: 'number', unit: 'шт' },
    { name: 'tilesWithReserve', label: 'Плиток с запасом', type: 'number', unit: 'шт' },
    { name: 'squareMeters', label: 'Квадратных метров с запасом', type: 'number', unit: 'м²' },
    { name: 'packages', label: 'Упаковок (если по 1,5 м²)', type: 'number', unit: 'шт' }
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area) || 0
    const tileWidth = Number(inputs.tileWidth) || 0
    const tileHeight = Number(inputs.tileHeight) || 0
    const reservePercent = Number(inputs.reservePercent) || 10

    if (!area || !tileWidth || !tileHeight) {
      return [
        { value: '—', label: 'Площадь одной плитки', unit: 'м²' },
        { value: '—', label: 'Плиток без запаса', unit: 'шт' },
        { value: '—', label: 'Плиток с запасом', unit: 'шт' },
        { value: '—', label: 'Квадратных метров с запасом', unit: 'м²' },
        { value: '—', label: 'Упаковок (если по 1,5 м²)', unit: 'шт' }
      ]
    }

    const tileArea = (tileWidth * tileHeight) / 10000
    const tilesNeeded = Math.ceil(area / tileArea)
    const tilesWithReserve = Math.ceil(tilesNeeded * (1 + reservePercent / 100))
    const squareMeters = Number((tilesWithReserve * tileArea).toFixed(2))
    const packages = Math.ceil(squareMeters / 1.5)

    return [
      { value: Number(tileArea.toFixed(3)), label: 'Площадь одной плитки', unit: 'м²' },
      { value: tilesNeeded, label: 'Плиток без запаса', unit: 'шт' },
      { value: tilesWithReserve, label: 'Плиток с запасом', unit: 'шт' },
      { value: squareMeters, label: 'Квадратных метров с запасом', unit: 'м²' },
      { value: packages, label: 'Упаковок (если по 1,5 м²)', unit: 'шт' }
    ]
  },
  content: {
    howTo: 'Введите площадь поверхности, размеры плитки и выберите запас. Калькулятор рассчитает количество плиток с учётом раскладки.',
    about: 'Запас 10–15% необходим для подрезки, брака и будущих ремонтов. Диагональная укладка требует больше обрезков.',
    formula: 'Плиток = Площадь / (Ширина × Высота / 10 000)\nС запасом = Плиток × (1 + Запас / 100)',
    faq: [
      {
        question: 'Почему запас 10%, а не 5%?',
        answer: 'При диагональной или сложной раскладке обрезков больше. 10% — стандарт для большинства работ.'
      },
      {
        question: 'Сколько плитки на 1 м²?',
        answer: 'Плитка 30×30 см: ~11,1 шт/м². Плитка 20×20 см: 25 шт/м².'
      }
    ],
    sources: [
      { title: 'Керамическая плитка — Википедия', url: 'https://ru.wikipedia.org/wiki/Керамическая_плитка' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Ванная 8 м², плитка 30×30 см', url: '/plitka-kalkulyator?area=8&tileWidth=30&tileHeight=30&reservePercent=10' },
    { value: 'Кухня 12 м², плитка 60×60 см', url: '/plitka-kalkulyator?area=12&tileWidth=60&tileHeight=60&reservePercent=10' }
  ]
}

// 8. Калькулятор краски
export const paintCalculator: Calculator = {
  id: 'paint-calculator',
  slug: 'kraska-raskhod',
  title: 'Калькулятор расхода краски',
  description: 'Расчёт количества краски для стен и потолка по площади и расходу',
  category: 'stroitelstvo-i-remont',
  subcategory: 'otdelka',
  type: 'formula',
  inputs: [
    {
      name: 'wallArea',
      label: 'Площадь стен (м²)',
      type: 'number',
      placeholder: '40',
      min: 0,
      defaultValue: 40
    },
    {
      name: 'ceilingArea',
      label: 'Площадь потолка (м²)',
      type: 'number',
      placeholder: '16',
      min: 0,
      defaultValue: 16
    },
    {
      name: 'consumption',
      label: 'Расход краски (м²/л)',
      type: 'select',
      options: [
        { value: '8', label: '8 м²/л — густая (эмульсия)' },
        { value: '10', label: '10 м²/л — стандарт' },
        { value: '12', label: '12 м²/л — жидкая' },
        { value: '14', label: '14 м²/л — краска-грунт' }
      ],
      defaultValue: '10'
    },
    {
      name: 'coats',
      label: 'Количество слоёв',
      type: 'number',
      placeholder: '2',
      min: 1,
      max: 5,
      defaultValue: 2
    },
    {
      name: 'canVolume',
      label: 'Объём банки (л)',
      type: 'select',
      options: [
        { value: '0.9', label: '0,9 л' },
        { value: '2.5', label: '2,5 л' },
        { value: '5', label: '5 л' },
        { value: '10', label: '10 л' }
      ],
      defaultValue: '2.5'
    }
  ],
  outputs: [
    { name: 'totalArea', label: 'Общая площадь', type: 'number', unit: 'м²' },
    { name: 'litersNeeded', label: 'Литров краски', type: 'number', unit: 'л' },
    { name: 'cansNeeded', label: 'Банок нужно', type: 'number', unit: 'шт' },
    { name: 'wallPaint', label: 'На стены', type: 'number', unit: 'л' },
    { name: 'ceilingPaint', label: 'На потолок', type: 'number', unit: 'л' }
  ],
  calculate: (inputs) => {
    const wallArea = Number(inputs.wallArea) || 0
    const ceilingArea = Number(inputs.ceilingArea) || 0
    const consumption = Number(inputs.consumption) || 10
    const coats = Number(inputs.coats) || 2
    const canVolume = Number(inputs.canVolume) || 2.5

    const totalArea = (wallArea + ceilingArea) * coats
    const litersNeeded = totalArea / consumption
    const cansNeeded = Math.ceil(litersNeeded / canVolume)
    const wallPaint = (wallArea * coats) / consumption
    const ceilingPaint = (ceilingArea * coats) / consumption

    return [
      { value: totalArea, label: 'Общая площадь', unit: 'м²' },
      { value: Number(litersNeeded.toFixed(1)), label: 'Литров краски', unit: 'л' },
      { value: cansNeeded, label: 'Банок нужно', unit: 'шт' },
      { value: Number(wallPaint.toFixed(1)), label: 'На стены', unit: 'л' },
      { value: Number(ceilingPaint.toFixed(1)), label: 'На потолок', unit: 'л' }
    ]
  },
  content: {
    howTo: 'Введите площадь стен и потолка, выберите расход краски и количество слоёв. Калькулятор рассчитает необходимый объём и количество банок.',
    about: 'Расход краски зависит от типа поверхности, впитываемости и качества краски. Потолок обычно требует меньше краски, чем стены.',
    formula: 'Литры = (Площадь стен + Площадь потолка) × Слои / Расход\nБанки = Литры / Объём банки (с округлением вверх)',
    faq: [
      {
        question: 'Сколько краски на 1 м² стены?',
        answer: 'При расходе 10 м²/л на 1 м² уйдёт 0,1 л (100 мл) краски на один слой.'
      },
      {
        question: 'Нужен ли грунт перед покраской?',
        answer: 'Да, грунтовка снижает расход краски на 10–20% и улучшает сцепление. Особенно важна на сухой штукатурке.'
      }
    ],
    sources: [
      { title: 'Краска — Википедия', url: 'https://ru.wikipedia.org/wiki/Краска' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Комната 40 м² стен + 16 м² потолка, 2 слоя', url: '/kraska-raskhod?wallArea=40&ceilingArea=16&consumption=10&coats=2&canVolume=2.5' },
    { value: 'Стены 25 м², 1 слой, банки 5 л', url: '/kraska-raskhod?wallArea=25&ceilingArea=0&consumption=12&coats=1&canVolume=5' }
  ]
}

// 9. Калькулятор ламината
export const laminateCalculator: Calculator = {
  id: 'laminate-calculator',
  slug: 'laminat-kalkulyator',
  title: 'Калькулятор ламината',
  description: 'Расчёт количества упаковок ламината с учётом запаса на подрезку',
  category: 'stroitelstvo-i-remont',
  subcategory: 'pokrytiya',
  type: 'formula',
  inputs: [
    {
      name: 'roomLength',
      label: 'Длина комнаты (м)',
      type: 'number',
      placeholder: '5',
      min: 0.5,
      step: 0.1,
      defaultValue: 5
    },
    {
      name: 'roomWidth',
      label: 'Ширина комнаты (м)',
      type: 'number',
      placeholder: '4',
      min: 0.5,
      step: 0.1,
      defaultValue: 4
    },
    {
      name: 'packageArea',
      label: 'Площадь в упаковке (м²)',
      type: 'number',
      placeholder: '2.4',
      min: 0.5,
      step: 0.1,
      defaultValue: 2.4
    },
    {
      name: 'reservePercent',
      label: 'Запас (%)',
      type: 'select',
      options: [
        { value: '5', label: '5% — прямая укладка' },
        { value: '10', label: '10% — стандарт' },
        { value: '15', label: '15% — диагональ' }
      ],
      defaultValue: '10'
    }
  ],
  outputs: [
    { name: 'roomArea', label: 'Площадь комнаты', type: 'number', unit: 'м²' },
    { name: 'areaWithReserve', label: 'С запасом', type: 'number', unit: 'м²' },
    { name: 'packagesNeeded', label: 'Упаковок нужно', type: 'number', unit: 'шт' },
    { name: 'totalAreaPackages', label: 'Площадь купленных упаковок', type: 'number', unit: 'м²' },
    { name: 'extraArea', label: 'Остаток', type: 'number', unit: 'м²' }
  ],
  calculate: (inputs) => {
    const roomLength = Number(inputs.roomLength) || 0
    const roomWidth = Number(inputs.roomWidth) || 0
    const packageArea = Number(inputs.packageArea) || 2.4
    const reservePercent = Number(inputs.reservePercent) || 10

    if (!roomLength || !roomWidth) {
      return [
        { value: '—', label: 'Площадь комнаты', unit: 'м²' },
        { value: '—', label: 'С запасом', unit: 'м²' },
        { value: '—', label: 'Упаковок нужно', unit: 'шт' },
        { value: '—', label: 'Площадь купленных упаковок', unit: 'м²' },
        { value: '—', label: 'Остаток', unit: 'м²' }
      ]
    }

    const roomArea = roomLength * roomWidth
    const areaWithReserve = roomArea * (1 + reservePercent / 100)
    const packagesNeeded = Math.ceil(areaWithReserve / packageArea)
    const totalAreaPackages = packagesNeeded * packageArea
    const extraArea = Number((totalAreaPackages - roomArea).toFixed(2))

    return [
      { value: Number(roomArea.toFixed(2)), label: 'Площадь комнаты', unit: 'м²' },
      { value: Number(areaWithReserve.toFixed(2)), label: 'С запасом', unit: 'м²' },
      { value: packagesNeeded, label: 'Упаковок нужно', unit: 'шт' },
      { value: Number(totalAreaPackages.toFixed(2)), label: 'Площадь купленных упаковок', unit: 'м²' },
      { value: extraArea, label: 'Остаток', unit: 'м²' }
    ]
  },
  content: {
    howTo: 'Введите размеры комнаты, площадь ламината в одной упаковке и выберите запас. Калькулятор рассчитает количество упаковок.',
    about: 'Ламинат продаётся в упаковках. Запас нужен для подрезки у стен и на случай брака. Диагональная укладка увеличивает расход на 10–15%.',
    formula: 'Площадь = Длина × Ширина\nУпаковок = Площадь × (1 + Запас) / Площадь упаковки (округление вверх)',
    faq: [
      {
        question: 'Сколько ламината на комнату 20 м²?',
        answer: 'При упаковке 2,4 м² и запасе 10%: 20 × 1,1 / 2,4 ≈ 9–10 упаковок.'
      },
      {
        question: 'Можно ли вернуть лишние упаковки?',
        answer: 'В большинстве магазинов — да, если упаковка не вскрыта. Уточняйте при покупке.'
      }
    ],
    sources: [
      { title: 'Ламинат — Википедия', url: 'https://ru.wikipedia.org/wiki/Ламинат' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Комната 5×4 м, упаковка 2,4 м²', url: '/laminat-kalkulyator?roomLength=5&roomWidth=4&packageArea=2.4&reservePercent=10' },
    { value: 'Комната 6×3 м, упаковка 1,8 м²', url: '/laminat-kalkulyator?roomLength=6&roomWidth=3&packageArea=1.8&reservePercent=10' }
  ]
}

// 10. Калькулятор грузоперевозки
export const movingCalculator: Calculator = {
  id: 'moving-calculator',
  slug: 'pereezd-kalkulyator',
  title: 'Калькулятор грузоперевозки',
  description: 'Расчёт объёма вещей и количества машин для переезда',
  category: 'transport',
  subcategory: 'stoimost-poezdki',
  type: 'formula',
  inputs: [
    {
      name: 'rooms',
      label: 'Количество комнат',
      type: 'select',
      options: [
        { value: '1', label: '1 комната (студия)' },
        { value: '2', label: '2 комнаты' },
        { value: '3', label: '3 комнаты' },
        { value: '4', label: '4 комнаты' },
        { value: '5', label: '5+ комнат' }
      ],
      defaultValue: '2'
    },
    {
      name: 'extraItems',
      label: 'Дополнительно',
      type: 'select',
      options: [
        { value: 'none', label: 'Нет' },
        { value: 'fridge', label: 'Холодильник + стиралка' },
        { value: 'furniture', label: 'Много мебели' },
        { value: 'all', label: 'Всё крупное + мебель' }
      ],
      defaultValue: 'fridge'
    },
    {
      name: 'distance',
      label: 'Расстояние (км)',
      type: 'number',
      placeholder: '50',
      min: 1,
      defaultValue: 50
    }
  ],
  outputs: [
    { name: 'volume', label: 'Объём вещей', type: 'number', unit: 'м³' },
    { name: 'gazelCount', label: 'Газелей (1,5 т, 9 м³)', type: 'number', unit: 'шт' },
    { name: 'truckCount', label: 'Фургонов (5 т, 20 м³)', type: 'number', unit: 'шт' },
    { name: 'estimatedCost', label: 'Примерная стоимость', type: 'number', unit: '₽' },
    { name: 'recommendation', label: 'Рекомендация', type: 'text' }
  ],
  calculate: (inputs) => {
    const rooms = Number(inputs.rooms) || 2
    const extraItems = String(inputs.extraItems)
    const distance = Number(inputs.distance) || 0

    // Base volume per room
    const baseVolumes: Record<number, number> = {
      1: 8,
      2: 15,
      3: 25,
      4: 35,
      5: 50
    }

    let volume = baseVolumes[Math.min(rooms, 5)] || 15

    const extraVolumes: Record<string, number> = {
      none: 0,
      fridge: 2,
      furniture: 5,
      all: 10
    }

    volume += extraVolumes[extraItems] || 0

    const gazelCount = Math.ceil(volume / 9)
    const truckCount = Math.ceil(volume / 20)

    // Rough cost estimation: 1500 per m3 + 30 per km
    const estimatedCost = Math.round(volume * 1500 + distance * 30)

    let recommendation = ''
    if (volume <= 9) {
      recommendation = 'Достаточно одной газели. Закажите 2 грузчиков.'
    } else if (volume <= 18) {
      recommendation = 'Лучше 2 газели или 1 фургон. 2–3 грузчика.'
    } else {
      recommendation = 'Рекомендуем фургон. Минимум 3 грузчика. Возможно 2 рейса.'
    }

    return [
      { value: volume, label: 'Объём вещей', unit: 'м³' },
      { value: gazelCount, label: 'Газелей (1,5 т, 9 м³)', unit: 'шт' },
      { value: truckCount, label: 'Фургонов (5 т, 20 м³)', unit: 'шт' },
      { value: estimatedCost, label: 'Примерная стоимость', unit: '₽' },
      { value: recommendation, label: 'Рекомендация' }
    ]
  },
  content: {
    howTo: 'Выберите количество комнат, дополнительные крупные предметы и расстояние переезда. Калькулятор оценит объём вещей и подберёт транспорт.',
    about: 'Объём типичной квартиры: студия ~8 м³, 2-комнатная ~15 м³, 3-комнатная ~25 м³. Газель вмещает ~9 м³, фургон ~20 м³.',
    formula: 'Объём = Базовый объём комнат + Дополнительно\nГазелей = Объём / 9 (округление вверх)\nФургонов = Объём / 20 (округление вверх)',
    faq: [
      {
        question: 'Сколько стоит переезд?',
        answer: 'Примерно 1500 ₽/м³ + 30 ₽/км. Грузчики — от 500 ₽/час каждый. Точную цену уточняйте у перевозчиков.'
      },
      {
        question: 'Что вмещает газель?',
        answer: 'Газель (9 м³): мебель 1-комнатной квартиры, холодильник, коробки. Для 2-комнатной — возможно 2 рейса или фургон.'
      }
    ],
    sources: [
      { title: 'Переезд — Википедия', url: 'https://ru.wikipedia.org/wiki/Переезд' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: '2-комнатная, холодильник, 50 км', url: '/pereezd-kalkulyator?rooms=2&extraItems=fridge&distance=50' },
    { value: '3-комнатная, мебель, 20 км', url: '/pereezd-kalkulyator?rooms=3&extraItems=furniture&distance=20' }
  ]
}

// 11. Калькулятор свадебного бюджета
export const weddingBudgetCalculator: Calculator = {
  id: 'wedding-budget',
  slug: 'svadebnyj-byudzhet',
  title: 'Калькулятор свадебного бюджета',
  description: 'Планировщик расходов на свадьбу с распределением по категориям',
  category: 'povsednevnoe',
  subcategory: 'razvlecheniya',
  type: 'formula',
  inputs: [
    {
      name: 'guests',
      label: 'Количество гостей',
      type: 'number',
      placeholder: '50',
      min: 2,
      max: 500,
      defaultValue: 50
    },
    {
      name: 'budgetLevel',
      label: 'Уровень бюджета',
      type: 'select',
      options: [
        { value: 'economy', label: 'Эконом (до 1500 ₽/чел на банкет)' },
        { value: 'standard', label: 'Стандарт (3000 ₽/чел)' },
        { value: 'premium', label: 'Премиум (6000 ₽/чел)' },
        { value: 'luxury', label: 'Люкс (12000 ₽/чел)' }
      ],
      defaultValue: 'standard'
    }
  ],
  outputs: [
    { name: 'totalBudget', label: 'Общий бюджет', type: 'number', unit: '₽' },
    { name: 'banquet', label: 'Банкет', type: 'number', unit: '₽' },
    { name: 'venue', label: 'Площадка', type: 'number', unit: '₽' },
    { name: 'photoVideo', label: 'Фото и видео', type: 'number', unit: '₽' },
    { name: 'decor', label: 'Декор и цветы', type: 'number', unit: '₽' },
    { name: 'other', label: 'Прочее (транспорт, тамада, наряды)', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const guests = Number(inputs.guests) || 0
    const budgetLevel = String(inputs.budgetLevel)

    if (!guests) {
      return [
        { value: '—', label: 'Общий бюджет', unit: '₽' },
        { value: '—', label: 'Банкет', unit: '₽' },
        { value: '—', label: 'Площадка', unit: '₽' },
        { value: '—', label: 'Фото и видео', unit: '₽' },
        { value: '—', label: 'Декор и цветы', unit: '₽' },
        { value: '—', label: 'Прочее (транспорт, тамада, наряды)', unit: '₽' }
      ]
    }

    const perPerson: Record<string, number> = {
      economy: 1500,
      standard: 3000,
      premium: 6000,
      luxury: 12000
    }

    const banquetPerPerson = perPerson[budgetLevel] || 3000
    const banquet = guests * banquetPerPerson
    const venue = Math.round(banquet * 0.3)
    const photoVideo = Math.round(banquet * 0.2)
    const decor = Math.round(banquet * 0.15)
    const other = Math.round(banquet * 0.35)
    const totalBudget = banquet + venue + photoVideo + decor + other

    return [
      { value: totalBudget, label: 'Общий бюджет', unit: '₽' },
      { value: banquet, label: 'Банкет', unit: '₽' },
      { value: venue, label: 'Площадка', unit: '₽' },
      { value: photoVideo, label: 'Фото и видео', unit: '₽' },
      { value: decor, label: 'Декор и цветы', unit: '₽' },
      { value: other, label: 'Прочее (транспорт, тамада, наряды)', unit: '₽' }
    ]
  },
  content: {
    howTo: 'Введите количество гостей и выберите уровень бюджета. Калькулятор распределит расходы по основным статьям свадебного бюджета.',
    about: 'Средний бюджет свадьбы в России: банкет — 40–50%, площадка — 15–20%, фото/видео — 10–15%, декор — 10%, остальное — наряды, транспорт, ведущий.',
    formula: 'Банкет = Гости × Цена за человека\nПлощадка = Банкет × 0,3\nФото/видео = Банкет × 0,2\nДекор = Банкет × 0,15\nПрочее = Банкет × 0,35',
    faq: [
      {
        question: 'Как сократить бюджет свадьбы?',
        answer: 'Уменьшите число гостей, выберите будний день, откажитесь от декора в пользу готовой площадки, наймите начинающего фотографа.'
      },
      {
        question: 'На чём не стоит экономить?',
        answer: 'На фотографе и видеографе — это единственное, что остаётся после свадьбы. На ведущем — от него зависит атмосфера.'
      }
    ],
    sources: [
      { title: 'Свадьба — Википедия', url: 'https://ru.wikipedia.org/wiki/Свадьба' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: '50 гостей, стандарт', url: '/svadebnyj-byudzhet?guests=50&budgetLevel=standard' },
    { value: '30 гостей, премиум', url: '/svadebnyj-byudzhet?guests=30&budgetLevel=premium' },
    { value: '80 гостей, эконом', url: '/svadebnyj-byudzhet?guests=80&budgetLevel=economy' }
  ]
}

// 12. Калькулятор отпускных
export const vacationCalculator: Calculator = {
  id: 'vacation-calculator',
  slug: 'otpusknye-kalkulyator',
  title: 'Калькулятор отпускных',
  description: 'Расчёт суммы отпускных по средней зарплате за 12 месяцев',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'salary',
      label: 'Среднемесячная зарплата (₽)',
      type: 'number',
      placeholder: '80000',
      min: 0,
      defaultValue: 80000
    },
    {
      name: 'vacationDays',
      label: 'Дней отпуска',
      type: 'number',
      placeholder: '14',
      min: 1,
      max: 56,
      defaultValue: 14
    },
    {
      name: 'workedMonths',
      label: 'Отработано месяцев',
      type: 'number',
      placeholder: '12',
      min: 1,
      max: 12,
      defaultValue: 12
    }
  ],
  outputs: [
    { name: 'avgDaily', label: 'Среднедневной заработок', type: 'number', unit: '₽' },
    { name: 'vacationPay', label: 'Сумма отпускных', type: 'number', unit: '₽' },
    { name: 'vacationPayNet', label: 'Отпускные за вычетом НДФЛ', type: 'number', unit: '₽' },
    { name: 'monthlyEquivalent', label: 'Эквивалент за месяц', type: 'number', unit: '₽' },
    { name: 'difference', label: 'Разница с зарплатой', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const salary = Number(inputs.salary) || 0
    const vacationDays = Number(inputs.vacationDays) || 0
    const workedMonths = Number(inputs.workedMonths) || 12

    if (!salary || !vacationDays) {
      return [
        { value: '—', label: 'Среднедневной заработок', unit: '₽' },
        { value: '—', label: 'Сумма отпускных', unit: '₽' },
        { value: '—', label: 'Отпускные за вычетом НДФЛ', unit: '₽' },
        { value: '—', label: 'Эквивалент за месяц', unit: '₽' },
        { value: '—', label: 'Разница с зарплатой', unit: '₽' }
      ]
    }

    const avgDaysPerMonth = 29.3
    const totalEarnings = salary * Math.min(workedMonths, 12)
    const avgDays = avgDaysPerMonth * Math.min(workedMonths, 12)
    const avgDaily = totalEarnings / avgDays
    const vacationPay = avgDaily * vacationDays
    const vacationPayNet = vacationPay * 0.87
    const monthlyEquivalent = vacationPay / vacationDays * 30
    const difference = monthlyEquivalent - salary

    return [
      { value: Number(avgDaily.toFixed(2)), label: 'Среднедневной заработок', unit: '₽' },
      { value: Number(vacationPay.toFixed(2)), label: 'Сумма отпускных', unit: '₽' },
      { value: Number(vacationPayNet.toFixed(2)), label: 'Отпускные за вычетом НДФЛ', unit: '₽' },
      { value: Number(monthlyEquivalent.toFixed(2)), label: 'Эквивалент за месяц', unit: '₽' },
      { value: Number(difference.toFixed(2)), label: 'Разница с зарплатой', unit: '₽' }
    ]
  },
  content: {
    howTo: 'Введите среднемесячную зарплату, количество дней отпуска и отработанных месяцев. Калькулятор рассчитает отпускные по ТК РФ.',
    about: 'Отпускные рассчитываются по среднему заработку за 12 месяцев. НДФЛ 13% удерживается автоматически. При неполном году расчётный период сокращается.',
    formula: 'Среднедневной = Зарплата × Месяцев / (29,3 × Месяцев)\nОтпускные = Среднедневной × Дни отпуска',
    faq: [
      {
        question: 'Почему отпускные меньше зарплаты?',
        answer: 'Зарплата считается за рабочие дни (~21), а отпускные — за календарные (29,3). При 14 днях отпуска обычно выгодно взять отпуск с субботы.'
      },
      {
        question: 'Как увеличить отпускные?',
        answer: 'Возьмите отпуск в месяц с максимальным количеством рабочих дней (август, октябрь). Избегайте января и мая.'
      }
    ],
    sources: [
      { title: 'Отпуск — Трудовой кодекс РФ', url: 'https://ru.wikipedia.org/wiki/Ежегодный_отпуск' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Зарплата 80 000 ₽, 14 дней', url: '/otpusknye-kalkulyator?salary=80000&vacationDays=14&workedMonths=12' },
    { value: 'Зарплата 50 000 ₽, 28 дней', url: '/otpusknye-kalkulyator?salary=50000&vacationDays=28&workedMonths=12' }
  ]
}

// 13. Калькулятор декретных
export const maternityCalculator: Calculator = {
  id: 'maternity-calculator',
  slug: 'dekretnye-kalkulyator',
  title: 'Калькулятор декретных пособий',
  description: 'Расчёт пособия по беременности и родам в России',
  category: 'zdorove-i-krasota',
  subcategory: 'beremennost-i-deti',
  type: 'formula',
  inputs: [
    {
      name: 'salary2Years',
      label: 'Зарплата за 2 года (₽)',
      type: 'number',
      placeholder: '1800000',
      min: 0,
      defaultValue: 1800000
    },
    {
      name: 'excludedDays',
      label: 'Исключённые дни (больничные и т.д.)',
      type: 'number',
      placeholder: '30',
      min: 0,
      max: 730,
      defaultValue: 30
    },
    {
      name: 'leaveDays',
      label: 'Длительность отпуска (дней)',
      type: 'select',
      options: [
        { value: '140', label: '140 дней — обычные роды' },
        { value: '156', label: '156 дней — осложнённые' },
        { value: '194', label: '194 дня — двойня и более' }
      ],
      defaultValue: '140'
    }
  ],
  outputs: [
    { name: 'avgDaily', label: 'Среднедневной заработок', type: 'number', unit: '₽' },
    { name: 'maxAvgDaily', label: 'Максимальный среднедневной', type: 'number', unit: '₽' },
    { name: 'usedAvgDaily', label: 'Применённый среднедневной', type: 'number', unit: '₽' },
    { name: 'totalBenefit', label: 'Общая сумма пособия', type: 'number', unit: '₽' },
    { name: 'monthlyEquivalent', label: 'В месяц', type: 'number', unit: '₽' }
  ],
  calculate: (inputs) => {
    const salary2Years = Number(inputs.salary2Years) || 0
    const excludedDays = Number(inputs.excludedDays) || 0
    const leaveDays = Number(inputs.leaveDays) || 140

    if (!salary2Years) {
      return [
        { value: '—', label: 'Среднедневной заработок', unit: '₽' },
        { value: '—', label: 'Максимальный среднедневной', unit: '₽' },
        { value: '—', label: 'Применённый среднедневной', unit: '₽' },
        { value: '—', label: 'Общая сумма пособия', unit: '₽' },
        { value: '—', label: 'В месяц', unit: '₽' }
      ]
    }

    // Maximum base for social insurance contributions in Russia (2025 approx)
    const maxBaseYear1 = 1965000 // 2024 limit
    const maxBaseYear2 = 1905000 // 2023 limit
    const totalMaxBase = maxBaseYear1 + maxBaseYear2

    const totalDays = 730
    const workingDays = totalDays - excludedDays

    const avgDaily = salary2Years / workingDays
    const maxAvgDaily = totalMaxBase / totalDays
    const usedAvgDaily = Math.min(avgDaily, maxAvgDaily)
    const totalBenefit = usedAvgDaily * leaveDays
    const monthlyEquivalent = totalBenefit / leaveDays * 30.44

    return [
      { value: Number(avgDaily.toFixed(2)), label: 'Среднедневной заработок', unit: '₽' },
      { value: Number(maxAvgDaily.toFixed(2)), label: 'Максимальный среднедневной', unit: '₽' },
      { value: Number(usedAvgDaily.toFixed(2)), label: 'Применённый среднедневной', unit: '₽' },
      { value: Number(totalBenefit.toFixed(2)), label: 'Общая сумма пособия', unit: '₽' },
      { value: Number(monthlyEquivalent.toFixed(2)), label: 'В месяц', unit: '₽' }
    ]
  },
  content: {
    howTo: 'Введите сумму заработка за 2 календарных года, количество исключённых дней и длительность отпуска. Калькулятор рассчитает пособие с учётом лимитов ФСС.',
    about: 'Пособие по беременности равно среднедневному заработку × дни отпуска. Есть максимум по взносам в ФСС. Минимум — МРОТ.',
    formula: 'Среднедневной = Зарплата 2 лет / (730 − Исключённые дни)\nПособие = min(Среднедневной, Макс) × Дни отпуска',
    faq: [
      {
        question: 'Какой максимум декретных в 2025 году?',
        answer: 'Максимальный среднедневной ~5300 ₽. За 140 дней — до ~742 000 ₽.'
      },
      {
        question: 'Можно ли заменить года?',
        answer: 'Да, если в расчётном периоде был декрет или больничный, можно заменить года на предыдущие. Нужно заявление в бухгалтерию.'
      }
    ],
    sources: [
      { title: 'Пособие по беременности — Википедия', url: 'https://ru.wikipedia.org/wiki/Пособие_по_беременности_и_родам' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Зарплата 1,8 млн за 2 года, 140 дней', url: '/dekretnye-kalkulyator?salary2Years=1800000&excludedDays=30&leaveDays=140' },
    { value: 'Зарплата 3 млн за 2 года, 140 дней', url: '/dekretnye-kalkulyator?salary2Years=3000000&excludedDays=0&leaveDays=140' }
  ]
}

// 14. Калькулятор неустойки (ст. 395 ГК РФ)
export const penaltyCalculator: Calculator = {
  id: 'penalty-calculator',
  slug: 'neustojka-395-gk',
  title: 'Калькулятор неустойки по 395 ГК РФ',
  description: 'Расчёт процентов за просрочку платежа по ключевой ставке ЦБ (1/300 ставки за каждый день)',
  category: 'nauka-i-ucheba',
  subcategory: 'finansovye',
  type: 'formula',
  inputs: [
    {
      name: 'debt',
      label: 'Сумма долга (₽)',
      type: 'number',
      placeholder: '100000',
      min: 1,
      defaultValue: 100000
    },
    {
      name: 'days',
      label: 'Дней просрочки',
      type: 'number',
      placeholder: '30',
      min: 1,
      defaultValue: 30
    },
    {
      name: 'rate',
      label: 'Ставка ЦБ (%)',
      type: 'number',
      placeholder: '21',
      min: 0.1,
      max: 50,
      step: 0.25,
      defaultValue: 21
    }
  ],
  outputs: [
    { name: 'dailyPenalty', label: 'Неустойка за день', type: 'number', unit: '₽' },
    { name: 'totalPenalty', label: 'Общая неустойка', type: 'number', unit: '₽' },
    { name: 'debtWithPenalty', label: 'Долг + неустойка', type: 'number', unit: '₽' },
    { name: 'annualRate', label: 'Годовой эквивалент', type: 'number', unit: '%' }
  ],
  calculate: (inputs) => {
    const debt = Number(inputs.debt) || 0
    const days = Number(inputs.days) || 0
    const rate = Number(inputs.rate) || 0

    if (!debt || !days || !rate) {
      return [
        { value: '—', label: 'Неустойка за день', unit: '₽' },
        { value: '—', label: 'Общая неустойка', unit: '₽' },
        { value: '—', label: 'Долг + неустойка', unit: '₽' },
        { value: '—', label: 'Годовой эквивалент', unit: '%' }
      ]
    }

    const dailyPenalty = debt * (rate / 100) / 300
    const totalPenalty = dailyPenalty * days
    const debtWithPenalty = debt + totalPenalty
    const annualRate = (rate / 300) * 365

    return [
      { value: Number(dailyPenalty.toFixed(2)), label: 'Неустойка за день', unit: '₽' },
      { value: Number(totalPenalty.toFixed(2)), label: 'Общая неустойка', unit: '₽' },
      { value: Number(debtWithPenalty.toFixed(2)), label: 'Долг + неустойка', unit: '₽' },
      { value: Number(annualRate.toFixed(2)), label: 'Годовой эквивалент', unit: '%' }
    ]
  },
  content: {
    howTo: 'Введите сумму долга, количество дней просрочки и действующую ключевую ставку ЦБ. Калькулятор рассчитает неустойку по статье 395 ГК РФ.',
    about: 'По ст. 395 ГК РФ неустойка = Сумма долга × Ставка ЦБ / 300 × Количество дней. Применяется при нарушении денежных обязательств.',
    formula: 'Неустойка = Долг × Ставка ЦБ / 300 × Дни\nГодовой эквивалент = Ставка ЦБ / 300 × 365',
    faq: [
      {
        question: 'Что такое 1/300 ключевой ставки?',
        answer: 'Это законный размер процентов за просрочку платежа по ст. 395 ГК РФ. За каждый день просрочки начисляется 1/300 текущей ставки ЦБ.'
      },
      {
        question: 'Можно ли требовать больше?',
        answer: 'Если в договоре предусмотрена неустойка выше законной — да. Иначе применяется только законная (1/300 ставки).'
      }
    ],
    sources: [
      { title: 'Статья 395 ГК РФ', url: 'https://ru.wikipedia.org/wiki/Гражданский_кодекс_Российской_Федерации' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Долг 100 000 ₽, 30 дней, ставка 21%', url: '/neustojka-395-gk?debt=100000&days=30&rate=21' },
    { value: 'Долг 500 000 ₽, 90 дней, ставка 21%', url: '/neustojka-395-gk?debt=500000&days=90&rate=21' }
  ]
}

// 15. Калькулятор размера обуви
export const shoeSizeConverter: Calculator = {
  id: 'shoe-size-converter',
  slug: 'razmer-obuvi-konverter',
  title: 'Калькулятор размера обуви',
  description: 'Перевод размеров обуви между российской, европейской, американской и британской системами',
  category: 'povsednevnoe',
  subcategory: 'razmery',
  type: 'formula',
  inputs: [
    {
      name: 'ruSize',
      label: 'Российский размер',
      type: 'number',
      placeholder: '40',
      min: 20,
      max: 50,
      defaultValue: 40
    }
  ],
  outputs: [
    { name: 'euSize', label: 'Европейский (EU)', type: 'number' },
    { name: 'usMenSize', label: 'Американский мужской (US)', type: 'number' },
    { name: 'usWomenSize', label: 'Американский женский (US)', type: 'number' },
    { name: 'ukSize', label: 'Британский (UK)', type: 'number' },
    { name: 'footLength', label: 'Длина стопы', type: 'number', unit: 'см' }
  ],
  calculate: (inputs) => {
    const ruSize = Number(inputs.ruSize) || 0

    if (!ruSize) {
      return [
        { value: '—', label: 'Европейский (EU)' },
        { value: '—', label: 'Американский мужской (US)' },
        { value: '—', label: 'Американский женский (US)' },
        { value: '—', label: 'Британский (UK)' },
        { value: '—', label: 'Длина стопы', unit: 'см' }
      ]
    }

    // Foot length in mm: (RU size / 2) + 10 = cm
    const footLength = (ruSize / 2) + 10
    const footLengthMm = footLength * 10

    const euSize = ruSize
    const usMenSize = ruSize - 32.5
    const usWomenSize = ruSize - 31.5
    const ukSize = ruSize - 33.5

    return [
      { value: euSize, label: 'Европейский (EU)' },
      { value: Number(usMenSize.toFixed(1)), label: 'Американский мужской (US)' },
      { value: Number(usWomenSize.toFixed(1)), label: 'Американский женский (US)' },
      { value: Number(ukSize.toFixed(1)), label: 'Британский (UK)' },
      { value: Number(footLength.toFixed(1)), label: 'Длина стопы', unit: 'см' }
    ]
  },
  content: {
    howTo: 'Введите российский размер обуви. Калькулятор переведёт его в европейский, американский (мужской и женский), британский размеры и покажет длину стопы.',
    about: 'Размеры обуви: российский = европейский. Американский мужской = RU − 32,5, женский = RU − 31,5, британский = RU − 33,5. Длина стопы = RU/2 + 10 см.',
    formula: 'EU = RU\nUS (муж) = RU − 32,5\nUS (жен) = RU − 31,5\nUK = RU − 33,5\nДлина стопы = RU / 2 + 10 см',
    faq: [
      {
        question: 'Российский размер равен европейскому?',
        answer: 'Да, российская и европейская шкалы совпадают. Но размеры могут варьироваться у разных производителей.'
      },
      {
        question: 'Как измерить размер обуви?',
        answer: 'Поставьте стопу на лист бумаги, обведите карандашом и измерьте расстояние от пятки до большого пальца.'
      }
    ],
    sources: [
      { title: 'Размер обуви — Википедия', url: 'https://ru.wikipedia.org/wiki/Размер_обуви' }
    ],
    updatedAt: '2026-04-26'
  },
  popularCalculations: [
    { value: 'Российский 40', url: '/razmer-obuvi-konverter?ruSize=40' },
    { value: 'Российский 42', url: '/razmer-obuvi-konverter?ruSize=42' },
    { value: 'Российский 36', url: '/razmer-obuvi-konverter?ruSize=36' }
  ]
}

// Экспорт всех новых калькуляторов
export const remainingCalculators: Calculator[] = [
  stepsToDistanceCalculator,
  sleepCyclesCalculator,
  waterIntakeCalculator,
  brineSaltCalculator,
  gpaCalculator,
  wallpaperCalculator,
  tileCalculator,
  paintCalculator,
  laminateCalculator,
  movingCalculator,
  weddingBudgetCalculator,
  vacationCalculator,
  maternityCalculator,
  penaltyCalculator,
  shoeSizeConverter,
]
