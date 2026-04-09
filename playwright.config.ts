import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Enhanced reporters
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-results.json' }],
    ['list'],
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://calcus-site.vercel.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  // Snapshot configuration for visual regression tests
  snapshotPathTemplate: 'e2e/snapshots/{testFilePath}/{arg}{ext}',
  
  // Expect configuration
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixels: 100,
      maxDiffPixelRatio: 0.05,
    },
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.05,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      metadata: {
        viewport: '1920x1080',
        device: 'desktop',
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      metadata: {
        viewport: '1920x1080',
        device: 'desktop',
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      metadata: {
        viewport: '1920x1080',
        device: 'desktop',
      },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      metadata: {
        viewport: '393x851',
        device: 'mobile',
        platform: 'android',
      },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      metadata: {
        viewport: '390x844',
        device: 'mobile',
        platform: 'ios',
      },
    },
    {
      name: 'Tablet',
      use: { ...devices['iPad Pro 11'] },
      metadata: {
        viewport: '834x1194',
        device: 'tablet',
        platform: 'ios',
      },
    },
  ],
  
  // Web server configuration for local testing
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
