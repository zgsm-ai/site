<template>
  <div class="w-full relative z-50">
    <div class="slogan-container flex w-full h-108 justify-center">
      <div class="w-full flex flex-col items-center">
        <div :class="[
          'oss-btn',
          `oss-btn-${locale}`,
          'mt-68',
          'flex',
          'items-center',
          'justify-center',
          'text-2xl',
          'text-white',
          'h-10',
          'w-36',
          ossButtonWidth,
        ]">
          {{ t('home.slogan.ossButton') }}
        </div>
        <div class="flex items-center mt-8">
          <div :class="['text-5xl', 'text-white', isEn ? '' : 'slogan-title']">
            {{ t('home.slogan.title') }}
          </div>
          <i18n-t keypath="home.slogan.zhugeCode" tag="span" class="text-gray-400 text-2xl ml-[12px]">
            <template #iTag>
              <span class="italic text-xs mx-1 ">{{ t('home.slogan.original') }}</span>
            </template>
          </i18n-t>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center pb-[150px]">
      <div :class="['text-white', isEn ? '' : 'slogan-subTitle', subTitleFontSize]">
        {{ t('home.slogan.subTitle') }}
      </div>
      <div class="button-group flex gap-4 mt-7.5 text-2xl text-white">
        <div :class="[
          'enterprise-button',
          `enterprise-button-${locale}`,
          'flex',
          'items-center',
          'justify-center',
          'cursor-pointer',
          'w-50',
          'h-12'
        ]" @click="toDeployment">
          {{ t('home.slogan.enterpriseButton') }}
        </div>
        <div :class="[
          'personal-button',
          `personal-button-${locale}`,
          'flex',
          'items-center',
          'justify-center',
          'cursor-pointer',
          'w-50',
          'h-12'
        ]" @click="toDownload">
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
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()

const router = useRouter()

const isEn = computed(() => locale.value === 'en')

const ossButtonWidth = computed(() => {
  return isEn.value ? 'w-[280px]' : 'w-[143px]'
})

const subTitleFontSize = computed(() => {
  return isEn.value ? 'text-5xl' : 'text-6xl'
})

const toDownload = () => {
  // window.open('https://docs.costrict.ai/guide/installation')
  router.push('/download')
}

const toDeployment = () => {
  window.open('https://docs.costrict.ai/introduction')
}
</script>

<style lang="less" scoped>
.oss-btn {
  box-sizing: border-box;
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
  }
}

.enterprise-button {
  background-image: url('@/assets/blue_button.svg');

  &-en {
    width: 378px;
    background-image: url('@/assets/blue_button_en.svg');
  }

  &:hover {
    opacity: 0.7;
  }
}

.personal-button {
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 6px;

  &-en {
    width: 281px;
    // background-image: url('@/assets/grey_button_en.svg');
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
