<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import navbar from './components/NavBar.vue'
</script>

<template>
  <navbar />
  <n-message-provider>
    <router-view />
  </n-message-provider>
</template>
