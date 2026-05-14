const {test,expect}=require('playwright/test');


test('Internal Enquiry ',async({page})=>
{

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

    
    // Step:6  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded'); 

   

// Wait a moment for page to stabilize
await page.waitForTimeout(1000);

// Click Enquiry List tab 

await page.getByRole('button',{name:'Enquiry List'}).click();
console.log('Enquirylist tab clicked');
await page.waitForTimeout(2000); 

// Verify table is present
await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
// Verify header contains enquiry count
const text = await page.locator('div[title*="Enquiry List"] span').textContent();
const count = text.match(/\d+/)[0];
console.log("Enquiry Count:", count);
 
});

test('Internal Enquiry - Enquiry List  ',async({page})=>
{

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

    
    // Step:6  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded'); 

    // Step 7 : Verfiy the Enquiry list under the Internal Enquiry 

   console.log('STEP 7: Verifying Enquiry List tab...');

// Wait a moment for page to stabilize
await page.waitForTimeout(1000);

// Click Enquiry List tab 

await page.getByRole('button',{name:'Enquiry List'}).click();
console.log('Enquirylist tab clicked');
await page.waitForTimeout(2000); 

// Verify table is present
await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
// Verify header contains enquiry count
const text = await page.locator('div[title*="Enquiry List"] span').textContent();
const count = text.match(/\d+/)[0];
console.log("Enquiry Count:", count);

// print all the enquiries under the enquiry list 

const extractEnquiryData = async () => {
      return await page.evaluate(() => {
        const table = document.querySelector('table tbody');
        const rows = Array.from(table.querySelectorAll('tr'));
        return rows.map((row, index) => {
          const cells = row.querySelectorAll('td');
          return {
            rowNumber: index + 1,
            enquiryRegDate: cells[0]?.textContent.trim() || 'N/A',
            receivedDate: cells[1]?.textContent.trim() || 'N/A',
            enquiryLogNo: cells[2]?.textContent.trim() || 'N/A',
            enquiryType: cells[3]?.textContent.trim() || 'N/A',
            priority: cells[4]?.textContent.trim() || 'N/A',
            projectTitle: cells[5]?.textContent.trim() || 'N/A',
            projectDescription: cells[6]?.textContent.trim() || 'N/A',
            enquiryStatus: cells[7]?.textContent.trim() || 'N/A',
            customerName: cells[8]?.textContent.trim() || 'N/A',
            clientName: cells[9]?.textContent.trim() || 'N/A',
            countryCode: cells[10]?.textContent.trim() || 'N/A',
            region: cells[11]?.textContent.trim() || 'N/A',
            lastDate: cells[12]?.textContent.trim() || 'N/A'
          };
        });
      });
    };
    const enquiryData = await extractEnquiryData();

console.log('========== ALL ENQUIRY DETAILS ==========\n');

enquiryData.forEach((enquiry, index) => {
  console.log(`Enquiry #${index + 1}:`);
  console.log(`  Enquiry Registration Date: ${enquiry.enquiryRegDate}`);
  console.log(`  Received Date: ${enquiry.receivedDate}`);
  console.log(`  Enquiry Log No: ${enquiry.enquiryLogNo}`);
  console.log(`  Enquiry Type: ${enquiry.enquiryType}`);
  console.log(`  Priority: ${enquiry.priority}`);
  console.log(`  Project Title: ${enquiry.projectTitle}`);
  console.log(`  Project Description: ${enquiry.projectDescription}`);
  console.log(`  Enquiry Status: ${enquiry.enquiryStatus}`);
  console.log(`  Customer Name: ${enquiry.customerName}`);
  console.log(`  Client Name: ${enquiry.clientName}`);
  console.log(`  Country/Code: ${enquiry.countryCode}`);
  console.log(`  Region: ${enquiry.region}`);
  console.log(`  Last Date: ${enquiry.lastDate}`);
  console.log('-'.repeat(80) + '\n');
});
console.log(`Total Enquiries: ${enquiryData.length}\n`);
  
});


test.only('Internal Enquiry - Pending Approval Tab ',async({page})=>
{

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

    
    // Step:5  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded'); 

    // Step 6 : Verfiy the Enquiry list under the Internal Enquiry 

   console.log('STEP 7: Verifying Pending Approval  tab...');

    // Wait a moment for page to stabilize
    await page.waitForTimeout(1000);

   // Click Pending approval tab 
await page.getByRole('button',{name:'Pending Approval'}).click();
    await page.waitForTimeout(3000);

    await page.locator('table').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
/// Verify header contains enquiry count
const text = await page.locator('span:has-text("Pending Approval")').textContent();
const count = text.match(/\d+/)[0];  // Extract number
console.log("Pending Approval Count:", count);
});



test.only('Internal Enquiry - Pending Approval Tab verify the details ',async({page})=>
{

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

    
    // Step:5  Click on Internal Enquiry
    console.log('Step 6: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded'); 

    // Step 6 : Verfiy the Enquiry list under the Internal Enquiry 

   console.log('STEP 7: Verifying Pending Approval tab...');

    // Wait a moment for page to stabilize
    await page.waitForTimeout(1000);

       // Step 7 : Click on Pending Approval  list Tab 

       // Click Pending approval tab 
await page.getByRole('button',{name:'Pending Approval'}).click();
    await page.waitForTimeout(3000);

    await page.locator('table').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
/// Verify header contains enquiry count
const text = await page.locator('span:has-text("Pending Approval")').textContent();
const count = text.match(/\d+/)[0];  // Extract number
console.log("Pending Approval Count:", count);

    
const extractEnquiryData = async () => {
      return await page.evaluate(() => {
        const table = document.querySelector('table tbody');
        const rows = Array.from(table.querySelectorAll('tr'));
        return rows.map((row, index) => {
          const cells = row.querySelectorAll('td');
          return {
            rowNumber: index + 1,
            EnquirylogNo: cells[0]?.textContent.trim() || 'N/A',
            EnquiryType: cells[1]?.textContent.trim() || 'N/A',
            ProjectTitle: cells[2]?.textContent.trim() || 'N/A',
            ProjectDescription: cells[3]?.textContent.trim() || 'N/A',
            ClientName: cells[4]?.textContent.trim() || 'N/A',
            EoI: cells[5]?.textContent.trim() || 'N/A',
            
          };
        });
      });
    };
    const enquiryData = await extractEnquiryData();

console.log('========== ALL ENQUIRY DETAILS ==========\n');

enquiryData.forEach((enquiry, index) => {
  console.log(`Enquiry #${index + 1}:`);
  console.log(`  Enquiry Log No: ${enquiry.EnquirylogNo}`);
  console.log(`  Enquiry Type: ${enquiry.EnquiryType}`);
  console.log(`  Project Title: ${enquiry.ProjectTitle}`);
  console.log(`   Project Description: ${enquiry.ProjectDescription}`);
  console.log(`  Client Name: ${enquiry.ClientName}`);
  console.log(`  EoI: ${enquiry.EoI}`);
  console.log('-'.repeat(80) + '\n');
});
console.log(`Total Enquiries: ${enquiryData.length}\n`);
  
});


