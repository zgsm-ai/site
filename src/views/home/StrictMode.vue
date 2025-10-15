<template>
    <div class="w-full flex flex-col items-center">
        <div class="flex flex-col items-center">
            <div>
                <img :src="t('home.strictMode.title')" />
            </div>
            <span class="mt-4 text-base font-normal leading-6 text-center text-white/70 max-w-270">{{
                t('home.strictMode.subTitle')
            }}</span>
        </div>
        <div class="w-full  rounded-[20px] mt-10 gradient-border">
            <video class="rounded-[20px] w-full" :src="video" preload="none" loop muted autoplay playsinline
                style="object-fit: cover;" :poster="poster">
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="flex gap-6 flex-wrap mt-6 z-100">
            <ItemCard v-for="item in featureList" :key="item.title" :img="item.img" :title="item.title"
                :content="item.content" :height="cardHeight" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ItemCard from './ItemCard.vue'
import StrictModeZhVideo from '@/assets/video/strict_mode_zh.mp4'
import StrictModeEnVideo from '@/assets/video/strict_mode_en.mp4'
import StrictModeZhPoster from '@/assets/strict_mode_zh_buffer.png'
import StrictModeEnPoster from '@/assets/strict_mode_en_buffer.png'

const { t, locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

const cardHeight = computed(() => (isZh.value ? '400px' : '440px'))

const featureList = computed(() => [
    {
        title: t('home.strictMode.feature01Title'),
        content: t('home.strictMode.feature01Content'),
        img: t('home.strictMode.feature01'),
    },
    {
        title: t('home.strictMode.feature02Title'),
        content: t('home.strictMode.feature02Content'),
        img: t('home.strictMode.feature02'),
    },
    {
        title: t('home.strictMode.feature03Title'),
        content: t('home.strictMode.feature03Content'),
        img: t('home.strictMode.feature03'),
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
</style>