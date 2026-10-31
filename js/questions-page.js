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

  function detailLink(id){
    const f = {section:'fSection',category:'fCat',priority:'fPri',source:'fSrc',mastery:'fMastery',q:'qSearch'};
    const u = new URLSearchParams({id});
    Object.entries(f).forEach(([k,el]) => { const v=document.getElementById(el).value.trim(); if (v) u.set(k,v); });
    return './q.html?' + u.toString();
  }

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

    document.getElementById('qCount').innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin: 12px 0 8px;">
        <span style="font-weight:600; color:var(--text)">展示 <b>${list.length}</b> / 共 ${qs.length} 题</span>
        <span class="tiny" style="color:var(--text3)">无需跳转外站 · 答案要点内置</span>
      </div>
    `;

    const box = document.getElementById('qList');
    box.innerHTML = list.map(q => {
      const mast = AppCommon.masteryOf(q.id);
      const note = AppCommon.state.notes[q.id] || '';
      const points = (q.keyPoints||[]).map(t => `<li>${escapeHtml(t)}</li>`).join('');
      const ref = (q.refLinks||[]).find(r => r && r.url);
      const ext = ref ? `<div class="ext-link">可选 · <a href="${escapeHtml(ref.url)}" target="_blank" rel="noopener">原文参考</a>（外链，非必读）</div>` : '';
      const hasDetail = !!(window.DETAIL_INDEX||{})[q.id];

      const noteBlock = note ? `
        <div class="note-box" style="margin-top:12px; padding:8px 12px; background:var(--bg-elev-2); border-radius:8px; border:1px solid var(--border);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px">
            <span class="tiny" style="font-weight:600; color:var(--text2)">📝 个人笔记</span>
            <button type="button" class="ghost note-edit-btn" style="min-height:auto; padding:2px 6px; font-size:12px">编辑</button>
          </div>
          <div class="note-content" style="font-size:13.5px; color:var(--text); white-space:pre-wrap">${escapeHtml(note)}</div>
          <textarea class="note hidden" placeholder="个人笔记…">${escapeHtml(note)}</textarea>
        </div>
      ` : `
        <div class="note-box" style="margin-top:10px;">
          <button type="button" class="ghost note-add-btn note-toggle-btn">+ 记笔记</button>
          <textarea class="note hidden" placeholder="添加这道题的复习心得或备考笔记…"></textarea>
        </div>
      `;

      return `<article class="card q-item" data-id="${q.id}">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <span class="tag p-${q.priority}">${q.priority}</span>
            <span class="tag">${escapeHtml(q.category)}</span>
            <span class="tag" style="color:var(--text3)">${escapeHtml(q.section)}</span>
          </div>
          ${hasDetail ? `<a class="d-badge" href="${detailLink(q.id)}" style="text-decoration:none">⚡ 查看详解</a>` : ''}
        </div>
        
        <div class="q-title">
          <a href="${detailLink(q.id)}">${escapeHtml(q.question)}</a>
        </div>
        
        <ul class="points ${showPoints.checked ? '' : 'hidden'}">${points || '<li>暂无要点</li>'}</ul>
        ${ext}

        <div class="q-actions">
          <div class="seg" data-mastery>
            ${['未学','模糊','掌握'].map(x => `<button type="button" data-m="${x}" class="${mast===x?'on-'+x:''}">${x}</button>`).join('')}
          </div>
          <a class="small" href="${detailLink(q.id)}" style="color:var(--accent); font-weight:500; display:inline-flex; align-items:center; gap:2px">
            完整解析与追问 →
          </a>
        </div>

        ${noteBlock}
      </article>`;
    }).join('') || '<div class="card" style="text-align:center; padding:40px 20px; color:var(--text3)">无匹配题目，可尝试更换筛选条件</div>';

    // Mastery toggle
    box.querySelectorAll('[data-mastery] button').forEach(btn => {
      btn.onclick = () => {
        AppCommon.setMastery(btn.closest('.q-item').dataset.id, btn.dataset.m);
        render();
      };
    });

    // Note interaction
    box.querySelectorAll('.note-add-btn').forEach(btn => {
      btn.onclick = () => {
        const box = btn.closest('.note-box');
        const ta = box.querySelector('textarea.note');
        btn.classList.add('hidden');
        ta.classList.remove('hidden');
        ta.focus();
      };
    });
    box.querySelectorAll('.note-edit-btn').forEach(btn => {
      btn.onclick = () => {
        const box = btn.closest('.note-box');
        const content = box.querySelector('.note-content');
        const ta = box.querySelector('textarea.note');
        content.classList.add('hidden');
        btn.classList.add('hidden');
        ta.classList.remove('hidden');
        ta.focus();
      };
    });
    box.querySelectorAll('textarea.note').forEach(ta => {
      ta.onchange = () => {
        const id = ta.closest('.q-item').dataset.id;
        AppCommon.state.notes[id] = ta.value.trim();
        AppCommon.persist();
      };
      ta.onblur = () => {
        const id = ta.closest('.q-item').dataset.id;
        if (ta.value.trim() !== (AppCommon.state.notes[id] || '')) {
          AppCommon.state.notes[id] = ta.value.trim();
          AppCommon.persist();
          render();
        }
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
