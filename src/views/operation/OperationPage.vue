<template>
    <div class="operation-page w-full bg-black pt-34 pb-20">
        <div class="operation-page__wrapper">
            <div class="activity-title">
                <span>{{ t('operation.activityTitle') }}</span>
                <img src="../../assets/activity.svg" alt="" />
            </div>
            <div class="activity-content mt-6">
                <div class="content-title text-white">{{ t('operation.creditPlan') }}</div>
                <div class="content-desc text-white">{{ t('operation.planDesc') }}</div>
            </div>
            <div class="mt-3 relative wrapper">
                <div class="activity-github-star">
                    <div class="activity-github-star__header flex items-center">
                        <img src="../../assets/star.svg" alt="" />
                        <span class="text-white ml-3 text-sm">{{
                            t('activityCard.githubStar')
                            }}</span>
                    </div>
                    <div class="activity-github-star__content text-sm ml-7 text-white mt-3 max-w-[70%]">
                        {{ t('activityCard.githubStarDesc') }}
                    </div>
                    <div class="activity-github-star__btn rounded-[20px] absolute right-4 top-7.5 px-4 py-1 h-7 flex items-center justify-center cursor-pointer"
                        @click="toGithub">
                        <span class="text-sm">{{ t('activityCard.gitStarNow') }}</span>
                    </div>
                </div>
            </div>
            <div class="mt-3 relative wrapper">
                <div class="activity-invite-user">
                    <div class="activity-invite-user__header flex items-center">
                        <img src="../../assets/user.svg" alt="" />
                        <span class="text-white ml-3 text-sm">{{
                            t('activityCard.inviteNewUser')
                            }}</span>
                    </div>
                    <div class="activity-invite-user__content text-sm ml-7 text-white mt-3 max-w-[70%]">
                        {{ t('activityCard.inviteNewUserDesc') }}
                    </div>
                    <ul class="invite-ser__list ml-7 text-white/70 leading-7">
                        <template v-for="(item, index) in inviteRules" :key="index">
                            <li>{{ item.text }}</li>
                            <template v-if="item.children">
                                <li v-for="(child, childIndex) in item.children" :key="`${index}-${childIndex}`"
                                    class="invite-ser__subitem indent-6">
                                    {{ child.text }}
                                </li>
                            </template>
                        </template>
                    </ul>
                    <div class="activity-invite-user__btn rounded-[20px] absolute right-4 top-7.5 px-4 py-1 h-7 flex items-center justify-center"
                        :class="{
                            'cursor-pointer': !isInviteLoading,
                            'cursor-not-allowed opacity-50': isInviteLoading,
                        }" @click="toInvite">
                        <span class="text-sm">{{ t('activityCard.goInvite') }}</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const inviteRules = computed(() => [
    {
        text: t('activityCard.inviteRules.rule1'),
    },
    {
        text: t('activityCard.inviteRules.rule2'),
        children: [
            { text: t('activityCard.inviteRules.rule2a') },
            { text: t('activityCard.inviteRules.rule2b') },
        ],
    },
    {
        text: t('activityCard.inviteRules.rule3'),
    },
]);

const toGithub = () => {
    window.open('https://github.com/zgsm-ai/costrict')
};

const isInviteLoading = ref(false)

const toInvite = async () => {
    window.open('https://zgsm.sangfor.com/credit/manager/')
};
</script>

<style scoped lang="less">
.operation-page {
    width: 1200px;
    margin: 0 auto;

    @media (max-width: 1280px) {
        width: 94%;
    }

    @media (max-width: 640px) {
        padding-top: 108px;
    }

    &__wrapper {
        @media (max-width: 640px) {
            border-radius: 12px;
            background: #151414;
            padding: 28px 8px 18px;
        }
    }
}

.activity-title {
    display: flex;
    align-items: center;

    span {
        color: #fff;
        font-size: 16px;
    }

    img {
        margin-left: 10px;
    }
}

.activity-content {
    display: flex;
    flex-direction: column;

    .content-desc {
        opacity: 0.7;
        margin-top: 8px;
    }
}

.activity-tips {
    margin-top: 16px;
    padding: 7px 8px 7px 12px;
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    align-items: center;
    background: url('../../assets/tips-bg.png') no-repeat;
    background-size: cover;
    cursor: pointer;

    .tips-content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .enter-code {
        margin-left: 10px;
        color: #1876f2;
        cursor: pointer;
        font-weight: 600;
        white-space: nowrap;
    }

    img {
        margin-left: 20px;
    }
}

.activity-github-star {
    &__header {
        span {
            letter-spacing: normal;
            background: linear-gradient(95deg, #00ffb7 0%, #ffffff 68%, #c5dbff 101%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }

    &__btn {
        border: 0.5px solid transparent;
        background:
            linear-gradient(#000, #000) padding-box,
            linear-gradient(84deg, #0167ff -2%, #48ffcb 52%, #005eff 115%) border-box;

        span {
            letter-spacing: 0.2px;
            background: linear-gradient(96deg, #00ffb7 0%, #ffffff 68%, #c5dbff 101%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }
}

.activity-invite-user {
    &__header {
        span {
            letter-spacing: normal;
            background: linear-gradient(95deg, #00ffb7 0%, #ffffff 68%, #c5dbff 101%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }

    &__btn {
        border: 0.5px solid transparent;
        background:
            linear-gradient(#000, #000) padding-box,
            linear-gradient(84deg, #0167ff -2%, #48ffcb 52%, #005eff 115%) border-box;

        span {
            letter-spacing: 0.2px;
            background: linear-gradient(96deg, #00ffb7 0%, #ffffff 68%, #c5dbff 101%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }
}

.wrapper {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 20px 16px 20px 20px;
    border-radius: 10px;
}

.activity-github-star,
.activity-invite-user {
    @media (max-width: 640px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__btn {
        @media (max-width: 640px) {
            position: static;
            margin-top: 20px;
            width: 100%;
            height: 34px;
        }

        span {
            @media (max-width: 640px) {
                font-size: 16px;
            }
        }
    }

    &__content {
        @media (max-width: 640px) {
            margin-left: 0;
            max-width: 100%;
            line-height: 18px;
            margin-top: 14px;
            font-size: 12px;
        }
    }

    .invite-ser__list {
        @media (max-width: 640px) {
            margin-left: 0;
            max-width: 100%;
            margin-top: 10px;
            line-height: 24px;
        }
    }

    &__header {
        span {
            @media (max-width: 640px) {
                font-size: 18px;
                margin-left: 4px;
            }
        }

        img {
            @media (max-width: 640px) {
                width: 18px;
                height: 18px;
            }
        }
    }
}
</style>
