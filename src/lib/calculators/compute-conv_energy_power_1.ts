import type { ComputeFn } from './compute-helpers';
import { fmtResult } from './compute-helpers';

export const computeMap_conv_energy_power_1: Record<string, ComputeFn> = {
  'bajty-v-kilobajty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0009765625;
    return [{
            value: `${value} байт = ${fmtResult(result)} КБ`,
            label: 'Результат'
        }];
},
  'dzhouli-v-ev': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 6241509074460763000;
    return [{
            value: `${value} Дж = ${fmtResult(result)} эВ`,
            label: 'Результат'
        }];
},
  'dzhouli-v-kalorii': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.2390057361376673;
    return [{
            value: `${value} Дж = ${fmtResult(result)} кал`,
            label: 'Результат'
        }];
},
  'dzhouli-v-kkal': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0002390057361376673;
    return [{
            value: `${value} Дж = ${fmtResult(result)} ккал`,
            label: 'Результат'
        }];
},
  'dzhouli-v-kvt-ch': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 2.777777777777778e-7;
    return [{
            value: `${value} Дж = ${fmtResult(result)} кВт·ч`,
            label: 'Результат'
        }];
},
  'ev-v-dzhouli': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1.602176634e-19;
    return [{
            value: `${value} эВ = ${fmtResult(result)} Дж`,
            label: 'Результат'
        }];
},
  'gigabajty-v-megabajty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1024;
    return [{
            value: `${value} ГБ = ${fmtResult(result)} МБ`,
            label: 'Результат'
        }];
},
  'gigabajty-v-terabajty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0009765625;
    return [{
            value: `${value} ГБ = ${fmtResult(result)} ТБ`,
            label: 'Результат'
        }];
},
  'gradusy-v-grady': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1.1111111111111112;
    return [{
            value: `${value} ° = ${fmtResult(result)} град`,
            label: 'Результат'
        }];
},
  'gradusy-v-radiany': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.017453292519943295;
    return [{
            value: `${value} ° = ${fmtResult(result)} рад`,
            label: 'Результат'
        }];
},
  'gradusy-v-uglovye-minuty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 60;
    return [{
            value: `${value} ° = ${fmtResult(result)} угл. мин`,
            label: 'Результат'
        }];
},
  'gradusy-v-uglovye-sekundy': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 3600;
    return [{
            value: `${value} ° = ${fmtResult(result)} угл. сек`,
            label: 'Результат'
        }];
},
  'grady-v-gradusy': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.9;
    return [{
            value: `${value} град = ${fmtResult(result)} °`,
            label: 'Результат'
        }];
},
  'gramm-v-stolovaya-lozhka-sahara': ({ value }) => {
    const result = Number(value) / 25;
    return [{ value: `${result.toFixed(1)} ст.л.`, label: 'Столовые ложки сахара', unit: 'ст.л.' }];
},
  'kalorii-v-dzhouli': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 4.184;
    return [{
            value: `${value} кал = ${fmtResult(result)} Дж`,
            label: 'Результат'
        }];
},
  'kilobajty-v-bajty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1024;
    return [{
            value: `${value} КБ = ${fmtResult(result)} байт`,
            label: 'Результат'
        }];
},
  'kilobajty-v-megabajty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0009765625;
    return [{
            value: `${value} КБ = ${fmtResult(result)} МБ`,
            label: 'Результат'
        }];
},
  'kilovatty-v-ls': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1.3596216173039044;
    return [{
            value: `${value} кВт = ${fmtResult(result)} л.с.`,
            label: 'Результат'
        }];
},
  'kilovatty-v-megavatty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.001;
    return [{
            value: `${value} кВт = ${fmtResult(result)} МВт`,
            label: 'Результат'
        }];
},
  'kilovatty-v-vatty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1000;
    return [{
            value: `${value} кВт = ${fmtResult(result)} Вт`,
            label: 'Результат'
        }];
},
  'kkal-v-dzhouli': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 4184;
    return [{
            value: `${value} ккал = ${fmtResult(result)} Дж`,
            label: 'Результат'
        }];
},
  'konverter-dannyh': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toBytes: Record<string, number> = {
        'b': 1,
        'kb': 1000,
        'kib': 1024,
        'mb': 1e6,
        'mib': 1048576,
        'gb': 1e9,
        'gib': 1073741824,
        'tb': 1e12,
        'tib': 1099511627776,
        'pb': 1e15
    };
    const inBytes = value * toBytes[from];
    const result = inBytes / toBytes[to];
    const labels: Record<string, string> = {
        'b': 'Б', 'kb': 'КБ', 'kib': 'КиБ',
        'mb': 'МБ', 'mib': 'МиБ', 'gb': 'ГБ', 'gib': 'ГиБ',
        'tb': 'ТБ', 'tib': 'ТиБ', 'pb': 'ПБ'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toExponential(4).replace(/\.?0+e/, 'e')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'konverter-energii': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toJoules: Record<string, number> = {
        'j': 1,
        'kj': 1000,
        'cal': 4.184,
        'kcal': 4184,
        'kwh': 3.6e6,
        'wh': 3600,
        'ev': 1.60218e-19,
        'btu': 1055.06
    };
    const inJoules = value * toJoules[from];
    const result = inJoules / toJoules[to];
    const labels: Record<string, string> = {
        'j': 'Дж', 'kj': 'кДж', 'cal': 'кал', 'kcal': 'ккал',
        'kwh': 'кВт⋅ч', 'wh': 'Вт⋅ч', 'ev': 'эВ', 'btu': 'BTU'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toExponential(4).replace(/\.?0+e/, 'e')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'konverter-moshchnosti': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toWatts: Record<string, number> = {
        'w': 1,
        'kw': 1000,
        'mw': 1e6,
        'hp_m': 735.499,
        'hp_i': 745.7,
        'btu_h': 0.293071,
        'j_s': 1
    };
    const inWatts = value * toWatts[from];
    const result = inWatts / toWatts[to];
    const labels: Record<string, string> = {
        'w': 'Вт', 'kw': 'кВт', 'mw': 'МВт',
        'hp_m': 'л.с. (метр.)', 'hp_i': 'hp (импер.)',
        'btu_h': 'BTU/ч', 'j_s': 'Дж/с'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'konverter-sily': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toNewtons: Record<string, number> = {
        'n': 1,
        'kn': 1000,
        'kgf': 9.80665,
        'lbf': 4.44822,
        'dyn': 1e-5
    };
    const inNewtons = value * toNewtons[from];
    const result = inNewtons / toNewtons[to];
    const labels: Record<string, string> = {
        'n': 'Н', 'kn': 'кН', 'kgf': 'кгс', 'lbf': 'lbf', 'dyn': 'дин'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'konverter-skorosti-peredachi': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toBps: Record<string, number> = {
        'bps': 1,
        'kbps': 1000,
        'mbps': 1000000,
        'gbps': 1000000000,
        'tbps': 1000000000000,
        'mb_s': 8000000, // 1 MB/s = 8 Mbps
        'gb_s': 8000000000
    };
    const inBps = value * toBps[from];
    const result = inBps / toBps[to];
    const labels: Record<string, string> = {
        'bps': 'bps', 'kbps': 'Kbps', 'mbps': 'Mbps', 'gbps': 'Gbps', 'tbps': 'Tbps',
        'mb_s': 'MB/s', 'gb_s': 'GB/s'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toFixed(2).replace(/\.?0+$/, '')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'kvt-ch-v-dzhouli': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 3600000;
    return [{
            value: `${value} кВт·ч = ${fmtResult(result)} Дж`,
            label: 'Результат'
        }];
},
  'ls-v-kilovatty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.73549875;
    return [{
            value: `${value} л.с. = ${fmtResult(result)} кВт`,
            label: 'Результат'
        }];
},
  'ls-v-vatty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 735.49875;
    return [{
            value: `${value} л.с. = ${fmtResult(result)} Вт`,
            label: 'Результат'
        }];
},
  'megabajty-v-gigabajty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0009765625;
    return [{
            value: `${value} МБ = ${fmtResult(result)} ГБ`,
            label: 'Результат'
        }];
},
  'megabajty-v-kilobajty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1024;
    return [{
            value: `${value} МБ = ${fmtResult(result)} КБ`,
            label: 'Результат'
        }];
},
}
