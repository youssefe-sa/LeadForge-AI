import sqlite3
import json
import sys

DB_PATH = r"C:\Users\hp\.local\share\mimocode\mimocode.db"

conn = sqlite3.connect(DB_PATH)
c = conn.cursor()

# Check session schema
print("=== SESSION SCHEMA ===")
c.execute("PRAGMA table_info(session)")
for r in c.fetchall():
    print(f"  {r}")

# Check message schema
print("\n=== MESSAGE SCHEMA ===")
c.execute("PRAGMA table_info(message)")
for r in c.fetchall():
    print(f"  {r}")

# Check part schema
print("\n=== PART SCHEMA ===")
c.execute("PRAGMA table_info(part)")
for r in c.fetchall():
    print(f"  {r}")

# List all sessions
print("\n=== ALL SESSIONS ===")
c.execute("SELECT * FROM session ORDER BY time_created DESC LIMIT 20")
for r in c.fetchall():
    print(f"  {r}")

conn.close()
