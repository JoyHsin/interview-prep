
(function(){
  const k = window.KNOWLEDGE || {sections:[]};
  document.getElementById('kCount').textContent = k.focusedMapPages || '';
  const box = document.getElementById('tree');
  box.innerHTML = (k.sections||[]).map(sec => {
    const items = (sec.pages||[]).map(p => `<li><a href="${p.url}" target="_blank" rel="noopener">${p.title}</a></li>`).join('');
    return `<details><summary>${sec.name}（${sec.count}）</summary><ul>${items}</ul></details>`;
  }).join('') || '<p>暂无数据</p>';
})();
