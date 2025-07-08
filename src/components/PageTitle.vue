<template>
  <div ref="animatedElement" class="scroll-animation-wrapper">
    <div class="text-center">
      <div class="text-4xl font-semibold leading-normal text-center text-white mb-2">
        {{ title }}
      </div>
      <div v-if="subtitle" class="text-base font-normal leading-6 text-center text-white/70">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnimation } from '@/hooks/use_animation'

interface Props {
  title: string
  subtitle?: string
  needAnimation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  needAnimation: true,
})

const { animatedElement } = useAnimation(props.needAnimation)
</script>

<style scoped>
.title-component {
  text-align: center;
  margin: 20px 0;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.25rem;
  font-weight: normal;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }
}
</style>
