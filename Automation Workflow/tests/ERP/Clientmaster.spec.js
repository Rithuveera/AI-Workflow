
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
test('Client-Master - List page ', async ({ page }) => {
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
    await page.click('text=Master');
    await page.waitForTimeout(500);
    console.log("Master Menu clicked successfully");

    // Click Client master 

    await page.getByRole('link', { name: 'Client-Master' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Client  Master Menu clicked successfully ');
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


test.only('Client-Master - Add  ', async ({ page }) => {
  try {


    const email = `auto.user.${Date.now()}@gmail.com`;
    const name = faker.person.firstName();
    const mobile = `${['7', '8', '9'][Math.floor(Math.random() * 3)]}${Math.floor(100000000 + Math.random() * 900000000)}`;
    const city = faker.location.city();
    const address = `${faker.location.streetAddress()}, ${faker.location.city()} - ${faker.location.zipCode()}`;
    const contactNumber = `${['7', '8', '9'][Math.floor(Math.random() * 3)]}${Math.floor(100000000 + Math.random() * 900000000)}`;

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

    await page.getByRole('link', { name: 'Client-Master' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Client  Master Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click Add new option 
    const addNewBtn = page.getByRole('button', { name: 'Add New' });
    console.log('Waiting for "Add New" button to be visible...');
    await addNewBtn.scrollIntoViewIfNeeded();
    await expect(addNewBtn).toBeVisible({ timeout: 15000 });
    await addNewBtn.click();
    console.log('"Add New" button clicked successfully');
    await page.waitForTimeout(3000);

    //Enter the email value 
     await page.locator('input[name="emailId"]').fill(email);
     console.log('Email entered:', email);

    // Enter the Name
    await page.locator('input[name="clientName"]').fill(name);
    console.log('Name entered:', name);

    // Enter the Mobile 
    await page.locator('input[name="mobile"]').fill(mobile);
    console.log('Mobile entered:', mobile);

    // Enter the city 
    await page.locator('input[name="city"]').fill(city);
    console.log('City entered:', city);
    // Select the country 
    await page.getByPlaceholder('Select...').fill('India');
    await page.getByText('India').click();
  
    // Enter the address 
    await page.locator('textarea[name="address"]').fill('address');
    console.log('Address entered:', address);


    // Enter the contact number 
    await page.locator('input[name="contactNumber"]').fill(contactNumber);
    console.log('Contact Number entered:', contactNumber);


    // Click save 

    await page.locator('button', { hasText: 'Save' }).click();
    await page.waitForTimeout(3000);

    // verfiy the success messgae 

    const text = await page.locator('h2.MuiDialogTitle-root').innerText();
    console.log(text.trim());

    const message = await page.locator('div.MuiDialogContent-root.css-1w1ftqv').innerText();
    console.log(message.trim());

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


test('Client -Master - Delete   ', async ({ page }) => {
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
    await page.click('text=Master');
    await page.waitForTimeout(500);
    console.log("Master Menu clicked successfully");

    // Click Client master 

    await page.getByRole('link', { name: 'Client-Master' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Client  Master Menu clicked successfully ');
    await page.waitForTimeout(3000);

    // Click Edit option 
    await page.locator('.action-button-menu').first().click();
    await page.waitForTimeout(3000);

    // Click delete option 
    await page.getByRole('button', { name: 'Delete' }).click();
    console.log('client deleted successfully ');
  }

  catch (error) {
    console.error('Error:', error);
  }
});





