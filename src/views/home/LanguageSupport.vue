<template>
  <div class="w-full flex flex-col items-center mt-45">
    <PageTitle :title="t('home.ideSupport.title')" />
    <div class="flex gap-6 h-10 mt-20">
      <img class="h-[40px]" :src="item" :key="i" v-for="(item, i) in programLanguage" />
    </div>
    <div class="w-[520px] h-16 mt-20">
      <img :src="vscodeIcon" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'
// 导入静态资源
import pyIcon from '@/assets/py.svg'
import goIcon from '@/assets/go.svg'
import javaIcon from '@/assets/java.svg'
import jsIcon from '@/assets/js.svg'
import tsIcon from '@/assets/ts.svg'
import cIcon from '@/assets/c.svg'

const { t } = useI18n()
const programLanguage = computed(() => [
  pyIcon,
  goIcon,
  javaIcon,
  jsIcon,
  tsIcon,
  cIcon,
  t('home.ideSupport.moreLanguage'),
])
const vscodeIcon = computed(() => {
  return t('home.ideSupport.vscode')
})
</script>
<style lang="less" scoped></style>
