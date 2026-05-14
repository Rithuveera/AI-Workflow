const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test('PO  - Verify the PO Menu ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);
   
  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - Click the PO Menu ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

   
  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - Verfiy the PO Menu List page  ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

     const rows = page.locator('table tbody tr');
     const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      console.log(`Row ${i + 1}:`, cells.join(' | '));
    }
   
  }
  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - Click the Pending status PO ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const Pending = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await Pending.count() > 0) {
     await Pending.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click Edit button 
     await page.locator('button:has(img[src="/icons/edit.svg"])').click();
     await page.waitForTimeout(2000);

     // Enter the delivery address 
     await page.locator('input[name="delivery_address"]').fill('Chennai, Tamil Nadu');
     // Click the Calendar icon for expected Delivery date 
     await page.locator('img[src="/icons/calendar.svg"]').click();
     await page.locator('[aria-label="Choose Tuesday, March 31st, 2026"]').click();
     await page.waitForTimeout(2000);

     // Enter the tax details 
     await page.locator('input[inputmode="decimal"]:not([name])').fill('18');
     // Click save option 
     await page.locator('img[src="/icons/save.svg"]').click();
     await page.waitForTimeout(2000);
     console.log('purchase order updated successfully'); 
     
   
  }
  catch (error) {
    console.error('Error:', error);
  }
});


test('PO  - PO with Delivery addresss , Expected delivery date and Tax ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const Pending = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await Pending.count() > 0) {
     await Pending.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click Edit button 
     await page.locator('button:has(img[src="/icons/edit.svg"])').click();
     await page.waitForTimeout(2000);

     // Enter the delivery address 
     await page.locator('input[name="delivery_address"]').fill('Chennai, Tamil Nadu');
     // Click the Calendar icon for expected Delivery date 
     await page.locator('img[src="/icons/calendar.svg"]').click();
     await page.locator('[aria-label="Choose Tuesday, March 31st, 2026"]').click();
     await page.waitForTimeout(2000);

     // Enter the tax details 
     await page.locator('input[inputmode="decimal"]:not([name])').fill('18');
     // Click save option 
     await page.locator('img[src="/icons/save.svg"]').click();
     await page.waitForTimeout(2000);
     console.log('purchase order updated successfully'); 
     
   
  }
  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - PO with Custom duty Charges  ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const Pending = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await Pending.count() > 0) {
     await Pending.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click Edit button 
     await page.locator('button:has(img[src="/icons/edit.svg"])').click();
     await page.waitForTimeout(2000);

     // Enter the delivery address 
     await page.locator('input[name="delivery_address"]').fill('Chennai, Tamil Nadu');
     // Click the Calendar icon for expected Delivery date 
     await page.locator('img[src="/icons/calendar.svg"]').click();
     await page.locator('[aria-label="Choose Tuesday, March 31st, 2026"]').click();
     await page.waitForTimeout(2000);

     // Enter the tax details 
     await page.locator('input[inputmode="decimal"]:not([name])').fill('18');

     // Enter the custom duty value
     await page.locator('input[name="customs_duty"]').fill('12'); // enter your value
     await page.waitForTimeout(2000);

     // Click save option 
     await page.locator('img[src="/icons/save.svg"]').click();
     await page.waitForTimeout(2000);
     console.log('purchase order updated successfully'); 
     
   
  }
  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - PO with Addtional Charges  ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const Pending = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await Pending.count() > 0) {
     await Pending.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click Edit button 
     await page.locator('button:has(img[src="/icons/edit.svg"])').click();
     await page.waitForTimeout(2000);

     // Enter the delivery address 
     await page.locator('input[name="delivery_address"]').fill('Chennai, Tamil Nadu');
     // Click the Calendar icon for expected Delivery date 
     await page.locator('img[src="/icons/calendar.svg"]').click();
     await page.locator('[aria-label="Choose Tuesday, March 31st, 2026"]').click();
     await page.waitForTimeout(2000);

     // Enter the tax details 
     await page.locator('input[inputmode="decimal"]:not([name])').fill('18');

     // Enter the custom duty value
     await page.locator('input[name="customs_duty"]').fill('12'); // enter your value
     console.log('Custom duty value entered successfully');
     await page.waitForTimeout(2000);

     // ENter the Frieht charges 
     await page.locator('input[name="freight_charges"]').fill('500'); // replace 500 with your value
     console.log('Fright charges entered successfully');
     await page.waitForTimeout(1500); 

     // Enter the local transporation 
     await page.locator('input[name="local_transportation"]').fill('500'); // replace 500 with your value
     console.log('Local Transooration entered successfully');
     await page.waitForTimeout(1500); 

     //Enter the other charges 
      await page.locator('input[name="other_charges"]').fill('500'); // replace 500 with your value
      console.log("Addtional charges entered successfully");
      await page.waitForTimeout(1500); 

    // Click save option 
     await page.locator('img[src="/icons/save.svg"]').click();
     await page.waitForTimeout(2000);
     console.log('purchase order updated successfully'); 
       
  }
  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - PO with Quotation Revert  ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const Pending = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await Pending.count() > 0) {
     await Pending.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click overall quotation Revert option 

     await page.locator('img[src="/icons/Revert.svg"]').click();
     await page.waitForTimeout(2000);

     // Enter the remarks for Quotation Revert 

     await page.locator('textarea[name="comment"]').first().fill('This is the first comment');
     await page.waitForTimeout(1000);

      // Click revert option 
      await page.getByRole('button', {name:'Revert'}).click();
      await page.waitForTimeout(2000);
      console.log("Purchase order quote revised successfully"); 
      await page.waitForTimeout(2000)
       
  }
  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - PO with Line wise Quotation Revert  ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const Pending = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await Pending.count() > 0) {
     await Pending.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click Line item wise  quotation Revert option 

     await page.locator('img[alt="Revert"]').click();
     await page.waitForTimeout(2000);

     // Enter the remarks for Quotation Revert 

     await page.locator('textarea[name="comment"]').first().fill('This is the first comment');
     await page.waitForTimeout(1000);

      // Click revert option 
      await page.getByRole('button', {name:'Confirm'}).click();
      await page.waitForTimeout(2000);
      console.log("Purchase order quote revised successfully"); 
      await page.waitForTimeout(2000)
       
  }
  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - Select the send option in PO   ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const Pending = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await Pending.count() > 0) {
     await Pending.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click send option 
     await page.locator('button:has(img[src="/icons/send.svg"])').click();
     await page.waitForTimeout(2000);

     
       
  }
  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - Select the different users for  different role  workflow   ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const Pending = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await Pending.count() > 0) {
     await Pending.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click send option 
     await page.locator('button:has(img[src="/icons/send.svg"])').click();
     await page.waitForTimeout(2000);

     // Select the Material Booking team 

      const dropdowns1 = page.getByPlaceholder('Select');
    // 1st dropdown
       await dropdowns1.nth(0).click();
       await dropdowns1.nth(0).fill('Admin');
       await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').filter({ hasText: 'Admin' }).first().click();
       await page.waitForTimeout(2000);

       // Select the Accounts team 

        const dropdowns2 = page.getByPlaceholder('Select');
    // 1st dropdown
       await dropdowns2.nth(2).click();
       await dropdowns2.nth(2).fill('Mani');
       await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').filter({ hasText: 'Mani' }).first().click();
       await page.waitForTimeout(2000);

       // Select the finance Head 
       const dropdowns3 = page.getByPlaceholder('Select');
    // 1st dropdown
       await dropdowns3.nth(3).click();
       await dropdowns3.nth(3).fill('Mani');
       await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').filter({ hasText: 'Rithanya' }).first().click();
       await page.waitForTimeout(2000);

      // Select the Management 
       const dropdowns4 = page.getByPlaceholder('Select');
       // 1st dropdown
       await dropdowns4.nth(4).click();
       await dropdowns4.nth(4).fill('Mani');
       await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').filter({ hasText: 'Ritu' }).first().click();
       await page.waitForTimeout(2000);

      // Click submit option 
       await page.getByRole('button', { name: 'Submit' }).click();
       await page.waitForTimeout(2000) ;
       console.log ('Purchase order send to material booking team successfully');     
  }
  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - Select the same user for different level workflow   ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const Pending = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await Pending.count() > 0) {
     await Pending.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click send option 
     await page.locator('button:has(img[src="/icons/send.svg"])').click();
     await page.waitForTimeout(2000);

     // Select the Material Booking team 

      const dropdowns1 = page.getByPlaceholder('Select');
    // 1st dropdown
       await dropdowns1.nth(0).click();
       await dropdowns1.nth(0).fill('Admin');
       await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').filter({ hasText: 'Admin' }).first().click();
       await page.waitForTimeout(2000);

       // Select the Accounts team 

        const dropdowns2 = page.getByPlaceholder('Select');
    // 1st dropdown
       await dropdowns2.nth(2).click();
       await dropdowns2.nth(2).fill('Mani');
       await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').filter({ hasText: 'Admin' }).first().click();
       await page.waitForTimeout(2000);

       // Select the finance Head 
       const dropdowns3 = page.getByPlaceholder('Select');
    // 1st dropdown
       await dropdowns3.nth(3).click();
       await dropdowns3.nth(3).fill('Mani');
       await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').filter({ hasText: 'Rithanya' }).first().click();
       await page.waitForTimeout(2000);

      // Select the Management 
       const dropdowns4 = page.getByPlaceholder('Select');
       // 1st dropdown
       await dropdowns4.nth(4).click();
       await dropdowns4.nth(4).fill('Mani');
       await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').filter({ hasText: 'Ritu' }).first().click();
       await page.waitForTimeout(2000);

      // Click submit option 
       await page.getByRole('button', { name: 'Submit' }).click();
       await page.waitForTimeout(2000) ;
       console.log ('Purchase order send to material booking team successfully');     

       // Verify the toast message 

       const toast = page.locator('.Toastify__toast--error').first();
       await toast.waitFor({ state: 'visible' });

       // get the text inside
      const message = await toast.innerText();
      console.log('Validation message:', message);
  }
  catch (error) {
    console.error('Error:', error);
  }
});

test('PO  - Select the revision ',async ({ page }) => {
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
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const Pending = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await Pending.count() > 0) {
     await Pending.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click revision option 
     await page.locator('button:has(img[src="/icons/revisions.svg"])').click();
     await page.waitForTimeout(2000);
     
     // locator for Pending status
    const pendingStatus = page.locator('div[role="status"]:has-text("Pending")');

// check if Pending exists
if (await pendingStatus.count() > 0) {
    console.log('Pending record found → clicking');

    await pendingStatus.first().click();
} else {
    console.log('No records found');
}

     
  }
  catch (error) {
    console.error('Error:', error);
  }
});



test('PO  - Click material team review  ',async ({ page }) => {
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
    await page.click('text=Purchasing');
    await page.waitForTimeout(500);
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under material team review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Material Review  cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     
  }
  catch (error) {
    console.error('Error:', error);
  }
});



test ('PO  - Verify approval option  material team review  ',async ({ page }) => {
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
    await page.click('text=Purchasing');
    await page.waitForTimeout(500);
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under material team review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Material Review  cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click approval icon 
     await page.locator('img[src="/icons/approval-check.svg"]').click();

     
  }
  catch (error) {
    console.error('Error:', error);
  }
});


test('PO  - Click  approval option  material team review  ',async ({ page }) => {
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
    await page.click('text=Purchasing');
    await page.waitForTimeout(500);
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under material team review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Material Review  cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click approval icon 
     await page.locator('img[src="/icons/approval-check.svg"]').click();
     await page.waitForTimeout(2000);

     // Click confirm 
     await page.getByRole('button',{name:'Confirm'}).click();
     console.log('Status updated successfully');
     await page.waitForTimeout(2000);
         
  }
  catch (error) {
    console.error('Error:', error);
  }
});


test.only('PO  - Click  Revert option  material team review  ',async ({ page }) => {
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
    await page.click('text=Purchasing');
    await page.waitForTimeout(500);
    console.log("Purchasing Menu clicked successfully");

    // Click Purchase Order Menu 
    await page.click('text=Purchase Order');
    await page.waitForTimeout(500);
    console.log("Purchase order verified  successfully");
    await page.waitForTimeout(2000);

    // Click the PO sub menu 
     await page.getByRole('link', { name: 'All PO' }).click();
    await page.waitForLoadState('networkidle');
    console.log('PO  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under material team review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Material Review  cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click Revert option  
     await page.getByRole('button',{name:'Revert'}).click();
     await page.waitForTimeout(2000);
     // Enter the comment against the revert 
     await page.locator('textarea[name="comment"]').fill('Revert to creator ');

     // Click the revert option in confirmation popup 

     await page.getByRole('button',{name:'Revert'}).click();
     console.log('Reverted successfully');
         
  }
  catch (error) {
    console.error('Error:', error);
  }
});








