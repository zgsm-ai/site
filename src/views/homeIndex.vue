<template>
  <div class="container" :class="{ notIndex: !isIndex }">
    <div class="container-header">
      <div
        class="header-logo"
        @click="showIndex"
        :class="[locale === 'zh' ? 'logo-margin-zh' : 'logo-margin-en']"
      >
        <img class="logo-icon" src="@/assets/logo.png" />
        <p>{{ t('header.appName') }}</p>
      </div>
      <ul class="header-menu">
        <li
          class="header-menu-item"
          v-for="item in menuOptions"
          :key="item.key"
          :class="{ active: activeMenu === item.key }"
          @click="clickMenu(item)"
        >
          {{ item.label }}
        </li>
      </ul>
      <div class="header-lang-switcher">
        <n-popover
          trigger="click"
          :show="isPopoverOpen"
          @update:show="isPopoverOpen = $event"
          :show-arrow="false"
          style="padding: 0"
          placement="bottom-end"
        >
          <template #trigger>
            <div class="lang-trigger">
              {{ currentLangLabel }}
              <span class="arrow" :class="{ 'arrow-up': isPopoverOpen }">▼</span>
            </div>
          </template>
          <div class="lang-options">
            <div
              v-for="option in languageOptions"
              :key="option.key"
              class="lang-option"
              :class="{ active: locale === option.key }"
              @click="handleSelectLang(option.key)"
            >
              {{ option.label }}
            </div>
          </div>
        </n-popover>
      </div>
    </div>
    <template v-if="isIndex">
      <div class="container-main">
        <div class="index-page">
          <div class="page-header">
            <div class="page-header-container">
              <p class="title">{{ t('home.welcomeTitle') }}</p>
              <img :src="t('home.icon')" class="page-header-icon" />
            </div>
            <p class="sub-title">{{ t('home.welcomeSubtitle') }}</p>
            <p class="desc">
              {{ t('home.welcomeDesc') }}
            </p>
          </div>
          <div class="page-btns">
            <div class="label-img"><img :src="t('home.companyLabel')" /></div>
            <div class="label-img"><img :src="t('home.personLabel')" /></div>
          </div>
        </div>
        <div class="case-page">
          <div class="page-item" v-for="(item, index) in caseList" :key="index">
            <img :src="item.titleImg" />
            <p class="item-title">
              <span>{{ item.title }}</span>
            </p>
            <p class="item-desc">{{ item.desc }}</p>
            <div class="item-img" :class="`img-${index + 1} item-img-${locale}`">
              <img :src="item.imgUrl" />
            </div>
          </div>
          <div class="page-item">
            <img :src="t('home.case4.titleImg')" />
            <div class="feature-container" :class="`feature-container-${locale}`">
              <div v-for="(item, i) in featureList" :key="i" class="feature-item">
                <img class="feature-item_img" :src="item.img" />
              </div>
            </div>
          </div>
          <div class="page-item">
            <p class="item-title">
              <span>{{ t('home.ideSupport.title') }}</span>
            </p>
            <p class="item-desc">
              {{ t('home.ideSupport.desc') }}
            </p>
            <div class="item-img">
              <img :src="t('home.case5.pageImg')" />
            </div>
          </div>
        </div>
      </div>
      <div class="container-footer">
        <div class="community-page">
          <div class="page-item">
            <p class="item-title">{{ t('footer.openSource.title') }}</p>
            <p class="item-desc description">{{ t('footer.openSource.desc') }}</p>
            <p class="item-desc">
              <span>{{ t('footer.contactUs') }}</span>
              <span class="divider">|</span>
              <span class="contact">zgsm@sangfor.com.cn</span>
            </p>
          </div>
        </div>
        <div class="copyright">
          <p>{{ t('footer.copyright.company') }}</p>
          <template v-if="locale === 'zh'">
            <p>
              <img src="@/assets/copyright_btn.png" />
              <span>{{ t('footer.copyright.icp') }}</span>
            </p>
            <p>
              <img src="@/assets/copyright_btn.png" />
              <span>{{ t('footer.copyright.gongan') }}</span>
            </p>
            <p>{{ t('footer.copyright.license') }}</p>
          </template>
        </div>
      </div>
    </template>
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NPopover } from 'naive-ui'

const { t, locale } = useI18n()
import caseImg3 from '@/assets/case_page_img3.png'
import { useRouter } from 'vue-router'
import { debounce } from '@/utils/common'

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
    label: t('menu.openSource'),
    key: 'blog',
  },
  {
    label: t('menu.installGuide'),
    key: 'download',
  },
])

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

interface CaseItem {
  titleImg: string
  title: string // This will now hold the translated string
  desc: string // This will now hold the translated string
  imgUrl: string
}

const caseList = computed<CaseItem[]>(() => {
  return [
    {
      titleImg: t('home.case1.titleImg'),
      title: t('home.case1.title'),
      desc: t('home.case1.desc'),
      imgUrl: t('home.case1.pageImg'),
    },
    {
      titleImg: t('home.case2.titleImg'),
      title: t('home.case2.title'),
      desc: t('home.case2.desc'),
      imgUrl: t('home.case2.pageImg'),
    },
    {
      titleImg: t('home.case3.titleImg'),
      title: t('home.case3.title'),
      desc: t('home.case3.desc'),
      imgUrl: caseImg3,
    },
  ]
})

const featureList = computed(() => {
  const caseList = [
    {
      img: t('home.case4.feature1'),
    },
    {
      img: t('home.case4.feature2'),
    },
    {
      img: t('home.case4.feature3'),
    },
    {
      img: t('home.case4.feature4'),
    },
    {
      img: t('home.case4.feature5'),
    },
  ]
  if (locale.value === 'en') {
    caseList.pop()
  }
  return caseList
})

const activeMenu = ref('home')

const router = useRouter()
const isIndex = computed(() => {
  return router.currentRoute.value.path === '/'
})

const clickMenu = (item: MenuOption) => {
  activeMenu.value = item.key
  if (item.key === 'home') {
    showIndex()
  } else if (item.key === 'download') {
    showDownload()
  } else {
    showGitHub()
  }
}

const showGitHub = () => {
  window.open('https://github.com/zgsm-ai/zgsm')
}

const showIndex = () => {
  activeMenu.value = 'home'
  router.push('/')
}
const showDownload = () => {
  activeMenu.value = 'download'
  router.push('/download')
}

const handleSelectLang = (key: string) => {
  locale.value = key
  isPopoverOpen.value = false
}

// 页面滚动到 1000 px 时，将container-header 固定到页面顶部, 添加防抖效果
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const header = document.querySelector('.container-header') as HTMLElement
  if (scrollTop > document.documentElement.clientHeight) {
    header!.style.backgroundColor = '#0c1c34'
  } else if (scrollTop > 0) {
    header!.style.backgroundColor = 'rgba(12, 28, 52, 0.4)'
  } else {
    header!.style.backgroundColor = 'transparent'
  }
}
window.addEventListener('scroll', debounce(handleScroll, 100))
</script>

<style scoped lang="less">
.container {
  position: relative;
  min-height: 100%;
  padding-top: 68px;
  background: url(@/assets/header_bg.png) no-repeat top center #0c1c34;
  &.notIndex {
    background: url(@/assets/login_bg.png) no-repeat top center #0c1c34;
  }
  .container-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: 68px;
    padding: 0 52px;
    z-index: 1;

    .header-logo {
      display: flex;
      align-items: center;
      // margin-right: 70px; // Removed fixed margin, will be handled by dynamic class
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      .logo-icon {
        width: 28px;
        margin-right: 12px;
      }
    }
    .logo-margin-zh {
      margin-right: 80px;
    }
    .logo-margin-en {
      margin-right: 40px;
    }
    .header-menu {
      display: flex;
      align-items: center;
      .header-menu-item {
        //width: 68px; // Removed fixed width
        padding: 0 20px; // Added padding for spacing
        color: #c3defa;
        cursor: pointer;
        text-align: center; // Optional: ensure text is centered if needed

        &.active {
          color: #fff;
        }
      }
    }
    .header-lang-switcher {
      margin-left: auto;
      display: flex;
      align-items: center;
      .lang-trigger {
        padding: 4px 8px;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .arrow {
          margin-left: 8px;
          font-size: 12px;
          transition: transform 0.2s ease;
          &.arrow-up {
            transform: rotate(180deg);
          }
        }
      }
    }
    // .header-btns { // Original styles, can be reused or removed if not needed elsewhere
    //   display: flex;
    //   align-items: center;
    //   margin-left: auto;
    //   .n-button {
    //     color: #fff;
    //     :deep(.n-button__border) {
    //       border-color: #fff;
    //     }
    //   }
    // }
  }
  .container-main {
    width: 1300px;
    margin: 0 auto;
    padding-top: 50px;
    .index-page {
      .page-header {
        margin-bottom: 24px;
        .page-header-container {
          display: flex;
          .page-header-icon {
            height: 43.2px;
            margin-left: 16.9px;
          }
        }
        .title {
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .sub-title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .desc {
          color: #c2c7d1;
        }
      }
      .page-btns {
        display: flex;
        align-items: center;
        margin-bottom: 60px;
        .label-img {
          margin-right: 12px;
          margin-left: 4px;
        }
      }
      .page-footer {
        width: 1204px;
        padding: 2px;
        background: url(@/assets/case_page_bg1.png) no-repeat;
        img {
          width: 1200px;
          border-radius: 5px;
        }
      }
    }
    .case-page {
      .tab-list {
        display: flex;
        align-items: center;
        margin-left: 12px;
        margin-bottom: 24px;
        margin-top: -12px;
        .tab-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          width: 140px;
          margin-right: 12px;
          border-radius: 2px;
          background: linear-gradient(270deg, #65779b 0%, #99acd1 100%);
          font-size: 16px;
          color: #f4f8ff;
          cursor: pointer;
          &.active {
            background: linear-gradient(270deg, #458fff 0%, #8fbfff 100%);
          }
        }
      }
    }
  }
  .container-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url(@/assets/footer_bg.png) no-repeat top center #0c1c34;
    .community-page {
      padding-bottom: 80px;
      .page-btns {
        display: flex;
        align-items: center;
        justify-content: center;
        .label-btn {
          margin-right: 12px;
        }
      }
    }
    .copyright {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #a1a7b3;
      margin-bottom: 20px;
      p {
        display: flex;
        align-items: center;
        margin: 0 12px;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .page-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1300px;
    padding-top: 130px;
    &:first-child {
      padding-top: 50px;
    }
    &:nth-child(4) {
      padding-top: 0px;
      margin-top: -40px;
    }
    .item-title {
      display: flex;
      align-items: center;
      font-size: 28px;
      font-weight: 500;
      margin-bottom: 12px;
      &.showTips {
        margin-left: 172px;
        color: #808999;
      }
      .item-tips {
        margin-left: 8px;
        border-radius: 5px;
      }
    }
    .item-desc {
      display: flex;
      align-items: center;
      line-height: normal;
      font-size: 14px;
      color: #c2c7d1;
      margin-bottom: 24px;
      text-align: center;
      &.showTips {
        color: #687080;
      }
      &.description {
        margin-bottom: 12px;
      }
      .divider {
        margin: 0 8px;
      }
      .contact {
        color: #fff;
      }
    }
    .item-img {
      width: 1306px;
      padding: 3px;
      overflow: hidden;
      font-size: 0;
      img {
        width: 1300px;
        border-radius: 20px;
      }
      &.img-1 {
        background: url(@/assets/case_page_bg1.png) no-repeat;
      }
      &.img-2 {
        background: url(@/assets/case_page_bg2.png) no-repeat;
      }
      &-en {
        &.img-1,
        &.img-2 {
          height: 706px;
          background: url(@/assets/case_page_bg2_en.png) no-repeat;
        }
      }
    }
    .feature-container {
      display: flex; /* 启用 Flex 布局 */
      flex-wrap: wrap; /* 允许子元素换行 */
      column-gap: 28.52px; /* 设置列间距，即子元素之间的水平间距 */
      row-gap: 40px; /* 设置行间距，即行与行之间的垂直间距 */
      margin-top: 68px;

      .feature-item {
        width: 414px; /* 设置每个子元素的宽度 */
        height: 440px; /* 设置每个子元素的高度 */
        /* 以下为可选的示例样式，您可以根据需要修改 */
        display: flex; /* 使子元素内部的内容也可以用 flex 布局 (可选) */
        align-items: center; /* 垂直居中子元素内部的内容 (可选) */
        justify-content: center; /* 水平居中子元素内部的内容 (可选) */
        font-size: 1.2em; /* 示例文字大小 */
        box-sizing: border-box; /* 确保 padding 和 border 不会增加元素的总宽高 (推荐) */
        &_img {
          width: 100%;
          height: 100%;
        }
      }
      &-en {
        column-gap: 82.85px;
        justify-content: center;
        .feature-item {
          width: 500px;
        }
      }
    }
  }

  .handle-btn {
    & > :first-child {
      margin-right: 8px;
    }

    &.empty-btn {
      width: 88px;
      justify-content: center;
      background: transparent;
      color: #fff;
      border: 1px solid #f4f8ff;
      color: #f4f8ff;
    }

    .is-hover {
      display: none;
    }
    &:hover {
      color: #458fff;
      .not-hover {
        display: none;
      }
      .is-hover {
        display: block;
      }
    }
  }
}

.lang-options {
  width: 200px;

  .lang-option {
    padding: 10px 12px;
    // padding: 8px 12px;
    cursor: pointer;
    color: #fff;
    background: #004093;
    &:hover {
      background: #197dff;
    }
    &.active {
      color: #fff;
    }
  }
}
</style>
