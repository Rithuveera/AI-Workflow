import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        print("Logging in...")
        await page.goto("https://datnext-qa.algosium.com/login")
        await page.fill('input[name="username"]', 'Veera')
        await page.fill('input[name="password"]', 'Rithu@11')
        await page.click('button:has-text("Login")')
        await page.wait_for_url("https://datnext-qa.algosium.com/dashboard")
        await page.wait_for_timeout(5000) # Wait for sidebar to render
        
        print("\n--- ANALYZING SIDEBAR ---")
        
        # Look for all elements with "sidebar" or "menu" in class or id
        sidebar_candidates = await page.query_selector_all("*[class*='sidebar'], *[class*='menu'], *[id*='sidebar'], *[id*='menu']")
        print(f"Potential sidebar/menu containers: {len(sidebar_candidates)}")
        for i, c in enumerate(sidebar_candidates[:5]):
            tag = await c.evaluate("el => el.tagName")
            cls = await c.get_attribute("class")
            print(f"Container {i}: <{tag}> class='{cls}'")
            
        # Find all clickable items in the left side of the screen
        # Usually icon/link menus are on the left
        all_links = await page.query_selector_all("a, li, button")
        print(f"\nTotal potential links/buttons: {len(all_links)}")
        
        for i, link in enumerate(all_links):
            # Check position
            box = await link.bounding_box()
            if box and box['x'] < 100: # Only look at left-side items
                inner_html = await link.inner_html()
                cls = await link.get_attribute("class")
                text = (await link.inner_text()).strip()
                print(f"ITEM {i}: pos({box['x']}, {box['y']}) text='{text}' class='{cls}' html_snippet='{inner_html[:100]}...'")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
