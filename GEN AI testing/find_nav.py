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
        await page.wait_for_timeout(5000)
        
        print("\n--- FINDING NAV ITEMS ---")
        # Find all images and their nearest links
        imgs = await page.query_selector_all("img")
        for i, img in enumerate(imgs):
            alt = await img.get_attribute("alt")
            src = await img.get_attribute("src")
            # Find parent <a>
            parent_a = await img.query_selector("xpath=ancestor::a")
            href = await parent_a.get_attribute("href") if parent_a else "N/A"
            print(f"IMG {i}: alt='{alt}', src='{src}', href='{href}'")
            
        # Find all links with title or aria-label
        links = await page.query_selector_all("a, button")
        for i, link in enumerate(links):
            title = await link.get_attribute("title")
            aria = await link.get_attribute("aria-label")
            text = (await link.inner_text()).strip()
            if title or aria or text:
                print(f"LINK/BUTTON {i}: text='{text}', title='{title}', aria='{aria}'")
                
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
