<template>
  <div class="mt-45">
    <PageTitle :title="t('home.completion.title')" :subtitle="t('home.completion.subTitle')" />
    <!-- gif 区域待补充 -->
    <div class="w-full h-[701px] rounded-[20px] mt-10 gradient-border">
      <img class="rounded-[20px]" src="@/assets/completion.gif" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'

const { t } = useI18n()
</script>
<style lang="less" scoped>
.gradient-border {
  border: 1px solid #d8e7ff;
}
</style>
