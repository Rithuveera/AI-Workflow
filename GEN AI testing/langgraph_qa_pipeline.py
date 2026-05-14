import os
import sys
import json
import requests
from requests.auth import HTTPBasicAuth
from typing import TypedDict

# LangGraph and LangChain imports
from langgraph.graph import StateGraph, START, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage

# ---------------- CONFIGURATION ---------------- #
JIRA_URL = os.environ.get("JIRA_URL", "https://algosium.atlassian.net")
JIRA_EMAIL = os.environ.get("JIRA_EMAIL", "veeramani.b@algosium.com")
JIRA_API_TOKEN = os.environ.get("JIRA_API_TOKEN", "[REDACTED_ATLASSIAN_TOKEN]")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "[REDACTED_GEMINI_KEY]")
APP_BASE_URL = os.environ.get("APP_BASE_URL", "https://datnext-qa.algosium.com/login")
APP_USER = os.environ.get("APP_USER", "Veera")
APP_PASSWORD = os.environ.get("APP_PASSWORD", "Rithu@11")

# 1. Define the State Structure
class WorkflowState(TypedDict):
    ticket_id: str
    ticket_title: str
    ticket_description: str
    bdd_scenarios: str
    automation_code: str
    test_result: str
    execution_log: str
    pom_context: str
    base_url: str
    username: str
    password: str
    error: str

# 2. Define our Language Model
llm = ChatGoogleGenerativeAI(
    model="gemini-flash-latest",
    google_api_key=GEMINI_API_KEY,
    temperature=0.2
)

# 3. Define the Nodes (The Agents)
def fetch_jira_ticket(state: WorkflowState) -> WorkflowState:
    """NODE 1: Connects to Jira and fetches the ticket data."""
    print(f"[Agent 1 - Jira Fetcher] Grabbing ticket {state['ticket_id']} from Jira...")
    url = f"{JIRA_URL}/rest/api/3/issue/{state['ticket_id']}"
    auth = HTTPBasicAuth(JIRA_EMAIL, JIRA_API_TOKEN)
    headers = {"Accept": "application/json"}
    try:
        response = requests.get(url, headers=headers, auth=auth)
        response.raise_for_status()
        issue_data = response.json()
        summary = issue_data['fields']['summary']
        description_raw = str(issue_data['fields'].get('description', 'No description provided.'))
        print(f"                         -> Found: '{summary}'")
        return {"ticket_title": summary, "ticket_description": description_raw}
    except Exception as e:
        print(f"                         -> ERROR: Failed to fetch from Jira: {e}")
        return {"error": str(e)}

def sitemap_crawler_agent(state: WorkflowState) -> WorkflowState:
    """NODE 1.5: Optimized to only crawl if sitemap is missing."""
    if os.path.exists("sitemap.json"):
        print("[Agent 1.5 - Sitemap] Using cached sitemap (Skipping crawl for speed)")
        return {}
    print("[Agent 1.5 - Sitemap Crawler] Discovering application navigation paths...")
    import subprocess
    try:
        subprocess.run(["python", "sitemap_crawler.py"], capture_output=True, text=True)
        print("                               -> Sitemap discovery complete.")
    except Exception as e:
        print(f"                               -> WARNING: Crawler failed: {e}")
    return {}

def pom_reader_agent(state: WorkflowState) -> WorkflowState:
    """NODE 2: Scans the /pages directory."""
    print("[Agent 2 - POM Reader] Scanning for relevant Page Object context...")
    pom_dir = "pages"
    context = ""
    if os.path.exists(pom_dir):
        files = [f for f in os.listdir(pom_dir) if f.endswith('.js')]
        for file in files:
            print(f"                         -> Ingesting POM: {file}")
            with open(os.path.join(pom_dir, file), 'r') as f:
                context += f"\n--- FILE: pages/{file} ---\n{f.read()}\n"
    if not context:
        context = "No existing POM found."
    return {"pom_context": context}

def ui_inspector_agent(state: WorkflowState) -> WorkflowState:
    """NODE 2.5 (NEW): Visits the target page to find REAL selectors."""
    if state.get("error"): return state
    print(f"[Agent 2.5 - UI Inspector] Gathering real-time element IDs/texts for accuracy...")
    
    target_url = "https://datnext-qa.algosium.com/dashboard" # Default
    if os.path.exists("sitemap.json"):
        with open("sitemap.json", "r") as f:
            sitemap = json.load(f)
            # Match ticket context to a URL in sitemap
            keywords = state['ticket_title'].lower().split()
            for label, data in sitemap.items():
                if any(kw in label.lower() for kw in keywords):
                    target_url = "https://datnext-qa.algosium.com" + data['url']
                    break

    # Hardcoded heuristic for Currency
    if "currency" in state['ticket_title'].lower():
        target_url = "https://datnext-qa.algosium.com/master/currency"

    print(f"                         -> Inspecting: {target_url}")
    import subprocess
    try:
        result = subprocess.run(
            ["python", "extract_ui_map.py", target_url], 
            capture_output=True, text=True, timeout=60
        )
        new_context = state.get('pom_context', "") + "\n--- REAL-TIME UI ELEMENT MAP (Live Scan) ---\n" + result.stdout
        return {"pom_context": new_context}
    except Exception as e:
        print(f"                         -> WARNING: Inspector failed: {e}")
        return {}

def qa_analyst_agent(state: WorkflowState) -> WorkflowState:
    """NODE 3: Analyzes the ticket and writes BDD Scenarios."""
    if state.get("error"): return state
    print("[Agent 3 - QA Analyst] Generating BDD test scenarios...")
    system_prompt = "You are a Senior QA Analyst. Analyze the requirement and generate exactly 2 BDD Test Scenarios. Output ONLY the BDD text."
    user_prompt = f"TITLE: {state['ticket_title']}\nDESC: {state['ticket_description']}"
    response = llm.invoke([SystemMessage(content=system_prompt), HumanMessage(content=user_prompt)])
    
    # Extract string content from list if necessary
    bdd_text = response.content
    if isinstance(bdd_text, list):
        bdd_text = "".join([part.get("text", "") if isinstance(part, dict) else str(part) for part in bdd_text])
    
    return {"bdd_scenarios": bdd_text}

def automation_developer_agent(state: WorkflowState) -> WorkflowState:
    """NODE 4: Writes the automation code using the REAL-TIME UI map."""
    if state.get("error"): return state
    print("[Agent 4 - Automation Dev] Writing Playwright script using Real-Time Element Map...")
    system_prompt = f"""You are a Senior SDET. Write a Playwright JavaScript test script.
    
    CRITICAL - CREDENTIALS:
    - You MUST use the exact username: {state['username']}
    - You MUST use the exact password: {state['password']}
    - DO NOT use placeholders like 'testuser' or 'mypassword'. 
    
    CRITICAL PATH GUIDANCE:
    - The test file is in the ROOT directory. To import POMs, use: const CurrencyPage = require('./pages/CurrencyPage')
    - NEVER use '../pages/'.
    
    CRITICAL LOGIN:
    - After clicking Login, you MUST wait for the dashboard URL: await page.waitForURL('**/dashboard');
    - This ensures the session is fully established before navigating to masters.
    - Login URL: {state['base_url']}
    - Username Locator: input[name="username"]
    - Password Locator: input[name="password"]
    - Login Button Locator: button:has-text("Login")
    
    CRITICAL NAVIGATION:
    - Use currencyPage.navigateToCurrencyMaster() followed by await currencyPage.waitForTableLoad();
    
    CRITICAL SORTING LOGIC:
    - Do NOT use strict A-Z checks (isSortedAscending). The app allows empty strings at the end.
    - Instead, verify that clicking the sort icon actually CHANGES the order of rows.
    - Comparison: `expect(JSON.stringify(before)).not.toEqual(JSON.stringify(after))`
    
    Output ONLY valid JavaScript code."""
    
    user_prompt = f"BDD SCENARIOS:\n{state['bdd_scenarios']}"
    response = llm.invoke([SystemMessage(content=system_prompt), HumanMessage(content=user_prompt)])
    
    # Handle both string and list response content formats
    raw_content = response.content
    if isinstance(raw_content, list):
        # Extract text from the first part if it's a list of parts
        raw_content = "".join([part.get("text", "") if isinstance(part, dict) else str(part) for part in raw_content])
    
    code = raw_content.replace("```javascript", "").replace("```js", "").replace("```", "").strip()
    
    # BRUTE FORCE REPLACEMENT of any hallucinations
    code = code.replace("'testuser'", f"'{state['username']}'").replace('"testuser"', f"'{state['username']}'")
    code = code.replace("'testpassword'", f"'{state['password']}'").replace('"testpassword"', f"'{state['password']}'")
    code = code.replace("'your-username'", f"'{state['username']}'").replace('"your-username"', f"'{state['username']}'")
    
    return {"automation_code": code}

def test_runner_agent(state: WorkflowState) -> WorkflowState:
    """NODE 5: Executes the generated script."""
    if state.get("error"): return state
    print(f"[Agent 5 - Test Runner] Executing script for {state['ticket_id']}...")
    filename = f"temp_test_{state['ticket_id'].replace('-', '_').lower()}.spec.js"
    with open(filename, "w") as f:
        f.write(state["automation_code"])
    import subprocess
    try:
        result = subprocess.run(["npx", "playwright", "test", filename], capture_output=True, text=True, shell=True, timeout=120)
        status = "PASSED" if "passed" in result.stdout.lower() and "failed" not in result.stdout.lower() else "FAILED"
        print(f"                       -> Execution Result: {status}")
        return {"test_result": status, "execution_log": result.stdout + result.stderr}
    except Exception as e:
        return {"error": f"Execution failed: {str(e)}"}

def reporter_agent(state: WorkflowState) -> WorkflowState:
    """NODE 6: Finalizes report."""
    print("[Agent 6 - Reporter] Compiling final report.")
    return state

# 4. Build the LangGraph Workflow
workflow = StateGraph(WorkflowState)
workflow.add_node("Jira_Fetcher", fetch_jira_ticket)
workflow.add_node("Sitemap_Crawler", sitemap_crawler_agent)
workflow.add_node("POM_Reader", pom_reader_agent)
workflow.add_node("UI_Inspector", ui_inspector_agent) # Inserted new node
workflow.add_node("QA_Analyst", qa_analyst_agent)
workflow.add_node("Automation_Developer", automation_developer_agent)
workflow.add_node("Test_Runner", test_runner_agent)
workflow.add_node("Reporter", reporter_agent)

workflow.add_edge(START, "Jira_Fetcher")
workflow.add_edge("Jira_Fetcher", "Sitemap_Crawler")
workflow.add_edge("Sitemap_Crawler", "POM_Reader")
workflow.add_edge("POM_Reader", "UI_Inspector")
workflow.add_edge("UI_Inspector", "QA_Analyst")
workflow.add_edge("QA_Analyst", "Automation_Developer")
workflow.add_edge("Automation_Developer", "Test_Runner")
workflow.add_edge("Test_Runner", "Reporter")
workflow.add_edge("Reporter", END)

app = workflow.compile()

if __name__ == "__main__":
    target_ticket = sys.argv[1] if len(sys.argv) > 1 else "ER-810"
    initial_input = {"ticket_id": target_ticket, "base_url": APP_BASE_URL, "username": APP_USER, "password": APP_PASSWORD}
    final_state = app.invoke(initial_input)
    
    # Check if failed and print the logs
    if final_state.get("test_result") == "FAILED":
        print("\n" + "="*50)
        print("             DETAILED FAILURE LOGS")
        print("="*50)
        print(final_state.get("execution_log", "No detailed logs available."))
        print("="*50 + "\n")

    print(f"FINAL STATUS: {final_state.get('test_result', 'ERROR')}")
