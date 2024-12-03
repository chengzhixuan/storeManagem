<script>
import { mainLogin } from '@/util'
export default {
	globalData: {
		token: uni.getStorageSync('token') ? uni.getStorageSync('token') : '',
	},
	onLaunch: function (v) {
		uni.showLoading({
			title: '登录授权中...',
			mask: true
		});
		mainLogin(v)
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
@import "@/static/font/iconfont.css";
@import "@/static/styles/style.scss";
@import "@/static/styles/golbal.scss";
@import "@/uni_modules/uni-scss/index.scss";
</style>
