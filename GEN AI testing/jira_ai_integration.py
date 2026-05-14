import os
import json
import requests
from requests.auth import HTTPBasicAuth
import sys

# ---------------- CONFIGURATION ---------------- #
# (Reminder from your previous research: Generating a Jira API key is completely free as long as you already have a Jira license!)
JIRA_URL = os.environ.get("JIRA_URL", "https://algosium.atlassian.net")
JIRA_EMAIL = os.environ.get("JIRA_EMAIL", "veeramani.b@algosium.com")
JIRA_API_TOKEN = os.environ.get("JIRA_API_TOKEN", "[REDACTED_ATLASSIAN_TOKEN]")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "[REDACTED_GEMINI_KEY]")

def fetch_jira_ticket(issue_key: str):
    """
    Connects to the Jira REST API to fetch a User Story's summary and description.
    """
    print(f"Fetching Jira Ticket: {issue_key}...")
    
    # The Jira REST API endpoint for fetching a specific issue
    url = f"{JIRA_URL}/rest/api/3/issue/{issue_key}"
    
    # We use Basic Auth with Email + API Token for Jira Cloud
    auth = HTTPBasicAuth(JIRA_EMAIL, JIRA_API_TOKEN)
    
    headers = {
       "Accept": "application/json"
    }
    
    # For demonstration, we'll mock the response if the token isn't real
    if JIRA_API_TOKEN == "mock-jira-token" or "your-company" in JIRA_URL:
        print("[NOTICE] Using mock Jira data because real credentials are not set.\n")
        return {
            "summary": "As a User, I need a 'Forgot Password' link on the login screen.",
            "description": "Acceptance Criteria:\n1. Link should be visible under the login button.\n2. Clicking it sends an OTP to the registered email.\n3. OTP expires in 5 minutes."
        }
    
    try:
        response = requests.request("GET", url, headers=headers, auth=auth)
        response.raise_for_status() # Raise exception for 401/404 errors
        
        issue_data = json.loads(response.text)
        
        # Jira 3.0 API stores descriptions in a complex Atlassian Document Format (ADF)
        # For simplicity, we extract the raw text (assuming a simple description)
        summary = issue_data['fields']['summary']
        
        # NOTE: A real enterprise script would need a parser here for the ADF description format.
        description_raw = str(issue_data['fields'].get('description', 'No description provided.'))
        
        return {
            "summary": summary,
            "description": description_raw
        }
        
    except requests.exceptions.HTTPError as err:
        print(f"Jira API Error: {err}")
        return None

def generate_ai_test_cases(jira_data: dict) -> str:
    """
    Passes the fetched Jira data to the AI to generate test cases.
    """
    print(f"Prompting AI to generate test cases for: '{jira_data['summary']}'...\n")
    
    system_prompt = "You are a QA Architect. Generate 5 BDD test scenarios based on the Jira ticket."
    user_prompt = f"JIRA TITLE: {jira_data['summary']}\nJIRA DESCRIPTION: {jira_data['description']}"
    
    if GEMINI_API_KEY == "mock-gemini-token" or not GEMINI_API_KEY:
        title = jira_data.get('summary', 'Unknown')
        mock_response = f"""=== MOCK AI GENERATED TEST SUITE ===
(Note: Real AI generation is skipped because GEMINI_API_KEY is not set.)

Feature: {title}
  
  Scenario: Verify primary functionality for: {title} (Positive)
    Given the user is on the relevant page for '{title}'
    When they perform the primary action
    Then it should complete successfully according to the ticket description
    
  Scenario: Verify error handling for: {title} (Negative)
    Given the user attempts the action for '{title}'
    When they enter specific invalid data or invalid characters
    Then the system should reject it and show an appropriate validation message

[To see real generated BDD tests tailored exactly to this ticket's description, 
 please set your GEMINI_API_KEY in the script or your environment variables!]
====================================="""
        return mock_response
    
    try:
        import google.generativeai as genai
        
        # Configure Gemini with the API key
        genai.configure(api_key=GEMINI_API_KEY)
        
        print("Sending request to AI model (Gemini Flash Latest) for real test generation...\n")
        
        # Initialize the model 
        model = genai.GenerativeModel('gemini-flash-latest')
        
        # Construct the final prompt by combining system context + user details
        full_prompt = f"{system_prompt}\n\n{user_prompt}"
        
        response = model.generate_content(full_prompt)
        
        return "=== REAL AI GENERATED TEST SUITE ===\n\n" + response.text + "\n\n====================================="
    except ImportError:
        return "Error: Please install the Google Generative AI package first (pip install google-generativeai)."
    except Exception as e:
        return f"Error connecting to AI Provider: {str(e)}"

if __name__ == "__main__":
    print("=========================================================")
    print("     JIRA -> AI TEST CASE INTEGRATION SCRIPT (PoC)       ")
    print("=========================================================\n")
    
    # 1. Provide the target Jira Issue ID
    if len(sys.argv) > 1:
        target_ticket = sys.argv[1]
    else:
        target_ticket = input("Enter Jira Ticket ID (e.g., AM-92): ").strip()
    
    # 2. Fetch it from Jira
    ticket_data = fetch_jira_ticket(target_ticket)
    
    if ticket_data:
        # 3. Generate the Tests with AI
        ai_output = generate_ai_test_cases(ticket_data)
        print(ai_output)
        print("\nWorkflow Complete! Jira data successfully converted to Test Cases.")
    else:
        print("Failed to fetch Jira ticket. Please check your API credentials.")
