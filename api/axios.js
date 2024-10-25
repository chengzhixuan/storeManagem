import { mainLogin } from '@/util'
import { PublicStore } from '@/store/index'
let baseURL = '';
let state401 = false;
const api = async ({ url, method = 'POST', data, header = {} }) => {
    let token = getApp().globalData.token;
    header['token'] = token;
    return new Promise((resolve, reject) => {
        console.log("接口：", url, "参数", data);
        uni.request({
            url: baseURL + url,
            data: data,
            method: method,
            header: header,
            success: (res) => {
                if (res.data.code === 401) {
                    if (state401 === false) {
                        let stores = PublicStore()
                        state401 = true;
                        getApp().globalData.token = ''
                        stores.setUserMsg({})
                        stores.setHasLogin(false)
                        mainLogin();
                        setTimeout(() => {
                            state401 = false;
                        }, 3000);
                    }
                } else {
                    resolve(res.data)
                }
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}
export { baseURL }
export default api