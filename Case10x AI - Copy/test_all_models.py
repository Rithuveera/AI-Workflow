import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def test_all_models():
    print("Fetching available models...")
    models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
    
    print(f"Found {len(models)} models. Testing each one...\n")
    
    working_models = []
    
    for model_name in models:
        # Skip vision-only or specialized models if we want text
        if 'vision' in model_name or 'embedding' in model_name:
            continue
            
        print(f"Testing {model_name}...", end=" ")
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content("Hello, reply with 'OK'")
            if response.text:
                print("✅ SUCCESS")
                working_models.append(model_name)
            else:
                print("❌ FAILED (Empty response)")
        except Exception as e:
            print(f"❌ FAILED ({type(e).__name__})")
            # print(f"  Error: {e}")

    print("\n" + "="*30)
    print("🏆 WORKING MODELS:")
    print("="*30)
    for m in working_models:
        print(f"- {m}")

if __name__ == "__main__":
    test_all_models()
