import type { ComputeFn } from './compute-helpers';

export const computeMap_construction_a_2: Record<string, ComputeFn> = {
  'kalkulyator-sypuchih-materialov': (inputs) => {
    const materialType = String(inputs.materialType);
    const calculationMode = String(inputs.calculationMode);
    const volume = Number(inputs.volume);
    const weight = Number(inputs.weight);
    const truckVolume = Number(inputs.truckVolume);
    const densities: Record<string, number> = {
        'sand_construction': 1600,
        'sand_river': 1550,
        'crushed_stone': 1500,
        'gravel': 1400,
        'expanded_clay': 400,
        'granite': 1470
    };
    const density = densities[materialType] || 1500;
    let resultWeight = 0;
    let resultVolume = 0;
    if (calculationMode === 'volume_to_weight') {
        if (!volume) {
            return [{ value: '—', label: 'Результат' }];
        }
        resultVolume = volume;
        resultWeight = volume * density;
    }
    else {
        if (!weight) {
            return [{ value: '—', label: 'Результат' }];
        }
        resultWeight = weight;
        resultVolume = weight / density;
    }
    const tons = resultWeight / 1000;
    const truckTrips = truckVolume > 0 ? Math.ceil(resultVolume / truckVolume) : 0;
    return [
        { value: resultWeight.toFixed(1), label: 'Масса материала', unit: 'кг' },
        { value: resultVolume.toFixed(3), label: 'Объём материала', unit: 'м³' },
        { value: tons.toFixed(2), label: 'В тоннах', unit: 'т' },
        { value: truckTrips > 0 ? truckTrips.toString() : '—', label: 'Количество рейсов', unit: 'рейсов' }
    ];
},
  'kalkulyator-uteplitelya': (inputs) => {
    const area = Number(inputs.area);
    const thickness = Number(inputs.thickness) / 100;
    const packVolume = Number(inputs.packVolume);
    const reserve = Number(inputs.reserve) / 100;
    if (!area || !thickness || !packVolume) {
        return [{ value: '—', label: 'Результат' }];
    }
    const totalVolume = area * thickness * (1 + reserve);
    const packsNeeded = Math.ceil(totalVolume / packVolume);
    return [
        { value: totalVolume.toFixed(2), label: 'Объём утеплителя', unit: 'м³' },
        { value: packsNeeded.toString(), label: 'Упаковок нужно', unit: 'шт' }
    ];
},
}
