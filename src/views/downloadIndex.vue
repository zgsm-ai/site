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

          <div class="content-header">
            <img class="download-icon" src="@/assets/vscode_icon.png" alt="" />
            <span class="text-white">{{ t('download.vscodeTitle') }}</span>
            <div class="flex cursor-pointer ml-4" @click="downloadPlugin">
              <span style="color: #4083e8;">{{
                t('download.manualPluginDownload') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"
                width="18" color="#fff">
                <g fill="none">
                  <path
                    d="M15.245 16.498a.75.75 0 0 1 .101 1.493l-.101.007H4.75a.75.75 0 0 1-.102-1.493l.102-.007h10.495zM10.004 2a.75.75 0 0 1 .743.648l.007.102l-.001 10.193l2.966-2.97a.75.75 0 0 1 .977-.074l.084.072a.75.75 0 0 1 .073.977l-.072.084l-4.243 4.25l-.07.063l-.092.059l-.036.021l-.091.038l-.12.03l-.07.008l-.06.002a.726.726 0 0 1-.15-.016l-.082-.023a.735.735 0 0 1-.257-.146l-4.29-4.285a.75.75 0 0 1 .976-1.134l.084.073l2.973 2.967V2.75a.75.75 0 0 1 .75-.75z"
                    fill="currentColor"></path>
                </g>
              </svg>
            </div>
          </div>
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

const downloadPlugin = () => {
  window.open('https://costrict.ai/plugin/download/', '_blank')
}
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
