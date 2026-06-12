import type { ComputeFn } from './compute-helpers';
import { hexToRgb, hslToRgb, pronounceableSyllables, rgbToHex, rgbToHsl } from './compute-helpers';

export const computeMap_tech_it_a_2: Record<string, ComputeFn> = {
  'generator-gradientov': (inputs) => {
    const type = String(inputs.type || 'linear');
    const color1 = String(inputs.color1 || '#FF6B6B');
    const color2 = String(inputs.color2 || '#4ECDC4');
    const color3 = String(inputs.color3 || '');
    const angle = Number(inputs.angle) || 135;
    let cssCode = '';
    const typeNames: Record<string, string> = {
        linear: 'Линейный градиент',
        radial: 'Радиальный градиент',
        conic: 'Конический градиент'
    };
    if (type === 'linear') {
        if (color3 && color3.startsWith('#')) {
            cssCode = `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
        }
        else {
            cssCode = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        }
    }
    else if (type === 'radial') {
        if (color3 && color3.startsWith('#')) {
            cssCode = `radial-gradient(circle, ${color1}, ${color2}, ${color3})`;
        }
        else {
            cssCode = `radial-gradient(circle, ${color1}, ${color2})`;
        }
    }
    else if (type === 'conic') {
        if (color3 && color3.startsWith('#')) {
            cssCode = `conic-gradient(from ${angle}deg, ${color1}, ${color2}, ${color3})`;
        }
        else {
            cssCode = `conic-gradient(from ${angle}deg, ${color1}, ${color2})`;
        }
    }
    return [
        { value: cssCode, label: 'CSS', unit: '' },
        { value: typeNames[type], label: 'Тип градиента', unit: '' }
    ];
},
  'generator-palitry': (inputs) => {
    const mode = String(inputs.mode);
    const baseColor = String(inputs.baseColor || '#FF6B6B');
    const count = Math.min(Math.max(Number(inputs.count) || 5, 3), 8);
    let palette: string[] = [];
    if (mode === 'random') {
        for (let i = 0; i < count; i++) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            palette.push(rgbToHex(r, g, b));
        }
    }
    else if (mode === 'base') {
        const rgb = hexToRgb(baseColor);
        if (rgb) {
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            // Комплементарные, триадические, аналоговые цвета
            const hueShifts = [0, 30, 60, 180, 210, 330];
            for (let i = 0; i < count; i++) {
                const newHue = (hsl.h + hueShifts[i % hueShifts.length]) % 360;
                const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
        }
    }
    else if (mode === 'warm') {
        const warmHues = [0, 15, 30, 45, 60, 15, 30, 45];
        for (let i = 0; i < count; i++) {
            const h = warmHues[i % warmHues.length] + (Math.random() * 20 - 10);
            const s = 70 + Math.random() * 30;
            const l = 50 + Math.random() * 20;
            const rgb = hslToRgb(h, s, l);
            palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
        }
    }
    else if (mode === 'cool') {
        const coolHues = [180, 210, 240, 270, 300, 210, 240, 270];
        for (let i = 0; i < count; i++) {
            const h = coolHues[i % coolHues.length] + (Math.random() * 20 - 10);
            const s = 70 + Math.random() * 30;
            const l = 50 + Math.random() * 20;
            const rgb = hslToRgb(h, s, l);
            palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
        }
    }
    else if (mode === 'pastel') {
        const pastelHues = [0, 45, 90, 180, 270, 315, 30, 150];
        for (let i = 0; i < count; i++) {
            const h = pastelHues[i % pastelHues.length];
            const s = 30 + Math.random() * 30;
            const l = 80 + Math.random() * 15;
            const rgb = hslToRgb(h, s, l);
            palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
        }
    }
    const paletteStr = palette.join(', ');
    return [
        { value: paletteStr, label: 'Палитра (HEX)', unit: '' }
    ];
},
  'generator-parolej': (inputs) => {
    const length = Number(inputs.length);
    const useUppercase = String(inputs.uppercase) === 'yes';
    const useNumbers = String(inputs.numbers) === 'yes';
    const useSymbols = String(inputs.symbols) === 'yes';
    if (length < 4 || length > 64) {
        return [{ value: 'Неверная длина', label: 'Ошибка' }];
    }
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase)
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers)
        charset += '0123456789';
    if (useSymbols)
        charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    let strength = 'Слабый';
    if (length >= 12 && useUppercase && useNumbers && useSymbols) {
        strength = 'Очень сильный';
    }
    else if (length >= 10 && useUppercase && useNumbers && useSymbols) {
        strength = 'Сильный';
    }
    else if (length >= 8 && (useUppercase || useNumbers)) {
        strength = 'Средний';
    }
    return [
        { value: password, label: 'Пароль', unit: '' },
        { value: strength, label: 'Надёжность', unit: '' }
    ];
},
  'generator-parolej-pro': (inputs) => {
    const length = Math.min(Math.max(Number(inputs.length) || 16, 8), 128);
    const useUppercase = String(inputs.uppercase) === "yes";
    const useLowercase = String(inputs.lowercase) === "yes";
    const useDigits = String(inputs.digits) === "yes";
    const useSymbols = String(inputs.symbols) === "yes";
    const mode = String(inputs.mode);
    let password: string;
    let charsetSize = 0;
    if (mode === "pronounceable") {
        const syllableCount = Math.ceil(length / 3);
        const syllables: string[] = [];
        for (let i = 0; i < syllableCount; i++) {
            const syl = pronounceableSyllables[Math.floor(Math.random() * pronounceableSyllables.length)];
            syllables.push(Math.random() > 0.5
                ? syl
                : syl.charAt(0).toUpperCase() + syl.slice(1));
        }
        password = syllables.join("");
        if (useDigits) {
            password += Math.floor(Math.random() * 100);
        }
        if (useSymbols) {
            password += "!@#$%^&*"[Math.floor(Math.random() * 8)];
        }
        password = password.slice(0, length);
        charsetSize = 26 + 26 + 10; // Rough estimate for pronounceable
    }
    else if (mode === "passphrase") {
        const words = [
            "correct",
            "horse",
            "battery",
            "staple",
            "purple",
            "monkey",
            "dishwasher",
            "galaxy",
            "sandwich",
            "elephant",
            "keyboard",
            "diamond",
            "rainbow",
            "volcano",
            "chocolate",
            "umbrella",
            "penguin",
            "bicycle",
            "mountain",
            "sunshine",
        ];
        const wordCount = Math.max(3, Math.ceil(length / 6));
        const selected: string[] = [];
        for (let i = 0; i < wordCount; i++) {
            const word = words[Math.floor(Math.random() * words.length)];
            selected.push(Math.random() > 0.5
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1));
        }
        password = selected.join(useSymbols ? (Math.random() > 0.5 ? "-" : "_") : "");
        if (useDigits) {
            password += Math.floor(Math.random() * 1000);
        }
        password = password.slice(0, Math.min(length, password.length));
        charsetSize = Math.pow(20, wordCount); // Very rough estimate
    }
    else {
        let charset = "";
        if (useLowercase) {
            charset += "abcdefghijklmnopqrstuvwxyz";
            charsetSize += 26;
        }
        if (useUppercase) {
            charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            charsetSize += 26;
        }
        if (useDigits) {
            charset += "0123456789";
            charsetSize += 10;
        }
        if (useSymbols) {
            charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
            charsetSize += 25;
        }
        if (charset === "") {
            return [
                { value: "Выберите хотя бы один набор символов", label: "Ошибка" },
            ];
        }
        password = "";
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
    }
    const entropy = charsetSize > 0 ? Math.log2(Math.pow(charsetSize, password.length)) : 50;
    const clampedEntropy = Math.max(0, entropy);
    let strength: string;
    if (clampedEntropy < 28)
        strength = "Очень слабый";
    else if (clampedEntropy < 36)
        strength = "Слабый";
    else if (clampedEntropy < 60)
        strength = "Средний";
    else if (clampedEntropy < 80)
        strength = "Сильный";
    else
        strength = "Очень сильный";
    const guessesPerSecond = 10000000000; // 10 billion guesses/sec
    const secondsToCrack = Math.pow(2, clampedEntropy) / guessesPerSecond;
    let timeToCrack: string;
    if (secondsToCrack < 1)
        timeToCrack = "Мгновенно";
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
        timeToCrack = "Миллиарды лет";
    return [
        { value: password, label: "Пароль", unit: "" },
        { value: strength, label: "Сила пароля", unit: "" },
        {
            value: Math.round(clampedEntropy).toString(),
            label: "Энтропия",
            unit: "бит",
        },
        { value: timeToCrack, label: "Время взлома", unit: "" },
    ];
},
  'generator-qr-kodov': (inputs) => {
    const type = String(inputs.type);
    const field1 = String(inputs.field1).trim();
    const field2 = String(inputs.field2).trim();
    const field3 = String(inputs.field3).trim();
    let qrdata = '';
    let structure = '';
    switch (type) {
        case 'text':
            qrdata = field1 || 'Пример текста для QR-кода';
            structure = 'Простой текст (Plain Text)';
            break;
        case 'url':
            qrdata = field1.startsWith('http') ? field1 : `https://${field1 || 'example.com'}`;
            structure = 'URL схема: [протокол]://[домен]';
            break;
        case 'wifi':
            // WiFi format: WIFI:T:WPA;S:ssid;P:password;H:hidden;
            const ssid = field1 || 'MyWiFi';
            const password = field2 || 'password123';
            const security = field3 || 'WPA';
            qrdata = `WIFI:T:${security};S:${ssid};P:${password};`;
            structure = 'WiFi: T=тип шифрования, S=SSID, P=пароль';
            break;
        case 'email':
            // mailto:email@example.com?subject=Subject&body=Body
            const email = field1 || 'user@example.com';
            const subject = encodeURIComponent(field2 || 'Тема письма');
            const body = encodeURIComponent(field3 || 'Текст письма');
            qrdata = `mailto:${email}?subject=${subject}&body=${body}`;
            structure = 'Email: mailto:[адрес]?subject=[тема]&body=[текст]';
            break;
        case 'vcard':
            const fullName = field1 || 'Иванов Иван';
            const phone = field2 || '+7 (999) 123-45-67';
            const email2 = field3 || 'ivan@example.com';
            qrdata = `BEGIN:VCARD\nVERSION:3.0\nFN:${fullName}\nTEL:${phone}\nEMAIL:${email2}\nEND:VCARD`;
            structure = 'vCard 3.0: FN=полное имя, TEL=телефон, EMAIL=почта';
            break;
        case 'phone':
            const phoneNum = field1.replace(/[^0-9+]/g, '') || '+79991234567';
            qrdata = `tel:${phoneNum}`;
            structure = 'Телефон: tel:[номер]';
            break;
        case 'sms':
            const smsNum = field1.replace(/[^0-9+]/g, '') || '+79991234567';
            const smsText = encodeURIComponent(field2 || 'Привет!');
            qrdata = `sms:${smsNum}?body=${smsText}`;
            structure = 'SMS: sms:[номер]?body=[текст]';
            break;
        default:
            qrdata = field1 || 'Пример';
            structure = 'Произвольные данные';
    }
    return [
        { value: qrdata, label: 'QR-данные для кодирования', unit: '' },
        { value: structure, label: 'Формат структуры', unit: '' }
    ];
},
}
