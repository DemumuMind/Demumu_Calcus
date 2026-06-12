import type { ComputeFn } from './compute-helpers';
import { simpleConvert, divConvert } from './compute-helpers';

export const computeMap_length_mass: Record<string, ComputeFn> = {
  'dyujmy-v-santimetry': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 2.54;
    return [{
            value: `${value} дюйм${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(2)} см`,
            label: 'Результат'
        }];
},
  'dyujmy-v-sm-diagonal': ({ value }) => {
    const result = Number(value) * 2.54;
    return [{ value: `${result.toFixed(2)} см`, label: 'Диагональ', unit: 'см' }];
},
  'funti-v-kilogrammy': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.45359237;
    return [{
            value: `${value} фунт${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(2)} кг`,
            label: 'Результат'
        }];
},
  'futy-v-metry': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.3048;
    return [{
            value: `${value} фут${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(2)} м`,
            label: 'Результат'
        }];
},
  'grammy-v-karati': (inputs) => divConvert(inputs, 0.2, 'г', 'карат`,', 0),
  'grammy-v-kilogrammy': (inputs) => divConvert(inputs, 1000, 'г', 'кг`,', 3),
  'grammy-v-troyjskie-uncii': (inputs) => divConvert(inputs, 31.1035, 'г', 'тройск${result', 4),
  'grammy-v-uncii': (inputs) => simpleConvert(inputs, 0.2, 'г', 'унци${result', 2),
  'kilogrammy-v-funti': (inputs) => simpleConvert(inputs, 1000, 'кг', 'фунт${result', 2),
  'kilogrammy-v-pudi': (inputs) => divConvert(inputs, 16.3805, 'кг', 'пуд${result', 3),
  'kilogrammy-v-tonny': (inputs) => divConvert(inputs, 1000, 'кг', 'т`,', 3),
  'kilogrammy-v-tsentneri': (inputs) => simpleConvert(inputs, 1000, 'кг', 'центнер${result', 2),
  'kilometry-v-mili': (inputs) => divConvert(inputs, 1.609344, 'км', 'мил${result', 2),
  'konverter-dlina': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toMeters: Record<string, number> = {
        'm': 1,
        'km': 1000,
        'cm': 0.01,
        'mm': 0.001,
        'inch': 0.0254,
        'ft': 0.3048,
        'yd': 0.9144,
        'mi': 1609.344,
        'nm': 1e-9,
        'um': 1e-6
    };
    const inMeters = value * toMeters[from];
    const result = inMeters / toMeters[to];
    const labels: Record<string, string> = {
        'm': 'м', 'km': 'км', 'cm': 'см', 'mm': 'мм',
        'inch': 'дюймов', 'ft': 'футов', 'yd': 'ярдов', 'mi': 'миль',
        'nm': 'нм', 'um': 'мкм'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'konverter-massa': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toGrams: Record<string, number> = {
        'kg': 1000,
        'g': 1,
        'mg': 0.001,
        't': 1e6,
        'lb': 453.592,
        'oz': 28.3495,
        'ct': 0.2
    };
    const inGrams = value * toGrams[from];
    const result = inGrams / toGrams[to];
    const labels: Record<string, string> = {
        'kg': 'кг', 'g': 'г', 'mg': 'мг', 't': 'т',
        'lb': 'фунтов', 'oz': 'унций', 'ct': 'карат'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'metry-v-futy': (inputs) => divConvert(inputs, 0.3048, 'м', 'фут${result', 2),
  'metry-v-kilometry': (inputs) => simpleConvert(inputs, 100, 'м', 'км`,', 3),
  'metry-v-yardy': (inputs) => divConvert(inputs, 0.9144, 'м', 'ярд${result', 2),
  'mili-v-kilometry': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1.609344;
    return [{
            value: `${value} мил${value === 1 ? 'я' : value < 5 ? 'и' : 'ь'} = ${result.toFixed(2)} км`,
            label: 'Результат'
        }];
},
  'millimetry-v-santimetry': (inputs) => divConvert(inputs, 10, 'мм', 'см`,', 1),
  'pudi-v-kilogrammy': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 16.3805;
    return [{
            value: `${value} пуд${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(2)} кг`,
            label: 'Результат'
        }];
},
  'santimetry-v-dyujmy': (inputs) => divConvert(inputs, 2.54, 'см', 'дюйм${result', 2),
  'santimetry-v-metry': (inputs) => simpleConvert(inputs, 10, 'см', 'м`,', 2),
  'troyjskie-uncii-v-grammy': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 31.1035;
    return [{
            value: `${value} тройск${value === 1 ? 'ая' : value < 5 ? 'ие' : 'их'} унци${value === 1 ? 'я' : value < 5 ? 'и' : 'й'} = ${result.toFixed(2)} г`,
            label: 'Результат'
        }];
},
  'tsentneri-v-kilogrammy': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 100;
    return [{
            value: `${value} центнер${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(0)} кг`,
            label: 'Результат'
        }];
},
  'uncii-v-grammy': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 28.3495;
    return [{
            value: `${value} унци${value === 1 ? 'я' : value < 5 ? 'и' : 'й'} = ${result.toFixed(2)} г`,
            label: 'Результат'
        }];
},
  'yardy-v-metry': (inputs) => {
    const value = Number(inputs.value);
    if (!value && value !== 0)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.9144;
    return [{
            value: `${value} ярд${value === 1 ? '' : value < 5 ? 'а' : 'ов'} = ${result.toFixed(2)} м`,
            label: 'Результат'
        }];
},

};
