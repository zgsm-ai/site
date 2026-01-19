<template>
    <div class="w-full flex flex-col items-center">
        <div class="flex flex-col items-center">
            <div class="strict-mode__title" :class="{ 'strict-mode__title-en': !isZh }">
                <img v-if="isZh" :src="ZhStrictModeTitle" alt="strict mode" />
                <img v-else :src="EnStrictModeTitle" alt="strict mode">
            </div>
            <span class="mt-4 text-base font-normal leading-6 text-center text-white/70 max-w-270 strict-mode__desc">{{
                t('home.strictMode.subTitle')
                }}</span>
        </div>
        <div class="w-full rounded-[20px] mt-10 gradient-border">
            <video class="rounded-[20px] w-full" :src="video" preload="none" loop muted autoplay playsinline
                style="object-fit: cover;" :poster="poster">
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="flex gap-6 flex-wrap mt-6 z-100 justify-between">
            <div class="strict-mode__item" :class="{ 'strict-mode__item-en': !isZh }" v-for="item in featureList"
                :key="item.title">
                <ItemCard :img="item.img" :title="item.title" :content="item.content" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ItemCard from './ItemCard.vue'
import StrictModeZhVideo from '@/assets/video/strict_mode_zh.mp4'
import StrictModeEnVideo from '@/assets/video/strict_mode_en.mp4'
import StrictModeZhPoster from '@/assets/strictMode/strict_mode_zh_buffer.webp'
import StrictModeEnPoster from '@/assets/strictMode/strict_mode_en_buffer.webp'
import ZhStrictModeFeature1 from '@/assets/strictMode/zh/strictMode_feature01.webp';
import ZhStrictModeFeature2 from '@/assets/strictMode/zh/strictMode_feature02.webp';
import ZhStrictModeFeature3 from '@/assets/strictMode/zh/strictMode_feature03.webp';
import ZhStrictModeFeature4 from '@/assets/strictMode/zh/strictMode_feature04.webp';
import EnStrictModeFeature1 from '@/assets/strictMode/en/strictMode_feature01.webp';
import EnStrictModeFeature2 from '@/assets/strictMode/en/strictMode_feature02.webp';
import EnStrictModeFeature3 from '@/assets/strictMode/en/strictMode_feature03.webp';
import EnStrictModeFeature4 from '@/assets/strictMode/en/strictMode_feature04.webp';

import EnStrictModeTitle from '@/assets/strictMode/en/strictMode_title.webp';
import ZhStrictModeTitle from '@/assets/strictMode/zh/strictMode_title.webp';

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

const video = computed(() => isZh.value ? StrictModeZhVideo : StrictModeEnVideo)

const poster = computed(() => isZh.value ? StrictModeZhPoster : StrictModeEnPoster)
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

.strict-mode__item {
    flex: 0 1 calc(50% - 12px);
    height: 600px;

    @media (max-width: 1920px) {
        height: 400px;
    }

    @media (max-width: 1024px) {
        flex: 0 1 calc(50% - 12px);
    }

    @media (max-width: 768px) {
        flex: 0 1 100%;
    }

    @media (max-width: 480px) {
        height: auto;
    }
}

.strict-mode__item-en {
    height: 640px;

    @media (max-width: 1920px) {
        height: 440px;
    }

    @media (max-width: 480px) {
        height: auto;
    }
}

.strict-mode__title {
    @media (max-width: 480px) {
        width: 70%;
    }
}

.strict-mode__title-en {
    @media (max-width: 480px) {
        display: flex;
        justify-content: center;
    }
}

.strict-mode__desc {
    @media (max-width: 480px) {
        font-size: 14px;
    }
}
</style>