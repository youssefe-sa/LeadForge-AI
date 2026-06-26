import sqlite3
import json

DB_PATH = r"C:\Users\hp\.local\share\mimocode\mimocode.db"

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
c = conn.cursor()

MAIN_SESSION = "ses_1013fb9d9ffe6H10LVlwN0w2Hj"

# Find assistant messages that wrote/edited files (tool calls)
print("=== ASSISTANT TOOL CALLS - FILE WRITES/EDITS ===")
c.execute("""
    SELECT m.id, m.time_created, p.data 
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = ? 
      AND json_extract(m.data, '$.type') = 'tool'
      AND (json_extract(m.data, '$.tool') = 'write' OR json_extract(m.data, '$.tool') = 'edit' OR json_extract(m.data, '$.tool') = 'bash')
    ORDER BY m.time_created
""", (MAIN_SESSION,))
for r in c.fetchall():
    pdata = json.loads(r[2]) if r[2] else {}
    tool = pdata.get('tool', 'unknown')
    state = pdata.get('state', {})
    inp = state.get('input', {})
    
    if tool == 'write':
        fp = inp.get('file_path', 'N/A')
        print(f"\n--- WRITE at {r[1]} ---")
        print(f"  File: {fp}")
    elif tool == 'edit':
        fp = inp.get('file_path', 'N/A')
        old = inp.get('old_string', '')[:100]
        new = inp.get('new_string', '')[:100]
        print(f"\n--- EDIT at {r[1]} ---")
        print(f"  File: {fp}")
        print(f"  Old: {old}")
        print(f"  New: {new}")
    elif tool == 'bash':
        cmd = inp.get('command', '')[:300]
        print(f"\n--- BASH at {r[1]} ---")
        print(f"  Cmd: {cmd}")

conn.close()
