const { test, expect } = require('@playwright/test')
test("Priorities - list page", async ({ page }) => {
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
    
    // Step 5: Click on Setup menu
    await page.locator('div').filter({ hasText: /^Setup$/ }).first().click();
    await page.waitForTimeout(3000);

    // Step 6: Click on Priority link
    await page.getByRole('link', { name: 'Priorities' }).click();
    await page.waitForURL('**/enquiry/setup/priority');
    console.log('Priority page loaded successfully');
    await page.waitForTimeout(3000);

     
    // Get all rows
    await page.waitForSelector('table tbody tr', { state: 'visible' });
    const rows = await page.locator('table tbody tr').all();
    console.log('Total Entries:', rows.length);
    console.log('\n');
    
    // Print each row
    for (let i = 0; i < rows.length; i++) {
      const cells = await rows[i].locator('td').allInnerTexts();
      
      console.log(`Entry ${i + 1}:`);
      console.log(`  Name:       ${cells[0]}`);
      console.log(`  Type:       ${cells[1]}`);
      console.log(`  Created On:       ${cells[2]}`);
      console.log(`  Created by: ${cells[3]}`);
      console.log('');
    }
  }
  catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  }
})

test("Priorities - Add -Open ", async ({ page }) => {
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
    
    // Step 5: Click on Setup menu
    await page.locator('div').filter({ hasText: /^Setup$/ }).first().click();
    await page.waitForTimeout(3000);

    // Step 6: Click on Priority link
    await page.getByRole('link', { name: 'Priorities' }).click();
    await page.waitForURL('**/enquiry/setup/priority');
    console.log('Priority page loaded successfully');
    await page.waitForTimeout(3000);

    // Click Add option 
    await page.getByRole('button', { name: 'Add' }).click();
    console.log('Add Priority form opened successfully');

    // Enter the Priority name
    await page.getByPlaceholder('Name').fill('Test Name');
    await page.waitForTimeout(1000);    

    // Select the Type from dropdown
    await page.getByRole('button', { name: 'Select Type' }).click();
    await page.locator('li', { hasText: 'Open' }).click();
         await page.waitForTimeout(1000);

    // CLick save button to save the new priority
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    console.log('New priority added successfully');     

     // Get all rows
    await page.waitForSelector('table tbody tr', { state: 'visible' });
    const rows = await page.locator('table tbody tr').all();
    console.log('Total Entries:', rows.length);
    console.log('\n');
    
    // Print each row
    for (let i = 0; i < rows.length; i++) {
      const cells = await rows[i].locator('td').allInnerTexts();
      
      console.log(`Entry ${i + 1}:`);
      console.log(`  Name:       ${cells[0]}`);
      console.log(`  Type:       ${cells[1]}`);
      console.log(`  Created On:       ${cells[2]}`);
      console.log(`  Created by: ${cells[3]}`);
      console.log('');
    }

       
  }
  catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  }
})


test("Priorities - Add - Closed ", async ({ page }) => {
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
    
    // Step 5: Click on Setup menu
    await page.locator('div').filter({ hasText: /^Setup$/ }).first().click();
    await page.waitForTimeout(3000);

    // Step 6: Click on Priority link
    await page.getByRole('link', { name: 'Priorities' }).click();
    await page.waitForURL('**/enquiry/setup/priority');
    console.log('Priority page loaded successfully');
    await page.waitForTimeout(3000);

    // Click Add option 
    await page.getByRole('button', { name: 'Add' }).click();
    console.log('Add Priority form opened successfully');

    // Enter the Priority name
    await page.getByPlaceholder('Name').fill('Awarded Status');
    await page.waitForTimeout(1000);    

    // Select the Type from dropdown
    await page.getByRole('button', { name: 'Select Type' }).click();
    await page.locator('li', { hasText: 'Closed' }).click();
         await page.waitForTimeout(1000);

    // CLick save button to save the new priority
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    console.log('New priority added successfully');     

     // Get all rows
    await page.waitForSelector('table tbody tr', { state: 'visible' });
    const rows = await page.locator('table tbody tr').all();
    console.log('Total Entries:', rows.length);
    console.log('\n');
    
    // Print each row
    for (let i = 0; i < rows.length; i++) {
      const cells = await rows[i].locator('td').allInnerTexts();
      
      console.log(`Entry ${i + 1}:`);
      console.log(`  Name:       ${cells[0]}`);
      console.log(`  Type:       ${cells[1]}`);
      console.log(`  Created On:       ${cells[2]}`);
      console.log(`  Created by: ${cells[3]}`);
      console.log('');
    }

       
  }
  catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  }
})


test.only("Priorities - Add - Awarded ", async ({ page }) => {
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
    
    // Step 5: Click on Setup menu
    await page.locator('div').filter({ hasText: /^Setup$/ }).first().click();
    await page.waitForTimeout(3000);

    // Step 6: Click on Priority link
    await page.getByRole('link', { name: 'Priorities' }).click();
    await page.waitForURL('**/enquiry/setup/priority');
    console.log('Priority page loaded successfully');
    await page.waitForTimeout(3000);

    // Click Add option 
    await page.getByRole('button', { name: 'Add' }).click();
    console.log('Add Priority form opened successfully');

    // Enter the Priority name
    await page.getByPlaceholder('Name').fill('Test Name');
    await page.waitForTimeout(1000);    

    // Select the Type from dropdown
    await page.getByRole('button', { name: 'Select Type' }).click();
    await page.locator('li', { hasText: 'Awarded' }).click();
         await page.waitForTimeout(1000);

    // CLick save button to save the new priority
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    console.log('New priority added successfully');     

     // Get all rows
    await page.waitForSelector('table tbody tr', { state: 'visible' });
    const rows = await page.locator('table tbody tr').all();
    console.log('Total Entries:', rows.length);
    console.log('\n');
    
    // Print each row
    for (let i = 0; i < rows.length; i++) {
      const cells = await rows[i].locator('td').allInnerTexts();
      
      console.log(`Entry ${i + 1}:`);
      console.log(`  Name:       ${cells[0]}`);
      console.log(`  Type:       ${cells[1]}`);
      console.log(`  Created On:       ${cells[2]}`);
      console.log(`  Created by: ${cells[3]}`);
      console.log('');
    }

       
  }
  catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  }
})



test("Priorities - edit", async ({ page }) => {
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
    
    // Step 5: Click on Setup menu
    await page.locator('div').filter({ hasText: /^Setup$/ }).first().click();
    await page.waitForTimeout(3000);

    // Step 6: Click on Priority link
    await page.getByRole('link', { name: 'Priorities' }).click();
    await page.waitForURL('**/enquiry/setup/priority');
    console.log('Priority page loaded successfully');
    await page.waitForTimeout(3000);

    // Click edit icon of the first row in the table to edit the priority
    await page.locator('table tbody tr').first().locator('img[alt="Edit"]').click();
    console.log('Edit Priority form opened successfully');

   
    // Enter the Priority name
    await page.locator('input[name="name"]').clear();
    await page.getByPlaceholder('Name').fill('Updated ');
    await page.waitForTimeout(1000);    


    // CLick save button to save the new priority
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    console.log('New priority added successfully');     

     // Get all rows
    await page.waitForSelector('table tbody tr', { state: 'visible' });
    const rows = await page.locator('table tbody tr').all();
    console.log('Total Entries:', rows.length);
    console.log('\n');
    
    // Print each row
    for (let i = 0; i < rows.length; i++) {
      const cells = await rows[i].locator('td').allInnerTexts();
      
      console.log(`Entry ${i + 1}:`);
      console.log(`  Name:       ${cells[0]}`);
      console.log(`  Type:       ${cells[1]}`);
      console.log(`  Created On:       ${cells[2]}`);
      console.log(`  Created by: ${cells[3]}`);
      console.log('');
    }

       
  }
  catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  }
})


test("Priorities - Delete", async ({ page }) => {
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
    
    // Step 5: Click on Setup menu
    await page.locator('div').filter({ hasText: /^Setup$/ }).first().click();
    await page.waitForTimeout(3000);

    // Step 6: Click on Priority link
    await page.getByRole('link', { name: 'Priorities' }).click();
    await page.waitForURL('**/enquiry/setup/priority');
    console.log('Priority page loaded successfully');
    await page.waitForTimeout(3000);

    // Click delete icon of the first row in the table to delete the priority
    await page.locator('table tbody tr').first().locator('img[alt="Delete"]').click();
    console.log('Delete Priority form opened successfully');

    // Click on confirm button in the confirmation popup to confirm the deletion
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForTimeout(3000);
    console.log('Priority deleted successfully');

     // Get all rows
    await page.waitForSelector('table tbody tr', { state: 'visible' });
    const rows = await page.locator('table tbody tr').all();
    console.log('Total Entries:', rows.length);
    console.log('\n');
    
    // Print each row
    for (let i = 0; i < rows.length; i++) {
      const cells = await rows[i].locator('td').allInnerTexts();
      
      console.log(`Entry ${i + 1}:`);
      console.log(`  Name:       ${cells[0]}`);
      console.log(`  Type:       ${cells[1]}`);
      console.log(`  Created On:       ${cells[2]}`);
      console.log(`  Created by: ${cells[3]}`);
      console.log('');
    }

       
  }
  catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  }
})





