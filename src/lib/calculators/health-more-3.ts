import { Calculator } from '../types';

export const healthMore3Calculators: Calculator[] = [
  // 1. Индекс массы тела (BMI) для беременных
  {
    id: 'bmi-pregnancy',
    slug: 'imt-dlya-beremennih',
    title: 'ИМТ для беременных',
    description: 'Расчёт ИМТ с учётом срока беременности и рекомендуемого набора веса',
    category: 'zdorove-i-krasota',
    subcategory: 'vesc-rost',
    type: 'formula',
    inputs: [
      { name: 'preWeight', label: 'Вес до беременности (кг)', type: 'number', placeholder: '65', defaultValue: 65, min: 30, max: 200 },
      { name: 'currentWeight', label: 'Текущий вес (кг)', type: 'number', placeholder: '70', defaultValue: 70, min: 30, max: 200 },
      { name: 'height', label: 'Рост (см)', type: 'number', placeholder: '165', defaultValue: 165, min: 100, max: 250 },
      { name: 'week', label: 'Срок беременности (недель)', type: 'number', placeholder: '20', defaultValue: 20, min: 1, max: 42 }
    ],
    outputs: [
      { name: 'preBMI', label: 'ИМТ до беременности', type: 'number' },
      { name: 'weightGain', label: 'Набрано веса', type: 'number', unit: 'кг' },
      { name: 'recommendedGain', label: 'Рекомендуемый набор', type: 'number', unit: 'кг' },
      { name: 'status', label: 'Статус', type: 'text' }
    ],
    calculate: (inputs) => {
      const preWeight = Number(inputs.preWeight);
      const currentWeight = Number(inputs.currentWeight);
      const height = Number(inputs.height) / 100;
      const week = Number(inputs.week);
      const preBMI = preWeight / (height * height);
      const weightGain = currentWeight - preWeight;
      let minGain = 0, maxGain = 0;
      if (preBMI < 18.5) { minGain = 12.5; maxGain = 18; }
      else if (preBMI < 25) { minGain = 11.5; maxGain = 16; }
      else if (preBMI < 30) { minGain = 7; maxGain = 11.5; }
      else { minGain = 5; maxGain = 9; }
      const expectedGain = (week / 40) * ((minGain + maxGain) / 2);
      let status = weightGain < minGain * 0.7 ? 'Недобор веса' : weightGain > maxGain * 1.3 ? 'Перебор веса' : 'Норма';
      return [
        { value: Math.round(preBMI * 10) / 10, label: 'ИМТ до беременности' },
        { value: Math.round(weightGain * 10) / 10, label: 'Набрано веса', unit: 'кг' },
        { value: Math.round(expectedGain * 10) / 10, label: 'Рекомендуемый набор', unit: 'кг' },
        { value: status, label: 'Статус' }
      ];
    },
    content: {
      howTo: 'Введите вес до и во время беременности, рост и срок.',
      about: 'Норма набора веса зависит от исходного ИМТ: 12-18 кг при недостаточном весе, 11-16 кг при норме.',
      formula: 'ИМТ = вес / (рост в метрах)². Рекомендации по набору веса по IOM (Institute of Medicine).',
      faq: [
        { question: 'Сколько веса набирать за триместр?', answer: '1-2 кг в 1 триместр, затем 0.4-0.5 кг в неделю при нормальном ИМТ.' },
        { question: 'Почему важен контроль веса?', answer: 'Избыточный набор увеличивает риск диабета, гестоза, осложнений при родах.' }
      ],
      sources: [{ title: 'IOM Guidelines', url: 'https://www.ncbi.nlm.nih.gov/books/NBK32815/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 2. Калькулятор родов (предполагаемая дата)
  {
    id: 'due-date-advanced',
    slug: 'data-rodov-rasshirennyj',
    title: 'Калькулятор даты родов (расширенный)',
    description: 'Расчёт предполагаемой даты родов по нескольким методам',
    category: 'zdorove-i-krasota',
    subcategory: 'detyam',
    type: 'formula',
    inputs: [
      { name: 'method', label: 'Метод расчёта', type: 'select', options: [{ value: 'lmp', label: 'По первому дню последней менструации' }, { value: 'conception', label: 'По дате зачатия' }, { value: 'ultrasound', label: 'По УЗИ (CRL)' }], defaultValue: 'lmp' },
      { name: 'date', label: 'Дата', type: 'date' },
      { name: 'cycleLength', label: 'Длина цикла (дней)', type: 'number', placeholder: '28', defaultValue: 28, min: 21, max: 35 }
    ],
    outputs: [
      { name: 'dueDate', label: 'Предполагаемая дата родов', type: 'text' },
      { name: 'gestationalAge', label: 'Текущий срок', type: 'text' },
      { name: 'trimester', label: 'Триместр', type: 'number' }
    ],
    calculate: (inputs) => {
      const method = String(inputs.method);
      const dateStr = String(inputs.date);
      const cycleLength = Number(inputs.cycleLength);
      if (!dateStr) return [{ value: '—', label: 'Предполагаемая дата родов' }, { value: '—', label: 'Текущий срок' }, { value: 0, label: 'Триместр' }];
      const date = new Date(dateStr);
      const today = new Date();
      let dueDate = new Date(date);
      let daysPregnant = 0;
      if (method === 'lmp') {
        dueDate.setDate(date.getDate() + 280 + (cycleLength - 28));
        daysPregnant = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      } else if (method === 'conception') {
        dueDate.setDate(date.getDate() + 266);
        daysPregnant = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      } else {
        dueDate.setDate(date.getDate() + 280 - 56);
        daysPregnant = 56 + Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      }
      const weeks = Math.floor(daysPregnant / 7);
      const days = daysPregnant % 7;
      const trimester = weeks < 12 ? 1 : weeks < 28 ? 2 : 3;
      return [
        { value: dueDate.toLocaleDateString('ru-RU'), label: 'Предполагаемая дата родов' },
        { value: `${weeks} недель ${days} дней`, label: 'Текущий срок' },
        { value: trimester, label: 'Триместр' }
      ];
    },
    content: {
      howTo: 'Выберите метод и введите дату. Для УЗИ укажите дату исследования (считается по 12 неделе).',
      about: 'Только 4% родов происходят в расчётный день. Нормальный диапазон: 38-42 недели.',
      formula: 'По Нägele: ДПР = ПДМ + 1 год − 3 месяца + 7 дней.',
      faq: [
        { question: 'Почему 40 недель, а не 9 месяцев?', answer: 'Медицинский срок считается с первого дня последней менструации, а не зачатия (которое обычно на 2 недели позже).' },
        { question: 'Можно ли точно рассчитать?', answer: 'Нет, нормальный диапазон родов ±2 недели от расчётной даты.' }
      ],
      sources: [{ title: 'ACOG Guidelines', url: 'https://www.acog.org/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 3. Калькулятор прикорма
  {
    id: 'baby-food-intro',
    slug: 'prikorm-dlya-malysha',
    title: 'Калькулятор прикорма',
    description: 'Когда и какие продукты вводить при прикорме',
    category: 'zdorove-i-krasota',
    subcategory: 'detyam',
    type: 'reference',
    inputs: [
      { name: 'birthDate', label: 'Дата рождения ребёнка', type: 'date' },
      { name: 'feedingType', label: 'Тип вскармливания', type: 'select', options: [{ value: 'breast', label: 'Грудное' }, { value: 'formula', label: 'Смешанное/искусственное' }], defaultValue: 'breast' }
    ],
    outputs: [
      { name: 'ageMonths', label: 'Возраст', type: 'number', unit: 'мес' },
      { name: 'readyFoods', label: 'Можно вводить', type: 'text' },
      { name: 'nextFoods', label: 'Следующий этап', type: 'text' }
    ],
    calculate: (inputs) => {
      const birthStr = String(inputs.birthDate);
      const feedingType = String(inputs.feedingType);
      if (!birthStr) return [{ value: 0, label: 'Возраст', unit: 'мес' }, { value: '—', label: 'Можно вводить' }, { value: '—', label: 'Следующий этап' }];
      const birth = new Date(birthStr);
      const today = new Date();
      const ageDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      const ageMonths = Math.floor(ageDays / 30.44);
      const startAge = feedingType === 'breast' ? 6 : 4;
      let readyFoods = '';
      let nextFoods = '';
      if (ageMonths < startAge) {
        readyFoods = 'Только молоко/адаптированная смесь';
        nextFoods = `Прикорм с ${startAge} месяцев`;
      } else if (ageMonths < 7) {
        readyFoods = 'Безглютеновые каши, овощное пюре';
        nextFoods = 'Мясное пюре (с 7 мес)';
      } else if (ageMonths < 8) {
        readyFoods = 'Каши, овощи, мясо (кролик, индейка)';
        nextFoods = 'Фруктовое пюре, творог (с 8 мес)';
      } else if (ageMonths < 10) {
        readyFoods = 'Все овощи, мясо, фрукты, творог, яичный желток';
        nextFoods = 'Рыба, кефир (с 10 мес)';
      } else {
        readyFoods = 'Все продукты (пюре, кусочками)';
        nextFoods = 'Меню приближается к семейному';
      }
      return [
        { value: ageMonths, label: 'Возраст', unit: 'мес' },
        { value: readyFoods, label: 'Можно вводить' },
        { value: nextFoods, label: 'Следующий этап' }
      ];
    },
    content: {
      howTo: 'Введите дату рождения ребёнка и тип вскармливания.',
      about: 'Современные рекомендации ВОЗ: прикорм с 6 месяцев при ГВ. При искусственном вскармливании можно начинать с 4-5 месяцев.',
      formula: 'Схема прикорма по рекомендациям ESPGHAN и Американской академии педиатрии.',
      faq: [
        { question: 'С чего начинать прикорм?', answer: 'Обычно с безглютеновых каш (рисовая, гречневая) или овощного пюре (кабачок, брокколи).' },
        { question: 'Как вводить новый продукт?', answer: 'По правилу "4 дней": давать один новый продукт 4 дня, наблюдая за реакцией.' }
      ],
      sources: [{ title: 'ESPGHAN', url: 'https://espghan.org/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 4. Расчёт развития ребёнка (по месяцам)
  {
    id: 'child-development',
    slug: 'razvitie-rebenka',
    title: 'Календарь развития ребёнка',
    description: 'Основные этапы развития от рождения до 3 лет',
    category: 'zdorove-i-krasota',
    subcategory: 'detyam',
    type: 'reference',
    inputs: [
      { name: 'birthDate', label: 'Дата рождения', type: 'date' }
    ],
    outputs: [
      { name: 'ageDisplay', label: 'Возраст', type: 'text' },
      { name: 'motorSkills', label: 'Моторика', type: 'text' },
      { name: 'speech', label: 'Речь', type: 'text' },
      { name: 'social', label: 'Социальное развитие', type: 'text' }
    ],
    calculate: (inputs) => {
      const birthStr = String(inputs.birthDate);
      if (!birthStr) return [{ value: '—', label: 'Возраст' }, { value: '—', label: 'Моторика' }, { value: '—', label: 'Речь' }, { value: '—', label: 'Социальное развитие' }];
      const birth = new Date(birthStr);
      const today = new Date();
      const months = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      const ageDisplay = years > 0 ? `${years} г ${remMonths} м` : `${months} мес`;
      let motorSkills = '', speech = '', social = '';
      if (months < 2) { motorSkills = 'Поднимает голову'; speech = 'Гуление'; social = 'Взгляд на лицо'; }
      else if (months < 4) { motorSkills = 'Держит голову, переворачивается'; speech = 'Агу, гуление'; social = 'Улыбается'; }
      else if (months < 6) { motorSkills = 'Сидит с опорой, хватает игрушки'; speech = 'Гласные звуки'; social = 'Смеется вслух'; }
      else if (months < 9) { motorSkills = 'Ползает, сидит самостоятельно'; speech = 'Булькание, слоги (ба-ба)'; social = 'Боится незнакомцев'; }
      else if (months < 12) { motorSkills = 'Встаёт, ходит с опорой'; speech = 'Мама, папа (осознанно)'; social = 'Играет в "ладушки"'; }
      else if (months < 18) { motorSkills = 'Ходит самостоятельно, лазает'; speech = '3-5 слов, жесты'; social = 'Копирует взрослых'; }
      else if (months < 24) { motorSkills = 'Бегает, прыгает, лазает'; speech = 'Фразы из 2 слов, 50+ слов'; social = 'Сопераживание, независимость'; }
      else if (months < 36) { motorSkills = 'Прыгает на двух ногах, ловит мяч'; speech = 'Предложения, вопросы'; social = 'Играет с детьми, копирует'; }
      else { motorSkills = 'Прыгает в длину, ловит двумя руками'; speech = 'Связная речь, счёт'; social = 'Игры с правилами, дружба'; }
      return [
        { value: ageDisplay, label: 'Возраст' },
        { value: motorSkills, label: 'Моторика' },
        { value: speech, label: 'Речь' },
        { value: social, label: 'Социальное развитие' }
      ];
    },
    content: {
      howTo: 'Введите дату рождения ребёнка.',
      about: 'Этапы развития согласно Denver Developmental Screening Test. Отклонения ±2 месяца — норма.',
      formula: 'Оценка по 4 областям: мелкая/крупная моторика, речь, социальное развитие.',
      faq: [
        { question: 'Ребёнок отстаёт — что делать?', answer: 'Небольшие отклонения нормальны. При сильном отставании (6+ мес) — консультация педиатра/невролога.' },
        { question: 'Можно ли ускорить развитие?', answer: 'Лучший стимул — любовь, общение, игры. Избегайте чрезмерной стимуляции.' }
      ],
      sources: [{ title: 'CDC Milestones', url: 'https://www.cdc.gov/ncbddd/actearly/milestones/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 5. Расчёт менструального цикла
  {
    id: 'menstrual-cycle',
    slug: 'menstrualnyj-cikl',
    title: 'Калькулятор менструального цикла',
    description: 'Отслеживание цикла, предсказание следующих месячных и овуляции',
    category: 'zdorove-i-krasota',
    subcategory: 'detyam',
    type: 'formula',
    inputs: [
      { name: 'lastPeriod', label: 'Первый день последней менструации', type: 'date' },
      { name: 'cycleLength', label: 'Средняя длина цикла (дней)', type: 'number', placeholder: '28', defaultValue: 28, min: 21, max: 35 },
      { name: 'periodLength', label: 'Длительность менструации (дней)', type: 'number', placeholder: '5', defaultValue: 5, min: 2, max: 8 }
    ],
    outputs: [
      { name: 'nextPeriod', label: 'Следующие месячные', type: 'text' },
      { name: 'ovulationDate', label: 'Овуляция (приблизительно)', type: 'text' },
      { name: 'fertileWindow', label: 'Фертильное окно', type: 'text' },
      { name: 'safeDays', label: 'Безопасные дни', type: 'text' }
    ],
    calculate: (inputs) => {
      const lastStr = String(inputs.lastPeriod);
      const cycle = Number(inputs.cycleLength);
      const periodLen = Number(inputs.periodLength);
      if (!lastStr) return [{ value: '—', label: 'Следующие месячные' }, { value: '—', label: 'Овуляция' }, { value: '—', label: 'Фертильное окно' }, { value: '—', label: 'Безопасные дни' }];
      const last = new Date(lastStr);
      const nextPeriod = new Date(last);
      nextPeriod.setDate(last.getDate() + cycle);
      const ovulation = new Date(last);
      ovulation.setDate(last.getDate() + cycle - 14);
      const fertileStart = new Date(ovulation);
      fertileStart.setDate(ovulation.getDate() - 2);
      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(ovulation.getDate() + 2);
      const safeEnd = new Date(last);
      safeEnd.setDate(last.getDate() + periodLen);
      const safeStart = new Date(nextPeriod);
      safeStart.setDate(nextPeriod.getDate() - 7);
      return [
        { value: nextPeriod.toLocaleDateString('ru-RU'), label: 'Следующие месячные' },
        { value: ovulation.toLocaleDateString('ru-RU'), label: 'Овуляция (приблизительно)' },
        { value: `${fertileStart.toLocaleDateString('ru-RU')} - ${fertileEnd.toLocaleDateString('ru-RU')}`, label: 'Фертильное окно' },
        { value: `До ${safeEnd.toLocaleDateString('ru-RU')} и после ${safeStart.toLocaleDateString('ru-RU')}`, label: 'Безопасные дни' }
      ];
    },
    content: {
      howTo: 'Введите дату начала последней менструации и среднюю длину цикла.',
      about: 'Овуляция обычно происходит за 14 дней до следующей менструации. Это не метод контрацепции!',
      formula: 'Овуляция = ПДМ + (Длина цикла − 14). Фертильное окно: ±2 дня от овуляции.',
      faq: [
        { question: 'Можно ли использовать для контрацепции?', answer: 'Нет! Этот метод ненадёжен (Pearl index 15-25). Используйте презервативы или гормональные методы.' },
        { question: 'Почему даты меняются?', answer: 'Цикл может колебаться из-за стресса, болезни, путешествий. Для точности отслеживайте 3-6 циклов.' }
      ],
      sources: [{ title: 'Менструальный цикл', url: 'https://ru.wikipedia.org/wiki/Менструальный_цикл' }],
      updatedAt: '2026-04-08'
    }
  },
  // 6. Калькулятор климакса
  {
    id: 'menopause-calculator',
    slug: 'klimaks-kalkulyator',
    title: 'Калькулятор климакса',
    description: 'Расчёт возраста наступления менопаузы и перименопаузы',
    category: 'zdorove-i-krasota',
    subcategory: 'detyam',
    type: 'formula',
    inputs: [
      { name: 'birthYear', label: 'Год рождения', type: 'number', placeholder: '1970', defaultValue: 1970, min: 1940, max: 2000 },
      { name: 'motherMenopause', label: 'Возраст менопаузы матери', type: 'number', placeholder: '50', defaultValue: 50, min: 35, max: 65 },
      { name: 'smoking', label: 'Курение', type: 'select', options: [{ value: 'no', label: 'Никогда не курила' }, { value: 'yes', label: 'Курила/курю' }], defaultValue: 'no' }
    ],
    outputs: [
      { name: 'expectedMenopause', label: 'Ожидаемая менопауза', type: 'number', unit: 'лет' },
      { name: 'perimenopause', label: 'Начало перименопаузы', type: 'text' },
      { name: 'currentStatus', label: 'Статус', type: 'text' }
    ],
    calculate: (inputs) => {
      const birthYear = Number(inputs.birthYear);
      const motherAge = Number(inputs.motherMenopause);
      const smoking = String(inputs.smoking);
      const today = new Date().getFullYear();
      const age = today - birthYear;
      let expected = motherAge;
      if (smoking === 'yes') expected -= 2;
      const perimenopauseStart = expected - 4;
      const perimenopauseYear = birthYear + perimenopauseStart;
      let status = '';
      if (age < perimenopauseStart) status = 'Репродуктивный период';
      else if (age < expected) status = 'Перименопауза';
      else status = 'Постменопауза';
      return [
        { value: expected, label: 'Ожидаемая менопауза', unit: 'лет' },
        { value: `Примерно ${perimenopauseYear} (${perimenopauseStart} лет)`, label: 'Начало перименопаузы' },
        { value: status, label: 'Статус' }
      ];
    },
    content: {
      howTo: 'Введите год рождения, возраст менопаузы матери (если известен) и статус курения.',
      about: 'Средний возраст менопаузы — 51 год. На 90% определяется генетикой. Курение ускоряет на 1-2 года.',
      formula: 'Наследуемость менопаузы ~85%. Перименопауза начинается за 2-8 лет до последней менструации.',
      faq: [
        { question: 'Признаки приближающейся менопаузы?', answer: 'Нерегулярность цикла, приливы, потливость, перепады настроения, сухость кожи и слизистых.' },
        { question: 'Можно ли отсрочить менопаузу?', answer: 'Здоровый образ жизни помогает, но основное влияние — генетика. Гормональная терапия не откладывает, но облегчает симптомы.' }
      ],
      sources: [{ title: 'Menopause', url: 'https://www.menopause.org/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 7. Расчёт дневной нормы белка
  {
    id: 'protein-calculator',
    slug: 'norma-belka',
    title: 'Калькулятор нормы белка',
    description: 'Расчёт дневной потребности в белке по весу и активности',
    category: 'zdorove-i-krasota',
    subcategory: 'pitanie-diety',
    type: 'formula',
    inputs: [
      { name: 'weight', label: 'Вес (кг)', type: 'number', placeholder: '70', defaultValue: 70, min: 30, max: 200 },
      { name: 'activityLevel', label: 'Уровень активности', type: 'select', options: [{ value: 'sedentary', label: 'Малоподвижный' }, { value: 'moderate', label: 'Умеренный' }, { value: 'active', label: 'Активный' }, { value: 'athlete', label: 'Спортсмен' }], defaultValue: 'moderate' },
      { name: 'goal', label: 'Цель', type: 'select', options: [{ value: 'maintain', label: 'Поддержание веса' }, { value: 'muscle', label: 'Набор мышц' }, { value: 'fatloss', label: 'Похудение' }], defaultValue: 'maintain' }
    ],
    outputs: [
      { name: 'proteinMin', label: 'Минимум белка', type: 'number', unit: 'г' },
      { name: 'proteinMax', label: 'Оптимум белка', type: 'number', unit: 'г' },
      { name: 'perMeal', label: 'На приём пищи (5x)', type: 'number', unit: 'г' }
    ],
    calculate: (inputs) => {
      const weight = Number(inputs.weight);
      const activity = String(inputs.activityLevel);
      const goal = String(inputs.goal);
      let multiplier = 0.8;
      if (activity === 'moderate') multiplier = 1.2;
      else if (activity === 'active') multiplier = 1.6;
      else if (activity === 'athlete') multiplier = 2.0;
      if (goal === 'muscle') multiplier += 0.3;
      if (goal === 'fatloss') multiplier += 0.2;
      const proteinMin = weight * 0.8;
      const proteinMax = weight * multiplier;
      const perMeal = proteinMax / 5;
      return [
        { value: Math.round(proteinMin), label: 'Минимум белка', unit: 'г' },
        { value: Math.round(proteinMax), label: 'Оптимум белка', unit: 'г' },
        { value: Math.round(perMeal), label: 'На приём пищи (5x)', unit: 'г' }
      ];
    },
    content: {
      howTo: 'Введите вес, уровень активности и цель.',
      about: 'RDA (рекомендуемая дневная норма) — 0.8 г/кг. Для спортсменов и при похудении — 1.6-2.2 г/кг.',
      usage: 'Для планирования рациона и достижения фитнес-целей.',
      formula: 'Белок = Вес × Коэффициент. Коэффициент: 0.8 (базовый), 1.6-2.2 (спорт/похудение).',
      faq: [
        { question: 'Можно ли есть слишком много белка?', answer: 'Здоровые почки справляются с 2-3 г/кг. При заболеваниях почек консультируйтесь с врачом.' },
        { question: 'Какие источники лучше?', answer: 'Животный белок (мясо, рыба, яйца, молочка) содержит все незаменимые аминокислоты. Растительный — комбинируйте разные источники.' }
      ],
      sources: [{ title: 'Protein requirements', url: 'https://pubmed.ncbi.nlm.nih.gov/26764320/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 8. Расчёт гидратации (с учётом климата)
  {
    id: 'hydration-advanced',
    slug: 'gidratacziya-rasshirennaya',
    title: 'Расчёт потребности в воде (расширенный)',
    description: 'Дневная норма воды с учётом климата, активности и диеты',
    category: 'zdorove-i-krasota',
    subcategory: 'pitanie-diety',
    type: 'formula',
    inputs: [
      { name: 'weight', label: 'Вес (кг)', type: 'number', placeholder: '70', defaultValue: 70, min: 30, max: 200 },
      { name: 'climate', label: 'Климат', type: 'select', options: [{ value: 'temperate', label: 'Умеренный' }, { value: 'hot', label: 'Жаркий' }, { value: 'cold', label: 'Холодный' }, { value: 'humid', label: 'Влажный' }], defaultValue: 'temperate' },
      { name: 'exerciseMinutes', label: 'Спорт (минут в день)', type: 'number', placeholder: '30', defaultValue: 30, min: 0, max: 300 },
      { name: 'saltIntake', label: 'Потребление соли', type: 'select', options: [{ value: 'low', label: 'Низкое' }, { value: 'normal', label: 'Нормальное' }, { value: 'high', label: 'Высокое' }], defaultValue: 'normal' }
    ],
    outputs: [
      { name: 'baseWater', label: 'Базовая потребность', type: 'number', unit: 'мл' },
      { name: 'exerciseWater', label: 'Дополнительно для спорта', type: 'number', unit: 'мл' },
      { name: 'climateAdjustment', label: 'Корректировка климата', type: 'number', unit: 'мл' },
      { name: 'totalWater', label: 'Итого воды в день', type: 'number', unit: 'мл' },
      { name: 'glasses', label: 'Стаканов (250 мл)', type: 'number', unit: 'шт' }
    ],
    calculate: (inputs) => {
      const weight = Number(inputs.weight);
      const climate = String(inputs.climate);
      const exercise = Number(inputs.exerciseMinutes);
      const salt = String(inputs.saltIntake);
      const baseWater = weight * 35;
      let climateAdjustment = 0;
      if (climate === 'hot') climateAdjustment = 500;
      else if (climate === 'cold') climateAdjustment = -200;
      else if (climate === 'humid') climateAdjustment = 300;
      const exerciseWater = exercise * 10;
      let saltAdjustment = 0;
      if (salt === 'high') saltAdjustment = 300;
      else if (salt === 'low') saltAdjustment = -150;
      const totalWater = baseWater + climateAdjustment + exerciseWater + saltAdjustment;
      return [
        { value: Math.round(baseWater), label: 'Базовая потребность', unit: 'мл' },
        { value: Math.round(exerciseWater), label: 'Дополнительно для спорта', unit: 'мл' },
        { value: Math.round(climateAdjustment), label: 'Корректировка климата', unit: 'мл' },
        { value: Math.round(totalWater), label: 'Итого воды в день', unit: 'мл' },
        { value: Math.round(totalWater / 250), label: 'Стаканов (250 мл)', unit: 'шт' }
      ];
    },
    content: {
      howTo: 'Введите вес, климат, время спорта и уровень потребления соли.',
      about: 'Базовая формула: 30-35 мл/кг. Добавляйте 400-800 мл на каждый час интенсивной активности.',
      usage: 'Для предотвращения обезвоживания в жаркую погоду или при активных тренировках.',
      formula: 'Вода = Вес × 35 + Спорт × 10 + Корректировка климата.',
      faq: [
        { question: 'Можно ли пить слишком много?', answer: 'Да, гипонатриемия (переизбыток воды) возможна при >1 литра в час. Не превышайте 5-6 литров в день без необходимости.' },
        { question: 'Считать ли чай и кофе?', answer: 'Да, но кофе и чай — мочегонные. Добавляйте 1 стакан воды на каждую чашку кофе.' }
      ],
      sources: [{ title: 'Hydration guidelines', url: 'https://www.efsa.europa.eu/en/efsajournal/pub/1459' }],
      updatedAt: '2026-04-08'
    }
  },
  // 9. Калькулятор аллергии (пищевой)
  {
    id: 'allergy-calculator',
    slug: 'pishhevaya-allergiya',
    title: 'Калькулятор пищевой аллергии',
    description: 'Симптомы и вероятность аллергической реакции на продукты',
    category: 'zdorove-i-krasota',
    subcategory: 'pitanie-diety',
    type: 'reference',
    inputs: [
      { name: 'age', label: 'Возраст (лет)', type: 'number', placeholder: '5', defaultValue: 5, min: 0, max: 100 },
      { name: 'symptoms', label: 'Симптомы', type: 'select', options: [{ value: 'none', label: 'Нет' }, { value: 'mild', label: 'Лёгкие (сыпь, зуд)' }, { value: 'moderate', label: 'Средние (рвота, диарея)' }, { value: 'severe', label: 'Тяжёлые (отёк, удушье)' }], defaultValue: 'mild' },
      { name: 'reactionTime', label: 'Время появления реакции', type: 'select', options: [{ value: 'immediate', label: 'Сразу (<1 час)' }, { value: 'delayed', label: 'Позже (>2 часов)' }], defaultValue: 'immediate' }
    ],
    outputs: [
      { name: 'allergyProbability', label: 'Вероятность аллергии', type: 'text' },
      { name: 'recommendation', label: 'Рекомендации', type: 'text' },
      { name: 'tests', label: 'Рекомендуемые тесты', type: 'text' }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age);
      const symptoms = String(inputs.symptoms);
      const time = String(inputs.reactionTime);
      let prob = 'Низкая';
      if (symptoms === 'severe') prob = 'Высокая';
      else if (symptoms === 'moderate' && time === 'immediate') prob = 'Высокая';
      else if (symptoms === 'moderate') prob = 'Средняя';
      else if (symptoms === 'mild' && time === 'immediate') prob = 'Средняя';
      let rec = 'Наблюдение';
      if (prob === 'Высокая') rec = 'Немедленно обратитесь к аллергологу. Исключите продукт полностью.';
      else if (prob === 'Средняя') rec = 'Запишитесь к аллергологу. Ведите дневник питания.';
      else if (prob === 'Низкая') rec = 'Продолжайте наблюдение. Возможно непереносимость, не аллергия.';
      let tests = 'Нет';
      if (prob !== 'Низкая') tests = 'Кожные пробы, IgE анализ крови, оральная провокация';
      return [
        { value: prob, label: 'Вероятность аллергии' },
        { value: rec, label: 'Рекомендации' },
        { value: tests, label: 'Рекомендуемые тесты' }
      ];
    },
    content: {
      howTo: 'Укажите возраст, выраженность симптомов и время появления реакции.',
      about: 'Пищевая аллергия — иммунная реакция (IgE). Отличается от непереносимости (не иммунная).',
      usage: 'Начальная оценка, не заменяет консультацию врача.',
      formula: 'Оценка по классификации EAACI. Тяжесть + скорость реакции = вероятность.',
      faq: [
        { question: 'Чем отличается аллергия от непереносимости?', answer: 'Аллергия — иммунная реакция (IgE), может быть анафилаксия. Непереносимость — проблемы с пищеварением (лактаза, глютен).' },
        { question: 'Можно ли перерасти аллергию?', answer: 'На молоко и яйца — часто да (к 5-7 годам). На орехи и морепродукты — обычно пожизненно.' }
      ],
      sources: [{ title: 'Food Allergy', url: 'https://www.aaaai.org/conditions-treatments/related-conditions/food-allergy' }],
      updatedAt: '2026-04-08'
    }
  },
  // 10. Расчёт лекарств для животных
  {
    id: 'pet-medication',
    slug: 'lekztva-dlya-zhivotnyh',
    title: 'Дозировка лекарств для животных',
    description: 'Расчёт дозировки лекарств для собак и кошек по весу',
    category: 'zdorove-i-krasota',
    subcategory: 'pitanie-diety',
    type: 'formula',
    inputs: [
      { name: 'petType', label: 'Животное', type: 'select', options: [{ value: 'dog', label: 'Собака' }, { value: 'cat', label: 'Кошка' }], defaultValue: 'dog' },
      { name: 'weight', label: 'Вес (кг)', type: 'number', placeholder: '10', defaultValue: 10, min: 0.5, max: 100 },
      { name: 'medication', label: 'Лекарство', type: 'select', options: [{ value: 'carprofen', label: 'Карпрофен (Rimadyl)' }, { value: 'meloxicam', label: 'Мелоксикам (Metacam)' }, { value: 'amoxicillin', label: 'Амоксициллин' }, { value: 'cephalexin', label: 'Цефалексин' }], defaultValue: 'carprofen' }
    ],
    outputs: [
      { name: 'dose', label: 'Доза', type: 'number', unit: 'мг' },
      { name: 'frequency', label: 'Частота', type: 'text' },
      { name: 'warning', label: 'Важно', type: 'text' }
    ],
    calculate: (inputs) => {
      const pet = String(inputs.petType);
      const weight = Number(inputs.weight);
      const med = String(inputs.medication);
      let dose = 0;
      let freq = '';
      if (med === 'carprofen') { dose = weight * 2.2; freq = '2 раза в день'; }
      else if (med === 'meloxicam') { dose = weight * 0.2; freq = '1 раз в день'; }
      else if (med === 'amoxicillin') { dose = weight * 10; freq = '2 раза в день'; }
      else if (med === 'cephalexin') { dose = weight * 15; freq = '3 раза в день'; }
      if (pet === 'cat' && med === 'carprofen') dose = 0;
      return [
        { value: Math.round(dose), label: 'Доза', unit: 'мг' },
        { value: freq, label: 'Частота' },
        { value: 'Консультируйтесь с ветеринаром перед применением!', label: 'Важно' }
      ];
    },
    content: {
      howTo: 'Выберите животное, введите вес и выберите лекарство.',
      about: 'НИКОГДА не давайте человеческие лекарства без консультации ветеринара! Многие яды для животных (парацетамол, ибупрофен).',
      usage: 'Только для справки! Всегда консультируйтесь с ветеринаром.',
      formula: 'Доза = Вес × Мг/кг (зависит от препарата).',
      faq: [
        { question: 'Можно ли давать парацетамол собаке?', answer: 'НЕТ! Парацетамол токсичен для кошек и собак. Используйте только ветпрепараты.' },
        { question: 'Что делать при передозировке?', answer: 'Немедленно в ветклинику! Привезите упаковку с препаратом.' }
      ],
      sources: [{ title: 'Veterinary dosage', url: 'https://www.plumbveterinarydrugshandbook.com/' }],
      updatedAt: '2026-04-08'
    }
  }
];
