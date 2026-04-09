import { ref, onMounted } from 'vue'
import type { Platform } from './types'

export function useDetectPlatform() {
  const detectedPlatform = ref<Platform>('macos')

  onMounted(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.includes('win')) {
      detectedPlatform.value = 'windows'
    } else if (ua.includes('linux')) {
      detectedPlatform.value = 'linux'
    } else {
      detectedPlatform.value = 'macos'
    }
  })

  return { detectedPlatform }
}
