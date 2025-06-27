<template>
  <div class="w-full mt-45">
    <PageTitle :title="t('home.agent.title')" :subtitle="t('home.agent.subTitle')" />
    <div class="w-full h-[702px] rounded-[20px] mt-10 gradient-border">
      <img class="rounded-[20px]" :src="demo" />
    </div>
    <div class="flex gap-[22px] flex-wrap mt-6">
      <div v-for="(item, i) in featureList" :key="i">
        <div class="w-[418px] h-[420px]">
          <img :src="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AgentView',
})
</script>
<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'

const { t } = useI18n()
const featureList = computed(() => [
  t('home.agent.feature01'),
  t('home.agent.feature02'),
  t('home.agent.feature03'),
])
const demo = computed(() => t('home.agent.demo'))
</script>
<style lang="less" scoped>
.gradient-border {
  border: 1px solid #d8e7ff;
}
</style>
