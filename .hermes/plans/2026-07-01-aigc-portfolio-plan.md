# 个人 AIGC 作品集网站 - 实施计划

> **给 Hermes 看：** 使用 design-taste-frontend + claude-design 技能按任务逐步实施。
> 君君哥哥先审阅计划，确认后开工。

**目标：** 建一个面向老板浏览的 AIGC 作品集网站，Vibe Coding 风格，AI 辅助快速迭代。

**架构：** 单页滚动式 (SPA)，Next.js + Tailwind v4 + Motion (动画) + GSAP (滚动叙事)。

**技术栈：** React/Next.js, Tailwind v4, motion/react, GSAP ScrollTrigger, Phosphor Icons

---

## 设计决策（Design Read）

**Reading this as:** AIGC 创作者作品集 for 老板/客户浏览, Vibe Coding 风格 (AI 驱动 × 大胆视觉 × 氛围优先), leaning toward 暗色科技美学 + 滚动叙事 + 粒子/3D 背景.

**三旋钮设定：**
- DESIGN_VARIANCE: 9 - 不对称、打破网格、有冲击力
- MOTION_INTENSITY: 8 - 滚动驱动动画、页面入场、悬停物理
- VISUAL_DENSITY: 3 - 大量留白，作品说话

**色彩体系：**
- 底色：深黑 `#0a0a0f`
- 表面：`#14141f`
- 强调色：霓虹青 `#00f0ff` 或电紫 `#7c3aed`（待确认）
- 文字：`#e0e0e0` + `#888`
- 渐变点缀：暗色网格 + 粒子光点

**字体：** Geist (标题) + Geist Mono (代码/标签)

---

## 页面结构（6 个板块）

```
┌─────────────────────────────┐
│  ① HERO                    │ 大标题 + 3D/粒子背景 + CTA
│  "AI 创作，重新定义可能"      │
├─────────────────────────────┤
│  ② 关于我                   │ 简短介绍 + 数字高亮(项目数/AI工具数)
├─────────────────────────────┤
│  ③ 作品展示 (核心)           │ Bento Grid 展示 AIGC 作品
│  图片/视频/AI生成作品卡片      │ hover 展开 + 标签过滤
├─────────────────────────────┤
│  ④ 创作流程                  │ 水平滚动时间线 (Vibe Coding 工作流)
│  想法 → Prompt → 迭代 → 成品  │
├─────────────────────────────┤
│  ⑤ 技术栈                   │ 工具标签云 + 能力图谱
├─────────────────────────────┤
│  ⑥ 联系我                   │ Footer + 社交媒体链接
└─────────────────────────────┘
```

---

## 任务分解（共 15 个任务，每任务 2-5 分钟）

### Phase 1: 项目脚手架

**Task 1: 初始化 Next.js 项目**
- 文件：`E:\personal-website`
- 命令：`npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`
- 验证：`npm run dev` 起 localhost:3000

**Task 2: 安装依赖 & 配置 Tailwind v4**
- 安装：`motion`, `@phosphor-icons/react`, `gsap`
- 配置 `tailwind.config.ts`：dark mode class, 自定义颜色 tokens
- 验证：引入一个 motion 组件不报错

**Task 3: 全局布局 & 深色主题**
- 文件：`src/app/layout.tsx`, `src/app/globals.css`
- 注入：Geist 字体，全局深色背景，CSS 变量 token 系统
- 验证：页面纯黑底色 + 白色文字

### Phase 2: 核心板块

**Task 4: Hero 板块**
- 文件：`src/components/sections/Hero.tsx`
- 内容：大标题 (motion 入场动画) + 副标题 + CTA 按钮
- 背景：Canvas 粒子效果 (`src/components/effects/ParticleBackground.tsx`)
- MOTION: 文字逐字淡入，粒子背景常驻

**Task 5: 关于我板块**
- 文件：`src/components/sections/About.tsx`
- 内容：简短介绍 + 数字指标 (项目数、AI 工具精通数、经验年数)
- 样式：数字大号 mono 字体，滚动触发计数动画

**Task 6: 作品展示板块 (Bento Grid)**
- 文件：`src/components/sections/Works.tsx`
- 文件：`src/components/ui/WorkCard.tsx`
- 布局：Bento Grid 不对称排列 (2fr 1fr + 1fr 1fr 等)
- 交互：hover 时卡片放大 + 详情浮层
- 数据：`src/data/works.ts` — 作品数组 (先用 mock 数据)

**Task 7: 作品过滤 & 分类**
- 文件：`src/components/ui/FilterBar.tsx`
- 功能：标签按钮组 (图像生成 | 视频生成 | 音乐生成 | 3D | 全部)
- 动画：filter 切换时 staggered 淡入

### Phase 3: 高级交互

**Task 8: 创作流程 - 水平滚动面板**
- 文件：`src/components/sections/Process.tsx`
- 实现：GSAP ScrollTrigger 水平滚动 (参考 Section 5.B 骨架)
- 内容：4 个步骤卡片 — 想法 → Prompt → AI迭代 → 成品
- 验证：滚动时水平平移，pin 在视口

**Task 9: 技术栈标签云**
- 文件：`src/components/sections/TechStack.tsx`
- 实现：浮动标签球 / 3D 标签云 (CSS 3D transform 或 Three.js)
- 交互：鼠标悬停标签放大 + 发光

**Task 10: Footer & 联系**
- 文件：`src/components/sections/Footer.tsx`
- 内容：社交媒体链接 (GitHub, 微信, Email) + CTA "一起做点酷的"
- 样式：暗色 footer + 渐变分隔线

### Phase 4: 润色 & 发布

**Task 11: 全局导航**
- 文件：`src/components/layout/Navbar.tsx`
- 功能：固定顶部，滚动时背景渐显 (backdrop-blur)
- 包含：Logo + 锚点链接 + 主题切换 (可选)

**Task 12: 响应式适配**
- 文件：所有 section 组件
- 逐板块检查 md/lg/xl 断点，确保移动端单列渲染
- Hero：移动端字号缩小，粒子效果降级
- Bento Grid：移动端堆叠为单列

**Task 13: 性能优化**
- 图片：`next/image` + priority 标记
- 粒子背景：移动端降级或关闭
- 动画：`prefers-reduced-motion` 全面覆盖
- Lighthouse 检查 LCP < 2.5s

**Task 14: 暗色模式 & 无障碍**
- 对比度检查：所有文字 WCAG AA (4.5:1)
- 焦点环：可见的键盘 focus 样式
- 语义 HTML：正确的 heading 层级、alt 文本

**Task 15: 构建 & 部署准备**
- 命令：`npm run build`
- 输出：`out/` 静态导出 (可选) 或 Vercel 部署配置
- 文件：`vercel.json` 或 `next.config.ts` 静态导出配置

---

## 参考工具 & 灵感来源

**Vibe Coding 工具链 (适合快速生成 AIGC 作品素材):**
- **ComfyUI** — 本地图像/视频生成 (已有 skill)
- **Remotion** — React 编程式视频创作 (已有 skill)
- **Suno AI / HeartMuLa** — AI 音乐生成
- **Runway / Pika** — AI 视频生成
- **Midjourney / DALL-E** — 图像生成

**设计参考 (Vibe Coding 风格特征):**
- 大胆的暗色系 + 霓虹强调色
- 非传统布局 (Bento / 瀑布流 / 不对称网格)
- 滚动驱动叙事 (GSAP ScrollTrigger)
- 粒子/3D 背景元素
- 微交互密集 (hover 物理、光标跟随)
- 不追求"像素完美"，追求"氛围对"

**抖音 Vibe Coding 视频参考方向:**
- 搜索关键词：`vibe coding 网站`、`AI 编程作品集`、`cursor 开发作品集`、`AI 写前端`
- 典型内容：录屏展示 AI 对话式写代码 → 网站一步步成型的过程
- 建议：用户可自行在抖音搜索上述关键词获取视觉灵感，我们负责技术实现

---

## 下一步

计划完成后：
1. 君君哥哥确认设计方向（强调色、作品数据结构）
2. 按 Phase 1-4 顺序逐步实施
3. 每个 Phase 完成做一次整体检查
4. 最后部署上线

**需要确认的问题：**
- 强调色选哪个？霓虹青 `#00f0ff` 还是电紫 `#7c3aed`？
- 作品数据：你有现成的 AIGC 作品列表吗（标题 + 图片 + 描述 + 类别）？还是先 mock？
- 部署方式：Vercel 还是静态导出放 GitHub Pages？
