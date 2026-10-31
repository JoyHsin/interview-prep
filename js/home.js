(function(){
  const qs = window.QUESTIONS || [];
  const g = window.GUIDE || {};
  const st = AppCommon.stats(qs);
  const days = AppCommon.countdown();
  const pct = st.total ? Math.round(100 * st.mastered / st.total) : 0;

  document.getElementById('homeMetrics').innerHTML = [
    { label: '题库总量', value: st.total + ' <span style="font-size:14px;font-weight:500;color:var(--text3)">道</span>', desc: '覆盖 25+ 专题模块' },
    { label: '掌握进度', value: pct + '%', desc: `已掌握 ${st.mastered} · 模糊 ${st.fuzzy} · 未学 ${st.unknown}` },
    { label: '目标倒计时', value: days + ' <span style="font-size:14px;font-weight:500;color:var(--text3)">天</span>', desc: '目标冲刺期：2027-03-01' },
  ].map(m => `
    <div class="card metric">
      <div class="v">${m.value}</div>
      <div class="l">${m.label}</div>
      <div class="tiny" style="margin-top:6px">${m.desc}</div>
      ${m.label === '掌握进度' ? `<div class="progress-bar" style="margin-top:8px"><i style="width:${pct}%"></i></div>` : ''}
    </div>
  `).join('');

  document.getElementById('splitList').innerHTML = (g.prioritySplit || []).map(x => `
    <li style="padding: 10px 0;">
      <div style="display:flex; justify-content:space-between; align-items:center; width:100%">
        <div>
          <strong style="color:var(--text)">${x.name}</strong>
          <div class="tiny" style="color:var(--text2);margin-top:2px">${x.note}</div>
        </div>
        <span class="tag" style="margin:0;font-weight:600;background:var(--accent-soft);color:var(--accent);border-color:var(--accent-border)">${x.pct}</span>
      </div>
    </li>
  `).join('');

  const w = g.weekly || {};
  const weeklyItems = [
    { title: '工作日 (60–90 分钟)', text: w.weekday || '' },
    { title: '周六 (3–4 小时)', text: w.sat || '' },
    { title: '周日 (3–4 小时)', text: w.sun || '' }
  ];
  document.getElementById('weeklyList').innerHTML = weeklyItems.map(item => `
    <li style="padding: 10px 0;">
      <div style="width:100%">
        <strong style="color:var(--text);font-size:13.5px">${item.title}</strong>
        <div class="tiny" style="color:var(--text2);margin-top:2px">${item.text}</div>
      </div>
    </li>
  `).join('');

  document.getElementById('exportBtn').onclick = () => {
    const blob = new Blob([Store.exportJSON(AppCommon.state)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `interview-progress-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    AppCommon.toast('进度已导出到本地文件');
  };

  document.getElementById('importFile').onchange = async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try {
      AppCommon.state = Store.importJSON(await f.text());
      AppCommon.applyTheme(AppCommon.state.settings.theme);
      AppCommon.toast('进度导入成功！正在刷新…');
      setTimeout(() => location.reload(), 500);
    } catch (err) { AppCommon.toast('导入失败：' + err.message); }
  };
})();
