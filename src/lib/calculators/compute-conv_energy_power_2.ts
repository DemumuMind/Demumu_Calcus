import type { ComputeFn } from './compute-helpers';
import { fmtResult } from './compute-helpers';

export const computeMap_conv_energy_power_2: Record<string, ComputeFn> = {
  'megabajty-v-megabity': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 8;
    return [{
            value: `${value} МБ = ${fmtResult(result)} Мбит`,
            label: 'Результат'
        }];
},
  'megabity-v-megabajty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.125;
    return [{
            value: `${value} Мбит = ${fmtResult(result)} МБ`,
            label: 'Результат'
        }];
},
  'megavatty-v-kilovatty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1000;
    return [{
            value: `${value} МВт = ${fmtResult(result)} кВт`,
            label: 'Результат'
        }];
},
  'moshchnost': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const toWatts: Record<string, number> = {
        w: 1,
        kw: 1000,
        mw: 1000000,
        hp: 735.49875, // Metric horsepower
        hp_uk: 745.7, // Imperial horsepower
        btu_h: 0.29307107,
        kj_h: 0.27777778,
        cal_s: 4.1868,
        j_s: 1 // Same as watt
    };
    const watts = value * toWatts[from];
    const result = watts / toWatts[to];
    const unitLabels: Record<string, string> = {
        w: 'Вт',
        kw: 'кВт',
        mw: 'МВт',
        hp: 'л.с.',
        hp_uk: 'HP',
        btu_h: 'BTU/ч',
        kj_h: 'кДж/ч',
        cal_s: 'кал/с',
        j_s: 'Дж/с'
    };
    return [{
            value: `${value} ${unitLabels[from]} = ${Math.round(result * 1000) / 1000} ${unitLabels[to]}`,
            label: 'Результат'
        }];
},
  'radiany-v-gradusy': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 57.29577951308232;
    return [{
            value: `${value} рад = ${fmtResult(result)} °`,
            label: 'Результат'
        }];
},
  'terabajty-v-gigabajty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1024;
    return [{
            value: `${value} ТБ = ${fmtResult(result)} ГБ`,
            label: 'Результат'
        }];
},
  'uglovye-minuty-v-gradusy': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.016666666666666666;
    return [{
            value: `${value} угл. мин = ${fmtResult(result)} °`,
            label: 'Результат'
        }];
},
  'uglovye-sekundy-v-gradusy': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0002777777777777778;
    return [{
            value: `${value} угл. сек = ${fmtResult(result)} °`,
            label: 'Результат'
        }];
},
  'vatty-v-kilovatty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.001;
    return [{
            value: `${value} Вт = ${fmtResult(result)} кВт`,
            label: 'Результат'
        }];
},
  'vatty-v-ls': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0013596216173039043;
    return [{
            value: `${value} Вт = ${fmtResult(result)} л.с.`,
            label: 'Результат'
        }];
},
}
