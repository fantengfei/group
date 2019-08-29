//index.js
const app = getApp()
const cst = require('../../utils/constants.js')
const audio = require('../../utils/audio.js')

Page({
    data: {
        heartOut1: '',
        heartOut2: '',
        heartOut3: '',
        heart: '',
        phoneOpenType: true,
        userInfoOpenType: true,
        menusAnimationData: {},
        searchAnimationData: {},
        items: app.data.tabBarItems
    },
    onLoad: function() {
        const self = this
        wx.getStorage({
            key: cst.userInfoKey,
            success: function(res) {
                app.data.userInfo = res.data
                self.setData({
                    userInfoOpenType: false
                })
            }
        })
        wx.getStorage({
            key: cst.userPhoneKey,
            success: function(res) {
                app.data.phone = res.data
                self.setData({
                    phoneOpenType: false
                })
            }
        })
    },

    onShow: function () {
        this.getTabBar().setData({
          selected: 0,
          isShow: true
        })
    },

    onReady: function() {
        const self = this 
        audio.initAudio((ctx) => {
            self.isPlay = false
            self.audioCtx = ctx
            self.playEffect()
        })
    },

    playEffect() {
        const play = (isPlay) => {
            isPlay ? this.audioCtx.play() : this.audioCtx.stop()
            this.setData({
                heartOut1: isPlay? 'out1': '',
                heartOut2: isPlay? 'out2': '',
                heartOut3: isPlay? 'out3': '',
                heart: isPlay? 'heart': ''
            })
        }

        play(this.isPlay)
        setTimeout(() => {
            play(false)
            this.playEffect()
        }, 950)
    },

    handleAnimation(show) {
        const create = () => {
            return wx.createAnimation({
                duration: 500,
                timingFunction: 'ease',
            })
        }
        if (!this.menusAnimation) {
            this.menusAnimation = create()
        }
        if (!this.searchAnimation) {
            this.searchAnimation = create()
        }
        
        this.menusAnimation.translateY(show ? 0 : 50).opacity(show ? 1 : 0).step()
        this.searchAnimation.translateY(show?0:50).step()
        this.setData({
            menusAnimationData: this.menusAnimation.export(),
            searchAnimationData: this.searchAnimation.export()
        })
    },

    getUserInfo(res) {
        console.log(res.detail.userInfo)
        app.data.userInfo = res.detail.userInfo
        wx.setStorage({
            key: cst.userInfoKey,
            data: res.detail.userInfo,
        })
        this.didTapMatching()
        
        const cloud = require('../../utils/api.js')
        cloud.syncUserInfo()
    },

    getPhoneNumber(res) {
        console.log(res)
    },

// ======================================== wxml method ==================================
    
    didTapSearchBar() {

    },

    didTapMatching() {
        if (app.data.userInfo == null) { return }
        wx.vibrateShort()
        this.isPlay = true
        this.handleAnimation(false)

        // stop animation
        setTimeout(function () {
            this.isPlay = false
            this.handleAnimation(true)
            wx.vibrateLong({})
        }.bind(this), 5000)
    },

    didTapLove() {
        if (app.data.phone == null) { return }
        wx.vibrateShort()
    }

    
})