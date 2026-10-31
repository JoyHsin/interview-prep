
(function(){
  const g = window.GUIDE || {};
  const qs = window.QUESTIONS || [];
  const path = location.pathname;

  if (path.endsWith('timeline.html')) {
    document.getElementById('tl').innerHTML = (g.timeline||[]).map(t =>
      `<div class="card"><h3>${t.month} · ${t.title}</h3><ul>${(t.items||[]).map(i=>'<li>'+i+'</li>').join('')}</ul></div>`
    ).join('');
  }
  if (path.endsWith('projects.html')) {
    const box = document.getElementById('projects');
    box.innerHTML = (g.projects||[]).map(p => {
      const saved = AppCommon.state.projectTexts[p.id] || {};
      const field = (key, label, val) => `<label class="tiny">${label}</label><textarea data-pid="${p.id}" data-k="${key}">${saved[key] != null ? saved[key] : val}</textarea>`;
      return `<div class="card"><h3>${p.title}</h3>
        ${field('situation','Situation', p.situation)}
        ${field('task','Task', p.task)}
        ${field('action','Action', p.action)}
        ${field('result','Result', p.result)}
        <p class="tiny">追问：${(p.followups||[]).join('；')}</p>
      </div>`;
    }).join('');
    box.querySelectorAll('textarea').forEach(ta => {
      ta.addEventListener('change', () => {
        const id = ta.dataset.pid;
        AppCommon.state.projectTexts[id] = AppCommon.state.projectTexts[id] || {};
        AppCommon.state.projectTexts[id][ta.dataset.k] = ta.value;
        AppCommon.persist();
        AppCommon.toast('已保存');
      });
    });
  }
  if (path.endsWith('system-design.html')) {
    const sds = qs.filter(q => q.category === '系统设计');
    document.getElementById('sd').innerHTML = sds.map(q =>
      `<div class="card"><h3>${q.question}</h3><ul class="points">${(q.keyPoints||[]).map(t=>'<li>'+t+'</li>').join('')}</ul><div class="tiny">${q.source}</div></div>`
    ).join('');
  }
  if (path.endsWith('study-path.html')) {
    document.getElementById('path').innerHTML = `<table style="width:100%;border-collapse:collapse">${(g.studyPath||[]).map(r =>
      `<tr><td class="card" style="margin:0"><strong>${r.when}</strong><br/><span class="muted">${r.repo}</span><br/>${r.focus}</td></tr>`
    ).join('')}</table>`;
    const d = g.demoProject || {};
    document.getElementById('demo').innerHTML = `<h3>补洞 Demo</h3><p><a href="${d.url}" target="_blank" rel="noopener">${d.name}</a></p><p class="muted">${d.note||''}</p>`;
  }
  if (path.endsWith('resume.html')) {
    const r = g.resumeTips || {};
    document.getElementById('resume').innerHTML = `
      <div class="card"><h3>学历短答</h3><p>${r.education||''}</p></div>
      <div class="card"><h3>BOSS 关键词</h3><ul>${(r.keywords||[]).map(x=>'<li>'+x+'</li>').join('')}</ul></div>
      <div class="grid cols-2">
        <div class="card"><h3>可强调</h3><ul>${(r.do||[]).map(x=>'<li>'+x+'</li>').join('')}</ul></div>
        <div class="card"><h3>别写</h3><ul>${(r.dont||[]).map(x=>'<li>'+x+'</li>').join('')}</ul></div>
      </div>`;
  }
  if (path.endsWith('job-market.html')) {
    const j = g.jobMarket || {};
    document.getElementById('job').innerHTML = `
      <div class="card"><h3>目标</h3><p>${j.target||''}</p></div>
      <div class="card"><h3>观察摘要</h3><p>${j.summary||''}</p></div>
      <div class="card"><h3>示例岗位（当时所见）</h3><ul>${(j.examples||[]).map(x=>'<li>'+x+'</li>').join('')}</ul></div>`;
  }
})();
