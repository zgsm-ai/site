<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { TabType, CliStepLists, CliEnvRequirements } from '../types'
import { JETBRAINS_IDES } from '../constants'
import StepTimeline from './StepTimeline.vue'
import type { StepItem } from '../types'

defineOptions({
  name: 'DownloadContent',
})

defineProps<{
  activeTab: TabType
  headerIcon: string
  headerTitle: string
  steps: StepItem[]
  cliStepLists?: CliStepLists
  cliEnvRequirements?: CliEnvRequirements
}>()

const emit = defineEmits<{
  (e: 'download'): void
  (e: 'downloadJetbrainsPrimary'): void
  (e: 'downloadJetbrainsSecondary'): void
  (e: 'copyCliCommand'): void
}>()

const { t } = useI18n()

const handleDownload = () => emit('download')
</script>

<template>
  <div class="download-content">
    <!-- Header Section -->
    <div v-if="activeTab !== 'cli'" class="content-header flex flex-wrap">
      <img class="download-icon" :src="headerIcon" alt="CoStrict Download" />
      <span class="text-white mr-4">{{ headerTitle }}</span>
      <div class="flex cursor-pointer" @click="handleDownload">
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

    <!-- JetBrains IDE List -->
    <div v-if="activeTab === 'jetbrains'" class="supported-ides mt-5">
      <p class="text-white mb-2">{{ t('download.jetbrainsSupportIdes') }}</p>
      <ul class="list-disc ml-4">
        <li v-for="ide in JETBRAINS_IDES" :key="ide">{{ ide }}</li>
      </ul>
    </div>

    <!-- Installation Steps for CLI -->
    <template v-if="activeTab === 'cli' && cliStepLists && cliEnvRequirements">
      <!-- 环境要求 -->
      <div class="cli-env-section">
        <h3 class="env-title">{{ t('download.cliStep1Title') }}</h3>
        <div class="env-content">
          <p class="env-item">{{ cliEnvRequirements.system }}</p>
          <p class="env-item">{{ cliEnvRequirements.terminal }}</p>
        </div>
        <div class="env-note">
          <p>{{ cliEnvRequirements.note }}</p>
        </div>
      </div>

      <!-- 安装步骤 -->
      <div class="manual-methods download-methods">
        <p class="tips">{{ t('download.installSteps') }}</p>
        <div class="download-methods">
          <StepTimeline
            :steps="cliStepLists.installSteps"
            :active-tab="activeTab"
            :is-permission-steps="false"
            @copy-cli-command="$emit('copyCliCommand')"
          />
        </div>
      </div>

      <!-- 权限解决方案 -->
      <!-- <div class="manual-methods download-methods permission-section">
        <p class="tips">{{ t('download.cliPermissionStepsTitle') }}</p>
        <div class="download-methods">
          <StepTimeline
            :steps="cliStepLists.permissionSteps"
            :active-tab="activeTab"
            :is-permission-steps="true"
            @copy-cli-command="$emit('copyCliCommand')"
          />
        </div>
      </div> -->
    </template>

    <!-- Installation Steps for VSCode/JetBrains -->
    <div v-else class="manual-methods download-methods">
      <p class="tips">{{ t('download.installSteps') }}</p>
      <div class="download-methods">
        <StepTimeline
          :steps="steps"
          :active-tab="activeTab"
          @download-jetbrains-primary="$emit('downloadJetbrainsPrimary')"
          @download-jetbrains-secondary="$emit('downloadJetbrainsSecondary')"
          @copy-cli-command="$emit('copyCliCommand')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
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

.download-content {
  margin-top: 32px;
}

.tips {
  margin-top: 32px;
  margin-bottom: 12px;
  color: #c2c7d1;
}

// .permission-section {
//   margin-top: 48px;
// }

// CLI 环境要求样式
.cli-env-section {
  margin-bottom: 32px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;

  .env-title {
    font-size: 16px;
    font-weight: 600;
    color: #f4f8ff;
    margin-bottom: 16px;
  }

  .env-content {
    margin-bottom: 16px;

    .env-item {
      color: #a1a7b3;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .env-note {
    background: rgba(255, 193, 7, 0.1);
    border-left: 3px solid #ffc107;
    padding: 12px 16px;
    border-radius: 4px;

    p {
      color: #ffc107;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
    }
  }
}
</style>
