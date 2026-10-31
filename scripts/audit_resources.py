"""Inventory priority PDFs without publishing their copyrighted contents."""
import argparse, hashlib, json, re, subprocess
from pathlib import Path

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('root', type=Path)
    parser.add_argument('--output', type=Path, default=Path('data/resource-audit.json'))
    args = parser.parse_args()
    previous = {}
    if args.output.exists():
        previous = {r['path']: r for r in json.loads(args.output.read_text())['files']}
    keys = ['20 数据库高频', 'MySQL性能优化的21', '分布式缓存之Redis', '场景攻略', '网络相关面试', 'MyBatis面试', 'SpringMVC面试', 'SpringBoot面试', 'SpringCloud面试', 'Dubbo面试', 'Kafka面试', 'RabbitMQ面试', '并发编程面试', 'JVM面试', 'MySQL高频', 'Redis精品', 'MySQL精品', 'Redis70题', 'Spring灵魂', 'Spring面试题', 'Redis学习笔记', 'RocketMQ笔记', 'Kafka笔记', '阿里P8MySQL']
    files = []
    hashes = {}
    for f in sorted(args.root.rglob('*.pdf')):
        relative = str(f.relative_to(args.root))
        if not (any(k in f.name for k in keys) or any(k in relative for k in ['JVM相关', '并发编程pdf', 'BAT面试常问81题'])):
            continue
        digest = hashlib.sha256(f.read_bytes()).hexdigest()
        r = subprocess.run(['pdftotext', '-layout', str(f), '-'], capture_output=True, text=True, timeout=60)
        titles = [re.sub(r'\s+', ' ', line.strip()) for line in r.stdout.splitlines() if re.match(r'^\s*(?:问题[一二三四五六七八九十\d]+|\d{1,3}[.、．])', line) and len(line.strip()) < 130]
        old = previous.get(relative, {})
        files.append({'path': relative, 'sha256': digest, 'duplicateOf': hashes.get(digest), 'textExtracted': r.returncode == 0 and len(r.stdout.strip()) > 100, 'characters': len(r.stdout), 'candidateHeadings': len(titles), 'comparisonStatus': old.get('comparisonStatus', 'pending'), 'questionIds': old.get('questionIds', []), 'decision': old.get('decision', '')})
        hashes.setdefault(digest, relative)
    args.output.write_text(json.dumps({'scope': '高优先级专题题集、JVM/并发笔记与场景题；pending 表示尚未完成逐考点核对，文本提取不代表对比完成。', 'files': files}, ensure_ascii=False, indent=2) + '\n')
    print(f'{len(files)} PDFs; {sum(bool(x["duplicateOf"]) for x in files)} duplicates; {sum(x["textExtracted"] for x in files)} extracted')

if __name__ == '__main__':
    main()
