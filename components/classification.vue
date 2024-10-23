<template>
	<Container type="class" class="ContainerPage">
		<view class="TopSearch FlexRow FlexJCenter">
			<view class="SearchInput FlexRow FlexACenter">
				<text class="FlexGrow FontGray">榴莲千层</text>
				<text class="SearchInputBtn FlexRow FlexACenter FontWhite">搜索</text>
			</view>
		</view>
		<scroll-view scroll-x>
			<view class="ClassLists FlexRow FlexACenter">
				<view class="ClassItem FlexColumn FlexJCenter" @click="classChagne(i, index)" :class="index === selectClass ? 'Active' : ''" v-for="(i, index) in classList" :key="index">
					<view class="ClassItemContainer">
						<image class="ClassItemImg" :src="i.image" alt=""></image>
					</view>
					<text class="ClassItemName FontSize22">{{ i.title }}</text>
				</view>
			</view>
		</scroll-view>
		<view class="ClassShopContainer FlexGrow FlexRow" v-if="classList[selectClass]">
			<scroll-view scroll-y class="ClassShopScroll">
				<view class="SubClassLists FlexColumn">
					<view class="SubClassItem FlexRow FlexCenter" @click="subClassChagne(i, index)" :class="index === subClass ? 'Active' : ''" v-for="(i, index) in classList[selectClass].childClass" :key="index">
						<text class="SubClassItemName FontSize28">{{ i.title }}</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y class="ClassShopScroll FlexGrow">
				<view class="ShopLists FlexGrow">
					<ColumnShopItem class="RecommendListItem" :item="item"></ColumnShopItem>
				</view>
			</scroll-view>
		</view>
	</Container>
	<Tips ref="tips"></Tips>
	<AddCartAnimation class="AddCartAnimations"></AddCartAnimation>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted, watch } from 'vue'
import ColumnShopItem from '@/components/columnShopItem'
import AddCartAnimation from '@/components/addCartAnimation'
import { PublicStore } from '@/store/index'
const dayjs = require('../../static/js/day.js');
const store = PublicStore()
let tips = ref(null)
let classList = ref([])
let selectClass = ref(0)
let subClass = ref(0)
let recommendList = ref([
	{ title: '麻辣小王子100g', addCart: true, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g麻辣小王子100g', addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g', addCart: true, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g麻辣小王子100g', addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g', addCart: true, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g麻辣小王子100g', addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g', addCart: true, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g麻辣小王子100g', addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g麻辣小王子100g', addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g麻辣小王子100g', addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g麻辣小王子100g', addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '麻辣小王子100g麻辣小王子100g', addCart: false, price: 18.9, unit: '包', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
])
onLoad((option) => {
	for (let i = 0; i < 20; i++) {
		classList.value.push({
			title: '果蔬鲜花',
			image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B',
			childClass: [
				{ title: '果蔬推荐' }, { title: '鲜花荐' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' },
				{ title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' },
				{ title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' }, { title: '果蔬鲜花' },
			]
		})
	}
})
const classChagne = (v, index) => {
	selectClass.value = index
}
const subClassChagne = (v, index) => {
	subClass.value = index
}
</script>
<style lang="less" scoped>
.TopSearch {
	padding-bottom: 20rpx;
	z-index: 10;

	.SearchInput {
		height: 60rpx;
		background-color: #fff;
		width: 710rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
		border-radius: 30rpx;
		border: 2rpx solid #23a2ff;

		.SearchInputBtn {
			border-radius: 30rpx;
			height: 56rpx;
			margin-right: -1rpx;
			margin-top: -1rpx;
			padding: 0rpx 20rpx;
			background-color: #23a2ff;
		}
	}
}

.ClassLists {
	.ClassItem {
		margin-left: 30rpx;

		&.Active {
			.ClassItemContainer {
				border-color: #23a2ff;
			}

			.ClassItemName {
				background-color: #23a2ff;
				color: #fff;
			}
		}

		.ClassItemContainer {
			border: 4rpx solid #fff;
			border-radius: 50%;
			padding: 4rpx;
			width: 92rpx;
			height: 92rpx;
		}

		.ClassItemImg {
			width: 92rpx;
			height: 92rpx;
			border-radius: 50%;
		}

		.ClassItemName {
			margin-top: 6rpx;
			border-radius: 20rpx;
			padding: 4rpx 10rpx;
		}
	}

}

.ClassShopContainer {
	width: 100%;
	height: 100rpx;
	margin-top: 20rpx;
	background-color: #f9f9f9;

	.ClassShopScroll {
		box-shadow: -4rpx 4rpx 12rpx 0rpx rgba(225, 224, 224, 0.5);
		width: 200rpx;
	}

	.SubClassLists {
		width: 100%;

		.SubClassItem {
			padding: 26rpx 0rpx;

			&:first-child {
				border-top: 0rpx !important;
			}

			&:last-child {
				border-bottom: 0rpx !important;
			}
		}

		.Active {
			color: #23a2ff;
			background-color: #fff;
			position: relative;
			border-top: 2rpx solid rgba(225, 224, 224, 0.5);
			border-bottom: 2rpx solid rgba(225, 224, 224, 0.5);

			&:after {
				position: absolute;
				content: ' ';
				width: 6rpx;
				border-radius: 6rpx;
				background-color: #23a2ff;
				height: 40rpx;
				left: 0rpx;
			}
		}

		.SubClassItemName {
			font-weight: 500;
		}
	}

	.ShopLists {
		height: 100%;
		background-color: #fff;
		z-index: 10;
	}
}
</style>