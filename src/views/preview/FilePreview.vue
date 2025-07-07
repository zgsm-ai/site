<template>
  <n-spin :show="isLoading" stroke="#1876F2">
    <div class="preview-page">
      <div :key="`${route.query.file}-${locale}`" ref="docxContainer" class="docx-container" />
    </div>
  </n-spin>
</template>

<script setup lang="ts">
import { ref, watchEffect, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { renderAsync } from 'docx-preview'
import { NSpin } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const docxContainer = ref<HTMLDivElement | null>(null)
const route = useRoute()
const isLoading = ref(false)
const { locale } = useI18n()

const postProcessLinks = (container: HTMLElement, selector: string) => {
  const spans = container.querySelectorAll(selector)
  if (spans.length === 0) {
    return
  }

  const replacements: { oldNode: Element; newNode: HTMLAnchorElement }[] = []

  spans.forEach((span) => {
    const text = (span as HTMLElement).innerText?.trim()
    if (text) {
      const a = document.createElement('a')
      a.href = text.startsWith('http') ? text : `https://${text}`
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      a.innerHTML = span.innerHTML
      a.className = span.className
      a.style.color = 'blue'
      a.style.textDecoration = 'underline'

      replacements.push({ oldNode: span, newNode: a })
    }
  })

  replacements.forEach(({ oldNode, newNode }) => {
    oldNode.parentNode?.replaceChild(newNode, oldNode)
  })
}

watchEffect(async () => {
  const filename = route.query.file as string
  if (!filename || !docxContainer.value) {
    return
  }

  isLoading.value = true

  const fileUrl = `/docs/${filename}_${locale.value.toLowerCase()}.docx`

  try {
    const response = await fetch(fileUrl)
    if (!response.ok) {
      throw new Error(`error: not find (HTTP ${response.status}) at ${fileUrl}`)
    }
    const blob = await response.blob()

    await renderAsync(blob, docxContainer.value, undefined, {
      inWrapper: true,
      useBase64URL: true,
      experimental: true,
    })

    await nextTick()
    if (!docxContainer.value.querySelector('a')) {
      const hyperlinkSelector = '.docx_8'
      postProcessLinks(docxContainer.value, hyperlinkSelector)
    }
  } catch (error) {
    console.error('error:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="less" scoped>
.preview-page {
  height: calc(100vh - 68px);
}

.preview-area {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  background-color: #e8e8e8;
  min-height: 100vh;
  box-sizing: border-box;
}

:deep(.docx-wrapper) {
  width: 8.5in;
  max-width: 95%;
  min-height: 11in;
  background-color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  padding: 0 !important;
  box-sizing: border-box;
  margin: auto;
}

.docx-container {
  background: gray;
  padding: 0.5in 0;
  min-height: calc(100vh - 68px);
}

:deep(.docx) {
  width: 100% !important;
  height: 100%;
  margin-bottom: 0 !important;
}
</style>
