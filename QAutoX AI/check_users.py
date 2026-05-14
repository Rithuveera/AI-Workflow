import sqlite3
import os

db_path = 'database.db'
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, username, role FROM users;")
        users = cursor.fetchall()
        print("Users in database:")
        for user in users:
            print(f"ID: {user[0]}, Username: {user[1]}, Role: {user[2]}")
    except sqlite3.OperationalError as e:
        print(f"Error: {e}")
    conn.close()
else:
    print(f"Database file {db_path} not found.")
