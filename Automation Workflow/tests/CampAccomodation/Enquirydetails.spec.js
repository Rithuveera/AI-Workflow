const { test, expect } = require('@playwright/test');
test('Enquiry Details', async ({ page }) => {
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

test('Enquiry Details - Delete ', async ({ page }) => {
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
await page.locator('.hover\\:cursor-pointer > div > .injected-svg').first().click();
await page.waitForTimeout(3000);
console.log("Deleted first item successfully");


  
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

