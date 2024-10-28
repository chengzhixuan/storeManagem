<template>
    <veiw class="TipsCom FlexRow FlexCenter" @click="close" v-if="hasShow">
        <text v-if="icon" :style="errorType[type]" class="iconfont" :class="icon"></text>
        <text :style="errorType[type]" class="FlexRow FlexCenter FontSize28 TipsComMsg" :class="{ TipsComMsgWrap: text.length > 16 }">{{ text }}</text>
    </veiw>
</template>
<script setup>
import { ref } from 'vue'
let hasShow = ref(false)
let type = ref('')
let text = ref('')
let icon = ref('')
let errorType = ref({
    error: { color: '#f56c6c', background: '#fef0f0' },
    default: { color: '#fff', background: 'rgba(0,0,0,0.62)' },
    success: { color: '#5ac725', background: '#dbf1e1' },
})
const show = (option) => {
    text.value = option.message
    type.value = option.type ? option.type : 'default'
    icon.value = option.icon
    let duration = option.duration ? option.duration : 2000
    hasShow.value = true
    setTimeout(() => {
        hasShow.value = false
    }, duration)
}
const close = () => {
    hasShow.value = false
}
defineExpose({ show })
</script>
<style lang="less" scoped>
.TipsCom {
    max-width: 80%;
    min-width: 10%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;

    .TipsComMsg {
        padding: 20rpx 40rpx;
        white-space: nowrap;
        border-radius: 12rpx;
        max-width: 440rpx;
    }
    .TipsComMsgWrap{
        white-space: break-spaces;
    }
    .iconfont {
        padding-left: 20rpx;
    }
}
</style>