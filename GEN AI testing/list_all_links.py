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
        
        # Try to find all links in the entire body
        print("\n--- FINDING ALL LINKS ON DASHBOARD ---")
        links = await page.query_selector_all("a")
        for link in links:
            text = (await link.inner_text()).strip()
            href = await link.get_attribute("href")
            if text or href:
                print(f"Link: text='{text}', href='{href}'")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
