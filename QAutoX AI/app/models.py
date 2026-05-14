import sqlite3
import os
import uuid
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

class User(UserMixin):
    def __init__(self, id, username, password_hash, role='Tester'):
        self.id = id
        self.username = username
        self.password_hash = password_hash
        self.role = role
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def is_admin(self):
        return self.role == 'Admin'

def get_user_by_id(user_id):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    conn.close()
    if user:
        return User(user['id'], user['username'], user['password_hash'], user['role'] if 'role' in user.keys() else 'Tester')
    return None

def get_user_by_username(username):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()
    if user:
        return User(user['id'], user['username'], user['password_hash'], user['role'] if 'role' in user.keys() else 'Tester')
    return None

def create_user(username, password, role='Tester'):
    hash_pwd = generate_password_hash(password)
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', (username, hash_pwd, role))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        conn.close()

def get_all_users():
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users ORDER BY created_at DESC').fetchall()
    conn.close()
    return [User(u['id'], u['username'], u['password_hash'], u['role'] if 'role' in u.keys() else 'Tester') for u in users]

def update_user(user_id, username, role, password=None):
    conn = get_db_connection()
    try:
        if password:
            hash_pwd = generate_password_hash(password)
            conn.execute('UPDATE users SET username = ?, role = ?, password_hash = ? WHERE id = ?', 
                         (username, role, hash_pwd, user_id))
        else:
            conn.execute('UPDATE users SET username = ?, role = ? WHERE id = ?', 
                         (username, role, user_id))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        conn.close()

def get_user_products(user_id):
    conn = get_db_connection()
    products = conn.execute('SELECT product_name FROM user_products WHERE user_id = ?', (user_id,)).fetchall()
    conn.close()
    return [p['product_name'] for p in products]

def update_user_products(user_id, products):
    conn = get_db_connection()
    try:
        conn.execute('DELETE FROM user_products WHERE user_id = ?', (user_id,))
        for product in products:
            conn.execute('INSERT INTO user_products (user_id, product_name) VALUES (?, ?)', (user_id, product))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error updating user products: {e}")
        return False
    finally:
        conn.close()

def get_all_products():
    """Get unique products from test_cases table to populate selection lists"""
    conn = get_db_connection()
    products = conn.execute('SELECT DISTINCT product FROM test_cases WHERE product IS NOT NULL AND product != ""').fetchall()
    conn.close()
    return [p['product'] for p in products]


def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Create table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS test_cases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            requirement_file TEXT NOT NULL,
            requirement_id TEXT,
            test_case_name TEXT NOT NULL,
            description TEXT,
            preconditions TEXT,
            test_steps TEXT,
            expected_result TEXT,
            priority TEXT,
            test_type TEXT,
            test_suite TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'Tester',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_name TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Check if requirement_id column exists (migration for existing DB)
    cursor = conn.execute("PRAGMA table_info(test_cases)")
    columns = [column[1] for column in cursor.fetchall()]
    if 'requirement_id' not in columns:
        print("Migrating database: Adding requirement_id column...")
        conn.execute('ALTER TABLE test_cases ADD COLUMN requirement_id TEXT')
    
    if 'requirement_description' not in columns:
        print("Migrating database: Adding requirement_description column...")
        conn.execute('ALTER TABLE test_cases ADD COLUMN requirement_description TEXT')
    
    if 'status' not in columns:
        print("Migrating database: Adding status column...")
        conn.execute('ALTER TABLE test_cases ADD COLUMN status TEXT DEFAULT "Not Executed"')
    
    if 'test_suite' not in columns:
        print("Migrating database: Adding test_suite column...")
        conn.execute('ALTER TABLE test_cases ADD COLUMN test_suite TEXT')

    if 'product' not in columns:
        print("Migrating database: Adding product column...")
        conn.execute('ALTER TABLE test_cases ADD COLUMN product TEXT')

    if 'batch_id' not in columns:
        print("Migrating database: Adding batch_id column...")
        conn.execute('ALTER TABLE test_cases ADD COLUMN batch_id TEXT')
        
    # Backfill batch_id for existing records (Migration Fix)
    # 1. Find records with NULL batch_id
    cursor.execute("SELECT DISTINCT requirement_file, created_at FROM test_cases WHERE batch_id IS NULL")
    legacy_groups = cursor.fetchall()
    
    if legacy_groups:
        print(f"Migrating: Backfilling batch_id for {len(legacy_groups)} legacy groups...")
        for group in legacy_groups:
            new_batch_id = str(uuid.uuid4())
            file_name = group[0] # requirement_file
            # We try to group by file and roughly creation time, or just file if time is messy. 
            # Using both helps separate different uploads of same file name if they exist.
            created_at = group[1] # created_at
            
            conn.execute('''
                UPDATE test_cases 
                SET batch_id = ? 
                WHERE requirement_file = ? AND created_at = ? AND batch_id IS NULL
            ''', (new_batch_id, file_name, created_at))
            
    # Create executions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS test_executions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            test_case_id INTEGER,
            version TEXT,
            status TEXT,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            comments TEXT,
            defect_id TEXT,
            evidence_file TEXT,
            FOREIGN KEY (test_case_id) REFERENCES test_cases (id)
        )
    ''')

    # Create API test cases table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS api_test_cases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            api_name TEXT NOT NULL,
            method TEXT NOT NULL,
            endpoint TEXT NOT NULL,
            description TEXT,
            headers TEXT,
            query_params TEXT,
            request_body TEXT,
            expected_status_code INTEGER,
            expected_response TEXT,
            assertions TEXT,
            auth_type TEXT,
            auth_credentials TEXT,
            test_type TEXT,
            priority TEXT,
            status TEXT DEFAULT 'Not Executed',
            product TEXT,
            batch_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Create API test executions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS api_test_executions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            api_test_case_id INTEGER NOT NULL,
            version TEXT,
            status TEXT,
            response_time INTEGER,
            status_code INTEGER,
            response_body TEXT,
            error_message TEXT,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (api_test_case_id) REFERENCES api_test_cases (id)
        )
    ''')
    
    # Migration for new columns in test_executions (if table already existed without them)
    cursor = conn.execute("PRAGMA table_info(test_executions)")
    exec_columns = [column[1] for column in cursor.fetchall()]
    
    if 'defect_id' not in exec_columns:
        print("Migrating: Adding defect_id to test_executions")
        conn.execute('ALTER TABLE test_executions ADD COLUMN defect_id TEXT')
        
    if 'evidence_file' not in exec_columns:
        print("Migrating: Adding evidence_file to test_executions")
        conn.execute('ALTER TABLE test_executions ADD COLUMN evidence_file TEXT')
        
    # Check if role column exists (migration)
    cursor = conn.execute("PRAGMA table_info(users)")
    user_columns = [column[1] for column in cursor.fetchall()]
    if 'role' not in user_columns:
        print("Migrating database: Adding role column to users...")
        conn.execute("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'Tester'")
        
    # Seed Admin User if no users exist
    cursor = conn.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    if count == 0:
        print("Seeding default admin user...")
        create_user('admin', 'admin123', 'Admin')
    
    conn.commit()
    conn.close()
