import { Calculator } from '../types';

export const constructionExtendedCalculators: Calculator[] = [
  // 1. Крыша (расчёт материалов)
  {
    id: 'roof-materials',
    slug: 'krysha-materialy',
    title: 'Расчёт материалов для крыши',
    description: 'Расчёт количества черепицы, профнастила или металлочерепицы для крыши',
    category: 'stroitelstvo-remont',
    subcategory: 'stroitelstvo-drugoe',
    type: 'formula',
    inputs: [
      { name: 'length', label: 'Длина ската (м)', type: 'number', placeholder: '10', defaultValue: 10, min: 1 },
      { name: 'width', label: 'Ширина ската (м)', type: 'number', placeholder: '8', defaultValue: 8, min: 1 },
      { name: 'overhang', label: 'Свес (м)', type: 'number', placeholder: '0.5', defaultValue: 0.5, min: 0 },
      { name: 'waste', label: 'Запас на обрезку (%)', type: 'number', placeholder: '10', defaultValue: 10, min: 0, max: 30 }
    ],
    outputs: [
      { name: 'area', label: 'Площадь крыши', type: 'number', unit: 'м²' },
      { name: 'materials', label: 'Материалов с запасом', type: 'number', unit: 'м²' }
    ],
    calculate: (inputs) => {
      const length = Number(inputs.length);
      const width = Number(inputs.width);
      const overhang = Number(inputs.overhang);
      const waste = Number(inputs.waste);
      const area = (length + overhang * 2) * (width + overhang * 2);
      const materials = area * (1 + waste / 100);
      return [
        { value: Math.round(area * 100) / 100, label: 'Площадь крыши', unit: 'м²' },
        { value: Math.round(materials * 100) / 100, label: 'Материалов с запасом', unit: 'м²' }
      ];
    },
    content: {
      howTo: 'Введите размеры ската крыши, длину свеса и процент запаса на обрезку. Калькулятор рассчитает необходимое количество материалов.',
      about: 'Расчёт материалов для кровли с учётом свесов и запаса на обрезку.',
      usage: 'Для планирования закупки кровельных материалов.',
      formula: 'Площадь = (Длина + 2×Свес) × (Ширина + 2×Свес). Материалы = Площадь × (1 + Запас/100)',
      faq: [
        { question: 'Какой запас нужен на обрезку?', answer: 'Обычно 5-15% в зависимости от сложности крыши и типа материала.' },
        { question: 'Учитывается ли уклон?', answer: 'Нет, этот калькулятор для плоской проекции. Для скатных крыш увеличьте площадь пропорционально углу наклона.' }
      ],
      sources: [{ title: 'Строительные нормы', url: 'https://www.gost.ru/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 2. Лестница (расчёт шагов)
  {
    id: 'stairs-calculator',
    slug: 'lestnica-raschet',
    title: 'Расчёт лестницы',
    description: 'Расчёт количества ступеней, их высоты и глубины для удобной лестницы',
    category: 'stroitelstvo-remont',
    subcategory: 'stroitelstvo-drugoe',
    type: 'formula',
    inputs: [
      { name: 'height', label: 'Высота подъёма (м)', type: 'number', placeholder: '3', defaultValue: 3, min: 0.5, max: 10 },
      { name: 'length', label: 'Длина проёма (м)', type: 'number', placeholder: '4', defaultValue: 4, min: 1, max: 20 },
      { name: 'stepHeight', label: 'Желаемая высота ступени (см)', type: 'number', placeholder: '17', defaultValue: 17, min: 12, max: 22 }
    ],
    outputs: [
      { name: 'steps', label: 'Количество ступеней', type: 'number' },
      { name: 'actualHeight', label: 'Высота ступени', type: 'number', unit: 'см' },
      { name: 'depth', label: 'Глубина ступени', type: 'number', unit: 'см' },
      { name: 'angle', label: 'Угол наклона', type: 'number', unit: '°' }
    ],
    calculate: (inputs) => {
      const height = Number(inputs.height) * 100;
      const length = Number(inputs.length) * 100;
      const stepHeight = Number(inputs.stepHeight);
      const steps = Math.round(height / stepHeight);
      const actualHeight = height / steps;
      const depth = length / steps;
      const angle = Math.atan(height / length) * 180 / Math.PI;
      return [
        { value: steps, label: 'Количество ступеней' },
        { value: Math.round(actualHeight * 10) / 10, label: 'Высота ступени', unit: 'см' },
        { value: Math.round(depth * 10) / 10, label: 'Глубина ступени', unit: 'см' },
        { value: Math.round(angle * 10) / 10, label: 'Угол наклона', unit: '°' }
      ];
    },
    content: {
      howTo: 'Введите высоту подъёма, длину проёма и желаемую высоту ступени. Калькулятор определит оптимальное количество ступеней.',
      about: 'Расчёт лестницы по формуле комфорта: 2×Высота + Глубина = 63±3 см.',
      usage: 'Для проектирования межэтажных лестниц.',
      formula: 'Количество ступеней = Высота подъёма / Желаемая высота ступени. Проверка по формуле комфорта.',
      faq: [
        { question: 'Какая оптимальная высота ступени?', answer: '15-18 см для жилых помещений, 12-15 см для общественных зданий.' },
        { question: 'Что такое формула комфорта?', answer: '2×высота ступени + глубина ступени должна быть 60-65 см. Это обеспечивает удобный подъём.' }
      ],
      sources: [{ title: 'СНиП 2.08.01-89', url: 'https://docs.cntd.ru/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 3. Забор (расчёт материалов)
  {
    id: 'fence-calculator',
    slug: 'zabor-raschet',
    title: 'Расчёт материалов для забора',
    description: 'Расчёт количества столбов, планок и других материалов для забора',
    category: 'stroitelstvo-remont',
    subcategory: 'stroitelstvo-drugoe',
    type: 'formula',
    inputs: [
      { name: 'perimeter', label: 'Периметр забора (м)', type: 'number', placeholder: '50', defaultValue: 50, min: 1 },
      { name: 'postSpacing', label: 'Расстояние между столбами (м)', type: 'number', placeholder: '2.5', defaultValue: 2.5, min: 1, max: 5 },
      { name: 'height', label: 'Высота забора (м)', type: 'number', placeholder: '2', defaultValue: 2, min: 0.5, max: 5 }
    ],
    outputs: [
      { name: 'posts', label: 'Количество столбов', type: 'number' },
      { name: 'sections', label: 'Количество секций', type: 'number' },
      { name: 'length', label: 'Длина забора', type: 'number', unit: 'м' }
    ],
    calculate: (inputs) => {
      const perimeter = Number(inputs.perimeter);
      const spacing = Number(inputs.postSpacing);
      const sections = Math.ceil(perimeter / spacing);
      const posts = sections + 1;
      return [
        { value: posts, label: 'Количество столбов' },
        { value: sections, label: 'Количество секций' },
        { value: perimeter, label: 'Длина забора', unit: 'м' }
      ];
    },
    content: {
      howTo: 'Введите периметр забора, расстояние между столбами и высоту. Калькулятор рассчитает количество материалов.',
      about: 'Расчёт материалов для строительства забора из дерева, металла или других материалов.',
      formula: 'Количество столбов = (Периметр / Расстояние) + 1',
      faq: [
        { question: 'Какое оптимальное расстояние между столбами?', answer: 'Для деревянных заборов — 2-2.5 м, для металлических — 2.5-3 м.' },
        { question: 'Учитывается ли ворота?', answer: 'Нет, вычтите ширину ворот и калитки из периметра перед расчётом.' }
      ],
      sources: [{ title: 'Строительство заборов', url: 'https://www.zabor.ru/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 4. Стяжка пола
  {
    id: 'floor-screed',
    slug: 'styazhka-pola',
    title: 'Расчёт стяжки пола',
    description: 'Расчёт объёма и количества материалов для стяжки пола',
    category: 'stroitelstvo-remont',
    subcategory: 'otdelka-pola',
    type: 'formula',
    inputs: [
      { name: 'area', label: 'Площадь (м²)', type: 'number', placeholder: '20', defaultValue: 20, min: 1 },
      { name: 'thickness', label: 'Толщина стяжки (см)', type: 'number', placeholder: '5', defaultValue: 5, min: 3, max: 20 },
      { name: 'ratio', label: 'Соотношение (цемент:песок)', type: 'select', options: [{ value: '1:3', label: '1:3' }, { value: '1:4', label: '1:4' }], defaultValue: '1:3' }
    ],
    outputs: [
      { name: 'volume', label: 'Объём стяжки', type: 'number', unit: 'м³' },
      { name: 'cement', label: 'Цемента', type: 'number', unit: 'кг' },
      { name: 'sand', label: 'Песка', type: 'number', unit: 'кг' },
      { name: 'water', label: 'Воды', type: 'number', unit: 'л' }
    ],
    calculate: (inputs) => {
      const area = Number(inputs.area);
      const thickness = Number(inputs.thickness) / 100;
      const ratio = String(inputs.ratio);
      const volume = area * thickness;
      const totalWeight = volume * 2000;
      const ratioParts = ratio === '1:3' ? 4 : 5;
      const cement = totalWeight / ratioParts;
      const sand = totalWeight - cement;
      const water = cement * 0.5;
      return [
        { value: Math.round(volume * 100) / 100, label: 'Объём стяжки', unit: 'м³' },
        { value: Math.round(cement), label: 'Цемента', unit: 'кг' },
        { value: Math.round(sand), label: 'Песка', unit: 'кг' },
        { value: Math.round(water), label: 'Воды', unit: 'л' }
      ];
    },
    content: {
      howTo: 'Введите площадь, толщину стяжки и выберите соотношение цемента и песка.',
      about: 'Расчёт материалов для цементно-песчаной стяжки пола.',
      formula: 'Объём = Площадь × Толщина. Цемент = Объём × 2000 / Сумма частей.',
      faq: [
        { question: 'Какое соотношение лучше?', answer: '1:3 — более прочная стяжка, 1:4 — экономичный вариант.' },
        { question: 'Сколько сохнет стяжка?', answer: '1 см толщины = 1 неделя сушки. При 5 см — минимум 5 недель.' }
      ],
      sources: [{ title: 'СНиП 3.04.01-87', url: 'https://docs.cntd.ru/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 5. Гипсокартон
  {
    id: 'drywall-calculator',
    slug: 'gipsokarton-raschet',
    title: 'Расчёт гипсокартона',
    description: 'Расчёт количества листов ГКЛ, профилей и крепежа',
    category: 'stroitelstvo-remont',
    subcategory: 'otdelka-sten',
    type: 'formula',
    inputs: [
      { name: 'area', label: 'Площадь стен (м²)', type: 'number', placeholder: '40', defaultValue: 40, min: 1 },
      { name: 'sheetType', label: 'Тип листа', type: 'select', options: [{ value: '1200x2500', label: '1200×2500 мм (стандарт)' }, { value: '1200x3000', label: '1200×3000 мм' }], defaultValue: '1200x2500' },
      { name: 'cuttingWaste', label: 'Запас на раскрой (%)', type: 'number', placeholder: '10', defaultValue: 10, min: 0, max: 30 }
    ],
    outputs: [
      { name: 'sheets', label: 'Листов ГКЛ', type: 'number' },
      { name: 'profile', label: 'Профилей CD (3м)', type: 'number' },
      { name: 'screws', label: 'Саморезов', type: 'number' }
    ],
    calculate: (inputs) => {
      const area = Number(inputs.area);
      const sheetType = String(inputs.sheetType);
      const waste = Number(inputs.cuttingWaste);
      const sheetArea = sheetType === '1200x2500' ? 1.2 * 2.5 : 1.2 * 3;
      const sheets = Math.ceil((area * (1 + waste / 100)) / sheetArea);
      const profile = Math.ceil(area / 3);
      const screws = sheets * 50;
      return [
        { value: sheets, label: 'Листов ГКЛ' },
        { value: profile, label: 'Профилей CD (3м)' },
        { value: screws, label: 'Саморезов' }
      ];
    },
    content: {
      howTo: 'Введите площадь стен, выберите тип листа ГКЛ и запас на раскрой.',
      about: 'Расчёт материалов для обшивки стен гипсокартоном.',
      formula: 'Листов = Площадь / Площадь листа × (1 + Запас/100)',
      faq: [
        { question: 'Какой запас нужен?', answer: '10-15% для прямых стен, 20-25% для сложных конфигураций с углами.' },
        { question: 'Какой профиль нужен?', answer: 'CD-60/27 для потолка, CW-50/50 для стен (при двойной обшивке).' }
      ],
      sources: [{ title: 'Кнауф', url: 'https://www.knauf.ru/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 6. Отопление (радиаторы)
  {
    id: 'heating-radiators',
    slug: 'otoplenie-radiatory',
    title: 'Расчёт радиаторов отопления',
    description: 'Расчёт количества секций радиаторов по площади или объёму помещения',
    category: 'stroitelstvo-remont',
    subcategory: 'otoplenie',
    type: 'formula',
    inputs: [
      { name: 'area', label: 'Площадь помещения (м²)', type: 'number', placeholder: '20', defaultValue: 20, min: 1 },
      { name: 'ceilingHeight', label: 'Высота потолков (м)', type: 'number', placeholder: '2.7', defaultValue: 2.7, min: 2, max: 5 },
      { name: 'heatLoss', label: 'Коэффициент теплопотерь', type: 'select', options: [{ value: '1', label: 'Стандартное помещение' }, { value: '1.2', label: 'Угловая квартира' }, { value: '0.8', label: 'Хорошая теплоизоляция' }], defaultValue: '1' }
    ],
    outputs: [
      { name: 'requiredPower', label: 'Требуемая мощность', type: 'number', unit: 'Вт' },
      { name: 'sections', label: 'Количество секций', type: 'number' }
    ],
    calculate: (inputs) => {
      const area = Number(inputs.area);
      const height = Number(inputs.ceilingHeight);
      const heatLoss = Number(inputs.heatLoss);
      const volume = area * height;
      const requiredPower = volume * 40 * heatLoss;
      const sectionPower = 150;
      const sections = Math.ceil(requiredPower / sectionPower);
      return [
        { value: Math.round(requiredPower), label: 'Требуемая мощность', unit: 'Вт' },
        { value: sections, label: 'Количество секций' }
      ];
    },
    content: {
      howTo: 'Введите площадь, высоту потолков и выберите тип помещения. Калькулятор рассчитает необходимое количество секций радиатора.',
      about: 'Расчёт радиаторов отопления по норме 40 Вт на м³ для стандартных условий.',
      usage: 'Для подбора радиаторов при замене или установке отопления.',
      formula: 'Мощность = Площадь × Высота × 40 × Коэффициент. Секции = Мощность / 150.',
      faq: [
        { question: 'Сколько Вт нужно на м²?', answer: 'Ориентировочно 100 Вт/м² для средней полосы России. Уточняйте по климатической зоне.' },
        { question: 'Что делать с угловыми комнатами?', answer: 'Увеличьте количество секций на 15-20% для угловых комнат или помещений с большими окнами.' }
      ],
      sources: [{ title: 'СНиП 2.04.05-91', url: 'https://docs.cntd.ru/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 7. Плитка на стены
  {
    id: 'wall-tiles',
    slug: 'plitka-steny',
    title: 'Расчёт плитки для стен',
    description: 'Расчёт количества плитки для облицовки стен в ванной, кухне и других помещениях',
    category: 'stroitelstvo-remont',
    subcategory: 'otdelka-sten',
    type: 'formula',
    inputs: [
      { name: 'perimeter', label: 'Периметр помещения (м)', type: 'number', placeholder: '12', defaultValue: 12, min: 1 },
      { name: 'height', label: 'Высота облицовки (м)', type: 'number', placeholder: '2.5', defaultValue: 2.5, min: 0.5 },
      { name: 'doorArea', label: 'Площадь дверного проёма (м²)', type: 'number', placeholder: '1.8', defaultValue: 1.8, min: 0 },
      { name: 'tileWidth', label: 'Ширина плитки (см)', type: 'number', placeholder: '20', defaultValue: 20, min: 5 },
      { name: 'tileHeight', label: 'Высота плитки (см)', type: 'number', placeholder: '30', defaultValue: 30, min: 5 }
    ],
    outputs: [
      { name: 'totalArea', label: 'Площадь облицовки', type: 'number', unit: 'м²' },
      { name: 'tilesCount', label: 'Количество плитки', type: 'number' },
      { name: 'tilesWithWaste', label: 'С запасом 10%', type: 'number' }
    ],
    calculate: (inputs) => {
      const perimeter = Number(inputs.perimeter);
      const height = Number(inputs.height);
      const doorArea = Number(inputs.doorArea);
      const tileW = Number(inputs.tileWidth) / 100;
      const tileH = Number(inputs.tileHeight) / 100;
      const totalArea = perimeter * height - doorArea;
      const tileArea = tileW * tileH;
      const tilesCount = Math.ceil(totalArea / tileArea);
      const tilesWithWaste = Math.ceil(tilesCount * 1.1);
      return [
        { value: Math.round(totalArea * 100) / 100, label: 'Площадь облицовки', unit: 'м²' },
        { value: tilesCount, label: 'Количество плитки' },
        { value: tilesWithWaste, label: 'С запасом 10%' }
      ];
    },
    content: {
      howTo: 'Введите периметр, высоту облицовки, площадь дверного проёма и размеры плитки.',
      about: 'Расчёт керамической плитки для стен с учётом дверных проёмов и запаса.',
      formula: 'Площадь = Периметр × Высота − Дверь. Количество = Площадь / (Ширина × Высота плитки).',
      faq: [
        { question: 'Какой запас плитки нужен?', answer: '10% для прямой раскладки, 15% для диагональной.' },
        { question: 'Учитывать ли затирку?', answer: 'Для расчёта количества — нет. Для расчёта затирки добавьте 1-2 мм на шов.' }
      ],
      sources: [{ title: 'Советы по укладке плитки', url: 'https://www.plitka.ru/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 8. Бетон М300
  {
    id: 'concrete-m300',
    slug: 'beton-m300',
    title: 'Расчёт бетона М300',
    description: 'Расчёт состава бетона М300 (ПВ20) для фундаментов и перекрытий',
    category: 'stroitelstvo-remont',
    subcategory: 'stroitelstvo-drugoe',
    type: 'formula',
    inputs: [
      { name: 'volume', label: 'Необходимый объём (м³)', type: 'number', placeholder: '5', defaultValue: 5, min: 0.1 },
      { name: 'aggregate', label: 'Крупный заполнитель', type: 'select', options: [{ value: 'gravel', label: 'Щебень' }, { value: 'crushed', label: 'Гравий' }], defaultValue: 'gravel' }
    ],
    outputs: [
      { name: 'cement', label: 'Цемент М400', type: 'number', unit: 'кг' },
      { name: 'sand', label: 'Песок', type: 'number', unit: 'кг' },
      { name: 'aggregate', label: 'Щебень/гравий', type: 'number', unit: 'кг' },
      { name: 'water', label: 'Вода', type: 'number', unit: 'л' }
    ],
    calculate: (inputs) => {
      const volume = Number(inputs.volume);
      const cement = volume * 350;
      const sand = volume * 650;
      const aggregate = volume * 1250;
      const water = volume * 200;
      return [
        { value: Math.round(cement), label: 'Цемент М400', unit: 'кг' },
        { value: Math.round(sand), label: 'Песок', unit: 'кг' },
        { value: Math.round(aggregate), label: 'Щебень/гравий', unit: 'кг' },
        { value: Math.round(water), label: 'Вода', unit: 'л' }
      ];
    },
    content: {
      howTo: 'Введите необходимый объём бетона. Калькулятор покажет состав смеси М300.',
      about: 'Состав бетона М300 (ПВ20) — стандартный марка для фундаментов и несущих конструкций.',
      usage: 'Для самостоятельного приготовления бетона или проверки поставки.',
      formula: 'На 1 м³: Цемент М400 — 350 кг, Песок — 650 кг, Щебень — 1250 кг, Вода — 200 л.',
      faq: [
        { question: 'Чем отличается М300 от М200?', answer: 'М300 прочнее (20 МПа против 15 МПа), подходит для несущих конструкций.' },
        { question: 'Можно ли использовать цемент М500?', answer: 'Да, уменьшите количество на 15-20% при использовании М500.' }
      ],
      sources: [{ title: 'ГОСТ 27006-86', url: 'https://docs.cntd.ru/' }],
      updatedAt: '2026-04-07'
    }
  }
];
