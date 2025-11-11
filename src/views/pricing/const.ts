import { h } from 'vue'
import type { GuideStep, PricingPlan } from './interface'
import guideStep3Img1 from '../../assets/price/guide_step3_1.png'
import guideStep3Img2 from '../../assets/price/guide_step3_2.png'
import qrCode from '../../assets/price/qr_code.png'
import jdService1Img from '../../assets/price/jd_service1.png'
import jdService2Img from '../../assets/price/jd_service2.png'

// 创建国际化的价格套餐数据
  export function createPricingPlans(t: (key: string) => string): PricingPlan[] {
    return [
      {
        title: t('pricing.plans.free.title'),
        price: 0,
        description: t('pricing.plans.free.description'),
        buttonText: t('pricing.plans.free.buttonText'),
        buttonType: 'download',
        showTrafficLabel: false,
        features: [
          {
            text: t('pricing.plans.free.features.newUserCredits'),
            available: true,
          },
          {
            text: t('pricing.plans.free.features.freeCodeCompletion'),
            available: true,
          },
          {
            text: t('pricing.plans.free.features.freeCodeReview'),
            available: true,
          },
          {
            text: t('pricing.plans.free.features.noAdvancedModels'),
            available: false,
          },
        ],
        clickEvent() {
          window.open('https://costrict.ai/download')
        },
      },
      {
        title: t('pricing.plans.package1.title'),
        price: 25,
        originalPrice: 50,
        description: t('pricing.plans.package1.description'),
        buttonText: t('pricing.plans.package1.buttonText'),
        buttonType: 'purchase',
        showTrafficLabel: true,
        features: [
          {
            text: t('pricing.plans.package1.features.credits'),
            available: true,
          },
          {
            text: t('pricing.plans.package1.features.freeCodeCompletion'),
            available: true,
          },
          {
            text: t('pricing.plans.package1.features.freeCodeReview'),
            available: true,
          },
          {
            text: t('pricing.plans.package1.features.advancedModels'),
            available: true,
          },
        ],
        clickEvent() {
          window.open('https://item.jd.com/100295277058.html')
        },
      },
      {
        title: t('pricing.plans.package2.title'),
        price: 98,
        originalPrice: 200,
        description: t('pricing.plans.package2.description'),
        buttonText: t('pricing.plans.package2.buttonText'),
        buttonType: 'purchase',
        showTrafficLabel: true,
        features: [
          {
            text: t('pricing.plans.package2.features.credits'),
            available: true,
          },
          {
            text: t('pricing.plans.package2.features.freeCodeCompletion'),
            available: true,
          },
          {
            text: t('pricing.plans.package2.features.freeCodeReview'),
            available: true,
          },
          {
            text: t('pricing.plans.package2.features.advancedModels'),
            available: true,
          },
        ],
        clickEvent() {
          window.open('https://item.jd.com/100295277076.html')
        },
      },
      {
        title: t('pricing.plans.package3.title'),
        price: 248,
        originalPrice: 500,
        description: t('pricing.plans.package3.description'),
        buttonText: t('pricing.plans.package3.buttonText'),
        buttonType: 'purchase',
        showTrafficLabel: true,
        features: [
          {
            text: t('pricing.plans.package3.features.credits'),
            available: true,
          },
          {
            text: t('pricing.plans.package3.features.freeCodeCompletion'),
            available: true,
          },
          {
            text: t('pricing.plans.package3.features.freeCodeReview'),
            available: true,
          },
          {
            text: t('pricing.plans.package3.features.advancedModels'),
            available: true,
          },
        ],
        clickEvent() {
          window.open('https://item.jd.com/100295277048.html')
        },
      },
    ]
  }

// 创建国际化的购买指南步骤数据
export function createGuideSteps(t: (key: string) => string): GuideStep[] {
  return [
    {
      title: () =>
        h('div', { class: 'custom-title leading-5' }, [
          h(
            'span',
            t('pricing.guide.step1.title'),
          ),
          h(
            'a',
            {
              href: 'https://docs.costrict.ai/billing/purchase',
              style: 'color: #2A7FFF; margin-left: 4px; text-decoration: none;',
              target: '_blank',
            },
            t('pricing.guide.step1.billingLink'),
          ),
        ]),
    },
    {
      title: t('pricing.guide.step2.title'),
    },
    {
      title: () =>
        h('div', { class: 'flex flex-wrap' }, [
          h('div', t('pricing.guide.step3.title')),
          h('div', { class: 'text-[#00FFC8] ml-1' }, t('pricing.guide.step3.userId')),
          h('div', t('pricing.guide.step3.keyPoint')),
        ]),
      imageTextPairs: [
        {
          imgUrl: () =>
            h('div', { class: 'flex mb-7 jd-step' }, [
              h('img', { src: jdService1Img, class: 'h-100' }),
              h('img', { src: jdService2Img, class: 'h-100 ml-2.5' }),
            ]),
          text: () =>
            h('div', { class: 'text-white text-xs' }, [
              h('span', t('pricing.guide.step3.userIdDesc')),
              h(
                'a',
                {
                  href: 'https://zgsm.sangfor.com/credit/manager/',
                  target: '_blank',
                  style: 'color: #2A7FFF; text-decoration: none;',
                },
                'https://zgsm.sangfor.com/credit/manager/',
              ),
              h('span', t('pricing.guide.step3.copyUserId')),
            ]),
        },
        {
          imgUrl: guideStep3Img1,
        },
      ],
    },
    {
      title: () =>
        h('div', { class: 'custom-text' }, [
          h(
            'p',
            {
              class: 'text-white text-xs leading-5 flex flex-wrap',
            },
            [
              h('p', {}, t('pricing.guide.step4.title')),
              h(
                'a',
                {
                  href: 'https://zgsm.sangfor.com/credit/manager/?tab=usage',
                  target: '_blank',
                  style: 'color: #2A7FFF; text-decoration: none;',
                },
                'https://zgsm.sangfor.com/credit/manager/?tab=usage',
              ),
              h('span', t('pricing.guide.step4.usageLink')),
            ],
          ),
          h(
            'p',
            {
              class: 'text-white text-xs mt-1 leading-5 opacity-70',
            },
            t('pricing.guide.step4.workingHours'),
          ),
        ]),
      imageTextPairs: [
        {
          imgUrl: guideStep3Img2,
          text: () =>
            h('div', { class: 'custom-text mt-2.5' }, [
              h(
                'p',
                {
                  class: 'text-white text-xs leading-5 opacity-70',
                },
                t('pricing.guide.step4.wechatScan'),
              ),
              h(
                'p',
                {
                  class: 'text-white text-xs leading-5 opacity-70',
                },
                t('pricing.guide.step4.tips'),
              ),
              h('img', {
                src: qrCode,
                class: 'mt-2',
              }),
            ]),
        },
      ],
    },
  ]
}
