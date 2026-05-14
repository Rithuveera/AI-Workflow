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
        icons = await page.query_selector_all(".sidebar img, .sidebar_sidebar__A9Lnm img")
        print(f"Found {len(icons)} sidebar icons.")
        
        for i, icon in enumerate(icons):
            alt = await icon.get_attribute("alt")
            print(f"\nHovering on icon {i} (alt='{alt}')...")
            await icon.hover()
            await page.wait_for_timeout(1000)
            
            # Check for any new text revealed
            revealed_text = await page.evaluate("""() => {
                const el = document.body;
                return el.innerText;
            }""")
            
            # Find specific keywords
            if "Currency" in revealed_text:
                print(f"!!! FOUND 'Currency' after hovering on icon {i} (alt='{alt}') !!!")
                # List visible links now
                links = await page.query_selector_all("a:visible, button:visible")
                for link in links:
                    text = (await link.inner_text()).strip()
                    if "Currency" in text:
                        print(f"   Revealed Link: '{text}'")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
