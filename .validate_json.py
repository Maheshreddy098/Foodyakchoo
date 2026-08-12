import json
from pathlib import Path
import sys
root = Path('.')
errors = []
for path in root.rglob('*.json'):
    if '.backup' in str(path).replace('\\', '/'):
        continue
    try:
        json.loads(path.read_text(encoding='utf-8'))
    except Exception as e:
        errors.append((path, e))
if errors:
    for p, e in errors:
        print(f'ERROR: {p}: {e}')
    sys.exit(1)
print('ALL_JSON_VALID')
