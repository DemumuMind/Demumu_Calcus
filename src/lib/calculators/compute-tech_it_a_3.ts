import type { ComputeFn } from './compute-helpers';
import { hexToRgb, toCamelCase, toKebabCase, toSentenceCase, toSnakeCase, toTitleCase } from './compute-helpers';

export const computeMap_tech_it_a_3: Record<string, ComputeFn> = {
  'generator-shtrih-kodov': (inputs) => {
    const type = String(inputs.type);
    let data = String(inputs.data).trim();
    const action = String(inputs.action);
    const calculateEANCheckDigit = (code: string): number => {
        let sum = 0;
        for (let i = 0; i < code.length; i++) {
            const digit = parseInt(code[i]);
            sum += (i % 2 === 0) ? digit : digit * 3;
        }
        return (10 - (sum % 10)) % 10;
    };
    const calculateISBN10CheckDigit = (code: string): string => {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(code[i]) * (10 - i);
        }
        const check = 11 - (sum % 11);
        return check === 11 ? '0' : check === 10 ? 'X' : check.toString();
    };
    let result = '';
    let info = '';
    try {
        switch (type) {
            case 'ean13':
                if (data.length === 13) {
                    if (action === 'validate') {
                        const providedCheck = parseInt(data[12]);
                        const calculated = calculateEANCheckDigit(data.slice(0, 12));
                        result = providedCheck === calculated ? '✓ Контрольная цифра верна' : '✗ Контрольная цифра неверна';
                        info = `Предоставлена: ${providedCheck}, Вычислена: ${calculated}`;
                    }
                    else {
                        data = data.slice(0, 12);
                        const checkDigit = calculateEANCheckDigit(data);
                        result = data + checkDigit;
                        info = `Контрольная цифра: ${checkDigit}. Страна: ${data.startsWith('460') ? 'Россия (460-469)' : 'Уточните по префиксу'}`;
                    }
                }
                else {
                    result = action === 'generate' ? data + calculateEANCheckDigit(data.padEnd(12, '0')) : 'Длина EAN-13 должна быть 13 цифр';
                }
                break;
            case 'ean8':
                if (action === 'generate') {
                    data = data.slice(0, 7).padEnd(7, '0');
                    const checkDigit = calculateEANCheckDigit(data);
                    result = data + checkDigit;
                    info = `Контрольная цифра: ${checkDigit}`;
                }
                else {
                    result = 'EAN-8: введите 7 цифр для генерации';
                }
                break;
            case 'upca':
                if (action === 'generate') {
                    data = data.slice(0, 11).padEnd(11, '0');
                    const checkDigit = calculateEANCheckDigit(data);
                    result = data + checkDigit;
                    info = `UPC-A: ${data}-${checkDigit}`;
                }
                else {
                    result = 'UPC-A: введите 11 цифр для генерации';
                }
                break;
            case 'isbn10':
                if (action === 'generate') {
                    data = data.slice(0, 9).padEnd(9, '0');
                    const checkDigit = calculateISBN10CheckDigit(data);
                    result = data + checkDigit;
                    info = `ISBN-10: ${data.slice(0, 1)}-${data.slice(1, 4)}-${data.slice(4, 9)}-${checkDigit}`;
                }
                else {
                    result = 'ISBN-10: введите 9 цифр для генерации';
                }
                break;
            case 'isbn13':
                if (action === 'generate') {
                    data = data.slice(0, 12).padEnd(12, '0');
                    const checkDigit = calculateEANCheckDigit(data);
                    result = data + checkDigit;
                    info = `ISBN-13: ${data.slice(0, 3)}-${data.slice(3, 4)}-${data.slice(4, 7)}-${data.slice(7, 12)}-${checkDigit}`;
                }
                else {
                    result = 'ISBN-13: введите 12 цифр для генерации';
                }
                break;
            case 'code128':
                result = `Code128: ${data} (поддерживает ASCII 0-127)`;
                info = 'Code128 — универсальный штрих-код для логистики и маркировки';
                break;
            case 'code39':
                result = `Code39: ${data.toUpperCase().replace(/[^0-9A-Z\-.\s$/+%]/g, '')}`;
                info = 'Code39 — промышленный штрих-код. Поддерживает: 0-9, A-Z, - . $ / + %';
                break;
            default:
                result = 'Выберите тип штрих-кода';
        }
    }
    catch {
        result = 'Ошибка в данных';
    }
    return [
        { value: result, label: 'Штрих-код', unit: '' },
        { value: info, label: 'Информация', unit: '' }
    ];
},
  'generator-sluchajnyh-chisel': (inputs) => {
    const min = Number(inputs.min);
    const max = Number(inputs.max);
    const count = Math.min(Number(inputs.count), 10);
    if (isNaN(min) || isNaN(max) || min >= max) {
        return [{ value: 'Неверный диапазон', label: 'Ошибка' }];
    }
    const numbers: number[] = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return [
        { value: numbers.join(', '), label: 'Случайные числа', unit: '' }
    ];
},
  'generator-uuid-guid': (inputs) => {
    const version = String(inputs.version);
    const count = Math.min(Math.max(Number(inputs.count), 1), 10);
    const format = String(inputs.format);
    const uuids: string[] = [];
    for (let i = 0; i < count; i++) {
        let uuid = '';
        if (version === 'v4') {
            const hex = '0123456789abcdef';
            for (let j = 0; j < 36; j++) {
                if (j === 8 || j === 13 || j === 18 || j === 23) {
                    uuid += '-';
                }
                else if (j === 14) {
                    uuid += '4'; // Version 4
                }
                else if (j === 19) {
                    uuid += hex[(Math.random() * 4) | 8]; // Variant
                }
                else {
                    uuid += hex[Math.floor(Math.random() * 16)];
                }
            }
        }
        else if (version === 'v1') {
            const timestamp = Date.now();
            const timeHex = timestamp.toString(16).padStart(12, '0');
            const node = Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
            uuid = `${timeHex.slice(0, 8)}-${timeHex.slice(8)}-1${Math.floor(Math.random() * 4 + 8).toString(16)}${Math.floor(Math.random() * 16).toString(16)}-${Math.floor(Math.random() * 16).toString(16)}${Math.floor(Math.random() * 16).toString(16)}-${node.slice(0, 12)}`;
        }
        else if (version === 'v5') {
            // UUID v5 — deterministic based on namespace + name
            const namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'; // DNS namespace
            const name = `calcus-${Date.now()}-${i}`;
            const hashInput = namespace + name;
            let hash = 0;
            for (let j = 0; j < hashInput.length; j++) {
                hash = ((hash << 5) - hash + hashInput.charCodeAt(j)) | 0;
            }
            const hashHex = Math.abs(hash).toString(16).padStart(32, '0');
            uuid = `${hashHex.slice(0, 8)}-${hashHex.slice(8, 12)}-5${hashHex.slice(13, 16)}-${(parseInt(hashHex.slice(16, 17), 16) & 3 | 8).toString(16)}${hashHex.slice(17, 20)}-${hashHex.slice(20, 32)}`;
        }
        let formatted = uuid;
        if (format === 'compact') {
            formatted = uuid.replace(/-/g, '');
        }
        else if (format === 'braces') {
            formatted = `{${uuid}}`;
        }
        uuids.push(formatted);
    }
    return [
        { value: uuids.join('\n'), label: `UUID ${version.toUpperCase()}`, unit: '' }
    ];
},
  'kalkulyator-dpi': (inputs) => {
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    const diagonal = Number(inputs.diagonal);
    if (!width || !height || !diagonal) {
        return [{ value: '—', label: 'Результат' }];
    }
    const totalPixels = (width * height) / 1000000; // in megapixels
    const aspectRatio = width / height;
    const diagonalPixels = Math.sqrt(width * width + height * height);
    const dpi = diagonalPixels / diagonal;
    const aspectLabel = aspectRatio > 1.7 ? '16:9' : aspectRatio > 1.5 ? '16:10' : aspectRatio > 1.3 ? '4:3' : 'другой';
    return [
        { value: `${width}×${height} (${aspectLabel})`, label: 'Разрешение', unit: '' },
        { value: Math.round(dpi).toString(), label: 'Плотность пикселей', unit: 'DPI' },
        { value: totalPixels.toFixed(1), label: 'Всего пикселей', unit: 'Мп' }
    ];
},
  'kontrastnost-cveta': (inputs) => {
    const bgR = Number(inputs.bgR);
    const bgG = Number(inputs.bgG);
    const bgB = Number(inputs.bgB);
    const textR = Number(inputs.textR);
    const textG = Number(inputs.textG);
    const textB = Number(inputs.textB);
    const getLuminance = (r: number, g: number, b: number) => {
        const toLinear = (c: number) => {
            const s = c / 255;
            return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };
    const bgLum = getLuminance(bgR, bgG, bgB);
    const textLum = getLuminance(textR, textG, textB);
    const contrastRatio = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);
    const aaNormal = contrastRatio >= 4.5 ? '✓ Пройден' : '✗ Не пройден (нужно 4.5:1)';
    const aaaNormal = contrastRatio >= 7 ? '✓ Пройден' : '✗ Не пройден (нужно 7:1)';
    return [
        { value: contrastRatio.toFixed(2), label: 'Контраст', unit: ':1' },
        { value: aaNormal, label: 'WCAG AA', unit: '' },
        { value: aaaNormal, label: 'WCAG AAA', unit: '' }
    ];
},
  'konverter-cvetov': (inputs) => {
    const r = Math.round(Number(inputs.r));
    const g = Math.round(Number(inputs.g));
    const b = Math.round(Number(inputs.b));
    if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        return [{ value: 'Неверное значение RGB', label: 'Ошибка' }];
    }
    const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
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
    const hDeg = Math.round(h * 360);
    const sPct = Math.round(s * 100);
    const lPct = Math.round(l * 100);
    return [
        { value: hex, label: 'HEX', unit: '' },
        { value: `hsl(${hDeg}, ${sPct}%, ${lPct}%)`, label: 'HSL', unit: '' },
        { value: `rgb(${r}, ${g}, ${b})`, label: 'CSS RGB', unit: '' }
    ];
},
  'konverter-prozrachnosti': (inputs) => {
    const baseColor = String(inputs.baseColor || '#FF0000');
    const opacity = Math.max(0, Math.min(100, Number(inputs.opacity) || 50));
    const rgb = hexToRgb(baseColor);
    if (!rgb) {
        return [
            { value: 'Ошибка', label: 'HEX Alpha', unit: '' },
            { value: 'Ошибка', label: 'RGBA', unit: '' },
            { value: '—', label: 'Альфа', unit: '' }
        ];
    }
    const alphaDecimal = opacity / 100;
    const alphaHex = Math.round(alphaDecimal * 255).toString(16).padStart(2, '0').toUpperCase();
    const hexAlpha = `${baseColor}${alphaHex}`;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alphaDecimal.toFixed(2)})`;
    return [
        { value: hexAlpha, label: 'HEX с альфа', unit: '' },
        { value: rgba, label: 'RGBA', unit: '' },
        { value: alphaHex, label: 'Альфа канал', unit: '' }
    ];
},
  'konverter-registra': (inputs) => {
    const text = String(inputs.text || "");
    const targetCase = String(inputs.targetCase);
    if (!text) {
        return [
            { value: "", label: "Результат", unit: "" },
            { value: "0", label: "Исходная длина", unit: "симв" },
            { value: "0", label: "Длина результата", unit: "симв" },
        ];
    }
    let result: string;
    switch (targetCase) {
        case "upper":
            result = text.toUpperCase();
            break;
        case "lower":
            result = text.toLowerCase();
            break;
        case "title":
            result = toTitleCase(text);
            break;
        case "sentence":
            result = toSentenceCase(text);
            break;
        case "camel":
            result = toCamelCase(text);
            break;
        case "snake":
            result = toSnakeCase(text);
            break;
        case "kebab":
            result = toKebabCase(text);
            break;
        case "alternating":
            result = text
                .split("")
                .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
                .join("");
            break;
        default:
            result = text;
    }
    return [
        { value: result, label: "Результат", unit: "" },
        { value: text.length.toString(), label: "Исходная длина", unit: "симв" },
        {
            value: result.length.toString(),
            label: "Длина результата",
            unit: "симв",
        },
    ];
},
}
