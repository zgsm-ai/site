<template>
  <div class="container" :class="{ notIndex: !isIndex }">
    <div class="container-header">
      <div class="header-logo" @click="showIndex">
        <img class="logo-icon" src="@/assets/logo.png" />
        <p>诸葛神码</p>
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
    </div>
    <template v-if="isIndex">
      <div class="container-main">
        <div class="index-page">
          <div class="page-header">
            <div class="page-header-container">
              <p class="title">欢迎使用诸葛神码</p>
              <img :src="titleIcon"  class="page-header-icon"/>
            </div>
            <p class="sub-title">诸葛智慧、神笔码良，开启AI Native时代</p>
            <p class="desc">
              开源、实用的AI程序员，您的工作重点从 “编” 转到 “问”、“审”
            </p>
          </div>
          <div class="page-btns">
            <div class="label-img"><img src="@/assets/company_label.svg"></div>
            <div class="label-img"><img src="@/assets/person_label.svg"></div>
          </div>
        </div>
        <div class="case-page">
          <div class="page-item" v-for="(item, index) in caseList" :key="index">
            <img :src="item.titleImg" />
            <p class="item-title">
              <span>{{ item.title }}</span>
            </p>
            <p class="item-desc">{{ item.desc }}</p>
            <div class="item-img" :class="`img-${index + 1}`">
              <img :src="item.imgUrl" />
            </div>
          </div>
          <div class="page-item">
            <img :src="caseTitleImg4" />
            <div class="feature-container">
              <div v-for="(item,i) in featureList" :key="i" class="feature-item">
                <img class="feature-item_img" :src="item.img" />
              </div>
            </div>
          </div>
          <div class="page-item">
            <p class="item-title">
              <span>支持多种IDE与语言，持续增加中…</span>
            </p>
            <p class="item-desc">支持多种主流IDE，率先支持VS Code（InteliJ IDEA、PyCharm即将支持）。 支持Python、Go、C++/C、JavaScript、 Java等多种主流语言。</p>
            <div class="item-img">
              <img :src="caseImg5" />
            </div>
          </div>
        </div>
      </div>
      <div class="container-footer">
        <div class="community-page">
          <div class="page-item">
            <p class="item-title">开源开放</p>
            <p class="item-desc description">欢迎加入我们，让AI更高效！</p>
            <p class="item-desc">
              <span>联系我们</span>
              <span class="divider">|</span>
              <span class="contact">zgsm@sangfor.com.cn</span>
            </p>
          </div>
        </div>
        <div class="copyright">
          <p>@ 2025 深信服科技股份有限公司版权所有</p>
          <p>
            <img src="@/assets/copyright_btn.png" />
            <span>粤ICP备08126214号</span>
          </p>
          <p>
            <img src="@/assets/copyright_btn.png" />
            <span>粤公网安备44030502002384号</span>
          </p>
          <p>合字B1.B2-20220041</p>
        </div>
      </div>
    </template>
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import titleIcon from '@/assets/titleIcon.png'
import caseImg1 from '@/assets/case_page_img1.gif'
import caseImg2 from '@/assets/case_page_img2.gif'
import caseImg3 from '@/assets/case_page_img3.png'
import caseImg5 from '@/assets/case_page_img5.png'
import caseTitleImg1 from '@/assets/case1_titleimg.png'
import caseTitleImg2 from '@/assets/case2_titleimg.png'
import caseTitleImg3 from '@/assets/case3_titleimg.png'
import caseTitleImg4 from '@/assets/case4_titleimg.png'
import feature01 from '@/assets/feature01.webp'
import feature02 from '@/assets/feature02.webp'
import feature03 from '@/assets/feature03.webp'
import feature04 from '@/assets/feature04.webp'
import feature05 from '@/assets/feature05.webp'
import { useRouter } from 'vue-router'
import { debounce } from '@/utils/common'

const menuOptions = [
  {
    label: '首页',
    key: 'home'
  },
  {
    label: '开源',
    key: 'blog'
  },
  {
    label: '安装指引',
    key: 'download'
  }
]

const caseList = [
  {
    titleImg: caseTitleImg1,
    title: 'AI Agent：懂你所想，有问必答',
    desc: '通过自然语言描述，自主创建代码文件，直接在工作区生成代码并自动完成测试',
    imgUrl: caseImg1
  },
  {
    titleImg: caseTitleImg2,
    title: '代码补全：神来之笔，码上续写',
    desc: '代码自动补全，提供精准上下文补全更准确，快速秒级出码',
    imgUrl: caseImg2
  },
  {
    titleImg: caseTitleImg3,
    title: '企业级私有化部署：',
    desc: '支持企业级私有化部署，为安全和隐私而设计',
    imgUrl: caseImg3
  },
  // {
  //   title: '支持多种IDE与语言，持续增加中…',
  //   desc: '支持多种主流IDE，率先支持VS Code（InteliJ IDEA、PyCharm即将支持）。 支持Python、Go、C++/C、JavaScript、 Java等多种主流语言。',
  //   imgUrl: caseImg5
  // }
]

const featureList = [
  {
    img: feature01
  },
  {
    img: feature02
  },
  {
    img: feature03
  },
  {
    img: feature04
  },
  {
    img: feature05
  },
]

const activeMenu = ref('home')

const router = useRouter()
const isIndex = computed(() => {
  return router.currentRoute.value.path === '/'
})

const clickMenu = (item: any) => {
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
      margin-right: 70px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      .logo-icon {
        width: 28px;
        margin-right: 12px;
      }
    }
    .header-menu {
      display: flex;
      align-items: center;
      .header-menu-item {
        width: 68px;
        color: #c3defa;
        cursor: pointer;

        &.active {
          color: #fff;
        }
      }
    }
    .header-btns {
      display: flex;
      align-items: center;
      margin-left: auto;
      .n-button {
        color: #fff;
        :deep(.n-button__border) {
          border-color: #fff;
        }
      }
    }
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
            width: 143.09px;
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
    }
    .feature-container {
      display: flex; /* 启用 Flex 布局 */
      flex-wrap: wrap; /* 允许子元素换行 */
      column-gap: 28.52px; /* 设置列间距，即子元素之间的水平间距 */
      row-gap: 40px; /* 设置行间距，即行与行之间的垂直间距 */
      margin-top: 68px;
      .feature-item{
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
</style>
