// Beds Listing Page - Playwright Test Scripts
// Test Suite for http://qa-accomodation.campneuron.com/beds/list

const { test, expect } = require('@playwright/test');

// Test Configuration
const BASE_URL = 'http://qa-accomodation.campneuron.com';
const BEDS_LIST_URL = `${BASE_URL}/app/beds/list`;

test.describe('Beds Listing Page - Comprehensive Tests', () => {
  
  // Before each test, navigate to the beds listing page
  test.beforeEach(async ({ page }) => {
    await page.goto(BEDS_LIST_URL);
    await page.waitForLoadState('networkidle');
  });

  // ==================== PAGE LOAD TESTS ====================
  
  test('TC001 - Verify page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(BEDS_LIST_URL);
    await expect(page).toHaveTitle('Camp Accomodation - Beds');
  });

  test('TC002 - Verify page header is displayed', async ({ page }) => {
    const pageTitle = page.getByRole('heading', { name: 'Beds Listing', level: 2 });
    await expect(pageTitle).toBeVisible();
  });

  test('TC003 - Verify user information is displayed', async ({ page }) => {
    const userName = page.locator('text=Hassan Samaan');
    const userRole = page.locator('text=Camp Manager / Supervisor');
    
    await expect(userName).toBeVisible();
    await expect(userRole).toBeVisible();
  });

  // ==================== NAVIGATION MENU TESTS ====================
  
  test('TC004 - Verify all navigation menu items are present', async ({ page }) => {
    const bookingsLink = page.getByRole('link', { name: 'Bookings' });
    const bedsLink = page.getByRole('link', { name: 'Beds' });
    const companiesLink = page.getByRole('link', { name: 'Companies' });
    const reportsLink = page.getByRole('link', { name: 'Reports' });
    const settingsLink = page.getByRole('link', { name: 'Settings' });

    await expect(bookingsLink).toBeVisible();
    await expect(bedsLink).toBeVisible();
    await expect(companiesLink).toBeVisible();
    await expect(reportsLink).toBeVisible();
    await expect(settingsLink).toBeVisible();
  });

  test('TC005 - Verify Beds submenu items', async ({ page }) => {
    const listingLink = page.getByRole('link', { name: 'Listing' });
    const layoutLink = page.getByRole('link', { name: 'Layout' });

    await expect(listingLink).toBeVisible();
    await expect(layoutLink).toBeVisible();
  });

  // ==================== ACTION BUTTONS TESTS ====================
  
  test('TC006 - Verify search box is present and functional', async ({ page }) => {
    const searchBox = page.getByRole('textbox', { name: 'Search' });
    
    await expect(searchBox).toBeVisible();
    await expect(searchBox).toBeEditable();
    
    // Test typing in search box
    await searchBox.fill('Premium');
    await expect(searchBox).toHaveValue('Premium');
  });

  test('TC007 - Verify Add Bulk Rooms button is present', async ({ page }) => {
    const addBulkBtn = page.getByRole('button', { name: 'Add bulk rooms' });
    
    await expect(addBulkBtn).toBeVisible();
    await expect(addBulkBtn).toBeEnabled();
  });

  test('TC008 - Verify Add Single Room button is present', async ({ page }) => {
    const addSingleBtn = page.getByRole('button', { name: 'Add single room' });
    
    await expect(addSingleBtn).toBeVisible();
    await expect(addSingleBtn).toBeEnabled();
  });

  // ==================== TABLE STRUCTURE TESTS ====================
  
  test('TC009 - Verify table headers are present', async ({ page }) => {
      const table = page.getByRole('table');
  const headerCells = table.locator('thead th'); // or 'thead [role="columnheader"]'

  const headerCount = await headerCells.count();
  console.log(`Total headers found: ${headerCount}`);

  for (let i = 0; i < headerCount; i++) {
    const headerText = await headerCells.nth(i).innerText();
    console.log(`Header ${i + 1}: ${headerText}`);
  }
     });

  test('TC010 - Verify and Print first page data rows', async ({ page }) => {
    const table = page.getByRole('table');
    const rows = table.locator('tbody tr');
    
    await expect(rows).not.toHaveCount(0);
    
    // Should have exactly 10 rows per page
    const rowCount = await rows.count();
    console.log(`Total rows found :${rowCount}`);
    expect(rowCount).toBe(10);
    // Print the Data 
    for (let i = 0; i < rowCount; i++)
       {
    const rowText = await rows.nth(i).innerText();
    console.log(`Row ${i + 1}: ${rowText}`);
  }
  });

 
  test('TC011 - Verify Room Type column values', async ({ page }) => {
    const roomTypeCells = page.locator('tbody tr td:nth-child(1)');
    const firstRoomType = await roomTypeCells.first().textContent();
    
    // Room type should be one of the expected values
    expect(['Vip', 'Premium', 'Senior', 'Standard']).toContain(firstRoomType);
  });

  test('TC012 - Verify Status column has colored indicators', async ({ page }) => {
    const statusCells = page.locator('tbody tr td:nth-child(6)');
    const firstStatus = await statusCells.first().textContent();
    
    // Status should be either Active or Inactive
    expect(['Active', 'Inactive']).toContain(firstStatus);
  });

  // ==================== ACTION COLUMN TESTS ====================
  
  test('TC013 - Verify Maintenance button is present in action column', async ({ page }) => {
    const maintenanceBtn = page.getByRole('button', { name: 'maintenance' }).first();
    await expect(maintenanceBtn).toBeVisible();
  });

  test('TC014 - Verify three-dot menu button is present', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first();
    const menuButton = firstRow.locator('button').last();
    
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toBeEnabled();
  });

  test('TC015 - Verify three-dot menu opens and shows delete option', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first();
    const menuButton = firstRow.locator('button').last();
    
    await menuButton.click();
    
    // Wait for menu to appear
    await page.waitForTimeout(500);
    
    const deleteButton = page.getByRole('button', { name: 'delete' });
    await expect(deleteButton).toBeVisible();
  });

  // ==================== PAGINATION TESTS ====================
  
  test('TC016 - Verify pagination info is displayed', async ({ page }) => {
    const paginationInfo = page.locator('text=Showing 1-10 of 241');
    await expect(paginationInfo).toBeVisible();
    console.log('Pagination is visible');
  });

  test('TC017 - Verify Previous button is present', async ({ page }) => {
    const previousBtn = page.getByRole('link', { name: 'Previous' });
    await expect(previousBtn).toBeVisible();
    console.log('Back option is displayed');
  });

  test('TC018 - Verify Next button is present and clickable', async ({ page }) => {
    const nextBtn = page.getByRole('link', { name: 'Next' });
    
    await expect(nextBtn).toBeVisible();
    await expect(nextBtn).toHaveAttribute('href', '/beds/list?page=1');
    console.log('Next option displayed in pagination')
  });

  test('TC019 - Verify page number links are present', async ({ page }) => {
    const page1Link = page.getByRole('link', { name: '1 1' });
    const page2Link = page.getByRole('link', { name: '2 2' });
    const page3Link = page.getByRole('link', { name: '3 3' });
    
    await expect(page1Link).toBeVisible();
    await expect(page2Link).toBeVisible();
    await expect(page3Link).toBeVisible();
  });

  test('TC020 - Verify clicking Next button navigates to page 2', async ({ page }) => {
    const nextBtn = page.getByRole('link', { name: 'Next' });
    
    await nextBtn.click();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL(/page=1/);
    
    const paginationInfo = page.locator('text=Showing 11-20 of 243');
    await expect(paginationInfo).toBeVisible();
  });

  test('TC021 - Verify clicking page number navigates correctly', async ({ page }) => {
    const page2Link = page.getByRole('link', { name: '2 2' });
    
    await page2Link.click();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL(/page=1/);
  });

  test('TC022 - Verify Previous button works from page 2', async ({ page }) => {
    // Navigate to page 2
    await page.goto(`${BEDS_LIST_URL}?page=1`);
    await page.waitForLoadState('networkidle');
    
    const previousBtn = page.getByRole('link', { name: 'Previous' });
    await previousBtn.click();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL(BEDS_LIST_URL);
    
    const paginationInfo = page.locator('text=Showing 1-10 of 241');
    await expect(paginationInfo).toBeVisible();
  });

  // ==================== SEARCH FUNCTIONALITY TESTS ====================
  
  test('TC023 - Verify search updates URL parameter', async ({ page }) => {
    const searchBox = page.getByRole('textbox', { name: 'Search' });
    
    await searchBox.fill('Premium');
    await page.waitForTimeout(2000); // Wait for auto-search
    
    await expect(page).toHaveURL(/term=Premium/);
  });

  test('TC024 - Verify search with different terms', async ({ page }) => {
    const searchBox = page.getByRole('textbox', { name: 'Search' });
    
    // Test search with "Vip"
    await searchBox.fill('Vip');
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveURL(/term=Vip/);
  });

  test('TC025 - Verify clearing search', async ({ page }) => {
    const searchBox = page.getByRole('textbox', { name: 'Search' });
    
    // Enter search term
    await searchBox.fill('Premium');
    await page.waitForTimeout(2000);
    
    // Clear search
    await searchBox.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveURL(BEDS_LIST_URL);
  });

  // ==================== DATA VALIDATION TESTS ====================
  
  test('TC026 - Verify and print the  Room No details', async ({ page }) => {
    const roomNoCells = page.locator('tbody tr td:nth-child(4)');
      const cellCount = await roomNoCells.count();
     console.log(`Total Room No entries found: ${cellCount}`);
      for (let i = 0; i < cellCount; i++) {
    const roomNo = (await roomNoCells.nth(i).innerText()).trim();
    console.log(`Room No ${i + 1}: ${roomNo}`);

    // Verify Room No format — e.g., should contain a hyphen
    expect(roomNo).toContain('-');
  }
        
  });

  test('TC027 - Verify data format in Bed No column', async ({ page }) => {
    const bedNoCells = page.locator('tbody tr td:nth-child(5)');
    const bedscount=await bedNoCells.count();
    console.log(`Total Beds found : ${bedscount}`);
      for (let i = 0; i < bedscount; i++) {
    const bedno = (await bedNoCells.nth(i).innerText()).trim();
    console.log(`Bed No ${i + 1}: ${bedno}`);
      
    // Bed number should contain hyphens
    expect(bedno).toMatch(/-\d{2}$/);
      }
  });

  test('TC028 - Verify all rows in page 1 have complete data', async ({ page }) => {
    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = row.locator('td');
      
      // Check all cells have content
      for (let j = 0; j < 7; j++) {
        const cell = cells.nth(j);
        const text = await cell.textContent();
        expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });

  // ==================== RESPONSIVE BEHAVIOR TESTS ====================
  
  test('TC029 - Verify page layout at different viewport sizes', async ({ page }) => {
    // Test at desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    const table = page.getByRole('table');
    await expect(table).toBeVisible();
    
    // Test at tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(table).toBeVisible();
  });

  // ==================== SPECIFIC DATA VERIFICATION TESTS ====================
  
  test('TC030 - Verify specific bed record exists (vVB5VB5-03-01)', async ({ page }) => {
    const bedCell = page.locator('td:has-text("vVB5VB5-03-01")');
    await expect(bedCell).toBeVisible();
  });

  test('TC031 - Verify Premium room records exist', async ({ page }) => {
    const premiumRow = page.locator('tr:has-text("Premium")').first();
    await expect(premiumRow).toBeVisible();
  });

  test('TC032 - Verify VIP room records exist', async ({ page }) => {
    const vipRow = page.locator('tr:has-text("Vip")').first();
    await expect(vipRow).toBeVisible();
  });

  // ==================== NAVIGATION LINK TESTS ====================
  
  test('TC033 - Verify Layout link navigation', async ({ page }) => {
    const layoutLink = page.getByRole('link', { name: 'Layout' });
    
    await layoutLink.click();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL(/\/beds\/layout/);
  });

  test('TC034 - Verify Bookings link navigation', async ({ page }) => {
    const bookingsLink = page.getByRole('link', { name: 'Bookings' });
    
    await bookingsLink.click();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL(/\/bookings/);
  });

  // ==================== ERROR HANDLING TESTS ====================
  
  test('TC035 - Verify page loads without console errors', async ({ page }) => {
    const consoleErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto(BEDS_LIST_URL);
    await page.waitForLoadState('networkidle');
    
    // Check if there are any critical console errors (excluding 404 for resources)
    const criticalErrors = consoleErrors.filter(err => 
      !err.includes('404') && !err.includes('favicon')
    );
    
    expect(criticalErrors.length).toBe(0);
  });

  // ==================== PERFORMANCE TESTS ====================
  
  test('TC036 - Verify page load time is acceptable', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(BEDS_LIST_URL);
    await page.waitForLoadState('networkidle');
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    console.log(`Page loaded in ${loadTime} ms (${(loadTime / 1000).toFixed(2)} seconds)`);
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  // ==================== ACCESSIBILITY TESTS ====================
  
  test('TC037 - Verify table has proper structure for screen readers', async ({ page }) => {
    const table = page.getByRole('table');
    await expect(table).toBeVisible();
    
    const thead = table.locator('thead');
    const tbody = table.locator('tbody');
    
    await expect(thead).toBeVisible();
    await expect(tbody).toBeVisible();
  });

  test('TC038 - Verify buttons have accessible names', async ({ page }) => {
    const addBulkBtn = page.getByRole('button', { name: 'Add bulk rooms' });
    const addSingleBtn = page.getByRole('button', { name: 'Add single room' });
    
    await expect(addBulkBtn).toHaveAccessibleName('Add bulk rooms');
    await expect(addSingleBtn).toHaveAccessibleName('Add single room');
  });

  // ==================== MAINTENANCE BUTTON TESTS ====================
  
  test('TC039 - Verify Maintenance button state', async ({ page }) => {
    const maintenanceBtn = page.getByRole('button', { name: 'maintenance' }).first();
    
    await expect(maintenanceBtn).toBeVisible();
    
    // Check if button is disabled
    const isDisabled = await maintenanceBtn.isDisabled();
    console.log('Maintenance button disabled state:', isDisabled);
  });

});

// ==================== HELPER FUNCTIONS ====================

// Function to extract table data
async function extractTableData(page) {
  const rows = page.locator('tbody tr');
  const rowCount = await rows.count();
  const data = [];

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    const cells = row.locator('td');
    
    const rowData = {
      roomType: await cells.nth(0).textContent(),
      block: await cells.nth(1).textContent(),
      building: await cells.nth(2).textContent(),
      roomNo: await cells.nth(3).textContent(),
      bedNo: await cells.nth(4).textContent(),
      status: await cells.nth(5).textContent()
    };
    
    data.push(rowData);
  }

  return data;
}

// Function to wait for table to load
async function waitForTableLoad(page) {
  await page.waitForSelector('tbody tr', { state: 'visible' });
  await page.waitForTimeout(1000);
}

// Export helper functions
module.exports = {
  extractTableData,
  waitForTableLoad
};