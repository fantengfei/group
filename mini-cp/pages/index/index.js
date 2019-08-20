//index.js
const app = getApp()
const audio = require('../../utils/audio.js')

Page({
    data: {
        heartOut1: '',
        heartOut2: '',
        heartOut3: '',
        heart: '',
        phoneOpenType: app.data.phone == null ? 'getPhoneNumber' : '',
        userInfoOpenType: app.data.userInfo == null ? 'getUserInfo' : '',
        menusAnimationData: {},
        searchAnimationData: {}
    },
    onLoad: function() {
        this.isPlay = false
    },
    onReady: function() {
        const self = this 
        audio.initAudio((ctx) => {
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
        this.setData({
            userInfoOpenType: ''
        })
        this.didTapMatching()
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