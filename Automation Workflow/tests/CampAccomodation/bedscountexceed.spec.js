const { test, expect } = require('@playwright/test');
test('Enquiry Details - Save Enquiry ', async ({ page }) => {
    try
    {

  // Login
  console.log('Opening Login page...');
  await page.goto(
    'https://auth-accomodation.campneuron.com/realms/identity-server/protocol/openid-connect/auth?client_id=accommodation_qa&redirect_uri=https%3A%2F%2Fqa-accomodation.campneuron.com%2F'
  );
  await page.waitForLoadState('networkidle');

  await page.fill('input[name="username"]', 'rithuveera');
  await page.fill('input[name="password"]', 'Rithu@13');
  await page.getByRole('button', { name: 'LOGIN' }).click();

   // Wait for navigation after login
    await page.waitForURL('**/app/bookings/list');
    console.log('Successfully logged in');

  // Navigate to User Management
  await page.goto('https://qa-accomodation.campneuron.com/app/bookings/list');
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle');

 // Step 3: Click on "New Booking" button
    console.log('Step 2: Clicking New Booking button...');
    await page.getByRole('button', { name: 'New Booking' }).click();
    await page.waitForURL('**/bookings/create');
    console.log('✓ New Booking form opened');

    // Step 4: Select Check-In Date (13 Nov 25)
      console.log('Step 3: Selecting Check-In date (22 Jan 25)...');
      await page.getByRole('button', { name: 'Select Check In' }).click();
    // Wait for datepicker popup to appear
      await page.waitForSelector('.react-datepicker', { state: 'visible', timeout: 10000 });
    // Click Check in date 
     await page.locator('.react-datepicker__day--022[aria-label*="January 22nd, 2026"]').click();
      console.log('✓ Check-In date set to 22 Jan 26');

    // Step 5: Select Check-Out Date (15 Nov 25)
     await page.getByRole('button', { name: 'Select Check Out' }).click();
   // Wait for datepicker popup to appear
     await page.waitForSelector('.react-datepicker', { state: 'visible', timeout: 10000 });
   // Click date "10th Novenber 2025"
     await page.getByRole('gridcell', { name: /January 25th, 2026/i }).click();
     console.log('✓ Check-Out date set to 25th Jan 26');

    // Step 6: Verify company is already selected as "new2"
    console.log('Step 5: Verifying company selection...');
    
     // Click the "Company" dropdown
      await page.getByRole('button', { name: /Company/i }).click();
      await page.waitForTimeout(500); // wait for dropdown animation

       // Select the desired company option
      await page.getByRole('option', { name: 'Evernorth industry private limited' }).click();

      console.log('✓ Company "Evernorth industry private limited " is  selected');

    // Step 7: Add 2 guests to Premium room type
    console.log('Step 6: Adding 2 guests to Proj Mgr room...');
    // Click the increase button for Premium (4th room type, index 3)
    const IncreaseBtn = page.getByRole('button', { name: 'Increase room count' }).nth(7);
    await IncreaseBtn.click(); // First click - adds 1 guest
    await page.waitForTimeout(500);
     await IncreaseBtn.click(); // First click - adds 1 guest
    await page.waitForTimeout(500);
    console.log('✓ Added 2 guests to Premium room');

    // Step 8: Click "Check Availability" button
    console.log('Step 7: Checking availability...');
    await page.getByRole('button', { name: 'Check Availability' }).click();
    await page.waitForTimeout(1000);
    
    // Click Save Enquiry 

    await page.getByRole('button', { name: 'Save as enquiry' }).click();
    await page.waitForTimeout(3000);

    // Wait for confirmation header
await page.getByText('Thank you! You are all set').waitFor();

// 1. Success message
const successMessage = await page.locator('h3').textContent();
console.log('Success Message:', successMessage?.trim());

// 2. Enquiry number
const enquiryNumber = await page.locator('p:has-text("Enquiry") span').textContent();
console.log('Enquiry Number:', enquiryNumber?.trim());

// 3. Check-in & Check-out dates
const checkInDate = await page.locator('span:text("CHECK IN")').locator('..').locator('span').nth(1).textContent();
const checkOutDate = await page.locator('span:text("CHECK OUT")').locator('..').locator('span').nth(1).textContent();

console.log('Check-in Date:', checkInDate?.trim());
console.log('Check-out Date:', checkOutDate?.trim());

// 4. Company name
const companyName = await page.locator('p:text("Company")')
  .locator('..')
  .locator('p')
  .nth(1)
  .textContent();

console.log('Company:', companyName?.trim());

// 5. Project name
const projectName = await page.locator('p:text("Project")')
  .locator('..')
  .locator('p')
  .nth(1)
  .textContent();

console.log('Project:', projectName?.trim());


// 7. Navigation link
await page.getByRole('link', { name: 'Go to enquiries' }).click();
await page.waitForTimeout(3000);

// Extract enquiry details
const users = await page.$$eval('table tbody tr', rows =>
  rows.map(row => {
    const cells = row.querySelectorAll('td');
    return {
      BOOKINGID: cells[0]?.innerText.trim() || 'N/A',
      Company: cells[1]?.innerText.trim() || 'N/A',
      Project: cells[2]?.innerText.trim() || 'N/A',
      Count: cells[3]?.innerText.trim() || 'N/A',
      Checkin: cells[4]?.innerText.trim() || 'N/A',
      Checkout: cells[5]?.innerText.trim() || 'N/A',
      Duration: cells[6]?.innerText.trim() || 'N/A',
      Status: cells[7]?.innerText.trim() || 'N/A',
      Action: cells[8]?.innerText.trim() || 'N/A',
    };
  })
);
console.table(users);



}

   catch (error) {
    console.error('Error:', error);
  } 
});

test('Enquiry Details - Update Enquiry  ', async ({ page }) => {
    try
    {

  // Login
  console.log('Opening Login page...');
  await page.goto(
    'https://auth-accomodation.campneuron.com/realms/identity-server/protocol/openid-connect/auth?client_id=accommodation_qa&redirect_uri=https%3A%2F%2Fqa-accomodation.campneuron.com%2F'
  );
  await page.waitForLoadState('networkidle');

  await page.fill('input[name="username"]', 'rithuveera');
  await page.fill('input[name="password"]', 'Rithu@13');
  await page.getByRole('button', { name: 'LOGIN' }).click();

   // Wait for navigation after login
    await page.waitForURL('**/app/bookings/list');
    console.log('Successfully logged in');

  // Navigate to User Management
  await page.goto('https://qa-accomodation.campneuron.com/app/bookings/list');
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle');

  // Click Enquiry Details 

   await page.getByRole('button', { name: 'Enquiry details' }).click();
   await page.waitForTimeout(3000);

 //  Get all the items in the list
await page.locator('tbody tr button:has-text("Details")').first().click();
await page.waitForTimeout(3000);
console.log("Click Details icon for first item in the list ");

// Step 4: Select Check-In Date (13 Nov 25)
      console.log('Step 3: Selecting Check-In date (22 Jan 25)...');
      await page.getByRole('button', { name: 'Select Check In' }).click();
    // Wait for datepicker popup to appear
      await page.waitForSelector('.react-datepicker', { state: 'visible', timeout: 10000 });
    // Click Check in date 
     await page.locator('.react-datepicker__day--022[aria-label*="January 22nd, 2026"]').click();
      console.log('✓ Check-In date set to 22 Jan 26');

    //  Select Check-Out Date (15 Nov 25)
     await page.getByRole('button', { name: 'Select Check Out' }).click();
   // Wait for datepicker popup to appear
     await page.waitForSelector('.react-datepicker', { state: 'visible', timeout: 10000 });
   // Click date "10th Novenber 2025"
     await page.getByRole('gridcell', { name: /January 25th, 2026/i }).click();
     console.log('✓ Check-Out date set to 25th Jan 26');

    // Verify company is already selected as "new2"
    console.log('Step 5: Verifying company selection...');
    
     // Click the "Company" dropdown
      await page.getByRole('button', { name: /Company/i }).click();
      await page.waitForTimeout(500); // wait for dropdown animation

       // Select the desired company option
      await page.getByRole('option', { name: 'Evernorth industry private limited' }).click();

      console.log('✓ Company "Evernorth industry private limited " is  selected');

    //  Add 2 guests to Premium room type
    console.log('Step 6: Adding 2 guests to Proj Mgr room...');
    // Click the increase button for Premium (4th room type, index 3)
    const IncreaseBtn = page.getByRole('button', { name: 'Increase room count' }).nth(7);
    await IncreaseBtn.click(); // First click - adds 1 guest
    await page.waitForTimeout(500);
     await IncreaseBtn.click(); // First click - adds 1 guest
    await page.waitForTimeout(500);
    console.log('✓ Added 2 guests to Premium room');

    // Click "Check Availability" button
    console.log('Step 7: Checking availability...');
    await page.getByRole('button', { name: 'Check Availability' }).click();
    await page.waitForTimeout(1000);

    // Click Update Enquiry 
    await page.getByRole('button',{name:'Update enquiry'}).click();
    
// 1. Success message
const successMessage = await page.locator('h3').textContent();
console.log('Success Message:', successMessage?.trim());

// 2. Enquiry number
const enquiryNumber = await page.locator('p:has-text("Enquiry") span').textContent();
console.log('Enquiry Number:', enquiryNumber?.trim());

// 3. Check-in & Check-out dates
const checkInDate = await page.locator('span:text("CHECK IN")').locator('..').locator('span').nth(1).textContent();
const checkOutDate = await page.locator('span:text("CHECK OUT")').locator('..').locator('span').nth(1).textContent();

console.log('Check-in Date:', checkInDate?.trim());
console.log('Check-out Date:', checkOutDate?.trim());

// 4. Company name
const companyName = await page.locator('p:text("Company")')
  .locator('..')
  .locator('p')
  .nth(1)
  .textContent();

console.log('Company:', companyName?.trim());

// 5. Project name
const projectName = await page.locator('p:text("Project")')
  .locator('..')
  .locator('p')
  .nth(1)
  .textContent();

console.log('Project:', projectName?.trim());


// 7. Navigation link
await page.getByRole('link', { name: 'Go to enquiries' }).click();
await page.waitForTimeout(3000);

// Print the enquiry related details 

   // Wait for table rows
await page.waitForSelector('table tbody tr');

// Extract enquiry details
const users = await page.$$eval('table tbody tr', rows =>
  rows.map(row => {
    const cells = row.querySelectorAll('td');
    return {
      BOOKINGID: cells[0]?.innerText.trim() || 'N/A',
      Company: cells[1]?.innerText.trim() || 'N/A',
      Project: cells[2]?.innerText.trim() || 'N/A',
      Count: cells[3]?.innerText.trim() || 'N/A',
      Checkin: cells[4]?.innerText.trim() || 'N/A',
      Checkout: cells[5]?.innerText.trim() || 'N/A',
     // Duration: cells[6]?.innerText.trim() || 'N/A',
      //Status: cells[7]?.innerText.trim() || 'N/A',
      //Action: cells[8]?.innerText.trim() || 'N/A',
    };
  })
);
console.table(users);

}

   catch (error) {
    console.error('Error:', error);
  } 
});


