<template>
  <div class="w-full mt-45">
    <PageTitle :title="t('home.agent.title')" :subtitle="t('home.agent.subTitle')" />
    <div class="w-full h-[702px] rounded-[20px] mt-10 gradient-border">
      <img class="rounded-[20px]" :src="demo" />
    </div>
    <div class="flex gap-6 flex-wrap mt-6">
      <div v-for="(item, i) in featureList" :key="i">
        <div class="w-[638px] h-[400px] relative">
          <img :src="item.img" />
          <img v-if="item.needGuide" :src="t('home.agent.guide')" class="absolute top-8 right-4 cursor-pointer"
            @click="openWordPreview" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import EnGuidePdf from '@/assets/guide_en.pdf'
import ZhGuidePdf from '@/assets/guide_zh.pdf'

export default defineComponent({
  name: 'AgentView',
})
</script>
<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'

const { t, locale } = useI18n()

const featureList = computed(() => [
  {
    img: t('home.agent.feature01'),
  },
  {
    img: t('home.agent.feature02'),
  },
  {
    img: t('home.agent.feature03'),
    needGuide: true
  },
  {
    img: t('home.agent.feature04'),
  }
])
const demo = computed(() => t('home.agent.demo'))

const isZh = computed(() => locale.value === 'zh')

const openWordPreview = () => {
  const link = document.createElement('a')

  link.href = isZh.value ? ZhGuidePdf : EnGuidePdf
  link.target = '_blank'
  link.rel = 'noopener noreferrer'

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
}
</script>
<style lang="less" scoped>
.gradient-border {
  border: 1px solid #d8e7ff;
}
</style>
