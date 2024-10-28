<template>
    <Container type="mine" class="ContainerPage MinePage">
        <view class="BackGround"></view>
        <view class="UserInfo" :style="headerSyle">
            <img @click="goPage('/pages/mine/setUserInfo')" class="UserAvatarImg" :src="userMsg.avatar ? userMsg.avatar : '../../static/image/noLogin.png'" />
            <view @click="goPage('/pages/mine/setUserInfo')" class="UserAccount FlexGrow">
                <view class="NickName FontSize32 FontWeight">{{ userMsg.name }}</view>
            </view>
        </view>
        <view class="PageCenter MineContent">
            <view class="MineContentTit FlexRow FlexACenter">
                <text class="FontWeight FlexGrow FontSize28">我的订单</text>
                <view class="FlexRow FlexACenter">
                    <text class="FontGray">全部</text>
                    <text class="iconfont icon-right FontGray FontSize24"></text>
                </view>
            </view>
            <view class="FlexRow MineStatus">
                <view class="FlexColumn FlexCenter MineStatusItem">
                    <text class="iconfont icon-daifukuan"></text>
                    <text class="MineStatusText">待付款</text>
                    <text class="MineStatusNum">99</text>
                </view>
                <view class="FlexColumn FlexCenter MineStatusItem">
                    <text class="iconfont icon-daifahuo"></text>
                    <text class="MineStatusText">待发货</text>
                    <text class="MineStatusNum">9</text>
                </view>
                <view class="FlexColumn FlexCenter MineStatusItem">
                    <text class="iconfont icon-daishouhuo"></text>
                    <text class="MineStatusText">待收货</text>
                    <text class="MineStatusNum">99</text>
                </view>
                <view class="FlexColumn FlexCenter MineStatusItem">
                    <text class="iconfont icon-daipingjia"></text>
                    <text class="MineStatusText">待评价</text>
                </view>
                <view class="FlexColumn FlexCenter MineStatusItem">
                    <text class="iconfont icon-daituikuan"></text>
                    <text class="MineStatusText">退款/售后</text>
                </view>
            </view>
        </view>
        <view class="PageCenter MineContent">
            <view class="FontWeight MineContentTit FontSize28">更多功能</view>
            <view class="MineFunList FlexRow">
                <view class="MineFunItem FlexColumn">
                    <text class="iconfont icon-youhuiquan"></text>
                    <text class="MineFunItemText">红包卡券</text>
                </view>
                <view @click="goPage('/pages/addressBook/index')" class="MineFunItem FlexColumn">
                    <text class="iconfont icon-dingweixiao"></text>
                    <text class="MineFunItemText">我的地址</text>
                </view>
                <view class="MineFunItem FlexColumn">
                    <text class="iconfont icon-kefu"></text>
                    <text class="MineFunItemText">我的客服</text>
                </view>
                <view class="MineFunItem FlexColumn">
                    <text class="iconfont icon-a-yinsisimibaomi"></text>
                    <text class="MineFunItemText">安全中心</text>
                </view>
            </view>
        </view>
        <view class="FlexGrow"></view>
    </Container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PublicStore } from '@/store/index'
import { storeToRefs } from 'pinia'
const store = PublicStore()
let { userMsg } = storeToRefs(store)
let headerSyle = ref({})
onMounted(() => {
})
let menu = uni.getMenuButtonBoundingClientRect()
headerSyle.value = {
    paddingTop: menu.top + 40 + 'px',
}
const goPage = (url) => {
    uni.reLaunch({ url: url })
}
</script>

<style lang="less">
.MinePage {
    width: 100%;
    position: relative;
    align-items: center;

    .BackGround {
        width: 100%;
        height: 410rpx;
        background: linear-gradient(360deg, #ffffff 0%, #c9def7 100%);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
}

.UserInfo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30rpx;
    z-index: 2;
    padding: 50rpx 30rpx 0rpx 30rpx;
    box-sizing: border-box;

    .UserAvatarImg {
        width: 116rpx;
        height: 116rpx;
        border-radius: 50%;
        border: 4rpx solid #fff;
    }

    .UserAccount {
        margin-left: 32rpx;
        color: #333;

        .NickName {
            margin-bottom: 8rpx;
        }
    }
}

.MineContent {
    background: #ffffff;
    box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(0, 0, 0, 0.02);
    border-radius: 16rpx;
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 20rpx;
    z-index: 2;

    .MineContentTit {
        width: 100%;
        padding: 26rpx 24rpx 15rpx 24rpx;
        box-sizing: border-box;
        flex-shrink: 0;

        .icon-right {
            margin-left: 4rpx;
        }
    }

    .MineStatus {
        padding: 0rpx 20rpx;
        justify-content: space-between;
    }

    .MineStatusItem {
        padding: 30rpx 20rpx 20rpx 20rpx;
        position: relative;

        .iconfont {
            font-size: 50rpx;
        }

        .MineStatusText {
            margin-top: 10rpx;
            color: #666;
        }

        .MineStatusNum {
            position: absolute;
            top: 10rpx;
            right: 10rpx;
            background-color: #ef3d3d;
            height: 38rpx;
            padding: 0rpx 12rpx;
            border-radius: 20rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
        }
    }

    .MineFunList {
        .MineFunItem {
            justify-content: center;
            align-items: center;
            width: 25%;
            padding: 20rpx;
        }

        .iconfont {
            font-size: 50rpx;
        }

        .MineFunItemText {
            margin-top: 10rpx;
        }
    }
}
</style>