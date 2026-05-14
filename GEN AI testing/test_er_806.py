import pytest
from playwright.sync_api import Page, expect

# Define a base URL for our mock API
BASE_API_URL = "http://localhost:8000/api/currency"

# Helper to track API calls
class ApiCallTracker:
    def __init__(self):
        self.calls = {}

    def increment(self, url, method="GET"):
        key = f"{method} {url}"
        self.calls[key] = self.calls.get(key, 0) + 1

    def get_count(self, url, method="GET"):
        key = f"{method} {url}"
        return self.calls.get(key, 0)

    def reset(self):
        self.calls = {}

api_tracker = ApiCallTracker()

@pytest.fixture(autouse=True)
def setup_and_teardown(page: Page):
    """
    Fixture to reset the API call tracker before each test.
    """
    api_tracker.reset()
    yield
    # No specific teardown needed after tests for this example

def test_prevent_redundant_api_calls_on_stable_status(page: Page):
    """
    Scenario: Prevent redundant API calls when repeatedly clicking an already stable currency status
    """
    currency_name = "USD"
    initial_status = "Active"
    status_api_endpoint = f"/{currency_name}/status"
    full_status_api_url = f"{BASE_API_URL}{status_api_endpoint}"

    # Given a user is logged in and viewing the currency management dashboard
    # And a currency named "USD" is displayed with its status as "Active"
    page.set_content(f"""
        <div id="dashboard">
            <h1>Currency Management</h1>
            <div id="currency-{currency_name}" data-currency-name="{currency_name}">
                <span>{currency_name}: </span>
                <button id="status-indicator-{currency_name}" class="status-{initial_status.lower()}">
                    {initial_status}
                </button>
            </div>
        </div>
    """)

    # And the current "Active" status of "USD" is confirmed by the backend
    # Mock the API response for status verification/refresh (GET request)
    page.route(f"**{status_api_endpoint}", lambda route: [
        api_tracker.increment(full_status_api_url, route.request.method),
        route.fulfill(
            status=200,
            content_type="application/json",
            body=f'{{"currency": "{currency_name}", "status": "{initial_status}"}}'
        )
    ], method="GET")

    status_indicator = page.locator(f"#status-indicator-{currency_name}")
    expect(status_indicator).to_have_text(initial_status)
    expect(status_indicator).to_have_class(f"status-{initial_status.lower()}")

    # When the user clicks the "Active" status indicator for "USD"
    status_indicator.click()
    # Give a small buffer for any async UI logic to trigger the call.
    # In a real application, this might involve a debounce or a direct call.
    # We assume the first click on a stable status might trigger a verification GET call.
    page.wait_for_timeout(100)

    # Then exactly one API call to verify or refresh the status of "USD" should be initiated
    assert api_tracker.get_count(full_status_api_url, "GET") == 1, \
        "Expected exactly one API GET call after the first click on a stable status."

    # And the status of "USD" on the UI should remain "Active"
    expect(status_indicator).to_have_text(initial_status)
    expect(status_indicator).to_have_class(f"status-{initial_status.lower()}")

    # When the user clicks the "Active" status indicator for "USD" two more times consecutively
    status_indicator.click()
    status_indicator.click()
    page.wait_for_timeout(100) # Give a small buffer for any async UI logic

    # Then no additional API calls related to "USD" status verification/refresh should be initiated beyond the first one
    assert api_tracker.get_count(full_status_api_url, "GET") == 1, \
        "Expected no additional API GET calls after subsequent clicks on a stable status."

    # And the status of "USD" on the UI should continue to display as "Active"
    expect(status_indicator).to_have_text(initial_status)
    expect(status_indicator).to_have_class(f"status-{initial_status.lower()}")


def test_optimize_api_call_handling_on_rapid_clicks(page: Page):
    """
    Scenario: Optimize API call handling when rapidly clicking currency status
    """
    currency_name = "EUR"
    initial_status = "Inactive"
    final_status = "Active" # Assuming clicking 'Inactive' toggles it to 'Active'
    status_api_endpoint = f"/{currency_name}/status"
    full_status_api_url = f"{BASE_API_URL}{status_api_endpoint}"

    # Given a user is logged in and viewing the currency management dashboard
    # And a currency named "EUR" is displayed with its status as "Inactive"
    page.set_content(f"""
        <div id="dashboard">
            <h1>Currency Management</h1>
            <div id="currency-{currency_name}" data-currency-name="{currency_name}">
                <span>{currency_name}: </span>
                <button id="status-indicator-{currency_name}" class="status-{initial_status.lower()}">
                    {initial_status}
                </button>
            </div>
        </div>
    """)

    # Mock the API response for status update (PUT request)
    def handle_status_update(route):
        api_tracker.increment(full_status_api_url, route.request.method)
        # Simulate network delay for the API call to make debouncing more realistic
        page.wait_for_timeout(500)
        route.fulfill(
            status=200,
            content_type="application/json",
            body=f'{{"currency": "{currency_name}", "status": "{final_status}"}}'
        )

    page.route(f"**{status_api_endpoint}", handle_status_update, method="PUT")

    status_indicator = page.locator(f"#status-indicator-{currency_name}")
    expect(status_indicator).to_have_text(initial_status)
    expect(status_indicator).to_have_class(f"status-{initial_status.lower()}")

    # When the user rapidly clicks the "Inactive" status indicator for "EUR" five times within a 1-second interval
    # Playwright clicks are fast, simulating "rapidly"
    for _ in range(5):
        status_indicator.click()

    # Then a maximum of one API call to update or toggle the status of "EUR" should be initiated
    # We need to wait for the debounced API call (if any) to complete, including its mocked delay,
    # and for the UI to potentially update.
    # A generous wait to ensure the debounced call (with 500ms mock delay) and subsequent UI update has time.
    page.wait_for_timeout(1500)

    assert api_tracker.get_count(full_status_api_url, "PUT") <= 1, \
        "Expected a maximum of one API PUT call for rapid clicks due to debouncing/throttling."

    # And the UI should reflect the final intended status of "EUR" after the API call completes
    # We assume the frontend updates the button text and class based on the API response.
    # Since our mock returns `final_status`, the UI should eventually reflect this.
    expect(status_indicator).to_have_text(final_status)
    expect(status_indicator).to_have_class(f"status-{final_status.lower()}")

    # And the system should remain responsive without performance degradation
    # This is implicitly tested by the test completing without hanging and the UI updating correctly.
    # The debouncing itself is the mechanism for responsiveness. No explicit assertion needed beyond
    # the test passing within a reasonable time and the API call count being optimized.