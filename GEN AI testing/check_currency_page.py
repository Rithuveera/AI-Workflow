import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        
        # Login
        await page.goto("https://datnext-qa.algosium.com/login")
        await page.fill('input[name="username"]', 'Veera')
        await page.fill('input[name="password"]', 'Rithu@11')
        await page.click('button:has-text("Login")')
        await page.wait_for_url("**/dashboard")
        
        # Manually navigate to currency master URL if we can guess it or find the link
        # Based on the test, it's /currency-master or something similar
        # Let's try to find the menu link by alt text or title since we saw icons
        
        print("\nSearching for Currency Menu...")
        # Try finding by alt or title
        currency_menu = await page.query_selector("img[alt*='Currency'], a[title*='Currency'], button[title*='Currency']")
        if currency_menu:
            print("Found currency menu icon. Clicking...")
            await currency_menu.click()
            await page.wait_for_timeout(2000)
        else:
            print("Currency menu icon not found by alt/title. Trying to navigate directly to /settings/currency-master (guessed)")
            await page.goto("https://datnext-qa.algosium.com/settings/currency-master")
            
        await page.wait_for_timeout(5000)
        print(f"Current URL: {page.url}")
        
        # Dump headers
        headers = await page.query_selector_all("th")
        print(f"\nFound {len(headers)} table headers:")
        for h in headers:
            text = (await h.inner_text()).strip()
            aria_sort = await h.get_attribute("aria-sort")
            print(f"Header: '{text}', aria-sort='{aria_sort}'")
            
        # Dump rows
        rows = await page.query_selector_all("tbody tr")
        print(f"Total rows: {len(rows)}")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
