//app.js

const session = require('./utils/session.js')

App({
    onLaunch: function() {
        const self = this
        // session.getOpenID((openID) => {
        //     console.log('openID: ' + openID)
        //     self.data.openID = openID
        // })
    },

    data: {
        userInfo: null,
        openID: null,
        phone: null
    }
})