<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Demumu Calcus — Правила для агентов

## Проект

759 онлайн-калькуляторов на русском языке. Next.js 16.2.9 + React 19.

Репозиторий: https://github.com/DemumuMind/Demumu_Calcus (private)

## Data-Driven архитектура

Калькуляторы используют разделение данных и логики. НЕ добавляйте калькуляторы как монолитные TS-объекты.

### Структура

```
src/lib/calculators/
  data/*.json           — 82 JSON-файла с метаданными
  compute-*.ts          — 64 файла с compute-функциями
  compute-helpers.ts    — 44 helper-функции
  index.ts              — Загрузчик + экспорты
```

### Добавление калькулятора

1. **JSON data** — добавить запись в соответствующий `data/*.json`:
   ```json
   {
     "slug": "kalkulyator-primera",
     "id": "primer-1",
     "title": "Калькулятор примера",
     "description": "Описание калькулятора",
     "category": "nauka-i-ucheba",
     "subcategory": "matematika",
     "type": "formula",
     "inputs": [...],
     "outputs": [...],
     "content": { "article": "<h2>...</h2>", "faq": [...] }
   }
   ```

2. **Compute-функция** — добавить в соответствующий `compute-*.ts`:
   ```typescript
   import { fmtResult } from './compute-helpers';

   const computeMap: Record<string, ComputeFn> = {
     // ... существующие
     'primer-1': (inputs) => {
       const a = Number(inputs.a) || 0;
       const b = Number(inputs.b) || 0;
       return { result: fmtResult(a + b) };
     },
   };
   ```

3. Калькулятор автоматически подхватится `index.ts` при следующей сборке.

### НЕ делайте

- НЕ создавайте монолитные TS-файлы с калькуляторами (старый паттерн)
- НЕ добавляйте compute-логику в JSON-файлы
- НЕ добавляйте метаданные в compute-файлы
- НЕ упоминайте Vitest — он удалён из проекта
- НЕ упоминайте @vercel/analytics или @vercel/speed-insights — они удалены
- НЕ упоминайте @capacitor/* — они удалены
- НЕ используйте dompurify — используйте isomorphic-dompurify

## Технологии

- **Next.js 16.2.9** — App Router, Server Components, Turbopack
- **React 19** + TypeScript (строгий режим)
- **Tailwind CSS** + shadcn/ui
- **isomorphic-dompurify** — через SafeHtml компонент
- **Playwright** — E2E тесты
- **aislop** — качество кода (100/100)

## Экспорты index.ts

```typescript
// Используйте эти функции для доступа к калькуляторам:
import { getCalculators, getCalculatorBySlug, getCalculatorsByCategory, getCalculatorsBySubcategory, calculators } from '@/lib/calculators';
```

## Категории (10)

1. Наука и Учёба (nauka-i-ucheba)
2. Конвертеры (konvertery)
3. Проценты (procenty)
4. Таймеры (tajmery)
5. Кулинарные меры (kulinarnye-mery)
6. Здоровье и Красота (zdorove-i-krasota)
7. Строительство и Ремонт (stroitelstvo-i-remont)
8. Транспорт (transport)
9. Технологии (tekhnologii)
10. Повседневное (povsednevnoe)

## Язык

Все UI-тексты на русском языке. Код, комментарии и документация — на русском.

## Команды

```bash
npm run dev          # Dev-сервер
npm run build        # Production-сборка (1573 страниц)
npx tsc --noEmit     # TypeScript проверка
npx aislop scan      # Качество кода (100/100)
npx playwright test  # E2E-тесты
```

## Статус сборки

- 759 калькуляторов
- 1573 статических страницы
- 0 TypeScript ошибок
- aislop: 100/100
