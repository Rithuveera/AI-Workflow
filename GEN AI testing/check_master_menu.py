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
        await page.wait_for_timeout(2000)
        
        # Click "Master" icon
        print("\nClicking 'Master' icon...")
        master_icon = await page.query_selector("img[alt='Master']")
        if master_icon:
            await master_icon.click()
            await page.wait_for_timeout(2000)
            
            print("\n--- LINKS REVEALED AFTER CLICKING MASTER ---")
            links = await page.query_selector_all("a:visible, button:visible")
            for link in links:
                text = (await link.inner_text()).strip()
                title = await link.get_attribute("title")
                aria = await link.get_attribute("aria-label")
                href = await link.get_attribute("href")
                if text or title or aria:
                    print(f"LINK/BUTTON: text='{text}', title='{title}', aria='{aria}', href='{href}'")
        else:
            print("Master icon not found.")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
