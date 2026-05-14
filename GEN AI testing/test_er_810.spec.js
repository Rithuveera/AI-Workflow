const { test, expect } = require('@playwright/test');
const { CurrencyPage } = require('./pages/CurrencyPage'); // Adjust path as necessary

// Helper function to check if an array of strings is sorted in ascending order
function isSortedAscending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].localeCompare(arr[i + 1]) > 0) {
            return false;
        }
    }
    return true;
}

// Helper function to check if an array of strings is sorted in descending order
function isSortedDescending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].localeCompare(arr[i + 1]) < 0) {
            return false;
        }
    }
    return true;
}

test.describe('Feature: Currency Master Screen Sorting Functionality', () => {
    let currencyPage;

    test.beforeEach(async ({ page }) => {
        // CRITICAL: LOGIN STEP
        await page.goto('https://datnext-qa.algosium.com/login');
        await page.locator('input[name="username"]').fill('Veera');
        await page.locator('input[name="password"]').fill('Rithu@11');
        await page.locator('button:has-text("Login")').click();
        // Post-Login Verification: Expect URL to contain "/dashboard" or "/home"
        await expect(page).toHaveURL(/dashboard|home/);

        // Given I am on the "Currency Master" screen
        currencyPage = new CurrencyPage(page);
        await currencyPage.navigateToGlobalCurrencyMaster();
    });

    test('Scenario: Verify ascending sort by Currency Code', async ({ page }) => {
        // And the screen displays a list of currencies with "Currency Code" and other columns
        // This is implicitly handled by the navigation and waitForSelector in CurrencyPage.

        // When I click on the "Currency Code" column header
        await currencyPage.codeHeader.click();

        // Then the list of currencies should be sorted in ascending alphabetical order by "Currency Code"
        // Assuming 'CODE' is the first column (nth-child(1))
        const currencyCodes = await currencyPage.getCellValues(1);
        expect(isSortedAscending(currencyCodes)).toBe(true);

        // And the sort indicator for "Currency Code" should show an ascending arrow
        // Assuming the parent 'th' element of the header div gets an 'aria-sort' attribute
        const codeHeaderParent = currencyPage.codeHeader.locator('..'); // Get parent th element
        await expect(codeHeaderParent).toHaveAttribute('aria-sort', 'ascending');
    });

    test('Scenario: Verify descending sort by Currency Name', async ({ page }) => {
        // And the screen displays a list of currencies with "Currency Name" and other columns
        // This is implicitly handled by the navigation and waitForSelector in CurrencyPage.

        // When I click on the "Currency Name" column header (first click for ascending)
        await currencyPage.nameHeader.click();
        // And I click on the "Currency Name" column header again (second click for descending)
        await currencyPage.nameHeader.click();

        // Then the list of currencies should be sorted in descending alphabetical order by "Currency Name"
        // Assuming 'CURRENCY NAME' is the second column (nth-child(2))
        const currencyNames = await currencyPage.getCellValues(2);
        expect(isSortedDescending(currencyNames)).toBe(true);

        // And the sort indicator for "Currency Name" should show a descending arrow
        // Assuming the parent 'th' element of the header div gets an 'aria-sort' attribute
        const nameHeaderParent = currencyPage.nameHeader.locator('..'); // Get parent th element
        await expect(nameHeaderParent).toHaveAttribute('aria-sort', 'descending');
    });
});