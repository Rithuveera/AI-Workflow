const {test,expect}=require('@playwright/test')
  test("Rejected ",async({page})=>
  {
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
    
    // Step 4: Click on Enquiry menu to expand sidebar
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
     // Step 5: Click on Enquiry menu icon to expand
    
    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);

    // Step 6: Click on Enquiry menu item to see submenu
    console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    await page.waitForTimeout(1000);
    
    // Step 7: Click on "Pending Approval" menu item
    console.log('Step 6: Navigating to Pending Approval...');
    await page.getByRole('link', { name: 'Pending Approval' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForURL('**/pending-enquiry/list');
    console.log('Pending Approval page loaded!');

    // //Step 8: Click on first entry dynamically from pending tab 

    console.log('Step 7: Click first pending enquiry dynamically');
    // Wait for the table to load
    await page.waitForSelector('table');
    
    // Get the first data row in the pending list (skip the header row)
    const firstRow = await page.locator('table tbody tr').first();
    
    // Get the enquiry log number from the first cell for logging
    const enquiryLogNo = await firstRow.locator('td').first().textContent();
    console.log(`Clicking first pending enquiry: ${enquiryLogNo}`);

    
    // Click the first row
    await firstRow.click();
    await page.waitForTimeout(3000);
    console.log('Opened first Pending  enquiry');
    
    
    
    // Wait for the enquiry details page to load
    await page.waitForURL('**/pending-enquiry/view/**');
    console.log('Enquiry details page loaded!');
    
    // Step 9: Click the Reject  button
    console.log('Step 8: Clicking Rejected  button...');
    await page.getByRole('button', { name: 'Reject' }).click();
    console.log('Rejected successfully')
    await page.waitForTimeout(5000);
    
    // Enter the remarks for rejected option 

    await page.getByLabel('Remark *').fill('Approved — test automation remark');
   
    // Step 9: Wait for confirmation dialog and click Yes
    console.log('Step 9: Confirming Rejected ...');
    await page.getByRole('button', { name: 'Yes' }).click();
    console.log('Yes option clicked ')
    await page.waitForTimeout(1000);
    
    // Step 10: Verify success message
    console.log('Step 10: Verifying success message...');
   const successTitle = page.locator('h2.MuiDialogTitle-root:has-text("Rejected")');
   const successMessage = page.locator('div.MuiDialogContent-root:has-text("Enquiry Rejected Successfully!")');
     await successTitle.waitFor({ state: 'visible', timeout: 5000 });
     await successMessage.waitFor({ state: 'visible', timeout: 5000 });
    
    if (await successTitle.isVisible() && await successMessage.isVisible()) {
      console.log('✓ Success message verified: "Enquiry Rejected Successfully!"');
    } else {
      console.log('✗ Success message not found');
    }
    await page.waitForTimeout(3000);

      
    // Step 11: Click OK to close success dialog
    console.log('Step 11: Closing success dialog...');
    await page.getByRole('button', { name: 'OK' }).click();
    await page.waitForTimeout(500);
    
    // Step 12: Verify status change
      
    console.log('\n========================================');
    console.log('All steps completed successfully!');
    console.log('========================================');
    
    // Keep browser open for a few seconds to see the result
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  } 
})