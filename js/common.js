(function () {
  function applyTheme(mode) {
    const isDark = mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
    updateThemeBtn(mode, isDark);
  }
  const state = Store.load();
  
  function updateThemeBtn(mode, isDark) {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;
    const effectiveDark = isDark != null ? isDark : document.documentElement.classList.contains('dark');
    const sunIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    btn.innerHTML = `${effectiveDark ? sunIcon : moonIcon}<span>${mode === 'system' ? '跟随' : (effectiveDark ? '浅色' : '深色')}</span>`;
  }

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
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.2s ease';
        setTimeout(() => el.remove(), 200);
      }, 2200);
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

  const queryTheme = new URLSearchParams(location.search).get('theme');
  applyTheme(queryTheme || state.settings.theme || 'system');

  // Enhance brand logo
  const brand = document.querySelector('.nav .brand');
  if (brand && !brand.querySelector('.brand-badge')) {
    const badge = document.createElement('span');
    badge.className = 'brand-badge';
    badge.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
    brand.insertBefore(badge, brand.firstChild);
  }

  // Group guide links into a dropdown if there are many links
  const linksBox = document.querySelector('.nav .links');
  if (linksBox) {
    const guideLinks = Array.from(linksBox.querySelectorAll('a')).filter(a => {
      const h = a.getAttribute('href') || '';
      return h.includes('/guide/') || h.includes('guide/');
    });
    if (guideLinks.length >= 3) {
      const dropdown = document.createElement('div');
      dropdown.className = 'nav-dropdown';
      const dropBtn = document.createElement('button');
      dropBtn.type = 'button';
      dropBtn.className = 'nav-dropdown-btn';
      dropBtn.innerHTML = '备考指南 <span style="font-size:10px;opacity:0.7">▼</span>';
      
      const dropMenu = document.createElement('div');
      dropMenu.className = 'nav-dropdown-menu';

      let isGuideActive = false;
      guideLinks.forEach(a => {
        if (a.classList.contains('active')) isGuideActive = true;
        dropMenu.appendChild(a);
      });
      if (isGuideActive) dropdown.classList.add('active');

      dropdown.appendChild(dropBtn);
      dropdown.appendChild(dropMenu);
      linksBox.appendChild(dropdown);

      dropBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', () => dropdown.classList.remove('open'));
    }
  }

  // Hamburger for mobile
  const nav = document.querySelector('.nav');
  if (nav && !nav.querySelector('.nav-toggle')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', '切换菜单');
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

    // Close nav on click outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.textContent = '☰';
      }
    });
  }

  // Active link highlight
  document.querySelectorAll('.nav .links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    try {
      const url = new URL(href, location.href);
      if (url.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '')) {
        a.classList.add('active');
        const parentDropdown = a.closest('.nav-dropdown');
        if (parentDropdown) parentDropdown.classList.add('active');
      }
    } catch (e) {}
  });

  // Setup theme button toggle listener (capture phase to override & prevent duplicate inline handlers)
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn && !window.__themeBtnBound) {
    window.__themeBtnBound = true;
    themeBtn.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      const cur = AppCommon.state.settings.theme || 'system';
      const next = cur === 'light' ? 'dark' : cur === 'dark' ? 'system' : 'light';
      AppCommon.setTheme(next);
      AppCommon.toast('主题：' + ({ light: '浅色', dark: '深色', system: '跟随系统' })[next]);
    }, true);
  }

  // Floating Back to Top Button
  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', '返回顶部');
  backToTop.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`;
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
