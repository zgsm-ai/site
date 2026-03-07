<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TabList from './components/TabList.vue'
import DownloadContent from './components/DownloadContent.vue'
import { useDownloadData } from './useDownloadData'
import { useDownloadActions } from './useDownloadActions'
import {
  CLI_COMMAND_INSTALL_NPM,
  CLI_COMMAND_INSTALL_CURL_BASH,
  CLI_COMMAND_INSTALL_CURL_POWERSHELL,
} from './constants'
import type { TabType, CurlShellType } from './types'

defineOptions({
  name: 'DownloadPage',
})

const { t } = useI18n()
const activeTab = ref<TabType>('vscode')
const installMethod = ref<'curl' | 'npm'>('curl')
const curlShell = ref<CurlShellType>('bash')

const { tabList, headerTitle, headerIcon, stepList, cliStepLists, cliEnvRequirements } =
  useDownloadData(activeTab, installMethod, curlShell)
const { download, downloadJetbrainsPrimary, downloadJetbrainsSecondary, copyToClipboard } =
  useDownloadActions(activeTab)

const handleTabSelect = (tab: TabType) => {
  activeTab.value = tab
}

const handleInstallMethodChange = (method: 'curl' | 'npm') => {
  installMethod.value = method
}

const handleCurlShellChange = (shell: CurlShellType) => {
  curlShell.value = shell
}

const handleCopyCliCommand = () => {
  let command: string
  if (installMethod.value === 'curl') {
    command =
      curlShell.value === 'bash'
        ? CLI_COMMAND_INSTALL_CURL_BASH
        : CLI_COMMAND_INSTALL_CURL_POWERSHELL
  } else {
    command = CLI_COMMAND_INSTALL_NPM
  }
  copyToClipboard(command)
}
</script>

<template>
  <div class="w-full bg-black pt-17">
    <div class="download-page-container">
      <!-- Header Section -->
      <div class="container-header">
        <p class="title text-white">{{ t('download.title') }}</p>
        <p class="desc">{{ t('download.desc') }}</p>
      </div>

      <!-- Main Content -->
      <div class="container-main">
        <!-- Tab Navigation -->
        <TabList :tabs="tabList" :active-tab="activeTab" @select="handleTabSelect" />

        <!-- Download Content -->
        <DownloadContent
          :active-tab="activeTab"
          :header-icon="headerIcon"
          :header-title="headerTitle"
          :steps="stepList"
          :cli-step-lists="cliStepLists"
          :cli-env-requirements="cliEnvRequirements"
          :install-method="installMethod"
          :curl-shell="curlShell"
          @download="download"
          @download-jetbrains-primary="downloadJetbrainsPrimary"
          @download-jetbrains-secondary="downloadJetbrainsSecondary"
          @copy-cli-command="handleCopyCliCommand"
          @install-method-change="handleInstallMethodChange"
          @curl-shell-change="handleCurlShellChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.download-page-container {
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
    margin-top: 32px;
  }
}
</style>
