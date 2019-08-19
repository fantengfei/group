//app.js

const session = require('./utils/session.js')

App({
    onLaunch: function() {
        const self = this
        session.getOpenID((openID) => {
            console.log('openID: ' + openID)
            self.globalData.openID = openID
        })
    },

    globalData: {
        userInfo: null,
        openID: null
    }
})