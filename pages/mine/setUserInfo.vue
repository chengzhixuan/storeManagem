<template>
    <view class="ContainerPage UserInfoPage">
        <view class="PageCenter UserInfoAvatar FlexColumn FlexCenter">
            <button class="AvatarBtn" :plain="true" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <image class="UserInfoImg" :src="userMsg.avatar"></image>
                <view class="AvatarBtnIco FlexRow FlexCenter">
                    <text class="iconfont icon-xiangji FontSize26 FontWhite"></text>
                </view>
            </button>
        </view>
        <view class="PageCenter UserInfoMsg">
            <view class="UserInfoItem FlexRow">
                <text class="UserInfoItemTit FontSize30">昵称</text>
                <view class="Content FlexRow FlexACenter">
                    <input class="UserInfoInput" v-model='userMsg.name' type="nickname" placeholder="请输入昵称" @change="nickChange" />
                    <text class="iconfont icon-right FontSize24 FontGray"></text>
                </view>
            </view>
            <view class="UserInfoItem FlexRow">
                <text class="UserInfoItemTit FontSize30">手机号</text>
                <view class="Content FlexRow FlexACenter">
                    <input class="UserInfoInput" v-model='userMsg.phone' type="number" placeholder="" />
                    <text class="iconfont icon-right FontSize24 FontGray"></text>
                </view>
            </view>
            <view class="UserInfoItem FlexRow">
                <text class="UserInfoItemTit FontSize30">出生日期</text>
                <view class="Content FlexRow FlexACenter">
                    <picker mode="date" :value="userMsg.birthday" :start="startDate" :end="endDate" @change="bindDateChange">
                        <text class="UserInfoInput FontSize28 FontDefault">{{ userMsg.birthday }}</text>
                    </picker>
                    <text class="iconfont icon-right FontSize24 FontGray"></text>
                </view>
            </view>
        </view>
    </view>
    <Tips ref="tips"></Tips>
</template>
<script setup>
import { baseURL } from '@/api/axios';
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { PublicStore } from '@/store/index'
const dayjs = require('../../static/js/day.js');
const store = PublicStore()
let { userMsg } = storeToRefs(store)
let tips = ref(null)
const startDate = computed(() => {
    return dayjs().subtract(70, 'year').format('YYYY-MM-DD')
})
const endDate = computed(() => {
    return dayjs().format('YYYY-MM-DD')
})
const onChooseAvatar = (e) => {
    uni.uploadFile({
        url: baseURL + "",
        filePath: e.detail.avatarUrl,
        name: "file",
        success: (res) => {
            userMsg.value.avatar = JSON.parse(res.data).data.avatarUrl;
            sub()
        },
        fail: function (err) {
            tips.value.show({ message: `图像更新失败`, type: 'error' })
        }
    })
}
const sub = () => {
    let avatar = ''
    if (userMsg.value.avatar === '../../static/image/noLogin.png') {
        avatar = ''
    } else {
        avatar = userMsg.value.avatar
    }
    tips.value.show({ message: "保存成功" })
    store.setUserMsg(userMsg.value)

}
const nickChange = (e) => {
    userMsg.value.nickName = e.detail.value;
    sub()
}

</script>
<style lang='less' scoped>
.UserInfoAvatar {
    background: #ffffff;
    border-radius: 16rpx;
    height: 350rpx;

    .AvatarBtn {
        background-color: rgba(0, 0, 0, 0);
        border: 0rpx;
        position: relative;

        .UserInfoImg {
            width: 116rpx;
            height: 116rpx;
            box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(0, 0, 0, 0.2);
            border-radius: 50%;
        }

        .AvatarBtnIco {
            position: absolute;
            bottom: 10rpx;
            right: 10rpx;
            background-color: #1f1e1e;
            width: 46rpx;
            height: 46rpx;
            border-radius: 50%;
        }
    }
}

.UserInfoMsg {
    padding: 20rpx;
    border-radius: 16rpx;
    margin-top: 20rpx;
    background: #ffffff;

    .UserInfoItem {
        padding-top: 20rpx;
        padding-bottom: 10rpx;
        border-bottom: 2rpx solid rgba(0, 0, 0, 0.05);
        display: flex;

        &:last-child {
            border-bottom: 0;
        }
    }

    .Content {
        flex-grow: 1;
        justify-content: flex-end;

        .UserInfoInput {
            width: 200rpx;
            text-align: right;
            height: 40rpx;
        }

        .icon-right {
            margin-left: 6rpx;
        }
    }
}
</style>