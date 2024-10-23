<template>
	<view class="ContainerPage ConfirmOrderPage">
		<scroll-view scroll-y class="ConfirmOrderList">
			<view class="PageCenter OrderTypes FlexRow">
				<view class="FlexRow FlexCenter OrderType" @click="orderType = 1" :class="orderType === 1 ? 'OrderTypeActive' : ''">
					<text class="iconfont icon-ziqu"></text>
					<text class="FontSize30">自取</text>
				</view>
				<view class="FlexRow FlexCenter OrderType" @click="orderType = 2" :class="orderType === 2 ? 'OrderTypeActive' : ''">
					<text class="iconfont icon-waimai"></text>
					<text class="FontSize30">外卖</text>
				</view>
			</view>
			<view v-if="orderType === 1" class="PageCenter OrderSelfPickUpPhone FlexRow FlexAcenter">
				<text class="FontSize28 FontDefault FlexRow FlexCenter">预留手机</text>
				<input type="number" class="ReservePhone FontSize28 FlexGrow" placeholder="选填，订单异常时联系" placeholder-style="color:#999" v-model="reservePhone" />
			</view>
			<view v-if="orderType === 1" class="PageCenter OrderSelfPickUp FlexRow">
				<view class="FlexRow FlexCenter OrderSelfPickUpType" :class="selfPickUpType === 1 ? 'OrderSelfPickUpTypeActive' : ''" @click="selfPickUpType = 1">
					<text class="iconfont icon-diannei"></text>
					<text class="FontSize26">店内就餐</text>
					<text class="iconfont icon-dagou"></text>
				</view>
				<view class="FlexRow FlexCenter OrderSelfPickUpType" :class="selfPickUpType === 2 ? 'OrderSelfPickUpTypeActive' : ''" @click="selfPickUpType = 2">
					<text class="iconfont icon-waidai"></text>
					<text class="FontSize26">打包外带</text>
					<text class="iconfont icon-dagou"></text>
				</view>
			</view>
			<view v-else @click="openAddress" class="PageCenter ConfirmOrderAdd FlexRow">
				<text class="iconfont icon-dizhiguanli FontSize40 FontGray"></text>
				<view class="FlexColumn FlexGrow">
					<text class="FontSize32 ConfirmOrderAddDetail">西溪龙湖天街3-608</text>
					<text class="FontGray ConfirmOrderAddName">刘备 11267560822</text>
				</view>
				<text class="iconfont icon-right FontSize24 FontGray"></text>
			</view>
			<view class="PageCenter ConfirmOrders">
				<view class="FontSize36 ConfirmOrdersTit">商品信息</view>
				<view v-for="i in 3" :key="i" class="FlexRow ConfirmOrder">
					<image class="ConfirmOrderImg" mode="aspectFill" src="https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B" alt=""></image>
					<view class="ConfirmOrderInfo FlexGrow">
						<view class="FontSize30 ConfirmOrderTitle">麻辣小王子100g</view>
						<view class="FontSize24 FontGray">规格:6包</view>
						<view class="FontSize24 FontGray">单价:¥18.9</view>
						<view class="FontSize24 FontGray">数量:x1</view>
					</view>
					<view class="FontSize30 ConfirmOrderPay">¥18.9</view>
				</view>
				<view class="ConfirmOrderRemark FlexRow FlexACenter">
					<text class="FlexGrow">订单备注</text>
					<text>暂无备注</text>
					<text class="iconfont icon-right FontGray"></text>
				</view>
				<view class="ConfirmOrderRemark FlexRow FlexACenter">
					<text class="FlexGrow">运费</text>
					<text>¥18.9</text>
				</view>
				<view class="ConfirmOrderRemark FlexRow FlexACenter">
					<text class="FlexGrow">优惠券</text>
					<text>¥18.9</text>
					<text class="iconfont icon-right FontGray"></text>
				</view>
				<view class="ConfirmOrderAmounts FlexRow FlexACenter">
					<text class="FontGray ConfirmOrderNum">共2件</text>
					<text>小计:</text>
					<text class="FontSize30 ConfirmOrderAmount">¥18.9</text>
				</view>
			</view>
		</scroll-view>
		<view class="ConfirmPayBtns FlexRow FlexACenter">
			<text class="FontSize28">共2件</text>
			<text class="FontSize28">合计：</text>
			<text class="FontRed FontSize28">¥</text>
			<text class="FontRed ConfirmPaymount FontSize36 FontWeight">18.9</text>
			<text class="ConfirmPayBtn FontSize30 FontWhite FlexRow FlexCenter">提交订单</text>
		</view>
	</view>
	<Tips ref="tips"></Tips>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted, computed } from 'vue'
import { PublicStore } from '@/store/index'
const store = PublicStore()
let tips = ref(null)
let orderType = ref(1) //1自取 2外卖
let selfPickUpType = ref(1) // 店内  2外带
let reservePhone = ref('') // 预留手机
onLoad((option) => {
})
const openAddress = () => {
	uni.navigateTo({ url: '/pages/addressBook/index' })
}
</script>
<style lang="less" scoped>
.ConfirmOrderList {
	flex-grow: 1;
	height: 100rpx;
}

.OrderTypes {
	align-items: flex-end;
	overflow: hidden;
	border-radius: 16rpx 16rpx 0rpx 0rpx;

	.OrderType {
		width: 50%;
		background-color: #e8e8e8;
		padding: 15rpx 0rpx;
		border-radius: 16rpx 16rpx 0rpx 0rpx;
		height: 50rpx;

		.iconfont {
			font-size: 40rpx;
			margin-right: 10rpx;
		}
	}

	.OrderTypeActive {
		background-color: #fff;
		padding-top: 20rpx;

		.FontSize30 {
			font-weight: 500;
		}

	}
}

.OrderSelfPickUpPhone {
	background-color: #fff;
	border-bottom: 2rpx solid #e8e8e8;
	padding: 10rpx 20rpx;

	.ReservePhone {
		height: 70rpx;
		margin-left: 20rpx;
	}
}

.OrderSelfPickUp {
	background-color: #fff;
	justify-content: space-between;
	padding: 20rpx;
	border-radius: 0rpx 0rpx 16rpx 16rpx;

	.OrderSelfPickUpType {
		width: 320rpx;
		border: 2rpx solid #e8e8e8;
		border-radius: 8rpx;
		padding: 15rpx 0rpx;
		position: relative;

		.icon-diannei,
		.icon-waidai {
			margin-right: 10rpx;
			font-size: 42rpx;
		}

		.icon-dagou {
			display: none;
		}
	}

	.OrderSelfPickUpTypeActive {
		border: 2rpx solid #23a2ff;
		color: #23a2ff;
		overflow: hidden;

		&::after {
			content: ' ';
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			border-radius: 8rpx;
			background-color: #23a2ff;
			right: -10rpx;
			bottom: -10rpx;
		}

		.icon-dagou {
			display: block;
			position: absolute;
			right: 2rpx;
			bottom: 2rpx;
			color: #fff;
			font-size: 24rpx;
			z-index: 2;
		}
	}
}

.ConfirmOrderAdd {
	background-color: #fff;
	border-radius: 0rpx 0rpx 16rpx 16rpx;
	padding: 20rpx;

	.icon-dizhiguanli {
		margin-right: 20rpx;
		font-weight: 500;
		margin-top: 4rpx;
	}

	.icon-right {
		margin-top: 10rpx;
	}

	.ConfirmOrderAddDetail {
		font-weight: 500;
	}

	.ConfirmOrderAddName {
		margin-top: 10rpx;
	}
}

.ConfirmOrders {
	background-color: #fff;
	border-radius: 16rpx;
	margin-top: 20rpx;

	.ConfirmOrdersTit {
		padding: 20rpx;
	}

	.ConfirmOrder {
		padding: 0rpx 20rpx;
		margin-bottom: 20rpx;

		.ConfirmOrderImg {
			width: 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
			border-radius: 4rpx;
		}

		.ConfirmOrderInfo {
			border-bottom: 2rpx solid #e8e8e8;
			padding-bottom: 20rpx;
		}

		.ConfirmOrderTitle {
			margin-bottom: 10rpx;
		}

		.ConfirmOrderPay {
			font-weight: 500;
			padding-right: 20rpx;
			border-bottom: 2rpx solid #e8e8e8;
		}
	}

	.ConfirmOrderRemark {
		padding: 20rpx;

		.icon-right {
			font-size: 24rpx;
			margin-left: 6rpx;
		}
	}

	.ConfirmOrderAmounts {
		padding: 20rpx;
		justify-content: flex-end;

		.ConfirmOrderNum {
			margin-right: 6rpx;
		}

		.ConfirmOrderAmount {
			font-weight: 500;
		}
	}
}

.ConfirmPayBtns {
	background-color: #fff;
	border-radius: 16rpx 16rpx 0rpx 0rpx;
	margin-top: 20rpx;
	padding: 20rpx;
	box-sizing: border-box;
	width: 100%;
	justify-content: flex-end;

	.ConfirmPayBtn {
		margin-left: 20rpx;
		color: #fff;
		font-weight: 500;
		border-radius: 32rpx;
		padding: 15rpx 40rpx;
		background-color: #23a2ff;

	}
}
</style>