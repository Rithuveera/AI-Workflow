const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.fill('input[name="username"]', 'Veera');
    await page.fill('input[name="password"]', 'Rithu@11');
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/dashboard');
    await page.goto('https://datnext-qa.algosium.com/master/currency');
    await page.waitForSelector('th');

    const headers = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('th')).map(th => ({
            text: th.innerText,
            html: th.innerHTML,
            classes: th.className
        }));
    });

    console.log(JSON.stringify(headers, null, 2));
    await browser.close();
})();
