
const login = callback => {
    wx.login({
        success: res => {
            const api = require('./api.js')
            wx.request({
                url: api.host + 'login',
                method: 'GET',
                header: {
                    code: res.code
                },
                success: res => {
                    wx.setStorage({
                        key: "openid",
                        data: res.data.openid
                    })
                    callback(res.data.openid)
                },
                fail() {
                    callback(null)
                }
            })
        },
        fail() {
            callback(null)
        }
    })
}

const getOpenID = result => {
    wx.checkSession({
        fail() {
            wx.showLoading({ title: '' })
            login((openID) => {
                wx.hideLoading()
                result(openID)
            })
        },
        success() {
            wx.getStorage({
                key: 'openid',
                success(res) {
                    result(res.data)
                },
                fail() {
                    result(null)
                }
            })
        }
    })
}


const configTabbar = (callback) => {
    const self = this
    wx.showLoading({ title: '数据加载中' })
    const api = require('api.js')
    api.getTabbar((data) => {
        console.log(data)
        callback(data.type)
        wx.hideLoading()
    }, (fail) => {
        callback(2)
        wx.hideLoading()
    })
}

module.exports = {
    getOpenID: getOpenID,
    getPageType: configTabbar
}

