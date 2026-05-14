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

        const url = 'file://' + htmlPath.replace(/\\/g, '/');

        console.log(`Starting PDF generation for: ${outputFileName}`);
        console.log(`Navigating to: ${url}`);

        try {
            await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

            console.log(`Waiting for images in ${outputFileName}...`);
            await page.evaluate(async () => {
                const selectors = Array.from(document.querySelectorAll('img'));
                await Promise.all(selectors.map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve; // Continue even if image fails
                    });
                }));
            });

            // Final longer wait for rendering
            await new Promise(r => setTimeout(r, 5000));

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
        // 1. Generate Carousel PDF
        await generateSafePdf('LINKEDIN_CAROUSEL.html', 'LINKEDIN_CAROUSEL.pdf', {
            width: '1080px',
            height: '1080px'
        });

        // 2. Generate Architecture PDF
        await generateSafePdf('ARCHITECTURE_FLOW.html', 'ARCHITECTURE_OVERVIEW.pdf', {
            width: '1400px',
            height: '1400px',
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });

        // 3. Generate Official Documentation PDF
        await generateSafePdf('OFFICIAL_WORKFLOW_DOCUMENT.html', 'OFFICIAL_WORKFLOW_DOCUMENT.pdf', {
            format: 'A4',
            margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
            displayHeaderFooter: true,
            headerTemplate: '<span></span>',
            footerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center; color: #94a3b8; font-family: sans-serif;">QA Automation Documentation - Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
        });

        // 4. Generate Latest Product-Wise Carousel PDF - REFINED
        await generateSafePdf('PRODUCT_WISE_CAROUSEL.html', 'LATEST_PRODUCT_WORKFLOW_CAROUSEL_REFINED.pdf', {
            width: '1080px',
            height: '1080px'
        });

        // 5. NEW: Premium V4 Partial Execution Carousel
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
