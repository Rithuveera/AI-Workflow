import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

products = cursor.execute("SELECT DISTINCT product FROM test_cases WHERE product IS NOT NULL AND product != ''").fetchall()

print("Products in database:")
for p in products:
    print(f"  - {p[0]}")

conn.close()
