<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Platform } from '../types'

defineOptions({
  name: 'PlatformTabs',
})

const props = defineProps<{
  activePlatform?: Platform
}>()

const currentPlatform = ref<Platform>(props.activePlatform || 'macos')

watch(
  () => props.activePlatform,
  (val) => {
    if (val) currentPlatform.value = val
  },
)

const emit = defineEmits<{
  (e: 'change', platform: Platform): void
}>()

const handleChange = (platform: Platform) => {
  currentPlatform.value = platform
  emit('change', platform)
}

const platforms: { key: Platform; label: string; icon: string }[] = [
  {
    key: 'macos',
    label: 'macOS',
    icon: 'macos',
  },
  {
    key: 'linux',
    label: 'Linux',
    icon: 'linux',
  },
  {
    key: 'windows',
    label: 'Windows',
    icon: 'windows',
  },
]
</script>

<template>
  <div class="platform-tabs">
    <button
      v-for="p in platforms"
      :key="p.key"
      class="platform-tab"
      :class="{ active: currentPlatform === p.key }"
      @click="handleChange(p.key)"
    >
      <!-- macOS icon -->
      <svg v-if="p.icon === 'macos'" class="platform-icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
        />
      </svg>
      <!-- Linux icon (terminal style) -->
      <svg
        v-else-if="p.icon === 'linux'"
        class="platform-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="2" y="3" width="20" height="18" rx="3" />
        <polyline points="7 9 10 12 7 15" />
        <line x1="13" y1="15" x2="17" y2="15" />
      </svg>
      <!-- Windows icon -->
      <svg v-else class="platform-icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm7 .25V20.1l10 1.9V13.4l-10-.15z"
        />
      </svg>
      <span class="platform-label">{{ p.label }}</span>
    </button>
  </div>
</template>

<style lang="less" scoped>
.platform-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0;
  width: 100%;
  background: #2d2d2d;
  border-radius: 12px 12px 0 0;
}

.platform-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  border: none;
  background: transparent;
  color: #888;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #bbb;
    background: rgba(255, 255, 255, 0.03);
  }

  &.active {
    color: #fff;
    border-bottom-color: #5b9cff;
  }

  @media (max-width: 640px) {
    padding: 10px 12px;
    font-size: 13px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    padding: 8px 6px;
    font-size: 12px;
    gap: 4px;
  }
}

.platform-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
  }
}

.platform-label {
  @media (max-width: 400px) {
    font-size: 11px;
  }
}
</style>
