
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
    document.getElementById('fReveal').textContent='显示要点';
    if (!deck.length) {
      document.getElementById('fQ').textContent='当前筛选无题目';
      document.getElementById('fMeta').textContent='';
      document.getElementById('fProgress').textContent='';
      return;
    }
    if (idx >= deck.length) idx = 0;
    const q = deck[idx];
    document.getElementById('fMeta').innerHTML = `<span class="tag p-${q.priority}">${q.priority}</span> ${q.category} · ${q.source}`;
    document.getElementById('fQ').textContent = q.question;
    document.getElementById('fProgress').textContent = `${idx+1} / ${deck.length}`;
  }
  document.getElementById('fReveal').onclick = () => {
    const q = deck[idx]; if (!q) return;
    const el = document.getElementById('fPoints');
    if (!revealed) {
      el.innerHTML = '<ul class="points">'+(q.keyPoints||[]).map(t=>'<li>'+t+'</li>').join('')+'</ul>'
        + '<p><a href="./q.html?id='+encodeURIComponent(q.id)+'">查看详解：原理 / 示例 / 问法 / 参考答法 →</a></p>';
      el.classList.remove('hidden'); revealed = true;
      document.getElementById('fReveal').textContent='隐藏要点';
    } else {
      el.classList.add('hidden'); revealed=false;
      document.getElementById('fReveal').textContent='显示要点';
    }
  };
  document.querySelectorAll('[data-mark]').forEach(btn => {
    btn.onclick = () => {
      const q = deck[idx]; if (!q) return;
      AppCommon.setMastery(q.id, btn.dataset.mark);
      idx++; show();
    };
  });
  document.getElementById('fNext').onclick = () => { idx++; show(); };
  document.getElementById('pShuffle').onclick = buildDeck;
  ['pSection','pCat','pPri','pPrioritize'].forEach(id => document.getElementById(id).addEventListener('change', buildDeck));
  buildDeck();
})();
