<template>
    <slot></slot>
    <view class="FooterCom">
        <view @click="goPage('/pages/index/index')" class="FooterMenu">
            <i class="iconfont" :class="type === 'Home' ? 'icon-biaoqiankuozhan_shouye-151 FontBlue' : 'icon-shouye1'"></i>
            <text :class="type === 'Home' ? 'FontBlue' : ''" class="FooterTitle">首页</text>
        </view>
        <view @click="goPage('/pages/index/classification')" class="FooterMenu">
            <i class="iconfont" :class="type === 'class' ? 'icon-chanpinfenlei FontBlue' : 'icon-fenlei'"></i>
            <text :class="type === 'class' ? 'FontBlue' : ''" class="FooterTitle">分类</text>
        </view>
        <view @click="goPage('/pages/index/shoppingCart')" class="FooterMenu">
            <i :style="animation" class="iconfont" :class="type === 'shoppingCart' ? 'icon-gouwuchefill FontBlue' : 'icon-gouwuche1'"></i>
            <text :class="type === 'shoppingCart' ? 'FontBlue' : ''" class="FooterTitle">购物车</text>
            <view class="FooterNum" v-if="store.cartCount > 0">{{ store.cartCount }}</view>
        </view>
        <view @click="goPage('/pages/index/mine')" class="FooterMenu">
            <i class="iconfont" :class="type === 'mine' ? 'icon-biaoqianA01_wode-75 FontBlue' : 'icon-wode2'"></i>
            <text :class="type === 'mine' ? 'FontBlue' : ''" class="FooterTitle">我</text>
        </view>
    </view>
</template>
<script setup>
import { toRefs, ref, watch } from 'vue'
import { PublicStore } from '@/store/index'
const store = PublicStore()
let animation = ref('')
const props = defineProps({
    type: {
        type: String,
        default: 'Home'
    }
})
watch(() => store.cartCount, () => {
    animation.value = 'transform:scale(1.5,1.5);'
    setTimeout(() => {
        animation.value = 'transform:scale(1,1);'
    }, 100)
})
const { type } = toRefs(props)
const goPage = (url) => {
    uni.reLaunch({ url: url })
}
</script>
<style lang="less" scoped>
.FooterCom {
    width: 750rpx;
    height: 100rpx;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 1);
    display: flex;
    padding: 0px;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-around;
    border-top: 0.9971px solid #f6f6f6;

    .FooterMenu {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        padding: 10rpx 40rpx;
        position: relative;

        .FooterTitle {
            font-size: 24rpx;
            margin-top: 10rpx;
            color: #999;
        }

        .FooterNum {
            position: absolute;
            background-color: #fe432e;
            color: #fff;
            border-radius: 50%;
            padding: 0rpx 8rpx;
            font-size: 22rpx;
            top: 0rpx;
            right: 40rpx;
        }
    }
}
</style>