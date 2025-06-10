<template>
  <n-card title="参数设置" :bordered="true" size="small">
    <n-form :model="formData" label-placement="top">
      <!-- 基础参数配置区域 -->
      <n-card size="small" embedded class="mb-4" style="background: #f8fafc">
        <template #header>
          <n-space align="center">
            <span class="font-medium">基础参数与计算关系</span>
          </n-space>
        </template>

        <n-space vertical>
          <!-- 企业编码人员数量和VSCode插件日活比例 -->
          <n-grid :cols="2" :x-gap="16">
            <n-grid-item>
              <n-form-item label="企业编码人员">
                <n-input-number
                  v-model:value="formData.developerCount"
                  :min="1"
                  :show-button="false"
                  style="width: 100%"
                  @update:value="handleDeveloperCountChange"
                >
                  <template #suffix>人</template>
                </n-input-number>
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="VSCode 插件日活比例">
                <n-input-number
                  v-model:value="formData.vscodeActiveRatio"
                  :min="1"
                  :max="100"
                  :show-button="false"
                  style="width: 100%"
                  @update:value="handleDeveloperCountChange"
                >
                  <template #suffix>%</template>
                </n-input-number>
              </n-form-item>
            </n-grid-item>
          </n-grid>

          <!-- 计算流程展示 -->
          <div class="calculation-flow">
            <!-- 第一步计算 -->
            <div class="calculation-step">
              <div class="calculation-formula">
                <n-space align="center" justify="center" :size="8">
                  <n-tag type="info" size="small">{{ formData.developerCount }}</n-tag>
                  <span class="operator">×</span>
                  <n-tag type="warning" size="small">{{ formData.vscodeActiveRatio }}%</n-tag>
                  <span class="operator">=</span>
                  <n-tag type="success" size="small">{{ formData.vscodeActiveUsers }}</n-tag>
                </n-space>
              </div>
              <div class="calculation-description">
                <n-text depth="3" class="text-xs"
                  >企业编码人员 × VSCode 日活比例 = VSCode 日活用户数</n-text
                >
              </div>
            </div>

            <!-- 箭头指示 -->
            <div class="arrow-down">
              <n-icon size="16" color="#1890ff">
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                  />
                </svg>
              </n-icon>
            </div>

            <!-- 第二步计算 -->
            <div class="calculation-step">
              <div class="calculation-formula">
                <n-space align="center" justify="center" :size="8">
                  <n-tag type="success" size="small">{{ formData.vscodeActiveUsers }}</n-tag>
                  <span class="operator">×</span>
                  <n-tag type="warning" size="small">0.125</n-tag>
                  <span class="operator">=</span>
                  <n-tag type="error" size="small">{{ formData.concurrentDeveloperCount }}</n-tag>
                </n-space>
              </div>
              <div class="calculation-description">
                <n-text depth="3" class="text-xs">VSCode 日活用户数 × 并发系数 = 并发连接数</n-text>
              </div>
            </div>
          </div>

          <!-- 计算结果 -->
          <n-grid :cols="2" :x-gap="16">
            <n-grid-item>
              <n-form-item label="VSCode 插件日活用户数">
                <n-input-number
                  v-model:value="formData.vscodeActiveUsers"
                  :show-button="false"
                  style="width: 100%"
                  readonly
                >
                  <template #suffix>人</template>
                </n-input-number>
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="并发连接数">
                <n-input-number
                  v-model:value="formData.concurrentDeveloperCount"
                  :show-button="false"
                  style="width: 100%"
                  readonly
                >
                  <template #suffix>人</template>
                </n-input-number>
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-space>
      </n-card>

      <n-divider />

      <!-- 代码补全配置 -->
      <n-form-item>
        <n-checkbox v-model:checked="formData.enableCodeCompletion"> 代码补全 </n-checkbox>
      </n-form-item>

      <n-form-item
        v-if="formData.enableCodeCompletion"
        label="选择代码补全模型"
        style="margin-left: 24px"
      >
        <n-select
          v-model:value="formData.selectedCompletionModel"
          :options="completionModelOptions"
        />
      </n-form-item>

      <!-- AI程序员配置 -->
      <n-form-item>
        <n-checkbox v-model:checked="formData.enableAIAgent"> AI程序员/AI Agent </n-checkbox>
      </n-form-item>

      <div v-if="formData.enableAIAgent" style="margin-left: 24px">
        <n-form-item label="选择AI程序员模型（可多选）">
          <n-space vertical :size="16">
            <!-- 本地部署模型 -->
            <div>
              <n-h6 class="mb-2">本地部署模型</n-h6>
              <n-space vertical>
                <div
                  v-for="(config, modelName) in deploymentModels"
                  :key="modelName"
                  class="model-item"
                >
                  <n-checkbox
                    v-model:checked="formData.selectedAIModels[modelName]"
                    @update:checked="handleModelSelectionChange"
                  >
                    {{ modelName }}
                  </n-checkbox>
                  <div v-if="formData.selectedAIModels[modelName]" class="mt-2">
                    <n-input-group>
                      <n-input-group-label>分摊比例</n-input-group-label>
                      <n-input-number
                        v-model:value="formData.modelRatios[modelName]"
                        :min="1"
                        :max="100"
                        :show-button="false"
                        @update:value="handleRatioChange"
                      />
                      <n-input-group-label>%</n-input-group-label>
                    </n-input-group>
                  </div>
                </div>
              </n-space>
            </div>

            <!-- 在线服务模型 -->
            <div>
              <n-h6 class="mb-2">在线服务模型</n-h6>
              <n-space vertical>
                <div v-for="(config, modelName) in apiModels" :key="modelName" class="model-item">
                  <n-checkbox
                    v-model:checked="formData.selectedAIModels[modelName]"
                    @update:checked="handleModelSelectionChange"
                  >
                    {{ modelName }}
                  </n-checkbox>
                  <div v-if="formData.selectedAIModels[modelName]" class="mt-2">
                    <n-input-group>
                      <n-input-group-label>分摊比例</n-input-group-label>
                      <n-input-number
                        v-model:value="formData.modelRatios[modelName]"
                        :min="1"
                        :max="100"
                        :show-button="false"
                        @update:value="handleRatioChange"
                      />
                      <n-input-group-label>%</n-input-group-label>
                    </n-input-group>
                  </div>
                </div>
              </n-space>
            </div>
          </n-space>
        </n-form-item>
      </div>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import {
  NCard,
  NForm,
  NFormItem,
  NInputNumber,
  NCheckbox,
  NSelect,
  NDivider,
  NSpace,
  NIcon,
  NText,
  NInputGroup,
  NInputGroupLabel,
  NGrid,
  NGridItem,
  NH6,
  NTag,
} from 'naive-ui'

import { MODEL_CONFIG } from '../constants'
import type { DeploymentModel, ApiModel, FormData } from '../types'

// 定义组件名
defineOptions({
  name: 'ParameterSettings',
})

// 使用 defineModel 简化双向绑定
const formData = defineModel<FormData>({ required: true })

// 代码补全模型选项
const completionModelOptions = computed(() => {
  return Object.keys(MODEL_CONFIG.completionModels).map((modelName) => ({
    label: modelName,
    value: modelName,
  }))
})

// 部署模型
const deploymentModels = computed(() => {
  const models: Record<string, DeploymentModel> = {}
  Object.entries(MODEL_CONFIG.aiAgentModels).forEach(([name, config]) => {
    if (config.type === 'deployment') {
      models[name] = config as DeploymentModel
    }
  })
  return models
})

// API模型
const apiModels = computed(() => {
  const models: Record<string, ApiModel> = {}
  Object.entries(MODEL_CONFIG.aiAgentModels).forEach(([name, config]) => {
    if (config.type === 'api') {
      models[name] = config as ApiModel
    }
  })
  return models
})

// 处理开发人员数量变化
const handleDeveloperCountChange = () => {
  // 第一步：编码人数 → VSCode插件日活用户数
  formData.value.vscodeActiveUsers = Math.ceil(
    formData.value.developerCount * (formData.value.vscodeActiveRatio / 100),
  )

  // 第二步：VSCode插件日活用户数 → 并发链接数
  formData.value.concurrentDeveloperCount = Math.ceil(formData.value.vscodeActiveUsers * 0.125)

  // 数据变化会自动通过 watch 同步到父组件，父组件会通过 handleFormDataUpdate 重新计算
}

// 处理模型选择变化
const handleModelSelectionChange = () => {
  updateModelRatios()
}

// 处理比例变化
const handleRatioChange = () => {
  validateAndAdjustRatios()
}

// 更新模型分摊比例
const updateModelRatios = () => {
  const selectedModels = Object.keys(formData.value.selectedAIModels).filter(
    (model) => formData.value.selectedAIModels[model],
  )

  // 如果只选择了一个模型，则比例为100%
  if (selectedModels.length === 1) {
    formData.value.modelRatios[selectedModels[0]] = 100
    return
  }

  // 如果选择了多个模型，则平均分配比例
  if (selectedModels.length > 1) {
    const baseRatio = Math.floor(100 / selectedModels.length)
    const remainder = 100 % selectedModels.length

    selectedModels.forEach((model, index) => {
      formData.value.modelRatios[model] = baseRatio + (index < remainder ? 1 : 0)
    })
  }
}

// 验证并调整分摊比例
const validateAndAdjustRatios = () => {
  const selectedModels = Object.keys(formData.value.selectedAIModels).filter(
    (model) => formData.value.selectedAIModels[model],
  )

  if (selectedModels.length <= 1) return

  // 计算当前总比例
  let totalRatio = 0
  selectedModels.forEach((model) => {
    totalRatio += formData.value.modelRatios[model] || 0
  })

  // 如果总比例不等于100%，调整比例
  if (totalRatio !== 100) {
    const difference = 100 - totalRatio
    if (selectedModels.length > 0) {
      const lastModel = selectedModels[selectedModels.length - 1]
      formData.value.modelRatios[lastModel] =
        (formData.value.modelRatios[lastModel] || 0) + difference
    }
  }
}

// 初始化
onMounted(() => {
  // 初始化逻辑已移到父组件，此处不再需要
})
</script>

<style scoped>
.model-item {
  padding: 8px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #fafafa;
}

.font-medium {
  font-weight: 500;
}

.mb-2 {
  margin-bottom: 8px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mt-2 {
  margin-top: 8px;
}

/* 计算流程样式 */
.calculation-flow {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  border: 1px solid #e0e6ed;
}

.calculation-step {
  background: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.calculation-formula {
  margin-bottom: 8px;
}

.calculation-description {
  text-align: center;
}

.operator {
  font-weight: bold;
  font-size: 16px;
  color: #1890ff;
  margin: 0 4px;
}

.arrow-down {
  text-align: center;
  margin: 8px 0;
}

.text-xs {
  font-size: 0.75rem;
}
</style>
