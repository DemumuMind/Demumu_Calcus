import type { ComputeFn } from './compute-helpers';

export const computeMap_tech_it_a_1: Record<string, ComputeFn> = {
  'analiz-teksta': (inputs) => {
    const text = String(inputs.text || "").trim();
    if (!text) {
        return [
            { value: "0", label: "Всего слов", unit: "шт" },
            { value: "0", label: "Уникальных слов", unit: "шт" },
            { value: "0", label: "Индекс Флеша" },
            { value: "—", label: "Уровень читаемости", unit: "" },
            { value: "0", label: "Средняя длина слова", unit: "симв" },
            { value: "—", label: "Топ-5 слов", unit: "" },
        ];
    }
    const words = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
    const totalWords = words.length;
    if (totalWords === 0) {
        return [
            { value: "0", label: "Всего слов", unit: "шт" },
            { value: "0", label: "Уникальных слов", unit: "шт" },
            { value: "0", label: "Индекс Флеша" },
            { value: "—", label: "Уровень читаемости", unit: "" },
            { value: "0", label: "Средняя длина слова", unit: "симв" },
            { value: "—", label: "Топ-5 слов", unit: "" },
        ];
    }
    const uniqueWords = new Set(words).size;
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / totalWords;
    const frequency: Record<string, number> = {};
    words.forEach((w) => {
        frequency[w] = (frequency[w] || 0) + 1;
    });
    const topWords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word, count]) => `${word} (${count})`)
        .join(", ");
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1;
    const syllables = words.reduce((sum, w) => {
        const ruVowels = (w.match(/[аеёиоуыэюя]/gi) || []).length;
        const enVowels = (w.match(/[aeiouy]/gi) || []).length;
        return sum + Math.max(ruVowels + enVowels, 1);
    }, 0);
    const fleschScore = 206.835 - 1.3 * (totalWords / sentences) - 60 * (syllables / totalWords);
    const clampedScore = Math.max(0, Math.min(100, fleschScore));
    let readability: string;
    if (clampedScore >= 90)
        readability = "Очень легко (5 класс)";
    else if (clampedScore >= 80)
        readability = "Легко (6 класс)";
    else if (clampedScore >= 70)
        readability = "Довольно легко (7 класс)";
    else if (clampedScore >= 60)
        readability = "Средний (8-9 класс)";
    else if (clampedScore >= 50)
        readability = "Довольно сложно (10-12 класс)";
    else if (clampedScore >= 30)
        readability = "Сложно (ВУЗ)";
    else
        readability = "Очень сложно (профессионал)";
    return [
        { value: totalWords.toString(), label: "Всего слов", unit: "шт" },
        { value: uniqueWords.toString(), label: "Уникальных слов", unit: "шт" },
        { value: Math.round(clampedScore).toString(), label: "Индекс Флеша" },
        { value: readability, label: "Уровень читаемости", unit: "" },
        {
            value: avgWordLength.toFixed(1),
            label: "Средняя длина слова",
            unit: "симв",
        },
        { value: topWords, label: "Топ-5 слов", unit: "" },
    ];
},
  'azbuka-morze': (inputs) => {
    const direction = String(inputs.direction);
    const input = String(inputs.input || '');
    const speed = String(inputs.speed);
    const morseMap: Record<string, string> = {
        'А': '.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Д': '-..', 'Е': '.', 'Ё': '.',
        'Ж': '...-', 'З': '--..', 'И': '..', 'Й': '.---', 'К': '-.-', 'Л': '.-..',
        'М': '--', 'Н': '-.', 'О': '---', 'П': '.--.', 'Р': '.-.', 'С': '...',
        'Т': '-', 'У': '..-', 'Ф': '..-.', 'Х': '....', 'Ц': '-.-.', 'Ч': '---.',
        'Ш': '----', 'Щ': '--.-', 'Ъ': '--.--', 'Ы': '-.--', 'Ь': '-..-', 'Э': '..-..',
        'Ю': '..--', 'Я': '.-.-',
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..',
        '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
        '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', '/': '-..-.',
        '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.',
        '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
        '$': '...-..-', '@': '.--.-.'
    };
    const reverseMap: Record<string, string> = {};
    for (const [char, code] of Object.entries(morseMap)) {
        if (!reverseMap[code]) {
            reverseMap[code] = char.toLowerCase();
        }
    }
    let output = '';
    if (direction === 'textToMorse') {
        const chars = input.toUpperCase().split('');
        const morseChars = chars.map(char => morseMap[char] || char);
        output = morseChars.join(' ');
    }
    else {
        const codes = input.trim().split(/\s+/);
        const textChars = codes.map(code => reverseMap[code] || code);
        output = textChars.join('');
    }
    const wpm = speed === 'slow' ? 10 : speed === 'normal' ? 20 : speed === 'fast' ? 30 : 40;
    const symbolCount = direction === 'textToMorse' ? input.length : output.length;
    const durationSeconds = Math.ceil((symbolCount * 60) / wpm);
    return [
        {
            value: output,
            label: direction === 'textToMorse' ? 'Код Морзе' : 'Текст',
            unit: ''
        },
        {
            value: `${wpm} зн/мин`,
            label: 'Скорость',
            unit: ''
        },
        {
            value: `~${durationSeconds} сек`,
            label: 'Длительность',
            unit: ''
        }
    ];
},
  'generator-cvetovyh-palitr': (inputs) => {
    const mode = String(inputs.mode);
    let baseColor = String(inputs.baseColor).trim();
    const count = Math.min(Math.max(Number(inputs.count), 2), 10);
    const hexToHsl = (hex: string): [
        number,
        number,
        number
    ] => {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }
        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    };
    const hslToHex = (h: number, s: number, l: number): string => {
        h = h % 360;
        s = Math.max(0, Math.min(100, s));
        l = Math.max(0, Math.min(100, l));
        const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l / 100 - c / 2;
        let r = 0, g = 0, b = 0;
        if (h < 60) {
            r = c;
            g = x;
        }
        else if (h < 120) {
            r = x;
            g = c;
        }
        else if (h < 180) {
            g = c;
            b = x;
        }
        else if (h < 240) {
            g = x;
            b = c;
        }
        else if (h < 300) {
            r = x;
            b = c;
        }
        else {
            r = c;
            b = x;
        }
        const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
    const randomHex = (): string => {
        return '#' + Array.from({ length: 6 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    };
    let colors: string[] = [];
    if (!baseColor.match(/^#[0-9A-Fa-f]{6}$/)) {
        baseColor = randomHex();
    }
    const [h, s, l] = hexToHsl(baseColor);
    switch (mode) {
        case 'random':
            colors = Array.from({ length: count }, randomHex);
            break;
        case 'complementary':
            colors = [baseColor, hslToHex((h + 180) % 360, s, l)];
            colors.push(hslToHex(h, Math.max(20, s - 20), Math.min(90, l + 20)));
            colors.push(hslToHex((h + 180) % 360, Math.max(20, s - 20), Math.min(90, l + 20)));
            break;
        case 'triadic':
            colors = [
                baseColor,
                hslToHex((h + 120) % 360, s, l),
                hslToHex((h + 240) % 360, s, l)
            ];
            break;
        case 'analogous':
            for (let i = 0; i < count; i++) {
                colors.push(hslToHex((h + (i - Math.floor(count / 2)) * 30) % 360, s, l));
            }
            break;
        case 'monochromatic':
            for (let i = 0; i < count; i++) {
                const newL = Math.max(10, Math.min(90, l + (i - Math.floor(count / 2)) * 15));
                colors.push(hslToHex(h, s, newL));
            }
            break;
        case 'split':
            colors = [
                baseColor,
                hslToHex((h + 150) % 360, s, l),
                hslToHex((h + 210) % 360, s, l)
            ];
            break;
        case 'tetradic':
            colors = [
                baseColor,
                hslToHex((h + 90) % 360, s, l),
                hslToHex((h + 180) % 360, s, l),
                hslToHex((h + 270) % 360, s, l)
            ];
            break;
        default:
            colors = [baseColor];
    }
    colors = colors.slice(0, count);
    const paletteStr = colors.map((c, i) => `${i + 1}. ${c.toUpperCase()}`).join('\n');
    const cssStr = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
    return [
        { value: paletteStr, label: 'Цвета (HEX)', unit: '' },
        { value: cssStr, label: 'CSS переменные', unit: '' }
    ];
},
  'generator-fejkovyh-dannyh': (inputs) => {
    const type = String(inputs.type);
    const gender = String(inputs.gender);
    const count = Math.min(Math.max(Number(inputs.count), 1), 10);
    const maleFirstNames = ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артём', 'Илья', 'Кирилл', 'Михаил', 'Никита', 'Матвей', 'Роман', 'Егор', 'Арсений', 'Иван', 'Денис', 'Евгений', 'Даниил', 'Тимофей'];
    const femaleFirstNames = ['Анастасия', 'Мария', 'Дарья', 'Анна', 'Елизавета', 'Полина', 'Виктория', 'Алиса', 'Варвара', 'Александра', 'Ксения', 'Екатерина', 'Вера', 'Надежда', 'Галина', 'Ольга', 'Татьяна', 'Ирина', 'Елена', 'Юлия'];
    const lastNames = ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Фёдоров', 'Морозов', 'Волков', 'Алексеев', 'Лебедев', 'Семёнов', 'Егоров', 'Павлов', 'Козлов', 'Степанов', 'Николаев', 'Орлов', 'Андреев', 'Макаров', 'Захаров', 'Зайцев', 'Соловьёв', 'Борисов', 'Яковлев', 'Григорьев', 'Романов'];
    const malePatronymics = ['Александрович', 'Дмитриевич', 'Максимович', 'Сергеевич', 'Андреевич', 'Алексеевич', 'Артёмович', 'Ильич', 'Кириллович', 'Михайлович', 'Никитич', 'Владимирович', 'Иванович', 'Петрович', 'Семёнович', 'Викторович', 'Олегович'];
    const femalePatronymics = ['Александровна', 'Дмитриевна', 'Максимовна', 'Сергеевна', 'Андреевна', 'Алексеевна', 'Артёмовна', 'Ильинична', 'Кирилловна', 'Михайловна', 'Никитична', 'Владимировна', 'Ивановна', 'Петровна', 'Семёновна', 'Викторовна', 'Олеговна'];
    const cities = [
        { name: 'Москва', region: 'г. Москва', zip: '101000' },
        { name: 'Санкт-Петербург', region: 'г. Санкт-Петербург', zip: '190000' },
        { name: 'Новосибирск', region: 'Новосибирская обл.', zip: '630000' },
        { name: 'Екатеринбург', region: 'Свердловская обл.', zip: '620000' },
        { name: 'Казань', region: 'Респ. Татарстан', zip: '420000' },
        { name: 'Нижний Новгород', region: 'Нижегородская обл.', zip: '603000' },
        { name: 'Челябинск', region: 'Челябинская обл.', zip: '454000' },
        { name: 'Самара', region: 'Самарская обл.', zip: '443000' },
        { name: 'Омск', region: 'Омская обл.', zip: '644000' },
        { name: 'Ростов-на-Дону', region: 'Ростовская обл.', zip: '344000' },
        { name: 'Уфа', region: 'Респ. Башкортостан', zip: '450000' },
        { name: 'Красноярск', region: 'Красноярский край', zip: '660000' },
        { name: 'Воронеж', region: 'Воронежская обл.', zip: '394000' },
        { name: 'Пермь', region: 'Пермский край', zip: '614000' },
        { name: 'Волгоград', region: 'Волгоградская обл.', zip: '400000' }
    ];
    const streets = ['Ленина', 'Гагарина', 'Мира', 'Центральная', 'Советская', 'Кирова', 'Победы', 'Октябрьская', 'Пролетарская', 'Коммунистическая', 'Красная', 'Новая', 'Парковая', 'Школьная', 'Зелёная', 'Лесная', 'Садовая', 'Набережная', 'Пушкина', 'Горького'];
    const companyPrefixes = ['ООО', 'АО', 'ПАО', 'ЗАО', 'ИП'];
    const companyNames = ['ТехноПром', 'ИнвестСтрой', 'ГлобалСервис', 'РосТорг', 'МегаФинанс', 'АльфаГрупп', 'БизнесРешения', 'ЭкоПродукт', 'МедиаСофт', 'ЮнионТрейд', 'ВекторПлюс', 'ДомСтрой', 'АвтоМир', 'ТехноСнаб', 'ПрогрессОйл', 'АгроКомплект', 'ТранзитЛогистик', 'ЭнергоСбыт', 'ИнфоТех', 'РитейлСолюшнс'];
    const companyActivities = ['', 'Строительство', 'Торговля', 'ИТ-услуги', 'Производство', 'Логистика', 'Консалтинг', 'Финансы', 'Недвижимость', 'Образование'];
    const emailDomains = ['mail.ru', 'yandex.ru', 'gmail.com', 'bk.ru', 'list.ru', 'inbox.ru', 'rambler.ru', 'ya.ru', 'icloud.com', 'outlook.com'];
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
        let result = '';
        switch (type) {
            case 'person': {
                const isMale = gender === 'any' ? Math.random() > 0.5 : gender === 'male';
                const firstName = isMale ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)] : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
                const lastName = lastNames[Math.floor(Math.random() * lastNames.length)] + (isMale ? '' : 'а');
                const patronymic = isMale ? malePatronymics[Math.floor(Math.random() * malePatronymics.length)] : femalePatronymics[Math.floor(Math.random() * femalePatronymics.length)];
                const phone = `+7 (${Math.floor(Math.random() * 900 + 100)}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 90 + 10)}`;
                const email = `${firstName.toLowerCase()}.${lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase()}${Math.floor(Math.random() * 999)}@${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`;
                result = `${lastName} ${firstName} ${patronymic}\nТелефон: ${phone}\nEmail: ${email}`;
                break;
            }
            case 'address': {
                const city = cities[Math.floor(Math.random() * cities.length)];
                const street = streets[Math.floor(Math.random() * streets.length)];
                const house = Math.floor(Math.random() * 150 + 1);
                const apt = Math.floor(Math.random() * 200 + 1);
                result = `${city.zip}, ${city.region}\nг. ${city.name}, ул. ${street}, д. ${house}, кв. ${apt}`;
                break;
            }
            case 'company': {
                const prefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)];
                const name = companyNames[Math.floor(Math.random() * companyNames.length)];
                const activity = companyActivities[Math.floor(Math.random() * companyActivities.length)];
                let inn = '';
                if (prefix === 'ИП') {
                    inn = Math.floor(Math.random() * 900000000000 + 100000000000).toString();
                }
                else {
                    inn = Math.floor(Math.random() * 9000000000 + 1000000000).toString();
                }
                result = `${prefix} «${name}»${activity ? ` — ${activity}` : ''}\nИНН: ${inn}`;
                break;
            }
            case 'phone': {
                const code = Math.floor(Math.random() * 900 + 100);
                const firstNum = Math.floor(Math.random() * 900 + 100);
                const secondNum = Math.floor(Math.random() * 90 + 10);
                const thirdNum = Math.floor(Math.random() * 90 + 10);
                result = `+7 (${code}) ${firstNum}-${secondNum}-${thirdNum}`;
                break;
            }
            case 'email': {
                const name = maleFirstNames.concat(femaleFirstNames)[Math.floor(Math.random() * (maleFirstNames.length + femaleFirstNames.length))].toLowerCase();
                const surname = lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase();
                const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
                const variant = Math.floor(Math.random() * 4);
                if (variant === 0)
                    result = `${name}.${surname}@${domain}`;
                else if (variant === 1)
                    result = `${surname}_${Math.floor(Math.random() * 999)}@${domain}`;
                else if (variant === 2)
                    result = `${name}${Math.floor(Math.random() * 9999)}@${domain}`;
                else
                    result = `${surname}.${name[0]}@${domain}`;
                break;
            }
            case 'inn': {
                const isIP = Math.random() > 0.5;
                if (isIP) {
                    result = `ИНН ИП: ${Math.floor(Math.random() * 900000000000 + 100000000000)} (12 цифр)`;
                }
                else {
                    result = `ИНН Организации: ${Math.floor(Math.random() * 9000000000 + 1000000000)} (10 цифр)`;
                }
                break;
            }
            default:
                result = 'Выберите тип данных';
        }
        results.push(`${i + 1}. ${result}`);
    }
    return [
        { value: results.join('\n\n'), label: 'Фейковые данные (демо)', unit: '' }
    ];
},
}
