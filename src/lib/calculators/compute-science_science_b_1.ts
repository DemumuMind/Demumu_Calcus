import type { ComputeFn } from './compute-helpers';

export const computeMap_science_science_b_1: Record<string, ComputeFn> = {
  'obem-cilindra': (inputs) => {
    const r = Number(inputs.radius);
    const h = Number(inputs.height);
    if (!r || !h)
        return [{ value: '—', label: 'Результат' }];
    const volume = Math.PI * r * r * h;
    const lateralArea = 2 * Math.PI * r * h;
    const totalArea = 2 * Math.PI * r * (r + h);
    return [
        { value: volume.toFixed(4), label: 'Объём', unit: 'м³' },
        { value: lateralArea.toFixed(4), label: 'Боковая поверхность', unit: 'м²' },
        { value: totalArea.toFixed(4), label: 'Полная поверхность', unit: 'м²' }
    ];
},
  'obem-konusa': (inputs) => {
    const r = Number(inputs.radius);
    const h = Number(inputs.height);
    if (!r || !h)
        return [{ value: '—', label: 'Результат' }];
    const volume = (1 / 3) * Math.PI * r * r * h;
    const slantHeight = Math.sqrt(r * r + h * h);
    const surfaceArea = Math.PI * r * (r + slantHeight);
    return [
        { value: volume.toFixed(4), label: 'Объём', unit: 'м³' },
        { value: slantHeight.toFixed(4), label: 'Образующая', unit: 'м' },
        { value: surfaceArea.toFixed(4), label: 'Площадь поверхности', unit: 'м²' }
    ];
},
  'obem-kuba': (inputs) => {
    const a = Number(inputs.side);
    if (!a)
        return [{ value: '—', label: 'Результат' }];
    const volume = a * a * a;
    const surfaceArea = 6 * a * a;
    const faceDiagonal = a * Math.sqrt(2);
    const spaceDiagonal = a * Math.sqrt(3);
    return [
        { value: volume.toFixed(4), label: 'Объём', unit: 'м³' },
        { value: surfaceArea.toFixed(4), label: 'Площадь поверхности', unit: 'м²' },
        { value: faceDiagonal.toFixed(4), label: 'Диагональ грани', unit: 'м' },
        { value: spaceDiagonal.toFixed(4), label: 'Пространственная диагональ', unit: 'м' }
    ];
},
  'obem-shara': (inputs) => {
    const r = Number(inputs.radius);
    if (!r)
        return [{ value: '—', label: 'Результат' }];
    const volume = (4 / 3) * Math.PI * r * r * r;
    const surfaceArea = 4 * Math.PI * r * r;
    const diameter = 2 * r;
    return [
        { value: volume.toFixed(4), label: 'Объём', unit: 'м³' },
        { value: surfaceArea.toFixed(4), label: 'Площадь поверхности', unit: 'м²' },
        { value: diameter.toFixed(4), label: 'Диаметр', unit: 'м' }
    ];
},
  'otpusknye-kalkulyator': (inputs) => {
    const salary = Number(inputs.salary) || 0;
    const vacationDays = Number(inputs.vacationDays) || 0;
    const workedMonths = Number(inputs.workedMonths) || 12;
    if (!salary || !vacationDays) {
        return [
            { value: '—', label: 'Среднедневной заработок', unit: '₽' },
            { value: '—', label: 'Сумма отпускных', unit: '₽' },
            { value: '—', label: 'Отпускные за вычетом НДФЛ', unit: '₽' },
            { value: '—', label: 'Эквивалент за месяц', unit: '₽' },
            { value: '—', label: 'Разница с зарплатой', unit: '₽' }
        ];
    }
    const avgDaysPerMonth = 29.3;
    const totalEarnings = salary * Math.min(workedMonths, 12);
    const avgDays = avgDaysPerMonth * Math.min(workedMonths, 12);
    const avgDaily = totalEarnings / avgDays;
    const vacationPay = avgDaily * vacationDays;
    const vacationPayNet = vacationPay * 0.87;
    const monthlyEquivalent = vacationPay / vacationDays * 30;
    const difference = monthlyEquivalent - salary;
    return [
        { value: Number(avgDaily.toFixed(2)), label: 'Среднедневной заработок', unit: '₽' },
        { value: Number(vacationPay.toFixed(2)), label: 'Сумма отпускных', unit: '₽' },
        { value: Number(vacationPayNet.toFixed(2)), label: 'Отпускные за вычетом НДФЛ', unit: '₽' },
        { value: Number(monthlyEquivalent.toFixed(2)), label: 'Эквивалент за месяц', unit: '₽' },
        { value: Number(difference.toFixed(2)), label: 'Разница с зарплатой', unit: '₽' }
    ];
},
  'plan-podgotovki-k-ekzamenu': (inputs): any => {
    const n = inputs as Record<string, number>;
    const days = Number(inputs.daysUntilExam || 30);
    const topics = Number(inputs.topicsCount || 15);
    const hoursPerDay = Number(inputs.availableHours || 3);
    const _examType = String(inputs.examType || 'test');
    const totalHours = Math.round(days * hoursPerDay);
    const reviewRatio = 0.2;
    const studyDays = Math.floor(days * (1 - reviewRatio));
    const reviewDays = days - studyDays;
    const dailyTopics = Math.ceil(topics / studyDays);
    const hoursPerTopic = Math.round((totalHours * (1 - reviewRatio)) / topics * 10) / 10;
    let schedule = '';
    if (days > 14) {
        schedule = `Неделя 1-${Math.floor(studyDays / 7)}: изучение по ${dailyTopics} тем/день. Последние ${reviewDays} дней: повторение, решение пробных, отдых.`;
    }
    else {
        schedule = `Интенсивный режим: ${dailyTopics} тем каждый день + повторение вечером. Последний день: только повторение!`;
    }
    let intensity = '';
    if (dailyTopics > 3 && hoursPerDay > 4) {
        intensity = '⚠️ Высокая! Риск выгорания. Обязательно делайте перерывы и спите 7-8 часов.';
    }
    else if (dailyTopics <= 1) {
        intensity = 'Низкая. Есть запас времени для глубокого изучения или дополнительных источников.';
    }
    else {
        intensity = '✓ Умеренная. Оптимальный баланс между интенсивностью и усвоением.';
    }
    return [
        { value: dailyTopics, label: 'Тем в день', unit: 'тем' },
        { value: totalHours, label: 'Всего часов доступно', unit: 'ч' },
        { value: hoursPerTopic, label: 'На изучение темы', unit: 'ч' },
        { value: reviewDays, label: 'Дней на повторение', unit: 'дн' },
        { value: schedule, label: 'Рекомендуемый план' },
        { value: intensity, label: 'Интенсивность' }
    ];
},
  'ploshchad-kruga': (inputs) => {
    const radius = Number(inputs.radius) || Number(inputs.diameter) / 2;
    if (!radius)
        return [{ value: '—', label: 'Результат' }];
    const area = Math.PI * radius * radius;
    const circumference = 2 * Math.PI * radius;
    const diameter = radius * 2;
    return [
        { value: area.toFixed(4), label: 'Площадь', unit: 'м²' },
        { value: circumference.toFixed(4), label: 'Длина окружности', unit: 'м' },
        { value: diameter.toFixed(4), label: 'Диаметр', unit: 'м' }
    ];
},
  'ploshchad-pryamougolnika': (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    if (!length || !width)
        return [{ value: '—', label: 'Результат' }];
    const area = length * width;
    const perimeter = 2 * (length + width);
    const diagonal = Math.sqrt(length * length + width * width);
    return [
        { value: area.toFixed(4), label: 'Площадь', unit: 'м²' },
        { value: perimeter.toFixed(4), label: 'Периметр', unit: 'м' },
        { value: diagonal.toFixed(4), label: 'Диагональ', unit: 'м' }
    ];
},
  'ploshchad-shestiugolnika': (inputs) => {
    const side = Number(inputs.side);
    if (!side)
        return [{ value: '—', label: 'Результат' }];
    const area = (3 * Math.sqrt(3) / 2) * side * side;
    const perimeter = 6 * side;
    return [
        { value: area.toFixed(4), label: 'Площадь', unit: 'м²' },
        { value: perimeter.toFixed(4), label: 'Периметр', unit: 'м' }
    ];
},
  'ploshchad-sten': (inputs) => {
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const windowsArea = Number(inputs.windowsArea) || 0;
    const doorsArea = Number(inputs.doorsArea) || 0;
    if (!length || !width || !height)
        return [{ value: '—', label: 'Результат' }];
    const perimeter = 2 * (length + width);
    const totalWalls = perimeter * height;
    const openings = windowsArea + doorsArea;
    const netWalls = totalWalls - openings;
    const floorArea = length * width;
    return [
        { value: totalWalls.toFixed(2), label: 'Площадь стен (брутто)', unit: 'м²' },
        { value: openings.toFixed(2), label: 'Площадь проёмов', unit: 'м²' },
        { value: netWalls.toFixed(2), label: 'Площадь стен (нетто)', unit: 'м²' },
        { value: floorArea.toFixed(2), label: 'Площадь пола', unit: 'м²' }
    ];
},
  'ploshchad-trapecii': (inputs) => {
    const a = Number(inputs.baseA);
    const b = Number(inputs.baseB);
    const h = Number(inputs.height);
    if (!a || !b || !h)
        return [{ value: '—', label: 'Результат' }];
    const area = ((a + b) / 2) * h;
    const midline = (a + b) / 2;
    return [
        { value: area.toFixed(4), label: 'Площадь', unit: 'м²' },
        { value: midline.toFixed(4), label: 'Средняя линия', unit: 'м' }
    ];
},
  'ploshchad-treugolnika': (inputs) => {
    const method = String(inputs.method);
    let area = 0;
    let perimeter = 0;
    if (method === 'base-height') {
        const base = Number(inputs.base);
        const height = Number(inputs.height);
        if (base && height) {
            area = 0.5 * base * height;
            perimeter = base + 2 * Math.sqrt(height * height + (base / 2) * (base / 2));
        }
    }
    else if (method === 'sides') {
        const a = Number(inputs.sideA);
        const b = Number(inputs.sideB);
        const c = Number(inputs.sideC);
        if (a && b && c) {
            const s = (a + b + c) / 2;
            area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
            perimeter = a + b + c;
        }
    }
    else if (method === 'two-sides-angle') {
        const a = Number(inputs.sideA);
        const b = Number(inputs.sideB);
        const angle = Number(inputs.angle);
        if (a && b && angle) {
            area = 0.5 * a * b * Math.sin(angle * Math.PI / 180);
            const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle * Math.PI / 180));
            perimeter = a + b + c;
        }
    }
    return [
        { value: area.toFixed(4), label: 'Площадь', unit: 'м²' },
        { value: perimeter.toFixed(4), label: 'Периметр', unit: 'м' }
    ];
},
  'pnevmocilindr': (inputs) => {
    const D = Number(inputs.boreDiameter);
    const d = Number(inputs.rodDiameter);
    const P = Number(inputs.pressure);
    const L = Number(inputs.stroke);
    const n = Number(inputs.cycles);
    if (!D || !P) {
        return [{ value: 'Введите параметры', label: 'Ошибка' }];
    }
    const A_forward = (Math.PI * D * D) / 4; // мм²
    const A_return = (Math.PI * (D * D - d * d)) / 4; // мм²
    const F_forward = P * 10 * A_forward / 100; // Н (P*10^5 Па * A*10^-6 м²)
    const F_return = P * 10 * A_return / 100; // Н
    // Расход воздуха на цикл (приведённый к атмосферному давлению)
    const V_cycle = (A_forward * L / 1000) * (P + 1) / 1000; // в литрах
    const V_min = V_cycle * n;
    return [
        { value: Math.round(F_forward).toString(), label: 'Усилие при выдвижении', unit: 'Н' },
        { value: Math.round(F_return).toString(), label: 'Усилие при втягивании', unit: 'Н' },
        { value: V_cycle.toFixed(3), label: 'Расход воздуха на цикл', unit: 'Л' },
        { value: Math.round(V_min).toString(), label: 'Расход воздуха в минуту', unit: 'Л/мин' },
        { value: (A_forward / 100).toFixed(2), label: 'Площадь поршня', unit: 'см²' }
    ];
},
  'podshipnik': (inputs) => {
    const C = Number(inputs.dynamicLoadRating);
    const P = Number(inputs.equivalentLoad);
    const n = Number(inputs.rpm);
    const pStr = String(inputs.bearingType);
    const a1 = Number(inputs.lifeFactor);
    if (!C || !P) {
        return [{ value: 'Введите нагрузки', label: 'Ошибка' }];
    }
    if (P > C) {
        return [{ value: 'Нагрузка превышает грузоподъёмность!', label: 'Ошибка' }];
    }
    const p = pStr === '3' ? 3 : 10 / 3;
    const L10 = Math.pow(C / P, p) * a1;
    const L10h = n ? (1000000 * L10) / (60 * n) : 0;
    // Ресурс в годах (при 8760 часов в году или при непрерывной работе)
    const L10y = L10h ? L10h / (365 * 24) : 0;
    return [
        { value: L10.toFixed(2), label: 'Номинальный ресурс L10', unit: 'млн об.' },
        { value: Math.round(L10h).toString(), label: 'Ресурс в часах', unit: 'ч' },
        { value: L10y.toFixed(2), label: 'Ресурс в годах', unit: 'лет' }
    ];
},
  'pomodoro-tekhnika': (inputs): any => {
    const n = inputs as Record<string, number>;
    const availableTime = Number(inputs.availableTime || 4);
    const taskType = String(inputs.taskType || 'study');
    const focusLevel = String(inputs.focusLevel || 'medium');
    const workTime = 25;
    const shortBreak = 5;
    const longBreak = 20;
    const pomodorosPerSet = 4;
    const totalMinutes = availableTime * 60;
    const setDuration = pomodorosPerSet * workTime + (pomodorosPerSet - 1) * shortBreak + longBreak;
    const fullSets = Math.floor(totalMinutes / setDuration);
    const remainingMinutes = totalMinutes % setDuration;
    const remainingPomodoros = Math.min(4, Math.floor(remainingMinutes / (workTime + shortBreak)));
    const totalPomodoros = fullSets * pomodorosPerSet + remainingPomodoros;
    const totalFocus = totalPomodoros * workTime;
    const shortBreaks = totalPomodoros - fullSets; // Minus long breaks
    const longBreaks = fullSets;
    let schedule = '';
    if (totalPomodoros <= 4) {
        schedule = '25 мин работа → 5 мин перерыв → повторить ' + totalPomodoros + ' раза';
    }
    else {
        schedule = `4×(25 мин работа → 5 мин перерыв) → 20 мин длинный перерыв → повторить ${fullSets} раза`;
    }
    let tips = '';
    if (taskType === 'creative') {
        tips = 'Для творческих задач можно увеличить помидорку до 45-50 минут (flow state требует времени).';
    }
    else if (focusLevel === 'low') {
        tips = 'Начните с 15-минутных помидорок. Используйте блокировщики сайтов (Freedom, Cold Turkey).';
    }
    else {
        tips = 'Во время помидорки: телефон в другой комнате, уведомления выключены, только задача.';
    }
    return [
        { value: totalPomodoros, label: 'Количество помидорок', unit: 'шт' },
        { value: totalFocus, label: 'Время фокуса', unit: 'мин' },
        { value: shortBreaks, label: 'Коротких перерывов', unit: 'шт' },
        { value: longBreaks, label: 'Длинных перерывов', unit: 'шт' },
        { value: schedule, label: 'Примерный расписание' },
        { value: tips, label: 'Советы по технике' }
    ];
},
  'procenty-rasshirennyj': (inputs) => {
    const mode = String(inputs.mode);
    const firstVal = Number(inputs.value1);
    const secondVal = Number(inputs.value2);
    let result = 0;
    let text = '';
    switch (mode) {
        case 'percent_of':
            result = (firstVal * secondVal) / 100;
            text = `${secondVal}% от ${firstVal} = ${result}`;
            break;
        case 'what_percent':
            result = (firstVal / secondVal) * 100;
            text = `${firstVal} составляет ${result.toFixed(2)}% от ${secondVal}`;
            break;
        case 'percent_change':
            result = ((secondVal - firstVal) / firstVal) * 100;
            text = `Изменение от ${firstVal} до ${secondVal} = ${result > 0 ? '+' : ''}${result.toFixed(2)}%`;
            break;
        case 'add_percent':
            result = firstVal + (firstVal * secondVal) / 100;
            text = `${firstVal} + ${secondVal}% = ${result}`;
            break;
        case 'subtract_percent':
            result = firstVal - (firstVal * secondVal) / 100;
            text = `${firstVal} - ${secondVal}% = ${result}`;
            break;
    }
    return [{ value: text, label: 'Результат' }];
},
  'proporcii': (inputs) => {
    const a = Number(inputs.a);
    const b = Number(inputs.b);
    const c = Number(inputs.c);
    const find = String(inputs.find);
    let result = 0;
    let formula = '';
    let proportion = '';
    switch (find) {
        case 'd':
            if (!a || !b || !c)
                return [{ value: '—', label: 'Результат' }, { value: '', label: 'Формула' }, { value: '', label: 'Пропорция' }];
            result = (b * c) / a;
            formula = 'd = (b × c) / a';
            proportion = `${a}:${b} = ${c}:${Math.round(result * 100) / 100}`;
            break;
        case 'c':
            if (!a || !b)
                return [{ value: '—', label: 'Результат' }, { value: '', label: 'Формула' }, { value: '', label: 'Пропорция' }];
            result = (a * c) / b;
            formula = 'c = (a × d) / b';
            proportion = `${a}:${b} = ${Math.round(result * 100) / 100}:${c}`;
            break;
        case 'b':
            if (!a || !c)
                return [{ value: '—', label: 'Результат' }, { value: '', label: 'Формула' }, { value: '', label: 'Пропорция' }];
            result = (a * b) / c;
            formula = 'b = (a × d) / c';
            proportion = `${a}:${Math.round(result * 100) / 100} = ${c}:${b}`;
            break;
        case 'a':
            if (!b || !c)
                return [{ value: '—', label: 'Результат' }, { value: '', label: 'Формула' }, { value: '', label: 'Пропорция' }];
            result = (b * c) / a;
            formula = 'a = (b × c) / d';
            proportion = `${Math.round(result * 100) / 100}:${b} = ${c}:${a}`;
            break;
    }
    return [
        { value: Math.round(result * 1000) / 1000, label: 'Результат' },
        { value: formula, label: 'Формула' },
        { value: proportion, label: 'Пропорция' }
    ];
},
}
