const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    try {
        await page.goto('https://datnext-qa.algosium.com/login');
        await page.fill('input[name="username"]', 'Veera');
        await page.fill('input[name="password"]', 'Rithu@11');
        await page.click('button:has-text("Login")');
        await page.waitForURL('**/dashboard');
        await page.goto('https://datnext-qa.algosium.com/master/currency');
        await page.waitForSelector('tbody tr');

        console.log("Starting Header Click Test...");

        const result = await page.evaluate(async () => {
            const results = [];
            const ths = Array.from(document.querySelectorAll('th')).filter(th => th.innerText.includes('CODE'));

            for (let i = 0; i < ths.length; i++) {
                const th = ths[i];
                const before = document.querySelector('tbody tr td')?.innerText;

                // Try clicking the TH
                th.click();
                await new Promise(r => setTimeout(r, 1000));
                let after = document.querySelector('tbody tr td')?.innerText;

                results.push({
                    index: i,
                    html: th.innerHTML,
                    changed: before !== after,
                    before,
                    after
                });

                // If it didn't change, try clicking the SVG inside it
                if (before === after) {
                    const svg = th.querySelector('svg');
                    if (svg) {
                        svg.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                        await new Promise(r => setTimeout(r, 1000));
                        after = document.querySelector('tbody tr td')?.innerText;
                        results[i].svgChanged = (before !== after);
                        results[i].afterSvg = after;
                    }
                }
            }
            return results;
        });

        console.log(JSON.stringify(result, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
