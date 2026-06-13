import type { ComputeFn } from './compute-helpers';
import { fmtResult } from './compute-helpers';

const toNum = (v: any): number | null => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
};

const dashResult = (label = 'Результат') => [{ value: '—', label }];

const unitConvert = (
    value: number,
    from: string,
    to: string,
    factors: Record<string, number>,
    labels: Record<string, string>
): any[] => {
    const fromFactor = factors[from];
    const toFactor = factors[to];
    if (fromFactor === undefined || toFactor === undefined) {
        return dashResult();
    }
    const result = value * fromFactor / toFactor;
    return [{ value: `${value} ${labels[from]} = ${fmtResult(result)} ${labels[to]}`, label: 'Результат' }];
};

const densityFactors: Record<string, number> = {
    'kg_m3': 1, 'kg/m³': 1,
    'g_cm3': 1000, 'g/cm³': 1000,
    'kg_l': 1000, 'kg/L': 1000,
    'lb_ft3': 16.0185, 'lb/ft³': 16.0185,
    'lb_in3': 27679.9, 'lb/in³': 27679.9,
    'lb_gal': 119.826, 'lb/gal': 119.826,
};

const densityLabels: Record<string, string> = {
    'kg_m3': 'кг/м³', 'kg/m³': 'кг/м³',
    'g_cm3': 'г/см³', 'g/cm³': 'г/см³',
    'kg_l': 'кг/л', 'kg/L': 'кг/л',
    'lb_ft3': 'фунт/фт³', 'lb/ft³': 'фунт/фт³',
    'lb_in3': 'фунт/дюйм³', 'lb/in³': 'фунт/дюйм³',
    'lb_gal': 'фунт/гал', 'lb/gal': 'фунт/гал',
};

const densityFactors2: Record<string, number> = {
    'kg_m3': 1, 'kg/m³': 1,
    'g_cm3': 1000, 'g/cm³': 1000,
    'g_ml': 1000, 'g/mL': 1000,
    'lb_ft3': 16.0185, 'lb/ft³': 16.0185,
    'oz_gal': 7.48915, 'oz/gal': 7.48915,
    'kg_l': 1000, 'kg/L': 1000,
    't_m3': 1000, 't/m³': 1000,
};

const densityLabels2: Record<string, string> = {
    'kg_m3': 'кг/м³', 'kg/m³': 'кг/м³',
    'g_cm3': 'г/см³', 'g/cm³': 'г/см³',
    'g_ml': 'г/мл', 'g/mL': 'г/мл',
    'lb_ft3': 'фунт/фт³', 'lb/ft³': 'фунт/фт³',
    'oz_gal': 'унция/гал', 'oz/gal': 'унция/гал',
    'kg_l': 'кг/л', 'kg/L': 'кг/л',
    't_m3': 'т/м³', 't/m³': 'т/м³',
};

export const computeMap_missing_5: Record<string, ComputeFn> = {
    'konverter-plotnosti': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        return unitConvert(value, from, to, densityFactors, densityLabels);
    },

    'plotnost': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        return unitConvert(value, from, to, densityFactors2, densityLabels2);
    },

    'konverter-soprotivleniya': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        const factors: Record<string, number> = {
            'Ohm': 1, 'ohm': 1,
            'kOhm': 1000, 'kohm': 1000,
            'MOhm': 1e6, 'mohm_big': 1e6, 'mohm': 1e6,
            'mOhm': 0.001,
            'uOhm': 1e-6,
            'gohm': 1e9, 'GOhm': 1e9,
        };
        const labels: Record<string, string> = {
            'Ohm': 'Ом', 'ohm': 'Ом',
            'kOhm': 'кОм', 'kohm': 'кОм',
            'MOhm': 'МОм', 'mohm_big': 'МОм', 'mohm': 'МОм',
            'mOhm': 'мОм',
            'uOhm': 'мкОм',
            'gohm': 'ГОм', 'GOhm': 'ГОм',
        };
        return unitConvert(value, from, to, factors, labels);
    },

    'konverter-vyazkosti': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        const factors: Record<string, number> = {
            'Pa·s': 1, 'Pa*s': 1, 'pa_s': 1, 'Pa∙s': 1,
            'mPa·s': 0.001, 'mPa*s': 0.001, 'mpa_s': 0.001,
            'cP': 0.001, 'cp': 0.001,
            'P': 0.1, 'poise': 0.1,
            'kg/(m·s)': 1, 'kg/(m*s)': 1, 'kg_m_s': 1,
            'st': 0.1, 'stokes': 0.1,
            'cst': 0.001, 'cSt': 0.001,
        };
        const labels: Record<string, string> = {
            'Pa·s': 'Па·с', 'Pa*s': 'Па·с', 'pa_s': 'Па·с', 'Pa∙s': 'Па·с',
            'mPa·s': 'мПа·с', 'mPa*s': 'мПа·с', 'mpa_s': 'мПа·с',
            'cP': 'сП', 'cp': 'сП',
            'P': 'П', 'poise': 'П',
            'kg/(m·s)': 'кг/(м·с)', 'kg/(m*s)': 'кг/(м·с)', 'kg_m_s': 'кг/(м·с)',
            'st': 'Ст', 'stokes': 'Ст',
            'cst': 'сСт', 'cSt': 'сСт',
        };
        return unitConvert(value, from, to, factors, labels);
    },

    'konverter-rashoda': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        const factors: Record<string, number> = {
            'm3_s': 1, 'm³/s': 1,
            'l_s': 0.001, 'L/s': 0.001,
            'l_min': 1 / 60000, 'L/min': 1 / 60000,
            'm3_h': 1 / 3600, 'm³/h': 1 / 3600,
            'gpm': 1 / 15850.3, 'gal/min': 1 / 15850.3,
            'ft3_min': 1 / 2118.88, 'ft³/min': 1 / 2118.88,
            'm3_day': 1 / 86400, 'm³/day': 1 / 86400,
            'l_h': 1 / 3600000, 'L/h': 1 / 3600000,
            'gph': 1 / 951018, 'gal/h': 1 / 951018,
        };
        const labels: Record<string, string> = {
            'm3_s': 'м³/с', 'm³/s': 'м³/с',
            'l_s': 'л/с', 'L/s': 'л/с',
            'l_min': 'л/мин', 'L/min': 'л/мин',
            'm3_h': 'м³/ч', 'm³/h': 'м³/ч',
            'gpm': 'гал/мин', 'gal/min': 'гал/мин',
            'ft3_min': 'фт³/мин', 'ft³/min': 'фт³/мин',
            'm3_day': 'м³/сут', 'm³/day': 'м³/сут',
            'l_h': 'л/ч', 'L/h': 'л/ч',
            'gph': 'гал/ч', 'gal/h': 'гал/ч',
        };
        return unitConvert(value, from, to, factors, labels);
    },

    'konverter-yarkosti': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        const factors: Record<string, number> = {
            'cd_m2': 1, 'cd/m²': 1,
            'nit': 1,
            'sb': 10000, 'stilb': 10000,
            'ftL': 10.764, 'lm/ft²': 10.764,
            'asb': 0.3183, 'apostilb': 0.3183,
        };
        const labels: Record<string, string> = {
            'cd_m2': 'кд/м²', 'cd/m²': 'кд/м²',
            'nit': 'нит',
            'sb': 'стильб', 'stilb': 'стильб',
            'ftL': 'фут-ламберт', 'lm/ft²': 'лм/фт²',
            'asb': 'апостильб', 'apostilb': 'апостильб',
        };
        return unitConvert(value, from, to, factors, labels);
    },

    'konverter-radioaktivnosti': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        const factors: Record<string, number> = {
            'Bq': 1, 'bq': 1,
            'kBq': 1000, 'kbq': 1000,
            'MBq': 1e6, 'mbq': 1e6,
            'Ci': 3.7e10, 'ci': 3.7e10,
            'mCi': 3.7e7, 'mci': 3.7e7,
            'uCi': 3.7e4, 'uci': 3.7e4,
        };
        const labels: Record<string, string> = {
            'Bq': 'Бк', 'bq': 'Бк',
            'kBq': 'кБк', 'kbq': 'кБк',
            'MBq': 'МБк', 'mbq': 'МБк',
            'Ci': 'Ки', 'ci': 'Ки',
            'mCi': 'мКи', 'mci': 'мКи',
            'uCi': 'мкКи', 'uci': 'мкКи',
        };
        return unitConvert(value, from, to, factors, labels);
    },

    'konverter-nefti': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        const product = String(inputs.product || 'crude');
        if (value === null) return dashResult();
        const density: Record<string, number> = {
            'crude': 0.88,
            'gasoline': 0.74,
            'diesel': 0.85,
            'kerosene': 0.82,
            'fuel_oil': 0.95,
        };
        const rho = density[product] ?? 0.88;
        const litersPerUnit: Record<string, number> = {
            'bbl': 158.987, 'barrels': 158.987,
            'gal': 3.78541, 'gallons': 3.78541,
            'l': 1, 'liters': 1,
            'm3': 1000, 'm³': 1000,
        };
        if ((from === 't' || from === 'tonnes') && (to === 't' || to === 'tonnes')) {
            return [{ value: `${value} т`, label: 'Результат' }];
        }
        let liters: number;
        if (from === 't' || from === 'tonnes') {
            liters = value * 1000 / rho;
        } else if (litersPerUnit[from] !== undefined) {
            liters = value * litersPerUnit[from];
        } else {
            return dashResult();
        }
        let result: number;
        let unitLabel: string;
        if (to === 't' || to === 'tonnes') {
            result = liters * rho / 1000;
            unitLabel = 'т';
        } else if (litersPerUnit[to] !== undefined) {
            result = liters / litersPerUnit[to];
            const labels: Record<string, string> = {
                'bbl': 'баррелей', 'barrels': 'баррелей',
                'gal': 'галлонов', 'gallons': 'галлонов',
                'l': 'л', 'liters': 'л',
                'm3': 'м³', 'm³': 'м³',
            };
            unitLabel = labels[to];
        } else {
            return dashResult();
        }
        return [{ value: `${value} ${from} = ${fmtResult(result)} ${unitLabel}`, label: 'Результат' }];
    },

    'elektricheskie-velichiny': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        const factors: Record<string, number> = {
            // voltage
            'V': 1, 'v': 1,
            'mV': 0.001, 'mv': 0.001,
            'kV': 1000, 'kv': 1000,
            // current
            'A': 1, 'a': 1,
            'mA': 0.001, 'ma': 0.001,
            'uA': 1e-6, 'kA': 1000,
            // power
            'W': 1, 'w': 1,
            'kW': 1000, 'kw': 1000,
            'mW': 0.001, 'MW': 1e6,
            // resistance
            'Ohm': 1, 'ohm': 1,
            'kOhm': 1000, 'kohm': 1000,
            'MOhm': 1e6, 'mohm': 1e6, 'mohm_big': 1e6,
            'mOhm': 0.001, 'uOhm': 1e-6,
            // capacitance
            'F': 1, 'f': 1,
            'uF': 1e-6, 'mf': 1e-6,
            'nF': 1e-9,
            'pF': 1e-12, 'pf': 1e-12,
            // inductance
            'H': 1, 'h': 1,
            'mH': 0.001, 'mh': 0.001,
            'uH': 1e-6, 'uh': 1e-6,
        };
        const labels: Record<string, string> = {
            'V': 'В', 'v': 'В',
            'mV': 'мВ', 'mv': 'мВ',
            'kV': 'кВ', 'kv': 'кВ',
            'A': 'А', 'a': 'А',
            'mA': 'мА', 'ma': 'мА',
            'uA': 'мкА', 'kA': 'кА',
            'W': 'Вт', 'w': 'Вт',
            'kW': 'кВт', 'kw': 'кВт',
            'mW': 'мВт', 'MW': 'МВт',
            'Ohm': 'Ом', 'ohm': 'Ом',
            'kOhm': 'кОм', 'kohm': 'кОм',
            'MOhm': 'МОм', 'mohm': 'МОм', 'mohm_big': 'МОм',
            'mOhm': 'мОм', 'uOhm': 'мкОм',
            'F': 'Ф', 'f': 'Ф',
            'uF': 'мкФ', 'mf': 'мкФ',
            'nF': 'нФ',
            'pF': 'пФ', 'pf': 'пФ',
            'H': 'Гн', 'h': 'Гн',
            'mH': 'мГн', 'mh': 'мГн',
            'uH': 'мкГн', 'uh': 'мкГн',
        };
        return unitConvert(value, from, to, factors, labels);
    },

    'konverter-uglov': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        if (value === null) return dashResult();
        const toDeg: Record<string, number> = {
            'deg': 1,
            'rad': 180 / Math.PI,
            'grad': 0.9,
            'turn': 360,
            'minute': 1 / 60,
            'second': 1 / 3600,
        };
        const factor = toDeg[from];
        if (factor === undefined) return dashResult();
        const deg = value * factor;
        return [
            { value: fmtResult(deg), label: 'Градусы', unit: 'deg' },
            { value: fmtResult(deg * Math.PI / 180), label: 'Радианы', unit: 'rad' },
            { value: fmtResult(deg / 0.9), label: 'Грады', unit: 'grad' },
            { value: fmtResult(deg / 360), label: 'Обороты', unit: 'turn' },
        ];
    },

    'konverter-chastoty': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        const factors: Record<string, number> = {
            'Hz': 1, 'hz': 1,
            'kHz': 1000, 'khz': 1000,
            'MHz': 1e6, 'mhz': 1e6,
            'GHz': 1e9, 'ghz': 1e9,
            'THz': 1e12, 'thz': 1e12,
            'rpm': 1 / 60,
            'rad/s': 1 / (2 * Math.PI), 'rad_s': 1 / (2 * Math.PI),
        };
        const labels: Record<string, string> = {
            'Hz': 'Гц', 'hz': 'Гц',
            'kHz': 'кГц', 'khz': 'кГц',
            'MHz': 'МГц', 'mhz': 'МГц',
            'GHz': 'ГГц', 'ghz': 'ГГц',
            'THz': 'ТГц', 'thz': 'ТГц',
            'rpm': 'об/мин',
            'rad/s': 'рад/с', 'rad_s': 'рад/с',
        };
        return unitConvert(value, from, to, factors, labels);
    },

    'konverter-kreposti': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        if (value === null) return dashResult();
        let abv: number | null = null;
        if (from === 'abv') abv = value;
        else if (from === 'proof_us') abv = value / 2;
        else if (from === 'proof_uk') abv = value / 1.75;
        else if (from === 'degrees') {
            const denom = 182.7 - value;
            if (denom > 0) abv = 100 * (338.2 / denom - 1);
        }
        if (abv === null || !Number.isFinite(abv)) return dashResult();
        const bome = 182.7 - 338.2 / (1 + abv / 100);
        return [
            { value: fmtResult(abv), label: 'ABV, %', unit: 'abv' },
            { value: fmtResult(abv * 2), label: 'US Proof', unit: 'proof_us' },
            { value: fmtResult(abv * 1.75), label: 'UK Proof', unit: 'proof_uk' },
            { value: fmtResult(bome), label: 'Градусы Боме', unit: 'degrees' },
        ];
    },

    'procenty-v-gradusy-bome': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        const fromNorm = from === 'procenty' ? 'abv' : from;
        const toNorm = to === 'procenty' ? 'abv' : to;
        let result: number;
        if (fromNorm === 'abv' && toNorm === 'bome') {
            result = 182.7 - 338.2 / (1 + value / 100);
        } else if (fromNorm === 'bome' && toNorm === 'abv') {
            const denom = 182.7 - value;
            if (denom <= 0) return dashResult();
            result = 100 * (338.2 / denom - 1);
        } else if (fromNorm === toNorm) {
            result = value;
        } else {
            return dashResult();
        }
        const labels: Record<string, string> = { 'abv': '% ABV / сахара', 'bome': '°Bé' };
        return [{ value: `${value} ${labels[fromNorm]} = ${fmtResult(result)} ${labels[toNorm]}`, label: 'Результат' }];
    },

    'konverter-ph': (inputs) => {
        const ph = toNum(inputs.ph);
        if (ph === null) return dashResult('Концентрация [H⁺]');
        const concentration = 10 ** (-ph);
        let description = '—';
        if (ph < 2.5) description = 'Сильно кислый';
        else if (ph < 4.5) description = 'Кислый';
        else if (ph < 6.5) description = 'Слабо кислый';
        else if (ph < 7.5) description = 'Нейтральный';
        else if (ph < 9.5) description = 'Слабо щелочной';
        else if (ph < 11.5) description = 'Щелочной';
        else description = 'Сильно щелочной';
        return [
            { value: fmtResult(concentration), label: '[H⁺] моль/л', unit: 'concentration' },
            { value: description, label: 'Характер среды', unit: 'description' },
            { value: 'лимонный сок ~2, кофе ~5, кровь ~7.4, мыло ~10, отбеливатель ~12.5', label: 'Примеры', unit: 'examples' },
        ];
    },

    'ph-v-koncentraciyu': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult();
        const toPh = (v: number, unit: string): number => {
            if (unit === 'ph') return v;
            if (unit === 'poh') return 14 - v;
            if (unit === 'h_plus' || unit === 'koncentraciya') return -Math.log10(v);
            if (unit === 'oh_minus') return 14 + Math.log10(v);
            return NaN;
        };
        const fromPh = (ph: number, unit: string): number => {
            if (unit === 'ph') return ph;
            if (unit === 'poh') return 14 - ph;
            if (unit === 'h_plus' || unit === 'koncentraciya') return 10 ** (-ph);
            if (unit === 'oh_minus') return 10 ** (ph - 14);
            return NaN;
        };
        const ph = toPh(value, from);
        if (!Number.isFinite(ph)) return dashResult();
        const result = fromPh(ph, to);
        if (!Number.isFinite(result)) return dashResult();
        const labels: Record<string, string> = {
            'ph': 'pH',
            'poh': 'pOH',
            'h_plus': '[H⁺], моль/л',
            'koncentraciya': '[H⁺], моль/л',
            'oh_minus': '[OH⁻], моль/л',
        };
        return [{ value: `${value} ${labels[from]} = ${fmtResult(result)} ${labels[to]}`, label: 'Результат' }];
    },

    'konverter-koncentracii': (inputs) => {
        const massSolute = toNum(inputs.massSolute);
        const molarMass = toNum(inputs.molarMass);
        const massSolution = toNum(inputs.massSolution);
        const volumeSolution = toNum(inputs.volumeSolution);
        if (massSolute === null || molarMass === null || massSolution === null || volumeSolution === null) {
            return dashResult('Массовая доля, %');
        }
        if (massSolution <= 0 || molarMass <= 0 || volumeSolution <= 0 || massSolute > massSolution) {
            return dashResult('Массовая доля, %');
        }
        const molesSolute = massSolute / molarMass;
        const massSolventKg = (massSolution - massSolute) / 1000;
        const massPercent = massSolute / massSolution * 100;
        const molarity = molesSolute / volumeSolution;
        const molality = massSolventKg > 0 ? molesSolute / massSolventKg : 0;
        const waterMolarMass = 18.015;
        const molesSolvent = (massSolution - massSolute) / waterMolarMass;
        const moleFraction = molesSolvent >= 0 ? molesSolute / (molesSolute + molesSolvent) : 0;
        return [
            { value: fmtResult(massPercent), label: 'Массовая доля, %', unit: 'massPercent' },
            { value: fmtResult(molarity), label: 'Молярность, моль/л', unit: 'molarity' },
            { value: fmtResult(molality), label: 'Моляльность, моль/кг', unit: 'molality' },
            { value: fmtResult(moleFraction), label: 'Мольная доля', unit: 'moleFraction' },
        ];
    },

    'vysota-v-davlenie': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult('Давление');
        const heightToMeters: Record<string, number> = {
            'm': 1,
            'km': 1000,
            'cm': 0.01,
            'mm': 0.001,
            'ft': 0.3048,
            'in': 0.0254,
            'mile': 1609.344,
        };
        const pressureUnits: Record<string, number> = {
            'pa': 1,
            'kpa': 1000,
            'mpa': 1e6,
            'bar': 1e5,
            'mbar': 100,
            'atm': 101325,
            'mmhg': 133.322,
            'torr': 133.322,
            'hpa': 100,
        };
        const hMeters = value * (heightToMeters[from] ?? 1);
        const pPa = 101325 * (1 - 2.25577e-5 * hMeters) ** 5.25588;
        const mmHg = pPa * 0.00750062;
        const percent = pPa / 101325 * 100;
        let result: number;
        let label: string;
        if (to === 'percent') {
            result = percent;
            label = '%';
        } else if (pressureUnits[to] !== undefined) {
            result = pPa / pressureUnits[to];
            label = to;
        } else {
            result = pPa;
            label = 'pa';
        }
        return [
            { value: fmtResult(result), label: `Давление, ${label}`, unit: 'result' },
            { value: fmtResult(mmHg), label: 'Давление, мм рт.ст.', unit: 'mmHg' },
            { value: fmtResult(percent), label: '% от уровня моря', unit: 'percent' },
        ];
    },

    'davlenie-v-vysotu': (inputs) => {
        const value = toNum(inputs.value);
        const from = String(inputs.from);
        const to = String(inputs.to);
        if (value === null) return dashResult('Высота');
        const pressureUnits: Record<string, number> = {
            'pa': 1,
            'kpa': 1000,
            'mpa': 1e6,
            'bar': 1e5,
            'mbar': 100,
            'atm': 101325,
            'mmhg': 133.322,
            'torr': 133.322,
            'hpa': 100,
        };
        const heightToMeters: Record<string, number> = {
            'm': 1,
            'km': 1000,
            'cm': 0.01,
            'mm': 0.001,
            'ft': 0.3048,
            'in': 0.0254,
            'mile': 1609.344,
        };
        const pPa = value * (pressureUnits[from] ?? 1);
        const percent = pPa / 101325 * 100;
        let hMeters: number;
        if (pPa <= 0 || pPa > 101325) {
            hMeters = 0;
        } else {
            hMeters = (1 - (pPa / 101325) ** (1 / 5.25588)) / 2.25577e-5;
        }
        const result = hMeters / (heightToMeters[to] ?? 1);
        return [
            { value: fmtResult(result), label: `Высота, ${to}`, unit: 'result' },
            { value: fmtResult(percent), label: '% от уровня моря', unit: 'percent' },
        ];
    },

  'khimicheskie-edinicy': (inputs) => {
    const value = toNum(inputs.value);
    if (value === null) return [{ value: '\u2014', label: 'Результат' }];
    const from = String(inputs.from || 'mol');
    const to = String(inputs.to || 'mmol');

    const toMol: Record<string, number> = {
      'mol': 1, 'mmol': 0.001, 'umol': 1e-6, 'nmol': 1e-9,
      'kmol': 1000, 'lb-mol': 453.59237, 'g-mol': 1,
    };
    const fromF = toMol[from] ?? 1;
    const toF = toMol[to] ?? 1;
    const result = value * fromF / toF;
    return [{ value: `${value} ${from} = ${fmtResult(result)} ${to}`, label: 'Результат' }];
  },
};
