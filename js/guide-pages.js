(function () {
  const g = window.GUIDE || {};
  const qs = window.QUESTIONS || [];
  const path = location.pathname;

  // 1. Timeline Page
  if (path.endsWith('timeline.html')) {
    const weeklyHtml = g.weekly ? `
      <div class="guide-banner">
        <h3 style="margin-top:0;font-size:16px;display:flex;align-items:center;gap:8px">
          <span>⏰ 每周备战节奏规划</span>
        </h3>
        <div class="weekly-grid">
          <div class="weekly-slot">
            <div class="day">💼 工作日 (60–90 min)</div>
            <div class="desc">${(g.weekly.weekday || '').replace('工作日 60–90 分钟：', '')}</div>
          </div>
          <div class="weekly-slot">
            <div class="day">⚡ 周六 (3–4 小时)</div>
            <div class="desc">${(g.weekly.sat || '').replace('周六 3–4h：', '')}</div>
          </div>
          <div class="weekly-slot">
            <div class="day">🎯 周日 (3–4 小时)</div>
            <div class="desc">${(g.weekly.sun || '').replace('周日 3–4h：', '')}</div>
          </div>
        </div>
      </div>
    ` : '';

    const priorityHtml = (g.prioritySplit || []).length ? `
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px">
          <h3 style="margin:0;font-size:16px">📊 精力分配策略建议</h3>
          <span class="tiny muted">基于广州招聘市场与技术深挖权重</span>
        </div>
        <div class="priority-split-list">
          ${g.prioritySplit.map(p => `
            <div class="priority-row">
              <span class="priority-name">${p.name}</span>
              <div class="priority-bar-wrap">
                <div class="progress-bar"><i style="width:${p.pct}"></i></div>
              </div>
              <span class="priority-pct">${p.pct}</span>
              <span class="priority-note">${p.note}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const timelineHtml = `
      <div class="timeline-track">
        ${(g.timeline || []).map((t, idx) => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="card timeline-card">
              <div class="timeline-header">
                <span class="timeline-month">${t.month} · Phase 0${idx + 1}</span>
                <span style="font-weight:700;font-size:16px;color:var(--text)">${t.title}</span>
              </div>
              <ul class="timeline-list">
                ${(t.items || []).map(i => `<li>${i}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    const el = document.getElementById('tl');
    if (el) el.innerHTML = weeklyHtml + priorityHtml + timelineHtml;
  }

  // 2. Projects STAR Page
  if (path.endsWith('projects.html')) {
    const box = document.getElementById('projects');
    if (box) {
      box.innerHTML = (g.projects || []).map(p => {
        const saved = AppCommon.state.projectTexts[p.id] || {};
        const sVal = saved.situation != null ? saved.situation : p.situation;
        const tVal = saved.task != null ? saved.task : p.task;
        const aVal = saved.action != null ? saved.action : p.action;
        const rVal = saved.result != null ? saved.result : p.result;

        return `
          <div class="star-card" id="proj-${p.id}">
            <div class="star-top">
              <div class="star-title-group">
                <span class="badge" style="background:linear-gradient(135deg,var(--accent),#6366f1);color:#fff;font-weight:700">STAR</span>
                <h3>${p.title}</h3>
              </div>
              <div>
                <button type="button" class="btn copy-star-btn" data-pid="${p.id}">📋 复制完整故事</button>
              </div>
            </div>

            <div class="star-grid">
              <div class="star-box">
                <div class="star-box-header">
                  <span class="star-pill s">S · 业务背景与痛点</span>
                  <span class="tiny muted">可编辑保存</span>
                </div>
                <textarea data-pid="${p.id}" data-k="situation" placeholder="描述业务诉求、原痛点或高成本挑战…">${sVal}</textarea>
              </div>

              <div class="star-box">
                <div class="star-box-header">
                  <span class="star-pill t">T · 核心攻坚目标</span>
                  <span class="tiny muted">可编辑保存</span>
                </div>
                <textarea data-pid="${p.id}" data-k="task" placeholder="描述你负责攻坚的技术目标、指标与系统边界…">${tVal}</textarea>
              </div>

              <div class="star-box">
                <div class="star-box-header">
                  <span class="star-pill a">A · 架构设计与技术行动</span>
                  <span class="tiny muted">可编辑保存</span>
                </div>
                <textarea data-pid="${p.id}" data-k="action" placeholder="描述选型决策、调用链路、租户隔离、排障与防幻觉实操…">${aVal}</textarea>
              </div>

              <div class="star-box">
                <div class="star-box-header">
                  <span class="star-pill r">R · 量化收益与业务成果</span>
                  <span class="tiny muted">可编辑保存</span>
                </div>
                <textarea data-pid="${p.id}" data-k="result" placeholder="描述上线成果、日均调用、P95延迟、降本增效指标…">${rVal}</textarea>
              </div>
            </div>

            <div class="star-followup-box">
              <div class="title">
                <span>🔥 面试点高频追问与防守要点：</span>
              </div>
              <div class="followup-tags">
                ${(p.followups || []).map(f => `<span class="followup-item">💭 ${f}</span>`).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Auto-save handler
      box.querySelectorAll('textarea').forEach(ta => {
        const saveVal = () => {
          const id = ta.dataset.pid;
          AppCommon.state.projectTexts[id] = AppCommon.state.projectTexts[id] || {};
          AppCommon.state.projectTexts[id][ta.dataset.k] = ta.value;
          AppCommon.persist();
        };
        ta.addEventListener('change', () => {
          saveVal();
          AppCommon.toast('已保存修改');
        });
        ta.addEventListener('blur', saveVal);
      });

      // Copy complete story handler
      box.querySelectorAll('.copy-star-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const pid = btn.dataset.pid;
          const pObj = (g.projects || []).find(x => x.id === pid) || {};
          const saved = AppCommon.state.projectTexts[pid] || {};
          const s = saved.situation != null ? saved.situation : pObj.situation;
          const t = saved.task != null ? saved.task : pObj.task;
          const a = saved.action != null ? saved.action : pObj.action;
          const r = saved.result != null ? saved.result : pObj.result;

          const fullStory = `【${pObj.title}】\n\n` +
            `【S - 业务背景与痛点】\n${s}\n\n` +
            `【T - 核心任务目标】\n${t}\n\n` +
            `【A - 架构设计与关键行动】\n${a}\n\n` +
            `【R - 量化结果与收益】\n${r}\n\n` +
            `【面试常考追问防守】\n` + (pObj.followups || []).map((f, i) => `${i + 1}. ${f}`).join('\n');

          navigator.clipboard.writeText(fullStory).then(() => {
            AppCommon.toast('已复制完整 STAR 故事');
          }).catch(() => {
            AppCommon.toast('复制失败，请手动选取');
          });
        });
      });
    }
  }

  // 3. System Design Page
  if (path.endsWith('system-design.html')) {
    const sds = qs.filter(q => q.category === '系统设计');
    const container = document.getElementById('sd');
    if (container) {
      container.innerHTML = `
        <div class="card" style="margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <span style="font-weight:700;font-size:15.5px;color:var(--text)">架构口述框架与核心设计题</span>
            <p class="tiny muted" style="margin:4px 0 0">共收录 ${sds.length} 道高频系统设计题，涵盖秒杀高并发、AI 知识库、分布式存储与网关</p>
          </div>
          <a href="../questions.html?c=系统设计" class="btn">在题库中专项练习 →</a>
        </div>
        <div class="sd-list">
          ${sds.map((q, idx) => `
            <div class="card sd-card">
              <div class="sd-header">
                <div style="display:flex;align-items:flex-start;gap:10px">
                  <span class="badge" style="background:var(--accent-soft);color:var(--accent);font-family:var(--mono);font-weight:700">0${idx + 1}</span>
                  <h3>${q.question}</h3>
                </div>
                <span class="tag" style="flex-shrink:0">📐 系统设计</span>
              </div>
              <ul class="sd-points">
                ${(q.keyPoints || []).map(t => `<li>${t}</li>`).join('')}
              </ul>
              <div class="sd-footer">
                <span class="tiny muted">考点来源: ${q.source || '高频场景'}</span>
                <a href="../q.html?id=${q.id}" class="btn primary" style="font-size:12.5px;padding:6px 14px">查看完整题解与图解 →</a>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  // 4. Study Path Page
  if (path.endsWith('study-path.html')) {
    const pathBox = document.getElementById('path');
    if (pathBox) {
      pathBox.innerHTML = `
        <div class="roadmap-container">
          ${(g.studyPath || []).map((r, idx) => `
            <div class="roadmap-step">
              <div class="roadmap-badge">0${idx + 1}</div>
              <div class="roadmap-body">
                <div class="time">${r.when} · 第 ${idx + 1} 阶段</div>
                <div class="repo">${r.repo}</div>
                <div class="focus"><strong>核心攻坚：</strong>${r.focus}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    const d = g.demoProject || {};
    const demoBox = document.getElementById('demo');
    if (demoBox) {
      demoBox.outerHTML = `
        <div class="demo-spotlight" id="demo">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:12px">
            <div>
              <span class="tag" style="background:var(--accent);color:#fff;font-weight:700">必做补洞工程</span>
              <h3 style="margin:8px 0 4px;font-size:18px">${d.name}</h3>
            </div>
            <a href="${d.url}" target="_blank" rel="noopener" class="btn primary">访问 GitHub 仓库 ↗</a>
          </div>
          <p style="font-size:14px;color:var(--text2);line-height:1.6;margin-bottom:14px">${d.note || ''}</p>
          <div style="background:var(--bg-elev);border:1px solid var(--border);border-radius:10px;padding:12px 16px;font-size:13px;color:var(--text2);line-height:1.6">
            💡 <strong>动手改造建议：</strong>建议 Fork 并在本地运行起来，升级到 Spring AI 1.x 最新版本，使用 PGvector 实现向量存储，增加自定义 <code style="color:var(--accent);font-family:var(--mono)">@Tool</code> 函数调用与 SSE 实时打字机流式响应，作为面试可当场演示的实战加分项目！
          </div>
        </div>
      `;
    }
  }

  // 5. Resume Page
  if (path.endsWith('resume.html')) {
    const r = g.resumeTips || {};
    const container = document.getElementById('resume');
    if (container) {
      container.innerHTML = `
        <div class="edu-highlight">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="font-size:18px">🎓</span>
            <h3 style="margin:0;font-size:16px;color:var(--text)">大专 / 非科班学历沟通策略短答</h3>
          </div>
          <p style="font-size:14.5px;color:var(--text);line-height:1.7;margin:0">
            ${r.education || ''}
          </p>
        </div>

        <div class="card" style="margin-bottom:20px">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
            <div>
              <h3 style="margin:0;font-size:16px">🏷️ BOSS 直聘打招呼 & 简历检索关键词</h3>
              <span class="tiny muted">HR 与算法检索核心词汇，点击单个标签可复制</span>
            </div>
            <button type="button" class="btn" id="copyAllKwBtn">📋 一键复制全部关键词</button>
          </div>
          <div class="kw-cloud" id="kwCloud">
            ${(r.keywords || []).map(x => `<button type="button" class="kw-pill" data-kw="${x}">+ ${x}</button>`).join('')}
          </div>
        </div>

        <div class="grid cols-2">
          <div class="card do-card">
            <h3 style="margin-top:0;display:flex;align-items:center;gap:6px">
              <span>✅ 简历中强烈推荐写</span>
            </h3>
            <ul>
              ${(r.do || []).map(x => `<li><strong>${x}</strong></li>`).join('')}
            </ul>
          </div>
          <div class="card dont-card">
            <h3 style="margin-top:0;display:flex;align-items:center;gap:6px">
              <span>❌ 简历中绝对不要写</span>
            </h3>
            <ul>
              ${(r.dont || []).map(x => `<li><strong>${x}</strong></li>`).join('')}
            </ul>
          </div>
        </div>
      `;

      // Keyword click handler
      container.querySelectorAll('.kw-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          navigator.clipboard.writeText(btn.dataset.kw).then(() => {
            AppCommon.toast('已复制关键词：' + btn.dataset.kw);
          });
        });
      });

      document.getElementById('copyAllKwBtn')?.addEventListener('click', () => {
        const all = (r.keywords || []).join(' / ');
        navigator.clipboard.writeText(all).then(() => {
          AppCommon.toast('已复制全部关键词到剪贴板');
        });
      });
    }
  }

  // 6. Job Market Page
  if (path.endsWith('job-market.html')) {
    const j = g.jobMarket || {};
    const container = document.getElementById('job');
    if (container) {
      const parsedExamples = (j.examples || []).map(ex => {
        const match = ex.match(/^(\S+)\s+(.+?)\s+([0-9\-]+K[·0-9\u85aa]*|[0-9\-]+K)\s*（(.+?)）(.*)$/);
        if (match) {
          return {
            company: match[1],
            role: match[2],
            salary: match[3],
            location: match[4],
            extra: match[5] ? match[5].replace(/^[（(]|[)）]$/g, '').trim() : ''
          };
        }
        return { company: ex, role: '后端开发', salary: '', location: '广州', extra: '' };
      });

      container.innerHTML = `
        <div class="guide-banner" style="margin-bottom:20px">
          <span class="badge" style="background:var(--accent);color:#fff;font-weight:700">求职战略定位</span>
          <h3 style="margin:10px 0 6px;font-size:18px">${j.target || ''}</h3>
          <p style="font-size:13.5px;color:var(--text2);margin:0;line-height:1.6">
            建议准备两套简历与针对性表达：一套以夯实的传统 Java、高并发、微服务架构为主；另一套以大模型应用工程化落地（Dify / DeerFlow / RAG / Spring AI）为特色亮点。
          </p>
        </div>

        <div class="card" style="margin-bottom:20px">
          <h3 style="margin-top:0;font-size:16px;display:flex;align-items:center;gap:6px">
            <span>📊 广州市场求职行情观察（大专 + 5-10 年经验）</span>
          </h3>
          <p style="font-size:14.5px;color:var(--text);line-height:1.65;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:14px 16px;margin:10px 0 0">
            ${j.summary || ''}
          </p>
        </div>

        <div class="card">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:14px">
            <div>
              <h3 style="margin:0;font-size:16px">💼 典型岗位样本参考</h3>
              <span class="tiny muted">当时市场所见典型 JD，用于对照技能缺口与薪酬定位</span>
            </div>
            <span class="tag">更新时间：2026-10</span>
          </div>
          <div class="job-list">
            ${parsedExamples.map(job => `
              <div class="job-card">
                <div style="flex:1">
                  <div class="job-company">${job.company}</div>
                  <div class="job-role">${job.role} ${job.extra ? `<span class="badge" style="background:var(--accent-soft);color:var(--accent);margin-left:6px">${job.extra}</span>` : ''}</div>
                </div>
                <div style="display:flex;align-items:center;gap:10px">
                  <span class="tag" style="color:var(--text2)">📍 ${job.location}</span>
                  ${job.salary ? `<span class="job-salary">${job.salary}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }
})();
