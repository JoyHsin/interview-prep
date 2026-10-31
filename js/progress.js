
(function(){
  const qs = window.QUESTIONS || [];
  const g = window.GUIDE || {};
  const st = AppCommon.stats(qs);
  const today = Store.today();
  const daily = AppCommon.state.daily[today] || 0;
  document.getElementById('pMetrics').innerHTML = [
    ['总掌握率', (st.total? Math.round(100*st.mastered/st.total):0)+'%', st.mastered+'/'+st.total],
    ['连续天数', (AppCommon.state.streak.days||0)+' 天', '今日刷题 '+daily],
    ['倒计时', AppCommon.countdown()+' 天', '至 2027-03-01'],
  ].map(([l,v,d])=>`<div class="card metric"><div class="v">${v}</div><div class="l">${l}</div><div class="tiny">${d}</div></div>`).join('');
  const bars = document.getElementById('secBars');
  bars.innerHTML = Object.entries(st.bySection).map(([name, x]) => {
    const pct = x.total? Math.round(100*x.mastered/x.total):0;
    return `<div style="margin:10px 0"><div style="display:flex;justify-content:space-between"><strong>${name}</strong><span class="tiny">${x.mastered}/${x.total} (${pct}%)</span></div><div class="progress-bar"><i style="width:${pct}%"></i></div></div>`;
  }).join('');
  const miles = document.getElementById('miles');
  miles.innerHTML = (g.milestones||[]).map(m => {
    const on = !!AppCommon.state.milestones[m.id];
    return `<li><input type="checkbox" data-m="${m.id}" ${on?'checked':''}/><div><strong>${m.month}</strong> ${m.text}</div></li>`;
  }).join('');
  miles.querySelectorAll('input').forEach(inp => {
    inp.onchange = () => { AppCommon.state.milestones[inp.dataset.m] = inp.checked; AppCommon.persist(); };
  });
  document.getElementById('exportBtn2').onclick = () => {
    const blob = new Blob([Store.exportJSON(AppCommon.state)], {type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='interview-progress.json'; a.click();
  };
  document.getElementById('importFile2').onchange = async (e) => {
    try { Store.importJSON(await e.target.files[0].text()); AppCommon.toast('导入成功'); location.reload(); }
    catch(err){ AppCommon.toast('失败 '+err.message); }
  };
})();
