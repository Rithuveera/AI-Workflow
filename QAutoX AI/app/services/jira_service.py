import requests
import json
import logging
from flask import current_app
from requests.auth import HTTPBasicAuth

logger = logging.getLogger(__name__)

def create_jira_issue(summary, description, project_key=None, issue_type="Bug"):
    """
    Creates a Jira issue via REST API.
    """
    jira_url = current_app.config.get('JIRA_URL')
    jira_email = current_app.config.get('JIRA_EMAIL')
    jira_token = current_app.config.get('JIRA_API_TOKEN')
    
    # Use config project key if not provided
    if not project_key:
        project_key = current_app.config.get('JIRA_PROJECT_KEY', 'TEST')

    if not all([jira_url, jira_email, jira_token]):
        logger.error("Jira configuration missing!")
        return None, "Jira credentials not configured in settings."

    # Ensure URL ends correctly
    if not jira_url.endswith('/rest/api/2/issue'):
        jira_url = jira_url.rstrip('/') + '/rest/api/2/issue'

    auth = HTTPBasicAuth(jira_email, jira_token)
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    payload = {
        "fields": {
            "project": {
                "key": project_key
            },
            "summary": summary,
            "description": description,
            "issuetype": {
                "name": issue_type
            }
        }
    }

    try:
        response = requests.post(jira_url, data=json.dumps(payload), headers=headers, auth=auth)
        
        if response.status_code == 201:
            data = response.json()
            logger.info(f"Jira issue created: {data.get('key')}")
            return data.get('key'), None
        else:
            logger.error(f"Jira API error: {response.status_code} - {response.text}")
            return None, f"Jira API Error: {response.status_code}"
            
    except Exception as e:
        logger.exception("Exception while creating Jira issue")
        return None, str(e)

def attach_to_jira_issue(issue_key, file_path):
    """
    Attaches a file to an existing Jira issue.
    """
    jira_url = current_app.config.get('JIRA_URL')
    jira_email = current_app.config.get('JIRA_EMAIL')
    jira_token = current_app.config.get('JIRA_API_TOKEN')

    if not all([jira_url, jira_email, jira_token]):
        return False, "Jira credentials missing"

    url = f"{jira_url.rstrip('/')}/rest/api/2/issue/{issue_key}/attachments"
    auth = HTTPBasicAuth(jira_email, jira_token)
    headers = {
        "X-Atlassian-Token": "no-check"
    }

    try:
        with open(file_path, 'rb') as f:
            files = {'file': f}
            response = requests.post(url, headers=headers, auth=auth, files=files)
            
            if response.status_code == 200:
                return True, None
            else:
                return False, f"Attachment failed: {response.status_code}"
    except Exception as e:
        return False, str(e)
