<template>
	<Container type="shoppingCart" class="ContainerPage">
		<view class="ShoppingCartContainer FlexGrow FlexRow">
			<scroll-view scroll-y class="ClassShopScroll FlexGrow" :refresher-triggered="triggered" refresher-enabled @refresherrefresh="onRefresh" @refresherrestore="refresherrestore" @scrolltolower="scrolltolower">
				<view class="ShopItem FlexRow" @click="singleCheck(item)" v-for="(item, index) in recommendList" :key="index">
					<i class="iconfont icon-icon_duigouxiao" :class="item.check ? 'FontBlue' : 'FontDCDDDE'"></i>
					<image mode="aspectFill" @click.stop="goDetail(item.id)" class="ShopItemImg" :src="item.image" alt=""></image>
					<view class="FlexColumn FlexGrow" @click.stop="goDetail(item.id)">
						<text class="ShopItemTitle">{{ item.title }}</text>
						<view class="ShopItemSubTits FlexRow FlexACenter FontSize24" v-if="item.subTitle && item.subTitle.length > 0">
							<text class="ShopItemSubTitle FontGray" v-for="(x, index) in item.subTitle" :key="index">{{ x }}</text>
						</view>
						<text class="FlexGrow"></text>
						<view class="ShopItemPriceBox FlexRow FlexACenter">
							<view>
								<text class="FontRed FontWeight FontSize26">¥</text>
								<text class="ShopItemPrice FontRed FontSize30">{{ parseInt(item.price) }}</text>
								<text class="ShopItemDecimal FontRed FontSize26" v-if='decimalPoint(item)'>.{{ decimalPoint(item) }}</text>
								<text class="ShopItemUnit FontSize26 FontGray">/{{ item.unit }}</text>
							</view>
							<uni-number-box style="transform: scale(0.8);" v-model="item.num" />
						</view>
					</view>
				</view>
				<uni-load-more :status="loadStatus"></uni-load-more>
			</scroll-view>
		</view>
		<view class="ShoppingCartFooter FlexRow FlexACenter">
			<i @click="checkAll" class="iconfont icon-icon_duigouxiao" :class="hasCheckAll ? 'FontBlue' : 'FontDCDDDE'"></i>
			<text @click="checkAll">全选</text>
			<text class="FlexGrow"></text>
			<view class="FontColumn FlexACenter ShoppingCartPayMsg">
				<view class="FlexRow ShoppingCartPayment">
					<text class="FontSize24">合计：</text>
					<text class="FontRed FontWeight FontSize28">¥</text>
					<text class="FontRed FontWeight FontSize30">50</text>
					<text class="FontRed FontWeight FontSize24">.69</text>
				</view>
				<view class="FlexRow FlexACenter">
					<text class="FontSize20">已减:¥50.69</text>
					<text class="ShoppingCartPre FontRed FontSize20">优惠明细</text>
				</view>
			</view>
			<text @click="goPay" class="ShoppingCartPayBtn FontSize30 FontWhite FlexRow FlexCenter">结算</text>
		</view>
	</Container>
	<Tips ref="tips"></Tips>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted, computed } from 'vue'
import { PublicStore } from '@/store/index'
const store = PublicStore()
let tips = ref(null)
let pageNo = ref(1)
let triggered = ref(true)
let hasCheckAll = ref(false)
let loadStatus = ref('more')
let recommendList = ref([
	{ check: false, title: '麻辣小王子100g', num: 1, subTitle: ['肉质饱满', '个大肉厚'], addCart: true, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: false, title: '麻辣小王子100g麻辣小王子100g', num: 3, addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: true, title: '麻辣小王子100g', num: 1, addCart: true, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: false, title: '麻辣小王子100g麻辣小王子100g', num: 1, addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: false, title: '麻辣小王子100g', num: 1, addCart: true, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: false, title: '麻辣小王子100g麻辣小王子100g', num: 1, addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: false, title: '麻辣小王子100g', num: 10, addCart: true, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: false, title: '麻辣小王子100g麻辣小王子100g', num: 1, addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: false, title: '麻辣小王子100g麻辣小王子100g', num: 1, addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: false, title: '麻辣小王子100g麻辣小王子100g', num: 1, addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: false, title: '麻辣小王子100g麻辣小王子100g', num: 1, addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ check: false, title: '麻辣小王子100g麻辣小王子100g', num: 1, addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
])
onLoad((option) => {
})
const checkAll = () => {
	hasCheckAll.value = !hasCheckAll.value
	recommendList.value.forEach(e => {
		e.check = hasCheckAll.value
	});
}
const singleCheck = (item) => {
	item.check = !item.check
	if (!item.check) {
		hasCheckAll.value = false
	}
}
const decimalPoint = (item) => {
	let arr = item.price.toString().split('.')
	return arr[1] ? arr[1] : ''
}
const goDetail = () => {
}
const onRefresh = () => {
	triggered.value = false;
}
const refresherrestore = () => { // 下拉刷新
	triggered.value = true;
	pageNo.value = 0
	recommendList.value = recommendList.value.slice(0, 10)
}
const scrolltolower = () => { // 加载更多
	setTimeout(() => {
		if (pageNo.value > 3) {
			loadStatus.value = 'no-more'
		} else {
			pageNo.value++
			loadStatus.value = 'loading'
			recommendList.value = recommendList.value.concat(recommendList.value.slice(0, 10))
			loadStatus.value = 'more'
		}
	}, 200)
}
const goPay = () => {
	uni.navigateTo({
		url: '/pages/index/confirmOrder'
	})
}
</script>
<style lang="less" scoped>
.ShoppingCartContainer {
	height: 100rpx;
	box-sizing: border-box;
	margin: 0rpx 20rpx;
	width: 710rpx;
	border-radius: 16rpx;
	overflow: hidden;

	.ShopItem {
		width: 100%;
		padding: 15rpx 30rpx 15rpx 15rpx;
		box-sizing: border-box;
		background-color: #fff;

		.icon-icon_duigouxiao {
			margin: 55rpx 30rpx 0px 10px;
		}

		.ShopItemImg {
			border-radius: 8rpx;
			width: 120rpx;
			flex-shrink: 0;
			height: 120rpx;
			margin-right: 10rpx;
		}

		.ShopItemTitle {
			font-size: 30rpx;
			font-weight: 500;
		}

		.ShopItemSubTits {
			margin-top: 10rpx;

			.ShopItemSubTitle {
				margin-right: 22rpx;
				position: relative;

				&:last-child::after {
					width: 0rpx;
				}

				&::after {
					position: absolute;
					width: 2rpx;
					height: 20rpx;
					background-color: #e6e6e6;
					right: -10rpx;
					top: 6rpx;
					content: ' ';
				}
			}
		}

		.ShopItemPriceBox {
			justify-content: space-between;
			margin-top: 10rpx;
		}

		.ShopItemPrice {
			font-weight: 500;
		}

		.ShopItemDecimal {
			font-weight: 500;
		}
	}
}

.ShoppingCartFooter {
	height: 90rpx;
	width: 100%;
	padding-left: 20rpx;
	box-sizing: border-box;
	background: #fff;

	.icon-icon_duigouxiao {
		font-size: 38rpx;
		margin-right: 20rpx;
	}

	.ShoppingCartPayMsg {
		justify-content: flex-end;
		margin-right: 20rpx;
	}

	.ShoppingCartPayment {
		justify-content: flex-end;
		align-items: flex-end;

		.FontRed {
			display: flex;
			flex-flow: row nowrap;
			align-items: flex-end;
		}
	}

	.ShoppingCartPre {
		margin-left: 4rpx;
	}

	.ShoppingCartPayBtn {
		margin-right: 20rpx;
		color: #fff;
		font-weight: 500;
		border-radius: 30rpx;
		padding: 15rpx 40rpx;
		background-color: #23a2ff;
	}
}
</style>