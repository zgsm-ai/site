import { createI18n } from 'vue-i18n'
import zh from './zh.json'
import en from './en.json'

const i18n = createI18n({
  legacy: false, // 我们将使用 Composition API 模式
  locale: 'zh', // 设置默认语言环境
  fallbackLocale: 'en', // 设置备用语言环境
  messages: {
    zh,
    en,
  },
  // 如果希望在模板的区域设置中全局注入 t 函数，请取消注释以下内容
  // globalInjection: true,
  // 如果希望在 setup 中使用 t 函数，请确保 legacy 设置为 false
})

export default i18n
