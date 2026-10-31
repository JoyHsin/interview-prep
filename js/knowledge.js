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
    return `<a class="topic-card" href="${href}"><div class="n">${info.total}</div><div class="t">${cat}</div><div class="s">已掌握 ${info.mastered} · 点进题库</div></a>`;
  }
  document.getElementById('gridJava').innerHTML = orderJava.map(card).join('') || '<p class="muted">暂无</p>';
  document.getElementById('gridAi').innerHTML = orderAi.map(card).join('');
  document.getElementById('gridSd').innerHTML = orderSd.map(card).join('');
  document.getElementById('extList').innerHTML = (k.externalReading||[]).map(x =>
    `<li><strong>${x.name}</strong> · <a href="${x.url}" target="_blank" rel="noopener">打开外链</a></li>`
  ).join('') || '<li class="muted">无</li>';
})();
