import requests
import sqlite3
import os

BASE_URL = 'http://127.0.0.1:5000'
USERNAME = 'admin'
PASSWORD = 'admin123'
DB_PATH = 'database.db'

def insert_manual_test_case(product, name):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO test_cases (test_case_name, requirement_file, product, status, priority, test_type, created_at)
        VALUES (?, 'manual_test.txt', ?, 'Not Executed', 'High', 'Functional', CURRENT_TIMESTAMP)
    ''', (name, product))
    conn.commit()
    conn.close()
    print(f"Inserted manual test case '{name}' for product '{product}'")

def insert_manual_test_case_no_product(name):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO test_cases (test_case_name, requirement_file, status, priority, test_type, created_at)
        VALUES (?, 'manual_test_no_prod.txt', 'Not Executed', 'High', 'Functional', CURRENT_TIMESTAMP)
    ''', (name,))
    conn.commit()
    conn.close()
    print(f"Inserted manual test case '{name}' for NO product")

def run_verification():
    # 1. Insert Data
    insert_manual_test_case('Product A', 'Test Case A1')
    insert_manual_test_case('Product B', 'Test Case B1')
    insert_manual_test_case_no_product('Test Case General')

    s = requests.Session()
    
    # 2. Login
    print("Logging in...")
    s.post(f'{BASE_URL}/auth/login', data={'username': USERNAME, 'password': PASSWORD})

    # 3. Select Product A
    print("Select Product A...")
    s.post(f'{BASE_URL}/auth/select-product', data={'product': 'Product A'})
    
    # 4. content check
    print("Checking Test Cases for Product A...")
    resp = s.get(f'{BASE_URL}/test-cases')
    cases = resp.json()
    names = [c['test_case_name'] for c in cases]
    print(f"   Found: {names}")
    
    if 'Test Case A1' in names and 'Test Case B1' not in names:
        print("   SUCCESS: Product A filtering working (Has A, No B)")
    else:
        print("   FAIL: Product A filtering incorrect")

    # 5. Select Product B
    print("Select Product B...")
    s.post(f'{BASE_URL}/auth/select-product', data={'product': 'Product B'})

    # 6. content check
    print("Checking Test Cases for Product B...")
    resp = s.get(f'{BASE_URL}/test-cases')
    cases = resp.json()
    names = [c['test_case_name'] for c in cases]
    print(f"   Found: {names}")
    
    if 'Test Case B1' in names and 'Test Case A1' not in names:
        print("   SUCCESS: Product B filtering working (Has B, No A)")
    else:
        print("   FAIL: Product B filtering incorrect")

if __name__ == '__main__':
    run_verification()
