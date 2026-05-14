const { test, expect } = require('@playwright/test')
test("Cloning", async ({ page }) => {
  try {
    // Step 1: Navigate to the login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');

    // Step 2: Enter username and password
    console.log('Step 2: Entering login credentials...');
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
    await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');

    // Step 3: Click login button
    console.log('Step 3: Clicking login button...');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');

    // Wait for dashboard to load
    await page.waitForURL('**/dashboard');
    console.log('Login successful!');


    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');

    // Step 4: Click on Enquiry menu icon to expand

    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);

    // Step 5: Click on Enquiry menu item to see submenu
    console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    await page.waitForTimeout(1000);


    // Step:6  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded');


    // Step 7 : Click on Enquity list Tab 
    console.log('Step 7: Click Enquiry List');
    await page.getByText('Enquiry List').click();
    await page.waitForTimeout(3000);
    console.log('Enquiry list  tab loaded');

    // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();

    // Click on "Pending"status option
    await page.getByTitle('Awarded').click();

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();

      
    // Step 8: Click the Clone Option button
    console.log('Step 9: Clicking Clone  button...');
    await page.getByRole('button', { name: 'Clone' }).click();
    await page.waitForTimeout(2000);

    // Step 9: Wait for confirmation dialog and click Yes
    console.log('Step 10: Confirming Clone...');
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForTimeout(2000);

    // Select the priority 

    const priorityDropdown = page.locator('div[class*="control"]').filter({ hasText: /Awarded/i }).first();
    await priorityDropdown.scrollIntoViewIfNeeded();
    await priorityDropdown.click();
    await page.getByRole('option', { name: 'B - Potential' }).click();
    await page.waitForTimeout(6000);

    // Click Choose scope number 
    await page.getByRole('button', { name: 'Choose Scope Number' }).click();
    await page.waitForTimeout(3000);
    // Wait for table to be visible
    const rows = page.locator('#similarScopeScrollableDiv tbody tr');
    const rowCount = await rows.count();

    console.log(`Total Scopes Found: ${rowCount}`);

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);

      // Scope number (2nd column)
      const scopeNo = await row.locator('td').nth(1).textContent();

      // Description (3rd column)
      const description = await row.locator('td').nth(2).innerText();

      console.log(`Scope No: ${scopeNo.trim()} | Description: ${description.trim()}`);
    }

    // Select the scope in the list 

    await page.locator('input[name="scopeSelection"]').nth(1).check();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.waitForTimeout(3000);

    //  Select the received date 
    // 1. Open date picker
    const day = new Date().getDate();
    await page.locator('input.sc-gEvDqW.hKYcdj').first().click();
    await page.locator(`//div[text()='${day}']`).click();
    //Step 11 : Select Last date 
    // 1. Open date picker (second input)
    await page.locator('input.sc-gEvDqW.hKYcdj').nth(1).click();

    // 2. Select date
    await page.locator('div[aria-label="Choose Saturday, February 28th, 2026"]').click();

    // // Click Save changes 

    console.log('Step 11: Clicking Save Changes...');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(5000);
    console.log('save clicked successfully')

    // Step 12: Verify success message
    await expect(page.getByRole('heading', { name: 'Enquiry Cloned' })).toBeVisible();
    const successMsg = page.locator('div.MuiDialogContent-root');
    await expect(successMsg).toContainText('Enquiry registered successfully.');
    const text = await successMsg.textContent();
    const match = text.match(/Enquiry No:\s*(\S+)/);
    const EnquiryNo = match ? match[1] : null;
    if (EnquiryNo) {
      console.log('✓ Enquiry Number captured:', EnquiryNo);
    } else {
      console.log('✗ Enquiry Number not found');
    }
    // Step 11: Click OK to close success dialog
    console.log('Step 12: Closing success dialog...');
    await page.getByRole('button', { name: 'OK' }).click();
    await page.waitForTimeout(500);

    console.log('\n========================================');
    console.log('All steps completed successfully!');
    console.log('========================================');

    // Keep browser open for a few seconds to see the result
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'C:/Users/veeramani/Desktop/playwright-mcp/screenshots/error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  }
})

test("Cloning - Choose Number list page ", async ({ page }) => {
  try {
    // Step 1: Navigate to the login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');

    // Step 2: Enter username and password
    console.log('Step 2: Entering login credentials...');
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
    await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');

    // Step 3: Click login button
    console.log('Step 3: Clicking login button...');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');

    // Wait for dashboard to load
    await page.waitForURL('**/dashboard');
    console.log('Login successful!');


    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');

    // Step 4: Click on Enquiry menu icon to expand

    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);

    // Step 5: Click on Enquiry menu item to see submenu
    console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    await page.waitForTimeout(1000);


    // Step:6  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded');


    // Step 7 : Click on Enquity list Tab 
    console.log('Step 7: Click Enquiry List');
    await page.getByText('Enquiry List').click();
    await page.waitForTimeout(3000);
    console.log('Enquiry list  tab loaded');


    //Step 8: Click on first entry dynamically from pending tab 

    console.log('Step 8: Click first pending enquiry dynamically');
    // Wait for the table to load
    await page.waitForSelector('table');

    // Get the first data row in the pending list (skip the header row)
    const firstRow = await page.locator('table tbody tr').first();

    // Get the enquiry log number from the first cell for logging
    const enquiryLogNo = await firstRow.locator('td').first().textContent();
    console.log(`Clicking first pending enquiry: ${enquiryLogNo}`);


    // Click the first row
    await firstRow.click();
    await page.waitForURL('**/enquiry/view/**');
    await page.waitForTimeout(3000);
    console.log('Opened first pending enquiry');


    // Step 9: Click the Clone Option button
    console.log('Step 9: Clicking Clone  button...');
    await page.getByRole('button', { name: 'Clone' }).click();
    await page.waitForTimeout(1000);

    // Step 10: Wait for confirmation dialog and click Yes
    console.log('Step 10: Confirming Clone...');
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForTimeout(2000);
    
    // Click Choose scope number 
    await page.getByRole('button', { name: 'Choose Scope Number' }).click();
    await page.waitForTimeout(3000);
    // Wait for table to be visible
    const rows = page.locator('#similarScopeScrollableDiv tbody tr');
    const rowCount = await rows.count();

    console.log(`Total Scopes Found: ${rowCount}`);

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);

      // Scope number (2nd column)
      const scopeNo = await row.locator('td').nth(1).textContent();

      // Description (3rd column)
      const description = await row.locator('td').nth(2).innerText();

      console.log(`Scope No: ${scopeNo.trim()} | Description: ${description.trim()}`);
    }


    console.log('\n========================================');
    console.log('All steps completed successfully!');
    console.log('========================================');

    // Keep browser open for a few seconds to see the result
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'C:/Users/veeramani/Desktop/playwright-mcp/screenshots/error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  }
})

test("Cloning - Create a new scope number ", async ({ page }) => {
  try {
    // Step 1: Navigate to the login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');

    // Step 2: Enter username and password
    console.log('Step 2: Entering login credentials...');
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
    await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');

    // Step 3: Click login button
    console.log('Step 3: Clicking login button...');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');

    // Wait for dashboard to load
    await page.waitForURL('**/dashboard');
    console.log('Login successful!');


    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');

    // Step 4: Click on Enquiry menu icon to expand

    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);

    // Step 5: Click on Enquiry menu item to see submenu
    console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    await page.waitForTimeout(1000);


    // Step:6  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded');


    // Step 7 : Click on Enquity list Tab 
    console.log('Step 7: Click Enquiry List');
    await page.getByText('Enquiry List').click();
    await page.waitForTimeout(3000);
    console.log('Enquiry list  tab loaded');

   // Step 8 : Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();

    // Click on "Pending"status option
    await page.getByTitle('Awarded').click();

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();



    // Step 9: Click the Clone Option button
    console.log('Step 9: Clicking Clone  button...');
    await page.getByRole('button', { name: 'Clone' }).click();
    await page.waitForTimeout(2000);

    // Step 10: Wait for confirmation dialog and click Yes
    console.log('Step 10: Confirming Clone...');
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForTimeout(3000);
    // Select the priority 

    const priorityDropdown = page.locator('div[class*="control"]').filter({ hasText: /Awarded/i }).first();
    await priorityDropdown.scrollIntoViewIfNeeded();
    await priorityDropdown.click();
    await page.getByRole('option', { name: 'B - Potential' }).click();
    await page.waitForTimeout(6000);

    // Click Choose scope number 
    await page.getByRole('button', { name: 'Choose Scope Number' }).click();
    await page.waitForTimeout(3000);
    // Wait for table to be visible
    const rows = page.locator('#similarScopeScrollableDiv tbody tr');
    const rowCount = await rows.count();

    console.log(`Total Scopes Found: ${rowCount}`);

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);

      // Scope number (2nd column)
      const scopeNo = await row.locator('td').nth(1).textContent();

      // Description (3rd column)
      const description = await row.locator('td').nth(2).innerText();

      console.log(`Scope No: ${scopeNo.trim()} | Description: ${description.trim()}`);
    }

    // Click Create new scope number  in the list 
    await page.locator('#noneSelection').check();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.waitForTimeout(3000);

    //  Select the received date 
    // 1. Open date picker
    const day = new Date().getDate();
    await page.locator('input.sc-gEvDqW.hKYcdj').first().click();
    await page.locator(`//div[text()='${day}']`).click();

    //Step 23 : Select Last date 
    // 1. Open date picker (second input)
    await page.locator('input.sc-gEvDqW.hKYcdj').nth(1).click();

    // 2. Select date
    await page.locator('div[aria-label="Choose Saturday, February 28th, 2026"]').click();

    // // Click Save changes 

    console.log('Step 11: Clicking Save Changes...');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(5000);
    console.log('save clicked successfully')

    // Step 10: Verify success message
    await expect(page.getByRole('heading', { name: 'Enquiry Cloned' })).toBeVisible();
    const successMsg = page.locator('div.MuiDialogContent-root');
    await expect(successMsg).toContainText('Enquiry registered successfully.');
    const text = await successMsg.textContent();
    const match = text.match(/Enquiry No:\s*(\S+)/);
    const EnquiryNo = match ? match[1] : null;
    if (EnquiryNo) {
      console.log('✓ Enquiry Number captured:', EnquiryNo);
    } else {
      console.log('✗ Enquiry Number not found');
    }
    // Step 11: Click OK to close success dialog
    await page.getByRole('button', { name: 'OK' }).click();
    await page.waitForTimeout(500);

    console.log('\n========================================');
    console.log('All steps completed successfully!');
    console.log('========================================');

    // Keep browser open for a few seconds to see the result
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'C:/Users/veeramani/Desktop/playwright-mcp/screenshots/error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  }
})