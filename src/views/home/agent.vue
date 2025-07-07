<template>
  <div class="w-full mt-45">
    <PageTitle :title="t('home.agent.title')" :subtitle="t('home.agent.subTitle')" />
    <div class="w-full  rounded-[20px] mt-10 gradient-border">
      <video class="rounded-[20px] w-full" src="../../assets/video/agent_zh.mp4" preload="none" loop muted autoplay playsinline
        style="object-fit: cover;">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="flex gap-6 flex-wrap mt-6">
      <ItemCard
        v-for="item in featureList"
        :key="item.title"
        :img="item.img"
        :title="item.title"
        :content="item.content"
        :renderTitle="item.renderTitle"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'
import ItemCard from './ItemCard.vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const featureList = computed(() => [
  {
    title: t('home.agent.feature01Title'),
    content: t('home.agent.feature01Content'),
    img: t('home.agent.feature01'),
  },
  {
    title: t('home.agent.feature02Title'),
    content: t('home.agent.feature02Content'),
    img: t('home.agent.feature02'),
  },
  {
    content: t('home.agent.feature03Content'),
    img: t('home.agent.feature03'),
    renderTitle: () =>
      h(
        'span',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
          },
        },
        [
          h('span', t('home.agent.feature03Title')),
          h(
            'div',
            {
              class: 'guide-container',
              onClick: openWordPreview,
            },
            h('span', { class: 'guide-link' }, t('home.agent.userGuide')),
          ),
        ],
      ),
  },
  {
    title: t('home.agent.feature04Title'),
    content: t('home.agent.feature04Content'),
    img: t('home.agent.feature04'),
  },
])
const demo = computed(() => t('home.agent.demo'))

const router = useRouter()

const openWordPreview = () => {
  const routeData = router.resolve({
    name: 'preview',
    query: { file: 'guide' },
  })

  window.open(routeData.href, '_blank')
}
</script>
<style lang="less" scoped>
.gradient-border {
  border: 1px solid #d8e7ff;
}

:deep(.guide-container) {
  display: flex;
  margin-left: auto;
  cursor: pointer;
  position: relative;
  top: -6px;
}

:deep(.guide-link) {
  font-size: 16px;
  line-height: 24px;
  background: linear-gradient(99deg, #00ffb7 1%, #ffffff 68%, #c5dbff 101%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

:deep(.guide-link):hover,
:deep(.guide-link):active {
  opacity: 0.7;
}
</style>
