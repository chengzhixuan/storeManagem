<template>
    <view class="AddressBookPage ContainerPage">
        <view class="AdrContent" v-if="addressList.length > 0">
            <scroll-view class="AdrScroll" scroll-y="true">
                <view class="AdrItem" @click="selecAddress(item)" v-for="(item, index) in addressList" :key="item.seqid">
                    <view class="AdrData">
                        <view class="UserInfo FlexRow FlexCenter">
                            <text class="FontSize32">{{ item.name }}</text>
                            <text class="Phone FontSize24 Font6d" v-if="item.mobile">{{ encodePhone(item.mobile) }}</text>
                            <text class="Phone FontSize24 Font6d" v-else>{{ encodePhone(item.phone) }}</text>
                        </view>
                        <view class="AddressInfo FontSize24 Font6d">{{ item.addressName }}{{ item.address }}</view>
                    </view>
                    <view class="AdrItemOperBox FlexRow FlexCenter">
                        <view class="OperItem FlexRow FlexCenter" @click.stop="setDef(item, index)">
                            <text class="iconfont icon-icon_duigouxiao FontSize34 " :class="item.isDefault ? 'ColorFa' : 'ColorDc'"></text>
                            <view class="FontSize26 " :class="item.isDefault ? 'FontDefault' : 'Font6d'">默认地址</view>
                        </view>
                        <view class="FlexGrow"></view>
                        <view class="OperItem FlexRow FlexCenter Mleft" @click.stop="goPage('edit', item, index)">
                            <text class="iconfont icon-bianji3 FontSize24 Font6d"></text>
                            <view class="FontSize26 Font6d">编辑</view>
                        </view>
                        <view class="OperItem FlexRow FlexCenter Mleft" @click.stop="del(item, index)">
                            <text class="iconfont icon-shanchu FontSize24 Font6d"></text>
                            <view class="FontSize26 Font6d">删除</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="PageNull" v-else>
            <view class="PageNullContent">
                <text class="iconfont icon-kongyemian PageNullIcon"></text>
                <text class="PageNullText">请添加收货地址</text>
            </view>
        </view>
        <view class="Adrbottom FlexRow FlexCenter">
            <div class="Btn FlexRow FlexCenter FontSize32 FontWhite" @click="goPage('add')">新增地址</div>
        </view>
        <Tips ref="tips"></Tips>
        <Modal ref="modal" @confirm="modalSuc"></Modal>
    </view>
</template>

<script setup>
import { PublicStore } from '@/store/index'
import { encodePhone } from '@/util'
import { ref } from 'vue'
import { onLoad } from "@dcloudio/uni-app";
const store = PublicStore()
let addressList = ref([]);
let tips = ref(null)
let modal = ref(null)
let currentItem = ref({})
let currentIndex = ref(-1)
onLoad((o) => {
    getList()
})
const getList = async () => {
    addressList.value = [{
        seqid: 1,
        isDefault: 1,
        name: '张三',
        mobile: '18888888888',
        addressName: '腾讯大楼',
        city: '广东省广州市番禺区',
        address: '1001',
        sex: '1',
        tag: '学校'
    }, {
        seqid: 2,
        isDefault: 0,
        name: '李四',
        mobile: '17895268789',
        addressName: '西子湖畔',
        city: '浙江省杭州市西湖区',
        address: '10-5-5',
        sex: '2',
        tag: '公司'
    }]
}
const selecAddress = (item) => {
    store.setSelectAaddress(JSON.parse(JSON.stringify(item)))
    uni.navigateBack({ delta: 1 });
}
const setDef = (v, i) => {
    addressList.value.forEach((e, y) => {
        if (y === i) {
            e.isDefault = 1;
        } else {
            e.isDefault = 0
        }
    })
    tips.value.show({ message: "设置成功" })
}
const goPage = (t, v) => {
    if (t === 'edit') {
        uni.navigateTo({ url: `/pages/addressBook/editAddress?adrInfo=${encodeURIComponent(JSON.stringify(v))}` });
    } else if (t === 'add') {
        uni.navigateTo({ url: `/pages/addressBook/editAddress` });
    }
}
const del = (v, i) => {
    currentItem.value = v;
    currentIndex.value = i;
    modal.value.show({ content: "确定删除该地址?" })
}
const modalSuc = (e) => {
    getList(false);
    addressList.value.splice(currentIndex.value, 1)
    tips.value.show({ message: `删除成功` })
}
</script>

<style lang="less">
.AddressBookPage {
    width: 100%;
    background-color: #f5f6f7;

    .AdrContent {
        width: 100%;
        height: 100rpx;
        flex-grow: 1;

        .AdrScroll {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding-top: 20rpx;


        }

        .AdrItem {
            box-sizing: border-box;
            width: 710rpx;
            background: #ffffff;
            border-radius: 24rpx;
            margin: 0 auto 20rpx;
            padding: 38rpx 30rpx 0 30rpx;

            .AdrData {
                box-sizing: border-box;
                width: 100%;
                padding-bottom: 20rpx;
                border-bottom: 2rpx solid rgba(0, 0, 0, 0.03);

                .UserInfo {
                    width: 100%;
                    justify-content: flex-start;

                    .Phone {
                        margin-left: 8rpx;
                    }
                }

                .AddressInfo {
                    box-sizing: border-box;
                    width: 100%;
                    margin-top: 12rpx;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }

            .AdrItemOperBox {
                box-sizing: border-box;
                width: 100%;
                height: 88rpx;
                justify-content: flex-start;

                .OperItem {
                    justify-content: flex-start;
                    padding: 10rpx 0rpx;

                    .iconfont {
                        margin-right: 14rpx;
                    }

                    .icon-icon_duigouxiao {
                        margin-right: 20rpx;
                    }

                    .ColorDc {
                        color: #dcddde;
                    }

                    .ColorFa {
                        color: #23a2ff;
                    }
                }

                .Mleft {
                    margin-left: 32rpx;
                }
            }
        }

        .AdrItem:last-child {
            margin-bottom: 20rpx;
        }
    }

    .Adrbottom {
        width: 100%;
        flex-shrink: 0;
        background: #fff;
        box-shadow: 0rpx -2rpx 8rpx 0rpx rgba(251, 251, 251, 0.5), 0rpx -4rpx 26rpx 0rpx rgba(229, 229, 229, 0.5);
        z-index: 10;
        align-items: flex-start;
        padding-top: 30rpx;
        padding-bottom: calc(constant(safe-area-inset-bottom) + 30rpx);
        padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);

        .Btn {
            width: 662rpx;
            height: 84rpx;
            background: #23a2ff;
            box-shadow: 0rpx 6rpx 18rpx 0rpx rgba(188, 245, 255, 0.2);
            border-radius: 44rpx;
        }
    }
}
</style>
