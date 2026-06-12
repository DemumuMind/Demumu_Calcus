import type { ComputeFn } from './compute-helpers';

export const computeMap_other_other2_a_4: Record<string, ComputeFn> = {
  'generator-sluchajnyh-imen': (inputs) => {
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
                if (withSurname)
                    surname = englishSurnames[Math.floor(Math.random() * englishSurnames.length)];
                break;
            case 'elf':
                firstName = elfPrefixes[Math.floor(Math.random() * elfPrefixes.length)] + elfSuffixes[Math.floor(Math.random() * elfSuffixes.length)];
                if (withSurname)
                    surname = elfSurnames[Math.floor(Math.random() * elfSurnames.length)];
                break;
            case 'dwarf':
                firstName = dwarfPrefixes[Math.floor(Math.random() * dwarfPrefixes.length)] + dwarfSuffixes[Math.floor(Math.random() * dwarfSuffixes.length)];
                if (withSurname)
                    surname = dwarfSurnames[Math.floor(Math.random() * dwarfSurnames.length)];
                break;
            case 'orc':
                firstName = orcPrefixes[Math.floor(Math.random() * orcPrefixes.length)] + orcSuffixes[Math.floor(Math.random() * orcSuffixes.length)];
                if (withSurname)
                    surname = orcSurnames[Math.floor(Math.random() * orcSurnames.length)];
                break;
            case 'cyber':
                firstName = cyberPrefixes[Math.floor(Math.random() * cyberPrefixes.length)] + cyberSuffixes[Math.floor(Math.random() * cyberSuffixes.length)];
                if (withSurname)
                    surname = cyberSurnames[Math.floor(Math.random() * cyberSurnames.length)];
                break;
            case 'random':
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
  'gidratacziya-sportsmena': (inputs) => {
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
  'gipsokarton-raschet': (inputs) => {
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
  'idealnyj-ves-pitomca': (inputs) => {
    const petType = String(inputs.petType);
    const currentWeight = Number(inputs.currentWeight);
    const idealWeight = Number(inputs.idealWeight);
    if (!currentWeight || !idealWeight) {
        return [
            { value: '—', label: 'Отклонение (кг)' },
            { value: '—', label: 'Отклонение (%)' },
            { value: '—', label: 'Оценка по BCS' },
            { value: '', label: 'Рекомендации' }
        ];
    }
    const weightDiff = currentWeight - idealWeight;
    const weightPercent = (weightDiff / idealWeight) * 100;
    let bcs = '';
    let _recommendation = '';
    if (weightPercent < -15) {
        bcs = '1-3/9 - Недостаточный вес';
        _recommendation = 'Увеличьте порции, проверьте здоровье у ветеринара';
    }
    else if (weightPercent < -5) {
        bcs = '4/9 - Ниже нормы';
        _recommendation = 'Небольшое увеличение порций';
    }
    else if (weightPercent <= 5) {
        bcs = '5/9 - Идеальный вес ✓';
        _recommendation = 'Отлично! Поддерживайте текущий рацион';
    }
    else if (weightPercent <= 15) {
        bcs = '6-7/9 - Избыточный вес';
        _recommendation = 'Уменьшите порции, увеличьте активность';
    }
    else {
        bcs = '8-9/9 - Ожирение';
        _recommendation = 'Нужна диета под наблюдением ветеринара';
    }
    return [
        { value: Math.round(weightDiff * 10) / 10, label: 'Отклонение (кг)' },
        { value: Math.round(weightPercent), label: 'Отклонение (%)' },
        { value: bcs, label: 'Оценка по BCS' },
        { value: _recommendation, label: 'Рекомендации' }
    ];
},
  'installment-calculator': (inputs): any => {
    const n = inputs as Record<string, number>;
    const loanAmount = inputs.itemPrice - inputs.downPayment;
    let monthlyPayment;
    let totalInterest;
    if (inputs.interestRate === 0) {
        monthlyPayment = Math.round(loanAmount / inputs.months);
        totalInterest = 0;
    }
    else {
        const monthlyRate = inputs.interestRate / 100 / 12;
        const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, inputs.months)) /
            (Math.pow(1 + monthlyRate, inputs.months) - 1);
        monthlyPayment = Math.round(payment);
        totalInterest = monthlyPayment * inputs.months - loanAmount;
    }
    const totalCost = inputs.downPayment + monthlyPayment * inputs.months;
    return [];
},
  'ip-kalkulyator': (inputs) => {
    const ip = String(inputs.ip);
    const prefix = parseInt(String(inputs.prefix), 10);
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return [
            { value: 'Ошибка в IP', label: 'Ошибка' },
            { value: '—', label: 'Маска' },
            { value: '—', label: 'Broadcast' },
            { value: '—', label: 'Хосты' },
            { value: '—', label: 'Диапазон' }
        ];
    }
    const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    const maskNum = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const networkNum = (ipNum & maskNum) >>> 0;
    const broadcastNum = (networkNum | (~maskNum >>> 0)) >>> 0;
    const hosts = Math.max(0, Math.pow(2, 32 - prefix) - 2);
    const toIp = (num: number) => {
        return [
            (num >>> 24) & 255,
            (num >>> 16) & 255,
            (num >>> 8) & 255,
            num & 255
        ].join('.');
    };
    const network = toIp(networkNum);
    const mask = toIp(maskNum);
    const broadcast = toIp(broadcastNum);
    const firstHost = toIp((networkNum + 1) >>> 0);
    const lastHost = toIp((broadcastNum - 1) >>> 0);
    return [
        { value: network, label: 'Сеть' },
        { value: mask, label: 'Маска подсети' },
        { value: broadcast, label: 'Широковещательный' },
        { value: hosts.toLocaleString(), label: 'Количество хостов' },
        { value: `${firstHost} — ${lastHost}`, label: 'Диапазон IP' }
    ];
},
  'izmenenie-v-procentah': (inputs) => {
    const oldValue = Number(inputs.oldValue) || 0;
    const newValue = Number(inputs.newValue) || 0;
    if (oldValue === 0)
        return [{ value: '—', label: 'Изменение' }];
    const result = ((newValue - oldValue) * 100) / oldValue;
    const sign = result > 0 ? '+' : '';
    return [
        { value: `${sign}${result.toFixed(2)}`, label: 'Изменение' },
        { value: `Изменение: ${oldValue} → ${newValue} = ${sign}${result.toFixed(2)}%`, label: 'Формула' },
    ];
},
  'jewelry-calculator': (inputs): any => {
    const faceShape = String(inputs.faceShape);
    const neckLength = String(inputs.neckLength);
    const occasion = String(inputs.occasion);
    const recommendations: Record<string, {
        earrings: string;
        necklace: string;
        rings: string;
    }> = {
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
    let necklace = data.necklace;
    if (neckLength === 'short') {
        necklace = 'Длинные цепи, кулоны ниже ключиц';
    }
    else if (neckLength === 'long') {
        necklace = 'Чокеры, короткие колье';
    }
    let earrings = data.earrings;
    if (occasion === 'work') {
        earrings = earrings.replace('люстры', 'средние').replace('крупные', 'сдержанные');
    }
    else if (occasion === 'evening') {
        earrings = earrings.replace('сдержанные', 'выразительные').replace('средние', 'крупные');
    }
    return [
        { value: earrings, label: 'Серьги', unit: '' },
        { value: necklace, label: 'Ожерелье', unit: '' },
        { value: data.rings, label: 'Кольца', unit: '' }
    ];
},
  'koefficient-szhatiya': (inputs) => {
    const originalSize = Number(inputs.originalSize);
    const compressedSize = Number(inputs.compressedSize);
    const compressionMethod = String(inputs.compressionMethod);
    if (!originalSize || !compressedSize) {
        return [
            { value: '—', label: 'Коэффициент сжатия' },
            { value: '—', label: 'Экономия', unit: '%' },
            { value: '—', label: 'Сэкономлено', unit: 'MB' },
            { value: '—', label: 'Эффективность' },
            { value: '—', label: 'Типично для' }
        ];
    }
    const ratio = originalSize / compressedSize;
    const _savingsPercent = ((originalSize - compressedSize) / originalSize) * 100;
    const savedSize = originalSize - compressedSize;
    let efficiency: string;
    if (ratio >= 10) {
        efficiency = 'Отличное (логи, текст)';
    }
    else if (ratio >= 3) {
        efficiency = 'Хорошее (JSON, XML)';
    }
    else if (ratio >= 1.5) {
        efficiency = 'Среднее (смешанные данные)';
    }
    else {
        efficiency = 'Низкое (уже сжатые данные)';
    }
    const typicalUses: Record<string, string> = {
        'zip': 'Универсальный, быстрый, хорош для документов',
        'gzip': 'Веб, HTTP сжатие, логи',
        'bzip2': 'Бэкапы, лучшее сжатие, медленнее',
        'xz': 'Максимальное сжатие, для архивов',
        'zstd': 'Баланс скорости и сжатия, современный',
        'lz4': 'Максимальная скорость, низкое сжатие'
    };
    return [
        { value: Number(ratio.toFixed(2)), label: 'Коэффициент сжатия' },
        { value: Math.round(_savingsPercent), label: 'Экономия', unit: '%' },
        { value: Math.round(savedSize), label: 'Сэкономлено', unit: 'MB' },
        { value: efficiency, label: 'Эффективность' },
        { value: typicalUses[compressionMethod], label: 'Типично для' }
    ];
},
  'kontrolnaya-summa': (inputs) => {
    const input = String(inputs.input);
    const algo = String(inputs.algorithm);
    if (algo === 'length') {
        return [
            { value: `${input.length} символов`, label: 'Длина строки' },
            { value: `${new Blob([input]).size} байт`, label: 'Размер в байтах' }
        ];
    }
    else if (algo === 'simple') {
        let sum = 0;
        for (let i = 0; i < input.length; i++) {
            sum = (sum + input.charCodeAt(i)) % 65535;
        }
        return [
            { value: sum.toString(16).toUpperCase().padStart(4, '0'), label: 'Простая контрольная сумма' },
            { value: 'Для реальных задач используйте MD5/SHA256', label: 'Примечание' }
        ];
    }
    else {
        return [
            { value: '—', label: 'Выберите алгоритм' },
            { value: 'MD5: 128 бит, SHA-1: 160 бит, SHA-256: 256 бит. CRC32 для проверки целостности.', label: 'Популярные алгоритмы' }
        ];
    }
},
  'korm-koshki': (inputs) => {
    const weight = Number(inputs.weight);
    const _age = String(inputs.age);
    const condition = String(inputs.condition);
    const foodType = String(inputs.foodType);
    if (!weight) {
        return [
            { value: '—', label: 'Калории (ккал/день)' },
            { value: '—', label: 'Количество (г/день)' },
            { value: '—', label: 'Банок влажного (85г)' },
            { value: '—', label: 'Воды (мл/день)' }
        ];
    }
    const rer = 70 * Math.pow(weight, 0.75);
    const conditionMultipliers: Record<string, number> = {
        neutered: 1.2,
        active: 1.4,
        inactive: 1.0,
        pregnant: 2.5
    };
    const ageMultipliers: Record<string, number> = {
        kitten: 2.5,
        adult: 1.0,
        senior: 0.9
    };
    const totalCalories = rer * (conditionMultipliers[condition] || 1.2) * (ageMultipliers[_age] || 1);
    let foodAmount = 0;
    let cansWet = 0;
    if (foodType === 'dry') {
        foodAmount = totalCalories / 3.8; // ~3.8 kcal/g
        cansWet = 0;
    }
    else if (foodType === 'wet') {
        foodAmount = totalCalories / 0.9; // ~0.9 kcal/g
        cansWet = Math.round(foodAmount / 85);
    }
    else if (foodType === 'mixed') {
        const dryCalories = totalCalories * 0.5;
        const wetCalories = totalCalories * 0.5;
        foodAmount = (dryCalories / 3.8) + (wetCalories / 0.9);
        cansWet = Math.round((wetCalories / 0.9) / 85);
    }
    const water = weight * 55;
    return [
        { value: Math.round(totalCalories), label: 'Калории (ккал/день)' },
        { value: Math.round(foodAmount), label: 'Количество (г/день)' },
        { value: cansWet, label: 'Банок влажного (85г)' },
        { value: Math.round(water), label: 'Воды (мл/день)' }
    ];
},
}
