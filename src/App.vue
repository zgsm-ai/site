<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import navbar from './components/NavBar.vue'
import { useScalePage } from './hooks/use_scale'
import { useNavbarScale } from './hooks/use_navbar_scale'
import { ref } from 'vue'

const appRef = ref<HTMLElement | null>(null)
const navbarRef = ref<InstanceType<typeof navbar> | null>(null)

useScalePage({
  target: appRef,
  height: 'auto',
})

// 使用导航栏缩放hook
useNavbarScale({
  navbarRef: navbarRef,
})
</script>

<template>
  <navbar ref="navbarRef" />
  <div ref="appRef" id="app-wrapper" class="bg-black">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </div>
</template>
