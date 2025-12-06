import './index.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import i18n from './locales' // 引入 i18n 实例

const app = createApp(App)

app.use(router)
app.use(i18n) // 挂载 i18n

app.mount('#app')
