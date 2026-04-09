import { Calculator } from "../types";

// ==================== 1. СЧЁТЧИК СИМВОЛОВ ====================

export const characterCounter: Calculator = {
	id: "character-counter",
	slug: "schyotchik-simvolov",
	title: "Счётчик символов",
	description: "Подсчёт символов с пробелами и без, строк, абзацев и байтов",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "text",
			label: "Текст",
			type: "text",
			placeholder: "Введите или вставьте текст...",
			defaultValue: "",
		},
	],
	outputs: [
		{
			name: "withSpaces",
			label: "Символов с пробелами",
			type: "number",
			unit: "шт",
		},
		{
			name: "withoutSpaces",
			label: "Символов без пробелов",
			type: "number",
			unit: "шт",
		},
		{ name: "words", label: "Слов", type: "number", unit: "шт" },
		{ name: "lines", label: "Строк", type: "number", unit: "шт" },
		{ name: "paragraphs", label: "Абзацев", type: "number", unit: "шт" },
		{ name: "bytes", label: "Байт", type: "number", unit: "байт" },
	],
	calculate: (inputs) => {
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
	content: {
		howTo:
			"Введите или вставьте текст в поле. Калькулятор автоматически подсчитает все показатели.",
		about:
			"Инструмент для детального анализа текста: подсчёт символов с пробелами и без, количество слов, строк, абзацев и размер в байтах.",
		usage:
			"Используется для написания статей с лимитом символов, SEO-оптимизации, подготовки публикаций, программирования.",
		formula:
			"Символы с пробелами = общая длина текста\nСимволы без пробелов = длина без \s\nСлова = последовательности непробельных символов\nБайты = размер в UTF-8",
		faq: [
			{
				question: "Как считаются байты?",
				answer:
					"Используется кодировка UTF-8. Латинские буквы и цифры — 1 байт, кириллица — 2 байта.",
			},
			{
				question: "Что считается абзацем?",
				answer:
					"Абзац — это блок текста, отделённый от других пустой строкой (двойным переносом строки).",
			},
		],
		sources: [
			{
				title: "UTF-8 — Википедия",
				url: "https://ru.wikipedia.org/wiki/UTF-8",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 2. АНАЛИЗ ТЕКСТА ====================

export const textAnalyzer: Calculator = {
	id: "text-analyzer",
	slug: "analiz-teksta",
	title: "Анализ текста",
	description:
		"Частотность слов, читаемость по Флешу, количество уникальных слов",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "text",
			label: "Текст для анализа",
			type: "text",
			placeholder: "Введите текст на русском или английском...",
			defaultValue: "",
		},
	],
	outputs: [
		{ name: "totalWords", label: "Всего слов", type: "number", unit: "шт" },
		{
			name: "uniqueWords",
			label: "Уникальных слов",
			type: "number",
			unit: "шт",
		},
		{ name: "fleschScore", label: "Индекс Флеша", type: "number" },
		{ name: "readability", label: "Уровень читаемости", type: "text" },
		{
			name: "avgWordLength",
			label: "Средняя длина слова",
			type: "number",
			unit: "симв",
		},
		{ name: "topWords", label: "Топ-5 слов", type: "text" },
	],
	calculate: (inputs) => {
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

		// Clean and split words
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

		// Unique words
		const uniqueWords = new Set(words).size;

		// Average word length
		const avgWordLength =
			words.reduce((sum, w) => sum + w.length, 0) / totalWords;

		// Word frequency
		const frequency: Record<string, number> = {};
		words.forEach((w) => {
			frequency[w] = (frequency[w] || 0) + 1;
		});
		const topWords = Object.entries(frequency)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5)
			.map(([word, count]) => `${word} (${count})`)
			.join(", ");

		// Flesch Reading Ease (adapted for Russian)
		const sentences =
			text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1;
		const syllables = words.reduce((sum, w) => {
			// Rough syllable count for Russian
			const ruVowels = (w.match(/[аеёиоуыэюя]/gi) || []).length;
			const enVowels = (w.match(/[aeiouy]/gi) || []).length;
			return sum + Math.max(ruVowels + enVowels, 1);
		}, 0);

		const fleschScore =
			206.835 - 1.3 * (totalWords / sentences) - 60 * (syllables / totalWords);
		const clampedScore = Math.max(0, Math.min(100, fleschScore));

		let readability: string;
		if (clampedScore >= 90) readability = "Очень легко (5 класс)";
		else if (clampedScore >= 80) readability = "Легко (6 класс)";
		else if (clampedScore >= 70) readability = "Довольно легко (7 класс)";
		else if (clampedScore >= 60) readability = "Средний (8-9 класс)";
		else if (clampedScore >= 50) readability = "Довольно сложно (10-12 класс)";
		else if (clampedScore >= 30) readability = "Сложно (ВУЗ)";
		else readability = "Очень сложно (профессионал)";

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
	content: {
		howTo:
			"Введите текст для анализа. Калькулятор покажет статистику слов, индекс читаемости по Флешу и частотность слов.",
		about:
			"Комплексный анализ текста: подсчёт уникальных слов, оценка читаемости по шкале Флеша (Flesch Reading Ease), средняя длина слова, топ слов по частотности.",
		usage:
			"Используется для проверки качества текста, SEO-анализа, оценки сложности образовательных материалов, копирайтинга.",
		formula:
			"Индекс Флеша = 206.835 - 1.3 × (слова/предложения) - 60 × (слоги/слова)\nЧем выше индекс — тем легче текст",
		faq: [
			{
				question: "Что такое индекс Флеша?",
				answer:
					"Шкала читаемости текста от 0 до 100. 90-100 — очень легко (детская книга), 0-30 — сложно (научная статья).",
			},
			{
				question: "Какие слова считаются топовыми?",
				answer:
					"Показываются 5 самых частотных слов с указанием количества вхождений. Игнорируется регистр и пунктуация.",
			},
		],
		sources: [
			{
				title: "Индекс Флеша — Википедия",
				url: "https://ru.wikipedia.org/wiki/Индекс_удобочитаемости",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 3. ГЕНЕРАТОР LOREM IPSUM ====================

const loremWords = [
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

export const loremIpsumGenerator: Calculator = {
	id: "lorem-ipsum-generator",
	slug: "lorem-ipsum-generator",
	title: "Генератор Lorem Ipsum",
	description: "Генерация рыбного текста — слова, предложения, абзацы",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "type",
			label: "Тип генерации",
			type: "select",
			options: [
				{ value: "words", label: "Слова" },
				{ value: "sentences", label: "Предложения" },
				{ value: "paragraphs", label: "Абзацы" },
			],
			defaultValue: "paragraphs",
		},
		{
			name: "count",
			label: "Количество",
			type: "number",
			placeholder: "3",
			defaultValue: 3,
			min: 1,
			max: 50,
		},
		{
			name: "startWithLorem",
			label: 'Начинать с "Lorem ipsum"',
			type: "select",
			options: [
				{ value: "yes", label: "Да" },
				{ value: "no", label: "Нет" },
			],
			defaultValue: "yes",
		},
	],
	outputs: [
		{ name: "result", label: "Результат", type: "text" },
		{ name: "stats", label: "Статистика", type: "text" },
	],
	calculate: (inputs) => {
		const type = String(inputs.type);
		const count = Math.min(Math.max(Number(inputs.count) || 1, 1), 50);
		const startWithLorem = String(inputs.startWithLorem) === "yes";

		const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
		const randomWord = () =>
			loremWords[Math.floor(Math.random() * loremWords.length)];

		const generateSentence = (wordCount: number): string => {
			const words: string[] = [];
			for (let i = 0; i < wordCount; i++) {
				words.push(randomWord());
			}
			return capitalize(words.join(" ")) + ".";
		};

		const generateParagraph = (sentenceCount: number): string => {
			const sentences: string[] = [];
			for (let i = 0; i < sentenceCount; i++) {
				const wordCount = Math.floor(Math.random() * 8) + 5; // 5-12 слов
				sentences.push(generateSentence(wordCount));
			}
			return sentences.join(" ");
		};

		let result: string;
		let stats: string;

		if (type === "words") {
			const words: string[] = [];
			for (let i = 0; i < count; i++) {
				words.push(randomWord());
			}
			if (startWithLorem && count >= 2) {
				words[0] = "lorem";
				words[1] = "ipsum";
			}
			result = words.join(" ");
			stats = `${count} слов, ${result.length} символов`;
		} else if (type === "sentences") {
			const sentences: string[] = [];
			for (let i = 0; i < count; i++) {
				const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 слов
				sentences.push(generateSentence(wordCount));
			}
			if (startWithLorem && count >= 1) {
				sentences[0] =
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
			}
			result = sentences.join(" ");
			const words = result.split(/\s+/).length;
			stats = `${count} предложений, ${words} слов, ${result.length} символов`;
		} else {
			const paragraphs: string[] = [];
			for (let i = 0; i < count; i++) {
				const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 предложений
				paragraphs.push(generateParagraph(sentenceCount));
			}
			if (startWithLorem && count >= 1) {
				paragraphs[0] =
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
					paragraphs[0];
			}
			result = paragraphs.join("\n\n");
			const words = result.split(/\s+/).filter((w) => w.length > 0).length;
			stats = `${count} абзацев, ${paragraphs.length} блоков, ${words} слов, ${result.length} символов`;
		}

		return [
			{ value: result, label: "Результат", unit: "" },
			{ value: stats, label: "Статистика", unit: "" },
		];
	},
	content: {
		howTo:
			'Выберите тип генерации (слова, предложения или абзацы) и количество. Можно начать с классического "Lorem ipsum dolor sit amet".',
		about:
			'Генератор Lorem Ipsum — стандартного "рыбного" текста для вёрстки и дизайна. Используется для заполнения макетов.',
		usage:
			"Используется в вёрстке, дизайне, веб-разработке для демонстрации макетов до получения реального текста.",
		formula: "Случайный выбор слов из классического набора латинских терминов",
		faq: [
			{
				question: "Что такое Lorem Ipsum?",
				answer:
					"Фрагмент латинского текста, используемый в печати и вёрстке как заполнитель. Используется с XVI века.",
			},
			{
				question: "Почему используется именно этот текст?",
				answer:
					"Он имеет нормальное распределение букв и длину слов, похожую на естественный язык, но не отвлекает читателя смыслом.",
			},
		],
		sources: [
			{
				title: "Lorem ipsum — Википедия",
				url: "https://ru.wikipedia.org/wiki/Lorem_ipsum",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 4. ТРАНСЛИТЕРАЦИЯ ====================

const translitMaps: Record<string, Record<string, string>> = {
	// ICAO (Doc 9303) — для паспортов, международных документов
	icao: {
		а: "a",
		б: "b",
		в: "v",
		г: "g",
		д: "d",
		е: "e",
		ё: "e",
		ж: "zh",
		з: "z",
		и: "i",
		й: "i",
		к: "k",
		л: "l",
		м: "m",
		н: "n",
		о: "o",
		п: "p",
		р: "r",
		с: "s",
		т: "t",
		у: "u",
		ф: "f",
		х: "kh",
		ц: "ts",
		ч: "ch",
		ш: "sh",
		щ: "shch",
		ъ: "ie",
		ы: "y",
		ь: "",
		э: "e",
		ю: "iu",
		я: "ia",
		А: "A",
		Б: "B",
		В: "V",
		Г: "G",
		Д: "D",
		Е: "E",
		Ё: "E",
		Ж: "Zh",
		З: "Z",
		И: "I",
		Й: "I",
		К: "K",
		Л: "L",
		М: "M",
		Н: "N",
		О: "O",
		П: "P",
		Р: "R",
		С: "S",
		Т: "T",
		У: "U",
		Ф: "F",
		Х: "Kh",
		Ц: "Ts",
		Ч: "Ch",
		Ш: "Sh",
		Щ: "Shch",
		Ъ: "Ie",
		Ы: "Y",
		Ь: "",
		Э: "E",
		Ю: "Iu",
		Я: "Ia",
	},
	// BGN/PCGN — стандарт Библиотеки Конгресса США
	bgn: {
		а: "a",
		б: "b",
		в: "v",
		г: "g",
		д: "d",
		е: "e",
		ё: "yo",
		ж: "zh",
		з: "z",
		и: "i",
		й: "y",
		к: "k",
		л: "l",
		м: "m",
		н: "n",
		о: "o",
		п: "p",
		р: "r",
		с: "s",
		т: "t",
		у: "u",
		ф: "f",
		х: "kh",
		ц: "ts",
		ч: "ch",
		ш: "sh",
		щ: "shch",
		ъ: '"',
		ы: "y",
		ь: "'",
		э: "e",
		ю: "yu",
		я: "ya",
		А: "A",
		Б: "B",
		В: "V",
		Г: "G",
		Д: "D",
		Е: "E",
		Ё: "Yo",
		Ж: "Zh",
		З: "Z",
		И: "I",
		Й: "Y",
		К: "K",
		Л: "L",
		М: "M",
		Н: "N",
		О: "O",
		П: "P",
		Р: "R",
		С: "S",
		Т: "T",
		У: "U",
		Ф: "F",
		Х: "Kh",
		Ц: "Ts",
		Ч: "Ch",
		Ш: "Sh",
		Щ: "Shch",
		Ъ: '"',
		Ы: "Y",
		Ь: "'",
		Э: "E",
		Ю: "Yu",
		Я: "Ya",
	},
	// Научная (Scholarly) — ISO 9:1995
	scholarly: {
		а: "a",
		б: "b",
		в: "v",
		г: "g",
		д: "d",
		е: "e",
		ё: "ë",
		ж: "ž",
		з: "z",
		и: "i",
		й: "j",
		к: "k",
		л: "l",
		м: "m",
		н: "n",
		о: "o",
		п: "p",
		р: "r",
		с: "s",
		т: "t",
		у: "u",
		ф: "f",
		х: "h",
		ц: "c",
		ч: "č",
		ш: "š",
		щ: "šč",
		ъ: "ʺ",
		ы: "y",
		ь: "'",
		э: "è",
		ю: "ju",
		я: "ja",
		А: "A",
		Б: "B",
		В: "V",
		Г: "G",
		Д: "D",
		Е: "E",
		Ё: "Ë",
		Ж: "Ž",
		З: "Z",
		И: "I",
		Й: "J",
		К: "K",
		Л: "L",
		М: "M",
		Н: "N",
		О: "O",
		П: "P",
		Р: "R",
		С: "S",
		Т: "T",
		У: "U",
		Ф: "F",
		Х: "H",
		Ц: "C",
		Ч: "Č",
		Ш: "Š",
		Щ: "Šč",
		Ъ: "ʺ",
		Ы: "Y",
		Ь: "'",
		Э: "È",
		Ю: "Ju",
		Я: "Ja",
	},
};

// Reverse maps for Latin to Russian
const createReverseMap = (
	map: Record<string, string>,
): Record<string, string> => {
	const reverse: Record<string, string> = {};
	Object.entries(map).forEach(([ru, lat]) => {
		if (lat && !reverse[lat.toLowerCase()]) {
			reverse[lat.toLowerCase()] = ru.toLowerCase();
		}
	});
	return reverse;
};

export const transliterationCalculator: Calculator = {
	id: "transliteration",
	slug: "transliteratsiya",
	title: "Транслитерация",
	description:
		"Преобразование текста между кириллицей и латиницей по международным стандартам",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "text",
			label: "Текст",
			type: "text",
			placeholder: "Введите текст на русском или латинице...",
			defaultValue: "",
		},
		{
			name: "direction",
			label: "Направление",
			type: "select",
			options: [
				{ value: "ru-to-lat", label: "Русский → Латиница" },
				{ value: "lat-to-ru", label: "Латиница → Русский" },
			],
			defaultValue: "ru-to-lat",
		},
		{
			name: "standard",
			label: "Стандарт",
			type: "select",
			options: [
				{ value: "icao", label: "ICAO (паспорта, Doc 9303)" },
				{ value: "bgn", label: "BGN/PCGN (США, Библиотека Конгресса)" },
				{ value: "scholarly", label: "Научный (ISO 9:1995)" },
			],
			defaultValue: "icao",
		},
	],
	outputs: [
		{ name: "result", label: "Результат", type: "text" },
		{
			name: "originalLength",
			label: "Исходных символов",
			type: "number",
			unit: "шт",
		},
		{
			name: "resultLength",
			label: "Результат символов",
			type: "number",
			unit: "шт",
		},
	],
	calculate: (inputs) => {
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
			// Russian to Latin: character by character
			result = text
				.split("")
				.map((char) => map[char] || char)
				.join("");
		} else {
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
	content: {
		howTo:
			'Введите текст, выберите направление транслитерации и стандарт. Нажмите "Рассчитать" для преобразования.',
		about:
			"Транслитерация по международным стандартам: ICAO (для паспортов), BGN/PCGN (американский), ISO 9 (научный).",
		usage:
			"Используется для написания имен в загранпаспортах, научных публикаций, URL-адресов, email.",
		formula:
			"Поэлементная замена символов по таблице соответствия выбранного стандарта",
		faq: [
			{
				question: "Какой стандарт использовать для паспорта?",
				answer:
					"ICAO Doc 9303 — это международный стандарт для машиночитаемых проездных документов.",
			},
			{
				question: "В чём разница между BGN и ICAO?",
				answer:
					'BGN/PCGN использует "yu" для ю, "ya" для я и разделяет ъ и ь знаками. ICAO упрощает некоторые буквы.',
			},
		],
		sources: [
			{
				title: "Транслитерация — Википедия",
				url: "https://ru.wikipedia.org/wiki/Транслитерация",
			},
			{
				title: "ICAO Doc 9303",
				url: "https://www.icao.int/publications/documents/9303_p9_cons_en.pdf",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 5. АЗБУКА МОРЗЕ ====================

const morseCodeMap: Record<string, string> = {
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

const reverseMorseMap: Record<string, string> = {};
Object.entries(morseCodeMap).forEach(([char, code]) => {
	if (code !== "/") reverseMorseMap[code] = char;
});

export const morseCodeCalculator: Calculator = {
	id: "morse-code",
	slug: "azbuka-morze",
	title: "Азбука Морзе",
	description:
		"Перевод текста в код Морзе и обратно (русский, латиница, цифры)",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "text",
			label: "Текст или код",
			type: "text",
			placeholder: "Введите текст или код Морзе...",
			defaultValue: "",
		},
		{
			name: "mode",
			label: "Режим",
			type: "select",
			options: [
				{ value: "encode", label: "Текст → Морзе" },
				{ value: "decode", label: "Морзе → Текст" },
			],
			defaultValue: "encode",
		},
	],
	outputs: [
		{ name: "result", label: "Результат", type: "text" },
		{ name: "charCount", label: "Символов", type: "number", unit: "шт" },
		{ name: "visual", label: "Визуальное представление", type: "text" },
	],
	calculate: (inputs) => {
		const text = String(inputs.text || "").trim();
		const mode = String(inputs.mode);

		if (!text) {
			return [
				{ value: "", label: "Результат", unit: "" },
				{ value: "0", label: "Символов", unit: "шт" },
				{ value: "", label: "Визуальное представление", unit: "" },
			];
		}

		let result: string;
		let visual: string;

		if (mode === "encode") {
			// Text to Morse
			const encoded = text
				.toLowerCase()
				.split("")
				.map((char) => morseCodeMap[char] || char)
				.join(" ");
			result = encoded;
			visual = encoded.replace(/\./g, "•").replace(/-/g, "▬");
		} else {
			// Morse to text
			const codes = text.trim().split(/\s+/);
			const decoded = codes
				.map((code) => reverseMorseMap[code] || code)
				.join("");
			result = decoded;
			visual = text.replace(/\./g, "•").replace(/-/g, "▬");
		}

		const charCount = mode === "encode" ? text.length : result.length;

		return [
			{ value: result, label: "Результат", unit: "" },
			{ value: charCount.toString(), label: "Символов", unit: "шт" },
			{ value: visual, label: "Визуальное представление", unit: "" },
		];
	},
	content: {
		howTo:
			"Введите текст для кодирования или код Морзе для декодирования. Используйте точки (.) и тире (-), разделяя буквы пробелами.",
		about:
			"Азбука Морзе — способ кодирования символов с помощью коротких (точки) и длинных (тире) сигналов. Поддерживает русский, латинский алфавиты и цифры.",
		usage:
			"Используется для любительской радиосвязи, образовательных целей, шифрования сообщений.",
		formula:
			"Текст → посимвольная замена по таблице Морзе\nСигналы: точка (·) — короткий, тире (▬) — длинный",
		faq: [
			{
				question: "Как разделять буквы в коде Морзе?",
				answer:
					"Буквы разделяются пробелом, слова — слэшем (/) или тремя пробелами.",
			},
			{
				question: "Поддерживается ли русский язык?",
				answer:
					"Да, поддерживаются русский и латинский алфавиты по международному стандарту Морзе.",
			},
		],
		sources: [
			{
				title: "Азбука Морзе — Википедия",
				url: "https://ru.wikipedia.org/wiki/Азбука_Морзе",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 6. ШИФР ЦЕЗАРЯ ====================

const caesarShift = (text: string, shift: number, alphabet: string): string => {
	return text
		.split("")
		.map((char) => {
			const idx = alphabet.indexOf(char.toLowerCase());
			if (idx === -1) return char;

			const newIdx = (idx + shift + alphabet.length) % alphabet.length;
			const newChar = alphabet[newIdx];

			return char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
		})
		.join("");
};

export const caesarCipherCalculator: Calculator = {
	id: "caesar-cipher",
	slug: "tsifrt-tsezarya",
	title: "Шифр Цезаря",
	description: "Шифрование методом сдвига (ROT13, произвольный сдвиг)",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "text",
			label: "Текст",
			type: "text",
			placeholder: "Введите текст для шифрования...",
			defaultValue: "",
		},
		{
			name: "shift",
			label: "Сдвиг",
			type: "select",
			options: [
				{ value: "13", label: "ROT13 (классический)" },
				{ value: "1", label: "Сдвиг 1 (A→B)" },
				{ value: "3", label: "Сдвиг 3 (как у Цезаря)" },
				{ value: "5", label: "Сдвиг 5" },
				{ value: "7", label: "Сдвиг 7" },
				{ value: "10", label: "Сдвиг 10" },
				{ value: "custom", label: "Произвольный (введите ниже)" },
			],
			defaultValue: "13",
		},
		{
			name: "customShift",
			label: "Произвольный сдвиг (1-25)",
			type: "number",
			placeholder: "3",
			defaultValue: 3,
			min: 1,
			max: 25,
		},
		{
			name: "mode",
			label: "Режим",
			type: "select",
			options: [
				{ value: "encode", label: "Зашифровать" },
				{ value: "decode", label: "Расшифровать" },
			],
			defaultValue: "encode",
		},
		{
			name: "alphabet",
			label: "Алфавит",
			type: "select",
			options: [
				{ value: "latin", label: "Латиница (A-Z)" },
				{ value: "russian", label: "Кириллица (А-Я)" },
			],
			defaultValue: "latin",
		},
	],
	outputs: [
		{ name: "result", label: "Результат", type: "text" },
		{ name: "shiftInfo", label: "Использованный сдвиг", type: "text" },
	],
	calculate: (inputs) => {
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

		const alphabet =
			alphabetType === "russian"
				? "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
				: "abcdefghijklmnopqrstuvwxyz";

		let shift: number;
		if (shiftType === "custom") {
			shift = customShift;
		} else {
			shift = Number(shiftType) || 13;
		}

		// For decoding, shift in opposite direction
		const effectiveShift = mode === "decode" ? -shift : shift;

		const result = caesarShift(text, effectiveShift, alphabet);
		const shiftInfo =
			mode === "decode"
				? `Сдвиг ${shift} влево (расшифровка)`
				: `Сдвиг ${shift} вправо`;

		return [
			{ value: result, label: "Результат", unit: "" },
			{ value: shiftInfo, label: "Использованный сдвиг", unit: "" },
		];
	},
	content: {
		howTo:
			"Введите текст, выберите сдвиг (ROT13 или произвольный от 1-25), режим и алфавит. Калькулятор зашифрует или расшифрует текст.",
		about:
			"Шифр Цезаря — метод шифрования путём сдвига букв алфавита на фиксированное число позиций. ROT13 — сдвиг на 13 (взаимно обратный).",
		usage:
			"Используется для простого шифрования, головоломок, обучения криптографии, создания спойлеров (ROT13).",
		formula:
			"Шифрование: C = (P + K) mod N\nРасшифровка: P = (C - K) mod N\nгде P — открытый текст, K — ключ (сдвиг), N — размер алфавита",
		faq: [
			{
				question: "Что такое ROT13?",
				answer:
					"ROT13 — специальный случай шифра Цезаря со сдвигом 13. Применяется дважды возвращает исходный текст.",
			},
			{
				question: "Безопасен ли этот шифр?",
				answer:
					"Нет, это классический пример небезопасного шифра. Его легко взломать перебором или частотным анализом.",
			},
		],
		sources: [
			{
				title: "Шифр Цезаря — Википедия",
				url: "https://ru.wikipedia.org/wiki/Шифр_Цезаря",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 7. BASE64 ====================

export const base64Calculator: Calculator = {
	id: "base64",
	slug: "base64-koder",
	title: "Base64 кодировщик",
	description: "Кодирование и декодирование текста в формат Base64",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "text",
			label: "Текст",
			type: "text",
			placeholder: "Введите текст для кодирования...",
			defaultValue: "",
		},
		{
			name: "mode",
			label: "Режим",
			type: "select",
			options: [
				{ value: "encode", label: "Кодировать (текст → Base64)" },
				{ value: "decode", label: "Декодировать (Base64 → текст)" },
			],
			defaultValue: "encode",
		},
	],
	outputs: [
		{ name: "result", label: "Результат", type: "text" },
		{
			name: "originalLength",
			label: "Исходный размер",
			type: "number",
			unit: "байт",
		},
		{
			name: "resultLength",
			label: "Результат размер",
			type: "number",
			unit: "байт",
		},
		{ name: "ratio", label: "Соотношение", type: "text" },
	],
	calculate: (inputs) => {
		const text = String(inputs.text || "");
		const mode = String(inputs.mode);

		if (!text) {
			return [
				{ value: "", label: "Результат", unit: "" },
				{ value: "0", label: "Исходный размер", unit: "байт" },
				{ value: "0", label: "Результат размер", unit: "байт" },
				{ value: "—", label: "Соотношение", unit: "" },
			];
		}

		try {
			let result: string;
			let originalLength: number;
			let resultLength: number;

			if (mode === "encode") {
				// Text to Base64
				result = btoa(unescape(encodeURIComponent(text)));
				originalLength = new Blob([text]).size;
				resultLength = result.length;
			} else {
				// Base64 to text
				result = decodeURIComponent(escape(atob(text)));
				originalLength = text.length;
				resultLength = new Blob([result]).size;
			}

			const ratio = ((resultLength / originalLength) * 100).toFixed(1) + "%";

			return [
				{ value: result, label: "Результат", unit: "" },
				{
					value: originalLength.toString(),
					label: "Исходный размер",
					unit: "байт",
				},
				{
					value: resultLength.toString(),
					label: "Результат размер",
					unit: "байт",
				},
				{ value: ratio, label: "Соотношение", unit: "" },
			];
		} catch (e) {
			return [
				{
					value: "Ошибка: неверный формат Base64",
					label: "Результат",
					unit: "",
				},
				{
					value: text.length.toString(),
					label: "Исходный размер",
					unit: "байт",
				},
				{ value: "0", label: "Результат размер", unit: "байт" },
				{ value: "—", label: "Соотношение", unit: "" },
			];
		}
	},
	content: {
		howTo:
			"Введите текст или Base64-код, выберите режим кодирования/декодирования. Калькулятор покажет результат и соотношение размеров.",
		about:
			"Base64 — метод кодирования двоичных данных в ASCII-текст. Используется для передачи данных в текстовых форматах.",
		usage:
			"Используется для встраивания изображений в HTML/CSS, передачи данных через URL, email-вложений, JSON.",
		formula:
			'Каждые 3 байта (24 бит) → 4 символа Base64 (по 6 бит)\nПаддинг "=" для выравнивания',
		faq: [
			{
				question: "Почему размер увеличивается на ~33%?",
				answer:
					"Base64 кодирует 3 байта в 4 символа (увеличение на 33%). Это плата за совместимость с текстовыми системами.",
			},
			{
				question: "Поддерживает ли русский текст?",
				answer:
					"Да, используется UTF-8 кодировка. Кириллица поддерживается полностью.",
			},
			{
				question: "Можно ли декодировать любой Base64?",
				answer:
					"Нет, только валидный Base64 (A-Z, a-z, 0-9, +, /, =). Данные могут быть бинарными, а не текстовыми.",
			},
		],
		sources: [
			{
				title: "Base64 — Википедия",
				url: "https://ru.wikipedia.org/wiki/Base64",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 8. URL КОДИРОВЩИК ====================

export const urlEncoderCalculator: Calculator = {
	id: "url-encoder",
	slug: "url-kodirovshchik",
	title: "URL кодировщик",
	description: "Кодирование и декодирование URL (percent-encoding)",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "text",
			label: "Текст или URL",
			type: "text",
			placeholder: "Введите текст для кодирования или закодированный URL...",
			defaultValue: "",
		},
		{
			name: "mode",
			label: "Режим",
			type: "select",
			options: [
				{ value: "encode", label: "Кодировать (encodeURIComponent)" },
				{ value: "decode", label: "Декодировать (decodeURIComponent)" },
				{ value: "encodeUri", label: "Кодировать URL (encodeURI)" },
				{ value: "fullUrl", label: "Закодировать весь URL" },
			],
			defaultValue: "encode",
		},
	],
	outputs: [
		{ name: "result", label: "Результат", type: "text" },
		{
			name: "originalLength",
			label: "Исходная длина",
			type: "number",
			unit: "симв",
		},
		{
			name: "resultLength",
			label: "Длина результата",
			type: "number",
			unit: "симв",
		},
	],
	calculate: (inputs) => {
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
					// Encode query parameters while preserving structure
					try {
						const url = new URL(text);
						result = url.toString();
					} catch {
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
		} catch (e) {
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
	content: {
		howTo:
			"Введите текст или URL, выберите режим кодирования. Для параметров запроса используйте encodeURIComponent, для полных URL — encodeURI.",
		about:
			"Percent-encoding (URL encoding) — кодирование специальных символов в URL: пробелы → %20, кириллица → %D0%9E и т.д.",
		usage:
			"Используется при формировании URL-запросов, работе с GET-параметрами, API, отправке данных через URL.",
		formula:
			"encodeURIComponent: кодирует все спецсимволы\nencodeURI: сохраняет структуру URL (:, /, ?, &, =)",
		faq: [
			{
				question: "В чём разница между encodeURI и encodeURIComponent?",
				answer:
					"encodeURI сохраняет служебные символы URL (:/?#&=). encodeURIComponent кодирует всё, включая эти символы — для значений параметров.",
			},
			{
				question: "Почему пробел кодируется как %20?",
				answer:
					"Пробел в URL запрещён. %20 — это шестнадцатеричный код пробела (32 в ASCII) в формате percent-encoding.",
			},
		],
		sources: [
			{
				title: "Percent-encoding — Википедия",
				url: "https://ru.wikipedia.org/wiki/Кодирование_URL",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 9. ГЕНЕРАТОР ПАРОЛЕЙ (РАСШИРЕННЫЙ) ====================

const pronounceableSyllables = [
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

export const advancedPasswordGenerator: Calculator = {
	id: "advanced-password-generator",
	slug: "generator-parolej-pro",
	title: "Генератор паролей PRO",
	description: "Генератор с настройкой длины, сложности и произносимых паролей",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "length",
			label: "Длина пароля",
			type: "number",
			placeholder: "16",
			defaultValue: 16,
			min: 8,
			max: 128,
		},
		{
			name: "uppercase",
			label: "Заглавные буквы (A-Z)",
			type: "select",
			options: [
				{ value: "yes", label: "Да" },
				{ value: "no", label: "Нет" },
			],
			defaultValue: "yes",
		},
		{
			name: "lowercase",
			label: "Строчные буквы (a-z)",
			type: "select",
			options: [
				{ value: "yes", label: "Да" },
				{ value: "no", label: "Нет" },
			],
			defaultValue: "yes",
		},
		{
			name: "digits",
			label: "Цифры (0-9)",
			type: "select",
			options: [
				{ value: "yes", label: "Да" },
				{ value: "no", label: "Нет" },
			],
			defaultValue: "yes",
		},
		{
			name: "symbols",
			label: "Спецсимволы (!@#$%^&*)",
			type: "select",
			options: [
				{ value: "yes", label: "Да" },
				{ value: "no", label: "Нет" },
			],
			defaultValue: "yes",
		},
		{
			name: "mode",
			label: "Режим генерации",
			type: "select",
			options: [
				{ value: "random", label: "Случайный" },
				{ value: "pronounceable", label: "Произносимый (запоминаемый)" },
				{ value: "passphrase", label: "Парольная фраза" },
			],
			defaultValue: "random",
		},
	],
	outputs: [
		{ name: "password", label: "Пароль", type: "text" },
		{ name: "strength", label: "Сила пароля", type: "text" },
		{ name: "entropy", label: "Энтропия", type: "number", unit: "бит" },
		{ name: "timeToCrack", label: "Время взлома", type: "text" },
	],
	calculate: (inputs) => {
		const length = Math.min(Math.max(Number(inputs.length) || 16, 8), 128);
		const useUppercase = String(inputs.uppercase) === "yes";
		const useLowercase = String(inputs.lowercase) === "yes";
		const useDigits = String(inputs.digits) === "yes";
		const useSymbols = String(inputs.symbols) === "yes";
		const mode = String(inputs.mode);

		let password: string;
		let charsetSize = 0;

		if (mode === "pronounceable") {
			// Generate pronounceable password
			const syllableCount = Math.ceil(length / 3);
			const syllables: string[] = [];
			for (let i = 0; i < syllableCount; i++) {
				const syl =
					pronounceableSyllables[
						Math.floor(Math.random() * pronounceableSyllables.length)
					];
				syllables.push(
					Math.random() > 0.5
						? syl
						: syl.charAt(0).toUpperCase() + syl.slice(1),
				);
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
		} else if (mode === "passphrase") {
			// Generate passphrase with words
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
				selected.push(
					Math.random() > 0.5
						? word
						: word.charAt(0).toUpperCase() + word.slice(1),
				);
			}
			password = selected.join(
				useSymbols ? (Math.random() > 0.5 ? "-" : "_") : "",
			);
			if (useDigits) {
				password += Math.floor(Math.random() * 1000);
			}
			password = password.slice(0, Math.min(length, password.length));

			charsetSize = Math.pow(20, wordCount); // Very rough estimate
		} else {
			// Random password
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

		// Calculate entropy and strength
		const entropy =
			charsetSize > 0 ? Math.log2(Math.pow(charsetSize, password.length)) : 50;
		const clampedEntropy = Math.max(0, entropy);

		let strength: string;
		if (clampedEntropy < 28) strength = "Очень слабый";
		else if (clampedEntropy < 36) strength = "Слабый";
		else if (clampedEntropy < 60) strength = "Средний";
		else if (clampedEntropy < 80) strength = "Сильный";
		else strength = "Очень сильный";

		// Estimate crack time
		const guessesPerSecond = 10000000000; // 10 billion guesses/sec
		const secondsToCrack = Math.pow(2, clampedEntropy) / guessesPerSecond;

		let timeToCrack: string;
		if (secondsToCrack < 1) timeToCrack = "Мгновенно";
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
		else timeToCrack = "Миллиарды лет";

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
	content: {
		howTo:
			'Настройте длину (8-128), наборы символов и режим. "Произносимый" генерирует запоминаемые пароли, "Парольная фраза" — из слов.',
		about:
			"Продвинутый генератор паролей с тремя режимами: случайный (максимальная энтропия), произносимый (легко запомнить), парольная фраза (из слов).",
		usage:
			"Случайный — для менеджеров паролей. Произносимый — для паролей, которые нужно запомнить. Парольная фраза — высокая энтропия при запоминаемости.",
		formula:
			"Энтропия = L × log₂(N)\nгде L — длина, N — размер набора символов\nПример: 16 символов из 95 = ~105 бит",
		faq: [
			{
				question: "Какой пароль самый надёжный?",
				answer:
					"Случайный с длиной 20+ символов, всеми типами символов — энтропия 130+ бит, не поддаётся подбору.",
			},
			{
				question: "Что лучше: сложный или длинный?",
				answer:
					'Длина важнее сложности. "correct-horse-battery-staple" (28 символов) надёжнее, чем "Tr0ub4dor&3" (11 символов).',
			},
			{
				question: "Где хранить пароли?",
				answer:
					"Используйте менеджер паролей (Bitwarden, KeePassXC, 1Password). Не сохраняйте в браузере или текстовых файлах.",
			},
		],
		sources: [
			{
				title: "Менеджер паролей — Википедия",
				url: "https://ru.wikipedia.org/wiki/Менеджер_паролей",
			},
			{
				title: "Энтропия пароля — Википедия",
				url: "https://en.wikipedia.org/wiki/Password_strength",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 10. ПРОВЕРКА ПАЛИНДРОМОВ ====================

export const palindromeChecker: Calculator = {
	id: "palindrome-checker",
	slug: "proverka-palindromov",
	title: "Проверка палиндромов",
	description: "Проверка слов и фраз на чтение одинаково в обе стороны",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "text",
			label: "Текст для проверки",
			type: "text",
			placeholder: "Введите слово или фразу...",
			defaultValue: "",
		},
		{
			name: "ignoreSpaces",
			label: "Игнорировать пробелы",
			type: "select",
			options: [
				{ value: "yes", label: "Да" },
				{ value: "no", label: "Нет" },
			],
			defaultValue: "yes",
		},
		{
			name: "ignorePunctuation",
			label: "Игнорировать знаки препинания",
			type: "select",
			options: [
				{ value: "yes", label: "Да" },
				{ value: "no", label: "Нет" },
			],
			defaultValue: "yes",
		},
		{
			name: "ignoreCase",
			label: "Игнорировать регистр",
			type: "select",
			options: [
				{ value: "yes", label: "Да" },
				{ value: "no", label: "Нет" },
			],
			defaultValue: "yes",
		},
	],
	outputs: [
		{ name: "isPalindrome", label: "Результат", type: "text" },
		{ name: "cleanedText", label: "Очищенный текст", type: "text" },
		{ name: "reversedText", label: "Текст наоборот", type: "text" },
		{ name: "length", label: "Длина", type: "number", unit: "симв" },
	],
	calculate: (inputs) => {
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
		if (ignoreCase) cleaned = cleaned.toLowerCase();
		if (ignoreSpaces) cleaned = cleaned.replace(/\s/g, "");
		if (ignorePunctuation) cleaned = cleaned.replace(/[^\p{L}\p{N}]/gu, "");

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
	content: {
		howTo:
			"Введите текст и выберите параметры сравнения. Можно игнорировать пробелы, знаки препинания и регистр.",
		about:
			'Проверка на палиндром — слово или фраза, читающаяся одинаково слева направо и справа налево. Примеры: "кошка", "A man a plan a canal Panama".',
		usage:
			"Используется для головоломок, лингвистических игр, образовательных целей, проверки текстов.",
		formula:
			"Очистка текста от игнорируемых символов → Сравнение с обратной строкой",
		faq: [
			{
				question: "Что такое палиндром?",
				answer:
					'Слово, число или фраза, одинаково читающиеся в обе стороны. Например: "топот", "12321", "Шалаш".',
			},
			{
				question: "Самый длинный палиндром?",
				answer:
					'Существуют палиндромы на тысячи слов. В русском: "А роза упала на лапу Азора" — самый известный.',
			},
		],
		sources: [
			{
				title: "Палиндром — Википедия",
				url: "https://ru.wikipedia.org/wiki/Палиндром",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 11. РЕШЕТО АНАГРАММ ====================

// Common Russian and English words for anagram solving
const commonWords = [
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

export const anagramSolver: Calculator = {
	id: "anagram-solver",
	slug: "reshetka-anagramm",
	title: "Решатель анаграмм",
	description: "Поиск слов из заданных букв",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "letters",
			label: "Буквы",
			type: "text",
			placeholder: "Введите буквы (например: слот)...",
			defaultValue: "",
		},
		{
			name: "minLength",
			label: "Минимальная длина слова",
			type: "number",
			placeholder: "2",
			defaultValue: 2,
			min: 2,
			max: 20,
		},
		{
			name: "maxResults",
			label: "Максимум результатов",
			type: "number",
			placeholder: "20",
			defaultValue: 20,
			min: 5,
			max: 100,
		},
	],
	outputs: [
		{ name: "words", label: "Найденные слова", type: "text" },
		{ name: "count", label: "Количество", type: "number", unit: "шт" },
		{ name: "sorted", label: "Буквы отсортированы", type: "text" },
	],
	calculate: (inputs) => {
		const letters = String(inputs.letters || "")
			.toLowerCase()
			.replace(/[^\p{L}]/gu, "");
		const minLength = Math.max(2, Number(inputs.minLength) || 2);
		const maxResults = Math.min(
			Math.max(5, Number(inputs.maxResults) || 20),
			100,
		);

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
				if ((letterCounts[letter] || 0) < count) return false;
			}
			return true;
		};

		const found = commonWords
			.filter((w) => w.length >= minLength && canFormWord(w))
			.slice(0, maxResults);

		// Also try to find two-word combinations
		const twoWordCombos: string[] = [];
		for (let i = 0; i < Math.min(found.length, 15); i++) {
			for (let j = i + 1; j < Math.min(found.length, 15); j++) {
				const combined = found[i] + found[j];
				if (combined.length <= letters.length + 1 && canFormWord(combined)) {
					twoWordCombos.push(`${found[i]} + ${found[j]}`);
				}
			}
		}

		const allResults = [...new Set([...found, ...twoWordCombos])].slice(
			0,
			maxResults,
		);

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
	content: {
		howTo:
			"Введите набор букв, задайте минимальную длину слова. Калькулятор найдёт слова, которые можно составить из этих букв.",
		about:
			"Решатель анаграмм находит слова, которые можно составить из заданных букв. Поддерживает русский и английский языки.",
		usage:
			"Используется для головоломок (Scrabble, Эрудит), кроссвордов, лингвистических игр, проверки орфографии.",
		formula:
			"Проверка каждого слова из словаря: все буквы слова должны присутствовать в исходном наборе с учётом повторений",
		faq: [
			{
				question: "Что такое анаграмма?",
				answer:
					'Слово или фраза, образованная перестановкой букв другого слова. Например: "кот" → "ток", "listen" → "silent".',
			},
			{
				question: "Как увеличить словарь?",
				answer:
					"Базовый набор содержит ~150 частотных слов. Для полного поиска используйте специализированные сервисы или расширяйте словарь.",
			},
		],
		sources: [
			{
				title: "Анаграмма — Википедия",
				url: "https://ru.wikipedia.org/wiki/Анаграмма",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== 12. КОНВЕРТЕР РЕГИСТРА ====================

const toTitleCase = (str: string): string => {
	return str.replace(
		/\w\S*/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
	);
};

const toSentenceCase = (str: string): string => {
	return str
		.toLowerCase()
		.replace(/(^")|\. +[a-zа-яё]/g, (match) => match.toUpperCase());
};

const toCamelCase = (str: string): string => {
	return str
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
};

const toSnakeCase = (str: string): string => {
	return (
		str
			.match(
				/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
			)
			?.map((x) => x.toLowerCase())
			.join("_") || str.toLowerCase()
	);
};

const toKebabCase = (str: string): string => {
	return (
		str
			.match(
				/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
			)
			?.map((x) => x.toLowerCase())
			.join("-") || str.toLowerCase()
	);
};

export const caseConverter: Calculator = {
	id: "case-converter",
	slug: "konverter-registra",
	title: "Конвертер регистра",
	description: "Преобразование между различными стилями написания",
	category: "tekhnologii",
	subcategory: "tekstovye-instrumenty",
	type: "formula",
	inputs: [
		{
			name: "text",
			label: "Текст",
			type: "text",
			placeholder: "Введите текст для преобразования...",
			defaultValue: "",
		},
		{
			name: "targetCase",
			label: "Целевой регистр",
			type: "select",
			options: [
				{ value: "upper", label: "ВЕРХНИЙ РЕГИСТР" },
				{ value: "lower", label: "нижний регистр" },
				{ value: "title", label: "Заглавные Буквы Каждого Слова" },
				{ value: "sentence", label: "Предложения. С заглавной." },
				{ value: "camel", label: "camelCase" },
				{ value: "snake", label: "snake_case" },
				{ value: "kebab", label: "kebab-case" },
				{ value: "alternating", label: "ЧеРеДоВаНиЕ" },
			],
			defaultValue: "title",
		},
	],
	outputs: [
		{ name: "result", label: "Результат", type: "text" },
		{
			name: "originalLength",
			label: "Исходная длина",
			type: "number",
			unit: "симв",
		},
		{
			name: "resultLength",
			label: "Длина результата",
			type: "number",
			unit: "симв",
		},
	],
	calculate: (inputs) => {
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
	content: {
		howTo:
			"Введите текст и выберите целевой регистр. Калькулятор мгновенно преобразует текст в выбранный формат.",
		about:
			"Конвертер регистра преобразует текст между различными стилями: UPPER, lower, Title Case, Sentence case, camelCase, snake_case, kebab-case.",
		usage:
			"Используется в программировании (имена переменных), SEO (заголовки), редактировании текста, нормализации данных.",
		formula:
			"Регулярные выражения и методы строк JavaScript для трансформации регистра",
		faq: [
			{
				question: "Что такое camelCase?",
				answer:
					"Стиль написания, где первое слово строчное, а каждое следующее начинается с заглавной: myVariableName, getUserById.",
			},
			{
				question: "В чём разница между snake_case и kebab-case?",
				answer:
					"snake_case использует подчёркивания (user_name), kebab-case — дефисы (user-name). Первый популярен в Python, второй в URL.",
			},
			{
				question: "Работает ли с русским языком?",
				answer:
					"Да, но camelCase, snake_case и kebab-case лучше работают с латиницей (для программирования). Title Case и Sentence case поддерживают оба алфавита.",
			},
		],
		sources: [
			{
				title: "Стиль написания идентификаторов — Википедия",
				url: "https://ru.wikipedia.org/wiki/Стиль_написания_идентификаторов",
			},
		],
		updatedAt: "2026-04-07",
	},
};

// ==================== ЭКСПОРТ ====================

export const textToolsCalculators = [
	characterCounter,
	textAnalyzer,
	loremIpsumGenerator,
	transliterationCalculator,
	morseCodeCalculator,
	caesarCipherCalculator,
	base64Calculator,
	urlEncoderCalculator,
	advancedPasswordGenerator,
	palindromeChecker,
	anagramSolver,
	caseConverter,
];
