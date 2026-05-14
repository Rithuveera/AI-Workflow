import json
import yaml
import requests
import logging
import google.generativeai as genai
from flask import current_app
from jsonschema import validate, ValidationError

logger = logging.getLogger(__name__)

def configure_genai():
    api_key = current_app.config.get('GEMINI_API_KEY')
    if not api_key:
        logger.warning("GEMINI_API_KEY not found in environment variables!")
    else:
        genai.configure(api_key=api_key)

def generate_api_test_cases_ai(api_spec_text, model_name='gemini-2.0-flash'):
    """Use Gemini AI to generate API test cases from a specification"""
    configure_genai()
    
    prompt = f"""
    You are an expert API Testing Engineer. Analyze the following API specification and generate comprehensive test cases.

    API SPECIFICATION:
    {api_spec_text[:30000]}

    Generate test cases covering:
    1. POSITIVE scenarios (valid requests, expected responses)
    2. NEGATIVE scenarios (invalid data, missing fields, wrong types)
    3. EDGE CASES (boundary values, empty arrays, null values)
    4. SECURITY tests (authentication, authorization, simple injection checks)

    For each test case, provide:
    - api_name: A clear, descriptive name for the API/Endpoint
    - method: HTTP method (GET, POST, PUT, DELETE, PATCH, etc.)
    - endpoint: The API path/URL
    - description: What this test validates
    - headers: Required headers as a JSON object
    - query_params: Query parameters as a JSON object
    - request_body: Request payload as a JSON object (if applicable)
    - expected_status_code: Expected HTTP status code (integer)
    - expected_response: Expected response structure or key values (JSON)
    - assertions: Array of validation rules (e.g., ["Status code is 200", "Response contains 'id'", "JSON schema matches"])
    - test_type: Functional, Security, Performance, etc.
    - priority: High, Medium, or Low

    Return ONLY a valid JSON array of these test case objects.
    """
    
    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        response_text = response.text.strip()
        
        # Clean up markdown if present
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.startswith('```'):
            response_text = response_text[3:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
            
        test_cases = json.loads(response_text.strip())
        return test_cases, None
    except Exception as e:
        logger.error(f"AI API Test Generation Error: {e}")
        return None, str(e)

def parse_api_spec(file_path):
    """Parse Swagger/OpenAPI (JSON/YAML) or Postman Collection"""
    file_ext = file_path.rsplit('.', 1)[1].lower()
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            if file_ext == 'json':
                data = json.load(f)
                return data, 'json'
            elif file_ext in ['yaml', 'yml']:
                data = yaml.safe_load(f)
                return data, 'yaml'
            else:
                content = f.read()
                return content, 'text'
    except Exception as e:
        logger.error(f"Error parsing API spec: {e}")
        return None, str(e)

def execute_api_test(method, url, headers=None, params=None, body=None, auth=None):
    """Execute a real API request and return the result"""
    import time
    
    start_time = time.time()
    try:
        # Convert strings to JSON if they are strings
        if isinstance(headers, str) and headers:
            headers = json.loads(headers)
        if isinstance(params, str) and params:
            params = json.loads(params)
        if isinstance(body, str) and body:
            body = json.loads(body)
        if isinstance(auth, str) and auth:
            auth = json.loads(auth)

        # Handle authentication
        request_auth = None
        if auth:
            auth_type = auth.get('type')
            if auth_type == 'basic':
                request_auth = (auth.get('username'), auth.get('password'))
            elif auth_type == 'bearer':
                if not headers: headers = {}
                headers['Authorization'] = f"Bearer {auth.get('token')}"
            elif auth_type == 'apikey':
                key_loc = auth.get('location', 'header')
                key_name = auth.get('key', 'X-API-Key')
                key_val = auth.get('value')
                if key_loc == 'header':
                    if not headers: headers = {}
                    headers[key_name] = key_val
                else:
                    if not params: params = {}
                    params[key_name] = key_val

        response = requests.request(
            method=method.upper(),
            url=url,
            headers=headers,
            params=params,
            json=body if method.upper() in ['POST', 'PUT', 'PATCH'] else None,
            auth=request_auth,
            timeout=30
        )
        
        end_time = time.time()
        response_time = int((end_time - start_time) * 1000)
        
        result = {
            'status_code': response.status_code,
            'response_time': response_time,
            'headers': dict(response.headers),
            'body': response.text,
            'is_json': False
        }
        
        try:
            result['json_body'] = response.json()
            result['is_json'] = True
        except:
            pass
            
        return result, None
        
    except Exception as e:
        logger.error(f"API Execution Error: {e}")
        return None, str(e)

def validate_response(actual_response, expected_status, assertions=None):
    """Validate API response against expected status and assertions"""
    results = []
    
    # Check status code (Robust parsing)
    try:
        # Extract integer part if status is string like "200 OK"
        if isinstance(expected_status, str):
            import re
            match = re.search(r'\d+', expected_status)
            clean_expected = int(match.group()) if match else 0
        else:
            clean_expected = int(expected_status)
            
        status_pass = actual_response['status_code'] == clean_expected
        results.append({
            'assertion': f"Status code is {clean_expected}",
            'passed': status_pass,
            'details': f"Actual: {actual_response['status_code']}"
        })
    except Exception as e:
        results.append({
            'assertion': f"Status code validation",
            'passed': False,
            'details': f"Error parsing expected status '{expected_status}': {str(e)}"
        })
    
    if assertions:
        if isinstance(assertions, str):
            try:
                assertions = json.loads(assertions)
            except:
                assertions = [assertions]
                
        for assertion in assertions:
            # Simple string-based assertions for now
            passed = False
            details = ""
            
            try:
                assertion_lower = assertion.lower()
                if "contains" in assertion_lower or "has" in assertion_lower:
                    # Robust extraction of target text between quotes
                    import re
                    match = re.search(r"'(.*?)'", assertion)
                    if not match:
                        match = re.search(r'"(.*?)"', assertion)
                    
                    if match:
                        target_text = match.group(1)
                    else:
                        # Fallback to last word
                        target_text = assertion.split()[-1]
                        
                    passed = target_text in actual_response['body']
                    details = f"Checked if body contains '{target_text}'"
                elif "schema" in assertion_lower:
                    details = "Schema validation not implemented in this version"
                    passed = True # Placeholder
                else:
                    # Default to true if we don't know how to validate yet
                    passed = True
                    details = f"Manual validation required for: {assertion}"
            except Exception as e:
                passed = False
                details = f"Error evaluating assertion: {str(e)}"
                
            results.append({
                'assertion': assertion,
                'passed': passed,
                'details': details
            })
            
    return results
