/**
 * POM for Accounts Management Screen
 */
class AccountsPage {
    constructor(page) {
        this.page = page;
        // Search and filter locators
        this.searchInput = page.locator('input[placeholder="Search accounts..."]');
        this.filterDropdown = page.locator('.accounts-filter-select');

        // Table and Row locators
        this.accountRow = (name) => page.locator('tr').filter({ hasText: name });
        this.actionMenu = (name) => this.accountRow(name).locator('.action-menu-trigger');
        this.editButton = (name) => page.locator('button:has-text("Edit Account")');
    }

    async searchAccount(name) {
        await this.searchInput.fill(name);
        await this.page.keyboard.press('Enter');
    }

    async openEditDialog(name) {
        await this.actionMenu(name).click();
        await this.editButton(name).click();
    }
}

module.exports = { AccountsPage };
