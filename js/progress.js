(function(){
  const qs = window.QUESTIONS || [];
  const g = window.GUIDE || {};
  const st = AppCommon.stats(qs);
  const today = Store.today();
  const daily = AppCommon.state.daily[today] || 0;
  const totalPct = st.total ? Math.round(100 * st.mastered / st.total) : 0;

  document.getElementById('pMetrics').innerHTML = [
    { label: '总掌握率', value: totalPct + '%', desc: `已掌握 ${st.mastered} / 总量 ${st.total}`, bar: totalPct },
    { label: '连续打卡', value: (AppCommon.state.streak.days || 0) + ' <span style="font-size:14px;color:var(--text3);font-weight:500">天</span>', desc: `今日已刷 ${daily} 道题`, bar: null },
    { label: '冲刺倒计时', value: AppCommon.countdown() + ' <span style="font-size:14px;color:var(--text3);font-weight:500">天</span>', desc: '目标节点：2027-03-01', bar: null },
  ].map(m => `
    <div class="card metric">
      <div class="v">${m.value}</div>
      <div class="l">${m.label}</div>
      <div class="tiny" style="margin-top:6px">${m.desc}</div>
      ${m.bar !== null ? `<div class="progress-bar" style="margin-top:8px"><i style="width:${m.bar}%"></i></div>` : ''}
    </div>
  `).join('');

  const bars = document.getElementById('secBars');
  bars.innerHTML = Object.entries(st.bySection).map(([name, x]) => {
    const pct = x.total ? Math.round(100 * x.mastered / x.total) : 0;
    return `
      <div style="margin:16px 0">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px">
          <strong style="color:var(--text); font-size:14.5px">${name}</strong>
          <span class="tiny" style="font-weight:600; color:var(--text2)">${x.mastered} / ${x.total} <span style="color:var(--accent);margin-left:4px">(${pct}%)</span></span>
        </div>
        <div class="progress-bar"><i style="width:${pct}%"></i></div>
      </div>
    `;
  }).join('');

  const miles = document.getElementById('miles');
  miles.innerHTML = (g.milestones || []).map(m => {
    const on = !!AppCommon.state.milestones[m.id];
    return `
      <li style="display:flex; align-items:center; gap:12px; padding:12px 0;">
        <input type="checkbox" data-m="${m.id}" ${on ? 'checked' : ''}/>
        <div style="flex:1">
          <span class="tag" style="font-weight:600; margin-bottom:2px">${m.month}</span>
          <span style="font-size:14px; color:${on ? 'var(--text3)' : 'var(--text)'}; text-decoration:${on ? 'line-through' : 'none'}">${m.text}</span>
        </div>
      </li>
    `;
  }).join('');

  miles.querySelectorAll('input').forEach(inp => {
    inp.onchange = () => {
      AppCommon.state.milestones[inp.dataset.m] = inp.checked;
      AppCommon.persist();
      const textSpan = inp.closest('li').querySelector('span:last-child');
      if (textSpan) {
        textSpan.style.textDecoration = inp.checked ? 'line-through' : 'none';
        textSpan.style.color = inp.checked ? 'var(--text3)' : 'var(--text)';
      }
    };
  });

  document.getElementById('exportBtn2').onclick = () => {
    const blob = new Blob([Store.exportJSON(AppCommon.state)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `interview-progress-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    AppCommon.toast('导出成功');
  };

  document.getElementById('importFile2').onchange = async (e) => {
    try {
      Store.importJSON(await e.target.files[0].text());
      AppCommon.toast('导入成功，正在刷新…');
      setTimeout(() => location.reload(), 500);
    } catch (err) {
      AppCommon.toast('导入失败：' + err.message);
    }
  };
})();
