

/** Simple unit conversion: value * factor, returns formatted result */
export function simpleConvert(inputs: Record<string, any>, factor: number, fromUnit: string, toUnit: string, precision: number = 4): any[] {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
    const result = value * factor;
    return [{ value: value + ' ' + fromUnit + ' = ' + result.toFixed(precision) + ' ' + toUnit, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
}

/** Division conversion */
export function divConvert(inputs: Record<string, any>, divisor: number, fromUnit: string, toUnit: string, precision: number = 4): any[] {
    const value = Number(inputs.value);
    if (!value && value !== 0) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
    const result = value / divisor;
    return [{ value: value + ' ' + fromUnit + ' = ' + result.toFixed(precision) + ' ' + toUnit, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
}


export type ComputeFn = (inputs: Record<string, any>) => any[];

export const _translitBase: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z",
  и: "i", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh",
  щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  А: "A", Б: "B", В: "V", Г: "G", Д: "D", Е: "E", Ж: "Zh", З: "Z",
  И: "I", К: "K", Л: "L", М: "M", Н: "N", О: "O", П: "P", Р: "R",
  С: "S", Т: "T", У: "U", Ф: "F", Х: "Kh", Ц: "Ts", Ч: "Ch", Ш: "Sh",
  Щ: "Shch", Ъ: "", Ы: "Y", Ь: "", Э: "E", Ю: "Yu", Я: "Ya",
};

export const awg2mm: Record<string, string> = {
    '0': '8.25', '1': '7.35', '2': '6.54', '3': '5.83', '4': '5.19',
    '5': '4.62', '6': '4.11', '7': '3.67', '8': '3.26', '9': '2.91',
    '10': '2.59', '11': '2.30', '12': '2.05', '13': '1.83', '14': '1.63',
    '15': '1.45', '16': '1.29', '17': '1.15', '18': '1.02', '19': '0.91',
    '20': '0.81', '21': '0.72', '22': '0.64', '23': '0.57', '24': '0.51',
    '25': '0.45', '26': '0.40', '27': '0.36', '28': '0.32', '29': '0.29',
    '30': '0.25', '31': '0.23', '32': '0.20', '33': '0.18', '34': '0.16',
    '35': '0.14', '36': '0.13', '37': '0.11', '38': '0.10', '39': '0.09', '40': '0.08'
};

export const braEU2USBand: Record<string, string> = {
    '65': '30', '70': '32', '75': '34', '80': '36', '85': '38', '90': '40', '95': '42', '100': '44', '105': '46'
};

export const braRU2USBand: Record<string, string> = {
    '65': '30', '70': '32', '75': '34', '80': '36', '85': '38', '90': '40', '95': '42', '100': '44', '105': '46'
};

export const braUS2EUBand: Record<string, string> = {
    '30': '65', '32': '70', '34': '75', '36': '80', '38': '85', '40': '90', '42': '95', '44': '100', '46': '105'
};

export const braUS2RUBand: Record<string, string> = {
    '30': '65', '32': '70', '34': '75', '36': '80', '38': '85', '40': '90', '42': '95', '44': '100', '46': '105'
};

export const caesarShift = (text: string, shift: number, alphabet: string): string => {
    return text
        .split("")
        .map((char) => {
        const idx = alphabet.indexOf(char.toLowerCase());
        if (idx === -1)
            return char;
        const newIdx = (idx + shift + alphabet.length) % alphabet.length;
        const newChar = alphabet[newIdx];
        return char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
    })
        .join("");
};

export const clothesEU2RU: Record<string, string> = {
    '34': '40', '36': '42', '38': '44', '40': '46', '42': '48', '44': '50', '46': '52', '48': '54', '50': '56', '52': '58'
};

export const clothesEU2US: Record<string, string> = {
    '34': 'XS', '36': 'S', '38': 'M', '40': 'M', '42': 'L', '44': 'XL', '46': 'XXL', '48': '3XL', '50': '3XL', '52': '4XL'
};

export const clothesRU2EU: Record<string, string> = {
    '40': '34', '42': '36', '44': '38', '46': '40', '48': '42', '50': '44', '52': '46', '54': '48', '56': '50', '58': '52'
};

export const clothesRU2US: Record<string, string> = {
    '40': 'XS', '42': 'XS-S', '44': 'S', '46': 'M', '48': 'M-L', '50': 'L', '52': 'XL', '54': 'XXL', '56': '3XL', '58': '4XL'
};

export const clothesUS2EU: Record<string, string> = {
    'XS': 'XS (34)', 'S': 'S (36)', 'M': 'M (38-40)', 'L': 'L (42)', 'XL': 'XL (44)', 'XXL': 'XXL (46)', '3XL': '3XL (48-50)', '4XL': '4XL (52)'
};

export const clothesUS2RU: Record<string, string> = {
    'XS': '40-42', 'S': '44', 'M': '46-48', 'L': '50', 'XL': '52', 'XXL': '54', '3XL': '56', '4XL': '58'
};

// Common Russian and English words for anagram solving
export const commonWords = [
    // Russian (simplified set)
    "кот",
    "ток",
    "кто",
    "кто",
    "око",
    "мир",
    "рим",
    "кар",
    "рак",
    "акр",
    "нос",
    "сон",
    "сно",
    "пол",
    "лоп",
    "лес",
    "сел",
    "след",
    "дело",
    "лед",
    "дом",
    "мод",
    "дым",
    "сын",
    "суд",
    "дух",
    "ход",
    "ухо",
    "юго",
    "год",
    "век",
    "вкус",
    "кус",
    "сук",
    "рама",
    "мара",
    "ар",
    "рам",
    "мар",
    "комар",
    "мак",
    "кам",
    "акм",
    "лак",
    "кал",
    "лук",
    "кул",
    "лес",
    "село",
    "осел",
    "сап",
    "пас",
    "спа",
    "топ",
    "пот",
    "опт",
    "рот",
    "тор",
    "арт",
    "рат",
    "сет",
    "тес",
    "ест",
    "маг",
    "гам",
    "шар",
    "раш",
    "бар",
    "раб",
    "бра",
    "кор",
    "рок",
    "кур",
    "рук",
    "лес",
    "сел",
    "соль",
    "лось",
    "сало",
    "сало",
    // English
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "i",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "cat",
    "act",
    "dog",
    "god",
    "listen",
    "silent",
    "elbow",
    "below",
    "state",
    "taste",
    "heart",
    "earth",
    "night",
    "thing",
    "search",
    "chaser",
    "star",
    "rats",
    "arts",
    "tsar",
    "evil",
    "live",
    "veil",
    "vile",
    "race",
    "care",
    "acre",
    "read",
    "dear",
    "dare",
];

// Reverse maps for Latin to Russian
export const createReverseMap = (map: Record<string, string>): Record<string, string> => {
    const reverse: Record<string, string> = {};
    Object.entries(map).forEach(([ru, lat]) => {
        if (lat && !reverse[lat.toLowerCase()]) {
            reverse[lat.toLowerCase()] = ru.toLowerCase();
        }
    });
    return reverse;
};

// Helper for formatting results
export function fmtResult(n: number): string {
    if (n === 0)
        return '0';
    const abs = Math.abs(n);
    if (abs < 1e-6 || abs >= 1e9) {
        return n.toExponential(4).replace(/e([+-]?)(\\d+)/, '×10^$1$2');
    }
    let s = n.toFixed(6);
    if (s.includes('.')) {
        s = s.replace(/\.?0+$/, '');
    }
    return s;
}

// База данных калорийности продуктов (на 100г)
export const foodDatabase: Record<string, {
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
}> = {
    'apple': { name: 'Яблоко', calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
    'banana': { name: 'Банан', calories: 89, protein: 1.1, fat: 0.3, carbs: 23 },
    'chicken': { name: 'Куриная грудка', calories: 165, protein: 31, fat: 3.6, carbs: 0 },
    'beef': { name: 'Говядина', calories: 250, protein: 26, fat: 15, carbs: 0 },
    'rice': { name: 'Рис белый', calories: 130, protein: 2.7, fat: 0.3, carbs: 28 },
    'pasta': { name: 'Макароны', calories: 131, protein: 5, fat: 1.1, carbs: 25 },
    'bread': { name: 'Хлеб белый', calories: 265, protein: 9, fat: 3.2, carbs: 49 },
    'milk': { name: 'Молоко 3.2%', calories: 62, protein: 3.2, fat: 3.2, carbs: 4.8 },
    'cheese': { name: 'Сыр твёрдый', calories: 350, protein: 25, fat: 27, carbs: 2 },
    'eggs': { name: 'Яйцо куриное', calories: 155, protein: 13, fat: 11, carbs: 1.1 },
    'potato': { name: 'Картофель', calories: 77, protein: 2, fat: 0.1, carbs: 17 },
    'cucumber': { name: 'Огурец', calories: 16, protein: 0.7, fat: 0.1, carbs: 3.6 },
    'tomato': { name: 'Помидор', calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9 },
    'buckwheat': { name: 'Гречка', calories: 132, protein: 4.5, fat: 1.6, carbs: 27 },
    'oatmeal': { name: 'Овсянка', calories: 68, protein: 2.4, fat: 1.4, carbs: 12 },
    'kefir': { name: 'Кефир 2.5%', calories: 52, protein: 2.9, fat: 2.5, carbs: 4 },
    'cottage': { name: 'Творог 5%', calories: 120, protein: 17, fat: 5, carbs: 3 },
    'salmon': { name: 'Лосось', calories: 208, protein: 20, fat: 13, carbs: 0 },
    'cod': { name: 'Треска', calories: 82, protein: 18, fat: 0.7, carbs: 0 },
    'carrot': { name: 'Морковь', calories: 41, protein: 0.9, fat: 0.2, carbs: 10 },
    'beet': { name: 'Свёкла', calories: 43, protein: 1.6, fat: 0.2, carbs: 10 },
    'onion': { name: 'Лук', calories: 40, protein: 1.1, fat: 0.1, carbs: 9 },
    'garlic': { name: 'Чеснок', calories: 149, protein: 6.4, fat: 0.5, carbs: 33 },
    'cabbage': { name: 'Капуста белокочанная', calories: 25, protein: 1.3, fat: 0.1, carbs: 6 },
    'pepper': { name: 'Перец болгарский', calories: 27, protein: 1, fat: 0.3, carbs: 6 },
    'zucchini': { name: 'Кабачок', calories: 17, protein: 1.2, fat: 0.3, carbs: 3.1 },
    'eggplant': { name: 'Баклажан', calories: 25, protein: 1, fat: 0.2, carbs: 6 },
    'mushrooms': { name: 'Шампиньоны', calories: 22, protein: 2, fat: 0.3, carbs: 3.3 },
    'nuts': { name: 'Грецкие орехи', calories: 654, protein: 15, fat: 65, carbs: 14 },
    'honey': { name: 'Мёд', calories: 304, protein: 0.3, fat: 0, carbs: 82 },
    'sugar': { name: 'Сахар', calories: 387, protein: 0, fat: 0, carbs: 100 },
    'butter': { name: 'Сливочное масло', calories: 717, protein: 0.9, fat: 81, carbs: 0.1 },
    'sourcream': { name: 'Сметана 15%', calories: 158, protein: 2.7, fat: 15, carbs: 3 },
    'yogurt': { name: 'Йогурт натуральный', calories: 63, protein: 5, fat: 1.5, carbs: 7 },
    'turkey': { name: 'Индейка', calories: 135, protein: 30, fat: 1, carbs: 0 },
    'pork': { name: 'Свинина постная', calories: 143, protein: 26, fat: 4, carbs: 0 },
    'lamb': { name: 'Баранина', calories: 294, protein: 25, fat: 21, carbs: 0 },
    'beans': { name: 'Фасоль красная', calories: 127, protein: 8.7, fat: 0.5, carbs: 22 },
    'lentils': { name: 'Чечевица', calories: 116, protein: 9, fat: 0.4, carbs: 20 },
    'peas': { name: 'Горох', calories: 81, protein: 5, fat: 0.4, carbs: 14 },
    'corn': { name: 'Кукуруза', calories: 86, protein: 3.2, fat: 1.2, carbs: 19 },
    'orange': { name: 'Апельсин', calories: 47, protein: 0.9, fat: 0.1, carbs: 12 },
    'grape': { name: 'Виноград', calories: 69, protein: 0.7, fat: 0.2, carbs: 18 },
    'pear': { name: 'Груша', calories: 57, protein: 0.4, fat: 0.1, carbs: 15 },
    'plum': { name: 'Слива', calories: 46, protein: 0.7, fat: 0.3, carbs: 11 },
    'peach': { name: 'Персик', calories: 39, protein: 0.9, fat: 0.3, carbs: 10 },
    'strawberry': { name: 'Клубника', calories: 32, protein: 0.7, fat: 0.3, carbs: 8 },
    'blueberry': { name: 'Черника', calories: 57, protein: 0.7, fat: 0.3, carbs: 14 },
    'watermelon': { name: 'Арбуз', calories: 30, protein: 0.6, fat: 0.2, carbs: 8 },
    'melon': { name: 'Дыня', calories: 34, protein: 0.8, fat: 0.2, carbs: 8 },
    'pumpkin': { name: 'Тыква', calories: 26, protein: 1, fat: 0.1, carbs: 7 }
};

// УТИЛИТЫ РАБОТЫ С ЦВЕТОМ
// Вспомогательные функции для работы с цветом
export const hexToRgb = (hex: string): {
    r: number;
    g: number;
    b: number;
} | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

export const hslToRgb = (h: number, s: number, l: number): {
    r: number;
    g: number;
    b: number;
} => {
    const sNorm = s / 100;
    const lNorm = l / 100;
    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = lNorm - c / 2;
    let r = 0, g = 0, b = 0;
    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
};

export const kidsShoesEU2US: Record<string, string> = {
    '16': '1', '17': '2', '18': '3', '19': '4', '20': '5', '21': '5.5', '22': '6',
    '23': '7', '24': '8', '25': '9', '26': '9.5', '27': '10', '28': '11', '29': '11.5',
    '30': '12', '31': '13', '32': '1Y', '33': '2Y', '34': '3Y', '35': '4Y', '36': '5Y', '37': '6Y'
};

export const kidsShoesUS2EU: Record<string, string> = {
    '1': '16', '2': '17', '3': '18', '4': '19', '5': '20', '6': '22', '7': '23',
    '8': '24', '9': '25', '10': '27', '11': '28', '12': '30', '13': '31',
    '1Y': '32', '2Y': '33', '3Y': '34', '4Y': '35', '5Y': '36', '6Y': '37'
};

export const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
];

export const mm2awg: Record<string, string> = {
    '8.25': '0', '7.35': '1', '6.54': '2', '5.83': '3', '5.19': '4',
    '4.62': '5', '4.11': '6', '3.67': '7', '3.26': '8', '2.91': '9',
    '2.59': '10', '2.30': '11', '2.05': '12', '1.83': '13', '1.63': '14',
    '1.45': '15', '1.29': '16', '1.15': '17', '1.02': '18', '0.91': '19',
    '0.81': '20', '0.72': '21', '0.64': '22', '0.57': '23', '0.51': '24',
    '0.45': '25', '0.40': '26', '0.36': '27', '0.32': '28', '0.29': '29',
    '0.25': '30', '0.23': '31', '0.20': '32', '0.18': '33', '0.16': '34',
    '0.14': '35', '0.13': '36', '0.11': '37', '0.10': '38', '0.09': '39', '0.08': '40'
};

export const morseCodeMap: Record<string, string> = {
    // Latin
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i: "..",
    j: ".---",
    k: "-.-",
    l: ".-..",
    m: "--",
    n: "-.",
    o: "---",
    p: ".--.",
    q: "--.-",
    r: ".-.",
    s: "...",
    t: "-",
    u: "..-",
    v: "...-",
    w: ".--",
    x: "-..-",
    y: "-.--",
    z: "--..",
    // Russian
    а: ".-",
    б: "-...",
    в: ".--",
    г: "--.",
    д: "-..",
    е: ".",
    ё: ".",
    ж: "...-",
    з: "--..",
    и: "..",
    й: ".---",
    к: "-.-",
    л: ".-..",
    м: "--",
    н: "-.",
    о: "---",
    п: ".--.",
    р: ".-.",
    с: "...",
    т: "-",
    у: "..-",
    ф: "..-.",
    х: "....",
    ц: "-.-.",
    ч: "---.",
    ш: "----",
    щ: "--.-",
    ъ: ".--.-.",
    ы: "-.--",
    ь: "-..-",
    э: "..-..",
    ю: "..--",
    я: ".-.-",
    // Numbers
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    // Punctuation
    ".": ".-.-.-",
    ",": "--..--",
    "!": "-.-.--",
    "?": "..--..",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
    " ": "/",
};

export function parseTime(time: string, offsetFrom: number, offsetTo: number): {
    result: string;
    diffText: string;
} {
    const parts = time.split(':');
    if (parts.length !== 2)
        return { result: 'Некорректный формат', diffText: '' };
    let h = parseInt(parts[0], 10) - offsetFrom + offsetTo;
    const m = parseInt(parts[1], 10);
    if (isNaN(h) || isNaN(m) || m < 0 || m > 59)
        return { result: 'Некорректное время', diffText: '' };
    let dayShift = '';
    if (h >= 24) {
        h -= 24;
        dayShift = ' (след. день)';
    }
    if (h < 0) {
        h += 24;
        dayShift = ' (пред. день)';
    }
    const diff = offsetTo - offsetFrom;
    const diffText = diff > 0 ? `+${diff} ч` : diff < 0 ? `${diff} ч` : '0 ч';
    return { result: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}${dayShift}`, diffText };
}

export const pronounceableSyllables = [
    "ba",
    "be",
    "bi",
    "bo",
    "bu",
    "ca",
    "ce",
    "ci",
    "co",
    "cu",
    "da",
    "de",
    "di",
    "do",
    "du",
    "fa",
    "fe",
    "fi",
    "fo",
    "fu",
    "ga",
    "ge",
    "gi",
    "go",
    "gu",
    "ha",
    "he",
    "hi",
    "ho",
    "hu",
    "ja",
    "je",
    "ji",
    "jo",
    "ju",
    "ka",
    "ke",
    "ki",
    "ko",
    "ku",
    "la",
    "le",
    "li",
    "lo",
    "lu",
    "ma",
    "me",
    "mi",
    "mo",
    "mu",
    "na",
    "ne",
    "ni",
    "no",
    "nu",
    "pa",
    "pe",
    "pi",
    "po",
    "pu",
    "ra",
    "re",
    "ri",
    "ro",
    "ru",
    "sa",
    "se",
    "si",
    "so",
    "su",
    "ta",
    "te",
    "ti",
    "to",
    "tu",
    "va",
    "ve",
    "vi",
    "vo",
    "vu",
    "xa",
    "xe",
    "xi",
    "xo",
    "xu",
    "za",
    "ze",
    "zi",
    "zo",
    "zu",
    "tra",
    "tre",
    "tri",
    "tro",
    "tru",
    "pra",
    "pre",
    "pri",
    "pro",
    "pru",
    "sta",
    "ste",
    "sti",
    "sto",
    "stu",
    "sha",
    "she",
    "shi",
    "sho",
    "shu",
];

export const reverseMorseMap: Record<string, string> = {};

export const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(Math.round(r))}${toHex(Math.round(g))}${toHex(Math.round(b))}`;
};

export const rgbToHsl = (r: number, g: number, b: number): {
    h: number;
    s: number;
    l: number;
} => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const diff = max - min;
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (diff !== 0) {
        s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
        switch (max) {
            case rNorm:
                h = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) / 6;
                break;
            case gNorm:
                h = ((bNorm - rNorm) / diff + 2) / 6;
                break;
            case bNorm:
                h = ((rNorm - gNorm) / diff + 4) / 6;
                break;
        }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
};

export const ringRU2US: Record<string, string> = {
    '15.0': '4', '15.3': '4.5', '15.7': '5', '16.1': '5.5', '16.5': '6',
    '16.9': '6.5', '17.3': '7', '17.7': '7.5', '18.1': '8', '18.5': '8.5',
    '18.9': '9', '19.3': '9.5', '19.7': '10', '20.1': '10.5', '20.5': '11',
    '20.9': '11.5', '21.3': '12', '21.7': '12.5', '22.1': '13'
};

export const ringUS2RU: Record<string, string> = {
    '4': '15.0', '4.5': '15.3', '5': '15.7', '5.5': '16.1', '6': '16.5',
    '6.5': '16.9', '7': '17.3', '7.5': '17.7', '8': '18.1', '8.5': '18.5',
    '9': '18.9', '9.5': '19.3', '10': '19.7', '10.5': '20.1', '11': '20.5',
    '11.5': '20.9', '12': '21.3', '12.5': '21.7', '13': '22.1'
};

// Расширенная база данных русских продуктов (50+ позиций)
export const russianFoodDatabase: Record<string, {
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
}> = {
    // Каши и хлеб
    'grechka': { name: 'Гречневая каша', calories: 132, protein: 4.5, fat: 1.6, carbs: 27 },
    'ovsyanka': { name: 'Овсяная каша на воде', calories: 68, protein: 2.4, fat: 1.4, carbs: 12 },
    'pshenka': { name: 'Пшенная каша', calories: 135, protein: 3.5, fat: 1.0, carbs: 25 },
    'ris': { name: 'Рис отварной', calories: 130, protein: 2.7, fat: 0.3, carbs: 28 },
    'manka': { name: 'Манная каша', calories: 98, protein: 2.5, fat: 3.2, carbs: 16 },
    'rzhanye_hlebcy': { name: 'Ржаные хлебцы', calories: 340, protein: 8, fat: 2, carbs: 70 },
    'borodino': { name: 'Хлеб Бородинский', calories: 202, protein: 6, fat: 1, carbs: 40 },
    'baton': { name: 'Батон нарезной', calories: 264, protein: 8, fat: 3, carbs: 50 },
    // Молочные продукты
    'moloko_3_2': { name: 'Молоко 3.2%', calories: 62, protein: 3.2, fat: 3.2, carbs: 4.8 },
    'kefir_2_5': { name: 'Кефир 2.5%', calories: 52, protein: 2.9, fat: 2.5, carbs: 4.0 },
    'kefir_3_2': { name: 'Кефир 3.2%', calories: 58, protein: 3.0, fat: 3.2, carbs: 4.0 },
    'ryazhenka': { name: 'Ряженка 2.5%', calories: 54, protein: 3.0, fat: 2.5, carbs: 4.2 },
    'prostokvasha': { name: 'Простокваша', calories: 58, protein: 2.9, fat: 2.5, carbs: 4.1 },
    'tvorog_5': { name: 'Творог 5%', calories: 120, protein: 17, fat: 5, carbs: 3 },
    'tvorog_9': { name: 'Творог 9%', calories: 159, protein: 16, fat: 9, carbs: 2.5 },
    'tvorog_18': { name: 'Творог 18%', calories: 232, protein: 14, fat: 18, carbs: 2.5 },
    'smetana_15': { name: 'Сметана 15%', calories: 158, protein: 2.7, fat: 15, carbs: 3 },
    'smetana_20': { name: 'Сметана 20%', calories: 206, protein: 2.5, fat: 20, carbs: 3.2 },
    'syr_tv': { name: 'Сыр твёрдый', calories: 350, protein: 25, fat: 27, carbs: 2 },
    'syr_pl': { name: 'Сыр плавленый', calories: 290, protein: 16, fat: 24, carbs: 4 },
    'syr_tvor': { name: 'Сырок творожный', calories: 190, protein: 6, fat: 12, carbs: 15 },
    'maslo_sl': { name: 'Сливочное масло', calories: 717, protein: 0.9, fat: 81, carbs: 0.1 },
    'margarin': { name: 'Маргарин', calories: 717, protein: 0.2, fat: 81, carbs: 0.7 },
    'yogurt_grech': { name: 'Йогурт греческий', calories: 97, protein: 9, fat: 5, carbs: 3.6 },
    // Мясо
    'govyadina_vr': { name: 'Говядина варёная', calories: 175, protein: 25, fat: 8, carbs: 0 },
    'govyadina_zh': { name: 'Говядина жареная', calories: 218, protein: 25, fat: 12, carbs: 0 },
    'svinina_vr': { name: 'Свинина варёная', calories: 252, protein: 22, fat: 18, carbs: 0 },
    'svinina_zh': { name: 'Свинина жареная', calories: 298, protein: 22, fat: 22, carbs: 0 },
    'kur_grud': { name: 'Куриная грудка', calories: 165, protein: 31, fat: 3.6, carbs: 0 },
    'kur_bedro': { name: 'Куриное бедро', calories: 184, protein: 20, fat: 11, carbs: 0 },
    'kur_jaico': { name: 'Яйцо куриное', calories: 155, protein: 13, fat: 11, carbs: 1.1 },
    'kur_jaico_vr': { name: 'Яйцо варёное', calories: 155, protein: 13, fat: 11, carbs: 1.1 },
    'kur_jaico_je': { name: 'Яичница', calories: 175, protein: 13, fat: 13, carbs: 1.1 },
    'ind_kur': { name: 'Индейка', calories: 135, protein: 30, fat: 1, carbs: 0 },
    'baran': { name: 'Баранина', calories: 294, protein: 25, fat: 21, carbs: 0 },
    'krolik': { name: 'Кролик', calories: 173, protein: 21, fat: 10, carbs: 0 },
    'vetchina': { name: 'Ветчина', calories: 107, protein: 18, fat: 4, carbs: 0 },
    'kolbasa_dok': { name: 'Колбаса докторская', calories: 260, protein: 13, fat: 22, carbs: 0 },
    'kolbasa_milk': { name: 'Молочная колбаса', calories: 391, protein: 11, fat: 37, carbs: 0 },
    'sosiska': { name: 'Сосиски молочные', calories: 294, protein: 10, fat: 27, carbs: 0 },
    'sardelki': { name: 'Сардельки', calories: 325, protein: 11, fat: 30, carbs: 0 },
    // Рыба
    'treska': { name: 'Треска', calories: 82, protein: 18, fat: 0.7, carbs: 0 },
    'kambala': { name: 'Камбала', calories: 90, protein: 16, fat: 3, carbs: 0 },
    'mintay': { name: 'Минтай', calories: 79, protein: 16, fat: 1, carbs: 0 },
    'seledka': { name: 'Селёдка', calories: 160, protein: 17, fat: 10, carbs: 0 },
    'losos': { name: 'Лосось', calories: 208, protein: 20, fat: 13, carbs: 0 },
    'gorbusha': { name: 'Горбуша', calories: 116, protein: 21, fat: 3, carbs: 0 },
    'keta': { name: 'Кета', calories: 136, protein: 22, fat: 5, carbs: 0 },
    'semga': { name: 'Сёмга', calories: 182, protein: 20, fat: 11, carbs: 0 },
    'skumbria': { name: 'Скумбрия', calories: 191, protein: 18, fat: 13, carbs: 0 },
    'sardina': { name: 'Сардина', calories: 208, protein: 25, fat: 11, carbs: 0 },
    'tunec': { name: 'Тунец', calories: 144, protein: 23, fat: 5, carbs: 0 },
    'krevetki': { name: 'Креветки', calories: 106, protein: 20, fat: 2, carbs: 1 },
    'kalmar': { name: 'Кальмар', calories: 100, protein: 16, fat: 2, carbs: 3 },
    'mussels': { name: 'Мидии', calories: 172, protein: 24, fat: 4, carbs: 7 },
    // Овощи
    'kartoshka_vr': { name: 'Картофель варёный', calories: 77, protein: 2, fat: 0.1, carbs: 17 },
    'kartoshka_zh': { name: 'Картофель жареный', calories: 198, protein: 2, fat: 9, carbs: 25 },
    'morkov': { name: 'Морковь', calories: 41, protein: 0.9, fat: 0.2, carbs: 10 },
    'svekla': { name: 'Свёкла', calories: 43, protein: 1.6, fat: 0.2, carbs: 10 },
    'kapusta': { name: 'Капуста белокочанная', calories: 25, protein: 1.3, fat: 0.1, carbs: 6 },
    'kapusta_cv': { name: 'Цветная капуста', calories: 25, protein: 1.9, fat: 0.3, carbs: 5 },
    'brokkoli': { name: 'Брокколи', calories: 34, protein: 2.8, fat: 0.4, carbs: 7 },
    'pomidor': { name: 'Помидор', calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9 },
    'ogurec': { name: 'Огурец', calories: 16, protein: 0.7, fat: 0.1, carbs: 3.6 },
    'baklazhan': { name: 'Баклажан', calories: 25, protein: 1, fat: 0.2, carbs: 6 },
    'kabachok': { name: 'Кабачок', calories: 17, protein: 1.2, fat: 0.3, carbs: 3.1 },
    'perets': { name: 'Перец болгарский', calories: 27, protein: 1, fat: 0.3, carbs: 6 },
    'luk_rep': { name: 'Лук репчатый', calories: 40, protein: 1.1, fat: 0.1, carbs: 9 },
    'chesnok': { name: 'Чеснок', calories: 149, protein: 6.4, fat: 0.5, carbs: 33 },
    'ukrop': { name: 'Укроп', calories: 43, protein: 2.5, fat: 1.1, carbs: 7 },
    'petrushka': { name: 'Петрушка', calories: 36, protein: 2.6, fat: 0.8, carbs: 6 },
    'shampin': { name: 'Шампиньоны', calories: 22, protein: 2, fat: 0.3, carbs: 3.3 },
    'bely_grib': { name: 'Белые грибы', calories: 34, protein: 3.3, fat: 1.7, carbs: 3 },
    // Фрукты и ягоды
    'yabloko': { name: 'Яблоко', calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
    'banan': { name: 'Банан', calories: 89, protein: 1.1, fat: 0.3, carbs: 23 },
    'apelsin': { name: 'Апельсин', calories: 47, protein: 0.9, fat: 0.1, carbs: 12 },
    'grusha': { name: 'Груша', calories: 57, protein: 0.4, fat: 0.1, carbs: 15 },
    'persik': { name: 'Персик', calories: 39, protein: 0.9, fat: 0.3, carbs: 10 },
    'vinograd': { name: 'Виноград', calories: 69, protein: 0.7, fat: 0.2, carbs: 18 },
    'sliva': { name: 'Слива', calories: 46, protein: 0.7, fat: 0.3, carbs: 11 },
    'klubnika': { name: 'Клубника', calories: 32, protein: 0.7, fat: 0.3, carbs: 8 },
    'malina': { name: 'Малина', calories: 52, protein: 1.2, fat: 0.7, carbs: 12 },
    'smorodina': { name: 'Смородина чёрная', calories: 63, protein: 1.4, fat: 0.4, carbs: 15 },
    'chernika': { name: 'Черника', calories: 57, protein: 0.7, fat: 0.3, carbs: 14 },
    'arbuz': { name: 'Арбуз', calories: 30, protein: 0.6, fat: 0.2, carbs: 8 },
    'dynya': { name: 'Дыня', calories: 34, protein: 0.8, fat: 0.2, carbs: 8 },
    'avokado': { name: 'Авокадо', calories: 160, protein: 2, fat: 15, carbs: 9 },
    'limon': { name: 'Лимон', calories: 29, protein: 1.1, fat: 0.3, carbs: 9 },
    // Орехи и семена
    'grech_oreh': { name: 'Грецкие орехи', calories: 654, protein: 15, fat: 65, carbs: 14 },
    'mindal': { name: 'Миндаль', calories: 579, protein: 21, fat: 50, carbs: 22 },
    'keshyu': { name: 'Кешью', calories: 553, protein: 18, fat: 44, carbs: 30 },
    'fistashki': { name: 'Фисташки', calories: 560, protein: 20, fat: 45, carbs: 28 },
    'izum': { name: 'Изюм', calories: 299, protein: 3.1, fat: 0.5, carbs: 79 },
    'kuraga': { name: 'Курага', calories: 241, protein: 3.4, fat: 0.5, carbs: 63 },
    'finiki': { name: 'Финики', calories: 282, protein: 2.5, fat: 0.4, carbs: 75 },
    // Напитки
    'kofe': { name: 'Кофе чёрный', calories: 2, protein: 0.1, fat: 0, carbs: 0.3 },
    'kofe_mol': { name: 'Кофе с молоком', calories: 45, protein: 2, fat: 2, carbs: 5 },
    'chay': { name: 'Чай чёрный', calories: 1, protein: 0, fat: 0, carbs: 0.2 },
    'kakao': { name: 'Какао на молоке', calories: 88, protein: 3, fat: 3, carbs: 13 },
    'kompot': { name: 'Компот', calories: 60, protein: 0.5, fat: 0, carbs: 15 },
    'kissel': { name: 'Кисель', calories: 78, protein: 0.5, fat: 0.1, carbs: 19 },
    'mors': { name: 'Морс', calories: 48, protein: 0.2, fat: 0, carbs: 12 },
    'kvass': { name: 'Квас', calories: 27, protein: 0.5, fat: 0, carbs: 6 },
    // Сладости
    'shokolad': { name: 'Шоколад молочный', calories: 534, protein: 7.7, fat: 34, carbs: 53 },
    'shok_gor': { name: 'Шоколад горький', calories: 546, protein: 4.9, fat: 35, carbs: 48 },
    'zefir': { name: 'Зефир', calories: 326, protein: 1.5, fat: 0, carbs: 78 },
    'pastila': { name: 'Пастила', calories: 333, protein: 1, fat: 0, carbs: 82 },
    'marmelad': { name: 'Мармелад', calories: 296, protein: 0, fat: 0.1, carbs: 74 },
    'varene': { name: 'Варенье', calories: 262, protein: 0.3, fat: 0.2, carbs: 67 },
    'med': { name: 'Мёд', calories: 304, protein: 0.3, fat: 0, carbs: 82 },
    'sahar': { name: 'Сахар', calories: 387, protein: 0, fat: 0, carbs: 100 },
    'sahar_raf': { name: 'Сахар рафинад', calories: 387, protein: 0, fat: 0, carbs: 100 },
    'vareniki': { name: 'Вареники с творогом', calories: 185, protein: 7, fat: 4, carbs: 30 },
    'vareniki_kar': { name: 'Вареники с картошкой', calories: 155, protein: 4, fat: 4, carbs: 26 },
    'pelmeni': { name: 'Пельмени', calories: 260, protein: 12, fat: 15, carbs: 19 },
    'bliny': { name: 'Блины', calories: 226, protein: 6, fat: 10, carbs: 28 },
    'sirniki': { name: 'Сырники', calories: 222, protein: 13, fat: 11, carbs: 17 },
    'vatrushka': { name: 'Ватрушка с творогом', calories: 290, protein: 9, fat: 12, carbs: 37 },
    'pizza': { name: 'Пицца пепперони', calories: 266, protein: 11, fat: 10, carbs: 33 },
    'burger': { name: 'Бургер', calories: 295, protein: 15, fat: 14, carbs: 30 },
    'kart_fr': { name: 'Картофель фри', calories: 312, protein: 3.4, fat: 15, carbs: 41 },
    'naggets': { name: 'Куриные наггетсы', calories: 296, protein: 15, fat: 20, carbs: 16 },
    'hot_dog': { name: 'Хот-дог', calories: 290, protein: 10, fat: 17, carbs: 23 }
};

export const shoesEU2UK: Record<string, string> = {
    '34.5': '2', '35': '2.5', '35.5': '3', '36': '3.5', '37': '4', '37.5': '4.5', '38': '5',
    '38.5': '5.5', '39': '6', '40': '6.5', '40.5': '7', '41': '7.5', '42': '8',
    '42.5': '8.5', '43': '9', '44': '9.5', '44.5': '10', '45': '10.5', '46': '11', '46.5': '11.5', '47': '12', '48': '13'
};

export const shoesEU2US: Record<string, string> = {
    '35': '4.5', '35.5': '5', '36': '5.5', '36.5': '6', '37': '6.5', '37.5': '7', '38': '7.5',
    '38.5': '8', '39': '8.5', '40': '9', '40.5': '9.5', '41': '10', '42': '10.5',
    '42.5': '11', '43': '11.5', '44': '12', '44.5': '12.5', '45': '13', '46': '13.5', '46.5': '14'
};

export const shoesUK2EU: Record<string, string> = {
    '2': '34.5', '2.5': '35', '3': '35.5', '3.5': '36', '4': '37', '4.5': '37.5',
    '5': '38', '5.5': '38.5', '6': '39', '6.5': '40', '7': '40.5', '7.5': '41',
    '8': '42', '8.5': '42.5', '9': '43', '9.5': '44', '10': '44.5', '10.5': '45',
    '11': '46', '11.5': '46.5', '12': '47', '13': '48'
};

export const shoesUK2US: Record<string, string> = {
    '2': '4.5', '2.5': '5', '3': '5.5', '3.5': '6', '4': '6.5', '4.5': '7', '5': '7.5',
    '5.5': '8', '6': '8.5', '6.5': '9', '7': '9.5', '7.5': '10', '8': '10.5',
    '8.5': '11', '9': '11.5', '9.5': '12', '10': '12.5', '10.5': '13', '11': '13.5', '11.5': '14', '12': '14.5', '13': '15.5'
};

export const shoesUS2EU: Record<string, string> = {
    '5': '35.5', '5.5': '36', '6': '36.5', '6.5': '37', '7': '37.5', '7.5': '38',
    '8': '38.5', '8.5': '39', '9': '40', '9.5': '40.5', '10': '41', '10.5': '42',
    '11': '42.5', '11.5': '43', '12': '44', '12.5': '44.5', '13': '45', '13.5': '46', '14': '46.5'
};

export const shoesUS2UK: Record<string, string> = {
    '5': '2.5', '5.5': '3', '6': '3.5', '6.5': '4', '7': '4.5', '7.5': '5',
    '8': '5.5', '8.5': '6', '9': '6.5', '9.5': '7', '10': '7.5', '10.5': '8',
    '11': '8.5', '11.5': '9', '12': '9.5', '12.5': '10', '13': '10.5', '13.5': '11', '14': '11.5'
};

export const timezoneOffsets: Record<string, number> = {
    'UTC': 0, 'MSK': 3, 'CET': 1, 'EST': -5, 'PST': -8, 'JST': 9, 'AEST': 10, 'IST': 5.5, 'CST': 8
};

export const toCamelCase = (str: string): string => {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
};

export const toKebabCase = (str: string): string => {
    return (str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        ?.map((x) => x.toLowerCase())
        .join("-") || str.toLowerCase());
};

export const toSentenceCase = (str: string): string => {
    return str
        .toLowerCase()
        .replace(/(^")|\. +[a-zа-яё]/g, (match) => match.toUpperCase());
};

export const toSnakeCase = (str: string): string => {
    return (str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        ?.map((x) => x.toLowerCase())
        .join("_") || str.toLowerCase());
};

export const toTitleCase = (str: string): string => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export const translitMaps: Record<string, Record<string, string>> = {
  icao: { ..._translitBase, ё: "e", й: "i", Ё: "E", Й: "I", Ъ: "Ie", Ь: "", Э: "E", Ю: "Iu", Я: "Ia" },
  bgn: { ..._translitBase, ё: "yo", й: "y", Ё: "Yo", Й: "Y", Ъ: "", Ь: "", Э: "E", Ю: "Yu", Я: "Ya" },
  passport: { ..._translitBase, ё: "e", й: "i", Ё: "E", Й: "I", Ъ: "", Ь: "", Э: "E", Ю: "Yu", Я: "Ya" },
  gost: { ..._translitBase, ё: "yo", й: "j", Ё: "Yo", Й: "J", Ъ: "ʺ", Ь: "ʹ", Э: "È", Ю: "Ju", Я: "Ja" },
};
