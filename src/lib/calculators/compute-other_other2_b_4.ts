import type { ComputeFn } from './compute-helpers';

export const computeMap_other_other2_b_4: Record<string, ComputeFn> = {
  'transportnyj-nalog': (inputs) => {
    const power = Number(inputs.power);
    const powerUnit = String(inputs.powerUnit);
    const region = String(inputs.region);
    const months = Number(inputs.months);
    if (!power) {
        return [{ value: '—', label: 'Результат' }];
    }
    const powerHp = powerUnit === 'kw' ? power * 1.35962 : power;
    const rates: Record<string, number> = {
        'moscow': 50,
        'spb': 50,
        'region': 35
    };
    let rate = rates[region] || 35;
    if (powerHp > 250)
        rate *= 1.5;
    else if (powerHp > 200)
        rate *= 1.3;
    else if (powerHp > 150)
        rate *= 1.1;
    const annualTax = powerHp * rate;
    const proratedTax = (annualTax / 12) * months;
    return [
        { value: Math.round(powerHp).toString(), label: 'Мощность', unit: 'л.с.' },
        { value: rate.toString(), label: 'Ставка', unit: '₽/л.с.' },
        { value: Math.round(proratedTax).toString(), label: 'Налог за период', unit: '₽' },
        { value: Math.round(annualTax).toString(), label: 'Налог за полный год', unit: '₽' }
    ];
},
  'trenirovochnaya-nagruzka': (inputs) => {
    const duration = Number(inputs.duration);
    const np = Number(inputs.normalizedPower);
    const ftp = Number(inputs.ftp);
    const ifVal = Number(inputs.intensityFactor);
    const tss = (duration * np * ifVal) / (ftp * 3600) * 100;
    const weekly = tss * 7;
    let category = '';
    if (weekly < 200)
        category = 'Восстановление';
    else if (weekly < 400)
        category = 'Базовая';
    else if (weekly < 600)
        category = 'Построение';
    else if (weekly < 800)
        category = 'Высокая';
    else
        category = 'Пиковая';
    return [
        { value: Math.round(tss), label: 'TSS' },
        { value: Math.round(weekly), label: 'Недельный TSS' },
        { value: category, label: 'Категория нагрузки' }
    ];
},
  'unit-price-calculator': (inputs): any => {
    const n = inputs as Record<string, number>;
    const toBaseUnit = (amount: number, unit: string) => {
        const multipliers: Record<string, number> = { g: 1, kg: 1000, ml: 1, l: 1000, pc: 1 };
        return amount * multipliers[unit];
    };
    const base1 = toBaseUnit(inputs.option1Amount, inputs.option1Unit);
    const base2 = toBaseUnit(inputs.option2Amount, inputs.option2Unit);
    const unitPrice1 = Math.round((inputs.option1Price / base1) * 1000 * 100) / 100;
    const unitPrice2 = Math.round((inputs.option2Price / base2) * 1000 * 100) / 100;
    const _betterOption = unitPrice1 < unitPrice2 ? 'Вариант 1' : 'Вариант 2';
    const minPrice = Math.min(unitPrice1, unitPrice2);
    const maxPrice = Math.max(unitPrice1, unitPrice2);
    const _savingsPercent = Math.round(((maxPrice - minPrice) / maxPrice) * 100);
    return [];
},
  'utilizacionnyj-sbor': (inputs) => {
    const engineVolume = Number(inputs.engineVolume);
    const vehicleType = String(inputs.vehicleType);
    const isLegalEntity = inputs.isLegalEntity === 'true';
    const baseRates: Record<string, number> = {
        'passenger': 20000,
        'truck': 30000,
        'bus': 35000,
        'trailer': 15000,
        'bike': 8000
    };
    const baseRate = baseRates[vehicleType] || 20000;
    let multiplier = 1;
    if (engineVolume > 1000 && engineVolume <= 2000)
        multiplier = 1.5;
    if (engineVolume > 2000 && engineVolume <= 3000)
        multiplier = 2.5;
    if (engineVolume > 3000 && engineVolume <= 3500)
        multiplier = 3.5;
    if (engineVolume > 3500)
        multiplier = 5;
    if (isLegalEntity)
        multiplier *= 1.5;
    if (engineVolume === 0) {
        multiplier = isLegalEntity ? 1.5 : 0.5;
    }
    const totalFee = baseRate * multiplier;
    return [
        { value: baseRate.toString(), label: 'Базовая ставка', unit: '₽' },
        { value: multiplier.toString(), label: 'Коэффициент', unit: '' },
        { value: totalFee.toString(), label: 'Итого сбор', unit: '₽' }
    ];
},
  'vaccination-calendar': (inputs): any => {
    const birthDateStr = String(inputs.birthDate);
    const birthDate = new Date(birthDateStr);
    const today = new Date();
    const _ageMonths = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
    const schedule = [
        { name: 'БЦЖ (туберкулёз)', _age: 0 },
        { name: 'Гепатит B (1-я)', _age: 0 },
        { name: 'Гепатит B (2-я)', _age: 1 },
        { name: 'Пентаксим (1-я)', _age: 2 },
        { name: 'Пентаксим (2-я)', _age: 3 },
        { name: 'Пентаксим (3-я)', _age: 4.5 },
        { name: 'Манту (туберкулин)', _age: 12 },
        { name: 'Пентаксим (ревакцинация)', _age: 18 },
        { name: 'Корь/краснуха/паротит', _age: 12 },
        { name: 'АКДС (ревакцинация)', _age: 18 },
        { name: 'Полимилит (ревакцинация)', _age: 20 },
        { name: 'Менингококк', _age: 9 }
    ];
    let completedCount = 0;
    let remainingCount = 0;
    let nearestVaccine = null;
    let nearestDate = null;
    let minDiff = Infinity;
    for (const vaccine of schedule) {
        const vaccineDate = new Date(birthDate);
        vaccineDate.setMonth(vaccineDate.getMonth() + vaccine._age);
        if (vaccineDate <= today) {
            completedCount++;
        }
        else {
            remainingCount++;
            const diff = vaccineDate.getTime() - today.getTime();
            if (diff < minDiff && diff > 0) {
                minDiff = diff;
                nearestVaccine = vaccine.name;
                nearestDate = vaccineDate.toLocaleDateString('ru-RU');
            }
        }
    }
    return [
        { value: nearestVaccine || 'Все прививки сделаны', label: 'Ближайшая прививка', unit: '' },
        { value: nearestDate || '-', label: 'Дата ближайшей прививки', unit: '' },
        { value: completedCount, label: 'Уже сделано', unit: 'шт' },
        { value: remainingCount, label: 'Предстоит', unit: 'шт' }
    ];
},
  'vdot-dzhek-deniels': (inputs) => {
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
  'vosstanovlenie-posle': (inputs) => {
    const tss = Number(inputs.tss);
    const exp = String(inputs.experience);
    const _age = Number(inputs.age);
    const sleep = Number(inputs.sleep);
    let baseRecovery = tss / 10;
    if (exp === 'beginner')
        baseRecovery *= 1.3;
    else if (exp === 'advanced')
        baseRecovery *= 0.8;
    if (_age > 50)
        baseRecovery *= 1.2;
    if (sleep < 7)
        baseRecovery *= 1.2;
    const adjusted = Math.round(baseRecovery);
    let readyFor = '';
    if (adjusted < 12)
        readyFor = 'Лёгкой тренировке завтра';
    else if (adjusted < 24)
        readyFor = 'Средней тренировке через день';
    else if (adjusted < 48)
        readyFor = 'Тяжёлой тренировке через 2 дня';
    else
        readyFor = 'Отдыху 2-3 дня';
    let recs = '';
    if (sleep < 7)
        recs = 'Увеличьте сон. ';
    if (tss > 200)
        recs += 'Активное восстановление: лёгкий велосипед/плавание. ';
    recs += 'Протеин в течение 30 минут после тренировки.';
    return [
        { value: Math.round(tss / 10), label: 'Базовое восстановление', unit: 'ч' },
        { value: adjusted, label: 'С учётом факторов', unit: 'ч' },
        { value: readyFor, label: 'Готов к' },
        { value: recs, label: 'Рекомендации' }
    ];
},
  'vozrast-pitomca': (inputs) => {
    const petType = String(inputs.petType);
    const years = Number(inputs.years);
    const months = Number(inputs.months);
    if (!years && !months) {
        return [
            { value: '—', label: 'Человеческий возраст (лет)' },
            { value: '—', label: 'Жизненная стадия' },
            { value: '', label: 'Рекомендации по уходу' }
        ];
    }
    const totalYears = years + months / 12;
    let humanAge = 0;
    if (petType === 'cat') {
        if (totalYears <= 1) {
            humanAge = totalYears * 15;
        }
        else if (totalYears <= 2) {
            humanAge = 15 + (totalYears - 1) * 9;
        }
        else {
            humanAge = 24 + (totalYears - 2) * 4;
        }
    }
    else {
        const sizeMultipliers: Record<string, number> = {
            dog_small: 4,
            dog_medium: 5,
            dog_large: 7
        };
        const multiplier = sizeMultipliers[petType] || 5;
        if (totalYears <= 1) {
            humanAge = totalYears * 15;
        }
        else if (totalYears <= 2) {
            humanAge = 15 + (totalYears - 1) * (multiplier + 4);
        }
        else {
            humanAge = 15 + multiplier + 4 + (totalYears - 2) * multiplier;
        }
    }
    let lifeStage = '';
    let careTips = '';
    if (petType.includes('dog')) {
        if (humanAge < 12) {
            lifeStage = 'Щенок/молодая собака';
            careTips = 'Активные игры, социализация, базовое обучение';
        }
        else if (humanAge < 45) {
            lifeStage = 'Взрослая собака';
            careTips = 'Регулярные прогулки, поддержание веса, ежегодный осмотр';
        }
        else if (humanAge < 70) {
            lifeStage = 'Зрелая собака';
            careTips = 'Контроль веса, профилактика заболеваний';
        }
        else {
            lifeStage = 'Пожилая собака';
            careTips = 'Мягкий корм, тёплое место, регулярные осмотры врача';
        }
    }
    else {
        if (humanAge < 12) {
            lifeStage = 'Котёнок';
            careTips = 'Игры, приучение к лотку, первая вакцинация';
        }
        else if (humanAge < 45) {
            lifeStage = 'Взрослая кошка';
            careTips = 'Игры, когтеточка, контроль веса';
        }
        else if (humanAge < 70) {
            lifeStage = 'Зрелая кошка';
            careTips = 'Диета, регулярный осмотр, игры для мозга';
        }
        else {
            lifeStage = 'Пожилая кошка';
            careTips = 'Мягкий корм, тёплое место, тихая обстановка';
        }
    }
    return [
        { value: Math.round(humanAge), label: 'Человеческий возраст (лет)' },
        { value: lifeStage, label: 'Жизненная стадия' },
        { value: careTips, label: 'Рекомендации по уходу' }
    ];
},
  'vremya-progulok': (inputs) => {
    const breedType = String(inputs.breedType);
    const _age = String(inputs.age);
    const energy = String(inputs.energy);
    const baseRequirements: Record<string, {
        walks: number;
        duration: number;
    }> = {
        toy: { walks: 2, duration: 15 },
        companion: { walks: 3, duration: 30 },
        working: { walks: 3, duration: 45 },
        sighthound: { walks: 2, duration: 30 },
        giant: { walks: 2, duration: 30 }
    };
    const base = baseRequirements[breedType] || { walks: 3, duration: 30 };
    const ageMultipliers: Record<string, number> = {
        puppy: 0.5,
        adult: 1,
        senior: 0.7
    };
    const energyMultipliers: Record<string, number> = {
        low: 0.7,
        medium: 1,
        high: 1.3
    };
    const walks = base.walks;
    const duration = Math.round(base.duration * (ageMultipliers[_age] || 1) * (energyMultipliers[energy] || 1));
    const totalTime = walks * duration;
    let intensity = '';
    if (breedType === 'working' && energy === 'high') {
        intensity = 'Высокая: бег, игры, тренировки';
    }
    else if (breedType === 'toy' || breedType === 'sighthound') {
        intensity = 'Умеренная: прогулки, лёгкие игры';
    }
    else {
        intensity = 'Средняя: прогулки, игры, социализация';
    }
    return [
        { value: walks, label: 'Прогулок в день' },
        { value: duration, label: 'Длительность (мин)' },
        { value: totalTime, label: 'Всего в день (мин)' },
        { value: intensity, label: 'Интенсивность' }
    ];
},
}
