
// const host = 'http://localhost:3000/mini/'
const host = 'https://www.somenews.cn/mini/'


const syncUserInfo = (success = () => {}, fail = () => {}) => {
    const app = getApp()
    const postData = () => {
        wx.request({
            method: 'POST',
            url: host + 'update-user-info',
            data: {
                content: app.data.userInfo,
                phone: app.data.phone,
                openID: app.data.openID
            },
            success(res) {
                console.log(res)
                success()
            },
            fail(res) {
                console.log(res)
                fail(res)
            }
        })
    }

    if (app.data.openID != null) {
        postData()
        return
    }
    
    const session = require('./session.js')
    session.getOpenID(openID => {
        if (openID == null) {
            return
        }
        app.data.openID = openID
        postData()
    })
}

module.exports = {
    host: host,
    syncUserInfo: syncUserInfo
}