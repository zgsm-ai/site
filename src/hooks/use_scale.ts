import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue'
import { debounce } from 'lodash-es'

interface UseScalePageOptions {
  target: Ref<HTMLElement | null>
  width?: number
  height?: number | 'auto'
  fillScreen?: boolean
}

export function useScalePage(options: UseScalePageOptions) {
  const { target, width = 1920, height = 'auto', fillScreen = true } = options
  const observer = ref<ResizeObserver | null>(null)

  const setScale = () => {
    if (!target.value) return
    const el = target.value as HTMLElement
    const style = el.style
    const deviceWidth = window.innerWidth
    const deviceHeight = window.innerHeight

    const scaleX = deviceWidth / width
    const scaleY = typeof height === 'number' ? deviceHeight / height : scaleX
    const scale = fillScreen ? Math.min(scaleX, scaleY) : scaleX

    // 计算实际高度
    let realHeight = typeof height === 'number' ? height : 0
    if (height === 'auto') {
      // 临时重置样式以获取准确的 scrollHeight
      const originalTransform = style.transform
      const originalHeight = style.height
      const originalWidth = style.width
      
      // 临时移除缩放以获取真实内容高度
      style.transform = 'none'
      style.width = 'auto'
      style.height = 'auto'
      
      // 强制重排以获取准确的尺寸
      void el.offsetHeight
      
      // 获取真实内容高度
      const contentHeight = el.scrollHeight
      
      // 恢复缩放样式
      style.transform = originalTransform
      style.width = originalWidth
      style.height = originalHeight
      
      // 计算实际高度，确保不小于设备高度
      realHeight = Math.max(contentHeight, deviceHeight / scale)
    }

    // 应用缩放
    style.width = `${width}px`
    style.height = `${realHeight}px`
    style.position = 'absolute'
    style.left = '0'
    style.top = '0'
    style.transformOrigin = 'top left'
    style.transform = `scale(${scale})`

    // 更新 body
    const scaledHeight = Math.max(realHeight * scale, deviceHeight)
    document.body.style.height = `${scaledHeight}px`
    document.body.style.minHeight = `${deviceHeight}px`
    document.body.style.overflow = 'hidden' // ✅ 避免产生滚动条
  }

  const debouncedUpdate = debounce(() => {
    setScale()
    // ✅ 等布局稳定后再重新计算一次
    nextTick(() => {
      requestAnimationFrame(() => {
        setScale()
      })
    })
  }, 100)

  onMounted(() => {
    setScale()
    window.addEventListener('resize', debouncedUpdate)

    if (target.value) {
      observer.value = new ResizeObserver(() => setScale())
      observer.value.observe(target.value)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', debouncedUpdate)
    observer.value?.disconnect()
    document.body.style.height = 'auto'
    document.body.style.minHeight = 'auto'
    document.body.style.overflow = 'auto'
  })

  return { update: setScale }
}
