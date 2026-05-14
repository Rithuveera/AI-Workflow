import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        print("Logging in to find real data...")
        await page.goto("https://datnext-qa.algosium.com/login")
        await page.fill('input[name="username"]', 'Veera')
        await page.fill('input[name="password"]', 'Rithu@11')
        await page.click('button:has-text("Login")')
        
        await page.wait_for_timeout(10000)
        print(f"Post-login URL: {page.url}")
        
        # Take a screenshot to see the state
        await page.screenshot(path="dashboard_screenshot.png")
        print("Screenshot saved to dashboard_screenshot.png")
        
        # Get all text on the page
        content = await page.content()
        print("\n--- CONTENT PREVIEW ---")
        # Just print first 500 chars to see structure
        print(content[:500])
        
        # Look for patterns like Q-XXXX or E-XXXX (Quotes or Estimations)
        all_text = await page.evaluate("document.body.innerText")
        print("\n--- DETECTED TEXT ON DASHBOARD ---")
        print(all_text)
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
