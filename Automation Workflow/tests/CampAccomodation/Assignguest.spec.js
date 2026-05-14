const{test,expect}=require('@playwright/test')

test('AssignGuest',async({page})=>
{

  try {
    // Step 1: Navigate to the URL
    await page.goto('http://qa-accomodation.campneuron.com/');
    console.log('✓ Navigated to the accommodation booking system');

    // Step 2: Wait for the bookings page to load
    await page.waitForLoadState('networkidle');
    console.log('✓ Page loaded successfully');

    // Step 3: Enter the Username and password 
     await page.fill('input[name="email"]', 'admin@campaccomodation.com');
     await page.fill('input[name="password"]', 'Qwerty@#$2025');
     await page.click('button[type="submit"]');
     await page.waitForTimeout(3000);


       // Wait for navigation after login
    await page.waitForURL('**/app/bookings');
    console.log('Successfully logged in');
 // Step 3: Click on the first "Check-In" button for booking BKG00000159
    await page.getByRole('button', { name: 'Check-In' }).first().click();
    console.log('✓ Clicked Check-In button for first booking');

    // Step 4: Wait for the assign guest page to load
    await page.waitForLoadState('networkidle');
    console.log('✓ Assign Guest list page loaded');
    await page.waitForTimeout(3000);
   // Print the selected bed information
   const rows = await page.locator('table tbody tr').all();
   for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const bedNo = await row.locator('td').first().innerText();
  console.log(`Bed ${i + 1} No:`, bedNo);
}
    // Get company and project info
    const company = await page.locator('div:has(p:has-text("Company -")) > p:nth-of-type(2)').innerText();
    await page.waitForTimeout(1000);
    const project = await page.locator('div:has(p:has-text("Project -")) > p:nth-of-type(2)').innerText();
    await page.waitForTimeout(1000);
    console.log('Company:', company);
    console.log('Project:', project);

   // Debug: show all button text Playwright sees
    const allButtons = await page.getByRole('button').allInnerTexts();
    console.log("Buttons Playwright sees:\n", allButtons);

    const assignGuestButtons = await page.getByRole('button', { name: /assign guest/i }).all();
    console.log("Found Assign Guest Buttons:", assignGuestButtons.length);
    if (assignGuestButtons.length > 0) {
    console.log(`\n✓ Found ${assignGuestButtons.length} "Assign guest" button(s)`);

    // Click the first one
    await assignGuestButtons[0].scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await assignGuestButtons[0].click({ force: true });
    console.log('✓ Clicked first "Assign guest" button');

    // Wait for the assign guest form to appear
    await page.waitForSelector('text=/selected bed/i', { timeout: 15000 });
    console.log('✓ Assign Guest form loaded');

    // Step 6: Upload Emirates ID document
    
    console.log('\n--- Uploading Emirates ID ---');

    const fileInput=await page.locator('input[name="idProofFile"]');

    await fileInput.setInputFiles('C:/Users/veeramani/Desktop/playwright-mcp/emirates.jpeg');
    console.log('✓ Emirates ID uploaded successfully');

    await page.waitForTimeout(1000);

    // Step 7: Click Next button
    await page.getByRole('button', { name: /next/i }).click();
    console.log('✓ Clicked Next button');
    await page.waitForTimeout(2000);
    //Enter the first name 
    const firstname =' John';
    await page.locator('input[name="firstName"]').fill(firstname);
    console.log('Enter firstname as :',firstname );

    // Enter the last name 
    const lastname ='RVs';
    await page.locator('input[name="lastName"]').fill(lastname);
    console.log('Entered lastname as :',lastname);

    // Enter Employee Number 
    const enumber='101';
    await page.locator('input[name="employeeNumber"]').fill(enumber);
    console.log('Entered Employeenumber as :',enumber);

    // Enter the Nationality 
    const nationality='Indian';
    await page.locator('input[name="nationality"]').fill(nationality);
    console.log('Entered Nationality as :',nationality);

    // Enter the designation

    const designation ='Tech';
    await page.locator('input[name="designation"]').fill(designation);
    console.log('Entered designation',designation);

    //Enter the company 
    const company='Bss Tech';
    await page.locator('input[name="companyName"]').fill(company);
    console.log('Entered company as :',company);

    //Enter the supervisor name 
    const supervisor='Sella';
    await page.locator('input[name="supervisorName"]').fill(supervisor);
    console.log('Entered supervisor as :',supervisor);

    //Enter the contact number
    const contactNumber= '8782782878';
    await page.locator('input[name="contactNumber"]').fill(contactNumber);
    console.log('Entered the contact number :',contactNumber);

    // Enter the emergency number
    const eno= '9838912232';
    await page.locator('input[name="emergencyNumber"]').fill(eno);
    console.log('Entered emergency number :',eno);

    // Select the meal plan 
    // Click the dropdown
   await page.getByLabel('Select Meal').click();  
    await page.locator('span', { hasText: 'Indian' }).click();
    console.log('Meal plan selected successfully');
   // Optional: Wait a bit for selection to register
    await page.waitForTimeout(500);
    
    // Click Continue

    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(3000);

    // Verfiy the success message 


} else {
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
}


  
  } catch (error) {
    console.error('Error:', error);
  } 
});



test('AssignGuest - View ',async({page})=>
{

  try {
    // Step 1: Navigate to the URL
    await page.goto('http://qa-accomodation.campneuron.com/');
    console.log('✓ Navigated to the accommodation booking system');

    // Step 2: Wait for the bookings page to load
    await page.waitForLoadState('networkidle');
    console.log('✓ Page loaded successfully');

    // Step 3: Enter the Username and password 
     await page.fill('input[name="email"]', 'admin@campaccomodation.com');
     await page.fill('input[name="password"]', 'Qwerty@#$2025');
     await page.click('button[type="submit"]');
     await page.waitForTimeout(3000);


       // Wait for navigation after login
    await page.waitForURL('**/app/bookings');
    console.log('Successfully logged in');
 // Step 3: Click on the first "Check-In" button for booking BKG00000159
    await page.getByRole('button', { name: 'Check-In' }).first().click();
    console.log('✓ Clicked Check-In button for first booking');

    // Step 4: Wait for the assign guest page to load
    await page.waitForLoadState('networkidle');
    console.log('✓  Guest details list page loaded');
    await page.waitForTimeout(3000);
   // Print the selected bed information
   const rows = await page.locator('table tbody tr').all();
   for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const bedNo = await row.locator('td').first().innerText();
  console.log(`Bed ${i + 1} No:`, bedNo);
}
    // Get company and project info
    const company = await page.locator('div:has(p:has-text("Company -")) > p:nth-of-type(2)').innerText();
    await page.waitForTimeout(1000);
    const project = await page.locator('div:has(p:has-text("Project -")) > p:nth-of-type(2)').innerText();
    await page.waitForTimeout(1000);
    console.log('Company:', company);
    console.log('Project:', project);

   // Debug: show all button text Playwright sees
    const allButtons = await page.getByRole('button').allInnerTexts();
    console.log("Buttons Playwright sees:\n", allButtons);

    const GuestdetaiilsButtons = await page.getByRole('button', { name: /Guest Details/i }).all();
    console.log("Found Assign Guest Buttons:", GuestdetaiilsButtons.length);
    if (GuestdetaiilsButtons.length > 0) {
    console.log(`\n✓ Found ${GuestdetaiilsButtons.length} "Guest guest" Details(s)`);

    // Click the first one
    await GuestdetaiilsButtons[0].scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await GuestdetaiilsButtons[0].click({ force: true });
    console.log('✓ Clicked first "Guest details" button');
    console.log(`\nTotal beds displayed: ${rows.length}`);
}

 console.log('Check-In page loaded.');

    console.log('Guest Details page loaded. Extracting information...');

    // Extract all guest details
    const guestDetails = {
      bookingId: await page.locator('h2:has-text("Booking ID")').textContent(),
      checkIn:  await page.locator('div[aria-label="Select Check In"] span.font-semibold.text-base.tracking-tight.text-typography-200')
  .textContent(),
      checkOut:await page.locator('div[aria-label="Select Check Out"] span.font-semibold.text-base.tracking-tight.text-typography-200')
  .textContent(),
      company: await page.getByRole('button', { name: /^companyId/ }).locator('span.font-semibold.text-base.tracking-tight.text-typography-200')
  .textContent(),
      firstName:  await page.locator('input[name="firstName"]').inputValue(),
      lastName:  await page.locator('input[name="lastName"]').inputValue(),
      employeeNumber:  await page.locator('input[name="employeeNumber"]').inputValue(),
      nationality: await page.locator('input[name="nationality"]').inputValue(),
      designation:  await page.locator('input[name="designation"]').inputValue(),
      companyOrg: await page.locator('input[name="companyName"]').inputValue(),
      supervisorName:  await page.locator('input[name="supervisorName"]').inputValue(),
      contactNumber: await page.locator('input[name="contactNumber"]').inputValue(),
      emergencyNumber:  await page.locator('input[name="emergencyNumber"]').inputValue(),
      mealPreference: await page
  .getByRole('button', { name: /Select Meal/i }).locator('span.font-semibold.text-base.tracking-tight.text-typography-200').textContent(),
    };

    // Get document links
    const documents = await page.locator('a[href*="manpower-document"]').allTextContents();

    console.log('\n=== GUEST DETAILS ===');
    console.log('Booking ID:', guestDetails.bookingId);
    console.log('Check In:', guestDetails.checkIn);
    console.log('Check Out:', guestDetails.checkOut);
    console.log('Company:', guestDetails.company);
    console.log('\nPersonal Information:');
    console.log('First Name:', guestDetails.firstName);
    console.log('Last Name:', guestDetails.lastName);
    console.log('Employee Number:', guestDetails.employeeNumber || '(N/A)');
    console.log('Nationality:', guestDetails.nationality);
    console.log('Designation:', guestDetails.designation || '(N/A)');
    console.log('Company/Organization:', guestDetails.companyOrg || '(N/A)');
    console.log('Supervisor Name:', guestDetails.supervisorName || '(N/A)');
    console.log('Contact Number:', guestDetails.contactNumber || '(N/A)');
    console.log('Emergency Number:', guestDetails.emergencyNumber || '(N/A)');
    console.log('Meal Preference:', guestDetails.mealPreference);
    console.log('\nAvailable Documents:', documents.map(doc => doc.trim()).join(', '));

    // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });
     
  } catch (error) {
    console.error('Error:', error);
  } 
});

test('AssignGuest - Edit  ',async({page})=>
{

  try {
    // Step 1: Navigate to the URL
    await page.goto('http://qa-accomodation.campneuron.com/');
    console.log('✓ Navigated to the accommodation booking system');

    // Step 2: Wait for the bookings page to load
    await page.waitForLoadState('networkidle');
    console.log('✓ Page loaded successfully');

    // Step 3: Enter the Username and password 
     await page.fill('input[name="email"]', 'admin@campaccomodation.com');
     await page.fill('input[name="password"]', 'Qwerty@#$2025');
     await page.click('button[type="submit"]');
     await page.waitForTimeout(3000);


       // Wait for navigation after login
    await page.waitForURL('**/app/bookings');
    console.log('Successfully logged in');
 // Step 3: Click on the first "Check-In" button for booking BKG00000159
    await page.getByRole('button', { name: 'Check-In' }).first().click();
    console.log('✓ Clicked Check-In button for first booking');

    // Step 4: Wait for the assign guest page to load
    await page.waitForLoadState('networkidle');
    console.log('✓  Guest details list page loaded');
    await page.waitForTimeout(3000);
   // Print the selected bed information
   const rows = await page.locator('table tbody tr').all();
   for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const bedNo = await row.locator('td').first().innerText();
  console.log(`Bed ${i + 1} No:`, bedNo);
}
    // Get company and project info
    const company = await page.locator('div:has(p:has-text("Company -")) > p:nth-of-type(2)').innerText();
    await page.waitForTimeout(1000);
    const project = await page.locator('div:has(p:has-text("Project -")) > p:nth-of-type(2)').innerText();
    await page.waitForTimeout(1000);
    console.log('Company:', company);
    console.log('Project:', project);

   // Debug: show all button text Playwright sees
    const allButtons = await page.getByRole('button').allInnerTexts();
    console.log("Buttons Playwright sees:\n", allButtons);

    const GuestdetaiilsButtons = await page.getByRole('button', { name: /Guest Details/i }).all();
    console.log("Found Assign Guest Buttons:", GuestdetaiilsButtons.length);
    if (GuestdetaiilsButtons.length > 0) {
    console.log(`\n✓ Found ${GuestdetaiilsButtons.length} "Guest guest" Details(s)`);

    // Click Three dot icon 
    const menus = page.locator('svg.lucide-ellipsis-vertical');
    await menus.nth(0).click();   // first one

    // Click edit icon 

    await page.getByText('Edit', { exact: true }).click();

    await page.waitForTimeout(3000);

    // Enter the designation

    const designation ='Tech';
    await page.locator('input[name="designation"]').fill(designation);
    console.log('Entered designation',designation);

    //Enter the company 
    const company='Bss Tech';
    await page.locator('input[name="companyName"]').fill(company);
    console.log('Entered company as :',company);

    //Enter the supervisor name 
    const supervisor='Sella';
    await page.locator('input[name="supervisorName"]').fill(supervisor);
    console.log('Entered supervisor as :',supervisor);

  // Click Update option 

  await page.getByRole('button', { name: 'Update' }).click();
  await page.waitForTimeout (3000);  
   
}

     // Optional: Take a screenshot
    await page.screenshot({ path: 'guest-details.png', fullPage: true });
     
  } catch (error) {
    console.error('Error:', error);
  } 
});

