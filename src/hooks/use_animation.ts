/**
 * @file use_animation
 */
import { onMounted, onUnmounted, ref } from 'vue'

export const useAnimation = (needAnimation: boolean) => {
  const animatedElement = ref<HTMLElement | null>(null)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!animatedElement.value || !needAnimation) {
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    observer.observe(animatedElement.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    animatedElement,
  }
}
