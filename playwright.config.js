const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  use: {
    headless: true,
    viewport: null, // Allow full screen
    launchOptions: {
      args: ['--start-maximized'],
    },
    trace: 'on-first-retry',
    slowMo: 100,
    actionTimeout: 40000,
    navigationTimeout: 15000,
  },
  projects: [
    {
      name: 'chromium',
      use: {}, // Use the global 'use' settings without overriding
    },
  ],
});
