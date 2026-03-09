<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import navbar from './components/NavBar.vue'
import { useRouterPrefetch } from '@/hooks/useRouterPrefetch'

// 启用路由悬停预加载
useRouterPrefetch()
</script>

<template>
  <navbar />
  <n-message-provider>
    <main>
      <router-view />
    </main>
  </n-message-provider>
</template>
