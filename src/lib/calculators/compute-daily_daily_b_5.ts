import type { ComputeFn } from './compute-helpers';

export const computeMap_daily_daily_b_5: Record<string, ComputeFn> = {
  'visokosnye-gody': (inputs) => {
    const mode = String(inputs.mode);
    function isLeap(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    if (mode === 'check') {
        const year = Number(inputs.year);
        const leap = isLeap(year);
        const days = leap ? 366 : 365;
        return [
            { value: leap ? 'Да, високосный' : 'Нет, обычный год', label: 'Результат' },
            { value: days.toString(), label: 'Дней в году', unit: 'дн.' }
        ];
    }
    else {
        const startYear = Number(inputs.startYear);
        const endYear = Number(inputs.endYear);
        if (startYear > endYear) {
            return [{ value: '—', label: 'Результат', additionalInfo: 'Начальный год должен быть меньше конечного' }];
        }
        const leapYears: number[] = [];
        for (let y = startYear; y <= endYear; y++) {
            if (isLeap(y))
                leapYears.push(y);
        }
        const result = leapYears.length > 0
            ? leapYears.join(', ')
            : 'Нет високосных годов в указанном диапазоне';
        return [
            { value: result, label: 'Високосные годы' },
            { value: leapYears.length.toString(), label: 'Количество', unit: 'шт.' }
        ];
    }
},
  'vozrast-sobaki': (inputs) => {
    const dogAge = Number(inputs.dogAge);
    const dogSize = String(inputs.dogSize);
    if (!dogAge)
        return [{ value: '—', label: 'Результат' }];
    let humanAge = 0;
    if (dogAge <= 1) {
        humanAge = dogAge * 15;
    }
    else if (dogAge <= 2) {
        humanAge = 15 + (dogAge - 1) * 9;
    }
    else {
        const multipliers: Record<string, number> = {
            'small': 4,
            'medium': 5,
            'large': 6,
            'giant': 7
        };
        humanAge = 24 + (dogAge - 2) * multipliers[dogSize];
    }
    let lifeStage = '';
    if (dogAge < 1)
        lifeStage = 'Щенок';
    else if (dogAge < 3)
        lifeStage = 'Молодая собака';
    else if (dogAge < 7)
        lifeStage = 'Взрослая собака';
    else if (dogAge < 10)
        lifeStage = 'Зрелая собака';
    else
        lifeStage = 'Пожилая собака';
    return [
        { value: Math.round(humanAge).toString(), label: 'Человеческие годы', unit: 'лет' },
        { value: lifeStage, label: 'Этап жизни' }
    ];
},
  'vozrast-tochnyj': (inputs) => {
    const birth = new Date(String(inputs.birthDate));
    const target = inputs.targetDate ? new Date(String(inputs.targetDate)) : new Date();
    if (birth > target) {
        return [
            { value: 'Ошибка', label: 'Дата рождения в будущем' },
            { value: 0, label: '—' },
            { value: 0, label: '—' },
            { value: '—', label: '—' },
            { value: '—', label: '—' }
        ];
    }
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();
    if (days < 0) {
        months--;
        const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const nextBirthday = new Date(birth);
    nextBirthday.setFullYear(target.getFullYear());
    if (nextBirthday < target) {
        nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysToBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    return [
        { value: years, label: 'Полных лет', unit: 'лет' },
        { value: months, label: 'Месяцев', unit: 'мес.' },
        { value: days, label: 'Дней', unit: 'дн.' },
        { value: totalDays.toLocaleString(), label: 'Всего дней' },
        { value: `${daysToBirthday} дней`, label: 'До дня рождения' }
    ];
},
  'vremya-gotovki': (inputs) => {
    const foodType = String(inputs.foodType);
    const weight = Number(inputs.weight);
    const temperature = Number(inputs.temperature);
    if (!weight || !temperature) {
        return [
            { value: '—', label: 'Время готовки' },
            { value: '—', label: 'Целевая внутренняя температура', unit: '°C' },
            { value: '—', label: 'Время отдыха', unit: 'мин' },
            { value: '—', label: 'Общее время до подачи' },
            { value: '—', label: 'Рекомендации' }
        ];
    }
    const cookingData: Record<string, {
        minPerKg: number;
        targetTemp: number;
        restingRatio: number;
        tips: string;
    }> = {
        'chicken': { minPerKg: 45, targetTemp: 74, restingRatio: 0.15, tips: 'Желательно использовать термометр. Кожа должна быть золотистой.' },
        'turkey': { minPerKg: 40, targetTemp: 74, restingRatio: 0.25, tips: 'Запекайте грудкой вверх. Покрывайте фольгой, если темнеет.' },
        'beef': { minPerKg: 50, targetTemp: 63, restingRatio: 0.20, tips: 'Для medium-rare цель 57°C. Давайте отдохнуть перед нарезкой.' },
        'pork': { minPerKg: 55, targetTemp: 71, restingRatio: 0.15, tips: 'Современные стандарты допускают 63°C (розовый), но 71°C безопаснее.' },
        'lamb': { minPerKg: 45, targetTemp: 63, restingRatio: 0.20, tips: 'Как и говядина: 57°C для розового, 63°C для well-done.' },
        'fish': { minPerKg: 20, targetTemp: 63, restingRatio: 0.05, tips: 'Проверяйте прозрачность: должна стать белой и нежной.' },
        'potatoes': { minPerKg: 60, targetTemp: 95, restingRatio: 0, tips: 'Запекайте до мягкости ножа. Можно обернуть фольгой.' },
        'cake': { minPerKg: 35, targetTemp: 100, restingRatio: 0.10, tips: 'Проверяйте сухой шпажкой. Должна выходить чистой.' }
    };
    const data = cookingData[foodType];
    const tempFactor = Math.pow(180 / temperature, 1.5);
    const baseMinutes = data.minPerKg * weight * tempFactor;
    const hours = Math.floor(baseMinutes / 60);
    const minutes = Math.round(baseMinutes % 60);
    const cookingTime = hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
    const restingMinutes = Math.round(baseMinutes * data.restingRatio);
    const totalMinutes = Math.round(baseMinutes + restingMinutes);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMins = totalMinutes % 60;
    const totalTime = totalHours > 0 ? `${totalHours} ч ${totalMins} мин` : `${totalMins} мин`;
    return [
        { value: cookingTime, label: 'Время готовки' },
        { value: data.targetTemp, label: 'Целевая внутренняя температура', unit: '°C' },
        { value: restingMinutes, label: 'Время отдыха', unit: 'мин' },
        { value: totalTime, label: 'Общее время до подачи' },
        { value: data.tips, label: 'Рекомендации' }
    ];
},
  'vremya-sna': (inputs) => {
    const mode = String(inputs.mode);
    const timeStr = String(inputs.time);
    const fallAsleep = Number(inputs.fallAsleep);
    const cycles = Number(inputs.cycles);
    const [hours, minutes] = timeStr.split(':').map(Number);
    const baseTime = hours * 60 + minutes;
    const cycleLength = 90;
    const totalSleep = cycles * cycleLength;
    const results = [];
    if (mode === 'wake') {
        for (let i = 3; i <= 6; i++) {
            const sleepMinutes = i * cycleLength;
            const sleepTime = baseTime - sleepMinutes - fallAsleep;
            let h = Math.floor((sleepTime / 60) % 24);
            if (h < 0)
                h += 24;
            const m = Math.abs(Math.floor(sleepTime % 60));
            results.push(`${i} циклов (${sleepMinutes / 60} ч): ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
        }
    }
    else {
        for (let i = 4; i <= 6; i++) {
            const wakeTime = baseTime + fallAsleep + (i * cycleLength);
            const h = Math.floor((wakeTime / 60) % 24);
            const m = Math.floor(wakeTime % 60);
            results.push(`${i} циклов (${i * 1.5} ч): ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
        }
    }
    return [
        { value: results[0], label: mode === 'wake' ? 'Лечь спать' : 'Проснуться' },
        { value: results[1], label: mode === 'wake' ? 'Лечь спать' : 'Проснуться' },
        { value: results[2], label: mode === 'wake' ? 'Лечь спать' : 'Проснуться' }
    ];
},
  'vremya-uborki': (inputs) => {
    const rooms = Number(inputs.rooms);
    const area = Number(inputs.area);
    const cleaningType = String(inputs.cleaningType);
    const tasks = String(inputs.tasks);
    const cleaners = Number(inputs.cleaners);
    const timePerSqm: Record<string, number> = {
        'light': 0.5,
        'regular': 1.0,
        'deep': 2.5,
        'moveout': 3.5
    };
    let baseTime = area * timePerSqm[cleaningType];
    const roomTime = rooms * 10; // 10 min per room additional
    baseTime += roomTime;
    const extraTimes: Record<string, number> = {
        'none': 0,
        'windows': 30,
        'fridge': 20,
        'oven': 25,
        'all': 75
    };
    const extraTime = extraTimes[tasks];
    baseTime += extraTime;
    const timePerPerson = Math.round(baseTime / cleaners);
    const hours = Math.floor(baseTime / 60);
    const minutes = Math.round(baseTime % 60);
    const totalTimeStr = hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
    const ppHours = Math.floor(timePerPerson / 60);
    const ppMinutes = Math.round(timePerPerson % 60);
    const ppTimeStr = ppHours > 0 ? `${ppHours} ч ${ppMinutes} мин` : `${ppMinutes} мин`;
    const timePerRoom = Math.round(baseTime / rooms);
    const roomBreakdown = `В среднем ${timePerRoom} мин на комнату (кухня и ванная занимают больше времени)`;
    const extraTasksStr: Record<string, string> = {
        'none': 'Нет дополнительных задач',
        'windows': 'Мытьё окон — ~30 мин',
        'fridge': 'Чистка холодильника — ~20 мин',
        'oven': 'Чистка духовки — ~25 мин',
        'all': 'Окна (30 мин) + Холодильник (20 мин) + Духовка (25 мин) = 75 мин'
    };
    const tips = 'Советы: убирайтесь сверху вниз, двигайтесь по часовой стрелке в комнате, используйте микрофибру, собирайте всё в корзину перед уборкой.';
    return [
        { value: totalTimeStr, label: 'Всего времени (всем вместе)' },
        { value: ppTimeStr, label: `На каждого (${cleaners} чел)` },
        { value: roomBreakdown, label: 'По комнатам' },
        { value: extraTasksStr[tasks], label: 'Дополнительно' },
        { value: tips, label: 'Ускорение' }
    ];
},
  'vremya-varki': (inputs) => {
    const product = String(inputs.product);
    const data: Record<string, {
        time: string;
        water: string;
        salt: string;
        tips: string;
    }> = {
        'egg-soft': { time: '4–5 мин (закипятить воду → опустить яйца)', water: 'Покрыть на 2 см', salt: '1 ч.л.', tips: 'Яйца из холодильника варить на 1 минуту дольше. Сразу охладить ледяной водой, чтобы остановить приготовление.' },
        'egg-medium': { time: '6–7 мин', water: 'Покрыть на 2 см', salt: '1 ч.л.', tips: 'Желток густой кремообразный. Идеально для салатов и ланч-боксов.' },
        'egg-hard': { time: '9–10 мин', water: 'Покрыть на 2 см', salt: '1 ч.л.', tips: 'Переваренные яйца получают серый ободок вокруг желтка. Для паштета и нарезки — оптимально.' },
        'spaghetti': { time: '8–10 мин (по упаковке al dente −1 мин)', water: '1 л на 100 г', salt: '10 г (1 ст.л.)', tips: 'Варить в большом количестве воды. Не промывать — крахмал помогает соусу прилипать. Сохранить 1 стакан воды от макарон.' },
        'potatoes-whole': { time: '20–30 мин (зависит от размера)', water: 'Покрыть на 3 см', salt: '1 ч.л.', tips: 'Начинать с холодной воды — так картофель варится равномерно. Проверить ножом: должен входить легко.' },
        'potatoes-cubes': { time: '10–15 мин (кубики 2 см)', water: 'Покрыть на 3 см', salt: '1 ч.л.', tips: 'Кипятить воду, затем опустить кубики — так сохраняется больше витаминов.' },
        'rice-white': { time: '15–18 мин (парить под крышкой 5 мин)', water: '1,5 части воды на 1 часть риса', salt: '0,5 ч.л. на 1 ст. риса', tips: 'Промыть до прозрачной воды. Не мешать во время варки. Дать постоять под крышкой 10 мин после выключения.' },
        'rice-brown': { time: '35–45 мин', water: '2,5 части воды на 1 часть риса', salt: '0,5 ч.л. на 1 ст. риса', tips: 'Предварительно замочить на 30 мин для мягкости. Варить на медленном огне.' },
        'buckwheat': { time: '15–20 мин (парить под крышкой 5 мин)', water: '2 части воды на 1 часть гречки', salt: '0,5 ч.л. на 1 ст. гречки', tips: 'Не промывать, если варите в пакетиках. Для рассыпчатости — не мешать и дать постоять 5–10 мин.' },
        'pasta-short': { time: '7–9 мин (по упаковке)', water: '1 л на 100 г', salt: '10 г (1 ст.л.)', tips: 'Следить за временем на упаковке. Al dente — с лёгкой твёрдостью в центре. Не разваривайте!' }
    };
    const item = data[product];
    if (!item) {
        return [
            { value: '—', label: 'Время варки' },
            { value: '—', label: 'Вода на 100 г' },
            { value: '—', label: 'Соль на 1 л воды' },
            { value: '—', label: 'Советы' }
        ];
    }
    return [
        { value: item.time, label: 'Время варки' },
        { value: item.water, label: 'Вода на 100 г' },
        { value: item.salt, label: 'Соль на 1 л воды' },
        { value: item.tips, label: 'Советы' }
    ];
},
  'vstrecha-novogo-goda': (inputs) => {
    const guests = Number(inputs.guests);
    const duration = Number(inputs.duration);
    const alcohol = String(inputs.alcohol);
    const location = String(inputs.location);
    const foodPerPerson = 1000;
    let alcoholPerPerson = 500;
    if (alcohol === 'full')
        alcoholPerPerson = 1500;
    else if (alcohol === 'wine')
        alcoholPerPerson = 800;
    else
        alcoholPerPerson = 200;
    const foodCost = foodPerPerson * guests;
    const drinksCost = alcoholPerPerson * guests;
    let totalCost = foodCost + drinksCost;
    if (location === 'cafe')
        totalCost = totalCost * 2 + guests * 1500;
    const perPerson = totalCost / guests;
    let shoppingList = '';
    if (alcohol === 'full')
        shoppingList = 'Шампанское (1 бут/3 чел), вино, водка/виски, пиво, закуски, салаты, мясо/рыба, фрукты';
    else if (alcohol === 'wine')
        shoppingList = 'Шампанское, вино 2-3 видов, соки, закуски, салаты, десерт';
    else
        shoppingList = 'Шампанское (для тоста), соки, лимонады, закуски, салаты, фрукты';
    return [
        { value: foodCost, label: 'Еда', unit: '₽' },
        { value: drinksCost, label: 'Напитки', unit: '₽' },
        { value: totalCost, label: 'Итого', unit: '₽' },
        { value: Math.round(perPerson), label: 'На человека', unit: '₽' },
        { value: shoppingList, label: 'Примерный список' }
    ];
},
  'zamena-ingredientov': (inputs) => {
    const originalIngredient = String(inputs.originalIngredient);
    const originalAmount = Number(inputs.originalAmount);
    const substituteIngredient = String(inputs.substituteIngredient);
    if (!originalAmount) {
        return [
            { value: '—', label: 'Количество заменителя', unit: 'г/мл' },
            { value: '—', label: 'Необходимые корректировки' },
            { value: '—', label: 'Важные замечания' }
        ];
    }
    const ratios: Record<string, Record<string, {
        ratio: number;
        adjustments: string;
        notes: string;
    }>> = {
        'butter': {
            'oil': { ratio: 0.75, adjustments: 'Уменьшите жидкость на 15%', notes: 'Используйте нейтральное масло. Вкус будет слегка отличаться.' },
            'applesauce': { ratio: 0.5, adjustments: 'Уменьшите сахар на 25%', notes: 'Лучше для выпечки. Текстура будет более влажной.' },
            'coconut_oil': { ratio: 0.75, adjustments: 'Нет изменений', notes: 'Придаст лёгкий кокосовый вкус. Сохраняет текстуру.' }
        },
        'sugar': {
            'honey': { ratio: 0.75, adjustments: 'Уменьшите жидкость на 20%', notes: 'Мёд слаще сахара. Нагревается быстрее.' },
            'syrup': { ratio: 0.75, adjustments: 'Уменьшите жидкость на 25%', notes: 'Текстура будет более влажной и плотной.' }
        },
        'egg': {
            'banana': { ratio: 1, adjustments: '1 банан = 1 яйцо', notes: 'Лучше для блинов и маффинов. Придаст банановый вкус.' },
            'applesauce': { ratio: 60, adjustments: '60 мл = 1 яйцо', notes: 'Универсальная замена. Текстура плотнее.' }
        },
        'milk': {
            'oil': { ratio: 1, adjustments: 'Для молока используйте воду + масло', notes: 'Для выпечки: замените объём.' }
        }
    };
    const defaultSub = { ratio: 1, adjustments: 'Замените 1:1', notes: 'Проверьте консистенцию теста.' };
    const substitution = ratios[originalIngredient]?.[substituteIngredient] || defaultSub;
    const substituteAmount = originalAmount * substitution.ratio;
    return [
        { value: Math.round(substituteAmount), label: 'Количество заменителя', unit: 'г/мл' },
        { value: substitution.adjustments, label: 'Необходимые корректировки' },
        { value: substitution.notes, label: 'Важные замечания' }
    ];
},
  'znak-zodiaka': (inputs) => {
    const day = Number(inputs.day);
    const month = Number(inputs.month);
    // Zodiac signs with their start dates (month, day)
    const signs = [
        { name: 'Козерог', element: 'Земля', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
        { name: 'Водолей', element: 'Воздух', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
        { name: 'Рыбы', element: 'Вода', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
        { name: 'Овен', element: 'Огонь', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
        { name: 'Телец', element: 'Земля', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
        { name: 'Близнецы', element: 'Воздух', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
        { name: 'Рак', element: 'Вода', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
        { name: 'Лев', element: 'Огонь', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
        { name: 'Дева', element: 'Земля', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
        { name: 'Весы', element: 'Воздух', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
        { name: 'Скорпион', element: 'Вода', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
        { name: 'Стрелец', element: 'Огонь', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 }
    ];
    let sign = signs.find(s => {
        if (s.startMonth === month && day >= s.startDay)
            return true;
        if (s.endMonth === month && day <= s.endDay)
            return true;
        if (s.name === 'Козерог') {
            if (month === 12 && day >= 22)
                return true;
            if (month === 1 && day <= 19)
                return true;
        }
        return false;
    });
    if (!sign)
        sign = signs[0]; // Default to Capricorn
    return [
        { value: sign.name, label: 'Знак зодиака' },
        { value: sign.element, label: 'Стихия' },
        { value: `${sign.startDay}.${sign.startMonth} — ${sign.endDay}.${sign.endMonth}`, label: 'Период' }
    ];
},
}
