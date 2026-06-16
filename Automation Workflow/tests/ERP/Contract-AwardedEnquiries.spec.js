const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test('Contract Review - Awarded Enquiries - List page ', async ({ page }) => {
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
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click awarded Enquiries 
    await page.getByRole('link', { name: 'Awarded Enquiries' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Awarded Enquiries Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      const rowText = cells.join(' | ');
      console.log(`Row ${i + 1}:`, rowText);

      // Ensure Row 1 doesn't contain "No Data Found"
      if (i === 0 && rowText.includes('No Data Found')) {
        throw new Error('Test Failed: "No Data Found" message detected in the awardedList.');
      }
    }

    if (rowCount === 0) {
      throw new Error('Test Failed: Awarded Enquiries list table is empty (0 rows found).');
    }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test('Contract Review - Awarded Enquiries - Queued ', async ({ page }) => {
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
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click awarded Enquiries 
    await page.getByRole('link', { name: 'Awarded Enquiries' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Awarded Enquiries Menu clicked successfully ');
    await page.waitForTimeout(3000);

        // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();
    await page.waitForTimeout(1000);

   // Click on "Queued" status option
       await page.getByTitle('Queued').click();
       console.log('Queued status selected successfully');
       await page.waitForTimeout(3000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('Filter applied, now printing the rows in the console');
    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      const rowText = cells.join(' | ');
      console.log(`Row ${i + 1}:`, rowText);

      // Ensure Row 1 doesn't contain "No Data Found"
      if (i === 0 && rowText.includes('No Data Found')) {
        throw new Error('Test Failed: "No Data Found" message detected in the awardedList.');
      }
    }

    if (rowCount === 0) {
      throw new Error('Test Failed: Awarded Enquiries list table is empty (0 rows found).');
    }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});

test('Awarded Enquiries - Click  Queued ', async ({ page }) => {
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
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click awarded Enquiries 
    await page.getByRole('link', { name: 'Awarded Enquiries' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Awarded Enquiries Menu clicked successfully ');
    await page.waitForTimeout(3000);

        // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();
    await page.waitForTimeout(1000);

   // Click on "Queued" status option
       await page.getByTitle('Queued').click();
       console.log('Queued status selected successfully');
       await page.waitForTimeout(3000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Click the first row in the table
    const firstRow = page.locator('table tbody tr').first();
    await firstRow.dblclick();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('First row clicked successfully, now on details page');

    // Verify that the details page contains the expected text
    const header = page.getByText('Contract Verification', { exact: true });
    await expect(header).toBeVisible();
    const headerText = await header.textContent();
    console.log('Page Header:', headerText);
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});

test('Awarded Enquiries - Fill the all details for Queued ', async ({ page }) => {
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
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click awarded Enquiries 
    await page.getByRole('link', { name: 'Awarded Enquiries' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Awarded Enquiries Menu clicked successfully ');
    await page.waitForTimeout(3000);

        // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();
    await page.waitForTimeout(1000);

   // Click on "Queued" status option
       await page.getByTitle('Queued').click();
       console.log('Queued status selected successfully');
       await page.waitForTimeout(3000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Click the first row in the table
    const firstRow = page.locator('table tbody tr').first();
    await firstRow.dblclick();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('First row clicked successfully, now on details page');

    // Verify that the details page contains the expected text
    const header = page.getByText('Contract Verification', { exact: true });
    await expect(header).toBeVisible();
    const headerText = await header.textContent();
    console.log('Page Header:', headerText);

    // Click the project start date 
    console.log(await page.getByAltText('Calendar Icon').count());
   const day = new Date().getDate();
    await page.getByAltText('Calendar Icon').nth(1).click();
   await page.locator(`//div[text()='${day}']`).click();
   console.log('Project start date selected successfully');
   await page.waitForTimeout(3000);

   // Click the project end date 
   const endDay = day + 7; // Set end date to 7 days from start date
   await page.getByAltText('Calendar Icon').nth(2).click();
   await page.locator(`//div[text()='${endDay}']`).click();
   console.log('Project end date selected successfully');

   // Click Final shipment date ( Shipment date between Start and end date  )
    const shipmentDay = day + 3; // Set shipment date to 3 days from start date 
    await page.getByAltText('Calendar Icon').nth(3).click();
    await page.locator(`//div[text()='${shipmentDay}']`).click();
    console.log('Final shipment date selected successfully');

    // Select the payment terms from dropdown
    await page.getByPlaceholder('Select...').nth(0).click();
    await page.getByText('Credit', { exact: true }).click();
    console.log('Payment terms selected successfully');
    await page.waitForTimeout(3000);
    //Enter the days 
    await page.locator('input[name="paymentDays"]').fill('15');
    console.log('Payment days entered successfully');
    await page.waitForTimeout(3000);

    //Select the delivery terms from dropdown
    await page.getByPlaceholder('Select...').nth(1).click();
    await page.getByText('DDP', { exact: true }).click();
    console.log('Delivery terms selected successfully');
    test.setTimeout(60000);
    
    // Enter the Loan no
    await page.locator('input[name="loiNo"]').fill('Loan001');
    console.log('LOI number entered successfully');
    await page.waitForTimeout(3000);

    // Enter the PO Number
    await page.locator('input[name="poNo"]').fill('PO001');
    console.log('PO number entered successfully');
    await page.waitForTimeout(3000);    

    // Select the Project manager from dropdown
    await page.getByPlaceholder('Select...').nth(2).click();
    await page.getByText('Veeramani', { exact: true }).click();
    console.log('Project manager selected successfully');
    await page.waitForTimeout(3000);

    // Click Save button
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('Save button clicked successfully, now verifying the success message'); 
    
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});

test('Awarded Enquiries - Fill the general details and save as Draft', async ({ page }) => {
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
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click awarded Enquiries 
    await page.getByRole('link', { name: 'Awarded Enquiries' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Awarded Enquiries Menu clicked successfully ');
    await page.waitForTimeout(3000);

        // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();
    await page.waitForTimeout(1000);

   // Click on "Queued" status option
       await page.getByTitle('Initiated').click();
       console.log('Queued status selected successfully');
       await page.waitForTimeout(3000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Click the first row in the table
    const firstRow = page.locator('table tbody tr').first();
    await firstRow.dblclick();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('First row clicked successfully, now on details page');

    // Verify that the details page contains the expected text
    const header = page.getByText('Contract Verification', { exact: true });
    await expect(header).toBeVisible();
    const headerText = await header.textContent();
    console.log('Page Header:', headerText);

    
    
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test('Awarded Enquiries - Points to Reviewed In Initiated status with save as Draft', async ({ page }) => {
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
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click awarded Enquiries 
    await page.getByRole('link', { name: 'Awarded Enquiries' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Awarded Enquiries Menu clicked successfully ');
    await page.waitForTimeout(3000);

        // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();
    await page.waitForTimeout(1000);

   // Click on "Queued" status option
       await page.getByTitle('Initiated').click();
       console.log('Initiated status selected successfully');
       await page.waitForTimeout(3000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Click the first row in the table
    const firstRow = page.locator('table tbody tr').first();
    await firstRow.dblclick();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('First row clicked successfully, now on details page');

    // Verify that the details page contains the expected text
    const header = page.getByText('Contract Verification', { exact: true });
    await expect(header).toBeVisible();
    const headerText = await header.textContent();
    console.log('Page Header:', headerText);

    // Click the project start date 
    console.log(await page.getByAltText('Calendar Icon').count());
   const day = new Date().getDate();
    await page.getByAltText('Calendar Icon').nth(1).click();
   await page.locator(`//div[text()='${day}']`).click();
   console.log('Project start date selected successfully');
   await page.waitForTimeout(3000);

   // Click the project end date 
   const endDay = day + 7; // Set end date to 7 days from start date
   await page.getByAltText('Calendar Icon').nth(2).click();
   await page.locator(`//div[text()='${endDay}']`).click();
   console.log('Project end date selected successfully');

   // Click Final shipment date ( Shipment date between Start and end date  )
    const shipmentDay = day + 3; // Set shipment date to 3 days from start date 
    await page.getByAltText('Calendar Icon').nth(3).click();
    await page.locator(`//div[text()='${shipmentDay}']`).click();
    console.log('Final shipment date selected successfully');

    // Select the payment terms from dropdown
    await page.getByPlaceholder('Select...').nth(0).click();
    await page.getByText('Credit', { exact: true }).click();
    console.log('Payment terms selected successfully');
    await page.waitForTimeout(3000);
    //Enter the days 
    await page.locator('input[name="paymentDays"]').fill('15');
    console.log('Payment days entered successfully');
    await page.waitForTimeout(3000);

    //Select the delivery terms from dropdown
    await page.getByPlaceholder('Select...').nth(1).click();
    await page.getByText('DDP', { exact: true }).click();
    console.log('Delivery terms selected successfully');
    test.setTimeout(60000);
    
    // Enter the Loan no
    await page.locator('input[name="loiNo"]').fill('Loan001');
    console.log('LOI number entered successfully');
    await page.waitForTimeout(3000);

    // Enter the PO Number
    await page.locator('input[name="poNo"]').fill('PO001');
    console.log('PO number entered successfully');
    await page.waitForTimeout(3000);    

    // Select the Project manager from dropdown
    await page.getByPlaceholder('Select...').nth(2).click();
    await page.getByText('Veeramani', { exact: true }).click();
    console.log('Project manager selected successfully');
    await page.waitForTimeout(3000);

    // Select the Point to reviewed checkbox
    const yesButtons = page.getByRole('button', { name: 'Yes' });
    for (let i = 0; i < 5; i++) {
    await yesButtons.nth(i).click();
        }
        await page.waitForTimeout(3000);

    // Click Save button
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('Save button clicked successfully, now verifying the success message'); 
    console.log('Contract review successfully completed and status changed to Reviewed');
    
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test('Awarded Enquiries - Validate the submit for review without assign the user', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'Veera');
    await page.fill('input[name="password"]', 'Rithu@11');ook
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
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click awarded Enquiries 
    await page.getByRole('link', { name: 'Awarded Enquiries' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Awarded Enquiries Menu clicked successfully ');
    await page.waitForTimeout(3000);

        // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();
    await page.waitForTimeout(1000);

   // Click on "Queued" status option
       await page.getByTitle('Initiated').click();
       console.log('Initiated status selected successfully');
       await page.waitForTimeout(3000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Click the first row in the table
    const firstRow = page.locator('table tbody tr').first();
    await firstRow.dblclick();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('First row clicked successfully, now on details page');

    // Verify that the details page contains the expected text
    const header = page.getByText('Contract Verification', { exact: true });
    await expect(header).toBeVisible();
    const headerText = await header.textContent();
    console.log('Page Header:', headerText);

    // Click the project start date 
    console.log(await page.getByAltText('Calendar Icon').count());
   const day = new Date().getDate();
    await page.getByAltText('Calendar Icon').nth(1).click();
   await page.locator(`//div[text()='${day}']`).click();
   console.log('Project start date selected successfully');
   await page.waitForTimeout(3000);

   // Click the project end date 
   const endDay = day + 7; // Set end date to 7 days from start date
   await page.getByAltText('Calendar Icon').nth(2).click();
   await page.locator(`//div[text()='${endDay}']`).click();
   console.log('Project end date selected successfully');

   // Click Final shipment date ( Shipment date between Start and end date  )
    const shipmentDay = day + 3; // Set shipment date to 3 days from start date 
    await page.getByAltText('Calendar Icon').nth(3).click();
    await page.locator(`//div[text()='${shipmentDay}']`).click();
    console.log('Final shipment date selected successfully');

    // Select the payment terms from dropdown
    await page.getByPlaceholder('Select...').nth(0).click();
    await page.getByText('Credit', { exact: true }).click();
    console.log('Payment terms selected successfully');
    await page.waitForTimeout(3000);
    //Enter the days 
    await page.locator('input[name="paymentDays"]').fill('15');
    console.log('Payment days entered successfully');
    await page.waitForTimeout(3000);

    //Select the delivery terms from dropdown
    await page.getByPlaceholder('Select...').nth(1).click();
    await page.getByText('DDP', { exact: true }).click();
    console.log('Delivery terms selected successfully');
    test.setTimeout(60000);
    
    // Enter the Loan no
    await page.locator('input[name="loiNo"]').fill('Loan001');
    console.log('LOI number entered successfully');
    await page.waitForTimeout(3000);

    // Enter the PO Number
    await page.locator('input[name="poNo"]').fill('PO001');
    console.log('PO number entered successfully');
    await page.waitForTimeout(3000);    

    // Select the Project manager from dropdown
    await page.getByPlaceholder('Select...').nth(2).click();
    await page.getByText('Veeramani', { exact: true }).click();
    console.log('Project manager selected successfully');
    await page.waitForTimeout(3000);

    // Select the Point to reviewed checkbox
    const yesButtons = page.getByRole('button', { name: 'Yes' });
    for (let i = 0; i < 5; i++) {
    await yesButtons.nth(i).click();
        }
        await page.waitForTimeout(3000);

    // Click Save button
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('Save button clicked successfully, now verifying the success message'); 
    // Click on submit for review button without assign the user
    await page.getByRole('button', { name: 'Submit for Review' }).click();
    await page.waitForTimeout(3000);

    // Click yes on the confirmation popup
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForTimeout(3000);

  const errorToast = page.locator('.Toastify__toast--error');
  const successPopup = page.getByRole('dialog');

if (await errorToast.isVisible()) {
    await expect(errorToast).toContainText(
        'Please assign all reviewers before submitting for review.'
    );

    console.log('Validation displayed - Please assign all reviewers before submitting for review');
} else {
    await expect(successPopup).toContainText(
        'Contract Review Submitted Successfully'
    );

    console.log('Contract review submitted successfully');

    await page.getByRole('button', { name: 'Ok' }).click();
}
}
            
    catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test.only('Awarded Enquiries - Assign the reviewer', async ({ page }) => {
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
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click awarded Enquiries 
    await page.getByRole('link', { name: 'Awarded Enquiries' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Awarded Enquiries Menu clicked successfully ');
    await page.waitForTimeout(3000);

        // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();
    await page.waitForTimeout(1000);

   // Click on "Queued" status option
       await page.getByTitle('Initiated').click();
       console.log('Initiated status selected successfully');
       await page.waitForTimeout(3000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Click the first row in the table
    const firstRow = page.locator('table tbody tr').first();
    await firstRow.dblclick();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('First row clicked successfully, now on details page');

    // Verify that the details page contains the expected text
    const header = page.getByText('Contract Verification', { exact: true });
    await expect(header).toBeVisible();
    const headerText = await header.textContent();
    console.log('Page Header:', headerText);

    // Click Save button
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('Save button clicked successfully, now verifying the success message'); 
    await page.waitForTimeout(3000);
    // Click on submit for review button without assign the user

    await page.getByRole('button', { name: 'Submit for Review' }).click();
    await page.waitForTimeout(3000);

    // Click yes on the confirmation popup
   await page.getByRole('button', { name: 'Yes' }).click();

   await page.waitForLoadState('networkidle');
const validationMessage = page.getByText(  'Please assign all reviewers before submitting for review.');

const successMessage = page.getByText( 'Contract Review Submitted Successfully');

// Wait for either validation or success message
await Promise.race([
  validationMessage.waitFor({ state: 'visible', timeout: 10000 }).catch(() => null),
  successMessage.waitFor({ state: 'visible', timeout: 10000 }).catch(() => null)
]);

// Scenario 1: Reviewers not assigned
if (await validationMessage.isVisible().catch(() => false)) {

  console.log('Reviewers not assigned. Assigning reviewers...');

  await page.getByRole('button', { name: 'Cancel' }).click();

  // Open Reviewers popup
  await page.getByRole('button', { name: 'Reviewers' }).click();
  await page.waitForLoadState('networkidle');
  // Click edit button to enable the dropdowns 
  const editButton = page.getByRole('button', { name: 'Edit' });
  await expect(editButton).toBeVisible({ timeout: 15000 });
  await editButton.click();
 
 // Assign the technical reviewer
 test.setTimeout(120000);

const input = page.locator('input[aria-label="Select technical reviewer"]');
console.log('👉 Clicking input...');
await input.click();
await page.waitForTimeout(3000); // Wait after click

console.log('👉 Filling value: Mani');

await input.fill('Mani');
const options = page.locator('[class*="suggestion_item"]');

await options.first().waitFor({ state: 'visible', timeout: 10000 });

const count = await options.count();
console.log(`Total options found: ${count}`);

let optionSelected = false;

for (let i = 0; i < count; i++) {
    const option = options.nth(i);
    const text = (await option.textContent())?.trim();

    console.log(`Option ${i + 1}: "${text}"`);

    if (text === 'Mani') {
        await option.scrollIntoViewIfNeeded();
        await option.click();
        console.log(`Selected option: "${text}"`);
        optionSelected = true;
        break;
    }
}

if (!optionSelected) {
    throw new Error('Reviewer "Mani" not found in dropdown');
}

  // Commercial Reviewer
  const commercialReviewer = page.getByPlaceholder('Select commercial reviewer');
  await commercialReviewer.fill('Ritu');
  await page.locator('text=Ritu').first().click();
  console.log('Commercial reviewer assigned successfully');
  await page.waitForTimeout(3000);

  // Final Approver
  const finalApprover = page.getByPlaceholder('Select final approver');
  await finalApprover.fill('Admin');
 await page.locator('text=Admin').first().click();
  console.log('Final approver assigned successfully');
  await page.waitForTimeout(3000);

  // Click Save button after assigning reviewers

  await page.getByRole('button', { name: 'Save' }).click();

 await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Submit for Review' }).click();

const yesButton = page.getByRole('button', { name: 'Yes' });
await yesButton.waitFor({ state: 'visible' });

await yesButton.click();

  console.log('Contract review submitted successfully after assigning reviewers');

  await page.getByRole('button', { name: 'Ok' }).click();
}

// Scenario 2: Reviewers already assigned
else if (await successMessage.isVisible().catch(() => false)) {

  console.log('Contract review submitted successfully');

  await page.getByRole('button', { name: 'Ok' }).click();
}
  }
            
    catch (error) {
    console.error('Error:', error);
    throw error;
  }
});




