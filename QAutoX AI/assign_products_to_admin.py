"""
Script to assign all available products to the admin user
"""
import sqlite3

def assign_products_to_admin():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Get admin user ID
    admin = cursor.execute("SELECT id FROM users WHERE username = 'admin'").fetchone()
    if not admin:
        print("Admin user not found!")
        conn.close()
        return
    
    admin_id = admin[0]
    print(f"Found admin user with ID: {admin_id}")
    
    # Get all unique products from test_cases
    products = cursor.execute("SELECT DISTINCT product FROM test_cases WHERE product IS NOT NULL AND product != ''").fetchall()
    
    if not products:
        print("No products found in test_cases table!")
        print("You need to generate test cases first to have products available.")
        conn.close()
        return
    
    print(f"Found {len(products)} products:")
    for p in products:
        print(f"  - {p[0]}")
    
    # Clear existing assignments for admin
    cursor.execute("DELETE FROM user_products WHERE user_id = ?", (admin_id,))
    
    # Assign all products to admin
    for product in products:
        cursor.execute("INSERT INTO user_products (user_id, product_name) VALUES (?, ?)", 
                      (admin_id, product[0]))
        print(f"Assigned product: {product[0]}")
    
    conn.commit()
    conn.close()
    print("\nSuccessfully assigned all products to admin user!")

if __name__ == "__main__":
    assign_products_to_admin()
