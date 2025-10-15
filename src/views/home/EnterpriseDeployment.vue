<template>
  <div class="w-full flex flex-col items-center mt-45">
    <div class="icon-lock w-[420px] h-[420px]"></div>
    <PageTitle :title="t('home.enterprise.title')" :subtitle="t('home.enterprise.subTitle')" />
    <div class="scroll-animation-wrapper wrapper icon-check mt-10" :class="`icon-check-${locale}`"
      ref="animatedElement">
      <span class="text-white wrapper-content cursor-pointer" :class="`wrapper-content-${locale}`"
        @click="toDeployment">{{
          t('home.enterprise.enterprisePrivateDeployment') }}</span>
    </div>
    <div class="flex gap-6 mt-[90px]">
      <div class="flex flex-col items-center card-item pt-12.5 rounded-[20px]"
        :class="isZh ? 'pb-13.5 px-6' : 'pb-8.5 px-4.5'" v-for="item in featureList" :key="item.title">
        <img :src="item.img" class="w-17.5 h-17.5" alt="">
        <span class="text-white mt-6 text-2xl" :class="isZh ? '' : 'text-center'">{{ item.title }}</span>
        <p class="text-white mt-6 text-base opacity-70 font-light" :class="isZh ? 'text-base' : 'text-sm text-center leading-5.5'">
          {{
            item.content }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'
import enterpriseFeature1 from '@/assets/enterprise_feature01.svg'
import enterpriseFeature2 from '@/assets/enterprise_feature02.svg'
import enterpriseFeature3 from '@/assets/enterprise_feature03.svg'
import enterpriseFeature4 from '@/assets/enterprise_feature04.svg'
import { useAnimation } from '@/hooks/use_animation'

const { t, locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

// const cardHeight = computed(() => (isZh.value ? '240px' : '340px'))

const featureList = computed(() => [
  {
    content: t('home.enterprise.feature01Content'),
    title: t('home.enterprise.feature01Title'),
    img: enterpriseFeature1,
  },
  {
    content: t('home.enterprise.feature02Content'),
    title: t('home.enterprise.feature02Title'),
    img: enterpriseFeature2,
  },
  {
    content: t('home.enterprise.feature03Content'),
    title: t('home.enterprise.feature03Title'),
    img: enterpriseFeature3,
  },
  {
    content: t('home.enterprise.feature04Content'),
    title: t('home.enterprise.feature04Title'),
    img: enterpriseFeature4,
  },
])

const { animatedElement } = useAnimation(true, locale)

const toDeployment = () => {
  window.open('https://docs.costrict.ai/deployment/introduction/')
}
</script>
<style lang="less" scoped>
.icon-lock {
  background-image: url('@/assets/enterprise_lock.png');
  background-size: contain;
}

.icon-check {
  width: 226px;
  height: 60px;

  &-en {
    width: 396px;
  }
}


.wrapper-content {
  font-size: 22px;
  line-height: 20px;
  letter-spacing: 2px;
}

.wrapper-content-en {
  letter-spacing: 0;
  white-space: nowrap;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: linear-gradient(90deg, #0066FF 10%, #008FD7 61%, #00D196 100%);
  box-sizing: border-box;
  border: 1px solid;
}

.card-item {
  background: rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}
</style>
