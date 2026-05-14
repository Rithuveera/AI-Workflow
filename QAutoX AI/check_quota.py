"""
Check Gemini API quota and usage information
"""
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

print("=" * 70)
print("Gemini API Quota Information")
print("=" * 70)

genai.configure(api_key=GEMINI_API_KEY)

print("\nFREE TIER LIMITS (as of 2025):")
print("-" * 70)
print("Model: gemini-2.0-flash")
print("  • Requests per day: 1,500 (shared across all projects)")
print("  • Requests per minute: 15")
print("  • Tokens per minute: 1,000,000")
print()
print("Model: gemini-2.5-flash")
print("  • Requests per day: 1,500 (shared across all projects)")
print("  • Requests per minute: 15")
print("  • Tokens per minute: 4,000,000")
print()

print("\nIMPORTANT NOTES:")
print("-" * 70)
print("1. Quota is PER API KEY, not per application")
print("2. All requests using the same API key share the same quota")
print("3. Quota resets at midnight Pacific Time (PT)")
print("4. Each test case generation uses 1 request")
print("5. Large documents may use more tokens")
print()

print("\nWHY QUOTA MIGHT BE EXHAUSTED:")
print("-" * 70)
print("✓ You used this API key in other projects today")
print("✓ You ran multiple tests during development")
print("✓ The app.js clears test cases on page load (triggers API call)")
print("✓ Multiple browser refreshes = multiple API calls")
print("✓ Testing with different files")
print()

print("\nSOLUTIONS:")
print("-" * 70)
print("1. Wait until tomorrow (quota resets daily)")
print("2. Use a different/new API key")
print("3. Upgrade to paid tier for higher limits")
print("4. Optimize: Remove auto-clear on page load")
print()



print("\nTESTING API CONNECTION...")
print("-" * 70)

models_to_check = ['gemini-2.5-flash', 'gemini-2.0-flash-exp', 'gemini-1.5-flash']

for model_name in models_to_check:
    print(f"Testing {model_name}...", end=" ")
    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Reply with 'OK'", request_options={'timeout': 10})
        print(f"✅ SUCCESS")
    except Exception as e:
        if "429" in str(e):
            print(f"❌ QUOTA EXHAUSTED")
        else:
            print(f"❌ FAILED ({str(e)[:50]}...)")

print("\nTo check your detailed usage statistics:")
print("Visit: https://aistudio.google.com/app/apikey")
print("=" * 70)
