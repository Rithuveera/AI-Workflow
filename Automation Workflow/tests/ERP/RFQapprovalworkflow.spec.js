const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
test('RFQ  - Approcal List page ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Mani');
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
   

  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - click Assigned to me Tab in approval  ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Mani');
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

    // Click Assigned to me tab 

    await page.getByRole('button',{name : 'Assigned to me'}).click();
    console.log("Assigned to me tab clicked successfully");
    await page.waitForTimeout(3000);

    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      console.log(`Row ${i + 1}:`, cells.join(' | '));
    }
   
  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Click Under Approval  status RFQ  ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');



    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Mani');
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

    // Click Assigned to me tab 

    await page.getByRole('button',{name : 'Assigned to me'}).click();
    console.log("Assigned to me tab clicked successfully");
    await page.waitForTimeout(3000);

    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      console.log(`Row ${i + 1}:`, cells.join(' | '));
    }
   
    // Click Under First Review status RFQ

    const UnderApproval = page.locator('td', {  has: page.locator('div[aria-label="Status: Under Approval"]')}).first();

     if (await UnderApproval.count() > 0) {
     await UnderApproval.click();
     console.log('Under Approval cell clicked');
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


test('RFQ  - Click Approval option for Approver ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Mani');
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

    // Click Assigned to me tab 

    await page.getByRole('button',{name : 'Assigned to me'}).click();
    console.log("Assigned to me tab clicked successfully");
    await page.waitForTimeout(3000);

    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      console.log(`Row ${i + 1}:`, cells.join(' | '));
    }
   
    // Click Under First Review status RFQ

    const Underapproval = page.locator('td', {  has: page.locator('div[aria-label="Status: Under Approval"]')}).first();

     if (await Underapproval.count() > 0) {
     await Underapproval.click();
     console.log('Under Approval cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

   // Click Approval option for reviewer 

   await page.locator('img[src="/icons/approval-check.svg"]').click();
   await page.waitForTimeout(2000);

   // Click submit option 

   await page.getByRole('button',{name:'Submit'}).click();
   console.log('RFQ status updated successfully !');
  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Click Revert option  ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Mani');
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

    // Click Assigned to me tab 

    await page.getByRole('button',{name : 'Assigned to me'}).click();
    console.log("Assigned to me tab clicked successfully");
    await page.waitForTimeout(3000);

    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      console.log(`Row ${i + 1}:`, cells.join(' | '));
    }
   
    // Click Under Approval status RFQ

    const Underapproval = page.locator('td', {  has: page.locator('div[aria-label="Status: Under Approval"]')}).first();

     if (await Underapproval.count() > 0) {
     await Underapproval.click();
     console.log('Under Approval cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

   // Click Reverter  option for Approver 

   await page.locator('img[src="/icons/Revert.svg"]').click();
   console.log( 'Reverter option successfully clicked ');
   await page.waitForTimeout(2000);

   // Enter the reverter comments 

   await page.locator('textarea[name="comment"]').fill('RFQ Reverted to Creater');

   // Click Revert option 

   await page.getByRole('button',{name : 'Revert'}).click();
   console.log('RFQ status updated successfully !');
  }

  catch (error) {
    console.error('Error:', error);
  }
});


test.only('RFQ  -Verify Approved status', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Mani');
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

    // Click Assigned to me tab 

    await page.getByRole('button',{name : 'All'}).click();
    console.log("Assigned to me tab clicked successfully");
    await page.waitForTimeout(3000);

    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      console.log(`Row ${i + 1}:`, cells.join(' | '));
    }
   
    // Click Under Approval status RFQ

    const Approved = page.locator('td', {  has: page.locator('div[aria-label="Status: Approved"]')}).first();

     if (await Approved.count() > 0) {
     await Approved.click();
     console.log('Approved cell clicked');
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
