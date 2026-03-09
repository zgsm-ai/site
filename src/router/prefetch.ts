/**
 * 路由预加载工具
 * 用于在用户可能访问之前预先加载关键路由组件
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrefetchCallback = () => Promise<any>

interface PrefetchOptions {
  /** 是否在空闲时预加载 */
  idle?: boolean
  /** 延迟时间（毫秒） */
  delay?: number
}

/**
 * 预加载路由组件
 * @param loader 动态导入函数
 * @param options 预加载选项
 */
export function prefetchRoute(loader: PrefetchCallback, options: PrefetchOptions = {}) {
  const { idle = true, delay = 0 } = options

  const load = () => {
    // 延迟加载
    if (delay > 0) {
      setTimeout(() => loader(), delay)
    } else {
      loader()
    }
  }

  // 在浏览器空闲时加载
  if (idle && 'requestIdleCallback' in window) {
    requestIdleCallback(() => load(), { timeout: 2000 })
  } else {
    load()
  }
}

/**
 * 批量预加载路由
 * @param loaders 动态导入函数数组
 * @param options 预加载选项
 */
export function prefetchRoutes(loaders: PrefetchCallback[], options: PrefetchOptions = {}) {
  const { delay = 0 } = options

  loaders.forEach((loader, index) => {
    // 为每个路由添加递增的延迟，避免同时加载多个路由
    prefetchRoute(loader, {
      ...options,
      delay: delay + index * 200,
    })
  })
}

/**
 * 创建带预取功能的路由加载器
 * @param importFn 动态导入函数
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createPrefetchableRoute(importFn: () => Promise<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let modulePromise: Promise<any> | null = null

  const load = () => {
    if (!modulePromise) {
      modulePromise = importFn()
    }
    return modulePromise
  }

  const prefetch = () => {
    return load()
  }

  return {
    // 实际的路由组件加载器
    load,
    // 预加载函数 - 返回 Promise
    prefetch,
  }
}
