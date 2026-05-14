const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.setViewportSize({ width: 1400, height: 1200 });

    // Ensure output directory exists
    const outputDir = path.resolve(__dirname, '../sharing');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    async function generateSafePdf(htmlFileName, outputFileName, options) {
        const htmlPath = path.resolve(__dirname, '../sharing', htmlFileName);
        const outputPath = path.resolve(__dirname, '../sharing', outputFileName);

        if (!fs.existsSync(htmlPath)) {
            console.error(`ERROR: Source file not found: ${htmlPath}`);
            return;
        }

        // For Windows absolute file paths, we need 3 slashes
        const url = 'file:///' + htmlPath.replace(/\\/g, '/');

        console.log(`Starting PDF generation for: ${outputFileName}`);
        console.log(`Navigating to: ${url}`);

        try {
            await page.goto(url, { waitUntil: 'load', timeout: 90000 });

            // Critical: Emulate screen to avoid print CSS hiding images
            await page.emulateMedia({ media: 'screen' });

            console.log(`Waiting for images in ${outputFileName}...`);
            await page.evaluate(async () => {
                const selectors = Array.from(document.querySelectorAll('img'));
                await Promise.all(selectors.map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                }));
            });

            // Extra long wait for heavy Base64 rendering
            await page.waitForTimeout(7000);

            await page.pdf({
                path: outputPath,
                printBackground: true,
                ...options
            });
            console.log(`Successfully Generated: ${outputPath}\n`);
        } catch (e) {
            console.error(`FAILED to generate ${outputFileName}:`, e.message);
        }
    }

    try {
        // 5. High Fidelity Carousel
        await generateSafePdf('PREMIUM_WORKFLOW_CAROUSEL.html', 'QAUTOX_V4_PARTIAL_EXECUTION_CAROUSEL.pdf', {
            width: '1080px',
            height: '1080px'
        });

    } catch (err) {
        console.error('CRITICAL ERROR:', err.message);
    } finally {
        await browser.close();
        console.log('Browser closed.');
    }
})();
