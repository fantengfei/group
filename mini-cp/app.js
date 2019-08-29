//app.js

const session = require('./utils/session.js')

App({
    onLaunch: function() {
        const self = this
        session.getOpenID((openID) => {
            console.log('openID: ' + openID)
        })

        session.getTabbar((items) => {
            self.data.tabBarItems = items
            const url = items[0].pagePath
            console.log(url)
            wx.redirectTo({ url })
        })
    },

    data: {
        userInfo: null,
        openID: null,
        phone: null,
        tabBarItems: []
    }
})