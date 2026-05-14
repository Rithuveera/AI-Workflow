"""
Test script to verify the test case generation API
"""
import requests
import os

# Test file path
test_file = "sample_requirements.txt"

if not os.path.exists(test_file):
    print(f"ERROR: Test file '{test_file}' not found!")
    exit(1)

print(f"Testing API with file: {test_file}")
print("=" * 60)

# Upload file
url = "http://localhost:5000/upload"

with open(test_file, 'rb') as f:
    files = {'file': (test_file, f, 'text/plain')}
    
    print(f"Uploading file to {url}...")
    response = requests.post(url, files=files)
    
    print(f"Status Code: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    print("=" * 60)
    
    if response.status_code == 200:
        data = response.json()
        print("✓ SUCCESS!")
        print(f"Message: {data.get('message')}")
        print(f"Filename: {data.get('filename')}")
        print(f"Test Cases Generated: {len(data.get('test_cases', []))}")
        print(f"Replaced Previous: {data.get('replaced', False)}")
        
        # Show first test case as example
        if data.get('test_cases'):
            print("\n" + "=" * 60)
            print("First Test Case Example:")
            print("=" * 60)
            tc = data['test_cases'][0]
            print(f"Name: {tc.get('test_case_name')}")
            print(f"Type: {tc.get('test_type')}")
            print(f"Priority: {tc.get('priority')}")
            print(f"Description: {tc.get('description')[:100]}...")
    else:
        print("✗ ERROR!")
        try:
            error_data = response.json()
            print(f"Error: {error_data.get('error', 'Unknown error')}")
        except:
            print(f"Response Text: {response.text}")
