import type { ComputeFn } from './compute-helpers';
import { caesarShift, createReverseMap, hexToRgb, rgbToHex, translitMaps } from './compute-helpers';

export const computeMap_tech_it_b_2: Record<string, ComputeFn> = {
  'schyotchik-simvolov': (inputs) => {
    const text = String(inputs.text || "");
    if (!text) {
        return [
            { value: "0", label: "Символов с пробелами", unit: "шт" },
            { value: "0", label: "Символов без пробелов", unit: "шт" },
            { value: "0", label: "Слов", unit: "шт" },
            { value: "0", label: "Строк", unit: "шт" },
            { value: "0", label: "Абзацев", unit: "шт" },
            { value: "0", label: "Байт", unit: "байт" },
        ];
    }
    const withSpaces = text.length;
    const withoutSpaces = text.replace(/\s/g, "").length;
    const words = text
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length;
    const lines = text.split(/\r\n|\r|\n/).length;
    const paragraphs = text
        .split(/\n\s*\n/)
        .filter((p) => p.trim().length > 0).length;
    const bytes = new Blob([text]).size;
    return [
        {
            value: withSpaces.toString(),
            label: "Символов с пробелами",
            unit: "шт",
        },
        {
            value: withoutSpaces.toString(),
            label: "Символов без пробелов",
            unit: "шт",
        },
        { value: words.toString(), label: "Слов", unit: "шт" },
        { value: lines.toString(), label: "Строк", unit: "шт" },
        { value: paragraphs.toString(), label: "Абзацев", unit: "шт" },
        { value: bytes.toString(), label: "Байт", unit: "байт" },
    ];
},
  'sekundomer': () => [],
  'sila-parolya': (inputs) => {
    const password = String(inputs.password || '');
    if (!password) {
        return [
            { value: 'Введите пароль', label: 'Надёжность', unit: '' },
            { value: '0', label: 'Энтропия', unit: 'бит' },
            { value: '-', label: 'Время взлома', unit: '' }
        ];
    }
    const length = password.length;
    let charsetSize = 0;
    if (/[a-z]/.test(password))
        charsetSize += 26;
    if (/[A-Z]/.test(password))
        charsetSize += 26;
    if (/[0-9]/.test(password))
        charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(password))
        charsetSize += 32;
    if (charsetSize === 0)
        charsetSize = 1;
    const entropy = Math.log2(Math.pow(charsetSize, length));
    let strength: string;
    if (entropy < 28)
        strength = 'Очень слабый';
    else if (entropy < 36)
        strength = 'Слабый';
    else if (entropy < 60)
        strength = 'Средний';
    else if (entropy < 80)
        strength = 'Сильный';
    else
        strength = 'Очень сильный';
    // Estimate crack time (assuming 1 billion guesses per second)
    const guessesPerSecond = 1000000000;
    const secondsToCrack = Math.pow(2, entropy) / guessesPerSecond;
    let timeToCrack: string;
    if (secondsToCrack < 1)
        timeToCrack = 'Мгновенно';
    else if (secondsToCrack < 60)
        timeToCrack = `${Math.round(secondsToCrack)} сек`;
    else if (secondsToCrack < 3600)
        timeToCrack = `${Math.round(secondsToCrack / 60)} мин`;
    else if (secondsToCrack < 86400)
        timeToCrack = `${Math.round(secondsToCrack / 3600)} час`;
    else if (secondsToCrack < 31536000)
        timeToCrack = `${Math.round(secondsToCrack / 86400)} дн`;
    else if (secondsToCrack < 3153600000)
        timeToCrack = `${Math.round(secondsToCrack / 31536000)} лет`;
    else
        timeToCrack = 'Миллиарды лет';
    return [
        { value: strength, label: 'Надёжность', unit: '' },
        { value: Math.round(entropy).toString(), label: 'Энтропия', unit: 'бит' },
        { value: timeToCrack, label: 'Время взлома', unit: '' }
    ];
},
  'simulyator-daltonizma': (inputs) => {
    const color = String(inputs.color || '#FF6B6B');
    const type = String(inputs.type || 'protanopia');
    const rgb = hexToRgb(color);
    if (!rgb) {
        return [
            { value: color, label: 'Исходный', unit: '' },
            { value: 'Ошибка HEX', label: 'Результат', unit: '' }
        ];
    }
    // Матрицы трансформации для разных типов дальтонизма
    const matrices: Record<string, number[][]> = {
        protanopia: [
            [0.567, 0.433, 0],
            [0.558, 0.442, 0],
            [0, 0.242, 0.758]
        ],
        deuteranopia: [
            [0.625, 0.375, 0],
            [0.7, 0.3, 0],
            [0, 0.3, 0.7]
        ],
        tritanopia: [
            [0.95, 0.05, 0],
            [0, 0.433, 0.567],
            [0, 0.475, 0.525]
        ],
        achromatopsia: [
            [0.299, 0.587, 0.114],
            [0.299, 0.587, 0.114],
            [0.299, 0.587, 0.114]
        ]
    };
    const matrix = matrices[type] || matrices.protanopia;
    const r = rgb.r;
    const g = rgb.g;
    const b = rgb.b;
    const newR = matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b;
    const newG = matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b;
    const newB = matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b;
    const simulated = rgbToHex(Math.max(0, Math.min(255, newR)), Math.max(0, Math.min(255, newG)), Math.max(0, Math.min(255, newB)));
    const typeNames: Record<string, string> = {
        protanopia: 'Протанопия',
        deuteranopia: 'Дейтеранопия',
        tritanopia: 'Тританопия',
        achromatopsia: 'Ахроматопсия'
    };
    return [
        { value: color.toUpperCase(), label: 'Исходный', unit: '' },
        { value: simulated, label: typeNames[type] || type, unit: '' }
    ];
},
  'smesitel-cvetov': (inputs) => {
    const color1 = String(inputs.color1 || '#FF0000');
    const color2 = String(inputs.color2 || '#0000FF');
    const ratio = Math.max(0, Math.min(100, Number(inputs.ratio) || 50));
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    if (!rgb1 || !rgb2) {
        return [
            { value: 'Ошибка', label: 'Результат', unit: '' },
            { value: '—', label: 'HEX', unit: '' },
            { value: '—', label: 'RGB', unit: '' }
        ];
    }
    const r = Math.round(rgb1.r * (ratio / 100) + rgb2.r * (1 - ratio / 100));
    const g = Math.round(rgb1.g * (ratio / 100) + rgb2.g * (1 - ratio / 100));
    const b = Math.round(rgb1.b * (ratio / 100) + rgb2.b * (1 - ratio / 100));
    const resultHex = rgbToHex(r, g, b);
    const ratioText = `${ratio}% ${color1} + ${100 - ratio}% ${color2}`;
    return [
        { value: ratioText, label: 'Смесь', unit: '' },
        { value: resultHex, label: 'HEX', unit: '' },
        { value: `${r}, ${g}, ${b}`, label: 'RGB', unit: '' }
    ];
},
  'sootnoshenie-storon': (inputs) => {
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    if (!width || !height) {
        return [{ value: '—', label: 'Результат' }];
    }
    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };
    const divisor = gcd(width, height);
    const ratioWidth = width / divisor;
    const ratioHeight = height / divisor;
    let simplifiedRatio: string;
    if (Math.abs(width / height - 16 / 9) < 0.01)
        simplifiedRatio = '16:9';
    else if (Math.abs(width / height - 4 / 3) < 0.01)
        simplifiedRatio = '4:3';
    else if (Math.abs(width / height - 21 / 9) < 0.01)
        simplifiedRatio = '21:9';
    else if (Math.abs(width / height - 16 / 10) < 0.01)
        simplifiedRatio = '16:10';
    else if (Math.abs(width / height - 1) < 0.01)
        simplifiedRatio = '1:1';
    else if (Math.abs(width / height - 9 / 16) < 0.01)
        simplifiedRatio = '9:16';
    else
        simplifiedRatio = `${ratioWidth}:${ratioHeight}`;
    const orientation = width > height ? 'Альбомная (landscape)' : width < height ? 'Портретная (portrait)' : 'Квадрат';
    return [
        { value: simplifiedRatio, label: 'Соотношение сторон', unit: '' },
        { value: (width / height).toFixed(3), label: 'Десятичное значение', unit: '' },
        { value: orientation, label: 'Ориентация', unit: '' }
    ];
},
  'transliteratsiya': (inputs) => {
    const text = String(inputs.text || "");
    const direction = String(inputs.direction);
    const standard = String(inputs.standard);
    if (!text) {
        return [
            { value: "", label: "Результат", unit: "" },
            { value: "0", label: "Исходных символов", unit: "шт" },
            { value: "0", label: "Результат символов", unit: "шт" },
        ];
    }
    const map = translitMaps[standard];
    let result: string;
    if (direction === "ru-to-lat") {
        result = text
            .split("")
            .map((char) => map[char] || char)
            .join("");
    }
    else {
        // Latin to Russian: need to handle multi-char mappings
        const reverseMap = createReverseMap(map);
        result = text
            .toLowerCase()
            .split("")
            .map((char) => reverseMap[char] || char)
            .join("");
    }
    return [
        { value: result, label: "Результат", unit: "" },
        { value: text.length.toString(), label: "Исходных символов", unit: "шт" },
        {
            value: result.length.toString(),
            label: "Результат символов",
            unit: "шт",
        },
    ];
},
  'tsifrt-tsezarya': (inputs) => {
    const text = String(inputs.text || "");
    const shiftType = String(inputs.shift);
    const customShift = Number(inputs.customShift) || 3;
    const mode = String(inputs.mode);
    const alphabetType = String(inputs.alphabet);
    if (!text) {
        return [
            { value: "", label: "Результат", unit: "" },
            { value: "—", label: "Использованный сдвиг", unit: "" },
        ];
    }
    const alphabet = alphabetType === "russian"
        ? "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
        : "abcdefghijklmnopqrstuvwxyz";
    let shift: number;
    if (shiftType === "custom") {
        shift = customShift;
    }
    else {
        shift = Number(shiftType) || 13;
    }
    const effectiveShift = mode === "decode" ? -shift : shift;
    const result = caesarShift(text, effectiveShift, alphabet);
    const shiftInfo = mode === "decode"
        ? `Сдвиг ${shift} влево (расшифровка)`
        : `Сдвиг ${shift} вправо`;
    return [
        { value: result, label: "Результат", unit: "" },
        { value: shiftInfo, label: "Использованный сдвиг", unit: "" },
    ];
},
  'tsvetovaya-temperatura': (inputs) => {
    const kelvin = Math.max(1000, Math.min(10000, Number(inputs.kelvin) || 6500));
    let r: number, g: number, b: number;
    const temp = kelvin / 100;
    if (temp <= 66) {
        r = 255;
    }
    else {
        r = temp - 60;
        r = 329.698727446 * Math.pow(r, -0.1332047592);
        r = Math.max(0, Math.min(255, r));
    }
    if (temp <= 66) {
        g = temp;
        g = 99.4708025861 * Math.log(g) - 161.1195681661;
    }
    else {
        g = temp - 60;
        g = 288.1221695283 * Math.pow(g, -0.0755148492);
    }
    g = Math.max(0, Math.min(255, g));
    if (temp >= 66) {
        b = 255;
    }
    else {
        if (temp <= 19) {
            b = 0;
        }
        else {
            b = temp - 10;
            b = 138.5177312231 * Math.log(b) - 305.0447927307;
            b = Math.max(0, Math.min(255, b));
        }
    }
    let description = '';
    if (kelvin < 2000)
        description = 'Свеча, закат (очень тёплый)';
    else if (kelvin < 3000)
        description = 'Лампа накаливания, рассвет (тёплый)';
    else if (kelvin < 4000)
        description = 'Флуоресцентная лампа, утро (нейтрально-тёплый)';
    else if (kelvin < 5000)
        description = 'Солнечный свет в полдень (нейтральный)';
    else if (kelvin < 6500)
        description = 'Дневной свет (нейтрально-холодный)';
    else if (kelvin < 8000)
        description = 'Пасмурное небо, тень (холодный)';
    else
        description = 'Синее небо, экран монитора (очень холодный)';
    return [
        { value: rgbToHex(r, g, b), label: 'HEX', unit: '' },
        { value: `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`, label: 'RGB', unit: '' },
        { value: description, label: 'Описание', unit: '' }
    ];
},
  'url-kodirovshchik': (inputs) => {
    const text = String(inputs.text || "");
    const mode = String(inputs.mode);
    if (!text) {
        return [
            { value: "", label: "Результат", unit: "" },
            { value: "0", label: "Исходная длина", unit: "симв" },
            { value: "0", label: "Длина результата", unit: "симв" },
        ];
    }
    try {
        let result: string;
        switch (mode) {
            case "encode":
                result = encodeURIComponent(text);
                break;
            case "decode":
                result = decodeURIComponent(text);
                break;
            case "encodeUri":
                result = encodeURI(text);
                break;
            case "fullUrl":
                try {
                    const url = new URL(text);
                    result = url.toString();
                }
                catch {
                    result = encodeURIComponent(text);
                }
                break;
            default:
                result = encodeURIComponent(text);
        }
        return [
            { value: result, label: "Результат", unit: "" },
            {
                value: text.length.toString(),
                label: "Исходная длина",
                unit: "симв",
            },
            {
                value: result.length.toString(),
                label: "Длина результата",
                unit: "симв",
            },
        ];
    }
    catch {
        return [
            { value: "Ошибка декодирования", label: "Результат", unit: "" },
            {
                value: text.length.toString(),
                label: "Исходная длина",
                unit: "симв",
            },
            { value: "0", label: "Длина результата", unit: "симв" },
        ];
    }
},
}
