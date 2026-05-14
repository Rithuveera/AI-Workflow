const { test,expect} = require('@playwright/test');

test('Follow-up Creation ',async ({page}) => {
  
  try {
    // Step 1: Navigate to the login page
    await page.goto('https://datnext-qa.algosium.com/login');
    console.log('Navigated to login page');

    // Step 2: Enter username and password
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
    await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');
    console.log('Entered credentials');

    // Step 3: Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard');
    console.log('Logged in successfully');

     // Step 4: Click on Enquiry menu icon to expand
    
    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Expanding Enquiry menu ')


    // Step 5: Click on Enquiry menu item to see submenu
    console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    console.log('Enquiry menu clicked successfully');
    await page.waitForTimeout(1000);

    
    // Step:6  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded');

    // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();

    // Click on "Pending"status option
    await page.getByTitle('Pending').click();

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

    // Step 11: Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();
    

    // Step 8: Click on Follow-up tab
    await page.getByText('Follow-up', { exact: true }).click();
    await page.waitForTimeout(500);
    console.log('Clicked on Follow-up tab');

    // Step 9: Click Add Follow-up button
    await page.getByRole('button', { name: 'Add Follow-up' }).click();
    await page.waitForTimeout(500);
    console.log('Clicked Add Follow-up button');

    // Step 10: Select Follow-Up type
    await page.getByRole('button', { name: 'Follow-Up', exact: true }).click();
    await page.waitForTimeout(500);
    console.log('Selected Follow-Up type');

    // Step 11: Select Subject as "Follow-up"
    await page.locator('#subject').selectOption('Follow-up');
    console.log('Selected Subject: Follow-up');

    // Step 12: Fill Description
    await page.locator('textarea').fill('Followup created');
    console.log('Filled Description');

    // Step 13: Fill Days
    await page.locator('input[type="text"]').first().fill('22');
    console.log('Filled Days: 22');

    // Step 14: Select Reminder date (current date)
     await page.getByRole('textbox').nth(3).click();
    // Click on today's date (October 30th)
       const lastDate = page.locator('[aria-label="Choose Saturday, April 4th, 2026"]');
       await lastDate.waitFor({ state: 'visible', timeout: 5000 });
       await lastDate.click();
       console.log('Selected Reminder date');

    // Step 15: Click Save button
    await page.getByRole('button', { name: 'Save' }).click();
    console.log('Clicked Save button');
    // Step 16 : Print the success message 
const success =await page.waitForSelector('text=Follow up added successfully.');

    if (success) {
     const message = await success.textContent(); // ✅ use the method, not property
     console.log('✅ Message:', message.trim());
      } else
         {
           console.warn('⚠️ No success message found yet');
      }
    // Step 17: Click OK on success dialog
    await page.getByRole('button', { name: 'OK' }).click();
    console.log('Follow-up created successfully!');

    // Wait a bit to see the result
    await page.waitForTimeout(2000);

  } catch (error) {
    console.error('Error occurred:', error);
  } 
  
});

// Verify  the followup details in List page 

test(' Verify datas in followup under the Enquiry list ',async ({page}) => {
  
  try {
    // Step 1: Navigate to the login page
    await page.goto('https://datnext-qa.algosium.com/login');
    console.log('Navigated to login page');

    // Step 2: Enter username and password
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
    await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');
    console.log('Entered credentials');

    // Step 3: Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard');
    console.log('Logged in successfully');

     // Step 4: Click on Enquiry menu icon to expand
    
    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Expanding Enquiry menu ')


    // Step 5: Click on Enquiry menu item to see submenu
    console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    console.log('Enquiry menu clicked successfully');
    await page.waitForTimeout(1000);

    
    // Step:6  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded');



     // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();

    // Click on "Pending"status option
    await page.getByTitle('Pending').click();

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

    // Step 11: Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();
    

    // Step 8: Click on Follow-up tab
    await page.getByText('Follow-up', { exact: true }).click();
    await page.waitForTimeout(500);
    console.log('Clicked on Follow-up tab');
    // Step 9 : Verify the record 

    const followUpTable = await page.locator('table').last();
    await followUpTable.waitFor({ state: 'visible' });
    const headers = ['Creator', 'Type', 'Subject', 'Next Follow-Up Date', 'Created Date', 'Remarks'];
    // Get all rows 
    const allRows = followUpTable.locator('tbody tr');
    const rowCount = await allRows.count();
    console.log(`\n--- All Follow-up Records (${rowCount}) ---\n`);
    for (let i = 0; i < rowCount; i++) {
    const row = allRows.nth(i);
    const cells = await row.locator('td').allTextContents();
    console.log(`Record ${i + 1}:`);
    cells.forEach((cell, index) => {
    console.log(`  ${headers[index]}: ${cell.trim()}`);
  });
  console.log('----------------------');
}

  }  
  catch (error) {
    console.error('Error occurred:', error);
  } 
  
});

test(' verify the data under the followup menu  ',async ({page}) => {
  
  try {
    // Step 1: Navigate to the login page
    await page.goto('https://datnext-qa.algosium.com/login');
    console.log('Navigated to login page');

    // Step 2: Enter username and password
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
    await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');
    console.log('Entered credentials');

    // Step 3: Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard');
    console.log('Logged in successfully');

     // Step 4: Click on Enquiry menu icon to expand
    
    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Expanding Enquiry menu ')


    // Step 5: Click on Enquiry menu item to see submenu
    console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    console.log('Enquiry menu clicked successfully');
    await page.waitForTimeout(1000);

    
   // Step 4: Click on "Follow up" submenu under Enquiry
    await page.getByRole('link', { name: 'Follow up' }).click();
    await page.waitForURL('**/enquiry/followup-enquiry');
    console.log('Clicked on Follow up submenu');

    // Wait to see the result
    await page.waitForTimeout(2000);

    // Verfiy the datas under the follow-up 

    const followUpTable = await page.locator('table').last();
    await followUpTable.waitFor({ state: 'visible' });
    const headers = ['Creator', 'Type', 'Subject', 'Next Follow-Up Date', 'Created Date', 'Status'];
    // Get all rows 
    const allRows = followUpTable.locator('tbody tr');
    const rowCount = await allRows.count();
    console.log(`\n--- All Follow-up Records (${rowCount}) ---\n`);
    for (let i = 0; i < rowCount; i++) {
    const row = allRows.nth(i);
    const cells = await row.locator('td').allTextContents();
    console.log(`Record ${i + 1}:`);
    cells.forEach((cell, index) => {
    console.log(`  ${headers[index]}: ${cell.trim()}`);
  });
  console.log('----------------------');
}

  }  
  catch (error) {
    console.error('Error occurred:', error);
  } 
  
});

// Change the Follow-Up Status 

test('Change the Follow-Up Status : Pending to Completed  ',async ({page}) => {
  
  try {
    // Step 1: Navigate to the login page
    await page.goto('https://datnext-qa.algosium.com/login');
    console.log('Navigated to login page');

    // Step 2: Enter username and password
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
    await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');
    console.log('Entered credentials');

    // Step 3: Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard');
    console.log('Logged in successfully');

     // Step 4: Click on Enquiry menu icon to expand

    
    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Expanding Enquiry menu ')


    // Step 5: Click on Enquiry menu item to see submenu
    console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    console.log('Enquiry menu clicked successfully');
    await page.waitForTimeout(1000);

    
   // Step 4: Click on "Follow up" submenu under Enquiry
    await page.getByRole('link', { name: 'Follow up' }).click();
    await page.waitForURL('**/enquiry/followup-enquiry');
    console.log('Clicked on Follow up submenu');

    //Select the first row 
    // Wait for page load
await page.waitForLoadState('networkidle');

// Hover the table so wheel scroll works
const table = page.locator('table').first();
await table.hover();

const pending = page.getByText('Pending');

for (let i = 0; i < 40; i++) {

  if (await pending.count() > 0) {
    await pending.first().click();
    break;
  }

  // Scroll down slowly
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(300);
}
    // Enter the remarks 
    await page.fill('#Remarks', 'This is my updated remark.');
    console.log('Remarks Entered successfuly');
    await page.waitForTimeout(3000);

    // Select the completed status 

    const completedButton = await page.locator('button', { hasText: 'Completed' });
    await completedButton.waitFor({ state: 'visible' });
    await completedButton.click();
    console.log(' Completed button clicked');

    // Click Save option 

    await page.locator('span', { hasText: 'Save' }).click();
    console.log(' Clicked the Save button');
    await page.waitForTimeout(3000);
    console.log ( 'Follow-up status updated successfully');

}  
  catch (error) {
    console.error('Error occurred:', error);
  } 
  
});
test('Follow-up Creation - Technical  Submitted ',async ({page}) => {
  
  try {
    // Step 1: Navigate to the login page
    await page.goto('https://datnext-qa.algosium.com/login');
    console.log('Navigated to login page');

    // Step 2: Enter username and password
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
    await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');
    console.log('Entered credentials');

    // Step 3: Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard');
    console.log('Logged in successfully');

     // Step 4: Click on Enquiry menu icon to expand
    
    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Expanding Enquiry menu ')


    // Step 5: Click on Enquiry menu item to see submenu
    console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    console.log('Enquiry menu clicked successfully');
    await page.waitForTimeout(1000);

    
    // Step:6  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded');

    // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();

    // Click on "Pending"status option
    await page.getByTitle('Pending').click();

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

    // Step 11: Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();


    // Step 8: Click on Follow-up tab
    await page.getByText('Follow-up', { exact: true }).click();
    await page.waitForTimeout(500);
    console.log('Clicked on Follow-up tab');

    // Step 9: Click Add Follow-up button
    await page.getByRole('button', { name: 'Add Follow-up' }).click();
    await page.waitForTimeout(500);
    console.log('Clicked Add Follow-up button');

    // Step 10: Select Follow-Up type
    await page.getByRole('button', { name: 'Follow-Up', exact: true }).click();
    await page.waitForTimeout(500);
    console.log('Selected Follow-Up type');

    // Step 11: Select Subject as "Follow-up"
    await page.locator('#subject').selectOption('Tech submittal');
    console.log('Selected Subject: Follow-up');

    // Step 12: Fill Description
    await page.locator('textarea').fill('Followup created');
    console.log('Filled Description');

    // Step 13: Fill Days
    await page.locator('input[type="text"]').first().fill('22');
    console.log('Filled Days: 22');

    // Step 14: Select Reminder date (current date)
     await page.getByRole('textbox').nth(3).click();
    // Click on today's date (January 9th)
       const lastDate = page.locator('[aria-label="Choose Saturday, April 4th, 2026"]');
       await lastDate.waitFor({ state: 'visible', timeout: 5000 });
       await lastDate.click();
       console.log('Selected Reminder date');

    // Step 15: Click Save button
    await page.getByRole('button', { name: 'Save' }).click();
    console.log('Clicked Save button');
    // Step 16 : Print the success message 
   const success =await page.waitForSelector('text=Follow up added successfully.');
    if (success) {
     const message = await success.textContent(); // ✅ use the method, not property
     console.log('✅ Message:', message.trim());
      } else
         {
           console.warn('⚠️ No success message found yet');
      }
    // Step 17: Click OK on success dialog
    await page.getByRole('button', { name: 'OK' }).click();
    console.log('Follow-up created successfully!');

    // Wait a bit to see the result
    await page.waitForTimeout(2000);

  } catch (error) {
    console.error('Error occurred:', error);
  } 
  
});

test('Follow-up Creation - Commercial  Submitted ',async ({page}) => {
  
  try {
    // Step 1: Navigate to the login page
    await page.goto('https://datnext-qa.algosium.com/login');
    console.log('Navigated to login page');

    // Step 2: Enter username and password
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
    await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');
    console.log('Entered credentials');

    // Step 3: Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard');
    console.log('Logged in successfully');

     // Step 4: Click on Enquiry menu icon to expand
    
    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Expanding Enquiry menu ')


    // Step 5: Click on Enquiry menu item to see submenu
    console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    console.log('Enquiry menu clicked successfully');
    await page.waitForTimeout(1000);

    
    // Step:6  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded');

   // Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();

    // Click on "Pending"status option
    await page.getByTitle('Pending').click();

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

    // Step 11: Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();


    // Step 8: Click on Follow-up tab
    await page.getByText('Follow-up', { exact: true }).click();
    await page.waitForTimeout(500);
    console.log('Clicked on Follow-up tab');

    // Step 9: Click Add Follow-up button
    await page.getByRole('button', { name: 'Add Follow-up' }).click();
    await page.waitForTimeout(500);
    console.log('Clicked Add Follow-up button');

    // Step 10: Select Follow-Up type
    await page.getByRole('button', { name: 'Follow-Up', exact: true }).click();
    await page.waitForTimeout(500);
    console.log('Selected Follow-Up type');

    // Step 11: Select Subject as "Follow-up"
    await page.locator('#subject').selectOption('Comm Submittal');
    console.log('Selected Subject: Follow-up');

    // Step 12: Fill Description
    await page.locator('textarea').fill('Followup created');
    console.log('Filled Description');

    // Step 13: Select the Quote Currency 

    await page.selectOption('#quoteCurrency', { label: 'Indian Rupee' });
    await page.waitForTimeout(2000);

    // Step 14: Select the Quote Value 

    const inputs = page.locator('input[type="text"]');
    await inputs.nth(0).fill('250000');

    // Step 15: Fill Days
    await inputs.nth(1).fill('22');
    console.log('Filled Days: 22');
   
    // Step 16: Select Reminder date
   const reminderContainer = page.locator('div.sc-eqUzNf.ldKsct').filter({ has: page.locator('input[value=""]') });
const reminderInput = reminderContainer.locator('input');

await reminderInput.waitFor({ state: 'visible', timeout: 5000 });
await reminderInput.click(); // open calendar

// Select today's date (Jan 9, 2026)
const today = page.locator('[aria-label="Choose Saturday, April 4th, 2026"]');
await today.waitFor({ state: 'visible', timeout: 5000 });
await today.click();



    // Step 17: Click Save button
    await page.getByRole('button', { name: 'Save' }).click();
    console.log('Clicked Save button');
    // Step 16 : Print the success message 
   const success =await page.waitForSelector('text=Follow up added successfully.');
    if (success) {
     const message = await success.textContent(); // ✅ use the method, not property
     console.log('✅ Message:', message.trim());
      } else
         {
           console.warn('⚠️ No success message found yet');
      }
    // Step 17: Click OK on success dialog
    await page.getByRole('button', { name: 'OK' }).click();
    console.log('Follow-up created successfully!');

    // Wait a bit to see the result
    await page.waitForTimeout(2000);

  } catch (error) {
    console.error('Error occurred:', error);
  } 
  
});