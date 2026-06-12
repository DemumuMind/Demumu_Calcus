import type { ComputeFn } from './compute-helpers';

export const computeMap_science_science_b_4: Record<string, ComputeFn> = {
  'zakon-oma': (inputs) => {
    const U = Number(inputs.voltage);
    const I = Number(inputs.current);
    const R = Number(inputs.resistance);
    let calculatedU = U, calculatedI = I, calculatedR = R, usedFormula = '';
    if (U && I && !R) {
        calculatedR = U / I;
        usedFormula = 'R = U / I';
    }
    else if (U && R && !I) {
        calculatedI = U / R;
        usedFormula = 'I = U / R';
    }
    else if (I && R && !U) {
        calculatedU = I * R;
        usedFormula = 'U = I × R';
    }
    else if (U && I && R) {
        usedFormula = 'Проверка: U = I×R ✓';
    }
    else {
        return [{ value: 'Введите два значения из трёх', label: 'Ошибка' }];
    }
    const power = calculatedU * calculatedI;
    return [
        { value: power.toFixed(2), label: 'Мощность', unit: 'Вт' },
        { value: usedFormula, label: 'Формула', unit: '' }
    ];
},
  'zakon-snelliusa': (inputs) => {
    const angle = Number(inputs.angle);
    const n1 = Number(inputs.n1);
    const n2 = Number(inputs.n2);
    const sinRefraction = n1 * Math.sin(angle * Math.PI / 180) / n2;
    const refractionAngle = Math.asin(Math.min(1, sinRefraction)) * 180 / Math.PI;
    const criticalAngle = n1 > n2 ? Math.asin(n2 / n1) * 180 / Math.PI : null;
    return [
        { value: Math.round(refractionAngle * 10) / 10, label: 'Угол преломления', unit: '°' },
        { value: criticalAngle ? Math.round(criticalAngle * 10) / 10 : '—', label: 'Предельный угол', unit: criticalAngle ? '°' : '' }
    ];
},
  'zubchatoe-koleso': (inputs) => {
    const m = Number(inputs.module);
    const z1 = Number(inputs.teeth1);
    const z2 = Number(inputs.teeth2);
    if (!m || !z1 || !z2) {
        return [{ value: 'Введите все параметры', label: 'Ошибка' }];
    }
    const d1 = m * z1;
    const d2 = m * z2;
    const ratio = z2 / z1;
    // Межосевое расстояние: a = (d1 + d2)/2 = m(z1 + z2)/2
    const a = (d1 + d2) / 2;
    const da1 = m * (z1 + 2);
    const da2 = m * (z2 + 2);
    return [
        { value: d1.toFixed(2), label: 'Делительный диаметр d1', unit: 'мм' },
        { value: d2.toFixed(2), label: 'Делительный диаметр d2', unit: 'мм' },
        { value: ratio.toFixed(2), label: 'Передаточное отношение', unit: '' },
        { value: a.toFixed(2), label: 'Межосевое расстояние', unit: 'мм' },
        { value: da1.toFixed(2), label: 'Вершины зубьев колеса 1', unit: 'мм' },
        { value: da2.toFixed(2), label: 'Вершины зубьев колеса 2', unit: 'мм' }
    ];
},
}
