import sqlite3
import json

DB_PATH = r"C:\Users\hp\.local\share\mimocode\mimocode.db"

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
c = conn.cursor()

MAIN_SESSION = "ses_1013fb9d9ffe6H10LVlwN0w2Hj"

# Get the last user message and all subsequent assistant parts (the most recent conversation turn)
print("=== LAST USER MESSAGE ===")
c.execute("""
    SELECT m.id, m.time_created, p.data 
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = ? AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created DESC
    LIMIT 1
""", (MAIN_SESSION,))
last_user = c.fetchone()
if last_user:
    pdata = json.loads(last_user[2]) if last_user[2] else {}
    text = pdata.get('text', '')
    print(f"Time: {last_user[1]}")
    print(f"Text: {text[:1000]}")
    print(f"\n--- All subsequent assistant parts ---")
    
    c.execute("""
        SELECT p.data, m.time_created
        FROM part p 
        JOIN message m ON p.message_id = m.id 
        WHERE m.session_id = ?
          AND json_extract(m.data, '$.type') = 'text'
          AND m.time_created > ?
        ORDER BY m.time_created
    """, (MAIN_SESSION, last_user[1]))
    for r in c.fetchall():
        pdata2 = json.loads(r[0]) if r[0] else {}
        text2 = pdata2.get('text', '')[:500]
        if text2.strip():
            print(f"\nTEXT at {r[1]}: {text2}")

# Also check the earlier session ses_11453a02affeBlWSYnSMb9Y7FT
print("\n\n=== EARLIER SESSION: ses_11453a02affeBlWSYnSMb9Y7FT ===")
c.execute("SELECT title FROM session WHERE id = 'ses_11453a02affeBlWSYnSMb9Y7FT'")
earlier = c.fetchone()
if earlier:
    print(f"Title: {earlier[0]}")

# Get user messages from earlier session
c.execute("""
    SELECT m.time_created, p.data 
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = 'ses_11453a02affeBlWSYnSMb9Y7FT' 
      AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
""")
for r in c.fetchall():
    pdata = json.loads(r[1]) if r[1] else {}
    text = pdata.get('text', '')[:300]
    if text.strip():
        print(f"\n  User at {r[0]}: {text}")

conn.close()
