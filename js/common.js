(function () {
  function applyTheme(mode) {
    const dark = mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  }
  const state = Store.load();
  applyTheme(state.settings.theme || 'system');

  window.AppCommon = {
    state,
    persist() { Store.save(this.state); },
    applyTheme,
    setTheme(mode) {
      this.state.settings.theme = mode;
      this.persist();
      applyTheme(mode);
    },
    toast(msg) {
      const el = document.createElement('div');
      el.className = 'toast'; el.textContent = msg;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2200);
    },
    masteryOf(id) { return this.state.mastery[id] || '未学'; },
    setMastery(id, m) {
      this.state.mastery[id] = m;
      Store.bumpDaily(this.state);
      this.persist();
    },
    countdown() {
      const target = new Date('2027-03-01T00:00:00+08:00');
      const now = new Date();
      return Math.ceil((target - now) / 86400000);
    },
    stats(questions) {
      const total = questions.length;
      const mastered = questions.filter(q => this.masteryOf(q.id) === '掌握').length;
      const fuzzy = questions.filter(q => this.masteryOf(q.id) === '模糊').length;
      const unknown = total - mastered - fuzzy;
      const bySection = {};
      const byCategory = {};
      questions.forEach(q => {
        bySection[q.section] = bySection[q.section] || { total: 0, mastered: 0 };
        bySection[q.section].total++;
        if (this.masteryOf(q.id) === '掌握') bySection[q.section].mastered++;
        byCategory[q.category] = byCategory[q.category] || { total: 0, mastered: 0, section: q.section };
        byCategory[q.category].total++;
        if (this.masteryOf(q.id) === '掌握') byCategory[q.category].mastered++;
      });
      return { total, mastered, fuzzy, unknown, bySection, byCategory };
    },
  };

  // Hamburger for mobile
  const nav = document.querySelector('.nav');
  if (nav && !nav.querySelector('.nav-toggle')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', '菜单');
    btn.textContent = '☰';
    const tools = nav.querySelector('.tools');
    if (tools) nav.insertBefore(btn, tools);
    else nav.appendChild(btn);
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
      btn.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('.links a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.textContent = '☰';
    }));
  }

  document.querySelectorAll('.nav .links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    try {
      const url = new URL(href, location.href);
      if (url.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '')) a.classList.add('active');
    } catch (e) {}
  });
})();
