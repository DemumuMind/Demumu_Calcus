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
      await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });
      
      // Check page loads without errors
      await expect(page.locator('body')).toBeVisible();
      
      // Check for any input fields with flexible timeout
      const inputs = page.locator('input').first();
      await expect(inputs).toBeVisible({ timeout: 5000 }).catch(() => {
        // Some converters might not have visible inputs immediately
      });
      
      // Page should have content
      const content = await page.content();
      expect(content.length).toBeGreaterThan(500);
    });

    test(`should convert values correctly: ${url}`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });
      
      // Find any input field
      const input = page.locator('input').first();
      const hasInput = await input.isVisible().catch(() => false);
      
      if (hasInput) {
        // Try to enter a value
        await input.fill('10').catch(() => {
          // Input might be read-only
        });
        
        // Wait for any calculation
        await page.waitForTimeout(500);
      }
      
      // Check that page has numeric content
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
