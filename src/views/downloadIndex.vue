<template>
  <div class="login-container">
    <div class="container-header">
      <p class="title">欢迎使用诸葛神码</p>
      <p class="desc">
        诸葛神码是一款开源、实用的研发编程工具，基于代码大模型，实现代码补全、智能问答、代码审查、代码优化、单测编写、注释生成等功能。
      </p>
    </div>
    <div class="container-main">
      <div class="tab-list">
        <div
          class="tab-item"
          :class="{ active: activeTab === tab.key }"
          v-for="tab in tabList"
          :key="tab.key"
        >
          <img :src="tab.imgUrl" :alt="tab.key" />
        </div>
      </div>
      <div class="download-content">
        <p class="content-header">
          <img class="download-icon" src="@/assets/vscode_icon.png" alt="" />
          <span>在 Visual Studio Code 中安装诸葛神码，要求版本为最新 或者 1.84.0 及以上版本</span>
        </p>
        <!-- <div class="direct-methods download-methods">
          <p class="tips">快速安装步骤如下：</p>
          <div class="download-methods">
            <span
              >唤起 Visual Studio Code
              插件市场直接安装，安装后请重启IDE，即可开启智能编码之旅。</span
            >
            <div class="handle-btn" @click="directDownload">立即安装</div>
          </div>
        </div> -->
        <div class="manual-methods download-methods">
          <p class="tips">安装步骤如下：</p>
          <div class="download-methods">
            <n-timeline :icon-size="20">
              <n-timeline-item
                v-for="(step, index) in stepList"
                :key="index"
                :title="step.title"
                line-type="dashed"
                color="#4083E8"
              >
                <template #icon>
                  <div class="timeline-icon">{{ index + 1 }}</div>
                </template>
                <img :src="step.imgUrl" alt="" />
              </n-timeline-item>
            </n-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTimeline, NTimelineItem } from 'naive-ui'
import vscodeImg from '@/assets/dowload_vscode.png'
import pycharmImg from '@/assets/dowload_pycharm.png'
import golandImg from '@/assets/dowload_goland.png'
import stepImg1 from '@/assets/download_step1.webp'
import stepImg2 from '@/assets/download_step2.webp'

const tabList = [
  {
    key: 'vscode',
    imgUrl: vscodeImg
  },
  {
    key: 'pycharm',
    imgUrl: pycharmImg
  },
  {
    key: 'goland',
    imgUrl: golandImg
  }
]
const activeTab = 'vscode'

const stepList = [
  {
    title: '步骤1',
    imgUrl: stepImg1
  },
  {
    title: '步骤2',
    imgUrl: stepImg2
  },
]

const directDownload = () => {
  location.href = 'vscode:extension/zgsm-ai.zgsm'
}
</script>

<style lang="less" scoped>
.login-container {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 150px;
  .container-header {
    padding-top: 50px;
    margin-bottom: 60px;
    .title {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .desc {
      color: #c2c7d1;
      margin-bottom: 20px;
    }
  }
  .container-main {
    .tab-list {
      display: flex;
      align-items: center;
      .tab-item {
        margin-right: 12px;
        cursor: pointer;
        &:not(:first-of-type) {
          cursor: not-allowed;
        }
      }
    }
    .download-content {
      margin-top: 32px;
      .content-header {
        display: flex;
        align-items: center;
        font-weight: 600;
        .download-icon {
          width: 32px;
          margin-right: 12px;
        }
      }
      .download-methods {
        .tips {
          margin-top: 8px;
          margin-bottom: 12px;
          color: #C2C7D1;
        }
      }
      .direct-methods {
        margin-bottom: 34px;
        .download-methods {
          display: flex;
          align-items: center;
          height: 72px;
          padding: 0 24px;
          background: url(@/assets/download_bg.png) no-repeat;
        }
        .handle-btn {
          margin-left: 24px;
          &:hover {
            background: #fff;
            color: #458fff;
            transition: all 0.3s;
          }
        }
      }
      .manual-methods {
        .timeline-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          font-size: 12px;
          color: #fff;
          background: #4083E8;
        }
        :deep(.n-timeline-item) {
          .n-timeline-item-content__title {
            color: #F4F8FF;
            font-size: 16px;
            margin-top: -2px;
            margin-bottom: 8px;
          }
          .n-timeline-item-timeline__line {
            --n-color-start: #4083E8;
          }
          .n-timeline-item-timeline__circle {
            background: #4083E8;
          }
        }
      }
    }
  }
}
</style>
