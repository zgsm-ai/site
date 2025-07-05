<template>
  <div class="w-full mt-45">
    <PageTitle :title="t('home.agent.title')" :subtitle="t('home.agent.subTitle')" />
    <div class="w-full h-[702px] rounded-[20px] mt-10 gradient-border">
      <img class="rounded-[20px]" :src="demo" />
    </div>
    <div class="flex gap-6 flex-wrap mt-6">
      <ItemCard v-for="item in featureList" :key="item.title" :img="item.img" :title="item.title"
        :content="item.content" :renderTitle="item.renderTitle" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import EnGuidePdf from '@/assets/guide_en.pdf'
import ZhGuidePdf from '@/assets/guide_zh.pdf'
import ItemCard from './ItemCard.vue'

export default defineComponent({
  name: 'AgentView',
})
</script>
<script lang="ts" setup>
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/PageTitle.vue'

const { t, locale } = useI18n()

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
            t('home.agent.feature03Title'),
          ),
          h(
            'div',
            {
              class: 'guide-container',
              onClick: openWordPreview
            },
            h(
              'span',
              { class: 'guide-link' },
              t('home.agent.userGuide'),
            )
          )
        ]
      )),
  },
  {
    title: t('home.agent.feature04Title'),
    content: t('home.agent.feature04Content'),
    img: t('home.agent.feature04'),
  },
])
const demo = computed(() => t('home.agent.demo'))

const isZh = computed(() => locale.value === 'zh')

const openWordPreview = () => {
  const link = document.createElement('a')

  link.href = isZh.value ? ZhGuidePdf : EnGuidePdf
  link.target = '_blank'
  link.rel = 'noopener noreferrer'

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
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
  background: linear-gradient(99deg, #00FFB7 1%, #FFFFFF 68%, #C5DBFF 101%);
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
