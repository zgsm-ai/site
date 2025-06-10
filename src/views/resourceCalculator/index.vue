<template>
  <div class="resource-calculator">
    <n-layout class="min-h-screen" style="padding: 20px">
      <div class="calculator-container">
        <!-- <n-h1 class="text-center mb-6">诸葛神码资源预估器</n-h1> -->

        <n-grid :cols="24" :x-gap="24">
          <!-- 左侧：参数设置 -->
          <n-grid-item :span="10">
            <ParameterSettings v-model="formData" />
          </n-grid-item>

          <!-- 右侧：资源需求预估结果 -->
          <n-grid-item :span="14">
            <ResourceResult
              :form-data="formData"
              :results="results"
              :total-resources="totalResources"
            />
          </n-grid-item>
        </n-grid>

        <!-- 模型对比表 -->
        <ModelTable />
      </div>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { NLayout, NGrid, NGridItem } from 'naive-ui'

import type { FormData } from './types'
import { useResourceCalculator } from './hooks/useResourceCalculator'
import ModelTable from './components/ModelTable.vue'
import ParameterSettings from './components/ParameterSettings.vue'
import ResourceResult from './components/ResourceResult.vue'

// 定义组件名
defineOptions({
  name: 'ResourceCalculator',
})

// 使用资源计算器 hooks
const { results, totalResources, calculateResources, initializeAIModelSelection } =
  useResourceCalculator()

// 表单数据
const formData = reactive<FormData>({
  developerCount: 1000,
  vscodeActiveRatio: 30, // VSCode插件日活比例
  vscodeActiveUsers: 300, // VSCode插件日活用户数
  concurrentDeveloperCount: 37, // 并发链接数
  enableCodeCompletion: true,
  selectedCompletionModel: 'DeepSeek-Coder-V2-Lite-Base',
  enableAIAgent: true,
  selectedAIModels: {} as Record<string, boolean>,
  modelRatios: {} as Record<string, number>,
})

watch(
  () => formData,
  (value) => {
    calculateResources(value)
  },
  { immediate: true, deep: true },
)

// 初始化
onMounted(() => {
  // 初始化AI模型选择
  initializeAIModelSelection(formData)

  // 执行首次计算
  calculateResources(formData)
})
</script>

<style scoped>
.resource-calculator {
  background-color: #f0f2f5;
  min-height: 100vh;
}

.calculator-container {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
