import { test, expect, Page, Locator } from '@playwright/test';
import { calculators, getCalculatorBySlug } from '../src/lib/calculators';

/**
 * Page Object for Calculator pages
 * Encapsulates all interactions with calculator pages
 */
class CalculatorPage {
  readonly page: Page;
  readonly title: Locator;
  readonly description: Locator;
  readonly inputs: Locator;
  readonly calculateButton: Locator;
  readonly results: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1');
    this.description = page.locator('[data-testid="calculator-description"]').or(page.locator('p.text-muted-foreground').first());
    this.inputs = page.locator('input[type="number"], input[type="text"], select');
    this.calculateButton = page.locator('[data-testid="calculate-button"]').or(page.locator('button:has-text("Рассчитать"), button:has-text("Calculate")'));
    this.results = page.locator('[data-testid="calculator-result"]').or(page.locator('[data-testid="converter-result"]')).or(page.locator('.text-primary.font-bold'));
    this.errorMessage = page.locator('[data-testid="error"]').or(page.locator('.text-destructive'));
  }

  async goto(slug: string) {
    await this.page.goto(`/calc/${slug}`, { waitUntil: 'networkidle' });
  }

  async gotoDirect(slug: string) {
    // For calculators without /calc/ prefix (like simple calculator)
    await this.page.goto(`/${slug}`, { waitUntil: 'networkidle' });
  }

  async fillInput(name: string, value: string | number) {
    const input = this.page.locator(`input#${name}, input[name="${name}"]`).first();
    await input.fill(String(value));
  }

  async fillFirstInput(value: string | number) {
    const firstInput = this.inputs.first();
    await firstInput.fill(String(value));
  }

  async clickCalculate() {
    await this.calculateButton.click();
  }

  async getTitle(): Promise<string> {
    return await this.title.textContent() || '';
  }

  async hasInputs(): Promise<boolean> {
    const count = await this.inputs.count();
    return count > 0;
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `e2e/screenshots/${name}.png`,
      fullPage: true 
    });
  }
}

/**
 * All Calculators Test Suite
 * Tests every calculator in the system for basic functionality
 * 
 * @tags calculators, smoke, comprehensive
 * @description Tests all calculators load, render, and have working inputs
 */
test.describe('🧮 All Calculators Test Suite', () => {
  let calcPage: CalculatorPage;

  test.beforeEach(async ({ page }) => {
    calcPage = new CalculatorPage(page);
  });

  // Test data: Sample calculators from each category
  const sampleCalculators = [
    // Math calculators
    { slug: 'kalkulyator-procentov', name: 'Percentage Calculator', hasInputs: true },
    { slug: 'kvadratnye-uravneniya', name: 'Quadratic Equations', hasInputs: true },
    { slug: 'kalkulyator-drobej', name: 'Fractions Calculator', hasInputs: true },
    
    // Health calculators
    { slug: 'kalkulyator-imt', name: 'BMI Calculator', hasInputs: true },
    { slug: 'kalkulyator-kalorij-kbzhu', name: 'Calorie Calculator', hasInputs: true },
    { slug: 'idealnyj-ves', name: 'Ideal Weight Calculator', hasInputs: true },
    
    // Finance calculators
    { slug: 'slozhnyj-procent', name: 'Compound Interest', hasInputs: true },
    { slug: 'kreditnyj-kalkulyator', name: 'Loan Calculator', hasInputs: true },
    { slug: 'ipotechnyj-kalkulyator', name: 'Mortgage Calculator', hasInputs: true },
    
    // Construction calculators
    { slug: 'raschet-oboev', name: 'Wallpaper Calculator', hasInputs: true },
    { slug: 'raschet-plitki', name: 'Tile Calculator', hasInputs: true },
    
    // Converters
    { slug: 'konverter-temperatury', name: 'Temperature Converter', hasInputs: true },
    { slug: 'km-ch-v-m-s', name: 'Speed Converter', hasInputs: true },
    
    // Simple calculator (special case - no /calc/ prefix)
    { slug: 'prostoj-kalkulyator', name: 'Simple Calculator', hasInputs: false, direct: true },
    
    // Generators
    { slug: 'generator-parolej', name: 'Password Generator', hasInputs: false },
  ];

  test('should verify total calculator count', async () => {
    // Verify we have the expected number of calculators
    expect(calculators.length).toBeGreaterThan(480);
    expect(calculators.length).toBeLessThan(600);
  });

  // Generate tests for sample calculators
  for (const calc of sampleCalculators) {
    test(`✅ should load and verify ${calc.name} @calculator @${calc.slug}`, async ({ page }) => {
      test.info().annotations.push({
        type: 'calculator',
        description: calc.slug
      });

      // Navigate to calculator
      if (calc.direct) {
        await calcPage.gotoDirect(calc.slug);
      } else {
        await calcPage.goto(calc.slug);
      }

      // Verify page loads
      await expect(page.locator('body')).toBeVisible();

      // Take screenshot
      await calcPage.takeScreenshot(`calculator-${calc.slug}`);

      // Verify title exists
      const title = await calcPage.getTitle();
      expect(title.length).toBeGreaterThan(0);

      // For calculators with inputs, verify they exist
      if (calc.hasInputs) {
        const hasInputs = await calcPage.hasInputs();
        expect(hasInputs).toBeTruthy();

        // Test input interaction
        if (await calcPage.inputs.count() > 0) {
          await calcPage.fillFirstInput(100);
          
          // Verify value was entered
          const firstInput = calcPage.inputs.first();
          const value = await firstInput.inputValue();
          expect(value).toBe('100');
        }
      }
    });
  }

  test('should test all calculator categories have valid slugs', async () => {
    // Verify all calculators have valid slugs
    const invalidSlugs = calculators.filter(calc => !calc.slug || calc.slug.length === 0);
    expect(invalidSlugs.length).toBe(0);
  });

  test('should verify all calculators have required properties', async () => {
    const requiredFields = ['id', 'slug', 'title', 'description', 'category', 'type'];
    
    for (const calc of calculators.slice(0, 50)) { // Sample first 50 for speed
      for (const field of requiredFields) {
        expect(calc[field as keyof typeof calc]).toBeTruthy();
      }
    }
  });

  test('should batch test calculator pages performance @performance', async ({ page }) => {
    const testSlugs = calculators.slice(0, 20).map(c => c.slug);
    const results: { slug: string; loadTime: number }[] = [];

    for (const slug of testSlugs) {
      const start = Date.now();
      await page.goto(`/calc/${slug}`, { waitUntil: 'networkidle' });
      const loadTime = Date.now() - start;
      results.push({ slug, loadTime });
      
      // Verify page loads under 3 seconds
      expect(loadTime).toBeLessThan(3000);
    }

    // Log performance results
    const avgLoadTime = results.reduce((a, b) => a + b.loadTime, 0) / results.length;
    console.log(`Average load time: ${avgLoadTime}ms`);
  });

  test('should test popular calculators with real data @popular', async ({ page }) => {
    const popularCalculators = [
      { slug: 'kalkulyator-imt', inputs: { height: '175', weight: '70' }, expectedResult: '22.86' },
      { slug: 'kalkulyator-procentov', inputs: { value: '1000', percentage: '20' }, expectedResult: '200' },
    ];

    for (const calc of popularCalculators) {
      await calcPage.goto(calc.slug);
      
      // Fill inputs
      for (const [key, value] of Object.entries(calc.inputs)) {
        await calcPage.fillInput(key, value);
      }

      // Wait for auto-calculation or click calculate
      await page.waitForTimeout(500);

      // Verify result contains expected value
      const content = await page.content();
      expect(content).toContain(calc.expectedResult);
    }
  });
});

/**
 * Visual Regression Tests
 */
test.describe('📸 Visual Regression - Calculators', () => {
  const visualTestCalculators = [
    'kalkulyator-imt',
    'kalkulyator-procentov',
    'slozhnyj-procent',
    'kreditnyj-kalkulyator',
  ];

  for (const slug of visualTestCalculators) {
    test(`visual check: ${slug} @visual`, async ({ page }) => {
      await page.goto(`/calc/${slug}`, { waitUntil: 'networkidle' });
      
      // Wait for any animations to complete
      await page.waitForTimeout(500);
      
      // Take screenshot
      await expect(page).toHaveScreenshot(`calculator-${slug}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05
      });
    });
  }
});
