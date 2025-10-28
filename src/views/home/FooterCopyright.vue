<template>
  <div class="footer-copyright w-full flex flex-col items-center mt-7.5 sm:mt-15 md:mt-22 lg:mt-30 xl:mt-37.5 pb-6">
    <div class="w-full flex flex-col items-center pt-11">
      <div class="flex items-center mb-3 text-[28px] text-white footer-title">
        {{ t('footer.openSource.title') }}
      </div>
      <div class="text-[#C2C7D1]">{{ t('footer.openSource.desc') }}</div>
      <div class="text-[14px] mt-3">
        <span class="text-[#A1A7B3]">{{ t('footer.contactUs') }}</span>
        <span class="mx-2 text-[#808999]">|</span>
        <span class="text-[#F4F8FF]">zgsm@sangfor.com.cn</span>
      </div>
    </div>
    <div class="contract flex items-center mt-7">
      <div class="flex flex-col items-center">
        <img class="w-25 h-25" src="../../assets/qrcode/official_account.png" alt="" />
        <span class="mt-3 text-white text-center">{{ t('footer.officialAccount') }}</span>
      </div>

      <div class="flex flex-col ml-10 xl:ml-20 items-center">
        <img class="w-25 h-25" src="../../assets/qrcode/communication_group.png" alt="" />
        <span class="mt-3 text-white text-center">{{ t('footer.joinGroup') }}</span>
      </div>
    </div>
    <div class="flex items-center text-[#a1a7b3] mt-3.75 sm:mt-7.5 md:mt-11 lg:mt-15 xl:mt-18.5 copyright-content">
      <!-- <span class="mx-3">{{ t('footer.copyright.company') }}</span>
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
      </template> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<style lang="less" scoped>
.footer-copyright {
  background: url('@/assets/footer_bg.png') no-repeat;
  background-size: 100% 100%;
}

.footer-title {
  font-size: 28px;
  line-height: 38px;
  text-align: center;
  letter-spacing: 0.05em;
  background: linear-gradient(98deg, #00FFB7 1%, #FFFFFF 68%, #C5DBFF 101%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 480px) {
    font-size: 20px;
  }
}

.copyright-content {
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
