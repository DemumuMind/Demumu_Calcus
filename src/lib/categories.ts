import { Category, Subcategory } from './types';

/** Helper to reduce repetitive category object structure */
function makeSubcategory(id: string, slug: string, title: string, description: string): Subcategory {
  return { id, slug, title, description };
}

function makeCategory(id: string, slug: string, title: string, description: string, subcategories: Subcategory[]): Category {
  return { id, slug, title, description, subcategories };
}

export const categories: Category[] = [
  makeCategory('nauka-i-ucheba', 'nauka-i-ucheba', 'Наука и Учёба', 'Математические калькуляторы, проценты, дроби, геометрия и физика', [
    makeSubcategory('matematicheskie', 'matematicheskie', 'Математические', 'Базовые и инженерные калькуляторы'),
    makeSubcategory('finansovye', 'finansovye', 'Финансовые', 'Проценты, кредиты, налоги'),
    makeSubcategory('geometriya', 'geometriya', 'Геометрия', 'Площади, объёмы, фигуры'),
    makeSubcategory('fizika', 'fizika', 'Физика', 'Физические расчёты и законы'),
  ]),
  makeCategory('konvertery', 'konvertery', 'Конвертеры', 'Единицы измерения, валюты, температура и многое другое', [
    makeSubcategory('conv-dlina', 'conv-dlina', 'Длина', 'Метры, километры, мили, дюймы'),
    makeSubcategory('conv-massa', 'conv-massa', 'Масса', 'Граммы, килограммы, тонны, фунты'),
    makeSubcategory('conv-temperatura', 'conv-temperatura', 'Температура', 'Цельсий, Фаренгейт, Кельвин'),
    makeSubcategory('conv-skorost', 'conv-skorost', 'Скорость', 'км/ч, м/с, узлы, махи'),
    makeSubcategory('conv-informaciya', 'conv-informaciya', 'Информация', 'Биты, байты, килобайты, мегабайты'),
    makeSubcategory('conv-obem', 'conv-obem', 'Объём', 'Литры, галлоны, баррели'),
    makeSubcategory('conv-ploshchad', 'conv-ploshchad', 'Площадь', 'м², гектары, акры, сотки'),
    makeSubcategory('conv-energiya', 'conv-energiya', 'Энергия', 'Джоули, калории, кВтч'),
    makeSubcategory('conv-davlenie', 'conv-davlenie', 'Давление', 'Паскали, атм, бар, psi'),
    makeSubcategory('conv-moshchnost', 'conv-moshchnost', 'Мощность', 'Ватты, киловатты, л.с.'),
    makeSubcategory('conv-vremya', 'conv-vremya', 'Время', 'Секунды, минуты, часы, дни'),
    makeSubcategory('conv-ugly', 'conv-ugly', 'Углы', 'Градусы, радианы, грады'),
    makeSubcategory('finansovye', 'finansovye', 'Финансовые конвертеры', 'Валютные конвертеры и финансовые расчёты'),
    makeSubcategory('conv-chastota', 'conv-chastota', 'Частота', 'Герцы, килогерцы, мегагерцы, обороты в минуту'),
    makeSubcategory('conv-sila', 'conv-sila', 'Сила', 'Ньютоны, килоньютоны, кгс, дины'),
  ]),
  makeCategory('procenty', 'procenty', 'Проценты', 'Онлайн калькуляторы процентов для всех типов расчётов', [
    makeSubcategory('procenty-osnovnye', 'procenty-osnovnye', 'Основные расчёты', 'Процент от числа, число в процентах'),
    makeSubcategory('procenty-izmenenie', 'procenty-izmenenie', 'Изменения', 'Прибавить, вычесть процент'),
    makeSubcategory('procenty-slozhnye', 'procenty-slozhnye', 'Сложные проценты', 'Капитализация, рост'),
  ]),
  makeCategory('finansy', 'finansy', 'Финансы', 'Расчёт зарплаты, пенсии, кредитов, налогов и госпошлин', [
    makeSubcategory('zarplata', 'zarplata', 'Зарплата', 'Отпускные, декретные, НДФЛ'),
    makeSubcategory('pensiya', 'pensiya', 'Пенсия', 'Расчёт пенсии по старости'),
    makeSubcategory('kredity', 'kredity', 'Кредиты', 'Ипотека, потребительские кредиты, вклады'),
    makeSubcategory('nalogi', 'nalogi', 'Налоги', 'НДС, транспортный налог'),
    makeSubcategory('yuridicheskie', 'yuridicheskie', 'Юридические', 'Госпошлины, неустойка, алименты'),
  ]),
  makeCategory('tajmery', 'tajmery', 'Таймеры', 'Онлайн таймеры обратного отсчёта с звуковым сигналом', [
    makeSubcategory('tajmery-korotkie', 'tajmery-korotkie', 'Короткие', '5-45 секунд'),
    makeSubcategory('tajmery-minuty', 'tajmery-minuty', 'Минуты', '1-30 минут'),
    makeSubcategory('tajmery-chasy', 'tajmery-chasy', 'Часы', '1-24 часа'),
  ]),
  makeCategory('kulinarnye-mery', 'kulinarnye-mery', 'Кулинарные меры', 'Таблицы перевода кулинарных мер в граммы для всех продуктов', [
    makeSubcategory('muka', 'muka', 'Мука', 'Пшеничная, ржаная и другие виды муки'),
    makeSubcategory('krupy', 'krupy', 'Крупы', 'Рис, гречка, овсянка, манка'),
    makeSubcategory('sahar', 'sahar', 'Сахар и сладости', 'Сахар, мёд, варенье'),
    makeSubcategory('masla', 'masla', 'Масла и жиры', 'Сливочное, растительное масло'),
    makeSubcategory('molochnye', 'molochnye', 'Молочные продукты', 'Молоко, сметана, кефир'),
    makeSubcategory('specii', 'specii', 'Приправы', 'Соль, сода, специи'),
  ]),
  makeCategory('zdorove-i-krasota', 'zdorove-i-krasota', 'Здоровье и Красота', 'ИМТ, калории, беременность, фитнес и многое другое', [
    makeSubcategory('pitanie-i-ves', 'pitanie-i-ves', 'Питание и вес', 'ИМТ, калории, идеальный вес'),
    makeSubcategory('sport-i-aktivnost', 'sport-i-aktivnost', 'Спорт и активность', 'Пульс, калории, тренировки'),
    makeSubcategory('beremennost-i-deti', 'beremennost-i-deti', 'Беременность и дети', 'Овуляция, сроки, календари'),
    makeSubcategory('zdorove-raznoe', 'zdorove-raznoe', 'Здоровье (разное)', 'Индексы, анализы, нормы'),
    makeSubcategory('vneshnost', 'vneshnost', 'Внешность', 'Размеры, пропорции, фигура'),
    makeSubcategory('krasota', 'krasota', 'Красота', 'Уход, размеры, параметры'),
  ]),
  makeCategory('stroitelstvo-i-remont', 'stroitelstvo-i-remont', 'Строительство и Ремонт', 'Площади, объёмы, строительные материалы', [
    makeSubcategory('stroitelnye-materialy', 'stroitelnye-materialy', 'Строительные материалы', 'Щебень, песок, кирпич, бетон'),
    makeSubcategory('fundamenty', 'fundamenty', 'Фундаменты', 'Расчёт фундаментов'),
    makeSubcategory('otdelka', 'otdelka', 'Отделка', 'Штукатурка, краска, обои'),
    makeSubcategory('pokrytiya', 'pokrytiya', 'Покрытия', 'Ламинат, линолеум, плитка'),
  ]),
  makeCategory('transport', 'transport', 'Транспорт', 'Расход топлива, стоимость поездки, налоги', [
    makeSubcategory('raskhod-topliva', 'raskhod-topliva', 'Расход топлива', 'Расчёт расхода бензина и дизеля'),
    makeSubcategory('stoimost-poezdki', 'stoimost-poezdki', 'Стоимость поездки', 'Сколько стоит проезд'),
    makeSubcategory('nalogi-i-sbory', 'nalogi-i-sbory', 'Налоги и сборы', 'Транспортный налог, утильсбор'),
    makeSubcategory('rastamozhka', 'rastamozhka', 'Растаможка', 'Растаможка автомобилей'),
  ]),
  makeCategory('tekhnologii', 'tekhnologii', 'Технологии', 'Дата и время, генераторы, скорость интернета', [
    makeSubcategory('data-i-vremya', 'data-i-vremya', 'Дата и время', 'Возраст, дни между датами, таймеры'),
    makeSubcategory('generatory', 'generatory', 'Генераторы', 'Пароли, числа, тексты'),
    makeSubcategory('internet-i-fajly', 'internet-i-fajly', 'Интернет и файлы', 'Скорость, размер файлов'),
    makeSubcategory('tekhnologii-raznoe', 'tekhnologii-raznoe', 'Разное', 'HTML редактор, калькулятор текста'),
  ]),
  makeCategory('povsednevnoe', 'povsednevnoe', 'Повседневное', 'Еда, размеры, питомцы, развлечения', [
    makeSubcategory('eda-i-napitki', 'eda-i-napitki', 'Еда и напитки', 'Время варки, кулинарные меры'),
    makeSubcategory('razmery', 'razmery', 'Размеры', 'Одежда, обувь, кольца'),
    makeSubcategory('pitomcy', 'pitomcy', 'Питомцы', 'Возраст собак и кошек'),
    makeSubcategory('razvlecheniya', 'razvlecheniya', 'Развлечения', 'Зодиак, подбросить монетку'),
  ]),
];

export const categoryIcons: Record<string, string> = {
  'nauka-i-ucheba': 'Calculator',
  'konvertery': 'ArrowRightLeft',
  'procenty': 'Percent',
  'finansy': 'Wallet',
  'tajmery': 'Timer',
  'kulinarnye-mery': 'ChefHat',
  'zdorove-i-krasota': 'Heart',
  'stroitelstvo-i-remont': 'Home',
  'transport': 'Car',
  'tekhnologii': 'Cpu',
  'povsednevnoe': 'Coffee',
};
