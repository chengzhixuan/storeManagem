<template>
    <view class="RecommendItem FlexColumn" @click="goDetail(props.item.id)">
        <image mode="aspectFill" class="RecommendItemImg" :src="props.item.image" alt=""></image>
        <text class="RecommendItemTitle">{{ props.item.title }}</text>
        <view class="RecommendItemPriceBox FlexRow FlexACenter">
            <view>
                <text class="FontRed FontWeight FontSize26">¥</text>
                <text class="RecommendItemPrice FontRed FontSize30">{{ parseInt(props.item.price) }}</text>
                <text class="RecommendItemDecimal FontRed FontSize26" v-if='decimalPoint'>.{{ decimalPoint }}</text>
                <text class="RecommendItemUnit FontSize26 FontGray">/{{ props.item.unit }}</text>
            </view>
            <view @click.stop="addShoppingCart" class="RecommendItemIcon FlexRow FlexCenter">
                <text class="iconfont icon-gouwuche1 FlexRow FlexCenter FontSize28 FontWhite"></text>
                <text class="RecommendItemCount">x2</text>
            </view>
        </view>
    </view>
</template>
<script setup>
import { PublicStore } from '@/store/index'
import { ref, onMounted, watch, nextTick, computed } from 'vue'
const store = PublicStore()
const sys = uni.getSystemInfoSync();
const props = defineProps({
    item: { type: Object, default: () => { } }
})
const decimalPoint = computed(() => {
    let arr = props.item.price.toString().split('.')
    return arr[1] ? arr[1] : ''
})
const addShoppingCart = (e) => {
    store.setCartAnimation({ show: true, left: e.detail.x, top: e.detail.y })
}
const goDetail = () => {
}
</script>
<style lang="less">
.RecommendItem {
    background-color: #fff;
    border-radius: 16rpx;
    width: 345rpx;

    .RecommendItemImg {
        border-radius: 16rpx 16rpx 0rpx 0rpx;
        width: 345rpx;
        height: 345rpx;
    }

    .RecommendItemTitle {
        padding: 0rpx 10rpx;
        font-size: 28rpx;
        margin-top: 10rpx;
        font-weight: 500;
    }

    .RecommendItemPriceBox {
        margin: 10rpx 0px;
        padding: 0rpx 10rpx;
        justify-content: space-between;
    }

    .RecommendItemPrice {
        font-weight: 500;
    }

    .RecommendItemDecimal {
        font-weight: 500;
    }

    .RecommendItemIcon {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        background-color: #23a2ff;
        position: relative;
    }

    .RecommendItemCount {
        position: absolute;
        background-color: rgba(252, 75, 59, 0.8);
        font-size: 20rpx;
        color: #fff;
        padding: 0rpx 5rpx;
        top: -10rpx;
        right: -10rpx;
        border-radius: 10rpx;
    }
}
</style>