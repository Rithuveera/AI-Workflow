import os
try:
    from openai import OpenAI
except ImportError:
    print("Please install the openai package first: pip install openai")
    exit(1)

# Initialize the OpenAI client
# Ensure you have set your OPENAI_API_KEY environment variable
api_key = os.environ.get("OPENAI_API_KEY")

if not api_key:
    print("WARNING: OPENAI_API_KEY environment variable not found.")
    print("For this script to connect to the real AI, please set your API key.")
    print("Example (Windows PowerShell): $env:OPENAI_API_KEY='your-key-here'")
    print("Continuing with a mock setup for demonstration purposes...\n")
    client = OpenAI(api_key="mock-key-for-demo") 
else:
    client = OpenAI(api_key=api_key)

def generate_test_cases(user_story: str, acceptance_criteria: str) -> str:
    """
    Takes a User Story and Acceptance Criteria and generates BDD test cases.
    """
    
    # The 'System Prompt' is where we define the AI's persona and rules.
    # This is the most important part of AI Testing!
    system_prompt = """
    You are an Expert QA Lead and Test Automation Architect.
    Your task is to analyze the provided User Story and Acceptance Criteria.
    
    Output Requirements:
    1. Generate exhaustive BDD (Behavior-Driven Development) test scenarios using Gherkin syntax (Feature, Scenario, Given, When, Then).
    2. You MUST include:
       - At least 2 Positive (Happy Path) scenarios.
       - At least 3 Negative (Error handling) scenarios.
       - At least 1 Edge case scenario.
    3. Clearly list defining test data required to execute the tests at the top of the output.
    4. Format the output professionally using Markdown.
    """
    
    user_prompt = f"""
    USER STORY:
    {user_story}
    
    ACCEPTANCE CRITERIA:
    {acceptance_criteria}
    
    Please generate the BDD Test Cases now.
    """
    
    if not api_key:
        return "MOCK AI RESPONSE (API Key missing):\n\nFeature: User Login\n  Scenario: Successful login with valid credentials\n    Given the user is on the login page\n    When they enter valid credentials\n    Then they should be redirected to the dashboard\n\n[Set your OPENAI_API_KEY to see the real GPT-4o output!]"

    print("Sending request to AI model (GPT-4o) for test generation...\n")
    try:
        response = client.chat.completions.create(
            model="gpt-4o", # Ensure you have access, or change to gpt-3.5-turbo
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error connecting to AI Provider: {str(e)}"

if __name__ == "__main__":
    print("=== Next-Gen QA: AI Test Case Generator PoC ===\n")
    
    # Sample Input Data (In the future, this will be fetched via Jira API)
    sample_story = "As a registered user, I want to log into my banking dashboard so that I can view my account balance."
    sample_criteria = "- The user must provide a valid email and a password.\n- Passwords must be masked during entry.\n- Account is locked after 3 failed attempts.\n- Successful login redirects to '/dashboard'.\n- 2FA (Two-Factor Authentication) is required for logins from a new recognized IP address."
    
    print(f"Analyzing Target User Story:\n'{sample_story}'\n")
    
    # Generate the test cases
    generated_tests = generate_test_cases(sample_story, sample_criteria)
    
    print("=================== AI GENERATED BDD TEST CASES ===================\n")
    print(generated_tests)
    print("\n===================================================================")
    print("\nNext Steps:")
    print("1. Install OpenAI SDK: pip install openai")
    print("2. Set your API Key:   $env:OPENAI_API_KEY='sk-your-key'")
    print("3. Run the script:     python ai_test_generator.py")
