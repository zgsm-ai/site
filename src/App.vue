<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import navbar from './components/NavBar.vue'
</script>

<template>
  <n-message-provider>
    <navbar />
    <router-view class="mt-[68px]" />
  </n-message-provider>
</template>

<style scoped></style>
