<template>
  <div class="mt-45">
    <PageTitle :title="t('home.moreTool.title')" :subtitle="t('home.moreTool.subTitle')" />
    <div class="flex gap-6 flex-wrap mt-10">
      <ItemCard v-for="item in featureList" :key="item.title" :img="item.img" :title="item.title"
        :content="item.content" :height="cardHeight" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'
import ItemCard from './ItemCard.vue'

const { t, locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const cardHeight = computed(() => (isZh.value ? '420px' : '440px'))

const featureList = computed(() => [
  {
    title: t('home.moreTool.feature05Title'),
    content: t('home.moreTool.feature05Content'),
    img: t('home.moreTool.feature05'),
  },
  {
    title: t('home.moreTool.feature06Title'),
    content: t('home.moreTool.feature06Content'),
    img: t('home.moreTool.feature06'),
  },
  {
    title: t('home.moreTool.feature01Title'),
    content: t('home.moreTool.feature01Content'),
    img: t('home.moreTool.feature01'),
  },
  {
    title: t('home.moreTool.feature02Title'),
    content: t('home.moreTool.feature02Content'),
    img: t('home.moreTool.feature02'),
  },
  {
    title: t('home.moreTool.feature03Title'),
    content: t('home.moreTool.feature03Content'),
    img: t('home.moreTool.feature03'),
  },
  {
    title: t('home.moreTool.feature04Title'),
    content: t('home.moreTool.feature04Content'),
    img: t('home.moreTool.feature04'),
  },
])
</script>
