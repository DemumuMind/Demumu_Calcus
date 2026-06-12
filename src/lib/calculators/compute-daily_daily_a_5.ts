import type { ComputeFn } from './compute-helpers';

export const computeMap_daily_daily_a_5: Record<string, ComputeFn> = {
  'poliv-rasteniy': (inputs) => {
    const area = Number(inputs.area);
    const waterDepth = Number(inputs.waterDepth);
    const soilType = String(inputs.soilType);
    const method = String(inputs.method);
    if (!area || !waterDepth) {
        return [
            { value: '—', label: 'Объём воды', unit: 'л' },
            { value: '—', label: 'Время полива' },
            { value: '—', label: 'Частота полива' },
            { value: '—', label: 'Эффективность' },
            { value: '—', label: 'Советы' }
        ];
    }
    const soilMultipliers: Record<string, number> = {
        'sandy': 1.3, // Drains fast, needs more
        'loamy': 1.0, // Balanced
        'clay': 0.9, // Retains water
        'peat': 1.4 // Very absorbent
    };
    const efficiencies: Record<string, {
        factor: number;
        text: string;
        time: string;
    }> = {
        'manual': { factor: 0.8, text: '60-70% (потери на испарение)', time: '15-20 мин' },
        'sprinkler': { factor: 0.7, text: '50-60% (ветер, испарение)', time: '30-40 мин' },
        'drip': { factor: 0.95, text: '90-95% (точно к корням)', time: '60-90 мин' }
    };
    const soilMult = soilMultipliers[soilType];
    const efficiency = efficiencies[method];
    const baseLiters = area * waterDepth * 10; // 10 because 1 m² * 0.01 m = 0.01 m³ = 10 liters
    const adjustedLiters = baseLiters * soilMult / efficiency.factor;
    const frequencies: Record<string, string> = {
        'sandy': 'Каждые 1-2 дня (быстро высыхает)',
        'loamy': 'Каждые 2-3 дня',
        'clay': 'Каждые 3-4 дня (долго сохраняет)',
        'peat': 'Каждые 2-3 дня (хорошо держит)'
    };
    const tips: Record<string, string> = {
        'sandy': 'Поливайте чаще, но меньшими порциями. Мульчируйте чтобы удержать влагу.',
        'loamy': 'Идеальная почва. Поливайте по утрам или вечерам.',
        'clay': 'Не поливайте слишком часто — риск загнивания корней.',
        'peat': 'Требует много воды, но хорошо её удерживает. Контролируйте pH.'
    };
    return [
        { value: Math.round(adjustedLiters), label: 'Объём воды', unit: 'л' },
        { value: efficiency.time, label: 'Время полива' },
        { value: frequencies[soilType], label: 'Частота полива' },
        { value: efficiency.text, label: 'Эффективность' },
        { value: tips[soilType], label: 'Советы' }
    ];
},
}
