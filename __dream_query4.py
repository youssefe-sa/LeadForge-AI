import sqlite3
import json

DB_PATH = r"C:\Users\hp\.local\share\mimocode\mimocode.db"

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
c = conn.cursor()

MAIN_SESSION = "ses_1013fb9d9ffe6H10LVlwN0w2Hj"

# Find all child sessions
print("=== CHILD SESSIONS ===")
c.execute("""
    SELECT id, title, time_created, parent_id 
    FROM session 
    WHERE parent_id = ?
    ORDER BY time_created
""", (MAIN_SESSION,))
children = c.fetchall()
for ch in children:
    print(f"  {ch[0]} | {ch[1]} | {ch[2]}")

# For the most recent children, look at file writes/edits
for ch in children[-5:]:  # last 5 child sessions
    sid = ch[0]
    print(f"\n=== CHILD {sid} ({ch[1]}) - TOOL CALLS ===")
    c.execute("""
        SELECT m.id, m.time_created, p.data, json_extract(m.data, '$.role') as role
        FROM part p 
        JOIN message m ON p.message_id = m.id 
        WHERE m.session_id = ? 
          AND json_extract(m.data, '$.role') = 'assistant'
        ORDER BY m.time_created
    """, (sid,))
    parts = c.fetchall()
    
    write_count = 0
    edit_count = 0
    bash_count = 0
    files_written = []
    for r in parts:
        pdata = json.loads(r[2]) if r[2] else {}
        if pdata.get('type') == 'tool':
            tool = pdata.get('tool', '')
            state = pdata.get('state', {})
            inp = state.get('input', {})
            if tool == 'write':
                write_count += 1
                files_written.append(inp.get('file_path', ''))
            elif tool == 'edit':
                edit_count += 1
                files_written.append(inp.get('file_path', ''))
            elif tool == 'bash':
                bash_count += 1
    print(f"  Writes: {write_count}, Edits: {edit_count}, Bash: {bash_count}")
    if files_written:
        print(f"  Files touched: {list(set(files_written))[:20]}")

    # Also get text summaries from assistant
    c.execute("""
        SELECT p.data FROM part p 
        JOIN message m ON p.message_id = m.id 
        WHERE m.session_id = ?
          AND json_extract(m.data, '$.type') = 'text'
        ORDER BY m.time_created
        LIMIT 3
    """, (sid,))
    texts = c.fetchall()
    for t in texts:
        tdata = json.loads(t[0]) if t[0] else {}
        text = tdata.get('text', '')[:300]
        if text.strip():
            print(f"  TEXT: {text}")

conn.close()
