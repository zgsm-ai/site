<template>
  <div class="navbar fixed w-full z-1000 flex h-17 px-13 top-0"
    :class="{ 'not-homepage': notHomePage, 'bg-black': isMobile }">
    <!-- Logo 和应用名称 -->
    <div class="flex items-center h-[68px] cursor-pointer" @click="toHome">
      <img class="w-[28px] mr-3" src="@/assets/logo.png" />
      <div class="text-[#F4F8FF] text-base">{{ t('header.appName') }}</div>
    </div>
    <!-- 桌面端导航菜单 -->
    <div v-if="!isMobile"
      class="flex items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 navbar-menu">
      <div class="px-5 text-[#c3defa] cursor-pointer text-center hover:text-white text-nowrap"
        v-for="item in menuOptions" :key="item.key" @click="handleMenuItemClick(item.key)">
        {{ item.label }}
      </div>
    </div>

    <!-- 移动端汉堡菜单 -->
    <div v-else class="flex items-center ml-auto">
      <!-- 汉堡菜单 -->
      <div class="hamburger-menu" :class="{ 'active': isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <!-- 桌面端右侧操作区 -->
    <div v-if="!isMobile" class="flex items-center ml-auto">
      <div class="github-icon cursor-pointer mt-0.5 opacity-70 text-white mr-3 flex items-center justify-center"
        @click="openGithub">
        <div class="w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.763 5.556 17.91 5.556 17.91C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.146C5.455 7.843 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.629 18.545 7.843 18.421 8.146C19.191 8.993 19.656 10.063 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.606 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.505 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"
              fill="currentColor" />
          </svg>
        </div>
        <span v-if="githubStars > 0" class="ml-2 text-sm text-white opacity-80">{{ formatStarCount(githubStars)
          }}</span>
      </div>
      <n-popover trigger="click" :show="isPopoverOpen" @update:show="isPopoverOpen = $event" :show-arrow="false"
        style="padding: 0" placement="bottom-end">
        <template #trigger>
          <div class="px-2 py-1 text-white cursor-pointer text-sm flex items-center hover:bg-white/10 hover:rounded">
            {{ currentLangLabel }}
            <span class="arrow ml-2" :class="{ 'arrow-up': isPopoverOpen }">▼</span>
          </div>
        </template>
        <div class="w-[200px]">
          <div v-for="option in languageOptions" :key="option.key"
            class="px-3 py-[10px] cursor-pointer text-white bg-[#004093] hover:bg-[#197dff]"
            :class="{ 'lang-active': locale === option.key }" @click="handleSelectLang(option.key)">
            {{ option.label }}
          </div>
        </div>
      </n-popover>
    </div>

    <!-- 移动端侧边菜单 -->
    <div v-if="isMobile" class="mobile-menu" :class="{ 'open': isMenuOpen }">
      <div class="mobile-menu-header">
        <div class="close-menu" @click="closeMenu">×</div>
      </div>

      <div class="mobile-menu-items">
        <div class="mobile-menu-item" v-for="item in menuOptions" :key="item.key"
          :class="{ 'menu-active': router.currentRoute.value.name === item.key }"
          @click="handleMobileMenuItemClick(item.key)">
          {{ item.label }}
        </div>

        <!-- 语言切换选项 -->
        <div class="mobile-menu-item lang-item" @click="toggleLangMenu">
          {{ currentLangLabel }}
          <span class="lang-arrow" :class="{ 'lang-arrow-up': isLangMenuOpen }">▼</span>
        </div>

        <!-- 语言切换子菜单 -->
        <div v-if="isLangMenuOpen" class="mobile-lang-submenu">
          <div v-for="option in languageOptions" :key="option.key" class="mobile-lang-subitem"
            :class="{ 'lang-active': locale === option.key }" @click="handleSelectLangMobile(option.key)">
            {{ option.label }}
          </div>
        </div>

        <!-- GitHub star 数量 -->
        <div class="mobile-menu-item github-item" @click="openGithub">
          <div class="github-icon cursor-pointer mt-0.5 opacity-70 text-white flex items-center justify-center">
            <div class="w-6 h-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.763 5.556 17.91 5.556 17.91C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.146C5.455 7.843 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.629 18.545 7.843 18.421 8.146C19.191 8.993 19.656 10.063 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.606 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.505 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"
                  fill="currentColor" />
              </svg>
            </div>
            <span v-if="githubStars > 0" class="ml-2 text-sm text-white opacity-80">{{ formatStarCount(githubStars)
              }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 移动端遮罩层 -->
    <div v-if="isMobile" class="mobile-menu-overlay" :class="{ 'open': isMenuOpen }" @click="closeMenu"></div>

  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { NPopover } from 'naive-ui'
// 定义组件名称为多词以符合 Vue 规范
defineOptions({
  name: 'NavbarComponent',
})
const { t, locale } = useI18n()
const router = useRouter()

const isEn = computed(() => locale.value === 'en')

// GitHub star 数量
const githubStars = ref(0)

// 响应式状态管理
const isMobile = ref(false)
const isMenuOpen = ref(false)
const isLangMenuOpen = ref(false)
const mobileBreakpoint = computed(() => isEn.value ? 1280 : 968)

// 保存原始的overflow样式
const originalOverflow = ref('')

// 锁定页面滚动
const lockBodyScroll = () => {
  if (typeof document !== 'undefined') {
    originalOverflow.value = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
}

// 解锁页面滚动
const unlockBodyScroll = () => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = originalOverflow.value || ''
  }
}

// 检测屏幕宽度
const checkMobile = () => {
  const wasMobile = isMobile.value
  isMobile.value = window.innerWidth < mobileBreakpoint.value
  // 如果从移动端切换到桌面端，关闭菜单并解锁滚动
  if (wasMobile && !isMobile.value) {
    isMenuOpen.value = false
    unlockBodyScroll()
  }
}

// 处理窗口大小变化
const handleResize = () => {
  checkMobile()
}

// 切换菜单状态
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value && isMobile.value) {
    lockBodyScroll()
  } else {
    unlockBodyScroll()
  }
}

// 关闭菜单
const closeMenu = () => {
  isMenuOpen.value = false
  isLangMenuOpen.value = false
  unlockBodyScroll()
}

// 切换语言菜单
const toggleLangMenu = () => {
  isLangMenuOpen.value = !isLangMenuOpen.value
}

// 关闭语言菜单
const closeLangMenu = () => {
  isLangMenuOpen.value = false
}

// 移动端语言选择处理
const handleSelectLangMobile = (key: string) => {
  locale.value = key
  closeLangMenu()
}

interface MenuOption {
  label: string // This will now hold the translated string
  key: string
}

const menuOptions = computed<MenuOption[]>(() => [
  {
    label: t('menu.home'),
    key: 'home',
  },
  {
    label: t('menu.download'),
    key: 'download',
  },
  {
    label: t('menu.installGuide'),
    key: 'install',
  },
  {
    label: t('menu.docs'),
    key: 'docs'
  },
  {
    label: t('menu.operation'),
    key: 'operation',
  },
])
const handleMenuItemClick = (key: string) => {
  if (key === 'oss') {
    window.open('https://github.com/zgsm-ai/costrict')
    return
  } else if (key === 'docs') {
    window.open('https://docs.costrict.ai')
    return
  } else if (key === 'install') {
    window.open('https://docs.costrict.ai/deployment/introduction/')
    return
  }
  router.push({ name: key })
}

// 移动端菜单项点击处理
const handleMobileMenuItemClick = (key: string) => {
  handleMenuItemClick(key)
  closeMenu()
}

const languageOptions = ref([
  { label: '中文', key: 'zh' },
  { label: 'English', key: 'en' },
])
const isPopoverOpen = ref(false)

const currentLangLabel = computed(() => {
  return (
    languageOptions.value.find((item) => item.key === locale.value)?.label ||
    languageOptions.value[0].label
  )
})
const handleSelectLang = (key: string) => {
  locale.value = key
  isPopoverOpen.value = false
  closeLangMenu()
}

const notHomePage = computed(() => {
  return router.currentRoute.value.name !== 'home'
})

const toHome = () => {
  router.push({ name: 'home' })
}

const openGithub = () => {
  window.open('https://github.com/zgsm-ai/costrict')
}

// GitHub star 缓存配置
const GITHUB_STARS_CACHE_KEY = 'github_stars_cache'

// 获取缓存的 GitHub star 数量
const getCachedGithubStars = (): number | null => {
  try {
    const cached = localStorage.getItem(GITHUB_STARS_CACHE_KEY)
    if (cached) {
      const { stars } = JSON.parse(cached)
      return stars
    }
  } catch (error) {
    console.error('读取 GitHub star 缓存失败:', error)
  }
  return null
}

// 设置 GitHub star 缓存
const setCachedGithubStars = (stars: number) => {
  try {
    const cacheData = {
      stars
    }
    localStorage.setItem(GITHUB_STARS_CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    console.error('设置 GitHub star 缓存失败:', error)
  }
}

// 获取 GitHub star 数量（带缓存）
const fetchGithubStars = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/zgsm-ai/costrict', {
      headers: {
        "Authorization": "",
      }
    })
    if (response.ok) {
      const data = await response.json()
      const stars = data.stargazers_count || 0
      githubStars.value = stars
      // 设置缓存
      setCachedGithubStars(stars)
    } else {
      // 获取失败时使用缓存
      const cachedStars = getCachedGithubStars()
      if (cachedStars !== null) {
        githubStars.value = cachedStars
      }
    }
  } catch (error) {
    console.error('获取 GitHub star 数量失败:', error)
    // 发生错误时使用缓存
    const cachedStars = getCachedGithubStars()
    if (cachedStars !== null) {
      githubStars.value = cachedStars
    }
  }
}

// 格式化 star 数量显示
const formatStarCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

// 组件挂载时获取 star 数量和初始化响应式状态
onMounted(() => {
  fetchGithubStars()
  checkMobile()
  window.addEventListener('resize', handleResize)
})

// 组件卸载时清理事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  unlockBodyScroll() // 确保组件卸载时恢复滚动
})
</script>

<style lang="less" scoped>
.lang-active {
  color: #fff;
}

.arrow {
  transition: transform 0.2s ease;

  &.arrow-up {
    transform: rotate(180deg);
  }
}

.not-homepage {
  background: #000;
}

.navbar-menu {
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(50px);
  height: 48px;
}

.github-icon {
  transition: color 0.2s ease;

  &:hover {
    color: white;
    opacity: 1;
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

// 汉堡菜单样式
.hamburger-menu {
  width: 24px;
  height: 18px;
  position: relative;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #fff;
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0px;
    }

    &:nth-child(2) {
      top: 8px;
    }

    &:nth-child(3) {
      top: 16px;
    }
  }

  &.active {
    span {
      &:nth-child(1) {
        top: 8px;
        transform: rotate(135deg);
      }

      &:nth-child(2) {
        opacity: 0;
        left: -60px;
      }

      &:nth-child(3) {
        top: 8px;
        transform: rotate(-135deg);
      }
    }
  }
}

// 移动端侧边菜单样式
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1001;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;

  &.open {
    right: 0;
  }

  .mobile-menu-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .close-menu {
      font-size: 30px;
      color: #fff;
      cursor: pointer;
      line-height: 1;
    }
  }

  .mobile-menu-items {
    flex: 1;
    padding: 20px 0;

    .mobile-menu-item {
      padding: 15px 20px;
      color: #c3defa;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
      }

      &.menu-active {
        color: #fff;
        background: rgba(25, 125, 255, 0.2);
      }
    }
  }

  .mobile-menu-footer {
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;

    .github-icon {
      align-self: flex-start;
    }
  }
}

// 遮罩层样式
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  &.open {
    opacity: 1;
    visibility: visible;
  }
}

// GitHub菜单项样式
.github-item {
  .github-icon {
    justify-content: flex-start;
  }
}

// 语言切换菜单项样式
.lang-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .lang-arrow {
    font-size: 12px;
    transition: transform 0.2s ease;

    &.lang-arrow-up {
      transform: rotate(180deg);
    }
  }
}

// 语言切换子菜单样式
.mobile-lang-submenu {
  background: rgba(0, 0, 0, 0.3);
  margin: 0 20px;
  border-radius: 8px;
  overflow: hidden;

  .mobile-lang-subitem {
    padding: 12px 16px;
    color: #c3defa;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    &:first-child {
      border-radius: 8px 8px 0 0;
    }

    &:last-child {
      border-radius: 0 0 8px 8px;
    }

    &.lang-active {
      color: #fff;
      background: rgba(25, 125, 255, 0.2);
    }
  }
}

// 响应式样式调整
@media (max-width: 967px) {
  .navbar {
    padding: 0 20px;
  }
}
</style>
