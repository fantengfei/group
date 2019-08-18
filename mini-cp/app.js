//app.js
App({
    onLaunch: function() {
        const self = this
        wx.checkSession({
            fail () {
                wx.showLoading({
                    title: '数据加载中',
                })
                self.login((success) => {
                    wx.hideLoading()
                    if (!success) {
                        wx.showToast({
                            title: '加载失败',
                        })
                        return
                    }
                    if (self.callbackIfNeed) {
                        self.callbackIfNeed(false)
                    }
                })
            },
            success () {
                wx.getStorage({
                    key: 'openid',
                    success(res) {
                        self.globalData.openID = res.data
                        console.info('openID: ' + self.globalData.openID)
                        if (self.callbackIfNeed) {
                            self.callbackIfNeed(false)
                        }
                    }
                })
            }
        })
    },

    login: function (callback) {
        const self = this
        wx.login({
            success: res => {
                const api = require('utils/api.js')
                wx.request({
                    url: api.host + '/mini/login',
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    success: res => {
                        wx.setStorage({
                            key: "openid",
                            data: res.data.openid
                        })
                        callback(true)
                    }
                })
            }
        })
    },

    globalData: {
        logining: true,
        userInfo: null,
        openID: null
    }
})