const {test,expect}=require('playwright/test');


test('Global Enquiry ',async({page})=>
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

    
    // Step:6  Click on Global Enquiry
    console.log('Step 6: Clicking on Global Enquiry...');
    await page.getByRole('link', { name: 'Global Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Global Enquiry page loaded'); 

// Wait a moment for page to stabilize
await page.waitForTimeout(1000);

// Click the Global enquiry list 

await page.getByRole('button',{name:'Global Enquiry List'}).click();
console.log('Global enquiry tab is clicked ')

// Verify table is present
await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
// Verify header contains enquiry count
const text = await page.locator('span:has-text("Global Enquiry List")').textContent();

const count = text.match(/\d+/)[0];  // extract number

console.log("Global Enquiry Count:", count);
  
});

test.only('Global Enquiry - Enquiry List  ',async({page})=>
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

    
    // Step:6  Click on Global Enquiry
    console.log('Step 6: Clicking on Global Enquiry...');
    await page.getByRole('link', { name: 'Global Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Global Enquiry page loaded'); 

   
// Wait a moment for page to stabilize
await page.waitForTimeout(1000);

// Click Global enquiry list tab
await page.getByRole('button', { name: 'Global Enquiry List' }).click();
await page.waitForTimeout(3000);


// Verify table is present
await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
// Verify table is present
await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
// Verify header contains enquiry count
const text = await page.locator('span:has-text("Global Enquiry List")').textContent();

const count = text.match(/\d+/)[0];  // extract number

console.log("Global Enquiry Count:", count);

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
            Branch: cells[10]?.textContent.trim()||'N/A',
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
  console.log(`Branch : ${enquiry.Branch}`);
  console.log(`  Country/Code: ${enquiry.countryCode}`);
  console.log(`  Region: ${enquiry.region}`);
  console.log(`  Last Date: ${enquiry.lastDate}`);
  console.log('-'.repeat(80) + '\n');
});
console.log(`Total Enquiries: ${enquiryData.length}\n`);
  
});

