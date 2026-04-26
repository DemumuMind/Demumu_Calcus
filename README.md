# Calcus Clone (Demumu_Calcus)

Клон сайта [calcus.su](https://calcus.su) — коллекция бесплатных онлайн-калькуляторов на русском языке.

## О проекте

485+ онлайн-калькуляторов в 10 категориях:

- 🔬 **Наука и Учёба** — математика, физика, химия
- 🔄 **Конвертеры** — единицы измерения, валюты, системы счисления
- 💯 **Проценты** — НДС, НДФЛ, кредиты, ипотека
- ⏱ **Таймеры** — обратный отсчёт, pomodoro
- 🍳 **Кулинарные меры** — перевод мер веса и объёма
- 💪 **Здоровье и Красота** — ИМТ, калории, КБЖУ
- 🏗 **Строительство и Ремонт** — бетон, краска, плитка
- 🚗 **Транспорт** — расход топлива, амортизация
- 🖥 **Технологии** — пароли, хеши, кодирование
- 🏠 **Повседневное** — дни, возраст, дозировки

## Технологии

- **Next.js 16** (App Router, Server Components)
- **React 19** + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Vercel Analytics** + Speed Insights

## Разработка

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
npm start
```

## Тесты

```bash
npm test           # Unit-тесты (Vitest)
npx playwright test # E2E-тесты (Playwright)
```

## Структура

```
src/
  app/                  # Next.js App Router
    calc/[slug]/        # Страница калькулятора
    [category]/         # Страницы категорий
  components/
    calculator/         # UI компонентов калькуляторов
    layout/             # Header, Footer
    search/             # Поиск
    ui/                 # shadcn/ui primitives
  lib/
    calculators/        # Данные калькуляторов (485+)
    categories.ts       # Категории и подкатегории
    types.ts            # TypeScript типы
    schema.ts           # SEO Schema.org
```

## URL-параметры

Калькуляторы поддерживают предзаполнение через query-параметры:

```
/calc/konverter-temperatury?value=100&from=celsius&to=fahrenheit
/calc/kalkulyator-imt?weight=70&height=175
```

## Деплой

Проект развёрнут на Vercel: [calcus-site.vercel.app](https://calcus-site.vercel.app)
