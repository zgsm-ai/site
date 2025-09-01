<template>
  <div class="model-table">
    <n-card title="模型对比" :bordered="true" size="small">
      <n-data-table :columns="columns" :data="tableData" :bordered="true" :single-line="false" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { NCard, NDataTable } from 'naive-ui'
import { type TableRow, getModelDataByVersion } from '../constants'

// 定义组件名
defineOptions({
  name: 'ModelTable',
})

// 定义 props
interface Props {
  version: 'standard' | 'basic'
}

const props = defineProps<Props>()

// 根据版本获取表格数据
const tableData = computed(() => getModelDataByVersion(props.version))

// 定义列配置
const columns = computed(() => [
  {
    title: '模型类型',
    key: 'modelType',
    width: 120,
    fixed: 'left' as const,
  },
  {
    title: '占用卡数',
    key: 'cardCount',
    width: 100,
  },
  {
    title: '模型全称',
    key: 'fullName',
    width: 250,
  },
  {
    title: '模型大小/MoE大小',
    key: 'parameters',
    width: 160,
  },
  {
    title: '上下文窗口',
    key: 'contextWindow',
    width: 120,
  },
  {
    title: '问答25K(补全1K)上下文 每分钟并发数',
    key: 'concurrentRpm',
    width: 280,
    render(row: TableRow) {
      return `${row.concurrentRpm}${typeof row.concurrentRpm === 'number' ? ' RPM' : ''}`
    },
  },
  {
    title: '问答25K(补全1K)上下文 最高吞吐(token/s)',
    key: 'maxThroughput',
    width: 320,
    render(row: TableRow) {
      return `${row.maxThroughput}${typeof row.maxThroughput === 'number' ? ' tokens/s' : ''}`
    },
  },
  {
    title: '并发性能',
    key: 'performance',
    width: 400,
    render(row: TableRow) {
      return h(
        'div',
        {
          style: {
            whiteSpace: 'pre-wrap',
            lineHeight: '1.5',
          },
        },
        {
          default: () => row.performance || '-',
        },
      )
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
