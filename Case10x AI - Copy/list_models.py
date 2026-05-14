"""
List available Gemini models
"""
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

print("Listing available Gemini models...")
print("=" * 60)

try:
    genai.configure(api_key=GEMINI_API_KEY)
    
    models = genai.list_models()
    
    print("Available models:")
    for model in models:
        print(f"  - {model.name}")
        if hasattr(model, 'supported_generation_methods'):
            print(f"    Methods: {model.supported_generation_methods}")
    
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {str(e)}")
