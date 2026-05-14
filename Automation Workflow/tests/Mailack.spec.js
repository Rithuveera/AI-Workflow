const { test, expect } = require('@playwright/test');
const pdfParse = require('pdf-parse');
test("Mail Acknowledgement - Preview  ", async ({ page }) => {
    try {
        // Step 1: Navigate to the login page
        console.log('Step 1: Navigating to login page...');
        await page.goto('https://datnext-qa.algosium.com/login');
        await page.waitForLoadState('networkidle');

        // Step 2: Enter username and password
        console.log('Step 2: Entering login credentials...');
        await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
        await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');

        // Step 3: Click login button
        console.log('Step 3: Clicking login button...');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForLoadState('networkidle');

        // Wait for dashboard to load
        await page.waitForURL('**/dashboard');
        console.log('Login successful!');

        // Step 4: Click on Enquiry menu to expand sidebar

        // Note: The page redirected to dashboard - user is already logged in
        await page.waitForLoadState('networkidle');
        console.log('Already logged in, on dashboard page');
        // Step 2: Click on Enquiry menu icon to expand

        // Step 4: Click on Enquiry menu icon to expand

        console.log('Step 4: Expanding Enquiry menu...');
        await page.locator('img[src="/icons/Logo.svg"]').hover();
        await page.waitForTimeout(3000);
        console.log('Expanding Enquiry menu ')


        // Step 5: Click on Enquiry menu item to see submenu
        console.log('Step 5: Opening Enquiry submenu...');
        await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
        console.log('Enquiry menu clicked successfully');
        await page.waitForTimeout(1000);


        // Step:6  Click on Internal Enquiry
        console.log('Step 6: Clicking on Internal Enquiry...');
        await page.getByRole('link', { name: 'Internal Enquiry' }).click();
        await page.waitForLoadState('networkidle');
        console.log('Internal Enquiry page loaded');

        // Step 7: Wait for the table to load and click on first "In Process" enquiry
        await page.waitForSelector('table');
        await page.getByRole('cell', { name: 'Pending' }).first().click();
        await page.waitForURL('**/enquiry/view/**');
        console.log('Opened In Process enquiry');
        await page.waitForTimeout(6000);

        // Click Send or Resend on enquiry page
        const sendBtn = page.getByRole('button', { name: 'Send' });
        const resendBtn = page.getByRole('button', { name: 'Resend' });

        if (await sendBtn.isVisible()) {
            console.log('Clicking Send button on enquiry page...');
            await sendBtn.click();
        } else if (await resendBtn.isVisible()) {
            console.log('Clicking Resend button on enquiry page...');
            await resendBtn.click();
        } else {
            throw new Error('Send or Resend button not found on enquiry page');
        }
        await page.waitForTimeout(6000);

        // Wait for PDF iframe
        const pdfIframe = page.locator('iframe#pdf-viewer-iframe');
        await pdfIframe.waitFor({ state: 'visible', timeout: 60000 });

        // Get PDF URL
        const pdfUrl = await pdfIframe.getAttribute('src');
        console.log('PDF URL:', pdfUrl);

        // Fetch PDF (Node 18+)
        const response = await fetch(pdfUrl);
        const arrayBuffer = await response.arrayBuffer();

        // Parse PDF
        const data = await pdfParse(Buffer.from(arrayBuffer));

        console.log('--- PDF CONTENT START ---');
        console.log(data.text);
        console.log('--- PDF CONTENT END ---');
        await page.waitForTimeout(6000);


    } catch (error) {
        console.error('Error occurred:', error.message);
        // Take a screenshot on error
        await page.screenshot({ path: 'error-screenshot.png' });
        console.log('Screenshot saved as error-screenshot.png');
    }
})

test("Mail Acknowledgement - Send/Resend  ", async ({ page }) => {
    try {
        // Step 1: Navigate to the login page
        console.log('Step 1: Navigating to login page...');
        await page.goto('https://datnext-qa.algosium.com/login');
        await page.waitForLoadState('networkidle');

        // Step 2: Enter username and password
        console.log('Step 2: Entering login credentials...');
        await page.getByRole('textbox', { name: 'Enter your username' }).fill('Veera');
        await page.getByRole('textbox', { name: 'Your password' }).fill('Rithu@11');

        // Step 3: Click login button
        console.log('Step 3: Clicking login button...');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForLoadState('networkidle');

        // Wait for dashboard to load
        await page.waitForURL('**/dashboard');
        console.log('Login successful!');

        // Step 4: Click on Enquiry menu to expand sidebar

        // Note: The page redirected to dashboard - user is already logged in
        await page.waitForLoadState('networkidle');
        console.log('Already logged in, on dashboard page');
        // Step 2: Click on Enquiry menu icon to expand

        // Step 4: Click on Enquiry menu icon to expand

        console.log('Step 4: Expanding Enquiry menu...');
        await page.locator('img[src="/icons/Logo.svg"]').hover();
        await page.waitForTimeout(3000);
        console.log('Expanding Enquiry menu ')


        // Step 5: Click on Enquiry menu item to see submenu
        console.log('Step 5: Opening Enquiry submenu...');
        await page.locator('div').filter({ hasText: /^Enquiry$/ }).first().click();
        console.log('Enquiry menu clicked successfully');
        await page.waitForTimeout(1000);


        // Step:6  Click on Internal Enquiry
        console.log('Step 6: Clicking on Internal Enquiry...');
        await page.getByRole('link', { name: 'Internal Enquiry' }).click();
        await page.waitForLoadState('networkidle');
        console.log('Internal Enquiry page loaded');

        // Step 7: Wait for the table to load and click on first "In Process" enquiry
        await page.waitForSelector('table');
        await page.getByRole('cell', { name: 'Pending' }).first().click();
        await page.waitForURL('**/enquiry/view/**');
        console.log('Opened In Process enquiry');

        await page.waitForTimeout(6000);

        // Click Send or Resend on enquiry page
        const sendBtn = page.getByRole('button', { name: 'Send' });
        const resendBtn = page.getByRole('button', { name: 'Resend' });

        if (await sendBtn.isVisible()) {
            console.log('Clicking Send button on enquiry page...');
            await sendBtn.click();
        } else if (await resendBtn.isVisible()) {
            console.log('Clicking Resend button on enquiry page...');
            await resendBtn.click();
        } else {
            throw new Error('Send or Resend button not found on enquiry page');
        }

        // Locate the Send button by its exact class
        const sendButton = page.locator('button.DocViewerModal_sendButton__R7wJd');

        // Click the button
        await sendButton.click();

        // Wait for success toast
        const toast = page.locator('.Toastify__toast--success');
        await toast.waitFor({ state: 'visible', timeout: 10000 });
        const toastMessage = (await toast.textContent()).trim();
        console.log('Toast message:', toastMessage);
        return toastMessage;

    } catch (error) {
        console.error('Error occurred:', error.message);
        // Take a screenshot on error
        await page.screenshot({ path: 'error-screenshot.png' });
        console.log('Screenshot saved as error-screenshot.png');
    }
})
