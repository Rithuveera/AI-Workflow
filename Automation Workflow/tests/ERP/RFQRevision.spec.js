const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test('RFQ  - Verify the Revision history ',async ({ page }) => {
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

    // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();

    // Click on "Pending"status option
    await page.getByTitle('Manage Quotations').click();

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

    // Click Manage Quotations status RFQ

    const Managequotations = page.locator('td', {  has: page.locator('div[aria-label="Status: Manage quotations"]')}).first();

     if (await Managequotations.count() > 0) {
     await Managequotations.click();
     console.log('Managequotations cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click Vendor manage quote option 

     await page.locator('img[src="/icons/manage-quotation.svg"]').click();

     await page.getByPlaceholder('Select Vendor').click();
     await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').first().click();
     console.log('Vendor selected successfully');

     // Click edit option 
     await page.getByRole('button ',{name:'Edit'}).click();

     // Click Revsion option 
      await page.getByRole('button', {name:'Revisions'}).click();
      await page.waitForTimeout(3000);

      const rows = page.locator('#rfqRevisionsScroll tbody tr');
      const rowCount = await rows.count();

     for (let i = 0; i < rowCount; i++) {
     const revNo = await rows.nth(i).locator('td').nth(0).innerText();
     const revisionOn = await rows.nth(i).locator('td').nth(1).innerText();
     const updatedBy = await rows.nth(i).locator('td').nth(2).innerText();

  console.log(`Row ${i + 1}`);
  console.log(`REV NO: ${revNo}`);
  console.log(`REVISION ON: ${revisionOn}`);
  console.log(`UPDATED BY: ${updatedBy}`);
  console.log('-------------------------');
}

  }

  catch (error) {
    console.error('Error:', error);
  }
});



test('RFQ  - Click for First revsion', async ({ page }) => {
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

    // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();

    // Click on "Pending"status option
    await page.getByTitle('Manage Quotations').click();

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

    // Click Pending status RFQ

    const Managequotations = page.locator('td', {  has: page.locator('div[aria-label="Status: Manage quotations"]')}).first();

     if (await Managequotations.count() > 0) {
     await Managequotations.click();
     console.log('Managequotations cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click Vendor manage quote option 

     await page.locator('img[src="/icons/manage-quotation.svg"]').click();

     await page.getByPlaceholder('Select Vendor').click();
     await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').first().click();
     console.log('Vendor selected successfully');

     // Click edit option 
     await page.getByRole('button ',{name:'Edit'}).click();

     // Click first item in the  Revision option 
      await page.getByRole('button', {name:'Revisions'}).click();
      await page.waitForTimeout(3000);

     const firstRow = page.locator('#rfqRevisionsScroll tbody tr').first();
     const cells = await firstRow.locator('td').allTextContents();
     console.log('First Row Data:', cells);
     await firstRow.click();
     await page.waitForTimeout(3000);
     console.log( 'first revision successfully clicked ')

  }

  catch (error) {
    console.error('Error:', error);
  }
});