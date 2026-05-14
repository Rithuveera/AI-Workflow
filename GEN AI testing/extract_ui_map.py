import asyncio
import sys
import json
import os
from playwright.async_api import async_playwright

async def extract_ui_context(url):
    """
    Logs in and scrapes simple metadata for all interactive elements.
    """
    username = os.environ.get("APP_USER", "Veera")
    password = os.environ.get("APP_PASSWORD", "Rithu@11")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # 1. Login
        await page.goto("https://datnext-qa.algosium.com/login")
        await page.fill('input[name="username"]', username)
        await page.fill('input[name="password"]', password)
        await page.click('button:has-text("Login")')
        await page.wait_for_url("**/dashboard")
        
        # 2. Go to target URL if specified
        if url and url.startswith("http"):
            await page.goto(url)
            await page.wait_for_timeout(3000) # Wait for table/form to load
            
        # 3. Extract interactive elements (a, button, input, th, select)
        elements_data = []
        interactive = await page.query_selector_all("a, button, input, th, select, [role='button']")
        
        for el in interactive[:100]: # Limit to avoid context bloating
            try:
                tag = await el.evaluate("e => e.tagName")
                text = (await el.inner_text()).strip()
                placeholder = await el.get_attribute("placeholder")
                aria = await el.get_attribute("aria-label")
                id_attr = await el.get_attribute("id")
                cls = await el.get_attribute("class")
                # For th, check for children like svg which might be sort icons
                has_svg = await el.query_selector("svg") is not None
                
                elements_data.append({
                    "tag": tag,
                    "text": text,
                    "id": id_attr,
                    "placeholder": placeholder,
                    "aria": aria,
                    "class": cls,
                    "is_sortable_header": tag == "TH" and has_svg
                })
            except:
                continue
                
        # 4. Print as JSON so the agent can parse it easily
        print(json.dumps(elements_data, indent=2))
        await browser.close()

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else ""
    asyncio.run(extract_ui_context(target))
