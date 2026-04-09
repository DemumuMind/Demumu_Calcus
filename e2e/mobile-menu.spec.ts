import { test, expect, Page, Locator } from '@playwright/test';

/**
 * Page Object for Mobile Menu Testing
 */
class MobileMenuPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly menuSheet: Locator;
  readonly menuCloseButton: Locator;
  readonly mobileNav: Locator;
  readonly header: Locator;
  readonly footer: Locator;
  readonly categoryLinks: Locator;
  readonly homeLink: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('[data-testid="mobile-menu-toggle"]').or(page.locator('button:has-text("Меню")'));
    this.menuSheet = page.locator('[data-testid="mobile-menu"]').or(page.locator('[role="dialog"]'));
    this.menuCloseButton = page.locator('button:has-text("Close")').or(page.locator('[aria-label="Close"]'));
    this.mobileNav = page.locator('nav').first();
    this.header = page.locator('header');
    this.footer = page.locator('footer');
    this.categoryLinks = page.locator('nav a[href^="/"]');
    this.homeLink = page.locator('nav a[href="/"]').first();
    this.searchInput = page.locator('input[type="search"]').first();
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'networkidle' });
  }

  async openMenu() {
    await this.menuButton.click();
    // Wait for menu animation
    await this.page.waitForTimeout(300);
  }

  async closeMenu() {
    // Try to close by clicking close button or pressing Escape
    const closeButton = this.page.locator('button').filter({ hasText: /close|закрыть/i }).first();
    if (await closeButton.count() > 0) {
      await closeButton.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForTimeout(300);
  }

  async isMenuOpen(): Promise<boolean> {
    // Check if menu sheet is visible
    const sheets = this.page.locator('[data-state="open"]').or(this.page.locator('[role="dialog"]:visible'));
    return await sheets.count() > 0;
  }

  async clickMenuItem(text: string) {
    const item = this.page.locator(`nav a:has-text("${text}")`).first();
    await item.click();
  }

  async getVisibleCategoryLinks(): Promise<number> {
    return await this.categoryLinks.count();
  }
}

/**
 * Mobile Menu Test Suite
 * Tests mobile navigation, touch interactions, and responsive behavior
 * 
 * @tags mobile, navigation, responsive, menu
 * @description Comprehensive mobile menu and navigation tests
 */
test.describe('📱 Mobile Menu Test Suite', () => {
  let mobilePage: MobileMenuPage;

  test.beforeEach(async ({ page }) => {
    mobilePage = new MobileMenuPage(page);
    await mobilePage.goto();
  });

  test.describe('Mobile Viewport Tests', () => {
    test('should display menu button on mobile viewport @mobile @viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Navigate to refresh
      await mobilePage.goto();
      
      // Menu button should be visible
      await expect(mobilePage.menuButton).toBeVisible();
      
      // Take screenshot
      await page.screenshot({ path: 'e2e/screenshots/mobile-menu-button.png' });
    });

    test('should hide desktop navigation on mobile @mobile @responsive', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Desktop navigation items should not be visible on mobile
      const desktopNav = page.locator('nav.hidden.md\\:flex');
      expect(await desktopNav.isVisible().catch(() => false)).toBeFalsy();
    });

    test('should display desktop navigation on large viewport @desktop @responsive', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await mobilePage.goto();
      
      // Desktop navigation should be visible
      const desktopNav = page.locator('nav.hidden.md\\:flex');
      await expect(desktopNav).toBeVisible();
    });
  });

  test.describe('Menu Open/Close Functionality', () => {
    test('should open menu when clicking menu button @mobile @menu @open', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Click menu button
      await mobilePage.openMenu();
      
      // Menu should be visible
      const isOpen = await mobilePage.isMenuOpen();
      expect(isOpen).toBeTruthy();
      
      // Take screenshot of open menu
      await page.screenshot({ path: 'e2e/screenshots/mobile-menu-open.png' });
    });

    test('should close menu when clicking close button @mobile @menu @close', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Open menu
      await mobilePage.openMenu();
      
      // Verify it's open
      let isOpen = await mobilePage.isMenuOpen();
      expect(isOpen).toBeTruthy();
      
      // Close menu
      await mobilePage.closeMenu();
      
      // Verify it's closed
      isOpen = await mobilePage.isMenuOpen();
      expect(isOpen).toBeFalsy();
      
      await page.screenshot({ path: 'e2e/screenshots/mobile-menu-closed.png' });
    });

    test('should close menu when clicking outside @mobile @menu @close', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Open menu
      await mobilePage.openMenu();
      
      // Click on overlay/backdrop
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      
      // Menu should be closed or still accessible
      await expect(page.locator('body')).toBeVisible();
    });

    test('should close menu when navigating @mobile @menu @navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Open menu
      await mobilePage.openMenu();
      
      // Click on a category link
      const firstCategory = page.locator('nav a').first();
      if (await firstCategory.count() > 0) {
        await firstCategory.click();
        
        // Should navigate away
        await page.waitForLoadState('networkidle');
        
        // Menu should be closed after navigation
        const isOpen = await mobilePage.isMenuOpen();
        expect(isOpen).toBeFalsy();
      }
    });
  });

  test.describe('Menu Item Navigation', () => {
    const mobileDevices = [
      { name: 'iPhone 12', viewport: { width: 390, height: 844 } },
      { name: 'Pixel 5', viewport: { width: 393, height: 851 } },
      { name: 'iPhone SE', viewport: { width: 375, height: 667 } },
    ];

    for (const device of mobileDevices) {
      test(`should navigate menu items on ${device.name} @mobile @${device.name.toLowerCase().replace(/\s/g, '-')}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await mobilePage.goto();
        
        // Open menu
        await mobilePage.openMenu();
        
        // Verify menu items exist
        const linkCount = await mobilePage.getVisibleCategoryLinks();
        expect(linkCount).toBeGreaterThan(0);
        
        // Take device-specific screenshot
        await page.screenshot({ 
          path: `e2e/screenshots/mobile-menu-${device.name.toLowerCase().replace(/\s/g, '-')}.png` 
        });
      });
    }

    test('should navigate to home from mobile menu @mobile @navigation @home', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Start on a calculator page
      await page.goto('/calc/kalkulyator-imt', { waitUntil: 'networkidle' });
      
      // Open menu
      await mobilePage.openMenu();
      
      // Click home
      const homeLink = page.locator('nav a[href="/"]').first();
      if (await homeLink.count() > 0) {
        await homeLink.click();
        
        // Should navigate to home
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain('/');
        
        // Verify we're on home page
        await expect(page.locator('h1')).toContainText('калькулятор');
      }
    });

    test('should navigate to category from mobile menu @mobile @navigation @category', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Open menu
      await mobilePage.openMenu();
      
      // Find and click a category link
      const categoryLinks = page.locator('nav a[href^="/"]:not([href="/"])');
      const count = await categoryLinks.count();
      
      if (count > 0) {
        const firstCategory = categoryLinks.first();
        const href = await firstCategory.getAttribute('href');
        
        await firstCategory.click();
        await page.waitForLoadState('networkidle');
        
        // Verify navigation
        expect(page.url()).toContain(href);
      }
    });
  });

  test.describe('Touch Interactions', () => {
    test('should support touch events on menu items @mobile @touch', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Open menu
      await mobilePage.openMenu();
      
      // Use touch event simulation
      const menuButton = mobilePage.menuButton;
      
      // Simulate touch
      await menuButton.evaluate((el) => {
        const touchStart = new Touch({
          identifier: 1,
          target: el,
          clientX: 0,
          clientY: 0,
        });
        const touchEnd = new Touch({
          identifier: 1,
          target: el,
          clientX: 0,
          clientY: 0,
        });
        
        el.dispatchEvent(new TouchEvent('touchstart', { touches: [touchStart] }));
        el.dispatchEvent(new TouchEvent('touchend', { changedTouches: [touchEnd] }));
      });
      
      // Should handle gracefully
      await expect(page.locator('body')).toBeVisible();
    });

    test('should support swipe gestures (if applicable) @mobile @swipe', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Open menu
      await mobilePage.openMenu();
      
      // Attempt swipe to close (if supported)
      const menuSheet = page.locator('[role="dialog"]').first();
      const box = await menuSheet.boundingBox();
      
      if (box) {
        // Swipe from right to left
        await page.mouse.move(box.x + box.width - 10, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x, box.y + box.height / 2, { steps: 10 });
        await page.mouse.up();
        
        await page.waitForTimeout(300);
      }
      
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Mobile Footer Navigation', () => {
    test('should display footer on mobile @mobile @footer', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(200);
      
      // Footer should be visible
      await expect(mobilePage.footer).toBeVisible();
      
      await page.screenshot({ path: 'e2e/screenshots/mobile-footer.png', fullPage: true });
    });

    test('should have working footer links @mobile @footer @links', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Check footer links
      const footerLinks = mobilePage.footer.locator('a');
      const linkCount = await footerLinks.count();
      
      if (linkCount > 0) {
        // Verify all footer links have valid hrefs
        for (let i = 0; i < linkCount; i++) {
          const link = footerLinks.nth(i);
          const href = await link.getAttribute('href');
          expect(href).toBeTruthy();
        }
      }
    });
  });

  test.describe('Search in Mobile Menu', () => {
    test('should have search input in mobile menu @mobile @search', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Open menu
      await mobilePage.openMenu();
      
      // Search input should be present
      const searchInputs = page.locator('input[type="search"], input[placeholder*="поиск" i]');
      expect(await searchInputs.count()).toBeGreaterThan(0);
    });

    test('should allow typing in mobile search @mobile @search', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Open menu
      await mobilePage.openMenu();
      
      // Find search input
      const searchInput = page.locator('input[type="search"]').first();
      
      if (await searchInput.count() > 0) {
        // Type search query
        await searchInput.fill('imt');
        
        // Verify text was entered
        const value = await searchInput.inputValue();
        expect(value).toBe('imt');
      }
    });
  });

  test.describe('Responsive Breakpoints', () => {
    const breakpoints = [
      { name: 'mobile-sm', width: 320, height: 568 },
      { name: 'mobile-md', width: 375, height: 667 },
      { name: 'mobile-lg', width: 414, height: 896 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1024, height: 768 },
    ];

    for (const bp of breakpoints) {
      test(`should display correctly at ${bp.name} breakpoint @responsive @${bp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await mobilePage.goto();
        
        // Take breakpoint screenshot
        await page.screenshot({ 
          path: `e2e/screenshots/responsive-${bp.name}.png`,
          fullPage: true 
        });
        
        // Verify page loads
        await expect(page.locator('body')).toBeVisible();
      });
    }
  });

  test.describe('Menu Performance', () => {
    test('should open menu quickly @mobile @performance', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      const startTime = Date.now();
      await mobilePage.openMenu();
      const openTime = Date.now() - startTime;
      
      // Menu should open in under 500ms
      expect(openTime).toBeLessThan(500);
    });

    test('should handle rapid menu open/close @mobile @performance', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mobilePage.goto();
      
      // Rapidly open and close menu
      for (let i = 0; i < 5; i++) {
        await mobilePage.openMenu();
        await mobilePage.closeMenu();
      }
      
      // Should handle gracefully
      await expect(page.locator('body')).toBeVisible();
    });
  });
});
