const {test,expect}=require('playwright/test');
test('Item Master - View page ',async({page})=>
{
try{
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
    await page.click('text=Items');
    await page.waitForTimeout(500);
    console.log("Items Menu clicked successfully");

    // Click Client master 

    await page.getByRole('link', { name: 'Item Master' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Item master  Menu clicked successfully ');
    await page.waitForTimeout(3000);

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
  } 
});

test('Item Master - Add page ',async({page})=>
{
try{
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
    // Click on Items  menu
    await page.click('text=Items');
    await page.waitForTimeout(500);
    console.log("Items Menu clicked successfully");

    // Click Item master Menu 

    await page.getByRole('link', { name: 'Item Master' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Item master  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click new item page 

    await page.getByRole('button', { name: 'New Item' }).click();

    // Enter the item name 
    const uniqueId = Date.now();

    await page.locator('input[name="itemName"]').fill(`Anode_Item_${uniqueId}`);


 // For Type 

await page.getByLabel('Type').click();
await page.locator('div.searchDropDownPagination_suggestion_item__PSEfn >> text=Item').click();
await page.waitForTimeout(3000);
// For Item category 

await page.locator('div.searchableDrillDropdown_trigger__oEqTU').click();
await page.locator('div.searchableDrillDropdown_rowContent__A4KT0').filter({ hasText: 'Pumpcompr_1770703521048' }).first().click();
// select the Unit of measure
await page.locator('input[placeholder="Unit of Measure"]').click();
await page.locator('span', { hasText: 'Acre ( acre )' }).click({ force: true });

//Enter the description 

await page.locator('textarea[name="description"]').fill(`Item master created_${uniqueId}`);
    
// Click save option 
await page.getByRole('button', { name: 'Save' }).click();

//Click Confirm Option 
await page.getByRole('button', { name: 'Confirm' }).click();


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
  } 
});


test('Item Master - Edit  ',async({page})=>
{
try{
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
    // Click on Items  menu
    await page.click('text=Items');
    await page.waitForTimeout(500);
    console.log("Items Menu clicked successfully");

    // Click Item master Menu 

    await page.getByRole('link', { name: 'Item Master' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Item master  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click the first item in list page 
    const firstCell = page.locator('table tbody tr').first().locator('td').first();
    await firstCell.click();
    console.log('✓ Opened item details');
    await page.waitForTimeout(3000);
    // Click Edit
    await page.getByRole('button', { name: 'Edit' }).click();
     console.log('✓ Entered edit mode');
    await page.waitForTimeout(3000);
    //Update the Item name 
    const uniqueId = Date.now();

    await page.locator('input[name="itemName"]').fill(`Anode_Item_${uniqueId}`);
   
    // Enter the description 

await page.locator('textarea[name="description"]').fill(`Item master created_${uniqueId}`);   

    // Click save option 
    await page.getByRole('button', { name: 'Save' }).click();

    // Click Confirm 

    await page.getByRole('button', { name: 'Confirm' }).click();
   
}
    
   catch (error) {
    console.error('Error:', error);
  } 
});

test('Item Master - Delete ',async({page})=>
{
try{
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
    // Click on Items  menu
    await page.click('text=Items');
    await page.waitForTimeout(500);
    console.log("Items Menu clicked successfully");

    // Click Item master Menu 

    await page.getByRole('link', { name: 'Item Master' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Item master  Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Delete first item
    const firstRowActionButton = await page.locator('table tbody tr').first().locator('button').last();
    await firstRowActionButton.click();
    
    // Confirm deletion
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(3000);
    

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
  } 
});