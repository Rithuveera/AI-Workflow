import pytest
from playwright.sync_api import Page, expect

# Define a base URL for the application under test.
# In a real scenario, this would be configured via pytest.ini or environment variables.
# For demonstration, we use a placeholder. Replace with your actual application URL.
BASE_URL = "http://localhost:8000/currency-management"

# --- Selectors ---
# These selectors should uniquely identify the elements on your page.
# Adjust them to match your application's HTML structure.
CURRENCY_STATUS_TEXT_SELECTOR = "#currency-status-display"
STATUS_TOGGLE_BUTTON_SELECTOR = "#toggle-status-button"
API_ENDPOINT_PATTERN = "**/api/currency/update-status" # Wildcard for the API endpoint

@pytest.fixture(autouse=True)
def setup_page(page: Page):
    """
    Sets up the page for each test.
    Navigates to the base URL and sets up a default mock for the API response.
    """
    # Mock the API response for status updates.
    # This ensures the UI can update without a real backend and we can control the response.
    # We'll set up a default mock that always returns "Inactive" as the new status
    # when an update request is made.
    page.route(API_ENDPOINT_PATTERN, lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body='{"success": true, "newStatus": "Inactive"}'
    ))

    # Navigate to the currency management page.
    page.goto(BASE_URL)

    # Ensure the initial state of the currency is "Active" for the tests.
    # This assumes the page loads with "Active" or can be set to "Active" via some mechanism.
    # If your app fetches initial state via an API, you might need to mock that fetch as well.
    expect(page.locator(CURRENCY_STATUS_TEXT_SELECTOR)).to_have_text("Active")

    yield page

def test_prevent_redundant_api_calls_on_reclicking_updated_status(page: Page):
    """
    Scenario: Prevent redundant API calls when re-clicking an already updated currency status
    """
    # Use a dictionary to store the count, allowing modification within the lambda closure.
    request_counts = {"update_status": 0}

    # Intercept requests matching the API_ENDPOINT_PATTERN.
    # This route handler is added *after* the one in `setup_page`, so it will be processed first.
    # It increments the counter and then allows the request to continue to the next handler
    # (which is the `fulfill` handler in `setup_page`).
    page.route(API_ENDPOINT_PATTERN, lambda route: (
        request_counts.update({"update_status": request_counts["update_status"] + 1}),
        route.continue_()
    ))

    # Given a user is on the currency management page (handled by fixture)
    # And a specific currency's status is currently "Active" (handled by fixture)

    # When the user clicks the status button to change it to "Inactive"
    page.locator(STATUS_TOGGLE_BUTTON_SELECTOR).click()

    # Then exactly one API call is made to update the currency status.
    # Wait for the API call to complete and the UI to update.
    page.wait_for_response(API_ENDPOINT_PATTERN)
    expect(request_counts["update_status"]).to_equal(1)

    # And the currency status on the UI changes to "Inactive"
    expect(page.locator(CURRENCY_STATUS_TEXT_SELECTOR)).to_have_text("Inactive")

    # When the user immediately clicks the *same* status button again
    page.locator(STATUS_TOGGLE_BUTTON_SELECTOR).click()

    # Then no additional API calls are made to update the currency status.
    # We need to wait a short period to ensure no *new* calls are made due to the second click.
    # `page.wait_for_timeout` is suitable here to assert the *absence* of further network activity.
    page.wait_for_timeout(500) # Give some time for any potential delayed calls to register.
    expect(request_counts["update_status"]).to_equal(1) # The count should remain 1.

def test_optimize_api_calls_for_rapid_consecutive_clicks(page: Page):
    """
    Scenario: Optimize API calls for rapid consecutive clicks on currency status
    """
    request_counts = {"update_status": 0}

    # Intercept requests to count them, similar to the previous test.
    page.route(API_ENDPOINT_PATTERN, lambda route: (
        request_counts.update({"update_status": request_counts["update_status"] + 1}),
        route.continue_()
    ))

    # Given a user is on the currency management page (handled by fixture)
    # And a specific currency's status is currently "Active" (handled by fixture)

    # When the user rapidly clicks the status button five times within a short period (e.g., 2 seconds)
    for _ in range(5):
        page.locator(STATUS_TOGGLE_BUTTON_SELECTOR).click()
        # A very small pause between clicks to simulate distinct rapid user input.
        # This duration might need adjustment based on the actual application's responsiveness.
        page.wait_for_timeout(50) # 50ms between clicks

    # Then a maximum of one API call should be made to update the currency status.
    # Wait for the debounced/throttled API call to complete.
    # We use a higher timeout here (e.g., 2000ms) to account for a typical debounce period
    # (often 300-1000ms) plus network latency.
    page.wait_for_response(API_ENDPOINT_PATTERN, timeout=2000)
    # The expectation is that a debounce/throttle mechanism will ensure only one API call
    # is made for the rapid sequence of clicks.
    expect(request_counts["update_status"]).to_be_less_than_or_equal(1)
    # If the application is well-behaved and performs the state change, the count should be exactly 1.

    # And the currency status on the UI should reflect the final intended state.
    # Assuming the final intended state is "Inactive" after the successful toggle.
    expect(page.locator(CURRENCY_STATUS_TEXT_SELECTOR)).to_have_text("Inactive")