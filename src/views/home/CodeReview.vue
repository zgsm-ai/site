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
      <ItemCard v-for="item in featureList" :key="item.title" :img="item.img" :title="item.title"
        :content="item.content" :renderTitle="item.renderTitle" :height="cardHeight" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'
import ItemCard from './ItemCard.vue'

const { t, locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

const cardHeight = computed(() => (isZh.value ? '400px' : '440px'))

const featureList = computed(() => [
  {
    title: t('home.codeReview.feature01Title'),
    content: t('home.codeReview.feature01Content'),
    img: t('home.codeReview.feature01'),
  },
  {
    content: t('home.codeReview.feature02Content'),
    img: t('home.codeReview.feature02'),
    renderTitle: () => (
      h('span',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
          }
        },
        [
          h(
            'span',
            t('home.codeReview.feature02Title'),
          ),
          h(
            'div',
            { class: 'status-badge' },
            h(
              'span',
              { class: 'status-badge__text' },
              t('home.codeReview.pendingRelease'),
            )
          )
        ]
      )),
  },
  {
    title: t('home.codeReview.feature03Title'),
    content: t('home.codeReview.feature03Content'),
    img: t('home.codeReview.feature03'),
  },
  {
    title: t('home.codeReview.feature04Title'),
    content: t('home.codeReview.feature04Content'),
    img: t('home.codeReview.feature04'),
  },
])
</script>

<style lang="less" scoped>
.gradient-border {
  border: 1px solid #d8e7ff;
}

:deep(.status-badge) {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  margin-left: 8px;
  padding: 3px 8px;
  align-items: center;
  justify-content: center;
}

:deep(.status-badge__text) {
  font-size: 12px;
  line-height: 12px;
  background: linear-gradient(99deg, #00FFB7 1%, #FFFFFF 68%, #C5DBFF 101%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
