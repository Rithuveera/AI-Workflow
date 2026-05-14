const { test, expect } = require('@playwright/test');

test('User Management - Print User List', async ({ page }) => {

  // Login
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

  // Navigate to User Management
  await page.goto('http://qa-accomodation.campneuron.com/app/settings/users');
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
        Username: cells[1]?.innerText.trim() || 'N/A',
        Status: cells[2]?.innerText.trim() || 'N/A',
        Role: cells[3]?.innerText.trim() || 'N/A',
      };
    })
  );

  console.table(users);
});


test('User Management - Add  User ', async ({ page }) => {
    try
    {

  // Login
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

  // Navigate to User Management
  await page.goto('http://qa-accomodation.campneuron.com/app/settings/users');
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle');

  // Click Add user option 

  await page.locator('button:has-text("Add User")').click();

  // Enter the first name 

  await page.fill('input[name="firstName"]', 'karthisss');

  // Enter the last name 
 await page.fill('input[name="lastName"]', 'kss');
 //Enter the username 
 await page.fill('input[name="username"]', 'karthisss');
 // Select the role 

 await page.getByRole('button', { name: /role/i }).click();
 await page.getByRole('option', { name: 'Manager' }).click();

 // Enter the password 

 await page.fill('input[name="password"]','Rithu@11');

 //Enter the confirm password 

 await page.fill('input[name="confirmPassword"]','Rithu@11');

 // Enter the email 

 await page.fill('input[name="email"]','test11@gmail.com');

 // Enter the phone number 

 await page.fill('input[name="phoneNumber"]','8797878787');

 // Click create user option 
 await page.getByRole('button', { name: /create user/i }).click();
 console.log("UserCreated successfully ");
 await page.waitForTimeout(3000);

}
   catch (error) {
    console.error('Error:', error);
  } 
});



test('User Management - Edit   User ', async ({ page }) => {
    try
    {

  // Login
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

  // Navigate to User Management
  await page.goto('http://qa-accomodation.campneuron.com/app/settings/users');
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle');

  // Click three dot icon 
  await page.locator('svg.lucide-ellipsis-vertical').nth(0).click();
  console.log( ' Three dot icon clicked successfully ');

  // Click edit icon 
  await page.locator('span', { hasText: 'Edit' }).click();
  await page.waitForTimeout(3000) ; 

  // Change the value for last name and Email 

     await page.fill('input[name="firstName"]', 'sekarss');
     await page.fill('input[name="email"]','test111@gmail.com');

 // Click create user option 
 await page.getByRole('button', { name: /Update User/i }).click();
 console.log("User updated successfully ");
 await page.waitForTimeout(3000);

}
   catch (error) {
    console.error('Error:', error);
  } 
});



test('User Management - Delete   User ', async ({ page }) => {
    try
    {

  // Login
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

  // Navigate to User Management
  await page.goto('http://qa-accomodation.campneuron.com/app/settings/users');
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle');

  // Click three dot icon 
  await page.locator('svg.lucide-ellipsis-vertical').nth(0).click();
  console.log( ' Three dot icon clicked successfully ');

  // Click edit icon 
  await page.locator('span', { hasText: 'Delete' }).click();
  await page.waitForTimeout(3000) ; 
  console.log("User Deleted successfully ");
 
}
   catch (error) {
    console.error('Error:', error);
  } 
});



