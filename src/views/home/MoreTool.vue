<template>
  <div class="mt-45">
    <PageTitle :title="t('home.moreTool.title')" :subtitle="t('home.moreTool.subTitle')" />
    <div class="flex gap-6 flex-wrap mt-10">
      <div v-for="(item, i) in featureList" :key="i">
        <div class="w-[638px] h-[420px]">
          <img :src="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'
const { t } = useI18n()
const featureList = computed(() => [
  t('home.moreTool.feature01'),
  t('home.moreTool.feature02'),
  t('home.moreTool.feature03'),
  t('home.moreTool.feature04'),
])
</script>
