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
  ],
})

export default router
