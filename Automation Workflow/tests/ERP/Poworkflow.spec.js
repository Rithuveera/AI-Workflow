
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

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


test('PO  - Click  Revert option  material team review  ',async ({ page }) => {
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



test('PO  - Click Financial head review  ',async ({ page }) => {
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

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under finance head review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  cell clicked');
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



test('PO  - Verify approval option  under Finance head review  ',async ({ page }) => {
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

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under finance head review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  Review  cell clicked');
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


test('PO  - Click  approval option under finance head review  ',async ({ page }) => {
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

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under finance head review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  Review  cell clicked');
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


test('PO  - Click  Revert option under finance head review  ',async ({ page }) => {
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

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under finance head review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  Review  cell clicked');
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

test('PO  - Click Account head review  ',async ({ page }) => {
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

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under account team review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  cell clicked');
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



test('PO  - Verify approval option  under Account head review  ',async ({ page }) => {
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

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under account team review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  Review  cell clicked');
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


test('PO  - Click  approval option under account head review  ',async ({ page }) => {
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

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under account team review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  Review  cell clicked');
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


test('PO  - Click  Revert option under Account head review  ',async ({ page }) => {
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

    const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under account team review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  Review  cell clicked');
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


test.only('PO  - Click Management review  ',async ({ page }) => {
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

        const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under management review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  cell clicked');
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



test.only ('PO  - Verify approval option  under Management team review  ',async ({ page }) => {
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

        const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under management review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  Review  cell clicked');
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


test.only('PO  - Click  approval option under Management team review  ',async ({ page }) => {
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

        const MaterialTeam = page.locator('td', {  has: page.locator('div[aria-label="Status: Under management review"]')}).first();

     if (await MaterialTeam.count() > 0) {
     await MaterialTeam.click();
     console.log('Finance team  Review  cell clicked');
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


test.only('PO  - Click  Revert option under Management team review  ',async ({ page }) => {
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
  
        const Management = page.locator('td', {  has: page.locator('div[aria-label="Status: Under management review"]')}).first();

     if (await Management.count() > 0) {
     await Management.click();
     console.log('Management team  Review  cell clicked');
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


























































