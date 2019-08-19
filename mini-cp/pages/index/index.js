//index.js
const app = getApp()
const audio = require('../../utils/audio.js')

Page({
    data: {
        show: false,
        heartOut1: '',
        heartOut2: '',
        heartOut3: '',
        heart: '',
        menusAnimationData: {},
        searchAnimationData: {}
    },
    onLoad: function() {
        this.isPlay = false
    },
    onReady: function() {
        const self = this 
        audio.initAudio((ctx) => {
            if (ctx == null) { return /* 初始化失败 */}
            self.audioCtx = ctx
            self.playEffect()
            self.setData({
                show: true
            })
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

    didTapSearchBar() {
        
    },

    tapMatching() {
        this.isPlay = true
        this.handleAnimation(false)

        setTimeout(function() {
            this.isPlay = false
            this.handleAnimation(true)
        }.bind(this), 5000)
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

    }


})