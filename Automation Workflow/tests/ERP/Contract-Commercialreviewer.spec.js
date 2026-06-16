const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test('Contract Review - Contract In Review - List page ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin@2024');
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
    await page.getByRole('link', { name: 'Contracts In Review' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Contracts In Review Menu clicked successfully ');
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
        throw new Error('Test Failed: "No Data Found" message detected in the contractsInReviewList.');
      }
    }

    if (rowCount === 0) {
      throw new Error('Test Failed: Contracts In Review list table is empty (0 rows found).');
    }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test('Contract In Review -  Advanced Search with Commercial Review status ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin@2024');
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
    await page.getByRole('link', { name: 'Contracts In Review' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Contracts In Review Menu clicked successfully ');
    await page.waitForTimeout(3000);

       // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Select "Commercial Review" status from the dropdown
       await page.locator('div:nth-child(8) > .AdvancedFilterTab_filter_header__FUxof').click();
       await page.locator('input[placeholder="Comm Review..."]').fill('Admin');
       await page.getByTitle('Admin').click();
        await page.waitForTimeout(2000);

    // Click on Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Advanced Search applied successfully with Comm Review status filter');
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
        throw new Error('Test Failed: "No Data Found" message detected in the contractsInReviewList.');
      }
    }

    if (rowCount === 0) {
      throw new Error('Test Failed: Contracts In Review list table is empty (0 rows found).');
    }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test('Contract In Review -  advanced search with Review stage  ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin@2024');
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
    await page.getByRole('link', { name: 'Contracts In Review' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Contracts In Review Menu clicked successfully ');
    await page.waitForTimeout(3000);

       // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Select "Tech Review" status from the dropdown
       await page.locator('div:nth-child(4) > .AdvancedFilterTab_filter_header__FUxof').click();
       await page.locator('span[title="Commercial"]').waitFor();
       await page.locator('span[title="Commercial"]').click();
       console.log('Commercial review stage selected successfully');
       await page.waitForTimeout(2000);

    // Click on Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Advanced Search applied successfully with Commercial Review status filter');
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
        throw new Error('Test Failed: "No Data Found" message detected in the contractsInReviewList.');
      }
    }

    if (rowCount === 0) {
      throw new Error('Test Failed: Contracts In Review list table is empty (0 rows found).');
    }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});



test('Contract In Review -  Click first line item in the list page  ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin@2024');
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
    await page.getByRole('link', { name: 'Contracts In Review' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Contracts In Review Menu clicked successfully ');
    await page.waitForTimeout(3000);

       // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Select "Tech Review" status from the dropdown
       await page.locator('div:nth-child(4) > .AdvancedFilterTab_filter_header__FUxof').click();
       await page.locator('span[title="Commercial"]').waitFor();
       await page.locator('span[title="Commercial"]').click();
       console.log('Commercial review stage selected successfully');
       await page.waitForTimeout(2000);

    // Click on Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Advanced Search applied successfully with Commercial Review status filter');
    await page.waitForTimeout(3000);

    // Click on the first line item in the list
    await page.locator('table tbody tr').first().dblclick();
    await page.waitForLoadState('networkidle');
    console.log('First line item clicked successfully and navigated to details page');  
    await page.waitForTimeout(3000);

     // Optional: Take a screenshot
     await page.screenshot({ path: 'guest-details.png', fullPage: true });  
  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test('Contract In Review -  Commercial Reviewer change the project manager wih save option   ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin@2024');
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
    await page.getByRole('link', { name: 'Contracts In Review' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Contracts In Review Menu clicked successfully ');
    await page.waitForTimeout(3000);

       // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Select "Commercial Review" status from the dropdown
       await page.locator('div:nth-child(4) > .AdvancedFilterTab_filter_header__FUxof').click();
       await page.locator('span[title="Commercial"]').waitFor();
       await page.locator('span[title="Commercial"]').click();
       console.log('Commercial review stage selected successfully');
       await page.waitForTimeout(2000);

    // Click on Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Advanced Search applied successfully with Commercial Review status filter');
    await page.waitForTimeout(3000);

    // Click on the first line item in the list
    await page.locator('table tbody tr').first().dblclick();
    await page.waitForLoadState('networkidle');
    console.log('First line item clicked successfully and navigated to details page');  
    await page.waitForTimeout(3000);

    // Select the project manager from the dropdown
    
    await page.getByPlaceholder('Select...').nth(3).fill('Veeramani');
    const option = page.locator('[id="suggestion-item-Veeramani"]');
    await option.waitFor({ state: 'visible', timeout: 10000 });
    await option.click();

    console.log('Project manager selected successfully');
    await page.waitForTimeout(3000);

    // Click on Save button to save the changes
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Changes saved successfully');  
    await page.waitForTimeout(3000);

     // Optional: Take a screenshot
     await page.screenshot({ path: 'guest-details.png', fullPage: true });  
  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});



test('Contract In Review -  Commercial Reviewer Update the point to review  with save option ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin@2024');
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
    await page.getByRole('link', { name: 'Contracts In Review' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Contracts In Review Menu clicked successfully ');
    await page.waitForTimeout(3000);

       // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Select "Commercial Review" status from the dropdown
       await page.locator('div:nth-child(4) > .AdvancedFilterTab_filter_header__FUxof').click();
       await page.locator('span[title="Commercial"]').waitFor();
       await page.locator('span[title="Commercial"]').click();
       console.log('Commercial review stage selected successfully');
       await page.waitForTimeout(2000);

    // Click on Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Advanced Search applied successfully with Commercial Review status filter');
    await page.waitForTimeout(3000);

    // Click on the first line item in the list
    await page.locator('table tbody tr').first().dblclick();
    await page.waitForLoadState('networkidle');
    console.log('First line item clicked successfully and navigated to details page');  
    await page.waitForTimeout(3000);

    // Select the Point to reviewed checkbox
    const yesButtons = page.getByRole('button', { name: 'Yes' });
    for (let i = 0; i < 5; i++) {
    await yesButtons.nth(i).click();
        }
        await page.waitForTimeout(3000);

    // Click on Save button to save the changes
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Changes saved successfully');  
    await page.waitForTimeout(3000);

     // Optional: Take a screenshot
     await page.screenshot({ path: 'guest-details.png', fullPage: true });  
  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});



test('Contract In Review -  Commercial Reviewer with Approval   ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin@2024');
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
    await page.getByRole('link', { name: 'Contracts In Review' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Contracts In Review Menu clicked successfully ');
    await page.waitForTimeout(3000);

       // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Select "Commercial Review" status from the dropdown
       await page.locator('div:nth-child(4) > .AdvancedFilterTab_filter_header__FUxof').click();
       await page.locator('span[title="Commercial"]').waitFor();
       await page.locator('span[title="Commercial"]').click();
       console.log('Commercial review stage selected successfully');
       await page.waitForTimeout(2000);

    // Click on Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Advanced Search applied successfully with Commercial Review status filter');
    await page.waitForTimeout(3000);

    // Click on the first line item in the list
    await page.locator('table tbody tr').first().dblclick();
    await page.waitForLoadState('networkidle');
    console.log('First line item clicked successfully and navigated to details page');  
    await page.waitForTimeout(3000);

    // Select the Point to reviewed checkbox
    const yesButtons = page.getByRole('button', { name: 'Yes' });
    for (let i = 0; i < 5; i++) {
    await yesButtons.nth(i).click();
        }
        await page.waitForTimeout(3000);

    // Click on Save button to save the changes
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Changes saved successfully');  
    await page.waitForTimeout(3000);
    
   // Click approveutton
   await page.getByRole('button', { name: 'Approve' }).click();
   await page.waitForLoadState('networkidle');
   console.log('Contract approved successfully');  
   await page.waitForTimeout(2000);
//   Enter the remarks in the textarea
  await page.locator('textarea[placeholder="Enter approval remarks..."]').fill('Approved');
   console.log('Remarks entered successfully');  
   await page.waitForTimeout(2000);

   // Click approve button in the confirmation popup
   await page.getByRole('button', { name: 'Approve' }).click();
   await page.waitForLoadState('networkidle');
   console.log('Approval confirmed successfully');  

     // Optional: Take a screenshot
     await page.screenshot({ path: 'guest-details.png', fullPage: true });  
  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});



test('Contract In Review -  Commercial Reviewer with Rejected    ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin@2024');
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
    await page.getByRole('link', { name: 'Contracts In Review' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Contracts In Review Menu clicked successfully ');
    await page.waitForTimeout(3000);

       // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Select "Commercial Review" status from the dropdown
       await page.locator('div:nth-child(4) > .AdvancedFilterTab_filter_header__FUxof').click();
       await page.locator('span[title="Commercial"]').waitFor();
       await page.locator('span[title="Commercial"]').click();
       console.log('Commercial review stage selected successfully');
       await page.waitForTimeout(2000);

    // Click on Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Advanced Search applied successfully with Commercial Review status filter');
    await page.waitForTimeout(3000);

    // Click on the first line item in the list
    await page.locator('table tbody tr').first().dblclick();
    await page.waitForLoadState('networkidle');
    console.log('First line item clicked successfully and navigated to details page');  
    await page.waitForTimeout(3000);

    // Select the Point to reviewed checkbox
    const yesButtons = page.getByRole('button', { name: 'Yes' });
    for (let i = 0; i < 5; i++) {
    await yesButtons.nth(i).click();
        }
        await page.waitForTimeout(3000);

    // Click on Save button to save the changes
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Changes saved successfully');  
    await page.waitForTimeout(3000);
    
   // Click Reject button
   await page.getByRole('button', { name: 'Reject' }).click();
   await page.waitForLoadState('networkidle');
   console.log('Contract rejected successfully');  
//   Enter the remarks in the textarea
  await page.getByPlaceholder('Enter rejection remarks...').fill('Rejected due to incomplete information.');
   console.log('Remarks entered successfully');  
   await page.waitForTimeout(2000);
 // Click Reject button in the confirmation popup
   await page.getByRole('button', { name: 'Reject' }).click();
   await page.waitForLoadState('networkidle');
   console.log('Rejection confirmed successfully');  
   
     // Optional: Take a screenshot
     await page.screenshot({ path: 'guest-details.png', fullPage: true });  
  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});



test.only('Contract In Review -  Verify the Revision popup   ', async ({ page }) => {
  try {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('https://datnext-qa.algosium.com/login');
    await page.waitForLoadState('networkidle');


    // Step 2: Login with credentials
    console.log('Step 2: Logging in...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin@2024');
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
    await page.getByRole('link', { name: 'Contracts In Review' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Contracts In Review Menu clicked successfully ');
    await page.waitForTimeout(3000);

       // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Select "Commercial Review" status from the dropdown
       await page.locator('div:nth-child(4) > .AdvancedFilterTab_filter_header__FUxof').click();
       await page.locator('span[title="Commercial"]').waitFor();
       await page.locator('span[title="Commercial"]').click();
       console.log('Commercial review stage selected successfully');
       await page.waitForTimeout(2000);

    // Click on Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Advanced Search applied successfully with Commercial Review status filter');
    await page.waitForTimeout(3000);

    // Click on the first line item in the list
    await page.locator('table tbody tr').first().dblclick();
    await page.waitForLoadState('networkidle');
    console.log('First line item clicked successfully and navigated to details page');  
    await page.waitForTimeout(3000);

    // Select the Point to reviewed checkbox
    const yesButtons = page.getByRole('button', { name: 'Yes' });
    for (let i = 0; i < 5; i++) {
    await yesButtons.nth(i).click();
        }
        await page.waitForTimeout(3000);

    // Click the Revision button
    await page.getByRole('button', { name: 'Revision' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Revision button clicked successfully');  
    await page.waitForTimeout(3000);
  // Verfiy the details in the Revision popup
    const noRecordsMsg = page.getByText('No revision records found');

if (await noRecordsMsg.isVisible()) {
    console.log('No revision records found');
    await expect(noRecordsMsg).toBeVisible();
} else {
    const rows = page.locator('#contract-review-verification-history-table tbody tr');

    const rowCount = await rows.count();
    console.log(`Revision records found: ${rowCount}`);

    await expect(rows.first()).toBeVisible();

    // Verify data is displayed
    for (let i = 0; i < rowCount; i++) {
        const rowText = await rows.nth(i).textContent();
        console.log(`Row ${i + 1}: ${rowText}`);
        expect(rowText?.trim()).not.toBe('');
    }
}
   
     // Optional: Take a screenshot
     await page.screenshot({ path: 'guest-details.png', fullPage: true });  
  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});

