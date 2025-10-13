import { onMounted, onUnmounted, type Ref, ref, nextTick } from 'vue'
import { debounce } from 'lodash-es'

interface UseNavbarScaleOptions {
  navbarRef: Ref<{ $el: HTMLElement } | null>
  designWidth?: number
}

/**
 * 导航栏自适应缩放的组合式函数
 * @param {object} options 配置选项
 * @param {Ref<{ $el: HTMLElement } | null>} options.navbarRef - 导航栏组件的 Ref
 * @param {number} [options.designWidth=1920] - 设计稿宽度
 */
export function useNavbarScale(options: UseNavbarScaleOptions) {
  const { navbarRef, designWidth = 1920 } = options
  const target = ref<HTMLElement | null>(null)

  const scaleNavbar = () => {
    if (!target.value) return

    const deviceWidth = document.documentElement.clientWidth
    const scale = deviceWidth / designWidth

    const navbarStyle = target.value.style
    navbarStyle.transform = `scale(${scale})`
    navbarStyle.transformOrigin = 'top left'
    navbarStyle.width = `${designWidth}px`
  }

  const debouncedScaleNavbar = debounce(scaleNavbar, 100)

  onMounted(() => {
    nextTick(() => {
      if (navbarRef.value?.$el) {
        target.value = navbarRef.value.$el as HTMLElement
        // 使用 setTimeout 确保 DOM 完全渲染后再执行缩放
        setTimeout(() => {
          scaleNavbar()
          window.addEventListener('resize', debouncedScaleNavbar)
        }, 0)
      }
    })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', debouncedScaleNavbar)
  })

  return {
    update: scaleNavbar,
  }
}
