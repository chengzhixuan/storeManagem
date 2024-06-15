<template>
	<Container type="shoppingCart" class="ContainerPage">
		
	</Container>
	<Tips ref="tips"></Tips>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted, computed } from 'vue'
import { PublicStore } from '@/store/index'
const store = PublicStore()
let tips = ref(null)
let shopList = ref([
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

</script>
<style lang="less" scoped>

</style>