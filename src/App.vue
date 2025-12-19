<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import navbar from './components/NavBar.vue'
</script>

<template>
  <navbar />
  <n-message-provider>
    <main>
      <router-view />
    </main>
  </n-message-provider>
</template>
