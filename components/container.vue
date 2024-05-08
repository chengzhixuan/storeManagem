<template>
    <slot></slot>
    <view class="FooterCom">
        <view @click="goPage('/pages/index/index')" class="FooterMenu">
            <iconfont :name="type === 'Home' ? 'biaoqiankuozhan_shouye-151' : 'shouye1'" />
            <text :class="type === 'Home' ? 'FontBlue' : ''" class="FooterTitle">首页</text>
        </view>
        <view @click="goPage('/pages/healthy/recordList')" class="FooterMenu">
            <iconfont :name="type === 'class' ? 'fenlei' : 'chanpinfenlei'" />
            <text :class="type === 'class' ? 'FontBlue' : ''" class="FooterTitle">分类</text>
        </view>
        <view @click="goPage('/pages/healthy/recordList')" class="FooterMenu">
            <iconfont :name="type === 'recordList' ? 'gouwuche1' : 'gouwuchefill'" />
            <text :class="type === 'recordList' ? 'FontBlue' : ''" class="FooterTitle">购物车</text>
        </view>
        <view @click="goPage('/pages/index/mine')" class="FooterMenu">
            <iconfont :name="type === 'mine' ? 'wode2' : 'biaoqianA01_wode-75'" />
            <text :class="type === 'mine' ? 'FontBlue' : ''" class="FooterTitle">我</text>
        </view>
    </view>
</template>
<script setup>
import { toRefs } from 'vue'
const props = defineProps({
    type: {
        type: String,
        default: 'Home'
    }
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

        .FooterTitle {
            font-size: 24rpx;
            margin-top: 10rpx;
            color: #999;
        }
    }
}
</style>