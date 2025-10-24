import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/preview',
      name: 'preview',
      component: () => import('@/views/preview/FilePreview.vue'),
    },
    {
      path: '/md-preview',
      name: 'md-preview',
      component: () => import('@/views/preview/MarkdownPreview.vue'),
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
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
