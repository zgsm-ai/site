<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { PlatformConfig } from '../types'

defineOptions({
  name: 'PlatformInstallPanel',
})

defineProps<{
  config: PlatformConfig
}>()

const emit = defineEmits<{
  (e: 'copy', command: string): void
}>()

const { t } = useI18n()
</script>

<template>
  <div class="platform-panel">
    <div v-for="(cmd, index) in config.commands" :key="index" class="command-block">
      <div class="command-label">
        <span class="label-badge" :class="{ recommended: index === 0 }">
          {{ index === 0 ? t('download.installMethodRecommended') : t('download.installMethodAlternative') }}
        </span>
        <span class="label-method">{{ cmd.label }}</span>
      </div>
      <div class="command-line">
        <span class="command-prompt">{{ cmd.prompt }}</span>
        <span class="command-text">{{ cmd.command }}</span>
        <button class="command-copy" @click="emit('copy', cmd.command)" :aria-label="t('download.copyCommand')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="platform-note">
      <svg
        class="note-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>{{ t(config.noteKey) }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.platform-panel {
  background: #1e1e1e;
  padding: 20px;

  @media (max-width: 640px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
}

.command-block {
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 16px;
  }
}

.command-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.label-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.recommended {
    background: rgba(91, 156, 255, 0.15);
    color: #5b9cff;
  }
}

.label-method {
  font-size: 12px;
  color: #6a9955;
  font-weight: 500;
}

.command-line {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 12px 14px;
  font-family: 'SF Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  min-height: 24px;

  @media (max-width: 640px) {
    padding: 10px 12px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 11px;
  }
}

.command-prompt {
  color: #569cd6;
  flex-shrink: 0;
  font-weight: 500;
}

.command-text {
  color: #d4d4d4;
  flex: 1;
  white-space: nowrap;
  overflow-x: auto;
  line-height: 1.6;
}

.command-copy {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover {
    color: #fff;
    background: rgba(64, 131, 232, 0.2);
    border-color: rgba(64, 131, 232, 0.4);
  }

  svg {
    width: 14px;
    height: 14px;
  }
}

.platform-note {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  border-left: 3px solid rgba(91, 156, 255, 0.4);
  font-size: 12px;
  color: #888;
  line-height: 1.5;

  .note-icon {
    flex-shrink: 0;
    margin-top: 1px;
    color: #5b9cff;
  }
}
</style>
