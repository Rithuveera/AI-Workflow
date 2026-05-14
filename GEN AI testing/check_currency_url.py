import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Login
        await page.goto("https://datnext-qa.algosium.com/login")
        await page.fill('input[name="username"]', 'Veera')
        await page.fill('input[name="password"]', 'Rithu@11')
        await page.click('button:has-text("Login")')
        await page.wait_for_url("**/dashboard")
        
        # Navigate to the provided URL
        print(f"\nNavigating to: https://datnext-qa.algosium.com/master/currency")
        await page.goto("https://datnext-qa.algosium.com/master/currency")
        await page.wait_for_timeout(5000)
        
        print(f"Current URL: {page.url}")
        
        # Check table structure
        headers = await page.query_selector_all("th")
        print(f"\nFound {len(headers)} table headers:")
        for h in headers:
            text = (await h.inner_text()).strip()
            # check all attributes
            attrs = await h.evaluate("""el => {
                let attrs = {};
                for (let i = 0; i < el.attributes.length; i++) {
                    attrs[el.attributes[i].name] = el.attributes[i].value;
                }
                return attrs;
            }""")
            print(f"Header: '{text}', attrs={attrs}")
            
        # Check rows
        rows = await page.query_selector_all("tbody tr")
        print(f"Total rows: {len(rows)}")
        if len(rows) > 0:
            cells = await rows[0].query_selector_all("td")
            for i, cell in enumerate(cells):
                print(f"Cell {i}: '{(await cell.inner_text()).strip()}'")

        # Take a screenshot to confirm
        await page.screenshot(path="currency_page_check.png")
        print("Screenshot saved to currency_page_check.png")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
