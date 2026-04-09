# End-to-End Testing Suite for Calcus.su

Comprehensive Playwright E2E tests covering all major functionality of the calcus.su website.

## 📁 Test Files

| File | Description | Tests Count |
|------|-------------|-------------|
| `all-calculators.spec.ts` | Tests all calculators load, render, and function | 20+ |
| `error-handling.spec.ts` | Tests validation, errors, and edge cases | 25+ |
| `mobile-menu.spec.ts` | Tests mobile navigation and responsive design | 30+ |
| `dark-mode.spec.ts` | Tests theme switching and persistence | 25+ |

## 🚀 Quick Start

### Installation

```bash
npm install
npx playwright install
```

### Run All Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test all-calculators.spec.ts

# Run with UI mode for debugging
npx playwright test --ui

# Run in headed mode (visible browser)
npx playwright test --headed
```

### Run by Tags

```bash
# Run only calculator tests
npx playwright test --grep "@calculator"

# Run mobile tests
npx playwright test --grep "@mobile"

# Run error handling tests
npx playwright test --grep "@error-handling"

# Run dark mode tests
npx playwright test --grep "@dark-mode"
```

### Run on Specific Browsers

```bash
# Chromium only
npx playwright test --project=chromium

# Mobile Chrome
npx playwright test --project="Mobile Chrome"

# All mobile browsers
npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
```

## 📝 Test Organization

### Tags

- `@calculator` - Calculator-related tests
- `@mobile` - Mobile/responsive tests
- `@dark-mode` - Theme switching tests
- `@error-handling` - Error and validation tests
- `@404` - Not found page tests
- `@validation` - Input validation tests
- `@performance` - Performance tests
- `@visual` - Visual regression tests
- `@accessibility` / `@a11y` - Accessibility tests

### Test Suites

#### 1. All Calculators Test Suite

Tests every calculator for:
- Page loading
- Input fields presence
- Calculate button functionality
- Result display
- Screenshot capture

**Key tests:**
- Sample calculators from each category
- Performance testing (page load times)
- Visual regression
- Popular calculators with real data

#### 2. Error Handling Test Suite

Tests error scenarios:
- Empty input validation
- Invalid data types (letters, special chars)
- Negative numbers where not allowed
- Missing required fields
- Network errors (offline mode)
- 404 pages
- Boundary value testing
- URL parameter handling

#### 3. Mobile Menu Test Suite

Tests mobile navigation:
- Menu button visibility on mobile
- Menu open/close functionality
- Touch interactions
- Responsive breakpoints
- Footer navigation on mobile
- Search in mobile menu
- Performance (menu open speed)

#### 4. Dark Mode Test Suite

Tests theme switching:
- Theme toggle functionality
- Theme persistence across pages
- Component styling in dark mode
- System preference detection
- Theme transitions
- Accessibility in dark mode
- Edge cases (corrupted storage, rapid toggles)

## 📊 Test Reports

After running tests, reports are available:

```bash
# Open HTML report
npx playwright show-report

# View JSON results
cat playwright-results.json
```

Reports include:
- Test results summary
- Screenshots (on failure)
- Traces (on failure)
- Videos (on failure)
- Performance metrics

## 📸 Screenshots

Screenshots are saved to `e2e/screenshots/`:
- Calculator pages: `calculator-{slug}.png`
- Error states: `error-{type}.png`
- Mobile views: `mobile-{device}.png`
- Dark mode: `dark-mode-{page}.png`

## 🔧 Configuration

### Environment Variables

```bash
# Use local development server
BASE_URL=http://localhost:3000 npx playwright test

# Use staging
BASE_URL=https://staging.calcus.su npx playwright test

# Use production
BASE_URL=https://calcus.su npx playwright test

# CI mode (reduced parallelism, more retries)
CI=true npx playwright test
```

### Playwright Config

Configuration in `playwright.config.ts`:
- Desktop: Chrome, Firefox, Safari
- Mobile: Pixel 5, iPhone 12
- Tablet: iPad Pro 11
- Parallel execution (4 workers locally, 1 in CI)
- Retries: 2 in CI, 0 locally

## 🧪 Writing New Tests

### Page Object Pattern

```typescript
class MyPage {
  readonly page: Page;
  readonly element: Locator;

  constructor(page: Page) {
    this.page = page;
    this.element = page.locator('[data-testid="my-element"]');
  }

  async goto() {
    await this.page.goto('/my-page');
  }
}
```

### Test Structure

```typescript
test.describe('Feature Name @tag', () => {
  let page: MyPage;

  test.beforeEach(async ({ page }) => {
    page = new MyPage(page);
  });

  test('should do something @specific-tag', async ({ page }) => {
    // Test implementation
  });
});
```

## 🐛 Debugging

### Debug Mode

```bash
# Run with Playwright Inspector
npx playwright test --debug

# Slow motion (100ms between actions)
npx playwright test --slow-mo 100

# Keep browser open after failure
npx playwright test --headed --retries=0
```

### Viewing Traces

```bash
# Traces are saved on failure
npx playwright show-trace playwright-report/trace.zip
```

## 📦 Maintenance

### Updating Selectors

If UI changes break tests:

1. Check `data-testid` attributes first
2. Update locators in Page Objects
3. Re-run tests with `--update-snapshots` for visual tests

### Adding Data Attributes

Add to components for more stable selectors:

```tsx
<button data-testid="calculate-button">Рассчитать</button>
<div data-testid="result-container">...</div>
```

## 🎯 Best Practices

1. **Use Page Objects** - Encapsulate page logic
2. **Add Tags** - Makes filtering tests easier
3. **Take Screenshots** - Visual verification
4. **Use Locators** - Prefer semantic selectors
5. **Test Edge Cases** - Empty inputs, invalid data
6. **Mobile First** - Test responsive design
7. **Performance** - Check load times

## 📚 Resources

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors](https://playwright.dev/docs/selectors)
- [Assertions](https://playwright.dev/docs/test-assertions)
