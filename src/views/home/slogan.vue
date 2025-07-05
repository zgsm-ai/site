<template>
  <div class="w-full bg-black">
    <div class="slogan-container flex w-full h-[431px] justify-center">
      <div class="w-full flex flex-col items-center">
        <div :class="[
          'oss-btn',
          `oss-btn-${locale}`,
          'mt-[199px]',
          'flex',
          'items-center',
          'justify-center',
          'text-[24px]',
          'text-white',
          ossButtonWidth,
        ]">
          {{ t('home.slogan.ossButton') }}
        </div>
        <div class="mt-[36px] text-[48px] text-white slogan-title">
          {{ t('home.slogan.title') }}
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center mt-[-80px] pb-[150px]">
      <div :class="['text-white', 'slogan-subTitle', subTitleFontSize]">
        {{ t('home.slogan.subTitle') }}
      </div>
      <div class="button-group flex gap-4 mt-[30px] text-[24px] text-white">
        <div :class="[
          'enterprise-button',
          `enterprise-button-${locale}`,
          'flex',
          'items-center',
          'justify-center',
        ]">
          {{ t('home.slogan.enterpriseButton') }}
        </div>
        <div :class="[
          'personal-button',
          `personal-button-${locale}`,
          'flex',
          'items-center',
          'justify-center',
        ]">
          {{ t('home.slogan.personalButton') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'sloganView',
})
</script>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t, locale } = useI18n()

const ossButtonWidth = computed(() => {
  return locale.value === 'en' ? 'w-[280px]' : 'w-[143px]'
})

const subTitleFontSize = computed(() => {
  return locale.value === 'en' ? 'text-[48px]' : 'text-[56px]'
})
</script>

<style lang="less" scoped>
.slogan-container {
  background-image: url('@/assets/slogan_bg.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.oss-btn {
  width: 143px;
  height: 40px;
  box-sizing: border-box;
  font-size: 24px;
  text-align: center;
  letter-spacing: normal;
  background: linear-gradient(99deg, #00FFB7 2%, #FFFFFF 68%, #C5DBFF 101%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border-image: linear-gradient(93deg, rgba(0, 102, 254, 0) 0%, #FFFFFF 50%, rgba(0, 102, 254, 0) 90%) 2 0 2 0;
  border-width: 2px 0px 2px 0px;
  border-style: solid;

  &-en {
    width: 280px;
    height: 40px;
    background-image: url('@/assets/oss_button_en.svg');
  }
}

.enterprise-button {
  width: 200px;
  height: 48px;
  background-image: url('@/assets/blue_button.svg');
  font-size: 22px;

  &-en {
    width: 378px;
    background-image: url('@/assets/blue_button_en.svg');
  }

  &:hover {
    opacity: 0.7;
  }
}

.personal-button {
  width: 200px;
  height: 48px;
  background-image: url('@/assets/grey_button.svg');
  font-size: 22px;


  &-en {
    width: 281px;
    background-image: url('@/assets/grey_button_en.svg');
  }

  &:hover {
    opacity: 0.7;
  }
}

.slogan-title {
  letter-spacing: 0.02em;
}

.slogan-subTitle {
  letter-spacing: 0.05em;
}
</style>
