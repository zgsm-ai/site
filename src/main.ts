import './index.css'
import './styles/tokens.css'
import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
import i18n from './locales'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.use(i18n)
app.mount('#app')
