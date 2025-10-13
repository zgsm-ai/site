<template>
  <div class="navbar fixed w-full z-1000 flex h-17 px-13 top-0" :class="{ 'not-homepage': notHomePage }">
    <!-- Logo 和应用名称 -->
    <div class="flex items-center h-[68px] cursor-pointer" @click="toHome">
      <img class="w-[28px] mr-3" src="@/assets/logo.png" />
      <div class="text-[#F4F8FF] text-base">{{ t('header.appName') }}</div>
    </div>
    <div class="flex items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 navbar-menu">
      <div class="px-5 text-[#c3defa] cursor-pointer text-center hover:text-white" v-for="item in menuOptions"
        :key="item.key" @click="handleMenuItemClick(item.key)">
        {{ item.label }}
      </div>
    </div>
    <div class="flex items-center ml-auto">
      <div class="github-icon cursor-pointer w-6 h-6 opacity-70 text-white mr-3 flex items-center justify-center"
        @click="openGithub">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.763 5.556 17.91 5.556 17.91C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.146C5.455 7.843 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.629 18.545 7.843 18.421 8.146C19.191 8.993 19.656 10.063 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.606 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.505 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"
            fill="currentColor" />
        </svg>
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
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { NPopover } from 'naive-ui'
// 定义组件名称为多词以符合 Vue 规范
defineOptions({
  name: 'NavbarComponent',
})
const { t, locale } = useI18n()
const router = useRouter()

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
    window.open('https://docs.costrict.ai/introduction')
    return
  } else if (key === 'operation') {
    window.open('https://zgsm.sangfor.com/credit/manager/')
  }
  router.push({ name: key })
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
</style>
