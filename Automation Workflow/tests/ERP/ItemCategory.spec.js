const {test,expect}=require('playwright/test');
test('Item category  - View page ',async({page})=>
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

    await page.getByRole('link', { name: 'Item Category' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Item Category  Menu clicked successfully ');
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

test('Item category  - Add  page ',async({page})=>
{
try{

  const uniqueValue = `Pumpcompr_${Date.now()}`;
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

    // Click Item Category  master 

    await page.getByRole('link', { name: 'Item Category' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Item Category  Menu clicked successfully ');
    await page.waitForTimeout(3000);

  // Click Add Parent category 

   await page.getByRole('button', { name: 'Add Parent Category' }).click();
   await page.waitForTimeout(3000);

  // Enter the name 
   await page.getByPlaceholder('Enter the name').fill(uniqueValue);
   await page.getByPlaceholder('Enter the description').fill(`${uniqueValue}_Desc`);

  // Click Save option   
  await page.getByRole('button', { name: 'Save' }).click();

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





test('Item category  - Edit ',async({page})=>
{
try{
    const uniqueValue = `Pumpcompr_${Date.now()}`;
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

    // Click Item Category  master 

    await page.getByRole('link', { name: 'Item Category' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Item Category  Menu clicked successfully ');
    await page.waitForTimeout(3000);

  // Wait for table to load
    await page.waitForSelector('table tbody tr', { timeout: 5000 });
    
    // Get first row
    const firstRow = page.locator('table tbody tr').first();
    const categoryName = await firstRow.locator('td').first().textContent();
    console.log(`Editing category: ${categoryName.trim()}`);
    
    // Click edit icon using the class name
    await firstRow.locator('.inifiniteScroll_table_editIcon__c_jna').click();
    
    console.log('✓ Edit icon clicked successfully!');
    
    await page.waitForTimeout(3000);
    

//Change the category name 
// Locate the input using class
const inputField = page.locator('input.addEnquiry_input__jqFGq');

// Clear the existing value and fill a new one
await inputField.fill(uniqueValue);


const saveIcon = firstRow.locator('img[src="/icons/save.svg"]');
await saveIcon.click();

  const rows1 = page.locator('table tbody tr');
  const rowCount1 = await rows1.count();

  for (let i = 0; i < rowCount1; i++) {
    const row = rows1.nth(i);
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
