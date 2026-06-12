# Прогресс разработки Demumu Calcus

## Текущая статистика

| Показатель | Значение |
|------------|----------|
| Калькуляторы | 759 |
| JSON data-файлов | 82 |
| Compute-файлов | 64 |
| Helper-функций | 44 |
| Статических страниц (build) | 1573 |
| TypeScript ошибки | 0 |
| aislop score | 100/100 |
| Категорий | 10 |
| URL-константы | 183 |

---

## Архитектура: Data-Driven

Проект перешёл на data-driven архитектуру: метаданные калькуляторов отделены от логики вычислений.

### Структура src/lib/calculators/

```
data/*.json           — 82 JSON-файла с метаданными калькуляторов
compute-*.ts          — 64 файла compute-функций по категориям
compute-helpers.ts    — 44 helper-функции
index.ts              — Загрузчик + экспорты
```

### JSON data-файлы

Каждый JSON-файл содержит массив калькуляторов с полями:
- `slug`, `id`, `title`, `description`
- `category`, `subcategory`
- `type` (тип UI калькулятора)
- `inputs`, `outputs` (поля ввода/вывода)
- `content` (SEO-статьи, HTML)

### Compute-файлы

Каждый compute-файл экспортирует мапу `{ [id]: computeFunction }`:
- `compute-daily_daily_a_1.ts` — повседневные калькуляторы
- `compute-finance_a_1.ts` — финансы и проценты
- `compute-health_health2_a_1.ts` — здоровье
- `compute-conv-*.ts` — конвертеры
- и т.д. (64 файла)

### Helper-функции (compute-helpers.ts)

44 экспортируемые функции: `simpleConvert`, `divConvert`, `fmtResult`, `awg2mm`, `mm2awg`, `morseCodeMap`, `translitMaps`, `hexToRgb`, `hslToRgb`, `foodDatabase`, `shoesEU2UK`, `shoesEU2US`, `braEU2USBand`, `braRU2USBand`, `petFoodDatabase`, `makeArticle`, и другие.

### index.ts (Загрузчик)

- Импортирует все compute-мапы
- Импортирует все JSON data-файлы
- Объединяет их с фоллбэками для `inputs`, `outputs`, `content`
- Экспортирует:
  - `getCalculators()` — все калькуляторы
  - `getCalculatorBySlug(slug)` — поиск по slug
  - `getCalculatorsByCategory(cat)` — фильтр по категории
  - `getCalculatorsBySubcategory(cat, sub)` — фильтр по подкатегории
  - `calculators` — полный массив

---

## 10 категорий

1. **Наука и Учёба** (nauka-i-ucheba) — математика, физика, химия
2. **Конвертеры** (konvertery) — единицы, валюты, размеры
3. **Проценты** (procenty) — НДС, НДФЛ, кредиты
4. **Таймеры** (tajmery) — обратный отсчёт, pomodoro
5. **Кулинарные меры** (kulinarnye-mery) — перевод мер
6. **Здоровье и Красота** (zdorove-i-krasota) — ИМТ, калории
7. **Строительство и Ремонт** (stroitelstvo-i-remont) — бетон, плитка
8. **Транспорт** (transport) — расход топлива
9. **Технологии** (tekhnologii) — пароли, хеши
10. **Повседневное** (povsednevnoe) — дни, возраст

---

## Технологии

- Next.js 16.2.9 (App Router, Server Components, Turbopack)
- React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- isomorphic-dompurify (SafeHtml)
- Playwright (E2E)
- aislop (качество кода)

### npm overrides

```
next.postcss=8.5.15, qs>=6.14.0, ip-address>=9.1.0,
brace-expansion>=2.0.2, hono>=4.7.0, fast-uri=4.0.0
```

---

## История обновлений

### 2026-06-12: Data-Driven архитектура
- 759 калькуляторов (было 485)
- 82 JSON data-файла вместо монолитных TS-файлов
- 64 compute-файла с разделением по категориям
- 44 helper-функции в compute-helpers.ts
- index.ts — единый загрузчик с фоллбэками
- 1573 статических страницы при сборке
- 0 TypeScript ошибок
- aislop: 100/100
- Удалены: @capacitor/*, @vitejs/plugin-react, vitest, @vercel/analytics, @vercel/speed-insights, dompurify
- Замена dompurify → isomorphic-dompurify (SafeHtml)
- scripts/postinstall.sh — патч postcss symlink

### 2026-04-08: Финальная версия v1
- 485 калькуляторов
- TypeScript типы исправлены
- Schema.org генераторы добавлены
- E2E тесты (Playwright)

---

## Ключевые файлы

| Файл | Назначение |
|------|-----------|
| `src/lib/calculators/index.ts` | Загрузчик, экспортирует getCalculators и др. |
| `src/lib/calculators/compute-helpers.ts` | 44 helper-функции |
| `src/lib/calculators/data/*.json` | 82 JSON data-файла |
| `src/lib/calculators/compute-*.ts` | 64 compute-файла |
| `src/lib/types.ts` | Тип Calculator (content optional) |
| `src/components/ui/safe-html.tsx` | SafeHtml + isomorphic-dompurify |
| `src/lib/schema.ts` | Schema.org SEO генераторы |
| `src/lib/categories.ts` | 10 категорий с подкатегориями |
| `src/lib/constants/urls.ts` | 183 URL-константы |
| `src/lib/articles-main.ts` | Основные статьи |
| `src/lib/articles-additional.ts` | Дополнительные статьи |
| `scripts/postinstall.sh` | Патч postcss |
| `.aislopignore` | Исключения для aislop |
| `.aislop.yml` | Конфигурация aislop |
