
(function(){
  const qs = window.QUESTIONS || [];
  const uniq = (arr) => [...new Set(arr)].sort();
  const fill = (sel, values) => { values.forEach(v => { const o=document.createElement('option'); o.value=v; o.textContent=v; sel.appendChild(o); }); };
  fill(document.getElementById('fSection'), uniq(qs.map(q=>q.section)));
  fill(document.getElementById('fCat'), uniq(qs.map(q=>q.category)));
  fill(document.getElementById('fSrc'), uniq(qs.map(q=>q.source)));
  const showPoints = document.getElementById('showPoints');
  showPoints.checked = AppCommon.state.settings.showPoints !== false;
  showPoints.onchange = () => { AppCommon.state.settings.showPoints = showPoints.checked; AppCommon.persist(); render(); };

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
    document.getElementById('qCount').textContent = `显示 ${list.length} / ${qs.length} 题`;
    const box = document.getElementById('qList');
    box.innerHTML = list.map(q => {
      const mast = AppCommon.masteryOf(q.id);
      const note = AppCommon.state.notes[q.id] || '';
      const points = (q.keyPoints||[]).map(t => `<li>${escapeHtml(t)}</li>`).join('');
      const refs = (q.refLinks||[]).map(r => `<a href="${r.url}" target="_blank" rel="noopener">参考</a>`).join(' ');
      return `<article class="card q-item" data-id="${q.id}">
        <div><span class="tag p-${q.priority}">${q.priority}</span><span class="tag">${q.category}</span><span class="tag">${q.section}</span><span class="tiny">${q.source}</span></div>
        <div class="q-title">${escapeHtml(q.question)}</div>
        <ul class="points ${showPoints.checked?'':'hidden'}">${points}</ul>
        <div class="tiny">${refs}</div>
        <div class="q-actions">
          <div class="seg" data-mastery>
            ${['未学','模糊','掌握'].map(x => `<button type="button" data-m="${x}" class="${mast===x?'on-'+x:''}">${x}</button>`).join('')}
          </div>
          <button type="button" class="ghost" data-toggle-points>要点</button>
        </div>
        <textarea class="note" placeholder="个人笔记…">${escapeHtml(note)}</textarea>
      </article>`;
    }).join('') || '<p class="muted">无匹配题目</p>';

    box.querySelectorAll('[data-mastery] button').forEach(btn => {
      btn.onclick = () => {
        const id = btn.closest('.q-item').dataset.id;
        AppCommon.setMastery(id, btn.dataset.m);
        render();
      };
    });
    box.querySelectorAll('[data-toggle-points]').forEach(btn => {
      btn.onclick = () => btn.closest('.q-item').querySelector('.points').classList.toggle('hidden');
    });
    box.querySelectorAll('textarea.note').forEach(ta => {
      ta.onchange = () => {
        const id = ta.closest('.q-item').dataset.id;
        AppCommon.state.notes[id] = ta.value;
        AppCommon.persist();
      };
    });
  }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  ['fSection','fCat','fPri','fSrc','fMastery','qSearch'].forEach(id => {
    document.getElementById(id).addEventListener('input', render);
    document.getElementById(id).addEventListener('change', render);
  });
  render();
})();
