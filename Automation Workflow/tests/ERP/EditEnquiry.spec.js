
const { test, expect } = require('@playwright/test');
const BASE_URL = 'https://datnext-qa.algosium.com';
const VALID_USERNAME = 'Veera';
const VALID_PASSWORD = 'Rithu@11';

test("Enquiry Edit ",async ({page}) => {
  
     // Step 1: Navigate to the login page
     await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('networkidle');

    // Login 

        await page.getByRole('textbox', { name: 'Enter your username' }).fill(VALID_USERNAME);
        await page.getByRole('textbox', { name: 'Your password' }).fill(VALID_PASSWORD);
        await page.getByRole('button', { name: 'Login' }).click();
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
     // Step 2: Click on Enquiry menu icon to expand
    
    console.log('Step 2: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);

    // Step 3: Click on Enquiry menu item to see submenu
    console.log('Step 3: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    await page.waitForTimeout(1000);

    // Step 4: Click on Internal Enquiry
    console.log('Step 4: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('Internal Enquiry page loaded');
    // Step 5 : Click on Pending Tab 
       console.log('Step 13: Click Pending Approval tab');
    await page.getByRole('button', { name: 'Pending Approval' }).click();
    await page.waitForTimeout(3000);
    console.log('Pending tab loaded');

    //Step 6: Click on first entry dynamically from pending tab 

    console.log('Step 14: Click first pending enquiry dynamically');
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

    console.log('Step 15: Wait for page to load and click Edit button');
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.waitForURL('**/enquiry/edit/**');
    console.log('Navigated to enquiry edit page');
    await page.waitForTimeout(5000);

    // Ente the Customer Reference Number and description 
    console.log('Step 17: Update Customer Reference and Description');
    await page.locator('#contractorReference').fill('Cusref001tested');
    await page.fill('#Description', 'New description details')
    // Click Save changes 

    console.log('Step 17: Clicking Save Changes...');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.waitForTimeout(5000);
    console.log('save clicked successfully')

    // Verify the success Messsage 
    

    console.log('Step 18: Waiting for success message...');
    const successMessage = page.locator('h2:has-text("Enquiry Updated")');
    await expect(successMessage).toBeVisible({ timeout: 10000 });
    await expect(successMessage).toHaveText('Enquiry Updated');
    console.log('✓ Enquiry updated successfully!');

    // Close the success popup
    await page.click('button:has-text("Ok")');
    console.log('✓ Popup closed');

});