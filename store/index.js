import { defineStore } from 'pinia';

export const PublicStore = defineStore('Public', {
    state: () => {
        return {
            userMsg: {},
            hasLogin: false,
            cartCount: 0,
            cartAnimation: {},
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
    },
});