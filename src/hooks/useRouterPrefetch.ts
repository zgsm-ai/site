import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

/**
 * 路由鼠标悬停预加载 Hook
 * 当用户鼠标悬停在导航链接上时，预加载对应的路由组件
 */
export function useRouterPrefetch() {
  const router = useRouter()
  const prefetchedRoutes = new Set<string>()
  let hoverTimer: number | null = null

  const handleMouseEnter = (event: MouseEvent) => {
    const target = event.target
    
    // 检查 target 是否是 HTMLElement
    if (!(target instanceof HTMLElement)) return
    
    const link = target.closest('a[href]') as HTMLAnchorElement

    if (!link) return

    const href = link.getAttribute('href')
    if (!href || href.startsWith('http') || href === '#') return

    // 清除之前的定时器
    if (hoverTimer) {
      clearTimeout(hoverTimer)
    }

    // 延迟 50ms 后预加载，避免快速滑过时的无效预加载
    hoverTimer = window.setTimeout(() => {
      prefetchRoute(href)
    }, 50)
  }

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer)
      hoverTimer = null
    }
  }

  const prefetchRoute = (path: string) => {
    // 已经预加载过的路由不再重复加载
    if (prefetchedRoutes.has(path)) return

    const route = router.resolve(path)
    if (!route || !route.matched.length) return

    // 获取路由组件
    const component = route.matched[0]?.components?.default
    if (!component || typeof component !== 'function') return

    // 标记为已预加载
    prefetchedRoutes.add(path)

    // 执行预加载
    try {
      ;(component as () => Promise<unknown>)()
    } catch (error) {
      // 预加载失败不影响正常使用
      console.warn(`Failed to prefetch route: ${path}`, error)
    }
  }

  onMounted(() => {
    // 监听整个文档的鼠标移动事件（使用 mouseover 以支持事件冒泡）
    document.addEventListener('mouseover', handleMouseEnter, true)
    document.addEventListener('mouseout', handleMouseLeave, true)
  })

  onUnmounted(() => {
    document.removeEventListener('mouseover', handleMouseEnter, true)
    document.removeEventListener('mouseout', handleMouseLeave, true)

    if (hoverTimer) {
      clearTimeout(hoverTimer)
    }
  })

  return {
    prefetchRoute,
  }
}
