<template>
	<Container type="Home" class="ContainerPage">
		<view class="IndexHeader FlexShrink FlexRow" :style="headerSyle">
			<text @click="openPage('/pages/addressBook/index')" class="iconfont icon-dizhiguanli FontSize40 FontGray IndexHeaderLogo"></text>
			<text @click="openPage('/pages/addressBook/index')" class="IndexHeaderLeft">太平洋海底比奇堡</text>
			<view class="TopBgcImg"></view>
		</view>
		<view class="TopSearch FlexRow FlexJCenter">
			<view @click="openPage('/pages/index/search')" class="SearchInput FlexRow FlexACenter">
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
						<ColumnShopItem v-for="(item, index) in recommendList" :key="index" class="RecommendListItem" :item="item"></ColumnShopItem>
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
let headerSyle = ref({})
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
	{ title: '休闲零食', id: '1010', image: 'https://img0.baidu.com/it/u=2665548877,4070133332&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
])
let keyRecommend = ref([
	{ title: '时令上新', keyWord: '0.01元试吃', list: [{ price: 18.9, image: 'https://img1.baidu.com/it/u=1886169339,2787405236&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300' }, { price: 18.9, image: 'https://img0.baidu.com/it/u=657564052,1211965729&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' }] },
	{ title: '回购榜单', keyWord: '0.01元试吃', list: [{ price: 18.9, image: 'https://img1.baidu.com/it/u=987640976,3660540952&fm=253&fmt=auto&app=138&f=JPEG?w=747&h=500' }] },
	{ title: '限时疯抢', keyWord: '0.01元试吃', list: [{ price: 18.9, image: 'https://img1.baidu.com/it/u=3748783928,501329490&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=300' }], }
]);
let recommendList = ref([
	{ title: '泰国金枕榴莲10斤新鲜水果', addCart: true, price: 18.9, unit: '包', image: 'https://img.alicdn.com/imgextra/i2/2206506346948/O1CN01Z6LUmP21CEo5MJ24A_!!2206506346948-0-alimamacc.jpg_580x580q90.jpg_.webp' },
	{ title: '钦蜜9号黄金百香果', addCart: false, price: 18.9, unit: '包', image: 'https://gw.alicdn.com/imgextra/O1CN01SBMnFf2LY21uK7CAz_!!3937219703-0-C2M.jpg_580x580q90.jpg_.webp' },
	{ title: '涌泉蜜桔', addCart: true, price: 18.9, unit: '包', image: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2926862984/O1CN01s0eMx91XuiqFkddqJ_!!0-item_pic.jpg_580x580q90.jpg_.webp' },
	{ title: '猕猴桃5绿心弥', addCart: false, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i1/4080606508/O1CN01BJhq0J1xwiakVZzT2_!!4080606508-0-alimamacc.jpg_580x580q90.jpg_.webp' },
	{ title: '奶油富士苹果', addCart: true, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i4/6930157936/O1CN01j6jrp928UkAhHFdnU_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
	{ title: '奥利奥宇宙探索礼盒限定系列星空渐变色夹心饼干赠定制流体画周边', addCart: false, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i3/787936378/O1CN012YgZqz1wzB706Uj3z_!!787936378-0-alimamacc.jpg_580x580q90.jpg_.webp' },
])
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
		margin-right: 6rpx;
	}

	.IndexHeaderLeft {
		font-size: 30rpx;
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