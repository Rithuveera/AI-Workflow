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

test('Contract Review - Contract In Review  - List page ', async ({ page }) => {
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

    // Step 4: Click on Contracts menu icon to expand

    console.log('Step 2: Expanding Contracts menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Sidebar clicked and opened successfully');
    // Click on Master menu
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click Contracts In Review master 

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
        throw new Error('Test Failed: "No Data Found" message detected in the contracts in review list.');
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


test('Contract Review - All Contracts  - List page ', async ({ page }) => {
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

    // Step 4: Click on Contracts menu icon to expand

    console.log('Step 2: Expanding Contracts menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Sidebar clicked and opened successfully');
    // Click on Contracts menu
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click All Contracts master 
    await page.getByRole('link', { name: 'All Contracts' }).click();    
    await page.waitForLoadState('networkidle');
    console.log('All Contracts Menu clicked successfully ');
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
        throw new Error('Test Failed: "No Data Found" message detected in the all contracts list.');
      }
    }

    if (rowCount === 0) {
      throw new Error('Test Failed: All Contracts list table is empty (0 rows found).');
    }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test('Contract Review - Action Items  - List page ', async ({ page }) => {
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

    // Step 4: Click on Contracts menu icon to expand

    console.log('Step 2: Expanding Contracts menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Sidebar clicked and opened successfully');
    // Click on Contracts menu
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click  Action Items 
    await page.getByRole('link', { name: 'Action Items' }).click();    
    await page.waitForLoadState('networkidle');
    console.log(' Action Items Menu clicked successfully ');
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
        throw new Error('Test Failed: "No Data Found" message detected in the action items list.');
      }
    }

    if (rowCount === 0) {
      throw new Error('Test Failed: Action Items list table is empty (0 rows found).');
    }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


test.only('Contract Review - Action Items  - All actions ', async ({ page }) => {
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

    // Step 4: Click on Contracts menu icon to expand

    console.log('Step 2: Expanding Contracts menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Sidebar clicked and opened successfully');
    // Click on Contracts menu
    await page.click('text=Contracts');
    await page.waitForTimeout(500);
    console.log("Contract Menu clicked successfully");

    // Click  Action Items 
    await page.getByRole('link', { name: 'Action Items' }).click();    
    await page.waitForLoadState('networkidle');
    console.log(' Action Items Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click All action tab 
    await page.getByRole('button', { name: 'All Actions' }).click();
    console.log('All Actions tab clicked successfully');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Print the rows in the console
    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      const rowText = cells.join(' | ');
      console.log(`Row ${i + 1}:`, rowText);

      // Ensure Row 1 doesn't contain "No Data Found"
      if (i === 0 && rowText.includes('No Data Found')) {
        throw new Error('Test Failed: "No Data Found" message detected in the action items list.');
      }
    }

    if (rowCount === 0) {
      throw new Error('Test Failed: Action Items list table is empty (0 rows found).');
    }
    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });

  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }
});
