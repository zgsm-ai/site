<template>
  <div class="w-full flex flex-col items-center mt-45">
    <PageTitle :title="t('home.ideSupport.title')" />
    <div class="flex gap-6 h-10 mt-20">
      <div :src="item" :key="item.type" v-for="item in programLanguage" class="flex items-center lang-container">
        <img v-if="item.icon" :src="item.icon" class="w-6 h-6 mr-2" />
        <span class="text-white leading-6 text-base whitespace-nowrap">{{ item.type }}</span>
      </div>
    </div>
    <div class="w-[520px] h-16 mt-20 vscode-container flex items-center justify-center">
      <img :src="vscodeIcon" />
      <span class="text-white ml-3 text-base">{{ t('home.ideSupport.SupportedInVSCode') }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'
// 导入静态资源
import pyIcon from '@/assets/py.webp'
import goIcon from '@/assets/go.webp'
import javaIcon from '@/assets/java.webp'
import jsIcon from '@/assets/js.webp'
import tsIcon from '@/assets/ts.webp'
import cIcon from '@/assets/c.webp'
import vscodeIcon from '@/assets/vscode.webp'

const { t } = useI18n()
const programLanguage = computed(() => [
  {
    type: 'Python',
    icon: pyIcon,
  },
  {
    type: 'Go',
    icon: goIcon,
  },
  {
    type: 'Java',
    icon: javaIcon,
  },
  {
    type: 'JavaScript',
    icon: jsIcon,
  },
  {
    type: 'TypeScript',
    icon: tsIcon,
  },
  {
    type: 'C/C++',
    icon: cIcon,
  },
  {
    type: `... ${t('home.ideSupport.allLanguages')}`
  }
])

</script>
<style lang="less" scoped>
.lang-container {
  height: 40px;
  padding: 8px 32px;
  background: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-image: linear-gradient(96deg, rgba(0, 102, 254, 0) 0%, #FFFFFF 50%, rgba(0, 102, 254, 0) 90%) 1 0 1 0;
}

.vscode-container {
  background: radial-gradient(50% 50% at 50% 50%, #00297C 25%, rgba(22, 39, 74, 0) 100%);
  box-sizing: border-box;
  border-width: 2px 0px 2px 0px;
  border-style: solid;
  border-image: linear-gradient(93deg, rgba(0, 102, 254, 0) 0%, #FFFFFF 50%, rgba(0, 102, 254, 0) 90%) 2 0 2 0;
  height: 64px;
}
</style>
