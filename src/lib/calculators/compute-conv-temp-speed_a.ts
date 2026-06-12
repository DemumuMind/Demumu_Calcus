import type { ComputeFn } from './compute-helpers';
import { fmtResult } from './compute-helpers';

export const computeMap_temp_speed_a: Record<string, ComputeFn> = {
  'barrel-v-litr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 158.987;
    return [{ value: `${v} баррелей = ${r.toFixed(2)} л`, label: 'Результат' }];
},
  'brinell-v-rokvell': ({ value }) => {
    const hb = Number(value);
    // Approximate conversion for steels: HRC ≈ (HB / 10) - 2.5 for HB > 200
    let hrc: number;
    if (hb >= 200) {
        hrc = hb / 10 - 2.5;
    }
    else {
        hrc = (hb / 2.22) - 46.7;
    }
    const scale = hb >= 200 ? 'HRC' : 'HRB (приближённо)';
    return [
        {
            value: `${hrc.toFixed(1)} ${scale}`,
            label: 'Твёрдость по Роквеллу',
            unit: scale,
        },
    ];
},
  'c-v-f': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v * 9 / 5 + 32;
    return [{ value: `${v}°C = ${r.toFixed(2)}°F`, label: 'Результат' }];
},
  'c-v-k': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v + 273.15;
    return [{ value: `${v}°C = ${r.toFixed(2)} K`, label: 'Результат' }];
},
  'c-v-re': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v * 4 / 5;
    return [{ value: `${v}°C = ${r.toFixed(2)}°Re`, label: 'Результат' }];
},
  'chasy-v-dni': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.041666666666666664;
    return [{
            value: `${value} ч = ${fmtResult(result)} дн`,
            label: 'Результат'
        }];
},
  'chasy-v-minuty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 60;
    return [{
            value: `${value} ч = ${fmtResult(result)} мин`,
            label: 'Результат'
        }];
},
  'chaynaya-lozhka-v-ml': ({ value }) => {
    const result = Number(value) * 5;
    return [{ value: `${result} мл`, label: 'Объём', unit: 'мл' }];
},
  'dni-v-chasy': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 24;
    return [{
            value: `${value} дн = ${fmtResult(result)} ч`,
            label: 'Результат'
        }];
},
  'dni-v-mesyacy': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.0328542094455853;
    return [{
            value: `${value} дн = ${fmtResult(result)} мес`,
            label: 'Результат'
        }];
},
  'dni-v-nedeli': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.14285714285714285;
    return [{
            value: `${value} дн = ${fmtResult(result)} нед`,
            label: 'Результат'
        }];
},
  'dpi-v-ppi': ({ value }) => {
    const result = Number(value);
    return [{ value: `${result} PPI`, label: 'PPI', unit: 'PPI' }];
},
  'f-v-c': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = (v - 32) * 5 / 9;
    return [{ value: `${v}°F = ${r.toFixed(2)}°C`, label: 'Результат' }];
},
  'f-v-k': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = (v - 32) * 5 / 9 + 273.15;
    return [{ value: `${v}°F = ${r.toFixed(2)} K`, label: 'Результат' }];
},
  'gallon-v-litr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 3.78541;
    return [{ value: `${v} гал (US) = ${r.toFixed(4)} л`, label: 'Результат' }];
},
  'gody-v-mesyacy': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 12;
    return [{
            value: `${value} г = ${fmtResult(result)} мес`,
            label: 'Результат'
        }];
},
  'gradusy-bome-v-procenty': ({ value }) => {
    const b = Number(value);
    // Approximate conversion: °Bé ≈ %sugar / 1.8 for low values
    // More accurate: °Bé = 145 - 145 / (specific gravity)
    // Simplified linear approximation for sugar content:
    const percent = b * 1.8;
    return [
        {
            value: `${percent.toFixed(1)}%`,
            label: 'Содержание сахара',
            unit: '%',
        },
    ];
},
  'k-v-c': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v - 273.15;
    return [{ value: `${v} K = ${r.toFixed(2)}°C`, label: 'Результат' }];
},
  'k-v-f': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = (v - 273.15) * 9 / 5 + 32;
    return [{ value: `${v} K = ${r.toFixed(2)}°F`, label: 'Результат' }];
},
  'km-ch-v-m-s': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v / 3.6;
    return [{ value: `${v} км/ч = ${r.toFixed(4)} м/с`, label: 'Результат' }];
},
  'km-ch-v-mah': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v / 1225;
    return [{ value: `${v} км/ч = ${r.toFixed(4)} Маха`, label: 'Результат' }];
},
  'km-ch-v-mil-ch': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v * 0.621371;
    return [{ value: `${v} км/ч = ${r.toFixed(4)} миль/ч`, label: 'Результат' }];
},
  'km-ch-v-uzel': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v / 1.852;
    return [{ value: `${v} км/ч = ${r.toFixed(4)} узлов`, label: 'Результат' }];
},
  'koncentraciya-v-ph': ({ value }) => {
    const ph = -Math.log10(Number(value));
    return [
        {
            value: ph.toFixed(2),
            label: 'pH',
            unit: '',
        },
    ];
},
  'konverter-obyoma': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toLiters: Record<string, number> = {
        'l': 1,
        'ml': 0.001,
        'm3': 1000,
        'cm3': 0.001,
        'gal': 3.78541,
        'qt': 0.946353,
        'pt': 0.473176,
        'cup': 0.24,
        'fl_oz': 0.0295735,
        'bbl': 158.987
    };
    const inLiters = value * toLiters[from];
    const result = inLiters / toLiters[to];
    const labels: Record<string, string> = {
        'l': 'л', 'ml': 'мл', 'm3': 'м³', 'cm3': 'см³',
        'gal': 'галлонов', 'qt': 'кварт', 'pt': 'пинт',
        'cup': 'чашек', 'fl_oz': 'жидких унций', 'bbl': 'баррелей'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'konverter-skorosti': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toMs: Record<string, number> = {
        'ms': 1,
        'kmh': 0.277778,
        'mph': 0.44704,
        'knot': 0.514444,
        'mach': 340.3, // at sea level, 15°C
        'c': 299792458,
        'fts': 0.3048
    };
    const inMs = value * toMs[from];
    const result = inMs / toMs[to];
    const labels: Record<string, string> = {
        'ms': 'м/с', 'kmh': 'км/ч', 'mph': 'миль/ч',
        'knot': 'узлов', 'mach': 'Маха',
        'c': 'c (скорость света)', 'fts': 'фт/с'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toExponential(4).replace(/\.?0+e/, 'e')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'konverter-temperatury': (inputs) => { const value = Number(inputs.value); if (!value && value !== 0) return [{ value: '—', label: 'Результат' }]; const result = (value - 32) * 5 / 9; return [{ value: value + '°F = ' + result.toFixed(2) + '°C', label: 'Результат' }]; },
  'konverter-vremeni': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value) {
        return [{ value: '—', label: 'Результат' }];
    }
    const toSeconds: Record<string, number> = {
        's': 1,
        'min': 60,
        'h': 3600,
        'd': 86400,
        'wk': 604800,
        'mo': 2629746, // average month (30.44 days)
        'y': 31556952 // average year (365.25 days)
    };
    const inSeconds = value * toSeconds[from];
    const result = inSeconds / toSeconds[to];
    const labels: Record<string, string> = {
        's': 'секунд', 'min': 'минут', 'h': 'часов',
        'd': 'дней', 'wk': 'недель', 'mo': 'месяцев', 'y': 'лет'
    };
    return [{
            value: `${value} ${labels[from]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${labels[to]}`,
            label: 'Результат'
        }];
},
  'kub-metr-v-litr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 1000;
    return [{ value: `${v} м³ = ${r.toFixed(2)} л`, label: 'Результат' }];
},
}
