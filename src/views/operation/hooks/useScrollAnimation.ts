import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * 管理多个卡片元素的滚动淡入动效
 * 当元素进入视口时，为其添加 `is-visible` class 触发 CSS 动画
 */
export const useScrollAnimation = (count: number): Ref<HTMLElement | null>[] => {
  const refs = Array.from({ length: count }, () => ref<HTMLElement | null>(null))

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    refs.forEach((r) => {
      if (r.value) {
        observer!.observe(r.value)
        // 立即检查元素是否已在视口内（某些场景下 IntersectionObserver 初始回调可能不触发）
        const rect = r.value.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          r.value.classList.add('is-visible')
          observer!.unobserve(r.value)
        }
      }
    })
  })

  onUnmounted(() => observer?.disconnect())

  return refs
}
