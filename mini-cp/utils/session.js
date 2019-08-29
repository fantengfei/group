
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
    const makeItems = (list = []) => {
        if (list.length == 0) {
            console.log('show append and items')
            return
        }
        var items = []
        for (const key in list) {
            const v = list[key]
            const item = {
                pagePath: v.path,
                iconPath: v.icon,
                selectedIconPath: v.selected_icon,
            }
            items.push(item)
        }
        callback(items)
    }

    wx.showLoading({ title: '数据加载中...' })
    const api = require('api.js')
    api.getTabbar((data) => {
        makeItems(data)
        wx.hideLoading()
    }, (fail) => {
        makeItems()
        wx.hideLoading()
    })
}

module.exports = {
    getOpenID: getOpenID,
    getTabbar: configTabbar
}

