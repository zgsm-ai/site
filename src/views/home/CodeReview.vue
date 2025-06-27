<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex flex-col items-center">
      <div>
        <img :src="t('home.codeReview.title')" />
      </div>
      <span class="mt-4 text-base font-normal leading-6 text-center text-white/70">{{
        t('home.codeReview.subTitle')
      }}</span>
    </div>
    <div class="w-full h-[702px] rounded-[20px] mt-10 gradient-border">
      <img class="rounded-[19px]" src="@/assets/codereview.gif" />
    </div>
    <div class="flex gap-6 flex-wrap mt-6">
      <div v-for="(item, i) in featureList" :key="i">
        <div class="w-[638px] h-[400px]">
          <img :src="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const featureList = computed(() => [
  t('home.codeReview.feature01'),
  t('home.codeReview.feature02'),
  t('home.codeReview.feature03'),
  t('home.codeReview.feature04'),
])
</script>

<style lang="less" scoped>
.gradient-border {
  border: 1px solid #d8e7ff;
}
</style>
