<template>
  <n-card title="资源需求预估结果" :bordered="true" size="small">
    <!-- 总资源需求 -->
    <div class="total-resources-section mb-6">
      <n-grid x-gap="12" :cols="4">
        <!-- GPU服务器需求 -->
        <n-grid-item>
          <n-card size="small" :bordered="true" class="resource-card" title="GPU服务器需求">
            <div class="resource-content">
              <div v-if="Object.keys(totalResources.gpuServers).length > 0">
                <div
                  v-for="(config, gpuType) in totalResources.gpuServers"
                  :key="gpuType"
                  class="mb-2"
                >
                  <div
                    v-for="(count, cardConfig) in config.servers"
                    :key="cardConfig"
                    class="text-sm"
                  >
                    {{ count }} 台 {{ gpuType }} 服务器<br />（每台配 {{ cardConfig }}）
                  </div>
                </div>
              </div>
              <div v-else class="text-gray-500 text-sm">暂无GPU服务器需求</div>
            </div>
          </n-card>
        </n-grid-item>

        <!-- 后台CPU服务器需求 -->
        <n-grid-item>
          <n-card size="small" :bordered="true" class="resource-card" title="后台服务器需求">
            <div class="resource-content">
              <div class="text-sm">
                CPU {{ totalResources.cpuCores }} 核<br />
                内存 {{ totalResources.memory }} GB<br />
                磁盘 {{ totalResources.disk }} TB
              </div>
            </div>
          </n-card>
        </n-grid-item>
        <!-- GPU预估成本 -->
        <n-grid-item>
          <n-card
            size="small"
            :bordered="true"
            class="resource-card"
            :class="{ 'placeholder-card': totalResources.gpuCosts === 0 }"
            title="GPU预估成本"
          >
            <div class="resource-content">
              <div
                v-if="totalResources.gpuCosts > 0"
                class="text-lg font-bold"
                style="color: #722ed1"
              >
                ¥{{ totalResources.gpuCosts.toLocaleString() }}
              </div>
              <div v-else class="text-sm text-gray-500">无GPU硬件需求</div>
            </div>
          </n-card>
        </n-grid-item>

        <!-- API服务每月成本 -->
        <n-grid-item>
          <n-card
            size="small"
            :bordered="true"
            class="resource-card"
            :class="{ 'placeholder-card': totalResources.apiCosts === 0 }"
            title="API服务每月成本"
          >
            <div class="resource-content">
              <div
                v-if="totalResources.apiCosts > 0"
                class="text-lg font-bold"
                style="color: #fa8c16"
              >
                ¥{{ totalResources.apiCosts.toLocaleString() }}
              </div>
              <div v-else class="text-sm text-gray-500">未使用API服务</div>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>

    <n-divider />

    <!-- 详细资源需求 -->
    <n-collapse>
      <n-collapse-item title="代码补全模型资源" name="completion">
        <div v-if="formData.enableCodeCompletion && results.completion">
          <div class="completion-container">
            <!-- 模型基本信息 -->
            <div class="completion-header">
              <div class="completion-model">
                <span class="completion-model-label">选择模型</span>
                <span class="completion-model-name">{{ formData.selectedCompletionModel }}</span>
              </div>
              <div class="completion-instances">
                <span class="completion-instances-label">实例数量</span>
                <span class="completion-instances-count">{{
                  results.completion.instancesNeeded
                }}</span>
              </div>
            </div>

            <!-- GPU资源需求 -->
            <div class="completion-gpu-section">
              <div class="completion-gpu-title">GPU 资源需求</div>
              <div class="completion-gpu-list">
                <div
                  v-for="(count, config) in results.completion.gpuServers.servers"
                  :key="config"
                  class="completion-gpu-item"
                >
                  <span class="completion-gpu-count">{{ count }}</span>
                  <span class="completion-gpu-unit">台</span>
                  <span class="completion-gpu-detail"
                    >{{ results.completion.gpuServers.type }} ({{ config }})</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500">未启用代码补全功能</div>
      </n-collapse-item>

      <n-collapse-item title="AI程序员/AI Agent资源" name="aiAgent">
        <div v-if="formData.enableAIAgent && results.aiAgent.length > 0">
          <n-space vertical :size="16">
            <div v-for="(result, index) in results.aiAgent" :key="index" class="result-item">
              <div class="ai-agent-item">
                <!-- 模型信息行 -->
                <div class="model-info">
                  <span class="model-name">{{ result.modelName }}</span>
                  <span class="model-ratio">{{ result.ratio }}%</span>
                </div>

                <!-- 资源信息 -->
                <div class="resource-info">
                  <!-- 部署模式信息 -->
                  <div v-if="result.type === 'deployment'" class="info-row">
                    <span class="info-label">实例数量</span>
                    <span class="info-value">{{ result.instancesNeeded }} 个</span>
                  </div>

                  <!-- API模式信息 -->
                  <template v-if="result.type === 'api'">
                    <div class="info-row">
                      <span class="info-label">覆盖用户</span>
                      <span class="info-value">{{ result.usersForThisModel }} 人</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">月度成本</span>
                      <span class="info-value cost-value"
                        >¥{{ result.monthlyCost?.toLocaleString() || 0 }}</span
                      >
                    </div>
                  </template>
                </div>

                <!-- GPU资源需求 -->
                <div v-if="result.type === 'deployment' && result.gpuServers" class="gpu-info">
                  <div class="gpu-header">GPU 资源需求</div>
                  <div class="gpu-list">
                    <div
                      v-for="(count, config) in result.gpuServers.servers"
                      :key="config"
                      class="gpu-item"
                    >
                      <span class="gpu-count">{{ count }} 台</span>
                      <span class="gpu-detail">{{ result.gpuServers.type }} ({{ config }})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </n-space>
        </div>
        <div v-else class="text-gray-500">未启用AI程序员/AI Agent功能</div>
      </n-collapse-item>

      <n-collapse-item title="后台服务资源" name="backend">
        <div v-if="results.backend">
          <div class="backend-container">
            <!-- 实例数量信息 -->
            <div class="backend-header">
              <div class="backend-instances">
                <span class="backend-instances-label">服务实例</span>
                <span class="backend-instances-count">{{ results.backend.instancesNeeded }}</span>
              </div>
            </div>

            <!-- 资源详情 -->
            <div class="backend-resources-section">
              <div class="backend-resources-title">硬件资源需求</div>
              <div class="backend-resources-grid">
                <div class="backend-resource-item">
                  <span class="backend-resource-label">CPU</span>
                  <span class="backend-resource-value">{{ results.backend.totalCpuCores }}</span>
                  <span class="backend-resource-unit">核</span>
                </div>
                <div class="backend-resource-item">
                  <span class="backend-resource-label">内存</span>
                  <span class="backend-resource-value">{{ results.backend.totalMemory }}</span>
                  <span class="backend-resource-unit">GB</span>
                </div>
                <div class="backend-resource-item">
                  <span class="backend-resource-label">磁盘</span>
                  <span class="backend-resource-value">{{ results.backend.totalDisk }}</span>
                  <span class="backend-resource-unit">TB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NDivider, NGrid, NGridItem, NSpace, NCollapse, NCollapseItem } from 'naive-ui'
import type { FormData, Results, TotalResources } from '../types'

defineOptions({
  name: 'ResourceResult',
})
defineProps<{
  formData: FormData
  results: Results
  totalResources: TotalResources
}>()
</script>
<style lang="less" scoped>
.resource-card {
  height: 100%;
  min-height: 120px;
  background: white;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
}

.resource-card:hover {
  border-color: #1890ff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
}
.resource-content {
  padding: 8px 0;
}

.placeholder-card {
  opacity: 0.6;
}

.result-item {
  padding: 12px;
}

.text-center {
  text-align: center;
}

.font-medium {
  font-weight: 500;
}

.text-gray-500 {
  color: #6b7280;
}

.mb-2 {
  margin-bottom: 8px;
}

.mb-3 {
  margin-bottom: 12px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mb-6 {
  margin-bottom: 24px;
}

.mt-2 {
  margin-top: 8px;
}

.mt-3 {
  margin-top: 12px;
}

.text-lg {
  font-size: 1.125rem;
}

/* AI Agent 项目样式 */
.ai-agent-item {
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
}

.ai-agent-item:hover {
  border-color: #d4edda;
  background: #f8f9fa;
}

.model-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.model-name {
  font-weight: 600;
  font-size: 14px;
  color: #2c3e50;
}

.model-ratio {
  background: #e6f7ff;
  color: #1890ff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.resource-info {
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
}

.info-label {
  color: #666;
  font-weight: 400;
}

.info-value {
  color: #2c3e50;
  font-weight: 500;
}

.cost-value {
  color: #fa8c16;
  font-weight: 600;
}

.gpu-info {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 12px;
}

.gpu-header {
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.gpu-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.gpu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.gpu-count {
  background: #f0f0f0;
  color: #2c3e50;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
}

.gpu-detail {
  color: #666;
  flex: 1;
}

/* 代码补全模型资源样式 */
.completion-container {
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  margin: 12px;
}

.completion-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;
  gap: 20px;
}

.completion-model,
.completion-instances {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.completion-model-label,
.completion-instances-label {
  font-size: 12px;
  color: #666;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.completion-model-name {
  font-size: 15px;
  color: #2c3e50;
  font-weight: 600;
}

.completion-instances-count {
  font-size: 18px;
  color: #1890ff;
  font-weight: 700;
}

.completion-gpu-section {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 16px;
}

.completion-gpu-title {
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.completion-gpu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.completion-gpu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.completion-gpu-item:hover {
  background: #e9ecef;
}

.completion-gpu-count {
  background: #1890ff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  min-width: 30px;
  text-align: center;
}

.completion-gpu-unit {
  font-size: 12px;
  color: #666;
  margin-right: 4px;
}

.completion-gpu-detail {
  color: #2c3e50;
  font-size: 13px;
  font-weight: 500;
  flex: 1;
}

/* 后台服务资源样式 */
.backend-container {
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  margin: 12px;
}

.backend-header {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.backend-instances {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}

.backend-instances-label {
  font-size: 12px;
  color: #666;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.backend-instances-count {
  font-size: 18px;
  color: #1890ff;
  font-weight: 700;
}

.backend-resources-section {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 16px;
}

.backend-resources-title {
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.backend-resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.backend-resource-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.backend-resource-item:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.backend-resource-label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 40px;
}

.backend-resource-value {
  background: #1890ff;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  min-width: 50px;
  text-align: center;
}

.backend-resource-unit {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}
</style>
