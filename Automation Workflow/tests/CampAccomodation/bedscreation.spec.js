
const {test,expect}=require('@playwright/test')

test('Beds Creation - Add Single Room',async({page})=> 
{

 try {


  // Step 1 : Login 
    console.log(' Opening Login  page...');
    await page.goto('http://qa-accomodation.campneuron.com/');
    await page.waitForLoadState('networkidle');
  

  await page.fill('input[name="username"]', 'rithuveera');
  await page.fill('input[name="password"]', 'Rithu@13');
  await page.getByRole('button', { name: 'LOGIN' }).click();

   // Wait for navigation after login
    await page.waitForURL('**/app/bookings/list');
    console.log('Successfully logged in');

  
    // Step 3: Click on Beds menu
    console.log('Step 2: Navigating to Beds listing...');
    await page.goto('http://qa-accomodation.campneuron.com/app/beds/list');
    await page.waitForLoadState('networkidle');

    // Step 4: Click on "Add single room" button
    console.log('Step 3: Clicking Add single room button...');
    await page.getByRole('button', { name: 'Add single room' }).click();
    await page.waitForLoadState('networkidle');

    // Step 5: Select Room Type as "Senior"
    console.log('Step 4: Selecting Room Type as senior...');
    await page.getByRole('button', { name: /Room Type/i }).click();
    await page.getByRole('option', { name: 'Senior (S)' }).click();
    console.log("Room type Project Manager clicked Successfully")
    await page.waitForTimeout(500); // Wait for selection to register

    // Step 6: Fill in Block Number as "SE2"
    console.log('Step 5: Filling Block Number ..');
    const blocknumber='Se3';
    const blockInput = page.locator('input').filter({ hasText: /^$/ }).first();
    await blockInput.fill(blocknumber);
    console.log(`Enter Block Number :${blocknumber}`)

    // Step 7: Fill in Building Number as "SN2"
    console.log('Step 6: Filling Building Number..');
    const buildingnumber1='Sn3'
    const buildingInput = page.locator('input').filter({ hasText: /^$/ }).nth(1);
    await buildingInput.fill(buildingnumber1);
    console.log(`Enter the building number :${buildingnumber1}`);

    // Step 8: Fill in Room Number as "1" (numeric value)
    console.log('Step 7: Filling Room Number ..');
    const roomnumber1='1';
    const roomInput = page.locator('input').filter({ hasText: /^$/ }).nth(2);
    await roomInput.fill(roomnumber1);
    console.log(`Enter the room number :${roomnumber1}`);

    // Step 9: Click "Create Bed" button
    console.log('Step 8: Clicking Create Bed button...');
    await page.getByRole('button', { name: 'Create Bed' }).click();
    await page.waitForTimeout(2000); 
    // Step 10: Verify success message
   console.log('Step 9: Verifying bed creation...');
   const bedValue = await page.locator('.text-xl.text-typography-900 .text-primary-900').textContent();
   console.log(bedValue.trim());
    if (bedValue) 
        {
      console.log('✓ Bed created successfully!');
      console.log(`✓ Created bed: ${bedValue}`);
    } 
    else {
      console.log('✗ Success message not found');
    }

     } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'C:/Users/veeramani/Desktop/playwright-mcp/screenshots/error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  } 
});



test('Beds Creation - Add Bulk Rooms',async({page})=> 
{

 try {

  
    // Step 1 : Login   
    console.log(' Opening Login  page...');
    await page.goto('http://qa-accomodation.campneuron.com/');
    await page.waitForLoadState('networkidle');

      await page.waitForLoadState('networkidle');

  await page.fill('input[name="username"]', 'rithuveera');
  await page.fill('input[name="password"]', 'Rithu@13');
  await page.getByRole('button', { name: 'LOGIN' }).click();

   // Wait for navigation after login
    await page.waitForURL('**/app/bookings/list');
    console.log('Successfully logged in');



    // Step 3: Click on Beds menu
    console.log('Step 2: Navigating to Beds listing...');
    await page.goto('http://qa-accomodation.campneuron.com/app/beds/list');
    await page.waitForLoadState('networkidle');

    // Step 4: Click on "Add Bulk  room" button
    console.log('Step 3: Clicking Add Bulk rooms button...');
    await page.getByRole('button', { name: 'Add bulk rooms' }).click();
    await page.waitForLoadState('networkidle');

    // Step 5: Select Room Type as "Senior"
    console.log('Step 4: Selecting Room Type as Senior...');
    await page.getByRole('button', { name: /Room Type/i }).click();
    await page.getByRole('option', { name: 'Senior (S)' }).click();
    console.log('Roomtype Senior selected succcessfully ')
    await page.waitForTimeout(500); 

   
    // Step 5: Fill in Block Number 
    console.log('Step 5: Filling Block Number as ..');
    const blocknumber='BS2';
    const blockInput = page.locator('input').filter({ hasText: /^$/ }).first();
    await blockInput.fill(blocknumber);
    console.log(`Enter Block Number :${blocknumber}`)

    // Step 6: Fill in Building Number 
    console.log('Step 6: Filling Building Number as ...');
    const buildingnumber='BS2';
    const buildingInput = page.locator('input').filter({ hasText: /^$/ }).nth(1);
    await buildingInput.fill(buildingnumber);
    console.log(`Enter building number : ${buildingnumber}`);

    // Step 7: Fill the first Room Number 
    console.log('Step 7: Filling First Room Number as ...');
    const firstroomnumber='1';
    const firstroomInput = page.locator('input').filter({ hasText: /^$/ }).nth(2);
    await firstroomInput.fill(firstroomnumber);
    console.log(`Enter Room number :${firstroomnumber}`);

    // Step 8 : Fill the Last Room Number 
    console.log('Step 8: Filling Last Room Number ')
    const lastroomnumber='2';
    const roomInput = page.locator('input').filter({ hasText: /^$/ }).nth(3);
    await roomInput.fill(lastroomnumber);
    console.log(`Enter Room number :${lastroomnumber}`);

  
    // Step 8: Click "Create Bed" button
    console.log('Step 8: Clicking Create Bed button...');
    await page.getByRole('button', { name: 'Create Bed' }).click();
    console.log('Create bed clicked successfully');
    await page.waitForTimeout(2000); 
    // Step 9: Verify success message
   console.log('Step 9: Verifying bed creation...');
   const bedsSpan = page.locator('span.text-primary-900');
   const bedsText = (await bedsSpan.textContent()).trim();
       if (bedsText) 
        {
      console.log('✓ Bed created successfully!');
      console.log(`✓ Created bed: ${bedsText}`);
    } 
    else {
      console.log('✗ Success message not found');
    }

     } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'C:/Users/veeramani/Desktop/playwright-mcp/screenshots/error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  } 
});


test('beds - Delete ',async ({page}) =>
     {
        try {
   
     // Step 1 : Login 
    console.log(' Opening Login  page...');
    await page.goto('http://qa-accomodation.campneuron.com/');
    await page.waitForLoadState('networkidle');

  await page.fill('input[name="username"]', 'rithuveera');
  await page.fill('input[name="password"]', 'Rithu@13');
  await page.getByRole('button', { name: 'LOGIN' }).click();

   // Wait for navigation after login
    await page.waitForURL('**/app/bookings/list');
    console.log('Successfully logged in');
    // Step 3: Navigate to Beds Listing page
    console.log('Step 2: Navigating to Beds listing page...');
    await page.goto('http://qa-accomodation.campneuron.com/app/beds/list');
    await page.waitForLoadState('networkidle');


    // Wait for the table to load
    await page.waitForSelector('table');

    // Find and print active bed details before deletion
  console.log('BEFORE DELETION:');
  const activeBed = page.locator('tbody tr:has-text("Active")').first();
  const bedNo = await activeBed.locator('td').nth(4).textContent();
  const status = await activeBed.locator('td').nth(5).textContent();
  console.log(`Bed No: ${bedNo}, Status: ${status}`);

  // Click three dots and delete
  await activeBed.locator('td').last().locator('button').click();
await page.getByRole('button', { name: 'Disable' }).click();
  await page.waitForTimeout(1500);

  // Print bed details after deletion
  console.log('\nAFTER DELETION:');
  const deletedBed = page.locator(`tbody tr:has-text("${bedNo.trim()}")`).first();
  const newStatus = await deletedBed.locator('td').nth(5).textContent();
  console.log(`Bed No: ${bedNo}, Status: ${newStatus}`);


   // Take a screenshot of the result
    await page.screenshot({ path: 'bed-deletion-success.png', fullPage: true });
    console.log('✓ Screenshot saved as bed-deletion-success.png');

    // Optional: Wait to see the result
    await page.waitForTimeout(2000);

  } catch (error) {
    console.error('Error occurred:', error);
    await page.screenshot({ path: 'error-screenshot.png', fullPage: true });
  }
  
});
