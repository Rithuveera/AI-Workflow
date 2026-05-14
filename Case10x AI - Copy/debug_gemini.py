import os
import google.generativeai as genai
from dotenv import load_dotenv
import traceback

# Load environment variables
load_dotenv()
api_key = os.getenv('GEMINI_API_KEY')
print(f"API Key: {api_key[:10]}...")

genai.configure(api_key=api_key)

def test_generation():
    try:
        print("Testing Gemini 1.5 Flash...")
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = "Generate 3 simple test cases for a login page in JSON format."
        
        print("Sending request...")
        response = model.generate_content(prompt)
        
        print("Response received!")
        print(response.text)
        
    except Exception as e:
        print(f"\n❌ ERROR: {type(e).__name__}")
        print(str(e))
        print("\nFull Traceback:")
        traceback.print_exc()

if __name__ == "__main__":
    test_generation()
