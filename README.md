# Demumu Calcus

Коллекция бесплатных онлайн-калькуляторов на русском языке — 759 калькуляторов в 10 категориях.

Репозиторий: [github.com/DemumuMind/Demumu_Calcus](https://github.com/DemumuMind/Demumu_Calcus)

---

## О проекте

759 онлайн-калькуляторов с data-driven архитектурой: метаданные в JSON, логика в compute-функциях, загрузка через единый index.ts.

### Категории (10)

| # | Категория | Slug | Подкатегории |
|---|-----------|------|--------------|
| 1 | Наука и Учёба | nauka-i-ucheba | математика, физика, химия |
| 2 | Конвертеры | konvertery | единицы, валюты, размеры |
| 3 | Проценты | procenty | НДС, НДФЛ, кредиты |
| 4 | Таймеры | tajmery | обратный отсчёт, pomodoro |
| 5 | Кулинарные меры | kulinarnye-mery | перевод мер |
| 6 | Здоровье и Красота | zdorove-i-krasota | ИМТ, калории |
| 7 | Строительство и Ремонт | stroitelstvo-i-remont | бетон, плитка |
| 8 | Транспорт | transport | расход топлива |
| 9 | Технологии | tekhnologii | пароли, хеши |
| 10 | Повседневное | povsednevnoe | дни, возраст |

---

## Технологии

- **Next.js 16.2.9** — App Router, Server Components, Turbopack
- **React 19** + TypeScript
- **Tailwind CSS** + shadcn/ui
- **isomorphic-dompurify** — SafeHtml компонент для санитизации HTML
- **aislop** — 100/100 оценка качества кода

---

## Архитектура (Data-Driven)

Все калькуляторы используют разделение данных и логики:

```
src/lib/calculators/
  data/*.json           # 82 JSON-файла с метаданными калькуляторов
                       #   (slug, id, title, description, category,
                       #    subcategory, type, inputs, outputs, content)
  compute-helpers.ts    # 44 экспортируемых helper-функции
                       #   (simpleConvert, divConvert, fmtResult,
                       #    awg2mm, mm2awg, morseCodeMap, translitMaps,
                       #    hexToRgb, hslToRgb, foodDatabase,
                       #    shoesEU2UK, shoesEU2US, braEU2USBand,
                       #    braRU2USBand, petFoodDatabase, makeArticle, ...)
  compute-*.ts         # 64 файла compute-функций по категориям
                       #   (compute-daily_daily_a_1.ts,
                       #    compute-finance_a_1.ts,
                       #    compute-health_health2_a_1.ts,
                       #    compute-conv-*.ts, ...)
  index.ts             # Загрузчик: импортирует все compute-мапы + JSON,
                       #   объединяет их с фоллбэками для
                       #   inputs/outputs/content.
                       #   Экспортирует: getCalculators(),
                       #   getCalculatorBySlug(),
                       #   getCalculatorsByCategory(),
                       #   getCalculatorsBySubcategory(),
                       #   calculators
```

### Принцип

1. JSON-файлы содержат **только метаданные** (название, описание, категория, поля ввода/вывода, SEO-контент)
2. Compute-файлы содержат **только логику** вычислений (функции `compute(inputs) => outputs`)
3. `index.ts` загружает JSON, импортирует compute-мапы, объединяет их — калькулятор готов

### Добавление нового калькулятора

1. Создать JSON-файл в `data/` с метаданными
2. Добавить compute-функцию в соответствующий `compute-*.ts`
3. Обновить мапу compute-функций в том же файле
4. Калькулятор автоматически подхватится `index.ts`

---

## Структура проекта

```
src/
  app/
    calc/[slug]/page.tsx                          # Страница калькулятора
    [category]/page.tsx                           # Страница категории
    [category]/podkat/[subcategory]/page.tsx      # Страница подкатегории
    procenty/[...slug]/page.tsx                   # Калькуляторы процентов
    obratnyj-otschet-do-daty/                      # Таймеры обратного отсчёта
    stati/                                         # Статьи
  components/
    calculator/                                    # UI калькуляторов (9 типов)
    layout/                                        # Header, Footer, BrandLogo
    search/                                        # SearchBox
    ads/                                           # Ad placeholders
    ui/                                            # shadcn/ui + SafeHtml
  lib/
    calculators/
      index.ts                                     # Загрузчик + экспорты
      compute-helpers.ts                           # 44 helper-функции
      compute-*.ts                                 # 64 compute-файла
      data/*.json                                  # 82 JSON data-файла
    articles-main.ts                               # Основные статьи
    articles-additional.ts                         # Дополнительные статьи
    categories.ts                                  # 10 категорий с подкатегориями
    cooking/                                       # Кулинарные данные
    types.ts                                       # TypeScript типы (Calculator с optional content)
    schema.ts                                      # Schema.org генераторы
    constants/urls.ts                              # 183 URL-константы
```

---

## Команды

```bash
npm install              # Установка зависимостей
npm run dev              # Dev-сервер (Turbopack)
npm run build            # Production-сборка (1573 статических страницы)
npm start                # Запуск production-сервера
npx tsc --noEmit         # TypeScript проверка (0 ошибок)
npx aislop scan          # Качество кода (100/100)
npx playwright test      # E2E-тесты (Playwright)
```

---

## URL-параметры

Калькуляторы поддерживают предзаполнение через query-параметры:

```
/calc/konverter-temperatury?value=100&from=celsius&to=fahrenheit
/calc/kalkulyator-imt?weight=70&height=175
```

---

## Ключевые файлы

| Файл | Назначение |
|------|-----------|
| `src/lib/types.ts` | Тип `Calculator` с optional `content` |
| `src/components/ui/safe-html.tsx` | `SafeHtml` с `isomorphic-dompurify` |
| `src/lib/schema.ts` | Schema.org генераторы (SEO) |
| `src/lib/categories.ts` | 10 категорий с подкатегориями |
| `src/lib/constants/urls.ts` | 183 URL-константы |
| `scripts/postinstall.sh` | Патчит symlink postcss в next |
| `.aislopignore` | Исключает сгенерированный код из скана |
| `.aislop.yml` | Конфигурация aislop |

---

## Статус

- 759 калькуляторов
- 1573 статических страницы при сборке
- 0 TypeScript ошибок
- aislop: 100/100

---

## English

A collection of 759 free online calculators in Russian, built with Next.js 16.2.9 and React 19. Uses a data-driven architecture: calculator metadata lives in 82 JSON files, computation logic in 64 TypeScript files, and a central `index.ts` loader merges them together. The project produces 1573 static pages at build time with zero TypeScript errors and an aislop quality score of 100/100.

### Architecture

- **JSON data** (`src/lib/calculators/data/*.json`) — metadata: slug, title, description, category, inputs, outputs, content
- **Compute functions** (`src/lib/calculators/compute-*.ts`) — pure logic: 64 files by category
- **Helpers** (`src/lib/calculators/compute-helpers.ts`) — 44 shared utility functions
- **Loader** (`src/lib/calculators/index.ts`) — imports JSON + compute maps, merges with fallbacks, exports query functions

### Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 1573 static pages
npx tsc --noEmit   # 0 errors
npx aislop scan    # 100/100
```
