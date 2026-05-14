const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test.only('RFQ  - Manage quote for single vendor ', async ({ page }) => {
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
    console.log("Master Menu clicked successfully");

    // Click RFQ 

    await page.getByRole('link', { name: 'RFQ' }).click();
    await page.waitForLoadState('networkidle');
    console.log('RFQ Menu clicked successfully ');
    await page.waitForTimeout(3000);

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

    // Click Pending status RFQ

    const pendingCell = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await pendingCell.count() > 0) {
     await pendingCell.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     // Click Vendor manage quote option 

     await page.locator('img[src="/icons/manage-quotation.svg"]').click();

     await page.getByPlaceholder('Select Vendor').click();
     await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').first().click();
     console.log('Vendor selected successfully');

     // Click edit option 
     await page.getByRole('button ',{name:'Edit'}).click();

     // enter the value for first item 
     await page.locator('input[placeholder="0.00"]').nth(0).fill('100');
     console.log('Base price added successfully');


     // Select the delivery terms 

     await page.locator('select[name="deliveryTerms"]').selectOption('1'); // selects DDP

     // Enter the port of shipment 
     const portInput = page.locator('input[name="portOfShipment"]');
     await portInput.fill(''); // clear existing
     await portInput.fill('Port of Los Angeles');

     // Select the currency 
     await page.locator('select[name="currency"]').selectOption({ label: 'US Dollar' });
     await page.waitForTimeout(1000); 

     // Select the Payment terms 
     await page.locator('select[name="paymentTerms"]').selectOption({ label: 'Net 60' });

     // Enter the delivery time value
     await page.locator('input[name="deliveryTime"]').fill('15 Days');

     // Enter the availabilty 

     await page.locator('input[name="availability"]').fill('In Stock');

     // Click save option 

     await page.getByRole('button',{name:'Save'}).click();
     console.log('Manage quote successfully against the vendor ');

   

  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Manage quote with  Mutiple vendor ', async ({ page }) => {
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
    console.log("Master Menu clicked successfully");

    // Click RFQ 

    await page.getByRole('link', { name: 'RFQ' }).click();
    await page.waitForLoadState('networkidle');
    console.log('RFQ Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click Pending status RFQ

    const pendingCell = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await pendingCell.count() > 0) {
     await pendingCell.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     await page.locator('img[alt="Add Vendor"]').click();
     await page.waitForTimeout(3000);
     // Select the vendor
    await page.locator('#rfq-vendor-scroll-container div').filter({ hasText: /^BO Vendor$/ }).first().click();
    await page.locator('#rfq-vendor-scroll-container div').filter({ hasText: /^BO Vendor1$/ }).first().click();
    // Click save 

    await page.getByRole('button', { name: 'Save' }).click();

    console.log('Vendor selected successfully')

     // Click Vendor manage quote option 

     await page.locator('img[src="/icons/manage-quotation.svg"]').click();

     await page.getByPlaceholder('Select Vendor').click();
     await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').first().click();
     console.log('Vendor selected successfully');

     // Click edit option 
     await page.getByRole('button ',{name:'Edit'}).click();

     // enter the value for first item 
     await page.locator('input[placeholder="0.00"]').nth(0).fill('100');
     console.log('Base price added successfully');


     // Select the delivery terms 

     await page.locator('select[name="deliveryTerms"]').selectOption('1'); // selects DDP

     // Enter the port of shipment 
     const portInput1 = page.locator('input[name="portOfShipment"]');
     await portInput1.fill(''); // clear existing
     await portInput1.fill('Port of Los Angeles');

     // Select the currency 
     await page.locator('select[name="currency"]').selectOption({ label: 'US Dollar' });
     await page.waitForTimeout(1000); 

     // Select the Payment terms 
     await page.locator('select[name="paymentTerms"]').selectOption({ label: 'Net 60' });

     // Enter the delivery time value
     await page.locator('input[name="deliveryTime"]').fill('15 Days');

     // Enter the availabilty 

     await page.locator('input[name="availability"]').fill('In Stock');

     // Click save option 

     await page.getByRole('button',{name:'Save'}).click();
     console.log('Manage quote successfully against the vendor1');
     await page.waitForTimeout(3000);


     // Select the second vendor 
     await page.getByPlaceholder('Select Vendor').click();
     await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').nth(1).click();
     
     // Click edit option 
     await page.getByRole('button ',{name:'Edit'}).click();

     // enter the value for first item 
     await page.locator('input[placeholder="0.00"]').nth(0).fill('100');
     console.log('Base price added successfully');


     // Select the delivery terms 

     await page.locator('select[name="deliveryTerms"]').selectOption('1'); // selects DDP

     // Enter the port of shipment 
     const portInput2 = page.locator('input[name="portOfShipment"]');
     await portInput2.fill(''); // clear existing
     await portInput2.fill('Port of Los Angeles');

     // Select the currency 
     await page.locator('select[name="currency"]').selectOption({ label: 'US Dollar' });
     await page.waitForTimeout(1000); 

     // Select the Payment terms 
     await page.locator('select[name="paymentTerms"]').selectOption({ label: 'Net 60' });

     // Enter the delivery time value
     await page.locator('input[name="deliveryTime"]').fill('15 Days');

     // Enter the availabilty 

     await page.locator('input[name="availability"]').fill('In Stock');

     // Click save option 

     await page.getByRole('button',{name:'Save'}).click();
     console.log('Manage quote successfully against the vendor2 ');

    

  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Manage quote for single vendor with Custom duty charges  ', async ({ page }) => {
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
    console.log("Master Menu clicked successfully");

    // Click RFQ 

    await page.getByRole('link', { name: 'RFQ' }).click();
    await page.waitForLoadState('networkidle');
    console.log('RFQ Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click Pending status RFQ

    const pendingCell = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await pendingCell.count() > 0) {
     await pendingCell.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     await page.locator('img[alt="Add Vendor"]').click();
     await page.waitForTimeout(3000);
     // Select the vendor
    await page.locator('#rfq-vendor-scroll-container div').filter({ hasText: /^BO Vendor$/ }).first().click();
    await page.locator('#rfq-vendor-scroll-container div').filter({ hasText: /^BO Vendor1$/ }).first().click();
    // Click save 

    await page.getByRole('button', { name: 'Save' }).click();

    console.log('Vendor selected successfully')

     // Click Vendor manage quote option 

     await page.locator('img[src="/icons/manage-quotation.svg"]').click();

     await page.getByPlaceholder('Select Vendor').click();
     await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').first().click();
     console.log('Vendor selected successfully');

     // Click edit option 
     await page.getByRole('button ',{name:'Edit'}).click();

     // enter the value for first item 
     await page.locator('input[placeholder="0.00"]').nth(0).fill('100');
     console.log('Base price added successfully');


     // Select the delivery terms 

     await page.locator('select[name="deliveryTerms"]').selectOption('1'); // selects DDP

     // Enter the port of shipment 
     const portInput = page.locator('input[name="portOfShipment"]');
     await portInput.fill(''); // clear existing
     await portInput.fill('Port of Los Angeles');

     // Select the currency 
     await page.locator('select[name="currency"]').selectOption({ label: 'US Dollar' });
     await page.waitForTimeout(1000); 

     // Select the Payment terms 
     await page.locator('select[name="paymentTerms"]').selectOption({ label: 'Net 60' });

     // Enter the delivery time value
     await page.locator('input[name="deliveryTime"]').fill('15 Days');

     // Enter the availabilty 

     await page.locator('input[name="availability"]').fill('In Stock');

     // Pass the custom duty 

     await page.locator('input[name="customsDuty"]').fill('10');   // Enter value 10

     const customsDuty = await page.locator('input[name="customsDuty"]').inputValue(); // Read the value

     console.log('Customs Duty Value:', customsDuty); // Print the value

     // Click save option 

     await page.getByRole('button',{name:'Save'}).click();
     console.log('Manage quote successfully against the vendor ');

    

  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Manage quote for single vendor with Addtional  charges  ', async ({ page }) => {
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
    console.log("Master Menu clicked successfully");

    // Click RFQ 

    await page.getByRole('link', { name: 'RFQ' }).click();
    await page.waitForLoadState('networkidle');
    console.log('RFQ Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click Pending status RFQ

    const pendingCell = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await pendingCell.count() > 0) {
     await pendingCell.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     await page.locator('img[alt="Add Vendor"]').click();
     await page.waitForTimeout(3000);
     // Select the vendor
    await page.locator('#rfq-vendor-scroll-container div').filter({ hasText: /^BO Vendor$/ }).first().click();
    await page.locator('#rfq-vendor-scroll-container div').filter({ hasText: /^BO Vendor1$/ }).first().click();
    // Click save 

    await page.getByRole('button', { name: 'Save' }).click();

    console.log('Vendor selected successfully')

     // Click Vendor manage quote option 

     await page.locator('img[src="/icons/manage-quotation.svg"]').click();

     await page.getByPlaceholder('Select Vendor').click();
     await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').first().click();
     console.log('Vendor selected successfully');

     // Click edit option 
     await page.getByRole('button ',{name:'Edit'}).click();

     // enter the value for first item 
     await page.locator('input[placeholder="0.00"]').nth(0).fill('100');
     console.log('Base price added successfully');


     // Select the delivery terms 

     await page.locator('select[name="deliveryTerms"]').selectOption('1'); // selects DDP

     // Enter the port of shipment 
     const portInput = page.locator('input[name="portOfShipment"]');
     await portInput.fill(''); // clear existing
     await portInput.fill('Port of Los Angeles');

     // Select the currency 
     await page.locator('select[name="currency"]').selectOption({ label: 'US Dollar' });
     await page.waitForTimeout(1000); 

     // Select the Payment terms 
     await page.locator('select[name="paymentTerms"]').selectOption({ label: 'Net 60' });

     // Enter the delivery time value
     await page.locator('input[name="deliveryTime"]').fill('15 Days');

     // Enter the availabilty 

     await page.locator('input[name="availability"]').fill('In Stock');

     // Pass the custom duty 

     await page.locator('input[name="customsDuty"]').fill('10');   // Enter value 10

     const customsDuty = await page.locator('input[name="customsDuty"]').inputValue(); // Read the value

     console.log('Customs Duty Value:', customsDuty); // Print the value

     // Enter the addtional charges - Fright charges 
     
     await page.locator('input[name="freightCharges"]').fill('1000');   // Enter value 10

     const freightCharges = await page.locator('input[name="freightCharges"]').inputValue(); // Read the value

     console.log('freightCharges Value:', freightCharges); // Print the value

     // Enter the Local Transportation 

      await page.locator('input[name="localTransportation"]').fill('1000');   // Enter value 10

      const localTransportation = await page.locator('input[name="localTransportation"]').inputValue(); // Read the value

      console.log('Local Tranporatation  Value:', localTransportation); // Print the value

      // Enter the Other charges 

      await page.locator('input[name="otherCharges"]').fill('1000');   // Enter value 10

      const otherCharges = await page.locator('input[name="otherCharges"]').inputValue(); // Read the value

      console.log('Other charges  Value:', otherCharges); // Print the value


     // Click save option 

     await page.getByRole('button',{name:'Save'}).click();
     console.log('Manage quote successfully against the vendor ');

  }

  catch (error) {
    console.error('Error:', error);
  }
});

test('RFQ  - Download Vendor PDF  ', async ({ page,context}) => {
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
    console.log("Master Menu clicked successfully");

    // Click RFQ 

    await page.getByRole('link', { name: 'RFQ' }).click();
    await page.waitForLoadState('networkidle');
    console.log('RFQ Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click Pending status RFQ

    const pendingCell = page.locator('td', {  has: page.locator('div[aria-label="Status: Pending"]')}).first();

     if (await pendingCell.count() > 0) {
     await pendingCell.click();
     console.log('Pending cell clicked');
    } else 
        {
    console.log('No Pending records found');
      }
     await page.waitForTimeout(3000);

     await page.locator('img[alt="Add Vendor"]').click();
     await page.waitForTimeout(3000);
     // Select the vendor
    await page.locator('#rfq-vendor-scroll-container div').filter({ hasText: /^BO Vendor$/ }).first().click();
    await page.locator('#rfq-vendor-scroll-container div').filter({ hasText: /^BO Vendor1$/ }).first().click();
    // Click save 

    await page.getByRole('button', { name: 'Save' }).click();

    console.log('Vendor mapped successfully')

     // Click Vendor manage quote option 

     await page.locator('img[src="/icons/manage-quotation.svg"]').click();

     await page.getByPlaceholder('Select Vendor').click();
     await page.locator('.searchDropDownPagination_suggestion_item__PSEfn').first().click();
     console.log('Vendor selected successfully');

     const [pdfPage] = await Promise.all([ page.context().waitForEvent('page'),  page.getByRole('button', { name: 'Download' }).click()]);

await pdfPage.waitForLoadState();

const pdfUrl = pdfPage.url();

console.log('PDF URL:', pdfUrl);

    
// Extract the data from pdf 

const pdfParse = require('pdf-parse');

// pdfUrl you already captured


// download the pdf
const response = await page.request.get(pdfUrl);
const buffer = await response.body();

// extract text from pdf
const data = await pdfParse(buffer);

// print pdf content
console.log("PDF Text:");
console.log(data.text);

  }

  catch (error) {
    console.error('Error:', error);
  }
});

