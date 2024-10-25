<template>
    <Container type="mine" class="ContainerPage MinePage">
        <view class="BackGround"></view>
        <view class="UserInfo">
            <button class="UserAvatar" :plain="true" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <img class="UserAvatarImg" :src="userMsg.avatar ? userMsg.avatar : '../../static/image/noLogin.png'" />
            </button>
            <view class="UserAccount FlexGrow">
                <view class="NickName FontSize32 FontWeight" v-if="userMsg.name && userMsg.name !== '微信用户'">{{ userMsg.name }}</view>
                <form @submit="nameChange" class="NickNameForm FontSize32 FontWeight" v-else>
                    <input type="nickname" name="name" placeholder="修改用户昵称" />
                    <button size="mini" type="primary" class="NickNameBtn" form-type="submit">保存</button>
                </form>
                <view class="FontGray FontSize28">ID：{{ userMsg.id }}</view>
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
            <view class="FlexRow">
                <view class="FlexColumn FlexCenter">
                    <text class="iconfont icon-daifukuan"></text>
                    <text>待付款</text>
                </view>
                <view class="FlexColumn FlexCenter">
                    <text class="iconfont icon-daifahuo"></text>
                    <text>待发货</text>
                </view>
                <view class="FlexColumn FlexCenter">
                    <text class="iconfont icon-daishouhuo"></text>
                    <text>待收货</text>
                </view>
                <view class="FlexColumn FlexCenter">
                    <text class="iconfont icon-daipingjia"></text>
                    <text>待评价</text>
                </view>
                <view class="FlexColumn FlexCenter">
                    <text class="iconfont icon-daituikuan"></text>
                    <text>退款/售后</text>
                </view>
            </view>
        </view>
        <view class="PageCenter MineContent">
            <view class="FontWeight MineContentTit FontSize28">更多功能</view>
        </view>
        <view class="FlexGrow"></view>
    </Container>
</template>

<script setup>
import api from '@/api';
import { baseURL } from '@/api/axios';
import { ref, onMounted } from 'vue'
import { PublicStore } from '@/store/index'
import { storeToRefs } from 'pinia'
const store = PublicStore()
let { userMsg } = storeToRefs(store)
let checked = ref(false)
onMounted(() => {
    getUserSet()
})
const getUserSet = () => {
    api.Home.getUserSet().then(res => {
        if (res.code === 200) {
            checked.value = res.data.shareMedical === 1
        } else {
            uni.showToast({ title: res.message, icon: 'error' });
        }
    });
}
const nameChange = (e) => {
    let formdata = e.detail.value
    userMsg.value = Object.assign({}, userMsg.value, { name: formdata.name })
    uni.showToast({ title: '修改成功', icon: 'success' });
}
const onChooseAvatar = (e) => {
    uni.uploadFile({
        url: `${baseURL}`, //仅为示例，非真实的接口地址
        filePath: e.detail.avatarUrl,
        header: { token: getApp().globalData.token },
        name: 'avatar',
        success(res) {
            const data = JSON.parse(res.data).data
            userMsg.value = Object.assign({}, userMsg.value, { avatar: data.url })
        }
    })
}
</script>

<style lang="less">
.MinePage {
    width: 100%;
    position: relative;
    align-items: center;

    .BackGround {
        width: 100%;
        height: 210rpx;
        background: linear-gradient(360deg, #c9def7 0%, #ffffff 100%);
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

    .UserAvatar {
        background-color: rgba(0, 0, 0, 0);
        border: 0rpx;
    }

    .UserAvatarImg {
        width: 116rpx;
        height: 116rpx;
        border-radius: 50%;
        border: 4rpx solid #4489fe;
    }

    .UserAccount {
        margin-left: 32rpx;
        color: #333;

        .NickName {
            margin-bottom: 8rpx;
        }

        .NickNameForm {
            display: flex;
            align-items: center;
            flex-flow: row nowrap;
            position: relative;

            input {
                display: flex;
            }

            .NickNameBtn {
                width: 70rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0rpx;
                padding: 0rpx;
                line-height: 1.8;
                position: absolute;
                right: 70rpx;
                top: 0rpx;
            }
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

    .MineContentTit {
        width: 100%;
        padding: 26rpx 24rpx 15rpx 24rpx;
        box-sizing: border-box;
        flex-shrink: 0;

        .icon-right {
            margin-left: 4rpx;
        }
    }
}
</style>