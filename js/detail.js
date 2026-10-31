(function(){
  const all = window.QUESTIONS || [];
  const idx = window.DETAIL_INDEX || {};
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $ = x => document.getElementById(x);
  const q = all.find(x => x.id === id);
  if (!q) { $('dTitle').textContent = '未找到该题'; return; }
  // filter carried from list
  const f = {}; ['section','category','priority','source','mastery','q'].forEach(k => { if (params.get(k)) f[k] = params.get(k); });
  const kw = (f.q||'').toLowerCase();
  const list = all.filter(x => (!f.section||x.section===f.section) && (!f.category||x.category===f.category) &&
    (!f.priority||x.priority===f.priority) && (!f.source||x.source===f.source) &&
    (!f.mastery||AppCommon.masteryOf(x.id)===f.mastery || x.id===id) &&
    (!kw || x.question.toLowerCase().includes(kw) || (x.keyPoints||[]).join(' ').toLowerCase().includes(kw)));
  const filterQs = new URLSearchParams(f).toString();
  const link = qid => './q.html?id=' + encodeURIComponent(qid) + (filterQs ? '&' + filterQs : '');
  const pos = list.findIndex(x => x.id === id);
  $('dBack').href = './questions.html' + (filterQs ? '?' + filterQs : '');
  $('dPos').textContent = pos >= 0 ? `${pos+1} / ${list.length}` : '';
  const setNav = (el, t) => { if (t) el.href = link(t.id); else el.classList.add('disabled'); };
  setNav($('dPrev'), list[pos-1]); setNav($('dNext'), list[pos+1]);
  document.title = q.question.slice(0,30) + ' · 面试备考';
  $('dMeta').innerHTML = `<span class="tag p-${q.priority}">${q.priority}</span><span class="tag">${esc(q.category)}</span><span class="tag">${esc(q.section)}</span>`;
  $('dTitle').textContent = q.question;
  $('dPoints').innerHTML = (q.keyPoints||[]).map(t => `<li>${esc(t)}</li>`).join('');
  const ref = (q.refLinks||[]).find(r => r && r.url);
  if (ref) $('dRef').innerHTML = `可选 · <a href="${esc(ref.url)}" target="_blank" rel="noopener">原文参考</a>（外链，非必读）`;
  function renderMastery(){
    const m = AppCommon.masteryOf(id);
    $('dMastery').innerHTML = ['未学','模糊','掌握'].map(x => `<button type="button" data-m="${x}" class="${m===x?'on-'+x:''}">${x}</button>`).join('');
    $('dMastery').querySelectorAll('button').forEach(b => b.onclick = () => { AppCommon.setMastery(id, b.dataset.m); renderMastery(); });
  }
  renderMastery();
  $('dNote').value = AppCommon.state.notes[id] || '';
  $('dNote').onchange = () => { AppCommon.state.notes[id] = $('dNote').value; AppCommon.persist(); };

  const sec = (title, html) => `<section class="card d-sec"><h2>${title}</h2>${html}</section>`;
  const paras = a => (a||[]).map(p => `<p>${esc(p).replace(/【(结合你的项目|待填)[^】]*】/g, m => `<mark>${m}</mark>`)}</p>`).join('');
  function renderDetail(d){
    $('dBody').innerHTML =
      sec('原理讲解', paras(d.principle)) +
      sec('示例', `<pre class="code"><code>${esc(d.example.code)}</code></pre><div class="muted small">${esc(d.example.lang)}</div>`) +
      sec('面试常见问法', `<ol>${d.asks.map(a=>`<li>${esc(a)}</li>`).join('')}</ol><h3>常见追问</h3>` +
        d.followups.map(x => `<details><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')) +
      sec('参考答法（1–2 分钟，总→分→实践→总结）', paras(d.answer)) +
      sec('易错点 / 加分点', `<ul>${d.pitfalls.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`);
  }
  const file = idx[id];
  if (!file) { $('dBody').innerHTML = sec('详解', '<p class="muted">详解编写中，先看上面的要点速记。</p>'); return; }
  $('dBody').innerHTML = '<p class="muted">加载详解…</p>';
  fetch('./data/details/' + file + '.json').then(r => r.json()).then(data => {
    if (data[id]) renderDetail(data[id]); else $('dBody').innerHTML = sec('详解', '<p class="muted">详解编写中。</p>');
  }).catch(() => { $('dBody').innerHTML = sec('详解', '<p class="muted">详解加载失败，请刷新重试。</p>'); });
})();
