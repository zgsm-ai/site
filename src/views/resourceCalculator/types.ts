// 类型定义

export enum CostType {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
export const Cost = {
  [CostType.low]: '低',
  [CostType.medium]: '中',
  [CostType.high]: '高',
} as const

export enum EffectType {
  excellent = 'excellent',
  good = 'good',
  medium = 'medium',
  bad = 'bad',
}
export const Effect = {
  [EffectType.excellent]: '优',
  [EffectType.good]: '良',
  [EffectType.medium]: '中',
  [EffectType.bad]: '差',
} as const
export interface DeploymentModel {
  type: 'deployment'
  supportedUsers: number
  gpuType: string
  gpuCardsPerInstance: number
  cost: keyof typeof Cost // 成本标签：'低', '中', '高'
  effect: keyof typeof Effect // 效果标签：'优', '良', '中', '差'
}

export interface ApiModel {
  type: 'api'
  costPerUserPerMonth: number
  cost: keyof typeof Cost // 成本标签：'低', '中', '高'
  effect: keyof typeof Effect // 效果标签：'优', '良', '中', '差'
}

export interface GpuServers {
  type: string
  servers: Record<string, number>
  totalCards: number
}

export interface CompletionResult {
  modelName: string
  instancesNeeded: number
  gpuServers: GpuServers
}

export interface AIAgentResult {
  modelName: string
  type: 'deployment' | 'api'
  ratio: number
  usersForThisModel: number
  instancesNeeded?: number
  gpuServers?: GpuServers
  monthlyCost?: number
}

export interface BackendResult {
  instancesNeeded: number
  totalCpuCores: number
  totalMemory: number
  totalDisk: number
}

// 结果数据类型定义
export interface Results {
  completion: CompletionResult | null
  aiAgent: AIAgentResult[]
  backend: BackendResult | null
}

// 总资源统计类型定义
export interface TotalResources {
  gpuServers: Record<string, { servers: Record<string, number>; totalCards: number }>
  cpuCores: number
  memory: number
  disk: number
  apiCosts: number
  gpuCosts: number
}

export interface FormData {
  developerCount: number
  vscodeActiveRatio: number
  vscodeActiveUsers: number
  concurrentDeveloperCount: number
  enableCodeCompletion: boolean
  selectedCompletionModel: string
  enableAIAgent: boolean
  selectedAIModels: Record<string, boolean>
  modelRatios: Record<string, number>
}
