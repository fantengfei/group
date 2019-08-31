// pages/news/news.js

const util = require('../../utils/util.js')

Component({
    properties: {

    },

    data: {
        navStyle: {}
    },

    attached: function() {
        this.setData({
            navStyle: `padding-top: ${util.statusBarHeight + util.menuMargin}px; padding-bottom:${util.menuMargin}px; height:${util.menuHeight}px;`
        })
    },  

    methods: {
        
    }
})
