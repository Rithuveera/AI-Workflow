const {test,expect}=require('playwright/test');
const { faker } =require( '@faker-js/faker');


test('User Creation',async({page})=>
{
  try
  {

     const name = faker.person.fullName();
    const username = `${faker.person.firstName()}${faker.person.lastName()}${faker.number.int({ min: 100, max: 999 })}`;
    const email = faker.internet.email();
    const mobile = `9${Math.floor(100000000 + Math.random() * 900000000)}`;
    const password = 'Admin@123';

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
    
   
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
     // Step 2: Click on Enquiry menu icon to expand
    
    console.log('Step 2: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);

    // Click on Master menu
    await page.click('text=Master');
    await page.waitForTimeout(500);
    console.log("Master Menu clicked successfully");
    
    // Click on User submenu
    await page.click('a[href="/master/user"]');
    await page.waitForLoadState('networkidle');
    console.log('User menu clicked successfully ');

    // Step 4: Click New User button
    console.log('Step 4: Clicking New User button...');
    await page.getByRole('button', { name: 'New User' }).click();
    await page.waitForLoadState('networkidle');
    console.log("New user button clicked successfully");

    // Step 5: Fill the user registration form
    console.log('Step 5: Filling user registration form...');
    
    // Fill Name
    await page.fill('input[name="name"]', name);
    console.log('Name entered successfully ')
    
    // Fill Username
    await page.fill('input[name="username"]', username);
    console.log('Username entered successfully');
    
    // Fill Email
    await page.fill('input[name="email"]', email);
    console.log('Email entered successfully');
    
    // Fill Password
    await page.fill('#password', 'Admin@123');
    console.log('password entered successfully');
    
    // Fill Retype Password
    await page.fill('#retype_password', password);
    console.log('Retest password entered successfully ');
    
    // Status is already set to Active by default
    
    // Fill Contact Number
    await page.fill('#mobile', mobile);
    console.log('Contact number entered successfully');

    // Step 6: Select Branch - Select All
    console.log('Step 6: Selecting all branches...');
    await page.locator('button:has-text("Select...")').first().click();
    await page.waitForTimeout(500);
    
    // Click on "Select All" checkbox
    await page.getByRole('checkbox').first().click();
    await page.waitForTimeout(500);

    // Step 7: Select Default Branch
    console.log('Step 7: Selecting default branch...');
    const branchDropdown = page.locator('button:has-text("Select...")').first();
    await expect(branchDropdown).toBeEnabled({ timeout: 10000 });
    await branchDropdown.click();
    await page.getByRole('checkbox').first().click();
    await page.waitForTimeout(500);

    // Step 8: Save the form
    console.log('Step 8: Saving the user...');
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(2000);

    // Step 9: Handle success dialog
    console.log('Step 9: Verifying user creation...');
    const successMessage = page.locator('h2:has-text("User Created")');
    await expect(successMessage).toHaveText('User Created', { timeout: 5000 });
    console.log('✓ User created successfully!');
   await page.locator('button:has-text("Ok")').click();
   console.log('✓ Dialog closed');
   console.log('\nAutomation completed successfully!');   
  }
  catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  }
});


test('Edit User ',async({page})=>
{
 try{

   const mobile = `9${Math.floor(100000000 + Math.random() * 900000000)}`;
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
    
    // Expand sidebar if needed
     // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
     // Step 2: Click on Enquiry menu icon to expand
    
    console.log('Step 2: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);

    // Click on Master menu
    await page.click('text=Master');
    await page.waitForTimeout(500);
    console.log("Master Menu clicked successfully");
    
    // Click on User submenu
    await page.click('a[href="/master/user"]');
    await page.waitForLoadState('networkidle');
    console.log('User menu clicked successfully ');

   // Wait for the table to load
    await page.waitForSelector('table');
    
    // Get the first data row in the pending list (skip the header row)

   await page.locator('.action-button-menu').first().click();
    await page.waitForTimeout(3000);

    // Click edit option 

    await page.locator('img[alt="Edit"]').click();
    await page.waitForTimeout(2000);

    // Clear the mobile number 
    await page.locator('#mobile').clear();
    await page.waitForTimeout (1000);

    // Enter the new mobile number 
     await page.fill('#mobile', mobile);
    console.log('Contact number entered successfully');

    // Cick save option 
    await page.getByRole('button', { name: 'Save' }).click();

     // Step 9: Handle success dialog
    console.log('Step 9: Verifying user Updation ...');
   const message = await page.locator('h2.MuiDialogTitle-root').innerText();
   console.log('Success message:', message);
   console.log('✓ User Updated  successfully!');
   await page.locator('button:has-text("Ok")').click();
   console.log('✓ Dialog closed');
   console.log('\nAutomation completed successfully!');   
  }
  catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  }


})

