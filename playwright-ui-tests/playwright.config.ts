import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: 'html',
  // ...existing code...
  use: {
    actionTimeout: 0,
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
// ...existing code...
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});