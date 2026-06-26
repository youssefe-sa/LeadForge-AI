import sqlite3
import json

DB_PATH = r"C:\Users\hp\.local\share\mimocode\mimocode.db"

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
c = conn.cursor()

MAIN_SESSION = "ses_1013fb9d9ffe6H10LVlwN0w2Hj"

# All parts from main session (any role)
print("=== ALL PARTS IN MAIN SESSION ===")
c.execute("""
    SELECT m.id, m.agent_id, json_extract(m.data, '$.role') as role, json_extract(p.data, '$.type') as ptype, json_extract(p.data, '$.tool') as tool, p.data
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = ?
    ORDER BY m.time_created, p.time_created
""", (MAIN_SESSION,))
for r in c.fetchall():
    agent = r[1] if r[1] != 'main' else '-'
    role = r[2] or '-'
    ptype = r[3] or '-'
    tool = r[4] or '-'
    pdata = json.loads(r[5]) if r[5] else {}
    
    if ptype == 'text':
        text = pdata.get('text', '')[:200]
        print(f"  [{role}|{agent}] TEXT: {text}")
    elif ptype == 'tool':
        state = pdata.get('state', {})
        inp = state.get('input', {})
        if tool == 'write':
            print(f"  [{role}|{agent}] WRITE: {inp.get('file_path', '')}")
        elif tool == 'edit':
            print(f"  [{role}|{agent}] EDIT: {inp.get('file_path', '')}")
        elif tool == 'bash':
            print(f"  [{role}|{agent}] BASH: {inp.get('command', '')[:200]}")
        elif tool == 'read':
            print(f"  [{role}|{agent}] READ: {inp.get('file_path', '')}")
        elif tool == 'grep':
            print(f"  [{role}|{agent}] GREP: {inp.get('pattern', '')}")
        elif tool == 'glob':
            print(f"  [{role}|{agent}] GLOB: {inp.get('pattern', '')}")
        else:
            print(f"  [{role}|{agent}] {tool}: {str(inp)[:200]}")
    elif ptype == 'step-start':
        print(f"  [{role}|{agent}] --- STEP START ---")
    elif ptype == 'step-finish':
        print(f"  [{role}|{agent}] --- STEP FINISH ---")
    else:
        print(f"  [{role}|{agent}] {ptype}: {str(pdata)[:200]}")

conn.close()
