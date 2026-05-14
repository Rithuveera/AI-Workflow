import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        print("Logging in to find home page structure...")
        await page.goto("https://datnext-qa.algosium.com/login")
        await page.fill('input[name="username"]', 'Veera')
        await page.fill('input[name="password"]', 'Rithu@11')
        await page.click('button:has-text("Login")')
        
        # Wait for navigation
        try:
            await page.wait_for_timeout(10000)
            print(f"Post-login URL: {page.url}")
            
            # Find any h1 or main headings
            h1 = await page.query_selector("h1")
            if h1:
                text = await h1.inner_text()
                print(f"H1 Title: {text}")
            else:
                print("No H1 found. Searching for any page title...")
                title = await page.title()
                print(f"Page Title: {title}")
                
            # List some links
            links = await page.query_selector_all("a")
            print("\n--- DETECTED NAVIGATION LINKS ---")
            for link in links[:30]: # Look at more links
                text = (await link.inner_text()).strip()
                href = await link.get_attribute("href")
                aria_label = await link.get_attribute("aria-label")
                title = await link.get_attribute("title")
                print(f"Link: text='{text}', href='{href}', aria-label='{aria_label}', title='{title}'")
                
        except Exception as e:
            print(f"Error post-login: {e}")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
