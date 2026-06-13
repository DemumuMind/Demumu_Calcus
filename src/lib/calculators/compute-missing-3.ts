import type { ComputeFn } from './compute-helpers';
import {
  braEU2USBand,
  braRU2USBand,
  braUS2EUBand,
  braUS2RUBand,
  kidsShoesEU2US,
  kidsShoesUS2EU,
  ringRU2US,
  ringUS2RU,
} from './compute-helpers';

const n = (v: any): number => {
  const num = Number(v);
  return Number.isNaN(num) ? 0 : num;
};

const trimNum = (num: number, digits = 4): string => {
  if (!Number.isFinite(num)) return '—';
  let s = num.toFixed(digits);
  s = s.replace(/\.?0+$/, '');
  return s || '0';
};

const toHalf = (num: number): string => {
  const rounded = Math.round(num * 2) / 2;
  return String(rounded).replace(/\.5$/, '.5').replace(/\.0$/, '');
};

// ============================ ИСТОРИЧЕСКИЕ МЕРЫ ============================

export const computeMap_missing_3: Record<string, ComputeFn> = {
  'drevnerusskie-mery-dliny': (inputs) => {
    const arshin = n(inputs.arshin);
    const vershok = n(inputs.vershok);
    const sazhen = n(inputs.sazhen);
    const lokot = n(inputs.lokot);
    const meters = arshin * 0.7112 + vershok * 0.04445 + sazhen * 2.1336 + lokot * 0.508;
    const centimeters = meters * 100;
    return [
      { value: meters, label: 'Метры', unit: 'м' },
      { value: centimeters, label: 'Сантиметры', unit: 'см' },
      {
        value: `Суммарная длина: ${trimNum(meters)} м (${trimNum(centimeters)} см)`,
        label: 'Описание',
      },
    ];
  },

  'drevnerusskie-mery-vesa': (inputs) => {
    const pud = n(inputs.pud);
    const funt = n(inputs.funt);
    const zolotnik = n(inputs.zolotnik);
    const kilograms = pud * 16.381 + funt * 0.409512 + zolotnik * 0.004266;
    const grams = kilograms * 1000;
    return [
      { value: kilograms, label: 'Килограммы', unit: 'кг' },
      { value: grams, label: 'Граммы', unit: 'г' },
      {
        value: `Суммарный вес: ${trimNum(kilograms)} кг (${trimNum(grams)} г)`,
        label: 'Описание',
      },
    ];
  },

  'drevnerusskie-mery-obema': (inputs) => {
    const vedro = n(inputs.vedro);
    const chetverik = n(inputs.chetverik);
    const garnec = n(inputs.garnec);
    const shtof = n(inputs.shtof);
    const liters = vedro * 12.299 + chetverik * 26.239 + garnec * 3.2798 + shtof * 1.2299;
    return [
      { value: liters, label: 'Литры', unit: 'л' },
      {
        value: `Суммарный объём: ${trimNum(liters)} л`,
        label: 'Описание',
      },
    ];
  },

  'antichnye-mery': (inputs) => {
    const stadium = n(inputs.stadium);
    const romanMile = n(inputs.romanMile);
    const pes = n(inputs.pes);
    const cubit = n(inputs.cubit);
    const meters = stadium * 185 + romanMile * 1480 + pes * 0.296 + cubit * 0.444;
    const kilometers = meters / 1000;
    return [
      { value: meters, label: 'Метры', unit: 'м' },
      { value: kilometers, label: 'Километры', unit: 'км' },
      {
        value: `Суммарная длина: ${trimNum(meters)} м (${trimNum(kilometers)} км)`,
        label: 'Описание',
      },
    ];
  },

  'angliyskie-mery-dliny': (inputs) => {
    const inches = n(inputs.inches);
    const feet = n(inputs.feet);
    const yards = n(inputs.yards);
    const miles = n(inputs.miles);
    const fathoms = n(inputs.fathoms);
    const meters = inches * 0.0254 + feet * 0.3048 + yards * 0.9144 + miles * 1609.344 + fathoms * 1.8288;
    const kilometers = meters / 1000;
    return [
      { value: meters, label: 'Метры', unit: 'м' },
      { value: kilometers, label: 'Километры', unit: 'км' },
      {
        value: `Суммарная длина: ${trimNum(meters)} м (${trimNum(kilometers)} км)`,
        label: 'Описание',
      },
    ];
  },

  'angliyskie-mery-vesa': (inputs) => {
    const ounces = n(inputs.ounces);
    const pounds = n(inputs.pounds);
    const stones = n(inputs.stones);
    const hundredweight = n(inputs.hundredweight);
    const kilograms = ounces * 0.02835 + pounds * 0.453592 + stones * 6.35029 + hundredweight * 50.8023;
    const grams = kilograms * 1000;
    return [
      { value: kilograms, label: 'Килограммы', unit: 'кг' },
      { value: grams, label: 'Граммы', unit: 'г' },
      {
        value: `Суммарный вес: ${trimNum(kilograms)} кг (${trimNum(grams)} г)`,
        label: 'Описание',
      },
    ];
  },

  'istoricheskie-mery-ploshadi': (inputs) => {
    const dessiatin = n(inputs.dessiatin);
    const acre = n(inputs.acre);
    const hectare = n(inputs.hectare);
    const are = n(inputs.are);
    const squareMeters = dessiatin * 10925.4 + acre * 4046.86 + hectare * 10000 + are * 100;
    const squareKilometers = squareMeters / 1_000_000;
    const hectares = squareMeters / 10000;
    const comparison = `≈ ${trimNum(hectares)} га / ${trimNum(squareKilometers)} км²`;
    return [
      { value: squareMeters, label: 'Квадратные метры', unit: 'м²' },
      { value: squareKilometers, label: 'Квадратные километры', unit: 'км²' },
      { value: hectares, label: 'Гектары', unit: 'га' },
      { value: comparison, label: 'Сравнение' },
    ];
  },

  // ============================ РАЗМЕРЫ ОДЕЖДЫ/ОБУВИ ============================

  'konverter-razmerov-odezhdy': (inputs) => {
    const size = String(inputs.size || 'm').toLowerCase();
    const gender = String(inputs.gender || 'women').toLowerCase();

    const women: Record<string, { us: string; uk: string; eu: string; ru: string; jp: string; cn: string }> = {
      xs: { us: '0–2', uk: '4–6', eu: '32–34', ru: '40–42', jp: '5–7', cn: '160/84A' },
      s: { us: '4–6', uk: '8–10', eu: '36–38', ru: '44–46', jp: '9–11', cn: '165/88A' },
      m: { us: '8–10', uk: '12–14', eu: '40–42', ru: '48–50', jp: '13–15', cn: '170/92A' },
      l: { us: '12–14', uk: '16–18', eu: '44–46', ru: '52–54', jp: '17–19', cn: '175/96A' },
      xl: { us: '16–18', uk: '20–22', eu: '48–50', ru: '56–58', jp: '21–23', cn: '180/100A' },
      xxl: { us: '20–22', uk: '24–26', eu: '52–54', ru: '60–62', jp: '25–27', cn: '185/104A' },
    };

    const men: Record<string, { us: string; uk: string; eu: string; ru: string; jp: string; cn: string }> = {
      xs: { us: '30–32', uk: '30–32', eu: '42–44', ru: '44–46', jp: 'SS', cn: '165/84A' },
      s: { us: '34–36', uk: '34–36', eu: '46–48', ru: '48–50', jp: 'S', cn: '170/88A' },
      m: { us: '38–40', uk: '38–40', eu: '50–52', ru: '52–54', jp: 'M', cn: '175/92A' },
      l: { us: '42–44', uk: '42–44', eu: '54–56', ru: '56–58', jp: 'L', cn: '180/96A' },
      xl: { us: '46–48', uk: '46–48', eu: '58–60', ru: '60–62', jp: 'LL', cn: '185/100A' },
      xxl: { us: '50–52', uk: '50–52', eu: '62–64', ru: '64–66', jp: '3L', cn: '190/104A' },
    };

    const map = gender === 'men' ? men : women;
    const r = map[size] || map.m;
    return [
      { value: r.us, label: 'США' },
      { value: r.uk, label: 'Великобритания' },
      { value: r.eu, label: 'Европа (EU)' },
      { value: r.ru, label: 'Россия' },
      { value: r.jp, label: 'Япония' },
      { value: r.cn, label: 'Китай' },
    ];
  },

  'konverter-razmerov-obuvi': (inputs) => {
    const size = n(inputs.fromValue);
    const us = size - 33 + 1.5;
    const uk = size - 33 + 0.5;
    const ru = size - 1.5;
    return [
      {
        value: `US ≈ ${toHalf(us)}, UK ≈ ${toHalf(uk)}, RU ≈ ${toHalf(ru)}`,
        label: 'Результат',
      },
    ];
  },

  'konverter-detskoj-obuvi': (inputs) => {
    const size = n(inputs.size);
    const system = String(inputs.system || 'eu').toLowerCase();

    const euToUkMap: Record<string, string> = {
      '16': '0', '17': '0.5', '18': '1', '19': '1.5', '20': '2', '21': '2.5', '22': '3',
      '23': '3.5', '24': '4', '25': '4.5', '26': '5', '27': '5.5', '28': '6', '29': '6.5',
      '30': '7', '31': '7.5', '32': '8', '33': '8.5', '34': '9', '35': '9.5', '36': '10', '37': '10.5',
    };
    const ukToEuMap: Record<string, string> = {};
    Object.entries(euToUkMap).forEach(([eu, uk]) => { ukToEuMap[uk] = eu; });

    let eu = 0;
    let cm = 0;

    if (system === 'eu' || system === 'ru') {
      eu = Math.round(size);
      cm = (eu + 1.5) * 2 / 3;
    } else if (system === 'us') {
      const euVal = kidsShoesUS2EU[String(size)];
      if (euVal) {
        eu = Number(euVal);
        cm = (eu + 1.5) * 2 / 3;
      } else {
        cm = (size + 11.5) * 2 / 3;
        eu = Math.round(cm * 1.5 - 1.5);
      }
    } else if (system === 'uk') {
      const euVal = ukToEuMap[String(size)];
      if (euVal) {
        eu = Number(euVal);
        cm = (eu + 1.5) * 2 / 3;
      } else {
        cm = (size + 12) * 2 / 3;
        eu = Math.round(cm * 1.5 - 1.5);
      }
    } else if (system === 'jp') {
      cm = size / 10;
      eu = Math.round(cm * 1.5 - 1.5);
    } else if (system === 'cm') {
      cm = size;
      eu = Math.round(cm * 1.5 - 1.5);
    }

    const euKey = String(eu);
    const usVal = kidsShoesEU2US[euKey] || toHalf(cm * 1.5 - 11.5);
    const ukVal = euToUkMap[euKey] || toHalf(cm * 1.5 - 12);
    const jpVal = Math.round(cm * 10);
    const ruVal = euKey;

    const ageTable: Record<string, { ageGroup: string; monthRange: string }> = {
      '16': { ageGroup: 'Новорождённые', monthRange: '0–3 мес' },
      '17': { ageGroup: 'Новорождённые', monthRange: '0–3 мес' },
      '18': { ageGroup: 'Младенцы', monthRange: '3–6 мес' },
      '19': { ageGroup: 'Младенцы', monthRange: '3–6 мес' },
      '20': { ageGroup: 'Младенцы', monthRange: '6–9 мес' },
      '21': { ageGroup: 'Младенцы', monthRange: '6–9 мес' },
      '22': { ageGroup: 'Ползуны', monthRange: '9–12 мес' },
      '23': { ageGroup: 'Ползуны', monthRange: '9–12 мес' },
      '24': { ageGroup: 'Ползуны', monthRange: '12–18 мес' },
      '25': { ageGroup: 'Ползуны', monthRange: '12–18 мес' },
      '26': { ageGroup: 'Малыши', monthRange: '18–24 мес' },
      '27': { ageGroup: 'Малыши', monthRange: '18–24 мес' },
      '28': { ageGroup: 'Малыши', monthRange: '2–3 г' },
      '29': { ageGroup: 'Малыши', monthRange: '2–3 г' },
      '30': { ageGroup: 'Дошкольники', monthRange: '3–4 г' },
      '31': { ageGroup: 'Дошкольники', monthRange: '3–4 г' },
      '32': { ageGroup: 'Дошкольники', monthRange: '4–5 г' },
      '33': { ageGroup: 'Дошкольники', monthRange: '4–5 г' },
      '34': { ageGroup: 'Дошкольники', monthRange: '5–6 г' },
      '35': { ageGroup: 'Дошкольники', monthRange: '5–6 г' },
      '36': { ageGroup: 'Подростки', monthRange: '6–7 г' },
      '37': { ageGroup: 'Подростки', monthRange: '6–7 г' },
    };
    const age = ageTable[euKey] || { ageGroup: 'Уточните размер', monthRange: '—' };

    return [
      { value: euKey, label: 'Европа (EU)' },
      { value: String(usVal), label: 'США' },
      { value: String(ukVal), label: 'Великобритания' },
      { value: ruVal, label: 'Россия' },
      { value: String(jpVal), label: 'Япония (мм)' },
      { value: trimNum(cm, 2), label: 'Длина стопы (см)' },
      { value: age.ageGroup, label: 'Возрастная группа' },
      { value: age.monthRange, label: 'Примерный возраст' },
    ];
  },

  'detskiy-razmer-obuvi-eu-v-us': (inputs) => {
    const value = String(inputs.value);
    return [{ value: kidsShoesEU2US[value] || 'Неизвестный размер', label: 'Размер US' }];
  },

  'detskiy-razmer-obuvi-us-v-eu': (inputs) => {
    const value = String(inputs.value);
    return [{ value: kidsShoesUS2EU[value] || 'Неизвестный размер', label: 'Размер EU' }];
  },

  // ============================ РАЗМЕРЫ КОЛЕЦ ============================

  'konverter-razmerov-kolec': (inputs) => {
    const size = n(inputs.size);
    const system = String(inputs.system || 'us').toLowerCase();

    const usToUkLetter: Record<string, string> = {
      '4': 'H', '4.5': 'H½', '5': 'I½', '5.5': 'J', '6': 'J½', '6.5': 'K', '7': 'L',
      '7.5': 'M', '8': 'N', '8.5': 'O', '9': 'P', '9.5': 'Q', '10': 'R', '10.5': 'S',
      '11': 'T', '11.5': 'U', '12': 'V', '12.5': 'W', '13': 'X',
    };

    let circumference = 0;
    let diameter = 0;
    let usSize = '';

    if (system === 'us') {
      const ru = ringUS2RU[String(size)];
      if (ru) {
        diameter = Number(ru);
        circumference = diameter * Math.PI;
        usSize = String(size);
      } else {
        usSize = String(size);
        circumference = (size - 1) * 2.55 + 36.5;
        diameter = circumference / Math.PI;
      }
    } else if (system === 'ru') {
      diameter = size;
      circumference = size * Math.PI;
      usSize = ringRU2US[String(size)] || toHalf((circumference - 36.5) / 2.55 + 1);
    } else if (system === 'eu' || system === 'jp' || system === 'ch') {
      circumference = size;
      diameter = circumference / Math.PI;
      usSize = toHalf((circumference - 36.5) / 2.55 + 1);
    } else {
      // fallback
      circumference = size * Math.PI;
      diameter = size;
      usSize = toHalf(size);
    }

    const uk = usToUkLetter[usSize] || toHalf((circumference - 37.5) / 2.5);
    return [
      { value: usSize, label: 'США / Канада' },
      { value: uk, label: 'Великобритания / AU / NZ' },
      { value: trimNum(circumference, 2), label: 'Европа (мм)' },
      { value: trimNum(circumference, 2), label: 'Япония / Китай' },
      { value: trimNum(circumference, 2), label: 'Швейцария' },
      { value: trimNum(circumference, 2), label: 'Окружность (мм)' },
      { value: trimNum(diameter, 2), label: 'Диаметр (мм)' },
    ];
  },

  'razmer-koltsa-ru-v-us': (inputs) => {
    const value = String(inputs.value);
    return [{ value: ringRU2US[value] || 'Неизвестный размер', label: 'Размер US' }];
  },

  'razmer-koltsa-us-v-ru': (inputs) => {
    const value = String(inputs.value);
    return [{ value: ringUS2RU[value] || 'Неизвестный размер', label: 'Размер RU (мм)' }];
  },

  // ============================ РАЗМЕРЫ БЮСТГАЛЬТЕРОВ ============================

  'konverter-razmerov-byustgaltera': (inputs) => {
    const bandSize = String(inputs.bandSize);
    const bandSystem = String(inputs.bandSystem || 'eu').toLowerCase();
    const cup = String(inputs.cupSize || 'B').toUpperCase();

    const euToUsCup: Record<string, string> = {
      AA: 'AA', A: 'A', B: 'B', C: 'C', D: 'D', DD: 'DD', E: 'DD', F: 'E', G: 'F', H: 'G',
    };
    const usToEuCup: Record<string, string> = {
      AA: 'AA', A: 'A', B: 'B', C: 'C', D: 'D', DD: 'E', E: 'F', F: 'G', G: 'H', H: 'I',
    };

    let euBand = '';
    let usBand = '';
    let frBand = '';
    let auBand = '';

    if (bandSystem === 'eu' || bandSystem === 'ru') {
      euBand = bandSize;
      usBand = braEU2USBand[euBand] || String(Math.round(Number(euBand) / 2.54));
      frBand = String(Number(euBand) + 15);
      auBand = String(Number(usBand) - 22);
    } else if (bandSystem === 'us' || bandSystem === 'uk') {
      usBand = bandSize;
      euBand = braUS2EUBand[usBand] || String(Math.round(Number(usBand) * 2.54));
      frBand = String(Number(euBand) + 15);
      auBand = String(Number(usBand) - 22);
    } else if (bandSystem === 'fr') {
      euBand = String(Number(bandSize) - 15);
      usBand = braEU2USBand[euBand] || String(Math.round(Number(euBand) / 2.54));
      frBand = bandSize;
      auBand = String(Number(usBand) - 22);
    } else if (bandSystem === 'it') {
      euBand = String(60 + Number(bandSize) * 5);
      usBand = braEU2USBand[euBand] || String(Math.round(Number(euBand) / 2.54));
      frBand = String(Number(euBand) + 15);
      auBand = String(Number(usBand) - 22);
    } else if (bandSystem === 'au') {
      usBand = String(Number(bandSize) + 22);
      euBand = braUS2EUBand[usBand] || String(Math.round(Number(usBand) * 2.54));
      frBand = String(Number(euBand) + 15);
      auBand = bandSize;
    }

    const isUsLike = bandSystem === 'us' || bandSystem === 'uk' || bandSystem === 'au';
    const usCup = isUsLike ? cup : euToUsCup[cup] || cup;
    const euCup = isUsLike ? usToEuCup[cup] || cup : cup;
    const ukCup = usCup;
    const frCup = euCup;
    const jpCup = euCup;
    const auCup = usCup;

    return [
      { value: `${euBand}${euCup}`, label: 'Европа / Россия' },
      { value: `${usBand}${usCup}`, label: 'США / Канада' },
      { value: `${usBand}${ukCup}`, label: 'Великобритания' },
      { value: `${frBand}${frCup}`, label: 'Франция / Бельгия' },
      { value: `${euBand}${jpCup}`, label: 'Япония' },
      { value: `${auBand}${auCup}`, label: 'Австралия / Новая Зеландия' },
    ];
  },

  'razmer-byustgaltera-eu-v-us': (inputs) => {
    const value = String(inputs.value);
    const cup = String(inputs.cup || 'B').toUpperCase();
    const euToUsCup: Record<string, string> = { A: 'A', B: 'B', C: 'C', D: 'D', E: 'DD', F: 'E' };
    const usBand = braEU2USBand[value] || '?';
    return [{ value: `${usBand}${euToUsCup[cup] || cup}`, label: 'Размер US' }];
  },

  'razmer-byustgaltera-us-v-eu': (inputs) => {
    const value = String(inputs.value);
    const cup = String(inputs.cup || 'B').toUpperCase();
    const usToEuCup: Record<string, string> = { A: 'A', B: 'B', C: 'C', D: 'D', DD: 'E', DDD: 'F' };
    const euBand = braUS2EUBand[value] || '?';
    return [{ value: `${euBand}${usToEuCup[cup] || cup}`, label: 'Размер EU' }];
  },

  'razmer-byustgaltera-ru-v-us': (inputs) => {
    const value = String(inputs.value);
    const cup = String(inputs.cup || 'B').toUpperCase();
    const euToUsCup: Record<string, string> = { A: 'A', B: 'B', C: 'C', D: 'D', E: 'DD', F: 'E' };
    const usBand = braRU2USBand[value] || '?';
    return [{ value: `${usBand}${euToUsCup[cup] || cup}`, label: 'Размер US' }];
  },

  'razmer-byustgaltera-us-v-ru': (inputs) => {
    const value = String(inputs.value);
    const cup = String(inputs.cup || 'B').toUpperCase();
    const usToEuCup: Record<string, string> = { A: 'A', B: 'B', C: 'C', D: 'D', DD: 'E', DDD: 'F' };
    const ruBand = braUS2RUBand[value] || '?';
    return [{ value: `${ruBand}${usToEuCup[cup] || cup}`, label: 'Размер RU' }];
  },
};
