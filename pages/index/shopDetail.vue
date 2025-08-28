<template>
	<view type="Home" class="ContainerPage">
		<view class="DetailHeader FlexRow FlexACenter" :style="headerSyle">
			<view class="HeaderBtn FlexRow FlexACenter" @click="goBack">
				<text class="iconfont icon-left FontSize30 FontWhite"></text>
			</view>
			<view class="FlexGrow"></view>
			<view class="HeaderBtnsRight FlexRow FlexACenter" :style="{ marginRight: menuPlaceholderWidth + 'px' }">
				<view class="HeaderBtn FlexRow FlexACenter" @click="openSearch">
					<text class="iconfont icon-sousuo FontSize30 FontWhite"></text>
				</view>
				<view class="HeaderBtn FlexRow FlexACenter" @click="share">
					<text class="iconfont icon-a-fenxiangfenxiang2share FontSize30 FontWhite"></text>
				</view>
				<view class="HeaderBtn FlexRow FlexACenter" @click="goPage('/pages/index/shoppingCart')">
					<text :style="animation" class="iconfont icon-gouwuche1 FontSize30 FontWhite"></text>
					<view class="HeaderBtnNum" v-if="store.cartCount > 0">{{ store.cartCount }}</view>
				</view>
			</view>
		</view>
		<swiper class="DetailSwiper" indicator-dots indicator-active-color="#23a2ff" autoplay circular :interval="3500" :duration="500">
			<swiper-item v-for="(img, idx) in banners" :key="idx" class="DetailSwiperItem">
				<image :src="img" mode="aspectFill" class="DetailSwiperImg" />
			</swiper-item>
		</swiper>
		<view class="DetailInfo">
			<view class="PriceRow FlexRow FlexACenter">
				<text class="PriceNow">¥{{ discountPrice.toFixed(2) }}</text>
				<text class="PriceOrigin FontGray">¥{{ price.toFixed(2) }}</text>
				<text class="PriceTag">优惠价</text>
			</view>
			<view class="Title">{{ title }}</view>
			<view class="TagsRow FlexRow">
				<text class="TagItem Font666" v-for="(t, i) in tags" :key="i">{{ t }}</text>
			</view>
			<view class="TitleSub Font666">100%椰子水</view>
		</view>
		<view class="DetailCard">
			<view class="FlexRow DetailCardItem" @click="openSkuPopup">
				<text class="DetailCardLable FontGray">选择</text>
				<view class="FlexRow FlexACenter DetailCardContent FlexGrow">
					<text class="DetailCardText FlexGrow">{{ selectedSkuText }}</text>
					<text class="DetailCardTag">共2种净含量/规格可选</text>
					<text class="iconfont icon-right FontSize24 FontGray"></text>
				</view>
			</view>
			<view class="FlexRow DetailCardItem" @click="openDeliveryInfo">
				<text class="DetailCardLable FontGray">商品</text>
				<view class="DetailCardContent FlexGrow FlexRow FlexACenter">
					<text class="DetailCardTag" v-for="(service, index) in services" :key="index">{{ service.name }}</text>
					<text class="FlexGrow"></text>
					<text class="iconfont icon-right FontSize24 FontGray"></text>
				</view>
			</view>
		</view>
	</view>
	<Tips ref="tips"></Tips>
	<SkuPopup ref="skuPopup"></SkuPopup>
	<uni-popup ref="servicePopup" type="bottom" :safe-area="true">
		<view class="ServicePopup">
			<view class="FlexRow FlexCenter ServiceHeader">
				<view class="ServiceTitle">服务说明</view>
				<view class="ServiceClose" @click="servicePopup.close && servicePopup.close()">
					<text class="iconfont icon-guanbi"></text>
				</view>
			</view>
			<scroll-view scroll-y="true" class="ServiceBody">
				<view class="ServiceItem" v-for="(item, idx) in serviceItems" :key="idx">
					<view class="ServiceItemTitle FlexRow FlexACenter">
						<text class="ServiceDot"></text>
						<text class="FontBold">{{ item.title }}</text>
					</view>
					<view class="ServiceItemContent Font666" v-for="(line, i) in item.contents" :key="i">{{ line }}</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import SkuPopup from '@/components/skuPopup'
import { ref, watch, computed } from 'vue'
import { PublicStore } from '@/store/index'
let store = PublicStore()
let headerSyle = ref({})
let menuPlaceholderWidth = ref(0)
let tips = ref(null)
let animation = ref('')
let banners = ref([
	'https://img.alicdn.com/imgextra/i2/2206506346948/O1CN01Z6LUmP21CEo5MJ24A_!!2206506346948-0-alimamacc.jpg_580x580q90.jpg_.webp',
	'https://gw.alicdn.com/imgextra/O1CN01SBMnFf2LY21uK7CAz_!!3937219703-0-C2M.jpg_580x580q90.jpg_.webp',
])
let price = ref(99.0)
let discountPrice = ref(79.0)
let title = ref('泰国金枕榴莲10斤 新鲜现摘 产地直发')
let tags = ref(['现摘速发', '坏果包赔', '产地直发'])

// SKU相关数据
let skuPopup = ref(null)
let servicePopup = ref(null)
let selectedSku = ref({})
let services = ref([
	{ name: '慢必赔', icon: 'icon-dagou', detail: '承诺48小时内发货，超时发货将获得相应赔偿，确保您的购物体验。' },
	{ name: '缺必赔', icon: 'icon-dagou', detail: '如遇商品缺货，我们将第一时间通知您并给予相应补偿，保障您的权益。' },
	{ name: '坏果包赔', icon: 'icon-dagou', detail: '收到商品如有损坏，拍照上传即可获得全额赔付，让您购物无忧。' }
])
// 服务说明弹窗数据
let serviceItems = ref([
    {
        title: '运费规则',
        contents: [
            '1. 盒马鲜生/盒马mini店线上订单，单笔订单实付金额未达所在城市的免运费门槛，收取6元/单。',
            '2. 盒马X会员店线上订单，单笔订单实付金额小于199元，收取运费，具体以页面展示为准。'
        ]
    },
    {
        title: '缺必赔',
        contents: [
            '若您购买的订单出现缺货，我们将对该缺货商品予以退款，并额外补偿您一张5元无门槛歉意券。'
        ]
    },
    {
        title: '慢必赔',
        contents: [
            '提供慢必赔服务保障，若订单超时10分钟以上送达，签收后将补偿3元至10元无门槛歉意券，具体以页面展示为准（恶劣天气等不可控因素导致延误除外）。'
        ]
    },
    {
        title: '品质保证',
        contents: [
            '对商品品质不满意可直接在“我的-全部订单-订单详情-申请退款”发起退款，或在“我的-页面右上角联系客服”进行售后处理。'
        ]
    }
])
let selectedSkuText = computed(() => {
	const size = selectedSku.value.size || '请选择规格'
	if (size === '请选择规格') {
		return '请选择规格'
	}
	return `已选: ${size === '250ml' ? '250ml*6' : '1000ml*1'}`
})

let menu = uni.getMenuButtonBoundingClientRect()
let sys = uni.getSystemInfoSync()
headerSyle.value = { height: menu.height + 'px', paddingTop: menu.top + 'px' }
menuPlaceholderWidth.value = sys.windowWidth - menu.left + 10

onLoad(() => { })
watch(() => store.cartCount, () => {
	animation.value = 'transform:scale(1.5,1.5);'
	setTimeout(() => {
		animation.value = 'transform:scale(1,1);'
	}, 100)
})
// 交互
const goBack = () => {
	uni.navigateBack()
}
const openSearch = () => {
	uni.navigateTo({ url: '/pages/index/search' })
}
const share = () => {
	uni.showToast({ title: '点击分享', icon: 'none' })
}
const goPage = (url) => {
	uni.navigateTo({ url })
}
const openSkuPopup = () => { // 打开SKU弹窗
	skuPopup.value.open()
}
const openDeliveryInfo = () => { // 打开服务说明弹窗
	servicePopup.value.open()
}
</script>

<style lang="less" scoped>
.DetailHeader {
	width: 100%;
	padding: 0 20rpx;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
	box-sizing: content-box;

	.HeaderBtn {
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		padding: 10rpx;
		position: relative;
	}

	.HeaderBtnsRight {
		.HeaderBtn {
			margin-right: 10rpx;
		}
	}

	.HeaderBtnNum {
		position: absolute;
		background-color: #fe432e;
		color: #fff;
		border-radius: 20rpx;
		padding: 0rpx 8rpx;
		font-size: 22rpx;
		top: -6rpx;
		right: -4rpx;
	}
}

.DetailSwiper {
	width: 100%;
	height: 700rpx;
	background: #f7f7f7;
}

.DetailSwiperItem {
	width: 100%;
	height: 100%;
}

.DetailSwiperImg {
	width: 100%;
	height: 100%;
}

.DetailInfo {
	background: #fff;
	margin-top: 20rpx;
	padding: 20rpx;
	width: 710rpx;
	box-sizing: border-box;
	margin: 10rpx 20rpx;
	border-radius: 16rpx;

	.PriceRow {
		align-items: baseline;
	}

	.PriceNow {
		color: #ff4d4f;
		font-size: 44rpx;
		font-weight: 700;
	}

	.PriceOrigin {
		margin-left: 16rpx;
		text-decoration: line-through;
		font-size: 26rpx;
	}

	.PriceTag {
		margin-left: 16rpx;
		font-size: 22rpx;
		color: #23a2ff;
		background: #e9f6ff;
		border-radius: 8rpx;
		padding: 4rpx 10rpx;
	}

	.Title {
		margin-top: 14rpx;
		font-size: 32rpx;
		font-weight: 600;
		line-height: 1.5;
	}

	.TagsRow {
		margin-top: 12rpx;
		flex-wrap: wrap;
	}

	.TagItem {
		font-size: 22rpx;
		background: #f5f5f5;
		border-radius: 20rpx;
		padding: 6rpx 14rpx;
		margin-right: 12rpx;
	}

	.TitleSub {
		margin-top: 14rpx;
		font-size: 24rpx;
	}
}

.DetailCard {
	background: #fff;
	margin: 20rpx;
	border-radius: 16rpx;
	box-sizing: border-box;
	width: 710rpx;
	overflow: hidden;
	padding: 10rpx 0rpx;

	.DetailCardItem {
		padding: 10rpx 20rpx;
		border-radius: 0;
		width: 100%;
		box-sizing: border-box;
		align-items: flex-start;
	}

	.DetailCardLable {
		margin-top: 4rpx;
	}

	.DetailCardContent {
		margin-left: 10rpx;

		.DetailCardTag {
			background: #f5f5f5;
			border-radius: 8rpx;
			padding: 4rpx 10rpx;
			margin-right: 10rpx;
		}
	}
}

.ServicePopup {
	background: #fff;
	border-radius: 24rpx 24rpx 0 0;
	max-height: 80vh;
	overflow: hidden;

	.ServiceHeader {
		position: relative;
		padding: 30rpx 80rpx 20rpx 30rpx;
		.ServiceTitle {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
		}

		.ServiceClose {
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.iconfont {
				font-size: 40rpx;
				color: #999;
			}
		}
	}

	.ServiceBody {
		max-height: 60vh;
		padding: 20rpx 30rpx 40rpx 30rpx;
		box-sizing: border-box;
	}

	.ServiceItem {
		margin-bottom: 24rpx;

		.ServiceItemTitle {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 12rpx;

			.FontBold {
				font-weight: 600;
			}

			.ServiceDot {
				width: 12rpx;
				height: 12rpx;
				border-radius: 50%;
				background: #23a2ff;
				margin-right: 12rpx;
			}
		}

		.ServiceItemContent {
			font-size: 24rpx;
			line-height: 1.7;
			color: #666;
		}
	}
}
</style>