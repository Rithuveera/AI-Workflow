import os
import re

# Regex for Gemini/Google API Keys
GEMINI_REGEX = r'AIzaSy[A-Za-z0-9_-]{33,}'
# Regex for Atlassian Tokens (usually start with ATATT and are long)
ATLASSIAN_REGEX = r'ATATT[A-Za-z0-9_-]{100,}(=[A-F0-9]{8})?'
# Regex for Stripe Keys (already handled one, but let's be safe)
STRIPE_REGEX = r'sk_live_[A-Za-z0-9]{24,}'

def sanitize_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = re.sub(GEMINI_REGEX, '[REDACTED_GEMINI_KEY]', content)
        new_content = re.sub(ATLASSIAN_REGEX, '[REDACTED_ATLASSIAN_TOKEN]', new_content)
        new_content = re.sub(STRIPE_REGEX, '[REDACTED_STRIPE_KEY]', new_content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Sanitized: {filepath}")
    except Exception as e:
        # Skip binary files or errors
        pass

def main():
    root_dir = r'c:\Users\veeramani\.gemini\antigravity\scratch'
    for root, dirs, files in os.walk(root_dir):
        if '.git' in dirs:
            dirs.remove('.git')
        for file in files:
            if file.endswith(('.py', '.js', '.ts', '.tsx', '.json', '.md', '.txt')):
                sanitize_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
