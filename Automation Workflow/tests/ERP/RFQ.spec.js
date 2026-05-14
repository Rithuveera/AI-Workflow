const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
test('RFQ  - List page ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Veera');
    await page.fill('input[name="password"]', 'Rithu@11');
    await page.click('button:has-text("Login")');
    await page.waitForLoadState('networkidle');

    // Step 3: Navigate to Master menu > User submenu
    console.log('Step 3: Navigating to User page...');

    // Step 4: Click on Enquiry menu icon to expand

    console.log('Step 2: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Sidebar clicked and opened successfully');
    // Click on Master menu
    await page.click('text=Purchasing');
    await page.waitForTimeout(500);
    console.log("Master Menu clicked successfully");

    // Click RFQ 

    await page.getByRole('link', { name: 'RFQ' }).click();
    await page.waitForLoadState('networkidle');
    console.log('RFQ Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      console.log(`Row ${i + 1}:`, cells.join(' | '));
    }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
  }
});


test('RFQ  - Clicking pending status ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Veera');
    await page.fill('input[name="password"]', 'Rithu@11');
    await page.click('button:has-text("Login")');
    await page.waitForLoadState('networkidle');

    // Step 3: Navigate to Master menu > User submenu
    console.log('Step 3: Navigating to User page...');

    // Step 4: Click on Enquiry menu icon to expand

    console.log('Step 2: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Sidebar clicked and opened successfully');
    // Click on Master menu
    await page.click('text=Purchasing');
    await page.waitForTimeout(500);
    console.log("Master Menu clicked successfully");

    // Click RFQ 

    await page.getByRole('link', { name: 'RFQ' }).click();
    await page.waitForLoadState('networkidle');
    console.log('RFQ Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click Pending status RFQ

    const pendingCell = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await pendingCell.count() > 0) {
     await pendingCell.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Add a vendor ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Veera');
    await page.fill('input[name="password"]', 'Rithu@11');
    await page.click('button:has-text("Login")');
    await page.waitForLoadState('networkidle');

    // Step 3: Navigate to Master menu > User submenu
    console.log('Step 3: Navigating to User page...');

    // Step 4: Click on Enquiry menu icon to expand

    console.log('Step 2: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Sidebar clicked and opened successfully');
    // Click on Master menu
    await page.click('text=Purchasing');
    await page.waitForTimeout(500);
    console.log("Master Menu clicked successfully");

    // Click RFQ 

    await page.getByRole('link', { name: 'RFQ' }).click();
    await page.waitForLoadState('networkidle');
    console.log('RFQ Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click Pending status RFQ

    const pendingCell = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await pendingCell.count() > 0) {
     await pendingCell.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);
      // Add a Vendor
     await page.locator('img[alt="Add Vendor"]').click();
     await page.waitForTimeout(3000);
     // Select the vendor
    await page.locator('#rfq-vendor-scroll-container div').filter({ hasText: /^BO Vendor$/ }).first().click();
    await page.locator('#rfq-vendor-scroll-container div').filter({ hasText: /^BO Vendor1$/ }).first().click();
    // Click save 

    await page.getByRole('button', { name: 'Save' }).click();

    console.log('Vendor selected successfully')


    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
  }
});

test.only('RFQ  - Create  a vendor ', async ({ page }) => {
  try {
  const vendorName = faker.company.name() + "_" + Date.now();

    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Veera');
    await page.fill('input[name="password"]', 'Rithu@11');
    await page.click('button:has-text("Login")');
    await page.waitForLoadState('networkidle');

    // Step 3: Navigate to Master menu > User submenu
    console.log('Step 3: Navigating to User page...');

    // Step 4: Click on Enquiry menu icon to expand

    console.log('Step 2: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Sidebar clicked and opened successfully');
    // Click on Master menu
    await page.click('text=Purchasing');
    await page.waitForTimeout(500);
    console.log("Master Menu clicked successfully");

    // Click RFQ 

    await page.getByRole('link', { name: 'RFQ' }).click();
    await page.waitForLoadState('networkidle');
    console.log('RFQ Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click Pending status RFQ

    const pendingCell = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await pendingCell.count() > 0) {
     await pendingCell.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);
      // Add a Vendor
     await page.locator('img[alt="Add Vendor"]').click();
     await page.waitForTimeout(3000);

     // Click Create Vendors option 
    await page.getByRole('button',{name :'Create Vendors'}).click();

    // Enter the vendor name 
    await page.getByPlaceholder('Enter vendor name').fill(vendorName);
    console.log('Generated Vendor Name:', vendorName);


    // Click Create option 

    await page.getByRole('button',{name:'Create'}).click();
    console.log('Vendor Created Successfully');


    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
  }
});

