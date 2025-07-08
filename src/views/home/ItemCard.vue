<template>
    <div class="item-card" :style="style">
        <div class="item-card__title">
            <component v-if="renderTitle" :is="renderTitle()" />
            <slot v-else name="title">{{ title }}</slot>
        </div>
        <div class="item-card__content">
            <slot name="content">{{ content }}</slot>
        </div>
        <div class="item-card__img">
            <slot name="img">
                <img :src="img" alt="">
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, type VNode } from 'vue';

const props = withDefaults(defineProps<{
    title?: string
    content?: string
    img?: string
    renderTitle?: () => VNode,
    width?: string
    height?: string,
    padding?: string,
    a?: string
}>(), {
    title: '',
    content: '',
    img: '',
    width: '638px',
    height: '400px',
    padding: '32px 32px 22px',
})

const style = computed(() => {
    return {
        padding: props.padding,
        height: props.height,
        width: props.width,
    }
})
</script>

<style lang="less" scoped>
.item-card {
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;

    &__title {
        font-size: 22px;
        font-weight: 500;
        color: #FFFFFF;
    }

    &__content {
        font-size: 16px;
        line-height: 24px;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.7);
    }
}

.item-card:hover {
    transform: scale(1.02);
    transition: all 0.4s ease-in-out;
}
</style>
