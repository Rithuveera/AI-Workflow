const {test,expect}=require('@playwright/test')
  test("Enquiry status - Awarded ",async({page})=>
  {
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

// Step 2: Click on Enquiry menu icon to expand
    
    console.log('Step 2: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);

    // Step 3: Click on Enquiry menu item to see submenu
    console.log('Step 3: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    await page.waitForTimeout(1000);

// Step 4: Click on Internal Enquiry (first link in the Enquiry submenu)
await page.getByRole('link').nth(1).click();

// Step 5: Wait for enquiry list page to load
await page.waitForURL('**/enquiry/list');

// Step 6: Click on Advanced Search button
await page.getByRole('button', { name: 'Advanced Search' }).click();

// Step 7: Click on Status filter to expand it
await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();

// Step 8: Click on "In Process" status option
await page.getByTitle('In Process').click();

// Step 9: Click Apply button to apply the filter
await page.getByRole('button', { name: 'Apply' }).click();

// Step 10: Wait for filtered results to load
await page.waitForTimeout(1000);

// Step 11: Click on the first enquiry in the list
await page.locator('table tbody tr').first().click();

// Step 12: Wait for enquiry detail page to load
await page.waitForURL('**/enquiry/view/**');
await page.waitForTimeout(3000);
// Step 13: Click on Closing button
await page.getByRole('button', { name: 'Closing' }).click();

// Step 13: Select "Awarded" from the Enquiry Status dropdown
await page.locator('#statuscheck').selectOption('Awarded');
console.log('Status changed from "In Process" to "Awarded" successfully!');

// Step 14: Wait for the form to update with new fields
await page.waitForTimeout(1000);

//Step 15 : Enter the remarks 
await page.fill('#remarks', 'Change the staus in Process to awarded');

//Step 16 :  Enter the PO value 
await page.fill('#poValue', '10000');

// Step 17 : Select the PO currency 
await page.selectOption('#qu', { label: 'INR ( Indian Rupee )' });

// Step 18 : Select the project manager as 

await page.selectOption('#projectManager', { label: 'Veeramani' });

// Step 19 :Enter the Quote Value 
await page.fill('#quoteValue', '10000');
await page.waitForTimeout(3000);
// Step 20  : Select the Quoted currency 
await page.selectOption('#quoteCurrency', { label: 'INR ( Indian Rupee )' });
// Step 21 : Click save option 

await page.getByRole('button', { name: 'Save' }).click();

// Success message 
const toastLocator = page.locator('h2.MuiDialogTitle-root');
await toastLocator.waitFor({ state: 'visible', timeout: 5000 });

// Get the text dynamically
const toastMessage = await toastLocator.textContent();
console.log('Success Message:', toastMessage?.trim());

// Locate the toast message
const toastLocator1 = page.locator('div.MuiDialogContent-root');

// Wait until it is visible (timeout optional)
await toastLocator1.waitFor({ state: 'visible', timeout: 5000 });

// Get the message text
const toastMessage1 = await toastLocator1.textContent();
console.log('success Message:', toastMessage1?.trim());
await page.waitForTimeout (3000);

  }
   catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  } 
  });