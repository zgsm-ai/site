<template>
  <div class="login-container">
    <div class="container-header">
      <p class="title">{{ t('download.title') }}</p>
      <p class="desc">
        {{ t('download.desc') }}
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
          <span>{{ t('download.vscodeTitle') }}</span>
        </p>
        <div class="manual-methods download-methods">
          <p class="tips">{{ t('download.installSteps') }}</p>
          <div class="download-methods">
            <n-timeline :icon-size="20">
              <n-timeline-item
                v-for="(step, index) in stepList"
                :key="index"
                :title="t(`download.step${index + 1}`)"
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
import { computed } from 'vue'
import { NTimeline, NTimelineItem } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import vscodeImg from '@/assets/dowload_vscode.png'

const { t } = useI18n()

const tabList = computed(() => {
  return [
    {
      key: 'vscode',
      imgUrl: vscodeImg,
    },
    {
      key: 'pycharm',
      imgUrl: t('download.pyCharmIcon'),
    },
    {
      key: 'goland',
      imgUrl: t('download.golandIcon'),
    },
  ]
})
const activeTab = 'vscode'

const stepList = computed(() => {
  return [
    {
      imgUrl: t('download.step1Img'),
    },
    {
      imgUrl: t('download.step2Img'),
    },
  ]
})
</script>

<style lang="less" scoped>
.login-container {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 150px;
  .container-header {
    padding-top: 50px;
    margin-bottom: 26px;
    .title {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .desc {
      color: #c2c7d1;
      // margin-bottom: 20px;
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
          color: #c2c7d1;
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
          background: #4083e8;
        }
        :deep(.n-timeline-item) {
          .n-timeline-item-content__title {
            color: #f4f8ff;
            font-size: 16px;
            margin-top: -2px;
            margin-bottom: 8px;
          }
          .n-timeline-item-timeline__line {
            --n-color-start: #4083e8;
          }
          .n-timeline-item-timeline__circle {
            background: #4083e8;
          }
        }
      }
    }
  }
}
</style>
