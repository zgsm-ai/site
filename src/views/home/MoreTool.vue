<template>
    <div class="mt-9 sm:mt-18 md:mt-26 lg:mt-36 xl:mt-45">
        <PageTitle :title="t('home.moreTool.title')" :subtitle="t('home.moreTool.subTitle')" />
        <div class="flex gap-6 flex-wrap mt-10 justify-between">
            <div class="more-tool__item" :class="{ 'more-tool__item-en': !isZh }" v-for="item in featureList"
                :key="item.title">
                <ItemCard :img="item.img" :title="item.title" :content="item.content" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'
import ItemCard from './ItemCard.vue'
import ZhToolFeature1 from '@/assets/tool/zh/tool_feature01.webp'
import ZhToolFeature2 from '@/assets/tool/zh/tool_feature02.webp'
import ZhToolFeature3 from '@/assets/tool/zh/tool_feature03.webp'
import ZhToolFeature4 from '@/assets/tool/zh/tool_feature04.webp'
import ZhToolFeature5 from '@/assets/tool/zh/tool_feature05.webp'
import ZhToolFeature6 from '@/assets/tool/zh/tool_feature06.webp'
import EnToolFeature1 from '@/assets/tool/en/tool_feature01.webp'
import EnToolFeature2 from '@/assets/tool/en/tool_feature02.webp'
import EnToolFeature3 from '@/assets/tool/en/tool_feature03.webp'
import EnToolFeature4 from '@/assets/tool/en/tool_feature04.webp'
import EnToolFeature5 from '@/assets/tool/en/tool_feature05.webp'
import EnToolFeature6 from '@/assets/tool/en/tool_feature06.webp'

const { t, locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

const featureList = computed(() => [
    {
        title: t('home.moreTool.feature05Title'),
        content: t('home.moreTool.feature05Content'),
        img: isZh.value ? ZhToolFeature5 : EnToolFeature5,
    },
    {
        title: t('home.moreTool.feature06Title'),
        content: t('home.moreTool.feature06Content'),
        img: isZh.value ? ZhToolFeature6 : EnToolFeature6,
    },
    {
        title: t('home.moreTool.feature01Title'),
        content: t('home.moreTool.feature01Content'),
        img: isZh.value ? ZhToolFeature1 : EnToolFeature1,
    },
    {
        title: t('home.moreTool.feature02Title'),
        content: t('home.moreTool.feature02Content'),
        img: isZh.value ? ZhToolFeature2 : EnToolFeature2,
    },
    {
        title: t('home.moreTool.feature03Title'),
        content: t('home.moreTool.feature03Content'),
        img: isZh.value ? ZhToolFeature3 : EnToolFeature3,
    },
    {
        title: t('home.moreTool.feature04Title'),
        content: t('home.moreTool.feature04Content'),
        img: isZh.value ? ZhToolFeature4 : EnToolFeature4,
    },
])
</script>
<style lang="less" scoped>
.more-tool__item {
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

.more-tool__item-en {
    height: 640px;

    @media (max-width: 1920px) {
        height: 440px;
    }

    @media (max-width: 480px) {
        height: auto;
    }
}
</style>