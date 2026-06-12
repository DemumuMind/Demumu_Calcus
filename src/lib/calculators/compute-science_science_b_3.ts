import type { ComputeFn } from './compute-helpers';

export const computeMap_science_science_b_3: Record<string, ComputeFn> = {
  'srednij-ball-gpa': (inputs) => {
    const scale = Number(inputs.scale) || 5;
    const gradesStr = String(inputs.grades || '');
    const grades = gradesStr.split(',').map(g => Number(g.trim())).filter(g => !isNaN(g) && g > 0);
    if (!grades.length) {
        return [
            { value: '—', label: 'Средний балл' },
            { value: '—', label: 'Перевод в 5-балльную' },
            { value: '—', label: 'Перевод в 10-балльную' },
            { value: '—', label: 'Перевод в 12-балльную' },
            { value: '—', label: 'Перевод в 100-балльную' },
            { value: '—', label: 'Буквенная оценка' }
        ];
    }
    const average = grades.reduce((a, b) => a + b, 0) / grades.length;
    const normalized = average / scale;
    const scale5 = normalized * 5;
    const scale10 = normalized * 10;
    const scale12 = normalized * 12;
    const scale100 = normalized * 100;
    let letterGrade = '';
    if (normalized >= 0.9)
        letterGrade = 'A (отлично)';
    else if (normalized >= 0.8)
        letterGrade = 'B (хорошо)';
    else if (normalized >= 0.7)
        letterGrade = 'C (удовлетворительно)';
    else if (normalized >= 0.6)
        letterGrade = 'D (слабо)';
    else
        letterGrade = 'F (неудовлетворительно)';
    return [
        { value: Number(average.toFixed(2)), label: 'Средний балл' },
        { value: Number(scale5.toFixed(2)), label: 'Перевод в 5-балльную' },
        { value: Number(scale10.toFixed(2)), label: 'Перевод в 10-балльную' },
        { value: Number(scale12.toFixed(2)), label: 'Перевод в 12-балльную' },
        { value: Number(scale100.toFixed(1)), label: 'Перевод в 100-балльную' },
        { value: letterGrade, label: 'Буквенная оценка' }
    ];
},
  'stepeni-i-korni': (inputs) => {
    const base = Number(inputs.base);
    const exponent = Number(inputs.exponent);
    const operation = String(inputs.operation);
    let result = 0;
    let label = '';
    switch (operation) {
        case 'power':
            result = Math.pow(base, exponent);
            label = `${base}^${exponent}`;
            break;
        case 'root':
            if (base < 0 && exponent % 2 === 0) {
                return [{ value: 'Ошибка: чётный корень из отрицательного', label: 'Ошибка' }];
            }
            result = Math.pow(Math.abs(base), 1 / exponent);
            if (base < 0)
                result = -result;
            label = `${exponent}√${base}`;
            break;
        case 'log':
            if (base <= 0 || base === 1 || exponent <= 0) {
                return [{ value: 'Ошибка: недопустимые значения', label: 'Ошибка' }];
            }
            result = Math.log(exponent) / Math.log(base);
            label = `log_${base}(${exponent})`;
            break;
    }
    return [{ value: Math.round(result * 1e10) / 1e10, label }];
},
  'summa-chisel-do-n': (inputs) => {
    const n = Number(inputs.n);
    const start = Number(inputs.start) || 1;
    if (!n || n < 1) {
        return [{ value: '—', label: 'Результат' }];
    }
    const count = n - start + 1;
    const result = (count * (start + n)) / 2;
    const formula = count === n
        ? `S = ${n} × (${n} + 1) / 2 = ${result.toFixed(0)}`
        : `S = ${count} × (${start} + ${n}) / 2 = ${result.toFixed(0)}`;
    return [
        { value: formula, label: 'Формула' },
        { value: result.toFixed(0), label: 'Сумма' },
        { value: count.toString(), label: 'Количество чисел' }
    ];
},
  'tablica-umnozheniya': (inputs) => {
    const max = Number(inputs.max) || 10;
    const limit = Math.min(Math.max(max, 1), 12);
    let table = '';
    for (let i = 1; i <= limit; i++) {
        const row: string[] = [];
        for (let j = 1; j <= limit; j++) {
            row.push(`${i}×${j}=${i * j}`);
        }
        table += row.join('  ') + '\n';
    }
    return [
        { value: table.trim(), label: `Таблица умножения (1–${limit})`, unit: '' }
    ];
},
  'tablicy-shulte': () => [],
  'teploobmennik': (inputs) => {
    const T1h = Number(inputs.hotInlet);
    const T2h = Number(inputs.hotOutlet);
    const T1c = Number(inputs.coldInlet);
    const T2c = Number(inputs.coldOutlet);
    const Gh = Number(inputs.hotFlowRate);
    const cp = Number(inputs.heatCapacity);
    if (!Gh || !cp) {
        return [{ value: 'Введите параметры', label: 'Ошибка' }];
    }
    const deltaTh = T1h - T2h;
    const Q = Gh * cp * deltaTh; // кВт (cp в кДж)
    // Среднелогарифмическая разность температур (LMTD)
    const deltaT1 = T1h - T2c;
    const deltaT2 = T2h - T1c;
    const LMTD = (deltaT1 - deltaT2) / Math.log(deltaT1 / deltaT2);
    // КПД теплообменника: epsilon = (T2c - T1c) / (T1h - T1c) - для холодной среды
    const epsilon = ((T2c - T1c) / (T1h - T1c)) * 100;
    return [
        { value: Q.toFixed(2), label: 'Тепловая мощность', unit: 'кВт' },
        { value: LMTD.toFixed(2), label: 'Среднелогарифмическая разность температур', unit: '°C' },
        { value: epsilon.toFixed(1), label: 'КПД теплообменника', unit: '%' }
    ];
},
  'teploprovodnost': (inputs) => {
    const k = Number(inputs.k);
    const A = Number(inputs.area);
    const d = Number(inputs.thickness);
    const deltaT = Number(inputs.deltaT);
    if (d === 0)
        return [{ value: '—', label: 'Тепловой поток', unit: '' }];
    const Q = k * A * deltaT / d;
    return [{ value: Math.round(Q * 100) / 100, label: 'Тепловой поток', unit: 'Вт' }];
},
  'tochka-bezubytochnosti': (inputs) => {
    const fixed = Number(inputs.fixedCosts);
    const variable = Number(inputs.variableCostPerUnit);
    const price = Number(inputs.pricePerUnit);
    if (price <= variable) {
        return [
            { value: 0, label: 'Точка безубыточности', unit: 'шт' },
            { value: 0, label: 'Выручка в точке БУ', unit: '₽' },
            { value: 0, label: 'Маржинальный доход', unit: '₽' },
            { value: 0, label: 'Коэффициент маржинальности', unit: '' },
        ];
    }
    const contribution = price - variable;
    const breakEvenUnits = Math.ceil(fixed / contribution);
    const breakEvenRevenue = breakEvenUnits * price;
    const contributionRatio = contribution / price;
    return [
        { value: breakEvenUnits, label: 'Точка безубыточности', unit: 'шт' },
        { value: Math.round(breakEvenRevenue * 100) / 100, label: 'Выручка в точке БУ', unit: '₽' },
        { value: Math.round(contribution * 100) / 100, label: 'Маржинальный доход', unit: '₽' },
        { value: Math.round(contributionRatio * 100) / 100, label: 'Коэффициент маржинальности', unit: '' },
    ];
},
  'tree-impact-calculator': (inputs): any => {
    const treeType = String(inputs.treeType);
    const treeAge = Number(inputs.treeAge);
    const treeCount = Number(inputs.treeCount);
    const absorptionRates: Record<string, number> = {
        birch: 15,
        pine: 22,
        oak: 30,
        spruce: 20,
        maple: 18
    };
    const co2PerYear = absorptionRates[treeType] * (treeAge / 10) * treeCount;
    const lifetimeCo2 = co2PerYear * Math.min(treeAge, 50); // активное поглощение ~50 лет
    const oxygenProduced = Math.round(co2PerYear * 0.7); // ~0.7 кг O2 на кг CO2
    const carsEquivalent = Math.round(co2PerYear / 1200); // ~1200 кг CO2/год от авто
    return [
        { value: Math.round(co2PerYear), label: 'CO₂ поглощено в год', unit: 'кг' },
        { value: Math.round(lifetimeCo2), label: 'CO₂ за всю жизнь', unit: 'кг' },
        { value: oxygenProduced, label: 'Кислорода произведено', unit: 'кг/год' },
        { value: carsEquivalent, label: 'Эквивалент авто', unit: 'шт' }
    ];
},
  'trigonometriya': (inputs) => {
    const angle = Number(inputs.angle);
    const unit = String(inputs.unit);
    const func = String(inputs.function);
    let rad = angle;
    if (unit === 'deg') {
        rad = angle * Math.PI / 180;
    }
    else if (unit === 'grad') {
        rad = angle * Math.PI / 200;
    }
    let result = 0;
    switch (func) {
        case 'sin':
            result = Math.sin(rad);
            break;
        case 'cos':
            result = Math.cos(rad);
            break;
        case 'tan':
            result = Math.tan(rad);
            break;
        case 'cot':
            result = 1 / Math.tan(rad);
            break;
        case 'asin':
            result = Math.asin(angle) * 180 / Math.PI;
            if (unit === 'rad')
                result = Math.asin(angle);
            if (unit === 'grad')
                result = Math.asin(angle) * 200 / Math.PI;
            return [
                { value: Math.round(result * 1e6) / 1e6, label: 'arcsin' + (unit === 'rad' ? ' (рад)' : unit === 'grad' ? ' (град)' : ' (°)') },
                { value: Math.round(Math.asin(angle) * 1e6) / 1e6, label: 'В радианах' }
            ];
        case 'acos':
            result = Math.acos(angle) * 180 / Math.PI;
            if (unit === 'rad')
                result = Math.acos(angle);
            if (unit === 'grad')
                result = Math.acos(angle) * 200 / Math.PI;
            return [
                { value: Math.round(result * 1e6) / 1e6, label: 'arccos' + (unit === 'rad' ? ' (рад)' : unit === 'grad' ? ' (град)' : ' (°)') },
                { value: Math.round(Math.acos(angle) * 1e6) / 1e6, label: 'В радианах' }
            ];
        case 'atan':
            result = Math.atan(angle) * 180 / Math.PI;
            if (unit === 'rad')
                result = Math.atan(angle);
            if (unit === 'grad')
                result = Math.atan(angle) * 200 / Math.PI;
            return [
                { value: Math.round(result * 1e6) / 1e6, label: 'arctan' + (unit === 'rad' ? ' (рад)' : unit === 'grad' ? ' (град)' : ' (°)') },
                { value: Math.round(Math.atan(angle) * 1e6) / 1e6, label: 'В радианах' }
            ];
    }
    return [
        { value: Math.round(result * 1e6) / 1e6, label: func },
        { value: Math.round(rad * 1e6) / 1e6, label: 'В радианах' }
    ];
},
  'truboprovod': (inputs) => {
    const D = Number(inputs.diameter) / 1000; // в метры
    const Q_input = Number(inputs.flowRate);
    const v_input = Number(inputs.velocity);
    const L = Number(inputs.length);
    const _roughness = Number(inputs.roughness);
    const fluid = String(inputs.fluid);
    if (!D)
        return [{ value: 'Введите диаметр', label: 'Ошибка' }];
    const properties = {
        water: { density: 1000, viscosity: 0.001 },
        oil: { density: 900, viscosity: 0.1 },
        air: { density: 1.2, viscosity: 0.000018 }
    };
    const props = properties[fluid as keyof typeof properties];
    const A = Math.PI * D * D / 4; // площадь сечения
    let Q = Q_input;
    let v = v_input;
    if (Q && !v) {
        v = (Q / 3600) / A;
    }
    else if (v && !Q) {
        Q = v * A * 3600;
    }
    else if (!Q && !v) {
        return [{ value: 'Введите расход или скорость', label: 'Ошибка' }];
    }
    const Re = (props.density * v * D) / props.viscosity;
    // lambda = 0.316/Re^0.25 для турбулентного течения (формула Блазиуса)
    let lambda = 0.316 / Math.pow(Re, 0.25);
    if (Re < 2300) {
        lambda = 64 / Re; // ламинарное течение
    }
    // Потеря давления: deltaP = lambda * (L/D) * (rho*v²/2)
    const pressureDrop = lambda * (L / D) * (props.density * v * v / 2);
    return [
        { value: v.toFixed(2), label: 'Скорость потока', unit: 'м/с' },
        { value: Q.toFixed(2), label: 'Расход', unit: 'м³/ч' },
        { value: Math.round(Re).toString(), label: 'Число Рейнольдса', unit: '' },
        { value: Math.round(pressureDrop).toString(), label: 'Потеря давления', unit: 'Па' }
    ];
},
  'uglovaya-skorost': (inputs) => {
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
  'vremya-chteniya': (inputs): any => {
    const n = inputs as Record<string, number>;
    const wordCount = Number(inputs.wordCount || 5000);
    const readingSpeed = String(inputs.readingSpeed || 'average');
    const textType = String(inputs.textType || 'fiction');
    const speeds: Record<string, number> = {
        slow: 150,
        average: 250,
        fast: 400,
        speed: 600
    };
    let speed = speeds[readingSpeed];
    if (textType === 'academic') {
        speed *= 0.7; // Slower for academic texts
    }
    else if (textType === 'technical') {
        speed *= 0.6;
    }
    else if (textType === 'nonfiction') {
        speed *= 0.85;
    }
    const minutes = Math.ceil(wordCount / speed);
    const hours = Math.ceil(minutes / 60 * 10) / 10;
    // Approximate pages (250 words per page is standard)
    const pages = Math.ceil(wordCount / 250);
    let readingTimeText = '';
    if (minutes < 60) {
        readingTimeText = `${minutes} минут`;
    }
    else if (hours < 24) {
        readingTimeText = `${Math.floor(hours)} ч ${minutes % 60} мин`;
    }
    else {
        const days = Math.floor(hours / 24);
        readingTimeText = `${days} дней ${Math.floor(hours % 24)} ч`;
    }
    const dailyMinutes = 30;
    const daysNeeded = Math.ceil(minutes / dailyMinutes);
    const dailyPlan = `Читать ${dailyMinutes} мин/день = закончите за ${daysNeeded} дней (${Math.ceil(wordCount / daysNeeded)} слов/день)`;
    return [
        { value: readingTimeText, label: 'Время чтения' },
        { value: minutes, label: 'В минутах', unit: 'мин' },
        { value: hours, label: 'В часах', unit: 'ч' },
        { value: pages, label: 'Примерно страниц', unit: 'стр' },
        { value: dailyPlan, label: 'План на каждый день (30 мин)' }
    ];
},
  'waste-sorting-calculator': (inputs): any => {
    const plasticBottles = Number(inputs.plasticBottles);
    const paper = Number(inputs.paper);
    const glass = Number(inputs.glass);
    const yearlyBottles = plasticBottles * 52;
    const yearlyPaper = paper * 52;
    const yearlyGlass = glass * 12;
    const totalWaste = yearlyBottles * 0.05 + yearlyPaper + yearlyGlass; // бутылка ~50г
    const recyclable = yearlyPaper + yearlyGlass + yearlyBottles * 0.05;
    const recyclablePercent = Math.round((recyclable / totalWaste) * 100);
    const co2Saved = Math.round(recyclable * 2.5); // ~2.5 кг CO2 на кг переработанного
    const treesSaved = Math.round(yearlyPaper / 10); // ~10 кг бумаги = 1 дерево
    const landfillSaved = Math.round(recyclable);
    return [
        { value: recyclablePercent, label: 'Процент переработки', unit: '%' },
        { value: co2Saved, label: 'CO₂ сэкономлено', unit: 'кг/год' },
        { value: treesSaved, label: 'Деревьев эквивалент', unit: 'шт' },
        { value: landfillSaved, label: 'Не попало на свалку', unit: 'кг/год' }
    ];
},
  'water-footprint-calculator': (inputs): any => {
    const showerMinutes = Number(inputs.showerMinutes);
    const bathsPerWeek = Number(inputs.bathsPerWeek);
    const toiletFlushes = Number(inputs.toiletFlushes);
    const meat = String(inputs.meat);
    const shower = showerMinutes * 12; // ~12 л/мин
    const baths = bathsPerWeek * 150 / 7; // ~150 л ванна
    const toilet = toiletFlushes * 6; // ~6 л смыв
    const other = 50; // быт
    const directWater = Math.round(shower + baths + toilet + other);
    const meatWater: Record<string, number> = {
        none: 500,
        rarely: 1500,
        regular: 4000
    };
    const indirectWater = meatWater[meat];
    const totalFootprint = directWater + indirectWater;
    return [
        { value: directWater, label: 'Прямое потребление', unit: 'л/день' },
        { value: indirectWater, label: 'Косвенное потребление', unit: 'л/день' },
        { value: totalFootprint, label: 'Общий водный след', unit: 'л/день' }
    ];
},
}
