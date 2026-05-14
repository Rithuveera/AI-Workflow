const {test,expect}=require('playwright/test');
import { faker } from '@faker-js/faker';

test('Setup-Log Category Creation ',async({page})=>
{
try{
const code = faker.string.alphanumeric(5).toUpperCase();  
const categoryName = faker.commerce.productName();
const scope = faker.lorem.sentence(8);


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

    // Step 3: Click on Enquiry menu icon to expand 
    
    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Expanding Enquiry menu ')


    // Step 4: Click on Enquiry menu item to see submenu

        console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    console.log('Enquiry menu clicked successfully');
    await page.waitForTimeout(1000);
 
   
    // Step 5: Click on Setup menu
    await page.locator('div').filter({ hasText: /^Setup$/ }).first().click();
    
    // Step 6: Click on Log Category link
    await page.getByRole('link', { name: 'Log Category' }).click();
    
    // Step 7: Wait for Log Category page to load
    await page.waitForURL('**/enquiry/setup/logCategory');
    
    // Step 8: Click Add button to open the dialog
    await page.getByRole('button', { name: 'logo' }).nth(1).click();
    
    // Step 9: Fill in Code field

   // Wait and fill Code field
    await page.locator('#code').waitFor({ state: 'visible' });
    await page.locator('#code').fill(code);
    console.log('Entered code is:', code);

    // Wait and fill Category Name field
    await page.locator('#name').waitFor({ state: 'visible' });
    await page.locator('#name').fill(categoryName);
    console.log('Entered Category name is:', categoryName);
    
    
    // Step 11: Fill in Scope field
    await page.getByRole('textbox').nth(2).fill(scope);
    console.log('Entered scope is:',scope);
    
    // Step 12: Click Add button in Scope section to add the scope
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Step 13: Click Save button in dialog header to submit the form
    await page.locator('h2').getByRole('button').click();
    
    // Step 14: Wait for success message
     const toast = await page.waitForSelector('.Toastify__toast', { timeout: 5000 });
    // Get the toast text
     const toastMessage = await toast.textContent();
     console.log('Confirmation message:', toastMessage);
     await page.waitForTimeout(3000);
       
    // Optional: Take a screenshot of the result
    await page.screenshot({ path: 'log-category-created.png', fullPage: true });
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'C:/Users/veeramani/Desktop/playwright-mcp/screenshots/Setup-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  } 
});

test('Setup-Log category list',async({page})=>
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

    // Step 3: Click on Enquiry menu icon to expand
    
    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Expanding Enquiry menu ')


    // Step 4: Click on Enquiry menu item to see submenu

        console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    console.log('Enquiry menu clicked successfully');
    await page.waitForTimeout(1000);
 
   
    // Step 5: Click on Setup menu
    await page.locator('div').filter({ hasText: /^Setup$/ }).first().click();
    
    // Step 6: Click on Log Category link
    await page.getByRole('link', { name: 'Log Category' }).click();
    
    // Step 7: Wait for Log Category page to load
    await page.waitForURL('**/enquiry/setup/logCategory');
    
    
    // Get all rows
    await page.waitForSelector('table tbody tr', { state: 'visible' });
    const rows = await page.locator('table tbody tr').all();
    console.log('Total Entries:', rows.length);
    console.log('\n');
    
    // Print each row
    for (let i = 0; i < rows.length; i++) {
      const cells = await rows[i].locator('td').allInnerTexts();
      
      console.log(`Entry ${i + 1}:`);
      console.log(`  S.No:       ${cells[0]}`);
      console.log(`  Code:       ${cells[1]}`);
      console.log(`  Name:       ${cells[2]}`);
      console.log(`  Created At: ${cells[3]}`);
      console.log('');
    }
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'C:/Users/veeramani/Desktop/playwright-mcp/screenshots/Setup-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  } 
});


test('Setup-Already mapped Log category Deleted ',async({page})=>
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

    // Step 3: Click on Enquiry menu icon to expand
    
    console.log('Step 4: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);
    console.log('Expanding Enquiry menu ')


    // Step 4: Click on Enquiry menu item to see submenu

        console.log('Step 5: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    console.log('Enquiry menu clicked successfully');
    await page.waitForTimeout(1000);
 
   
    // Step 5: Click on Setup menu
    await page.locator('div').filter({ hasText: /^Setup$/ }).first().click();
    
    // Step 6: Click on Log Category link
    await page.getByRole('link', { name: 'Log Category' }).click();
    
    // Step 7: Wait for Log Category page to load
    await page.waitForURL('**/enquiry/setup/logCategory');
    
    
    // Get all rows
    await page.waitForSelector('table tbody tr', { state: 'visible' });
    const rows = await page.locator('table tbody tr').all();
    console.log('Total Entries:', rows.length);
    console.log('\n');

    // click Search element 
     await page.click('span[tabindex="0"][style*="cursor: pointer"]');
     console.log('Search option clicked ');
       await page.waitForTimeout(2000);

    // Enter the value in search box

    await page.fill('input[placeholder="Search..."]', 'CI' );
    await page.waitForTimeout(3000);

     // 3. Wait for the search results to appear
    await page.waitForSelector('li.common_cursorPointer__h6CYz');

    // 4. Click the first search result
    await page.click('li.common_cursorPointer__h6CYz >> nth=0');
    await page.waitForTimeout(2000);

    // Click delete option against the log category  
    await page.click('button.action-button-menu');

    const toast = await page.waitForSelector('.Toastify__toast', { timeout: 5000 });

    // Get the toast text
    const toastMessage = await toast.textContent();
    console.log('Message:', toastMessage);
      
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'C:/Users/veeramani/Desktop/playwright-mcp/screenshots/Setup-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  } 
});

