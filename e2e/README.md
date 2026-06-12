# E2E-тесты Demumu Calcus

Комплексные Playwright E2E-тесты для проекта Demumu Calcus (759 калькуляторов).

## Тестовые файлы

| Файл | Описание | Тестов |
|------|----------|--------|
| `all-calculators.spec.ts` | Загрузка, рендер, работа калькуляторов | 20+ |
| `error-handling.spec.ts` | Валидация, ошибки, краевые случаи | 25+ |
| `mobile-menu.spec.ts` | Мобильная навигация, адаптивность | 30+ |
| `dark-mode.spec.ts` | Переключение темы, сохранение | 25+ |

## Быстрый старт

```bash
npm install
npx playwright install
npx playwright test
```

## Запуск тестов

```bash
# Все тесты
npx playwright test

# Конкретный файл
npx playwright test all-calculators.spec.ts

# UI-режим для отладки
npx playwright test --ui

# С видимым браузером
npx playwright test --headed
```

### Фильтрация по тегам

```bash
npx playwright test --grep "@calculator"
npx playwright test --grep "@mobile"
npx playwright test --grep "@error-handling"
npx playwright test --grep "@dark-mode"
```

### Запуск на конкретных браузерах

```bash
npx playwright test --project=chromium
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
```

## Теги

- `@calculator` — тесты калькуляторов
- `@mobile` — мобильные/адаптивные тесты
- `@dark-mode` — переключение темы
- `@error-handling` — ошибки и валидация
- `@404` — страница не найдена
- `@validation` — валидация ввода
- `@performance` — производительность
- `@visual` — визуальная регрессия
- `@accessibility` / `@a11y` — доступность

## Конфигурация

### Переменные окружения

```bash
BASE_URL=http://localhost:3000 npx playwright test   # Локально
BASE_URL=https://calcus-site.vercel.app npx playwright test  # Production
CI=true npx playwright test                          # CI-режим
```

### playwright.config.ts

- Desktop: Chrome, Firefox, Safari
- Mobile: Pixel 5, iPhone 12
- Tablet: iPad Pro 11
- Параллельное выполнение (4 workers локально, 1 в CI)
- Попытки: 2 в CI, 0 локально

## Отчёты

```bash
npx playwright show-report           # HTML-отчёт
```

Отчёты включают: результаты, скриншоты (при ошибке), трейсы, видео, метрики.

## Скриншоты

Сохраняются в `e2e/screenshots/`:
- Калькуляторы: `calculator-{slug}.png`
- Ошибки: `error-{type}.png`
- Мобильные: `mobile-{device}.png`
- Тёмная тема: `dark-mode-{page}.png`

## Отладка

```bash
npx playwright test --debug          # Playwright Inspector
npx playwright test --slow-mo 100    # Замедление
npx playwright test --headed --retries=0  # Браузер открыт после ошибки
npx playwright show-trace playwright-report/trace.zip  # Трейс
```

## Написание новых тестов

```typescript
test.describe('Функция @tag', () => {
  test('должен работать @specific-tag', async ({ page }) => {
    await page.goto('/calc/kalkulyator-imt');
    // ...
  });
});
```

Используйте `data-testid` для стабильных селекторов:

```tsx
<button data-testid="calculate-button">Рассчитать</button>
<div data-testid="result-container">...</div>
```

## Ресурсы

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors](https://playwright.dev/docs/selectors)
- [Assertions](https://playwright.dev/docs/test-assertions)
