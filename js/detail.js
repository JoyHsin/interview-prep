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
  
  $('dBack').innerHTML = `← 返回题库列表`;
  $('dBack').href = './questions.html' + (filterQs ? '?' + filterQs : '');
  $('dPos').innerHTML = pos >= 0 ? `序号：<b>${pos+1}</b> / ${list.length}` : '';
  
  const setNav = (el, t) => { 
    if (t) {
      el.href = link(t.id);
      el.classList.remove('disabled');
    } else {
      el.classList.add('disabled');
    }
  };
  setNav($('dPrev'), list[pos-1]);
  setNav($('dNext'), list[pos+1]);
  
  document.title = q.question.slice(0,30) + ' · 详解';
  $('dMeta').innerHTML = `
    <div style="display:flex; gap:6px; align-items:center; margin-bottom:8px">
      <span class="tag p-${q.priority}">${q.priority}</span>
      <span class="tag">${esc(q.category)}</span>
      <span class="tag" style="color:var(--text3)">${esc(q.section)}</span>
    </div>
  `;
  $('dTitle').textContent = q.question;
  $('dPoints').innerHTML = (q.keyPoints||[]).map(t => `<li style="margin:6px 0">${esc(t)}</li>`).join('');
  
  const ref = (q.refLinks||[]).find(r => r && r.url);
  if (ref) $('dRef').innerHTML = `延伸参考 · <a href="${esc(ref.url)}" target="_blank" rel="noopener">原文出处</a>（外链，非必读）`;
  
  function renderMastery(){
    const m = AppCommon.masteryOf(id);
    $('dMastery').innerHTML = ['未学','模糊','掌握'].map(x => `<button type="button" data-m="${x}" class="${m===x?'on-'+x:''}">${x}</button>`).join('');
    $('dMastery').querySelectorAll('button').forEach(b => b.onclick = () => { 
      AppCommon.setMastery(id, b.dataset.m); 
      renderMastery();
      AppCommon.toast(`已设为：${b.dataset.m}`);
    });
  }
  renderMastery();
  
  $('dNote').value = AppCommon.state.notes[id] || '';
  $('dNote').onchange = () => { AppCommon.state.notes[id] = $('dNote').value; AppCommon.persist(); };

  const sec = (icon, title, html, borderLeftColor) => `
    <section class="card d-sec" style="${borderLeftColor ? `border-left: 3px solid ${borderLeftColor};` : ''}">
      <h2><span>${icon}</span> ${title}</h2>
      ${html}
    </section>
  `;
  
  const paras = a => (a||[]).map(p => `<p>${esc(p).replace(/【(结合你的项目|待填)[^】]*】/g, m => `<mark>${m}</mark>`)}</p>`).join('');
  
  function renderDetail(d){
    const codeBlock = d.example ? `
      <div class="code-wrap">
        <button type="button" class="copy-code-btn" title="复制代码">复制</button>
        <pre class="code"><code>${esc(d.example.code)}</code></pre>
      </div>
      <div class="tiny" style="color:var(--text3); font-family:var(--mono); margin-top:4px">语言：${esc(d.example.lang || 'code')}</div>
    ` : '<p class="muted">暂无示例代码</p>';

    $('dBody').innerHTML =
      sec('💡', '原理深度剖析', paras(d.principle), 'var(--accent)') +
      sec('💻', '核心示例与代码逻辑', codeBlock, '#6366f1') +
      sec('🎯', '面试常见问法与追问', `<ol style="padding-left:20px;margin:8px 0">${d.asks.map(a=>`<li style="margin:6px 0">${esc(a)}</li>`).join('')}</ol><h3 style="margin-top:16px">常见追问及应对：</h3>` +
        d.followups.map(x => `<details><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join(''), '#10b981') +
      sec('🗣️', '高分参考答法（1–2 分钟口述模板：总→分→实践→总结）', paras(d.answer), '#f59e0b') +
      sec('⚠️', '易错点与加分项', `<ul style="padding-left:20px;margin:8px 0">${d.pitfalls.map(p=>`<li style="margin:6px 0">${esc(p)}</li>`).join('')}</ul>`, '#ef4444');

    // Setup copy code buttons
    $('dBody').querySelectorAll('.copy-code-btn').forEach(btn => {
      btn.onclick = () => {
        const code = btn.closest('.code-wrap').querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = '已复制！';
          setTimeout(() => btn.textContent = '复制', 2000);
        }).catch(() => {
          btn.textContent = '复制失败';
        });
      };
    });
  }

  const file = idx[id];
  if (!file) { $('dBody').innerHTML = sec('📖', '详细解析', '<p class="muted">该题暂未编写扩展长详解，核心考点请参考上方“要点速记”。</p>'); return; }
  $('dBody').innerHTML = '<div class="card" style="text-align:center;padding:30px;color:var(--text3)">正在加载权威详解…</div>';
  fetch('./data/details/' + file + '.json').then(r => r.json()).then(data => {
    if (data[id]) renderDetail(data[id]); else $('dBody').innerHTML = sec('📖', '详细解析', '<p class="muted">详解收录中。</p>');
  }).catch(() => { $('dBody').innerHTML = sec('📖', '详细解析', '<p class="muted">详解加载失败，请检查网络或刷新页面。</p>'); });
})();
