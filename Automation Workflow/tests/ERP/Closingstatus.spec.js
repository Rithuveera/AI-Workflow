const {test,expect}=require('@playwright/test')
  test("Closing - Awarded ",async({page})=>
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
    
    // Step 4: Click on Enquiry menu to expand sidebar
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
     // Step 2: Click on Enquiry menu icon to expand
    
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

    // Click on "In Process "status option
       await page.getByTitle('In Process').click();
       await page.waitForTimeout(1000);
    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

    // Step 11: Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();

    
    // Click Closing Icon 
    await page.getByRole('button', { name: 'Closing' }).click();
    await page.waitForTimeout(3000); 

    // Select the status as awarded 
      const selectedValue=await page.selectOption('#statuscheck', '3');
      console.log(selectedValue); // Should print "3"

      // Enter the remarks 
      await page.fill('#remarks', 'This is my remark for the enquiry.');

      // Enter the PO value 

      await page.fill('#poValue','50000');
      
      // Select the PO currency 

      await page.selectOption('#qu', '6');

      // Select the Project Manager 

      await page.selectOption('#projectManager', '1');

      // Select the Quoted value 

      await page.fill('#quoteValue','30000');

      // Select the quote currency 

      await page.selectOption('#quoteCurrency','1');

      // Click save option 

      await page.getByRole('button',{name :'Save'}).click();

      // Locate the message
      const messageLocator = page.locator('div.MuiDialogContent-root');
      // Get the text content
      const messageText = await messageLocator.textContent();
      // Print it
       console.log('Enquiry Message:', messageText);    
    
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  } 
})

test("Enquiry Closing - Closed ",async({page})=>
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
    
    // Step 4: Click on Enquiry menu to expand sidebar
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
    
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

   // Click on "In Process "status option
       await page.getByTitle('In Process').click();
       await page.waitForTimeout(1000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

      // Step 11: Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();

    // Click Closing Icon 
    await page.getByRole('button', { name: 'Closing' }).click();
    await page.waitForTimeout(3000);

     // Select the status as closed  
      const selectedValue=await page.selectOption('#statuscheck', 'Closed');
      console.log(selectedValue); // Should print "3"
      console.log('Selected status is closed ') ;

      // Enter the remarks 
      await page.fill('#remarks', 'This is my remark for the enquiry.');

      // Click save option 

      await page.getByRole('button',{name :'Save'}).click();

      // Locate the message
      const messageLocator = page.locator('div.MuiDialogContent-root');
      // Get the text content
      const messageText = await messageLocator.textContent();
      // Print it
       console.log('Enquiry Message:', messageText);    
    
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  } 
})


test("Enquiry Closing - Lost ",async({page})=>
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
    
    // Step 4: Click on Enquiry menu to expand sidebar
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
     
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

    // Click on "In Process "status option
       await page.getByTitle('In Process').click();
       await page.waitForTimeout(1000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     // Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();


    // Click Closing Icon 
    await page.getByRole('button', { name: 'Closing' }).click();
    await page.waitForTimeout(3000);

    // Select the status as awarded 
      const selectedValue=await page.selectOption('#statuscheck', 'Lost');
      console.log(selectedValue); // Should print "3"
      console.log('Selected status is Lost ') ;

      // Enter the remarks 
      await page.fill('#remarks', 'This is my remark for the enquiry.');

      // Click save option 

      await page.getByRole('button',{name :'Save'}).click();

      // Locate the message
      const messageLocator = page.locator('div.MuiDialogContent-root');
      // Get the text content
      const messageText = await messageLocator.textContent();
      // Print it
       console.log('Enquiry Message:', messageText);    
    
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  } 
})


test("Enquiry Closing -Neglected  ",async({page})=>
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
    
    
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
     // Step 2: Click on Enquiry menu icon to expand
    
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

   // Click on "In Process "status option
       await page.getByTitle('In Process').click();
       await page.waitForTimeout(1000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();

    // Click Closing Icon 
    await page.getByRole('button', { name: 'Closing' }).click();
    await page.waitForTimeout(3000);

    // Select the status as Neglected 
      const selectedValue=await page.selectOption('#statuscheck', 'Neglected');
      console.log(selectedValue); // Should print "3"
      console.log('Selected status is Neglected ') ;

      // Enter the remarks 
      await page.fill('#remarks', 'This is my remark for the enquiry.');

      // Click save option 

      await page.getByRole('button',{name :'Save'}).click();

      // Locate the message
      const messageLocator = page.locator('div.MuiDialogContent-root');
      // Get the text content
      const messageText = await messageLocator.textContent();
      // Print it
       console.log('Enquiry Message:', messageText);    
    
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  } 
})

test("Enquiry Closing -Hold  ",async({page})=>
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
    
    // Step 4: Click on Enquiry menu to expand sidebar
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
     
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

    // Click on "In Process "status option
       await page.getByTitle('In Process').click();
       await page.waitForTimeout(1000);;

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();


    // Click Closing Icon 
    await page.getByRole('button', { name: 'Closing' }).click();
    await page.waitForTimeout(3000);

    // Select the status as Hold 
      const selectedValue=await page.selectOption('#statuscheck', 'Hold');
      console.log(selectedValue); 
      console.log('Selected status is Hold ') ;

      // Enter the remarks 
      await page.fill('#remarks', 'This is my remark for the enquiry.');

      // Click save option 

      await page.getByRole('button',{name :'Save'}).click();

      // Locate the message
      const messageLocator = page.locator('div.MuiDialogContent-root');
      // Get the text content
      const messageText = await messageLocator.textContent();
      // Print it
       console.log('Enquiry Message:', messageText);    
    
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  } 
})

test("Enquiry Closing - Cancelled  ",async({page})=>
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
    
    // Step 4: Click on Enquiry menu to expand sidebar
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');

    
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

    // Click on "In Process "status option
       await page.getByTitle('In Process').click();
       await page.waitForTimeout(1000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();


    // Click Closing Icon 
    await page.getByRole('button', { name: 'Closing' }).click();
    await page.waitForTimeout(3000);

    // Select the status as Cancelled 
      const selectedValue=await page.selectOption('#statuscheck', 'Cancelled');
      console.log(selectedValue); 
      console.log('Selected status is Cancelled ') ;

      // Enter the remarks 
      await page.fill('#remarks', 'This is my remark for the enquiry.');

      // Click save option 

      await page.getByRole('button',{name :'Save'}).click();

      // Locate the message
      const messageLocator = page.locator('div.MuiDialogContent-root');
      // Get the text content
      const messageText = await messageLocator.textContent();
      // Print it
       console.log('Enquiry Message:', messageText);    
    
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  } 
})

test("Enquiry Closing - Retender  ",async({page})=>
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
    
    // Step 4: Click on Enquiry menu to expand sidebar
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
         
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

    // Click on "In Process "status option
       await page.getByTitle('In Process').click();
       await page.waitForTimeout(1000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();

    // Click Closing Icon 
    await page.getByRole('button', { name: 'Closing' }).click();
    await page.waitForTimeout(3000);

    // Select the status as Retender 
      const selectedValue=await page.selectOption('#statuscheck', 'Retender');
      console.log(selectedValue); 
      console.log('Selected status is Retender ') ;

      // Enter the remarks 
      await page.fill('#remarks', 'This is my remark for the enquiry.');

      // Click save option 

      await page.getByRole('button',{name :'Save'}).click();

      // Locate the message
      const messageLocator = page.locator('div.MuiDialogContent-root');
      // Get the text content
      const messageText = await messageLocator.textContent();
      // Print it
       console.log('Enquiry Message:', messageText);    
    
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  } 
})

test("Enquiry Closing - Control Lost  ",async({page})=>
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
    
    // Step 4: Click on Enquiry menu to expand sidebar
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
    
    
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

// Click on "In Process "status option
       await page.getByTitle('In Process').click();
       await page.waitForTimeout(1000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();


    // Click Closing Icon 
    await page.getByRole('button', { name: 'Closing' }).click();
    await page.waitForTimeout(3000);

    // Select the status as Control Lost 
      const selectedValue=await page.selectOption('#statuscheck', 'Control Lost');
      console.log(selectedValue); 
      console.log('Selected status is Control Lost ') ;

      // Enter the remarks 
      await page.fill('#remarks', 'This is my remark for the enquiry.');

      // Click save option 

      await page.getByRole('button',{name :'Save'}).click();

      // Locate the message
      const messageLocator = page.locator('div.MuiDialogContent-root');
      // Get the text content
      const messageText = await messageLocator.textContent();
      // Print it
       console.log('Enquiry Message:', messageText);    
    
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  } 
})


test("Enquiry Closing - Budgetary  ",async({page})=>
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
    
    // Step 4: Click on Enquiry menu to expand sidebar
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
    
    
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

 // Click on "In Process "status option
       await page.getByTitle('In Process').click();
       await page.waitForTimeout(1000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();


    // Click Closing Icon 
    await page.getByRole('button', { name: 'Closing' }).click();
    await page.waitForTimeout(3000);

    // Select the status as Budgetary 
      const selectedValue=await page.selectOption('#statuscheck', 'Budgetary');
      console.log(selectedValue); 
      console.log('Selected status is Budgetary ') ;

      // Enter the remarks 
      await page.fill('#remarks', 'This is my remark for the enquiry.');

      // Click save option 

      await page.getByRole('button',{name :'Save'}).click();

      // Locate the message
      const messageLocator = page.locator('div.MuiDialogContent-root');
      // Get the text content
      const messageText = await messageLocator.textContent();
      // Print it
       console.log('Enquiry Message:', messageText);    
    
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  } 
})

test("Enquiry Closing - Regretted  ",async({page})=>
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
    
    // Step 4: Click on Enquiry menu to expand sidebar
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
    
    
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

   // Click on "In Process "status option
       await page.getByTitle('In Process').click();
       await page.waitForTimeout(1000);

    //Click Apply button to apply the filter
    await page.getByRole('button', { name: 'Apply' }).click();

    //Wait for filtered results to load
     await page.waitForTimeout(1000);

     //Click on the first enquiry in the list
    await page.locator('table tbody tr').first().click();


    // Click Closing Icon 
    await page.getByRole('button', { name: 'Closing' }).click();
    await page.waitForTimeout(3000);

    // Select the status as Regretted 
      const selectedValue=await page.selectOption('#statuscheck', 'Regretted');
      console.log(selectedValue); 
      console.log('Selected status is Budgetary ') ;

      // Enter the remarks 
      await page.fill('#remarks', 'This is my remark for the enquiry.');

      // Click save option 

      await page.getByRole('button',{name :'Save'}).click();

      // Locate the message
      const messageLocator = page.locator('div.MuiDialogContent-root');
      // Get the text content
      const messageText = await messageLocator.textContent();
      // Print it
       console.log('Enquiry Message:', messageText);    
    
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
    throw error;
  } 
})







