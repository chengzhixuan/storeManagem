import axios from './axios'

export default {
    login(code) {
        let platform = 'wechat'
            // #ifdef MP-QQ
        platform = 'qq'
            // #endif
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `/user/login`,
                data: { code, platform }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getUserInfo() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `/user/getUserMsg`,
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 设置用户信息
     * @param {*} avatar 
     * @param {*} name 
     * @returns 
     */
    setUserInfo(avatar, name) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/user/setUserMsg',
                data: { avatar, name }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 获取用户设置
     */
    getUserSet() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/user/getUserSet',
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 修改用户配置
     * @param {*} shareMedical 是否允许分享0否 1是
     * @returns 
     */
    updateUserSet(shareMedical) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/user/updateUserSet',
                data: { shareMedical }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 修改用户的检测记录显示设置
     * @param {*} examType 
     * @returns 
     */
    updateSetExamType(examType) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/user/updateSetExamType',
                data: { examType }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 设置pc扫描登录的code
     * @param {*} code 
     * @returns 
     */
    setQrLogin(code) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/user/setQrLogin',
                data: { code }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * ai聊天
     * @param {*} question 
     * @returns 
     */
    aiChat(question) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/user/aiChat',
                data: { question }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}