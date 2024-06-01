<template>
    <view class="AddCartAnimation" :class="className" :style="anims + ``" v-if="store.cartAnimation.show">
    </view>
</template>
<script setup>
import { PublicStore } from '@/store/index'
import { watch, ref } from 'vue'
const store = PublicStore()
let anims = ref('')
let className = ref('')
watch(() => store.cartAnimation, (v) => {
    if (v.show) {
        anims.value = `top:${store.cartAnimation.top - 5}px;left:${store.cartAnimation.left - 5}px;--startX:${store.cartAnimation.left}px;--startY:${store.cartAnimation.top}px;`
        className.value = 'AddCartAnimationShow'
        setTimeout(() => {
            store.setCartCount()
            store.setCartAnimation({ show: false, left: 0, top: 0 })
        }, 100)
    }
})
</script>
<style lang="less" scoped>
.AddCartAnimation {
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    background-color: #23a2ff;
    position: fixed;
    --endX: 460rpx;
    --endY: calc(100% - 90rpx);
}

.AddCartAnimationShow {
    animation: throwTopY 0.2s cubic-bezier(0, 0.3, 0.3, 1) forwards,
        throwDropY 0.3s cubic-bezier(0.7, 0, 1, 0.7) 0.2s forwards,
        throwX 0.46s linear forwards,
        showAndHide 0.5s linear forwards
}

@keyframes throwTopY {
    0% {
        top: var(--startY);
    }

    100% {
        top: calc(var(--startY) - 20rpx);
    }
}

@keyframes throwDropY {
    0% {
        top: calc(var(--startY) - 20rpx);
    }

    100% {
        top: var(--endY);
    }
}

@keyframes throwX {
    0% {
        left: var(--startX);
    }

    100% {
        left: var(--endX);
    }
}

@keyframes showAndHide {
    0% {
        opacity: 1;
    }

    90% {
        opacity: 0.8;
    }

    100% {
        opacity: 0.6;
    }
}
</style>