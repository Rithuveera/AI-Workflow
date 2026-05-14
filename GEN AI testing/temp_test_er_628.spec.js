const { test, expect } = require('@playwright/test');

// The provided CurrencyPage POM is not relevant for these specific BDD scenarios,
// as they focus on a "Quote Comparison Screen" and "Custom Duty" fields,
// not currency management. Therefore, it will not be imported or used.

// Base URL for the application
const BASE_URL = 'https://datnext-qa.algosium.com';

test.describe('Feature: Quote Comparison Screen Displays Custom Duty from Revisions', () => {

    test.beforeEach(async ({ page }) => {
        // CRITICAL: MANDATORY LOGIN STEP
        await page.goto(`${BASE_URL}/login`);
        await page.locator('input[name="username"]').fill('Veera');
        await page.locator('input[name="password"]').fill('Rithu@11');
        await page.locator('button:has-text("Login")').click();

        // Post-Login Verification: Expect URL to contain "/dashboard" or "/home"
        await expect(page).toHaveURL(/dashboard|home/);
        console.log('Login successful and navigated to dashboard/home.');
    });

    test('Scenario: Custom Duty Added in a Quote Revision is Visible in Comparison', async ({ page }) => {
        const originalQuoteId = 'Q-001';
        const revisionQuoteId = 'Q-001-R1';
        const customDutyValue = 50.00;

        // MANDATORY FALLBACK: Intercept API calls and MOCK the response data.
        // Since internal selectors for the "Quote Comparison Screen" are unknown,
        // we simulate the backend response that the frontend would consume.
        // We assume a hypothetical API endpoint for quote comparison.
        await page.route(`**/api/quotes/compare?quoteId1=${originalQuoteId}&quoteId2=${revisionQuoteId}`, async route => {
            console.log(`Intercepting API call for comparison: ${route.request().url()}`);
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    quote1: {
                        id: originalQuoteId,
                        // Representing "no custom duty" as 0 for the original quote
                        customDuty: 0,
                        status: 'Approved',
                        // ... other relevant quote details for comparison
                    },
                    quote2: { // This represents the revision Q-001-R1
                        id: revisionQuoteId,
                        customDuty: customDutyValue,
                        status: 'Approved',
                        // ... other relevant quote details for comparison
                    }
                }),
            });
            console.log(`Mocked API response for ${originalQuoteId} vs ${revisionQuoteId} comparison.`);
        });

        // When the user views the Quote Comparison screen comparing "Q-001" and "Q-001-R1"
        // Navigate to a hypothetical URL that would trigger the mocked API call and display the comparison.
        await page.goto(`${BASE_URL}/quotes/compare?quoteId1=${originalQuoteId}&quoteId2=${revisionQuoteId}`);
        console.log(`Navigated to hypothetical comparison URL: ${page.url()}`);

        // Then the "Custom Duty" field should be displayed for "Q-001-R1"
        // And the value of "Custom Duty" for "Q-001-R1" should be "$50.00"
        // We assert that the expected text content, which the frontend would render based on the mocked data, is visible.
        // Assuming a display format like "Custom Duty (QuoteID): $Value.00"
        await expect(page.getByText(`Custom Duty (${revisionQuoteId}): $${customDutyValue.toFixed(2)}`)).toBeVisible();
        console.log(`Verified Custom Duty for ${revisionQuoteId}: $${customDutyValue.toFixed(2)}`);

        // And the "Custom Duty" field for "Q-001" should be displayed as "N/A" or "$0.00"
        // Assuming the frontend renders a customDuty of 0 as "$0.00".
        // If "N/A" is expected for 0, the assertion should be:
        // await expect(page.getByText(`Custom Duty (${originalQuoteId}): N/A`)).toBeVisible();
        await expect(page.getByText(`Custom Duty (${originalQuoteId}): $0.00`)).toBeVisible();
        console.log(`Verified Custom Duty for ${originalQuoteId}: $0.00`);
    });

    test('Scenario: Modified Custom Duty in a Quote Revision is Visible in Comparison', async ({ page }) => {
        const originalQuoteId = 'Q-002';
        const revisionQuoteId = 'Q-002-R1';
        const originalCustomDutyValue = 75.00;
        const revisedCustomDutyValue = 120.00;

        // MANDATORY FALLBACK: Intercept API calls and MOCK the response data.
        // Simulate the API response for comparing Q-002 and Q-002-R1.
        await page.route(`**/api/quotes/compare?quoteId1=${originalQuoteId}&quoteId2=${revisionQuoteId}`, async route => {
            console.log(`Intercepting API call for comparison: ${route.request().url()}`);
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    quote1: {
                        id: originalQuoteId,
                        customDuty: originalCustomDutyValue,
                        status: 'Approved',
                        // ... other relevant quote details for comparison
                    },
                    quote2: { // This represents the revision Q-002-R1
                        id: revisionQuoteId,
                        customDuty: revisedCustomDutyValue,
                        status: 'Approved',
                        // ... other relevant quote details for comparison
                    }
                }),
            });
            console.log(`Mocked API response for ${originalQuoteId} vs ${revisionQuoteId} comparison.`);
        });

        // When the user views the Quote Comparison screen comparing "Q-002" and "Q-002-R1"
        // Navigate to a hypothetical URL that would trigger the mocked API call and display the comparison.
        await page.goto(`${BASE_URL}/quotes/compare?quoteId1=${originalQuoteId}&quoteId2=${revisionQuoteId}`);
        console.log(`Navigated to hypothetical comparison URL: ${page.url()}`);

        // Then the "Custom Duty" field should be displayed for both "Q-002" and "Q-002-R1"
        // And the value of "Custom Duty" for "Q-002" should be "$75.00"
        await expect(page.getByText(`Custom Duty (${originalQuoteId}): $${originalCustomDutyValue.toFixed(2)}`)).toBeVisible();
        console.log(`Verified Custom Duty for ${originalQuoteId}: $${originalCustomDutyValue.toFixed(2)}`);

        // And the value of "Custom Duty" for "Q-002-R1" should be "$120.00"
        await expect(page.getByText(`Custom Duty (${revisionQuoteId}): $${revisedCustomDutyValue.toFixed(2)}`)).toBeVisible();
        console.log(`Verified Custom Duty for ${revisionQuoteId}: $${revisedCustomDutyValue.toFixed(2)}`);
    });
});