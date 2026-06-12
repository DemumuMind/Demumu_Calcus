import type { ComputeFn } from './compute-helpers';
import { fmtResult } from './compute-helpers';

export const computeMap_conv_pressure_area_1: Record<string, ComputeFn> = {
  'akr-v-kv-metr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 4046.86;
    return [{ value: `${v} акров = ${r.toFixed(2)} м²`, label: 'Результат' }];
},
  'atm-v-bar': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1.01325;
    return [{
            value: `${value} атм = ${fmtResult(result)} бар`,
            label: 'Результат'
        }];
},
  'bar-v-atm': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const toBar: Record<string, number> = {
        'bar': 1,
        'atm': 1.01325, // 1 атм = 1.01325 бар
        'at': 0.980665, // 1 ат = 0.980665 бар
        'mmhg': 0.00133322, // 1 мм рт.ст. = 0.00133322 бар
        'kpa': 0.01 // 1 кПа = 0.01 бар
    };
    const inBars = value * toBar[from];
    const result = inBars / toBar[to];
    const unitLabels: Record<string, string> = {
        'bar': 'бар',
        'atm': 'атм',
        'at': 'ат',
        'mmhg': 'мм рт. ст.',
        'kpa': 'кПа'
    };
    return [{
            value: `${value} ${unitLabels[from]} = ${result.toFixed(4)} ${unitLabels[to]}`,
            label: 'Результат'
        }];
},
  'bar-v-paskali': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 100000;
    return [{
            value: `${value} бар = ${fmtResult(result)} Па`,
            label: 'Результат'
        }];
},
  'bar-v-psi': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 14.503773773022209;
    return [{
            value: `${value} бар = ${fmtResult(result)} psi`,
            label: 'Результат'
        }];
},
  'gektar-v-kv-km': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 100;
    return [{ value: `${v} га = ${r.toFixed(4)} км²`, label: 'Результат' }];
},
  'gektar-v-sotka': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 100;
    return [{ value: `${v} га = ${r.toFixed(2)} соток`, label: 'Результат' }];
},
  'gektary-v-kvadratnye-kilometry': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const toSqMeter: Record<string, number> = {
        'ha': 10000,
        'sqkm': 1000000,
        'sqm': 1,
        'are': 100,
        'acre': 4046.86
    };
    const inSqMeters = value * toSqMeter[from];
    const result = inSqMeters / toSqMeter[to];
    const unitLabels: Record<string, string> = {
        'ha': 'га',
        'sqkm': 'км²',
        'sqm': 'м²',
        'are': 'соток',
        'acre': 'акров'
    };
    return [{
            value: `${value} ${unitLabels[from]} = ${result.toFixed(4)} ${unitLabels[to]}`,
            label: 'Результат'
        }];
},
  'konverter-davleniya': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toPascals: Record<string, number> = {
        'pa': 1,
        'kpa': 1000,
        'mpa': 1e6,
        'bar': 100000,
        'atm': 101325,
        'mmhg': 133.322,
        'psi': 6894.76,
        'torr': 133.322
    };
    const inPascals = value * toPascals[from];
    const result = inPascals / toPascals[to];
    const labels: Record<string, string> = {
        'pa': 'Па', 'kpa': 'кПа', 'mpa': 'МПа', 'bar': 'бар',
        'atm': 'атм', 'mmhg': 'мм рт. ст.', 'psi': 'psi', 'torr': 'торр'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'konverter-ploshchadi': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toSquareMeters: Record<string, number> = {
        'm2': 1,
        'km2': 1e6,
        'ha': 10000,
        'acre': 4046.86,
        'ft2': 0.092903,
        'yd2': 0.836127,
        'in2': 0.00064516,
        'cm2': 0.0001,
        'mm2': 0.000001
    };
    const inSquareMeters = value * toSquareMeters[from];
    const result = inSquareMeters / toSquareMeters[to];
    const labels: Record<string, string> = {
        'm2': 'м²', 'km2': 'км²', 'ha': 'га', 'acre': 'акров',
        'ft2': 'фут²', 'yd2': 'ярд²', 'in2': 'дюйм²', 'cm2': 'см²', 'mm2': 'мм²'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'kpa-v-pa': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1000;
    return [{
            value: `${value} кПа = ${fmtResult(result)} Па`,
            label: 'Результат'
        }];
},
  'kv-km-v-gektar': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 100;
    return [{ value: `${v} км² = ${r.toFixed(2)} га`, label: 'Результат' }];
},
  'kv-metr-v-akr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 4046.86;
    return [{ value: `${v} м² = ${r.toFixed(4)} акров`, label: 'Результат' }];
},
  'kv-metr-v-kv-sm': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 10000;
    return [{ value: `${v} м² = ${r.toFixed(2)} см²`, label: 'Результат' }];
},
  'kv-metr-v-sotka': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 100;
    return [{ value: `${v} м² = ${r.toFixed(4)} соток`, label: 'Результат' }];
},
  'kv-mm-v-kv-sm': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 100;
    return [{ value: `${v} мм² = ${r.toFixed(4)} см²`, label: 'Результат' }];
},
  'kv-sm-v-kv-metr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 10000;
    return [{ value: `${v} см² = ${r.toFixed(4)} м²`, label: 'Результат' }];
},
  'kv-sm-v-kv-mm': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 100;
    return [{ value: `${v} см² = ${r.toFixed(2)} мм²`, label: 'Результат' }];
},
  'mm-rt-st-v-paskali': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 133.322;
    return [{
            value: `${value} мм рт. ст. = ${fmtResult(result)} Па`,
            label: 'Результат'
        }];
},
  'mpa-v-pa': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 1000000;
    return [{
            value: `${value} МПа = ${fmtResult(result)} Па`,
            label: 'Результат'
        }];
},
  'pa-v-kpa': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.001;
    return [{
            value: `${value} Па = ${fmtResult(result)} кПа`,
            label: 'Результат'
        }];
},
  'pa-v-mpa': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.000001;
    return [{
            value: `${value} Па = ${fmtResult(result)} МПа`,
            label: 'Результат'
        }];
},
  'pa-v-tehn-atm': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0000101971621297793;
    return [{
            value: `${value} Па = ${fmtResult(result)} ат`,
            label: 'Результат'
        }];
},
  'paskali-v-bar': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.00001;
    return [{
            value: `${value} Па = ${fmtResult(result)} бар`,
            label: 'Результат'
        }];
},
  'paskali-v-mm-rt-st': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const toPascal: Record<string, number> = {
        'pa': 1,
        'mmhg': 133.322,
        'atm': 101325,
        'bar': 100000,
        'kpa': 1000,
        'mpa': 1000000,
        'psi': 6894.76,
        'mwater': 9806.65
    };
    const inPascals = value * toPascal[from];
    const result = inPascals / toPascal[to];
    const unitLabels: Record<string, string> = {
        'pa': 'Па',
        'mmhg': 'мм рт. ст.',
        'atm': 'атм',
        'bar': 'бар',
        'kpa': 'кПа',
        'mpa': 'МПа',
        'psi': 'psi',
        'mwater': 'м вод. ст.'
    };
    return [{
            value: `${value} ${unitLabels[from]} = ${result.toFixed(4)} ${unitLabels[to]}`,
            label: 'Результат'
        }];
},
  'psi-v-bar': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const toPsi: Record<string, number> = {
        'psi': 1,
        'bar': 14.5038,
        'kpa': 0.145038,
        'atm': 14.6959
    };
    const inPsi = value * toPsi[from];
    const result = inPsi / toPsi[to];
    const unitLabels: Record<string, string> = {
        'psi': 'psi',
        'bar': 'бар',
        'kpa': 'кПа',
        'atm': 'атм'
    };
    return [{
            value: `${value} ${unitLabels[from]} = ${result.toFixed(4)} ${unitLabels[to]}`,
            label: 'Результат'
        }];
},
  'sotka-v-gektar': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 100;
    return [{ value: `${v} соток = ${r.toFixed(4)} га`, label: 'Результат' }];
},
  'sotka-v-kv-metr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 100;
    return [{ value: `${v} соток = ${r.toFixed(2)} м²`, label: 'Результат' }];
},
  'sotki-v-kvadratnye-metry': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const toSquareMeter: Record<string, number> = {
        'sqm': 1,
        'are': 100, // 1 сотка = 100 м²
        'ha': 10000, // 1 гектар = 10000 м²
        'acre': 4046.86, // 1 акр ≈ 4047 м²
        'sqkm': 1000000, // 1 км² = 1000000 м²
        'sqcm': 0.0001, // 1 см² = 0.0001 м²
        'sqmm': 0.000001 // 1 мм² = 0.000001 м²
    };
    const inSqMeters = value * toSquareMeter[from];
    const result = inSqMeters / toSquareMeter[to];
    const unitLabels: Record<string, string> = {
        'sqm': 'м²',
        'are': 'соток',
        'ha': 'га',
        'acre': 'акров',
        'sqkm': 'км²',
        'sqcm': 'см²',
        'sqmm': 'мм²'
    };
    return [{
            value: `${value} ${unitLabels[from]} = ${result.toFixed(4)} ${unitLabels[to]}`,
            label: 'Результат'
        }];
},
  'stakan-v-ml': ({ value }) => {
    const result = Number(value) * 250;
    return [{ value: `${result} мл`, label: 'Объём', unit: 'мл' }];
},
  'stolovaya-lozhka-sahara-v-gramm': ({ value }) => {
    const result = Number(value) * 25;
    return [{ value: `${result} г`, label: 'Масса сахара', unit: 'г' }];
},
  'stolovaya-lozhka-v-ml': ({ value }) => {
    const result = Number(value) * 15;
    return [{ value: `${result} мл`, label: 'Объём', unit: 'мл' }];
},
}
