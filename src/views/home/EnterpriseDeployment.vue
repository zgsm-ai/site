<template>
  <div class="w-full flex flex-col items-center mt-45">
    <div class="icon-lock w-[420px] h-[420px]"></div>
    <PageTitle :title="t('home.enterprise.title')" :subtitle="t('home.enterprise.subTitle')" />
    <div class="icon-check mt-10" :class="`icon-check-${locale}`">
      <img :src="checkIcon" />
    </div>
    <div class="flex gap-6 mt-[90px]">
      <div v-for="(item, i) in featureList" :key="i" class="w-[417px] h-60">
        <img :src="item" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'

const { t, locale } = useI18n()
const featureList = computed(() => [
  t('home.enterprise.feature01'),
  t('home.enterprise.feature02'),
  t('home.enterprise.feature03'),
])
const checkIcon = computed(() => {
  return t('home.enterprise.check')
})
</script>
<style lang="less" scoped>
.icon-lock {
  background-image: url('@/assets/enterprise_lock.webp');
  background-size: contain;
}
.icon-check {
  width: 226px;
  height: 60px;
  &-en {
    width: 346px;
  }
}
</style>
