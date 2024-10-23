import { defineStore } from 'pinia';

export const PublicStore = defineStore('Public', {
    state: () => {
        return {
            userMsg: {},
            hasLogin: false,
            cartCount: 0,
            cartAnimation: {},
            selectAaddress: {},
        };
    },
    getters: {
        getUserMsg: (state) => {
            return state.userMsg
        },
        getHasLogin: (state) => {
            return state.hasLogin
        },
        getCartCount: (state) => {
            return state.cartCount
        },
        getCartAnimation: (state) => {
            return state.cartAnimation
        },
        getSelectAaddress: (state) => {
            return state.selectAaddress
        },
    },
    // 也可以这样定义
    actions: {
        setUserMsg(msg) {
            this.userMsg = msg
        },
        setHasLogin(msg) {
            this.hasLogin = msg
        },
        setCartCount() {
            this.cartCount++
        },
        setCartAnimation(state) {
            this.cartAnimation = state
        },
        setSelectAaddress(msg) {
            this.selectAaddress = msg
        },
    },
});