//index.js
const app = getApp()
const audio = require('../../utils/audio.js')

Page({
    data: {
        show: false,
        heartOut1: '',
        heartOut2: '',
        heartOut3: '',
        heart: ''
    },
    onLoad: function() {
        this.isPlay = true
    },
    onReady: function() {  
        const self = this
        const render = () => {
            self.playEffect(true)
            self.setData({
                show: true
            })
        }
        audio.initAudio((ctx) => {
            if (ctx == null) { return /* 初始化错误 */}
            this.audioCtx = ctx
            if (!app.logining) {
                render()
                return
            }
            app.callbackIfNeed = isLoading => {
                if (isLoading) { return }
                render()
            }
        })
    },

    playEffect(play=false) {
        this.setData({
            heartOut1: play ? 'out1': '',
            heartOut2: play ? 'out2': '',
            heartOut3: play ? '0ut3': '',
            heart: play ? 'heart': ''
        })
        play ? this.audioCtx.play() : this.audioCtx.stop()

        setTimeout(()=>{
            this.playEffect(this.isPlay)
        }, 1000)
    },

    didTapSearchBar() {
        this.isPlay = !this.isPlay
    }

})