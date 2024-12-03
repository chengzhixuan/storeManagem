<template>
	<view type="Home" class="ContainerPage">
		<view class="ShopDetailHeader FlexShrink FlexRow" :style="headerSyle">
			<text @click="openPage('/pages/addressBook/index')" class="iconfont icon-dizhiguanli FontSize40 FontGray ShopDetailHeaderLogo"></text>
			<text @click="openPage('/pages/addressBook/ShopDetail')" class="IndexHeaderLeft">太平洋海底比奇堡</text>
		</view>
	</view>
	<Tips ref="tips"></Tips>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
let headerSyle = ref({})
let tips = ref(null)
let menu = uni.getMenuButtonBoundingClientRect()
headerSyle.value = {
	height: menu.height + 'px',
	paddingTop: menu.top + 'px',
}
onLoad((option) => {
})
const goClass = (id) => {
	uni.navigateTo({
		url: `/pages/index/classification?id=${id}`
	})
}
const openPage = (url) => {
	uni.navigateTo({ url: url })
}
</script>
<style lang="less" scoped>
.ShopDetailHeader {
	width: 100%;
	position: relative;
	align-items: center;

	.ShopDetailHeaderLogo {
		margin-left: 20rpx;
		margin-right: 6rpx;
	}

	.ShopDetailHeaderLeft {
		font-size: 30rpx;
	}
}
</style>