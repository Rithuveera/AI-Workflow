import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        print("Navigating to login page...")
        await page.goto("https://datnext-qa.algosium.com/login")
        await page.wait_for_timeout(5000) # Wait for React to render
        
        print("\n--- INPUT FIELDS ---")
        inputs = await page.query_selector_all("input")
        for i, input in enumerate(inputs):
            name = await input.get_attribute("name")
            placeholder = await input.get_attribute("placeholder")
            type_attr = await input.get_attribute("type")
            print(f"Input {i}: name='{name}', placeholder='{placeholder}', type='{type_attr}'")
            
        print("\n--- BUTTONS ---")
        buttons = await page.query_selector_all("button")
        for i, button in enumerate(buttons):
            text = await button.inner_text()
            type_attr = await button.get_attribute("type")
            print(f"Button {i}: text='{text}', type='{type_attr}'")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
