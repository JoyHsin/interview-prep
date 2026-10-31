(function(){
  const qs = window.QUESTIONS || [];
  const uniq = (arr) => [...new Set(arr)].sort();
  const fill = (sel, values) => { values.forEach(v => { const o=document.createElement('option'); o.value=v; o.textContent=v; sel.appendChild(o); }); };
  fill(document.getElementById('fSection'), uniq(qs.map(q=>q.section)));
  fill(document.getElementById('fCat'), uniq(qs.map(q=>q.category)));
  fill(document.getElementById('fSrc'), uniq(qs.map(q=>q.source)));

  // Apply URL query (?section=&category=&priority=)
  const params = new URLSearchParams(location.search);
  ['section','category','priority','source','mastery','q'].forEach(k => {
    const map = {section:'fSection',category:'fCat',priority:'fPri',source:'fSrc',mastery:'fMastery',q:'qSearch'};
    const el = document.getElementById(map[k]);
    if (el && params.get(k)) el.value = params.get(k);
  });

  const showPoints = document.getElementById('showPoints');
  showPoints.checked = AppCommon.state.settings.showPoints !== false;
  showPoints.onchange = () => { AppCommon.state.settings.showPoints = showPoints.checked; AppCommon.persist(); render(); };

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function render() {
    const s = document.getElementById('fSection').value;
    const c = document.getElementById('fCat').value;
    const p = document.getElementById('fPri').value;
    const src = document.getElementById('fSrc').value;
    const m = document.getElementById('fMastery').value;
    const kw = document.getElementById('qSearch').value.trim().toLowerCase();
    const list = qs.filter(q => {
      if (s && q.section !== s) return false;
      if (c && q.category !== c) return false;
      if (p && q.priority !== p) return false;
      if (src && q.source !== src) return false;
      const mast = AppCommon.masteryOf(q.id);
      if (m && mast !== m) return false;
      if (kw && !(q.question.toLowerCase().includes(kw) || (q.keyPoints||[]).join(' ').toLowerCase().includes(kw))) return false;
      return true;
    });
    document.getElementById('qCount').textContent = `本页展示 ${list.length} / 共 ${qs.length} 题（答案要点在卡片内，无需跳转外站）`;
    const box = document.getElementById('qList');
    box.innerHTML = list.map(q => {
      const mast = AppCommon.masteryOf(q.id);
      const note = AppCommon.state.notes[q.id] || '';
      const points = (q.keyPoints||[]).map(t => `<li>${escapeHtml(t)}</li>`).join('');
      const ref = (q.refLinks||[]).find(r => r && r.url);
      const ext = ref ? `<div class="ext-link">可选 · <a href="${escapeHtml(ref.url)}" target="_blank" rel="noopener">原文参考</a>（外链，非必读）</div>` : '';
      return `<article class="card q-item" data-id="${q.id}">
        <div><span class="tag p-${q.priority}">${q.priority}</span><span class="tag">${escapeHtml(q.category)}</span><span class="tag">${escapeHtml(q.section)}</span></div>
        <div class="q-title">${escapeHtml(q.question)}</div>
        <ul class="points ${showPoints.checked?'':'hidden'}">${points || '<li>暂无要点</li>'}</ul>
        ${ext}
        <div class="q-actions">
          <div class="seg" data-mastery>
            ${['未学','模糊','掌握'].map(x => `<button type="button" data-m="${x}" class="${mast===x?'on-'+x:''}">${x}</button>`).join('')}
          </div>
        </div>
        <textarea class="note" placeholder="个人笔记…">${escapeHtml(note)}</textarea>
      </article>`;
    }).join('') || '<p class="muted">无匹配题目</p>';

    box.querySelectorAll('[data-mastery] button').forEach(btn => {
      btn.onclick = () => {
        AppCommon.setMastery(btn.closest('.q-item').dataset.id, btn.dataset.m);
        render();
      };
    });
    box.querySelectorAll('textarea.note').forEach(ta => {
      ta.onchange = () => {
        AppCommon.state.notes[ta.closest('.q-item').dataset.id] = ta.value;
        AppCommon.persist();
      };
    });
  }
  ['fSection','fCat','fPri','fSrc','fMastery','qSearch'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });
  render();
})();
