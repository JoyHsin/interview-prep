(function(){
  const all = window.QUESTIONS || [];
  const uniq = a => [...new Set(a)].sort();
  const fill = (el, vs) => vs.forEach(v => { const o=document.createElement('option'); o.value=v; o.textContent=v; el.appendChild(o); });
  fill(document.getElementById('pSection'), uniq(all.map(q=>q.section)));
  fill(document.getElementById('pCat'), uniq(all.map(q=>q.category)));
  let deck = [];
  let idx = 0;
  let revealed = false;

  function buildDeck() {
    const s = document.getElementById('pSection').value;
    const c = document.getElementById('pCat').value;
    const p = document.getElementById('pPri').value;
    const prior = document.getElementById('pPrioritize').checked;
    let list = all.filter(q => (!s||q.section===s) && (!c||q.category===c) && (!p||q.priority===p));
    if (prior) {
      const rank = m => m==='未学'?0:m==='模糊'?1:2;
      list = list.slice().sort((a,b) => rank(AppCommon.masteryOf(a.id)) - rank(AppCommon.masteryOf(b.id)) || Math.random()-0.5);
    } else {
      list = list.slice().sort(() => Math.random()-0.5);
    }
    deck = list; idx = 0; show();
  }

  function show() {
    revealed = false;
    const el = document.getElementById('fPoints');
    el.classList.add('hidden'); el.innerHTML='';
    document.getElementById('fReveal').innerHTML = `<span>显示要点</span> <span class="kbd" style="background:rgba(255,255,255,0.2);color:#fff;border-color:rgba(255,255,255,0.3)">Space</span>`;
    if (!deck.length) {
      document.getElementById('fQ').textContent='当前筛选条件下没有题目';
      document.getElementById('fMeta').textContent='';
      document.getElementById('fProgress').textContent='';
      return;
    }
    if (idx >= deck.length) idx = 0;
    const q = deck[idx];
    const mast = AppCommon.masteryOf(q.id);
    const mastTag = `<span class="tag" style="background:var(--bg-elev-2)">当前：${mast}</span>`;
    document.getElementById('fMeta').innerHTML = `<span class="tag p-${q.priority}">${q.priority}</span> <span class="tag">${q.category}</span> ${mastTag} <span style="color:var(--text3);font-size:12px;margin-left:4px">${q.source}</span>`;
    document.getElementById('fQ').textContent = q.question;
    document.getElementById('fProgress').innerHTML = `题卡进度：<b>${idx+1}</b> / ${deck.length} 道`;
  }

  function toggleReveal() {
    const q = deck[idx]; if (!q) return;
    const el = document.getElementById('fPoints');
    if (!revealed) {
      el.innerHTML = '<ul class="points" style="margin:0 0 12px; padding-left:20px">'+(q.keyPoints||[]).map(t=>'<li style="margin:6px 0">'+t+'</li>').join('')+'</ul>'
        + '<div style="border-top:1px dashed var(--border); padding-top:10px; margin-top:8px"><a style="font-weight:600; display:inline-flex; align-items:center; gap:4px" href="./q.html?id='+encodeURIComponent(q.id)+'">深入解析：原理 / 示例代码 / 面试追问 / 最佳答法 →</a></div>';
      el.classList.remove('hidden'); revealed = true;
      document.getElementById('fReveal').innerHTML = `<span>隐藏要点</span> <span class="kbd" style="background:rgba(255,255,255,0.2);color:#fff;border-color:rgba(255,255,255,0.3)">Space</span>`;
    } else {
      el.classList.add('hidden'); revealed=false;
      document.getElementById('fReveal').innerHTML = `<span>显示要点</span> <span class="kbd" style="background:rgba(255,255,255,0.2);color:#fff;border-color:rgba(255,255,255,0.3)">Space</span>`;
    }
  }

  function markCurrent(mark) {
    const q = deck[idx]; if (!q) return;
    AppCommon.setMastery(q.id, mark);
    AppCommon.toast(`已标记为 [${mark}]`);
    idx++; show();
  }

  document.getElementById('fReveal').onclick = toggleReveal;
  document.querySelectorAll('[data-mark]').forEach(btn => {
    btn.onclick = () => markCurrent(btn.dataset.mark);
  });
  document.getElementById('fNext').onclick = () => { idx++; show(); };
  document.getElementById('pShuffle').onclick = () => { buildDeck(); AppCommon.toast('已重新随机洗牌'); };
  ['pSection','pCat','pPri','pPrioritize'].forEach(id => document.getElementById(id).addEventListener('change', buildDeck));

  // Keyboard shortcut support
  window.addEventListener('keydown', (e) => {
    if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return;
    if (e.code === 'Space') {
      e.preventDefault();
      toggleReveal();
    } else if (e.key === '1') {
      markCurrent('未学');
    } else if (e.key === '2') {
      markCurrent('模糊');
    } else if (e.key === '3') {
      markCurrent('掌握');
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
      idx++; show();
    }
  });

  buildDeck();
})();
