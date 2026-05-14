const { test,expect} = require('@playwright/test');
test('Project Dashboard ',async ({page}) => {
  
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
    await page.getByTitle('In Process').click();

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();

    // Click Related Enquiry 

    await page.getByRole('button', { name: 'Project Dashboard' }).click();
    await page.waitForTimeout(3000);

      // --- 1️⃣ Extract Top Info Section ---

  // Define headers and corresponding selectors
  const headers = [
    { name: 'Log No', selector: '.relatedEnquiryPage_logNo__g50g6' },
    { name: 'Scope', selector: '.relatedEnquiryPage_scopeCol__3wSiD' },
    { name: 'Description', selector: '.relatedEnquiryPage_descriptionCell__jQSfj' },
    { name: 'Type', selector: '.relatedEnquiryPage_cell__MAybN:nth-child(4)' },
    { name: 'Priority', selector: '.relatedEnquiryPage_cell__MAybN:nth-child(5)' },
    { name: 'Status', selector: '.relatedEnquiryPage_cell__MAybN:nth-child(6) span' },
    { name: 'Sales Engineer', selector: '.relatedEnquiryPage_cell__MAybN:nth-child(7)' },
    { name: 'Last Date', selector: '.relatedEnquiryPage_cell__MAybN:nth-child(8)' },
    { name: 'Action', selector: '.relatedEnquiryPage_cell__MAybN:nth-child(9) button' }
  ];

  // Get all contractor groups dynamically
  const contractorGroups = page.locator('.relatedEnquiryPage_contractorGroup__4oQte');
  const groupCount = await contractorGroups.count();

  for (let i = 0; i < groupCount; i++) {
    const contractorName = await contractorGroups.nth(i)
      .locator('.relatedEnquiryPage_contractorHeader__9Ft8C span')
      .textContent();
    console.log(`\nContractor: ${contractorName?.trim()}`);

    // All enquiry rows under this contractor
    const enquiries = contractorGroups.nth(i).locator('.relatedEnquiryPage_enquiryRow__o_nLo');
    const enquiryCount = await enquiries.count();

    for (let j = 0; j < enquiryCount; j++) {
      console.log(`  Enquiry ${j + 1}:`);

      for (const header of headers) {
        const locator = enquiries.nth(j).locator(header.selector);

        let value;
        if (header.name === 'Action') {
          value = (await locator.isDisabled()) ? 'Disabled' : 'Enabled';
        } else {
          const count = await locator.count();
          if (count > 0) {
            value = (await locator.first().textContent())?.trim();
          } else {
            value = '';
          }
        }

        console.log(`    ${header.name}: ${value}`);
      }
    }
  }


   
  } catch (error) {
    console.error('Error occurred:', error);
  } 
  
});