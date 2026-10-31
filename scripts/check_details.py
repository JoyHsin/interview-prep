#!/usr/bin/env python3
"""Fail if any detail entry is thin. Usage: python3 scripts/check_details.py [--list] [--priority 重点]"""
import json, glob, sys, os, re

root = os.path.join(os.path.dirname(__file__), '..', 'data', 'details')
qs = {q['id']: q for q in json.load(open(os.path.join(root, '..', 'questions.json')))}
idx = json.load(open(os.path.join(root, 'index.json')))

DETAIL_FILES = sorted(
    f for f in glob.glob(os.path.join(root, '*.json'))
    if os.path.basename(f) != 'index.json'
)

def cn_len(s):
    return len(re.findall(r'[\u4e00-\u9fff]', s or ''))

def is_ok(pri, d):
    """Full bar: JSON len >= 1200. 了解 may pass at >=900 with deep principle+code."""
    n = len(json.dumps(d, ensure_ascii=False))
    principle = '\n'.join(d.get('principle') or [])
    code = (d.get('example') or {}).get('code') or ''
    asks = d.get('asks') or []
    fus = d.get('followups') or []
    ans = d.get('answer') or []
    pits = d.get('pitfalls') or []
    base = (
        len(asks) >= 4
        and len(fus) >= 3
        and all(len(fu.get('a', '')) >= 25 for fu in fus)
        and all(len(line) >= 25 for line in ans)
        and len(pits) >= 2
    )
    if n >= 1200 and base:
        return True, []
    probs = []
    if n < 1200:
        probs.append(f'len={n}')
    if len(asks) < 4:
        probs.append(f'asks={len(asks)}')
    if len(fus) < 3:
        probs.append(f'followups={len(fus)}')
    for fu in fus:
        if len(fu.get('a', '')) < 25:
            probs.append(f'followup<25:{fu.get("a","")[:40]}')
    for line in ans:
        if len(line) < 25:
            probs.append(f'answer<25:{line[:40]}')
    if len(pits) < 2:
        probs.append(f'pitfalls={len(pits)}')
    # 了解 lite path
    if pri == '了解' and n >= 900 and cn_len(principle) >= 200 and len(code) >= 40 and base:
        return True, []
    if pri == '了解':
        probs.append(f'cn={cn_len(principle)} code={len(code)}')
    return False, probs

bad = []
seen = {}
pri_filter = None
if '--priority' in sys.argv:
    i = sys.argv.index('--priority')
    pri_filter = sys.argv[i + 1] if i + 1 < len(sys.argv) else None

for f in DETAIL_FILES:
    stem = os.path.basename(f)[:-5]
    data = json.load(open(f))
    for k, d in data.items():
        seen[k] = stem
        q = qs.get(k)
        pri = (q or {}).get('priority', '重点')
        if pri_filter and pri != pri_filter:
            continue
        ok, probs = is_ok(pri, d)
        if not ok:
            bad.append((k, probs, pri))

for k, stem in seen.items():
    if k not in qs:
        bad.append((k, ['orphan detail not in questions.json'], '?'))
    elif idx.get(k) != stem:
        bad.append((k, [f'index mismatch {idx.get(k)} != {stem}'], qs[k]['priority']))

for k in idx:
    if k not in seen:
        bad.append((k, ['index points to missing entry'], qs.get(k, {}).get('priority', '?')))

for k in qs:
    if pri_filter and qs[k]['priority'] != pri_filter:
        continue
    if k not in seen:
        bad.append((k, ['no detail'], qs[k]['priority']))

# also check details-index.js sync
js_path = os.path.join(root, '..', 'details-index.js')
if os.path.exists(js_path):
    raw = open(js_path).read()
    js_idx = json.loads(raw.split('=', 1)[1].strip().rstrip(';'))
    if js_idx != idx:
        bad.append(('_details-index.js', ['out of sync with index.json'], '?'))

if '--list' in sys.argv:
    for k, p, pri in bad:
        print(f'{k}\t{pri}\t{", ".join(p)[:140]}')

from collections import Counter
c = Counter(pri for _, _, pri in bad)
print(f'checked {len(seen)} detail entries / {len(qs)} questions; thin/bad: {len(set(k for k,_,_ in bad))} {dict(c)}')
sys.exit(1 if bad else 0)
