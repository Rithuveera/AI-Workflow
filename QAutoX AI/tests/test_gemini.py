"""
Simple diagnostic script to test Gemini API directly
"""
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

print("=" * 60)
print("Gemini API Diagnostic Test")
print("=" * 60)

if not GEMINI_API_KEY:
    print("ERROR: GEMINI_API_KEY not found in .env file!")
    exit(1)

print(f"API Key found: {GEMINI_API_KEY[:10]}...{GEMINI_API_KEY[-5:]}")
print()

try:
    print("Configuring Gemini API...")
    genai.configure(api_key=GEMINI_API_KEY)
    
    print("Creating model instance...")
    model = genai.GenerativeModel('gemini-2.0-flash')
    
    print("Sending test request...")
    response = model.generate_content(
        "Generate a simple JSON array with 2 test cases for a login feature. Return ONLY valid JSON.",
        generation_config={"response_mime_type": "application/json"}
    )
    
    print("✓ SUCCESS!")
    print(f"Response length: {len(response.text)} characters")
    print(f"Response preview: {response.text[:200]}...")
    
except Exception as e:
    print(f"✗ ERROR: {type(e).__name__}")
    print(f"Error message: {str(e)}")
    
    # Print full error details
    import traceback
    print("\nFull traceback:")
    print(traceback.format_exc())
