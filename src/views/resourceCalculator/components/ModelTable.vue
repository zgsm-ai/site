<template>
  <div class="model-table">
    <n-card title="选型对比" :bordered="true" size="small">
      <n-data-table :columns="columns" :data="tableData" :bordered="true" :single-line="false" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { NCard, NDataTable, NTag } from 'naive-ui'
import { tableData, type TableRow } from '../constants'

// 定义组件名
defineOptions({
  name: 'ModelTable',
})

// 定义列配置
const columns = computed(() => [
  {
    title: '模型名称',
    key: 'modelName',
    width: 200,
    fixed: 'left' as const,
  },
  {
    title: '场景',
    key: 'scenario',
    width: 100,
    render(row: TableRow) {
      return h(
        NTag,
        {
          type: row.scenario === '问答' ? 'info' : 'success',
          bordered: false,
        },
        {
          default: () => row.scenario,
        },
      )
    },
  },
  {
    title: '效果',
    key: 'effect',
    width: 100,
    render(row: TableRow) {
      const type = row.effect === '良' ? 'success' : row.effect === '中' ? 'warning' : 'error'
      return h(
        NTag,
        {
          type,
          bordered: false,
        },
        {
          default: () => row.effect,
        },
      )
    },
  },
  {
    title: '模型大小/MoE大小',
    key: 'modelSizeMoESize',
    width: 180,
  },
  {
    title: '上下文窗口',
    key: 'contextWindow',
    width: 120,
  },
  {
    title: '最佳最小部署硬件',
    key: 'optimalMinDeploymentHardware',
    width: 180,
  },
  {
    title: '最佳最小部署成本',
    key: 'optimalMinDeploymentCost',
    width: 180,
  },
  {
    title: '问答25K(补全1K)上下文 每分钟并发数',
    key: 'qa25k_1k_context_concurrent_rpm',
    width: 240,
    render(row: TableRow) {
      return `${row.qa25k_1k_context_concurrent_rpm} RPM`
    },
  },
  {
    title: '问答25K(补全1K)上下文 最高吞吐(token/s)',
    key: 'qa25k_1k_context_max_throughput_tok_s',
    width: 260,
    render(row: TableRow) {
      return `${row.qa25k_1k_context_max_throughput_tok_s}`
    },
  },
  {
    title: '问答12K上下文 每分钟并发数',
    key: 'qa12k_context_concurrent_rpm',
    width: 200,
    render(row: TableRow) {
      return typeof row.qa12k_context_concurrent_rpm === 'string'
        ? row.qa12k_context_concurrent_rpm
        : `${row.qa12k_context_concurrent_rpm} RPM`
    },
  },
  {
    title: '问答12K上下文最高吞吐(token/s)',
    key: 'qa12k_context_max_throughput_tok_s',
    width: 260,
    render(row: TableRow) {
      return `${row.qa12k_context_max_throughput_tok_s}`
    },
  },
])
</script>

<style scoped>
.model-table {
  margin-top: 24px;
}

:deep(.n-data-table-th) {
  font-weight: 600;
}

:deep(.n-data-table-td) {
  white-space: pre-wrap;
}
</style>
