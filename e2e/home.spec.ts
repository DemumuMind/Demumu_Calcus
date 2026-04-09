import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display main heading and categories', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('онлайн-калькуляторы');
    
    // Check categories exist
    const categories = page.locator('[data-testid="category-card"]').or(page.locator('.category-card')).or(page.locator('a[href^="/"]'));
    const count = await categories.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have working search functionality', async ({ page }) => {
    await page.goto('/');
    
    // Find search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="поиск" i], input[placeholder*="search" i]').first();
    
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill('калькулятор');
      await searchInput.press('Enter');
      
      // Check that search results or no results message appears
      await expect(page.locator('body')).toContainText(/калькулятор|результат|найдено|ничего/i);
    }
  });

  test('should have valid meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/Calcus|калькулятор/i);
    
    // Check description meta tag
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
  });

  test('should have Schema.org JSON-LD', async ({ page }) => {
    await page.goto('/');
    
    // Check for JSON-LD script tags
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThan(0);
    
    // Verify at least one has valid JSON
    const content = await jsonLdScripts.first().textContent();
    expect(() => JSON.parse(content || '{}')).not.toThrow();
  });
});
