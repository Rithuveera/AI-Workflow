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
        
        # Get all text in the whole DOM
        all_html = await page.content()
        if "Currency" in all_html:
            print("Found 'Currency' word in the DOM HTML.")
            # Where is it?
            # Search for links or buttons
            all_elements = await page.query_selector_all("a, button, span, div, p")
            for i, el in enumerate(all_elements):
                text = (await el.inner_text()).strip()
                if "Currency" in text:
                    tag = await el.evaluate("e => e.tagName")
                    cls = await el.get_attribute("class")
                    visible = await el.is_visible()
                    print(f"[{i}] <{tag}> class='{cls}' visible={visible} text='{text}'")
                    
        else:
            print("'Currency' word not found in the DOM.")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
