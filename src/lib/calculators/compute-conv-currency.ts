import type { ComputeFn } from './compute-helpers';

export const computeMap_currency: Record<string, ComputeFn> = {
  'byn-v-rub': (inputs) => {
    const rate = 28.5;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} BYN = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'chf-v-rub': (inputs) => {
    const rate = 102.4;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} CHF = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'cmyk-v-rgb': ({ c, m, y, k }) => {
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return [
        {
            value: `RGB(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
            label: 'RGB',
            unit: '',
        },
    ];
},
  'cny-v-rub': (inputs) => {
    const rate = 12.8;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} CNY = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'eur-v-rub': (inputs) => {
    const rate = 98.7;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} EUR = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'gbp-v-rub': (inputs) => {
    const rate = 115.3;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} GBP = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'jpy-v-rub': (inputs) => {
    const rate = 0.62;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} JPY = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'kzt-v-rub': (inputs) => {
    const rate = 0.185;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} KZT = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'try-v-rub': (inputs) => {
    const rate = 2.85;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} TRY = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'uah-v-rub': (inputs) => {
    const rate = 2.25;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} UAH = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'usd-v-eur': (inputs) => {
    const rate = 0.94;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} USD = ${result.toFixed(2)} EUR (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'usd-v-gbp': (inputs) => {
    const rate = 0.80;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} USD = ${result.toFixed(2)} GBP (курс ≈ ${rate})`, label: 'Конвертация' }];
},
  'usd-v-rub': (inputs) => {
    const rate = 92.5;
    const result = Number(inputs.amount) * rate;
    return [{ value: `${Number(inputs.amount)} USD = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
},
}
