import type { ComputeFn } from './compute-helpers';
import { fmtResult } from './compute-helpers';

export const computeMap_temp_speed_b: Record<string, ComputeFn> = {
  'kvart-v-litr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 0.946353;
    return [{ value: `${v} кварт = ${r.toFixed(4)} л`, label: 'Результат' }];
},
  'litr-v-barrel': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 158.987;
    return [{ value: `${v} л = ${r.toFixed(4)} баррелей`, label: 'Результат' }];
},
  'litr-v-gallon': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 3.78541;
    return [{ value: `${v} л = ${r.toFixed(4)} гал (US)`, label: 'Результат' }];
},
  'litr-v-kub-metr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 1000;
    return [{ value: `${v} л = ${r.toFixed(4)} м³`, label: 'Результат' }];
},
  'litr-v-kvart': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 0.946353;
    return [{ value: `${v} л = ${r.toFixed(4)} кварт`, label: 'Результат' }];
},
  'litr-v-ml': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 1000;
    return [{ value: `${v} л = ${r.toFixed(2)} мл`, label: 'Результат' }];
},
  'litr-v-pinta': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 0.473176;
    return [{ value: `${v} л = ${r.toFixed(4)} пинт`, label: 'Результат' }];
},
  'm-s-v-km-ch': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v * 3.6;
    return [{ value: `${v} м/с = ${r.toFixed(4)} км/ч`, label: 'Результат' }];
},
  'mah-v-km-ch': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v * 1225;
    return [{ value: `${v} Маха = ${r.toFixed(2)} км/ч`, label: 'Результат' }];
},
  'mesyacy-v-dni': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 30.4375;
    return [{
            value: `${value} мес = ${fmtResult(result)} дн`,
            label: 'Результат'
        }];
},
  'mesyacy-v-gody': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.08333333333333333;
    return [{
            value: `${value} мес = ${fmtResult(result)} г`,
            label: 'Результат'
        }];
},
  'mil-ch-v-km-ch': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v * 1.60934;
    return [{ value: `${v} миль/ч = ${r.toFixed(4)} км/ч`, label: 'Результат' }];
},
  'minuty-v-chasy': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.016666666666666666;
    return [{
            value: `${value} мин = ${fmtResult(result)} ч`,
            label: 'Результат'
        }];
},
  'minuty-v-sekundy': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 60;
    return [{
            value: `${value} мин = ${fmtResult(result)} с`,
            label: 'Результат'
        }];
},
  'ml-v-chaynaya-lozhka': ({ value }) => {
    const result = Number(value) / 5;
    return [{ value: `${result.toFixed(1)} ч.л.`, label: 'Чайные ложки', unit: 'ч.л.' }];
},
  'ml-v-litr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 1000;
    return [{ value: `${v} мл = ${r.toFixed(4)} л`, label: 'Результат' }];
},
  'ml-v-ryumka': ({ value }) => {
    const result = Number(value) / 50;
    return [{ value: `${result.toFixed(1)} рюмки`, label: 'Рюмки', unit: 'рюмки' }];
},
  'ml-v-stakan': ({ value }) => {
    const result = Number(value) / 250;
    return [{ value: `${result.toFixed(2)} стакана`, label: 'Стаканы', unit: 'стакана' }];
},
  'ml-v-stolovaya-lozhka': ({ value }) => {
    const result = Number(value) / 15;
    return [{ value: `${result.toFixed(1)} ст.л.`, label: 'Столовые ложки', unit: 'ст.л.' }];
},
  'ml-v-zhidk-unciya': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v / 29.5735;
    return [{ value: `${v} мл = ${r.toFixed(4)} fl oz`, label: 'Результат' }];
},
  'nedeli-v-dni': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 7;
    return [{
            value: `${value} нед = ${fmtResult(result)} дн`,
            label: 'Результат'
        }];
},
  'pinta-v-litr': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 0.473176;
    return [{ value: `${v} пинт = ${r.toFixed(4)} л`, label: 'Результат' }];
},
  're-v-c': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v * 5 / 4;
    return [{ value: `${v}°Re = ${r.toFixed(2)}°C`, label: 'Результат' }];
},
  'rgb-v-cmyk': ({ r, g, b }) => {
    const rr = r / 255;
    const gg = g / 255;
    const bb = b / 255;
    const k = 1 - Math.max(rr, gg, bb);
    const c = k === 1 ? 0 : (1 - rr - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - gg - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - bb - k) / (1 - k);
    return [
        {
            value: `CMYK(${Math.round(c * 100)}, ${Math.round(m * 100)}, ${Math.round(y * 100)}, ${Math.round(k * 100)})`,
            label: 'CMYK',
            unit: '%',
        },
    ];
},
  'rgb-v-hex': ({ r, g, b }) => {
    const toHex = (n: number) => {
        const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    return [{ value: hex, label: 'HEX-код', unit: '' }];
},
  'rgb-v-hsv': ({ r, g, b }) => {
    const rr = r / 255;
    const gg = g / 255;
    const bb = b / 255;
    const max = Math.max(rr, gg, bb);
    const min = Math.min(rr, gg, bb);
    const v = max;
    const s = max === 0 ? 0 : (max - min) / max;
    let h = 0;
    if (max !== min) {
        if (max === rr)
            h = ((gg - bb) / (max - min) + 6) % 6;
        else if (max === gg)
            h = (bb - rr) / (max - min) + 2;
        else
            h = (rr - gg) / (max - min) + 4;
        h *= 60;
    }
    return [
        {
            value: `HSV(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`,
            label: 'HSV',
            unit: '',
        },
    ];
},
  'rokvell-v-brinell': ({ value }) => {
    const hrc = Number(value);
    // Inverse of the approximate formula: HB ≈ (HRC + 2.5) * 10
    const hb = (hrc + 2.5) * 10;
    return [
        {
            value: `${hb.toFixed(0)} HB`,
            label: 'Твёрдость по Бринеллю',
            unit: 'HB',
        },
    ];
},
  'ryumka-v-ml': ({ value }) => {
    const result = Number(value) * 50;
    return [{ value: `${result} мл`, label: 'Объём', unit: 'мл' }];
},
  'sekundy-v-minuty': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 0.016666666666666666;
    return [{
            value: `${value} с = ${fmtResult(result)} мин`,
            label: 'Результат'
        }];
},
  'temperatura-vypechki': (inputs) => {
    const temp = Number(inputs.temperature);
    const scale = String(inputs.scale);
    if (!temp) {
        return [
            { value: '—', label: '°C' },
            { value: '—', label: '°F' },
            { value: '—', label: 'Gas Mark' },
            { value: '', label: 'Описание' }
        ];
    }
    let celsius = temp;
    if (scale === 'fahrenheit') {
        celsius = (temp - 32) * 5 / 9;
    }
    else if (scale === 'gas') {
        celsius = (temp * 14) + 121;
    }
    const fahrenheit = (celsius * 9 / 5) + 32;
    let gasMarkNum = Math.round((celsius - 121) / 14);
    let gasMark: string;
    if (gasMarkNum < 1)
        gasMark = '< 1';
    else if (gasMarkNum > 9)
        gasMark = '> 9';
    else
        gasMark = String(gasMarkNum);
    let description = '';
    if (celsius < 100)
        description = 'Очень низкая температура (сушка, томление)';
    else if (celsius < 150)
        description = 'Низкая температура (сушка фруктов)';
    else if (celsius < 180)
        description = 'Умеренная температура (выпечка кексов, печенья)';
    else if (celsius < 200)
        description = 'Средняя температура (пироги, торты, рыба)';
    else if (celsius < 230)
        description = 'Высокая температура (хлеб, пицца)';
    else
        description = 'Очень высокая температура (запекание мяса)';
    return [
        { value: Math.round(celsius), label: '°C' },
        { value: Math.round(fahrenheit), label: '°F' },
        { value: gasMark, label: 'Gas Mark' },
        { value: description, label: 'Описание' }
    ];
},
  'uzel-v-km-ch': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v))
        return [{ value: '—', label: 'Результат' }];
    const r = v * 1.852;
    return [{ value: `${v} узлов = ${r.toFixed(4)} км/ч`, label: 'Результат' }];
},
  'vremya-rasshirennoe': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const toSeconds: Record<string, number> = {
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        month: 2592000, // 30 days
        year: 31536000, // 365 days
        decade: 315360000,
        century: 3153600000,
        millennium: 31536000000
    };
    const seconds = value * toSeconds[from];
    const result = seconds / toSeconds[to];
    const unitLabels: Record<string, string> = {
        second: 'секунд',
        minute: 'минут',
        hour: 'часов',
        day: 'дней',
        week: 'недель',
        month: 'месяцев',
        year: 'лет',
        decade: 'декад',
        century: 'веков',
        millennium: 'тысячелетий'
    };
    let formattedResult: string;
    if (result >= 1000000000) {
        formattedResult = result.toExponential(3);
    }
    else if (result >= 1) {
        formattedResult = String(Math.round(result * 100) / 100);
    }
    else {
        formattedResult = result.toExponential(3);
    }
    return [{
            value: `${value} ${unitLabels[from]} = ${formattedResult} ${unitLabels[to]}`,
            label: 'Результат'
        }];
},
  'zhidk-unciya-v-ml': (inputs) => {
    const v = Number(inputs.value);
    if (isNaN(v) || v < 0)
        return [{ value: '—', label: 'Результат' }];
    const r = v * 29.5735;
    return [{ value: `${v} fl oz = ${r.toFixed(2)} мл`, label: 'Результат' }];
},
}
