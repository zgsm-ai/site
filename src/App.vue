<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import navbar from './components/NavBar.vue'
import { useScalePage } from './hooks/use_scale';
import { ref } from 'vue';

const appRef = ref(null);

useScalePage({
  target: appRef,
  height: 'auto',
  width: 1905
});
</script>

<template>
  <div ref="appRef" id="app-wrapper">
    <n-message-provider>
      <navbar />
      <router-view/>
    </n-message-provider>
  </div>
</template>

<style scoped></style>
