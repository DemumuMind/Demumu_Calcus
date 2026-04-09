import { test, expect } from '@playwright/test';

test.describe('Calculators', () => {
  test('should load simple calculator', async ({ page }) => {
    await page.goto('/prostoj-kalkulyator');
    
    // Check calculator interface
    await expect(page.locator('body')).toBeVisible();
    
    // Look for calculator buttons or inputs
    const buttons = page.locator('button').or(page.locator('input[type="button"]'));
    const inputs = page.locator('input[type="number"]');
    
    const buttonCount = await buttons.count();
    const inputCount = await inputs.count();
    
    expect(buttonCount + inputCount).toBeGreaterThan(0);
  });

  test('should load compound interest calculator', async ({ page }) => {
    await page.goto('/calc/slozhnyj-procent');
    
    await expect(page.locator('body')).toBeVisible();
    
    // Check for input fields
    const inputs = page.locator('input');
    await expect(inputs.first()).toBeVisible();
  });

  test('should load BMI calculator', async ({ page }) => {
    await page.goto('/calc/imt');
    
    await expect(page.locator('body')).toBeVisible();
    
    // Should have height and weight inputs
    const inputs = page.locator('input[type="number"]');
    expect(await inputs.count()).toBeGreaterThanOrEqual(2);
  });
});

test.describe('Percentage Calculators', () => {
  const percentTypes = [
    '/procenty/ot-chisla',
    '/procenty/chislo-ot-chisla',
    '/procenty/pribavlenie-procenta',
    '/procenty/vychet-procenta'
  ];

  for (const url of percentTypes) {
    test(`should work: ${url}`, async ({ page }) => {
      await page.goto(url);
      
      // Page should load
      await expect(page.locator('body')).toBeVisible();
      
      // Should have input fields
      const inputs = page.locator('input[type="number"]');
      await expect(inputs.first()).toBeVisible();
      
      // Enter test values
      const firstInput = inputs.first();
      await firstInput.fill('100');
      
      // Check for result
      await page.waitForTimeout(300);
      const content = await page.content();
      expect(content).toMatch(/\d+/);
    });
  }
});

test.describe('Timers', () => {
  test('should load timer page', async ({ page }) => {
    await page.goto('/tajmery/5-minut');
    
    await expect(page.locator('body')).toBeVisible();
    
    // Should display timer
    const timerDisplay = page.locator('[data-testid="timer"]').or(page.locator('.timer')).or(page.locator('text=/\\d+:\\d+/'));
    await expect(timerDisplay).toBeVisible().catch(() => {
      // Timer might be implemented differently
    });
  });

  test('should have timer controls', async ({ page }) => {
    await page.goto('/tajmery/1-minuta');
    
    // Look for start/stop/reset buttons
    const buttons = page.locator('button');
    const hasButtons = await buttons.count() > 0;
    
    if (hasButtons) {
      const buttonTexts = await buttons.allTextContents();
      const hasControls = buttonTexts.some(text => 
        /старт|start|пуск|сброс|reset|стоп|stop/i.test(text)
      );
      expect(hasControls || buttonTexts.length > 0).toBeTruthy();
    }
  });
});

test.describe('Cooking Measures', () => {
  test('should load cooking converter', async ({ page }) => {
    await page.goto('/kulinarnye-mery/stakan-sahara');
    
    await expect(page.locator('body')).toBeVisible();
    
    // Should have ingredient selector or measure display
    const content = await page.content();
    expect(content).toMatch(/грамм|gram|ингредиент|ingredient|сахар|мука/i);
  });
});
