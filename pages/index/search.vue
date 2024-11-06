<template>
	<view class="ContainerPage">
		<view class="TopSearch FlexRow FlexJCenter">
			<view class="SearchInput FlexRow FlexACenter">
				<input @focus="searchFocus" v-model="search" placeholder-class="FontGray" class="FlexGrow SearchInputValue" @confirm="searchConfirm" confirm-type="search" placeholder="榴莲千层" />
				<text @click="searchClear" v-if="search && hasSearchFocus" class="FontGray icon-chacha iconfont"></text>
			</view>
			<text @click="searchConfirm" v-if="hasSearchFocus" class="SearchInputBtn FlexRow FlexACenter FontWhite">搜索</text>
			<view v-if="!hasSearchFocus" class="FlexRow FlexCenter SearchInputCount" @click="goPage('/pages/index/shoppingCart')">
				<text :style="animation" class="iconfont icon-gouwuche1 FontSize34"></text>
				<view class="SearchInputNum" v-if="store.cartCount > 0">{{ store.cartCount }}</view>
			</view>
		</view>
		<view v-if="hasSearchFocus && search" class="FlexGrow FlexColumn SearchRecomments">
			<view @click="recommentClick(item)" v-for="item in recommentSearch" class="FlexRow FlexACenter SearchRecomment">
				<text v-for="(x, index) in formatSearch(item)" :class="index === 1 ? '' : 'FontBlue'">{{ x }}</text>
			</view>
		</view>
		<view class="FlexGrow SearchHistorys" v-else-if="hasSearchFocus">
			<view class="SearchHistoryTit FlexRow FlexACenter">
				<text class="FontSize32 FontDefault">搜索历史</text>
				<text @click="clearSearchHistory" class="iconfont icon-shanchu FontGray"></text>
			</view>
			<view class="SearchHistory FlexRow">
				<text @click="recommentClick(item)" class="SearchHistoryItem" v-for="item in searchHistory" :key="item">{{ item }}</text>
			</view>
			<view class="SearchHistoryTit FlexRow FlexACenter">
				<text class="FontSize32 FontDefault">搜索发现</text>
				<text @click="searchRecommentRefresh" class="iconfont icon-shuaxin FontGray"></text>
			</view>
			<view class="SearchHistory FlexRow">
				<text @click="recommentClick(item)" class="SearchHistoryItem" v-for="item in searchRecomment" :key="item">{{ item }}</text>
			</view>
		</view>
		<view v-else class="FlexGrow SearchResultList">
			<scroll-view scroll-y class="SearchResult">
				<view class="SearchSort FlexRow">
					<view @click="salesChange()" class="SearchSortItem FlexColumn FlexCenter" :class="'SearchSortSales' + salesSort">
						<text class="SearchSortText Font666">销量</text>
						<text class="iconfont icon-sanjiaoxing FontGray SearchSortUp"></text>
						<text class="iconfont icon-sanjiaoxing FontGray SearchSortDown"></text>
					</view>
					<view @click="priceChange()" class="SearchSortItem FlexColumn FlexCenter" :class="'SearchSortPrice' + priceSort">
						<text class="SearchSortText Font666">价格</text>
						<text class="iconfont icon-sanjiaoxing FontGray SearchSortUp"></text>
						<text class="iconfont icon-sanjiaoxing FontGray SearchSortDown"></text>
					</view>
				</view>
				<scroll-view type="custom">
					<grid-view type="masonry" main-axis-gap="20rpx" cross-axis-gap="20rpx" class="RecommendList">
						<ColumnShopItem v-for="(item, index) in recommendList" :key="index" class="RecommendListItem" :item="item"></ColumnShopItem>
					</grid-view>
				</scroll-view>
			</scroll-view>
		</view>
	</view>
	<Tips ref="tips"></Tips>
	<AddCartAnimation type="topRight" class="AddCartAnimations"></AddCartAnimation>
</template>
<script setup>
import { ref, watch } from 'vue'
import ColumnShopItem from '@/components/columnShopItem'
import AddCartAnimation from '@/components/addCartAnimation'
import { PublicStore } from '@/store/index'
const store = PublicStore()
let tips = ref(null)
let search = ref('')
let priceSort = ref(0)
let salesSort = ref(0)
let hasSearchFocus = ref(true)
let animation = ref('')
let recommentSearch = ref(['有机羊肉', '有机素菜', '有机大米', '有机水果'])
let searchHistory = ref(['有机羊肉', '有机素菜', '有机大米', '有机水果', '橘子', '粽子热卖', '小樱桃', '粽子热卖', '水果店', '牛肉'])
let searchRecomment = ref(['有机羊肉', '有机素菜', '有机大米', '有机水果', '橘子', '粽子热卖', '小樱桃', '粽子热卖', '水果店', '牛肉'])
let recommendList = ref([
	{ title: '泰国金枕榴莲10斤新鲜水果', addCart: true, price: 18.9, unit: '包', image: 'https://img.alicdn.com/imgextra/i2/2206506346948/O1CN01Z6LUmP21CEo5MJ24A_!!2206506346948-0-alimamacc.jpg_580x580q90.jpg_.webp' },
	{ title: '钦蜜9号黄金百香果', addCart: false, price: 18.9, unit: '包', image: 'https://gw.alicdn.com/imgextra/O1CN01SBMnFf2LY21uK7CAz_!!3937219703-0-C2M.jpg_580x580q90.jpg_.webp' },
	{ title: '涌泉蜜桔', addCart: true, price: 18.9, unit: '包', image: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2926862984/O1CN01s0eMx91XuiqFkddqJ_!!0-item_pic.jpg_580x580q90.jpg_.webp' },
	{ title: '猕猴桃5绿心弥', addCart: false, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i1/4080606508/O1CN01BJhq0J1xwiakVZzT2_!!4080606508-0-alimamacc.jpg_580x580q90.jpg_.webp' },
	{ title: '奶油富士苹果', addCart: true, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i4/6930157936/O1CN01j6jrp928UkAhHFdnU_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
	{ title: '奥利奥宇宙探索礼盒限定系列星空渐变色夹心饼干赠定制流体画周边', addCart: false, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i3/787936378/O1CN012YgZqz1wzB706Uj3z_!!787936378-0-alimamacc.jpg_580x580q90.jpg_.webp' },
])
watch(() => store.cartCount, () => {
	animation.value = 'transform:scale(1.5,1.5);'
	setTimeout(() => {
		animation.value = 'transform:scale(1,1);'
	}, 100)
})
const searchFocus = () => { // 搜索框获取焦点
	hasSearchFocus.value = true
}
const clearSearchHistory = () => { // 清空搜索历史
	searchHistory.value = []
}
const searchRecommentRefresh = () => { // 搜索推荐刷新
	searchRecomment.value = ['有机羊肉', '有机素菜', '有机大米', '有机水果', '粽子热卖', '水果店', '牛肉']
}
const searchClear = () => { // 清空查询
	search.value = ''
}
const formatSearch = (item) => { // 搜索推荐格式化
	let list = []
	item.split(search.value).map((item, index) => {
		list.push(item)
		if (index === 0) {
			list.push(search.value)
		}
	})
	return list
}
const recommentClick = (item) => {// 推荐点击
	search.value = item
	hasSearchFocus.value = false
}
const searchConfirm = () => { // 搜索
	if (search.value === '') {
		tips.value.show({ message: `请输入查询内容`, type: 'error' })
		return
	}
	hasSearchFocus.value = false
}
const salesChange = () => {
	if (salesSort.value === 2) {
		salesSort.value = 0
	} else {
		salesSort.value++
	}
}
const priceChange = () => {
	if (priceSort.value === 2) {
		priceSort.value = 0
	} else {
		priceSort.value++
	}
}
const goPage = (url) => {
	hasSearchFocus.value = false
	uni.navigateTo({ url: url })
}
</script>
<style lang="less" scoped>
.TopSearch {
	z-index: 10;
	width: 100%;
	padding: 0rpx 20rpx 20rpx 20rpx;
	box-sizing: border-box;

	.SearchInput {
		height: 60rpx;
		background-color: #fff;
		flex-grow: 1;
		box-sizing: border-box;
		padding-left: 30rpx;
		border-radius: 30rpx;
		position: relative;

		.icon-chacha {
			margin: 0rpx 10rpx;
			padding: 10rpx;
			z-index: 10;
		}
	}

	.SearchInputBtn {
		border-radius: 30rpx;
		height: 56rpx;
		flex-shrink: 0;
		padding: 0rpx 20rpx;
		margin-left: 10rpx;
		z-index: 10;
		background-color: #23a2ff;
	}

	.SearchInputCount {
		height: 56rpx;
		padding: 0rpx 10rpx;
		flex-shrink: 0;

		.SearchInputNum {
			position: absolute;
			background-color: #fe432e;
			color: #fff;
			border-radius: 20rpx;
			padding: 0rpx 8rpx;
			font-size: 22rpx;
			top: 0rpx;
			right: 6rpx;
		}
	}
}

.SearchRecomments {
	width: 100%;
	background-color: #fff;

	.SearchRecomment {
		padding: 10rpx 0rpx;
		margin: 0rpx 30rpx;
		letter-spacing: 4rpx;
		border-bottom: 2rpx solid rgba(225, 224, 224, 0.5);
	}
}

.SearchHistorys {
	width: 100%;
	background-color: #fff;
	border-radius: 16rpx 16rpx 0rpx 0rpx;
	padding: 0rpx 20rpx 20rpx 20rpx;
	box-sizing: border-box;

	.SearchHistoryTit {
		justify-content: space-between;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
	}

	.SearchHistory {
		flex-flow: wrap;
	}

	.SearchHistoryItem {
		padding: 10rpx 20rpx;
		font-size: 28rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 30rpx;
		background-color: #f6f6f6;
		color: #666;
	}
}

.SearchResultList {
	height: 100rpx;
	width: 100%;
	overflow: hidden;

	.SearchResult {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		z-index: 10;
	}

	.SearchSort {
		width: 100%;
		background-color: #fff;
		box-shadow: 0rpx 0rpx 100rpx 50rpx #fff
	}

	.SearchSortItem {
		width: 50%;
		position: relative;
		padding: 10rpx;
		box-sizing: border-box;

		.icon-sanjiaoxing {
			position: absolute;
			left: 56%;
			top: 6rpx;
			transform: scale(0.3);
		}

		.SearchSortDown {
			transform: rotate(180deg) scale(0.3);
			top: 18rpx;
		}

		&.SearchSortSales1 {
			.SearchSortUp {
				color: #23a2ff;
			}
		}

		&.SearchSortSales2 {
			.SearchSortDown {
				color: #23a2ff;
			}
		}

		&.SearchSortPrice1 {
			.SearchSortUp {
				color: #23a2ff;
			}
		}

		&.SearchSortPrice2 {
			.SearchSortDown {
				color: #23a2ff;
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
}
</style>