 
  const { test, expect } = require('@playwright/test');
  const path = require('path');
  test('Booking',async({page})=>
  {
     console.log('Starting Camp Accommodation Booking Automation...');
    // Step 1 : Login 
    console.log(' Opening Login  page...');
    await page.goto('http://qa-accomodation.campneuron.com/');
    await page.waitForLoadState('networkidle');

    // Step 2: Enter the Username and password 
     await page.fill('input[name="email"]', 'admin@campaccomodation.com');
     await page.fill('input[name="password"]', 'Qwerty@#$2025');
     await page.click('button[type="submit"]');
     await page.waitForTimeout(3000);


       // Wait for navigation after login
    await page.waitForURL('**/app/bookings');
    console.log('Successfully logged in');

    // Step 3: Click on "New Booking" button
    console.log('Step 2: Clicking New Booking button...');
    await page.getByRole('button', { name: 'New Booking' }).click();
    await page.waitForURL('**/bookings/create');
    console.log('✓ New Booking form opened');

    // Step 4: Select Check-In Date (13 Nov 25)
      console.log('Step 3: Selecting Check-In date (13 Nov 25)...');
      await page.getByRole('button', { name: 'Select Check In' }).click();
    // Wait for datepicker popup to appear
      await page.waitForSelector('.react-datepicker', { state: 'visible', timeout: 10000 });
    // Click date "31 October 2025"
     await page.locator('.react-datepicker__day--013[aria-label*="November 13th, 2025"]').click();
      console.log('✓ Check-In date set to 13 Nov 25');

    // Step 5: Select Check-Out Date (15 Nov 25)
     await page.getByRole('button', { name: 'Select Check Out' }).click();
   // Wait for datepicker popup to appear
     await page.waitForSelector('.react-datepicker', { state: 'visible', timeout: 10000 });
   // Click date "10th Novenber 2025"
     await page.getByRole('gridcell', { name: /November 15th, 2025/i }).click();
     console.log('✓ Check-Out date set to 15th Nov 25');

    // Step 6: Verify company is already selected as "new2"
    console.log('Step 5: Verifying company selection...');
    
     // Click the "Company" dropdown
      await page.getByRole('button', { name: /Company/i }).click();
      await page.waitForTimeout(500); // wait for dropdown animation

       // Select the desired company option
      await page.getByRole('option', { name: 'Algo Industry' }).click();

      console.log('✓ Company "Algosium " is  selected');

    // Step 7: Add 2 guests to Premium room type
    console.log('Step 6: Adding 2 guests to Premium room...');
    // Click the increase button for Premium (4th room type, index 3)
    const senior122IncreaseBtn = page.getByRole('button', { name: 'Increase room count' }).nth(3);
    await senior122IncreaseBtn.click(); // First click - adds 1 guest
    await page.waitForTimeout(500);
    console.log('✓ Added 1 guests to Premium room');

    // Step 8: Click "Check Availability" button
    console.log('Step 7: Checking availability...');
    await page.getByRole('button', { name: 'Check Availability' }).click();
    await page.waitForTimeout(1000);
    await page.waitForSelector('button:has-text("Create Booking")', { state: 'visible' });
    console.log('✓ Availability confirmed');

    // Step 9: Click "Create Booking" button
    console.log('Step 8: Creating booking...');
    await page.getByRole('button', { name: 'Create Booking' }).click();
    await page.waitForURL('**/bookings/create/complete');
    console.log('✓ Booking created successfully');

    // Step 10: Verify booking confirmation
    console.log('Step 9: Verifying booking confirmation...');
    await page.waitForSelector('h3:has-text("Thank you! You are all set")', { state: 'visible' });
    await expect(page.getByText('Thank you! You are all set')).toBeVisible();
  
    // Verify the Booking ID 
     const bookingIdElement = await page.locator('span.font-bold.text-primary-900');
     const bookingId = (await bookingIdElement.textContent()).trim();
     console.log(`✅ Booking ID captured: ${bookingId}`);

     // Optional: Navigate back to bookings list
     await page.getByRole('link', { name: 'Go to bookings' }).click();
     console.log('Go to Bookings click successfully')

     // Verify the Bookings page 
     const bookingsHeader = page.locator('h2', { hasText: 'Bookings' });
     await expect(bookingsHeader).toBeVisible({ timeout: 5000 });
     
});

test('Edit Booking', async({page})=>
    {
     console.log('Starting Camp Accommodation Edit Booking Automation...');

    // Step 1 : Login 
    console.log(' Opening Login  page...');
    await page.goto('http://qa-accomodation.campneuron.com/');
    await page.waitForLoadState('networkidle');

    // Step 2: Enter the Username and password 
     await page.fill('input[name="email"]', 'admin@campaccomodation.com');
     await page.fill('input[name="password"]', 'Qwerty@#$2025');
     await page.click('button[type="submit"]');
     await page.waitForTimeout(3000);


     // Wait for navigation after login
    await page.waitForURL('**/app/bookings');
    console.log('Successfully logged in');

    // Step 3: Find and click the three-dot menu for the first "Awaiting Confirmation" booking
    console.log('Step 2: Finding booking with "Awaiting Confirmation" status...');
    
    // Wait for the table to load
    await page.waitForSelector('table');
    
    // Find the first row with "Awaiting Confirmation" status
    const awaitingConfirmationRow = await page.locator('tr:has-text("Awaiting Confirmation")').first();
    
    // Extract booking ID for reference
    const bookingIdCell = await awaitingConfirmationRow.locator('td').first();
    const bookingId = await bookingIdCell.textContent();
    console.log(`✓ Found booking: ${bookingId} with "Awaiting Confirmation" status`);

    // Click the three-dot menu button in that row
    console.log('Step 3: Clicking three-dot menu...');
    const threeDotButton = await awaitingConfirmationRow.locator('button').last();
    await threeDotButton.click();
    await page.waitForTimeout(500);
    console.log('✓ Three-dot menu opened');

    // Step 4: Click "Edit" option from the popup menu
    console.log('Step 4: Clicking Edit option...');
    await page.locator('text=Edit').click();
    await page.waitForURL('**/bookings/edit/**');
    console.log('✓ Edit booking page opened');

    // Step 5: Capture current booking details
    console.log('Step 5: Capturing current booking details...');
    const checkindateloc = page.locator('div[aria-label="Select Check In"] > span');
    await checkindateloc.waitFor({ state: 'visible', timeout: 15000 });
    const checkindate = (await checkindateloc.textContent())?.trim() || 'Not Found';
    console.log(`📅 Check Out Date: ${checkindate}`);

    const checkOutLocator = page.locator('div[aria-label="Select Check Out"] > span');
    await checkOutLocator.waitFor({ state: 'visible', timeout: 15000 });
    const checkOutDate = (await checkOutLocator.textContent())?.trim() || 'Not Found';
    console.log(`📅 Check Out Date: ${checkOutDate}`);     
       
    // Step 6: Modify booking - Add 2 guests to "Ten" room type
    console.log('Step 7: Adding 2 guests to "Manager" room type...');
    
    // Find the Ten room section and its increase button
    const MgrIncreaseBtn = await page.getByRole('button', { name: 'Increase room count' }).first();
    
    // Click twice to add 2 guests
    await MgrIncreaseBtn.click();
    await page.waitForTimeout(500);
    console.log('✓ Added 1st guest to Manager room');
    
    await MgrIncreaseBtn.click();
    await page.waitForTimeout(500);
    console.log('✓ Added 2nd guest to Manager  room');

    // Step 7: Click "Check Availability" button
    console.log('Step 8: Checking availability...');
    await page.getByRole('button', { name: 'Check Availability' }).click();
    await page.waitForTimeout(1000);
    
    // Wait for "Update Booking" button to appear
    await page.waitForSelector('button:has-text("Update Booking")', { state: 'visible' });
    console.log('✓ Availability confirmed');

    // Step 8: Click "Update Booking" button
    console.log('Step 10: Updating booking...');
    await page.getByRole('button', { name: 'Update Booking' }).click();
    await page.waitForURL('**/bookings/edit/**/complete');
    console.log('✓ Booking updated successfully');

    // Step 9: Verify update confirmation
    console.log('Step 11: Verifying update confirmation...');
    await page.waitForSelector('h3:has-text("DONE!")', { state: 'visible' });
    const doneText = await page.locator('h3.text-3xl.text-typography-900.font-semibold').textContent();
    console.log(`✅ Heading text: ${doneText.trim()}`);

    const bookingIdLocator = page.locator('span.font-bold.text-primary-900');
    await bookingIdLocator.waitFor({ state: 'visible', timeout: 15000 });
    const BookingId = (await bookingIdLocator.textContent())?.trim();
    console.log(`✅ Booking ID captured: ${BookingId}`);    
   

    // Step 10: Take screenshot of confirmation page
    const screenshot = (await page.locator('span.font-bold.text-primary-900').textContent())?.trim();
const screenshotPath = path.join('C:\\Users\\veeramani\\Desktop\\playwright-mcp', 'screenshots', `final-page-${screenshot.replace('#', '')}.png`);

await page.screenshot({
  path: screenshotPath,
  fullPage: true
});

console.log(`✅ Screenshot saved at: ${screenshotPath}`);
    // Optional: Go back to bookings list

     await page.getByRole('link', { name: 'Go to bookings' }).click();
     console.log('Go to Bookings click successfully')

     // Verify the Bookings page 
     const bookingsHeader = page.locator('h2', { hasText: 'Bookings' });
     await expect(bookingsHeader).toBeVisible({ timeout: 5000 });

    // Wait a bit before closing to see the result
      await page.waitForTimeout(3000);
    });

    test('Confirm Booking', async({page})=>
    {
     console.log('Starting Camp Accommodation Edit Booking Automation...');

    // Step 1 : Login 
    console.log(' Opening Login  page...');
    await page.goto('http://qa-accomodation.campneuron.com/');
    await page.waitForLoadState('networkidle');

    // Step 2: Enter the Username and password 
     await page.fill('input[name="email"]', 'admin@campaccomodation.com');
     await page.fill('input[name="password"]', 'Qwerty@#$2025');
     await page.click('button[type="submit"]');
     await page.waitForTimeout(3000);


     // Wait for navigation after login
    await page.waitForURL('**/app/bookings');
    console.log('Successfully logged in');

    // Step 3: Find and click the three-dot menu for the first "Awaiting Confirmation" booking
    console.log('Step 2: Finding booking with "Awaiting Confirmation" status...');
    
    // Wait for the table to load
    await page.waitForSelector('table');
    
    // Find the first row with "Awaiting Confirmation" status
    const awaitingConfirmationRow = await page.locator('tr:has-text("Awaiting Confirmation")').first();
    
    // Extract booking ID for reference
    const bookingIdCell = await awaitingConfirmationRow.locator('td').first();
    const bookingId = await bookingIdCell.textContent();
    console.log(`✓ Found booking: ${bookingId} with "Awaiting Confirmation" status`);


    // Click Confirm option 

    await page.getByRole('button', { name: 'Confirm' }).nth(0).click(); 
    await page.waitForTimeout(3000);

    // Click Confirm Booking Option

    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await page.waitForTimeout(3000);
  
   // Wait for confirmation message to appear
await page.waitForSelector('p:has-text("Booking")', { state: 'visible', timeout: 10000 });

// Get full confirmation text
const confirmationText = await page.locator('p:has-text("Booking")').textContent();

// Extract booking ID and status from text like: "Booking #BKG00000107 is Confirmed"
const bookingIdMatch = confirmationText.match(/#\w+/)?.[0];
const statusMatch = confirmationText.match(/is\s+(\w+)/)?.[1];

// Extract Check-in and Check-out dates
const checkIn = await page.locator('span.text-xl.font-bold').nth(0).textContent();
const checkOut = await page.locator('span.text-xl.font-bold').nth(1).textContent();

// Extract Company and Project
const company = await page.locator('p.text-lg.font-normal').nth(0).textContent();
const project = await page.locator('p.text-lg.font-normal').nth(1).textContent();

await page.waitForSelector('span.text-lg.truncate', { state: 'visible', timeout: 10000 });

// Print all values
console.log('============================');
console.log(`Booking ID   : ${bookingIdMatch}`);
console.log(`Status       : ${statusMatch}`);
console.log(`Check-In     : ${checkIn}`);
console.log(`Check-Out    : ${checkOut}`);
console.log(`Company      : ${company}`);
console.log(`Project      : ${project}`);
console.log('============================');
// Step 12: Take screenshot of confirmation page
    const screenshot = (await page.locator('span.font-bold.text-primary-900').textContent())?.trim();
const screenshotPath = path.join('C:\\Users\\veeramani\\Desktop\\playwright-mcp', 'screenshots', `final-page-${screenshot.replace('#', '')}.png`);

await page.screenshot({
  path: screenshotPath,
  fullPage: true
});

console.log(`✅ Screenshot saved at: ${screenshotPath}`);
   // Optional: Go back to bookings list

     await page.getByRole('link', { name: 'Go to bookings' }).click();
     console.log('Go to Bookings click successfully')

     // Verify the Bookings page 
     const bookingsHeader = page.locator('h2', { hasText: 'Bookings' });
     await expect(bookingsHeader).toBeVisible({ timeout: 5000 });

    // Wait a bit before closing to see the result
      await page.waitForTimeout(3000);
    });


   
     test('Booking List page ', async({page})=>
    {
     console.log('Starting Camp Accommodation Edit Booking Automation...');

    // Step 1 : Login 
    console.log(' Opening Login  page...');
    await page.goto('http://qa-accomodation.campneuron.com/');
    await page.waitForLoadState('networkidle');

    // Step 2: Enter the Username and password 
     await page.fill('input[name="email"]', 'admin@campaccomodation.com');
     await page.fill('input[name="password"]', 'Qwerty@#$2025');
     await page.click('button[type="submit"]');
     await page.waitForTimeout(3000);


     // Wait for navigation after login
    await page.waitForURL('**/app/bookings');
    console.log('Successfully logged in');

       // Wait for table to load
      await page.waitForSelector('table', { timeout: 5000 });
      
      // Extract bookings from current page
      const bookings = await page.evaluate(() => {
        const rows = document.querySelectorAll('table tbody tr');
        const bookingData = [];
        
        rows.forEach((row, index) => {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 9) {
            bookingData.push({
              rowNumber: index + 1,
              bookingId: cells[0]?.textContent?.trim() || '',
              company: cells[1]?.textContent?.trim() || '',
              project: cells[2]?.textContent?.trim() || '',
              count: cells[3]?.textContent?.trim() || '',
              checkIn: cells[4]?.textContent?.trim() || '',
              checkOut: cells[5]?.textContent?.trim() || '',
              duration: cells[6]?.textContent?.trim() || '',
              status: cells[7]?.textContent?.trim() || '',
              action: cells[8]?.textContent?.trim() || ''
            });
          }
        });
        
        return bookingData;
      });
      
      // Print bookings from current page
      bookings.forEach((booking, index) => {
        console.log(`Booking #${index + 1}:`);
        console.log(`  Booking ID: ${booking.bookingId}`);
        console.log(`  Company: ${booking.company}`);
        console.log(`  Project: ${booking.project}`);
        console.log(`  Guest Count: ${booking.count}`);
        console.log(`  Check-In Date: ${booking.checkIn}`);
        console.log(`  Check-Out Date: ${booking.checkOut}`);
        console.log(`  Duration: ${booking.duration}`);
        console.log(`  Status: ${booking.status}`);
        console.log(`  Available Action: ${booking.action}`);
        console.log('  ---');
      });
          });
