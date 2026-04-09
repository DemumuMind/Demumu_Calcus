// ============================================
// БАЗА ДАННЫХ ЕДИНИЦ ИЗМЕРЕНИЯ
// Универсальная система для всех конвертеров calcus.su
// ============================================

export interface UnitDefinition {
  id: string;           // Идентификатор (например, 'km', 'mile')
  name: string;         // Название на русском (например, 'километр')
  shortName: string;    // Короткое обозначение (например, 'км')
  toBase: number;       // Коэффициент перевода в базовую единицу
  type?: 'metric' | 'imperial' | 'other';
}

export interface UnitCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  baseUnit: string;     // Базовая единица для расчётов
  units: Record<string, UnitDefinition>;
}

// ============================================
// 1. ДЛИНА
// ============================================
export const lengthCategory: UnitCategory = {
  id: 'length',
  slug: 'dlina',
  name: 'Длина',
  description: 'Конвертер длины и расстояния',
  baseUnit: 'm',
  units: {
    // Метрические
    m: { id: 'm', name: 'метр', shortName: 'м', toBase: 1, type: 'metric' },
    km: { id: 'km', name: 'километр', shortName: 'км', toBase: 1000, type: 'metric' },
    cm: { id: 'cm', name: 'сантиметр', shortName: 'см', toBase: 0.01, type: 'metric' },
    mm: { id: 'mm', name: 'миллиметр', shortName: 'мм', toBase: 0.001, type: 'metric' },
    microm: { id: 'microm', name: 'микрон', shortName: 'мкм', toBase: 0.000001, type: 'metric' },
    nm: { id: 'nm', name: 'нанометр', shortName: 'нм', toBase: 1e-9, type: 'metric' },
    dm: { id: 'dm', name: 'дециметр', shortName: 'дм', toBase: 0.1, type: 'metric' },
    
    // Английские/имперские
    mile: { id: 'mile', name: 'миля', shortName: 'миля', toBase: 1609.344, type: 'imperial' },
    yard: { id: 'yard', name: 'ярд', shortName: 'ярд', toBase: 0.9144, type: 'imperial' },
    foot: { id: 'foot', name: 'фут', shortName: 'фт', toBase: 0.3048, type: 'imperial' },
    inch: { id: 'inch', name: 'дюйм', shortName: 'дюйм', toBase: 0.0254, type: 'imperial' },
    nautmile: { id: 'nautmile', name: 'морская миля', shortName: 'мор. миль', toBase: 1852, type: 'imperial' },
    
    // Древнерусские
    verst: { id: 'verst', name: 'верста', shortName: 'верста', toBase: 1066.8, type: 'other' },
    sazhen: { id: 'sazhen', name: 'сажень', shortName: 'сажень', toBase: 2.1336, type: 'other' },
    arshin: { id: 'arshin', name: 'аршин', shortName: 'аршин', toBase: 0.7112, type: 'other' },
    vershok: { id: 'vershok', name: 'вершок', shortName: 'вершок', toBase: 0.04445, type: 'other' },
    
    // Космические
    ly: { id: 'ly', name: 'световой год', shortName: 'св. год', toBase: 9.461e15, type: 'other' },
    parsec: { id: 'parsec', name: 'парсек', shortName: 'пк', toBase: 3.086e16, type: 'other' },
    au: { id: 'au', name: 'астрономическая единица', shortName: 'а.е.', toBase: 1.496e11, type: 'other' },
  }
};

// ============================================
// 2. МАССА / ВЕС
// ============================================
export const massCategory: UnitCategory = {
  id: 'mass',
  slug: 'massa',
  name: 'Масса',
  description: 'Конвертер массы и веса',
  baseUnit: 'kg',
  units: {
    // Метрические
    kg: { id: 'kg', name: 'килограмм', shortName: 'кг', toBase: 1, type: 'metric' },
    g: { id: 'g', name: 'грамм', shortName: 'г', toBase: 0.001, type: 'metric' },
    mg: { id: 'mg', name: 'миллиграмм', shortName: 'мг', toBase: 0.000001, type: 'metric' },
    ton: { id: 'ton', name: 'тонна', shortName: 'т', toBase: 1000, type: 'metric' },
    centner: { id: 'centner', name: 'центнер', shortName: 'ц', toBase: 100, type: 'metric' },
    mcg: { id: 'mcg', name: 'микрограмм', shortName: 'мкг', toBase: 1e-9, type: 'metric' },
    
    // Английские/имперские
    pound: { id: 'pound', name: 'фунт', shortName: 'фунт', toBase: 0.453592, type: 'imperial' },
    ounce: { id: 'ounce', name: 'унция', shortName: 'унция', toBase: 0.0283495, type: 'imperial' },
    troy_ounce: { id: 'troy_ounce', name: 'тройская унция', shortName: 'тр. унция', toBase: 0.0311035, type: 'imperial' },
    stone: { id: 'stone', name: 'стоун', shortName: 'стоун', toBase: 6.35029, type: 'imperial' },
    
    // Древнерусские
    pood: { id: 'pood', name: 'пуд', shortName: 'пуд', toBase: 16.38, type: 'other' },
    funt: { id: 'funt', name: 'фунт (русский)', shortName: 'фунт', toBase: 0.4095, type: 'other' },
    zolotnik: { id: 'zolotnik', name: 'золотник', shortName: 'зол.', toBase: 0.004266, type: 'other' },
    
    // Драгоценности
    carat: { id: 'carat', name: 'карат', shortName: 'кт', toBase: 0.0002, type: 'other' },
  }
};

// ============================================
// 3. ТЕМПЕРАТУРА
// ============================================
export const temperatureCategory: UnitCategory = {
  id: 'temperature',
  slug: 'temperatura',
  name: 'Температура',
  description: 'Конвертер температуры',
  baseUnit: 'c',
  units: {
    c: { id: 'c', name: 'градус Цельсия', shortName: '°C', toBase: 1, type: 'metric' },
    f: { id: 'f', name: 'градус Фаренгейта', shortName: '°F', toBase: 1, type: 'imperial' },
    k: { id: 'k', name: 'кельвин', shortName: 'K', toBase: 1, type: 'metric' },
    r: { id: 'r', name: 'градус Реомюра', shortName: '°Re', toBase: 1, type: 'other' },
  }
};

// ============================================
// 4. СКОРОСТЬ
// ============================================
export const speedCategory: UnitCategory = {
  id: 'speed',
  slug: 'skorost',
  name: 'Скорость',
  description: 'Конвертер скорости',
  baseUnit: 'ms',
  units: {
    ms: { id: 'ms', name: 'метр в секунду', shortName: 'м/с', toBase: 1, type: 'metric' },
    kmh: { id: 'kmh', name: 'километр в час', shortName: 'км/ч', toBase: 0.277778, type: 'metric' },
    mph: { id: 'mph', name: 'миля в час', shortName: 'миль/ч', toBase: 0.44704, type: 'imperial' },
    knot: { id: 'knot', name: 'узел', shortName: 'узел', toBase: 0.514444, type: 'other' },
    mach: { id: 'mach', name: 'мах', shortName: 'мах', toBase: 340.3, type: 'other' },
    v1: { id: 'v1', name: 'первая космическая', shortName: 'в1', toBase: 7900, type: 'other' },
    v2: { id: 'v2', name: 'вторая космическая', shortName: 'в2', toBase: 11200, type: 'other' },
    v3: { id: 'v3', name: 'третья космическая', shortName: 'в3', toBase: 16670, type: 'other' },
    c: { id: 'c', name: 'скорость света', shortName: 'c', toBase: 299792458, type: 'other' },
  }
};

// ============================================
// 5. ВРЕМЯ
// ============================================
export const timeCategory: UnitCategory = {
  id: 'time',
  slug: 'vremya',
  name: 'Время',
  description: 'Конвертер времени',
  baseUnit: 's',
  units: {
    s: { id: 's', name: 'секунда', shortName: 'с', toBase: 1, type: 'metric' },
    min: { id: 'min', name: 'минута', shortName: 'мин', toBase: 60, type: 'metric' },
    h: { id: 'h', name: 'час', shortName: 'ч', toBase: 3600, type: 'metric' },
    day: { id: 'day', name: 'сутки', shortName: 'сут', toBase: 86400, type: 'metric' },
    week: { id: 'week', name: 'неделя', shortName: 'нед', toBase: 604800, type: 'metric' },
    month: { id: 'month', name: 'месяц', shortName: 'мес', toBase: 2628000, type: 'metric' },
    year: { id: 'year', name: 'год', shortName: 'год', toBase: 31536000, type: 'metric' },
    century: { id: 'century', name: 'век', shortName: 'век', toBase: 3153600000, type: 'metric' },
    ms: { id: 'ms', name: 'миллисекунда', shortName: 'мс', toBase: 0.001, type: 'metric' },
    micros: { id: 'micros', name: 'микросекунда', shortName: 'мкс', toBase: 1e-6, type: 'metric' },
    nanos: { id: 'nanos', name: 'наносекунда', shortName: 'нс', toBase: 1e-9, type: 'metric' },
    decade: { id: 'decade', name: 'десятилетие', shortName: 'дес', toBase: 315360000, type: 'metric' },
  }
};

// ============================================
// 6. ОБЪЁМ
// ============================================
export const volumeCategory: UnitCategory = {
  id: 'volume',
  slug: 'obem',
  name: 'Объём',
  description: 'Конвертер объёма',
  baseUnit: 'l',
  units: {
    l: { id: 'l', name: 'литр', shortName: 'л', toBase: 1, type: 'metric' },
    ml: { id: 'ml', name: 'миллилитр', shortName: 'мл', toBase: 0.001, type: 'metric' },
    m3: { id: 'm3', name: 'кубометр', shortName: 'м³', toBase: 1000, type: 'metric' },
    cm3: { id: 'cm3', name: 'кубический сантиметр', shortName: 'см³', toBase: 0.001, type: 'metric' },
    mm3: { id: 'mm3', name: 'кубический миллиметр', shortName: 'мм³', toBase: 1e-6, type: 'metric' },
    dm3: { id: 'dm3', name: 'кубический дециметр', shortName: 'дм³', toBase: 1, type: 'metric' },
    
    // Английские
    gallon: { id: 'gallon', name: 'галлон (US)', shortName: 'гал', toBase: 3.78541, type: 'imperial' },
    pint: { id: 'pint', name: 'пинта', shortName: 'пинта', toBase: 0.473176, type: 'imperial' },
    quart: { id: 'quart', name: 'кварта', shortName: 'кварта', toBase: 0.946353, type: 'imperial' },
    floz: { id: 'floz', name: 'жидкая унция', shortName: 'жидк. унция', toBase: 0.0295735, type: 'imperial' },
    barrel: { id: 'barrel', name: 'баррель', shortName: 'баррель', toBase: 158.987, type: 'imperial' },
    
    // Кулинарные
    tbsp: { id: 'tbsp', name: 'столовая ложка', shortName: 'ст. л.', toBase: 0.015, type: 'other' },
    tsp: { id: 'tsp', name: 'чайная ложка', shortName: 'ч. л.', toBase: 0.005, type: 'other' },
    cup: { id: 'cup', name: 'стакан', shortName: 'стакан', toBase: 0.25, type: 'other' },
    shot: { id: 'shot', name: 'рюмка', shortName: 'рюмка', toBase: 0.05, type: 'other' },
    charochka: { id: 'charochka', name: 'чарочка', shortName: 'чарка', toBase: 0.1, type: 'other' },
  }
};

// ============================================
// 7. ПЛОЩАДЬ
// ============================================
export const areaCategory: UnitCategory = {
  id: 'area',
  slug: 'ploshchad',
  name: 'Площадь',
  description: 'Конвертер площади',
  baseUnit: 'm2',
  units: {
    m2: { id: 'm2', name: 'квадратный метр', shortName: 'м²', toBase: 1, type: 'metric' },
    km2: { id: 'km2', name: 'квадратный километр', shortName: 'км²', toBase: 1e6, type: 'metric' },
    cm2: { id: 'cm2', name: 'квадратный сантиметр', shortName: 'см²', toBase: 0.0001, type: 'metric' },
    mm2: { id: 'mm2', name: 'квадратный миллиметр', shortName: 'мм²', toBase: 1e-6, type: 'metric' },
    ha: { id: 'ha', name: 'гектар', shortName: 'га', toBase: 10000, type: 'metric' },
    are: { id: 'are', name: 'ар (сотка)', shortName: 'а', toBase: 100, type: 'metric' },
    sotka: { id: 'sotka', name: 'сотка', shortName: 'сотка', toBase: 100, type: 'metric' },
    
    // Английские
    acre: { id: 'acre', name: 'акр', shortName: 'акр', toBase: 4046.86, type: 'imperial' },
    sqmile: { id: 'sqmile', name: 'квадратная миля', shortName: 'миля²', toBase: 2.59e6, type: 'imperial' },
    sqft: { id: 'sqft', name: 'квадратный фут', shortName: 'фт²', toBase: 0.092903, type: 'imperial' },
    sqinch: { id: 'sqinch', name: 'квадратный дюйм', shortName: 'дюйм²', toBase: 0.00064516, type: 'imperial' },
    sqyard: { id: 'sqyard', name: 'квадратный ярд', shortName: 'ярд²', toBase: 0.836127, type: 'imperial' },
  }
};

// ============================================
// 8. ИНФОРМАЦИЯ / ДАННЫЕ
// ============================================
export const dataCategory: UnitCategory = {
  id: 'data',
  slug: 'informaciya',
  name: 'Информация',
  description: 'Конвертер цифровых данных',
  baseUnit: 'b',
  units: {
    b: { id: 'b', name: 'байт', shortName: 'Б', toBase: 1, type: 'metric' },
    bit: { id: 'bit', name: 'бит', shortName: 'бит', toBase: 0.125, type: 'metric' },
    kb: { id: 'kb', name: 'килобайт', shortName: 'КБ', toBase: 1024, type: 'metric' },
    mb: { id: 'mb', name: 'мегабайт', shortName: 'МБ', toBase: 1048576, type: 'metric' },
    gb: { id: 'gb', name: 'гигабайт', shortName: 'ГБ', toBase: 1073741824, type: 'metric' },
    tb: { id: 'tb', name: 'терабайт', shortName: 'ТБ', toBase: 1099511627776, type: 'metric' },
    pb: { id: 'pb', name: 'петабайт', shortName: 'ПБ', toBase: 1.1259e15, type: 'metric' },
    eb: { id: 'eb', name: 'эксабайт', shortName: 'ЭБ', toBase: 1.1529e18, type: 'metric' },
    
    // Биты (для скорости)
    kbit: { id: 'kbit', name: 'килобит', shortName: 'Кбит', toBase: 128, type: 'metric' },
    mbit: { id: 'mbit', name: 'мегабит', shortName: 'Мбит', toBase: 131072, type: 'metric' },
    gbit: { id: 'gbit', name: 'гигабит', shortName: 'Гбит', toBase: 134217728, type: 'metric' },
  }
};

// ============================================
// 9. ЭНЕРГИЯ
// ============================================
export const energyCategory: UnitCategory = {
  id: 'energy',
  slug: 'energiya',
  name: 'Энергия',
  description: 'Конвертер энергии и работы',
  baseUnit: 'j',
  units: {
    j: { id: 'j', name: 'джоуль', shortName: 'Дж', toBase: 1, type: 'metric' },
    kj: { id: 'kj', name: 'килоджоуль', shortName: 'кДж', toBase: 1000, type: 'metric' },
    mj: { id: 'mj', name: 'мегаджоуль', shortName: 'МДж', toBase: 1e6, type: 'metric' },
    cal: { id: 'cal', name: 'калория', shortName: 'кал', toBase: 4.184, type: 'metric' },
    kcal: { id: 'kcal', name: 'килокалория', shortName: 'ккал', toBase: 4184, type: 'metric' },
    wh: { id: 'wh', name: 'ватт-час', shortName: 'Вт⋅ч', toBase: 3600, type: 'metric' },
    kwh: { id: 'kwh', name: 'киловатт-час', shortName: 'кВт⋅ч', toBase: 3.6e6, type: 'metric' },
    mwh: { id: 'mwh', name: 'мегаватт-час', shortName: 'МВт⋅ч', toBase: 3.6e9, type: 'metric' },
    gcal: { id: 'gcal', name: 'гигакалория', shortName: 'Гкал', toBase: 4.184e9, type: 'metric' },
    ev: { id: 'ev', name: 'электронвольт', shortName: 'эВ', toBase: 1.602e-19, type: 'metric' },
  }
};

// ============================================
// 10. МОЩНОСТЬ
// ============================================
export const powerCategory: UnitCategory = {
  id: 'power',
  slug: 'moshchnost',
  name: 'Мощность',
  description: 'Конвертер мощности',
  baseUnit: 'w',
  units: {
    w: { id: 'w', name: 'ватт', shortName: 'Вт', toBase: 1, type: 'metric' },
    kw: { id: 'kw', name: 'киловатт', shortName: 'кВт', toBase: 1000, type: 'metric' },
    mw: { id: 'mw', name: 'мегаватт', shortName: 'МВт', toBase: 1e6, type: 'metric' },
    hp: { id: 'hp', name: 'лошадиная сила', shortName: 'л.с.', toBase: 735.5, type: 'other' },
    hp_imp: { id: 'hp_imp', name: ' horsepower (UK)', shortName: 'hp', toBase: 745.7, type: 'imperial' },
    va: { id: 'va', name: 'вольт-ампер', shortName: 'ВА', toBase: 1, type: 'metric' },
    kva: { id: 'kva', name: 'киловольт-ампер', shortName: 'кВА', toBase: 1000, type: 'metric' },
    erg_s: { id: 'erg_s', name: 'эрг в секунду', shortName: 'эрг/с', toBase: 1e-7, type: 'metric' },
  }
};

// ============================================
// 11. ДАВЛЕНИЕ
// ============================================
export const pressureCategory: UnitCategory = {
  id: 'pressure',
  slug: 'davlenie',
  name: 'Давление',
  description: 'Конвертер давления',
  baseUnit: 'pa',
  units: {
    pa: { id: 'pa', name: 'паскаль', shortName: 'Па', toBase: 1, type: 'metric' },
    kpa: { id: 'kpa', name: 'килопаскаль', shortName: 'кПа', toBase: 1000, type: 'metric' },
    mpa: { id: 'mpa', name: 'мегапаскаль', shortName: 'МПа', toBase: 1e6, type: 'metric' },
    gpa: { id: 'gpa', name: 'гигапаскаль', shortName: 'ГПа', toBase: 1e9, type: 'metric' },
    bar: { id: 'bar', name: 'бар', shortName: 'бар', toBase: 100000, type: 'metric' },
    mbar: { id: 'mbar', name: 'миллибар', shortName: 'мбар', toBase: 100, type: 'metric' },
    atm: { id: 'atm', name: 'атмосфера', shortName: 'атм', toBase: 101325, type: 'metric' },
    mmhg: { id: 'mmhg', name: 'миллиметр ртутного столба', shortName: 'мм рт.ст.', toBase: 133.322, type: 'metric' },
    cmhg: { id: 'cmhg', name: 'сантиметр ртутного столба', shortName: 'см рт.ст.', toBase: 1333.22, type: 'metric' },
    mmh2o: { id: 'mmh2o', name: 'миллиметр водяного столба', shortName: 'мм вод.ст.', toBase: 9.80665, type: 'metric' },
    psi: { id: 'psi', name: 'фунт на квадратный дюйм', shortName: 'psi', toBase: 6894.76, type: 'imperial' },
    ksi: { id: 'ksi', name: 'килопаунд на квадратный дюйм', shortName: 'ksi', toBase: 6.89476e6, type: 'imperial' },
    at: { id: 'at', name: 'техническая атмосфера', shortName: 'ат', toBase: 98066.5, type: 'metric' },
  }
};

// ============================================
// 12. УГЛЫ
// ============================================
export const angleCategory: UnitCategory = {
  id: 'angle',
  slug: 'ugly',
  name: 'Углы',
  description: 'Конвертер углов',
  baseUnit: 'deg',
  units: {
    deg: { id: 'deg', name: 'градус', shortName: '°', toBase: 1, type: 'metric' },
    rad: { id: 'rad', name: 'радиан', shortName: 'рад', toBase: 57.2958, type: 'metric' },
    grad: { id: 'grad', name: 'град', shortName: 'град', toBase: 0.9, type: 'metric' },
    amin: { id: 'amin', name: 'угловая минута', shortName: '′', toBase: 0.0166667, type: 'metric' },
    asec: { id: 'asec', name: 'угловая секунда', shortName: '″', toBase: 0.000277778, type: 'metric' },
  }
};

// ============================================
// 13. ЧАСТОТА
// ============================================
export const frequencyCategory: UnitCategory = {
  id: 'frequency',
  slug: 'chastota',
  name: 'Частота',
  description: 'Конвертер частоты',
  baseUnit: 'hz',
  units: {
    hz: { id: 'hz', name: 'герц', shortName: 'Гц', toBase: 1, type: 'metric' },
    khz: { id: 'khz', name: 'килогерц', shortName: 'кГц', toBase: 1000, type: 'metric' },
    mhz: { id: 'mhz', name: 'мегагерц', shortName: 'МГц', toBase: 1e6, type: 'metric' },
    ghz: { id: 'ghz', name: 'гигагерц', shortName: 'ГГц', toBase: 1e9, type: 'metric' },
    thz: { id: 'thz', name: 'терагерц', shortName: 'ТГц', toBase: 1e12, type: 'metric' },
    rpm: { id: 'rpm', name: 'оборот в минуту', shortName: 'об/мин', toBase: 0.0166667, type: 'metric' },
  }
};

// ============================================
// 14. СИЛА
// ============================================
export const forceCategory: UnitCategory = {
  id: 'force',
  slug: 'sila',
  name: 'Сила',
  description: 'Конвертер силы',
  baseUnit: 'n',
  units: {
    n: { id: 'n', name: 'ньютон', shortName: 'Н', toBase: 1, type: 'metric' },
    kn: { id: 'kn', name: 'килоньютон', shortName: 'кН', toBase: 1000, type: 'metric' },
    mn: { id: 'mn', name: 'меганьютон', shortName: 'МН', toBase: 1e6, type: 'metric' },
    kgf: { id: 'kgf', name: 'килограмм-сила', shortName: 'кгс', toBase: 9.80665, type: 'metric' },
    gf: { id: 'gf', name: 'грамм-сила', shortName: 'гс', toBase: 0.00980665, type: 'metric' },
    tf: { id: 'tf', name: 'тонна-сила', shortName: 'тс', toBase: 9806.65, type: 'metric' },
    dyn: { id: 'dyn', name: 'дина', shortName: 'дин', toBase: 1e-5, type: 'metric' },
    lbf: { id: 'lbf', name: 'фунт-сила', shortName: 'lbf', toBase: 4.44822, type: 'imperial' },
    ozf: { id: 'ozf', name: 'унция-сила', shortName: 'ozf', toBase: 0.278014, type: 'imperial' },
  }
};

// ============================================
// ЭКСПОРТ ВСЕХ КАТЕГОРИЙ
// ============================================
export const allUnitCategories: Record<string, UnitCategory> = {
  length: lengthCategory,
  mass: massCategory,
  temperature: temperatureCategory,
  speed: speedCategory,
  time: timeCategory,
  volume: volumeCategory,
  area: areaCategory,
  data: dataCategory,
  energy: energyCategory,
  power: powerCategory,
  pressure: pressureCategory,
  angle: angleCategory,
  frequency: frequencyCategory,
  force: forceCategory,
};

// ============================================
// УТИЛИТЫ ДЛЯ КОНВЕРТАЦИЙ
// ============================================

/**
 * Конвертирует значение из одной единицы в другую
 * @param value Значение для конвертации
 * @param fromUnit Исходная единица
 * @param toUnit Целевая единица
 * @param category Категория единиц
 */
export function convert(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): number {
  const from = category.units[fromUnit];
  const to = category.units[toUnit];
  
  if (!from || !to) {
    throw new Error(`Unknown units: ${fromUnit} or ${toUnit}`);
  }
  
  // Особая обработка для температуры
  if (category.id === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }
  
  // Стандартная конвертация через базовую единицу
  const baseValue = value * from.toBase;
  return baseValue / to.toBase;
}

/**
 * Особая логика для температуры (не линейная)
 */
function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number;
  
  // Сначала в Цельсий
  switch (from) {
    case 'c': celsius = value; break;
    case 'f': celsius = (value - 32) * 5 / 9; break;
    case 'k': celsius = value - 273.15; break;
    case 'r': celsius = value * 1.25; break;
    default: celsius = value;
  }
  
  // Потом из Цельсия в целевую
  switch (to) {
    case 'c': return celsius;
    case 'f': return celsius * 9 / 5 + 32;
    case 'k': return celsius + 273.15;
    case 'r': return celsius * 0.8;
    default: return celsius;
  }
}

/**
 * Генерирует все возможные комбинации конвертеров
 */
export function generateAllConverters(category: UnitCategory): Array<{from: string; to: string}> {
  const units = Object.keys(category.units);
  const combinations: Array<{from: string; to: string}> = [];
  
  for (const from of units) {
    for (const to of units) {
      if (from !== to) {
        combinations.push({ from, to });
      }
    }
  }
  
  return combinations;
}

/**
 * Получает название категории для URL
 */
export function getCategorySlug(categoryId: string): string {
  const category = allUnitCategories[categoryId];
  return category?.slug || categoryId;
}

/**
 * Получает единицу по ID
 */
export function getUnit(categoryId: string, unitId: string): UnitDefinition | undefined {
  return allUnitCategories[categoryId]?.units[unitId];
}
