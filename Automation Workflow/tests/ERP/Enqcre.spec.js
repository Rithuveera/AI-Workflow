
const { test, expect } = require('@playwright/test');
const BASE_URL = 'https://datnext-qa.algosium.com';
const VALID_USERNAME = 'Veera';
const VALID_PASSWORD = 'Rithu@11';
const { faker } =require( '@faker-js/faker');

test("Enquiry creation",async ({page}) => {

  const projectTitle = `Automation Enquiry Project ${Date.now()}`;
  const tenderNo = `TN${faker.number.int({ min: 10, max: 99 })}`;
  const description = `Automation enquiry test project for corrosion inhibitors - ${faker.company.name()}`;

  
     // Step 1: Navigate to the login page
     await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('networkidle');

    // Login 

        await page.getByRole('textbox', { name: 'Enter your username' }).fill(VALID_USERNAME);
        await page.getByRole('textbox', { name: 'Your password' }).fill(VALID_PASSWORD);
        await page.getByRole('button', { name: 'Login' }).click();
    
    // Note: The page redirected to dashboard - user is already logged in
    await page.waitForLoadState('networkidle');
    console.log('Already logged in, on dashboard page');
          
    // Step 2: Click on Enquiry menu icon to expand
    
    console.log('Step 2: Expanding Enquiry menu...');
    await page.locator('img[src="/icons/Logo.svg"]').hover();
    await page.waitForTimeout(3000);

    // Step 3: Click on Enquiry menu item to see submenu
    console.log('Step 3: Opening Enquiry submenu...');
    await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
    await page.waitForTimeout(1000);


    // Step 4: Click on Internal Enquiry
    console.log('Step 4: Clicking on Internal Enquiry...');
    await page.getByRole('link', { name: 'Internal Enquiry' }).click();
    await page.waitForLoadState('networkidle');
    console.log('Internal Enquiry page loaded');

    // Step 5: Click on New Enquiry button
    console.log('Step 5: Clicking New Enquiry button...');
    await page.click('.common_btnPrimary__kVCfe.button_secondaryButton__Gj431');
    await page.waitForLoadState('networkidle');
    console.log('New Enquiry form opened');

       // Step 6: Select Enquiry Type as "Project"
   console.log('Step 6:Select the Enquiry type')
   await page.locator('div[class*="control"]').first().click();
await page.locator('div[class*="option"]', { hasText: 'Project' }).click();
     console.log('Enquiry Type selected: Project');
   
    // Step 7: Select Log Category as "CI - Cathodic Installations"
    console.log('Step 7: Selecting Log Category - CI - Cathodic Installations...');

    await page.locator('div.css-19bb58m input').nth(1).click();
    console.log('test');
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: 'CI - CI - Corrosion Inhibitors' }).click();
    console.log('Log Category selected: CI - CI - Corrosion Inhibitors');

    // Step 8: Select Priority as "B - Potential"
    console.log('Step 8: Selecting Priority - B - Potential...');
     await page.locator('div.css-19bb58m input').nth(2).click();
     await page.waitForTimeout(500);
    await page.getByRole('option', { name: 'B - Potential' }).click();
    console.log('Priority selected: B - Potential');

   // Step 9 : Select the customer drop down 

   // 1. Click and type in customer search
const customerInput = page.locator('input[placeholder="Search customer..."]');
await customerInput.click();
await customerInput.fill('Amit Agarwal');

// 2. Click the suggestion
const suggestion = page.locator(
  'div.searchDropDownPagination_suggestion_item__PSEfn',
  { hasText: 'Amit Agarwal 3755' }
);

await suggestion.waitFor({ state: 'visible' });
await suggestion.click();
console.log('Customer selected: Amit Agarwal 3755');

await page.waitForTimeout(3000);

    // Step 10: Enter Customer Reference as "CR123"
    console.log('Step 10: Entering Customer Reference - CR123...');
    await page.locator('#contractorReference').click();
    await page.locator('#contractorReference').fill('CR123');
    console.log('Customer Reference entered: CR123');

    // 1. Click and type in customer search
const ClientInput = page.locator('input[placeholder="Search client..."]');
await ClientInput.click();
await ClientInput.fill('Amit Agarwal');

// 2. Click the suggestion
const suggestion1 = page.locator(
  'div.searchDropDownPagination_suggestion_item__PSEfn',
  { hasText: 'Amit Agarwal 3755' }
);

await suggestion1.waitFor({ state: 'visible' });
await suggestion1.click();
console.log('Customer selected: Amit Agarwal 3755');

await page.waitForTimeout(3000);

    // Step 12: Search for Customer Contact "Sel"
    const input = page.getByRole('textbox', { name: 'Search Contacts' });
    await input.click();
     await input.type('sela', { delay: 100 });
     await page.waitForTimeout(500);
     const option = page.locator(`body >> text=sela`).first();
     await option.waitFor({ state: 'visible', timeout: 5000 });
     await option.click();
     console.log('✅ Customer contact : customer selected successfully');
     await page.locator('span', { hasText: 'sela' }).nth(2).click();
     await page.waitForTimeout(1000);
     console.log('✅ Customer contact "sela con" selected successfully');

     // Step 13 : Maer as Completed 
     console.log ( 'Select as Mark as completed ');
     await page.getByRole('button', { name: 'Mark as Default' }).click();
     console.log('Mark as defalut selected as successfully');


     // Step 17: Enter Project Title
   console.log(`Step 17: Entering Project Title - ${projectTitle}`);
   await page.locator('#projectTitle').fill(projectTitle);
   console.log(`Project Title entered: ${projectTitle}`);

    // Step 18: Enter Tender No
    console.log(`Step 18: Entering Tender No - ${tenderNo}`);
    await page.locator('#tenderNo').fill(tenderNo);
    console.log(`Tender No entered: ${tenderNo}`);

   await page.waitForSelector('input[role="combobox"]', { timeout: 20000 });

   /*const comboboxCount = await page.locator('input[role="combobox"]').count();
console.log("Combobox count:", comboboxCount);

for (let i = 0; i < comboboxCount; i++) {
  const id = await page.locator('input[role="combobox"]').nth(i).getAttribute('id');
  console.log(i, id);
}*/

const countryInput = page.locator('input[role="combobox"]').nth(3); // change index as per logs
await countryInput.click();
await countryInput.fill('India');
await page.keyboard.press('Enter');
await page.waitForTimeout(3000);



    // Scope
    await page.getByPlaceholder('Search Scope').fill('CI-001');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    console.log('✓ Scope added');
    // Step 21: Enter Description
   console.log(`Step 21: Entering Description - ${description}`);
   await page.locator('#Description').fill(description);
   console.log(`Description entered: ${description}`);

    // Step 22 : Select the received date 
    const day = new Date().getDate();
    await page.locator('input.sc-gEvDqW.hKYcdj').first().click();

    await page.locator(`//div[text()='${day}']`).click();
     
      //Step 23 : Select Last date 
       // 1. Open date picker (second input)
     await page.locator('input.sc-gEvDqW.hKYcdj').nth(1).click();

      // 2. Select date
       await page.locator('div[aria-label="Choose Saturday, April 4th, 2026"]').click();

       // Step 23: Select the Sales Engineer

       await page.locator('div.css-hlgwow').nth(4).click();
       await page.locator('input[role="combobox"]').nth(4).fill('Veeramani');
       await page.locator('div[role="option"]', { hasText: 'Veeramani' }).click();
       //Step 24: Select the Estimation Co-ordinator 

       console.log('Step 24: Select the Estimation Co-ordinator - "Veeramani"...');
       await page.locator('div.css-19bb58m input').nth(5).click();
       await page.waitForTimeout(500);
       await page.getByRole('option', { name: 'Veeramani' }).click();
       console.log('Select the Estimation Co-ordinator - "Veeramani"...');

       //Step 25: Select Proposal Engineer 
       
       console.log('Step 24: Select the Proposal Engineer - "Veeramani"...');
       await page.locator('div.css-19bb58m input').nth(6).click();
       await page.waitForTimeout(500);
       await page.getByRole('option', { name: 'Veeramani' }).click();
       console.log('Select the Estimation Co-ordinator - "Veeramani"...');

       //Step 26:  Select the followup watcher
       await page.locator('input[placeholder="Search Users"]').click();      
      const adminOption = page.locator('.ChipSelector_dropdownList__N0ZPo a[role="option"]', { hasText: /admin/i });
      await adminOption.first().click({ force: true });
      console.log('✅ Follow-up watcher "Admin" selected successfully');

      // Step 27 : Enter the Remarks 

      console.log("Step 27 : Enter the Remarks ");
      await page.locator('#Remarks').fill('This is a test remark for enquiry automation.');
      console.log("Enter the Remarks :This is a test remark for enquiry automation ");


      //Step 27 : Click Save Option 

      console.log('Step 26: Click Save Option ');
      await page.getByRole('button', { name: 'Save' }).click();
      console.log('Save button clicked ')
      await expect(page.getByRole('heading', { name: 'Enquiry Created' })).toBeVisible();
      const successMsg = page.locator('div.MuiDialogContent-root');
      await expect(successMsg).toContainText('Enquiry registered successfully.');
      const text = await successMsg.textContent();
      const match = text.match(/Enquiry No:\s*(\S+)/);
      const EnquiryNo=match?match[1]:null;
     
if (EnquiryNo) {
  console.log('✓ Enquiry Number captured:', EnquiryNo);
} else {
  console.log('✗ Enquiry Number not found');
}
 
});