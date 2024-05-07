<template>
    <view class="ModalCom " @click.stop="close" v-if="hasShow">
        <view class="ModalBox" :class="'ModalBox' + btnCount">
            <view class="ModalMsg">{{ content }}</view>
            <view class="ModalOperBox FlexRow FlexCenter">
                <view v-if="showCancel" :style="{ border: cancelBorder, background: cancelBackColor, color: cancelColor }" class="ModalBoxBtn FlexRow FlexCenter FontSize28 Font666" @click.stop="cancel">{{ cancelText }}</view>
                <view v-if="showConfirm" :style="{ border: confirmBorder, background: confirmBackColor, color: confirmColor }" class="ModalBoxBtn FlexRow FlexCenter FontSize28 FontWhite" @click.stop="confirm">{{ confirmText }}</view>
            </view>
        </view>
    </view>
</template>
<script setup>
import { ref } from 'vue'
let hasShow = ref(false)
let content = ref("")
let title = ref("")
let cancelText = ref("")
let cancelColor = ref("")
let cancelBackColor = ref('')
let cancelBorder = ref('2rpx solid rgba(0,0,0,0.1);')
let showCancel = ref(true)
let confirmText = ref("")
let confirmColor = ref("")
let confirmBackColor = ref('linear-gradient(90deg, #fa5b3f 0%, #fc473a 100%)')
let confirmBorder = ref('2rpx solid #FA5B3F')
let showConfirm = ref(true)
let btnCount = ref(0)
let params = ref({})
const emits = defineEmits(['confirm', 'cancel'])
const show = (option, data) => {
    btnCount.value = 0
    params.value = data ? data : {}
    title.value = option.title ? option.title : '';
    content.value = option.content ? option.content : '';
    showConfirm.value = option.showConfirm !== undefined ? option.showConfirm : true;
    confirmText.value = option.confirmText ? option.confirmText : '确定';
    confirmColor.value = option.confirmColor ? option.confirmColor : '#fff';
    confirmBackColor.value = option.confirmBackColor ? option.confirmBackColor : 'linear-gradient(90deg, #fa5b3f 0%, #fc473a 100%)';
    confirmBorder.value = option.confirmBorder ? option.confirmBorder : '2rpx solid #FA5B3F';
    showCancel.value = option.showCancel !== undefined ? option.showCancel : true;
    cancelText.value = option.cancelText ? option.cancelText : '取消';
    cancelColor.value = option.cancelColor ? option.cancelColor : '#666';
    cancelBackColor.value = option.cancelBackColor ? option.cancelBackColor : '#fff';
    cancelBorder.value = option.cancelBorder ? option.cancelBorder : '2rpx solid rgba(0,0,0,0.1);';
    if (showCancel.value) {
        btnCount.value = btnCount.value + 1
    }
    if (showConfirm.value) {
        btnCount.value = btnCount.value + 1
    }
    hasShow.value = true;
}
const confirm = () => {
    hasShow.value = false
    emits('confirm', params.value)
}
const close = () => {
    cancel()
}
const cancel = () => {
    btnCount.value = 0
    hasShow.value = false
    emits('cancel', params.value)
}
defineExpose({ show })
</script>
<style lang="less" scoped>
.ModalCom {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;

    .ModalBox {
        box-sizing: border-box;
        width: 580rpx;
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 50rpx 0 56rpx 0;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);

        &.ModalBox0 {
            .ModalMsg {
                margin-bottom: 0rpx;
            }
        }

        &.ModalBox1 {
            .ModalOperBox {
                justify-content: center;
            }
        }

        .ModalMsg {
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            font-size: 32rpx;
            margin-bottom: 48rpx;
            padding: 0rpx 20rpx;
        }

        .ModalOperBox {
            box-sizing: border-box;
            width: 100%;
            padding: 0rpx 58rpx;
            justify-content: space-between;
        }

        .ModalBoxBtn {
            width: 216rpx;
            height: 72rpx;
            border-radius: 38rpx;
        }
    }

}
</style>