const {test,expect}=require('@playwright/test')

test ('Meal Type Creation - Add MealType ',async({page})=> 
{

 try {

     //Step 1: Naviagete to the login page 
   
     console.log('Opening Login page...');
  await page.goto(
    'https://auth-accomodation.campneuron.com/realms/identity-server/protocol/openid-connect/auth?client_id=accommodation_qa&redirect_uri=https%3A%2F%2Fqa-accomodation.campneuron.com%2F'
  );
  await page.waitForLoadState('networkidle');

    await page.fill('input[name="username"]', 'admin1');
  await page.fill('input[name="password"]', 'Admin@123');
  await page.getByRole('button', { name: 'LOGIN' }).click();
     await page.waitForTimeout(3000);

       // Wait for navigation after login
     await page.waitForURL('**/app/bookings/list');
    console.log('Successfully logged in');

    // Step 4: Click on Meal plan menu
    console.log('Navigating Meal plan ')
    await page.goto('http://qa-accomodation.campneuron.com/app/settings/meal-plans' );
    await page.waitForLoadState('networkidle');

    // Step 3: Click on "Add Meal plan ""
    console.log('Clicking Add Meal Plan...');
    await page.getByRole('button', { name: 'Add Meal Plan' }).click();
    await page.waitForLoadState('networkidle');

   // Step 4 : Enter the Meal type 
    console.log('Enter the Meal plan ')
    await page.fill('input[name="mealName"]', ' Test Meals');
    console.log('Meal name entered successfully');

    // Step 5: Select the available date 
    console.log('Select the available date ')
    await page.click('span.text-typography-900.font-semibold.text-base.tracking-tight');
    await page.click('div.react-datepicker__day--013');
    await page.waitForTimeout(3000);
    const selectedDate = await page.locator('span.text-typography-900.font-semibold.text-base.tracking-tight').first().textContent();
    console.log('Selected Date:', selectedDate.trim());

    // Step 6 : Select the parcel available option 
    console.log('Select the parcel available option');
    await page.click('button:has-text("Parcel Available")');
    // Select the option as No
   
     await page.click('button:has-text("Parcel Available")');
     //  Click the dropdown button to open the list
      await page.click('button:has-text("Parcel Available")');

     //  Click the "No" option if you want to change it
      await page.click('div[role="option"] >> text=No');

     //  Verify selection
       const selectedOption = await page.textContent('button:has-text("Parcel Available") span');
       console.log("Selected option:", selectedOption.trim());  // Should print "No"

     // Step 7 : Click Create Meal Type option 

     await page.click('button:has-text("Create Meal Type")');
  

 } catch (error) {
    console.error('Error occurred:', error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'C:/Users/veeramani/Desktop/playwright-mcp/screenshots/error-screenshot.png' });
    console.log('Screenshot saved as error-screenshot.png');
  } 
});

test ('Meal Type - Edit Type ',async({page})=> 
{

 try {

     //Step 1: Naviagete to the login page 
   
   console.log('Opening Login page...');
  await page.goto(
    'https://auth-accomodation.campneuron.com/realms/identity-server/protocol/openid-connect/auth?client_id=accommodation_qa&redirect_uri=https%3A%2F%2Fqa-accomodation.campneuron.com%2F'
  );
  await page.waitForLoadState('networkidle');

    await page.fill('input[name="username"]', 'admin1');
  await page.fill('input[name="password"]', 'Admin@123');
  await page.getByRole('button', { name: 'LOGIN' }).click();;
     await page.waitForTimeout(3000);


        // Wait for navigation after login
     await page.waitForURL('**/app/bookings/list');
    console.log('Successfully logged in');

    // Step 5: Navigate to Settings > Meal Plans
    await page.goto('http://qa-accomodation.campneuron.com/app/settings/meal-plans');
    console.log('Navigated to Meal Plans page');

    // Wait for the meal plans table to load
    await page.waitForSelector('table');
    console.log('Meal plans table loaded');

    // Step 6: Click the three-dot menu button for the first row (Thai meal)
    await page.locator('table tbody tr').first().locator('button').last().click();
    console.log('Clicked three-dot menu for first meal plan');

    // Step 7: Click the Edit option
    await page.getByText('Edit').click();
    console.log('Clicked Edit option');

    // Wait for the edit page to load
    await page.waitForURL('**/app/settings/meal-plans/edit/**');
    console.log('Edit page loaded');

    // Step 8: Clear and enter new meal name
    await page.getByRole('textbox', { name: 'Enter' }).clear();
    await page.getByRole('textbox', { name: 'Enter' }).fill('Test Meal');
    console.log('Updated meal name to "thai meal"');

    // Step 9: Click Update Meal Type button
    await page.getByRole('button', { name: 'Update Meal Type' }).click();
    console.log('Clicked Update Meal Type button');

      // Wait a moment to see the final state
    await page.waitForTimeout(2000);

  } catch (error) {
    console.error('Error occurred:', error);
  } 
  
});

test ('Meal Type - List page ',async({page})=> 
{

 try {

     //Step 1: Naviagete to the login page 
   
    console.log(' Opening Login  page...');
     console.log('Opening Login page...');
  await page.goto(
    'https://auth-accomodation.campneuron.com/realms/identity-server/protocol/openid-connect/auth?client_id=accommodation_qa&redirect_uri=https%3A%2F%2Fqa-accomodation.campneuron.com%2F'
  );
  await page.waitForLoadState('networkidle');

    await page.fill('input[name="username"]', 'admin1');
  await page.fill('input[name="password"]', 'Admin@123');
  await page.getByRole('button', { name: 'LOGIN' }).click();

   // Wait for navigation after login
     await page.waitForURL('**/app/bookings/list');
    console.log('Successfully logged in');

    // Step 5: Navigate to Settings > Meal Plans
    await page.goto('http://qa-accomodation.campneuron.com/app/settings/meal-plans');
    console.log('Navigated to Meal Plans page');

    // Wait for the meal plans table to load
await page.waitForSelector('table tbody tr');
console.log('Meal plans table loaded');

const extractMealPlans = async (page) => {
  const mealPlans = await page.$$eval('table tbody tr', (rows) =>
    rows
      .filter(row => row.offsetParent !== null) // only visible rows
      .map((row) => {
        const cells = row.querySelectorAll('td');
        return {
          mealName: cells[0]?.innerText.trim() || 'N/A',
          availableFrom: cells[1]?.innerText.trim() || 'N/A',
          parcelAvailable: cells[2]?.innerText.trim() || 'N/A',
        };
      })
  );

  // Remove duplicates by mealName + availableFrom
  const uniqueMeals = [];
  mealPlans.forEach(plan => {
    if (!uniqueMeals.find(m => m.mealName === plan.mealName && m.availableFrom === plan.availableFrom)) {
      uniqueMeals.push(plan);
    }
  });

  // Print neatly
  console.log('\nMeal Plans:\n');
  uniqueMeals.forEach((plan, index) => {
    console.log(
      `${index + 1}. Meal Name: ${plan.mealName} — Available From: ${plan.availableFrom} — Parcel Available: ${plan.parcelAvailable}`
    );
  });
};

await extractMealPlans(page);
    } catch (error) {
    console.error('Error occurred:', error);
  } 
  
});
