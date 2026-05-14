const {test,expect}=require('playwright/test');
test('Vendor ',async({page})=>
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
    await page.click('text=Master');
    await page.waitForTimeout(500);
    console.log("Master Menu clicked successfully");

    // Click Client master 

    await page.getByRole('link', { name: 'Vendor' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Vendor Menu clicked successfully ');
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
