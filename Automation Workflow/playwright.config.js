const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    // Increase timeout to 60 seconds to handle PDF generation and network delays
    timeout: 60000,
    expect: {
        timeout: 10000,
    },
    reporter: [['list'], ['html']],
    use: {
        // Run headless (no browser window)
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
    },
});
