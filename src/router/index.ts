import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/locales'

// 静态路由配置 - 不再动态增删
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/download/index.vue'),
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
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import('@/views/pricing/PricingPage.vue'),
    meta: {
      // 标记此路由仅在中文环境显示
      localeVisible: ['zh'],
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// 导航守卫：检查路由的语言可见性
router.beforeEach((to, from, next) => {
  const currentLocale = i18n.global.locale.value
  const allowedLocales = to.meta.localeVisible as string[] | undefined

  // 如果路由有 localeVisible 限制，且当前语言不在允许列表中
  if (allowedLocales && !allowedLocales.includes(currentLocale)) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
