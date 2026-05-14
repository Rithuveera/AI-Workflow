
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-flash-latest')
# Try a simpler model name if that one is problematic, but let's test what the app uses first.
# actually 'gemini-flash-latest' might be deprecated or not pointing where we think.
# Let's try to generate something.

try:
    print("Testing gemini-flash-latest...")
    response = model.generate_content("Hello, can you hear me?")
    print("Response:", response.text)
except Exception as e:
    print("Error:", str(e))
    # Check for safety ratings or other blocks
    if hasattr(e, 'response'):
        print("Response feedback:", e.response.prompt_feedback)
        
print("-" * 20)
print("Testing gemini-1.5-flash...")
try:
    model2 = genai.GenerativeModel('gemini-1.5-flash')
    response2 = model2.generate_content("Hello")
    print("Response:", response2.text)
except Exception as e:
    print("Error with 1.5-flash:", str(e))
