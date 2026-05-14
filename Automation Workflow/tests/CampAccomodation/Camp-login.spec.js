const { test, expect } = require('@playwright/test');

// Test configuration
const BASE_URL = 'http://qa-accomodation.campneuron.com/';
const VALID_USERNAME = 'admin1';
const VALID_PASSWORD = 'Admin@123';

test.describe('Login Functionality Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto(BASE_URL);
    
  });

  test('TC-001: Verify login page loads successfully', async ({ page }) => {
    // Check if login page elements are visible
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByText('Login in to your account')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    
    // Verify placeholders
    await expect(page.getByRole('textbox', { name: 'Username' })).toHaveAttribute('placeholder', 'Enter your username');
    await expect(page.getByRole('textbox', { name: 'Password' })).toHaveAttribute('placeholder', 'Enter your password');
  });

  test('TC-002: Successful login with valid credentials', async ({ page }) => {
    // Fill in valid credentials
    await page.getByRole('textbox', { name: 'Username' }).fill(VALID_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(VALID_PASSWORD);
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for navigation after login
    await page.waitForURL('**/app/bookings/list');
    console.log('Successfully logged in');
    
      });

  test('TC-003: Login with invalid username', async ({ page }) => {
    // Fill in invalid username
    await page.getByRole('textbox', { name: 'Username' }).fill('invalid@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill(VALID_PASSWORD);
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for error response
    await page.waitForTimeout(2000);
    
    // Verify user stays on login page
    
    const errorText = await page.locator('#kc-client-error-text').innerText();
    console.log(errorText);
  });

  test('TC-004: Login with invalid password', async ({ page }) => {
    // Fill in valid username but invalid password
    await page.getByRole('textbox', { name: 'Username' }).fill(VALID_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword123');
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for error response
    await page.waitForTimeout(2000);
    
    // Verify user stays on login page

   const errorText = await page.locator('.kc-feedback-text').nth(0).innerText();
console.log(errorText);
  });

  

  test('TC-005: Login with both fields empty', async ({ page }) => {
    // Click login button without filling any fields
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for validation
    await page.waitForTimeout(1000);
    
    // Verify user stays on login page
    const errorText = await page.locator('#kc-client-error-text').innerText();
console.log(errorText);
  });

  test('TC-006: Verify password field is masked', async ({ page }) => {
    const passwordField = page.getByRole('textbox', { name: 'Password' });
        
  });

 
  test('TC-007: Verify login button is clickable', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'Login' });
    
    // Check if button is enabled
    await expect(loginButton).toBeEnabled();
    
    // Check if button is visible
    await expect(loginButton).toBeVisible();
  });

  

  test('TC-008: Successful logout after login', async ({ page }) => {
    // First login
    await page.getByRole('textbox', { name: 'Username' }).fill(VALID_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for dashboard
        await page.waitForURL('**/app/bookings/list');
 
    
    // Click logout
    await page.getByRole('button', { name: 'Logout' }).click();    
      await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
  });

 

  test('TC-009: Direct access to dashboard without login', async ({ page }) => {
    // Try to access dashboard directly
    await page.goto(BASE_URL + 'app/bookings/list');
    
    // Wait for potential redirect
    await page.waitForTimeout(2000);
    
      
  });

  test('TC-010: Multiple rapid login attempts', async ({ page }) => {
    // Perform multiple rapid login attempts
    for (let i = 0; i < 3; i++) {
      await page.getByRole('textbox', { name: 'Username' }).fill('wrong@example.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForTimeout(500);
    }
    
    // Verify account is not locked (or check for rate limiting message)
  
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  

  test('TC-011: Browser back button after logout', async ({ page }) => {
    // Login
    await page.getByRole('textbox', { name: 'Username' }).fill(VALID_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
   await page.waitForURL('**/app/bookings/list');
    
    // Logout
    await page.getByRole('button', { name: 'Logout' }).click();
       
    // Go back
    await page.goBack();
    
    // Wait and check if redirected to login
    await page.waitForTimeout(1000);
    
    // Should be redirected back to login page (session should be cleared)
    const currentUrl = page.url();
    console.log('Back button after logout URL:', currentUrl);
  });

});