<template>
    <view class="ShopItem FlexRow">
        <image mode="aspectFill" @click="goDetail(props.item.id)" class="ShopItemImg" :src="props.item.image" alt=""></image>
        <view class="FlexColumn FlexGrow" @click="goDetail(props.item.id)">
            <text class="ShopItemTitle">{{ props.item.title }}</text>
            <view class="ShopItemSubTits FlexRow FlexACenter FontSize24" v-if="props.item.subTitle && props.item.subTitle.length > 0">
                <text class="ShopItemSubTitle FontGray" v-for="(x, index) in props.item.subTitle" :key="index">{{ x }}</text>
            </view>
            <text class="FlexGrow"></text>
            <view class="ShopItemPriceBox FlexRow FlexACenter">
                <view>
                    <text class="FontRed FontWeight FontSize26">¥</text>
                    <text class="ShopItemPrice FontRed FontSize30">{{ parseInt(props.item.price) }}</text>
                    <text class="ShopItemDecimal FontRed FontSize26" v-if='decimalPoint'>.{{ decimalPoint }}</text>
                    <text class="ShopItemUnit FontSize26 FontGray">/{{ props.item.unit }}</text>
                </view>
                <view @click.stop="addShoppingCart" class="ShopItemIcon FlexRow FlexCenter">
                    <text class="iconfont icon-gouwuche1 FlexRow FlexCenter FontSize28 FontWhite"></text>
                    <text class="ShopItemCount">x2</text>
                </view>
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
    store.setCartCount()
    store.setCartAnimation({ show: true, left: e.detail.x, top: e.detail.y })
}
const goDetail = (id) => {
    uni.navigateTo({ url: `/pages/index/shopDetail?id=${id}` })
}
</script>
<style lang="less">
.ShopItem {
    background-color: #fff;
    width: 100%;
    padding: 15rpx 30rpx 15rpx 15rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f1f1f1;

    .ShopItemImg {
        border-radius: 8rpx;
        width: 150rpx;
        flex-shrink: 0;
        height: 150rpx;
        margin-right: 10rpx;
    }

    .ShopItemTitle {
        font-size: 30rpx;
        font-weight: 500;
    }

    .ShopItemSubTits {
        margin-top: 10rpx;

        .ShopItemSubTitle {
            margin-right: 22rpx;
            position: relative;

            &:last-child::after {
                width: 0rpx;
            }

            &::after {
                position: absolute;
                width: 2rpx;
                height: 20rpx;
                background-color: #e6e6e6;
                right: -10rpx;
                top: 6rpx;
                content: ' ';
            }
        }
    }

    .ShopItemPriceBox {
        justify-content: space-between;
        margin-top: 10rpx;
    }

    .ShopItemPrice {
        font-weight: 500;
    }

    .ShopItemDecimal {
        font-weight: 500;
    }

    .ShopItemIcon {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        background-color: #23a2ff;
        position: relative;
    }

    .ShopItemCount {
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