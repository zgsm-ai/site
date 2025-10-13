import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { debounce } from 'lodash-es'

interface UseScalePageOptions {
  target: Ref<HTMLElement | null>
  width?: number
  height?: number | 'auto'
}

/**
 * 页面自适应缩放的组合式函数 (完整版)
 * @param {object} options 配置选项
 * @param {Ref<HTMLElement | null>} options.target - 缩放目标元素的 Ref
 * @param {number} [options.width=1920] - 设计稿宽度
 * @param {number | 'auto'} [options.height='auto'] - 设计稿高度。'auto' 表示高度自适应内容。
 */
export function useScalePage(options: UseScalePageOptions) {
  const { target, width = 1920, height = 'auto' } = options

  const observer = ref<ResizeObserver | null>(null)

  const setScale = () => {
    if (!target.value) return

    const style = target.value.style
    const deviceWidth = document.documentElement.clientWidth
    const deviceHeight = document.documentElement.clientHeight

    // 固定高度模式
    if (typeof height === 'number') {
      const scaleX = deviceWidth / width
      const scaleY = deviceHeight / height
      const scale = Math.min(scaleX, scaleY)
      const scaledWidth = width * scale
      const scaledHeight = height * scale
      const offsetX = (deviceWidth - scaledWidth) / 2
      const offsetY = (deviceHeight - scaledHeight) / 2

      style.width = `${width}px`
      style.height = `${height}px`
      style.position = 'absolute'
      style.left = `${offsetX}px`
      style.top = `${offsetY}px`
      style.transform = `scale(${scale})`
      style.transformOrigin = '0 0'
    } else {
      // 高度自适应模式
      const scale = deviceWidth / width
      style.width = `${width}px`
      style.height = 'auto'
      style.position = 'relative'
      style.transform = `scale(${scale})`
      style.transformOrigin = '0 0'
    }
  }

  const updateBodyHeight = () => {
    if (target.value && height === 'auto') {
      const scale = document.documentElement.clientWidth / width
      const scaledHeight = target.value.offsetHeight * scale
      document.body.style.height = `${scaledHeight}px`
    }
  }

  const debouncedUpdate = debounce(() => {
    setScale()
    updateBodyHeight()
  }, 100)

  onMounted(() => {
    setScale()
    updateBodyHeight()

    window.addEventListener('resize', debouncedUpdate)

    if (target.value && height === 'auto') {
      observer.value = new ResizeObserver(() => {
        // 当尺寸变化时，仅更新body高度以获得最佳性能
        updateBodyHeight()
      })
      observer.value.observe(target.value)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', debouncedUpdate)
    document.body.style.height = 'auto'

    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return {
    update: () => {
      setScale()
      updateBodyHeight()
    },
  }
}
