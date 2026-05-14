const { test, expect } = require('@playwright/test');

test('Guest Info -  Guest Info List', async ({ page }) => {

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
  await page.goto('http://qa-accomodation.campneuron.com/app/bookings/guest-info');
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle');

  // Wait for table
  await page.waitForSelector('table tbody tr');

  // Extract & print users
  const users = await page.$$eval('table tbody tr', rows =>
    rows.map(row => {
      const cells = row.querySelectorAll('td');
      return {
        Name: cells[0]?.innerText.trim() || 'N/A',
        BookingId: cells[1]?.innerText.trim() || 'N/A',
        Company: cells[2]?.innerText.trim() || 'N/A',
        BedNo: cells[3]?.innerText.trim() || 'N/A',
        Checkin:cells[4]?.innerText.trim() || 'N/A',
        Checkout:cells[5]?.innerText.trim() || 'N/A'
      };
    })
  );

  console.table(users);
});


test('Guest Info -  Click the Booking Id', async ({ page }) => {

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
  await page.goto('http://qa-accomodation.campneuron.com/app/bookings/guest-info');
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle');

  // Click the Booking Id 
  await page.click('text="#BKG00000443"');
  await page.waitForTimeout(3000);

  // Scenario 2: No "Assign guest" button available - all beds assigned
    console.log('\n✓ No "Assign guest" option available - All beds have guests assigned');
    console.log('\n--- Printing All Bed Details ---\n');

    // Wait for table to load
    await page.locator('table tbody tr').first().waitFor();

    const rows = await page.locator('table tbody tr').all();

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.locator('td');

        console.log(`
  Bed ${i + 1}:
  Bed No: ${await cells.nth(0).innerText()}
  Bed Type: ${await cells.nth(1).innerText()}
  Guest Name: ${await cells.nth(2).innerText()}
  Check-In: ${await cells.nth(3).innerText()}
  Check-Out: ${await cells.nth(4).innerText()}
  Duration: ${await cells.nth(5).innerText()}
  Status: ${await cells.nth(6).innerText()}
---`);
    }

    console.log(`\nTotal beds displayed: ${rows.length}`);


  // Wait for table
  await page.waitForSelector('table tbody tr');

  // Extract & print users
  const users = await page.$$eval('table tbody tr', rows =>
    rows.map(row => {
      const cells = row.querySelectorAll('td');
      return {
        Name: cells[0]?.innerText.trim() || 'N/A',
        BookingId: cells[1]?.innerText.trim() || 'N/A',
        Company: cells[2]?.innerText.trim() || 'N/A',
        BedNo: cells[3]?.innerText.trim() || 'N/A',
        Checkin:cells[4]?.innerText.trim() || 'N/A',
        Checkout:cells[5]?.innerText.trim() || 'N/A'
      };
    })
  );

  console.table(users);
});
