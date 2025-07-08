<template>
  <div class="w-full flex flex-col items-center mt-45">
    <div class="icon-lock w-[420px] h-[420px]"></div>
    <PageTitle :title="t('home.enterprise.title')" :subtitle="t('home.enterprise.subTitle')" />
    <div class="scroll-animation-wrapper wrapper icon-check mt-10" :class="`icon-check-${locale}`"
      ref="animatedElement">
      <span class="text-white wrapper-content" :class="`wrapper-content-${locale}`">{{
        t('home.enterprise.enterprisePrivateDeployment') }}</span>
    </div>
    <div class="flex gap-6 mt-[90px]">
      <ItemCard v-for="item in featureList" :key="item.content" :content="item.content" :renderTitle="item.renderTitle"
        width="417px" :height="cardHeight" padding="32px 16px 16px 32px" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'
import ItemCard from './ItemCard.vue'
import enterpriseFeature1 from '@/assets/enterprise_feature01.svg'
import enterpriseFeature2 from '@/assets/enterprise_feature02.svg'
import enterpriseFeature3 from '@/assets/enterprise_feature03.svg'
import { useAnimation } from '@/hooks/use_animation'

const { t, locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

const cardHeight = computed(() => (isZh.value ? '240px' : '340px'))

const featureList = computed(() => [
  {
    content: t('home.enterprise.feature01Content'),
    renderTitle: () => (
      h(
        'div',
        { class: 'deployent-icon' },
        [
          h(
            'span',
            {
              ...isZh.value ? {} : {
                style: {
                  maxWidth: '215px',
                }
              },
            },
            t('home.enterprise.feature01Title'),
          ),
          h(
            'img',
            { src: enterpriseFeature1 },
          )
        ]
      )
    )
  },
  {
    content: t('home.enterprise.feature02Content'),
    renderTitle: () => (
      h(
        'div',
        { class: 'deployent-icon' },
        [
          h(
            'span',
            {
              ...isZh.value ? {} : {
                style: {
                  maxWidth: '215px',
                }
              },
            },
            t('home.enterprise.feature02Title'),
          ),
          h(
            'img',
            { src: enterpriseFeature2 },
          )
        ]
      )
    )
  },
  {
    content: t('home.enterprise.feature03Content'),
    renderTitle: () => (
      h(
        'div',
        { class: 'deployent-icon' },
        [
          h(
            'span',
            t('home.enterprise.feature03Title'),
          ),
          h(
            'img',
            { src: enterpriseFeature3 },
          )
        ]
      )
    )
  },
])

const { animatedElement } = useAnimation(true, locale)
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

:deep(.deployent-icon) {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  img {
    margin-left: auto;
  }
}

:deep(.item-card) {
  justify-content: normal;

  &__content {
    max-width: 354px;
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
</style>
