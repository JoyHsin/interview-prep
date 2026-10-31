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
      const days = Math.ceil((target - now) / 86400000);
      return days;
    },
    stats(questions) {
      const total = questions.length;
      const mastered = questions.filter(q => this.masteryOf(q.id) === '掌握').length;
      const fuzzy = questions.filter(q => this.masteryOf(q.id) === '模糊').length;
      const unknown = total - mastered - fuzzy;
      const bySection = {};
      questions.forEach(q => {
        bySection[q.section] = bySection[q.section] || { total: 0, mastered: 0 };
        bySection[q.section].total++;
        if (this.masteryOf(q.id) === '掌握') bySection[q.section].mastered++;
      });
      return { total, mastered, fuzzy, unknown, bySection };
    },
  };

  // nav active
  document.querySelectorAll('.nav .links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const path = location.pathname.replace(/\\/g, '/');
    if (path.endsWith(href.replace('./', '')) || (href === './index.html' && /\/(index\.html)?$/.test(path))) {
      a.classList.add('active');
    }
  });
})();
