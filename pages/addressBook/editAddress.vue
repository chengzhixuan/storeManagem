<template>
    <view class="EditAddressPage ContainerPage">
        <view class="PageCenter AddressMsg">
            <view class="AddressMsgItem">
                <text class="AddressMsgItemName">联系人</text>
                <input class="AddressMsgItemNameInput FontSize30" :always-embed="true" placeholder-style="color:#767676;" v-model="receiving.name" placeholder="姓名" />
                <view @click="chooseAddress" class="AddressWeChoose FlexRow FlexCenter">
                    <i class="icon-weixin iconfont"></i>
                    <text class="Font666 FontSize24">微信地址</text>
                </view>
            </view>
            <view class="AddressMsgItem">
                <text class="AddressMsgItemName">性别</text>
            </view>
            <view class="AddressMsgItem">
                <text class="AddressMsgItemName">手机号</text>
                <input class="AddressMsgItemNameInput FontSize30" :always-embed="true" placeholder-style="color:#767676;" v-model="receiving.mobile" placeholder="手机号" />
            </view>
            <view class="AddressMsgItem" @click.stop="getLocation">
                <text class="AddressMsgItemName">地址</text>
                <text style="font-weight: 500;" class="FlexGrow" v-if="receiving.addressName ? receiving.addressName : receiving.address">{{ receiving.addressName ? receiving.addressName : receiving.address }}</text>
                <text style="color:#767676;font-weight: 500;" class="FlexGrow FontSize30" v-else>请选择地址</text>
                <text class="icon-dingweixiao iconfont FontGray"></text>
            </view>
            <view class="AddressMsgItem">
                <text class="AddressMsgItemName">门牌号</text>
                <input class="AddressMsgItemNameInput FontSize30" :always-embed="true" placeholder-style="color:#767676;" v-model="receiving.address" placeholder="门牌号" />
            </view>
            <view class="AddressMsgItem">
                <text class="AddressMsgItemName">标签</text>
            </view>
            <view class="AddressMsgItem">
                <text class="AddressMsgItemName">默认地址</text>
                <text class="FlexGrow"></text>
                <switch :checked="receiving.isDefault" color="#23a2ff" style="transform:scale(0.8)" />
            </view>
        </view>
        <view class="SaveBtn FlexRow FlexCenter">
            <text @click="saveAddress" class="SaveBtnText FlexRow FlexCenter FontSize32 FontWhite" :class="hightBtn() ? 'RedBtn' : 'GrayBtn'">保存</text>
        </view>
        <Tips ref="tips"></Tips>
    </view>
</template>

<script setup>
import api from "@/api/index"
import { regPhone } from '@/util'
import { ref } from 'vue'
import { onLoad } from "@dcloudio/uni-app";
import { PublicStore } from '@/store'
const store = PublicStore()
let tips = ref(null)
const type = ref('')
const origin = ref('')
let receiving = ref({
    isDefault: false,
    name: '',
    mobile: '',
    addressName: '',
    address: '',
    sex: '1',
    tag: '',
})
const platform = ref('')
uni.getSystemInfo({
    success: function (res) {
        platform.value = res.platform
    }
})
onLoad((option) => {
    if (option.adrInfo) {
        let adrInfo = JSON.parse(decodeURIComponent(option.adrInfo))
        receiving.value = adrInfo
        uni.setNavigationBarTitle({ title: "修改地址" })
    } else {
        uni.setNavigationBarTitle({ title: "新增地址" });
    }
    origin.value = option.origin
})
const chooseAddress = () => {
    uni.chooseAddress({
        success(res) {
            let d = {
                name: res.userName,
                mobile: res.telNumber,
                city: `${res.provinceName}${res.cityName}${res.countyName}`,
                address: res.detailInfo,
            }
            receiving.value = d
        }
    })
}
const selecAddress = (item) => {
    store.setSelectAaddress(item)
    uni.navigateBack({ delta: 1 });
}
const getLocation = () => {
    uni.chooseLocation({
        success: (res) => {
            receiving.value.addressName = res.name
            receiving.value.city = res.address
        },
        fail: function (res) {
            uni.hideLoading()
        },
    });
}
const hightBtn = () => {
    let flag = false
    if (receiving.value.name && receiving.value.mobile && receiving.value.address && receiving.value.city.length > 0) {
        flag = true
    }
    return flag
}
const empty = () => {
    receiving.value = {
        isDefault: false,
        name: '',
        mobile: '',
        addressName: '',
        address: '',
        sex: '1',
        tag: '',
    }
}
const saveAddress = () => { //保存地址
    if (hightBtn()) {
        let mobile = ''
        let phone = ''
        if (regPhone(receiving.value.mobile)) {
            mobile = receiving.value.mobile
        } else {
            phone = receiving.value.mobile
        }
        api.Address.address(receiving.value.seqid, store.userMsg.nick, type.value, receiving.value.name, mobile, phone, receiving.value.city[0].text, receiving.value.city[1].text, receiving.value.city[2].text, '', receiving.value.address, isDefault.value ? 1 : 0).then(res => {
            if (res.success) {
                tips.value.show({ message: `保存地址成功`, type: 'success' })
                if (origin.value === 'index') {
                    selecAddress(res.data)
                } else {
                    uni.navigateBack({ delta: 1 });
                }
                empty()
            } else {
                tips.value.show({ message: `保存地址失败：${res.message} `, type: 'error' })
            }
        }).catch(err => {
            tips.value.show({ message: `保存地址失败：${err} `, type: 'error' })
        })
    } else {
        tips.value.show({ message: `请填写收件人信息`, type: 'error' })
    }
}
const goPage = (url) => {
    uni.navigateTo({ url: url })
}
</script>

<style lang="less" scoped>
.AddressMsg {
    height: 100rpx;
    flex-grow: 1;
    padding: 0rpx 40rpx;
    background: #fff;
    border-radius: 24rpx;

    .AddressWeChoose {
        width: 172rpx;
        height: 52rpx;
        background: #FFFFFF;
        border-radius: 28rpx;
        border: 2rpx solid rgba(0, 0, 0, 0.07);

        .icon-weixin {
            color: #51B63A;
            margin-right: 6rpx;
            font-size: 36rpx;
        }
    }

    .FontSize76 {
        color: #767676;
    }

    .AddressMsgItem {
        display: flex;
        align-items: center;
        height: 108rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #f5f6f7;
        position: relative;

        .AddressMsgItemName {
            width: 150rpx;
            margin-right: 20rpx;
            font-size: 32rpx;
            font-weight: 500;
        }

        .AddressMsgItemNameInput {
            flex-grow: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .icon-dingweixiao {
            font-size: 40rpx;
            color: #23a2ff;
        }
    }
}

.SaveBtn {
    width: 100%;
    flex-shrink: 0;
    background: #fff;
    box-shadow: 0rpx -2rpx 8rpx 0rpx rgba(251, 251, 251, 0.5),
        0rpx -4rpx 26rpx 0rpx rgba(229, 229, 229, 0.5);
    align-items: flex-start;
    padding-top: 30rpx;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 30rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);


    .SaveBtnText {
        width: 662rpx;
        height: 84rpx;
        border-radius: 44rpx;
    }

    .RedBtn {
        background: #23a2ff;
        box-shadow: 0rpx 6rpx 18rpx 0rpx rgba(255, 38, 29, 0.2);
    }

    .GrayBtn {
        background: #cbcccd;
    }
}
</style>
