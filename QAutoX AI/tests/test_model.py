"""
Test gemini-2.5-flash model
"""
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

print("Testing gemini-2.5-flash model...")
print("=" * 60)

try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    response = model.generate_content(
        "Generate a simple JSON array with 2 test cases for a login feature. Return ONLY valid JSON.",
        generation_config={"response_mime_type": "application/json"}
    )
    
    print("✓ SUCCESS with gemini-2.5-flash!")
    print(f"Response length: {len(response.text)} characters")
    print(f"Response preview:\n{response.text[:400]}...")
    
except Exception as e:
    print(f"✗ ERROR: {type(e).__name__}")
    print(f"Error: {str(e)[:300]}")
