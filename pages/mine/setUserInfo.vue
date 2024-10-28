<template>
    <view class="ContainerPage UserInfoPage">
        <view class="PageCenter UserInfoAvatar FlexColumn FlexCenter">
            <button class="AvatarBtn" :plain="true" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <image class="UserInfoImg" :src="avatarUrl"></image>
            </button>
        </view>
        <view class="PageCenter UserInfoMsg">
            <view class="UserInfoItem FlexRow">
                <text class="UserInfoItemTit FontSize28">昵称</text>
                <text class="Content FlexRow">
                    <input v-model='nick' type="nickname" placeholder="请输入昵称" @change="nickChange" />
                </text>
            </view>
        </view>
        <view class="SubBtn FlexRow" @click="sub">确定保存</view>
    </view>
    <Tips ref="tips"></Tips>
</template>
<script setup>
import { baseURL } from '@/api/axios';
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { PublicStore } from '@/store/index'
const store = PublicStore()
let { userMsg } = storeToRefs(store)
let tips = ref(null)
let nick = ref('')
let avatarUrl = ref('')
onMounted(() => {
    nick.value = userMsg.value.name;
    avatarUrl.value = userMsg.value.avatar;
})
const onChooseAvatar = (e) => {
    uni.uploadFile({
        url: baseURL + "",
        filePath: e.detail.avatarUrl,
        name: "file",
        success: (res) => {
            avatarUrl.value = JSON.parse(res.data).data.avatarUrl;
        },
        fail: function (err) {
            tips.value.show({ message: `图像更新失败`, type: 'error' })
        }
    })
}
const sub = () => {
    let avatar = ''
    if (avatarUrl.value === '../../static/image/noLogin.png') {
        avatar = ''
    } else {
        avatar = avatarUrl.value
    }
    tips.value.show({ message: "保存成功" })
    userMsg.value.avatarUrl = avatar
    userMsg.value.nickName = nick.value
    store.setUserMsg(userMsg.value)
    uni.navigateBack({ delta: 1 })

}
const nickChange = (e) => {
    nick.value = e.detail.value;
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

        .UserInfoImg {
            width: 116rpx;
            height: 116rpx;
            box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(0, 0, 0, 0.2);
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
        padding-bottom: 10rpx;
        border-bottom: 2rpx solid rgba(0, 0, 0, 0.05);
    }

    .UserInfoItemTit {}
}
</style>