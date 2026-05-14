
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-flash-latest')

try:
    print("Testing gemini-flash-latest with JSON config...")
    response = model.generate_content(
        "Return a JSON object: {'key': 'value'}",
        generation_config={"response_mime_type": "application/json"}
    )
    print("Response:", response.text)
except Exception as e:
    print("Error:", str(e))
