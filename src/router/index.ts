import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/locales'

// 创建基础路由
const baseRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/downloadIndex.vue'),
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import('@/views/resourceCalculator/index.vue'),
  },
  {
    path: '/operation',
    name: 'operation',
    component: () => import('@/views/operation/OperationPage.vue'),
  },
]

// 语言特定路由配置
const languageSpecificRoutes = {
  zh: [
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('@/views/pricing/PricingPage.vue'),
    }
  ],
  en: [] // 英文版本没有特定路由
}

// 动态获取当前路由配置
const getCurrentRoutes = (locale?: string) => {
  const currentLocale = locale || i18n.global.locale.value
  return [
    ...baseRoutes,
    ...(languageSpecificRoutes[currentLocale as 'zh' | 'en'] || []),
    // 添加捕获所有路由的规则，不匹配的路由重定向到首页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
}

// 初始化路由配置
const routes = getCurrentRoutes()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// 监听语言变化，动态更新路由
export const updateRoutesForLanguage = (locale: string) => {
  // 获取新的路由配置
  const newRoutes = getCurrentRoutes(locale)
  
  // 移除所有现有路由
  router.getRoutes().forEach(route => {
    if (route.name) {
      router.removeRoute(route.name)
    }
  })
  
  // 添加新的路由
  newRoutes.forEach(route => {
    router.addRoute(route)
  })
}

export default router
