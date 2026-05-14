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
        
        # Navigate
        await page.goto("https://datnext-qa.algosium.com/master/currency")
        await page.wait_for_selector("th")
        
        # Find the CODE header
        h = await page.query_selector("th:has-text('CODE')")
        if h:
            # Check for inner icons or clickable elements
            html = await h.inner_html()
            print(f"\nHeader CODE inner HTML:\n{html}")
            
            # Find all children
            children = await h.query_selector_all("*")
            print(f"\nChildren found: {len(children)}")
            for i, c in enumerate(children):
                tag = await c.evaluate("e => e.tagName")
                cls = await c.get_attribute("class")
                text = (await c.inner_text()).strip()
                print(f"Child {i}: <{tag}> class='{cls}' text='{text}'")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
