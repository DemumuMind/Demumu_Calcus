import type { ComputeFn } from './compute-helpers';
import { fmtResult } from './compute-helpers';

const AU_KM = 1.496e8;
const LY_KM = 9.461e12;
const PC_KM = 3.086e13;
const MI_KM = 1.609;
const PC_LY = 3.2616;
const PC_AU = 206265;
const C_KMS = 299792.458;
const MSUN = 1.989e30;
const RSUN = 6.957e5;
const G = 6.67430e-11;
const YEAR_SECONDS = 365.25 * 24 * 3600;

const invalid = (label = 'Результат') => [{ value: '—', label }];

export const computeMap_missing_4: Record<string, ComputeFn> = {
  'konverter-svetovyh-let': (inputs) => {
    const value = Number(inputs.value);
    const fromUnit = String(inputs.fromUnit || 'ly');
    const toUnit = String(inputs.toUnit || 'pc');
    if (isNaN(value)) return invalid();

    const toKm: Record<string, number> = {
      ly: LY_KM,
      pc: PC_KM,
      au: AU_KM,
      km: 1,
      mi: MI_KM,
    };
    const labels: Record<string, string> = {
      ly: 'св. лет',
      pc: 'пк',
      au: 'а.е.',
      km: 'км',
      mi: 'миль',
    };

    const inKm = value * (toKm[fromUnit] || LY_KM);
    const result = inKm / (toKm[toUnit] || PC_KM);
    const inLightYears = inKm / LY_KM;
    const inParsecs = inKm / PC_KM;

    return [
      { value: `${value} ${labels[fromUnit]} = ${fmtResult(result)} ${labels[toUnit]}`, label: 'Результат' },
      { value: fmtResult(inLightYears), label: 'Световых лет', unit: 'ly' },
      { value: fmtResult(inParsecs), label: 'Парсеков', unit: 'pc' },
    ];
  },

  'konverter-astronomicheskih-edinic': (inputs) => {
    const au = Number(inputs.au);
    if (isNaN(au)) return invalid();

    const km = au * 149597870.7;
    const lightMinutes = au * 8.317;
    const lightHours = au * 0.1386;
    const lightDays = au * 0.00578;
    const miles = au * 92955807.3;

    return [
      { value: fmtResult(km), label: 'Километры', unit: 'км' },
      { value: fmtResult(lightMinutes), label: 'Световых минут', unit: 'мин' },
      { value: fmtResult(lightHours), label: 'Световых часов', unit: 'ч' },
      { value: fmtResult(lightDays), label: 'Световых дней', unit: 'дн' },
      { value: fmtResult(miles), label: 'Мили', unit: 'mi' },
    ];
  },

  'konverter-parsekov': (inputs) => {
    const value = Number(inputs.value);
    const unit = String(inputs.unit || 'pc');
    if (isNaN(value)) return invalid();

    const toPc: Record<string, number> = {
      pc: 1,
      kpc: 1000,
      Mpc: 1e6,
      ly: 1 / PC_LY,
    };

    const inPc = value * (toPc[unit] || 1);
    const pc = inPc;
    const kpc = inPc / 1000;
    const Mpc = inPc / 1e6;
    const ly = inPc * PC_LY;
    const au = inPc * PC_AU;

    return [
      { value: fmtResult(pc), label: 'Парсеки', unit: 'pc' },
      { value: fmtResult(kpc), label: 'Килопарсеки', unit: 'kpc' },
      { value: fmtResult(Mpc), label: 'Мегапарсеки', unit: 'Mpc' },
      { value: fmtResult(ly), label: 'Световые годы', unit: 'ly' },
      { value: fmtResult(au), label: 'Астрономические единицы', unit: 'au' },
    ];
  },

  'konverter-zvezdnoy-velichiny': (inputs) => {
    const apparentMag = Number(inputs.apparentMag);
    const distance = Number(inputs.distance);
    if (isNaN(apparentMag) || isNaN(distance) || distance <= 0) {
      return [
        invalid('Абсолютная звёздная величина'),
        { value: '—', label: 'Отношение яркости' },
        { value: '—', label: 'Светимость относительно Солнца' },
      ];
    }

    const absoluteMag = apparentMag - 5 * Math.log10(distance / 10);
    const brightnessRatio = Math.pow(10, (apparentMag - absoluteMag) / 2.5);
    const luminosity = Math.pow(10, (4.83 - absoluteMag) / 2.5);

    return [
      { value: fmtResult(absoluteMag), label: 'Абсолютная звёздная величина', unit: 'M' },
      { value: fmtResult(brightnessRatio), label: 'Отношение яркости' },
      { value: fmtResult(luminosity), label: 'Светимость относительно Солнца', unit: 'L☉' },
    ];
  },

  'konverter-kosmicheskogo-vremeni': (inputs) => {
    const timeValue = Number(inputs.timeValue);
    const timeUnit = String(inputs.timeUnit || 'seconds');
    const speed = Number(inputs.speed) || C_KMS;
    if (isNaN(timeValue)) return invalid('Пройденное расстояние');

    const toSeconds: Record<string, number> = {
      seconds: 1,
      minutes: 60,
      hours: 3600,
      days: 86400,
      years: YEAR_SECONDS,
    };

    const tSeconds = timeValue * (toSeconds[timeUnit] || 1);
    const distanceKm = speed * tSeconds;
    const distanceAu = distanceKm / AU_KM;
    const distanceLy = distanceKm / LY_KM;

    return [
      { value: fmtResult(distanceKm), label: 'Расстояние', unit: 'км' },
      { value: fmtResult(distanceAu), label: 'Расстояние в AU', unit: 'AU' },
      { value: fmtResult(distanceLy), label: 'Расстояние в св. годах', unit: 'ly' },
      { value: fmtResult(tSeconds), label: 'Время', unit: 'с' },
    ];
  },

  'konverter-krasnogo-smeshcheniya': (inputs) => {
    const z = Number(inputs.redshift);
    const calculationType = String(inputs.calculationType || 'relativistic');
    if (isNaN(z)) {
      return [
        invalid('Скорость удаления'),
        { value: '—', label: 'Скорость', unit: '% c' },
        { value: '—', label: 'Расстояние', unit: 'Мпк' },
        { value: '—', label: 'Время взгляда назад', unit: 'млрд лет' },
      ];
    }

    const c = C_KMS;
    const H0 = 70;
    let velocity = c * z;
    if (calculationType === 'relativistic') {
      const zp1 = z + 1;
      velocity = c * ((zp1 * zp1 - 1) / (zp1 * zp1 + 1));
    }
    const velocityPercent = (velocity / c) * 100;
    const distance = (z * c) / H0;
    const lookbackTime = (distance / c) * 3.26e6 / 1e9;

    return [
      { value: fmtResult(velocity), label: 'Скорость удаления', unit: 'км/с' },
      { value: fmtResult(velocityPercent), label: 'Скорость', unit: '% c' },
      { value: fmtResult(distance), label: 'Расстояние', unit: 'Мпк' },
      { value: fmtResult(lookbackTime), label: 'Время взгляда назад', unit: 'млрд лет' },
    ];
  },

  'konverter-zvezdnoy-temperatury': (inputs) => {
    const temperature = Number(inputs.temperature);
    if (isNaN(temperature) || temperature <= 0) {
      return [
        invalid('Спектральный класс'),
        { value: '—', label: 'Цвет' },
        { value: '—', label: 'Пик Вина', unit: 'нм' },
        { value: '—', label: 'Болометрическая поправка', unit: 'mag' },
      ];
    }

    const wienPeak = 2898000 / temperature;
    let spectralClass = '';
    let color = '';
    let bolometricCorrection = 0;

    if (temperature > 30000) {
      spectralClass = 'O';
      color = 'синий';
      bolometricCorrection = -3.5;
    } else if (temperature >= 10000) {
      spectralClass = 'B';
      color = 'сине-белый';
      bolometricCorrection = -2.0;
    } else if (temperature >= 7500) {
      spectralClass = 'A';
      color = 'белый';
      bolometricCorrection = -0.5;
    } else if (temperature >= 6000) {
      spectralClass = 'F';
      color = 'желто-белый';
      bolometricCorrection = -0.15;
    } else if (temperature >= 5200) {
      spectralClass = 'G';
      color = 'жёлтый';
      bolometricCorrection = -0.08;
    } else if (temperature >= 3700) {
      spectralClass = 'K';
      color = 'оранжевый';
      bolometricCorrection = -0.5;
    } else {
      spectralClass = 'M';
      color = 'красный';
      bolometricCorrection = -1.8;
    }

    return [
      { value: spectralClass, label: 'Спектральный класс' },
      { value: color, label: 'Цвет' },
      { value: fmtResult(wienPeak), label: 'Пик Вина', unit: 'нм' },
      { value: fmtResult(bolometricCorrection), label: 'Болометрическая поправка', unit: 'mag' },
    ];
  },

  'konverter-massy-i-radiusa-zvezd': (inputs) => {
    const mass = Number(inputs.mass);
    const radius = Number(inputs.radius);
    if (isNaN(mass) || isNaN(radius) || mass <= 0 || radius <= 0) {
      return [
        invalid('Масса'),
        { value: '—', label: 'Радиус', unit: 'км' },
        { value: '—', label: 'Поверхностная гравитация', unit: 'g' },
        { value: '—', label: 'Средняя плотность', unit: 'кг/м³' },
        { value: '—', label: 'Скорость убегания', unit: 'км/с' },
      ];
    }

    const massKg = mass * MSUN;
    const radiusKm = radius * RSUN;
    const surfaceGravity = mass / (radius * radius);
    const radiusM = radiusKm * 1000;
    const avgDensity = massKg / ((4 / 3) * Math.PI * Math.pow(radiusM, 3));
    const escapeVelocity = Math.sqrt((2 * G * massKg) / radiusM) / 1000;

    return [
      { value: fmtResult(massKg), label: 'Масса', unit: 'кг' },
      { value: fmtResult(radiusKm), label: 'Радиус', unit: 'км' },
      { value: fmtResult(surfaceGravity), label: 'Поверхностная гравитация', unit: 'g' },
      { value: fmtResult(avgDensity), label: 'Средняя плотность', unit: 'кг/м³' },
      { value: fmtResult(escapeVelocity), label: 'Скорость убегания', unit: 'км/с' },
    ];
  },

  'konverter-orbitalnyh-periodov': (inputs) => {
    const value = Number(inputs.value);
    const fromUnit = String(inputs.fromUnit || 'days');
    if (isNaN(value)) return invalid('Земные дни');

    const toEarthDays: Record<string, number> = {
      seconds: 1 / 86400,
      minutes: 1 / 1440,
      hours: 1 / 24,
      days: 1,
      years: 365.25,
    };

    const earthDays = value * (toEarthDays[fromUnit] || 1);
    const earthYears = earthDays / 365.25;
    const mercuryYears = earthDays / 87.97;
    const martianYears = earthDays / 687;
    const jupiterYears = earthDays / 4332.59;

    return [
      { value: fmtResult(earthDays), label: 'Земные дни', unit: 'дн' },
      { value: fmtResult(earthYears), label: 'Земные годы', unit: 'лет' },
      { value: fmtResult(mercuryYears), label: 'Годы Меркурия', unit: 'мерк. лет' },
      { value: fmtResult(martianYears), label: 'Марсианские годы', unit: 'марс. лет' },
      { value: fmtResult(jupiterYears), label: 'Годы Юпитера', unit: 'юп. лет' },
    ];
  },
};
