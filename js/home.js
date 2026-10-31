
(function(){
  const qs = window.QUESTIONS || [];
  const g = window.GUIDE || {};
  const st = AppCommon.stats(qs);
  const days = AppCommon.countdown();
  document.getElementById('homeMetrics').innerHTML = [
    ['题量', st.total, '传统+AI+系统设计'],
    ['已掌握', st.mastered + '/' + st.total, '模糊 '+st.fuzzy],
    ['距 2027-03-01', days + ' 天', 'Asia/Shanghai'],
  ].map(([l,v,d]) => `<div class="card metric"><div class="v">${v}</div><div class="l">${l}</div><div class="tiny">${d}</div></div>`).join('');
  document.getElementById('splitList').innerHTML = (g.prioritySplit||[]).map(x => `<li><strong>${x.name}</strong> ${x.pct} — ${x.note}</li>`).join('');
  const w = g.weekly || {};
  document.getElementById('weeklyList').innerHTML = [`<li>${w.weekday||''}</li>`,`<li>${w.sat||''}</li>`,`<li>${w.sun||''}</li>`].join('');
  document.getElementById('exportBtn').onclick = () => {
    const blob = new Blob([Store.exportJSON(AppCommon.state)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'interview-progress.json';
    a.click();
  };
  document.getElementById('importFile').onchange = async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try {
      AppCommon.state = Store.importJSON(await f.text());
      AppCommon.applyTheme(AppCommon.state.settings.theme);
      AppCommon.toast('导入成功');
      location.reload();
    } catch (err) { AppCommon.toast('导入失败：'+err.message); }
  };
})();
