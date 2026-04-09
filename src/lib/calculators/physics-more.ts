import { Calculator } from '../types';

export const physicsMoreCalculators: Calculator[] = [
  // 1. Скорость звука
  {
    id: 'sound-speed',
    slug: 'skorost-zvuka',
    title: 'Скорость звука в разных средах',
    description: 'Расчёт скорости звука в воздухе, воде, металлах и других средах при разной температуре',
    category: 'nauka-i-ucheba',
    subcategory: 'fizika',
    type: 'formula',
    inputs: [
      { name: 'temperature', label: 'Температура (°C)', type: 'number', placeholder: '20', defaultValue: 20, min: -50, max: 100 },
      { name: 'medium', label: 'Среда', type: 'select', options: [{ value: 'air', label: 'Воздух' }, { value: 'water', label: 'Вода' }, { value: 'steel', label: 'Сталь' }, { value: 'wood', label: 'Древесина' }], defaultValue: 'air' }
    ],
    outputs: [
      { name: 'speed', label: 'Скорость звука', type: 'number', unit: 'м/с' }
    ],
    calculate: (inputs) => {
      const temp = Number(inputs.temperature);
      const medium = String(inputs.medium);
      let speed = 0;
      switch (medium) {
        case 'air': speed = 331.3 + 0.606 * temp; break;
        case 'water': speed = 1402.7 + 4.8 * temp; break;
        case 'steel': speed = 5000 + 0.5 * temp; break;
        case 'wood': speed = 3300 + 0.3 * temp; break;
      }
      return [{ value: Math.round(speed), label: 'Скорость звука', unit: 'м/с' }];
    },
    content: {
      howTo: 'Выберите среду и введите температуру. Калькулятор рассчитает скорость звука.',
      about: 'Скорость звука зависит от упругости и плотности среды. В воздухе при 0°C составляет 331 м/с.',
      formula: 'В воздухе: v = 331.3 + 0.606×t (м/с), где t — температура в °C.',
      faq: [
        { question: 'Почему звук быстрее в воде?', answer: 'Вода плотнее воздуха и более упругая, поэтому колебания передаются быстрее (≈1500 м/с).' },
        { question: 'А в космосе?', answer: 'В космосе звук не распространяется, так как нет материальной среды.' }
      ],
      sources: [{ title: 'Физика звука', url: 'https://ru.wikipedia.org/wiki/Скорость_звука' }],
      updatedAt: '2026-04-07'
    }
  },
  // 2. Эффект Доплера
  {
    id: 'doppler-effect',
    slug: 'effekt-doplera',
    title: 'Эффект Доплера',
    description: 'Расчёт изменения частоты звука при движении источника или наблюдателя',
    category: 'nauka-i-ucheba',
    subcategory: 'fizika',
    type: 'formula',
    inputs: [
      { name: 'sourceFreq', label: 'Частота источника (Гц)', type: 'number', placeholder: '1000', defaultValue: 1000, min: 1 },
      { name: 'sourceSpeed', label: 'Скорость источника (м/с)', type: 'number', placeholder: '0', defaultValue: 0 },
      { name: 'observerSpeed', label: 'Скорость наблюдателя (м/с)', type: 'number', placeholder: '0', defaultValue: 0 },
      { name: 'soundSpeed', label: 'Скорость звука (м/с)', type: 'number', placeholder: '343', defaultValue: 343, min: 1 }
    ],
    outputs: [
      { name: 'observedFreq', label: 'Наблюдаемая частота', type: 'number', unit: 'Гц' }
    ],
    calculate: (inputs) => {
      const f0 = Number(inputs.sourceFreq);
      const vs = Number(inputs.sourceSpeed);
      const vo = Number(inputs.observerSpeed);
      const v = Number(inputs.soundSpeed);
      const f = f0 * (v + vo) / (v - vs);
      return [{ value: Math.round(f * 10) / 10, label: 'Наблюдаемая частота', unit: 'Гц' }];
    },
    content: {
      howTo: 'Введите частоту источника, скорости источника и наблюдателя, скорость звука.',
      about: 'Эффект Доплера — изменение частоты волны при движении источника или наблюдателя относительно среды.',
      usage: 'Используется в радарах, ультразвуковой диагностике, астрономии.',
      formula: 'f = f₀ × (v + vₙ) / (v − vᵢ), где v — скорость звука, vₙ — скорость наблюдателя, vᵢ — скорость источника.',
      faq: [
        { question: 'Почему звук меняется у проезжающей машины?', answer: 'При приближении частота выше (звук выше), при удалении — ниже (звук ниже).' },
        { question: 'Работает ли для света?', answer: 'Да, применяется в астрономии для определения скорости удаления галактик (красное смещение).' }
      ],
      sources: [{ title: 'Эффект Доплера — Википедия', url: 'https://ru.wikipedia.org/wiki/Эффект_Доплера' }],
      updatedAt: '2026-04-07'
    }
  },
  // 3. Радиоактивный распад
  {
    id: 'radioactive-decay',
    slug: 'radioaktivnyj-raspad',
    title: 'Радиоактивный распад',
    description: 'Расчёт оставшегося количества вещества и периода полураспада',
    category: 'nauka-i-ucheba',
    subcategory: 'fizika',
    type: 'formula',
    inputs: [
      { name: 'initialAmount', label: 'Начальное количество', type: 'number', placeholder: '100', defaultValue: 100, min: 0 },
      { name: 'halfLife', label: 'Период полураспада', type: 'number', placeholder: '10', defaultValue: 10, min: 0.001 },
      { name: 'time', label: 'Время (такие же единицы)', type: 'number', placeholder: '20', defaultValue: 20, min: 0 }
    ],
    outputs: [
      { name: 'remaining', label: 'Оставшееся количество', type: 'number' },
      { name: 'decayed', label: 'Распавшееся количество', type: 'number' },
      { name: 'halfLives', label: 'Прошло полупериодов', type: 'number' }
    ],
    calculate: (inputs) => {
      const N0 = Number(inputs.initialAmount);
      const T = Number(inputs.halfLife);
      const t = Number(inputs.time);
      const remaining = N0 * Math.pow(0.5, t / T);
      const decayed = N0 - remaining;
      const halfLives = t / T;
      return [
        { value: Math.round(remaining * 100) / 100, label: 'Оставшееся количество' },
        { value: Math.round(decayed * 100) / 100, label: 'Распавшееся количество' },
        { value: Math.round(halfLives * 10) / 10, label: 'Прошло полупериодов' }
      ];
    },
    content: {
      howTo: 'Введите начальное количество вещества, период полураспада и время.',
      about: 'Радиоактивный распад следует закону N = N₀ × (1/2)^(t/T), где T — период полураспада.',
      usage: 'Для расчёта датировки образцов, медицинских изотопов, ядерной безопасности.',
      formula: 'N = N₀ × (1/2)^(t/T). После n полупериодов остаётся (1/2)ⁿ от начального количества.',
      faq: [
        { question: 'Что такое период полураспада?', answer: 'Время, за которое распадается половина ядер радиоактивного вещества.' },
        { question: 'Примеры периодов полураспада?', answer: 'Углерод-14: 5730 лет (датировка), Йод-131: 8 дней (медицина), Уран-238: 4.5 млрд лет.' }
      ],
      sources: [{ title: 'Радиоактивность — Википедия', url: 'https://ru.wikipedia.org/wiki/Радиоактивный_распад' }],
      updatedAt: '2026-04-07'
    }
  },
  // 4. Преобразование энергии (E=mc²)
  {
    id: 'mass-energy',
    slug: 'e-mc-kvadrat',
    title: 'Эквивалентность массы и энергии',
    description: 'Расчёт энергии по формуле E=mc² Эйнштейна',
    category: 'nauka-i-ucheba',
    subcategory: 'fizika',
    type: 'formula',
    inputs: [
      { name: 'mass', label: 'Масса (кг)', type: 'number', placeholder: '1', defaultValue: 1, min: 0, step: 0.001 },
      { name: 'unit', label: 'Единица вывода', type: 'select', options: [{ value: 'joules', label: 'Джоули' }, { value: 'kwh', label: 'кВт·ч' }, { value: 'tons', label: 'ТНТ (тонны)' }], defaultValue: 'joules' }
    ],
    outputs: [
      { name: 'energy', label: 'Энергия', type: 'number' }
    ],
    calculate: (inputs) => {
      const mass = Number(inputs.mass);
      const unit = String(inputs.unit);
      const c = 299792458;
      const energyJoules = mass * c * c;
      let result = 0;
      let unitLabel = '';
      switch (unit) {
        case 'joules': result = energyJoules; unitLabel = 'Дж'; break;
        case 'kwh': result = energyJoules / 3600000; unitLabel = 'кВт·ч'; break;
        case 'tons': result = energyJoules / 4184000000; unitLabel = 'тонн ТНТ'; break;
      }
      return [{ value: Math.round(result * 100) / 100, label: 'Энергия', unit: unitLabel }];
    },
    content: {
      howTo: 'Введите массу и выберите единицу для вывода энергии.',
      about: 'Формула E=mc² показывает, что масса — это форма энергии. c — скорость света (≈300,000 км/с).',
      usage: 'Объясняет энергию ядерных реакций и звёзд.',
      formula: 'E = m × c², где c = 299,792,458 м/с.',
      faq: [
        { question: 'Сколько энергии в 1 кг массы?', answer: '≈9×10¹⁶ Дж = 25 миллиардов кВт·ч ≈ 21.5 мегатонн ТНТ.' },
        { question: 'Почему в атомной бомбе так много энергии?', answer: 'При делении ядер часть массы превращается в энергию по формуле E=mc².' }
      ],
      sources: [{ title: 'Теория относительности', url: 'https://ru.wikipedia.org/wiki/Эквивалентность_массы_и_энергии' }],
      updatedAt: '2026-04-07'
    }
  },
  // 5. Преломление света (Закон Снеллиуса)
  {
    id: 'light-refraction',
    slug: 'zakon-snelliusa',
    title: 'Преломление света (Закон Снеллиуса)',
    description: 'Расчёт угла преломления света при переходе между средами',
    category: 'nauka-i-ucheba',
    subcategory: 'fizika',
    type: 'formula',
    inputs: [
      { name: 'angle', label: 'Угол падения (°)', type: 'number', placeholder: '45', defaultValue: 45, min: 0, max: 90 },
      { name: 'n1', label: 'Показатель преломления среды 1', type: 'number', placeholder: '1', defaultValue: 1, min: 1, max: 3 },
      { name: 'n2', label: 'Показатель преломления среды 2', type: 'number', placeholder: '1.5', defaultValue: 1.5, min: 1, max: 3 }
    ],
    outputs: [
      { name: 'refractionAngle', label: 'Угол преломления', type: 'number', unit: '°' },
      { name: 'criticalAngle', label: 'Предельный угол', type: 'number', unit: '°' }
    ],
    calculate: (inputs) => {
      const angle = Number(inputs.angle);
      const n1 = Number(inputs.n1);
      const n2 = Number(inputs.n2);
      const sinRefraction = n1 * Math.sin(angle * Math.PI / 180) / n2;
      const refractionAngle = Math.asin(Math.min(1, sinRefraction)) * 180 / Math.PI;
      const criticalAngle = n1 > n2 ? Math.asin(n2 / n1) * 180 / Math.PI : null;
      return [
        { value: Math.round(refractionAngle * 10) / 10, label: 'Угол преломления', unit: '°' },
        { value: criticalAngle ? Math.round(criticalAngle * 10) / 10 : '—', label: 'Предельный угол', unit: criticalAngle ? '°' : '' }
      ];
    },
    content: {
      howTo: 'Введите угол падения и показатели преломления сред.',
      about: 'Закон Снеллиуса: n₁×sin(θ₁) = n₂×sin(θ₂). Описывает преломление света на границе сред.',
      usage: 'Объясняет работу линз, оптики, радуги, кажущееся изменение положения предметов в воде.',
      formula: 'n₁ × sin(θ₁) = n₂ × sin(θ₂). Предельный угол = arcsin(n₂/n₁) при n₁ > n₂.',
      faq: [
        { question: 'Почему соломка в воде кажется изогнутой?', answer: 'Свет преломляется на границе воздух-вода, поэтому мы видим соломку не там, где она есть.' },
        { question: 'Что такое полное внутреннее отражение?', answer: 'При угле падения больше предельного свет отражается обратно, не выходя из среды. Используется в оптоволокне.' }
      ],
      sources: [{ title: 'Закон Снеллиуса', url: 'https://ru.wikipedia.org/wiki/Закон_Снеллиуса' }],
      updatedAt: '2026-04-07'
    }
  },
  // 6. Момент инерции
  {
    id: 'moment-of-inertia',
    slug: 'moment-inertsii',
    title: 'Момент инерции тел',
    description: 'Расчёт момента инерции для различных форм тел',
    category: 'nauka-i-ucheba',
    subcategory: 'fizika',
    type: 'formula',
    inputs: [
      { name: 'mass', label: 'Масса (кг)', type: 'number', placeholder: '10', defaultValue: 10, min: 0 },
      { name: 'radius', label: 'Радиус / длина (м)', type: 'number', placeholder: '0.5', defaultValue: 0.5, min: 0 },
      { name: 'shape', label: 'Форма тела', type: 'select', options: [{ value: 'point', label: 'Материальная точка' }, { value: 'disk', label: 'Диск (ось через центр)' }, { value: 'sphere', label: 'Шар' }, { value: 'rod', label: 'Стержень (ось через центр)' }, { value: 'hoop', label: 'Обруч (кольцо)' }], defaultValue: 'disk' }
    ],
    outputs: [
      { name: 'inertia', label: 'Момент инерции', type: 'number', unit: 'кг·м²' }
    ],
    calculate: (inputs) => {
      const m = Number(inputs.mass);
      const r = Number(inputs.radius);
      const shape = String(inputs.shape);
      let I = 0;
      switch (shape) {
        case 'point': I = m * r * r; break;
        case 'disk': I = 0.5 * m * r * r; break;
        case 'sphere': I = 0.4 * m * r * r; break;
        case 'rod': I = (1/12) * m * r * r; break;
        case 'hoop': I = m * r * r; break;
      }
      return [{ value: Math.round(I * 1000) / 1000, label: 'Момент инерции', unit: 'кг·м²' }];
    },
    content: {
      howTo: 'Выберите форму тела, введите массу и размер.',
      about: 'Момент инерции — мера инертности при вращательном движении, аналогичная массе при поступательном.',
      usage: 'Используется в механике, робототехнике, анализе движения.',
      formula: 'Диск: I = ½mr², Шар: I = ⅖mr², Стержень: I = ¹⁄₁₂ml², Кольцо: I = mr²',
      faq: [
        { question: 'Чем отличается от массы?', answer: 'Масса — инертность при движении поступательном. Момент инерции — при вращательном.' },
        { question: 'Зависит ли от оси вращения?', answer: 'Да! Здесь расчёт для оси через центр масс. Для других осей используйте теорему Штейнера.' }
      ],
      sources: [{ title: 'Момент инерции', url: 'https://ru.wikipedia.org/wiki/Момент_инерции' }],
      updatedAt: '2026-04-07'
    }
  },
  // 7. Угловая скорость и ускорение
  {
    id: 'angular-velocity',
    slug: 'uglovaya-skorost',
    title: 'Вращательное движение',
    description: 'Расчёт угловой скорости, ускорения и связи с линейной скоростью',
    category: 'nauka-i-ucheba',
    subcategory: 'fizika',
    type: 'formula',
    inputs: [
      { name: 'rpm', label: 'Обороты в минуту (об/мин)', type: 'number', placeholder: '60', defaultValue: 60, min: 0 },
      { name: 'radius', label: 'Радиус (м)', type: 'number', placeholder: '0.3', defaultValue: 0.3, min: 0 }
    ],
    outputs: [
      { name: 'angularVelocity', label: 'Угловая скорость', type: 'number', unit: 'рад/с' },
      { name: 'linearVelocity', label: 'Линейная скорость', type: 'number', unit: 'м/с' },
      { name: 'period', label: 'Период вращения', type: 'number', unit: 'с' }
    ],
    calculate: (inputs) => {
      const rpm = Number(inputs.rpm);
      const r = Number(inputs.radius);
      const omega = rpm * 2 * Math.PI / 60;
      const v = omega * r;
      const T = rpm > 0 ? 60 / rpm : 0;
      return [
        { value: Math.round(omega * 100) / 100, label: 'Угловая скорость', unit: 'рад/с' },
        { value: Math.round(v * 100) / 100, label: 'Линейная скорость', unit: 'м/с' },
        { value: Math.round(T * 100) / 100, label: 'Период вращения', unit: 'с' }
      ];
    },
    content: {
      howTo: 'Введите количество оборотов в минуту и радиус.',
      about: 'Связь между вращательным и поступательным движением: v = ω×r.',
      usage: 'Для расчёта двигателей, колёс, центробежных сил.',
      formula: 'ω = 2πn/60 (рад/с), где n — об/мин. v = ω×r, T = 60/n.',
      faq: [
        { question: 'Что такое радиан?', answer: 'Угол, при котором длина дуги равна радиусу. 2π радиан = 360°.' },
        { question: 'Почему на краю диска скорость больше?', answer: 'Линейная скорость пропорциональна радиусу при одинаковой угловой скорости.' }
      ],
      sources: [{ title: 'Вращательное движение', url: 'https://ru.wikipedia.org/wiki/Вращательное_движение' }],
      updatedAt: '2026-04-07'
    }
  },
  // 8. Гидростатическое давление
  {
    id: 'hydrostatic-pressure',
    slug: 'gidrostaticheskoe-davlenie',
    title: 'Гидростатическое давление',
    description: 'Расчёт давления жидкости на глубине',
    category: 'nauka-i-ucheba',
    subcategory: 'fizika',
    type: 'formula',
    inputs: [
      { name: 'depth', label: 'Глубина (м)', type: 'number', placeholder: '10', defaultValue: 10, min: 0 },
      { name: 'density', label: 'Плотность жидкости (кг/м³)', type: 'number', placeholder: '1000', defaultValue: 1000, min: 0 },
      { name: 'atmospheric', label: 'Атмосферное давление', type: 'select', options: [{ value: 'yes', label: 'Учитывать' }, { value: 'no', label: 'Не учитывать' }], defaultValue: 'yes' }
    ],
    outputs: [
      { name: 'pressure', label: 'Давление', type: 'number', unit: 'Па' },
      { name: 'pressureAtm', label: 'Давление', type: 'number', unit: 'атм' }
    ],
    calculate: (inputs) => {
      const h = Number(inputs.depth);
      const rho = Number(inputs.density);
      const g = 9.81;
      const P0 = inputs.atmospheric === 'yes' ? 101325 : 0;
      const pressure = rho * g * h + P0;
      const pressureAtm = pressure / 101325;
      return [
        { value: Math.round(pressure), label: 'Давление', unit: 'Па' },
        { value: Math.round(pressureAtm * 100) / 100, label: 'Давление', unit: 'атм' }
      ];
    },
    content: {
      howTo: 'Введите глубину, плотность жидкости и выберите, учитывать ли атмосферное давление.',
      about: 'Гидростатическое давление линейно зависит от глубины: P = ρgh. В воде давление увеличивается на 1 атм каждые 10 м.',
      usage: 'Для расчёта давления на водолазов, плотины, сосуды.',
      formula: 'P = ρ×g×h + P₀, где g = 9.81 м/с², P₀ = 101325 Па (1 атм).',
      faq: [
        { question: 'На какой глубине давление 2 атм?', answer: 'В воде — около 10 м (1 атм воздуха + 1 атм воды).' },
        { question: 'Почему давление не зависит от формы сосуда?', answer: 'Парадокс гидростатики: давление зависит только от глубины, не от формы или объёма.' }
      ],
      sources: [{ title: 'Закон Паскаля', url: 'https://ru.wikipedia.org/wiki/Закон_Паскаля' }],
      updatedAt: '2026-04-07'
    }
  },
  // 9. Центростремительная сила
  {
    id: 'centripetal-force',
    slug: 'centrostremitelnaya-sila',
    title: 'Центростремительная сила',
    description: 'Расчёт силы, удерживающей тело на окружности',
    category: 'nauka-i-ucheba',
    subcategory: 'fizika',
    type: 'formula',
    inputs: [
      { name: 'mass', label: 'Масса (кг)', type: 'number', placeholder: '1', defaultValue: 1, min: 0 },
      { name: 'velocity', label: 'Скорость (м/с)', type: 'number', placeholder: '10', defaultValue: 10, min: 0 },
      { name: 'radius', label: 'Радиус (м)', type: 'number', placeholder: '2', defaultValue: 2, min: 0 }
    ],
    outputs: [
      { name: 'force', label: 'Центростремительная сила', type: 'number', unit: 'Н' },
      { name: 'acceleration', label: 'Ускорение', type: 'number', unit: 'м/с²' }
    ],
    calculate: (inputs) => {
      const m = Number(inputs.mass);
      const v = Number(inputs.velocity);
      const r = Number(inputs.radius);
      if (r === 0) return [{ value: '—', label: 'Центростремительная сила', unit: '' }, { value: '—', label: 'Ускорение', unit: '' }];
      const F = m * v * v / r;
      const a = v * v / r;
      return [
        { value: Math.round(F * 100) / 100, label: 'Центростремительная сила', unit: 'Н' },
        { value: Math.round(a * 100) / 100, label: 'Ускорение', unit: 'м/с²' }
      ];
    },
    content: {
      howTo: 'Введите массу тела, его скорость и радиус окружности.',
      about: 'Центростремительная сила направлена к центру окружности и удерживает тело на криволинейной траектории.',
      usage: 'Объясняет движение по кругу, искусственную гравитацию, работу центрифуг.',
      formula: 'F = mv²/r = mω²r. Центростремительное ускорение a = v²/r.',
      faq: [
        { question: 'Почему меня отталкивает на повороте?', answer: 'Это инерция (центробежная сила в неинерциальной системе). На самом деле сила направлена к центру поворота.' },
        { question: 'Почему велосипед не падает в повороте?', answer: 'Наклон создаёт горизонтальную составляющую силы тяжести, которая служит центростремительной силой.' }
      ],
      sources: [{ title: 'Движение по окружности', url: 'https://ru.wikipedia.org/wiki/Равномерное_движение_по_окружности' }],
      updatedAt: '2026-04-07'
    }
  },
  // 10. Теплопроводность
  {
    id: 'heat-conduction',
    slug: 'teploprovodnost',
    title: 'Теплопроводность',
    description: 'Расчёт теплового потока через стенку (закон Фурье)',
    category: 'nauka-i-ucheba',
    subcategory: 'fizika',
    type: 'formula',
    inputs: [
      { name: 'k', label: 'Коэффициент теплопроводности (Вт/(м·К))', type: 'number', placeholder: '0.5', defaultValue: 0.5, min: 0 },
      { name: 'area', label: 'Площадь (м²)', type: 'number', placeholder: '10', defaultValue: 10, min: 0 },
      { name: 'thickness', label: 'Толщина (м)', type: 'number', placeholder: '0.2', defaultValue: 0.2, min: 0.001 },
      { name: 'deltaT', label: 'Разница температур (°C)', type: 'number', placeholder: '20', defaultValue: 20, min: 0 }
    ],
    outputs: [
      { name: 'heatFlow', label: 'Тепловой поток', type: 'number', unit: 'Вт' }
    ],
    calculate: (inputs) => {
      const k = Number(inputs.k);
      const A = Number(inputs.area);
      const d = Number(inputs.thickness);
      const deltaT = Number(inputs.deltaT);
      if (d === 0) return [{ value: '—', label: 'Тепловой поток', unit: '' }];
      const Q = k * A * deltaT / d;
      return [{ value: Math.round(Q * 100) / 100, label: 'Тепловой поток', unit: 'Вт' }];
    },
    content: {
      howTo: 'Введите теплопроводность материала, площадь, толщину стенки и разницу температур.',
      about: 'Закон Фурье: тепловой поток пропорционален градиенту температуры и площади.',
      usage: 'Для расчёта теплопотерь зданий, выбора утеплителя, проектирования теплообменников.',
      formula: 'Q = k×A×ΔT/d, где k — теплопроводность, A — площадь, d — толщина, ΔT — разница температур.',
      faq: [
        { question: 'Теплопроводность типичных материалов?', answer: 'Медь: 400, Бетон: 1.7, Кирпич: 0.5, Дерево: 0.15, Пеноплекс: 0.03 Вт/(м·К).' },
        { question: 'Как уменьшить теплопотери?', answer: 'Увеличить толщину или использовать материалы с низкой теплопроводностью (утеплители).' }
      ],
      sources: [{ title: 'Теплопроводность', url: 'https://ru.wikipedia.org/wiki/Теплопроводность' }],
      updatedAt: '2026-04-07'
    }
  }
];
