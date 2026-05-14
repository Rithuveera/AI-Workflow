from app.models import create_user, get_user_by_username, get_db_connection
from werkzeug.security import generate_password_hash
import sqlite3

def seed_admin():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if admin exists
    cursor.execute("SELECT * FROM users WHERE username = 'admin'")
    user = cursor.fetchone()
    
    if user:
        print("Admin user exists. Updating role to Admin...")
        conn.execute("UPDATE users SET role = 'Admin' WHERE username = 'admin'")
        # Optional: Reset password to admin123
        hash_pwd = generate_password_hash('admin123')
        conn.execute("UPDATE users SET password_hash = ? WHERE username = 'admin'", (hash_pwd,))
    else:
        print("Creating admin user...")
        hash_pwd = generate_password_hash('admin123')
        conn.execute("INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)", ('admin', hash_pwd, 'Admin'))
    
    conn.commit()
    conn.close()
    print("Admin user seeded successfully.")

if __name__ == '__main__':
    seed_admin()
