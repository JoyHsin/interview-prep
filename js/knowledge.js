(function(){
  const qs = window.QUESTIONS || [];
  const k = window.KNOWLEDGE || {};
  const st = AppCommon.stats(qs);
  const orderJava = ['Java基础','集合','并发','JVM','IO','Java8','Spring','MyBatis','MySQL','Redis','MQ','ES','分布式','微服务','场景题','排障','Tomcat','网络'];
  const orderAi = ['LLM基础','RAG','Agent','框架','工程化','AI工具'];
  const orderSd = ['系统设计'];

  function card(cat) {
    const info = st.byCategory[cat];
    if (!info) return '';
    const href = './questions.html?category=' + encodeURIComponent(cat);
    const pct = info.total ? Math.round(100 * info.mastered / info.total) : 0;
    return `
      <a class="topic-card" href="${href}">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:baseline">
            <span class="n">${info.total}</span>
            <span class="tiny" style="font-weight:600; color:${pct>0?'var(--success)':'var(--text3)'}">${pct}%</span>
          </div>
          <div class="t">${cat}</div>
        </div>
        <div>
          <div class="progress-bar" style="height:4px; margin: 8px 0 4px">
            <i style="width:${pct}%"></i>
          </div>
          <div class="s">已掌握 ${info.mastered} / ${info.total} · 点击刷题</div>
        </div>
      </a>
    `;
  }

  document.getElementById('gridJava').innerHTML = orderJava.map(card).join('') || '<p class="muted">暂无</p>';
  document.getElementById('gridAi').innerHTML = orderAi.map(card).join('');
  document.getElementById('gridSd').innerHTML = orderSd.map(card).join('');

  document.getElementById('extList').innerHTML = (k.externalReading||[]).map(x => `
    <li style="margin: 8px 0; display:flex; justify-content:space-between; align-items:center;">
      <span style="font-weight:600; color:var(--text)">${x.name}</span>
      <a class="btn ghost" style="min-height:28px; padding:2px 10px; font-size:12.5px" href="${x.url}" target="_blank" rel="noopener">
        pdai 原文 ↗
      </a>
    </li>
  `).join('') || '<li class="muted">无</li>';
})();
