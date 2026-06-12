import type { ComputeFn } from './compute-helpers';

export const computeMap_health_beauty: Record<string, ComputeFn> = {
  'razmer-byustgaltera': (inputs) => {
    const underbust = Number(inputs.underbust);
    const bust = Number(inputs.bust);
    const country = String(inputs.country);
    if (!underbust || !bust || underbust <= 0 || bust <= underbust) {
        return [{ value: 'Введите корректные замеры', label: 'Результат' }];
    }
    const diff = bust - underbust;
    const diffInches = diff / 2.54;
    let band = '';
    let cup = '';
    let fullSize = '';
    const ruCupMap = [
        { max: 10, label: 'AA' },
        { max: 13, label: 'A' },
        { max: 16, label: 'B' },
        { max: 19, label: 'C' },
        { max: 22, label: 'D' },
        { max: 25, label: 'E' },
        { max: 28, label: 'F' },
        { max: 31, label: 'G' },
        { max: 34, label: 'H' }
    ];
    const usCupMap = [
        { max: 1, label: 'AA' },
        { max: 2, label: 'A' },
        { max: 3, label: 'B' },
        { max: 4, label: 'C' },
        { max: 5, label: 'D' },
        { max: 6, label: 'DD/E' },
        { max: 7, label: 'DDD/F' },
        { max: 8, label: 'G' },
        { max: 9, label: 'H' }
    ];
    const ukCupMap = [
        { max: 1, label: 'AA' },
        { max: 2, label: 'A' },
        { max: 3, label: 'B' },
        { max: 4, label: 'C' },
        { max: 5, label: 'D' },
        { max: 6, label: 'DD' },
        { max: 7, label: 'E' },
        { max: 8, label: 'F' },
        { max: 9, label: 'FF' }
    ];
    if (country === 'RU' || country === 'EU') {
        band = String(Math.round(underbust / 5) * 5);
        const found = ruCupMap.find(c => diff < c.max);
        cup = found ? found.label : 'H+';
        fullSize = `${band}${cup}`;
    }
    else if (country === 'US') {
        const bandInches = underbust / 2.54;
        const bandRounded = Math.max(28, Math.round(bandInches / 2) * 2);
        band = String(bandRounded);
        const found = usCupMap.find(c => diffInches < c.max);
        cup = found ? found.label : 'H+';
        fullSize = `${band}${cup}`;
    }
    else if (country === 'UK') {
        const bandInches = underbust / 2.54;
        const bandRounded = Math.max(28, Math.round(bandInches / 2) * 2);
        band = String(bandRounded);
        const found = ukCupMap.find(c => diffInches < c.max);
        cup = found ? found.label : 'FF+';
        fullSize = `${band}${cup}`;
    }
    return [
        { value: band, label: 'Обхват (размер ленты)' },
        { value: cup, label: 'Чашка' },
        { value: fullSize, label: 'Полный размер' }
    ];
},
  'rost-volos': (inputs) => {
    const currentLength = Number(inputs.currentLength);
    const desiredLength = Number(inputs.desiredLength);
    const growthRate = Number(inputs.growthRate);
    if (!currentLength || !desiredLength || !growthRate || desiredLength <= currentLength) {
        return [{ value: 'Желаемая длина должна быть больше текущей', label: 'Результат' }];
    }
    const diffCm = desiredLength - currentLength;
    const diffMm = diffCm * 10;
    const months = diffMm / growthRate;
    const days = Math.round(months * 30.44);
    const years = months / 12;
    return [
        { value: days, label: 'Дней', unit: 'дн' },
        { value: Math.round(months * 10) / 10, label: 'Месяцев', unit: 'мес' },
        { value: Math.round(years * 100) / 100, label: 'Лет', unit: 'лет' }
    ];
},
  'ves-odezhdy': (inputs) => {
    const items: Record<string, {
        count: number;
        avgWeight: number;
        name: string;
    }> = {
        tShirt: { count: Math.max(0, Number(inputs.tShirt) || 0), avgWeight: 175, name: 'Футболка' },
        jeans: { count: Math.max(0, Number(inputs.jeans) || 0), avgWeight: 700, name: 'Джинсы' },
        sweater: { count: Math.max(0, Number(inputs.sweater) || 0), avgWeight: 500, name: 'Свитер' },
        jacket: { count: Math.max(0, Number(inputs.jacket) || 0), avgWeight: 1150, name: 'Куртка' },
        shoes: { count: Math.max(0, Number(inputs.shoes) || 0), avgWeight: 1000, name: 'Обувь' },
        underwear: { count: Math.max(0, Number(inputs.underwear) || 0), avgWeight: 80, name: 'Нижнее бельё' },
        socks: { count: Math.max(0, Number(inputs.socks) || 0), avgWeight: 50, name: 'Носки' },
        shorts: { count: Math.max(0, Number(inputs.shorts) || 0), avgWeight: 250, name: 'Шорты' },
        dress: { count: Math.max(0, Number(inputs.dress) || 0), avgWeight: 400, name: 'Платье' },
        coat: { count: Math.max(0, Number(inputs.coat) || 0), avgWeight: 1500, name: 'Пальто' }
    };
    let totalWeight = 0;
    const parts: string[] = [];
    for (const key of Object.keys(items)) {
        const item = items[key];
        if (item.count > 0) {
            const itemWeight = item.count * item.avgWeight;
            totalWeight += itemWeight;
            parts.push(`${item.name}: ${item.count} × ~${item.avgWeight}г = ${itemWeight}г`);
        }
    }
    if (totalWeight === 0) {
        return [
            { value: 0, label: 'Общий вес', unit: 'г' },
            { value: 0, label: 'Общий вес', unit: 'кг' },
            { value: 'Выберите предметы одежды', label: 'По предметам' }
        ];
    }
    return [
        { value: totalWeight, label: 'Общий вес', unit: 'г' },
        { value: (totalWeight / 1000).toFixed(2), label: 'Общий вес', unit: 'кг' },
        { value: parts.join('; '), label: 'По предметам' }
    ];
},
}
