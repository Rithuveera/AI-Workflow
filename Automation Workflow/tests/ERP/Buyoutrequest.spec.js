const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
test('Buyout  - List page ', async ({ page }) => {
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

    // Click Client master 

    await page.getByRole('link', { name: 'Buyout Request' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Buyout request  Menu clicked successfully ');
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
        throw new Error('Test Failed: "No Data Found" message detected in the buyout list.');
      }
    }

    if (rowCount === 0) {
      throw new Error('Test Failed: Buyout list table is empty (0 rows found).');
    }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test('Buyout  - Item selection ', async ({ page }) => {
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

    // Click Client master 

    await page.getByRole('link', { name: 'Buyout Request' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Buyout request  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Locate row checkboxes
    const rowCheckboxes1 = page.locator('input[title^="Select item"]');
    // Get total count
    const count = await rowCheckboxes1.count();

    if (count === 0) {
      console.log('No records found');
    } else {
      console.log(`Total records found: ${count}`);

      // Select maximum 2 items (if available)
      const itemsToSelect = Math.min(2, count);

      for (let i = 0; i < itemsToSelect; i++) {
        await rowCheckboxes1.nth(i).check();  // use check() for checkbox
      }

      console.log(`${itemsToSelect} item(s) selected successfully`);
    }

    /* Select the first two item 

    await page.waitForLoadState('networkidle');
    const rowCheckboxes = page.locator('input[title^="Select item"]');
    await expect(rowCheckboxes.first()).toBeVisible();
    for (let i = 0; i < 2; i++) {
    await rowCheckboxes.nth(i).click();
   }*/

    // Click Create New RFQ
    await page.getByRole('button', { name: 'Create New RFQ' }).click();

    // click Confirm option 
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test('Buyout  - Mapped with new RFQ ', async ({ page }) => {
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

    // Click Client master 

    await page.getByRole('link', { name: 'Buyout Request' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Buyout request  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Select the first two item 

    await page.waitForLoadState('networkidle');
    const rowCheckboxes = page.locator('input[title^="Select item"]');
    await expect(rowCheckboxes.first()).toBeVisible();
    for (let i = 0; i < 2; i++) {
      await rowCheckboxes.nth(i).click();
    }

    // Click Create New RFQ
    await page.getByRole('button', { name: 'Create New RFQ' }).click();

    // click Confirm option 
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test('Buyout  - Mapped with Exsisting  RFQ ', async ({ page }) => {
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

    // Click Client master 

    await page.getByRole('link', { name: 'Buyout Request' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Buyout request  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Select the first two item 

    await page.waitForLoadState('networkidle');
    const rowCheckboxes = page.locator('input[title^="Select item"]');
    await expect(rowCheckboxes.first()).toBeVisible();
    for (let i = 0; i < 2; i++) {
      await rowCheckboxes.nth(i).click();
    }

    // Click Create New RFQ
    await page.getByRole('button', { name: 'Add to RFQ' }).click();

    const firstRFQ = page.locator('div[style*="cursor: pointer"]').first();
    await expect(firstRFQ).toBeVisible();
    await firstRFQ.scrollIntoViewIfNeeded();
    await firstRFQ.click();


    // Click save option 
    await page.getByText('Save').click();


    // Click Confirm opion 
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});




test('Buyoutlist  - Hold ', async ({ page }) => {
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

    // Click Buyout request 
    await page.getByRole('link', { name: 'Buyout Request' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Buyout request  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click first item in buyout list page

    const statusCells = page.locator('td.TanStackTableStyles_truncateCell__Nb5_d', {
      hasText: 'In buyout'
    });

    // Wait until at least one is visible
    await statusCells.first().waitFor({ state: 'visible', timeout: 10000 });

    // Click the first “In buyout” cell
    await statusCells.first().click();

    console.log("Clicked the 'In buyout' status of the first item in the list");

    // Click Hold option 

    await page.getByRole('button', { name: 'Hold' }).click();
    console.log('Hold option clicked successfully');

    // Fill the comment 

    const commentBox = page.locator('textarea[name="comment"]');

    await expect(commentBox).toBeVisible();
    await commentBox.fill('This is my comment for the RFQ process.');

    console.log('Filled the comment textarea');

    // Click hold option 

    await page.getByRole('button', { name: 'Hold' }).click();

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
    throw error;
  }
});

test('Buyoutlist  - Rejected ', async ({ page }) => {
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

    // Click Buyout request 
    await page.getByRole('link', { name: 'Buyout Request' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Buyout request  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click first item in buyout list page

    const statusCells = page.locator('td.TanStackTableStyles_truncateCell__Nb5_d', {
      hasText: 'In buyout'
    });

    // Wait until at least one is visible
    await statusCells.first().waitFor({ state: 'visible', timeout: 10000 });

    // Click the first “In buyout” cell
    await statusCells.first().click();

    console.log("Clicked the 'In buyout' status of the first item in the list");

    // Click Reject option 

    await page.getByRole('button', { name: 'Reject' }).click();

    // Fill the comment 

    const commentBox = page.locator('textarea[name="comment"]');

    await expect(commentBox).toBeVisible();
    await commentBox.fill('This is my comment for the RFQ process.');

    console.log('Filled the comment textarea');

    // Click Reject  option 

    await page.getByRole('button', { name: 'Reject' }).click();

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
    throw error;
  }
});





