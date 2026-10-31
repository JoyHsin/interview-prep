"""Validate actual browser data, detail references and resource decisions."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
p = root / 'data'
qs = json.loads((p / 'questions.json').read_text())
idx = json.loads((p / 'details/index.json').read_text())
assert len(qs) == len({q['id'] for q in qs}), 'duplicate IDs'
assert json.loads((p / 'questions.js').read_text().split('=', 1)[1].strip().removesuffix(';')) == qs
assert json.loads((p / 'details-index.js').read_text().split('=', 1)[1].strip().removesuffix(';')) == idx
by_id = {q['id']: q for q in qs}
for id, filename in idx.items():
    assert id in by_id, f'unknown detail ID {id}'
    assert id in json.loads((p / 'details' / (filename + '.json')).read_text()), f'missing detail {id}'
for q in qs:
    assert q['priority'] in ('必背', '重点', '了解')
    assert q['question'] and q['keyPoints']
    if q['id'].startswith('pack-h'):
        assert q['id'] in idx
        d = json.loads((p / 'details' / (idx[q['id']] + '.json')).read_text())[q['id']]
        for field in ('principle', 'example', 'asks', 'followups', 'answer', 'pitfalls'):
            assert d[field], (q['id'], field)
        assert d['example']['code'] and d['example']['lang']
        assert all(f['q'] and f['a'] for f in d['followups'])
audit = json.loads((p / 'resource-audit.json').read_text())
for r in audit['files']:
    assert set(r['questionIds']) <= by_id.keys(), r['path']
    if r['comparisonStatus'] == 'reviewed':
        assert r.get('decision'), r['path']
print(f"PASS: {len(qs)} questions; {sum(q['id'].startswith('pack-h') for q in qs)} imported questions with details; {sum(r['comparisonStatus'] == 'reviewed' for r in audit['files'])}/{len(audit['files'])} resource reviews")
