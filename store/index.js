import { defineStore } from 'pinia';

export const PublicStore = defineStore('Public', {
    state: () => {
        return {
            userMsg: {},
            hasLogin: false,
        };
    },
    getters: {
        getUserMsg: (state) => {
            return state.userMsg
        },
        getHasLogin: (state) => {
            return state.hasLogin
        }
    },
    // 也可以这样定义
    actions: {
        setUserMsg(msg) {
            this.userMsg = msg
        },
        setHasLogin(msg) {
            this.hasLogin = msg
        }
    },
});