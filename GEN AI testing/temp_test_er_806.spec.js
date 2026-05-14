const { test, expect } = require('@playwright/test');
const { CurrencyPage } = require('./CurrencyPage'); // Assuming CurrencyPage.js is in the same directory

test.describe('Currency Status Update', () => {
    let currencyPage;
    // Assuming the application runs on localhost:3000 and the currency management page is at /currencies
    const BASE_URL = 'http://localhost:3000/currencies';
    const STATUS_UPDATE_API_PATH = '/api/currencies/*/status';
    const INITIAL_CURRENCIES_API_PATH = '/api/currencies';

    test.beforeEach(async ({ page }) => {
        currencyPage = new CurrencyPage(page);

        // Mock initial currency data for the page load
        await page.route(INITIAL_CURRENCIES_API_PATH, async route => {
            const currencies = [
                { name: 'Bitcoin (BTC)', status: 'Active' },
                { name: 'Ethereum (ETH)', status: 'Active' },
                { name: 'Litecoin (LTC)', status: 'Inactive' },
            ];
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(currencies),
            });
        });

        // Mock the status update API endpoint
        // This mock allows us to count requests and control responses without actual backend calls.
        await page.route(STATUS_UPDATE_API_PATH, async route => {
            // Simulate a slight delay for the API response to mimic network latency.
            // This is crucial for debouncing to have a realistic effect.
            await page.waitForTimeout(100);
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true }),
            });
        });

        // Navigate to the currency management page
        await page.goto(BASE_URL);
        // Wait for the initial currency data to be loaded and rendered
        await page.waitForLoadState('networkidle');
    });

    test('Scenario: Redundant API calls on rapid status toggle (Bug Reproduction)', async ({ page }) => {
        const currencyName = 'Bitcoin (BTC)';
        const expectedApiUrlPart = `/api/currencies/${encodeURIComponent(currencyName)}/status`;

        // Given a currency "Bitcoin (BTC)" is displayed with an active status toggle
        const initialStatus = await currencyPage.getStatus(currencyName);
        expect(initialStatus).toBe('Active');

        const capturedRequests = [];
        // Listen for network requests to the status update endpoint
        page.on('request', request => {
            if (request.url().includes(expectedApiUrlPart) && request.method() === 'PUT') {
                capturedRequests.push(request);
            }
        });

        // When the user rapidly clicks the status toggle for "Bitcoin (BTC)" five times
        for (let i = 0; i < 5; i++) {
            await currencyPage.toggleStatus(currencyName);
            // Small delay to simulate rapid user input without waiting for each network request to complete.
            // This ensures clicks are registered quickly.
            await page.waitForTimeout(50);
        }

        // Wait for all potential network requests to complete.
        // This is important for the bug reproduction scenario where multiple requests might be in flight.
        await page.waitForLoadState('networkidle');
        // Add an extra buffer to ensure all requests have been processed and captured.
        await page.waitForTimeout(500);

        // Then multiple distinct API requests to update "Bitcoin (BTC)" status should be observed
        // In a bug scenario without debouncing, we expect more than one request, potentially five.
        expect(capturedRequests.length).toBeGreaterThan(1);
        // For a more specific bug, you might expect `toBe(5)`, but `toBeGreaterThan(1)` is more robust for "multiple".

        // And the final status of "Bitcoin (BTC)" should reflect the last toggled state
        // Initial: Active. 5 clicks (odd number of toggles) -> Final: Inactive.
        const finalStatus = await currencyPage.getStatus(currencyName);
        expect(finalStatus).toBe('Inactive');
    });

    test('Scenario: Single API call on rapid status toggle with debouncing (Expected Behavior)', async ({ page }) => {
        const currencyName = 'Ethereum (ETH)';
        const expectedApiUrlPart = `/api/currencies/${encodeURIComponent(currencyName)}/status`;

        // Given a currency "Ethereum (ETH)" is displayed with an active status toggle
        const initialStatus = await currencyPage.getStatus(currencyName);
        expect(initialStatus).toBe('Active');

        const capturedRequests = [];
        // Listen for network requests to the status update endpoint
        page.on('request', request => {
            if (request.url().includes(expectedApiUrlPart) && request.method() === 'PUT') {
                capturedRequests.push(request);
            }
        });

        // When the user rapidly clicks the status toggle for "Ethereum (ETH)" five times
        for (let i = 0; i < 5; i++) {
            await currencyPage.toggleStatus(currencyName);
            // Small delay to simulate rapid user input without waiting for each network request to complete.
            await page.waitForTimeout(50);
        }

        // Wait for all potential network requests to complete.
        // With debouncing, there should only be one request, and it should complete after a delay.
        await page.waitForLoadState('networkidle');
        // Add an extra buffer to ensure the debounced request has fired and been captured.
        await page.waitForTimeout(500);

        // Then exactly one API request to update "Ethereum (ETH)" status should be observed
        expect(capturedRequests.length).toBe(1);

        // And the final status of "Ethereum (ETH)" should reflect the last toggled state
        // Initial: Active. 5 clicks (odd number of toggles) -> Final: Inactive.
        const finalStatus = await currencyPage.getStatus(currencyName);
        expect(finalStatus).toBe('Inactive');
    });
});