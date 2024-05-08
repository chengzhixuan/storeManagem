<template>
	<Container type="Home" class="ContainerPage">
		<view class="HomePage RouterPage">
			<view class="TopBgcImg">
				<view class="TopSearch FlexRow FlexJCenter" :style="headerSyle">
					<view class="SearchInput FlexRow FlexACenter">
						<text class="FlexGrow FontGray">榴莲千层</text>
						<text class="SearchInputBtn FlexRow FlexACenter FontWhite">搜索</text>
					</view>
				</view>
			</view>
			<scroll-view scroll-y class="HomeMain">


			</scroll-view>
		</view>
	</Container>
	<Tips ref="tips"></Tips>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted, watch } from 'vue'
import api from '@/api/index.js'
import { PublicStore } from '@/store/index'
const dayjs = require('../../static/js/day.js');
const store = PublicStore()
let headerSyle = ref({})
let tips = ref(null)
let menu = uni.getMenuButtonBoundingClientRect()
headerSyle.value = {
	paddingTop: menu.top + menu.height + 5 + 'px',
}
onLoad((option) => {
})
</script>
<style lang="less" scoped>
.HomePage {
	position: relative;
}

.TopBgcImg {
	top: 0px;
	position: absolute;
	width: 100%;
	height: 466rpx;
	background: linear-gradient(360deg, #fff 0%, #abe4ff 100%);

	.TopSearch {
		padding-bottom: 20rpx;
	}

	.SearchInput {
		height: 60rpx;
		background-color: #fff;
		width: 90%;
		box-sizing: border-box;
		padding-left: 20rpx;
		border-radius: 30rpx;

		.SearchInputBtn {
			border-radius: 30rpx;
			height: 56rpx;
			margin-right: 2rpx;
			padding: 0rpx 20rpx;
			background-color: #23a2ff;
		}
	}
}

.HomeMain {
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	flex-flow: column nowrap;
	z-index: 10;

}
</style>