const { test, expect } = require('@playwright/test')
test("Approved", async ({ page }) => {
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
    //  Click on Enquiry menu icon to expand

    console.log(' Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);

    //  Click on Enquiry menu item to see submenu
    console.log('Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    await page.waitForTimeout(1000);

    // Step 5: Click on "Pending Approval" menu item
    console.log(' Navigating to Pending Approval...');
    await page.getByRole('link', { name: 'Pending Approval' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForURL('**/pending-enquiry/list');
    console.log('Pending Approval page loaded!');

    // //Step 6: Click on first entry dynamically from pending tab 

    console.log('Click first pending enquiry dynamically');
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

    // Step 7: Click the Approve button
    console.log(' Clicking Approve button...');
    await page.getByRole('button', { name: 'Approve' }).click();
    await page.waitForTimeout(500);

    // Step 8: Wait for confirmation dialog and click Yes
    console.log(' Confirming approval...');
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForTimeout(1000);

    // Print the success message 

    const messageLocator = page.locator("div[class*='MuiDialogContent-root']");
    await messageLocator.waitFor();
    const messageText = await messageLocator.innerText();
    console.log("Popup Message:", messageText);

    // Click Ok option 
    await page.getByRole('button', { name: 'OK' }).click();


  }
  catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  }
})