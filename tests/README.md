# Testing Guide

## 测试框架配置

本项目计划使用 **Vitest** 作为测试框架，搭配 **Vue Test Utils** 进行 Vue 组件测试。

## 安装测试依赖

```bash
pnpm add -D vitest @vue/test-utils happy-dom jsdom
```

## 配置说明

### 1. Vitest 配置文件

已创建 `vitest.config.ts`：

```typescript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    deps: {
      inline: ['naive-ui'],
    },
  },
})
```

### 2. package.json 脚本

已添加测试脚本：

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run tests/unit",
    "test:e2e": "vitest run tests/e2e"
  }
}
```

## 测试目录结构

```
tests/
├── unit/
│   ├── components/     # 组件单元测试
│   ├── hooks/          # Composables 测试
│   └── utils/          # 工具函数测试
├── e2e/                # 端到端测试
└── setup.ts            # 测试全局配置
```

## 编写测试示例

### 组件测试

```typescript
// tests/unit/components/FeatureSection.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FeatureSection from '@/components/FeatureSection.vue'

describe('FeatureSection', () => {
  it('renders correctly with props', () => {
    const wrapper = mount(FeatureSection, {
      props: {
        zhTitle: '/path/to/zh/title.webp',
        enTitle: '/path/to/en/title.webp',
        altText: 'feature',
        subTitle: 'Subtitle text',
        video: '/path/to/video.mp4',
        poster: '/path/to/poster.webp',
        featureList: [],
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
```

### Composable 测试

```typescript
// tests/unit/hooks/useGithubStars.spec.ts
import { describe, it, expect } from 'vitest'
import { useGithubStars } from '@/hooks/useGithubStars'

describe('useGithubStars', () => {
  it('should return initial values', () => {
    const { githubStars, formattedStarCount } = useGithubStars()

    expect(githubStars.value).toBe(0)
    expect(formattedStarCount.value).toBe('0')
  })
})
```

## 运行测试

```bash
# 运行所有测试
pnpm test

# 运行单元测试
pnpm test:unit

# 运行端到端测试
pnpm test:e2e

# 监听模式（开发时使用）
pnpm test -- --watch
```

## 最佳实践

1. **测试命名**：使用描述性的测试名称，说明测试的行为
2. **独立性**：每个测试应该独立运行，不依赖其他测试
3. **覆盖率**：目标代码覆盖率达到 80% 以上
4. **Mock**：适当使用 mock 避免外部依赖

## 待办事项

- [ ] 安装 Vitest 依赖
- [ ] 配置 CI/CD 集成测试
- [ ] 编写核心组件测试用例
- [ ] 设置代码覆盖率报告
