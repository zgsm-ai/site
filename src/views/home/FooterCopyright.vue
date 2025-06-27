<template>
  <div class="footer-copyright w-full flex flex-col items-center mt-[150px]">
    <div class="w-full flex flex-col items-center pb-20 pt-[82px]">
      <div class="flex items-center mb-3 text-[28px] text-white">
        {{ t('footer.openSource.title') }}
      </div>
      <div class="text-[#C2C7D1]">{{ t('footer.openSource.desc') }}</div>
      <div class="text-[14px] mt-3">
        <span class="text-[#A1A7B3]">{{ t('footer.contactUs') }}</span>
        <span class="mx-2 text-[#808999]">|</span>
        <span class="text-[#F4F8FF]">zgsm@sangfor.com.cn</span>
      </div>
    </div>
    <div class="flex items-center text-[#a1a7b3] mb-5">
      <span class="mx-3">{{ t('footer.copyright.company') }}</span>
      <template v-if="locale === 'zh'">
        <div class="flex items-center mx-3">
          <img class="w-4 h-4" src="@/assets/copyright_btn.png" />
          <span>{{ t('footer.copyright.icp') }}</span>
        </div>
        <div class="flex items-center mx-3">
          <img class="w-4 h-4" src="@/assets/copyright_btn.png" />
          <span>{{ t('footer.copyright.gongan') }}</span>
        </div>
        <span class="mx-3">{{ t('footer.copyright.license') }}</span>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>
<style lang="less" scoped>
.footer-copyright {
  background: url('@/assets/footer_bg.svg') no-repeat top center #0c1c34;
}
</style>
