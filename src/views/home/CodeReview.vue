<template>
  <FeatureSection
    :zh-title="ZhCodeReviewTitle"
    :en-title="EnCodeReviewTitle"
    alt-text="code review"
    :sub-title="t('home.codeReview.subTitle')"
    :video="video"
    poster="@/assets/codeReview/codereview_buffer.webp"
    :feature-list="featureList"
    margin-top="mt-9 sm:mt-18 md:mt-26 lg:mt-36 xl:mt-45"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FeatureSection from '@/components/FeatureSection.vue'
import CodeReviewZhVideo from '@/assets/video/code_review_zh.mp4'
import CodeReviewEnVideo from '@/assets/video/code_review_en.mp4'
import ZhCodeReviewFeature1 from '@/assets/codeReview/zh/codereview_feature01.webp'
import ZhCodeReviewFeature2 from '@/assets/codeReview/zh/codereview_feature02.webp'
import ZhCodeReviewFeature3 from '@/assets/codeReview/zh/codereview_feature03.webp'
import ZhCodeReviewFeature4 from '@/assets/codeReview/zh/codereview_feature04.webp'
import EnCodeReviewFeature1 from '@/assets/codeReview/en/codereview_feature01.webp'
import EnCodeReviewFeature2 from '@/assets/codeReview/en/codereview_feature02.webp'
import EnCodeReviewFeature3 from '@/assets/codeReview/en/codereview_feature03.webp'
import EnCodeReviewFeature4 from '@/assets/codeReview/en/codereview_feature04.webp'
import EnCodeReviewTitle from '@/assets/codeReview/en/codereview_title.webp'
import ZhCodeReviewTitle from '@/assets/codeReview/zh/codereview_title.webp'

const { t, locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

const featureList = computed(() => [
  {
    title: t('home.codeReview.feature01Title'),
    content: t('home.codeReview.feature01Content'),
    img: isZh.value ? ZhCodeReviewFeature1 : EnCodeReviewFeature1,
  },
  {
    title: t('home.codeReview.feature02Title'),
    content: t('home.codeReview.feature02Content'),
    img: isZh.value ? ZhCodeReviewFeature2 : EnCodeReviewFeature2,
  },
  {
    title: t('home.codeReview.feature03Title'),
    content: t('home.codeReview.feature03Content'),
    img: isZh.value ? ZhCodeReviewFeature3 : EnCodeReviewFeature3,
  },
  {
    title: t('home.codeReview.feature04Title'),
    content: t('home.codeReview.feature04Content'),
    img: isZh.value ? ZhCodeReviewFeature4 : EnCodeReviewFeature4,
  },
])

const video = computed(() => (isZh.value ? CodeReviewZhVideo : CodeReviewEnVideo))
</script>
