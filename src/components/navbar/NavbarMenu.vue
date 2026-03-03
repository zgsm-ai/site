<template>
  <div class="navbar-menu">
    <div
      v-for="item in menuOptions"
      :key="item.key"
      class="menu-item"
      :class="{ 'menu-active': isActive(item.key) }"
      @click="handleClick(item.key)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

interface MenuOption {
  label: string
  key: string
}

const { t, locale } = useI18n()
const router = useRouter()

const isEn = computed(() => locale.value === 'en')
const currentRouteName = computed(() => router.currentRoute.value.name)

const menuOptions = computed<MenuOption[]>(() => [
  { label: t('menu.home'), key: 'home' },
  { label: t('menu.download'), key: 'download' },
  ...(isEn.value ? [] : [{ label: t('menu.pricing'), key: 'pricing' }]),
  { label: t('menu.installGuide'), key: 'install' },
  { label: t('menu.docs'), key: 'docs' },
  { label: t('menu.operation'), key: 'operation' },
])

const isActive = (key: string) => currentRouteName.value === key

const handleClick = (key: string) => {
  if (key === 'oss') {
    window.open('https://github.com/zgsm-ai/costrict')
    return
  } else if (key === 'docs') {
    const url = `https://docs.costrict.ai${isEn.value ? '/en' : ''}`
    window.open(url)
    return
  } else if (key === 'install') {
    const url = `https://docs.costrict.ai${isEn.value ? '/en' : ''}/deployment/introduction/`
    window.open(url)
    return
  }
  router.push({ name: key })
}
</script>

<style lang="less" scoped>
.navbar-menu {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--radius-xl);
  background: var(--color-bg-secondary);
  backdrop-filter: var(--blur-lg);
  height: var(--space-12);

  .menu-item {
    padding: 0 var(--space-5);
    color: var(--color-text-link);
    cursor: pointer;
    text-align: center;
    white-space: nowrap;

    &:hover {
      color: var(--color-text-primary);
    }

    &.menu-active {
      color: var(--color-text-primary);
    }
  }
}
</style>
