import { Calculator } from '../types';

export const sportsFitnessCalculators: Calculator[] = [
  // 1. Калькулятор FTP (Functional Threshold Power)
  {
    id: 'ftp-calculator',
    slug: 'ftp-moschtnost',
    title: 'FTP калькулятор (велоспорт)',
    description: 'Расчёт функционального порога мощности для велосипедистов',
    category: 'sport',
    subcategory: 'sport-drugoe',
    type: 'formula',
    inputs: [
      { name: 'testPower', label: 'Средняя мощность за 20 мин (ватт)', type: 'number', placeholder: '250', defaultValue: 250, min: 50, max: 600 },
      { name: 'weight', label: 'Вес (кг)', type: 'number', placeholder: '75', defaultValue: 75, min: 40, max: 150 }
    ],
    outputs: [
      { name: 'ftp', label: 'FTP (ватт)', type: 'number', unit: 'ватт' },
      { name: 'ftpPerKg', label: 'FTP на кг', type: 'number', unit: 'ватт/кг' },
      { name: 'category', label: 'Категория', type: 'text' }
    ],
    calculate: (inputs) => {
      const power = Number(inputs.testPower);
      const weight = Number(inputs.weight);
      const ftp = power * 0.95;
      const ftpPerKg = ftp / weight;
      let category = '';
      if (ftpPerKg < 1.5) category = 'Начинающий';
      else if (ftpPerKg < 2.5) category = 'Любитель';
      else if (ftpPerKg < 3.5) category = 'Средний';
      else if (ftpPerKg < 4.5) category = 'Продвинутый';
      else if (ftpPerKg < 5.5) category = 'Элита';
      else category = 'Профессионал';
      return [
        { value: Math.round(ftp), label: 'FTP', unit: 'ватт' },
        { value: Math.round(ftpPerKg * 100) / 100, label: 'FTP на кг', unit: 'ватт/кг' },
        { value: category, label: 'Категория' }
      ];
    },
    content: {
      howTo: 'Проведите 20-минутный тест на максимальную мощность и введите среднее значение.',
      about: 'FTP — мощность, которую можно удерживать ~1 час. Используется для построения тренировочных зон.',
      usage: 'Для планирования тренировок велосипедистами и триатлетами.',
      formula: 'FTP = Средняя мощность за 20 мин × 0.95. Категории по ватт/кг.',
      faq: [
        { question: 'Как провести тест FTP?', answer: '20-минутный максимальный effort после разминки. Старайтесь держать равномерную мощность.' },
        { question: 'Что такое ватт/кг?', answer: 'Относительная мощность. Позволяет сравнивать райдеров разного веса. Профи — 5.5-6.5 ватт/кг.' }
      ],
      sources: [{ title: 'Training and Racing with a Power Meter', url: 'https://www.velopress.com/training-and-racing-with-a-power-meter/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 2. Зоны сердечного ритма (по Каравонену)
  {
    id: 'heart-rate-zones-karvonen',
    slug: 'puls-zony-karvonen',
    title: 'Зоны пульса по Каравонену',
    description: 'Расчёт тренировочных зон по методу Каравонена (HRR)',
    category: 'sport',
    subcategory: 'sport-drugoe',
    type: 'formula',
    inputs: [
      { name: 'maxHR', label: 'Максимальный пульс', type: 'number', placeholder: '185', defaultValue: 185, min: 120, max: 220 },
      { name: 'restHR', label: 'Пульс в покое', type: 'number', placeholder: '60', defaultValue: 60, min: 30, max: 100 }
    ],
    outputs: [
      { name: 'hrr', label: 'HRR (резерв)', type: 'number', unit: 'уд/мин' },
      { name: 'zone1', label: 'Зона 1 (лёгкая)', type: 'text' },
      { name: 'zone2', label: 'Зона 2 (аэробная)', type: 'text' },
      { name: 'zone3', label: 'Зона 3 (темповая)', type: 'text' },
      { name: 'zone4', label: 'Зона 4 (порог)', type: 'text' },
      { name: 'zone5', label: 'Зона 5 (анаэробная)', type: 'text' }
    ],
    calculate: (inputs) => {
      const maxHR = Number(inputs.maxHR);
      const restHR = Number(inputs.restHR);
      const hrr = maxHR - restHR;
      const z1 = `${restHR + Math.round(hrr * 0.5)} - ${restHR + Math.round(hrr * 0.6)}`;
      const z2 = `${restHR + Math.round(hrr * 0.6)} - ${restHR + Math.round(hrr * 0.7)}`;
      const z3 = `${restHR + Math.round(hrr * 0.7)} - ${restHR + Math.round(hrr * 0.8)}`;
      const z4 = `${restHR + Math.round(hrr * 0.8)} - ${restHR + Math.round(hrr * 0.9)}`;
      const z5 = `${restHR + Math.round(hrr * 0.9)} - ${maxHR}`;
      return [
        { value: hrr, label: 'HRR (резерв)', unit: 'уд/мин' },
        { value: z1, label: 'Зона 1 (50-60%)' },
        { value: z2, label: 'Зона 2 (60-70%)' },
        { value: z3, label: 'Зона 3 (70-80%)' },
        { value: z4, label: 'Зона 4 (80-90%)' },
        { value: z5, label: 'Зона 5 (90-100%)' }
      ];
    },
    content: {
      howTo: 'Введите максимальный пульс (или 220-возраст) и пульс в покое (утром в постели).',
      about: 'Метод Каравонена учитывает индивидуальный пульс в покое, что делает его точнее процента от максимума.',
      usage: 'Для точного планирования тренировочной интенсивности.',
      formula: 'Целевой пульс = Покой + (Макс − Покой) × Процент зоны.',
      faq: [
        { question: 'Как определить пульс в покое?', answer: 'Измерьте утром, не вставая с кровати, в течение минуты. Повторите 3 дня, возьмите среднее.' },
        { question: 'Зачем разные зоны?', answer: 'Разные адаптации: Зона 2 — жиросжигание/база, Зона 4 — лактатный порог, Зона 5 — VO2max.' }
      ],
      sources: [{ title: 'Karvonen formula', url: 'https://pubmed.ncbi.nlm.nih.gov/15574097/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 3. Темп бега (пейсинг)
  {
    id: 'running-pace',
    slug: 'temp-bega',
    title: 'Калькулятор темпа бега',
    description: 'Расчёт темпа (мин/км) из скорости или времени дистанции',
    category: 'sport',
    subcategory: 'sport-drugoe',
    type: 'formula',
    inputs: [
      { name: 'distance', label: 'Дистанция (км)', type: 'number', placeholder: '10', defaultValue: 10, min: 0.1, max: 100 },
      { name: 'hours', label: 'Часы', type: 'number', placeholder: '0', defaultValue: 0, min: 0 },
      { name: 'minutes', label: 'Минуты', type: 'number', placeholder: '50', defaultValue: 50, min: 0, max: 59 },
      { name: 'seconds', label: 'Секунды', type: 'number', placeholder: '0', defaultValue: 0, min: 0, max: 59 }
    ],
    outputs: [
      { name: 'totalTime', label: 'Общее время', type: 'text' },
      { name: 'paceMinKm', label: 'Темп мин/км', type: 'text' },
      { name: 'speedKmh', label: 'Скорость', type: 'number', unit: 'км/ч' },
      { name: 'pace400m', label: 'Темп на 400м', type: 'text' }
    ],
    calculate: (inputs) => {
      const distance = Number(inputs.distance);
      const hours = Number(inputs.hours);
      const minutes = Number(inputs.minutes);
      const seconds = Number(inputs.seconds);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      const pacePerKm = totalSeconds / distance;
      const paceMin = Math.floor(pacePerKm / 60);
      const paceSec = Math.round(pacePerKm % 60);
      const speed = (distance / (totalSeconds / 3600));
      const pace400m = (pacePerKm * 0.4);
      const p400min = Math.floor(pace400m / 60);
      const p400sec = Math.round(pace400m % 60);
      return [
        { value: `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`, label: 'Общее время' },
        { value: `${paceMin}:${paceSec.toString().padStart(2, '0')}`, label: 'Темп мин/км' },
        { value: Math.round(speed * 100) / 100, label: 'Скорость', unit: 'км/ч' },
        { value: `${p400min}:${p400sec.toString().padStart(2, '0')}`, label: 'Темп на 400м' }
      ];
    },
    content: {
      howTo: 'Введите дистанцию и время, чтобы получить темп.',
      about: 'Темп — время на километр. Основной показатель в беге для контроля интенсивности.',
      usage: 'Для планирования тренировок и гонок.',
      formula: 'Темп = Время / Дистанция. Скорость = Дистанция / Время × 3600.',
      faq: [
        { question: 'Какой темп считается быстрым?', answer: '4:00 мин/км — хороший темп для любителей. Профи бегут марафон ~3:00 мин/км.' },
        { question: 'Как удерживать темп?', answer: 'Используйте GPS-часы, бегайте на стадионе (400м круги), или с пейсмейкером.' }
      ],
      sources: [{ title: 'Pace calculator', url: 'https://www.runnersworld.com/tools/pace-calculator' }],
      updatedAt: '2026-04-08'
    }
  },
  // 4. Прогноз времени марафона
  {
    id: 'marathon-predictor',
    slug: 'prognoz-marafona',
    title: 'Прогноз времени марафона',
    description: 'Предсказание времени на марафоне по времени на коротких дистанциях',
    category: 'sport',
    subcategory: 'sport-drugoe',
    type: 'formula',
    inputs: [
      { name: 'raceDistance', label: 'Известная дистанция', type: 'select', options: [{ value: '5', label: '5 км' }, { value: '10', label: '10 км' }, { value: '21.1', label: 'Полумарафон' }], defaultValue: '10' },
      { name: 'hours', label: 'Часы', type: 'number', placeholder: '0', defaultValue: 0, min: 0 },
      { name: 'minutes', label: 'Минуты', type: 'number', placeholder: '45', defaultValue: 45, min: 0, max: 59 },
      { name: 'seconds', label: 'Секунды', type: 'number', placeholder: '0', defaultValue: 0, min: 0, max: 59 },
      { name: 'experience', label: 'Опыт в марафоне', type: 'select', options: [{ value: 'first', label: 'Первый марафон' }, { value: 'some', label: '2-3 марафона' }, { value: 'experienced', label: '5+ марафонов' }], defaultValue: 'first' }
    ],
    outputs: [
      { name: 'predictedTime', label: 'Прогноз марафона', type: 'text' },
      { name: 'marathonPace', label: 'Темп марафона', type: 'text' },
      { name: 'range', label: 'Возможный диапазон', type: 'text' }
    ],
    calculate: (inputs) => {
      const dist = Number(inputs.raceDistance);
      const hours = Number(inputs.hours);
      const minutes = Number(inputs.minutes);
      const seconds = Number(inputs.seconds);
      const experience = String(inputs.experience);
      const timeSeconds = hours * 3600 + minutes * 60 + seconds;
      const RiegelTime = timeSeconds * Math.pow(42.195 / dist, 1.06);
      let adjustment = 1.05;
      if (experience === 'some') adjustment = 1.0;
      else if (experience === 'experienced') adjustment = 0.98;
      const predicted = RiegelTime * adjustment;
      const pacePerKm = predicted / 42.195;
      const pMin = Math.floor(pacePerKm / 60);
      const pSec = Math.round(pacePerKm % 60);
      const predHours = Math.floor(predicted / 3600);
      const predMin = Math.floor((predicted % 3600) / 60);
      const rangeMin = predicted * 0.95;
      const rangeMax = predicted * 1.05;
      return [
        { value: `${predHours}:${predMin.toString().padStart(2, '0')}`, label: 'Прогноз марафона' },
        { value: `${pMin}:${pSec.toString().padStart(2, '0')}`, label: 'Темп марафона' },
        { value: `±5% от прогноза`, label: 'Возможный диапазон' }
      ];
    },
    content: {
      howTo: 'Введите время на известной дистанции и уровень опыта марафона.',
      about: 'Формула Ригеля: T2 = T1 × (D2/D1)^1.06. Для первого марафона добавьте 5-10%.',
      usage: 'Для планирования стартового темпа и ожиданий от дебютного марафона.',
      formula: 'Прогноз = Время × (42.195/Дистанция)^1.06 × Коэффициент опыта.',
      faq: [
        { question: 'Насколько точен прогноз?', answer: 'Для опытных бегунов — ±3%. Для дебютантов часто занижает на 10-15 минут из-за неопытности на последних км.' },
        { question: 'Почему не просто удвоить полумарафон?', answer: 'Марафон — не линейная дистанция. После 30 км "ударяет стена" ( glycogen depletion ).' }
      ],
      sources: [{ title: 'Riegel formula', url: 'https://runnersconnect.net/running-pace-calculator/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 5. Скорость плавания
  {
    id: 'swimming-pace',
    slug: 'skorost-plavaniya',
    title: 'Калькулятор скорости плавания',
    description: 'Расчёт темпа на 100м и скорости для разных бассейнов',
    category: 'sport',
    subcategory: 'sport-drugoe',
    type: 'formula',
    inputs: [
      { name: 'distance', label: 'Дистанция (м)', type: 'number', placeholder: '1000', defaultValue: 1000, min: 50, max: 10000 },
      { name: 'minutes', label: 'Минуты', type: 'number', placeholder: '20', defaultValue: 20, min: 0, max: 120 },
      { name: 'seconds', label: 'Секунды', type: 'number', placeholder: '0', defaultValue: 0, min: 0, max: 59 },
      { name: 'poolLength', label: 'Длина бассейна', type: 'select', options: [{ value: '25', label: '25 м' }, { value: '50', label: '50 м' }], defaultValue: '25' }
    ],
    outputs: [
      { name: 'pace100m', label: 'Темп на 100м', type: 'text' },
      { name: 'speedMs', label: 'Скорость', type: 'number', unit: 'м/с' },
      { name: 'timePerLength', label: 'Время на дистанцию', type: 'text' },
      { name: 'swolf', label: 'SWOLF (25м)', type: 'number' }
    ],
    calculate: (inputs) => {
      const distance = Number(inputs.distance);
      const minutes = Number(inputs.minutes);
      const seconds = Number(inputs.seconds);
      const poolLength = Number(inputs.poolLength);
      const totalSeconds = minutes * 60 + seconds;
      const pace100m = (totalSeconds / distance) * 100;
      const paceMin = Math.floor(pace100m / 60);
      const paceSec = Math.round(pace100m % 60);
      const speed = distance / totalSeconds;
      const timePerLength = (totalSeconds / distance) * poolLength;
      const tMin = Math.floor(timePerLength / 60);
      const tSec = Math.round(timePerLength % 60);
      const swolf = Math.round(pace100m) + (100 / poolLength);
      return [
        { value: `${paceMin}:${paceSec.toString().padStart(2, '0')}`, label: 'Темп на 100м' },
        { value: Math.round(speed * 100) / 100, label: 'Скорость', unit: 'м/с' },
        { value: `${tMin}:${tSec.toString().padStart(2, '0')}`, label: `Время на ${poolLength}м` },
        { value: Math.round(swolf), label: 'SWOLF (25м)' }
      ];
    },
    content: {
      howTo: 'Введите дистанцию и время плавания.',
      about: 'Темп плавания измеряется на 100м. SWOLF = время (сек) + гребки (чем меньше, тем эффективнее).',
      usage: 'Для отслеживания прогресса в плавании.',
      formula: 'Темп 100м = (Время / Дистанция) × 100. SWOLF = Время на дистанцию + Количество гребков.',
      faq: [
        { question: 'Что такое SWOLF?', answer: 'Swim Golf — показатель эффективности. Хороший показатель для любителей: 35-45 на 25м.' },
        { question: 'Бассейн 25м или 50м — разница?', answer: '50м быстрее (меньше поворотов). Разница ~1-2 сек на 100м.' }
      ],
      sources: [{ title: 'Swimming pace', url: 'https://www.swimsmooth.com/training.html' }],
      updatedAt: '2026-04-08'
    }
  },
  // 6. Калькулятор VDOT
  {
    id: 'vdot-calculator',
    slug: 'vdot-dzhek-deniels',
    title: 'Калькулятор VDOT Джека Дэниэлса',
    description: 'Расчёт VO2max и тренировочных темпов по таблицам Дэниэлса',
    category: 'sport',
    subcategory: 'sport-drugoe',
    type: 'formula',
    inputs: [
      { name: 'distance', label: 'Дистанция', type: 'select', options: [{ value: '1500', label: '1500 м' }, { value: '3000', label: '3000 м' }, { value: '5000', label: '5 км' }, { value: '10000', label: '10 км' }, { value: '21100', label: 'Полумарафон' }, { value: '42195', label: 'Марафон' }], defaultValue: '5000' },
      { name: 'minutes', label: 'Минуты', type: 'number', placeholder: '25', defaultValue: 25, min: 0, max: 300 },
      { name: 'seconds', label: 'Секунды', type: 'number', placeholder: '0', defaultValue: 0, min: 0, max: 59 }
    ],
    outputs: [
      { name: 'vdot', label: 'VDOT', type: 'number' },
      { name: 'easyPace', label: 'Лёгкий бег', type: 'text' },
      { name: 'marathonPace', label: 'Темп марафона', type: 'text' },
      { name: 'thresholdPace', label: 'Пороговый темп', type: 'text' },
      { name: 'intervalPace', label: 'Интервальный', type: 'text' },
      { name: 'repPace', label: 'Повторы', type: 'text' }
    ],
    calculate: (inputs) => {
      const dist = Number(inputs.distance);
      const min = Number(inputs.minutes);
      const sec = Number(inputs.seconds);
      const time = min + sec / 60;
      const velocity = dist / time;
      const percentVO2 = 0.8 + 0.1894393 * Math.exp(-0.012778 * time) + 0.2989558 * Math.exp(-0.1932605 * time);
      const vo2 = -4.60 + 0.182258 * velocity + 0.000104 * velocity * velocity;
      const vdot = vo2 / percentVO2;
      const easyMinKm = (16 / (vdot * 0.7)) * 1000;
      const maraMinKm = (16 / (vdot * 0.85)) * 1000;
      const threshMinKm = (16 / (vdot * 0.9)) * 1000;
      const interMinKm = (16 / (vdot * 0.98)) * 1000;
      const repMinKm = (16 / (vdot * 1.05)) * 1000;
      const formatPace = (pace: number) => {
        const m = Math.floor(pace);
        const s = Math.round((pace - m) * 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
      };
      return [
        { value: Math.round(vdot * 10) / 10, label: 'VDOT' },
        { value: `${formatPace(easyMinKm - 0.3)}-${formatPace(easyMinKm + 0.3)}`, label: 'Лёгкий бег' },
        { value: formatPace(maraMinKm), label: 'Темп марафона' },
        { value: formatPace(threshMinKm), label: 'Пороговый темп' },
        { value: formatPace(interMinKm), label: 'Интервальный' },
        { value: formatPace(repMinKm), label: 'Повторы' }
      ];
    },
    content: {
      howTo: 'Введите время на известной дистанции. Калькулятор оценит VDOT и даст тренировочные темпа.',
      about: 'VDOT — показатель, разработанный Джеком Дэниэлсом для оценки аэробной формы.',
      usage: 'Для планирования тренировок бегунов всех уровней.',
      formula: 'VDOT основан на VO2max с корректировкой на эффективность бега.',
      faq: [
        { question: 'Что означают темпа E, M, T, I, R?', answer: 'Easy (лёгкий), Marathon (марафонский), Threshold (порог), Interval (интервальный), Repetition (повторы).' },
        { question: 'Какой темп для длительных пробежек?', answer: 'Easy pace — можно разговаривать полными предложениями. Обычно на 60-90 сек медленнее темпа марафона.' }
      ],
      sources: [{ title: 'Daniels RUNNING Formula', url: 'https://runsmartproject.com/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 7. Тренировочная нагрузка (TSS/CTL)
  {
    id: 'training-load',
    slug: 'trenirovochnaya-nagruzka',
    title: 'Калькулятор тренировочной нагрузки',
    description: 'Расчёт TSS (Training Stress Score) для планирования формы',
    category: 'sport',
    subcategory: 'sport-drugoe',
    type: 'formula',
    inputs: [
      { name: 'duration', label: 'Длительность (мин)', type: 'number', placeholder: '60', defaultValue: 60, min: 10, max: 600 },
      { name: 'normalizedPower', label: 'Нормализованная мощность (NP)', type: 'number', placeholder: '200', defaultValue: 200, min: 50, max: 500 },
      { name: 'ftp', label: 'FTP (ватт)', type: 'number', placeholder: '250', defaultValue: 250, min: 50, max: 500 },
      { name: 'intensityFactor', label: 'IF (Intensity Factor)', type: 'number', placeholder: '0.8', defaultValue: 0.8, min: 0.4, max: 1.5, step: 0.01 }
    ],
    outputs: [
      { name: 'tss', label: 'TSS', type: 'number' },
      { name: 'weeklyTSS', label: 'Недельный TSS (×7)', type: 'number' },
      { name: 'loadCategory', label: 'Категория нагрузки', type: 'text' }
    ],
    calculate: (inputs) => {
      const duration = Number(inputs.duration);
      const np = Number(inputs.normalizedPower);
      const ftp = Number(inputs.ftp);
      const ifVal = Number(inputs.intensityFactor);
      const tss = (duration * np * ifVal) / (ftp * 3600) * 100;
      const weekly = tss * 7;
      let category = '';
      if (weekly < 200) category = 'Восстановление';
      else if (weekly < 400) category = 'Базовая';
      else if (weekly < 600) category = 'Построение';
      else if (weekly < 800) category = 'Высокая';
      else category = 'Пиковая';
      return [
        { value: Math.round(tss), label: 'TSS' },
        { value: Math.round(weekly), label: 'Недельный TSS' },
        { value: category, label: 'Категория нагрузки' }
      ];
    },
    content: {
      howTo: 'Введите длительность тренировки, NP (или мощность), FTP и IF.',
      about: 'TSS позволяет сравнивать нагрузку разных тренировок. 100 TSS ≈ 1 час на FTP.',
      usage: 'Для периодизации и отслеживания формы (CTL — хроническая тренировочная нагрузка).',
      formula: 'TSS = (Длительность × NP × IF) / (FTP × 3600) × 100.',
      faq: [
        { question: 'Какой недельный TSS нормальный?', answer: 'Любители: 300-500. Категорийные гонщики: 600-900. Профи: 800-1200.' },
        { question: 'Что такое CTL?', answer: 'Chronic Training Load — средняя нагрузка за 42 дня. Показывает текущую форму.' }
      ],
      sources: [{ title: 'Training Stress Score', url: 'https://www.trainingpeaks.com/learn/articles/what-is-training-stress-score-tss/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 8. Калькулятор гидратации спортсмена
  {
    id: 'athlete-hydration',
    slug: 'gidratacziya-sportsmena',
    title: 'Гидратация во время тренировки',
    description: 'Сколько пить во время длительных тренировок и гонок',
    category: 'sport',
    subcategory: 'sport-drugoe',
    type: 'formula',
    inputs: [
      { name: 'weightBefore', label: 'Вес до (кг)', type: 'number', placeholder: '70', defaultValue: 70, min: 30, max: 150 },
      { name: 'weightAfter', label: 'Вес после (кг)', type: 'number', placeholder: '69.5', defaultValue: 69.5, min: 30, max: 150 },
      { name: 'duration', label: 'Длительность (мин)', type: 'number', placeholder: '90', defaultValue: 90, min: 30, max: 600 },
      { name: 'fluidConsumed', label: 'Выпито жидкости (мл)', type: 'number', placeholder: '500', defaultValue: 500, min: 0, max: 5000 }
    ],
    outputs: [
      { name: 'sweatLoss', label: 'Потеря жидкости', type: 'number', unit: 'л' },
      { name: 'sweatRate', label: 'Скорость потоотделения', type: 'number', unit: 'л/ч' },
      { name: 'recommendedIntake', label: 'Рекомендуемое потребление', type: 'number', unit: 'мл/ч' }
    ],
    calculate: (inputs) => {
      const before = Number(inputs.weightBefore);
      const after = Number(inputs.weightAfter);
      const duration = Number(inputs.duration);
      const consumed = Number(inputs.fluidConsumed);
      const sweatLoss = (before - after) + consumed / 1000;
      const sweatRate = (sweatLoss / duration) * 60;
      const recommended = sweatRate * 1000 * 0.8;
      return [
        { value: Math.round(sweatLoss * 10) / 10, label: 'Потеря жидкости', unit: 'л' },
        { value: Math.round(sweatRate * 10) / 10, label: 'Скорость потоотделения', unit: 'л/ч' },
        { value: Math.round(recommended), label: 'Рекомендуемое потребление', unit: 'мл/ч' }
      ];
    },
    content: {
      howTo: 'Взвесьтесь до и после тренировки (в похожих условиях), учтите выпитую жидкость.',
      about: 'Индивидуальная скорость потоотделения: 0.5-2.5 литра в час. Зависит от генетики, температуры, влажности.',
      usage: 'Для планирования гидратации на длительных тренировках и гонках.',
      formula: 'Потеря = (Вес до − Вес после) + Выпито. Скорость = Потеря / Время × 60.',
      faq: [
        { question: 'Сколько пить во время марафона?', answer: 'Индивидуально! 400-800 мл в час. Не более 1 л/ч чтобы избежать гипонатриемии.' },
        { question: 'Нужен ли электролитный напиток?', answer: 'До 1 часа — обычная вода. 1-2 часа — изотоник. Более 2 часов — с натрием (500-700 мг/л).' }
      ],
      sources: [{ title: 'Sweat rate calculator', url: 'https://www.gssiweb.org/sports-science-exchange/article/sweat-rate-and-sodium-loss' }],
      updatedAt: '2026-04-08'
    }
  },
  // 9. Калькулятор питания во время тренировки
  {
    id: 'training-nutrition',
    slug: 'pitanie-vo-vremya-trenirovki',
    title: 'Питание во время длительных тренировок',
    description: 'Сколько углеводов нужно во время тренировки разной длительности',
    category: 'sport',
    subcategory: 'sport-drugoe',
    type: 'formula',
    inputs: [
      { name: 'duration', label: 'Планируемая длительность (мин)', type: 'number', placeholder: '120', defaultValue: 120, min: 30, max: 600 },
      { name: 'intensity', label: 'Интенсивность', type: 'select', options: [{ value: 'low', label: 'Низкая (<50% FTP)' }, { value: 'moderate', label: 'Средняя (50-75% FTP)' }, { value: 'high', label: 'Высокая (>75% FTP)' }], defaultValue: 'moderate' },
      { name: 'weight', label: 'Вес (кг)', type: 'number', placeholder: '70', defaultValue: 70, min: 40, max: 150 }
    ],
    outputs: [
      { name: 'carbsNeeded', label: 'Углеводов нужно', type: 'number', unit: 'г' },
      { name: 'carbsPerHour', label: 'В час', type: 'number', unit: 'г/ч' },
      { name: 'gelEquivalent', label: 'Эквивалент гелей', type: 'number', unit: 'шт' },
      { name: 'timing', label: 'Когда принимать', type: 'text' }
    ],
    calculate: (inputs) => {
      const duration = Number(inputs.duration);
      const intensity = String(inputs.intensity);
      const weight = Number(inputs.weight);
      let carbsPerHour = 0;
      if (intensity === 'low') carbsPerHour = 20;
      else if (intensity === 'moderate') carbsPerHour = 40;
      else carbsPerHour = 60;
      const totalCarbs = (duration / 60) * carbsPerHour;
      const gels = Math.ceil(totalCarbs / 25);
      let timing = '';
      if (duration < 60) timing = 'Не нужно';
      else if (duration < 90) timing = 'С 45-й минуты';
      else timing = 'С 30-й минуты, каждые 20-30 мин';
      return [
        { value: Math.round(totalCarbs), label: 'Углеводов нужно', unit: 'г' },
        { value: carbsPerHour, label: 'В час', unit: 'г/ч' },
        { value: gels, label: 'Эквивалент гелей', unit: 'шт' },
        { value: timing, label: 'Когда принимать' }
      ];
    },
    content: {
      howTo: 'Введите планируемую длительность и интенсивность тренировки.',
      about: 'Гликоген хватает на ~90 минут. После этого нужны углеводы извне — 30-60 г/час.',
      usage: 'Для марафонов, велогонок, триатлона и длительных тренировок.',
      formula: 'До 60 мин — не нужно. 60-120 мин — 30 г/ч. Более 2.5 ч — 60-90 г/ч (с фруктозой).',
      faq: [
        { question: 'Что лучше — гели, батончики или изотоник?', answer: 'Гели — быстро, но риск желудочных проблем. Изотоник — одновременно жидкость. Батончики — для низкой интенсивности.' },
        { question: 'Что такое тренировка ЖКТ?', answer: 'Желудочно-кишечный тракт нужно тренировать принимать углеводы, как и мышцы. Практикуйте на длинных тренировках.' }
      ],
      sources: [{ title: 'Carbohydrate intake during exercise', url: 'https://pubmed.ncbi.nlm.nih.gov/21132043/' }],
      updatedAt: '2026-04-08'
    }
  },
  // 10. Восстановление после тренировки
  {
    id: 'recovery-calculator',
    slug: 'vosstanovlenie-posle',
    title: 'Калькулятор восстановления',
    description: 'Оценка времени восстановления после разных типов тренировок',
    category: 'sport',
    subcategory: 'sport-drugoe',
    type: 'formula',
    inputs: [
      { name: 'tss', label: 'TSS тренировки', type: 'number', placeholder: '150', defaultValue: 150, min: 10, max: 500 },
      { name: 'experience', label: 'Уровень подготовки', type: 'select', options: [{ value: 'beginner', label: 'Начинающий' }, { value: 'intermediate', label: 'Средний' }, { value: 'advanced', label: 'Продвинутый' }], defaultValue: 'intermediate' },
      { name: 'age', label: 'Возраст', type: 'number', placeholder: '35', defaultValue: 35, min: 18, max: 70 },
      { name: 'sleep', label: 'Сон (часов)', type: 'number', placeholder: '7', defaultValue: 7, min: 4, max: 12 }
    ],
    outputs: [
      { name: 'baseRecovery', label: 'Базовое восстановление', type: 'number', unit: 'ч' },
      { name: 'adjustedRecovery', label: 'С учётом факторов', type: 'number', unit: 'ч' },
      { name: 'readyFor', label: 'Готов к', type: 'text' },
      { name: 'recommendations', label: 'Рекомендации', type: 'text' }
    ],
    calculate: (inputs) => {
      const tss = Number(inputs.tss);
      const exp = String(inputs.experience);
      const age = Number(inputs.age);
      const sleep = Number(inputs.sleep);
      let baseRecovery = tss / 10;
      if (exp === 'beginner') baseRecovery *= 1.3;
      else if (exp === 'advanced') baseRecovery *= 0.8;
      if (age > 50) baseRecovery *= 1.2;
      if (sleep < 7) baseRecovery *= 1.2;
      const adjusted = Math.round(baseRecovery);
      let readyFor = '';
      if (adjusted < 12) readyFor = 'Лёгкой тренировке завтра';
      else if (adjusted < 24) readyFor = 'Средней тренировке через день';
      else if (adjusted < 48) readyFor = 'Тяжёлой тренировке через 2 дня';
      else readyFor = 'Отдыху 2-3 дня';
      let recs = '';
      if (sleep < 7) recs = 'Увеличьте сон. ';
      if (tss > 200) recs += 'Активное восстановление: лёгкий велосипед/плавание. ';
      recs += 'Протеин в течение 30 минут после тренировки.';
      return [
        { value: Math.round(tss / 10), label: 'Базовое восстановление', unit: 'ч' },
        { value: adjusted, label: 'С учётом факторов', unit: 'ч' },
        { value: readyFor, label: 'Готов к' },
        { value: recs, label: 'Рекомендации' }
      ];
    },
    content: {
      howTo: 'Введите TSS тренировки, уровень подготовки, возраст и качество сна.',
      about: 'Восстановление индивидуально. Начинающим нужно больше времени, возраст и недосып замедляют восстановление.',
      usage: 'Для планирования тренировочных блоков и недель.',
      formula: 'Базовое восстановление = TSS / 10 часов. Корректировки на возраст и опыт.',
      faq: [
        { question: 'Что такое активное восстановление?', answer: 'Очень лёгкая тренировка (HR < 65% от макс) на следующий день после тяжёлой. Ускоряет восстановление.' },
        { question: 'Как ускорить восстановление?', answer: 'Сон 7-9 часов, питание (белок+углеводы), гидратация, массаж/foam roller, стресс-менеджмент.' }
      ],
      sources: [{ title: 'Recovery in sport', url: 'https://pubmed.ncbi.nlm.nih.gov/22343511/' }],
      updatedAt: '2026-04-08'
    }
  }
];
