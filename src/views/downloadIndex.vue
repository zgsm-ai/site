<template>
  <div class="w-full bg-black pt-17">
    <div class="login-container">
      <div class="container-header">
        <p class="title text-white">{{ t('download.title') }}</p>
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
            @click="handleTabClick(tab.key)"
          >
            <img :src="tab.imgUrl" :alt="tab.key" />
          </div>
        </div>
        <div class="download-content">
          <div class="content-header flex flex-wrap">
            <img class="download-icon" :src="headerIcon" alt="" />
            <span class="text-white mr-4">{{ headerTitle }}</span>
            <div class="flex cursor-pointer" @click="download">
              <span style="color: #4083e8">{{ t('download.manualPluginDownload') }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 20 20"
                width="18"
                color="#fff"
              >
                <g fill="none">
                  <path
                    d="M15.245 16.498a.75.75 0 0 1 .101 1.493l-.101.007H4.75a.75.75 0 0 1-.102-1.493l.102-.007h10.495zM10.004 2a.75.75 0 0 1 .743.648l.007.102l-.001 10.193l2.966-2.97a.75.75 0 0 1 .977-.074l.084.072a.75.75 0 0 1 .073.977l-.072.084l-4.243 4.25l-.07.063l-.092.059l-.036.021l-.091.038l-.12.03l-.07.008l-.06.002a.726.726 0 0 1-.15-.016l-.082-.023a.735.735 0 0 1-.257-.146l-4.29-4.285a.75.75 0 0 1 .976-1.134l.084.073l2.973 2.967V2.75a.75.75 0 0 1 .75-.75z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          <div v-if="activeTab === 'jetbrains'" class="supported-ides mt-5">
            <p class="text-white mb-2">{{ t('download.jetbrainsSupportIdes') }}</p>
            <ul class="list-disc ml-4">
              <li>IntelliJ IDEA (Ultimate & Community)</li>
              <li>WebStorm - JavaScript and TypeScript development</li>
              <li>PyCharm (Professional & Community) - Python development</li>
              <li>PhpStorm - PHP development</li>
              <li>RubyMine - Ruby development</li>
              <li>CLion - C/C++ development</li>
              <li>GoLand - Go development</li>
              <li>DataGrip - Database development</li>
              <li>Rider - .NET development</li>
              <li>Android Studio - Android development</li>
            </ul>
          </div>
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
                  <div class="flex step-wrapper">
                    <div class="step-left mr-1">
                      <div class="step-title">{{ step.title }}</div>
                      <div class="step-content">
                        <component :is="step.render" v-if="step.render" />
                        <template v-else>{{ step.content }}</template>
                      </div>
                      <div v-if="step.tips" class="step-tips">{{ step.tips }}</div>
                    </div>
                    <img :src="step.imgUrl" alt="" class="w-150" />
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
import { computed, ref, h } from 'vue'
import { NTimeline, NTimelineItem } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import type { VNode } from 'vue'
import vscodeImg from '@/assets/vscode.svg'
import jetbrainsImg from '@/assets/jetbrains.svg'
import vscodeDisableImg from '@/assets/vscode_disable.svg'
import jetbrainsDisableImg from '@/assets/jetbrains_disable.svg'
import jetbrainsContent from '@/assets/jetbrains_download.png'
import vscodeIcon from '@/assets/vscode_icon.png'
import jetbrainsIcon from '@/assets/jetbrains_icon.png'

interface StepItem {
  imgUrl: string
  title: string
  content?: string
  tips?: string
  render?: () => VNode
}

const { t } = useI18n()

const activeTab = ref('vscode')

const headerTitle = computed(() => {
  return activeTab.value === 'vscode' ? t('download.vscodeTitle') : t('download.jetbrainsTitle')
})

const headerIcon = computed(() => {
  return activeTab.value === 'vscode' ? vscodeIcon : jetbrainsIcon
})

const tabList = computed(() => {
  return [
    {
      key: 'vscode',
      imgUrl: activeTab.value === 'vscode' ? vscodeImg : vscodeDisableImg,
    },
    {
      key: 'jetbrains',
      imgUrl: activeTab.value === 'jetbrains' ? jetbrainsImg : jetbrainsDisableImg,
    },
  ]
})

const stepList = computed<StepItem[]>(() => {
  if (activeTab.value === 'vscode') {
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
  } else if (activeTab.value === 'jetbrains') {
    return [
      {
        imgUrl: jetbrainsContent,
        title: t('download.jetbrainsStep1Title'),
        render: () =>
          h('div', { class: 'jetbrains-content' }, [
            h('p', { class: 'content-text' }, t('download.jetbrainsStep1Content1')),
            h(
              'div',
              {
                class: 'flex cursor-pointer ml-4 mt-2 mb-2 download-link',
                onClick: downloadJetbrainsPlugin,
              },
              [
                h('span', { style: 'color: #4083e8;' }, t('download.manualPluginDownload')),
                h(
                  'svg',
                  {
                    xmlns: 'http://www.w3.org/2000/svg',
                    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                    viewBox: '0 0 20 20',
                    width: '18',
                    color: '#fff',
                  },
                  [
                    h('g', { fill: 'none' }, [
                      h('path', {
                        d: 'M15.245 16.498a.75.75 0 0 1 .101 1.493l-.101.007H4.75a.75.75 0 0 1-.102-1.493l.102-.007h10.495zM10.004 2a.75.75 0 0 1 .743.648l.007.102l-.001 10.193l2.966-2.97a.75.75 0 0 1 .977-.074l.084.072a.75.75 0 0 1 .073.977l-.072.084l-4.243 4.25l-.07.063l-.092.059l-.036.021l-.091.038l-.12.03l-.07.008l-.06.002a.726.726 0 0 1-.15-.016l-.082-.023a.735.735 0 0 1-.257-.146l-4.29-4.285a.75.75 0 0 1 .976-1.134l.084.073l2.973 2.967V2.75a.75.75 0 0 1 .75-.75z',
                        fill: 'currentColor',
                      }),
                    ]),
                  ],
                ),
              ],
            ),
            h(
              'div',
              {
                class: 'flex cursor-pointer ml-4 mt-2 mb-2 download-link',
                onClick: downloadJetbrainsPlugin2,
              },
              [
                h('span', { style: 'color: #4083e8;' }, t('download.manualPluginDownload2')),
                h(
                  'svg',
                  {
                    xmlns: 'http://www.w3.org/2000/svg',
                    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                    viewBox: '0 0 20 20',
                    width: '18',
                    color: '#fff',
                  },
                  [
                    h('g', { fill: 'none' }, [
                      h('path', {
                        d: 'M15.245 16.498a.75.75 0 0 1 .101 1.493l-.101.007H4.75a.75.75 0 0 1-.102-1.493l.102-.007h10.495zM10.004 2a.75.75 0 0 1 .743.648l.007.102l-.001 10.193l2.966-2.97a.75.75 0 0 1 .977-.074l.084.072a.75.75 0 0 1 .073.977l-.072.084l-4.243 4.25l-.07.063l-.092.059l-.036.021l-.091.038l-.12.03l-.07.008l-.06.002a.726.726 0 0 1-.15-.016l-.082-.023a.735.735 0 0 1-.257-.146l-4.29-4.285a.75.75 0 0 1 .976-1.134l.084.073l2.973 2.967V2.75a.75.75 0 0 1 .75-.75z',
                        fill: 'currentColor',
                      }),
                    ]),
                  ],
                ),
              ],
            ),
            h('p', { class: 'content-text' }, t('download.jetbrainsStep1Content2')),
          ]),
      },
    ]
  }
  return []
})

const handleTabClick = (tabKey: string) => {
  activeTab.value = tabKey
}

const download = () => {
  if (activeTab.value === 'vscode') {
    downloadPlugin()
  } else {
    downloadJetbrainsPlugin()
  }
}

const downloadPlugin = () => {
  window.open('https://costrict.ai/plugin/download/', '_blank')
}

const downloadJetbrainsPlugin = () => {
  window.open('https://costrict.ai/plugin/jetbrain/', '_blank')
}

const downloadJetbrainsPlugin2 = () => {
  window.open('https://zgsm.sangfor.com/costrict/jebrains-plugin/index.html', '_blank')
}
</script>

<style lang="less" scoped>
.login-container {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 150px;

  @media (max-width: 1280px) {
    width: 90%;
  }

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 70%;
  }

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
    }
  }

  .container-main {
    .tab-list {
      display: flex;
      align-items: center;

      .tab-item {
        margin-right: 12px;
        cursor: pointer;
        border-radius: 8px;
        padding: 8px;
        transition: all 0.3s ease;
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

        @media (max-width: 968px) {
          flex-wrap: wrap;

          img {
            display: none;
          }

          span {
            flex: 0 1 auto;
            word-wrap: break-word;
            word-break: break-word;
            white-space: normal;
          }

          div {
            flex: 1 1 100%;
            margin-top: 8px;
          }
        }
      }

      .download-methods {
        .tips {
          margin-top: 32px;
          margin-bottom: 12px;
          color: #c2c7d1;
        }

        .step-wrapper {
          padding: 16px 16px 16px 32px;
          box-sizing: border-box;
          border: 2px solid transparent;
          background-image: linear-gradient(
            103deg,
            rgba(32, 204, 148, 0.24) 4%,
            #20cc94 20%,
            #a8a8a8 36%,
            #d4d4d4 50%,
            #1c6eff 67%,
            rgba(149, 149, 149, 0.55) 99%
          );
          background-image:
            linear-gradient(black, black),
            linear-gradient(
              103deg,
              rgba(32, 204, 148, 0.24) 4%,
              #20cc94 20%,
              #a8a8a8 36%,
              #d4d4d4 50%,
              #1c6eff 67%,
              rgba(149, 149, 149, 0.55) 99%
            );
          background-origin: border-box;
          background-clip: padding-box, border-box;
          border-radius: 12px;

          @media (max-width: 1024px) {
            flex-direction: column;
            padding: 16px;
          }

          .step-left {
            @media (max-width: 1024px) {
              align-self: flex-start;
            }
          }

          .step-title {
            margin-top: 28px;
            font-size: 16px;
            color: #f4f8ff;
            line-height: 24px;
            max-width: 400px;

            @media (max-width: 1024px) {
              margin-top: 0;
              max-width: 100%;
            }

            @media (max-width: 480px) {
              font-size: 14px;
            }
          }

          .step-content {
            margin-top: 12px;
            font-size: 14px;
            line-height: 20px;
            color: #a1a7b3;
            max-width: 400px;

            @media (max-width: 1024px) {
              max-width: 100%;
            }

            @media (max-width: 640px) {
              font-size: 13px;
            }

            @media (max-width: 480px) {
              font-size: 12px;
            }
          }

          .step-tips {
            margin-top: 12px;
            font-size: 14px;
            line-height: 20px;
            color: #a1a7b3;
            max-width: 400px;

            @media (max-width: 1024px) {
              max-width: 100%;
            }

            @media (max-width: 640px) {
              font-size: 13px;
            }

            @media (max-width: 480px) {
              font-size: 12px;
            }
          }

          .step-tips::before {
            content: '* ';
            color: #ff0000;
          }

          img {
            margin-left: auto;

            @media (max-width: 1024px) {
              height: auto;
              margin-top: 10px;
              margin-left: 0;
            }
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

            @media (max-width: 480px) {
              font-size: 14px;
            }
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

/deep/.jetbrains-content {
  .download-link {
    @media (max-width: 1024px) {
      margin-left: 0;
    }
  }
}

.supported-ides {
  margin-top: 2rem;
  margin-bottom: 1rem;

  p {
    font-weight: 600;
    color: #f4f8ff;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      color: #a1a7b3;
      line-height: 1.5;
    }
  }
}
</style>
