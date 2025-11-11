<template>
  <div class="pricing-page pt-39.5 pb-23 relative">
    <img src="../../assets/price/bg_1.png" alt="" class="absolute left-[-10px] top-85 w-55 h-58 priceing-page__bg">
    <img src="../../assets/price/bg_2.png" alt="" class="absolute left-124 top-104 w-55 pricing-page__bg">
    <img src="../../assets/price/bg_3.png" alt="" class="absolute left-155 top-81 w-28.5 pricing-page__bg">
    <img src="../../assets/price/bg_4.png" alt="" class="absolute left-233.5 top-104 w-55 pricing-page__bg">
    <img src="../../assets/price/bg_5.png" alt="" class="absolute left-265 top-81 w-28.5 pricing-page__bg">
    <div class="pricing-page__title text-3xl text-center">{{ t('pricing.title') }}</div>
    <div class="pricing-page__subTitle text-center mt-7.5">{{ t('pricing.subtitle') }}</div>
    <div class="pricing-page__content mt-12.5">
      <div class="content-version grid grid-cols-4 gap-5">
        <div v-for="(plan, index) in pricingPlans" :key="index" class="content-version__item min-88 px-5 py-6 relative">
          <div v-if="plan.showTrafficLabel" class="absolute right-0 top-[-4px]">
            <img src="../../assets/label-bg.webp" alt="">
            <span class="absolute top-1 left-7 label-text">{{ t('pricing.tag.trafficPackage') }}</span>
          </div>
          <div class="content-version__item-title text-base">{{ plan.title }}</div>
          <div class="content-version__item-price flex items-center text-3xl mt-3">
            <span class="price-unit ml-[-8px]">￥</span>
            <span class="price">{{ plan.price }}</span>
            <span v-if="plan.originalPrice" class="original-price text-line-through text-base ml-2.5 mt-0.5">
              ￥{{ plan.originalPrice }}
            </span>
          </div>
          <div class="content-version__item-desc mt-2.5 text-xs">{{ plan.description }}</div>
          <div class="content-version__item-btn h-10 text-center leading-10 mt-6 rounded-sm" :class="{
            'btn-purchase': plan.buttonType === 'purchase'
          }" @click="plan.clickEvent">{{ plan.buttonText }}</div>
          <ul class="content-version__item-features text-xs mt-4">
            <li v-for="(feature, featureIndex) in plan.features" :key="featureIndex"
              class="flex items-start mb-4 last-of-type:mb-0">
              <img class="mt-0.5" v-if="feature.available" src="../../assets/y.svg" alt="available">
              <img v-else src="../../assets/x.svg" alt="unavailable">
              <p class="ml-2">{{ feature.text }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-2">{{ t('pricing.tips') }}</div>
    </div>

    <!-- 操作指引步骤条 -->
    <div class="pricing-guide mt-8.5">
      <div class="guide-label flex items-center">
        <img src="../../assets/light.svg" alt="">
        <span class="ml-1">{{ t('pricing.operationGuide') }}</span>
      </div>
      <div class="guide-content ml-6.5 mt-5">
        <n-timeline :icon-size="20">
          <n-timeline-item v-for="(step, index) in guideSteps" :key="index"
            :title="typeof step.title === 'function' ? undefined : step.title" line-type="dashed" color="#4083E8">
            <template #icon>
              <div class="timeline-icon">{{ index + 1 }}</div>
            </template>
            <template #header v-if="typeof step.title === 'function'">
              <component :is="step.title" />
            </template>
            <div class="step-wrapper">
              <div class="step-content-area">
                <div class="step-content" v-if="step.content">
                  <component v-if="typeof step.content === 'function'" :is="step.content" />
                  <template v-else>{{ step.content }}</template>
                </div>
              </div>
              <div v-if="step.imageTextPairs && step.imageTextPairs.length > 0" class="image-text-pairs">
                <div v-for="(pair, pairIndex) in step.imageTextPairs" :key="pairIndex" class="image-text-item">
                  <component v-if="pair.imgUrl" :is="typeof pair.imgUrl === 'function' ? pair.imgUrl : 'img'"
                    :src="typeof pair.imgUrl === 'string' ? pair.imgUrl : undefined"
                    :alt="typeof pair.text === 'function' ? undefined : pair.text" class="step-image" />
                  <div class="image-text">
                    <component v-if="typeof pair.text === 'function'" :is="pair.text" />
                    <template v-else>{{ pair.text }}</template>
                  </div>
                </div>
              </div>
            </div>
          </n-timeline-item>
        </n-timeline>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NTimeline, NTimelineItem } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { createPricingPlans, createGuideSteps } from './const'
import { computed } from 'vue'

const { t } = useI18n()

// 使用国际化函数创建价格套餐和指南步骤
const pricingPlans = computed(() => createPricingPlans(t))
const guideSteps = computed(() => createGuideSteps(t))

defineOptions({
  name: 'PricingPage',
})
</script>

<style lang="less" scoped>
.pricing-page {
  width: 1300px;
  margin: auto;
  color: white;

  @media (max-width: 1320px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    padding-top: 90px;
    padding-bottom: 40px;
  }

  &__bg {
    @media (max-width: 1320px) {
      display: none;
    }
  }

  &__content {

    .content-version {
      @media (max-width: 1320px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }

      &__item {
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 10px;
        z-index: 0;

        &-btn {
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;

          &.btn-download {
            background: rgba(0, 102, 255, 0.3);
            border: 1px solid rgba(0, 102, 255, 0.5);

            &:hover {
              background: rgba(0, 102, 255, 0.5);
              box-shadow: 0 0 10px rgba(0, 102, 255, 0.3);
            }
          }

          &.btn-purchase {
            background: linear-gradient(91deg, #005EFF -9%, #00FFB7 104%);
          }
        }

        .original-price {
          text-decoration: line-through;
          color: rgba(255, 255, 255, 0.7);
        }

        .label-text {
          background: linear-gradient(185deg, #005EFF 35%, #00FFB7 93%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      &__item::before {
        content: "";
        position: absolute;
        inset: 0;
        padding: 1px;
        border-radius: 10px;
        background: linear-gradient(176deg,
            #0066FF -7%,
            #00FFB7 16%,
            rgba(247, 255, 253, 0.51) 51%,
            rgba(0, 94, 255, 0.09) 99%);
        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        z-index: -1;
      }
    }
  }

  .pricing-guide {

    .guide-content {
      @media (max-width: 768px) {
        margin-left: 0;
      }

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

      .step-wrapper {

        .step-content-area {
          width: 100%;
        }

        .step-image {
          width: 100%;
          height: auto;
        }

        .image-text-pairs {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }

      }

      :deep(.n-timeline-item) {
        .n-timeline-item-content__title {
          color: #f4f8ff;
          font-size: 12px;
          margin-top: 2px;
          line-height: 20px;
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

/deep/.jd-step {
  @media (max-width: 968px) {
    flex-direction: column;

    img {
      align-self: start;
    }

    img:last-of-type {
      margin-top: 10px;
      margin-left: 0;
    }
  }

  @media (max-width: 768px) {
    img {
      height: 300px;
    }
  }
}
</style>