(function (global) {
  const KEY = 'joyce-interview-prep-v1';
  const defaultState = () => ({
    version: 1,
    mastery: {}, // id -> 未学|模糊|掌握
    notes: {},
    milestones: {},
    projectTexts: {},
    daily: {}, // YYYY-MM-DD -> count
    streak: { last: null, days: 0 },
    settings: { showPoints: true, theme: 'system' },
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const s = Object.assign(defaultState(), JSON.parse(raw));
      s.mastery = s.mastery || {};
      s.notes = s.notes || {};
      s.milestones = s.milestones || {};
      s.projectTexts = s.projectTexts || {};
      s.daily = s.daily || {};
      s.settings = Object.assign(defaultState().settings, s.settings || {});
      return s;
    } catch (e) {
      return defaultState();
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function today() {
    const d = new Date();
    const z = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate());
  }

  function bumpDaily(state) {
    const t = today();
    state.daily[t] = (state.daily[t] || 0) + 1;
    if (state.streak.last === t) {
      // same day
    } else {
      const y = new Date(); y.setDate(y.getDate() - 1);
      const ys = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0');
      if (state.streak.last === ys) state.streak.days += 1;
      else state.streak.days = 1;
      state.streak.last = t;
    }
  }

  function exportJSON(state) {
    return JSON.stringify({ exportedAt: new Date().toISOString(), state }, null, 2);
  }

  function importJSON(text) {
    const obj = JSON.parse(text);
    const state = obj.state || obj;
    if (!state || typeof state !== 'object') throw new Error('无效的进度文件');
    const merged = Object.assign(defaultState(), state);
    save(merged);
    return merged;
  }

  // Hook for future cloud sync (e.g. GitHub Gist). Token must stay in localStorage only.
  const cloud = {
    async push() { throw new Error('云同步尚未启用：可在设置里自行扩展 Gist 同步'); },
    async pull() { throw new Error('云同步尚未启用'); },
  };

  global.Store = { KEY, load, save, today, bumpDaily, exportJSON, importJSON, defaultState, cloud };
})(window);
