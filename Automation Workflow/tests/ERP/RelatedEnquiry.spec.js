const { test,expect} = require('@playwright/test');
test('Related Enquiry ',async ({page}) => {
  
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

    // Step 8 : Click on Advanced Search button
    await page.getByRole('button', { name: 'Advanced Search' }).click();

    // Click on Status filter to expand it
    await page.locator('div').filter({ hasText: /^Status$/ }).nth(1).click();

    // Click on "Pending"status option
    await page.getByTitle('Awarded').click();

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();

    // Click Related Enquiry 

    await page.getByRole('button', { name: 'Related Enquires' }).click();
    await page.waitForTimeout(3000);

    // Print the elements in related enquiries page 
    
    // --- 1️⃣ Extract all label-value pairs from the info section ---
const infoRows = page.locator('.relativeEnq_infoItem__6GpuU');
const infoCount = await infoRows.count();

console.log('--- Info Section ---');
for (let i = 0; i < infoCount; i++) {
  const label = await infoRows.nth(i).locator('.relativeEnq_label__NfdZQ').textContent();
  const value = await infoRows.nth(i).locator('.relativeEnq_value__2r9zO').textContent();

  // Verify visibility
  await expect(infoRows.nth(i)).toBeVisible();

  console.log(`${label?.trim()}: ${value?.trim()}`);
}

// --- 2️⃣ Extract all contractor enquiry rows from table ---
const contractorGroups = page.locator('.relativeEnq_contractorGroup__Uat18');
const groupCount = await contractorGroups.count();

console.log('--- Contractor Enquiry Table ---');
for (let i = 0; i < groupCount; i++) {
  const contractorName = await contractorGroups.nth(i)
    .locator('.relativeEnq_contractorName__e_4AO')
    .textContent();
  
  console.log(`\nContractor: ${contractorName?.trim()}`);

  const enquiries = contractorGroups.nth(i).locator('.relativeEnq_enquiryRow__eL6Be');
  const enquiryCount = await enquiries.count();

  for (let j = 0; j < enquiryCount; j++) {
    const logNo = await enquiries.nth(j).locator('.relativeEnq_logNoCol__1WglN').textContent();
    const scope = await enquiries.nth(j).locator('.relativeEnq_scopeCol___cL9e').textContent();
    const actionButton = enquiries.nth(j).locator('.relativeEnq_actionCol__4qsDn button');

    // Verify visibility
    await expect(enquiries.nth(j)).toBeVisible();

    // Check if button is enabled
    const isDisabled = await actionButton.isDisabled();

    console.log(`  LOG NO: ${logNo?.trim()}`);
    console.log(`  SCOPE: ${scope?.trim()}`);
    console.log(`  ACTION Button Enabled: ${!isDisabled}`);
  }
}

  } catch (error) {
    console.error('Error occurred:', error);
  } 
  
});