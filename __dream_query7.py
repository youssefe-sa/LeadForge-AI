import sqlite3
import json
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

DB_PATH = r"C:\Users\hp\.local\share\mimocode\mimocode.db"

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Search for user messages containing rule/decision keywords in ALL sessions for this project
print("=== USER DIRECTIVE KEYWORDS ===")
keywords = ["toujours", "jamais", "remember", "rappelle", "règle", "décision", "faut", "doi", "veux", "jamais", "obligatoire"]
for kw in keywords:
    c.execute("""
        SELECT s.title, m.time_created, p.data 
        FROM part p 
        JOIN message m ON p.message_id = m.id 
        JOIN session s ON s.id = m.session_id
        WHERE s.project_id = '4a7f60e0-a43f-4717-8cb1-f5571e0eca70'
          AND json_extract(m.data, '$.role') = 'user'
          AND json_extract(p.data, '$.type') = 'text'
          AND json_extract(p.data, '$.text') LIKE ?
        ORDER BY m.time_created DESC
        LIMIT 3
    """, (f"%{kw}%",))
    results = c.fetchall()
    if results:
        print(f"\n--- Keyword: '{kw}' ({len(results)} results) ---")
        for r in results:
            pdata = json.loads(r[2]) if r[2] else {}
            text = pdata.get('text', '')[:400]
            print(f"  [{r[0][:40]}] {text}")

# Check the last user message about images + colors
print("\n\n=== LATEST USER MESSAGE (IMAGES + COLOR ISSUES) ===")
c.execute("""
    SELECT m.time_created, p.data 
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = 'ses_1013fb9d9ffe6H10LVlwN0w2Hj'
      AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created DESC
    LIMIT 3
""")
for r in c.fetchall():
    pdata = json.loads(r[1]) if r[1] else {}
    text = pdata.get('text', '')[:500]
    print(f"\nTime: {r[0]}")
    print(f"Text: {text}")

# Also check what session the ses_0fd4c318fffezzLQIYbJaNk4p5 is (this current dream session)
print("\n\n=== CURRENT SESSION (ses_0fd4c318fffezzLQIYbJaNk4p5) ===")
c.execute("SELECT title, time_created FROM session WHERE id = 'ses_0fd4c318fffezzLQIYbJaNk4p5'")
cur = c.fetchone()
if cur:
    print(f"Title: {cur[0]}, Time: {cur[1]}")

# Check earlier session ses_11453a02affeBlWSYnSMb9Y7FT for unresolved work
print("\n\n=== EARLIER SESSION TASKS ===")
c.execute("""
    SELECT time_created, p.data
    FROM part p
    JOIN message m ON p.message_id = m.id
    WHERE m.session_id = 'ses_11453a02affeBlWSYnSMb9Y7FT'
      AND json_extract(p.data, '$.type') = 'text'
      AND json_extract(m.data, '$.role') = 'assistant'
    ORDER BY m.time_created DESC
    LIMIT 5
""")
for r in c.fetchall():
    pdata = json.loads(r[1]) if r[1] else {}
    text = pdata.get('text', '')[:500]
    if text.strip():
        print(f"\n  Assistant at {r[0]}: {text}")

conn.close()
