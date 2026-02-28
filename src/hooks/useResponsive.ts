import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

export function useResponsive() {
  const { locale } = useI18n()
  const isMobile = ref(false)

  const isEn = computed(() => locale.value === 'en')
  const mobileBreakpoint = computed(() => (isEn.value ? 1280 : 968))

  const checkMobile = () => {
    isMobile.value = window.innerWidth < mobileBreakpoint.value
  }

  const handleResize = () => {
    checkMobile()
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    isMobile,
    isEn,
    mobileBreakpoint,
  }
}
