import { Effect, CostType, EffectType } from './types'
export interface TableRow {
  modelName: string
  scenario: string // 场景
  effect: string // 效果
  modelSizeMoESize: string // 模型大小/MoE大小
  contextWindow: string // 上下文窗口
  optimalMinDeploymentHardware: string // 最佳最小部署硬件
  optimalMinDeploymentCost: string // 最佳最小部署成本
  qa25k_1k_context_concurrent_rpm: number // 问答25K(补全1K)上下文 每分钟并发数
  qa25k_1k_context_max_throughput_tok_s: number // 问答25K(补全1K)上下文 最高吞吐(tok/s)
  qa12k_context_concurrent_rpm: number | string // 问答12K上下文 每分钟并发数
  qa12k_context_max_throughput_tok_s: number | string
}

export const tableData: TableRow[] = [
  {
    modelName: 'Deepseek-v3-0324',
    scenario: '问答',
    effect: Effect[EffectType.good],
    modelSizeMoESize: '671B/37B',
    contextWindow: '128K',
    optimalMinDeploymentHardware: '8张H20',
    optimalMinDeploymentCost: '130W',
    qa25k_1k_context_concurrent_rpm: 8,
    qa25k_1k_context_max_throughput_tok_s: 88,
    qa12k_context_concurrent_rpm: 50,
    qa12k_context_max_throughput_tok_s: 233,
  },
  {
    modelName: 'Qwen3-235B-A22B',
    scenario: '问答',
    effect: Effect[EffectType.medium],
    modelSizeMoESize: '235B/22B',
    contextWindow: '32K',
    optimalMinDeploymentHardware: '4张H20',
    optimalMinDeploymentCost: '65W(无此模组)',
    qa25k_1k_context_concurrent_rpm: 10,
    qa25k_1k_context_max_throughput_tok_s: 96,
    qa12k_context_concurrent_rpm: 28,
    qa12k_context_max_throughput_tok_s: 215,
  },
  {
    modelName: 'Qwen2.5-Coder-32B-Instruct',
    scenario: '问答',
    effect: Effect[EffectType.bad],
    modelSizeMoESize: '32B',
    contextWindow: '128K',
    optimalMinDeploymentHardware: '4张4090',
    optimalMinDeploymentCost: '17W',
    qa25k_1k_context_concurrent_rpm: 8,
    qa25k_1k_context_max_throughput_tok_s: 40,
    qa12k_context_concurrent_rpm: 12,
    qa12k_context_max_throughput_tok_s: 74.3,
  },
  {
    modelName: 'DeepSeek-Coder-V2-Lite-Base',
    scenario: '补全',
    effect: Effect[EffectType.good],
    modelSizeMoESize: '16B/2.4B',
    contextWindow: '128K',
    optimalMinDeploymentHardware: '2张4090',
    optimalMinDeploymentCost: '13W',
    qa25k_1k_context_concurrent_rpm: 368,
    qa25k_1k_context_max_throughput_tok_s: 167,
    qa12k_context_concurrent_rpm: '/',
    qa12k_context_max_throughput_tok_s: '/',
  },
]

// 模型配置数据
export const MODEL_CONFIG = {
  // 代码补全模型配置
  completionModels: {
    'DeepSeek-Coder-V2-Lite-Base': {
      supportedUsers: 368, // 每实例支持的用户数
      gpuType: '4090', // GPU类型
      gpuCardsPerInstance: 2, // 每实例需要的GPU卡数
    },
  },

  // AI程序员/AI Agent模型配置
  aiAgentModels: {
    // 模型部署类型
    'DeepSeek-V3-0324': {
      type: 'deployment',
      supportedUsers: 50,
      gpuType: 'H20',
      gpuCardsPerInstance: 8,
      cost: CostType.high, // 成本标签
      effect: EffectType.good, // 效果标签
    },
    'Qwen3-235B': {
      type: 'deployment',
      supportedUsers: 28,
      gpuType: 'H20',
      gpuCardsPerInstance: 4,
      cost: CostType.medium, // 成本标签
      effect: EffectType.good, // 效果标签
    },
    'Qwen2.5-Coder-32B-Instruct': {
      type: 'deployment',
      supportedUsers: 12,
      gpuType: '4090',
      gpuCardsPerInstance: 4,
      cost: CostType.low, // 成本标签
      effect: EffectType.bad, // 效果标签
    },
    // API服务购买类型
    Claude4: {
      type: 'api',
      costPerUserPerMonth: 100, // 每人每月平均成本预估（元）
      cost: CostType.high, // 成本标签
      effect: EffectType.excellent, // 效果标签
    },
    'GPT4.1-Mini': {
      type: 'api',
      costPerUserPerMonth: 10, // 每人每月平均成本预估（元）
      cost: CostType.low, // 成本标签
      effect: EffectType.good, // 效果标签
    },
  },

  // 后台服务配置
  backendService: {
    supportedUsers: 1000, // 每后台实例支持的用户数
    cpuCores: 40, // 每实例需要的CPU核心数
    memory: 256, // 每实例需要的内存（GB）
    disk: 1, // 每实例需要的磁盘（TB）
  },

  // GPU服务器配置
  gpuServer: {
    H100: {
      maxCardsPerServer: 8, // 每台服务器最多可安装的GPU卡数
    },
    '4090': {
      maxCardsPerServer: 8, // 每台服务器最多可安装的GPU卡数
      baseServerCost: 90000, // 裸机器成本
      cardCost: 20000, // 每张卡成本
    },
    H20: {
      maxCardsPerServer: 8, // 每台服务器最多可安装的GPU卡数
      // H20 服务器整体价格
      serverPrices: {
        8: 1300000, // 8卡 H20 服务器价格
        4: 650000, // 4卡 H20 服务器价格
      },
    },
  },
}
