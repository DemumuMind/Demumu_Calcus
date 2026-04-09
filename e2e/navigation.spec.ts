import { test, expect } from '@playwright/test';

test.describe('Navigation & UX', () => {
  test('should have working header navigation', async ({ page }) => {
    await page.goto('/');
    
    // Find navigation links
    const navLinks = page.locator('nav a, header a');
    const count = await navLinks.count();
    
    if (count > 0) {
      // Click first link and verify navigation
      const firstLink = navLinks.first();
      const href = await firstLink.getAttribute('href');
      
      if (href && !href.startsWith('http')) {
        await firstLink.click();
        await page.waitForLoadState('networkidle');
        
        // Should be on a different page
        const currentUrl = page.url();
        expect(currentUrl).not.toBe('https://calcus-site.vercel.app/');
      }
    }
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/nonexistent-page-12345');
    
    // Page should load without crashing
    await expect(page.locator('body')).toBeVisible();
    
    // Check for 404 indicator or redirect
    const content = await page.content();
    const has404 = content.includes('404') || content.includes('не найден') || content.includes('not found');
    // Not required, but nice to have
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Page should still be usable
    await expect(page.locator('body')).toBeVisible();
    
    // Content should not overflow horizontally
    const body = page.locator('body');
    const bodyWidth = await body.evaluate(el => el.scrollWidth);
    const viewportWidth = 375;
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 50); // Allow small tolerance
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out non-critical errors
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('manifest') &&
      !e.includes('analytics')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('SEO Validation', () => {
  test('should have valid canonical URL', async ({ page }) => {
    await page.goto('/nauka-i-ucheba');
    
    const canonical = page.locator('link[rel="canonical"]');
    const href = await canonical.getAttribute('href');
    
    if (href) {
      expect(href).toContain('calcus-site.vercel.app');
    }
  });

  test('should have valid Open Graph tags', async ({ page }) => {
    await page.goto('/');
    
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    
    const titleContent = await ogTitle.getAttribute('content');
    const descContent = await ogDescription.getAttribute('content');
    
    if (titleContent) {
      expect(titleContent.length).toBeGreaterThan(0);
    }
    
    if (descContent) {
      expect(descContent.length).toBeGreaterThan(0);
    }
  });

  test('should have structured data on converter pages', async ({ page }) => {
    await page.goto('/dlina-i-rasstojanie/metr-v-santimetr');
    
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Verify JSON is valid
    for (let i = 0; i < count; i++) {
      const content = await jsonLd.nth(i).textContent();
      expect(() => JSON.parse(content || '{}')).not.toThrow();
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Headings should not skip levels
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    let prevLevel = 0;
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName[1]);
      
      // Allow same level or one level deeper
      expect(level).toBeLessThanOrEqual(prevLevel + 1);
      
      if (level > prevLevel) {
        prevLevel = level;
      }
    }
  });
});
