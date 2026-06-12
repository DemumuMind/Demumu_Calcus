import type { ComputeFn } from './compute-helpers';

export const computeMap_daily_daily_b_4: Record<string, ComputeFn> = {
  'uhod-po-tipu-kozhi': (inputs) => {
    const skinType = String(inputs.skinType || 'combination');
    const _age = Number(inputs.age || 30);
    const concerns = String(inputs.concerns || 'dullness');
    const care: Record<string, {
        cleanser: string;
        toner: string;
        serum: string;
        moisturizer: string;
        sunscreen: string;
        weekly: string;
        avoid: string;
    }> = {
        dry: {
            cleanser: 'Масло/бальзам для умывания, молочко. Избегайте пенок и гелей',
            toner: 'Увлажняющие тонеры без спирта с гиалуроновой кислотой',
            serum: 'Гиалуроновая кислота 2%, масло шиповника, пептиды',
            moisturizer: 'Плотный крем с керамидами, скваланом, маслами',
            sunscreen: 'Увлажняющий SPF 30+ с гиалуроновой кислотой',
            weekly: '1-2 раза: нежная энзимная пудра или увлажняющая маска',
            avoid: 'Алкоголь в составах, салициловая кислота высокой концентрации, матовые тональные средства'
        },
        oily: {
            cleanser: 'Гель для умывания с салициловой кислотой (BHA), пенка',
            toner: 'Отшелушивающие тонеры с AHA/BHA, матирующие',
            serum: 'Ниацинамид 10%, цинк, лёгкие увлажняющие сыворотки',
            moisturizer: 'Гелевая текстура, oil-free, с ниацинамидом',
            sunscreen: 'Матирующий SPF 30+, желательно chemical-free или гибридный',
            weekly: '2-3 раза: глиняная маска, отшелушивание (BHA/AHA)',
            avoid: 'Тяжёлые масла (кокосовое, минеральное), спиртовые тонеры, плотные кремы'
        },
        combination: {
            cleanser: 'Нежный гель или пенка без SLS, двойное очищение вечером',
            toner: 'Сбалансированные тонеры, можно разные для T-зоны и щёк',
            serum: 'Ниацинамид, гиалуроновая кислота, лёгкие антиоксиданты',
            moisturizer: 'Лёгкий крем или гель-крем, возможно разные для зон',
            sunscreen: 'Универсальный SPF 30+, не утяжеляющий',
            weekly: '1-2 раза: комбинированные маски (глиняная на T-зону, увлажняющая на щёки)',
            avoid: 'Слишком агрессивные средства для всего лица, тяжёлые масла на T-зону'
        },
        normal: {
            cleanser: 'Мягкие гели, муссы, пенки — любые приятные текстуры',
            toner: 'Увлажняющие или с лёгкими кислотами для поддержания',
            serum: 'Витамин C (утро), ретинол 0.3% (вечер), пептиды',
            moisturizer: 'Крем по сезону: лёгкий летом, плотнее зимой',
            sunscreen: 'SPF 30+ любой текстуры — это основа профилактики',
            weekly: '1 раз: маска по настроению — увлажняющая, питательная, очищающая',
            avoid: 'Ничего особенно — поддерживайте баланс и наслаждайтесь кожей'
        },
        sensitive: {
            cleanser: 'Мицеллярная вода, очищающее молочко без отдушек',
            toner: 'Термальная вода, тонеры с пантенолом, аллантоином',
            serum: 'Центелла азиатская, пантенол, лёгкая гиалуроновая кислота',
            moisturizer: 'Кремы с церамидами, без отдушек и спирта',
            sunscreen: 'Физический SPF 30+ с цинком или диоксидом титана',
            weekly: 'Максимум 1 раз: нежная увлажняющая маска. Избегайте активных кислот',
            avoid: 'Отдушки, спирт, эфирные масла, высокие концентрации кислот, ретинол'
        }
    };
    const rec = care[skinType];
    let ageAdjust = '';
    if (_age >= 35) {
        if (concerns === 'wrinkles') {
            ageAdjust = ' (30+) Добавьте: ретинол 0.5% через месяц адаптации, пептидные кремы';
        }
        else if (concerns === 'darkspots') {
            ageAdjust = ' (30+) Добавьте: альфа-арбутин, транексамовая кислота, профессиональные пилинги';
        }
    }
    return [
        { value: rec.cleanser, label: 'Очищение' },
        { value: rec.toner, label: 'Тоник/эссенция' },
        { value: rec.serum + ageAdjust, label: 'Сыворотка' },
        { value: rec.moisturizer, label: 'Увлажнение' },
        { value: rec.sunscreen, label: 'Защита от солнца' },
        { value: rec.weekly, label: 'Еженедельный уход' },
        { value: rec.avoid, label: 'Избегать' }
    ];
},
  'uhod-za-rasteniyami': (inputs) => {
    const plantType = String(inputs.plantType || 'cucumber');
    const plantCount = Number(inputs.plantCount || 10);
    const season = String(inputs.season || 'summer');
    const soilType = String(inputs.soilType || 'loam');
    const waterNeeds: Record<string, number> = {
        cucumber: 1.5, tomato: 1.0, pepper: 0.8, potato: 1.2,
        carrot: 0.5, onion: 0.4, berry: 1.0
    };
    const seasonMult: Record<string, number> = {
        spring: 0.6, summer: 1.0, autumn: 0.7
    };
    const soilMult: Record<string, number> = {
        sand: 1.5, loam: 1.0, clay: 0.8, peat: 0.9
    };
    const baseWater = waterNeeds[plantType] || 1.0;
    const waterPerDay = plantCount * baseWater * seasonMult[season] * soilMult[soilType];
    let wateringFreq = '';
    if (season === 'summer') {
        wateringFreq = soilType === 'sand' ? 'Каждый день' : '1-2 раза в неделю';
    }
    else {
        wateringFreq = soilType === 'sand' ? '2-3 раза в неделю' : '1 раз в неделю';
    }
    let fertilizerFreq = '';
    let fertilizerPerSeason = 0;
    if (plantType === 'tomato' || plantType === 'pepper' || plantType === 'cucumber') {
        fertilizerFreq = 'Каждые 2 недели';
        fertilizerPerSeason = plantCount * 50 * (season === 'summer' ? 1 : 0.5);
    }
    else if (plantType === 'potato') {
        fertilizerFreq = '2 раза за сезон';
        fertilizerPerSeason = plantCount * 30;
    }
    else {
        fertilizerFreq = '1 раз в месяц';
        fertilizerPerSeason = plantCount * 20;
    }
    // Care notes
    let careNotes = '';
    if (plantType === 'cucumber') {
        careNotes = 'Огурцы любят влагу — поливать утром или вечером. Подвязывайте к шпалере.';
    }
    else if (plantType === 'tomato') {
        careNotes = 'Пасынкуйте помидоры. Полив у корня, не на листья. Для детерминантных подвязывайте.';
    }
    else if (plantType === 'berry') {
        careNotes = 'Обрезайте старые ветви. Мульчируйте почву для сохранения влаги.';
    }
    else {
        careNotes = 'Следите за влажностью почвы. Убирайте сорняки вовремя.';
    }
    return [
        { value: wateringFreq, label: 'Частота полива' },
        { value: fertilizerFreq, label: 'Частота подкормки' },
        { value: Math.round(fertilizerPerSeason), label: 'Удобрений за сезон', unit: 'г' },
        { value: Math.round(waterPerDay * 10) / 10, label: 'Воды в день', unit: 'л' },
        { value: careNotes, label: 'Рекомендации по уходу' }
    ];
},
  'uhod-za-volosami': (inputs) => {
    const hairType = String(inputs.hairType || 'straight');
    const hairTexture = String(inputs.hairTexture || 'medium');
    const scalpType = String(inputs.scalpType || 'normal');
    const hairLength = String(inputs.hairLength || 'medium');
    const concern = String(inputs.mainConcern || 'dryness');
    let shampoo = '';
    let conditioner = '';
    let treatment = '';
    let styling = '';
    let washFreq = '';
    let tips = '';
    if (scalpType === 'oily') {
        shampoo = 'Очищающий шампунь с мягкими ПАВ, без силиконов. Можно использовать шампунь-скраб 1 раз в неделю.';
        washFreq = 'Через день или каждый день при сильной жирности';
    }
    else if (scalpType === 'dry' || scalpType === 'sensitive') {
        shampoo = 'Ультра-мягкий шампунь без SLS/SLES, с пантенолом, аллантоином';
        washFreq = '1-2 раза в неделю, использовать тёплую (не горячую) воду';
    }
    else {
        shampoo = 'Увлажняющий или балансирующий шампунь по типу волос';
        washFreq = '2-3 раза в неделю или по мере загрязнения';
    }
    // Conditioner based on hair type, texture and length
    if (hairType === 'curly' || hairType === 'coily') {
        conditioner = 'Густой кондиционер/маска с маслами (ши, кокос, аргана), метод "сквиш-кондишн"';
        treatment = 'Несмываемый кондиционер (leave-in) + масло для кончиков';
        styling = 'Крем для кудрей (curl cream), гель сильной фиксации (для афро), диффузор';
        tips = 'Метод Curly Girl: без сульфатов и силиконов, плopping, не трите волосы полотенцем';
    }
    else if (hairType === 'wavy') {
        conditioner = 'Лёгкий кондиционер с несмываемым эффектом, можно только на кончики';
        treatment = 'Лёгкая несмываемая сыворотка или молочко';
        styling = 'Мусс для объёма у корней, текстурирующий спрей, диффузор или естественная сушка';
        tips = 'Сушите волосы, наклонив голову вниз, для объёма у корней';
    }
    else {
        if (hairTexture === 'fine') {
            conditioner = 'Лёгкий кондиционер только на кончики, избегайте корней';
            styling = 'Сухой шампунь для объёма, текстурирующая пудра у корней';
            tips = 'Мойте волосы прохладной водой для блеска, не перегружайте корни уходом';
        }
        else {
            conditioner = 'Увлажняющий кондиционер по длине, избегая жирной кожи головы';
            styling = 'Термозащита при укладке, сыворотка для блеска на кончики';
            tips = 'Регулярная стрижка кончиков каждые 8-10 недель';
        }
    }
    if (concern === 'dandruff') {
        shampoo = 'Шампунь против перхоти с кетоконазолом, цинком пиритионом или салициловой кислотой';
        treatment = 'Сыворотка для кожи головы с чайным деревом, пептидами';
        tips = tips + ' Не царапайте голову, при сильной перхоти — консультация трихолога.';
    }
    else if (concern === 'damage') {
        treatment = 'Кератиновое восстановление, маски с протеинами (не чаще 1 раза в неделю!), термозащита обязательна';
        tips = tips + ' Восстановление занимает 3-6 месяцев, регулярно подстригайте повреждённые концы.';
    }
    else if (concern === 'dryness') {
        treatment = 'Масляные маски (кокос, аргана) на ночь, несмываемые сыворотки с маслами';
    }
    else if (concern === 'volume') {
        styling = styling + ' + Объёмный мусс у корней, сушка головой вниз, прикорневой лифтинг';
    }
    if (hairLength === 'long') {
        tips = tips + ' Длинные волосы старше 2-3 лет — используйте питательные маски на длину.';
    }
    return [
        { value: shampoo, label: 'Шампунь' },
        { value: conditioner, label: 'Кондиционер/бальзам' },
        { value: treatment, label: 'Уходовое средство' },
        { value: styling, label: 'Стайлинг' },
        { value: washFreq, label: 'Частота мытья' },
        { value: tips, label: 'Советы по уходу' }
    ];
},
  'urozhaynost': (inputs) => {
    const area = Number(inputs.area);
    const crop = String(inputs.crop);
    const skill = String(inputs.skill);
    if (!area) {
        return [
            { value: '—', label: 'Ожидаемый урожай', unit: 'кг' },
            { value: '—', label: 'Урожайность', unit: 'кг/м²' },
            { value: '—', label: 'Рыночная стоимость', unit: '₽' },
            { value: '—', label: 'Диапазон' },
            { value: '—', label: 'Советы по увеличению' }
        ];
    }
    const baseYields: Record<string, number> = {
        'tomato': 8,
        'cucumber': 6,
        'potato': 4,
        'carrot': 5,
        'beet': 6,
        'cabbage': 7,
        'onion': 4,
        'garlic': 3,
        'pumpkin': 10,
        'zucchini': 8
    };
    const skillMults: Record<string, number> = {
        'beginner': 0.6,
        'intermediate': 1.0,
        'expert': 1.4
    };
    const prices: Record<string, number> = {
        'tomato': 150,
        'cucumber': 100,
        'potato': 50,
        'carrot': 60,
        'beet': 50,
        'cabbage': 40,
        'onion': 60,
        'garlic': 300,
        'pumpkin': 40,
        'zucchini': 80
    };
    const baseYield = baseYields[crop];
    const mult = skillMults[skill];
    const yieldPerMeter = baseYield * mult;
    const totalYield = yieldPerMeter * area;
    const value = totalYield * prices[crop];
    const minYield = baseYield * 0.5 * area; // Poor conditions
    const maxYield = baseYield * 1.8 * area; // Excellent conditions
    const tips: Record<string, string> = {
        'tomato': 'Формируйте в 1-2 стебля, удаляйте пасынки, подвязывайте.',
        'cucumber': 'Установите шпалеру, регулярно поливайте, собирайте молодыми.',
        'potato': 'Окучивайте 2-3 раза, соблюдайте севооборот.',
        'carrot': 'Прореживайте, мульчируйте чтобы предотвратить зеленение.',
        'beet': 'Не переборщите с азотом — будут пустоты в корне.',
        'cabbage': 'Поливайте равномерно, иначе растрескаются кочаны.',
        'onion': 'После перо начнёт падать — прекращайте полив.',
        'garlic': 'Сажайте осенью, убирайте когда листья пожелтеют.',
        'pumpkin': 'Оставьте 2-3 плода на растение, удалите остальные.',
        'zucchini': 'Собирайте молодые (20-25 см) — они самые вкусные.'
    };
    return [
        { value: Math.round(totalYield), label: 'Ожидаемый урожай', unit: 'кг' },
        { value: Number(yieldPerMeter.toFixed(1)), label: 'Урожайность', unit: 'кг/м²' },
        { value: Math.round(value), label: 'Рыночная стоимость', unit: '₽' },
        { value: `${Math.round(minYield)} - ${Math.round(maxYield)} кг`, label: 'Диапазон' },
        { value: tips[crop], label: 'Советы по увеличению' }
    ];
},
  'urozhaynost-teplitsy': (inputs) => {
    const length = Number(inputs.greenhouseLength || 6);
    const width = Number(inputs.greenhouseWidth || 3);
    const cropType = String(inputs.cropType || 'tomatoes');
    const method = String(inputs.growingMethod || 'ground');
    const heating = String(inputs.heating || 'none');
    const area = length * width;
    const density: Record<string, Record<string, number>> = {
        tomatoes: { ground: 3, hydro: 4, dutch: 5 },
        cucumbers: { ground: 2, hydro: 3, dutch: 4 },
        peppers: { ground: 4, hydro: 5, dutch: 6 },
        eggplants: { ground: 2.5, hydro: 3, dutch: 4 },
        mixed: { ground: 3, hydro: 4, dutch: 4.5 }
    };
    const plantsPerM2 = density[cropType]?.[method] || 3;
    const totalPlants = Math.floor(area * plantsPerM2);
    const yields: Record<string, Record<string, number>> = {
        tomatoes: { ground: 4, hydro: 6, dutch: 8 },
        cucumbers: { ground: 3, hydro: 5, dutch: 7 },
        peppers: { ground: 1.5, hydro: 2.5, dutch: 3 },
        eggplants: { ground: 2, hydro: 3, dutch: 4 },
        mixed: { ground: 3, hydro: 4.5, dutch: 5.5 }
    };
    const yieldPerPlant = yields[cropType]?.[method] || 3;
    let totalYield = totalPlants * yieldPerPlant;
    const seasons = heating === 'yes' ? 3 : 1;
    totalYield = totalYield * seasons;
    const prices: Record<string, number> = {
        tomatoes: 150, cucumbers: 120, peppers: 200, eggplants: 150, mixed: 150
    };
    const pricePerKg = prices[cropType] || 150;
    const revenue = totalYield * pricePerKg;
    return [
        { value: Math.round(area * 10) / 10, label: 'Площадь теплицы', unit: 'м²' },
        { value: totalPlants, label: 'Растений поместится', unit: 'шт' },
        { value: Math.round(totalYield * 10) / 10, label: 'Ожидаемый урожай', unit: 'кг' },
        { value: Math.round(revenue), label: 'Примерная стоимость', unit: '₽' },
        { value: seasons, label: 'Сезонов выращивания', unit: '' }
    ];
},
  'varka-yaic': (inputs) => {
    const eggSize = String(inputs.eggSize);
    const eggTemp = String(inputs.eggTemp);
    const doneness = String(inputs.doneness);
    const altitude = Number(inputs.altitude);
    const baseTimes: Record<string, number> = {
        'soft': 6,
        'medium': 8,
        'hard': 10
    };
    let cookingTime = baseTimes[doneness];
    const sizeMultipliers: Record<string, number> = {
        'small': 0.85,
        'medium': 0.92,
        'large': 1.0,
        'xlarge': 1.1
    };
    cookingTime *= sizeMultipliers[eggSize];
    if (eggTemp === 'room') {
        cookingTime *= 0.85; // Room temp eggs cook faster
    }
    // Altitude adjustment (boiling point drops ~1°C per 300m)
    if (altitude > 1000) {
        cookingTime *= (1 + altitude / 5000);
    }
    const prepNote = eggTemp === 'fridge'
        ? 'Для точности выньте яйца за 5-10 минут до варки или увеличьте время на 1 минуту'
        : 'Яйца комнатной температуры — оптимально для контроля времени';
    const techniques: Record<string, string> = {
        'soft': 'Закипятите воду, осторожно опустите яйца, варите точное время, сразу охладите ледяной водой 1 мин',
        'medium': 'Закипятите воду, опустите яйца, варите, охладите ледяной водой 2 мин',
        'hard': 'Закипятите воду, опустите яйца, варите, охладите ледяной водой 3-5 мин'
    };
    const results: Record<string, string> = {
        'soft': 'Белок схватился, желток жидкий и яркий. Идеально для солдатиков.',
        'medium': 'Белок полностью схватился, желток густой кремообразный. Идеально для салатов.',
        'hard': 'Белок и желток полностью сварены. Идеально для паштета и нарезки.'
    };
    return [
        { value: Number(cookingTime.toFixed(1)), label: 'Время варки', unit: 'мин' },
        { value: prepNote, label: 'Подготовка' },
        { value: techniques[doneness], label: 'Техника' },
        { value: results[doneness], label: 'Результат' }
    ];
},
}
