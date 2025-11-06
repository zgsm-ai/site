import { h } from 'vue'
import type { GuideStep, PricingPlan } from './interface'
import guideStep3Img1 from '../../assets/price/guide_step3_1.png'
import guideStep3Img2 from '../../assets/price/guide_step3_2.png'
import qrCode from '../../assets/price/qr_code.png'
import jdService1Img from '../../assets/price/jd_service1.png'
import jdService2Img from '../../assets/price/jd_service2.png'

export const pricingPlans: PricingPlan[] = [
  {
    title: '个人免费版',
    price: 0,
    description: '官方赠送的 Credit，有效期视情况而定',
    buttonText: '下载使用',
    buttonType: 'download',
    showTrafficLabel: false,
    features: [
      {
        text: '新用户获赠 80 Credits（约等于80次请求）',
        available: true,
      },
      {
        text: '免费代码补全，有限使用次数',
        available: true,
      },
      {
        text: '免费 CodeReview，有限使用次数',
        available: true,
      },
      {
        text: '高级模型不可用',
        available: false,
      },
    ],
    clickEvent() {
      window.open('https://costrict.ai/download')
    },
  },
  {
    title: '流量套餐1',
    price: 25,
    originalPrice: 50,
    description: '按实际使用用量扣除 Credit，有效期1年',
    buttonText: '立即购买',
    buttonType: 'purchase',
    showTrafficLabel: true,
    features: [
      {
        text: '500 Credits（约等于500次请求）',
        available: true,
      },
      {
        text: '免费代码补全，有限使用',
        available: true,
      },
      {
        text: '免费代码审查，有限使用',
        available: true,
      },
      {
        text: '高级模型可用',
        available: true,
      },
    ],
    clickEvent() {
      window.open('https://item.jd.com/100295277058.html')
    },
  },
  {
    title: '流量套餐2',
    price: 98,
    originalPrice: 200,
    description: '按实际使用用量扣除 Credit，有效期1年',
    buttonText: '立即购买',
    buttonType: 'purchase',
    showTrafficLabel: true,
    features: [
      {
        text: '2000+额外赠送 100Credits（等于2100次请求）',
        available: true,
      },
      {
        text: '免费代码补全，无限使用',
        available: true,
      },
      {
        text: '免费代码审查，无限使用',
        available: true,
      },
      {
        text: '高级模型可用',
        available: true,
      },
    ],
    clickEvent() {
      window.open('https://item.jd.com/100295277076.html')
    },
  },
  {
    title: '流量套餐3',
    price: 500,
    originalPrice: 248,
    description: '按实际使用用量扣除 Credit，有效期1年',
    buttonText: '立即购买',
    buttonType: 'purchase',
    showTrafficLabel: true,
    features: [
      {
        text: '5000+额外赠送 400Credits（等于5400次请求）',
        available: true,
      },
      {
        text: '免费代码补全，无限使用',
        available: true,
      },
      {
        text: '免费代码审查，无限使用',
        available: true,
      },
      {
        text: '高级模型可用',
        available: true,
      },
    ],
    clickEvent() {
      window.open('https://item.jd.com/100295277048.html')
    },
  },
]

export const guideSteps: GuideStep[] = [
  {
    title: () =>
      h('div', { class: 'custom-title leading-5' }, [
        h(
          'span',
          '选择合适套餐，点击"立即购买"。跳转至 CoStrict 官方京东旗舰店。了解更多套餐详情可查看',
        ),
        h(
          'a',
          {
            href: 'https://docs.costrict.ai/billing/purchase',
            style: 'color: #2A7FFF; margin-left: 4px; text-decoration: none;',
            target: '_blank',
          },
          '套餐&计费说明 >>',
        ),
      ]),
  },
  {
    title: '登录个人京东账号，查看 CoStrict 京东旗舰店商品详情，选择套餐和份数并支付。',
  },
  {
    title: () =>
      h('div', { class: 'flex' }, [
        h('div', '支付完成后请联系客服，告知客服本人的 CoStrict 的'),
        h('div', { class: 'text-[#00FFC8] ml-1' }, '用户ID'),
        h('div', '（这是 Credits 能正常到账的关键）。'),
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
            h('span', '用户ID查看：登录 CoStrict 后台管理页面（链接地址：'),
            h(
              'a',
              {
                href: 'https://zgsm.sangfor.com/credit/manager/',
                target: '_blank',
                style: 'color: #2A7FFF; text-decoration: none;',
              },
              'https://zgsm.sangfor.com/credit/manager/',
            ),
            h('span', '），复制用户ID。'),
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
            h('p', {}, '充值完成后，用户可返回 CoStrict 官方后台查看 Credits 到账情况（链接地址：'),
            h(
              'a',
              {
                href: 'https://zgsm.sangfor.com/credit/manager/?tab=usage',
                target: '_blank',
                style: 'color: #2A7FFF; text-decoration: none;',
              },
              'https://zgsm.sangfor.com/credit/manager/?tab=usage',
            ),
            h('span', '）'),
          ],
        ),
        h(
          'p',
          {
            class: 'text-white text-xs mt-1 leading-5 opacity-70',
          },
          '工作日周一 至 周五的 9:30-20:30 工作时间保证半小时内充值到账，非工作日时间有所延长，用户可通过企微号联系客服迅速添加',
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
              '微信扫码可快速联系官方客服（手机端可长按识别二维码）',
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
