from playwright.sync_api import sync_playwright
import os

def check_page():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://datnext-qa.algosium.com/login")
        page.fill('input[name="username"]', "Veera")
        page.fill('input[name="password"]', "Rithu@11")
        page.click('button:has-text("Login")')
        page.wait_for_url("**/dashboard")
        print(f"Logged in, current URL: {page.url}")
        page.screenshot(path="after_login.png")
        
        page.goto("https://datnext-qa.algosium.com/master/currency")
        page.wait_for_timeout(5000)
        page.screenshot(path="currency_page.png")
        print(f"Currency page screenshot saved. HTML length: {len(page.content())}")
        
        # Check for table rows
        rows = page.locator('tbody tr')
        print(f"Number of rows found: {rows.count()}")
        
        # Check for headers
        headers = page.locator('th')
        for i in range(headers.count()):
            print(f"Header {i}: '{headers.nth(i).inner_text()}'")
            
        browser.close()

if __name__ == "__main__":
    check_page()
