import type { ComputeFn } from './compute-helpers';
import { loremWords } from './compute-helpers';

export const computeMap_tech_it_a_4: Record<string, ComputeFn> = {
  'lorem-ipsum-generator': (inputs) => {
    const type = String(inputs.type);
    const count = Math.min(Math.max(Number(inputs.count) || 1, 1), 50);
    const startWithLorem = String(inputs.startWithLorem) === "yes";
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const randomWord = () => loremWords[Math.floor(Math.random() * loremWords.length)];
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
    }
    else if (type === "sentences") {
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
    }
    else {
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
}
