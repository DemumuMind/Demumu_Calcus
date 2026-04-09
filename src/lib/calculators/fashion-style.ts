import type { Calculator } from '../types';

export const fashionStyleCalculators: Calculator[] = [
  {
    id: 'size-converter',
    slug: 'size-converter',
    title: 'Конвертер размеров одежды',
    description: 'Переводите размеры одежды между разными системами',
    category: 'fashion',
    subcategory: 'shopping',
    type: 'converter',
    inputs: [
      {
        name: 'system',
        label: 'Из системы',
        type: 'select',
                options: [
          { value: 'ru', label: 'Российская' },
          { value: 'eu', label: 'Европейская (EU)' },
          { value: 'us', label: 'Американская (US)' },
          { value: 'uk', label: 'Британская (UK)' },
          { value: 'int', label: 'Международная (XS-XXL)' }
        ]
      },
      {
        name: 'size',
        label: 'Размер',
      type: 'number',
                min: 38,
        max: 64
      },
      {
        name: 'gender',
        label: 'Пол',
        type: 'select',
                options: [
          { value: 'women', label: 'Женский' },
          { value: 'men', label: 'Мужской' }
        ]
      }
    ],
    outputs: [
      {
        name: 'ruSize',
        label: 'Российский',
      type: 'number',
      unit: 'размер'
      },
      {
        name: 'euSize',
        label: 'Европейский',
      type: 'number',
      unit: 'размер'
      },
      {
        name: 'usSize',
        label: 'Американский',
      type: 'number',
      unit: 'размер'
      },
      {
        name: 'ukSize',
        label: 'Британский',
      type: 'number',
      unit: 'размер'
      },
      {
        name: 'intSize',
        label: 'Международный',
        type: 'text'
      }
    ],
    calculate: (inputs): any => {
      const system = String(inputs.system);
      const size = Number(inputs.size);
      const gender = String(inputs.gender);
      // Базовый размер (российский)
      let baseSize = size;
      if (system === 'eu') baseSize = size - 6;
      else if (system === 'us' && gender === 'women') baseSize = size + 8;
      else if (system === 'us' && gender === 'men') baseSize = size + 14;
      else if (system === 'uk') baseSize = size + 8;
      else if (system === 'int') {
        const intToRu: Record<string, number> = { XS: 42, S: 44, M: 46, L: 48, XL: 50, XXL: 52, XXXL: 54 };
        baseSize = intToRu[String(size)] || 46;
      }

      const ruSize = baseSize;
      const euSize = baseSize + 6;
      const usSize = gender === 'women' ? baseSize - 8 : baseSize - 14;
      const ukSize = baseSize - 8;

      const intSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
      const intIndex = Math.max(0, Math.min(6, Math.floor((baseSize - 42) / 2)));
      const intSize = intSizes[intIndex];

      return [
        { value: ruSize, label: 'Российский', unit: 'размер' },
        { value: euSize, label: 'Европейский', unit: 'размер' },
        { value: usSize, label: 'Американский', unit: 'размер' },
        { value: ukSize, label: 'Британский', unit: 'размер' },
        { value: intSize, label: 'Международный', unit: '' }
      ];
    },
    content: {
      howTo: `Для конвертации:
1. Выберите текущую систему размеров
2. Введите размер
3. Укажите пол
4. Получите соответствие в других системах`,
      about: `Размеры могут отличаться у разных производителей. Всегда смотрите таблицу размеров бренда.`,
      formula: `Европа = Россия + 6`,
      faq: [
        {
          question: 'Почему размеры отличаются у разных брендов?',
          answer: 'У каждого бренда свои лекала и целевая аудитория. Смотрите замеры конкретной вещи.'
        }
      ],
      sources: [
        { title: 'Wildberries - таблица размеров', url: 'https://wildberries.ru/sizes' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'shoe-size-fashion',
    slug: 'shoe-size-converter',
    title: 'Конвертер размеров обуви',
    description: 'Переводите размеры обуви между разными странами',
    category: 'fashion',
    subcategory: 'shopping',
    type: 'converter',
    inputs: [
      {
        name: 'system',
        label: 'Из системы',
        type: 'select',
                options: [
          { value: 'ru', label: 'Российская' },
          { value: 'eu', label: 'Европейская (EU)' },
          { value: 'us', label: 'Американская (US)' },
          { value: 'uk', label: 'Британская (UK)' },
          { value: 'cm', label: 'Длина стопы (см)' }
        ]
      },
      {
        name: 'size',
        label: 'Размер',
      type: 'number',
                min: 15,
        max: 50
      },
      {
        name: 'gender',
        label: 'Пол',
        type: 'select',
                options: [
          { value: 'women', label: 'Женский' },
          { value: 'men', label: 'Мужской' }
        ]
      }
    ],
    outputs: [
      {
        name: 'ruSize',
        label: 'Российский',
        type: 'text'
      },
      {
        name: 'euSize',
        label: 'Европейский',
        type: 'text'
      },
      {
        name: 'usSize',
        label: 'Американский',
        type: 'text'
      },
      {
        name: 'ukSize',
        label: 'Британский',
        type: 'text'
      },
      {
        name: 'cmSize',
        label: 'Длина стопы',
      type: 'number',
      unit: 'см'
      }
    ],
    calculate: (inputs): any => {
      const system = String(inputs.system);
      const size = Number(inputs.size);
      const gender = String(inputs.gender);
      let mm;

      if (system === 'cm') {
        mm = size * 10;
      } else if (system === 'ru') {
        mm = size * 6.666 + 10;
      } else if (system === 'eu') {
        mm = size * 6.666;
      } else if (system === 'us' && gender === 'women') {
        mm = (size + 31) * 6.666;
      } else if (system === 'us' && gender === 'men') {
        mm = (size + 33) * 6.666;
      } else if (system === 'uk') {
        mm = (size + 32.5) * 6.666;
      } else {
        mm = size * 6.666;
      }

      const ruSize = Math.round((mm - 10) / 6.666);
      const euSize = Math.round(mm / 6.666);
      const usSize = gender === 'women'
        ? Math.round(mm / 6.666 - 31)
        : Math.round(mm / 6.666 - 33);
      const ukSize = Math.round(mm / 6.666 - 32.5);
      const cmSize = Math.round(mm / 10 * 10) / 10;

      return [
        { value: ruSize, label: 'Российский', unit: '' },
        { value: euSize, label: 'Европейский', unit: '' },
        { value: usSize, label: 'Американский', unit: '' },
        { value: ukSize, label: 'Британский', unit: '' },
        { value: cmSize, label: 'Длина стопы', unit: 'см' }
      ];
    },
    content: {
      howTo: `Для конвертации:
1. Выберите текущую систему
2. Введите размер
3. Получите соответствие`,
      about: `Обувные размеры стандартизированы, но могут отличаться по полноте и посадке у разных брендов.`,
      formula: `EU = Длина стопы (мм) / 6.666`,
      faq: [],
      sources: [
        { title: 'Обувь России - размеры', url: 'https://obuv-rf.ru/sizes' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'body-shape-calculator',
    slug: 'body-shape-calculator',
    title: 'Калькулятор типа фигуры',
    description: 'Определите свой тип фигуры по обхватам',
    category: 'fashion',
    subcategory: 'style',
    type: 'formula',
    inputs: [
      {
        name: 'shoulders',
        label: 'Обхват плеч',
      type: 'number', min: 30,
        max: 60
      },
      {
        name: 'bust',
        label: 'Обхват груди',
      type: 'number', min: 60,
        max: 140
      },
      {
        name: 'waist',
        label: 'Обхват талии',
      type: 'number', min: 50,
        max: 120
      },
      {
        name: 'hips',
        label: 'Обхват бёдер',
      type: 'number', min: 60,
        max: 140
      }
    ],
    outputs: [
      {
        name: 'bodyShape',
        label: 'Тип фигуры',
        type: 'text'
      },
      {
        name: 'waistToHipRatio',
        label: 'Соотношение талия/бёдра',
        type: 'number'
      },
      {
        name: 'stylingTips',
        label: 'Советы по стилю',
        type: 'text'
      }
    ],
    calculate: (inputs): any => {
      const shoulders = Number(inputs.shoulders);
      const bust = Number(inputs.bust);
      const waist = Number(inputs.waist);
      const hips = Number(inputs.hips);
      const shoulderToHip = shoulders / hips;
      const waistToHip = waist / hips;
      const bustToWaist = bust / waist;

      let bodyShape;
      let stylingTips;

      if (waistToHip < 0.75 && bustToWaist > 1.2) {
        bodyShape = 'Песочные часы ⏳';
        stylingTips = 'Подчёркивайте талию поясами, облегающие платья, A-силуэты';
      } else if (shoulderToHip > 1.05) {
        bodyShape = 'Перевёрнутый треугольник ▽';
        stylingTips = 'Уравновешивайте плечи: расклешённые юбки, V-образный вырез, детали на бёдрах';
      } else if (shoulderToHip < 0.95) {
        bodyShape = 'Груша 🍐';
        stylingTips = 'Акцент на верх: декольте, яркие топы, тёмное снизу, A-силуэт';
      } else if (waistToHip > 0.85) {
        bodyShape = 'Яблоко 🍎';
        stylingTips = 'Удлиняйте силуэт: имперская талия, прямые линии, вертикальные полосы';
      } else if (shoulderToHip >= 0.95 && shoulderToHip <= 1.05 && waistToHip >= 0.75) {
        bodyShape = 'Прямоугольник ▭';
        stylingTips = 'Создавайте талию: пояса, оборки, асимметрия, платья-кейпы';
      } else {
        bodyShape = 'Овальная/Комбинированная';
        stylingTips = 'Индивидуальный подбор по сильным сторонам фигуры';
      }

      return [
        { value: bodyShape, label: 'Тип фигуры', unit: '' },
        { value: Math.round(waistToHip * 100) / 100, label: 'Соотношение талия/бёдра', unit: '' },
        { value: stylingTips, label: 'Советы по стилю', unit: '' }
      ];
    },
    content: {
      howTo: `Для определения:
1. Измерьте обхват плеч
2. Измерьте грудь (по наиболее выступающим точкам)
3. Измерьте талию (в самом узком месте)
4. Измерьте бёдра (по наиболее выступающим точкам)`,
      about: `Тип фигуры помогает выбирать одежду, которая подчёркивает достоинства.`,
      formula: `Соотношения плечи/бёдра, талия/бёдра, грудь/талия`,
      faq: [
        {
          question: 'Можно ли изменить тип фигуры?',
          answer: 'Тип фигуры - это структура костей. Можно корректировать пропорции через одежду, фитнес, корсеты.'
        }
      ],
      sources: [
        { title: 'Glamour - типы фигур', url: 'https://glamour.ru/body-shapes' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'color-season-calculator',
    slug: 'color-season-calculator',
    title: 'Калькулятор цветотипа',
    description: 'Определите свой цветовой тип (весна, лето, осень, зима)',
    category: 'fashion',
    subcategory: 'style',
    type: 'formula',
    inputs: [
      {
        name: 'skinTone',
        label: 'Оттенок кожи',
        type: 'select',
                options: [
          { value: 'warm-light', label: 'Тёплый светлый (слоновая кость, персиковый)' },
          { value: 'cool-light', label: 'Холодный светлый (фарфор, розовый)' },
          { value: 'warm-medium', label: 'Тёплый средний (бежевый, золотистый)' },
          { value: 'cool-medium', label: 'Холодный средний (оливковый, серый)' },
          { value: 'warm-dark', label: 'Тёплый тёмный (загар, ореховый)' },
          { value: 'cool-dark', label: 'Холодный тёмный (эбеновое дерево, шоколад)' }
        ]
      },
      {
        name: 'eyeColor',
        label: 'Цвет глаз',
        type: 'select',
                options: [
          { value: 'blue-gray', label: 'Голубые/серые' },
          { value: 'green-hazel', label: 'Зелёные/карие' },
          { value: 'brown-dark', label: 'Тёмно-карие/чёрные' }
        ]
      },
      {
        name: 'hairColor',
        label: 'Цвет волос',
        type: 'select',
                options: [
          { value: 'blonde', label: 'Блонд/русый' },
          { value: 'brown', label: 'Каштановый/шатен' },
          { value: 'red', label: 'Рыжий/медный' },
          { value: 'dark', label: 'Тёмно-каштановый/чёрный' }
        ]
      }
    ],
    outputs: [
      {
        name: 'seasonType',
        label: 'Цветовой тип',
        type: 'text'
      },
      {
        name: 'bestColors',
        label: 'Лучшие цвета',
        type: 'text'
      },
      {
        name: 'avoidColors',
        label: 'Цвета, которых избегать',
        type: 'text'
      },
      {
        name: 'metalType',
        label: 'Подходящий металл',
        type: 'text'
      }
    ],
    calculate: (inputs): any => {
      const skinTone = String(inputs.skinTone);
      const hairColor = String(inputs.hairColor);
      let seasonType;
      let bestColors;
      let avoidColors;
      let metalType;

      if (skinTone.includes('warm') && hairColor === 'blonde') {
        seasonType = 'Весна (Spring)';
        bestColors = 'Коралловый, персиковый, золотистый, салатовый, бирюзовый';
        avoidColors = 'Чёрный, холодный розовый, серебристый, пастельно-голубой';
        metalType = 'Золото';
      } else if (skinTone.includes('cool') && hairColor === 'blonde') {
        seasonType = 'Лето (Summer)';
        bestColors = 'Пыльная роза, лаванда, голубой, серо-голубой, бордо';
        avoidColors = 'Оранжевый, рыжий, тёплый жёлтый, оливковый';
        metalType = 'Серебро';
      } else if (skinTone.includes('warm') && (hairColor === 'brown' || hairColor === 'red')) {
        seasonType = 'Осень (Autumn)';
        bestColors = 'Терракотовый, оливковый, горчичный, шоколадный, тёмно-зелёный';
        avoidColors = 'Ярко-розовый, лимонный, серебро, пастельные тона';
        metalType = 'Золото, медь';
      } else {
        seasonType = 'Зима (Winter)';
        bestColors = 'Чёрный, белый, красный, изумрудный, синий, фиолетовый';
        avoidColors = 'Тёплый беж, персиковый, оранжевый, золотистый';
        metalType = 'Серебро, платина';
      }

      return [
        { value: seasonType, label: 'Цветовой тип', unit: '' },
        { value: bestColors, label: 'Лучшие цвета', unit: '' },
        { value: avoidColors, label: 'Цвета, которых избегать', unit: '' },
        { value: metalType, label: 'Подходящий металл', unit: '' }
      ];
    },
    content: {
      howTo: `Для определения цветотипа:
1. Определите оттенок кожи (тёплый/холодный, светлый/тёмный)
2. Укажите цвет глаз
3. Укажите цвет волос`,
      about: `Цветотип помогает выбирать одежду, косметику, украшения, которые освежают лицо.`,
      formula: `Температура (тёплый/холодный) + Контрастность (высокая/низкая)`,
      faq: [
        {
          question: 'Можно ли быть "смешанным" типом?',
          answer: 'Да, многие люди имеют черты разных типов. Выбирайте цвета, которые лучше всего освежают лицо.'
        }
      ],
      sources: [
        { title: 'Color Me Beautiful', url: 'https://colormebeautiful.com' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'bra-size-calculator',
    slug: 'bra-size-calculator',
    title: 'Калькулятор размера бюстгальтера',
    description: 'Определите правильный размер бюстгальтера',
    category: 'fashion',
    subcategory: 'shopping',
    type: 'arithmetic',
    inputs: [
      {
        name: 'underbust',
        label: 'Обхват под грудью',
      type: 'number', min: 60,
        max: 120
      },
      {
        name: 'bust',
        label: 'Обхват по груди',
      type: 'number', min: 70,
        max: 140
      }
    ],
    outputs: [
      {
        name: 'bandSize',
        label: 'Объём ленты',
        type: 'text'
      },
      {
        name: 'cupSize',
        label: 'Размер чашки',
        type: 'text'
      },
      {
        name: 'fullSize',
        label: 'Полный размер',
        type: 'text'
      },
      {
        name: 'sisterSizes',
        label: 'Смежные размеры',
        type: 'text'
      }
    ],
    calculate: (inputs): any => {
      const underbust = Number(inputs.underbust);
      const bust = Number(inputs.bust);
      // Объём ленты (округляем до ближайшего чётного)
      let bandSize = Math.round(underbust / 2) * 2;
      if (bandSize % 2 !== 0) bandSize += 1;

      // Разница в см
      const diff = bust - underbust;

      // Размер чашки
      const cupSizes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const cupIndex = Math.max(0, Math.floor((diff - 10) / 2.5));
      const cupSize = cupSizes[Math.min(cupIndex, cupSizes.length - 1)] || 'A';

      const fullSize = `${bandSize}${cupSize}`;

      // Смежные размеры
      const sisterSizes = [
        `${bandSize - 2}${String.fromCharCode(cupSize.charCodeAt(0) + 1)}`,
        `${bandSize + 2}${String.fromCharCode(cupSize.charCodeAt(0) - 1)}`
      ].filter(s => !s.includes('undefined') && !s.includes('@'));

      return [
        { value: bandSize, label: 'Объём ленты', unit: '' },
        { value: cupSize, label: 'Размер чашки', unit: '' },
        { value: fullSize, label: 'Полный размер', unit: '' },
        { value: sisterSizes.join(', '), label: 'Смежные размеры', unit: '' }
      ];
    },
    content: {
      howTo: `Для определения размера:
1. Измерьте обхват под грудью (плотно)
2. Измерьте обхват по наиболее выступающим точкам груди
3. Вычислите разницу`,
      about: `80% женщин носят неправильный размер бюстгальтера. Правильный размер обеспечивает поддержку и комфорт.`,
      formula: `Чашка = Разница обхватов / 2.5 см`,
      faq: [
        {
          question: 'Почему нужно измерять без бюстгальтера?',
          answer: 'Для точного измерения натуральной формы груди.'
        }
      ],
      sources: [
        { title: 'A Bra That Fits', url: 'https://reddit.com/r/ABraThatFits' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'outfit-cost-calculator',
    slug: 'outfit-cost-calculator',
    title: 'Калькулятор стоимости образа',
    description: 'Рассчитайте стоимость комплекта одежды и cost-per-wear',
    category: 'fashion',
    subcategory: 'budget',
    type: 'arithmetic',
    inputs: [
      {
        name: 'topPrice',
        label: 'Цена верха',
      type: 'number', min: 0
      },
      {
        name: 'bottomPrice',
        label: 'Цена низа',
      type: 'number', min: 0
      },
      {
        name: 'shoesPrice',
        label: 'Цена обуви',
      type: 'number', min: 0,
        defaultValue: 0
      },
      {
        name: 'accessoriesPrice',
        label: 'Цена аксессуаров',
      type: 'number', min: 0,
        defaultValue: 0
      },
      {
        name: 'expectedWears',
        label: 'Сколько раз наденете',
      type: 'number', min: 1,
        defaultValue: 30
      }
    ],
    outputs: [
      {
        name: 'totalCost',
        label: 'Общая стоимость',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'costPerWear',
        label: 'Цена за носку',
      type: 'number',
      unit: '₽'
      },
      {
        name: 'category',
        label: 'Категория',
        type: 'text'
      }
    ],
    calculate: (inputs): any => {
      const topPrice = Number(inputs.topPrice);
      const bottomPrice = Number(inputs.bottomPrice);
      const shoesPrice = Number(inputs.shoesPrice);
      const accessoriesPrice = Number(inputs.accessoriesPrice);
      const expectedWears = Number(inputs.expectedWears);
      const totalCost = topPrice + bottomPrice + shoesPrice + accessoriesPrice;
      const costPerWear = Math.round(totalCost / expectedWears);

      let category;
      if (totalCost < 5000) {
        category = 'Бюджетный 💚';
      } else if (totalCost < 15000) {
        category = 'Средний 💛';
      } else if (totalCost < 50000) {
        category = 'Премиум 🧡';
      } else {
        category = 'Люкс ❤️';
      }

      return [
        { value: totalCost, label: 'Общая стоимость', unit: '₽' },
        { value: costPerWear, label: 'Цена за носку', unit: '₽' },
        { value: category, label: 'Категория', unit: '' }
      ];
    },
    content: {
      howTo: `Для расчёта:
1. Укажите цены всех элементов образа
2. Оцените, сколько раз вы его наденете
3. Получите стоимость за носку`,
      about: `Cost-per-wear помогает принимать более разумные решения о покупках. Дорогая качественная вещь, которую носят часто, может быть выгоднее дешёвой.`,
      formula: `Cost-per-wear = Общая стоимость / Количество носок`,
      faq: [
        {
          question: 'Что такое cost-per-wear?',
          answer: 'Это реальная стоимость вещи с учётом того, сколько раз вы её носите.'
        }
      ],
      sources: [
        { title: 'Vogue - conscious fashion', url: 'https://vogue.ru/fashion' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'capsule-wardrobe-calculator',
    slug: 'capsule-wardrobe-calculator',
    title: 'Калькулятор капсульного гардероба',
    description: 'Рассчитайте минимальный набор одежды для разных образов',
    category: 'fashion',
    subcategory: 'style',
    type: 'formula',
    inputs: [
      {
        name: 'lifestyle',
        label: 'Образ жизни',
        type: 'select',
                options: [
          { value: 'office', label: 'Офис (формальный дресс-код)' },
          { value: 'casual', label: 'Повседневный' },
          { value: 'mixed', label: 'Смешанный' },
          { value: 'creative', label: 'Креативная работа' }
        ]
      },
      {
        name: 'seasons',
        label: 'Сезонность',
        type: 'select',
                options: [
          { value: 'all', label: 'Все сезоны' },
          { value: 'warm', label: 'Тёплый климат' },
          { value: 'cold', label: 'Холодный климат' }
        ]
      },
      {
        name: 'budget',
        label: 'Бюджет',
        type: 'select',
                options: [
          { value: 'budget', label: 'Эконом' },
          { value: 'mid', label: 'Средний' },
          { value: 'premium', label: 'Премиум' }
        ]
      }
    ],
    outputs: [
      {
        name: 'topsCount',
        label: 'Верх',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'bottomsCount',
        label: 'Низ',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'layersCount',
        label: 'Слои/пиджаки',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'shoesCount',
        label: 'Обувь',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'totalItems',
        label: 'Всего вещей',
      type: 'number',
      unit: 'шт'
      },
      {
        name: 'estimatedCost',
        label: 'Примерная стоимость',
      type: 'number',
      unit: '₽'
      }
    ],
    calculate: (inputs): any => {
      const lifestyle = String(inputs.lifestyle);
      const seasons = String(inputs.seasons);
      const budget = String(inputs.budget);
      const baseCounts: Record<string, { tops: number; bottoms: number; layers: number; shoes: number }> = {
        office: { tops: 8, bottoms: 4, layers: 4, shoes: 4 },
        casual: { tops: 6, bottoms: 4, layers: 3, shoes: 3 },
        mixed: { tops: 10, bottoms: 6, layers: 4, shoes: 4 },
        creative: { tops: 8, bottoms: 5, layers: 3, shoes: 4 }
      };

      const seasonMultipliers: Record<string, number> = {
        all: 1.2,
        warm: 0.8,
        cold: 1.3
      };

      const prices: Record<string, number> = {
        budget: 1000,
        mid: 3000,
        premium: 8000
      };

      const mult = seasonMultipliers[seasons];
      const base = baseCounts[lifestyle];

      const topsCount = Math.ceil(base.tops * mult);
      const bottomsCount = Math.ceil(base.bottoms * mult);
      const layersCount = Math.ceil(base.layers * mult);
      const shoesCount = Math.ceil(base.shoes * mult);
      const totalItems = topsCount + bottomsCount + layersCount + shoesCount;

      const estimatedCost = Math.round(totalItems * prices[budget] * 0.7); // некоторые вещи дороже

      return [
        { value: topsCount, label: 'Верх', unit: 'шт' },
        { value: bottomsCount, label: 'Низ', unit: 'шт' },
        { value: layersCount, label: 'Слои/пиджаки', unit: 'шт' },
        { value: shoesCount, label: 'Обувь', unit: 'шт' },
        { value: totalItems, label: 'Всего вещей', unit: 'шт' },
        { value: estimatedCost, label: 'Примерная стоимость', unit: '₽' }
      ];
    },
    content: {
      howTo: `Для расчёта капсулы:
1. Выберите ваш образ жизни
2. Укажите климат
3. Укажите бюджет
4. Получите оптимальный набор`,
      about: `Капсульный гардероб - это минимум вещей, максимум сочетаний. Обычно 25-40 качественных вещей.`,
      formula: `Количество = База × Сезонный коэффициент`,
      faq: [
        {
          question: 'Сколько образов можно создать?',
          answer: 'Из 30 качественных вещей можно создать 100+ разных сочетаний.'
        }
      ],
      sources: [
        { title: 'Unfancy - capsule wardrobe', url: 'https://un-fancy.com/capsule-wardrobe' }
      ],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'jewelry-calculator',
    slug: 'jewelry-calculator',
    title: 'Калькулятор украшений',
    description: 'Подберите украшения по типу лица и образу',
    category: 'fashion',
    subcategory: 'style',
    type: 'arithmetic',
    inputs: [
      {
        name: 'faceShape',
        label: 'Форма лица',
        type: 'select',
                options: [
          { value: 'oval', label: 'Овальное' },
          { value: 'round', label: 'Круглое' },
          { value: 'square', label: 'Квадратное' },
          { value: 'heart', label: 'Сердцевидное' },
          { value: 'long', label: 'Вытянутое' }
        ]
      },
      {
        name: 'neckLength',
        label: 'Длина шеи',
        type: 'select',
                options: [
          { value: 'short', label: 'Короткая' },
          { value: 'average', label: 'Средняя' },
          { value: 'long', label: 'Длинная' }
        ]
      },
      {
        name: 'occasion',
        label: 'Повод',
        type: 'select',
                options: [
          { value: 'daily', label: 'Повседневный' },
          { value: 'work', label: 'Работа' },
          { value: 'evening', label: 'Вечерний выход' }
        ]
      }
    ],
    outputs: [
      {
        name: 'earrings',
        label: 'Серьги',
        type: 'text'
      },
      {
        name: 'necklace',
        label: 'Ожерелье',
        type: 'text'
      },
      {
        name: 'ringStyle',
        label: 'Кольца',
        type: 'text'
      }
    ],
    calculate: (inputs): any => {
      const faceShape = String(inputs.faceShape);
      const neckLength = String(inputs.neckLength);
      const occasion = String(inputs.occasion);
      const recommendations: Record<string, { earrings: string; necklace: string; rings: string }> = {
        oval: {
          earrings: 'Любые формы подойдут! Особенно каплевидные и круглые',
          necklace: 'Чокеры, средней длины, длинные - всё хорошо',
          rings: 'Овальные, круглые, квадратные камни'
        },
        round: {
          earrings: 'Длинные, удлинённые формы, капли',
          necklace: 'V-образные, удлиняющие',
          rings: 'Удлинённые формы, маркиз'
        },
        square: {
          earrings: 'Круглые, овальные, мягкие формы',
          necklace: 'Круглые, овальные кулоны',
          rings: 'Овальные, круглые камни'
        },
        heart: {
          earrings: 'Широкие внизу - капли, люстры',
          necklace: 'Чокеры, округлые формы',
          rings: 'Широкие на ладони'
        },
        long: {
          earrings: 'Круглые, широкие, крупные',
          necklace: 'Чокеры, колье, короткие',
          rings: 'Широкие, массивные'
        }
      };

      let data = recommendations[faceShape];

      // Корректировка по длине шеи
      let necklace = data.necklace;
      if (neckLength === 'short') {
        necklace = 'Длинные цепи, кулоны ниже ключиц';
      } else if (neckLength === 'long') {
        necklace = 'Чокеры, короткие колье';
      }

      // Корректировка по поводу
      let earrings = data.earrings;
      if (occasion === 'work') {
        earrings = earrings.replace('люстры', 'средние').replace('крупные', 'сдержанные');
      } else if (occasion === 'evening') {
        earrings = earrings.replace('сдержанные', 'выразительные').replace('средние', 'крупные');
      }

      return [
        { value: earrings, label: 'Серьги', unit: '' },
        { value: necklace, label: 'Ожерелье', unit: '' },
        { value: data.rings, label: 'Кольца', unit: '' }
      ];
    },
    content: {
      howTo: `Для подбора:
1. Определите форму лица
2. Учтите длину шеи
3. Укажите повод`,
      about: `Правильно подобранные украшения подчёркивают достоинства и корректируют пропорции лица.`,
      formula: `Противопоставление форм: круглое лицо - удлинённые украшения`,
      faq: [],
      sources: [
        { title: 'Vogue - jewelry guide', url: 'https://vogue.ru/jewelry' }
      ],
      updatedAt: '2026-04-08'
    }
  }
];
