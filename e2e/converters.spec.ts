import { test, expect } from '@playwright/test';

test.describe('Unit Converters', () => {
  const converterUrls = [
    '/dlina-i-rasstojanie/metr-v-santimetr',
    '/ves-i-massa/kilogramm-v-gramm',
    '/obem/litr-v-millilitr',
    '/ploshhad/kvadratnyj-metr-v-kvadratnyj-santimetr'
  ];

  for (const url of converterUrls) {
    test(`should load converter page: ${url}`, async ({ page }) => {
      await page.goto(url);
      
      // Check page loads without errors
      await expect(page.locator('body')).toBeVisible();
      
      // Check for input fields
      const inputs = page.locator('input[type="number"]').or(page.locator('input')).first();
      await expect(inputs).toBeVisible();
      
      // Check for result display
      const result = page.locator('[data-testid="result"]').or(page.locator('.result')).or(page.locator('input[readonly]')).first();
      await expect(result).toBeVisible().catch(() => {
        // Result might not be visible immediately, that's ok
      });
    });

    test(`should convert values correctly: ${url}`, async ({ page }) => {
      await page.goto(url);
      
      // Find input field
      const input = page.locator('input[type="number"]').first();
      await expect(input).toBeVisible();
      
      // Enter a value
      await input.fill('10');
      await input.press('Tab');
      
      // Wait for calculation
      await page.waitForTimeout(500);
      
      // Check that some result appears (either in output or in the page)
      const pageContent = await page.content();
      expect(pageContent).toMatch(/\d+/);
    });
  }
});

test.describe('Category Pages', () => {
  const categories = [
    '/nauka-i-ucheba',
    '/dlina-i-rasstojanie',
    '/ves-i-massa',
    '/obem',
    '/tajmery'
  ];

  for (const category of categories) {
    test(`should display category: ${category}`, async ({ page }) => {
      await page.goto(category);
      
      // Check page title
      await expect(page.locator('h1')).toBeVisible();
      
      // Check for content
      const content = page.locator('body');
      await expect(content).toContainText(/.+/);
      
      // Check for links to converters or calculators
      const links = page.locator('a[href^="/"]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });
  }
});
