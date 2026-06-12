import type { ComputeFn } from './compute-helpers';

export const computeMap_other_other2_a_3: Record<string, ComputeFn> = {
  'ekonomiya-topliva': (inputs) => {
    const distance = Number(inputs.distance);
    const baseConsumption = Number(inputs.baseConsumption);
    const drivingStyle = String(inputs.drivingStyle);
    const fuelPrice = Number(inputs.fuelPrice);
    if (!distance || !baseConsumption || !fuelPrice) {
        return [
            { value: '—', label: 'Реальный расход', unit: 'л/100км' },
            { value: '—', label: 'Всего топлива', unit: 'л' },
            { value: '—', label: 'Стоимость топлива', unit: '₽' },
            { value: '—', label: 'Экономия vs агрессивный' },
            { value: '—', label: 'Советы' }
        ];
    }
    const multipliers: Record<string, number> = {
        'eco': 0.85, // 15% less
        'normal': 1.0, // Base
        'fast': 1.15, // 15% more
        'aggressive': 1.35 // 35% more
    };
    const actualConsumption = baseConsumption * multipliers[drivingStyle];
    const totalFuel = (distance / 100) * actualConsumption;
    const fuelCost = totalFuel * fuelPrice;
    const aggressiveConsumption = baseConsumption * 1.35;
    const aggressiveFuel = (distance / 100) * aggressiveConsumption;
    const savingsLiters = aggressiveFuel - totalFuel;
    const savingsMoney = savingsLiters * fuelPrice;
    const savingsText = `Экономия ${Math.round(savingsLiters)} л (${Math.round(savingsMoney)}₽) vs агрессивным стилем`;
    const tips: Record<string, string> = {
        'eco': 'Отличный выбор! Расход минимален. Скорость 90 км/ч — оптимум для большинства авто.',
        'normal': 'Сбалансированный подход. Можно снизить расход, едя медленнее.',
        'fast': 'Высокая скорость увеличивает расход из-за сопротивления воздуха.',
        'aggressive': 'Резкое ускорение и торможение существенно повышают расход. Рекомендуется плавное вождение.'
    };
    return [
        { value: Number(actualConsumption.toFixed(1)), label: 'Реальный расход', unit: 'л/100км' },
        { value: Number(totalFuel.toFixed(1)), label: 'Всего топлива', unit: 'л' },
        { value: Math.round(fuelCost), label: 'Стоимость топлива', unit: '₽' },
        { value: savingsText, label: 'Экономия vs агрессивный' },
        { value: tips[drivingStyle], label: 'Советы' }
    ];
},
  'feeding-amount-calculator': (inputs): any => {
    const _age = String(inputs.age);
    const weight = Number(inputs.weight);
    const dailyAmount = Math.round(weight * 150); // ~150 мл/кг
    const feedings: Record<string, number> = {
        '0-1': 10,
        '1-3': 8,
        '3-6': 6,
        '6-12': 5
    };
    const feedingsPerDay = feedings[_age];
    const perFeeding = Math.round(dailyAmount / feedingsPerDay);
    return [
        { value: dailyAmount, label: 'Суточный объём', unit: 'мл' },
        { value: perFeeding, label: 'За одно кормление', unit: 'мл' },
        { value: feedingsPerDay, label: 'Кормлений в день', unit: 'раз' }
    ];
},
  'ftp-moschtnost': (inputs) => {
    const power = Number(inputs.testPower);
    const weight = Number(inputs.weight);
    const ftp = power * 0.95;
    const ftpPerKg = ftp / weight;
    let category = '';
    if (ftpPerKg < 1.5)
        category = 'Начинающий';
    else if (ftpPerKg < 2.5)
        category = 'Любитель';
    else if (ftpPerKg < 3.5)
        category = 'Средний';
    else if (ftpPerKg < 4.5)
        category = 'Продвинутый';
    else if (ftpPerKg < 5.5)
        category = 'Элита';
    else
        category = 'Профессионал';
    return [
        { value: Math.round(ftp), label: 'FTP', unit: 'ватт' },
        { value: Math.round(ftpPerKg * 100) / 100, label: 'FTP на кг', unit: 'ватт/кг' },
        { value: category, label: 'Категория' }
    ];
},
  'generator-loterejnyh-chisel': (inputs) => {
    const game = String(inputs.game);
    const tickets = Math.min(Math.max(Number(inputs.tickets), 1), 10);
    const customRange = Number(inputs.range) || 49;
    const customPick = Number(inputs.pick) || 6;
    let mainNumbers = 6;
    let mainRange = 49;
    let extraNumbers = 0;
    let extraRange = 0;
    let gameName = '';
    let oddsText = '';
    switch (game) {
        case '6x49':
            mainNumbers = 6;
            mainRange = 49;
            gameName = '6 из 49';
            oddsText = '1 к 13,983,816 (джекпот)';
            break;
        case '5x36':
            mainNumbers = 5;
            mainRange = 36;
            gameName = '5 из 36';
            oddsText = '1 к 376,992';
            break;
        case 'powerball':
            mainNumbers = 5;
            mainRange = 69;
            extraNumbers = 1;
            extraRange = 26;
            gameName = 'Powerball';
            oddsText = '1 к 292,201,338 (джекпот)';
            break;
        case 'euromillions':
            mainNumbers = 5;
            mainRange = 50;
            extraNumbers = 2;
            extraRange = 12;
            gameName = 'EuroMillions';
            oddsText = '1 к 139,838,160 (джекпот)';
            break;
        case 'keno':
            mainNumbers = 20;
            mainRange = 80;
            gameName = 'Keno (20 из 80)';
            oddsText = 'Зависит от угаданных чисел';
            break;
        case 'custom':
            mainNumbers = Math.min(customPick, customRange);
            mainRange = customRange;
            gameName = `Произвольная (${mainNumbers}/${mainRange})`;
            oddsText = 'См. формулу';
            break;
    }
    const generateUniqueRandom = (count: number, max: number): number[] => {
        const numbers = new Set<number>();
        while (numbers.size < count) {
            numbers.add(Math.floor(Math.random() * max) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };
    const results: string[] = [];
    for (let t = 0; t < tickets; t++) {
        const main = generateUniqueRandom(mainNumbers, mainRange);
        let ticket = `Билет ${t + 1}: ${main.map(n => n.toString().padStart(2, '0')).join(' ')}`;
        if (extraNumbers > 0) {
            const extra = generateUniqueRandom(extraNumbers, extraRange);
            ticket += ` + [${extra.map(n => n.toString().padStart(2, '0')).join(' ')}]`;
        }
        results.push(ticket);
    }
    return [
        { value: results.join('\n'), label: `Числа для ${gameName}`, unit: '' },
        { value: oddsText, label: 'Шансы', unit: '' }
    ];
},
  'generator-meme-tekstov': (inputs) => {
    const template = String(inputs.template);
    let topText = String(inputs.topText).toUpperCase();
    let bottomText = String(inputs.bottomText).toUpperCase();
    const format = String(inputs.format);
    const templates: Record<string, {
        top?: string;
        bottom?: string;
        desc: string;
        specs: string;
    }> = {
        classic: {
            desc: 'Классический мем с текстом сверху и снизу',
            specs: 'Шрифт: Impact, белый с чёрной обводкой. Размер: 36-72px. Позиция: по центру, верх/низ с отступом 10px.'
        },
        drake: {
            top: '❌ Не одобряю: ' + topText,
            bottom: '✅ Одобряю: ' + bottomText,
            desc: 'Формат Дрейка: верх — отказ, низ — одобрение',
            specs: 'Две панели. Левый Дрейк отмахивается (верх), правый одобряет (низ).'
        },
        distracted: {
            top: 'Твоя девушка: ' + topText,
            bottom: 'Парень смотрит на: ' + bottomText,
            desc: 'Отвлекающий парень — отвлекается на что-то другое',
            specs: 'Три зоны: девушка (слева), парень (центр), отвлекающий объект (справа).'
        },
        change_mind: {
            top: '☕ ' + topText,
            bottom: bottomText,
            desc: '«Измени моё мнение» — вызов на дискуссию',
            specs: 'Чашка кофе на столе, серьёзное лицо. Центральная надпись: "CHANGE MY MIND".'
        },
        always_has: {
            top: topText + '?',
            bottom: 'Всегда было: ' + bottomText,
            desc: 'Астронавт с пистолетом — всегда было так',
            specs: 'Две панели: первый астронавт говорит, второй готовит пистолет сзади.'
        },
        one_does_not: {
            top: 'НЕЛЬЗЯ ПРОСТО ВЗЯТЬ',
            bottom: bottomText || 'И ПРОСТО ' + topText,
            desc: 'Боромир — «Нельзя просто взять»',
            specs: 'Кадр из ВК: «Одни не просто входят в Мордор». Шрифт крупный, драматичный.'
        },
        success_kid: {
            top: topText,
            bottom: bottomText || 'УСПЕХ!',
            desc: 'Малыш с кулаком — мем успеха',
            specs: 'Фото ребёнка с песком в руке, выражение победы. Короткий текст, punchline снизу.'
        },
        custom: {
            desc: 'Пользовательский мем',
            specs: 'Настраиваемый формат. Рекомендуется Impact font, ALL CAPS, белый текст с обводкой.'
        }
    };
    const t = templates[template] || templates.classic;
    let output = '';
    if (format === 'ascii') {
        const width = Math.max(topText.length, bottomText.length, 20);
        output = `
┌${'─'.repeat(width + 4)}┐
│  ${topText.padEnd(width)}  │
│${' '.repeat(width + 4)}│
│     [ КАРТИНКА ]      │
│${' '.repeat(width + 4)}│
│  ${bottomText.padEnd(width)}  │
└${'─'.repeat(width + 4)}┘`;
    }
    else if (format === 'html') {
        output = `<div class="meme-container">
  <div class="meme-top-text">${topText}</div>
  <img src="meme-template.jpg" alt="${template}">
  <div class="meme-bottom-text">${bottomText}</div>
</div>

<style>
.meme-container {
  position: relative;
  text-align: center;
  font-family: Impact, sans-serif;
}
.meme-top-text, .meme-bottom-text {
  color: white;
  text-shadow: 2px 2px 0 #000, -1px -1px 0 #000;
  font-size: 36px;
  text-transform: uppercase;
}
.meme-top-text { position: absolute; top: 10px; width: 100%; }
.meme-bottom-text { position: absolute; bottom: 10px; width: 100%; }
</style>`;
    }
    else {
        const tt = t.top || topText;
        const bt = t.bottom || bottomText;
        output = `[${template.toUpperCase()}]

┌─────────────────────────┐
  ${tt}
                         
    [ ИЗОБРАЖЕНИЕ ]
                         
  ${bt}
└─────────────────────────┘

${t.desc}`;
    }
    return [
        { value: output, label: 'Мем-структура', unit: '' },
        { value: t.specs, label: 'Технические спецификации', unit: '' }
    ];
},
  'generator-monet-i-kostej': (inputs) => {
    const mode = String(inputs.mode);
    const count = Math.min(Math.max(Number(inputs.count), 1), 100);
    const target = Number(inputs.target);
    const results: number[] = [];
    let success = 0;
    let sides = 2;
    let labels: string[] = [];
    let _modeName = '';
    switch (mode) {
        case 'coin':
            sides = 2;
            labels = ['Орёл', 'Решка'];
            _modeName = 'Монета';
            break;
        case 'd4':
            sides = 4;
            _modeName = 'd4';
            break;
        case 'd6':
            sides = 6;
            _modeName = 'd6';
            break;
        case 'd8':
            sides = 8;
            _modeName = 'd8';
            break;
        case 'd10':
            sides = 10;
            _modeName = 'd10';
            break;
        case 'd12':
            sides = 12;
            _modeName = 'd12';
            break;
        case 'd20':
            sides = 20;
            _modeName = 'd20 (D&D)';
            break;
        case 'd100':
            sides = 100;
            _modeName = 'd100 (проценты)';
            break;
        case 'fudge':
            sides = 3;
            labels = ['-', '0', '+'];
            _modeName = 'Fudge/Fate';
            break;
    }
    for (let i = 0; i < count; i++) {
        let roll: number;
        if (mode === 'fudge') {
            roll = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        }
        else if (mode === 'coin') {
            roll = Math.floor(Math.random() * 2); // 0 or 1
        }
        else {
            roll = Math.floor(Math.random() * sides) + 1;
        }
        results.push(roll);
        if (target > 0 && roll >= target) {
            success++;
        }
    }
    const sum = results.reduce((a, b) => a + b, 0);
    const avg = (sum / results.length).toFixed(2);
    const min = Math.min(...results);
    const max = Math.max(...results);
    let resultStr = '';
    if (mode === 'coin') {
        const heads = results.filter(r => r === 0).length;
        const tails = results.filter(r => r === 1).length;
        resultStr = `Орёл: ${heads}, Решка: ${tails}`;
        if (count <= 20) {
            resultStr += ` (${results.map(r => r === 0 ? 'О' : 'Р').join(', ')})`;
        }
    }
    else if (mode === 'fudge') {
        const minus = results.filter(r => r === -1).length;
        const zero = results.filter(r => r === 0).length;
        const plus = results.filter(r => r === 1).length;
        const total = plus - minus;
        resultStr = `[-]: ${minus}, [0]: ${zero}, [+]: ${plus} = ${total > 0 ? '+' : ''}${total}`;
        if (count <= 20) {
            resultStr += ` (${results.map(r => r === -1 ? '-' : r === 0 ? '0' : '+').join(', ')})`;
        }
    }
    else {
        if (count <= 30) {
            resultStr = results.join(', ');
        }
        else {
            resultStr = `${results.slice(0, 10).join(', ')} ... ${results.slice(-5).join(', ')} (всего ${count})`;
        }
    }
    let probText = '';
    if (target > 0 && mode !== 'coin' && mode !== 'fudge') {
        const prob = ((sides - target + 1) / sides * 100).toFixed(1);
        probText = `≥${target}: ${prob}% (${success}/${count} успехов)`;
    }
    else if (mode === 'd20' && target === 20) {
        probText = 'Критический успех (20): 5%';
    }
    else if (mode === 'coin') {
        probText = 'Орёл: 50%, Решка: 50%';
    }
    else {
        probText = `Равномерное распределение: ${(100 / sides).toFixed(1)}% на грань`;
    }
    return [
        { value: resultStr, label: _modeName, unit: '' },
        { value: mode === 'coin' || mode === 'fudge' ? '' : `Сумма: ${sum}, Среднее: ${avg}, Мин: ${min}, Макс: ${max}`, label: 'Статистика', unit: '' },
        { value: probText, label: 'Вероятности', unit: '' }
    ];
},
}
