<template>
  <div class="cost-breakdown">
    <div class="breakdown-title">成本构成明细</div>
    <div v-for="breakdown in costBreakdown" :key="breakdown.gpuType" class="breakdown-item">
      <div class="breakdown-header">
        {{ breakdown.gpuType }} GPU (共{{ breakdown.totalCards }}张)
      </div>
      <div class="breakdown-details">
        <div
          v-for="(count, cardConfig) in breakdown.servers"
          :key="cardConfig"
          class="breakdown-detail"
        >
          <span>{{ count }}台 {{ cardConfig }}服务器</span>
          <span>¥{{ (breakdown.costPerServer[cardConfig] * count).toLocaleString() }}</span>
        </div>
      </div>
      <div class="breakdown-subtotal">小计：¥{{ breakdown.cost.toLocaleString() }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'GpuCostBreakdown',
})

interface CostBreakdown {
  gpuType: string
  servers: Record<string, number>
  totalCards: number
  cost: number
  costPerServer: Record<string, number>
}

defineProps<{
  costBreakdown: CostBreakdown[]
}>()
</script>

<style lang="less" scoped>
.cost-breakdown {
  width: 320px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e8e8e8;
}

.breakdown-title {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.breakdown-item {
  margin-bottom: 16px;
}

.breakdown-item:last-child {
  margin-bottom: 0;
}

.breakdown-header {
  font-size: 13px;
  font-weight: 600;
  color: #722ed1;
  margin-bottom: 8px;
}

.breakdown-details {
  margin-bottom: 8px;
}

.breakdown-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background-color: #fafafa;
  border-radius: 4px;
  margin-bottom: 4px;
  font-size: 12px;
}

.breakdown-detail:last-child {
  margin-bottom: 0;
}

.breakdown-detail span:first-child {
  color: #666;
}

.breakdown-detail span:last-child {
  color: #fa8c16;
  font-weight: 600;
}

.breakdown-subtotal {
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  color: #722ed1;
  padding: 4px 8px;
  border-top: 1px solid #e8e8e8;
  background-color: #f9f0ff;
  border-radius: 4px;
}
</style>
