import { reactive } from 'vue'
import type {
  DeploymentModel,
  ApiModel,
  GpuServers,
  FormData,
  Results,
  TotalResources,
} from '../types'
import { MODEL_CONFIG } from '../constants'

export function useResourceCalculator() {
  // 结果数据
  const results = reactive<Results>({
    completion: null,
    aiAgent: [],
    backend: null,
  })

  // 总资源统计
  const totalResources = reactive<TotalResources>({
    gpuServers: {},
    cpuCores: 0,
    memory: 0,
    disk: 0,
    apiCosts: 0,
    gpuCosts: 0,
  })

  // 计算GPU服务器需求
  const calculateGpuServers = (gpuType: string, totalCards: number) => {
    const maxCardsPerServer =
      MODEL_CONFIG.gpuServer[gpuType as keyof typeof MODEL_CONFIG.gpuServer].maxCardsPerServer
    const fullServers = Math.floor(totalCards / maxCardsPerServer)
    const remainingCards = totalCards % maxCardsPerServer

    const servers: Record<string, number> = {}

    if (fullServers > 0) {
      servers[`${maxCardsPerServer}卡`] = fullServers
    }

    if (remainingCards > 0) {
      servers[`${remainingCards}卡`] = 1
    }

    return {
      type: gpuType,
      servers,
      totalCards,
    }
  }

  // 计算GPU成本
  const calculateGpuCost = (gpuType: string, servers: Record<string, number>) => {
    const gpuConfig = MODEL_CONFIG.gpuServer[gpuType as keyof typeof MODEL_CONFIG.gpuServer]
    let totalCost = 0

    if (gpuType === '4090') {
      // 4090 计算方式：裸机器成本 + 卡数 * 每张卡成本
      const config = gpuConfig as {
        maxCardsPerServer: number
        baseServerCost: number
        cardCost: number
      }
      Object.entries(servers).forEach(([cardConfig, serverCount]) => {
        const cardCount = parseInt(cardConfig.replace('卡', ''))
        const serverCost = config.baseServerCost + cardCount * config.cardCost
        totalCost += serverCost * serverCount
      })
    } else if (gpuType === 'H20') {
      // H20 计算方式：根据卡数对应的整体价格
      const config = gpuConfig as {
        maxCardsPerServer: number
        serverPrices: Record<number, number>
      }
      Object.entries(servers).forEach(([cardConfig, serverCount]) => {
        const cardCount = parseInt(cardConfig.replace('卡', ''))
        let serverCost = 0

        if (config.serverPrices && config.serverPrices[cardCount]) {
          serverCost = config.serverPrices[cardCount]
        } else {
          // 如果没有预定义的价格，按比例计算（以8卡为基准）
          const basePrice = config.serverPrices?.[8] || 1300000
          serverCost = (basePrice * cardCount) / 8
        }

        totalCost += serverCost * serverCount
      })
    }

    return totalCost
  }

  // 更新总GPU资源
  const updateTotalGpuResources = (gpuServers: GpuServers) => {
    const gpuType = gpuServers.type

    if (!totalResources.gpuServers[gpuType]) {
      totalResources.gpuServers[gpuType] = {
        servers: {},
        totalCards: 0,
      }
    }

    totalResources.gpuServers[gpuType].totalCards += gpuServers.totalCards

    // 重新计算服务器数量
    const maxCardsPerServer =
      MODEL_CONFIG.gpuServer[gpuType as keyof typeof MODEL_CONFIG.gpuServer].maxCardsPerServer
    const fullServers = Math.floor(
      totalResources.gpuServers[gpuType].totalCards / maxCardsPerServer,
    )
    const remainingCards = totalResources.gpuServers[gpuType].totalCards % maxCardsPerServer

    totalResources.gpuServers[gpuType].servers = {}

    if (fullServers > 0) {
      totalResources.gpuServers[gpuType].servers[`${maxCardsPerServer}卡`] = fullServers
    }

    if (remainingCards > 0) {
      totalResources.gpuServers[gpuType].servers[`${remainingCards}卡`] = 1
    }
  }

  // 计算代码补全模型资源
  const calculateCompletionResources = (formData: FormData, concurrentDeveloperCount: number) => {
    if (!formData.enableCodeCompletion) {
      results.completion = null
      return
    }

    const modelConfig =
      MODEL_CONFIG.completionModels[
        formData.selectedCompletionModel as keyof typeof MODEL_CONFIG.completionModels
      ]

    if (modelConfig) {
      const instancesNeeded = Math.ceil(concurrentDeveloperCount / modelConfig.supportedUsers)
      const totalGpuCards = instancesNeeded * modelConfig.gpuCardsPerInstance
      const gpuServers = calculateGpuServers(modelConfig.gpuType, totalGpuCards)

      // 更新总资源
      updateTotalGpuResources(gpuServers)

      results.completion = {
        modelName: formData.selectedCompletionModel,
        instancesNeeded,
        gpuServers,
      }
    }
  }

  // 计算AI Agent资源
  const calculateAIAgentResources = (formData: FormData, concurrentDeveloperCount: number) => {
    results.aiAgent = []

    if (!formData.enableAIAgent) {
      return
    }

    const selectedModels = Object.keys(formData.selectedAIModels).filter(
      (model) => formData.selectedAIModels[model],
    )

    selectedModels.forEach((modelName) => {
      const modelConfig =
        MODEL_CONFIG.aiAgentModels[modelName as keyof typeof MODEL_CONFIG.aiAgentModels]
      const ratio = (formData.modelRatios[modelName] || 100) / 100

      if (modelConfig) {
        if (modelConfig.type === 'deployment') {
          // 计算部署模型资源
          const deploymentConfig = modelConfig as DeploymentModel
          const usersForThisModel = Math.ceil(concurrentDeveloperCount * ratio)
          const instancesNeeded = Math.ceil(usersForThisModel / deploymentConfig.supportedUsers)
          const totalGpuCards = instancesNeeded * deploymentConfig.gpuCardsPerInstance
          const gpuServers = calculateGpuServers(deploymentConfig.gpuType, totalGpuCards)

          // 更新总资源
          updateTotalGpuResources(gpuServers)

          results.aiAgent.push({
            modelName,
            type: 'deployment',
            ratio: formData.modelRatios[modelName] || 100,
            usersForThisModel,
            instancesNeeded,
            gpuServers,
          })
        } else if (modelConfig.type === 'api') {
          // 计算API服务成本
          const apiConfig = modelConfig as ApiModel
          const usersForThisModel = Math.ceil(concurrentDeveloperCount * ratio)
          const monthlyCost = usersForThisModel * apiConfig.costPerUserPerMonth

          // 更新总资源
          totalResources.apiCosts += monthlyCost

          results.aiAgent.push({
            modelName,
            type: 'api',
            ratio: formData.modelRatios[modelName] || 100,
            usersForThisModel,
            monthlyCost,
          })
        }
      }
    })
  }

  // 计算后台服务资源
  const calculateBackendResources = (concurrentDeveloperCount: number) => {
    const backendConfig = MODEL_CONFIG.backendService
    const backendInstancesNeeded = Math.ceil(
      concurrentDeveloperCount / backendConfig.supportedUsers,
    )
    const totalCpuCores = backendInstancesNeeded * backendConfig.cpuCores
    const totalMemory = backendInstancesNeeded * backendConfig.memory
    const totalDisk = backendInstancesNeeded * backendConfig.disk

    // 更新总资源
    totalResources.cpuCores += totalCpuCores
    totalResources.memory += totalMemory
    totalResources.disk += totalDisk

    results.backend = {
      instancesNeeded: backendInstancesNeeded,
      totalCpuCores,
      totalMemory,
      totalDisk,
    }
  }

  // 计算总GPU成本
  const calculateTotalGpuCosts = () => {
    totalResources.gpuCosts = 0
    Object.entries(totalResources.gpuServers).forEach(([gpuType, gpuData]) => {
      const cost = calculateGpuCost(gpuType, gpuData.servers)
      totalResources.gpuCosts += cost
    })
  }

  // 重置总资源
  const resetTotalResources = () => {
    totalResources.gpuServers = {}
    totalResources.cpuCores = 0
    totalResources.memory = 0
    totalResources.disk = 0
    totalResources.apiCosts = 0
    totalResources.gpuCosts = 0
  }

  // 主要计算函数
  const calculateResources = (formData: FormData) => {
    const concurrentDeveloperCount = formData.concurrentDeveloperCount

    // 重置总资源和结果
    resetTotalResources()
    results.completion = null
    results.aiAgent = []
    results.backend = null

    // 计算各项资源
    calculateCompletionResources(formData, concurrentDeveloperCount)
    calculateAIAgentResources(formData, concurrentDeveloperCount)
    calculateBackendResources(concurrentDeveloperCount)
    calculateTotalGpuCosts()
  }

  // 初始化AI模型选择
  const initializeAIModelSelection = (formData: FormData) => {
    const deploymentModelNames = Object.keys(MODEL_CONFIG.aiAgentModels).filter(
      (name) =>
        MODEL_CONFIG.aiAgentModels[name as keyof typeof MODEL_CONFIG.aiAgentModels].type ===
        'deployment',
    )

    if (
      deploymentModelNames.length > 0 &&
      !Object.values(formData.selectedAIModels).some(Boolean)
    ) {
      formData.selectedAIModels[deploymentModelNames[0]] = true
      formData.modelRatios[deploymentModelNames[0]] = 100
    }
  }

  return {
    results,
    totalResources,
    calculateResources,
    initializeAIModelSelection,
  }
}
