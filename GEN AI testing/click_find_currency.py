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
        
        # List all sidebar icons
        sidebar_selector = ".sidebar img, .sidebar_sidebar__A9Lnm img"
        icons = await page.query_selector_all(sidebar_selector)
        print(f"Found {len(icons)} sidebar icons.")
        
        for i in range(len(icons)):
            # Re-fetch icons because list might be stale
            icons = await page.query_selector_all(sidebar_selector)
            icon = icons[i]
            alt = await icon.get_attribute("alt")
            
            if alt == "logo": continue

            print(f"\nClicking icon {i} (alt='{alt}')...")
            await icon.click()
            await page.wait_for_timeout(1000)
            
            # Check for "Currency" in visible links
            links = await page.query_selector_all("a:visible, button:visible")
            for link in links:
                text = (await link.inner_text()).strip()
                if "Currency" in text:
                    print(f"!!! FOUND '{text}' after clicking icon {i} (alt='{alt}') !!!")
                    href = await link.get_attribute("href")
                    print(f"   URL: {href}")
            
            # Close menu if it's an overlay or just move on
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
