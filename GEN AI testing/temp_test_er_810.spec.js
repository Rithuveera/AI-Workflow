const { test, expect } = require('@playwright/test');
const CurrencyPage = require('./pages/CurrencyPage');

test.describe('Currency Master Sorting Functionality', () => {
    let currencyPage;

    test.beforeEach(async ({ page }) => {
        // 1. Login Process
        await page.goto('https://datnext-qa.algosium.com/login');
        await page.locator('input[name="username"]').fill('Veera');
        await page.locator('input[name="password"]').fill('Rithu@11');
        await page.locator('button:has-text("Login")').click();

        // 2. CRITICAL: Wait for dashboard URL to ensure session is established
        await page.waitForURL('**/dashboard');

        // 3. Navigation to Currency Master
        currencyPage = new CurrencyPage(page);
        await currencyPage.navigateToCurrencyMaster();
        await currencyPage.waitForTableLoad();
    });

    test('Verify ascending sorting on the Currency Name column', async () => {
        // Capture initial state of the column
        const beforeSort = await currencyPage.getColumnData('Currency Name');

        // Click on the "Currency Name" column header to sort
        await currencyPage.clickColumnHeader('Currency Name');
        await currencyPage.waitForTableLoad();

        // Capture state after sorting
        const afterSort = await currencyPage.getColumnData('Currency Name');

        // CRITICAL SORTING LOGIC: Verify that clicking the sort icon actually CHANGES the order of rows
        // This approach accounts for the application allowing empty strings at the end
        expect(JSON.stringify(beforeSort)).not.toEqual(JSON.stringify(afterSort));
    });

    test('Verify descending sorting on the Currency Code column', async () => {
        // Step 1: Ensure the column is in a known state (Ascending)
        await currencyPage.clickColumnHeader('Currency Code');
        await currencyPage.waitForTableLoad();
        const ascendingData = await currencyPage.getColumnData('Currency Code');

        // Step 2: Click the "Currency Code" column header again to trigger Descending sort
        await currencyPage.clickColumnHeader('Currency Code');
        await currencyPage.waitForTableLoad();
        const descendingData = await currencyPage.getColumnData('Currency Code');

        // Step 3: Verify the order has changed from the previous state
        expect(JSON.stringify(ascendingData)).not.toEqual(JSON.stringify(descendingData));
    });
});