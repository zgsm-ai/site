<template>
  <div class="navbar-logo cursor-pointer" @click="toHome">
    <img class="logo-img" src="@/assets/logo.webp" alt="CoStrict Logo" />
    <div class="app-name">{{ t('header.appName') }}</div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const toHome = () => {
  router.push({ name: 'home' })
}
</script>

<style lang="less" scoped>
.navbar-logo {
  display: flex;
  align-items: center;
  height: var(--space-16);

  .logo-img {
    width: 28px;
    margin-right: var(--space-3);
  }

  .app-name {
    color: var(--color-text-primary);
    font-size: var(--font-base);
  }
}
</style>
