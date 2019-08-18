Component({
    data: {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#3cc51f",
        list: [{
            pagePath: "../index/index",
            iconPath: "",
            selectedIconPath: "",
            text: "匹配"
        }, {
            pagePath: "../mine/mine",
            iconPath: "",
            selectedIconPath: "",
            text: "我的"
        }]
    },
    attached() {
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({ url })
            this.setData({
                selected: data.index
            })
        }
    }
})