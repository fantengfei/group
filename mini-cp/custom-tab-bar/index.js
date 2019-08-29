Component({
    properties: {
        list:[],
        selected: 0
    },
    data: {
        selected: 0,
        isShow: false,
        color: "#7A7E83",
        selectedColor: "#3cc51f",
        backgroundColor: "#EDEDED",
        list: [{
            pagePath: "../index/index",
            iconPath: "../res/image/match.png",
            selectedIconPath: "../res/image/selected-match.png",
            text: ""
        }, {
            pagePath: "../mine/mine",
            iconPath: "../res/image/mine.png",
            selectedIconPath: "../res/image/selected-mine.png",
            text: ""
        }]
    },
    attached() {},
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.redirectTo({ url })
            wx.vibrateShort()
        }
    }
})