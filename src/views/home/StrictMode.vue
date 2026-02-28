<template>
  <FeatureSection
    :zh-title="ZhStrictModeTitle"
    :en-title="EnStrictModeTitle"
    alt-text="strict mode"
    :sub-title="t('home.strictMode.subTitle')"
    :video="video"
    :poster="poster"
    :feature-list="featureList"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FeatureSection from '@/components/FeatureSection.vue'
import StrictModeZhVideo from '@/assets/video/strict_mode_zh.mp4'
import StrictModeEnVideo from '@/assets/video/strict_mode_en.mp4'
import StrictModeZhPoster from '@/assets/strictMode/strict_mode_zh_buffer.webp'
import StrictModeEnPoster from '@/assets/strictMode/strict_mode_en_buffer.webp'
import ZhStrictModeFeature1 from '@/assets/strictMode/zh/strictMode_feature01.webp'
import ZhStrictModeFeature2 from '@/assets/strictMode/zh/strictMode_feature02.webp'
import ZhStrictModeFeature3 from '@/assets/strictMode/zh/strictMode_feature03.webp'
import ZhStrictModeFeature4 from '@/assets/strictMode/zh/strictMode_feature04.webp'
import EnStrictModeFeature1 from '@/assets/strictMode/en/strictMode_feature01.webp'
import EnStrictModeFeature2 from '@/assets/strictMode/en/strictMode_feature02.webp'
import EnStrictModeFeature3 from '@/assets/strictMode/en/strictMode_feature03.webp'
import EnStrictModeFeature4 from '@/assets/strictMode/en/strictMode_feature04.webp'
import EnStrictModeTitle from '@/assets/strictMode/en/strictMode_title.webp'
import ZhStrictModeTitle from '@/assets/strictMode/zh/strictMode_title.webp'

const { t, locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

const featureList = computed(() => [
  {
    title: t('home.strictMode.feature01Title'),
    content: t('home.strictMode.feature01Content'),
    img: isZh.value ? ZhStrictModeFeature1 : EnStrictModeFeature1,
  },
  {
    title: t('home.strictMode.feature02Title'),
    content: t('home.strictMode.feature02Content'),
    img: isZh.value ? ZhStrictModeFeature2 : EnStrictModeFeature2,
  },
  {
    title: t('home.strictMode.feature03Title'),
    content: t('home.strictMode.feature03Content'),
    img: isZh.value ? ZhStrictModeFeature3 : EnStrictModeFeature3,
  },
  {
    title: t('home.strictMode.feature04Title'),
    content: t('home.strictMode.feature04Content'),
    img: isZh.value ? ZhStrictModeFeature4 : EnStrictModeFeature4,
  },
])

const video = computed(() => (isZh.value ? StrictModeZhVideo : StrictModeEnVideo))
const poster = computed(() => (isZh.value ? StrictModeZhPoster : StrictModeEnPoster))
</script>
