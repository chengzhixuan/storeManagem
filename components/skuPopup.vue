<template>
	<uni-popup ref="popup" type="bottom" :safe-area="true">
		<view class="SkuPopup">
			<view class="SkuClose" @click="closePopup">
				<text class="iconfont icon-guanbi"></text>
			</view>
			<view class="SkuProduct">
				<image :src="product.image" mode="aspectFill" class="SkuProductImg" />
				<view class="SkuProductInfo">
					<view class="SkuProductName">{{ product.name }}</view>
					<view class="SkuProductSelected">{{ selectedText }}</view>
					<view class="FlexRow FlexACenter">
						<view class="SkuProductPrice">¥{{ product.price }}</view>
						<view class="SkuProductDelivery">¥{{ product.deliveryFee }}起 <text class="FontRed FontSize22">预估到手</text></view>
					</view>
				</view>
			</view>
			<!-- 规格选择 -->
			<view class="SkuOptions">
				<view v-for="(skus, groupIndex) in skuOptions" :key="groupIndex" class="SkuOptionGroup">
					<view class="SkuOptionTitle">{{ skus.title }}</view>
					<view class="SkuOptionItems">
						<view v-for="(item, index) in skus.options" :key="index" :class="['SkuOptionItem', { active: selectedOptions[skus.key] === item.value }]" @click="selectOption(skus.key, item.value)">
							{{ item.label }}
						</view>
					</view>
				</view>
			</view>

			<!-- 底部操作栏 -->
			<view class="SkuBottom">
				<view class="SkuQuantity">
					<view class="QuantityBtn" @click="quantityChange(-1)">-</view>
					<view class="QuantityNumber">{{ quantity }}</view>
					<view class="QuantityBtn" @click="quantityChange(1)">+</view>
				</view>
				<view class="SkuAddCart" @click="addToCart">加入购物车</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PublicStore } from '@/store/index'
const popup = ref(null)
const store = PublicStore()
const selectedOptions = ref({ sku1: 'less-ice', sku2: 'full-sugar', sku3: 'no-topping' }) // 选中SKU
const quantity = ref(1) // 数量
const product = ref({ // 商品数据
	name: '百香凤梨(冷饮)',
	price: 16,
	deliveryFee: 4,
	image: 'https://img.alicdn.com/imgextra/i2/2206506346948/O1CN01Z6LUmP21CEo5MJ24A_!!2206506346948-0-alimamacc.jpg_580x580q90.jpg_.webp'
})
const skuOptions = ref([ // 统一的SKU选项配置
	{
		key: 'sku1',
		title: '温度',
		options: [
			{ label: '少冰', value: 'less-ice' },
			{ label: '正常冰', value: 'normal-ice' }
		]
	},
	{
		key: 'sku2',
		title: '甜度【选推荐更好喝】',
		options: [
			{ label: '全糖(推荐)', value: 'full-sugar' },
			{ label: '5分糖', value: 'half-sugar' },
			{ label: '不额外加糖(口感淡)', value: 'no-sugar' }
		]
	},
	{
		key: 'sku3',
		title: '推荐加料(不分装)(任选1种)',
		options: [
			{ label: '不额外添加小料', value: 'no-topping' },
			{ label: '珍珠', value: 'pearl' },
			{ label: '椰果', value: 'coconut' }
		]
	}
])

const selectedText = computed(() => { // 选中的值
	let parts = []
	skuOptions.value.forEach(group => {
		let selected = selectedOptions.value[group.key]
		let label = group.options.find(item => item.value === selected)?.label
		parts.push(label)
	})
	return `已选:${parts.join('/')}`
})
const open = () => {
	popup.value.open()
}
const closePopup = () => {
	popup.value.close()
}
const selectOption = (key, value) => { // 选择SKU
	selectedOptions.value[key] = selectedOptions.value[key] === value ? '' : value
}
const quantityChange = (type) => { // 增加数量
	quantity.value += type
}
const addToCart = (e) => { // 加入购物车
	closePopup()
    store.setCartCount()
}

defineExpose({ open })
</script>

<style lang="less" scoped>
.SkuPopup {
	background: #fff;
	border-radius: 24rpx 24rpx 0 0;
	padding: 40rpx 30rpx 30rpx;
	position: relative;
	max-height: 80vh;
	overflow-y: auto;
}

.SkuClose {
	position: absolute;
	top: 20rpx;
	right: 30rpx;
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;

	.iconfont {
		font-size: 40rpx;
		color: #999;
	}
}

.SkuProduct {
	display: flex;
	margin-bottom: 40rpx;

	.SkuProductImg {
		width: 160rpx;
		height: 160rpx;
		border-radius: 16rpx;
		margin-right: 20rpx;
	}

	.SkuProductInfo {
		flex: 1;

		.SkuProductName {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
			margin-bottom: 12rpx;
			line-height: 1.4;
		}

		.SkuProductSelected {
			font-size: 24rpx;
			color: #666;
			margin-bottom: 16rpx;
			line-height: 1.4;
		}

		.SkuProductPrice {
			font-size: 36rpx;
			font-weight: 700;
			color: #ff4d4f;
			margin-bottom: 8rpx;
		}

		.SkuProductDelivery {
			font-size: 22rpx;
			color: #999;
			margin-left: 20rpx;
		}
	}
}

.SkuOptions {
	margin-bottom: 40rpx;
}

.SkuOptionGroup {
	margin-bottom: 30rpx;

	.SkuOptionTitle {
		font-size: 28rpx;
		color: #333;
		margin-bottom: 20rpx;
		font-weight: 500;
	}

	.SkuOptionItems {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
	}

	.SkuOptionItem {
		padding: 16rpx 24rpx;
		border: 2rpx solid #e5e5e5;
		border-radius: 8rpx;
		font-size: 26rpx;
		color: #333;
		background: #fff;
		transition: all 0.3s ease;

		&.active {
			background: #23a2ff;
			color: #fff;
			border-color: #23a2ff;
		}

		&:active {
			transform: scale(0.95);
		}
	}
}

.SkuBottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 30rpx;
	border-top: 2rpx solid #f5f5f5;

	.SkuQuantity {
		display: flex;
		align-items: center;

		.QuantityBtn {
			width: 60rpx;
			height: 60rpx;
			border: 2rpx solid #e5e5e5;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			color: #333;
			background: #fff;

			&:active {
				background: #f5f5f5;
			}
		}

		.QuantityNumber {
			width: 80rpx;
			text-align: center;
			font-size: 28rpx;
			color: #333;
			margin: 0 20rpx;
		}
	}

	.SkuAddCart {
		flex: 1;
		height: 80rpx;
		background: #23a2ff;
		color: #fff;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		font-weight: 600;
		margin-left: 30rpx;

		&:active {
			background: #1e8fd8;
		}
	}
}
</style>
