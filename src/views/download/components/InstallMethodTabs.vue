<script setup lang="ts">
import { ref, watch, computed } from 'vue'

defineOptions({
  name: 'InstallMethodTabs',
})

export type InstallMethod = 'curl' | 'npm'
export type CurlShellType = 'bash' | 'powershell'

const props = defineProps<{
  activeMethod?: InstallMethod
  curlShell?: CurlShellType
}>()

const activeMethod = ref<InstallMethod>(props.activeMethod || 'curl')
const activeCurlShell = ref<CurlShellType>(props.curlShell || 'bash')

watch(
  () => props.activeMethod,
  (newMethod) => {
    if (newMethod) {
      activeMethod.value = newMethod
    }
  },
)

watch(
  () => props.curlShell,
  (newShell) => {
    if (newShell) {
      activeCurlShell.value = newShell
    }
  },
)

const emit = defineEmits<{
  (e: 'change', method: InstallMethod): void
  (e: 'curlShellChange', shell: CurlShellType): void
}>()

const handleMethodChange = (method: InstallMethod) => {
  activeMethod.value = method
  emit('change', method)
}

const handleCurlShellChange = (shell: CurlShellType) => {
  activeCurlShell.value = shell
  emit('curlShellChange', shell)
}

const showCurlShellTabs = computed(() => activeMethod.value === 'curl')
</script>

<template>
  <div class="code-block">
    <div class="code-header">
      <div class="window-controls">
        <span class="code-dot red"></span>
        <span class="code-dot yellow"></span>
        <span class="code-dot green"></span>
      </div>
      <div class="mode-switch">
        <button
          class="mode-btn"
          :class="{ active: activeMethod === 'curl' }"
          @click="handleMethodChange('curl')"
        >
          一键安装
        </button>
        <button
          class="mode-btn"
          :class="{ active: activeMethod === 'npm' }"
          @click="handleMethodChange('npm')"
        >
          npm安装
        </button>
      </div>
    </div>
    <div v-if="showCurlShellTabs" class="shell-bar">
      <div class="shell-switch">
        <button
          class="shell-btn"
          :class="{ active: activeCurlShell === 'bash' }"
          @click="handleCurlShellChange('bash')"
        >
          Bash / Zsh
        </button>
        <button
          class="shell-btn"
          :class="{ active: activeCurlShell === 'powershell' }"
          @click="handleCurlShellChange('powershell')"
        >
          PowerShell
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.code-block {
  background: #2d2d2d;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: none;
}

.code-header {
  background: #2d2d2d;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 640px) {
    padding: 6px 12px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px 8px;
    gap: 6px;
  }
}

.window-controls {
  display: flex;
  gap: 6px;
  margin-right: 8px;

  @media (max-width: 480px) {
    display: none;
  }
}

.code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;

  &.red {
    background: #ff5f57;
  }

  &.yellow {
    background: #febc2e;
  }

  &.green {
    background: #28c840;
  }
}

.mode-switch {
  display: inline-flex;
  gap: 2px;
  background: rgba(255, 255, 255, 0.05);
  padding: 3px;
  border-radius: 8px;
}

.mode-btn {
  padding: 4px 12px;
  border: none;
  background: transparent;
  color: #888;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #bbb;
  }

  &.active {
    background: rgba(64, 131, 232, 0.2);
    color: #5b9cff;
  }

  @media (max-width: 640px) {
    padding: 4px 10px;
    font-size: 11px;
  }

  @media (max-width: 480px) {
    padding: 3px 8px;
    font-size: 10px;
  }
}

.shell-bar {
  background: rgba(0, 0, 0, 0.15);
  padding: 4px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 640px) {
    padding: 4px 12px;
  }

  @media (max-width: 480px) {
    padding: 3px 8px;
  }
}

.shell-switch {
  display: inline-flex;
  gap: 4px;
}

.shell-btn {
  padding: 2px 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: #999;
  font-size: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    border-color: rgba(64, 131, 232, 0.4);
    color: #bbb;
  }

  &.active {
    border-color: #5b9cff;
    background: rgba(64, 131, 232, 0.15);
    color: #5b9cff;
  }

  @media (max-width: 480px) {
    padding: 2px 6px;
    font-size: 9px;
  }
}
</style>
