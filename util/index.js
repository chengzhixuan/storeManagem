import { PublicStore } from '@/store/index'
let mainLogin = (v) => {
    uni.login({
        provider: 'weixin',
        async success(loginResult) {
            if (loginResult.code) {
                login(v, loginResult.code)
            } else {
                uni.hideLoading();
                console.log('小程序登录失败' + loginResult.errMsg)
            }
        },
        fail(err) {
            console.log(err);
            uni.hideLoading();
            console.log('小程序登录失败' + err)
        }
    })
}
let login = (v = {}, code) => {
    let stores = PublicStore()
    uni.hideLoading();
    uni.showToast({ title: '登录成功', icon: 'success', mask: true });
    getApp().globalData.token = ''
    stores.setUserMsg({})
    stores.setHasLogin(true)
}
function compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
        v1.push('0')
    }
    while (v2.length < len) {
        v2.push('0')
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i])
        const num2 = parseInt(v2[i])

        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }
    return 0
}

function getQueryString(url, name) {
    try {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = url.split(/(.*)/)[1].match(reg);
        if (r !== null) {
            return r[2];
        }
    } catch (error) {
        return '';
    }
}
function encodePhone(phone) {
    if (regPhone(phone)) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    } else {
        return phone.replace(/(\d{3})\S+(\d{3})/, '$1****$2')
    }
}
function regPhone(phone) { // 正则手机号匹配
    let reg = /^((\+86)|(86)|(86-)|(86\s))?(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
    return reg.test(phone)
}
export { mainLogin, SideEffectList, compareVersion, getQueryString, regPhone, encodePhone }