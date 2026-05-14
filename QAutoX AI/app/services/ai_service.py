import google.generativeai as genai
import json
import logging
from flask import current_app

logger = logging.getLogger(__name__)

def configure_genai():
    api_key = current_app.config.get('GEMINI_API_KEY')
    if not api_key:
        logger.warning("GEMINI_API_KEY not found in environment variables!")
    else:
        genai.configure(api_key=api_key)

def generate_test_cases(requirement_text, model_name='gemini-2.5-flash'):
    """Use Gemini AI to generate test cases with automatic fallback"""
    configure_genai()
    
    # Define fallback strategy
    models_to_try = [model_name]
    if model_name != 'gemini-2.5-flash':
        models_to_try.append('gemini-2.5-flash')
            
    last_error = None
    quota_exceeded_count = 0
    
    for current_model in models_to_try:
        try:
            print(f"Attempting generation with model: {current_model}")
            model = genai.GenerativeModel(current_model)
            
            prompt = f"""
            You are an expert QA engineer with 10+ years of experience. Analyze the following requirement document THOROUGHLY.
            First, identifying ALL distinct requirements and assign them IDs (e.g., REQ-001, REQ-002) if they are not already numbered.
            Then, generate COMPREHENSIVE test cases covering each of these requirements.
    
            REQUIREMENT DOCUMENT:
            {requirement_text[:30000]}
    
            CRITICAL INSTRUCTIONS:
            1. READ THE ENTIRE DOCUMENT carefully and identify EVERY feature, function, and requirement
            2. For EACH feature/requirement, generate test cases covering:
               - POSITIVE scenarios (happy path)
               - NEGATIVE scenarios (error handling)
               - EDGE CASES (boundary conditions)
               - INTEGRATION scenarios
    
            3. Generate detailed test cases in JSON format. Each test case MUST include:
               - test_case_name: A clear, specific, descriptive name
               - requirement_id: The ID of the requirement this test case covers (e.g., "REQ-001")
               - requirement_description: A brief description of the requirement itself (e.g. "User must log in")
               - description: Brief description of what is being tested and why
               - preconditions: Any setup or conditions needed before testing
               - test_steps: Detailed step-by-step instructions (as a numbered list with \\n separators)
               - expected_result: What should happen if the test passes
               - priority: High, Medium, or Low
               - test_type: Functional, Security, Performance, Usability, etc.
    
            TEST COVERAGE REQUIREMENTS:
            - Ensure EVERY identified requirement has at least one Positive and one Negative test case.
            - Maintain a 50-50 balance between Functional and Non-Functional tests where applicable.
    
            Return ONLY a valid JSON array of test cases.
            """
            
            response = model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )
            
            print(f"Received response from {current_model}")
            response_text = response.text.strip()
            
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
                
            response_text = response_text.strip()
            
            try:
                test_cases = json.loads(response_text)
                print(f"✅ Successfully parsed {len(test_cases)} test cases using {current_model}")
                return test_cases, None
            except json.JSONDecodeError as e:
                print(f"⚠️ JSON Decode Error: {e}. Attempting repair...")
                repaired_json = repair_json(response_text)
                if repaired_json:
                    test_cases = json.loads(repaired_json)
                    print(f"✅ Successfully parsed {len(test_cases)} test cases after repair.")
                    return test_cases, None
                else:
                    raise e

        except Exception as e:
            error_msg = str(e)
            print(f"❌ Error with {current_model}: {error_msg}")
            
            if "429" in error_msg or "quota" in error_msg.lower() or "resource_exhausted" in error_msg.lower():
                print(f"⚠️ Quota exceeded for {current_model}. Trying next model...")
                quota_exceeded_count += 1
                last_error = f"Quota exceeded for {current_model}"
                continue
            else:
                print(f"⚠️ {current_model} failed: {error_msg}. Trying next model...")
                last_error = f"{current_model} error: {error_msg}"
                continue

    if quota_exceeded_count == len(models_to_try):
        return None, (
            f"⚠️ API Quota Exceeded - Rate limit reached for Gemini API.\n"
            f"Please wait 2-3 minutes or create a new API key."
        )
    else:
        return None, f"All AI models failed. Last error: {last_error}. Please try again later."

def repair_json(json_str):
    """
    Attempts to repair a truncated JSON string.
    Assumes the structure is an array of objects [{}, {}, ...].
    """
    try:
        # If it doesn't start with [, it's probably not even an array
        if not json_str.strip().startswith('['):
            return None
            
        # Try to find the last closing brace '}'
        last_object_end = json_str.rfind('}')
        
        if last_object_end == -1:
            return "[]" # Return empty array if no objects found
            
        # Cut off everything after the last '}'
        trimmed_json = json_str[:last_object_end+1]
        
        # Close the array
        repaired_json = trimmed_json + "]"
        
        # Test if it parseable
        json.loads(repaired_json)
        return repaired_json
    except Exception as e:
        print(f"Repair failed: {e}")
        return None

def generate_chat_response(message, context):
    try:
        configure_genai()
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        chat_prompt = f"""
        You are a helpful QA Assistant. You have access to the following requirement document:
        
        --- START OF DOCUMENT ---
        {context[:30000]} 
        --- END OF DOCUMENT ---
        (Note: Document text may be truncated if too long)
        
        User Query: {message}
        
        Answer the user's question based strictly on the document provided. If the information is not in the document, say so.
        Keep answers concise and helpful.
        """
        
        response = model.generate_content(chat_prompt)
        return response.text
    except Exception as e:
        print(f"Chat error: {e}")
        return str(e)

def generate_defect_report_ai(test_case, failure_reason):
    try:
        configure_genai()
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = f"""
        You are a QA Lead. A test case has FAILED. Your task is to write a PROFESSIONAL SOFTWARE BUG REPORT based on the details below.
        
        CONTEXT:
        Test Case Name: {test_case.get('test_case_name')}
        Test Steps: {test_case.get('test_steps')}
        Expected Result: {test_case.get('expected_result')}
        User's Observation (Failure Reason): "{failure_reason}"
        
        OUTPUT FORMAT (Markdown):
        **Summary:** [Concise, catchy title for the bug]
        
        **Description:**
        The user was executing the test "{test_case.get('test_case_name')}" and encountered an issue.
        
        **Steps to Reproduce:**
        [Refine the test steps into clear reproduction steps]
        
        **Actual Result:**
        [Based on the User's Observation]
        
        **Expected Result:**
        {test_case.get('expected_result')}
        
        **Severity:** [Suggest: Low/Medium/High/Critical based on context]
        **Environment:** [Suggest asking user, or assume generic]
        """
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating defect report: {str(e)}"

def generate_automation_script_ai(test_case, target_url, target_username, target_password, image_file=None):
    try:
        configure_genai()
        prompt_text = f"""
        You are an expert QA Automation Engineer. 
        Generate a Playwright test script in JavaScript for the following test case.
        
        Test Case Name: {test_case.get('test_case_name')}
        Description: {test_case.get('description')}
        Preconditions: {test_case.get('preconditions')}
        Steps: {test_case.get('test_steps')}
        Expected Result: {test_case.get('expected_result')}
        Target URL: {target_url if target_url else "Not specified - Use generic 'http://localhost:3000'"}
        
        Rules:
        1. Use 'require("@playwright/test")' syntax.
        2. Use robust USER-FACING locators (getByRole, getByLabel, getByPlaceholder, getByText).
        3. AVOID using IDs or CSS selectors unless absolutely necessary.
        4. Include comments explaining the steps.
        5. Start the test by navigating to the Target URL: {target_url if target_url else "'http://localhost:3000'"}.
        6. Return ONLY the raw JavaScript code. Do not include markdown formatting.
        7. Include assertions based on the Expected Result.
        """
        
        if target_username and target_password:
             prompt_text += f"""
             8. IMPORTANT: The test involves logging in. 
                Use the following credentials if the test requires login:
                Username: "{target_username}"
                Password: "{target_password}"
                Use '.fill()' to enter these into appropriate fields detected by the context/screenshot.
             """
        
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        if image_file:
            from PIL import Image
            image = Image.open(image_file)
            prompt_text += "\n\nI have attached a screenshot of the page. Use this visual information to determine the most accurate locators (button names, labels, placeholders)."
            response = model.generate_content([prompt_text, image])
        else:
            response = model.generate_content(prompt_text)
        
        script_content = response.text.replace('```javascript', '').replace('```', '').strip()
        return script_content
    except Exception as e:
        raise e
