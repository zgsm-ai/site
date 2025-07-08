<template>
  <div class="w-full bg-black">
    <Slogan />
    <div class="w-[1300px] mx-auto">
      <CodeReview />
      <AgentView />
      <CodeCompletion />
      <MoreTool />
      <EnterpriseDeployment />
      <LanguageSupport />
    </div>
    <FooterCopyright />
    <img src="../../assets/left_port.png" class="absolute left-0 top-[1538px]">
    <img src="../../assets/right_port.png" class="absolute right-0 top-[1347px]">
    <div class="absolute left-0 top-0 h-[496px] w-full top-bg"></div>
  </div>
</template>
<script lang="ts" setup>
import Slogan from './slogan.vue'
import CodeReview from './CodeReview.vue'
import AgentView from './agent.vue'
import CodeCompletion from './CodeCompletion.vue'
import MoreTool from './MoreTool.vue'
import EnterpriseDeployment from './EnterpriseDeployment.vue'
import LanguageSupport from './LanguageSupport.vue'
import FooterCopyright from './FooterCopyright.vue'

// 组件名称通过文件名定义为 HomeIndex
defineOptions({
  name: 'HomeIndex',
})
</script>
<style scoped lang="less">
.top-bg {
  background-image: url('@/assets/top.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
