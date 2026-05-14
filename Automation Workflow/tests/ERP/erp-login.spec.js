const { test, expect } = require('@playwright/test');

// Test Configuration
const BASE_URL = 'https://datnext-qa.algosium.com';
const VALID_USERNAME = 'Veera';
const VALID_PASSWORD = 'Rithu@11';

test.describe('Login Functionality Test Suite', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('networkidle');
  });
  // Test Case 1: Successful Login with Valid Credentials
  test('TC001 - Verify successful login with valid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Enter your username' }).fill(VALID_USERNAME);
    await page.getByRole('textbox', { name: 'Your password' }).fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL(`${BASE_URL}/dashboard`);
     // Verify Dashboard element (from screenshot)
    await expect(page.getByRole('button', { name: 'BSS Tech' })).toBeVisible();

  // Print output
  console.log("Login Status: SUCCESS");

  })
   // Test Case 2: Login with Invalid Username
  test('TC002 - Verify login fails with invalid username', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('InvalidUser');
    await page.getByRole('textbox', { name: 'Your password' }).fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for error message
    await page.waitForTimeout(2000);
    // Verify error message or stay on login page
    await expect(page).toHaveURL(`${BASE_URL}/login`);
      // Wait for toast message to appear
  const toast = page.locator('p.login_error_msg_p__d7uWS');
  await expect(toast).toBeVisible();

  // Get toast text
  const toastText = await toast.textContent();

  // Print toast message
  console.log("Toast Message: ", toastText.trim());

  })
   // Test Case 3: Login with Invalid Password
  test('TC003 - Verify login fails with invalid password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Enter your username' }).fill(VALID_USERNAME);
    await page.getByRole('textbox', { name: 'Your password' }).fill('WrongPassword123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(`${BASE_URL}/login`);
     // Wait for toast message to appear
    const toast = page.locator('p.login_error_msg_p__d7uWS');
    await expect(toast).toBeVisible();

   // Get toast text
    const toastText = await toast.textContent();

     // Print toast message
     console.log("Toast Message:", toastText.trim());
  })
    // Test Case 4 : Login with SQL Injection Attempt
  test('TC012 - Verify SQL injection is prevented', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Enter your username' }).fill("' OR '1'='1");
    await page.getByRole('textbox', { name: 'Your password' }).fill("' OR '1'='1");
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.waitForTimeout(2000);
    // Should stay on login page
    await expect(page).toHaveURL(`${BASE_URL}/login`);
     // Wait for toast message to appear
  const toast = page.locator('p.login_error_msg_p__d7uWS');
  await expect(toast).toBeVisible();

  // Get toast text
  const toastText = await toast.textContent();

  // Print toast message
  console.log("Toast Message:", toastText.trim());
  })

});