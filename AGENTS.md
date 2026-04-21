# AI Coding 指南

> **重要**: 本指南是你执行该项目所有开发任务的核心依据，具备强制约束力，需全程严格遵守。

---

1. **各章节使用说明**

   - **项目概览**：你在开始任何开发任务前，必须先阅读本部分，帮你快速掌握项目基础信息、技术栈和架构边界；
   - **项目结构**：本部分核心是帮你建立项目全局认知和导航索引；
     - 承接需求时，你要通过目录树快速定位功能对应的文件位置、关联代码；
     - 新增代码文件时，需按规范放入对应目录；
   - **开发规范**：这是你编码全流程的核心遵循依据，命名、接口、日志/异常处理等所有编码行为，必须严格遵循条款要求；
   - **常用命令**：当你需要执行构建、测试、部署等操作时，必须优先使用本部分标注的高频命令；
   - **通用最佳实践**：这是你设计、编码、代码交付前自检的核心准则，交付前需逐条核验，确保代码符合相关原则。

2. **条款效力**：
   - 核心约束类条款（标注「必须/禁止」）需无条件严格执行，无用户显式豁免时，不得修改、规避或违反；
   - 指导性建议类条款（标注「应/建议」）需优先参考执行，可结合实际开发场景灵活调整。

---

## 项目概览

### 基本信息

- 项目名称：site
- 项目简介：CoStrict 官方网站，展示产品功能、定价、下载、博客等内容，支持中英双语国际化，核心模块为首页展示、下载引导、定价方案、资源计算器与博客系统。
- 项目规模：小（60+个代码文件）
- 开发语言：TypeScript + Vue 3
- 整体架构：单体前端 SPA
- 分支：feature/optimize-site
- commit: `3206e848e579e4d32966ae36b390057959c3e504`
- 生成时间： 2026-04-14 10:50:04

### 技术栈

**前端**：

- Vue 3.5 + TypeScript 5.8
- Vue Router 4.5（SPA 路由，History 模式）
- vue-i18n 11.2（中英国际化）
- Naive UI 2.41（组件库）
- Tailwind CSS 4.1（样式）
- @unhead/vue 2.1（SEO Head 管理）

**构建/部署**：

- Vite 7.3（构建工具）
- Node 20.19 + pnpm（包管理）
- Docker + Nginx（生产部署）
- vite-plugin-compression（Gzip/Brotli 压缩）

**工具链**：

- 代码质量：ESLint 9 + Prettier 3.5
- 类型检查：vue-tsc 2.2
- 测试框架：Vitest 4.0 + @vue/test-utils 2.4 + happy-dom
- CSS 预处理：Less 4.3

## 项目结构

```
site/
├─ src/                          # 核心源码目录：Vue3 SPA应用主体
│  ├─ views/                     # 页面视图层：各功能页面组件
│  │  ├─ home/                   # 首页模块：产品核心功能展示
│  │  │  ├─ index.vue            # 首页入口：整合Slogan/功能/特性展示
│  │  │  ├─ SloganSection.vue    # Slogan区域：主标题与CTA按钮
│  │  │  ├─ StrictMode.vue       # 严肃编程：核心功能展示组件
│  │  │  ├─ CodeReview.vue       # 代码审查：特性与优势展示
│  │  │  ├─ MoreTool.vue         # 更多工具：扩展功能展示
│  │  │  ├─ EnterpriseDeployment.vue  # 企业部署：私有化方案展示
│  │  │  ├─ LanguageSupport.vue  # 语言支持：多语言能力展示
│  │  │  └─ FooterCopyright.vue  # 页脚版权：底部信息展示
│  │  ├─ download/               # 下载模块：插件与CLI下载引导
│  │  │  ├─ index.vue            # 下载页入口：平台选择与安装引导
│  │  │  ├─ components/          # 下载页子组件
│  │  │  │  ├─ DownloadContent.vue  # 下载内容：安装命令与步骤
│  │  │  │  ├─ PlatformTabs.vue     # 平台标签：VSCode/JetBrains切换
│  │  │  │  ├─ InstallMethodTabs.vue # 安装方式：脚本/手动/IDE安装
│  │  │  │  └─ StepTimeline.vue     # 步骤时间线：安装流程引导
│  │  │  ├─ hooks/               # 下载页逻辑
│  │  │  │  ├─ useDownloadData.ts   # 下载数据：版本信息与下载链接
│  │  │  │  ├─ useDownloadActions.ts # 下载行为：跳转与复制逻辑
│  │  │  │  └─ useDetectPlatform.ts  # 平台检测：自动识别用户系统
│  │  │  ├─ types.ts             # 类型定义：平台/安装方式类型
│  │  │  └─ constants.ts         # 常量配置：下载链接与版本配置
│  │  ├─ pricing/                # 定价模块：产品定价方案展示
│  │  │  ├─ PricingPage.vue      # 定价页：版本对比与购买引导
│  │  │  ├─ const.ts             # 定价常量：各版本配置数据
│  │  │  └─ interface.ts         # 类型接口：定价数据结构定义
│  │  ├─ resourceCalculator/     # 资源计算器：部署资源估算
│  │  │  ├─ index.vue            # 计算器入口：参数设置与结果展示
│  │  │  ├─ components/          # 计算器子组件
│  │  │  │  ├─ ParameterSettings.vue # 参数设置：用户数/并发等配置
│  │  │  │  ├─ ResourceResult.vue    # 资源结果：GPU/显存需求展示
│  │  │  │  ├─ ModelTable.vue        # 模型对比表：不同配置对比
│  │  │  │  └─ AicpServices.vue      # AICP服务：增值服务展示
│  │  │  ├─ hooks/               # 计算器逻辑
│  │  │  │  └─ useResourceCalculator.ts # 计算逻辑：资源需求算法
│  │  │  ├─ types.ts             # 类型定义：表单与结果类型
│  │  │  └─ constants.ts         # 常量配置：模型参数与默认值
│  │  ├─ blog/                   # 博客模块：技术文章与案例
│  │  │  ├─ index.vue            # 博客列表：文章列表与分类筛选
│  │  │  ├─ BlogDetail.vue       # 博客详情：单篇文章展示
│  │  │  ├─ components/          # 博客子组件
│  │  │  │  ├─ BlogCard.vue      # 文章卡片：列表项展示
│  │  │  │  └─ BlogSidebar.vue   # 侧边栏：分类与标签筛选
│  │  │  ├─ blogData.ts          # 博客数据：文章元数据与内容
│  │  │  └─ useBlogData.ts       # 博客逻辑：数据获取与状态管理
│  │  └─ operation/              # 运营活动：专题活动页面
│  │     └─ OperationPage.vue    # 运营页：活动专题内容展示
│  ├─ components/                # 公共组件：全局复用组件
│  │  ├─ NavBar.vue              # 导航栏：顶部导航与菜单
│  │  ├─ navbar/                 # 导航栏子组件
│  │  │  ├─ NavbarMenu.vue       # 导航菜单：桌面端菜单项
│  │  │  ├─ NavbarLogo.vue       # Logo组件：品牌标识
│  │  │  ├─ MobileMenu.vue       # 移动端菜单：响应式折叠菜单
│  │  │  ├─ LanguageSwitcher.vue # 语言切换：中英切换按钮
│  │  │  └─ GithubStars.vue      # GitHub星标：开源项目展示
│  │  ├─ FeatureSection.vue      # 特性区块：通用功能展示容器
│  │  ├─ PageTitle.vue           # 页面标题：SEO标题组件
│  │  └─ StructuredData.vue      # 结构化数据：Schema.org标记
│  ├─ router/                    # 路由配置：SPA路由管理
│  │  ├─ index.ts                # 路由入口：路由定义与导航守卫
│  │  └─ prefetch.ts             # 路由预取：组件预加载优化
│  ├─ hooks/                     # 公共Hooks：全局可复用逻辑
│  │  ├─ useResponsive.ts        # 响应式：断点检测与适配
│  │  ├─ useRouterPrefetch.ts    # 路由预取：页面预加载逻辑
│  │  ├─ useLocalizedResources.ts # 本地化资源：多语言资源加载
│  │  ├─ useGithubStars.ts       # GitHub星标：API数据获取
│  │  └─ useMobileMenu.ts        # 移动端菜单：状态与控制
│  ├─ locales/                   # 国际化：多语言资源文件
│  │  ├─ zh.json                 # 中文翻译：页面文案与内容
│  │  ├─ en.json                 # 英文翻译：国际化文案
│  │  └─ index.ts                # 国际化入口：i18n配置与加载
│  ├─ utils/                     # 工具函数：通用工具方法
│  │  └─ language.ts             # 语言工具：语言检测与切换
│  ├─ assets/                    # 静态资源：图片/视频/字体
│  │  ├─ home/                   # 首页资源：背景图与装饰元素
│  │  ├─ download/               # 下载页资源：IDE图标与示意图
│  │  ├─ codeReview/             # 代码审查资源：功能截图
│  │  ├─ strictMode/             # 严肃编程资源：流程图
│  │  ├─ enterprise/             # 企业部署资源：架构图
│  │  ├─ price/                  # 定价页资源：背景与装饰
│  │  └─ video/                  # 视频资源：功能演示视频
│  ├─ styles/                    # 样式文件：全局/主题样式
│  ├─ App.vue                    # 应用根组件：全局布局与路由出口
│  ├─ main.ts                    # 应用入口：Vue实例创建与挂载
│  └─ index.css                  # 全局样式：Tailwind与自定义样式
├─ public/                       # 公共资源：静态文件直接复制
│  └─ robots.txt                 # 爬虫规则：SEO爬虫配置
├─ .github/                      # GitHub配置：CI/CD工作流
│  └─ workflows/                 # 工作流目录：自动化脚本
│     └─ build.yml               # 构建工作流：Docker构建与推送
├─ index.html                    # HTML入口：SPA挂载点
├─ package.json                  # 项目配置：依赖与脚本定义
├─ vite.config.ts               # Vite配置：构建工具配置
├─ tsconfig.json                # TS配置：TypeScript编译选项
├─ Dockerfile                   # Docker配置：容器化构建
├─ nginx.conf                   # Nginx配置：生产环境部署
└─ AGENTS.md                    # 项目文档：AI开发上下文
```

## 开发规范

### 代码存放规范

- Vue页面组件必须放在 `src/views/{模块}/`，入口文件使用 `index.vue` 或 `大驼峰Page.vue`
- 子组件必须放在 `src/views/{模块}/components/`，禁止与页面组件混放
- 公共组件必须放在 `src/components/`，按功能子目录组织
- Composable Hooks必须放在 `src/hooks/`，命名格式为 `use{功能}.ts`
- 视图级Hooks必须放在 `src/views/{模块}/hooks/`，禁止跨模块引用
- 类型定义文件统一使用 `types.ts` 或 `interface.ts`，常量使用 `const.ts` 或 `constants.ts`
- 工具函数统一放在 `src/utils/`，禁止在业务代码中直接写工具函数

### 命名规范

- Vue组件文件必须使用大驼峰命名（如 `NavBar.vue`、`PricingPage.vue`）
- TypeScript文件必须使用小驼峰命名（如 `useDownloadData.ts`、`blogData.ts`）
- Hook函数必须以 `use` 开头，使用小驼峰（如 `useResponsive`、`useGithubStars`）
- 组件名通过 `defineOptions({ name: 'XXX' })` 显式定义
- 类型/接口使用大驼峰（如 `TabType`、`PricingPlan`）
- 常量使用全大写下划线分隔（如 `CLI_COMMAND_INSTALL_NPM`）
- 枚举类型使用大驼峰，键使用小驼峰（如 `EffectType.excellent`）

### Vue组件规范

- 必须使用 `<script setup lang="ts">` 语法
- 必须通过 `defineOptions` 显式声明组件name
- Props使用 `defineProps` + TypeScript接口定义，必须使用 `withDefaults` 设置默认值
- Emits使用 `defineEmits` 定义事件类型
- 样式必须使用 `scoped`，预处理使用Less
- 响应式数据优先使用 `ref` 和 `computed`，复杂状态使用 `reactive`

### 国际化规范

- 必须使用 `vue-i18n` 的 `useI18n` Hook获取 `t` 函数
- 翻译键必须使用点号分隔的层级结构（如 `home.slogan.title`）
- 语言文件统一放在 `src/locales/`，中文 `zh.json`、英文 `en.json`
- 图片等资源路径需按语言区分目录（如 `assets/download/zh/` 和 `assets/download/en/`）

### 类型定义规范

- 所有数据类型必须通过TypeScript接口或类型别名定义
- 视图级类型定义在 `types.ts` 或 `interface.ts`
- 枚举类型使用 `const enum` 或 `as const` 对象，禁止魔法字符串
- 接口响应类型、Props类型、Emit类型必须显式定义

### 样式规范

- 必须使用Tailwind CSS工具类进行布局
- 自定义样式使用Less预处理，放在组件 `<style scoped lang="less">`
- CSS变量定义在 `src/styles/tokens.css`
- 响应式断点：`768px`、`1024px`、`1280px`、`1920px`

### 路由规范

- 路由配置放在 `src/router/index.ts`
- 组件必须使用动态导入 `() => import('@/views/xxx')` 实现懒加载
- 使用 `createPrefetchableRoute` 包装路由组件实现预加载
- 路由name必须与组件name保持一致

### 资源管理规范

- 图片资源必须使用WebP格式，放在 `src/assets/{模块}/`
- 图片导入必须使用 `@/assets/` 别名，禁止相对路径
- 视频资源放在 `src/assets/video/`
- 多语言图片按 `zh/`、`en/` 子目录组织

### 错误处理规范

- 本地存储操作必须包裹try-catch块
- 异步请求错误必须降级处理（如使用缓存数据）
- 错误日志使用 `console.error`，警告使用 `console.warn`

### 性能优化规范

- 路由组件必须使用懒加载
- 图片资源必须优化为WebP格式
- 使用 `vite-plugin-compression` 启用Gzip/Brotli压缩
- 启用路由预加载提升用户体验
- 按页面分包（page-home、page-download等）

### Git提交规范

- feat: 新功能（如 feat(blog): add sidebar）
- fix: 修复问题（如 fix: update download URL）
- refactor: 重构代码（如 refactor: remove Pinia）
- 提交信息必须包含模块前缀（如 blog、download、home）

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（端口9002）
pnpm build            # 构建生产版本（含类型检查）
pnpm build-only       # 仅构建，不进行类型检查

# 代码质量
pnpm type-check       # TypeScript类型检查
pnpm lint             # ESLint代码检查并修复
pnpm format           # Prettier代码格式化

# 预览
pnpm preview          # 预览生产构建

# 依赖管理
pnpm install          # 安装依赖

# Docker构建
docker build -t costrict-site .    # 构建Docker镜像
docker run -p 80:80 costrict-site  # 运行容器
```

## 通用最佳实践

- 编码与设计严格遵循以下核心原则：
  - **KISS原则**：代码逻辑简洁，无冗余实现；
  - **DRY原则**：同类逻辑复用，不重复编写；
  - **单一职责原则**：类/函数仅承担一项核心功能；
  - **单一数据源原则**：同一业务数据仅从可信源获取，保证一致性；
  - **最小改动原则**：仅修改满足需求的必要代码，不做无关联重构；
- 优先复用/借鉴项目现有工具类、业务逻辑及同类实现机制，不重复造轮子；
- 禁止过度设计：仅实现需求明确的功能，不添加无业务依据的扩展代码；
- 代码交付前完成全量自检：确保无语法、路径、依赖错误，且符合本清单所有约束。
