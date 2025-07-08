<template>
  <div class="w-full bg-black">
    <div class="login-container">
      <div class="container-header">
        <p class="title text-white">{{ t('download.title') }}</p>
        <p class="desc">
          {{ t('download.desc') }}
        </p>
      </div>
      <div class="container-main">
        <div class="tab-list">
          <div class="tab-item" :class="{ active: activeTab === tab.key }" v-for="tab in tabList" :key="tab.key">
            <img :src="tab.imgUrl" :alt="tab.key" />
          </div>
        </div>
        <div class="download-content">
          <p class="content-header">
            <img class="download-icon" src="@/assets/vscode_icon.png" alt="" />
            <span class="text-white">{{ t('download.vscodeTitle') }}</span>
          </p>
          <div class="manual-methods download-methods">
            <p class="tips">{{ t('download.installSteps') }}</p>
            <div class="download-methods">
              <n-timeline :icon-size="20">
                <n-timeline-item v-for="(step, index) in stepList" :key="index" :title="t(`download.step${index + 1}`)"
                  line-type="dashed" color="#4083E8">
                  <template #icon>
                    <div class="timeline-icon">{{ index + 1 }}</div>
                  </template>
                  <div class="flex step-wrapper">
                    <div class="step-left">
                      <div class="step-title">{{ step.title }}</div>
                      <div class="step-content">{{ step.content }}</div>
                      <div v-if="step.tips" class="step-tips">{{ step.tips }}</div>
                    </div>
                    <img :src="step.imgUrl" alt="" />
                  </div>
                </n-timeline-item>
              </n-timeline>
            </div>
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
      title: t('download.step1Title'),
      content: t('download.step1Content'),
    },
    {
      imgUrl: t('download.step2Img'),
      title: t('download.step2Title'),
      content: t('download.step2Content'),
      tips: t('download.step2Tips'),
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
          margin-top: 32px;
          margin-bottom: 12px;
          color: #c2c7d1;
        }

        .step-wrapper {
          padding: 16px 16px 16px 40px;
          box-sizing: border-box;
          border: 2px solid transparent;
          background-image: linear-gradient(103deg, rgba(32, 204, 148, 0.24) 4%, #20CC94 20%, #A8A8A8 36%, #D4D4D4 50%, #1C6EFF 67%, rgba(149, 149, 149, 0.55) 99%);
          background-image:
            linear-gradient(black, black),
            linear-gradient(103deg, rgba(32, 204, 148, 0.24) 4%, #20CC94 20%, #A8A8A8 36%, #D4D4D4 50%, #1C6EFF 67%, rgba(149, 149, 149, 0.55) 99%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          border-radius: 12px;

          .step-title {
            margin-top: 28px;
            font-size: 16px;
            color: #F4F8FF;
            line-height: 24px;
            max-width: 400px;
          }

          .step-content {
            margin-top: 12px;
            font-size: 14px;
            line-height: 20px;
            color: #A1A7B3;
            max-width: 400px;
          }

          .step-tips {
            margin-top: 12px;
            font-size: 14px;
            line-height: 20px;
            color: #A1A7B3;
            max-width: 400px;
          }

          .step-tips::before {
            content: '* ';
            color: #FF0000;
          }

          img {
            margin-left: auto;
          }
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
