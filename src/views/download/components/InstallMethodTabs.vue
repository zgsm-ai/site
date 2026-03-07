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
  <div class="install-method-tabs">
    <div class="tabs-header">
      <button
        class="tab-button"
        :class="{ active: activeMethod === 'curl' }"
        @click="handleMethodChange('curl')"
      >
        curl 安装
      </button>
      <button
        class="tab-button"
        :class="{ active: activeMethod === 'npm' }"
        @click="handleMethodChange('npm')"
      >
        npm 安装
      </button>
    </div>

    <!-- curl shell 选择 -->
    <div v-if="showCurlShellTabs" class="curl-shell-tabs">
      <button
        class="shell-button"
        :class="{ active: activeCurlShell === 'bash' }"
        @click="handleCurlShellChange('bash')"
      >
        Bash / Zsh
      </button>
      <button
        class="shell-button"
        :class="{ active: activeCurlShell === 'powershell' }"
        @click="handleCurlShellChange('powershell')"
      >
        PowerShell
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.install-method-tabs {
  margin-bottom: 24px;

  .tabs-header {
    display: inline-flex;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 4px;
    gap: 4px;
  }

  .tab-button {
    padding: 8px 20px;
    border: none;
    background: transparent;
    color: #a1a7b3;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.3s ease;

    &:hover {
      color: #f4f8ff;
    }

    &.active {
      background: rgba(64, 131, 232, 0.15);
      color: #4083e8;
    }
  }

  .curl-shell-tabs {
    display: inline-flex;
    margin-top: 12px;
    margin-left: 12px;
    gap: 8px;
  }

  .shell-button {
    padding: 6px 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    color: #a1a7b3;
    font-size: 13px;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(64, 131, 232, 0.3);
      color: #f4f8ff;
    }

    &.active {
      border-color: #4083e8;
      background: rgba(64, 131, 232, 0.1);
      color: #4083e8;
    }
  }
}
</style>
