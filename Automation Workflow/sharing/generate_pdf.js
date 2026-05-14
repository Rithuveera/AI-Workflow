const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const htmlPath = 'file://' + path.resolve(__dirname, 'PRODUCT_WISE_CAROUSEL.html');
    console.log('Opening:', htmlPath);

    await page.goto(htmlPath, { waitUntil: 'networkidle' });

    // Set the viewport to match the LinkedIn Portrait aspect ratio defined in CSS
    await page.setViewportSize({ width: 1080, height: 1080 });

    await page.pdf({
        path: path.resolve(__dirname, 'PRODUCT_WISE_CAROUSEL.pdf'),
        width: '1080px',
        height: '1080px',
        printBackground: true,
        pageRanges: '1-8'
    });

    console.log('PDF generated successfully at: PRODUCT_WISE_CAROUSEL.pdf');
    // Generate Hero Mockup
    const heroPath = 'file://' + path.resolve(__dirname, 'WORKFLOW_HERO.html');
    console.log('Opening Hero Mockup:', heroPath);
    await page.goto(heroPath, { waitUntil: 'networkidle' });
    await page.setViewportSize({ width: 1200, height: 675 });
    await page.pdf({
        path: path.resolve(__dirname, 'WORKFLOW_HERO.pdf'),
        width: '1200px',
        height: '675px',
        printBackground: true
    });
    console.log('Hero Mockup generated: WORKFLOW_HERO.pdf');

    // Generate LinkedIn Square Graphic
    const graphicPath = 'file://' + path.resolve(__dirname, 'LINKEDIN_GRAPHIC.html');
    console.log('Opening LinkedIn Graphic:', graphicPath);
    await page.goto(graphicPath, { waitUntil: 'networkidle' });
    await page.setViewportSize({ width: 1200, height: 1200 });
    await page.waitForTimeout(2000); // Wait for animations and fonts
    await page.pdf({
        path: path.resolve(__dirname, 'LINKEDIN_GRAPHIC.pdf'),
        width: '1200px',
        height: '1200px',
        printBackground: true
    });
    console.log('LinkedIn Graphic generated: LINKEDIN_GRAPHIC.pdf');

    await browser.close();
})();
