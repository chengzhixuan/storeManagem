<template>
	<view class="ContainerPage">
		<view class="TopSearch FlexRow FlexJCenter">
			<view class="SearchInput FlexRow FlexACenter">
				<input @focus="searchFocus" ref="searchInputRef" focus v-model="search" placeholder-class="FontGray" class="FlexGrow SearchInputValue" confirm-type="search" placeholder="榴莲千层" />
				<text v-if="hasSearchFocus" class="SearchInputBtn FlexRow FlexACenter FontWhite">搜索</text>
				<text @click="search = ''" v-if="search" class="FontGray icon-chacha iconfont"></text>
			</view>
		</view>
		<view v-if="hasSearchFocus && search" class="FlexGrow FlexColumn SearchRecomments">
			<view v-for="item in recommentSearch" class="FlexRow FlexACenter SearchRecomment">
				<text v-for="(x, index) in formatSearch(item)" :class="index === 1 ? '' : 'FontBlue'">{{ x }}</text>
			</view>
		</view>
		<view class="FlexGrow SearchHistorys" v-else-if="hasSearchFocus">
			<view class="SearchHistoryTit FlexRow FlexACenter">
				<text class="FontSize32 FontDefault">搜索历史</text>
				<text class="iconfont icon-shanchu FontGray"></text>
			</view>
			<view class="SearchHistory FlexRow">
				<view class="SearchHistoryItem">橘子</view>
				<view class="SearchHistoryItem">粽子热卖</view>
				<view class="SearchHistoryItem">小樱桃</view>
				<view class="SearchHistoryItem">粽子热卖</view>
				<view class="SearchHistoryItem">水果店</view>
				<view class="SearchHistoryItem">牛肉</view>
			</view>
			<view class="SearchHistoryTit FlexRow FlexACenter">
				<text class="FontSize32 FontDefault">搜索发现</text>
				<text class="iconfont icon-shuaxin FontGray"></text>
			</view>
			<view class="SearchHistory FlexRow">
				<view class="SearchHistoryItem">橘子</view>
				<view class="SearchHistoryItem">粽子热卖</view>
				<view class="SearchHistoryItem">小樱桃</view>
				<view class="SearchHistoryItem">粽子热卖</view>
				<view class="SearchHistoryItem">水果店</view>
				<view class="SearchHistoryItem">牛肉</view>
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
	<AddCartAnimation class="AddCartAnimations"></AddCartAnimation>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted, watch } from 'vue'
import ColumnShopItem from '@/components/columnShopItem'
import AddCartAnimation from '@/components/addCartAnimation'
let tips = ref(null)
let search = ref('有')
let priceSort = ref(0)
let salesSort = ref(0)
let hasSearchFocus = ref(false)
let searchInputRef = ref(null)
let recommentSearch = ref(['有机羊肉', '有机素菜', '有机大米', '有机水果'])
let recommendList = ref([
	{ title: '泰国金枕榴莲10斤新鲜水果', addCart: true, price: 18.9, unit: '包', image: 'https://img.alicdn.com/imgextra/i2/2206506346948/O1CN01Z6LUmP21CEo5MJ24A_!!2206506346948-0-alimamacc.jpg_580x580q90.jpg_.webp' },
	{ title: '钦蜜9号黄金百香果', addCart: false, price: 18.9, unit: '包', image: 'https://gw.alicdn.com/imgextra/O1CN01SBMnFf2LY21uK7CAz_!!3937219703-0-C2M.jpg_580x580q90.jpg_.webp' },
	{ title: '涌泉蜜桔', addCart: true, price: 18.9, unit: '包', image: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2926862984/O1CN01s0eMx91XuiqFkddqJ_!!0-item_pic.jpg_580x580q90.jpg_.webp' },
	{ title: '猕猴桃5绿心弥', addCart: false, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i1/4080606508/O1CN01BJhq0J1xwiakVZzT2_!!4080606508-0-alimamacc.jpg_580x580q90.jpg_.webp' },
	{ title: '奶油富士苹果', addCart: true, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i4/6930157936/O1CN01j6jrp928UkAhHFdnU_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
	{ title: '奥利奥宇宙探索礼盒限定系列星空渐变色夹心饼干赠定制流体画周边', addCart: false, price: 18.9, unit: '包', image: 'http://img.alicdn.com/img/i3/787936378/O1CN012YgZqz1wzB706Uj3z_!!787936378-0-alimamacc.jpg_580x580q90.jpg_.webp' },
])
onLoad((option) => {
})
const searchFocus = () => {
	hasSearchFocus.value = true
}
const formatSearch = (item) => {
	let list = []
	item.split(search.value).map((item, index) => {
		list.push(item)
		if (index === 0) {
			list.push(search.value)
		}
	})
	return list
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
const openPage = (url) => {
	uni.navigateTo({ url: url })
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
		padding-left: 30rpx;
		border-radius: 30rpx;
		position: relative;

		.SearchInputBtn {
			border-radius: 30rpx;
			height: 56rpx;
			margin-right: 2rpx;
			padding: 0rpx 20rpx;
			background-color: #23a2ff;
		}

		.icon-chacha {
			position: absolute;
			top: 16rpx;
			right: 100rpx;
			z-index: 10;
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