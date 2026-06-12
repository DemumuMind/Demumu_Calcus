import type { ComputeFn } from './compute-helpers';
import { commonWords, hexToRgb, rgbToHex } from './compute-helpers';

export const computeMap_tech_it_b_1: Record<string, ComputeFn> = {
  'ottenki-i-teni': (inputs) => {
    const baseColor = String(inputs.baseColor || '#3B82F6');
    const rgb = hexToRgb(baseColor);
    if (!rgb) {
        return [
            { value: 'Ошибка HEX', label: 'Оттенки', unit: '' },
            { value: 'Ошибка HEX', label: 'Тени', unit: '' }
        ];
    }
    // Генерация оттенков (светлее) — смешивание с белым
    const tints: string[] = [];
    for (let i = 1; i <= 10; i++) {
        const ratio = i / 10;
        const r = Math.round(rgb.r + (255 - rgb.r) * ratio);
        const g = Math.round(rgb.g + (255 - rgb.g) * ratio);
        const b = Math.round(rgb.b + (255 - rgb.b) * ratio);
        tints.push(rgbToHex(r, g, b));
    }
    const shades: string[] = [];
    for (let i = 1; i <= 10; i++) {
        const ratio = i / 10;
        const r = Math.round(rgb.r * (1 - ratio));
        const g = Math.round(rgb.g * (1 - ratio));
        const b = Math.round(rgb.b * (1 - ratio));
        shades.push(rgbToHex(r, g, b));
    }
    return [
        { value: tints.join(', '), label: 'Оттенки', unit: '' },
        { value: shades.join(', '), label: 'Тени', unit: '' }
    ];
},
  'pantone-poisk': (inputs) => {
    const code = String(inputs.pantoneCode || '').toUpperCase().trim();
    const pantoneDb: Record<string, {
        rgb: [
            number,
            number,
            number
        ];
        cmyk: [
            number,
            number,
            number,
            number
        ];
    }> = {
        '185 C': { rgb: [228, 0, 43], cmyk: [0, 100, 79, 0] },
        '185 U': { rgb: [228, 0, 43], cmyk: [0, 100, 79, 0] },
        ' reflex blue c': { rgb: [0, 20, 137], cmyk: [100, 98, 0, 10] },
        ' reflex blue u': { rgb: [0, 20, 137], cmyk: [100, 98, 0, 10] },
        ' process blue c': { rgb: [0, 133, 202], cmyk: [100, 10, 0, 0] },
        ' process blue u': { rgb: [0, 133, 202], cmyk: [100, 10, 0, 0] },
        ' 485 c': { rgb: [213, 0, 0], cmyk: [0, 100, 100, 0] },
        ' 485 u': { rgb: [213, 0, 0], cmyk: [0, 100, 100, 0] },
        ' 349 c': { rgb: [0, 122, 83], cmyk: [100, 0, 57, 30] },
        ' 349 u': { rgb: [0, 122, 83], cmyk: [100, 0, 57, 30] },
        ' 130 c': { rgb: [255, 199, 44], cmyk: [0, 20, 80, 0] },
        ' 130 u': { rgb: [255, 199, 44], cmyk: [0, 20, 80, 0] },
        ' black c': { rgb: [45, 41, 38], cmyk: [60, 50, 50, 100] },
        ' black u': { rgb: [45, 41, 38], cmyk: [60, 50, 50, 100] },
        ' cool gray 1 c': { rgb: [217, 217, 214], cmyk: [5, 3, 5, 0] },
        ' cool gray 10 c': { rgb: [99, 102, 106], cmyk: [20, 15, 10, 40] },
        ' warm gray 1 c': { rgb: [215, 210, 203], cmyk: [5, 5, 10, 5] },
        ' warm gray 10 c': { rgb: [106, 100, 91], cmyk: [15, 20, 25, 45] },
        ' 202 c': { rgb: [134, 38, 51], cmyk: [15, 95, 60, 45] },
        ' 202 u': { rgb: [134, 38, 51], cmyk: [15, 95, 60, 45] },
        ' 286 c': { rgb: [0, 51, 160], cmyk: [100, 90, 0, 0] },
        ' 286 u': { rgb: [0, 51, 160], cmyk: [100, 90, 0, 0] },
        ' 354 c': { rgb: [0, 150, 57], cmyk: [100, 0, 100, 0] },
        ' 354 u': { rgb: [0, 150, 57], cmyk: [100, 0, 100, 0] },
        ' 116 c': { rgb: [255, 205, 0], cmyk: [0, 10, 100, 0] },
        ' 116 u': { rgb: [255, 205, 0], cmyk: [0, 10, 100, 0] },
        ' 300 c': { rgb: [0, 94, 184], cmyk: [100, 60, 0, 0] },
        ' 300 u': { rgb: [0, 94, 184], cmyk: [100, 60, 0, 0] },
        ' 032 c': { rgb: [239, 51, 64], cmyk: [0, 90, 70, 0] },
        ' 032 u': { rgb: [239, 51, 64], cmyk: [0, 90, 70, 0] }
    };
    const color = pantoneDb[code];
    if (!color) {
        return [
            { value: 'Цвет не найден', label: 'RGB', unit: '' },
            { value: 'Цвет не найден', label: 'CMYK', unit: '' },
            { value: 'Цвет не найден', label: 'HEX', unit: '' }
        ];
    }
    const [r, g, b] = color.rgb;
    const [c, m, y, k] = color.cmyk;
    return [
        { value: `${r}, ${g}, ${b}`, label: 'RGB', unit: '' },
        { value: `${c}%, ${m}%, ${y}%, ${k}%`, label: 'CMYK', unit: '' },
        { value: rgbToHex(r, g, b), label: 'HEX', unit: '' }
    ];
},
  'podschet-slov': (inputs) => {
    const text = String(inputs.text || '');
    if (!text.trim()) {
        return [
            { value: '0', label: 'Слов', unit: 'шт' },
            { value: '0', label: 'Символов (с пробелами)', unit: 'шт' },
            { value: '0', label: 'Символов (без пробелов)', unit: 'шт' },
            { value: '0', label: 'Предложений', unit: 'шт' }
        ];
    }
    const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    return [
        { value: wordCount.toString(), label: 'Слов', unit: 'шт' },
        { value: charCount.toString(), label: 'Символов (с пробелами)', unit: 'шт' },
        { value: charCountNoSpaces.toString(), label: 'Символов (без пробелов)', unit: 'шт' },
        { value: sentenceCount.toString(), label: 'Предложений', unit: 'шт' }
    ];
},
  'pomodoro-taymer': (inputs) => {
    const workHours = Number(inputs.workHours) || 8;
    const pomodoro = Number(inputs.pomodoroMinutes) || 25;
    const shortBreak = Number(inputs.breakMinutes) || 5;
    const longAfter = Number(inputs.longBreakAfter) || 4;
    const longBreak = Number(inputs.longBreakMinutes) || 15;
    const totalWorkMinutes = workHours * 60;
    // Each cycle: pomodoro + short break. After longAfter pomodoros: long break instead of short
    // Average cycle length = pomodoro + shortBreak + (longBreak - shortBreak) / longAfter
    const avgCycle = pomodoro + shortBreak + (longBreak - shortBreak) / longAfter;
    const pomodoroCount = Math.floor(totalWorkMinutes / avgCycle);
    const totalBreakMinutes = Math.round(pomodoroCount * shortBreak +
        Math.floor(pomodoroCount / longAfter) * (longBreak - shortBreak));
    const totalTimeMinutes = pomodoroCount * pomodoro + totalBreakMinutes;
    const morningWorkMinutes = 4 * 60;
    const morningPomodoros = Math.floor(morningWorkMinutes / avgCycle);
    return [
        { value: pomodoroCount, label: 'Помидоров в день', unit: 'шт' },
        { value: pomodoroCount * pomodoro, label: 'Время чистой работы', unit: 'мин' },
        { value: totalBreakMinutes, label: 'Время на перерывы', unit: 'мин' },
        { value: totalTimeMinutes, label: 'Общее время циклов', unit: 'мин' },
        { value: morningPomodoros, label: 'Помидоров до обеда (4 часа)', unit: 'шт' },
    ];
},
  'prodvinutyj-generator-sluchajnyh-chisel': (inputs) => {
    const min = Number(inputs.min);
    const max = Number(inputs.max);
    const distribution = String(inputs.distribution);
    const count = Math.min(Math.max(Number(inputs.count), 1), 20);
    if (isNaN(min) || isNaN(max) || min >= max) {
        return [{ value: 'Неверный диапазон', label: 'Ошибка' }];
    }
    const numbers: number[] = [];
    for (let i = 0; i < count; i++) {
        let value: number;
        switch (distribution) {
            case 'uniform':
                value = Math.floor(Math.random() * (max - min + 1)) + min;
                break;
            case 'normal':
                const u1 = Math.random();
                const u2 = Math.random();
                const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
                const mean = (min + max) / 2;
                const stdDev = (max - min) / 6;
                value = Math.round(mean + z * stdDev);
                value = Math.max(min, Math.min(max, value));
                break;
            case 'exponential':
                // Exponential distribution (for time intervals, radioactive decay, etc.)
                const lambda = 1 / ((max - min) / 4);
                const expValue = -Math.log(1 - Math.random()) / lambda;
                value = Math.round(min + expValue);
                value = Math.max(min, Math.min(max, value));
                break;
            default:
                value = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        numbers.push(value);
    }
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = (sum / numbers.length).toFixed(2);
    const minVal = Math.min(...numbers);
    const maxVal = Math.max(...numbers);
    const distNames: Record<string, string> = {
        uniform: 'равномерное',
        normal: 'нормальное',
        exponential: 'экспоненциальное'
    };
    return [
        { value: numbers.join(', '), label: `Числа (${distNames[distribution]} распределение)`, unit: '' },
        { value: `Среднее: ${avg}, Мин: ${minVal}, Макс: ${maxVal}`, label: 'Статистика', unit: '' }
    ];
},
  'proverka-kontrasta-wcag': (inputs) => {
    const bgColor = String(inputs.bgColor || '#FFFFFF');
    const textColor = String(inputs.textColor || '#000000');
    const textSize = String(inputs.textSize || 'normal');
    const bgRgb = hexToRgb(bgColor);
    const textRgb = hexToRgb(textColor);
    if (!bgRgb || !textRgb) {
        return [
            { value: 'Ошибка', label: 'Контраст', unit: '' },
            { value: 'Неверный HEX', label: 'WCAG AA', unit: '' },
            { value: 'Неверный HEX', label: 'WCAG AAA', unit: '' }
        ];
    }
    const getLuminance = (r: number, g: number, b: number) => {
        const toLinear = (c: number) => {
            const s = c / 255;
            return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };
    const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const textLum = getLuminance(textRgb.r, textRgb.g, textRgb.b);
    const ratio = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);
    const aaThreshold = textSize === 'large' ? 3 : 4.5;
    const aaaThreshold = textSize === 'large' ? 4.5 : 7;
    const aaResult = ratio >= aaThreshold ? '✓ Соответствует AA' : `✗ Не соответствует (нужно ${aaThreshold}:1)`;
    const aaaResult = ratio >= aaaThreshold ? '✓ Соответствует AAA' : `✗ Не соответствует (нужно ${aaaThreshold}:1)`;
    return [
        { value: ratio.toFixed(2), label: 'Контраст', unit: ':1' },
        { value: aaResult, label: 'WCAG AA', unit: '' },
        { value: aaaResult, label: 'WCAG AAA', unit: '' }
    ];
},
  'proverka-palindromov': (inputs) => {
    const text = String(inputs.text || "");
    const ignoreSpaces = String(inputs.ignoreSpaces) === "yes";
    const ignorePunctuation = String(inputs.ignorePunctuation) === "yes";
    const ignoreCase = String(inputs.ignoreCase) === "yes";
    if (!text) {
        return [
            { value: "Введите текст", label: "Результат", unit: "" },
            { value: "", label: "Очищенный текст", unit: "" },
            { value: "", label: "Текст наоборот", unit: "" },
            { value: "0", label: "Длина", unit: "симв" },
        ];
    }
    let cleaned = text;
    if (ignoreCase)
        cleaned = cleaned.toLowerCase();
    if (ignoreSpaces)
        cleaned = cleaned.replace(/\s/g, "");
    if (ignorePunctuation)
        cleaned = cleaned.replace(/[^\p{L}\p{N}]/gu, "");
    const reversed = cleaned.split("").reverse().join("");
    const isPalindrome = cleaned === reversed && cleaned.length > 0;
    return [
        {
            value: isPalindrome ? "✓ Это палиндром!" : "✗ Не палиндром",
            label: "Результат",
            unit: "",
        },
        { value: cleaned, label: "Очищенный текст", unit: "" },
        { value: reversed, label: "Текст наоборот", unit: "" },
        { value: cleaned.length.toString(), label: "Длина", unit: "симв" },
    ];
},
  'ral-konverter': (inputs) => {
    const code = String(inputs.ralCode || '').trim();
    const ralDb: Record<string, {
        name: string;
        rgb: [
            number,
            number,
            number
        ];
    }> = {
        '1000': { name: 'Зелёно-бежевый', rgb: [205, 186, 136] },
        '1001': { name: 'Бежевый', rgb: [208, 176, 132] },
        '1002': { name: 'Песочно-жёлтый', rgb: [218, 172, 86] },
        '1003': { name: 'Сигнальный жёлтый', rgb: [255, 176, 0] },
        '1004': { name: 'Жёлто-золотой', rgb: [228, 158, 0] },
        '1005': { name: 'Медово-жёлтый', rgb: [201, 135, 0] },
        '2000': { name: 'Жёлто-оранжевый', rgb: [237, 120, 0] },
        '2001': { name: 'Красно-оранжевый', rgb: [201, 60, 0] },
        '2002': { name: 'Алый', rgb: [187, 32, 19] },
        '2003': { name: 'Пастельно-оранжевый', rgb: [255, 105, 71] },
        '3000': { name: 'Огненно-красный', rgb: [175, 43, 43] },
        '3001': { name: 'Сигнальный красный', rgb: [163, 30, 30] },
        '3002': { name: 'Карминно-красный', rgb: [155, 36, 46] },
        '3003': { name: 'Рубиновый', rgb: [146, 16, 28] },
        '3011': { name: 'Коричнево-красный', rgb: [121, 36, 35] },
        '4001': { name: 'Красно-лиловый', rgb: [129, 97, 130] },
        '4002': { name: 'Красно-фиолетовый', rgb: [141, 50, 88] },
        '4003': { name: 'Пурпурный', rgb: [196, 97, 140] },
        '4004': { name: 'Бордовый', rgb: [101, 30, 56] },
        '5000': { name: 'Фиолетово-синий', rgb: [48, 58, 93] },
        '5001': { name: 'Зелёно-синий', rgb: [31, 56, 85] },
        '5002': { name: 'Ультрамарин', rgb: [32, 56, 119] },
        '5003': { name: 'Сапфировый', rgb: [29, 51, 74] },
        '5005': { name: 'Сигнальный синий', rgb: [30, 56, 133] },
        '5010': { name: 'Генцианово-синий', rgb: [32, 72, 108] },
        '6000': { name: 'Патиново-зелёный', rgb: [60, 116, 96] },
        '6001': { name: 'Изумрудно-зелёный', rgb: [54, 103, 53] },
        '6002': { name: 'Лиственно-зелёный', rgb: [50, 89, 40] },
        '6003': { name: 'Оливково-зелёный', rgb: [80, 83, 60] },
        '6004': { name: 'Сине-зелёный', rgb: [24, 63, 59] },
        '6010': { name: 'Травяной зелёный', rgb: [69, 107, 56] },
        '7000': { name: 'Серая белка', rgb: [123, 132, 130] },
        '7001': { name: 'Серебристо-серый', rgb: [140, 150, 153] },
        '7004': { name: 'Сигнальный серый', rgb: [177, 179, 179] },
        '7011': { name: 'Серо-бежевый', rgb: [95, 106, 114] },
        '7021': { name: 'Тёмно-серый', rgb: [62, 69, 70] },
        '7035': { name: 'Светло-серый', rgb: [197, 199, 196] },
        '7037': { name: 'Пыльно-серый', rgb: [125, 132, 133] },
        '7040': { name: 'Оконно-серый', rgb: [155, 161, 166] },
        '8001': { name: 'Охра коричневая', rgb: [157, 89, 53] },
        '8002': { name: 'Сигнальный коричневый', rgb: [121, 73, 59] },
        '8004': { name: 'Медно-коричневый', rgb: [138, 72, 48] },
        '8011': { name: 'Орехово-коричневый', rgb: [91, 61, 49] },
        '8017': { name: 'Шоколадно-коричневый', rgb: [69, 50, 46] },
        '9001': { name: 'Кремово-белый', rgb: [241, 236, 225] },
        '9002': { name: 'Серо-белый', rgb: [215, 213, 210] },
        '9003': { name: 'Сигнальный белый', rgb: [244, 244, 244] },
        '9004': { name: 'Сигнальный чёрный', rgb: [40, 40, 40] },
        '9005': { name: 'Глубокий чёрный', rgb: [14, 14, 14] },
        '9010': { name: 'Белый', rgb: [250, 250, 250] },
        '9011': { name: 'Графитово-чёрный', rgb: [39, 41, 43] }
    };
    const color = ralDb[code];
    if (!color) {
        return [
            { value: 'Цвет не найден', label: 'Название', unit: '' },
            { value: '—', label: 'RGB', unit: '' },
            { value: '—', label: 'HEX', unit: '' }
        ];
    }
    const [r, g, b] = color.rgb;
    return [
        { value: color.name, label: 'Название', unit: '' },
        { value: `${r}, ${g}, ${b}`, label: 'RGB', unit: '' },
        { value: rgbToHex(r, g, b), label: 'HEX', unit: '' }
    ];
},
  'reshetka-anagramm': (inputs) => {
    const letters = String(inputs.letters || "")
        .toLowerCase()
        .replace(/[^\p{L}]/gu, "");
    const minLength = Math.max(2, Number(inputs.minLength) || 2);
    const maxResults = Math.min(Math.max(5, Number(inputs.maxResults) || 20), 100);
    if (!letters || letters.length < minLength) {
        return [
            {
                value: "Введите достаточно букв",
                label: "Найденные слова",
                unit: "",
            },
            { value: "0", label: "Количество", unit: "шт" },
            {
                value: letters.split("").sort().join(""),
                label: "Буквы отсортированы",
                unit: "",
            },
        ];
    }
    const letterCounts: Record<string, number> = {};
    letters.split("").forEach((l) => {
        letterCounts[l] = (letterCounts[l] || 0) + 1;
    });
    const canFormWord = (word: string): boolean => {
        const wordCounts: Record<string, number> = {};
        word.split("").forEach((l) => {
            wordCounts[l] = (wordCounts[l] || 0) + 1;
        });
        for (const [letter, count] of Object.entries(wordCounts)) {
            if ((letterCounts[letter] || 0) < count)
                return false;
        }
        return true;
    };
    const found = commonWords
        .filter((w) => w.length >= minLength && canFormWord(w))
        .slice(0, maxResults);
    const twoWordCombos: string[] = [];
    for (let i = 0; i < Math.min(found.length, 15); i++) {
        for (let j = i + 1; j < Math.min(found.length, 15); j++) {
            const combined = found[i] + found[j];
            if (combined.length <= letters.length + 1 && canFormWord(combined)) {
                twoWordCombos.push(`${found[i]} + ${found[j]}`);
            }
        }
    }
    const allResults = [...new Set([...found, ...twoWordCombos])].slice(0, maxResults);
    return [
        {
            value: allResults.join(", ") || "Слов не найдено",
            label: "Найденные слова",
            unit: "",
        },
        { value: allResults.length.toString(), label: "Количество", unit: "шт" },
        {
            value: letters.split("").sort().join(""),
            label: "Буквы отсортированы",
            unit: "",
        },
    ];
},
}
