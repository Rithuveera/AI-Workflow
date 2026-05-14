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
        
        page.goto("https://datnext-qa.algosium.com/master/currency")
        page.wait_for_timeout(5000)
        
        # Check for headers
        headers = page.locator('th')
        for i in range(headers.count()):
            header_text = headers.nth(i).inner_text().strip()
            header_html = headers.nth(i).inner_html()
            print(f"Header {i}: Text='{header_text}', HTML='{header_html}'")
            
        browser.close()

if __name__ == "__main__":
    check_page()
