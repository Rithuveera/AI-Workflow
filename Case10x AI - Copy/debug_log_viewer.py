
try:
    with open('app.log', 'r') as f:
        print(f.read())
except Exception as e:
    print(f"Error reading log: {e}")
