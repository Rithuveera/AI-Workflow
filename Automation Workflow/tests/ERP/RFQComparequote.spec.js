const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test('RFQ  - Compare quote for single vendor ', async ({ page }) => {
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

    const Managequotation = page.locator('td', {  has: page.locator('div[aria-label="Status: Manage quotations"]')}).first();

     if (await Managequotation.count() > 0) {
     await Managequotation.click();
     console.log('Manage quotation  cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click Compare quotation option 
     await page.locator('img[src="/icons/compare-quotation.svg"]').click();
     await page.waitForTimeout(3000);

     //Select the line item 
     const lineItems = page.locator('div[data-row-key]');
     const count = await lineItems.count();
     for (let i = 0; i < count; i++) {
     await lineItems.nth(i).click(); // click each row
     console.log('lineitem selected ')

  }


    // Click send option 

    await page.locator('img[src*="send.svg"]').click();
    await page.waitForTimeout(3000);

   // Select Reviewer as exact Admin
   await page.locator('label:text("Reviewer")').locator('..').locator('input[placeholder="Select"]').first().click();
   await page.locator('div.searchDropDownPagination_suggestion_item__PSEfn', { hasText: /^Admin$/ }).click();
   console.log('Reviewer selected successfully');

   // Select Approver as exact Mani
   await page.locator('label:text("Approver")').locator('..').locator('input[placeholder="Select"]').first().click();
   await page.locator('div.searchDropDownPagination_suggestion_item__PSEfn', { hasText: /^Mani$/ }).click();
   console.log('Approver selected successfully ');

    // Click submit 

    await page.getByRole('button',{name:'Submit'}).click();
    await page.waitForTimeout(3000);
   
  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Click under first review  ', async ({ page }) => {
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

    const Underfirstreview = page.locator('td', {  has: page.locator('div[aria-label="Status: Under first review"]')}).first();

     if (await Underfirstreview.count() > 0) {
     await Underfirstreview.click();
     console.log('Under first review cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

    
  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Click Quotation comparsion  ', async ({ page }) => {
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

    const Quotationcomparison = page.locator('td', {  has: page.locator('div[aria-label="Status: Quotation comparison"]')}).first();

     if (await Quotationcomparison.count() > 0) {
     await Quotationcomparison.click();
     console.log('Quotation Comparsion  cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

    
  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Click Approved ', async ({ page }) => {
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

    const Approved = page.locator('td', {  has: page.locator('div[aria-label="Status: Approved"]')}).first();

     if (await Approved.count() > 0) {
     await Approved.click();
     console.log('Approved  cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

    
  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Under Approval ', async ({ page }) => {
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

    const UnderApproval = page.locator('td', {  has: page.locator('div[aria-label="Status: Under Approval"]')}).first();

     if (await UnderApproval.count() > 0) {
     await UnderApproval.click();
     console.log('Under approval cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

    
  }

  catch (error) {
    console.error('Error:', error);
  }
});