import asyncio
import json
import os
from playwright.async_api import async_playwright

async def crawl_sitemap():
    """
    Autonomous Sitemap Crawler: Finds all navigation links by interacting with the sidebar.
    """
    base_url = os.environ.get("APP_BASE_URL", "https://datnext-qa.algosium.com")
    username = os.environ.get("APP_USER", "Veera")
    password = os.environ.get("APP_PASSWORD", "Rithu@11")
    
    print(f"[Crawler] Starting autonomous sitemap discovery for {base_url}...")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # 1. Login
        print("[Crawler] Logging in...")
        await page.goto(f"{base_url}/login")
        await page.fill('input[name="username"]', username)
        await page.fill('input[name="password"]', password)
        await page.click('button:has-text("Login")')
        await page.wait_for_url(f"{base_url}/dashboard", timeout=20000)
        
        # 2. Discover Sidebar Icons and Sub-links
        print("[Crawler] Discovering sidebar and menus...")
        sitemap = {}
        
        # Find all top-level sidebar items (usually <a> or <button> inside a nav)
        # Based on the screenshot, it's a fixed sidebar on the left.
        sidebar_items = await page.query_selector_all(".sidebar a, .navbar a, nav a")
        
        if not sidebar_items:
            # Fallback for generic structure
            sidebar_items = await page.query_selector_all("aside a, .side-menu a")
            
        print(f"[Crawler] Found {len(sidebar_items)} potential menu items.")
        
        for i, item in enumerate(sidebar_items):
            try:
                # Hover to reveal any hidden tooltips or text
                await item.hover()
                await page.wait_for_timeout(500) # Wait for animation
                
                # Try to get text/title/aria-label
                text = (await item.inner_text()).strip()
                title = await item.get_attribute("title")
                aria_label = await item.get_attribute("aria-label")
                href = await item.get_attribute("href")
                
                label = text or title or aria_label or f"Icon_{i}"
                
                if label and href and href != "#":
                    sitemap[label] = {"url": href, "type": "direct"}
                    print(f"         + Found Link: '{label}' -> {href}")
                
                # If it's a menu, it might have children. Let's click it to expand.
                await item.click()
                await page.wait_for_timeout(1000) # Wait for menu to expand
                
                # Look for sub-links that just appeared
                sub_links = await page.query_selector_all("a:visible")
                for sub in sub_links:
                    sub_text = (await sub.inner_text()).strip()
                    sub_href = await sub.get_attribute("href")
                    if sub_text and sub_href and sub_href != href and sub_href.startswith("/"):
                        if sub_text not in sitemap:
                            sitemap[sub_text] = {"url": sub_href, "parent": label, "type": "sub-menu"}
                            print(f"           - Found Sub-link: '{sub_text}' under '{label}' -> {sub_href}")
            except Exception as e:
                # print(f"         ! Error scanning item {i}: {e}")
                continue
        
        # Save the discovered sitemap
        with open("sitemap.json", "w") as f:
            json.dump(sitemap, f, indent=4)
        
        print(f"[Crawler] Sitemap saved to sitemap.json with {len(sitemap)} entries.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(crawl_sitemap())
