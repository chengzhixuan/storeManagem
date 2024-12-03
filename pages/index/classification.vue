<template>
	<Container type="class" class="ContainerPage">
		<view class="TopSearch FlexRow FlexJCenter">
			<view class="SearchInput FlexRow FlexACenter" @click="openPage('/pages/index/search')">
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
			<scroll-view scroll-y class="ClassShopScroll FlexGrow" @touchstart="touchstart" @touchend="touchend" :refresher-triggered="triggered" @scroll="scroll" :scroll-top="scrollTop" refresher-enabled @refresherrefresh="onRefresh" @refresherrestore="refresherrestore" @scrolltolower="scrolltolower">
				<view class="ShopLists FlexGrow">
					<RowShopItem v-for="(item, index) in recommendList" :key="index" :item="item"></RowShopItem>
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
import RowShopItem from '@/components/rowShopItem'
import AddCartAnimation from '@/components/addCartAnimation'
let tips = ref(null)
let classList = ref([
	{ title: '果蔬鲜花', id: '1111', image: 'https://img-1.pddpic.com/goods/2019-12-10/98ccf266fab125c2dfdb0288989de156.jpeg?imageView2/2/w/112/q/80/format/webp' },
	{ title: '肉禽蛋类', id: '2222', image: 'https://img-1.pddpic.com/goods/images/2019-08-02/09dda06eca2f05ca0f32a0ceecdc2d30.jpeg?imageView2/2/w/112/q/80/format/webp' },
	{ title: '海鲜水产', id: '3333', image: 'https://img-1.pddpic.com/goods/images/2019-08-02/23daf5e5542e2fe1e389b7c5d5e55f69.jpeg?imageView2/2/w/112/q/80/format/webp' },
	{ title: '豆类制品', id: '4444', image: 'https://img-1.pddpic.com/goods/images/2019-08-02/68ff9c12be49550de68a1a485eeb3dbd.jpeg?imageView2/2/w/112/q/80/format/webp' },
	{ title: '酒水饮料', id: '5555', image: 'https://img-1.pddpic.com/goods/images/2019-08-14/9621bf08433d6649c1426cd3ce368358.jpeg?imageView2/2/w/112/q/80/format/webp' },
	{ title: '美妆洗护', id: '6666', image: 'https://img-1.pddpic.com/goods/images/2019-08-19/87ad2d69b81c00f40228a9b2f75d9531.png?imageView2/2/w/112/q/80/format/webp' },
	{ title: '厨卫百货', id: '7777', image: 'https://img-1.pddpic.com/goods/images/2019-08-14/7eeb5a99b0916be6ad48911e52256d84.jpeg?imageView2/2/w/112/q/80/format/webp' },
	{ title: '餐饮熟食', id: '8888', image: 'https://img-1.pddpic.com/goods/2019-12-09/294fe3a8bf3df08bbb39418a6a209d3f.png?imageView2/2/w/112/q/80/format/webp' },
	{ title: '乳品烘焙', id: '9999', image: 'https://img.pddpic.com/goods/images/2019-01-29/a224bcb565d79072dbab3bb0418efdea.png?imageView2/2/w/1300/q/80/format/webp' },
	{ title: '休闲零食', id: '1010', image: 'https://img0.baidu.com/it/u=2665548877,4070133332&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' }
])
let selectClass = ref(0)
let subClass = ref(0)
let pageNo = ref(1)
let scrollTop = ref(0)
let triggered = ref(true)
let hasNextPage = ref(true)
let touchInfo = ref({})
let recommendList = ref([
	{ title: '泰国金枕榴莲10斤新鲜水果', subTitle: ['肉质饱满', '个大肉厚'], addCart: true, price: 18.9, unit: '包', image: 'https://img.alicdn.com/imgextra/i2/2206506346948/O1CN01Z6LUmP21CEo5MJ24A_!!2206506346948-0-alimamacc.jpg_580x580q90.jpg_.webp' },
	{ title: '钦蜜9号黄金百香果', addCart: false, price: 18.9, unit: '包', image: 'https://gw.alicdn.com/imgextra/O1CN01SBMnFf2LY21uK7CAz_!!3937219703-0-C2M.jpg_580x580q90.jpg_.webp' },
	{ title: '涌泉蜜桔', addCart: true, price: 18.9, unit: '包', image: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2926862984/O1CN01s0eMx91XuiqFkddqJ_!!0-item_pic.jpg_580x580q90.jpg_.webp' },
	{ title: '猕猴桃5绿心弥', addCart: false, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i1/4080606508/O1CN01BJhq0J1xwiakVZzT2_!!4080606508-0-alimamacc.jpg_580x580q90.jpg_.webp' },
	{ title: '奶油富士苹果', subTitle: ['肉质饱满', '个大肉厚'], addCart: true, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i4/6930157936/O1CN01j6jrp928UkAhHFdnU_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
	{ title: '奥利奥宇宙探索礼盒限定系列星空渐变色夹心饼干', addCart: false, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i3/787936378/O1CN012YgZqz1wzB706Uj3z_!!787936378-0-alimamacc.jpg_580x580q90.jpg_.webp' },
	{ title: '涌泉蜜桔', addCart: true, price: 18.9, unit: '包', image: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2926862984/O1CN01s0eMx91XuiqFkddqJ_!!0-item_pic.jpg_580x580q90.jpg_.webp' },
	{ title: '猕猴桃5绿心弥', addCart: false, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i1/4080606508/O1CN01BJhq0J1xwiakVZzT2_!!4080606508-0-alimamacc.jpg_580x580q90.jpg_.webp' },
	{ title: '奶油富士苹果', subTitle: ['肉质饱满', '个大肉厚'], addCart: true, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i4/6930157936/O1CN01j6jrp928UkAhHFdnU_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
	{ title: '奥利奥宇宙探索礼盒限定系列星空渐变色夹心饼干', addCart: false, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i3/787936378/O1CN012YgZqz1wzB706Uj3z_!!787936378-0-alimamacc.jpg_580x580q90.jpg_.webp' },
])
onLoad((option) => {
	classList.value.forEach(e => {
		e.childClass = [
			{ title: '西瓜蜜瓜' }, { title: '榴莲芒果' }, { title: '柿子/桃' }, { title: '苹果香蕉' }, { title: '葡萄石榴' }, { title: '新鲜果切' }, { title: '鲜花绿植' },
			{ title: '草莓蓝莓' }, { title: '火龙果' }, { title: '橘子柚子' }, { title: '进口水果' }, { title: '水果礼盒' }
		]
	});
	if (option.id) {
		selectClass.value = classList.value.findIndex(x => {
			return x.id === option.id
		})
	}
})
const scroll = (e) => { // 滚动
	scrollTop.value = e.detail.scrollTop
}
const onRefresh = () => {
	console.log('onRefresh')
	triggered.value = false;
	if (subClass.value > 0) {
		subClass.value--
		pageNo.value = 0
		recommendList.value = recommendList.value.slice(0, 10)
	} else {
		pageNo.value = 0
		recommendList.value = recommendList.value.slice(0, 10)
	}
}
const refresherrestore = () => { // 下拉刷新
	console.log('refresherrestore')
	triggered.value = true;
}
const scrolltolower = () => { // 加载更多
	if (!hasNextPage.value && subClass.value < classList.value[selectClass.value].childClass.length - 1) {
		pageNo.value = 0
		subClass.value++
		getList()
	} else {
		setTimeout(() => {
			pageNo.value++
			getList()
		}, 200)
	}
}
const touchstart = (e) => {
	touchInfo.value = e.changedTouches[0]
}
const touchend = (e) => {
	if (touchInfo.value.pageY - e.changedTouches[0].pageY > 50) {
		if (!hasNextPage.value && subClass.value < classList.value[selectClass.value].childClass.length - 1) {
			pageNo.value = 0
			subClass.value++
			getList()
		}
	}
}
const getList = () => {
	if (pageNo.value === 0) {
		recommendList.value = recommendList.value.slice(0, 10)
		setTimeout(() => {
			scrollTop.value = 0
		}, 200)
	} else {
		recommendList.value = recommendList.value.concat(recommendList.value.slice(0, 10))
	}
	if (pageNo.value === 3) { // 测试不存在下一页
		hasNextPage.value = false
	}
}
const openPage = (url) => {
	uni.navigateTo({ url: url })
}
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
			border: 4rpx solid #f0f0f0;
			border-radius: 50%;
			background-color: #fff;
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
		width: 100%;
		background-color: #fff;
		z-index: 10;
	}
}
</style>