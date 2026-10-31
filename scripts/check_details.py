#!/usr/bin/env python3
"""Fail if any detail entry is thin. Usage: python3 scripts/check_details.py [--list]"""
import json, glob, sys, os
root = os.path.join(os.path.dirname(__file__), '..', 'data', 'details')
qs = {q['id']: q for q in json.load(open(os.path.join(root, '..', 'questions.json')))}
idx = json.load(open(os.path.join(root, 'index.json')))
bad = []
seen = {}
for f in sorted(glob.glob(os.path.join(root, 'cat-*.json'))):
    stem = os.path.basename(f)[:-5]
    for k, d in json.load(open(f)).items():
        seen[k] = stem
        probs = []
        n = len(json.dumps(d, ensure_ascii=False))
        if n < 1200: probs.append(f'len={n}')
        for fu in d.get('followups', []):
            if len(fu['a']) < 15: probs.append(f'followup<15:{fu["a"]}')
        if len(d.get('followups', [])) < 3: probs.append('followups<3')
        if len(d.get('asks', [])) < 4: probs.append('asks<4')
        for line in d.get('answer', []):
            if len(line) < 20: probs.append(f'answer<20:{line}')
        if len(d.get('pitfalls', [])) < 2: probs.append('pitfalls<2')
        if probs: bad.append((k, probs))
for k, stem in seen.items():
    if idx.get(k) != stem: bad.append((k, [f'index mismatch {idx.get(k)} != {stem}']))
for k in idx:
    if k not in seen: bad.append((k, ['index points to missing entry']))
for k in qs:
    if k not in seen: bad.append((k, ['no detail']))
if '--list' in sys.argv:
    for k, p in bad: print(k, '|', '; '.join(p)[:120])
print(f'checked {len(seen)} entries, thin/bad: {len(set(k for k,_ in bad))}')
sys.exit(1 if bad else 0)
