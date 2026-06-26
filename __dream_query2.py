import sqlite3
import json
import os

DB_PATH = r"C:\Users\hp\.local\share\mimocode\mimocode.db"

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Main session: ses_1013fb9d9ffe6H10LVlwN0w2Hj
MAIN_SESSION = "ses_1013fb9d9ffe6H10LVlwN0w2Hj"

# 1. All user messages in main session
print("=== USER MESSAGES IN MAIN SESSION ===")
c.execute("""
    SELECT m.id, m.time_created, p.data 
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = ? AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
""", (MAIN_SESSION,))
for r in c.fetchall():
    pdata = json.loads(r[2]) if r[2] else {}
    text = pdata.get('text', '')[:500]
    if text.strip():
        ts = r[1]
        print(f"\n--- User at {ts} ---")
        print(text)

conn.close()
