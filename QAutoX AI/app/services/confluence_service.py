import requests
from requests.auth import HTTPBasicAuth
import logging
from flask import current_app
import re
from html.parser import HTMLParser

logger = logging.getLogger(__name__)

class ConfluenceHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self.exclude_tags = {'script', 'style'}
        self.recording = True

    def handle_starttag(self, tag, attrs):
        if tag in self.exclude_tags:
            self.recording = False
        
        # Add newlines for block elements
        if tag in {'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'li', 'tr'}:
            self.text_parts.append('\n')

    def handle_endtag(self, tag):
        if tag in self.exclude_tags:
            self.recording = True
        
        if tag in {'li', 'tr'}:
            self.text_parts.append('\n')

    def handle_data(self, data):
        if self.recording:
            cleaned_data = data.strip()
            if cleaned_data:
                self.text_parts.append(cleaned_data + ' ')

    def get_text(self):
        return ''.join(self.text_parts).strip()

def extract_page_id(url_or_id):
    """Extract page ID from Confluence URL or return ID if already an ID"""
    if url_or_id.isdigit():
        return url_or_id
    
    # Try to find digits in the URL (typical for pages/123456/...)
    match = re.search(r'pages/(\d+)', url_or_id)
    if match:
        return match.group(1)
    
    # Try another pattern (viewpage.action?pageId=123456)
    match = re.search(r'pageId=(\d+)', url_or_id)
    if match:
        return match.group(1)
    
    return None

def fetch_confluence_page(page_url_or_id):
    """Fetch content from Confluence page and return as plain text"""
    try:
        conf_url = current_app.config.get('CONFLUENCE_URL')
        conf_email = current_app.config.get('CONFLUENCE_EMAIL')
        conf_token = current_app.config.get('CONFLUENCE_API_TOKEN')

        if not all([conf_url, conf_email, conf_token]):
            return None, "Confluence credentials not configured in environment variables (.env)"

        page_id = extract_page_id(page_url_or_id)
        if not page_id:
            return None, "Could not extract Page ID from the provided input. Please provide a valid URL or Page ID."

        # Ensure base URL is correct (e.g., https://your-domain.atlassian.net/wiki)
        base_url = conf_url.rstrip('/')
        
        # Auto-fix: Atlassian Cloud URLs need /wiki suffix for Confluence API
        if '.atlassian.net' in base_url and not base_url.endswith('/wiki'):
            base_url = f"{base_url}/wiki"
            
        api_url = f"{base_url}/rest/api/content/{page_id}?expand=body.storage,title"

        auth = HTTPBasicAuth(conf_email, conf_token)
        response = requests.get(api_url, auth=auth, timeout=15)

        if response.status_code != 200:
            return None, f"Failed to fetch from Confluence: {response.status_code} - {response.text}"

        data = response.json()
        title = data.get('title', 'Unknown Title')
        storage_body = data.get('body', {}).get('storage', {}).get('value', '')

        if not storage_body:
            return None, "No content found in the Confluence page."

        # Parse XHTML to plain text
        parser = ConfluenceHTMLParser()
        parser.feed(storage_body)
        plain_text = f"Title: {title}\n\n{parser.get_text()}"

        return {
            'title': title,
            'content': plain_text,
            'page_id': page_id
        }, None

    except Exception as e:
        logger.error(f"Confluence fetch error: {e}")
        return None, str(e)
