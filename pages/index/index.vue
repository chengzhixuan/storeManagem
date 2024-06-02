<template>
	<Container type="Home" class="ContainerPage">
		<view class="IndexHeader FlexShrink FlexRow" :style="headerSyle">
			<iconfont class="IndexHeaderLogo" size="40" name="dizhiguanli" />
			<text class="IndexHeaderLeft">太平洋海底比奇堡</text>
			<view class="TopBgcImg"></view>
		</view>

		<view class="TopSearch FlexRow FlexJCenter">
			<view class="SearchInput FlexRow FlexACenter">
				<text class="FlexGrow FontGray">榴莲千层</text>
				<text class="SearchInputBtn FlexRow FlexACenter FontWhite">搜索</text>
			</view>
		</view>
		<view class="FlexGrow HomeList">
			<scroll-view scroll-y class="HomeMain">
				<view class="ClassList">
					<view class="classItem FlexColumn FlexCenter" @click="goClass(item.id)" :key="index" v-for="(item, index) in classList">
						<image class="classItemImg" :src="item.image" alt=""></image>
						<text class="classItemTitle">{{ item.title }}</text>
					</view>
				</view>
				<view class="KeyRecommend FlexRow">
					<view v-for="(item, index) in keyRecommend" :key="index" class="KeyRecommendItem FlexColumn">
						<text class="KeyRecommendTitle">{{ item.title }}</text>
						<text class="FontGray KeyRecommendKey">{{ item.keyWord }}</text>
						<view class="FlexRow KeyRecommendItemList">
							<view class="KeyRecommendItemLiItem FlexColumn FlexCenter" v-for="(x, index) in item.list" :key="index">
								<image class="KeyRecommendImg" :src="x.image" alt=""></image>
								<text class="KeyRecommendPrice FontRed">¥{{ x.price }}</text>
							</view>
						</view>
					</view>
				</view>
				<scroll-view type="custom">
					<grid-view type="masonry" main-axis-gap="20rpx" cross-axis-gap="20rpx" class="RecommendList">
						<template v-for="(item, index) in recommendList" :key="index">
							<ColumnShopItem class="RecommendListItem" :item="item"></ColumnShopItem>
						</template>
					</grid-view>
				</scroll-view>
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
import api from '@/api/index.js'
import { PublicStore } from '@/store/index'
const dayjs = require('../../static/js/day.js');
const store = PublicStore()
let headerSyle = ref({})
let tips = ref(null)
let classList = ref([
	{ title: '果蔬鲜花', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '果蔬鲜花', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '果蔬鲜花', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '果蔬鲜花', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '果蔬鲜花', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '果蔬鲜花', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '果蔬鲜花', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '果蔬鲜花', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '果蔬鲜花', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
	{ title: '果蔬鲜花', image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' },
])
let keyRecommend = ref([
	{ title: '时令上新', keyWord: '0.01元试吃', list: [{ price: 18.9, image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' }, { price: 18.9, image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' }] },
	{ title: '回购榜单', keyWord: '0.01元试吃', list: [{ price: 18.9, image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' }] },
	{ title: '限时疯抢', keyWord: '0.01元试吃', list: [{ price: 18.9, image: 'https://t12.baidu.com/it/u=4256646099,219088797&fm=30&app=106&f=JPEG?w=640&h=442&s=9BB59EAE400634E3502F402D0300F04B' }], }
]);
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
let menu = uni.getMenuButtonBoundingClientRect()
// headerSyle.value = {
// 	paddingTop: menu.top + menu.height + 5 + 'px',
// }
headerSyle.value = {
	height: menu.height + 'px',
	paddingTop: menu.top + 'px',
}
onLoad((option) => {
})
</script>
<style lang="less" scoped>
.IndexHeader {
	width: 100%;
	position: relative;
	align-items: center;

	.TopBgcImg {
		top: 0px;
		position: absolute;
		width: 100%;
		z-index: -1;
		height: 466rpx;
		background: linear-gradient(360deg, #fff 0%, #abe4ff 100%);
	}

	.IndexHeaderLogo {
		margin-left: 20rpx;
		margin-right:6rpx;
	}

	.IndexHeaderLeft {
		font-size: 28rpx;
	}
}


.TopSearch {
	padding-bottom: 20rpx;
	z-index: 10;
	padding-top: 10px;

	.SearchInput {
		height: 60rpx;
		background-color: #fff;
		width: 710rpx;
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

.HomeList {
	height: 100rpx;
	width: 100%;
	overflow: hidden;
}

.HomeMain {
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column nowrap;
	z-index: 10;
}

.ClassList {
	background-color: #fff;
	border-radius: 16rpx;
	width: 710rpx;
	margin: 0rpx 20rpx;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	padding: 20rpx 10rpx 0rpx 10rpx;
	box-sizing: border-box;

	.classItem {
		margin: 0rpx 10rpx;
		margin-bottom: 20rpx;
	}

	.classItemImg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.classItemTitle {
		font-size: 24rpx;
		margin-top: 10rpx;
	}
}

.KeyRecommend {
	width: 710rpx;
	margin: 20rpx;
	justify-content: space-between;

	.KeyRecommendItem {
		border-radius: 16rpx;
		margin-right: 10rpx;
		padding: 15rpx;

		&:first-child {
			background: linear-gradient(#c7f0d0 0%, rgb(234, 248, 241) 20%, #fff 100%);
		}

		&:nth-child(2) {
			background: linear-gradient(rgb(255, 232, 201) 0%, rgb(254, 251, 241) 20%, #fff 100%);
		}

		&:last-child {
			background: linear-gradient(rgb(252, 201, 200) 0%, rgb(253, 243, 244) 20%, #fff 100%);
			margin-right: 0rpx;
		}

		.KeyRecommendTitle {
			font-size: 36rpx;
			font-weight: bold;
			font-family: 楷体;
		}

		.KeyRecommendKey {
			margin-top: 6rpx;
			font-size: 24rpx;
		}
	}

	.KeyRecommendItemList {
		justify-content: space-between;
		margin-top: 10rpx;

		.KeyRecommendItemLiItem {
			position: relative;
			padding-bottom: 20rpx;

			&+.KeyRecommendItemLiItem {
				margin-left: 10rpx;
			}
		}

		.KeyRecommendImg {
			width: 145rpx;
			height: 145rpx;
			border-radius: 8rpx;
		}

		.KeyRecommendPrice {
			position: absolute;
			background-color: #fefefe;
			border-radius: 10rpx;
			bottom: 0rpx;
			font-weight: 500;
			padding: 0rpx 10rpx;
		}
	}
}

.RecommendList {
	width: 710rpx;
	margin: 20rpx;
}

.RecommendListItem {
	display: block;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}
</style>