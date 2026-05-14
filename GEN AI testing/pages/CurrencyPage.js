/**
 * POM for Currency Management Screen
 */
class CurrencyPage {
    constructor(page) {
        this.page = page;
        // Navigation locators
        // Note: Using direct URL navigation for maximum reliability in automation.
        this.pageUrl = 'https://datnext-qa.algosium.com/master/currency';

        // Locators for sorting (TanStack Table structure)
        // We target the specific div inside the th that contains the header text
        this.codeHeader = page.locator('th div').filter({ hasText: /^CODE$/ }).first();
        this.nameHeader = page.locator('th div').filter({ hasText: /^CURRENCY NAME$/ }).first();
        this.tableRows = page.locator('tbody tr');
    }

    async navigateToGlobalCurrencyMaster() {
        // Direct jump to skip flaky menu interactions
        await this.page.goto(this.pageUrl);
    }

    async navigateToCurrencyMaster() {
        return await this.navigateToGlobalCurrencyMaster();
    }

    async waitForTableLoad() {
        await this.page.waitForSelector('tbody tr', { timeout: 15000 });
    }

    async getCellValues(columnIndex) {
        return await this.page.locator(`tbody tr td:nth-child(${columnIndex})`).allInnerTexts();
    }

    async getColumnData(headerName) {
        if (headerName.includes("Name")) return await this.getCellValues(2);
        if (headerName.includes("Code")) return await this.getCellValues(1);
        return await this.getCellValues(1);
    }

    async clickColumnHeader(headerName) {
        if (headerName.includes("Name")) await this.nameHeader.click();
        else if (headerName.includes("Code")) await this.codeHeader.click();
    }

    async clickSort(headerName) {
        return await this.clickColumnHeader(headerName);
    }

    async clickHeader(headerName) {
        return await this.clickColumnHeader(headerName);
    }

    async getCurrencyCodes() {
        return await this.getCellValues(1);
    }

    async getCurrencyNames() {
        return await this.getCellValues(2);
    }

    async clickCurrencyCodeHeader() {
        await this.codeHeader.click();
    }

    async clickCurrencyNameHeader() {
        await this.nameHeader.click();
    }
}

module.exports = CurrencyPage;
