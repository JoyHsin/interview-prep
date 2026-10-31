# 面试备考站

个人静态站点：题库 / 刷题 / 进度 / 求职指南 / pdai 知识地图外链。

## 本地预览

```bash
# 在项目根目录运行
python3 -m http.server 8765
# 浏览器打开 http://127.0.0.1:8765/
```

部署到 GitHub Pages 子路径（如 `https://joyhsin.github.io/interview-prep/`）时保持相对路径即可，无需改代码。

## 进度

保存在浏览器 `localStorage`（键 `joyce-interview-prep-v1`）。首页/进度页可导出、导入 JSON，方便换电脑。

## 版权说明

- 题目要点为原创精炼表述；部分题目参考 pdai.tech / java-ai-engineer-roadmap 的知识覆盖面，并附外链。
- **不收录** pdai.tech 文章正文。

## 资源包整合

本轮处理 Java 后端面试的高优先级专题资料，共 43 份 PDF（含重复资料），对比结论见 `data/resource-audit.json`；大型场景资料的 54 节处理记录见 `data/scenario-review.json`。对比按考点进行，重复问法合并；未采用的旧版结论和专项扩展记录在各文件的 `decision` 中。

题库由 270 道扩充到 371 道，新增 101 道题均包含原理、示例、追问、参考答法及易错点。新增题来源为“资源包整理”，可在题库筛选；详解位于 `data/details/pack-high.json`。另补全原有 fail-fast 与 MyBatis 缓存题的详解，并修订集合题的边界说明。示意代码和流程用于口述理解，非完整可运行工程。

范围：本轮完成场景题、网络、MyBatis、Spring/Boot/Cloud/Dubbo 面试专题，以及 JVM、并发、MySQL、Redis、MQ 的高频专题和配套笔记对照。算法、企业面经、XMind 路线、项目实战、通用大部头教材和专项部署教程仍为后续参考资料，不宣称本轮已逐页整合整个下载目录。原 PDF 正文未加入仓库。

校验命令：

```bash
python3 scripts/validate_content.py
# 重新盘点同一资源包；会保留已写的对比结论
python3 scripts/audit_resources.py '/资源包绝对路径'
```

浏览器验收覆盖 101 道新增题的标题及五个详解区块；交互验收包含来源/分类/关键词筛选、详解跳转、掌握状态与笔记刷新保存、刷题揭晓与跳转、知识地图。交互验收先备份浏览器学习数据，测试后恢复；笔记和掌握状态已验证刷新后保留。
