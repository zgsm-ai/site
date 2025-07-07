<template>
  <div class="mt-45">
    <PageTitle :title="t('home.completion.title')" :subtitle="t('home.completion.subTitle')" />
    <!-- gif 区域待补充 -->
    <div class="w-full  rounded-[20px] mt-10 gradient-border">
      <video class="rounded-[20px] w-full" src="../../assets/video/code_completion.mp4" preload="none" loop muted autoplay playsinline
        style="object-fit: cover;">
        Your browser does not support the video tag.
      </video>
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
