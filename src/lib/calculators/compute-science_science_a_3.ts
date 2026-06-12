import type { ComputeFn } from './compute-helpers';

export const computeMap_science_science_a_3: Record<string, ComputeFn> = {
  'kalkulyator-faktoriala': (inputs) => {
    const n = Math.floor(Number(inputs.n));
    if (n < 0) {
        return [{ value: 'Факториал определён только для n ≥ 0', label: 'Ошибка' }];
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return [
        { value: result.toLocaleString('ru-RU'), label: `${n}!`, unit: '' },
        { value: n.toString(), label: 'Число слагаемых', unit: '' }
    ];
},
  'kalkulyator-gpa': (inputs) => {
    const gradesStr = String(inputs.grades);
    let items: {
        grade: number;
        credits: number;
    }[] = [];
    try {
        items = JSON.parse(gradesStr);
    }
    catch {
        return [
            { value: 'Ошибка', label: 'GPA' },
            { value: 0, label: 'Средний балл' },
            { value: 'Некорректный JSON', label: 'Ошибка' }
        ];
    }
    if (!items.length) {
        return [
            { value: '—', label: 'GPA' },
            { value: 0, label: 'Средний балл' },
            { value: 'Нет данных', label: 'Классификация' }
        ];
    }
    const gradeMap: Record<number, number> = { 5: 4.0, 4: 3.0, 3: 2.0, 2: 1.0 };
    let totalCredits = 0;
    let weightedGpaSum = 0;
    let gradeSum = 0;
    for (const item of items) {
        const grade = Number(item.grade);
        const credits = Number(item.credits);
        if (isNaN(grade) || isNaN(credits))
            continue;
        totalCredits += credits;
        weightedGpaSum += (gradeMap[grade] || 0) * credits;
        gradeSum += grade * credits;
    }
    if (totalCredits === 0) {
        return [
            { value: '—', label: 'GPA' },
            { value: 0, label: 'Средний балл' },
            { value: 'Нет данных', label: 'Классификация' }
        ];
    }
    const gpa = weightedGpaSum / totalCredits;
    const avgGrade = gradeSum / totalCredits;
    let classification = '';
    if (gpa >= 3.7)
        classification = 'Отлично (A)';
    else if (gpa >= 3.0)
        classification = 'Хорошо (B)';
    else if (gpa >= 2.0)
        classification = 'Удовлетворительно (C)';
    else
        classification = 'Неудовлетворительно (D/F)';
    return [
        { value: gpa.toFixed(2), label: 'GPA (4.0)' },
        { value: Math.round(avgGrade * 100) / 100, label: 'Средний балл' },
        { value: classification, label: 'Классификация' }
    ];
},
  'kalkulyator-imt': (inputs) => {
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    const _age = Number(inputs.age);
    if (!height || !weight || height < 50 || weight < 20) {
        return [
            { value: '—', label: 'ИМТ' },
            { value: 'Введите корректные данные', label: 'Категория' },
            { value: '—', label: 'Идеальный вес' }
        ];
    }
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = Math.round(bmi * 10) / 10;
    let category = '';
    let color = '';
    if (bmi < 16) {
        category = 'Выраженный дефицит массы тела';
        color = 'text-red-600';
    }
    else if (bmi < 18.5) {
        category = 'Недостаточная масса тела';
        color = 'text-orange-500';
    }
    else if (bmi < 25) {
        category = 'Нормальная масса тела';
        color = 'text-green-600';
    }
    else if (bmi < 30) {
        category = 'Избыточная масса тела (предожирение)';
        color = 'text-orange-500';
    }
    else if (bmi < 35) {
        category = 'Ожирение I степени';
        color = 'text-red-500';
    }
    else if (bmi < 40) {
        category = 'Ожирение II степени';
        color = 'text-red-600';
    }
    else {
        category = 'Ожирение III степени';
        color = 'text-red-700';
    }
    const idealWeightMin = 18.5 * heightInMeters * heightInMeters;
    const idealWeightMax = 24.9 * heightInMeters * heightInMeters;
    // Корректировка по возрасту для людей старше 40 лет
    let ageAdjustment = 0;
    if (_age > 40) {
        ageAdjustment = (_age - 40) * 0.1;
    }
    const idealMin = Math.round((idealWeightMin + ageAdjustment) * 10) / 10;
    const idealMax = Math.round((idealWeightMax + ageAdjustment) * 10) / 10;
    return [
        {
            value: bmiRounded.toString(),
            label: 'ИМТ',
            className: color
        },
        {
            value: category,
            label: 'Категория',
            className: color
        },
        {
            value: `${idealMin} — ${idealMax} кг`,
            label: 'Идеальный вес'
        }
    ];
},
  'kalkulyator-kalorij': (inputs) => {
    const gender = String(inputs.gender);
    const _age = Number(inputs.age);
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    const activity = String(inputs.activity);
    const goal = String(inputs.goal);
    if (!_age || !height || !weight || _age < 10 || height < 100 || weight < 30) {
        return [
            { value: '—', label: 'BMR (основной обмен)' },
            { value: '—', label: 'TDEE (суточная норма)' },
            { value: 'Введите корректные данные', label: 'Целевые калории' }
        ];
    }
    let bmr: number;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * _age + 5;
    }
    else {
        bmr = 10 * weight + 6.25 * height - 5 * _age - 161;
    }
    bmr = Math.round(bmr);
    const activityMultipliers: Record<string, number> = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very-active': 1.9
    };
    const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.55));
    let targetCalories: number;
    let targetLabel: string;
    switch (goal) {
        case 'lose':
            targetCalories = Math.round(tdee * 0.8); // Дефицит 20%
            targetLabel = 'для похудения';
            break;
        case 'gain':
            targetCalories = Math.round(tdee * 1.15); // Профицит 15%
            targetLabel = 'для набора массы';
            break;
        default:
            targetCalories = tdee;
            targetLabel = 'для поддержания';
    }
    return [
        {
            value: `${bmr.toLocaleString('ru-RU')} ккал`,
            label: 'BMR (основной обмен)',
            description: 'Калории для поддержания жизнедеятельности в покое'
        },
        {
            value: `${tdee.toLocaleString('ru-RU')} ккал`,
            label: 'TDEE (суточная норма)',
            description: 'Общие энергетические затраты с учётом активности'
        },
        {
            value: `${targetCalories.toLocaleString('ru-RU')} ккал`,
            label: `Целевые калории ${targetLabel}`,
            className: goal === 'maintain' ? 'text-green-600' : goal === 'lose' ? 'text-orange-500' : 'text-blue-600'
        }
    ];
},
  'kalkulyator-kornej': (inputs) => {
    const number = Number(inputs.number);
    const degree = Number(inputs.degree);
    if (!number || !degree) {
        return [{ value: '—', label: 'Результат' }];
    }
    if (number < 0 && degree % 2 === 0) {
        return [{ value: 'Нет действительного корня', label: 'Результат' }];
    }
    const result = Math.pow(Math.abs(number), 1 / degree);
    const signedResult = number < 0 ? -result : result;
    return [
        {
            value: signedResult.toFixed(6),
            label: `Корень ${degree}-й степени из ${number}`,
            unit: ''
        },
        {
            value: Math.pow(signedResult, degree).toFixed(2),
            label: 'Проверка (возведение в степень)',
            unit: ''
        }
    ];
},
  'kalkulyator-logarifmov': (inputs) => {
    const value = Number(inputs.value);
    const base = String(inputs.base);
    const customBase = Number(inputs.customBase);
    if (!value || value <= 0) {
        return [{ value: '—', label: 'Результат', additionalInfo: 'Аргумент должен быть > 0' }];
    }
    let result = 0;
    let formula = '';
    switch (base) {
        case 'e':
            result = Math.log(value);
            formula = `ln(${value})`;
            break;
        case '10':
            result = Math.log10(value);
            formula = `lg(${value})`;
            break;
        case '2':
            result = Math.log2(value);
            formula = `log₂(${value})`;
            break;
        case 'custom':
            if (!customBase || customBase <= 0 || customBase === 1) {
                return [{ value: '—', label: 'Результат', additionalInfo: 'Основание должно быть > 0 и ≠ 1' }];
            }
            result = Math.log(value) / Math.log(customBase);
            formula = `log${customBase}(${value})`;
            break;
    }
    return [
        { value: result.toFixed(6), label: 'Результат' },
        { value: formula, label: 'Формула' }
    ];
},
  'kalkulyator-procentov': (inputs) => {
    const value = Number(inputs.value);
    const percentage = Number(inputs.percentage);
    if (!value || !percentage) {
        return [{ value: '—', label: 'Результат' }];
    }
    const result = (value * percentage) / 100;
    const increased = value + result;
    const decreased = value - result;
    return [
        { value: result.toFixed(2), label: `${percentage}% от ${value}`, unit: '' },
        { value: increased.toFixed(2), label: 'Увеличение на %', unit: '' },
        { value: decreased.toFixed(2), label: 'Уменьшение на %', unit: '' }
    ];
},
  'kalkulyator-stipendii': (inputs): any => {
    const n = inputs as Record<string, number>;
    const base = Number(inputs.baseScholarship || 3000);
    const gpa = Number(inputs.gpa || 4.5);
    const merit = String(inputs.meritBonus || 'excellent');
    const achievements = String(inputs.achievements || 'none');
    const meritCoeff: Record<string, number> = {
        none: 1,
        good: 1.4,
        excellent: 1.8,
        increased: 2.0,
        president: 4.0
    };
    const achievementBonus: Record<string, number> = {
        none: 0,
        conference: 500,
        olympiad: 1000,
        publication: 2000,
        social: 500
    };
    const coefficient = meritCoeff[merit];
    const bonus = achievementBonus[achievements];
    // Some universities reduce scholarship if GPA drops
    let gpaMultiplier = 1;
    if (gpa < 4.0) {
        gpaMultiplier = 0.7; // Reduced for good marks
    }
    else if (gpa < 3.5) {
        gpaMultiplier = 0; // No scholarship
    }
    const totalScholarship = Math.round(base * coefficient * gpaMultiplier + bonus);
    const annual = totalScholarship * 10; // Usually 10 months
    return [
        { value: totalScholarship, label: 'Итоговая стипендия', unit: '₽' },
        { value: coefficient, label: 'Коэффициент' },
        { value: bonus, label: 'Бонус за достижения', unit: '₽' },
        { value: annual, label: 'В год', unit: '₽' },
        { value: totalScholarship, label: 'Ежемесячно', unit: '₽' }
    ];
},
  'kineticheskaya-i-potencialnaya-energiya': (inputs) => {
    const mass = Number(inputs.mass);
    const velocity = Number(inputs.velocity);
    const height = Number(inputs.height);
    const g = Number(inputs.gravity);
    const ke = 0.5 * mass * velocity * velocity;
    const pe = mass * g * height;
    const total = ke + pe;
    return [
        { value: Math.round(ke), label: 'Кинетическая (движение)', unit: 'Дж' },
        { value: Math.round(pe), label: 'Потенциальная (положение)', unit: 'Дж' },
        { value: Math.round(total), label: 'Полная энергия', unit: 'Дж' }
    ];
},
  'kompleksnye-chisla': (inputs) => {
    const aR = Number(inputs.aReal);
    const aI = Number(inputs.aImag);
    const bR = Number(inputs.bReal);
    const bI = Number(inputs.bImag);
    const op = String(inputs.operation);
    let rR = 0, rI = 0;
    let label = '';
    switch (op) {
        case 'add':
            rR = aR + bR;
            rI = aI + bI;
            label = 'A + B';
            break;
        case 'sub':
            rR = aR - bR;
            rI = aI - bI;
            label = 'A - B';
            break;
        case 'mul':
            rR = aR * bR - aI * bI;
            rI = aR * bI + aI * bR;
            label = 'A × B';
            break;
        case 'div':
            const denom = bR * bR + bI * bI;
            if (denom === 0)
                return [{ value: 'Ошибка: деление на ноль', label: 'Ошибка' }];
            rR = (aR * bR + aI * bI) / denom;
            rI = (aI * bR - aR * bI) / denom;
            label = 'A / B';
            break;
        case 'abs':
            const abs = Math.sqrt(aR * aR + aI * aI);
            return [{ value: Math.round(abs * 1e6) / 1e6, label: '|A| (модуль A)' }];
    }
    const sign = rI >= 0 ? '+' : '-';
    const imag = Math.abs(rI);
    return [{
            value: `${Math.round(rR * 1e6) / 1e6} ${sign} ${Math.round(imag * 1e6) / 1e6}i`,
            label
        }];
},
}
